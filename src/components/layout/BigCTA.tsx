import type { ReactNode } from 'react';
import { TitleReveal } from '../ui/Reveal';
import { Reveal } from '../ui/Reveal';
import { CTA_HREF } from '../../lib/site';

type Props = {
  lines: ReactNode[];
  text?: string;
  secondary?: { label: string; href: string; external?: boolean };
  dark?: boolean;
  size?: string;
  children?: ReactNode;
};

/** The giant closing call to action used at the bottom of every page. */
export default function BigCTA({ lines, text, secondary, dark = false, size = 'clamp(52px,10vw,150px)', children }: Props) {
  return (
    <section className={`relative overflow-hidden py-[88px] text-left md:py-[150px] md:text-center ${dark ? 'bg-bg' : ''}`}>
      <div className="wrap relative flex flex-col gap-7 md:items-center md:gap-8">
        {children}
        <TitleReveal lines={lines} as="h2" onLoad={false} style={{ fontSize: size }} />
        {text && <p className="copy max-w-[40ch]">{text}</p>}
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center">
          <a href={CTA_HREF} className="btn btn-gold">
            Start a Project
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="btn btn-line"
              target={secondary.external ? '_blank' : undefined}
              rel={secondary.external ? 'noreferrer' : undefined}
            >
              {secondary.label}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
