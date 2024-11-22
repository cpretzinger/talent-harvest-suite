import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }

    if (
      !isLoading &&
      profile &&
      allowedRoles &&
      !allowedRoles.includes(profile.role)
    ) {
      navigate("/unauthorized");
    }
  }, [user, profile, isLoading, navigate, allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};