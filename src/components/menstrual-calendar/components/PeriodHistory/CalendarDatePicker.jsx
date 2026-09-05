/**
 * CalendarDatePicker.jsx
 *
 * A custom popup calendar date picker.
 * Replaces the native <input type="date"> with a rich, styled month grid.
 *
 * Props:
 *   value          – selected YYYY-MM-DD string
 *   onChange       – fn(YYYY-MM-DD)
 *   periodStarts   – string[] of already-recorded dates (shown with a rose dot)
 *   maxDate        – optional YYYY-MM-DD upper bound (default: today)
 *   placeholder    – string shown when value is empty
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import { formatISODate, formatDateDisplay } from '../../utils/dateUtils';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES  = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

/** Return YYYY-MM-DD for a given year/month/day */
function toISO(year, month, day) {
  return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

/** Build calendar grid: array of {day, month, year, isCurrentMonth} */
function buildGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();   // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];

  // Leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month, year, isCurrentMonth: true });
  }

  // Trailing days from next month (fill to complete the last row)
  const remaining = 42 - cells.length;   // always 6 rows × 7 cols
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    cells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }

  return cells;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalendarDatePicker({
  value,
  onChange,
  periodStarts = [],
  maxDate,
  placeholder = 'Select a date',
}) {
  const todayStr  = formatISODate(new Date());
  const maxStr    = maxDate || todayStr;

  // Initialise view to the selected month (or today)
  const init = value || todayStr;
  const initYear  = parseInt(init.slice(0, 4), 10);
  const initMonth = parseInt(init.slice(5, 7), 10) - 1;

  const [isOpen,     setIsOpen]     = useState(false);
  const [viewYear,   setViewYear]   = useState(initYear);
  const [viewMonth,  setViewMonth]  = useState(initMonth);

  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // When picker opens, snap view to the selected value's month
  const open = () => {
    const base = value || todayStr;
    setViewYear(parseInt(base.slice(0, 4), 10));
    setViewMonth(parseInt(base.slice(5, 7), 10) - 1);
    setIsOpen(true);
  };

  const prevMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; });
  }, []);

  const selectDay = (cell) => {
    const iso = toISO(cell.year, cell.month, cell.day);
    if (iso > maxStr) return;   // block future/over-max dates
    onChange(iso);
    setIsOpen(false);
  };

  const clearValue = (e) => {
    e.stopPropagation();
    onChange('');
  };

  const grid = buildGrid(viewYear, viewMonth);
  const periodSet = new Set(periodStarts);

  // ── Display label ──────────────────────────────────────────────────────────
  const displayLabel = value
    ? formatDateDisplay(value, { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={isOpen ? () => setIsOpen(false) : open}
        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm text-left transition-all duration-150 ${
          isOpen
            ? 'bg-slate-950 border-rose-500 ring-2 ring-rose-500/30'
            : 'bg-slate-950 border-slate-800 hover:border-slate-600'
        }`}
      >
        <Calendar className={`w-4 h-4 shrink-0 ${value ? 'text-rose-400' : 'text-slate-500'}`} />
        <span className={`flex-1 font-mono ${value ? 'text-white' : 'text-slate-500'}`}>
          {displayLabel || placeholder}
        </span>
        {value && (
          <button
            type="button"
            onClick={clearValue}
            className="p-0.5 rounded text-slate-500 hover:text-slate-300 transition-colors"
            tabIndex={-1}
            aria-label="Clear date"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </button>

      {/* ── Popup Calendar ──────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="absolute z-50 mt-2 left-0 w-[300px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-fadeIn"
          style={{ minWidth: '300px' }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm font-bold text-white select-none">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day-of-week header */}
          <div className="grid grid-cols-7 px-2 pt-2">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-slate-500 uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 px-2 pb-3 gap-y-0.5">
            {grid.map((cell, idx) => {
              const iso         = toISO(cell.year, cell.month, cell.day);
              const isSelected  = iso === value;
              const isToday     = iso === todayStr;
              const isFuture    = iso > maxStr;
              const isPeriod    = periodSet.has(iso);
              const isDimmed    = !cell.isCurrentMonth;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectDay(cell)}
                  disabled={isFuture}
                  className={[
                    'relative flex flex-col items-center justify-center h-9 w-full rounded-xl text-xs font-semibold transition-all duration-100',
                    isFuture
                      ? 'text-slate-700 cursor-not-allowed'
                      : isDimmed
                      ? 'text-slate-600 hover:text-slate-400 hover:bg-slate-800/50'
                      : isSelected
                      ? 'bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30 scale-105'
                      : isToday
                      ? 'bg-slate-800 text-white ring-1 ring-rose-500/60 hover:bg-slate-700'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                  ].join(' ')}
                  aria-label={iso}
                  aria-pressed={isSelected}
                >
                  {cell.day}

                  {/* Rose dot for recorded period start dates */}
                  {isPeriod && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer: Today shortcut */}
          <div className="border-t border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-rose-400 mr-1 align-middle" />
              = recorded period start
            </span>
            <button
              type="button"
              onClick={() => {
                onChange(todayStr);
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
