import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Replication Lag: Root Causes (Single-Threaded Applier, Long-Running Queries, Disk I/O) and Mitigation
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive replication lag diagnosis workbench: exploring the top 5 root causes of replication lag, simulating multi-threaded parallel applier acceleration, chunking monolithic batch queries, and monitoring sub-millisecond precision lag via pt-heartbeat in MySQL 8.0.
 */
const Topic8 = () => {
  // Interactive Root Cause Diagnosis State
  const [selectedCauseKey, setSelectedCauseKey] = useState("cause1_single_thread");

  const lagRootCauses = {
    cause1_single_thread: {
      causeName: "1. Single-Threaded Applier",
      title: "1. Concurrency Mismatch: Single-Threaded Applier",
      badge: "Architecture Bottleneck",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 PROBLEM: PRIMARY WRITES IN PARALLEL (64 THREADS), REPLICA APPLIES SERIALLY (1 THREAD)!

-- ✅ SOLUTION: ENABLE MULTI-THREADED SLAVE (MTS) IN MYSQL 8.0:
STOP REPLICA;
SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';
SET GLOBAL replica_preserve_commit_order = ON;
START REPLICA;

-- 💡 Result: Replica applies up to 8 transactions in parallel matching commit order!`,
      explanation:
        "When the primary commits transactions concurrently across dozens of client connections, a single-threaded SQL applier cannot execute fast enough to keep up, creating severe lag. Multi-Threaded Slave (MTS) with LOGICAL_CLOCK unlocks multi-core parallel replay.",
      keyTakeaways: [
        "Primary writes across 64 concurrent threads; legacy replica applies on 1 thread.",
        "replica_parallel_type = 'LOGICAL_CLOCK' replicates primary's commit groups in parallel.",
        "replica_preserve_commit_order = ON guarantees strict transaction commit order."
      ]
    },
    cause2_batch_transactions: {
      causeName: "2. Monolithic Batch Queries",
      title: "2. Large Batch Transactions & Micro-Batch Chunking",
      badge: "Query Bottleneck",
      badgeColor: "cyan",
      sqlSnippet: `-- 💥 FLAWED: MONOLITHIC BATCH DELETE LOCKS REPLICA FOR MINUTES!
DELETE FROM audit_logs WHERE created_at < '2025-01-01'; -- 2,000,000 Rows!

-- ✅ SOLUTION: REFACTOR INTO MICRO-BATCHES WITH LIMIT & SLEEP:
SET @batch_size = 2000;
REPEAT
  DELETE FROM audit_logs WHERE created_at < '2025-01-01' LIMIT 2000;
  SELECT SLEEP(0.05); -- Yields execution to let replication interleave normal traffic!
UNTIL ROW_COUNT() = 0 END REPEAT;`,
      explanation:
        "A single transaction modifying millions of rows blocks the replica's SQL applier thread for its entire execution duration. Refactoring batch operations into micro-batches of 2,000 rows with brief pauses eliminates lag spikes.",
      keyTakeaways: [
        "Monolithic batch operations freeze replica applier threads for minutes.",
        "Chunk large DELETE and UPDATE operations using LIMIT 2000.",
        "Brief sleep pauses allow normal application transactions to interleave cleanly."
      ]
    },
    cause3_missing_indexes: {
      causeName: "3. Missing Indexes on Replica",
      title: "3. Missing Indexes & Row-Based Full Table Scans",
      badge: "Indexing Bottleneck",
      badgeColor: "purple",
      sqlSnippet: `-- 💥 DANGER IN ROW-BASED REPLICATION (binlog_format = ROW):
-- Updating 5,000 rows on a table without an index causes 5,000 FULL TABLE SCANS!
-- If table has 1,000,000 rows: 5,000 x 1,000,000 = 5 BILLION row inspections!

-- ✅ SOLUTION: ENSURE ALL REPLICATED TABLES HAVE PRIMARY OR UNIQUE KEYS:
ALTER TABLE customer_balances ADD PRIMARY KEY (customer_id);
ALTER TABLE ledger_records ADD INDEX idx_account (account_id);

-- 🛡️ Modern Hash Scan Fallback in MySQL 8.0:
SHOW VARIABLES LIKE 'replica_rows_search_algorithms'; -- INDEX_SCAN,HASH_SCAN`,
      explanation:
        "Under Row-Based logging, row modifications require finding each modified row on the replica. Without an index, the replica performs a full table scan for every single row event, causing catastrophic lag spikes.",
      keyTakeaways: [
        "Every row event under ROW format must locate the target row on disk.",
        "Missing indexes trigger full table scans per modified row.",
        "Ensure all replicated tables have primary keys or unique secondary indexes."
      ]
    },
    cause4_heartbeat_telemetry: {
      causeName: "4. Precision Lag Telemetry",
      title: "4. Accurate Lag Monitoring with pt-heartbeat",
      badge: "Telemetry Tooling",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔍 STANDARD LAG METRIC (PRONE TO NTP CLOCK SKEW):
SHOW REPLICA STATUS\\G
-- Seconds_Behind_Source: 0 (Calculated via local replica system clock)

-- 🚀 HIGH-PRECISION SUB-MILLISECOND TELEMETRY (pt-heartbeat):
# 1. On Primary: Injects microsecond timestamp updates:
pt-heartbeat --database=percona --update -h 192.168.1.10 -u monitor_user -p

# 2. On Replica: Measures exact time delta immune to NTP skew:
pt-heartbeat --database=percona --monitor -h 192.168.1.20 -u monitor_user -p
# Output: 0.012s [ 0.01s,  0.02s,  0.01s ] (12 milliseconds exact lag!)`,
      explanation:
        "Seconds_Behind_Source relies on comparing event timestamps against the replica's local system clock, making it vulnerable to NTP skew. pt-heartbeat injects a microsecond heartbeat table, measuring exact lag in milliseconds.",
      keyTakeaways: [
        "Seconds_Behind_Source is skewed if server system clocks drift.",
        "pt-heartbeat measures true sub-millisecond lag via microsecond timestamp tables.",
        "Critical for SLA monitoring and high-frequency automated failover triggers."
      ]
    }
  };

  const currentCause = lagRootCauses[selectedCauseKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Replication Lag</span>: Root Causes, Diagnostics &amp; <span className="text-cyan-400">Mitigation</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering replication lag triage in MySQL 8.0: understanding <code>Seconds_Behind_Source</code> calculations, addressing single-threaded applier bottlenecks with MTS parallel replication, chunking monolithic batch queries, eliminating unindexed row scan stalls, and monitoring sub-millisecond lag with <code>pt-heartbeat</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Lag Causes Pillars ──────────────────────────── */}
        <section id="lag-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Lag Triage
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Systematic diagnostics for identifying and eliminating replication delays across enterprise clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Root Cause 1</span>
              <h3 className="font-bold text-white text-base">Single-Thread Applier</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                64 parallel writers on primary vs 1 sequential SQL thread on replica; solved via MTS parallel replication.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Root Cause 2</span>
              <h3 className="font-bold text-white text-base">Monolithic Batches</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-million row deletes block the SQL thread for minutes; solved by chunking with <code>LIMIT 2000</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Root Cause 3</span>
              <h3 className="font-bold text-purple-300 text-base">Unindexed Row Scans</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Row-based replication performs full table scans per row event if primary or secondary keys are missing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Telemetry 4</span>
              <h3 className="font-bold text-rose-300 text-base">pt-heartbeat Metrics</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Measures true sub-millisecond precision lag via microsecond timestamp tables immune to clock drift.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Replication Lag Diagnosis Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe MTS parallel worker configuration, micro-batch chunking scripts, missing index remediation, and pt-heartbeat telemetry.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(lagRootCauses).map((causeKey) => {
              const cause = lagRootCauses[causeKey];
              const isSelected = selectedCauseKey === causeKey;
              return (
                <button
                  key={causeKey}
                  onClick={() => setSelectedCauseKey(causeKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {cause.causeName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Replication Lag Diagnostic
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentCause.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentCause.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentCause.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentCause.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentCause.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentCause.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCause.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Diagnostic &amp; Remediation SQL:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentCause.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentCause.keyTakeaways.map((item, i) => (
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
              Replication lag case studies in Barrackpore and Kolkata demonstrating micro-batch query refactoring and index scan optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Micro-Batching 2M Rows in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Lag Chunks
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a midnight maintenance script deleted 2,000,000 historical POS receipts, freezing read replicas for 45 minutes across ₹1.2 Crores in inventory. Susmita refactored the purge into micro-batches of 2,000 rows with a 50ms pause (<code>LIMIT 2000</code>), reducing replication lag to 0 seconds while allowing real-time POS sales to interleave seamlessly.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Missing Index Table Scan in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Full Scan Fixed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume, a batch balance update caused replica lag to climb to 25 minutes. Debangshu discovered that the <code>account_balances</code> table lacked a primary key, causing the replica to perform a full scan of 8,000,000 rows for every updated account. Adding a primary key cut lag from 25 minutes to under 50 milliseconds.
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
              Avoid monolithic transaction deletes and under-sizing replica hardware resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Monolithic DELETE / UPDATE Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing a single transaction affecting millions of rows halts the replica SQL applier thread for the entire duration of the query.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always chunk large batch DML into micro-batches of 1,000 to 5,000 rows with LIMIT.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Asymmetric Replica Hardware Sizing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Provisioning replicas with smaller buffer pools or lower disk IOPS causes replicas to stall on disk reads while primary writes in RAM.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Maintain symmetric RAM (innodb_buffer_pool_size) and NVMe IOPS on replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enable Multi-Threaded Slave (MTS)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>replica_parallel_workers = 8</code> and <code>replica_parallel_type = &apos;LOGICAL_CLOCK&apos;</code> to allow multi-core parallel replay.
              </p>
              <div className="text-xs text-slate-400">
                Matches the primary server&apos;s concurrent multi-threaded transaction throughput.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Track True Lag with pt-heartbeat
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deploy <code>pt-heartbeat</code> to track sub-millisecond precision replication lag immune to NTP system clock skews across servers.
              </p>
              <div className="text-xs text-slate-400">
                Provides authoritative metrics for automated HA failover orchestrators.
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
            title="Topic 8: Replication Lag: Root Causes (Single-Threaded Applier, Long-Running Queries, Disk I/O) and Mitigation"
            content={noteText}
          />

          <Teacher
            note="Replication lag is the enemy of high availability and data consistency! Always understand the 5 root causes: single-threaded applier bottlenecks, monolithic batch transactions, missing table indexes under Row-Based replication, asymmetric replica hardware, and blocking DDL migrations. Enable Multi-Threaded Slave (MTS) with LOGICAL_CLOCK, chunk batch queries with LIMIT 2000, ensure every table has a primary key, and monitor true lag with pt-heartbeat!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of replication lag calculations, NTP clock drift, multi-threaded parallel replay, batch chunking, and pt-heartbeat monitoring.
            </p>
          </div>

          <FAQTemplate
            title="Replication Lag Root Causes &amp; Mitigation FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
