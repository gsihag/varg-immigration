
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import FinalCTASection from '@/components/home/FinalCTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <HeroSection />

      <TestimonialsSection />

      <FeaturesSection />

      <ServicesSection />

      <FinalCTASection />

      {/* Disclaimer */}
      <section className="py-4 bg-slate-100">
        <div className="container mx-auto px-4">
          <Disclaimer />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
