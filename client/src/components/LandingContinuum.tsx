/*
 * Shared hero backdrop: one <img> behind the first viewport (Hero only; About follows Products in page order).
 */
import { useEffect, useRef } from 'react';
import { LANDING_HERO_IMAGE_URL } from '@shared/landing-hero';

const CONTINUUM_HEIGHT = '100dvh';

export default function LandingContinuum() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!layerRef.current) return;
      layerRef.current.style.transform = `translateY(${window.scrollY * 0.05}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full select-none"
      style={{
        height: CONTINUUM_HEIGHT,
        overflow: 'hidden',
      }}
      aria-hidden
    >
      <div ref={layerRef} className="h-full w-full will-change-transform" style={{ minHeight: CONTINUUM_HEIGHT }}>
        <img
          src={LANDING_HERO_IMAGE_URL}
          alt=""
          className="block h-full w-full object-cover"
          style={{
            objectPosition: 'center top',
            minHeight: '100%',
          }}
        />
      </div>
    </div>
  );
}
