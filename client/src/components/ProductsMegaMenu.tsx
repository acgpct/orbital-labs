/*
 * ORBITAL LABS — Platform mega-menu (navbar dropdown)
 * Stack tiers (API / Platform / Embedded) + lifecycle capability deep-links (#module-m1 … #module-m6).
 */

import type { ReactNode } from 'react';
import { Link } from 'wouter';

const labelStyle =
  "block font-['Space_Mono',monospace] text-[0.52rem] tracking-[0.28em] uppercase text-[#92a4ac] mb-3";
const linkStyle =
  "block font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#1e2830] py-1.5 hover:text-[#586879] transition-colors";
const typeStyle =
  "font-['Space_Mono',monospace] text-[0.5rem] tracking-[0.14em] uppercase text-[#c6d1db]";

const stackItems = [
  { href: '#product-api', name: 'API', type: 'Integrate' },
  { href: '#product-platform', name: 'Platform', type: 'Use' },
  { href: '#product-embedded', name: 'Embedded', type: 'Roll out' },
] as const;

const lifecycleItems = [
  { href: '#module-m1', name: 'Pipeline & SPV', id: 'M1' },
  { href: '#module-m2', name: 'Development', id: 'M2' },
  { href: '#module-m3', name: 'Contracts', id: 'M3' },
  { href: '#module-m4', name: 'Construction & commissioning', id: 'M4' },
  { href: '#module-m5', name: 'Asset management & O&M', id: 'M5' },
  { href: '#module-m6', name: 'Reporting & disclosures', id: 'M6' },
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
        <span className={labelStyle}>Lifecycle</span>
        <nav className="flex flex-col divide-y divide-[rgba(88,104,121,0.1)]" aria-label="Lifecycle capabilities">
          {lifecycleItems.map((item) => (
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
          className={`${linkStyle} mt-6 inline-block text-[0.72rem] tracking-wide text-[#586879]`}
        >
          Open platform section →
        </MegaLink>
      </div>

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
          Portfolio OS
        </span>
        <p className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#f9fbfd] leading-snug mb-5">
          One graph and runtime across origination → build → operate → reporting — renewables-native, without a shelf of disjoint tools.
        </p>
        <MegaLink
          href="/platform/architecture"
          onNavigate={onNavigate}
          className="font-['Space_Mono',monospace] text-[0.55rem] tracking-[0.2em] uppercase text-[rgba(249,251,253,0.85)] border-b border-[rgba(249,251,253,0.25)] pb-0.5 inline-block hover:text-white"
        >
          Platform architecture
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
  const handleClick = () => onNavigate?.();

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
