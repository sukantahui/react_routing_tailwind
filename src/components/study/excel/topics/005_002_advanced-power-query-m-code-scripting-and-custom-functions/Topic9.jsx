"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30 selection:text-blue-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Database Pushdown · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              Query Folding &amp; T-SQL Pushdown
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Analyze &amp; Optimize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Query Folding: How Power Query Pushes ETL to Backend SQL Servers
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In enterprise business intelligence, extracting multi-million-row tables across the corporate network creates unacceptable refresh delays and memory exhaustion. 
            <strong>Query Folding</strong> is Power Query's elite performance engine that automatically translates M transformations into native database query statements 
            (<code className="text-cyan-300 font-mono">T-SQL</code>, <code className="text-cyan-300 font-mono">PL/SQL</code>, <code className="text-cyan-300 font-mono">OData</code>), 
            delegating filtering, joining, and aggregation to high-speed database servers and reducing refresh runtimes from hours to seconds!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-blue-400 text-base">✓</span>
              <span><strong>Server-Side Pushdown:</strong> Evaluates WHERE, SELECT, JOIN &amp; GROUP BY on SQL server</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Incremental Refresh Core:</strong> Mandatory prerequisite for cloud partitioning in Power BI</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Fold Early, Transform Late:</strong> Maximizes server filtering before client memory evaluation</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-blue-400">⚡</span> Relational Translation Matrix &amp; Value.NativeQuery
            </h2>
            <span className="text-xs font-mono text-blue-300 bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-800">
              M → SQL Translation Mapping
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Native SQL Query with Downstream Folding Enabled</span>
              <br />
              <span className="text-purple-400">Value.NativeQuery</span>(
              <br />
              &nbsp;&nbsp;<span className="text-amber-300">targetSource</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Sql.Database("ServerHQ", "SalesDB")</span>,
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">sqlStatement</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// "SELECT TransactionID, Amount, BranchCode, OrderDate FROM dbo.FactSales WHERE Year=2026"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-slate-400">parameters</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// null</span>,
              <br />
              &nbsp;&nbsp;<span className="text-emerald-300">[EnableFolding = true]</span> <span className="text-slate-500">// Enables subsequent M steps to fold into outer SQL subqueries!</span>
              <br />
              )
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Power Query M Function</th>
                  <th className="py-3 px-4">Translated SQL Statement</th>
                  <th className="py-3 px-4">Folding Status</th>
                  <th className="py-3 px-4">Engine Execution Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">Table.SelectRows(Source, each [Region]="East")</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">WHERE [Region] = 'East'</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">100% Folded</td>
                  <td className="py-3 px-4">SQL Server Database Engine</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">Table.SelectColumns(Source, &#123;"ID", "Amount"&#125;)</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">SELECT [ID], [Amount] FROM ...</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">100% Folded</td>
                  <td className="py-3 px-4">SQL Server Database Engine</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">Table.Group(Source, &#123;"Branch"&#125;, &#123;&#123;"Sum", List.Sum&#125;&#125;)</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">GROUP BY [Branch], SUM([Amount])</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">100% Folded</td>
                  <td className="py-3 px-4">SQL Server Database Engine</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Table.TransformColumns(Source, &#123;&#123;"Name", Text.Proper&#125;&#125;)</td>
                  <td className="py-3 px-4 font-mono text-rose-400">N/A (No ANSI SQL Equivalent)</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Folding Broken</td>
                  <td className="py-3 px-4">Local Client RAM (Mashup Engine)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-cyan-400">🔬</span> Conceptual &amp; Calculation Mechanics
            </h2>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800">
              AST Translation Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-blue-300 text-base flex items-center gap-2">
                <span>1.</span> Abstract Syntax Tree (AST) Generation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                When you build transformation steps in Power Query, the engine compiles the M code into an internal relational Abstract Syntax Tree. 
                When connected to a relational database like SQL Server, the connector's query provider walks the AST and emits a single, highly optimized 
                <code className="text-blue-300 font-mono">SELECT ... FROM ... WHERE ... GROUP BY</code> statement rather than issuing multiple round-trip queries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base flex items-center gap-2">
                <span>2.</span> The Irreversible Nature of Folding Breaks
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Query Folding is strictly linear and contiguous. Once a step cannot be folded (e.g. adding an index column or applying a custom M function), 
                the folding chain breaks permanently at that step. 
                Even if subsequent steps are simple filters (<code className="text-cyan-300 font-mono">Table.SelectRows</code>), 
                they will be evaluated locally in client memory because the engine cannot re-fold downstream steps back into SQL.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>3.</span> Incremental Refresh Dependency
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In Power BI Service, Incremental Refresh partitions massive multi-billion-row enterprise tables by date. 
                It requires the <code className="text-indigo-300 font-mono">RangeStart</code> and <code className="text-indigo-300 font-mono">RangeEnd</code> parameter filters to fold directly into the SQL <code className="text-indigo-300 font-mono">{"WHERE OrderDate >= @RangeStart AND OrderDate < @RangeEnd"}</code> clause. 
                If folding breaks before the date filter, Incremental Refresh fails completely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>4.</span> Server Index Seeks vs Client Scans
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                When a filter folds into SQL, the database engine utilizes clustered indexes and B-trees to seek the exact requested rows in milliseconds. 
                When folding breaks, Power Query must download millions of raw rows across the local network and execute a full, unindexed sequential scan in client RAM.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">📐</span> Visual Calculation Flow: Query Folding Server Pushdown Engine
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Relational Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradM" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="gradSQL" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="gradClient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <marker
                  id="arrow-cyan"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="arrow-green"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Power Query Steps Container */}
              <g transform="translate(30, 40)">
                <rect width="250" height="260" rx="16" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="125" y="30" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="14">
                  Power Query M Script
                </text>
                
                {/* Step 1 */}
                <rect x="20" y="50" width="210" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="30" y="72" fill="#7dd3fc" fontSize="11" fontFamily="monospace">1. Sql.Database(...)</text>
                
                {/* Step 2 */}
                <rect x="20" y="95" width="210" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="30" y="117" fill="#7dd3fc" fontSize="11" fontFamily="monospace">2. Filter: [Year]=2026</text>
                
                {/* Step 3 */}
                <rect x="20" y="140" width="210" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="30" y="162" fill="#7dd3fc" fontSize="11" fontFamily="monospace">3. Select: ID, Amt, City</text>
                
                {/* Break Marker */}
                <line x1="20" y1="190" x2="230" y2="190" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
                <text x="125" y="205" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">--- FOLDING BREAKS HERE ---</text>
                
                {/* Step 4 */}
                <rect x="20" y="215" width="210" height="35" rx="8" fill="#334155" stroke="#64748b" strokeWidth="1" />
                <text x="30" y="237" fill="#cbd5e1" fontSize="11" fontFamily="monospace">4. Text.Proper([City])</text>
              </g>

              {/* Arrow to SQL Server */}
              <path
                d="M 280 120 L 360 120"
                stroke="#38bdf8"
                strokeWidth="3"
                markerEnd="url(#arrow-cyan)"
                fill="none"
              />
              <text x="320" y="110" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                M → T-SQL
              </text>

              {/* SQL Server Backend Box */}
              <g transform="translate(370, 40)">
                <rect width="250" height="150" rx="16" fill="url(#gradSQL)" opacity="0.9" />
                <text x="125" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                  Backend SQL Server (HQ)
                </text>
                <text x="125" y="52" textAnchor="middle" fill="#d1fae5" fontSize="11">
                  Executes Folded T-SQL Query:
                </text>
                
                <rect x="15" y="65" width="220" height="65" rx="8" fill="#064e3b" opacity="0.7" />
                <text x="25" y="85" fill="#a7f3d0" fontSize="10" fontFamily="monospace">SELECT ID, Amount, City</text>
                <text x="25" y="100" fill="#a7f3d0" fontSize="10" fontFamily="monospace">FROM dbo.FactSales</text>
                <text x="25" y="115" fill="#a7f3d0" fontSize="10" fontFamily="monospace">WHERE Year = 2026</text>
              </g>

              {/* Arrow from SQL to Client */}
              <path
                d="M 620 120 L 700 120"
                stroke="#10b981"
                strokeWidth="3"
                markerEnd="url(#arrow-green)"
                fill="none"
              />
              <text x="660" y="110" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                5k Clean Rows
              </text>

              {/* Client Mashup Engine Container */}
              <g transform="translate(710, 40)">
                <rect width="140" height="260" rx="16" fill="url(#gradClient)" stroke="#64748b" strokeWidth="1.5" />
                <text x="70" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Client RAM
                </text>
                <text x="70" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Mashup Engine
                </text>
                
                <rect x="15" y="80" width="110" height="70" rx="8" fill="#0f172a" opacity="0.6" />
                <text x="70" y="105" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  Fast Transfer
                </text>
                <text x="70" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="9">
                  5,000 Rows
                </text>
                
                <rect x="15" y="195" width="110" height="55" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1" />
                <text x="70" y="218" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">
                  Evaluates Step 4
                </text>
                <text x="70" y="235" textAnchor="middle" fill="#fecdd3" fontSize="8">
                  Text.Proper in RAM
                </text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 9.1: Query Folding pushdown architecture. Steps 1–3 are translated into a single T-SQL query executed on SQL Server; only the final 5,000 filtered rows are sent to client RAM for Step 4 formatting.
          </p>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
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
                Explore the Query Folding translation matrix dataset live in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="EX2110"
            title="Query Folding Step &amp; SQL Pushdown Engine (Step Name, Power Query M Step, Folded SQL Clause, Folding Engine Status)"
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
              Enterprise Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Case 1 · 10M Row ERP Acceleration</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Reducing 45-Min Refresh to 3 Seconds
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead BI Engineer <strong>Swadeep Banerjee</strong> optimizes an ERP sales report pulling from SQL Server. 
                By re-ordering steps so that <code className="text-cyan-300 font-mono">Table.SelectRows</code> (Year = 2026) executes before custom string parsing, 
                the filter folds into a SQL <code className="text-cyan-300 font-mono">WHERE</code> clause, reducing the data transfer from 10 million rows to 12,000 rows.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                SQL WHERE Pushdown → 99.8% Network Bandwidth Reduction
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Case 2 · Power BI Incremental Refresh</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Cloud Table Partitioning with RangeStart
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Tuhina Mukherjee</strong> configures Incremental Refresh for a 5-year ledger table. 
                She verifies that <code className="text-cyan-300 font-mono">{"OrderDate >= RangeStart and OrderDate < RangeEnd"}</code> folds natively into SQL Server, 
                enabling automated cloud refresh of only the current month's transactions in under 15 seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                RangeStart/End → T-SQL WHERE → 100% Incremental Refresh
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Rescuing Broken Query Folding</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Refactoring Table.AddIndexColumn
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Database Specialist <strong>Abhronila Das</strong> notices a query taking 12 minutes to join two SQL tables. 
                She discovers that an early <code className="text-rose-300 font-mono">Table.AddIndexColumn</code> broke folding before the join. 
                Moving the index step to the very end allows the two tables to fold into a single server-side <code className="text-indigo-300 font-mono">INNER JOIN</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Move Index Column to End → Server SQL INNER JOIN Restored
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 4 · Direct SQL CTE Passthrough</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Value.NativeQuery with EnableFolding = true
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Supply Chain Analyst <strong>Debangshu Roy</strong> writes a complex Common Table Expression (CTE) to calculate recursive shipment transit routes. 
                By using <code className="text-emerald-300 font-mono">Value.NativeQuery(Source, cteSql, null, [EnableFolding=true])</code>, 
                his Power Query script executes the CTE and allows downstream visual filters to fold into outer SQL queries.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Value.NativeQuery([EnableFolding=true]) → CTE + Visual Filters Folded
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">🛠️</span> Step-by-Step Practical Folding Optimization Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              M Code Scripting Walkthrough
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-blue-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-700 text-blue-300 flex items-center justify-center text-xs">1</span>
                Step 1: Connect to SQL Server Database
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Connect to the relational database using the native connector rather than generic ODBC:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
                {`Source = Sql.Database("SRV-BARRACKPORE-01", "CorporateSalesDB", [CreateNavigationProperties=false]),
FactSales_Table = Source{[Schema="dbo", Item="FactSales"]}[Data]`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center text-xs">2</span>
                Step 2: Apply Foldable Relational Steps First (Filter &amp; Select)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Apply row filtering and column pruning immediately to push the SQL <code className="text-cyan-300 font-mono">WHERE</code> and <code className="text-cyan-300 font-mono">SELECT</code> clauses to the server:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                {`#"Filtered Date Range" = Table.SelectRows(FactSales_Table, each [OrderDate] >= #date(2026, 1, 1) and [OrderDate] <= #date(2026, 12, 31)),
#"Filtered High Value" = Table.SelectRows(#"Filtered Date Range", each [TotalAmount] >= 50000),
#"Selected Core Columns" = Table.SelectColumns(#"Filtered High Value", {"InvoiceID", "CustomerID", "BranchCode", "TotalAmount", "OrderDate"})`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">3</span>
                Step 3: Defer Non-Foldable Client Transformations to the Tail
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Only after the dataset has been filtered from 10M rows down to 5,000 rows, apply client-side text formatting:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                {`#"Formatted Branch Names" = Table.TransformColumns(#"Selected Core Columns", {{"BranchCode", Text.Upper}}),
#"Added Index Identifier" = Table.AddIndexColumn(#"Formatted Branch Names", "RowSequence", 1, 1, Int64.Type)
in
    #"Added Index Identifier"`}
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
              <span className="text-rose-400">⚠️</span> Common Errors &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostics Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Symptom / Error</th>
                  <th className="py-3 px-4">Underlying Cause</th>
                  <th className="py-3 px-4">Impact on Query</th>
                  <th className="py-3 px-4">Solution &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">'View Native Query' Greyed Out</td>
                  <td className="py-3 px-4">A preceding transformation (e.g. <code className="text-rose-300">Text.Proper</code>, <code className="text-rose-300">Table.Buffer</code>) cannot be translated into SQL.</td>
                  <td className="py-3 px-4">Forces full table extraction into local RAM.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Move non-foldable steps to the very bottom of the Applied Steps list.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Formula.Firewall Crash</td>
                  <td className="py-3 px-4">M query merges a private database query with an organizational Excel file.</td>
                  <td className="py-3 px-4">Query execution fails with privacy boundary error.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Align Privacy Levels to 'Organizational' or stage sources into separate queries.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Incremental Refresh Timeout</td>
                  <td className="py-3 px-4">Date parameters (<code className="text-purple-300">RangeStart</code>/<code className="text-purple-300">RangeEnd</code>) converted to text or un-foldable format.</td>
                  <td className="py-3 px-4">Power BI Service scans the entire multi-year database on every refresh.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Ensure date columns match DateTime type and filter directly on the SQL source step.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Slow Cross-Database Joins</td>
                  <td className="py-3 px-4">Attempting to join two tables located on different SQL Server instances.</td>
                  <td className="py-3 px-4">Both entire tables are downloaded to client RAM to execute a local hash join.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Create a Linked Server or SQL Synonyms in the database to allow server-side joins.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & HIGH-SPEED SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> Pro Tips &amp; High-Speed Shortcuts
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Enterprise Best Practices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-blue-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: The Golden Order: Filter First, Transform Last
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always arrange your query sequence: Source → Select Rows → Select Columns → Joins → [Folded in SQL] → Custom Formatting [Client RAM].
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Encapsulate Complex Logic in SQL Views
              </div>
              <p className="text-slate-300 leading-relaxed">
                If a business calculation requires regex or proprietary algorithms that M cannot fold, build a SQL View in the database. Power Query will fold all downstream steps on top of the View!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Inspect Real T-SQL with Query Diagnostics
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use Power BI Desktop's <strong>Tools → Start Diagnostics</strong> to record the exact T-SQL query text and database server query duration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Enable Downstream Folding on Native Queries
              </div>
              <p className="text-slate-300 leading-relaxed">
                When using handwritten SQL queries in M, always add <code className="text-teal-300 font-mono">[EnableFolding = true]</code> inside <code className="text-teal-300 font-mono">Value.NativeQuery</code> to allow UI steps to wrap the SQL in subqueries.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Architectural Analysis
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">💭</span> Question 1: Why does Text.Upper fold into SQL while Text.Proper breaks folding?
              </h3>
              <p className="leading-relaxed">
                ANSI SQL includes native functions like <code className="text-slate-300 font-mono">UPPER()</code> and <code className="text-slate-300 font-mono">LOWER()</code>, allowing direct translation. Most relational databases lack a native <code className="text-slate-300 font-mono">PROPER()</code> function, forcing Power Query to evaluate title casing locally.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">💭</span> Question 2: What is the network performance cost of joining SQL with CSV?
              </h3>
              <p className="leading-relaxed">
                When a 10M-row SQL fact table is joined with a local CSV file, the join cannot fold into SQL Server. Why does this force the client machine to download all 10M rows over the local area network?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: How does Query Folding protect production database memory?
              </h3>
              <p className="leading-relaxed">
                When a query folds, the database uses indexed cursor scans and returns only matching records. How does this prevent unindexed full-table locks that disrupt transactional OLTP systems?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 9: Query Folding &amp; SQL Pushdown FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Query Folding is the dividing line between junior Power Query developers and senior Enterprise BI Architects. When working with enterprise SQL databases, let the database server do the heavy lifting. Push filters, joins, and aggregations to the server cores, and keep your client mashup engine lightweight. Remember our cardinal rule: Fold early, transform late."
            }
          />
        </div>
      </div>
    </div>
  );
}
