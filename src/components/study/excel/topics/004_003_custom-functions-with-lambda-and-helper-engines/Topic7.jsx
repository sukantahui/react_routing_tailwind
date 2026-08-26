"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/lambda_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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
              ⚡ Vector Matrix Processing · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Aggregate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Row-by-Row Matrix Processing & Aggregations with BYROW
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In matrix analytics and gradebook engineering, computing row-level metrics (such as weighted averages, student totals, 
            or row-wise compliance checks) traditionally required copying formulas down hundreds of cells. 
            The <code className="text-purple-300 font-mono font-bold">BYROW</code> helper function slices a 2D data grid 
            <strong>horizontally row-by-row</strong>, passing each complete row vector into a custom <code className="text-emerald-300 font-mono">LAMBDA</code> closure 
            and returning an <code className="text-sky-300 font-mono">(M x 1)</code> dynamic spilled column vector.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Horizontal Slicing:</strong> Evaluates complete 1D row vectors</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Weighted Math:</strong> Seamless pairing with SUMPRODUCT</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>HSTACK Integration:</strong> Append row totals directly to grids</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =BYROW()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =BYROW(2D_array, LAMBDA(row_vector, scalar_calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Row-Wise Matrix Aggregation Structure</span>
            <div className="mt-1 text-white font-bold">
              =BYROW(<span className="text-amber-300">array</span>, <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">r</span>, <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Weighted Score Calculation (20% Acc, 30% Tax, 25% FinMod, 25% Excel):</span> <br />
              <span className="text-emerald-400 font-bold">
                =BYROW(C5:F9, LAMBDA(r, SUMPRODUCT(r, {"{"}0.2, 0.3, 0.25, 0.25{"}"})))
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
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(r)</td>
                  <td className="py-3 px-4 text-purple-300">Row Aggregator</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly 1 Parameter</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Parameter <code className="text-sky-300 font-mono">r</code> receives a 1D horizontal vector of N cells per iteration.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Scalar Result</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Returns a single scalar value per row, producing an (M x 1) vertical column spill.</td>
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
              <span className="text-emerald-400">🔬</span> Mathematical Model & Axis 0 Slicing Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Row-Wise Matrix Reduction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Vector Reduction along Horizontal Axis
              </h3>
              <p className="leading-relaxed">
                BYROW decomposes an <code className="text-amber-300 font-mono">(M x N)</code> matrix into M distinct horizontal vectors of length N. 
                Each row vector is passed into the LAMBDA, collapsed into a single scalar value (via <code className="text-sky-300 font-mono">SUM</code>, <code className="text-sky-300 font-mono">AVERAGE</code>, or <code className="text-sky-300 font-mono">SUMPRODUCT</code>), 
                and assembled into an <code className="text-emerald-300 font-mono">(M x 1)</code> vertical column output.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                (M x N) Matrix &rarr; BYROW &rarr; (M x 1) Column Vector
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Weighted Calculations with SUMPRODUCT
              </h3>
              <p className="leading-relaxed">
                Unlike cell-by-cell formulas that multiply individual cells, passing the row vector <code className="text-sky-300 font-mono">r</code> directly into 
                <code className="text-emerald-300 font-mono">SUMPRODUCT(r, weights)</code> executes high-speed matrix inner-product multiplication in volatile C++ memory!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Vector Inner Product: SUMPRODUCT(r, weights) in 1 Step
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Combining BYROW with HSTACK for Complete Reports
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              You can attach a BYROW calculated metric column directly to your original dataset in a single formula:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =HSTACK(StudentNames, ScoreMatrix, BYROW(ScoreMatrix, LAMBDA(r, AVERAGE(r))))
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
              <span className="text-purple-400">📐</span> Visual BYROW Matrix Slicing & Weighted Aggregation
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Row Slicing Schematic
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how BYROW extracts 1D horizontal row vectors from a student gradebook matrix and collapses them into a single column:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Input Matrix (Left) */}
              <rect x="25" y="30" width="280" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="280" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="165" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SCORES MATRIX (5 Rows x 4 Cols)</text>

              <g transform="translate(35, 75)">
                {/* Row 1 */}
                <rect width="260" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="18" fill="#E2E8F0" fontSize="9" fontFamily="monospace">Swadeep:  [88, 92, 85, 96]</text>

                {/* Row 2 */}
                <rect y="34" width="260" height="28" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="52" fill="#F5D0FE" fontSize="9" fontWeight="bold" fontFamily="monospace">Tuhina:   [79, 84, 88, 91] &rarr; Row Vector 'r'</text>

                {/* Row 3 */}
                <rect y="68" width="260" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="86" fill="#E2E8F0" fontSize="9" fontFamily="monospace">Abhronila:[95, 91, 94, 98]</text>

                {/* Row 4 */}
                <rect y="102" width="260" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="120" fill="#E2E8F0" fontSize="9" fontFamily="monospace">Susmita:  [82, 86, 78, 89]</text>

                {/* Row 5 */}
                <rect y="136" width="260" height="28" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="154" fill="#E2E8F0" fontSize="9" fontFamily="monospace">Debangshu:[91, 95, 96, 99]</text>
              </g>

              <rect x="35" y="255" width="260" height="36" rx="6" fill="#065F46" fillOpacity="0.2" stroke="#10B981" />
              <text x="165" y="277" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Weights: [20%, 30%, 25%, 25%]</text>

              {/* Arrow */}
              <path d="M 320 165 L 375 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="380,165 370,160 370,170" fill="#A855F7" />

              {/* Engine (Center) */}
              <rect x="385" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="385" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="510" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BYROW WORKER CLOSURE</text>

              <g transform="translate(395, 80)">
                <rect width="230" height="60" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="115" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(r,</text>
                <text x="115" y="38" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SUMPRODUCT(r, {"{"}0.2, 0.3, 0.25, 0.25{"}"}))</text>
              </g>

              <text x="510" y="175" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Row 2 Evaluation (Tuhina):</text>
              <text x="510" y="195" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">79*0.20 = 15.8</text>
              <text x="510" y="211" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">84*0.30 = 25.2</text>
              <text x="510" y="227" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">88*0.25 = 22.0  | 91*0.25 = 22.75</text>
              <text x="510" y="255" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Weighted Sum: 85.75</text>

              {/* Arrow */}
              <path d="M 645 165 L 685 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="690,165 680,160 680,170" fill="#10B981" />

              {/* Spilled Column (Right) */}
              <rect x="695" y="30" width="130" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="695" y="30" width="130" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="760" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BYROW RESULT</text>

              <g transform="translate(705, 75)">
                <rect width="110" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="55" y="18" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">89.85</text>

                <rect y="34" width="110" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="55" y="52" fill="#FDE047" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">85.75</text>

                <rect y="68" width="110" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="55" y="86" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">94.35</text>

                <rect y="102" width="110" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="55" y="120" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">83.95</text>

                <rect y="136" width="110" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="55" y="154" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">95.20</text>
              </g>

              <text x="760" y="270" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">5 Rows x 1 Col</text>
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
                Explore the student exam gradebook dataset below or download the master workbook to test <code className="text-purple-300 font-mono">BYROW</code> in Microsoft Excel.
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
            sheetName="Topic7_BYROW"
            title="Student Examination Roster (Accounting, Corporate Tax, Financial Modeling, Excel Analytics)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Academic Examination Roster</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Campus</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Weighted Subject Average per Candidate
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Academic Director <strong>Swadeep Banerjee</strong> evaluates weighted scores across 4 subjects: 
                <code className="text-emerald-300 font-mono">=BYROW(C5:F9, LAMBDA(r, SUMPRODUCT(r, {"{"}0.2, 0.3, 0.25, 0.25{"}"})))</code>. 
                The formula computes all 5 student weighted averages in a single spilled column.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =BYROW(C5:F9, ...) &rarr; Returns [89.85, 85.75, 94.35, 83.95, 95.20]
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Quarterly Sales Aggregation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Row Maximum & Annual Revenue Totals
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Sales Analyst <strong>Tuhina Mukherjee</strong> calculates the highest quarterly peak for each product line: 
                <code className="text-amber-300 font-mono">=BYROW(QtrSalesMatrix, LAMBDA(r, MAX(r)))</code>. 
                Joining this with <code className="text-emerald-300 font-mono">HSTACK</code> produces complete product summary cards without helper columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =BYROW(QtrSales, LAMBDA(r, MAX(r))) &rarr; Product Peak Vector
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Corporate Quality Compliance</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Audit Pass/Fail Compliance per Batch Row
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Quality Engineer <strong>Abhronila Sengupta</strong> tests 5 sensor tolerance columns: 
                <code className="text-indigo-300 font-mono">=BYROW(SensorTolerances, LAMBDA(r, IF(AND(r&gt;=95), "Certified", "Inspection Required")))</code>. 
                Verifies 100% compliance across all 5 checks per production batch.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Row Compliance: All 5 Tolerances &ge; 95% &rarr; "Certified"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · CRM Full Address Synthesis</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Row-Wise Delimited Address Joining
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Database Clerk <strong>Susmita Roy</strong> joins Street, City, State, and PIN code columns: 
                <code className="text-amber-300 font-mono">=BYROW(AddressColumns, LAMBDA(r, TEXTJOIN(", ", TRUE, r)))</code>, 
                generating 5,000 clean mailing labels with zero manual copy-pasting.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Formula: =BYROW(AddrMatrix, LAMBDA(r, TEXTJOIN(", ", TRUE, r)))
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
              <span className="text-purple-400">🪜</span> Step-by-Step BYROW Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Select the 2D Data Matrix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify the numeric score matrix <code className="text-amber-300 font-mono">C5:F9</code> (5 rows x 4 subject columns).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare BYROW with 1-Parameter LAMBDA</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G5</code>, write: <code className="text-purple-300 font-mono">=BYROW(C5:F9, LAMBDA(r, ...))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert SUMPRODUCT with Weight Array Constant</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add calculation: <code className="text-emerald-400 font-mono">SUMPRODUCT(r, {"{"}0.2, 0.3, 0.25, 0.25{"}"})</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Spilled Column Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The 5 weighted averages spill down <code className="text-emerald-300 font-mono">G5:G9</code>. Check Swadeep: 89.85, Tuhina: 85.75!
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
                  <td className="py-3 px-4 text-slate-300">Calculation inside BYROW returned an array (e.g. HSTACK) instead of 1 scalar per row.</td>
                  <td className="py-3 px-4 text-slate-400">Check if calculation returns multiple values.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure each row evaluation collapses to a single scalar (e.g. SUM, AVERAGE).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA declared more than 1 parameter (e.g. LAMBDA(r1, r2, ...)).</td>
                  <td className="py-3 px-4 text-slate-400">BYROW strictly requires exactly 1 parameter.</td>
                  <td className="py-3 px-4 text-emerald-400">Declare only 1 parameter representing the row vector: <code className="text-emerald-400 font-mono">LAMBDA(r, ...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells below the formula cell contain text or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Check cells directly beneath the formula.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic dynamic vertical spill.</td>
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
              Row Aggregation Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">HSTACK Integration</span>
                <span>Complete Grids</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join row sums directly: <code className="text-emerald-300 font-mono">=HSTACK(Grid, BYROW(Grid, LAMBDA(r, SUM(r))))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Text Slicing</span>
                <span>TEXTJOIN in Rows</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Concatenate row strings: <code className="text-sky-300 font-mono">=BYROW(Names, LAMBDA(r, TEXTJOIN(" ", TRUE, r)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Spilled Anchors (#)</span>
                <span>Reactivity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass filtered array anchors: <code className="text-purple-300 font-mono">=BYROW(FilteredTable#, LAMBDA(r, AVERAGE(r)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Vector Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =BYROW(...) and press <strong>F9</strong> to inspect the calculated column vector in memory.
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
                <strong>Reflect on dimensional reduction:</strong> How does <code className="text-purple-300 font-mono">BYROW</code> reduce an (M x N) matrix into an (M x 1) vector, and why is this different from <code className="text-emerald-300 font-mono">MAP</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine mathematical efficiency:</strong> Why is passing a row vector <code className="text-sky-300 font-mono">r</code> directly to <code className="text-emerald-300 font-mono">SUMPRODUCT(r, weights)</code> mathematically superior to writing cell-by-cell formulas?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider report assembly:</strong> How does combining <code className="text-purple-300 font-mono">BYROW</code> with <code className="text-violet-300 font-mono">HSTACK</code> allow analysts to attach calculated summary columns to dynamic tables in memory?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Row-by-Row Processing with BYROW — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "BYROW is the premier helper function for horizontal vector processing across matrices. Whenever you need to calculate weighted averages, row sums, statistical spreads, or compliance validations across multiple columns in a single formula without dragging, BYROW paired with SUMPRODUCT or native aggregators delivers flawless, vectorized results!"
            }
          />
        </div>
      </div>
    </div>
  );
}
