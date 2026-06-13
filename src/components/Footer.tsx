import { motion } from 'framer-motion';
import { Instagram, Dribbble } from 'lucide-react';
import { WRAP } from '../lib/data';

const NAV_LINKS = [
  { label: 'About',    href: '/#about'    },
  { label: 'Work',     href: '/#work'     },
  { label: 'Services', href: '/#services' },
  { label: 'Team',     href: '/team'      },
  { label: 'Contact',  href: '/#contact'  },
];

export default function Footer() {
  return (
    <motion.footer
      className="py-9 border-t border-[var(--line)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'circOut' }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className={`${WRAP} flex items-center justify-between gap-5 flex-wrap`}>
        <a href="#top" className="font-pixel text-[14px] text-cream flex items-center gap-[10px] shrink-0">
          <span className="w-[11px] h-[11px] bg-orange inline-block" />
          3-300
        </a>

        <div className="flex items-center gap-[26px] flex-wrap">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] tracking-[0.12em] uppercase text-muted transition-colors hover:text-orange"
            >
              {label}
            </a>
          ))}
          <a href="#" aria-label="Instagram" className="text-muted hover:text-orange transition-colors">
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Dribbble" className="text-muted hover:text-orange transition-colors">
            <Dribbble size={16} strokeWidth={1.5} />
          </a>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="text-[11px] text-muted tracking-[0.1em]">© 2025 3-300</div>
          <div className="text-[10px] tracking-[0.14em] uppercase text-muted">
            Developed by <span className="text-orange">JINX</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
