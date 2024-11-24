import React from 'react';
import { Card } from "@/components/ui/card";
import { MarketOverviewProps } from '@/types/market';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CompetitionMatrix: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  const data = markets.map(market => ({
    name: market.name,
    competitorDensity: metrics[market.id].competition.agentDensity,
    marketSize: metrics[market.id].insurance.marketSize
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Competition Matrix</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis 
              dataKey="competitorDensity" 
              name="Competitor Density"
              label={{ value: 'Competitor Density', position: 'bottom' }}
            />
            <YAxis 
              dataKey="marketSize" 
              name="Market Size"
              label={{ value: 'Market Size', angle: -90, position: 'left' }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Markets" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};