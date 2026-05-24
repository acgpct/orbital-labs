/*
 * ORBITAL LABS — Platform architecture teaser (home)
 * Placed after Platform (#products). Learn more → /platform/architecture
 */
import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import PlatformArchitectureDiagram from '@/components/PlatformArchitectureDiagram';
import {
  cssSectionVeilBottom,
  cssSectionVeilTop,
  HANDOFF,
  SECTION_TONES,
} from '@shared/hero-about-handoff';

/** Ethereal cloud / fog — matches Platform (#products) for glass panels */
const PLATFORM_FOG_BG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/section-products-fog-ArHtnXcUB5SzEfUrXuYYid.webp';

export default function PlatformArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && contentRef.current) {
        contentRef.current.querySelectorAll('.arch-reveal').forEach((el, i) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, i * 70);
        });
      }
    }, { threshold: 0.08 });
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
      id="platform-architecture"
      ref={sectionRef}
      className="relative overflow-hidden scroll-mt-28"
      style={{ background: HANDOFF.cloudBright }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={PLATFORM_FOG_BG}
          alt=""
          aria-hidden="true"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(249,251,253,0.48)' }} />
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 'clamp(120px, 18vh, 200px)',
            background: cssSectionVeilTop(HANDOFF.paper, HANDOFF.paperRgb),
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'clamp(140px, 20vh, 220px)',
            background: cssSectionVeilBottom(SECTION_TONES.solutions, SECTION_TONES.solutionsRgb),
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 container pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
        <p
          className="arch-reveal"
          style={{
            ...revealStyle,
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

        <h2
          className="arch-reveal"
          style={{
            ...revealStyle,
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)',
            lineHeight: 1.12,
            letterSpacing: '0.04em',
            color: '#1e2830',
            margin: '0 0 clamp(28px, 4vw, 44px)',
            maxWidth: '820px',
          }}
        >
          One unified operating system{' '}
          <span style={{ color: '#92a4ac' }}>for the full asset lifecycle</span>
        </h2>

        <div
          className="glass-panel"
          style={{
            marginBottom: 'clamp(28px, 5vw, 40px)',
            borderRadius: '6px',
            padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3vw, 32px)',
          }}
        >
          <PlatformArchitectureDiagram />
        </div>

        <div className="arch-reveal flex flex-wrap items-center gap-6" style={revealStyle}>
          <Link
            href="/platform/architecture"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e2830',
              border: '1px solid rgba(255, 255, 255, 0.55)',
              padding: '12px 26px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              background: 'rgba(255, 255, 255, 0.28)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1e2830';
              (e.currentTarget as HTMLElement).style.color = '#ffffff';
              (e.currentTarget as HTMLElement).style.borderColor = '#1e2830';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.28)';
              (e.currentTarget as HTMLElement).style.color = '#1e2830';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.55)';
            }}
          >
            Learn more
          </Link>
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
