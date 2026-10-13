import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { initGA } from './lib/analytics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CNMSSection } from './sections/CNMSSection';
import { OperationsAdvisorSection } from './sections/OperationsAdvisorSection';
import { Benefits } from './components/Benefits';
import { DemoForm } from './components/DemoForm';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [selectedDemoProduct, setSelectedDemoProduct] = useState<'cnms_v2' | 'operations_advisor' | 'both'>('both');

  useEffect(() => {
    // Initialise Google Analytics 4 (gracefully no-ops if VITE_GA_MEASUREMENT_ID is missing)
    initGA();
  }, []);

  const handleNavigate = (sectionId: string) => {
    scrollTo(`#${sectionId}`, -60);
  };

  const handleRequestDemo = (product: 'cnms_v2' | 'operations_advisor' | 'both' = 'both') => {
    setSelectedDemoProduct(product);
    scrollTo('#contact', -60);
  };

  return (
    <div className="min-h-screen bg-obsidian text-snow flex flex-col font-sans selection:bg-cyan-electric/20 selection:text-cyan-electric">
      {/* Top Fixed Navigation */}
      <Navbar onNavigate={handleNavigate} onRequestDemo={handleRequestDemo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section A: Video-First Hero Experience */}
        <Hero onNavigate={handleNavigate} onRequestDemo={handleRequestDemo} />

        {/* Section D: CNMS v2.0 Satellite & Telemetry Experience */}
        <CNMSSection onRequestDemo={handleRequestDemo} />

        {/* Section E: Operations Advisor 3D Cognitive Experience */}
        <OperationsAdvisorSection onRequestDemo={handleRequestDemo} />

        {/* Section F: Portfolio Benefits */}
        <Benefits />

        {/* Section G: Creative 3D Contact Section */}
        <DemoForm initialProduct={selectedDemoProduct} />
      </main>

      {/* Section H: Giant Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
