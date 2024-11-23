import { describe, it, expect } from 'vitest';
import { AssessmentScorer } from '@/utils/AssessmentScorer';

describe('AssessmentScorer', () => {
  const scorer = new AssessmentScorer();
  
  const mockAnswers = {
    '1': 4,
    '2': 3,
    '3': 5
  };

  const mockQuestions = [
    {
      id: '1',
      category: 'D',
      type: 'natural',
      weight: 1,
      assessment_id: '123',
      text: 'Question 1',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      category: 'I',
      type: 'adaptive',
      weight: 1,
      assessment_id: '123',
      text: 'Question 2',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      category: 'S',
      type: 'natural',
      weight: 1,
      assessment_id: '123',
      text: 'Question 3',
      created_at: new Date().toISOString()
    }
  ];

  it('calculates scores correctly', () => {
    const result = scorer.calculateScores(mockAnswers, mockQuestions);
    
    expect(result).toHaveProperty('scores');
    expect(result).toHaveProperty('dimensional_balance');
    expect(result).toHaveProperty('overall_profile');
  });

  it('generates insights for high scores', () => {
    const result = scorer.calculateScores(
      { '1': 5, '2': 5, '3': 5 },
      mockQuestions
    );
    
    result.scores.forEach(score => {
      expect(score.insights.length).toBeGreaterThan(0);
      expect(score.level).toBe('Excellent');
    });
  });
});