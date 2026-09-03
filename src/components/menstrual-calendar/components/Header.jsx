import React from 'react';
import { CalendarHeart, Settings, Shield, TestTube, Sparkles, Cloud, CloudOff, RefreshCw } from 'lucide-react';

export default function Header({
  onOpenSettings,
  onLoadSampleData,
  onOpenPrivacy,
  onRunTests,
  hasData,
  isApiMode,
  isSyncing,
  onSyncToCloud,
}) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 md:p-6 rounded-3xl shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 border border-white/10 shrink-0">
          <CalendarHeart className="w-6 h-6" />
        </div>
      <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Cycle Calendar
            </h1>
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              v1.0 Pro
            </span>
            {/* Cloud / Local badge */}
            {isApiMode ? (
              <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Cloud className="w-3 h-3" /> Cloud Sync
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <CloudOff className="w-3 h-3" /> Local Only
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            Track your historical cycles &amp; view estimated upcoming period &amp; fertile dates.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {!hasData && (
          <button
            onClick={onLoadSampleData}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 transition-all duration-200"
            title="Load sample cycle history for demonstration"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Load Sample Data</span>
          </button>
        )}

        {/* Sync button — shown in API mode when there is data */}
        {isApiMode && hasData && (
          <button
            onClick={onSyncToCloud}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sync all period dates to your account"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing…' : 'Sync'}</span>
          </button>
        )}

        <button
          onClick={onRunTests}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all duration-200"
          title="Run Calculation Engine Self-Test Suite"
        >
          <TestTube className="w-3.5 h-3.5 text-sky-400" />
          <span>Self-Test</span>
        </button>

        <button
          onClick={onOpenPrivacy}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all duration-200"
          title="Privacy & Local Storage Information"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all duration-200"
          title="Configure Period Duration & Prediction Settings"
        >
          <Settings className="w-3.5 h-3.5 text-indigo-400" />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
}
