import { describe, it, expect } from 'vitest';
import { ProducerFeatureImportanceTracker } from '../components/ImportanceTracker';

describe('ProducerFeatureImportanceTracker', () => {
  const tracker = new ProducerFeatureImportanceTracker();

  const mockFeatures = {
    background: {
      education: "Bachelor's in Business",
      experience: 5,
      licenses: ['Life', 'Health']
    },
    assessment: {
      salesAptitude: 85,
      productKnowledge: 90,
      personalityProfile: {}
    },
    performance: {
      productionMetrics: {},
      clientRetention: 0.95,
      complianceRecord: {}
    },
    licensing: {
      type: 'Life',
      status: 'Active',
      expirationDate: new Date()
    },
    compliance: {
      violations: 0,
      lastReviewDate: new Date(),
      status: 'Good Standing'
    }
  };

  const mockPerformance = {
    metrics: {
      policiesSold: 100,
      premiumVolume: 1000000,
      retentionRate: 0.92
    },
    timeline: {
      licensingCompletion: new Date(),
      firstSale: new Date(),
      consistentProduction: new Date()
    }
  };

  describe('trackProducerSuccess', () => {
    it('should identify key success factors', async () => {
      const analysis = await tracker.trackProducerSuccess(mockFeatures, mockPerformance);
      expect(analysis.highestImpactFeatures).toBeInstanceOf(Array);
      expect(analysis.timeToProductivity).toBeDefined();
      expect(analysis.retentionIndicators).toBeDefined();
    });
  });
});