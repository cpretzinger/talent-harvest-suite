export const modelConfig = {
  inputFeatures: [
    // Experience Features
    'years_experience',
    'insurance_experience',
    'sales_experience',
    
    // Skills Assessment
    'product_knowledge',
    'sales_technique',
    'client_relationship',
    'negotiation',
    
    // Personality Metrics
    'disc_dominance',
    'disc_influence',
    'disc_steadiness',
    'disc_conscientiousness',
    
    // Performance Indicators
    'lead_conversion_rate',
    'client_retention',
    'average_policy_value',
    
    // Assessment Scores
    'technical_assessment',
    'personality_assessment',
    'sales_simulation'
  ],
  
  outputFeatures: [
    'success_probability',
    'expected_performance',
    'retention_likelihood'
  ]
};

export const normalizationRules = {
  years_experience: { min: 0, max: 30 },
  product_knowledge: { min: 0, max: 100 },
  sales_technique: { min: 0, max: 100 },
  disc_dominance: { min: 0, max: 1 },
  technical_assessment: { min: 0, max: 100 }
};