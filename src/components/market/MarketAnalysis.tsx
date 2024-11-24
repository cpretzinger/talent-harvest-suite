import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarketMetrics } from "@/types/market";

export function MarketComparisonTool() {
  const { data: marketData } = useQuery({
    queryKey: ['market-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_data')
        .select('*');
      
      if (error) throw error;

      // Transform array to Record<string, MarketMetrics>
      return data.reduce((acc, market) => {
        acc[market.market_name] = {
          demographics: {
            population: market.population,
            medianIncome: Number(market.median_income),
            medianAge: 0, // Add these fields to your market_data table if needed
            householdSize: 0,
            educationLevel: {}
          },
          insurance: {
            penetration: Number(market.insurance_penetration),
            averagePremium: 0,
            lapsedPolicies: 0,
            marketSize: 0
          },
          competition: {
            agentDensity: Number(market.competitor_density),
            carrierCount: 0,
            marketShare: {},
            averageProduction: 0
          },
          growth: {
            populationGrowth: Number(market.growth_rate),
            incomeGrowth: 0,
            businessGrowth: 0,
            developmentIndex: 0
          }
        };
        return acc;
      }, {} as Record<string, MarketMetrics>);
    }
  });

  return (
    <div>
      <h2>Market Comparison Tool</h2>
      <ul>
        {Object.keys(marketData || {}).map(marketName => (
          <li key={marketName}>{marketName}</li>
        ))}
      </ul>
    </div>
  );
}
