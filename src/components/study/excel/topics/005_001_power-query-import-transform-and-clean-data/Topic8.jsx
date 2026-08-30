"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
              ⚡ Relational Normalization · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Crosstab to 3NF Fact Tables
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Normalize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Unpivoting Columns: Transforming Crosstab Reports into Normalized Tabular Data
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Spreadsheets designed for human eyes typically store data as wide crosstab matrices—products in rows 
            and 12 months spread across columns. 
            While easy to read, wide matrices completely paralyze Power Pivot, DAX time-intelligence, and interactive PivotTables. 
            Power Query's <strong>Unpivoting Engine</strong>—specifically the enterprise gold standard 
            <strong>"Unpivot Other Columns"</strong>—flattens wide matrices into normalized <strong>Third Normal Form (3NF)</strong> 
            fact tables in seconds, automatically adapting to future months on refresh!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Unpivot Other Columns:</strong> Dynamically ingests future month columns on refresh</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>3NF Normalization:</strong> Powers single-formula DAX time intelligence</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Multi-Level Headers:</strong> 7-step Transpose &amp; Fill Down unpivoting algorithm</span>
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
              <span className="text-teal-400">⚡</span> Power Query Unpivot M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Normalization Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Unpivot Other Columns (Golden Enterprise Standard)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.UnpivotOtherColumns(Source, {"Product_Category", "Branch_City"}, "Month_Attribute", "Revenue_Value")'}
            </div>
            <span className="text-slate-500">// 2. Post-Unpivot Type Coercion</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.TransformColumnTypes(#"Unpivoted", {{"Month_Attribute", type date}, {"Revenue_Value", type number}})'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Unpivot Variation</th>
                  <th className="py-3 px-4">Core M Function</th>
                  <th className="py-3 px-4">Selected Elements</th>
                  <th className="py-3 px-4">Behavior on Future Column Additions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Unpivot Other Columns</td>
                  <td className="py-3 px-4 text-emerald-300">Table.UnpivotOtherColumns</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Select FIXED key dimension columns</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">100% Resilient: Future months auto-unpivoted!</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">Unpivot Columns</td>
                  <td className="py-3 px-4 text-rose-300">Table.Unpivot</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Select DYNAMIC month columns</td>
                  <td className="py-3 px-4 font-sans text-rose-400">Brittle: New months are ignored and lost.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Unpivot Only Selected</td>
                  <td className="py-3 px-4 text-sky-300">Table.Unpivot</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Explicit subset of matrix columns</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Fixed to highlighted selection list.</td>
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
              <span className="text-emerald-400">🔬</span> Dynamic Future Column Resilience &amp; Multi-Level Header Algorithm
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Normalization Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Why "Unpivot Other Columns" is Future-Proof
              </h3>
              <p className="leading-relaxed">
                When you select <code className="text-teal-300 font-mono">Product</code> and choose <strong>Unpivot Other Columns</strong>, 
                Power Query records: <em>"Keep Product fixed, and unpivot EVERYTHING ELSE."</em> 
                When November and December columns arrive in future ERP exports, they are automatically unpivoted into the fact table with zero formula edits!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Auto-Adapts to New Columns on Refresh
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Multi-Level Stacked Header Algorithm
              </h3>
              <p className="leading-relaxed">
                When matrices have stacked headers (e.g. Year in Row 1, Month in Row 2):
                <br />
                <strong>1. Transpose &rarr; 2. Fill Down Year &rarr; 3. Combine Columns with ';' &rarr; 4. Transpose Back &rarr; 5. Promote Headers &rarr; 6. Unpivot Other Columns &rarr; 7. Split Attribute Column</strong>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                7-Step Algorithm Flattens Any Stacked Header Matrix
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Drop Summary "Total" Columns Before Unpivoting!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your raw matrix contains a <code className="text-rose-400 font-mono">"Full Year Total"</code> column on the right, 
              unpivoting without removing it will treat 'Total' as a 13th month, <strong>doubling your overall sales in downstream PivotTables</strong>! 
              Always drop summary total columns prior to unpivoting.
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
              <span className="text-teal-400">📐</span> Visual Crosstab-to-3NF Unpivoting Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Normalization Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how wide cross-tabulated spreadsheet matrices are reorganized into normalized relational fact tables:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wide Matrix (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#BE123C" fillOpacity="0.3" />
              <text x="135" y="47" fill="#FECDD3" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. WIDE CROSSTAB MATRIX</text>

              <g transform="translate(35, 75)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="25" fill="#334155" />
                <text x="6" y="16" fill="#FCA5A5" fontWeight="bold">Product | Jan | Feb | Mar</text>

                <rect y="28" width="200" height="25" fill="#1E293B" />
                <text x="6" y="44">Acc Soft| 45k | 52k | 48k</text>

                <rect y="56" width="200" height="25" fill="#1E293B" />
                <text x="6" y="72">Tax Suite| 38k | 41k | 39k</text>

                <rect y="84" width="200" height="25" fill="#1E293B" />
                <text x="6" y="100">ERP Conn| 67k | 71k | 65k</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" />
              <text x="135" y="245" fill="#FDA4AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Non-Relational Grid</text>
              <text x="135" y="262" fill="#FECDD3" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Data Values in Headers</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Unpivot Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. UNPIVOT OTHER COLUMNS</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Select Fixed Key (Product)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Table.UnpivotOtherColumns</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Auto-Discard Matrix Nulls</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Coerce Month &rarr; Date Type</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 100% Dynamic Future Months</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* 3NF Fact Table (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. 3NF TABULAR FACT</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">Product | Month | Revenue</text>

                <rect y="25" width="175" height="20" fill="#1E293B" />
                <text x="6" y="39">Acc Soft | Jan   | 45,000</text>

                <rect y="48" width="175" height="20" fill="#1E293B" />
                <text x="6" y="62">Acc Soft | Feb   | 52,000</text>

                <rect y="71" width="175" height="20" fill="#1E293B" />
                <text x="6" y="85">Tax Suite| Jan   | 38,000</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Normalized</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Power Pivot DAX</text>
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
                Explore the unpivoting dataset below or download the practice workbook to test matrix normalization in Microsoft Excel.
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
            sheetName="Topic8_Unpivot_Crosstab"
            title="Unpivoting Pipeline (Product Category, Branch City, Month Attribute, Revenue Value, Source Type)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · 12-Month Budget Matrix</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Departmental Budget Normalization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> transforms a wide 12-month budget spreadsheet: 
                selecting <code className="text-teal-300 font-mono">Department</code> &rarr; <strong>Unpivot Other Columns</strong>, 
                converting 50 departmental rows into a 600-row relational fact table in 1 click!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                50 Rows &times; 12 Months &rarr; 600 Relational Fact Rows
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Stacked Multi-Header Unpivot</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                7-Step Transpose &amp; Fill Down Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> unpivots stacked trial balance reports 
                (Year in Row 1, Month in Row 2, Metric in Row 3) via the 7-step Transpose-FillDown algorithm, building a unified journal ledger.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Transpose &rarr; Fill Down &rarr; Merge &rarr; Unpivot &rarr; Split
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Summary Total Prevention</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dropping 'Full Year Total' Column
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> removes summary total columns before unpivoting, 
                preventing a ₹ 48M double-counting inflation bug in downstream Power BI dashboard visuals.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Table.RemoveColumns("Total") &rarr; Prevents Doubled Revenue
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Post-Unpivot Cleaning Efficiency</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                1 Single Type Coercion Step
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> unpivots 50 regional store columns first, 
                then applies currency stripping and numeric casting once on the single <code className="text-amber-300 font-mono">Value</code> column, saving 49 repetitive steps!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Unpivot First &rarr; 1 Single Clean Step on [Value]
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
              <span className="text-teal-400">🪜</span> Step-by-Step Unpivoting Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Drop Summary Total Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Remove any <code className="text-rose-300 font-mono">Total</code> or <code className="text-rose-300 font-mono">Grand Total</code> summary columns on the right to prevent revenue doubling.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Select Fixed Key Dimension Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Hold Ctrl and select your dimension columns (e.g. <code className="text-teal-300 font-mono">Product_Category</code>, <code className="text-teal-300 font-mono">Branch_City</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Click 'Unpivot Other Columns'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Right-click any selected header &rarr; <strong>Unpivot Other Columns</strong>. All dynamic month columns collapse into Attribute and Value fields.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Rename and Coerce Types</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Rename Attribute to <code className="text-emerald-400 font-mono">Month</code> and Value to <code className="text-emerald-400 font-mono">Revenue</code>. Assign <code className="text-emerald-400 font-mono">type date</code> and <code className="text-emerald-400 font-mono">type number</code>!
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
              Unpivot Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Doubled Total Revenue</td>
                  <td className="py-3 px-4 text-slate-300">Unpivoted the 'Full Year Total' summary column along with monthly columns.</td>
                  <td className="py-3 px-4 text-slate-400">Sum of unpivoted value is exactly 2x original revenue.</td>
                  <td className="py-3 px-4 text-emerald-400">Apply 'Remove Columns' on Total before unpivoting.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Future Month Column Loss</td>
                  <td className="py-3 px-4 text-slate-300">Used 'Unpivot Columns' with hardcoded column names instead of 'Unpivot Other Columns'.</td>
                  <td className="py-3 px-4 text-slate-400">November column appears as a static extra column on refresh.</td>
                  <td className="py-3 px-4 text-emerald-400">Select fixed key columns &rarr; Choose <strong>Unpivot Other Columns</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Alphabetical Month Sorting</td>
                  <td className="py-3 px-4 text-slate-300">Left Month attribute as text ('Jan', 'Feb'), resulting in 'April', 'August' sorting.</td>
                  <td className="py-3 px-4 text-slate-400">Pivot chart months display out of calendar order.</td>
                  <td className="py-3 px-4 text-emerald-400">Coerce Month attribute to <code className="text-emerald-400 font-mono">type date</code> or map month number 1-12.</td>
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
              Unpivot Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Unpivot Other Columns</span>
                <span>Future Resilience</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always select fixed keys and unpivot other columns to handle new monthly files.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Unpivot FIRST</span>
                <span>Type Cleaning Efficiency</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean currency strings on the single unpivoted 'Value' column instead of 12 matrix columns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Drop Totals First</span>
                <span>Prevent Double Revenue</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remove Full Year Total columns before unpivoting to avoid doubling financial metrics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Automatic Null Discard</span>
                <span>Memory Optimization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Null matrix cells are automatically omitted during unpivot, yielding compact tables.
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
                <strong>Reflect on future schema resilience:</strong> Why does using <code className="text-emerald-400 font-mono">Unpivot Other Columns</code> guarantee that your ETL model will automatically incorporate next month's sales column without query edits?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine DAX simplicity:</strong> How does unpivoting a 12-month matrix into a normalized <code className="text-teal-300 font-mono">Date, Revenue</code> fact table reduce 12 separate DAX measures down to 1 single dynamic measure?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider multi-level header normalization:</strong> Why is the 7-step Transpose &rarr; Fill Down &rarr; Merge &rarr; Transpose &rarr; Unpivot algorithm essential for converting complex corporate trial balance exports into relational tables?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Unpivoting Columns & Relational Normalization — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never build models on crosstab matrices! Always use 'Unpivot Other Columns' (never Unpivot Columns) to make your queries 100% resilient to future month additions. Drop total summary columns before unpivoting, unpivot BEFORE changing numeric data types to save dozens of repetitive steps, and convert the resulting Attribute column into true calendar dates for seamless DAX time-intelligence analytics!"
            }
          />
        </div>
      </div>
    </div>
  );
}
