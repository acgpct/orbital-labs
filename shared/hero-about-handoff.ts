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
  cloudBrightRgb: '248,251,252' as const,
  paper: '#ffffff',
  paperRgb: '255,255,255' as const,
  foam: '#f9fbfd',
  foamRgb: '249,251,253' as const,
} as const;

/** Section base tones — used for cross-section veil blends */
export const SECTION_TONES = {
  platform: HANDOFF.paper,
  platformRgb: HANDOFF.paperRgb,
  solutions: '#f4f6f8',
  solutionsRgb: '244,246,248' as const,
} as const;

/**
 * Top veil: opaque at the seam, feathering into the section (no hard horizontal line).
 */
export function cssSectionVeilTop(color: string, rgb: string): string {
  return `linear-gradient(to bottom,
    ${color} 0%,
    rgba(${rgb},0.97) 5%,
    rgba(${rgb},0.9) 12%,
    rgba(${rgb},0.76) 22%,
    rgba(${rgb},0.58) 34%,
    rgba(${rgb},0.38) 48%,
    rgba(${rgb},0.22) 60%,
    rgba(${rgb},0.1) 72%,
    rgba(${rgb},0.03) 84%,
    rgba(${rgb},0) 100%)`;
}

/**
 * Bottom veil: dissolves the section into the next tone below.
 */
export function cssSectionVeilBottom(color: string, rgb: string): string {
  return `linear-gradient(to bottom,
    rgba(${rgb},0) 0%,
    rgba(${rgb},0.04) 12%,
    rgba(${rgb},0.12) 24%,
    rgba(${rgb},0.24) 36%,
    rgba(${rgb},0.4) 48%,
    rgba(${rgb},0.58) 60%,
    rgba(${rgb},0.74) 72%,
    rgba(${rgb},0.88) 84%,
    rgba(${rgb},0.96) 93%,
    ${color} 100%)`;
}

/**
 * Soft bottom fade on the hero photo — replaces the hard horizon clip (no visible cut line).
 */
export function cssHeroPhotoMask(): string {
  return `linear-gradient(to bottom,
    #000 0%,
    #000 72%,
    rgba(0,0,0,0.92) 82%,
    rgba(0,0,0,0.72) 89%,
    rgba(0,0,0,0.42) 94%,
    rgba(0,0,0,0.12) 98%,
    transparent 100%)`;
}

/** Hero photo → HANDOFF.mist — smooth linear fade (avoids radial banding). */
export function cssHeroBottomFade(): string {
  const { mistRgb, mist } = HANDOFF;
  return `linear-gradient(to bottom,
    rgba(${mistRgb},0) 0%,
    rgba(${mistRgb},0.06) 40%,
    rgba(${mistRgb},0.22) 58%,
    rgba(${mistRgb},0.48) 74%,
    rgba(${mistRgb},0.72) 86%,
    ${mist} 96%,
    ${mist} 100%)`;
}

/** Platform top veil — radial feathering that matches the hero horizon arc. */
export function cssPlatformTopVeil(): string {
  const { mistRgb, mist, cloudBrightRgb } = HANDOFF;
  return `radial-gradient(ellipse 140% 95% at 50% 0%,
    ${mist} 0%,
    rgba(${mistRgb},0.88) 22%,
    rgba(${mistRgb},0.62) 42%,
    rgba(${mistRgb},0.34) 58%,
    rgba(${mistRgb},0.14) 72%,
    rgba(${cloudBrightRgb},0.04) 84%,
    rgba(${cloudBrightRgb},0) 100%)`;
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
