interface Demographics {
  population: number;
  medianAge: number;
  medianIncome: number;
}

interface MarketMetrics {
  growth: number;
  competition: number;
  marketSize: number;
  penetration: number;
  demographics: Demographics;
}

interface Recommendation {
  type: 'opportunity' | 'caution' | 'action';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  metrics: string[];
}

export class RecommendationEngine {
  private static readonly THRESHOLDS = {
    highGrowth: 0.1,
    lowCompetition: 0.3,
    highPenetration: 0.7,
    largeMktSize: 1000000
  };

  static generateRecommendations(metrics: MarketMetrics): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Growth Opportunities
    if (metrics.growth > this.THRESHOLDS.highGrowth) {
      recommendations.push({
        type: 'opportunity',
        title: 'High Growth Market',
        description: 'Market showing strong growth potential. Consider increasing resource allocation.',
        priority: 'high',
        metrics: ['growth', 'marketSize']
      });
    }

    // Competition Analysis
    if (metrics.competition < this.THRESHOLDS.lowCompetition) {
      recommendations.push({
        type: 'opportunity',
        title: 'Low Competition Market',
        description: 'Market has low competition. Consider aggressive expansion.',
        priority: 'high',
        metrics: ['competition', 'penetration']
      });
    }

    return this.prioritizeRecommendations(recommendations);
  }

  private static prioritizeRecommendations(
    recommendations: Recommendation[]
  ): Recommendation[] {
    return recommendations.sort((a, b) => {
      const priorityMap = { high: 3, medium: 2, low: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    });
  }
}