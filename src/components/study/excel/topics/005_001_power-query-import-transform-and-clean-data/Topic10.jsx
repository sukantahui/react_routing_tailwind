"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
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
    link.download = "power_query_master_practice.xlsx";
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
              ⚡ Multi-Dataset Union · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Vertical Stacking &amp; Consolidation
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Consolidate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Appending Queries: Union &amp; Stacking Datasets Vertically from Monthly Files
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In corporate accounting, sales and expense ledgers are exported in fragmented monthly or regional files. 
            Power Query's <strong>Appending Engine</strong> (<code className="text-teal-300 font-mono">Table.Combine</code>) 
            stacks multiple tables vertically into a unified master fact table. 
            Because column matching operates by <strong>Exact Column Name and Case-Sensitivity</strong> (completely ignoring physical column position), 
            understanding schema alignment and staging memory optimization is critical to avoiding jagged null columns!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Name-Based Matching:</strong> Matches by exact header name regardless of column position</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Append as New:</strong> Modular architecture preserving clean audit trails</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Disable Staging Load:</strong> Saves 50% RAM by loading only the consolidated master</span>
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
              <span className="text-teal-400">⚡</span> Power Query Append M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Table.Combine Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Append 3 Monthly Tables Vertically (SQL UNION ALL)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Combine({#"stg_Jan_Sales", #"stg_Feb_Sales", #"stg_Mar_Sales"})'}
            </div>
            <span className="text-slate-500">// 2. Dynamic Table Ingestion via Prefix Reflection</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Combine(Table.SelectRows(Excel.CurrentWorkbook(), each Text.StartsWith([Name], "tbl_Month_"))[Content])'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Append Method</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Matching Principle</th>
                  <th className="py-3 px-4">Enterprise Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Append as New</td>
                  <td className="py-3 px-4 text-teal-300">Table.Combine</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Exact Header Name &amp; Case</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Creates isolated Master table; preserves staging history.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Append (In-Place)</td>
                  <td className="py-3 px-4 text-sky-300">Table.Combine</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Exact Header Name &amp; Case</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Mutates active query by stacking extra rows at the bottom.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">From Folder (Auto)</td>
                  <td className="py-3 px-4 text-emerald-300">Folder.Files → Combine</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Transform Sample File Recipe</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Automatically stacks 50+ monthly files on disk.</td>
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
              <span className="text-emerald-400">🔬</span> Name-Based Schema Matching &amp; Staging Memory Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Append Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Exact Name Matching (Position Ignored)
              </h3>
              <p className="leading-relaxed">
                If Table 1 has <code className="text-teal-300 font-mono">Date</code> in Column 1 and Table 2 has <code className="text-teal-300 font-mono">Date</code> in Column 5, 
                Power Query aligns both perfectly! 
                However, if Table 1 has <code className="text-rose-400 font-mono">Cust_ID</code> and Table 2 has <code className="text-rose-400 font-mono">CustomerID</code>, 
                two separate columns are created with alternating <code className="text-amber-300 font-mono">null</code> values.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Rule: Header Names &amp; Casing Must Match Exactly
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Disabling Staging Query Loads
              </h3>
              <p className="leading-relaxed">
                When appending 12 monthly staging queries into a Master query, right-click each staging query and uncheck <strong>Enable Load</strong>. 
                Power Query uses them as lightweight memory streams without duplicating RAM or bloating workbook file size!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Uncheck 'Enable Load' → Saves 50% Memory Footprint
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Server-Side SQL UNION ALL Query Folding
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When appending tables that reside inside the <strong>same SQL database</strong>, Power Query translates <code className="text-teal-300 font-mono">Table.Combine</code> into a native <code className="text-sky-300 font-mono">UNION ALL</code> query. 
              The SQL server concatenates the millions of records server-side, transferring only the requested dataset to Excel!
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
              <span className="text-teal-400">📐</span> Visual Appending &amp; Vertical Stacking Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Vertical Consolidation Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how monthly transaction tables are harmonized and stacked vertically into a single consolidated master table:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Monthly Staging Tables (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. MONTHLY STAGING FILES</text>

              <g transform="translate(35, 70)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                {/* Jan Table */}
                <rect width="200" height="42" fill="#1E293B" stroke="#0D9488" />
                <text x="6" y="15" fill="#5EEAD4" fontWeight="bold">stg_Jan (100 Rows)</text>
                <text x="6" y="32">Date | Branch | Amount</text>

                {/* Feb Table */}
                <rect y="48" width="200" height="42" fill="#1E293B" stroke="#0D9488" />
                <text x="6" y="63" fill="#5EEAD4" fontWeight="bold">stg_Feb (120 Rows)</text>
                <text x="6" y="80">Date | Branch | Amount</text>

                {/* Mar Table */}
                <rect y="96" width="200" height="42" fill="#1E293B" stroke="#0D9488" />
                <text x="6" y="111" fill="#5EEAD4" fontWeight="bold">stg_Mar (150 Rows)</text>
                <text x="6" y="128">Date | Branch | Amount</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3 Separate Staging Files</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Total Rows = 370 Records</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Appending Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. TABLE.COMBINE ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Header Alignment &amp; Case Match</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Vertical Stack (UNION ALL)</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Disable Staging Load (Save RAM)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Single Final Type Coercion</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Non-Destructive Union</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Master Fact Table (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. CONSOLIDATED MASTER</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">Date | Branch | Amount</text>

                <rect y="25" width="175" height="20" fill="#1E293B" />
                <text x="6" y="39">Jan-05 | BKP | ₹45,000</text>

                <rect y="48" width="175" height="20" fill="#1E293B" />
                <text x="6" y="62">Feb-12 | SHYAM| ₹52,000</text>

                <rect y="71" width="175" height="20" fill="#1E293B" />
                <text x="6" y="85">Mar-18 | ICH | ₹38,000</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">370 Rows Consolidated</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">100% Seamless Alignment</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the appending queries dataset below or download the practice workbook to test vertical stacking and consolidation in Microsoft Excel.
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
            sheetName="EX2011"
            title="Appended Master Dataset (Invoice ID, Invoice Date, Branch City, Customer Name, Net Amount INR, Source Period)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · 12-Month Annual Ledger</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Appending 12 Monthly Sales Worksheets
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> consolidates 12 monthly ERP spreadsheets: 
                using <code className="text-teal-300 font-mono">Table.Combine</code> to stack 85,000 transaction rows into a single annual master table in 2 seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                12 Monthly Sheets → 85,000-Row Unified Annual Fact Table
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Header Alignment Hygiene</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Harmonizing 'Cust_ID' vs 'CustomerID'
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> fixes a jagged schema bug where February used <code className="text-amber-300 font-mono">CustomerID</code> instead of <code className="text-emerald-300 font-mono">Cust_ID</code>, 
                eliminating 5,000 null cell errors across the combined ledger.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Schema Standardization → 0 Jagged Null Columns
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Staging Memory Optimization</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Disabling 'Enable Load' on 12 Queries
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> unchecks 'Enable Load' on 12 staging queries, 
                cutting workbook RAM consumption from 450 MB down to 180 MB and speeding up refresh times by 3x!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Disable Staging Loads → 60% Memory Footprint Reduction
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Disk Folder Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Folder Connector Multi-CSV Auto-Stack
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> connects to a network folder: 
                dropping new monthly CSVs automatically combines them into the live operational report on every scheduled refresh!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Folder Connector → Zero-Touch Automated Monthly Ingestion
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
              <span className="text-teal-400">🪜</span> Step-by-Step Appending Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Harmonize Staging Column Names &amp; Case</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify that all staging queries share identical column header names and casing (e.g. <code className="text-teal-300 font-mono">Invoice_Date</code>, <code className="text-teal-300 font-mono">Amount</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Click 'Append Queries as New'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to <strong>Home Tab → Append Queries → Append Queries as New</strong>. Select <strong>Three or more tables</strong> and add all monthly staging queries.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Uncheck 'Enable Load' on Staging Queries</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the Queries pane, right-click each staging query and uncheck <strong>Enable Load</strong> so only the Master query loads into memory.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Apply Single Final Type Coercion</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  On the consolidated Master query, apply a single <strong>Changed Type</strong> step to assign <code className="text-emerald-400 font-mono">type date</code> and <code className="text-emerald-400 font-mono">type number</code>!
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
              Append Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Jagged Schema with Nulls</td>
                  <td className="py-3 px-4 text-slate-300">Case-sensitivity mismatch (<code className="text-rose-300 font-mono">'amount'</code> vs <code className="text-rose-300 font-mono">'Amount'</code>).</td>
                  <td className="py-3 px-4 text-slate-400">Two separate amount columns appear with nulls in alternating rows.</td>
                  <td className="py-3 px-4 text-emerald-400">Harmonize header casing in staging queries before appending.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Duplicate RAM Ingestion</td>
                  <td className="py-3 px-4 text-slate-300">Left 'Enable Load' checked on 12 staging queries as well as the Master query.</td>
                  <td className="py-3 px-4 text-slate-400">Excel creates 13 sheets and memory consumption doubles.</td>
                  <td className="py-3 px-4 text-emerald-400">Right-click staging queries → Uncheck <strong>Enable Load</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Column Position Misconception</td>
                  <td className="py-3 px-4 text-slate-300">Reordering staging columns assuming Power Query matches by physical column index.</td>
                  <td className="py-3 px-4 text-slate-400">M continues matching strictly by header name.</td>
                  <td className="py-3 px-4 text-emerald-400">Focus on header names; Power Query completely ignores column index order.</td>
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
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Append Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Disable Staging Load</span>
                <span>50% RAM Savings</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uncheck 'Enable Load' on intermediate monthly staging queries to prevent duplicate RAM loading.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Append as New</span>
                <span>Modular Audit Trail</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always create a separate consolidated Master query to keep staging recipes isolated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">From Folder</span>
                <span>Automated Disk ETL</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use the Folder connector to automatically combine dozens of historical CSV files on disk.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Single Final Type Coerce</span>
                <span>Pipeline Efficiency</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Apply data type casting once on the Master table rather than in 12 separate staging queries.
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
                <strong>Reflect on name-based matching:</strong> Why does <code className="text-teal-300 font-mono">Table.Combine</code> completely ignore physical column positions, and why does a simple uppercase/lowercase difference generate two separate jagged columns?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine staging memory architecture:</strong> Why is unchecking <code className="text-emerald-400 font-mono">Enable Load</code> on staging queries vital for enterprise workbook performance when appending 50 files?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider SQL server-side UNION folding:</strong> How does appending queries within the same SQL database execute as a server-side <code className="text-sky-300 font-mono">UNION ALL</code> query without transferring staging tables over the network?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Appending Queries & Vertical Stacking — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Align schemas before stacking, and disable staging loads! Column matching in Table.Combine is 100% case-sensitive and name-dependent (position is ignored)—always trim and harmonize header names to avoid jagged null columns. Always use 'Append Queries as New' for modular traceability, and remember to uncheck 'Enable Load' on staging queries so only your pristine consolidated Master table loads into memory!"
            }
          />
        </div>
      </div>
    </div>
  );
}
