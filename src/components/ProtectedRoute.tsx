import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  // Temporarily disabled auth checks for development
  return <>{children}</>;
};