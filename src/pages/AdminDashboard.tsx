import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminUserManagement } from "@/components/admin/AdminUserManagement";
import { AdminAuditLogs } from "@/components/admin/AdminAuditLogs";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <AdminOverview />
              </TabsContent>
              
              <TabsContent value="users">
                <AdminUserManagement />
              </TabsContent>

              <TabsContent value="audit">
                <AdminAuditLogs />
              </TabsContent>

              <TabsContent value="settings">
                <AdminSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}