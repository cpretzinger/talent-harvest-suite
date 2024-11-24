import React from 'react';
import { Card } from "@/components/ui/card";
import { MarketOverviewProps } from '@/types/market';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const GrowthPotentialChart: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  const data = markets.map(market => ({
    name: market.name,
    growthRate: metrics[market.id].growth.developmentIndex,
    marketPotential: metrics[market.id].insurance.marketSize * metrics[market.id].growth.developmentIndex
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Growth Potential</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="growthRate" stroke="#8884d8" name="Growth Rate" />
            <Line type="monotone" dataKey="marketPotential" stroke="#82ca9d" name="Market Potential" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};