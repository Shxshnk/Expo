import React, { useEffect, useRef, useState } from 'react';
import {
  Radio,
  Globe2,
  Server,
  AlertTriangle,
  LineChart,
  Activity,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { trackProductSectionView, trackProductCTAClick } from '../lib/analytics';

interface CNMSSectionProps {
  onRequestDemo: (product: 'cnms_v2') => void;
}

export const CNMSSection: React.FC<CNMSSectionProps> = ({ onRequestDemo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackProductSectionView('cnms_v2');
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

  const capabilities = [
    {
      id: 'dashboard',
      number: '01',
      title: 'Centralised Dashboard',
      subtitle: 'Single-Pane Operational Visibility',
      description:
        'Aggregates real-time telemetry from distributed space and ground segments into a high-density operational console with system health scoring, live throughput counters, and critical equipment status.',
      telemetry: { label: 'Active Ingest Rate', value: '48.2k msg/s', status: 'Optimal' },
      icon: <Activity className="w-5 h-5 text-cyan-electric" />,
      screenshot: '/img/Dashboard.png',
    },
    {
      id: 'topology',
      number: '02',
      title: 'Network Topology',
      subtitle: 'Dynamic Interconnect & Link Mapping',
      description:
        'Interactive visual mapping of switches, transponders, waveguides, and carrier links with live route status, signal quality indicators, and automated failover detection.',
      telemetry: { label: 'Topology Nodes', value: '1,420 Vertices', status: 'Synced' },
      icon: <Radio className="w-5 h-5 text-cyan-electric" />,
      screenshot: '/img/Network Topolgy.png',
    },
    {
      id: 'earthstation',
      number: '03',
      title: 'Earth Station Maps',
      subtitle: 'Geospatial Ground Segment Tracking',
      description:
        'Precise geospatial tracking of satellite ground stations and antennas worldwide. Displays antenna azimuth, elevation, carrier locks, weather telemetry, and orbital footprints in real time.',
      telemetry: { label: 'Tracking Azimuth', value: '142.84° Az / 54.12° El', status: 'Locked' },
      icon: <Globe2 className="w-5 h-5 text-cyan-electric" />,
      screenshot: '/img/Earth station map.png',
    },
    {
      id: 'inventory',
      number: '04',
      title: 'Device Inventory & Details',
      subtitle: 'Comprehensive Asset Governance',
      description:
        'Granular hardware asset intelligence detailing chassis configurations, IP registers, transceiver health, firmware versions, uptime logs, and interface port metrics across modems and RF gear.',
      telemetry: { label: 'Discovered Assets', value: '4,890 Devices', status: 'Audited' },
      icon: <Server className="w-5 h-5 text-cyan-electric" />,
      screenshot: '/img/Device inventory details.png',
    },
    {
      id: 'alerts',
      number: '05',
      title: 'Alerts and Live Events',
      subtitle: 'Sub-Second Event Ingestion & Triage',
      description:
        'Real-time incident bus streaming sub-second SNMP traps, automated severity classification (Critical, Major, Minor), root-cause diagnostics, and actionable operator dispatch workflows.',
      telemetry: { label: 'Event Classification', value: '0 Critical / 3 Minor', status: 'Normal' },
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      screenshot: '/img/Alerts and live events.png',
    },
    {
      id: 'performance',
      number: '06',
      title: 'Performance Monitoring',
      subtitle: 'Deep Telemetry & RF Analytics',
      description:
        'Continuous RF and carrier analytics monitoring carrier-to-noise density (C/N0), Eb/N0 margins, bit error rates (BER), waveguide attenuation, and historical link efficiency graphs.',
      telemetry: { label: 'Downlink Eb/N0', value: '14.6 dB Nominal', status: 'Clear Margin' },
      icon: <LineChart className="w-5 h-5 text-emerald-400" />,
      screenshot: '/img/Performance.png',
    },
  ];

  const activeCap = capabilities[activeCapability];

  return (
    <section
      id="cnms"
      ref={sectionRef}
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-[#1E2D4A]/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-cyan-electric/5 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -left-48 w-[500px] h-[500px] bg-indigo-vibrant/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/10 border border-cyan-electric/25 text-cyan-electric text-tech-label uppercase mb-5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>01 // SATELLITE & NETWORK TELEMETRY</span>
            </div>

            <h2 className="text-section-title text-white tracking-tight mb-3">
              CNMS v2.0
            </h2>

            <p className="font-sans font-medium text-lg sm:text-xl text-cyan-electric mb-4">
              &ldquo;Monitor. Control. Optimize.&rdquo;
            </p>

            <p className="text-body-lead text-mutedgrey max-w-2xl font-normal">
              Complete network visibility in one unified platform. Designed for mission-critical satellite operators, earth stations, and high-reliability telecom networks.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                trackProductCTAClick('cnms_v2', 'product_section');
                onRequestDemo('cnms_v2');
              }}
              className="px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-cyan-electric text-obsidian hover:bg-white transition-all shadow-[0_0_20px_rgba(69,216,255,0.3)] flex items-center gap-2"
            >
              <span>REQUEST A CNMS DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Screenshot-Led Capability Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Capability List Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-tech-label text-mutedgrey uppercase">
                Verified Product Capabilities
              </span>
              <span className="text-tech-label text-cyan-electric">
                Select to Inspect
              </span>
            </div>

            {capabilities.map((cap, index) => {
              const isSelected = activeCapability === index;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveCapability(index)}
                  className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#0E172B] border-cyan-electric shadow-[0_0_25px_rgba(69,216,255,0.12)] translate-x-1.5'
                      : 'bg-[#070D18]/70 border-[#1E2D4A]/70 hover:border-cyan-electric/40 text-mutedgrey hover:bg-[#0A1222]/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-semibold transition-colors ${
                          isSelected ? 'text-cyan-electric' : 'text-mutedgrey group-hover:text-cyan-electric/70'
                        }`}
                      >
                        {cap.number}
                      </span>
                      <h4
                        className={`text-base font-display font-semibold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {cap.title}
                      </h4>
                    </div>
                    <div>{cap.icon}</div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-[#1E2D4A]/60 animate-fadeIn">
                      <p className="font-sans text-xs sm:text-sm text-mutedgrey leading-relaxed font-normal">
                        {cap.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Real Screenshot-Led Interactive Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#091122] border border-[#1E2D4A] p-5 sm:p-7 shadow-2xl overflow-hidden reticle-bracket">
              {/* Header Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1E2D4A]/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-electric animate-ping" />
                  <span className="text-white font-mono text-xs font-semibold tracking-wide">
                    CNMS v2.0 // VERIFIED INTERFACE
                  </span>
                </div>
                <span className="text-tech-label text-cyan-electric uppercase">
                  [{activeCap.number}/06] {activeCap.title}
                </span>
              </div>

              {/* Status & Telemetry Metadata Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-obsidian/80 border border-[#1E2D4A]">
                  <span className="text-[10px] font-mono text-mutedgrey block uppercase tracking-wider">Metric Monitored</span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-white block mt-0.5 truncate">
                    {activeCap.telemetry.label}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian/80 border border-[#1E2D4A]">
                  <span className="text-[10px] font-mono text-mutedgrey block uppercase tracking-wider">Current Telemetry</span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-cyan-electric block mt-0.5 truncate">
                    {activeCap.telemetry.value}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian/80 border border-[#1E2D4A] col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-mutedgrey block uppercase tracking-wider">Health State</span>
                  <span className="text-xs sm:text-sm font-mono font-medium text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeCap.telemetry.status}</span>
                  </span>
                </div>
              </div>

              {/* Authentic Product Screenshot Display Frame */}
              <div className="relative rounded-2xl bg-[#050A14] border border-[#1E2D4A]/80 overflow-hidden shadow-inner">
                {/* Visual Grid Backdrop */}
                <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-10" />

                {/* Actual CNMS Screenshot */}
                <img
                  key={activeCap.id}
                  src={activeCap.screenshot}
                  alt={`CNMS v2.0 - ${activeCap.title} interface capture`}
                  className="w-full h-auto object-contain max-h-[420px] select-none"
                  loading="lazy"
                />

                {/* Watermark Tag */}
                <div className="absolute bottom-3 right-3 text-tech-label text-cyan-electric bg-obsidian/85 px-2.5 py-1 rounded border border-cyan-electric/25 backdrop-blur-md z-20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric" />
                  <span>AUTHENTIC CNMS v2.0 CAPTURE</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="mt-4 flex items-center justify-between text-xs font-sans text-mutedgrey">
                <span className="font-medium text-slate-300">{activeCap.subtitle}</span>
                <span className="hidden sm:inline text-mutedgrey/80">Captured directly from enterprise deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Action / Call to Action */}
        <div className="pt-10 border-t border-[#1E2D4A]/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
              Ready to Upgrade Your Network Observability?
            </h4>
            <p className="text-xs sm:text-sm text-mutedgrey font-sans font-normal">
              Discuss enterprise deployments with our engineering team at the Expo.
            </p>
          </div>

          <button
            onClick={() => {
              trackProductCTAClick('cnms_v2', 'product_section');
              onRequestDemo('cnms_v2');
            }}
            className="px-8 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-cyan-electric text-obsidian hover:bg-white transition-all shadow-[0_0_20px_rgba(69,216,255,0.3)] flex items-center gap-2 shrink-0"
          >
            <span>REQUEST A CNMS DEMO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};



