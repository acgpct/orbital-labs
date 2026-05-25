/*
 * ORBITAL LABS — Capabilities Section
 * 3-column card grid with hover tilt and reveal
 * Frosted glass cards, sage accent borders
 */

import { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    id: '01',
    title: 'Adaptive ML Systems',
    description:
      'Self-correcting machine learning architectures that continuously refine their internal models in response to distributional shifts and novel input regimes.',
    tags: ['Continual Learning', 'Online Adaptation', 'Drift Detection'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" fill="#92a4ac" />
        <circle cx="16" cy="16" r="9" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <circle cx="16" cy="16" r="14" stroke="#c6d1db" strokeWidth="0.5" strokeDasharray="3 2" fill="none" />
        <circle cx="16" cy="7" r="1.5" fill="#586879" />
        <circle cx="25" cy="16" r="1.5" fill="#586879" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Complex Systems Modeling',
    description:
      'High-fidelity simulation and modeling of multi-agent, emergent, and non-linear systems — from logistics networks to ecological models.',
    tags: ['Agent-Based Models', 'Emergent Behavior', 'Simulation'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="10" height="10" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <rect x="20" y="2" width="10" height="10" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <rect x="11" y="20" width="10" height="10" stroke="#586879" strokeWidth="0.8" fill="none" />
        <line x1="7" y1="12" x2="16" y2="20" stroke="#c6d1db" strokeWidth="0.8" />
        <line x1="25" y1="12" x2="16" y2="20" stroke="#c6d1db" strokeWidth="0.8" />
        <circle cx="7" cy="7" r="2" fill="#92a4ac" opacity="0.6" />
        <circle cx="25" cy="7" r="2" fill="#92a4ac" opacity="0.6" />
        <circle cx="16" cy="25" r="2" fill="#586879" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Probabilistic Reasoning',
    description:
      'Bayesian inference engines and uncertainty quantification frameworks that provide calibrated confidence estimates alongside every prediction.',
    tags: ['Bayesian Networks', 'Uncertainty Quantification', 'Causal Inference'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 28 L16 4 L28 28 Z" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <path d="M8 22 L16 10 L24 22 Z" stroke="#92a4ac" strokeWidth="0.5" fill="rgba(132,150,162,0.1)" />
        <circle cx="16" cy="4" r="1.5" fill="#586879" />
        <circle cx="4" cy="28" r="1.5" fill="#92a4ac" />
        <circle cx="28" cy="28" r="1.5" fill="#92a4ac" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Real-Time Intelligence',
    description:
      'Sub-100ms inference pipelines optimized for edge deployment, streaming data, and latency-critical decision environments.',
    tags: ['Edge Computing', 'Stream Processing', 'Low-Latency'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#c6d1db" strokeWidth="0.5" fill="none" />
        <path d="M16 6 L16 16 L22 16" stroke="#586879" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="1.5" fill="#92a4ac" />
        <path d="M8 4 L8 8" stroke="#92a4ac" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M24 4 L24 8" stroke="#92a4ac" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Knowledge Synthesis',
    description:
      'Large-scale knowledge graph construction and semantic reasoning systems that integrate heterogeneous data sources into coherent intelligence.',
    tags: ['Knowledge Graphs', 'Semantic Reasoning', 'Data Fusion'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="3" fill="#92a4ac" />
        <circle cx="6" cy="10" r="2" fill="#92a4ac" opacity="0.7" />
        <circle cx="26" cy="10" r="2" fill="#92a4ac" opacity="0.7" />
        <circle cx="6" cy="22" r="2" fill="#586879" opacity="0.7" />
        <circle cx="26" cy="22" r="2" fill="#586879" opacity="0.7" />
        <circle cx="16" cy="4" r="2" fill="#c6d1db" />
        <circle cx="16" cy="28" r="2" fill="#c6d1db" />
        <line x1="16" y1="13" x2="8" y2="11" stroke="#c6d1db" strokeWidth="0.6" />
        <line x1="16" y1="13" x2="24" y2="11" stroke="#c6d1db" strokeWidth="0.6" />
        <line x1="16" y1="19" x2="8" y2="21" stroke="#c6d1db" strokeWidth="0.6" />
        <line x1="16" y1="19" x2="24" y2="21" stroke="#c6d1db" strokeWidth="0.6" />
        <line x1="16" y1="13" x2="16" y2="6" stroke="#c6d1db" strokeWidth="0.6" />
        <line x1="16" y1="19" x2="16" y2="26" stroke="#c6d1db" strokeWidth="0.6" />
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Autonomous Decision Systems',
    description:
      'Explainable, auditable decision frameworks for high-stakes environments where transparency and accountability are non-negotiable.',
    tags: ['Explainable AI', 'Decision Trees', 'Audit Trails'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="8" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <rect x="12" y="4" width="8" height="8" stroke="#92a4ac" strokeWidth="0.8" fill="none" />
        <rect x="12" y="20" width="8" height="8" stroke="#586879" strokeWidth="0.8" fill="none" />
        <line x1="16" y1="12" x2="16" y2="12" stroke="#c6d1db" strokeWidth="0.8" />
        <circle cx="16" cy="16" r="2" fill="#92a4ac" />
      </svg>
    ),
  },
];

function CapabilityCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="reveal-up group"
      style={{
        transitionDelay: `${index * 80}ms`,
        transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full p-8 flex flex-col gap-5"
        style={{
          border: `1px solid ${hovered ? '#92a4ac' : '#c6d1db'}`,
          background: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
          transition: 'border-color 0.25s ease, background 0.25s ease',
        }}
      >
        {/* ID + Icon */}
        <div className="flex items-start justify-between">
          <span
            className="font-mono-space text-xs tracking-widest"
            style={{ color: '#687a86' }}
          >
            {cap.id}
          </span>
          <div style={{ opacity: hovered ? 1 : 0.7, transition: 'opacity 0.25s ease' }}>
            {cap.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-syne text-lg leading-tight"
          style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: '#1e2830', letterSpacing: '0.04em' }}
        >
          {cap.title}
        </h3>

        {/* Description */}
        <p
          className="font-inter text-sm leading-relaxed flex-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#414d56', fontWeight: 400, lineHeight: 1.7 }}
        >
          {cap.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {cap.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono-space text-xs px-2 py-1"
              style={{
                background: 'rgba(134,143,116,0.08)',
                color: '#414d56',
                border: '1px solid rgba(134,143,116,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      className="relative py-32 overflow-hidden"
      style={{ background: '#ffffff' }}
      ref={sectionRef}
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <span className="section-label">02 — Capabilities</span>
          <div className="flex-1 hairline" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
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
            Six domains.<br />
            <span style={{ color: '#586879' }}>One coherent system.</span>
          </h2>
          <p
            className="reveal-up font-inter text-base leading-loose self-end"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#414d56', fontWeight: 400, lineHeight: 1.8 }}
          >
            Each capability is engineered to function independently or as part of
            an integrated intelligence stack — composable, auditable, and built to
            operate at production scale.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
