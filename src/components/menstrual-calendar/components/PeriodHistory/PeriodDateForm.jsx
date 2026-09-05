import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { formatISODate } from '../../utils/dateUtils';
import CalendarDatePicker from './CalendarDatePicker';

export default function PeriodDateForm({ onAddPeriodStart, periodStarts = [] }) {
  const todayStr = formatISODate(new Date());
  const [dateInput, setDateInput]       = useState(todayStr);
  const [notesInput, setNotesInput]     = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateInput || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // onAddPeriodStart is async — await so we only reset on success
      const success = await onAddPeriodStart(dateInput, notesInput.trim() || null);
      if (success) {
        setDateInput(todayStr);
        setNotesInput('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl shadow-lg space-y-3"
    >
      {/* Row 1: label + calendar picker + submit */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
        {/* Label */}
        <div className="flex items-center gap-2 shrink-0 sm:mt-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Period Start Date
          </span>
        </div>

        {/* Calendar picker — takes remaining width */}
        <div className="flex-1 min-w-0">
          <CalendarDatePicker
            value={dateInput}
            onChange={setDateInput}
            periodStarts={periodStarts}
            placeholder="Pick a date…"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !dateInput}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all duration-200 shrink-0"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          <span>{isSubmitting ? 'Saving…' : 'Add Start Date'}</span>
        </button>
      </div>

      {/* Row 2: optional notes */}
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          id="period-notes-input"
          type="text"
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
          maxLength={191}
          placeholder="Optional note (e.g. cramps, spotting, heavy flow…)"
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
        />
      </div>
    </form>
  );
}
