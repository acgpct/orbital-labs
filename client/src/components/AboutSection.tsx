/*
 * ORBITAL LABS — About Section
 * Company story: vision, mission, and values.
 */
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  cssSectionVeilBottom,
  cssSectionVeilTop,
  HANDOFF,
} from '@shared/hero-about-handoff';

const ABOUT_BG = '/section-about-solar-mist.png';

const values = [
  { label: 'Precision', body: 'One source of truth across the portfolio — no shadow spreadsheets.' },
  { label: 'Depth', body: 'Energy domain expertise in product, not generic workflow software.' },
  { label: 'Trust', body: 'Security and compliance designed in from day one, not bolted on.' },
  { label: 'Partnership', body: 'We embed with teams until manual work is genuinely gone.' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && contentRef.current) {
        contentRef.current.querySelectorAll('.about-reveal').forEach((el, i) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, i * 100);
        });
      }
    }, { threshold: 0.08 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const revealStyle: CSSProperties = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 1s cubic-bezier(0.23,1,0.32,1), transform 1s cubic-bezier(0.23,1,0.32,1)',
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-[1] overflow-hidden"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: 'clamp(680px, 92vh, 960px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: HANDOFF.mist }}>
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ height: '58%', minHeight: '380px' }}
        >
          <img
            src={ABOUT_BG}
            alt=""
            aria-hidden="true"
            className="h-full w-full"
            style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          />
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: '48%',
              background: `linear-gradient(to bottom, ${HANDOFF.mist} 0%, rgba(229,238,244,0.72) 42%, rgba(229,238,244,0) 100%)`,
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 'clamp(80px, 14vh, 160px)',
            background: cssSectionVeilTop(HANDOFF.mist, HANDOFF.mistRgb),
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 'clamp(72px, 10vh, 120px)',
            background: cssSectionVeilBottom(HANDOFF.paper, HANDOFF.paperRgb),
            zIndex: 1,
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 w-full container pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        <p
          className="about-reveal"
          style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '14px' }}
        >
          03 / About
        </p>

        <h2
          className="about-reveal"
          style={{
            ...revealStyle,
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(1.65rem, 3.2vw, 2.5rem)',
            lineHeight: 1.12,
            letterSpacing: '0.04em',
            color: '#1e2830',
            margin: '0 0 clamp(20px, 3vw, 28px)',
            maxWidth: '720px',
          }}
        >
          Orbital Labs
        </h2>

        <p
          className="about-reveal"
          style={{
            ...revealStyle,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: '#586879',
            fontWeight: 300,
            margin: 0,
            maxWidth: '680px',
          }}
        >
          Orbital Labs is a European software company focused on the intelligence layer for renewable and hybrid energy portfolios. Our{' '}
          <strong style={{ fontWeight: 400, color: '#1e2830' }}>vision</strong> is an industry where every asset owner runs on one trusted operating system from origination to exit. Our{' '}
          <strong style={{ fontWeight: 400, color: '#1e2830' }}>mission</strong> is to replace fragmented tools and re-keying with a single data model — one renewables portfolio OS spanning the lifecycle — and embedded engineers who stay until the manual work is gone.
        </p>

        <div
          className="about-reveal mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          style={{ ...revealStyle, maxWidth: '820px', borderTop: '1px solid rgba(88,104,121,0.12)', paddingTop: 'clamp(24px, 4vw, 32px)' }}
        >
          {values.map((v) => (
            <div key={v.label}>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#92a4ac',
                  marginBottom: '8px',
                }}
              >
                {v.label}
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  lineHeight: 1.55,
                  color: '#586879',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
