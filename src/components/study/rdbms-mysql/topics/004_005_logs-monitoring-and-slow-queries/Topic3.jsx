import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – The Binary Log (binlog): Formats (STATEMENT, ROW, MIXED), Purpose for Replication & Recovery, Purging Expired Binlogs
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive Binary Log workbench: exploring ROW vs STATEMENT determinism, optimizing row image deltas with binlog_row_image, configuring ACID durability with sync_binlog = 1, and executing safe automated purging in MySQL 8.0.
 */
const Topic3 = () => {
  // Interactive Binlog State
  const [selectedBinlogPhase, setSelectedBinlogPhase] = useState("phase1_row_vs_statement");

  const binlogPhases = {
    phase1_row_vs_statement: {
      phaseNumber: "Phase 1: ROW vs STATEMENT",
      title: "1. ROW-Based Determinism vs STATEMENT Replica Drift",
      badge: "Mandated Standard",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ 1. THE DANGER OF STATEMENT LOGGING (NON-DETERMINISTIC DRIFT):
-- Master executes: UPDATE orders SET code = UUID(), discount = RAND() LIMIT 10;
-- Replica executes raw SQL text &rarr; Modifies DIFFERENT rows with DIFFERENT values! ❌

-- 🛡️ 2. ROW-BASED LOGGING (100% DETERMINISTIC DELTAS - MYSQL 8.0 DEFAULT):
-- Master transmits exact before/after physical row bytes:
-- Replica applies the EXACT SAME 10 rows with the EXACT SAME UUIDs & discounts! ✅

-- Check and enforce ROW format:
SET PERSIST binlog_format = 'ROW';`,
      explanation:
        "STATEMENT logging causes data drift when non-deterministic functions (NOW(), UUID(), RAND(), LIMIT) are executed. ROW logging transmits exact before-and-after row image deltas, guaranteeing 100% data consistency across replicas.",
      keyTakeaways: [
        "ROW format is the mandated industry standard in MySQL 8.0.",
        "Prevents silent data divergence on non-deterministic queries.",
        "Essential for multi-source and high-availability replication."
      ]
    },
    phase2_row_image_optimization: {
      phaseNumber: "Phase 2: Row Image Tuning",
      title: "2. Row Image Optimization: FULL vs MINIMAL (binlog_row_image)",
      badge: "Storage Optimization",
      badgeColor: "cyan",
      sqlSnippet: `-- 📦 TUNING ROW IMAGE SIZES (binlog_row_image):

-- 1. FULL (Default): Logs all 80 table columns in before & after images:
-- Produces larger log files but records complete row context.

-- 2. MINIMAL: Logs ONLY the Primary Key in before-image, and ONLY changed columns in after-image:
SET PERSIST binlog_row_image = 'MINIMAL';
-- Reduces binary log disk size and network replication bandwidth by 55%! ⚡

-- 3. NOBLOB: Logs all columns except unchanged BLOB / TEXT fields.`,
      explanation:
        "binlog_row_image controls the size of logged row events. Setting it to MINIMAL on wide tables logs only modified columns and primary keys, cutting disk consumption and replication network bandwidth by over 50%.",
      keyTakeaways: [
        "binlog_row_image = 'FULL' logs all columns in before and after images.",
        "binlog_row_image = 'MINIMAL' logs only changed columns, saving 50%+ space.",
        "Optimizes high-throughput transactional databases with wide schemas."
      ]
    },
    phase3_durability_and_sync: {
      phaseNumber: "Phase 3: ACID Durability",
      title: "3. Flush Durability Tuning (sync_binlog = 1)",
      badge: "ACID Durability",
      badgeColor: "purple",
      sqlSnippet: `-- 🔒 ACID COMPLIANCE & CRASH DURABILITY (sync_binlog):

-- 1. Strict ACID Financial Durability (Zero Data Loss):
SET PERSIST sync_binlog = 1;
-- Flushes every binary log write to disk before transaction commit returns!

-- 2. Relaxed Mode for Staging / Non-Critical Seed Imports:
-- SET GLOBAL sync_binlog = 0; -- Buffers writes in OS cache (faster, but risks crash loss)

-- 3. Enable Cryptographic CRC32 Integrity Checksums:
SET PERSIST binlog_checksum = 'CRC32';`,
      explanation:
        "sync_binlog = 1 guarantees that every transaction is flushed to physical disk upon commit. Combined with CRC32 checksums, it guarantees zero transaction loss during sudden host power outages.",
      keyTakeaways: [
        "sync_binlog = 1 ensures zero data loss during sudden crashes.",
        "sync_binlog = 0 buffers in OS cache for temporary bulk staging loads.",
        "binlog_checksum = CRC32 validates event integrity against disk bit-rot."
      ]
    },
    phase4_safe_purging: {
      phaseNumber: "Phase 4: Safe Purging",
      title: "4. Automated Expiration & Safe PURGE BINARY LOGS",
      badge: "Safe Purging",
      badgeColor: "rose",
      sqlSnippet: `-- 🧹 AUTOMATED RETENTION & SAFE PURGING IN MYSQL 8.0:

-- 1. Configure automated 7-day rolling expiration window:
SET PERSIST binlog_expire_logs_seconds = 604800; -- 7 Days (604800 seconds)

-- 2. Safe Manual Purge (Preserves binlog.index integrity):
PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);
PURGE BINARY LOGS TO 'binlog.000085';

-- ⚠️ NEVER run 'rm binlog.*' in Linux shell (breaks binlog.index)! ❌`,
      explanation:
        "Automated retention is managed via binlog_expire_logs_seconds. Manual cleanup must always use PURGE BINARY LOGS to ensure MySQL's internal index file (binlog.index) remains synchronized.",
      keyTakeaways: [
        "binlog_expire_logs_seconds automates rolling expiration in MySQL 8.0.",
        "PURGE BINARY LOGS cleans files and updates binlog.index atomically.",
        "Never use OS rm command to delete binary logs directly."
      ]
    }
  };

  const currentPhase = binlogPhases[selectedBinlogPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The Binary Log (binlog): <span className="text-emerald-400">Formats</span> &amp; <span className="text-cyan-400">Purging</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the transactional heartbeat of MySQL 8.0: understanding ROW-based determinism vs STATEMENT drift, tuning <code>binlog_row_image</code>, configuring <code>sync_binlog = 1</code> durability, automating retention with <code>binlog_expire_logs_seconds</code>, and executing safe atomic purges.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Binary Log Pillars ──────────────────────────── */}
        <section id="binlog-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Binary Log Engineering
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the Binary Log guarantees zero data loss and deterministic replication across distributed topologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">ROW Format</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transmits exact before/after physical row bytes, eliminating replica divergence on non-deterministic queries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">MINIMAL Images</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>binlog_row_image = 'MINIMAL'</code> logs only changed columns, slashing disk and network bandwidth by 55%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">sync_binlog = 1</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Flushes every committed transaction directly to physical disk for 100% ACID crash recovery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">PURGE BINARY LOGS</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Safely purges expired logs while keeping MySQL&apos;s internal <code>binlog.index</code> synchronized.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Binary Log Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe ROW vs STATEMENT determinism, row image sizing, sync_binlog durability, and safe purge commands.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(binlogPhases).map((phaseKey) => {
              const phase = binlogPhases[phaseKey];
              const isSelected = selectedBinlogPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedBinlogPhase(phaseKey)}
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
                SQL Commands &amp; Replication Blueprint:
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
              Binary Log case studies in Barrackpore and Kolkata demonstrating replica drift prevention and 55% storage savings with MINIMAL row images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Preventing Replica Drift on RAND() in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Drift
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a promotional script executed <code>UPDATE products SET promo_code = UUID() LIMIT 20</code>. Because Mamata had configured <code>binlog_format = ROW</code>, the primary server transmitted the exact generated UUID values and row IDs. The store standby replica applied identical values with 100% data parity across ₹1.2 Crores in retail inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Saving 55% Storage with MINIMAL Images in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  500GB &rarr; 225GB/day
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, high transaction volume on an 85-column ledger table was producing 500GB of binary logs daily. Debangshu configured <code>binlog_row_image = 'MINIMAL'</code>. Daily binary log generation dropped from 500GB to 225GB while cross-region replication bandwidth dropped by 55%, saving significant cloud egress costs while maintaining strict 100% ACID durability.
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
              Avoid dangerous manual OS deletion and non-deterministic statement drift traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Manually Deleting Logs with OS &apos;rm&apos;
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>rm binlog.*</code> desynchronizes MySQL&apos;s internal <code>binlog.index</code> file, breaking replication streams and crashing automated backup utilities.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use PURGE BINARY LOGS BEFORE or PURGE BINARY LOGS TO.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using STATEMENT Format with UUID() or RAND()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                STATEMENT format re-evaluates non-deterministic functions on replicas, resulting in silent data drift between primary and read replicas.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce binlog_format = 'ROW' globally across all database clusters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Mandate sync_binlog = 1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enforce <code>sync_binlog = 1</code> on primary masters to guarantee that all committed transactions are flushed to disk for zero-data-loss crash recovery.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees complete Point-in-Time Recovery capability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Configure 7-14 Day Expiration
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>binlog_expire_logs_seconds = 604800</code> (7 days) to maintain a rolling safety buffer for Point-in-Time Recovery while preventing disk overflow.
              </p>
              <div className="text-xs text-slate-400">
                Automates disk space reclamation upon log rotation.
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
            title="Topic 3: The Binary Log (binlog): Formats (STATEMENT, ROW, MIXED), Purpose for Replication & Recovery, Purging Expired Binlogs"
            content={noteText}
          />

          <Teacher
            note="The Binary Log is the lifeline of MySQL replication and disaster recovery! Always enforce binlog_format = ROW in production: it transmits exact before/after row byte deltas, eliminating dangerous data drift caused by non-deterministic functions like UUID() or RAND(). Mandate sync_binlog = 1 for 100% ACID durability, configure binlog_expire_logs_seconds for automated 7-day retention, and NEVER delete binary logs with OS rm commands!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL Binary Log formats, row image optimization, durability tuning, and atomic purge commands.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Binary Log &amp; Formats FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
