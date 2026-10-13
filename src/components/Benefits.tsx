import React from 'react';
import { Eye, Workflow, Compass, Shield } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      number: '01',
      icon: <Eye className="w-6 h-6 text-cyan-electric" />,
      title: "Greater Visibility",
      subtitle: "Unified Infrastructure Observability",
      description: "Review relevant product information through clear, structured interfaces.",
      detail: "Eliminates fragmented operational blind spots across multi-vendor satellite earth stations and complex carrier routing.",
    },
    {
      number: '02',
      icon: <Workflow className="w-6 h-6 text-indigo-vibrant" />,
      title: "Smarter Workflows",
      subtitle: "Operational Team Support",
      description: "Explore tools designed to support operational teams.",
      detail: "Coordinates telemetry alerts, scheduled maintenance windows, and standard switchover procedures into structured operator workflows.",
    },
    {
      number: '03',
      icon: <Compass className="w-6 h-6 text-cyan-electric" />,
      title: "Informed Decisions",
      subtitle: "Contextual Telemetry Correlation",
      description: "Access relevant information to support investigation and planning.",
      detail: "Provides engineering leaders and ground operators with reliable, correlated data to analyze anomalies without guesswork.",
    }
  ];

  return (
    <section id="benefits" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-[#1E2D4A]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1020] border border-[#1E2D4A] text-cyan-electric text-tech-label uppercase mb-5">
            <Shield className="w-3.5 h-3.5" />
            <span>PORTFOLIO VALUE FOUNDATION</span>
          </div>
          <h2 className="text-section-title text-white tracking-tight mb-4">
            Built to Support Better Operations
          </h2>
          <p className="text-body-lead text-mutedgrey font-normal">
            Engineered from real operational needs to give mission-critical teams dependable clarity, responsive coordination, and grounded intelligence.
          </p>
        </div>

        {/* Asymmetric Editorial Three-Column Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-[#09101E] border border-[#1E2D4A] p-7 sm:p-9 flex flex-col justify-between hover:border-cyan-electric/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-white/20 group-hover:text-cyan-electric/35 transition-colors">
                    {b.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-obsidian border border-[#1E2D4A]">
                    {b.icon}
                  </div>
                </div>

                <span className="text-tech-label uppercase text-cyan-electric block mb-2">
                  {b.subtitle}
                </span>

                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3">
                  {b.title}
                </h3>

                <p className="font-sans text-sm font-medium text-slate-200 mb-2.5 leading-relaxed">
                  {b.description}
                </p>

                <p className="font-sans text-xs sm:text-sm text-mutedgrey leading-relaxed font-normal">
                  {b.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1E2D4A]/60 flex items-center justify-between text-tech-label text-mutedgrey">
                <span>PILLAR {b.number}</span>
                <span className="text-cyan-electric font-semibold">COMMEDIA VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
