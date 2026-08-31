"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
              ⚡ Helper Engine Iteration · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Iterate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Iterating Across Arrays Element-by-Element with the MAP Function
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When standard Excel functions (like <code className="text-amber-300 font-mono">AND</code>, <code className="text-amber-300 font-mono">OR</code>, or custom conditional branches) 
            fail to vectorize across dynamic array ranges—collapsing entire tables into single scalar values—the 
            <code className="text-purple-300 font-mono font-bold">MAP</code> helper function provides the solution. 
            <code className="text-purple-300 font-mono font-bold">MAP</code> iterates <strong>element-by-element</strong> across one or more parallel arrays, 
            applying a custom <code className="text-emerald-300 font-mono">LAMBDA</code> closure to each coordinate pair and spilling a perfectly dimensioned matrix in memory.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Element-Wise Precision:</strong> Transforms scalar by scalar</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Array Mapping:</strong> Pairs N parallel arrays simultaneously</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Preserved Dimensions:</strong> Output shape matches input shape</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =MAP()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =MAP(arr1, [arr2, ...], LAMBDA(p1, [p2, ...], calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Multi-Array Transformation Structure</span>
            <div className="mt-1 text-white font-bold">
              =MAP(<span className="text-amber-300">array1</span>, [<span className="text-yellow-300">array2</span>, ...], <span className="text-purple-300">LAMBDA</span>(<span className="text-amber-300">p1</span>, [<span className="text-yellow-300">p2</span>, ...], <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example (Attendance Days & Performance Score Evaluation):</span> <br />
              <span className="text-emerald-400 font-bold">
                =MAP(E5:E9, F5:F9, LAMBDA(days, score, IF(AND(days>=25, score>=90), "Tier-1 Bonus", "Standard")))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Architectural Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array1..N</td>
                  <td className="py-3 px-4 text-slate-300">Input Arrays / Vectors</td>
                  <td className="py-3 px-4 text-emerald-400">At least 1 required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">All input arrays must have identical dimensions (same row height and column width).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(p1..N)</td>
                  <td className="py-3 px-4 text-purple-300">Worker Closure</td>
                  <td className="py-3 px-4 text-emerald-400">Final Argument</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Parameter count must equal the exact number of input arrays passed into MAP.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Scalar Expression</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Must return a single scalar value per iteration (nested array returns not supported).</td>
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
              <span className="text-emerald-400">🔬</span> Coordinate Pairing & Vectorization Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Element-Wise Functional Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Why Native Arrays Fail on AND / OR
              </h3>
              <p className="leading-relaxed">
                If you write <code className="text-rose-400 font-mono">=IF(AND(E5:E9>=25, F5:F9>=90), "Bonus", "No")</code>, 
                Excel's <code className="text-amber-300 font-mono">AND</code> function evaluates the entire column at once, returning a single global TRUE/FALSE rather than row-by-row bonuses. 
                <code className="text-emerald-300 font-mono">MAP</code> forces Excel to evaluate the logical expression independently for each individual employee!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                MAP Preserves Row-by-Row Granularity for Aggregating Functions
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Multi-Array Coordinate Synchronization
              </h3>
              <p className="leading-relaxed">
                When multiple arrays are passed into MAP (e.g. <code className="text-amber-300 font-mono">Array1, Array2, Array3</code>), 
                Excel extracts element <code className="text-cyan-300 font-mono">(i, j)</code> from Array1, element <code className="text-cyan-300 font-mono">(i, j)</code> from Array2, 
                and passes them synchronously into the LAMBDA. The returned value is placed at coordinate <code className="text-emerald-300 font-mono">(i, j)</code> in the output grid.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Synchronized Coordinate Extraction (i, j)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Reactivity with Spilled Anchors (#)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When you pass dynamic spilled array anchors into MAP (e.g. <code className="text-emerald-300 font-mono">=MAP(FilteredSales#, FX_TAX_CALC)</code>), 
              the MAP formula automatically expands and contracts whenever upstream data changes. Zero manual formula dragging or broken cell ranges!
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
              <span className="text-purple-400">📐</span> Visual Parallel Array Mapping & Spilling Flow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Synchronized Mapping Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how MAP pairs corresponding row elements from two parallel vectors and evaluates them in memory:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Array 1: Attendance (Left Top) */}
              <rect x="25" y="30" width="130" height="260" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="130" height="30" rx="10" fill="#7E22CE" fillOpacity="0.3" />
              <text x="90" y="50" fill="#F3E8FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DAYS (Arr 1)</text>

              <g transform="translate(35, 70)">
                <rect width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="16" fill="#FDE047" fontSize="9" textAnchor="middle" fontFamily="monospace">Swadeep: 24</text>

                <rect y="30" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="46" fill="#FDE047" fontSize="9" textAnchor="middle" fontFamily="monospace">Tuhina: 26</text>

                <rect y="60" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="76" fill="#FDE047" fontSize="9" textAnchor="middle" fontFamily="monospace">Abhronila: 22</text>

                <rect y="90" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="106" fill="#FDE047" fontSize="9" textAnchor="middle" fontFamily="monospace">Susmita: 25</text>

                <rect y="120" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="136" fill="#FDE047" fontSize="9" textAnchor="middle" fontFamily="monospace">Debangshu: 26</text>
              </g>

              {/* Array 2: Score (Left Bottom) */}
              <rect x="175" y="30" width="130" height="260" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="175" y="30" width="130" height="30" rx="10" fill="#0284C7" fillOpacity="0.3" />
              <text x="240" y="50" fill="#E0F2FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SCORE (Arr 2)</text>

              <g transform="translate(185, 70)">
                <rect width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="16" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: 88</text>

                <rect y="30" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="46" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: 94</text>

                <rect y="60" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="76" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: 79</text>

                <rect y="90" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="106" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: 91</text>

                <rect y="120" width="110" height="24" rx="4" fill="#1E293B" />
                <text x="55" y="136" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: 96</text>
              </g>

              {/* Arrow */}
              <path d="M 320 160 L 375 160" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="380,160 370,155 370,165" fill="#A855F7" />

              {/* Engine (Center) */}
              <rect x="385" y="30" width="240" height="260" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="385" y="30" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="505" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MAP WORKER CLOSURE</text>

              <g transform="translate(395, 80)">
                <rect width="220" height="65" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(days, score,</text>
                <text x="110" y="36" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">IF(AND(days>=25, score>=90),</text>
                <text x="110" y="52" fill="#FDE047" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"Tier-1 Bonus", "Standard"))</text>
              </g>

              <text x="505" y="175" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Pairwise Evaluation:</text>
              <text x="505" y="195" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">Row 2: (26, 94) → Tier-1 Bonus</text>
              <text x="505" y="213" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">Row 4: (25, 91) → Tier-1 Bonus</text>
              <text x="505" y="231" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">Row 5: (26, 96) → Tier-1 Bonus</text>
              <text x="505" y="260" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 100% Vectorized Execution</text>

              {/* Arrow */}
              <path d="M 635 160 L 675 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="680,160 670,155 670,165" fill="#10B981" />

              {/* Spilled Output (Right) */}
              <rect x="685" y="30" width="145" height="260" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="685" y="30" width="145" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="757" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RESULT VECTOR</text>

              <g transform="translate(695, 70)">
                <rect width="125" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="62" y="16" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Standard</text>

                <rect y="30" width="125" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="62" y="46" fill="#FDE047" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Tier-1 Bonus</text>

                <rect y="60" width="125" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="62" y="76" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Standard</text>

                <rect y="90" width="125" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="62" y="106" fill="#FDE047" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Tier-1 Bonus</text>

                <rect y="120" width="125" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="62" y="136" fill="#FDE047" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Tier-1 Bonus</text>
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
                Explore the staff appraisal dataset below or download the master workbook to test <code className="text-purple-300 font-mono">MAP</code> in Microsoft Excel.
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
            sheetName="EX1807"
            title="Employee Appraisal Roster (Attendance Days, Performance Scores, Gross Pay Matrix)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · HR Bonus Classification</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Condition Staff Appraisal Tiering
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Manager <strong>Swadeep Banerjee</strong> evaluates bonuses for 500 campus staff. 
                Writing <code className="text-emerald-300 font-mono">=MAP(E5:E500, F5:F500, LAMBDA(days, score, IF(AND(days>=25, score>=90), "Tier-1 Bonus", "Standard")))</code> 
                evaluates both conditions row-by-row and spills all 500 tiers from a single formula.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =MAP(E5:E500, F5:F500, ...) → 500 Tiers Spilled in 1ms
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Wholesale Commercial Pricing</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Column Dynamic Net Landed Invoicing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Sales Controller <strong>Tuhina Mukherjee</strong> calculates net landed prices across 3 columns: 
                <code className="text-amber-300 font-mono">=MAP(Prices, Quantities, Discounts, LAMBDA(p, q, d, p * q * (1 - d) * 1.18))</code>, 
                computing final gross invoice amounts in a single vectorized operation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Multi-Array Mapping: 3 Columns Ingested → 1 Spilled Net Total
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Customer Master Cleansing</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text Cleansing Across Multi-Column Tables
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Abhronila Sengupta</strong> cleanses raw CRM records across 4 columns: 
                <code className="text-indigo-300 font-mono">=MAP(A2:D500, LAMBDA(txt, PROPER(TRIM(CLEAN(txt)))))</code>. 
                Functions like PROPER and TRIM that normally take 1 cell now sanitize the entire 2D table in 1 formula!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                2D Matrix Vectorization: PROPER + TRIM across 2,000 Cells
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Accounting Ledger Reconciliation</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Positive vs Negative Ledger Segregation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Debangshu Ghosh</strong> creates debit/credit masks: 
                <code className="text-amber-300 font-mono">=MAP(Movements, LAMBDA(x, IF(x>0, "Deposit", "Withdrawal")))</code>, 
                enabling instantaneous transaction categorizations without legacy IF dragging.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Automated Debit/Credit Transaction Masking
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
              <span className="text-purple-400">🪜</span> Step-by-Step MAP Formulation Walkthrough
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Select Parallel Input Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify the input ranges with identical row counts: Attendance Days (<code className="text-amber-300 font-mono">E5:E9</code>) and Bonus Score (<code className="text-amber-300 font-mono">F5:F9</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare MAP & Matching LAMBDA Parameters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">H5</code>, write: <code className="text-purple-300 font-mono">=MAP(E5:E9, F5:F9, LAMBDA(days, score, ...))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert Element-Wise Logical Expression</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add the logical check: <code className="text-emerald-400 font-mono">IF(AND(days>=25, score>=90), "Tier-1 Bonus", "Standard")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Observe Dynamic Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula automatically spills down cells <code className="text-emerald-300 font-mono">H5:H9</code>, perfectly classifying each staff member!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Dimension Mismatch)</td>
                  <td className="py-3 px-4 text-slate-300">Passed arrays of unequal row heights or column widths into MAP (e.g. E5:E9 and F5:F10).</td>
                  <td className="py-3 px-4 text-slate-400">Compare row/column dimensions of all input ranges.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure all array arguments share identical dimensions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA parameter count does not match the number of input arrays.</td>
                  <td className="py-3 px-4 text-slate-400">Count passed array arguments vs LAMBDA parameter names.</td>
                  <td className="py-3 px-4 text-emerald-400">Provide exactly 1 parameter per input array.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Nested Array Return)</td>
                  <td className="py-3 px-4 text-slate-300">Calculation inside MAP returned an array instead of a single scalar value.</td>
                  <td className="py-3 px-4 text-slate-400">Check if calculation returns HSTACK/VSTACK or ranges.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure each iteration returns a single scalar number or text.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Output cells are blocked by existing cell values or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the intended spill footprint below and to the right.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic dynamic spill.</td>
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
              MAP Optimization Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Preserve Blanks</span>
                <span>Clean Tables</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevent 0s for blank cells: <code className="text-emerald-300 font-mono">LAMBDA(x, IF(x="", "", x*1.18))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Pass Named LAMBDAs</span>
                <span>Clean Code</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass named functions directly: <code className="text-sky-300 font-mono">=MAP(Prices, FX_GST_CALC)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">2D Grid Vectorization</span>
                <span>Matrix Cleansing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass multi-column ranges to apply single-cell functions like TRIM and UPPER across entire matrices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Array Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the =MAP(...) formula in the formula bar and press <strong>F9</strong> to inspect the transformed matrix in RAM.
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
                <strong>Reflect on vectorization barriers:</strong> Why does a standard <code className="text-rose-400 font-mono">AND(A2:A10>5, B2:B10>10)</code> formula collapse into a single scalar value, and how does <code className="text-purple-300 font-mono">MAP</code> restore row-by-row granularity?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine multi-array synchronization:</strong> When passing 3 columns (Price, Qty, Discount) into <code className="text-purple-300 font-mono">MAP</code>, how does Excel guarantee that row 7's price is paired strictly with row 7's quantity and discount?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider dimension matching constraints:</strong> What happens if an analyst passes a 5-row range and a 6-row range into <code className="text-purple-300 font-mono">MAP</code>? Why does Excel return <code className="text-rose-400 font-mono">#VALUE!</code>?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Array Iteration with MAP — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "The MAP helper function is the definitive workhorse for element-by-element transformations across matrices. Whenever you need to evaluate complex logical conditions (like AND/OR) across multiple columns simultaneously without dragging formulas, MAP with parallel array arguments delivers 100% dynamic, multi-threaded execution in pure memory!"
            }
          />
        </div>
      </div>
    </div>
  );
}
