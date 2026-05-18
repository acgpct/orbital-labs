/*
 * ORBITAL LABS — About Section
 * Full-bleed landscape (same asset as hero) with a readability veil — About follows Products & Solutions.
 */
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { cssAboutSectionGradient, HANDOFF } from '@shared/hero-about-handoff';

const pillars = [
  { num: '01', title: 'Probabilistic Reasoning', body: "We build systems that quantify uncertainty — not just predict, but know what they don't know." },
  { num: '02', title: 'Adaptive Intelligence', body: 'Our models evolve with your data, continuously recalibrating to shifting environments and edge cases.' },
  { num: '03', title: 'Systems Thinking', body: 'We design AI that understands context at scale — from individual signals to complex system-wide dynamics.' },
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
        minHeight: '100vh',
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

      <div ref={contentRef} className="relative z-10 w-full container py-36">
        <p
          className="about-reveal"
          style={{ ...revealStyle, fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#92a4ac', marginBottom: '28px' }}
        >
          03 / About
        </p>

        <h2
          className="about-reveal"
          style={{ ...revealStyle, fontFamily: "'Exo 2', sans-serif", fontWeight: 200, fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.1, letterSpacing: '0.04em', color: '#1e2830', marginBottom: '28px', maxWidth: '820px' }}
        >
          We build intelligence<br />that operates at the<br />edge of complexity.
        </h2>

        <p
          className="about-reveal"
          style={{ ...revealStyle, fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', lineHeight: 1.85, color: '#586879', fontWeight: 300, maxWidth: '520px', marginBottom: '80px' }}
        >
          Orbital Labs builds applied machine intelligence systems for organisations navigating high-dimensional, uncertain, and rapidly evolving environments — combining probabilistic modelling, adaptive deployment, and real-world engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(88,104,121,0.12)' }}>
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className="about-reveal"
              style={{
                ...revealStyle,
                transitionDelay: `${i * 80}ms`,
                padding: '36px 28px 36px 0',
                borderRight: i < 2 ? '1px solid rgba(88,104,121,0.08)' : 'none',
                paddingLeft: i > 0 ? '28px' : '0',
              }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', color: '#c6d1db', display: 'block', marginBottom: '16px' }}>{p.num}</span>
              <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: '1rem', letterSpacing: '0.06em', color: '#1e2830', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem', lineHeight: 1.75, color: '#92a4ac', fontWeight: 300, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
