import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade and rise into place. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** A headline line sliding up from behind a mask (wrap the line in overflow-hidden).
 *  Starts far enough down to stay hidden under the mask's extra bottom headroom. */
export const lineUp: Variants = {
  hidden: { y: '150%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE } },
};

/** Pieces dropping into a collage or moodboard. */
export const drop: Variants = {
  hidden: { opacity: 0, y: -40, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Media pills growing out from the headline. */
export const pillGrow: Variants = {
  hidden: { opacity: 0, scaleX: 0.2 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const inView = { once: true, margin: '-80px' } as const;

/**
 * Click-and-drag horizontal scrolling for strips on desktop (mouse only;
 * touch keeps native swiping). Returns a ref for the scroll container.
 */
export function useDragScroll<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.classList.add('is-dragging');
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
      el.classList.remove('is-dragging');
    };
    // Swallow the click that ends a drag so cards don't open by accident.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, []);
  return ref;
}

/** True once the page has scrolled past `offset` pixels (defaults to most of the first screen). */
export function useScrolledPast(offset?: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const limit = offset ?? window.innerHeight * 0.7;
    const onScroll = () => setPast(window.scrollY > limit);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return past;
}
