import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationControlsProps {
  canGoBack: boolean;
  onBack: () => void;
}

export const NavigationControls = ({ canGoBack, onBack }: NavigationControlsProps) => {
  return (
    <div className="mt-6 flex justify-between">
      {canGoBack ? (
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Question
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};