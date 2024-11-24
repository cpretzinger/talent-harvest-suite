import { Routes as RouterRoutes, Route } from "react-router-dom";
import AssessmentPage from "@/pages/Assessment";
import ResourcesPage from "@/pages/Resources";
import Index from "@/pages/Index";
import Leads from "@/pages/Leads";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import MarketAnalysis from "@/pages/MarketAnalysis";
import AdminDashboard from "@/pages/AdminDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminUserManagement } from "@/components/admin/AdminUserManagement";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminAuditLogs } from "@/components/admin/AdminAuditLogs";

const defaultProfile = {
  naturalStyle: { D: 0, I: 0, S: 0, C: 0 },
  adaptiveStyle: { D: 0, I: 0, S: 0, C: 0 },
  values: []
};

export const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/assessment/:id" element={<AssessmentPage />} />
      <Route 
        path="/assessment-results/:id" 
        element={<AssessmentResults results={{ overall_profile: defaultProfile }} />} 
      />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/category/:categorySlug" element={<ResourcesPage />} />
      <Route path="/market-analysis" element={<MarketAnalysis />} />
      
      {/* Admin routes with proper nesting */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={["administrator"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserManagement />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="audit" element={<AdminAuditLogs />} />
      </Route>
    </RouterRoutes>
  );
};