export interface AssessmentAnswer {
  category?: string;
  value?: number;
  dimension?: string;
  style?: 'D' | 'I' | 'S' | 'C';
  type?: 'natural' | 'adaptive';
  description?: string;
}

export interface AssessmentResponse {
  id: string;
  user_id: string;
  assessment_id: string;
  question_id: string;
  answer: AssessmentAnswer;
  created_at: string;
}