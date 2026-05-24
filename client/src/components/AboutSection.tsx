/*
 * ORBITAL LABS — About Section
 * Company story: vision, mission, and values.
 */
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  cssAboutSectionGradient,
  cssSectionVeilBottom,
  cssSectionVeilTop,
  HANDOFF,
} from '@shared/hero-about-handoff';

const ABOUT_PROMO = '/orbital-labs-promo-v7.mp4';

const metaTags = ['Renewable energy', 'Full lifecycle', 'Portfolio OS'];

const pillars = [
  {
    id: 'vision',
    label: 'Vision',
    body: 'Every asset owner runs on one trusted operating system — from origination to exit.',
  },
  {
    id: 'mission',
    label: 'Mission',
    body: 'Replace fragmented tools and re-keying with a single data model, plus embedded engineers who stay until manual work is gone.',
  },
];

const values = [
  { step: '01', label: 'Precision', body: 'One source of truth across the portfolio — no shadow spreadsheets.' },
  { step: '02', label: 'Depth', body: 'Energy domain expertise in product, not generic workflow software.' },
  { step: '03', label: 'Trust', body: 'Security and compliance designed in from day one, not bolted on.' },
  { step: '04', label: 'Partnership', body: 'We embed with teams until manual work is genuinely gone.' },
];

const labelStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.52rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#92a4ac',
};

/** Matches ContactEstimate calculator card */
const glassPanel: CSSProperties = {
  background:
    'linear-gradient(158deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.16) 45%, rgba(249,251,253,0.1) 100%)',
  backdropFilter: 'blur(36px) saturate(165%)',
  WebkitBackdropFilter: 'blur(36px) saturate(165%)',
  border: '1px solid rgba(255,255,255,0.62)',
  boxShadow: 'none',
  borderRadius: '4px',
  padding: 'clamp(24px,4vw,40px) clamp(24px,3.5vw,44px)',
};

const pillarLabelStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.58rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'rgba(88,104,121,0.85)',
  marginBottom: '12px',
};

const pillarBodyStyle: CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.875rem',
  lineHeight: 1.65,
  color: '#414d56',
  fontWeight: 300,
  letterSpacing: '0.02em',
  margin: 0,
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const promoVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && contentRef.current) {
        contentRef.current.querySelectorAll('.about-reveal').forEach((el, i) => {
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

  useEffect(() => {
    const video = promoVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const revealStyle: CSSProperties = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)',
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-[1] overflow-hidden"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: 'clamp(640px, 88vh, 900px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Tonal rail: mist (from Solutions) → white (into Contact) */}
        <div className="absolute inset-0" style={{ background: cssAboutSectionGradient() }} />

        {/* Soft seam from Solutions above */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 'clamp(100px, 16vh, 180px)',
            background: cssSectionVeilTop(HANDOFF.mist, HANDOFF.mistRgb),
          }}
        />

        {/* Dissolve into Contact below */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 'clamp(120px, 18vh, 220px)',
            background: cssSectionVeilBottom(HANDOFF.paper, HANDOFF.paperRgb),
          }}
        />
      </div>

      <div ref={contentRef} className="relative isolate z-10 w-full container pt-16 pb-14 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-14 lg:gap-y-12 items-start">
          {/* Identity */}
          <div className="lg:col-span-5 xl:col-span-5">
            <p
              className="about-reveal"
              style={{ ...revealStyle, ...labelStyle, fontSize: '0.58rem', letterSpacing: '0.32em', marginBottom: '14px' }}
            >
              03 / About
            </p>

            <h2
              className="about-reveal"
              style={{
                ...revealStyle,
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                lineHeight: 1.1,
                letterSpacing: '0.04em',
                color: '#1e2830',
                margin: '0 0 clamp(18px, 3vw, 24px)',
              }}
            >
              One intelligence layer for your portfolio.
            </h2>

            <p className="about-reveal" style={{ ...revealStyle, ...labelStyle, color: '#586879', margin: 0 }}>
              {metaTags.join(' · ')}
            </p>
          </div>

          {/* Vision + Mission — single glass card (matches ContactEstimate calculator) */}
          <div
            className="about-reveal lg:col-span-7 xl:col-span-7"
            style={{
              ...glassPanel,
              ...revealStyle,
              transitionDelay: '140ms',
            }}
          >
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                style={
                  i > 0
                    ? {
                        marginTop: 'clamp(22px, 3.5vw, 32px)',
                        paddingTop: 'clamp(22px, 3.5vw, 32px)',
                        borderTop: '1px solid rgba(88,104,121,0.12)',
                      }
                    : undefined
                }
              >
                <p style={pillarLabelStyle}>{pillar.label}</p>
                <p style={pillarBodyStyle}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company film */}
        <div
          className="about-reveal mt-12 md:mt-14 lg:mt-16"
          style={{ ...revealStyle, transitionDelay: '210ms' }}
        >
          <div
            style={{
              ...glassPanel,
              padding: 'clamp(10px, 1.5vw, 14px)',
              overflow: 'hidden',
            }}
          >
            <video
              ref={promoVideoRef}
              className="block w-full aspect-video rounded-[2px]"
              style={{ background: '#1e2830' }}
              src={ABOUT_PROMO}
              controls
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Orbital Labs company film"
            />
          </div>
        </div>

        {/* Values */}
        <div
          className="about-reveal mt-12 md:mt-16 lg:mt-20"
          style={{ ...revealStyle, transitionDelay: '280ms' }}
        >
          <p style={{ ...labelStyle, marginBottom: 'clamp(16px, 3vw, 24px)' }}>What we stand for</p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgba(88,104,121,0.16)]"
          >
            {values.map((v, i) => (
              <div
                key={v.label}
                className={[
                  'py-5 sm:py-6',
                  i > 0 ? 'lg:border-l lg:border-[rgba(88,104,121,0.14)] lg:pl-5' : '',
                  i === 1 ? 'sm:border-l sm:border-[rgba(88,104,121,0.12)] sm:pl-5' : '',
                  i >= 2 ? 'border-t border-[rgba(88,104,121,0.12)] sm:border-t-0' : '',
                  i === 3 ? 'sm:border-l sm:border-[rgba(88,104,121,0.12)] sm:pl-5' : '',
                ].join(' ')}
              >
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span style={{ ...labelStyle, color: '#c6d1db', fontSize: '0.48rem' }}>{v.step}</span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#1e2830',
                    }}
                  >
                    {v.label}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8125rem',
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
      </div>
    </section>
  );
}
