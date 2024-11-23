import { describe, it, expect } from 'vitest';
import { ProducerFeatureValidator } from '../components/FeatureValidator';

describe('ProducerFeatureValidator', () => {
  const validator = new ProducerFeatureValidator();

  const validFeatures = {
    licensing: {
      type: 'Life',
      status: 'Active',
      expirationDate: new Date()
    },
    experience: {
      sales_experience: 5,
      insurance_experience: 3
    },
    production: {
      policies_sold: 100,
      premium_volume: 1000000
    },
    compliance: {
      violations: 0,
      lastReviewDate: new Date(),
      status: 'Active'
    }
  };

  describe('validateProducerFeatures', () => {
    it('should validate valid features correctly', () => {
      const result = validator.validateProducerFeatures(validFeatures);
      expect(result.licensing).toBe(true);
      expect(result.experience).toBe(true);
      expect(result.production).toBe(true);
      expect(result.compliance).toBe(true);
    });

    it('should detect invalid licensing', () => {
      const invalidFeatures = {
        ...validFeatures,
        licensing: { type: 'Invalid', status: 'Active', expirationDate: new Date() }
      };
      const result = validator.validateProducerFeatures(invalidFeatures);
      expect(result.licensing).toBe(false);
    });
  });
});