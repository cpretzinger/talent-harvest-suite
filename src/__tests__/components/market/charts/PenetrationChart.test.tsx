import { render, screen } from '@testing-library/react';
import { PenetrationChart } from '@/components/market/charts/PenetrationChart';
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

describe('PenetrationChart', () => {
  const mockData = [
    {
      market: 'New York',
      penetration: 0.75,
      premium: 1200
    }
  ];

  it('renders chart components', () => {
    render(<PenetrationChart data={mockData} />);
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('XAxis')).toBeInTheDocument();
    expect(screen.getByText('YAxis')).toBeInTheDocument();
  });
});