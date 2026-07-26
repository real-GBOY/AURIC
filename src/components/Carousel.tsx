import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface Props {
  images: CarouselImage[];
  aspect?: string;
  fit?: 'cover' | 'contain';
}

export default function Carousel({ images, aspect = '16/10', fit = 'cover' }: Props) {
  const [index, setIndex] = useState(0);
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="relative rounded-md overflow-hidden border border-[var(--line)]" style={{ background: 'var(--surface)' }}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        {images.map((img, i) => (
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full pointer-events-none ${fit === 'cover' ? 'object-cover object-top' : 'object-contain'}`}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
            style={{ zIndex: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-[4] w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-cream transition-colors duration-200 hover:border-gold hover:text-gold"
            style={{ background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-cream transition-colors duration-200 hover:border-gold hover:text-gold"
            style={{ background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[4] flex gap-[6px]">
            {images.map((img, i) => (
              <button
                key={img.src}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-[6px] rounded-full transition-all duration-200"
                style={{
                  width: i === index ? '20px' : '6px',
                  background: i === index ? 'var(--gold)' : 'rgba(244,241,232,0.3)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
