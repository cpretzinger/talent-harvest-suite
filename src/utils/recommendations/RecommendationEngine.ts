import { DailyMetrics } from '@/types/producer/metrics';

interface TeamMetrics {
  conversionRate: number;
  averageTalkTime: number;
  quoteRate: number;
}

interface PerformanceTargets {
  conversionRate: number;
  timeEfficiency: number;
  quotesPerLead: number;
}

interface Recommendation {
  type: 'improvement' | 'observation' | 'optimization';
  category: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actions: string[];
}

interface RecommendationEngineConfig {
  metrics: DailyMetrics;
  historicalData: DailyMetrics[];
  teamAverages: TeamMetrics;
  targets: PerformanceTargets;
}

export class RecommendationEngine {
  private config: RecommendationEngineConfig;

  constructor(config: RecommendationEngineConfig) {
    this.config = config;
  }

  generateRecommendations(): Recommendation[] {
    return [
      ...this.analyzeConversionRate(),
      ...this.analyzeTalkTime(),
      ...this.analyzeProductivity()
    ];
  }

  private analyzeConversionRate(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const { metrics, teamAverages, targets } = this.config;

    const conversionRate = metrics.metrics.leads.conversionRate;
    const teamAvgRate = teamAverages.conversionRate;
    const targetRate = targets.conversionRate;

    if (conversionRate < teamAvgRate) {
      recommendations.push({
        type: 'improvement',
        category: 'conversion',
        priority: 'high',
        title: 'Conversion Rate Below Team Average',
        description: `Your conversion rate (${(conversionRate * 100).toFixed(1)}%) is below the team average (${(teamAvgRate * 100).toFixed(1)}%)`,
        actions: [
          'Review successful conversion techniques',
          'Schedule conversion training session',
          'Analyze lost lead feedback'
        ]
      });
    }

    return recommendations;
  }

  private analyzeTalkTime(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const { metrics, historicalData } = this.config;

    const avgTalkTime = metrics.metrics.calls.averageCallDuration;
    const historicalAvg = this.calculateHistoricalAverage(
      historicalData,
      'calls.averageCallDuration'
    );

    if (Math.abs(avgTalkTime - historicalAvg) > 5) {
      recommendations.push({
        type: 'observation',
        category: 'calls',
        priority: 'medium',
        title: 'Significant Change in Talk Time',
        description: 'Your average talk time has changed significantly from your historical average',
        actions: [
          'Review call recordings',
          'Identify successful call patterns',
          'Adjust call script if needed'
        ]
      });
    }

    return recommendations;
  }

  private analyzeProductivity(): Recommendation[] {
    const { metrics, targets } = this.config;
    const recommendations: Recommendation[] = [];

    const timeEfficiency = this.calculateTimeEfficiency(metrics);
    if (timeEfficiency < targets.timeEfficiency) {
      recommendations.push({
        type: 'optimization',
        category: 'productivity',
        priority: 'medium',
        title: 'Time Usage Optimization',
        description: 'There\'s room for improvement in time management',
        actions: [
          'Review break patterns',
          'Optimize between-call activities',
          'Consider using time-blocking technique'
        ]
      });
    }

    return recommendations;
  }

  private calculateTimeEfficiency(metrics: DailyMetrics): number {
    const totalTime = 
      (metrics.metadata.endTime.getTime() - 
       metrics.metadata.startTime.getTime()) / (1000 * 60);
    const productiveTime = 
      metrics.metrics.calls.talkTime + 
      (metrics.metrics.quotes.households * 15);
    
    return productiveTime / (totalTime - metrics.metadata.breaks);
  }

  private calculateHistoricalAverage(data: DailyMetrics[], path: string): number {
    return data.reduce((acc, metric) => {
      const value = path.split('.').reduce((obj, key) => obj[key], metric as any);
      return acc + value;
    }, 0) / data.length;
  }
}