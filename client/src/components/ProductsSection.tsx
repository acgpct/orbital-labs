/*
 * ORBITAL LABS — Platform section (id="products")
 * Shared 01 / Platform hero, then Solutions-style tabs: Stack (four surfaces) | Modules (seven rows).
 */
import { useEffect, useRef, useState } from 'react';

/** Subtle fog — same asset as reference project `orbital-labs 2` */
const PLATFORM_FOG_BG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/section-products-fog-DLbFDHqD45SJAcp6avLNva.webp';

const lifecycleModules = [
  {
    id: 'M1',
    title: 'Pipeline & SPV',
    tagline: 'Origination to financial close.',
    description:
      'Stage-gate pipeline from screening to financial close. Capital allocation, deal-team workflow, SPV setup and ownership tracking. Replaces the pipeline spreadsheet and the SPV register that today live in separate Excel files.',
    tags: ['Pipeline management', 'SPV lifecycle', 'Capital allocation', 'Deal workflow'],
  },
  {
    id: 'M2',
    title: 'Development',
    tagline: 'Land rights, permits, grid — one place.',
    description:
      'Land-option tracking, permit register with automated lapse detection, grid-connection milestone tracking, and stakeholder mapping for community, regulator, and counterparty engagement. Replaces the development tracker and the permit calendar maintained by separate teams.',
    tags: ['Permitting', 'Land rights', 'Grid connection', 'Stakeholder mapping'],
  },
  {
    id: 'M3',
    title: 'Financing',
    tagline: 'From model to financial close.',
    description:
      'Financial model integration, debt and equity raise workflows, drawdown management, and lender DD coordination. Includes the data room, model versioning, lender Q&A log, and drawdown schedule. Workload peaks pre-COD; drawdowns continue through construction.',
    tags: ['Data room', 'Lender DD', 'Drawdown management', 'Model versioning'],
  },
  {
    id: 'M4',
    title: 'Contracts',
    tagline: 'Every contract, every milestone.',
    description:
      'Lifecycle management of EPC, LTSA, O&M, offtake, and ancillary contracts. Standardised clause library, retention and milestone tracking, indexation calculations, expiry and renewal alerts. The connective tissue between development, construction, and operations.',
    tags: ['EPC & LTSA', 'Retention tracking', 'Indexation', 'Expiry alerts'],
  },
  {
    id: 'M5',
    title: 'Construction & Commissioning',
    tagline: 'Real-time visibility into build progress.',
    description:
      'EPC milestone tracking, capex management, change-order workflow, commissioning checklists, COD handover. Retention release triggers and warranty-period start dates feed directly into Asset Management post-COD.',
    tags: ['Capex tracking', 'Change orders', 'COD handover', 'Commissioning'],
  },
  {
    id: 'M6',
    title: 'Asset Management & O&M',
    tagline: 'The operational heart of the platform.',
    description:
      'Performance monitoring across mixed-OEM portfolios, daily variance detection and investigation, settlement and metering reconciliation, work-order tracking, BESS dispatch logging. Built on TimescaleDB — handles tens of millions of operating records per portfolio per year. The module most customers buy first.',
    tags: ['Performance monitoring', 'Variance detection', 'Settlement reconciliation', 'Work orders'],
  },
  {
    id: 'M7',
    title: 'Reporting & Capital Recycling',
    tagline: 'Lender packs in days, not weeks.',
    description:
      'Lender packs, investor packs, board packs, CSRD reporting, refinancing data rooms, M&A support. Operational reporting on a quarterly rhythm and episodic capital events (refinance, sell-down, exit) — both pulling from the same underlying data model.',
    tags: ['Lender packs', 'CSRD reporting', 'Refinancing', 'M&A data rooms'],
  },
];

const stackProducts = [
  {
    slug: 'orbital-core',
    num: '01',
    name: 'Orbital Core',
    type: 'Platform',
    desc: 'The foundational AI inference and orchestration layer. A single data model spanning every project, SPV, asset, contract, permit, and operating record — the kernel that makes seven modules operate as one product.',
    tags: ['Inference Engine', 'Data Model', 'Orchestration'],
  },
  {
    slug: 'orbital-sense',
    num: '02',
    name: 'Orbital Sense',
    type: 'Intelligence Layer',
    desc: 'Real-time multi-source data fusion and situational awareness. Performance monitoring across mixed-OEM portfolios, daily variance detection, settlement reconciliation, and work-order tracking.',
    tags: ['Data Fusion', 'Anomaly Detection', 'Real-Time'],
  },
  {
    slug: 'orbital-adapt',
    num: '03',
    name: 'Orbital Adapt',
    type: 'Adaptive ML',
    desc: 'Continuously learning model framework. Detects distribution shift, triggers retraining pipelines, and maintains performance guarantees in non-stationary environments.',
    tags: ['AutoML', 'Drift Detection', 'Continuous Learning'],
  },
  {
    slug: 'orbital-consult',
    num: '04',
    name: 'Orbital Consult',
    type: 'Professional Services',
    desc: 'End-to-end AI strategy, architecture design, and embedded engineering. From proof-of-concept to production deployment — we work as an extension of your team.',
    tags: ['Strategy', 'Architecture', 'Deployment'],
  },
];

