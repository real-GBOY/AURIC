// Cloudflare Turnstile (spam check). Active only when VITE_TURNSTILE_SITE_KEY is set (the live site).
export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY;

type Api = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Api;
  }
}

let loading: Promise<Api> | null = null;
/** Loads Cloudflare's script once. */
export function loadTurnstile(): Promise<Api> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<Api>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')));
    s.onerror = () => {
      loading = null;
      reject(new Error('turnstile failed to load'));
    };
    document.head.appendChild(s);
  });
  return loading;
}
