"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
              ⚡ Folder Consolidation · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Multi-File ETL Pipelines
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize &amp; Consolidate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Ingesting Data from Entire Folders: Dynamic Multi-File Consolidation with Custom Schema Handling
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern corporate operations, regional branches generate dozens of daily CSV and Excel workbooks that 
            must be consolidated into a unified enterprise ledger. 
            By leveraging <strong>Folder Data Ingestion</strong> (<code className="text-teal-300 font-mono">Folder.Files</code>), 
            defensive lock-file filtering (<code className="text-emerald-300 font-mono">not Text.StartsWith([Name], "~$")</code>), 
            and <strong>Dynamic Schema Unioning</strong> (<code className="text-sky-300 font-mono">List.Distinct</code> + <code className="text-sky-300 font-mono">Table.ExpandTableColumn</code>), 
            you create automated zero-maintenance pipelines that seamlessly ingest new monthly files with 1 click!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Folder.Files Scan:</strong> Recursive multi-file extraction with binary streaming</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Defensive Filtering:</strong> Automatically exclude Excel lock files (<code className="text-emerald-300">~$</code>) and hidden files</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Dynamic Schema Alignment:</strong> Auto-align mismatched branch headers with zero data loss</span>
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
              <span className="text-teal-400">⚡</span> Folder Consolidation Pipeline Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Folder.Files M Code
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. Scan Folder &amp; Filter Out Lock Files</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'Source = Folder.Files(p_FolderPath), Filtered = Table.SelectRows(Source, each [Extension] = ".csv" and not [Attributes][Hidden] and not Text.StartsWith([Name], "~$"))'}
            </div>
            <span className="text-slate-500">// 2. Dynamic Schema Discovery across Nested Tables</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'AllHeaders = List.Distinct(List.Combine(List.Transform(AddedData[Data], each Table.ColumnNames(_))))'}
            </div>
            <span className="text-slate-500">// 3. Dynamic Column Expansion</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'Expanded = Table.ExpandTableColumn(AddedData, "Data", AllHeaders)'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Step</th>
                  <th className="py-3 px-4">M Function Signature</th>
                  <th className="py-3 px-4">Input → Output</th>
                  <th className="py-3 px-4">Critical Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Folder Scan</td>
                  <td className="py-3 px-4 text-teal-300">Folder.Files(path)</td>
                  <td className="py-3 px-4 text-slate-300">Path → Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Performs recursive flat directory scan of all binary files.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Lock Filter</td>
                  <td className="py-3 px-4 text-emerald-300">Table.SelectRows(...)</td>
                  <td className="py-3 px-4 text-slate-300">Table → Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Excludes temp lock files (<code className="text-emerald-300 font-mono">~$...</code>) and non-data extensions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Binary Parser</td>
                  <td className="py-3 px-4 text-sky-300">Csv.Document / Excel.Workbook</td>
                  <td className="py-3 px-4 text-slate-300">Binary → Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Converts raw file bytes into structured in-memory table objects.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Schema Expansion</td>
                  <td className="py-3 px-4 text-amber-300">Table.ExpandTableColumn(...)</td>
                  <td className="py-3 px-4 text-slate-300">Nested → Flat Grid</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Unpacks nested rows into a unified table with preserved lineage.</td>
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
              <span className="text-emerald-400">🔬</span> Dynamic Schema Discovery &amp; Filename Lineage Extraction
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Folder Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Dynamic Schema Header Discovery
              </h3>
              <p className="leading-relaxed">
                When combining files from different branches (e.g. Barrackpore uses <code className="text-teal-300 font-mono">[GrossAmt]</code> while Shyamnagar uses <code className="text-teal-300 font-mono">[Gross_Amount]</code>), 
                hardcoded column expansion loses columns. Dynamic schema unioning computes 
                <code className="text-teal-300 font-mono">List.Distinct(List.Combine(List.Transform(...)))</code> to guarantee 100% column capture!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Union All Headers: List.Distinct(List.Combine(...))
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Filename Lineage Preservation
              </h3>
              <p className="leading-relaxed">
                Never discard the <code className="text-emerald-300 font-mono">[Name]</code> column! 
                Extracting branch names, fiscal years, or dates from filenames (e.g. <code className="text-emerald-300 font-mono">"Sales_2026_Barrackpore.csv"</code>) 
                adds critical dimension attributes to your consolidated fact table automatically!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Lineage: Text.BetweenDelimiters([Name], "Sales_", ".csv")
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Headless Memory Streaming vs VBA COM Automation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike legacy VBA macros that open, copy, and close each Excel workbook through the slow Windows COM interface, 
              Power Query streams raw binaries directly through memory in headless background threads, consolidating 100 files in seconds!
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
              <span className="text-teal-400">📐</span> Visual Dynamic Folder Consolidation Engine
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Folder ETL Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how multi-branch CSV files are scanned, filtered, parsed, and dynamically aligned into a single fact table:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Folder Storage (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#BE123C" fillOpacity="0.3" />
              <text x="135" y="47" fill="#FECDD3" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. BRANCH DATA FOLDER</text>

              <g transform="translate(35, 75)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="26" fill="#1E293B" />
                <text x="6" y="17" fill="#5EEAD4">📄 Sales_BKP_2026.csv</text>

                <rect y="30" width="200" height="26" fill="#1E293B" />
                <text x="6" y="47" fill="#5EEAD4">📄 Sales_SHYAM_2026.csv</text>

                <rect y="60" width="200" height="26" fill="#1E293B" />
                <text x="6" y="77" fill="#5EEAD4">📄 Sales_ICH_2026.csv</text>

                <rect y="90" width="200" height="26" fill="#1E293B" />
                <text x="6" y="107" fill="#5EEAD4">📄 Sales_NAI_2026.csv</text>

                <rect y="120" width="200" height="26" fill="#881337" fillOpacity="0.3" stroke="#F43F5E" />
                <text x="6" y="137" fill="#FDA4AF">⚠️ ~$Sales_BKP.xlsx (Lock)</text>
              </g>

              <rect x="35" y="235" width="200" height="45" rx="6" fill="#1E293B" stroke="#14B8A6" />
              <text x="135" y="252" fill="#5EEAD4" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Folder.Files(p_FolderPath)</text>
              <text x="135" y="268" fill="#94A3B8" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">Auto-filters lock files (~$)</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* M Ingestion Engine (Center) */}
              <rect x="325" y="25" width="255" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="255" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="452" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. DYNAMIC M SCHEMA ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="225" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Filter [Hidden]=false &amp; Ext=.csv</text>

                <rect y="38" width="225" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Extract Branch from [Name]</text>

                <rect y="76" width="225" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Csv.Document([Content])</text>

                <rect y="114" width="225" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Discover Dynamic Union Headers</text>
              </g>

              <text x="452" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Dynamic Multi-Branch Union</text>

              {/* Arrow */}
              <path d="M 595 160 L 625 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="630,160 620,155 620,165" fill="#10B981" />

              {/* Consolidated Output (Right) */}
              <rect x="635" y="25" width="190" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="635" y="25" width="190" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="730" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. CONSOLIDATED FACT</text>

              <g transform="translate(645, 75)" fontSize="7.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="170" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">Branch | Date | Amount</text>

                <rect y="25" width="170" height="20" fill="#0F172A" />
                <text x="6" y="39">BKP   | 01/04 | ₹45,250</text>

                <rect y="48" width="170" height="20" fill="#0F172A" />
                <text x="6" y="62">SHYAM | 01/04 | ₹12,800</text>

                <rect y="71" width="170" height="20" fill="#0F172A" />
                <text x="6" y="85">ICH   | 01/04 | ₹98,400</text>

                <rect y="94" width="170" height="20" fill="#0F172A" />
                <text x="6" y="108">NAI   | 01/04 | ₹34,100</text>
              </g>

              <rect x="645" y="225" width="170" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="730" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">50,000 Total Rows</text>
              <text x="730" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">1-Click Automated Refresh</text>
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
                Explore the multi-branch consolidated dataset below or download the practice workbook to test folder ingestion in Microsoft Excel.
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
            sheetName="EX2106"
            title="Multi-Branch Folder Consolidation Output (Source File Name, Branch Dimension, Invoice Date, Customer Name, Net Sales Amount INR, Consolidation Engine)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Multi-Branch POS Consolidation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Consolidating 36 Monthly Store CSVs
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> builds a folder ingestion pipeline consolidating 36 monthly branch sales CSVs from Barrackpore, Shyamnagar, Ichapur, and Naihati in 1.8 seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Folder.Files → 36 Branch Files Consolidated into 1 Fact Table
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Excel Lock File Immunity</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Filtering ~$ Temporary Files
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> implements <code className="text-emerald-300 font-mono">not Text.StartsWith([Name], "~$")</code>, ensuring scheduled refreshes succeed even when store managers have regional Excel files actively open.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                ~$ Lock Filter → Zero Open-File Refresh Aborts
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Dynamic Schema Drift Alignment</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unioning Mismatched Vendor Invoices
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> applies dynamic column header discovery (<code className="text-indigo-300 font-mono">List.Distinct</code>), aligning vendor billing spreadsheets that feature varying column headers across different factory plants.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Dynamic Schema Union → 100% Ingestion Across Schema Drifts
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Monthly File Pick-Up</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Zero-Touch Monthly Report Append
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> configures a SharePoint folder pipeline where dropping the new <code className="text-fuchsia-300 font-mono">Sales_2026_05.xlsx</code> file into the folder updates the Power BI executive dashboard upon next scheduled refresh.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Drop File → Auto Ingested without Editing M Code
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
              <span className="text-teal-400">🪜</span> Step-by-Step Folder Consolidation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Scan Folder via Folder.Files(p_FolderPath)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use parameterized folder paths to perform a flat recursive scan of all directory files.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Filter Hidden Files and Excel ~$ Lock Files</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Filter <code className="text-indigo-300 font-mono">not [Attributes][Hidden]</code> and <code className="text-indigo-300 font-mono">not Text.StartsWith([Name], "~$")</code> early!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Extract Metadata Lineage from [Name] Column</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Extract Branch, Year, or Month dimensions before removing extraneous metadata columns.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Parse Binaries &amp; Expand with Dynamic Headers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Parse <code className="text-emerald-300 font-mono">[Content]</code> via <code className="text-emerald-300 font-mono">Csv.Document</code> and expand using computed <code className="text-emerald-300 font-mono">List.Distinct</code> headers!
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
              Folder Ingestion Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Corrupted File Format Error</td>
                  <td className="py-3 px-4 text-slate-300">Ingested an Excel lock file starting with <code className="text-rose-400 font-mono">~$</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Error: <em>"The input file is not a valid Excel file"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Add filter: <code className="text-emerald-400 font-mono">not Text.StartsWith([Name], "~$")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Missing Columns on Ingestion</td>
                  <td className="py-3 px-4 text-slate-300">Used static hardcoded column list in <code className="text-amber-300 font-mono">Table.ExpandTableColumn</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Newly added columns in recent files are dropped silently.</td>
                  <td className="py-3 px-4 text-emerald-400">Compute dynamic union headers via <code className="text-emerald-400 font-mono">List.Distinct(List.Combine(...))</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Folder Path Not Found</td>
                  <td className="py-3 px-4 text-slate-300">Hardcoded local folder path on machine that doesn't exist on colleague's computer.</td>
                  <td className="py-3 px-4 text-slate-400">Refresh crashes with path not found error.</td>
                  <td className="py-3 px-4 text-emerald-400">Parameterize folder path with <code className="text-emerald-400 font-mono">p_FolderPath</code> or SharePoint URL.</td>
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
              Folder Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">~$ Lock Filter</span>
                <span>Crash Prevention</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always filter out temporary lock files immediately after <code className="text-emerald-300 font-mono">Folder.Files</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Lineage Columns</span>
                <span>Audit Traceability</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retain <code className="text-sky-300 font-mono">[Name]</code> to parse branch and date dimensions directly from filenames.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Dynamic List.Distinct</span>
                <span>Schema Drift Immunity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dynamically discover all distinct column headers across nested tables before expanding.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">SharePoint.Files</span>
                <span>Cloud Folders</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <code className="text-amber-300 font-mono">SharePoint.Files</code> to consolidate cloud folders directly from Microsoft 365.
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
                <strong>Reflect on lock-file filtering:</strong> Why does failing to filter out <code className="text-rose-400 font-mono">~$</code> files cause periodic refresh failures in shared network folders?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine schema drift resiliency:</strong> How does dynamic schema discovery prevent data truncation when a newly opened branch introduces an unexpected column in their report?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider headless streaming:</strong> Why is Power Query's headless memory streaming over 50x faster than legacy VBA macros that loop through workbooks with <code className="text-sky-300 font-mono">Workbooks.Open</code>?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Folder Data Ingestion & Multi-File ETL — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Filter early, guard against lock files (~$), and master dynamic schema expansion! Always parameterize Folder.Files(p_FolderPath), immediately filter out hidden/lock files and non-target extensions, extract filename dimensions ([Name]) for lineage, and use MissingField.Ignore with dynamic header lists to build invincible multi-branch consolidation pipelines!"
            }
          />
        </div>
      </div>
    </div>
  );
}
