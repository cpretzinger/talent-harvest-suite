import React from 'react';
import { Card } from "@/components/ui/card";
import { Market, MarketMetrics } from '@/types/market';

interface RecommendationCardProps {
  market: Market;
  metrics: MarketMetrics;
  recommendations: string[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  market,
  metrics,
  recommendations
}) => {
  return (
    <Card className="p-4">
      <h4 className="text-lg font-semibold mb-2">{market.name}</h4>
      <div className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="text-sm text-gray-600">
            • {recommendation}
          </div>
        ))}
      </div>
    </Card>
  );
};