/*
 * ORBITAL LABS — Estimate block (within Contact CTA)
 * Alps backdrop + glass calculator; lives above the contact form in #contact.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { cssSectionVeilBottom, cssSectionVeilTop, HANDOFF } from '@shared/hero-about-handoff';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ALPS_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663126225481/UCizvtKEYs2yVgvvmiwWMw/alps-calculator-bg-mFeRqgqCfT32qb7ggaorAA.webp';

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  format?: (v: number) => string;
}

const sliders: SliderConfig[] = [
  {
    label: 'Team size (FTEs)',
    min: 5,
    max: 500,
    step: 5,
    defaultValue: 50,
    format: (v) => v.toString(),
  },
  {
    label: 'Manual processes per week',
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 20,
    format: (v) => v.toString(),
  },
  {
    label: 'Avg. hourly cost per FTE ($)',
    min: 20,
    max: 300,
    step: 10,
    defaultValue: 80,
    format: (v) => `$${v}`,
  },
];

function computeStatusQuoAnnualCost(ftes: number, processes: number, hourlyCost: number): number {
  const weeklyManualHours = processes * 3;
  const annualCost = ftes * weeklyManualHours * 52 * hourlyCost;
  return Math.round(annualCost / 1000) * 1000;
}

function computeSaving(ftes: number, processes: number, hourlyCost: number): number {
  const hoursPerWeekSaved = processes * 3 * 0.65;
  const annualSaving = ftes * hoursPerWeekSaved * 52 * hourlyCost;
  return Math.round(annualSaving / 1000) * 1000;
}

function formatSaving(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

function formatAxisValue(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${Math.round(n)}`;
}

const glassPanel: React.CSSProperties = {
  background:
    'linear-gradient(158deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.16) 45%, rgba(249,251,253,0.1) 100%)',
  backdropFilter: 'blur(36px) saturate(165%)',
  WebkitBackdropFilter: 'blur(36px) saturate(165%)',
  border: '1px solid rgba(255,255,255,0.62)',
  boxShadow: 'none',
};

export default function ContactEstimate() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState([50, 20, 80]);
  const [visible, setVisible] = useState(false);

  const statusQuoAnnual = computeStatusQuoAnnualCost(values[0], values[1], values[2]);
  const saving = computeSaving(values[0], values[1], values[2]);
  /** Remaining implied manual cost after modelled reclaim (same scale as stacks). */
  const remainingAnnual = Math.max(0, statusQuoAnnual - saving);

  const stackBandRow = useMemo(
    () => [{ key: 'row', reclaimed: saving, remaining: remainingAnnual }],
    [saving, remainingAnnual],
  );

  /** Axis always equals full “before” footprint — reclaimed is a proportion of this bar. */
  const axisMaxBefore = Math.max(statusQuoAnnual, 1);
  const reclaimPct =
    statusQuoAnnual > 0 ? Math.min(100, Math.round((saving / statusQuoAnnual) * 100)) : 0;

  const savingStr = formatSaving(saving);
  const savingNum = savingStr.replace(/[^0-9.]/g, '');
  const savingSuffix = savingStr.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        id="contact-estimate"
        className="relative isolate flex flex-col overflow-hidden py-10 md:py-14"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src={ALPS_BG}
            alt="Minimalist Alps"
            className="h-full w-full"
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div
            className="absolute left-0 right-0 top-0 z-[1]"
            style={{
              height: 'clamp(160px, 26vh, 300px)',
              background: cssSectionVeilTop(HANDOFF.paper, HANDOFF.paperRgb),
            }}
          />
          <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(249,251,253,0.03)' }} />
          <div
            className="absolute bottom-0 left-0 right-0 z-[1]"
            style={{
              height: 'clamp(180px, 24vh, 280px)',
              background: cssSectionVeilBottom(HANDOFF.paper, HANDOFF.paperRgb),
            }}
          />
        </div>

        <div className="absolute left-6 top-6 z-20 max-w-[min(90vw,520px)] sm:left-10 sm:top-8"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: '#586879',
            textTransform: 'uppercase',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.2s',
          }}
        >
          06 / Contact
        </div>

        <div className="relative z-10 flex flex-col px-5 pb-8 pt-16 sm:px-10 md:px-14 lg:px-24">
          <div
            ref={cardRef}
            className="mx-auto flex w-full flex-col max-w-[min(820px,100%)]"
            style={{
              ...glassPanel,
              borderRadius: '4px',
              padding: 'clamp(24px,4vw,40px) clamp(24px,3.5vw,44px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s cubic-bezier(0.23,1,0.32,1) 0.3s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.3s',
            }}
          >
            <div className="flex flex-col">
              <div>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.58rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(88,104,121,0.85)',
                    marginBottom: '12px',
                  }}
                >
                  Model your potential savings
                </p>
                <h2
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 200,
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                    lineHeight: 1.12,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#1e2830',
                    marginBottom: 'clamp(20px,3vh,32px)',
                  }}
                >
                  How much could you save?
                </h2>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px,2.5vh,26px)',
                  marginBottom: 'clamp(14px,2vh,22px)',
                  flex: '0 0 auto',
                }}
              >
                {sliders.map((s, i) => (
                  <div key={s.label}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '0.78rem',
                          color: '#414d56',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Exo 2', sans-serif",
                          fontWeight: 300,
                          fontSize: '0.95rem',
                          color: '#1e2830',
                          letterSpacing: '0.05em',
                          minWidth: '48px',
                          textAlign: 'right',
                        }}
                      >
                        {s.format ? s.format(values[i]) : values[i]}
                      </span>
                    </div>
                    <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '1px',
                          background: 'rgba(88,104,121,0.18)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          width: `${((values[i] - s.min) / (s.max - s.min)) * 100}%`,
                          height: '1px',
                          background: '#586879',
                          transition: 'width 0.1s ease',
                        }}
                      />
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={values[i]}
                        onChange={(e) => {
                          const next = [...values];
                          next[i] = Number(e.target.value);
                          setValues(next);
                        }}
                        style={{
                          position: 'relative',
                          width: '100%',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          zIndex: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: '100%',
                  marginBottom: 'clamp(14px,2vh,22px)',
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.52rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(88,104,121,0.65)',
                    marginBottom: '14px',
                  }}
                >
                  Value reclaimed (~{reclaimPct}%)
                </p>
                <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '10px 20px', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.72rem',
                      color: '#414d56',
                    }}
                  >
                    Total annual manual footprint{' '}
                    <strong style={{ fontWeight: 500, color: '#1e2830' }}>{formatSaving(statusQuoAnnual)}</strong>
                  </span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.18em', color: 'rgba(88,104,121,0.55)' }}>
                    Bar = 100% cost before reclaim
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 'clamp(120px, 16vh, 180px)',
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={stackBandRow}
                      margin={{ top: 4, right: 8, left: 0, bottom: 36 }}
                      barCategoryGap="20%"
                    >
                      <XAxis
                        type="number"
                        domain={[0, axisMaxBefore]}
                        tick={{
                          fill: 'rgba(88,104,121,0.5)',
                          fontSize: 10,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        tickFormatter={formatAxisValue}
                        axisLine={{ stroke: 'rgba(88,104,121,0.2)' }}
                        tickLine={false}
                      />
                      <YAxis type="category" dataKey="key" width={0} hide />
                      <Tooltip
                        content={({ active }) => {
                          if (!active) return null;
                          return (
                            <div
                              style={{
                                background: 'rgba(255,255,255,0.96)',
                                border: '1px solid rgba(88,104,121,0.2)',
                                borderRadius: 4,
                                padding: '12px 16px',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 12,
                                color: '#1e2830',
                                boxShadow: '0 8px 24px rgba(30,40,48,0.1)',
                              }}
                            >
                              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.18em', color: 'rgba(88,104,121,0.7)', marginBottom: 10 }}>
                                SAME SCALE — SHARES ONE ANNUAL BAR
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div>
                                  <div style={{ color: '#586879', marginBottom: 2 }}>Reclaimed (after)</div>
                                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: 17 }}>{formatSaving(saving)}</div>
                                </div>
                                <div style={{ height: 1, background: 'rgba(88,104,121,0.12)' }} />
                                <div>
                                  <div style={{ color: 'rgba(88,104,121,0.75)', marginBottom: 2 }}>Still in manual workflows</div>
                                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: 17 }}>
                                    {formatSaving(remainingAnnual)}
                                  </div>
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(88,104,121,0.55)' }}>
                                  Whole bar = before · {reclaimPct}% modelled reclaim
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{
                          paddingTop: 12,
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 11,
                          color: '#586879',
                        }}
                        formatter={(value) =>
                          value === 'reclaimed' ? 'Reclaimed (annual)' : 'Remaining manual burden'
                        }
                      />
                      <Bar
                        dataKey="reclaimed"
                        stackId="footprint"
                        fill="#586879"
                        radius={[6, 0, 0, 6]}
                        barSize={44}
                        isAnimationActive
                        animationDuration={500}
                        name="reclaimed"
                      />
                      <Bar
                        dataKey="remaining"
                        stackId="footprint"
                        fill="rgba(170,184,196,0.55)"
                        stroke="rgba(88,104,121,0.15)"
                        strokeWidth={1}
                        radius={[0, 6, 6, 0]}
                        barSize={44}
                        isAnimationActive
                        animationDuration={500}
                        name="remaining"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.65rem',
                    color: 'rgba(88,104,121,0.55)',
                    marginTop: '8px',
                    lineHeight: 1.45,
                  }}
                >
                  One bar = full annual manual cost; dark = reclaimed, light = still manual.
                </p>
              </div>

              <div style={{ flex: '0 0 auto' }}>
                <div style={{ height: '1px', background: 'rgba(88,104,121,0.14)', marginBottom: '20px' }} />
                <div style={{ marginBottom: '20px' }}>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.58rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(88,104,121,0.75)',
                      marginBottom: '8px',
                    }}
                  >
                    Estimated annual saving
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: 200,
                        fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                        lineHeight: 1,
                        color: '#1e2830',
                        letterSpacing: '-0.01em',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {savingNum}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: 200,
                        fontSize: 'clamp(1.15rem, 2.25vw, 1.75rem)',
                        color: 'rgba(88,104,121,0.55)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {savingSuffix}
                    </span>
                  </div>
                </div>

                <a
                  href="#contact-form"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#1e2830',
                    border: '1px solid rgba(255,255,255,0.55)',
                    padding: '14px 20px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    background: 'rgba(255,255,255,0.28)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.45)';
                    el.style.borderColor = 'rgba(255,255,255,0.75)';
                    el.style.color = '#162028';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.28)';
                    el.style.borderColor = 'rgba(255,255,255,0.55)';
                    el.style.color = '#1e2830';
                  }}
                >
                  Send a message below
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #contact-estimate input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(180deg, #6b7f90 0%, #586879 100%);
          border: 2px solid rgba(255,255,255,0.85);
          box-shadow: 0 2px 8px rgba(30,40,48,0.2), 0 0 0 1px rgba(88,104,121,0.15);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        #contact-estimate input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        #contact-estimate input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #586879;
          border: 2px solid rgba(255,255,255,0.85);
          cursor: pointer;
        }
        #contact-estimate input[type="range"]:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}
