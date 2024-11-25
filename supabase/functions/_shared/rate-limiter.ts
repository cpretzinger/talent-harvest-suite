const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitConfig {
  tokensPerInterval: number;  // Number of requests allowed
  interval: number;           // Time window in milliseconds
  uniqueTokenKey: string;     // Unique identifier (e.g., IP or user ID)
}

export class RateLimiter {
  private kv: Deno.Kv;

  constructor() {
    this.kv = await Deno.openKv();
  }

  async isRateLimited(config: RateLimitConfig): Promise<boolean> {
    const { tokensPerInterval, interval, uniqueTokenKey } = config;
    const now = Date.now();
    const key = ['rate-limit', uniqueTokenKey];

    // Atomic operation to get and update rate limit data
    const res = await this.kv.atomic()
      .get(key)
      .commit();

    const currentData = res.value as { tokens: number; lastRefill: number } || {
      tokens: tokensPerInterval,
      lastRefill: now,
    };

    // Calculate token refill
    const timePassed = now - currentData.lastRefill;
    const tokensToAdd = Math.floor(timePassed / interval) * tokensPerInterval;
    currentData.tokens = Math.min(
      tokensPerInterval,
      currentData.tokens + tokensToAdd
    );
    currentData.lastRefill = now;

    // Check if we have tokens available
    if (currentData.tokens <= 0) {
      return true; // Rate limited
    }

    // Consume a token
    currentData.tokens--;

    // Update the store
    await this.kv.set(key, currentData, { expireIn: interval });
    return false; // Not rate limited
  }

  static createRateLimitResponse(retryAfter: number = 60): Response {
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }
}