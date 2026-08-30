"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "dynamic_arrays_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Live Dynamic Ordering · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The SORT Function
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Automated Leaderboards
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Sorting Spilled Arrays Dynamically with SORT (Single Index, Ascending/Descending)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Never manually re-sort spreadsheets again. The <strong className="text-amber-300 font-mono">SORT</strong> function builds non-destructive, self-updating ranked tables in memory. 
            Master ascending (<code className="text-emerald-300 font-mono">1</code>) and descending (<code className="text-sky-300 font-mono">-1</code>) sorting, 
            horizontal column sorting (<code className="text-purple-300 font-mono">[by_col] = TRUE</code>), and pair with <code className="text-amber-300 font-mono">TAKE()</code> to extract live Top-N corporate leaderboards.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Non-Destructive:</strong> Raw audit log remains immutable</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Column Sync:</strong> Rows remain locked in sync</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Zero Redundancy:</strong> Instantaneous recalculation in memory</span>
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
              <span className="text-amber-400">⚡</span> Formula Anatomy: =SORT()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: SORT(array, [sort_index], [sort_order], [by_col])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-amber-300">
            <span className="text-slate-500">// Modern SORT Signature:</span>
            <div className="mt-1 text-white font-bold">
              =SORT(<span className="text-amber-300">array</span>, <span className="text-sky-300">[sort_index]</span>, <span className="text-emerald-400">[sort_order]</span>, <span className="text-purple-300">[by_col]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Typical Industrial Formulas:</span>{" "}
              <code className="text-emerald-400">=SORT(A2:F20, 4, -1)</code> (Top Revenue First) |{" "}
              <code className="text-sky-300">=SORT(UNIQUE(Names))</code> (A to Z Distinct List)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Argument</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Required?</th>
                  <th className="pb-3 pl-4">Description & Evaluation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">array</td>
                  <td className="py-3 px-4 text-slate-400">Range / Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The entire table or array to sort. Pass all columns so records remain aligned.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">[sort_index]</td>
                  <td className="py-3 px-4 text-slate-400">Integer (1-based)</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The 1-based column (or row) number within <code className="text-amber-300">array</code> to sort by.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[sort_order]</td>
                  <td className="py-3 px-4 text-slate-400">Integer (1 or -1)</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    <strong className="text-white">1:</strong> Ascending (A to Z, 0 to 9, oldest to newest).<br />
                    <strong className="text-white">-1:</strong> Descending (Z to A, 9 to 0, newest to oldest).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">[by_col]</td>
                  <td className="py-3 px-4 text-slate-400">Boolean</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: FALSE)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    <strong className="text-white">FALSE / Omitted:</strong> Sorts vertically by rows.<br />
                    <strong className="text-white">TRUE:</strong> Sorts horizontally by columns across the table width.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🔬</span> Conceptual Mechanics: How SORT Preserves Row Integrity
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In legacy Excel, selecting only one column and sorting caused catastrophic data corruption if the user clicked "Continue with the current selection" instead of "Expand the selection", desynchronizing names from sales amounts.
            </p>
            <p>
              Modern Excel's <code className="text-amber-300 font-mono">SORT</code> function eliminates this risk:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Atomic Row Binding:</strong> When you supply a full table range <code className="text-sky-300 font-mono">A2:F20</code>, each row is treated as an indivisible record tuple.</li>
              <li><strong>Key Index Evaluation:</strong> The calculation engine extracts the values at <code className="text-amber-300 font-mono">[sort_index]</code> (e.g. column 4).</li>
              <li><strong>Compiled Introsort:</strong> Excel executes a highly optimized quicksort algorithm on the key vector in memory.</li>
              <li><strong>Spill Projection:</strong> The entire multi-column row records are reordered and spilled down from the origin cell, leaving raw source tables 100% untouched.</li>
            </ol>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-yellow-400">📐</span> Multi-Column Table Sorting Engine
            </h2>
            <span className="text-xs text-yellow-300 bg-yellow-950/80 px-3 py-1 rounded-full border border-yellow-800">
              Dynamic Ranking Model
            </span>
          </div>

          <p className="text-sm text-slate-300">
            See how <code className="text-amber-400 font-mono">=SORT(A2:C6, 3, -1)</code> evaluates column 3 (Sales) and reorders all 3 columns atomically.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern5" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="280" fill="url(#gridPattern5)" rx="16" />

              {/* Raw Table */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="300" height="225" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                <rect x="8" y="8" width="284" height="26" rx="6" fill="#1e293b" />
                <text x="150" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Raw Consultant Sales (Unsorted)</text>

                <rect x="15" y="45" width="270" height="28" rx="4" fill="#1e293b" />
                <text x="25" y="63" fill="#e2e8f0" fontSize="10">Swadeep · Barrackpore · ₹14,20,000</text>

                <rect x="15" y="80" width="270" height="28" rx="4" fill="#1e293b" />
                <text x="25" y="98" fill="#e2e8f0" fontSize="10">Tuhina · Shyamnagar · ₹12,80,000</text>

                <rect x="15" y="115" width="270" height="28" rx="4" fill="#1e293b" />
                <text x="25" y="133" fill="#e2e8f0" fontSize="10">Abhronila · Naihati · ₹13,50,000</text>

                <rect x="15" y="150" width="270" height="28" rx="4" fill="#1e293b" />
                <text x="25" y="168" fill="#e2e8f0" fontSize="10">Susmita · Ichapur · ₹11,90,000</text>

                <rect x="15" y="185" width="270" height="28" rx="4" fill="#1e293b" />
                <text x="25" y="203" fill="#e2e8f0" fontSize="10">Debangshu · Barrackpore · ₹10,80,000</text>
              </g>

              {/* Arrow */}
              <g stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 345 135 L 415 135" />
              </g>

              {/* Sorted Spilled Table */}
              <g transform="translate(430, 25)">
                <rect x="0" y="0" width="300" height="225" rx="10" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" />
                <rect x="8" y="8" width="284" height="26" rx="6" fill="#78350f" />
                <text x="150" y="25" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">=SORT(A2:C6, 3, -1) [Leaderboard]</text>

                <rect x="15" y="45" width="270" height="28" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
                <text x="25" y="63" fill="#ffffff" fontSize="10" fontWeight="bold">#1. Swadeep · ₹14,20,000</text>

                <rect x="15" y="80" width="270" height="28" rx="4" fill="#292524" />
                <text x="25" y="98" fill="#fef08a" fontSize="10">#2. Abhronila · ₹13,50,000 (Promoted)</text>

                <rect x="15" y="115" width="270" height="28" rx="4" fill="#292524" />
                <text x="25" y="133" fill="#e2e8f0" fontSize="10">#3. Tuhina · ₹12,80,000</text>

                <rect x="15" y="150" width="270" height="28" rx="4" fill="#292524" />
                <text x="25" y="168" fill="#e2e8f0" fontSize="10">#4. Susmita · ₹11,90,000</text>

                <rect x="15" y="185" width="270" height="28" rx="4" fill="#292524" />
                <text x="25" y="203" fill="#e2e8f0" fontSize="10">#5. Debangshu · ₹10,80,000</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: SORT Leaderboard Grid
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the consultant performance dataset below or download the practice workbook to test dynamic sorting in desktop Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download dynamic_arrays_master.xlsx practice file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="Topic4_Sort_Dynamics"
              title="Quarterly Consultant Performance & Revenue Log"
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Applications of SORT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-base">Case 1: Live Revenue Leaderboard</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Barrackpore Management</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> builds a live leaderboard ranking consultants by Quarter Sales descending. In cell <code className="text-amber-300 font-mono">H2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =SORT(A2:F11, 4, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Ranks all 10 consultants from highest (₹14,20,000) to lowest automatically.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Top 3 Gold Club Performers</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Executive</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> extracts strictly the Top 3 consultants for an awards ceremony:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =TAKE(SORT(A2:F11, 4, -1), 3)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills the top 3 rows (Swadeep, Abhronila, Priya) in one step.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Customer Rating Audit (Lowest First)</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Quality Control</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> audits consultants who need training, sorting by Customer Rating ascending (<code className="text-sky-300 font-mono">1</code>):
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =SORT(A2:F11, 5, 1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Places consultants with lowest ratings (4.4, 4.5) at the top of the review list.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Interactive Order Toggle Dropdown</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Analytics</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> places a toggle in cell <code className="text-amber-300 font-mono">J1</code> ("Highest First" / "Lowest First"):
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORT(A2:F11, 4, IF(J1="Highest First", -1, 1))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> User clicks dropdown to dynamically invert the entire leaderboard ranking!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📋</span> 3-Step Procedure for Dynamic Ranking Tables
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-amber-950 text-amber-400 font-bold flex items-center justify-center border border-amber-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Pass the Full Multi-Column Range</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Always pass all columns (<code className="text-amber-300 font-mono">A2:F11</code>) so consultant names, branch locations, and ratings stay synchronized with their sales figures.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Specify Sort Index and Direction</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Use <code className="text-sky-300 font-mono">4</code> for Quarter Sales and <code className="text-emerald-400 font-mono">-1</code> for descending order (e.g. <code className="text-emerald-400 font-mono">=SORT(A2:F11, 4, -1)</code>).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Generate Rank Numbers with SEQUENCE</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  In a neighboring column, write <code className="text-indigo-300 font-mono">=SEQUENCE(ROWS(H2#))</code> to spill dynamic rank numbers (1, 2, 3...) that adapt automatically!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common SORT Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Troubleshooting Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Error</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#VALUE! Error</td>
                  <td className="py-3.5 px-4 text-slate-300">The specified <code className="text-slate-400">[sort_index]</code> exceeds the number of columns in the source table.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure the column index is between 1 and the total column count of the array.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Error</td>
                  <td className="py-3.5 px-4 text-slate-300">Cells in the destination grid are blocked by existing values or merged cells.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Click the warning icon → 'Select Obstructing Cell' → Delete the blockage.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Rows Misaligned After Sorting</td>
                  <td className="py-3.5 px-4 text-slate-300">Only 1 column was passed to SORT instead of the entire table range.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Pass the full range <code className="text-sky-300 font-mono">A2:F11</code> so all columns sort together atomically.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Blank Rows Placed at Top</td>
                  <td className="py-3.5 px-4 text-slate-300">Sorting descending on empty cells places blanks at the end, but ascending may order 0s first.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Filter blanks first: <code className="text-sky-300 font-mono">=SORT(FILTER(A2:F20, A2:A20&lt;&gt;""), 4, -1)</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & KEYBOARD SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & High-Speed Leaderboards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">CHOOSECOLS</span>
                <span>Extract Top 3 Names Only</span>
              </div>
              <p className="text-slate-300">
                To extract only the consultant names of the Top 3 performers: <code className="text-emerald-400 font-mono">=CHOOSECOLS(TAKE(SORT(A2:F11, 4, -1), 3), 2)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">A2#</span>
                <span>Dynamic Chart Linking</span>
              </div>
              <p className="text-slate-300">
                Bind executive chart series directly to <code className="text-emerald-400 font-mono">H2#</code> via Named Ranges so bar charts dynamically rearrange in ranked order!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-teal-500">
              <h3 className="font-bold text-teal-300 text-sm">Think About Why SORT() is Non-Destructive</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Why is formula-based sorting superior to the ribbon 'Sort A to Z' button for accounting audit compliance? Think about what happens when tax auditors need to verify original transaction voucher sequences in Barrackpore.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How TAKE() Interacts with SORT()</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that <code className="text-emerald-400 font-mono">=TAKE(SORT(Data, 4, -1), 5)</code> calculates the Top 5 in memory without requiring 5 separate nested MAX/LARGE equations.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The SORT Function & Dynamic Ordering FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Always leave your raw transactional register in chronological voucher order! Use =SORT(A2:F100, 4, -1) on dedicated MIS and Dashboard sheets to drive live corporate leaderboards across your Barrackpore, Shyamnagar, and Kolkata operations. It ensures 100% audit integrity with zero manual re-sorting!"
            }
          />
        </div>
      </div>
    </div>
  );
}
