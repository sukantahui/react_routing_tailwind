import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Calendar, AlertTriangle, FileText } from 'lucide-react';
import { formatDateDisplay, differenceInCalendarDays } from '../../utils/dateUtils';

export default function PeriodHistoryTable({
  periodStarts,
  periodEntries,
  settings,
  onEditPeriodStart,
  onDeletePeriodStart,
}) {
  const [editingDate, setEditingDate]       = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [isSavingEdit, setIsSavingEdit]     = useState(false);

  if (!periodStarts || periodStarts.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 text-xs space-y-2">
        <Calendar className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="font-semibold text-slate-300">No period start dates recorded yet.</p>
        <p>Use the input form above or click &quot;Load Sample Data&quot; to get started.</p>
      </div>
    );
  }

  // Build a quick lookup: dateStr → entry (for notes)
  const entryByDate = {};
  if (Array.isArray(periodEntries)) {
    periodEntries.forEach((e) => {
      entryByDate[e.period_start_date] = e;
    });
  }

  const startEdit = (dateStr) => {
    setEditingDate(dateStr);
    setEditInputValue(dateStr);
  };

  const cancelEdit = () => {
    setEditingDate(null);
    setEditInputValue('');
  };

  // Fixed: properly await the async callback and only reset on success
  const saveEdit = async (oldDateStr) => {
    if (isSavingEdit) return;
    setIsSavingEdit(true);
    try {
      const success = await onEditPeriodStart(oldDateStr, editInputValue);
      if (success) {
        setEditingDate(null);
        setEditInputValue('');
      }
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Show the notes column only if any entry has notes
  const hasNotes = (periodEntries || []).some((e) => e.notes);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-extrabold tracking-wider">
              <th className="py-3.5 px-4">Period Start</th>
              <th className="py-3.5 px-4">Cycle Length</th>
              <th className="py-3.5 px-4">Period Duration</th>
              {hasNotes && (
                <th className="py-3.5 px-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    Notes
                  </span>
                </th>
              )}
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {periodStarts.map((startStr, idx) => {
              // Calculate previous cycle length if previous entry exists
              let cycleLengthText = '—';
              let isUnusual = false;
              if (idx > 0) {
                const prevStart = periodStarts[idx - 1];
                const len = differenceInCalendarDays(startStr, prevStart);
                cycleLengthText = `${len} days`;
                if (len < 20 || len > 45) {
                  isUnusual = true;
                }
              }

              const isEditing = editingDate === startStr;
              const entry     = entryByDate[startStr];
              const notes     = entry?.notes || null;

              return (
                <tr key={startStr} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold">
                    {isEditing ? (
                      <input
                        type="date"
                        value={editInputValue}
                        onChange={(e) => setEditInputValue(e.target.value)}
                        className="px-2 py-1 bg-slate-950 border border-rose-500 rounded text-xs text-white font-mono"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{formatDateDisplay(startStr)}</span>
                        <span className="text-[10px] text-slate-400">({startStr})</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span>{cycleLengthText}</span>
                      {isUnusual && (
                        <span
                          title="Unusual cycle length (less than 20 or greater than 45 days)"
                          className="flex items-center gap-1 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-sans"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-400" /> Verify
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400">
                    {settings.periodDuration || 5} days
                  </td>

                  {hasNotes && (
                    <td className="py-3 px-4 text-slate-400 max-w-[200px]">
                      {notes ? (
                        <span className="italic text-slate-300 line-clamp-2" title={notes}>
                          {notes}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  )}

                  <td className="py-3 px-4 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => saveEdit(startStr)}
                          disabled={isSavingEdit}
                          className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors disabled:opacity-50"
                          title="Save"
                        >
                          {isSavingEdit ? (
                            <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin block" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={cancelEdit}
                          disabled={isSavingEdit}
                          className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(startStr)}
                          className="p-1.5 text-slate-400 hover:text-sky-300 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Date"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeletePeriodStart(startStr)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete Date"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
