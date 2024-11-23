import { AssessmentResponse } from "@/types/assessmentTypes";
import { AssessmentResult, CategoryScore, DimensionalBalance, Profile, ScoreLevel } from '@/types/assessment';
import { Json } from '@/types/database/schema';
import { AssessmentScorer } from './AssessmentScorer';

export class ResultsCalculator {
  private scorer: AssessmentScorer;

  constructor() {
    this.scorer = new AssessmentScorer();
  }

  generateFullReport(responses: AssessmentResponse[]): Omit<AssessmentResult, 'id' | 'created_at'> {
    // Convert responses to the format expected by AssessmentScorer
    const answers = this.formatResponses(responses);
    const questions = this.extractQuestions(responses);
    
    // Calculate scores using the AssessmentScorer
    const profile = this.scorer.calculateScores(answers, questions);
    
    // Format the results for database storage
    return {
      user_id: responses[0].user_id,
      assessment_id: responses[0].assessment_id,
      scores: this.convertToJson(this.formatCategoryScores(profile)),
      dimensional_balance: this.convertToJson(profile),
      overall_profile: this.convertToJson(profile)
    };
  }

  private formatResponses(responses: AssessmentResponse[]): Record<string, any> {
    return responses.reduce((acc, response) => ({
      ...acc,
      [response.question_id]: response.answer
    }), {});
  }

  private extractQuestions(responses: AssessmentResponse[]): any[] {
    return responses.map(response => ({
      id: response.question_id,
      category: response.answer.category || '',
      sub_category: response.answer.sub_category || '',
      weight: 1
    }));
  }

  private convertToJson<T>(data: T): Json {
    return JSON.parse(JSON.stringify(data));
  }

  private formatCategoryScores(profile: Profile): CategoryScore[] {
    return Object.entries(profile.naturalStyle).map(([category, score]) => ({
      category,
      score,
      level: this.getScoreLevel(score),
      insights: this.generateInsights(category, score)
    }));
  }

  private getScoreLevel(score: number): ScoreLevel {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  }

  private generateInsights(category: string, score: number): string[] {
    // Basic insights based on category and score
    const insights: string[] = [];
    
    if (score > 80) {
      insights.push(`Strong ${category} characteristics`);
      insights.push(`Natural tendency towards ${category}-related behaviors`);
    } else if (score > 60) {
      insights.push(`Moderate ${category} characteristics`);
      insights.push(`Balanced approach to ${category}-related situations`);
    } else {
      insights.push(`Lower emphasis on ${category} characteristics`);
      insights.push(`May need support in ${category}-related situations`);
    }

    return insights;
  }
}