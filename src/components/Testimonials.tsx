import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHead from './SectionHead';
import { fadeLeft, fadeRight, headerStagger, cardHover } from '../lib/variants';
import { QUOTES, WRAP } from '../lib/data';

export default function Testimonials() {
  return (
    <section id="clients" className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
      <div className={WRAP}>
        <SectionHead title="What Clients Say" tag="[ 05 — PROOF ]" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap)]"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {QUOTES.map((q, i) => (
            <motion.div
              key={q.name}
              variants={i === 0 ? fadeLeft : fadeRight}
              className="border border-[var(--line)] rounded p-[36px_32px] flex flex-col justify-between gap-6"
              style={{ background: 'var(--surface)' }}
              whileHover={cardHover}
            >
              <div>
                <Quote size={22} className="text-orange mb-[18px]" strokeWidth={1.5} />
                <p className="italic text-[15px] text-cream leading-[1.9]">{q.q}</p>
              </div>
              <div className="flex items-center gap-[14px]">
                <div
                  className="w-10 h-10 rounded-full border border-cream flex items-center justify-center text-[11px] text-cream shrink-0"
                  style={{ background: 'var(--surface-2)' }}
                >
                  {q.init}
                </div>
                <div>
                  <div className="text-[12px] tracking-[0.14em] uppercase text-cream">{q.name}</div>
                  <div className="text-[11px] text-muted uppercase tracking-[0.1em]">{q.co}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
