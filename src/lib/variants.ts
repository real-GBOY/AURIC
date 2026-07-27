import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'circOut' } },
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: 'circOut' } },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'circOut' } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93, y: 22 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.55, ease: 'circOut' } },
};

export const clipUp: Variants = {
  hidden:  { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)',   transition: { duration: 0.7, ease: 'circOut' } },
};

export const headerStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const gridStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const tightStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const cardHover = {
  y: -4,
  borderColor: '#DCA733',
  boxShadow: '0 16px 32px rgba(220,167,51,0.14)',
  transition: { duration: 0.2 },
};
