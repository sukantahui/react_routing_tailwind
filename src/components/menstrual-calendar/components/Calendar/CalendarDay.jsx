import React from 'react';
import { Sparkles, Calendar, Heart, Droplets, Smile } from 'lucide-react';
import { isToday } from '../../utils/dateUtils';
import { DAY_TYPES } from '../../constants/cycleConstants';

export default function CalendarDay({ cellData, statusInfo, cycleDayInfo, onClick }) {
  const { dateStr, dayNum, isCurrentMonth } = cellData;
  const isCurrentDay = isToday(dateStr);

  const statusType = statusInfo?.type || DAY_TYPES.NORMAL;

  // Multi-indicator priority styling & soothing pastel gradients
  let bgClasses = 'bg-slate-950/40 hover:bg-slate-900/80 border-slate-800/80 text-slate-300';
  let badgeText = null;
  let statusIcon = null;
  let badgeClass = 'bg-slate-900/80 text-slate-400 border-slate-800';

  if (statusType === DAY_TYPES.ACTUAL_PERIOD) {
    bgClasses =
      'bg-gradient-to-br from-rose-600/90 to-rose-700 hover:from-rose-500 hover:to-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/25 font-bold';
    badgeText = statusInfo.dayOfBleeding ? `Day ${statusInfo.dayOfBleeding}` : 'Period';
    statusIcon = <Droplets className="w-3.5 h-3.5 text-rose-100" />;
    badgeClass = 'bg-rose-950/80 text-rose-100 border-rose-400/40';
  } else if (statusType === DAY_TYPES.PREDICTED_PERIOD) {
    bgClasses =
      'bg-gradient-to-br from-rose-950/70 to-pink-950/60 hover:bg-rose-900/80 border-rose-500/60 border-dashed text-rose-200 font-semibold';
    badgeText = 'Predicted';
    statusIcon = <Calendar className="w-3.5 h-3.5 text-rose-400" />;
    badgeClass = 'bg-rose-950/80 text-rose-300 border-rose-500/40';
  } else if (statusType === DAY_TYPES.ESTIMATED_OVULATION) {
    bgClasses =
      'bg-gradient-to-br from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 border-purple-300 text-white shadow-lg shadow-purple-600/30 font-bold';
    badgeText = 'Ovulation';
    statusIcon = <Sparkles className="w-3.5 h-3.5 text-purple-200" />;
    badgeClass = 'bg-purple-950/80 text-purple-100 border-purple-300/50';
  } else if (statusType === DAY_TYPES.ESTIMATED_FERTILE) {
    bgClasses =
      'bg-gradient-to-br from-sky-950/70 via-indigo-950/60 to-purple-950/50 hover:bg-sky-900/80 border-sky-400/60 text-sky-100 font-medium';
    badgeText = 'Fertile';
    statusIcon = <Heart className="w-3.5 h-3.5 text-sky-300" />;
    badgeClass = 'bg-sky-950/80 text-sky-200 border-sky-400/40';
  }

  // Today Ring Overlay & Soft Glow
  const todayRingClass = isCurrentDay
    ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 z-10 shadow-lg shadow-emerald-500/20'
    : '';

  // Dim non-current month cells
  const opacityClass = !isCurrentMonth ? 'opacity-30 hover:opacity-70' : 'opacity-100';

  return (
    <button
      onClick={() => onClick(dateStr, statusInfo, cycleDayInfo)}
      className={`min-h-[88px] p-2.5 rounded-2xl border flex flex-col justify-between transition-all duration-200 text-left relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer ${bgClasses} ${todayRingClass} ${opacityClass}`}
      aria-label={`Date ${dateStr}, ${statusInfo?.label || 'Cycle Day'}`}
    >
      {/* Top row: Day Number & Today indicator */}
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-sm font-extrabold font-mono transition-transform group-hover:scale-110 ${
            isCurrentDay
              ? 'w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs shadow-md'
              : 'text-slate-200'
          }`}
        >
          {dayNum}
        </span>

        {statusIcon && <span className="shrink-0">{statusIcon}</span>}
      </div>

      {/* Center/Bottom row: Cycle Day N & Status Badge */}
      <div className="mt-1 space-y-1">
        {cycleDayInfo?.cycleDay && (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/70 text-slate-300 border border-slate-800/80 inline-block shadow-sm">
            CD {cycleDayInfo.cycleDay}
          </span>
        )}

        {badgeText && (
          <div className={`text-[10px] tracking-tight font-bold uppercase truncate px-1.5 py-0.5 rounded-md border text-center ${badgeClass}`}>
            {badgeText}
          </div>
        )}
      </div>
    </button>
  );
}
