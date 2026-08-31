import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Restoring Databases from mysqldump SQL Files and Handling Foreign Key Checks During Import
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive database restore workbench: executing command-line imports, bypassing foreign key constraint deadlocks, applying session performance accelerations, extracting individual tables with sed, and tracking real-time restore throughput with pv in MySQL 8.0.
 */
const Topic4 = () => {
  // Interactive Restore State
  const [selectedRestorePhase, setSelectedRestorePhase] = useState("phase1_cli_syntax");

  const restorePhases = {
    phase1_cli_syntax: {
      phaseNumber: "Phase 1: CLI Syntax & Streaming",
      title: "1. Command-Line Restore & Streaming Decompression",
      badge: "Restore Fundamentals",
      badgeColor: "emerald",
      sqlSnippet: `-- 📥 1. DUMP WITH --databases (Includes CREATE DATABASE & USE):
mysql -u root -p < /backups/kolkata_services.sql

-- 📥 2. DUMP WITHOUT --databases (Must create & specify target database):
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS kolkata_ecommerce;"
mysql -u root -p kolkata_ecommerce < /backups/ecommerce.sql

-- ⚡ 3. STREAMING DECOMPRESSION DIRECTLY TO CLIENT:
zstd -dc /backups/retail_backup.sql.zst | mysql -u root -p
gunzip < /backups/retail_backup.sql.gz | mysql -u root -p`,
      explanation:
        "Restoring depends on how the dump was generated. Multi-database dumps with --databases automatically create schemas. Piping streaming decompressors (zstd/gunzip) directly into the mysql client eliminates intermediate uncompressed disk usage.",
      keyTakeaways: [
        "Dumps with --databases switch schemas automatically on import.",
        "Single-database dumps require specifying the target schema name.",
        "Streaming decompression restores directly from compressed archives."
      ]
    },
    phase2_foreign_key_bypass: {
      phaseNumber: "Phase 2: Foreign Key Constraints",
      title: "2. Bypassing Foreign Key Deadlocks & Dependency Order",
      badge: "Constraint Bypass",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚠️ THE ALPHABETICAL FOREIGN KEY DEPENDENCY TRAP:
-- Table 'order_items' (Child) is dumped before 'orders' (Parent).
-- Inserting into 'order_items' fails because referenced 'orders' rows do not exist yet!

-- 🛡️ HOW MYSQLDUMP AUTOMATICALLY RESOLVES THIS:
-- 1. Header (Top of file):
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

-- 2. Bulk row insertions execute with zero foreign key constraint blocks...

-- 3. Footer (Bottom of file):
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;`,
      explanation:
        "Because tables are dumped alphabetically, child tables are restored before parent tables. Disabling foreign key checks at the top of the dump allows all rows to load without constraint failures, restoring validation once import completes.",
      keyTakeaways: [
        "FOREIGN_KEY_CHECKS=0 prevents child-before-parent import deadlocks.",
        "UNIQUE_CHECKS=0 accelerates primary and unique key insertions.",
        "Variables are safely restored to their original state at the footer."
      ]
    },
    phase3_bulk_optimizations: {
      phaseNumber: "Phase 3: 10x Speed Optimizations",
      title: "3. Accelerating Bulk Restore Performance (10x Speedup)",
      badge: "High-Speed Bulk Load",
      badgeColor: "purple",
      sqlSnippet: `-- 🚀 TUNING SESSION & ENGINE FOR 10X RESTORE ACCELERATION:

-- 1. Disable binary logging during restore (Prevents replica flood):
SET sql_log_bin = 0;

-- 2. Disable constraint validation and autocommit:
SET foreign_key_checks = 0;
SET unique_checks = 0;
SET autocommit = 0;

-- 3. Temporarily relax redo log flushing during initial DR load:
SET GLOBAL innodb_flush_log_at_trx_commit = 2;

-- 4. Execute restore:
SOURCE /backups/large_ecommerce_dump.sql;
COMMIT;

-- 5. Restore production durability settings:
SET GLOBAL innodb_flush_log_at_trx_commit = 1;
ANALYZE TABLE kolkata_ecommerce.orders;`,
      explanation:
        "Tuning session parameters during import removes disk write bottlenecks: disabling binlog generation, relaxing redo log flushing, and grouping inserts into large transaction commits reduces restore times from hours to minutes.",
      keyTakeaways: [
        "SET sql_log_bin = 0 prevents replica lag and duplicate replication traffic.",
        "innodb_flush_log_at_trx_commit = 2 relaxes per-commit disk flushes during restore.",
        "ANALYZE TABLE regenerates index statistics for query planner optimization."
      ]
    },
    phase4_single_table_and_pv: {
      phaseNumber: "Phase 4: Single Table & Progress",
      title: "4. Extracting Single Tables & Monitoring with pv",
      badge: "Forensic Extraction",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 1. EXTRACT SINGLE TABLE FROM 100GB MONOLITHIC DUMP (Using sed):
sed -n -e '/DROP TABLE.*\`customer_kyc\`/,/UNLOCK TABLES/p' full_dump.sql > kyc_only.sql
mysql -u root -p kolkata_bank < kyc_only.sql

-- ⏱️ 2. TRACK REAL-TIME RESTORE THROUGHPUT & ETA WITH pv (Pipe Viewer):
pv /backups/bank_dump.sql | mysql -u root -p kolkata_bank
-- Telemetry Output:
-- 4.12GiB 0:03:15 [24.5MiB/s] [===============═→   ] 62% ETA 0:01:58`,
      explanation:
        "Using sed allows DBAs to extract and restore a single accidentally dropped table in seconds without restoring the entire 100GB file. Pipe Viewer (pv) provides real-time throughput metrics and accurate ETA tracking for management reporting.",
      keyTakeaways: [
        "sed extracts targeted table DDL and DML blocks from massive dumps.",
        "pv displays real-time throughput (MB/s), completion percentage, and ETA.",
        "Eliminates guesswork during high-pressure disaster recovery operations."
      ]
    }
  };

  const currentPhase = restorePhases[selectedRestorePhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 4 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Restoring Databases from <span className="text-emerald-400">mysqldump</span> &amp; <span className="text-cyan-400">Foreign Key Checks</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering logical database restoration in MySQL 8.0: understanding CLI scoping, resolving foreign key constraint deadlocks with <code>FOREIGN_KEY_CHECKS=0</code>, applying 10x bulk insert performance accelerations, extracting single tables with <code>sed</code>, and monitoring restore throughput with <code>pv</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Restoration Pillars ─────────────────────────── */}
        <section id="restoration-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of High-Speed Database Restoration
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential techniques for executing fast, dependable, and deadlock-free logical restores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Constraint Bypass</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>FOREIGN_KEY_CHECKS=0</code> bypasses alphabetical dependency errors during bulk table loads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Bulk Acceleration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Disabling <code>sql_log_bin</code> and tuning redo log flushing cuts restore time by up to 10x.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Progress Telemetry</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>pv</code> (Pipe Viewer) tracks throughput (MB/s), total bytes, and exact ETA in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Targeted Extraction</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Extract individual dropped tables from monolithic dumps in seconds using <code>sed</code> or <code>awk</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Database Restore Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe CLI restore commands, foreign key lifecycle, bulk speedup parameters, and single table extraction.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(restorePhases).map((phaseKey) => {
              const phase = restorePhases[phaseKey];
              const isSelected = selectedRestorePhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedRestorePhase(phaseKey)}
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
                CLI Command &amp; Optimization Execution:
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
              Restoration case studies in Barrackpore and Kolkata demonstrating single-table extraction and 10x bulk insert acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Accelerating 20GB POS Restore in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  12-Minute Restore
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a 20GB disaster recovery restore was dragging past 3 hours due to heavy disk write contention. Mamata set <code>SET sql_log_bin = 0;</code> and temporarily configured <code>innodb_flush_log_at_trx_commit = 2</code> on the test host. Restore time dropped from 3 hours to 12 minutes, allowing the store to resume billing operations ahead of schedule.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Instant Single Table Extraction in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  90-Second Recovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an accidental script dropped the <code>customer_kyc</code> table. The bank possessed a 120GB full instance dump. Rather than spending 5 hours restoring the entire 120GB database, Debangshu used <code>sed</code> to extract only the <code>customer_kyc</code> DDL and INSERT block into a separate file. The KYC table was fully restored in 90 seconds with zero downtime on other banking services.
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
              Avoid dangerous replication loops and missing optimizer statistics traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving sql_log_bin Enabled on Replicas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Restoring a dump onto a replica without setting <code>SET sql_log_bin = 0;</code> writes all restore statements to the replica's binary log, causing replication lag and loops.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always set sql_log_bin = 0 in the restore session on replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting to Run ANALYZE TABLE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Bulk inserting millions of rows leaves optimizer statistics outdated, causing queries to trigger slow full table scans instead of using indexes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Run mysqlcheck --analyze across all tables immediately post-restore.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor Restores with pv
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Pipe dump files through <code>pv</code> to display real-time MB/s throughput, percentage complete, and accurate ETA projections during crisis recovery.
              </p>
              <div className="text-xs text-slate-400">
                Enables precise progress reporting to management.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Match max_allowed_packet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure the target server's <code>max_allowed_packet</code> is sized to 128MB+ before import to prevent packet size errors on extended multi-row inserts.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates Error 1153 (Packet bigger than max_allowed_packet).
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
            title="Topic 4: Restoring Databases from mysqldump SQL Files and Handling Foreign Key Checks During Import"
            content={noteText}
          />

          <Teacher
            note="Restoring databases is a crucial engineering skill. Remember why FOREIGN_KEY_CHECKS=0 is essential: tables are imported alphabetically, so child rows would fail without disabling constraints. To accelerate large imports, set sql_log_bin = 0, tune redo log flushing, track progress in real-time with pv, and always run ANALYZE TABLE to refresh optimizer statistics once the restore is complete!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of database restoration, foreign key bypass, bulk speedups, and single-table extraction.
            </p>
          </div>

          <FAQTemplate
            title="Database Restoration &amp; Foreign Key FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
