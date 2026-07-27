// Radiant-sun mark ("aumark") from the Auric identity — 12 alternating rays
// (long/short) around a solid core, evenly spaced 30° apart.
const RAY_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30);

export function AuricMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {RAY_ANGLES.map((deg, i) => {
        const short = i % 2 === 1;
        const w = short ? 4.5 : 5.8;
        const h = short ? 9 : 14;
        const y = short ? 5.1 : 1.3;
        return (
          <rect
            key={deg}
            x={32 - w / 2}
            y={y}
            width={w}
            height={h}
            rx={1.2}
            transform={`rotate(${deg} 32 32)`}
          />
        );
      })}
      <circle cx="32" cy="32" r="10.2" />
    </svg>
  );
}

type LogoProps = {
  size?: number;
  className?: string;
  wordClassName?: string;
  gap?: number;
  showWord?: boolean;
};

export default function Logo({
  size = 28,
  className = '',
  wordClassName = 'text-[14px]',
  gap = 10,
  showWord = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center shrink-0 ${className}`} style={{ gap }}>
      <AuricMark size={size} className="text-gold shrink-0" />
      {showWord && (
        <span className={`font-pixel text-cream ${wordClassName}`}>
          A<span className="text-gold">U</span>RIC
        </span>
      )}
    </span>
  );
}
