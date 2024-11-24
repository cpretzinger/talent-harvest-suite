import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Generate embeddings using OpenAI
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input: JSON.stringify(lead),
      }),
    });

    const { data: [{ embedding }] } = await embeddingResponse.json();

    // Find similar leads using vector similarity
    const { data: similarLeads } = await supabaseClient.rpc('match_similar_leads', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 5
    });

    // Calculate score and generate recommendations
    const score = calculateScore(lead, similarLeads);
    const recommendations = generateRecommendations(lead, similarLeads);

    return new Response(
      JSON.stringify({ score, recommendations }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

function calculateScore(lead: any, similarLeads: any[]): any {
  const conversionRate = similarLeads.filter(l => l.outcome === 'converted').length / similarLeads.length;
  
  return {
    score: conversionRate * 100,
    confidence: calculateConfidence(similarLeads),
    factors: identifyKeyFactors(lead, similarLeads),
  };
}

function calculateConfidence(similarLeads: any[]): number {
  return similarLeads.length >= 5 ? 0.8 : 0.5;
}

function identifyKeyFactors(lead: any, similarLeads: any[]): string[] {
  // Implement factor identification logic
  return ['Factor 1', 'Factor 2'];
}

function generateRecommendations(lead: any, similarLeads: any[]): any[] {
  // Implement recommendation generation logic
  return [
    {
      type: 'action',
      description: 'Follow up within 24 hours',
      priority: 'high',
      action: 'schedule_followup'
    }
  ];
}