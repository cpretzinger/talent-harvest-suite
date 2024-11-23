import { MarketComparisonTool } from "@/components/market/MarketAnalysis";

const MarketAnalysis = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Market Analysis</h1>
        <MarketComparisonTool />
      </div>
    </div>
  );
};

export default MarketAnalysis;