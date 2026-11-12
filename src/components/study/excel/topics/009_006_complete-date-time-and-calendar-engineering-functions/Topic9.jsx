"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
  const sectionsRef = useRef([]);

  // Intersection Observer for fluid section reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Download Master Workbook
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "complete_date_time_calendar_engineering_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------------------------------------------------------------------
  // INTERACTIVE BENCHMARK & SIMULATOR STATE
  // ---------------------------------------------------------------------------

  const [inpStartDate, setInpStartDate] = useState("2026-01-31");
  const [inpMonths, setInpMonths] = useState(1);

  const edateResult = useMemo(() => {
    const s = new Date(inpStartDate);
    const mOffset = parseInt(inpMonths, 10);

    if (isNaN(s.getTime()) || isNaN(mOffset)) {
      return { isError: true, error: "#VALUE! Invalid date or month offset" };
    }

    const startYear = s.getFullYear();
    const startMonth = s.getMonth();
    const startDay = s.getDate();

    // Calculate target year and month
    const targetMonthIndex = startMonth + mOffset;
    const targetDateObj = new Date(startYear, targetMonthIndex, 1);
    const targetYear = targetDateObj.getFullYear();
    const targetMonth = targetDateObj.getMonth();

    // Check days in target month
    const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const clampedDay = Math.min(startDay, daysInTargetMonth);
    const finalDate = new Date(targetYear, targetMonth, clampedDay);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = `${String(finalDate.getDate()).padStart(2, "0")}-${monthNames[finalDate.getMonth()]}-${finalDate.getFullYear()}`;

    const wasClamped = clampedDay < startDay;

    return {
      isError: false,
      outDateStr,
      wasClamped,
      startDay,
      clampedDay,
      daysInTargetMonth,
      dayOfWeek: finalDate.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpStartDate, inpMonths]);

  const applyPreset = (preset) => {
    if (preset === "quarterly") {
      setInpStartDate("2026-01-15");
      setInpMonths(3);
    } else if (preset === "clamp_feb") {
      setInpStartDate("2026-01-31");
      setInpMonths(1);
    } else if (preset === "probation") {
      setInpStartDate("2026-11-12");
      setInpMonths(6);
    } else if (preset === "retro_annual") {
      setInpStartDate("2026-11-12");
      setInpMonths(-12);
    }
  };
    

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-indigo-950/70 via-slate-900/80 to-slate-950 border border-indigo-900/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-600/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Date & Calendar Engineering · Topic 9
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Calendar Math · Maturity Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Project
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            EDATE Function — Exact Month Offset & Maturity Milestone Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">EDATE(start_date, months)</code> function calculates the serial number of the date that is the indicated number of months before or after a starting date.</p><p>Unlike simple day addition (<code className="text-rose-400 font-mono">=A2 + 30</code> or <code className="text-rose-400 font-mono">=A2 + 90</code>) which introduces severe calendar drift because months vary between 28, 29, 30, and 31 days, <code className="text-indigo-300 font-mono">EDATE()</code> performs true calendar-month stepping. It preserves the exact day of the month (e.g. the 15th remains the 15th), while intelligently <strong>clamping</strong> to the last valid calendar day when the target month is shorter than the starting month (e.g. January 31 + 1 month clamps gracefully to February 28 or 29, avoiding non-existent February 31 errors).</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=EDATE(start_date, months)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Software Subscriptions, Loan Tenors & Employee Probation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =EDATE(JoiningDate, 6) (6-Month Probation Maturity)</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: INTERACTIVE LIVE BENCHMARK & SIMULATOR WORKBENCH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-xl space-y-6"
        >
          
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive EDATE Month Offset Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test positive and negative month stepping, observe day parity preservation, and inspect automatic boundary clamping.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("quarterly")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Quarterly (+3 Mos)
          </button>
          <button
            onClick={() => applyPreset("clamp_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            Trigger Feb Clamp
          </button>
          <button
            onClick={() => applyPreset("probation")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            HR Probation (+6 Mos)
          </button>
          <button
            onClick={() => applyPreset("retro_annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Lookback (-12 Mos)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Base Date</span>
          </label>
          <input
            type="date"
            value={inpStartDate}
            onChange={(e) => setInpStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Months Offset (Integer)</span>
            <span className="text-[10px] text-sky-400 font-mono">+ Future / - Past</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpMonths}
            onChange={(e) => setInpMonths(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =EDATE("{inpStartDate}", {inpMonths})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Target Date:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {edateResult.isError ? edateResult.error : edateResult.outDateStr}
            </span>
          </div>
        </div>

        {!edateResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {edateResult.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Target Month Length:</span>
              <span className="text-purple-300 font-semibold font-mono text-sm">
                {edateResult.daysInTargetMonth} Days in Month
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Clamping Activated:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  edateResult.wasClamped ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {edateResult.wasClamped
                  ? `⚠️ Clamped from Day ${edateResult.startDay} to ${edateResult.clampedDay}`
                  : "✓ Day Preserved Exactly"}
              </span>
            </div>
          </div>
        )}
      </div>
    
        </section>

        {/* =========================================================================
            SECTION 3: FORMULA ANATOMY & SIGNATURE CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">⚡</span> Formula Anatomy & Parameter Specifications
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800">
              Calendar Month Offset Synthesizer
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical EDATE Formula Signature</div>
            <div className="text-white font-bold text-base">
              =EDATE(start_date, months)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. A date representing the starting date. Dates should be entered using DATE(), cell references, or formulas.</div><div>• <strong className="text-sky-300">months:</strong> Required. The number of months before (negative integer) or after (positive integer) start_date. Non-integer decimals are truncated toward zero.</div><div>• <strong className="text-amber-300">End-of-Month Clamping:</strong> If the day of start_date exceeds the total number of days in the resulting month, EDATE automatically clamps to the final day of that target month.</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: IN-DEPTH SYNTAX MATRIX & SPECIFICATION TABLE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">📊</span> EDATE Offset & Boundary Clamping Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how EDATE maintains day parity and clamps shorter month horizons.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">Months Offset</th>
                  <th className="py-3 px-4">EDATE Result</th>
                  <th className="py-3 px-4">Day Clamping Behavior</th>
                  <th className="py-3 px-4">Industrial Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-15</td>
        <td className="py-3.5 px-4 text-white">+3 Months</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-04-15</td>
        <td className="py-3.5 px-4 text-slate-300">Preserved Day 15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Quarterly SaaS renewal billing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">2026-02-28</td>
        <td className="py-3.5 px-4 text-amber-400">Clamped to Feb 28</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Common year February month-end clamp</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-01-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2024-02-29</td>
        <td className="py-3.5 px-4 text-emerald-400">Clamped to Feb 29</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap year February month-end clamp</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-03-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">2026-04-30</td>
        <td className="py-3.5 px-4 text-amber-400">Clamped to Apr 30</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">31-day month rolling into 30-day month</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">-6 Months</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-05-12</td>
        <td className="py-3.5 px-4 text-slate-300">Preserved Day 12</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Historical semi-annual lookback audit</td>
      </tr>
    
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ARCHITECTURAL DEEP DIVE & MATHEMATICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xl shrink-0">
              ⚙️
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Catastrophe of Naive Day Multiples (+30 Days)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why adding multiples of 30 days causes compounding drift in contract management.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A frequent error in loan and subscription management is projecting monthly milestones by adding 30 or 90 days: <code className="text-rose-400 font-mono">=A2 + 30</code> or <code className="text-rose-400 font-mono">=A2 + 90</code>.</p><p>Because July and August both have 31 days, and February has 28 days, adding 30 days causes the scheduled billing date to rapidly wander backwards across the calendar! By month 12, a bill intended for the 1st of the month arrives on the 26th of the prior month! <code className="text-indigo-300 font-mono">EDATE(A2, 1)</code> mathematically steps the month register while keeping the day invariant, ensuring that bills, loan EMIs, and warranties stay locked on their contractual day of the month.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Wandering +30 Day Error
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=A2 + 30"}
                </div>
                <p className="text-xs text-slate-400">
                  Causes cumulative date drift; billing day creeps forward or backward due to uneven calendar months.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Contractual EDATE Offset
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=EDATE(A2, 1)"}
                </div>
                <p className="text-xs text-slate-400">
                  Locks the billing day to the exact anniversary day of each month, clamping only on shorter months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VISUAL CONCEPTUAL ARCHITECTURE (SVG PIPELINE)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📐</span> Visual Semantic Architecture & Flow Diagram
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Calendar month stepping preserving day index while gracefully clamping February boundaries.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="40" y="50" width="180" height="90" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="130" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Start Date</text>
        <text x="130" y="105" textAnchor="middle" fill="#A5B4FC" className="text-sm font-bold font-mono">31-Jan-2026</text>
        <text x="130" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Day Index: 31</text>

        <path d="M 220 95 L 340 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />
        <text x="280" y="80" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">+1 Month</text>

        <rect x="340" y="50" width="220" height="90" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">EDATE Clamping Logic</text>
        <text x="450" y="102" textAnchor="middle" fill="#F87171" className="text-xs">Feb 31 Does Not Exist!</text>
        <text x="450" y="122" textAnchor="middle" fill="#34D399" className="text-xs font-mono">Clamps to Final Day of Feb</text>

        <path d="M 560 95 L 640 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="640" y="50" width="160" height="90" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Result</text>
        <text x="720" y="105" textAnchor="middle" fill="#6EE7B7" className="text-sm font-bold font-mono">28-Feb-2026</text>
        <text x="720" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Valid Month End</text>
      </svg>
    
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: INTERACTIVE MASTER SPREADSHEET (EMBEDDED PRACTICE WORKBOOK)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Master Spreadsheet Practice
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore real EDATE formula calculations, live audits, and calculated outputs in the embedded worksheet.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic9"
            title="Topic 9: EDATE Master Practice Grid"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 8: REAL-WORLD ENTERPRISE BUSINESS SCENARIOS (6 DETAILED CASE STUDIES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Enterprise Business Scenarios
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industrial grade case studies from West Bengal IT hubs, banking institutes, and multinational supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div key="0" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 1: Human Resources & Talent Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Tech Park</span>
              </div>
              <h3 className="text-base font-bold text-white">Employee 6-Month Statutory Probation Review Milestone</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"New corporate recruits are placed on a 6-month statutory probation beginning on joining date in cell B2. Generate their probation review milestone date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Advance joining date by exactly 6 calendar months</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(B2, 6)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"12-May-2027 (for employee joined on 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Corporate SaaS & Enterprise Cloud
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V Cloud Services</span>
              </div>
              <h3 className="text-base font-bold text-white">Annual Cloud Subscription Renewal Milestone</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Enterprise software licenses renew annually on the contract activation date in C2. Establish the upcoming annual renewal date for billing."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 12 calendar months to contract activation date</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(C2, 12)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"15-Apr-2027 (from 15-Apr-2026 activation)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Banking & Loan Amortization
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Central Cooperative Bank</span>
              </div>
              <h3 className="text-base font-bold text-white">Commercial Loan EMI Schedule Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Construct a 60-month monthly repayment schedule by dragging a formula down column D starting from loan disbursement date in D2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Increment month counter dynamically using ROW() - ROW($D$2)</div>
                <div className="text-emerald-300 font-bold">{"=EDATE($D$2, ROW() - ROW($D$2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Consecutive monthly EMI payment milestones"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Retail Consumer Credit & EMI
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Electronics Retail</span>
              </div>
              <h3 className="text-base font-bold text-white">Zero-Cost 3-Month Consumer Durable EMI Maturity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Customers purchasing consumer electronics on 3-month zero-interest EMIs receive payment reminder schedules starting from purchase date in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate final maturity date 3 months out</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(E2, 3)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"12-Feb-2027 (from 12-Nov-2026 purchase)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Medical Clinical Trials
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Pharmaceutical Research</span>
              </div>
              <h3 className="text-base font-bold text-white">Post-Treatment 18-Month Patient Follow-Up Visit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Patients participating in vaccine trials must undergo medical examination exactly 18 months after final injection date in F2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 18 months with automatic leap year and month-end clamping</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(F2, 18)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Aug-2027 (from 28-Feb-2026 injection)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Real Estate Commercial Leases
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Rajarhat Commercial Towers</span>
              </div>
              <h3 className="text-base font-bold text-white">Commercial Lease 3-Year Escalation Notice Period</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Commercial leases increase rent by 15% every 36 months. Landlord must issue notice 3 months prior to escalation date (disbursed in G2)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine 36-month escalation minus 3-month notice (= 33 months)</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(G2, 33)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"01-Jan-2029 (for lease commenced on 01-Apr-2026)"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Execution Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 1: Understand Month Parity Preservation</span>
              <p>{"EDATE aims to keep the day unchanged: the 14th of the month will stay the 14th in the target month."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EDATE('2026-05-14', 3) -> 2026-08-14"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Observe Clamping Behavior</span>
              <p>{"If the target month has fewer days than the start month (e.g. 31st moving to April which has 30 days), EDATE clamps to the last day."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EDATE('2026-03-31', 1) -> 2026-04-30"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Execute Backward Lookbacks</span>
              <p>{"Pass negative integers to look backward in time across historical fiscal cycles."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EDATE('2026-11-12', -6) -> 2026-05-12"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format Serial as Date</span>
              <p>{"EDATE returns raw serial integers (e.g. 46338). Format cell as Short Date to display human-readable output."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format Cells > Date > YYYY-MM-DD"}</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: ERROR & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Error & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Error Code / Bug</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Demonstration Trigger</th>
                  <th className="py-3 px-4">Professional Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
                <tr key="0" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Displays Raw 5-Digit Number"}</td>
                  <td className="py-3 px-4 font-sans">{"EDATE returns an authentic Excel date serial, but cell number formatting is set to General."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EDATE(TODAY(), 1) displays 46368 instead of date"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Press Ctrl + Shift + # (or Format Cells > Date) to apply date formatting."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"Start date argument contains unparseable text format."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EDATE('invalid_date', 3)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap start date with DATEVALUE() or construct with DATE(Y, M, D)."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Truncation of Decimal Months"}</td>
                  <td className="py-3 px-4 font-sans">{"Passing decimal month values like 2.7. EDATE truncates toward zero, treating 2.7 as 2."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EDATE(A2, 2.7) evaluates to 2 months"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Supply integers for months, or use DAY addition for partial months."}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: PRO TIPS & ARCHITECTURAL INSIGHTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Secret Heritage Insights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold">Bulletproof DATEDIF Days Fix</span>
              <p className="text-slate-300">{"Fix the infamous DATEDIF 'MD' bug using EDATE: =B2 - EDATE(A2, DATEDIF(A2, B2, 'M')). This is mathematically flawless!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Preserving Month-End Anchors</span>
              <p className="text-slate-300">{"If you want month-ends to always land on month-ends (e.g. Feb 28 -> Mar 31), use EOMONTH instead of EDATE."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Dynamic Leap Year Adjustment</span>
              <p className="text-slate-300">{"EDATE automatically respects February 29 during leap years. 2023-11-29 + 3 months evaluates to 2024-02-29."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Semi-Annual & Quarterly Multiples</span>
              <p className="text-slate-300">{"Multiply interval counters by 3 for quarterly (=EDATE(A2, Q*3)) or by 6 for semi-annual (=EDATE(A2, S*6))."}</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: SOCRATIC ANALYTICAL QUESTIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Questions
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            
            <p key="0">
              • <strong>Algorithmic Design:</strong> {"Why does EDATE(31-Jan, 1) evaluate to 28-Feb, while EDATE(28-Feb, 1) evaluates to 28-Mar rather than 31-Mar?"}
            </p>

            <p key="1">
              • <strong>Contract Law:</strong> {"If an insurance policy begins on August 31 with a 6-month claim window, why is EDATE legally superior to adding 180 days?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 9: EDATE Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="EDATE Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Never use =A2+30 or =A2+90 for monthly milestones. Calendar months vary between 28 and 31 days, so adding 30 days causes compounding schedule drift. Use EDATE to lock milestones to their exact monthly anniversary, and remember its automatic clamping on shorter months."}
          />
        </div>
      </div>
    </div>
  );
}
