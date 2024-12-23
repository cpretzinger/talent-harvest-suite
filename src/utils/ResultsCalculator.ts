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
    const answers = this.formatResponses(responses);
    const questions = this.extractQuestions(responses);
    
    const result = this.scorer.calculateScores(answers, questions);
    
    return {
      user_id: responses[0].user_id,
      assessment_id: responses[0].assessment_id,
      scores: result.scores,
      dimensional_balance: result.dimensional_balance,
      overall_profile: result.overall_profile
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
      type: response.answer.type || 'natural',
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