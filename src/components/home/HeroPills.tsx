import { motion } from 'framer-motion';
import { CheckIcon } from '../ui/Icons';

// The four media pills that sit inside the hero headline (one per division).
// `size="lg"` is the desktop in-line pill, `size="sm"` the phone row under the headline.

const lg = 'relative inline-flex shrink-0 overflow-hidden rounded-full h-[clamp(52px,7.6vw,116px)] w-[clamp(120px,18vw,270px)]';
const sm = 'relative flex h-[46px] flex-1 overflow-hidden rounded-full';

type Size = 'lg' | 'sm';

export function TimelinePill({ size = 'lg' }: { size?: Size }) {
  return (
    <span
      className={`${size === 'lg' ? lg : sm} items-center gap-[6px] border border-[rgba(244,241,232,.14)] bg-surface ${size === 'lg' ? 'px-[18px]' : 'gap-1 px-3'}`}
      title="Editing timeline"
      aria-hidden="true"
    >
      <span className="h-[58%] flex-[1.2] rounded-lg bg-cream" />
      <span className="h-[58%] flex-[.8] rounded-lg bg-gold" />
      <span className="h-[58%] flex-1 rounded-lg bg-charcoal" />
      {size === 'lg' && <span className="h-[58%] flex-[.6] rounded-lg bg-cream" />}
      {size === 'lg' && (
        <motion.span
          className="absolute bottom-[14%] top-[8%] w-[3px] rounded-sm bg-gold"
          initial={{ left: '18%' }}
          animate={{ left: ['18%', '82%', '18%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute -left-[6px] -top-[2px] h-[15px] w-[15px] rounded-full bg-gold" />
        </motion.span>
      )}
    </span>
  );
}

const ROW_A = ['g', 's', 'k', 's', 'g', 's', 'k'];
const ROW_B = ['s', 'k', 's', 'g', 's', 'g', 's'];
const cal = (c: string) => (c === 'g' ? 'bg-gold' : c === 'k' ? 'bg-[#141414]' : 'bg-sand');

export function CalendarPill({ size = 'lg' }: { size?: Size }) {
  const n = size === 'lg' ? 7 : 4;
  return (
    <span
      className={`${size === 'lg' ? lg : sm} flex-col justify-center bg-cream ${size === 'lg' ? 'gap-[6px] px-6' : 'gap-1 px-3'}`}
      title="Content calendar"
      aria-hidden="true"
    >
      {[ROW_A, ROW_B].map((row, r) => (
        <span key={r} className={`flex h-[24%] ${size === 'lg' ? 'gap-[6px]' : 'gap-[3px]'}`}>
          {row.slice(0, n).map((c, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded ${cal(c)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + (r * n + i) * 0.05 }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}

export function CodePill({ size = 'lg' }: { size?: Size }) {
  return (
    <span
      className={`${size === 'lg' ? lg : sm} items-center justify-center gap-[10px] border border-[rgba(244,241,232,.2)] bg-ink`}
      title="Code"
      aria-hidden="true"
    >
      <span
        className="font-mono font-medium tracking-[-0.02em] text-gold"
        style={{ fontSize: size === 'lg' ? 'clamp(22px,3.2vw,46px)' : 20 }}
      >
        &lt;/&gt;
      </span>
      {size === 'lg' && (
        <motion.span
          className="h-1/2 w-[clamp(8px,1vw,14px)] rounded-sm bg-cream"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      )}
    </span>
  );
}

export function DeliveredPill({ size = 'lg' }: { size?: Size }) {
  const dot = size === 'lg' ? 'h-[clamp(34px,4.4vw,64px)] w-[clamp(34px,4.4vw,64px)]' : 'h-[30px] w-[30px]';
  return (
    <span
      className={`${size === 'lg' ? lg : sm} items-center bg-gold ${size === 'lg' ? 'gap-[14px] px-5' : 'justify-center'}`}
      title="Delivered"
      aria-hidden="true"
    >
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-[#141414] ${dot}`}>
        <CheckIcon size={size === 'lg' ? 28 : 16} className="h-[55%] w-[55%]" />
      </span>
      {size === 'lg' && (
        <motion.span
          className="h-[22%] flex-1 origin-left rounded-full bg-[#141414]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </span>
  );
}
