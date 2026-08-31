"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500/30 selection:text-amber-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🧹 Boundary Exclusion Engine · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Sanitize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent leading-tight">
            Excluding Headers, Totals & Metadata Rows/Columns with DROP
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Enterprise ERP data dumps (SAP, Tally, Oracle) typically include messy multi-line title banners, metadata timestamps, 
            and trailing grand-total summary footers that break downstream calculations. 
            The <code className="text-amber-300 font-mono font-bold">DROP</code> function trims peripheral rows and margin columns 
            dynamically in RAM—allowing modelers to sanitize raw datasets without manual deletion or fragile VBA unpivoting scripts.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Top Header Trimming:</strong> Discard title banners (+N)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-orange-400 text-base">✓</span>
              <span><strong>Summary Footer Removal:</strong> Strip trailing totals (-N)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>VSTACK Stacking Synergy:</strong> Strip redundant headers</span>
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
              <span className="text-amber-400">⚡</span> Formula Anatomy: =DROP()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Sanitized Body Sub-Matrix
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-amber-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =DROP(<span className="text-amber-300">array</span>, <span className="text-orange-300">rows</span>, <span className="text-slate-400">[columns]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Drop top 2 title lines and bottom 1 summary total):</span>{" "}
              <span className="text-emerald-400 font-bold">=DROP(DROP(A1:E50, 2), -1)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Boundary Exclusion Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or in-memory array from which rows/columns are excluded.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-orange-300">rows</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>+N</strong>: Excludes first N rows from top; <strong>-N</strong>: Excludes last N rows from bottom; <strong>0</strong>: Leaves rows intact.
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[columns]</td>
                  <td className="py-3 px-4 text-slate-300">Integer</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    <strong>+N</strong>: Excludes first N columns from left; <strong>-N</strong>: Excludes last N columns from right. Omitted keeps all columns.
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
              <span className="text-emerald-400">🔬</span> Conceptual & ETL Sanitation Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Zero-Copy Boundary Slicing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-amber-400">1.</span> Dual-Ended Boundary Stripping
              </h3>
              <p className="leading-relaxed">
                Raw accounting exports frequently contain both top metadata banners and bottom grand-total lines. 
                By chaining two DROP calls: <code className="text-amber-300 font-mono">=DROP(DROP(RawReport, 2), -2)</code>, 
                you strip the top 2 title lines and bottom 2 subtotal lines in a single C++ memory cycle.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-amber-300">
                Raw: [Banner 1, Banner 2, Hdr, Row1..RowN, Subtotal, Footer] → Pure Body: [Row1..RowN]
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Multi-Table Stacking Without Header Clutter
              </h3>
              <p className="leading-relaxed">
                When combining three branch tables via <code className="text-violet-300 font-mono">VSTACK</code>, stacking them directly duplicates the header texts (e.g. 'Emp_ID', 'Name') throughout the dataset. 
                Using <code className="text-amber-300 font-mono">DROP(BranchTable, 1)</code> strips the header from branches 2 and 3, ensuring clean unified ledgers.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1))
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-yellow-400">🛡️</span> The #CALC! Safety Boundary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If an array contains 10 rows and you attempt to drop 10 or more rows (e.g. <code className="text-amber-300 font-mono">=DROP(Data, 10)</code>), 
              the resulting output array contains zero elements. Excel treats an empty dynamic array as invalid and returns a <code className="text-rose-400 font-mono">#CALC!</code> error. 
              Always ensure the count of dropped rows is strictly less than the total row height.
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
              <span className="text-amber-400">📐</span> Visual Perimeter Trimming & Sanitization
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Interactive Boundary Trimming
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how DROP strips the top 2 title lines and bottom 2 footer lines, passing only pure transaction records:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="160" cy="180" r="80" fill="#D97706" fillOpacity="0.05" />
              <circle cx="440" cy="180" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="180" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Raw Report (Left) */}
              <rect x="25" y="30" width="260" height="300" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="260" height="34" rx="14" fill="#B45309" fillOpacity="0.3" />
              <text x="155" y="52" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW ERP REPORT (12 ROWS)</text>

              {/* Top 2 Dropped Rows */}
              <rect x="38" y="72" width="234" height="24" rx="4" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="155" y="88" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">*** TITLE: REVENUE STATEMENT *** [DROP +2]</text>

              <rect x="38" y="100" width="234" height="24" rx="4" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="155" y="116" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">*** GENERATED BY SAP AT 00:00 *** [DROP +2]</text>

              {/* Data Body (Kept) */}
              <rect x="38" y="130" width="234" height="116" rx="6" fill="#064E3B" fillOpacity="0.25" stroke="#10B981" />
              <text x="50" y="148" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">INV-9001 · Swadeep · ₹45,000</text>
              <text x="50" y="170" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">INV-9002 · Tuhina · ₹38,000</text>
              <text x="50" y="192" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">INV-9003 · Abhronila · ₹52,000</text>
              <text x="50" y="214" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">INV-9004 · Susmita · ₹61,000</text>
              <text x="50" y="236" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">INV-9005 · Debangshu · ₹74,000</text>

              {/* Bottom 2 Dropped Rows */}
              <rect x="38" y="252" width="234" height="24" rx="4" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="155" y="268" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">*** TOTAL REVENUE: ₹334,000 *** [DROP -2]</text>

              <rect x="38" y="280" width="234" height="24" rx="4" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="155" y="296" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">*** END OF REPORT *** [DROP -2]</text>

              {/* Arrow */}
              <path d="M 295 180 L 365 180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="370,180 360,175 360,185" fill="#F59E0B" />

              {/* Center Engine */}
              <rect x="375" y="60" width="220" height="240" rx="14" fill="#0F172A" stroke="#D97706" strokeWidth="2" />
              <rect x="375" y="60" width="220" height="34" rx="14" fill="#B45309" fillOpacity="0.4" />
              <text x="485" y="82" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DROP SANITIZATION</text>

              <g transform="translate(385, 105)">
                <rect width="200" height="36" rx="6" fill="#451A03" stroke="#F59E0B" />
                <text x="100" y="22" fill="#FEF3C7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=DROP(DROP(Data, 2), -2)</text>
              </g>

              <text x="485" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Sanitization Actions:</text>
              <text x="485" y="185" fill="#F87171" fontSize="9.5" textAnchor="middle" fontFamily="monospace">✗ Stripped 2 Title Rows (Top)</text>
              <text x="485" y="205" fill="#F87171" fontSize="9.5" textAnchor="middle" fontFamily="monospace">✗ Stripped 2 Footer Rows (Tail)</text>
              <text x="485" y="230" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Isolated 8 Pure Data Records</text>
              <text x="485" y="260" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Zero hardcoded row deletions</text>

              {/* Arrow */}
              <path d="M 605 180 L 665 180" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="670,180 660,175 660,185" fill="#10B981" />

              {/* Spilled Pure Output (Right) */}
              <rect x="675" y="40" width="160" height="280" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="675" y="40" width="160" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="755" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SANITIZED DATA BODY</text>

              <rect x="685" y="86" width="140" height="26" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="755" y="103" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">INV-9001 · ₹45k</text>

              <rect x="685" y="118" width="140" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="755" y="135" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">INV-9002 · ₹38k</text>

              <rect x="685" y="150" width="140" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="755" y="167" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">INV-9003 · ₹52k</text>

              <rect x="685" y="182" width="140" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="755" y="199" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">INV-9004 · ₹61k</text>

              <rect x="685" y="214" width="140" height="26" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="755" y="231" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">INV-9005 · ₹74k</text>

              <rect x="685" y="250" width="140" height="50" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="755" y="272" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="755" y="290" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Clean Relational Table</text>
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
                Explore the raw SAP ERP revenue statement below or download the master workbook to test <code className="text-amber-300 font-mono">DROP</code> in Microsoft Excel.
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
            sheetName="EX1707"
            title="Raw Monthly Financial Report (Metadata Banners & Footer Totals)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 1 · Automated ERP Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Finance Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Sanitizing Raw SAP Revenue Statements
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> imports raw monthly billing exports containing 2 header lines and 2 trailing summary rows (<code className="text-amber-300 font-mono">A1:E12</code>). 
                Applying <code className="text-emerald-300 font-mono">=DROP(DROP(A1:E12, 2), -2)</code> extracts only valid customer invoice records for tax reconciliation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Formula: =DROP(DROP(A1:E12, 2), -2) → Pure 8-Invoice Body
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Multi-Branch Stacking</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar & Naihati</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Consolidating Branch Ledgers Without Duplicate Headers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Susmita Roy</strong> stacks monthly fee registers from Barrackpore, Shyamnagar, and Naihati. 
                Using <code className="text-amber-300 font-mono">=VSTACK(BK_Data, DROP(SH_Data, 1), DROP(NH_Data, 1))</code>, 
                she preserves the master column titles while appending clean data rows from other campuses.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =VSTACK(T1, DROP(T2, 1), DROP(T3, 1)) → Clean Consolidated Stack
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Tax Audit Subtotal Calculation</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Industrial Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Calculating True Grand Totals Without Double-Counting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Corporate Tax Consultant <strong>Abhronila Sengupta</strong> calculates net revenue from invoice registers that include pre-calculated totals at the bottom. 
                She writes <code className="text-amber-300 font-mono">=SUM(DROP(DROP(NetColumn, 1), -1))</code> to sum only genuine invoice rows in memory.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =SUM(DROP(DROP(NetCol, 1), -1)) → Verified Clean Total
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Log Stream Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Titagarh Automation Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Stripping Gateway Handshake Metadata Lines
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> ingests payment gateway webhook streams where the first 4 lines contain authorization tokens. 
                Using <code className="text-amber-300 font-mono">=WRAPROWS(DROP(RawLogStream, 4), 5)</code>, 
                he drops the handshake metadata and structures the transaction stream into a clean 5-column ledger.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =WRAPROWS(DROP(Logs, 4), 5) → Clean Relational Ingestion
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
              <span className="text-amber-400">🪜</span> Step-by-Step Practical Calculation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Extraneous Perimeter Rows</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Review raw import range <code className="text-amber-300 font-mono">A1:E12</code>. Notice that Row 1 & Row 2 contain title text, while Row 11 & Row 12 contain summary totals and confidential disclaimers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-orange-950 border border-orange-700 text-orange-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Apply Dual-Ended DROP</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G2</code>, enter: <code className="text-amber-300 font-mono">=DROP(DROP(A1:E12, 2), -2)</code>. 
                  The inner DROP discards the top 2 rows, and the outer DROP discards the bottom 2 rows.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Spilled Body Dimensions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The output table spills across 8 rows x 5 columns (<code className="text-emerald-300 font-mono">G2#</code>). 
                  Confirm total data rows with <code className="text-sky-300 font-mono">=ROWS(G2#)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Downstream Aggregation & Chaining</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Compute the average invoice net amount: <code className="text-emerald-300 font-mono">=AVERAGE(CHOOSECOLS(G2#, 4))</code>.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Excessive Drop)</td>
                  <td className="py-3 px-4 text-slate-300">Count of dropped rows &ge; total rows in array (empty output).</td>
                  <td className="py-3 px-4 text-slate-400">Check rows argument against <code className="text-amber-300 font-mono">ROWS(array)</code>.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure rows dropped is strictly &lt; total array rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Dropped Real Data</td>
                  <td className="py-3 px-4 text-slate-300">Passing an incorrect count (e.g. dropping 3 rows when only 2 header lines exist).</td>
                  <td className="py-3 px-4 text-slate-400">The first data row is missing from the output.</td>
                  <td className="py-3 px-4 text-emerald-400">Audit the exact header line count before setting the rows parameter.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by existing values or merged cells.</td>
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
              Data Cleaning Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">DROP(T, 1)</span>
                <span>Universal Header Stripper</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always wrap secondary tables in <code className="text-amber-300 font-mono">DROP(Table, 1)</code> inside VSTACK to eliminate repeated headers across stacked ledgers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">, 1</span>
                <span>Drop Leftmost Key Column</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <code className="text-emerald-300 font-mono">=DROP(Data, , 1)</code> to strip auto-generated row numbers or serial columns without affecting row counts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">=LET()</span>
                <span>Sanitize Once in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cache sanitized data: <code className="text-amber-300 font-mono">=LET(clean, DROP(RawData, 2), HSTACK(clean, CHOOSECOLS(clean, 4)*0.18))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">F9</kbd>
                <span>Verify Clean Body in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the DROP expression and press <strong>F9</strong> to confirm metadata headers and footers have been stripped cleanly.
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
                <strong>Reflect on data integrity:</strong> Why is dynamic sanitization via <code className="text-amber-300 font-mono">DROP</code> vastly superior to manually deleting rows in source accounting export sheets?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine multi-table unions:</strong> If you consolidate 4 regional branch tables with <code className="text-violet-300 font-mono">VSTACK</code>, what happens if you forget to wrap tables 2, 3, and 4 inside <code className="text-amber-300 font-mono">DROP(Table, 1)</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider boundary limits:</strong> What happens when you drop all rows in a dataset? How does Excel flag an empty array output?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Excluding Headers & Totals with DROP — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "DROP is the foundational data sanitization utility in modern Excel ETL architecture. Never manually delete header lines or subtotal rows from raw ERP files. Use =DROP(DROP(RawReport, 2), -2) to cleanly isolate transaction bodies in RAM. Remember to always pair DROP with VSTACK when combining multiple branch sheets to maintain a single, clean header row!"
            }
          />
        </div>
      </div>
    </div>
  );
}
