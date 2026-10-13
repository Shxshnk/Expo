import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import { Radio, Sparkles, ArrowRight, ArrowDown, Bot, Info } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { trackProductCTAClick } from '../lib/analytics';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onRequestDemo: (product?: 'cnms_v2' | 'operations_advisor' | 'both') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onRequestDemo }) => {
  const [hasAdvisorVideo, setHasAdvisorVideo] = useState(false);

  // Probe for operations-advisor.mp4 video file
  useEffect(() => {
    fetch('/videos/operations-advisor.mp4', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && (contentType.includes('video') || contentType.includes('application/octet-stream'))) {
          setHasAdvisorVideo(true);
        } else {
          setHasAdvisorVideo(false);
        }
      })
      .catch(() => {
        setHasAdvisorVideo(false);
      });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
      targets: '.hero-badge-reveal',
      opacity: [0, 1],
      translateY: [-16, 0],
      duration: 700,
    })
    .add({
      targets: '.hero-title-reveal',
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 800,
    }, '-=400')
    .add({
      targets: '.hero-sub-reveal',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
    }, '-=500')
    .add({
      targets: '.hero-video-card',
      opacity: [0, 1],
      translateY: [32, 0],
      delay: anime.stagger(150),
      duration: 900,
    }, '-=400');
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-obsidian grid-overlay"
    >
      {/* Subtle atmospheric ambient glow in background (non-distracting) */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[500px] bg-cyan-electric/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[500px] bg-indigo-vibrant/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="hero-badge-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A1020]/90 border border-cyan-electric/30 text-cyan-electric text-tech-label uppercase mb-5 backdrop-blur-md shadow-[0_0_15px_rgba(69,216,255,0.12)]">
          <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping" />
          <span>COMMEDIA SOLUTIONS / EXPO 2026 // PRODUCT SHOWCASE</span>
        </div>

        {/* Short Hero Headline */}
        <h1 className="hero-title-reveal text-hero text-white max-w-4xl mb-4">
          See Our Technology in Action.
        </h1>

        {/* Supporting text */}
        <p className="hero-sub-reveal text-body-lead text-mutedgrey max-w-2xl font-normal mb-12">
          Explore Commedia Solutions through our product demonstrations.
        </p>

        {/* Two Large Product Video Panels (Side by Side on Desktop) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 text-left">
          {/* PANEL 01: CNMS v2.0 */}
          <div className="hero-video-card flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#080E1C] border border-[#1E2D4A] shadow-2xl relative overflow-hidden reticle-bracket hover:border-cyan-electric/50 transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/10 text-cyan-electric text-tech-label uppercase border border-cyan-electric/25">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>CNMS v2.0</span>
                </div>
                <span className="text-tech-label text-mutedgrey uppercase">
                  VIDEO DEMONSTRATION
                </span>
              </div>

              <h2 className="text-product-title text-white mb-1.5">
                CNMS v2.0
              </h2>

              <p className="font-sans font-medium text-base text-cyan-electric mb-3">
                &ldquo;Monitor. Control. Optimize.&rdquo;
              </p>

              <p className="font-sans text-xs sm:text-sm text-mutedgrey leading-relaxed mb-6 font-normal">
                Complete network visibility in one unified platform. Live satellite earth station tracking, network topology mapping, and real-time RF alarms.
              </p>

              {/* Video Player Component */}
              <div className="relative mb-6">
                <VideoPlayer
                  src="/videos/CNMS.mp4"
                  title="CNMS v2.0 | Product Demonstration"
                  productName="cnms_v2"
                  className="w-full aspect-video rounded-2xl shadow-2xl border border-[#1E2D4A] cinematic-glow"
                />
              </div>
            </div>

            {/* Panel CTAs */}
            <div className="pt-4 border-t border-[#1E2D4A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  trackProductCTAClick('cnms_v2', 'hero');
                  onRequestDemo('cnms_v2');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-cyan-electric text-obsidian hover:bg-white transition-all shadow-[0_0_20px_rgba(69,216,255,0.3)] flex items-center justify-center gap-2"
              >
                <span>Request a CNMS Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('cnms')}
                className="font-sans text-xs sm:text-sm font-medium text-mutedgrey hover:text-cyan-electric transition-colors flex items-center gap-1.5"
              >
                <span>Explore Capabilities</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* PANEL 02: Operations Advisor */}
          <div className="hero-video-card flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#090D1F] border border-[#1E2D4A] shadow-2xl relative overflow-hidden reticle-bracket hover:border-indigo-vibrant/50 transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-vibrant/15 text-indigo-300 text-tech-label uppercase border border-indigo-vibrant/30">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-vibrant" />
                  <span>OPERATIONS ADVISOR</span>
                </div>
                <span className="text-tech-label text-mutedgrey uppercase">
                  {hasAdvisorVideo ? 'VIDEO DEMONSTRATION' : 'PRODUCT PREVIEW'}
                </span>
              </div>

              <h2 className="text-product-title text-white mb-1.5">
                Operations Advisor
              </h2>

              <p className="font-sans font-medium text-base text-indigo-300 mb-3">
                &ldquo;Operational Intelligence, Made Accessible.&rdquo;
              </p>

              <p className="font-sans text-xs sm:text-sm text-mutedgrey leading-relaxed mb-6 font-normal">
                AI-assisted operational insights to help teams explore information and support better decisions across distributed space and enterprise networks.
              </p>

              {/* Video Player or Polished Product Preview Panel */}
              <div className="relative mb-6">
                {hasAdvisorVideo ? (
                  <VideoPlayer
                    src="/videos/operations-advisor.mp4"
                    title="Operations Advisor | Product Demonstration"
                    productName="operations_advisor"
                    className="w-full aspect-video rounded-2xl shadow-2xl border border-[#1E2D4A] cinematic-glow-indigo"
                  />
                ) : (
                  <div className="relative aspect-video w-full rounded-2xl bg-[#050914] border border-[#1E2D4A] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl cinematic-glow-indigo">
                    {/* Background grid motif */}
                    <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

                    {/* Window Bar */}
                    <div className="flex items-center justify-between text-xs font-mono text-indigo-300 relative z-10 pb-2 border-b border-[#1E2D4A]/60">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-indigo-vibrant" />
                        <span className="font-semibold">Operations Advisor Preview</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-vibrant/10 border border-indigo-vibrant/20">
                        Cognitive Copilot
                      </span>
                    </div>

                    {/* Central Simulated Copilot Preview */}
                    <div className="my-auto py-3 space-y-2 relative z-10">
                      <div className="p-3 rounded-xl bg-[#090E20]/90 border border-[#1E2D4A]/80 text-xs font-mono text-slate-200">
                        <span className="text-cyan-electric font-semibold block mb-1">Investigation Query:</span>
                        &ldquo;Correlate transponder BER degradation with local rain fade at Delhi Earth Station.&rdquo;
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono text-indigo-200">
                        <span className="text-emerald-400 font-semibold block mb-1">Synthesized Recommendation:</span>
                        Telemetry indicates 1.8 dB attenuation. Advised: Increase AUPC margin by +1.5 dB.
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-mutedgrey relative z-10 pt-2 border-t border-[#1E2D4A]/60">
                      <span className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-indigo-vibrant" />
                        <span>Dedicated video pending release</span>
                      </span>
                      <span className="text-cyan-electric">public/videos/operations-advisor.mp4</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel CTAs */}
            <div className="pt-4 border-t border-[#1E2D4A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  trackProductCTAClick('operations_advisor', 'hero');
                  onRequestDemo('operations_advisor');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-indigo-vibrant text-white hover:bg-white hover:text-obsidian transition-all shadow-[0_0_20px_rgba(113,103,255,0.3)] flex items-center justify-center gap-2"
              >
                <span>Request an Operations Advisor Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('operations-advisor')}
                className="font-sans text-xs sm:text-sm font-medium text-mutedgrey hover:text-indigo-300 transition-colors flex items-center gap-1.5"
              >
                <span>Explore Capabilities</span>
                <span>↓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-14 pt-4 flex flex-col items-center justify-center gap-2 text-tech-label text-mutedgrey">
          <button
            onClick={() => onNavigate('cnms')}
            className="flex items-center gap-2 hover:text-cyan-electric transition-colors"
          >
            <span>SCROLL FOR IN-DEPTH PRODUCT CAPABILITIES</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-electric" />
          </button>
        </div>
      </div>
    </section>
  );
};
