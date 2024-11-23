import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationControlsProps {
  canGoBack: boolean;
  onBack: () => void;
}

export const NavigationControls = ({ canGoBack, onBack }: NavigationControlsProps) => {
  return (
    <div className="mt-6 flex justify-between animate-fade-in">
      {canGoBack ? (
        <Button 
          variant="outline" 
          onClick={onBack}
          className="glass-morphism border-0 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Question
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};