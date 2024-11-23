import { assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts';

Deno.test('ML System - Basic Prediction', async () => {
  const testInput = {
    feature1: 'value1',
    feature2: 42
  };

  const response = await fetch('http://localhost:54321/functions/v1/ml-system', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
    },
    body: JSON.stringify(testInput)
  });

  assertEquals(response.status, 200);
  
  const result = await response.json();
  assertEquals(result.success, true);
  assertEquals(typeof result.prediction, 'object');
});