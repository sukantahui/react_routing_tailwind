import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCycleData } from './hooks/useCycleData';
import Header from './components/Header';
import DisclaimerBanner from './components/DisclaimerBanner';
import CycleWheelHero from './components/Dashboard/CycleWheelHero';
import CycleDashboard from './components/Dashboard/CycleDashboard';
import MenstrualCalendar from './components/Calendar/MenstrualCalendar';
import PeriodHistorySection from './components/PeriodHistory/PeriodHistorySection';
import CycleInsights from './components/Insights/CycleInsights';
import CycleSettingsModal from './components/Settings/CycleSettingsModal';
import PrivacySection from './components/Privacy/PrivacySection';
import CalculationTestSuite from './components/Testing/CalculationTestSuite';
import RelaxationBreathingModal from './components/Relaxation/RelaxationBreathingModal';
import SymptomLoggerModal from './components/PeriodHistory/SymptomLoggerModal';
import DoctorReportModal from './components/Insights/DoctorReportModal';
import UserManualModal from './components/Manual/UserManualModal';
import { X, CheckCircle2, AlertTriangle, Info, Lock, Heart, ArrowLeft, Home } from 'lucide-react';
import { formatISODate } from './utils/dateUtils';
import { loginService } from '../../services/loginService';

/** Helper to strictly check if user is an enrolled female student */
export function checkIsFemaleStudent(user) {
  if (!user) return false;

  const role = (
    user.role ||
    user.userType?.userTypeName ||
    user.user_type_name ||
    user.user_type ||
    user.roleName ||
    ""
  ).trim().toLowerCase();

  const isStudent =
    role.includes("student") ||
    Boolean(user.student_id || user.studentId || user.student);

  if (!isStudent) return false;

  const genderId =
    user.gender_id ??
    user.genderId ??
    user.gender_ID ??
    user.student?.gender_id ??
    user.student?.genderId ??
    user.student?.gender_ID ??
    null;

  if (genderId !== null && genderId !== undefined) {
    if (Number(genderId) === 2 || String(genderId) === "2") return true;
    if (Number(genderId) === 1 || String(genderId) === "1") return false;
  }

  const genderStr = (
    user.gender ||
    user.genderName ||
    user.gender_name ||
    user.student?.gender ||
    user.student?.genderName ||
    user.student?.gender_name ||
    ""
  ).trim().toLowerCase();

  if (genderStr.includes("female") || genderStr === "f" || genderStr === "woman") {
    return true;
  }

  return false;
}

