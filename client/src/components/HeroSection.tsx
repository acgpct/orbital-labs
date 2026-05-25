/*
 * ORBITAL LABS — Hero Section (Cinematic Planet)
 * Background photo lives in LandingContinuum; this section is overlays + UI.
 */

import { useEffect, useRef } from 'react';
import { cssHeroBottomFade } from '@shared/hero-about-handoff';
import { TEXT_ON_DARK } from '@shared/site-text';

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      if (!el) return;
      el.style.transition = 'opacity 1.4s cubic-bezier(0.23,1,0.32,1), transform 1.4s cubic-bezier(0.23,1,0.32,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 500);
  }, []);

  return (
    <section
      id="home"
      className="relative z-[1] w-full overflow-hidden"
      style={{
        height: '100dvh',
        minHeight: '600px',
        background: 'transparent',
      }}
    >
      {/* Vignettes + handoff fade — pinned to hero viewport (photo is behind in LandingContinuum) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              'radial-gradient(ellipse 85% 58% at 50% 44%, rgba(26,32,40,0.68) 0%, rgba(26,32,40,0.28) 52%, transparent 72%), linear-gradient(to top, rgba(26,32,40,0.55) 0%, transparent 38%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background: 'linear-gradient(to bottom, rgba(88,104,121,0.15) 0%, transparent 25%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            zIndex: 6,
            height: 'clamp(280px, 46vh, 560px)',
            background: cssHeroBottomFade(),
          }}
        />
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center px-8 pt-16"
        style={{
          zIndex: 10,
          paddingBottom: 'clamp(96px, 13vh, 148px)',
        }}
      >
        <div className="flex flex-1 w-full flex-col items-center justify-center">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: TEXT_ON_DARK.secondary,
              marginBottom: '1.2rem',
              textAlign: 'center',
            }}
          >
            Orbital Labs
          </p>

          <h1
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              lineHeight: 1.1,
              letterSpacing: '0.05em',
              color: '#ffffff',
              margin: 0,
              maxWidth: '16em',
              textAlign: 'center',
              textShadow: '0 2px 32px rgba(0,0,0,0.25)',
            }}
          >
            Advanced Intelligence for Complex Systems
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <a
              href="#products"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#f9fbfd',
                background: 'rgba(88,104,121,0.5)',
                border: '1px solid rgba(198,209,219,0.35)',
                padding: '10px 24px',
                backdropFilter: 'blur(12px)',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(88,104,121,0.8)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,209,219,0.7)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(88,104,121,0.5)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,209,219,0.35)';
              }}
            >
              Explore
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: TEXT_ON_DARK.muted,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f9fbfd')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_ON_DARK.muted)}
            >
              Get in touch
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none flex flex-col items-center"
          style={{ marginBottom: 'clamp(20px, 3.5vh, 40px)' }}
          aria-hidden
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, rgba(198,209,219,0.7), transparent)',
              animation: 'scroll-pulse 2.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 0.9; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
