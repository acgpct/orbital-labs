/*
 * ORBITAL LABS — Process Section
 * Horizontal numbered steps with connecting lines
 * White background, sage step numbers, slate text
 */

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Problem Mapping',
    description:
      'We begin with deep structural analysis of your system — identifying hidden dependencies, failure modes, and optimization surfaces.',
  },
  {
    number: '02',
    title: 'Architecture Design',
    description:
      'Our engineers design a bespoke intelligence architecture, selecting and composing the right models, inference strategies, and data pipelines.',
  },
  {
    number: '03',
    title: 'Iterative Refinement',
    description:
      'We build in tight cycles, validating against real-world conditions and refining the system until it meets our precision standards.',
  },
  {
    number: '04',
    title: 'Production Deployment',
    description:
      'Hardened for scale, latency, and reliability — your system is deployed with full observability, monitoring, and ongoing support.',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: '#ffffff' }}
      ref={sectionRef}
    >
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16 reveal-up">
          <span className="section-label">05 — Process</span>
          <div className="flex-1 hairline" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <h2
            className="reveal-up font-syne"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              color: '#1e2830',
            }}
          >
            How we build<br />
            <span style={{ color: '#586879' }}>intelligence.</span>
          </h2>
          <p
            className="reveal-up font-inter text-base leading-loose self-end"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#414d56', fontWeight: 400, lineHeight: 1.8 }}
          >
            Every engagement follows a rigorous four-phase methodology —
            designed to minimize uncertainty and maximize the reliability of
            the final system.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal-up relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-6 left-1/2 right-0 h-px hidden lg:block"
                  style={{ background: 'linear-gradient(90deg, #c6d1db, transparent)' }}
                />
              )}

              <div
                className="p-8 h-full flex flex-col gap-4"
                style={{
                  borderTop: '1px solid #c6d1db',
                  borderRight: i < steps.length - 1 ? '1px solid #c6d1db' : 'none',
                }}
              >
                {/* Number */}
                <div
                  className="font-mono-space text-xs tracking-widest"
                  style={{ color: '#414d56' }}
                >
                  {step.number}
                </div>

                {/* Step indicator dot */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#92a4ac', opacity: 0.7 }}
                />

                {/* Title */}
                <h3
                  className="font-syne text-lg"
                  style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: '#1e2830', letterSpacing: '0.04em' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#414d56', fontWeight: 400, lineHeight: 1.7 }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
