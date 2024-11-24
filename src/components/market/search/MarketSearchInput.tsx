import React from 'react';
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from 'lucide-react';

interface MarketSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarketSearchInput: React.FC<MarketSearchProps> = ({ value, onChange }) => (
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