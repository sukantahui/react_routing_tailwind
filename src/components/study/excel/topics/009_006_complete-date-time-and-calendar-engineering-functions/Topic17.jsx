"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic17_files/topic17_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic17() {
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

  const [inpNetIntlStart, setInpNetIntlStart] = useState("2026-11-01");
  const [inpNetIntlEnd, setInpNetIntlEnd] = useState("2026-11-30");
  const [selectedWeekendMode, setSelectedWeekendMode] = useState("11"); // Code 11 = Sunday only

  const weekendConfigs = {
    "11": { label: "11 — Sunday Only (Indian 6-Day)", mask: "0000001" },
    "7": { label: "7 — Fri & Sat (Middle East)", mask: "0000110" },
    "1": { label: "1 — Sat & Sun (Standard 5-Day)", mask: "0000011" },
    "pt_mwf": { label: "'0101011' — Mon/Wed/Fri Part-Time", mask: "0101011" },
    "all_7": { label: "'0000000' — 7-Day Continuous Plant", mask: "0000000" }
  };

  const netIntlCalcResult = useMemo(() => {
    const s = new Date(inpNetIntlStart);
    const e = new Date(inpNetIntlEnd);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const cfg = weekendConfigs[selectedWeekendMode] || weekendConfigs["11"];
    const mask = cfg.mask;

    const isReverse = s > e;
    let dStart = isReverse ? new Date(e) : new Date(s);
    let dEnd = isReverse ? new Date(s) : new Date(e);

    let curr = new Date(dStart.getFullYear(), dStart.getMonth(), dStart.getDate());
    let targetEnd = new Date(dEnd.getFullYear(), dEnd.getMonth(), dEnd.getDate());

    let netCount = 0;
    let weekendCount = 0;
    let totalCalendarDays = 0;

    while (curr <= targetEnd) {
      totalCalendarDays++;
      const jsDay = curr.getDay();
      const maskIdx = jsDay === 0 ? 6 : jsDay - 1;
      const isOff = mask[maskIdx] === "1";

      if (isOff) {
        weekendCount++;
      } else {
        netCount++;
      }
      curr.setDate(curr.getDate() + 1);
    }

    const finalNet = isReverse ? -netCount : netCount;

    return {
      isError: false,
      finalNet,
      totalCalendarDays,
      weekendCount,
      activeMask: mask
    };
  }, [inpNetIntlStart, inpNetIntlEnd, selectedWeekendMode]);

  const applyPreset = (preset) => {
    if (preset === "plant_6day") {
      setInpNetIntlStart("2026-11-01");
      setInpNetIntlEnd("2026-11-30");
      setSelectedWeekendMode("11");
    } else if (preset === "mideast_month") {
      setInpNetIntlStart("2026-11-01");
      setInpNetIntlEnd("2026-11-30");
      setSelectedWeekendMode("7");
    } else if (preset === "part_time") {
      setInpNetIntlStart("2026-11-01");
      setInpNetIntlEnd("2026-11-30");
      setSelectedWeekendMode("pt_mwf");
    } else if (preset === "continuous_7") {
      setInpNetIntlStart("2026-11-01");
      setInpNetIntlEnd("2026-11-30");
      setSelectedWeekendMode("all_7");
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
              ⚡ Date & Calendar Engineering · Topic 17
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Global Utilization · Bespoke Shift Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Construct
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            NETWORKDAYS.INTL Function — Global Net Working Days & Shift Capacity Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])</code> function returns the number of whole workdays between two dates using customizable weekend parameters.</p><p>While standard NETWORKDAYS forces a rigid Monday-to-Friday schedule, real-world enterprise operations span diverse working calendar structures. Multinational operations in the Middle East follow a Sunday-to-Thursday week; Indian factory floors operate on a 6-day workweek with only Sunday off; modern tech firms pilot 4-day compressed workweeks; and retail customer care teams operate on bespoke part-time rotating schedules. <code className="text-indigo-300 font-mono">NETWORKDAYS.INTL()</code> accurately models all these operational realities using numeric weekend codes or 7-character binary mask strings.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Middle East Corporate Banking, 6-Day Manufacturing & Part-Time Shift Audits</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =NETWORKDAYS.INTL(Start, End, 11, Holidays) (Indian 6-Day Factory Capacity)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive NETWORKDAYS.INTL Capacity Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Model Indian 6-day manufacturing, Middle East Sun-Thu, and part-time shift capacity live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("plant_6day")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Indian 6-Day Plant (25d)
          </button>
          <button
            onClick={() => applyPreset("mideast_month")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Middle East (22d)
          </button>
          <button
            onClick={() => applyPreset("part_time")}
            className="px-2.5 py-1 text-xs rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/60 transition cursor-pointer"
          >
            Mon/Wed/Fri Part-Time (13d)
          </button>
          <button
            onClick={() => applyPreset("continuous_7")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            7-Day Continuous (30d)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpNetIntlStart}
            onChange={(e) => setInpNetIntlStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date</span>
            <span className="text-[10px] text-sky-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpNetIntlEnd}
            onChange={(e) => setInpNetIntlEnd(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Weekend Paradigm (Arg 3)
          </label>
          <select
            value={selectedWeekendMode}
            onChange={(e) => setSelectedWeekendMode(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="11">11 — Sunday Only (Indian 6-Day Plant)</option>
            <option value="7">7 — Friday & Saturday (Middle East)</option>
            <option value="1">1 — Saturday & Sunday (Standard 5-Day)</option>
            <option value="pt_mwf">"0101011" — Mon/Wed/Fri Part-Time</option>
            <option value="all_7">"0000000" — 7-Day Continuous Plant</option>
          </select>
          <span className="text-[10px] text-slate-500 block truncate">Active Mask: "{netIntlCalcResult.activeMask}"</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =NETWORKDAYS.INTL("{inpNetIntlStart}", "{inpNetIntlEnd}", {selectedWeekendMode.length > 2 ? `"${netIntlCalcResult.activeMask}"` : selectedWeekendMode})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Net Operational Days:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {netIntlCalcResult.isError ? netIntlCalcResult.error : `${netIntlCalcResult.finalNet} Days`}
            </span>
          </div>
        </div>

        {!netIntlCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Calendar Span:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {netIntlCalcResult.totalCalendarDays} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Non-Working Days Excluded:</span>
              <span className="text-purple-300 font-semibold font-mono text-base">
                {netIntlCalcResult.weekendCount} Days Off
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Operational Efficiency:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                {Math.round((netIntlCalcResult.finalNet / netIntlCalcResult.totalCalendarDays) * 100)}% Utilization
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
              Universal Multi-Weekend Utilization Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical NETWORKDAYS.INTL Formula Signature</div>
            <div className="text-white font-bold text-base">
              =NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the period.</div><div>• <strong className="text-sky-300">end_date:</strong> Required. The ending date of the period.</div><div>• <strong className="text-amber-300">weekend:</strong> Optional. Specifies which days are weekends. Can be a numeric code (1-17) or a 7-character binary mask string where '1' = day off and '0' = working day.</div><div>• <strong className="text-emerald-300">holidays:</strong> Optional. Cell range or array of dates to exclude.</div>
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
              <span className="text-emerald-400">📊</span> NETWORKDAYS.INTL Configuration & Output Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe working day capacity across 5-day, 6-day, and 4-day corporate workweeks.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Date Span</th>
                  <th className="py-3 px-4">Weekend Argument</th>
                  <th className="py-3 px-4">Operating Schedule</th>
                  <th className="py-3 px-4">Working Days Yield</th>
                  <th className="py-3 px-4">Capacity Gain vs 5-Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Nov 1 - Nov 30 (2026)</td>
        <td className="py-3.5 px-4 text-white">1 (Sat & Sun)</td>
        <td className="py-3.5 px-4 text-slate-300">Standard 5-Day Week</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">21 Days</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Baseline (0% Delta)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Nov 1 - Nov 30 (2026)</td>
        <td className="py-3.5 px-4 text-white">11 (Sunday Only)</td>
        <td className="py-3.5 px-4 text-slate-300">Indian 6-Day Plant</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">25 Days</td>
        <td className="py-3.5 px-4 text-emerald-400 font-bold">+4 Days (+19.0% Capacity)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Nov 1 - Nov 30 (2026)</td>
        <td className="py-3.5 px-4 text-white">7 (Fri & Sat)</td>
        <td className="py-3.5 px-4 text-slate-300">Middle East (Sun-Thu)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">22 Days</td>
        <td className="py-3.5 px-4 text-sky-400 font-bold">+1 Day (Calendar Alignment)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Nov 1 - Nov 30 (2026)</td>
        <td className="py-3.5 px-4 text-white">"0000111"</td>
        <td className="py-3.5 px-4 text-slate-300">4-Day Week (Mon-Thu)</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">17 Days</td>
        <td className="py-3.5 px-4 text-amber-400 font-bold">-4 Days (Compressed Hours)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Nov 1 - Nov 30 (2026)</td>
        <td className="py-3.5 px-4 text-white">"0000000"</td>
        <td className="py-3.5 px-4 text-slate-300">7-Day Continuous Ops</td>
        <td className="py-3.5 px-4 text-purple-300 font-bold">30 Days</td>
        <td className="py-3.5 px-4 text-purple-400 font-bold">+9 Days (+42.8% Capacity)</td>
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
                Modeling Part-Time Workforce Shifts via Binary Masks
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How HR systems audit exact expected hours for job-share and part-time workers.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A persistent challenge in modern corporate payroll is calculating expected working days for non-standard employees (e.g. consultants working Tuesday and Thursday, or medical staff working Monday, Wednesday, Friday).</p><p>Instead of manual timesheet counting, <code className="text-indigo-300 font-mono">NETWORKDAYS.INTL</code> solves this with surgical precision using the 7-character binary mask: <br/>• Mon-Wed-Fri Schedule: <code className="text-emerald-300 font-mono">=NETWORKDAYS.INTL(Start, End, "0101011", Holidays)</code><br/>• Tue-Thu Schedule: <code className="text-sky-300 font-mono">=NETWORKDAYS.INTL(Start, End, "1010111", Holidays)</code><br/>This formula automatically accounts for month length, public holidays falling on working days, and leap years, producing penny-accurate payroll baselines.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Arbitrary Fractional Week Calculations
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=TotalCalendarDays * (3 / 7)"}
                </div>
                <p className="text-xs text-slate-400">
                  Estimates part-time days by multiplying by 3/7ths, creating legal disputes over unearned or unpaid wages.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Exact Binary Mask Audit
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=NETWORKDAYS.INTL(Start, End, \"0101011\", tblHolidays[Date])"}
                </div>
                <p className="text-xs text-slate-400">
                  Counts the exact occurrences of Mondays, Wednesdays, and Fridays that do not clash with holidays.
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
            Custom binary mask filtering days of week to calculate exact operational capacity.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="780" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="420" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold font-mono">Part-Time Schedule: "0101011" (Mon, Wed, Fri Only)</text>

        <rect x="50" y="90" width="95" height="45" rx="8" fill="#064E3B" stroke="#10B981" />
        <text x="97" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold">Mon (0)</text>
        <text x="97" y="125" textAnchor="middle" fill="#6EE7B7" className="text-[10px] font-bold">BILLED</text>

        <rect x="155" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="202" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Tue (1)</text>
        <text x="202" y="125" textAnchor="middle" fill="#64748B" className="text-[10px]">Off</text>

        <rect x="260" y="90" width="95" height="45" rx="8" fill="#064E3B" stroke="#10B981" />
        <text x="307" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold">Wed (0)</text>
        <text x="307" y="125" textAnchor="middle" fill="#6EE7B7" className="text-[10px] font-bold">BILLED</text>

        <rect x="365" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="412" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Thu (1)</text>
        <text x="412" y="125" textAnchor="middle" fill="#64748B" className="text-[10px]">Off</text>

        <rect x="470" y="90" width="95" height="45" rx="8" fill="#064E3B" stroke="#10B981" />
        <text x="517" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold">Fri (0)</text>
        <text x="517" y="125" textAnchor="middle" fill="#6EE7B7" className="text-[10px] font-bold">BILLED</text>

        <rect x="575" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="622" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Sat (1)</text>
        <text x="622" y="125" textAnchor="middle" fill="#64748B" className="text-[10px]">Off</text>

        <rect x="680" y="90" width="110" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="735" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Sun (1)</text>
        <text x="735" y="125" textAnchor="middle" fill="#64748B" className="text-[10px]">Off</text>
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
                Explore real NETWORKDAYS.INTL formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic17"
            title="Topic 17: NETWORKDAYS.INTL Master Practice Grid"
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
                  Scenario 1: Manufacturing Heavy Plant
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Industrial Foundry</span>
              </div>
              <h3 className="text-base font-bold text-white">Indian 6-Day Plant Monthly Worker Production Days</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Plant floor operates Monday through Saturday with only Sunday closed. Calculate total billable production days for the month in A2 to B2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply weekend code 11 for Sunday-only schedule</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(A2, B2, 11, tblPlantHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"25 Working Days (vs 21 on 5-day week)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Middle East Corporate Finance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Riyadh Financial Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Saudi Arabian Islamic Banking Billing Days</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Commercial banks in Saudi Arabia operate Sunday through Thursday with Friday and Saturday off. Calculate monthly billing days for branch operations in C2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply code 7 for Friday/Saturday weekend</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(C2, EOMONTH(C2, 0), 7, SaudiHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"22 Working Days (for Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: HR Flexible Workforce Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake IT Software Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Part-Time Job-Share Employee Attendance Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Part-time software QA specialist works exclusively on Mondays, Wednesdays, and Fridays (3 days/week). Establish attendance target for the month."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Use binary mask '0101011' for Mon, Wed, Fri only</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(D2, EOMONTH(D2, 0), \"0101011\", TechHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"13 Working Days Target"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Retail Hypermarket Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Shopping Mall Roster</span>
              </div>
              <h3 className="text-base font-bold text-white">Weekend-Only Cashier Staffing Monthly Days</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Student cashiers work exclusively on Saturdays and Sundays (Monday through Friday are non-working days). Calculate total weekend shifts worked."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Binary mask '1111100' counts only Saturdays and Sundays</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(E2, EOMONTH(E2, 0), \"1111100\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"9 Weekend Shifts"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Continuous Petrochemical Refining
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Haldia Petrochemicals Complex</span>
              </div>
              <h3 className="text-base font-bold text-white">Continuous 24/7 Plant Refinery Throughput Days</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Petrochemical refining operates 24/7/365 without weekends, pausing only for scheduled annual maintenance shutdown dates."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Binary mask '0000000' counts all 7 days as operational</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(F2, G2, \"0000000\", ShutdownDates)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"361 Operational Days"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Healthcare Specialty Clinic
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Diabetic Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Tuesday-Thursday Specialist OPD Clinic Days</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Visiting endocrinologist holds outpatient clinics strictly on Tuesdays and Thursdays. Calculate total clinic consultation days held during the semester."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Binary mask '1010111' isolates Tuesdays and Thursdays</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(H2, I2, \"1010111\", ClinicHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"26 Clinic Consultation Days"}
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
              <span className="text-indigo-400 font-bold">Step 1: Select Numeric Code or Binary Mask</span>
              <p>{"For common regional schedules, use integer codes (11 for Sun-only, 7 for Fri/Sat). For custom shifts, use a 7-character string."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Code 11: =NETWORKDAYS.INTL(A2, B2, 11)\nBinary: =NETWORKDAYS.INTL(A2, B2, '0000001')"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Understand the Binary Mask Positions</span>
              <p>{"The string represents Monday through Sunday from left to right. '1' = Day Off, '0' = Working Day."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Mon Tue Wed Thu Fri Sat Sun\n 0   1   0   1   0   1   1 -> Mon/Wed/Fri Schedule"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Add Public Holidays</span>
              <p>{"Pass your corporate holiday range as Argument 4 to exclude non-working holidays."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=NETWORKDAYS.INTL(A2, B2, 11, tblHolidays[Date])"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Scale to Billing Revenue</span>
              <p>{"Multiply the resulting net days by your daily consulting or shift billing rate."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Revenue: =NETWORKDAYS.INTL(A2, B2, 11, Holidays) * DailyRate"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on All-1s Binary Mask"}</td>
                  <td className="py-3 px-4 font-sans">{"Passing '1111111' where every single day is marked non-working. The function cannot calculate zero-capacity schedules."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=NETWORKDAYS.INTL(A2, B2, '1111111')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure at least one character in the 7-digit mask is '0' (working day)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inverted Positive/Negative Sign"}</td>
                  <td className="py-3 px-4 font-sans">{"Supplying start_date after end_date. NETWORKDAYS.INTL returns negative integers when dates are inverted."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=NETWORKDAYS.INTL('2026-11-30', '2026-11-01', 11)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Verify start_date precedes end_date, or wrap with ABS() for absolute count."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Holiday Falling on Weekend Counted Twice"}</td>
                  <td className="py-3 px-4 font-sans">{"Novice analysts fear that holidays falling on weekends subtract 2 days. NETWORKDAYS.INTL handles this intelligently and only subtracts once."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Holiday falls on a Sunday in a Sunday-only workweek"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"No action needed; Excel eliminates double-counting automatically."}</td>
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
              <span className="text-indigo-400 font-bold">The Standard Indian Manufacturing Code 11</span>
              <p className="text-slate-300">{"Always use Code 11 for Indian manufacturing, infrastructure, and retail workforces: =NETWORKDAYS.INTL(Start, End, 11, Holidays)."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">7-Day Continuous Operation Mask</span>
              <p className="text-slate-300">{"For power plants, refineries, and server uptime monitoring, use '0000000' to count every calendar day while still deducting holidays."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Middle East Sun-Thu Banking Code 7</span>
              <p className="text-slate-300">{"For Saudi Arabia, UAE, and GCC banking models, Code 7 automatically aligns with Friday/Saturday weekends."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Dynamic Part-Time Payroll Formulas</span>
              <p className="text-slate-300">{"Store the 7-character mask in an employee profile table column (e.g. [ShiftMask]), then reference dynamically: =NETWORKDAYS.INTL(Start, End, [@ShiftMask], Holidays)."}</p>
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
              • <strong>System Architecture:</strong> {"Why did Microsoft introduce NETWORKDAYS.INTL in Excel 2010 when NETWORKDAYS was already a popular function?"}
            </p>

            <p key="1">
              • <strong>Payroll Compliance:</strong> {"How does storing employee shift patterns as binary masks ('0101011') reduce formula maintenance in enterprise HR payroll workbooks?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 17: NETWORKDAYS.INTL Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="NETWORKDAYS.INTL Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"NETWORKDAYS.INTL is the universal solution for global workforce capacity. Never force a 5-day Mon-Fri formula on a 6-day Indian plant — code 11 (=NETWORKDAYS.INTL(Start, End, 11)) gives you the true 25-day production reality. Master the 7-character binary mask; it is one of Excel's most powerful secret weapons."}
          />
        </div>
      </div>
    </div>
  );
}
