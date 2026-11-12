"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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

  const [inpHour, setInpHour] = useState(8);
  const [inpMin, setInpMin] = useState(30);
  const [inpSec, setInpSec] = useState(0);

  const timeResult = useMemo(() => {
    const h = parseInt(inpHour, 10);
    const m = parseInt(inpMin, 10);
    const s = parseInt(inpSec, 10);

    if (isNaN(h) || isNaN(m) || isNaN(s)) {
      return { isError: true, error: "#VALUE! Invalid integer argument" };
    }

    // Excel modulo-24 algorithm
    const totalSeconds = (h * 3600) + (m * 60) + s;
    const daySeconds = 86400;
    const moduloSeconds = ((totalSeconds % daySeconds) + daySeconds) % daySeconds;
    const decimalFraction = moduloSeconds / daySeconds;

    const evaluatedHours = Math.floor(moduloSeconds / 3600);
    const evaluatedMinutes = Math.floor((moduloSeconds % 3600) / 60);
    const evaluatedSecs = moduloSeconds % 60;

    const ampm = evaluatedHours >= 12 ? "PM" : "AM";
    const displayHour12 = evaluatedHours % 12 === 0 ? 12 : evaluatedHours % 12;
    const formatted12 = `${String(displayHour12).padStart(2, "0")}:${String(evaluatedMinutes).padStart(2, "0")}:${String(evaluatedSecs).padStart(2, "0")} ${ampm}`;
    const formatted24 = `${String(evaluatedHours).padStart(2, "0")}:${String(evaluatedMinutes).padStart(2, "0")}:${String(evaluatedSecs).padStart(2, "0")}`;

    const hasWrappedDay = totalSeconds >= 86400;

    return {
      isError: false,
      decimalFraction: decimalFraction.toFixed(6),
      formatted12,
      formatted24,
      hasWrappedDay,
      totalSeconds
    };
  }, [inpHour, inpMin, inpSec]);

  const applyPreset = (preset) => {
    if (preset === "morning") {
      setInpHour(8);
      setInpMin(30);
      setInpSec(0);
    } else if (preset === "noon") {
      setInpHour(12);
      setInpMin(0);
      setInpSec(0);
    } else if (preset === "evening") {
      setInpHour(17);
      setInpMin(45);
      setInpSec(30);
    } else if (preset === "overflow") {
      setInpHour(26);
      setInpMin(90);
      setInpSec(0);
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
              ⚡ Date & Calendar Engineering · Topic 3
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Constructor · Fractional Precision
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Apply
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            TIME Function — 24-Hour Decimal Assembly & Fractional Math
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">TIME(hour, minute, second)</code> function is Excel's dedicated engine for constructing decimal time serials from discrete integer hour, minute, and second values.</p><p>In Excel's mathematical architecture, 1 complete day equals <code className="text-white font-mono">1.0</code>. Consequently, time is purely a fractional decimal between <code className="text-white font-mono">0.000000</code> (midnight 12:00:00 AM) and <code className="text-white font-mono">0.999988</code> (11:59:59 PM). The <code className="text-indigo-300 font-mono">TIME()</code> function automatically performs modulo-24 arithmetic: any hour exceeding 23 or minute/second exceeding 59 is seamlessly rolled forward, enabling elegant shift modeling and operational scheduling without manual clock wraps.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=TIME(hour, minute, second)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Shift Rosters, Manufacturing Punch Clocks & SLA Timers</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =TIME(8, 30, 0) (0.354167 Day Serial)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive TIME(Hour, Minute, Second) Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Construct time serials, inspect decimal conversions, and observe Excel's modulo-24 boundary wrap live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("morning")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Morning Shift (08:30)
          </button>
          <button
            onClick={() => applyPreset("noon")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Midday Noon (12:00)
          </button>
          <button
            onClick={() => applyPreset("evening")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Evening Shift (17:45:30)
          </button>
          <button
            onClick={() => applyPreset("overflow")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Wrap (26h 90m)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Hour (0-32767)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpHour}
            onChange={(e) => setInpHour(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Minute (0-32767)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpMin}
            onChange={(e) => setInpMin(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Second (0-32767)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpSec}
            onChange={(e) => setInpSec(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =TIME({inpHour}, {inpMin}, {inpSec})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Decimal Fraction:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                timeResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {timeResult.isError ? timeResult.error : timeResult.decimalFraction}
            </span>
          </div>
        </div>

        {!timeResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">12-Hour AM/PM:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {timeResult.formatted12}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">24-Hour Military:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {timeResult.formatted24}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Modulo-24 Day Rollover:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  timeResult.hasWrappedDay ? "text-amber-400" : "text-slate-300"
                }`}
              >
                {timeResult.hasWrappedDay ? "⚠️ Yes (>24 Hours Wrapped)" : "✓ Single Day Window"}
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
              Modulo-24 Decimal Synthesizer
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical TIME Formula Signature</div>
            <div className="text-white font-bold text-base">
              =TIME(hour, minute, second)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">hour:</strong> Required. A number from 0 (12:00 AM) to 32767 representing the hour. Values greater than 23 are divided by 24 and the remainder is treated as the hour value (modulo-24).</div><div>• <strong className="text-sky-300">minute:</strong> Required. A number from 0 to 32767 representing the minute. Values greater than 59 are converted to hours and minutes.</div><div>• <strong className="text-amber-300">second:</strong> Required. A number from 0 to 32767 representing the second. Values greater than 59 are converted to hours, minutes, and seconds.</div>
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
              <span className="text-emerald-400">📊</span> TIME Function Fractional Value Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe the exact decimal day fraction generated for key operational clock intervals.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Formula</th>
                  <th className="py-3 px-4">24-Hour Clock</th>
                  <th className="py-3 px-4">12-Hour AM/PM</th>
                  <th className="py-3 px-4">Excel Decimal Serial</th>
                  <th className="py-3 px-4">Industrial Utility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(0, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">00:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">12:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.000000</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midnight zero reset anchor</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(8, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">08:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">08:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.333333</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Morning factory shift commencement</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(12, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">12:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">12:00:00 PM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.500000</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midday half-day mark</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(16, 30, 0)</td>
        <td className="py-3.5 px-4 text-white">16:30:00</td>
        <td className="py-3.5 px-4 text-slate-300">04:30:00 PM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.687500</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">General shift departure bell</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-amber-400 font-bold">=TIME(25, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">01:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">01:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.041667</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Modulo-24 wrap (25 - 24 = 1:00 AM)</td>
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
                The Modulo-24 Trap: Why TIME() Discards Completed Days
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Understanding why =TIME(28, 0, 0) returns 4:00 AM (0.1667) rather than 1.1667 days.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A critical architectural nuance of Excel's <code className="text-indigo-300 font-mono">TIME()</code> function is that it is <strong>strictly bound to a single 24-hour cycle</strong>. If you pass an hour value greater than 23, Excel performs an internal modulo operation: <code className="text-white font-mono">Hour MOD 24</code>.</p><p>For example, if a shift lasts 28 hours, <code className="text-white font-mono">=TIME(28, 0, 0)</code> will return <code className="text-emerald-300 font-mono">0.166667</code> (which represents 4:00 AM), completely discarding the full 24-hour day! To calculate total elapsed duration exceeding 24 hours, perform direct decimal math: <code className="text-emerald-300 font-mono">=Hours / 24</code> rather than using <code className="text-indigo-300 font-mono">TIME()</code>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Multi-Day Overflow Blunder
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=TIME(ElapsedHours, ElapsedMinutes, 0)"}
                </div>
                <p className="text-xs text-slate-400">
                  If ElapsedHours = 36, TIME() strips the 24 hours and evaluates to 12:00 PM (0.5), losing an entire day of billing!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Elapsed Duration Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=(ElapsedHours / 24) + (ElapsedMinutes / 1440)"}
                </div>
                <p className="text-xs text-slate-400">
                  Preserves whole days as integer serials (1.5 days for 36 hours) and formats cleanly with [h]:mm.
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
            Hour, Minute, and Second integers transformed into decimal fractions of a single 24-hour day.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Hour: 14 (/24)</text>

        <rect x="30" y="80" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Minute: 30 (/1440)</text>

        <rect x="30" y="130" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="155" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Second: 00 (/86400)</text>

        <path d="M 195 50 L 320 100 M 195 100 L 320 100 M 195 150 L 320 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="320" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=TIME(H, M, S) Engine</text>
        <text x="440" y="102" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">(14/24) + (30/1440)</text>
        <text x="440" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">Modulo 24 Math</text>

        <path d="M 560 100 L 630 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Decimal Day Fraction</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">0.604167</text>
        <text x="720" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">02:30:00 PM</text>
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
                Explore real TIME formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic3"
            title="Topic 3: TIME Master Practice Grid"
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
                  Scenario 1: Industrial Shift Rosters
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kankinara Paper Mills</span>
              </div>
              <h3 className="text-base font-bold text-white">Standard Shift Work Schedule Synthesizer</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Roster software provides discrete punch-in hour in column B and minute in column C. Assemble into a standard time serial for automated overtime evaluation."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Synthesize hour and minute into decimal fraction serial</div>
                <div className="text-emerald-300 font-bold">{"=TIME(B2, C2, 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"0.354167 (Displays as 08:30 AM)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Call Center Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Sector V BPO Complex, Salt Lake</span>
              </div>
              <h3 className="text-base font-bold text-white">Agent Grace Period Late Arrival Detector</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Agents receive an 8-minute grace window past the 9:00 AM shift start before being marked late. Calculate whether punch-in time in D2 breached grace limit."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Construct 09:08:00 cutoff dynamically using TIME</div>
                <div className="text-emerald-300 font-bold">{"=IF(MOD(D2, 1) > TIME(9, 8, 0), \"LATE ARRIVAL\", \"ON TIME\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"LATE ARRIVAL\" (for check-in at 09:11 AM)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Logistics & Fleet Transport
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Express Cargo</span>
              </div>
              <h3 className="text-base font-bold text-white">Highway Toll Gate Night Tariff Applicator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Commercial trucks crossing toll plazas between 22:00:00 (10:00 PM) and 05:00:00 (05:00 AM) are billed off-peak freight rates based on timestamp in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Use OR with TIME boundaries to identify overnight window</div>
                <div className="text-emerald-300 font-bold">{"=IF(OR(MOD(E2, 1) >= TIME(22, 0, 0), MOD(E2, 1) < TIME(5, 0, 0)), \"NIGHT TARIFF\", \"DAY TARIFF\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"NIGHT TARIFF\" (for vehicle crossing at 23:45)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Hospital Emergency Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati State General Hospital</span>
              </div>
              <h3 className="text-base font-bold text-white">ICU Patient Hourly Vitals Reminder</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Nurses record vital signs at fixed 2-hour increments starting from patient admission timestamp in F2. Project next scheduled vitals check time."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 2 hours to time serial cleanly</div>
                <div className="text-emerald-300 font-bold">{"=F2 + TIME(2, 0, 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"12-Nov-2026 16:30:00 (from 14:30:00 admission)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Manufacturing Assembly Line
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Gun & Shell Factory</span>
              </div>
              <h3 className="text-base font-bold text-white">Batch Cycle Duration Increment Modeling</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"An automated CNC lathe cycle requires exactly 45 minutes and 30 seconds per component. Add cycle time to batch start timestamp in G2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Inject minutes and seconds into TIME constructor</div>
                <div className="text-emerald-300 font-bold">{"=G2 + TIME(0, 45, 30)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"09:45:30 AM (from 09:00:00 AM start)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Software DevOps & Cloud SLA
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Rajarhat IT Campus</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated Maintenance Downtime Window</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Cloud database backup starts at 02:00 AM every Sunday and is permitted a maximum duration of 1 hour and 15 minutes. Establish the hard recovery deadline."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Construct maintenance window ceiling</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(H2), MONTH(H2), DAY(H2)) + TIME(3, 15, 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"15-Nov-2026 03:15:00 AM"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand the 86,400-Second Day</span>
              <p>{"1 second in Excel equals 1 / 86400 = 0.000011574. 1 minute equals 1 / 1440 = 0.0006944. 1 hour equals 1 / 24 = 0.0416667."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"TIME(1, 0, 0) = 1/24 = 0.041667"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Assemble Integer Elements</span>
              <p>{"Pass three integers to TIME(H, M, S). Negative numbers or decimals are automatically coerced or rolled."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=TIME(14, 30, 0) -> Returns 0.604167"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Combine with Calendar Dates</span>
              <p>{"To create a complete date-time timestamp, add the DATE() and TIME() formulas together."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(2026, 11, 12) + TIME(14, 30, 0)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format Cell Appropriately</span>
              <p>{"Format the cell with custom format 'hh:mm:ss AM/PM' for 12-hour or 'hh:mm:ss' for 24-hour military display."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format Cells > Time > Choose preferred display"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Lost Elapsed Days on > 24 Hours"}</td>
                  <td className="py-3 px-4 font-sans">{"Using TIME() to accumulate multi-day elapsed hours causes modulo-24 truncation."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIME(36, 0, 0) returns 12:00:00 PM instead of 36 hours"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use =(Hours/24) directly and apply custom format [h]:mm:ss."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Passing numbers greater than 32,767 or extremely large negative integers."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIME(35000, 0, 0)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Constrain hours to valid ranges or use standard decimal arithmetic."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Passing text strings like '12' or 'PM' instead of numeric integers."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIME(8, '30', 'AM')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure all three arguments are numeric integers."}</td>
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
              <span className="text-indigo-400 font-bold">Night Shift Midnight Inversion</span>
              <p className="text-slate-300">{"When subtracting shift times that cross midnight (e.g. 10:00 PM to 06:00 AM), use: =MOD(EndTime - StartTime, 1). This eliminates negative time errors!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Custom Cumulative Hour Formatting</span>
              <p className="text-slate-300">{"To show cumulative hours past 24 (e.g. 48:00), apply custom number format [h]:mm:ss. The brackets prevent rollover to 0."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Direct Decimal Equivalents</span>
              <p className="text-slate-300">{"Adding 15 minutes is simply =A1 + (15/1440) or =A1 + TIME(0, 15, 0). Direct division is faster in 100k-row formulas."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Rounding Time to Nearest 15 Mins</span>
              <p className="text-slate-300">{"Round clock punches to nearest 15-minute billing block using: =MROUND(A1, TIME(0, 15, 0))."}</p>
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
              • <strong>Mathematical Design:</strong> {"Why did Microsoft design TIME() to perform modulo-24 arithmetic rather than returning multi-day integer serials?"}
            </p>

            <p key="1">
              • <strong>Precision Limits:</strong> {"Due to IEEE 754 floating-point limitations, why does =TIME(0,1,0)*1440 sometimes yield 0.999999999999999 instead of exactly 1.0?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 3: TIME Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="TIME Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Time in Excel is just a fraction of a 24-hour day. Never forget: 1 hour is 1/24, 1 minute is 1/1440, and 1 second is 1/86400. For shifts crossing midnight, always use =MOD(End - Start, 1) — it is the single most useful trick in corporate payroll engineering."}
          />
        </div>
      </div>
    </div>
  );
}
