import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentQuestion: number;
  totalQuestions: number;
  section: string;
}

export function ProgressTracker({ 
  currentQuestion, 
  totalQuestions, 
  section 
}: ProgressTrackerProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span className="capitalize">{section}</span>
        <span>
          {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}