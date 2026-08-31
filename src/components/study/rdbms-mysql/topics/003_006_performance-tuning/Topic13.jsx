import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Profiling Query Execution with Performance Schema and SHOW PROFILE
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and profiling workbench on MySQL Performance Schema & sys schema: stage-by-stage query profiling, picosecond timer conversions, detecting Sending Data / Sorting / Temp Table stage bottlenecks, and diagnosing lock waits.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedProfilingMode, setSelectedProfilingMode] = useState("table_scan_stages");

  const profilingScenarios = {
    table_scan_stages: {
      title: "1. Profiling a Full Table Scan: Heavy 'Sending data' Stage (94% of Total Time)",
      badge: "Sending Data Bottleneck",
      badgeColor: "rose",
      sqlQuery: `-- 🛠️ PROFILING QUERY STAGES VIA PERFORMANCE SCHEMA:
-- Query under test (Unindexed column filter scanning 200,000 rows):
SELECT student_id, name, registration_date 
FROM student_records 
WHERE unindexed_address LIKE '%Barrackpore%';

-- 📋 STAGE BREAKDOWN QUERY:
SELECT 
    event_name, 
    format_pico_time(timer_wait) AS duration,
    ROUND((timer_wait / (SELECT timer_wait FROM performance_schema.events_statements_history_long ORDER BY timer_start DESC LIMIT 1)) * 100, 1) AS pct_time
FROM performance_schema.events_stages_history_long 
WHERE nesting_event_id = @last_statement_id 
ORDER BY timer_start ASC;

-- 📊 EXECUTION STAGE REPORT:
-- stage/sql/init                  : 12.5 us  ( 0.1%)
-- stage/sql/checking permissions  :  4.2 us  ( 0.0%)
-- stage/sql/Opening tables        : 35.1 us  ( 0.2%)
-- stage/sql/Optimizing            : 48.0 us  ( 0.3%)
-- stage/sql/statistics            : 22.4 us  ( 0.1%)
-- stage/sql/preparing             : 18.0 us  ( 0.1%)
-- stage/sql/executing             :  8.5 us  ( 0.0%)
-- stage/sql/Sending data          : 74.2 ms  (94.5%) 🚨 (200,000 row disk scan!)
-- stage/sql/end                   : 15.0 us  ( 0.1%)
-- stage/sql/closing tables        : 25.0 us  ( 0.2%)`,
      resultRows: [
        {
          stageName: "stage/sql/Sending data",
          duration: "74.20 ms 🚨",
          percentage: "94.5% of Total Time",
          hardwareResource: "Disk / Buffer Pool Table Scan",
          status: "Physical Row Read Bottleneck ❌"
        },
        {
          stageName: "stage/sql/Optimizing",
          duration: "0.048 ms",
          percentage: "0.3%",
          hardwareResource: "CPU (CBO Cost Formulas)",
          status: "Instant Normal Stage ✅"
        },
        {
          stageName: "stage/sql/Opening tables",
          duration: "0.035 ms",
          percentage: "0.2%",
          hardwareResource: "Table Cache Memory",
          status: "Cached Normal Stage ✅"
        }
      ],
      explanation:
        "The stage profiler proves that 94.5% of total query latency is spent inside `stage/sql/Sending data`. This confirms the bottleneck is physical row reading from the storage engine (a Full Table Scan). Adding a B+Tree index will drop this stage from 74.2ms to 0.15ms!"
    },
    sorting_filesort_stages: {
      title: "2. Profiling ORDER BY: Heavy 'Creating sort index' Stage (86% of Total Time)",
      badge: "Sort Index / Filesort",
      badgeColor: "amber",
      sqlQuery: `-- 🛠️ PROFILING QUERY STAGES VIA PERFORMANCE SCHEMA:
-- Query under test (Unindexed ORDER BY gpa DESC on 100,000 active students):
SELECT student_id, name, city, gpa 
FROM student_records 
WHERE city = 'Kolkata' 
ORDER BY gpa DESC;

-- 📊 EXECUTION STAGE REPORT:
-- stage/sql/init                  : 14.0 us  ( 0.1%)
-- stage/sql/Opening tables        : 28.0 us  ( 0.1%)
-- stage/sql/Optimizing            : 52.0 us  ( 0.2%)
-- stage/sql/Sending data          :  4.2 ms  (12.5%) (Reads rows into sort buffer)
-- stage/sql/Creating sort index   : 28.5 ms  (86.2%) 🚨 (Spills sort merge to disk!)
-- stage/sql/end                   : 18.0 us  ( 0.1%)

-- ⚡ ARCHITECTURAL INSIGHT:
-- 'Creating sort index' consumed 86.2% of the total 33ms execution!
-- Cause: Using filesort without a pre-ordered composite index (city, gpa DESC).`,
      resultRows: [
        {
          stageName: "stage/sql/Creating sort index",
          duration: "28.50 ms 🚨",
          percentage: "86.2% of Total Time",
          hardwareResource: "Sort Buffer & Disk Merge Passes",
          status: "Unindexed Filesort Bottleneck ❌"
        },
        {
          stageName: "stage/sql/Sending data",
          duration: "4.20 ms",
          percentage: "12.5%",
          hardwareResource: "Row Extraction to RAM",
          status: "Index Filtered Scan"
        }
      ],
      explanation:
        "Stage telemetry clearly shows that `stage/sql/Creating sort index` dominates the query runtime. Creating a composite index on `(city, gpa DESC)` satisfies the sorting order directly from the B+Tree leaves, completely eliminating the 'Creating sort index' stage!"
    },
    temp_table_stages: {
      title: "3. Profiling Aggregation: Heavy 'Creating tmp table' Stage (78% of Total Time)",
      badge: "Tmp Table Materialization",
      badgeColor: "cyan",
      sqlQuery: `-- 🛠️ PROFILING QUERY STAGES VIA PERFORMANCE SCHEMA:
-- Query under test (Complex multi-table DISTINCT with unindexed GROUP BY):
SELECT DISTINCT s.city, d.name AS dept_name, AVG(e.fee_paid_inr) 
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.city, d.name;

-- 📊 EXECUTION STAGE REPORT:
-- stage/sql/Opening tables        : 45.0 us  ( 0.1%)
-- stage/sql/Optimizing            : 60.0 us  ( 0.2%)
-- stage/sql/Creating tmp table    : 42.0 ms  (78.5%) 🚨 (Materializes 50k rows in disk tmp table!)
-- stage/sql/Sending data          :  8.5 ms  (15.8%)
-- stage/sql/Removing tmp table    :  2.8 ms  ( 5.2%)

-- ⚡ ARCHITECTURAL INSIGHT:
-- 78.5% of time was spent materializing an intermediate temporary table on disk.`,
      resultRows: [
        {
          stageName: "stage/sql/Creating tmp table",
          duration: "42.00 ms 🚨",
          percentage: "78.5% of Total Time",
          hardwareResource: "Tmp Table (tmp_table_size exceeded)",
          status: "Disk Temporary Table Spill ❌"
        },
        {
          stageName: "stage/sql/Sending data",
          duration: "8.50 ms",
          percentage: "15.8%",
          hardwareResource: "Streaming Aggregated Rows",
          status: "Normal Data Pipeline"
        }
      ],
      explanation:
        "When queries contain disjoint `GROUP BY` and `DISTINCT` across multiple tables, MySQL creates an internal temporary table. Profiling reveals that disk materialization (`Creating tmp table`) is the culprit, guiding engineers to pre-aggregate via CTEs or increase `tmp_table_size`."
    },
    lock_wait_stages: {
      title: "4. Profiling Lock Contention: Heavy 'wait/io/table/sql/handler' (92% Waiting)",
      badge: "Lock / Handler Wait",
      badgeColor: "emerald",
      sqlQuery: `-- 🛠️ PROFILING LOW-LEVEL WAIT EVENTS VIA PERFORMANCE SCHEMA:
-- Query under test (Transaction update blocked by concurrent batch job):
UPDATE student_ledgers 
SET fee_paid_inr = fee_paid_inr + 5000 
WHERE student_id = 105;

-- 📋 LOW-LEVEL WAIT EVENT REPORT:
-- SELECT event_name, format_pico_time(timer_wait) FROM events_waits_history_long;
--
-- wait/synch/mutex/innodb/trx_mutex        :  15.0 us  ( 0.1%)
-- wait/io/file/innodb/innodb_data_file     : 120.0 us  ( 0.5%)
-- wait/lock/table/sql/handler              : 3.85 sec  (92.0%) 🚨 (Row Exclusive Lock Blocked!)
-- stage/sql/updating                       :  0.25 ms  ( 0.1%)

-- ⚡ ARCHITECTURAL INSIGHT:
-- Actual execution logic took 0.25 ms! 3.85 seconds were spent waiting for a transaction row lock!`,
      resultRows: [
        {
          stageName: "wait/lock/table/sql/handler",
          duration: "3,850.00 ms (3.85s) 🚨",
          percentage: "92.0% of Total Time",
          hardwareResource: "InnoDB Row Lock Contention",
          status: "Blocked by Concurrent Trx ❌"
        },
        {
          stageName: "stage/sql/updating",
          duration: "0.25 ms",
          percentage: "0.1%",
          hardwareResource: "In-Memory Row Update",
          status: "Instant Execution Logic ✅"
        }
      ],
      explanation:
        "Wait profiling reveals that the query execution engine is blazingly fast (0.25ms), but was forced to sleep for 3.85 seconds waiting for an exclusive row lock held by another uncommitted transaction."
    }
  };

  const navItems = [
    { id: "profiling-overview", label: "1. Profiling Architecture" },
    { id: "show-profile-vs-ps", label: "2. SHOW PROFILE vs Performance Schema" },
    { id: "svg-architecture", label: "3. Visual Stage Execution Diagrams" },
    { id: "interactive-workbench", label: "4. Live Profiling Workbench" },
    { id: "sys-schema-views", label: "5. Essential sys Schema Views" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "10. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 13 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Microscopic Telemetry &amp; Profiling
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Profiling Query Execution with Performance Schema &amp; sys Schema
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Deconstruct query execution into exact microscopic stages: measure microsecond latencies across <code className="text-cyan-400 font-mono">Sending data</code>, <code className="text-amber-400 font-mono">Creating sort index</code>, <code className="text-rose-400 font-mono">Creating tmp table</code>, and <code className="text-emerald-400 font-mono">Lock waits</code> using modern Performance Schema and <code className="text-indigo-300 font-mono">sys</code> views.
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
        {/* SECTION 1: Profiling Architecture */}
        <section id="profiling-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Microscopic Architecture of MySQL Profiling
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why EXPLAIN tells you the plan, but Performance Schema tells you where time was actually spent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Instruments
              </span>
              <h3 className="font-bold text-white text-base">Code Probe Points</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instruments are embedded hooks in MySQL's C++ source code that measure execution stages (`stage/sql/%`), statement events (`statement/%`), and mutex/lock waits (`wait/%`).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Consumers
              </span>
              <h3 className="font-bold text-white text-base">In-Memory Buffers</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Consumers store captured event telemetry in ring buffers in RAM (`events_statements_history_long`, `events_stages_history_long`), ensuring non-blocking execution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                The sys Schema
              </span>
              <h3 className="font-bold text-white text-base">Human Diagnostics</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The `sys` schema provides formatted views (converting picoseconds to ms/seconds and bytes to MB) to inspect full table scans, sorting bottlenecks, and memory allocations instantly.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SHOW PROFILE vs Performance Schema */}
        <section id="show-profile-vs-ps" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. SHOW PROFILE (Deprecated) vs Modern Performance Schema
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why database architects migrated to the Performance Schema.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Feature Dimension</th>
                  <th className="py-3 px-4 text-amber-300">Legacy SHOW PROFILE (MySQL 5.6-)</th>
                  <th className="py-3 px-4 text-emerald-400">Modern Performance Schema (MySQL 8.0+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Status</td>
                  <td className="py-3 px-4 text-rose-400">Deprecated / Removed</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Standard Enterprise Telemetry</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Thread Scope</td>
                  <td className="py-3 px-4 text-amber-300">Single session thread only</td>
                  <td className="py-3 px-4 text-emerald-300">All session threads + background I/O threads</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Timer Precision</td>
                  <td className="py-3 px-4 text-amber-300">Microseconds ($10^{-6}$ s)</td>
                  <td className="py-3 px-4 text-emerald-300">Picoseconds ($10^{-12}$ s)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Lock &amp; Wait Telemetry</td>
                  <td className="py-3 px-4 text-slate-500">Not Available</td>
                  <td className="py-3 px-4 text-emerald-300">Full InnoDB lock waits &amp; file I/O latency</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Memory Allocation</td>
                  <td className="py-3 px-4 text-slate-500">Not Available</td>
                  <td className="py-3 px-4 text-emerald-300">Subsystem &amp; thread byte allocation tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Stage Execution Diagrams */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Query Execution Stage Timeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Deconstructing a query execution lifecycle into discrete microsecond stages.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Query Execution Stage Timeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 13.1: MySQL Query Execution Stages &amp; Microsecond Stage Latencies
                </h3>
                <span className="text-xs text-slate-400 font-mono">Stage Profiler</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 360"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradProfGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradProfRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                  </defs>

                  {/* Stage Sequence Line */}
                  <line x1="50" y1="180" x2="900" y2="180" stroke="#334155" strokeWidth="3" />

                  {/* Stage 1: Init */}
                  <circle cx="80" cy="180" r="14" fill="#0284c7" />
                  <text x="80" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>
                  <rect x="25" y="100" width="110" height="50" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="80" y="120" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">stage/sql/init</text>
                  <text x="80" y="138" fill="#94a3b8" fontSize="9" textAnchor="middle">12.5 us (0.1%)</text>

                  {/* Stage 2: Optimizing */}
                  <circle cx="230" cy="180" r="14" fill="#0284c7" />
                  <text x="230" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
                  <rect x="175" y="210" width="110" height="50" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="230" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">stage/Optimizing</text>
                  <text x="230" y="248" fill="#94a3b8" fontSize="9" textAnchor="middle">48.0 us (0.3%)</text>

                  {/* Stage 3: statistics */}
                  <circle cx="380" cy="180" r="14" fill="#0284c7" />
                  <text x="380" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3</text>
                  <rect x="325" y="100" width="110" height="50" rx="6" fill="#0f172a" stroke="#0284c7" />
                  <text x="380" y="120" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">stage/statistics</text>
                  <text x="380" y="138" fill="#94a3b8" fontSize="9" textAnchor="middle">22.4 us (0.1%)</text>

                  {/* Stage 4: Sending Data (BOTTLENECK) */}
                  <circle cx="580" cy="180" r="22" fill="#e11d48" stroke="#fecdd3" strokeWidth="2" />
                  <text x="580" y="185" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
                  <rect x="475" y="210" width="210" height="70" rx="8" fill="url(#gradProfRed)" />
                  <text x="580" y="235" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    stage/sql/Sending data 🚨
                  </text>
                  <text x="580" y="255" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    74.20 ms (94.5% of total time!)
                  </text>
                  <text x="580" y="270" fill="#ffffff" fontSize="8" textAnchor="middle">
                    200,000-Row Physical Table Scan
                  </text>

                  {/* Stage 5: End */}
                  <circle cx="820" cy="180" r="14" fill="#10b981" />
                  <text x="820" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">5</text>
                  <rect x="765" y="100" width="110" height="50" rx="6" fill="#0f172a" stroke="#10b981" />
                  <text x="820" y="120" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">stage/sql/end</text>
                  <text x="820" y="138" fill="#a7f3d0" fontSize="9" textAnchor="middle">15.0 us (0.1%)</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Profiling Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Query Stage Profiling Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between profiling scenarios to inspect stage durations, percentage allocations, and hardware bottlenecks.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(profilingScenarios).map((key) => {
              const scenario = profilingScenarios[key];
              const isSelected = selectedProfilingMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProfilingMode(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      scenario.badgeColor === "emerald" && "bg-emerald-400",
                      scenario.badgeColor === "cyan" && "bg-cyan-400",
                      scenario.badgeColor === "amber" && "bg-amber-400",
                      scenario.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{scenario.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Workbench Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {profilingScenarios[selectedProfilingMode].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  profilingScenarios[selectedProfilingMode].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  profilingScenarios[selectedProfilingMode].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  profilingScenarios[selectedProfilingMode].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  profilingScenarios[selectedProfilingMode].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {profilingScenarios[selectedProfilingMode].badge}
              </span>
            </div>

            {/* SQL Profiling Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Performance Schema Profiling Script &amp; Stage Report:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {profilingScenarios[selectedProfilingMode].sqlQuery}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Stage Metrics Breakdown:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Stage Name</th>
                      <th className="py-2.5 px-4">Stage Duration</th>
                      <th className="py-2.5 px-4">Time Ratio</th>
                      <th className="py-2.5 px-4">Hardware Component</th>
                      <th className="py-2.5 px-4">Diagnosis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {profilingScenarios[selectedProfilingMode].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.stageName}</td>
                        <td className="py-3 px-4 text-rose-400 font-bold">{row.duration}</td>
                        <td className="py-3 px-4 text-amber-300">{row.percentage}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.hardwareResource}</td>
                        <td className="py-3 px-4 text-slate-300 text-xs">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profilingScenarios[selectedProfilingMode].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Essential sys Schema Views */}
        <section id="sys-schema-views" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Essential sys Schema Diagnostic Views
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The primary pre-built diagnostic views every database engineer should query.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">1. Full Table Scans:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                SELECT * FROM sys.statements_with_full_table_scans LIMIT 5;
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Finds statement digests executing the highest number of unindexed table scans.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">2. P95 Latency Outliers:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                SELECT * FROM sys.statements_with_runtimes_in_95th_percentile;
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Identifies queries falling into the top 5% slowest response times.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">3. Disk Sorting Passes:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                SELECT * FROM sys.statements_with_sorting;
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Exposes queries causing heavy sort merge passes and memory spills.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">4. Active Session Inspector:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                SELECT thd_id, user, current_statement, last_wait FROM sys.session;
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">A modern, highly detailed replacement for SHOW PROCESSLIST.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Platforms
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world stage profiling solving critical production performance incidents.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Barrackpore Sorting Profiler */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 28ms "Creating sort index" in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Filesort Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Barrackpore student rank leaderboard, queries took 33ms. Stage profiling revealed that 28.5ms (86%) was spent inside `stage/sql/Creating sort index`. Creating a composite index on `(city, gpa DESC)` completely eradicated the stage, dropping execution time to 0.35ms!
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Composite Index Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Pre-ordered B+Tree leaf scan eliminates filesort completely:
CREATE INDEX idx_student_city_gpa ON student_records (city, gpa DESC);

-- Result: 'Creating sort index' stage duration drops to 0.00 us! (95x faster)`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata ₹ Billing Lock Isolation */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Isolating 3.85s Row Lock Wait on ₹ Ledger Updates
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Root Cause Isolated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Kolkata billing service, tuition fee updates stalled for 4 seconds. Developers initially suspected disk I/O, but Performance Schema wait events proved that the query logic was 0.25ms and 3.85s was spent blocked on `wait/lock/table/sql/handler` by a concurrent uncommitted transaction.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Lock Diagnosis:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Identified blocking transaction via sys.innodb_lock_waits:
SELECT waiting_query, blocking_query, blocking_trx_id FROM sys.innodb_lock_waits;

-- Fixed long transaction scope in billing worker; lock wait dropped to 0ms!`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous telemetry mistakes when profiling in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Over-Instrumenting Mutexes in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enabling all low-level mutex and lock instruments (`wait/synch/mutex/%`) can increase server CPU overhead by 5-10%. Stick to statement and stage instruments for standard profiling.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep mutex instrumentation disabled in production unless debugging race conditions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using Deprecated SHOW PROFILE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `SHOW PROFILE` has been deprecated since MySQL 5.6 and is removed in modern MySQL. Codebases relying on `SET profiling = 1` fail in modern production environments.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use Performance Schema and sys schema views for query profiling.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use sys.ps_truncate_all_tables()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Before executing a performance test or query tuning benchmark, reset historical metrics with <code className="text-cyan-300 font-mono">CALL sys.ps_truncate_all_tables(FALSE);</code> to isolate clean results.
              </p>
              <div className="text-xs text-slate-400">
                Ensures clean, unpolluted telemetry for before-and-after comparisons.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Inspect sys.schema_unused_indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Query `sys.schema_unused_indexes` quarterly to safely identify and drop redundant secondary indexes that slow down write operations without benefiting reads.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates write overhead and reduces Buffer Pool memory waste.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist &amp; Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for query profiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Profiling Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Sending data</strong> = High duration indicates physical row reading / table scan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Creating sort index</strong> = Indicates filesort overhead for `ORDER BY`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Creating tmp table</strong> = Indicates temporary table spill for `GROUP BY` / `DISTINCT`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">format_pico_time()</strong> = Converts raw picoseconds into human-readable ms/seconds.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe stage percentage allocations...”</span>
                  Always calculate the percentage of time each stage takes. If one stage (like `Sending data` or `Creating sort index`) accounts for 90%+ of runtime, that single stage is your entire optimization target!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about the sys schema first...”</span>
                  Don't struggle with raw Performance Schema tables. Query `sys.statements_with_full_table_scans` and `sys.statement_analysis` first for instant, formatted executive reports!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Performance Schema, stage profiling, sys schema, and wait events.
            </p>
          </div>

          <FAQTemplate
            title="Performance Schema & Profiling FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Profiling Query Execution with Performance Schema and SHOW PROFILE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="EXPLAIN is like looking at a road map before you start driving, but the Performance Schema is your high-speed GPS telemetry recording every single turn and red light along the journey! When a query in Barrackpore or Kolkata is slow, don't guess whether it's disk I/O, lock waiting, or memory sorting. Run the stage profiler: if `Sending data` is 90%, you need an index; if `Creating sort index` is 90%, you need an index for ordering; if `wait/lock` is 90%, you need to fix your transactions. Precision profiling turns database optimization from mystery into exact science!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
