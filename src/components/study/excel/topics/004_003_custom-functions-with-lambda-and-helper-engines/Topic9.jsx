"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
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
              ⚡ Procedural Matrix Synthesis · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Synthesize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Generating Dynamic Procedural Grids with the MAKEARRAY Function
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Financial modeling and quantitative analytics often require generating complete 2D grids from scratch 
            (e.g., interest rate sensitivity tables, procedural calendars, coordinate grids, or simulation matrices) 
            without relying on existing source data ranges. The <code className="text-purple-300 font-mono font-bold">MAKEARRAY</code> function 
            synthesizes an <code className="text-sky-300 font-mono">(M x N)</code> dynamic spilled matrix in memory, 
            evaluating a custom 2-parameter <code className="text-emerald-300 font-mono">LAMBDA(r, c)</code> closure for each coordinate intersection.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Pure Procedural Math:</strong> Zero source data dependencies</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>1-Based (r, c) Indexing:</strong> Natural mathematical coordinates</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Dynamic Dimensions:</strong> Parametric row and column scaling</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =MAKEARRAY()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =MAKEARRAY(rows, cols, LAMBDA(r, c, calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Procedural Grid Synthesis Structure</span>
            <div className="mt-1 text-white font-bold">
              =MAKEARRAY(<span className="text-amber-300">rows</span>, <span className="text-yellow-300">cols</span>, <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">r</span>, <span className="text-cyan-300">c</span>, <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: 5x5 Multiplication Matrix</span> <br />
              <span className="text-emerald-400 font-bold">
                =MAKEARRAY(5, 5, LAMBDA(r, c, r * c))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Type & Bounds</th>
                  <th className="py-3 px-4">Behavioral Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">rows</td>
                  <td className="py-3 px-4 text-slate-300">Total Row Count</td>
                  <td className="py-3 px-4 text-emerald-400">Integer &ge; 1</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Number of rows in the generated matrix. Values < 1 trigger #CALC!.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">cols</td>
                  <td className="py-3 px-4 text-slate-300">Total Column Count</td>
                  <td className="py-3 px-4 text-emerald-400">Integer &ge; 1</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Number of columns in the generated matrix. Values < 1 trigger #CALC!.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(r, c)</td>
                  <td className="py-3 px-4 text-purple-300">Coordinate Worker</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly 2 Params</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-sky-300 font-mono">r</code> is the current row (1..rows) and <code className="text-cyan-300 font-mono">c</code> is current column (1..cols).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Cell Expression</td>
                  <td className="py-3 px-4 text-emerald-400">Scalar Output</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Must return a single scalar number, text, or date value per (r, c) intersection.</td>
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
              <span className="text-emerald-400">🔬</span> Coordinate Matrix Synthesis & Procedural Generative Math
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Generative Memory Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Coordinate-Driven Evaluation (r, c)
              </h3>
              <p className="leading-relaxed">
                Excel iterates across all <code className="text-amber-300 font-mono">r &in; [1..M]</code> and <code className="text-amber-300 font-mono">c &in; [1..N]</code> combinations. 
                At each intersection, the LAMBDA evaluates its expression using the specific coordinate pair, creating a fully formed 2D grid in contiguous C++ memory!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Parametric Synthesis: (r, c) → Memory Cell Allocation
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> MAKEARRAY vs. SEQUENCE
              </h3>
              <p className="leading-relaxed">
                While <code className="text-sky-300 font-mono">SEQUENCE</code> can only increment numbers linearly, 
                <code className="text-emerald-300 font-mono">MAKEARRAY</code> allows custom non-linear formulas (like loan EMI matrix, 
                Euclidean distances, or conditional chessboards) using any Excel function inside its LAMBDA closure!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                SEQUENCE: Step Arithmetic | MAKEARRAY: Full 2D Algorithmic Logic
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Financial Sensitivity & Scenario Modeling
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              By combining MAKEARRAY with <code className="text-purple-300 font-mono">INDEX</code>, you can build two-variable sensitivity tables:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =MAKEARRAY(ROWS(Rates), COLUMNS(Tenures), LAMBDA(r, c, PMT(INDEX(Rates, r)/12, INDEX(Tenures, c)*12, -LoanAmount)))
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
              <span className="text-purple-400">📐</span> Visual MAKEARRAY Procedural Coordinate Grid Evaluation
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Coordinate Grid Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how MAKEARRAY synthesizes a 5x5 procedural multiplication matrix from coordinate pairs:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Parameters Box (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">INPUT DIMENSIONS</text>

              <g transform="translate(40, 85)">
                <rect width="190" height="45" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="15" y="22" fill="#FDE047" fontSize="11" fontWeight="bold" fontFamily="monospace">rows = 5</text>
                <text x="15" y="38" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Row Index r &in; [1, 2, 3, 4, 5]</text>

                <rect y="60" width="190" height="45" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="15" y="82" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">cols = 5</text>
                <text x="15" y="98" fill="#94A3B8" fontSize="8.5" fontFamily="sans-serif">Col Index c &in; [1, 2, 3, 4, 5]</text>
              </g>

              <rect x="40" y="215" width="190" height="60" rx="6" fill="#065F46" fillOpacity="0.2" stroke="#10B981" />
              <text x="135" y="238" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Total 25 Coordinate Pairs</text>
              <text x="135" y="258" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">(1,1), (1,2) ... (5,5)</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Engine (Center) */}
              <rect x="325" y="30" width="240" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="445" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MAKEARRAY WORKER CLOSURE</text>

              <g transform="translate(340, 80)">
                <rect width="210" height="50" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="105" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(r, c,</text>
                <text x="105" y="38" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">r * c)</text>
              </g>

              <text x="445" y="160" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Sample Coordinate Tests:</text>
              <text x="445" y="182" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">r=1, c=1 → 1 * 1 = 1</text>
              <text x="445" y="200" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">r=3, c=4 → 3 * 4 = 12</text>
              <text x="445" y="218" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">r=5, c=5 → 5 * 5 = 25</text>
              <text x="445" y="250" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 25 Values Evaluated in RAM</text>

              {/* Arrow */}
              <path d="M 580 165 L 610 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="615,165 605,160 605,170" fill="#10B981" />

              {/* Spilled 2D Matrix (Right) */}
              <rect x="620" y="30" width="205" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="620" y="30" width="205" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="722" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SPILLED 5x5 MATRIX</text>

              <g transform="translate(635, 75)" fontFamily="monospace" fontSize="8.5">
                {/* Row 1 */}
                <text x="0" y="20" fill="#A7F3D0">1   2   3   4   5</text>
                {/* Row 2 */}
                <text x="0" y="45" fill="#A7F3D0">2   4   6   8  10</text>
                {/* Row 3 */}
                <text x="0" y="70" fill="#FDE047" fontWeight="bold">3   6   9  12  15</text>
                {/* Row 4 */}
                <text x="0" y="95" fill="#A7F3D0">4   8  12  16  20</text>
                {/* Row 5 */}
                <text x="0" y="120" fill="#A7F3D0">5  10  15  20  25</text>
              </g>

              <text x="722" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">5 Rows x 5 Columns</text>
              <text x="722" y="265" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Dynamic Spilled Grid</text>
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
                Explore the procedural multiplication and sensitivity matrices below or download the master workbook to test <code className="text-purple-300 font-mono">MAKEARRAY</code> in Microsoft Excel.
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
            sheetName="EX1810"
            title="Procedural 5x5 Multiplication Table & Interest Rate Sensitivity Grid"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Quantitative Finance</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Branch</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Loan EMI Sensitivity Grid (Rates vs Tenures)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> generates a 5x4 loan EMI matrix: 
                <code className="text-emerald-300 font-mono">=MAKEARRAY(5, 4, LAMBDA(r, c, ROUND(PMT(INDEX(Rates, r)/12, INDEX(Tenures, c)*12, -1000000), 0)))</code>. 
                Produces a complete two-variable loan matrix in 1 formula without data tables.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =MAKEARRAY(5, 4, ...) → 20 Loan Scenarios Spilled
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Procedural Operations Roster</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated Monthly Duty Calendar Matrix
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Shift Coordinator <strong>Tuhina Mukherjee</strong> generates a 5-week x 7-day calendar roster: 
                <code className="text-amber-300 font-mono">=MAKEARRAY(5, 7, LAMBDA(r, c, LET(d, (r-1)*7 + c, IF(d<=31, d, ""))))</code>. 
                Instantly builds monthly schedule grids without manual date typing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Procedural 5x7 Calendar Grid Generated in Zero Seconds
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Logistics Distance Engine</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Euclidean Warehouse Distance Grid
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Planner <strong>Abhronila Sengupta</strong> maps transit distances between 6 depot aisles: 
                <code className="text-indigo-300 font-mono">=MAKEARRAY(6, 6, LAMBDA(r, c, ROUND(SQRT((r-1)^2 + (c-1)^2)*50, 1)))</code>. 
                Generates a 36-cell distance matrix for delivery routing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =MAKEARRAY(6, 6, LAMBDA(r, c, SQRT(...))) → Distance Matrix
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Synthetic Testing Simulation</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Synthetic Load Testing Matrix
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Software QA Lead <strong>Debangshu Ghosh</strong> generates a 100-row x 10-column test matrix: 
                <code className="text-amber-300 font-mono">=MAKEARRAY(100, 10, LAMBDA(r, c, "TEST-TXN-" & r & "-" & c))</code>, 
                generating 1,000 synthetic transaction records for load testing in memory.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                1,000 Unique Synthetic Test Codes Generated Instantly
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
              <span className="text-purple-400">🪜</span> Step-by-Step MAKEARRAY Formulation Walkthrough
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Determine Matrix Dimensions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Decide the output grid dimensions: 5 rows and 5 columns.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare MAKEARRAY with 2-Parameter LAMBDA</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">B5</code>, write: <code className="text-purple-300 font-mono">=MAKEARRAY(5, 5, LAMBDA(r, c, ...))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert Coordinate Math Expression</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add the multiplication formula: <code className="text-emerald-400 font-mono">r * c</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Observe 5x5 Spilled Matrix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The full 5x5 multiplication table spills across <code className="text-emerald-300 font-mono">B5:F9</code> instantly!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Invalid Dimensions)</td>
                  <td className="py-3 px-4 text-slate-300">Passed rows or cols < 1 (e.g. MAKEARRAY(0, 5, ...)).</td>
                  <td className="py-3 px-4 text-slate-400">Check row/col arguments.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure both row and column counts are positive integers &ge; 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA declared 1 parameter or 3+ parameters instead of exactly 2.</td>
                  <td className="py-3 px-4 text-slate-400">MAKEARRAY strictly requires LAMBDA(r, c).</td>
                  <td className="py-3 px-4 text-emerald-400">Declare exactly 2 parameters: <code className="text-emerald-400 font-mono">LAMBDA(r, c, ...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Nested Array)</td>
                  <td className="py-3 px-4 text-slate-300">Calculation returned an array instead of a single scalar per coordinate.</td>
                  <td className="py-3 px-4 text-slate-400">Check if calculation returns multi-cell arrays.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure each coordinate evaluates to a single scalar value.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells inside the M x N spill area contain existing values.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the M x N rectangular footprint.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic dynamic 2D spill.</td>
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
              MAKEARRAY Power Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Identity Matrix</span>
                <span>Diagonal 1s</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate NxN identity matrix: <code className="text-emerald-300 font-mono">=MAKEARRAY(5, 5, LAMBDA(r, c, IF(r=c, 1, 0)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Checkerboard Flags</span>
                <span>Alternating Shading</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create alternating 0s/1s: <code className="text-sky-300 font-mono">=MAKEARRAY(8, 8, LAMBDA(r, c, MOD(r+c, 2)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Dynamic Sizing</span>
                <span>ROWS & COLUMNS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Size dynamically: <code className="text-purple-300 font-mono">=MAKEARRAY(ROWS(Tbl#), COLUMNS(Tbl#), ...)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>2D Matrix Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =MAKEARRAY(...) and press <strong>F9</strong> to inspect the generated 2D grid in RAM.
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
                <strong>Reflect on procedural independence:</strong> Why is <code className="text-purple-300 font-mono">MAKEARRAY</code> able to generate full 100x100 simulation matrices without referencing a single external cell range on the spreadsheet?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine coordinate indexing:</strong> How does the 1-based <code className="text-sky-300 font-mono">(r, c)</code> parameter pair allow analysts to map math formulas (like distance, loan amortizations, and matrices) directly into spreadsheet cells?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider performance optimization:</strong> Why does generating 10,000 cells with <code className="text-purple-300 font-mono">MAKEARRAY</code> execute in under 1 millisecond compared to legacy copied formulas?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Procedural Grid Generation with MAKEARRAY — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "MAKEARRAY is Excel 365's ultimate procedural synthesis engine. Whenever you need to generate sensitivity grids, simulation models, coordinate maps, or calendar matrices from pure mathematical coordinates without source data dependencies, MAKEARRAY evaluates pure (r, c) logic in contiguous C++ RAM in sub-millisecond speeds!"
            }
          />
        </div>
      </div>
    </div>
  );
}
