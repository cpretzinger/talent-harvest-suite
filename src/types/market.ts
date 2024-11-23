export interface Market {
  id: string;
  name: string;
  state: string;
}

export interface MarketMetrics {
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
    householdSize: number;
    educationLevel: Record<string, number>;
  };
  insurance: {
    penetration: number;
    averagePremium: number;
    lapsedPolicies: number;
    marketSize: number;
  };
  competition: {
    agentDensity: number;
    carrierCount: number;
    marketShare: Record<string, number>;
    averageProduction: number;
  };
  growth: {
    populationGrowth: number;
    incomeGrowth: number;
    businessGrowth: number;
    developmentIndex: number;
  };
}

export interface MarketSelectorProps {
  selectedMarkets: Market[];
  onMarketSelect: (market: Market) => void;
  onMarketRemove: (market: Market) => void;
}

export interface ComparisonViewProps {
  type: 'overview' | 'detailed' | 'opportunity';
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
  dateRange: [Date, Date];
}

export interface MarketOverviewProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
}

export interface DetailedComparisonProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
  dateRange: [Date, Date];
}

export interface OpportunityAnalysisProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
}

export interface ChartProps {
  data: any[];
}

export interface MatrixProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
}

export interface RecommendationsProps {
  markets: Market[];
  metrics: Record<string, MarketMetrics>;
}