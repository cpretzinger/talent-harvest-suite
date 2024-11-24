import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Market } from '@/types/market';
import { MarketSelector } from './MarketSelector';
import { ComparisonView } from './ComparisonView';
import { useMarketData } from '@/hooks/useMarketData';

export const MarketComparisonTool = () => {
  const [selectedMarkets, setSelectedMarkets] = useState<Market[]>([]);
  const [comparisonType, setComparisonType] = useState<'overview' | 'detailed' | 'opportunity'>('overview');
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  const { data: metrics } = useMarketData(selectedMarkets.map(m => m.id));

  const handleMarketSelect = (market: Market) => {
    setSelectedMarkets(prev => [...prev, market]);
  };

  const handleMarketRemove = (market: Market) => {
    setSelectedMarkets(prev => prev.filter(m => m.id !== market.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <MarketSelector
                  selectedMarkets={selectedMarkets}
                  onMarketSelect={handleMarketSelect}
                  onMarketRemove={handleMarketRemove}
                />
              </div>
              <div className="col-span-9">
                {metrics && (
                  <ComparisonView
                    type={comparisonType}
                    markets={selectedMarkets}
                    metrics={metrics}
                    dateRange={dateRange}
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};