export default function MenstrualCalendarApp() {
  const navigate = useNavigate();

  // Modals visibility state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isRelaxationOpen, setIsRelaxationOpen] = useState(false);
  const [isDoctorReportOpen, setIsDoctorReportOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [symptomInitialDate, setSymptomInitialDate] = useState(formatISODate(new Date()));

  // Current authenticated user & Female student validation state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isVerifyingAccess, setIsVerifyingAccess] = useState(true);

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
    refreshFromDatabase,
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
      setIsVerifyingAccess(false);
      return;
    }

    let isMounted = true;
    const verifyUserProfile = async () => {
      try {
        const raw = localStorage.getItem('user');
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed && isMounted) {
          setCurrentUser(parsed);
        }

        // Fetch fresh profile from API to ensure student role and gender are loaded
        const res = await loginService.currentUser();
        if (res?.data && isMounted) {
          const combinedUser = { ...parsed, ...res.data };
          setCurrentUser(combinedUser);
          try {
            localStorage.setItem('user', JSON.stringify(combinedUser));
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('Could not refresh profile for menstrual calendar access:', err);
      } finally {
        if (isMounted) {
          setIsVerifyingAccess(false);
        }
      }
    };

    verifyUserProfile();

    return () => {
      isMounted = false;
    };
  }, [isAuth, navigate]);

  // Open Symptom Logger handler
  const handleOpenSymptomLogger = useCallback((dateStr = formatISODate(new Date())) => {
    setSymptomInitialDate(dateStr);
    setIsSymptomModalOpen(true);
  }, []);

  // Save Symptom Entry handler
  const handleSaveSymptomEntry = useCallback(
    async (dateStr, noteText, markAsPeriod) => {
      if (periodStarts.includes(dateStr)) {
        return await editPeriodStart(dateStr, dateStr, noteText);
      } else {
        return await addPeriodStart(dateStr, noteText);
      }
    },
    [periodStarts, editPeriodStart, addPeriodStart]
  );

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#060b14] text-slate-100 flex items-center justify-center p-6">
        <div className="text-center p-8 bg-slate-900/90 border border-slate-800 rounded-3xl max-w-md shadow-2xl backdrop-blur-xl">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-sm text-slate-400 mb-6">You must be logged in to access the Menstrual Cycle Calendar.</p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:scale-105 transition cursor-pointer"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  // Access check: only active for female students
  const isFemale = checkIsFemaleStudent(currentUser);

  if (!isVerifyingAccess && !isFemale) {
    return (
      <div className="min-h-screen bg-[#060b14] text-slate-100 flex items-center justify-center p-6">
        <div className="text-center p-8 sm:p-10 bg-slate-900/90 border border-slate-800 rounded-3xl max-w-lg shadow-2xl backdrop-blur-xl space-y-5">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
            <Heart size={32} className="text-rose-400 animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
              <span>🌸 Dedicated Health Portal</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Active for Female Students Only</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              The Menstrual Cycle &amp; Health Calendar is exclusively configured for female students of Coder &amp; AccoTax to privately and securely track menstrual wellness, cycle phases, and health insights.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span>Current Account:</span>
              <span className="text-white font-semibold">{currentUser?.name || currentUser?.userName || "User"}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Account Role:</span>
              <span className="text-slate-200">{currentUser?.role || currentUser?.userType?.userTypeName || "Member"}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition cursor-pointer"
            >
              <Home size={16} />
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isVerifyingAccess || !isLoaded) {
    return (
      <div className="min-h-screen bg-[#060b14] text-slate-100 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-300">
            Verifying Student Access &amp; Loading Health Data...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto selection:bg-rose-500/30 selection:text-rose-200">
      {/* Toast Notification Popup */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs max-w-md animate-slideUp backdrop-blur-xl ${
            notification.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200 shadow-rose-950/50'
              : notification.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/50 text-amber-200 shadow-amber-950/50'
              : 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-slate-950/50'
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
        onRefresh={refreshFromDatabase}
        onOpenRelaxation={() => setIsRelaxationOpen(true)}
        onOpenDoctorReport={() => setIsDoctorReportOpen(true)}
        onOpenSymptomLogger={handleOpenSymptomLogger}
        onOpenManual={() => setIsManualOpen(true)}
      />

      {/* 2. Medical & Privacy Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 3. Holistic Cycle Dial & Today's Hormonal Phase Hero */}
      <CycleWheelHero
        periodStarts={periodStarts}
        settings={settings}
        onOpenSymptomLogger={handleOpenSymptomLogger}
        onMarkPeriodStart={addPeriodStart}
        onOpenRelaxation={() => setIsRelaxationOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
      />

      {/* 4. Compact Cycle Statistics Dashboard */}
      <CycleDashboard cycleStats={cycleStats} predictedCycles={predictedCycles} />

      {/* 5. Interactive Monthly & Multi-Horizon Calendar */}
      <MenstrualCalendar
        periodStarts={periodStarts}
        dateStatusMap={dateStatusMap}
        cycleStats={cycleStats}
        settings={settings}
        onMarkPeriodStart={addPeriodStart}
        onOpenSymptomLogger={handleOpenSymptomLogger}
      />

      {/* 6. Period History Section */}
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

      {/* 7. Statistical Insights & Bar Chart */}
      <CycleInsights
        cycleStats={cycleStats}
        onOpenDoctorReport={() => setIsDoctorReportOpen(true)}
      />

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

      <RelaxationBreathingModal
        isOpen={isRelaxationOpen}
        onClose={() => setIsRelaxationOpen(false)}
      />

      <SymptomLoggerModal
        isOpen={isSymptomModalOpen}
        onClose={() => setIsSymptomModalOpen(false)}
        initialDateStr={symptomInitialDate}
        periodEntries={periodEntries}
        onSaveSymptomEntry={handleSaveSymptomEntry}
        isSyncing={isSyncing}
      />

      <DoctorReportModal
        isOpen={isDoctorReportOpen}
        onClose={() => setIsDoctorReportOpen(false)}
        cycleStats={cycleStats}
        apiProfile={apiProfile}
        periodStarts={periodStarts}
        periodEntries={periodEntries}
        settings={settings}
      />

      {/* User Manual Modal */}
      <UserManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />
    </div>
  );
}
