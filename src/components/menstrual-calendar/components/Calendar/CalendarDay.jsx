import React from 'react';
import { Sparkles, Calendar, Heart, Droplets } from 'lucide-react';
import { isToday } from '../../utils/dateUtils';
import { DAY_TYPES } from '../../constants/cycleConstants';

export default function CalendarDay({ cellData, statusInfo, cycleDayInfo, onClick }) {
  const { dateStr, dayNum, isCurrentMonth } = cellData;
  const isCurrentDay = isToday(dateStr);

  const statusType = statusInfo?.type || DAY_TYPES.NORMAL;

  // Multi-indicator priority styling & accessibility classes
  let bgClasses = 'bg-slate-950/60 hover:bg-slate-900 border-slate-800/80 text-slate-300';
  let badgeText = null;
  let statusIcon = null;

  if (statusType === DAY_TYPES.ACTUAL_PERIOD) {
    bgClasses =
      'bg-rose-600/90 hover:bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/20 font-bold';
    badgeText = statusInfo.dayOfBleeding ? `Day ${statusInfo.dayOfBleeding}` : 'Period';
    statusIcon = <Droplets className="w-3 h-3 text-rose-100" />;
  } else if (statusType === DAY_TYPES.PREDICTED_PERIOD) {
    bgClasses =
      'bg-rose-950/70 hover:bg-rose-900/80 border-rose-500/60 border-dashed text-rose-200 font-semibold';
    badgeText = 'Predicted';
    statusIcon = <Calendar className="w-3 h-3 text-rose-400" />;
  } else if (statusType === DAY_TYPES.ESTIMATED_OVULATION) {
    bgClasses =
      'bg-purple-600/90 hover:bg-purple-600 border-purple-300 text-white shadow-lg shadow-purple-600/30 font-bold';
    badgeText = 'Ovulation';
    statusIcon = <Sparkles className="w-3 h-3 text-purple-200" />;
  } else if (statusType === DAY_TYPES.ESTIMATED_FERTILE) {
    bgClasses =
      'bg-sky-900/60 hover:bg-sky-850/80 border-sky-400/60 text-sky-100 font-medium';
    badgeText = 'Fertile';
    statusIcon = <Heart className="w-3 h-3 text-sky-300" />;
  }

  // Today Ring Overlay
  const todayRingClass = isCurrentDay
    ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 z-10'
    : '';

  // Dim non-current month cells
  const opacityClass = !isCurrentMonth ? 'opacity-35 hover:opacity-60' : 'opacity-100';

  return (
    <button
      onClick={() => onClick(dateStr, statusInfo, cycleDayInfo)}
      className={`min-h-[85px] p-2 rounded-2xl border flex flex-col justify-between transition-all duration-200 text-left relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-sky-500 ${bgClasses} ${todayRingClass} ${opacityClass}`}
      aria-label={`Date ${dateStr}, ${statusInfo?.label || 'Normal Day'}`}
    >
      {/* Top row: Day Number & Today indicator */}
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-sm font-extrabold font-mono ${
            isCurrentDay
              ? 'w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs'
              : ''
          }`}
        >
          {dayNum}
        </span>

        {statusIcon && <span className="shrink-0">{statusIcon}</span>}
      </div>

      {/* Center/Bottom row: Cycle Day N & Status Badge */}
      <div className="mt-1 space-y-0.5">
        {cycleDayInfo?.cycleDay && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-300 border border-slate-800/80 inline-block">
            CD {cycleDayInfo.cycleDay}
          </span>
        )}

        {badgeText && (
          <div className="text-[10px] tracking-tight font-semibold uppercase truncate">
            {badgeText}
          </div>
        )}
      </div>
    </button>
  );
}
