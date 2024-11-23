import { describe, it, expect, beforeEach } from 'vitest';
import { ComprehensiveProducerSystem } from '@/components/producer/ComprehensiveProducerSystem';

describe('ComprehensiveProducerSystem', () => {
  let system: ComprehensiveProducerSystem;

  beforeEach(() => {
    system = new ComprehensiveProducerSystem();
  });

  describe('evaluateProducer', () => {
    it('should provide comprehensive producer evaluation', async () => {
      const producerId = 'test-producer';

      const evaluation = await system.evaluateProducer(producerId);

      expect(evaluation).toHaveProperty('carrierFit');
      expect(evaluation).toHaveProperty('metrics');
      expect(evaluation).toHaveProperty('development');
      expect(evaluation).toHaveProperty('market');
      expect(evaluation).toHaveProperty('compliance');
      expect(evaluation.recommendations).toBeInstanceOf(Array);
    });

    it('should handle errors gracefully', async () => {
      const producerId = 'invalid-producer';

      await expect(system.evaluateProducer(producerId))
        .rejects.toThrow('Producer not found');
    });
  });
});