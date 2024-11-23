import { Routes as RouterRoutes, Route } from "react-router-dom";
import AssessmentPage from "@/pages/Assessment";
import ResourcesPage from "@/pages/Resources";
import Index from "@/pages/Index";
import Leads from "@/pages/Leads";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";

export const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/assessment/:id" element={<AssessmentPage />} />
      <Route path="/assessment-results/:id" element={<AssessmentResults />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/category/:categorySlug" element={<ResourcesPage />} />
    </RouterRoutes>
  );
};