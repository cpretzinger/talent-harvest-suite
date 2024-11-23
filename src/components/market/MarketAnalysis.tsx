import React, { useState } from 'react';
import { Trash as TrashIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Market, MarketMetrics, MarketSelectorProps } from '@/types/market';
import { PopulationChart } from './charts/PopulationChart';
import { PenetrationChart } from './charts/PenetrationChart';

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
const generateRecommendations = (market: Market, metrics: MarketMetrics) => {
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

// Market Selector Component
const MarketSelector: React.FC<MarketSelectorProps> = ({ 
  selectedMarkets, 
  onMarketSelect, 
  onMarketRemove 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Market[]>([]);

  const handleSearchMarkets = async (term: string) => {
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    const { data, error } = await supabase
      .from('market_data')
      .select('id, market_name')
      .ilike('market_name', `%${term}%`)
      .limit(10);

    if (error) {
      console.error('Error searching markets:', error);
      return;
    }

    setSuggestions(data.map(d => ({
      id: d.id,
      name: d.market_name,
      state: 'N/A' // Add proper state handling if needed
    })));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search markets..."
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

// Main Market Comparison Component
export const MarketComparisonTool = () => {
  const [selectedMarkets, setSelectedMarkets] = useState<Market[]>([]);
  const [comparisonType, setComparisonType] = useState<'overview' | 'detailed' | 'opportunity'>('overview');
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  const { data: metrics } = useQuery({
    queryKey: ['marketMetrics', selectedMarkets.map(m => m.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .in('id', selectedMarkets.map(m => m.id));

      if (error) throw error;
      return data.reduce((acc, market) => ({
        ...acc,
        [market.id]: {
          demographics: {
            population: market.population,
            medianAge: 0,
            medianIncome: market.median_income,
            householdSize: 0,
            educationLevel: {}
          },
          insurance: {
            penetration: market.insurance_penetration,
            averagePremium: 0,
            lapsedPolicies: 0,
            marketSize: 0
          },
          competition: {
            agentDensity: market.competitor_density,
            carrierCount: 0,
            marketShare: {},
            averageProduction: 0
          },
          growth: {
            populationGrowth: 0,
            incomeGrowth: 0,
            businessGrowth: 0,
            developmentIndex: market.growth_rate
          }
        }
      }), {});
    },
    enabled: selectedMarkets.length > 0
  });

  const handleMarketSelect = (market: Market) => {
    setSelectedMarkets(prev => [...prev, market]);
  };

  const handleMarketRemove = (market: Market) => {
    setSelectedMarkets(prev => prev.filter(m => m.id !== market.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Population Distribution</h3>
                {metrics && <PopulationChart data={selectedMarkets.map(m => ({
                  market: m.name,
                  population: metrics[m.id]?.demographics.population,
                  growth: metrics[m.id]?.growth.populationGrowth
                }))} />}
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Insurance Penetration</h3>
                {metrics && <PenetrationChart data={selectedMarkets.map(m => ({
                  market: m.name,
                  penetration: metrics[m.id]?.insurance.penetration,
                  premium: metrics[m.id]?.insurance.averagePremium
                }))} />}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <MarketSelector
            selectedMarkets={selectedMarkets}
            onMarketSelect={handleMarketSelect}
            onMarketRemove={handleMarketRemove}
          />
        </div>
      </div>
    </div>
  );
};