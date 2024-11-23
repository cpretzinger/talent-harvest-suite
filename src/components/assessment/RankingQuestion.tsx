import { Question } from "@/types/assessment";
import { Button } from "@/components/ui/button";

interface RankingQuestionProps {
  question: Question;
  onAnswer: (ranking: number[]) => void;
}

export const RankingQuestion = ({ question, onAnswer }: RankingQuestionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <div className="grid gap-2">
        {question.options?.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left"
            onClick={() => onAnswer([index])}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};