import React, { useMemo } from 'react';
import { BrainCircuit, Activity, AlertCircle, TrendingUp } from 'lucide-react';

const AIAssistant = ({ reports }) => {
  // 1. ADVANCED DATA ANALYSIS
  const stats = useMemo(() => {
    const total = reports.length;
    if (total === 0) return null;

    const resolved = reports.filter(r => r.status === 'Resolved').length;
    const pending = total - resolved;
    const healthScore = Math.round((resolved / total) * 100);

    // Identify the "Hotspot" (Category with most pending reports)
    const categoryCounts = reports
      .filter(r => r.status !== 'Resolved')
      .reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {});

    const hotspot = Object.entries(categoryCounts).reduce((a, b) => (a[1] > b[1] ? a : b), [null, 0]);

    return { total, pending, healthScore, hotspot: hotspot[0], hotspotCount: hotspot[1] };
  }, [reports]);

  // 2. DYNAMIC INSIGHT GENERATOR
  const getAIInsight = () => {
    if (!stats) return {
      text: "Awaiting urban data... System in observation mode.",
      color: "text-indigo-400",
      icon: <Activity className="w-5 h-5" />
    };

    if (stats.hotspotCount > 2) return {
      text: `CRITICAL: ${stats.hotspot} cluster detected. Immediate dispatch recommended.`,
      color: "text-rose-400",
      icon: <AlertCircle className="w-5 h-5 animate-bounce" />
    };

    if (stats.healthScore > 80) return {
      text: `Optimal Performance: Urban efficiency is at ${stats.healthScore}%.`,
      color: "text-emerald-400",
      icon: <TrendingUp className="w-5 h-5" />
    };

    return {
      text: `${stats.pending} active pulse points detected. System optimizing...`,
      color: "text-indigo-400",
      icon: <BrainCircuit className="w-5 h-5" />
    };
  };

  const insight = getAIInsight();

  return (
    <div className="relative overflow-hidden bg-slate-900 p-8 rounded-[48px] text-white mb-10 border border-white/5 shadow-2xl group">
      {/* Background Decorative Element */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="bg-white/5 p-5 rounded-[24px] backdrop-blur-xl border border-white/10 shadow-inner">
            <BrainCircuit className="w-10 h-10 text-indigo-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">UrbanPulse AI Agent</p>
            </div>
            <h4 className="text-2xl font-black tracking-tight leading-tight max-w-xl">
              {insight.text}
            </h4>
          </div>
        </div>

        {/* 3. VISUAL METRICS STACK */}
        {stats && (
          <div className="flex items-center gap-8 border-l border-white/10 pl-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Health Score</p>
              <div className="relative flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                    strokeDasharray={175.9}
                    strokeDashoffset={175.9 - (175.9 * stats.healthScore) / 100}
                    className="text-indigo-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-sm font-black">{stats.healthScore}%</span>
              </div>
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Active Alerts</p>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-white/5 ${insight.color}`}>
                  {insight.icon}
                </div>
                <span className="text-2xl font-black">{stats.pending}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;