function moduleIndexFromHash(): number | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw.startsWith('module-')) return null;
  const id = raw.replace(/^module-/i, '').toUpperCase();
  const i = lifecycleModules.findIndex((m) => m.id === id);
  return i >= 0 ? i : null;
}

function platformTabFromHash(): 'modules' | 'stack' | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (raw.startsWith('module-')) return 'modules';
  if (raw.startsWith('product-')) return 'stack';
  return null;
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const modulesWrapRef = useRef<HTMLDivElement>(null);
  const [platformTab, setPlatformTab] = useState<'modules' | 'stack'>('stack');
  const [activeModuleRow, setActiveModuleRow] = useState<number | null>(null);
  const [visibleModuleRows, setVisibleModuleRows] = useState<boolean[]>(() => new Array(lifecycleModules.length).fill(false));
  const [hoverCard, setHoverCard] = useState<number | null>(null);
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
        const id = `module-${lifecycleModules[i].id.toLowerCase()}`;
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
      style={{ background: '#ffffff', minHeight: '100vh' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={PLATFORM_FOG_BG}
          alt=""
          aria-hidden="true"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.07 }}
        />
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '200px', background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '200px', background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
        />
      </div>

      <div className="relative z-10 container py-36">
        {/* —— 01 / Platform (orbital-labs 2) —— */}
        <div style={{ marginBottom: '32px', maxWidth: '640px' }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#92a4ac',
              marginBottom: '20px',
            }}
          >
            01 / Platform
          </p>
          <h2
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              color: '#1e2830',
              marginBottom: '24px',
            }}
          >
            One platform.<br />Seven modules.<br />The full asset lifecycle.
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              lineHeight: 1.85,
              color: '#586879',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            A single data model holds every project, SPV, asset, contract, permit, and operating record across your portfolio. Seven workflow modules cover origination to exit — because information captured at development should flow through financing, construction, and operations without re-keying.
          </p>
        </div>

        <div id="platform-tabbed" className="scroll-mt-28">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c6d1db',
              marginBottom: '12px',
            }}
          >
            Product architecture
          </p>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#92a4ac',
              marginBottom: '28px',
            }}
          >
            Stack and modules
          </p>

          <div className="flex flex-wrap gap-0 border-b border-[rgba(88,104,121,0.1)]" style={{ marginBottom: '48px' }}>
            <button
              type="button"
              onClick={() => setPlatformTab('stack')}
              className="bg-transparent border-0 cursor-pointer pr-6 py-3 mb-[-1px] transition-colors"
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
            <button
              type="button"
              onClick={() => setPlatformTab('modules')}
              className="bg-transparent border-0 cursor-pointer pr-6 py-3 mb-[-1px] transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: platformTab === 'modules' ? '#1e2830' : '#92a4ac',
                borderBottom: platformTab === 'modules' ? '1px solid #1e2830' : '1px solid transparent',
              }}
            >
              Modules
            </button>
          </div>

          {platformTab === 'stack' && (
        <div id="platform-stack">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', background: 'rgba(88,104,121,0.1)' }}>
            {stackProducts.map((p, i) => (
              <div
                key={p.num}
                id={`product-${p.slug}`}
                className="scroll-mt-28"
                style={{
                  ...stackRevealStyle(i),
                  padding: '40px 36px',
                  background: hoverCard === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.78)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoverCard(i)}
                onMouseLeave={() => setHoverCard(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', color: '#c6d1db' }}>
                    {p.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.52rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#92a4ac',
                      border: '1px solid rgba(146,164,172,0.3)',
                      padding: '3px 10px',
                    }}
                  >
                    {p.type}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    letterSpacing: '0.05em',
                    color: '#1e2830',
                    marginBottom: '14px',
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.83rem',
                    lineHeight: 1.75,
                    color: '#586879',
                    fontWeight: 300,
                    margin: '0 0 24px',
                  }}
                >
                  {p.desc}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.52rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#92a4ac',
                        padding: '3px 10px',
                        border: '1px solid rgba(88,104,121,0.18)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
          )}

          {platformTab === 'modules' && (
        <div ref={modulesWrapRef} style={{ borderTop: '1px solid rgba(88,104,121,0.1)' }}>
          {lifecycleModules.map((mod, i) => (
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
                  gridTemplateColumns: '64px 1fr auto',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '28px 0',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: activeModuleRow === i ? '#586879' : '#c6d1db',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {mod.id}
                </span>
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
                <div style={{ paddingLeft: '88px', paddingBottom: '28px', paddingRight: '40px' }}>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.88rem',
                      lineHeight: 1.8,
                      color: '#586879',
                      fontWeight: 300,
                      marginBottom: '16px',
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

        <div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <a
            href="#contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e2830',
              border: '1px solid rgba(88,104,121,0.35)',
              padding: '14px 32px',
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
