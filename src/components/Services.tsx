import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHead from './SectionHead';
import { scaleIn, gridStagger, cardHover } from '../lib/variants';
import { SERVICES, WRAP } from '../lib/data';

export default function Services() {
  return (
    <section id="services" className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,120px) 0' }}>
      <div className={WRAP}>
        <SectionHead title="What We Do" tag="[ 02 — SERVICES ]" />
        <p className="text-muted text-[14px] leading-[1.9] max-w-[62ch] -mt-6 mb-10">
          We partner with startups, growing businesses and established companies to design, build and optimize digital solutions that drive measurable business outcomes.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--gap)]"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SERVICES.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="border border-[var(--line)] rounded p-[30px_28px] group flex flex-col"
              style={{ background: 'var(--surface)' }}
              whileHover={cardHover}
            >
              <motion.div
                className="w-[48px] h-[48px] border border-[var(--line)] rounded flex items-center justify-center text-gold mb-[24px] shrink-0 transition-all duration-200 group-hover:border-gold group-hover:bg-[rgba(198,164,85,0.08)]"
                whileHover={{ rotate: 8, scale: 1.1, transition: { duration: 0.2 } }}
              >
                <Icon size={20} strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-pixel text-[11px] text-cream leading-[1.6] mb-[14px]">{title}</h3>
              <p className="text-[13px] text-muted leading-[1.85] mb-5 flex-1">{desc}</p>
              <a href="#contact" className="text-[12px] tracking-[0.1em] uppercase text-cream inline-flex items-center gap-2 group-hover:text-gold transition-colors">
                Explore <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
