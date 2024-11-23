export type AssessmentSection = 'disc' | 'values' | 'attributes';

export type AssessmentState = 'loading' | 'ready' | 'error';

export interface AssessmentProgress {
  overall: number;
  section: number;
}