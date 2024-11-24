import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Market } from '@/types/market';

interface MarketListProps {
  markets: Market[];
  selected: Market[];
  onSelect: (market: Market) => void;
  onDeselect: (market: Market) => void;
}

export const MarketList: React.FC<MarketListProps> = ({
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