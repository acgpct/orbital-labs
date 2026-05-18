/*
 * ORBITAL LABS — About Section
 * Continues hero tonal rail; concise positioning from business / energy narrative.
 */
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { cssAboutSectionGradient, HANDOFF } from '@shared/hero-about-handoff';

const pillars = [
  {
    title: 'The data model',
    body: 'One shared model for projects, SPVs, assets, contracts, permits, and operating records — from origination through finance and operations without re-keying.',
  },
  {
    title: 'Methodology IP',
    body: 'Proprietary calculation engines, regulatory libraries, and workflow templates compound with every deployment and year of benchmarks.',
  },
];

const certifications = [
  { name: 'GDPR', target: 'Day one', note: 'Privacy by design' },
  { name: 'ISO 27001', target: 'Year 1', note: 'EU enterprise baseline' },
  { name: 'SOC 2 Type II', target: '~Month 18', note: 'North America expansion' },
  { name: 'EU AI Act', target: 'Year 1', note: 'Documented posture, external review' },
];

const usps = [
  {
    title: 'Cloud-native stack',
    body: 'PostgreSQL, TimescaleDB, and S3; Python (FastAPI) and TypeScript services; React for product UX.',
  },
  {
    title: 'Ship & scale',
    body: 'Kubernetes on EKS/GKE, Terraform, and CI/CD — repeatable environments from dev to production.',
  },
  {
    title: 'Isolation & trust',
    body: 'Tenant-scoped multi-tenancy; TLS 1.3 in transit; AES-256 at rest; customer-managed keys for sovereign tiers.',
  },
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
          }, i * 120);
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
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundColor: HANDOFF.mist,
          backgroundImage: cssAboutSectionGradient(),
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          opacity: 0.78,
        }}
      />

      <div ref={contentRef} className="relative z-10 w-full container pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        <p
          className="about-reveal"
          style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '14px' }}
        >
          03 / About
        </p>

        <div
          className="about-reveal grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
          style={{ ...revealStyle, marginBottom: 'clamp(28px, 5vw, 44px)' }}
        >
          <h2
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(1.65rem, 3.2vw, 2.85rem)',
              lineHeight: 1.12,
              letterSpacing: '0.04em',
              color: '#1e2830',
              margin: 0,
            }}
          >
            The operating system for energy asset owners.
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.875rem',
              lineHeight: 1.65,
              color: '#586879',
              fontWeight: 300,
              margin: 0,
            }}
          >
            We build the intelligence layer for complex energy portfolios — O&M and asset performance first, expanding across the lifecycle. Alongside the platform, we embed engineers with clients to remove manual work after a structured pass on inefficiency and cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid rgba(88,104,121,0.12)' }}>
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="about-reveal"
              style={{
                ...revealStyle,
                transitionDelay: `${i * 80}ms`,
                padding: 'clamp(20px, 3vw, 28px) clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 28px) 0',
                borderRight: i < pillars.length - 1 ? '1px solid rgba(88,104,121,0.08)' : 'none',
                paddingLeft: i > 0 ? 'clamp(20px, 2.5vw, 28px)' : '0',
              }}
            >
              <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: '0.95rem', letterSpacing: '0.06em', color: '#1e2830', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', lineHeight: 1.55, color: '#92a4ac', fontWeight: 300, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className="about-reveal mt-10 md:mt-12" style={revealStyle}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c6d1db',
              marginBottom: '16px',
            }}
          >
            Security &amp; compliance
          </p>
          <div
            className="grid gap-px"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              background: 'rgba(88,104,121,0.08)',
              border: '1px solid rgba(88,104,121,0.08)',
            }}
          >
            {certifications.map((cert) => (
              <div key={cert.name} style={{ background: 'rgba(255,255,255,0.82)', padding: '18px 16px' }}>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: '0.95rem', letterSpacing: '0.05em', color: '#1e2830', marginBottom: '4px' }}>{cert.name}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#586879', marginBottom: '6px' }}>{cert.target}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', color: '#92a4ac', fontWeight: 300, lineHeight: 1.45, margin: 0 }}>{cert.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <p
            className="about-reveal"
            style={{
              ...revealStyle,
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c6d1db',
              marginBottom: '16px',
            }}
          >
            USP
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(88,104,121,0.12)' }}>
            {usps.map((u, i) => (
              <div
                key={u.title}
                className="about-reveal"
                style={{
                  ...revealStyle,
                  transitionDelay: `${i * 80}ms`,
                  padding: 'clamp(20px, 3vw, 28px) clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 28px) 0',
                  borderRight: i < usps.length - 1 ? '1px solid rgba(88,104,121,0.08)' : 'none',
                  paddingLeft: i > 0 ? 'clamp(20px, 2.5vw, 28px)' : '0',
                }}
              >
                <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: '0.95rem', letterSpacing: '0.06em', color: '#1e2830', marginBottom: '8px' }}>{u.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', lineHeight: 1.55, color: '#92a4ac', fontWeight: 300, margin: 0 }}>{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
