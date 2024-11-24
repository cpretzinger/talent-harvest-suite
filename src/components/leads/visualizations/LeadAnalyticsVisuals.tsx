import React, { useMemo } from 'react';
import { ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip } from 'recharts';
import { LeadData } from '@/types/leads';

interface LeadAnalyticsProps {
  data: LeadData[];
  patterns: any;
}

export const LeadAnalyticsVisuals: React.FC<LeadAnalyticsProps> = ({
  data,
  patterns
}) => {
  return (
    <div className="lead-analytics-dashboard grid gap-4 p-4">
      <ConversionFunnelChart data={data} />
      <TimeToConversionGraph data={data} />
      <EngagementHeatmap data={data} />
      <PatternCorrelationMatrix patterns={patterns} />
    </div>
  );
};

interface FunnelData {
  stage: string;
  value: number;
}

const ConversionFunnelChart: React.FC<{ data: LeadData[] }> = ({ data }) => {
  const funnelData = useMemo(() => prepareFunnelData(data), [data]);

  return (
    <div className="conversion-funnel bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart>
          <Funnel
            data={funnelData}
            dataKey="value"
            nameKey="stage"
            fill="#8884d8"
          >
            <LabelList position="right" fill="#000" stroke="none" />
            <Tooltip />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

const TimeToConversionGraph: React.FC<{ data: LeadData[] }> = ({ data }) => {
  return <div>Time to Conversion Graph</div>;
};

const EngagementHeatmap: React.FC<{ data: LeadData[] }> = ({ data }) => {
  return <div>Engagement Heatmap</div>;
};

const PatternCorrelationMatrix: React.FC<{ patterns: any }> = ({ patterns }) => {
  return <div>Pattern Correlation Matrix</div>;
};

const prepareFunnelData = (data: LeadData[]): FunnelData[] => {
  const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed'];
  return stages.map(stage => ({
    stage,
    value: data.filter(lead => lead.pipeline_stage === stage.toLowerCase()).length
  }));
};