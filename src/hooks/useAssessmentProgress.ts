import { AssessmentProgress } from '@/types/assessment/progress';
import { Question } from '@/types/assessment';
import { calculateSectionProgress } from '@/utils/assessmentHelpers';

export const useAssessmentProgress = (
  currentSection: string,
  currentQuestionIndex: number,
  questions: Question[]
) => {
  const progress: AssessmentProgress = {
    overall: (currentQuestionIndex / questions.length) * 100,
    section: calculateSectionProgress(currentSection, currentQuestionIndex, questions)
  };

  return { progress };
};