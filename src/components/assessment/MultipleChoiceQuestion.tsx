import { Question } from "@/types/assessment";
import { Button } from "@/components/ui/button";

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (choice: string) => void;
}

export const MultipleChoiceQuestion = ({ question, onAnswer }: MultipleChoiceQuestionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <div className="grid gap-2">
        {question.options?.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left"
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};