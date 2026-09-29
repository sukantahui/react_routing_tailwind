import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  Calendar,
  Droplets,
  Heart,
  Moon,
  Sun,
  ShieldCheck,
  FileText,
  HelpCircle,
  Clock,
  Layers,
  Smile,
  Activity,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Flame,
  Apple,
  Dumbbell,
  Wind,
} from 'lucide-react';

export default function UserManualModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('quickstart');

  if (!isOpen) return null;

  const tabs = [
    { id: 'quickstart', label: 'Quick Start', icon: Sparkles },
    { id: 'phases', label: 'The 4 Cycle Phases', icon: Heart },
    { id: 'calendar', label: 'Calendar & Forecasts', icon: Calendar },
    { id: 'symptoms', label: 'Symptoms & Flow', icon: Droplets },
    { id: 'reports', label: 'Doctor Report & Tools', icon: FileText },
    { id: 'faq', label: 'FAQ & Medical Advice', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="bg-gradient-to-b from-slate-900 via-[#0d1527] to-[#171024] border border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl relative text-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors z-20 cursor-pointer"
          aria-label="Close user manual"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 shrink-0 flex items-center gap-3.5 pr-14">
          <div className="p-3 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 text-rose-300 rounded-2xl border border-rose-500/30 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Cycle Calendar &amp; Wellness Guide
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                User Manual
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Everything you need to master cycle tracking, fertile window insights, and daily hormonal self-care.
            </p>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-800 shrink-0 px-4 pt-2 overflow-x-auto no-scrollbar gap-1 bg-slate-950/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all duration-200 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'text-rose-300 border-b-2 border-rose-400 bg-rose-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* ══════════════════════ TAB 1: QUICK START ══════════════════════ */}
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 border border-rose-500/20">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400" /> Start Tracking in 3 Simple Steps
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  The application uses an adaptive calculation engine that personalizes forecasts as you log your cycle start dates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center text-xs border border-rose-500/30">
                      1
                    </span>
                    <h5 className="font-bold text-white text-sm">Log Period Start Date</h5>
                    <p className="text-slate-400 text-[11px]">
                      Click <strong className="text-rose-300">"Log Today"</strong> under the circular wheel, or click any day in the monthly calendar to mark it as the start of menstrual bleeding.
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 shrink-0" /> Fast 1-Click Database Save
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center text-xs border border-purple-500/30">
                      2
                    </span>
                    <h5 className="font-bold text-white text-sm">Log Daily Flow &amp; Moods</h5>
                    <p className="text-slate-400 text-[11px]">
                      Use <strong className="text-purple-300">"Log Symptoms"</strong> to record flow intensity (Spotting, Light, Medium, Heavy), mood states, cramps, and personal diary notes.
                    </p>
                  </div>
                  <div className="text-[10px] text-purple-400 font-semibold bg-purple-500/10 p-2 rounded-xl border border-purple-500/20 flex items-center gap-1.5">
                    <Smile className="w-3 h-3 shrink-0" /> Full Sensations Journal
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-mono font-bold flex items-center justify-center text-xs border border-sky-500/30">
                      3
                    </span>
                    <h5 className="font-bold text-white text-sm">Review Cycle Insights</h5>
                    <p className="text-slate-400 text-[11px]">
                      View your <strong className="text-sky-300">Upcoming Period</strong>, <strong className="text-purple-300">Estimated Ovulation</strong>, <strong className="text-emerald-300">Fertile Window</strong>, and tailored hormonal self-care advice.
                    </p>
                  </div>
                  <div className="text-[10px] text-sky-400 font-semibold bg-sky-500/10 p-2 rounded-xl border border-sky-500/20 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 shrink-0" /> Real-Time Phase Guidance
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-200">First-Time Setup Tip</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Click <strong>"Bulk Entry"</strong> in the Period History section to quickly add 2 or 3 past period dates. This immediately calculates your exact historical average cycle length and variability range.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════ TAB 2: THE 4 CYCLE PHASES ══════════════════════ */}
          {activeTab === 'phases' && (
            <div className="space-y-5">
              <p className="text-slate-300">
                A menstrual cycle is divided into four distinct biological phases governed by estrogen, progesterone, and luteinizing hormone (LH). Understanding your phase helps you align your nutrition, productivity, and exercise:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Menstrual Phase */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-black text-rose-300 text-sm">
                      <Droplets className="w-4 h-4 text-rose-400" /> 1. Menstrual Phase
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-200 border border-rose-500/30">
                      Days 1 – 5
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Estrogen and progesterone are at baseline. The body sheds the uterine lining. Energy naturally directs inward.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                    <p><strong className="text-rose-300">🥗 Nourish:</strong> Warm broths, lentils, dark greens, iron, and herbal teas.</p>
                    <p><strong className="text-rose-300">🧘 Move:</strong> Gentle walks, yin yoga, soothing stretches, and rest.</p>
                    <p><strong className="text-rose-300">👶 Fertility:</strong> Very Low Chance of conception.</p>
                  </div>
                </div>

                {/* 2. Follicular Phase */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-black text-emerald-300 text-sm">
                      <Sun className="w-4 h-4 text-emerald-400" /> 2. Follicular Phase
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                      Days 6 – 13
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    FSH stimulates follicle growth and estrogen steadily rises. Mental clarity, mood, and social energy increase.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                    <p><strong className="text-emerald-300">🥗 Nourish:</strong> Fermented foods, colorful salads, fresh citrus, lean proteins.</p>
                    <p><strong className="text-emerald-300">🧘 Move:</strong> Strength training, jogging, upbeat cardio, and social activities.</p>
                    <p><strong className="text-emerald-300">👶 Fertility:</strong> Low to Moderate rising likelihood.</p>
                  </div>
                </div>

                {/* 3. Ovulatory Phase */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-black text-purple-300 text-sm">
                      <Sparkles className="w-4 h-4 text-purple-400" /> 3. Ovulatory Phase
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
                      Days 14 – 17
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Estrogen peaks and LH surges, prompting an ovary to release an egg. Maximum confidence and magnetic vitality.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                    <p><strong className="text-purple-300">🥗 Nourish:</strong> Berries, pumpkin seeds, avocados, leafy brassicas, electrolytes.</p>
                    <p><strong className="text-purple-300">🧘 Move:</strong> High intensity HIIT, dance, circuit training, peak stamina.</p>
                    <p><strong className="text-purple-300">👶 Fertility:</strong> <strong>Peak &amp; High Conception Likelihood</strong>.</p>
                  </div>
                </div>

                {/* 4. Luteal Phase */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-black text-amber-300 text-sm">
                      <Moon className="w-4 h-4 text-amber-400" /> 4. Luteal Phase
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30">
                      Days 18 – 28
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Progesterone rises to nourish the uterine lining, then drops if fertilization did not occur. Focus and nesting.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                    <p><strong className="text-amber-300">🥗 Nourish:</strong> Magnesium, roasted root veggies, quinoa, dark chocolate, chamomile.</p>
                    <p><strong className="text-amber-300">🧘 Move:</strong> Pilates, swimming, resistance bands, restorative evening walks.</p>
                    <p><strong className="text-amber-300">👶 Fertility:</strong> Low Chance as fertile window closes.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════ TAB 3: CALENDAR & FORECASTS ══════════════════════ */}
          {activeTab === 'calendar' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-400" /> Calendar Navigation &amp; Horizon Views
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The calendar provides two distinct views accessible via the header toggle:
                </p>
                <ul className="space-y-2 text-[11px] list-disc list-inside text-slate-300 pl-1">
                  <li>
                    <strong className="text-white">Monthly Focus View:</strong> Generates a full monthly grid showing daily cycle positions (<code className="text-slate-300 font-mono">CD 14</code>), period bleeding days, ovulation, and fertile windows.
                  </li>
                  <li>
                    <strong className="text-purple-300">3-Month Multi-Horizon View:</strong> Displays the current month alongside the next two forecast months simultaneously for forward scheduling and travel planning.
                  </li>
                </ul>
              </div>

              {/* Color Code Reference */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                  Visual Badge Color Codes
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/40 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-600 shrink-0 border border-rose-400"></span>
                    <div>
                      <strong className="text-rose-300 block">Actual Period (Solid Rose)</strong>
                      <span className="text-slate-400 text-[10px]">Confirmed bleeding days logged in your account.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-950 border border-rose-500 border-dashed shrink-0"></span>
                    <div>
                      <strong className="text-rose-300 block">Predicted Period (Dashed Rose)</strong>
                      <span className="text-slate-400 text-[10px]">Estimated future period start dates.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/40 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600 shrink-0 border border-purple-300"></span>
                    <div>
                      <strong className="text-purple-300 block">Estimated Ovulation (Radiant Purple)</strong>
                      <span className="text-slate-400 text-[10px]">Egg release window calculated from cycle history.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/40 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-sky-900 shrink-0 border border-sky-400"></span>
                    <div>
                      <strong className="text-sky-300 block">Fertile Window (Sky Blue)</strong>
                      <span className="text-slate-400 text-[10px]">Higher likelihood of conception (~6 days).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════ TAB 4: SYMPTOMS & FLOW ══════════════════════ */}
          {activeTab === 'symptoms' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Smile className="w-4 h-4 text-amber-400" /> Daily Sensations &amp; Mood Tracking
                </h4>
                <p className="text-xs text-slate-300">
                  Tracking flow variations and physical symptoms helps you detect patterns over time, such as regular ovulatory twinges (Mittelschmerz) or luteal mood changes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5" /> Bleeding Flow
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Log <strong>Spotting</strong>, <strong>Light</strong>, <strong>Medium</strong>, or <strong>Heavy</strong> flow to monitor bleeding volume and duration.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Smile className="w-3.5 h-3.5" /> Daily Moods
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Track emotional energy: <em>Calm, Happy, Energetic, Fatigued, Sensitive, Irritable, Anxious</em>.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Physical Signs
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Log cramps, headaches, breast tenderness, bloating, back pain, and skin breakouts.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-white">How to open the Symptom Logger:</strong> Click the <strong>"Log Symptoms"</strong> button in the top navigation bar, or click any day in the monthly calendar and select <strong>"Log Symptoms"</strong>.
              </div>
            </div>
          )}

          {/* ══════════════════════ TAB 5: DOCTOR REPORT & TOOLS ══════════════════════ */}
          {activeTab === 'reports' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Doctor Report */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
                    <FileText className="w-4 h-4 text-purple-400" /> Doctor &amp; Clinic Report
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Generates an organized, clinical summary of your historical cycle lengths, intervals, variability, and notes formatted for gynaecologist and doctor appointments.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Click <strong>"Doctor Report"</strong> in the top header or Insights section, then click <strong>"Print Report"</strong> to print or export as PDF.
                  </p>
                </div>

                {/* Calm Breathing */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-indigo-300 text-sm">
                    <Wind className="w-4 h-4 text-indigo-400" /> Mindful Calm Breathing
                  </div>
                  <p className="text-[11px] text-slate-400">
                    A guided 2-minute 4-7-8 breathing tool designed to activate the parasympathetic nervous system for menstrual cramp relief, calming uterine tension, and PMS stress reduction.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Click <strong>"Calm Breath"</strong> in the top header to launch a soothing session.
                  </p>
                </div>
              </div>

              {/* Settings Customization */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h5 className="font-bold text-white text-xs">Custom Cycle Settings &amp; Overrides</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Through the <strong>Settings</strong> modal (gear icon), you can customize your typical bleeding duration (e.g., 4 to 7 days), override the automatic cycle length with a custom target length, or adjust your estimated luteal phase length.
                </p>
              </div>
            </div>
          )}

          {/* ══════════════════════ TAB 6: FAQ & MEDICAL ADVICE ══════════════════════ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h5 className="font-bold text-white text-xs">How is my average cycle length calculated?</h5>
                  <p className="text-[11px] text-slate-400">
                    The app measures the number of days between the first day of one period and the first day of the next period across all recorded cycles, calculating the exact arithmetic mean.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h5 className="font-bold text-white text-xs">Can this calendar be used as a contraceptive method?</h5>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-amber-300">No.</strong> Cycle predictions are mathematical estimates based on historical dates. Natural biological ovulation can fluctuate due to stress, illness, travel, and hormonal changes. Do not rely on calendar tracking as a contraceptive method.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h5 className="font-bold text-white text-xs">What if my periods are irregular?</h5>
                  <p className="text-[11px] text-slate-400">
                    The app calculates a <strong>Variability Range</strong> and adjusts its <strong>Prediction Reliability</strong> score (High, Moderate, Low). If your cycles vary considerably, the dashboard will notify you and highlight the variability.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h5 className="font-bold text-white text-xs">How do I edit or delete a mistakenly recorded date?</h5>
                  <p className="text-[11px] text-slate-400">
                    Scroll down to the <strong>Period History</strong> section. In the history table, click the <em>Pencil (Edit)</em> icon to modify a date or the <em>Trash (Delete)</em> icon to remove it. All updates sync instantly to the database.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h5 className="font-bold text-white text-xs">Is my health data stored in the browser?</h5>
                  <p className="text-[11px] text-slate-400">
                    No. All cycle records and health notes are stored exclusively in our secure database tied to your authenticated account. Zero cycle data is saved in your browser's local storage.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 shrink-0 flex items-center justify-between bg-slate-950/60">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Private &amp; Secure Health Tracking
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
