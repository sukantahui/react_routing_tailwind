"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Multi-Tier Sorting · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The SORTBY Function
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Auxiliary Column Sorting
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Multi-Level Custom Sorting with SORTBY Based on Auxiliary Columns
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When single-column sorting is not enough, <strong className="text-indigo-300 font-mono">SORTBY</strong> unlocks true multi-tier hierarchical sorting (primary, secondary, and tertiary levels). 
            Crucially, SORTBY allows you to sort data by columns or custom calculation expressions that are 
            <strong className="text-emerald-300"> completely omitted</strong> from the final returned output table. 
            Master custom priority ranking via <code className="text-amber-300 font-mono">MATCH()</code>, random shuffling with <code className="text-sky-300 font-mono">RANDARRAY()</code>, 
            and multi-tier executive payroll structuring.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Multi-Tier Tiers:</strong> Group by Dept, sort by Salary</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Auxiliary Columns:</strong> Sort by hidden calculation fields</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Custom Sequences:</strong> Grade ranks via <code className="font-mono text-amber-300">MATCH()</code></span>
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
              <span className="text-indigo-400">⚡</span> Formula Anatomy: =SORTBY()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: SORTBY(array, by_array1, [order1], [by_array2], [order2], ...)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-indigo-300">
            <span className="text-slate-500">// Multi-Level SORTBY Signature:</span>
            <div className="mt-1 text-white font-bold">
              =SORTBY(<span className="text-amber-300">array</span>, <span className="text-sky-300">by_array1</span>, <span className="text-emerald-400">[order1]</span>, <span className="text-purple-300">[by_array2]</span>, <span className="text-emerald-400">[order2]</span>, ...)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Real-World Formula:</span>{" "}
              <code className="text-emerald-400">=SORTBY(A2:G20, C2:C20, 1, F2:F20, -1)</code> (Dept A-Z, then CTC High-to-Low)
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
                  <td className="py-3 px-4 text-slate-400">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The data range to return. Does not need to include the sorting columns.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">by_array1</td>
                  <td className="py-3 px-4 text-slate-400">Column / Range</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The primary sorting column or array. Must match the exact row count of <code className="text-amber-300">array</code>.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[order1]</td>
                  <td className="py-3 px-4 text-slate-400">Integer (1 / -1)</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">1 for Ascending (A-Z, lowest first); -1 for Descending (Z-A, highest first).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">[by_array2...]</td>
                  <td className="py-3 px-4 text-slate-400">Column / Range</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Secondary sorting column to break ties within primary categories (supports up to 127 tiers).</td>
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
            <span className="text-indigo-400">🔬</span> Conceptual Mechanics: Multi-Tier Tie-Breaking
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In corporate data architectures, single-column sorting often produces cluttered tables because records with identical categories appear in arbitrary entry order.
            </p>
            <p>
              When executing <code className="text-indigo-300 font-mono">=SORTBY(Data, Dept, 1, Salary, -1)</code>, Excel performs multi-pass sorting in compiled memory:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Primary Grouping:</strong> All rows are partitioned alphabetically by Department (<code className="text-sky-300 font-mono">Corporate Finance</code>, <code className="text-sky-300 font-mono">Data Analytics</code>, <code className="text-sky-300 font-mono">Tax & Audit</code>).</li>
              <li><strong>Secondary Tie-Breaking:</strong> Within each separate department block, Excel re-orders rows by Annual CTC descending (-1), so the highest paid consultant in that department appears at the top.</li>
              <li><strong>External Projection:</strong> If the output <code className="text-amber-300 font-mono">array</code> only requests Employee Names, the formula returns a clean 1-column list ordered by multi-tier department hierarchy!</li>
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
              <span className="text-teal-400">📐</span> 2-Tier Hierarchical Sorting Engine
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Department (Asc) → CTC (Desc)
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing how SORTBY groups by primary category first, then orders by secondary metric within each group.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern6" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="280" fill="url(#gridPattern6)" rx="16" />

              {/* Group 1: Corporate Finance */}
              <g transform="translate(30, 20)">
                <rect x="0" y="0" width="330" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="8" y="8" width="314" height="26" rx="6" fill="#0c4a6e" />
                <text x="165" y="25" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Department: Corporate Finance (Tier 1 Asc)</text>

                <rect x="15" y="42" width="300" height="26" rx="4" fill="#0369a1" />
                <text x="25" y="59" fill="#ffffff" fontSize="10" fontWeight="bold">#1. Tuhina · ₹7,80,000 (Highest CTC)</text>

                <rect x="15" y="74" width="300" height="26" rx="4" fill="#1e293b" />
                <text x="25" y="91" fill="#e2e8f0" fontSize="10">#2. Sourav · ₹6,40,000</text>
              </g>

              {/* Group 2: Data Analytics */}
              <g transform="translate(30, 145)">
                <rect x="0" y="0" width="330" height="115" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="8" y="8" width="314" height="26" rx="6" fill="#581c87" />
                <text x="165" y="25" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">Department: Data Analytics (Tier 1 Asc)</text>

                <rect x="15" y="42" width="300" height="26" rx="4" fill="#7e22ce" />
                <text x="25" y="59" fill="#ffffff" fontSize="10" fontWeight="bold">#1. Abhronila · ₹8,20,000 (Highest CTC)</text>

                <rect x="15" y="74" width="300" height="26" rx="4" fill="#1e293b" />
                <text x="25" y="91" fill="#e2e8f0" fontSize="10">#2. Priya · ₹7,20,000</text>
              </g>

              {/* Arrow */}
              <g stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 380 135 L 430 135" />
              </g>

              {/* Output Spilled Grid */}
              <g transform="translate(450, 20)">
                <rect x="0" y="0" width="280" height="240" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="264" height="26" rx="6" fill="#047857" />
                <text x="140" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">=SORTBY(Data, Dept, 1, CTC, -1)</text>

                <rect x="15" y="42" width="250" height="24" rx="4" fill="#059669" />
                <text x="25" y="58" fill="#ffffff" fontSize="9" fontWeight="bold">Tuhina · Finance · ₹7,80,000</text>

                <rect x="15" y="72" width="250" height="24" rx="4" fill="#047857" />
                <text x="25" y="88" fill="#e2e8f0" fontSize="9">Sourav · Finance · ₹6,40,000</text>

                <rect x="15" y="102" width="250" height="24" rx="4" fill="#059669" />
                <text x="25" y="118" fill="#ffffff" fontSize="9" fontWeight="bold">Abhronila · Analytics · ₹8,20,000</text>

                <rect x="15" y="132" width="250" height="24" rx="4" fill="#047857" />
                <text x="25" y="148" fill="#e2e8f0" fontSize="9">Priya · Analytics · ₹7,20,000</text>

                <rect x="15" y="162" width="250" height="24" rx="4" fill="#059669" />
                <text x="25" y="178" fill="#ffffff" fontSize="9" fontWeight="bold">Swadeep · Tax · ₹8,50,000</text>

                <text x="140" y="215" fill="#6ee7b7" fontSize="9" textAnchor="middle">Structured Enterprise Hierarchy</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Multi-Tier Hierarchy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the staff compensation dataset below or download the practice workbook to test multi-tier SORTBY in desktop Excel.
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
              sheetName="EX1606"
              title="Employee Compensation & Hierarchy Register"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of SORTBY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 1: Dept & Compensation Hierarchy</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Barrackpore Corporate HR</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> groups employees by Department (A-Z), and ranks salaries within each group from highest to lowest. In cell <code className="text-amber-300 font-mono">I2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                =SORTBY(A2:G11, C2:C11, 1, F2:F11, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills a structured departmental payroll hierarchy in one single formula.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Custom Appraisal Grade Sorting</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Annual Review</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> sorts staff by performance grade where <code className="text-amber-300">"A+" > "A" > "B+" > "B"</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =SORTBY(A2:G11, MATCH(G2:G11, {"A+","A","B+","B"}, 0), 1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> All A+ top performers are listed first, followed by A, B+, and B.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Random Shuffle for Mock Interviews</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Exam Center</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> randomizes candidate interview orders without bias:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =SORTBY(B2:B11, RANDARRAY(ROWS(B2:B11)))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Shuffles student names randomly on every sheet refresh.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Hidden Metric External Sorting</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Management</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> outputs only Employee Name and Branch, but sorts them by Confidential Annual CTC:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORTBY(B2:C11, F2:F11, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills only columns B & C, ordered by confidential column F without exposing salary values!
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
            <span className="text-sky-400">📋</span> 3-Step Procedure for Multi-Tier Custom Sorting
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Select Target Output Columns for `array`</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Pass only the columns you wish to display (e.g. <code className="text-amber-300 font-mono">A2:G11</code> for all data or <code className="text-amber-300 font-mono">B2:C11</code> for names and branches only).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Add Pairs of (by_array, order)</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Specify primary sort criteria: <code className="text-sky-300 font-mono">C2:C11, 1</code> (Dept Ascending), followed by secondary criteria: <code className="text-emerald-400 font-mono">F2:F11, -1</code> (Salary Descending).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Verify Dimension Height Equality</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Verify that <code className="text-amber-300 font-mono">array</code>, <code className="text-sky-300 font-mono">by_array1</code>, and <code className="text-emerald-400 font-mono">by_array2</code> all start at row 2 and end at row 11 to prevent dimension errors.
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
              <span className="text-rose-400">⚠️</span> Common SORTBY Pitfalls & Fixes
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
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Mismatched Array Heights</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#VALUE! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure <code className="text-sky-300 font-mono">by_array</code> has the exact same row count (e.g. 10 rows) as the primary <code className="text-sky-300 font-mono">array</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Unmatched Grade in MATCH()</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#N/A Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure all text variations are present in the custom array: <code className="text-sky-300 font-mono">{"A+","A","B+","B"}</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Collision</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all obstructing values and unmerge cells in the destination perimeter.</td>
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
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">ABS</span>
                <span>Sort by Absolute Variance</span>
              </div>
              <p className="text-slate-300">
                To identify the largest budget variances (both over and under budget): <code className="text-emerald-400 font-mono">=SORTBY(BudgetTable, ABS(VarianceCol), -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">COUNTIF</span>
                <span>Sort by Popularity Rank</span>
              </div>
              <p className="text-slate-300">
                To sort unique courses by total student enrollment count: <code className="text-emerald-400 font-mono">=SORTBY(UniqueCourses#, COUNTIF(MasterLogs, UniqueCourses#), -1)</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why SORTBY Beats Helper Columns</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                In legacy Excel, sorting by surname required adding a formula column for `=RIGHT(...)` or `=MID(...)`. With SORTBY, <code className="text-emerald-400 font-mono">=SORTBY(A2:A20, TEXTAFTER(A2:A20, " "), 1)</code> performs the text extraction and sorting entirely in memory with zero helper columns!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Ties are Resolved</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                If two employees have identical departments AND identical salaries, SORTBY preserves their original relative order from the raw register without arbitrary shifting.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The SORTBY Function & Multi-Level Sorting FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "SORTBY is the gold standard for executive compensation, departmental hierarchy, and custom appraisal ranking across Barrackpore and Kolkata corporate hubs. Master the MATCH() custom priority pattern to rank non-alphabetical categories (like Seniority or Priority) effortlessly with zero helper columns!"
            }
          />
        </div>
      </div>
    </div>
  );
}
