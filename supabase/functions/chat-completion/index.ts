import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { RateLimiter } from "../_shared/rate-limiter.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const rateLimiter = new RateLimiter();

serve(async (req) => {
  console.log('Chat completion function started');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    // Validate OpenAI API key
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    console.log('Client IP:', clientIp);
    
    // Check rate limit (100 requests per hour per IP)
    const isLimited = await rateLimiter.isRateLimited({
      tokensPerInterval: 100,
      interval: 60 * 60 * 1000, // 1 hour
      uniqueTokenKey: `chat-completion:${clientIp}`,
    });

    if (isLimited) {
      console.log('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        {
          status: 429,
          headers: corsHeaders
        }
      );
    }

    console.log('Parsing request body');
    const { message } = await req.json();
    
    if (!message) {
      console.error('No message provided in request');
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: corsHeaders
        }
      );
    }

    console.log('Received message:', message);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      console.log('Request timed out after 25 seconds');
    }, 25000); // 25 second timeout

    try {
      console.log('Sending request to OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
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
        signal: controller.signal,
      });

      clearTimeout(timeout);
      console.log('Received response from OpenAI');

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        return new Response(
          JSON.stringify({ error: errorData.error?.message || 'Failed to get response from OpenAI' }),
          {
            status: response.status,
            headers: corsHeaders
          }
        );
      }

      const data = await response.json();
      console.log('Successfully parsed OpenAI response');
      
      if (!data.choices?.[0]?.message?.content) {
        console.error('Invalid response format from OpenAI:', data);
        return new Response(
          JSON.stringify({ error: 'Invalid response format from OpenAI' }),
          {
            status: 500,
            headers: corsHeaders
          }
        );
      }

      console.log('Sending successful response back to client');
      return new Response(
        JSON.stringify({ response: data.choices[0].message.content }),
        { headers: corsHeaders }
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
        return new Response(
          JSON.stringify({ error: 'Request timed out after 25 seconds' }),
          {
            status: 504,
            headers: corsHeaders
          }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error('Error in chat-completion function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
});