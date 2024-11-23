import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Routes } from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Temporarily commented out for development
        <AuthProvider> */}
          <Routes />
          <Toaster />
        {/* </AuthProvider> */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;