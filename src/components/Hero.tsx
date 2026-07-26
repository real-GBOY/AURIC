import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { fadeUp, fadeLeft, fadeRight, headerStagger, tightStagger } from '../lib/variants';
import { HERO_ICONS, WRAP } from '../lib/data';

export default function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden border-b border-[var(--line)]"
      style={{ paddingTop: 'clamp(98px,12vh,128px)', paddingBottom: 'clamp(40px,6vh,68px)' }}
    >
      <div className="absolute inset-0 hero-grid-bg" />

      <div className={`relative z-[4] ${WRAP}`}>

        {/* Eyebrow row */}
        <motion.div
          className="flex items-center justify-between gap-4 mb-[26px] flex-wrap"
          variants={headerStagger} initial="hidden" animate="visible"
        >
          <motion.div variants={fadeLeft}>
            <Eyebrow>Digital Solutions Company</Eyebrow>
          </motion.div>
          <motion.span
            className="text-[11px] tracking-[0.22em] text-muted uppercase flex items-center gap-[10px] font-mono"
            variants={fadeRight}
          >
            <span className="w-2 h-2 bg-gold inline-block animate-blink rounded-full" />
            EST. 2025
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-pixel text-cream leading-[1.34] max-w-[20ch]"
          style={{ fontSize: 'clamp(24px,5.2vw,62px)', textShadow: '4px 4px 0 rgba(0,0,0,0.45)' }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'circOut', delay: 0.2 }}
        >
          Building Digital Products That Create{' '}
          <span className="text-gold">Competitive Advantage</span>
        </motion.h1>

        {/* Icon bar */}
        <motion.div
          className="mt-8 flex items-center justify-around gap-4 bg-cream rounded-md py-[14px] px-[clamp(20px,4vw,48px)] flex-wrap"
          aria-hidden="true"
          variants={tightStagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.4 }}
        >
          {HERO_ICONS.map(({ Icon, label }) => (
            <motion.span
              key={label}
              title={label}
              className="text-[#1E1E1E] cursor-default transition-colors duration-200 hover:text-gold"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.15, transition: { duration: 0.2 } }}
            >
              <Icon size={22} strokeWidth={1.5} />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
