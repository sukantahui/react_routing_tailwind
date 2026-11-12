"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic15() {
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

  const [inpIntlStart, setInpIntlStart] = useState("2026-11-12");
  const [inpIntlDays, setInpIntlDays] = useState(10);
  const [selectedPattern, setSelectedPattern] = useState("11"); // Code 11 = Sunday only

  const intlPresets = {
    "1": { label: "Sat & Sun (Code 1)", mask: "0000011", desc: "Standard 5-day corporate" },
    "7": { label: "Fri & Sat (Code 7)", mask: "0000110", desc: "Middle East (Gulf standard)" },
    "11": { label: "Sunday Only (Code 11)", mask: "0000001", desc: "Indian 6-day manufacturing" },
    "4day": { label: "Fri-Sun Off (4-Day)", mask: "0000111", desc: "Compressed 4-day tech week" }
  };

  const intlCalcResult = useMemo(() => {
    const s = new Date(inpIntlStart);
    const n = parseInt(inpIntlDays, 10);

    if (isNaN(s.getTime()) || isNaN(n)) {
      return { isError: true, error: "#VALUE! Invalid date or days argument" };
    }

    const config = intlPresets[selectedPattern] || intlPresets["11"];
    const mask = config.mask;

    let curr = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    let step = n >= 0 ? 1 : -1;
    let daysToCount = Math.abs(n);
    let weekendDaysSkipped = 0;

    while (daysToCount > 0) {
      curr.setDate(curr.getDate() + step);
      // Map JS day to mask: Mon=0, Tue=1, ... Sun=6
      const jsDay = curr.getDay();
      const maskIdx = jsDay === 0 ? 6 : jsDay - 1;
      const isOff = mask[maskIdx] === "1";

      if (isOff) {
        weekendDaysSkipped++;
      } else {
        daysToCount--;
      }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = `${String(curr.getDate()).padStart(2, "0")}-${monthNames[curr.getMonth()]}-${curr.getFullYear()}`;
    const dayName = curr.toLocaleDateString("en-US", { weekday: "long" });

    const totalCalendarDays = Math.round(Math.abs(curr.getTime() - s.getTime()) / 86400000);

    return {
      isError: false,
      outDateStr,
      dayName,
      totalCalendarDays,
      weekendDaysSkipped,
      activeMask: mask,
      scheduleDesc: config.desc
    };
  }, [inpIntlStart, inpIntlDays, selectedPattern]);

  const applyPreset = (preset) => {
    if (preset === "india_plant") {
      setInpIntlStart("2026-11-12");
      setInpIntlDays(10);
      setSelectedPattern("11");
    } else if (preset === "middle_east") {
      setInpIntlStart("2026-11-12");
      setInpIntlDays(10);
      setSelectedPattern("7");
    } else if (preset === "standard_5day") {
      setInpIntlStart("2026-11-12");
      setInpIntlDays(10);
      setSelectedPattern("1");
    } else if (preset === "compressed_4day") {
      setInpIntlStart("2026-11-12");
      setInpIntlDays(10);
      setSelectedPattern("4day");
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
              ⚡ Date & Calendar Engineering · Topic 15
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Global Project Management · Custom Weekend
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Synthesize & Model
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            WORKDAY.INTL Function — Custom Weekend & Cross-Border Working Days Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">WORKDAY.INTL(start_date, days, [weekend], [holidays])</code> function is Excel's ultimate enterprise project scheduling engine. It extends the standard WORKDAY function by introducing customizable weekend definitions.</p><p>In global supply chains, operations rarely adhere to a monolithic Saturday/Sunday weekend. In the Middle East (UAE, Saudi Arabia, Qatar), business workweeks historically ran Sunday through Thursday with Friday/Saturday weekends. In Indian and Chinese manufacturing hubs, factory floors operate on a <strong>6-day workweek</strong> with only Sunday off. In digital e-commerce and retail customer care, teams work 4-day rotating shifts. <code className="text-indigo-300 font-mono">WORKDAY.INTL()</code> accommodates all operational paradigms using either intuitive numeric weekend codes (1-17) or powerful <strong>7-character binary masks</strong> (e.g. <code className="text-white font-mono">"0000011"</code>).</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=WORKDAY.INTL(start_date, days, [weekend], [holidays])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Middle East Corporate Operations, 6-Day Manufacturing & Retail Shifts</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =WORKDAY.INTL(A2, 10, 11, Holidays) (Sunday-Only Weekend)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive WORKDAY.INTL Multi-Weekend Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate Middle East (Fri/Sat), Indian manufacturing (Sunday-only), and compressed 4-day sprint schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("india_plant")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Indian 6-Day Plant (Sun Only)
          </button>
          <button
            onClick={() => applyPreset("middle_east")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Middle East (Fri / Sat)
          </button>
          <button
            onClick={() => applyPreset("standard_5day")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Global Mon-Fri (Code 1)
          </button>
          <button
            onClick={() => applyPreset("compressed_4day")}
            className="px-2.5 py-1 text-xs rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/60 transition cursor-pointer"
          >
            4-Day Week ("0000111")
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Base Date</span>
          </label>
          <input
            type="date"
            value={inpIntlStart}
            onChange={(e) => setInpIntlStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Workdays</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer Count</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpIntlDays}
            onChange={(e) => setInpIntlDays(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Weekend Paradigm (Arg 3)
          </label>
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="11">11 — Sunday Only (Indian 6-Day Plant)</option>
            <option value="7">7 — Friday & Saturday (Middle East)</option>
            <option value="1">1 — Saturday & Sunday (Standard 5-Day)</option>
            <option value="4day">"0000111" — Compressed 4-Day Week</option>
          </select>
          <span className="text-[10px] text-slate-500 block truncate">{intlCalcResult.scheduleDesc}</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WORKDAY.INTL("{inpIntlStart}", {inpIntlDays}, {selectedPattern.length > 2 ? `"${intlCalcResult.activeMask}"` : selectedPattern})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Target Delivery:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {intlCalcResult.isError ? intlCalcResult.error : intlCalcResult.outDateStr}
            </span>
          </div>
        </div>

        {!intlCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Delivery Day:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {intlCalcResult.dayName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Calendar Days Elapsed:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                {intlCalcResult.totalCalendarDays} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Non-Working Days Skipped:</span>
              <span className="text-purple-300 font-semibold font-mono text-base">
                {intlCalcResult.weekendDaysSkipped} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Active Mask:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                "{intlCalcResult.activeMask}"
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
              Universal Multi-Weekend Scheduling Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical WORKDAY.INTL Formula Signature</div>
            <div className="text-white font-bold text-base">
              =WORKDAY.INTL(start_date, days, [weekend], [holidays])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The starting date from which business days are stepped.</div><div>• <strong className="text-sky-300">days:</strong> Required. Number of working days before (negative) or after (positive) start_date.</div><div>• <strong className="text-amber-300">weekend:</strong> Optional. Specifies which days are weekends. Can be a numeric code (1-17) or a 7-character binary mask string where '1' = non-working day and '0' = working day starting on Monday.</div><div>• <strong className="text-emerald-300">holidays:</strong> Optional. A cell range or array constant containing dates to exclude.</div>
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
              <span className="text-emerald-400">📊</span> WORKDAY.INTL Weekend Codes & Binary Mask Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select numeric codes or craft custom 7-character binary strings for any working schedule.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Weekend Code / String</th>
                  <th className="py-3 px-4">Non-Working Days</th>
                  <th className="py-3 px-4">Workweek Pattern</th>
                  <th className="py-3 px-4">Typical Global Use Case</th>
                  <th className="py-3 px-4">Workdays in Week</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (or omitted)</td>
        <td className="py-3.5 px-4 text-white">Saturday, Sunday</td>
        <td className="py-3.5 px-4 text-slate-300">Mon - Fri (5 Days)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Standard global corporate default</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">5 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">7</td>
        <td className="py-3.5 px-4 text-white">Friday, Saturday</td>
        <td className="py-3.5 px-4 text-slate-300">Sun - Thu (5 Days)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Middle East (Saudi Arabia, UAE, Qatar)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">5 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">11</td>
        <td className="py-3.5 px-4 text-white">Sunday Only</td>
        <td className="py-3.5 px-4 text-slate-300">Mon - Sat (6 Days)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Indian manufacturing plants, construction & retail</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">6 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"0000111"</td>
        <td className="py-3.5 px-4 text-white">Fri, Sat, Sun</td>
        <td className="py-3.5 px-4 text-slate-300">Mon - Thu (4 Days)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Modern compressed 4-day tech workweek</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">4 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"1111100"</td>
        <td className="py-3.5 px-4 text-white">Mon - Fri Off</td>
        <td className="py-3.5 px-4 text-slate-300">Sat & Sun Only (2 Days)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Weekend maintenance & retail support crew</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2 Days</td>
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
                The Power of the 7-Character Binary String Mask
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How '0000010' unlocks infinite shift schedule flexibility in enterprise planning.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>While numeric codes 1-17 cover standard configurations, real-world operations often require bespoke non-working patterns (e.g. part-time employees working Monday, Wednesday, and Friday, or factory machines idling on Tuesdays).</p><p>Excel solves this with the <strong>7-character binary mask string</strong>. The string represents Monday through Sunday from left to right: <br/>• <code className="text-emerald-300 font-mono">0</code> represents an active WORKING day.<br/>• <code className="text-rose-400 font-mono">1</code> represents a NON-WORKING day.<br/>For example, <code className="text-white font-mono">"0101011"</code> models an employee working Mon, Wed, Fri only! Note: A mask of <code className="text-rose-400 font-mono">"1111111"</code> (all non-working) is invalid and throws <code className="text-rose-400 font-mono">#VALUE!</code>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle Nested IFs for Custom Workweeks
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=IF(WEEKDAY(A2)=1, A2+1, IF(WEEKDAY(A2)=6, A2+2, A2+1))"}
                </div>
                <p className="text-xs text-slate-400">
                  Unmaintainable spaghetti formula that breaks when holidays or multi-day intervals are introduced.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production WORKDAY.INTL Binary Mask
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=WORKDAY.INTL(A2, 10, \"0000001\", tblHolidays[Date])"}
                </div>
                <p className="text-xs text-slate-400">
                  Single clean function accurately modeling 6-day manufacturing workweeks across India.
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
            7-character binary mask: each position mapping to Monday through Sunday.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="780" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="420" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold font-mono">Binary Mask: "0000010" (Sunday Only Off - 6 Day Workweek)</text>

        <rect x="50" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="97" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Mon: '0'</text>
        <text x="97" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="155" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="202" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Tue: '0'</text>
        <text x="202" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="260" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="307" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Wed: '0'</text>
        <text x="307" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="365" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="412" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Thu: '0'</text>
        <text x="412" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="470" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="517" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Fri: '0'</text>
        <text x="517" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="575" y="90" width="95" height="45" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="622" y="110" textAnchor="middle" fill="#94A3B8" className="text-xs">Sat: '0'</text>
        <text x="622" y="125" textAnchor="middle" fill="#34D399" className="text-[10px] font-bold">WORK</text>

        <rect x="680" y="90" width="110" height="45" rx="8" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="735" y="110" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sun: '1'</text>
        <text x="735" y="125" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-bold">WEEKEND</text>
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
                Explore real WORKDAY.INTL formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic15"
            title="Topic 15: WORKDAY.INTL Master Practice Grid"
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
                  Scenario 1: Manufacturing Heavy Engineering
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Industrial Spares</span>
              </div>
              <h3 className="text-base font-bold text-white">6-Day Factory Shift Production Lead Time</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Indian heavy casting plant operates Monday through Saturday with only Sunday closed. Given casting start date in A2 and 12-day machining cycle, project shipping date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Use weekend code 11 for Sunday-only weekend</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(A2, 12, 11, tblPlantHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"26-Nov-2026 (finishes 2 days faster than 5-day week)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Middle East Corporate Banking
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dubai International Financial Centre (DIFC)</span>
              </div>
              <h3 className="text-base font-bold text-white">Gulf Cooperation Council (GCC) Trade Settlement</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Financial instruments traded in Riyadh and Dubai adhere to the Islamic Sun-Thu workweek with Friday/Saturday weekends. Calculate T+3 settlement date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply weekend code 7 for Friday & Saturday weekend</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(B2, 3, 7, IslamicHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"17-Nov-2026 (for trade executed on Wednesday 11-Nov)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Modern Tech Workforce Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V SaaS Incubator</span>
              </div>
              <h3 className="text-base font-bold text-white">Compressed 4-Day Workweek Release Deployment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Engineering teams work Monday through Thursday with Friday, Saturday, and Sunday off. Calculate release completion date for an 8-workday sprint."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply 7-character binary mask '0000111'</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(C2, 8, \"0000111\", Holidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"25-Nov-2026 (from 12-Nov start)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Retail Hypermarket Supply Logistics
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata City Logistics Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Retail Warehouse Weekend-Only Support Crew</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Weekend replenishment team operates exclusively on Saturdays and Sundays (Monday through Friday are non-working). Schedule a 4-shift restocking window."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply binary mask '1111100' for Sat/Sun work only</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(D2, 4, \"1111100\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"22-Nov-2026 (spans across two consecutive weekends)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Healthcare 24/7 Ward Staffing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Emergency Trauma Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Physiotherapist Mon-Wed-Fri Rotating Clinic</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Consultant physiotherapist visits hospital wards only on Monday, Wednesday, and Friday. Establish date of patient's 6th therapy session from date in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Binary mask '0101011' models Mon, Wed, Fri working days</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(E2, 6, \"0101011\", HospitalHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"25-Nov-2026 (from 13-Nov session)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Mining & Heavy Civil Excavation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Asansol Coalfields</span>
              </div>
              <h3 className="text-base font-bold text-white">Continuous 7-Day Operations (Zero Weekend Off)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Coal extraction runs 365 days a year without weekly off days, pausing only on declared national gazetted holidays."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Binary mask '0000000' counts all 7 days as working</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(F2, 20, \"0000000\", GazettedHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"02-Dec-2026 (from 12-Nov start)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Choose Numeric Code or Binary Mask</span>
              <p>{"For standard weekend variants (like Fri/Sat = 7 or Sun-only = 11), pass integer codes. For bespoke patterns, use a 7-character string."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Numeric Code: =WORKDAY.INTL(A2, 10, 11)\nBinary Mask: =WORKDAY.INTL(A2, 10, '0000001')"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Construct the Binary Mask Correctly</span>
              <p>{"The 7 characters represent Monday through Sunday from left to right. '1' = Day Off, '0' = Working Day."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Mon Tue Wed Thu Fri Sat Sun\n 0   0   0   0   0   0   1  -> Sunday Only Off"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Integrate Company Holidays</span>
              <p>{"Pass your dynamic holiday table as Argument 4 to exclude non-working holidays."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WORKDAY.INTL(A2, 10, 11, tblHolidays[Date])"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format Cell as Date</span>
              <p>{"Apply standard short date formatting to the resulting numeric serial."}</p>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on All-1s Binary Mask"}</td>
                  <td className="py-3 px-4 font-sans">{"Passing '1111111' where every day is marked non-working. The function cannot step forward through zero working days."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=WORKDAY.INTL(A2, 5, '1111111')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure at least one character in the 7-character mask is '0' (working day)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Invalid Mask Length"}</td>
                  <td className="py-3 px-4 font-sans">{"Supplying a binary mask with fewer or more than 7 characters (e.g. 6 or 8 digits)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=WORKDAY.INTL(A2, 5, '000001')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Verify the mask has exactly 7 characters corresponding to Mon-Sun."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inverted 0 and 1 Meaning"}</td>
                  <td className="py-3 px-4 font-sans">{"Assuming '1' means working and '0' means weekend. In Excel's binary mask, 1 = NON-WORKING (Day Off)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Mask '1111100' written expecting Mon-Fri working"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Remember: 0 = Work, 1 = Rest."}</td>
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
              <span className="text-indigo-400 font-bold">The Sunday-Only Indian Plant Code</span>
              <p className="text-slate-300">{"Memorize Code 11! For Indian factory floors, construction sites, and retail branches with a 6-day workweek, =WORKDAY.INTL(A2, N, 11) is the standard."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">The Zero-Weekend Continuous Operation</span>
              <p className="text-slate-300">{"Need to step calendar days while still excluding statutory holidays? Use binary mask '0000000': =WORKDAY.INTL(A2, N, '0000000', Holidays)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Middle East Fri/Sat Code 7</span>
              <p className="text-slate-300">{"For cross-border models involving Gulf branches, code 7 locks the schedule to Sunday-Thursday workweeks."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Backward Stepping with Negative Days</span>
              <p className="text-slate-300">{"Supply negative integers to find the latest start date required to meet a firm delivery milestone: =WORKDAY.INTL(TargetDate, -15, 11, Holidays)."}</p>
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
              • <strong>System Architecture:</strong> {"Why did Microsoft design the binary mask so that 1 represents a day off and 0 represents a working day?"}
            </p>

            <p key="1">
              • <strong>Global Supply Chain:</strong> {"How does shifting from standard 5-day WORKDAY to 6-day WORKDAY.INTL(..., 11) compress delivery schedules for an Indian manufacturing plant?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 15: WORKDAY.INTL Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="WORKDAY.INTL Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"WORKDAY.INTL is what separates novice spreadsheet users from true corporate system architects. Always remember: in India, most manufacturing plants operate on a 6-day workweek — code 11 (=WORKDAY.INTL(A2, days, 11)) is your bread and butter. And memorize the binary mask rule: 0 is Work, 1 is Rest."}
          />
        </div>
      </div>
    </div>
  );
}
