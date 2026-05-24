/*
 * ORBITAL LABS — Platform section (id="products")
 * OS narrative: Stack (API · platform · embedded) | Lifecycle phases.
 */
import { useEffect, useRef, useState } from 'react';
import {
  cssPlatformTopVeil,
  cssSectionVeilBottom,
  HANDOFF,
} from '@shared/hero-about-handoff';

export type PlatformTab = 'stack' | 'modules';

/** Ethereal cloud / fog — atmospheric background for Platform */
const PLATFORM_FOG_BG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/section-products-fog-ArHtnXcUB5SzEfUrXuYYid.webp';

const lifecycleCapabilities = [
  {
    id: 'M1',
    step: '01',
    phase: 'Originate',
    title: 'Pipeline & SPV',
    tagline: 'Portfolio graph from deal idea to SPV-ready.',
    description:
      'Stage gates, capital allocation, deal workflow, SPV composition and ownership — one graph instead of separate pipeline spreadsheets.',
    tags: ['Pipeline management', 'SPV lifecycle', 'Capital allocation', 'Deal workflow'],
  },
  {
    id: 'M2',
    step: '02',
    phase: 'Develop',
    title: 'Development',
    tagline: 'Land rights, permits, grid — one place.',
    description:
      'Land options, permit register with lapse alerts, grid milestones, stakeholder map — one tracker instead of scattered calendars.',
    tags: ['Permitting', 'Land rights', 'Grid connection', 'Stakeholder mapping'],
  },
  {
    id: 'M3',
    step: '03',
    phase: 'Contract',
    title: 'Contracts',
    tagline: 'Every contract, every milestone.',
    description:
      'EPC, LTSA, O&M, PPA, offtake, ancillaries: clause library, retention and milestones, indexation, renewal alerts — links dev, build, and ops.',
    tags: ['EPC & LTSA', 'PPA & offtake', 'Retention tracking', 'Indexation', 'Expiry alerts'],
  },
  {
    id: 'M4',
    step: '04',
    phase: 'Build',
    title: 'Construction & Commissioning',
    tagline: 'Real-time visibility into build progress.',
    description:
      'EPC milestones, capex, change orders, commissioning, COD handover — retention and warranty dates flow straight into asset management.',
    tags: ['Capex tracking', 'Change orders', 'COD handover', 'Commissioning'],
  },
  {
    id: 'M5',
    step: '05',
    phase: 'Operate',
    title: 'Asset Management & O&M',
    tagline: 'The runtime layer for producing assets.',
    description:
      'Mixed-OEM monitoring, variance investigation, settlement reconciliation, work orders, BESS dispatch — fleet-scale telemetry and workflows on one model; often the natural entry surface.',
    tags: ['Performance monitoring', 'Variance detection', 'Settlement reconciliation', 'Work orders'],
  },
  {
    id: 'M6',
    step: '06',
    phase: 'Report & recycle',
    title: 'Reporting & disclosures',
    tagline: 'Lender and investor-ready packs — fast.',
    description:
      'Lender, investor, and board packs; CSRD; transaction and diligence rooms — same core data for quarterly operations and strategic events.',
    tags: ['Lender packs', 'CSRD reporting', 'Board & investor decks', 'Diligence rooms'],
  },
];

