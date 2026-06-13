import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { clipUp, tightStagger } from '../lib/variants';
import { STATS_BAR, WRAP } from '../lib/data';

export default function StatsBar() {
  return (
    <section style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--line)' }}>
      <motion.div
        className={`${WRAP} grid grid-cols-2 lg:grid-cols-4`}
        variants={tightStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {STATS_BAR.map((stat) => (
          <motion.div
            key={stat.label}
            variants={clipUp}
            className="text-center border-r border-[var(--line)] last:border-r-0"
            style={{ padding: 'clamp(40px,6vw,72px) 26px' }}
          >
            <div className="text-cream font-semibold leading-none tracking-normal" style={{ fontSize: 'clamp(30px,4.4vw,56px)' }}>
              <CountUp target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted mt-4">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
