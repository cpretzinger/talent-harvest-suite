import { describe, it, expect, vi } from 'vitest';
import { ProducerFeatureStore } from '../components/FeatureStore';
import { supabase } from '../client';

vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn().mockResolvedValue({ data: [], error: null })
    }))
  }
}));

describe('ProducerFeatureStore', () => {
  const store = new ProducerFeatureStore();

  const mockFeatures = {
    background: {
      education: "Bachelor's",
      experience: 5,
      licenses: ['Life']
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
    }
  };

  describe('storeProducerFeatures', () => {
    it('should store features successfully', async () => {
      await expect(store.storeProducerFeatures('test-id', mockFeatures))
        .resolves.not.toThrow();
    });
  });
});