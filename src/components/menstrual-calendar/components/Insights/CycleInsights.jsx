import React from 'react';
import { LineChart, Zap, Layers, Sparkles } from 'lucide-react';
import CycleChart from './CycleChart';

export default function CycleInsights({ cycleStats }) {
  if (!cycleStats || cycleStats.numCompletedCycles === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
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
