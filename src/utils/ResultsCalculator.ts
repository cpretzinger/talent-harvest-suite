import { AssessmentResponse } from "@/types/assessmentTypes";
import { AssessmentResult, CategoryScore, DimensionalBalance, Profile, ScoreLevel } from '@/types/assessment';

export class ResultsCalculator {
  // Score weights for different question types
  private static readonly WEIGHTS = {
    DISC: {
      D: 0.25,
      I: 0.25,
      S: 0.25,
      C: 0.25
    },
    VALUES: {
      Aesthetic: 0.14,
      Economic: 0.14,
      Individualistic: 0.14,
      Political: 0.14,
      Altruist: 0.14,
      Regulatory: 0.14,
      Theoretical: 0.14
    }
  };

  // Calculate DISC profile from assessment responses
  calculateDISCProfile(responses: AssessmentResponse[]): {natural: Record<string, number>, adaptive: Record<string, number>} {
    const natural = {
      D: 0, I: 0, S: 0, C: 0
    };
    const adaptive = {
      D: 0, I: 0, S: 0, C: 0
    };

    responses.forEach(response => {
      const answer = response.answer;
      if (answer.style && answer.type) {
        const score = answer.value || 0;
        if (answer.type === 'natural') {
          natural[answer.style] += score * ResultsCalculator.WEIGHTS.DISC[answer.style];
        } else {
          adaptive[answer.style] += score * ResultsCalculator.WEIGHTS.DISC[answer.style];
        }
      }
    });

    return {
      natural: this.normalizeScores(natural),
      adaptive: this.normalizeScores(adaptive)
    };
  }

  // Calculate Values profile from assessment responses
  calculateValuesProfile(responses: AssessmentResponse[]): Record<string, number> {
    const scores = {
      Aesthetic: 0,
      Economic: 0,
      Individualistic: 0,
      Political: 0,
      Altruist: 0,
      Regulatory: 0,
      Theoretical: 0
    };

    responses.forEach(response => {
      const answer = response.answer;
      if (answer.dimension && answer.dimension in scores) {
        scores[answer.dimension as keyof typeof scores] += 
          (answer.value || 0) * ResultsCalculator.WEIGHTS.VALUES[answer.dimension as keyof typeof ResultsCalculator.WEIGHTS.VALUES];
      }
    });

    return this.normalizeScores(scores);
  }

  // Calculate Dimensional Balance
  calculateDimensionalBalance(
    discScores: {natural: Record<string, number>, adaptive: Record<string, number>},
    valuesScores: Record<string, number>
  ): DimensionalBalance {
    return {
      external: {
        empathy: (discScores.natural.I + valuesScores.Altruist) / 2,
        practicalThinking: (discScores.natural.D + valuesScores.Economic) / 2,
        systemsJudgment: (discScores.natural.C + valuesScores.Theoretical) / 2
      },
      internal: {
        selfEsteem: (discScores.natural.D + discScores.natural.I) / 2,
        roleAwareness: (discScores.natural.S + discScores.natural.C) / 2,
        selfDirection: (valuesScores.Individualistic + valuesScores.Political) / 2
      }
    };
  }

  // Generate insights based on scores
  generateInsights(scores: Record<string, number>): Record<string, string[]> {
    const insights: Record<string, string[]> = {};
    
    Object.entries(scores).forEach(([dimension, score]) => {
      if (score > 70) {
        switch(dimension) {
          case 'D':
            insights[dimension] = [
              "Strong drive to achieve results",
              "May be perceived as too forceful",
              "Natural leader who takes charge"
            ];
            break;
          case 'I':
            insights[dimension] = [
              "Excellent communicator",
              "Builds relationships easily",
              "May need to focus more on details"
            ];
            break;
          case 'Economic':
            insights[dimension] = [
              "Strong focus on bottom-line results",
              "Practical and results-oriented",
              "May need to balance with other considerations"
            ];
            break;
          // Add more cases for other dimensions as needed
        }
      }
    });

    return insights;
  }

  // Generate the complete assessment report from responses
  generateFullReport(responses: AssessmentResponse[]): Omit<AssessmentResult, 'id' | 'created_at'> {
    const discScores = this.calculateDISCProfile(responses);
    const valuesScores = this.calculateValuesProfile(responses);
    const dimensionalBalance = this.calculateDimensionalBalance(discScores, valuesScores);
    const insights = this.generateInsights({...discScores.natural, ...valuesScores});

    // Get the first response's assessment_id and user_id as they should be the same for all responses
    const firstResponse = responses[0];

    return {
      user_id: firstResponse.user_id,
      assessment_id: firstResponse.assessment_id,
      scores: this.formatCategoryScores({...discScores.natural, ...valuesScores}),
      dimensional_balance: dimensionalBalance,
      overall_profile: {
        naturalStyle: discScores.natural,
        adaptiveStyle: discScores.adaptive,
        values: Object.entries(valuesScores).map(([dimension, score]) => ({
          dimension,
          score,
          description: this.generateInsights({[dimension]: score})[dimension]?.[0] || ''
        }))
      }
    };
  }

  private normalizeScores(scores: Record<string, number>): Record<string, number> {
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) return scores;
    
    return Object.entries(scores).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Math.round((value / maxScore) * 100)
    }), {});
  }

  private formatCategoryScores(scores: Record<string, number>): CategoryScore[] {
    return Object.entries(scores).map(([category, score]) => ({
      category,
      score,
      level: this.getScoreLevel(score),
      insights: this.generateInsights({[category]: score})[category] || []
    }));
  }

  private getScoreLevel(score: number): ScoreLevel {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  }
}