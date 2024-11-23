import { useState, useEffect } from 'react';
import { useAssessmentData } from '@/hooks/useAssessmentData';
import { useAssessmentProgress } from '@/hooks/useAssessmentProgress';
import { Question, AssessmentResult } from '@/types/assessment';
import { AssessmentSection } from '@/types/assessment/progress';
import { getSectionFromCategory } from '@/utils/assessmentHelpers';
import { QuestionDisplay } from './QuestionDisplay';
import { AssessmentProgress } from './AssessmentProgress';
import { NavigationControls } from './NavigationControls';
import { LoadingSpinner, ErrorMessage } from './AssessmentStateDisplay';

interface AssessmentManagerProps {
  assessmentId: string;
  userId: string;
  onComplete: (results: { results: AssessmentResult; pdfUrl?: string }) => void;
}

export const AssessmentManager = ({ assessmentId, userId, onComplete }: AssessmentManagerProps) => {
  const [currentSection, setCurrentSection] = useState<AssessmentSection>('disc');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { 
    questions, 
    answers, 
    assessmentState,
    handleAnswer,
    saveProgress 
  } = useAssessmentData(assessmentId, userId);

  const { progress } = useAssessmentProgress(
    currentSection,
    currentQuestionIndex,
    questions
  );

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      const nextSection = getSectionFromCategory(questions[currentQuestionIndex].category);
      if (nextSection !== currentSection) {
        setCurrentSection(nextSection);
      }
    }
  }, [currentQuestionIndex, questions, currentSection]);

  if (assessmentState === 'loading') {
    return <LoadingSpinner />;
  }

  if (assessmentState === 'error') {
    return <ErrorMessage />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <ErrorMessage />;
  }

  const handleQuestionAnswer = async (answer: any) => {
    await handleAnswer(answer, currentQuestionIndex, questions, answers, onComplete);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <AssessmentProgress progress={progress} section={currentSection} />
      <QuestionDisplay
        question={currentQuestion}
        onAnswer={handleQuestionAnswer}
      />
      <NavigationControls
        canGoBack={currentQuestionIndex > 0}
        onBack={() => setCurrentQuestionIndex(prev => prev - 1)}
      />
    </div>
  );
};