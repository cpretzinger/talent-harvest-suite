import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import * as tf from "https://esm.sh/@tensorflow/tfjs@4.11.0";
import natural from "https://esm.sh/natural@6.10.0";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FeatureProcessorConfig {
  normalizations: Record<string, { min: number; max: number }>;
  categoricalEncodings: Record<string, string[]>;
  textProcessing: {
    maxLength: number;
    stopWords: string[];
    relevantKeywords: string[];
  };
}

class InsuranceFeatureProcessor {
  private readonly config: FeatureProcessorConfig = {
    normalizations: {
      years_experience: { min: 0, max: 30 },
      sales_volume: { min: 0, max: 1000000 },
      client_retention: { min: 0, max: 100 },
      assessment_score: { min: 0, max: 100 }
    },
    categoricalEncodings: {
      education_level: [
        'high_school',
        'bachelors',
        'masters',
        'phd'
      ],
      license_type: [
        'life_health',
        'property_casualty',
        'series_6',
        'series_7'
      ],
      industry_background: [
        'insurance',
        'finance',
        'sales',
        'customer_service',
        'other'
      ]
    },
    textProcessing: {
      maxLength: 1000,
      stopWords: ['the', 'and', 'or', 'but', 'in', 'on', 'at'],
      relevantKeywords: [
        'insurance',
        'sales',
        'client',
        'customer',
        'policy',
        'revenue',
        'relationship'
      ]
    }
  };

  constructor(private supabase: SupabaseClient) {}

  async processFeatures(rawData: any): Promise<ProcessedFeatures> {
    try {
      // 1. Extract basic features
      const basicFeatures = await this.extractBasicFeatures(rawData);
      
      // 2. Process experience features
      const experienceFeatures = await this.processExperience(rawData.experience);
      
      // 3. Process skills and qualifications
      const skillFeatures = await this.processSkills(rawData.skills);
      
      // 4. Process assessment results
      const assessmentFeatures = await this.processAssessments(rawData.assessments);
      
      // 5. Process text data (resume, cover letter)
      const textFeatures = await this.processTextData(rawData.textData);
      
      // 6. Combine and normalize all features
      const combinedFeatures = this.combineFeatures({
        ...basicFeatures,
        ...experienceFeatures,
        ...skillFeatures,
        ...assessmentFeatures,
        ...textFeatures
      });

      // 7. Cache processed features
      await this.cacheFeatures(combinedFeatures, rawData.candidateId);

      return combinedFeatures;
    } catch (error) {
      console.error('Feature processing error:', error);
      throw new Error(`Feature processing failed: ${error.message}`);
    }
  }

  private async extractBasicFeatures(data: any): Promise<BasicFeatures> {
    return {
      age: this.normalizeValue(data.age, 18, 80),
      education_level: this.encodeCategorical(
        data.education_level,
        'education_level'
      ),
      location_score: await this.calculateLocationScore(data.location),
      current_role: this.encodeCategorical(
        data.current_role,
        'industry_background'
      )
    };
  }

  private async processExperience(experience: any): Promise<ExperienceFeatures> {
    const processedExperience = {
      total_years: this.normalizeValue(
        experience.total_years,
        this.config.normalizations.years_experience.min,
        this.config.normalizations.years_experience.max
      ),
      
      insurance_years: this.normalizeValue(
        experience.insurance_years || 0,
        0,
        experience.total_years
      ),
      
      sales_years: this.normalizeValue(
        experience.sales_years || 0,
        0,
        experience.total_years
      ),
      
      management_experience: this.normalizeValue(
        experience.management_years || 0,
        0,
        experience.total_years
      ),
      
      relevant_experience_score: await this.calculateRelevanceScore(
        experience.positions || []
      )
    };

    // Add experience trajectory
    const trajectoryScore = await this.calculateCareerTrajectory(
      experience.positions || []
    );
    
    return {
      ...processedExperience,
      career_trajectory: trajectoryScore
    };
  }

  private async processSkills(skills: any): Promise<SkillFeatures> {
    // Process technical skills
    const technicalSkills = this.processSkillSet(
      skills.technical || [],
      'technical'
    );

    // Process soft skills
    const softSkills = this.processSkillSet(
      skills.soft || [],
      'soft'
    );

    // Process certifications
    const certifications = this.processCertifications(
      skills.certifications || []
    );

    // Calculate composite scores
    return {
      technical_score: this.calculateCompositeScore(technicalSkills),
      soft_skills_score: this.calculateCompositeScore(softSkills),
      certification_score: this.calculateCompositeScore(certifications),
      skill_diversity: this.calculateSkillDiversity([
        ...technicalSkills,
        ...softSkills
      ]),
      skill_relevance: await this.calculateSkillRelevance(skills)
    };
  }

