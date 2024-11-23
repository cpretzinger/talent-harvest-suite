export interface CarrierConfig {
  productFocus: string[];
  minimumRequirements: {
    licenses: string[];
    production: { annual_premium: number };
    training: string[];
  };
  compensationStructure: {
    firstYearCommission: number;
    renewalCommission: number;
    bonusThresholds: {
      level: string;
      premium: number;
    }[];
  };
}

export interface CarrierFitAnalysis {
  productAlignment: number;
  requirementsMet: boolean;
  projectedEarnings: number;
  developmentNeeds: string[];
}

export interface TimeFrame {
  start: Date;
  end: Date;
}

export interface ProducerMetrics {
  productionMetrics: any;
  clientMetrics: any;
  developmentMetrics: any;
  trends: any;
  benchmarks: any;
}

export interface DevelopmentProgress {
  currentPhase: string;
  completedMilestones: string[];
  nextSteps: string[];
  developmentPlan: {
    shortTerm: any;
    mediumTerm: any;
    longTerm: any;
  };
  support: {
    mentoring: any;
    resources: any;
    training: any;
  };
}

export interface MarketAnalysis {
  marketSize: number;
  competitiveLandscape: any;
  opportunities: string[];
  recommendations: string[];
  targetSegments: string[];
}

export interface ComplianceStatus {
  licensingStatus: any;
  salesPractices: any;
  regulatoryCompliance: any;
  alerts: {
    urgent: string[];
    upcoming: string[];
    resolved: string[];
  };
  action_items: string[];
}

export interface ProducerEvaluation {
  carrierFit: CarrierFitAnalysis;
  metrics: ProducerMetrics;
  development: DevelopmentProgress;
  market: MarketAnalysis;
  compliance: ComplianceStatus;
  recommendations: string[];
}