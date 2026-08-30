"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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
              ⚡ Loading Architecture · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Destinations &amp; Data Model
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Evaluate &amp; Architect
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Loading Options: Close &amp; Load to Table, Connection Only &amp; The Data Model
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Building complex ETL pipelines is only half the battle; where and how your data lands dictates overall 
            workbook performance, file size, and analytical scalability. 
            Power Query's <strong>Loading Architecture</strong> provides four distinct destination pathways—from 
            standard <strong>Worksheet Tables</strong> and <strong>Direct PivotTable Streaming</strong> to 
            lightweight <strong>Connection Only Staging</strong> and the high-performance <strong>VertiPaq Data Model</strong> 
            (bypassing Excel's 1,048,576 row barrier to support 100+ million rows with 10x columnar compression)!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Connection Only:</strong> Zero sheet clutter for lightweight intermediate staging</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>The Data Model:</strong> Bypasses the 1-million row limit with VertiPaq compression</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Direct PivotTable:</strong> Streams data directly into analytical pivot cache</span>
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
              <span className="text-teal-400">⚡</span> Power Query Load Destination Decision Matrix
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Loading Endpoints
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Staging Query Load Setting (Golden Standard)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'Load Destination: "Only Create Connection" (Zero Worksheet Grid Overhead)'}
            </div>
            <span className="text-slate-500">// 2. Master Analytics Load Setting (Power BI / Power Pivot)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'Load Destination: "Only Create Connection" + [X] "Add this data to the Data Model"'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Destination Target</th>
                  <th className="py-3 px-4">Max Row Capacity</th>
                  <th className="py-3 px-4">Memory Footprint</th>
                  <th className="py-3 px-4">Recommended Enterprise Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Only Create Connection</td>
                  <td className="py-3 px-4 text-teal-300">Unlimited (RAM)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">0 MB Grid Overhead</td>
                  <td className="py-3 px-4 font-sans text-slate-300">All intermediate staging, merging, and append queries.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Add to Data Model</td>
                  <td className="py-3 px-4 text-emerald-300">100M+ Rows</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">5x–10x Compressed</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Large-scale fact tables powering Power Pivot DAX models.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">PivotTable Report</td>
                  <td className="py-3 px-4 text-sky-300">Pivot Cache Limits</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Optimized Cache</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Direct interactive pivoting without flat worksheet tables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Worksheet Table</td>
                  <td className="py-3 px-4 text-amber-300">1,048,576 Rows</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">High (Uncompressed)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Small aggregated summary tables for human inspection.</td>
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
              <span className="text-emerald-400">🔬</span> VertiPaq Columnar Compression &amp; Synchronous Refresh Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Loading Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> VertiPaq xVelocity Columnar Compression
              </h3>
              <p className="leading-relaxed">
                When you check <strong>Add this data to the Data Model</strong>, data is stored in columns rather than rows. 
                Using dictionary encoding and run-length bit-packing, VertiPaq compresses 500 MB CSV files into a 40 MB workbook, 
                allowing Excel to calculate DAX aggregates over 20 million rows in sub-seconds!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                10x Compression + Bypasses 1-Million Row Limit
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Background Refresh vs VBA Automation
              </h3>
              <p className="leading-relaxed">
                By default, Excel enables <strong>Background Refresh</strong> so users can type while queries run asynchronously. 
                However, if you write VBA macros that process refreshed data, you must uncheck <strong>Enable background refresh</strong> 
                in Connection Properties to force synchronous execution!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Disable Background Refresh for Flawless VBA Sync
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Auto-Refresh on File Open &amp; Periodic Polling
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In Query Properties &rarr; Usage Tab, check <strong>Refresh data when opening the file</strong> so executives always see live data upon launch. 
              For operational control room displays, check <strong>Refresh every 15 minutes</strong> to poll live SQL databases automatically!
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
              <span className="text-teal-400">📐</span> Visual Power Query Destination Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Loading Architecture Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how transformed Power Query streams are routed into their optimal analytical destinations:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Power Query Editor Output (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. POWER QUERY M ENGINE</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18">Cleaned Fact Sales (15M Rows)</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">stg_Monthly_Extracts (Temp)</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82">Dim_Customer (100k Rows)</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114">Executive KPI Summary</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Transformed Data Streams</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Choose Load Destinations</text>

              {/* Branching Arrows */}
              <path d="M 260 90 L 320 90" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 260 230 L 320 230" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />

              {/* Destination Router (Center & Right) */}
              {/* Destination 1: Staging Connection Only */}
              <rect x="325" y="25" width="240" height="125" rx="10" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="240" height="28" rx="10" fill="#115E59" fillOpacity="0.4" />
              <text x="445" y="44" fill="#5EEAD4" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ONLY CREATE CONNECTION</text>
              <g transform="translate(335, 60)" fontSize="8" fontFamily="sans-serif" fill="#CBD5E1">
                <text x="6" y="15">✓ 0 MB Worksheet Grid Overhead</text>
                <text x="6" y="32">✓ In-Memory Query Definition</text>
                <text x="6" y="49" fill="#5EEAD4" fontWeight="bold">Ideal for: Staging &amp; Merging Pipes</text>
              </g>

              {/* Destination 2: Power Pivot Data Model */}
              <rect x="325" y="165" width="240" height="130" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="325" y="165" width="240" height="28" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="445" y="184" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">THE DATA MODEL (VERTIPAQ)</text>
              <g transform="translate(335, 200)" fontSize="8" fontFamily="sans-serif" fill="#CBD5E1">
                <text x="6" y="15">✓ Bypasses 1,048,576 Row Limit</text>
                <text x="6" y="32">✓ 10x Columnar Dictionary Compression</text>
                <text x="6" y="49" fill="#34D399" fontWeight="bold">Ideal for: 100M+ Fact Tables &amp; DAX</text>
              </g>

              {/* Output Analytics Ecosystem (Right) */}
              <rect x="585" y="25" width="240" height="270" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="585" y="25" width="240" height="34" rx="12" fill="#0369A1" fillOpacity="0.3" />
              <text x="705" y="47" fill="#BAE6FD" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. ANALYTICAL FRONT-END</text>

              <g transform="translate(595, 75)" fontSize="8.5" fontFamily="sans-serif" fill="#E2E8F0">
                <rect width="220" height="38" rx="6" fill="#1E293B" stroke="#38BDF8" />
                <text x="8" y="16" fill="#38BDF8" fontWeight="bold">Power Pivot Star Schema</text>
                <text x="8" y="30" fill="#94A3B8">Relationships + Calculated DAX</text>

                <rect y="46" width="220" height="38" rx="6" fill="#1E293B" stroke="#10B981" />
                <text x="8" y="62" fill="#34D399" fontWeight="bold">Interactive PivotTable &amp; Chart</text>
                <text x="8" y="76" fill="#94A3B8">Sub-Second Slicing over Millions</text>

                <rect y="92" width="220" height="38" rx="6" fill="#1E293B" stroke="#F59E0B" />
                <text x="8" y="108" fill="#FBBF24" fontWeight="bold">Scheduled Auto-Refresh</text>
                <text x="8" y="122" fill="#94A3B8">Refreshes on Open &amp; Background Sync</text>
              </g>

              <rect x="595" y="225" width="220" height="55" rx="6" fill="#0284C7" fillOpacity="0.15" stroke="#38BDF8" />
              <text x="705" y="245" fill="#38BDF8" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100M-Row BI Engine</text>
              <text x="705" y="262" fill="#BAE6FD" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ultra-Fast Executive Reporting</text>
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
                Explore the loading options dataset below or download the practice workbook to test Close &amp; Load To... and Data Model loading in Microsoft Excel.
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
            sheetName="Topic13_Close_And_Load"
            title="Loading Destination Master Architecture (Query Name, Load Target, In Data Model, Row Count, Compressed RAM Size, Refresh Mode)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · 8-Million Row Data Model</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Bypassing Excel's 1-Million Row Grid Limit
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> ingests 8 million retail POS transaction records: 
                selecting <strong>Only Create Connection + [X] Add to Data Model</strong>, loading the entire multi-year dataset into Power Pivot without exceeding sheet limits!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                8M Rows Loaded to VertiPaq &rarr; 45 MB Compressed Workbook
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Clean Staging Architecture</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                12 Staging Queries as Connection Only
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> configures 12 monthly extraction queries as <strong>Only Create Connection</strong>, 
                eliminating 12 redundant worksheet tabs and saving 300 MB of duplicate RAM allocation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Connection Only &rarr; Zero Worksheet Clutter &amp; 300 MB RAM Saved
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · VBA Automation Synchronization</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Disabling Background Refresh for Macros
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> unchecks <strong>Enable background refresh</strong> in Connection Properties, 
                preventing a VBA PDF export macro from executing prematurely before Power Query finished loading data!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Synchronous Refresh &rarr; 100% Reliable Automated PDF Exports
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Executive Polling</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Auto-Refresh on File Open &amp; 15-Min Cron
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> checks <strong>Refresh data when opening the file</strong> and <strong>Refresh every 15 minutes</strong>, 
                powering a live TV dashboard display in the regional management control room.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Periodic Auto-Refresh &rarr; Live Unattended Executive Dashboard
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
              <span className="text-teal-400">🪜</span> Step-by-Step Loading Configuration Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Always Choose 'Close &amp; Load To...'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Never click the default Close &amp; Load icon. Click the small arrow underneath &rarr; <strong>Close &amp; Load To...</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Set Staging Queries to 'Only Create Connection'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  For intermediate extract and merge staging tables, select <strong>Only Create Connection</strong> with Data Model unchecked.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Check 'Add this data to the Data Model' for Master Tables</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  For final fact tables exceeding 100k rows, check <strong>Add this data to the Data Model</strong> to enable high-speed Power Pivot DAX modeling!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Configure Background Refresh &amp; Auto-Refresh Options</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Right-click query in Queries &amp; Connections &rarr; <strong>Properties</strong> &rarr; Configure refresh timers and background execution.
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
              Loading Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">1,048,576 Row Grid Overflow</td>
                  <td className="py-3 px-4 text-slate-300">Loaded a 5M row dataset into an Excel worksheet table instead of the Data Model.</td>
                  <td className="py-3 px-4 text-slate-400">Excel freezes or truncates rows with a grid capacity error.</td>
                  <td className="py-3 px-4 text-emerald-400">Change Load To: 'Only Create Connection' + [X] 'Add to Data Model'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">VBA Macro Premature Execution</td>
                  <td className="py-3 px-4 text-slate-300">Background refresh was enabled, causing VBA code to execute before data load finished.</td>
                  <td className="py-3 px-4 text-slate-400">VBA exported PDFs contain blank or outdated figures.</td>
                  <td className="py-3 px-4 text-emerald-400">Uncheck <strong>Enable background refresh</strong> in Connection Properties.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Manual Note Misalignment</td>
                  <td className="py-3 px-4 text-slate-300">User typed manual text comments beside rows in a dynamic query table.</td>
                  <td className="py-3 px-4 text-slate-400">Comments shift to wrong accounts when query table refreshes and sorts.</td>
                  <td className="py-3 px-4 text-emerald-400">Store user annotations in a database or dedicated key-indexed lookup table.</td>
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
              Loading Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Ctrl + Alt + F5</span>
                <span>Refresh All</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refreshes all Power Query connections and Data Model tables globally across the entire workbook.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Add to Data Model</span>
                <span>VertiPaq 100M Rows</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bypass the 1-million row grid barrier and achieve 10x columnar dictionary compression.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Only Create Connection</span>
                <span>Zero Grid Clutter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keep staging queries in memory without dumping redundant data rows into worksheet cells.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Synchronous Refresh</span>
                <span>VBA Macro Integrity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Disable background refresh to guarantee VBA macros execute only after data loading is complete.
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
                <strong>Reflect on destination architecture:</strong> Why is combining <code className="text-teal-300 font-mono">Only Create Connection</code> with <code className="text-emerald-400 font-mono">[X] Add to Data Model</code> the gold standard for enterprise Power BI and Power Pivot modeling?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine memory compression:</strong> How does the VertiPaq engine compress a 500 MB CSV transaction dump into a 40 MB Excel workbook while accelerating calculation speeds by 50x?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider automation synchronization:</strong> Why does enabling Background Refresh cause VBA macros that export PDF reports to produce outdated or incomplete outputs?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Loading Options & The Data Model — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never dump intermediate queries into worksheet grids, and embrace the Data Model! Always use 'Close & Load To...' rather than default Close & Load. Set all staging and transformation queries to 'Only Create Connection' to keep workbooks lightweight and uncluttered, and load consolidated tables directly into the Data Model (VertiPaq) to smash the 1-million-row limit and unlock high-speed DAX analytics!"
            }
          />
        </div>
      </div>
    </div>
  );
}
