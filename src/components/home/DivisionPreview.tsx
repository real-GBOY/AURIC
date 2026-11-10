import { motion } from 'framer-motion';
import type { DivisionKey } from '../../lib/content';
import { PlayButton } from '../ui/Icons';
import { Screen } from '../ui/Media';

const CAL = ['g', 'd', 'c', 'd', 'g', 'd', 'c', 'd', 'g', 'd', 'g', 'd', 'd', 'c', 'd', 'd', 'c', 'g', 'd', 'd'];
const calColor = (k: string) => (k === 'g' ? '#dca733' : k === 'c' ? '#f4f1e8' : '#2a2a2e');
const BARS = [30, 75, 50, 95, 40, 85, 60, 30, 70];

/** The visual shown for each division (desktop sticky preview and phone accordion). */
export default function DivisionPreview({ k, compact = false }: { k: DivisionKey; compact?: boolean }) {
  const box = compact ? 'h-[150px] rounded-[10px]' : 'aspect-[4/5] rounded-[10px]';

  if (k === 'create') {
    return compact ? (
      <div className={`${box} grid grid-cols-[2fr_1fr] gap-2 bg-cream p-[10px]`}>
        <div className="flex items-center justify-center rounded-md bg-[#141414]">
          <PlayButton size={38} />
        </div>
        <div className="flex items-end rounded-md bg-gold p-2">
          <span className="font-display text-[26px] font-extrabold text-[#141414]">Aa</span>
        </div>
      </div>
    ) : (
      <div className={`${box} grid grid-cols-2 grid-rows-[2fr_1fr_1fr] gap-[10px] bg-cream p-4`}>
        <div className="relative col-span-2 flex items-center justify-center rounded-md bg-[#141414]">
          <PlayButton size={52} />
          <span className="slot bottom-[10px] left-3">Video</span>
        </div>
        <div className="flex items-end rounded-md bg-gold p-[10px]">
          <span className="font-display text-[32px] font-extrabold text-[#141414]">Aa</span>
        </div>
        <div className="rounded-md bg-sand" />
        <div className="col-span-2 flex items-center gap-[3px] rounded-md bg-[#141414] px-[14px]" aria-hidden="true">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 bg-gold"
              initial={{ height: '20%' }}
              animate={{ height: [`${h}%`, `${Math.max(20, 100 - h)}%`, `${h}%`] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (k === 'strategy') {
    const cells = compact ? CAL.slice(0, 14) : CAL;
    return (
      <div
        className={`${box} grid gap-2 bg-surface ${compact ? 'grid-cols-7 p-[14px]' : 'grid-cols-5 p-7'}`}
        style={{ gridAutoRows: 'minmax(0,1fr)' }}
        aria-hidden="true"
      >
        {cells.map((c, i) => (
          <motion.span
            key={i}
            className="rounded"
            style={{ background: calColor(c) }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          />
        ))}
      </div>
    );
  }

  if (k === 'build') {
    return (
      <div className={`${box} relative overflow-hidden bg-bg`}>
        <motion.div
          className={`absolute ${compact ? 'left-3 top-[14px] h-[76%] w-[78%]' : 'left-5 top-7 h-[52%] w-[84%]'}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Screen src="/work/atlas/dashboard.png" alt="Atlas dashboard" className="h-full" />
        </motion.div>
        <motion.div
          className={`absolute ${compact ? 'bottom-[10px] right-3 h-[80%] w-[26%]' : 'bottom-6 right-5 h-[52%] w-[40%]'}`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <Screen src="/work/nova/mobile-home.jpg" alt="Nova mobile app" bar={false} radius={compact ? 12 : 18} className="h-full" />
        </motion.div>
      </div>
    );
  }

  const rows = compact ? ['Brief agreed', 'Reviewed by AURIC'] : ['Brief agreed', 'Team assigned', 'Reviewed by AURIC'];
  return (
    <div className={`${box} flex flex-col justify-center bg-surface ${compact ? 'gap-3 p-[18px]' : 'gap-[26px] p-9'}`}>
      {rows.map((r, i) => (
        <motion.div
          key={r}
          className={`flex items-center gap-3 ${compact ? 'text-[15px]' : 'text-[18px]'}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <span className={`rounded-full bg-cream ${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {r}
        </motion.div>
      ))}
      <motion.div
        className={`flex items-center gap-3 text-gold ${compact ? 'text-[15px]' : 'text-[18px]'}`}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rows.length * 0.15 }}
      >
        <span className={`rotate-45 bg-gold ${compact ? 'h-3 w-3' : 'h-[18px] w-[18px]'}`} />
        Delivered
      </motion.div>
    </div>
  );
}
