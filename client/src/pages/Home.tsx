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

export default function Home() {
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
