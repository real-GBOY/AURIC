import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WRAP } from '../lib/data';

// href is absolute so links work from any page (/team, /404, etc.)
const NAV_LINKS = [
  { label: 'About',    href: '/#about'    },
  { label: 'Work',     href: '/#work'     },
  { label: 'Services', href: '/#services' },
  { label: 'Team',     href: '/team'      },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        scrolled ? 'border-[var(--line)]' : 'border-transparent'
      }`}
      style={scrolled ? { background: 'rgba(22,22,22,0.88)', backdropFilter: 'blur(12px)' } : {}}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'circOut', delay: 0.1 }}
    >
      <div className={`${WRAP} flex items-center justify-between h-[74px]`}>
        <a href="/" className="font-pixel text-[14px] text-cream flex items-center gap-[10px] shrink-0">
          <span className="w-[11px] h-[11px] bg-orange inline-block" />
          3-300
        </a>

        <div className="hidden md:flex items-center gap-[32px]">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[12px] tracking-[0.12em] uppercase text-muted transition-colors duration-200 hover:text-cream relative group"
            >
              {label}
              <span className="absolute left-0 -bottom-[6px] h-px w-0 bg-orange transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="/#contact"
            className="border border-orange text-cream px-5 py-[11px] rounded text-[11px] tracking-[0.12em] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange hover:text-[#161616]"
          >
            Let's Talk
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-cream block transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`w-6 h-0.5 bg-cream block transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-cream block transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
            className="md:hidden overflow-hidden border-b border-[var(--line)]"
            style={{ background: 'rgba(22,22,22,0.97)', backdropFilter: 'blur(10px)' }}
          >
            <div className="px-[var(--edge)] py-6 flex flex-col">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] tracking-[0.12em] uppercase text-muted py-[14px] border-b border-[var(--line)] hover:text-cream transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href="/#contact"
                className="border border-orange text-cream px-5 py-3 rounded text-[11px] tracking-[0.12em] uppercase mt-4 w-fit hover:bg-orange hover:text-[#161616] transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
