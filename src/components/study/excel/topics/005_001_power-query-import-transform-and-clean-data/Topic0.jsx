"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
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
              ⚡ Power Query Engine · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Segment 5: Power BI Stack (Ultra Expert)
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2: Understand & Architect
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Introduction to Power Query & Modern Automated ETL Architecture
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            For decades, corporate spreadsheet workflows suffered from fragile manual copy-pasting, brittle formula chains, 
            and slow VBA macro scripts. <strong>Power Query</strong> introduces the enterprise <strong>ETL 
            (Extract, Transform, Load)</strong> architecture natively into Microsoft Excel and Power BI. 
            By connecting directly to heterogeneous sources (CSV, Folders, SQL, Web APIs), recording repeatable 
            transformation recipes in the <strong>M Language</strong>, and loading directly into the 
            <strong>Power Pivot Data Model</strong>, Power Query automates multi-hour reporting tasks into a single-click 
            (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Ctrl+Alt+F5</kbd>) refresh!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Extract (Connect):</strong> Ingest CSV, Folders, SQL &amp; APIs</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Transform (M Recipe):</strong> Repeatable non-destructive Applied Steps</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Load (Data Model):</strong> Bypass 1M row limits via VertiPaq</span>
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
              <span className="text-teal-400">⚡</span> The 3 Pillars of Power Query ETL Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              ETL Pipeline Structure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. Extract */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">1. EXTRACT (Ingestion)</span>
              <div className="text-white font-bold text-xs">
                Source = Csv.Document(File.Contents("Data.csv"))
              </div>
              <p className="font-sans text-xs text-slate-400">
                Connects to raw storage, databases, folders, or web services read-only.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-teal-300 text-xs">
                Zero data mutation at source
              </div>
            </div>

            {/* 2. Transform */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. TRANSFORM (Recipe)</span>
              <div className="text-white font-bold text-xs">
                = Table.PromoteHeaders(Source)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Sequential Applied Steps: trim, filter, unpivot, type coercion, and joins.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-sky-300 text-xs">
                Replayed automatically on refresh
              </div>
            </div>

            {/* 3. Load */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">3. LOAD (Output Model)</span>
              <div className="text-white font-bold text-xs">
                Close &amp; Load To...
              </div>
              <p className="font-sans text-xs text-slate-400">
                Table on sheet, Connection Only in RAM, or Data Model (VertiPaq).
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 text-xs">
                Scales to 100M+ rows in memory
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Feature Dimension</th>
                  <th className="py-3 px-4">Legacy Spreadsheet Approach</th>
                  <th className="py-3 px-4">Power Query Automated ETL</th>
                  <th className="py-3 px-4">Enterprise Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Data Ingestion</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Manual copy-pasting, CSV opening</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Automated connectors (Folder, SQL, Web)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">100% hands-free ingestion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Auditability</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Hidden manual steps, fragile VBA</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Visual Applied Steps recipe list</td>
                  <td className="py-3 px-4 font-sans text-slate-300">100% forensic audit compliance.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Row Capacity</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">1,048,576 rows max grid limit</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">100M+ rows via Power Pivot Data Model</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Bypasses worksheet cell barrier.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Refresh Efficiency</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Hours of recurring manual labor</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Single click / scheduled background sync</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Instant monthly close cycle.</td>
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
              <span className="text-emerald-400">🔬</span> Non-Destructive Ingestion, The M Engine &amp; Query Folding
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              ETL Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Non-Destructive Ingestion Architecture
              </h3>
              <p className="leading-relaxed">
                Power Query never alters or writes back to your raw ERP exports, CSVs, or database records. 
                It creates a live in-memory snapshot stream, allowing you to experiment with aggressive transforms 
                (filtering, unpivoting, splitting) with zero risk to source data integrity.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Source Files = 100% Read-Only &amp; Immutable
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Query Folding (Server-Side Execution)
              </h3>
              <p className="leading-relaxed">
                When connecting to enterprise SQL databases, the Power Query M Engine translates your visual Applied Steps 
                into native server-side <code className="text-sky-300 font-mono">SQL SELECT / WHERE / GROUP BY</code> statements, 
                letting high-performance database servers do the heavy lifting before data reaches your computer!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Visual Filter → Native SQL: WHERE Region = 'Barrackpore'
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Universal Code Portability: Excel &harr; Power BI
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because Excel 365 and Microsoft Power BI Desktop share the exact same underlying Power Query M Engine, 
              any ETL query authored in Excel can be copied and pasted directly into Power BI Desktop (and vice versa) 
              with 100% semantic fidelity!
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
              <span className="text-teal-400">📐</span> Visual Power Query Automated ETL Data Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              End-to-End ETL Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe the end-to-end data flow from heterogeneous raw sources through the Power Query M Engine into final destination models:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Extract (Left Box) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. EXTRACT (DATA SOURCES)</text>

              <g transform="translate(35, 70)" fontSize="8.5" fontFamily="sans-serif" fill="#E2E8F0">
                <rect width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="20" fill="#38BDF8">📁 Monthly Sales Folder (*.csv)</text>

                <rect y="40" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="60" fill="#A7F3D0">🗄️ SQL Server Database</text>

                <rect y="80" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="100" fill="#FDE047">🌐 Web REST API JSON Feed</text>

                <rect y="120" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="140" fill="#F472B6">📊 Legacy Excel Workbooks</text>
              </g>

              <rect x="35" y="235" width="200" height="45" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="255" fill="#5EEAD4" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Heterogeneous Ingestion</text>
              <text x="135" y="270" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero Source Data Mutation</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Transform (Center Box) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. TRANSFORM (M ENGINE)</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="28" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="18" fill="#5EEAD4" fontWeight="bold">1. Promote Headers</text>

                <rect y="32" width="220" height="28" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="50" fill="#BAE6FD" fontWeight="bold">2. Coerce Column Data Types</text>

                <rect y="64" width="220" height="28" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="82" fill="#A7F3D0" fontWeight="bold">3. Unpivot 12-Month Matrix</text>

                <rect y="96" width="220" height="28" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="114" fill="#FEF08A" fontWeight="bold">4. Merge Customer Master Table</text>

                <rect y="128" width="220" height="28" rx="4" fill="#7E22CE" fillOpacity="0.3" stroke="#A855F7" />
                <text x="10" y="146" fill="#F3E8FF" fontWeight="bold">5. Filter &amp; Dedup Rows at Scale</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Visual Repeatable Recipe</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Load (Right Box) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. LOAD DESTINATIONS</text>

              <g transform="translate(640, 70)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#34D399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">EXCEL TABLE</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Formatted Sheet Table</text>

                <rect y="48" width="175" height="42" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="10" y="18" fill="#E0E7FF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">DATA MODEL</text>
                <text x="10" y="34" fill="#C7D2FE" fontSize="8" fontFamily="sans-serif">Power Pivot (VertiPaq)</text>

                <rect y="96" width="175" height="42" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="18" fill="#F3E8FF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">POWER BI DESKTOP</text>
                <text x="10" y="34" fill="#E9D5FF" fontSize="8" fontFamily="sans-serif">100% M Code Portability</text>
              </g>

              <rect x="640" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Ctrl + Alt + F5</text>
              <text x="727" y="271" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Single-Click Refresh Pipeline</text>
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
                Explore the master Power Query ETL dataset below or download the practice workbook to test automated data ingestion pipelines in Microsoft Excel.
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
            sheetName="EX2001"
            title="Power Query Master ETL Pipeline Dataset (Stage, Process, Source Format, Transformation, Destination, Refresh Frequency)"
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
                Single-Click Monthly Sales Aggregation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Chief Financial Analyst <strong>Swadeep Banerjee</strong> consolidates 50 regional CSV sales files 
                using the <code className="text-teal-300 font-mono">From Folder</code> connector, turning 15 hours of manual copy-pasting into a 3-second refresh!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Connector: Get Data → From File → From Folder (Auto-Stacks CSVs)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · ERP Data Model Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Bypassing the 1-Million Row Sheet Barrier
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> streams 8.5 million ledger lines into the 
                <code className="text-amber-300 font-mono">Power Pivot Data Model</code> (Connection Only), building interactive DAX pivot tables without grid limits.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Mode: Only Create Connection + Add to Data Model (8.5M Rows)
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Matrix Budget Normalization</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated 12-Month Unpivoting Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> unpivots wide 12-month departmental budget spreadsheets 
                into normalized 3-column relational tables (<code className="text-indigo-300 font-mono">Dept, Month, Amount</code>) with 1 click.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Transformation: Unpivot Other Columns (Relational 3NF Normalization)
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Web API Sync</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Live GST Portal &amp; FX Rate Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Debangshu Ghosh</strong> ingests live central bank currency exchange rates 
                using the <code className="text-amber-300 font-mono">From Web</code> connector, converting daily FX rates into live inventory cost models.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Connector: Get Data → From Web → Live Daily FX Sync
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
              <span className="text-teal-400">🪜</span> Step-by-Step Power Query Initiation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Open Get Data Connector</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Navigate to the Excel Ribbon → <strong>Data Tab</strong> → <strong>Get Data</strong> → Select your data source (e.g. <code className="text-teal-300 font-mono">From Text/CSV</code> or <code className="text-teal-300 font-mono">From Folder</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Launch Power Query Editor</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the preview dialog, do not click 'Load' directly. Click <strong>Transform Data</strong> to launch the Power Query Editor window (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt + F12</kbd>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Apply Visual Transformations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Promote headers, trim text, change data types, and filter out nulls. Watch each recorded action appear chronologically in the <strong>Applied Steps</strong> pane.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Close &amp; Load to Excel Table or Data Model</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Close &amp; Load To...</strong> on the Home tab. Choose <code className="text-emerald-300 font-mono">Table</code> or <code className="text-emerald-300 font-mono">Only Create Connection + Data Model</code>. The clean table loads instantly!
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
                  <th className="py-3 px-4">Error Message</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Data source not found</td>
                  <td className="py-3 px-4 text-slate-300">File moved, renamed, or network drive disconnected.</td>
                  <td className="py-3 px-4 text-slate-400">Check file path in Source step.</td>
                  <td className="py-3 px-4 text-emerald-400">Go to Data → Data Source Settings → Change Source Path or use dynamic parameter.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">The column 'X' of the table wasn't found</td>
                  <td className="py-3 px-4 text-slate-300">A downstream step references a column renamed or deleted in an earlier step.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect Applied Steps chronologically to find where column was modified.</td>
                  <td className="py-3 px-4 text-emerald-400">Update column names in the formula bar of the broken step.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Formula.Firewall: Query references other queries</td>
                  <td className="py-3 px-4 text-slate-300">Privacy level mismatch between local file and external database.</td>
                  <td className="py-3 px-4 text-slate-400">Two queries with different privacy levels merged together.</td>
                  <td className="py-3 px-4 text-emerald-400">Set Data Privacy to 'Organizational' across all sources or ignore privacy levels for trusted files.</td>
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
              Power Query Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt + F12</kbd>
                <span>Launch Power Query</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opens the Power Query Editor instantly from anywhere in Excel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Ctrl + Alt + F5</kbd>
                <span>Refresh All Queries</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replays all ETL pipelines across all queries in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">F2 on Step</span>
                <span>Rename Applied Step</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select any step in the Applied Steps pane and press <strong>F2</strong> to rename it for audit clarity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Connection Only</span>
                <span>RAM Optimization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always set intermediate staging queries to <strong>Connection Only</strong> to prevent grid memory bloat.
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
                <strong>Reflect on non-destructive ETL:</strong> Why does Power Query's read-only caching architecture provide superior forensic audit security compared to modifying files directly in Excel grid cells?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine query folding:</strong> How does offloading filters and aggregations to the backend database server via native SQL query folding optimize network bandwidth and local PC memory?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider big data scale:</strong> How does routing queries to the Power Pivot VertiPaq Data Model allow financial analysts to analyze 50 million transaction rows within an ordinary Excel file?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Introduction to Power Query ETL — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Welcome to Power Query—the single greatest productivity transformation in Microsoft Excel history! Never clean data with manual copy-pasting or fragile VBA loops again. Master the M Engine, record repeatable Applied Steps, and build automated enterprise pipelines where an entire month's reporting refreshes in 3 seconds with a single click!"
            }
          />
        </div>
      </div>
    </div>
  );
}
