import React from 'react';
import {
  CalendarDays,
  Sparkles,
  HeartHandshake,
  Activity,
  BarChart3,
  ShieldAlert,
} from 'lucide-react';
import StatCard from './StatCard';
import { formatDateDisplay, differenceInCalendarDays, formatISODate } from '../../utils/dateUtils';
import { CONFIDENCE_LEVELS } from '../../constants/cycleConstants';

export default function CycleDashboard({ cycleStats, predictedCycles }) {
  const nextCycle = predictedCycles && predictedCycles.length > 0 ? predictedCycles[0] : null;

  // Relative days calculation for Next Period
  let nextPeriodText = 'No data';
  let nextPeriodSubtitle = 'Add historical period start dates';
  if (nextCycle) {
    const todayStr = formatISODate(new Date());
    const daysUntil = differenceInCalendarDays(nextCycle.startDate, todayStr);

    nextPeriodText = formatDateDisplay(nextCycle.startDate, { month: 'short', day: 'numeric' });
    if (daysUntil === 0) {
      nextPeriodSubtitle = 'Predicted start is TODAY';
    } else if (daysUntil > 0) {
      nextPeriodSubtitle = `In approximately ${daysUntil} day${daysUntil === 1 ? '' : 's'}`;
    } else {
      const daysAgo = Math.abs(daysUntil);
      nextPeriodSubtitle = `Predicted start was ${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    }
  }

  // Ovulation & Fertile Window text
  const ovulationText = nextCycle?.ovulationDate
    ? formatDateDisplay(nextCycle.ovulationDate, { month: 'short', day: 'numeric' })
    : '—';

  let fertileWindowText = '—';
  if (nextCycle?.fertileWindowStart && nextCycle?.fertileWindowEnd) {
    const startStr = formatDateDisplay(nextCycle.fertileWindowStart, { month: 'short', day: 'numeric' });
    const endStr = formatDateDisplay(nextCycle.fertileWindowEnd, { month: 'short', day: 'numeric' });
    fertileWindowText = `${startStr} – ${endStr}`;
  }

  // Range text
  const rangeText =
    cycleStats.shortestCycle !== null && cycleStats.longestCycle !== null
      ? `${cycleStats.shortestCycle}–${cycleStats.longestCycle} days`
      : '—';

  // Reliability Badge Color
  let reliabilityColor = 'sky';
  if (cycleStats.reliability === CONFIDENCE_LEVELS.HIGH) reliabilityColor = 'emerald';
  if (cycleStats.reliability === CONFIDENCE_LEVELS.MODERATE) reliabilityColor = 'indigo';
  if (cycleStats.reliability === CONFIDENCE_LEVELS.LOW) reliabilityColor = 'amber';

  return (
    <div className="space-y-4">
      {/* Irregular Cycle / Low Confidence Banner (if variable) */}
      {cycleStats.reliabilityReason && cycleStats.numCompletedCycles > 0 && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
            cycleStats.reliability === CONFIDENCE_LEVELS.LOW
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{cycleStats.reliabilityReason}</span>
          </div>
          <span className="font-mono text-[11px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 shrink-0">
            Variability: {cycleStats.variability} days
          </span>
        </div>
      )}

      {/* Grid of Dashboard Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Next Period"
          value={nextPeriodText}
          subtitle={nextPeriodSubtitle}
          icon={CalendarDays}
          accentColor="rose"
          tooltip="Estimated start date of your upcoming menstrual period based on your average cycle length."
        />

        <StatCard
          title="Estimated Ovulation"
          value={ovulationText}
          subtitle="Relative to predicted period"
          icon={Sparkles}
          accentColor="purple"
          tooltip="An approximate date calculated from your cycle history (estimated 14 days prior to next period). Actual ovulation timing can vary."
        />

        <StatCard
          title="Fertile Window"
          value={fertileWindowText}
          subtitle="Approx. 6-day window"
          icon={HeartHandshake}
          accentColor="sky"
          tooltip="Estimated window of higher conception likelihood (5 days before estimated ovulation through 1 day after)."
        />

        <StatCard
          title="Average Cycle"
          value={cycleStats.averageCycleLength ? `${cycleStats.averageCycleLength} days` : '—'}
          subtitle={
            cycleStats.isCustomAverage
              ? 'User custom manual override setting'
              : `Based on ${cycleStats.numCompletedCycles} completed cycle${
                  cycleStats.numCompletedCycles === 1 ? '' : 's'
                }`
          }
          icon={Activity}
          accentColor="emerald"
          badge={cycleStats.isCustomAverage ? 'Custom' : 'Auto'}
          tooltip="Mean number of calendar days between consecutive period start dates, or user custom override."
        />

        <StatCard
          title="Cycle Range"
          value={rangeText}
          subtitle={
            cycleStats.variability > 0 ? `${cycleStats.variability} days variability` : 'Uniform cycles'
          }
          icon={BarChart3}
          accentColor="indigo"
          tooltip="The shortest and longest completed cycle lengths recorded in your history."
        />

        <StatCard
          title="Reliability"
          value={cycleStats.reliability || 'Lower'}
          subtitle={cycleStats.numCompletedCycles < 2 ? 'Needs more data' : 'Calculated software score'}
          icon={ShieldAlert}
          accentColor={reliabilityColor}
          badge={cycleStats.numCompletedCycles >= 3 ? 'Active' : 'Initial'}
          tooltip="Software confidence score based on the number of recorded cycles and cycle consistency. NOT a medical assessment."
        />
      </div>
    </div>
  );
}
