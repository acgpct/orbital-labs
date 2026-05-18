/*
 * ORBITAL LABS — Stats + Marquee Section
 * Horizontal scrolling ticker + large stat numbers
 * Sage background, white text
 */

import { useEffect, useRef } from 'react';

const marqueeItems = [
  'Advanced Intelligence',
  '◦',
  'Complex Systems',
  '◦',
  'Probabilistic Reasoning',
  '◦',
  'Adaptive ML',
  '◦',
  'Real-Time Inference',
  '◦',
  'Knowledge Synthesis',
  '◦',
  'Orbital Labs',
  '◦',
];

const stats = [
  { value: '200+', label: 'Systems Deployed', sub: 'Across 18 industries' },
  { value: '98.4%', label: 'Prediction Accuracy', sub: 'On held-out validation' },
  { value: '40ms', label: 'Avg. Inference Time', sub: 'Edge-optimized models' },
  { value: '18', label: 'Integration Patterns', sub: 'Production reference designs' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#586879' }}
      ref={sectionRef}
    >
      {/* Marquee ticker */}
      <div
        className="overflow-hidden py-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.15)' }}
      >
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-mono-space text-xs tracking-widest uppercase"
              style={{ color: 'rgba(249,251,253,0.7)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="font-syne mb-2"
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: '#f9fbfd',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-syne text-sm font-600 mb-1"
                style={{ fontFamily: "'Exo 2', sans-serif", color: 'rgba(243,247,248,0.9)', fontWeight: 600 }}
              >
                {stat.label}
              </div>
              <div
                className="font-mono-space text-xs"
                style={{ color: 'rgba(243,247,248,0.5)' }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
