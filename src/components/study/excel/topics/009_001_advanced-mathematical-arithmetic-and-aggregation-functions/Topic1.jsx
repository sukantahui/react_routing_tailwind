"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
  const sectionsRef = useRef([]);

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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "009_001_advanced_mathematical_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🛡️ Advanced Aggregation Engine · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Error-Bypassing Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Taxonomy Level 5: Evaluate
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent leading-snug">
            AGGREGATE Function — Error-Aware Aggregation & Hidden-Row Control
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In corporate financial reporting and data engineering, broken inputs like <code className="text-rose-400 font-mono">#DIV/0!</code> or <code className="text-amber-400 font-mono">#N/A</code> will crash standard functions like <code className="text-slate-400 font-mono">SUM</code> or <code className="text-slate-400 font-mono">AVERAGE</code>. The <code className="text-emerald-300 font-mono">AGGREGATE</code> function solves this by incorporating 19 math algorithms and 8 option codes to seamlessly bypass errors, filtered hidden rows, and nested subtotals.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>19 Functions in 1:</strong> SUM, AVERAGE, LARGE, SMALL, etc.</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Error Immunity:</strong> Bypasses #DIV/0! & #N/A cleanly</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Filtered Rows:</strong> Ignores hidden rows automatically</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">⚡</span> Formula Anatomy: Reference vs Array Syntax
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine Spec: 19 Algorithms × 8 Options
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 space-y-1">
              <div className="text-slate-500">// 1. Reference Form (For Functions 1 to 13, e.g., SUM=9, AVERAGE=1)</div>
              <div className="text-white font-bold">
                =AGGREGATE(<span className="text-sky-300">function_num</span>, <span className="text-amber-300">options</span>, <span className="text-emerald-300">ref1</span>, <span className="text-slate-400">[ref2]</span>)
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-300 space-y-1">
              <div className="text-slate-500">// 2. Array Form (For Functions 14 to 19, e.g., LARGE=14, SMALL=15)</div>
              <div className="text-white font-bold">
                =AGGREGATE(<span className="text-sky-300">function_num</span>, <span className="text-amber-300">options</span>, <span className="text-emerald-300">array</span>, <span className="text-indigo-300">k</span>)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
            <span className="text-amber-400 font-bold">Options Parameter Overview:</span>
            <p className="text-slate-300 leading-relaxed">
              The 2nd argument of <code className="text-emerald-300 font-mono">AGGREGATE</code> is an integer option code from <code className="text-sky-300 font-mono">0 to 7</code>. It dictates exactly how Excel's calculation engine handles hidden rows, error values, and nested summary formulas during range evaluation.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEDICATED AGGREGATE OPTION CODES (0 TO 7) DEEP-DIVE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🛠️</span> AGGREGATE Option Codes (0 to 7) Complete Reference & Selection Guide
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Option Codes 0–7 Master Spec
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The power of <code className="text-emerald-300 font-mono">AGGREGATE</code> lies in its 8 option codes. Selecting the correct option code determines whether hidden filtered rows, formula errors (<code className="text-rose-400 font-mono">#DIV/0!</code>, <code className="text-rose-400 font-mono">#N/A</code>, <code className="text-rose-400 font-mono">#VALUE!</code>), or intermediate <code className="text-slate-400 font-mono">SUBTOTAL</code> / <code className="text-emerald-300 font-mono">AGGREGATE</code> summary rows are included or ignored:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-3">Option Code</th>
                  <th className="pb-3 px-3 text-sky-400">Ignored Elements</th>
                  <th className="pb-3 px-3">Exact Engine Behavior</th>
                  <th className="pb-3 pl-3 text-emerald-400">Best Practical Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 text-amber-400 font-bold">0</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Nested SUBTOTAL & AGGREGATE</td>
                  <td className="py-3 px-3 font-sans text-slate-400">Ignores nested SUBTOTAL and AGGREGATE results. Includes hidden rows and error values.</td>
                  <td className="py-3 pl-3 font-sans text-slate-300">Subtotal suppression in multi-level financial reports.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 text-sky-400 font-bold">1</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Hidden Rows & Nested Subtotals</td>
                  <td className="py-3 px-3 font-sans text-slate-400">Ignores hidden rows AND nested SUBTOTAL/AGGREGATE. Propagates errors if present.</td>
                  <td className="py-3 pl-3 font-sans text-slate-300">Filtered tables without formula errors.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 text-indigo-400 font-bold">2</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Error Values & Nested Subtotals</td>
                  <td className="py-3 px-3 font-sans text-slate-400">Ignores error values AND nested SUBTOTAL/AGGREGATE. Includes hidden rows.</td>
                  <td className="py-3 pl-3 font-sans text-slate-300">Unfiltered tables with intermediate error calculations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 font-semibold bg-emerald-950/20 transition-colors">
                  <td className="py-3 pr-3 text-emerald-400 font-bold">3</td>
                  <td className="py-3 px-3 font-sans text-emerald-300">Hidden Rows, Errors & Nested Subtotals</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Ignores ALL three: hidden rows, error cells, and nested subtotals. Total protection.</td>
                  <td className="py-3 pl-3 font-sans text-emerald-300 font-bold">Executive KPI Dashboards (All-in-one protection).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 text-rose-400 font-bold">4</td>
                  <td className="py-3 px-3 font-sans text-rose-300">Nothing (Ignore Nothing)</td>
                  <td className="py-3 px-3 font-sans text-slate-400">Evaluates every cell as-is. Fails if any cell contains an error or hidden row.</td>
                  <td className="py-3 pl-3 font-sans text-slate-300">Audit models requiring strict error propagation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 text-teal-400 font-bold">5</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Hidden Rows Only</td>
                  <td className="py-3 px-3 font-sans text-slate-400">Ignores hidden rows only. Retains nested subtotals and error values.</td>
                  <td className="py-3 pl-3 font-sans text-slate-300">Filtered data tables where errors should flag audit alerts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 font-semibold bg-sky-950/20 transition-colors">
                  <td className="py-3 pr-3 text-sky-300 font-bold">6</td>
                  <td className="py-3 px-3 font-sans text-sky-200">Error Values Only</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Ignores error values only (#DIV/0!, #N/A, #VALUE!). Retains hidden rows.</td>
                  <td className="py-3 pl-3 font-sans text-sky-200 font-bold">High-risk template workbooks with missing inputs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 font-semibold bg-emerald-950/20 transition-colors">
                  <td className="py-3 pr-3 text-emerald-400 font-bold">7</td>
                  <td className="py-3 px-3 font-sans text-emerald-300">Hidden Rows, Errors & Nested Subtotals</td>
                  <td className="py-3 px-3 font-sans text-slate-300">Identical to Option 3. Bypasses hidden rows, errors, and subtotals.</td>
                  <td className="py-3 pl-3 font-sans text-emerald-300 font-bold">Standard reference form for filtered dashboards.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Option Code 6 (Error Focus)</span>
              <p className="text-slate-300">Use <code className="text-sky-300 font-mono">Option 6</code> when your dataset contains unavoidable division errors, but you must sum or average all rows (both visible and hidden).</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Option Code 7 / 3 (Full Focus)</span>
              <p className="text-slate-300">Use <code className="text-emerald-300 font-mono">Option 7 or 3</code> for executive summary KPI cards where user filters, subtotal rows, and potential calculation errors coexist.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold">Option Code 5 (Filter Focus)</span>
              <p className="text-slate-300">Use <code className="text-teal-300 font-mono">Option 5</code> when users filter data by region or department and hidden rows must be excluded, but error cells must raise alerts.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: AGGREGATE VS SUBTOTAL COMPARISON ARCHITECTURE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">⚖️</span> AGGREGATE vs SUBTOTAL: Architectural Comparison Matrix
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Legacy vs Modern Aggregation Engine
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            While <code className="text-slate-400 font-mono">SUBTOTAL</code> was introduced in early Excel versions to handle filtered tables and prevent double counting of nested subtotal rows, <code className="text-emerald-300 font-mono">AGGREGATE</code> is its modern supercharged successor. Below is a side-by-side technical comparison of their capabilities:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Feature / Capability</th>
                  <th className="pb-3 px-4 text-amber-400 font-mono">SUBTOTAL Function</th>
                  <th className="pb-3 pl-4 text-emerald-400 font-mono">AGGREGATE Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-white font-sans font-bold">Error Values Suppression (#DIV/0!, #N/A)</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">❌ Cannot ignore errors. Fails if any cell contains an error.</td>
                  <td className="py-3 pl-4 text-emerald-400 font-sans">✅ Ignores error values natively (Option Codes 2, 3, 6, 7).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-white font-sans font-bold">Supported Calculation Functions</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">11 Functions (SUM, AVERAGE, COUNT, MAX, MIN, STDEV, VAR...)</td>
                  <td className="py-3 pl-4 text-sky-400 font-sans">19 Functions (+ LARGE, SMALL, MEDIAN, MODE, PERCENTILE, QUARTILE)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-white font-sans font-bold">Inline Array Expression Evaluation</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">❌ Range references ONLY. Fails on array math.</td>
                  <td className="py-3 pl-4 text-emerald-400 font-sans">✅ Evaluates array expressions natively (Functions 14–19).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-white font-sans font-bold">Hidden Row Filtering Syntax</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Dual function codes (1–11 include, 101–111 exclude hidden)</td>
                  <td className="py-3 pl-4 text-sky-400 font-sans">Decoupled 2nd argument option code (0–7 options)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-white font-sans font-bold">Nested Summary Row Immunity</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">✅ Ignores nested SUBTOTAL rows</td>
                  <td className="py-3 pl-4 text-emerald-400 font-sans">✅ Ignores nested SUBTOTAL AND AGGREGATE rows</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
            <span className="text-amber-400 font-bold">Key takeaway for spreadsheet architects:</span>
            <p className="text-slate-300 leading-relaxed">
              Always prefer <code className="text-emerald-300 font-mono">AGGREGATE</code> over <code className="text-slate-400 font-mono">SUBTOTAL</code> in modern Excel models. <code className="text-emerald-300 font-mono">AGGREGATE</code> provides total error immunity and allows advanced ranking (<code className="text-sky-300 font-mono">LARGE</code> / <code className="text-sky-300 font-mono">SMALL</code>) directly over filtered, error-prone data sets.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: DEEP CONCEPTUAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-emerald-400">🔬</span> Conceptual Mechanics: How AGGREGATE Filters Cells
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Unlike legacy functions, AGGREGATE inspects cell metadata before performing calculations. When <code className="text-amber-300 font-mono">Option 6</code> is selected:
            </p>
            <ul className="list-disc list-inside space-y-2 font-mono text-xs sm:text-sm bg-slate-950 p-5 rounded-2xl border border-slate-800 text-slate-200">
              <li>Step 1: Scans reference cells <code className="text-sky-300 font-mono">E3:E27</code>.</li>
              <li>Step 2: Identifies error cells (<code className="text-rose-400 font-mono">#DIV/0!</code> in row 7 and 15).</li>
              <li>Step 3: Excludes error cells from calculation vector without throwing a formula error.</li>
              <li>Step 4: Executes selected math algorithm (e.g. SUM or LARGE).</li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VISUAL ERROR FILTERING PIPELINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">📐</span> Visual Error Filtering Pipeline
          </h2>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 750 240" className="w-full max-w-3xl h-auto font-sans">
              {/* Raw Input Range */}
              <g transform="translate(30, 30)">
                <rect width="160" height="180" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <text x="80" y="26" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">Input Range (E3:E7)</text>
                <rect x="15" y="40" width="130" height="24" rx="6" fill="#1E293B" />
                <text x="80" y="56" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹1,50,000</text>
                <rect x="15" y="68" width="130" height="24" rx="6" fill="#450A0A" stroke="#F87171" strokeWidth="1" />
                <text x="80" y="84" textAnchor="middle" fill="#F87171" className="text-xs font-mono">#DIV/0!</text>
                <rect x="15" y="96" width="130" height="24" rx="6" fill="#1E293B" />
                <text x="80" y="112" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹1,80,000</text>
                <rect x="15" y="124" width="130" height="24" rx="6" fill="#450A0A" stroke="#F87171" strokeWidth="1" />
                <text x="80" y="140" textAnchor="middle" fill="#F87171" className="text-xs font-mono">#N/A</text>
                <rect x="15" y="152" width="130" height="24" rx="6" fill="#1E293B" />
                <text x="80" y="168" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹2,10,000</text>
              </g>

              {/* Arrow to Filter */}
              <path d="M 200 120 L 250 120" stroke="#34D399" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Option 6 Filter Engine */}
              <g transform="translate(260, 50)">
                <rect width="180" height="140" rx="14" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">Option Code 6 Filter</text>
                <text x="90" y="60" textAnchor="middle" fill="#A7F3D0" className="text-xs">Bypasses All Error Cells</text>
                <rect x="25" y="80" width="130" height="36" rx="8" fill="#022C22" />
                <text x="90" y="103" textAnchor="middle" fill="#34D399" className="text-xs font-mono font-bold">Filtered: 3 Clean Rows</text>
              </g>

              {/* Arrow to Output */}
              <path d="M 450 120 L 500 120" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Final Output Card */}
              <g transform="translate(510, 60)">
                <rect width="200" height="120" rx="14" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="2" />
                <text x="100" y="32" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">AGGREGATE(9, 6, E3:E7)</text>
                <text x="100" y="70" textAnchor="middle" fill="#FFFFFF" className="text-lg font-extrabold font-mono">₹5,40,000</text>
                <text x="100" y="95" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">Clean Aggregated Sum</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: LIVE EXCEL FILE LOADER & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Practice Grid & Download Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect how AGGREGATE handles injected errors live in the workbook.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
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
            title="Topic 1: AGGREGATE Error-Aware Calculation Practice"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 8: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">Scenario 1: Robust Summation</span>
              <h3 className="text-base font-bold text-white">Shyamnagar Payroll Variance Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                HR Manager Debangshu Roy has payroll variance calculations in column F containing occasional <code className="text-rose-400 font-mono">#DIV/0!</code> errors.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
                =AGGREGATE(9, 6, F3:F27)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">Scenario 2: Error-Proof Top-K Ranking</span>
              <h3 className="text-base font-bold text-white">Kolkata Regional Top Sales Ranking</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Analyst Priya Sharma needs the 1st highest non-error sales value from column E using LARGE.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
                =AGGREGATE(14, 6, E3:E27, 1)
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
            <span className="text-sky-400">📝</span> Step-by-Step Practical Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Step 1: Select Function Number</span>
              <p>Choose calculation code: 9 for SUM, 1 for AVERAGE, 14 for LARGE, 15 for SMALL.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 2: Select Option Code</span>
              <p>Choose option code 6 to ignore errors, or code 7 to ignore hidden rows and errors.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Provide Target Range or Rank k</span>
              <p>For functions 14–19, supply the k-th rank as the 4th argument: <code className="text-emerald-300 font-mono">=AGGREGATE(14, 6, E3:E27, 1)</code>.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: COMMON PITFALLS & TROUBLESHOOTING
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Error Code</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Prevention / Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">#VALUE!</td>
                  <td className="py-3 px-4 font-sans">Omitted 4th argument k when using LARGE (14) or SMALL (15).</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Always supply k rank value (e.g. 1 for max, 2 for 2nd max).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-400 font-bold">#NUM!</td>
                  <td className="py-3 px-4 font-sans">Supplied rank k larger than the number of valid non-error cells in range.</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Ensure k &lt;= COUNT(non-error cells).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: PRO TIPS & SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">Default Option 6 Rule</span>
              <p className="text-slate-300">Memorize Option Code 6 for fast error suppression in high-risk template workbooks.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Avoid Double-Counting</span>
              <p className="text-slate-300">Use AGGREGATE in section summary rows so master grand total rows can automatically skip them.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: SOCRATIC HINT SECTION
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p>• <strong>Think about:</strong> Why does <code className="text-emerald-300 font-mono">=AGGREGATE(9, 6, range)</code> succeed when <code className="text-rose-400 font-mono">=SUM(range)</code> returns <code className="text-rose-400 font-mono">#DIV/0!</code>?</p>
            <p>• <strong>Observe carefully:</strong> How does Option Code 7 protect executive financial dashboards from double counting nested subtotals?</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 1: AGGREGATE Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="AGGREGATE Error-Aware Calculation"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Remember: In enterprise Excel dashboard design, never rely on standard SUM or MAX over ranges that could contain division errors. Always deploy AGGREGATE with Option Code 6 or 7 to guarantee bulletproof calculations!"}
          />
        </div>
      </div>
    </div>
  );
}
