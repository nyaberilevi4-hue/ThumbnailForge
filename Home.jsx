import React, { useState, useCallback } from 'react';
import Navbar from '@/Navbar';
import HeroSection from '@/HeroSection';
import HowItWorks from '@/HowItWorks';
import FeaturesSection from '@/FeaturesSection';
import TestimonialsSection from '@/TestimonialsSection';
import PricingSection from '@/PricingSection';
import DonationCTA from '@/DonationCTA';
import Footer from '@/Footer';

export default function Home() {
  const [heroKey, setHeroKey] = useState(0);

  const restartHero = useCallback(() => {
    setHeroKey(prev => prev + 1);
  }, []);

  return (
    <div className="bg-[#0B0B0B] min-h-screen">
      <Navbar onLogoClick={restartHero} />
      <HeroSection key={heroKey} />
      <DonationCTA />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}