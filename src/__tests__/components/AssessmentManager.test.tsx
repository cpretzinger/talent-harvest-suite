import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AssessmentManager } from '@/components/assessment/AssessmentManager';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { PostgrestResponse } from '@supabase/supabase-js';

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
      single: vi.fn().mockResolvedValue({ data: null, error: null } as PostgrestResponse<any>)
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
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: new Error('Failed to load') } as PostgrestResponse<any>)
    }));

    render(<AssessmentManager {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});