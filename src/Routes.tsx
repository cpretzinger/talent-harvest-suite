import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Leads from "./pages/Leads";
import Assessment from "./pages/Assessment";
import AssessmentComplete from "./pages/AssessmentComplete";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/leads" 
        element={
          <ProtectedRoute allowedRoles={["administrator", "recruiter"]}>
            <Leads />
          </ProtectedRoute>
        } 
      />
      <Route path="/assessment/:id" element={<Assessment />} />
      <Route path="/assessment-complete" element={<AssessmentComplete />} />
    </RouterRoutes>
  );
}