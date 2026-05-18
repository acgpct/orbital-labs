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
    title: 'Infrastructure Fund\nPortfolio Operations',
    who: 'Mid-market infrastructure funds (AUM €1–10B) with active European energy mandates, holding 5–25 portfolio companies, each owning 100 MW–2 GW of renewable capacity.',
    buyer: 'Head of Asset Management or Operating Partner',
    velocity: '8–14 weeks',
    tier: 'Tier 3 Managed / Tier 4 Embedded',
    pain: 'Fund-level reporting discipline across portfolio companies. Unified standard without building data teams at each portfolio company.',
  },
  {
    label: 'Profile B',
    title: 'Mid-Size IPPs\n& Developers',
    who: 'Independent power producers and developers operating 200 MW–5 GW of capacity, primarily renewables (solar, onshore wind), with a growing share of storage and hybrid plants.',
    buyer: 'COO or CFO, with Head of Asset Management as technical sponsor',
    velocity: '3–6 months',
    tier: 'Tier 2 Application / Tier 3 Managed',
    pain: 'Fragmented stack of spreadsheets, OEM monitoring tools, and point applications. No single view of portfolio performance, contracts, and reporting.',
  },
  {
    label: 'Profile C',
    title: 'Large IPPs\n& Listed Platforms',
    who: 'Listed or PE-controlled IPPs with portfolios exceeding 5 GW. Typically have internal BI and engineering capacity that the platform integrates with rather than replaces.',
    buyer: 'CIO or Chief Digital Officer, with COO sponsorship',
    velocity: '6–9 months',
    tier: 'Tier 1 API / Tier 2 Application',
    pain: 'Methodology consistency across geographies. Lender-grade reporting assembled in days. Integration with existing BI and finance systems.',
  },
  {
    label: 'Profile D',
    title: 'EPC & Owners’\nEngineers',
    who: 'Engineering, procurement, and construction firms and independent owners’ engineers delivering renewable projects — from early design through commissioning and handover.',
    buyer: 'Project Director or Head of Digital Delivery',
    velocity: '4–10 weeks',
    tier: 'Tier 2 Application / Tier 3 Managed',
    pain: 'Aligned data and clean handover into owner systems without document chaos at COD — milestones, snags, and as-built packs in one auditable thread.',
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
      style={{ background: '#f4f6f8', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
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

      <div ref={contentRef} className="relative z-10 w-full container py-36">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '20px' }}>
              02 / Solutions — Energy
            </p>
            <h2 className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '0.04em', color: '#1e2830', margin: 0 }}>
              Built for energy<br />asset owners.
            </h2>
          </div>
          <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', lineHeight: 1.8, color: '#586879', fontWeight: 300, maxWidth: '400px' }}>
            Lifecycle intelligence from origination to exit — one operating model in renewable power, where portfolio complexity and reporting burden are highest.
          </p>
        </div>

        <div id="solutions-industry" className="scroll-mt-28 ind-reveal mb-20" style={revealStyle}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '16px' }}>
            Industry
          </p>
          <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '0.04em', color: '#1e2830', marginBottom: '16px' }}>
            Renewable energy
          </h3>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: '#586879', fontWeight: 300, maxWidth: '720px', marginBottom: '16px' }}>
            Our first vertical is owners and operators of renewable generation — solar, onshore wind, storage, and hybrids. The same data model extends to adjacent asset classes over time.
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: '#586879', fontWeight: 300, maxWidth: '720px', marginBottom: 0 }}>
            The platform replaces the fragmented stack of spreadsheets, OEM monitoring tools, and point applications that mid-market IPPs and developers use today. Phase 1 focus: Europe. Geographies live at launch: Poland, Hungary, Romania, Italy, Spain, Germany.
          </p>
        </div>

        <div id="solutions-buyers" className="scroll-mt-28 mb-24">
          <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c6d1db', marginBottom: '12px' }}>
            Who we serve
          </p>
          <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '28px' }}>
            Solutions by company type
          </p>

          <div className="flex flex-wrap gap-0 border-b border-[rgba(88,104,121,0.1)]" style={{ marginBottom: '48px' }}>
            {buyerProfiles.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setActiveProfile(i)}
                className="ind-reveal bg-transparent border-0 cursor-pointer mb-[-1px] pr-6 py-3 transition-colors"
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
              className="ind-reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
              style={{ display: activeProfile === i ? 'grid' : 'none', ...revealStyle }}
            >
              <div>
                <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '0.04em', color: '#1e2830', marginBottom: '20px', whiteSpace: 'pre-line', lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: '#586879', fontWeight: 300, marginBottom: '28px' }}>
                  {p.who}
                </p>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#586879', lineHeight: 1.7, padding: '20px', background: 'rgba(249,251,253,0.72)', borderLeft: '2px solid rgba(88,104,121,0.2)' }}>
                  <strong style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92a4ac', display: 'block', marginBottom: '8px' }}>Pain point</strong>
                  {p.pain}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  { label: 'Economic buyer', value: p.buyer },
                  { label: 'Procurement velocity', value: p.velocity },
                  { label: 'Recommended tier', value: p.tier },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: '1px solid rgba(88,104,121,0.08)', paddingBottom: '20px' }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c6d1db', marginBottom: '8px' }}>{item.label}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#1e2830', fontWeight: 400, margin: 0 }}>{item.value}</p>
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
                    padding: '13px 28px',
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
