"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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
    link.download = "array_reshaping_master_practice.xlsx";
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
              🏆 Capstone Assessment & Challenge Lab · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate & Master
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight">
            Assessment: Advanced Grid Reshaping & Dimension Transformation Challenge
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the capstone assessment and challenge laboratory for Module 004_002. This diagnostic practical evaluates 
            your complete architectural mastery across all 11 next-generation array functions: 
            <code className="text-amber-300 font-mono">TOCOL</code>, <code className="text-amber-300 font-mono">TOROW</code>,{" "}
            <code className="text-amber-300 font-mono">CHOOSEROWS</code>, <code className="text-amber-300 font-mono">CHOOSECOLS</code>,{" "}
            <code className="text-amber-300 font-mono">TAKE</code>, <code className="text-amber-300 font-mono">DROP</code>,{" "}
            <code className="text-amber-300 font-mono">EXPAND</code>, <code className="text-amber-300 font-mono">WRAPROWS</code>,{" "}
            <code className="text-amber-300 font-mono">WRAPCOLS</code>, <code className="text-amber-300 font-mono">VSTACK</code>, and{" "}
            <code className="text-amber-300 font-mono">HSTACK</code>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>11-Function Matrix:</strong> Full syntax & usage mastery</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Enterprise Challenge:</strong> Real corporate multi-branch audit</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Viva Voce Rubric:</strong> 30 rigorous defense questions</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: COMPLETE 11-FUNCTION SYNTAX MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">⚡</span> The 11 Core Array Reshaping Functions
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Comprehensive Reference Card
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Syntax Signature</th>
                  <th className="py-3 px-4">Primary Purpose</th>
                  <th className="py-3 px-4">Key Error Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">TOCOL</td>
                  <td className="py-3 px-4 text-slate-300">=TOCOL(array, [ignore], [scan_col])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Flattens 2D matrices into 1D vertical columns.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#SPILL!</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">TOROW</td>
                  <td className="py-3 px-4 text-slate-300">=TOROW(array, [ignore], [scan_col])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Flattens 2D matrices into 1D horizontal rows.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">&gt; 16,384 cols crash</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-300">CHOOSEROWS</td>
                  <td className="py-3 px-4 text-slate-300">=CHOOSEROWS(array, row_num1, ...)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Extracts/reorders arbitrary rows (supports -1 last row).</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (0 index)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-300">CHOOSECOLS</td>
                  <td className="py-3 px-4 text-slate-300">=CHOOSECOLS(array, col_num1, ...)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Extracts/reorders arbitrary columns (supports negative).</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (0 index)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-300">TAKE</td>
                  <td className="py-3 px-4 text-slate-300">=TAKE(array, rows, [columns])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Slices top/bottom N rows or left/right N columns.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (0 rows)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">DROP</td>
                  <td className="py-3 px-4 text-slate-300">=DROP(array, rows, [columns])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Excludes top/bottom N rows or left/right N columns.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#CALC! (drop all)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-orange-300">EXPAND</td>
                  <td className="py-3 px-4 text-slate-300">=EXPAND(array, rows, [cols], [pad])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Pads/enlarges arrays to fixed target dimensions.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (shrink)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">WRAPROWS</td>
                  <td className="py-3 px-4 text-slate-300">=WRAPROWS(vector, count, [pad])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Wraps 1D vector row-wise into 2D table.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (2D input)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-300">WRAPCOLS</td>
                  <td className="py-3 px-4 text-slate-300">=WRAPCOLS(vector, count, [pad])</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Wraps 1D vector column-wise into 2D table.</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#VALUE! (2D input)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-violet-300">VSTACK</td>
                  <td className="py-3 px-4 text-slate-300">=VSTACK(arr1, [arr2], ...)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Appends arrays vertically (SQL UNION ALL).</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#N/A (unequal cols)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-fuchsia-300">HSTACK</td>
                  <td className="py-3 px-4 text-slate-300">=HSTACK(arr1, [arr2], ...)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Joins arrays horizontally (SQL JOIN / Concat).</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">#N/A (unequal rows)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & DIAGNOSTIC EVALUATION RUBRIC
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Diagnostic Evaluation Rubric & Mastery Standards
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              4 Evaluation Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-amber-400">1.</span> Syntax & Parameter Precision (25%)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accurate application of optional parameters (ignore flags in TOCOL, negative indices in CHOOSEROWS/TAKE/DROP, custom pad constants in EXPAND/WRAPROWS).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-cyan-400">2.</span> Computational Optimization (25%)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Leveraging <code className="text-amber-300 font-mono">LET</code> to cache intermediate transformations in RAM, avoiding full-column references (A:A), and minimizing recalculation overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-rose-400">3.</span> Error Diagnostics & Handling (25%)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rapid diagnosis and prevention of <code className="text-rose-400 font-mono">#CALC!</code>, <code className="text-rose-400 font-mono">#VALUE!</code>, <code className="text-rose-400 font-mono">#N/A</code>, and <code className="text-rose-400 font-mono">#SPILL!</code> errors using proper bounds checking and fallback values.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">4.</span> Architectural Pipeline Design (25%)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Composing multi-function pipelines that solve real-world corporate ETL, cross-tab unpivoting, and financial reporting challenges with zero VBA macros.
              </p>
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
              <span className="text-amber-400">📐</span> The Dynamic Array Reshaping Ecosystem
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Interactive Architectural Map
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            The complete conceptual diagram illustrating how all 11 array reshaping functions transform data structures in memory:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center Hub */}
              <rect x="325" y="110" width="200" height="120" rx="16" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <rect x="325" y="110" width="200" height="30" rx="16" fill="#B45309" fillOpacity="0.4" />
              <text x="425" y="130" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXCEL 365 ARRAY ENGINE</text>
              <text x="425" y="160" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">11 Reshaping Operators</text>
              <text x="425" y="180" fill="#34D399" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Zero-Copy C++ Memory RAM</text>
              <text x="425" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Dynamic Spilled Reactivity</text>

              {/* Node 1: Flattening (Top Left) */}
              <rect x="30" y="30" width="180" height="70" rx="10" fill="#0F172A" stroke="#06B6D4" />
              <text x="120" y="52" fill="#67E8F9" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1D FLATTENING</text>
              <text x="120" y="72" fill="#A5F3FC" fontSize="9" textAnchor="middle" fontFamily="monospace">TOCOL · TOROW</text>
              <path d="M 210 70 L 325 130" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Node 2: Slicing (Top Right) */}
              <rect x="640" y="30" width="180" height="70" rx="10" fill="#0F172A" stroke="#6366F1" />
              <text x="730" y="52" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">COORDINATE SLICING</text>
              <text x="730" y="72" fill="#C7D2FE" fontSize="9" textAnchor="middle" fontFamily="monospace">CHOOSEROWS · CHOOSECOLS</text>
              <path d="M 640 70 L 525 130" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Node 3: Boundaries (Bottom Left) */}
              <rect x="30" y="240" width="180" height="70" rx="10" fill="#0F172A" stroke="#10B981" />
              <text x="120" y="262" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BOUNDARY SUBSETTING</text>
              <text x="120" y="282" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">TAKE · DROP · EXPAND</text>
              <path d="M 210 270 L 325 210" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Node 4: Stacking & Wrapping (Bottom Right) */}
              <rect x="640" y="240" width="180" height="70" rx="10" fill="#0F172A" stroke="#EC4899" />
              <text x="730" y="262" fill="#F472B6" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STACKING & WRAPPING</text>
              <text x="730" y="282" fill="#FBCFE8" fontSize="9" textAnchor="middle" fontFamily="monospace">VSTACK · HSTACK · WRAP</text>
              <path d="M 640 270 L 525 210" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="3 3" />
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
                Explore the Capstone Challenge Lab dataset below or download the master workbook to solve the final assessment in Microsoft Excel.
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
            sheetName="EX1714"
            title="Capstone Challenge Lab (Multi-Branch Unstructured Enterprise Datasets)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD CAPSTONE CHALLENGES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Capstone Practical Challenge Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Practical Exam Problems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Challenge 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Challenge 1 · Multi-Branch Union</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardize & Consolidate 3 Branch Schedules
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Consolidate Barrackpore, Shyamnagar, and Naihati branch registers where Branch 2 is horizontal and Branch 3 has columns in a different sequence. 
                Use <code className="text-amber-300 font-mono">TRANSPOSE</code>, <code className="text-amber-300 font-mono">CHOOSECOLS</code>, and <code className="text-amber-300 font-mono">VSTACK</code> to produce a unified ledger.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Challenge 2 · Banking Stream ETL</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Ingestion & Tax Calculation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Ingest a 20-line banking stream, strip 2 header lines with <code className="text-amber-300 font-mono">DROP</code>, unroll with <code className="text-amber-300 font-mono">WRAPROWS</code>, 
                attach 18% GST with <code className="text-amber-300 font-mono">HSTACK</code>, sort descending by Net, and bundle master headers with <code className="text-amber-300 font-mono">VSTACK</code>.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Challenge 3 · 2D Cross-Tab Unpivoting</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unpivot 4x4 Matrix to 3-Column Table
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Convert a 4-department x 4-quarter matrix into a flat 3-column table [Dept, Quarter, Amount] using <code className="text-amber-300 font-mono">LET</code>, <code className="text-amber-300 font-mono">TOCOL</code>, and <code className="text-amber-300 font-mono">HSTACK</code>.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Challenge 4 · Printable Noticeboard</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                1-Page Newspaper Multi-Column Layout
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Format a 60-candidate vertical merit list into 3 side-by-side columns of 20 students each using <code className="text-amber-300 font-mono">WRAPCOLS(Students, 20, "")</code> with room headers attached via <code className="text-amber-300 font-mono">VSTACK</code>.
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🪜</span> Capstone Assessment Walkthrough Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Exam Protocol
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Download the Practice Workbook</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the Download button in Section 5 and open <code className="text-amber-300 font-mono">array_reshaping_master_practice.xlsx</code> in Microsoft Excel.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Solve Challenges 1 Through 4</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Navigate to sheet <code className="text-amber-300 font-mono">Topic13_Challenge_Lab</code> and write the required formulas in the designated solution cells.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify with the 30 Viva Voce Questions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Test your understanding against the 30 examination questions in Section 11 below.
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
              <span className="text-rose-400">⚠️</span> Master Error Diagnostic Matrix
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
                  <th className="py-3 px-4">Trigger Functions</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC!</td>
                  <td className="py-3 px-4 font-mono text-amber-300">DROP, FILTER</td>
                  <td className="py-3 px-4 text-slate-300">Resulting output array is empty (e.g. dropping all rows).</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure dropped count &lt; total array rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 font-mono text-amber-300">CHOOSEROWS, EXPAND, WRAP</td>
                  <td className="py-3 px-4 text-slate-300">0 index, shrinking in EXPAND, or 2D input to WRAPROWS.</td>
                  <td className="py-3 px-4 text-emerald-400">Use non-zero indices, target &ge; source in EXPAND, flatten with TOCOL.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#N/A</td>
                  <td className="py-3 px-4 font-mono text-amber-300">EXPAND, WRAP, V/HSTACK</td>
                  <td className="py-3 px-4 text-slate-300">Omitted pad_with argument or dimension mismatch in stacking.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply explicit pad fallback (e.g. <code className="text-emerald-400 font-mono">""</code> or <code className="text-emerald-400 font-mono">0</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 font-mono text-amber-300">All Dynamic Array Functions</td>
                  <td className="py-3 px-4 text-slate-300">Output cells blocked by static values or merged cells.</td>
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
              Exam Mastery Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">LET Architecture</span>
                <span>The Gold Standard</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always compose multi-stage array pipelines inside LET for optimal memory efficiency and readability.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">DROP Secondary Headers</span>
                <span>Clean Stacking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always wrap secondary tables in <code className="text-emerald-300 font-mono">DROP(Table, 1)</code> before vertical stacking.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Dynamic Anchors (#)</span>
                <span>Auto-Resizing Models</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reference spilled arrays using <code className="text-sky-300 font-mono">#</code> to guarantee automated downstream recalculation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">F9</kbd>
                <span>Memory Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use F9 on formula segments to evaluate intermediate tensor dimensions before spilling.
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
              Capstone Defense Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on architectural paradigm:</strong> How has mastering these 11 array reshaping functions transformed your ability to build financial models without VBA or helper columns?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine enterprise scalability:</strong> When processing 50,000 corporate records, why do in-memory C++ dynamic array operations dramatically outperform legacy cell-by-cell formulas?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider future integration:</strong> How does dynamic array reshaping serve as the foundation for Python in Excel (<code className="text-amber-300 font-mono">=PY()</code>) and Power BI DAX integration?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Capstone Challenge & Assessment — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Heartiest congratulations on completing Module 004_002: Next-Gen Array Reshaping & Grid Transformation! You have mastered the complete arsenal of 11 modern dynamic array functions. You now possess the architectural ability to design enterprise-grade, zero-VBA, in-memory data pipelines that sanitize, reshape, and consolidate complex financial datasets with complete mathematical precision. Keep practicing and applying these principles in your professional financial engineering career!"
            }
          />
        </div>
      </div>
    </div>
  );
}
