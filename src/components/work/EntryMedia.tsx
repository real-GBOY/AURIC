import type { Entry } from '../../lib/projects';
import { Screen, WorkPreview } from '../ui/Media';

/** Renders the right visual for a portfolio entry (product screen, film or reel teaser, design piece, terminal). */
export default function EntryMedia({ e, ratio = '4/3' }: { e: Entry; ratio?: string; compact?: boolean }) {
  switch (e.type) {
    case 'img':
      return <Screen src={e.img!} alt={`${e.name} screen`} ratio={ratio} sizes="(min-width: 1024px) 25vw, 50vw" />;
    case 'video':
    case 'reel':
    case 'design':
      return (
        <WorkPreview
          img={e.img!}
          teaser={e.teaser}
          alt={`${e.name}, ${e.services}`}
          ratio={ratio}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="rounded-lg"
          imgClassName={e.type === 'design' ? 'object-cover object-top' : 'object-cover'}
          play={e.type !== 'design'}
        />
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
