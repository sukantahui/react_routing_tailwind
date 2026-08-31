"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
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
              ⚡ Data Connector Ecosystem · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Power Query Ingestion Layer
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Ingest
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Connecting to Data Sources: Excel, CSV, Folders, Web APIs &amp; SQL Databases
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern corporate environments, enterprise data is scattered across incompatible silos: 
            monthly sales CSV folders, SQL Server transaction ledgers, cloud REST API endpoints, SharePoint lists, 
            and legacy workbooks. 
            Power Query's robust <strong>Connector Ecosystem</strong> establishes authenticated, read-only 
            streaming pipelines to any source, enabling <strong>parameterized paths</strong> and 
            <strong>automatic multi-file folder stacking</strong> in pure formula memory!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Folder Ingestion:</strong> Auto-stacks monthly CSV batches</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>SQL Databases:</strong> High-speed native Query Folding</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>REST APIs &amp; Web:</strong> Live JSON payload unrolling</span>
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
              <span className="text-teal-400">⚡</span> Power Query M Connector Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Ingestion Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. CSV File Ingestion</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              = Csv.Document(File.Contents("C:\Enterprise\Sales.csv"), [Delimiter=",", Encoding=65001])
            </div>
            <span className="text-slate-500">// 2. Recursive Folder Batch Ingestion</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              = Folder.Files("C:\Enterprise\Monthly_Reports\")
            </div>
            <span className="text-slate-500">// 3. SQL Server Database Connection</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              = Sql.Database("sql-prod.corp.in:1433", "DB_Sales")
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Connector Type</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Authentication / Options</th>
                  <th className="py-3 px-4">Enterprise Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">From Folder</td>
                  <td className="py-3 px-4 text-teal-300">Folder.Files(path)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Local / Network Share</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Auto-stacking 12 monthly regional sales CSVs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">From SQL Database</td>
                  <td className="py-3 px-4 text-sky-300">Sql.Database(server, db)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Windows / Database Auth</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Streaming millions of ERP ledger records.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">From Web API</td>
                  <td className="py-3 px-4 text-emerald-300">Json.Document(Web.Contents(url))</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">OAuth2 Bearer Token / API Key</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Live GST portal and central bank FX rate sync.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">From Current Table</td>
                  <td className="py-3 px-4 text-indigo-300">Excel.CurrentWorkbook(){`{[Name="tbl"]}`}[Content]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Active Worksheet Memory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Ingesting existing customer tables into ETL cache.</td>
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
              <span className="text-emerald-400">🔬</span> Dynamic Path Parameterization &amp; Privacy Levels
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Connector Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Dynamic Path Parameterization
              </h3>
              <p className="leading-relaxed">
                Avoid hardcoding fixed file paths like <code className="text-rose-400 font-mono">C:\Users\Swadeep\...</code>. 
                Create a Power Query parameter <code className="text-emerald-300 font-mono">pFolderPath</code> in Manage Parameters, 
                allowing any colleague or automated server job to change root folders without editing M code!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                = Folder.Files(pFolderPath &amp; "\Monthly_Sales")
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Data Privacy Firewall (Public vs Private)
              </h3>
              <p className="leading-relaxed">
                When combining an external database with a local spreadsheet, Power Query enforces Data Privacy Levels. 
                Setting sources to <strong>Organizational</strong> ensures queries execute smoothly while protecting corporate data from untrusted transmission.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Data Source Settings → Edit Permissions → Organizational
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Filtering Out Temporary Locked Files (~$ Backup Files)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When ingesting an entire folder of Excel files, shared network users may leave workbooks open, creating temporary lock files starting with <code className="text-rose-400 font-mono">~$</code>. 
              Always add a text filter step: <code className="text-emerald-300 font-mono">Table.SelectRows(Source, each not Text.StartsWith([Name], "~$"))</code> to prevent query refresh crashes!
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
              <span className="text-teal-400">📐</span> Visual Heterogeneous Connector Streaming Architecture
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Ingestion Architecture
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how Power Query establishes authenticated streaming connections across diverse enterprise sources:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Data Sources (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW ENTERPRISE SOURCES</text>

              <g transform="translate(35, 70)" fontSize="8.5" fontFamily="sans-serif" fill="#E2E8F0">
                <rect width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="20" fill="#38BDF8">📁 Monthly Sales Folder (*.csv)</text>

                <rect y="40" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="60" fill="#A7F3D0">🗄️ SQL Server Port 1433</text>

                <rect y="80" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="100" fill="#FDE047">🌐 REST API JSON Endpoint</text>

                <rect y="120" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="140" fill="#F472B6">📊 SharePoint Online List</text>
              </g>

              <rect x="35" y="235" width="200" height="45" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="255" fill="#5EEAD4" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Heterogeneous Ingestion</text>
              <text x="135" y="270" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Read-Only Streaming Buffer</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Connector Authentication Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AUTHENTICATED CONNECTOR LAYER</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Folder.Files("C:\Sales\")</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Sql.Database("sql.corp.in")</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Json.Document(Web.Contents)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Privacy Level Firewall Check</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Encrypted Credential Cache</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Staging Model (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">POWER QUERY IN-MEMORY CACHE</text>

              <g transform="translate(640, 70)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#34D399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">STAGING PIPELINE</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Ready for Applied Steps</text>

                <rect y="50" width="175" height="60" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="10" y="20" fill="#E0E7FF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">QUERY FOLDING</text>
                <text x="10" y="36" fill="#FDE047" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">SQL Offloading Active</text>
                <text x="10" y="50" fill="#94A3B8" fontSize="7.5" fontFamily="sans-serif">Direct Server Execution</text>
              </g>

              <rect x="640" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Live Handshake</text>
              <text x="727" y="271" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Single-Click Refresh Ready</text>
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
                Explore the data connectors configuration dataset below or download the practice workbook to test Power Query data ingestion in Microsoft Excel.
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
            sheetName="EX2002"
            title="Power Query Connector Registry (Source ID, Connector Type, Location Path, Authentication, Refresh Type, Volume)"
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
                Automated Folder Batch Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> stacks 50 regional POS CSV files: 
                <code className="text-teal-300 font-mono">=Folder.Files("C:\Sales_Monthly\")</code>. 
                Whenever regional store managers drop their monthly CSV into the folder, clicking Refresh All consolidates everything automatically!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Auto-Stacks 50 Regional Files in 2 Seconds
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · ERP SQL Server Connection</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Query-Folded SQL Server Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> connects directly to the production SQL Server: 
                <code className="text-amber-300 font-mono">=Sql.Database("sql-prod.corp.in:1433", "DB_Sales")</code>, 
                offloading complex date filtering to the database server with zero memory strain on Excel.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Direct SQL Handshake → Native Query Folding
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Live GST Web API Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Authenticated REST API Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Lead <strong>Abhronila Sengupta</strong> queries government tax endpoints: 
                <code className="text-indigo-300 font-mono">=Json.Document(Web.Contents(url, [Headers=[Authorization="Bearer ..."]]))</code>, 
                validating 5,000 vendor GSTIN statuses dynamically against live tax databases.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Live REST API Ingestion with OAuth2 Security
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Team Parameterized Workbooks</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Cross-Laptop Path Parameterization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> creates a parameterized base path <code className="text-amber-300 font-mono">pFolderPath</code>, 
                allowing distributed team members across laptops to run the exact same query workbook without file path errors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                100% Team Compatibility via Dynamic Path Parameters
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
              <span className="text-teal-400">🪜</span> Step-by-Step Folder Connector Setup Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Select From Folder Connector</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to <strong>Data Tab</strong> → <strong>Get Data</strong> → <strong>From File</strong> → <strong>From Folder</strong> → Browse to target directory.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Filter File Extension and Lock Files</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In Power Query Editor, filter the <code className="text-teal-300 font-mono">Extension</code> column to <code className="text-emerald-400 font-mono">.csv</code> and exclude names starting with <code className="text-rose-400 font-mono">~$</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Click Combine Files Button</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the double-down arrow on the <code className="text-amber-300 font-mono">Content</code> column. Power Query creates sample helper queries and stacks all files automatically.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Close &amp; Load to Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Close &amp; Load</strong>. All monthly files are unified into a single master relational dataset!
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
              Connector Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">File In Use / Permission Denied</td>
                  <td className="py-3 px-4 text-slate-300">Folder connector attempted to ingest a temporary <code className="text-rose-300 font-mono">~$</code> lock file created by an open Excel instance.</td>
                  <td className="py-3 px-4 text-slate-400">Check file listing step for files starting with '~$'.</td>
                  <td className="py-3 px-4 text-emerald-400">Add filter: <code className="text-emerald-400 font-mono">not Text.StartsWith([Name], "~$")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">SQL Server Connection Timeout</td>
                  <td className="py-3 px-4 text-slate-300">Port 1433 blocked by firewall or incorrect server instance name.</td>
                  <td className="py-3 px-4 text-slate-400">Ping database server or test with Telnet port 1433.</td>
                  <td className="py-3 px-4 text-emerald-400">Verify server IP, port 1433 rules, and SQL database permissions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Formula.Firewall Block</td>
                  <td className="py-3 px-4 text-slate-300">Combining Public and Private sources in one query.</td>
                  <td className="py-3 px-4 text-slate-400">Review Data Source Settings → Privacy Levels.</td>
                  <td className="py-3 px-4 text-emerald-400">Set all corporate sources to 'Organizational' level.</td>
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
              Connector Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">From Folder</span>
                <span>Auto-Stacking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stack all CSV files in a directory automatically with 1 click.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Manage Parameters</span>
                <span>Dynamic File Paths</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create parameter queries so team members can change root paths easily.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Data Source Settings</span>
                <span>Credential Manager</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Update passwords, connection paths, and privacy levels in one place.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt + F12</kbd>
                <span>Launch Power Query</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open the Power Query Editor immediately to inspect connector steps.
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
                <strong>Reflect on multi-file folder stacking:</strong> Why is ingesting 50 regional CSV files via <code className="text-teal-300 font-mono">Folder.Files</code> infinitely more scalable than writing legacy VBA loop macros?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine dynamic path parameters:</strong> How does parameterizing file paths prevent workbook breakage when sharing financial models across team members with different user directory paths?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider data privacy governance:</strong> Why does Power Query enforce privacy level firewalls to protect sensitive corporate databases when merging with public web endpoints?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Power Query Data Connectors — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering data connectors is the first milestone of modern enterprise ETL architecture. Never hardcode personal file paths—always use dynamic parameters. Filter out temporary ~$ lock files when connecting to folders, leverage native Query Folding on SQL databases, and build unified multi-source pipelines that refresh in seconds with 100% autonomy!"
            }
          />
        </div>
      </div>
    </div>
  );
}
