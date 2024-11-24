import React from 'react';
import { MatrixProps } from '@/types/market';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';
import { calculateOpportunityScore } from '@/utils/market';

export const MarketPotentialMatrix: React.FC<MatrixProps> = ({ markets, metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Market Potential Matrix</h3>
      <div className="relative h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis 
              dataKey="marketSize" 
              name="Market Size" 
              unit="M" 
            />
            <YAxis 
              dataKey="growth" 
              name="Growth Potential" 
              unit="%" 
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter 
              data={markets.map(m => ({
                name: m.name,
                marketSize: metrics[m.id].insurance.marketSize,
                growth: metrics[m.id].growth.developmentIndex,
                opportunity: calculateOpportunityScore(metrics[m.id])
              }))} 
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};