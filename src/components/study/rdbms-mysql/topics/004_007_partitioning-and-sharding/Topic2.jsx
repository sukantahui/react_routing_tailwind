import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Partition Pruning: How the Optimizer Skips Irrelevant Partitions to Boost Query Speed
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Partition Pruning workbench: testing static vs dynamic pruning evaluation, identifying function wrapping anti-patterns that break pruning, simulating partition-wise joins, and validating execution plans using EXPLAIN in MySQL 8.0.
 */
const Topic2 = () => {
  // Interactive Pruning Rule State
  const [selectedPruningKey, setSelectedPruningKey] = useState("pruning1_static_vs_dynamic");

  const pruningRules = {
    pruning1_static_vs_dynamic: {
      ruleName: "1. Static vs Dynamic",
      title: "1. Static vs Dynamic Partition Pruning Evaluation",
      badge: "Optimization Timing",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 1. STATIC PRUNING (Compile Time / Constant Literals):
EXPLAIN SELECT * FROM sales_records WHERE order_date = '2025-06-15';
-- Result: partitions = p2025 (Pre-calculated during query optimization!)

-- 🔄 2. DYNAMIC PRUNING (Runtime / Prepared Statements / Subqueries):
PREPARE stmt FROM 'SELECT * FROM sales_records WHERE order_date = ?';
SET @target_date = '2025-08-25';
EXECUTE stmt USING @target_date;
-- Result: Evaluated at runtime using bound parameter values!`,
      explanation:
        "Static pruning evaluates constant literals during query optimization to exclude non-matching partitions. Dynamic pruning evaluates subqueries and prepared statement parameters at runtime before scanning index pages.",
      keyTakeaways: [
        "Static pruning is pre-calculated against constant literals at compile time.",
        "Dynamic pruning evaluates runtime parameters in prepared statements.",
        "Both modes eliminate 90%+ of underlying physical partition reads."
      ]
    },
    pruning2_supported_operators: {
      ruleName: "2. Supported Operators",
      title: "2. Supported Predicates: Range Bounds & Set Membership",
      badge: "Operator Support",
      badgeColor: "cyan",
      sqlSnippet: `-- ✅ OPERATORS THAT TRIGGER 100% PARTITION PRUNING:
-- 1. Equality (=):
SELECT * FROM sales WHERE order_date = '2025-04-12'; -- Reads p2025

-- 2. Range Interval (BETWEEN / < / >=):
SELECT * FROM sales WHERE order_date BETWEEN '2025-01-01' AND '2025-03-31'; -- Reads p2025

-- 3. Set Membership (IN):
SELECT * FROM sales WHERE order_date IN ('2024-05-01', '2025-05-01'); -- Reads p2024, p2025

-- 4. Null Checks (IS NULL):
SELECT * FROM sales WHERE order_date IS NULL; -- Reads p_null`,
      explanation:
        "Equality, inequalities, range intervals, and IN lists allow the MySQL query optimizer to mathematically determine boundary intersections and restrict searches to specific physical partition files.",
      keyTakeaways: [
        "Equality and range bounds enable precise single-partition pruning.",
        "IN lists prune to the exact union of matching partition files.",
        "IS NULL maps directly to the lowest partition or explicit NULL partition."
      ]
    },
    pruning3_anti_patterns: {
      ruleName: "3. Anti-Patterns",
      title: "3. Anti-Patterns that Break Pruning (Function Wrapping)",
      badge: "Performance Trap",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 ANTI-PATTERN: WRAPPING COLUMN IN NON-INVERTIBLE FUNCTIONS:
SELECT * FROM sales_records WHERE DATE_FORMAT(order_date, '%Y') = '2025';
-- ❌ EXPLAIN output: partitions = p2022, p2023, p2024, p2025, p_future (ALL Partitions!)
-- MySQL must evaluate DATE_FORMAT row-by-row across EVERY partition!

-- ✅ SOLUTION: ALWAYS ISOLATE BARE PARTITION COLUMN WITH RANGE BOUNDS:
SELECT * FROM sales_records WHERE order_date &ge; '2025-01-01' AND order_date < '2026-01-01';
-- 🎯 EXPLAIN output: partitions = p2025 (100% Pruned, 15ms Response Time!)`,
      explanation:
        "Wrapping the partition key in string formatting or mathematical functions prevents the optimizer from calculating range bounds, forcing a full table scan across every partition.",
      keyTakeaways: [
        "Never wrap partition columns in DATE_FORMAT or arithmetic operations.",
        "Always isolate the bare partition column on the left side of comparisons.",
        "Use explicit >= and < date boundaries for deterministic pruning."
      ]
    },
    pruning4_partition_wise_joins: {
      ruleName: "4. Partition-Wise Joins",
      title: "4. Partition-Wise Joins & Multi-Table Pruning",
      badge: "Join Optimization",
      badgeColor: "purple",
      sqlSnippet: `-- 💥 UNOPTIMIZED CROSS-PARTITION JOIN (Omission of Partition Key):
SELECT * FROM accounts a JOIN transactions t ON a.account_id = t.account_id;
-- ❌ Evaluates all 10 account partitions against all 10 transaction partitions (100 scans)!

-- ✅ OPTIMIZED PARTITION-WISE JOIN (Include Partition Key in ON Predicate):
SELECT a.account_number, t.amount 
FROM accounts a 
JOIN transactions t ON a.account_id = t.account_id AND a.branch_id = t.branch_id
WHERE a.branch_id = 101;
-- 🎯 Reads ONLY partition p101 in both tables (1:1 Partition Join, 90% I/O reduction!)`,
      explanation:
        "Including the partition key in JOIN conditions enables Partition-Wise Joins, allowing MySQL to join matching partitions 1:1 and avoiding exponential cross-partition scanning overhead.",
      keyTakeaways: [
        "Always include partition columns in compound JOIN ON conditions.",
        "Enables 1:1 partition-wise joins between co-partitioned tables.",
        "Prevents N x M cross-partition scan explosion on multi-million row joins."
      ]
    }
  };

  const currentRule = pruningRules[selectedPruningKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 2 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Partition Pruning</span>: Optimizer Mechanics &amp; <span className="text-cyan-400">Query Acceleration</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering query optimization through Partition Pruning in MySQL 8.0: understanding static vs dynamic pruning evaluation, identifying function wrapping anti-patterns, constructing partition-wise joins, and validating execution plans via <code>EXPLAIN</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Pruning Pillars ─────────────────────────────── */}
        <section id="pruning-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Partition Pruning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Optimizer mechanics eliminating 90%+ of disk reads across multi-million row partitioned datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Static Pruning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates constant literals at query compile time to pre-select matching physical partition files.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Dynamic Pruning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates prepared statement parameters, subqueries, and join predicates at runtime.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Bare Column Bounds</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Isolating bare partition columns with standard range bounds avoids function wrapping penalties.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Partition-Wise Joins</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Joining co-partitioned tables on the partition key achieves 1:1 partition matching with zero cross-scans.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Partition Pruning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe static vs dynamic pruning, supported operators, function wrapping pitfalls, and partition-wise join queries.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(pruningRules).map((ruleKey) => {
              const rule = pruningRules[ruleKey];
              const isSelected = selectedPruningKey === ruleKey;
              return (
                <button
                  key={ruleKey}
                  onClick={() => setSelectedPruningKey(ruleKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {rule.ruleName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Pruning Optimization Rule
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentRule.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentRule.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentRule.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentRule.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentRule.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentRule.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentRule.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Queries &amp; EXPLAIN Outputs:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentRule.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentRule.keyTakeaways.map((item, i) => (
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
              Partition pruning case studies in Barrackpore and Kolkata demonstrating query refactoring speedups and partition-wise join optimizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 38s to 15ms Speedup in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Pruning Refactor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS sales reports took 38 seconds across ₹1.2 Crores in retail inventory. The original query used <code>WHERE YEAR(order_date) = 2025</code>, which prevented clean range pruning. Susmita refactored the query to explicit date boundaries (<code>WHERE order_date >= &apos;2025-01-01&apos; AND order_date &lt; &apos;2026-01-01&apos;</code>), allowing the optimizer to prune to the single 2025 partition and cutting query time to 15 milliseconds.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Partition-Wise Joins in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  90% I/O Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in volume required joining a 20M-row accounts table with a 200M-row transactions table. Omitting the branch partition key in the <code>JOIN ON</code> clause caused 100 cross-partition evaluation scans. Debangshu added <code>AND a.branch_id = t.branch_id</code>, enabling 1:1 partition-wise joins that eliminated 90% of disk I/O.
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
              Avoid wrapping partition columns in functions and combining partition keys with unpartitioned columns in OR queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Function Wrapping on Partition Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code>WHERE DATE_FORMAT(date, &apos;%Y&apos;) = &apos;2025&apos;</code> disables partition pruning, forcing MySQL to scan every single physical partition.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use bare column range comparisons (order_date >= &apos;2025-01-01&apos;).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: OR Predicates with Non-Partitioned Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Queries using <code>WHERE partition_col = X OR unpartitioned_col = Y</code> disable pruning because matching rows could exist in any partition.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Split into separate queries joined by UNION to preserve pruning.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Verify Pruning via EXPLAIN
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always run <code>EXPLAIN SELECT ...</code> and verify that the <code>partitions</code> column lists only targeted partitions rather than the full partition list.
              </p>
              <div className="text-xs text-slate-400">
                Confirms that query predicates trigger partition pruning.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Partition-Wise Joins
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Include the partitioning column in <code>JOIN ON</code> predicates when joining co-partitioned tables to restrict joins to matching partition pairs.
              </p>
              <div className="text-xs text-slate-400">
                Prevents multi-partition Cartesian product cross-scans.
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
            title="Topic 2: Partition Pruning: How the Optimizer Skips Irrelevant Partitions to Boost Query Speed"
            content={noteText}
          />

          <Teacher
            note="Partition Pruning is where table partitioning delivers its true performance magic! When you write a query with a clean partition filter, the MySQL optimizer skips 90%+ of the table's physical data files, turning multi-second table scans into 10ms localized reads. Never wrap your partition columns in non-invertible functions like DATE_FORMAT, always include the partition column in your JOIN ON clauses to unlock 1:1 partition-wise joins, and use EXPLAIN to verify that your queries are pruning perfectly!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of static vs dynamic pruning, supported operators, function wrapping pitfalls, partition-wise joins, and EXPLAIN execution plans.
            </p>
          </div>

          <FAQTemplate
            title="Partition Pruning &amp; Optimizer Mechanics FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
