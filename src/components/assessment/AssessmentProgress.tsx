import { Progress } from "@/components/ui/progress";
import { AssessmentProgress as ProgressType } from "@/types/assessment/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentProgressProps {
  progress: ProgressType;
  section: string;
}

export const AssessmentProgress = ({ progress, section }: AssessmentProgressProps) => {
  return (
    <Card className="mb-6 glass-morphism border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg capitalize text-primary">
          {section} Section
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="animate-fade-in">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-secondary/80">Overall Progress</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress.overall)}%</span>
          </div>
          <Progress 
            value={progress.overall} 
            className="h-2 bg-secondary/20" 
          />
        </div>
        <div className="animate-fade-in delay-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-secondary/80">Section Progress</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress.section)}%</span>
          </div>
          <Progress 
            value={progress.section} 
            className="h-2 bg-secondary/20" 
          />
        </div>
      </CardContent>
    </Card>
  );
};