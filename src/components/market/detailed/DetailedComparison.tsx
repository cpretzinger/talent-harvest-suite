import React from 'react';
import { DetailedComparisonProps } from '@/types/market';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DemographicsComparison } from './DemographicsComparison';
import { InsuranceMetricsComparison } from './InsuranceMetricsComparison';
import { CompetitionAnalysis } from './CompetitionAnalysis';
import { GrowthTrendAnalysis } from './GrowthTrendAnalysis';

export const DetailedComparison: React.FC<DetailedComparisonProps> = ({
  markets,
  metrics,
  dateRange
}) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="demographics">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Metrics</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="growth">Growth Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics">
          <DemographicsComparison markets={markets} metrics={metrics} />
        </TabsContent>
        <TabsContent value="insurance">
          <InsuranceMetricsComparison markets={markets} metrics={metrics} />
        </TabsContent>
        <TabsContent value="competition">
          <CompetitionAnalysis markets={markets} metrics={metrics} />
        </TabsContent>
        <TabsContent value="growth">
          <GrowthTrendAnalysis 
            markets={markets} 
            metrics={metrics}
            dateRange={dateRange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};