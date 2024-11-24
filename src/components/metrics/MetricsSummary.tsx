import React from 'react';
import { DailyMetrics } from '@/types/producer/metrics';
import { Card } from "@/components/ui/card";

interface MetricsSummaryProps {
  metrics: DailyMetrics | null;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <Card className="p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4">Daily Metrics Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-medium">Leads</h4>
          <p>Taken: {metrics.metrics.leads.taken}</p>
          <p>Converted: {metrics.metrics.leads.converted}</p>
          <p>Rate: {(metrics.metrics.leads.conversionRate * 100).toFixed(1)}%</p>
        </div>
        <div>
          <h4 className="font-medium">Calls</h4>
          <p>Dials: {metrics.metrics.calls.dials}</p>
          <p>Talk Time: {metrics.metrics.calls.talkTime} min</p>
          <p>Avg Duration: {metrics.metrics.calls.averageCallDuration} min</p>
        </div>
        <div>
          <h4 className="font-medium">Quotes</h4>
          <p>Households: {metrics.metrics.quotes.households}</p>
          <p>Total: {metrics.metrics.quotes.totalQuotes}</p>
          <p>Ratio: {metrics.metrics.quotes.quoteToLeadRatio.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};