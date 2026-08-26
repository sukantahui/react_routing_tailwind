"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
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
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500/30 selection:text-orange-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/60 text-orange-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📐 Dimension Padding Engine · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Standardize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent leading-tight">
            Resizing & Padding Arrays to Fixed Dimensions with EXPAND
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When merging disparate datasets side-by-side with <code className="text-violet-300 font-mono">HSTACK</code> or feeding normalized 
            matrices into financial projection templates, arrays with unequal row counts produce ugly trailing <code className="text-rose-300 font-mono">#N/A</code> errors. 
            The <code className="text-orange-300 font-mono font-bold">EXPAND</code> function dynamically standardizes matrices to target row and column 
            dimensions, populating newly allocated coordinate cells with custom fallback constants (e.g. <code className="text-emerald-300 font-mono">""</code>, <code className="text-emerald-300 font-mono">0</code>, or <code className="text-emerald-300 font-mono">"N/A"</code>).
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-orange-400 text-base">✓</span>
              <span><strong>Matrix Standardization:</strong> Enlarges rows & columns in RAM</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Custom Padding:</strong> Fill with 0, blanks, or text</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>HSTACK Synergy:</strong> Equalizes table heights before joining</span>
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
              <span className="text-orange-400">⚡</span> Formula Anatomy: =EXPAND()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Standardized Padded Matrix
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-orange-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =EXPAND(<span className="text-amber-300">array</span>, <span className="text-orange-300">rows</span>, <span className="text-slate-400">[columns]</span>, <span className="text-slate-400">[pad_with]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Expand 6-row table to 12 rows, padded with "-"):</span>{" "}
              <span className="text-emerald-400 font-bold">=EXPAND(A2:D7, 12, 4, "-")</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Padding Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or in-memory dynamic array to be expanded.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-orange-300">rows</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The target row count to expand to. Must be &ge; source rows (otherwise returns <code className="text-rose-400 font-mono">#VALUE!</code>).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[columns]</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The target column count. Must be &ge; source columns. Omitted keeps existing column width.
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">[pad_with]</td>
                  <td className="py-3 px-4 text-slate-300">Any Constant</td>
                  <td className="py-3 px-4 text-slate-400">Optional (#N/A)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    Value used to populate new cells. Defaults to <code className="text-rose-400 font-mono">#N/A</code>. Best practice: supply <code className="text-emerald-400 font-mono">""</code> or <code className="text-emerald-400 font-mono">0</code>.
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
              <span className="text-emerald-400">🔬</span> Conceptual & Normalization Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Matrix Standardization
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-orange-400">1.</span> Matrix Equalization for HSTACK
              </h3>
              <p className="leading-relaxed">
                When joining two tables side-by-side with <code className="text-violet-300 font-mono">HSTACK</code>, Excel fills missing rows of shorter tables with <code className="text-rose-400 font-mono">#N/A</code>. 
                Wrapping the shorter table inside <code className="text-amber-300 font-mono">EXPAND(Table2, ROWS(Table1), , "")</code> equalizes heights in RAM before stacking, producing a pristine report.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =HSTACK(Table1, EXPAND(Table2, ROWS(Table1), , ""))
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Why EXPAND Throws #VALUE! on Shrinking
              </h3>
              <p className="leading-relaxed">
                EXPAND is strictly an expansion operator. If source dimensions are 10x4 and you specify <code className="text-amber-300 font-mono">rows=8</code>, Excel triggers <code className="text-rose-400 font-mono">#VALUE!</code>. 
                To shrink or slice arrays, use <code className="text-sky-300 font-mono">TAKE</code> or <code className="text-purple-300 font-mono">CHOOSEROWS</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-rose-300">
                Enlarging &rarr; EXPAND | Shrinking &rarr; TAKE / DROP / CHOOSEROWS
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-yellow-400">💡</span> Dynamic Template Generation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In financial modeling, analysts often need to initialize blank projection matrices (e.g. 10x10 zero grid). 
              Using <code className="text-emerald-300 font-mono">=EXPAND(0, 10, 10, 0)</code> creates a 100-cell zero tensor in memory in under a millisecond, ready for matrix multiplication or scenario simulations.
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
              <span className="text-orange-400">📐</span> Visual Matrix Expansion & Padding Flow
            </h2>
            <span className="text-xs font-mono text-orange-300 bg-orange-950/60 px-3 py-1 rounded-lg border border-orange-800">
              Interactive Dimension Expansion
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how EXPAND takes a compact 5-row x 3-column table and enlarges it to a 10-row x 5-column grid with custom padding:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="175" r="80" fill="#EA580C" fillOpacity="0.05" />
              <circle cx="430" cy="175" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="175" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Source Small Table (Left) */}
              <rect x="30" y="40" width="220" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="40" width="220" height="34" rx="14" fill="#C2410C" fillOpacity="0.3" />
              <text x="140" y="62" fill="#FDBA74" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SOURCE ARRAY (5 ROWS x 3 COLS)</text>

              {/* 5 Rows */}
              <g transform="translate(45, 85)">
                <rect width="190" height="24" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="95" y="16" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">BK-101 · Swadeep · 85k</text>

                <rect y="28" width="190" height="24" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="95" y="44" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">BK-102 · Tuhina · 78k</text>

                <rect y="56" width="190" height="24" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="95" y="72" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">BK-103 · Abhronila · 92k</text>

                <rect y="84" width="190" height="24" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="95" y="100" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">BK-104 · Susmita · 98k</text>

                <rect y="112" width="190" height="24" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="95" y="128" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">BK-105 · Debangshu · 115k</text>
              </g>

              <rect x="45" y="235" width="190" height="50" rx="8" fill="#EA580C" fillOpacity="0.12" stroke="#EA580C" strokeDasharray="3 3" />
              <text x="140" y="255" fill="#FDBA74" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Initial Dimensions: 5 x 3</text>
              <text x="140" y="273" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">15 Source Data Elements</text>

              {/* Arrow */}
              <path d="M 270 175 L 340 175" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="345,175 335,170 335,180" fill="#F97316" />

              {/* Center Engine */}
              <rect x="350" y="60" width="220" height="230" rx="14" fill="#0F172A" stroke="#EA580C" strokeWidth="2" />
              <rect x="350" y="60" width="220" height="34" rx="14" fill="#9A3412" fillOpacity="0.4" />
              <text x="460" y="82" fill="#FED7AA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXPAND ENGINE</text>

              <g transform="translate(360, 105)">
                <rect width="200" height="36" rx="6" fill="#431407" stroke="#EA580C" />
                <text x="100" y="22" fill="#FFEDD5" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=EXPAND(A2:C6, 10, 5, "-")</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Transform Specs:</text>
              <text x="460" y="185" fill="#FED7AA" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Target Rows: 10 (+5 padded)</text>
              <text x="460" y="203" fill="#FED7AA" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Target Cols: 5 (+2 padded)</text>
              <text x="460" y="225" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Padding Value: "-"</text>
              <text x="460" y="250" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Allocates 50 total cells</text>

              {/* Arrow */}
              <path d="M 585 175 L 645 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,175 640,170 640,180" fill="#10B981" />

              {/* Spilled Padded Output (Right) */}
              <rect x="655" y="40" width="170" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="40" width="170" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXPANDED (10 x 5)</text>

              <g transform="translate(665, 85)">
                <rect width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="14" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Swadeep · 85k | - | -</text>

                <rect y="24" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="38" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Tuhina · 78k | - | -</text>

                <rect y="48" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="62" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Abhronila · 92k | - | -</text>

                <rect y="72" width="150" height="20" rx="3" fill="#431407" stroke="#EA580C" strokeDasharray="2 2" />
                <text x="75" y="86" fill="#FDBA74" fontSize="8.5" textAnchor="middle" fontFamily="monospace">- | - | - | - | - [PAD]</text>

                <rect y="96" width="150" height="20" rx="3" fill="#431407" stroke="#EA580C" strokeDasharray="2 2" />
                <text x="75" y="110" fill="#FDBA74" fontSize="8.5" textAnchor="middle" fontFamily="monospace">- | - | - | - | - [PAD]</text>
              </g>

              <rect x="665" y="215" width="150" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="240" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="740" y="260" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">10 Rows x 5 Columns</text>
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
                Explore the branch training roster below or download the master workbook to test <code className="text-orange-300 font-mono">EXPAND</code> in Microsoft Excel.
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
            sheetName="Topic7_EXPAND"
            title="Branch Training Rosters (Disparate Dimensions to Standardize)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-orange-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Case 1 · HSTACK Equalization</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Joining Unequal Campus Tables Side-by-Side
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Analyst <strong>Swadeep Banerjee</strong> joins Barrackpore (10 staff) and Shyamnagar (6 staff) side-by-side with HSTACK. 
                Using <code className="text-amber-300 font-mono">=HSTACK(BK_Table, EXPAND(SH_Table, 10, 4, "-"))</code> standardizes both tables to 10 rows, 
                eliminating trailing <code className="text-rose-400 font-mono">#N/A</code> errors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-orange-300">
                Formula: =HSTACK(T1, EXPAND(T2, 10, 4, "-")) &rarr; Clean Side-by-Side Join
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Standardized Roster Templates</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Building 15-Day Fixed Attendance Grid
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Manager <strong>Priya Chakraborty</strong> receives attendance records where only 8 staff have logged in. 
                To maintain a fixed 15-slot corporate roster template, she applies <code className="text-amber-300 font-mono">=EXPAND(LoggedStaff, 15, 3, "Unassigned")</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =EXPAND(Data, 15, 3, "Unassigned") &rarr; 15-Slot Template
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Projection Matrix</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Expanding 3-Year Actuals into 10-Year Model
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Modeler <strong>Abhronila Sengupta</strong> takes 3-year historical revenue data (<code className="text-indigo-300 font-mono">B2:D6</code>) and expands it into a standardized 10-year DCF projection model: 
                <code className="text-amber-300 font-mono">=EXPAND(B2:D6, 5, 10, 0)</code>, filling forecast years with zero.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =EXPAND(B2:D6, 5, 10, 0) &rarr; Standard 10-Year Matrix
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Dynamic Tensor Initialization</span>
                <span className="text-xs font-mono text-slate-400">Naihati Software Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Zero-Matrix Generation for Simulation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> initializes an 8x8 covariance matrix initialized with zeroes. 
                Using <code className="text-amber-300 font-mono">=EXPAND(0, 8, 8, 0)</code>, 
                he generates an 8x8 grid in 1 formula cell without manual dragging.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =EXPAND(0, 8, 8, 0) &rarr; 8x8 Zero Tensor
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
              <span className="text-orange-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-orange-950 border border-orange-700 text-orange-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Check Source vs Target Dimensions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify source table dimensions (e.g. <code className="text-amber-300 font-mono">A2:D7</code> = 6 rows x 4 cols). Determine target dimensions (e.g. 12 rows x 4 cols). Ensure target &ge; source.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the EXPAND Formula with Padding</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">F2</code>, type: <code className="text-amber-300 font-mono">=EXPAND(A2:D7, 12, 4, "-")</code>. 
                  Supplying <code className="text-emerald-400 font-mono">"-"</code> prevents ugly <code className="text-rose-400 font-mono">#N/A</code> errors from filling newly allocated rows.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Spilled Matrix Bounding Box</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula spills across 12 rows x 4 columns (<code className="text-emerald-300 font-mono">F2#</code>). 
                  The first 6 rows contain genuine employee data, while rows 7 through 12 contain the fallback text <code className="text-orange-300 font-mono">"-"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Use in Horizontal Unions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Join with another 12-row dataset without dimension mismatch: <code className="text-emerald-300 font-mono">=HSTACK(F2#, Another12RowTable)</code>.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Shrinking)</td>
                  <td className="py-3 px-4 text-slate-300">Target rows/cols are smaller than source array dimensions.</td>
                  <td className="py-3 px-4 text-slate-400">Check target against <code className="text-amber-300 font-mono">ROWS(array)</code>.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure target &ge; source. Use TAKE or DROP to reduce dimensions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#N/A in Padded Cells</td>
                  <td className="py-3 px-4 text-slate-300">Omitted the optional [pad_with] argument.</td>
                  <td className="py-3 px-4 text-slate-400">Expanded cells display #N/A error tags.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply explicit pad_with value (e.g. <code className="text-emerald-400 font-mono">""</code>, <code className="text-emerald-400 font-mono">0</code>, or <code className="text-emerald-400 font-mono">"-"</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination expansion cells are occupied.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow unobstructed dynamic spill.</td>
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
              Padding Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-orange-400 font-mono font-bold">ROWS(T1#)</span>
                <span>Dynamic Height Sync</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Synchronize secondary table heights dynamically: <code className="text-amber-300 font-mono">=EXPAND(T2, ROWS(T1#), , "")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">=EXPAND(0, 10, 10, 0)</span>
                <span>Zero-Matrix Generator</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate a 10x10 zero-filled matrix in 1 cell for financial simulations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">HSTACK + EXPAND</span>
                <span>Bulletproof Joins</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always pad shorter tables before horizontal joining to prevent ugly <code className="text-rose-400 font-mono">#N/A</code> spills.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-orange-300 text-xs font-mono">F9</kbd>
                <span>Preview Padded Grid in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the EXPAND expression and press <strong>F9</strong> to inspect the newly padded cells before spilling.
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
                <strong>Reflect on dimension constraints:</strong> Why does Excel return <code className="text-rose-400 font-mono">#VALUE!</code> when you specify target dimensions smaller than the source table? Which functions are designed for array reduction?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine padding constants:</strong> In financial summation models, why is <code className="text-emerald-300 font-mono">pad_with = 0</code> vastly superior to the default <code className="text-rose-400 font-mono">#N/A</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider full-column hazards:</strong> Why does referencing <code className="text-rose-400 font-mono">A:C</code> inside EXPAND guarantee a <code className="text-rose-400 font-mono">#VALUE!</code> crash on any target row count like 20?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Resizing & Padding Arrays with EXPAND — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "EXPAND is the essential tensor normalization utility in modern Excel array programming. Whenever you join tables of unequal heights using HSTACK or construct standardized financial projection schedules, always use EXPAND to standardize matrix dimensions and supply clean fallback values like \"\" or 0. Remember: EXPAND only enlarges arrays; use TAKE or DROP for reduction!"
            }
          />
        </div>
      </div>
    </div>
  );
}
