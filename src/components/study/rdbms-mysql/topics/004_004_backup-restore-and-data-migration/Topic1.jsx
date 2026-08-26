import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Backup Classification: Logical vs Physical Backups, Cold vs Hot vs Warm Backups, Full vs Incremental Backups
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive backup classification workbench: comparing logical SQL text dumps against raw physical block copies, evaluating non-blocking MVCC hot snapshots vs offline cold backups, and preparing multi-step incremental LSN restore chains in MySQL 8.0.
 */
const Topic1 = () => {
  // Interactive Classification State
  const [selectedClassPhase, setSelectedClassPhase] = useState("phase1_logical_vs_physical");

  const classificationPhases = {
    phase1_logical_vs_physical: {
      phaseNumber: "Phase 1: Logical vs Physical",
      title: "1. Logical SQL Dumps vs Physical Block Backups",
      badge: "Architecture Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 📦 1. LOGICAL HOT BACKUP (mysqldump / MySQL Shell Dump):
-- Generates human-readable SQL DDL + INSERT statements:
mysqldump --single-transaction --quick --routines --triggers --events \\
  -u root -p kolkata_retail &gt; /backups/retail_logical.sql

-- 📦 2. PHYSICAL HOT BACKUP (Percona XtraBackup):
-- Directly copies raw binary .ibd files & streams redo logs:
xtrabackup --backup --target-dir=/backups/base_physical/ \\
  --parallel=8 --compress=zstd`,
      explanation:
        "Logical backups export SQL statements, making them portable across major MySQL versions, operating systems, and cloud providers. Physical backups copy raw data pages directly at the disk block level, enabling sub-15 minute restore times on multi-terabyte production databases.",
      keyTakeaways: [
        "Logical: Human-readable SQL, portable across versions, ideal for datasets < 50GB.",
        "Physical: Raw binary data pages, ultra-fast restore, essential for datasets > 100GB.",
        "Physical restores bypass expensive SQL query parsing and B-tree index rebuilds."
      ]
    },
    phase2_cold_warm_hot: {
      phaseNumber: "Phase 2: Cold vs Warm vs Hot",
      title: "2. Offline Cold vs Read-Only Warm vs Online Hot Backups",
      badge: "Locking & Concurrency",
      badgeColor: "cyan",
      sqlSnippet: `-- ❄️ 1. COLD BACKUP (Offline - Server Stopped):
-- systemctl stop mysqld; tar -czf /backups/cold_mysql.tar.gz /var/lib/mysql

-- ⛅ 2. WARM BACKUP (Read-Only - Writes Blocked):
-- FLUSH TABLES WITH READ LOCK; (Stalls all INSERT/UPDATE/DELETE queries!)

-- 🔥 3. HOT BACKUP (Online Non-Blocking - 24/7 Production):
-- InnoDB MVCC Consistent Snapshot: Zero write locking!
mysqldump --single-transaction kolkata_retail &gt; hot_backup.sql`,
      explanation:
        "Cold backups require full application downtime. Warm backups block all data mutations with table locks. Hot backups use InnoDB MVCC snapshots (--single-transaction) or continuous redo log streaming to take 100% consistent backups while concurrent writes continue without interruption.",
      keyTakeaways: [
        "Cold requires full service shutdown; Warm locks all write transactions.",
        "Hot backups use MVCC snapshots to ensure zero write contention.",
        "Always use --single-transaction on production InnoDB workloads."
      ]
    },
    phase3_full_vs_incremental: {
      phaseNumber: "Phase 3: Full vs Incremental LSN",
      title: "3. Full Baseline vs Page LSN-Based Incremental Chains",
      badge: "LSN Delta Tracking",
      badgeColor: "purple",
      sqlSnippet: `-- 🔄 INCREMENTAL PHYSICAL BACKUP & RESTORE SEQUENCE:

-- Day 0 (Sunday): Full Base Physical Backup:
xtrabackup --backup --target-dir=/backups/base

-- Day 1 (Monday): Incremental Backup (Copies only pages modified since Day 0):
xtrabackup --backup --target-dir=/backups/inc1 --incremental-basedir=/backups/base

-- 🛠️ PREPARATION & RESTORATION WORKFLOW:
-- Step 1: Apply redo log to base:
xtrabackup --prepare --apply-log-only --target-dir=/backups/base
-- Step 2: Roll forward Monday incremental into base:
xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc1`,
      explanation:
        "Incremental backups inspect the Log Sequence Number (LSN) in each 16KB data page header, copying only pages changed since the previous backup. Restoring requires applying incremental delta directories sequentially to the base backup before copying back to disk.",
      keyTakeaways: [
        "Incremental backups save storage space and backup execution time.",
        "XtraBackup tracks modified pages via header Log Sequence Numbers (LSN).",
        "Preparation rolls forward all incremental deltas into the base directory."
      ]
    },
    phase4_decision_matrix: {
      phaseNumber: "Phase 4: Tool Decision Matrix",
      title: "4. Production Tool Selection Matrix by Dataset Scale",
      badge: "Architecture Sizing",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 PRODUCTION BACKUP SIZING & TOOL RECOMMENDATION:

-- Dataset < 20 GB:
-- Tool: mysqldump --single-transaction --quick
-- Expected Restore Time: < 15 minutes

-- Dataset 20 GB - 100 GB:
-- Tool: mydumper / myloader (Parallel Multi-threaded Logical Dump)
-- Expected Restore Time: < 30 minutes

-- Dataset > 100 GB - Multi-TB:
-- Tool: Percona XtraBackup (Physical Hot Backup + LSN Incrementals)
-- Expected Restore Time: < 15 minutes (Direct block file copy)`,
      explanation:
        "Choosing the right backup strategy depends on database size and RTO requirements. Small databases benefit from the simplicity of mysqldump, medium databases use parallel mydumper, and large enterprise databases mandate physical hot backups with Percona XtraBackup.",
      keyTakeaways: [
        "< 20GB: mysqldump provides simplicity and universal portability.",
        "20GB - 100GB: mydumper parallelizes dumps across multiple CPU threads.",
        "> 100GB: Percona XtraBackup guarantees enterprise sub-15 minute RTO."
      ]
    }
  };

  const currentPhase = classificationPhases[selectedClassPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 1 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Backup Classification: <span className="text-emerald-400">Logical vs Physical</span> &amp; <span className="text-cyan-400">Hot vs Cold</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive breakdown of database backup methodologies in MySQL 8.0: contrasting logical SQL text dumps against raw binary physical block copies, evaluating non-blocking MVCC hot snapshots against offline cold backups, and mastering incremental LSN restore chains.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Classification Dimensions ───────────────────── */}
        <section id="classification-dimensions" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Dimensions of Backup Classification
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How database backups are categorized by format, execution state, and data scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Dimension 1</span>
              <h3 className="text-lg font-bold text-white">Logical vs Physical</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Logical:</strong> SQL text statements (portable, human-readable).<br />
                <strong>Physical:</strong> Raw binary block files (ultra-fast line-rate restore).
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400">
                Rule: Use physical for datasets &gt; 100GB.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Dimension 2</span>
              <h3 className="text-lg font-bold text-white">Cold vs Warm vs Hot</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Cold:</strong> Offline daemon shutdown.<br />
                <strong>Warm:</strong> Read-only table locks.<br />
                <strong>Hot:</strong> Non-blocking online MVCC snapshot.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-400">
                Rule: Never use cold backups in 24/7 production.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-3 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Dimension 3</span>
              <h3 className="text-lg font-bold text-purple-300">Full vs Incremental</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>Full:</strong> Complete 100% baseline copy.<br />
                <strong>Incremental:</strong> LSN-tracked page delta since last backup.
              </p>
              <div className="pt-2 text-xs font-mono text-purple-300">
                Rule: Prepare incremental chains chronologically.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Backup Classification Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect command structures, locking behaviors, incremental preparation workflows, and dataset sizing guidelines.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(classificationPhases).map((phaseKey) => {
              const phase = classificationPhases[phaseKey];
              const isSelected = selectedClassPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedClassPhase(phaseKey)}
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
                CLI Command &amp; Workflow Implementation:
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
              Classification case studies in Barrackpore and Kolkata demonstrating small-scale logical dumps and multi-terabyte physical hot backups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 12GB Retail Store Backup in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Logical Hot Dump
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a 12GB retail store database required nightly automated backups. Mamata configured <code>mysqldump --single-transaction --quick --routines --triggers</code> piped into <code>gzip</code>. The backup finished in 2 minutes 40 seconds without blocking a single billing terminal, producing a portable SQL file that allowed easy single-table extraction.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 5TB Fintech Cluster in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Physical XtraBackup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing a 5TB core banking cluster processing ₹500 Crores in volume required non-blocking hot backups. When tested, <code>mysqldump</code> caused massive buffer pool churn and took 11 hours. Debangshu deployed Percona XtraBackup with parallel compression, reducing backup time to 28 minutes and restore time to 14 minutes, fully meeting regulatory compliance.
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
              Avoid dangerous table locking and uncoordinated backup preparation mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Omitting --single-transaction on Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>mysqldump</code> without <code>--single-transaction</code> acquires global read locks, blocking all application write traffic for the duration of the dump.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use --single-transaction for online InnoDB hot backups.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting to Prepare Incremental Backups
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Copying raw XtraBackup incremental files directly to the data directory without running <code>--prepare</code> leads to immediate database crash and corrupted tablespaces.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always prepare base + incremental chains with --apply-log-only.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Pipe mysqldump into Streaming Compression
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Stream <code>mysqldump</code> output directly into <code>zstd</code> or <code>pigz</code> to save 70% disk space without generating giant intermediate uncompressed files.
              </p>
              <div className="text-xs text-slate-400">
                Reduces disk I/O bottlenecks and optimizes backup network transfer.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Match Backup Tool to Dataset Size
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Follow the 50GB rule: use <code>mysqldump</code> for small datasets (&lt; 50GB) and Percona XtraBackup for enterprise datasets (&gt; 100GB).
              </p>
              <div className="text-xs text-slate-400">
                Guarantees predictable restore times and meets enterprise RTO targets.
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
            title="Topic 1: Backup Classification: Logical vs Physical, Cold vs Hot vs Warm, Full vs Incremental"
            content={noteText}
          />

          <Teacher
            note="Understand the trade-offs of each backup classification: Logical dumps (mysqldump) are portable and human-readable, making them perfect for small databases (&lt; 50GB) and cross-version migrations. Physical backups (Percona XtraBackup) are binary-bound, but restore in minutes on multi-terabyte databases. Never lock your production database with warm or cold backups—always leverage InnoDB MVCC snapshots and background redo log streaming!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of logical vs physical backups, non-blocking MVCC snapshots, and incremental LSN restoration.
            </p>
          </div>

          <FAQTemplate
            title="Backup Classification &amp; Strategy FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
