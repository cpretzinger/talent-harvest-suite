import React from 'react';
import { Card } from "@/components/ui/card";
import { MarketOverviewProps } from '@/types/market';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const DemographicsComparison: React.FC<MarketOverviewProps> = ({ markets, metrics }) => {
  const data = markets.map(market => ({
    name: market.name,
    population: metrics[market.id].demographics.population,
    medianIncome: metrics[market.id].demographics.medianIncome,
    medianAge: metrics[market.id].demographics.medianAge
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Demographics Comparison</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="population" fill="#8884d8" name="Population" />
            <Bar yAxisId="right" dataKey="medianIncome" fill="#82ca9d" name="Median Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};