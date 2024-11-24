import React, { useEffect, useState } from 'react';
import { DailyMetrics } from '@/types/producer/metrics';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendationEngine } from '@/utils/recommendations/RecommendationEngine';

interface RecommendationsPanelProps {
  metrics: DailyMetrics;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ metrics }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      // In a real implementation, these would be fetched from your API
      const historicalData = [];
      const teamAverages = {
        conversionRate: 0.35,
        averageTalkTime: 45,
        quoteRate: 0.25
      };
      const targets = {
        conversionRate: 0.4,
        timeEfficiency: 0.75,
        quotesPerLead: 0.3
      };

      const engine = new RecommendationEngine({
        metrics,
        historicalData,
        teamAverages,
        targets
      });

      setRecommendations(engine.generateRecommendations());
    };

    loadRecommendations();
  }, [metrics]);

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{rec.title}</h4>
            <span className={`px-2 py-1 rounded text-sm ${
              rec.priority === 'high' ? 'bg-red-100 text-red-800' :
              rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {rec.priority}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{rec.description}</p>
          <div className="space-y-2">
            {rec.actions.map((action: string, actionIndex: number) => (
              <div key={actionIndex} className="flex items-center">
                <span className="mr-2">•</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};