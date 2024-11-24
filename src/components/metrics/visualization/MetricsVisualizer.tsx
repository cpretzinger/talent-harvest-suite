import React from 'react';
import { ResponsiveContainer, ComposedChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";

interface MetricsVisualizerProps {
  timeframe: 'daily' | 'weekly' | 'monthly';
  producerId?: string;
  teamId?: string;
}

export const MetricsVisualizer: React.FC<MetricsVisualizerProps> = ({
  timeframe,
  producerId,
  teamId
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ConversionMetrics />
      <ActivityMetrics />
    </div>
  );
};

const ConversionMetrics: React.FC = () => {
  const data = [
    { date: '2024-01', leadsTotal: 100, leadsConverted: 30, conversionRate: 0.3 },
    { date: '2024-02', leadsTotal: 120, leadsConverted: 42, conversionRate: 0.35 },
    // ... sample data
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Conversion Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="leads" />
          <YAxis yAxisId="rate" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="leads" dataKey="leadsTotal" fill="#8884d8" name="Total Leads" />
          <Bar yAxisId="leads" dataKey="leadsConverted" fill="#82ca9d" name="Converted" />
          <Line yAxisId="rate" dataKey="conversionRate" stroke="#ff7300" name="Conversion Rate" />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

const ActivityMetrics: React.FC = () => {
  const data = [
    { hour: '9AM', dials: 20, talkTime: 45, quotes: 3 },
    { hour: '10AM', dials: 25, talkTime: 52, quotes: 4 },
    // ... sample data
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Activity Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dials" fill="#8884d8" name="Dials" />
          <Bar dataKey="talkTime" fill="#82ca9d" name="Talk Time (min)" />
          <Bar dataKey="quotes" fill="#ffc658" name="Quotes" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};