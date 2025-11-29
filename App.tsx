import React from 'react';
import { Navigation } from './components/Navigation';
import { ToolSection } from './components/ToolSection';
import { InteractiveBackground } from './components/InteractiveBackground';
import { IntroAssistant } from './components/IntroAssistant';
import { TOOLS } from './constants';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-800 selection:bg-emerald-500/30 selection:text-emerald-900">
      <InteractiveBackground />
      <Navigation />
      <IntroAssistant />

      {/* Intro Strip - High Design Update */}
      <header className="relative pt-40 pb-28 px-6 overflow-hidden">
        {/* Background Gradients & Textures */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/95 to-slate-100/90 backdrop-blur-sm z-0"></div>
        
        {/* Subtle Grid Pattern Overlay with Radial Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm ring-1 ring-emerald-500/10">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               Internal Tool Suite
             </span>
             <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              An AI layer built for <br className="hidden md:block"/> 
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-slate-800 pb-2">
                FirstCarbon Solutions
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Production-ready intelligence applications tailored to your environmental, permitting, and field workflows.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 flex flex-col items-center justify-center gap-3"
          >
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Explore the Tools</span>
             <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1 h-2 bg-emerald-500 rounded-full"
                />
             </div>
          </motion.div>
        </div>
      </header>

      {/* Main Tools Loop */}
      <main>
        {TOOLS.map((tool, index) => (
          <ToolSection key={tool.id} tool={tool} index={index} />
        ))}
      </main>

      {/* Closing Strip - Clean light design to match header */}
      <footer className="py-24 px-6 bg-slate-50 border-t border-slate-200 text-center relative z-10">
         <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Proven, working applications — ready to be tailored to FCS.
            </h2>
            <p className="text-slate-600 text-lg">
              All four tools are already live and functioning, built specifically around FCS-style workflows, and can be adapted to FCS infrastructure, security, and governance once inside the organization.
            </p>
            
            <div className="bg-white inline-flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200 shadow-sm">
               <User className="w-5 h-5 text-emerald-500" />
               <p className="text-sm text-slate-500">
                 Designed and built by <span className="font-semibold text-slate-800">Brandon Hudson</span>, focused on AI tools that amplify FCS experts.
               </p>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors border-b-2 border-transparent hover:border-emerald-600"
              >
                Explore Any Tool Above ↑
              </button>
            </div>

            <div className="pt-12 text-xs text-slate-400">
              © {new Date().getFullYear()} FirstCarbon Solutions AI Concept. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;