"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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

  const [inpRefDate, setInpRefDate] = useState("2026-11-12");
  const [inpEomMonths, setInpEomMonths] = useState(0);

  const eomonthResult = useMemo(() => {
    const s = new Date(inpRefDate);
    const mOffset = parseInt(inpEomMonths, 10);

    if (isNaN(s.getTime()) || isNaN(mOffset)) {
      return { isError: true, error: "#VALUE! Invalid date or month offset" };
    }

    const startYear = s.getFullYear();
    const startMonth = s.getMonth();

    // Target year and month
    const targetDateObj = new Date(startYear, startMonth + mOffset + 1, 0);
    const targetYear = targetDateObj.getFullYear();
    const targetMonth = targetDateObj.getMonth();
    const lastDay = targetDateObj.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = `${String(lastDay).padStart(2, "0")}-${monthNames[targetMonth]}-${targetYear}`;

    // First day of next month
    const firstDayNext = new Date(targetYear, targetMonth, lastDay + 1);
    const firstDayNextStr = `${String(firstDayNext.getDate()).padStart(2, "0")}-${monthNames[firstDayNext.getMonth()]}-${firstDayNext.getFullYear()}`;

    // Days remaining in month from ref date (if offset is 0)
    let daysRemaining = null;
    if (mOffset === 0) {
      daysRemaining = lastDay - s.getDate();
    }

    return {
      isError: false,
      outDateStr,
      lastDay,
      firstDayNextStr,
      daysRemaining,
      dayOfWeek: targetDateObj.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpRefDate, inpEomMonths]);

  const applyPreset = (preset) => {
    if (preset === "current_end") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(0);
    } else if (preset === "prior_end") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(-1);
    } else if (preset === "tax_q4") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(4); // Lands on March 31, 2027
    } else if (preset === "leap_feb") {
      setInpRefDate("2024-01-15");
      setInpEomMonths(1); // Lands on Feb 29, 2024
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
              ⚡ Date & Calendar Engineering · Topic 10
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Financial Math · Accounting Cutoff
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Synthesize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            EOMONTH Function — End-of-Month Financial Closing & Tax Cutoff Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">EOMONTH(start_date, months)</code> function calculates the serial number of the <strong>exact last calendar day of the month</strong> that is the indicated number of months before or after a starting date.</p><p>In financial engineering, accounting, and tax compliance, deadlines almost never land on arbitrary days like the 14th or 22nd — they are legally anchored to the final calendar day of the month (e.g. March 31 financial year closing, monthly GST/VAT input tax reconciliations, employee payroll freeze dates, and depreciation cutoff schedules). <code className="text-indigo-300 font-mono">EOMONTH()</code> eliminates all manual lookups and complex IF formulas, automatically resolving 28, 29, 30, and 31-day month boundaries across common and leap years.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=EOMONTH(start_date, months)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Financial Year-End Closing, Tax Deadlines & Depreciation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =EOMONTH(TODAY(), 0) (Last Day of Current Month)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive EOMONTH Financial Closing Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate corporate accounting cutoffs, month-end payroll freeze dates, and derive next month's opening day live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("current_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Current Month (0)
          </button>
          <button
            onClick={() => applyPreset("prior_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Prior Month (-1)
          </button>
          <button
            onClick={() => applyPreset("tax_q4")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Indian FY Closing (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/60 transition cursor-pointer"
          >
            Leap Feb (29-Feb)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Reference Date (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Anchor Date</span>
          </label>
          <input
            type="date"
            value={inpRefDate}
            onChange={(e) => setInpRefDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Month Offset (0 = Current Month)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer (-12 to +12)</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpEomMonths}
            onChange={(e) => setInpEomMonths(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =EOMONTH("{inpRefDate}", {inpEomMonths})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Month End Date:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {eomonthResult.isError ? eomonthResult.error : eomonthResult.outDateStr}
            </span>
          </div>
        </div>

        {!eomonthResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {eomonthResult.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Derived Next Month 1st:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {eomonthResult.firstDayNextStr} (=EOMONTH + 1)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Days Left in Month:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {eomonthResult.daysRemaining !== null ? `${eomonthResult.daysRemaining} Days Remaining` : "Historical / Future"}
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
              Month-End Boundary Resolver
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical EOMONTH Formula Signature</div>
            <div className="text-white font-bold text-base">
              =EOMONTH(start_date, months)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. A date representing the starting date. Dates should be entered using DATE(), cell references, or formulas.</div><div>• <strong className="text-sky-300">months:</strong> Required. The number of months before (negative integer) or after (positive integer) start_date. Passing <code className="font-mono text-emerald-300">0</code> returns the final day of the starting date's current month.</div><div>• <strong className="text-amber-300">Leap Year Intelligence:</strong> EOMONTH automatically evaluates whether the target year is a leap year. Passing February on 2024 returns February 29; on 2025/2026 it returns February 28.</div>
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
              <span className="text-emerald-400">📊</span> EOMONTH Month-End Horizon Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how EOMONTH navigates month boundaries relative to the current active month.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Formula Expression</th>
                  <th className="py-3 px-4">Relative Month</th>
                  <th className="py-3 px-4">Target Month-End</th>
                  <th className="py-3 px-4">Evaluated Serial</th>
                  <th className="py-3 px-4">Accounting Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, -1)</td>
        <td className="py-3.5 px-4 text-white">Prior Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">31-Oct-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46326</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Prior month ledger reconciliation cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 0)</td>
        <td className="py-3.5 px-4 text-white">Current Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">30-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46356</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Current month payroll freeze deadline</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 1)</td>
        <td className="py-3.5 px-4 text-white">Next Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">31-Dec-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46387</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Quarterly tax filing window closing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 3)</td>
        <td className="py-3.5 px-4 text-white">+3 Months</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">28-Feb-2027</td>
        <td className="py-3.5 px-4 text-slate-300">46446</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Common year February closing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 0) + 1</td>
        <td className="py-3.5 px-4 text-white">Next Month Day 1</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">01-Dec-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46357</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Dynamic first day of next calendar month</td>
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
                The First-Day-of-Month Architecture Pattern
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How adding 1 to EOMONTH creates the industry's cleanest month-start formula.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>While Excel provides <code className="text-indigo-300 font-mono">EOMONTH</code> for month ends, it has no native <code className="text-rose-400 font-mono">BOMONTH</code> (Beginning of Month) function. How do elite financial architects determine the first day of the current, prior, or upcoming month?</p><p>By leveraging calendar topology: the day immediately following the last day of the prior month is ALWAYS the 1st day of the current month! <br/>• First Day of Current Month: <code className="text-emerald-300 font-mono">=EOMONTH(TODAY(), -1) + 1</code><br/>• First Day of Next Month: <code className="text-emerald-300 font-mono">=EOMONTH(TODAY(), 0) + 1</code><br/>This elegant idiom avoids all messy string parsing and is 100% immune to regional date confusion.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle String Concatenation for Month Start
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=\"01/\" & MONTH(TODAY()) & \"/\" & YEAR(TODAY())"}
                </div>
                <p className="text-xs text-slate-400">
                  Generates text that breaks in mathematical formulas and inverts day/month in US vs UK regional settings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  The Production EOMONTH + 1 Idiom
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=EOMONTH(TODAY(), -1) + 1"}
                </div>
                <p className="text-xs text-slate-400">
                  Returns an authentic numeric date serial for the 1st of the current month with zero regional ambiguity.
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
            EOMONTH navigating from arbitrary transaction dates directly to month-end financial boundaries.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="40" y="50" width="200" height="90" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Arbitrary Transaction</text>
        <text x="140" y="105" textAnchor="middle" fill="#A5B4FC" className="text-sm font-bold font-mono">12-Nov-2026</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Mid-Month Posting</text>

        <path d="M 240 95 L 350 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />
        <text x="295" y="80" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">months = 0</text>

        <rect x="350" y="50" width="210" height="90" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=EOMONTH(A2, 0)</text>
        <text x="455" y="102" textAnchor="middle" fill="#E2E8F0" className="text-xs">Dynamic Month Length</text>
        <text x="455" y="122" textAnchor="middle" fill="#34D399" className="text-xs font-mono">Resolves to Day 30</text>

        <path d="M 560 95 L 630 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="50" width="180" height="90" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Month End Closing</text>
        <text x="720" y="105" textAnchor="middle" fill="#6EE7B7" className="text-sm font-bold font-mono">30-Nov-2026</text>
        <text x="720" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Tax & Payroll Cutoff</text>
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
                Explore real EOMONTH formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic10"
            title="Topic 10: EOMONTH Master Practice Grid"
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
                  Scenario 1: Corporate Statutory Compliance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate Finance</span>
              </div>
              <h3 className="text-base font-bold text-white">Indian Financial Year Closing Audit Deadline</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Indian companies close statutory accounts on March 31. For any transaction recorded in date cell A2 during the fiscal year, project the exact financial book closing date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate March 31 end of current fiscal cycle</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(A2) + IF(MONTH(A2)>=4, 1, 0), 3, 31)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Mar-2027 (for transaction in Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Tax Compliance & GST Returns
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Tax Consultancy</span>
              </div>
              <h3 className="text-base font-bold text-white">Monthly GSTR-3B Tax Filing Deadline Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"GSTR-3B tax returns are legally due on the 20th day of the month following the transaction month in cell B2. Establish the statutory filing deadline."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Find end of invoice month, then add 20 days</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(B2, 0) + 20"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"20-Dec-2026 (for invoice issued in Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: HR & Enterprise Payroll
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Wagons HR Complex</span>
              </div>
              <h3 className="text-base font-bold text-white">Monthly Payroll Attendance Freeze Window</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Attendance clocks freeze on the final calendar day of the active month. Calculate days remaining for employees to regularize missing punches."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Subtract today from EOMONTH of current month</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(TODAY(), 0) - TODAY() & \" DAYS TO CUTOFF\""}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"18 DAYS TO CUTOFF (on 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Fixed Assets & Depreciation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Industrial Plant</span>
              </div>
              <h3 className="text-base font-bold text-white">Straight-Line Depreciation Month-End Convention</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Assets put into service on date in C2 begin depreciating on the first day of the following month, expiring on the final day of the 60th month."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate asset useful life end date exactly 60 months out</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(C2, 60)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"30-Nov-2031 (for asset acquired in Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Supply Chain & Vendor Accounts Payable
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Central Warehousing</span>
              </div>
              <h3 className="text-base font-bold text-white">Standard Net 30 End-of-Month (30 EOM) Credit Terms</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Vendor invoice in D2 carries credit terms of 'Net 30 EOM' (payment is due on the final day of the month following invoice receipt)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Advance by 1 month to land on last day of following month</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(D2, 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Dec-2026 (for invoice received in Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Banking Treasury & Liquidity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Co-Operative Bank</span>
              </div>
              <h3 className="text-base font-bold text-white">Quarterly Regulatory Liquidity Coverage Ratio (LCR)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Reserve Bank of India (RBI) mandates liquidity audit filings at the end of each calendar quarter (March 31, June 30, September 30, December 31)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate current calendar quarter end using EOMONTH</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(DATE(YEAR(E2), INT((MONTH(E2)-1)/3)*3 + 3, 1), 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Dec-2026 (for transaction in Nov 2026)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand Month Offset Parameter</span>
              <p>{"months = 0 gives the end of the current month. Negative months look back; positive months look forward."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EOMONTH(A2, 0) -> Last day of current month\n=EOMONTH(A2, -1) -> Last day of prior month"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Derive the First Day of Next Month</span>
              <p>{"Add 1 to EOMONTH(A2, 0) to instantly obtain the first day of the subsequent month."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EOMONTH(A2, 0) + 1"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Derive the First Day of Current Month</span>
              <p>{"Add 1 to the end of the prior month: =EOMONTH(A2, -1) + 1."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=EOMONTH(A2, -1) + 1"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format as Date</span>
              <p>{"Apply standard date formatting to ensure the serial renders as DD-MMM-YYYY."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format Cells > Date"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Displays Raw Serial Number"}</td>
                  <td className="py-3 px-4 font-sans">{"Cell is formatted as General. EOMONTH returns a numeric date serial."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EOMONTH(TODAY(), 0) displays 46356"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Apply Short Date format (Ctrl + Shift + #)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Argument"}</td>
                  <td className="py-3 px-4 font-sans">{"Start date argument is an unparseable text string."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EOMONTH('31/13/2026', 0)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Pass authentic dates created via DATE() or DATEVALUE()."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Off-By-One Day Mismatch"}</td>
                  <td className="py-3 px-4 font-sans">{"Attempting to find the start of the month by subtracting days instead of adding 1 to EOMONTH(-1)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=A2 - DAY(A2) returns last day of prior month, not first day of current"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use: =EOMONTH(A2, -1) + 1 for start of month."}</td>
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
              <span className="text-indigo-400 font-bold">Days in the Current Month</span>
              <p className="text-slate-300">{"Determine how many days are in the month of cell A2: =DAY(EOMONTH(A2, 0)). Returns 28, 29, 30, or 31 automatically!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">The BOMONTH Replacement</span>
              <p className="text-slate-300">{"There is no native BOMONTH in Excel. Always use =EOMONTH(A2, -1) + 1. It is universally accepted across all financial institutions."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">GST 20th Cutoff Idiom</span>
              <p className="text-slate-300">{"For Indian GST compliance, the due date is always =EOMONTH(InvoiceDate, 0) + 20."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Quarter End Formula</span>
              <p className="text-slate-300">{"Project end of current quarter: =EOMONTH(A2, 3 - MOD(MONTH(A2)-1, 3) - 1)."}</p>
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
              • <strong>System Architecture:</strong> {"Why did Microsoft create EOMONTH when the formula =DATE(YEAR(A1), MONTH(A1)+1, 0) already returns the exact same result?"}
            </p>

            <p key="1">
              • <strong>Accounting Standards:</strong> {"Why do accounting standards mandate the EOMONTH convention for depreciation rather than calculating per-diem days?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 10: EOMONTH Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="EOMONTH Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"EOMONTH is the CFO's best friend. Memorize the two essential idioms: =DAY(EOMONTH(A2, 0)) to get the total days in any month, and =EOMONTH(A2, -1) + 1 to find the first day of the current month. These two patterns will eliminate 90% of your calendar calculation headaches."}
          />
        </div>
      </div>
    </div>
  );
}
