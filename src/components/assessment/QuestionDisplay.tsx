import { Question } from "@/types/assessment";
import { LikertQuestion } from "./LikertQuestion";
import { RankingQuestion } from "./RankingQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: any) => void;
}

export const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  if (!question) return null;

  switch (question.type) {
    case "likert":
      return <LikertQuestion question={question} onAnswer={onAnswer} />;
    case "ranking":
      return <RankingQuestion question={question} onAnswer={onAnswer} />;
    case "multiple_choice":
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
    default:
      return null;
  }
};