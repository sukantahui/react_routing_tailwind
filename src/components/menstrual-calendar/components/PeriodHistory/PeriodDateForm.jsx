import React, { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { formatISODate } from '../../utils/dateUtils';

export default function PeriodDateForm({ onAddPeriodStart }) {
  const todayStr = formatISODate(new Date());
  const [dateInput, setDateInput] = useState(todayStr);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateInput) return;
    const success = onAddPeriodStart(dateInput);
    if (success) {
      // Keep dateInput clean or reset to today
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <div className="flex items-center gap-2 text-rose-400 shrink-0">
        <Calendar className="w-5 h-5" />
        <label htmlFor="period-date-input" className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Add Period Start Date:
        </label>
      </div>

      <div className="flex-1 min-w-[180px]">
        <input
          id="period-date-input"
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
          required
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all duration-200 shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>Add Start Date</span>
      </button>
    </form>
  );
}
