import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AssessmentManager } from '@/components/assessment/AssessmentManager';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

// Mock the auth context
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null } as PostgrestSingleResponse<any>),
      order: vi.fn().mockReturnThis(),
      url: 'mock-url',
      headers: {},
      insert: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    }))
  }
}));

describe('AssessmentManager', () => {
  const mockOnComplete = vi.fn();
  const defaultProps = {
    assessmentId: '123',
    userId: '456',
    onComplete: mockOnComplete
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: { id: '456' },
      profile: { role: 'candidate' }
    });
  });

  it('renders loading state initially', () => {
    render(<AssessmentManager {...defaultProps} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when assessment fails to load', async () => {
    const mockSupabaseResponse = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: null, 
        error: new Error('Failed to load'),
        count: null,
        status: 404,
        statusText: 'Not Found',
        url: 'mock-url',
        headers: {},
        insert: vi.fn(),
        upsert: vi.fn(),
        delete: vi.fn(),
        update: vi.fn()
      } as PostgrestSingleResponse<any>)
    };

    vi.mocked(supabase.from).mockImplementationOnce(() => mockSupabaseResponse as any);

    render(<AssessmentManager {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});