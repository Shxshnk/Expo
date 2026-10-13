import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  FileText,
  Zap,
  ArrowRight,
  ShieldCheck,
  Bot,
} from 'lucide-react';
import { NeuralSphere3D } from '../components/3d/NeuralSphere3D';
import { trackProductSectionView, trackProductCTAClick } from '../lib/analytics';

interface OperationsAdvisorSectionProps {
  onRequestDemo: (product: 'operations_advisor') => void;
}

export const OperationsAdvisorSection: React.FC<OperationsAdvisorSectionProps> = ({ onRequestDemo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPillar, setSelectedPillar] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackProductSectionView('operations_advisor');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      title: "Contextual Incident Investigation",
      summary: "Correlates multi-tier telemetry alerts with historical incident records to accelerate root-cause analysis during live operational shifts.",
      icon: <BrainCircuit className="w-5 h-5 text-indigo-vibrant" />,
      detail: "Assists duty engineers by synthesizing disparate telemetry logs into clear, actionable incident summaries without displacing human oversight."
    },
    {
      title: "Standard Procedure Retrieval",
      summary: "Instantly surfaces approved standard operating procedures (SOPs), manuals, and switchover checklists tailored to current equipment state.",
      icon: <FileText className="w-5 h-5 text-indigo-vibrant" />,
      detail: "Eliminates manual manual-hunting during time-critical waveguide, transponder, or antenna failovers."
    },
    {
      title: "Early Warning Anomaly Detection",
      summary: "Surfaces subtle pattern drifts across RF gain, humidity, and carrier tracking before alarms reach critical shutdown thresholds.",
      icon: <Zap className="w-5 h-5 text-indigo-vibrant" />,
      detail: "Provides operational teams with proactive warning windows to perform controlled maintenance."
    },
    {
      title: "Human-in-the-Loop Decision Augmentation",
      summary: "Provides structured technical recommendations while ensuring all control actions require explicit authorized human approval.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-vibrant" />,
      detail: "Enterprise-grade governance preserving strict operational safety protocols across ground station infrastructure."
    }
  ];

  return (
    <section
      id="operations-advisor"
      ref={sectionRef}
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#060914] border-b border-[#1E2D4A]/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-indigo-vibrant/10 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-vibrant/15 border border-indigo-vibrant/30 text-indigo-300 text-tech-label uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-vibrant" />
              <span>02 // COGNITIVE OPERATIONAL ASSISTANCE</span>
            </div>

            <h2 className="text-section-title text-white tracking-tight mb-3">
              Operations Advisor
            </h2>

            <p className="font-sans font-medium text-lg sm:text-xl text-indigo-300 mb-4">
              &ldquo;Operational Intelligence, Made Accessible.&rdquo;
            </p>

            <p className="text-body-lead text-mutedgrey max-w-2xl font-normal">
              AI-assisted operational insights to help teams explore information and support better decisions. Synthesizes telemetry patterns and standard operating procedures to empower duty engineers.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                trackProductCTAClick('operations_advisor', 'product_section');
                onRequestDemo('operations_advisor');
              }}
              className="px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-indigo-vibrant text-white hover:bg-white hover:text-obsidian transition-all shadow-[0_0_20px_rgba(113,103,255,0.3)] flex items-center gap-2"
            >
              <span>REQUEST AN OPERATIONS ADVISOR DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Major Composition: Split-Screen with 3D Neural Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: 3D Dimensional Neural Sphere */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="w-full aspect-square max-w-lg rounded-3xl bg-[#090D1F] border border-[#1E2D4A] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between cinematic-glow-indigo">
              <div className="flex items-center justify-between text-tech-label text-indigo-300 z-10">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-indigo-vibrant" />
                  <span>3D NEURAL COGNITIVE MESH</span>
                </span>
                <span className="text-mutedgrey">INTERACTIVE TOPOLOGY</span>
              </div>

              {/* 3D Neural Sphere Canvas */}
              <div className="flex-1 w-full my-auto">
                <NeuralSphere3D />
              </div>

              <div className="flex items-center justify-between text-tech-label text-mutedgrey pt-2 border-t border-[#1E2D4A]/60 z-10">
                <span>SYNAPSE NODES: 140 COGNITIVE VERTICES</span>
                <span className="text-cyan-electric">POINTER-RESPONSIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Intelligence Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-tech-label text-mutedgrey uppercase block mb-4">
              Core Cognitive Intelligence Pillars
            </span>

            {pillars.map((pillar, idx) => {
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPillar(idx)}
                  className={`cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#0E132B] border-indigo-vibrant shadow-[0_0_30px_rgba(113,103,255,0.15)] translate-x-1.5'
                      : 'bg-[#080D1D]/70 border-[#1E2D4A]/70 hover:border-indigo-vibrant/40 text-mutedgrey'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-obsidian border border-[#1E2D4A] shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className={`text-base font-display font-semibold mb-1.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-mutedgrey leading-relaxed mb-2 font-normal">
                        {pillar.summary}
                      </p>
                      {isSelected && (
                        <p className="font-sans text-xs sm:text-sm text-indigo-200 pt-2 border-t border-[#1E2D4A]/60 leading-relaxed font-normal">
                          {pillar.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In-Depth Cognitive Capabilities Closing Action */}
        <div className="pt-10 border-t border-[#1E2D4A]/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
              Ready to Accelerate Operational Investigation?
            </h4>
            <p className="text-xs sm:text-sm text-mutedgrey font-sans font-normal">
              Schedule an interactive briefing with our cognitive AI engineering team at the Expo.
            </p>
          </div>

          <button
            onClick={() => {
              trackProductCTAClick('operations_advisor', 'product_section');
              onRequestDemo('operations_advisor');
            }}
            className="px-8 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-indigo-vibrant text-white hover:bg-white hover:text-obsidian transition-all shadow-[0_0_20px_rgba(113,103,255,0.3)] flex items-center gap-2 shrink-0"
          >
            <span>REQUEST AN OPERATIONS ADVISOR DEMO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

