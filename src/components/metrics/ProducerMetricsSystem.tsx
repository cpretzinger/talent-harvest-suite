import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from "@/hooks/use-toast";
import { DailyMetrics } from '@/types/producer/metrics';
import { MetricsForm } from './MetricsForm';
import { MetricsSummary } from './MetricsSummary';
import { updateMetricsEmbeddings } from '@/utils/ml/LeadScoringSystem';

export const DailyMetricsTracker: React.FC = () => {
  const [metrics, setMetrics] = useState<DailyMetrics | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleMetricSubmission = async (metrics: DailyMetrics) => {
    try {
      setIsSubmitting(true);

      const { data, error } = await supabase
        .from('producer_daily_metrics')
        .insert({
          producer_id: metrics.producerId,
          date: metrics.date,
          metrics: {
            leads: metrics.metrics.leads,
            calls: metrics.metrics.calls,
            quotes: metrics.metrics.quotes
          },
          metadata: metrics.metadata,
          status: metrics.status
        })
        .select()
        .single();

      if (error) throw error;

      await updateMetricsEmbeddings(data);
      setMetrics(data);
      
      toast({
        title: "Success",
        description: "Metrics submitted successfully",
      });
    } catch (error) {
      console.error('Error submitting metrics:', error);
      toast({
        title: "Error",
        description: "Failed to submit metrics",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="metrics-tracker space-y-8">
      <MetricsForm
        onSubmit={handleMetricSubmission}
        isSubmitting={isSubmitting}
      />
      {metrics && <MetricsSummary metrics={metrics} />}
    </div>
  );
};