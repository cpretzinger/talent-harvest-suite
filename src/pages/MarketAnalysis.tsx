import { MarketComparisonTool } from "@/components/market/MarketAnalysis";

const MarketAnalysis = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-primary">Market Analysis</h1>
          <p className="text-muted-foreground text-lg font-medium">
            Compare market metrics, analyze growth potential, and identify expansion opportunities across different regions to make strategic, data-driven decisions for your insurance business.
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6">
          <MarketComparisonTool />
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;