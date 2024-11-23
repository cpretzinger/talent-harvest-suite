import { Question } from "@/types/assessment";
import { LikertQuestion } from "./LikertQuestion";
import { RankingQuestion } from "./RankingQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: any) => void;
}

export const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  if (!question) return null;

  const options = question.options as string[] | undefined;

  const QuestionComponent = () => {
    switch (question.type) {
      case "likert":
        return <LikertQuestion question={question} onAnswer={onAnswer} />;
      case "ranking":
        return options ? <RankingQuestion question={{ ...question, options }} onAnswer={onAnswer} /> : null;
      case "multiple_choice":
        return options ? <MultipleChoiceQuestion question={{ ...question, options }} onAnswer={onAnswer} /> : null;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-morphism border-0 animate-fade-in">
      <CardContent className="p-6">
        <QuestionComponent />
      </CardContent>
    </Card>
  );
};