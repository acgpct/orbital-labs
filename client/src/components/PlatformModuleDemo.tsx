/*
 * ORBITAL LABS — Platform module product demo
 * featured: full-width block on /platform/architecture
 * sidebar: sticky right column beside lifecycle list (#products)
 */
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  resolveDemoModule,
  resolveDemoVideo,
  type CoreModuleId,
} from '@shared/platform-architecture';

const labelStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.52rem',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#414d56',
};

type Props = {
  moduleId: CoreModuleId | null;
  variant?: 'featured' | 'sidebar';
};

export default function PlatformModuleDemo({ moduleId, variant = 'featured' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSidebar = variant === 'sidebar';
  const displayModule = resolveDemoModule(moduleId);
  const videoSrc = resolveDemoVideo(moduleId);
  const videoKey = moduleId === 'asset-management' ? 'asset-management' : 'pipeline-spv';

  useEffect(() => {
    if (isSidebar || moduleId !== 'asset-management' || !sectionRef.current) return;
    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [moduleId, isSidebar]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, [videoKey, isSidebar, videoSrc]);

  const title = displayModule.title;
  const summary = displayModule.summary;

  const shellStyle: CSSProperties = isSidebar
    ? {
        borderRadius: '6px',
        padding: 'clamp(16px, 2.5vw, 22px)',
      }
    : {
        marginTop: 'clamp(28px, 4vw, 40px)',
        marginBottom: 'clamp(28px, 5vw, 40px)',
        borderRadius: '6px',
        padding: 'clamp(20px, 3vw, 28px) clamp(18px, 2.5vw, 24px)',
      };

  const videoStyle: CSSProperties = isSidebar
    ? {
        aspectRatio: '3554 / 1718',
        maxHeight: 'min(42vh, 380px)',
        objectFit: 'contain' as const,
        background: '#1e2830',
      }
    : {
        aspectRatio: '3554 / 1718',
        maxHeight: 'min(72vh, 640px)',
        objectFit: 'contain' as const,
        background: '#1e2830',
      };

  return (
    <section
      ref={sectionRef}
      aria-label={`${title} product demo`}
      className={`glass-panel scroll-mt-28 ${isSidebar ? 'lg:sticky lg:top-28' : ''}`}
      style={shellStyle}
    >
      <div style={{ marginBottom: 'clamp(12px, 2vw, 16px)' }}>
        <p style={{ ...labelStyle, marginBottom: '8px' }}>Product demo</p>
        <h2
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 300,
            fontSize: isSidebar ? 'clamp(0.95rem, 1.6vw, 1.15rem)' : 'clamp(1.05rem, 2vw, 1.35rem)',
            letterSpacing: '0.04em',
            color: '#1e2830',
            margin: '0 0 8px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isSidebar ? '0.74rem' : '0.78rem',
            lineHeight: 1.55,
            color: '#414d56',
            fontWeight: 300,
            margin: 0,
          }}
        >
          {summary}
        </p>
      </div>

      <div
        className="glass-panel-inset overflow-hidden"
        style={{ borderRadius: '4px', padding: isSidebar ? '6px' : 'clamp(8px, 1.2vw, 10px)' }}
      >
        <video
          ref={videoRef}
          key={videoKey}
          className="block w-full rounded-[2px]"
          style={videoStyle}
          src={videoSrc}
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${title} demo recording`}
        />
      </div>
    </section>
  );
}
