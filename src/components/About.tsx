import { motion } from 'framer-motion';
import { Plus, Gem, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import SectionHead from './SectionHead';
import CountUp from './CountUp';
import Eyebrow from './Eyebrow';
import { scaleIn, gridStagger, cardHover } from '../lib/variants';
import { WRAP } from '../lib/data';

export default function About() {
  return (
    <section id="about" className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
      <div className={WRAP}>
        <SectionHead title={<>We Build<br />Competitive Advantage</>} tag="[ 01 — ABOUT ]" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--gap)]"
          style={{ gridAutoRows: 'minmax(150px,auto)' }}
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Lead card */}
          <motion.div
            variants={scaleIn}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between rounded p-[28px] border border-[var(--line)]"
            style={{ background: 'var(--surface-2)' }}
            whileHover={cardHover}
          >
            <div>
              <h3 className="text-cream leading-[1.5] mb-[16px]" style={{ fontSize: 'clamp(13px,1.5vw,17px)' }}>
                We partner with ambitious businesses to design, build and optimize digital products that drive measurable outcomes.
              </h3>
              <p className="text-muted text-[13px] leading-[1.9] max-w-[42ch]">
                Every solution is built from the ground up around your business — not from templates or one-size-fits-all approaches. Technology is never the end goal. Business growth is.
              </p>
            </div>
            <Eyebrow className="mt-6">Founded in 2025</Eyebrow>
          </motion.div>

          {/* Stat: 47 projects */}
          <motion.div
            variants={scaleIn}
            className="rounded p-[28px] border border-[var(--line)] relative"
            style={{ background: 'var(--surface)' }}
            whileHover={cardHover}
          >
            <Plus size={16} className="absolute top-[18px] right-[18px] text-gold opacity-80" />
            <div className="text-cream font-semibold leading-none tracking-normal" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              <CountUp target={10} />
            </div>
            <div className="text-[11px] tracking-[0.16em] uppercase text-muted mt-[14px]">Products Delivered</div>
          </motion.div>

          {/* Stat: 12 countries */}
          <motion.div
            variants={scaleIn}
            className="rounded p-[28px] border border-[var(--line)] relative"
            style={{ background: 'var(--surface)' }}
            whileHover={cardHover}
          >
            <Gem size={14} className="absolute top-[18px] right-[18px] text-gold opacity-80" />
            <div className="text-cream font-semibold leading-none tracking-normal" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              <CountUp target={8} />
            </div>
            <div className="text-[11px] tracking-[0.16em] uppercase text-muted mt-[14px]">Industries Served</div>
          </motion.div>

          {/* Work teaser */}
          <motion.div
            variants={scaleIn}
            className="md:col-span-2 lg:col-span-2 flex items-center justify-between gap-4 rounded p-[28px] border border-[var(--line)]"
            style={{ background: 'var(--surface)' }}
            whileHover={cardHover}
          >
            <div className="flex items-center gap-[14px]">
              <span
                className="w-[42px] h-[42px] rounded-full border border-[var(--line)] flex items-center justify-center text-gold shrink-0"
                style={{ background: 'var(--surface-2)' }}
              >
                <Sparkles size={17} strokeWidth={1.5} />
              </span>
              <span className="text-[12px] text-cream leading-[1.6]">Real products, live in production</span>
            </div>
            <a href="/#work" className="text-[12px] tracking-[0.12em] uppercase text-cream flex items-center gap-2 hover:text-gold transition-colors shrink-0">
              See Our Work <ChevronRight size={14} />
            </a>
          </motion.div>

          {/* Stat: 98% retention */}
          <motion.div
            variants={scaleIn}
            className="md:col-span-2 lg:col-span-2 rounded p-[28px] border border-[var(--line)] relative"
            style={{ background: 'var(--surface)' }}
            whileHover={cardHover}
          >
            <TrendingUp size={15} className="absolute top-[18px] right-[18px] text-gold opacity-80" />
            <div className="text-cream font-semibold leading-none tracking-normal" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              <CountUp target={98} suffix="%" />
            </div>
            <div className="text-[11px] tracking-[0.16em] uppercase text-muted mt-[14px]">Client Retention Rate</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
