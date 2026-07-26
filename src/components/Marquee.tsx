import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <motion.div
      className="marquee-wrap overflow-hidden whitespace-nowrap py-[18px] border-b border-[var(--line)]"
      style={{ background: 'var(--bg-deep)' }}
      aria-hidden="true"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'circOut' }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="inline-flex animate-marquee">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[13px] tracking-[0.2em] uppercase text-cream px-[10px] inline-flex items-center gap-6"
          >
            Web Applications <span className="text-gold">·</span>
            AI Solutions <span className="text-gold">·</span>
            Automation <span className="text-gold">·</span>
            Dashboards <span className="text-gold">·</span>
            API Integrations <span className="text-gold">·</span>
            Digital Strategy <span className="text-gold">·</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </motion.div>
  );
}
