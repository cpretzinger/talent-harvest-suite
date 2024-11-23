import { StylePattern } from "@/types/assessment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DISCChartProps {
  data: StylePattern;
}

export const DISCChart = ({ data }: DISCChartProps) => {
  const chartData = [
    { name: "D", value: data.D },
    { name: "I", value: data.I },
    { name: "S", value: data.S },
    { name: "C", value: data.C },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};