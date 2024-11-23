import { describe, it, expect } from 'vitest';
import { InsuranceProducerMLSystem } from '../InsuranceProducerMLSystem';

describe('InsuranceProducerMLSystem', () => {
  const mlSystem = new InsuranceProducerMLSystem();

  const mockCandidate = {
    resume: `Experienced insurance professional with strong track record.
            Licensed in Life and Health insurance. Generated $1M in premiums.`,
    background: {
      education: "Bachelor's in Finance",
      experience: 5,
      licenses: ['Life', 'Health']
    },
    assessment: {
      salesAptitude: 85,
      productKnowledge: 90,
      personalityProfile: {}
    }
  };

  describe('evaluateCandidate', () => {
    it('should provide comprehensive evaluation', async () => {
      const evaluation = await mlSystem.evaluateCandidate(mockCandidate);
      
      expect(evaluation.candidateProfile).toBeDefined();
      expect(evaluation.candidateProfile.strengths).toBeInstanceOf(Array);
      expect(evaluation.candidateProfile.developmentAreas).toBeInstanceOf(Array);
      
      expect(evaluation.successPrediction).toBeDefined();
      expect(evaluation.successPrediction.score).toBeGreaterThanOrEqual(0);
      expect(evaluation.successPrediction.score).toBeLessThanOrEqual(100);
      
      expect(evaluation.developmentPlan).toBeDefined();
      expect(evaluation.developmentPlan.immediateActions).toBeInstanceOf(Array);
      
      expect(evaluation.riskAssessment).toBeDefined();
      expect(evaluation.riskAssessment.retentionRisk).toBeGreaterThanOrEqual(0);
      expect(evaluation.riskAssessment.retentionRisk).toBeLessThanOrEqual(1);
    });
  });
});