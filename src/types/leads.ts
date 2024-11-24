export interface LeadData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
  pipeline_stage?: string;
  lead_score?: number;
}

export interface ScoredLead extends LeadData {
  score: number;
  factors: ScoreFactor[];
  recommendations: string[];
}

export interface ScoreFactor {
  name: string;
  weight: number;
  impact: number;
}

export interface ColumnMapping {
  sourceColumn: string;
  mappedColumn: string;
  confidence: number;
  transformations: any[];
}

export interface ColumnStatistics {
  mean: number;
  median: number;
  mode: number;
  stdDev: number;
}

export interface PatternAnalysis {
  patterns: any;
  significance: number;
  recommendations: string[];
}

export interface ConversionPatterns {
  timeToConversion: any;
  conversionFactors: any;
  successPredictors: any;
}

export interface TemporalPatterns {
  seasonality: any;
  timeOfDayEffects: any;
  responseLatency: any;
}

export interface BehavioralPatterns {
  engagementSequences: any;
  interactionFrequency: any;
  responsePatterns: any;
}

export interface ValidationRule {
  type: string;
  params: any;
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface CustomField {
  id: string;
  name: string;
  type: string;
  validation_rules?: ValidationRule[];
  default_value?: any;
  options?: SelectOption[];
}

export interface Pattern {
  type: string;
  data: any;
  confidence: number;
}