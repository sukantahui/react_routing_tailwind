import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – The sys Schema: Pre-built Diagnostic Views for Memory, Lock Contention, Index Usage, and Heavy Statements
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive sys Schema workbench: exploring formatted vs raw x$ views, triaging heavy statements and full table scans, identifying unused/redundant indexes, analyzing InnoDB lock contention, and generating automated sys.diagnostics health reports in MySQL 8.0.
 */
const Topic7 = () => {
  // Interactive sys Schema State
  const [selectedSysPhase, setSelectedSysPhase] = useState("phase1_formatted_vs_raw");

  const sysPhases = {
    phase1_formatted_vs_raw: {
      phaseNumber: "Phase 1: Formatted vs x$ Views",
      title: "1. Formatted Text Views vs Raw x$ Numeric Views",
      badge: "Prometheus & Grafana",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧑‍💻 1. HUMAN-READABLE FORMATTED VIEW (FOR DBAs IN TERMINAL):
SELECT query, exec_count, total_latency, avg_latency 
FROM sys.statement_analysis 
ORDER BY total_latency DESC LIMIT 3;
-- Output: total_latency = '4.82 s', avg_latency = '250.40 ms'

-- 🤖 2. RAW UNFORMATTED x$ VIEW (FOR PROMETHEUS & GRAFANA AGENTS):
SELECT query, exec_count, total_latency, avg_latency 
FROM sys.x$statement_analysis 
ORDER BY total_latency DESC LIMIT 3;
-- Output: total_latency = 4820000000000 (raw picoseconds for math graphing!)`,
      explanation:
        "Every diagnostic view in sys exists in two formats: standard views (e.g. sys.statement_analysis) format numbers with text units ('4.82 s') for human inspection, while x$ views (sys.x$statement_analysis) provide raw integers for Prometheus and Grafana.",
      keyTakeaways: [
        "Standard views format time and memory into human-friendly strings.",
        "x$ views provide raw integer datatypes for time-series math & exporters.",
        "Zero disk I/O: All sys views query Performance Schema in-memory buffers."
      ]
    },
    phase2_heavy_statements: {
      phaseNumber: "Phase 2: Heavy Statements",
      title: "2. Heavy Statements & Full Table Scan Triage",
      badge: "Query Triage",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 TRIAGING HEAVY STATEMENTS & UNINDEXED SCANS:

-- 1. Top 5 most time-consuming query patterns:
SELECT query, exec_count, total_latency, avg_latency, rows_examined_avg 
FROM sys.statement_analysis 
LIMIT 5;

-- 2. Queries performing full table scans:
SELECT query, exec_count, total_latency, rows_examined_avg, rows_sent_avg 
FROM sys.statements_with_full_table_scans 
WHERE rows_examined_avg > 1000 
ORDER BY total_latency DESC LIMIT 5;`,
      explanation:
        "sys.statement_analysis and sys.statements_with_full_table_scans instantly pinpoint which SQL templates cause the highest cumulative latency and scan millions of rows without index lookups.",
      keyTakeaways: [
        "Ranks normalized queries by total cumulative execution time.",
        "Isolates full table scans scanning millions of unindexed rows.",
        "Pre-calculates 95th-percentile execution latencies."
      ]
    },
    phase3_unused_indexes: {
      phaseNumber: "Phase 3: Index Efficiency",
      title: "3. Index Reclamation: Unused & Redundant Indexes",
      badge: "Index Optimization",
      badgeColor: "purple",
      sqlSnippet: `-- 🧹 RECLAIMING MEMORY & DISK FROM USELESS INDEXES:

-- 1. Identify indexes that have received ZERO read lookups since server boot:
SELECT object_schema, object_name, index_name 
FROM sys.schema_unused_indexes 
WHERE object_schema = 'kolkata_retail';

-- 2. Identify redundant duplicate prefix indexes:
SELECT table_schema, table_name, redundant_index_name, dominant_index_name 
FROM sys.schema_redundant_indexes;

-- Action: Safely drop unused indexes to eliminate INSERT/UPDATE write overhead!`,
      explanation:
        "Unused and redundant indexes waste buffer pool memory and cause write amplification on every INSERT/UPDATE. sys.schema_unused_indexes and sys.schema_redundant_indexes safely identify indexes that can be eliminated.",
      keyTakeaways: [
        "schema_unused_indexes identifies indexes with 0 read lookups.",
        "schema_redundant_indexes finds duplicate prefix composite indexes.",
        "Dropping unused indexes speeds up write transactions and frees RAM."
      ]
    },
    phase4_locks_and_diagnostics: {
      phaseNumber: "Phase 4: Locks & Diagnostics",
      title: "4. Live Lock Waits & CALL sys.diagnostics() Reports",
      badge: "Lock Forensics",
      badgeColor: "rose",
      sqlSnippet: `-- 🔒 1. RESOLVE TRANSACTION LOCK JAMS LIVE:
SELECT 
  waiting_trx_id, waiting_query, waiting_account,
  blocking_trx_id, blocking_query, blocking_account,
  wait_age_secs 
FROM sys.innodb_lock_waits;

-- 📑 2. GENERATE ALL-IN-ONE 2-MINUTE DIAGNOSTIC HEALTH REPORT:
-- Samples CPU, memory, locks, and top queries every 30 seconds for 120s:
CALL sys.diagnostics(120, 30, 'current');

-- 🛠️ 3. HELPER FORMATTING FUNCTIONS:
SELECT sys.format_time(4819200000000);  -- Returns: '4.82 s'
SELECT sys.format_bytes(10737418240);   -- Returns: '10.00 GiB'`,
      explanation:
        "sys.innodb_lock_waits maps waiting blocked queries directly to the blocking session. The CALL sys.diagnostics() stored procedure collects an all-in-one health report for deep post-incident analysis.",
      keyTakeaways: [
        "sys.innodb_lock_waits maps blocked queries to blocking transactions.",
        "CALL sys.diagnostics() creates an all-in-one incident health snapshot.",
        "sys.format_time and sys.format_bytes convert raw units cleanly."
      ]
    }
  };

  const currentPhase = sysPhases[selectedSysPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 7 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The <span className="text-emerald-400">sys Schema</span>: Diagnostic Views &amp; <span className="text-cyan-400">Lock Triage</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering MySQL 8.0&apos;s human-friendly diagnostic cockpit: contrasting formatted views with raw <code>x$</code> Prometheus views, triaging heavy statement latency, eliminating unused and redundant indexes, resolving live lock jams with <code>sys.innodb_lock_waits</code>, and generating <code>sys.diagnostics</code> incident reports.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: sys Schema Pillars ──────────────────────────── */}
        <section id="sys-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of sys Schema Diagnostics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the sys schema translates complex in-memory Performance Schema tables into instant operational intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Human vs x$ Views</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard views output formatted text strings for DBAs; <code>x$</code> views output raw numeric types for Prometheus.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Statement Triage</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>sys.statement_analysis</code> ranks queries by total execution latency and unindexed row scans.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Index Reclamation</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>sys.schema_unused_indexes</code> highlights zero-lookup indexes to reclaim buffer pool memory.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Lock Forensics</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>sys.innodb_lock_waits</code> maps waiting blocked transactions to the blocking session in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive sys Schema Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe formatted vs x$ views, heavy statement analysis, unused index reclamation, and lock contention diagnostics.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(sysPhases).map((phaseKey) => {
              const phase = sysPhases[phaseKey];
              const isSelected = selectedSysPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedSysPhase(phaseKey)}
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
                SQL Queries &amp; Diagnostic Views:
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
              sys schema diagnostic case studies in Barrackpore and Kolkata demonstrating 5-second unindexed scan triage and 85GB index memory reclamation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 5-Second Scan Triage in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Instant Discovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals slowed during a holiday sale. Mamata opened the mysql client and ran <code>SELECT * FROM sys.statements_with_full_table_scans LIMIT 3;</code>. The view pinpointed three unindexed cashier discount queries scanning 450,000 rows. Adding composite indexes restored sub-millisecond checkout times in under 3 minutes across ₹1.2 Crores in daily billing.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Reclaiming 85GB RAM with sys.schema_unused_indexes in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  85GB RAM Freed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing ₹500 Crores in banking portfolios required optimizing buffer pool memory. Debangshu queried <code>sys.schema_unused_indexes</code> on the core ledger cluster, identifying 14 indexes that had received zero read lookups over 6 months. Safely dropping these indexes freed 85GB of buffer pool RAM and reduced write transaction latency by 18%.
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
              Avoid dangerous exporter string parsing errors and prematurely dropping quarterly report indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Scraping Formatted Views in Prometheus
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Querying formatted views like <code>sys.statement_analysis</code> in Prometheus exporters results in string parsing errors due to units like &apos;4.82 s&apos; or &apos;10.5 MiB&apos;.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure monitoring exporters to scrape raw sys.x$ views.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Dropping Indexes Right After a Restart
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Performance Schema counters reset upon server restart. Checking <code>sys.schema_unused_indexes</code> immediately after a reboot can cause dropping vital monthly report indexes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Only evaluate unused indexes after the server has run for at least 30-90 days.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use CALL sys.diagnostics() for Incidents
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Execute <code>CALL sys.diagnostics(120, 30, &apos;current&apos;);</code> during performance incidents to capture an all-in-one CPU, memory, and lock snapshot.
              </p>
              <div className="text-xs text-slate-400">
                Provides comprehensive data for post-mortem engineering reviews.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Inspect sys.innodb_lock_waits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Query <code>sys.innodb_lock_waits</code> during application stalls to immediately locate the blocking transaction ID and user query.
              </p>
              <div className="text-xs text-slate-400">
                Enables rapid termination of blocking transactions.
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
            title="Topic 7: The sys Schema: Pre-built Diagnostic Views for Memory, Lock Contention, Index Usage, and Heavy Statements"
            content={noteText}
          />

          <Teacher
            note="The sys schema is a DBA's best friend in MySQL 8.0! Instead of writing complex joins over Performance Schema picoseconds, use sys.statement_analysis to find your top query bottlenecks, query sys.statements_with_full_table_scans to catch missing indexes, inspect sys.innodb_lock_waits to break transaction lock jams live, and remember: use standard views for terminal inspection and raw sys.x$ views for Prometheus and Grafana!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of sys schema diagnostic views, formatted vs x$ raw views, unused index reclamation, and CALL sys.diagnostics().
            </p>
          </div>

          <FAQTemplate
            title="sys Schema Diagnostic Views &amp; Triage FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
