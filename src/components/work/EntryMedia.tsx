import type { Entry } from '../../lib/projects';
import { DesignSlot, Screen, VideoSlot } from '../ui/Media';
import { t } from '../../lib/i18n';

/** Renders the right visual for a portfolio entry (screen, video slot, design tile, reels, terminal). */
export default function EntryMedia({ e, ratio = '4/3', compact = false }: { e: Entry; ratio?: string; compact?: boolean }) {
  switch (e.type) {
    case 'img':
      return <Screen src={e.img!} alt={`${e.name} screen`} ratio={ratio} />;
    case 'video':
      return <VideoSlot ratio={ratio} label={t('Your video', 'فيديو من أعمالك')} playSize={compact ? 44 : 56} radius={8} />;
    case 'design':
      return <DesignSlot ratio={ratio} size={compact ? 46 : 48} className="!rounded-lg !p-[18px]" />;
    case 'reel':
      return (
        <div className="ph flex items-center justify-center gap-[10px] rounded-lg" style={{ aspectRatio: ratio }} role="img" aria-label={t('Placeholder: your content', 'مساحة مؤقتة: محتوى من أعمالك')}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[100px] w-14 rounded-[10px] border-4 border-[#2a2a2e] bg-bg ${i === 1 ? 'mt-6' : ''}`} />
          ))}
          <span className="slot bottom-3 left-[14px]">{t('Your content', 'محتوى من أعمالك')}</span>
        </div>
      );
    case 'term':
      return (
        <div
          className="flex flex-col justify-center rounded-lg border border-[var(--line)] bg-bg p-5 font-mono text-[12px] leading-[1.8] text-muted"
          style={{ aspectRatio: ratio }}
        >
          <div>
            $ <span className="text-cream">npx create-auric</span>
          </div>
          <div className="text-gold">AURIC Core</div>
          <div>Identity · RBAC · Files · Audit</div>
        </div>
      );
  }
}

