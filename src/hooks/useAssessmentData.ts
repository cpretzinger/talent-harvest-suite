import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Question, AssessmentResult } from '@/types/assessment';
import { AssessmentState } from '@/types/assessment/progress';
import { useToast } from "@/hooks/use-toast";
import { generatePDFReport } from '@/utils/reportGenerator';

export const useAssessmentData = (assessmentId: string, userId: string) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('loading');

  useEffect(() => {
    loadAssessment();
  }, [assessmentId, userId]);

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

      const transformedQuestions: Question[] = loadedQuestions?.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options.map(String) : undefined
      })) || [];

      setQuestions(transformedQuestions);
      
      if (savedProgress) {
        const parsedAnswers = typeof savedProgress.answers === 'string' 
          ? JSON.parse(savedProgress.answers) 
          : savedProgress.answers;
        setAnswers(parsedAnswers);
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

  const saveProgress = async (newAnswers: Record<string, any>, index: number) => {
    try {
      const { error } = await supabase
        .from('assessment_progress')
        .upsert({
          user_id: userId,
          assessment_id: assessmentId,
          answers: newAnswers,
          current_question: index,
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

  const handleAnswer = async (
    answer: any, 
    currentQuestionIndex: number, 
    questions: Question[], 
    answers: Record<string, any>,
    onComplete: (results: { results: AssessmentResult; pdfUrl?: string }) => void
  ) => {
    if (!questions[currentQuestionIndex]) return;

    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [questionId]: answer };
    const nextIndex = currentQuestionIndex + 1;
    
    setAnswers(newAnswers);
    await saveProgress(newAnswers, nextIndex);

    if (nextIndex >= questions.length) {
      await handleCompletion(newAnswers, onComplete);
    }
  };

  const handleCompletion = async (
    finalAnswers: Record<string, any>,
    onComplete: (results: { results: AssessmentResult; pdfUrl?: string }) => void
  ) => {
    try {
      const mockResults: AssessmentResult = {
        user_id: userId,
        assessment_id: assessmentId,
        scores: [],
        dimensional_balance: {
          external: { empathy: 75, practicalThinking: 65, systemsJudgment: 80 },
          internal: { selfEsteem: 70, roleAwareness: 85, selfDirection: 75 }
        },
        overall_profile: {
          naturalStyle: { D: 65, I: 75, S: 45, C: 85 },
          adaptiveStyle: { D: 70, I: 70, S: 50, C: 80 },
          values: [
            { dimension: "Achievement", score: 85, description: "Strong drive for success" },
            { dimension: "Independence", score: 75, description: "Values autonomy" },
            { dimension: "Recognition", score: 65, description: "Moderate need for acknowledgment" }
          ]
        }
      };

      const { error: resultsError } = await supabase
        .from('assessment_results')
        .insert({
          assessment_id: assessmentId,
          user_id: userId,
          scores: JSON.stringify(mockResults.scores),
          dimensional_balance: JSON.stringify(mockResults.dimensional_balance),
          overall_profile: JSON.stringify(mockResults.overall_profile),
        });

      if (resultsError) throw resultsError;

      await supabase
        .from('assessment_progress')
        .delete()
        .match({ user_id: userId, assessment_id: assessmentId });

      const pdfUrl = await generatePDFReport(mockResults);
      onComplete({ results: mockResults, pdfUrl });
    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: "Error",
        description: "Failed to save assessment results. Please try again.",
        variant: "destructive",
      });
      setAssessmentState('error');
    }
  };

  return {
    questions,
    answers,
    assessmentState,
    handleAnswer,
    saveProgress
  };
};