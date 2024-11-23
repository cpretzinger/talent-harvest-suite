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
import { calculateScores, calculateDimensionalBalance, calculateOverallProfile } from "@/utils/assessmentCalculations";

type Question = Tables<"questions">;

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
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
        .select(`
          *,
          questions (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load assessment. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
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

      const { data: responsesData } = await supabase
        .from("responses")
        .select("*")
        .eq("assessment_id", id)
        .eq("user_id", mockUserId);

      // Cast the responses to the correct type
      const responses = (responsesData || []) as AssessmentResponse[];

      const result = {
        user_id: mockUserId,
        assessment_id: id,
        scores: calculateScores(responses),
        dimensional_balance: calculateDimensionalBalance(responses),
        overall_profile: calculateOverallProfile(responses),
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

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Assessment Not Found</h2>
          <p className="text-gray-600">The requested assessment could not be found.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = assessment.questions?.[currentQuestionIndex];
  const progress = assessment.questions 
    ? ((currentQuestionIndex + 1) / assessment.questions.length) * 100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{assessment.title}</CardTitle>
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

export default Assessment;