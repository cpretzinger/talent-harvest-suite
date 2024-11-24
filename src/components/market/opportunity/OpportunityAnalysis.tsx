import React from 'react';
import { OpportunityAnalysisProps } from '@/types/market';
import { OpportunityScorecard } from './OpportunityScorecard';
import { MarketPotentialMatrix } from './MarketPotentialMatrix';
import { RecommendationsList } from './RecommendationsList';

export const OpportunityAnalysis: React.FC<OpportunityAnalysisProps> = ({
  markets,
  metrics
}) => {
  return (
    <div className="space-y-6">
      <OpportunityScorecard markets={markets} metrics={metrics} />
      <MarketPotentialMatrix markets={markets} metrics={metrics} />
      <RecommendationsList markets={markets} metrics={metrics} />
    </div>
  );
};