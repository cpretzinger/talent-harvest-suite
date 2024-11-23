import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SendInvitation } from "@/components/assessment/SendInvitation";
import { useAuth } from "@/contexts/AuthContext";
import { AssessmentManager } from "@/components/assessment/AssessmentManager";

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();

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

  const { data: assessment, isLoading } = useQuery({
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
      
      return data;
    },
    enabled: Boolean(id),
  });

  const handleComplete = async (results: any) => {
    toast({
      title: "Assessment Completed",
      description: "Your responses have been submitted successfully.",
    });
    navigate("/assessment-complete");
  };

  if (isLoading) {
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

  const userId = user?.id || invitation?.id;
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in to take this assessment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{assessment.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AssessmentManager
            assessmentId={id!}
            userId={userId}
            onComplete={handleComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;