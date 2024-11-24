import React from 'react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, FunnelChart, Funnel, LabelList } from 'recharts';
import { Card } from "@/components/ui/card";

interface HeatMapProps {
  data: Array<{
    hourOfDay: number;
    dayOfWeek: string;
    conversionRate: number;
  }>;
}

interface FunnelProps {
  data: Array<{
    stage: string;
    value: number;
  }>;
}

interface RadarProps {
  data: Array<{
    category: string;
    value: number;
  }>;
}

export const EnhancedVisualizationTypes = {
  ActivityHeatMap: ({ data }: HeatMapProps) => {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Activity Heat Map</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {/* Using a simplified grid representation for heat map since recharts doesn't have a native heatmap */}
            <div className="grid grid-cols-24 gap-1">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="h-8"
                  style={{
                    backgroundColor: `rgba(227, 74, 51, ${item.conversionRate})`,
                    tooltip: `${item.dayOfWeek} ${item.hourOfDay}:00 - ${item.conversionRate * 100}%`
                  }}
                />
              ))}
            </div>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  },

  LeadFunnel: ({ data }: FunnelProps) => {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Lead Funnel</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                fill="#8884d8"
                gradient
              >
                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  },

  SkillsRadar: ({ data }: RadarProps) => {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Skills Assessment</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  },
};