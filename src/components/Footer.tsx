import React from 'react';
import { ArrowUp, Mail, Globe, Phone, ExternalLink } from 'lucide-react';
import { trackProductDemoClick } from '../lib/analytics';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030406] text-neutral-400 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 hairline-b">
          {/* Brand & Purpose (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/commedia-logo.png"
                alt="Commedia Solutions"
                className="h-6 w-auto object-contain"
              />
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest pl-3 hairline-l">
                Broadcast India Show 2026
              </span>
            </div>

            <p className="editorial-body text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Mission-critical network management, earth station telemetry, and AI-assisted operational intelligence for high-reliability enterprise networks.
            </p>

            <p className="text-xs font-mono text-neutral-500 italic">
              &ldquo;You Think. We Make It Possible.&rdquo;
            </p>
          </div>

          {/* Platforms Index (Span 3) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-wider block">
              Platforms
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    trackProductDemoClick('CNMS');
                    onNavigate('cnms');
                  }}
                  className="hover:text-white transition-colors text-neutral-400"
                >
                  01 &bull; CNMS v2.0 Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackProductDemoClick('Operations Advisor');
                    onNavigate('operations-advisor');
                  }}
                  className="hover:text-white transition-colors text-neutral-400"
                >
                  02 &bull; Operations Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-neutral-400"
                >
                  03 &bull; Technical Briefing &amp; Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Channels (Span 4) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-wider block">
              Official Channels
            </span>
            <div className="space-y-2.5">
              <a
                href="mailto:sales@commediaindia.com"
                className="flex items-center gap-2 hover:text-white transition-colors text-neutral-400"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>sales@commediaindia.com</span>
              </a>

              <a
                href="https://www.commediaindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-neutral-400"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>www.commediaindia.com</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="tel:+2227562333"
                className="flex items-center gap-2 hover:text-white transition-colors text-neutral-400"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+22 2756 2333</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {currentYear} Commedia Solutions Pvt. Ltd. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-wider"
            aria-label="Scroll back to top"
          >
            <span>Return to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
