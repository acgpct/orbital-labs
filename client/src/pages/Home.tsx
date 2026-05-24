/*
 * ORBITAL LABS — Home Page
 * Stripe-like flow: Hero → Platform → Architecture → Solutions → About → Contact
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import IndustrySection from '@/components/IndustrySection';
import ProductsSection from '@/components/ProductsSection';
import PlatformArchitectureSection from '@/components/PlatformArchitectureSection';
import ContactSection from '@/components/ContactSection';
import LandingContinuum from '@/components/LandingContinuum';
import { HANDOFF } from '@shared/hero-about-handoff';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.startsWith('#module-') || hash.startsWith('#product-')) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <div style={{ background: HANDOFF.mist }}>
      <Navbar />
      <div className="relative w-full overflow-x-clip">
        <LandingContinuum />
        <HeroSection />
      </div>
      <ProductsSection />
      <PlatformArchitectureSection />
      <IndustrySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
