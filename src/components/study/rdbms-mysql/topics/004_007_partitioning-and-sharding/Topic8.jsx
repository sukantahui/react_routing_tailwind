import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Managing Partitions: ALTER TABLE ... ADD, DROP, TRUNCATE, REORGANIZE & Maintenance
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive partition management workbench: executing sub-5ms DROP PARTITION purges, comparing TRUNCATE vs DROP mechanics, running online REORGANIZE PARTITION splits, and configuring Metadata Lock (MDL) safety timeouts in MySQL 8.0.
 */
const Topic8 = () => {
  // Interactive Command State
  const [selectedCommandKey, setSelectedCommandKey] = useState("cmd1_drop_vs_truncate");

  const partitionCommands = {
    cmd1_drop_vs_truncate: {
      cmdName: "1. DROP vs TRUNCATE",
      title: "1. DROP PARTITION vs TRUNCATE PARTITION vs Bulk DELETE",
      badge: "Lifecycle Purge",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ 1. INSTANT 5ms DROP (Deletes Physical File & Schema Definition):
ALTER TABLE financial_ledger DROP PARTITION p2022_01;
-- -> Unlinks financial_ledger#p#p2022_01.ibd at the OS filesystem level!
-- -> Zero undo logs, zero redo log saturation, zero row-lock waits!

-- 📦 2. TRUNCATE PARTITION (Deletes Rows, Preserves Schema Boundaries):
ALTER TABLE financial_ledger TRUNCATE PARTITION p2025_08;
-- -> Empties all records inside p2025_08 instantly for clean reuse!

-- 💥 3. SLOW TRADITIONAL DELETE (Avoid in Production!):
-- DELETE FROM financial_ledger WHERE order_date < '2022-02-01'; (Takes 45 mins!)`,
      explanation:
        "DROP PARTITION permanently unlinks the physical .ibd file in under 5ms without undo logging. TRUNCATE PARTITION empties the partition data while preserving the partition boundary in metadata for reuse.",
      keyTakeaways: [
        "DROP PARTITION unlinks disk files in <5ms without undo logging.",
        "TRUNCATE PARTITION empties rows while keeping schema boundaries intact.",
        "Both methods eliminate the massive table lock and undo log overhead of DELETE."
      ]
    },
    cmd2_reorganize_partition: {
      cmdName: "2. REORGANIZE PARTITION",
      title: "2. Online Partition Splitting & Merging via REORGANIZE PARTITION",
      badge: "Online DDL",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 1. SPLITTING p_future INTO NEW MONTHLY PARTITIONS ONLINE:
ALTER TABLE financial_ledger REORGANIZE PARTITION p_future INTO (
  PARTITION p2026_09 VALUES LESS THAN ('2026-10-01'),
  PARTITION p2026_10 VALUES LESS THAN ('2026-11-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);

-- 🔄 2. MERGING HISTORICAL PARTITIONS INTO A SINGLE ARCHIVE:
ALTER TABLE financial_ledger REORGANIZE PARTITION p2022_01, p2022_02, p2022_03 INTO (
  PARTITION p2022_q1 VALUES LESS THAN ('2022-04-01')
);`,
      explanation:
        "REORGANIZE PARTITION allows splitting the MAXVALUE partition into new forward months or merging multiple small historical partitions into larger quarters without locking active operations or losing data.",
      keyTakeaways: [
        "Splits MAXVALUE into upcoming monthly partitions online.",
        "Merges historical monthly partitions into consolidated quarterly archives.",
        "Executes without data loss or downtime for concurrent transactions."
      ]
    },
    cmd3_exchange_partition: {
      cmdName: "3. EXCHANGE PARTITION",
      title: "3. Sub-10ms Zero-Copy ETL Swaps via EXCHANGE PARTITION",
      badge: "Zero-Copy Swap",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ SWAPPING STAGING TABLE WITH PARTITION IN UNDER 10ms:
-- Step 1: Create matching standalone staging table:
CREATE TABLE ledger_staging LIKE financial_ledger;
ALTER TABLE ledger_staging REMOVE PARTITIONING;

-- Step 2: Swap physical tablespace pointers instantly:
ALTER TABLE financial_ledger EXCHANGE PARTITION p2026_09 
WITH TABLE ledger_staging WITHOUT VALIDATION;

-- 💡 Result: 20 Million rows attached to the live partitioned table in metadata!`,
      explanation:
        "EXCHANGE PARTITION swaps tablespace pointers between a partition and a standalone table in under 10 milliseconds, enabling instant bulk data loading and high-speed historical data offloading.",
      keyTakeaways: [
        "Swaps tablespace file pointers in metadata at line speed (<10ms).",
        "WITHOUT VALIDATION skips row-by-row boundary scans for instant swaps.",
        "Requires identical schemas, indexes, and column types on both tables."
      ]
    },
    cmd4_mdl_protection: {
      cmdName: "4. Metadata Lock (MDL)",
      title: "4. Metadata Lock (MDL) Safety & lock_wait_timeout Tuning",
      badge: "Safety Tuning",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ PREVENTING METADATA LOCK CASCADES DURING PARTITION DDL:
-- If an analytical query runs, ALTER TABLE waits for MDL and blocks all queries!

-- ✅ SOLUTION: Set a short session lock wait timeout:
SET SESSION lock_wait_timeout = 5;

-- Execute partition drop safely:
ALTER TABLE financial_ledger DROP PARTITION p2022_01;
-- -> If lock cannot be acquired within 5s, DDL aborts safely without stalling billing!`,
      explanation:
        "Partition DDL requires an exclusive Metadata Lock (MDL). Setting a short lock_wait_timeout prevents long-running analytical queries from causing a lock queue cascade that stalls production transactions.",
      keyTakeaways: [
        "Partition DDL requires an exclusive Metadata Lock (MDL).",
        "Setting lock_wait_timeout = 5 prevents blocking high-volume OLTP cashiers.",
        "Always execute partition maintenance during scheduled low-traffic windows."
      ]
    }
  };

  const currentCommand = partitionCommands[selectedCommandKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Managing Partitions</span>: ADD, DROP, <span className="text-cyan-400">TRUNCATE</span> &amp; REORGANIZE
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering partition lifecycle administration in MySQL 8.0: executing sub-5ms <code>DROP PARTITION</code> purges, configuring sliding-window <code>REORGANIZE PARTITION</code> forward expansions, running zero-copy <code>EXCHANGE PARTITION</code> ETL swaps, and managing Metadata Locks (<code>MDL</code>).
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Management Pillars ──────────────────────────── */}
        <section id="management-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Partition Management
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core DDL operations enabling automated data lifecycle maintenance, storage defragmentation, and zero-downtime scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">DROP PARTITION</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlinks physical <code>.ibd</code> files in &lt;5ms with zero undo logging, row locks, or fragmentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">REORGANIZE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Splits <code>p_future</code> for upcoming months or merges older partitions without data loss.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">EXCHANGE Swap</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Swaps tablespaces with standalone tables in &lt;10ms for instant ETL ingestion and archival.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">MDL Safety</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Setting <code>lock_wait_timeout = 5</code> prevents partition DDL from stalling high-throughput OLTP billing.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Partition Management Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe DROP vs TRUNCATE mechanics, online REORGANIZE PARTITION splits, EXCHANGE PARTITION data swaps, and Metadata Lock protection.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(partitionCommands).map((cmdKey) => {
              const cmd = partitionCommands[cmdKey];
              const isSelected = selectedCommandKey === cmdKey;
              return (
                <button
                  key={cmdKey}
                  onClick={() => setSelectedCommandKey(cmdKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {cmd.cmdName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Partition Lifecycle Command
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentCommand.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentCommand.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentCommand.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentCommand.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentCommand.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentCommand.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCommand.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                DDL Syntax &amp; Execution Snippets:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentCommand.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentCommand.keyTakeaways.map((item, i) => (
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
              Partition management case studies in Barrackpore and Kolkata demonstrating automated sliding-window retention and MDL lock cascade protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Automated Sliding Window in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Sliding Window
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS retail logs tracked ₹1.2 Crores in sales transactions across 12 monthly partitions. Susmita scheduled an automated monthly MySQL Event: 1. <code>ALTER TABLE pos_logs DROP PARTITION p_oldest;</code> (purging records older than 12 months in 4ms); 2. <code>ALTER TABLE pos_logs REORGANIZE PARTITION p_future INTO (PARTITION p_next VALUES LESS THAN (...), PARTITION p_future VALUES LESS THAN MAXVALUE);</code>, maintaining a hands-off rolling retention window with zero DBA intervention.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – MDL Lock Safety in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  MDL Protection
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking ledgers across ₹500 Crores in volume, dropping historical quarterly partitions previously queued behind long-running analytical queries, stalling cashier billing. Debangshu added <code>SET SESSION lock_wait_timeout = 5;</code> before the DDL. If the exclusive Metadata Lock could not be acquired in 5s, the DDL aborted safely, preventing transaction lockup on active banking operations.
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
              Avoid using bulk DELETE for partition archival and running ADD PARTITION when MAXVALUE exists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using DELETE Instead of DROP
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>DELETE FROM table WHERE date &lt; ...</code> generates millions of undo log rows, creates heavy lock contention, and takes hours.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use ALTER TABLE ... DROP PARTITION to purge historical data in 5ms.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: ADD PARTITION with MAXVALUE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting <code>ADD PARTITION</code> on a table with a <code>MAXVALUE</code> partition fails with Error 1481 because MAXVALUE covers all upper bounds.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use REORGANIZE PARTITION p_future to split MAXVALUE online.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Set lock_wait_timeout = 5
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set a short session <code>lock_wait_timeout</code> before executing partition DDL to prevent Metadata Lock cascades from stalling active client queries.
              </p>
              <div className="text-xs text-slate-400">
                Protects high-throughput production transactions from DDL lock queues.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Regular OPTIMIZE &amp; ANALYZE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Run <code>OPTIMIZE PARTITION</code> to reclaim free space after heavy churn, and <code>ANALYZE PARTITION</code> to refresh optimizer cardinality statistics.
              </p>
              <div className="text-xs text-slate-400">
                Keeps individual partition storage compact and query execution plans accurate.
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
            title="Topic 8: Managing Partitions: ALTER TABLE ... ADD, DROP, TRUNCATE, REORGANIZE & Maintenance"
            content={noteText}
          />

          <Teacher
            note="Mastering the partition management toolkit makes you an invincible database administrator! Always use DROP PARTITION to delete millions of historical rows in under 5ms with zero undo log overhead. When adding upcoming months, use REORGANIZE PARTITION to split your MAXVALUE catch-all partition online. Use EXCHANGE PARTITION for instant sub-10ms bulk ETL loading, and always set lock_wait_timeout = 5 to prevent metadata lock queues from blocking your live production users!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of DROP, TRUNCATE, REORGANIZE, EXCHANGE, OPTIMIZE, and Metadata Lock (MDL) safety in MySQL 8.0.
            </p>
          </div>

          <FAQTemplate
            title="Partition Lifecycle Management FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
