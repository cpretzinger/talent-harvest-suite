export interface ProducerProfileAnalysis {
  productKnowledge: {
    score: number;
    identifiedProducts: string[];
    depth: 'basic' | 'intermediate' | 'advanced';
  };
  salesCapabilities: {
    prospectingAbility: ProspectingAssessment;
    closingSkills: number;
    clientRelationships: number;
  };
  achievementMetrics: {
    salesVolume: number;
    retentionRate: number;
    marketExpansion: number;
  };
  communicationStyle: {
    persuasiveness: number;
    clarity: number;
    professionalTone: number;
  };
}

export interface ProspectingAssessment {
  methodsIdentified: string[];
  systematicApproach: number;
  digitalCapabilities: number;
  networkingStrength: number;
}

export interface ProducerSuccessAnalysis {
  highestImpactFeatures: string[];
  timeToProductivity: {
    licensingPhase: number;
    initialSales: number;
    sustainableProduction: number;
  };
  retentionIndicators: {
    earlyWarningSignals: string[];
    successPredictors: string[];
  };
}