"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Vector Flattening Engine · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Transform
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Flattening 2D Tables into 1D Vertical Vectors with TOCOL
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern data engineering and financial modeling, cross-tabulated reports (e.g. Regions down rows, Quarters across columns) 
            frequently need to be unpivoted into single normalized vertical vectors for relational joins, dynamic dropdowns, or Power BI ingestion. 
            The <code className="text-sky-300 font-mono font-bold">TOCOL</code> function performs this in-memory matrix flattening with lightning speed, 
            providing granular flags to filter empty cells, discard formula errors, and control horizontal versus vertical scan traversal.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Total Unpivoting:</strong> Replaces fragile INDEX/MOD formulas</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Hygiene Filtering:</strong> Auto-skips blanks and cell errors</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Directional Scan:</strong> Row-major vs column-major order</span>
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
              <span className="text-sky-400">⚡</span> Formula Anatomy: =TOCOL()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: 1D Dynamic Spilled Column Vector
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-sky-300">
            <span className="text-slate-500">// Standard Signature</span>
            <div className="mt-1 text-white font-bold">
              =TOCOL(<span className="text-amber-300">array</span>, <span className="text-slate-400">[ignore]</span>, <span className="text-slate-400">[scan_by_column]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Ignore blanks & errors, scan by column):</span>{" "}
              <span className="text-emerald-400 font-bold">=TOCOL(B2:E26, 3, TRUE)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or in-memory dynamic array to be flattened vertically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">[ignore]</td>
                  <td className="py-3 px-4 text-slate-300">Integer (0 to 3)</td>
                  <td className="py-3 px-4 text-slate-400">Optional (0)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>0</strong>: Keep all values (default); <strong>1</strong>: Ignore blanks; <strong>2</strong>: Ignore errors; <strong>3</strong>: Ignore both blanks and errors.
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-300">[scan_by_column]</td>
                  <td className="py-3 px-4 text-slate-300">Boolean</td>
                  <td className="py-3 px-4 text-slate-400">Optional (FALSE)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>FALSE / 0</strong>: Scan row-by-row (left to right); <strong>TRUE / 1</strong>: Scan column-by-column (top to bottom).
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
              <span className="text-emerald-400">🔬</span> Conceptual & Traversal Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Row-Major vs. Column-Major Traversal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-sky-400">1.</span> Row-Major Scanning (Default: FALSE)
              </h3>
              <p className="leading-relaxed">
                By default, TOCOL moves horizontally across Row 1 (cells A1, B1, C1), then drops to Row 2 (A2, B2, C2). 
                Use this setting when each row represents a complete entity whose attributes must stay grouped in sequence.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono">
                Order: (R1,C1) &rarr; (R1,C2) &rarr; (R2,C1) &rarr; (R2,C2)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Column-Major Scanning (TRUE)
              </h3>
              <p className="leading-relaxed">
                When <code className="text-indigo-300 font-mono">scan_by_column</code> is set to <code className="text-emerald-300 font-mono">TRUE</code> (or 1), 
                TOCOL traverses vertically down Column 1 (A1, A2, A3) before shifting right to Column 2 (B1, B2, B3). 
                This is essential for chronological quarterly and monthly time-series unpivoting.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono">
                Order: (R1,C1) &rarr; (R2,C1) &rarr; (R1,C2) &rarr; (R2,C2)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">🎯</span> The 4 [ignore] Flags: Deep Technical Comparison
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-sky-400 font-mono">ignore = 0</div>
                <div className="text-slate-300 mt-1 font-semibold">Keep Everything</div>
                <div className="text-slate-400 mt-1">Blanks become 0; errors like #N/A are passed verbatim.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-emerald-400 font-mono">ignore = 1</div>
                <div className="text-slate-300 mt-1 font-semibold">Ignore Blanks</div>
                <div className="text-slate-400 mt-1">Empty cells are skipped; errors are still retained.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-indigo-400 font-mono">ignore = 2</div>
                <div className="text-slate-300 mt-1 font-semibold">Ignore Errors</div>
                <div className="text-slate-400 mt-1">#VALUE!, #N/A skipped; empty cells retained as 0.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-amber-400 font-mono">ignore = 3</div>
                <div className="text-slate-300 mt-1 font-semibold">Ignore Both</div>
                <div className="text-slate-400 mt-1">Total hygiene: removes both blank cells and all errors.</div>
              </div>
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
              <span className="text-indigo-400">📐</span> Visual Matrix Unpivoting Flow
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Interactive Matrix Traversal
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how TOCOL reads a 2D matrix, evaluates [ignore] rules to strip empty cells and error flags, and unrolls values into a clean vertical vector:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Glows */}
              <circle cx="150" cy="180" r="90" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="430" cy="180" r="90" fill="#6366F1" fillOpacity="0.05" />
              <circle cx="720" cy="180" r="90" fill="#10B981" fillOpacity="0.05" />

              {/* Source 2D Matrix (Left) */}
              <rect x="30" y="40" width="220" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="40" width="220" height="38" rx="14" fill="#0369A1" fillOpacity="0.3" />
              <text x="140" y="64" fill="#38BDF8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2D SOURCE MATRIX (B2:C5)</text>

              {/* Row 1 */}
              <rect x="45" y="90" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="90" y="111" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">145,000</text>
              <rect x="145" y="90" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="190" y="111" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">168,000</text>

              {/* Row 2 (With Blank) */}
              <rect x="45" y="130" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="90" y="151" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">98,000</text>
              <rect x="145" y="130" width="90" height="32" rx="6" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="190" y="151" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">[ BLANK ]</text>

              {/* Row 3 (With Error) */}
              <rect x="45" y="170" width="90" height="32" rx="6" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="90" y="191" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">#N/A</text>
              <rect x="145" y="170" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="190" y="191" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">124,000</text>

              {/* Row 4 */}
              <rect x="45" y="210" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="90" y="231" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">178,000</text>
              <rect x="145" y="210" width="90" height="32" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="190" y="231" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">195,000</text>

              <rect x="45" y="255" width="190" height="50" rx="8" fill="#0284C7" fillOpacity="0.12" stroke="#0284C7" strokeDasharray="3 3" />
              <text x="140" y="275" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">8 Total Input Cells</text>
              <text x="140" y="293" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="monospace">1 Blank + 1 Error (#N/A)</text>

              {/* Arrow to TOCOL Logic */}
              <path d="M 255 180 L 330 180" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="335,180 325,175 325,185" fill="#38BDF8" />

              {/* Engine Card (Center) */}
              <rect x="340" y="60" width="230" height="240" rx="16" fill="#0F172A" stroke="#6366F1" strokeWidth="2" />
              <rect x="340" y="60" width="230" height="38" rx="16" fill="#4338CA" fillOpacity="0.4" />
              <text x="455" y="84" fill="#C7D2FE" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TOCOL EVALUATION LOGIC</text>

              <g transform="translate(355, 115)">
                <rect width="200" height="36" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="100" y="22" fill="#E0E7FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TOCOL(B2:C5, 3, FALSE)</text>
              </g>

              <text x="455" y="175" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Applied Filters:</text>
              <text x="455" y="195" fill="#F87171" fontSize="10" textAnchor="middle" fontFamily="monospace">✗ Skipped Blank (Row 2, Col 2)</text>
              <text x="455" y="213" fill="#F87171" fontSize="10" textAnchor="middle" fontFamily="monospace">✗ Skipped Error #N/A (Row 3, Col 1)</text>
              <text x="455" y="235" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Preserved 6 Valid Numbers</text>

              {/* Arrow to Spilled Vector */}
              <path d="M 575 180 L 645 180" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,180 640,175 640,185" fill="#10B981" />

              {/* Spilled Vertical Column (Right) */}
              <rect x="655" y="40" width="165" height="280" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="40" width="165" height="38" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="737" y="64" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1D SPILLED COLUMN</text>

              <rect x="670" y="86" width="135" height="26" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="737" y="103" fill="#A7F3D0" fontSize="11" textAnchor="middle" fontFamily="monospace">145,000</text>

              <rect x="670" y="116" width="135" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="737" y="133" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">168,000</text>

              <rect x="670" y="146" width="135" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="737" y="163" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">98,000</text>

              <rect x="670" y="176" width="135" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="737" y="193" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">124,000</text>

              <rect x="670" y="206" width="135" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="737" y="223" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">178,000</text>

              <rect x="670" y="236" width="135" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="737" y="253" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">195,000</text>

              <rect x="670" y="270" width="135" height="38" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeDasharray="3 3" />
              <text x="737" y="293" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Anchor: G2# (6 Rows)</text>
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
                Examine the regional quarterly revenue matrix below or download the workbook to test <code className="text-sky-300 font-mono">TOCOL</code> flags in desktop Excel.
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
            sheetName="Topic1_TOCOL"
            title="Regional Quarterly Sales Dataset (Barrackpore & Kolkata Suburbs)"
            rowsPerPage={15}
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
              Field Implementation Cases
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Case 1 · Retail Store Unpivoting</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore & Shyamnagar</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Consolidating 25-Branch Quarterly Sales
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Manager <strong>Swadeep Banerjee</strong> receives quarterly sales in a cross-tab grid (<code className="text-sky-300 font-mono">B2:E26</code>). 
                Several stores opened mid-year, leaving blank quarterly cells. 
                Using <code className="text-amber-300 font-mono">=TOCOL(B2:E26, 1)</code>, Swadeep flattens all 100 cells into an active 94-record vertical vector in 1 formula cell.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: =TOCOL(B2:E26, 1) &rarr; Output: 94 Active Revenue Entries
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Academic Timetable Deduplication</span>
                <span className="text-xs font-mono text-slate-400">Naihati & Ichapur</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Distinct Subject Faculty
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Academic Coordinator <strong>Tuhina Mukherjee</strong> manages a 6-day x 5-period faculty schedule grid (<code className="text-emerald-300 font-mono">C3:G8</code>) containing instructor initials and empty study slots. 
                She constructs a clean master faculty list using <code className="text-amber-300 font-mono">=SORT(UNIQUE(TOCOL(C3:G8, 1)))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =SORT(UNIQUE(TOCOL(C3:G8, 1))) &rarr; 12 Distinct Mentors
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Corporate Tax Audit ETL</span>
                <span className="text-xs font-mono text-slate-400">Titagarh Logistics Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Sanitizing Broken Tax Reconciliation Grids
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Auditor <strong>Abhronila Sengupta</strong> audits GST invoice registers where faulty external lookups generated sporadic <code className="text-rose-400 font-mono">#N/A</code> and <code className="text-rose-400 font-mono">#VALUE!</code> errors across reconciliation matrices. 
                She writes <code className="text-amber-300 font-mono">=TOCOL(TaxGrid, 3)</code> to strip both errors and blanks simultaneously.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =TOCOL(TaxGrid, 3) &rarr; Zero Formula Errors in Audit Ledger
              </div>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Financial Chronology Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Kolkata Corporate Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Preserving Chronological Quarter Sequences
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Financial Modeler <strong>Debangshu Ghosh</strong> feeds time-series regression models. 
                Setting <code className="text-amber-300 font-mono">scan_by_column = TRUE</code>: <code className="text-amber-300 font-mono">=TOCOL(QtrRevenueMatrix, 1, TRUE)</code> ensures Q1 across all branches is processed before Q2, preserving time-series continuity.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TOCOL(B2:E26, 1, TRUE) &rarr; Sequential Chronological Vector
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
              <span className="text-sky-400">🪜</span> Step-by-Step Practical Calculation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Inspect Source Matrix Boundaries</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify the exact coordinates of the rectangular range. For example, <code className="text-amber-300 font-mono">B2:E26</code> (25 branch rows x 4 quarterly columns = 100 cells). 
                  Confirm whether header labels like 'Branch' or 'Q1' should be excluded from the unpivoted vector.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Select the Appropriate Hygiene [ignore] Flag</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Evaluate whether empty cells or errors exist in the source grid:
                  Use <strong>1</strong> for sparse rosters with empty shifts, <strong>2</strong> for broken formula lookups, or <strong>3</strong> for raw third-party exports.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Determine Scan Traversal Direction</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  If flattening an employee profile where each row represents one person, use <code className="text-indigo-300 font-mono">FALSE</code> (row-by-row). 
                  If unpivoting a time-series calendar where columns represent sequential periods, set <code className="text-emerald-300 font-mono">TRUE</code> (column-by-column).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Verify Spill & Reference Downstream</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter in cell <code className="text-amber-300 font-mono">G2</code>. Confirm the spilled column length using <code className="text-emerald-300 font-mono">=ROWS(G2#)</code>. 
                  Feed this vector directly into dropdown validation (<code className="text-sky-300 font-mono">=G2#</code>) or downstream financial aggregations.
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
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Method</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Cells below anchor cell are occupied by static data or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Click the error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear contents of obstructing cells or relocate anchor formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Blanks become 0</td>
                  <td className="py-3 px-4 text-slate-300">Default [ignore]=0 coerces empty cell coordinates to numeric zero.</td>
                  <td className="py-3 px-4 text-slate-400">Output column contains unintended zeroes.</td>
                  <td className="py-3 px-4 text-emerald-400">Set the second argument to 1 (e.g. <code className="text-sky-300 font-mono">=TOCOL(Range, 1)</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Passing a 3D sheet reference (e.g., Sheet1:Sheet3!A1:D10).</td>
                  <td className="py-3 px-4 text-slate-400">Check range syntax in formula bar.</td>
                  <td className="py-3 px-4 text-emerald-400">Use VSTACK to bundle sheets before TOCOL: <code className="text-sky-300 font-mono">=TOCOL(VSTACK(S1!A1:D10, S2!A1:D10), 1)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Workbook Lag</td>
                  <td className="py-3 px-4 text-slate-300">Referencing whole column letters (e.g., A:D) in TOCOL.</td>
                  <td className="py-3 px-4 text-slate-400">Excel attempts to allocate 4,194,304 cells in RAM.</td>
                  <td className="py-3 px-4 text-emerald-400">Use structured Table references (e.g., <code className="text-sky-300 font-mono">Table1[Data]</code>) or bounded ranges.</td>
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
              Master Modeler Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">=LET()</span>
                <span>Prevent Double Computation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When filtering TOCOL outputs, define a variable with LET to avoid flattening the array twice: <code className="text-amber-300 font-mono">=LET(v, TOCOL(Data, 1), FILTER(v, v&gt;50000))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-mono">F9</kbd>
                <span>Preview Spilled Array in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight <code className="text-sky-300 font-mono">TOCOL(B2:E10, 1)</code> in the formula bar and press <strong>F9</strong> to inspect the flattened vector in curly braces before hitting Enter.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-indigo-400 font-mono font-bold">G2#</span>
                <span>Dynamic Dropdown Feeds</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spill <code className="text-amber-300 font-mono">=SORT(UNIQUE(TOCOL(Roster, 1)))</code> in cell G2, then point your Data Validation List source to <code className="text-emerald-300 font-mono">=G2#</code> for a self-updating dropdown.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">ROWS()</span>
                <span>Instant Non-Blank Cell Counter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculate total populated cells in any 2D schedule instantly using <code className="text-emerald-300 font-mono">=ROWS(TOCOL(ScheduleRange, 1))</code> without writing multiple COUNTA ranges.
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
              Analytical Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on formula blanks:</strong> If a cell in your 2D table contains <code className="text-sky-300 font-mono">=IF(A1&gt;0, A1, "")</code>, why does <code className="text-amber-300 font-mono">TOCOL(Range, 1)</code> still return the empty text string? How does Excel distinguish a genuine empty cell from a zero-length string?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine scan order consequences:</strong> If you unpivot a 5-branch x 4-quarter matrix, what is the exact numerical sequence difference between setting <code className="text-indigo-300 font-mono">scan_by_column = FALSE</code> versus <code className="text-emerald-300 font-mono">TRUE</code>? Which one is required for time-series charts?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider idempotency:</strong> What happens if you apply <code className="text-sky-300 font-mono">TOCOL</code> to a range that is already a 1D vertical column? How can this be leveraged as a lightweight compaction filter?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Flattening 2D Tables with TOCOL — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TOCOL is one of the most transformative functions in Excel 365. Whenever you encounter un-normalized cross-tab datasets, do not waste time creating helper columns or writing complex unpivoting VBA macros. Use =TOCOL(Data, 3, TRUE) to sanitize, flatten, and chronologically align matrices in a single step. Remember: always verify whether your downstream model requires entity-first (row-major) or period-first (column-major) sequencing!"
            }
          />
        </div>
      </div>
    </div>
  );
}
