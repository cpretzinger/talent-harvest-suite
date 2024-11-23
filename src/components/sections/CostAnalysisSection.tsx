import React from "react";

export const CostAnalysisSection = () => {
  return (
    <div className="glass-morphism p-12 rounded-xl hover-lift">
      <h3 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        Cost Analysis: Failed Producer Investment
      </h3>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center border-b border-secondary/20 pb-2">
            <span className="text-lg">Training & Development Costs</span>
            <span className="font-mono text-lg text-secondary">$15,000</span>
          </div>
          <div className="flex justify-between items-center border-b border-secondary/20 pb-2">
            <span className="text-lg">Lost Revenue Opportunities</span>
            <span className="font-mono text-lg text-secondary">$30,000</span>
          </div>
          <div className="flex justify-between items-center border-b border-secondary/20 pb-2">
            <span className="text-lg">Management Time & Resources</span>
            <span className="font-mono text-lg text-secondary">$20,000</span>
          </div>
          <div className="flex justify-between items-center border-b border-secondary/20 pb-2">
            <span className="text-lg">Recruitment & Onboarding</span>
            <span className="font-mono text-lg text-secondary">$18,000</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t-2 border-secondary">
            <span className="text-xl font-bold">Total Investment Loss</span>
            <span className="font-mono text-xl font-bold text-secondary">$83,000</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-secondary/20">
          <p className="text-lg text-primary/80 italic">
            "Your agency's growth stalls while expenses soar - every failed hire is a direct hit to your bottom line."
          </p>
        </div>
      </div>
    </div>
  );
};