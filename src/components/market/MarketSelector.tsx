import React, { useState, useMemo } from 'react';
import { Market } from '@/types/market';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X as XIcon } from 'lucide-react';
import { MarketSearchInput } from './search/MarketSearchInput';
import { MarketFilterControls } from './filters/MarketFilterControls';
import { MarketList } from './list/MarketList';

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

export const MarketSelector: React.FC<{
  selectedMarkets: Market[];
  onMarketSelect: (market: Market) => void;
  onMarketRemove: (market: Market) => void;
}> = ({ selectedMarkets, onMarketSelect, onMarketRemove }) => {
  const [filters, setFilters] = useState<MarketFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = useMemo(() => {
    return []; // You'll need to implement this with your actual markets data
  }, [filters, searchTerm]);

  return (
    <div className="space-y-4">
      <MarketSearchInput
        value={searchTerm}
        onChange={setSearchTerm}
      />
      
      <MarketFilterControls
        filters={filters}
        onChange={setFilters}
      />
      
      <MarketList
        markets={filteredMarkets}
        selected={selectedMarkets}
        onSelect={onMarketSelect}
        onDeselect={onMarketRemove}
      />
      
      <SelectedMarketsOverview
        markets={selectedMarkets}
        onRemove={onMarketRemove}
      />
    </div>
  );
};
