import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { AuricMark } from '../components/Logo';
import { CTA_HREF } from '../lib/site';
import { ARROW, t } from '../lib/i18n';
import { EASE, inView, stagger } from '../lib/motion';

const SUGGESTIONS = [
  { label: t('Services', 'الخدمات'), note: t('Create · Strategy · Build · Manage', 'إبداع · استراتيجية · تطوير · إدارة') + ' ' + ARROW, href: '/services' },
  { label: t('Work', 'الأعمال'), note: t('Videos, designs, websites', 'فيديو، تصاميم، مواقع') + ' ' + ARROW, href: '/work' },
  { label: t('Case studies', 'دراسات الحالة'), note: t('Deep dives', 'قراءة معمّقة') + ' ' + ARROW, href: '/case-studies' },
  { label: t('Start a Project', 'ابدأ مشروعك'), note: t('Two-minute brief', 'موجز في دقيقتين') + ' ' + ARROW, href: CTA_HREF },
];

export default function NotFound() {
  return (
    <Layout>
      {/* N1 · 404 with the sun turning in place of the 0 */}
      <section className="overflow-hidden pb-16 pt-14 md:pt-[72px]">
        <div className="wrap flex flex-col items-center gap-9 text-center">
          <span className="lab !text-gold">{t('Error 404 · page not found', 'خطأ 404 · الصفحة غير موجودة')}</span>
          <h1
            aria-label="404"
            className="flex items-center justify-center gap-[0.02em] font-display font-extrabold leading-[.8] tracking-[-0.07em]"
            style={{ fontSize: 'clamp(96px,30vw,440px)' }}
          >
            <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>4</motion.span>
            <motion.span
              aria-hidden="true"
              className="inline-flex h-[.78em] w-[.78em] text-gold"
              initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            >
              <span className="block h-full w-full animate-spin-slower motion-reduce:animate-none">
                <AuricMark size={400} className="h-full w-full" />
              </span>
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}>4</motion.span>
          </h1>
          <motion.p
            className="big max-w-[24ch]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t("This page doesn't exist. Your next project still can.", 'هذه الصفحة غير موجودة. لكن مشروعك القادم يمكن أن يوجد.')}
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <a href="/" className="btn btn-gold">{t('Back to home', 'العودة للرئيسية')}</a>
            <a href="/work" className="btn btn-line">{t('See our work', 'شاهد أعمالنا')}</a>
          </motion.div>
        </div>
      </section>

      {/* N2 · Where people usually go: links slide on hover */}
      <section className="pb-[110px] pt-10">
        <div className="wrap grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
          <span className="lab md:pt-[30px]">{t('Maybe you were looking for', 'ربما كنت تبحث عن')}</span>
          <motion.div className="border-t border-[var(--line)]" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {SUGGESTIONS.map((s) => (
              <motion.a
                key={s.href}
                href={s.href}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ x: 12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-col gap-2 border-b border-[var(--line)] py-6 font-display text-[24px] font-bold tracking-[-0.035em] transition-colors hover:text-gold sm:flex-row sm:items-center sm:justify-between md:text-[30px]"
              >
                <span>{s.label}</span>
                <span className="lab !text-gold">{s.note}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
