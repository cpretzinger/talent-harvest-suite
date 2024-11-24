import React from 'react';
import { Card } from "@/components/ui/card";
import { Market, MarketMetrics } from '@/types/market';
import { calculateOpportunityScore } from '@/utils/market';

interface OpportunityScorecardProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
}

export const OpportunityScorecard: React.FC<OpportunityScorecardProps> = ({ markets, metrics }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Market Opportunity Scores</h3>
      <div className="space-y-4">
        {markets.map(market => {
          const score = calculateOpportunityScore(metrics[market.id]);
          return (
            <div key={market.id} className="flex justify-between items-center">
              <span>{market.name}</span>
              <span className="font-semibold">{(score * 100).toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};