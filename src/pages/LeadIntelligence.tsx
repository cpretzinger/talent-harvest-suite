import { MarketComparisonTool } from "@/components/market/MarketAnalysis";
import { Shield, Database, Target, Eye, Network } from "lucide-react";

const LeadIntelligence = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-[#D6BCFA]">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        {/* Header Section */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-[#9b87f5]" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
              Lead Intelligence Center
            </h1>
          </div>
          <p className="text-lg font-medium text-[#8E9196] max-w-3xl">
            Advanced analytics and pattern recognition for strategic lead analysis and conversion optimization.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Database, label: "Active Leads", value: "1,234" },
            { icon: Target, label: "Conversion Rate", value: "24.8%" },
            { icon: Eye, label: "Lead Score Avg", value: "7.6" },
            { icon: Network, label: "Pattern Matches", value: "89%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#222632] p-6 rounded-lg border border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <stat.icon className="h-8 w-8 text-[#9b87f5]" />
                <div>
                  <p className="text-sm text-[#8E9196]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#D6BCFA]">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-[#222632] rounded-lg border border-[#9b87f5]/20 p-6 shadow-lg">
          <MarketComparisonTool />
        </div>
      </div>
    </div>
  );
};

export default LeadIntelligence;