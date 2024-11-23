export interface MarketDriftAnalysis {
  premiumTrends: number[];
  productMixChanges: any;
  competitiveLandscape: any;
}

export interface ProducerDriftAnalysis {
  marketDrift: MarketDriftAnalysis;
  qualificationDrift: any;
  performanceDrift: any;
  recommendations: string[];
}