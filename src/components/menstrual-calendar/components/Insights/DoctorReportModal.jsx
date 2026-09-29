import React from 'react';
import { X, Printer, FileText, Download, ShieldCheck, Heart, Calendar } from 'lucide-react';
import { formatDateDisplay } from '../../utils/dateUtils';

export default function DoctorReportModal({
  isOpen,
  onClose,
  cycleStats,
  apiProfile,
  periodStarts = [],
  periodEntries = [],
  settings,
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const sortedStarts = [...periodStarts].sort((a, b) => (a > b ? -1 : 1)); // most recent first

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 shadow-2xl space-y-5 relative text-slate-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors no-print"
          aria-label="Close report modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 pr-8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Gynaecology &amp; Medical Cycle Summary
              </h3>
              <p className="text-[11px] text-slate-400">
                Printable summary for doctor appointments and personal health records.
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-bold shadow-md no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Report Content Body */}
        <div className="overflow-y-auto flex-1 space-y-5 pr-1 text-xs printable-report">
          {/* Header Card */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="font-bold text-sm text-white">Menstrual Health Report</span>
              <span className="text-[11px] text-slate-400 font-mono">
                Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            {/* Profile fields if provided */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Blood Group:</span>
                <span className="font-bold text-slate-200">{apiProfile?.blood_group || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date of Birth:</span>
                <span className="font-bold text-slate-200">{apiProfile?.date_of_birth || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Weight / Height:</span>
                <span className="font-bold text-slate-200">
                  {apiProfile?.weight_kg ? `${apiProfile.weight_kg} kg` : '—'} / {apiProfile?.height_cm ? `${apiProfile.height_cm} cm` : '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Primary Goal:</span>
                <span className="font-bold text-rose-300 capitalize">{apiProfile?.goal || 'General tracking'}</span>
              </div>
            </div>

            {apiProfile?.medical_notes && (
              <div className="pt-2 border-t border-slate-800/60 text-[11px]">
                <span className="text-slate-400 font-bold block">Medical Notes:</span>
                <p className="text-slate-300 mt-0.5">{apiProfile.medical_notes}</p>
              </div>
            )}
          </div>

          {/* Statistical Cycle Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Average Cycle</span>
              <span className="text-base font-black text-white font-mono">{cycleStats?.averageCycleLength} days</span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Bleeding Duration</span>
              <span className="text-base font-black text-rose-300 font-mono">{settings?.periodDuration} days</span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Variability Range</span>
              <span className="text-base font-black text-sky-300 font-mono">
                {cycleStats?.shortestCycle !== null ? `${cycleStats.shortestCycle}–${cycleStats.longestCycle}d` : '—'}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Reliability Score</span>
              <span className="text-base font-black text-emerald-400">{cycleStats?.reliability || 'Initial'}</span>
            </div>
          </div>

          {/* Chronological Cycle Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Recorded Period History ({periodStarts.length} recorded entries)
            </h4>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Period Start Date</th>
                    <th className="p-2.5">Cycle Interval</th>
                    <th className="p-2.5">Symptoms / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {sortedStarts.map((dateStr, idx) => {
                    const entryObj = periodEntries.find((e) => (e.period_start_date || e.periodStartDate) === dateStr);
                    const prevDate = sortedStarts[idx + 1];
                    let gapText = '—';
                    if (prevDate) {
                      const d1 = new Date(dateStr);
                      const d2 = new Date(prevDate);
                      const diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
                      gapText = `${diffDays} days`;
                    }

                    return (
                      <tr key={dateStr} className="hover:bg-slate-950/40">
                        <td className="p-2.5 text-slate-500">{sortedStarts.length - idx}</td>
                        <td className="p-2.5 font-bold text-slate-200">
                          {formatDateDisplay(dateStr, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="p-2.5 text-emerald-400 font-bold">{gapText}</td>
                        <td className="p-2.5 text-slate-400 max-w-[200px] truncate font-sans">
                          {entryObj?.notes || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3 shrink-0 no-print">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Private medical summary
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
