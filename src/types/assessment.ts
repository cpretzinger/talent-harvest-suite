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

export interface Question {
  id: string;
  text: string;
  category: AssessmentCategory;
  subCategory?: string;
  type: QuestionType;
  options?: string[];
  weight: number;
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

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
  primary: string;
  secondary: string;
  score: number;
}

export interface CategoryScore {
  category: string;
  score: number;
}

export interface AssessmentResult {
  naturalStyle: StylePattern;
  adaptiveStyle: StylePattern;
  values: ValuesDimension[];
}