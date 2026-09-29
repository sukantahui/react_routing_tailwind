import React from 'react';
import {
  Sparkles,
  Droplets,
  Heart,
  Moon,
  Sun,
  Apple,
  Dumbbell,
  Smile,
  Calendar,
  PlusCircle,
  Clock,
  Flame,
  Activity,
  BookOpen,
} from 'lucide-react';
import { getDailyPhaseAndWellness } from '../../utils/cycleCalculations';
import { formatISODate } from '../../utils/dateUtils';

export default function CycleWheelHero({
  periodStarts,
  settings,
  onOpenSymptomLogger,
  onMarkPeriodStart,
  onOpenRelaxation,
  onOpenManual,
}) {
  const todayStr = formatISODate(new Date());
  const wellness = getDailyPhaseAndWellness(todayStr, periodStarts, settings);

  // Phase Theme Colors & Icons
  let phaseBadgeColor = 'from-rose-500/20 to-purple-500/20 text-rose-300 border-rose-500/30';
  let PhaseIcon = Droplets;
  let ringStrokeColor = '#f43f5e';

  if (wellness.phaseKey === 'follicular') {
    phaseBadgeColor = 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30';
    PhaseIcon = Sun;
    ringStrokeColor = '#10b981';
  } else if (wellness.phaseKey === 'ovulatory') {
    phaseBadgeColor = 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
    PhaseIcon = Sparkles;
    ringStrokeColor = '#c084fc';
  } else if (wellness.phaseKey === 'luteal') {
    phaseBadgeColor = 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30';
    PhaseIcon = Moon;
    ringStrokeColor = '#f59e0b';
  }

  // SVG Circular Wheel Calculations
  const size = 260;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Wheel indicator position
  const progressRatio = wellness.totalCycleLength ? (wellness.cycleDay || 1) / wellness.totalCycleLength : 0;
  const progressAngle = progressRatio * 360 - 90; // Start at top (-90deg)
  const angleInRad = (progressAngle * Math.PI) / 180;
  const indicatorX = center + radius * Math.cos(angleInRad);
  const indicatorY = center + radius * Math.sin(angleInRad);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-[#0f172a]/90 to-[#1e1427]/80 border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-2xl">
      {/* Soothing Ambient Glow Circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Circular Cycle Dial (Wheel) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative flex items-center justify-center">
            {/* SVG Circular Ring */}
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background Ring Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#1e293b"
                strokeWidth={strokeWidth}
                fill="transparent"
              />

              {/* Menstrual Phase Arc (Days 1 to PeriodDuration) */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#f43f5e"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${(wellness.periodDuration / wellness.totalCycleLength) * circumference} ${circumference}`}
                strokeDashoffset={0}
                className="opacity-75"
              />

              {/* Fertile / Ovulation Phase Arc */}
              {wellness.fertileStartDay && wellness.fertileEndDay && (
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="#c084fc"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${((wellness.fertileEndDay - wellness.fertileStartDay + 1) / wellness.totalCycleLength) * circumference} ${circumference}`}
                  strokeDashoffset={`-${((wellness.fertileStartDay - 1) / wellness.totalCycleLength) * circumference}`}
                  className="opacity-85"
                />
              )}

              {/* Active Cycle Progress Ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke={ringStrokeColor}
                strokeWidth={strokeWidth + 2}
                fill="transparent"
                strokeDasharray={`${progressRatio * circumference} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out shadow-lg"
              />
            </svg>

            {/* Glowing Pointer on Ring */}
            {wellness.hasData && (
              <div
                className="absolute w-5 h-5 rounded-full bg-white border-2 border-slate-950 shadow-xl shadow-white/50 flex items-center justify-center transition-all duration-700 pointer-events-none"
                style={{
                  left: `${indicatorX}px`,
                  top: `${indicatorY}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              </div>
            )}

            {/* Inner Circular Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border bg-gradient-to-r ${phaseBadgeColor}`}>
                <PhaseIcon className="w-3.5 h-3.5" />
                {wellness.phaseName}
              </span>

              <div className="pt-1">
                {wellness.hasData ? (
                  <>
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tight font-mono">
                      Day {wellness.cycleDay}
                    </span>
                    <span className="text-xs text-slate-400 block font-sans">
                      of ~{wellness.totalCycleLength} day cycle
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-white">Start Tracking</span>
                    <span className="text-xs text-slate-400 block">No dates logged yet</span>
                  </>
                )}
              </div>

              {wellness.daysUntilNextPeriod !== null && (
                <div className="pt-1 text-[11px] font-semibold text-rose-300/90 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-rose-400" />
                  {wellness.daysUntilNextPeriod === 0
                    ? 'Period predicted TODAY'
                    : wellness.daysUntilNextPeriod > 0
                    ? `Next period in ${wellness.daysUntilNextPeriod}d`
                    : `Period was ${Math.abs(wellness.daysUntilNextPeriod)}d ago`}
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Buttons below wheel */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 w-full max-w-xs">
            <button
              onClick={() => onMarkPeriodStart && onMarkPeriodStart(todayStr)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all cursor-pointer"
              title="Record today as the first day of your period"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Today</span>
            </button>

            {onOpenSymptomLogger && (
              <button
                onClick={onOpenSymptomLogger}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                title="Log mood, flow, symptoms, and notes"
              >
                <Smile className="w-3.5 h-3.5 text-amber-400" />
                <span>Symptoms</span>
              </button>
            )}

            {onOpenRelaxation && (
              <button
                onClick={onOpenRelaxation}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-semibold text-xs border border-indigo-500/30 transition-all cursor-pointer"
                title="Take a 2-minute soothing breathing exercise"
              >
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>Calm Breath</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Daily Holistic Wellness & Hormonal Balance Guide */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Today's Hormonal Rhythm
                </span>
                {onOpenManual && (
                  <button
                    onClick={onOpenManual}
                    className="flex items-center gap-1 text-[10px] text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/20 transition-all cursor-pointer"
                    title="Open User Manual & How to Use Guide"
                  >
                    <BookOpen className="w-2.5 h-2.5" />
                    <span>User Guide</span>
                  </button>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {wellness.phaseSubtitle}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                Conception Likelihood
              </span>
              <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full mt-0.5 border ${
                wellness.pregnancyChance.includes('Peak') || wellness.pregnancyChance.includes('High')
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : wellness.pregnancyChance.includes('Moderate')
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {wellness.pregnancyChance}
              </span>
            </div>
          </div>

          {/* Hormonal explanation paragraph */}
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/60">
            {wellness.hormoneInsight}
          </p>

          {/* 3 Pillars: Nutrition, Movement, Self-Care */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Nourish */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                  <Apple className="w-3.5 h-3.5" />
                </div>
                <span>Nourish</span>
              </div>
              <p className="text-[11px] text-slate-300/90 leading-normal">
                {wellness.nutritionTip}
              </p>
            </div>

            {/* 2. Movement */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Dumbbell className="w-3.5 h-3.5" />
                </div>
                <span>Movement</span>
              </div>
              <p className="text-[11px] text-slate-300/90 leading-normal">
                {wellness.movementTip}
              </p>
            </div>

            {/* 3. Self-Care */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>Self-Care</span>
              </div>
              <p className="text-[11px] text-slate-300/90 leading-normal">
                {wellness.selfCareTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
