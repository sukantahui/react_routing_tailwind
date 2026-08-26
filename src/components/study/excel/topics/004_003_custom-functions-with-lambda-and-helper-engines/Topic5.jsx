"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/lambda_master.xlsx?url";
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
              ⚡ Computational Optimization · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Optimize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Creating Local Scoped Variables with LET to Maximize Performance
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In complex financial modeling, repeating the same sub-calculation (like an expensive <code className="text-amber-300 font-mono">XLOOKUP</code>, 
            power factor, or tax bracket check) multiple times in one formula degrades workbook performance and makes formulas unreadable. 
            The <code className="text-purple-300 font-mono font-bold">LET</code> function allows modelers to declare 
            <strong>locally scoped variables</strong> in compiled C++ RAM—evaluating heavy expressions once, eliminating helper columns, 
            and delivering sub-millisecond calculation speeds.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Zero Redundant Math:</strong> Evaluate once, reuse in RAM</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Eliminate Helper Columns:</strong> Complete ETL in 1 cell</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Self-Documenting:</strong> Named variables replace cryptic cell addresses</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =LET()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              2N + 1 Argument Rule (Odd Total Args)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Standard Formula Structure</span>
            <div className="mt-1 text-white font-bold">
              =LET(<span className="text-amber-300">name1</span>, <span className="text-sky-300">val1</span>, [<span className="text-yellow-300">name2</span>, <span className="text-sky-300">val2</span>, ...], <span className="text-emerald-300">final_calculation</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Real-World Loan EMI Calculation:</span> <br />
              <span className="text-emerald-400 font-bold">
                =LET(P, D5, r, E5/12, n, F5, emi, P*r*(1+r)^n/((1+r)^n-1), HSTACK(emi, emi*n, (emi*n)-P))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter Pair</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Rules & Behavioral Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">name1..126</td>
                  <td className="py-3 px-4 text-purple-300">Variable Identifier</td>
                  <td className="py-3 px-4 text-slate-400">Up to 126 names</td>
                  <td className="py-3 px-4 font-sans text-slate-300">No spaces, cannot match cell references (e.g. C2) or native functions (e.g. SUM).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">name_value1..126</td>
                  <td className="py-3 px-4 text-sky-300">Value / Expression</td>
                  <td className="py-3 px-4 text-slate-400">1 per name</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Can evaluate scalars, ranges, arrays, or reference earlier declared variables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Final Return</td>
                  <td className="py-3 px-4 text-slate-400">Final Argument</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Evaluates and returns the final scalar or dynamic spilled array result.</td>
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
              <span className="text-emerald-400">🔬</span> Memory Caching Mechanics & Sequential Evaluation
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              C++ RAM Allocation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Sub-Millisecond RAM Caching
              </h3>
              <p className="leading-relaxed">
                When you define <code className="text-amber-300 font-mono">emi = P*r*(1+r)^n/((1+r)^n-1)</code>, Excel computes this complex exponential calculation 
                <strong>exactly once</strong> in volatile memory. When computing Total Payment (<code className="text-emerald-300 font-mono">emi*n</code>) and Total Interest (<code className="text-emerald-300 font-mono">(emi*n)-P</code>), 
                Excel retrieves the cached value from RAM in zero nanoseconds!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                1 Heavy Calculation &rarr; Infinite Instant Memory Reads
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Sequential Left-to-Right Scoping
              </h3>
              <p className="leading-relaxed">
                LET evaluates variable assignments sequentially from left to right. 
                Later variables can freely reference earlier variables: <br />
                <code className="text-emerald-300 font-mono">P = 500k &rarr; r = 8.5%/12 &rarr; emi = f(P, r) &rarr; total = emi*n</code>. 
                All variables are automatically discarded when calculation completes, preventing memory bloat.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Sequential Dependency Graph in Local Scope
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Eliminating Helper Columns Completely
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional spreadsheets require 5 intermediate helper columns (Monthly Rate, Exponent Factor, EMI, Total Repayment, Total Interest). 
              With LET, all intermediate transformations happen internally in RAM, and <code className="text-violet-300 font-mono">HSTACK</code> spits out 
              the clean 3-column result directly into your report!
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
              <span className="text-purple-400">📐</span> Visual LET Memory Allocation & Pipeline Flow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              RAM Variable Lifecycle
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how LET sequentially creates named variables in memory and bundles them into a multi-column spilled output:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sequential Variables (Left) */}
              <rect x="25" y="30" width="240" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="240" height="34" rx="14" fill="#7E22CE" fillOpacity="0.3" />
              <text x="145" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LET LOCAL SCOPE (RAM)</text>

              <g transform="translate(40, 75)">
                <rect width="210" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="15" y="18" fill="#FDE047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">1. P = ₹500,000</text>

                <rect y="34" width="210" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="15" y="52" fill="#38BDF8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">2. r = 8.5% / 12 = 0.007083</text>

                <rect y="68" width="210" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="15" y="86" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" fontFamily="monospace">3. n = 36 months</text>

                <rect y="102" width="210" height="36" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="15" y="120" fill="#F5D0FE" fontSize="9" fontWeight="bold" fontFamily="monospace">4. emi = P*r*(1+r)^n/...</text>
                <text x="15" y="132" fill="#F5D0FE" fontSize="8.5" fontFamily="monospace">&rarr; Computed ONCE: ₹15,781</text>
              </g>

              <rect x="40" y="225" width="210" height="50" rx="6" fill="#065F46" fillOpacity="0.2" stroke="#10B981" />
              <text x="145" y="245" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Millisecond Speed</text>
              <text x="145" y="261" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">0 Redundant Recalculations</text>

              {/* Arrow */}
              <path d="M 280 160 L 350 160" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="355,160 345,155 345,165" fill="#A855F7" />

              {/* Calculation Block (Center) */}
              <rect x="360" y="40" width="220" height="240" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="360" y="40" width="220" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="470" y="62" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FINAL CALCULATION</text>

              <g transform="translate(375, 90)">
                <rect width="190" height="60" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="22" fill="#FDE047" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">HSTACK(</text>
                <text x="95" y="38" fill="#38BDF8" fontSize="9.5" textAnchor="middle" fontFamily="monospace">emi,</text>
                <text x="95" y="52" fill="#A7F3D0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">emi*n, (emi*n)-P)</text>
              </g>

              <text x="470" y="180" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">Reuses Cached 'emi'</text>
              <text x="470" y="198" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Total = ₹15,781 * 36 = ₹568k</text>
              <text x="470" y="216" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Interest = ₹568k - ₹500k = ₹68k</text>
              <text x="470" y="245" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 3 Metrics in 1 Formula</text>

              {/* Arrow */}
              <path d="M 595 160 L 655 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="660,160 650,155 650,165" fill="#10B981" />

              {/* Spilled Result (Right) */}
              <rect x="665" y="30" width="160" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="665" y="30" width="160" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="745" y="52" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SPILLED OUTPUT</text>

              <g transform="translate(675, 80)">
                <rect width="140" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="70" y="20" fill="#A7F3D0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">EMI: ₹15,781</text>

                <rect y="38" width="140" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="70" y="58" fill="#A7F3D0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Total: ₹568,116</text>

                <rect y="76" width="140" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="70" y="96" fill="#A7F3D0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Interest: ₹68,116</text>
              </g>

              <rect x="675" y="205" width="140" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="745" y="230" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spills 3 Columns</text>
              <text x="745" y="250" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">1 Row x 3 Columns</text>
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
                Explore the corporate loan portfolio dataset below or download the master workbook to test <code className="text-purple-300 font-mono">LET</code> in Microsoft Excel.
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
            sheetName="Topic5_LET_Variables"
            title="Loan Portfolio Schedule (Principal, Annual Rate %, Tenure Months)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Banking Amortization</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Branch</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Cell Loan EMI & Interest Breakdown
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Loan Officer <strong>Swadeep Banerjee</strong> writes: 
                <code className="text-emerald-300 font-mono">=LET(P, D5, r, E5/12, n, F5, emi, P*r*(1+r)^n/((1+r)^n-1), HSTACK(ROUND(emi,2), ROUND(emi*n,2), ROUND((emi*n)-P,2)))</code>. 
                This calculates Monthly EMI, Total Repayment, and Total Interest in 1 cell, spilling across 3 columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =LET(...) &rarr; Spills [₹15,781, ₹568,116, ₹68,116]
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Expensive XLOOKUP Optimization</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Caching Remote Customer Master Data
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Manager <strong>Tuhina Mukherjee</strong> caches remote table lookups: 
                <code className="text-amber-300 font-mono">=LET(cust, XLOOKUP(A2, Master!A:A, Master!B:E), IF(ISBLANK(cust), "Record Missing", cust))</code>. 
                Instead of executing 4 separate disk lookups, LET performs 1 lookup in memory and returns all 4 fields.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                1 In-Memory Lookup &rarr; 400% Faster Workbook Calculation
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Ratio Analysis</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Altman Z-Score Corporate Health Model
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Abhronila Sengupta</strong> builds an Altman Z-score predictor: 
                <code className="text-indigo-300 font-mono">=LET(wc_ta, B2/C2, re_ta, D2/C2, ebit_ta, E2/C2, me_tl, F2/G2, s_ta, H2/C2, 1.2*wc_ta + 1.4*re_ta + 3.3*ebit_ta + 0.6*me_tl + 0.999*s_ta)</code>. 
                Clear financial variable names eliminate formula errors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Altman Z-Score Model &rarr; Crystal-Clear Financial Readability
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Tax Pipeline</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Branch Tax Consolidation in RAM
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Auditor <strong>Susmita Roy</strong> consolidates 3 branches: 
                <code className="text-amber-300 font-mono">=LET(b1, Barrackpore!A2:D20, b2, Shyamnagar!A2:D20, b3, Naihati!A2:D20, raw, VSTACK(b1, b2, b3), FILTER(raw, CHOOSECOLS(raw, 4)&gt;50000))</code>. 
                Zero helper sheets required.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                In-Memory ETL Pipeline: VSTACK + FILTER in 1 Formula
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
              <span className="text-purple-400">🪜</span> Step-by-Step LET Refactoring Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Repeated Sub-Calculations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G5</code>, observe the legacy EMI formula: <br />
                  <code className="text-rose-400 font-mono text-xs">=D5*(E5/12)*(1+E5/12)^F5/((1+E5/12)^F5-1)</code>. Notice how <code className="text-amber-300 font-mono">E5/12</code> and <code className="text-amber-300 font-mono">(1+E5/12)^F5</code> repeat 3 times!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare Named Variables in LET</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Assign inputs to clean variables: <code className="text-emerald-400 font-mono">=LET(P, D5, r, E5/12, n, F5, ...)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Define Intermediate Variables</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add <code className="text-sky-300 font-mono">emi, P * r * (1+r)^n / ((1+r)^n - 1)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Output Multiple Metrics with HSTACK</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Final calculation: <code className="text-emerald-400 font-mono">HSTACK(emi, emi * n, (emi * n) - P)</code>. Press Enter & watch 3 columns spill instantly!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NAME?</td>
                  <td className="py-3 px-4 text-slate-300">Typo in a variable name or referenced a variable before declaring it.</td>
                  <td className="py-3 px-4 text-slate-400">Check spelling of variable names in LET.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure every variable is declared to the left of where it is used.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Syntax Error (Even Args)</td>
                  <td className="py-3 px-4 text-slate-300">Provided an even number of arguments; forgot the final calculation argument.</td>
                  <td className="py-3 px-4 text-slate-400">Total arguments in LET must be odd: 2N + 1.</td>
                  <td className="py-3 px-4 text-emerald-400">Add the final calculation expression at the end of the LET formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Variable Collision</td>
                  <td className="py-3 px-4 text-slate-300">Named a variable like 'C2' or 'SUM' colliding with cell addresses or functions.</td>
                  <td className="py-3 px-4 text-slate-400">Excel highlights invalid identifier.</td>
                  <td className="py-3 px-4 text-emerald-400">Use descriptive variable names like <code className="text-emerald-400 font-mono">price_val, gross_amt</code>.</td>
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
              Optimization Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Alt + Enter</kbd>
                <span>Multi-Line Formulas</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press <strong>Alt + Enter</strong> inside the formula bar to write each LET variable on its own line like clean software code!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Variable Debugging</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight any variable name inside LET and press <strong>F9</strong> to inspect its intermediate value in RAM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">In-Line LAMBDA</span>
                <span>Local Helpers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Store local helper closures inside LET: <code className="text-emerald-300 font-mono">=LET(sqr, LAMBDA(x, x^2), sqr(9))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Sanitize with IFERROR</span>
                <span>Defensive Caching</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Wrap lookups in IFERROR: <code className="text-sky-300 font-mono">cust, IFERROR(XLOOKUP(...), "N/A")</code>.
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
                <strong>Reflect on calculation complexity:</strong> When an XLOOKUP or compound power calculation is referenced 4 times in an IF statement, why does wrapping it in <code className="text-purple-300 font-mono">LET</code> reduce computation time by up to 75%?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine spreadsheet hygiene:</strong> How does performing multi-step transformations inside <code className="text-purple-300 font-mono">LET</code> eliminate the need for 5 cluttered helper columns across 50,000 rows?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider synergy with LAMBDA:</strong> Why is nesting <code className="text-purple-300 font-mono">LET</code> inside custom <code className="text-emerald-300 font-mono">LAMBDA</code> functions considered the gold standard of modern financial engineering?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Local Scoped Variables with LET — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "The LET function is your most powerful tool for formula optimization and spreadsheet hygiene. By declaring locally scoped variables, you eliminate helper column clutter, guarantee sub-millisecond execution by evaluating expensive sub-formulas only once in RAM, and turn unreadable legacy formulas into elegant, maintainable code pipelines. Use Alt+Enter to format each LET variable on its own line!"
            }
          />
        </div>
      </div>
    </div>
  );
}
