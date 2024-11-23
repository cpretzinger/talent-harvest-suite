export const api = {
  startAssessment: async (assessmentId: string) => {
    const response = await fetch('/api/assessment/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId })
    });
    return response.json();
  },

  saveProgress: async (assessmentId: string, progress: { currentQuestion: number; answers: Record<string, any> }) => {
    const response = await fetch('/api/assessment/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId, progress })
    });
    return response.json();
  },

  submitAssessment: async (assessmentId: string, answers: Record<string, any>) => {
    const response = await fetch('/api/assessment/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentId, answers })
    });
    return response.json();
  }
};