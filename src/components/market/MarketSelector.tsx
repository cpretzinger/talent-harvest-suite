import React, { useState } from 'react';
import { Trash as TrashIcon } from 'lucide-react';
import { Market, MarketSelectorProps } from '@/types/market';
import { supabase } from '@/integrations/supabase/client';
import { Input } from "@/components/ui/input";

export const MarketSelector: React.FC<MarketSelectorProps> = ({ 
  selectedMarkets, 
  onMarketSelect, 
  onMarketRemove 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Market[]>([]);

  const handleSearchMarkets = async (term: string) => {
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    const { data, error } = await supabase
      .from('market_data')
      .select('id, market_name')
      .ilike('market_name', `%${term}%`)
      .limit(10);

    if (error) {
      console.error('Error searching markets:', error);
      return;
    }

    setSuggestions(data.map(d => ({
      id: d.id,
      name: d.market_name,
      state: 'N/A' // Add proper state handling if needed
    })));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search markets..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearchMarkets(e.target.value);
          }}
        />

        {suggestions.length > 0 && (
          <div className="max-h-48 overflow-y-auto">
            {suggestions.map(market => (
              <button
                key={market.id}
                onClick={() => onMarketSelect(market)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                {market.name}
                <span className="text-sm text-gray-500 ml-2">
                  {market.state}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {selectedMarkets.map(market => (
            <div
              key={market.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{market.name}</span>
              <button
                onClick={() => onMarketRemove(market)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};