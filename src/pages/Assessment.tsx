import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AssessmentManager } from "@/components/assessment/AssessmentManager";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/assessment/AssessmentStateDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AssessmentPage() {
  const { id: assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: async () => {
      if (!assessmentId) throw new Error("No assessment ID provided");
      
      const { data, error } = await supabase
        .from("assessments")
        .select(`
          *,
          questions (*)
        `)
        .eq("id", assessmentId)
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
    enabled: Boolean(assessmentId),
  });

  const handleComplete = async (results: any) => {
    navigate(`/assessment-complete`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardContent className="p-6">
            <AssessmentManager
              assessmentId={assessmentId!}
              onComplete={handleComplete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}