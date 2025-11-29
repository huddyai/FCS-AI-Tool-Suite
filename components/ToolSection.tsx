import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Check, MousePointerClick, Volume2, Square } from 'lucide-react';
import { ToolData } from '../types';
import { AbstractUI } from './AbstractUI';

interface ToolSectionProps {
  tool: ToolData;
  index: number;
}

export const ToolSection: React.FC<ToolSectionProps> = ({ tool, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isReading, setIsReading] = useState(false);

  const isDark = tool.theme === 'dark';
  
  // Base classes - Dark sections are now transparent to let the canvas show through
  // Light sections are opaque white for contrast
  const bgClass = isDark ? 'bg-transparent' : 'bg-slate-50';
  const textClass = isDark ? 'text-slate-200' : 'text-slate-600';
  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const accentClass = isDark ? 'text-emerald-400' : 'text-emerald-600';
  const bulletIconClass = isDark ? 'text-emerald-500' : 'text-emerald-600';
  const bulletBgClass = isDark ? 'bg-emerald-500/10' : 'bg-emerald-100';

  useEffect(() => {
    // Prime the voice list (Chrome often loads voices asynchronously)
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    // Listen for other sections starting speech to reset our state
    const handleSpeechStart = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail !== tool.id) {
            setIsReading(false);
        }
    };
    window.addEventListener('fcs-speech-start', handleSpeechStart);

    // Cleanup speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.removeEventListener('fcs-speech-start', handleSpeechStart);
    };
  }, [tool.id]);

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    // Dispatch event to stop other sections
    window.dispatchEvent(new CustomEvent('fcs-speech-start', { detail: tool.id }));

    // Cancel anything currently playing
    window.speechSynthesis.cancel();

    // Construct an array of segments to speak. 
    // Breaking it up prevents browser timeouts on long text.
    const segments = [
      tool.title,
      tool.subtitle,
      tool.description,
      "What it does.",
      ...tool.bullets,
      `Ideal for: ${tool.idealFor}`,
      "Use cases.",
      ...tool.useCases
    ];

    // Select the best available voice
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for more natural voices
    const preferredVoice = voices.find(v => v.name.includes("Google US English")) ||
                           voices.find(v => v.name.includes("Google")) ||
                           voices.find(v => v.name.includes("Premium") && v.lang.includes("en")) ||
                           voices.find(v => v.name.includes("Enhanced") && v.lang.includes("en")) ||
                           voices.find(v => v.name.includes("Zira")) ||
                           voices.find(v => v.lang === "en-US");

    // Queue up each segment
    segments.forEach((text, i) => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        utterance.rate = 1.0; 
        utterance.pitch = 1.0;

        // On the very last segment, reset the reading state
        if (i === segments.length - 1) {
            utterance.onend = () => setIsReading(false);
            utterance.onerror = () => setIsReading(false);
        }

        window.speechSynthesis.speak(utterance);
    });

    setIsReading(true);
  };

  return (
    <section 
      id={tool.id} 
      className={`min-h-screen py-24 flex items-center relative overflow-hidden ${bgClass}`}
      ref={ref}
    >
      {/* For dark sections, reduced backdrop blur/opacity to 50% to show particles */}
      {isDark && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] -z-10" />
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`} 
          >
            {/* Read Aloud Button */}
            <button
              onClick={handleReadAloud}
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all border ${
                isDark 
                  ? 'border-slate-700 bg-slate-800/60 text-emerald-400 hover:bg-slate-700 hover:text-emerald-300' 
                  : 'border-slate-200 bg-white text-emerald-600 hover:bg-slate-50 hover:text-emerald-700'
              }`}
            >
              {isReading ? (
                <>
                  <Square className="w-3 h-3 fill-current animate-pulse" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>

            <div className="space-y-4">
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${titleClass}`}>
                {tool.title}
              </h2>
              <p className={`text-xl md:text-2xl font-light leading-relaxed ${accentClass}`}>
                {tool.subtitle}
              </p>
              <p className={`text-lg leading-relaxed ${textClass}`}>
                {tool.description}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  What it does
                </h3>
                <ul className="space-y-3">
                  {tool.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 p-0.5 rounded-full ${bulletBgClass} shrink-0`}>
                        <Check className={`w-3 h-3 ${bulletIconClass}`} />
                      </div>
                      <span className={textClass}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* "Ideal For" Card with Hover Effect */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`p-6 rounded-lg transition-all duration-300 ${isDark ? 'bg-slate-800/50 border border-slate-700 hover:shadow-lg hover:shadow-black/30' : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50'}`}
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ideal For
                </h3>
                <p className={`text-sm mb-4 ${textClass}`}>{tool.idealFor}</p>
                
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Use Cases
                </h3>
                <ul className="space-y-1">
                   {tool.useCases.map((uc, i) => (
                      <li key={i} className={`text-sm flex items-start gap-2 ${textClass}`}>
                        <span className="opacity-50">•</span>
                        <span>{uc}</span>
                      </li>
                   ))}
                </ul>
              </motion.div>
            </div>

            <div className="pt-4">
              <a 
                href={tool.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-1"
              >
                Launch {tool.title.replace('FCS ', '')}
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className={`mt-3 text-sm flex items-center gap-1 opacity-60 ${textClass}`}>
                Open in new tab <ExternalLink className="w-3 h-3" />
              </p>
            </div>
          </motion.div>

          {/* Visual Content with Scale/Lift Hover Effect AND LINK */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col items-center justify-center`}
          >
             {/* Wrappable Anchor for Clickable Graphic */}
             <a 
                href={tool.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full max-w-lg cursor-pointer outline-none focus:ring-4 focus:ring-emerald-500/50 rounded-xl"
             >
                {/* Overlay Button on Hover */}
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
                   <div className="flex transform items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-emerald-900 shadow-xl transition-transform duration-300 scale-90 group-hover:scale-100">
                      <ExternalLink className="h-5 w-5" />
                      <span>Launch Live App</span>
                   </div>
                </div>

                {/* "Live" Badge */}
                <div className="absolute right-4 top-4 z-30 animate-pulse rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/20 pointer-events-none">
                    LIVE DEMO
                </div>

                {/* The UI Component with Hover Animation */}
                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <AbstractUI type={tool.id as any} />
                </motion.div>
             </a>

             {/* Helpful Caption indicating clickability */}
             <div className={`mt-6 flex animate-bounce items-center gap-2 text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                <MousePointerClick className="h-4 w-4" />
                <span>Click the interface above to try it now</span>
             </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};