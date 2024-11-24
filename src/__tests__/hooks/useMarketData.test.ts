import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useMarketData } from '@/hooks/useMarketData';
import { vi } from 'vitest';

// Mock the tanstack-query hook
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}));

describe('useMarketData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return market data when successful', () => {
    const mockData = {
      markets: [
        { id: '1', name: 'Market 1' },
        { id: '2', name: 'Market 2' }
      ]
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useMarketData());

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    const { result } = renderHook(() => useMarketData());

    expect(result.current.isLoading).toBe(true);
  });
});