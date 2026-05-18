/*
 * ORBITAL LABS — Hero Section (Cinematic Planet)
 * Background photo lives in LandingContinuum; this section is overlays + UI.
 */

import { useEffect, useRef } from 'react';
import { cssHeroBottomFade } from '@shared/hero-about-handoff';

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: textRef.current, delay: 500, from: 'translateY(24px)', to: 'translateY(0)' },
      { el: sideRef.current, delay: 800, from: 'translateX(-10px)', to: 'translateX(0)' },
    ];
    items.forEach(({ el, delay, from, to }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = from;
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 1.4s cubic-bezier(0.23,1,0.32,1), transform 1.4s cubic-bezier(0.23,1,0.32,1)';
        el.style.opacity = '1';
        el.style.transform = to;
      }, delay);
    });
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
            height: 'clamp(190px, 30vh, 440px)',
            background: cssHeroBottomFade(),
          }}
        />
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center items-center px-8 pt-16"
        style={{ zIndex: 10 }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(198,209,219,0.8)',
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
          Advanced Intelligence<br />
          for Complex Systems
        </h1>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
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
              color: 'rgba(198,209,219,0.7)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f9fbfd')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(198,209,219,0.7)')}
          >
            Get in touch
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div ref={sideRef} className="absolute left-5 bottom-12 flex flex-col gap-1" style={{ zIndex: 10 }}>
        {['_01', '_02', '_03', '_04', '_05'].map((n, i) => (
          <span
            key={n}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: i === 0 ? 'rgba(249,251,253,0.85)' : 'rgba(198,209,219,0.3)',
              lineHeight: 1.7,
            }}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(198,209,219,0.7), transparent)',
            animation: 'scroll-pulse 2.4s ease-in-out infinite',
          }}
        />
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
