import React, { useEffect, useRef, useState } from 'react';
import { ChartConfig } from '@/systems/visualization/types';
import { VisualizationSystem } from '@/systems/visualization/VisualizationSystem';
import { ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  Move, 
  RotateCcw 
} from 'lucide-react';

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
    }

    return () => {
      if (chartId) {
        visualizationSystem.destroyChart(chartId);
      }
    };
  }, []);

  useEffect(() => {
    if (chartId) {
      visualizationSystem.updateChart(chartId, data);
    }
  }, [data]);

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
          <div>Chart content will be rendered here by the visualization system</div>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};