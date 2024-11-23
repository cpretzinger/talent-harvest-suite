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
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="glass-morphism p-12 rounded-xl hover-lift">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Every Failed Producer Costs You $83,000... And That's Just The Money You Can Count
            </h3>
            <ul className="space-y-6 text-lg opacity-90">
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Problem:</span>
                <span>Failed producers drain resources, waste training investments, and leave revenue gaps.</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Reality:</span>
                <span>Beyond salary and benefits, you're burning money on:</span>
              </li>
              <li className="pl-8">• Training resources ($15,000+)</li>
              <li className="pl-8">• Lost opportunities ($30,000+)</li>
              <li className="pl-8">• Management time ($20,000+)</li>
              <li className="pl-8">• Recruitment costs ($18,000+)</li>
              <li className="flex items-start space-x-4 pt-6">
                <span className="font-semibold min-w-fit">The Cost:</span>
                <span className="text-secondary font-bold">Your agency's growth stalls while expenses soar.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 bg-primary text-cream">
        <div className="container mx-auto px-6">
          <div className="glass-morphism p-12 rounded-xl hover-lift">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Your Agency Is Growing, But Your Life Is Shrinking: The Hidden Cost of Producer Problems
            </h3>
            <ul className="space-y-6 text-lg opacity-90">
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Problem:</span>
                <span>You're trapped in a cycle of micromanagement and crisis control.</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Reality:</span>
                <span>Your days are consumed by:</span>
              </li>
              <li className="pl-8">• Emergency producer interventions</li>
              <li className="pl-8">• Constant performance monitoring</li>
              <li className="pl-8">• Endless training sessions</li>
              <li className="pl-8">• Damage control with clients</li>
              <li className="flex items-start space-x-4 pt-6">
                <span className="font-semibold min-w-fit">The Cost:</span>
                <span className="text-secondary font-bold">Your family sees your empty chair more than you.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="glass-morphism p-12 rounded-xl hover-lift">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Building Your Prison Instead of Your Empire? Why Most Agency Owners Can't Break Free
            </h3>
            <ul className="space-y-6 text-lg opacity-90">
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Problem:</span>
                <span>Your agency owns you instead of you owning your agency.</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Reality:</span>
                <span>You're stuck in an endless loop of:</span>
              </li>
              <li className="pl-8">• Rushed hiring decisions</li>
              <li className="pl-8">• Repetitive onboarding</li>
              <li className="pl-8">• Performance management</li>
              <li className="pl-8">• Starting over... again</li>
              <li className="flex items-start space-x-4 pt-6">
                <span className="font-semibold min-w-fit">The Cost:</span>
                <span className="text-secondary font-bold">Your dream of scaling becomes your daily nightmare.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;