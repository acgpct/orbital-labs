/*
 * ORBITAL LABS — Solutions section (id="solutions")
 * Renewable energy positioning and buyer profiles. Lifecycle modules live under Platform (#products).
 */
import { useEffect, useRef, useState } from 'react';

const INDUSTRY_BG = '/section-industry-wind-mist.png';
const TURBINE_ACCENT =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/industry-windturbine-DLbFDHqD45SJAcp6avLNva.webp';

const buyerProfiles = [
  {
    label: 'Profile A',
    title: 'Infrastructure funds · portfolio operations',
    who: 'Mid-market infra funds (€1–10B AUM), European energy focus, 5–25 holdings, ~100 MW–2 GW renewables each.',
    buyer: 'Head of Asset Management or Operating Partner',
    velocity: '8–14 weeks',
    tier: 'Tier 3 Managed / Tier 4 Embedded',
    pain: 'Consistent fund-level reporting without hiring data teams in every portfolio company.',
  },
  {
    label: 'Profile B',
    title: 'Mid-size IPPs & developers',
    who: 'IPPs and developers at 200 MW–5 GW — solar, onshore wind, storage, hybrids.',
    buyer: 'COO or CFO, with Head of Asset Management as technical sponsor',
    velocity: '3–6 months',
    tier: 'Tier 2 Application / Tier 3 Managed',
    pain: 'Fragmented spreadsheets and OEM tools — no single view of performance, contracts, or reporting.',
  },
  {
    label: 'Profile C',
    title: 'Large IPPs & listed platforms',
    who: 'Listed or PE-backed IPPs above ~5 GW — strong BI/engineering; we integrate, not replace.',
    buyer: 'CIO or Chief Digital Officer, with COO sponsorship',
    velocity: '6–9 months',
    tier: 'Tier 1 API / Tier 2 Application',
    pain: 'One methodology across geographies; lender-grade packs in days; plugs into existing BI and finance.',
  },
  {
    label: 'Profile D',
    title: 'EPC & owners’ engineers',
    who: 'EPCs and owners’ engineers from design through commissioning and handover.',
    buyer: 'Project Director or Head of Digital Delivery',
    velocity: '4–10 weeks',
    tier: 'Tier 2 Application / Tier 3 Managed',
    pain: 'Clean COD handover — milestones, snags, and as-builts in one auditable thread.',
  },
];

export default function IndustrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeProfile, setActiveProfile] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && contentRef.current) {
        contentRef.current.querySelectorAll('.ind-reveal').forEach((el, i) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, i * 50);
        });
      }
    }, { threshold: 0.06 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const revealStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)',
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#f4f6f8', display: 'flex', alignItems: 'center' }}
    >
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <img
          src={INDUSTRY_BG}
          alt=""
          aria-hidden="true"
          className="h-full w-full"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(249,251,253,0.25)' }} />
        <img
          src={TURBINE_ACCENT}
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '45%',
            maxWidth: '520px',
            height: 'auto',
            maxHeight: '90%',
            objectFit: 'contain',
            objectPosition: 'center right',
            opacity: 0.14,
            zIndex: 0,
          }}
        />
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            height: 'clamp(140px, 22vh, 280px)',
            background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.5) 45%, transparent 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'clamp(200px, 28vh, 360px)',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(249,251,253,0.85) 55%, rgba(249,251,253,0.97) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 w-full container pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(24px, 4vw, 40px)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '12px' }}>
              02 / Solutions — Energy
            </p>
            <h2 className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)', lineHeight: 1.12, letterSpacing: '0.04em', color: '#1e2830', margin: 0 }}>
              Built for energy asset owners.
            </h2>
          </div>
          <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', lineHeight: 1.55, color: '#586879', fontWeight: 300, maxWidth: '420px' }}>
            Lifecycle intelligence from origination to exit — built for renewable portfolios where reporting cost and complexity bite hardest.
          </p>
        </div>

        <div id="solutions-industry" className="scroll-mt-28 ind-reveal mb-12 md:mb-16" style={revealStyle}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '12px' }}>
            Industry · Renewable energy
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', lineHeight: 1.55, color: '#586879', fontWeight: 300, maxWidth: '720px', margin: 0 }}>
            First vertical: owners and operators of solar, onshore wind, storage, and hybrids — data model extends to adjacent classes over time. Replaces fragmented spreadsheets and OEM silos for mid-market players. Phase 1: EU (Poland, Hungary, Romania, Italy, Spain, Germany).
          </p>
        </div>

        <div id="solutions-buyers" className="scroll-mt-28 mb-12">
          <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '16px' }}>
            Who we serve · By company type
          </p>

          <div className="flex flex-wrap gap-0 border-b border-[rgba(88,104,121,0.1)]" style={{ marginBottom: 'clamp(20px, 3vw, 32px)' }}>
            {buyerProfiles.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setActiveProfile(i)}
                className="ind-reveal bg-transparent border-0 cursor-pointer mb-[-1px] pr-5 py-2 transition-colors"
                style={{
                  ...revealStyle,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: activeProfile === i ? '#1e2830' : '#92a4ac',
                  borderBottom: activeProfile === i ? '1px solid #1e2830' : '1px solid transparent',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {buyerProfiles.map((p, i) => (
            <div
              key={p.label}
              className="ind-reveal grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              style={{ display: activeProfile === i ? 'grid' : 'none', ...revealStyle }}
            >
              <div>
                <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', letterSpacing: '0.04em', color: '#1e2830', marginBottom: '12px', lineHeight: 1.25 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.84rem', lineHeight: 1.55, color: '#586879', fontWeight: 300, marginBottom: '16px' }}>
                  {p.who}
                </p>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#586879', lineHeight: 1.5, padding: '16px', background: 'rgba(249,251,253,0.72)', borderLeft: '2px solid rgba(88,104,121,0.2)' }}>
                  <strong style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92a4ac', display: 'block', marginBottom: '6px' }}>Pain point</strong>
                  {p.pain}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Economic buyer', value: p.buyer },
                  { label: 'Procurement velocity', value: p.velocity },
                  { label: 'Recommended tier', value: p.tier },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: '1px solid rgba(88,104,121,0.08)', paddingBottom: '14px' }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c6d1db', marginBottom: '6px' }}>{item.label}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.84rem', color: '#1e2830', fontWeight: 400, margin: 0, lineHeight: 1.45 }}>{item.value}</p>
                  </div>
                ))}
                <a
                  href="#contact"
                  className="self-start transition-all hover:bg-[#1e2830] hover:text-white"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#1e2830',
                    border: '1px solid rgba(88,104,121,0.35)',
                    padding: '11px 24px',
                    textDecoration: 'none',
                    marginTop: '8px',
                  }}
                >
                  Book a demo
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="ind-reveal text-center md:text-left" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#92a4ac' }}>
          <a href="#products" style={{ color: '#586879', textDecoration: 'none', borderBottom: '1px solid rgba(88,104,121,0.25)' }} className="hover:text-[#1e2830]">
            Platform &amp; lifecycle modules →
          </a>
        </p>
      </div>
    </section>
  );
}
