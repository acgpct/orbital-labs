/*
 * ORBITAL LABS — Navbar
 * Mega-menus: Platform (stack & lifecycle) + Solutions (industry & buyers)
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { SolutionsMegaMenuPanel } from '@/components/SolutionsMegaMenu';
import { ProductsMegaMenuPanel } from '@/components/ProductsMegaMenu';
import { homeSection, navigateToHomeSection } from '@shared/site-nav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navMuted = scrolled ? '#586879' : 'rgba(198,209,219,0.85)';
  const navLogo = scrolled ? '#1e2830' : '#ffffff';

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openProducts = () => {
    clearCloseTimer();
    setSolutionsOpen(false);
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setProductsOpen(false), 160);
  };

  const openSolutions = () => {
    clearCloseTimer();
    setProductsOpen(false);
    setSolutionsOpen(true);
  };

  const scheduleCloseSolutions = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setSolutionsOpen(false), 160);
  };

  useEffect(() => {
    return clearCloseTimer;
  }, []);

  const closeAllMega = () => {
    clearCloseTimer();
    setProductsOpen(false);
    setSolutionsOpen(false);
    setMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileSolutionsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(88,104,121,0.1)' : '1px solid transparent',
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-7 h-7 flex-shrink-0">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="14" cy="14" r="3" fill={scrolled ? '#1e2830' : 'rgba(255,255,255,0.9)'} />
              <circle cx="14" cy="14" r="7" stroke={scrolled ? '#586879' : 'rgba(255,255,255,0.6)'} strokeWidth="1" fill="none" />
              <circle cx="14" cy="14" r="12" stroke={scrolled ? '#92a4ac' : 'rgba(255,255,255,0.3)'} strokeWidth="0.5" strokeDasharray="3 2" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Exo 2', sans-serif", color: navLogo, fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.3s ease' }}>
            Orbital Labs
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="relative" onMouseEnter={openProducts} onMouseLeave={scheduleCloseProducts}>
            <div className="flex items-center gap-1">
              <a
                href={homeSection('#products')}
                className="nav-link text-sm"
                style={{ color: navMuted, transition: 'color 0.3s ease' }}
                onClick={(e) => navigateToHomeSection('#products', e, () => setProductsOpen(false))}
              >
                Platform
              </a>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-controls="products-mega-panel"
                className="nav-link p-1 -m-1"
                style={{ color: navMuted }}
                onClick={() => setProductsOpen((o) => !o)}
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {productsOpen && (
              <div
                id="products-mega-panel"
                className="absolute left-1/2 z-50 w-[min(100vw-2rem,760px)] -translate-x-1/2 pt-3"
                onMouseEnter={openProducts}
                onMouseLeave={scheduleCloseProducts}
              >
                <div
                  className="rounded-sm border border-[rgba(88,104,121,0.12)] bg-[rgba(255,255,255,0.98)] shadow-2xl backdrop-blur-xl"
                  style={{ boxShadow: '0 24px 48px rgba(30,40,48,0.12)' }}
                >
                  <ProductsMegaMenuPanel onNavigate={() => setProductsOpen(false)} />
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={openSolutions} onMouseLeave={scheduleCloseSolutions}>
            <div className="flex items-center gap-1">
              <a
                href={homeSection('#solutions')}
                className="nav-link text-sm"
                style={{ color: navMuted, transition: 'color 0.3s ease' }}
                onClick={(e) => navigateToHomeSection('#solutions', e, () => setSolutionsOpen(false))}
              >
                Solutions
              </a>
              <button
                type="button"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                aria-controls="solutions-mega-panel"
                className="nav-link p-1 -m-1"
                style={{ color: navMuted }}
                onClick={() => setSolutionsOpen((o) => !o)}
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {solutionsOpen && (
              <div
                id="solutions-mega-panel"
                className="absolute left-1/2 z-50 w-[min(100vw-2rem,1100px)] -translate-x-1/2 pt-3"
                onMouseEnter={openSolutions}
                onMouseLeave={scheduleCloseSolutions}
              >
                <div
                  className="rounded-sm border border-[rgba(88,104,121,0.12)] bg-[rgba(255,255,255,0.98)] shadow-2xl backdrop-blur-xl"
                  style={{ boxShadow: '0 24px 48px rgba(30,40,48,0.12)' }}
                >
                  <SolutionsMegaMenuPanel onNavigate={() => setSolutionsOpen(false)} />
                </div>
              </div>
            )}
          </div>

          <a
            href={homeSection('#about')}
            className="nav-link text-sm"
            style={{ color: navMuted, transition: 'color 0.3s ease' }}
            onClick={(e) => navigateToHomeSection('#about', e)}
          >
            About
          </a>
          <a
            href={homeSection('#contact')}
            className="nav-link text-sm"
            style={{ color: navMuted, transition: 'color 0.3s ease' }}
            onClick={(e) => navigateToHomeSection('#contact', e)}
          >
            Contact
          </a>
          <a
            href={homeSection('#contact-form')}
            className="btn-primary text-xs py-2 px-5"
            onClick={(e) => navigateToHomeSection('#contact-form', e)}
            style={{
              background: scrolled ? 'transparent' : 'rgba(255,255,255,0.1)',
              border: scrolled ? '1px solid rgba(88,104,121,0.35)' : '1px solid rgba(255,255,255,0.25)',
              color: scrolled ? '#1e2830' : '#f9fbfd',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
          >
            Get in Touch
          </a>
        </div>

        <button type="button" className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className="block w-5 h-px transition-all duration-200" style={{ background: '#586879', transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }} />
          <span className="block w-5 h-px transition-all duration-200" style={{ background: '#586879', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-px transition-all duration-200" style={{ background: '#586879', transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu — fixed below navbar so page content cannot intercept taps */}
      <div
        className="md:hidden fixed left-0 right-0 top-16 overflow-hidden transition-all duration-300 z-[60]"
        style={{
          maxHeight: menuOpen ? '1600px' : '0',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: menuOpen ? '1px solid rgba(88,104,121,0.1)' : 'none',
        }}
      >
        <div className="container py-4 flex flex-col gap-3">
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between nav-link text-sm py-1 text-left"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              aria-expanded={mobileProductsOpen}
            >
              Platform
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileProductsOpen && (
              <div className="mt-3 pl-2 border-l border-[rgba(88,104,121,0.15)]">
                <ProductsMegaMenuPanel variant="stacked" onNavigate={closeAllMega} />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between nav-link text-sm py-1 text-left"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              aria-expanded={mobileSolutionsOpen}
            >
              Solutions
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileSolutionsOpen && (
              <div className="mt-3 pl-2 border-l border-[rgba(88,104,121,0.15)]">
                <SolutionsMegaMenuPanel variant="stacked" onNavigate={closeAllMega} />
              </div>
            )}
          </div>
          <a
            href={homeSection('#about')}
            className="nav-link text-sm py-1"
            onClick={(e) => navigateToHomeSection('#about', e, closeAllMega)}
          >
            About
          </a>
          <a
            href={homeSection('#contact')}
            className="nav-link text-sm py-1"
            onClick={(e) => navigateToHomeSection('#contact', e, closeAllMega)}
          >
            Contact
          </a>
          <a
            href={homeSection('#contact-form')}
            className="btn-primary text-xs py-2 px-5 self-start mt-1"
            onClick={(e) => navigateToHomeSection('#contact-form', e, closeAllMega)}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
