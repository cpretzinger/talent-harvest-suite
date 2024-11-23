import { Progress } from "@/components/ui/progress";
import { AssessmentProgress as ProgressType } from "@/types/assessment/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentProgressProps {
  progress: ProgressType;
  section: string;
}

export const AssessmentProgress = ({ progress, section }: AssessmentProgressProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg capitalize">
          {section} Section
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-medium">{Math.round(progress.overall)}%</span>
          </div>
          <Progress value={progress.overall} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Section Progress</span>
            <span className="text-sm font-medium">{Math.round(progress.section)}%</span>
          </div>
          <Progress value={progress.section} />
        </div>
      </CardContent>
    </Card>
  );
};