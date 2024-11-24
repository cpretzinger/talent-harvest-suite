import { Market, MarketMetrics } from '@/types/market';

export const calculateOpportunityScore = (metrics: MarketMetrics) => {
  const { demographics, insurance, competition, growth } = metrics;
  return (
    (demographics.population * 0.2) +
    (insurance.penetration * 0.3) +
    (1 / competition.agentDensity * 0.2) +
    (growth.developmentIndex * 0.3)
  );
};

export const generateRecommendations = (market: Market, metrics: MarketMetrics) => {
  const recommendations = [];
  const score = calculateOpportunityScore(metrics);

  if (score > 0.7) {
    recommendations.push("High-potential market with strong growth indicators");
  } else if (score > 0.4) {
    recommendations.push("Moderate opportunity with specific growth areas");
  } else {
    recommendations.push("Consider alternative markets or niche strategies");
  }

  return recommendations;
};