import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AssessmentComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Assessment Completed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            Thank you for completing the assessment. Your responses have been submitted successfully.
          </p>
          <Button onClick={() => navigate("/leads")} className="w-full">
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentComplete;