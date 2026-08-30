"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
              ⚡ Column Vector Aggregation · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Aggregate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Column-by-Column Matrix Processing & Metric Synthesis with BYCOL
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In multi-branch corporate financial reporting and time-series analytics, calculating vertical column metrics 
            (such as monthly branch averages, quarterly peaks, or summary totals) is standard practice. 
            The <code className="text-purple-300 font-mono font-bold">BYCOL</code> helper function slices a 2D matrix 
            <strong>vertically column-by-column</strong>, passing each complete vertical column vector into a custom 
            <code className="text-emerald-300 font-mono">LAMBDA</code> closure and returning a 
            <code className="text-sky-300 font-mono">(1 x N)</code> dynamic spilled horizontal row vector.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Vertical Slicing:</strong> Evaluates complete 1D column vectors</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Horizontal Row Spill:</strong> (1 x N) output dimensions</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>VSTACK Synergy:</strong> Append summary total rows in 1 formula</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =BYCOL()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =BYCOL(2D_array, LAMBDA(col_vector, scalar_calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Column-Wise Matrix Aggregation Structure</span>
            <div className="mt-1 text-white font-bold">
              =BYCOL(<span className="text-amber-300">array</span>, <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">col</span>, <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Monthly Sales Averages (Jan to Apr across all branches):</span> <br />
              <span className="text-emerald-400 font-bold">
                =BYCOL(C5:F8, LAMBDA(col, AVERAGE(col)))
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
                  <th className="py-3 px-4">Dimensional Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Input 2D Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">A 2D data grid of M rows x N columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(col)</td>
                  <td className="py-3 px-4 text-purple-300">Column Aggregator</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly 1 Parameter</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Parameter <code className="text-sky-300 font-mono">col</code> receives a 1D vertical vector of M cells per iteration.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Scalar Result</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Returns a single scalar value per column, producing a (1 x N) horizontal row spill.</td>
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
              <span className="text-emerald-400">🔬</span> Vertical Slicing & Dual-Axis Matrix Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Column-Wise Matrix Reduction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Vector Reduction down Vertical Columns
              </h3>
              <p className="leading-relaxed">
                BYCOL decomposes an <code className="text-amber-300 font-mono">(M x N)</code> matrix into N vertical column vectors of length M. 
                Each column vector is passed into the LAMBDA, collapsed into a single scalar value (via <code className="text-sky-300 font-mono">AVERAGE</code>, <code className="text-sky-300 font-mono">SUM</code>, or <code className="text-sky-300 font-mono">MAX</code>), 
                and assembled into a <code className="text-emerald-300 font-mono">(1 x N)</code> horizontal row output.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                (M x N) Matrix &rarr; BYCOL &rarr; (1 x N) Horizontal Row Vector
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Contrast: BYCOL vs. BYROW
              </h3>
              <p className="leading-relaxed">
                Remember the fundamental dimensional difference: 
                <br />
                • <code className="text-sky-300 font-mono">BYROW</code> slices across rows &rarr; returns a <strong>vertical column vector</strong> (M x 1).
                <br />
                • <code className="text-emerald-300 font-mono">BYCOL</code> slices down columns &rarr; returns a <strong>horizontal row vector</strong> (1 x N).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                BYCOL (Horizontal Row) vs BYROW (Vertical Column)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Constructing Total Rows with VSTACK
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because BYCOL returns a horizontal row vector, it can be passed directly into <code className="text-violet-300 font-mono">VSTACK</code> to attach 
              an automated summary row to the bottom of your data table in a single formula:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =VSTACK(MonthlySalesMatrix, BYCOL(MonthlySalesMatrix, LAMBDA(c, SUM(c))))
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
              <span className="text-purple-400">📐</span> Visual BYCOL Column Slicing & Metric Calculation
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Column Slicing Schematic
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how BYCOL extracts 1D vertical column vectors from a multi-branch sales grid and collapses them into a summary row:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Input Matrix (Left) */}
              <rect x="25" y="30" width="300" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="300" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="175" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SALES MATRIX (4 Branches x 4 Months)</text>

              <g transform="translate(35, 75)">
                {/* Headers */}
                <text x="60" y="15" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Jan</text>
                <text x="125" y="15" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Feb (Col 'c')</text>
                <text x="195" y="15" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Mar</text>
                <text x="255" y="15" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Apr</text>

                {/* Column Highlight (Feb) */}
                <rect x="100" y="24" width="60" height="150" rx="6" fill="#3B0764" fillOpacity="0.6" stroke="#A855F7" />

                {/* Row 1 */}
                <text x="5" y="45" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Barrackpore:</text>
                <text x="60" y="45" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">145k</text>
                <text x="125" y="45" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="monospace">162k</text>
                <text x="195" y="45" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">178k</text>
                <text x="255" y="45" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">195k</text>

                {/* Row 2 */}
                <text x="5" y="80" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Shyamnagar:</text>
                <text x="60" y="80" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">120k</text>
                <text x="125" y="80" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="monospace">131k</text>
                <text x="195" y="80" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">142k</text>
                <text x="255" y="80" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">158k</text>

                {/* Row 3 */}
                <text x="5" y="115" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Ichapur:   </text>
                <text x="60" y="115" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">98k</text>
                <text x="125" y="115" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="monospace">105k</text>
                <text x="195" y="115" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">114k</text>
                <text x="255" y="115" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">126k</text>

                {/* Row 4 */}
                <text x="5" y="150" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Naihati:   </text>
                <text x="60" y="150" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">110k</text>
                <text x="125" y="150" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="monospace">118k</text>
                <text x="195" y="150" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">129k</text>
                <text x="255" y="150" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">141k</text>
              </g>

              {/* Arrow */}
              <path d="M 340 165 L 395 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="400,165 390,160 390,170" fill="#A855F7" />

              {/* Engine (Center) */}
              <rect x="405" y="30" width="220" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="405" y="30" width="220" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="515" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BYCOL WORKER CLOSURE</text>

              <g transform="translate(415, 80)">
                <rect width="200" height="50" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="100" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(col,</text>
                <text x="100" y="38" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">AVERAGE(col))</text>
              </g>

              <text x="515" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Col 2 Evaluation (Feb):</text>
              <text x="515" y="185" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">162k + 131k + 105k + 118k</text>
              <text x="515" y="205" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">Sum = ₹516,000 / 4</text>
              <text x="515" y="235" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Feb Average: ₹129,000</text>

              {/* Arrow */}
              <path d="M 635 165 L 665 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="670,165 660,160 660,170" fill="#10B981" />

              {/* Spilled Row (Right) */}
              <rect x="675" y="100" width="155" height="130" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="675" y="100" width="155" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="752" y="120" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BYCOL RESULT ROW</text>

              <g transform="translate(685, 140)">
                <text x="0" y="20" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Jan: ₹118,250</text>
                <text x="0" y="38" fill="#FDE047" fontSize="8.5" fontWeight="bold" fontFamily="monospace">Feb: ₹129,000</text>
                <text x="0" y="56" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Mar: ₹140,750</text>
                <text x="0" y="74" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Apr: ₹155,000</text>
              </g>

              <text x="752" y="255" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1 Row x 4 Columns</text>
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
                Explore the multi-branch quarterly sales dataset below or download the master workbook to test <code className="text-purple-300 font-mono">BYCOL</code> in Microsoft Excel.
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
            sheetName="Topic8_BYCOL"
            title="Multi-Branch Sales Performance Matrix (Barrackpore, Shyamnagar, Ichapur, Naihati Hubs)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Multi-Branch Sales Analysis</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated Monthly Column Sales Averages
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Commercial Controller <strong>Swadeep Banerjee</strong> writes: 
                <code className="text-emerald-300 font-mono">=BYCOL(C5:F8, LAMBDA(c, AVERAGE(c)))</code>. 
                The formula calculates the average monthly sales across all 4 branch units in a single horizontal spilled row.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =BYCOL(C5:F8, ...) &rarr; Returns [₹118k, ₹129k, ₹141k, ₹155k]
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Financial Statement Assembly</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Table with VSTACK Total Row
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> builds a complete P&amp;L table: 
                <code className="text-amber-300 font-mono">=LET(d, C5:F8, VSTACK(d, BYCOL(d, LAMBDA(c, SUM(c)))))</code>, 
                attaching a dynamic bottom total row that automatically recalculates if rows are inserted!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Single Formula: Grid + Dynamic BYCOL Total Row via VSTACK
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Peak Production Monitoring</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Monthly Maximum Machine Output
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Plant Engineer <strong>Abhronila Sengupta</strong> tracks peak turbine output: 
                <code className="text-indigo-300 font-mono">=BYCOL(MonthlyMachineData, LAMBDA(c, MAX(c)))</code>, 
                extracting the record output for each monthly production column in 1 operation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =BYCOL(Data, LAMBDA(c, MAX(c))) &rarr; Monthly Peak Vector
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Departmental Expense Compliance</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Budget Overrun Column Flags
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Internal Auditor <strong>Debangshu Ghosh</strong> verifies departmental expense caps: 
                <code className="text-amber-300 font-mono">=BYCOL(ExpenseGrid, LAMBDA(c, IF(SUM(c)&gt;500000, "OVER BUDGET", "APPROVED")))</code>, 
                flagging budget overruns per column instantly.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Automated Departmental Budget Compliance Row
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
              <span className="text-purple-400">🪜</span> Step-by-Step BYCOL Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Select the 2D Sales Matrix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify the numeric sales matrix <code className="text-amber-300 font-mono">C5:F8</code> (4 branches x 4 monthly columns).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare BYCOL with 1-Parameter LAMBDA</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C9</code> beneath the table, write: <code className="text-purple-300 font-mono">=BYCOL(C5:F8, LAMBDA(c, AVERAGE(c)))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Press Enter & Observe Horizontal Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The 4 monthly averages spill horizontally across <code className="text-emerald-300 font-mono">C9:F9</code>. Check Jan: ₹118,250, Feb: ₹129,000!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Optional VSTACK Total Row Consolidation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To combine table and totals into 1 formula: <code className="text-emerald-400 font-mono">=VSTACK(C5:F8, BYCOL(C5:F8, LAMBDA(c, SUM(c))))</code>.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Nested Array)</td>
                  <td className="py-3 px-4 text-slate-300">Calculation inside BYCOL returned an array (e.g. VSTACK) instead of 1 scalar per column.</td>
                  <td className="py-3 px-4 text-slate-400">Check if calculation returns multiple values.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure each column evaluation collapses to a single scalar (e.g. AVERAGE, SUM).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA declared more than 1 parameter (e.g. LAMBDA(c1, c2, ...)).</td>
                  <td className="py-3 px-4 text-slate-400">BYCOL strictly requires exactly 1 parameter.</td>
                  <td className="py-3 px-4 text-emerald-400">Declare only 1 parameter representing the column vector: <code className="text-emerald-400 font-mono">LAMBDA(col, ...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells to the right of the formula cell contain text or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Check horizontal adjacent cells.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic dynamic horizontal spill.</td>
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
              Column Aggregation Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">VSTACK Integration</span>
                <span>Self-Totaling Grids</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attach summary rows: <code className="text-emerald-300 font-mono">=VSTACK(Grid, BYCOL(Grid, LAMBDA(c, SUM(c))))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Quartile Spread</span>
                <span>IQR in Columns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compute statistical spread: <code className="text-sky-300 font-mono">=BYCOL(Data, LAMBDA(c, QUARTILE(c,3)-QUARTILE(c,1)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Column Compliance</span>
                <span>AND Checks</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test 100% compliance: <code className="text-purple-300 font-mono">=BYCOL(Tolerances, LAMBDA(c, AND(c&gt;=95)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Horizontal Array Debug</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =BYCOL(...) and press <strong>F9</strong> to inspect the calculated horizontal row array in RAM.
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
                <strong>Reflect on dimensional symmetry:</strong> Why does <code className="text-purple-300 font-mono">BYCOL</code> return a horizontal row vector while <code className="text-emerald-300 font-mono">BYROW</code> returns a vertical column vector?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine dynamic report engineering:</strong> How does combining <code className="text-purple-300 font-mono">BYCOL</code> with <code className="text-violet-300 font-mono">VSTACK</code> allow analysts to attach automated summary rows to matrices in pure formula memory?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider matrix reactivity:</strong> If a sales table dynamically expands from 4 to 12 monthly columns, how does <code className="text-purple-300 font-mono">BYCOL</code> automatically adjust its output width in real-time?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Column-by-Column Processing with BYCOL — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "BYCOL completes your dual-axis matrix aggregation toolkit alongside BYROW. Whenever you need to calculate column averages, department peaks, or attach automated total rows to financial statements using VSTACK, BYCOL provides high-speed, multi-threaded C++ execution in a single elegant formula!"
            }
          />
        </div>
      </div>
    </div>
  );
}
