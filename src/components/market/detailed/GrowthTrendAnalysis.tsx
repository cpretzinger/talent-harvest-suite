import React from 'react';
import { Card } from "@/components/ui/card";
import { DetailedComparisonProps } from '@/types/market';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const GrowthTrendAnalysis: React.FC<DetailedComparisonProps> = ({ markets, metrics, dateRange }) => {
  const data = markets.map(market => ({
    name: market.name,
    populationGrowth: metrics[market.id].growth.populationGrowth,
    businessGrowth: metrics[market.id].growth.businessGrowth,
    developmentIndex: metrics[market.id].growth.developmentIndex
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="populationGrowth" stroke="#8884d8" name="Population Growth" />
            <Line type="monotone" dataKey="businessGrowth" stroke="#82ca9d" name="Business Growth" />
            <Line type="monotone" dataKey="developmentIndex" stroke="#ffc658" name="Development Index" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};