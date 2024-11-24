import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedVisualizationTypes } from '@/components/market/charts/EnhancedVisualizationTypes';
import { supabase } from "@/integrations/supabase/client";

interface InteractiveVisualizationProps {
  chartType: keyof typeof EnhancedVisualizationTypes;
  data: any[];
  config?: {
    enableZoom?: boolean;
    enablePeerComparison?: boolean;
    enableExport?: boolean;
  };
}

export const InteractiveVisualization: React.FC<InteractiveVisualizationProps> = ({
  chartType,
  data,
  config = {}
}) => {
  const [isRealtime, setIsRealtime] = useState(false);
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (!isRealtime) return;

    // Subscribe to real-time updates
    const channel = supabase
      .channel('metrics_updates')
      .on('broadcast', { event: 'metrics_update' }, (payload) => {
        setLocalData(currentData => [...currentData, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isRealtime]);

  const VisualizationComponent = EnhancedVisualizationTypes[chartType];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant={isRealtime ? "default" : "outline"}
          onClick={() => setIsRealtime(!isRealtime)}
        >
          {isRealtime ? 'Disable Real-time' : 'Enable Real-time'}
        </Button>
        
        {config.enableExport && (
          <Button variant="outline" onClick={() => {
            // Export functionality to be implemented
            console.log('Export clicked');
          }}>
            Export
          </Button>
        )}
      </div>

      <div className={`
        transition-all duration-200
        ${config.enableZoom ? 'hover:scale-105' : ''}
      `}>
        <VisualizationComponent data={localData} />
      </div>
    </Card>
  );
};