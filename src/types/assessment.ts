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
  scores: CategoryScore[];
  dimensional_balance: DimensionalBalance;
  overall_profile: Profile;
}

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  assessment_id: string;
  text: string;
  category: string;
  type: string;
  options?: string[];
  weight: number;
  created_at: string;
}