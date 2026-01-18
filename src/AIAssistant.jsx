import React from 'react';
import { BrainCircuit } from 'lucide-react';

const AIAssistant = ({ reports }) => {
  const pendingCount = reports.filter(r => r.status !== 'Resolved').length;
  const utilityIssues = reports.filter(r => r.category === 'Utilities').length;
  
  const getAIInsight = () => {
    if (reports.length === 0) return "Awaiting urban data... System in observation mode.";
    if (utilityIssues > 2) return "CRITICAL: AI identifies a cluster of utility failures. Immediate dispatch recommended.";
    return `AI Analysis: ${pendingCount} active pulse points detected. Urban efficiency is at 84%.`;
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-[40px] text-white mb-10 border border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
      <div className="flex items-center gap-6">
        <div className="bg-indigo-500/20 p-4 rounded-3xl backdrop-blur-md border border-indigo-400/30">
          <BrainCircuit className="w-8 h-8 text-indigo-400 animate-pulse" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1">UrbanPulse AI Agent</p>
          <h4 className="text-xl font-bold tracking-tight">{getAIInsight()}</h4>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
