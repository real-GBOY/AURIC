import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import Eyebrow from './Eyebrow';
import Carousel from './Carousel';
import SectionHead from './SectionHead';
import { fadeLeft, fadeUp, headerStagger, gridStagger } from '../lib/variants';
import { WRAP, type CaseStudyProject } from '../lib/data';

const pad = (n: number) => String(n).padStart(2, '0');

export default function CaseStudy({ project: p }: { project: CaseStudyProject }) {
  let step = 0;
  const next = () => { step += 1; return pad(step); };

  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden border-b border-[var(--line)]"
        style={{ padding: 'clamp(120px,16vh,168px) 0 clamp(54px,8vw,90px)' }}
      >
        <div className="absolute inset-0 hero-grid-bg" />

        <div className={`relative z-[4] ${WRAP}`}>
          <motion.div variants={headerStagger} initial="hidden" animate="visible">
            <motion.a
              href="/#work"
              variants={fadeLeft}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-muted hover:text-gold transition-colors mb-[26px]"
            >
              <ArrowLeft size={13} /> All Work
            </motion.a>

            <motion.div variants={fadeLeft} className="mb-[22px]">
              <Eyebrow>{p.category}</Eyebrow>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[clamp(24px,4vw,48px)] items-end">
              <motion.h1
                className="font-pixel text-cream leading-[1.28]"
                style={{ fontSize: 'clamp(32px,7vw,72px)', textShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}
                variants={fadeLeft}
              >
                {p.title}
              </motion.h1>

              <motion.p
                className="text-muted leading-[1.95] pb-[6px]"
                style={{ fontSize: 'clamp(13px,1.4vw,16px)', maxWidth: '46ch' }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, ease: 'circOut', delay: 0.25 }}
              >
                {p.tagline}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap mt-[30px]">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[22px] py-[13px] rounded text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--gold)', color: '#0A0A0B' }}
              >
                Visit Live Project <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
              <span className="text-[11px] text-muted uppercase tracking-[0.12em]">{p.year}</span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── OVERVIEW ───────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
        <div className={WRAP}>
          <SectionHead title="Overview" tag={`[ ${next()} — OVERVIEW ]`} />
          <motion.div
            className="flex flex-col gap-5 max-w-[820px]"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {p.overview.map((para, i) => (
              <motion.p key={i} variants={fadeUp} className="text-[14px] text-muted leading-[1.95]">
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DASHBOARD ──────────────────────────────────────────────────── */}
      {p.dashboardImages.length > 0 && (
        <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0', background: 'var(--bg-deep)' }}>
          <div className={WRAP}>
            <SectionHead title={p.dashboardLabel ?? 'The Dashboard'} tag={`[ ${next()} — WEB APP ]`} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'circOut' }}
              viewport={{ once: true, margin: '-60px' }}
              className="max-w-[900px] mx-auto"
            >
              <Carousel images={p.dashboardImages} aspect="16/10" fit="cover" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── MOBILE APP ─────────────────────────────────────────────────── */}
      {p.mobileImages.length > 0 && (
        <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
          <div className={WRAP}>
            <SectionHead title="The Mobile App" tag={`[ ${next()} — MOBILE ]`} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'circOut' }}
              viewport={{ once: true, margin: '-60px' }}
              className="max-w-[480px] mx-auto"
            >
              <Carousel images={p.mobileImages} aspect="9/16" fit="contain" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CORE MODULES ───────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0', background: 'var(--bg-deep)' }}>
        <div className={WRAP}>
          <SectionHead title={p.modulesLabel ?? 'Core Modules'} tag={`[ ${next()} — MODULES ]`} />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--gap)]"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {p.modules.map((m) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className="border border-[var(--line)] rounded p-[26px_24px]"
                style={{ background: 'var(--surface)' }}
              >
                <h3 className="font-pixel text-[11px] text-cream leading-[1.6] mb-[14px]">{m.title}</h3>
                <p className="text-[13px] text-muted leading-[1.85]">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ───────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
        <div className={WRAP}>
          <SectionHead title="Key Features" tag={`[ ${next()} — FEATURES ]`} />
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--gap)] gap-y-[16px]"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {p.features.map((f) => (
              <motion.li
                key={f}
                variants={fadeUp}
                className="flex items-start gap-[10px] text-[13px] text-cream leading-[1.7] border-b border-[var(--line)] pb-[16px]"
              >
                <Check size={14} className="text-gold shrink-0 mt-[3px]" />
                {f}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── TECHNOLOGIES ───────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0', background: 'var(--bg-deep)' }}>
        <div className={WRAP}>
          <SectionHead title="Technologies" tag={`[ ${next()} — STACK ]`} />
          <motion.div
            className={`grid grid-cols-1 ${p.techGroups.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : p.techGroups.length === 2 ? 'sm:grid-cols-2' : ''} gap-[var(--gap)]`}
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {p.techGroups.map((g) => (
              <motion.div key={g.label} variants={fadeUp} className="border border-[var(--line)] rounded p-[28px_26px]" style={{ background: 'var(--surface)' }}>
                <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-4">{g.label}</div>
                <div className="flex flex-wrap gap-[8px]">
                  {g.items.map((t) => (
                    <span key={t} className="text-[11px] text-cream border border-[var(--line)] rounded-[3px] px-[10px] py-[6px]">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ARCHITECTURE ───────────────────────────────────────────────── */}
      {p.architecture && (
        <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
          <div className={WRAP}>
            <SectionHead title="Architecture" tag={`[ ${next()} — ARCHITECTURE ]`} />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'circOut' }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-muted leading-[1.95] max-w-[820px]"
              style={{ fontSize: '14px' }}
            >
              {p.architecture}
            </motion.p>
          </div>
        </section>
      )}

      {/* ── IMPACT ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,9vw,116px) 0', background: p.architecture ? 'var(--bg-deep)' : undefined }}>
        <div className={WRAP}>
          <SectionHead title="Impact" tag={`[ ${next()} — IMPACT ]`} />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'circOut' }}
            viewport={{ once: true, margin: '-60px' }}
            className="text-cream leading-[1.9] max-w-[780px]"
            style={{ fontSize: 'clamp(14px,1.6vw,17px)' }}
          >
            {p.impact}
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
