import { Button } from "@/components/ui/button";
import { Question } from "@/types/assessment";

interface LikertQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
}

export const LikertQuestion = ({ question, onAnswer }: LikertQuestionProps) => {
  const options = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <div className="grid gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            variant="outline"
            className="justify-start text-left"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};