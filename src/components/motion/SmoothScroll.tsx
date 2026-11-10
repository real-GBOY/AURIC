import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/** The page's Lenis instance (null when smooth scrolling is off). */
export let lenis: Lenis | null = null;

const HEADER_OFFSET = -88;

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger scenes stay
 * in sync. In-page anchor links (#create, #build…) glide to their target.
 * Off for reduced-motion users, who get the browser's native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis = instance;
    (window as unknown as { lenis?: Lenis }).lenis = instance; // handy for debugging and tests
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (hash: string, immediate = false) => {
      const el = hash.length > 1 ? document.querySelector<HTMLElement>(decodeURIComponent(hash)) : null;
      if (el) instance.scrollTo(el, { offset: HEADER_OFFSET, immediate, duration: 1.4 });
      return !!el;
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      if (scrollToHash(url.hash)) {
        e.preventDefault();
        history.pushState(null, '', url.hash);
      }
    };
    document.addEventListener('click', onClick);

    // Arriving with a hash (e.g. /services#build): jump there once the layout has settled.
    let hashTimer = 0;
    if (location.hash) hashTimer = window.setTimeout(() => scrollToHash(location.hash, true), 120);

    return () => {
      window.clearTimeout(hashTimer);
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
