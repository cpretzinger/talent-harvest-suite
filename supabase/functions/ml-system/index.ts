import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MLSystemConfig {
  modelVersion: string;
  updateFrequency: number;
  batchSize: number;
  predictionThreshold: number;
}

class MLService {
  constructor(
    private supabase: any,
    private config: MLSystemConfig
  ) {}

  async predict(input: any) {
    console.log('Processing prediction request:', input);
    
    try {
      // 1. Feature Processing
      const features = await this.processFeatures(input);
      console.log('Processed features:', features);

      // 2. Get Latest Model
      const { data: model, error: modelError } = await this.supabase
        .from('ml_models')
        .select('*')
        .eq('status', 'active')
        .single();

      if (modelError) throw new Error(`Model fetch error: ${modelError.message}`);
      console.log('Using model version:', model.version);

      // 3. Generate Prediction
      const prediction = {
        result: await this.generatePrediction(features, model),
        confidence: 0.85, // Placeholder
        timestamp: new Date().toISOString()
      };
      console.log('Generated prediction:', prediction);

      // 4. Store Prediction
      const { error: insertError } = await this.supabase
        .from('ml_predictions')
        .insert({
          input_data: input,
          features,
          prediction: prediction.result,
          confidence: prediction.confidence,
          model_version: model.version
        });

      if (insertError) throw new Error(`Prediction storage error: ${insertError.message}`);

      return { success: true, prediction };
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }

  private async processFeatures(input: any) {
    // Simple feature processing - expand this based on your needs
    return {
      processed: input,
      timestamp: new Date().toISOString()
    };
  }

  private async generatePrediction(features: any, model: any) {
    // Simple prediction logic - expand this based on your model
    return {
      class: 'A',
      probability: 0.85
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get ML system configuration
    const { data: config, error: configError } = await supabase
      .from('ml_system_config')
      .select('*')
      .single();

    if (configError) {
      throw new Error(`Configuration error: ${configError.message}`);
    }

    const mlService = new MLService(supabase, config);

    switch (req.method) {
      case 'POST':
        const input = await req.json();
        const result = await mlService.predict(input);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('ML System error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});