import React from 'react';
import { Card } from "@/components/ui/card";
import { MarketOverviewProps } from '@/types/market';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const InsuranceMetricsComparison: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  const data = markets.map(market => ({
    name: market.name,
    penetration: metrics[market.id].insurance.penetration,
    averagePremium: metrics[market.id].insurance.averagePremium
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Insurance Metrics</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="penetration" fill="#8884d8" name="Market Penetration" />
            <Bar yAxisId="right" dataKey="averagePremium" fill="#82ca9d" name="Average Premium" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};