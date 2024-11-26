import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Simple in-memory store for rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (clientId: string): boolean => {
  const now = Date.now();
  const limit = rateLimits.get(clientId);
  
  // Reset if time window has passed
  if (!limit || now > limit.resetTime) {
    rateLimits.set(clientId, {
      count: 1,
      resetTime: now + 60000 // 1 minute window
    });
    return false;
  }

  // Check if over limit
  if (limit.count >= 5) { // 5 requests per minute
    return true;
  }

  // Increment counter
  limit.count++;
  return false;
};

serve(async (req) => {
  console.log('Received request:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = req.headers.get('x-client-info') || 'anonymous';
    console.log('Client ID:', clientId);
    
    // Check rate limit
    if (isRateLimited(clientId)) {
      console.log('Rate limit exceeded for client:', clientId);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      );
    }

    // Validate OpenAI API key
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    // Parse and validate request body
    const { message } = await req.json();
    console.log('Received message:', message);
    
    if (!message) {
      console.error('No message provided in request');
      throw new Error('Message is required');
    }

    console.log('Making request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful insurance agency assistant. Provide clear, concise answers about insurance-related topics and agency operations.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    console.log('Received response from OpenAI');

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response format from OpenAI:', data);
      throw new Error('Invalid response format from OpenAI');
    }

    const result = { response: data.choices[0].message.content };
    console.log('Sending response back to client');

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error in chat completion function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: error.message.includes('API key') ? 500 : 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});