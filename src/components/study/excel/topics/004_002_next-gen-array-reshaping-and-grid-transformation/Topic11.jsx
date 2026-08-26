"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
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
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500/30 selection:text-rose-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🔄 Matrix Transposition Engine · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Align
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent leading-tight">
            Matrix Transposition & Multi-Block Alignment Using Array Functions
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Corporate multi-entity financial consolidation frequently fails because different branch managers structure data 
            in mismatched orientations (some horizontal across quarters, some vertical down accounts). 
            Using dynamic <code className="text-rose-300 font-mono font-bold">TRANSPOSE</code> and multi-block array reshaping pipelines, 
            modelers can rotate, align, and unpivot 2D cross-tab matrix schedules into standardized relational tables in RAM without static copy-paste operations.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-rose-400 text-base">✓</span>
              <span><strong>Dynamic Transposition:</strong> (M x N) &rarr; (N x M) in 1 formula cell</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Block Alignment:</strong> Harmonize disparate branch orientations</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Cross-Tab Unpivoting:</strong> Flatten 2D matrices to 3-column ledgers</span>
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
              <span className="text-rose-400">⚡</span> Formula Anatomy: =TRANSPOSE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Rotated Dynamic Spilled Matrix
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-rose-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =TRANSPOSE(<span className="text-amber-300">array</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Transpose 5-quarter horizontal budget to vertical):</span>{" "}
              <span className="text-emerald-400 font-bold">=TRANSPOSE(A2:E6)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Coordinate Swapping Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The 2D table, range, or 1D vector to rotate. Maps coordinate <code className="text-amber-300 font-mono">(i, j) &rarr; (j, i)</code>.
                  </td>
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
              <span className="text-emerald-400">🔬</span> Conceptual & Alignment Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Axis Transposition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-rose-400">1.</span> Multi-Branch Dataset Harmonization
              </h3>
              <p className="leading-relaxed">
                When consolidating 3 branch budgets where Branch 1 has quarters across columns, but Branch 2 and 3 have quarters down rows, direct VSTACK fails. 
                Applying <code className="text-rose-300 font-mono">TRANSPOSE(Branch1)</code> standardizes its orientation, allowing seamless union via VSTACK.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =VSTACK(TRANSPOSE(Branch1), DROP(Branch2, 1), DROP(Branch3, 1))
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> The 16,384 Column Boundary Rule
              </h3>
              <p className="leading-relaxed">
                An Excel worksheet contains 1,048,576 rows but only 16,384 columns (Column XFD). 
                Attempting to transpose whole column ranges like <code className="text-rose-400 font-mono">A:A</code> or ranges with &gt; 16,384 rows will trigger a fatal calculation overflow crash. Always use bounded ranges!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-rose-300">
                Max Allowed Rows to Transpose Horizontally: 16,384
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Cross-Tab Unpivoting with LET & TOCOL
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unpivot any 2D cross-tab matrix (Products x Quarters) into a clean 3-column relational database in 1 formula:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =LET(p, A2:A6, q, B1:E1, v, B2:E6, HSTACK(TOCOL(IF(v&lt;&gt;"", p)), TOCOL(IF(v&lt;&gt;"", q)), TOCOL(v)))
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
              <span className="text-rose-400">📐</span> Visual Matrix Transposition & Multi-Block Alignment
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Interactive (M x N) &rarr; (N x M) Rotation
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how TRANSPOSE rotates a horizontal quarterly departmental budget matrix into a vertical database layout:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#E11D48" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#7C3AED" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Horizontal Matrix (Left) */}
              <rect x="25" y="40" width="230" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="40" width="230" height="34" rx="14" fill="#9F1239" fillOpacity="0.3" />
              <text x="140" y="62" fill="#FECDD3" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">HORIZONTAL BUDGET (5x5)</text>

              {/* 5 Horizontal Rows */}
              <g transform="translate(35, 85)">
                <rect width="210" height="22" rx="4" fill="#4C0519" stroke="#E11D48" />
                <text x="105" y="15" fill="#FFE4E6" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Dept | Q1 | Q2 | Q3 | Q4</text>

                <rect y="26" width="210" height="22" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="105" y="41" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Software | 45k | 52k | 61k | 74k</text>

                <rect y="52" width="210" height="22" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="105" y="67" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Hardware | 38k | 41k | 47k | 55k</text>

                <rect y="78" width="210" height="22" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="105" y="93" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Consulting | 52k | 58k | 64k | 71k</text>

                <rect y="104" width="210" height="22" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="105" y="119" fill="#F8FAFC" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Marketing | 61k | 69k | 75k | 82k</text>
              </g>

              <rect x="35" y="225" width="210" height="60" rx="8" fill="#E11D48" fillOpacity="0.12" stroke="#E11D48" strokeDasharray="3 3" />
              <text x="140" y="245" fill="#FDA4AF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Horizontal Axis Orientation</text>
              <text x="140" y="265" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">5 Rows x 5 Columns</text>

              {/* Arrow */}
              <path d="M 270 170 L 340 170" stroke="#FB7185" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="345,170 335,165 335,175" fill="#FB7185" />

              {/* Center Engine */}
              <rect x="350" y="60" width="220" height="220" rx="14" fill="#0F172A" stroke="#E11D48" strokeWidth="2" />
              <rect x="350" y="60" width="220" height="34" rx="14" fill="#881337" fillOpacity="0.4" />
              <text x="460" y="82" fill="#FFE4E6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TRANSPOSE ENGINE</text>

              <g transform="translate(360, 105)">
                <rect width="200" height="36" rx="6" fill="#4C0519" stroke="#E11D48" />
                <text x="100" y="22" fill="#FFE4E6" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TRANSPOSE(A2:E6)</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Coordinate Mapping:</text>
              <text x="460" y="185" fill="#FDA4AF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Cell (i, j) &rarr; Cell (j, i)</text>
              <text x="460" y="203" fill="#FDA4AF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Rows become Columns</text>
              <text x="460" y="221" fill="#FDA4AF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Columns become Rows</text>
              <text x="460" y="248" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Rotated 90° in RAM</text>

              {/* Arrow */}
              <path d="M 585 170 L 645 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,170 640,165 640,175" fill="#10B981" />

              {/* Spilled Transposed Matrix (Right) */}
              <rect x="655" y="40" width="170" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="40" width="170" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VERTICAL MATRIX (5x5)</text>

              <g transform="translate(665, 85)">
                <rect width="150" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="15" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Dept | Soft | Hard | Cons | Mkt</text>

                <rect y="26" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="41" fill="#F8FAFC" fontSize="8" textAnchor="middle" fontFamily="monospace">Q1 | 45k | 38k | 52k | 61k</text>

                <rect y="52" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="67" fill="#F8FAFC" fontSize="8" textAnchor="middle" fontFamily="monospace">Q2 | 52k | 41k | 58k | 69k</text>

                <rect y="78" width="150" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="75" y="93" fill="#F8FAFC" fontSize="8" textAnchor="middle" fontFamily="monospace">Q3 | 61k | 47k | 64k | 75k</text>
              </g>

              <rect x="665" y="210" width="150" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="235" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: G2#</text>
              <text x="740" y="255" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Standardized Vertical Layout</text>
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
                Explore the horizontal quarterly budget schedule below or download the master workbook to test <code className="text-rose-300 font-mono">TRANSPOSE</code> in Microsoft Excel.
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
            sheetName="Topic11_Matrix_Alignment"
            title="Quarterly Departmental Budget Matrix (Horizontal Cross-Tab Schedule)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Case 1 · Multi-Entity Budget Alignment</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Rotating Horizontal Regional Schedules
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Controller <strong>Swadeep Banerjee</strong> consolidates quarterly expenses across 4 departments (<code className="text-amber-300 font-mono">A2:E6</code>). 
                Using <code className="text-rose-300 font-mono">=TRANSPOSE(A2:E6)</code>, 
                he converts the horizontal matrix into a vertical database layout where quarters run down rows and departments span across columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-rose-300">
                Formula: =TRANSPOSE(A2:E6) &rarr; Standardized Vertical Schedule
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · 2D Cross-Tab Unpivoting</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unpivoting Cross-Tabs to 3-Column Tables
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Susmita Roy</strong> unpivots a 4-department x 4-quarter matrix into a flat 3-column database [Department, Quarter, Expense]. 
                She applies <code className="text-amber-300 font-mono">=LET(p, A2:A6, q, B1:E1, v, B2:E6, HSTACK(TOCOL(IF(v&lt;&gt;"", p)), TOCOL(IF(v&lt;&gt;"", q)), TOCOL(v)))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: Dynamic LET Unpivot &rarr; 16-Row Normalized Table
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Horizontal Column Sorting</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Tax Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Sorting Horizontal Matrix Columns Descending
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Corporate Tax Consultant <strong>Abhronila Sengupta</strong> sorts horizontal quarterly revenue columns by value descending: 
                <code className="text-amber-300 font-mono">=TRANSPOSE(SORT(TRANSPOSE(HorizontalData), 1, -1))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =TRANSPOSE(SORT(TRANSPOSE(Data), 1, -1))
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Executive KPI Scorecard</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Scorecard from Multi-Year Model
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> extracts 4 critical KPI rows from a 50-row financial model and flips them into vertical dashboard columns: 
                <code className="text-amber-300 font-mono">=TRANSPOSE(CHOOSEROWS(A1:M50, 1, 10, 25, 48))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TRANSPOSE(CHOOSEROWS(Model, 1, 10, 25, 48))
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
              <span className="text-rose-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-rose-950 border border-rose-700 text-rose-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Inspect Source Cross-Tab Grid</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Review the source 5-row x 5-column cross-tab in <code className="text-amber-300 font-mono">A2:E6</code>. Row 2 contains column headers (Dept, Q1, Q2, Q3, Q4) and Column A has department names.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the TRANSPOSE Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G2</code>, type: <code className="text-amber-300 font-mono">=TRANSPOSE(A2:E6)</code>. 
                  Press Enter to rotate the matrix 90 degrees.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Inspect the Rotated Dynamic Grid</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The formula spills across 5 rows x 5 columns (<code className="text-emerald-300 font-mono">G2:K6</code>). 
                  Quarters run down rows (Q1, Q2, Q3, Q4 in Col G) while departments become the new column headers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Consolidate with Other Vertical Datasets</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Now that the orientation is vertical, stack with other branch ledgers: <code className="text-emerald-300 font-mono">=VSTACK(G2#, OtherVerticalBranchTable)</code>.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#REF! / #NUM! (Column Limit)</td>
                  <td className="py-3 px-4 text-slate-300">Attempted to transpose &gt; 16,384 rows across horizontal columns.</td>
                  <td className="py-3 px-4 text-slate-400">Check source rows count: exceeds 16,384.</td>
                  <td className="py-3 px-4 text-emerald-400">Use bounded ranges with &le; 16,384 rows. Never transpose whole columns like A:A!</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Zeroes in Blank Cells</td>
                  <td className="py-3 px-4 text-slate-300">Blank source cells evaluate as 0 in transposed grid.</td>
                  <td className="py-3 px-4 text-slate-400">Blank cells display 0.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap in IF: <code className="text-emerald-400 font-mono">=IF(TRANSPOSE(Data)="","",TRANSPOSE(Data))</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by existing values or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow rotated dynamic spill.</td>
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
              Matrix Alignment Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-rose-400 font-mono font-bold">TRANSPOSE(TEXTSPLIT())</span>
                <span>Vertical Token Splitter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Split a comma-separated string into a vertical column: <code className="text-amber-300 font-mono">=TRANSPOSE(TEXTSPLIT(A1, ","))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">TRANSPOSE(Headers)</span>
                <span>Vertical Header List</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract table column titles as a vertical list: <code className="text-emerald-300 font-mono">=TRANSPOSE(Table1[#Headers])</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Horizontal Sort Hook</span>
                <span>Sort Across Columns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sort horizontal columns: <code className="text-amber-300 font-mono">=TRANSPOSE(SORT(TRANSPOSE(RowData), 1, 1))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-rose-300 text-xs font-mono">F9</kbd>
                <span>Evaluate Transposed Matrix</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight TRANSPOSE in the formula bar and press <strong>F9</strong> to inspect the inverted coordinate grid in RAM.
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
                <strong>Reflect on grid boundaries:</strong> Why does Excel happily let you transpose a 16,000-row column across columns, but crashes with <code className="text-rose-400 font-mono">#REF!</code> if you try to transpose 20,000 rows?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine matrix dimensionality:</strong> How does <code className="text-rose-300 font-mono">TRANSPOSE(3x4)</code> differ from <code className="text-sky-300 font-mono">TOROW(3x4)</code>? Which one preserves 2D matrix shape and which flattens to 1D?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider automated unpivoting:</strong> In power modeling, why is writing a dynamic 3-line LET unpivot formula with <code className="text-sky-300 font-mono">TOCOL</code> and <code className="text-fuchsia-300 font-mono">HSTACK</code> superior to manual unpivoting in Power Query for small-to-medium matrices?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Matrix Transposition & Alignment — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TRANSPOSE is the cornerstone of multi-block matrix alignment and cross-tab consolidation in Excel 365. Whenever you receive horizontal budget schedules that must be merged with vertical corporate ledgers, never perform static copy-paste transpose. Use =TRANSPOSE(Range) to rotate axes dynamically in memory, and pair with TOCOL and HSTACK for automated 2D cross-tab unpivoting!"
            }
          />
        </div>
      </div>
    </div>
  );
}
