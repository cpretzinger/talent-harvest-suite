import { MarketComparisonTool } from "@/components/market/MarketAnalysis";

const MarketAnalysis = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Market Analysis</h1>
      <MarketComparisonTool />
    </div>
  );
};

export default MarketAnalysis;