import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QuestionDisplay } from "@/components/assessment/QuestionDisplay";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/types/database/tables";

type Question = Tables<"questions">;
type Response = Tables<"responses">;

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
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
      if (!user?.id || !id || !assessment?.questions?.[currentQuestionIndex]) return;

      const response = {
        user_id: user.id,
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
    if (!user?.id || !id) return;

    try {
      const { data: responses } = await supabase
        .from("responses")
        .select("*")
        .eq("assessment_id", id)
        .eq("user_id", user.id);

      const result = {
        user_id: user.id,
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
              question={currentQuestion}
              onAnswer={submitResponse}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions for calculating results
const calculateScores = (responses: Response[]) => {
  // Implement scoring logic based on responses
  return {};
};

const calculateDimensionalBalance = (responses: Response[]) => {
  // Implement dimensional balance calculation
  return {};
};

const calculateOverallProfile = (responses: Response[]) => {
  // Implement overall profile calculation
  return {};
};

export default Assessment;