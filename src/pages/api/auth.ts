export const prerender = false;

import type { APIRoute } from 'astro';

const ACCESS_PIN = '1924';
const BARKER_ID = 'agent_9601kvdjdvqefd99es8881mc4z9g';
const GOODWILL_ID = 'agent_5001kvdjcj2ke88aenh6yq6wh02h';

// Simple per-IP rate limiting
const attempts = new Map<string, { count: number; reset: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.reset) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // Rate limit check
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many attempts. Try again in a minute.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { pin } = body;

  if (pin !== ACCESS_PIN) {
    return new Response(
      JSON.stringify({ error: 'Wrong PIN' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Correct PIN — return agent IDs
  // Clear rate limit for this IP on success
  attempts.delete(ip);

  return new Response(
    JSON.stringify({
      ok: true,
      agents: {
        barker: BARKER_ID,
        goodwill: GOODWILL_ID,
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
