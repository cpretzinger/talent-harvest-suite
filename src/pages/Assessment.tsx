import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QuestionDisplay } from "@/components/assessment/QuestionDisplay";
import { Tables } from "@/types/database/tables";
import { AssessmentResponse } from "@/types/assessmentTypes";

type Question = Tables<"questions">;

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600);

  const { data: assessment, isLoading: isLoadingAssessment } = useQuery({
    queryKey: ["assessment", id],
    queryFn: async () => {
      if (!id) throw new Error("No assessment ID provided");
      
      const { data, error } = await supabase
        .from("assessments")
        .select("*, questions(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { mutate: submitResponse } = useMutation({
    mutationFn: async (answer: any) => {
      if (!id || !assessment?.questions?.[currentQuestionIndex]) return;

      const mockUserId = "00000000-0000-0000-0000-000000000000";

      const response = {
        user_id: mockUserId,
        assessment_id: id,
        question_id: assessment.questions[currentQuestionIndex].id,
        answer,
      };

      const { error } = await supabase
        .from("responses")
        .insert([response]);

      if (error) throw error;
    },
    onSuccess: () => {
      if (assessment?.questions && currentQuestionIndex < assessment.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleComplete();
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleComplete = async () => {
    if (!id) return;

    try {
      const mockUserId = "00000000-0000-0000-0000-000000000000";

      const { data: responses } = await supabase
        .from("responses")
        .select("*")
        .eq("assessment_id", id)
        .eq("user_id", mockUserId);

      const result = {
        user_id: mockUserId,
        assessment_id: id,
        scores: calculateScores(responses || []),
        dimensional_balance: calculateDimensionalBalance(responses || []),
        overall_profile: calculateOverallProfile(responses || []),
      };

      const { error } = await supabase
        .from("assessment_results")
        .insert([result]);

      if (error) throw error;

      toast({
        title: "Assessment Completed",
        description: "Your responses have been submitted successfully.",
      });
      
      navigate("/assessment-complete");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoadingAssessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentQuestion = assessment?.questions?.[currentQuestionIndex];
  const progress = assessment?.questions 
    ? ((currentQuestionIndex + 1) / assessment.questions.length) * 100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{assessment?.title}</CardTitle>
            <div className="text-lg font-semibold">
              Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion as any}
              onAnswer={submitResponse}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const calculateScores = (responses: AssessmentResponse[]) => {
  const scores: Record<string, number> = {};
  
  responses.forEach(response => {
    const category = response.answer?.category;
    if (category) {
      scores[category] = (scores[category] || 0) + (response.answer?.value || 0);
    }
  });
  
  return scores;
};

const calculateDimensionalBalance = (responses: AssessmentResponse[]) => {
  const external = {
    empathy: 0,
    practicalThinking: 0,
    systemsJudgment: 0,
  };
  
  const internal = {
    selfEsteem: 0,
    roleAwareness: 0,
    selfDirection: 0,
  };
  
  responses.forEach(response => {
    const dimension = response.answer?.dimension;
    const value = response.answer?.value || 0;
    
    if (dimension) {
      if (dimension in external) {
        external[dimension as keyof typeof external] += value;
      } else if (dimension in internal) {
        internal[dimension as keyof typeof internal] += value;
      }
    }
  });
  
  return { external, internal };
};

const calculateOverallProfile = (responses: AssessmentResponse[]) => {
  const naturalStyle = { D: 0, I: 0, S: 0, C: 0 };
  const adaptiveStyle = { D: 0, I: 0, S: 0, C: 0 };
  const values: { dimension: string; score: number; description: string }[] = [];
  
  responses.forEach(response => {
    const style = response.answer?.style;
    const type = response.answer?.type;
    const value = response.answer?.value || 0;
    
    if (style && type === 'natural') {
      naturalStyle[style as keyof typeof naturalStyle] += value;
    } else if (style && type === 'adaptive') {
      adaptiveStyle[style as keyof typeof adaptiveStyle] += value;
    } else if (response.answer?.dimension) {
      values.push({
        dimension: response.answer.dimension,
        score: value,
        description: response.answer.description || '',
      });
    }
  });
  
  return { naturalStyle, adaptiveStyle, values };
};

export default Assessment;