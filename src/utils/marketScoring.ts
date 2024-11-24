import { MarketMetrics } from '@/types/market';

interface MarketScore {
  overall: number;
  componentScores: {
    growth: number;
    competition: number;
    marketSize: number;
    demographics: number;
  };
  confidence: number;
  recommendations: string[];
}

export class MarketScoringSystem {
  private static readonly WEIGHTS = {
    growth: 0.3,
    competition: 0.25,
    marketSize: 0.25,
    demographics: 0.2
  };

  private static readonly THRESHOLDS = {
    highGrowth: 0.1,
    lowCompetition: 0.3,
    largeMarket: 1000000,
    highIncome: 75000
  };

  static calculateMarketScore(metrics: MarketMetrics): MarketScore {
    const scores = {
      growth: this.calculateGrowthScore(metrics.growth.populationGrowth),
      competition: this.calculateCompetitionScore(metrics.competition.agentDensity),
      marketSize: this.calculateMarketSizeScore(metrics.demographics.population),
      demographics: this.calculateDemographicsScore(metrics.demographics)
    };

    const overallScore = this.calculateWeightedScore(scores);

    return {
      overall: overallScore,
      componentScores: scores,
      confidence: this.calculateConfidenceScore(metrics),
      recommendations: this.generateScoreBasedRecommendations(scores)
    };
  }

  private static calculateWeightedScore(scores: Record<string, number>): number {
    return Object.entries(scores).reduce((total, [metric, score]) => {
      return total + (score * this.WEIGHTS[metric as keyof typeof this.WEIGHTS]);
    }, 0);
  }

  private static calculateGrowthScore(growth: number): number {
    return Math.min(growth / this.THRESHOLDS.highGrowth, 1);
  }

  private static calculateCompetitionScore(competition: number): number {
    return 1 - Math.min(competition / this.THRESHOLDS.lowCompetition, 1);
  }

  private static calculateMarketSizeScore(marketSize: number): number {
    return Math.min(marketSize / this.THRESHOLDS.largeMarket, 1);
  }

  private static calculateDemographicsScore(demographics: MarketMetrics['demographics']): number {
    const incomeScore = Math.min(demographics.medianIncome / this.THRESHOLDS.highIncome, 1);
    const populationScore = Math.min(demographics.population / this.THRESHOLDS.largeMarket, 1);
    return (incomeScore + populationScore) / 2;
  }

  private static calculateConfidenceScore(metrics: MarketMetrics): number {
    const hasAllMetrics = Object.values(metrics).every(value => value !== undefined && value !== null);
    return hasAllMetrics ? 0.9 : 0.7;
  }

  private static generateScoreBasedRecommendations(scores: Record<string, number>): string[] {
    const recommendations: string[] = [];

    if (scores.growth > 0.8) {
      recommendations.push("High growth market - consider aggressive expansion");
    }
    if (scores.competition < 0.3) {
      recommendations.push("Low competition environment - opportunity for market leadership");
    }
    if (scores.marketSize > 0.7) {
      recommendations.push("Large market size - potential for significant market share");
    }
    if (scores.demographics > 0.7) {
      recommendations.push("Favorable demographics - target premium products/services");
    }

    return recommendations;
  }
}