"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
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
              ⚡ Functional Folding Engine · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Aggregate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Aggregation Algorithms: Custom Multi-Step Reductions with REDUCE
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In functional programming and enterprise spreadsheet engineering, aggregating arrays into single 
            compounded metrics, executing chained string sanitization pipelines, or iteratively consolidating 
            multiple worksheet tables into a master report traditionally required complex VBA scripts or deeply nested formulas. 
            The <code className="text-purple-300 font-mono font-bold">REDUCE</code> helper function performs 
            <strong>higher-order functional folding</strong>, collapsing an entire data array into a single accumulated 
            scalar value or unified composite table in pure memory.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Functional Folding:</strong> Collapses arrays to 1 final result</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Chained Text Pipelines:</strong> Clean string sanitization without nested formulas</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Multi-Sheet Consolidation:</strong> Iterative VSTACK table stacking</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =REDUCE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =REDUCE([initial_val], array, LAMBDA(acc, val, calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Functional Folding Reduction Structure</span>
            <div className="mt-1 text-white font-bold">
              =REDUCE(<span className="text-amber-300">[initial_value]</span>, <span className="text-yellow-300">array</span>, <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">accumulator</span>, <span className="text-cyan-300">value</span>, <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Cumulative 4-Year Compounded Return Multiplier</span> <br />
              <span className="text-emerald-400 font-bold">
                =REDUCE(1, E5:E8, LAMBDA(acc, r, acc * (1 + r)))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Reduction Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">[initial_value]</td>
                  <td className="py-3 px-4 text-slate-300">Seed State</td>
                  <td className="py-3 px-4 text-slate-400">Optional (Defaults to 0)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The starting value fed into <code className="text-sky-300 font-mono">acc</code> for the first array element.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Input Data Sequence</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The array or vector whose elements are folded sequentially one by one.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(acc, val)</td>
                  <td className="py-3 px-4 text-purple-300">Worker Closure</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly 2 Params</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-sky-300 font-mono">acc</code> is accumulated state from prior iteration; <code className="text-cyan-300 font-mono">val</code> is current item.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Folded Output</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Evaluates updated state. Only the final result of the last element is returned!</td>
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
              <span className="text-emerald-400">🔬</span> Functional Folding & Multi-Range Table Stacking
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Higher-Order Folding Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Accumulation vs. Progressive Output
              </h3>
              <p className="leading-relaxed">
                While <code className="text-sky-300 font-mono">SCAN</code> spills every intermediate calculation (producing an array of length N), 
                <code className="text-emerald-300 font-mono">REDUCE</code> discards intermediate states and returns only the single final collapsed result. 
                This makes REDUCE ideal for compounding interest, overall product metrics, and string pipelines!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                [x₁, x₂, ... xₙ] &rarr; REDUCE &rarr; Single Final State
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Chained Multiple Text Sanitization
              </h3>
              <p className="leading-relaxed">
                Instead of writing messy nested formulas like <code className="text-rose-400 font-mono">=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A1, "-", ""), "/", ""), " ", "")</code>, 
                you can write: <br />
                <code className="text-emerald-300 font-mono">=REDUCE(A1, {"{"}"-", "/", " ", "."{"}"}, LAMBDA(t, c, SUBSTITUTE(t, c, "")))</code>. 
                Clean, readable, and dynamically expandable!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Chained Replacement Pipeline in 1 Readable Formula
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Multi-Sheet Consolidation with DROP + REDUCE
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consolidate dozens of branch sheets into 1 master dataset without manual copying:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =DROP(REDUCE("", BranchSheetList, LAMBDA(acc, s, VSTACK(acc, INDIRECT(s & "!A2:D50")))), 1)
              </code>
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
              <span className="text-purple-400">📐</span> Visual REDUCE Functional Folding Schematic
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Folding Sequence Schematic
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how REDUCE folds 4 annual return rates into a single final compounded growth multiplier:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Annual Returns (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ANNUAL RETURNS (array)</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="18" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">Year 1 (2021): +12% (0.12)</text>

                <rect y="36" width="200" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="54" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">Year 2 (2022): +8%  (0.08)</text>

                <rect y="72" width="200" height="28" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="90" fill="#FECACA" fontSize="9.5" fontFamily="monospace">Year 3 (2023): -5%  (-0.05)</text>

                <rect y="108" width="200" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="126" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">Year 4 (2024): +15% (0.15)</text>
              </g>

              <rect x="35" y="235" width="200" height="45" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="135" y="255" fill="#FDE047" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Seed: Initial Value = 1.0</text>
              <text x="135" y="271" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Starting Principal Multiplier</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Folding Engine (Center) */}
              <rect x="325" y="30" width="270" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="270" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="460" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">REDUCE FOLDING CLOSURE</text>

              <g transform="translate(340, 75)">
                <rect width="240" height="46" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="120" y="18" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(acc, r,</text>
                <text x="120" y="34" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">acc * (1 + r))</text>
              </g>

              <g transform="translate(340, 130)" fontFamily="monospace" fontSize="8.5" fill="#E2E8F0">
                <text x="0" y="15">Step 1: 1.0000 * 1.12 = 1.1200</text>
                <text x="0" y="34">Step 2: 1.1200 * 1.08 = 1.2096</text>
                <text x="0" y="53">Step 3: 1.2096 * 0.95 = 1.1491</text>
                <text x="0" y="72">Step 4: 1.1491 * 1.15 = 1.3215</text>
              </g>

              <text x="460" y="260" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Intermediate States Discarded</text>
              <text x="460" y="278" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Only Final Collapsed Value Emitted</text>

              {/* Arrow */}
              <path d="M 610 165 L 645 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,165 640,160 640,170" fill="#10B981" />

              {/* Final Output (Right) */}
              <rect x="655" y="80" width="170" height="170" rx="12" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="80" width="170" height="34" rx="12" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="102" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FINAL RESULT</text>

              <g transform="translate(665, 130)">
                <rect width="150" height="40" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="25" fill="#FDE047" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">1.3215x</text>
              </g>

              <text x="740" y="200" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Compounded Return: +32.15%</text>
              <text x="740" y="225" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Single Scalar Output</text>
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
                Explore the investment portfolio returns dataset below or download the master workbook to test <code className="text-purple-300 font-mono">REDUCE</code> in Microsoft Excel.
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
            sheetName="Topic11_REDUCE"
            title="Portfolio Annual Return Schedule (2021 to 2024 Return Rates & Benchmarks)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Wealth Management</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Year Compounded Portfolio Multiplier
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Portfolio Manager <strong>Swadeep Banerjee</strong> writes: 
                <code className="text-emerald-300 font-mono">=REDUCE(1, E5:E8, LAMBDA(acc, r, acc * (1 + r)))</code>. 
                Folds 4 annual return rates (+12%, +8%, -5%, +15%) into the exact 4-year wealth multiplier: <strong>1.3215x</strong>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REDUCE(1, E5:E8, ...) &rarr; 1.3215x (+32.15% Net Growth)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · CRM Master Data Cleansing</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Chained Character Sanitization Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Tuhina Mukherjee</strong> sanitizes dirty phone strings: 
                <code className="text-amber-300 font-mono">=REDUCE(RawPhone, {"{"}"-", "/", "(", ")", "+91", " "{"}"}, LAMBDA(t, c, SUBSTITUTE(t, c, "")))</code>. 
                Replaces 6 nested SUBSTITUTE calls with 1 clean pipeline!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                6-Token Chained Sanitization in 1 Functional Pipeline
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Corporate Financial Audit</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Multi-Branch Sheet Consolidation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Audit Lead <strong>Abhronila Sengupta</strong> stacks 4 branch tables dynamically: 
                <code className="text-indigo-300 font-mono">=DROP(REDUCE("", {"{"}"Barrackpore", "Shyamnagar", "Ichapur", "Naihati"{"}"}, LAMBDA(acc, b, VSTACK(acc, INDIRECT(b & "!A2:D20")))), 1)</code>. 
                Builds a single consolidated ledger in memory with zero VBA.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Multi-Branch Consolidation: 4 Worksheets Folded via VSTACK
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Supply Chain Logistics</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Cumulative Delimited Waybill Packing List
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Disptach Supervisor <strong>Susmita Roy</strong> joins SKU codes: 
                <code className="text-amber-300 font-mono">=REDUCE("", SKUsRange, LAMBDA(acc, sku, IF(acc="", sku, acc & " &rarr; " & sku)))</code>, 
                generating formatted manifest route strings dynamically.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Automated Waybill Route String Synthesis
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
              <span className="text-purple-400">🪜</span> Step-by-Step REDUCE Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Starting Seed and Input Array</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Starting principal multiplier seed: <code className="text-amber-300 font-mono">1</code>. Return rate column: <code className="text-amber-300 font-mono">E5:E8</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare REDUCE with 2-Parameter LAMBDA</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G5</code>, write: <code className="text-purple-300 font-mono">=REDUCE(1, E5:E8, LAMBDA(acc, r, ...))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert Compounding Multiplier Expression</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add the folding formula: <code className="text-emerald-400 font-mono">acc * (1 + r)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Single Scalar Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The single final compounded value <code className="text-emerald-300 font-mono font-bold">1.3215</code> appears in cell G5!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA declared 1 or 3+ parameters instead of exactly 2 (acc, val).</td>
                  <td className="py-3 px-4 text-slate-400">REDUCE strictly requires LAMBDA(acc, val).</td>
                  <td className="py-3 px-4 text-emerald-400">Declare exactly 2 parameters: <code className="text-emerald-400 font-mono">LAMBDA(acc, val, ...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Seed Multiplier Error</td>
                  <td className="py-3 px-4 text-slate-300">Passed 0 instead of 1 as initial value for multiplication reductions.</td>
                  <td className="py-3 px-4 text-slate-400">Product results in 0 (0 * (1 + r) = 0).</td>
                  <td className="py-3 px-4 text-emerald-400">Always use <code className="text-emerald-400 font-mono">1</code> as the initial value seed for multiplicative reductions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#REF! (Consolidation)</td>
                  <td className="py-3 px-4 text-slate-300">INDIRECT sheet name references closed workbooks or misnamed worksheets.</td>
                  <td className="py-3 px-4 text-slate-400">Check sheet name spelling in the sheet array.</td>
                  <td className="py-3 px-4 text-emerald-400">Verify worksheet names exist in the active workbook.</td>
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
              REDUCE Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">DROP + VSTACK</span>
                <span>Consolidation Pattern</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stack tables and drop seed: <code className="text-emerald-300 font-mono">=DROP(REDUCE("", Sheets, LAMBDA(a,s,VSTACK(a,INDIRECT(s)))), 1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">String Reversal</span>
                <span>Prepend Token</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reverse text: <code className="text-sky-300 font-mono">LAMBDA(acc, char, char & acc)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Array Constants</span>
                <span>Clean Replacements</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass array constant of chars: <code className="text-purple-300 font-mono">{"{"}"-", ".", "/", " "{"}"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Scalar Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =REDUCE(...) and press <strong>F9</strong> to inspect the final reduced result in RAM.
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
                <strong>Reflect on functional folding:</strong> Why is <code className="text-purple-300 font-mono">REDUCE</code> called a "folding" function, and how does it collapse an arbitrary-length array into a single final scalar or composite table?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine pipeline maintainability:</strong> How does passing an array constant of dirty characters into <code className="text-purple-300 font-mono">REDUCE</code> eliminate 10 nested <code className="text-sky-300 font-mono">SUBSTITUTE</code> functions?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider multi-sheet consolidation:</strong> How does combining <code className="text-purple-300 font-mono">REDUCE</code> with <code className="text-violet-300 font-mono">VSTACK</code> and <code className="text-cyan-300 font-mono">DROP</code> allow corporate auditors to consolidate dynamic branch tables in memory without VBA?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Custom Multi-Step Reductions with REDUCE — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "REDUCE is the ultimate higher-order folding engine in Excel 365. Whenever you need to collapse an array into a compounded growth factor, execute chained text sanitization without nested formulas, or dynamically consolidate multiple branch tables into 1 master dataset with VSTACK, REDUCE delivers pristine, sub-millisecond functional execution!"
            }
          />
        </div>
      </div>
    </div>
  );
}
