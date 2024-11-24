import { MarketMetrics, MarketContext, MarketScore } from '@/types/market';

interface ScoringWeights {
  growth: number;
  competition: number;
  marketSize: number;
  demographics: number;
  risk: number;
}

export class SophisticatedMarketScoring {
  private static readonly baseWeights: ScoringWeights = {
    growth: 0.3,
    competition: 0.25,
    marketSize: 0.25,
    demographics: 0.15,
    risk: 0.05
  };

  static calculateMarketScore(
    metrics: MarketMetrics,
    context: MarketContext
  ): MarketScore {
    const adjustedWeights = this.adjustWeightsForContext(
      this.baseWeights,
      context
    );

    const componentScores = {
      growth: this.calculateGrowthScore(metrics.growth),
      competition: this.calculateCompetitionScore(metrics.competition),
      marketSize: this.calculateMarketSizeScore(metrics.insurance),
      demographics: this.calculateDemographicsScore(metrics.demographics),
      risk: 0.5 // Simplified for now
    };

    return {
      overall: this.calculateWeightedScore(componentScores, adjustedWeights),
      components: componentScores,
      confidence: this.calculateConfidenceScore(metrics),
      trends: this.analyzeTrends(metrics)
    };
  }

  private static adjustWeightsForContext(
    weights: ScoringWeights,
    context: MarketContext
  ): ScoringWeights {
    return weights; // Simplified for now, can be enhanced based on context
  }

  private static calculateWeightedScore(
    scores: Record<string, number>,
    weights: ScoringWeights
  ): number {
    return Object.entries(scores).reduce((total, [key, score]) => {
      return total + score * weights[key as keyof ScoringWeights];
    }, 0);
  }

  private static calculateGrowthScore(growth: MarketMetrics['growth']): number {
    return growth.developmentIndex;
  }

  private static calculateCompetitionScore(competition: MarketMetrics['competition']): number {
    return 1 - (competition.agentDensity / 100);
  }

  private static calculateMarketSizeScore(insurance: MarketMetrics['insurance']): number {
    return Math.min(insurance.marketSize / 1000000, 1);
  }

  private static calculateDemographicsScore(demographics: MarketMetrics['demographics']): number {
    return demographics.medianIncome / 100000;
  }

  private static calculateConfidenceScore(metrics: MarketMetrics): number {
    return 0.8; // Simplified for now
  }

  private static analyzeTrends(metrics: MarketMetrics): Record<string, number> {
    return {
      growthTrend: metrics.growth.developmentIndex,
      competitionTrend: -metrics.competition.agentDensity / 100
    };
  }
}