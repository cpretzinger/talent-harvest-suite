import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import AssessmentPage from "@/pages/Assessment";
import ResourcesPage from "@/pages/Resources";

const queryClient = new QueryClient();

export const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/assessment/:id" element={<AssessmentPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/category/:categorySlug" element={<ResourcesPage />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};
