import Navigation from "../components/Navigation";
import RotatingSubheadline from "@/components/RotatingSubheadline";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-down">
              <span className="inline-block">Get </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-cream bg-clip-text text-transparent relative">
                <span className="absolute -left-[1px] top-0 bg-gradient-to-b from-[#26361C] to-[#AB760F] bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px' }}>
                  Sales Killers Fast
                </span>
                Sales Killers Fast
              </span>
            </h1>
            <RotatingSubheadline />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;