"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic11() {
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

  const [inpWeekdayDate, setInpWeekdayDate] = useState("2026-11-12");
  const [selectedReturnType, setSelectedReturnType] = useState(2);

  const weekdayCalcResult = useMemo(() => {
    const s = new Date(inpWeekdayDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const jsDay = s.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[jsDay];

    let numericVal = 1;
    if (selectedReturnType === 1) {
      numericVal = jsDay + 1; // Sun=1..Sat=7
    } else if (selectedReturnType === 2) {
      numericVal = jsDay === 0 ? 7 : jsDay; // Mon=1..Sun=7
    } else if (selectedReturnType === 3) {
      numericVal = jsDay === 0 ? 6 : jsDay - 1; // Mon=0..Sun=6
    }

    const isWeekend = jsDay === 0 || jsDay === 6;
    const overtimeRate = isWeekend ? "2.0x (Double Time)" : "1.0x (Standard Time)";

    return {
      isError: false,
      dayName,
      numericVal,
      isWeekend,
      overtimeRate
    };
  }, [inpWeekdayDate, selectedReturnType]);

  const applyPreset = (preset) => {
    if (preset === "thursday") {
      setInpWeekdayDate("2026-11-12"); // Thursday
    } else if (preset === "saturday") {
      setInpWeekdayDate("2026-11-14"); // Saturday
    } else if (preset === "sunday") {
      setInpWeekdayDate("2026-11-15"); // Sunday
    } else if (preset === "monday") {
      setInpWeekdayDate("2026-11-16"); // Monday
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
              ⚡ Date & Calendar Engineering · Topic 11
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Calendar Logic · Shift Classifier
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Classify
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            WEEKDAY Function — Day of Week & Weekend Identification Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">WEEKDAY(serial_number, [return_type])</code> function returns an integer representing the day of the week for a given date serial number.</p><p>By default, Excel assigns Sunday = 1 through Saturday = 7. However, the function incorporates <strong>10 distinct return_type configurations</strong> (including Return Type 2: Monday = 1 through Sunday = 7, and Return Type 11-17 for international corporate calendars). In operational modeling, <code className="text-indigo-300 font-mono">WEEKDAY()</code> is the master engine for conditional formatting weekend rows, applying weekend overtime wage multipliers, and skipping non-operational days in logistics dispatch pipelines.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=WEEKDAY(serial_number, [return_type])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Overtime Payroll, Weekend Conditional Formatting & Fleet Dispatch</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =WEEKDAY(A2, 2) >= 6 (Identifies Sat/Sun Weekend)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive WEEKDAY Day-of-Week Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test different dates, toggle return types (1, 2, 3), and observe weekend detection logic live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("thursday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Thursday (Workday)
          </button>
          <button
            onClick={() => applyPreset("saturday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Saturday (Weekend)
          </button>
          <button
            onClick={() => applyPreset("sunday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Sunday (Weekend)
          </button>
          <button
            onClick={() => applyPreset("monday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Monday (Week Start)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Date Selection (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpWeekdayDate}
            onChange={(e) => setInpWeekdayDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Return Type (Argument 2)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 1, label: "Type 1 (Sun=1)", desc: "1 to 7" },
              { type: 2, label: "Type 2 (Mon=1)", desc: "1 to 7 (Best)" },
              { type: 3, label: "Type 3 (Mon=0)", desc: "0 to 6" }
            ].map(item => (
              <button
                key={item.type}
                onClick={() => setSelectedReturnType(item.type)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  selectedReturnType === item.type
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                <div className="font-bold text-xs">{item.label}</div>
                <div className="text-[10px] opacity-75">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WEEKDAY("{inpWeekdayDate}", {selectedReturnType})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Day Index:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700">
              {weekdayCalcResult.isError ? weekdayCalcResult.error : weekdayCalcResult.numericVal}
            </span>
          </div>
        </div>

        {!weekdayCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day Name:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                {weekdayCalcResult.dayName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Weekend Classification:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  weekdayCalcResult.isWeekend ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {weekdayCalcResult.isWeekend ? "🚨 Weekend (Sat / Sun)" : "✓ Standard Workday"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Overtime Multiplier:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {weekdayCalcResult.overtimeRate}
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
              Day-of-Week Mapping Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical WEEKDAY Formula Signature</div>
            <div className="text-white font-bold text-base">
              =WEEKDAY(serial_number, [return_type])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">serial_number:</strong> Required. A sequential number representing the date of the day you want to identify. Dates must be authentic numeric serials.</div><div>• <strong className="text-sky-300">return_type:</strong> Optional. A number that determines the type of return value: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">1 (or omitted):</code> Numbers 1 (Sunday) through 7 (Saturday).<br/>&nbsp;&nbsp;• <code className="font-mono text-emerald-300">2:</code> Numbers 1 (Monday) through 7 (Sunday). <em>(Enterprise standard for Mon-Fri workweeks!)</em><br/>&nbsp;&nbsp;• <code className="font-mono text-white">3:</code> Numbers 0 (Monday) through 6 (Sunday).<br/>&nbsp;&nbsp;• <code className="font-mono text-white">11-17:</code> Various starting day configurations.</div><div>• <strong className="text-amber-300">Weekend Detection Rule:</strong> Under Return Type 2, the weekend is effortlessly identified with the test: <code className="font-mono text-white">WEEKDAY(A2, 2) &gt;= 6</code>.</div>
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
              <span className="text-emerald-400">📊</span> WEEKDAY Return Type Configuration Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select the optimal return type for your geographic and corporate calendar framework.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">First Day of Week</th>
                  <th className="py-3 px-4">Day Range</th>
                  <th className="py-3 px-4">Weekend Filter Test</th>
                  <th className="py-3 px-4">Corporate Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (Default)</td>
        <td className="py-3.5 px-4 text-white">Sunday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">OR(W=1, W=7)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Traditional US calendar layout</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2 (Recommended)</td>
        <td className="py-3.5 px-4 text-white">Monday (= 1)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 2) &gt;= 6</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Global ISO 8601 & European business standard</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">3</td>
        <td className="py-3.5 px-4 text-white">Monday (= 0)</td>
        <td className="py-3.5 px-4 text-slate-300">0 to 6</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 3) &gt;= 5</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Python / C++ zero-indexed array compatibility</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">11</td>
        <td className="py-3.5 px-4 text-white">Monday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 11) &gt;= 6</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Explicit Monday start (Excel 2010+)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">17</td>
        <td className="py-3.5 px-4 text-white">Sunday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">OR(W=6, W=7)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Middle East Fri-Sat weekend shift alignment</td>
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
                The Superiority of Return Type 2 for Weekend Logic
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why Return Type 2 simplifies weekend conditional formatting from a clumsy OR to a clean >=
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>Under Excel's default <code className="text-white font-mono">WEEKDAY(A2)</code> (Return Type 1), Sunday is 1 and Saturday is 7. To test whether a date is a weekend, an analyst must write an awkward compound formula: <code className="text-rose-400 font-mono">=OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7)</code>.</p><p>However, by specifying <strong>Return Type 2</strong> (<code className="text-indigo-300 font-mono">=WEEKDAY(A2, 2)</code>), Monday becomes 1, Tuesday is 2, ..., Saturday is 6, and Sunday is 7! Now, Saturday and Sunday are adjacent at the top of the range. The weekend test reduces to an elegant single comparison: <code className="text-emerald-300 font-mono">=WEEKDAY(A2, 2) &gt;= 6</code>. This simple adjustment speeds up conditional formatting evaluation by over 40% on massive tables.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Clumsy Default Return Type 1 Test
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=IF(OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7), \"Weekend\", \"Workday\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Requires two separate function evaluations and an OR wrapper, creating unnecessary calculation overhead.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Streamlined Return Type 2 Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=IF(WEEKDAY(A2, 2) >= 6, \"Weekend\", \"Workday\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Single function call with single greater-than-or-equal comparison; the gold standard for conditional formatting.
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
            Return Type 2 mapping Monday through Sunday, placing weekends conveniently at >= 6.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="80" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Mon (1)</text>
        <text x="80" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="135" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="185" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Tue (2)</text>
        <text x="185" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="240" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="290" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Wed (3)</text>
        <text x="290" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="345" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="395" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Thu (4)</text>
        <text x="395" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="450" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="500" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Fri (5)</text>
        <text x="500" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="560" y="45" width="120" height="100" rx="12" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="620" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sat (6)</text>
        <text x="620" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">WEEKEND</text>

        <rect x="690" y="45" width="120" height="100" rx="12" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="750" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sun (7)</text>
        <text x="750" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">WEEKEND</text>
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
                Explore real WEEKDAY formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic11"
            title="Topic 11: WEEKDAY Master Practice Grid"
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
                  Scenario 1: Corporate Payroll & Overtime
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Manufacturing Unit</span>
              </div>
              <h3 className="text-base font-bold text-white">Weekend Overtime Double-Time Pay Multiplier</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Factory workers performing shifts on Saturday or Sunday earn 2.0x base wage rate in cell C2; weekday shifts earn standard 1.0x pay."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Test WEEKDAY >= 6 under Return Type 2</div>
                <div className="text-emerald-300 font-bold">{"=C2 * IF(WEEKDAY(A2, 2) >= 6, 2.0, 1.0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 2,400.00 (double pay for Saturday shift)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Retail Operations & Staffing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata City Center Mall</span>
              </div>
              <h3 className="text-base font-bold text-white">Retail Weekend Footfall Premium Surcharge</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Weekend retail shoppers are charged a valet parking weekend rate. Given ticket entry date in B2, tag records into 'Weekend Premium' or 'Standard Weekday'."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Apply Return Type 2 weekend threshold</div>
                <div className="text-emerald-300 font-bold">{"=IF(WEEKDAY(B2, 2) >= 6, \"WEEKEND PREMIUM\", \"STANDARD WEEKDAY\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"WEEKEND PREMIUM\" (for Sunday entry)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Supply Chain & Logistics
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dankuni Surface Logistics</span>
              </div>
              <h3 className="text-base font-bold text-white">Delivery Dispatch Friday Roll-Forward Guard</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Parcels that finish packing on Friday (Day 5) or Saturday (Day 6) must not be dispatched until Monday morning (Day 1) to avoid warehouse congestion."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Roll Friday orders to Monday (+3 days) and Saturday to Monday (+2 days)</div>
                <div className="text-emerald-300 font-bold">{"=IF(WEEKDAY(D2, 2)=5, D2+3, IF(WEEKDAY(D2, 2)=6, D2+2, D2+1))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"16-Nov-2026 (for parcel packed on Friday 13-Nov)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Treasury & Bond Markets
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Financial Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Following Business Day Bond Coupon Settlement</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"If a bond coupon milestone in E2 falls on a weekend, push the settlement date automatically to the following Monday."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// If Saturday add 2; if Sunday add 1</div>
                <div className="text-emerald-300 font-bold">{"=E2 + CHOOSE(WEEKDAY(E2, 2), 0, 0, 0, 0, 0, 2, 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"16-Nov-2026 (for coupon landing on Sunday 15-Nov)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Healthcare & Clinic Rostering
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Multispecialty Hospital</span>
              </div>
              <h3 className="text-base font-bold text-white">Doctor Weekend On-Call Roster Assignment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Senior surgeons are on emergency trauma on-call duty exclusively on Saturdays and Sundays based on date in F2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Filter on-call duty using WEEKDAY</div>
                <div className="text-emerald-300 font-bold">{"=IF(WEEKDAY(F2, 2) >= 6, \"TRAUMA ON-CALL DUTY\", \"OPD CLINIC\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"TRAUMA ON-CALL DUTY\" (for Saturday 14-Nov)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: IT Support & Helpdesk SLAs
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh IT Global Services</span>
              </div>
              <h3 className="text-base font-bold text-white">24/7 Severity-1 Weekend Escalation Matrix</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Incident tickets logged during weekends require direct notification to the Director of Cloud Engineering."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Detect weekend ticket creation via Return Type 2</div>
                <div className="text-emerald-300 font-bold">{"=IF(WEEKDAY(G2, 2) >= 6, \"NOTIFY VP / ESCALATE\", \"ROUTINE HELP DESK\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"NOTIFY VP / ESCALATE\" (for Sunday incident)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Always Specify Return Type 2</span>
              <p>{"Avoid Return Type 1. Specifying 2 sets Monday = 1 through Sunday = 7, making weekend logic trivial."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WEEKDAY(A2, 2)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Apply the >= 6 Weekend Filter</span>
              <p>{"Because Saturday is 6 and Sunday is 7, testing >= 6 isolates both weekend days instantly."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WEEKDAY(A2, 2) >= 6"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Leverage CHOOSE for Custom Weekend Shifts</span>
              <p>{"Need to shift weekend dates to Monday? Use CHOOSE(WEEKDAY(A2,2), 0,0,0,0,0, 2, 1)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=A2 + CHOOSE(WEEKDAY(A2, 2), 0,0,0,0,0, 2, 1)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Extract Text Day Name</span>
              <p>{"If you want the text name ('Thursday') instead of the number, use =TEXT(A2, 'dddd')."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=TEXT(A2, 'dddd') -> 'Thursday'"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Weekend Logic Bugs from Return Type 1"}</td>
                  <td className="py-3 px-4 font-sans">{"Using default WEEKDAY(A2) where Sunday is 1 and Saturday is 7, then testing >= 6 which forgets Sunday!"}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=IF(WEEKDAY(A2)>=6, 'Weekend', 'Workday') misses Sunday!"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Always specify Return Type 2: =IF(WEEKDAY(A2, 2)>=6, 'Weekend', 'Workday')."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"Target cell contains unparseable date text."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=WEEKDAY('invalid')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Sanitize with DATEVALUE() or pass authentic numeric serials."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Conditional Formatting Fails on Shift"}</td>
                  <td className="py-3 px-4 font-sans">{"Conditional formatting formula uses relative references incorrectly across table rows."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Formula =WEEKDAY(A2, 2)>=6 entered without locking column ($A2)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Lock column coordinate: =WEEKDAY($A2, 2)>=6 to format the entire row."}</td>
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
              <span className="text-indigo-400 font-bold">The Ultimate Conditional Formatting Rule</span>
              <p className="text-slate-300">{"Highlight entire weekend rows in gray: Select table > New Rule > Formula: =WEEKDAY($A2, 2)>=6 > Set gray fill. Works seamlessly across millions of rows!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Day Name Extraction Without Formulas</span>
              <p className="text-slate-300">{"Just format the cell with custom number format 'dddd' to show 'Thursday' while keeping the underlying date serial intact for math."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Middle East Fri/Sat Weekend Rule</span>
              <p className="text-slate-300">{"For Saudi Arabia, UAE, or Qatar operations where Friday and Saturday are weekends, use: =OR(WEEKDAY(A2,2)=5, WEEKDAY(A2,2)=6)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Next Friday Calculation</span>
              <p className="text-slate-300">{"Calculate upcoming Friday for any date: =A2 + (5 - WEEKDAY(A2, 2)) + IF(WEEKDAY(A2, 2)>5, 7, 0)."}</p>
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
              • <strong>System Architecture:</strong> {"Why did Microsoft introduce 10 different return types for WEEKDAY instead of standardizing on ISO 8601 Monday-start?"}
            </p>

            <p key="1">
              • <strong>Computational Efficiency:</strong> {"Why is =WEEKDAY($A2, 2)>=6 significantly faster in Conditional Formatting than using =TEXT($A2, 'ddd')='Sun'?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 11: WEEKDAY Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="WEEKDAY Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"If you remember only one thing about WEEKDAY: ALWAYS pass 2 as the second argument (=WEEKDAY(A2, 2)). It sets Monday=1 and Sunday=7, allowing you to identify weekends with a clean >=6. Never use the clumsy default Return Type 1 with OR statements."}
          />
        </div>
      </div>
    </div>
  );
}
