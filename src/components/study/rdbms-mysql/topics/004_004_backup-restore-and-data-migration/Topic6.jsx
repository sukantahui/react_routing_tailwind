import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Physical Hot Backups: Percona XtraBackup and MySQL Enterprise Backup Concepts
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive physical hot backup workbench: exploring the 3-phase lifecycle (--backup, --prepare, --copy-back), tracking 16KB page LSN deltas during incremental backups, preparing restore chains with --apply-log-only, and benchmarking sub-15 minute RTO on multi-terabyte databases in MySQL 8.0.
 */
const Topic6 = () => {
  // Interactive Physical Backup State
  const [selectedPhysicalPhase, setSelectedPhysicalPhase] = useState("phase1_pxb_lifecycle");

  const physicalPhases = {
    phase1_pxb_lifecycle: {
      phaseNumber: "Phase 1: The 3-Phase Lifecycle",
      title: "1. Backup, Prepare & Copy-Back Execution Lifecycle",
      badge: "Core PXB Lifecycle",
      badgeColor: "emerald",
      sqlSnippet: `-- 📦 PHASE 1: NON-BLOCKING ONLINE BACKUP (--backup):
-- Worker threads copy .ibd files while background thread tails redo logs:
xtrabackup --backup --target-dir=/backups/base_2026/ --parallel=8

-- 🛠️ PHASE 2: PREPARE (CRASH RECOVERY ON DISK):
-- Applies recorded redo logs to data pages, bringing all pages to consistent LSN:
xtrabackup --prepare --target-dir=/backups/base_2026/ --use-memory=4G

-- 📥 PHASE 3: RESTORE / COPY-BACK:
-- Copies prepared binary files into empty MySQL data directory:
rm -rf /var/lib/mysql/*
xtrabackup --copy-back --target-dir=/backups/base_2026/
chown -R mysql:mysql /var/lib/mysql`,
      explanation:
        "Percona XtraBackup operates in 3 distinct phases. Raw backup files are crash-inconsistent until the --prepare phase executes InnoDB crash recovery by applying recorded redo logs. Restoring is as fast as physical disk block copy.",
      keyTakeaways: [
        "--backup captures files while streaming active redo logs in the background.",
        "--prepare is mandatory to roll forward changes and achieve consistency.",
        "--copy-back restores pre-built binary pages directly to /var/lib/mysql."
      ]
    },
    phase2_incremental_lsn: {
      phaseNumber: "Phase 2: LSN Incremental Chains",
      title: "2. Page-Level LSN Tracking & Incremental Restoration",
      badge: "LSN Delta Tracking",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 CAPTURING & PREPARING INCREMENTAL BACKUP CHAINS:

-- 1. Day 0 (Sunday Full Base):
xtrabackup --backup --target-dir=/backups/base

-- 2. Day 1 (Monday Incremental - Copies only pages with LSN > base to_lsn):
xtrabackup --backup --target-dir=/backups/inc1 --incremental-basedir=/backups/base

-- 🛠️ PREPARATION SEQUENCE (Note --apply-log-only!):
-- Step A: Prepare Base (Keep transaction rollback open):
xtrabackup --prepare --apply-log-only --target-dir=/backups/base
-- Step B: Merge Monday Incremental into Base:
xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc1`,
      explanation:
        "Incremental physical backups inspect the Log Sequence Number (LSN) in each 16KB page header, copying only modified pages. During preparation, --apply-log-only is mandatory on the base and intermediate steps to keep transactions open for subsequent delta merges.",
      keyTakeaways: [
        "Tracks page modifications via Log Sequence Number (LSN) checkpoints.",
        "--apply-log-only prevents premature rollback during intermediate merges.",
        "Merges all incremental deltas directly into the base backup directory."
      ]
    },
    phase3_streaming_compression: {
      phaseNumber: "Phase 3: Streaming & Compression",
      title: "3. xbstream Streaming & Multi-Threaded Compression",
      badge: "Zero-Disk Streaming",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ 1. STREAM DIRECTLY INTO ZSTANDARD COMPRESSION:
xtrabackup --backup --stream=xbstream --parallel=8 | \\
  zstd -T8 -3 > /backups/kolkata_bank_base.xbstream.zst

-- 📥 2. UNPACK STREAMING ARCHIVE:
mkdir -p /backups/prepared_base
zstd -dc /backups/kolkata_bank_base.xbstream.zst | \\
  xbstream -x -C /backups/prepared_base

-- 🔒 3. ENCRYPT PHYSICAL BACKUP AT REST:
xtrabackup --backup --encrypt=AES256 \\
  --encrypt-key-file=/etc/mysql/backup_vault.key \\
  --target-dir=/backups/encrypted_base/`,
      explanation:
        "The xbstream format enables streaming multi-threaded backups directly into compression tools or network sockets without intermediate disk staging. Native AES-256 encryption protects backup archives at rest.",
      keyTakeaways: [
        "xbstream streams parallel multi-file backups into standard output.",
        "Piping into zstd -T8 delivers high compression with minimal CPU latency.",
        "--encrypt=AES256 guarantees physical backup confidentiality at rest."
      ]
    },
    phase4_single_table_export: {
      phaseNumber: "Phase 4: Single Table Export",
      title: "4. Restoring Single Tables via Transportable Tablespaces",
      badge: "Single Table Fast-Path",
      badgeColor: "rose",
      sqlSnippet: `-- 🎯 RESTORING A SINGLE DROPPED TABLE FROM PHYSICAL BACKUP:

-- Step 1: Prepare backup with --export flag:
xtrabackup --prepare --export --target-dir=/backups/base
-- Generates .cfg metadata files alongside .ibd tablespace files!

-- Step 2: In Live MySQL Instance:
ALTER TABLE kolkata_retail.orders DISCARD TABLESPACE;

-- Step 3: Copy prepared orders.ibd and orders.cfg to live data directory:
-- cp /backups/base/kolkata_retail/orders.* /var/lib/mysql/kolkata_retail/
-- chown mysql:mysql /var/lib/mysql/kolkata_retail/orders.*

-- Step 4: Import restored tablespace instantly:
ALTER TABLE kolkata_retail.orders IMPORT TABLESPACE;`,
      explanation:
        "Preparing physical backups with --export generates .cfg metadata files, enabling individual tables to be restored into a live database via Transportable Tablespaces (DISCARD/IMPORT TABLESPACE) in seconds.",
      keyTakeaways: [
        "--export generates .cfg metadata files for individual table imports.",
        "DISCARD and IMPORT TABLESPACE restores single tables in seconds.",
        "Eliminates the need to restore an entire multi-terabyte database instance."
      ]
    }
  };

  const currentPhase = physicalPhases[selectedPhysicalPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Physical Hot Backups: <span className="text-emerald-400">Percona XtraBackup</span> &amp; MEB Architecture
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering enterprise block-level physical backups in MySQL 8.0: understanding the 3-phase lifecycle (<code>--backup</code>, <code>--prepare</code>, <code>--copy-back</code>), tracking 16KB page LSN deltas during incremental backups, streaming with <code>xbstream</code>, and executing sub-15 minute disaster recovery.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Physical Architecture Pillars ────────────────── */}
        <section id="physical-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Physical Hot Backups
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How physical block copying achieves line-rate NVMe restore speeds with zero transactional write locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Block-Level Copy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly copies raw 16KB <code>.ibd</code> pages, completely bypassing SQL parsing and index rebuilding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Redo Log Streaming</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tails active InnoDB Redo Logs in the background to capture concurrent in-flight page modifications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">LSN Incrementals</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Tracks modified page Log Sequence Numbers (LSN) to capture compact, fast incremental deltas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Sub-15m RTO</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Restores 5TB production databases in 12-15 minutes, meeting aggressive enterprise disaster SLAs.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Physical Backup Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the 3-phase lifecycle, incremental LSN preparation, xbstream pipelines, and single-table export workflows.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(physicalPhases).map((phaseKey) => {
              const phase = physicalPhases[phaseKey];
              const isSelected = selectedPhysicalPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedPhysicalPhase(phaseKey)}
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
                CLI Command &amp; Under-the-Hood Workflow:
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
              Physical backup case studies in Barrackpore and Kolkata demonstrating zero-locking 500GB backups and 12-minute 6TB disaster recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 500GB Non-Blocking Retail Backup in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  18-Minute Backup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a 500GB retail inventory database required nightly automated backups during peak sales hours. Mamata scheduled <code>xtrabackup --backup --parallel=4</code>. The block-level backup finished in 18 minutes while POS terminals processed sales continuously with zero write latency or lock contention.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 6TB Core Banking Restore in 12 Minutes in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Sub-15m RTO Met
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing a 6TB core banking cluster processing ₹500 Crores in volume required a strict 15-minute RTO SLA. When a primary SAN storage array experienced controller failure, Debangshu executed <code>xtrabackup --copy-back --parallel=16</code> on the standby host. The entire 6TB database was restored and booted in 12 minutes, saving ₹1.8 Crores in outage penalties.
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
              Avoid dangerous un-prepared restores and missing permission traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Booting MySQL on an Unprepared Backup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Starting MySQL directly on raw files copied with <code>--backup</code> without running <code>--prepare</code> leads to immediate fatal crash and corrupted tablespaces.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always run xtrabackup --prepare before running --copy-back.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting chown -R mysql:mysql
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>--copy-back</code> as root creates files owned by root; MySQL will fail to start with <code>Permission denied</code> on tablespaces.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute chown -R mysql:mysql /var/lib/mysql before starting mysqld.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Allocate RAM with --use-memory
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Supply <code>--use-memory=4G</code> during <code>--prepare</code> to accelerate redo log replay and crash recovery from 20 minutes to 2 minutes.
              </p>
              <div className="text-xs text-slate-400">
                Significantly reduces preparation time during disaster recovery.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Stream with xbstream &amp; Zstandard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Stream multi-threaded backups directly into <code>zstd -T8</code> using <code>--stream=xbstream</code> to eliminate intermediate uncompressed disk space.
              </p>
              <div className="text-xs text-slate-400">
                Saves 70% storage and enables direct offsite cloud uploads.
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
            title="Topic 6: Physical Hot Backups: Percona XtraBackup and MySQL Enterprise Backup Concepts"
            content={noteText}
          />

          <Teacher
            note="For multi-hundred gigabyte and multi-terabyte production databases, Physical Hot Backups with Percona XtraBackup are non-negotiable! Master the 3-phase lifecycle: --backup tails the redo log while copying 16KB data pages, --prepare applies the redo log to make files crash-consistent, and --copy-back restores them in minutes. Always remember to use --apply-log-only on intermediate incremental merges and run chown -R mysql:mysql before booting MySQL!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of physical hot backups, redo log streaming, LSN incrementals, and xbstream pipelines.
            </p>
          </div>

          <FAQTemplate
            title="Physical Hot Backups &amp; XtraBackup FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
