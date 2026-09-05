/**
 * BulkDateEntryModal.jsx
 *
 * Lets the user enter N previous period start dates at once.
 * Shows a live preview of cycle gaps between entered dates so
 * they can spot outliers before saving.
 *
 * On save: calls bulkAddPeriodDates() which merges with existing
 * entries and syncs to the cnat_api in a single round-trip.
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Plus,
  Trash2,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { differenceInCalendarDays } from '../../utils/dateUtils';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Generate a unique key for each row */
let _uid = 0;
const uid = () => `row-${++_uid}`;

/** Return a blank row object */
const blankRow = (date = '') => ({ id: uid(), date, error: '' });

/** Format YYYY-MM-DD → nice label */
function prettyDate(str) {
  if (!str) return '';
  try {
    return new Date(str + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return str; }
}

/** Badge colour based on cycle gap */
function gapColor(days) {
  if (days < 20) return 'text-rose-300 bg-rose-500/15 border-rose-500/30';
  if (days > 45) return 'text-amber-300 bg-amber-500/15 border-amber-500/30';
  return 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30';
}

// ─── Quick-fill helpers ──────────────────────────────────────────────────────

/**
 * Generates N dates going backwards from a start date by a fixed interval.
 * Used by the "Quick Fill" section.
 */
function generateBackwardDates(startDate, count, intervalDays) {
  if (!startDate || count < 1 || intervalDays < 1) return [];
  const dates = [];
  let base = new Date(startDate + 'T00:00:00');
  for (let i = 0; i < count; i++) {
    base = new Date(base.getTime() - intervalDays * 86400000);
    const y = base.getFullYear();
    const m = String(base.getMonth() + 1).padStart(2, '0');
    const d = String(base.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${d}`);
  }
  return dates;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CycleGapPreview({ sortedDates }) {
  if (sortedDates.length < 2) return null;

  const gaps = [];
  for (let i = 1; i < sortedDates.length; i++) {
    const days = differenceInCalendarDays(sortedDates[i], sortedDates[i - 1]);
    gaps.push({ from: sortedDates[i - 1], to: sortedDates[i], days });
  }

  const avg = Math.round(gaps.reduce((s, g) => s + g.days, 0) / gaps.length);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-bold text-slate-300">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          Live Cycle Gap Preview
        </span>
        <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold">
          Avg: {avg} days
        </span>
      </div>

      <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
        {gaps.map((g, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
          >
            <span className="text-slate-400 font-mono">
              {prettyDate(g.from)} → {prettyDate(g.to)}
            </span>
            <span className={`px-1.5 py-0.5 rounded-lg border text-[10px] font-bold ${gapColor(g.days)}`}>
              {g.days}d
              {g.days < 20 && ' ⚠ short'}
              {g.days > 45 && ' ⚠ long'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────

export default function BulkDateEntryModal({
  isOpen,
  onClose,
  periodStarts,          // existing dates to detect duplicates
  onBulkAddPeriodDates,  // async fn(dates[]) → { added, skipped }
  isSyncing,
}) {
  const [rows, setRows]           = useState(() => [blankRow(), blankRow(), blankRow()]);
  const [isSaving, setIsSaving]   = useState(false);
  const [result, setResult]       = useState(null);   // { added, skipped } after save
  const [showQuickFill, setShowQuickFill] = useState(false);

  // Quick-fill state
  const today = new Date().toISOString().slice(0, 10);
  const [qfLastDate, setQfLastDate]     = useState(today);
  const [qfCount, setQfCount]           = useState(6);
  const [qfInterval, setQfInterval]     = useState(28);

  // ── Derived state (must be above any early return) ──────────────────────
  const validDates = useMemo(
    () => [...new Set(rows.map((r) => r.date).filter(Boolean))].sort(),
    [rows]
  );
  const duplicateCount = useMemo(
    () => validDates.filter((d) => periodStarts.includes(d)).length,
    [validDates, periodStarts]
  );
  const newCount = validDates.length - duplicateCount;

  if (!isOpen) return null;


  // ── Row management ──────────────────────────────────────────────────────

  const updateRow = (id, date) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id !== id ? r : {
          ...r,
          date,
          error: periodStarts.includes(date) ? 'Already recorded' : '',
        }
      )
    );
    setResult(null);
  };

  const addRow = () => setRows((prev) => [...prev, blankRow()]);

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  // ── Quick-fill ──────────────────────────────────────────────────────────

  const applyQuickFill = () => {
    const generated = generateBackwardDates(qfLastDate, qfCount, qfInterval);
    if (generated.length === 0) return;
    const newRows = generated.map((d) => ({
      ...blankRow(d),
      error: periodStarts.includes(d) ? 'Already recorded' : '',
    }));
    // Prepend generated rows, keep any manually entered non-empty rows
    const kept = rows.filter((r) => r.date && !generated.includes(r.date));
    setRows([...newRows, ...kept]);
    setShowQuickFill(false);
    setResult(null);
  };

  // ── Save ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (validDates.length === 0 || isSaving) return;
    setIsSaving(true);
    try {
      const res = await onBulkAddPeriodDates(validDates);
      setResult(res);
      if (res?.added > 0) {
        // Reset rows after successful save
        setRows([blankRow(), blankRow(), blankRow()]);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setRows([blankRow(), blankRow(), blankRow()]);
    setResult(null);
    setShowQuickFill(false);
    onClose();
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl relative flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Bulk period date entry"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-slate-800 shrink-0">
          <div className="p-2.5 bg-violet-500/15 text-violet-400 rounded-2xl border border-violet-500/25">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Bulk History Entry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter multiple past period start dates at once to improve pattern analysis.
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          {/* ── Quick Fill Accordion ─────────────────────────────────── */}
          <div className="bg-slate-950/60 border border-slate-700 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowQuickFill((s) => !s)}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-violet-300 hover:bg-slate-800/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Quick Fill — Generate dates automatically
              </span>
              {showQuickFill
                ? <ChevronUp className="w-4 h-4 text-slate-500" />
                : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {showQuickFill && (
              <div className="border-t border-slate-800 px-4 pb-4 pt-3 space-y-3">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Specify your most recent past period date, how many cycles to go back, and the
                  approximate interval. The tool will calculate approximate start dates for you —
                  review and adjust them in the list below before saving.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Last Period Date
                    </label>
                    <input
                      type="date"
                      value={qfLastDate}
                      onChange={(e) => setQfLastDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      No. of Cycles
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={qfCount}
                      onChange={(e) => setQfCount(Math.min(24, Math.max(1, +e.target.value)))}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Avg Interval (days)
                    </label>
                    <input
                      type="number"
                      min={15}
                      max={60}
                      value={qfInterval}
                      onChange={(e) => setQfInterval(Math.min(60, Math.max(15, +e.target.value)))}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <button
                  onClick={applyQuickFill}
                  className="w-full py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-xs font-bold transition-colors"
                >
                  Generate {qfCount} dates ↓ (review below before saving)
                </button>
              </div>
            )}
          </div>

          {/* ── Date Rows ────────────────────────────────────────────── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider">
                Period Start Dates
              </span>
              <span className="text-slate-500">
                {validDates.length} entered
                {newCount > 0 && (
                  <span className="ml-2 text-emerald-400 font-semibold">• {newCount} new</span>
                )}
                {duplicateCount > 0 && (
                  <span className="ml-2 text-amber-400 font-semibold">• {duplicateCount} duplicate</span>
                )}
              </span>
            </div>

            {rows.map((row, idx) => (
              <div key={row.id} className="flex items-center gap-2">
                {/* Row number */}
                <span className="text-[10px] font-mono text-slate-600 w-4 shrink-0 text-right">
                  {idx + 1}
                </span>

                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => updateRow(row.id, e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl bg-slate-950 border text-white text-sm font-mono focus:outline-none focus:ring-2 transition-colors ${
                    row.error
                      ? 'border-amber-500/60 focus:ring-amber-500/30'
                      : row.date
                      ? 'border-emerald-600/50 focus:ring-emerald-500/30'
                      : 'border-slate-700 focus:ring-violet-500/30'
                  }`}
                />

                {/* Inline duplicate/error tag */}
                {row.error && (
                  <span className="text-[10px] text-amber-400 whitespace-nowrap shrink-0">
                    ⚠ {row.error}
                  </span>
                )}

                {/* Remove row button */}
                <button
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length === 1}
                  className="p-1.5 text-slate-600 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-30 shrink-0"
                  title="Remove this row"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add row button */}
            <button
              onClick={addRow}
              className="w-full py-2 rounded-xl border border-dashed border-slate-700 hover:border-violet-500/50 text-slate-500 hover:text-violet-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add another date
            </button>
          </div>

          {/* ── Live Gap Preview ─────────────────────────────────────── */}
          <CycleGapPreview sortedDates={validDates} />

          {/* ── Save result feedback ─────────────────────────────────── */}
          {result && (
            <div className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs ${
              result.added > 0
                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}>
              {result.added > 0
                ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                : <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
              }
              <span>
                {result.added > 0
                  ? `✓ ${result.added} date(s) saved to your history.`
                  : 'No new dates were added.'
                }
                {result.skipped > 0 && (
                  <span className="text-amber-400 ml-1">
                    ({result.skipped} duplicate{result.skipped > 1 ? 's' : ''} skipped)
                  </span>
                )}
              </span>
            </div>
          )}

          {/* ── Info tip ──────────────────────────────────────────────── */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-2.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-600" />
            <span>
              The more historical data you add, the more accurate your average cycle length and
              fertile window predictions will be. At least 3–6 past cycles are recommended.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 shrink-0">
          <div className="text-xs text-slate-500">
            {newCount > 0 ? (
              <span className="text-emerald-400 font-semibold">{newCount} new date(s) ready to save</span>
            ) : (
              <span>Enter dates above to get started</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={newCount === 0 || isSaving || isSyncing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-violet-500/20 transition-all duration-200"
            >
              {(isSaving || isSyncing) ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {(isSaving || isSyncing) ? 'Saving…' : `Save ${newCount} Date${newCount !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
