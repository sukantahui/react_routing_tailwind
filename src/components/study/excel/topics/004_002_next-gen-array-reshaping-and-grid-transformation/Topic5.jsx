"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🏆 Boundary Slicing Engine · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Filter
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Extracting Top N or Bottom N Records from Arrays with TAKE
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Extracting high-priority executive metrics—such as the Top 5 revenue generators, rolling 12-month historical windows, 
            or lowest 3 quality scores—traditionally required fragile <code className="text-rose-300 font-mono">LARGE / SMALL + MATCH</code> formulas 
            that frequently failed on duplicate tied values. The <code className="text-emerald-300 font-mono font-bold">TAKE</code> function 
            delivers seamless boundary extraction across rows and columns using positive (<code className="text-sky-300 font-mono">+N</code>) 
            and negative (<code className="text-amber-300 font-mono">-N</code>) counts in lightning-fast RAM.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Top N Extraction:</strong> Positive row count pulls from top</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Bottom N Extraction:</strong> Negative row count pulls from tail</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Graceful Capping:</strong> No errors if requested N exceeds row count</span>
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
              <span className="text-emerald-400">⚡</span> Formula Anatomy: =TAKE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Subset Boundary Matrix
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-emerald-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =TAKE(<span className="text-amber-300">array</span>, <span className="text-emerald-300">rows</span>, <span className="text-slate-400">[columns]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Extract Top 5 sorted performers):</span>{" "}
              <span className="text-emerald-400 font-bold">=TAKE(SORT(A2:H30, 7, -1), 5)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Boundary Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D matrix, table range, or in-memory array from which to take data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">rows</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>+N</strong>: Takes first N rows from top; <strong>-N</strong>: Takes last N rows from bottom. (0 causes #CALC!).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">[columns]</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>+N</strong>: Takes first N columns from left; <strong>-N</strong>: Takes last N columns from right. Omitted keeps all columns.
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
              <span className="text-emerald-400">🔬</span> Conceptual & Boundary Slicing Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Graceful Bounds Capping
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">1.</span> Graceful Overflow Tolerance
              </h3>
              <p className="leading-relaxed">
                Unlike <code className="text-purple-300 font-mono">CHOOSEROWS</code> which throws a <code className="text-rose-400 font-mono">#VALUE!</code> error if you request an out-of-bounds row index, 
                <code className="text-emerald-300 font-mono">TAKE</code> gracefully caps at the available array boundaries. 
                If your table contains only 8 rows and you write <code className="text-amber-300 font-mono">=TAKE(Table, 20)</code>, Excel returns all 8 rows without error.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Formula: =TAKE(8_Row_Table, 20) &rarr; Safe 8-Row Output (No Crash)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-sky-400">2.</span> Deterministic Tie-Breaking
              </h3>
              <p className="leading-relaxed">
                In legacy Excel, multiple students with identical scores broke <code className="text-slate-400 font-mono">MATCH</code> formulas, returning duplicate first occurrences. 
                By pairing <code className="text-sky-300 font-mono">SORTBY</code> (using Primary Score, then Secondary Tie-Breaker) with <code className="text-emerald-300 font-mono">TAKE</code>, rankings evaluate cleanly without tie conflicts.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-sky-300">
                =TAKE(SORTBY(Students, Scores, -1, Attendance, -1), 5)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Top & Bottom Variance Reporting Architecture
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When executive boards analyze branch performance, they need to see the Top 3 overperformers and Bottom 3 underperformers simultaneously. 
              By nesting TAKE inside <code className="text-violet-300 font-mono">VSTACK</code> with a single <code className="text-sky-300 font-mono">LET</code> variable, you generate a complete variance comparison card in 1 formula cell:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                =LET(s, SORT(BranchSalesTable, 2, -1), VSTACK(TAKE(s, 3), TAKE(s, -3)))
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
              <span className="text-emerald-400">📐</span> Visual Boundary Extraction (Top & Bottom Slicing)
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Interactive Boundary Slicing Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how TAKE extracts the Top 3 records via positive count and Bottom 3 records via negative count from a ranked performance dataset:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="160" cy="175" r="80" fill="#059669" fillOpacity="0.05" />
              <circle cx="440" cy="175" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="175" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Sorted Table (Left) */}
              <rect x="30" y="30" width="250" height="290" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="30" width="250" height="34" rx="14" fill="#065F46" fillOpacity="0.3" />
              <text x="155" y="52" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SORTED SCORECARD MASTER</text>

              {/* Top 3 Zone */}
              <rect x="42" y="72" width="225" height="92" rx="8" fill="#064E3B" fillOpacity="0.3" stroke="#10B981" strokeDasharray="3 3" />
              <text x="50" y="90" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">#1 Abhronila · 293 pts</text>
              <text x="50" y="116" fill="#A7F3D0" fontSize="10" fontFamily="monospace">#2 Debangshu · 290 pts</text>
              <text x="50" y="142" fill="#A7F3D0" fontSize="10" fontFamily="monospace">#3 Swadeep · 288 pts</text>

              {/* Middle (Skipped) */}
              <rect x="42" y="172" width="225" height="46" rx="6" fill="#0F172A" stroke="#334155" />
              <text x="155" y="199" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="sans-serif">... Middle 6 Performers ...</text>

              {/* Bottom 3 Zone */}
              <rect x="42" y="226" width="225" height="84" rx="8" fill="#7C2D12" fillOpacity="0.2" stroke="#F59E0B" strokeDasharray="3 3" />
              <text x="50" y="246" fill="#FDE68A" fontSize="10" fontFamily="monospace">#10 Rahul · 251 pts</text>
              <text x="50" y="270" fill="#FDE68A" fontSize="10" fontFamily="monospace">#11 Aniket · 245 pts</text>
              <text x="50" y="294" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">#12 Riya · 238 pts</text>

              {/* Arrow */}
              <path d="M 290 175 L 360 175" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="365,175 355,170 355,180" fill="#34D399" />

              {/* Center Engine */}
              <rect x="370" y="60" width="220" height="230" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="370" y="60" width="220" height="34" rx="14" fill="#047857" fillOpacity="0.4" />
              <text x="480" y="82" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TAKE EXTRACTION</text>

              <g transform="translate(380, 105)">
                <rect width="200" height="32" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="100" y="20" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TAKE(SortedData, 3)</text>
              </g>

              <g transform="translate(380, 145)">
                <rect width="200" height="32" rx="6" fill="#451A03" stroke="#F59E0B" />
                <text x="100" y="20" fill="#FDE68A" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TAKE(SortedData, -3)</text>
              </g>

              <text x="480" y="205" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Consolidation Pattern:</text>
              <text x="480" y="225" fill="#C7D2FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">=VSTACK(Top3, Bottom3)</text>
              <text x="480" y="250" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Single RAM Execution Cycle</text>

              {/* Arrow */}
              <path d="M 600 175 L 660 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="665,175 655,170 655,180" fill="#10B981" />

              {/* Output Spilled Report (Right) */}
              <rect x="670" y="40" width="165" height="270" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="670" y="40" width="165" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="752" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TOP & BOTTOM CARD</text>

              <g transform="translate(680, 85)">
                <rect width="145" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="15" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Top 1: Abhronila</text>
              </g>
              <g transform="translate(680, 112)">
                <rect width="145" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="15" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Top 2: Debangshu</text>
              </g>
              <g transform="translate(680, 139)">
                <rect width="145" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="15" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Top 3: Swadeep</text>
              </g>

              <g transform="translate(680, 175)">
                <rect width="145" height="22" rx="4" fill="#451A03" stroke="#F59E0B" />
                <text x="72" y="15" fill="#FDE68A" fontSize="9" textAnchor="middle" fontFamily="monospace">Bot 1: Rahul</text>
              </g>
              <g transform="translate(680, 202)">
                <rect width="145" height="22" rx="4" fill="#451A03" stroke="#F59E0B" />
                <text x="72" y="15" fill="#FDE68A" fontSize="9" textAnchor="middle" fontFamily="monospace">Bot 2: Aniket</text>
              </g>
              <g transform="translate(680, 229)">
                <rect width="145" height="22" rx="4" fill="#451A03" stroke="#F59E0B" />
                <text x="72" y="15" fill="#FDE68A" fontSize="9" textAnchor="middle" fontFamily="monospace">Bot 3: Riya</text>
              </g>

              <rect x="680" y="260" width="145" height="40" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="752" y="284" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
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
                Explore the student performance scorecard dataset below or download the workbook to test <code className="text-emerald-300 font-mono">TAKE</code> in Excel.
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
            sheetName="Topic5_TAKE"
            title="Student Performance Scorecards (12 Ranked Students)"
            rowsPerPage={12}
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 1 · Academic Honours Board</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Top 3 Highest Scoring Students
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Academic Director <strong>Sukanta Hui</strong> reviews certification scores. 
                Using <code className="text-amber-300 font-mono">=TAKE(SORT(ScoreTable, 7, -1), 3)</code>, 
                he instantly extracts the top 3 overall performers (Abhronila Sengupta 293, Debangshu Ghosh 290, Swadeep Banerjee 288) for scholarship awards.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =TAKE(SORT(A2:H13, 7, -1), 3) &rarr; Honours Top 3
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Case 2 · Remedial Mentorship Identification</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated Bottom 3 Mentorship Queue
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead Mentor <strong>Tuhina Mukherjee</strong> identifies students requiring 1-on-1 tutoring. 
                She writes <code className="text-amber-300 font-mono">=TAKE(SORT(ScoreTable, 7, -1), -3)</code> to pull the 3 lowest aggregate scores directly into a remedial tracking table.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: =TAKE(SORT(A2:H13, 7, -1), -3) &rarr; Remedial Mentorship List
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Rolling 12-Month Financial Window</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Financial Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Rolling Cashflow Tracking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Controller <strong>Susmita Roy</strong> maintains a 5-year historical ledger. 
                Using <code className="text-amber-300 font-mono">=TAKE(MonthlyCashflowLedger, -12)</code>, her financial model automatically evaluates the most recent 12 months as new rows are added.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =TAKE(Ledger, -12) &rarr; Rolling 12-Month Window
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Dynamic User-Controlled Slicing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dropdown-Driven Leaderboard Expansion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Swadeep Banerjee</strong> builds an interactive dashboard where managers select Top 3, Top 5, or Top 10 from a dropdown cell <code className="text-amber-300 font-mono">K1</code>. 
                The formula <code className="text-amber-300 font-mono">=TAKE(SORT(ScoreData, 7, -1), K1)</code> resizes dynamically.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TAKE(SORT(Data, 7, -1), K1) &rarr; Interactive Resizing
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
              <span className="text-emerald-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Sort the Data by Primary Performance Metric</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Before applying TAKE, ensure the input matrix is sorted: <code className="text-amber-300 font-mono">=SORT(A2:H13, 7, -1)</code> orders students by Aggregate Total descending.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Apply the TAKE Function</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wrap the sorted expression in TAKE: <code className="text-amber-300 font-mono">=TAKE(SORT(A2:H13, 7, -1), 5)</code> extracts the Top 5 students.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Column Width & Spilled Dimensions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter in cell <code className="text-amber-300 font-mono">J2</code>. Confirm the 5-row x 8-column spilled boundary box (<code className="text-emerald-300 font-mono">J2#</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Combine with Downstream Analytics</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Compute the average score of only these Top 5 performers: <code className="text-emerald-300 font-mono">=AVERAGE(CHOOSECOLS(J2#, 7))</code>.
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
              Diagnostic Guide
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Zero Rows)</td>
                  <td className="py-3 px-4 text-slate-300">Passing rows=0 or columns=0 to TAKE.</td>
                  <td className="py-3 px-4 text-slate-400">Check rows argument value.</td>
                  <td className="py-3 px-4 text-emerald-400">Rows count must be a non-zero integer (&ge;1 or &le;-1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Unsorted Top N</td>
                  <td className="py-3 px-4 text-slate-300">Applying TAKE without sorting the underlying table first.</td>
                  <td className="py-3 px-4 text-slate-400">Output contains random rows instead of highest scores.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap with SORT first: <code className="text-emerald-300 font-mono">=TAKE(SORT(Data, Col, -1), N)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells blocked by existing values or formatting.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow clean multi-column spill.</td>
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
              Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">-1</span>
                <span>The Latest Log Anchor</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract the single latest entry from any growing transaction log: <code className="text-amber-300 font-mono">=TAKE(TransactionLog, -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">, -3</span>
                <span>Extract Rightmost Columns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Omit the rows parameter to take the 3 rightmost columns across all rows: <code className="text-emerald-300 font-mono">=TAKE(MasterTable, , -3)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-indigo-400 font-mono font-bold">Dropdown Hook</span>
                <span>Dynamic Top N Parameter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Point the rows parameter to a dropdown cell: <code className="text-amber-300 font-mono">=TAKE(SORT(Data, 3, -1), K1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-mono">F9</kbd>
                <span>Evaluate Top N in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the TAKE expression and press <strong>F9</strong> to verify the top-ranked rows before committing.
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
                <strong>Reflect on overflow safety:</strong> Why does <code className="text-emerald-300 font-mono">TAKE(Data, 100)</code> safely return all 12 rows of a 12-row dataset, whereas <code className="text-purple-300 font-mono">CHOOSEROWS(Data, 100)</code> crashes with <code className="text-rose-400 font-mono">#VALUE!</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine boundary quadrants:</strong> What sub-matrix is extracted when you write <code className="text-amber-300 font-mono">=TAKE(Data, -5, -2)</code>? How does this simplify audit checks on the bottom-right quadrant of financial models?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider tie-breaker integrity:</strong> What unintended bug occurs if you apply <code className="text-emerald-300 font-mono">TAKE</code> to an unsorted table? Why must SORT always precede TAKE in leaderboard construction?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Extracting Top & Bottom Records with TAKE — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TAKE is the definitive modern replacement for legacy LARGE/SMALL ranking formulas. Whenever you need to build top-N leaderboards, rolling historical windows, or executive variance summary cards, combine SORT, TAKE, and VSTACK in memory. Remember: always sort your data deterministically with tie-breakers before taking boundary rows!"
            }
          />
        </div>
      </div>
    </div>
  );
}
