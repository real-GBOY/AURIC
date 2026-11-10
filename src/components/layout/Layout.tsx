import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { WhatsAppIcon } from '../ui/Icons';
import { CTA_HREF, whatsappHref } from '../../lib/site';
import { EASE, useScrolledPast } from '../../lib/motion';
import { href, t } from '../../lib/i18n';
import SmoothScroll from '../motion/SmoothScroll';
import ScrollEffects from '../motion/ScrollEffects';
import ScrollScenes from '../motion/ScrollScenes';
import StackSections from '../motion/StackSections';
import PageTransition from '../motion/PageTransition';
import Cursor from '../motion/Cursor';
import ArabicLinks from '../ArabicLinks';

type Props = {
  children: ReactNode;
  /**
   * What phones get at the bottom of the screen:
   * 'dock' — Start a Project + WhatsApp bar that slides up after the hero (M2);
   * 'fab'  — just the round WhatsApp button (used on the Start a Project page).
   */
  mobileCta?: 'dock' | 'fab';
};

export default function Layout({ children, mobileCta = 'dock' }: Props) {
  const past = useScrolledPast();

  return (
    <MotionConfig reducedMotion="user">
      <div className={`min-h-screen bg-ink ${mobileCta === 'dock' ? 'pb-[84px] md:pb-0' : ''}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-[#141414]">
          {t('Skip to content', 'تخطَّ إلى المحتوى')}
        </a>
        <ArabicLinks />
        <SmoothScroll />
        <ScrollEffects />
        <ScrollScenes />
        <StackSections />
        <PageTransition />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* Round WhatsApp button: always on desktop, on phones only where there is no dock */}
        <a
          href={whatsappHref()}
          aria-label={t('Chat with AURIC on WhatsApp', 'تحدث مع أوريك على واتساب')}
          className={`fixed bottom-4 end-4 z-[60] h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-transform hover:scale-105 md:bottom-6 md:end-6 md:flex md:h-[60px] md:w-[60px] ${
            mobileCta === 'fab' ? 'flex' : 'hidden'
          }`}
        >
          <WhatsAppIcon />
        </a>

        {/* M2 · phone dock */}
        {mobileCta === 'dock' && (
          <AnimatePresence>
            {past && (
              <motion.div
                className="fixed inset-x-3 bottom-3 z-50 flex gap-[10px] rounded-[14px] border border-[var(--line)] bg-[rgba(18,18,20,.94)] p-2 backdrop-blur md:hidden"
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 90, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <a href={href(CTA_HREF)} className="btn btn-gold !min-h-12 flex-1 !rounded-md !text-[15px] !font-semibold">
                  {t('Start a Project', 'ابدأ مشروعك')}
                </a>
                <a
                  href={whatsappHref()}
                  aria-label="Chat with AURIC on WhatsApp"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-whatsapp text-ink"
                >
                  <WhatsAppIcon />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </MotionConfig>
  );
}
