import { supabase } from "@/integrations/supabase/client";
import { Question, Assessment, AssessmentResult, CategoryScore, DimensionalBalance, Profile, ScoreLevel } from "@/types/assessment";
import { Json } from "@/types/database/schema";

export class AssessmentAPI {
  async getAssessment(assessmentId: string): Promise<Assessment | null> {
    const { data, error } = await supabase
      .from('assessments')
      .select(`
        *,
        questions (*)
      `)
      .eq('id', assessmentId)
      .single();

    if (error) throw error;
    
    // Transform the data to match Assessment type
    if (data) {
      return {
        ...data,
        questions: data.questions.map((q: any) => ({
          ...q,
          options: q.options as string[] | undefined
        }))
      };
    }
    return null;
  }

  async submitAssessment(
    userId: string,
    assessmentId: string,
    answers: Record<string, any>
  ): Promise<AssessmentResult> {
    const { error: responseError } = await supabase
      .from('responses')
      .insert(
        Object.entries(answers).map(([questionId, answer]) => ({
          user_id: userId,
          assessment_id: assessmentId,
          question_id: questionId,
          answer
        }))
      );

    if (responseError) throw responseError;

    const results = await this.calculateResults(userId, assessmentId, answers);

    // Convert complex types to JSON for storage
    const resultsForStorage = {
      user_id: userId,
      assessment_id: assessmentId,
      scores: JSON.stringify(results.scores),
      dimensional_balance: JSON.stringify(results.dimensional_balance),
      overall_profile: JSON.stringify(results.overall_profile)
    };

    const { error: resultsError } = await supabase
      .from('assessment_results')
      .insert([resultsForStorage]);

    if (resultsError) throw resultsError;

    return results;
  }

  private convertToJson<T>(data: T): Json {
    return JSON.parse(JSON.stringify(data));
  }

  private async calculateResults(
    userId: string,
    assessmentId: string,
    answers: Record<string, any>
  ): Promise<AssessmentResult> {
    const { data: questions } = await supabase
      .from('questions')
      .select('*')
      .eq('assessment_id', assessmentId);

    const categoryScores = new Map<string, number>();
    let totalDIScore = 0;
    let totalSCScore = 0;

    questions?.forEach(question => {
      const answer = answers[question.id];
      const weightedScore = answer * question.weight;

      const currentScore = categoryScores.get(question.category) || 0;
      categoryScores.set(question.category, currentScore + weightedScore);

      if (['Decisive', 'Interactive'].includes(question.category)) {
        totalDIScore += weightedScore;
      } else if (['Stability', 'Cautious'].includes(question.category)) {
        totalSCScore += weightedScore;
      }
    });

    const dimensional_balance: DimensionalBalance = {
      external: {
        empathy: categoryScores.get('Interactive') || 0,
        practicalThinking: categoryScores.get('Decisive') || 0,
        systemsJudgment: categoryScores.get('Cautious') || 0,
      },
      internal: {
        selfEsteem: totalDIScore / 2,
        roleAwareness: totalSCScore / 2,
        selfDirection: (totalDIScore + totalSCScore) / 4,
      },
    };

    const scores: CategoryScore[] = Array.from(categoryScores.entries()).map(([category, score]) => ({
      category,
      score,
      level: this.calculateScoreLevel(score),
      insights: this.generateInsights(category, score),
    }));

    const profile: Profile = {
      naturalStyle: { D: 0, I: 0, S: 0, C: 0 },
      adaptiveStyle: { D: 0, I: 0, S: 0, C: 0 },
      values: []
    };

    return {
      user_id: userId,
      assessment_id: assessmentId,
      scores,
      dimensional_balance,
      overall_profile: profile
    };
  }

  private calculateScoreLevel(score: number): ScoreLevel {
    if (score >= 9) return 'Excellent';
    if (score >= 8) return 'Very Good';
    if (score >= 7) return 'Good';
    if (score >= 6) return 'Fair';
    return 'Poor';
  }

  private generateInsights(category: string, score: number): string[] {
    return [
      `${category} score: ${score}`,
      `This indicates a ${score >= 7 ? 'strong' : 'moderate'} tendency in this area`
    ];
  }
}