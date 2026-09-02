import React from 'react';
import { formatDateDisplay } from '../../utils/dateUtils';

export default function CycleChart({ cycleObjects }) {
  if (!cycleObjects || cycleObjects.length === 0) {
    return null;
  }

  // Find max length for Y-axis scale (min 35 days)
  const maxLen = Math.max(35, ...cycleObjects.map((c) => c.length));

  return (
    <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          Historical Cycle Lengths (Days)
        </h4>
        <span className="text-[11px] font-mono text-slate-500">
          Target Average ~ {Math.round(cycleObjects.reduce((a, b) => a + b.length, 0) / cycleObjects.length)}d
        </span>
      </div>

      {/* SVG Bar Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[450px] h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-4 bg-slate-900/60 rounded-xl border border-slate-800/80 relative">
          {/* Average Line */}
          {(() => {
            const avg = Math.round(cycleObjects.reduce((a, b) => a + b.length, 0) / cycleObjects.length);
            const avgHeightPercent = (avg / maxLen) * 100;
            return (
              <div
                className="absolute left-0 right-0 border-t-2 border-dashed border-sky-400/50 z-10 pointer-events-none flex items-center justify-end pr-2"
                style={{ bottom: `${avgHeightPercent}%` }}
              >
                <span className="text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-sky-300 border border-sky-500/30">
                  Avg {avg}d
                </span>
              </div>
            );
          })()}

          {/* Bars */}
          {cycleObjects.map((cycle, idx) => {
            const heightPercent = (cycle.length / maxLen) * 100;
            const startDisplay = formatDateDisplay(cycle.start, { month: 'short', day: 'numeric' });

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end z-20">
                {/* Bar Label (Days) */}
                <span className="text-xs font-mono font-bold text-slate-300 opacity-80 group-hover:opacity-100 group-hover:text-rose-400 transition-colors">
                  {cycle.length}d
                </span>

                {/* Bar */}
                <div
                  className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-rose-600 to-purple-500 group-hover:from-rose-500 group-hover:to-purple-400 transition-all duration-300 shadow-lg shadow-purple-500/10"
                  style={{ height: `${heightPercent}%` }}
                ></div>

                {/* X-Axis Label */}
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[60px] text-center">
                  #{idx + 1} ({startDisplay})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
