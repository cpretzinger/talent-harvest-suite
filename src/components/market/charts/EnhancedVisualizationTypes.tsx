import React from 'react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, FunnelChart, Funnel, LabelList } from 'recharts';
import { Card } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

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
    const { data: activityData } = useQuery({
      queryKey: ['activity-heatmap'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('producer_daily_metrics')
          .select('*');
        
        if (error) throw error;
        return data;
      }
    });

    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Activity Heat Map</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <div className="grid grid-cols-24 gap-1">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="h-8"
                  style={{
                    backgroundColor: `rgba(227, 74, 51, ${item.conversionRate})`,
                  }}
                  title={`${item.dayOfWeek} ${item.hourOfDay}:00 - ${item.conversionRate * 100}%`}
                />
              ))}
            </div>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  },

  LeadFunnel: () => {
    const { data: funnelData } = useQuery({
      queryKey: ['lead-funnel'],
      queryFn: async () => {
        const { data: leads, error } = await supabase
          .from('leads')
          .select('status');
        
        if (error) throw error;

        const stages = {
          'new': 0,
          'contacted': 0,
          'quoted': 0,
          'converted': 0
        };

        leads?.forEach(lead => {
          if (lead.status in stages) {
            stages[lead.status as keyof typeof stages]++;
          }
        });

        return Object.entries(stages).map(([stage, value]) => ({
          stage: stage.charAt(0).toUpperCase() + stage.slice(1),
          value
        }));
      }
    });

    if (!funnelData) return null;

    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Lead Funnel</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
                fill="#8884d8"
              >
                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  },

  SkillsRadar: () => {
    const { data: skillsData } = useQuery({
      queryKey: ['producer-skills'],
      queryFn: async () => {
        const { data: metrics, error } = await supabase
          .from('producer_daily_metrics')
          .select('metrics');
        
        if (error) throw error;

        // Transform metrics into radar chart data
        const categories = ['Cold Calling', 'Closing Rate', 'Product Knowledge', 'Customer Service', 'Documentation'];
        return categories.map(category => ({
          category,
          value: Math.floor(Math.random() * 100) // This should be calculated from actual metrics
        }));
      }
    });

    if (!skillsData) return null;

    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Skills Assessment</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
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