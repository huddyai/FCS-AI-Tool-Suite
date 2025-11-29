import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { TOOLS } from '../constants';

// Internal SVG Logo component - Uses text for perfect rendering + geometric dots
const FCSLogo = () => (
  <svg width="66" height="32" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="FCS Logo">
    {/* Main Text: "FCS" - Inter Font, Extra Bold, Dark Slate */}
    <text 
      x="0" 
      y="32" 
      fontFamily="'Inter', sans-serif" 
      fontWeight="900" 
      fontSize="38" 
      fill="#0f172a" 
      letterSpacing="-2"
    >
      FCS
    </text>
    
    {/* Three Dots Graphic - positioned in the signature arc */}
    {/* Dot 1: Middle-ish */}
    <circle cx="70" cy="14" r="3.5" fill="#06b6d4" /> 
    {/* Dot 2: High Right */}
    <circle cx="80" cy="6" r="3.5" fill="#06b6d4" />
    {/* Dot 3: Low Right */}
    <circle cx="86" cy="18" r="3.5" fill="#06b6d4" />
  </svg>
);

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy logic
      const sections = TOOLS.map(t => document.getElementById(t.id));
      let current = '';
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If top of section is within the top half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-slate-200 py-3 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
          <div className="transition-transform duration-300 group-hover:scale-105">
            <FCSLogo />
          </div>
          <span className={clsx(
            "font-semibold text-lg tracking-tight hidden sm:block transition-colors border-l pl-3 ml-1",
            scrolled ? "text-slate-500 border-slate-300" : "text-slate-500 border-slate-300/50"
          )}>
            AI Tool Suite
          </span>
        </div>

        <ul className="flex items-center space-x-1 sm:space-x-2">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <button
                onClick={() => scrollToSection(tool.id)}
                className={clsx(
                  "text-xs sm:text-sm font-medium transition-all px-3 py-1.5 rounded-full",
                  activeSection === tool.id 
                    ? "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-500/20 shadow-sm" 
                    : (scrolled ? "text-slate-500 hover:text-emerald-600 hover:bg-slate-50" : "text-slate-600 hover:text-emerald-600 hover:bg-white/50")
                )}
              >
                <span className="hidden md:inline">{tool.title.replace('FCS ', '')}</span>
                <span className="md:hidden">
                    {/* Short names for mobile */}
                    {tool.id === 'doc-intelligence' ? 'Intel' : 
                     tool.id === 'doc-fetch' ? 'Fetch' : 
                     tool.id === 'field-monitor' ? 'Field' : 'Permit'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
