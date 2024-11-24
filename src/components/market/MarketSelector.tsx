import React, { useState, useMemo } from 'react';
import { Market } from '@/types/market';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { X as XIcon, Search as SearchIcon } from 'lucide-react';

interface MarketFilters {
  size: [number, number];
  growth: [number, number];
  competition: [number, number];
  region: string[];
}

const defaultFilters: MarketFilters = {
  size: [0, 1000000],
  growth: [0, 100],
  competition: [0, 100],
  region: []
};

interface MarketSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MarketSearch: React.FC<MarketSearchProps> = ({ value, onChange }) => (
  <div className="relative">
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      type="text"
      placeholder="Search markets..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10"
    />
  </div>
);

interface MarketFiltersProps {
  filters: MarketFilters;
  onChange: (filters: MarketFilters) => void;
}

const MarketFilters: React.FC<MarketFiltersProps> = ({ filters, onChange }) => {
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

interface MarketListProps {
  markets: Market[];
  selected: Market[];
  onSelect: (market: Market) => void;
  onDeselect: (market: Market) => void;
}

const MarketList: React.FC<MarketListProps> = ({
  markets,
  selected,
  onSelect,
  onDeselect
}) => (
  <div className="space-y-2">
    {markets.map(market => (
      <Card
        key={market.id}
        className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => {
          selected.find(m => m.id === market.id)
            ? onDeselect(market)
            : onSelect(market);
        }}
      >
        <div>
          <h3 className="font-medium">{market.name}</h3>
          <p className="text-sm text-gray-500">{market.state}</p>
        </div>
        {selected.find(m => m.id === market.id) && (
          <Badge variant="secondary">Selected</Badge>
        )}
      </Card>
    ))}
  </div>
);

interface SelectedMarketsOverviewProps {
  markets: Market[];
  onRemove: (market: Market) => void;
}

const SelectedMarketsOverview: React.FC<SelectedMarketsOverviewProps> = ({
  markets,
  onRemove
}) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-3">Selected Markets</h3>
    <div className="space-y-2">
      {markets.map(market => (
        <div
          key={market.id}
          className="flex justify-between items-center p-2 bg-gray-50 rounded"
        >
          <span>{market.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(market)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  </Card>
);

export const MarketSelectionSystem: React.FC = () => {
  const [selectedMarkets, setSelectedMarkets] = useState<Market[]>([]);
  const [filters, setFilters] = useState<MarketFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const applyFilters = (market: Market, filters: MarketFilters) => {
    // Implement filter logic based on your Market type
    return true; // Placeholder
  };

  const matchesSearch = (market: Market, searchTerm: string) => {
    return market.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleMarketSelect = (market: Market) => {
    setSelectedMarkets(prev => [...prev, market]);
  };

  const handleMarketDeselect = (market: Market) => {
    setSelectedMarkets(prev => prev.filter(m => m.id !== market.id));
  };

  const handleMarketRemove = (market: Market) => {
    setSelectedMarkets(prev => prev.filter(m => m.id !== market.id));
  };

  const filteredMarkets = useMemo(() => {
    return []; // You'll need to implement this with your actual markets data
  }, [filters, searchTerm]);

  return (
    <div className="space-y-4">
      <MarketSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />
      
      <MarketFilters
        filters={filters}
        onChange={setFilters}
      />
      
      <MarketList
        markets={filteredMarkets}
        selected={selectedMarkets}
        onSelect={handleMarketSelect}
        onDeselect={handleMarketDeselect}
      />
      
      <SelectedMarketsOverview
        markets={selectedMarkets}
        onRemove={handleMarketRemove}
      />
    </div>
  );
};