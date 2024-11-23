import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Profile, ValuesDimension } from "@/types/assessment";
import { DISCChart } from "./DISCChart";

interface AssessmentResultsProps {
  results: Profile;
}

export const AssessmentResults = ({ results }: AssessmentResultsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your DISC Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Natural Style</h3>
              <DISCChart data={results.naturalStyle} />
            </div>
            <div>
              <h3 className="font-medium">Adaptive Style</h3>
              <DISCChart data={results.adaptiveStyle} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Values Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.values.map((value: ValuesDimension) => (
              <div key={value.dimension} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{value.dimension}</span>
                  <span>{value.score}</span>
                </div>
                <Progress value={value.score} />
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};