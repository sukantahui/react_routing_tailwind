"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ↔️ Horizontal Reshaping Engine · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Transform
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Flattening 2D Tables into 1D Horizontal Vectors with TOROW
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            While <code className="text-sky-300 font-mono">TOCOL</code> creates vertical columns, executive dashboards and financial projection models 
            frequently require wide horizontal representations—such as unrolling multi-department budgets into continuous 
            horizontal timeline ribbons. The <code className="text-teal-300 font-mono font-bold">TOROW</code> function flattens 2D matrices 
            into a single 1D horizontal row vector spanning across columns, equipped with granular blank and error filtering.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Horizontal Flattening:</strong> 2D Matrix → 1D Row Vector</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Dashboard Banners:</strong> Rapid executive KPI header creation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Error Sanitization:</strong> Built-in flags to strip #N/A and blanks</span>
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
              <span className="text-teal-400">⚡</span> Formula Anatomy: =TOROW()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: 1D Dynamic Spilled Horizontal Row Vector
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =TOROW(<span className="text-amber-300">array</span>, <span className="text-slate-400">[ignore]</span>, <span className="text-slate-400">[scan_by_column]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Ignore blanks, scan row-by-row):</span>{" "}
              <span className="text-emerald-400 font-bold">=TOROW(B2:F10, 1, FALSE)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Technical Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or vertical column to flatten horizontally.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-300">[ignore]</td>
                  <td className="py-3 px-4 text-slate-300">Integer (0 to 3)</td>
                  <td className="py-3 px-4 text-slate-400">Optional (0)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>0</strong>: Keep all; <strong>1</strong>: Ignore blanks; <strong>2</strong>: Ignore errors; <strong>3</strong>: Ignore both blanks and errors.
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">[scan_by_column]</td>
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
              <span className="text-emerald-400">🔬</span> Computational & Architectural Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              TOROW vs. TRANSPOSE vs. TOCOL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm">TOROW(Matrix)</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Flattens an (N x M) matrix into a single <strong>1 Row x (N*M) Columns</strong> horizontal vector. All 2D structure is collapsed into a 1D horizontal line.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm">TOCOL(Matrix)</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Flattens an (N x M) matrix into a single <strong>(N*M) Rows x 1 Column</strong> vertical vector. All 2D structure is collapsed into a 1D vertical line.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm">TRANSPOSE(Matrix)</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Swaps rows and columns, preserving 2D structure: an (N x M) matrix becomes an <strong>(M x N) matrix</strong>. It does not flatten into 1D.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">⚠️</span> Boundary Constraints: The 16,384 Column Frontier (XFD)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike TOCOL which has 1,048,576 vertical rows available, Excel worksheets are constrained horizontally to 
              <strong className="text-amber-300 font-mono"> 16,384 columns</strong> (ending at column <code className="text-sky-300 font-mono">XFD</code>). 
              If you enter <code className="text-amber-300 font-mono">=TOROW(LargeDataset)</code> starting in cell <code className="text-slate-300 font-mono">D2</code>, 
              the maximum number of elements that can spill horizontally is <code className="text-emerald-400 font-mono">16,384 - 3 = 16,381</code>. 
              Exceeding this boundary produces a <code className="text-rose-400 font-mono">#CALC!</code> or <code className="text-rose-400 font-mono">#SPILL!</code> error.
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
              <span className="text-teal-400">📐</span> Horizontal Vector Unrolling Diagram
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Interactive Horizontal Transformation
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Visual breakdown of how a 3x3 marketing spend matrix is unrolled horizontally across dashboard banner columns:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="160" cy="160" r="80" fill="#0D9488" fillOpacity="0.05" />
              <circle cx="430" cy="160" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="700" cy="160" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Block 1: 2D Matrix */}
              <rect x="30" y="40" width="240" height="230" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="40" width="240" height="36" rx="14" fill="#0D9488" fillOpacity="0.3" />
              <text x="150" y="63" fill="#2DD4BF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MARKETING SPEND MATRIX (3x3)</text>

              {/* Rows */}
              <rect x="45" y="90" width="65" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="77" y="108" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Google: 45k</text>
              <rect x="115" y="90" width="65" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="147" y="108" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Feb: 52k</text>
              <rect x="185" y="90" width="70" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="220" y="108" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Mar: 58k</text>

              <rect x="45" y="125" width="65" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="77" y="143" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Meta: 38k</text>
              <rect x="115" y="125" width="65" height="28" rx="4" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="147" y="143" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BLANK</text>
              <rect x="185" y="125" width="70" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="220" y="143" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Mar: 49k</text>

              <rect x="45" y="160" width="65" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="77" y="178" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">YT: 25k</text>
              <rect x="115" y="160" width="65" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="147" y="178" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Feb: 28k</text>
              <rect x="185" y="160" width="70" height="28" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="220" y="178" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">Mar: 34k</text>

              <rect x="45" y="200" width="210" height="50" rx="8" fill="#0D9488" fillOpacity="0.12" stroke="#0D9488" strokeDasharray="3 3" />
              <text x="150" y="222" fill="#2DD4BF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Input: 9 Cells Total</text>
              <text x="150" y="238" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">1 Blank in (Row 2, Col 2)</text>

              {/* Arrow */}
              <path d="M 280 150 L 345 150" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="350,150 340,145 340,155" fill="#2DD4BF" />

              {/* Center Engine */}
              <rect x="355" y="60" width="200" height="180" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
              <rect x="355" y="60" width="200" height="34" rx="14" fill="#0369A1" fillOpacity="0.4" />
              <text x="455" y="82" fill="#7DD3FC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TOROW TRANSFORM</text>

              <g transform="translate(365, 105)">
                <rect width="180" height="32" rx="6" fill="#0C4A6E" stroke="#0284C7" />
                <text x="90" y="20" fill="#E0F2FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TOROW(B2:D4, 1, 0)</text>
              </g>

              <text x="455" y="160" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Action:</text>
              <text x="455" y="178" fill="#F87171" fontSize="9" textAnchor="middle" fontFamily="monospace">✗ Skipped Blank (Meta Feb)</text>
              <text x="455" y="196" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Unrolled 8 Valid Values</text>

              {/* Arrow to Result */}
              <path d="M 565 150 L 625 150" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="630,150 620,145 620,155" fill="#10B981" />

              {/* Horizontal Output Vector (Bottom Banner) */}
              <rect x="635" y="40" width="190" height="230" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="635" y="40" width="190" height="36" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="730" y="63" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">HORIZONTAL ROW (1x8)</text>

              <g transform="translate(645, 90)">
                <rect width="170" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="85" y="15" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">45k | 52k | 58k | 38k</text>
              </g>

              <g transform="translate(645, 120)">
                <rect width="170" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
                <text x="85" y="15" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">49k | 25k | 28k | 34k</text>
              </g>

              <rect x="645" y="160" width="170" height="90" rx="8" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="730" y="185" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="730" y="205" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">1 Row x 8 Columns</text>
              <text x="730" y="225" fill="#6EE7B7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Ready for KPI Banners</text>
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
                Explore the multi-channel marketing spend matrix below or download the master workbook to test <code className="text-teal-300 font-mono">TOROW</code> in Excel.
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
            sheetName="EX1703"
            title="Multi-Channel Marketing Spend Matrix (Jan-May)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Marketing Budget Timeline</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Campaign Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unrolling 10 Channels into Horizontal Timeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Digital Strategist <strong>Rahul Karmakar</strong> tracks 10 ad channels across 5 months (<code className="text-teal-300 font-mono">B2:F11</code>). 
                To construct a continuous timeline ribbon for executive slides, Rahul applies <code className="text-amber-300 font-mono">=TOROW(B2:F11, 1, TRUE)</code>, 
                spilling 50 values sequentially from Jan to May.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Formula: =TOROW(B2:F11, 1, TRUE) → Continuous 50-Month Timeline
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Executive KPI Summary</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Corporate Office</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Building Real-Time Top-Row KPI Ribbons
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Lead <strong>Tuhina Mukherjee</strong> calculates vertical branch revenues in <code className="text-emerald-300 font-mono">N2:N15</code>. 
                For the board presentation dashboard, she uses <code className="text-amber-300 font-mono">=TOROW(N2:N15)</code> to project branch revenues horizontally across row 1 headers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =TOROW(N2:N15, 1) → Self-Updating Row 1 Banner
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Corporate Tax Schedule</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Industrial Belt</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unpivoting Depreciation Matrices
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Corporate Consultant <strong>Abhronila Sengupta</strong> audits asset depreciation schedules structured across 8 asset classes and 5 fiscal years. 
                Applying <code className="text-amber-300 font-mono">=TOROW(DeprecMatrix, 3)</code> instantly cleans zero-value write-offs and errors into a single horizontal audit ribbon.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =TOROW(AssetGrid, 3) → Zero Formula Errors in Audit Trail
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Delimited Header Feeds</span>
                <span className="text-xs font-mono text-slate-400">Naihati Training Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Cell Delimited Department Headers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Susmita Roy</strong> generates a dynamic sub-header banner. 
                Using <code className="text-amber-300 font-mono">=TEXTJOIN(" • ", TRUE, TOROW(DeptMatrix, 1))</code>, 
                she builds an automated breadcrumb header for dynamic reporting without VBA.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TEXTJOIN(" • ", TRUE, TOROW(DeptGrid, 1)) → Clean Breadcrumb
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
              <span className="text-teal-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Check Horizontal Destination Space</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify that the columns to the right of your anchor cell are completely empty. 
                  For a 10-row x 5-column matrix (50 cells), ensure at least 50 adjacent horizontal columns are available.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Formulate the TOROW Expression</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select cell <code className="text-amber-300 font-mono">H2</code> and type: <code className="text-amber-300 font-mono">=TOROW(B2:F11, 1, FALSE)</code>. 
                  Set <code className="text-teal-300 font-mono">[ignore]=1</code> to strip blank marketing channels automatically.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Horizontal Dynamic Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. Excel automatically creates a thin bounding box expanding horizontally across columns H2:BF2. 
                  Confirm total columns with <code className="text-emerald-300 font-mono">=COLUMNS(H2#)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Reference the Dynamic Spilled Row</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To aggregate or chart the horizontal vector, use the spill reference: <code className="text-emerald-300 font-mono">=SUM(H2#)</code> or <code className="text-emerald-300 font-mono">=AVERAGE(H2#)</code>.
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
              Troubleshooting Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Issue</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Indicator</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL! (Horizontal)</td>
                  <td className="py-3 px-4 text-slate-300">Cells to the right of the anchor contain notes, merged cells, or text.</td>
                  <td className="py-3 px-4 text-slate-400">Error tag → 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing columns or move formula to an empty row.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Zeroes in Vector</td>
                  <td className="py-3 px-4 text-slate-300">Default [ignore]=0 converts empty cells to numeric zeroes.</td>
                  <td className="py-3 px-4 text-slate-400">Output row has intermittent zeroes.</td>
                  <td className="py-3 px-4 text-emerald-400">Set the second argument to 1: <code className="text-teal-300 font-mono">=TOROW(Range, 1)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Overflow)</td>
                  <td className="py-3 px-4 text-slate-300">Flattened horizontal elements exceed the 16,384 worksheet column limit.</td>
                  <td className="py-3 px-4 text-slate-400">Input range has thousands of cells.</td>
                  <td className="py-3 px-4 text-emerald-400">Use TOCOL instead for large arrays (1,048,576 row capacity).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (3D Sheet)</td>
                  <td className="py-3 px-4 text-slate-300">Passing multi-sheet 3D syntax like Sheet1:Sheet3!A1:D5.</td>
                  <td className="py-3 px-4 text-slate-400">Check formula range references.</td>
                  <td className="py-3 px-4 text-emerald-400">Bundle sheets with VSTACK first: <code className="text-teal-300 font-mono">=TOROW(VSTACK(S1!A1:D5, S2!A1:D5), 1)</code>.</td>
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
              Productivity Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">COLUMNS()</span>
                <span>Measure Horizontal Length</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Determine the exact number of active elements in a spilled horizontal row using <code className="text-amber-300 font-mono">=COLUMNS(H2#)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Top 5 KPI</span>
                <span>Horizontal Ribbon Hack</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract the 5 highest revenue figures and display them across row 1 headers: <code className="text-emerald-300 font-mono">=TOROW(TAKE(SORT(TOCOL(Data, 1), 1, -1), 5))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">F9</kbd>
                <span>Preview Row Vector in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight <code className="text-teal-300 font-mono">TOROW(B2:F10, 1)</code> in the formula bar and press <strong>F9</strong> to inspect elements in comma-separated curly braces.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">=LET()</span>
                <span>Single In-Memory Evaluation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cache your horizontal vector to avoid duplicate calculations: <code className="text-emerald-300 font-mono">=LET(r, TOROW(Data, 1), HSTACK(r, AVERAGE(r)))</code>.
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
              Analytical Inquiries
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Contrast dimensionality:</strong> Why does <code className="text-sky-300 font-mono">TRANSPOSE(A1:C4)</code> produce a 3x4 2D table while <code className="text-teal-300 font-mono">TOROW(A1:C4)</code> produces a 1x12 1D vector? In what dashboard scenario would you select TOROW over TRANSPOSE?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider column capacity:</strong> If your dataset contains 25,000 cells across 500 rows and 50 columns, what happens when you write <code className="text-amber-300 font-mono">=TOROW(Range)</code>? Why is TOCOL safe for this dataset while TOROW will error?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine time-series flow:</strong> When unpivoting monthly marketing spend across 10 channels, why is <code className="text-emerald-300 font-mono">scan_by_column = TRUE</code> critical for generating an accurate timeline?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Flattening 2D Tables with TOROW — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TOROW is the ultimate horizontal unpivoting tool for financial modelers and executive dashboard designers. Use it to dynamically project summarized vertical data into wide KPI ribbons and timeline headers across row 1 without writing single-purpose VBA macros. Always keep Excel's 16,384 column limit in mind, and choose scan_by_column=TRUE for chronological time series!"
            }
          />
        </div>
      </div>
    </div>
  );
}
