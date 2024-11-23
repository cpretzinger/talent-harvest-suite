import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AssessmentManager } from "@/components/assessment/AssessmentManager";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/assessment/AssessmentStateDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function AssessmentPage() {
  const { id: assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

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
    toast({
      title: "Assessment Complete",
      description: "Your responses have been submitted successfully.",
    });
    navigate(`/assessment-complete`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <LoadingSpinner />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Assessment Not Found</h2>
          <p className="text-secondary">The requested assessment could not be found.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-morphism overflow-hidden border-0 shadow-xl">
          <div className="p-6 sm:p-8">
            <header className="mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {assessment.title}
              </h1>
              {assessment.description && (
                <p className="text-secondary/80">
                  {assessment.description}
                </p>
              )}
            </header>
            <AssessmentManager
              assessmentId={assessmentId!}
              userId={user.id}
              onComplete={handleComplete}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}