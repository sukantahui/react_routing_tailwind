"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-violet-500/30 selection:text-violet-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-violet-950/80 border border-violet-700/60 text-violet-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🔗 Dual Matrix Stacking Engine · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Merge
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent leading-tight">
            Combining VSTACK and HSTACK to Append & Merge Disparate Datasets
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Modern enterprise data consolidation no longer requires complex VBA loops or external Power Query refreshes. 
            By combining <code className="text-violet-300 font-mono font-bold">VSTACK</code> (vertical row appending) and{" "}
            <code className="text-fuchsia-300 font-mono font-bold">HSTACK</code> (horizontal column joining), financial modelers 
            can assemble composite ledgers, attach dynamic calculated columns, and build complete multi-section reporting cards dynamically in memory.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-violet-400 text-base">✓</span>
              <span><strong>VSTACK (Vertical):</strong> Append branch tables row-by-row</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-fuchsia-400 text-base">✓</span>
              <span><strong>HSTACK (Horizontal):</strong> Join tables & calculated columns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Composite Dashboards:</strong> Header + Body + Totals in 1 cell</span>
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
              <span className="text-violet-400">⚡</span> Formula Anatomy: =VSTACK() & =HSTACK()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Composite Dynamic Spilled Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-violet-300 space-y-2">
              <span className="text-slate-500">// VSTACK (Vertical Row Appending)</span>
              <div className="text-white font-bold">
                =VSTACK(<span className="text-violet-300">array1</span>, <span className="text-purple-300">[array2]</span>, ...)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Consolidates multiple tables vertically: <br />
                <code className="text-emerald-400 font-mono font-bold">=VSTACK(BK_Data, DROP(SH_Data, 1))</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-fuchsia-300 space-y-2">
              <span className="text-slate-500">// HSTACK (Horizontal Column Joining)</span>
              <div className="text-white font-bold">
                =HSTACK(<span className="text-fuchsia-300">array1</span>, <span className="text-pink-300">[array2]</span>, ...)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Joins tables side-by-side or attaches calculated columns: <br />
                <code className="text-emerald-400 font-mono font-bold">=HSTACK(MasterGrid, Col3*1.18)</code>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">VSTACK (Axis 0)</th>
                  <th className="py-3 px-4">HSTACK (Axis 1)</th>
                  <th className="py-3 px-4">Dimension Mismatch Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">Stacking Direction</td>
                  <td className="py-3 px-4 text-violet-300">Top-to-Bottom (Vertical)</td>
                  <td className="py-3 px-4 text-fuchsia-300">Side-by-Side (Horizontal)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Pads missing elements with <code className="text-rose-400 font-mono">#N/A</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">SQL Equivalent</td>
                  <td className="py-3 px-4 text-slate-300">UNION ALL</td>
                  <td className="py-3 px-4 text-slate-300">JOIN / Horizontal Concat</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Wrap with <code className="text-emerald-400 font-mono">UNIQUE()</code> for SQL UNION.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">Max Array Inputs</td>
                  <td className="py-3 px-4 text-slate-300">255 Arrays</td>
                  <td className="py-3 px-4 text-slate-300">255 Arrays</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Evaluates in single compiled C++ pass.</td>
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
              <span className="text-emerald-400">🔬</span> Conceptual & Synthesis Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Composite Memory Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-violet-400">1.</span> Clean Header Preservation with DROP
              </h3>
              <p className="leading-relaxed">
                When stacking multiple branch tables with identical column headers, stacking raw ranges produces repeated header text throughout the ledger. 
                Wrapping secondary tables in <code className="text-amber-300 font-mono">DROP(Table, 1)</code> preserves the top header while appending only pure transaction rows.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =VSTACK(Branch1_All, DROP(Branch2_All, 1), DROP(Branch3_All, 1))
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-fuchsia-400">2.</span> Full Dashboard Construction in 1 Cell
              </h3>
              <p className="leading-relaxed">
                Combine VSTACK and HSTACK to construct an entire end-to-end report containing Title Headers, Data Rows with calculated tax columns, and a Grand Total footer in 1 single cell formula!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-violet-300">
                =VSTACK(HeaderRow, HSTACK(Data, CalcCols), TotalRow)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Branch Tagging with EXPAND
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Before stacking branch datasets, use HSTACK and EXPAND to inject an automated branch name column:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                =HSTACK(EXPAND("Barrackpore", ROWS(BK_Data), , "Barrackpore"), BK_Data)
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
              <span className="text-violet-400">📐</span> Visual Dual Stacking Architecture
            </h2>
            <span className="text-xs font-mono text-violet-300 bg-violet-950/60 px-3 py-1 rounded-lg border border-violet-800">
              Interactive VSTACK + HSTACK Fusion
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how VSTACK appends branch tables vertically while HSTACK attaches dynamic calculated GST columns in memory:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#7C3AED" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#C026D3" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Source Tables (Left) */}
              <rect x="25" y="30" width="230" height="130" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="230" height="26" rx="10" fill="#6D28D9" fillOpacity="0.3" />
              <text x="140" y="47" fill="#DDD6FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BARRACKPORE (4 ROWS x 3 COLS)</text>
              <text x="35" y="75" fill="#A78BFA" fontSize="8.5" fontFamily="monospace">BK-101 · Swadeep · ₹45,000</text>
              <text x="35" y="95" fill="#A78BFA" fontSize="8.5" fontFamily="monospace">BK-102 · Tuhina · ₹38,000</text>
              <text x="35" y="115" fill="#A78BFA" fontSize="8.5" fontFamily="monospace">BK-103 · Abhronila · ₹52,000</text>
              <text x="35" y="135" fill="#A78BFA" fontSize="8.5" fontFamily="monospace">BK-104 · Susmita · ₹61,000</text>

              <rect x="25" y="175" width="230" height="130" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="175" width="230" height="26" rx="10" fill="#A21CAF" fillOpacity="0.3" />
              <text x="140" y="192" fill="#F5D0FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SHYAMNAGAR (4 ROWS x 3 COLS)</text>
              <text x="35" y="220" fill="#F472B6" fontSize="8.5" fontFamily="monospace">SH-201 · Debangshu · ₹74,000</text>
              <text x="35" y="240" fill="#F472B6" fontSize="8.5" fontFamily="monospace">SH-202 · Priya · ₹33,000</text>
              <text x="35" y="260" fill="#F472B6" fontSize="8.5" fontFamily="monospace">SH-203 · Riya · ₹29,000</text>
              <text x="35" y="280" fill="#F472B6" fontSize="8.5" fontFamily="monospace">SH-204 · Subham · ₹41,000</text>

              {/* Arrow */}
              <path d="M 270 170 L 340 170" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="345,170 335,165 335,175" fill="#A855F7" />

              {/* Center Engine */}
              <rect x="350" y="50" width="230" height="240" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="350" y="50" width="230" height="34" rx="14" fill="#7E22CE" fillOpacity="0.4" />
              <text x="465" y="72" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VSTACK + HSTACK FUSION</text>

              <g transform="translate(360, 95)">
                <rect width="210" height="42" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="105" y="18" fill="#F5D0FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=LET(all, VSTACK(T1, DROP(T2,1)),</text>
                <text x="105" y="34" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">HSTACK(all, CHOOSECOLS(all,3)*0.18))</text>
              </g>

              <text x="465" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Processing Pipeline:</text>
              <text x="465" y="185" fill="#E9D5FF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">1. VSTACK &rarr; 8 Combined Rows</text>
              <text x="465" y="203" fill="#E9D5FF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">2. DROP &rarr; Strip SH Header</text>
              <text x="465" y="221" fill="#E9D5FF" fontSize="9.5" textAnchor="middle" fontFamily="monospace">3. HSTACK &rarr; Attach GST Vector</text>
              <text x="465" y="245" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Unified 8x4 Clean Matrix</text>

              {/* Arrow */}
              <path d="M 595 170 L 655 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="660,170 650,165 650,175" fill="#10B981" />

              {/* Spilled Composite Output (Right) */}
              <rect x="665" y="40" width="165" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="665" y="40" width="165" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="747" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">COMPOSITE LEDGER</text>

              <g transform="translate(675, 85)">
                <rect width="145" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="13" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Swadeep · ₹45k · ₹8.1k</text>

                <rect y="22" width="145" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="35" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Tuhina · ₹38k · ₹6.8k</text>

                <rect y="44" width="145" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="57" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Abhronila · ₹52k · ₹9.3k</text>

                <rect y="66" width="145" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="79" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Susmita · ₹61k · ₹10.9k</text>

                <rect y="88" width="145" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="101" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Debangshu · ₹74k · ₹13.3k</text>
              </g>

              <rect x="675" y="215" width="145" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="747" y="240" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="747" y="260" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">8 Rows x 4 Columns</text>
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
                Explore the Barrackpore and Shyamnagar branch tables below or download the master workbook to test <code className="text-violet-300 font-mono">VSTACK</code> and <code className="text-fuchsia-300 font-mono">HSTACK</code>.
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
            sheetName="Topic10_VSTACK_HSTACK"
            title="Multi-Branch Datasets (Barrackpore & Shyamnagar Branch Registers)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Case 1 · Multi-Branch Consolidation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore & Shyamnagar</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Consolidating Regional Fee Ledgers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> consolidates student fees from Barrackpore (<code className="text-amber-300 font-mono">A2:D6</code>) and Shyamnagar (<code className="text-amber-300 font-mono">F2:I6</code>). 
                Using <code className="text-emerald-300 font-mono">=VSTACK(A2:D6, DROP(F2:I6, 1))</code>, 
                he merges both campuses into a single unified ledger with 1 master header row.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-violet-300">
                Formula: =VSTACK(BK_Data, DROP(SH_Data, 1)) &rarr; 8-Record Unified Ledger
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 2 · Dynamic Tax Calculation Column</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Tax Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Attaching 18% GST and Total Invoiced Amount
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Consultant <strong>Abhronila Sengupta</strong> takes consolidated ledger <code className="text-violet-300 font-mono">H2#</code> and dynamically attaches GST (18%) and Gross Invoiced vectors: 
                <code className="text-amber-300 font-mono">=HSTACK(H2#, CHOOSECOLS(H2#, 4)*0.18, CHOOSECOLS(H2#, 4)*1.18)</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Formula: =HSTACK(H2#, Col4*0.18, Col4*1.18) &rarr; Full Invoiced Grid
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Single-Formula Executive Card</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Industrial Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Assembling Title, Data & Grand Total Card
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Susmita Roy</strong> creates a dynamic executive report in 1 formula cell: 
                <code className="text-amber-300 font-mono">=VSTACK({"{"}"ID", "Name", "Net", "GST"{"}"}, CleanData, {"{"}"Grand Total", "", SUM(Net), SUM(GST){"}"})</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =VSTACK(Header, Data, Total) &rarr; Full Self-Contained Card
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Automated Campus Tagging</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Injecting Campus Labels Before Stacking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Lead <strong>Debangshu Ghosh</strong> injects automated campus identifiers into raw branch exports: 
                <code className="text-amber-300 font-mono">=VSTACK(HSTACK(EXPAND("BK", ROWS(T1), , "BK"), T1), HSTACK(EXPAND("SH", ROWS(T2), , "SH"), DROP(T2, 1)))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =VSTACK(HSTACK("BK", T1), HSTACK("SH", DROP(T2, 1)))
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
              <span className="text-violet-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-violet-950 border border-violet-700 text-violet-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Inspect Branch Ranges & Headers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Review Barrackpore (<code className="text-amber-300 font-mono">A2:D6</code>) and Shyamnagar (<code className="text-amber-300 font-mono">F2:I6</code>). Both have headers in row 2 and 4 data rows.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-fuchsia-950 border border-fuchsia-700 text-fuchsia-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Consolidate Vertically with VSTACK & DROP</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">K2</code>, type: <code className="text-amber-300 font-mono">=VSTACK(A2:D6, DROP(F2:I6, 1))</code>. 
                  This creates a clean 9-row x 4-column consolidated dataset with 1 header row and 8 data rows.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Attach Calculated Vectors with HSTACK</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">P2</code>, type: <code className="text-amber-300 font-mono">=HSTACK(K2#, VSTACK("GST @ 18%", DROP(CHOOSECOLS(K2#, 4)*0.18, 1)))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Sort Descending by Fee Amount</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wrap in SORT: <code className="text-emerald-300 font-mono">=SORT(DROP(K2#, 1), 4, -1)</code> to rank all 8 students across both campuses by fee amount descending.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A in Stacked Cells</td>
                  <td className="py-3 px-4 text-slate-300">Arrays have unequal column widths (VSTACK) or unequal row heights (HSTACK).</td>
                  <td className="py-3 px-4 text-slate-400">Check array dimensions with <code className="text-amber-300 font-mono">ROWS()</code> and <code className="text-amber-300 font-mono">COLUMNS()</code>.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap shorter arrays with <code className="text-emerald-400 font-mono">EXPAND(..., , "")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Duplicate Headers</td>
                  <td className="py-3 px-4 text-slate-300">Forgot to wrap secondary tables in <code className="text-amber-300 font-mono">DROP(Table, 1)</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Header text appears in the middle of the consolidated ledger.</td>
                  <td className="py-3 px-4 text-emerald-400">Always wrap tables 2, 3, etc. in <code className="text-emerald-400 font-mono">DROP(..., 1)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by existing text or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow multi-dimensional dynamic spill.</td>
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
              Stacking Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-violet-400 font-mono font-bold">UNIQUE(VSTACK())</span>
                <span>SQL UNION (Distinct)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deduplicate stacked datasets across multiple branches: <code className="text-amber-300 font-mono">=UNIQUE(VSTACK(T1, T2))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-fuchsia-400 font-mono font-bold">CHOOSECOLS + VSTACK</span>
                <span>Schema Alignment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standardize differing column orders across branches before stacking.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">LET(all, VSTACK())</span>
                <span>Stack Once in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cache the consolidated table in LET to eliminate redundant recalculation cycles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-violet-300 text-xs font-mono">F9</kbd>
                <span>Evaluate Composite Matrix</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the VSTACK/HSTACK formula and press <strong>F9</strong> to inspect the unified array structure in RAM.
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
                <strong>Reflect on schema synchronization:</strong> What happens if Branch 1 exports columns as [ID, Name, Fee] and Branch 2 exports as [ID, Fee, Name]? How does using <code className="text-violet-300 font-mono">CHOOSECOLS</code> before <code className="text-violet-300 font-mono">VSTACK</code> prevent corrupted data columns?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine multi-table stacking:</strong> Why is <code className="text-emerald-300 font-mono">=VSTACK(Jan!A2:D20, Feb!A2:D20, Mar!A2:D20)</code> vastly superior to legacy 3D consolidation or VBA copy-paste macros?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider dimension mismatch:</strong> When joining two tables of unequal heights side-by-side with <code className="text-fuchsia-300 font-mono">HSTACK</code>, how does wrapping the shorter table with <code className="text-orange-300 font-mono">EXPAND</code> eliminate <code className="text-rose-400 font-mono">#N/A</code> errors?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Combining VSTACK & HSTACK — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "VSTACK and HSTACK represent the culmination of in-memory data consolidation in Excel 365. Whenever you need to consolidate multi-branch accounting registers or attach dynamic calculated tax columns, use =VSTACK(BK_Data, DROP(SH_Data, 1)) to append rows cleanly, and =HSTACK(Data, CalcCols) to join columns. Always standardize column order with CHOOSECOLS before stacking if source schemas differ!"
            }
          />
        </div>
      </div>
    </div>
  );
}
