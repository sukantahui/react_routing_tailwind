import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – mysqldump Flags for Consistent Backups: --single-transaction, --quick, --routines, --triggers, --events, --master-data
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive mysqldump flags workbench: exploring the gold-standard production flag combination, dissecting non-blocking MVCC snapshotting, preventing OOM memory crashes with --quick, embedding PITR coordinates via --source-data=2, and encoding binary blobs safely in MySQL 8.0.
 */
const Topic3 = () => {
  // Interactive Flags State
  const [selectedFlagPhase, setSelectedFlagPhase] = useState("phase1_gold_standard");

  const flagPhases = {
    phase1_gold_standard: {
      phaseNumber: "Phase 1: Gold Standard Flag Suite",
      title: "1. The Production-Grade mysqldump Command Suite",
      badge: "Production Standard",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏆 THE GOLD-STANDARD PRODUCTION BACKUP COMMAND:

mysqldump -u backup_admin -p \\
  --single-transaction \\
  --quick \\
  --routines \\
  --triggers \\
  --events \\
  --source-data=2 \\
  --hex-blob \\
  --default-character-set=utf8mb4 \\
  --max-allowed-packet=128M \\
  --databases kolkata_ecommerce kolkata_finance | \\
  zstd -T4 -3 &gt; /backups/prod_$(date +%F).sql.zst`,
      explanation:
        "This battle-tested combination guarantees a 100% consistent, non-blocking MVCC snapshot without locking tables, streams rows to avoid OOM memory crashes, includes all stored procedures, triggers, and scheduled events, and embeds binary log coordinates for PITR.",
      keyTakeaways: [
        "--single-transaction guarantees non-blocking InnoDB MVCC point-in-time consistency.",
        "--quick streams rows one-by-one to keep client RAM consumption < 10MB.",
        "--source-data=2 captures binlog coordinates for Point-in-Time Recovery."
      ]
    },
    phase2_single_trx_and_quick: {
      phaseNumber: "Phase 2: MVCC & OOM Prevention",
      title: "2. --single-transaction & --quick Internals",
      badge: "Locking & Memory",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔬 UNDER THE HOOD: MVCC SNAPSHOT & ROW-BY-ROW STREAMING:

-- 1. How --single-transaction works:
-- Executes: START TRANSACTION WITH CONSISTENT SNAPSHOT;
-- Reads historical row versions from InnoDB Undo Logs under REPEATABLE READ.
-- Application transactions continue writing without table locks!

-- 2. How --quick works at C API layer:
-- Calls mysql_use_result() instead of mysql_store_result().
-- Rows are fetched from server one-by-one and streamed directly to disk/zstd.
-- Prevents Out-Of-Memory (OOM) killer terminations on 500GB tables!`,
      explanation:
        "--single-transaction leverages InnoDB Multi-Version Concurrency Control (MVCC) to read consistent historical data without acquiring table locks. --quick fetches rows sequentially, ensuring memory consumption stays flat regardless of table size.",
      keyTakeaways: [
        "MVCC consistent snapshots isolate the dump from concurrent writes.",
        "mysql_use_result() eliminates client-side memory buffering.",
        "Prevents write downtime and OOM process termination."
      ]
    },
    phase3_routines_triggers_events: {
      phaseNumber: "Phase 3: Business Logic Flags",
      title: "3. Retaining Procedures, Functions & Events",
      badge: "Logic Retention",
      badgeColor: "purple",
      sqlSnippet: `-- 📜 RETAINING COMPLETE DATABASE BUSINESS LOGIC:

-- 1. Stored Procedures & User-Defined Functions:
-- By default: NOT included in mysqldump!
-- Flag: --routines (-R)

-- 2. Event Scheduler Scheduled Jobs:
-- By default: NOT included in mysqldump!
-- Flag: --events (-E)

-- 3. Table Triggers:
-- Included by default, but verified with: --triggers

-- Exporting complete logic suite:
mysqldump --single-transaction --routines --triggers --events kolkata_finance > full_logic.sql`,
      explanation:
        "By default, mysqldump excludes stored procedures, user-defined functions, and scheduled events. Omitting --routines and --events creates an incomplete backup where critical business logic and background cron tasks are lost upon restoration.",
      keyTakeaways: [
        "--routines (-R) exports stored procedures and custom SQL functions.",
        "--events (-E) exports Event Scheduler cron jobs.",
        "Triggers are enabled by default but should always be explicitly verified."
      ]
    },
    phase4_coordinates_and_hexblob: {
      phaseNumber: "Phase 4: PITR Coordinates & Hex-Blob",
      title: "4. --source-data=2 & Binary Data Hex Encoding",
      badge: "PITR & Binary Safety",
      badgeColor: "rose",
      sqlSnippet: `-- 📍 1. RECORDING BINLOG COORDINATES (--source-data=2):
-- Briefly acquires a global read lock at snapshot moment, records position,
-- and releases lock immediately in ~10ms:

-- Output inside SQL file:
-- CHANGE REPLICATION SOURCE TO SOURCE_LOG_FILE='binlog.000045', SOURCE_LOG_POS=1582;

-- 🛡️ 2. ENCODING BINARY / BLOB / ENCRYPTED DATA (--hex-blob):
-- Dumps BLOB bytes as clean hexadecimal string literals (e.g. 0x89504E470D0A1A0A...)
-- Prevents null bytes and charset translators from corrupting ciphertexts!`,
      explanation:
        "--source-data=2 embeds the exact binary log file coordinates required for Point-in-Time Recovery into the SQL dump header as a comment. --hex-blob converts binary columns into hexadecimal literals, preventing data corruption during transfer.",
      keyTakeaways: [
        "--source-data=2 provides the anchor coordinates for replaying binary logs.",
        "--hex-blob prevents character set converters from mangling binary data.",
        "Essential for encrypted database tablespaces and binary tokens."
      ]
    }
  };

  const currentPhase = flagPhases[selectedFlagPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          mysqldump Flags for <span className="text-emerald-400">Consistent Backups</span>: In-Depth Analysis
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Detailed technical analysis of essential mysqldump flags in MySQL 8.0: understanding non-blocking MVCC snapshots with <code>--single-transaction</code>, preventing OOM memory crashes with <code>--quick</code>, preserving business logic via <code>--routines</code> and <code>--events</code>, capturing PITR coordinates via <code>--source-data=2</code>, and encoding binary blobs safely.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Flag Arsenal Matrix ─────────────────────────── */}
        <section id="flag-arsenal" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Essential Flag Arsenal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why each flag in the gold-standard backup suite is vital for production data integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Consistency</span>
              <h3 className="font-bold text-white text-base">--single-transaction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                InnoDB MVCC snapshot under <code>REPEATABLE READ</code>. Zero table locks or write contention.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Memory Safety</span>
              <h3 className="font-bold text-white text-base">--quick (-q)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Streams rows one-by-one via <code>mysql_use_result()</code> to keep client RAM usage &lt; 10MB.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Logic Retention</span>
              <h3 className="font-bold text-purple-300 text-base">--routines &amp; --events</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Exports stored procedures, functions, and Event Scheduler cron jobs omitted by default.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Recovery Anchor</span>
              <h3 className="font-bold text-rose-300 text-base">--source-data=2</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Records binary log file coordinates for Point-in-Time Recovery without modifying topology.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Flag Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe flag combinations, MVCC snapshot internals, business logic extraction, and PITR coordinate capture.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(flagPhases).map((phaseKey) => {
              const phase = flagPhases[phaseKey];
              const isSelected = selectedFlagPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedFlagPhase(phaseKey)}
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
                CLI Command &amp; Under-the-Hood Execution:
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
              Flag configuration case studies in Barrackpore and Kolkata demonstrating locking prevention and OOM mitigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Midnight POS Locking in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  0 Write Locks
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail billing terminals frequently locked up during midnight sales reconciliations. Mamata inspected the backup script and discovered <code>mysqldump</code> was running without flags, defaulting to <code>--lock-tables</code>. She replaced it with <code>--single-transaction --quick --routines --triggers</code>. POS cashiers were able to process sales continuously without a single blocked transaction.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Eliminating OOM Crashes on 250GB Banking Table in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Flat 8MB RAM
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a financial audit export kept failing on a 250GB transaction ledger due to Linux OOM killer terminating the backup process. Debangshu identified that <code>mysqldump</code> was buffering rows in memory. He added <code>--quick</code>, enabling <code>mysql_use_result()</code>. Client memory consumption plummeted from 32GB to a flat 8MB, completing the export cleanly in 35 minutes.
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
              Avoid dangerous schema alteration conflicts and GTID set overwrite bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Running DDL Migrations During Dump
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an <code>ALTER TABLE</code> executes while <code>mysqldump --single-transaction</code> is running, the dump fails immediately with <code>Error 1412 (Table definition changed)</code>.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Schedule DDL migrations outside backup windows, or use LOCK INSTANCE FOR BACKUP.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: GTID Overwrites on Active Clusters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Importing a dump with default GTID statements onto an active cluster fails with <code>@@GLOBAL.GTID_PURGED cannot be changed</code>.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use --set-gtid-purged=OFF when restoring single tables or databases into active clusters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Include --source-data=2
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Embedding binary log coordinates into backup file headers enables exact Point-in-Time Recovery (PITR) up to the second before failure.
              </p>
              <div className="text-xs text-slate-400">
                Mandatory for replaying binary logs during disaster recovery.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Mandate --hex-blob and UTF-8
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify <code>--hex-blob</code> and <code>--default-character-set=utf8mb4</code> to eliminate character corruption on binary tokens and multilingual strings.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees 100% binary fidelity across all data types.
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
            title="Topic 3: mysqldump Flags for Consistent Backups: --single-transaction, --quick, --routines, --triggers, --events, --master-data"
            content={noteText}
          />

          <Teacher
            note="Never run mysqldump without understanding its flags! In production, always mandate the gold-standard combination: --single-transaction for non-blocking MVCC snapshots, --quick to avoid OOM crashes, --routines and --events to retain business logic, --source-data=2 to embed PITR coordinates, and --hex-blob to protect binary data. These flags transform a basic command into an enterprise-grade disaster recovery asset!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of mysqldump flags, MVCC snapshot internals, memory streaming, and binary safety.
            </p>
          </div>

          <FAQTemplate
            title="mysqldump Production Flags FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
