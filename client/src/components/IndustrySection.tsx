/*
 * ORBITAL LABS — Solutions section (id="solutions")
 * High-level buyer profile cards; detail → /solutions/:slug
 */
import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { solutionProfiles, solutionProfilePath } from '@shared/solution-profiles';
import {
  cssSectionVeilBottom,
  cssSectionVeilTop,
  HANDOFF,
  SECTION_TONES,
} from '@shared/hero-about-handoff';

const INDUSTRY_BG = '/section-industry-wind-mist.png';
const TURBINE_ACCENT =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/industry-windturbine-DLbFDHqD45SJAcp6avLNva.webp';

export default function IndustrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      style={{
        background: SECTION_TONES.solutions,
        display: 'flex',
        alignItems: 'center',
        minHeight: 'clamp(640px, 88vh, 920px)',
      }}
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
            background: cssSectionVeilTop(SECTION_TONES.solutions, SECTION_TONES.solutionsRgb),
            zIndex: 1,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'clamp(200px, 28vh, 360px)',
            background: cssSectionVeilBottom(HANDOFF.mist, HANDOFF.mistRgb),
            zIndex: 1,
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 w-full container pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#414d56', marginBottom: '12px' }}>
              02 / Solutions — Energy
            </p>
            <h2 className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)', lineHeight: 1.12, letterSpacing: '0.04em', color: '#1e2830', margin: '0 0 clamp(24px, 4vw, 36px)' }}>
              Built for energy asset owners.
            </h2>

            <div
              id="solutions-industry"
              className="scroll-mt-28 ind-reveal flex flex-wrap items-baseline gap-x-5 gap-y-2"
              style={{ ...revealStyle, marginBottom: 'clamp(28px, 5vw, 40px)' }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#414d56' }}>
                Industry · Renewable energy
              </span>
              <span aria-hidden="true" style={{ color: '#687a86', fontSize: '0.52rem' }}>·</span>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', lineHeight: 1.55, color: '#414d56', fontWeight: 300, margin: 0 }}>
                Solar, onshore wind, storage, and hybrids.
              </p>
            </div>

            <p className="ind-reveal" style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#414d56' }}>
              <a href="#products" style={{ color: '#414d56', textDecoration: 'none', borderBottom: '1px solid rgba(88,104,121,0.25)' }} className="hover:text-[#1e2830]">
                Platform &amp; lifecycle →
              </a>
            </p>
          </div>

          <nav
            id="solutions-buyers"
            className="scroll-mt-28 lg:col-span-6 xl:col-span-5 flex flex-col items-stretch lg:items-end"
            aria-label="Who we serve"
          >
            <p
              className="ind-reveal lg:text-right"
              style={{
                ...revealStyle,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.52rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#414d56',
                marginBottom: 'clamp(16px, 3vw, 24px)',
              }}
            >
              Who we serve
            </p>

            <div className="flex flex-col lg:max-w-[320px] lg:ml-auto w-full">
              {solutionProfiles.map((profile, i) => (
                <Link
                  key={profile.id}
                  href={solutionProfilePath(profile.id)}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                  }}
                  className="ind-reveal group"
                  style={{
                    ...revealStyle,
                    transitionDelay: `${i * 60}ms`,
                    display: 'block',
                    textDecoration: 'none',
                    padding: 'clamp(18px, 3vw, 24px) 0',
                    borderTop: i === 0 ? '1px solid rgba(88,104,121,0.18)' : 'none',
                    borderBottom: '1px solid rgba(88,104,121,0.18)',
                  }}
                >
                  <div className="flex items-center justify-between gap-6 lg:justify-end lg:text-right">
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 'clamp(0.62rem, 1.1vw, 0.72rem)',
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        color: '#1e2830',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {profile.shortLabel}
                    </span>
                    <svg
                      width="16"
                      height="10"
                      viewBox="0 0 16 10"
                      fill="none"
                      aria-hidden
                      className="shrink-0 opacity-40 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M1 5h14M10 1l5 4-5 4"
                        stroke="#1e2830"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
