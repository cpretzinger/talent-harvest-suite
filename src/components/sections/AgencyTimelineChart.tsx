import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: 2004, redLine: 90, greenLine: 20 },
  { year: 2008, redLine: 75, greenLine: 30 },
  { year: 2012, redLine: 60, greenLine: 45 },
  { year: 2016, redLine: 45, greenLine: 60 },
  { year: 2020, redLine: 30, greenLine: 75 },
  { year: 2024, redLine: 15, greenLine: 90 },
];

export const AgencyTimelineChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="year" stroke="#FEFAE2" />
          <YAxis stroke="#FEFAE2" label={{ value: 'Happiness', angle: -90, position: 'insideLeft', fill: '#FEFAE2' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#26361C', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#FEFAE2' }}
          />
          <Line type="monotone" dataKey="redLine" stroke="#EF4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="greenLine" stroke="#22C55E" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};