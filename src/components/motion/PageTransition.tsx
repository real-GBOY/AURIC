import { useEffect, useRef } from 'react';
import { AuricMark } from '../Logo';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

/**
 * Curtain between pages: a gold sheet and an ink sheet with the sun.
 * On load the curtain lifts away; on an internal link click it drops back in,
 * then the browser navigates. Skipped for new tabs, modifier clicks, hash links
 * and reduced-motion users.
 */
export default function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const gold = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (prefersReducedMotion()) {
      el.style.display = 'none';
      return;
    }

    // Enter: lift the curtain.
    const enter = () => {
      gsap.set(el, { display: 'block' });
      gsap
        .timeline({ defaults: { ease: 'power4.inOut' } })
        .set([ink.current, gold.current], { yPercent: 0 })
        .to(mark.current, { scale: 0.6, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
        .to(ink.current, { yPercent: -100, duration: 0.5 }, 0.05)
        .to(gold.current, { yPercent: -100, duration: 0.5 }, 0.1)
        .set(el, { display: 'none' });
    };
    enter();

    // Back/forward cache: the old page may come back with the curtain down.
    const onShow = (e: PageTransitionEvent) => e.persisted && enter();
    window.addEventListener('pageshow', onShow);

    // Leave: drop the curtain, then navigate.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download') || a.getAttribute('href')!.startsWith('#')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page (hash links)
      e.preventDefault();
      gsap
        .timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => location.assign(url.href) })
        .set(el, { display: 'block' })
        .fromTo(gold.current, { yPercent: 100 }, { yPercent: 0, duration: 0.32 })
        .fromTo(ink.current, { yPercent: 100 }, { yPercent: 0, duration: 0.32 }, 0.06)
        .fromTo(mark.current, { scale: 0.6, opacity: 0, rotate: -60 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.25, ease: 'back.out(2)' }, 0.14);
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('pageshow', onShow);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <div ref={gold} className="absolute inset-0 bg-gold" />
      <div ref={ink} className="absolute inset-0 flex items-center justify-center bg-ink">
        <div ref={mark}>
          <AuricMark size={72} className="text-gold" />
        </div>
      </div>
    </div>
  );
}
