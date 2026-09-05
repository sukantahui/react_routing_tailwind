import React, { useState } from 'react';
import { History, Trash2, Download, Upload, CalendarDays } from 'lucide-react';
import PeriodDateForm from './PeriodDateForm';
import PeriodHistoryTable from './PeriodHistoryTable';
import BulkDateEntryModal from './BulkDateEntryModal';

export default function PeriodHistorySection({
  periodStarts,
  periodEntries,
  settings,
  onAddPeriodStart,
  onBulkAddPeriodDates,
  onEditPeriodStart,
  onDeletePeriodStart,
  onClearHistory,
  onExportData,
  onImportData,
  isSyncing,
}) {
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        onImportData(content);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset file input
  };

  return (
    <section className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Period History
            </h2>
            <p className="text-xs text-slate-400">
              Record period start dates to calculate your average cycle length.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Bulk Entry button — always visible */}
          <button
            onClick={() => setIsBulkOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 border border-violet-500/30 transition-colors"
            title="Add multiple past period dates at once for better pattern analysis"
          >
            <CalendarDays className="w-3.5 h-3.5 text-violet-400" />
            <span>Bulk Entry</span>
          </button>

          {periodStarts.length > 0 && (
            <button
              onClick={onExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-colors"
              title="Export Cycle Data as JSON"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export</span>
            </button>
          )}

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          {periodStarts.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/40 transition-colors"
              title="Clear all recorded period history"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Single-date Input Form */}
      <PeriodDateForm
        onAddPeriodStart={onAddPeriodStart}
        periodStarts={periodStarts}
      />

      {/* History Table */}
      <PeriodHistoryTable
        periodStarts={periodStarts}
        periodEntries={periodEntries}
        settings={settings}
        onEditPeriodStart={onEditPeriodStart}
        onDeletePeriodStart={onDeletePeriodStart}
      />

      {/* Bulk Date Entry Modal */}
      <BulkDateEntryModal
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        periodStarts={periodStarts}
        onBulkAddPeriodDates={onBulkAddPeriodDates}
        isSyncing={isSyncing}
      />
    </section>
  );
}
