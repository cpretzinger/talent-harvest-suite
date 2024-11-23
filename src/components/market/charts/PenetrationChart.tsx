import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartProps } from '@/types/market';

export const PenetrationChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="market" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="penetration" fill="#8884d8" />
        <Bar dataKey="premium" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};