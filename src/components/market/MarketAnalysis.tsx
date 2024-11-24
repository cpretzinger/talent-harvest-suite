import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MarketSelector } from "./MarketSelector";
import { ComparisonView } from "./ComparisonView";
import { Market } from "@/types/market";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MarketComparisonTool() {
  const [selectedMarkets, setSelectedMarkets] = useState<Market[]>([]);
  const [dateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_data')
        .select('*');
      
      if (error) throw error;

      return data.reduce((acc, market) => {
        acc[market.market_name] = {
          demographics: {
            population: market.population,
            medianIncome: Number(market.median_income),
            medianAge: 35, // Default value since not in DB
            householdSize: 3, // Default value since not in DB
            educationLevel: {}
          },
          insurance: {
            penetration: Number(market.insurance_penetration),
            averagePremium: 1200, // Default value since not in DB
            lapsedPolicies: 0,
            marketSize: market.population * Number(market.insurance_penetration)
          },
          competition: {
            agentDensity: Number(market.competitor_density),
            carrierCount: 10, // Default value since not in DB
            marketShare: {},
            averageProduction: 0
          },
          growth: {
            populationGrowth: Number(market.growth_rate),
            incomeGrowth: 0.03, // Default value since not in DB
            businessGrowth: 0.04, // Default value since not in DB
            developmentIndex: Number(market.growth_rate)
          }
        };
        return acc;
      }, {} as Record<string, any>);
    }
  });

  const handleMarketSelect = (market: Market) => {
    setSelectedMarkets(prev => [...prev, market]);
  };

  const handleMarketRemove = (market: Market) => {
    setSelectedMarkets(prev => prev.filter(m => m.id !== market.id));
  };

  if (isLoading) {
    return <div>Loading market data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Market Comparison Tool</h2>
        <MarketSelector
          selectedMarkets={selectedMarkets}
          onMarketSelect={handleMarketSelect}
          onMarketRemove={handleMarketRemove}
        />
      </Card>

      {selectedMarkets.length > 0 && marketData && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunity Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ComparisonView
              type="overview"
              markets={selectedMarkets}
              metrics={marketData}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="detailed">
            <ComparisonView
              type="detailed"
              markets={selectedMarkets}
              metrics={marketData}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="opportunity">
            <ComparisonView
              type="opportunity"
              markets={selectedMarkets}
              metrics={marketData}
              dateRange={dateRange}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}