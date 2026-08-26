import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – The Slow Query Log: Configuration (slow_query_log, long_query_time, log_queries_not_using_indexes)
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive Slow Query Log workbench: configuring microsecond threshold tuning (long_query_time = 0.5s), enabling unindexed query logging with throttling, activating rich MySQL 8.0 engine metrics (log_slow_extra = ON), and performing forensic Rows_examined vs Rows_sent ratio analysis.
 */
const Topic4 = () => {
  // Interactive Slow Log State
  const [selectedSlowPhase, setSelectedSlowPhase] = useState("phase1_threshold_tuning");

  const slowPhases = {
    phase1_threshold_tuning: {
      phaseNumber: "Phase 1: Threshold Tuning",
      title: "1. Microsecond Precision & long_query_time Configuration",
      badge: "Microsecond Resolution",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ CONFIGURING SLOW QUERY LOG IN MYSQL 8.0:

-- 1. Enable Slow Query Log & specify file destination:
SET PERSIST slow_query_log = 'ON';
SET PERSIST slow_query_log_file = '/var/log/mysql/slow_query.log';
SET PERSIST log_output = 'FILE';

-- 2. Configure execution threshold (Supports fractional seconds!):
-- 1.0 = 1000ms, 0.5 = 500ms, 0.1 = 100ms, 0.05 = 50ms:
SET PERSIST long_query_time = 0.5;

-- 3. Output timestamps in local server timezone:
SET PERSIST log_timestamps = 'SYSTEM';`,
      explanation:
        "The Slow Query Log captures queries exceeding long_query_time seconds with microsecond resolution. Setting long_query_time to 0.5s (500ms) pinpoints queries that degrade user experience while keeping log overhead under 1%.",
      keyTakeaways: [
        "long_query_time supports fractional microsecond thresholds (e.g. 0.5 = 500ms).",
        "log_output = 'FILE' ensures high-speed logging without CSV table lock contention.",
        "Incurs negligible (<1%) overhead on busy production workloads."
      ]
    },
    phase2_unindexed_throttling: {
      phaseNumber: "Phase 2: Unindexed Throttling",
      title: "2. Capturing Unindexed Queries with Throttling & Row Limits",
      badge: "Full Scan Detection",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 CAPTURING FULL TABLE SCANS WITH RATE-LIMITING:

-- 1. Log queries that perform full table or full index scans:
SET PERSIST log_queries_not_using_indexes = 'ON';

-- 2. Throttle unindexed logging to prevent disk saturation (Max 20/min):
SET PERSIST log_throttle_queries_not_using_indexes = 20;

-- 3. Exclude tiny static reference tables (<100 rows examined):
SET PERSIST min_examined_row_limit = 100;

-- 4. Include slow administrative operations (ALTER TABLE, OPTIMIZE TABLE):
SET PERSIST log_slow_admin_statements = 'ON';`,
      explanation:
        "log_queries_not_using_indexes catches queries that lack index lookups. Combining it with log_throttle_queries_not_using_indexes and min_examined_row_limit prevents disk flooding from small 5-row lookup tables.",
      keyTakeaways: [
        "log_queries_not_using_indexes exposes missing index scans.",
        "log_throttle_queries_not_using_indexes caps logging at 20 queries/min.",
        "min_examined_row_limit skips fast reference tables under 100 rows."
      ]
    },
    phase3_log_slow_extra: {
      phaseNumber: "Phase 3: log_slow_extra Telemetry",
      title: "3. Rich Engine Metrics in MySQL 8.0 (log_slow_extra = ON)",
      badge: "Deep Telemetry",
      badgeColor: "purple",
      sqlSnippet: `-- 🔬 ENABLING DEEP ENGINE TELEMETRY IN MYSQL 8.0:
SET PERSIST log_slow_extra = 'ON';

-- Sample output produced inside slow_query.log:
-- # Time: 2026-08-25T15:00:00.123456Z
-- # User@Host: app_user[app_user] @ 192.168.1.50 []  Id: 104
-- # Query_time: 4.819200  Lock_time: 0.000120 Rows_sent: 25  Rows_examined: 5000000
-- # Thread_id: 104  Errno: 0  Killed: 0  Bytes_received: 84  Bytes_sent: 1205
-- # Sort_merge_passes: 12  Sort_rows: 25  Sort_scan_count: 1
-- # Created_tmp_disk_tables: 1  Created_tmp_tables: 1
SELECT * FROM kolkata_retail.orders WHERE status = 'PENDING' ORDER BY order_date DESC;`,
      explanation:
        "Introduced in MySQL 8.0.14, log_slow_extra = ON records deep engine metrics: Sort_merge_passes (sorting memory spills to disk), Created_tmp_disk_tables (disk temporary tables), and network byte metrics.",
      keyTakeaways: [
        "log_slow_extra exposes disk sorting spills (Sort_merge_passes).",
        "Flags temporary disk table creation (Created_tmp_disk_tables).",
        "Enables comprehensive index and memory buffer tuning."
      ]
    },
    phase4_forensic_ratio_analysis: {
      phaseNumber: "Phase 4: Forensic Ratio Analysis",
      title: "4. Forensic Diagnosis: Rows_examined vs Rows_sent Ratios",
      badge: "Forensic Analysis",
      badgeColor: "rose",
      sqlSnippet: `-- 🕵️ FORENSIC RATIO ANALYSIS (SCAN INEFFICIENCY):

-- 🛑 SCENARIO A: HIGH ROWS_EXAMINED VS LOW ROWS_SENT (MISSING INDEX):
-- # Query_time: 3.42s  Rows_sent: 12  Rows_examined: 4,500,000
-- Diagnosis: Scanned 4.5 MILLION rows to return only 12 rows! (Full Table Scan)
-- Fix: CREATE INDEX idx_status_category ON orders(status, category);

-- 🛑 SCENARIO B: HIGH LOCK_TIME VS LOW QUERY_TIME (LOCK CONTENTION):
-- # Query_time: 10.04s  Lock_time: 9.81s  Rows_sent: 1  Rows_examined: 1
-- Diagnosis: Query ran in 0.23s but waited 9.81s for a row lock held by another trx!
-- Fix: Investigate conflicting transactions and optimize lock durations.`,
      explanation:
        "Analyzing the ratio of Rows_examined to Rows_sent exposes unindexed table scans. Comparing Lock_time against total Query_time differentiates between slow SQL execution and row-lock waiting contention.",
      keyTakeaways: [
        "Rows_examined >> Rows_sent reveals missing composite indexes.",
        "Lock_time ~ Query_time indicates row-lock contention, not slow SQL.",
        "Provides direct actionable guidance for schema and transaction refactoring."
      ]
    }
  };

  const currentPhase = slowPhases[selectedSlowPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 4 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The Slow Query Log: <span className="text-emerald-400">Configuration</span> &amp; <span className="text-cyan-400">Tuning</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the primary query performance tuning engine in MySQL 8.0: configuring microsecond thresholds with <code>long_query_time = 0.5s</code>, enabling unindexed scan detection with rate throttling, activating rich telemetry with <code>log_slow_extra = ON</code>, and executing forensic ratio analysis.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Slow Log Pillars ────────────────────────────── */}
        <section id="slow-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Slow Query Log Engineering
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the Slow Query Log isolates performance bottlenecks with surgical precision and minimal server overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">0.5s Threshold</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supports fractional microsecond thresholds to capture slow queries without logging fast OLTP traffic.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Full Scan Throttling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>log_throttle_queries_not_using_indexes</code> caps unindexed query logging to prevent disk floods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">log_slow_extra</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Records disk sort passes (<code>Sort_merge_passes</code>) and temporary disk tables (<code>Created_tmp_disk_tables</code>).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Ratio Diagnostics</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Comparing <code>Rows_examined</code> vs <code>Rows_sent</code> pinpoints missing composite indexes instantly.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Slow Query Log Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe threshold tuning, unindexed throttling, log_slow_extra telemetry, and forensic ratio diagnostics.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(slowPhases).map((phaseKey) => {
              const phase = slowPhases[phaseKey];
              const isSelected = selectedSlowPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedSlowPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Configuration &amp; Log Header Output:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Slow Query Log case studies in Barrackpore and Kolkata demonstrating missing index discovery and sort buffer tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 4.5M Row Scan in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  3.4s &rarr; 1.2ms
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store product queries took 3.4 seconds during checkout. Mamata inspected the Slow Query Log and saw <code>Rows_sent: 12 Rows_examined: 4,500,000</code>. The query was performing a full table scan. Adding a composite index <code>idx_status_cat</code> on <code>(status, category)</code> dropped <code>Rows_examined</code> to 12 and cut execution time to 1.2 milliseconds across ₹1.2 Crores in inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Eliminating Disk Sort Passes in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Disk Spills
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a banking ledger query was triggering I/O latency spikes. Enabling <code>log_slow_extra = ON</code> revealed <code>Sort_merge_passes: 14</code>, proving the query was spilling temporary sorting files to disk. Debangshu added an index matching the <code>ORDER BY</code> clause and adjusted <code>sort_buffer_size</code>, completely eliminating disk sort passes across ₹500 Crores in transaction ledgers.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous log flooding and confusing lock wait times with slow query execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Unthrottled Unindexed Logging
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enabling <code>log_queries_not_using_indexes</code> without rate throttling causes high-frequency unindexed loops on small tables to flood log storage.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always set log_throttle_queries_not_using_indexes = 20 and min_examined_row_limit = 100.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Confusing Lock_time with Slow SQL Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A query with <code>Query_time: 10s</code> and <code>Lock_time: 9.8s</code> is waiting for locks held by other transactions, not suffering from slow indexing.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Subtract Lock_time from Query_time to evaluate actual query execution duration.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enable log_slow_extra in MySQL 8.0
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>log_slow_extra = ON</code> to capture disk temporary table creation, sort merge passes, and network payload bytes in the slow log.
              </p>
              <div className="text-xs text-slate-400">
                Provides actionable engine-level optimization metrics.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Rotate with logrotate &amp; FLUSH SLOW LOGS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure Linux <code>logrotate</code> with <code>mysqladmin flush-logs slow</code> to archive and compress slow logs automatically.
              </p>
              <div className="text-xs text-slate-400">
                Prevents slow log files from expanding indefinitely on production disks.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 4: The Slow Query Log: Configuration (slow_query_log, long_query_time, log_queries_not_using_indexes)"
            content={noteText}
          />

          <Teacher
            note="The Slow Query Log is your primary diagnostic tool for eliminating database latency! Always configure long_query_time = 0.5s for microsecond precision, enable log_slow_extra = ON in MySQL 8.0 to expose disk sorting spills and temporary disk tables, throttle unindexed queries with log_throttle_queries_not_using_indexes, and analyze the ratio of Rows_examined to Rows_sent to design high-performance composite indexes!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Slow Query Log configuration, microsecond tuning, log_slow_extra metrics, and unindexed scan throttling.
            </p>
          </div>

          <FAQTemplate
            title="Slow Query Log Configuration &amp; Metrics FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
