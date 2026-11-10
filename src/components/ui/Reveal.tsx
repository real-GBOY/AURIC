import { motion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
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
  const trigger = onLoad ? { animate: 'visible' } : { whileInView: 'visible', viewport: inView };
  return (
    <Tag className={className} style={style} initial="hidden" {...trigger} variants={stagger(0.12, 0.05)}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={lineUp}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export const Dot = ({ char = '.' }: { char?: string }) => <span className="text-gold">{char}</span>;
