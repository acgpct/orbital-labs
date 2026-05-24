/*
 * ORBITAL LABS — Platform architecture diagram
 * Data ingestion → Orbital core → Outputs
 */
import { useState } from 'react';
import {
  architectureOutputs,
  coreModules,
  dataIngestion,
  type CoreModuleId,
} from '@shared/platform-architecture';

const sideBoxStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.78rem',
  fontWeight: 300,
  color: '#586879',
  borderRadius: '6px',
  padding: '14px 16px',
  lineHeight: 1.4,
  position: 'relative',
  zIndex: 1,
};

const columnLabelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.48rem',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#c6d1db',
  marginBottom: '16px',
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
    <div className="flex flex-col">
      <p style={columnLabelStyle}>{label}</p>
      <div className="flex flex-col gap-3 flex-1 justify-center">
        {items.map((item) => (
          <div key={item} className="relative flex items-center">
            {align === 'left' && (
              <div
                aria-hidden
                className="hidden lg:block absolute left-full top-1/2 h-px bg-[rgba(255,255,255,0.45)]"
                style={{ width: 'clamp(12px, 2vw, 28px)', transform: 'translateY(-50%)' }}
              />
            )}
            <div style={{ ...sideBoxStyle, width: '100%' }} className="glass-panel-sm">{item}</div>
            {align === 'right' && (
              <div
                aria-hidden
                className="hidden lg:block absolute right-full top-1/2 h-px bg-[rgba(255,255,255,0.45)]"
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
  const activeId = selectedModuleId ?? localSelected;
  const activeModule = coreModules.find((m) => m.id === activeId);

  const handleSelect = (id: CoreModuleId) => {
    if (!interactive) return;
    setLocalSelected(id);
    onModuleSelect?.(id);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1fr)] gap-8 lg:gap-6 xl:gap-10 items-center">
        <SideColumn label="Data ingestion" items={dataIngestion} align="left" />

        <div className="relative order-first lg:order-none mb-2 lg:mb-0">
          <div className="flex justify-center mb-3">
            <span
              className="glass-panel-sm"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.46rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#92a4ac',
                borderRadius: '4px',
                padding: '6px 12px',
              }}
            >
              Orbital core platform
            </span>
          </div>

          <div className="platform-core-frame glass-panel">
            <div
              className="platform-core-inner"
              style={{
                padding: 'clamp(16px, 2.5vw, 24px)',
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
                    className={`text-left ${selected ? 'glass-panel' : 'glass-panel-sm'}`}
                    style={{
                      cursor: interactive ? 'pointer' : 'default',
                      borderRadius: '6px',
                      padding: '14px 12px',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
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
              color: '#c6d1db',
              textAlign: 'center',
              marginTop: '14px',
            }}
          >
            {activeModule ? activeModule.title : 'Select a module to explore'}
          </p>
        </div>

        <SideColumn label="Outputs" items={architectureOutputs} align="right" />
      </div>

      {activeModule && (
        <div
          className="glass-panel-sm mt-6 max-w-3xl mx-auto lg:mx-0"
          style={{
            borderRadius: '6px',
            padding: '16px 20px',
          }}
        >
          <p
            className="text-center lg:text-left"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              lineHeight: 1.65,
              color: '#586879',
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
