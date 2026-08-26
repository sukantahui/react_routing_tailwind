import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Performance Schema Architecture: Memory Storage Engine Tables, Instrumentation, and Consumers
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive Performance Schema workbench: exploring the in-memory PERFORMANCE_SCHEMA storage engine, configuring code-level instruments (setup_instruments) and storage consumers (setup_consumers), analyzing statement ring buffers and summary tables, and inspecting data lock telemetry in MySQL 8.0.
 */
const Topic6 = () => {
  // Interactive Performance Schema State
  const [selectedPfsPhase, setSelectedPfsPhase] = useState("phase1_in_memory_engine");

  const pfsPhases = {
    phase1_in_memory_engine: {
      phaseNumber: "Phase 1: In-Memory Engine",
      title: "1. The In-Memory PERFORMANCE_SCHEMA Storage Engine",
      badge: "Zero Disk I/O",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ PERFORMANCE SCHEMA ARCHITECTURAL BASELINE:

-- 1. Verify Performance Schema is enabled:
SHOW VARIABLES LIKE 'performance_schema';
-- Value: ON (Allocates fixed memory ring buffer at boot)

-- 2. Inspect storage engine properties:
SHOW ENGINES;
-- PERFORMANCE_SCHEMA | YES | Memory-allocated performance schema

-- 3. Check memory allocated to Performance Schema:
SELECT EVENT_NAME, CURRENT_NUMBER_OF_BYTES_USED / 1024 / 1024 AS MB_used 
FROM performance_schema.memory_summary_global_by_event_name 
WHERE EVENT_NAME LIKE 'memory/performance_schema/%' 
ORDER BY CURRENT_NUMBER_OF_BYTES_USED DESC LIMIT 5;`,
      explanation:
        "The Performance Schema is an internal diagnostic subsystem built directly into mysqld. It uses non-blocking lock-free memory ring buffers with zero disk I/O, providing sub-microsecond execution telemetry with under 1% CPU overhead.",
      keyTakeaways: [
        "Stores telemetry entirely in system RAM using ring buffers (Zero Disk I/O).",
        "Fixed memory footprint allocated at server startup prevents memory growth.",
        "Non-blocking atomic probes introduce less than 1% CPU overhead."
      ]
    },
    phase2_instruments_and_consumers: {
      phaseNumber: "Phase 2: Instruments vs Consumers",
      title: "2. Code Sensors (Instruments) vs Storage (Consumers)",
      badge: "Pipeline Configuration",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛠️ CONFIGURING INSTRUMENTS & CONSUMERS AT RUNTIME:

-- 1. Enable table I/O wait instruments dynamically:
UPDATE performance_schema.setup_instruments 
SET ENABLED = 'YES', TIMED = 'YES' 
WHERE NAME LIKE 'wait/io/table/%';

-- 2. Enable the 10,000-query global history ring buffer:
UPDATE performance_schema.setup_consumers 
SET ENABLED = 'YES' 
WHERE NAME = 'events_statements_history_long';

-- 3. Verify active consumers:
SELECT * FROM performance_schema.setup_consumers WHERE ENABLED = 'YES';`,
      explanation:
        "Instruments (setup_instruments) are code probe sensors that capture execution events (statements, locks, disk I/O, stages). Consumers (setup_consumers) are destination storage tables that store and aggregate collected telemetry.",
      keyTakeaways: [
        "Instruments measure execution timing (TIMED='YES') at probe points.",
        "Consumers determine which tables store the collected event stream.",
        "Both instruments and consumers can be toggled dynamically in SQL."
      ]
    },
    phase3_statement_hierarchy: {
      phaseNumber: "Phase 3: Statement Hierarchy",
      title: "3. Statement Event Hierarchy & Digest Summaries",
      badge: "Statement Telemetry",
      badgeColor: "purple",
      sqlSnippet: `-- 📊 QUERYING THE 4-TIER STATEMENT HIERARCHY:

-- Tier 1: Live active queries per connection thread:
SELECT THREAD_ID, SQL_TEXT, TIMER_WAIT/1000000000 AS ms 
FROM performance_schema.events_statements_current;

-- Tier 4: Global Aggregated Summary by Normalized Query Digest:
SELECT 
  DIGEST_TEXT, 
  COUNT_STAR AS total_calls,
  ROUND(SUM_TIMER_WAIT / 1000000000000, 3) AS total_sec,
  ROUND(AVG_TIMER_WAIT / 1000000000, 2) AS avg_ms,
  SUM_ROWS_EXAMINED, SUM_CREATED_TMP_DISK_TABLES
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 5;`,
      explanation:
        "Statement telemetry is stored in four hierarchical tiers: current query per thread, last 10 queries per thread (history), last 10,000 queries globally (history_long), and normalized digest summaries aggregated by query structure.",
      keyTakeaways: [
        "events_statements_current exposes active queries without waiting for completion.",
        "events_statements_summary_by_digest groups queries by parameter-stripped template.",
        "Picosecond timer values are converted to seconds by dividing by 10^12."
      ]
    },
    phase4_locks_and_waits: {
      phaseNumber: "Phase 4: Concurrency & Locks",
      title: "4. Lock Contention & Table I/O Waits (data_locks)",
      badge: "Lock Forensics",
      badgeColor: "rose",
      sqlSnippet: `-- 🔒 REAL-TIME ROW LOCK CONTENTION FORENSICS (MYSQL 8.0):

-- 1. Inspect all active InnoDB row and gap locks held:
SELECT ENGINE_LOCK_ID, OBJECT_SCHEMA, OBJECT_NAME, LOCK_TYPE, LOCK_MODE, LOCK_STATUS 
FROM performance_schema.data_locks;

-- 2. Identify blocking vs blocked waiting transactions:
SELECT 
  r.REQUESTING_ENGINE_TRANSACTION_ID AS waiting_trx,
  b.BLOCKING_ENGINE_TRANSACTION_ID AS blocking_trx
FROM performance_schema.data_lock_waits;

-- 3. Top tables by total I/O wait contention:
SELECT OBJECT_SCHEMA, OBJECT_NAME, COUNT_STAR, SUM_TIMER_WAIT/1000000000000 AS wait_sec 
FROM performance_schema.table_io_waits_summary_by_table 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 5;`,
      explanation:
        "MySQL 8.0's data_locks and data_lock_waits tables provide immediate insight into row-level locking, gap locks, and blocking transactions, resolving deadlocks and concurrency bottlenecks in real-time.",
      keyTakeaways: [
        "data_locks reveals all active row, gap, and next-key locks held.",
        "data_lock_waits maps waiting blocked transactions to blocking transactions.",
        "table_io_waits_summary_by_table highlights physical disk I/O bottlenecks."
      ]
    }
  };

  const currentPhase = pfsPhases[selectedPfsPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Performance Schema: <span className="text-emerald-400">Architecture</span> &amp; <span className="text-cyan-400">Telemetry</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the in-memory telemetry engine in MySQL 8.0: understanding zero disk I/O ring buffers, configuring <code>setup_instruments</code> probes and <code>setup_consumers</code> destinations, analyzing statement digest hierarchies, and diagnosing real-time lock contention with <code>data_locks</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Performance Schema Pillars ──────────────────── */}
        <section id="pfs-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Performance Schema Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the Performance Schema delivers continuous, low-overhead database observability without writing a single byte to disk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">In-Memory Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero disk I/O ring buffers store execution metrics entirely in RAM with &lt;1% CPU overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Instruments &amp; Consumers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Separates code measurement sensors (<code>setup_instruments</code>) from storage tables (<code>setup_consumers</code>).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Statement Digests</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>summary_by_digest</code> aggregates query metrics into normalized structural templates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">data_locks Contention</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Provides real-time visibility into active row locks, gap locks, and blocked waiting transactions.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Performance Schema Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe memory engine baselines, instrument/consumer configuration, statement digest aggregations, and data lock diagnostics.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(pfsPhases).map((phaseKey) => {
              const phase = pfsPhases[phaseKey];
              const isSelected = selectedPfsPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedPfsPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
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
                SQL Inspection Queries &amp; Configuration:
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
              Performance Schema case studies in Barrackpore and Kolkata demonstrating live hung query capture and zero-I/O digest aggregation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Catching Hung POS Lock Live in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Caught in Memory
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals were intermittently stalling during checkout. Mamata queried <code>events_statements_current</code> and located an active <code>SELECT ... FOR UPDATE</code> query running for 2.4 seconds waiting on an uncommitted inventory adjustment transaction. Terminating the blocking session cleared all POS terminals instantly across ₹1.2 Crores in daily inventory transactions.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero-I/O Telemetry on ₹500 Crore Banking Volume
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Disk I/O
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking transactions required tracking query latency percentiles without writing millions of log lines to NVMe storage. Debangshu queried <code>events_statements_summary_by_digest</code>. The in-memory summary aggregated 15 million transactions into normalized digests with total latency, temporary disk tables, and row scan ratios with under 0.8% CPU overhead.
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
              Avoid dangerous picosecond unit calculation errors and disabling Performance Schema in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Confusing Picoseconds with Milliseconds
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                <code>TIMER_WAIT</code> values are stored in picoseconds ($10^{-12}$s). Dividing by 1,000 results in nanoseconds, not seconds, leading to wildly inaccurate latency calculations.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always divide TIMER_WAIT by 1,000,000,000,000 to convert to seconds.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Disabling Performance Schema in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Disabling <code>performance_schema = OFF</code> blinds DBAs to real-time locks, memory consumption, and query digests while saving less than 1% CPU.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep Performance Schema enabled across all production clusters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Query events_statements_summary_by_digest
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leverage <code>events_statements_summary_by_digest</code> for continuous query performance monitoring with zero disk write overhead.
              </p>
              <div className="text-xs text-slate-400">
                Provides aggregated total latency and row scan ratios in real-time.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Inspect data_locks for Lock Jams
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>data_locks</code> and <code>data_lock_waits</code> in MySQL 8.0 to identify blocking transactions during high-concurrency lock contention.
              </p>
              <div className="text-xs text-slate-400">
                Replaces deprecated information_schema.innodb_locks.
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
            title="Topic 6: Performance Schema Architecture: Memory Storage Engine Tables, Instrumentation, and Consumers"
            content={noteText}
          />

          <Teacher
            note="The Performance Schema is MySQL's internal flight data recorder! Because it lives entirely in system memory and uses lock-free ring buffers, it monitors 100% of queries with zero disk I/O and &lt;1% CPU overhead. Understand the difference between Instruments (probes that measure code) and Consumers (tables that store events), use events_statements_summary_by_digest for continuous query monitoring, and remember to divide TIMER_WAIT by 10^12 to get seconds!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Performance Schema in-memory architecture, instruments vs consumers, picosecond time conversions, and data lock telemetry.
            </p>
          </div>

          <FAQTemplate
            title="Performance Schema Architecture &amp; Telemetry FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
