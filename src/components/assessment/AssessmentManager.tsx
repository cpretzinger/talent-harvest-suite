import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Question, AssessmentResult } from '@/types/assessment';
import { AssessmentState, AssessmentSection } from '@/types/assessment/progress';
import { getSectionFromCategory, calculateSectionProgress } from '@/utils/assessmentHelpers';
import { QuestionDisplay } from './QuestionDisplay';
import { AssessmentProgress } from './AssessmentProgress';
import { NavigationControls } from './NavigationControls';
import { LoadingSpinner, ErrorMessage } from './AssessmentStateDisplay';
import { useToast } from "@/hooks/use-toast";

interface AssessmentManagerProps {
  assessmentId: string;
  userId: string;
  onComplete: (results: { results: AssessmentResult; pdfUrl?: string }) => void;
}

export const AssessmentManager = ({ assessmentId, userId, onComplete }: AssessmentManagerProps) => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState<AssessmentSection>('disc');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('loading');

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const { data: loadedQuestions, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .eq('assessment_id', assessmentId)
          .order('category', { ascending: true })
          .order('sub_category', { ascending: true });

        if (questionsError) throw questionsError;

        const { data: savedProgress, error: progressError } = await supabase
          .from('assessment_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('assessment_id', assessmentId)
          .single();

        if (progressError && progressError.code !== 'PGRST116') throw progressError;

        // Transform the questions to match the Question type
        const transformedQuestions: Question[] = loadedQuestions?.map(q => ({
          ...q,
          options: Array.isArray(q.options) ? q.options : undefined
        })) || [];

        setQuestions(transformedQuestions);
        
        if (savedProgress) {
          const parsedAnswers = typeof savedProgress.answers === 'string' 
            ? JSON.parse(savedProgress.answers) 
            : savedProgress.answers;
          
          setAnswers(parsedAnswers);
          setCurrentQuestionIndex(savedProgress.current_question);
          setCurrentSection(savedProgress.current_section as AssessmentSection);
        }
        setAssessmentState('ready');
      } catch (error) {
        console.error('Error loading assessment:', error);
        toast({
          title: "Error",
          description: "Failed to load assessment. Please try again.",
          variant: "destructive",
        });
        setAssessmentState('error');
      }
    };

    loadAssessment();
  }, [assessmentId, userId, toast]);

  const saveProgress = async (newAnswers: Record<string, any>, index: number) => {
    try {
      const { error } = await supabase
        .from('assessment_progress')
        .upsert({
          user_id: userId,
          assessment_id: assessmentId,
          answers: newAnswers,
          current_question: index,
          current_section: currentSection,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Warning",
        description: "Failed to save progress. Your answers are still recorded.",
        variant: "destructive",
      });
    }
  };

  const handleAnswer = async (answer: any) => {
    if (!questions[currentQuestionIndex]) return;

    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [questionId]: answer };
    const nextIndex = currentQuestionIndex + 1;
    
    setAnswers(newAnswers);
    await saveProgress(newAnswers, nextIndex);

    if (nextIndex >= questions.length) {
      try {
        const { error: resultsError } = await supabase
          .from('assessment_results')
          .insert([{
            assessment_id: assessmentId,
            user_id: userId,
            scores: JSON.stringify({}), // This will be replaced by actual scores
            dimensional_balance: JSON.stringify({}), // This will be replaced by actual balance
            overall_profile: JSON.stringify({}), // This will be replaced by actual profile
          }]);

        if (resultsError) throw resultsError;

        await supabase
          .from('assessment_progress')
          .delete()
          .match({ user_id: userId, assessment_id: assessmentId });

        onComplete({ results: {
          user_id: userId,
          assessment_id: assessmentId,
          scores: [],
          dimensional_balance: {
            external: { empathy: 0, practicalThinking: 0, systemsJudgment: 0 },
            internal: { selfEsteem: 0, roleAwareness: 0, selfDirection: 0 }
          },
          overall_profile: {
            naturalStyle: { D: 0, I: 0, S: 0, C: 0 },
            adaptiveStyle: { D: 0, I: 0, S: 0, C: 0 },
            values: []
          }
        }});
      } catch (error) {
        console.error('Error saving results:', error);
        toast({
          title: "Error",
          description: "Failed to save assessment results. Please try again.",
          variant: "destructive",
        });
        setAssessmentState('error');
      }
    } else {
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = questions[nextIndex];
      if (nextQuestion && nextQuestion.category !== questions[currentQuestionIndex].category) {
        setCurrentSection(getSectionFromCategory(nextQuestion.category));
      }
    }
  };

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

  const progress = {
    overall: (currentQuestionIndex / questions.length) * 100,
    section: calculateSectionProgress(currentSection, currentQuestionIndex, questions)
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AssessmentProgress progress={progress} section={currentSection} />
      <QuestionDisplay
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
      <NavigationControls
        canGoBack={currentQuestionIndex > 0}
        onBack={() => setCurrentQuestionIndex(prev => prev - 1)}
      />
    </div>
  );
};