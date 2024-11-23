import { Tables } from "./database/tables";

export type Question = Tables<"questions"> & {
  options?: string[];
};

export type Assessment = Tables<"assessments">;
export type AssessmentResult = Tables<"assessment_results">;
export type Response = Tables<"responses">;

export type QuestionType = 'likert' | 'ranking' | 'multiple_choice';

export type AssessmentCategory = 
  | 'Decisive'
  | 'Interactive'
  | 'Stability'
  | 'Cautious'
  | 'Aesthetic'
  | 'Economic'
  | 'Individualistic'
  | 'Political'
  | 'Altruist'
  | 'Regulatory'
  | 'Theoretical';

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