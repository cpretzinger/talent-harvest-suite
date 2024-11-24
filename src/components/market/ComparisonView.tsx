import React from 'react';
import { ComparisonViewProps } from '@/types/market';
import { MarketOverview } from './overview/MarketOverview';
import { DetailedComparison } from './detailed/DetailedComparison';
import { OpportunityAnalysis } from './opportunity/OpportunityAnalysis';

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  type,
  markets,
  metrics,
  dateRange
}) => {
  switch (type) {
    case 'overview':
      return <MarketOverview markets={markets} metrics={metrics} />;
    case 'detailed':
      return <DetailedComparison markets={markets} metrics={metrics} dateRange={dateRange} />;
    case 'opportunity':
      return <OpportunityAnalysis markets={markets} metrics={metrics} />;
    default:
      return null;
  }
};