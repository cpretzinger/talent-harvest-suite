import { EventSystem } from "@/systems/EventSystem";
import { UpdateQueue } from "@/utils/visualization/realTimeUpdates";
import { ChartConfig, ChartType } from "./types";
import { ChartInstance } from "@/types/visualization";
import { supabase } from "@/integrations/supabase/client";

export class VisualizationSystem {
  private charts: Map<string, ChartInstance>;
  private updateQueue: UpdateQueue;
  private eventSystem: EventSystem;

  constructor() {
    this.charts = new Map();
    this.eventSystem = new EventSystem();
    this.setupUpdateQueue();
  }

  private setupUpdateQueue() {
    this.updateQueue = new UpdateQueue({
      batchSize: 10,
      interval: 1000,
      onFlush: (updates) => {
        updates.forEach(update => {
          const chart = this.charts.get(update.chartId);
          if (chart) {
            chart.updateData(update.data, {
              animate: true,
              duration: 500,
              easing: 'easeInOutQuad'
            });
            this.eventSystem.emit('chartUpdate', { chartId: update.chartId, data: update.data });
          }
        });
      }
    });
  }

  private setupRealtimeUpdates(chartId: string) {
    const channel = supabase.channel(`chart_${chartId}`)
      .on('broadcast', { event: 'data_update' }, (payload) => {
        this.updateQueue.add({
          chartId,
          data: payload.data
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  createChart(config: ChartConfig): string {
    const chartId = crypto.randomUUID();
    
    const chart = {
      id: chartId,
      updateData: (data: any, options: any) => {
        this.eventSystem.emit('chartUpdate', { chartId, data });
      }
    };

    this.charts.set(chartId, chart);
    
    if (config.updates?.realtime) {
      this.setupRealtimeUpdates(chartId);
    }

    return chartId;
  }

  updateChart(chartId: string, data: any) {
    const chart = this.charts.get(chartId);
    if (chart) {
      chart.updateData(data, {
        animate: true,
        duration: 500,
        easing: 'easeInOutQuad'
      });
    }
  }

  destroyChart(chartId: string) {
    this.charts.delete(chartId);
  }

  getEventSystem() {
    return this.eventSystem;
  }
}