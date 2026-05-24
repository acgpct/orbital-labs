/*
 * ORBITAL LABS — Platform architecture (detail page)
 */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import PlatformArchitectureDiagram from '@/components/PlatformArchitectureDiagram';
import PlatformModuleDemo from '@/components/PlatformModuleDemo';
import {
  architecturePillars,
  certifications,
  coreModules,
  technologyStack,
  type CoreModuleId,
} from '@shared/platform-architecture';
import { HANDOFF, cssSectionVeilTop } from '@shared/hero-about-handoff';

const PLATFORM_BG_WEBP = '/section-platform-solar-mist.webp?v=5';
const PLATFORM_BG = '/section-platform-solar-mist.png?v=5';

type DetailTab = 'pillars' | 'security';

function moduleFromHash(): CoreModuleId | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw.startsWith('module-')) return null;
  const id = raw.replace(/^module-/i, '');
  return coreModules.some((m) => m.id === id) ? (id as CoreModuleId) : null;
}

const tabBtnStyle = (active: boolean): React.CSSProperties => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.55rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: active ? '#1e2830' : '#92a4ac',
  background: 'transparent',
  border: 'none',
  borderBottom: active ? '1px solid #1e2830' : '1px solid transparent',
  cursor: 'pointer',
  padding: '8px 0',
  marginRight: '20px',
  marginBottom: '-1px',
});

export default function PlatformArchitecture() {
  const [selectedModuleId, setSelectedModuleId] = useState<CoreModuleId | null>(() => moduleFromHash());
  const [detailTab, setDetailTab] = useState<DetailTab>('pillars');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apply = () => setSelectedModuleId(moduleFromHash());
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const handleModuleSelect = (id: CoreModuleId) => {
    setSelectedModuleId(id);
    window.history.replaceState(null, '', `#module-${id.toLowerCase()}`);
  };

  return (
    <div className="relative min-h-screen" style={{ background: HANDOFF.paper }}>
      <div className="fixed inset-0 pointer-events-none" aria-hidden style={{ zIndex: 0 }}>
        <picture className="block h-full w-full">
          <source srcSet={PLATFORM_BG_WEBP} type="image/webp" />
          <img
            src={PLATFORM_BG}
            alt=""
            className="h-full w-full min-h-full min-w-full"
            style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0" style={{ background: 'rgba(249,251,253,0.1)' }} />
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 'clamp(160px, 24vh, 300px)',
            background: cssSectionVeilTop(HANDOFF.paper, HANDOFF.paperRgb),
          }}
        />
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: 'min(58%, 720px)',
            background:
              'linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 55%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      <Navbar />

      <div className="relative z-10">
      <main className="container pt-28 pb-20 md:pt-32 md:pb-28">
        <Link
          href="/#platform-architecture"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            color: '#92a4ac',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#1e2830';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#92a4ac';
          }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden style={{ transform: 'rotate(180deg)' }}>
            <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to platform
        </Link>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#92a4ac',
            marginBottom: '16px',
          }}
        >
          Platform architecture
        </p>

        <h1
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            color: '#1e2830',
            margin: '0 0 clamp(32px, 5vw, 48px)',
            maxWidth: '820px',
          }}
        >
          One unified operating system{' '}
          <span style={{ color: '#92a4ac' }}>for the full asset lifecycle.</span>
        </h1>

        <div style={{ marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          <PlatformArchitectureDiagram
            selectedModuleId={selectedModuleId}
            onModuleSelect={handleModuleSelect}
          />
        </div>

        <PlatformModuleDemo moduleId={selectedModuleId} />

        <section
          className="glass-panel"
          style={{
            marginTop: 'clamp(40px, 6vw, 56px)',
            maxWidth: '880px',
            borderRadius: '6px',
            padding: 'clamp(24px, 4vw, 32px) clamp(20px, 3vw, 28px)',
          }}
        >
          <div className="flex flex-wrap border-b border-[rgba(255,255,255,0.4)]" style={{ marginBottom: '20px' }}>
            <button type="button" onClick={() => setDetailTab('pillars')} style={tabBtnStyle(detailTab === 'pillars')}>
              Core pillars
            </button>
            <button type="button" onClick={() => setDetailTab('security')} style={tabBtnStyle(detailTab === 'security')}>
              Security &amp; compliance
            </button>
          </div>

          {detailTab === 'pillars' && (
            <div className="flex flex-col gap-3">
              {architecturePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="glass-panel-sm scroll-mt-28"
                  style={{
                    borderRadius: '6px',
                    padding: '16px 18px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 300,
                      fontSize: '0.9rem',
                      letterSpacing: '0.06em',
                      color: '#1e2830',
                      margin: '0 0 6px',
                    }}
                  >
                    {pillar.label}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                      color: '#586879',
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {pillar.summary}
                  </p>
                </div>
              ))}
            </div>
          )}

          {detailTab === 'security' && (
            <div>
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5"
              >
                {certifications.map((cert) => (
                  <div key={cert.name} className="glass-panel-sm" style={{ padding: '16px 14px', borderRadius: '6px' }}>
                    <div
                      style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                        color: '#1e2830',
                        marginBottom: '4px',
                      }}
                    >
                      {cert.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.48rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#586879',
                        marginBottom: '4px',
                      }}
                    >
                      {cert.target}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.72rem',
                        color: '#92a4ac',
                        fontWeight: 300,
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {cert.note}
                    </p>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  color: '#92a4ac',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {technologyStack}
              </p>
            </div>
          )}
        </section>

        <div className="flex flex-wrap items-center gap-6" style={{ marginTop: 'clamp(36px, 5vw, 48px)' }}>
          <Link
            href="/#contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: '#586879',
              border: '1px solid #586879',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1e2830';
              (e.currentTarget as HTMLElement).style.borderColor = '#1e2830';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#586879';
              (e.currentTarget as HTMLElement).style.borderColor = '#586879';
            }}
          >
            Request a demo
          </Link>
          <Link
            href="/#products"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              color: '#92a4ac',
              textDecoration: 'none',
              display: 'inline-flex',
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
            View lifecycle modules
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
              <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </main>
      </div>
    </div>
  );
}
