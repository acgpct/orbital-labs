/**
 * Hero ↔ About: one smooth tonal rail (many stops = no visible banding).
 */
export const HANDOFF = {
  mist: '#e5eef4',
  /** Extra intermediates for silkier gradients */
  mistSoft: '#e9f0f4',
  haze: '#edf3f7',
  hazeLift: '#f0f6f9',
  cloud: '#f4f9fb',
  cloudBright: '#f8fbfc',
  mistRgb: '229,238,244' as const,
  paper: '#ffffff',
} as const;

/** Hero photo → HANDOFF.mist (opaque at bottom edge, long transparent head). */
export function cssHeroBottomFade(): string {
  const { mistRgb, mist } = HANDOFF;
  return `linear-gradient(to bottom,
    rgba(${mistRgb},0) 0%,
    rgba(${mistRgb},0) 34%,
    rgba(${mistRgb},0.04) 40%,
    rgba(${mistRgb},0.1) 48%,
    rgba(${mistRgb},0.2) 58%,
    rgba(${mistRgb},0.36) 68%,
    rgba(${mistRgb},0.54) 77%,
    rgba(${mistRgb},0.72) 86%,
    rgba(${mistRgb},0.88) 94%,
    ${mist} 100%)`;
}

/** About section: continues the same rail into white (slow, no cliff). */
export function cssAboutSectionGradient(): string {
  const { mist, mistSoft, haze, hazeLift, cloud, cloudBright, paper } = HANDOFF;
  return `linear-gradient(to bottom,
    ${mist} 0%,
    ${mistSoft} 6%,
    ${haze} 14%,
    ${hazeLift} 24%,
    ${cloud} 36%,
    ${cloudBright} 50%,
    #fafcfd 64%,
    #fcfdfe 78%,
    ${paper} 90%,
    ${paper} 100%)`;
}
