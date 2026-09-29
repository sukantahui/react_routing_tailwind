import React from 'react';
import { LineChart, Zap, Layers, Sparkles, FileText } from 'lucide-react';
import CycleChart from './CycleChart';

export default function CycleInsights({ cycleStats, onOpenDoctorReport }) {
  if (!cycleStats || cycleStats.numCompletedCycles === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 text-purple-300 rounded-2xl border border-purple-500/30">
            <LineChart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Cycle Insights &amp; Statistics
            </h2>
            <p className="text-xs text-slate-400">
              Statistical breakdown of your historical cycle lengths and consistency metrics.
            </p>
          </div>
        </div>

        {onOpenDoctorReport && (
          <button
            onClick={onOpenDoctorReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Doctor / Clinic Report</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            Average Cycle
          </span>
          <p className="text-xl font-extrabold text-white font-mono">
            {cycleStats.averageCycleLength} days
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            Shortest Cycle
          </span>
          <p className="text-xl font-extrabold text-emerald-400 font-mono">
            {cycleStats.shortestCycle} days
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            Longest Cycle
          </span>
          <p className="text-xl font-extrabold text-rose-400 font-mono">
            {cycleStats.longestCycle} days
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            Range / Std Dev
          </span>
          <p className="text-xl font-extrabold text-sky-400 font-mono">
            {cycleStats.variability}d / ±{cycleStats.stdDev}d
          </p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <CycleChart cycleObjects={cycleStats.cycleObjects} />
    </section>
  );
}
