"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx?url";
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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "009_001_advanced_mathematical_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
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
              📊 Advanced Excel Mathematics · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Ultra Expert Stack
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Taxonomy Level 5: Evaluate
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent leading-snug">
            SUMPRODUCT Function — Multi-Array Mathematical Aggregation & Matrix Calculations
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The <code className="text-sky-300 font-mono">SUMPRODUCT</code> function is the undisputed Swiss Army Knife of pre-dynamic array Excel. 
            It multiplies corresponding components across two or more ranges and sums the resulting products—enabling multi-criteria weighted averages, conditional matrix filtering, and cross-tabulation aggregation without helper columns. In this module, we master <code className="text-sky-300 font-mono">SUMPRODUCT</code> alongside <code className="text-emerald-300 font-mono">PRODUCT</code> and <code className="text-indigo-300 font-mono">SUMSQ</code>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Vectorized Computation:</strong> Native array multiplication</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Zero Helper Columns:</strong> Multi-column calculations on the fly</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Weighted Metrics:</strong> Precision corporate financial modeling</span>
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
              <span className="text-sky-400">⚡</span> Formula Anatomy & Syntax Breakdown
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine Spec: Vectorized Matrix Multiplier
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-sky-300 space-y-2">
            <div className="text-slate-500">// Primary SUMPRODUCT Signature</div>
            <div className="text-white font-bold">
              =SUMPRODUCT(<span className="text-sky-300">array1</span>, <span className="text-emerald-300">[array2]</span>, <span className="text-indigo-300">[array3]</span>, ...)
            </div>
            <div className="text-slate-500 pt-2">// Boolean Conditional Coercion Signature</div>
            <div className="text-amber-300 font-bold">
              =SUMPRODUCT((<span className="text-sky-300">range1 = "Criteria"</span>) * (<span className="text-emerald-300">range2 &gt; threshold</span>) * (<span className="text-indigo-300">values_range</span>))
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Argument</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Required</th>
                  <th className="pb-3 pl-4">Description & Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">array1</td>
                  <td className="py-3 px-4 text-slate-400">Range / Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The first array argument whose components you want to multiply and then add.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[array2, ...]</td>
                  <td className="py-3 px-4 text-slate-400">Range / Array</td>
                  <td className="py-3 px-4 text-slate-400 font-sans font-semibold">Optional (Up to 255)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Array arguments 2 through 255 whose components are multiplied element-by-element with array1.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Return Type:</span>
              <p className="text-slate-300">Scalar Numeric Value (e.g. Total weighted revenue ₹14,25,000).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Dimension Requirement:</span>
              <p className="text-slate-300">All array arguments MUST have identical row and column dimensions; otherwise returns <code className="text-rose-400">#VALUE!</code>.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-emerald-400">🔬</span> Deep Calculation Mechanics & Boolean Vectorization
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Under the hood, Excel evaluates <code className="text-sky-300 font-mono">SUMPRODUCT</code> in three distinct calculation phases:
            </p>
            <ol className="list-decimal list-inside space-y-3 font-mono text-xs sm:text-sm bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <li className="text-slate-200">
                <strong className="text-sky-400">Phase 1: Boolean Evaluation</strong> — Expression <code className="text-amber-300">(A2:A5="Barrackpore")</code> evaluates to array <code className="text-emerald-400 font-bold font-mono">&#123;TRUE, FALSE, TRUE, FALSE&#125;</code>.
              </li>
              <li className="text-slate-200">
                <strong className="text-sky-400">Phase 2: Element-wise Vector Multiplication</strong> — Coercion via multiplication <code className="text-amber-300">&#123;1, 0, 1, 0&#125; * &#123;10, 20, 15, 30&#125; * &#123;500, 400, 600, 700&#125;</code> produces intermediate product vector <code className="text-emerald-400 font-bold font-mono">&#123;5000, 0, 9000, 0&#125;</code>.
              </li>
              <li className="text-slate-200">
                <strong className="text-sky-400">Phase 3: Final Aggregation</strong> — Sums vector elements: <code className="text-emerald-400 font-bold font-mono">5000 + 0 + 9000 + 0 = 14000</code>.
              </li>
            </ol>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">📐</span> Visual Calculation Flow: Vector Multiplication
          </h2>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 750 280" className="w-full max-w-3xl h-auto font-sans">
              {/* Array 1 */}
              <g transform="translate(30, 40)">
                <rect width="140" height="180" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <text x="70" y="28" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">Array 1: Units (D2:D5)</text>
                <rect x="15" y="45" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="64" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">10</text>
                <rect x="15" y="78" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="97" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">25</text>
                <rect x="15" y="111" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="130" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">15</text>
                <rect x="15" y="144" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="163" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">40</text>
              </g>

              {/* Multiply Icon */}
              <text x="200" y="140" textAnchor="middle" fill="#34D399" className="text-2xl font-bold">×</text>

              {/* Array 2 */}
              <g transform="translate(230, 40)">
                <rect width="140" height="180" rx="12" fill="#0F172A" stroke="#34D399" strokeWidth="2" />
                <text x="70" y="28" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">Array 2: Price (E2:E5)</text>
                <rect x="15" y="45" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="64" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹500</text>
                <rect x="15" y="78" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="97" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹800</text>
                <rect x="15" y="111" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="130" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹600</text>
                <rect x="15" y="144" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="163" textAnchor="middle" fill="#F8FAFC" className="text-xs font-mono">₹450</text>
              </g>

              {/* Equals Icon */}
              <text x="400" y="140" textAnchor="middle" fill="#818CF8" className="text-2xl font-bold">=</text>

              {/* Products Vector */}
              <g transform="translate(430, 40)">
                <rect width="140" height="180" rx="12" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
                <text x="70" y="28" textAnchor="middle" fill="#818CF8" className="text-xs font-bold font-mono">Row Products</text>
                <rect x="15" y="45" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="64" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">₹5,000</text>
                <rect x="15" y="78" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="97" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">₹20,000</text>
                <rect x="15" y="111" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="130" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">₹9,000</text>
                <rect x="15" y="144" width="110" height="28" rx="6" fill="#1E293B" />
                <text x="70" y="163" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">₹18,000</text>
              </g>

              {/* Arrow to Sum */}
              <path d="M 580 130 L 610 130" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Final Scalar Result */}
              <g transform="translate(615, 80)">
                <rect width="110" height="100" rx="12" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="2" />
                <text x="55" y="32" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">SUMPRODUCT</text>
                <text x="55" y="65" textAnchor="middle" fill="#FFFFFF" className="text-base font-extrabold font-mono">₹52,000</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Master Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore topic sheets live in your browser or download the full module workbook.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0"
            title="Topic 0: SUMPRODUCT Multi-Array Aggregation Practice"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Scenarios (Barrackpore & Kolkata Corporate Context)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">Scenario 1: Weighted Unit Sales</span>
              <h3 className="text-base font-bold text-white">Barrackpore Industrial Spares Revenue</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Senior Auditor Swadeep Hui needs to compute total net revenue where Units Sold are in <code className="text-sky-300 font-mono">D3:D27</code>, Unit Price in <code className="text-emerald-300 font-mono">E3:E27</code>, and Discount % in <code className="text-amber-300 font-mono">F3:F27</code>.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
                =SUMPRODUCT(D3:D27, E3:E27, 1-F3:F27)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">Scenario 2: Conditional Regional Revenue</span>
              <h3 className="text-base font-bold text-white">Naihati Branch Targeted Aggregation</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Finance Lead Tuhina Das must aggregate revenue exclusively for items shipped to <code className="text-sky-300 font-mono">"Naihati"</code> with order volume &gt; 25 units.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
                =SUMPRODUCT((C3:C27="Naihati")*(D3:D27&gt;25)*(D3:D27*E3:E27))
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Practical Calculation Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Step 1: Align Array Boundaries</span>
              <p>Verify that your input ranges have identical starting and ending rows (e.g., D3:D27 and E3:E27). Even a 1-row mismatch causes immediate formula failure.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 2: Apply Boolean Criteria Parentheses</span>
              <p>Wrap every single comparison condition in its own set of parentheses: <code className="text-amber-300 font-mono">(C3:C27="Naihati")</code>.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Press Enter to Evaluate</span>
              <p>In modern Excel 365 / 2021, simply press <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-200">Enter</kbd>. No legacy <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-200">Ctrl+Shift+Enter</kbd> is required.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Common Error Pitfalls & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Error Code</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Prevention / Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">#VALUE!</td>
                  <td className="py-3 px-4 font-sans">Mismatched range dimensions (e.g. D3:D27 and E3:E30) or text headers included in multiplication (*).</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Ensure identical row counts or use comma syntax <code className="text-sky-300 font-mono">SUMPRODUCT(array1, array2)</code> to treat text as 0.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-400 font-bold">Zero Output (0)</td>
                  <td className="py-3 px-4 font-sans">Forgotten boolean coercion (e.g. passing <code className="text-sky-300 font-mono">C3:C27="Naihati"</code> as comma argument without <code className="text-amber-300 font-mono">--</code> or <code className="text-emerald-300 font-mono">*</code>).</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Use <code className="text-emerald-300 font-mono">--</code> or <code className="text-amber-300 font-mono">*</code> to convert TRUE/FALSE into 1/0 integers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & High-Speed Keyboard Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">F9 Key Formula Evaluation</span>
              <p className="text-slate-300">Highlight an array term inside the formula bar and press <kbd className="px-2 py-0.5 bg-slate-800 rounded">F9</kbd> to preview the calculated array vector in real time.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Comma vs Star Speed Rule</span>
              <p className="text-slate-300">Use comma syntax for un-conditioned arrays to maximize multi-threaded calculation speed in large financial models.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINT SECTION
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p>• <strong>Observe carefully:</strong> Why does <code className="text-sky-300 font-mono">=SUMPRODUCT((A2:A10="Barrackpore")*B2:B10)</code> work, whereas <code className="text-sky-300 font-mono">=SUMPRODUCT(A2:A10="Barrackpore", B2:B10)</code> returns 0?</p>
            <p>• <strong>Think about:</strong> How can you count unique items in a list using <code className="text-emerald-300 font-mono">=SUMPRODUCT(1/COUNTIF(range, range))</code>?</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 0: SUMPRODUCT & Multi-Array Aggregation — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="SUMPRODUCT & Multi-Array Aggregation"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Remember: In professional financial modeling and corporate auditing, SUMPRODUCT is your most reliable tool for weighted averages and non-CSE array calculations. Always ensure your range boundaries are locked with $ signs ($D$3:$D$27) and test your boolean expressions with F9!"}
          />
        </div>
      </div>
    </div>
  );
}
