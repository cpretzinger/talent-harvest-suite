import { ProducerFeatures, ValidationResult } from '../types';

export class ProducerFeatureValidator {
  private readonly validationRules = {
    experience: {
      minYears: 0,
      maxYears: 40,
      requiredFields: ['sales_experience', 'insurance_experience']
    },
    licensing: {
      validLicenses: ['Life', 'Health', 'Property', 'Casualty'],
      requiredCertifications: ['state_license', 'carrier_appointment']
    },
    production: {
      minimumMetrics: ['policies_sold', 'premium_volume'],
      validRanges: {
        policies_sold: { min: 0, max: 1000 },
        premium_volume: { min: 0, max: 10000000 }
      }
    }
  };

  validateProducerFeatures(features: ProducerFeatures): ValidationResult {
    return {
      licensing: this.validateLicensing(features.licensing),
      experience: this.validateExperience(features.experience),
      production: this.validateProduction(features.production),
      compliance: this.validateCompliance(features.compliance)
    };
  }

  private validateLicensing(licensing: any): boolean {
    return this.validationRules.licensing.validLicenses.includes(licensing.type) &&
           this.validationRules.licensing.requiredCertifications.every(cert => licensing.certifications.includes(cert));
  }

  private validateExperience(experience: any): boolean {
    return experience.years >= this.validationRules.experience.minYears && 
           experience.years <= this.validationRules.experience.maxYears &&
           this.validationRules.experience.requiredFields.every(field => field in experience);
  }

  private validateProduction(production: any): boolean {
    return this.validationRules.production.minimumMetrics.every(metric => metric in production) &&
           production.policies_sold >= this.validationRules.production.validRanges.policies_sold.min &&
           production.policies_sold <= this.validationRules.production.validRanges.policies_sold.max &&
           production.premium_volume >= this.validationRules.production.validRanges.premium_volume.min &&
           production.premium_volume <= this.validationRules.production.validRanges.premium_volume.max;
  }

  private validateCompliance(compliance: any): boolean {
    // Example validation logic for compliance
    return compliance.violations === 0 && compliance.lastReviewDate <= new Date();
  }
}
