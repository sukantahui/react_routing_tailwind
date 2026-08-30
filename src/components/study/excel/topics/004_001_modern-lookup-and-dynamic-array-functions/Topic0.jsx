"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Modern Excel Engine · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2021+ Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Understanding Excel's Modern Calculation Engine & Dynamic Array Spill (#SPILL!) Behavior
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Microsoft Excel 365 represents the most fundamental architectural shift in spreadsheet computation since 1985. 
            Formulas no longer evaluate just single values—they natively return multi-dimensional matrices that dynamically 
            <strong className="text-sky-300"> "spill"</strong> into adjacent cells. Master the calculation engine, ghost cell mechanics, the spilled range operator (<code className="text-amber-300 font-mono">#</code>), and troubleshoot the 7 classes of <code className="text-rose-400 font-mono">#SPILL!</code> errors.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>No More CSE:</strong> Zero legacy Ctrl+Shift+Enter</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Spilled Reference:</strong> Universal <code className="text-sky-300 font-mono">A2#</code> syntax</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Grid Protection:</strong> Automatic collision prevention</span>
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
              <span className="text-sky-400">⚡</span> Formula Anatomy: The Spill Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine Spec: Dynamic Matrix Vectorization
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-sky-300">
            <span className="text-slate-500">// Modern Dynamic Formula (Entered into a single cell)</span>
            <div className="mt-1 text-white font-bold">
              =UNIQUE(<span className="text-amber-300">array</span>, <span className="text-slate-400">[by_col]</span>, <span className="text-slate-400">[exactly_once]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Spilled Range Reference Operator:</span>{" "}
              <span className="text-emerald-400 font-bold">Origin_Cell#</span> (e.g., <code className="text-amber-300">A2#</code> references the entire spilled array)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Component</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4">Architectural Role & Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">Origin Cell</td>
                  <td className="py-3 px-4 text-slate-400">Single Cell Coordinate</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Master (Editable)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The top-left cell where the formula is authored. Editing or deleting this cell controls the whole array.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">Ghost Cells</td>
                  <td className="py-3 px-4 text-slate-400">Projected Grid</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Read-Only View</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Cells populated by the spill. Formula bar shows ghosted grey text. Cannot be edited directly.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">Spill Operator (#)</td>
                  <td className="py-3 px-4 text-slate-400">Postfix Symbol</td>
                  <td className="py-3 px-4 text-sky-400 font-sans font-semibold">Dynamic Pointer</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Instructs downstream formulas to bind to the dynamic perimeter of the array (e.g. <code className="text-sky-300">SUM(C2#)</code>).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">Implicit Intersection (@)</td>
                  <td className="py-3 px-4 text-slate-400">Prefix Symbol</td>
                  <td className="py-3 px-4 text-amber-400 font-sans font-semibold">Compatibility Brake</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Forces an array/range to evaluate strictly as a single scalar value at the intersecting row.</td>
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
            <span className="text-emerald-400">🔬</span> Conceptual & Calculation Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In traditional spreadsheets, Excel evaluated one formula in one cell at a time. To perform matrix operations, you had to highlight a pre-determined block of cells, press <code className="text-sky-300 font-mono">Ctrl+Shift+Enter</code>, and lock the range with rigid curly braces <code className="text-slate-400 font-mono">{`{=ARRAY...}`}</code>. If your data expanded from 10 items to 15 items, the legacy array failed silently or required manual range re-selection.
            </p>
            <p>
              Under the modern calculation engine, Excel treats <strong>every single formula as array-enabled</strong>. When a formula returns more than one value:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Dimension Detection:</strong> The engine calculates the exact output dimensions (e.g. 18 rows × 3 columns) in memory.</li>
              <li><strong>Collision Scan:</strong> The engine scans the prospective bounding rectangle on the worksheet to verify every target cell is completely empty.</li>
              <li><strong>Grid Allocation (Spill):</strong> If clear, Excel places the master formula in the origin cell and projects values down and right, encasing the output in a glowing blue boundary border.</li>
              <li><strong>Non-Volatile Dependency Graph:</strong> Downstream formulas referencing <code className="text-emerald-400 font-mono">A2#</code> are linked directly in the DAG (Directed Acyclic Graph), recalculating instantly only when source data changes.</li>
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
              <span className="text-indigo-400">📐</span> Visual Vectorization Architecture
            </h2>
            <span className="text-xs text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              Spill Boundary & Collision Model
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Observe the architectural difference between the active <strong>Origin Cell</strong>, the projected <strong>Ghost Cells</strong>, and a <strong>Blocked #SPILL! Collision</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="320" fill="url(#grid)" rx="16" />

              {/* Scenario 1: Clean Spill */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="300" height="250" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Header */}
                <rect x="10" y="10" width="280" height="32" rx="6" fill="#1e293b" />
                <text x="150" y="31" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Clean Dynamic Spill Range (D2#)</text>

                {/* Origin Cell */}
                <rect x="20" y="55" width="120" height="38" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <text x="80" y="75" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D2 (Origin Cell)</text>
                <text x="80" y="88" fill="#e0f2fe" fontSize="9" textAnchor="middle">=UNIQUE(C2:C20)</text>

                {/* Ghost Cell 1 */}
                <rect x="20" y="100" width="120" height="34" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="80" y="122" fill="#94a3b8" fontSize="11" textAnchor="middle">D3 (Barrackpore)</text>

                {/* Ghost Cell 2 */}
                <rect x="20" y="140" width="120" height="34" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="80" y="162" fill="#94a3b8" fontSize="11" textAnchor="middle">D4 (Shyamnagar)</text>

                {/* Ghost Cell 3 */}
                <rect x="20" y="180" width="120" height="34" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="80" y="202" fill="#94a3b8" fontSize="11" textAnchor="middle">D5 (Ichapur)</text>

                {/* Annotation Downstream */}
                <rect x="155" y="105" width="130" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x="220" y="130" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Downstream Pointer</text>
                <text x="220" y="148" fill="#a7f3d0" fontSize="10" textAnchor="middle">=COUNTA(D2#)</text>
                <text x="220" y="163" fill="#6ee7b7" fontSize="9" textAnchor="middle">Returns: 4 items</text>
              </g>

              {/* Scenario 2: #SPILL! Collision Error */}
              <g transform="translate(400, 30)">
                <rect x="0" y="0" width="320" height="250" rx="12" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
                
                {/* Header */}
                <rect x="10" y="10" width="300" height="32" rx="6" fill="#312e81" />
                <text x="160" y="31" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">#SPILL! Collision Error</text>

                {/* Error Origin Cell */}
                <rect x="20" y="55" width="130" height="38" rx="6" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                <text x="85" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">F2: #SPILL!</text>
                <text x="85" y="88" fill="#ffe4e6" fontSize="9" textAnchor="middle">=SORT(A2:A20)</text>

                {/* Ghost Area with Obstruction */}
                <rect x="20" y="100" width="130" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeDasharray="2 2" />
                <text x="85" y="122" fill="#64748b" fontSize="10" textAnchor="middle">(Blocked Slot)</text>

                {/* Obstructing Value in F4 */}
                <rect x="20" y="140" width="130" height="34" rx="6" fill="#881337" stroke="#fb7185" strokeWidth="2" />
                <text x="85" y="162" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">F4: "Old Remark"</text>

                {/* Error Resolution Callout */}
                <rect x="165" y="70" width="140" height="135" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                <text x="235" y="95" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Diagnostic Fix</text>
                <text x="235" y="118" fill="#fee2e2" fontSize="9" textAnchor="middle">1. Click Warning Tag</text>
                <text x="235" y="138" fill="#fee2e2" fontSize="9" textAnchor="middle">2. Select Obstructing Cell</text>
                <text x="235" y="158" fill="#fee2e2" fontSize="9" textAnchor="middle">3. Press DELETE on F4</text>
                <text x="235" y="180" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">→ Range Spills Instantly!</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the live dataset below with multi-sheet support, or download the full chapter workbook to practice in desktop Microsoft Excel.
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
              title="Master Dynamic Array & Spill Evaluation Grid"
              rowsPerPage={12}
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
            <span className="text-amber-400">🏢</span> Real-World Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 1: Unique Branch List Extraction</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Barrackpore HQ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> manages transactions across branches. Instead of running manual 'Remove Duplicates', he places a single dynamic formula in cell <code className="text-amber-300 font-mono">J2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =SORT(UNIQUE(C2:C21))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills an alphabetized list of 4 unique branches: Barrackpore, Ichapur, Naihati, Shyamnagar.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Filtered Revenue Reports</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Branch</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> needs all transactions for <em>Python Data Science</em> where enrollment is confirmed. In cell <code className="text-amber-300 font-mono">L2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =FILTER(A2:H21, (D2:D21="Python Data Science") * (H2:H21="Confirmed"))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Dynamically returns all 5 matching rows across 8 columns in a single matrix spill.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 3: Self-Expanding Validation Lists</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Ichapur Division</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> creates an interactive dashboard. She extracts distinct Course Titles into <code className="text-amber-300 font-mono">P2</code> using <code className="text-sky-300 font-mono">=UNIQUE(D2:D21)</code>. In Data Validation:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                Source: =P2#
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Whenever a new course is introduced in the master log, the dropdown menu updates automatically!
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Top-Tier Revenue Sorting</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Accounts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> ranks transactions by gross revenue in descending order. In cell <code className="text-amber-300 font-mono">R2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORT(A2:H21, 7, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Generates a full 20-row table ranked from highest revenue (₹1,92,000) to lowest automatically.
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
            <span className="text-sky-400">📋</span> Step-by-Step Practical Calculation Guide
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Ensure Target Grid Clearance</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Before writing a dynamic array formula, verify that the cells below and to the right of your formula destination are completely blank. Clear out legacy manual formulas, titles, and merged cells.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Enter Formula into the Origin Cell Only</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Type your formula into the top-left cell (e.g. cell <code className="text-amber-300 font-mono">J2</code>) and press <strong className="text-emerald-400">ENTER</strong> directly. Never press Ctrl+Shift+Enter. Excel will immediately calculate the dimensions and spill the values.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Bind Downstream Calculations Using the '#' Operator</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  When performing secondary calculations (e.g. summing total revenue of filtered records), write <code className="text-sky-300 font-mono">=SUM(J2#)</code> instead of a fixed coordinate range like <code className="text-slate-400 font-mono">=SUM(J2:J20)</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & THE 7 CLASSES OF #SPILL! ERRORS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> The 7 Classes of #SPILL! Errors & Solutions
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Diagnostic Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">#SPILL! Root Cause</th>
                  <th className="pb-3 px-4">Why It Occurs</th>
                  <th className="pb-3 pl-4">Foolproof Professional Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">1. Obstructed Spill Range</td>
                  <td className="py-3.5 px-4 text-slate-300">A cell in the spill area contains text, numbers, or a space character.</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Click error icon → 'Select Obstructing Cell' → Press Delete.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">2. Merged Cells in Spill Path</td>
                  <td className="py-3.5 px-4 text-slate-300">Dynamic arrays require individual rectangular grid cells and cannot fill merged cells.</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Unmerge all cells in the target area. Use 'Center Across Selection'.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">3. Inside an Excel Table</td>
                  <td className="py-3.5 px-4 text-slate-300">Excel Tables (`ListObject`) enforce single-row calculation consistency per column.</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Place dynamic array formulas on standard worksheet grids outside the Table.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">4. Beyond Sheet Perimeter</td>
                  <td className="py-3.5 px-4 text-slate-300">Formula references entire column like `=A:A` starting at row 10, extending past row 1,048,576.</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Use bounded ranges like `=A2:A1000` or dynamic named ranges.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">5. Volatile Indeterminate Size</td>
                  <td className="py-3.5 px-4 text-slate-300">Array size changes continuously during evaluation (e.g. `RANDARRAY` depending on a live count).</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Fix array dimensions to a static cell reference or controlled integer.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">6. Out of Memory</td>
                  <td className="py-3.5 px-4 text-slate-300">Matrix size exceeds available Excel RAM allocation (e.g. 10M × 10M Cartesian join).</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Filter the source dataset in Power Query before loading into Excel.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">7. Empty String ("") Blockage</td>
                  <td className="py-3.5 px-4 text-slate-300">A cell contains an empty string result from a formula, which is not treated as blank.</td>
                  <td className="py-3.5 pl-4 text-emerald-400 font-medium">Select destination cells and press Delete to clear residual formula ghosts.</td>
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
            <span className="text-purple-400">💡</span> High-Speed Pro Tips & Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">F9</span>
                <span>Evaluate Array in Memory</span>
              </div>
              <p className="text-slate-300">
                Highlight any portion of a dynamic array formula in the formula bar and press <strong className="text-purple-300">F9</strong> to view its live calculated array matrix in memory. Press <strong className="text-slate-400">Esc</strong> to exit without overwriting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">Ctrl + `</span>
                <span>Formula Auditing Mode</span>
              </div>
              <p className="text-slate-300">
                Toggle between formula text and calculated results across the entire sheet instantly. Notice how only the origin cell shows text; ghost cells remain clean.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-xs">A2#</span>
                <span>Dynamic Dropdowns</span>
              </div>
              <p className="text-slate-300">
                Never hardcode validation ranges again. Set your Data Validation source to <code className="text-emerald-400 font-mono">=A2#</code> to create self-expanding dropdowns that update automatically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-xs">Layout Rule</span>
                <span>Side-by-Side Placement</span>
              </div>
              <p className="text-slate-300">
                Never stack two dynamic vertical arrays in the same column block. Always position dynamic tables in separate columns with 2-3 empty buffer columns between them.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Array Multiplication vs AND()</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Why does <code className="text-sky-300 font-mono">{'=FILTER(A2:D20, AND(B2:B20="Sales", C2:C20>50000))'}</code> fail, while <code className="text-emerald-400 font-mono">{'=FILTER(A2:D20, (B2:B20="Sales") * (C2:C20>50000))'}</code> succeeds? Think about what <code className="text-slate-400 font-mono">AND()</code> does when given a list of TRUE/FALSE values versus vector multiplication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe Carefully the Spilled Range Border</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Click on the origin cell, then click on the 5th cell below it. Observe the thin blue boundary box and the formula bar. Notice how Excel visually distinguishes the authoring origin from the projected ghosts.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Dynamic Arrays & Modern Calculation Engine FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering Dynamic Arrays is the dividing line between basic spreadsheet users and true Excel Engineers. Remember: Never stack dynamic tables vertically in the same columns—always provide horizontal buffer space. When building executive dashboards in Barrackpore or Kolkata corporate environments, combine =UNIQUE(), =SORT(), and =FILTER() into single-cell pipelines to eliminate bulky intermediate lookup sheets!"
            }
          />
        </div>
      </div>
    </div>
  );
}
