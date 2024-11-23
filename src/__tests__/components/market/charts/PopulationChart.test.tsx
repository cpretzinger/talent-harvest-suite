import { render, screen } from '@testing-library/react';
import { PopulationChart } from '@/components/market/charts/PopulationChart';
import { vi } from 'vitest';

// Mock recharts components
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>
}));

describe('PopulationChart', () => {
  const mockData = [
    {
      market: 'New York',
      population: 8000000,
      growth: 0.02
    }
  ];

  it('renders chart components', () => {
    render(<PopulationChart data={mockData} />);
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('XAxis')).toBeInTheDocument();
    expect(screen.getByText('YAxis')).toBeInTheDocument();
  });
});