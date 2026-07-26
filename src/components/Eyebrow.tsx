interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <span className={`text-[11px] tracking-[0.28em] uppercase text-muted inline-flex items-center gap-[10px] font-mono ${className}`}>
      <span className="w-[22px] h-px bg-gold inline-block shrink-0" />
      {children}
    </span>
  );
}
