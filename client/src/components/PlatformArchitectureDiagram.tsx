/*
 * ORBITAL LABS — Platform architecture diagram
 * Data ingestion → Orbital core → Outputs
 */
import { useId, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  architectureOutputs,
  coreModules,
  dataIngestion,
  type CoreModuleId,
} from '@shared/platform-architecture';

const columnShellStyle: CSSProperties = {
  borderRadius: '4px',
  padding: 'clamp(18px, 2.5vw, 24px)',
  height: '100%',
};

const columnLabelStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.48rem',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'rgba(88,104,121,0.85)',
  marginBottom: '16px',
};

const sideItemStyle: CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.78rem',
  fontWeight: 300,
  color: '#414d56',
  letterSpacing: '0.02em',
  borderRadius: '4px',
  padding: '12px 14px',
  lineHeight: 1.4,
  position: 'relative',
  zIndex: 1,
};

type Props = {
  selectedModuleId?: CoreModuleId | null;
  onModuleSelect?: (id: CoreModuleId) => void;
  interactive?: boolean;
};

function SideColumn({
  label,
  items,
  align,
}: {
  label: string;
  items: readonly string[];
  align: 'left' | 'right';
}) {
  return (
    <div className="glass-panel arch-diagram-panel flex flex-col" style={columnShellStyle}>
      <p style={columnLabelStyle}>{label}</p>
      <div className="flex flex-col gap-2.5 flex-1 justify-center">
        {items.map((item) => (
          <div key={item} className="relative flex items-center">
            {align === 'left' && (
              <div
                aria-hidden
                className="hidden lg:block absolute left-full top-1/2 h-px bg-[rgba(255,255,255,0.62)]"
                style={{ width: 'clamp(12px, 2vw, 28px)', transform: 'translateY(-50%)' }}
              />
            )}
            <div className="glass-panel-inset arch-diagram-cell w-full" style={sideItemStyle}>
              {item}
            </div>
            {align === 'right' && (
              <div
                aria-hidden
                className="hidden lg:block absolute right-full top-1/2 h-px bg-[rgba(255,255,255,0.62)]"
                style={{ width: 'clamp(12px, 2vw, 28px)', transform: 'translateY(-50%)' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlatformArchitectureDiagram({
  selectedModuleId = null,
  onModuleSelect,
  interactive = true,
}: Props) {
  const [localSelected, setLocalSelected] = useState<CoreModuleId | null>(null);
  const rawId = useId();
  const borderGradId = `core-border-grad-${rawId.replace(/:/g, '')}`;
  const borderGlowId = `core-border-glow-${rawId.replace(/:/g, '')}`;
  const activeId = selectedModuleId ?? localSelected;
  const activeModule = coreModules.find((m) => m.id === activeId);

  const handleSelect = (id: CoreModuleId) => {
    if (!interactive) return;
    setLocalSelected(id);
    onModuleSelect?.(id);
  };

  return (
    <div className="relative isolate">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1fr)] gap-4 lg:gap-5 xl:gap-6 items-stretch">
        <SideColumn label="Data ingestion" items={dataIngestion} align="left" />

        <div className="glass-panel arch-diagram-panel order-first lg:order-none flex flex-col" style={columnShellStyle}>
          <p
            style={{
              ...columnLabelStyle,
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            Orbital core platform
          </p>

          <div className="platform-core-frame glass-panel-inset arch-diagram-core flex-1">
            <svg
              className="platform-core-border-trace"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id={borderGradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="rgba(249, 251, 253, 0)" />
                  <stop offset="34%" stopColor="rgba(198, 209, 219, 0.42)" />
                  <stop offset="48%" stopColor="rgba(255, 255, 255, 0.92)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="64%" stopColor="rgba(168, 181, 193, 0.78)" />
                  <stop offset="100%" stopColor="rgba(249, 251, 253, 0)" />
                </linearGradient>
                <filter id={borderGlowId} x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect
                className="platform-core-border-glow"
                x="0.75"
                y="0.75"
                width="98.5"
                height="98.5"
                rx="2.2"
                ry="2.2"
                fill="none"
                stroke={`url(#${borderGradId})`}
                pathLength="100"
                vectorEffect="non-scaling-stroke"
                filter={`url(#${borderGlowId})`}
              />
              <rect
                className="platform-core-border-stroke"
                x="0.75"
                y="0.75"
                width="98.5"
                height="98.5"
                rx="2.2"
                ry="2.2"
                fill="none"
                stroke={`url(#${borderGradId})`}
                pathLength="100"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div
              className="platform-core-inner"
              style={{
                padding: 'clamp(14px, 2vw, 20px)',
              }}
            >
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {coreModules.map((mod) => {
                  const selected = activeId === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      disabled={!interactive}
                      onClick={() => handleSelect(mod.id)}
                      className={`text-left arch-diagram-module ${selected ? 'arch-diagram-module-selected' : ''}`}
                      style={{
                        cursor: interactive ? 'pointer' : 'default',
                        borderRadius: '4px',
                        padding: '14px 12px',
                        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Exo 2', sans-serif",
                          fontWeight: 300,
                          fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
                          letterSpacing: '0.03em',
                          color: '#1e2830',
                          lineHeight: 1.35,
                        }}
                      >
                        {mod.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.44rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#414d56',
              textAlign: 'center',
              marginTop: '14px',
              marginBottom: 0,
            }}
          >
            {activeModule ? activeModule.title : 'Select a module to explore'}
          </p>
        </div>

        <SideColumn label="Outputs" items={architectureOutputs} align="right" />
      </div>

      {activeModule && (
        <div
          className="glass-panel arch-diagram-panel mt-5 max-w-3xl mx-auto lg:mx-0"
          style={{
            borderRadius: '4px',
            padding: 'clamp(16px, 2.5vw, 20px) clamp(18px, 3vw, 24px)',
          }}
        >
          <p
            className="text-center lg:text-left"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              lineHeight: 1.65,
              color: '#414d56',
              fontWeight: 300,
              margin: 0,
            }}
          >
            {activeModule.summary}
          </p>
        </div>
      )}
    </div>
  );
}
