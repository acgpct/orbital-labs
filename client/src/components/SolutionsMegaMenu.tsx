/*
 * ORBITAL LABS — Solutions mega-menu (desktop dropdown + mobile accordion)
 * Industry & buyers only; lifecycle modules are under Platform (#products).
 */

import type { ReactNode } from 'react';

const labelStyle = "block font-['Space_Mono',monospace] text-[0.52rem] tracking-[0.28em] uppercase text-[#92a4ac] mb-3";
const linkStyle =
  "block font-['Space_Grotesk',sans-serif] text-[0.82rem] text-[#1e2830] py-1.5 hover:text-[#586879] transition-colors";

type Props = {
  onNavigate?: () => void;
  variant?: 'dropdown' | 'stacked';
};

export function SolutionsMegaMenuPanel({ onNavigate, variant = 'dropdown' }: Props) {
  const wrap = variant === 'stacked' ? 'flex flex-col gap-8' : 'grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-10 px-6 md:px-8 lg:px-12';
  const col = variant === 'stacked' ? 'w-full' : 'md:col-span-6';

  return (
    <div className={wrap}>
      <div className={col}>
        <span className={labelStyle}>Industry — renewable energy</span>
        <nav className="flex flex-col gap-0.5" aria-label="Industries and buyer types">
          <MegaLink href="#solutions-industry" onNavigate={onNavigate} className={linkStyle}>
            Overview
          </MegaLink>
          <MegaLink href="#solutions-buyers" onNavigate={onNavigate} className={linkStyle}>
            Infrastructure fund portfolios
          </MegaLink>
          <MegaLink href="#solutions-buyers" onNavigate={onNavigate} className={linkStyle}>
            Mid-size IPPs &amp; developers
          </MegaLink>
          <MegaLink href="#solutions-buyers" onNavigate={onNavigate} className={linkStyle}>
            Large IPPs &amp; listed platforms
          </MegaLink>
          <MegaLink href="#solutions-buyers" onNavigate={onNavigate} className={linkStyle}>
            EPC &amp; owners&apos; engineers
          </MegaLink>
        </nav>
        <MegaLink href="#products" onNavigate={onNavigate} className={`${linkStyle} mt-8 inline-block text-[0.72rem] tracking-wide text-[#586879]`}>
          Platform &amp; modules →
        </MegaLink>
      </div>

      <div
        className={
          variant === 'stacked'
            ? 'w-full rounded-sm p-6'
            : 'md:col-span-6 rounded-sm p-6 md:self-stretch flex flex-col justify-center min-h-[160px]'
        }
        style={{
          background: 'linear-gradient(165deg, #586879 0%, #3d4a56 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <span className="block font-['Space_Mono',monospace] text-[0.52rem] tracking-[0.22em] uppercase text-[rgba(249,251,253,0.55)] mb-5">
          Operating system lens
        </span>
        <ul className="flex flex-col gap-3 font-['Space_Grotesk',sans-serif] text-[0.78rem] text-[#f9fbfd] leading-snug">
          <li className="border-b border-[rgba(249,251,253,0.12)] pb-3">One SPV-to-asset system of record for diligence.</li>
          <li className="border-b border-[rgba(249,251,253,0.12)] pb-3">Dev, build, and ops on one model — no re-keying.</li>
          <li className="border-b border-[rgba(249,251,253,0.12)] pb-3">Lender- and board-ready reporting from live data.</li>
          <li className="pt-0.5">Post-COD variance, settlement, and O&amp;M in one workflow layer.</li>
        </ul>
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
    <a
      href={href}
      className={className}
      onClick={() => onNavigate?.()}
    >
      {children}
    </a>
  );
}
