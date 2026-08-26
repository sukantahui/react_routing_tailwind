"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/power_query_master.xlsx?url";
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
              ⚡ Power Query Studio · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Editor Navigation &amp; Applied Steps
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Navigate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            The Power Query Editor Interface: Queries Pane, Applied Steps &amp; Formula Bar
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The <strong>Power Query Editor</strong> is a full-featured, dedicated ETL studio designed to eliminate 
            spreadsheet errors through visual, non-destructive data preparation. 
            By mastering its <strong>5 Core UI Zones</strong>—the Ribbon, Queries Pane, Data Preview Grid with Type Badges, 
            the M Formula Bar, and the chronological <strong>Applied Steps Recipe Pane</strong>—analysts can time-travel 
            through historical data transformation states, build modular reference queries, and maintain pristine audit trails!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Applied Steps Pane:</strong> Chronological visual transformation recipe</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Formula Bar:</strong> Live M code inspection &amp; customization</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Queries Pane:</strong> Modular query grouping &amp; Reference pipelines</span>
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
              <span className="text-teal-400">⚡</span> The 5 Core UI Zones of the Power Query Studio
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Studio Layout Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. Queries Pane & Grid */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">1. Left Sidebar: Queries Pane</span>
              <p className="font-sans text-xs text-slate-400">
                Lists all queries, staging tables, and parameters. Create folders and use <strong>Reference</strong> to branch staging tables.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-teal-300 text-xs">
                Right-Click &rarr; New Group / Reference
              </div>
            </div>

            {/* 2. Applied Steps & Formula Bar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. Right Sidebar: Applied Steps</span>
              <p className="font-sans text-xs text-slate-400">
                Sequential list of recorded transformation actions. Click any prior step to time-travel the data preview.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-sky-300 text-xs">
                Select Step &rarr; Press F2 to Rename
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Interface Zone</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Core Functionality</th>
                  <th className="py-3 px-4">Keyboard / Menu Shortcut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Ribbon Tabs</td>
                  <td className="py-3 px-4 text-slate-300">Top Header</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Home, Transform (in-place), Add Column (new), View.</td>
                  <td className="py-3 px-4 text-emerald-400">Alt key navigation</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Formula Bar</td>
                  <td className="py-3 px-4 text-slate-300">Below Ribbon</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Inspects and edits active step M expressions.</td>
                  <td className="py-3 px-4 text-emerald-400">View Tab &rarr; Check [X] Formula Bar</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Data Preview Grid</td>
                  <td className="py-3 px-4 text-slate-300">Center Canvas</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Live 1,000-row cache, column type icons, quality bars.</td>
                  <td className="py-3 px-4 text-emerald-400">Right-Click Column Headers</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Advanced Editor</td>
                  <td className="py-3 px-4 text-slate-300">Modal Window</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Complete raw M script (<code className="text-emerald-400 font-mono">let ... in ...</code>).</td>
                  <td className="py-3 px-4 text-emerald-400">Home Tab &rarr; Advanced Editor</td>
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
              <span className="text-emerald-400">🔬</span> Time-Travel Debugging, Duplicate vs Reference &amp; M Structure
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Studio Engineering Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Time-Travel Visual Debugging
              </h3>
              <p className="leading-relaxed">
                By selecting any previous step in the Applied Steps pane, the preview grid immediately time-travels 
                to show the dataset's exact historical state. Click the gear icon next to a step to adjust its parameters 
                without re-doing your work!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Click Step &rarr; Instant Snapshot Inspection
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Duplicate vs Reference Queries
              </h3>
              <p className="leading-relaxed">
                <strong>Duplicate</strong> creates an independent clone, re-running heavy database queries twice. 
                <strong>Reference</strong> points directly to the parent query's cached output, establishing high-speed 
                modular staging pipelines in pure RAM!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Reference = Modular Staging | Duplicate = Independent Clone
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> In-Place Transform vs Add Column
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When applying text casing or date calculations:
              <br />
              • <strong>Transform Tab:</strong> Overwrites the original column in-place (saves memory).
              <br />
              • <strong>Add Column Tab:</strong> Keeps the original raw column and creates a new calculated output column.
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
              <span className="text-teal-400">📐</span> Visual Power Query Studio Interface Layout
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Studio Layout Blueprint
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine the anatomical layout of the Power Query Editor window and its 5 interactive control zones:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Studio Window Frame */}
              <rect x="25" y="20" width="800" height="290" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2" />

              {/* 1. Ribbon Header (Top) */}
              <rect x="25" y="20" width="800" height="35" rx="10" fill="#1E293B" />
              <text x="45" y="42" fill="#5EEAD4" fontSize="10" fontWeight="bold" fontFamily="sans-serif">POWER QUERY EDITOR</text>
              <g transform="translate(200, 30)" fontSize="9" fontFamily="sans-serif" fill="#94A3B8">
                <text x="0" y="12" fill="#F8FAFC" fontWeight="bold">Home</text>
                <text x="55" y="12">Transform</text>
                <text x="130" y="12">Add Column</text>
                <text x="215" y="12">View</text>
              </g>

              {/* 2. Formula Bar */}
              <rect x="25" y="55" width="800" height="25" fill="#0B132B" stroke="#1E293B" />
              <text x="40" y="71" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">fx</text>
              <text x="65" y="71" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace">= Table.PromoteHeaders(Source, [PromoteAllScalars=true])</text>

              {/* 3. Left Queries Pane */}
              <rect x="25" y="80" width="160" height="230" fill="#0F172A" stroke="#1E293B" />
              <rect x="25" y="80" width="160" height="24" fill="#134E4A" fillOpacity="0.4" />
              <text x="35" y="96" fill="#5EEAD4" fontSize="9" fontWeight="bold" fontFamily="sans-serif">QUERIES (3)</text>
              <g transform="translate(35, 115)" fontSize="8.5" fontFamily="sans-serif" fill="#CBD5E1">
                <text x="0" y="15" fill="#38BDF8">📁 Staging</text>
                <text x="12" y="32">↳ Fact_Sales</text>
                <text x="0" y="55" fill="#34D399">📁 Dimensions</text>
                <text x="12" y="72">↳ Dim_Customer</text>
                <text x="0" y="95" fill="#FDE047">⚙️ pFolderPath</text>
              </g>

              {/* 4. Center Data Preview Grid */}
              <rect x="185" y="80" width="455" height="230" fill="#020617" stroke="#1E293B" />
              {/* Column Headers with Badges & Quality Bar */}
              <g transform="translate(195, 90)">
                {/* Col 1 */}
                <rect width="135" height="35" rx="4" fill="#1E293B" stroke="#334155" />
                <rect width="135" height="4" rx="2" fill="#10B981" />
                <text x="8" y="24" fill="#38BDF8" fontSize="8" fontFamily="monospace">ABC</text>
                <text x="32" y="24" fill="#F8FAFC" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Customer_Name</text>

                {/* Col 2 */}
                <rect x="145" width="135" height="35" rx="4" fill="#1E293B" stroke="#334155" />
                <rect x="145" width="135" height="4" rx="2" fill="#10B981" />
                <text x="153" y="24" fill="#FDE047" fontSize="8" fontFamily="monospace">1.2</text>
                <text x="175" y="24" fill="#F8FAFC" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Amount_INR</text>

                {/* Col 3 */}
                <rect x="290" width="135" height="35" rx="4" fill="#1E293B" stroke="#334155" />
                <rect x="290" width="135" height="4" rx="2" fill="#10B981" />
                <text x="298" y="24" fill="#A7F3D0" fontSize="8" fontFamily="monospace">📅</text>
                <text x="318" y="24" fill="#F8FAFC" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Invoice_Date</text>
              </g>

              {/* Grid Rows */}
              <g transform="translate(195, 135)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <text x="8" y="15">Swadeep Banerjee</text>
                <text x="153" y="15">45000.00</text>
                <text x="298" y="15">2026-08-26</text>

                <text x="8" y="38">Tuhina Mukherjee</text>
                <text x="153" y="38">12500.50</text>
                <text x="298" y="38">2026-08-27</text>

                <text x="8" y="61">Abhronila Sengupta</text>
                <text x="153" y="61">98000.00</text>
                <text x="298" y="61">2026-08-28</text>
              </g>

              {/* Status Bar */}
              <rect x="185" y="285" width="455" height="25" fill="#0F172A" />
              <text x="195" y="301" fill="#94A3B8" fontSize="7.5" fontFamily="sans-serif">3 columns, 1000+ rows · Profiling based on top 1000 rows</text>

              {/* 5. Right Query Settings Pane */}
              <rect x="640" y="80" width="185" height="230" fill="#0F172A" stroke="#1E293B" />
              <rect x="640" y="80" width="185" height="24" fill="#134E4A" fillOpacity="0.4" />
              <text x="650" y="96" fill="#5EEAD4" fontSize="9" fontWeight="bold" fontFamily="sans-serif">APPLIED STEPS</text>
              <g transform="translate(650, 115)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="165" height="22" rx="3" fill="#1E293B" stroke="#334155" />
                <text x="8" y="15" fill="#CBD5E1">Source</text>

                <rect y="26" width="165" height="22" rx="3" fill="#1E293B" stroke="#334155" />
                <text x="8" y="41" fill="#CBD5E1">Promoted Headers</text>

                <rect y="52" width="165" height="22" rx="3" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="67" fill="#5EEAD4" fontWeight="bold">Coerce Amount (F2)</text>

                <rect y="78" width="165" height="22" rx="3" fill="#1E293B" stroke="#334155" />
                <text x="8" y="93" fill="#CBD5E1">Filtered Rows</text>
              </g>
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
                Explore the Applied Steps transformation recipe dataset below or download the practice workbook to test the Power Query Studio in Microsoft Excel.
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
            sheetName="Topic2_Editor_Interface"
            title="Applied Steps Recipe Matrix (Step Index, Step Name, M Code Expression, Purpose Description, Status)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Audit Trail Compliance</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Applied Steps Documentation for Statutory Audit
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Swadeep Banerjee</strong> renames every transformation step with descriptive business names 
                (<code className="text-teal-300 font-mono">#&quot;Filter FY26 Compliant Records&quot;</code>), allowing statutory tax auditors to inspect and verify every data cleaning step in seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                F2 Step Renaming &rarr; 100% Tax Audit Transparency
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · High-Speed Staging Pipelines</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Modular Reference Query Branching
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Tuhina Mukherjee</strong> ingests a heavy 5M-row database once into a staging query, 
                then creates two lightweight <strong>Reference</strong> queries (<code className="text-amber-300 font-mono">Fact_Sales_Domestic</code> and <code className="text-amber-300 font-mono">Fact_Sales_Export</code>) without re-querying SQL servers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Reference Queries &rarr; Zero Duplicate SQL Server Hits
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Schema Resilience</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Remove Other Columns Defense
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> selects only the 4 required fields and executes 
                <code className="text-indigo-300 font-mono">Table.SelectColumns</code>, shielding the pipeline from crashing when upstream ERP upgrades introduce 10 unexpected metadata columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Schema Shield: Table.SelectColumns locks required fields
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Advanced M Scripting</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Advanced Editor Custom Formula Injection
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Debangshu Ghosh</strong> opens the <strong>Advanced Editor</strong> (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt+H+V</kbd>), 
                injecting custom error handling (<code className="text-amber-300 font-mono">try ... otherwise ...</code>) directly into the M script.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Advanced Editor: Custom M code authored in let...in block
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
              <span className="text-teal-400">🪜</span> Step-by-Step Studio Optimization Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Open Power Query Editor &amp; Enable Formula Bar</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt + F12</kbd>. Go to the <strong>View Tab</strong> and ensure <strong>Formula Bar</strong> is checked.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Rename Applied Steps for Documentation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select each step in the Applied Steps pane, press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">F2</kbd>, and give it a clear business name.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Lock Schema via 'Remove Other Columns'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select only the columns needed for reporting, right-click, and choose <strong>Remove Other Columns</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Close &amp; Load Clean Data</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Close &amp; Load</strong> to push the sanitized relational table into your Excel worksheet model.
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
              Studio Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Step Deletion Breakage</td>
                  <td className="py-3 px-4 text-slate-300">Deleting an intermediate step that created a column used by downstream steps.</td>
                  <td className="py-3 px-4 text-slate-400">Downstream step shows red error icon: 'Column not found'.</td>
                  <td className="py-3 px-4 text-emerald-400">Edit formula bar of broken step or restore intermediate column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Accidental In-Place Overwrite</td>
                  <td className="py-3 px-4 text-slate-300">Used 'Transform' tab instead of 'Add Column' tab, overwriting raw data column.</td>
                  <td className="py-3 px-4 text-slate-400">Original raw text or dates disappeared from grid.</td>
                  <td className="py-3 px-4 text-emerald-400">Delete the Applied Step and re-apply from the 'Add Column' tab.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Duplicate Query RAM Bloat</td>
                  <td className="py-3 px-4 text-slate-300">Duplicated heavy 5M-row query 5 times instead of using 'Reference'.</td>
                  <td className="py-3 px-4 text-slate-400">Workbook takes minutes to refresh and consumes gigabytes of RAM.</td>
                  <td className="py-3 px-4 text-emerald-400">Re-architect queries to Reference the base staging query.</td>
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
              Studio Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">F2</kbd>
                <span>Rename Step</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rename any step instantly for enterprise audit documentation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Gear Icon</span>
                <span>Edit Visual Settings</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click the gear next to any step to reopen its configuration modal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Reference Query</span>
                <span>Zero Duplicate Hits</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch downstream queries from a single cached staging source.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono">Alt + H + V</kbd>
                <span>Advanced Editor</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open the complete M code editor modal in one keystroke.
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
                <strong>Reflect on Applied Steps:</strong> How does the sequential recipe structure of Applied Steps eliminate the &quot;black box&quot; opacity of legacy VBA macro scripts during financial audits?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine Reference vs Duplicate:</strong> Why does building modular staging pipelines with Reference queries preserve RAM and reduce network query load on enterprise SQL databases?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider schema resilience:</strong> Why is executing <code className="text-emerald-300 font-mono">Remove Other Columns</code> a vital defensive step against future ERP column additions?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Power Query Editor Studio — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering the Power Query Editor Studio is the hallmark of a true data architect. Treat your Applied Steps as an immutable audit recipe: rename steps with F2, lock down schemas with 'Remove Other Columns', leverage Reference queries for modular staging, and inspect the Formula Bar to understand the elegant M code driving your enterprise models!"
            }
          />
        </div>
      </div>
    </div>
  );
}
