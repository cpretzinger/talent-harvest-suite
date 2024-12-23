import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

export class UpdateQueue {
  private queue: any[] = [];
  private timer: NodeJS.Timeout | null = null;
  private config: {
    batchSize: number;
    interval: number;
    onFlush: (updates: any[]) => void;
  };

  constructor(config: {
    batchSize: number;
    interval: number;
    onFlush: (updates: any[]) => void;
  }) {
    this.config = config;
  }

  add(update: any) {
    this.queue.push(update);
    
    if (this.queue.length >= this.config.batchSize) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.config.interval);
    }
  }

  private flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.queue.length > 0) {
      this.config.onFlush([...this.queue]);
      this.queue = [];
    }
  }

  clear() {
    this.queue = [];
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const setupRealtimeUpdates = (onUpdate: (payload: any) => void) => {
  const channel: RealtimeChannel = supabase.channel('db_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'producer_daily_metrics'
      },
      (payload) => onUpdate(payload)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};