import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import { WRAP } from '../lib/data';

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
        <a href="#top" className="font-pixel text-[14px] text-cream flex items-center gap-[10px] shrink-0">
          <span className="w-[11px] h-[11px] bg-gold inline-block rounded-full" />
          Auric
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
          <a href="#" aria-label="LinkedIn" className="text-muted hover:text-gold transition-colors">
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Twitter" className="text-muted hover:text-gold transition-colors">
            <Twitter size={16} strokeWidth={1.5} />
          </a>
        </div>

        <div className="text-[11px] text-muted tracking-[0.1em]">© 2026 Auric</div>
      </div>
    </motion.footer>
  );
}
