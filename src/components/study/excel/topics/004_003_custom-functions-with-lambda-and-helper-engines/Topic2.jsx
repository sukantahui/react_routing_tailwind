"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
              ⚡ Production Deployment · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Deploy
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent leading-tight">
            Registering & Naming LAMBDA Functions in Excel Name Manager
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            After verifying your logic with immediate execution in a cell, the definitive step in functional spreadsheet engineering 
            is publishing the function into <strong>Excel Name Manager (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+F3</kbd>)</strong>. 
            Registering a LAMBDA creates a permanent, named custom function that operates globally across all worksheets—enabling 
            single-point formula maintenance and full corporate governance without VBA code.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Global Scope:</strong> Use anywhere like native formulas</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Single Point of Truth:</strong> Edit once, update everywhere</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Clean Call Syntax:</strong> =FX_GROSS_SALARY(E5, F5, G5)</span>
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
              <span className="text-purple-400">⚡</span> Name Manager Configuration Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Shortcut: Ctrl + F3
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800 pb-2">
              <span>Name Manager Dialog Configuration</span>
              <span className="text-emerald-400">Production Definition</span>
            </div>
            <div>
              <span className="text-amber-300">Name:</span> <span className="text-white font-bold">FX_GROSS_SALARY</span>
            </div>
            <div>
              <span className="text-sky-300">Scope:</span> <span className="text-white font-bold">Workbook</span>
            </div>
            <div>
              <span className="text-purple-300">Comment:</span> <span className="text-slate-300">"Computes gross salary: basic * (1 + da_pct + hra_pct)"</span>
            </div>
            <div>
              <span className="text-emerald-300">Refers To:</span> <span className="text-emerald-400 font-bold">=LAMBDA(basic, da, hra, basic * (1 + da + hra))</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Field</th>
                  <th className="py-3 px-4">Setting</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Architectural Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">Name</td>
                  <td className="py-3 px-4 text-slate-300">FX_PREFIX_NAME</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">No spaces, no cell names (e.g. C2), use corporate prefix (FX_ or CORP_).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">Scope</td>
                  <td className="py-3 px-4 text-slate-300">Workbook</td>
                  <td className="py-3 px-4 text-emerald-400">Recommended</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Allows invocation from every worksheet in the file without sheet prefixes.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">Comment</td>
                  <td className="py-3 px-4 text-slate-300">Documentation text</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Appears in Excel autocomplete formula tooltips for end-user guidance.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">Refers To</td>
                  <td className="py-3 px-4 text-emerald-400">=LAMBDA(...)</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Do NOT include trailing test argument parentheses (args)! Paste only raw LAMBDA.</td>
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
              <span className="text-emerald-400">🔬</span> Name Manager Symbol Table & Memory Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Compiled Symbol Table
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Single Point of Truth Architecture
              </h3>
              <p className="leading-relaxed">
                In legacy workbooks, if a tax rate or allowance formula changed, analysts had to locate and update formulas across thousands of cells. 
                With Name Manager registration, updating the LAMBDA formula once instantly cascades the new logic across all 10,000 dependent cells in RAM!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                1 Edit in Name Manager &rarr; 10,000 Cells Instantly Updated
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Formula Deduplication & Compression
              </h3>
              <p className="leading-relaxed">
                Instead of storing 200 characters of formula text inside every grid cell, Excel stores the full AST (Abstract Syntax Tree) 
                once in the workbook's name table. Grid cells only store lightweight function pointers (<code className="text-emerald-300 font-mono">=FX_PAY(A2)</code>), shrinking file sizes.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Zero Formula Duplication · Minimal Memory Footprint
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> The Pitfall of Trailing Arguments in Name Manager
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When copying your formula from an active worksheet cell into Name Manager's 'Refers To' box, 
              <strong>always remove the trailing argument parentheses</strong> (e.g. <code className="text-rose-400 font-mono">(C5, D5, E5)</code>). 
              If you leave arguments in 'Refers To', Name Manager evaluates the formula once and stores a static number rather than a reusable callable function!
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
              <span className="text-purple-400">📐</span> Visual Name Manager Registration & Consumption Flow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Architecture Schematic
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            See how registering in Name Manager distributes custom functions across all departmental sheets:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center Hub: Name Manager */}
              <rect x="25" y="40" width="280" height="260" rx="14" fill="#0F172A" stroke="#7E22CE" strokeWidth="2" />
              <rect x="25" y="40" width="280" height="36" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="165" y="64" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXCEL NAME MANAGER (Ctrl+F3)</text>

              <g transform="translate(40, 90)">
                <rect width="250" height="32" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="15" y="20" fill="#FDE047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Name: FX_GROSS_SALARY</text>

                <rect y="40" width="250" height="32" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="15" y="60" fill="#38BDF8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Scope: Workbook</text>

                <rect y="80" width="250" height="52" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="15" y="100" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">Refers To: =LAMBDA(b, da, hra,</text>
                <text x="15" y="118" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">b * (1 + da + hra))</text>
              </g>

              <rect x="40" y="235" width="250" height="48" rx="6" fill="#065F46" fillOpacity="0.2" stroke="#10B981" />
              <text x="165" y="255" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Single Point of Definition</text>
              <text x="165" y="271" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Stored in workbook dictionary</text>

              {/* Fan-Out Arrows */}
              <path d="M 315 120 L 450 80" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 315 170 L 450 170" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 315 220 L 450 260" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />

              {/* Consumer Sheets (Right) */}
              <g transform="translate(460, 40)">
                {/* Consumer 1 */}
                <rect width="360" height="70" rx="10" fill="#0F172A" stroke="#38BDF8" />
                <text x="15" y="22" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Sheet: 'Barrackpore_Payroll'</text>
                <text x="15" y="42" fill="#E2E8F0" fontSize="9.5" fontFamily="monospace">=FX_GROSS_SALARY(E5, F5, G5)</text>
                <text x="15" y="58" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">&rarr; Returns ₹68,850.00 for Swadeep</text>

                {/* Consumer 2 */}
                <rect y="85" width="360" height="70" rx="10" fill="#0F172A" stroke="#10B981" />
                <text x="15" y="107" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Sheet: 'Shyamnagar_Operations'</text>
                <text x="15" y="127" fill="#E2E8F0" fontSize="9.5" fontFamily="monospace">=FX_GROSS_SALARY(E5, F5, G5)</text>
                <text x="15" y="143" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">&rarr; Returns ₹64,260.00 for Tuhina</text>

                {/* Consumer 3 */}
                <rect y="170" width="360" height="70" rx="10" fill="#0F172A" stroke="#F59E0B" />
                <text x="15" y="192" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Sheet: 'Ichapur_Engineering'</text>
                <text x="15" y="212" fill="#E2E8F0" fontSize="9.5" fontFamily="monospace">=FX_GROSS_SALARY(E5, F5, G5)</text>
                <text x="15" y="228" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">&rarr; Returns ₹78,030.00 for Abhronila</text>
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
                Explore the staff payroll dataset below or download the master workbook to test Name Manager custom functions in Microsoft Excel.
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
            sheetName="Topic2_Name_Manager"
            title="Campus Payroll Register (Basic Pay, DA %, HRA % Matrix)"
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
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Multi-Campus Payroll System</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardizing Gross Salary Calculations
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Director <strong>Swadeep Banerjee</strong> saves <code className="text-emerald-300 font-mono">FX_GROSS_SALARY = LAMBDA(b, da, hra, b * (1 + da + hra))</code> in Name Manager with Workbook scope. 
                Payroll clerks in Barrackpore, Shyamnagar, and Ichapur simply call <code className="text-purple-300 font-mono">=FX_GROSS_SALARY(E5, F5, G5)</code>, eliminating messy helper columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =FX_GROSS_SALARY(E5, F5, G5) &rarr; Standardized Across All Campuses
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Corporate Tax Governance</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Updating Corporate Tax Rates in 1 Place
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> registers <code className="text-amber-300 font-mono">FX_TAX_SCHEDULE = LAMBDA(amt, amt * 0.18)</code>. 
                When the government revises the rate to 12%, Tuhina modifies the formula once in Name Manager, and 4,500 active invoice cells update instantaneously!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                1 Edit in Name Manager &rarr; 4,500 Invoices Automatically Updated
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Advisory & Loans</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Modular Function Composition
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Abhronila Sengupta</strong> registers <code className="text-amber-300 font-mono">FX_EMI</code> and calls it inside a larger function: 
                <code className="text-indigo-300 font-mono">FX_TOTAL_INTEREST = LAMBDA(P, r, n, (FX_EMI(P, r, n) * n) - P)</code>. 
                Named LAMBDAs compose cleanly like modular software bricks.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Modular Architecture: FX_TOTAL_INTEREST calls FX_EMI
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Cross-Workbook Library Sharing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Software Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Distributing Corporate Add-Ins (.xlam)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead Engineer <strong>Debangshu Ghosh</strong> bundles 25 verified corporate LAMBDAs into an Excel Add-In (<code className="text-amber-300 font-mono">.xlam</code>). 
                All 50 financial analysts in the company now have access to standardized corporate functions in every workbook they open!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Corporate Add-In: 25 Standardized LAMBDAs Organization-Wide
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
              <span className="text-purple-400">🪜</span> Step-by-Step Name Manager Registration Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Open Name Manager Dialog</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+F3</kbd> (or go to Formulas tab &rarr; Name Manager) &rarr; Click the <strong>New...</strong> button.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Define Name & Set Scope</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the 'Name' box, enter <code className="text-emerald-300 font-mono">FX_GROSS_SALARY</code>. Keep the 'Scope' dropdown set to <strong>Workbook</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Paste LAMBDA in 'Refers to'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the 'Refers to' box at the bottom, paste: <code className="text-emerald-400 font-mono">=LAMBDA(basic, da, hra, basic * (1 + da + hra))</code>. 
                  Add help text in the 'Comment' field &rarr; Click <strong>OK</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Invoke in Worksheet Grid</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Close Name Manager. In cell <code className="text-amber-300 font-mono">H5</code> of your payroll table, type: 
                  <code className="text-emerald-300 font-mono">=FX_GROSS_SALARY(E5, F5, G5)</code>. Press Enter & drag down to calculate all employees!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NAME? (Unknown Identifier)</td>
                  <td className="py-3 px-4 text-slate-300">Typo in the custom function name or name not registered in Name Manager.</td>
                  <td className="py-3 px-4 text-slate-400">Open Name Manager (Ctrl+F3) to verify spelling.</td>
                  <td className="py-3 px-4 text-emerald-400">Check spelling or register the name in Name Manager.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Static Output / No Arguments</td>
                  <td className="py-3 px-4 text-slate-300">Pasted trailing test arguments (e.g. (C5, D5, E5)) into 'Refers to' in Name Manager.</td>
                  <td className="py-3 px-4 text-slate-400">Function behaves like a static scalar rather than a callable function.</td>
                  <td className="py-3 px-4 text-emerald-400">Edit name in Name Manager & remove trailing argument parentheses.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Argument Mismatch)</td>
                  <td className="py-3 px-4 text-slate-300">Passed fewer or more arguments than defined in the parameter list.</td>
                  <td className="py-3 px-4 text-slate-400">Count passed arguments vs defined parameters.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass exact required arguments or use optional brackets [ ].</td>
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
              Name Manager Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl+F3</kbd>
                <span>Name Manager Dialog</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly launch the Name Manager dialog to inspect and edit workbook defined names.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F3</kbd>
                <span>Paste Name Dialog</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press <strong>F3</strong> while writing a formula to view a list of all registered LAMBDA functions and paste them instantly!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Structured References</span>
                <span>Excel Tables</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call named LAMBDAs inside Excel Tables: <code className="text-emerald-300 font-mono">=FX_GROSS([@Basic], [@DA], [@HRA])</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Modular LAMBDAs</span>
                <span>Function Chaining</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have high-level LAMBDAs call smaller helper LAMBDAs to build modular calculation engines.
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
                <strong>Reflect on workbook scope:</strong> Why is setting the scope to 'Workbook' rather than a specific worksheet the recommended industry standard for corporate LAMBDA libraries?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine formula maintenance:</strong> When corporate tax regulations change, how does registering calculations in Name Manager eliminate formula audit risks across enterprise models?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider Name Manager pitfalls:</strong> Why does accidentally including trailing arguments in the 'Refers to' box break function reusability?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Name Manager Registration — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Registering your LAMBDAs in Name Manager (Ctrl+F3) transforms you from a spreadsheet user into a financial software architect. By establishing a centralized library of named, documented functions (FX_GROSS_SALARY, FX_GST_CALC, FX_LOAN_EMI), you eliminate redundant copy-pasting, drastically reduce spreadsheet file size, and provide your entire organization with a clean, auditable single point of truth!"
            }
          />
        </div>
      </div>
    </div>
  );
}
