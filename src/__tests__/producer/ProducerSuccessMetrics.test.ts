import { describe, it, expect, beforeEach } from 'vitest';
import { ProducerSuccessMetrics } from '@/components/producer/ProducerSuccessMetrics';
import { TimeFrame } from '@/types/producer/carrier';

describe('ProducerSuccessMetrics', () => {
  let metrics: ProducerSuccessMetrics;

  beforeEach(() => {
    metrics = new ProducerSuccessMetrics();
  });

  describe('trackProducerMetrics', () => {
    it('should track comprehensive metrics for a producer', async () => {
      const producerId = 'test-producer';
      const timeframe: TimeFrame = {
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31')
      };

      const result = await metrics.trackProducerMetrics(producerId, timeframe);

      expect(result).toHaveProperty('productionMetrics');
      expect(result).toHaveProperty('clientMetrics');
      expect(result).toHaveProperty('developmentMetrics');
      expect(result).toHaveProperty('trends');
      expect(result).toHaveProperty('benchmarks');
    });
  });
});