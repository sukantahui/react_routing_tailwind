import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Partitioning Mechanics: How the Storage Engine Handles Partitioned Tables
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive storage engine partitioning mechanics workbench: exploring the ha_partition proxy handler, simulating cross-partition atomic row transfers, inspecting localized secondary indexes, and executing sub-10ms EXCHANGE PARTITION tablespace swaps in MySQL 8.0.
 */
const Topic1 = () => {
  // Interactive Mechanics State
  const [selectedMechanicKey, setSelectedMechanicKey] = useState("mechanic1_handler_proxy");

  const engineMechanics = {
    mechanic1_handler_proxy: {
      mechanicName: "1. ha_partition Proxy",
      title: "1. Storage Engine Architecture & ha_partition Proxy Handler",
      badge: "Handler Pipeline",
      badgeColor: "emerald",
      sqlSnippet: `// ⚙️ HOW SQL QUERIES FLOW THROUGH THE ENGINE:
// [Client Query: INSERT INTO sales_records VALUES (101, '2025-04-12', 4500)]
//       │
//       ▼
// [MySQL Server SQL Parser / Optimizer]
//       │
//       ▼
// [ha_partition (Partition Handler Proxy)]
//       │ (Evaluates YEAR('2025-04-12') = 2025 -> Target: Partition 1)
//       ▼
// [ha_innobase Instance for Partition 1]
//       │
//       ▼
// [Physical Filesystem: /var/lib/mysql/sales_records#p#p2025.ibd]`,
      explanation:
        "The ha_partition proxy handler sits between the SQL parser and individual InnoDB engine instances. It evaluates the partitioning expression to route reads, writes, and row-level locks directly to the target partition tablespace.",
      keyTakeaways: [
        "ha_partition acts as a smart router above underlying ha_innobase handlers.",
        "Evaluates partitioning expressions to identify the target partition ID.",
        "Delegates write_row and index_read_map to specific partition tablespaces."
      ]
    },
    mechanic2_cross_partition_update: {
      mechanicName: "2. Cross-Partition Updates",
      title: "2. Cross-Partition Atomic Row Movement Mechanics",
      badge: "Atomic 2PC",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ UPDATING PARTITION KEY TO MOVE ROW BETWEEN PARTITIONS:
UPDATE sales_records SET order_date = '2025-01-10' WHERE order_id = 101;

-- 🔍 INTERNAL 4-STEP STORAGE ENGINE EXECUTION:
-- 1. InnoDB locks row in p2024 (sales_records#p#p2024.ibd).
-- 2. ha_innobase calls delete_row() on partition p2024.
-- 3. ha_innobase calls write_row() with new date on partition p2025.
-- 4. Commits both operations atomically within the same transaction!`,
      explanation:
        "When an UPDATE changes the partition key, InnoDB executes an atomic delete from the old partition followed by an insert into the new partition within a single transaction, guaranteeing data integrity across files.",
      keyTakeaways: [
        "Executes an atomic delete from old partition and insert into new partition.",
        "Row movement occurs within the same InnoDB ACID transaction boundary.",
        "Partition keys should be stable to minimize cross-partition movement overhead."
      ]
    },
    mechanic3_local_indexes: {
      mechanicName: "3. Local Secondary Indexes",
      title: "3. Local Partitioned Indexes vs Global Index Absences",
      badge: "Local B-Trees",
      badgeColor: "purple",
      sqlSnippet: `-- 📑 SECONDARY INDEX CREATION ON PARTITIONED TABLE:
CREATE INDEX idx_customer ON sales_records (customer_id);

-- 💡 HOW MYSQL HANDLES SECONDARY INDEXES:
-- Every partition (.ibd file) maintains its OWN LOCAL B-TREE INDEX!
-- p2024.ibd -> Contains idx_customer for 2024 rows only.
-- p2025.ibd -> Contains idx_customer for 2025 rows only.
-- MySQL does NOT have Global Indexes; all indexes are strictly LOCAL!`,
      explanation:
        "All secondary indexes in MySQL are Local Partitioned Indexes confined to each individual partition's .ibd file. This is why unique constraints must include the partition key to enable local uniqueness verification.",
      keyTakeaways: [
        "All secondary indexes are strictly Local Partitioned Indexes.",
        "Each partition maintains an independent secondary B-Tree on disk.",
        "Enables local index updates without locking unrelated historical partitions."
      ]
    },
    mechanic4_exchange_partition: {
      mechanicName: "4. EXCHANGE PARTITION",
      title: "4. Sub-10ms Data Swaps via EXCHANGE PARTITION",
      badge: "Zero-Copy Swap",
      badgeColor: "rose",
      sqlSnippet: `-- 🚀 SWAPPING A PARTITION WITH A STANDALONE TABLE IN UNDER 10ms:
-- Step 1: Create identical standalone staging table:
CREATE TABLE orders_2024_staging LIKE sales_records;
ALTER TABLE orders_2024_staging REMOVE PARTITIONING;

-- Step 2: Swap physical tablespace pointers instantly:
ALTER TABLE sales_records EXCHANGE PARTITION p2024 WITH TABLE orders_2024_staging;

-- 💡 Result: Physical .ibd file pointers swapped in metadata with ZERO row copying!`,
      explanation:
        "EXCHANGE PARTITION swaps tablespace file pointers between a partition and a standalone table in under 10 milliseconds, enabling instant ETL ingestion, table re-indexing, and rapid historical data archiving.",
      keyTakeaways: [
        "Swaps tablespace metadata pointers at line speed (<10ms).",
        "Eliminates slow row-by-row data copying during ETL operations.",
        "Requires identical schemas, indexes, and column types on both tables."
      ]
    }
  };

  const currentMechanic = engineMechanics[selectedMechanicKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 1 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Partitioning Mechanics</span>: Storage Engine Internals &amp; <span className="text-cyan-400">ha_partition</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering low-level storage engine partitioning mechanics in MySQL 8.0: understanding the <code>ha_partition</code> proxy handler pipeline, atomic cross-partition row transfers, local partitioned B-Trees, and sub-10ms <code>EXCHANGE PARTITION</code> tablespace swaps.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Mechanics Pillars ───────────────────────────── */}
        <section id="mechanics-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Storage Engine Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Low-level storage architecture enabling transparent routing, file isolation, and instant data interchange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">ha_partition Proxy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Routes SQL operations to specific underlying <code>ha_innobase</code> partition engine instances.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Atomic Transfers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cross-partition updates execute an atomic delete + insert sequence within a single transaction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Local B-Trees</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Secondary indexes are strictly localized to each partition&apos;s physical <code>.ibd</code> file.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Exchange Swap</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Swaps tablespace pointers with standalone tables in &lt;10ms for instant ETL ingestion.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Storage Engine Mechanics Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe ha_partition proxy routing, atomic cross-partition updates, local secondary index structures, and EXCHANGE PARTITION commands.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(engineMechanics).map((mechanicKey) => {
              const mechanic = engineMechanics[mechanicKey];
              const isSelected = selectedMechanicKey === mechanicKey;
              return (
                <button
                  key={mechanicKey}
                  onClick={() => setSelectedMechanicKey(mechanicKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {mechanic.mechanicName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Engine Mechanics Feature
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentMechanic.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentMechanic.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentMechanic.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentMechanic.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentMechanic.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentMechanic.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentMechanic.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Engine Pipeline &amp; SQL Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentMechanic.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentMechanic.keyTakeaways.map((item, i) => (
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
              Partition mechanics case studies in Barrackpore and Kolkata demonstrating partition lock isolation and file descriptor tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Zero Lock Contention in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Lock Isolation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashiers billed ₹1.2 Crores in sales while accountants ran heavy quarterly reporting queries. Because InnoDB stores record locks inside specific page headers within <code>pos_sales#p#p2025.ibd</code>, cashiers wrote transactions with zero lock wait time while the accounting report scanned historical pages inside <code>pos_sales#p#p2024.ibd</code>.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – File Descriptor Tuning in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Descriptor Sizing
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume, partitioning 50 tables into 100 monthly partitions created 5,000 physical <code>.ibd</code> files. Debangshu increased <code>open_files_limit = 65536</code> and <code>table_open_cache = 10000</code>, ensuring the operating system could maintain open file handles across all active partition tablespaces without thread bottlenecks.
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
              Avoid frequent cross-partition updates and running out of open file descriptors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Highly Volatile Partition Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Partitioning on a column that is frequently updated (e.g. status) triggers constant cross-partition row moves, multiplying row locks and undo logging.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Choose immutable or rarely updated columns (like created_at or tenant_id).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting open_files_limit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating hundreds of partitions without increasing <code>open_files_limit</code> causes &apos;Too many open files&apos; OS errors under peak query concurrency.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Set open_files_limit = 65536 in my.cnf for partitioned database servers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Leverage EXCHANGE PARTITION for ETL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>ALTER TABLE ... EXCHANGE PARTITION</code> to load massive bulk data or re-index historical tables with sub-10ms metadata swaps.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates row-by-row batch insertion overhead entirely.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Regular information_schema Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Query <code>information_schema.PARTITIONS</code> periodically to detect row count skew and reclaim fragmented free disk space via <code>OPTIMIZE PARTITION</code>.
              </p>
              <div className="text-xs text-slate-400">
                Maintains optimal storage efficiency and even data distribution.
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
            title="Topic 1: Partitioning Mechanics: How the Storage Engine Handles Partitioned Tables"
            content={noteText}
          />

          <Teacher
            note="Understanding how the storage engine handles partitioned tables under the hood gives you total mastery over VLDB systems! Remember the hierarchy: the SQL parser delegates to ha_partition, which evaluates your expression and routes writes directly to the specific ha_innobase instance and its dedicated .ibd file on disk. Secondary indexes are strictly local to each partition, cross-partition updates perform an atomic delete + insert sequence, and EXCHANGE PARTITION allows you to swap entire tablespaces in under 10ms!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of the ha_partition handler proxy, atomic cross-partition row moves, local secondary indexes, and EXCHANGE PARTITION swaps.
            </p>
          </div>

          <FAQTemplate
            title="Partitioning Storage Engine Mechanics FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
