import React, { useState } from 'react';
import {
  X,
  Calendar,
  Sparkles,
  Heart,
  Activity,
  Info,
  ShieldCheck,
  PlusCircle,
  Smile,
  Loader2,
  Droplets,
  CheckCircle2,
} from 'lucide-react';
import { formatDateDisplay } from '../../utils/dateUtils';
import { DAY_TYPES } from '../../constants/cycleConstants';

export default function DayDetailModal({
  isOpen,
  onClose,
  selectedDateInfo,
  onMarkPeriodStart,    // async fn(dateStr) → boolean
  onOpenSymptomLogger,  // fn(dateStr)
}) {
  const [isMarking, setIsMarking] = useState(false);

  if (!isOpen || !selectedDateInfo) return null;

  const { dateStr, statusInfo, cycleDayInfo, cycleStats, isPeriodStart } = selectedDateInfo;

  const formattedDate = formatDateDisplay(dateStr, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const statusType = statusInfo?.type || DAY_TYPES.NORMAL;

  // Prevent marking future dates as period starts (soft check)
  const today = new Date().toISOString().slice(0, 10);
  const isFuture = dateStr > today;

  const handleMarkPeriodStart = async () => {
    if (!onMarkPeriodStart || isMarking) return;
    setIsMarking(true);
    try {
      await onMarkPeriodStart(dateStr);
      onClose();
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 relative text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Calendar Day Overview
          </span>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {formattedDate}
          </h3>
        </div>

        {/* ── Quick Action: Mark / Log Date ─────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {onMarkPeriodStart && (
            <button
              onClick={handleMarkPeriodStart}
              disabled={isMarking || isFuture || isPeriodStart}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all shadow-md ${
                isPeriodStart
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-800/50 opacity-90'
                  : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-rose-500/20 cursor-pointer disabled:opacity-50'
              }`}
              title={isFuture ? 'Cannot mark future date' : isPeriodStart ? 'Already marked as period start' : 'Mark as Period Start'}
            >
              {isMarking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPeriodStart ? (
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
              <span>{isMarking ? 'Saving…' : isPeriodStart ? 'Period Start Logged' : 'Mark Period Start'}</span>
            </button>
          )}

          {onOpenSymptomLogger && (
            <button
              onClick={() => {
                onClose();
                onOpenSymptomLogger(dateStr);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <Smile className="w-4 h-4 text-amber-400" />
              <span>Log Symptoms</span>
            </button>
          )}
        </div>

        {/* Primary Status Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Current Phase:</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
              {statusInfo?.label || 'Lower Fertility Estimate'}
            </span>
          </div>

          {cycleDayInfo?.cycleDay && (
            <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 text-xs">
              <span className="text-slate-400">Cycle Position:</span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Cycle Day {cycleDayInfo.cycleDay}
              </span>
            </div>
          )}
        </div>

        {/* Details Explanation */}
        <div className="space-y-2.5 text-xs">
          {statusType === DAY_TYPES.ACTUAL_PERIOD && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Recorded Period Start</p>
                <p className="text-[11px] text-rose-200/80 mt-0.5">
                  This date marks an actual recorded start of menstrual bleeding in your history stored in the database.
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.ESTIMATED_OVULATION && (
            <div className="p-3.5 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Estimated Ovulation Day</p>
                <p className="text-[11px] text-purple-200/80 mt-0.5">
                  Approximate date calculated from your average cycle length (~14 days before next period). Peak conception chance.
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.ESTIMATED_FERTILE && (
            <div className="p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-300 flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Estimated Fertile Window</p>
                <p className="text-[11px] text-sky-200/80 mt-0.5">
                  Window of elevated conception likelihood (5 days prior through 1 day post estimated ovulation).
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.NORMAL && !isPeriodStart && (
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-300">Lower Fertility Estimate</p>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  Days outside the estimated fertile window. Note: Conception is still possible as natural rhythms vary.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
