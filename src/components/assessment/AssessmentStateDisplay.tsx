import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Loading your assessment..." }: LoadingSpinnerProps) => (
  <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <p className="text-secondary animate-pulse">{message}</p>
  </div>
);

export const ErrorMessage = () => (
  <Alert variant="destructive" className="max-w-md mx-auto mt-8 glass-morphism border-red-200/20">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      There was an error loading the assessment. Please try again later.
    </AlertDescription>
  </Alert>
);