const stackProducts = [
  {
    slug: 'api',
    id: 'Tier 1',
    name: 'API',
    tagline: 'For teams that build.',
    who: 'Larger portfolios with in-house data engineering and existing BI stacks.',
    how: 'Build your own UI on our calculation engine and portfolio graph via REST, GraphQL, and events.',
    features: [
      'Full calculation engine access',
      'REST & GraphQL APIs',
      'Python & TypeScript SDKs',
      'Events / webhooks',
      'OAuth & scoped API keys',
      'Idempotent tenant-scoped operations',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
  {
    slug: 'platform',
    id: 'Tier 2',
    name: 'Platform',
    tagline: 'For operating teams.',
    who: 'Operating teams who want full capability without a long integration project.',
    how: 'Log in and run your full portfolio through the renewables OS — pipelines through O&M on shared records.',
    features: [
      'Full web application access',
      'All lifecycle modules',
      'Operator workflows & alerting',
      'Monitoring & variance detection',
      'ML-backed insights',
      'Data model UX',
    ],
    cta: 'Request a demo',
    highlight: true,
  },
  {
    slug: 'embedded',
    id: 'Tier 3',
    name: 'Embedded',
    tagline: 'Our people, your team.',
    who: 'Organisations scaling fast without in-house data or transformation capacity.',
    how: 'Our engineers embedded with yours — integrations, rollout, modelling, and governance until the model runs without us.',
    features: [
      'Everything in Platform',
      'Dedicated AI engineer(s)',
      'Kickoff pods & runbooks',
      'Joint architecture & handover playbooks',
      'Custom analyses on demand',
      'Tailored workflow automation',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
];

function moduleIndexFromHash(): number | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw.startsWith('module-')) return null;
  const id = raw.replace(/^module-/i, '').toUpperCase();
  const i = lifecycleCapabilities.findIndex((m) => m.id === id);
  return i >= 0 ? i : null;
}

function platformTabFromHash(): PlatformTab | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (raw.startsWith('module-')) return 'modules';
  if (raw.startsWith('product-')) return 'stack';
  return null;
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const modulesWrapRef = useRef<HTMLDivElement>(null);
  const [platformTab, setPlatformTab] = useState<PlatformTab>('modules');
  const [activeModuleRow, setActiveModuleRow] = useState<number | null>(null);
  const [visibleModuleRows, setVisibleModuleRows] = useState<boolean[]>(() =>
    new Array(lifecycleCapabilities.length).fill(false)
  );
  const [stackReveal, setStackReveal] = useState(false);

  /* Per-row reveal when Modules tab is visible */
  useEffect(() => {
    if (platformTab !== 'modules') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.idx || '0', 10);
            setVisibleModuleRows((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    const id = requestAnimationFrame(() => {
      const items = modulesWrapRef.current?.querySelectorAll('[data-idx]');
      items?.forEach((el) => observer.observe(el));
    });
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, [platformTab]);

  useEffect(() => {
    if (platformTab === 'stack') setStackReveal(true);
  }, [platformTab]);

  /* Hash → tab + module row */
  useEffect(() => {
    const apply = () => {
      const tab = platformTabFromHash();
      if (tab) setPlatformTab(tab);
      const i = moduleIndexFromHash();
      if (i != null) {
        setActiveModuleRow(i);
        const id = `module-${lifecycleCapabilities[i].id.toLowerCase()}`;
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
      if (tab === 'stack' && window.location.hash.startsWith('#product-')) {
        const id = window.location.hash.slice(1);
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const stackRevealStyle = (i: number): React.CSSProperties => ({
    opacity: stackReveal ? 1 : 0,
    transform: stackReveal ? 'translateY(0)' : 'translateY(20px)',
    transition: `background 0.3s ease, opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${i * 90}ms, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${i * 90}ms`,
  });

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: HANDOFF.cloudBright,
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={PLATFORM_FOG_BG}
          alt=""
          aria-hidden="true"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(249,251,253,0.52)' }} />
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 'clamp(240px, 38vh, 460px)',
            background: cssPlatformTopVeil(),
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'clamp(260px, 36vh, 420px)',
            background: cssSectionVeilBottom(HANDOFF.paper, HANDOFF.paperRgb),
          }}
        />
      </div>

      <div className="relative z-10 container pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        {/* —— 01 / Platform (orbital-labs 2) —— */}
        <div style={{ marginBottom: 'clamp(16px, 2.5vw, 24px)' }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#92a4ac',
              marginBottom: '12px',
            }}
          >
            01 / Platform
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 2vw, 16px)',
            }}
          >
            <h2
              className="max-sm:whitespace-normal sm:whitespace-nowrap"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)',
                lineHeight: 1.12,
                letterSpacing: '0.04em',
                color: '#1e2830',
                margin: 0,
              }}
            >
              The Operating System for Renewable Portfolios
            </h2>
            <p
              className="max-lg:whitespace-normal lg:whitespace-nowrap"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                lineHeight: 1.55,
                color: '#586879',
                fontWeight: 300,
                margin: 0,
              }}
            >
              One platform for the full portfolio lifecycle — same data from pipeline through operations, without re-keying between teams.
            </p>
          </div>
        </div>

        <div id="platform-tabbed" className="scroll-mt-28">
          <div className="flex flex-wrap gap-0 border-b border-[rgba(88,104,121,0.1)]" style={{ marginBottom: 'clamp(20px, 3vw, 32px)' }}>
            <button
              type="button"
              onClick={() => {
                setPlatformTab('modules');
                window.history.replaceState(null, '', '#products');
              }}
              className="bg-transparent border-0 cursor-pointer pr-5 py-2 mb-[-1px] transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: platformTab === 'modules' ? '#1e2830' : '#92a4ac',
                borderBottom: platformTab === 'modules' ? '1px solid #1e2830' : '1px solid transparent',
              }}
            >
              Lifecycle
            </button>
            <button
              type="button"
              onClick={() => {
                setPlatformTab('stack');
                window.history.replaceState(null, '', '#products');
              }}
              className="bg-transparent border-0 cursor-pointer pr-5 py-2 mb-[-1px] transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: platformTab === 'stack' ? '#1e2830' : '#92a4ac',
                borderBottom: platformTab === 'stack' ? '1px solid #1e2830' : '1px solid transparent',
              }}
            >
              Stack
            </button>
          </div>

          {platformTab === 'stack' && (
        <div id="platform-stack">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(10px, 1.6vw, 14px)',
            }}
          >
            {stackProducts.map((tier, i) => (
              <div
                key={tier.slug}
                id={`product-${tier.slug}`}
                className={`scroll-mt-28 ${tier.highlight ? 'glass-panel' : 'glass-panel-sm'}`}
                style={{
                  ...stackRevealStyle(i),
                  padding: '40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.52rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#c6d1db',
                    }}
                  >
                    {tier.id}
                  </span>
                  {tier.highlight && (
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.48rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#586879',
                        border: '1px solid rgba(255, 255, 255, 0.55)',
                        background: 'rgba(255, 255, 255, 0.32)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        padding: '3px 8px',
                      }}
                    >
                      Most popular
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 200,
                    fontSize: '1.8rem',
                    letterSpacing: '0.06em',
                    color: '#1e2830',
                    margin: '0 0 6px',
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.82rem',
                    color: '#92a4ac',
                    margin: '0 0 28px',
                    fontWeight: 300,
                  }}
                >
                  {tier.tagline}
                </p>

                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.45)', marginBottom: '24px' }} />

                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8rem',
                    color: '#586879',
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: '12px',
                  }}
                >
                  {tier.who}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8rem',
                    color: '#586879',
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: '20px',
                  }}
                >
                  {tier.how}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    flex: 1,
                  }}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden>
                        <path d="M2 7l3.5 3.5L12 3" stroke="#92a4ac" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '0.8rem',
                          color: '#586879',
                          fontWeight: 300,
                          lineHeight: 1.5,
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: tier.highlight ? '#ffffff' : '#1e2830',
                    background: tier.highlight ? '#586879' : 'transparent',
                    border: `1px solid ${tier.highlight ? '#586879' : 'rgba(88,104,121,0.35)'}`,
                    padding: '13px 20px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (tier.highlight) {
                      el.style.background = '#1e2830';
                      el.style.borderColor = '#1e2830';
                    } else {
                      el.style.background = '#1e2830';
                      el.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (tier.highlight) {
                      el.style.background = '#586879';
                      el.style.borderColor = '#586879';
                      el.style.color = '#ffffff';
                    } else {
                      el.style.background = 'transparent';
                      el.style.color = '#1e2830';
                    }
                  }}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
          )}

          {platformTab === 'modules' && (
        <div ref={modulesWrapRef}>
          {lifecycleCapabilities.map((mod, i) => (
            <div
              key={mod.id}
              id={`module-${mod.id.toLowerCase()}`}
              data-idx={i}
              className="scroll-mt-28"
              style={{
                borderBottom: '1px solid rgba(88,104,121,0.1)',
                opacity: visibleModuleRows[i] ? 1 : 0,
                transform: visibleModuleRows[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 60}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 60}ms`,
                cursor: 'pointer',
              }}
              onClick={() => setActiveModuleRow(activeModuleRow === i ? null : i)}
              onMouseEnter={() => setActiveModuleRow(i)}
              onMouseLeave={() => {
                const pinned = moduleIndexFromHash();
                if (pinned === i) return;
                setActiveModuleRow(null);
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '7.25rem minmax(0, 1fr) auto',
                  alignItems: 'center',
                  gap: 'clamp(14px, 2.5vw, 24px)',
                  padding: '20px 0',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '2px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.58rem',
                      letterSpacing: '0.2em',
                      color: activeModuleRow === i ? '#1e2830' : '#c6d1db',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {mod.step}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.46rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: activeModuleRow === i ? '#586879' : '#92a4ac',
                      lineHeight: 1.35,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {mod.phase}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                      letterSpacing: '0.04em',
                      color: '#1e2830',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {mod.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.8rem',
                      color: '#92a4ac',
                      margin: '4px 0 0',
                      fontWeight: 300,
                    }}
                  >
                    {mod.tagline}
                  </p>
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{
                    transform: activeModuleRow === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
                    color: '#92a4ac',
                  }}
                  aria-hidden
                >
                  <path
                    d="M3 9h12M9 3l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  maxHeight: activeModuleRow === i ? '640px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.45s cubic-bezier(0.23,1,0.32,1)',
                }}
              >
                <div
                  style={{
                    paddingLeft: 'calc(7.25rem + clamp(14px, 2.5vw, 24px))',
                    paddingBottom: '28px',
                    paddingRight: '40px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.82rem',
                      lineHeight: 1.55,
                      color: '#586879',
                      fontWeight: 300,
                      marginBottom: '12px',
                    }}
                  >
                    {mod.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {mod.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.52rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#92a4ac',
                          border: '1px solid rgba(88,104,121,0.2)',
                          padding: '5px 10px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          )}
        </div>

        <div style={{ marginTop: 'clamp(28px, 5vw, 44px)', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a
            href="#contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e2830',
              border: '1px solid rgba(88,104,121,0.35)',
              padding: '12px 26px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1e2830';
              (e.currentTarget as HTMLElement).style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#1e2830';
            }}
          >
            Request a demo
          </a>
          <a
            href="#solutions"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              color: '#92a4ac',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#1e2830';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#92a4ac';
            }}
          >
            Industry &amp; buyers
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
              <path
                d="M1 5h14M10 1l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
