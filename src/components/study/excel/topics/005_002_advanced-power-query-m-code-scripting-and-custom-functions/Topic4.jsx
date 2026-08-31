"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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
              ⚡ Parameterization · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Dynamic Parameters
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Parameterize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Parameterizing Power Query: Creating Dynamic File Paths &amp; Date Range Parameters
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Hardcoding static file paths (e.g. <code className="text-rose-400 font-mono">"C:\Users\John\Sales.csv"</code>) and fixed dates 
            is the leading cause of enterprise report failures when workbooks migrate across team members or SharePoint folders. 
            By designing <strong>Dynamic Power Query Parameters</strong> (<code className="text-teal-300 font-mono">p_FolderPath</code>, <code className="text-teal-300 font-mono">p_StartDate</code>), 
            you decouple configuration from business logic, enable <strong>Excel worksheet cell parameter binding</strong> (<code className="text-emerald-300 font-mono">Excel.CurrentWorkbook</code>), 
            and empower non-technical users to drive live data pipelines without touching M code!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Zero Hardcoding:</strong> Decouple directory paths and database server strings</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Excel Cell Binding:</strong> Drive parameters directly from normal spreadsheet tables</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Query Folding Preserved:</strong> Scalar parameters fold directly into SQL WHERE clauses</span>
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
              <span className="text-teal-400">⚡</span> Parameter Definition &amp; Dynamic M Injection
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Parameter Syntax
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. Parameterized File Extraction with Defensive Slashes</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'SafePath = (if Text.EndsWith(p_FolderPath, "\\") then p_FolderPath else p_FolderPath & "\\") & "Sales_2026.csv", Source = Csv.Document(File.Contents(SafePath))'}
            </div>
            <span className="text-slate-500">// 2. Dynamic Date Range Filtering Step</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.SelectRows(Source, each [Transaction_Date] >= p_StartDate and [Transaction_Date] <= p_EndDate)'}
            </div>
            <span className="text-slate-500">// 3. Reading Parameters Directly from an Excel Worksheet Table</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'p_Path = Excel.CurrentWorkbook(){[Name="tbl_Parameters"]}[Content]{[Parameter="FolderPath"]}[Value]'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter Name</th>
                  <th className="py-3 px-4">Data Type</th>
                  <th className="py-3 px-4">Suggested Values Mode</th>
                  <th className="py-3 px-4">Production Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">p_FolderPath</td>
                  <td className="py-3 px-4 text-teal-300">type text</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Any value (Directory path)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Controls root directory for dynamic multi-file ingestion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">p_StartDate / p_EndDate</td>
                  <td className="py-3 px-4 text-emerald-300">type date</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Any value / Calendar Date</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Filters financial ledger dates across all downstream fact tables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">p_TargetBranch</td>
                  <td className="py-3 px-4 text-sky-300">type text</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">List of values / Query</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Restricts reports to specific regional branch operations (e.g. Barrackpore).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">p_ServerEnvironment</td>
                  <td className="py-3 px-4 text-amber-300">type text</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">List: {'{"Dev", "Staging", "Prod"}'}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Switches backend SQL connection strings dynamically.</td>
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
              <span className="text-emerald-400">🔬</span> Excel Cell Parameter Tables &amp; Query Folding Compatibility
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Parameter Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Excel Worksheet Parameter Tables
              </h3>
              <p className="leading-relaxed">
                By creating a 2-column Excel table named <code className="text-teal-300 font-mono">tbl_Parameters</code> (<code className="text-teal-300 font-mono">[Parameter, Value]</code>), 
                business users can change report date ranges or paths directly inside ordinary worksheet cells! 
                Power Query reads the table via <code className="text-teal-300 font-mono">Excel.CurrentWorkbook()</code> on every refresh!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Excel Cells Drive Power Query Parameters Automatically
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Full SQL Query Folding Preservation
              </h3>
              <p className="leading-relaxed">
                Unlike complex custom functions, scalar parameters (<code className="text-emerald-300 font-mono">type text</code>, <code className="text-emerald-300 font-mono">type date</code>) 
                preserve 100% of <strong>SQL Query Folding</strong>! Power Query embeds the parameter value directly into the backend SQL <code className="text-emerald-300 font-mono">WHERE</code> clause, 
                executing lightning-fast server-side filtering!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                SQL Server Executes: WHERE [Amount] >= @p_Threshold
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Defensive Path Slash Concatenation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Users frequently omit trailing backslashes when entering folder paths (typing <code className="text-rose-400 font-mono">"E:\Data"</code> instead of <code className="text-emerald-400 font-mono">"E:\Data\"</code>). 
              Always guard concatenation with: <code className="text-teal-300 font-mono">if Text.EndsWith(p_Path, "\") then p_Path else p_Path &amp; "\"</code>!
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
              <span className="text-teal-400">📐</span> Visual Dynamic Parameter Architecture
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Parameter Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how centralized parameters drive file paths, database connections, and filtering steps across multiple queries:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Parameter Store (Left) */}
              <rect x="25" y="25" width="230" height="270" rx="12" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="25" y="25" width="230" height="34" rx="12" fill="#115E59" fillOpacity="0.4" />
              <text x="140" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">00_PARAMETERS STORE</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="210" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="16" fill="#5EEAD4" fontWeight="bold">p_FolderPath</text>
                <text x="8" y="28" fill="#94A3B8">"E:\CorporateData\2026\"</text>

                <rect y="38" width="210" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="54" fill="#5EEAD4" fontWeight="bold">p_StartDate</text>
                <text x="8" y="66" fill="#94A3B8">#date(2026, 4, 1)</text>

                <rect y="76" width="210" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="92" fill="#5EEAD4" fontWeight="bold">p_TargetBranch</text>
                <text x="8" y="104" fill="#94A3B8">"Barrackpore"</text>

                <rect y="114" width="210" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="130" fill="#5EEAD4" fontWeight="bold">p_MinCutoffINR</text>
                <text x="8" y="142" fill="#94A3B8">25000.00</text>
              </g>

              <rect x="35" y="235" width="210" height="45" rx="6" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
              <text x="140" y="252" fill="#34D399" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Excel Table or UI Prompts</text>
              <text x="140" y="268" fill="#A7F3D0" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">Single Point of Control</text>

              {/* Fan-Out Arrows */}
              <path d="M 265 95 L 320 75" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 265 140 L 320 160" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 265 185 L 320 245" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />

              {/* Consumer Queries (Center & Right) */}
              {/* Consumer 1: File Ingest */}
              <rect x="325" y="25" width="495" height="80" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <text x="340" y="47" fill="#5EEAD4" fontSize="10" fontWeight="bold" fontFamily="sans-serif">QUERY 1: Monthly Sales File Ingestion</text>
              <text x="340" y="68" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                = Csv.Document(File.Contents(<tspan fill="#5EEAD4" fontWeight="bold">p_FolderPath</tspan> &amp; "Monthly_BKP.csv"))
              </text>
              <text x="340" y="90" fill="#34D399" fontSize="8" fontFamily="sans-serif">✓ Migrates seamlessly across machines without breaking</text>

              {/* Consumer 2: SQL Server Filter */}
              <rect x="325" y="115" width="495" height="85" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <text x="340" y="137" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">QUERY 2: Enterprise SQL Server Ledger Extract</text>
              <text x="340" y="158" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                = Table.SelectRows(Source, each [Date] >= <tspan fill="#38BDF8" fontWeight="bold">p_StartDate</tspan> and [Branch] = <tspan fill="#38BDF8" fontWeight="bold">p_TargetBranch</tspan>)
              </text>
              <text x="340" y="180" fill="#38BDF8" fontSize="8" fontFamily="sans-serif">✓ 100% Query Folding preserved in remote SQL WHERE clause</text>

              {/* Consumer 3: Audit Filter */}
              <rect x="325" y="210" width="495" height="85" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <text x="340" y="232" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">QUERY 3: High-Value Financial Audit Report</text>
              <text x="340" y="253" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                = Table.SelectRows(FactTable, each [Amount] >= <tspan fill="#FBBF24" fontWeight="bold">p_MinCutoffINR</tspan>)
              </text>
              <text x="340" y="275" fill="#FBBF24" fontSize="8" fontFamily="sans-serif">✓ Non-technical managers adjust cutoff thresholds in 1 click</text>
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
                Explore the parameter configurations dataset below or download the practice workbook to test dynamic parameters in Microsoft Excel.
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
            sheetName="EX2105"
            title="Enterprise Parameter Configuration Store (Parameter Name, Data Type, Current Active Value, Validation / Allowed List, Pipeline Scope & Purpose)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Multi-Machine SharePoint Migration</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                p_FolderPath Root Directory Decoupling
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> parameterizes all file extraction steps with <code className="text-teal-300 font-mono">p_FolderPath</code>, allowing 20 distributed accounting team members to run reports without path-not-found crashes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                p_FolderPath → Zero File-Path Breakages on Shared Workbooks
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Excel Cell Parameter Driving</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Worksheet Cell Driven Date Thresholds
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> connects an Excel cell containing <code className="text-emerald-300 font-mono">=TODAY()-60</code> to Power Query via <code className="text-emerald-300 font-mono">Excel.CurrentWorkbook</code>, dynamically filtering the last 60 days of sales automatically.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Excel.CurrentWorkbook → Dynamic Worksheet Cell Filtering
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Database Environment Switcher</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                p_Environment Dev vs Production Switch
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> creates a dropdown parameter <code className="text-indigo-300 font-mono">p_Environment</code> ({'{"Dev_SQL", "Prod_SQL"}'}), switching ETL pipelines between test and production servers with a single dropdown selection.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                p_Environment → 1-Click Dev / Production Database Switching
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Power BI Template Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                .pbit Parameter Prompts for Branch Managers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> distributes a Power BI template (<code className="text-fuchsia-300 font-mono">.pbit</code>) where branch managers select their Branch Code from a parameter prompt upon opening, generating localized dashboards instantly.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                .pbit Parameter Prompt → Localized Self-Service Analytics
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
              <span className="text-teal-400">🪜</span> Step-by-Step Parameterization Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Create Parameter in Manage Parameters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to <strong>Home → Manage Parameters → New Parameter</strong>. Name it <code className="text-teal-300 font-mono">p_FolderPath</code>, set Type to <strong>Text</strong>, and enter default path.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Replace Hardcoded Path in Source Step</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In Advanced Editor, change <code className="text-indigo-300 font-mono">File.Contents("C:\Data\sales.csv")</code> to <code className="text-indigo-300 font-mono">File.Contents(p_FolderPath &amp; "sales.csv")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Add Safe Slash Concatenation Guard</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add <code className="text-cyan-300 font-mono">if Text.EndsWith(p_FolderPath, "\") then p_FolderPath else p_FolderPath &amp; "\"</code> to handle missing slashes.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Group Parameters in '00_Parameters' Folder</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Right-click Queries pane → <strong>New Group</strong> → Name <code className="text-emerald-300 font-mono">00_Parameters</code> and move all <code className="text-emerald-300 font-mono">p_*</code> queries into it!
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
              Parameter Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Could Not Find File Path</td>
                  <td className="py-3 px-4 text-slate-300">User omitted trailing backslash (evaluating to <code className="text-rose-400 font-mono">"E:\Datasales.csv"</code>).</td>
                  <td className="py-3 px-4 text-slate-400">Error popup: <em>"Could not find a part of the path"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">Text.EndsWith</code> check before concatenating.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Required Parameter Missing</td>
                  <td className="py-3 px-4 text-slate-300">Required parameter was left empty when refreshing workbook.</td>
                  <td className="py-3 px-4 text-slate-400">Refresh blocks with modal prompt requesting parameter entry.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply a valid default value in parameter settings.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Formula.Firewall on Excel Parameter</td>
                  <td className="py-3 px-4 text-slate-300">Read parameter from Excel table and merged with SQL database in same query step.</td>
                  <td className="py-3 px-4 text-slate-400">Formula.Firewall security privacy error blocks evaluation.</td>
                  <td className="py-3 px-4 text-emerald-400">Set Data Source Privacy Level to 'Organizational' on both sources.</td>
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
              Parameter Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">p_ Naming Prefix</span>
                <span>Visual Identification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always prefix parameter queries with <code className="text-emerald-300 font-mono">p_</code> to distinguish them from data tables.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Query Suggested Values</span>
                <span>Dynamic Dropdowns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Populate parameter dropdown lists from dynamic queries (<code className="text-sky-300 font-mono">List.Distinct</code>) for automatic updating.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Excel.CurrentWorkbook</span>
                <span>Worksheet Cell Binding</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect parameters to normal worksheet cells so managers can adjust filters without opening Power Query.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">SQL WHERE Folding</span>
                <span>100% Performance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scalar parameters fold seamlessly into backend database queries without forcing local RAM downloads.
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
                <strong>Reflect on zero-hardcoding architecture:</strong> Why does replacing hardcoded paths with <code className="text-teal-300 font-mono">p_FolderPath</code> save hundreds of engineering hours when deploying enterprise workbooks across multi-user environments?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine worksheet cell integration:</strong> How does reading parameters via <code className="text-emerald-400 font-mono">Excel.CurrentWorkbook</code> empower non-technical executives to adjust multi-year date filters dynamically?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider Query Folding preservation:</strong> Why do scalar parameters maintain 100% Query Folding with SQL Server while complex custom M functions break folding?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Power Query Parameters & Dynamic Pipelines — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Zero hardcoding in production! Never hardcode absolute file paths, server names, or date thresholds in M scripts. Prefix all parameter queries with p_, organize them in a 00_Parameters folder, use suggested lists/queries for validation, and connect parameters to Excel parameter tables so non-technical stakeholders can control reports without touching a single line of M code!"
            }
          />
        </div>
      </div>
    </div>
  );
}
