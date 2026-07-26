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
          {WORKS.map((work) => {
            const Wrapper = work.href ? motion.a : motion.article;
            return (
              <Wrapper
                key={work.title}
                {...(work.href ? { href: work.href } : {})}
                variants={fadeUp}
                className={`${work.span} border border-[var(--line)] rounded overflow-hidden flex flex-col`}
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
              </Wrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
