
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

const LandingPage = () => {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
};

export default LandingPage;
