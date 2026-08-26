"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🔄 Stream Wrapping Engine · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Reconstruct
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Reshaping 1D Data Streams into Structured 2D Tables with WRAPROWS
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Unformatted text log exports from banking gateways, POS terminals, and web APIs often output continuous 
            1D vertical streams where each record spans across multiple consecutive lines. 
            The <code className="text-cyan-300 font-mono font-bold">WRAPROWS</code> function reconstructs these flat 1D streams 
            into structured multi-column 2D relational tables in RAM—wrapping elements row-by-row up to a specified column count with zero VBA loops.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Stream Reconstruction:</strong> 1D Vector &rarr; 2D Rectangular Table</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Bank Log Parsing:</strong> Instant ETL for repeating transaction lines</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Safe Padding:</strong> Clean fallback value for incomplete final rows</span>
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
              <span className="text-cyan-400">⚡</span> Formula Anatomy: =WRAPROWS()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: 2D Dynamic Spilled Matrix (Row-wise)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-cyan-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =WRAPROWS(<span className="text-amber-300">vector</span>, <span className="text-emerald-300">wrap_count</span>, <span className="text-slate-400">[pad_with]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Wrap 20-item stream into 4-column rows):</span>{" "}
              <span className="text-emerald-400 font-bold">=WRAPROWS(A2:A21, 4, "NO_DATA")</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Stream Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">vector</td>
                  <td className="py-3 px-4 text-slate-300">1D Range / Array</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 1D column or row vector of continuous data to wrap. (2D arrays return <code className="text-rose-400 font-mono">#VALUE!</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">wrap_count</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The maximum number of items in each row before wrapping to the next line (&ge; 1).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">[pad_with]</td>
                  <td className="py-3 px-4 text-slate-300">Any Constant</td>
                  <td className="py-3 px-4 text-slate-400">Optional (#N/A)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The fallback value for unfilled cells in the final row. Defaults to <code className="text-rose-400 font-mono">#N/A</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Conceptual & Stream Shaping Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Row-Major Stream Slicing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-cyan-400">1.</span> Mathematical Output Sizing
              </h3>
              <p className="leading-relaxed">
                For a vector of length <code className="text-amber-300 font-mono">L</code> and wrap count <code className="text-emerald-300 font-mono">K</code>, 
                the resulting matrix dimensions are:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                Height = CEILING(L / K, 1) &nbsp;|&nbsp; Width = K
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For 21 items with wrap_count=4: <code className="text-emerald-300 font-mono">CEILING(21/4) = 6 rows x 4 columns</code>. The 6th row contains 1 item and 3 padded cells.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> WRAPROWS vs. WRAPCOLS
              </h3>
              <p className="leading-relaxed">
                <code className="text-cyan-300 font-mono">WRAPROWS</code> builds tables row-wise (filling Row 1 across columns before starting Row 2). 
                <code className="text-blue-300 font-mono">WRAPCOLS</code> builds tables column-wise (filling Column 1 down rows before starting Column 2).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                WRAPROWS &rarr; Left-to-Right | WRAPCOLS &rarr; Top-to-Bottom
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Chaining with TEXTSPLIT & TOCOL
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When ingesting raw CSV text or unformatted multi-block schedules:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                =WRAPROWS(TOCOL(WeeklyScheduleMatrix, 1), 4, "Available")
              </code>
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-cyan-400">📐</span> Visual Stream Unrolling Architecture
            </h2>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800">
              Interactive 1D &rarr; 2D Stream Wrapping
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how WRAPROWS transforms a continuous 1D banking text stream into a structured 4-column relational table:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#06B6D4" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#6366F1" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* 1D Stream (Left) */}
              <rect x="30" y="30" width="220" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="30" width="220" height="34" rx="14" fill="#0891B2" fillOpacity="0.3" />
              <text x="140" y="52" fill="#67E8F9" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1D RAW BANK LOG (20 ITEMS)</text>

              {/* Items */}
              <g transform="translate(45, 75)">
                <rect width="190" height="22" rx="4" fill="#164E63" stroke="#06B6D4" />
                <text x="95" y="15" fill="#A5F3FC" fontSize="9" textAnchor="middle" fontFamily="monospace">TXN-101 (Txn ID)</text>

                <rect y="26" width="190" height="22" rx="4" fill="#164E63" stroke="#06B6D4" />
                <text x="95" y="41" fill="#A5F3FC" fontSize="9" textAnchor="middle" fontFamily="monospace">2024-08-01 (Date)</text>

                <rect y="52" width="190" height="22" rx="4" fill="#164E63" stroke="#06B6D4" />
                <text x="95" y="67" fill="#A5F3FC" fontSize="9" textAnchor="middle" fontFamily="monospace">Swadeep Banerjee (Name)</text>

                <rect y="78" width="190" height="22" rx="4" fill="#164E63" stroke="#06B6D4" />
                <text x="95" y="93" fill="#A5F3FC" fontSize="9" textAnchor="middle" fontFamily="monospace">₹45,000 (Amount)</text>

                <rect y="104" width="190" height="22" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="95" y="119" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">TXN-102 (Next Txn ID)...</text>
              </g>

              <rect x="45" y="225" width="190" height="65" rx="8" fill="#06B6D4" fillOpacity="0.12" stroke="#06B6D4" strokeDasharray="3 3" />
              <text x="140" y="245" fill="#67E8F9" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Flat 1D Continuous Stream</text>
              <text x="140" y="263" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Periodicity: 4 lines/record</text>
              <text x="140" y="279" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Total: 20 lines (5 records)</text>

              {/* Arrow */}
              <path d="M 270 170 L 340 170" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="345,170 335,165 335,175" fill="#22D3EE" />

              {/* Center Engine */}
              <rect x="350" y="60" width="220" height="220" rx="14" fill="#0F172A" stroke="#0891B2" strokeWidth="2" />
              <rect x="350" y="60" width="220" height="34" rx="14" fill="#0E7490" fillOpacity="0.4" />
              <text x="460" y="82" fill="#CFFAFE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">WRAPROWS ENGINE</text>

              <g transform="translate(360, 105)">
                <rect width="200" height="36" rx="6" fill="#164E63" stroke="#06B6D4" />
                <text x="100" y="22" fill="#E0F2FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=WRAPROWS(A2:A21, 4, "")</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Wrapping Action:</text>
              <text x="460" y="185" fill="#A5F3FC" fontSize="9.5" textAnchor="middle" fontFamily="monospace">wrap_count = 4 items / row</text>
              <text x="460" y="203" fill="#A5F3FC" fontSize="9.5" textAnchor="middle" fontFamily="monospace">20 items / 4 = 5 rows exact</text>
              <text x="460" y="225" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 5 Structured Records Formed</text>
              <text x="460" y="250" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Zero helper arithmetic formulas</text>

              {/* Arrow */}
              <path d="M 585 170 L 645 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,170 640,165 640,175" fill="#10B981" />

              {/* Spilled 2D Matrix (Right) */}
              <rect x="655" y="40" width="170" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="40" width="170" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2D TABLE (5x4)</text>

              <g transform="translate(665, 85)">
                <rect width="150" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="15" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">TXN-101 | Swadeep | 45k</text>

                <rect y="28" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="43" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">TXN-102 | Tuhina | 38k</text>

                <rect y="56" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="71" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">TXN-103 | Abhronila | 52k</text>

                <rect y="84" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="99" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">TXN-104 | Susmita | 61k</text>
              </g>

              <rect x="665" y="210" width="150" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="235" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: C2#</text>
              <text x="740" y="255" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">5 Rows x 4 Columns</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the flat banking transaction stream below or download the master workbook to test <code className="text-cyan-300 font-mono">WRAPROWS</code> in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic8_WRAPROWS"
            title="Raw Banking Transaction Stream (20-Line Repeating Log)"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Case 1 · Bank Statement ETL</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Branch</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Parsing 20-Line Continuous Banking Logs
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> ingests banking log streams where each transaction occupies 4 vertical lines: [Txn_ID, Date, Customer_Name, Amount]. 
                Using <code className="text-amber-300 font-mono">=WRAPROWS(A2:A21, 4, "NO_DATA")</code>, 
                Swadeep converts the flat list into a 5-row x 4-column relational accounting ledger in 1 millisecond.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                Formula: =WRAPROWS(A2:A21, 4, "NO_DATA") &rarr; 5-Record Structured Ledger
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Dynamic Calendar Generation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Training Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Building 7-Day Weekly Training Calendars
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Academic Lead <strong>Tuhina Mukherjee</strong> generates training schedules. 
                Using <code className="text-amber-300 font-mono">=WRAPROWS(SEQUENCE(31), 7, "")</code>, 
                she shapes a 31-day numeric sequence into a 5-week x 7-day calendar matrix, automatically padding the incomplete 5th week with blanks.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =WRAPROWS(SEQUENCE(31), 7, "") &rarr; 5x7 Calendar Grid
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Webhook Payload Parsing</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Industrial Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unrolling CRM Contact Streams
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Auditor <strong>Abhronila Sengupta</strong> audits client contact streams exported as 3 consecutive lines [Company_Name, GSTIN, Contact_Person]. 
                She applies <code className="text-amber-300 font-mono">=WRAPROWS(RawCRMVector, 3, "N/A")</code> to build an instant client compliance register.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =WRAPROWS(CRM_Stream, 3, "N/A") &rarr; 3-Column Compliance Register
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Automated E-Commerce Order Parsing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Parsing 5-Field Online Order Feeds
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> receives e-commerce order streams containing [Order_ID, Item, Qty, Rate, Total]. 
                Using <code className="text-amber-300 font-mono">=WRAPROWS(OrderStream, 5, "-")</code>, 
                he reconstructs a 5-column transaction ledger for automated fulfillment.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =WRAPROWS(OrderStream, 5, "-") &rarr; 5-Column Order Table
              </div>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-cyan-400">🪜</span> Step-by-Step Practical Calculation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Determine Repeating Field Periodicity</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Inspect the source 1D stream in <code className="text-amber-300 font-mono">A2:A21</code>. Confirm that every transaction repeats exactly 4 fields (Txn_ID, Date, Name, Amount).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the WRAPROWS Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C2</code>, type: <code className="text-amber-300 font-mono">=WRAPROWS(A2:A21, 4, "NO_DATA")</code>. 
                  Set <code className="text-emerald-300 font-mono">wrap_count=4</code> to allocate 4 columns per row.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Inspect the Spilled 2D Matrix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula spills across 5 rows x 4 columns (<code className="text-emerald-300 font-mono">C2:F6</code>). 
                  Each row represents a complete, structured financial transaction record.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Downstream Aggregation & Currency Formatting</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Format column F as Indian Rupee currency (<code className="text-emerald-400 font-mono">₹#,##0.00</code>) and calculate total revenue: <code className="text-emerald-300 font-mono">=SUM(CHOOSECOLS(C2#, 4))</code>.
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (2D Array Input)</td>
                  <td className="py-3 px-4 text-slate-300">Passing a 2D multi-column range to WRAPROWS.</td>
                  <td className="py-3 px-4 text-slate-400">Check input argument shape.</td>
                  <td className="py-3 px-4 text-emerald-400">Flatten with TOCOL first: <code className="text-cyan-300 font-mono">=WRAPROWS(TOCOL(Range, 1), 4)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Invalid wrap_count)</td>
                  <td className="py-3 px-4 text-slate-300">Setting wrap_count &le; 0 or non-integer.</td>
                  <td className="py-3 px-4 text-slate-400">Check wrap_count parameter value.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure wrap_count is a positive integer &ge; 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#N/A in Last Row</td>
                  <td className="py-3 px-4 text-slate-300">Omitted the [pad_with] argument when vector length is not divisible by wrap_count.</td>
                  <td className="py-3 px-4 text-slate-400">Trailing cells display #N/A error tags.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply explicit pad_with value (e.g. <code className="text-emerald-400 font-mono">""</code> or <code className="text-emerald-400 font-mono">"-"</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by text or merged formatting.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow multi-column spill.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Stream Shaping Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-cyan-400 font-mono font-bold">TEXTSPLIT + WRAPROWS</span>
                <span>Single-Cell CSV Parser</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parse a single comma-delimited cell into a 4-column table: <code className="text-amber-300 font-mono">=WRAPROWS(TEXTSPLIT(A1, ","), 4, "")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">DROP + WRAPROWS</span>
                <span>Strip Log Headers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Discard introductory metadata lines before wrapping: <code className="text-emerald-300 font-mono">=WRAPROWS(DROP(Logs, 3), 4, "-")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Dropdown Width Hook</span>
                <span>Interactive Matrix Sizing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Link wrap_count to cell K1 to dynamically toggle table width between 2, 3, 4, or 5 columns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono">F9</kbd>
                <span>Preview 2D Table in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight WRAPROWS in the formula bar and press <strong>F9</strong> to inspect the reconstructed matrix in semicolon-delimited curly braces.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on stream phase shifts:</strong> What happens if an unparsed bank log file is missing a customer name in transaction #3? Why does verifying stream periodicity before applying <code className="text-cyan-300 font-mono">WRAPROWS</code> prevent phase-shift corruption?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine dimensional direction:</strong> Why does <code className="text-cyan-300 font-mono">WRAPROWS(V, 4)</code> fill horizontally across Row 1 before moving to Row 2, while <code className="text-blue-300 font-mono">WRAPCOLS(V, 4)</code> fills vertically down Column 1 before moving to Column 2?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider 2D matrix conversion:</strong> Why does <code className="text-cyan-300 font-mono">WRAPROWS</code> throw <code className="text-rose-400 font-mono">#VALUE!</code> on a 2D range, and how does nesting with <code className="text-sky-300 font-mono">TOCOL</code> solve this effortlessly?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Reshaping 1D Streams with WRAPROWS — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "WRAPROWS is the premier stream-to-table reconstruction utility in Excel 365. Whenever you receive unformatted vertical logs from payment gateways, bank statements, or Web APIs, never write complex INDEX with INT and MOD arithmetic formulas. Use =WRAPROWS(Data, 4, \"\") to transform flat lists into structured relational tables in a fraction of a second. Always verify stream periodicity before wrapping!"
            }
          />
        </div>
      </div>
    </div>
  );
}
