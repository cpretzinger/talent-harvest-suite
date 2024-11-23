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

// Mock Supabase client with complete PostgrestQueryBuilder properties
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null } as PostgrestSingleResponse<any>),
      order: vi.fn().mockReturnThis(),
      url: 'mock-url',
      headers: {},
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      match: vi.fn().mockReturnThis(),
      filter: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockReturnThis(),
      csv: vi.fn().mockReturnThis(),
      then: vi.fn().mockReturnThis(),
      throwOnError: vi.fn().mockReturnThis()
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
        insert: vi.fn().mockReturnThis(),
        upsert: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        match: vi.fn().mockReturnThis(),
        filter: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockReturnThis(),
        csv: vi.fn().mockReturnThis(),
        then: vi.fn().mockReturnThis(),
        throwOnError: vi.fn().mockReturnThis()
      } as PostgrestSingleResponse<any>)
    };

    vi.mocked(supabase.from).mockImplementationOnce(() => mockSupabaseResponse as any);

    render(<AssessmentManager {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('loads questions successfully', async () => {
    const mockQuestions = [
      {
        id: '1',
        text: 'Test Question 1',
        category: 'disc',
        type: 'multiple_choice',
        options: ['Option 1', 'Option 2']
      }
    ];

    const mockSupabaseResponse = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: { questions: mockQuestions },
        error: null
      } as PostgrestSingleResponse<any>)
    };

    vi.mocked(supabase.from).mockImplementationOnce(() => mockSupabaseResponse as any);

    render(<AssessmentManager {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByText('Test Question 1')).toBeInTheDocument();
    });
  });
});