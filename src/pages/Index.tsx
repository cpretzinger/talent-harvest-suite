import Navigation from "../components/Navigation";
import RotatingSubheadline from "@/components/RotatingSubheadline";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg">
                Welcome, {profile?.first_name || "User"} ({profile?.role})
              </p>
              <Button onClick={signOut} variant="outline" className="mt-4">
                Sign Out
              </Button>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-down text-primary">
              Get Sales Killers
              <span className="text-secondary"> Fast</span>
            </h1>
            <RotatingSubheadline />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;