import { motion } from 'framer-motion';
import { fadeLeft, fadeRight, headerStagger } from '../lib/variants';

interface Props {
  title: React.ReactNode;
  tag: string;
}

export default function SectionHead({ title, tag }: Props) {
  return (
    <motion.div
      className="flex items-end justify-between gap-6 flex-wrap"
      style={{ marginBottom: 'clamp(34px,5vw,60px)' }}
      variants={headerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.h2
        className="font-pixel text-cream"
        style={{ fontSize: 'clamp(16px,3vw,30px)' }}
        variants={fadeLeft}
      >
        {title}
      </motion.h2>
      <motion.span className="text-[11px] text-muted tracking-[0.2em]" variants={fadeRight}>
        {tag}
      </motion.span>
    </motion.div>
  );
}
