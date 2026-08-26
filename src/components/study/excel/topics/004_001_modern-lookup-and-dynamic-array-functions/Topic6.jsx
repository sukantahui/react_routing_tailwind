"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/dynamic_arrays_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Elastic Array Generation · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The SEQUENCE Function
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Calendars & Index Matrices
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Generating Numeric and Date Sequences with SEQUENCE (Rows, Columns, Start, Step)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Never drag the fill handle again. The <strong className="text-teal-300 font-mono">SEQUENCE</strong> function dynamically generates 
            auto-expanding serial numbers, financial cashflow timelines, 2D matrix grids, and custom formatted voucher codes in a single formula. 
            Pair with <code className="text-emerald-300 font-mono">COUNTA()</code> for self-adjusting table rows, <code className="text-amber-300 font-mono">DATE()</code> for dynamic annual calendars, 
            and negative steps for automated countdown timers.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Auto-Expanding Serials:</strong> Bound to table row count</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Dynamic Date Series:</strong> Daily, weekly & monthly calendars</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>2D Coordinate Grids:</strong> Multi-column seating & index maps</span>
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
              <span className="text-teal-400">⚡</span> Formula Anatomy: =SEQUENCE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: SEQUENCE(rows, [columns], [start], [step])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300">
            <span className="text-slate-500">// Modern SEQUENCE Signature:</span>
            <div className="mt-1 text-white font-bold">
              =SEQUENCE(<span className="text-amber-300">rows</span>, <span className="text-sky-300">[columns]</span>, <span className="text-emerald-400">[start]</span>, <span className="text-purple-300">[step]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Real-World Usages:</span>{" "}
              <code className="text-emerald-400">=SEQUENCE(20)</code> (1 to 20) |{" "}
              <code className="text-sky-300">=SEQUENCE(365, 1, DATE(2026,1,1), 1)</code> (365 Days) |{" "}
              <code className="text-purple-300">=SEQUENCE(5, 4, 101, 1)</code> (5x4 2D Grid)
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
                  <td className="py-3 pr-4 text-amber-300 font-bold">rows</td>
                  <td className="py-3 px-4 text-slate-400">Integer (&gt;= 1)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Number of rows to generate down vertically.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">[columns]</td>
                  <td className="py-3 px-4 text-slate-400">Integer (&gt;= 1)</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Number of columns to generate across horizontally.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[start]</td>
                  <td className="py-3 px-4 text-slate-400">Number / Date</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Starting integer, decimal, or serial date number (e.g. 1, 100, or DATE(2026,1,1)).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">[step]</td>
                  <td className="py-3 px-4 text-slate-400">Number</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Increment per value. Can be positive, negative (-1 for countdown), or fractional (0.5).</td>
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
            <span className="text-teal-400">🔬</span> Conceptual Mechanics: Arithmetic Memory Generation
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Unlike standard functions that read and process values from cell ranges, <code className="text-teal-300 font-mono">SEQUENCE</code> generates data purely algorithmically in memory.
            </p>
            <p>
              For each matrix element at row <span className="font-mono text-amber-300">r</span> (0 ≤ r &lt; rows) and column <span className="font-mono text-amber-300">c</span> (0 ≤ c &lt; columns):
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
              Value(r, c) = start + (r × columns + c) × step
            </div>
            <p>
              Because this mathematical formulation runs in native C++, generating a 100,000-cell array takes under 5 milliseconds with virtually zero memory overhead.
            </p>
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
              <span className="text-teal-400">📐</span> 1D Vector vs. 2D Matrix Generation
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Array Geometry Model
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Comparing a vertical 1D sequence vector against a multi-column 2D matrix coordinate grid.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern7" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="270" fill="url(#gridPattern7)" rx="16" />

              {/* 1D Vertical Sequence */}
              <g transform="translate(40, 25)">
                <rect x="0" y="0" width="280" height="220" rx="10" fill="#0f172a" stroke="#0d9488" strokeWidth="1.5" />
                <rect x="8" y="8" width="264" height="26" rx="6" fill="#134e4a" />
                <text x="140" y="25" fill="#5eead4" fontSize="11" fontWeight="bold" textAnchor="middle">=SEQUENCE(5, 1, 10, 5) [1D Vector]</text>

                <rect x="20" y="45" width="240" height="26" rx="4" fill="#115e59" />
                <text x="140" y="62" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Row 1: 10 (Start)</text>

                <rect x="20" y="78" width="240" height="26" rx="4" fill="#0f766e" />
                <text x="140" y="95" fill="#ffffff" fontSize="11" textAnchor="middle">Row 2: 15 (+5)</text>

                <rect x="20" y="111" width="240" height="26" rx="4" fill="#0f766e" />
                <text x="140" y="128" fill="#ffffff" fontSize="11" textAnchor="middle">Row 3: 20 (+5)</text>

                <rect x="20" y="144" width="240" height="26" rx="4" fill="#0f766e" />
                <text x="140" y="161" fill="#ffffff" fontSize="11" textAnchor="middle">Row 4: 25 (+5)</text>

                <rect x="20" y="177" width="240" height="26" rx="4" fill="#0f766e" />
                <text x="140" y="194" fill="#ffffff" fontSize="11" textAnchor="middle">Row 5: 30 (+5)</text>
              </g>

              {/* 2D Matrix Sequence */}
              <g transform="translate(380, 25)">
                <rect x="0" y="0" width="340" height="220" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <rect x="8" y="8" width="324" height="26" rx="6" fill="#312e81" />
                <text x="170" y="25" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">=SEQUENCE(4, 3, 101, 1) [2D Matrix]</text>

                {/* Row 1 */}
                <rect x="20" y="45" width="90" height="32" rx="4" fill="#4338ca" />
                <text x="65" y="66" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">101</text>
                <rect x="125" y="45" width="90" height="32" rx="4" fill="#4338ca" />
                <text x="170" y="66" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">102</text>
                <rect x="230" y="45" width="90" height="32" rx="4" fill="#4338ca" />
                <text x="275" y="66" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">103</text>

                {/* Row 2 */}
                <rect x="20" y="85" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="65" y="106" fill="#e0e7ff" fontSize="12" textAnchor="middle">104</text>
                <rect x="125" y="85" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="170" y="106" fill="#e0e7ff" fontSize="12" textAnchor="middle">105</text>
                <rect x="230" y="85" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="275" y="106" fill="#e0e7ff" fontSize="12" textAnchor="middle">106</text>

                {/* Row 3 */}
                <rect x="20" y="125" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="65" y="146" fill="#e0e7ff" fontSize="12" textAnchor="middle">107</text>
                <rect x="125" y="125" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="170" y="146" fill="#e0e7ff" fontSize="12" textAnchor="middle">108</text>
                <rect x="230" y="125" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="275" y="146" fill="#e0e7ff" fontSize="12" textAnchor="middle">109</text>

                {/* Row 4 */}
                <rect x="20" y="165" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="65" y="186" fill="#e0e7ff" fontSize="12" textAnchor="middle">110</text>
                <rect x="125" y="165" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="170" y="186" fill="#e0e7ff" fontSize="12" textAnchor="middle">111</text>
                <rect x="230" y="165" width="90" height="32" rx="4" fill="#3730a3" />
                <text x="275" y="186" fill="#e0e7ff" fontSize="12" textAnchor="middle">112</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: SEQUENCE Generators
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the sequence templates below or download the practice workbook to test custom date and numeric sequences in Microsoft Excel.
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
              sheetName="Topic6_Sequence_Generators"
              title="Master Sequence & Timeline Patterns Register"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of SEQUENCE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-teal-300 text-base">Case 1: Auto-Numbering Student Roster</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800">Barrackpore Admissions</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> creates a dynamic serial number column in cell <code className="text-amber-300 font-mono">A2</code> that expands automatically whenever new students enroll:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-teal-300 border border-slate-800">
                =SEQUENCE(COUNTA(B2:B100))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Automatically maintains continuous 1..N serial numbers without manual fill-dragging!
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: 12-Month Financial Timeline</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Corporate Finance</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> generates the 1st of every month across 2026 for a financial budget model:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =EDATE(DATE(2026, 1, 1), SEQUENCE(12, 1, 0, 1))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills 12 clean monthly milestone dates (Jan 1, Feb 1, Mar 1... Dec 1).
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Formatted Voucher Codes</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Accounts Office</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> generates 50 formatted payment voucher IDs:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                ="VCH-2026-" & TEXT(SEQUENCE(50), "000")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills 'VCH-2026-001' to 'VCH-2026-050' with leading zeros.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: 2D Exam Hall Seating Matrix</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Training Center</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> maps a 6-row by 5-column computer lab examination seating plan starting from seat 101:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SEQUENCE(6, 5, 101, 1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Generates a complete 30-seat 2D grid spanning 6 rows by 5 columns in one equation.
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
            <span className="text-sky-400">📋</span> 3-Step Guide to Dynamic Sequence Modeling
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-teal-950 text-teal-400 font-bold flex items-center justify-center border border-teal-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Bind Rows to Dynamic Table Length</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Instead of hardcoding <code className="text-amber-300 font-mono">=SEQUENCE(20)</code>, write <code className="text-emerald-400 font-mono">=SEQUENCE(ROWS(DataRange#))</code> to ensure sequences expand dynamically.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Pass Serial Dates for Chronological Timelines</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Pass <code className="text-sky-300 font-mono">DATE(2026,1,1)</code> to the <code className="text-amber-300 font-mono">start</code> argument and format output cells as Short Date (<code className="text-emerald-300">YYYY-MM-DD</code>).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Use Negative Step for Reverse Order</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  To generate a countdown or reverse row index, set <code className="text-emerald-400 font-mono">step = -1</code> (e.g. <code className="text-sky-300 font-mono">=SEQUENCE(10, 1, 10, -1)</code>).
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
              <span className="text-rose-400">⚠️</span> Common SEQUENCE Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Troubleshooting Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Negative Dimension Count</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#VALUE! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">The <code className="text-sky-300 font-mono">rows</code> and <code className="text-sky-300 font-mono">columns</code> arguments must be positive integers (&gt;= 1).</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Dates Appearing as Numbers (46023)</td>
                  <td className="py-3.5 px-4 text-slate-300">Raw numeric serials displayed instead of formatted dates.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Apply Date formatting (<code className="text-sky-300 font-mono">Ctrl+Shift+#</code>) to the destination range.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Collision</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all data in the spill perimeter to allow the array to expand.</td>
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
            <span className="text-purple-400">💡</span> Pro Tips & Advanced Recipes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">CHAR</span>
                <span>Generate A-Z Letters</span>
              </div>
              <p className="text-slate-300">
                To generate uppercase letters A to Z: <code className="text-emerald-400 font-mono">=CHAR(SEQUENCE(26, 1, 65, 1))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">BROADCAST</span>
                <span>10x10 Multiplication Grid</span>
              </div>
              <p className="text-slate-300">
                To build a 10×10 multiplication matrix in one cell: <code className="text-emerald-400 font-mono">=SEQUENCE(10, 1) * SEQUENCE(1, 10)</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why Fill-Dragging is Fragile</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                When a user deletes row 14 from a manually numbered list (1..20), the serial number 14 vanishes and the list jumps from 13 to 15. Why does <code className="text-emerald-400 font-mono">=SEQUENCE(COUNTA(Data))</code> maintain uninterrupted serial numbers automatically?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Array Broadcasting Multiplies Vectors</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that multiplying a vertical vector <code className="text-amber-300 font-mono">(10×1)</code> by a horizontal vector <code className="text-sky-300 font-mono">(1×10)</code> automatically broadcasts across both dimensions to construct a 2D matrix without nested loops!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The SEQUENCE Function & Index Generators FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Stop manually dragging serial numbers and dates! In Barrackpore and Kolkata corporate offices, use =SEQUENCE(COUNTA(NameRange)) for automated row indexing and =EDATE(StartDate, SEQUENCE(12,1,0,1)) for annual budget timelines. It creates elastic spreadsheets that adjust themselves dynamically!"
            }
          />
        </div>
      </div>
    </div>
  );
}
