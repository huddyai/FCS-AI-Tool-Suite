import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, Square } from 'lucide-react';

export const IntroAssistant: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // The Script provided
  const introText = [
    "Welcome.",
    "This site is a tour of four working AI applications built around the kinds of environmental, permitting, and fieldwork challenges your teams handle every day.",
    "You’ll see how long, technical documents can become something you can simply ask questions to. How new reports and templates can be drafted from a single prompt. How field notes spoken on-site can turn into structured reports. And how permits, conditions, and evidence can live in one clear, always-current view.",
    "Each section is a focused walkthrough of one tool. Take your time, click into any of them, and imagine how they could plug into the way you already work. When you’re ready, you can launch any app in a new tab and experience it directly."
  ];

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  // Listen for other speech events (like reading a tool section) to stop this intro
  useEffect(() => {
    const handleSpeechStart = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail !== 'intro') {
            handleStop();
        }
    };
    window.addEventListener('fcs-speech-start', handleSpeechStart);
    return () => window.removeEventListener('fcs-speech-start', handleSpeechStart);
  }, []);

  const handlePlay = () => {
    setHasInteracted(true);
    setIsPlaying(true);
    
    // Cancel any existing speech from other components
    window.speechSynthesis.cancel();

    // Dispatch event to stop tool-specific readers
    window.dispatchEvent(new CustomEvent('fcs-speech-start', { detail: 'intro' }));

    // Split text into sentences/chunks to avoid browser 15-second timeout on long utterances
    const fullText = introText.join(" ");
    // Regex to split by punctuation followed by space or end of string
    const chunks = fullText.match(/[^.!?]+[.!?]+(\s|$)/g) || [fullText];
    
    // Select a high-quality voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google US English")) ||
                           voices.find(v => v.name.includes("Google")) ||
                           voices.find(v => v.name.includes("Premium") && v.lang.includes("en")) ||
                           voices.find(v => v.lang === "en-US");
    
    // Queue each chunk
    chunks.forEach((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk.trim());
        
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 1.05; 
        utterance.pitch = 1;

        // Only attach onend to the very last chunk to reset state
        if (index === chunks.length - 1) {
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);
        }

        window.speechSynthesis.speak(utterance);
    });
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
      {/* Speech Bubble / Prompt */}
      <AnimatePresence>
        {!hasInteracted && !isPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-white/95 backdrop-blur-md shadow-2xl border border-emerald-100 p-5 rounded-2xl rounded-br-none max-w-xs relative"
          >
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h4 className="text-slate-900 font-bold text-sm mb-2">Welcome to the FCS AI Suite</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Would you like a quick audio tour of these four tools?
            </p>
            
            <button 
              onClick={handlePlay}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all w-full shadow-lg shadow-emerald-200"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Audio Tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Blob Container */}
      <div className="relative group cursor-pointer" onClick={isPlaying ? handleStop : handlePlay}>
         {/* Animated Blob */}
         <motion.div 
            animate={isPlaying ? { 
                scale: [1, 1.15, 0.95, 1.1, 1],
                borderRadius: [
                  "50%", 
                  "40% 60% 70% 30% / 40% 50% 60% 50%", 
                  "60% 40% 30% 70% / 60% 30% 70% 40%", 
                  "50% 50% 30% 70% / 50% 30% 70% 50%",
                  "50%"
                ],
            } : { scale: 1, borderRadius: "50%" }}
            transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
            }}
            className={`w-16 h-16 flex items-center justify-center shadow-xl transition-all duration-500 border-2 ${
                isPlaying 
                ? 'bg-emerald-500 border-emerald-400 shadow-emerald-500/50' 
                : 'bg-slate-800 border-slate-700 shadow-slate-900/30 hover:bg-slate-700'
            }`}
         >
            {isPlaying ? (
                // Audio Wave Animation
                <div className="flex gap-1 items-end h-5">
                    <motion.div animate={{ height: [6, 18, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                    <motion.div animate={{ height: [10, 24, 10] }} transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} className="w-1 bg-white rounded-full" />
                    <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-white rounded-full" />
                </div>
            ) : (
                <Volume2 className="w-7 h-7 text-white" />
            )}
         </motion.div>

         {/* Tooltip Label */}
         <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPlaying ? "Stop Audio" : "Play Intro"}
         </div>
      </div>
    </div>
  );
};