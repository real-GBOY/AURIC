type IconProps = { size?: number; className?: string };

export function WhatsAppIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1.2-1.2 2 1-.6 1.9c-4.6-.1-8.3-3.8-8.4-8.4l1.9-.6 1 2Z" />
    </svg>
  );
}

export function PlayIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#141414" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function CheckIcon({ size = 20, className = '', color = '#dca733' }: IconProps & { color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Gold round play button. */
export function PlayButton({ size = 64, className = '' }: IconProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gold ${className}`}
      style={{ width: size, height: size }}
    >
      <PlayIcon size={Math.round(size * 0.34)} />
    </span>
  );
}
