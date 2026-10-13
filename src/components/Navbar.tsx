import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollAnimations';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onRequestDemo: (product?: 'cnms_v2' | 'operations_advisor' | 'both') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onRequestDemo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'cnms', label: 'CNMS v2.0' },
    { id: 'operations-advisor', label: 'Operations Advisor' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* 1px quiet progress hairline */}
      <div
        className="fixed top-0 left-0 h-[1.5px] bg-neutral-200 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled ? 'bg-[#050608]/95 backdrop-blur-md hairline-b' : 'bg-transparent hairline-b'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Trade Show Metadata */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('hero')}
              className="flex items-center gap-3 text-left focus:outline-none"
              aria-label="Commedia Solutions"
            >
              <img
                src="/images/commedia-logo.png"
                alt="Commedia Solutions"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 uppercase tracking-wider pl-4 hairline-l">
              Broadcast India Show 2026
            </span>
          </div>

          {/* Minimal Functional Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => onRequestDemo('both')}
              className="text-xs font-mono uppercase tracking-wider text-white hover:text-sky-300 transition-colors flex items-center gap-1 pl-4 hairline-l"
            >
              <span>Request Briefing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="md:hidden bg-[#050608] hairline-b px-6 py-6 space-y-4">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest pb-2 hairline-b">
              Broadcast India Show 2026
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="block w-full text-left text-sm font-mono uppercase tracking-wide text-neutral-300 hover:text-white py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 hairline-t">
              <button
                onClick={() => {
                  onRequestDemo('both');
                  setMobileOpen(false);
                }}
                className="w-full py-3 text-xs font-mono uppercase tracking-wider text-center text-black bg-white hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Briefing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
