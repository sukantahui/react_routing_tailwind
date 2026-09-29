import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Layers,
  Sparkles,
  CalendarDays,
} from 'lucide-react';

export default function CalendarHeader({
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onToday,
  viewMode = 'month', // 'month' | 'horizon'
  onViewModeChange,
}) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-3xl backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 text-rose-300 rounded-2xl border border-rose-500/30">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            {viewMode === 'horizon' && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                3-Month Horizon
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Interactive cycle flow, fertile window &amp; ovulation forecasting
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onViewModeChange('month')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'month'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-rose-400" />
              <span>Month</span>
            </button>
            <button
              onClick={() => onViewModeChange('horizon')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'horizon'
                  ? 'bg-purple-600/30 text-purple-200 shadow-sm border border-purple-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View current month + next 2 predicted months together"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>3-Month Horizon</span>
            </button>
          </div>
        )}

        <button
          onClick={onToday}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-200"
        >
          Today
        </button>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={onPrevMonth}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Previous Month"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-300 px-2 font-semibold">
            {String(currentMonth + 1).padStart(2, '0')}/{currentYear}
          </span>

          <button
            onClick={onNextMonth}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Next Month"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
