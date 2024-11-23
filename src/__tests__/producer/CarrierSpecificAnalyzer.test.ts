import { describe, it, expect, beforeEach } from 'vitest';
import { CarrierSpecificAnalyzer } from '@/components/producer/CarrierSpecificAnalyzer';

describe('CarrierSpecificAnalyzer', () => {
  let analyzer: CarrierSpecificAnalyzer;

  beforeEach(() => {
    analyzer = new CarrierSpecificAnalyzer();
  });

  describe('analyzeCarrierFit', () => {
    it('should analyze carrier fit for a producer', async () => {
      const producerId = 'test-producer';
      const carrierId = 'carrier_a';

      const analysis = await analyzer.analyzeCarrierFit(producerId, carrierId);

      expect(analysis).toHaveProperty('productAlignment');
      expect(analysis).toHaveProperty('requirementsMet');
      expect(analysis).toHaveProperty('projectedEarnings');
      expect(analysis).toHaveProperty('developmentNeeds');
    });

    it('should handle invalid carrier IDs', async () => {
      const producerId = 'test-producer';
      const carrierId = 'invalid_carrier';

      await expect(analyzer.analyzeCarrierFit(producerId, carrierId))
        .rejects.toThrow('Invalid carrier ID');
    });
  });
});