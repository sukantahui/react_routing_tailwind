import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Why and When to Partition Tables in Large-Scale Databases (VLDB)
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive VLDB table partitioning workbench: evaluating monolithic B-Tree scaling bottlenecks, testing partition pruning mechanics, executing instant sub-5ms partition drops, and analyzing the scatter-gather query penalty in MySQL 8.0.
 */
const Topic0 = () => {
  // Interactive Partitioning Concept State
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1_vldb_dilemma");

  const vldbConcepts = {
    concept1_vldb_dilemma: {
      conceptName: "1. The VLDB Dilemma",
      title: "1. Monolithic B-Tree Bottlenecks in 100M+ Row Tables",
      badge: "Scaling Crisis",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 THE MONOLITHIC 100M-ROW TABLE PROBLEM:
-- 1. B-Tree index height grows from 3 to 5 levels (multiplying disk seeks).
-- 2. Buffer pool thrashing: 100GB table cannot fit inside 32GB RAM!
-- 3. Deleting 10M old records via DELETE locks rows and takes 45 minutes!

-- ⚙️ TABLE DEFINITION BEFORE PARTITIONING:
CREATE TABLE monolithic_orders (
  order_id BIGINT NOT NULL AUTO_INCREMENT,
  order_date DATE NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id)
) ENGINE = InnoDB; -- 100M Rows / 85GB single .ibd file!`,
      explanation:
        "As tables expand beyond 50 million rows, monolithic B-Trees overflow the InnoDB buffer pool RAM, triggering random NVMe disk page reads and turning routine archival deletes into catastrophic blocking operations.",
      keyTakeaways: [
        "Monolithic B-Trees exceed buffer pool RAM, causing severe disk thrashing.",
        "Deep index trees increase memory lookup latency for every query.",
        "Bulk DELETE statements generate massive undo/redo log pressure and lock contention."
      ]
    },
    concept2_partition_pruning: {
      conceptName: "2. Partition Pruning",
      title: "2. Partition Pruning: Reading Only Relevant Physical Files",
      badge: "Optimizer Superpower",
      badgeColor: "emerald",
      sqlSnippet: `-- 🚀 CREATING A PARTITIONED TABLE:
CREATE TABLE partitioned_orders (
  order_id BIGINT NOT NULL,
  order_date DATE NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, order_date) -- Mandatory: PK includes partition column!
) ENGINE = InnoDB
PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- 🔍 VERIFYING PARTITION PRUNING VIA EXPLAIN:
EXPLAIN SELECT * FROM partitioned_orders WHERE order_date = '2025-06-15';
-- Result: partitions = p2025 (MySQL reads ONLY the 2025 file, skipping 75M rows!)`,
      explanation:
        "Partition Pruning allows the MySQL query optimizer to inspect WHERE predicates and completely skip irrelevant physical partition files, eliminating 90%+ of disk I/O and accelerating query execution.",
      keyTakeaways: [
        "Optimizer skips physical partitions that cannot contain matching records.",
        "Primary Key must include the partitioning column (order_date).",
        "Converts full table scans into lightning-fast localized partition scans."
      ]
    },
    concept3_instant_purging: {
      conceptName: "3. Instant Archival",
      title: "3. Sub-5ms Lifecycle Purging via ALTER TABLE DROP PARTITION",
      badge: "Zero-Lock Purge",
      badgeColor: "cyan",
      sqlSnippet: `-- 💥 TRADITIONAL SLOW DELETE (45 Minutes, Heavy Locks & Undo Logs):
-- DELETE FROM partitioned_orders WHERE order_date < '2025-01-01';

-- ⚡ INSTANT PARTITION DROP (4 Milliseconds, Zero Undo Logging, Zero Locks!):
ALTER TABLE partitioned_orders DROP PARTITION p2024;

-- 💡 How it works:
-- MySQL unlinks partitioned_orders#p#p2024.ibd directly at the OS filesystem level!
-- 25,000,000 historical records purged in 4ms with ZERO lock contention on POS cashiers!`,
      explanation:
        "Dropping a partition unlinks the physical .ibd file directly from the filesystem in under 5 milliseconds with zero undo logs and zero row lock contention, making it the premier tool for high-volume time-series archival.",
      keyTakeaways: [
        "DROP PARTITION completes in under 5ms regardless of row count.",
        "Generates zero undo logs, zero redo log stalls, and zero table fragmentation.",
        "Eliminates midnight maintenance lag on production database clusters."
      ]
    },
    concept4_scatter_gather: {
      conceptName: "4. Scatter-Gather Penalty",
      title: "4. The Scatter-Gather Penalty: Missing Partition Keys",
      badge: "Anti-Pattern Warning",
      badgeColor: "purple",
      sqlSnippet: `-- ⚠️ THE SCATTER-GATHER PITFALL (Omission of Partition Key):
SELECT * FROM partitioned_orders WHERE amount > 50000.00;

-- 🔍 EXPLAIN PLAN ANALYSIS:
-- partitions = p2024, p2025, p2026, p_future (ALL Partitions Evaluated!)
-- MySQL must open file handles and scan index trees across EVERY partition!
-- Query performs SLOWER than a single indexed monolithic table!

-- ✅ REMEDY: Always include partition column in query predicates:
SELECT * FROM partitioned_orders WHERE order_date >= '2025-01-01' AND amount > 50000.00;`,
      explanation:
        "If a query omits the partitioning key, MySQL must execute a Scatter-Gather scan across all partitions, incurring multi-file handle overhead that can perform slower than an unpartitioned table.",
      keyTakeaways: [
        "Omitting partition key forces MySQL to search every partition.",
        "Scatter-gather queries cause CPU overhead and multi-file lock overhead.",
        "Always structure high-frequency application queries around the partition key."
      ]
    }
  };

  const currentConcept = vldbConcepts[selectedConceptKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Why &amp; When to <span className="text-emerald-400">Partition Tables</span> in Large Databases (<span className="text-cyan-400">VLDB</span>)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering table partitioning fundamentals in MySQL 8.0: understanding Very Large Database (VLDB) scaling bottlenecks, leveraging Partition Pruning to eliminate 90%+ disk I/O, executing instant sub-5ms data lifecycle drops, and avoiding the Scatter-Gather query penalty.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: VLDB Pillars ────────────────────────────────── */}
        <section id="vldb-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Table Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Architectural mechanisms enabling multi-million row table scaling, localized caching, and instant data purging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Partition Pruning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Query optimizer skips 90%+ of table data, reading only physical files matching query filters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Instant Drop (5ms)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>DROP PARTITION</code> deletes millions of rows instantly by unlinking files with zero undo logs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Buffer Pool Fit</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Hot active partition B-Trees fit inside RAM, preventing memory thrashing on multi-terabyte tables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Storage Tiering</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Hot partitions reside on fast NVMe drives; cold historical archives reside on economical storage.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive VLDB Partitioning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe monolithic B-Tree dilemmas, partition pruning EXPLAIN plans, instant DROP PARTITION commands, and scatter-gather penalties.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(vldbConcepts).map((conceptKey) => {
              const concept = vldbConcepts[conceptKey];
              const isSelected = selectedConceptKey === conceptKey;
              return (
                <button
                  key={conceptKey}
                  onClick={() => setSelectedConceptKey(conceptKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Partitioning Mechanism
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Runbook &amp; Partitioning DDL:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
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
              Table partitioning case studies in Barrackpore and Kolkata demonstrating 4ms archival purging and memory-cached branch ledger pruning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 4ms Log Purging in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Instant Drop
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS audit logs accumulated 80,000,000 records across ₹1.2 Crores in retail sales. When purging 3-year-old audit records, traditional <code>DELETE</code> queries locked cashier billing for 45 minutes. Susmita partitioned the table by <code>YEAR(log_date)</code> and purged historical records using <code>ALTER TABLE audit_logs DROP PARTITION p2022;</code>, unlinking 25M rows in 4 milliseconds with zero lock contention on active POS billing.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 12x Statement Speedup in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  12x Faster
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, core banking ledgers scaled to 250,000,000 rows across ₹500 Crores in volume. Generating branch statements previously triggered massive disk I/O thrashing across an 80GB B-Tree. Debangshu partitioned the ledger table by <code>account_branch_id</code>; the query optimizer pruned searches to the single 15M-row branch partition, allowing the entire active working set to stay cached in RAM and cutting statement latency by 12x.
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
              Avoid partitioning small tables and omitting the partition column from unique keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Partitioning Small Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Partitioning small tables (&lt; 5M rows) introduces query planning overhead and file descriptor clutter without performance benefits.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Only partition tables exceeding 10GB or 20M rows with clear filtering keys.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unique Keys Without Partition Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining a Primary Key or Unique Key that excludes the partition column causes MySQL to reject table creation with Error 1503.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Include the partition column in all Primary Keys and Unique Keys.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Structure Queries with Partition Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always include the partitioning column in query <code>WHERE</code> clauses to guarantee that the optimizer performs Partition Pruning.
              </p>
              <div className="text-xs text-slate-400">
                Prevents catastrophic cross-partition Scatter-Gather table scans.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use DROP PARTITION for Archival
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Replace slow bulk <code>DELETE</code> scripts with <code>ALTER TABLE ... DROP PARTITION</code> to delete historical data in milliseconds without locks.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates undo log bloat, redo log saturation, and table fragmentation.
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
            title="Topic 0: Why and When to Partition Tables in Large-Scale Databases (VLDB)"
            content={noteText}
          />

          <Teacher
            note="Table Partitioning is your most potent tool for managing Very Large Databases (VLDB) in MySQL! When tables scale beyond 50 million rows, monolithic B-Trees cause buffer pool thrashing and slow query times. Partitioning gives you two incredible superpowers: Partition Pruning (where MySQL reads only the physical files matching your query) and instant sub-5ms data purging via DROP PARTITION. Remember the golden rules: always include the partition column in your primary key, always filter on the partition key to avoid scatter-gather penalties, and only partition tables that are genuinely large (>10GB/20M+ rows)!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of VLDB scaling, partition pruning, instant DROP PARTITION archival, primary key requirements, and scatter-gather avoidance.
            </p>
          </div>

          <FAQTemplate
            title="VLDB Table Partitioning Fundamentals FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
