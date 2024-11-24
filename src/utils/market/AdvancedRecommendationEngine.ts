import { MarketMetrics, MarketContext, Recommendation, EnhancedRecommendation, ContextualInsight } from '@/types/market';

interface RecommendationRule {
  id: string;
  condition: (metrics: MarketMetrics) => boolean;
  generate: (metrics: MarketMetrics) => Recommendation;
  priority: number;
  category: 'opportunity' | 'risk' | 'action' | 'insight';
}

export class AdvancedRecommendationEngine {
  private static rules: RecommendationRule[] = [
    {
      id: 'high-growth-opportunity',
      condition: (metrics) => metrics.growth.developmentIndex > 0.15,
      generate: (metrics) => ({
        title: 'High Growth Market Opportunity',
        description: `Market showing ${(metrics.growth.developmentIndex * 100).toFixed(1)}% growth rate, significantly above average.`,
        actions: [
          'Increase marketing budget allocation',
          'Expand sales team presence',
          'Develop targeted product offerings'
        ],
        priority: 'high',
        impact: 'high',
        timeframe: 'immediate'
      }),
      priority: 1,
      category: 'opportunity'
    }
  ];

  static generateRecommendations(
    metrics: MarketMetrics,
    context: MarketContext
  ): EnhancedRecommendation[] {
    const baseRecommendations = this.rules
      .filter(rule => rule.condition(metrics))
      .map(rule => rule.generate(metrics));

    return this.enhanceRecommendations(
      baseRecommendations,
      metrics,
      context
    );
  }

  private static enhanceRecommendations(
    recommendations: Recommendation[],
    metrics: MarketMetrics,
    context: MarketContext
  ): EnhancedRecommendation[] {
    return recommendations.map(rec => ({
      ...rec,
      contextualInsights: this.generateContextualInsights(rec, metrics, context),
      confidenceScore: this.calculateConfidenceScore(metrics)
    }));
  }

  private static generateContextualInsights(
    recommendation: Recommendation,
    metrics: MarketMetrics,
    context: MarketContext
  ): ContextualInsight[] {
    return [{
      type: 'market_condition',
      insight: `Market penetration is at ${(metrics.insurance.penetration * 100).toFixed(1)}%`,
      confidence: 0.9
    }];
  }

  private static calculateConfidenceScore(metrics: MarketMetrics): number {
    return 0.8; // Simplified for now, can be enhanced based on data quality
  }
}