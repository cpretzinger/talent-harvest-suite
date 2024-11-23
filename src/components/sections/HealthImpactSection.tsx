import React from "react";

export const HealthImpactSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {/* Doctor Consultation Visualization */}
      <div className="glass-morphism p-8 rounded-xl overflow-hidden flex items-center">
        <div className="relative h-[400px] w-full animate-fade-in">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
            alt="Turned on gray laptop computer"
            className="object-cover w-full h-full rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-cream text-2xl font-bold">
            I was literally killing myself!
          </p>
        </div>
      </div>

      {/* Medical Report */}
      <div className="glass-morphism p-8 rounded-xl">
        <div className="border-b-2 border-secondary/20 pb-4 mb-6">
          <h4 className="text-xl font-bold text-primary mb-2">Medical Assessment Report</h4>
          <p className="text-sm text-primary/60">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="space-y-4">
          <div className="bg-cream/50 p-4 rounded-lg">
            <h5 className="font-bold text-primary mb-4">Observed Symptoms:</h5>
            <ul className="space-y-3 text-primary/80">
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Chronic stress from understaffed agency management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Excessive working hours covering sales responsibilities</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Frequent absence from family events and personal commitments</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Notable physical health deterioration from prolonged stress</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Compromised retirement outlook due to agency valuation decline</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Inability to take necessary breaks or vacations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-secondary">•</span>
                <span>Significant strain on personal relationships and marriage</span>
              </li>
            </ul>
          </div>
          <div className="text-primary/80 italic mt-4 pt-4 border-t border-secondary/20">
            <p>Recommendation: Immediate intervention required to prevent further deterioration of personal and professional well-being.</p>
          </div>
        </div>
      </div>
    </div>
  );
};