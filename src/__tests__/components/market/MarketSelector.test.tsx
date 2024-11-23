import { render, screen, fireEvent } from '@testing-library/react';
import { MarketSelector } from '@/components/market/MarketSelector';
import { vi } from 'vitest';

describe('MarketSelector', () => {
  const mockOnSelect = vi.fn();
  const mockOnRemove = vi.fn();
  const mockMarkets = [
    { id: '1', name: 'New York', state: 'NY' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input', () => {
    render(
      <MarketSelector
        selectedMarkets={mockMarkets}
        onMarketSelect={mockOnSelect}
        onMarketRemove={mockOnRemove}
      />
    );
    expect(screen.getByPlaceholderText(/Search markets/i)).toBeInTheDocument();
  });

  it('displays selected markets', () => {
    render(
      <MarketSelector
        selectedMarkets={mockMarkets}
        onMarketSelect={mockOnSelect}
        onMarketRemove={mockOnRemove}
      />
    );
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('calls onMarketRemove when remove button is clicked', () => {
    render(
      <MarketSelector
        selectedMarkets={mockMarkets}
        onMarketSelect={mockOnSelect}
        onMarketRemove={mockOnRemove}
      />
    );
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalledWith(mockMarkets[0]);
  });
});