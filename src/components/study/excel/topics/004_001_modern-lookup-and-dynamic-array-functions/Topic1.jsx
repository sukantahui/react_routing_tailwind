"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Dynamic Referencing · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              The Spilled Range Operator (#)
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Elastic Range Binding
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            The Spill Operator (#) & Referencing Spilled Array Ranges Dynamically
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern financial engineering, hardcoded range coordinates like <code className="text-slate-400 font-mono">A2:A50</code> are obsolete. 
            The <strong className="text-emerald-300 font-mono"># (Spilled Range Operator)</strong> dynamically attaches to the entire live bounding box of any spilled array. 
            Learn how to perform vectorized math (<code className="text-sky-300 font-mono">G2# * 0.18</code>), dynamic aggregations (<code className="text-amber-300 font-mono">SUM(D2#)</code>), 
            and self-updating Data Validation dropdowns with zero maintenance.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Elastic Binding:</strong> Auto-adjusts from 5 to 5,000 rows</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Vectorized Math:</strong> Arithmetic broadcasts across all elements</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Zero Redundancy:</strong> Eliminates volatile OFFSET & INDIRECT</span>
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
              <span className="text-emerald-400">⚡</span> Syntax Anatomy: The Spilled Range Pointer (#)
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: OriginCoordinate#
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-emerald-300">
            <span className="text-slate-500">// Basic Spilled Array Reference Syntax:</span>
            <div className="mt-1 text-white font-bold">
              =<span className="text-sky-300">AGGREGATE_FUNCTION</span>(<span className="text-amber-300">Origin_Cell</span><span className="text-emerald-400 font-extrabold text-lg">#</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Examples:</span>{" "}
              <code className="text-sky-300">=SUM(D2#)</code>,{" "}
              <code className="text-amber-300">=COUNTA(BranchList#)</code>,{" "}
              <code className="text-purple-300">=DataSheet!J2# * 1.18</code>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Reference Expression</th>
                  <th className="pb-3 px-4">Evaluated Range Scope</th>
                  <th className="pb-3 px-4">Behavior on Data Expansion</th>
                  <th className="pb-3 pl-4">Use Case & Architectural Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">B2#</td>
                  <td className="py-3 px-4 text-slate-400">Full Spilled Array (e.g. B2:B18)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Self-Expanding (Automatic)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Passes the entire live dynamic array into downstream formulas without knowing its size in advance.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">Sheet1!C5#</td>
                  <td className="py-3 px-4 text-slate-400">Cross-Sheet Spilled Block</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Self-Expanding (Automatic)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">References a spilled array hosted on a raw transactional or calculation sheet from a clean KPI dashboard.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">B2# * 0.18</td>
                  <td className="py-3 px-4 text-slate-400">Vectorized Column Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Broadcast Spilled Output</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Applies a scalar arithmetic multiplier across every element, creating a matching calculated spill column.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">B5# (Ghost Cell)</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Invalid Reference</td>
                  <td className="py-3 px-4 text-rose-400 font-sans font-semibold">Returns #REF! Error</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The `#` operator can ONLY be appended to the top-left origin cell where the original formula is authored.</td>
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
            <span className="text-sky-400">🔬</span> How the Spill Range Operator (#) Works in Memory
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              When a dynamic array function like <code className="text-emerald-400 font-mono">=UNIQUE()</code>, <code className="text-sky-300 font-mono">=FILTER()</code>, or <code className="text-amber-300 font-mono">=SORT()</code> runs, Excel's modern calculation engine allocates a dynamic memory block registered under the coordinate of the <strong>Origin Cell</strong>.
            </p>
            <p>
              When you write <code className="text-emerald-300 font-mono">=SUM(D2#)</code>, the engine performs the following internal sequence:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Origin Lookup:</strong> Checks the calculation tree to find the dynamic array registered at coordinate <code className="text-amber-300 font-mono">D2</code>.</li>
              <li><strong>Boundary Resolution:</strong> Inspects the active bounding coordinates (e.g. rows 2 to 21 across 1 column → <code className="text-sky-300 font-mono">D2:D21</code>).</li>
              <li><strong>Vectorized Evaluation:</strong> Passes the entire resolved array memory slice directly into the aggregate function.</li>
              <li><strong>Zero Recalculation Overhead:</strong> Unlike legacy volatile functions (<code className="text-slate-400 font-mono">OFFSET</code> or <code className="text-slate-400 font-mono">INDIRECT</code>), the `#` operator is <strong>non-volatile</strong>. It recalculates strictly when the parent origin formula updates its output dimensions.</li>
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
              <span className="text-indigo-400">📐</span> The Dynamic Elastic Pointer Architecture
            </h2>
            <span className="text-xs text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              Downstream Formula Binding
            </span>
          </div>

          <p className="text-sm text-slate-300">
            See how downstream formulas like <code className="text-emerald-400 font-mono">SUM(D3#)</code> and <code className="text-sky-300 font-mono">D3# * 0.18</code> automatically bind to the elastic boundary of the spilled parent array.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern2" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="300" fill="url(#gridPattern2)" rx="16" />

              {/* Step 1: Parent Spilled Array */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="220" height="230" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="10" y="10" width="200" height="30" rx="6" fill="#064e3b" />
                <text x="110" y="30" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Origin Array (D3#)</text>

                {/* Origin Cell */}
                <rect x="20" y="50" width="180" height="32" rx="6" fill="#047857" stroke="#10b981" strokeWidth="2" />
                <text x="110" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D3: ₹1,26,000 (Origin)</text>

                {/* Ghost Items */}
                <rect x="20" y="90" width="180" height="28" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="110" y="108" fill="#94a3b8" fontSize="10" textAnchor="middle">D4: ₹1,12,500 (Barrackpore)</text>

                <rect x="20" y="125" width="180" height="28" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="110" y="143" fill="#94a3b8" fontSize="10" textAnchor="middle">D5: ₹1,92,000 (Barrackpore)</text>

                <rect x="20" y="160" width="180" height="28" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="110" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">D6: ₹1,56,000 (Barrackpore)</text>

                <text x="110" y="210" fill="#6ee7b7" fontSize="10" textAnchor="middle">Elastic Range: D3:D6</text>
              </g>

              {/* Connecting Arrows */}
              <g stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 270 70 L 370 70" markerEnd="url(#arrow)" />
                <path d="M 270 160 L 370 180" markerEnd="url(#arrow)" />
              </g>

              {/* Step 2: Downstream Vectorized Tax Column */}
              <g transform="translate(380, 20)">
                <rect x="0" y="0" width="340" height="110" rx="12" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="20" y="30" fill="#bae6fd" fontSize="13" fontWeight="bold">1. Vectorized Arithmetic Column</text>
                <text x="20" y="55" fill="#e0f2fe" fontSize="12" fontFamily="monospace">=D3# * 0.18 (GST Tax 18%)</text>
                <text x="20" y="80" fill="#7dd3fc" fontSize="11">Broadcasts 18% tax across all 4 rows instantly</text>
                <text x="20" y="98" fill="#38bdf8" fontSize="10" fontWeight="bold">Output: Spills H3:H6 (₹22,680, ₹20,250...)</text>
              </g>

              {/* Step 3: Downstream Aggregation KPI */}
              <g transform="translate(380, 150)">
                <rect x="0" y="0" width="340" height="110" rx="12" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="20" y="30" fill="#c7d2fe" fontSize="13" fontWeight="bold">2. Dynamic Executive KPI Metric</text>
                <text x="20" y="55" fill="#e0e7ff" fontSize="12" fontFamily="monospace">=SUM(D3#)</text>
                <text x="20" y="80" fill="#a5b4fc" fontSize="11">Calculates total Barrackpore revenue</text>
                <text x="20" y="98" fill="#818cf8" fontSize="10" fontWeight="bold">Result: ₹5,86,500 (Never misses new rows!)</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Spill Operator in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the live dataset below or download the master chapter workbook to practice downstream `#` operator referencing in desktop Excel.
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
              sheetName="EX1602"
              title="Spill Operator (#) Formula Laboratory"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of the '#' Operator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 1: Dynamic Revenue Summing</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Barrackpore HQ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> filters all sales for <em>Barrackpore Branch</em> into cell <code className="text-amber-300 font-mono">D3</code>. To calculate total filtered revenue without hardcoding rows:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =SUM(D3#)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> ₹8,23,500. When new Barrackpore sales are logged, the sum expands automatically.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 2: Auto-Vectorized 18% GST</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Shyamnagar Audit</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> needs to calculate GST liability on all filtered transactions in <code className="text-amber-300 font-mono">D3#</code>. In cell <code className="text-sky-300 font-mono">H3</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =D3# * 0.18
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Generates a full matching column of GST amounts. Total GST is obtained with <code className="text-emerald-400 font-mono">=SUM(H3#)</code>.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 3: Distinct Student Count</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Ichapur Division</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> extracts unique student names into cell <code className="text-amber-300 font-mono">B3</code> using <code className="text-emerald-400 font-mono">=UNIQUE(StudentNames)</code>. To display the active count:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                =COUNTA(B3#)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Displays the exact headcount with zero blank row counting errors.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Dynamic Header Text Joining</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Reporting</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> creates a dynamic title showing all active operating branches. In cell <code className="text-amber-300 font-mono">L1</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                ="Active Hubs: " & TEXTJOIN(", ", TRUE, B3#)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> "Active Hubs: Barrackpore, Ichapur, Naihati, Shyamnagar".
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
            <span className="text-sky-400">📋</span> 3-Step Procedure for Elastic Range Referencing
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Identify the Top-Left Origin Cell</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Click on your dynamic array output and locate the cell holding the master formula (e.g. <code className="text-amber-300 font-mono">D3</code>). Remember: only the origin cell is valid for the <code className="text-emerald-400 font-mono">#</code> operator.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Append '#' Immediately After the Coordinate</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  In your downstream formula, type <code className="text-emerald-400 font-mono">=SUM(D3#)</code> or click on cell <code className="text-amber-300 font-mono">D3</code> and type <code className="text-emerald-400 font-mono">#</code> directly. Notice how Excel highlights the entire spilled range with a glowing blue border.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Test Elasticity by Appending New Data</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Add 3 new transaction records to the master table. Verify that the parent array expands and the downstream <code className="text-emerald-400 font-mono">=SUM(D3#)</code> updates its total instantaneously with zero manual range edits!
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
              <span className="text-rose-400">⚠️</span> Common Spill Operator Mistakes & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Troubleshooting Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Correct Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Attaching '#' to Ghost Cell</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#REF! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Always point to the top-left cell where the master formula was authored (e.g. <code className="text-sky-300">D3#</code>, never <code className="text-slate-400">D5#</code>).</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Attaching '#' to Static Non-Spilled Cell</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#REF! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Verify that the target cell actively holds a dynamic array formula before using the <code className="text-sky-300">#</code> operator.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Misplacing '#' in Cross-Sheet Ref</td>
                  <td className="py-3.5 px-4 text-slate-300">Formula Syntax Error (<code className="text-rose-400">Data#!A2</code>)</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Place the <code className="text-sky-300">#</code> immediately after the cell reference: <code className="text-sky-300">Data!A2#</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Mismatched Array Multiplication</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#N/A in Trailing Rows</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure both arrays in binary math have matching row and column dimensions.</td>
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
            <span className="text-purple-400">💡</span> Pro Tips for Dynamic Array Engineering
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">A2#</span>
                <span>Self-Updating Dropdowns</span>
              </div>
              <p className="text-slate-300">
                In Data Validation, set Source to <code className="text-emerald-400 font-mono">=B3#</code>. Whenever new unique branches are added, your dropdown menu updates dynamically without editing range parameters!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">CHOOSECOLS</span>
                <span>Extract Single Column from 2D Spill</span>
              </div>
              <p className="text-slate-300">
                If <code className="text-sky-300 font-mono">A2#</code> spills 5 columns, use <code className="text-emerald-400 font-mono">=CHOOSECOLS(A2#, 4)</code> to extract only the 4th column for separate calculations.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why =SUM(D3#) Outperforms =SUM(D3:D1000)</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                When you reference a fixed range with empty padding (<code className="text-slate-400 font-mono">D3:D1000</code>), Excel must check all 998 cells for possible values. With <code className="text-emerald-400 font-mono">D3#</code>, the engine computes strictly across the exact active memory allocation, delivering maximum speed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Array Math Avoids Helper Columns</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Instead of creating an intermediate column for Gross + Tax and another for Net, you can chain array operations in memory: <code className="text-emerald-400 font-mono">=SUM(D3# * 1.18)</code> computes total invoice revenue inclusive of tax in one cell!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Spill Operator (#) & Dynamic Array Referencing FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "In industrial financial reporting across Barrackpore and Kolkata, models built with hardcoded ranges break the moment new rows are appended. Always adopt the # operator for your summary cards, chart series names, and validation dropdowns. It guarantees zero-maintenance, self-healing workbooks!"
            }
          />
        </div>
      </div>
    </div>
  );
}
