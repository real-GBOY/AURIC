import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface Props {
  target: number;
  suffix?: string;
}

export default function CountUp({ target, suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, target, {
      duration: 1.1,
      ease: [0, 0, 0.2, 1] as const,
      onUpdate(v) { if (ref.current) ref.current.textContent = String(Math.round(v)); },
    });
    return () => ctrl.stop();
  }, [inView, target]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix && <span className="text-gold">{suffix}</span>}
    </>
  );
}
