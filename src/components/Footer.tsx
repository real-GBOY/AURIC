import { motion } from 'framer-motion';
import { WRAP } from '../lib/data';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'About',    href: '/#about'    },
  { label: 'Work',     href: '/#work'     },
  { label: 'Services', href: '/#services' },
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
        <a href="#top" className="flex items-center shrink-0">
          <Logo size={26} />
        </a>

        <div className="flex items-center gap-[26px] flex-wrap">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] tracking-[0.12em] uppercase text-muted transition-colors hover:text-gold"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="text-[11px] text-muted tracking-[0.1em]">© 2026 Auric</div>
      </div>
    </motion.footer>
  );
}
