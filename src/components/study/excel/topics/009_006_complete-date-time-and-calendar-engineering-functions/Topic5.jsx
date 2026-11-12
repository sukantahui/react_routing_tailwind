"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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

  const [sampleDateStr, setSampleDateStr] = useState("2026-11-12");

  const decompResult = useMemo(() => {
    const dt = new Date(sampleDateStr);
    if (isNaN(dt.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();

    // Derived analytics
    const calendarQuarter = Math.floor((m - 1) / 3) + 1;
    // Indian Fiscal Year starts April (Month 4)
    const indianFY = m >= 4 ? `FY ${y}-${String(y + 1).slice(-2)}` : `FY ${y - 1}-${String(y).slice(-2)}`;
    const indianFiscalQuarter = m >= 4 ? Math.floor((m - 4) / 3) + 1 : 4;

    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    const isLeapDay = isLeap && m === 2 && d === 29;

    // Day of Year
    const startOfYear = new Date(y, 0, 1);
    const dayOfYear = Math.floor((dt.getTime() - startOfYear.getTime()) / 86400000) + 1;

    return {
      isError: false,
      year: y,
      month: m,
      day: d,
      calendarQuarter: `Q${calendarQuarter}`,
      indianFY,
      indianFiscalQuarter: `FQ${indianFiscalQuarter}`,
      dayOfYear,
      isLeap,
      isLeapDay
    };
  }, [sampleDateStr]);

  const applyPreset = (preset) => {
    if (preset === "today") {
      setSampleDateStr("2026-11-12");
    } else if (preset === "fiscal_end") {
      setSampleDateStr("2027-03-31");
    } else if (preset === "leap_day") {
      setSampleDateStr("2024-02-29");
    } else if (preset === "mid_year") {
      setSampleDateStr("2026-07-01");
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
              ⚡ Date & Calendar Engineering · Topic 5
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Decomposition · Temporal Extraction
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Deconstruct
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DAY, MONTH & YEAR Functions — Date Component Decomposition Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The triad functions <code className="text-indigo-300 font-mono font-bold">YEAR(serial_number)</code>, <code className="text-indigo-300 font-mono font-bold">MONTH(serial_number)</code>, and <code className="text-indigo-300 font-mono font-bold">DAY(serial_number)</code> represent Excel's core temporal decomposition engine. They accept an authentic serial date number and isolate its constituent calendar units as pure integers.</p><p>In enterprise analytics, extracting these discrete components is the prerequisite for multi-year cohort analysis, customer churn tracking, fiscal quarter classification, and month-over-month variance reporting. These functions bypass all display formatting, extracting the underlying calendar reality regardless of whether the cell is formatted as "12-Nov-2026", "2026/11/12", or "Thursday, November 12".</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=YEAR(date), =MONTH(date), =DAY(date)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Financial Cohort Analysis, Fiscal Quartering & Sales Trends</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> ="Q" & INT((MONTH(A2)-1)/3) + 1 (Calendar Quarter)</span>
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
            <span className="text-indigo-400">🧪</span> Live Date Decomposition Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick any date and observe how YEAR, MONTH, and DAY isolate integers to drive downstream fiscal reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("today")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Today (12-Nov-2026)
          </button>
          <button
            onClick={() => applyPreset("fiscal_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Indian FY End (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_day")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Leap Day (29-Feb)
          </button>
          <button
            onClick={() => applyPreset("mid_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Mid-Year (01-Jul)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Input Date (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={sampleDateStr}
            onChange={(e) => setSampleDateStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">YEAR(A2)</span>
            <span className="text-xl font-bold font-mono text-indigo-300">{decompResult.year}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">MONTH(A2)</span>
            <span className="text-xl font-bold font-mono text-emerald-300">{decompResult.month}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">DAY(A2)</span>
            <span className="text-xl font-bold font-mono text-sky-300">{decompResult.day}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Derived Financial & Calendar Dimensions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Calendar Quarter:</span>
            <span className="text-amber-300 font-semibold font-mono text-base">{decompResult.calendarQuarter}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Indian Fiscal Year:</span>
            <span className="text-emerald-300 font-semibold font-mono text-base">{decompResult.indianFY}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Fiscal Quarter:</span>
            <span className="text-sky-300 font-semibold font-mono text-base">{decompResult.indianFiscalQuarter}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Day of Year:</span>
            <span className="text-purple-300 font-semibold font-mono text-base">Day {decompResult.dayOfYear}</span>
          </div>
        </div>
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
              Gregorian Decomposition Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DAY, MONTH & YEAR Formula Signature</div>
            <div className="text-white font-bold text-base">
              =YEAR(serial_number) | =MONTH(serial_number) | =DAY(serial_number)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">serial_number:</strong> Required. The date from which you want to extract the year (1900-9999), month (1-12), or day (1-31). Must be an authentic numeric date serial, cell reference, or date constructor.</div><div>• <strong className="text-sky-300">Coercion Mechanism:</strong> If a text date is supplied, Excel attempts implicit coercion based on regional settings. If text cannot be parsed, returns <code className="font-mono text-rose-400">#VALUE!</code>.</div><div>• <strong className="text-amber-300">Time Discard:</strong> Any fractional time attached to the serial is ignored. Only the integer day calendar boundary is evaluated.</div>
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
              <span className="text-emerald-400">📊</span> Component Extraction & Derived Metrics Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how YEAR, MONTH, and DAY decompose sample dates into analytical dimensions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Source Date</th>
                  <th className="py-3 px-4">YEAR()</th>
                  <th className="py-3 px-4">MONTH()</th>
                  <th className="py-3 px-4">DAY()</th>
                  <th className="py-3 px-4">Derived Fiscal / Quarter Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">11</td>
        <td className="py-3.5 px-4 text-sky-300">12</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Calendar Q4 / Indian Fiscal Q3</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">31-Mar-2027</td>
        <td className="py-3.5 px-4 text-white">2027</td>
        <td className="py-3.5 px-4 text-emerald-300">3</td>
        <td className="py-3.5 px-4 text-sky-300">31</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Indian FY 2026-27 Year End</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">29-Feb-2024</td>
        <td className="py-3.5 px-4 text-white">2024</td>
        <td className="py-3.5 px-4 text-emerald-300">2</td>
        <td className="py-3.5 px-4 text-sky-300">29</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap Day Verification: DAY(A2)=29</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">01-Jan-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">1</td>
        <td className="py-3.5 px-4 text-sky-300">1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Calendar Day 1 / New Year Opening</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">15-Aug-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">8</td>
        <td className="py-3.5 px-4 text-sky-300">15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">National Statutory Holiday Tracking</td>
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
                The Dangerous Fallacy of Naive Year Subtraction
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why =YEAR(TODAY()) - YEAR(DOB) fails corporate payroll and legal compliance.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A rampant error committed by novice analysts is calculating age or employee tenure using simple year subtraction: <code className="text-rose-400 font-mono">=YEAR(TODAY()) - YEAR(DOB)</code>.</p><p>This naive formula looks strictly at the calendar year numbers, completely ignoring whether the person's birthday has actually occurred in the current year! For example, if a person was born on December 30, 2000, on January 5, 2026 naive year subtraction computes <code className="text-white font-mono">2026 - 2000 = 26</code>, overstating their legal age by nearly an entire year when they are actually only 25! True age requires checking whether today's date has crossed their annual birthday anniversary.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Naive Year Subtraction Blunder
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=YEAR(TODAY()) - YEAR(B2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Overstates age by 1 full year whenever the employee's birthday has not yet occurred in the current calendar year.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Legal Anniversary Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=YEAR(TODAY()) - YEAR(B2) - IF(TODAY() < DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)), 1, 0)"}
                </div>
                <p className="text-xs text-slate-400">
                  Subtracts 1 if the current date is chronologically before the anniversary, or leverage DATEDIF(B2, TODAY(), 'Y').
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
            Decomposition of unified date serial into Year, Month, and Day integer channels.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Input Date Serial</text>
        <text x="140" y="105" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">12-Nov-2026</text>

        <path d="M 250 80 L 340 50 M 250 100 L 340 100 M 250 120 L 340 150" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">=YEAR(A2) ➔ 2026</text>

        <rect x="340" y="80" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="105" textAnchor="middle" fill="#10B981" className="text-xs font-mono font-bold">=MONTH(A2) ➔ 11</text>

        <rect x="340" y="130" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="155" textAnchor="middle" fill="#F59E0B" className="text-xs font-mono font-bold">=DAY(A2) ➔ 12</text>

        <path d="M 560 50 L 640 100 M 560 100 L 640 100 M 560 150 L 640 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Derived Metrics</text>
        <text x="725" y="102" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">Quarter: Q4</text>
        <text x="725" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono font-bold">FY: 2026-27</text>
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
                Explore real DAY, MONTH & YEAR formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic5"
            title="Topic 5: DAY, MONTH & YEAR Master Practice Grid"
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
                  Scenario 1: Corporate Financial Reporting
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Commercial Headquarters</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Indian Fiscal Quarter Classification</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Financial analysts need to tag every ledger entry in column A into Indian Fiscal Quarters: Q1 (Apr-Jun), Q2 (Jul-Sep), Q3 (Oct-Dec), Q4 (Jan-Mar)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Subtract 4 modulo 12 to shift April to bucket 0</div>
                <div className="text-emerald-300 font-bold">{"=\"FQ\" & CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"FQ3\" (for invoice dated 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Human Resources & Payroll
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Industrial Division</span>
              </div>
              <h3 className="text-base font-bold text-white">Tenure Cohort Binning for Annual Performance Appraisals</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Group employees based on the calendar year of their joining date in cell B2 into historical hiring cohorts (e.g. 'Class of 2021')."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Concatenate static label with extracted year integer</div>
                <div className="text-emerald-300 font-bold">{"=\"Batch of \" & YEAR(B2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"Batch of 2021\" (for joining date 15-Jul-2021)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Customer Analytics & Marketing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Retail Analytics</span>
              </div>
              <h3 className="text-base font-bold text-white">End-of-Month Customer Birthday Campaign Filter</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Marketing sends birthday discount promo codes during the customer's birth month. Flag whether customer DOB in cell C2 matches the current active month."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Compare month of birth against current active system month</div>
                <div className="text-emerald-300 font-bold">{"=IF(MONTH(C2) = MONTH(TODAY()), \"SEND DISCOUNT PROMO\", \"NOT THIS MONTH\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"SEND DISCOUNT PROMO\" (if customer born in November)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Supply Chain & Manufacturing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Precision Castings</span>
              </div>
              <h3 className="text-base font-bold text-white">Bi-Monthly Inventory Physical Audit Trigger</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Manufacturing inventory audits occur exclusively on the final calendar day of even-numbered months (Feb, Apr, Jun, Aug, Oct, Dec)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Check if month is even via ISODD or MOD, and verify last day</div>
                <div className="text-emerald-300 font-bold">{"=IF(AND(MOD(MONTH(D2), 2) = 0, DAY(D2 + 1) = 1), \"PHYSICAL AUDIT TODAY\", \"STANDARD OPS\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"PHYSICAL AUDIT TODAY\" (on 30-Jun-2026)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Tax Compliance & TDS Filing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Tax Consultancy</span>
              </div>
              <h3 className="text-base font-bold text-white">Monthly TDS Payment Challan Due Date Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Indian Tax Deducted at Source (TDS) must be deposited by the 7th of the month following the deduction date in cell E2 (except March)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Construct the 7th of next month dynamically</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(E2) + IF(MONTH(E2)=12, 1, 0), MONTH(E2) + 1, 7)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"07-Dec-2026 (for TDS deducted on 18-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Agricultural Banking & Insurance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Hooghly Agro-Fin Corp</span>
              </div>
              <h3 className="text-base font-bold text-white">Crop Insurance Kharif vs Rabi Season Tagging</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Agricultural crop loans are bifurcated into Kharif season (sowing June to October) and Rabi season (sowing November to April) based on loan disbursal date in F2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate month integer to segment agro-climatic season</div>
                <div className="text-emerald-300 font-bold">{"=IF(AND(MONTH(F2) >= 6, MONTH(F2) <= 10), \"KHARIF CROP\", \"RABI CROP\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"RABI CROP\" (for loan disbursed on 12-Nov-2026)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Verify Date Validity with ISNUMBER()</span>
              <p>{"YEAR, MONTH, and DAY require numeric serials. Verify with =ISNUMBER(A2) before passing to decomposition formulas."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=ISNUMBER(A2) -> TRUE"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Isolate the Calendar Year</span>
              <p>{"Apply =YEAR(A2) to obtain a 4-digit integer between 1900 and 9999."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=YEAR(DATE(2026, 11, 12)) -> 2026"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Isolate the Month Index</span>
              <p>{"Apply =MONTH(A2) to obtain an integer from 1 (January) to 12 (December)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=MONTH(DATE(2026, 11, 12)) -> 11"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Isolate the Day Number</span>
              <p>{"Apply =DAY(A2) to obtain the calendar day of the month from 1 to 31."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DAY(DATE(2026, 11, 12)) -> 12"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"Cell contains a dead text string rather than an authentic numeric date serial."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=MONTH('12-Nov-2026') on systems where text parsing fails"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Sanitize text using DATEVALUE() before extracting components."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"YEAR(0) Returns 1900"}</td>
                  <td className="py-3 px-4 font-sans">{"Target cell is empty or contains zero. In Excel's 1900 date system, serial 0 evaluates to Jan 0, 1900."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=YEAR(A2) where A2 is completely empty"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with: =IF(A2='', '', YEAR(A2))."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"MONTH() Inversion on Ambiguous Text"}</td>
                  <td className="py-3 px-4 font-sans">{"Date '05/06/2026' parsed as May instead of June due to US vs UK regional settings mismatch."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=MONTH(A2) where A2 is text rather than numeric date"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert source data using Data > Text to Columns specifying exact column format (DMY or MDY)."}</td>
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
              <span className="text-indigo-400 font-bold">Leap Day Detection Formula</span>
              <p className="text-slate-300">{"Determine if year in A1 is a leap year instantly without complex MOD logic: =DAY(DATE(A1, 2, 29))=29. Returns TRUE for leap years!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Day of Year Calculation</span>
              <p className="text-slate-300">{"Calculate current day of the year (1-366): =A2 - DATE(YEAR(A2), 1, 0)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Last Day of Month Detection</span>
              <p className="text-slate-300">{"Check if date in A2 is the final day of its month: =DAY(A2 + 1) = 1. If adding 1 rolls to day 1, today is month end!"}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Month Name Extraction</span>
              <p className="text-slate-300">{"To extract full 3-letter month name as text: =TEXT(A2, 'mmm') or full name: =TEXT(A2, 'mmmm')."}</p>
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
              • <strong>System Architecture:</strong> {"Why does passing an empty cell to =YEAR(A1) return 1900 while =MONTH(A1) returns 1 and =DAY(A1) returns 0?"}
            </p>

            <p key="1">
              • <strong>Performance Optimization:</strong> {"In a 500,000-row table, why is =YEAR(A2) & '-' & MONTH(A2) significantly faster for PivotTable grouping than building calculated columns via TEXT()?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 5: DAY, MONTH & YEAR Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DAY, MONTH & YEAR Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"YEAR, MONTH, and DAY are the Swiss Army knives of spreadsheet engineering. Never assemble or disassemble dates using string functions like LEFT, MID, or RIGHT — doing so invites regional formatting disasters. Master the =DAY(A2+1)=1 trick for month-end detection; it will save you countless lines of code."}
          />
        </div>
      </div>
    </div>
  );
}
