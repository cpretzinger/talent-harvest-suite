import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { InsuranceProducerModel } from './InsuranceProducerModel.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();
    const modelVersion = `v${Date.now()}`;
    const model = new InsuranceProducerModel(supabase, modelVersion);

    switch (action) {
      case 'train':
        const history = await model.train(data);
        return new Response(JSON.stringify({ history }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      case 'predict':
        const prediction = await model.predict(data);
        return new Response(JSON.stringify({ prediction }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('ML Model error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});