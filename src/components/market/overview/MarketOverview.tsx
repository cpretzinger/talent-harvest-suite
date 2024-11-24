import React from 'react';
import { MarketOverviewProps } from '@/types/market';
import { PopulationChart } from '../charts/PopulationChart';
import { PenetrationChart } from '../charts/PenetrationChart';
import { CompetitionMatrix } from './CompetitionMatrix';
import { GrowthPotentialChart } from './GrowthPotentialChart';
import { Card } from "@/components/ui/card";

export const MarketOverview: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Population Distribution</h3>
          <PopulationChart
            data={markets.map(m => ({
              market: m.name,
              population: metrics[m.id].demographics.population,
              growth: metrics[m.id].growth.populationGrowth
            }))}
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Insurance Penetration</h3>
          <PenetrationChart
            data={markets.map(m => ({
              market: m.name,
              penetration: metrics[m.id].insurance.penetration,
              premium: metrics[m.id].insurance.averagePremium
            }))}
          />
        </Card>
      </div>

      <CompetitionMatrix markets={markets} metrics={metrics} />
      <GrowthPotentialChart markets={markets} metrics={metrics} />
    </div>
  );
};