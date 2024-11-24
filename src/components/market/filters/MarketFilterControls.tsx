import React from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MarketFilters } from '@/types/market';

interface MarketFiltersProps {
  filters: MarketFilters;
  onChange: (filters: MarketFilters) => void;
}

export const MarketFilterControls: React.FC<MarketFiltersProps> = ({ filters, onChange }) => {
  const handleSizeChange = (value: number[]) => {
    onChange({ ...filters, size: [value[0], value[1]] });
  };

  const handleGrowthChange = (value: number[]) => {
    onChange({ ...filters, growth: [value[0], value[1]] });
  };

  const handleCompetitionChange = (value: number[]) => {
    onChange({ ...filters, competition: [value[0], value[1]] });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Market Size</Label>
        <Slider
          defaultValue={filters.size}
          max={1000000}
          step={1000}
          onValueChange={handleSizeChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Growth Rate (%)</Label>
        <Slider
          defaultValue={filters.growth}
          max={100}
          step={1}
          onValueChange={handleGrowthChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Competition Level (%)</Label>
        <Slider
          defaultValue={filters.competition}
          max={100}
          step={1}
          onValueChange={handleCompetitionChange}
        />
      </div>
    </Card>
  );
};