"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
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
              ⚡ Aggregation &amp; Pivoting · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Table.Pivot &amp; Table.Group
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Aggregate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Pivoting Columns &amp; Custom Aggregations in Power Query
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Summarizing and reshaping data is the heart of business intelligence. 
            Power Query's <strong>Pivoting &amp; Group By Engine</strong> provides declarative operators—from 
            <strong>Pivot Column</strong> (<code className="text-teal-300 font-mono">Table.Pivot</code>) for building executive matrices and 
            <strong>Don't Aggregate EAV Unfolding</strong> to 
            <strong>Advanced Multi-Metric Group By</strong> (<code className="text-sky-300 font-mono">Table.Group</code>) and 
            <strong>All Rows Nested Tables</strong> (<code className="text-emerald-300 font-mono">type table</code>) for partitioned rankings and running totals!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Pivot Column:</strong> Transforms distinct row values into aggregated column headers</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Don't Aggregate:</strong> Flattens Entity-Attribute-Value text models cleanly</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>All Rows Sub-Tables:</strong> Powers partitioned rankings and group string aggregation</span>
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
              <span className="text-teal-400">⚡</span> Power Query Pivot &amp; Group By M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Aggregation Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Pivot Column with Sum Aggregation</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Pivot(Source, List.Distinct(Source[Metric_Name]), "Metric_Name", "Metric_Value", List.Sum)'}
            </div>
            <span className="text-slate-500">// 2. Advanced Multi-Metric Group By</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Group(Source, {"Branch_City"}, {{"Total_Sales", each List.Sum([Amount]), type number}, {"Order_Count", each Table.RowCount(_), type number}})'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Operation</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Aggregation Function</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Pivot (Sum)</td>
                  <td className="py-3 px-4 text-teal-300">Table.Pivot</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">List.Sum / List.Average</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Summarizes metric categories into wide presentation matrices.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Pivot (Don't Aggregate)</td>
                  <td className="py-3 px-4 text-emerald-300">Table.Pivot</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">null (No aggregation)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Flattens EAV text key-value pairs into wide entity records.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Group By (Summary)</td>
                  <td className="py-3 px-4 text-sky-300">Table.Group</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">List.Sum, List.Median, Table.RowCount</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Folds into native server-side SQL GROUP BY clauses.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Group By (All Rows)</td>
                  <td className="py-3 px-4 text-indigo-300">Table.Group</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{'each _, type table'}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Stores nested sub-tables for partitioned rankings &amp; running sums.</td>
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
              <span className="text-emerald-400">🔬</span> 'Don't Aggregate' EAV Unfolding &amp; Nested 'All Rows' Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Aggregation Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> 'Don't Aggregate' for Text EAV Models
              </h3>
              <p className="leading-relaxed">
                When raw data is stored as Entity-Attribute-Value (e.g. Row 1: ID 101, Attr: Phone, Val: 98301; Row 2: ID 101, Attr: City, Val: Barrackpore), 
                standard Pivot Sum fails on text. Selecting <strong>Advanced Options → Don't Aggregate</strong> 
                reshapes text attributes into columns with a strict 1-to-1 mapping!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                EAV Tall Rows → Standard Wide Entity Record
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Nested 'All Rows' Partitioned Ranking
              </h3>
              <p className="leading-relaxed">
                Selecting Operation <strong>All Rows</strong> retains the complete sub-table per key inside the cell. 
                You can sort each sub-table descending and apply <code className="text-amber-300 font-mono">Table.AddIndexColumn</code> to compute 
                pure SQL <code className="text-sky-300 font-mono">ROW_NUMBER() OVER (PARTITION BY Branch)</code> rankings!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Sub-Table Sorting + Index → Group-Level Sales Rep Ranks
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Server-Side SQL GROUP BY Query Folding
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When working with SQL databases, <code className="text-teal-300 font-mono">Table.Group</code> folds directly into a server-side <code className="text-sky-300 font-mono">GROUP BY</code> query. 
              The SQL server aggregates 50 million transaction records in seconds, returning only a lightweight 100-row summary table across the network!
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
              <span className="text-teal-400">📐</span> Visual Pivoting &amp; Group By Aggregation Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Aggregation Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how raw transaction rows pass through Pivot Column and Advanced Group By operations:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Ingestion Stream (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. DETAILED TRANSACTIONS</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18">Barrackpore | Tax   | ₹45,000</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">Barrackpore | Audit | ₹32,000</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82">Shyamnagar  | Tax   | ₹28,000</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114">Shyamnagar  | Audit | ₹19,500</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Granular Row Ledger</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Multiple Rows per Branch</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Aggregation Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. M AGGREGATION SUITE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Table.Group (Sum Amount)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Table.Pivot (Category → Cols)</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. All Rows Nested Tables</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. SQL Query Folding Engine</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Second In-Memory Grouping</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Pivoted / Grouped Output (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. SUMMARIZED MATRIX</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="25" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="16" fill="#34D399" fontWeight="bold">Branch | Tax | Audit</text>

                <rect y="28" width="175" height="22" fill="#1E293B" />
                <text x="6" y="42">BKP    | ₹45k| ₹32k</text>

                <rect y="53" width="175" height="22" fill="#1E293B" />
                <text x="6" y="67">SHYAM  | ₹28k| ₹19.5k</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Executive Summary</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">High-Speed Management Feed</text>
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
                Explore the pivoting and aggregation dataset below or download the practice workbook to test Table.Pivot and Table.Group in Microsoft Excel.
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
            sheetName="EX2010"
            title="Pivoting & Aggregations Pipeline (Branch City, Service Category, Metric Type, Metric Value, Total Group Revenue)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · EAV CRM Text Unfolding</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Pivot 'Don't Aggregate' Customer Contacts
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> converts key-value contact attributes (Phone, Email, GSTIN) 
                into wide customer records using <code className="text-teal-300 font-mono">Table.Pivot</code> with <strong>Don't Aggregate</strong>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Don't Aggregate → Flattens EAV Key-Values into Wide Entity Table
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Server-Side SQL Grouping</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Million Row SQL Query Folding
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> groups 12M inventory transactions by Warehouse: 
                Power Query folds into native SQL <code className="text-emerald-300 font-mono">GROUP BY Warehouse, SUM(Qty)</code>, finishing in 1.4 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                SQL GROUP BY Folding → Aggregates 12M Rows on Server
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Partitioned Rep Ranking</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Group By 'All Rows' → Nested Index Ranking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> groups by Department with <strong>All Rows</strong>, 
                sorts sub-tables by revenue descending, and adds index columns to rank sales reps within each division!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Group All Rows → Nested Index = Partitioned Ranks
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Group String Concatenation</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text.Combine Group Aggregation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> lists all active projects per client: 
                <code className="text-amber-300 font-mono">{'Table.Group(Source, {"Client"}, {{"Projects", each Text.Combine(_[Project_Name], ", "), type text}})'}</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Text.Combine per Group → Comma-Separated Project Lists
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
              <span className="text-teal-400">🪜</span> Step-by-Step Pivoting &amp; Grouping Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Select Pivot Column &amp; Open Dialog</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Highlight the column whose values will become column headers → <strong>Transform Tab → Pivot Column</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Assign Values Column &amp; Aggregate Function</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Choose the numeric metric column under <strong>Values Column</strong>. Under <strong>Advanced Options</strong>, select <strong>Sum</strong> (or <strong>Don't Aggregate</strong> for text).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Perform Multi-Metric Group By</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Home Tab → Group By</strong> → Select <strong>Advanced</strong> → Add multiple group keys and aggregations (Sum, Average, Count).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Leverage 'All Rows' for Partitioned Sub-Queries</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use operation <strong>All Rows</strong> to keep nested sub-tables for group ranking, top N extraction, or string concatenation!
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
              Aggregation Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Too Many Elements in Enumeration</td>
                  <td className="py-3 px-4 text-slate-300">Selected 'Don't Aggregate' when an entity had multiple values for the same attribute.</td>
                  <td className="py-3 px-4 text-slate-400">Expression.Error during Table.Pivot evaluation.</td>
                  <td className="py-3 px-4 text-emerald-400">Deduplicate key-attribute pairs or choose an aggregation like Max or Text.Combine.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Loss of Numeric Type in Group By</td>
                  <td className="py-3 px-4 text-slate-300">Omitted explicit type definition in custom Table.Group M formula.</td>
                  <td className="py-3 px-4 text-slate-400">Resulting aggregated column shows 'any' data type icon.</td>
                  <td className="py-3 px-4 text-emerald-400">Append <code className="text-emerald-400 font-mono">type number</code> as 3rd element in aggregate tuple.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">High RAM on 'All Rows'</td>
                  <td className="py-3 px-4 text-slate-300">Grouping 10 million rows with 'All Rows' locally on a flat CSV file.</td>
                  <td className="py-3 px-4 text-slate-400">Power Query memory usage spikes and refresh slows down.</td>
                  <td className="py-3 px-4 text-emerald-400">Filter unneeded rows first or perform heavy grouping on SQL database server.</td>
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
              Aggregation Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Don't Aggregate</span>
                <span>Text Key-Value Pivot</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unfold non-numeric EAV phone, email, and address pairs into wide tables.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">All Rows Nested Tables</span>
                <span>Partitioned Ranking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retain nested sub-tables for partitioned ranking and running totals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Text.Combine</span>
                <span>String Aggregation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Concatenate multiple text items per group into comma-separated lists.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">SQL Query Folding</span>
                <span>Server-Side GROUP BY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Place Group By early to offload millions of row summaries to the SQL server.
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
                <strong>Reflect on 'Don't Aggregate':</strong> Why does choosing 'Don't Aggregate' during <code className="text-teal-300 font-mono">Table.Pivot</code> fail with an enumeration error if an entity has two phone numbers, and how do you resolve it?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine nested 'All Rows':</strong> How does storing sub-tables inside record cells enable Power Query to compute partitioned rankings equivalent to SQL <code className="text-emerald-300 font-mono">ROW_NUMBER() OVER (PARTITION BY)</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider Query Folding efficiency:</strong> Why does applying <code className="text-amber-300 font-mono">Table.Group</code> on a 50-million-row SQL database complete in milliseconds over the network?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Pivoting Columns & Custom Aggregations — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Keep data tall for analytics, pivot only for final display, and unlock nested power with 'Group By All Rows'! Use 'Don't Aggregate' to flatten EAV text attributes into entity tables, place Group By early to trigger SQL server-side GROUP BY query folding, and leverage nested sub-tables to calculate partitioned rankings and group string concatenations like a true data engineering master!"
            }
          />
        </div>
      </div>
    </div>
  );
}
