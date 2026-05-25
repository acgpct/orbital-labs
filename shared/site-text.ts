/** Readable text hierarchy — bumped for WCAG-friendly contrast on light backgrounds. */
export const TEXT = {
  primary: '#1e2830',
  body: '#414d56',
  muted: '#586879',
  subtle: '#687a86',
  /** Decorative / non-reading accents only */
  accent: '#92a4ac',
} as const;

/** Hero and other dark-overlay sections */
export const TEXT_ON_DARK = {
  primary: 'rgba(249,251,253,0.92)',
  secondary: 'rgba(249,251,253,0.78)',
  muted: 'rgba(249,251,253,0.55)',
} as const;
