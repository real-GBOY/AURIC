import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

interface Props {
  target: number;
  suffix?: string;
}

// Renders the real number by default so it never gets stuck on "0" if the
// in-view animation doesn't fire; counts up from 0 only once it's on screen.
export default function CountUp({ target, suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const ctrl = animate(0, target, {
      duration: 1.1,
      ease: [0, 0, 0.2, 1] as const,
      onUpdate(v) { if (ref.current) ref.current.textContent = String(Math.round(v)); },
    });
    return () => ctrl.stop();
  }, [inView, reduceMotion, target]);

  return (
    <>
      <span ref={ref}>{target}</span>
      {suffix && <span className="text-gold">{suffix}</span>}
    </>
  );
}
