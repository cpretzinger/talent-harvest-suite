import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MarketComparisonTool } from '@/components/market/MarketAnalysis';
import { useQuery } from '@tanstack/react-query';

// Mock the react-query hook
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}));

// Mock the recharts components
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>
}));

describe('MarketComparisonTool', () => {
  beforeEach(() => {
    // Setup default mock for useQuery
    (useQuery as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });
  });

  it('renders without crashing', () => {
    render(<MarketComparisonTool />);
    expect(screen.getByText(/Market Analysis/i)).toBeInTheDocument();
  });

  it('allows market search', async () => {
    render(<MarketComparisonTool />);
    const searchInput = screen.getByPlaceholderText(/Search markets/i);
    fireEvent.change(searchInput, { target: { value: 'New York' } });
    
    await waitFor(() => {
      expect(screen.getByText(/New York/i)).toBeInTheDocument();
    });
  });

  it('displays selected markets', () => {
    const mockMarkets = [
      { id: '1', name: 'New York', state: 'NY' },
      { id: '2', name: 'Los Angeles', state: 'CA' }
    ];

    (useQuery as any).mockReturnValue({
      data: mockMarkets,
      isLoading: false,
      error: null
    });

    render(<MarketComparisonTool />);
    mockMarkets.forEach(market => {
      expect(screen.getByText(market.name)).toBeInTheDocument();
    });
  });
});