  private async processAssessments(assessments: any): Promise<AssessmentFeatures> {
    return {
      technical_knowledge: this.normalizeValue(
        assessments.technical_score,
        0,
        100
      ),
      
      sales_aptitude: this.normalizeValue(
        assessments.sales_score,
        0,
        100
      ),
      
      personality_scores: {
        disc_d: this.normalizeValue(assessments.disc?.dominance || 0, 0, 100),
        disc_i: this.normalizeValue(assessments.disc?.influence || 0, 0, 100),
        disc_s: this.normalizeValue(assessments.disc?.steadiness || 0, 0, 100),
        disc_c: this.normalizeValue(assessments.disc?.compliance || 0, 0, 100)
      },
      
      cognitive_scores: {
        problem_solving: this.normalizeValue(
          assessments.cognitive?.problem_solving || 0,
          0,
          100
        ),
        analytical: this.normalizeValue(
          assessments.cognitive?.analytical || 0,
          0,
          100
        ),
        learning_agility: this.normalizeValue(
          assessments.cognitive?.learning_agility || 0,
          0,
          100
        )
      },
      
      overall_assessment_score: this.calculateOverallAssessmentScore(assessments)
    };
  }

  private async processTextData(textData: any): Promise<TextFeatures> {
    // Process resume text
    const resumeFeatures = await this.processResume(textData.resume);
    
    // Process cover letter
    const coverLetterFeatures = await this.processCoverLetter(
      textData.cover_letter
    );
    
    // Process interview responses
    const interviewFeatures = await this.processInterviewResponses(
      textData.interview_responses
    );

    return {
      resume_score: resumeFeatures.score,
      resume_keywords: resumeFeatures.keywords,
      communication_score: coverLetterFeatures.communication_score,
      motivation_indicators: coverLetterFeatures.motivation_score,
      interview_sentiment: interviewFeatures.sentiment,
      language_proficiency: interviewFeatures.language_score
    };
  }

  private async calculateLocationScore(location: string): Promise<number> {
    // Query market potential data
    const { data: marketData } = await this.supabase
      .from('market_potential')
      .select('score')
      .eq('location', location)
      .single();

    return marketData ? marketData.score : 0.5;
  }

  private async calculateRelevanceScore(positions: any[]): Promise<number> {
    const relevanceScores = positions.map(position => {
      const titleRelevance = this.calculateTitleRelevance(position.title);
      const industryRelevance = this.calculateIndustryRelevance(
        position.industry
      );
      const recency = this.calculateRecency(position.end_date);
      
      return (titleRelevance * 0.4) + 
             (industryRelevance * 0.4) + 
             (recency * 0.2);
    });

    return relevanceScores.reduce((acc, score) => acc + score, 0) / 
           relevanceScores.length;
  }

  private async cacheFeatures(
    features: ProcessedFeatures,
    candidateId: string
  ): Promise<void> {
    await this.supabase
      .from('processed_features')
      .upsert({
        candidate_id: candidateId,
        features: features,
        processed_at: new Date().toISOString()
    });
  }

  // Utility methods
  private normalizeValue(
    value: number,
    min: number,
    max: number
  ): number {
    return (value - min) / (max - min);
  }

  private encodeCategorical(
    value: string,
    category: string
  ): number[] {
    const categories = this.config.categoricalEncodings[category];
    return categories.map(cat => cat === value ? 1 : 0);
  }

  private calculateCompositeScore(scores: number[]): number {
    return scores.reduce((acc, score) => acc + score, 0) / scores.length;
  }
}

// Edge Function Handler with CORS support
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const { rawData } = await req.json();
    
    // Input validation
    if (!rawData) {
      throw new Error('No raw data provided');
    }

    console.log('Processing features for candidate:', rawData.candidateId);
    
    const processor = new InsuranceFeatureProcessor(supabase);
    const processedFeatures = await processor.processFeatures(rawData);

    console.log('Features processed successfully');

    return new Response(
      JSON.stringify({ features: processedFeatures }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error('Error processing features:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
