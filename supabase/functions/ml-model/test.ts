import { assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts';

Deno.test('ML Model - Basic Training', async () => {
  const testData = [{
    years_experience: 5,
    insurance_experience: 3,
    sales_experience: 4,
    product_knowledge: 85,
    sales_technique: 75,
    client_relationship: 80,
    negotiation: 70,
    disc_dominance: 0.7,
    disc_influence: 0.8,
    disc_steadiness: 0.6,
    disc_conscientiousness: 0.75,
    lead_conversion_rate: 0.25,
    client_retention: 0.85,
    average_policy_value: 5000,
    technical_assessment: 82,
    personality_assessment: 88,
    sales_simulation: 78,
    success_probability: 0.85,
    expected_performance: 0.82,
    retention_likelihood: 0.88
  }];

  const response = await fetch('http://localhost:54321/functions/v1/ml-model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
    },
    body: JSON.stringify({
      action: 'train',
      data: testData
    })
  });

  assertEquals(response.status, 200);
  
  const result = await response.json();
  assertEquals(typeof result.history, 'object');
});

Deno.test('ML Model - Basic Prediction', async () => {
  const testInput = {
    years_experience: 5,
    insurance_experience: 3,
    sales_experience: 4,
    product_knowledge: 85,
    sales_technique: 75,
    client_relationship: 80,
    negotiation: 70,
    disc_dominance: 0.7,
    disc_influence: 0.8,
    disc_steadiness: 0.6,
    disc_conscientiousness: 0.75,
    lead_conversion_rate: 0.25,
    client_retention: 0.85,
    average_policy_value: 5000,
    technical_assessment: 82,
    personality_assessment: 88,
    sales_simulation: 78
  };

  const response = await fetch('http://localhost:54321/functions/v1/ml-model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
    },
    body: JSON.stringify({
      action: 'predict',
      data: testInput
    })
  });

  assertEquals(response.status, 200);
  
  const result = await response.json();
  assertEquals(typeof result.prediction, 'object');
  assertEquals(typeof result.prediction.success_probability, 'number');
});