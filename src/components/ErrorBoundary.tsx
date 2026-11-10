import { Component, type ReactNode } from 'react';
import { t } from '../lib/i18n';

/** Last line of defence: if a page crashes, show a way back instead of a blank screen. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('AURIC page error:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-cream">
        <h1 className="font-display text-3xl font-extrabold">{t('Something went wrong', 'حدث خطأ ما')}</h1>
        <p className="max-w-md text-cream/70">
          {t('Please reload the page. If it keeps happening, email us and we will fix it fast.', 'يرجى إعادة تحميل الصفحة. إذا تكرر الأمر، راسلنا وسنصلحه بسرعة.')}
        </p>
        <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-gold px-6 py-3 font-semibold text-[#141414]">
          {t('Reload', 'إعادة التحميل')}
        </button>
      </main>
    );
  }
}
