import React from 'react';
import { RecommendationsProps } from '@/types/market';
import { RecommendationCard } from './RecommendationCard';
import { generateRecommendations } from '@/utils/market';

export const RecommendationsList: React.FC<RecommendationsProps> = ({ 
  markets, 
  metrics 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Market Recommendations</h3>
      <div className="space-y-4">
        {markets.map(market => (
          <RecommendationCard
            key={market.id}
            market={market}
            metrics={metrics[market.id]}
            recommendations={generateRecommendations(market, metrics[market.id])}
          />
        ))}
      </div>
    </div>
  );
};