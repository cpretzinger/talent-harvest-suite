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

export type ScoreLevel = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';

export interface Question {
  id: string;
  text: string;
  category: AssessmentCategory;
  subCategory: string;
  type: QuestionType;
  options?: string[];
  weight: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  categories: AssessmentCategory[];
  questions: Question[];
}

export interface CategoryScore {
  category: AssessmentCategory;
  score: number;
  level: ScoreLevel;
  insights: string[];
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

export interface StylePattern {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface ValuesDimension {
  dimension: AssessmentCategory;
  score: number;
  level: ScoreLevel;
  description: string;
}

export interface CoreAttribute {
  name: string;
  score: number;
  category: AssessmentCategory;
}

export interface Profile {
  naturalStyle: StylePattern;
  adaptiveStyle: StylePattern;
  values: ValuesDimension[];
  attributes: CoreAttribute[];
}

export interface AssessmentResult {
  userId: string;
  assessmentId: string;
  timestamp: Date;
  scores: CategoryScore[];
  dimensionalBalance: DimensionalBalance;
  overallProfile: Profile;
}