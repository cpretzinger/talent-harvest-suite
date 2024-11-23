import Navigation from "../components/Navigation";
import RotatingSubheadline from "@/components/RotatingSubheadline";
import { CostAnalysisSection } from "@/components/sections/CostAnalysisSection";
import { HealthImpactSection } from "@/components/sections/HealthImpactSection";
import { AgencyTimelineChart } from "@/components/sections/AgencyTimelineChart";
import { BrickWall } from "@/components/sections/BrickWall";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
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

      {/* Problem Statement Section */}
      <section className="py-20 bg-primary text-cream">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Sales Killers Are 1 In A 1000
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Graphic */}
            <div className="glass-morphism p-8 rounded-xl overflow-hidden">
              <div className="relative h-[400px] w-full animate-fade-in">
                <img 
                  src="/photo-1649972904349-6e44c42644a7" 
                  alt="Depiction of financial stress and its emotional toll"
                  className="object-cover w-full h-full rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-cream text-lg italic">
                  "The weight of failed hires impacts more than just your business - it affects your entire life."
                </p>
              </div>
            </div>

            {/* Core Problems List */}
            <div className="glass-morphism p-12 rounded-xl">
              <ul className="space-y-6 text-xl">
                <li className="flex items-start space-x-4">
                  <span className="text-secondary">1.</span>
                  <span>Long ramp-up period before producers become profitable (typically 12-18 months)</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-secondary">2.</span>
                  <span>High upfront costs of licensing, training, and guarantees for new producers</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-secondary">3.</span>
                  <span>Risk of investing in candidates who may not succeed in the role</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-secondary">4.</span>
                  <span>Complexity of structuring competitive compensation packages that balance base salary and commissions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Consequences Section */}
          <div className="glass-morphism p-12 rounded-xl">
            <h3 className="text-3xl font-bold mb-8 text-secondary">Leading to Financial Devastation</h3>
            <p className="text-xl mb-8 italic">Avoidance compounds the issue, causing:</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Personal debt accumulation to fund new hire investments</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Delayed personal income and family financial plans</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Stress from supporting non-productive payroll</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Reduced ability to invest in agency growth</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Impact on children's college funds or family investments</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Deteriorating confidence in business decisions</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-secondary">•</span>
                <span>Strain on personal credit and financial security</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cost Analysis Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <CostAnalysisSection />
          <HealthImpactSection />
          
          {/* Timeline Chart Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-primary">Agency Timeline</h3>
              <AgencyTimelineChart />
              <p className="text-lg text-primary/80 italic mt-6">
                We had to switch paths or be doomed!
              </p>
            </div>

            {/* Why We Made It A Must Section */}
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-primary">Why We Made It A Must:</h3>
              <BrickWall />
              <p className="text-xl text-secondary font-bold text-center mt-6">
                The Writing Was On the Wall!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-20 bg-primary text-cream">
        <div className="container mx-auto px-6">
          <div className="glass-morphism p-12 rounded-xl hover-lift">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Our Problem: Our Agency Owned Us And We Hated That.
            </h3>
            <ul className="space-y-6 text-lg opacity-90">
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">The Reality:</span>
                <span>We HAD to do something different even though it felt impossible.</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="font-semibold min-w-fit">Our hair turned gray from these, nod if they sound familiar:</span>
              </li>
              <li className="pl-8">• Maintaining consistent production levels across varying experience levels</li>
              <li className="pl-8">• High turnover rates in the first two years of employment</li>
              <li className="pl-8">• Balancing producer autonomy with agency standards and procedures</li>
              <li className="pl-8">• Keeping producers motivated and engaged during the extended sales cycle</li>
              <li className="pl-8">• Managing performance expectations while building a book of business</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;