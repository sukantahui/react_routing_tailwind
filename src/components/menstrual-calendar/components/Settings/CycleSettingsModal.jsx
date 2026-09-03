import React, { useState } from 'react';
import { X, Settings, Check, HelpCircle, Sparkles, Sliders, ChevronLeft, ChevronRight, User, Heart, Activity } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../../constants/cycleConstants';

// Days available to select: 20 to 45
const CYCLE_DAY_OPTIONS = Array.from({ length: 26 }, (_, i) => i + 20); // [20, 21, ..., 45]

// Common preset cycles with labels
const COMMON_PRESETS = [
  { days: 21, label: 'Short' },
  { days: 28, label: 'Typical' },
  { days: 30, label: 'Regular' },
  { days: 35, label: 'Long' },
];

export default function CycleSettingsModal({ isOpen, onClose, settings, onUpdateSettings, apiProfile, onUpdateHealthProfile, isApiMode }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('cycle'); // 'cycle' | 'health'

  const [periodDuration, setPeriodDuration] = useState(
    settings.periodDuration || DEFAULT_SETTINGS.periodDuration
  );
  const [averageCycleLength, setAverageCycleLength] = useState(
    settings.averageCycleLength || DEFAULT_SETTINGS.averageCycleLength
  );
  const [useCustomAverageCycle, setUseCustomAverageCycle] = useState(
    settings.useCustomAverageCycle !== undefined ? settings.useCustomAverageCycle : false
  );
  const [lutealPhaseLength, setLutealPhaseLength] = useState(
    settings.lutealPhaseLength || DEFAULT_SETTINGS.lutealPhaseLength
  );
  const [predictionMonths, setPredictionMonths] = useState(
    settings.predictionMonths || DEFAULT_SETTINGS.predictionMonths
  );

  const handleSelectDay = (day) => {
    setAverageCycleLength(day);
    setUseCustomAverageCycle(true);
  };

  const handleStepDay = (delta) => {
    const next = Math.min(45, Math.max(20, Number(averageCycleLength) + delta));
    setAverageCycleLength(next);
    setUseCustomAverageCycle(true);
  };

  // ── Health profile state ──────────────────────────────────────────────
  const [goal, setGoal]               = useState(apiProfile?.goal || 'general');
  const [dateOfBirth, setDateOfBirth] = useState(apiProfile?.date_of_birth || '');
  const [weightKg, setWeightKg]       = useState(apiProfile?.weight_kg || '');
  const [heightCm, setHeightCm]       = useState(apiProfile?.height_cm || '');
  const [bloodGroup, setBloodGroup]   = useState(apiProfile?.blood_group || '');
  const [medicalNotes, setMedicalNotes] = useState(apiProfile?.medical_notes || '');

  const handleSave = async (e) => {
    e.preventDefault();
    if (activeTab === 'cycle') {
      onUpdateSettings({
        periodDuration: parseInt(periodDuration, 10),
        averageCycleLength: parseInt(averageCycleLength, 10),
        useCustomAverageCycle: Boolean(useCustomAverageCycle),
        lutealPhaseLength: parseInt(lutealPhaseLength, 10),
        predictionMonths: parseInt(predictionMonths, 10),
      });
    } else {
      if (onUpdateHealthProfile) {
        await onUpdateHealthProfile({
          goal,
          date_of_birth: dateOfBirth || null,
          weight_kg: weightKg ? parseFloat(weightKg) : null,
          height_cm: heightCm ? parseFloat(heightCm) : null,
          blood_group: bloodGroup || null,
          medical_notes: medicalNotes || null,
        });
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl relative text-slate-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors z-10"
          aria-label="Close settings modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 p-6 pb-4 shrink-0">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Settings
            </h3>
            <p className="text-xs text-slate-400">
              Manage your cycle parameters and health profile.
            </p>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-800 shrink-0 px-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('cycle')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-200 ${
              activeTab === 'cycle'
                ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-500/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" /> Cycle Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-200 ${
              activeTab === 'health'
                ? 'text-rose-400 border-b-2 border-rose-400 bg-rose-500/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" /> Health Profile
            {!isApiMode && <span className="text-[10px] text-amber-400 font-normal">(login required)</span>}
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          <form id="cycle-settings-form" onSubmit={handleSave} className="space-y-6 text-xs">

            {/* ═══════════════════════════ HEALTH PROFILE TAB ═══════════════════════════ */}
            {activeTab === 'health' && (
              <div className="space-y-4">

                {!isApiMode && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <Activity className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-amber-300 text-xs leading-relaxed">
                      Health profile is saved to your account. You are currently in local mode — data will be saved once you log in.
                    </p>
                  </div>
                )}

                {/* Goal */}
                <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <label className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" /> Goal
                  </label>
                  <p className="text-slate-500 mb-3">What are you primarily tracking for?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'general',     label: '📊 General',   desc: 'Awareness' },
                      { value: 'pregnancy',   label: '🤰 Pregnancy', desc: 'Planning' },
                      { value: 'safe_period', label: '🛡️ Safe',      desc: 'Safe period' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setGoal(opt.value)}
                        className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                          goal === opt.value
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-base">{opt.label}</span>
                        <span className="text-[10px] mt-0.5 opacity-70">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DOB + Weight + Height */}
                <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <label className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" /> Body Metrics
                  </label>
                  <p className="text-slate-500 mb-2">Optional — helps calculate BMI and age-based parameters.</p>

                  <div>
                    <label className="text-slate-400 mb-1 block">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      max={new Date().toISOString().slice(0, 10)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 mb-1 block">Weight (kg)</label>
                      <input
                        type="number"
                        min="20" max="300" step="0.1"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        placeholder="e.g. 58.5"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">Height (cm)</label>
                      <input
                        type="number"
                        min="50" max="250" step="0.1"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        placeholder="e.g. 162"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 mb-1 block">Blood Group</label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                    >
                      <option value="">Select blood group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Medical Notes */}
                <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <label className="font-bold text-slate-200 text-sm">Medical Notes</label>
                  <p className="text-slate-500 mb-2">Relevant conditions: PCOS, endometriosis, thyroid, etc.</p>
                  <textarea
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    rows={3}
                    maxLength={255}
                    placeholder="e.g. PCOS diagnosed, irregular cycles..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-rose-500 text-sm resize-none"
                  />
                  <p className="text-right text-slate-600 text-[10px]">{medicalNotes.length}/255</p>
                </div>
              </div>
            )}

            {/* ═══════════════════════════ CYCLE SETTINGS TAB ═══════════════════════════ */}
            {activeTab === 'cycle' && (<>


            <div className="space-y-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">

              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-sm">Average Cycle Length</span>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUseCustomAverageCycle(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                      !useCustomAverageCycle
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseCustomAverageCycle(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                      useCustomAverageCycle
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    Manual
                  </button>
                </div>
              </div>

              {/* Selected Day Hero Display + Stepper */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleStepDay(-1)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all active:scale-95"
                  aria-label="Decrease cycle length"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 text-center">
                  <div className={`text-5xl font-black tracking-tight transition-colors ${
                    useCustomAverageCycle ? 'text-purple-300' : 'text-emerald-300'
                  }`}>
                    {averageCycleLength}
                  </div>
                  <div className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-widest">
                    days per cycle
                  </div>
                  <div className={`text-[10px] mt-1 font-medium px-2.5 py-0.5 rounded-full inline-block border ${
                    useCustomAverageCycle
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {useCustomAverageCycle ? 'Custom Manual' : 'Auto from History'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStepDay(1)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all active:scale-95"
                  aria-label="Increase cycle length"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                  Quick Presets
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {COMMON_PRESETS.map(({ days, label }) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => handleSelectDay(days)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all duration-150 ${
                        Number(averageCycleLength) === days && useCustomAverageCycle
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 font-bold shadow-lg shadow-purple-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-base font-extrabold leading-none">{days}</div>
                      <div className="text-[9px] font-semibold mt-0.5 uppercase tracking-wider text-slate-500">
                        {label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Picker Grid: 20–45 */}
              <div>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                  Select Any Day (20 – 45)
                </p>
                <div className="grid grid-cols-9 gap-1">
                  {CYCLE_DAY_OPTIONS.map((day) => {
                    const isSelected = Number(averageCycleLength) === day && useCustomAverageCycle;
                    const isTypical = day === 28;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleSelectDay(day)}
                        title={`${day} days${isTypical ? ' (typical)' : ''}`}
                        className={`
                          h-8 w-full rounded-lg text-[11px] font-bold transition-all duration-150 border
                          ${isSelected
                            ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white border-purple-400 shadow-md shadow-purple-500/30 scale-110 z-10 relative'
                            : isTypical
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-600 mt-2">
                  Day highlighted in green (28) is a typical reference. Purple = your selection.
                </p>
              </div>
            </div>

            {/* ── Section 2: Period Duration ────────────────────────────── */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 text-sm">
                  Period Bleeding Duration
                </label>
                <span className="font-mono text-rose-400 font-extrabold text-base bg-rose-500/10 px-3 py-0.5 rounded-full border border-rose-500/20">
                  {periodDuration} days
                </span>
              </div>
              <p className="text-slate-500 leading-normal text-[11px]">
                How many days your menstrual bleeding typically lasts.
              </p>
              {/* Bleeding duration buttons 1–10 */}
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPeriodDuration(d)}
                    className={`h-8 rounded-lg text-[11px] font-bold border transition-all duration-150 ${
                      Number(periodDuration) === d
                        ? 'bg-gradient-to-b from-rose-500 to-rose-700 text-white border-rose-400 shadow shadow-rose-500/30 scale-110 z-10 relative'
                        : d === 5
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-600">
                Pink highlighted (5) is typical default. Red = your selection.
              </p>
            </div>

            {/* ── Section 3: Prediction Horizon ────────────────────────── */}
            <div className="space-y-3">
              <label className="font-bold text-slate-200 text-sm block">
                Future Prediction Horizon
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPredictionMonths(m)}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all duration-200 ${
                      predictionMonths === m
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white border-transparent shadow-lg shadow-purple-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 4: Luteal Phase ───────────────────────────────── */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                  Estimated Luteal Phase
                  <div className="relative group">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-56 p-2.5 bg-slate-950 text-slate-200 text-xs rounded-xl border border-slate-800 shadow-2xl z-30 pointer-events-none font-normal leading-relaxed">
                      Days from ovulation to next period. The standard clinical assumption is 14 days.
                    </div>
                  </div>
                </label>
                <span className="font-mono text-purple-400 font-extrabold text-base bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20">
                  {lutealPhaseLength} days
                </span>
              </div>
              <div className="grid grid-cols-9 gap-1">
                {Array.from({ length: 9 }, (_, i) => i + 10).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setLutealPhaseLength(d)}
                    className={`h-8 rounded-lg text-[11px] font-bold border transition-all duration-150 ${
                      Number(lutealPhaseLength) === d
                        ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white border-purple-400 shadow shadow-purple-500/30 scale-110 z-10 relative'
                        : d === 14
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-600">
                Purple highlighted (14) is the clinical default. Your selection is shown in bold purple.
              </p>
            </div>

            </>)}

          </form>
        </div>

        {/* Sticky Footer Buttons */}
        <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            form="cycle-settings-form"
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-200"
          >
            <Check className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
