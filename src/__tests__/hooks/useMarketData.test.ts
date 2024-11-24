import { renderHook, waitFor } from '@testing-library/react';
import { useMarketData } from '@/hooks/useMarketData';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis()
  }
}));

describe('useMarketData', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('returns market data for given IDs', async () => {
    const mockData = [
      { id: '1', name: 'New York', population: 8000000 }
    ];

    // Type assertion to access mocked methods
    const mockedSupabase = vi.mocked(supabase);
    mockedSupabase.from.mockImplementation(() => ({
      select: () => ({
        in: () => Promise.resolve({ data: mockData, error: null })
      })
    } as any));

    const { result } = renderHook(() => useMarketData(['1']), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  it('handles empty market IDs array', async () => {
    const { result } = renderHook(() => useMarketData([]), { wrapper });
    expect(result.current.data).toBeUndefined();
  });
});