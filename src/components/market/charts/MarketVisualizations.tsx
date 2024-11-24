import { ResponsiveContainer, BarChart, LineChart, ScatterChart, PieChart, Bar, Line, Scatter, Pie, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const MarketVisualizationSystem = {
  // Market Performance Overview
  PerformanceChart: ({ data }: { data: any[] }) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="period" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="premium" fill="#8884d8" name="Premium Volume" />
          <Bar yAxisId="right" dataKey="policies" fill="#82ca9d" name="Policy Count" />
        </BarChart>
      </ResponsiveContainer>
    );
  },

  // Market Growth Trends
  GrowthTrendChart: ({ data }: { data: any[] }) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="marketGrowth" stroke="#8884d8" />
          <Line type="monotone" dataKey="industryAverage" stroke="#82ca9d" />
          <Line type="monotone" dataKey="yourGrowth" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    );
  },

  // Opportunity Matrix
  OpportunityMatrix: ({ data }: { data: any[] }) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <XAxis dataKey="marketPotential" name="Market Potential" />
          <YAxis dataKey="competitionLevel" name="Competition Level" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter 
            name="Markets" 
            data={data} 
            fill="#8884d8"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  },

  // Market Share Distribution
  MarketShareChart: ({ data }: { data: any[] }) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
};