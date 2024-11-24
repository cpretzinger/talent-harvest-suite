import React from 'react';
import { Card } from "@/components/ui/card";
import { MarketOverviewProps } from '@/types/market';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CompetitionAnalysis: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  const data = markets.map(market => ({
    name: market.name,
    agentDensity: metrics[market.id].competition.agentDensity,
    carrierCount: metrics[market.id].competition.carrierCount
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Competition Analysis</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis dataKey="agentDensity" name="Agent Density" />
            <YAxis dataKey="carrierCount" name="Carrier Count" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Markets" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};