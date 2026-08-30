"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic14() {
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
    link.download = "lambda_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🏆 Capstone Assessment & Project · Topic 14
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Module 004_003 Graduation
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 6: Design, Synthesize & Master
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Real-World Capstone Project: Building a Custom Corporate Business Function Suite
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the final capstone assessment for <strong>Custom Functions with LAMBDA & Helper Engines</strong>. 
            In this master synthesis project, you will unify every functional component mastered across this module—including 
            <code className="text-purple-300 font-mono">LAMBDA</code> authoring, <code className="text-sky-300 font-mono">LET</code> local scoping, 
            higher-order helper engines (<code className="text-emerald-300 font-mono">MAP</code>, <code className="text-emerald-300 font-mono">BYROW</code>, <code className="text-emerald-300 font-mono">BYCOL</code>, <code className="text-yellow-300 font-mono">MAKEARRAY</code>, <code className="text-purple-300 font-mono">SCAN</code>, <code className="text-pink-300 font-mono">REDUCE</code>), 
            and self-referencing <strong>Recursion</strong>—into a production-grade enterprise software calculation suite.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Full Module Synthesis:</strong> 9 functional engines united</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Production-Grade Logic:</strong> Audited corporate business rules</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Software Architecture:</strong> Zero formula drift & 100% pure functions</span>
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
              <span className="text-purple-400">⚡</span> Capstone Function Suite Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Full Functional Pipeline Architecture
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Capstone Suite 1: Single-Formula Dynamic Loan Amortization Schedule</span>
            <div className="mt-1 text-white font-bold text-xs sm:text-sm">
              <span className="text-amber-300">FX_FIN_AMORT_SCHEDULE</span> = <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">p</span>, <span className="text-yellow-300">r</span>, <span className="text-cyan-300">n</span>, <br />
              &nbsp;&nbsp;<span className="text-emerald-300">LET</span>(rate, r/12, emi, p*rate*(1+rate)^n/((1+rate)^n-1), months, SEQUENCE(n), <br />
              &nbsp;&nbsp;&nbsp;&nbsp;grid, <span className="text-purple-300">MAKEARRAY</span>(n, 3, <span className="text-purple-300">LAMBDA</span>(row, col, <span className="text-emerald-300">CHOOSE</span>(col, row, emi, p*(1+rate)^row - emi*((1+rate)^row-1)/rate))), <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">VSTACK</span>({"{"}"Month", "EMI (₹)", "Balance (₹)"{"}"}, grid)))
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Capstone Module</th>
                  <th className="py-3 px-4">Core Engine Stack</th>
                  <th className="py-3 px-4">Function Identifier</th>
                  <th className="py-3 px-4">Deliverable Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300 font-sans">1. Financial Amortization</td>
                  <td className="py-3 px-4 text-purple-300">LAMBDA + LET + MAKEARRAY + VSTACK</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">FX_FIN_AMORT_SCHEDULE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Spilled full loan amortization schedule table with headers in 1 formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300 font-sans">2. Multi-Branch Consolidation</td>
                  <td className="py-3 px-4 text-purple-300">REDUCE + VSTACK + DROP + INDIRECT</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">FX_TAX_CONSOLIDATE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Consolidates 4 branch worksheets into 1 unified master audit table.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300 font-sans">3. HR Payroll Appraisal</td>
                  <td className="py-3 px-4 text-purple-300">MAP + LAMBDA + LET + AND/OR</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">FX_HR_APPRAISAL_ENGINE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Evaluates 3-parameter non-linear employee incentive bonus tiers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-pink-300 font-sans">4. Organizational Hierarchy</td>
                  <td className="py-3 px-4 text-purple-300">Recursive LAMBDA + XLOOKUP + LET</td>
                  <td className="py-3 px-4 text-pink-300 font-bold">FX_FIND_CEO</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Climbs parent-child reporting chains dynamically to top root executive.</td>
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
              <span className="text-emerald-400">🔬</span> The Modern Excel Functional Programming Paradigm
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Architecture & Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Declarative Software Engineering in Excel
              </h3>
              <p className="leading-relaxed">
                Spreadsheet modeling has evolved from fragile cell-by-cell formulas into formal 
                <strong>functional programming</strong>. By encapsulating business rules in pure, reusable LAMBDA closures, 
                you eliminate thousands of duplicate calculations and guarantee 100% audit consistency across the enterprise.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Pure Functions: Inputs &rarr; Logic &rarr; Spilled Output
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Computational Performance Benchmarks
              </h3>
              <p className="leading-relaxed">
                By leveraging SIMD multi-threaded C++ RAM execution:
                <br />
                • <code className="text-emerald-300 font-mono">SCAN</code> running balances run 50,000x faster than dragged SUM formulas.
                <br />
                • <code className="text-emerald-300 font-mono">MAP</code> calculates complex boolean logic across 100k rows in ~20ms.
                <br />
                • <code className="text-emerald-300 font-mono">REDUCE</code> consolidates multi-sheet tables with zero VBA COM overhead!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Sub-Millisecond Calculation Speeds in Enterprise Workbooks
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> The 5 Golden Rules of Enterprise LAMBDA Design
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-sans">
                <strong className="text-white block mb-1">1. Pure Functions Only</strong>
                Never reference hard-coded worksheet coordinates inside a LAMBDA.
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-sans">
                <strong className="text-white block mb-1">2. Local Variable Caching</strong>
                Always wrap multi-step calculations in LET to evaluate expressions once.
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-sans">
                <strong className="text-white block mb-1">3. Domain Prefixes</strong>
                Enforce FX_FIN_, FX_TAX_, FX_HR_ naming standards.
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-sans">
                <strong className="text-white block mb-1">4. Defensive Input Guards</strong>
                Use ISNUMBER and ISOMITTED to handle boundary edge cases safely.
              </div>
            </div>
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
              <span className="text-purple-400">📐</span> Visual Complete Module Synthesis Taxonomy & Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Complete Module Taxonomy
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Review the complete interconnected ecosystem of custom functions, helper engines, and library governance:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Foundation (Bottom) */}
              <rect x="25" y="270" width="800" height="50" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="300" fill="#E0E7FF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                CORE FOUNDATION: LAMBDA Functional Closures · LET Scoped Memory · Name Manager Registration
              </text>

              {/* Engine Columns */}
              {/* 1. Vector & Iteration */}
              <rect x="25" y="30" width="250" height="225" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="25" y="30" width="250" height="32" rx="10" fill="#0284C7" fillOpacity="0.3" />
              <text x="150" y="51" fill="#BAE6FD" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ITERATION & VECTOR ENGINES</text>

              <g transform="translate(35, 75)" fontFamily="monospace" fontSize="9">
                <rect width="230" height="30" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="18" fill="#38BDF8" fontWeight="bold">MAP(arr1, arr2, LAMBDA)</text>

                <rect y="38" width="230" height="30" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="56" fill="#38BDF8" fontWeight="bold">BYROW(matrix, LAMBDA(r))</text>

                <rect y="76" width="230" height="30" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="94" fill="#38BDF8" fontWeight="bold">BYCOL(matrix, LAMBDA(c))</text>

                <rect y="114" width="230" height="30" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="132" fill="#38BDF8" fontWeight="bold">MAKEARRAY(r, c, LAMBDA)</text>
              </g>

              {/* 2. Folding & Accumulation */}
              <rect x="300" y="30" width="250" height="225" rx="10" fill="#0F172A" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="300" y="30" width="250" height="32" rx="10" fill="#7E22CE" fillOpacity="0.3" />
              <text x="425" y="51" fill="#F3E8FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ACCUMULATION & FOLDING</text>

              <g transform="translate(310, 75)" fontFamily="monospace" fontSize="9">
                <rect width="230" height="46" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="18" fill="#F5D0FE" fontWeight="bold">SCAN(seed, array, LAMBDA)</text>
                <text x="10" y="34" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Linear O(N) Progressive Balances</text>

                <rect y="54" width="230" height="46" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="72" fill="#F5D0FE" fontWeight="bold">REDUCE(seed, array, LAMBDA)</text>
                <text x="10" y="88" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Folding Reductions & VSTACK Tables</text>
              </g>

              {/* 3. Recursion & Governance */}
              <rect x="575" y="30" width="250" height="225" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
              <rect x="575" y="30" width="250" height="32" rx="10" fill="#059669" fillOpacity="0.3" />
              <text x="700" y="51" fill="#A7F3D0" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RECURSION & GOVERNANCE</text>

              <g transform="translate(585, 75)" fontFamily="monospace" fontSize="9">
                <rect width="230" height="46" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="18" fill="#A7F3D0" fontWeight="bold">Recursive LAMBDAs</text>
                <text x="10" y="34" fill="#FDE047" fontSize="8" fontFamily="sans-serif">Hierarchy Rollups & BOM Trees</text>

                <rect y="54" width="230" height="46" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="72" fill="#A7F3D0" fontWeight="bold">Corporate Library (AFE)</text>
                <text x="10" y="88" fill="#FDE047" fontSize="8" fontFamily="sans-serif">Git Versioning & Domain Prefixes</text>
              </g>

              {/* Connecting Lines to Foundation */}
              <line x1="150" y1="255" x2="150" y2="270" stroke="#38BDF8" strokeWidth="2" />
              <line x1="425" y1="255" x2="425" y2="270" stroke="#A855F7" strokeWidth="2" />
              <line x1="700" y1="255" x2="700" y2="270" stroke="#10B981" strokeWidth="2" />
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
                Explore the capstone enterprise master workbook below or download the .xlsx file to test all custom corporate functions in Microsoft Excel.
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
            sheetName="Topic14_Corporate_Project"
            title="Enterprise Capstone Synthesis Suite (Loan Amortization, Branch Consolidation, HR Matrix, Hierarchy Rollup)"
            rowsPerPage={10}
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
              Corporate Capstone Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Deliverable 1 · Commercial Lending</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Loan Amortization Schedule
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Quantitative Analyst <strong>Swadeep Banerjee</strong> writes: 
                <code className="text-emerald-300 font-mono">=FX_FIN_AMORT_SCHEDULE(500000, 0.085, 36)</code>. 
                Spills all 36 monthly payments, interest deductions, principal breakdowns, and balances with headers in a single cell!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Single-Formula Spilled Loan Amortization Engine
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Deliverable 2 · Multi-Branch Audit</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Multi-Worksheet Consolidation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Lead <strong>Tuhina Mukherjee</strong> deploys: 
                <code className="text-amber-300 font-mono">=FX_TAX_CONSOLIDATE({"{"}"Barrackpore", "Shyamnagar", "Ichapur", "Naihati"{"}"})</code>. 
                Consolidates 4 branch worksheets into a single audit master table using REDUCE and VSTACK.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Dynamic Multi-Sheet Consolidation with Zero VBA
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Deliverable 3 · HR Incentive Matrix</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Vector Performance Appraisal Engine
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Director <strong>Abhronila Sengupta</strong> evaluates 1,500 factory workers with: 
                <code className="text-indigo-300 font-mono">=MAP(Attendance, Scores, Output, FX_HR_BONUS_EVAL)</code>, 
                awarding performance bonuses in 15 milliseconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Multi-Vector Evaluation across 1,500 Employees
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Deliverable 4 · Governance & Security</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Centralized Git-Governed Corporate Suite
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Architect <strong>Debangshu Ghosh</strong> publishes the suite as <code className="text-amber-300 font-mono">Corporate_Master_Library_v3.0.xltx</code>, 
                bringing complete software engineering rigor to enterprise Excel operations!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Enterprise Library Deployment via Master Template
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
              <span className="text-purple-400">🪜</span> Step-by-Step Capstone Suite Deployment Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Final Capstone Protocol
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Architect Core Pure Functions with LET</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Design functions to accept explicit parameters and use LET for internal variable caching.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Connect Appropriate Helper Engines</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Deploy MAP for vectors, BYROW/BYCOL for matrices, SCAN for running balances, and REDUCE for table folding.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Register in Name Manager with IntelliSense</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Register all suite functions with <code className="text-purple-300 font-mono">FX_</code> prefixes and embed parameter descriptions in comments.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Execute & Verify Spilled Output in RAM</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Call functions directly in your models. Experience lightning-fast, zero-error calculations across all business departments!
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
              <span className="text-rose-400">⚠️</span> Comprehensive Module Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Master Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Common Root Causes Across Module</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Definitive Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Spill path blocked by existing data or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect dynamic output range.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells in the spill zone.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC!</td>
                  <td className="py-3 px-4 text-slate-300">Nested array returned by MAP/BYROW or empty array in FILTER.</td>
                  <td className="py-3 px-4 text-slate-400">Check if closure returns 1D/2D arrays instead of scalars.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure helper closures return single scalar values per iteration.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NUM!</td>
                  <td className="py-3 px-4 text-slate-300">Recursion exceeded 1,024 frames or MAKEARRAY dimensions &le; 0.</td>
                  <td className="py-3 px-4 text-slate-400">Verify base case in recursive functions.</td>
                  <td className="py-3 px-4 text-emerald-400">Implement defensive depth limiters and check dimension arguments.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NAME?</td>
                  <td className="py-3 px-4 text-slate-300">Custom function not registered in Name Manager or typo in identifier.</td>
                  <td className="py-3 px-4 text-slate-400">Check Name Manager with <kbd className="px-1 text-xs">Ctrl+F3</kbd>.</td>
                  <td className="py-3 px-4 text-emerald-400">Register defined name with Scope = Workbook.</td>
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
              Master Architect Toolkit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Spill Operator (#)</span>
                <span>Referencing Arrays</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reference entire spilled results effortlessly: <code className="text-emerald-300 font-mono">=A5#</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Memory Array Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight any nested LAMBDA expression and press <strong>F9</strong> to inspect it in RAM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Alt + Enter</kbd>
                <span>Formula Indentation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Format complex LET and LAMBDA structures like professional software source code.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl + F3</kbd>
                <span>Name Manager Studio</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly audit, edit, and organize all corporate custom functions.
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
              Capstone Mastery Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on the functional revolution:</strong> How does architecting financial spreadsheets using pure custom LAMBDAs and dynamic arrays eliminate the bugs, formula drift, and audit vulnerabilities of traditional cell-dragged models?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine engine selection:</strong> How do you intuitively choose between <code className="text-sky-300 font-mono">MAP</code>, <code className="text-emerald-300 font-mono">BYROW</code>, <code className="text-amber-300 font-mono">MAKEARRAY</code>, <code className="text-purple-300 font-mono">SCAN</code>, <code className="text-pink-300 font-mono">REDUCE</code>, and <strong>Recursion</strong> for any given analytical problem?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider corporate scalability:</strong> How does maintaining versioned plain-text LAMBDA modules in Git empower quantitative modeling teams to collaborate like modern software engineering teams?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Module 004_003 Capstone Assessment — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Congratulations on completing Module 004_003: Custom Functions with LAMBDA & Helper Engines! You have transformed from a traditional spreadsheet user into an Advanced Financial & Quantitative Spreadsheet Architect. Always treat your spreadsheets as robust software systems: write pure custom functions, eliminate formula drift, leverage higher-order helper engines, and architect models that scale with 100% mathematical integrity across your entire career!"
            }
          />
        </div>
      </div>
    </div>
  );
}
