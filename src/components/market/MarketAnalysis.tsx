import React, { useState } from "react";
import { Trash as TrashIcon } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MarketMetrics {
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

// Utility function to calculate opportunity score
const calculateOpportunityScore = (metrics: MarketMetrics) => {
  const { demographics, insurance, competition, growth } = metrics;
  return (
    (demographics.population * 0.2) +
    (insurance.penetration * 0.3) +
    (1 / competition.agentDensity * 0.2) +
    (growth.developmentIndex * 0.3)
  );
};

// Utility function to generate recommendations
const generateRecommendations = (market: any, metrics: MarketMetrics) => {
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

// Market Toolbar Component
const MarketToolbar: React.FC<{
  selectedMarkets: string[];
  comparisonType: 'overview' | 'detailed' | 'opportunity';
  onTypeChange: (type: 'overview' | 'detailed' | 'opportunity') => void;
  dateRange: [Date, Date];
  onDateRangeChange: (range: [Date, Date]) => void;
}> = ({
  comparisonType,
  onTypeChange,
  dateRange,
  onDateRangeChange
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Tabs value={comparisonType} onValueChange={(value: any) => onTypeChange(value)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
          <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

// Market Selector Component
const MarketSelector: React.FC<MarketSelectorProps> = ({ 
  selectedMarkets, 
  onMarketSelect, 
  onMarketRemove 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Market[]>([]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search markets..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearchMarkets(e.target.value);
          }}
        />

        {suggestions.length > 0 && (
          <div className="max-h-48 overflow-y-auto">
            {suggestions.map(market => (
              <button
                key={market.id}
                onClick={() => onMarketSelect(market)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                {market.name}
                <span className="text-sm text-gray-500 ml-2">
                  {market.state}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {selectedMarkets.map(market => (
            <div
              key={market.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{market.name}</span>
              <button
                onClick={() => onMarketRemove(market)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// MetricCard Component
const MetricCard: React.FC<{
  title: string;
  chart: React.ReactNode;
}> = ({ title, chart }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {chart}
    </Card>
  );
};

// Comparison View Component
const ComparisonView: React.FC<ComparisonViewProps> = ({
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

// Market Overview Component
const MarketOverview: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Population Distribution"
          chart={
            <PopulationChart
              data={markets.map(m => ({
                market: m.name,
                population: metrics[m.id].demographics.population,
                growth: metrics[m.id].growth.populationGrowth
              }))}
            />
          }
        />

        <MetricCard
          title="Insurance Penetration"
          chart={
            <PenetrationChart
              data={markets.map(m => ({
                market: m.name,
                penetration: metrics[m.id].insurance.penetration,
                premium: metrics[m.id].insurance.averagePremium
              }))}
            />
          }
        />
      </div>

      <CompetitionMatrix markets={markets} metrics={metrics} />
      <GrowthPotentialChart markets={markets} metrics={metrics} />
    </div>
  );
};

// Detailed Comparison Component
const DetailedComparison: React.FC<DetailedComparisonProps> = ({
  markets,
  metrics,
  dateRange
}) => {
  return (
    <div className="space-y-6">
      <TabGroup>
        <Tab label="Demographics">
          <DemographicsComparison markets={markets} metrics={metrics} />
        </Tab>
        <Tab label="Insurance Metrics">
          <InsuranceMetricsComparison markets={markets} metrics={metrics} />
        </Tab>
        <Tab label="Competition">
          <CompetitionAnalysis markets={markets} metrics={metrics} />
        </Tab>
        <Tab label="Growth Trends">
          <GrowthTrendAnalysis 
            markets={markets} 
            metrics={metrics}
            dateRange={dateRange}
          />
        </Tab>
      </TabGroup>
    </div>
  );
};

// Opportunity Analysis Component
const OpportunityAnalysis: React.FC<OpportunityAnalysisProps> = ({
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

// Competition Matrix Component
const CompetitionMatrix: React.FC<{
  markets: any[];
  metrics: Record<string, MarketMetrics>;
}> = ({ markets, metrics }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Competition Matrix</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis dataKey="agentDensity" name="Agent Density" />
            <YAxis dataKey="marketShare" name="Market Share" unit="%" />
            <Tooltip />
            <Scatter
              data={markets.map(m => ({
                name: m.name,
                agentDensity: metrics[m.id].competition.agentDensity,
                marketShare: Object.values(metrics[m.id].competition.marketShare)[0]
              }))}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Export the main component
export { MarketComparisonTool };
