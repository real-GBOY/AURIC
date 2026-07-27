import { useMemo, useEffect } from 'react';
import Nav from './Nav';
import { WRAP } from '../lib/data';

const MARQUEE_ITEMS = [
  'Page Not Found', 'Broken Link', 'Error 404', 'Return Home',
  'Page Not Found', 'Broken Link', 'Error 404', 'Return Home',
];

export default function NotFound() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') window.location.href = '/';
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const route = useMemo(() => {
    try {
      const p = window.location.pathname + window.location.search + window.location.hash;
      return p && p !== '/' ? decodeURIComponent(p) : '/page-not-found';
    } catch {
      return '/page-not-found';
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Stage */}
      <main className="relative min-h-screen flex items-center overflow-hidden" style={{ padding: '120px 0 80px' }}>
        <div className="absolute inset-0 grid-bg-404" />

        <div className={`relative z-[4] w-full text-center flex flex-col items-center ${WRAP}`}>

          {/* Eyebrow */}
          <span className="text-[11px] tracking-[0.28em] uppercase text-muted inline-flex items-center gap-[10px] mb-[34px]">
            <span className="w-[22px] h-px bg-gold inline-block shrink-0" />
            Error · Page Not Found
          </span>

          {/* 404 */}
          <div
            className="font-pixel leading-none text-cream"
            style={{ fontSize: 'clamp(70px,19vw,200px)', textShadow: '5px 5px 0 rgba(0,0,0,0.45)' }}
          >
            404
          </div>

          {/* Headline */}
          <h1
            className="font-pixel text-cream mt-[26px]"
            style={{ fontSize: 'clamp(16px,3.4vw,30px)', textShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}
          >
            This Page Doesn't{' '}
            <span className="text-gold">Exist</span>
          </h1>

          {/* Sub copy */}
          <p className="mt-[26px] max-w-[52ch] text-muted leading-[1.95]" style={{ fontSize: 'clamp(12px,1.3vw,15px)' }}>
            The page you're looking for may have been moved, renamed, or never existed. Let's get you back on track.
          </p>

          {/* Console card */}
          <div
            className="mt-[38px] text-left border border-[var(--line)] rounded-[6px] overflow-hidden"
            style={{ width: 'min(560px,100%)', background: 'var(--surface)' }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-[var(--line)]"
              style={{ background: 'var(--surface-2)' }}
            >
              <span className="w-[10px] h-[10px] rounded-full bg-gold border border-gold" />
              <span className="w-[10px] h-[10px] rounded-full border border-[var(--line)]" />
              <span className="w-[10px] h-[10px] rounded-full border border-[var(--line)]" />
              <span className="ml-2 text-[10px] tracking-[0.16em] uppercase text-muted">route.log</span>
            </div>

            {/* Log rows */}
            <div className="px-[18px] py-5 font-mono text-[12.5px] leading-[1.95] flex flex-col gap-0">
              {[
                { k: '> status', v: '404 NOT_FOUND',                  err: true  },
                { k: '> route',  v: route,                             err: false },
                { k: '> cause',  v: 'broken_link · moved · typo',      err: false },
              ].map(({ k, v, err }) => (
                <div key={k} className="flex gap-[10px]">
                  <span className="text-muted whitespace-nowrap">{k}</span>
                  <span className={err ? 'text-gold' : 'text-cream'}>{v}</span>
                </div>
              ))}
              <div className="flex gap-[10px]">
                <span className="text-muted whitespace-nowrap">&gt; retry</span>
                <span className="text-cream">
                  press{' '}
                  <a
                    href="/"
                    className="text-gold underline underline-offset-2 decoration-dotted hover:decoration-solid transition-all duration-150"
                  >
                    [ continue ]
                  </a>
                  {' '}to return home
                  <span
                    className="inline-block w-2 h-[15px] bg-gold align-[-2px] ml-1 animate-blink"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-[38px] flex flex-wrap gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-[10px] px-[26px] py-4 rounded text-[12px] tracking-[0.14em] uppercase border transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: '#161616' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 10px 24px rgba(220,167,51,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              Return Home
              <span className="transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
            </a>
            <a
              href="/#work"
              className="inline-flex items-center gap-[10px] px-[26px] py-4 rounded text-[12px] tracking-[0.14em] uppercase border border-cream text-cream transition-all duration-200 hover:border-gold hover:text-gold hover:-translate-y-0.5"
            >
              Browse Work
            </a>
          </div>

          {/* Quick-jump nav */}
          <div className="mt-[30px] flex flex-wrap gap-y-2 justify-center items-center text-[11px] tracking-[0.12em] uppercase text-muted">
            <span className="mr-2">Jump to:</span>
            {[
              { label: 'About',    href: '/#about'    },
              { label: 'Services', href: '/#services' },
              { label: 'Work',     href: '/#work'     },
              { label: 'Contact',  href: '/#contact'  },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-[14px] py-[6px] border border-[var(--line)] rounded mx-[6px] text-cream transition-all duration-200 hover:border-gold hover:text-gold hover:-translate-y-0.5"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom marquee strip */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[4] overflow-hidden whitespace-nowrap border-t border-[var(--line)] py-[14px]"
          style={{ background: 'var(--bg-deep)' }}
          aria-hidden="true"
        >
          <div className="inline-flex animate-[marquee-scroll_26s_linear_infinite]">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="text-[12px] tracking-[0.2em] uppercase text-muted px-[10px] inline-flex items-center gap-6"
              >
                {MARQUEE_ITEMS.map((item, j) => (
                  <span key={j} className="inline-flex items-center gap-6">
                    {item}
                    {j < MARQUEE_ITEMS.length - 1 && <span className="text-gold">·</span>}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
