import { motion } from 'framer-motion';
import Nav from './Nav';
import Footer from './Footer';
import Eyebrow from './Eyebrow';
import { fadeLeft, headerStagger, fadeUp, gridStagger } from '../lib/variants';
import { WRAP, ALL_WORKS } from '../lib/data';

export default function AllWork() {
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
            <motion.div variants={fadeLeft} className="mb-[22px]">
              <Eyebrow>Full Portfolio</Eyebrow>
            </motion.div>
            <motion.h1
              className="font-pixel text-cream leading-[1.28]"
              style={{ fontSize: 'clamp(32px,7vw,72px)', textShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}
              variants={fadeLeft}
            >
              All Projects
            </motion.h1>
            <motion.p
              className="text-muted leading-[1.95] mt-[22px]"
              style={{ fontSize: 'clamp(13px,1.4vw,16px)', maxWidth: '60ch' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: 'circOut', delay: 0.25 }}
            >
              Every product we've shipped — from enterprise ERP platforms to specialized healthcare systems.
            </motion.p>
          </motion.div>
        </div>
      </header>

      {/* ── GRID ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
        <div className={WRAP}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--gap)]"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {ALL_WORKS.map((work) => (
              <motion.a
                key={work.title}
                href={work.href}
                variants={fadeUp}
                className="border border-[var(--line)] rounded overflow-hidden flex flex-col"
                style={{ background: 'var(--surface)' }}
                whileHover={{ y: -4, borderColor: '#C6A455', boxShadow: '0 16px 32px rgba(198,164,85,0.14)', transition: { duration: 0.2 } }}
              >
                <div className="h-[200px] relative overflow-hidden" style={!work.image ? { background: work.bg } : undefined}>
                  {work.image && (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  )}
                  <span
                    className="absolute top-3 left-3 z-[2] text-[9px] tracking-[0.14em] uppercase border border-[var(--line)] px-[9px] py-[5px] rounded-[3px] text-cream"
                    style={{ background: 'rgba(10,10,11,0.7)' }}
                  >
                    {work.tag}
                  </span>
                </div>
                <div className="p-5 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-[14px] text-cream leading-[1.4] tracking-normal">{work.title}</h3>
                    <div className="text-[11px] text-muted uppercase tracking-[0.1em] mt-[6px]">{work.cat}</div>
                  </div>
                  <span className="text-[11px] text-muted shrink-0">{work.year}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
