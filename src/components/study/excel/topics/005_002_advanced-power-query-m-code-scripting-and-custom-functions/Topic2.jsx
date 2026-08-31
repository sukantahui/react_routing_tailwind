"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
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
              ⚡ Standard Library · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Table, List, Record &amp; Text
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Transform
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Essential M Standard Library Functions: Table, List, Record &amp; Text Namespaces
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Power Query's standard library contains hundreds of highly optimized primitives organized into clean, 
            object-oriented namespaces. By mastering core functions across 
            <strong>Table.*</strong> (<code className="text-teal-300 font-mono">Table.SelectRows</code>, <code className="text-teal-300 font-mono">Table.TransformColumns</code>), 
            <strong>List.*</strong> (<code className="text-emerald-300 font-mono">List.Generate</code>, <code className="text-emerald-300 font-mono">List.Transform</code>), 
            <strong>Record.*</strong> (<code className="text-sky-300 font-mono">Record.FieldOrDefault</code>), and 
            <strong>Text.*</strong> (<code className="text-indigo-300 font-mono">Text.Select</code>, <code className="text-indigo-300 font-mono">Text.BetweenDelimiters</code>), 
            you can author sophisticated enterprise ETL transformations with sub-second performance!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Table.*:</strong> High-speed grid filtering, in-place column transformation, and grouping</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>List.*:</strong> Functional mapping, filtering, membership tests, and while loops (<code className="text-emerald-300">List.Generate</code>)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Text.*:</strong> Character whitelist sanitization (<code className="text-sky-300">Text.Select</code>) and delimiter boundary extraction</span>
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
              <span className="text-teal-400">⚡</span> M Standard Library Namespace Signatures
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Standard Library
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. In-Place Table Column Transformation (Table.TransformColumns)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.TransformColumns(Source, {{"Phone", each Text.Select(_, {"0".."9"}), type text}})'}
            </div>
            <span className="text-slate-500">// 2. Functional List Transformation &amp; Filtering (List.Transform &amp; List.Select)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'CleanedList = List.Transform(List.Select(SourceList, each _ &lt;&gt; null), each Text.Trim(Text.Upper(_)))'}
            </div>
            <span className="text-slate-500">// 3. Defensive Record Lookup (Record.FieldOrDefault)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'EffectiveTax = Record.FieldOrDefault(BranchConfig, "CustomGST", 0.18)'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Namespace</th>
                  <th className="py-3 px-4">Function Signature</th>
                  <th className="py-3 px-4">Output Type</th>
                  <th className="py-3 px-4">Primary Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Table.*</td>
                  <td className="py-3 px-4 text-teal-300">Table.SelectRows(T, condition)</td>
                  <td className="py-3 px-4 text-slate-300">Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Filtering rows based on predicate lambda function.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">List.*</td>
                  <td className="py-3 px-4 text-emerald-300">List.Generate(init, cond, next, sel)</td>
                  <td className="py-3 px-4 text-slate-300">List</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Iterative while loop for REST API pagination and sequence building.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Record.*</td>
                  <td className="py-3 px-4 text-sky-300">Record.FieldOrDefault(R, field, def)</td>
                  <td className="py-3 px-4 text-slate-300">Any</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Defensive field retrieval against shifting schema keys.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Text.*</td>
                  <td className="py-3 px-4 text-indigo-300">Text.BetweenDelimiters(T, s, e)</td>
                  <td className="py-3 px-4 text-slate-300">Text</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracting sub-tokens bounded by specific delimiter strings.</td>
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
              <span className="text-emerald-400">🔬</span> In-Place Transformation vs Column Addition &amp; Higher-Order Mapping
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Library Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Table.TransformColumns vs Table.AddColumn
              </h3>
              <p className="leading-relaxed">
                When cleaning data (e.g. trimming text, formatting dates), avoid <code className="text-teal-300 font-mono">Table.AddColumn</code> followed by deleting the old column. 
                Use <code className="text-teal-300 font-mono">Table.TransformColumns</code> to modify the column <strong>in-place</strong>, saving memory and keeping your Applied Steps list lean!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                In-Place Modification: Table.TransformColumns
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Text.Select Whitelist Sanitization
              </h3>
              <p className="leading-relaxed">
                Cleaning messy phone numbers or PAN cards by daisy-chaining 10 <code className="text-emerald-300 font-mono">Text.Replace</code> calls is fragile. 
                Instead, use <code className="text-emerald-300 font-mono">{'Text.Select([Phone], {"0".."9"})'}</code> to strip all non-digit characters in a single high-speed operation!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                {'Text.Select([Str], {"0".."9"})'} → 100% Digit Whitelisting
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> List.Generate: The Functional While Loop
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because M is purely functional without traditional <code className="text-rose-400 font-mono">for</code> or <code className="text-rose-400 font-mono">while</code> loops, 
              <code className="text-teal-300 font-mono">List.Generate</code> is the engine for stateful iteration. 
              It takes 4 lambda arguments: <strong>initial state</strong>, <strong>continuation condition</strong>, <strong>next state generator</strong>, and <strong>selector output</strong>!
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
              <span className="text-teal-400">📐</span> Visual M Standard Library Transformation Engine
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Namespace Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how standard library functions operate across different data type layers to normalize raw corporate data:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Input (Left) */}
              <rect x="25" y="25" width="210" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="210" height="34" rx="12" fill="#BE123C" fillOpacity="0.3" />
              <text x="130" y="47" fill="#FECDD3" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. RAW DATA STREAM</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="190" height="28" fill="#1E293B" />
                <text x="8" y="18" fill="#FCA5A5">Phone: "+91-98300-12345"</text>

                <rect y="34" width="190" height="28" fill="#1E293B" />
                <text x="8" y="52" fill="#FCA5A5">File: "Inv_[TXN-901]_Fin.csv"</text>

                <rect y="68" width="190" height="28" fill="#1E293B" />
                <text x="8" y="86" fill="#FCA5A5">Config: [Branch="BKP"]</text>

                <rect y="102" width="190" height="28" fill="#1E293B" />
                <text x="8" y="120" fill="#FCA5A5">RawSales: 100k Fact Rows</text>
              </g>

              <text x="130" y="270" fill="#FDA4AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Unsanitized Input Layer</text>

              {/* Arrow */}
              <path d="M 245 160 L 295 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="300,160 290,155 290,165" fill="#14B8A6" />

              {/* M Standard Library Engine (Center) */}
              <rect x="305" y="25" width="280" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="305" y="25" width="280" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="445" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. M STANDARD LIBRARY ENGINE</text>

              <g transform="translate(320, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="250" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">{'Text.Select([Phone], {"0".."9"})'}</text>

                <rect y="38" width="250" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">Text.BetweenDelimiters(File, "[", "]")</text>

                <rect y="76" width="250" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">Record.FieldOrDefault(Conf, "Rate", 0.18)</text>

                <rect y="114" width="250" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">Table.Buffer(Table.SelectRows(...))</text>
              </g>

              <text x="445" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Second Functional Processing</text>

              {/* Arrow */}
              <path d="M 595 160 L 625 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="630,160 620,155 620,165" fill="#10B981" />

              {/* Standardized Output (Right) */}
              <rect x="635" y="25" width="190" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="635" y="25" width="190" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="730" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. STANDARDIZED DATA</text>

              <g transform="translate(645, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="170" height="24" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="16" fill="#34D399" fontWeight="bold">919830012345 (Clean)</text>

                <rect y="28" width="170" height="24" fill="#1E293B" />
                <text x="6" y="44">"TXN-901" (Extracted)</text>

                <rect y="56" width="170" height="24" fill="#1E293B" />
                <text x="6" y="72">Rate = 0.18 (Resolved)</text>

                <rect y="84" width="170" height="24" fill="#1E293B" />
                <text x="6" y="100">8,420 Filtered Rows</text>
              </g>

              <rect x="645" y="225" width="170" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="730" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Production-Ready</text>
              <text x="730" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Loaded to Data Model</text>
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
                Explore the M standard library functions catalog below or download the practice workbook to test Table, List, Record, and Text operations in Microsoft Excel.
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
            sheetName="EX2103"
            title="M Standard Library Master Catalog (Library Namespace, M Function Signature, Input Signature, Output Type, Corporate Production Scenario)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Whitelist Phone Sanitization</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text.Select Digit Cleaning on 50,000 Clients
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> cleans a dirty customer database containing phone numbers with brackets, spaces, and country codes using <code className="text-teal-300 font-mono">{'Text.Select([Phone], {"0".."9"})'}</code>, standardizing 50k numbers in 0.4 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Text.Select → Strips All Non-Digit Characters Instantly
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · REST API Dynamic While Loop</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                List.Generate Multi-Page Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> authors a stateful <code className="text-emerald-300 font-mono">List.Generate</code> loop to paginate through cloud ERP ledger pages until the next-page cursor returns null, consolidating all fiscal records automatically.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                List.Generate → Automated Multi-Page Cursor Pagination
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Defensive Config Retrieval</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Record.FieldOrDefault Fallback Protection
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> applies <code className="text-indigo-300 font-mono">Record.FieldOrDefault(BranchConfig, "SurchargeRate", 0.0)</code> across 12 branch subsidiaries, preventing crashes when regional branches omit surcharge keys.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Record.FieldOrDefault → Zero Missing-Key Pipeline Halts
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Substring Delimiter Slicing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text.BetweenDelimiters SKU Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> extracts SKU product codes from complex delivery filenames (<code className="text-fuchsia-300 font-mono">"Shipment_[SKU-IND-104]_2026.pdf"</code>) using <code className="text-fuchsia-300 font-mono">Text.BetweenDelimiters</code> without fragile character counting.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Text.BetweenDelimiters → Exact Boundary Substring Extraction
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
              <span className="text-teal-400">🪜</span> Step-by-Step Standard Library Execution Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Target Namespace</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select <code className="text-teal-300 font-mono">Table.*</code> for grid transforms, <code className="text-teal-300 font-mono">List.*</code> for array loops, <code className="text-teal-300 font-mono">Record.*</code> for field access, or <code className="text-teal-300 font-mono">Text.*</code> for sanitization.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Apply In-Place Column Transformations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-indigo-300 font-mono">Table.TransformColumns</code> with nested lambdas (<code className="text-indigo-300 font-mono">each Text.Trim(_)</code>) to avoid redundant column additions.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Whitelist Clean Tokens with Text.Select</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Extract numeric or alphabetical tokens using whitelist ranges: <code className="text-cyan-300 font-mono">{'Text.Select([Str], {"0".."9"})'}</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Safeguard Record Lookups with Defaults</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wrap field retrievals in <code className="text-emerald-300 font-mono">Record.FieldOrDefault(Record, "Field", Fallback)</code> to protect against missing keys!
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
              Standard Library Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Type Mismatch in Higher-Order Call</td>
                  <td className="py-3 px-4 text-slate-300">Passed a Table to a <code className="text-rose-400 font-mono">List.*</code> function (e.g. <code className="text-rose-400 font-mono">List.Sum(Table)</code>).</td>
                  <td className="py-3 px-4 text-slate-400">Error: <em>"We cannot convert a value of type Table to type List"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Project column as list: <code className="text-emerald-400 font-mono">List.Sum(Table[Amount])</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Missing Record Field Halt</td>
                  <td className="py-3 px-4 text-slate-300">Accessed a field directly with <code className="text-amber-300 font-mono">Record[Field]</code> when key was absent.</td>
                  <td className="py-3 px-4 text-slate-400">Query evaluation crashes with missing field error.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">Record.FieldOrDefault(Record, "Field", null)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">List.Generate Infinite Loop</td>
                  <td className="py-3 px-4 text-slate-300">Continuation condition never evaluates to false (e.g. page cursor never increments).</td>
                  <td className="py-3 px-4 text-slate-400">Power Query memory increases indefinitely and freezes.</td>
                  <td className="py-3 px-4 text-emerald-400">Include a hard upper bound: <code className="text-emerald-400 font-mono">{"each [Page] <= 50 and [Cursor] <> null"}</code>.</td>
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
              Library Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Text.Select</span>
                <span>Digit &amp; Char Whitelisting</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract digits or uppercase letters in one step without fragile chained replace formulas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">List.Dates</span>
                <span>Instant Calendar Table</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate 365 or 3,650 sequential calendar dates directly for Power Pivot Date dimensions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Table.TransformColumns</span>
                <span>In-Place Modification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transform column values in-place without adding and removing temporary auxiliary columns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Record.FieldOrDefault</span>
                <span>Defensive Key Fallback</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide default fallbacks for missing record keys to eliminate fatal pipeline crashes.
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
                <strong>Reflect on in-place transformation:</strong> Why does using <code className="text-teal-300 font-mono">Table.TransformColumns</code> reduce memory overhead and Applied Step bloat compared to <code className="text-rose-400 font-mono">Table.AddColumn</code> followed by column deletion?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine iterative state generation:</strong> How does <code className="text-emerald-400 font-mono">List.Generate</code> solve the problem of fetching 500 pages from a paginated cloud REST API without violating functional immutability?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider string sanitization:</strong> Why is <code className="text-sky-300 font-mono">{'Text.Select([Str], {"0".."9"})'}</code> vastly superior to chaining 10 separate <code className="text-rose-400 font-mono">Text.Replace</code> steps when cleaning corporate telephone fields?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="M Standard Library Functions — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Know your namespaces (Table.* for grids, List.* for collections, Record.* for single tuples, Text.* for sanitization)! Never reinvent logic that already exists in the standard library: use List.Generate for loops, Text.Select for phone/digit stripping, Record.FieldOrDefault for defensive lookups, and Table.Buffer for in-memory acceleration!"
            }
          />
        </div>
      </div>
    </div>
  );
}
