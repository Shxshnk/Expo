import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollAnimations';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onRequestDemo: (product?: 'cnms_v2' | 'operations_advisor' | 'both') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onRequestDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'cnms', 'operations-advisor', 'benefits', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'cnms', label: 'CNMS v2.0' },
    { id: 'operations-advisor', label: 'Operations Advisor' },
    { id: 'benefits', label: 'Architecture' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top 2px Cyan Laser Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-electric via-indigo-vibrant to-cyan-electric z-50 transition-all duration-75 shadow-[0_0_12px_#45D8FF]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#05070B]/85 backdrop-blur-xl border-b border-[#1E2D4A]/60 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Commedia Logo (Transparent) */}
            <button
              onClick={() => handleLinkClick('hero')}
              className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-electric rounded-xl p-1"
              aria-label="Commedia Solutions Home"
            >
              <img
                src="/images/commedia-logo.png"
                alt="Commedia Solutions"
                className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(69,216,255,0.18)] group-hover:brightness-110 transition-all"
              />
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider text-cyan-electric uppercase px-2 py-0.5 rounded bg-cyan-electric/10 border border-cyan-electric/25">
                EXPO 2026
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 bg-[#0A1020]/75 border border-[#1E2D4A]/70 px-4 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3.5 py-1.5 text-nav-link rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-electric font-semibold'
                        : 'text-mutedgrey hover:text-white font-medium'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-electric shadow-[0_0_6px_#45D8FF]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Request a Demo */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onRequestDemo('both')}
                className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide text-obsidian bg-cyan-electric hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(69,216,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>REQUEST A DEMO</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-midnight border border-[#1E2D4A] text-mutedgrey hover:text-white focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-electric" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-obsidian/95 border-b border-[#1E2D4A] px-6 py-6 backdrop-blur-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2.5 text-sm font-sans rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-cyan-electric/10 text-cyan-electric font-semibold border-l-2 border-cyan-electric'
                      : 'text-mutedgrey hover:text-white font-medium'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-[#1E2D4A]">
                <button
                  onClick={() => {
                    onRequestDemo('both');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-sans font-semibold tracking-wide text-obsidian bg-cyan-electric hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(69,216,255,0.3)]"
                >
                  <span>REQUEST A DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
