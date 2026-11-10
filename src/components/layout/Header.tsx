import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import { WhatsAppIcon } from '../ui/Icons';
import { CTA_HREF, NAV, PAGES, SOCIALS, whatsappHref } from '../../lib/site';
import { EASE } from '../../lib/motion';
import { href, isAr, otherLangHref, t } from '../../lib/i18n';

const path = (typeof window !== 'undefined' ? window.location.pathname : '/').replace(/^\/ar(?=\/|$)/, '') || '/';
const isActive = (href: string) =>
  href === '/'
    ? path === '/'
    : path === href || path.startsWith(href + '/');

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the full-screen menu is open; close it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-[var(--line)] bg-ink/90 backdrop-blur-md' : 'border-[rgba(244,241,232,.1)] bg-ink'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[74px]">
        <a href={href('/')} aria-label="AURIC home" className="flex min-h-11 items-center">
          <Logo size={26} />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`tap text-[15px] font-medium transition-colors hover:text-gold ${isActive(item.href) ? 'text-gold' : ''}`}
            >
              {t(item.label, item.ar)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[10px]">
          <a
            href={otherLangHref()}
            lang={isAr ? 'en' : 'ar'}
            className="lab tap min-w-11 justify-center px-1 !text-[12px] !text-cream transition-colors hover:!text-gold"
            aria-label={isAr ? 'English version' : 'النسخة العربية'}
          >
            {isAr ? 'EN' : 'عربي'}
          </a>
          <a href={href(CTA_HREF)} className="btn btn-gold hidden !min-h-[42px] !px-[18px] !text-[14px] lg:inline-flex">
            {t('Start a Project', 'ابدأ مشروعك')}
          </a>

          {/* M1 · phone menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('Close menu', 'إغلاق القائمة') : t('Open menu', 'فتح القائمة')}
            aria-expanded={open}
            aria-controls="phone-menu"
            className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors lg:hidden ${
              open ? 'border-gold bg-gold text-[#141414]' : 'border-[var(--line-strong)]'
            }`}
          >
            {open ? (
              <span className="text-[22px] leading-none">×</span>
            ) : (
              <>
                <span className="block h-[2px] w-[18px] bg-cream" />
                <span className="block h-[2px] w-[18px] bg-gold" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* M1 · full-screen phone menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="phone-menu"
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 top-16 z-40 md:top-[74px] flex flex-col overflow-y-auto bg-ink px-5 pb-7 pt-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
              {PAGES.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: isAr ? 24 : -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } } }}
                  className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-2 border-b border-[rgba(244,241,232,.1)] py-[14px]"
                >
                  <span className="lab !text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <b className={`font-display text-[40px] font-extrabold leading-none tracking-[-0.045em] ${isActive(item.href) ? 'text-gold' : ''}`}>
                    {t(item.label, item.ar)}
                  </b>
                </motion.a>
              ))}
            </motion.div>

            <div className="mt-auto flex flex-col gap-[10px] pt-8">
              <a href={href(CTA_HREF)} className="btn btn-gold w-full !min-h-[54px] !text-[16px] !font-semibold">
                {t('Start a Project', 'ابدأ مشروعك')}
              </a>
              <a href={whatsappHref()} className="btn w-full !min-h-[54px] bg-whatsapp !text-[16px] !font-semibold text-ink">
                <WhatsAppIcon /> {t('Chat on WhatsApp', 'تحدث معنا على واتساب')}
              </a>
              <div className="mt-3 flex justify-between">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href || '#'} className="lab tap !text-cream">
                    {t(s.label, s.ar)}
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
