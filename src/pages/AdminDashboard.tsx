import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboardDev } from "@/components/admin/AdminDashboardDev";
import { AdminDashboardProd } from "@/components/admin/AdminDashboardProd";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isLoading && (!user || profile?.role !== 'administrator')) {
      navigate("/unauthorized");
    }
  }, [user, profile, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render the appropriate dashboard with Outlet for nested routes
  return (
    <>
      {isDevelopment ? <AdminDashboardDev /> : <AdminDashboardProd />}
      <Outlet />
    </>
  );
}