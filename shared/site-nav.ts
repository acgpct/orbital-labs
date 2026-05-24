/** Home-page section link that works from any route (e.g. /platform/architecture). */
export function homeSection(hash: string): string {
  const normalized = hash.startsWith('#') ? hash : `#${hash}`;
  return `/${normalized}`;
}

/** Navigate to a home section from any route (SPA-safe). */
export function navigateToHomeSection(
  hash: string,
  e?: { preventDefault(): void },
  afterNavigate?: () => void,
): void {
  const section = hash.startsWith('#') ? hash : `#${hash}`;
  afterNavigate?.();

  if (window.location.pathname !== '/') {
    e?.preventDefault();
    window.location.assign(`/${section}`);
    return;
  }

  e?.preventDefault();
  window.history.replaceState(null, '', section);
  requestAnimationFrame(() => {
    document.getElementById(section.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
