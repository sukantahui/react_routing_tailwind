import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCycleData } from './hooks/useCycleData';
import Header from './components/Header';
import DisclaimerBanner from './components/DisclaimerBanner';
import CycleDashboard from './components/Dashboard/CycleDashboard';
import MenstrualCalendar from './components/Calendar/MenstrualCalendar';
import PeriodHistorySection from './components/PeriodHistory/PeriodHistorySection';
import CycleInsights from './components/Insights/CycleInsights';
import CycleSettingsModal from './components/Settings/CycleSettingsModal';
import PrivacySection from './components/Privacy/PrivacySection';
import CalculationTestSuite from './components/Testing/CalculationTestSuite';
import { X, CheckCircle2, AlertTriangle, Info, Lock } from 'lucide-react';

export default function MenstrualCalendarApp() {
  const navigate = useNavigate();

  // Modals visibility state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);

  // Cycle data hook
  const {
    isLoaded,
    isApiMode,
    isSyncing,
    periodStarts,
    periodEntries,
    settings,
    apiProfile,
    cycleStats,
    predictedCycles,
    dateStatusMap,
    notification,
    addPeriodStart,
    bulkAddPeriodDates,
    editPeriodStart,
    deletePeriodStart,
    clearHistory,
    loadSampleData,
    updateSettings,
    updateHealthProfile,
    syncToCloud,
    exportData,
    importData,
    dismissNotification,
  } = useCycleData();

  // Explicit Authentication Check
  const token = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  const isAuth = Boolean(
    token &&
    token !== 'null' &&
    token !== 'undefined' &&
    token.trim() !== '' &&
    token !== 'false' &&
    rawUser &&
    rawUser !== 'null' &&
    rawUser !== 'undefined'
  );

  useEffect(() => {
    if (!isAuth) {
      navigate('/login', {
        replace: true,
        state: { from: '/menstrual-calendar', error: 'Please log in to access the Menstrual Cycle Calendar.' },
      });
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-6">
        <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-md shadow-2xl">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-sm text-slate-400 mb-6">You must be logged in to view the Menstrual Cycle Calendar.</p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-rose-500/25 hover:scale-105 transition cursor-pointer"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-300">
            Loading Menstrual Cycle Data...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto selection:bg-rose-500/30 selection:text-rose-200">
      {/* Toast Notification Popup */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs max-w-md animate-slideUp backdrop-blur-xl ${
            notification.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200 shadow-rose-950/50'
              : notification.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/50 text-amber-200 shadow-amber-950/50'
              : 'bg-slate-900/90 border-slate-700 text-slate-100 shadow-slate-950/50'
          }`}
        >
          {notification.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
          {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {notification.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}

          <span className="flex-1 leading-normal">{notification.text}</span>

          <button
            onClick={dismissNotification}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header Navigation Bar */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLoadSampleData={loadSampleData}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onRunTests={() => setIsTestsOpen(true)}
        hasData={periodStarts.length > 0}
        isApiMode={isApiMode}
        isSyncing={isSyncing}
        onSyncToCloud={syncToCloud}
      />

      {/* 2. Medical & Privacy Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 3. Compact Cycle Statistics Dashboard */}
      <CycleDashboard cycleStats={cycleStats} predictedCycles={predictedCycles} />

      {/* 4. Interactive Monthly Calendar */}
      <MenstrualCalendar
        periodStarts={periodStarts}
        dateStatusMap={dateStatusMap}
        cycleStats={cycleStats}
        settings={settings}
        onMarkPeriodStart={addPeriodStart}
      />

      {/* 5. Period History Section */}
      <PeriodHistorySection
        periodStarts={periodStarts}
        periodEntries={periodEntries}
        settings={settings}
        onAddPeriodStart={addPeriodStart}
        onBulkAddPeriodDates={bulkAddPeriodDates}
        onEditPeriodStart={editPeriodStart}
        onDeletePeriodStart={deletePeriodStart}
        onClearHistory={clearHistory}
        onExportData={exportData}
        onImportData={importData}
        isSyncing={isSyncing}
      />

      {/* 6. Statistical Insights & Bar Chart */}
      <CycleInsights cycleStats={cycleStats} />

      {/* Modals */}
      <CycleSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        apiProfile={apiProfile}
        onUpdateHealthProfile={updateHealthProfile}
        isApiMode={isApiMode}
      />

      <PrivacySection
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onClearAllData={clearHistory}
      />

      <CalculationTestSuite
        isOpen={isTestsOpen}
        onClose={() => setIsTestsOpen(false)}
      />
    </div>
  );
}
