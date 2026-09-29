import React from 'react';
import {
  CalendarHeart,
  Settings,
  Shield,
  TestTube,
  Sparkles,
  DatabaseZap,
  RefreshCw,
  AlertCircle,
  Wind,
  FileText,
  Smile,
  BookOpen,
} from 'lucide-react';

export default function Header({
  onOpenSettings,
  onLoadSampleData,
  onOpenPrivacy,
  onRunTests,
  hasData,
  isApiMode,
  isSyncing,
  onRefresh,
  onOpenRelaxation,
  onOpenDoctorReport,
  onOpenSymptomLogger,
  onOpenManual,
}) {
  return (
    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/95 via-[#0d1424]/90 to-[#191024]/90 border border-slate-800 p-5 md:p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 border border-white/10 shrink-0">
          <CalendarHeart className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Cycle Calendar &amp; Wellness
            </h1>
            <span className="bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              v1.0 Pro
            </span>
            {/* Database connection badge */}
            {isApiMode ? (
              <span className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm shadow-emerald-500/10">
                <DatabaseZap className="w-3 h-3 text-emerald-400" /> Account Sync Active
              </span>
            ) : (
              <button
                onClick={onRefresh}
                className="flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer shadow-sm shadow-rose-500/10 group"
                title="Database disconnected. Click to reconnect."
              >
                <AlertCircle className="w-3 h-3 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>Sync Disconnected — Retry</span>
              </button>
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            Holistic cycle tracking, fertile window predictions &amp; personalized daily wellness insights.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* User Manual / Guide Button */}
        {onOpenManual && (
          <button
            onClick={onOpenManual}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-200 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-500/40 shadow-sm transition-all cursor-pointer"
            title="Open comprehensive User Manual & Cycle Guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-300" />
            <span>User Manual</span>
          </button>
        )}

        {/* Calm Breathing Exercise */}
        {onOpenRelaxation && (
          <button
            onClick={onOpenRelaxation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30 transition-all cursor-pointer"
            title="Start a 2-minute 4-7-8 relaxing breathing session"
          >
            <Wind className="w-3.5 h-3.5 text-indigo-400" />
            <span>Calm Breath</span>
          </button>
        )}

        {/* Symptoms Logger */}
        {onOpenSymptomLogger && (
          <button
            onClick={() => onOpenSymptomLogger()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 transition-all cursor-pointer"
            title="Log flow, symptoms, and moods"
          >
            <Smile className="w-3.5 h-3.5 text-amber-400" />
            <span>Log Symptoms</span>
          </button>
        )}

        {/* Doctor Report */}
        {hasData && onOpenDoctorReport && (
          <button
            onClick={onOpenDoctorReport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/30 transition-all cursor-pointer"
            title="View printable medical cycle report"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Doctor Report</span>
          </button>
        )}

        {!hasData && (
          <button
            onClick={onLoadSampleData}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            title="Load sample cycle history into database"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Sample Data</span>
          </button>
        )}

        {/* Reload / Refresh from Database */}
        <button
          onClick={onRefresh}
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          title="Refresh latest data directly from database"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing…' : 'Refresh DB'}</span>
        </button>

        <button
          onClick={onRunTests}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all duration-200 cursor-pointer"
          title="Run Calculation Engine Self-Test Suite"
        >
          <TestTube className="w-3.5 h-3.5 text-sky-400" />
          <span>Self-Test</span>
        </button>

        <button
          onClick={onOpenPrivacy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all duration-200 cursor-pointer"
          title="Privacy & Database Security Information"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all duration-200 cursor-pointer"
          title="Configure Period Duration & Prediction Settings"
        >
          <Settings className="w-3.5 h-3.5 text-indigo-400" />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
}
