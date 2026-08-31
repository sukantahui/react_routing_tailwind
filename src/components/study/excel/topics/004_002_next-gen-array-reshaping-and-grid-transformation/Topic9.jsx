"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
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
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30 selection:text-blue-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📑 Column-Wise Stream Shaping · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Reformat
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Reshaping 1D Streams into Fixed-Height Columns with WRAPCOLS
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When publishing long single-column lists (e.g. 100 employee names, candidate rosters, or product catalogs) 
            onto a single printable dashboard page, vertical scrolling creates poor visual UX. 
            The <code className="text-blue-300 font-mono font-bold">WRAPCOLS</code> function wraps continuous 1D data streams 
            vertically down columns up to a fixed row height—creating newspaper-style multi-column printable blocks in RAM without manual copy-pasting.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-blue-400 text-base">✓</span>
              <span><strong>Vertical Column Wrapping:</strong> Fills down Col 1, then Col 2</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Printable Newspaper Layout:</strong> Fits long lists onto 1 screen</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Shift & Hall Allocation:</strong> Fixed-capacity column buckets</span>
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
              <span className="text-blue-400">⚡</span> Formula Anatomy: =WRAPCOLS()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: 2D Dynamic Spilled Matrix (Column-wise)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-blue-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =WRAPCOLS(<span className="text-amber-300">vector</span>, <span className="text-emerald-300">wrap_count</span>, <span className="text-slate-400">[pad_with]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Wrap 20 students into 4 columns of 5 rows each):</span>{" "}
              <span className="text-emerald-400 font-bold">=WRAPCOLS(A2:A21, 5, "-")</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Column-Wise Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">vector</td>
                  <td className="py-3 px-4 text-slate-300">1D Range / Array</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 1D column or row vector of continuous data to wrap vertically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">wrap_count</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The fixed row height per column before wrapping to the adjacent column (&ge; 1).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-300">[pad_with]</td>
                  <td className="py-3 px-4 text-slate-300">Any Constant</td>
                  <td className="py-3 px-4 text-slate-400">Optional (#N/A)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The fallback value for unfilled cells at the bottom of the final column. Defaults to <code className="text-rose-400 font-mono">#N/A</code>.
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
              <span className="text-emerald-400">🔬</span> Conceptual & Vertical Wrapping Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Column-Major Stream Slicing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-blue-400">1.</span> Mathematical Width Determination
              </h3>
              <p className="leading-relaxed">
                For a vector of length <code className="text-amber-300 font-mono">L</code> and fixed column height <code className="text-emerald-300 font-mono">H</code>, 
                the resulting matrix dimensions are:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                Height = H &nbsp;|&nbsp; Width = CEILING(L / H, 1)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For 20 items with wrap_count=5: <code className="text-emerald-300 font-mono">CEILING(20/5) = 4 columns x 5 rows</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Directional Difference: WRAPCOLS vs. WRAPROWS
              </h3>
              <p className="leading-relaxed">
                <code className="text-blue-300 font-mono">WRAPCOLS</code> places items 1 to H down Column 1, then items H+1 to 2H down Column 2. 
                <code className="text-cyan-300 font-mono">WRAPROWS</code> places items 1 to K across Row 1, then items K+1 to 2K across Row 2.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                WRAPCOLS → Top-to-Bottom | WRAPROWS → Left-to-Right
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Exam Hall Seat Allocation Architecture
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When allocating 60 candidate roll numbers across 3 exam halls of 20 seats each:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                =WRAPCOLS(CandidateRollVector, 20, "Unassigned")
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
              <span className="text-blue-400">📐</span> Visual Column-Wise Stream Wrapping
            </h2>
            <span className="text-xs font-mono text-blue-300 bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-800">
              Interactive 1D → Fixed-Height Column Blocks
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how WRAPCOLS distributes a 20-student roll number vector vertically into 4 classroom columns of 5 students each:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#2563EB" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* 1D Vector (Left) */}
              <rect x="30" y="30" width="220" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="30" width="220" height="34" rx="14" fill="#1D4ED8" fillOpacity="0.3" />
              <text x="140" y="52" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ROLL NUMBER STREAM (20 ITEMS)</text>

              {/* Items 1 to 5 */}
              <g transform="translate(45, 75)">
                <rect width="190" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="95" y="15" fill="#BFDBFE" fontSize="9" textAnchor="middle" fontFamily="monospace">1. Swadeep Banerjee</text>

                <rect y="26" width="190" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="95" y="41" fill="#BFDBFE" fontSize="9" textAnchor="middle" fontFamily="monospace">2. Tuhina Mukherjee</text>

                <rect y="52" width="190" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="95" y="67" fill="#BFDBFE" fontSize="9" textAnchor="middle" fontFamily="monospace">3. Abhronila Sengupta</text>

                <rect y="78" width="190" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="95" y="93" fill="#BFDBFE" fontSize="9" textAnchor="middle" fontFamily="monospace">4. Susmita Roy</text>

                <rect y="104" width="190" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="95" y="119" fill="#BFDBFE" fontSize="9" textAnchor="middle" fontFamily="monospace">5. Debangshu Ghosh</text>

                <rect y="130" width="190" height="20" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="95" y="144" fill="#64748B" fontSize="8.5" textAnchor="middle" fontFamily="monospace">... Items 6 to 20 ...</text>
              </g>

              <rect x="45" y="240" width="190" height="55" rx="8" fill="#2563EB" fillOpacity="0.12" stroke="#2563EB" strokeDasharray="3 3" />
              <text x="140" y="260" fill="#93C5FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Flat 1D Candidate Roster</text>
              <text x="140" y="278" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Target: 5 rows per column</text>

              {/* Arrow */}
              <path d="M 270 170 L 340 170" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="345,170 335,165 335,175" fill="#60A5FA" />

              {/* Center Engine */}
              <rect x="350" y="60" width="220" height="220" rx="14" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
              <rect x="350" y="60" width="220" height="34" rx="14" fill="#1D4ED8" fillOpacity="0.4" />
              <text x="460" y="82" fill="#DBEAFE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">WRAPCOLS ENGINE</text>

              <g transform="translate(360, 105)">
                <rect width="200" height="36" rx="6" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="100" y="22" fill="#EFF6FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=WRAPCOLS(A2:A21, 5, "-")</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Vertical Wrapping Logic:</text>
              <text x="460" y="185" fill="#BFDBFE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Col 1: Items 1 to 5</text>
              <text x="460" y="203" fill="#BFDBFE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Col 2: Items 6 to 10</text>
              <text x="460" y="221" fill="#BFDBFE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Col 3: Items 11 to 15</text>
              <text x="460" y="239" fill="#BFDBFE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Col 4: Items 16 to 20</text>

              {/* Arrow */}
              <path d="M 585 170 L 645 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,170 640,165 640,175" fill="#10B981" />

              {/* Spilled 4-Column Output (Right) */}
              <rect x="655" y="40" width="170" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="40" width="170" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4-COLUMN ROSTER</text>

              <g transform="translate(665, 85)">
                <rect width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="14" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">1. Swadeep | 6. Pri.. | 11. Ra..</text>

                <rect y="24" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="38" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">2. Tuhina  | 7. Sub.. | 12. So..</text>

                <rect y="48" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="62" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">3. Abhro.. | 8. Ani.. | 13. Po..</text>

                <rect y="72" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="86" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">4. Susmi.. | 9. Riya  | 14. Mo..</text>

                <rect y="96" width="150" height="20" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="110" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">5. Deban.. | 10. Sne..| 15. Ta..</text>
              </g>

              <rect x="665" y="215" width="150" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="240" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: C2#</text>
              <text x="740" y="260" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">5 Rows x 4 Columns</text>
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
                Explore the 20-candidate roll number stream below or download the master workbook to test <code className="text-blue-300 font-mono">WRAPCOLS</code> in Microsoft Excel.
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
            sheetName="EX1710"
            title="Candidate Roll Number Stream (20 Candidates to Wrap into Columns)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Case 1 · Exam Hall Seat Allocation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Examination Cell</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Distributing 20 Candidates into 4 Hall Columns
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Exam Controller <strong>Sukanta Hui</strong> allocates 20 candidates across 4 examination rooms with 5 seats each. 
                Using <code className="text-amber-300 font-mono">=WRAPCOLS(A2:A21, 5, "-")</code>, 
                he generates a 5-row x 4-column seating chart where Room 1 contains students 1-5, Room 2 has 6-10, and so on.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                Formula: =WRAPCOLS(A2:A21, 5, "-") → 4-Room Seating Chart
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Single-Page Print Formatting</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Admin Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Newspaper Multi-Column Printable Noticeboard
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Admin Officer <strong>Priya Chakraborty</strong> prints a list of 60 certified candidates. 
                Rather than printing a narrow 3-page vertical list, she uses <code className="text-amber-300 font-mono">=WRAPCOLS(CandidateNames, 20, "")</code> 
                to format 60 names into a compact 20-row x 3-column layout that fits onto a single printed A4 sheet.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =WRAPCOLS(Names, 20, "") → 1-Page Printable Layout
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Factory Shift Allocation</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Manufacturing Line</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Fixed 8-Worker Shift Allocation Matrix
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Plant Manager <strong>Debangshu Ghosh</strong> assigns a pool of 24 assembly line technicians into 3 fixed 8-hour shifts. 
                Using <code className="text-amber-300 font-mono">=WRAPCOLS(TechnicianList, 8, "Unfilled Slot")</code>, 
                each column represents one 8-worker shift roster.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =WRAPCOLS(Staff, 8, "Unfilled Slot") → 3-Shift Roster
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · 7-Day Vertical Weekly Calendar</span>
                <span className="text-xs font-mono text-slate-400">Naihati Training Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Vertical Week-by-Week Calendar Blocks
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Curriculum Coordinator <strong>Susmita Roy</strong> designs vertical week columns where Monday through Sunday run down 7 rows, 
                and each column represents Week 1, Week 2, Week 3, Week 4, Week 5: <code className="text-amber-300 font-mono">=WRAPCOLS(SEQUENCE(31), 7, "")</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =WRAPCOLS(SEQUENCE(31), 7, "") → Vertical Weekly Columns
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
              <span className="text-blue-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700 text-blue-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Check Vector Length & Target Column Height</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Inspect the source 1D vector <code className="text-amber-300 font-mono">A2:A21</code> (20 candidate names). Determine target column height (e.g. 5 seats per room).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the WRAPCOLS Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C2</code>, type: <code className="text-amber-300 font-mono">=WRAPCOLS(A2:A21, 5, "-")</code>. 
                  Set <code className="text-emerald-300 font-mono">wrap_count=5</code> to place 5 names down each column.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Column-Major Output Grid</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula spills across 5 rows x 4 columns (<code className="text-emerald-300 font-mono">C2:F6</code>). 
                  Col C contains Roll 1-5, Col D has 6-10, Col E has 11-15, Col F has 16-20.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Attach Room Headers via VSTACK</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add room header labels above the spilled grid: <code className="text-emerald-300 font-mono">=VSTACK({"{"}"Room 1", "Room 2", "Room 3", "Room 4"{"}"}, C2#)</code>.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (2D Array Input)</td>
                  <td className="py-3 px-4 text-slate-300">Passing a 2D matrix instead of a 1D vector to WRAPCOLS.</td>
                  <td className="py-3 px-4 text-slate-400">Check source range dimensions.</td>
                  <td className="py-3 px-4 text-emerald-400">Flatten with TOCOL first: <code className="text-blue-300 font-mono">=WRAPCOLS(TOCOL(Range, 1), 5)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (wrap_count &le; 0)</td>
                  <td className="py-3 px-4 text-slate-300">Setting wrap_count to 0 or negative integer.</td>
                  <td className="py-3 px-4 text-slate-400">Check wrap_count parameter value.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure wrap_count is a positive integer &ge; 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#N/A at Bottom of Col</td>
                  <td className="py-3 px-4 text-slate-300">Omitted the [pad_with] argument when vector length is not divisible by wrap_count.</td>
                  <td className="py-3 px-4 text-slate-400">Bottom cells of the final column display #N/A.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply explicit pad_with value (e.g. <code className="text-emerald-400 font-mono">""</code> or <code className="text-emerald-400 font-mono">"-"</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by text or merged formatting.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float → 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow multi-column spill.</td>
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
              Print Layout Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-blue-400 font-mono font-bold">COLUMNS(C2#)</span>
                <span>Count Total Rooms/Halls</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Determine how many columns were created dynamically using <code className="text-amber-300 font-mono">=COLUMNS(C2#)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">VSTACK Headers</span>
                <span>Attach Dynamic Headings</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add room titles on top: <code className="text-emerald-300 font-mono">=VSTACK({"{"}"Hall A", "Hall B"{"}"}, WRAPCOLS(Students, 20))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Dropdown Height</span>
                <span>Interactive Page Sizing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Link wrap_count to cell K1 to dynamically resize printable column heights between 10, 15, and 20 rows.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-blue-300 text-xs font-mono">F9</kbd>
                <span>Preview Columns in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight WRAPCOLS in the formula bar and press <strong>F9</strong> to verify column distribution before spilling.
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
                <strong>Reflect on newspaper print layout:</strong> Why is wrapping a 100-item staff roster into 5 columns of 20 names with <code className="text-blue-300 font-mono">WRAPCOLS</code> vastly superior to leaving it as a single long 100-row column?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine structural orientation:</strong> If you apply <code className="text-blue-300 font-mono">WRAPCOLS(V, 5)</code> versus <code className="text-cyan-300 font-mono">WRAPROWS(V, 5)</code> on the numbers 1 to 20, what is the exact coordinate difference for number 2?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider 2D matrix transformation:</strong> How does pairing <code className="text-sky-300 font-mono">TOCOL</code> with <code className="text-blue-300 font-mono">WRAPCOLS</code> allow you to convert any wide 2D matrix into a compact multi-column printable card?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Reshaping 1D Streams with WRAPCOLS — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "WRAPCOLS is the premier utility for designing single-page printable rosters and fixed-capacity column blocks in Excel 365. Whenever you need to format long vertical candidate lists, exam hall seating, or shift rosters without causing vertical scrollbar fatigue, use =WRAPCOLS(StaffList, 20, \"\") to create clean, newspaper-style multi-column cards in RAM!"
            }
          />
        </div>
      </div>
    </div>
  );
}
