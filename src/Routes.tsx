import { Routes as RouterRoutes, Route } from "react-router-dom";
import AssessmentPage from "@/pages/Assessment";
import ResourcesPage from "@/pages/Resources";

export const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/assessment/:id" element={<AssessmentPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/category/:categorySlug" element={<ResourcesPage />} />
    </RouterRoutes>
  );
};