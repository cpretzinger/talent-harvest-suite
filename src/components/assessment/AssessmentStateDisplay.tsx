import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

export const ErrorMessage = () => (
  <Alert variant="destructive" className="max-w-md mx-auto mt-8">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      There was an error loading the assessment. Please try again later.
    </AlertDescription>
  </Alert>
);