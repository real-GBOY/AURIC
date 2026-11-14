import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { PlayButton } from './Icons';
import { t } from '../../lib/i18n';

export type Film = { src: string; teaser: string; poster: string; title: string };

/** Full-screen player with sound and controls. Esc, the close button or the backdrop closes it. */
export function FilmPlayer({ film, vertical, onClose }: { film: Film; vertical: boolean; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const back = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      lenis?.start();
      back?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={film.title} className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(10,10,11,.94)] p-4 md:p-10" onClick={onClose}>
      <button
        ref={close}
        type="button"
        onClick={onClose}
        aria-label={t('Close video', 'إغلاق الفيديو')}
        className="absolute end-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] text-[22px] text-cream transition-colors hover:border-gold hover:text-gold md:end-8 md:top-8"
      >
        ×
      </button>
      <video
        src={film.src}
        poster={film.poster}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className={`rounded-[10px] bg-black ${vertical ? 'h-[min(86vh,1100px)] w-auto max-w-full' : 'max-h-[86vh] w-[min(92vw,1600px)]'}`}
        style={{ aspectRatio: vertical ? '9/16' : '16/9' }}
      />
    </div>,
    document.body,
  );
}

/**
 * Real video work on a card: a silent looping teaser with a play button; clicking opens
 * the full video with sound. Renders a <button>, so don't nest it inside a link.
 */
export function PlayableVideo({
  film,
  ratio = '16/9',
  vertical = false,
  playSize = 64,
  radius = 12,
  className = '',
  style,
}: {
  film: Film;
  ratio?: string;
  vertical?: boolean;
  playSize?: number;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const closePlayer = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t('Play', 'شغّل')}: ${film.title}`}
        data-cursor="view"
        className={`group relative block w-full overflow-hidden bg-black text-start ${className}`}
        style={{ aspectRatio: ratio, borderRadius: radius, ...style }}
      >
        <LoopVideo src={film.teaser} poster={film.poster} label={film.title} className="transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,11,.55)] via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          <PlayButton size={playSize} />
        </span>
      </button>
      {open && <FilmPlayer film={film} vertical={vertical} onClose={closePlayer} />}
    </>
  );
}

/**
 * A silent looping video that only plays while it is on screen (saves battery and data),
 * and stays on its poster frame for visitors who prefer reduced motion.
 */
export function LoopVideo({ src, poster, label, className = '' }: { src: string; poster?: string; label?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="metadata"
      aria-label={label}
    />
  );
}

/**
 * A card preview for real work: the image, with a silent teaser looping over it when the
 * work is a film or reel. Safe inside links (no buttons).
 */
export function WorkPreview({
  img,
  teaser,
  alt,
  ratio,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  className = '',
  imgClassName = 'object-cover object-top',
  play = false,
}: {
  img: string;
  teaser?: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Show a play badge (for films and reels). */
  play?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Photo src={img} alt={alt} sizes={sizes} className={`absolute inset-0 h-full w-full ${imgClassName}`} />
      {teaser && <LoopVideo src={teaser} label={alt} />}
      {play && <PlayButton size={52} className="absolute bottom-4 start-4" />}
    </div>
  );
}

type VideoSlotProps = {
  /** Aspect ratio, e.g. '21/9'. */
  ratio?: string;
  /** Label shown in the corner so the placeholder is honest about what goes there. */
  label?: string;
  /** Optional real video. When set it autoplays muted and loops (showreels, clips). */
  src?: string;
  poster?: string;
  playSize?: number;
  radius?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * A video slot. Shows the real video when `src` is given, otherwise a striped
 * placeholder with a play button and a label saying what belongs there.
 */
export function VideoSlot({
  ratio = '16/9',
  label = t('Your video', 'فيديو من أعمالك'),
  src,
  poster,
  playSize = 64,
  radius = 12,
  className = '',
  style,
  children,
}: VideoSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
        <LoopVideo src={src} poster={poster} label={label} />
        {children}
      </div>
    );
  }
  return (
    <div
      className={`ph flex items-center justify-center ${className}`}
      style={{ aspectRatio: ratio, borderRadius: radius, ...style }}
      role="img"
      aria-label={`${t('Placeholder', 'مساحة مؤقتة')}: ${label}`}
    >
      <PlayButton size={playSize} />
      <span className="slot bottom-[14px] left-4">{label}</span>
      {children}
    </div>
  );
}

const RESPONSIVE = /^(\/work\/.+)\.(png|jpe?g)$/i;

/**
 * A project screenshot served as responsive WebP (800w and 1600w, made by `npm run images`)
 * with the original file as the fallback. Other images are rendered as a plain <img>.
 */
export function Photo({
  src,
  alt,
  className,
  style,
  // Safe default: assume the image can be shown full width (never blurry); small images override it.
  sizes = '(min-width: 1500px) 1480px, 100vw',
  eager = false,
  ...rest
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  eager?: boolean;
} & Record<`data-${string}`, string | undefined>) {
  const m = RESPONSIVE.exec(src);
  const img = (
    <img src={src} alt={alt} className={className} style={style} loading={eager ? 'eager' : 'lazy'} decoding="async" {...rest} />
  );
  if (!m) return img;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={`${m[1]}-800.avif 800w, ${m[1]}-1600.avif 1600w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${m[1]}-800.webp 800w, ${m[1]}-1600.webp 1600w`} sizes={sizes} />
      {img}
    </picture>
  );
}

type ScreenProps = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;
  /** How wide the image is shown, for picking the right file size. */
  sizes?: string;
  /** Show the browser bar on top. Off for phone screens. */
  bar?: boolean;
  radius?: number;
};

/** A real product screenshot inside a browser frame. */
export function Screen({ src, alt, ratio, className = '', style, imgClassName = '', sizes, bar = true, radius }: ScreenProps) {
  return (
    <div className={`frame ${className}`} style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
      {bar && (
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}
      <Photo
        src={src}
        alt={alt}
        sizes={sizes}
        className={`w-full object-cover object-left-top ${imgClassName}`}
        style={{ height: bar ? 'calc(100% - 28px)' : '100%' }}
      />
    </div>
  );
}

/** Cream "Aa" tile standing in for a design piece. */
export function DesignSlot({
  ratio = '4/5',
  label = t('Your design', 'تصميمك هنا'),
  size = 80,
  className = '',
  style,
}: {
  ratio?: string;
  label?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-[10px] bg-cream p-[22px] text-[#141414] ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={`${t('Placeholder', 'مساحة مؤقتة')}: ${label}`}
    >
      <span className="font-display font-extrabold leading-[.9] tracking-[-0.05em]" style={{ fontSize: size }}>
        Aa
      </span>
      <span className="lab !text-gold-deep">{label}</span>
    </div>
  );
}

/** Vertical reel inside a phone-like frame. */
export function ReelSlot({ label, className = '', radius = 22 }: { label?: string; className?: string; radius?: number }) {
  return (
    <div
      className={`ph flex items-center justify-center ${className}`}
      style={{ aspectRatio: '9/16', borderRadius: radius, border: '6px solid #202023' }}
      role="img"
      aria-label={`${t('Placeholder', 'مساحة مؤقتة')}: ${label ?? t('Your reel', 'ريل من أعمالك')}`}
    >
      <PlayButton size={48} />
    </div>
  );
}
