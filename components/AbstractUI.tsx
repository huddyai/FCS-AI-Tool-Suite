import React from 'react';
import { FileText, Mic, CheckCircle2, Search, BarChart3, Paperclip, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface AbstractUIProps {
  type: 'doc-intelligence' | 'doc-fetch' | 'field-monitor' | 'permit-tracker';
}

export const AbstractUI: React.FC<AbstractUIProps> = ({ type }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
    })
  };

  if (type === 'doc-intelligence') {
    return (
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full max-w-lg mx-auto bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden aspect-[4/3] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-slate-300">Final_EIR_Report.pdf</span>
          </div>
          <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">Processed</span>
        </div>
        {/* Body */}
        <div className="flex-1 p-6 flex gap-4">
            {/* Doc Preview */}
            <div className="w-1/3 hidden sm:flex flex-col gap-2 opacity-50">
                <div className="h-2 w-full bg-slate-600 rounded"></div>
                <div className="h-2 w-3/4 bg-slate-600 rounded"></div>
                <div className="h-2 w-full bg-slate-600 rounded"></div>
                <div className="h-32 w-full bg-slate-700/50 rounded mt-2"></div>
                <div className="h-2 w-full bg-slate-600 rounded mt-2"></div>
            </div>
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col space-y-4">
                <motion.div custom={0} variants={itemVariants} className="bg-slate-700/50 p-3 rounded-lg rounded-tl-none self-start max-w-[90%]">
                    <p className="text-xs text-slate-300">Summarize the traffic mitigation measures.</p>
                </motion.div>
                <motion.div custom={1} variants={itemVariants} className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-lg rounded-tr-none self-end w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-semibold text-emerald-400">AI Analysis</span>
                    </div>
                    <div className="space-y-2">
                         <div className="h-2 w-full bg-emerald-500/20 rounded"></div>
                         <div className="h-2 w-11/12 bg-emerald-500/20 rounded"></div>
                         <div className="h-2 w-4/5 bg-emerald-500/20 rounded"></div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">Page 42</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">Table 3.1</span>
                    </div>
                </motion.div>
            </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'doc-fetch') {
    return (
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden aspect-[4/3] flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                <Search className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">Mitigation monitoring plan for mixed-use project...</span>
                <button className="ml-auto bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-md">Generate</button>
            </div>
        </div>
        <div className="flex-1 p-6 bg-slate-50 flex gap-6">
            <motion.div custom={0} variants={itemVariants} className="w-2/3 bg-white shadow-lg border border-slate-100 rounded-lg p-5 flex flex-col gap-3 relative">
                <div className="absolute top-0 right-0 p-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="h-4 w-1/2 bg-slate-200 rounded mb-2"></div>
                <div className="h-2 w-full bg-slate-100 rounded"></div>
                <div className="h-2 w-full bg-slate-100 rounded"></div>
                <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                <div className="h-2 w-full bg-slate-100 rounded mt-2"></div>
                <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
            </motion.div>
            <motion.div custom={1} variants={itemVariants} className="w-1/3 flex flex-col gap-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Sources</div>
                <div className="bg-white p-3 rounded border border-slate-200 shadow-sm flex items-start gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-[8px] text-blue-600 font-bold">1</div>
                    <div className="flex-1 h-2 bg-slate-100 rounded mt-1"></div>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200 shadow-sm flex items-start gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-[8px] text-blue-600 font-bold">2</div>
                    <div className="flex-1 h-2 bg-slate-100 rounded mt-1"></div>
                </div>
            </motion.div>
        </div>
      </motion.div>
    );
  }

  if (type === 'field-monitor') {
    return (
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full max-w-lg mx-auto flex justify-center items-center h-full min-h-[400px]">
        {/* Phone Frame */}
        <div className="w-[280px] bg-slate-900 rounded-[2rem] border-4 border-slate-700 shadow-2xl overflow-hidden relative">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-10"></div>
            
            {/* Screen */}
            <div className="bg-slate-800 h-full w-full flex flex-col pt-8">
                {/* Header */}
                <div className="px-4 pb-4 border-b border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Project #4421</span>
                    <span className="text-xs text-emerald-500 font-bold">Active</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4 overflow-hidden">
                    <motion.div custom={0} variants={itemVariants} className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4 flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 animate-pulse">
                            <Mic className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex gap-1 items-end h-4 mt-2">
                             <div className="w-1 h-2 bg-emerald-400 rounded-full"></div>
                             <div className="w-1 h-4 bg-emerald-400 rounded-full"></div>
                             <div className="w-1 h-3 bg-emerald-400 rounded-full"></div>
                             <div className="w-1 h-5 bg-emerald-400 rounded-full"></div>
                             <div className="w-1 h-2 bg-emerald-400 rounded-full"></div>
                        </div>
                        <p className="text-[10px] text-emerald-400 mt-2">Listening...</p>
                    </motion.div>

                    <div className="space-y-2">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Live Transcript</div>
                        <motion.div custom={1} variants={itemVariants} className="bg-slate-700/50 p-3 rounded text-xs text-slate-300 border-l-2 border-emerald-500">
                            "Found a small lithic scatter near the north trench..."
                        </motion.div>
                        <motion.div custom={2} variants={itemVariants} className="bg-slate-700/50 p-3 rounded text-xs text-slate-300 border-l-2 border-emerald-500">
                            "Soil composition changing to sandy loam at 3 feet depth."
                        </motion.div>
                    </div>
                </div>
                
                {/* Tab Bar */}
                <div className="h-12 bg-slate-900 border-t border-slate-700 grid grid-cols-3 place-items-center">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-slate-600 rounded-sm"></div>
                    <div className="w-4 h-4 bg-slate-600 rounded-sm"></div>
                </div>
            </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'permit-tracker') {
    return (
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full max-w-lg mx-auto bg-slate-50 rounded-xl shadow-2xl border border-slate-200 overflow-hidden aspect-[4/3] flex flex-col p-6">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h3 className="text-lg font-bold text-slate-800">Compliance Dashboard</h3>
                <p className="text-xs text-slate-500">Project: Solar Farm Alpha</p>
            </div>
            <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white">+2</div>
            </div>
        </div>

        <div className="flex gap-4 overflow-hidden h-full">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-3">
                <div className="text-xs font-bold text-slate-400 uppercase">Upcoming</div>
                <motion.div custom={0} variants={itemVariants} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-amber-400">
                    <div className="text-xs font-bold text-slate-700 mb-1">Pre-con Survey</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> Due in 2 days
                    </div>
                </motion.div>
                <motion.div custom={1} variants={itemVariants} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-slate-300">
                    <div className="text-xs font-bold text-slate-700 mb-1">Weekly Noise Log</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                         Oct 24, 2023
                    </div>
                </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-3">
                <div className="text-xs font-bold text-slate-400 uppercase">Completed</div>
                <motion.div custom={2} variants={itemVariants} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                     <div className="flex justify-between items-start mb-1">
                        <div className="text-xs font-bold text-slate-700">Bio Monitor Report</div>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                     </div>
                     <div className="flex gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-500">
                            <Paperclip className="w-2 h-2" /> 2
                        </div>
                     </div>
                </motion.div>
                 <motion.div custom={3} variants={itemVariants} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                     <div className="flex justify-between items-start mb-1">
                        <div className="text-xs font-bold text-slate-700">AQ Permit Fee</div>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                     </div>
                </motion.div>
            </div>
        </div>
      </motion.div>
    );
  }

  return null;
};
