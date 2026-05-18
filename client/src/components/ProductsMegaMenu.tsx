/*
 * ORBITAL LABS — Platform mega-menu (navbar dropdown)
 * Stack surfaces + lifecycle module deep-links (#module-m1 … #module-m7).
 */

import type { ReactNode } from 'react';

const labelStyle =
  "block font-['Space_Mono',monospace] text-[0.52rem] tracking-[0.28em] uppercase text-[#92a4ac] mb-3";
const linkStyle =
  "block font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#1e2830] py-1.5 hover:text-[#586879] transition-colors";
const typeStyle =
  "font-['Space_Mono',monospace] text-[0.5rem] tracking-[0.14em] uppercase text-[#c6d1db]";

const stackItems = [
  { href: '#product-orbital-core', name: 'Orbital Core', type: 'Platform' },
  { href: '#product-orbital-sense', name: 'Orbital Sense', type: 'Intelligence layer' },
  { href: '#product-orbital-adapt', name: 'Orbital Adapt', type: 'Adaptive ML' },
  { href: '#product-orbital-consult', name: 'Orbital Consult', type: 'Professional services' },
] as const;

const moduleItems = [
  { href: '#module-m1', name: 'Pipeline & SPV', id: 'M1' },
  { href: '#module-m2', name: 'Development', id: 'M2' },
  { href: '#module-m3', name: 'Financing', id: 'M3' },
  { href: '#module-m4', name: 'Contracts', id: 'M4' },
  { href: '#module-m5', name: 'Construction & commissioning', id: 'M5' },
  { href: '#module-m6', name: 'Asset management & O&M', id: 'M6' },
  { href: '#module-m7', name: 'Reporting & capital recycling', id: 'M7' },
] as const;

type Props = {
  onNavigate?: () => void;
  variant?: 'dropdown' | 'stacked';
};

export function ProductsMegaMenuPanel({ onNavigate, variant = 'dropdown' }: Props) {
  const wrap =
    variant === 'stacked'
      ? 'flex flex-col gap-10'
      : 'grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-10 px-6 md:px-8 lg:px-12';

  return (
    <div className={wrap}>
      <div className={variant === 'stacked' ? 'w-full' : 'md:col-span-4'}>
        <span className={labelStyle}>Stack</span>
        <nav className="flex flex-col divide-y divide-[rgba(88,104,121,0.1)]" aria-label="Platform stack">
          {stackItems.map((item) => (
            <MegaLink key={item.href} href={item.href} onNavigate={onNavigate} className="block group">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                <span className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#1e2830] group-hover:text-[#586879] transition-colors">
                  {item.name}
                </span>
                <span className={typeStyle}>{item.type}</span>
              </div>
            </MegaLink>
          ))}
        </nav>
      </div>

      <div className={variant === 'stacked' ? 'w-full' : 'md:col-span-4'}>
        <span className={labelStyle}>Modules</span>
        <nav className="flex flex-col divide-y divide-[rgba(88,104,121,0.1)]" aria-label="Lifecycle modules">
          {moduleItems.map((item) => (
            <MegaLink key={item.href} href={item.href} onNavigate={onNavigate} className="block group">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                <span className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#1e2830] group-hover:text-[#586879] transition-colors">
                  {item.name}
                </span>
                <span className={typeStyle}>{item.id}</span>
              </div>
            </MegaLink>
          ))}
        </nav>
        <MegaLink
          href="#products"
          onNavigate={onNavigate}
          className={`${linkStyle} mt-8 inline-block text-[0.72rem] tracking-wide text-[#586879]`}
        >
          Open platform section →
        </MegaLink>
      </div>

      <div
        className={
          variant === 'stacked'
            ? 'w-full rounded-sm p-6'
            : 'md:col-span-4 rounded-sm p-6 md:self-stretch flex flex-col justify-center min-h-[160px]'
        }
        style={{
          background: 'linear-gradient(168deg, #586879 0%, #3d4a56 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <span className="block font-['Space_Mono',monospace] text-[0.52rem] tracking-[0.22em] uppercase text-[rgba(249,251,253,0.55)] mb-4">
          One platform
        </span>
        <p className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#f9fbfd] leading-snug mb-5">
          Four stack surfaces, one model, seven lifecycle modules — from pipeline to exit, without siloed tools.
        </p>
        <MegaLink
          href="#products"
          onNavigate={onNavigate}
          className="font-['Space_Mono',monospace] text-[0.55rem] tracking-[0.2em] uppercase text-[rgba(249,251,253,0.85)] border-b border-[rgba(249,251,253,0.25)] pb-0.5 inline-block hover:text-white"
        >
          View platform
        </MegaLink>
      </div>
    </div>
  );
}

function MegaLink({
  href,
  children,
  onNavigate,
  className,
}: {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a href={href} className={className} onClick={() => onNavigate?.()}>
      {children}
    </a>
  );
}
