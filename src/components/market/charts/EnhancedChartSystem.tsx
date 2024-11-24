import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList } from 'recharts';
import { format } from 'd3-format';

interface ChartTheme {
  primary: string[];
  secondary: string[];
  background: string;
  text: string;
  grid: string;
}

const chartTheme: ChartTheme = {
  primary: ['#26361C', '#AB760F', '#FEFAE2'],
  secondary: ['#4B7BE5', '#E53E3E', '#38A169'],
  background: '#FFFFFF',
  text: '#2D3748',
  grid: '#E2E8F0'
};

interface Thresholds {
  high: number;
  medium: number;
  low: number;
}

interface BarConfig {
  key: string;
  stack?: string;
  thresholds?: Thresholds;
  labelFormatter?: (value: any) => string;
}

interface ChartConfig {
  xAxis: {
    key: string;
    formatter?: (value: any) => string;
  };
  yAxis: {
    format: string;
  };
  tooltip: {
    formatter?: (value: any) => string;
  };
  bars: BarConfig[];
  updateInterval?: number;
}

interface AnimatedChartProps {
  data: any[];
  config: ChartConfig;
  realTimeUpdate?: boolean;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const CustomLegend: React.FC<any> = ({ payload }) => {
  return (
    <div className="flex gap-4 justify-end mb-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export class EnhancedChartSystem {
  static AnimatedBarChart: React.FC<AnimatedChartProps> = ({ 
    data, 
    config,
    realTimeUpdate = false 
  }) => {
    const [animatedData, setAnimatedData] = useState(data);

    useEffect(() => {
      if (realTimeUpdate) {
        const interval = setInterval(() => {
          setAnimatedData(data);
        }, config.updateInterval || 5000);
        return () => clearInterval(interval);
      }
    }, [realTimeUpdate, data, config.updateInterval]);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={animatedData}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
          <XAxis 
            dataKey={config.xAxis.key}
            tick={{ fill: chartTheme.text }}
            tickFormatter={config.xAxis.formatter}
          />
          <YAxis 
            tick={{ fill: chartTheme.text }}
            tickFormatter={value => format(config.yAxis.format)(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {config.bars.map((bar, index) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={chartTheme.primary[index % chartTheme.primary.length]}
              radius={[4, 4, 0, 0]}
              stackId={bar.stack}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={EnhancedChartSystem.getBarColor(
                    entry[bar.key], 
                    bar.thresholds || { high: 80, medium: 40, low: 0 }
                  )}
                />
              ))}
              <LabelList
                dataKey={bar.key}
                position="top"
                formatter={bar.labelFormatter}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  private static getBarColor(value: number, thresholds: Thresholds): string {
    if (value >= thresholds.high) return chartTheme.secondary[0];
    if (value >= thresholds.medium) return chartTheme.secondary[1];
    return chartTheme.secondary[2];
  }
}