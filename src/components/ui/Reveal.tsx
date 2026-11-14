import { motion } from 'framer-motion';
import { useRef, type ElementType, type ReactNode } from 'react';
import { useFitText } from '../../lib/fit';
import { inView, lineUp, rise, stagger } from '../../lib/motion';

/** Fades and lifts its children into view once. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'p' | 'span';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={rise}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Big headline that reveals line by line, each line sliding up from behind a mask.
 * Pass lines as an array; each can hold JSX (gold dots, outlines).
 */
export function TitleReveal({
  lines,
  className = 'mega',
  as = 'h1',
  style,
  onLoad = true,
}: {
  lines: ReactNode[];
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  style?: React.CSSProperties;
  /** Animate on page load (heroes) instead of when scrolled into view. */
  onLoad?: boolean;
}) {
  const Tag = motion[as] as ElementType;
  const ref = useRef<HTMLElement>(null);
  useFitText(ref);
  const trigger = onLoad ? { animate: 'visible' } : { whileInView: 'visible', viewport: inView };
  return (
    <Tag ref={ref} className={`min-w-0 max-w-full ${className}`} style={style} initial="hidden" {...trigger} variants={stagger(0.12, 0.05)}>
      {lines.map((line, i) => (
        // The mask only clips vertically (for the slide-up); lines never wrap and
        // the whole title shrinks to fit its column instead of being cut off.
        // Headroom above and below (cancelled by negative margins, so the layout is unchanged):
        // with tight line-heights, tall letters, accents and Arabic marks reach past the line box.
        <span key={i} className="-mb-[0.26em] -mt-[0.32em] block pb-[0.32em] pt-[0.32em] [overflow-x:visible] [overflow-y:clip]">
          <motion.span data-fit-line className="inline-block whitespace-nowrap" variants={lineUp}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A single big line (not animated) that shrinks to fit its column. */
export function FitLine({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  useFitText(ref);
  return (
    <span ref={ref} className={`block min-w-0 max-w-full ${className}`} style={style}>
      <span data-fit-line className="inline-block whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

export const Dot = ({ char = '.' }: { char?: string }) => <span className="text-gold">{char}</span>;
