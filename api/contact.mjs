// Vercel serverless function: POST /api/contact
// Checks the Cloudflare Turnstile token, then sends the email through EmailJS from the server,
// so bots can't skip the check by calling EmailJS directly.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   TURNSTILE_SECRET      Cloudflare Turnstile secret key
//   EMAILJS_PRIVATE_KEY   EmailJS private key (Account → API keys)
// Optional overrides: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY (the public IDs below are the defaults).

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_a8oxz9r';
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_5iwa87j';
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'aDH40t3RISIAaGX6L';

const LIMITS = { name: 100, email: 160, title: 200, time: 80, message: 2000 };
const clip = (v, max) => String(v ?? '').slice(0, max);

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method' });
  }
  const secret = process.env.TURNSTILE_SECRET;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!secret || !privateKey) return json(res, 500, { ok: false, error: 'not-configured' });

  const body = await readBody(req);
  const token = clip(body.token, 4096);
  const p = body.params && typeof body.params === 'object' ? body.params : {};
  const name = clip(p.name, LIMITS.name).trim();
  const email = clip(p.email, LIMITS.email).trim();
  if (!token) return json(res, 400, { ok: false, error: 'captcha' });
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 400, { ok: false, error: 'invalid' });

  // 1 · Cloudflare checks the token
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  let verified = false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    verified = !!(await r.json()).success;
  } catch {
    return json(res, 502, { ok: false, error: 'captcha-service' });
  }
  if (!verified) return json(res, 403, { ok: false, error: 'captcha' });

  // 2 · Send the email (only the fields the template uses, with length limits)
  const template_params = {
    name,
    email,
    reply_to: email,
    title: clip(p.title, LIMITS.title),
    time: clip(p.time, LIMITS.time),
    message: clip(p.message, LIMITS.message),
  };
  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, accessToken: privateKey, template_params }),
    });
    if (!r.ok) return json(res, 502, { ok: false, error: 'send' });
  } catch {
    return json(res, 502, { ok: false, error: 'send' });
  }
  return json(res, 200, { ok: true });
}
