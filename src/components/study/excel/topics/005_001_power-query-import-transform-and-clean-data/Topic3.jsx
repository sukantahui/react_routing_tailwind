"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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
              ⚡ Data Profiling Suite · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Quality, Distribution &amp; Profile
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Profile
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Cleaning &amp; Profiling Data: Column Quality, Column Distribution &amp; Column Profile
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In production data analytics, garbage in guarantees garbage out. 
            Power Query's built-in <strong>Data Profiling Suite</strong> transforms raw data hygiene into a rigorous, visual science. 
            By leveraging <strong>Column Quality</strong> (Valid, Error, Empty bars), <strong>Column Distribution</strong> 
            (Distinct vs Unique value counts), and <strong>Column Profile</strong> (Min, Max, Outliers, Frequency Histograms), 
            analysts detect anomalies, isolate bad records with <code className="text-teal-300 font-mono">Keep Errors</code>, 
            and verify primary keys before loading to the Data Model!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Column Quality:</strong> Instant Green (Valid), Red (Error), Grey (Empty) breakdown</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Column Distribution:</strong> Distinct vs Unique primary key validation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Column Profile:</strong> Deep statistics &amp; frequency distribution histograms</span>
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
              <span className="text-teal-400">⚡</span> The 3 Pillars of Power Query Data Profiling
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              View Tab Tools
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. Column Quality */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">1. Column Quality</span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <span className="w-3 h-3 rounded bg-emerald-500" /> 98% Valid
                <span className="w-3 h-3 rounded bg-rose-500 ml-1" /> 0% Error
                <span className="w-3 h-3 rounded bg-slate-500 ml-1" /> 2% Empty
              </div>
              <p className="font-sans text-xs text-slate-400">
                Visual health bar on top of every column. Hover to Remove/Keep Errors or Remove Empty.
              </p>
            </div>

            {/* 2. Column Distribution */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. Column Distribution</span>
              <div className="text-white font-bold text-xs">
                Distinct: 9,850 | Unique: 9,700
              </div>
              <p className="font-sans text-xs text-slate-400">
                Mini frequency histogram. If Distinct == Unique == Total Rows, column is a 100% Primary Key!
              </p>
            </div>

            {/* 3. Column Profile */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">3. Column Profile</span>
              <div className="text-white font-bold text-xs">
                Min: 100 | Max: 98,000 | Nulls: 0
              </div>
              <p className="font-sans text-xs text-slate-400">
                Deep statistical summary &amp; value frequency bar chart to spot outliers and anomalies.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Profiling Tool</th>
                  <th className="py-3 px-4">Enabling Menu Path</th>
                  <th className="py-3 px-4">Diagnostic Signal</th>
                  <th className="py-3 px-4">Remediation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Column Quality</td>
                  <td className="py-3 px-4 text-teal-300">View → Column quality</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Red bar (Type conversion failure)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Hover → Keep Errors / Replace Errors.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Column Distribution</td>
                  <td className="py-3 px-4 text-sky-300">View → Column distribution</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Distinct < Total Rows on Primary Key</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Apply 'Remove Duplicates' on ID field.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Column Profile</td>
                  <td className="py-3 px-4 text-emerald-300">View → Column profile</td>
                  <td className="py-3 px-4 text-indigo-400 font-sans">Outlier categories in bar chart</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Apply 'Replace Values' or 'Filter Rows'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400 font-sans">Monospaced Font</td>
                  <td className="py-3 px-4 text-purple-300">View → Monospaced</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Trailing space misalignments</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Apply Transform → Trim / Clean.</td>
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
              <span className="text-emerald-400">🔬</span> Primary Key Validation &amp; The 4-Step Text Hygiene Pipeline
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Quality Engineering Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Primary Key Mathematical Verification
              </h3>
              <p className="leading-relaxed">
                Before connecting two tables in a Power Pivot relational star schema, you must verify the dimension table's primary key. 
                A column is guaranteed 100% unique if:
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Distinct Count == Unique Count == Total Rows (0% Nulls)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> The 4-Step Golden Text Hygiene Pipeline
              </h3>
              <p className="leading-relaxed">
                Dirty ERP and CSV text fields should always pass through this standard 4-step sanitization sequence:
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300 space-y-1">
                <div>1. Text.Clean (Remove control characters)</div>
                <div>2. Text.Trim (Remove leading/trailing spaces)</div>
                <div>3. Text.Proper (Standardize Title Casing)</div>
                <div>4. Coerce Data Type (type text / type number)</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Top 1000 Rows vs Entire Dataset Profiling Scope
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              By default, Power Query profiles only the top 1,000 rows for fast interface rendering. 
              Before finalizing any production ETL model, click the status bar at the bottom left and switch to 
              <strong>"Column profiling based on entire data set"</strong> to uncover hidden errors lurking in row 50,000!
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
              <span className="text-teal-400">📐</span> Visual Column Quality &amp; Distribution Architecture
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Profiling Architecture
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how the 3 profiling layers visualize data hygiene and detect anomalies in real time:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Column Quality Bar (Top Left) */}
              <rect x="25" y="25" width="240" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="240" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="145" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. COLUMN QUALITY</text>

              <g transform="translate(35, 75)">
                {/* Visual Bar */}
                <rect width="220" height="18" rx="4" fill="#334155" />
                <rect width="198" height="18" rx="4" fill="#10B981" />
                <rect x="198" width="12" height="18" fill="#EF4444" />
                <rect x="210" width="10" height="18" rx="0 4 4 0" fill="#64748B" />

                <g transform="translate(0, 35)" fontSize="9" fontFamily="sans-serif">
                  <circle cx="6" cy="6" r="5" fill="#10B981" />
                  <text x="18" y="10" fill="#E2E8F0">Valid: 95.4% (9,540 rows)</text>

                  <circle cx="6" cy="28" r="5" fill="#EF4444" />
                  <text x="18" y="32" fill="#FCA5A5">Error: 4.1% (410 rows)</text>

                  <circle cx="6" cy="50" r="5" fill="#64748B" />
                  <text x="18" y="54" fill="#CBD5E1">Empty: 0.5% (50 rows)</text>
                </g>

                <rect y="110" width="220" height="70" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="10" y="130" fill="#5EEAD4" fontSize="9" fontWeight="bold" fontFamily="sans-serif">QUICK ACTION MENU</text>
                <text x="10" y="148" fill="#FCA5A5" fontSize="8" fontFamily="monospace">↳ Keep Errors (Triage)</text>
                <text x="10" y="164" fill="#A7F3D0" fontSize="8" fontFamily="monospace">↳ Remove Empty (Nulls)</text>
              </g>

              {/* 2. Column Distribution (Center) */}
              <rect x="290" y="25" width="260" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="290" y="25" width="260" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="420" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. COLUMN DISTRIBUTION</text>

              <g transform="translate(305, 75)">
                <rect width="230" height="40" rx="6" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="18" fill="#5EEAD4" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PRIMARY KEY AUDIT</text>
                <text x="10" y="32" fill="#CCFBF1" fontSize="8.5" fontFamily="monospace">Distinct: 9,850 | Unique: 9,700</text>

                {/* Mini Histogram Bars */}
                <g transform="translate(10, 55)" fill="#38BDF8">
                  <rect x="0" y="20" width="18" height="40" rx="2" />
                  <rect x="25" y="10" width="18" height="50" rx="2" />
                  <rect x="50" y="30" width="18" height="30" rx="2" />
                  <rect x="75" y="5" width="18" height="55" rx="2" fill="#FDE047" />
                  <rect x="100" y="25" width="18" height="35" rx="2" />
                  <rect x="125" y="40" width="18" height="20" rx="2" />
                  <rect x="150" y="15" width="18" height="45" rx="2" />
                  <rect x="175" y="45" width="18" height="15" rx="2" fill="#EF4444" />
                </g>

                <rect y="125" width="230" height="55" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="10" y="145" fill="#FDE047" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">150 Duplicate Keys Detected</text>
                <text x="10" y="162" fill="#94A3B8" fontSize="7.5" fontFamily="sans-serif">Action: Apply 'Remove Duplicates'</text>
              </g>

              {/* 3. Column Profile Statistics (Right) */}
              <rect x="575" y="25" width="250" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="575" y="25" width="250" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="700" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. COLUMN PROFILE</text>

              <g transform="translate(590, 70)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="220" height="120" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="20" fill="#34D399" fontWeight="bold">STATISTICAL SUMMARY</text>
                <text x="10" y="40">Count:      10,000</text>
                <text x="10" y="56">Nulls:      0 (0.0%)</text>
                <text x="10" y="72">Min:        ₹ 100.00</text>
                <text x="10" y="88">Max:        ₹ 98,000.00</text>
                <text x="10" y="104">Average:    ₹ 14,250.50</text>
              </g>

              <rect x="590" y="205" width="220" height="75" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="700" y="225" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Validated Column</text>
              <text x="700" y="242" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Power Pivot Model</text>
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
                Explore the column profiling metrics dataset below or download the practice workbook to test data profiling tools in Microsoft Excel.
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
            sheetName="EX2004"
            title="Data Profiling & Quality Metrics (Column Name, Total Count, Valid %, Error %, Empty %, Distinct Count, Unique Count)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Statutory Tax Triage</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                PAN Error Isolation via 'Keep Errors'
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Swadeep Banerjee</strong> profiles 10,000 vendor records. 
                Noticing a 4.1% red Error bar in the PAN column, he executes <code className="text-teal-300 font-mono">Keep Errors</code>, 
                isolating the 410 malformed tax records into an audit remediation queue in 1 click!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Keep Errors → Instant 410 Bad Record Quarantine
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Relational Model Key Audit</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Preventing Cartesian Merge Explosion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Tuhina Mukherjee</strong> inspects <code className="text-amber-300 font-mono">Customer_ID</code> with Column Distribution. 
                Finding 150 non-unique duplicate keys, she applies <code className="text-emerald-300 font-mono">Remove Duplicates</code>, 
                preventing a catastrophic cartesian multiplication during table merges!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Distinct == Unique == Rows → Valid Star Schema Key
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Space Anomaly Detection</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Trailing Space Discrepancy Elimination
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> turns on <code className="text-indigo-300 font-mono">Monospaced font</code> and Column Profile. 
                She discovers that 'Kolkata ' and 'Kolkata' were splitting regional totals into two separate buckets, fixing it instantly with <code className="text-indigo-300 font-mono">Text.Trim</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Text.Clean + Text.Trim → 100% Clean City Buckets
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Deep Outlier Detection</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Entire Dataset Statistical Profiling
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> switches profiling from Top 1000 to Entire Dataset. 
                The Column Profile bar chart flags two invoices booked at ₹ 9,800,000 instead of ₹ 98,000, preventing a ₹ 9.7M executive reporting error!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Entire Dataset Profiling → Flagged ₹ 9.7M Outlier
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
              <span className="text-teal-400">🪜</span> Step-by-Step Data Profiling Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Enable All Data Profiling Checkboxes</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to the <strong>View Tab</strong> and check <strong>Column quality</strong>, <strong>Column distribution</strong>, and <strong>Column profile</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Inspect Column Quality Bars</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Scan each column for red Error bars or grey Empty bars. Hover over red sections and select <code className="text-teal-300 font-mono">Keep Errors</code> to isolate bad records.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Primary Keys with Column Distribution</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Check your primary key column. Confirm that <code className="text-emerald-400 font-mono">Distinct == Unique == Total Rows</code> (100% unique, 0 duplicates).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Switch Scope to Entire Dataset &amp; Apply Clean/Trim</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the status bar text to profile the entire dataset. Apply <code className="text-emerald-400 font-mono">Text.Clean</code>, <code className="text-emerald-400 font-mono">Text.Trim</code>, and <code className="text-emerald-400 font-mono">Text.Proper</code> to all text fields.
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
              Profiling Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Profiling Trap</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Top 1000 Sampling Blind Spot</td>
                  <td className="py-3 px-4 text-slate-300">Profiling only evaluates the first 1,000 rows by default; errors in row 5,000 remain hidden.</td>
                  <td className="py-3 px-4 text-slate-400">Status bar reads: 'Profiling based on top 1000 rows'.</td>
                  <td className="py-3 px-4 text-emerald-400">Click status bar → Switch to 'Column profiling based on entire data set'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">False-Clean Text Numbers</td>
                  <td className="py-3 px-4 text-slate-300">Numbers stored as text show 100% Green Valid bar but fail in DAX math calculations.</td>
                  <td className="py-3 px-4 text-slate-400">Icon badge shows 'ABC' instead of '1.2' or '123'.</td>
                  <td className="py-3 px-4 text-emerald-400">Click type icon → Change Data Type to Decimal Number.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Cartesian Merge Explosion</td>
                  <td className="py-3 px-4 text-slate-300">Merging on a key where Distinct < Total Rows on the dimension side.</td>
                  <td className="py-3 px-4 text-slate-400">Output table row count multiplies uncontrollably after Merge.</td>
                  <td className="py-3 px-4 text-emerald-400">Select key column on dimension query → Apply 'Remove Duplicates'.</td>
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
              Profiling Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Keep Errors</span>
                <span>Audit Isolation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hover over the red error bar to isolate failing records into an audit triage query.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Monospaced Font</span>
                <span>Alignment Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enable monospaced font under View tab to spot hidden whitespace instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Copy Statistics</span>
                <span>Audit Documentation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Right-click Column Profile → Copy to paste statistical tables into Excel reports.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Entire Dataset Scope</span>
                <span>Production Sign-Off</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always toggle status bar to Entire Dataset before final deployment to production.
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
                <strong>Reflect on primary key verification:</strong> Why does verifying <code className="text-emerald-400 font-mono">Distinct == Unique == Total Rows</code> with 0% nulls prevent catastrophic row duplication when merging dimensional models?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine sampling trade-offs:</strong> Why does Power Query sample the top 1,000 rows during design, and why is switching to the entire dataset crucial before final model sign-off?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider error quarantine:</strong> How does deploying <code className="text-teal-300 font-mono">Keep Errors</code> to isolate bad records create an automated compliance triage queue for enterprise tax audits?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Data Profiling & Quality Hygiene — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Data profiling is the foundational quality gate of enterprise analytics. Never deploy a query to production without turning on Column Quality and Column Distribution under the View tab. Quarantine red errors with 'Keep Errors', verify your primary keys are 100% unique, and apply the golden triad of Clean, Trim, and Proper before loading clean data into your models!"
            }
          />
        </div>
      </div>
    </div>
  );
}
