import type { CSSProperties, ReactNode } from 'react';
import { PlayButton } from './Icons';
import { t } from '../../lib/i18n';

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
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
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
