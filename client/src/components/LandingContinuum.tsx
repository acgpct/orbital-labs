/*
 * Shared hero backdrop: one <img> behind the first viewport (Hero only; About follows Products in page order).
 */
import { useEffect, useRef } from 'react';
import { LANDING_HERO_IMAGE_URL } from '@shared/landing-hero';
import { cssHeroPhotoMask } from '@shared/hero-about-handoff';

const CONTINUUM_HEIGHT = '100dvh';
/** Taller image box = slightly zoomed out, showing more of the fog / figure at the bottom. */
const HERO_IMAGE_HEIGHT = '122%';
const heroPhotoMask = cssHeroPhotoMask();

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
      <div
        ref={layerRef}
        className="h-full w-full will-change-transform"
        style={{ minHeight: CONTINUUM_HEIGHT }}
      >
        <img
          src={LANDING_HERO_IMAGE_URL}
          alt=""
          className="block w-full object-cover"
          style={{
            height: HERO_IMAGE_HEIGHT,
            minHeight: HERO_IMAGE_HEIGHT,
            objectPosition: 'center top',
            WebkitMaskImage: heroPhotoMask,
            maskImage: heroPhotoMask,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  );
}
