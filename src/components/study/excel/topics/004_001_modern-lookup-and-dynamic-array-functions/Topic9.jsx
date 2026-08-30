"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500/30 selection:text-rose-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Diagnostic Mastery · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-semibold">
              #SPILL! Resolution Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Grid Geometry & Collision Fixes
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Resolving #SPILL! Errors: Blocked Cells, Merged Cells, and Dynamic Range Clashes
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            A <strong className="text-rose-400 font-mono">#SPILL!</strong> error is not a mathematical formula flaw—it is a physical spatial collision on your worksheet grid. 
            Master the 7 root causes: occupied cells, merged cell coordinate breaks, Excel Table (<code className="text-sky-300 font-mono">ListObject</code>) constraints, 
            infinite whole-column references (<code className="text-amber-300 font-mono">A:A</code>), and overlapping array boundaries. 
            Learn to use the native <em>'Select Obstructing Cell'</em> tool to diagnose and restore dynamic pipelines in seconds.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-rose-400 text-base">✓</span>
              <span><strong>Spatial Diagnostics:</strong> Trace blue dashed spill borders</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Merged Cell Fixes:</strong> Eliminate coordinate null zones</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Table Decoupling:</strong> Structure calculations outside tables</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: DIAGNOSTIC & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚡</span> Diagnostic Anatomy: #SPILL! Error Code 2045
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Diagnostic Property: ERROR.TYPE = 9
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-rose-400">
            <span className="text-slate-500">// Diagnostic Blueprint:</span>
            <div className="mt-1 text-white font-bold">
              Formula in <span className="text-amber-300">Cell A1</span> needs range <span className="text-sky-300">A1:A10</span>, but <span className="text-rose-400">Cell A5</span> is occupied → Returns <span className="text-rose-400">#SPILL!</span>
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Instant Resolution Action:</span>{" "}
              Click Smart Tag → <code className="text-emerald-400">Select Obstructing Cell</code> → Press <code className="text-amber-300">Delete</code>!
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Root Cause</th>
                  <th className="pb-3 px-4">Why Excel Halts</th>
                  <th className="pb-3 pl-4">Immediate Fix & Engineering Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">1. Occupied Destination Cell</td>
                  <td className="py-3 px-4 font-sans text-slate-300">A cell in the required range contains text, numbers, or stray space characters.</td>
                  <td className="py-3 pl-4 font-sans text-emerald-400">Click Smart Tag → 'Select Obstructing Cell' → Press Delete to clear.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">2. Merged Cells in Range</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Merged cells break rectangular coordinate addressing.</td>
                  <td className="py-3 pl-4 font-sans text-emerald-400">Select destination cells → Home → Alignment → Unmerge Cells.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">3. Inside Excel Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Excel Tables do not support spilled arrays inside table columns.</td>
                  <td className="py-3 pl-4 font-sans text-emerald-400">Place dynamic array formulas on standard worksheet grids outside Tables.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">4. Whole Column Reference (A:A)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Generates 1,048,576 elements, running off the sheet edge.</td>
                  <td className="py-3 pl-4 font-sans text-emerald-400">Use bounded ranges like <code className="text-sky-300 font-mono">A2:A1000</code> or structured table columns.</td>
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
            <span className="text-rose-400">🔬</span> Conceptual Mechanics: How Excel Manages Spill Geometry
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              When a dynamic array formula executes, Excel's calculation engine performs a 2-phase calculation:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>In-Memory Matrix Computation:</strong> The formula computes the complete output matrix in RAM and determines its precise rectangular bounding dimensions $[R \times C]$ (e.g. 15 rows by 4 columns).</li>
              <li><strong>Grid Integrity Pre-Check:</strong> Before writing any values to the sheet, Excel scans the $[R \times C]$ grid perimeter. If even a single cell contains content, formatting merges, or table boundaries, the write is aborted and <code className="text-rose-400 font-mono">#SPILL!</code> is returned.</li>
              <li><strong>Atomic Resolution:</strong> The moment the obstructing cell is deleted or unmerged, Excel's reactive dependency graph fires, populating all 60 cells simultaneously without requiring manual formula re-entry!</li>
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
              <span className="text-amber-400">📐</span> Anatomy of Spill Path Obstruction
            </h2>
            <span className="text-xs text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
              Grid Collision Architecture
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing the blue dashed spill perimeter and how an obstructing cell triggers the #SPILL! error state.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern10" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="270" fill="url(#gridPattern10)" rx="16" />

              {/* State A: Obstructed #SPILL! */}
              <g transform="translate(40, 25)">
                <rect x="0" y="0" width="310" height="220" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="8" y="8" width="294" height="26" rx="6" fill="#881337" />
                <text x="155" y="25" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">State A: Obstructed (#SPILL! Error)</text>

                {/* Formula origin cell */}
                <rect x="20" y="45" width="270" height="30" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="35" y="65" fill="#fecdd3" fontSize="11" fontWeight="bold">Cell J2: #SPILL! (Formula Origin)</text>

                {/* Blue dashed perimeter */}
                <rect x="20" y="85" width="270" height="115" rx="6" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                <text x="155" y="110" fill="#7dd3fc" fontSize="10" textAnchor="middle">Projected Spill Perimeter (J3:J7)</text>

                {/* Obstructing cell */}
                <rect x="35" y="125" width="240" height="32" rx="4" fill="#991b1b" />
                <text x="155" y="145" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Cell J5: "Stray Text" [BLOCKER]</text>

                <text x="155" y="185" fill="#f87171" fontSize="9" textAnchor="middle">Clear Cell J5 to resolve!</text>
              </g>

              {/* Arrow */}
              <g stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 375 135 L 415 135" />
              </g>

              {/* State B: Resolved & Spilled */}
              <g transform="translate(430, 25)">
                <rect x="0" y="0" width="300" height="220" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="284" height="26" rx="6" fill="#047857" />
                <text x="150" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">State B: Resolved & Spilled Cleanly</text>

                <rect x="15" y="42" width="270" height="24" rx="4" fill="#059669" />
                <text x="25" y="58" fill="#ffffff" fontSize="10" fontWeight="bold">J2: 1. Swadeep Roy (Origin)</text>

                <rect x="15" y="70" width="270" height="24" rx="4" fill="#047857" />
                <text x="25" y="86" fill="#e2e8f0" fontSize="10">J3: 2. Tuhina Mukherjee</text>

                <rect x="15" y="98" width="270" height="24" rx="4" fill="#047857" />
                <text x="25" y="114" fill="#e2e8f0" fontSize="10">J4: 3. Abhronila Das</text>

                <rect x="15" y="126" width="270" height="24" rx="4" fill="#047857" />
                <text x="25" y="142" fill="#e2e8f0" fontSize="10">J5: 4. Susmita Saha (Cleared!)</text>

                <rect x="15" y="154" width="270" height="24" rx="4" fill="#047857" />
                <text x="25" y="170" fill="#e2e8f0" fontSize="10">J6: 5. Debangshu Hui</text>

                <text x="150" y="202" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">Array Spills Atomically in 5ms</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Spill Diagnostics Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the spill laboratory dataset below or download the practice workbook to test collision resolution in Microsoft Excel.
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
              sheetName="Topic0_Spill_Engine"
              title="Spill Collision & Boundary Practice Register"
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
            <span className="text-amber-400">🏢</span> Real-World Business #SPILL! Troubleshooting Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-rose-300 text-base">Case 1: Stray Total Formula in Spill Path</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">Barrackpore Finance</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> enters <code className="text-amber-300 font-mono">=UNIQUE(B2:B20)</code> in cell <code className="text-amber-300 font-mono">I2</code>, but cell <code className="text-rose-400 font-mono">I10</code> had an old <code className="text-slate-400 font-mono">=SUM(...)</code> formula.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 border border-slate-800">
                Fix: Click Smart Tag → 'Select Obstructing Cell' → Delete cell I10.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Unique names spill down immediately through row 11!
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-base">Case 2: Merged Title Cell Collision</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Shyamnagar Operations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> spills a 4-column table <code className="text-amber-300 font-mono">=FILTER(A2:D20, ...)</code>, but columns C & D were merged in row 6.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                Fix: Select row 6 → Alignment → Unmerge Cells.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Restores clean rectangular coordinates and allows all 4 columns to spill.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Spilling Inside an Excel Table</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Accounts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> wrote <code className="text-amber-300 font-mono">=UNIQUE(Table1[Branch])</code> inside a new Table column.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                Fix: Move formula to column J outside the Table boundary.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> References Table1 dynamically while spilling cleanly on the standard sheet grid.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Whole-Column Reference Overflow</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Analytics</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> wrote <code className="text-rose-400 font-mono">=UNIQUE(A:A)</code> in row 3, triggering an 'Out of Grid' overflow.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                Fix: Change to =UNIQUE(FILTER(A2:A1000, A2:A1000&lt;&gt;"")).
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Restricts calculation to bounded active rows, eliminating overflow instantly!
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
            <span className="text-sky-400">📋</span> 4-Step Protocol for Resolving #SPILL! Errors
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-rose-950 text-rose-400 font-bold flex items-center justify-center border border-rose-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Select the Origin Cell & Inspect Blue Border</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Click the cell displaying <code className="text-rose-400 font-mono">#SPILL!</code>. Look for the blue dashed boundary indicating the needed rectangular area.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-amber-950 text-amber-400 font-bold flex items-center justify-center border border-amber-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Trigger 'Select Obstructing Cell'</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Click the yellow warning tag next to the formula and choose <em>Select Obstructing Cell</em>. Excel jumps straight to the collision.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Clear Obstruction or Unmerge Cells</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Press <code className="text-amber-300 font-mono">Delete</code> to clear stray content, or unmerge any merged header blocks in the path.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">4</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Cap Array Height with TAKE if Space is Tight</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  If space below is limited by summary cards, wrap the formula in <code className="text-emerald-400 font-mono">=TAKE(Array, 10)</code>.
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
              <span className="text-rose-400">⚠️</span> Spill Collision Diagnostic Matrix
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Quick Diagnosis
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Symptom</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Engineering Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Cell Looks Empty But #SPILL! Persists</td>
                  <td className="py-3.5 px-4 text-slate-300">Contains invisible whitespace (<code className="text-slate-400">' '</code>) or null string formula (<code className="text-slate-400">=""</code>).</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Select the entire blue bounding box and press Delete.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Inside Excel Table Column</td>
                  <td className="py-3.5 px-4 text-slate-300">Tables prohibit spilled arrays inside their column geometry.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Move formula outside table, or convert Table to standard range.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Spill Range Extends Beyond Worksheet</td>
                  <td className="py-3.5 px-4 text-slate-300">Array requires more rows than available down to row 1,048,576.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Replace whole column reference (<code className="text-sky-300 font-mono">A:A</code>) with bounded range (<code className="text-sky-300 font-mono">A2:A1000</code>).</td>
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
            <span className="text-purple-400">💡</span> Pro Tips & Architecture Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">RULE 1</span>
                <span>Never Drag Dynamic Formulas</span>
              </div>
              <p className="text-slate-300">
                Enter the formula once in the top-left cell. Dragging copies duplicate formulas into adjacent cells, creating self-inflicted #SPILL! collisions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">RULE 2</span>
                <span>Decouple Calc and UI Sheets</span>
              </div>
              <p className="text-slate-300">
                Place master spilled arrays on a dedicated <code className="text-emerald-400 font-mono">_Calculations</code> tab and reference them with <code className="text-amber-300 font-mono">#</code> on executive dashboard cards!
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why Merged Cells Break Coordinates</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                When you merge cells <code className="text-amber-300 font-mono">B2:C2</code>, cell <code className="text-slate-400 font-mono">C2</code> technically ceases to exist in Excel's coordinate map. Why does a 2-column spilled array refuse to write to a merged cell block?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Excel Tables Maintain Boundaries</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that Excel Tables require every row to be a single record entry. Allowing an array in cell 2 to spill 50 rows down would break the Table's row-level integrity!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Resolving #SPILL! Errors & Grid Geometry FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "A #SPILL! error is just Excel's way of asking for room to breathe! In professional financial dashboards across Barrackpore and Kolkata, ban merged cells completely and unmerge any collision zones. Place dynamic array formulas on dedicated calculation sheets with plenty of empty room below, and your models will run with 100% reliability!"
            }
          />
        </div>
      </div>
    </div>
  );
}
