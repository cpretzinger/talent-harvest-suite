import { 
  AssessmentResult,
  CategoryScore,
  DimensionalBalance,
  Profile,
  Question,
  ScoreLevel,
  StylePattern,
  ValuesDimension
} from '@/types/assessment';
import { Json } from '@/types/database/schema';

interface ScoreRange {
  min: number;
  interpretation: string;
}

interface ScoreRanges {
  DISC: {
    [key: string]: {
      HIGH: ScoreRange;
      MODERATE: ScoreRange;
      LOW: ScoreRange;
    };
  };
  VALUES: {
    [key: string]: {
      HIGH: ScoreRange;
      MODERATE: ScoreRange;
      LOW: ScoreRange;
    };
  };
}

export class AssessmentScorer {
  private static readonly SCORE_RANGES: ScoreRanges = {
    DISC: {
      D: {
        HIGH: { min: 70, interpretation: "Direct, results-oriented, decisive" },
        MODERATE: { min: 40, interpretation: "Balanced approach to directness" },
        LOW: { min: 0, interpretation: "Thoughtful, collaborative, careful" }
      },
      I: {
        HIGH: { min: 70, interpretation: "Outgoing, enthusiastic, optimistic" },
        MODERATE: { min: 40, interpretation: "Situationally outgoing" },
        LOW: { min: 0, interpretation: "Reserved, analytical, quiet" }
      },
      S: {
        HIGH: { min: 70, interpretation: "Patient, consistent, steady" },
        MODERATE: { min: 40, interpretation: "Flexible in pace" },
        LOW: { min: 0, interpretation: "Dynamic, restless, impatient" }
      },
      C: {
        HIGH: { min: 70, interpretation: "Precise, accurate, detail-oriented" },
        MODERATE: { min: 40, interpretation: "Balanced attention to detail" },
        LOW: { min: 0, interpretation: "Big picture focused, generalist" }
      }
    },
    VALUES: {
      Aesthetic: {
        HIGH: { min: 70, interpretation: "Strong appreciation for beauty and balance" },
        MODERATE: { min: 40, interpretation: "Balanced view of form and function" },
        LOW: { min: 0, interpretation: "Practical focus over aesthetics" }
      },
      Economic: {
        HIGH: { min: 70, interpretation: "Results and ROI focused" },
        MODERATE: { min: 40, interpretation: "Balanced view of resources" },
        LOW: { min: 0, interpretation: "Less focused on material returns" }
      }
    }
  };

  calculateScores(answers: Record<string, number>, questions: Question[]): AssessmentResult {
    const discScores = this.calculateDISCScores(answers, questions);
    const valueScores = this.calculateValueScores(answers, questions);
    const dimensionalBalance = this.calculateDimensionalBalance(discScores, valueScores);
    const profile = this.formatOverallProfile(discScores, valueScores);

    return {
      user_id: '',
      assessment_id: '',
      scores: this.formatCategoryScores(discScores),
      dimensional_balance: dimensionalBalance,
      overall_profile: profile
    };
  }

  private convertToJson<T>(data: T): Json {
    return JSON.parse(JSON.stringify(data));
  }

  private calculateDISCScores(answers: Record<string, number>, questions: Question[]): {
    natural: StylePattern;
    adaptive: StylePattern;
  } {
    const natural: StylePattern = { D: 0, I: 0, S: 0, C: 0 };
    const adaptive: StylePattern = { D: 0, I: 0, S: 0, C: 0 };

    questions.forEach(question => {
      if (question.category in natural) {
        const answer = answers[question.id];
        if (answer) {
          const key = question.category as keyof StylePattern;
          if (question.type === 'natural') {
            natural[key] += answer;
          } else {
            adaptive[key] += answer;
          }
        }
      }
    });

    return {
      natural,
      adaptive
    };
  }

  private calculateValueScores(answers: Record<string, number>, questions: Question[]): Record<string, number> {
    const scores: Record<string, number> = {};

    questions.forEach(question => {
      if (question.category && answers[question.id]) {
        scores[question.category] = (scores[question.category] || 0) + answers[question.id];
      }
    });

    return this.normalizeScores(scores);
  }

  private calculateDimensionalBalance(
    discScores: { natural: StylePattern; adaptive: StylePattern },
    valueScores: Record<string, number>
  ): DimensionalBalance {
    return {
      external: {
        empathy: (discScores.natural.I + (valueScores.Altruist || 0)) / 2,
        practicalThinking: (discScores.natural.D + (valueScores.Economic || 0)) / 2,
        systemsJudgment: (discScores.natural.C + (valueScores.Theoretical || 0)) / 2
      },
      internal: {
        selfEsteem: (discScores.natural.D + discScores.natural.I) / 2,
        roleAwareness: (discScores.natural.S + discScores.natural.C) / 2,
        selfDirection: ((valueScores.Individualistic || 0) + (valueScores.Political || 0)) / 2
      }
    };
  }

  private normalizeScores(scores: Record<string, number>): Record<string, number> {
    const maxScore = Math.max(...Object.values(scores), 1);
    return Object.entries(scores).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Math.round((value / maxScore) * 100)
    }), {});
  }

  private formatCategoryScores(discScores: { natural: StylePattern; adaptive: StylePattern }): CategoryScore[] {
    return Object.entries(discScores.natural).map(([category, score]) => ({
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

  private formatOverallProfile(
    discScores: { natural: StylePattern; adaptive: StylePattern },
    valueScores: Record<string, number>
  ): Profile {
    return {
      naturalStyle: discScores.natural,
      adaptiveStyle: discScores.adaptive,
      values: this.formatValueScores(valueScores)
    };
  }

  private formatValueScores(scores: Record<string, number>): ValuesDimension[] {
    return Object.entries(scores).map(([dimension, score]) => ({
      dimension,
      score,
      description: this.getValueDescription(dimension, score)
    }));
  }

  private getValueDescription(dimension: string, score: number): string {
    if (dimension in AssessmentScorer.SCORE_RANGES.VALUES) {
      const range = this.getScoreRange('VALUES', dimension, score);
      return AssessmentScorer.SCORE_RANGES.VALUES[dimension][range].interpretation;
    }
    return '';
  }

  private getScoreRange(
    type: 'DISC' | 'VALUES',
    dimension: string,
    score: number
  ): 'HIGH' | 'MODERATE' | 'LOW' {
    const ranges = AssessmentScorer.SCORE_RANGES[type][dimension];
    if (score >= ranges.HIGH.min) return 'HIGH';
    if (score >= ranges.MODERATE.min) return 'MODERATE';
    return 'LOW';
  }
}
