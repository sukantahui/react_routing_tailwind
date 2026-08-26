import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Monitoring Replication Status: SHOW REPLICA STATUS (SHOW SLAVE STATUS), Seconds_Behind_Master
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive replication status inspection workbench: analyzing SHOW REPLICA STATUS telemetry, diagnosing I/O vs SQL thread error codes, calculating GTID un-applied backlog, and querying performance_schema replication tables in MySQL 8.0.
 */
const Topic10 = () => {
  // Interactive Telemetry State
  const [selectedTelemetryKey, setSelectedTelemetryKey] = useState("telemetry1_dual_threads");

  const telemetryMetrics = {
    telemetry1_dual_threads: {
      metricName: "1. Dual-Thread Health",
      title: "1. Dual-Thread Health: Replica_IO_Running & Replica_SQL_Running",
      badge: "Core Thread Health",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔍 PRIMARY HEALTH CHECK COMMAND:
SHOW REPLICA STATUS\\G

-- ✅ HEALTHY TARGET OUTPUT:
-- Replica_IO_Running: Yes    (I/O Receiver streaming from primary)
-- Replica_SQL_Running: Yes   (SQL Applier executing in InnoDB)
-- Seconds_Behind_Source: 0   (Zero replication lag)
-- Last_IO_Errno: 0           (Zero network transport errors)
-- Last_SQL_Errno: 0          (Zero SQL constraint conflicts)`,
      explanation:
        "The core foundation of replication monitoring. Both Replica_IO_Running and Replica_SQL_Running must show 'Yes'. If the I/O thread is 'Connecting', a network or authentication fault exists; if the SQL thread is 'No', a SQL execution or constraint error has halted replication.",
      keyTakeaways: [
        "Replica_IO_Running: Yes confirms active network streaming.",
        "Replica_SQL_Running: Yes confirms active storage engine transaction replay.",
        "Seconds_Behind_Source: 0 confirms real-time cluster synchronization."
      ]
    },
    telemetry2_coordinates_lag: {
      metricName: "2. Log Positions & GTID",
      title: "2. Binary Log Coordinates & GTID Backlog Inspection",
      badge: "Queue Backlog",
      badgeColor: "cyan",
      sqlSnippet: `-- 📊 LOG COORDINATES & GTID QUEUE ANALYSIS:
-- Master_Log_File:        binlog.000004
-- Read_Master_Log_Pos:    950000  (Downloaded by I/O thread)
-- Relay_Master_Log_File:  binlog.000004
-- Exec_Master_Log_Pos:    950000  (Committed by SQL thread)

-- 📦 GTID SET PROGRESSION:
-- Retrieved_Gtid_Set:     3E11FA47-...:1-500  (Buffered in relay logs)
-- Executed_Gtid_Set:      3E11FA47-...:1-500  (Committed to local InnoDB)
-- Auto_Position:          1                   (GTID Protocol Active)`,
      explanation:
        "Comparing Read_Master_Log_Pos with Exec_Master_Log_Pos reveals un-applied relay log queues. In GTID topologies, subtracting Executed_Gtid_Set from Retrieved_Gtid_Set pinpoints the exact count of queued transactions awaiting execution.",
      keyTakeaways: [
        "Read position vs Exec position reveals in-flight relay log backlogs.",
        "Retrieved_Gtid_Set tracks downloaded transactions; Executed_Gtid_Set tracks applied.",
        "Auto_Position: 1 confirms automatic coordinate-free GTID replication."
      ]
    },
    telemetry3_error_triage: {
      metricName: "3. Error Code Triage",
      title: "3. Error Triage: Last_IO_Error vs Last_SQL_Error",
      badge: "Incident Triage",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 TRIAGING I/O THREAD ERRORS (Network / Auth / Purged Binlogs):
-- Last_IO_Errno: 2003 &rarr; Can't connect to MySQL server (Firewall / Port 3306)
-- Last_IO_Errno: 1045  -&gt; Access denied for repl_user (Wrong password / grant)
-- Last_IO_Errno: 1236  -> Fatal 1236: Binlog purged on primary before replica synced

-- 💥 TRIAGING SQL THREAD ERRORS (Schema / Constraint Conflicts):
-- Last_SQL_Errno: 1062 -> Duplicate entry '101' for key 'PRIMARY'
-- Last_SQL_Errno: 1146 -> Table 'db.orders' doesn't exist (Filter missing table)
-- Last_SQL_Errno: 1452 -> Foreign key constraint fails (Parent table missing)`,
      explanation:
        "Last_IO_Error pinpoints network transport, authentication, or purged binary log failures on the Source. Last_SQL_Error pinpoints schema mismatches, duplicate primary key collisions, or foreign key constraint violations on the replica.",
      keyTakeaways: [
        "Last_IO_Error triages transport, firewall, and authentication failures.",
        "Last_SQL_Error triages duplicate key collisions and missing tables.",
        "Error 1236 indicates required binary logs were purged on the primary."
      ]
    },
    telemetry4_performance_schema: {
      metricName: "4. Performance Schema",
      title: "4. Modern Relational Telemetry via Performance Schema",
      badge: "Relational Queries",
      badgeColor: "purple",
      sqlSnippet: `-- 🔍 1. I/O CONNECTION RECEIVER TELEMETRY:
SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER, LAST_ERROR_MESSAGE 
FROM performance_schema.replication_connection_status;

-- 🔍 2. SQL APPLIER COORDINATOR STATUS:
SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER, LAST_ERROR_MESSAGE 
FROM performance_schema.replication_applier_status_by_coordinator;

-- 🔍 3. MULTI-THREADED SLAVE WORKER DISTRIBUTION:
SELECT WORKER_ID, THREAD_ID, SERVICE_STATE, LAST_SEEN_TRANSACTION 
FROM performance_schema.replication_applier_status_by_worker;`,
      explanation:
        "Performance Schema replication tables provide structured, relational SQL access to replication telemetry, enabling automated monitoring agents and scripts to query connection states and worker thread distribution without text regex parsing.",
      keyTakeaways: [
        "replication_connection_status exposes structured I/O receiver metrics.",
        "replication_applier_status_by_worker tracks individual MTS parallel worker activity.",
        "Eliminates fragile text parsing of SHOW REPLICA STATUS in monitoring agents."
      ]
    }
  };

  const currentMetric = telemetryMetrics[selectedTelemetryKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 10 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Monitoring <span className="text-emerald-400">Replication Status</span> &amp; Telemetry (<span className="text-cyan-400">SHOW REPLICA STATUS</span>)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering replication health inspection in MySQL 8.0: analyzing dual-thread status, tracking coordinate progression and GTID queues, triaging I/O and SQL error codes, and querying Performance Schema tables for automated Prometheus monitoring.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Telemetry Pillars ───────────────────────────── */}
        <section id="telemetry-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Status Monitoring
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core telemetry indicators for validating cluster synchronization and diagnosing replication stalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Indicator 1</span>
              <h3 className="font-bold text-white text-base">Dual-Thread Health</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>Replica_IO_Running: Yes</code> and <code>Replica_SQL_Running: Yes</code> confirm active streaming and replay.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Indicator 2</span>
              <h3 className="font-bold text-white text-base">Coordinates &amp; GTID</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tracks byte position progress and calculates queue backlogs between Retrieved and Executed GTIDs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Indicator 3</span>
              <h3 className="font-bold text-purple-300 text-base">Error Code Triage</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Isolates network/auth faults (<code>Last_IO_Error</code>) from duplicate key schema conflicts (<code>Last_SQL_Error</code>).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Indicator 4</span>
              <h3 className="font-bold text-rose-300 text-base">Performance Schema</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Structured relational system tables for automated Prometheus exporter monitoring and worker telemetry.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Replication Status Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe dual-thread verification targets, coordinate calculations, error code diagnostics, and Performance Schema queries.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(telemetryMetrics).map((metricKey) => {
              const metric = telemetryMetrics[metricKey];
              const isSelected = selectedTelemetryKey === metricKey;
              return (
                <button
                  key={metricKey}
                  onClick={() => setSelectedTelemetryKey(metricKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {metric.metricName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Replication Telemetry Metric
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentMetric.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentMetric.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentMetric.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentMetric.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentMetric.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentMetric.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentMetric.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Telemetry Output &amp; Query Snippets:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentMetric.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentMetric.keyTakeaways.map((item, i) => (
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
              Status monitoring case studies in Barrackpore and Kolkata demonstrating duplicate key error remediation and automated Performance Schema telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving Error 1062 in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  GTID Skip
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS replication halted on Saturday morning across ₹1.2 Crores in inventory. Susmita inspected <code>SHOW REPLICA STATUS</code> and identified <code>Last_SQL_Errno: 1062</code> (Duplicate entry on invoice ID). She injected an empty GTID commit for the failing transaction, resumed replication in 30 seconds, and enforced <code>super_read_only = ON</code> to prevent future direct writes.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Structured Monitoring in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Performance Schema
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required sub-second replication alerting. Debangshu configured Prometheus to query <code>performance_schema.replication_connection_status</code> and <code>replication_applier_status_by_worker</code>, creating automated Slack alerts when un-applied GTID queues exceeded 100 transactions, ensuring zero customer downtime.
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
              Avoid ignoring Seconds_Behind_Source NULL states and parsing CLI text outputs with regex.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Ignoring Seconds_Behind_Source NULL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assuming <code>Seconds_Behind_Source: NULL</code> means zero lag; NULL actually indicates that replication has crashed or halted completely.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Trigger critical alerts whenever Seconds_Behind_Source is NULL.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Fragile Text Regex Parsing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using bash scripts to regex parse <code>SHOW REPLICA STATUS</code> text often breaks across MySQL minor releases and multi-source channels.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Query structured performance_schema.replication_* tables instead.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor GTID Queue Backlogs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Track <code>GTID_SUBTRACT(Retrieved_Gtid_Set, Executed_Gtid_Set)</code> to detect un-applied transaction build-ups in relay logs before lag spikes.
              </p>
              <div className="text-xs text-slate-400">
                Provides early warning of SQL applier thread saturation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Automate Prometheus Alerts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deploy <code>mysqld_exporter</code> to monitor <code>slave_io_running</code>, <code>slave_sql_running</code>, and <code>seconds_behind_master</code> continuously.
              </p>
              <div className="text-xs text-slate-400">
                Ensures 24/7 automated on-call paging during replication failures.
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
            title="Topic 10: Monitoring Replication Status: SHOW REPLICA STATUS (SHOW SLAVE STATUS), Seconds_Behind_Master"
            content={noteText}
          />

          <Teacher
            note="Monitoring replication status is a fundamental operational responsibility for every DBA! Execute SHOW REPLICA STATUS\G and verify that both Replica_IO_Running and Replica_SQL_Running are Yes with Seconds_Behind_Source = 0. Triage I/O errors (like Error 2003 or 1045) for network/auth issues, and triage SQL errors (like Error 1062 or 1146) for schema and constraint conflicts. For automated scripts, always query performance_schema.replication_* tables for clean, relational telemetry!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of SHOW REPLICA STATUS variables, I/O vs SQL thread error diagnosis, GTID set subtraction, and Performance Schema telemetry.
            </p>
          </div>

          <FAQTemplate
            title="Monitoring Replication Status &amp; SHOW REPLICA STATUS FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
