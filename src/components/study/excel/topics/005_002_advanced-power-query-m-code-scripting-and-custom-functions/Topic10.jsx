"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500/30 selection:text-amber-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ High-Speed Engine · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Table.Buffer &amp; RAM Optimization
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Analyze &amp; Tune
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Optimizing Performance: Buffering Tables &amp; Reducing Memory Footprint
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Power Query's default lazy evaluation engine streams data on-demand, which can trigger repeated source recalculations 
            during complex joins, row-by-row lookups, and sorting locks. 
            By strategically deploying in-memory buffering (<code className="text-amber-300 font-mono">Table.Buffer</code>, <code className="text-amber-300 font-mono">List.Buffer</code>, <code className="text-amber-300 font-mono">Binary.Buffer</code>) 
            and pruning unused columns at Step 1, you slash computational complexity from <code className="text-rose-300 font-mono">O(N*M)</code> to <code className="text-teal-300 font-mono">O(N)</code>, 
            unlocking 20x to 50x ETL acceleration!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Table.Buffer:</strong> Takes an immutable in-memory RAM snapshot of dimension tables</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Order Retention:</strong> Locks explicit sort sequences prior to <code className="text-teal-300">Table.Group</code> aggregations</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Early Column Pruning:</strong> Eliminates up to 90% of memory consumption before joins</span>
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
              <span className="text-amber-400">⚡</span> Formula Anatomy: In-Memory Buffering Primitives
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Memory Management Signatures
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// 1. Table Buffering: Caches 2D tabular dataset into RAM</span>
              <br />
              <span className="text-purple-400">Table.Buffer</span>(
              <span className="text-sky-300">table</span> <span className="text-purple-400">as</span> table, 
              <span className="text-slate-400">optional options</span> <span className="text-purple-400">as</span> nullable record
              ) <span className="text-purple-400">as</span> table
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-slate-500">// 2. List Buffering: Caches 1D vector into fast CPU registers</span>
              <br />
              <span className="text-purple-400">List.Buffer</span>(
              <span className="text-sky-300">list</span> <span className="text-purple-400">as</span> list
              ) <span className="text-purple-400">as</span> list
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-slate-500">// 3. Binary Buffering: Caches raw byte stream to stop repeated disk I/O</span>
              <br />
              <span className="text-purple-400">Binary.Buffer</span>(
              <span className="text-sky-300">binary</span> <span className="text-purple-400">as</span> binary
              ) <span className="text-purple-400">as</span> binary
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Buffering Function</th>
                  <th className="py-3 px-4">Target In-Memory Object</th>
                  <th className="py-3 px-4">Optimal Size Target</th>
                  <th className="py-3 px-4">Primary Performance Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Table.Buffer</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Table (Rows &times; Columns)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">1,000 to 100,000 rows (&lt;100MB)</td>
                  <td className="py-3 px-4">Accelerates row-by-row lookups, nested merges, and locks sort order before <code className="text-amber-300">Table.Group</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">List.Buffer</td>
                  <td className="py-3 px-4 font-mono text-purple-300">List (1D Array)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Any size key list (&lt;250MB)</td>
                  <td className="py-3 px-4">Instant key membership checks inside <code className="text-teal-300">List.Contains</code> during row filtering.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">Binary.Buffer</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Raw Byte Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Single file streams (&lt;500MB)</td>
                  <td className="py-3 px-4">Prevents multiple disk re-reads when extracting multiple worksheets from one Excel file.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Table.StopFolding</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Lazy Stream Boundary</td>
                  <td className="py-3 px-4 text-slate-400 font-semibold">Zero RAM impact</td>
                  <td className="py-3 px-4">Terminates SQL server query pushdown without eagerly allocating memory buffers.</td>
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
              <span className="text-teal-400">🔬</span> Conceptual &amp; Calculation Mechanics
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              RAM Architecture &amp; Complexity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>1.</span> The Mechanics of Lazy Stream Recalculation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Power Query is built on a pull-based, lazy streaming pipeline. When query A references query B, 
                query B is not calculated and stored in memory by default. 
                If query A iterates across 10,000 rows and executes a lookup into query B on every row, 
                the mashup engine re-evaluates query B 10,000 separate times, multiplying execution time exponentially!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>2.</span> Complexity Reduction: O(N*M) &rarr; O(N)
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Wrapping the dimension table in <code className="text-teal-300 font-mono">Table.Buffer</code> creates an immutable in-memory hash table in RAM. 
                Instead of 100,000 Fact rows triggering 100,000 sequential scans over 5,000 Dimension rows (500 million operations), 
                the Dimension table is evaluated once in memory, reducing row lookups to fast O(1) hash pointer dereferences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>3.</span> Locking Sort Order Before Table.Group
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A classic Power Query gotcha occurs when sorting a table by Date descending to grab the "latest" status in a <code className="text-indigo-300 font-mono">Table.Group</code> aggregation. 
                Because sorting is lazy, <code className="text-indigo-300 font-mono">Table.Group</code> often discards the sort order. 
                Writing <code className="text-indigo-300 font-mono">Table.Buffer(Table.Sort(...))</code> freezes the sorted sequence in RAM, guaranteeing that the first row in each group is truly the latest.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-rose-300 text-base flex items-center gap-2">
                <span>4.</span> The Danger of Buffering Large Fact Tables
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Buffering is NOT a silver bullet. Buffering a 10-million-row Fact table forces gigabytes of uncompressed tabular data into client RAM, 
                overwhelming the garbage collector, triggering disk thrashing, and permanently destroying SQL Server Query Folding. 
                Always buffer small lookup tables and keep large Fact tables streaming!
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
              <span className="text-indigo-400">📐</span> Visual Calculation Flow: Unbuffered Streaming vs Table.Buffer RAM Snapshot
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Memory Benchmarking
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 330"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradSlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#991b1b" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="gradFast" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <marker
                  id="arrow-red"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#ef4444" />
                </marker>
                <marker
                  id="arrow-emerald"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Top Track: Unbuffered Lazy Evaluation */}
              <g transform="translate(30, 30)">
                <rect width="820" height="120" rx="14" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="15" y="15" width="140" height="24" rx="6" fill="#991b1b" />
                <text x="85" y="31" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                  1. Unbuffered Stream
                </text>
                
                {/* Fact Loop */}
                <rect x="30" y="55" width="200" height="50" rx="8" fill="#1e293b" />
                <text x="130" y="77" textAnchor="middle" fill="#f87171" fontWeight="bold" fontSize="12">
                  100,000 Fact Rows
                </text>
                <text x="130" y="93" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Row-by-Row Evaluation
                </text>
                
                {/* Repetitive Arrows */}
                <path d="M 235 80 L 375 80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arrow-red)" fill="none" />
                <text x="305" y="73" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                  100k Re-fetches!
                </text>
                
                {/* Source Dimension */}
                <rect x="385" y="55" width="220" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
                <text x="495" y="77" textAnchor="middle" fill="#f87171" fontWeight="bold" fontSize="12">
                  Dim Table (Disk / Network)
                </text>
                <text x="495" y="93" textAnchor="middle" fill="#fca5a5" fontSize="10">
                  500 Million Total Iterations!
                </text>
                
                {/* Result Box */}
                <rect x="650" y="50" width="150" height="60" rx="8" fill="url(#gradSlow)" />
                <text x="725" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  Runtime: 18.5 Min
                </text>
                <text x="725" y="95" textAnchor="middle" fill="#fee2e2" fontSize="11">
                  High CPU &amp; Disk Lag
                </text>
              </g>

              {/* Bottom Track: Buffered Fast Memory Evaluation */}
              <g transform="translate(30, 175)">
                <rect width="820" height="125" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <rect x="15" y="15" width="160" height="24" rx="6" fill="#065f46" />
                <text x="95" y="31" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                  2. Table.Buffer RAM Snapshot
                </text>
                
                {/* Fact Loop */}
                <rect x="30" y="55" width="200" height="55" rx="8" fill="#1e293b" />
                <text x="130" y="78" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">
                  100,000 Fact Rows
                </text>
                <text x="130" y="96" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Streams through RAM Cache
                </text>
                
                {/* Single Fast Arrow */}
                <path d="M 235 82 L 375 82" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-emerald)" fill="none" />
                <text x="305" y="74" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                  Instant O(1) Lookups
                </text>
                
                {/* RAM Buffered Box */}
                <rect x="385" y="55" width="220" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="495" y="78" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="12">
                  Table.Buffer(Dim) in RAM
                </text>
                <text x="495" y="96" textAnchor="middle" fill="#d1fae5" fontSize="10">
                  Evaluated ONCE in Memory
                </text>
                
                {/* Result Box */}
                <rect x="650" y="50" width="150" height="65" rx="8" fill="url(#gradFast)" />
                <text x="725" y="76" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  Runtime: 2.3 Sec
                </text>
                <text x="725" y="98" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                  480x Speedup! ⚡
                </text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 10.1: Benchmark comparison showing how buffering a dimension table eliminates 100,000 redundant disk/network scans, reducing execution duration from 18.5 minutes down to 2.3 seconds.
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
                Explore the performance optimization benchmark dataset live in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="Topic10_Performance_Optimize"
            title="Performance Optimization &amp; Table.Buffer Benchmarks (Query Name, Unbuffered Runtime s, Buffered Runtime s, Speedup Multiplier, Memory Footprint MB)"
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
              Optimization Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 1 · Multi-Currency Sales Ledger</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Table.Buffer on Daily FX Rates Matrix
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> converts 150,000 export transactions into INR. 
                By buffering the 30-row daily exchange rates table before running <code className="text-amber-300 font-mono">Table.AddColumn</code>, 
                the lookup query executes directly in CPU memory, dropping execution time from 12 minutes to 1.8 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Table.Buffer(FXRates) &rarr; 400x Faster Multi-Currency Calculation
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 2 · Latest Customer Status in Group By</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Sort Order Persistence with Table.Buffer
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead Accountant <strong>Tuhina Mukherjee</strong> groups customer audit logs to extract their most recent KYC status. 
                Wrapping the descending date sort in <code className="text-teal-300 font-mono">Table.Buffer(Table.Sort(...))</code> locks the row sequence in RAM, 
                guaranteeing that <code className="text-teal-300 font-mono">Table.Group</code> returns the true latest KYC state without random reordering.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Table.Buffer(Table.Sort(...)) &rarr; 100% Reliable Latest Row State
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Multi-Branch ID Membership Filter</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                List.Buffer Key Vector Optimization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Architect <strong>Abhronila Das</strong> filters 250,000 equipment part logs against 1,200 active project codes. 
                By buffering the project codes as a 1D vector with <code className="text-indigo-300 font-mono">List.Buffer(DimProjects[ProjectID])</code>, 
                <code className="text-indigo-300 font-mono">List.Contains</code> evaluates instantly in RAM with zero memory overhead.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                List.Buffer(Keys) &rarr; Fast Vector Search in List.Contains
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Master Excel File Multi-Sheet Extraction</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Binary.Buffer Disk I/O Elimination
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Analyst <strong>Debangshu Roy</strong> extracts 12 separate branch worksheets from a shared 80MB Excel workbook on a network drive. 
                Buffering the raw file stream once with <code className="text-purple-300 font-mono">Binary.Buffer(File.Contents(...))</code> avoids re-downloading the 80MB file 12 consecutive times over the network!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Binary.Buffer(File.Contents) &rarr; 1 Single Network Read for 12 Sheets
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Practical Memory Tuning Workflow
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              M Code Scripting Walkthrough
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 flex items-center justify-center text-xs">1</span>
                Step 1: Early Column Pruning at Step 1
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Immediately strip all unneeded columns to reduce the memory footprint by up to 90% before applying joins:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                {`Source = Csv.Document(File.Contents("C:\\Data\\FactTransactions.csv"), [Delimiter=",", Encoding=65001]),
#"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
#"Pruned Unused Cols" = Table.SelectColumns(#"Promoted Headers", {"TxID", "Date", "CustomerID", "Amount", "CurrencyCode"})`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">2</span>
                Step 2: Buffer Dimension in Outer Let Block
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Declare the buffer step once at the top-level scope so all downstream rows share the same in-memory cache:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto">
                {`#"Buffered Currency Matrix" = Table.Buffer(DimExchangeRates),
#"Buffered Active Customer IDs" = List.Buffer(DimCustomers[CustomerID])`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">3</span>
                Step 3: Execute In-Memory Lookups &amp; Filter
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Perform row lookups and membership tests directly against the buffered RAM structures:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                {`#"Filtered Active Only" = Table.SelectRows(#"Pruned Unused Cols", each List.Contains(#"Buffered Active Customer IDs", [CustomerID])),
#"Added Standardized INR" = Table.AddColumn(#"Filtered Active Only", "INR_Amount", each [Amount] * #"Buffered Currency Matrix"{[Currency=[CurrencyCode]]}[RateINR], type number)
in
    #"Added Standardized INR"`}
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
                  <th className="py-3 px-4">Performance Anti-Pattern</th>
                  <th className="py-3 px-4">Underlying Mechanism</th>
                  <th className="py-3 px-4">Impact on Query</th>
                  <th className="py-3 px-4">Correct Optimization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Buffering Fact Tables</td>
                  <td className="py-3 px-4">Applying <code className="text-rose-300">Table.Buffer</code> to multi-million-row transactional tables.</td>
                  <td className="py-3 px-4">High RAM pressure, Out-Of-Memory crashes, and broken SQL Query Folding.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Never buffer Fact tables; let Fact tables stream lazily or fold into SQL.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Buffer in Function Loop</td>
                  <td className="py-3 px-4">Calling <code className="text-amber-300">Table.Buffer</code> inside a custom function invoked across 50,000 rows.</td>
                  <td className="py-3 px-4">Allocates 50,000 separate memory buffers, freezing the computer.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Buffer once in the outer query and pass the buffered reference to the function.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Late Column Removal</td>
                  <td className="py-3 px-4">Leaving 50 unused columns in the table through all intermediate join steps.</td>
                  <td className="py-3 px-4">Consumes 10x more RAM during merges and hash table creation.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Prune unused columns with <code className="text-teal-300 font-mono">Table.SelectColumns</code> at Step 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Staging Query Duplicate Loads</td>
                  <td className="py-3 px-4">Leaving 'Enable Load' checked on intermediate staging and utility queries.</td>
                  <td className="py-3 px-4">Duplicates data model memory storage and inflates .pbix/.xlsx file size.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Uncheck 'Enable Load' on all staging and transformation helper queries.</td>
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
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Prefer List.Buffer for Key Validation
              </div>
              <p className="text-slate-300 leading-relaxed">
                When checking if an ID exists in a master list using <code className="text-amber-300 font-mono">List.Contains</code>, buffer the 1D list with <code className="text-amber-300 font-mono">List.Buffer</code> rather than buffering the entire multi-column table.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Lock Sort Order Before Group By
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always use <code className="text-teal-300 font-mono">Table.Buffer(Table.Sort(Source, {`{{"Date", Order.Descending}}`}))</code> to guarantee that the top row inside <code className="text-teal-300 font-mono">Table.Group</code> reflects the true latest event.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Inspect Memory via Query Diagnostics
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use <strong>Tools &rarr; Start Diagnostics</strong> in Power BI to evaluate <code className="text-indigo-300 font-mono">Memory (KB)</code> allocations per step and identify rogue memory-heavy operations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Convert Numeric Text to Fixed Int64
              </div>
              <p className="text-slate-300 leading-relaxed">
                Convert IDs and numbers from <code className="text-purple-300 font-mono">type text</code> to <code className="text-purple-300 font-mono">Int64.Type</code> early; 64-bit integer hashing is up to 10x faster and uses far less RAM during joins.
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
                <span className="text-amber-400">💭</span> Question 1: Why does declaring Table.Buffer inside a function definition freeze the system?
              </h3>
              <p className="leading-relaxed">
                When a function is called row-by-row inside <code className="text-slate-300 font-mono">Table.AddColumn</code>, any internal expressions are re-instantiated on every single row. Why must buffers always be scoped in the outer query before invoking functions?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: How does early column pruning optimize CPU cache performance?
              </h3>
              <p className="leading-relaxed">
                Narrow data rows fit directly into ultra-fast L1 and L2 CPU hardware caches. Why does carrying 80 unnecessary columns cause CPU cache misses and force data paging onto physical disk drives?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: What is the architectural tradeoff between RAM buffering and streaming?
              </h3>
              <p className="leading-relaxed">
                Streaming evaluation uses almost zero memory but re-reads the source on every downstream branch. Buffering provides instant random access but consumes physical RAM. How do you decide which strategy to apply?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 10: Performance Optimization &amp; Buffering FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "In high-volume corporate data engineering, writing code that produces correct results is only half the battle; writing code that runs in seconds without exhausting system memory is what distinguishes an elite architect. Prune your columns on Step 1, preserve Query Folding on SQL sources, and use Table.Buffer selectively on small lookup dimensions. Treat memory as an expensive corporate asset."
            }
          />
        </div>
      </div>
    </div>
  );
}
