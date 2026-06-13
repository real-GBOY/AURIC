import { motion } from 'framer-motion';
import SectionHead from './SectionHead';
import { fadeUp, clipUp, gridStagger, cardHover } from '../lib/variants';
import { STEPS, WRAP } from '../lib/data';

export default function Process() {
  return (
    <section id="process" className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
      <div className={WRAP}>
        <SectionHead title="How We Work" tag="[ 04 — PROCESS ]" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--gap)]"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.n}
              variants={fadeUp}
              className="border border-[var(--line)] rounded p-[28px_26px]"
              style={{ background: 'var(--surface)' }}
              whileHover={cardHover}
            >
              <motion.div
                className="text-orange font-semibold leading-none tracking-normal"
                style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}
                variants={clipUp}
              >
                {step.n}
              </motion.div>
              <h3 className="font-pixel text-[10px] text-cream leading-[1.6] my-5">{step.title}</h3>
              <p className="text-[12px] text-muted leading-[1.8]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
