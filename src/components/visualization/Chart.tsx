import React, { useEffect, useRef, useState } from 'react';
import { ChartConfig } from '@/systems/visualization/types';
import { VisualizationSystem } from '@/systems/visualization/VisualizationSystem';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  PieChart, 
  Pie, 
  RadarChart, 
  Radar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';

interface ChartProps extends ChartConfig {
  className?: string;
  title?: string;
}

const visualizationSystem = new VisualizationSystem();

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options,
  interactions,
  updates,
  className,
  title
}) => {
  const [chartId, setChartId] = useState<string | null>(null);
  const [localData, setLocalData] = useState(data);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartId) {
      const id = visualizationSystem.createChart({
        type,
        data,
        options,
        interactions,
        updates
      });
      setChartId(id);

      // Subscribe to updates if real-time is enabled
      if (updates?.realtime) {
        visualizationSystem.getEventSystem().on('chartUpdate', ({ data: newData }) => {
          setLocalData(newData);
        });
      }
    }

    return () => {
      if (chartId) {
        visualizationSystem.destroyChart(chartId);
      }
    };
  }, []);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={localData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={localData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Legend />
            <Scatter name="Data" data={localData} fill="#8884d8" />
          </ScatterChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={localData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={localData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Tooltip />
            <Legend />
            <Radar name="Data" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {interactions?.zoom && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Move className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
      <div ref={containerRef} className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};