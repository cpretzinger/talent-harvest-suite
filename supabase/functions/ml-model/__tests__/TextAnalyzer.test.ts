import { describe, it, expect } from 'vitest';
import { InsuranceProducerTextAnalyzer } from '../components/TextAnalyzer';

describe('InsuranceProducerTextAnalyzer', () => {
  const analyzer = new InsuranceProducerTextAnalyzer();
  
  const sampleResume = `
    Experienced insurance professional with 10 years in life insurance sales.
    Achieved $2M in first-year premium and 95% client retention rate.
    Licensed in Life, Health, and Property insurance.
    Expert in cold calling and lead generation with strong underwriting knowledge.
  `;

  describe('analyzeResume', () => {
    it('should analyze product knowledge correctly', async () => {
      const analysis = await analyzer.analyzeResume(sampleResume);
      expect(analysis.productKnowledge.score).toBeGreaterThan(0);
      expect(analysis.productKnowledge.identifiedProducts).toContain('life insurance');
      expect(analysis.productKnowledge.depth).toBeDefined();
    });

    it('should evaluate sales capabilities', async () => {
      const analysis = await analyzer.analyzeResume(sampleResume);
      expect(analysis.salesCapabilities.prospectingAbility).toBeDefined();
      expect(analysis.salesCapabilities.closingSkills).toBeGreaterThan(0);
      expect(analysis.salesCapabilities.clientRelationships).toBeGreaterThan(0);
    });

    it('should extract achievement metrics', async () => {
      const analysis = await analyzer.analyzeResume(sampleResume);
      expect(analysis.achievementMetrics.salesVolume).toBeGreaterThan(0);
      expect(analysis.achievementMetrics.retentionRate).toBeGreaterThan(0);
    });
  });
});