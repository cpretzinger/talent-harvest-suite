import { Json } from "./database/schema";

export interface StylePattern {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface ValuesDimension {
  dimension: string;
  score: number;
  description: string;
}

export interface Profile {
  naturalStyle: StylePattern;
  adaptiveStyle: StylePattern;
  values: ValuesDimension[];
}

export interface DimensionalBalance {
  external: {
    empathy: number;
    practicalThinking: number;
    systemsJudgment: number;
  };
  internal: {
    selfEsteem: number;
    roleAwareness: number;
    selfDirection: number;
  };
}

export type ScoreLevel = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';

export interface CategoryScore {
  category: string;
  score: number;
  level: ScoreLevel;
  insights: string[];
}

export interface AssessmentResult {
  user_id: string;
  assessment_id: string;
  scores: Json;
  dimensional_balance: Json;
  overall_profile: Json;
}

export type Question = {
  id: string;
  assessment_id: string;
  text: string;
  category: string;
  type: string;
  options?: Json | null;
  weight: number;
  created_at: string;
};