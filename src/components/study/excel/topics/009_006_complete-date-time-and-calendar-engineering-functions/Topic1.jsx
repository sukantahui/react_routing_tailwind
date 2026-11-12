"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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

  const [inpYear, setInpYear] = useState(2026);
  const [inpMonth, setInpMonth] = useState(11);
  const [inpDay, setInpDay] = useState(12);

  const evaluatedDate = useMemo(() => {
    const y = parseInt(inpYear, 10);
    const m = parseInt(inpMonth, 10);
    const d = parseInt(inpDay, 10);

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return { error: "#VALUE! Invalid integer parameter", isError: true };
    }
    if (y < 1 || y > 9999) {
      return { error: "#NUM! Year must be between 1 and 9999", isError: true };
    }

    // Exact JavaScript implementation matching Excel DATE(y, m, d) overflow logic
    // In JS Date, months are 0-indexed, so m - 1
    const dt = new Date(y, m - 1, d);

    // Format output
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outStr = `${String(dt.getDate()).padStart(2, "0")}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`;
    const isLeap = (dt.getFullYear() % 4 === 0 && dt.getFullYear() % 100 !== 0) || (dt.getFullYear() % 400 === 0);

    // Calculate approximate Excel serial
    const baseUtc = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const excelEpoch = Date.UTC(1899, 11, 30); // 1899-12-30 takes care of 1900 leap bug
    const serialNum = Math.round((baseUtc - excelEpoch) / 86400000);

    const hasRolled = dt.getFullYear() !== y || dt.getMonth() !== (m - 1) || dt.getDate() !== d;

    return {
      isError: false,
      dateString: outStr,
      serialNum,
      isLeap,
      hasRolled,
      dayOfWeek: dt.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpYear, inpMonth, inpDay]);

  const applyPreset = (preset) => {
    if (preset === "tax_close") {
      setInpYear(2027);
      setInpMonth(3);
      setInpDay(31);
    } else if (preset === "leap_valid") {
      setInpYear(2024);
      setInpMonth(2);
      setInpDay(29);
    } else if (preset === "month_overflow") {
      setInpYear(2026);
      setInpMonth(14);
      setInpDay(1);
    } else if (preset === "day_zero") {
      setInpYear(2026);
      setInpMonth(3);
      setInpDay(0);
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
              ⚡ Date & Calendar Engineering · Topic 1
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Constructor · Deterministic Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Construct
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DATE Function — Robust Component Assembly & Overflow Math
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">DATE(year, month, day)</code> function is the foundation of defensive calendar engineering in Microsoft Excel. It accepts three discrete integer inputs and compiles them into an unambiguous, locale-agnostic 64-bit date serial number.</p><p>Unlike brittle text concatenation (<code className="text-rose-300 font-mono">="12/11/2026"</code>) which disastrously flips between <em>DD/MM/YYYY</em> and <em>MM/DD/YYYY</em> depending on whether the workbook is opened in the United Kingdom, India, or the United States, <code className="text-indigo-300 font-mono">DATE()</code> is 100% immune to regional Windows configuration variances. Furthermore, it incorporates an intelligent mathematical overflow and underflow engine, making rolling calendar offsets trivial.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=DATE(year, month, day)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Cross-Border ERP, Tax & Fiscal Calendar Engineering</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =DATE(YEAR(A2)+1, 3, 31) (Indian Fiscal Closing)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive DATE(Year, Month, Day) Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Experiment with discrete year, month, and day inputs. Observe automatic overflow handling and serial conversions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("tax_close")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            FY Tax End (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_valid")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Leap Day (29-Feb)
          </button>
          <button
            onClick={() => applyPreset("month_overflow")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Month Overflow (+14)
          </button>
          <button
            onClick={() => applyPreset("day_zero")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Day Zero Rollover
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Year (1-9999)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpYear}
            onChange={(e) => setInpYear(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Month (Can Overflow)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpMonth}
            onChange={(e) => setInpMonth(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Day (Can Overflow)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpDay}
            onChange={(e) => setInpDay(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DATE({inpYear}, {inpMonth}, {inpDay})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                evaluatedDate.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {evaluatedDate.isError ? evaluatedDate.error : evaluatedDate.dateString}
            </span>
          </div>
        </div>

        {!evaluatedDate.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Numeric Serial:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {evaluatedDate.serialNum.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {evaluatedDate.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Rollover Detected:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  evaluatedDate.hasRolled ? "text-amber-400" : "text-slate-300"
                }`}
              >
                {evaluatedDate.hasRolled ? "⚠️ Yes (Input Rolled Over)" : "✓ Direct Mapping"}
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
              Locale-Safe Serial Synthesizer
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DATE Formula Signature</div>
            <div className="text-white font-bold text-base">
              =DATE(year, month, day)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">year:</strong> Required. An integer from 1 to 9999. Four-digit years (e.g. 2026) are strongly recommended. Two-digit numbers (0-29 map to 2000-2029; 30-99 map to 1930-1999).</div><div>• <strong className="text-sky-300">month:</strong> Required. A positive or negative integer representing the month of the year from 1 to 12. Values greater than 12 roll forward into subsequent years; values less than 1 roll backward into prior years.</div><div>• <strong className="text-amber-300">day:</strong> Required. A positive or negative integer representing the day of the month from 1 to 31. Values exceeding month length roll forward into next months; passing 0 rolls back to the final day of the preceding month.</div>
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
              <span className="text-emerald-400">📊</span> DATE Function Overflow & Underflow Behavior Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore how Excel gracefully normalizes out-of-range month and day arguments without throwing errors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Formula Expression</th>
                  <th className="py-3 px-4">Intended Math</th>
                  <th className="py-3 px-4">Evaluated Date</th>
                  <th className="py-3 px-4">Underlying Serial</th>
                  <th className="py-3 px-4">Operational Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 14, 1)</td>
        <td className="py-3.5 px-4 text-white">Year 2026 + 14 Months</td>
        <td className="py-3.5 px-4 text-emerald-300">01-Feb-2027</td>
        <td className="py-3.5 px-4 text-slate-300">46419</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Multi-month project delay forward modeling</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 3, 0)</td>
        <td className="py-3.5 px-4 text-white">Day 0 of March 2026</td>
        <td className="py-3.5 px-4 text-emerald-300">28-Feb-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46081</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Dynamic last day of February calculation</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2024, 2, 29)</td>
        <td className="py-3.5 px-4 text-white">Leap Year Leap Day</td>
        <td className="py-3.5 px-4 text-emerald-300">29-Feb-2024</td>
        <td className="py-3.5 px-4 text-slate-300">45351</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap year quadrennial anniversary checks</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2025, 2, 29)</td>
        <td className="py-3.5 px-4 text-white">Common Year Overflow</td>
        <td className="py-3.5 px-4 text-amber-300">01-Mar-2025</td>
        <td className="py-3.5 px-4 text-slate-300">45717</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Automatic boundary rollover on non-leap years</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 0, 15)</td>
        <td className="py-3.5 px-4 text-white">Month 0 (Rollback)</td>
        <td className="py-3.5 px-4 text-emerald-300">15-Dec-2025</td>
        <td className="py-3.5 px-4 text-slate-300">46006</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Backward fiscal calendar quarter modeling</td>
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
                Defensive Date Construction vs String Ambiguity
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                The catastrophic consequences of text date strings in multinational enterprise sheets.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>In corporate environments where financial workbooks circulate globally between India, the United Kingdom, Singapore, and the United States, text-based date formatting is the #1 cause of silent financial miscalculations.</p><p>When an analyst writes <code className="text-white font-mono">="05/06/2026"</code>, Excel in London or Kolkata parses it as <strong>5th June 2026</strong>. When the exact same file is opened by an executive in New York, Excel parses it as <strong>May 6th 2026</strong>! By constructing dates using <code className="text-indigo-300 font-mono">=DATE(2026, 6, 5)</code>, the numeric serial (46178) is permanently fixed, rendering the formula 100% immune to regional corruption.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle String Concatenation Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=A2 & \"/\" & B2 & \"/\" & C2"}
                </div>
                <p className="text-xs text-slate-400">
                  Produces a text string that fails in mathematical operations, breaks sorting, and reverses month/day when shared internationally.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Enterprise Deterministic DATE() Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=DATE(C2, B2, A2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Assembles integer year, month, and day into an inviolable numeric serial that formats seamlessly under all international Windows locales.
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
            Pipeline of discrete component integers transformed into the unified Excel numeric serial.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Year: 2026</text>

        <rect x="30" y="80" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Month: 11</text>

        <rect x="30" y="130" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="155" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Day: 12</text>

        <path d="M 195 50 L 320 100 M 195 100 L 320 100 M 195 150 L 320 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="320" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=DATE(Y, M, D) Engine</text>
        <text x="440" y="105" textAnchor="middle" fill="#94A3B8" className="text-xs">Gregorian Leap Validation</text>
        <text x="440" y="125" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">Overflow / Underflow Roll</text>

        <path d="M 560 100 L 630 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Numeric Serial</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="720" y="130" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">12-Nov-2026</text>
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
                Explore real DATE formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic1"
            title="Topic 1: DATE Master Practice Grid"
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
                  Scenario 1: Corporate Taxation & Statutory Audit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT & Auditing Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Indian Fiscal Year Closing Date Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Indian corporate financial years run from April 1 to March 31. For any arbitrary transaction date in cell A2, generate the exact statutory audit cut-off date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// If month is April (4) or later, fiscal year closes March 31 of next calendar year</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(A2) + IF(MONTH(A2) >= 4, 1, 0), 3, 31)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Mar-2027 (for transaction dated 15-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Human Resources & Payroll
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Industrial Zone</span>
              </div>
              <h3 className="text-base font-bold text-white">Projected Birthday Anniversary This Calendar Year</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"HR requires sending automatic birthday greetings and milestone awards. Given an employee's Date of Birth in cell B2, calculate their anniversary date in the current calendar year."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Extract birth month and day, inject into current calendar year</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"24-Aug-2026 (for an employee born on 24-Aug-1992)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Banking & Loan Amortization
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Banking Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Quarterly Fixed Deposit Interest Payout Milestone</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A commercial fixed deposit begins on deposit date in C2. Generate the exact milestone date for the end of the 2nd quarter without requiring Analysis ToolPak add-ins."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 6 full months to month component; DATE handles year rollover seamlessly</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(C2), MONTH(C2) + 6, DAY(C2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"15-Oct-2027 (from initial deposit on 15-Apr-2027)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Manufacturing ERP & Supply Chain
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Ordnance & Heavy Engineering</span>
              </div>
              <h3 className="text-base font-bold text-white">Bill of Materials Batch Expiry Date Engineering</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Raw chemical reagents expire exactly on the final calendar day of the 18th month following production date in cell D2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Use month offset + 19 with day 0 to find the last day of month 18</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(D2), MONTH(D2) + 19, 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Dec-2027 (for production batch manufactured in May 2026)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Retail Inventory & Supply Chain
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Central Logistics Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Beginning-of-Month Consolidation Date</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Consolidate daily transactional ledger records into monthly summary buckets starting on the 1st of the month for invoice timestamp in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Force day parameter to 1 for uniform monthly grouping</div>
                <div className="text-emerald-300 font-bold">{"=DATE(YEAR(E2), MONTH(E2), 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"01-Nov-2026 (for invoice dated 18-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Government Treasury & Bond Market
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Municipal Treasury</span>
              </div>
              <h3 className="text-base font-bold text-white">Semi-Annual Coupon Payment Anchor</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Municipal infrastructure bonds pay semi-annual coupons on June 30 and December 31. Return the upcoming coupon payment date based on settlement date in F2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Check whether settlement date is in the first half or second half of the year</div>
                <div className="text-emerald-300 font-bold">{"=IF(MONTH(F2) <= 6, DATE(YEAR(F2), 6, 30), DATE(YEAR(F2), 12, 31))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"31-Dec-2026 (for bond settled on 14-Aug-2026)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Extract Component Integers</span>
              <p>{"Deconstruct source date or discrete year/month/day columns from upstream legacy systems."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Year: =YEAR(A2), Month: =MONTH(A2), Day: =DAY(A2)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Apply Mathematical Offsets</span>
              <p>{"Add or subtract integer intervals directly inside the parameter slots. Do not worry about month overflow."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(YEAR(A2), MONTH(A2) + 6, DAY(A2))"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Leverage Day Zero for Prior Month Clamping</span>
              <p>{"Passing 0 to the day argument tells Excel to roll back exactly 1 day from the 1st of the month, landing on the last day of the previous month."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(2026, 3, 0) -> Returns 28-Feb-2026"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format as Locale-Agnostic Display</span>
              <p>{"Once constructed, format the cell using custom number format 'YYYY-MM-DD' or 'DD-MMM-YYYY' to prevent visual ambiguity."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format Cells > Custom > 'yyyy-mm-dd'"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Year parameter is less than 0 or greater than 9999, which exceeds Excel's Gregorian calculation boundary."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATE(-5, 1, 1) or =DATE(10000, 1, 1)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Validate year input with IF(AND(Y>=1, Y<=9999), DATE(Y,M,D), 'Invalid Year')."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"One of the arguments contains text or non-numeric characters that cannot be coerced to an integer."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATE('2026', 'Nov', 12)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure month is passed as an integer (11 for November) or use DATEVALUE for text dates."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Two-Digit Year 1926 vs 2026 Confusion"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel maps years 00 to 29 to 2000-2029, and years 30 to 99 to 1930-1999."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATE(26, 1, 1) -> 2026, but =DATE(35, 1, 1) -> 1935!"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Always supply explicit 4-digit years in formula constructions."}</td>
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
              <span className="text-indigo-400 font-bold">The EOMONTH Alternative Trick</span>
              <p className="text-slate-300">{"Need the last day of the current month without loading add-ins? Use =DATE(YEAR(A1), MONTH(A1)+1, 0). It is 100% equivalent to =EOMONTH(A1, 0)."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Handling February 29 Anniversaries</span>
              <p className="text-slate-300">{"For employees born on Feb 29, =DATE(2025, 2, 29) evaluates to March 1 on common years. This is the legal convention in most commonwealth jurisdictions."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Dynamic Quarter Constructor</span>
              <p className="text-slate-300">{"Construct the first day of the current calendar quarter using: =DATE(YEAR(A1), INT((MONTH(A1)-1)/3)*3 + 1, 1)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Avoid String Concatenation</span>
              <p className="text-slate-300">{"Never assemble dates using =A1&'/'&B1&'/'&C1. This produces brittle text strings that fail in sorting and pivot tables."}</p>
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
              • <strong>Calendar Architecture:</strong> {"Why does passing Month = 0 in =DATE(2026, 0, 15) return December 15, 2025 instead of throwing a parameter error?"}
            </p>

            <p key="1">
              • <strong>Regulatory Compliance:</strong> {"Why is =DATE(YEAR(A2), MONTH(A2), DAY(A2)) preferred by financial auditors over raw date literals when building automated financial models?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 1: DATE Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DATE Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"The DATE function is your shield against global date corruption. In my 20+ years training enterprise accountants and systems engineers, 80% of date errors stem from text concatenation. Memorize the Day 0 trick (=DATE(Y, M+1, 0)) for month-ends, and always pass four-digit years."}
          />
        </div>
      </div>
    </div>
  );
}
