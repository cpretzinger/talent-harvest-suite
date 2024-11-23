import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QuestionDisplay } from "@/components/assessment/QuestionDisplay";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { Question } from "@/types/assessment";
import { Tables } from "@/integrations/supabase/types";

interface AssessmentData extends Omit<Tables<"assessments">, "questions"> {
  questions: Question[];
}

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [responses, setResponses] = useState<any[]>([]);

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["assessment", id],
    queryFn: async () => {
      if (!id) throw new Error("No assessment ID provided");
      
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // Transform the raw questions data into our Question type
      const questions = Array.isArray(data.questions) 
        ? data.questions.map((q: any) => ({
            id: q.id || crypto.randomUUID(),
            text: q.question,
            category: q.category || 'Decisive',
            type: q.type || 'multiple_choice',
            options: q.options,
            weight: q.weight || 1,
            subCategory: q.subCategory
          }))
        : [];

      return {
        ...data,
        questions
      } as AssessmentData;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (assessment && !assessment.started_at) {
      supabase
        .from("assessments")
        .update({ started_at: new Date().toISOString() })
        .eq("id", id);
    }
  }, [assessment, id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: any) => {
    setResponses((prev) => [...prev, answer]);
  };

  const handleNext = () => {
    if (assessment?.questions && currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const completionTime = 3600 - timeRemaining;
      const { error } = await supabase
        .from("assessments")
        .update({
          responses,
          completed_at: new Date().toISOString(),
          completion_time: completionTime,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Assessment Completed",
        description: "Your responses have been submitted successfully.",
      });
      
      navigate("/assessment-complete");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const questions = assessment?.questions || [];
  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Assessment</CardTitle>
            <div className="text-lg font-semibold">
              Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          {currentQuestionData && (
            <div className="space-y-6">
              <QuestionDisplay
                question={currentQuestionData}
                onAnswer={(answer) => {
                  setResponses(prev => [...prev, {
                    questionId: currentQuestionData.id,
                    answer
                  }]);
                  if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(prev => prev + 1);
                  } else {
                    handleSubmit();
                  }
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;