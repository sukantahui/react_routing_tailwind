"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic27_files/topic27_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic27() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ High Performance Modeling · Topic 27
            </span>
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Calculation Speed & Memory Optimization
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Level 5: Evaluate
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent leading-snug">
            Mathematical Formula Optimization — Sub-Second Calculation & Volatility Control
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Mathematical Formula Optimization eliminates calculation latency, reduces RAM footprint, and prevents volatile recalculation bottlenecks in enterprise financial models. By replacing volatile functions (<code className="text-rose-400 font-mono">OFFSET</code>, <code className="text-rose-400 font-mono">INDIRECT</code>) with <code className="text-emerald-300 font-mono">INDEX</code> and caching sub-expressions with <code className="text-purple-300 font-mono">LET</code>, workbooks recalculate in milliseconds.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Volatile Elimination:</strong> Replace OFFSET with non-volatile INDEX</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>LET Caching:</strong> Evaluate sub-expressions once: LET(val, SUM(A1:A5), val * val)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Bounded Ranges:</strong> Avoid whole-column A:A array evaluations</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA ANATOMY & SYNTAX CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> Optimization Blueprint: LET Variable Caching
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              LET Optimization Signature
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-purple-300 space-y-3">
            <div className="text-slate-500">// Optimized Variable Caching with LET</div>
            <div className="text-white font-bold">
              =LET(<span className="text-teal-300">revenue</span>, SUMPRODUCT((Region="North")*Sales), <span className="text-sky-300">cost</span>, SUMPRODUCT((Region="North")*Expense), <span className="text-emerald-300">(revenue - cost) / revenue</span>)
            </div>
            <div className="text-slate-400 text-xs font-sans pt-1">
              • <strong>revenue:</strong> Calculated once and cached in memory.<br />
              • <strong>cost:</strong> Calculated once and cached in memory.<br />
              • <strong>Final Expression:</strong> Reuses cached variables without duplicate range scans.
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
            <span className="text-emerald-400">🔬</span> Performance Mechanics: Non-Volatile Tree & CPU Profiling
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Excel uses a dependency tree to determine recalculation sequences:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 space-y-2">
              <div>Volatile Trap: OFFSET / INDIRECT force full workbook recalculation on every edit</div>
              <div>Non-Volatile Solution: INDEX(A:A, MATCH(...)) recalculates ONLY when precedent cells change</div>
              <div className="text-slate-400 text-xs font-sans">Performance Comparison:</div>
              <div className="text-emerald-400">OFFSET: 1,000,000 evaluations per edit | INDEX: 0 evaluations unless inputs change</div>
            </div>
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
            <span className="text-indigo-400">📐</span> Visual Calculation Speed Comparison
          </h2>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 720 200" className="w-full max-w-3xl h-auto font-sans">
              <g transform="translate(30, 40)">
                <rect width="180" height="120" rx="12" fill="#0F172A" stroke="#F87171" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#F87171" className="text-xs font-bold font-mono">Unoptimized Model</text>
                <text x="90" y="65" textAnchor="middle" fill="#F8FAFC" className="text-sm font-mono">OFFSET + Whole Columns</text>
                <text x="90" y="90" textAnchor="middle" fill="#94A3B8" className="text-xs">Latency: 4.8 Seconds</text>
              </g>

              <path d="M 220 100 L 270 100" stroke="#34D399" strokeWidth="3" markerEnd="url(#arrow)" />

              <g transform="translate(285, 40)">
                <rect width="180" height="120" rx="12" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">Optimized Model</text>
                <text x="90" y="68" textAnchor="middle" fill="#FFFFFF" className="text-2xl font-extrabold font-mono">12 ms</text>
                <text x="90" y="92" textAnchor="middle" fill="#A7F3D0" className="text-xs">INDEX + LET Caching</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3.5: DEEP DIVE — OPTIMIZATION STRATEGIES & BENCHMARK EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[sectionsRef.current.length] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-purple-900/40 space-y-6 shadow-2xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🚀</span> Deep Dive: Optimization Strategies & Real-World Examples
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-800/60">
              Benchmark Suite
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In enterprise financial models containing hundreds of thousands of rows, poorly designed formulas lead to workbook freezes, high RAM usage, and calculation lag. Below are the 4 core optimization patterns with concrete formula comparisons:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strategy 1: Volatiles */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Strategy 1: Volatility Control</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-xs font-mono">100x Faster</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Eliminating Volatile Functions</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                  <div className="text-[10px] text-rose-400 font-sans font-semibold mb-1">❌ UNOPTIMIZED (Volatile - Recalculates on every edit):</div>
                  =OFFSET(A1, MATCH(D3, A1:A10000, 0), 1)
                </div>
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 font-sans font-semibold mb-1">✅ OPTIMIZED (Non-Volatile - Calculates on input change only):</div>
                  =INDEX(B1:B10000, MATCH(D3, A1:A10000, 0))
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-rose-300 font-mono">OFFSET</code> marks the entire workbook as dirty on every cell edit across any open sheet. <code className="text-emerald-300 font-mono">INDEX</code> recalculates strictly when its specific precedents change.
              </p>
            </div>

            {/* Strategy 2: LET Caching */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Strategy 2: Memory Caching</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-xs font-mono">3x CPU Speedup</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Sub-Expression Caching with LET</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                  <div className="text-[10px] text-rose-400 font-sans font-semibold mb-1">❌ UNOPTIMIZED (Evaluates SUMPRODUCT 3 times):</div>
                  =(SUMPRODUCT((Reg="North")*Sales) - SUMPRODUCT((Reg="North")*Cost)) / SUMPRODUCT((Reg="North")*Sales)
                </div>
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 font-sans font-semibold mb-1">✅ OPTIMIZED (Caches variables ONCE in RAM):</div>
                  =LET(rev, SUMPRODUCT((Reg="North")*Sales), cost, SUMPRODUCT((Reg="North")*Cost), (rev - cost) / rev)
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluating <code className="text-purple-300 font-mono">SUMPRODUCT</code> once and reusing the named variable <code className="text-teal-300 font-mono">rev</code> prevents duplicate range scans.
              </p>
            </div>

            {/* Strategy 3: Range Bounding */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Strategy 3: Range Bounding</span>
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 text-xs font-mono">400x RAM Reduction</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Structured Table Range Bounding</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                  <div className="text-[10px] text-rose-400 font-sans font-semibold mb-1">❌ UNOPTIMIZED (Scans 3.14 Million Cells):</div>
                  =SUMPRODUCT((A:A="North")*(B:B&gt;100)*(C:C))
                </div>
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 font-sans font-semibold mb-1">✅ OPTIMIZED (Constrained to Active Table Rows):</div>
                  =SUMPRODUCT((Table1[Region]="North")*(Table1[Sales]&gt;100)*(Table1[Revenue]))
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whole-column references force Excel to process 1,048,576 rows per array. Table references bound calculation strictly to active rows.
              </p>
            </div>

            {/* Strategy 4: Binary Search */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Strategy 4: Lookup Complexity</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-xs font-mono">O(log N) Speed</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Binary Search vs Linear Scan</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                  <div className="text-[10px] text-rose-400 font-sans font-semibold mb-1">❌ UNOPTIMIZED (Linear Scan across 500,000 rows):</div>
                  =VLOOKUP(Target, LedgerTable, 5, FALSE)
                </div>
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 font-sans font-semibold mb-1">✅ OPTIMIZED (Binary Search on Sorted Data):</div>
                  =XLOOKUP(Target, SortedLedger[ID], SortedLedger[Amount], , 2)
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Binary search (<code className="text-amber-300 font-mono">search_mode = 2</code>) cuts search space in half repeatedly. For 500,000 rows, it takes max 19 comparisons vs 500,000 linear checks!
              </p>
            </div>
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
                <span className="text-emerald-400">📥</span> Interactive Practice Sheet
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore Mathematical Formula Optimization live in the master workbook grid.
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
            sheetName="Topic27"
            title="Topic 27: Mathematical Formula Optimization Practice Grid"
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
            <span className="text-amber-400">🏢</span> Real-World Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">Scenario 1: 500,000 Row Ledger Optimization</span>
              <h3 className="text-base font-bold text-white">Naihati Wholesale 500k Row Ledger Search</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Replace linear VLOOKUP with binary search XLOOKUP/INDEX-MATCH on sorted ledgers for 1,000x faster lookups.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =XLOOKUP(Target, ID_Range, Data_Range, , 2)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">Scenario 2: Dynamic Margin Caching</span>
              <h3 className="text-base font-bold text-white">Barrackpore Enterprise Financial Model</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Cache sub-totals using LET to prevent repeating SUMPRODUCT evaluations across 12 sheets.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =LET(tot, SUM(D3:D1000), (tot - E1) / tot)
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Practical Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Step 1: Audit Volatile Functions</span>
              <p>Identify and eliminate OFFSET, INDIRECT, and TODAY from core model formulas.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 2: Wrap Repeated Expressions in LET</span>
              <p>Assign repeated calculations to named variables inside LET(var, expr, final).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Constrain Array Boundaries</span>
              <p>Replace whole-column A:A references with structured table names or bounded ranges.</p>
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
            <span className="text-rose-400">⚠️</span> Error & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Issue</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Fix / Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">Volatile Recalculation Lag</td>
                  <td className="py-3 px-4 font-sans">Using OFFSET or INDIRECT forces full workbook recalculation on every edit.</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Replace OFFSET with INDEX: <code className="text-sky-300 font-mono">INDEX(A:A, 1):INDEX(A:A, 100)</code>.</td>
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
            <span className="text-purple-400">💡</span> Pro Tips & Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">Full Recalculate Shortcut</span>
              <p className="text-slate-300">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-200">Ctrl + Alt + F9</kbd> to force full dependency tree recalculation.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Active Sheet Recalculate</span>
              <p className="text-slate-300">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-200">Shift + F9</kbd> to recalculate only the active worksheet.</p>
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
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p>• <strong>Think about:</strong> Why does <code className="text-purple-300 font-mono font-bold">=LET(val, SUM(A1:A1000), val * val)</code> execute twice as fast as <code className="text-sky-300 font-mono font-bold">=SUM(A1:A1000) * SUM(A1:A1000)</code>?</p>
            <p>• <strong>Observe carefully:</strong> Why does replacing OFFSET with INDEX prevent UI freeze during data entry?</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 27: Mathematical Formula Optimization — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Mathematical Formula Optimization"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Eliminate volatile functions (OFFSET/INDIRECT), cache intermediate sub-expressions with LET, and constrain array ranges to bounded active rows. Sub-second performance is the mark of a true Excel master!"}
          />
        </div>
      </div>
    </div>
  );
}
