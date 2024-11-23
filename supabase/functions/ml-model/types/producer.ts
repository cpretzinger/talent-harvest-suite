export interface ProducerFeatures {
  background: {
    education: string;
    experience: number;
    licenses: string[];
  };
  assessment: {
    salesAptitude: number;
    productKnowledge: number;
    personalityProfile: any;
  };
  performance: {
    productionMetrics: any;
    clientRetention: number;
    complianceRecord: any;
  };
  licensing: {
    type: string;
    status: string;
    expirationDate: Date;
  };
  compliance: {
    violations: number;
    lastReviewDate: Date;
    status: string;
  };
}

export interface ProducerPerformance {
  metrics: {
    policiesSold: number;
    premiumVolume: number;
    retentionRate: number;
  };
  timeline: {
    licensingCompletion: Date;
    firstSale: Date;
    consistentProduction: Date;
  };
}

export interface ProducerCandidate {
  resume: string;
  background: {
    education: string;
    experience: number;
    licenses: string[];
  };
  assessment: {
    salesAptitude: number;
    productKnowledge: number;
    personalityProfile: any;
  };
}

export interface ProducerEvaluation {
  candidateProfile: {
    strengths: string[];
    developmentAreas: string[];
    readiness: number;
  };
  successPrediction: {
    score: number;
    confidence: number;
    keyFactors: string[];
  };
  developmentPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  riskAssessment: {
    retentionRisk: number;
    productivityRisk: number;
    complianceRisk: number;
  };
}