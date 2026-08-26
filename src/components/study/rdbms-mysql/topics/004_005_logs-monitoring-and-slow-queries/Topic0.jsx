import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Overview of MySQL Server Log Architecture and Log Files
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive log architecture workbench: exploring the 6 core MySQL log subsystems (Error, General, Binary, Slow Query, Relay, DDL), contrasting FILE vs TABLE storage destinations, analyzing performance overhead profiles, and inspecting runtime telemetry in MySQL 8.0.
 */
const Topic0 = () => {
  // Interactive Log Architecture State
  const [selectedLogPhase, setSelectedLogPhase] = useState("phase1_six_logs");

  const logPhases = {
    phase1_six_logs: {
      phaseNumber: "Phase 1: The 6 Core Logs",
      title: "1. The Six Core MySQL Log Subsystems",
      badge: "Architecture Overview",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 THE SIX CORE MYSQL LOG SUBSYSTEMS:

-- 1. Error Log (log_error): Diagnostics, startup, crashes, warnings.
-- 2. General Query Log (general_log): Audits EVERY connection & SQL query.
-- 3. Binary Log (log_bin): Sequential record of all DML/DDL changes.
-- 4. Slow Query Log (slow_query_log): Queries exceeding long_query_time.
-- 5. Relay Log: Replicated transaction cache on replica nodes.
-- 6. DDL Log (ddl_log.log): Internal crash-safe atomic DDL journal.

-- Inspect active log configurations:
SHOW VARIABLES WHERE Variable_name IN (
  'log_error', 'general_log', 'general_log_file', 
  'slow_query_log', 'slow_query_log_file', 'log_bin'
);`,
      explanation:
        "MySQL provides six specialized logging subsystems. Each serves distinct operational goals: troubleshooting crashes (Error Log), replication and Point-in-Time Recovery (Binary Log), and latency performance tuning (Slow Query Log).",
      keyTakeaways: [
        "Error Log and Binary Log are mandatory for enterprise production systems.",
        "Slow Query Log captures performance bottlenecks with <1% CPU overhead.",
        "Relay and DDL logs handle replication caching and atomic DDL crash safety."
      ]
    },
    phase2_destination_file_vs_table: {
      phaseNumber: "Phase 2: File vs Table",
      title: "2. Log Destinations: log_output = 'FILE' vs 'TABLE'",
      badge: "Storage Engine",
      badgeColor: "cyan",
      sqlSnippet: `-- 🗄️ LOG DESTINATION CONFIGURATION (log_output):

-- 1. High-Performance Filesystem Writes (Recommended for Production):
SET PERSIST log_output = 'FILE';
-- Writes to text files on disk with minimal OS page cache overhead! ⚡

-- 2. Database Table Logging (mysql.general_log / mysql.slow_log):
SET PERSIST log_output = 'TABLE';
-- Stores logs in CSV tables; queryable with SQL but adds table lock overhead:
SELECT start_time, user_host, query_time, sql_text 
FROM mysql.slow_log 
ORDER BY start_time DESC LIMIT 10;`,
      explanation:
        "The log_output variable determines if General and Slow Query logs are stored as OS text files (FILE) or inside database CSV tables (TABLE). In production, FILE logging is recommended to avoid database lock contention.",
      keyTakeaways: [
        "log_output = 'FILE' provides maximum write throughput and zero lock contention.",
        "log_output = 'TABLE' stores records in mysql.slow_log and mysql.general_log.",
        "TABLE logging introduces CSV engine locking overhead in busy databases."
      ]
    },
    phase3_overhead_profiles: {
      phaseNumber: "Phase 3: Overhead Profiles",
      title: "3. Performance Impact & Production Best Practices",
      badge: "Performance Impact",
      badgeColor: "purple",
      sqlSnippet: `-- ⚠️ GENERAL QUERY LOG PERFORMANCE HAZARD (15-30% QPS DROP):
-- Writing every query to disk saturates storage I/O on busy production nodes!

-- ✅ RECOMMENDED PRODUCTION LOG PROFILE:
SET PERSIST log_error_verbosity = 2;       -- Errors + Warnings
SET PERSIST slow_query_log = 'ON';          -- Capture slow queries
SET PERSIST long_query_time = 1.0;          -- 1.0 second threshold
SET PERSIST log_output = 'FILE';            -- Fast OS file writes
SET PERSIST general_log = 'OFF';            -- NEVER leave ON in prod!`,
      explanation:
        "Leaving the General Query Log enabled in production introduces severe disk write overhead, reducing database QPS by 15% to 30%. The Slow Query Log with long_query_time = 1.0s captures outlier queries with under 1% overhead.",
      keyTakeaways: [
        "General Query Log causes severe 15-30% throughput drops in production.",
        "Slow Query Log with 1.0s threshold incurs negligible (<1%) overhead.",
        "Error Log with verbosity=2 captures critical warnings without log bloat."
      ]
    },
    phase4_persist_and_rotation: {
      phaseNumber: "Phase 4: Runtime Configuration",
      title: "4. Dynamic Persistence (SET PERSIST) & FLUSH LOGS",
      badge: "Zero-Downtime Tuning",
      badgeColor: "rose",
      sqlSnippet: `-- 🔄 DYNAMIC PERSISTENCE & LOG ROTATION:

-- 1. Persist runtime log configuration across reboots (MySQL 8.0):
SET PERSIST slow_query_log = 'ON';
SET PERSIST long_query_time = 0.5;
-- Writes automatically to /var/lib/mysql/mysqld-auto.cnf!

-- 2. Flush and reopen log handles during external logrotate:
FLUSH LOGS;

-- CLI equivalent for shell scripts:
-- mysqladmin -u root -p flush-logs`,
      explanation:
        "MySQL 8.0's SET PERSIST allows database administrators to tune log settings dynamically at runtime while persisting changes to mysqld-auto.cnf across server restarts. FLUSH LOGS coordinates with Linux logrotate for clean archiving.",
      keyTakeaways: [
        "SET PERSIST modifies running server and saves to mysqld-auto.cnf.",
        "FLUSH LOGS closes and reopens log file handles for log rotation.",
        "Eliminates server restarts when adjusting logging thresholds."
      ]
    }
  };

  const currentPhase = logPhases[selectedLogPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Overview of MySQL Server <span className="text-emerald-400">Log Architecture</span> &amp; <span className="text-cyan-400">Log Files</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the telemetry and diagnostic foundation of MySQL 8.0: dissecting the 6 core log subsystems (Error, General, Binary, Slow Query, Relay, DDL), configuring <code>log_output</code> destinations, analyzing performance overhead profiles, and orchestrating zero-downtime log rotation.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Log Architecture Pillars ────────────────────── */}
        <section id="log-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of MySQL Server Logging
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL categorizes diagnostic, audit, performance, and transactional events across specialized log engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Error &amp; Diagnostics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Records startup/shutdown lifecycle, engine crashes, fatal warnings, and recovery state.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Slow Query Log</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Captures queries exceeding execution thresholds or lacking indexes with minimal CPU impact.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Binary Log Stream</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Maintains an ordered sequence of all data mutations for replication and Point-in-Time Recovery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">FILE Destination</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>log_output = 'FILE'</code> writes directly to OS filesystem, avoiding table locking contention.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Log Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the 6 core logs, FILE vs TABLE destinations, overhead profiles, and dynamic SET PERSIST configuration.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(logPhases).map((phaseKey) => {
              const phase = logPhases[phaseKey];
              const isSelected = selectedLogPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedLogPhase(phaseKey)}
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
                SQL Commands &amp; Telemetry Inspection:
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
              Logging architecture case studies in Barrackpore and Kolkata demonstrating general log remediation and production telemetry profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 25% POS Latency Drop in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Performance Restored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail checkout terminals experienced a sudden 25% latency spike during peak evening sales. Mamata investigated <code>SHOW VARIABLES LIKE 'general_log'</code> and found that a junior engineer had enabled <code>general_log = ON</code> with <code>log_output = 'TABLE'</code> to debug a coupon code. Mamata ran <code>SET GLOBAL general_log = 'OFF';</code>, immediately restoring checkout throughput across ₹1.2 Crores in daily billing.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – High-Durability Logging in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  &lt;3% CPU Impact
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing a ₹500 Crore core banking database required auditing slow queries without degrading high-frequency transaction response times. Debangshu deployed <code>slow_query_log = ON</code> with <code>long_query_time = 0.5s</code> and <code>log_output = 'FILE'</code> on dedicated NVMe partitions. The setup captured all inefficient join queries while keeping server logging CPU overhead below 2.5%.
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
              Avoid dangerous production general log bloat and CSV table lock contention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving general_log = ON in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The general log writes every query to disk, causing massive storage saturation and a 15% to 30% reduction in database throughput.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Never leave general_log enabled in production environments.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing High-Volume Logs in TABLE Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code>log_output = 'TABLE'</code> writes to CSV tables with table-level locking, creating locking contention during concurrent write bursts.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use log_output = 'FILE' for production log destinations.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use SET PERSIST for Runtime Tuning
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>SET PERSIST</code> in MySQL 8.0 to adjust logging parameters dynamically without restarting mysqld or manually editing configuration files.
              </p>
              <div className="text-xs text-slate-400">
                Saves configuration automatically to mysqld-auto.cnf.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Mount Logs on Dedicated Partitions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Separate sequential log I/O from random InnoDB data directory I/O by mounting logs on independent physical disk volumes.
              </p>
              <div className="text-xs text-slate-400">
                Stabilizes query response times and protects disaster recovery logs.
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
            title="Topic 0: Overview of MySQL Server Log Architecture and Log Files"
            content={noteText}
          />

          <Teacher
            note="MySQL's logging architecture is the foundation of database observability. Understand the distinct purpose of each log: keep the Error Log and Binary Log enabled for crash diagnostics and disaster recovery, configure the Slow Query Log with log_output = 'FILE' to pinpoint slow queries with minimal overhead, and NEVER leave the General Query Log enabled in production unless you want a 30% performance drop!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL log architecture, log_output destinations, overhead profiles, and rotation mechanics.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Server Log Architecture FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
