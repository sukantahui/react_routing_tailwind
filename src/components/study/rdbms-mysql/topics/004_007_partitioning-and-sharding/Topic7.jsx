import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Composite Partitioning (Subpartitioning): RANGE-HASH and LIST-KEY Subpartitions
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Composite Subpartitioning workbench: evaluating two-tier physical data division, testing Full Two-Dimensional (2D) partition pruning, exploring RANGE-HASH time-series write spreading, and configuring LIST-KEY regional multi-tenant schemas in MySQL 8.0.
 */
const Topic7 = () => {
  // Interactive Composite State
  const [selectedCompositeKey, setSelectedCompositeKey] = useState("composite1_two_tier_division");

  const compositeConfigurations = {
    composite1_two_tier_division: {
      configName: "1. Two-Tier Division",
      title: "1. Two-Tier Physical Data Division Architecture",
      badge: "Architecture Hierarchy",
      badgeColor: "emerald",
      sqlSnippet: `// ⚙️ HOW TWO-TIER COMPOSITE STORAGE IS STRUCTURED:
// [Primary Partition: RANGE by Year or LIST by Region]
//       ├── Logical Boundary 1 (e.g. Year 2025 or Region Bengal)
//       │     ├── Subpartition 0 (billing#p#p2025#sp#sp0.ibd)
//       │     ├── Subpartition 1 (billing#p#p2025#sp#sp1.ibd)
//       │     ├── Subpartition 2 (billing#p#p2025#sp#sp2.ibd)
//       │     └── Subpartition 3 (billing#p#p2025#sp#sp3.ibd)
//       └── Logical Boundary 2 (e.g. Year 2026 or Region Delhi)
//             ├── Subpartition 0 (billing#p#p2026#sp#sp0.ibd)
//             └── ...
// Total Physical Files = Primary Partitions × Subpartitions (e.g. 5 × 4 = 20 files!)`,
      explanation:
        "Composite partitioning pairs high-level logical partitioning (RANGE/LIST) for business lifecycle management with low-level physical subpartitioning (HASH/KEY) to distribute write I/O across storage files.",
      keyTakeaways: [
        "Primary partition provides high-level business dimension (Date/Region).",
        "Secondary subpartition provides low-level hash load balancing across disks.",
        "Total physical files on disk equals Primary Count multiplied by Subpartition Count."
      ]
    },
    composite2_2d_pruning: {
      configName: "2. 2D Partition Pruning",
      title: "2. Full Two-Dimensional (2D) Partition Pruning Mechanics",
      badge: "2D Optimizer Pruning",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 FULL 2-DIMENSIONAL PRUNING (Filtering Both Primary & Subpartition Keys):
EXPLAIN SELECT * FROM billing_ledger 
WHERE bill_date = '2025-06-15' AND user_id = 105;

-- 🎯 EXPLAIN OUTPUT:
-- partitions = p2025_p2025sp1 (Reads ONLY 1 single subpartition file!)
-- Skips 19 out of 20 physical files on disk! (95% I/O reduction!)

-- 🔄 1D PRIMARY PRUNING (Filtering Primary Key Only):
EXPLAIN SELECT * FROM billing_ledger WHERE bill_date = '2025-06-15';
-- partitions = p2025_p2025sp0, p2025_p2025sp1, p2025_p2025sp2, p2025_p2025sp3 (Reads 4 files)`,
      explanation:
        "Filtering on both the primary partition key and subpartition key achieves Full 2D Pruning, allowing MySQL to pinpoint and scan exactly one physical .ibd subpartition file on disk.",
      keyTakeaways: [
        "Filtering both keys pinpoints a single physical subpartition file.",
        "Filtering primary key only prunes to the 4 subpartitions of that year.",
        "Filtering subpartition key only prunes that bucket index across all years."
      ]
    },
    composite3_range_hash_pattern: {
      configName: "3. RANGE-HASH Pattern",
      title: "3. RANGE-HASH Pattern: Time-Series Archival + Parallel Write I/O",
      badge: "Time-Series + HASH",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ RANGE-HASH COMPOSITE DDL FOR HIGH-VOLUME TRANSACTION LOGS:
CREATE TABLE enterprise_ledger (
  txn_id BIGINT NOT NULL,
  txn_date DATE NOT NULL,
  cashier_id INT NOT NULL,
  amount DECIMAL(12,2),
  PRIMARY KEY (txn_id, txn_date, cashier_id) -- Mandatory: PK includes both keys!
) ENGINE = InnoDB
PARTITION BY RANGE (YEAR(txn_date))
SUBPARTITION BY HASH (cashier_id)
SUBPARTITIONS 4 (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- ⚡ Instant 5ms Archival: Drops all 4 subpartitions of p2024 instantly!
ALTER TABLE enterprise_ledger DROP PARTITION p2024;`,
      explanation:
        "The RANGE-HASH pattern combines instant sub-5ms lifecycle data archival via DROP PARTITION with parallel write throughput across multiple hash subpartitions, eliminating cashier lock contention.",
      keyTakeaways: [
        "RANGE primary enables instant sub-5ms historical data drops.",
        "HASH subpartitions distribute concurrent writes across 4 storage files.",
        "Primary Key must include both txn_date and cashier_id."
      ]
    },
    composite4_list_key_pattern: {
      configName: "4. LIST-KEY Pattern",
      title: "4. LIST-KEY Pattern: Regional Multi-Tenant Vaults + UUID Hash",
      badge: "Regional + UUID",
      badgeColor: "rose",
      sqlSnippet: `-- 🏢 LIST-KEY COMPOSITE DDL FOR MULTI-TENANT REGIONAL VAULTS:
CREATE TABLE regional_user_vault (
  user_uuid VARCHAR(36) NOT NULL,
  region_name VARCHAR(30) NOT NULL,
  vault_data JSON,
  PRIMARY KEY (user_uuid, region_name)
) ENGINE = InnoDB
PARTITION BY LIST COLUMNS (region_name)
SUBPARTITION BY KEY (user_uuid)
SUBPARTITIONS 4 (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore'),
  PARTITION p_delhi  VALUES IN ('New Delhi', 'Noida'),
  PARTITION p_mumbai VALUES IN ('Mumbai', 'Pune')
);

-- 🔍 2D PRUNED TENANT QUERY:
EXPLAIN SELECT * FROM regional_user_vault 
WHERE region_name = 'Kolkata' AND user_uuid = '3e11fa47-0b1a-4f5e-8b9a-123456789abc';`,
      explanation:
        "The LIST-KEY pattern isolates data into regional compliance partitions via LIST COLUMNS, while subpartitioning by KEY evenly distributes random UUID records across multiple NVMe storage threads.",
      keyTakeaways: [
        "LIST COLUMNS enforces regional data residency and compliance.",
        "KEY subpartitions evenly balance UUID primary keys within each region.",
        "Enables sub-10ms EXCHANGE SUBPARTITION tablespace staging swaps."
      ]
    }
  };

  const currentComposite = compositeConfigurations[selectedCompositeKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 7 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Composite Partitioning</span> (Subpartitioning): <span className="text-cyan-400">RANGE-HASH</span> &amp; LIST-KEY
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering two-tier physical data division in MySQL 8.0: understanding RANGE-HASH and LIST-KEY composite topologies, executing Full Two-Dimensional (2D) partition pruning, managing subpartition lifecycles, and avoiding file descriptor bottlenecks.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Composite Pillars ───────────────────────────── */}
        <section id="composite-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Composite Subpartitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Two-tier physical architecture enabling multi-dimensional pruning, instant lifecycle drops, and parallel write scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Two-Tier Division</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combines logical RANGE/LIST business dimensions with physical HASH/KEY write distribution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Full 2D Pruning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filtering both dimensions pinpoints and scans a single physical <code>.ibd</code> subpartition file.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Instant Drop</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>DROP PARTITION</code> unlinks all child subpartitions in &lt;5ms with zero undo logging.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Exchange Subpartition</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Swaps individual subpartitions with standalone staging tables in &lt;10ms for rapid ETL.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Composite Subpartitioning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe two-tier hierarchy layouts, Full 2D pruning execution plans, RANGE-HASH time-series designs, and LIST-KEY multi-tenant schemas.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(compositeConfigurations).map((configKey) => {
              const config = compositeConfigurations[configKey];
              const isSelected = selectedCompositeKey === configKey;
              return (
                <button
                  key={configKey}
                  onClick={() => setSelectedCompositeKey(configKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {config.configName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Composite Architecture Mode
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentComposite.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentComposite.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentComposite.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentComposite.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentComposite.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentComposite.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentComposite.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Composite DDL &amp; Execution Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentComposite.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentComposite.keyTakeaways.map((item, i) => (
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
              Composite partitioning case studies in Barrackpore and Kolkata demonstrating RANGE-HASH POS scaling and LIST-KEY multi-tenant banking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – RANGE-HASH Scaling in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RANGE-HASH
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS sales reached 60,000,000 invoices across ₹1.2 Crores in sales. Susmita implemented <code>PARTITION BY RANGE (YEAR(order_date)) SUBPARTITION BY HASH (cashier_id) SUBPARTITIONS 4</code>. The primary RANGE allowed instant 5ms purging of old historical years, while the secondary HASH subpartitions distributed concurrent cashier writes across 4 storage files with zero disk head lock contention.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – LIST-KEY Multi-Tenant Vault in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  LIST-KEY (32 Files)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing digital user vaults across ₹500 Crores in volume, Debangshu implemented <code>PARTITION BY LIST COLUMNS (region_name) SUBPARTITION BY KEY (user_uuid) SUBPARTITIONS 8</code>. The primary LIST enforced strict regulatory data residency boundaries across Bengal, Delhi, and Mumbai, while the secondary KEY subpartitions balanced millions of random UUID client accounts across 8 NVMe storage threads in each region.
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
              Avoid omitting subpartition columns from unique keys and creating excessive file counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Unique Keys Missing Subpartition Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting either the primary partition column or subpartition column from Primary/Unique keys causes MySQL to reject table creation with Error 1503.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Include both primary and subpartition columns in all Unique Keys.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Excessive Physical File Multipliers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining 64 subpartitions across 120 monthly partitions creates 7,680 physical files, exhausting file descriptors and causing metadata lock contention.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep total physical subpartition counts between 20 and 200 per table.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Size Subpartitions in Powers of Two
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure subpartition counts in powers of 2 (4, 8, 16) to ensure perfectly uniform row distribution across all physical .ibd files.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes hash entropy and eliminates storage skew.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Filter on Both Dimensions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Structure critical application queries to filter on both the primary and subpartition keys to unlock Full 2D Pruning down to a single physical file.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates 95%+ of disk I/O and CPU memory overhead.
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
            title="Topic 7: Composite Partitioning (Subpartitioning): RANGE-HASH and LIST-KEY Subpartitions"
            content={noteText}
          />

          <Teacher
            note="Composite Subpartitioning gives you the best of both worlds in large-scale database architecture! Use RANGE or LIST at the primary level for your high-level business dimension (like time-series dates or geographic regions), and use HASH or KEY at the subpartition level to spread write I/O across storage disks. When your queries filter on both dimensions, MySQL achieves Full 2D Pruning, scanning exactly ONE physical .ibd subpartition file on disk. Remember that primary keys must include all partitioning columns, and size subpartitions in powers of 2 (4, 8, 16)!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of two-tier data division, Full 2D pruning, RANGE-HASH architectures, LIST-KEY schemas, and subpartition lifecycle DDL.
            </p>
          </div>

          <FAQTemplate
            title="Composite Partitioning (Subpartitioning) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
