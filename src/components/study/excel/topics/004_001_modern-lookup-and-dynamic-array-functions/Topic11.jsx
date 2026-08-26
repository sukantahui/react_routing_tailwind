"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/dynamic_arrays_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic11() {
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
              ⚡ UI/UX Architecture · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Dynamic Validation Lists
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              The A2# Syntax Pattern
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-300 bg-clip-text text-transparent leading-tight">
            Dynamic Validation Lists Fed Directly by Spilled Array Ranges (A2# Syntax)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Upgrade your spreadsheet user interfaces from static drop-down menus to fully reactive, searchable validation lists. 
            By binding Excel's Data Validation dialog directly to dynamic spilled arrays using the <strong className="text-amber-300 font-mono">=$OriginCell#</strong> syntax, 
            dropdowns expand, contract, and re-order automatically as raw transaction records evolve. 
            Build dependent cascading dropdowns (Region → Branch → Course) without volatile <code className="text-slate-400 font-mono">OFFSET</code> or fragile <code className="text-slate-400 font-mono">INDIRECT</code> functions.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Self-Expanding Dropdowns:</strong> Bound dynamically with <code className="font-mono text-amber-300">#</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>No Volatile INDIRECT:</strong> Native space & symbol support</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>In-Place Auto-Complete:</strong> Type to search inside dropdowns</span>
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
              <span className="text-amber-400">⚡</span> UI Configuration: Data Validation & Spilled Arrays
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Dialog Path: Data → Data Validation → Allow: List → Source
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-amber-300">
            <span className="text-slate-500">// Step 1: Place Feeder Array Formula in Cell J2:</span>
            <div className="mt-1 text-white font-bold">
              =SORT(UNIQUE(<span className="text-sky-300">Table1[Branch_Location]</span>))
            </div>
            <div className="mt-3 text-slate-500">// Step 2: In Input Cell B2 → Data Validation Source:</div>
            <div className="mt-1 text-emerald-400 font-bold">
              =<span className="text-amber-300">$J$2#</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Setting Field</th>
                  <th className="pb-3 px-4">Value / Syntax</th>
                  <th className="pb-3 pl-4">Operational Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">Allow</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">List</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Restricts user entry to a dropdown selection list.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">Source</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">=$J$2#</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">References the origin cell of the spilled array with the '#' operator.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">In-Cell Dropdown</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Checked (TRUE)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Renders the interactive arrow icon for point-and-click selection.</td>
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
            <span className="text-amber-400">🔬</span> Why Dynamic Array Validation Outclasses Legacy INDIRECT()
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In legacy Excel architectures, building cascading dependent dropdowns (e.g. State → City) required defining dozens of Named Ranges and writing <code className="text-slate-400 font-mono">=INDIRECT(SUBSTITUTE(A2," ","_"))</code>. 
              This caused major issues:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li><strong>Naming Restrictions:</strong> Named Ranges cannot contain spaces or punctuation, breaking city names like <em>"North 24 Parganas"</em>.</li>
              <li><strong>Extreme Volatility:</strong> <code className="text-slate-400 font-mono">INDIRECT</code> recalculates on every keystroke, slowing massive workbooks to a crawl.</li>
            </ul>
            <p>
              Modern dynamic array validation solves this elegantly:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Direct String Filtering:</strong> In cell <code className="text-amber-300 font-mono">L2</code>, write <code className="text-emerald-400 font-mono">=SORT(UNIQUE(FILTER(BranchCol, RegionCol=J1)))</code>.</li>
              <li><strong>Zero Substitution Hacks:</strong> Text with spaces, hyphens, and slashes is evaluated natively without conversion.</li>
              <li><strong>In-Place Auto-Complete:</strong> In Excel 365, clicking the dropdown and typing the first letter instantly filters the options in place!</li>
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
              <span className="text-teal-400">📐</span> Dynamic Validation Architecture
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Feeder Array → Dropdown UI
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing the connection between the background feeder formula in cell J2# and the live user dropdown.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern12" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="260" fill="url(#gridPattern12)" rx="16" />

              {/* Feeder Calculation Array */}
              <g transform="translate(40, 25)">
                <rect x="0" y="0" width="310" height="210" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="8" y="8" width="294" height="26" rx="6" fill="#78350f" />
                <text x="155" y="25" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">Feeder Cell J2: =SORT(UNIQUE(Cities))</text>

                <rect x="20" y="42" width="270" height="24" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
                <text x="35" y="58" fill="#ffffff" fontSize="10" fontWeight="bold">J2: Barrackpore (Origin)</text>

                <rect x="20" y="70" width="270" height="24" rx="4" fill="#1c1917" />
                <text x="35" y="86" fill="#e2e8f0" fontSize="10">J3: Ichapur</text>

                <rect x="20" y="98" width="270" height="24" rx="4" fill="#1c1917" />
                <text x="35" y="114" fill="#e2e8f0" fontSize="10">J4: Naihati</text>

                <rect x="20" y="126" width="270" height="24" rx="4" fill="#1c1917" />
                <text x="35" y="142" fill="#e2e8f0" fontSize="10">J5: Shyamnagar</text>

                <text x="155" y="185" fill="#fef08a" fontSize="9" textAnchor="middle">Spills dynamically as J2#</text>
              </g>

              {/* Arrow */}
              <g stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 375 130 L 415 130" />
              </g>

              {/* Data Validation Dropdown UI */}
              <g transform="translate(430, 25)">
                <rect x="0" y="0" width="300" height="210" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="284" height="26" rx="6" fill="#047857" />
                <text x="150" y="25" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Data Validation Source: =$J$2#</text>

                {/* Dropdown Box */}
                <rect x="20" y="45" width="260" height="34" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
                <text x="35" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">Select Branch: Barrackpore</text>
                
                {/* Dropdown Arrow Icon */}
                <rect x="245" y="48" width="30" height="28" rx="4" fill="#059669" />
                <path d="M 255 60 L 260 66 L 265 60" fill="#ffffff" />

                {/* Dropped Menu Options */}
                <rect x="20" y="85" width="260" height="110" rx="6" fill="#0f172a" stroke="#1e293b" />
                <text x="35" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold">✓ Barrackpore</text>
                <text x="35" y="128" fill="#e2e8f0" fontSize="10">  Ichapur</text>
                <text x="35" y="151" fill="#e2e8f0" fontSize="10">  Naihati</text>
                <text x="35" y="174" fill="#e2e8f0" fontSize="10">  Shyamnagar</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Dynamic Dropdown Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the master data below or download the practice workbook to test dynamic validation lists in Microsoft Excel.
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
              sheetName="Topic2_Unique_Deduplication"
              title="Master Regional Validation & Data Registry"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of Dynamic Dropdowns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-base">Case 1: Self-Updating Center Dropdown</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Barrackpore HQ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> generates distinct branches in cell <code className="text-amber-300 font-mono">P2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =SORT(UNIQUE(TRIM(C2:C21)))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Data Validation source set to <code className="text-emerald-400 font-mono">=$P$2#</code> presents a sanitized 4-city dropdown.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Cascading Branch → Trainer Dropdown</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Operations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> builds a trainer dropdown in cell <code className="text-amber-300 font-mono">B2</code> dependent on Branch chosen in <code className="text-amber-300 font-mono">A2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                L2: =SORT(UNIQUE(FILTER(MasterTable[Trainer], MasterTable[Branch]=A2)))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Setting B2 validation to <code className="text-sky-300 font-mono">=$L$2#</code> cascades dynamically without INDIRECT!
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Prepending 'All' for Executive Filters</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur MIS</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> creates an executive filter dropdown with an "All" master option:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =VSTACK("All", SORT(UNIQUE(MasterTable[Course_Track])))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Validation list displays 'All' as the 1st option followed by all courses.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Composite Name & Branch Dropdowns</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Training</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> concatenates candidate names with center locations for descriptive selection:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORT(UNIQUE(B2:B21 & " (" & C2:C21 & ")"))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Displays 'Swadeep Roy (Barrackpore)' in the dropdown directly!
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
            <span className="text-sky-400">📋</span> 3-Step Setup for Dynamic Spilled Dropdowns
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-amber-950 text-amber-400 font-bold flex items-center justify-center border border-amber-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Place Feeder Formula on Calculation Sheet</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">J2</code>, write <code className="text-emerald-400 font-mono">=SORT(UNIQUE(TRIM(Table1[Branch])))</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Open Data Validation & Select List</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Select your input cell → Ribbon: <em>Data → Data Validation</em> → Set <em>Allow: List</em>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Enter =$J$2# in the Source Box</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Type <code className="text-amber-300 font-mono">=$J$2#</code>. The <code className="text-emerald-400 font-mono">#</code> operator ensures the dropdown captures the full dynamic range!
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
              <span className="text-rose-400">⚠️</span> Common Dynamic Validation Pitfalls & Fixes
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
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Omitted '#' in Validation Source</td>
                  <td className="py-3.5 px-4 text-slate-300">Dropdown shows only 1 single option.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Always append <code className="text-amber-300 font-mono">#</code> to the origin cell: <code className="text-sky-300 font-mono">=$J$2#</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Feeder Formula Blocked (#SPILL!)</td>
                  <td className="py-3.5 px-4 text-slate-300">Dropdown displays '#SPILL!' as its choice.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all obstructing cells below the feeder formula in cell J2.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Relative Reference Shift on Copy</td>
                  <td className="py-3.5 px-4 text-slate-300">Copied dropdown cells show empty lists.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Use absolute dollar signs: <code className="text-sky-300 font-mono">=$J$2#</code> rather than <code className="text-slate-400 font-mono">=J2#</code>.</td>
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
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">NAME MANAGER</span>
                <span>Named Range Binding</span>
              </div>
              <p className="text-slate-300">
                Define Name <code className="text-emerald-400 font-mono">CityList</code> with Refers To <code className="text-amber-300 font-mono">=$J$2#</code>. Set Data Validation Source to <code className="text-sky-300 font-mono">=CityList</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">EXCLUDE USED</span>
                <span>Self-Excluding Candidate Lists</span>
              </div>
              <p className="text-slate-300">
                Filter out already chosen candidates: <code className="text-emerald-400 font-mono">=FILTER(MasterList, ISNA(MATCH(MasterList, SelectedCol, 0)))</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why Absolute Dollar Signs ($) are Crucial</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                If you enter <code className="text-amber-300 font-mono">=J2#</code> and copy the dropdown from cell <code className="text-slate-300 font-mono">B2</code> down to <code className="text-slate-300 font-mono">B10</code>, the relative reference shifts to <code className="text-rose-400 font-mono">=J10#</code>. Why does <code className="text-emerald-400 font-mono">=$J$2#</code> protect your dropdowns across all rows?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Excel 365 Auto-Completes</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that when you bind Data Validation to dynamic arrays in Excel 365, typing characters directly into the cell filters the dropdown list in real time!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Dynamic Validation Lists & A2# Syntax FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Banish volatile OFFSET named ranges and INDIRECT hacks from your spreadsheets forever! In Barrackpore and Kolkata corporate systems, generate your feeder lists with =SORT(UNIQUE(TRIM(Column))) and point Data Validation directly to =$OriginCell#. It creates self-expanding, auto-completing dropdowns with 100% stability!"
            }
          />
        </div>
      </div>
    </div>
  );
}
