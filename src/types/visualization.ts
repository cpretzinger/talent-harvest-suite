export interface VisualizationConfig {
  drilling: {
    enableZoom: boolean;
    enablePan: boolean;
    drilldownLevels: ('day' | 'week' | 'month' | 'quarter')[];
  };
  comparison: {
    enablePeerComparison: boolean;
    enableHistoricalComparison: boolean;
    enableTeamComparison: boolean;
  };
  customization: {
    enableMetricSelection: boolean;
    enableColorCustomization: boolean;
    enableLayoutCustomization: boolean;
  };
  export: {
    formats: ('png' | 'pdf' | 'svg')[];
    enableAnnotations: boolean;
    enableCustomSizing: boolean;
  };
}

export interface ChartInstance {
  updateData: (data: any, options: {
    animate: boolean;
    duration: number;
    easing: string;
  }) => void;
}

export interface MetricUpdate {
  chartId: string;
  data: any;
}