// The contact function, with Cloudflare and EmailJS replaced by fakes:  npm test
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

process.env.TURNSTILE_SECRET = 'test-secret';
process.env.EMAILJS_PRIVATE_KEY = 'test-private';
const { default: handler } = await import('../api/contact.mjs');

let calls;
function fakeFetch({ turnstile = true, emailjs = true } = {}) {
  calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes('turnstile')) return { ok: true, json: async () => ({ success: turnstile }) };
    return { ok: emailjs, json: async () => ({}) };
  };
}
const run = async (method, body) => {
  const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = b ? JSON.parse(b) : null; } };
  await handler({ method, body, headers: { 'x-forwarded-for': '1.2.3.4' } }, res);
  return res;
};
const good = { token: 'tok', params: { name: 'Sara', email: 'sara@example.com', title: 'New project', time: 'now', message: 'Hello' } };

beforeEach(() => fakeFetch());

test('rejects anything but POST', async () => assert.equal((await run('GET')).statusCode, 405));
test('sends the email when the check passes', async () => {
  const r = await run('POST', good);
  assert.equal(r.statusCode, 200);
  assert.equal(calls.length, 2);
  const sent = JSON.parse(calls[1].init.body);
  assert.equal(sent.accessToken, 'test-private');
  assert.equal(sent.template_params.email, 'sara@example.com');
});
test('refuses and sends nothing when the check fails', async () => {
  fakeFetch({ turnstile: false });
  const r = await run('POST', good);
  assert.equal(r.statusCode, 403);
  assert.equal(calls.length, 1);
});
test('refuses a missing token and a bad email without calling anyone', async () => {
  assert.equal((await run('POST', { ...good, token: '' })).statusCode, 400);
  assert.equal((await run('POST', { ...good, params: { ...good.params, email: 'nope' } })).statusCode, 400);
  assert.equal(calls.length, 0);
});
test('cuts oversized fields and drops unknown ones', async () => {
  await run('POST', { token: 't', params: { ...good.params, message: 'x'.repeat(5000), evil: 'yes' } });
  const sent = JSON.parse(calls[1].init.body).template_params;
  assert.equal(sent.message.length, 2000);
  assert.equal(sent.evil, undefined);
});
test('reports a failed send', async () => {
  fakeFetch({ emailjs: false });
  assert.equal((await run('POST', good)).statusCode, 502);
});
