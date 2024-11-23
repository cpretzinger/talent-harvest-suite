import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: 1, redLine: 50, greenLine: 50 },
  { year: 4, redLine: 40, greenLine: 60 },
  { year: 8, redLine: 30, greenLine: 70 },
  { year: 12, redLine: 20, greenLine: 80 },
  { year: 16, redLine: 10, greenLine: 90 },
  { year: 20, redLine: 0, greenLine: 100 },
];

export const AgencyTimelineChart = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FEFAE2" className="opacity-50" />
          <XAxis 
            dataKey="year" 
            stroke="#FEFAE2" 
            label={{ value: 'Time (Years)', position: 'bottom', fill: '#FEFAE2', offset: 0 }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#FEFAE2" 
            label={{ 
              value: 'Happiness', 
              angle: -90, 
              position: 'insideLeft', 
              fill: '#FEFAE2',
              style: { textAnchor: 'middle' }
            }}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => {
              if (value === 0) return 'Sick and Broke';
              if (value === 100) return 'Wealthy and Healthy';
              return '';
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#FEFAE2"
            label={{ 
              value: 'Team', 
              angle: 90, 
              position: 'insideRight', 
              fill: '#FEFAE2',
              style: { textAnchor: 'middle' }
            }}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => {
              if (value === 0) return 'Weak';
              if (value === 100) return 'Strong';
              return '';
            }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#26361C', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#FEFAE2' }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="redLine" 
            stroke="#EF4444" 
            strokeWidth={2} 
            dot={false} 
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="greenLine" 
            stroke="#22C55E" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};