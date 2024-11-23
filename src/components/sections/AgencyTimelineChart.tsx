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
    <div className="w-full h-[400px] flex flex-col">
      <div className="w-full h-full">
        <LineChart 
          width={350} 
          height={350} 
          data={data} 
          margin={{ top: 20, right: 80, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#26361C" strokeWidth={1.5} className="opacity-80" />
          <XAxis 
            dataKey="year" 
            stroke="#26361C"
            strokeWidth={2}
            label={{ 
              value: 'Time (Years)', 
              position: 'bottom', 
              fill: '#26361C', 
              offset: 0,
              fontSize: 14,
              fontWeight: 600
            }}
            tick={{ fill: '#26361C', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#26361C"
            strokeWidth={2}
            label={{ 
              value: 'Happiness', 
              angle: -90, 
              position: 'insideLeft', 
              fill: '#26361C',
              fontSize: 14,
              fontWeight: 600,
              style: { textAnchor: 'middle' }
            }}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => {
              if (value === 0) return 'Sick and Broke';
              if (value === 100) return 'Wealthy and Healthy';
              return '';
            }}
            tick={{ fill: '#26361C', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#26361C"
            strokeWidth={2}
            label={{ 
              value: 'Team', 
              angle: 90, 
              position: 'insideRight', 
              fill: '#26361C',
              fontSize: 14,
              fontWeight: 600,
              style: { textAnchor: 'middle' }
            }}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => {
              if (value === 0) return 'Weak';
              if (value === 100) return 'Strong';
              return '';
            }}
            tick={{ fill: '#26361C', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#26361C', 
              border: 'none', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 500,
              padding: '8px'
            }}
            labelStyle={{ color: '#FEFAE2', fontWeight: 600 }}
            itemStyle={{ color: '#FEFAE2' }}
            active={false}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="redLine" 
            stroke="#EF4444" 
            strokeWidth={3} 
            dot={false}
            activeDot={false}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="greenLine" 
            stroke="#22C55E" 
            strokeWidth={3} 
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </div>
      <p className="text-center mt-6 text-lg font-semibold bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent drop-shadow-sm">
        We Were On Our Way To Sick And Broke
      </p>
    </div>
  );
};