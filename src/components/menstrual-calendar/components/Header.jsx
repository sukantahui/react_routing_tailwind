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
    <header className="relative z-30 bg-gradient-to-r from-slate-900/95 via-[#0d1424]/90 to-[#191024]/90 border border-slate-800 p-4 md:p-5 rounded-3xl shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* ========================================================= */}
        {/* LEFT: Branding & Live Cloud Database Status              */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative group shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 border border-white/15">
              <CalendarHeart className="w-6 h-6" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Cycle Calendar <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">&amp; Wellness</span>
              </h1>
              <span className="hidden sm:inline-flex bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                v1.0 Pro
              </span>

              {/* Database Connection Badge */}
              {isApiMode ? (
                <span
                  title="Database Cloud Sync Active"
                  className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <DatabaseZap className="w-3 h-3 text-emerald-400" />
                  <span>Account Sync Active</span>
                </span>
              ) : (
                <button
                  onClick={onRefresh}
                  className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-all cursor-pointer shadow-sm group"
                  title="Database disconnected. Click to reconnect."
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                  <AlertCircle className="w-3 h-3 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>Offline — Reconnect</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Holistic cycle tracking, fertile window predictions &amp; personalized daily wellness insights.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT: Clean, Organized Action Bar                       */}
        {/* ========================================================= */}
        <div className="flex items-center flex-wrap gap-2 justify-start xl:justify-end">
          
          {/* Primary Action: Log Symptoms */}
          {onOpenSymptomLogger && (
            <button
              onClick={() => onOpenSymptomLogger()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="Log flow intensity, moods, physical symptoms & notes"
            >
              <Smile className="w-4 h-4" />
              <span>Log Symptoms</span>
            </button>
          )}

          {/* Calm Breathing */}
          {onOpenRelaxation && (
            <button
              onClick={onOpenRelaxation}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 transition-all cursor-pointer whitespace-nowrap"
              title="2-minute relaxing 4-7-8 breathing exercise for cramp relief"
            >
              <Wind className="w-3.5 h-3.5 text-indigo-400" />
              <span>Calm Breath</span>
            </button>
          )}

          {/* User Manual */}
          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500/15 to-rose-500/15 hover:from-purple-500/25 hover:to-rose-500/25 text-purple-200 hover:text-white border border-purple-500/30 transition-all cursor-pointer whitespace-nowrap"
              title="Open comprehensive User Manual & Cycle Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-300" />
              <span>User Manual</span>
            </button>
          )}

          {/* Doctor Report */}
          {hasData && onOpenDoctorReport && (
            <button
              onClick={onOpenDoctorReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 hover:text-purple-100 border border-purple-500/30 transition-all cursor-pointer whitespace-nowrap"
              title="View & print clinical doctor cycle summary"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Doctor Report</span>
            </button>
          )}

          {/* Sample Data (shown when empty) */}
          {!hasData && (
            <button
              onClick={onLoadSampleData}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              title="Load demo cycle data into database"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Sample Data</span>
            </button>
          )}

          {/* Subtle Divider */}
          <div className="hidden sm:block h-6 w-[1px] bg-slate-800 my-auto mx-0.5" />

          {/* Refresh Database */}
          <button
            onClick={onRefresh}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
            title="Refresh latest data directly from database"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Sync'}</span>
          </button>

          {/* Calculation Engine Self-Test */}
          <button
            onClick={onRunTests}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer whitespace-nowrap"
            title="Run Calculation Engine Self-Test Suite"
          >
            <TestTube className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Self-Test</span>
          </button>

          {/* Privacy & Security */}
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer whitespace-nowrap"
            title="Privacy & Database Security Information"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Privacy</span>
          </button>

          {/* Cycle Settings */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 hover:text-indigo-100 border border-indigo-500/30 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title="Configure Period Duration & Prediction Settings"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>Settings</span>
          </button>

        </div>

      </div>
    </header>
  );
}


