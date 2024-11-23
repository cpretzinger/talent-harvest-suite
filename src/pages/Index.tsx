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
              <span className="bg-gradient-to-r from-primary via-secondary to-cream bg-clip-text text-transparent">
                Your New Sales Killer <span className="text-secondary italic">Fast</span>
              </span>
            </h1>
            <RotatingSubheadline />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-cream">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Missing Another Family Dinner? The Real Price of Producer Problems
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Section 1 */}
            <div className="glass-morphism p-8 rounded-xl hover-lift">
              <h3 className="text-2xl font-bold mb-4">
                Every Failed Producer Costs You $83,000... And That's Just The Money You Can Count
              </h3>
              <p className="text-lg opacity-90">
                Beyond the base salary and benefits, factor in training costs, lost opportunities, 
                and the drain on your management team. The real cost? Your agency's momentum 
                and your peace of mind.
              </p>
            </div>

            {/* Section 2 */}
            <div className="glass-morphism p-8 rounded-xl hover-lift">
              <h3 className="text-2xl font-bold mb-4">
                Your Agency Is Growing, But Your Life Is Shrinking: The Hidden Cost of Producer Problems
              </h3>
              <p className="text-lg opacity-90">
                While your revenue numbers climb, your personal time evaporates. 
                Constant producer hand-holding, emergency interventions, and 
                damage control are stealing the life you worked so hard to build.
              </p>
            </div>

            {/* Section 3 */}
            <div className="glass-morphism p-8 rounded-xl hover-lift">
              <h3 className="text-2xl font-bold mb-4">
                Building Your Prison Instead of Your Empire? Why Most Agency Owners Can't Break Free
              </h3>
              <p className="text-lg opacity-90">
                Your agency should be your legacy, not your life sentence. Yet here you are, 
                trapped in an endless cycle of hiring, training, and replacing producers 
                instead of scaling your vision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;