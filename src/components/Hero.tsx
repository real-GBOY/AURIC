import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { fadeUp, fadeLeft, fadeRight, headerStagger, tightStagger } from '../lib/variants';
import { HERO_ICONS, WRAP } from '../lib/data';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative overflow-hidden border-b border-[var(--line)]"
      style={{ paddingTop: 'clamp(98px,12vh,128px)', paddingBottom: 'clamp(40px,6vh,68px)' }}
    >
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="absolute inset-0 scanline z-[3]" />

      <div className={`relative z-[4] ${WRAP}`}>

        {/* Eyebrow row */}
        <motion.div
          className="flex items-center justify-between gap-4 mb-[26px] flex-wrap"
          variants={headerStagger} initial="hidden" animate="visible"
        >
          <motion.div variants={fadeLeft}>
            <Eyebrow>Independent Brand Studio</Eyebrow>
          </motion.div>
          <motion.span
            className="text-[11px] tracking-[0.22em] text-muted uppercase flex items-center gap-[10px]"
            variants={fadeRight}
          >
            <span className="w-2 h-2 bg-orange inline-block animate-blink" />
            EST. 2019 — STUDIO No.07
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-pixel text-cream animate-flicker leading-[1.34] max-w-[18ch]"
          style={{ fontSize: 'clamp(24px,5.2vw,62px)', textShadow: '4px 4px 0 rgba(0,0,0,0.45)' }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'circOut', delay: 0.2 }}
        >
          We Build<br />Brands That<br />Hit{' '}
          <span className="text-orange" style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.45)' }}>
            Different
          </span>
        </motion.h1>

        {/* Featured panel */}
        <motion.div
          className="relative rounded-md overflow-hidden border border-[var(--line)]"
          style={{ background: 'var(--surface)', marginTop: 'clamp(26px,4vw,46px)' }}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'circOut', delay: 0.35 }}
        >
          {/* Parallax image */}
          <div className="w-full overflow-hidden min-h-[380px]" style={{ aspectRatio: '16/10' }}>
            <motion.img
              src="/hero-cyberpunk.jpg"
              alt="Cyberpunk cityscape"
              className="w-full h-full object-cover"
              style={{ y: heroImgY, scale: 1.08 }}
            />
          </div>

          <div className="absolute inset-0 panel-scan z-[2]" />

          {/* Intro card */}
          <motion.div
            className="absolute top-0 left-0 z-[4] p-5 border-r border-b border-[var(--line)] rounded-br-md max-w-[380px]"
            style={{ background: 'rgba(22,22,22,0.84)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'circOut', delay: 0.6 }}
          >
            <p className="text-[12px] text-cream leading-[1.75]">
              A retro-minded studio for forward-thinking companies — identity, web &amp; motion that read like a classic.
            </p>
            <p className="text-[12px] text-muted mt-[10px] leading-[1.75]">No filler. Just brands that play.</p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="absolute top-5 right-5 flex gap-3 z-[4] flex-wrap"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'circOut', delay: 0.65 }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-[18px] py-[11px] text-[11px] tracking-[0.14em] uppercase border border-cream text-cream rounded transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange hover:border-orange hover:text-[#161616]"
              style={{ background: 'rgba(22,22,22,0.78)', backdropFilter: 'blur(5px)' }}
            >
              See Our Work <ArrowRight size={13} />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-[18px] py-[11px] text-[11px] tracking-[0.14em] uppercase border border-cream text-cream rounded transition-all duration-200 hover:border-orange hover:text-orange"
              style={{ background: 'rgba(22,22,22,0.78)', backdropFilter: 'blur(5px)' }}
            >
              How We Do It
            </a>
          </motion.div>

          {/* Neon label */}
          <motion.div
            className="absolute right-6 bottom-5 z-[4] text-right hidden sm:block font-pixel neon-text animate-neonflick"
            style={{ fontSize: '13px', lineHeight: '1.6', letterSpacing: '0.08em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            YOKOHAMA<br />STUDIO 07
          </motion.div>
        </motion.div>

        {/* Icon bar */}
        <motion.div
          className="mt-4 flex items-center justify-around gap-4 bg-cream rounded-md py-[14px] px-[clamp(20px,4vw,48px)] flex-wrap"
          aria-hidden="true"
          variants={tightStagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.75 }}
        >
          {HERO_ICONS.map(({ Icon, label }) => (
            <motion.span
              key={label}
              title={label}
              className="text-[#1E1E1E] cursor-default transition-colors duration-200 hover:text-orange"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.15, transition: { duration: 0.2 } }}
            >
              <Icon size={22} strokeWidth={1.5} />
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* EST. label */}
      <motion.div
        className="absolute left-[var(--edge)] bottom-[30px] z-[4] text-[11px] tracking-[0.22em] text-muted uppercase flex items-center gap-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <span className="w-2 h-2 bg-orange inline-block animate-blink" />
        EST. 2019
      </motion.div>
    </header>
  );
}
