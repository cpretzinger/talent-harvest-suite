import { ChartInstance } from "@/types/visualization";

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'radar';

export interface ChartOptions {
  title?: string;
  animate?: boolean;
  stacked?: boolean;
  legend?: boolean;
  grid?: boolean;
}

export interface InteractionConfig {
  zoom?: {
    enabled: boolean;
    mode?: 'x' | 'y' | 'xy';
    sensitivity?: number;
  };
  pan?: {
    enabled: boolean;
    mode?: 'x' | 'y' | 'xy';
  };
  tooltip?: {
    enabled: boolean;
    intersect?: boolean;
    mode?: 'index' | 'point';
  };
}

export interface UpdateConfig {
  realtime?: boolean;
  interval?: number;
  batchSize?: number;
}

export interface ChartConfig {
  type: ChartType;
  data: any[];
  options: ChartOptions;
  interactions?: InteractionConfig;
  updates?: UpdateConfig;
}