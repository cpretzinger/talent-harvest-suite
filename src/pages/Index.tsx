import { useEffect } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RotatingSubheadline from "@/components/RotatingSubheadline";

const Index = () => {
  const { toast } = useToast();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-down text-primary">
              Get Sales Killers
              <span className="text-secondary"> Fast</span>
            </h1>
            <RotatingSubheadline />
            <Button 
              onClick={handleLogin}
              className="px-8 py-6 rounded-full text-lg hover-lift animate-fade-up delay-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;