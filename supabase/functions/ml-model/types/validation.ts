export interface ValidationResult {
  licensing: boolean;
  experience: boolean;
  production: boolean;
  compliance: boolean;
  errors?: string[];
}