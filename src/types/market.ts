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

export interface MarketFilters {
  size: [number, number];
  growth: [number, number];
  competition: [number, number];
  region: string[];
}

export interface MarketContext {
  timeframe: 'short' | 'medium' | 'long';
  strategy: 'aggressive' | 'balanced' | 'conservative';
  resources: {
    budget: number;
    team: number;
  };
}

export interface Recommendation {
  title: string;
  description: string;
  actions: string[];
  priority: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  timeframe: 'immediate' | 'short-term' | 'long-term';
}

export interface ContextualInsight {
  type: string;
  insight: string;
  confidence: number;
}

export interface EnhancedRecommendation extends Recommendation {
  contextualInsights: ContextualInsight[];
  confidenceScore: number;
}

export interface MarketScore {
  overall: number;
  components: Record<string, number>;
  confidence: number;
  trends: Record<string, number>;
}
