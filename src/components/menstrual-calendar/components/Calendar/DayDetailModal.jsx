import React from 'react';
import { X, Calendar, Sparkles, Heart, Activity, Info, ShieldCheck } from 'lucide-react';
import { formatDateDisplay } from '../../utils/dateUtils';
import { DAY_TYPES } from '../../constants/cycleConstants';

export default function DayDetailModal({ isOpen, onClose, selectedDateInfo }) {
  if (!isOpen || !selectedDateInfo) return null;

  const { dateStr, statusInfo, cycleDayInfo, cycleStats } = selectedDateInfo;

  const formattedDate = formatDateDisplay(dateStr, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const statusType = statusInfo?.type || DAY_TYPES.NORMAL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
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
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Calendar Day Overview
          </span>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {formattedDate}
          </h3>
        </div>

        {/* Primary Status Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Current Status:</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
              {statusInfo?.label || 'Lower Fertility Estimate'}
            </span>
          </div>

          {cycleDayInfo?.cycleDay && (
            <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 text-xs">
              <span className="text-slate-400">Cycle Day Position:</span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Cycle Day {cycleDayInfo.cycleDay}
              </span>
            </div>
          )}
        </div>

        {/* Details List */}
        <div className="space-y-2.5 text-xs">
          {statusType === DAY_TYPES.ACTUAL_PERIOD && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 flex items-start gap-2.5">
              <Activity className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Recorded Period Start</p>
                <p className="text-[11px] text-rose-200/80">
                  This date marks an actual recorded start of menstrual bleeding in your history.
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.ESTIMATED_OVULATION && (
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Estimated Ovulation Date</p>
                <p className="text-[11px] text-purple-200/80">
                  Approximate date calculated from your average cycle length. Actual ovulation timing varies.
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.ESTIMATED_FERTILE && (
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-300 flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Estimated Fertile Window</p>
                <p className="text-[11px] text-sky-200/80">
                  Higher conception likelihood window (5 days prior through 1 day post ovulation).
                </p>
              </div>
            </div>
          )}

          {statusType === DAY_TYPES.NORMAL && (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-300">Lower Fertility Estimate</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Days outside the estimated fertile window. Note: Conception is still possible as cycle timing varies.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Prediction Confidence Indicator */}
        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">Prediction Reliability:</span>
          </div>
          <span className="font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
            {cycleStats?.reliability || 'Lower'}
          </span>
        </div>

        {/* Close Button Action */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all duration-200"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
