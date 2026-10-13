import React from 'react';
import { ArrowUp, Mail, Globe, Phone, ExternalLink } from 'lucide-react';
import { trackContactEmailClick } from '../lib/analytics';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian border-t border-[#1E2D4A] text-mutedgrey pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-cyan-electric/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1E2D4A]/60">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/commedia-logo.png"
                alt="Commedia Solutions"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(69,216,255,0.18)]"
              />
              <span className="text-[10px] font-mono tracking-wider text-cyan-electric uppercase px-2 py-0.5 rounded bg-cyan-electric/10 border border-cyan-electric/25">
                EXPO 2026
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-mutedgrey max-w-md leading-relaxed font-normal">
              Pioneering enterprise network management, earth station tracking telemetry, and AI-assisted operational intelligence for high-reliability communications.
            </p>

            <div className="pt-1">
              <p className="text-base sm:text-lg font-display font-semibold italic text-cyan-electric">
                &ldquo;You Think. We Make It Possible.&rdquo;
              </p>
            </div>
          </div>

          {/* Col 2: Solutions Architecture */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-tech-label uppercase text-white font-semibold">
              SOLUTIONS
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <button
                  onClick={() => onNavigate('cnms')}
                  className="hover:text-cyan-electric transition-colors text-left flex items-center gap-2 group text-mutedgrey"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric opacity-60 group-hover:opacity-100" />
                  <span>CNMS v2.0 Platform</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operations-advisor')}
                  className="hover:text-indigo-300 transition-colors text-left flex items-center gap-2 group text-mutedgrey"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-vibrant opacity-60 group-hover:opacity-100" />
                  <span>Operations Advisor Copilot</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('benefits')}
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group text-mutedgrey"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100" />
                  <span>Portfolio Architecture</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group text-mutedgrey"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric opacity-60 group-hover:opacity-100" />
                  <span>Request a Demonstration</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Official Channels */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-tech-label uppercase text-white font-semibold">
              OFFICIAL CHANNELS
            </h4>
            <div className="space-y-3 font-sans text-sm">
              <a
                href="mailto:sales@commediaindia.com"
                onClick={() => trackContactEmailClick()}
                className="flex items-center gap-2.5 text-mutedgrey hover:text-cyan-electric transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-electric shrink-0" />
                <span>sales@commediaindia.com</span>
              </a>

              <a
                href="https://www.commediaindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-mutedgrey hover:text-cyan-electric transition-colors"
              >
                <Globe className="w-4 h-4 text-indigo-vibrant shrink-0" />
                <span>www.commediaindia.com</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="tel:+2227562333"
                className="flex items-center gap-2.5 text-mutedgrey hover:text-cyan-electric transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+22 2756 2333</span>
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Cinematic Brand Reveal Wordmark */}
        <div className="py-10 text-center select-none overflow-hidden">
          <span className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white/5 tracking-wider block hover:text-white/10 transition-colors duration-500">
            COMMEDIA
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E2D4A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-mutedgrey">
          <div>
            &copy; {currentYear} Commedia Solutions Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1020] border border-[#1E2D4A] hover:border-cyan-electric/60 hover:text-cyan-electric transition-all text-xs font-sans font-medium"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
