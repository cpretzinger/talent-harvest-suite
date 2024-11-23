import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuestionDisplay } from "@/components/assessment/QuestionDisplay";
import { SendInvitation } from "@/components/assessment/SendInvitation";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/types/database/tables";
import { AssessmentResponse } from "@/types/assessmentTypes";
import { ResultsCalculator } from "@/utils/ResultsCalculator";

type Question = Tables<"questions">;

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const resultsCalculator = new ResultsCalculator();

  const { data: invitation } = useQuery({
    queryKey: ["invitation", token],
    queryFn: async () => {
      if (!token) return null;
      
      const { data, error } = await supabase
        .from("assessment_invitations")
        .select("*")
        .eq("unique_token", token)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (invitation?.current_question_index) {
      setCurrentQuestionIndex(invitation.current_question_index);
    }
  }, [invitation]);

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
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load assessment. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      if (data) {
        return {
          ...data,
          questions: data.questions.map((q: any) => ({
            ...q,
            options: q.options as string[] | undefined
          }))
        };
      }
      return null;
    },
    enabled: Boolean(id),
  });

  const { mutate: submitResponse } = useMutation({
    mutationFn: async (answer: any) => {
      if (!id || !assessment?.questions?.[currentQuestionIndex]) return;

      const userId = user?.id || invitation?.id;
      if (!userId) throw new Error("No user ID available");

      const response = {
        user_id: userId,
        assessment_id: id,
        question_id: assessment.questions[currentQuestionIndex].id,
        answer,
      };

      const { error } = await supabase
        .from("responses")
        .insert([response]);

      if (error) throw error;

      // Update invitation progress if applicable
      if (token) {
        await supabase
          .from("assessment_invitations")
          .update({ current_question_index: currentQuestionIndex + 1 })
          .eq("unique_token", token);
      }
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

      const { data: responsesData, error: responsesError } = await supabase
        .from("responses")
        .select("*")
        .eq("assessment_id", id)
        .eq("user_id", mockUserId);

      if (responsesError) throw responsesError;

      const responses = (responsesData || []) as AssessmentResponse[];

      const result = resultsCalculator.generateFullReport(responses);

      // Convert complex types to JSON for storage
      const resultForStorage = {
        user_id: mockUserId,
        assessment_id: id,
        scores: JSON.stringify(result.scores),
        dimensional_balance: JSON.stringify(result.dimensional_balance),
        overall_profile: JSON.stringify(result.overall_profile)
      };

      const { error: resultsError } = await supabase
        .from("assessment_results")
        .insert([resultForStorage]);

      if (resultsError) throw resultsError;

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

  // Show invitation form for admins
  if (profile?.role === "administrator" && !token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send Assessment Invitation</CardTitle>
          </CardHeader>
          <CardContent>
            <SendInvitation assessmentId={id!} />
          </CardContent>
        </Card>
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