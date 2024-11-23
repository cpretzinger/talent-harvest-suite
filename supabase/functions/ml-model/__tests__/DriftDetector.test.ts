import { describe, it, expect } from 'vitest';
import { ProducerFeatureDriftDetector } from '../components/DriftDetector';

describe('ProducerFeatureDriftDetector', () => {
  const detector = new ProducerFeatureDriftDetector();

  describe('detectProducerDrift', () => {
    it('should analyze market changes', async () => {
      const analysis = await detector.detectProducerDrift();
      expect(analysis.marketDrift).toBeDefined();
      expect(analysis.marketDrift.premiumTrends).toBeInstanceOf(Array);
      expect(analysis.qualificationDrift).toBeDefined();
      expect(analysis.performanceDrift).toBeDefined();
      expect(analysis.recommendations).toBeInstanceOf(Array);
    });
  });
});