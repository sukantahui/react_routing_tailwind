import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Analyzing the Slow Query Log and Identifying Top Heavy Queries with mysqldumpslow
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and diagnostic workbench on MySQL Slow Query Log: server configuration, microsecond thresholds, log parsing with mysqldumpslow, identifying high-frequency vs high-latency bottlenecks, and lock contention analysis.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedLogAnalysis, setSelectedLogAnalysis] = useState("total_execution_time");

  const logAnalysisScenarios = {
    total_execution_time: {
      title: "1. Top Slowest Queries by Cumulative Total Time (mysqldumpslow -s t -t 5)",
      badge: "Sort by Total Time (-s t)",
      badgeColor: "emerald",
      sqlQuery: `-- 🛠️ RUNNING MYSQLDUMPSLOW CLI COMMAND:
-- Sorts slow query log by cumulative execution time (-s t) and shows top 5 query digests (-t 5):
$ mysqldumpslow -s t -t 5 /var/log/mysql/mysql-slow.log

-- 📋 PARSED REPORT OUTPUT:
-- Reading mysql slow query log from /var/log/mysql/mysql-slow.log
-- Count: 1450  Time=4.82s (6989s)  Lock=0.00s (0s)  Rows=25.0 (36250), app_user[app_user]@localhost
-- SELECT student_id, name, address FROM student_records WHERE address LIKE 'S';

-- Count: 3200  Time=1.85s (5920s)  Lock=0.02s (64s) Rows=1.0 (3200), app_user[app_user]@app_srv
-- SELECT * FROM student_admissions WHERE YEAR(registration_date) = N;

-- ⚡ ARCHITECTURAL INSIGHT:
-- Query 1 consumed 6,989 cumulative seconds of server CPU time due to leading wildcard table scan!
-- Query 2 consumed 5,920 cumulative seconds due to non-sargable YEAR() function!`,
      resultRows: [
        {
          rank: "#1 Cumulative Heavy",
          queryDigest: "SELECT ... WHERE address LIKE 'S'",
          execCount: "1,450 runs",
          avgTime: "4.82 sec",
          totalTime: "6,989 sec 🚨",
          rowsExamined: "500,000 avg",
          status: "Top Optimization Target ❌"
        },
        {
          rank: "#2 Cumulative Heavy",
          queryDigest: "SELECT ... WHERE YEAR(reg_date) = N",
          execCount: "3,200 runs",
          avgTime: "1.85 sec",
          totalTime: "5,920 sec 🚨",
          rowsExamined: "200,000 avg",
          status: "Non-Sargable Scan ❌"
        }
      ],
      explanation:
        "Sorting by total execution time (`-s t`) identifies the query templates that consumed the absolute most cumulative CPU and disk I/O on the server. Optimizing these top 2 queries recovers over 3.5 hours of wasted server compute time every single day!"
    },
    frequency_high_count: {
      title: "2. High-Frequency Micro-Bottlenecks (mysqldumpslow -s c -t 5)",
      badge: "Sort by Count (-s c)",
      badgeColor: "cyan",
      sqlQuery: `-- 🛠️ RUNNING MYSQLDUMPSLOW CLI COMMAND:
-- Sorts by execution count (-s c) to detect "death by a thousand cuts" queries:
$ mysqldumpslow -s c -t 5 /var/log/mysql/mysql-slow.log

-- 📋 PARSED REPORT OUTPUT:
-- Count: 48500  Time=0.12s (5820s)  Lock=0.00s (0s) Rows=1.0 (48500), web_user@web_node1
-- SELECT student_id, name, city FROM student_records WHERE phone_number = N;

-- ⚡ ARCHITECTURAL INSIGHT:
-- This query only takes 120 ms (0.12s) per execution, but runs 48,500 times per hour!
-- Cause: Implicit type casting on VARCHAR phone_number column (unquoted N).
-- Impact: 5,820 seconds of wasted CPU per hour! Fixing type quotes saves 99% of database load!`,
      resultRows: [
        {
          rank: "#1 High-Frequency",
          queryDigest: "SELECT ... WHERE phone_number = N",
          execCount: "48,500 runs 🚨",
          avgTime: "0.12 sec (120ms)",
          totalTime: "5,820 sec 🚨",
          rowsExamined: "100,000 avg",
          status: "Death by 1,000 Cuts ❌"
        },
        {
          rank: "#2 High-Frequency",
          queryDigest: "SELECT ... WHERE status = 'S' ORDER BY id",
          execCount: "18,200 runs",
          avgTime: "0.08 sec (80ms)",
          totalTime: "1,456 sec",
          rowsExamined: "25,000 avg",
          status: "Unindexed Sort ❌"
        }
      ],
      explanation:
        "Sorting by count (`-s c`) uncovers high-frequency queries that individually seem fast (120ms) but cumulatively exhaust server thread pools because they run dozens of times per second. Quoting the literal drops execution to 0.04ms and frees massive capacity."
    },
    unindexed_scans_ratio: {
      title: "3. Massive Rows Examined vs Sent Ratio (mysqldumpslow -s ar -t 5)",
      badge: "Sort by Avg Rows (-s ar)",
      badgeColor: "amber",
      sqlQuery: `-- 🛠️ RUNNING MYSQLDUMPSLOW CLI COMMAND:
-- Sorts by average rows examined (-s ar) to expose extreme scan inefficiencies:
$ mysqldumpslow -s ar -t 5 /var/log/mysql/mysql-slow.log

-- 📋 PARSED REPORT OUTPUT:
-- Count: 250  Time=3.10s (775s)  Lock=0.00s (0s) Rows=1.0 (250), api_client@app_host
-- SELECT student_id, balance_fee FROM student_records WHERE unindexed_pin_code = N;

-- ⚡ ARCHITECTURAL INSIGHT:
-- Examined: 500,000 rows | Sent: 1 row! (Ratio: 500,000:1 🚨)
-- The storage engine scans half a million physical records to return a single student row!
-- Adding a single B+Tree index on 'pin_code' cuts rows examined from 500,000 -> 1!`,
      resultRows: [
        {
          rank: "#1 Worst Scan Ratio",
          queryDigest: "SELECT ... WHERE unindexed_pin_code = N",
          execCount: "250 runs",
          avgTime: "3.10 sec",
          totalTime: "775 sec",
          rowsExamined: "500,000 rows per run 🚨",
          status: "500,000:1 Ratio (Missing Index) ❌"
        }
      ],
      explanation:
        "Sorting by average rows examined (`-s ar`) instantly pinpoints queries suffering from missing indexes. A query examining 500,000 rows to return 1 row wastes disk bandwidth and evicts cached application pages from the Buffer Pool."
    },
    lock_contention_analysis: {
      title: "4. Heavy Lock Contention Analysis (mysqldumpslow -s al -t 5)",
      badge: "Sort by Avg Lock (-s al)",
      badgeColor: "rose",
      sqlQuery: `-- 🛠️ RUNNING MYSQLDUMPSLOW CLI COMMAND:
-- Sorts by average lock wait time (-s al) to pinpoint transaction blocking:
$ mysqldumpslow -s al -t 5 /var/log/mysql/mysql-slow.log

-- 📋 PARSED REPORT OUTPUT:
-- Count: 120  Time=5.20s (624s)  Lock=4.95s (594s) Rows=1.0 (120), cashier@portal
-- UPDATE student_ledgers SET fee_paid_inr = fee_paid_inr + N WHERE student_id = N;

-- ⚡ ARCHITECTURAL INSIGHT:
-- Total Execution Time = 5.20 sec | Lock Wait Time = 4.95 sec (95% spent waiting!)
-- The actual SQL execution took only 0.25 sec, but spent 4.95 seconds blocked waiting for locks!
-- Cause: Long-running batch transactions holding uncommitted exclusive locks on rows!`,
      resultRows: [
        {
          rank: "#1 Lock Bottleneck",
          queryDigest: "UPDATE student_ledgers SET fee_paid_inr = ...",
          execCount: "120 runs",
          avgTime: "5.20 sec",
          totalTime: "624 sec",
          rowsExamined: "4.95 sec Lock Wait (95%) 🚨",
          status: "Transaction Lock Blocker ❌"
        }
      ],
      explanation:
        "Sorting by average lock time (`-s al`) separates slow SQL from transaction blocking. When `Lock_time` accounts for 90%+ of total query time, the solution is not adding indexes, but shortening long-running write transactions and committing sooner."
    }
  };

  const navItems = [
    { id: "slow-log-config", label: "1. Slow Query Log Configuration" },
    { id: "log-anatomy", label: "2. Log Entry Anatomy" },
    { id: "svg-architecture", label: "3. Diagnostic Pipelines" },
    { id: "interactive-workbench", label: "4. Live mysqldumpslow Workbench" },
    { id: "sorting-flags", label: "5. Essential CLI Sorting Flags" },
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
            <span>Topic 12 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Diagnostics &amp; Log Analysis
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Analyzing the Slow Query Log with mysqldumpslow
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master production performance diagnostics: configure microsecond thresholds in the MySQL Slow Query Log, parse raw log streams with <code className="text-cyan-400 font-mono">mysqldumpslow</code>, and prioritize optimizations across cumulative execution time, execution frequency, and lock contention.
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
        {/* SECTION 1: Slow Query Log Configuration */}
        <section id="slow-log-config" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Enabling &amp; Configuring the MySQL Slow Query Log
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Runtime and configuration parameters for precision telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Threshold Variable
              </span>
              <h3 className="font-bold text-white text-base">long_query_time = 0.5</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specified in seconds with microsecond floating-point precision (e.g. `0.1` for 100ms or `0.05` for 50ms). Logs any statement exceeding this execution duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Unindexed Safety
              </span>
              <h3 className="font-bold text-white text-base">log_queries_not_using_indexes</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When enabled, captures full table scans (`ALL`) regardless of execution time. Combined with `min_examined_row_limit = 100` to filter tiny lookup tables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Log Throttling
              </span>
              <h3 className="font-bold text-white text-base">log_throttle_queries</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Caps how many unindexed query entries are written to disk per minute (e.g. `60`), protecting server disk space from sudden log flooding.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Log Entry Anatomy */}
        <section id="log-anatomy" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Anatomy of a Slow Query Log Entry
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Deciphering header timestamps, execution metrics, and examined row ratios.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
{`# Time: 2026-08-25T11:00:00.123456Z
# User@Host: app_user[app_user] @ app_server [192.168.1.50]  Id: 450
# Query_time: 4.821035  Lock_time: 0.000120  Rows_sent: 20  Rows_examined: 500000
SET timestamp=1787654400;
SELECT student_id, name, city, balance_fee 
FROM student_records 
WHERE address LIKE '%Ichapur%';`}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Query_time: 4.82s</span>
                Total execution duration in seconds.
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">Lock_time: 0.0001s</span>
                Time spent waiting for table/row locks.
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Rows_sent: 20</span>
                Actual matching rows returned to client.
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Rows_examined: 500,000</span>
                Physical rows scanned across disk pages.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Visual Architecture Diagrams */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Slow Log Aggregation Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How mysqldumpslow abstracts query parameters to generate actionable prioritized digests.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Slow Log Aggregation Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 12.1: The Slow Query Log Aggregation Pipeline (mysqldumpslow)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Telemetry &amp; Diagnostics</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 360"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradSlowGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradSlowBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e7490" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <marker id="arrowSlowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                    </marker>
                    <marker id="arrowSlowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                  </defs>

                  {/* Stage 1: MySQL Server Logger */}
                  <rect x="30" y="40" width="240" height="280" rx="8" fill="#0f172a" stroke="#64748b" />
                  <text x="150" y="70" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                    1. MySQL Server Engine
                  </text>
                  <text x="150" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    long_query_time = 0.5s
                  </text>

                  <rect x="50" y="115" width="200" height="40" rx="4" fill="#1e293b" stroke="#f43f5e" />
                  <text x="150" y="140" fill="#fca5a5" fontSize="10" textAnchor="middle">Query: WHERE id = 101 (4.2s)</text>

                  <rect x="50" y="165" width="200" height="40" rx="4" fill="#1e293b" stroke="#f43f5e" />
                  <text x="150" y="190" fill="#fca5a5" fontSize="10" textAnchor="middle">Query: WHERE id = 890 (5.1s)</text>

                  <rect x="50" y="215" width="200" height="40" rx="4" fill="#1e293b" stroke="#f43f5e" />
                  <text x="150" y="240" fill="#fca5a5" fontSize="10" textAnchor="middle">Query: WHERE id = 345 (4.8s)</text>

                  <text x="150" y="290" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    10,000+ Raw Log Lines!
                  </text>

                  {/* Arrow 1 */}
                  <line x1="270" y1="180" x2="330" y2="180" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowSlowBlue)" />

                  {/* Stage 2: mysqldumpslow Parser */}
                  <rect x="330" y="40" width="270" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="465" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    2. mysqldumpslow Parser
                  </text>
                  <text x="465" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Abstracts Numbers &rarr; N | Strings &rarr; 'S'
                  </text>

                  <rect x="350" y="120" width="230" height="60" rx="6" fill="#1e293b" stroke="#0284c7" />
                  <text x="465" y="145" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Canonical Template:
                  </text>
                  <text x="465" y="165" fill="#38bdf8" fontSize="10" textAnchor="middle">
                    WHERE id = N AND city = 'S'
                  </text>

                  <rect x="350" y="200" width="230" height="60" rx="6" fill="#1e293b" stroke="#0284c7" />
                  <text x="465" y="225" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Metric Sorting Flags:
                  </text>
                  <text x="465" y="245" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                    -s t (Time) | -s c (Count) | -s ar (Rows)
                  </text>

                  {/* Arrow 2 */}
                  <line x1="600" y1="180" x2="660" y2="180" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowSlowGreen)" />

                  {/* Stage 3: Prioritized Action Plan */}
                  <rect x="660" y="40" width="260" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="790" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    3. Prioritized Action Matrix
                  </text>
                  <text x="790" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Top 5 Heavy Optimization Targets
                  </text>

                  <rect x="680" y="115" width="220" height="45" rx="4" fill="url(#gradSlowGreen)" />
                  <text x="790" y="135" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    #1: 6,989s Total Time (Missing Index)
                  </text>
                  <text x="790" y="150" fill="#ecfdf5" fontSize="8" textAnchor="middle">
                    Action: Add B+Tree Covering Index
                  </text>

                  <rect x="680" y="170" width="220" height="45" rx="4" fill="url(#gradSlowGreen)" />
                  <text x="790" y="190" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    #2: 48,500 Executions (Type Cast)
                  </text>
                  <text x="790" y="205" fill="#ecfdf5" fontSize="8" textAnchor="middle">
                    Action: Add quotes to string literal
                  </text>

                  <rect x="680" y="225" width="220" height="45" rx="4" fill="url(#gradSlowGreen)" />
                  <text x="790" y="245" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    #3: 4.95s Lock Wait (Contention)
                  </text>
                  <text x="790" y="260" fill="#ecfdf5" fontSize="8" textAnchor="middle">
                    Action: Commit write transactions sooner
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live mysqldumpslow Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive mysqldumpslow Report Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between analysis modes to inspect parsed CLI outputs, execution metrics, and actionable fixes.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(logAnalysisScenarios).map((key) => {
              const scenario = logAnalysisScenarios[key];
              const isSelected = selectedLogAnalysis === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLogAnalysis(key)}
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
                {logAnalysisScenarios[selectedLogAnalysis].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  logAnalysisScenarios[selectedLogAnalysis].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  logAnalysisScenarios[selectedLogAnalysis].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  logAnalysisScenarios[selectedLogAnalysis].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  logAnalysisScenarios[selectedLogAnalysis].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {logAnalysisScenarios[selectedLogAnalysis].badge}
              </span>
            </div>

            {/* CLI Command & Report Output */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CLI Command &amp; Parsed Slow Log Output:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {logAnalysisScenarios[selectedLogAnalysis].sqlQuery}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Summary Digest Breakdown:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Priority Rank</th>
                      <th className="py-2.5 px-4">Query Template</th>
                      <th className="py-2.5 px-4">Exec Count</th>
                      <th className="py-2.5 px-4">Avg Latency</th>
                      <th className="py-2.5 px-4">Total Time</th>
                      <th className="py-2.5 px-4">Rows / Lock Detail</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {logAnalysisScenarios[selectedLogAnalysis].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.rank}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.queryDigest}</td>
                        <td className="py-3 px-4 text-amber-300">{row.execCount}</td>
                        <td className="py-3 px-4 text-slate-300">{row.avgTime}</td>
                        <td className="py-3 px-4 font-bold text-rose-400">{row.totalTime}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{row.rowsExamined}</td>
                        <td className="py-3 px-4 text-xs">{row.status}</td>
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
                {logAnalysisScenarios[selectedLogAnalysis].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Essential CLI Sorting Flags */}
        <section id="sorting-flags" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Essential mysqldumpslow CLI Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The standard toolkit commands for database performance profiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">1. Top 10 by Total Execution Time:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                mysqldumpslow -s t -t 10 /var/log/mysql/mysql-slow.log
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Finds the queries causing the most cumulative CPU load.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">2. Top 10 by Execution Frequency:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                mysqldumpslow -s c -t 10 /var/log/mysql/mysql-slow.log
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Finds high-frequency queries running thousands of times per hour.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">3. Top 10 by Average Rows Scanned:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                mysqldumpslow -s ar -t 10 /var/log/mysql/mysql-slow.log
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Finds queries scanning hundreds of thousands of unindexed rows.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">4. Grep Filter by Table Name:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                mysqldumpslow -s t -g "student_records" -t 5 slow.log
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">Filters the report to show only queries touching that table.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Jadavpur Platforms
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world telemetry analysis uncovering hidden production bottlenecks.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Barrackpore Portal */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Discovering 48,000 Implicit Casts in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  99% CPU Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During peak admission hours in Barrackpore, MySQL CPU hovered at 95%. Running <code className="text-cyan-400 font-mono">mysqldumpslow -s c -t 5</code> revealed that a single student verification query was executing 48,500 times per hour with an unquoted integer phone number literal, forcing 48,500 full table scans.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Telemetry-Driven Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Enforced string binding on candidate mobile lookup:
SELECT student_id, name FROM candidate_registrations WHERE mobile_no = '9830012345';

-- Result: CPU dropped from 95% -> 4%! Recovered 5,820s of compute time per hour!`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Jadavpur Ledger Lock Contention */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Diagnosing 4.95s Lock Contention on ₹ Fee Ledgers
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Lock Contention Resolved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Jadavpur accounting portal, fee payment updates were taking 5.2 seconds each. Running <code className="text-cyan-400 font-mono">mysqldumpslow -s al -t 5</code> showed that queries spent 4.95 seconds waiting for locks because a legacy batch script was holding uncommitted transactions open while calling a third-party payment gateway.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Transaction Architecture Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Moved third-party HTTP call outside the database transaction block!
-- Database transaction now opens, updates row in 2ms, and commits immediately!`}
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
              Avoid common administrative mistakes in slow query logging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving long_query_time = 10.0
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The legacy 10-second default threshold is completely useless for modern web applications. A 500ms query is devastating to an API, yet completely missed by a 10s filter.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Set long_query_time to 0.1s (100ms) or 0.5s (500ms) in production.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unmanaged Log File Growth
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If log rotation is not configured, the slow query log can grow to tens of gigabytes, exhausting server disk space and crashing MySQL.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use logrotate with FLUSH SLOW LOGS for automated daily rotation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Automate Daily Slow Log Reports
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set up a cron job that runs <code className="text-cyan-300 font-mono">mysqldumpslow -s t -t 10</code> every midnight and posts the top 10 heavy queries to the engineering team dashboard.
              </p>
              <div className="text-xs text-slate-400">
                Enables proactive optimization before customers notice slowdowns.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable log_slow_extra in MySQL 8.0
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code className="text-cyan-300 font-mono">log_slow_extra = 'ON'</code> to record additional diagnostic metadata including thread IDs, bytes sent, sort passes, and temporary tables created.
              </p>
              <div className="text-xs text-slate-400">
                Provides rich diagnostic context for rapid root-cause analysis.
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
              Key takeaways for slow query analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Slow Query Log Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">long_query_time = 0.5</strong> = Capture queries exceeding 500ms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">-s t</strong> = Sort by total cumulative time for maximum server impact.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">-s c</strong> = Sort by count to catch high-frequency micro-bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">-s al</strong> = Sort by lock time to diagnose transaction concurrency blocks.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Rows_examined vs Rows_sent...”</span>
                  When reviewing slow log entries, look at `Rows_examined` vs `Rows_sent`. If a query examines 100,000 rows to return 10 rows, you have an immediate missing index optimization!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about FLUSH SLOW LOGS...”</span>
                  Never delete a slow query log directly with `rm` while MySQL is running. Always rename the file and run `FLUSH SLOW LOGS;` in MySQL to open a new file cleanly!
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
              Comprehensive reference questions covering the Slow Query Log, mysqldumpslow, and diagnostic telemetry.
            </p>
          </div>

          <FAQTemplate
            title="Slow Query Log & mysqldumpslow FAQs"
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
            title="Analyzing the Slow Query Log and Identifying Top Heavy Queries with mysqldumpslow"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Never guess where your database performance bottlenecks are. Senior engineers don't sit around debating which query might be slow; they open the Slow Query Log and run `mysqldumpslow`! When analyzing production logs in Barrackpore or Kolkata, always look at two distinct lists: sort by `-s t` to find the heavy analytical queries that hog CPU, and sort by `-s c` to find the high-frequency micro-queries that run 50,000 times an hour. Fix those top five digests, and you will instantly transform your database throughput!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
