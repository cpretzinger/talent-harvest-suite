import { api } from '@/utils/api-routes';
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('startAssessment makes correct API call', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ id: '123' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    await api.startAssessment('test-id');

    expect(global.fetch).toHaveBeenCalledWith('/api/assessment/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId: 'test-id' })
    });
  });

  it('saveProgress makes correct API call', async () => {
    const mockProgress = { currentQuestion: 1, answers: { '1': 'answer' } };
    const mockResponse = { ok: true, json: () => Promise.resolve({ success: true }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    await api.saveProgress('test-id', mockProgress);

    expect(global.fetch).toHaveBeenCalledWith('/api/assessment/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId: 'test-id', progress: mockProgress })
    });
  });

  it('submitAssessment makes correct API call', async () => {
    const mockAnswers = { '1': 'answer' };
    const mockResponse = { ok: true, json: () => Promise.resolve({ success: true }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    await api.submitAssessment('test-id', mockAnswers);

    expect(global.fetch).toHaveBeenCalledWith('/api/assessment/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId: 'test-id', answers: mockAnswers })
    });
  });
});