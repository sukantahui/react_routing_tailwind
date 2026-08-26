import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Debugging Slow Queries and Identifying Missing Indexes
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query tuning workbench on EXPLAIN analysis, SARGability, and missing index identification.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("sargable_date_optimization");

  const tuningScenarios = {
    sargable_date_optimization: {
      title: "1. The Non-SARGable Date Function Trap",
      badge: "SARGable Refactoring",
      badgeColor: "rose",
      sqlQuery: `-- ❌ SLOW QUERY (Non-SARGable: Function wraps column, blinding B-Tree):
SELECT student_id, student_name, created_at 
FROM students 
WHERE YEAR(created_at) = 2026;
-- EXPLAIN: type = ALL, rows = 500,000, latency = 2,410 ms (Full Table Scan)

-- ✅ FAST REFACTORED QUERY (SARGable: Direct B-Tree Range Seek):
SELECT student_id, student_name, created_at 
FROM students 
WHERE created_at >= '2026-01-01 00:00:00' 
  AND created_at < '2027-01-01 00:00:00';
-- EXPLAIN: type = range, key = idx_created_at, rows = 1,240, latency = 2.1 ms!`,
      resultRows: [
        { metric: "Access Type", before: "ALL (Full Table Scan)", after: "range (B-Tree Seek)", impact: "2,000x Faster", status: "Resolved" },
        { metric: "Rows Examined", before: "500,000 Rows", after: "1,240 Rows", impact: "99.75% I/O Saved", status: "Resolved" },
        { metric: "Disk Page Reads", before: "31,250 Pages (16KB)", after: "4 Pages", impact: "RAM Cache Hit", status: "Optimal" },
        { metric: "Execution Latency", before: "2,410 ms (2.4s)", after: "2.1 ms", impact: "Instantaneous", status: "Production Grade" },
      ],
      explanation:
        "Wrapping columns in functions like `YEAR()` prevents index traversal. Refactoring to an explicit date boundary enables direct B-Tree range scans.",
    },
    filesort_temporary_elimination: {
      title: "2. Eliminating Using filesort & Using temporary",
      badge: "Index Ordering",
      badgeColor: "amber",
      sqlQuery: `-- ❌ SLOW QUERY (Missing Composite Index causes in-memory filesort):
SELECT customer_id, order_id, order_date, net_total_inr 
FROM customer_orders 
WHERE customer_id = 101 
ORDER BY order_date DESC;
-- EXPLAIN: type = ALL, Extra: Using where; Using filesort

-- ✅ OPTIMIZATION: Add Composite Index on (customer_id, order_date DESC):
CREATE INDEX idx_cust_order_date ON customer_orders (customer_id, order_date DESC);

-- Re-running the query now yields:
-- EXPLAIN: type = ref, key = idx_cust_order_date, Extra: Using index condition (ZERO filesort!)`,
      resultRows: [
        { metric: "Sort Mechanism", before: "Using filesort (RAM Buffer)", after: "Physical B-Tree Order", impact: "Zero Sort CPU", status: "Resolved" },
        { metric: "Access Type", before: "ALL (Full Table Scan)", after: "ref (Point Seek)", impact: "Direct Seek", status: "Resolved" },
        { metric: "Memory Overhead", before: "2MB Sort Buffer Spike", after: "0 KB Sort RAM", impact: "Buffer Pool Safe", status: "Optimal" },
        { metric: "Latency", before: "1,850 ms", after: "1.4 ms", impact: "1,320x Faster", status: "Production Grade" },
      ],
      explanation:
        "When an index provides the exact physical sorting required by `ORDER BY`, MySQL eliminates costly `Using filesort` memory buffer spikes entirely.",
    },
    covering_index_acceleration: {
      title: "3. Covering Index: Zero Clustered Bookmark Seeks",
      badge: "Covering Index",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ DOUBLE LOOKUP QUERY (Reads secondary index THEN looks up full row in Clustered PK):
SELECT student_id, branch_id, exam_score_pct 
FROM enrollments 
WHERE branch_id = 1;
-- EXPLAIN: type = ref, key = idx_branch, Extra: NULL (Requires Clustered Table Page Seeks)

-- ✅ COVERING INDEX OPTIMIZATION: Include all selected columns in secondary B-Tree:
CREATE INDEX idx_branch_score_covering ON enrollments (branch_id, student_id, exam_score_pct);

-- Re-running the query now yields:
-- EXPLAIN: type = ref, key = idx_branch_score_covering, Extra: Using index (100% Index-Only!)`,
      resultRows: [
        { metric: "Index Utilization", before: "Index + Clustered Table Read", after: "Using index (Covering)", impact: "Zero Table Page Reads", status: "Resolved" },
        { metric: "I/O Access Steps", before: "2 Steps (Secondary + Clustered)", after: "1 Step (Secondary Only)", impact: "50% Fewer Hops", status: "Optimal" },
        { metric: "Throughput Capacity", before: "450 Queries/sec", after: "18,500 Queries/sec", impact: "41x Scalability", status: "Production Grade" },
        { metric: "Latency", before: "140 ms", after: "0.8 ms", impact: "175x Faster", status: "Production Grade" },
      ],
      explanation:
        "A Covering Index (`Using index`) contains all requested columns directly in the secondary B-Tree leaf, completely bypassing clustered index data page reads.",
    },
  };

  const navItems = [
    { id: "tuning-methodology", label: "1. Performance Tuning Workflow" },
    { id: "explain-access-types", label: "2. Decoding EXPLAIN Access Types" },
    { id: "svg-diagrams", label: "3. Diagnostic Flow & SARGability SVGs" },
    { id: "interactive-sandbox", label: "4. Live Slow Query Tuning Sandbox" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_008</span>
            <span>•</span>
            <span>Tuning Lab 5 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Performance Engineering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Debugging Slow Queries & Identifying Missing Indexes
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the art of query profiling. Decode <code className="text-cyan-300 font-mono">EXPLAIN ANALYZE</code> execution trees, eliminate non-SARGable bottlenecks, eradicate <code className="text-rose-300 font-mono">Using filesort</code> memory buffers, and build high-throughput covering indexes.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Methodology */}
        <section id="tuning-methodology" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4-Step Query Optimization Protocol
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The systematic methodology used by senior database reliability engineers to troubleshoot latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>1️⃣</span> Capture in Slow Log
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enable <code className="text-rose-300 font-mono">slow_query_log = 1</code> with <code className="text-rose-300 font-mono">long_query_time = 0.5</code> to catch queries lagging behind SLA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>2️⃣</span> Profile with EXPLAIN
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Run <code className="text-amber-300 font-mono">EXPLAIN ANALYZE</code> to inspect execution iterators, row estimations, and sort buffer spillovers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>3️⃣</span> Refactor SARGability
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remove function wrappers from WHERE predicates and fix implicit data type conversion traps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>4️⃣</span> Composite Covering Indexes
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create composite indexes adhering to the <code className="text-emerald-300 font-mono">(Equality, Range, Sort)</code> rule to achieve <code className="text-emerald-300 font-mono">Using index</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Access Types */}
        <section id="explain-access-types" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. EXPLAIN Access Types: From Slowest to Fastest
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Evaluating the quality of execution plans by decoding the `type` column.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-red-900/50 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">1. ALL</span>
              <p className="text-slate-400 font-sans">Full Table Scan. Reads every 16KB disk page. Worst.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-orange-900/50 space-y-1">
              <span className="text-orange-400 font-bold block text-sm">2. index</span>
              <p className="text-slate-400 font-sans">Full Index Scan. Scans entire secondary B-Tree leaves.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/50 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">3. range</span>
              <p className="text-slate-400 font-sans">Index Range Scan. Seeks start key and traverses siblings.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-900/50 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">4. ref</span>
              <p className="text-slate-400 font-sans">Non-Unique Seek. Direct B-Tree seek for matching keys.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-900/50 space-y-1">
              <span className="text-indigo-300 font-bold block text-sm">5. eq_ref</span>
              <p className="text-slate-400 font-sans">Unique Join Lookup. Exactly 1 row matched per outer row.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-900/50 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">6. const</span>
              <p className="text-slate-400 font-sans">Constant Point Seek. PK / Unique lookup. Instantaneous.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Diagnostics Flow & SARGability B-Tree Search
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How non-SARGable expressions destroy B-Tree efficiency.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: SARGability Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Non-SARGable Full Scan vs SARGable B-Tree Seek
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 180" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Non-SARGable Box */}
                  <g>
                    <rect x="20" y="25" width="380" height="130" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="210" y="50" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">❌ Non-SARGable: WHERE YEAR(created_at) = 2026</text>
                    <rect x="40" y="65" width="340" height="35" rx="4" fill="#0f172a" />
                    <text x="210" y="87" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">Evaluates YEAR() on all 500,000 rows!</text>
                    <text x="210" y="130" fill="#fca5a5" fontSize="9 font-bold" textAnchor="middle">Full Table Scan: 31,250 Disk Pages Read (2.4s)</text>
                  </g>

                  {/* SARGable Box */}
                  <g>
                    <rect x="440" y="25" width="390" height="130" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="635" y="50" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ SARGable: WHERE created_at &gt;= '2026-01-01'</text>
                    <rect x="460" y="65" width="350" height="35" rx="4" fill="#022c22" />
                    <text x="635" y="87" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Seeks B-Tree Root → Leaf Range in 3 Hops!</text>
                    <text x="635" y="130" fill="#34d399" fontSize="9 font-bold" textAnchor="middle">Range Index Seek: 4 Disk Pages Read (2.1ms)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Diagnostic Protocol */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Production Slow Query Triage Protocol
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 140" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="25" width="180" height="80" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="50" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Slow Query Log</text>
                    <text x="110" y="75" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Queries &gt; 0.5s Logged</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="235" y="25" width="180" height="80" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="325" y="50" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. EXPLAIN ANALYZE</text>
                    <text x="325" y="75" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Inspect type, rows, Extra</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="450" y="25" width="180" height="80" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="540" y="50" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. Diagnose Root Cause</text>
                    <text x="540" y="75" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">ALL / filesort / Non-SARG</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="660" y="25" width="170" height="80" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="745" y="50" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Index & Refactor</text>
                    <text x="745" y="75" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Covering Index Created</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 200 65 L 235 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 415 65 L 450 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 630 65 L 660 65" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Slow Query Tuning Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect before-and-after query optimizations and audit disk page reductions.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(tuningScenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Scenario" : "○ Run Diagnosis"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{tuningScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{tuningScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Performance Profiler
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>EXPLAIN Profiling & Query Refactoring</span>
                <span className="text-emerald-400">Benchmark Audit</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {tuningScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Performance Metric</th>
                    <th className="py-3 px-4 text-rose-400">Before Tuning (Unindexed)</th>
                    <th className="py-3 px-4 text-emerald-400">After Tuning (Refactored)</th>
                    <th className="py-3 px-4 text-cyan-400">Performance Impact</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {tuningScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                      <td className="py-3 px-4 text-rose-300">{row.before}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.after}</td>
                      <td className="py-3 px-4 text-cyan-300 font-sans">{row.impact}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world query latency fixes from enterprise databases.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Fixing String-to-Int Implicit Type Conversion on Aadhaar Lookups
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Healthcare Reception DB</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui discovers receptionists experiencing 3-second UI hangs when searching patients by Aadhaar. The application passed Aadhaar as an integer instead of a quoted string, causing MySQL to perform implicit type conversion and full table scans on all 2,000,000 rows! Quoting the string restored instant $O(\log N)$ point lookups!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Implicit type conversion (Scans 2M rows in 3,200ms):
SELECT patient_id, first_name FROM patients WHERE aadhaar_number = 123456789012;

-- ✅ Quoted string (Point seek in 0.6ms):
SELECT patient_id, first_name FROM patients WHERE aadhaar_number = '123456789012';`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid indexing anti-patterns and write amplification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Leading Wildcard LIKE Searches
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">LIKE '%react'</code> prevents B-Tree index traversal because the leading characters are unknown, forcing a full table scan.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use trailing wildcards <code className="text-emerald-400 font-mono">LIKE 'react%'</code> or Fulltext indexing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> The (Equality, Range, Sort) Column Formula
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When designing composite indexes for complex queries, always sequence columns in the order: 1) Equality filter columns, 2) Range filter columns, 3) ORDER BY columns.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes active key_len byte usage and eliminates filesort.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for query tuning technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Tuning Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Inspect queries with <code className="text-cyan-300 font-mono">EXPLAIN ANALYZE</code> before touching indexes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Refactor non-SARGable functions out of WHERE clauses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Eliminate <code className="text-rose-300 font-mono">Using filesort</code> with properly ordered composite indexes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Build covering indexes to achieve <code className="text-emerald-300 font-mono">Using index</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Invisible Indexes before dropping...”</span>
                  Never drop an index directly in production! Make it invisible first with <code className="text-cyan-300 font-mono">ALTER TABLE t ALTER INDEX idx INVISIBLE;</code> to verify if any queries slow down!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Cardinality & ANALYZE TABLE...”</span>
                  If MySQL picks the wrong index, run <code className="text-cyan-300 font-mono">ANALYZE TABLE</code> to refresh index cardinality statistics before adding index hints!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering slow query debugging, EXPLAIN ANALYZE, SARGability, filesort elimination, and covering index design.
            </p>
          </div>

          <FAQTemplate
            title="Slow Query Debugging FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Debugging Slow Queries and Identifying Missing Indexes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Never guess why a query is slow — let EXPLAIN tell you the mathematical truth! The two most common slow query killers in production are: 1) Wrapping date columns in YEAR() or DATE(), which forces a full table scan, and 2) Missing composite indexes on filter + ORDER BY columns, causing high CPU filesort spikes. Teach your students the (Equality, Range, Sort) formula and they will write lightning-fast SQL for life."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
