import { useEffect } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
              Elite Producer
              <span className="text-secondary"> Hires</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-up delay-200">
              Transform your insurance sales team with top talent
            </p>
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