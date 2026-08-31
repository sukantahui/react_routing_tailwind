import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – HASH Partitioning & LINEAR HASH: Distributing Rows Evenly across Fixed Buckets
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive HASH and LINEAR HASH partitioning workbench: evaluating standard modulus vs powers-of-two bitwise distribution, analyzing partition resizing costs, testing point equality pruning vs range scan behaviors, and managing partitions via ADD / COALESCE in MySQL 8.0.
 */
const Topic5 = () => {
  // Interactive Hash Algorithm State
  const [selectedHashKey, setSelectedHashKey] = useState("hash1_standard_vs_linear");

  const hashAlgorithms = {
    hash1_standard_vs_linear: {
      algoName: "1. Modulus vs Linear Algorithm",
      title: "1. Standard Modulus vs LINEAR HASH Powers-of-Two Algorithm",
      badge: "Algorithm Math",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧮 1. STANDARD HASH (Modulus Remainder Formula):
-- Partition ID = MOD(ABS(user_id), N)
-- Perfect statistical uniformity, but changing N redistributes ~100% of rows!
CREATE TABLE standard_hash_events (
  event_id BIGINT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  PRIMARY KEY (event_id, user_id)
) PARTITION BY HASH (user_id) PARTITIONS 4;

-- ⚡ 2. LINEAR HASH (Powers-of-Two Bitwise Algorithm):
-- Partition ID calculated via bitwise AND with smallest power of two (P >= N).
-- Fast resizing! Adding a partition only splits rows from 1 affected partition (1/N)!
CREATE TABLE linear_hash_events (
  event_id BIGINT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  PRIMARY KEY (event_id, user_id)
) PARTITION BY LINEAR HASH (user_id) PARTITIONS 8;`,
      explanation:
        "Standard HASH uses the modulo algorithm to achieve perfectly uniform row distribution. LINEAR HASH uses a powers-of-two bitwise algorithm that allows adding or removing partitions while moving only a fraction (1/N) of existing data.",
      keyTakeaways: [
        "Standard HASH uses MOD(expr, N) for perfectly balanced row counts.",
        "LINEAR HASH uses bitwise operations to minimize data movement during resizing.",
        "Power-of-two partition counts (4, 8, 16, 32) optimize LINEAR HASH balance."
      ]
    },
    hash2_resizing_cost: {
      algoName: "2. Resizing Cost Analysis",
      title: "2. The Resizing Dilemma: Full Reorganization vs 1/N Split",
      badge: "Scaling Overhead",
      badgeColor: "cyan",
      sqlSnippet: `-- 💥 STANDARD HASH RESIZING (Extremely Heavy on 50M Rows):
-- Changing partition count from 4 to 5 alters MOD(user_id, 4) → MOD(user_id, 5).
-- ~100% of rows across all 4 files are read, deleted, and rewritten!
-- Table locks and I/O churn take 45+ minutes!

-- ⚡ LINEAR HASH RESIZING (Lightweight & Instant):
-- Changing from 4 to 5 partitions ONLY splits Partition 0 into Partition 0 & 4!
-- Partitions 1, 2, and 3 are 100% untouched!
-- Resizing completes in seconds with minimal disk I/O!`,
      explanation:
        "Standard HASH requires full table data reorganization when partition counts change. LINEAR HASH isolates data movement to the single split partition, making it the premier choice for rapidly expanding tables.",
      keyTakeaways: [
        "Standard HASH redistributes ~100% of all rows when partition count changes.",
        "LINEAR HASH moves only 1/N of existing rows from the single split partition.",
        "Enables dynamic online scaling for high-throughput transactional tables."
      ]
    },
    hash3_pruning_behavior: {
      algoName: "3. Pruning Behavior",
      title: "3. Point Equality Pruning vs Range Scan Limitations",
      badge: "Optimizer Support",
      badgeColor: "purple",
      sqlSnippet: `-- ✅ POINT EQUALITY PRUNING (100% Single-Partition Read):
EXPLAIN SELECT * FROM linear_hash_events WHERE user_id = 105;
-- Output: partitions = p1 (MySQL evaluates hash and reads ONLY 1 partition file!)

-- ⚠️ RANGE SCANS CANNOT PRUNE HASH PARTITIONS (Scatter-Gather Scan):
EXPLAIN SELECT * FROM linear_hash_events WHERE user_id BETWEEN 100 AND 200;
-- Output: partitions = p0, p1, p2, p3, p4, p5, p6, p7 (ALL Partitions Evaluated!)
-- Consecutive integer IDs are scattered randomly across different modulo buckets!`,
      explanation:
        "HASH partitioning delivers instant partition pruning on point equality (=) and IN lookups. However, range queries cannot be pruned because adjacent numeric IDs reside in different hash buckets.",
      keyTakeaways: [
        "Point equality (WHERE user_id = 105) achieves 100% single-partition pruning.",
        "IN lists prune to the exact subset of matching hash buckets.",
        "Range queries (BETWEEN) must scan all partitions (Scatter-Gather)."
      ]
    },
    hash4_add_coalesce: {
      algoName: "4. ADD & COALESCE",
      title: "4. Managing HASH Partitions: ADD & COALESCE PARTITION",
      badge: "Lifecycle DDL",
      badgeColor: "rose",
      sqlSnippet: `-- 🚀 1. ADDING 4 PARTITIONS DYNAMICALLY (Increases from 8 to 12):
ALTER TABLE linear_hash_events ADD PARTITION PARTITIONS 4;

-- 🔄 2. REDUCING PARTITION COUNT (Merges 4 partitions back into 8):
ALTER TABLE linear_hash_events COALESCE PARTITION 4;

-- 💡 Note: DROP PARTITION is illegal on HASH tables; COALESCE is mandatory!`,
      explanation:
        "HASH tables cannot use DROP PARTITION because rows are distributed across all files. ADD PARTITION increases bucket counts, while COALESCE PARTITION merges buckets back safely without losing data.",
      keyTakeaways: [
        "ALTER TABLE ... ADD PARTITION PARTITIONS K increases partition count.",
        "ALTER TABLE ... COALESCE PARTITION K merges partitions safely.",
        "DROP PARTITION is rejected on HASH tables to protect data integrity."
      ]
    }
  };

  const currentHash = hashAlgorithms[selectedHashKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 5 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">HASH Partitioning</span> &amp; <span className="text-cyan-400">LINEAR HASH</span>: Even Bucket Distribution
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering uniform pseudorandom data distribution in MySQL 8.0: understanding standard modulus vs powers-of-two LINEAR HASH bitwise algorithms, evaluating partition resizing costs, testing point equality pruning, and managing partitions via <code>ADD</code> and <code>COALESCE</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: HASH Pillars ────────────────────────────────── */}
        <section id="hash-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of HASH Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core mathematical principles enabling uniform data spreading, hot-spot elimination, and scalable partition management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Uniform Modulus</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>MOD(ABS(expr), N)</code> distributes rows evenly across $N$ buckets to eliminate write hot spots.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">LINEAR HASH Scaling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powers-of-two bitwise algorithm moves only $1/N$ data during partition additions and merges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Point Equality Pruning</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Point lookups (<code>WHERE id = 105</code>) achieve 100% single-partition pruning with zero disk churn.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">COALESCE Partition</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Safely merges partitions and reduces bucket counts without row loss (unlike <code>DROP PARTITION</code>).
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive HASH &amp; LINEAR HASH Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe standard modulus math, powers-of-two LINEAR HASH bitwise calculations, point equality pruning, and ADD/COALESCE operations.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(hashAlgorithms).map((hashKey) => {
              const algo = hashAlgorithms[hashKey];
              const isSelected = selectedHashKey === hashKey;
              return (
                <button
                  key={hashKey}
                  onClick={() => setSelectedHashKey(hashKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {algo.algoName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Hashing Algorithm &amp; Scaling Feature
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentHash.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentHash.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentHash.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentHash.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentHash.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentHash.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentHash.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL DDL &amp; Partitioning Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentHash.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentHash.keyTakeaways.map((item, i) => (
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
              HASH partitioning case studies in Barrackpore and Kolkata demonstrating zero-downtime Diwali festival scaling and power-of-two ATM balancing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Zero-Downtime Festival Scaling in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  LINEAR HASH
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS session tokens reached 50,000,000 records across ₹1.2 Crores in sales transactions. Anticipating high Diwali shopping traffic, Susmita deployed <code>PARTITION BY LINEAR HASH (user_id) PARTITIONS 4</code>. She expanded the table from 4 to 8 partitions online via <code>ADD PARTITION PARTITIONS 4</code>; only 1/4 of existing rows were split, completing the partition expansion in 12 seconds with zero cashier downtime.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Power-of-Two ATM Balancing in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Power of 2 (16 Buckets)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in volume, IoT ATM telemetry streams inserted 2,000 writes/second. Debangshu configured <code>PARTITION BY LINEAR HASH (terminal_id) PARTITIONS 16</code>. Sizing the partition count to an exact power of 2 ($2^4 = 16$) ensured that all 16 physical <code>.ibd</code> files remained within 2% size variance, eliminating disk I/O bottlenecks across server drives.
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
              Avoid using low-cardinality columns for hashing and executing range scans on HASH tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Low-Cardinality Hashing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Partitioning by a low-cardinality column (e.g. status) crowds all data into 2 partitions, leaving other partitions empty and creating severe storage skew.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use high-cardinality columns (like user_id, terminal_id, or UUID).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Expecting Range Pruning on HASH
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Queries using <code>WHERE id BETWEEN X AND Y</code> force a full Scatter-Gather scan across all partitions because hash keys are randomly scattered.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use RANGE partitioning if high-frequency queries filter on intervals.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Standardize on LINEAR HASH
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>LINEAR HASH</code> for high-growth tables so future partition expansions (via <code>ADD PARTITION</code>) only move a fraction of data.
              </p>
              <div className="text-xs text-slate-400">
                Prevents full-table reorganization lockups during maintenance.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Size as Powers of Two
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure LINEAR HASH partition counts as powers of 2 (4, 8, 16, 32, 64) to achieve perfectly balanced partition file sizes.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates partition skew inherent in non-power-of-two bitwise masks.
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
            title="Topic 5: HASH Partitioning & LINEAR HASH: Distributing Rows Evenly across Fixed Buckets"
            content={noteText}
          />

          <Teacher
            note="HASH Partitioning is your best choice when data has no natural range or category but you need to eliminate write bottlenecks by spreading data evenly across multiple disk files! Understand the crucial difference: Standard HASH uses MOD(expr, N) for perfect statistical uniformity, but adding a partition redistributes almost 100% of all rows. LINEAR HASH uses a powers-of-two bitwise algorithm that moves only 1/N data when adding or coalescing partitions. Always size LINEAR HASH partitions in powers of 2 (4, 8, 16, 32) and use high-cardinality integer columns!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of standard modulus math, powers-of-two bitwise algorithms, resizing overhead, point equality pruning, and ADD/COALESCE operations.
            </p>
          </div>

          <FAQTemplate
            title="HASH &amp; LINEAR HASH Partitioning FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
