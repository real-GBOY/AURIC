import { motion } from 'framer-motion';
import SectionHead from './SectionHead';
import { fadeUp, gridStagger } from '../lib/variants';
import { WORKS, WRAP } from '../lib/data';

export default function Work() {
  return (
    <section id="work" className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
      <div className={WRAP}>
        <SectionHead title="Selected Work" tag="[ 03 — PORTFOLIO ]" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-6 gap-[var(--gap)]"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {WORKS.map((work) => (
            <motion.article
              key={work.title}
              variants={fadeUp}
              className={`${work.span} border border-[var(--line)] rounded overflow-hidden flex flex-col`}
              style={{ background: 'var(--surface)' }}
              whileHover={{ y: -3, borderColor: '#FF6B35', boxShadow: '4px 4px 0px #FF6B35', transition: { duration: 0.2 } }}
            >
              <div className="h-[200px] relative overflow-hidden" style={{ background: work.bg }}>
                <div className="absolute inset-0 panel-scan" />
                <span
                  className="absolute top-3 left-3 z-[2] text-[9px] tracking-[0.14em] uppercase border border-[var(--line)] px-[9px] py-[5px] rounded-[3px] text-cream"
                  style={{ background: 'rgba(22,22,22,0.7)' }}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
