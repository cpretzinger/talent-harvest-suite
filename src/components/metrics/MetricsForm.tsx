import React from 'react';
import { useForm } from 'react-hook-form';
import { DailyMetrics } from '@/types/producer/metrics';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface MetricsFormProps {
  onSubmit: (data: DailyMetrics) => Promise<void>;
  isSubmitting: boolean;
}

export const MetricsForm: React.FC<MetricsFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit } = useForm<DailyMetrics>();

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Leads</h3>
            <Input {...register('metrics.leads.taken')} type="number" placeholder="Leads Taken" />
            <Input {...register('metrics.leads.converted')} type="number" placeholder="Leads Converted" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Calls</h3>
            <Input {...register('metrics.calls.dials')} type="number" placeholder="Number of Dials" />
            <Input {...register('metrics.calls.talkTime')} type="number" placeholder="Talk Time (minutes)" />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Metrics'}
        </Button>
      </form>
    </Card>
  );
};