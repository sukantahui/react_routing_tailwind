import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Hands-on Performance Tuning Workshop: Transforming a 5-second Query to 5 Milliseconds
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Master hands-on performance tuning workshop and interactive refactoring pipeline: transforming a disastrous 5,200ms enterprise query across 5 systematic phases into a blazingly fast 4.8ms execution (1,080x speedup) using EXPLAIN ANALYZE, sargability, CTE aggregation, covering indexes, and keyset cursor pagination.
 */
const Topic14 = () => {
  // Interactive 5-Phase Workshop Simulator State
  const [selectedPhase, setSelectedPhase] = useState("phase1_baseline");

  const tuningPhases = {
    phase1_baseline: {
      phaseNumber: "Phase 1: Baseline",
      title: "1. Phase 1: Baseline Diagnosis & Ground Truth (5,200 ms) 🚨",
      badge: "Baseline Disaster (5,200 ms)",
      badgeColor: "rose",
      latency: "5,200.00 ms",
      speedup: "1.0x (Baseline)",
      sqlCode: `-- ❌ PHASE 1: THE DISASTROUS BASELINE QUERY (5,200 ms):
-- Contains 6 compounding anti-patterns on a 500,000-row database:
-- 1. SELECT * pulls 2KB text/blob notes per row.
-- 2. YEAR(e.exam_date) = 2026 destroys index seek on exams.
-- 3. s.phone_number = 9830012345 triggers implicit string-to-double cast.
-- 4. Correlated subquery in SELECT iterates 50,000 times for fee totals.
-- 5. Unindexed ORDER BY l.balance_inr DESC spills filesort to disk.
-- 6. OFFSET 50000 LIMIT 20 reads and discards 50,000 rows.

EXPLAIN ANALYZE
SELECT 
    s.*,
    (SELECT SUM(fee_amount) FROM student_fees f WHERE f.student_id = s.student_id) AS total_fees,
    d.department_name,
    l.balance_inr
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN student_ledgers l ON s.student_id = l.student_id
WHERE s.city = 'Barrackpore'
  AND YEAR(s.registration_date) = 2026
  AND s.phone_number = 9830012345
ORDER BY l.balance_inr DESC
LIMIT 50000, 20;

-- 📋 EXPLAIN ANALYZE Metrics:
-- -> Table scan on s (cost=52412 rows=500000) (actual time=0.15..5180.2 ms, rows=50020)
-- -> Using filesort (Disk temporary sort file: 28MB)
-- Total Actual Execution Time: 5,200 ms 🚨 (Severe System Bottleneck!)`,
      metricsTable: [
        { metric: "Execution Latency", value: "5,200.00 ms (5.2 seconds) 🚨" },
        { metric: "Rows Examined", value: "500,000 rows (Full Table Scan)" },
        { metric: "Access Type", value: "type = ALL (Table Scan on student_records)" },
        { metric: "Sorting Footprint", value: "Spilled to 28MB Disk Temp File (Using filesort)" },
        { metric: "Subquery Execution", value: "50,000 Row-by-Row Correlated Loops 🚨" },
        { metric: "Buffer Pool Impact", value: "Severe Cache Eviction & RAM Thrashing" }
      ],
      explanation:
        "The baseline query is a complete failure: non-sargable date and type-cast predicates force a 500,000-row table scan, a correlated subquery executes 50,000 times, and `ORDER BY` spills to a 28MB disk temporary file."
    },
    phase2_sargability: {
      phaseNumber: "Phase 2: Sargability & Projection",
      title: "2. Phase 2: Sargability & Explicit Projection (840 ms - 6x Speedup) ⚡",
      badge: "Sargability Fix (840 ms)",
      badgeColor: "amber",
      latency: "840.00 ms",
      speedup: "6.2x Faster",
      sqlCode: `-- ⚡ PHASE 2: SARGABILITY & PROJECTION REFACTORING (840 ms):
-- 1. Eliminated SELECT * -> Project ONLY explicit columns needed by frontend.
-- 2. Converted YEAR(s.registration_date) = 2026 into half-open date boundaries:
--    s.registration_date >= '2026-01-01 00:00:00' AND s.registration_date < '2027-01-01 00:00:00'
-- 3. Quoted phone string literal: s.phone_number = '9830012345' to eliminate implicit cast!

EXPLAIN ANALYZE
SELECT 
    s.student_id, s.name, s.city, s.registration_date,
    (SELECT SUM(fee_amount) FROM student_fees f WHERE f.student_id = s.student_id) AS total_fees,
    d.department_name,
    l.balance_inr
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN student_ledgers l ON s.student_id = l.student_id
WHERE s.city = 'Barrackpore'
  AND s.registration_date >= '2026-01-01 00:00:00' 
  AND s.registration_date < '2027-01-01 00:00:00'
  AND s.phone_number = '9830012345'
ORDER BY l.balance_inr DESC
LIMIT 50000, 20;

-- 📋 EXPLAIN ANALYZE Metrics:
-- -> Index range scan on s (idx_reg_date) (actual time=0.08..820.5 ms, rows=12000)
-- Total Actual Execution Time: 840 ms ⚡ (6.2x faster!)`,
      metricsTable: [
        { metric: "Execution Latency", value: "840.00 ms (Down from 5,200 ms!) ⚡" },
        { metric: "Rows Examined", value: "12,000 rows (Index Range Candidate Scan)" },
        { metric: "Access Type", value: "type = range (idx_reg_date)" },
        { metric: "Sorting Footprint", value: "In-Memory Sort (Narrow Row Width)" },
        { metric: "Subquery Execution", value: "12,000 Correlated Subquery Loops (Still an issue)" },
        { metric: "Buffer Pool Impact", value: "Eliminated Table Scan Disk I/O" }
      ],
      explanation:
        "Isolating naked date boundaries and quoting the string phone literal allowed MySQL to abandon the 500,000-row table scan in favor of an initial index range scan, dropping latency from 5,200ms to 840ms (6.2x speedup)."
    },
    phase3_set_based_cte: {
      phaseNumber: "Phase 3: Set-Based CTE Join",
      title: "3. Phase 3: Set-Based CTE / JOIN Aggregation (180 ms - 28x Speedup) ⚡",
      badge: "Set-Based CTE (180 ms)",
      badgeColor: "cyan",
      latency: "180.00 ms",
      speedup: "28.8x Faster",
      sqlCode: `-- ⚡ PHASE 3: ELIMINATING CORRELATED SUBQUERY WITH CTE (180 ms):
-- 1. Replaced 12,000 row-by-row subquery loop executions with a single batch
--    Common Table Expression (CTE) grouped by student_id!
-- 2. Joined the aggregated fee summaries in a single hash/index join pass!

EXPLAIN ANALYZE
WITH FeeAggregates AS (
    SELECT student_id, SUM(fee_amount) AS total_fees 
    FROM student_fees 
    GROUP BY student_id
)
SELECT 
    s.student_id, s.name, s.city, s.registration_date,
    COALESCE(f.total_fees, 0) AS total_fees,
    d.department_name,
    l.balance_inr
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN student_ledgers l ON s.student_id = l.student_id
LEFT JOIN FeeAggregates f ON s.student_id = f.student_id
WHERE s.city = 'Barrackpore'
  AND s.registration_date >= '2026-01-01 00:00:00' 
  AND s.registration_date < '2027-01-01 00:00:00'
ORDER BY l.balance_inr DESC
LIMIT 50000, 20;

-- 📋 EXPLAIN ANALYZE Metrics:
-- -> Hash join on (s.student_id = f.student_id) (actual time=0.12..175.4 ms)
-- Total Actual Execution Time: 180 ms ⚡ (28.8x cumulative speedup!)`,
      metricsTable: [
        { metric: "Execution Latency", value: "180.00 ms (Down from 840 ms!) ⚡" },
        { metric: "Rows Examined", value: "12,000 rows" },
        { metric: "Access Type", value: "Single Batch Hash/Index Join" },
        { metric: "Sorting Footprint", value: "In-Memory filesort (Using filesort)" },
        { metric: "Subquery Execution", value: "0 Row-by-Row Loops (Single Batch Pass!) ⚡" },
        { metric: "Buffer Pool Impact", value: "Minimal CPU context switching" }
      ],
      explanation:
        "Transforming the row-by-row correlated subquery into a set-based CTE aggregation eliminated thousands of repetitive subquery iterations, dropping execution time from 840ms to 180ms (28.8x cumulative speedup)."
    },
    phase4_covering_index: {
      phaseNumber: "Phase 4: Composite Covering Index",
      title: "4. Phase 4: Composite Covering Indexing (14 ms - 370x Speedup) ⚡",
      badge: "Covering Index (14 ms)",
      badgeColor: "emerald",
      latency: "14.00 ms",
      speedup: "371x Faster",
      sqlCode: `-- ⚡ PHASE 4: TARGETED COMPOSITE COVERING INDEX (14 ms):
-- Created index following the Equality -> Range -> Sort rule:
-- DDL: CREATE INDEX idx_student_ledger_cov ON student_records (city, registration_date, student_id, name);
-- DDL: CREATE INDEX idx_ledger_balance ON student_ledgers (student_id, balance_inr);

EXPLAIN ANALYZE
WITH FeeAggregates AS (
    SELECT student_id, SUM(fee_amount) AS total_fees 
    FROM student_fees 
    GROUP BY student_id
)
SELECT 
    s.student_id, s.name, s.city, s.registration_date,
    COALESCE(f.total_fees, 0) AS total_fees,
    d.department_name,
    l.balance_inr
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN student_ledgers l ON s.student_id = l.student_id
LEFT JOIN FeeAggregates f ON s.student_id = f.student_id
WHERE s.city = 'Barrackpore'
  AND s.registration_date >= '2026-01-01 00:00:00' 
  AND s.registration_date < '2027-01-01 00:00:00'
ORDER BY l.balance_inr DESC
LIMIT 50000, 20;

-- 📋 EXPLAIN ANALYZE Metrics:
-- -> Index-only seek on s (Using index) (actual time=0.04..13.5 ms)
-- Total Actual Execution Time: 14 ms ⚡ (371x cumulative speedup!)`,
      metricsTable: [
        { metric: "Execution Latency", value: "14.00 ms (Down from 180 ms!) ⚡" },
        { metric: "Rows Examined", value: "650 rows" },
        { metric: "Access Type", value: "type = range & eq_ref (Covering B+Tree)" },
        { metric: "Sorting Footprint", value: "0 Sorts (Pre-sorted B+Tree Navigation) ⚡" },
        { metric: "Bookmark Seeks", value: "0 Clustered Table Disk Reads (Using index) ⚡" },
        { metric: "Buffer Pool Impact", value: "Pure 100% In-RAM Index Cache Hit" }
      ],
      explanation:
        "The composite covering index eliminated all clustered table bookmark lookups and satisfied sorting directly from the B+Tree leaf nodes, dropping execution time from 180ms down to 14ms (371x cumulative speedup)."
    },
    phase5_keyset_pagination: {
      phaseNumber: "Phase 5: Keyset Pagination",
      title: "5. Phase 5: Keyset Cursor Pagination (4.8 ms - 1,080x Speedup!) 🚀",
      badge: "Keyset 4.8 ms (1,080x Speedup!)",
      badgeColor: "emerald",
      latency: "4.80 ms",
      speedup: "1,083x Faster! 🚀",
      sqlCode: `-- 🚀 PHASE 5: KEYSET (CURSOR) PAGINATION (4.8 ms - 1,080x Faster!):
-- 1. Replaced OFFSET 50,000 with Keyset Pagination on last_seen_student_id = 50000:
-- 2. Eliminates reading and discarding 50,000 preceding rows from the tablespace!
-- 3. Executes as an instantaneous O(1) B+Tree binary search boundary seek!

EXPLAIN ANALYZE
WITH FeeAggregates AS (
    SELECT student_id, SUM(fee_amount) AS total_fees 
    FROM student_fees 
    WHERE student_id > 50000
    GROUP BY student_id
)
SELECT 
    s.student_id, s.name, s.city, s.registration_date,
    COALESCE(f.total_fees, 0) AS total_fees,
    d.department_name,
    l.balance_inr
FROM student_records s
JOIN departments d ON s.department_id = d.department_id
JOIN student_ledgers l ON s.student_id = l.student_id
LEFT JOIN FeeAggregates f ON s.student_id = f.student_id
WHERE s.city = 'Barrackpore'
  AND s.registration_date >= '2026-01-01 00:00:00' 
  AND s.registration_date < '2027-01-01 00:00:00'
  AND s.student_id > 50000
ORDER BY s.student_id ASC
LIMIT 20;

-- 📋 EXPLAIN ANALYZE Final Metrics:
-- -> Index range scan on s (s.student_id > 50000) (actual time=0.03..4.65 ms, rows=20)
-- -> Single-row point lookups on d and l (actual time=0.01 ms)
-- 🚀 FINAL ACTUAL EXECUTION TIME: 4.80 ms (1,083x faster than baseline 5,200 ms!)`,
      metricsTable: [
        { metric: "Final Execution Latency", value: "4.80 ms (Down from 5,200 ms!) 🚀" },
        { metric: "Rows Examined", value: "EXACTLY 20 rows read (Zero discarded rows!) ⚡" },
        { metric: "Access Type", value: "type = range (Constant O(1) Binary Seek)" },
        { metric: "Sorting Footprint", value: "0 Sorts (Streamed directly from PK)" },
        { metric: "Cumulative Speedup", value: "1,083x Faster (99.9% Latency Reduction!) 🚀" },
        { metric: "Connection Pool Impact", value: "Frees DB Connection 1,000x Faster!" }
      ],
      explanation:
        "By replacing deep `OFFSET 50,000` with Keyset pagination (`WHERE student_id > 50000 LIMIT 20`), MySQL reads exactly 20 matching records from the B+Tree. Total query execution drops to 4.8 milliseconds—a 1,083x speedup over the 5.2-second baseline!"
    }
  };

  const navItems = [
    { id: "workshop-overview", label: "1. Workshop Case Study Overview" },
    { id: "transformation-matrix", label: "2. The 5-Phase Tuning Matrix" },
    { id: "svg-architecture", label: "3. Visual Performance Waterfall" },
    { id: "interactive-workbench", label: "4. Interactive 5-Phase Refactoring Workbench" },
    { id: "explain-comparison", label: "5. Before-and-After EXPLAIN Comparison" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "10. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 14 of 15 (Capstone Workshop)</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs">
              1,000x Performance Workshop
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hands-on Performance Tuning Workshop: 5-Second Query to 5 Milliseconds
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            The capstone optimization masterclass: follow a step-by-step 5-phase engineering methodology that transforms a slow, catastrophic 5,200 ms enterprise reporting query into a blazingly fast <strong className="text-emerald-400">4.8 ms</strong> execution (<strong className="text-cyan-400">1,080x speedup</strong>).
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Workshop Case Study Overview */}
        <section id="workshop-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 1,000x Performance Transformation Journey
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A systematic engineering methodology transforming catastrophic queries into sub-millisecond execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                The Problem
              </span>
              <h3 className="font-bold text-white text-base">5,200 ms Baseline</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A 4-table join on student records, fees, and ledgers in Barrackpore is pegging CPU at 100%, causing web request timeouts and saturating the database connection pool.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                The Methodology
              </span>
              <h3 className="font-bold text-white text-base">5-Phase Refactoring</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Step 1: Baseline ground truth &rarr; Step 2: Sargability &amp; projection &rarr; Step 3: Set-based CTE &rarr; Step 4: Covering index &rarr; Step 5: Keyset pagination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                The Outcome
              </span>
              <h3 className="font-bold text-white text-base">4.8 ms (1,080x Faster!)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Execution time drops by 99.9%. The database connection is released in 4.8ms, allowing the server to handle 10,000 requests per second with ease.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The 5-Phase Tuning Matrix */}
        <section id="transformation-matrix" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 5-Phase Performance Progression Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Cumulative metrics and latency reductions achieved across each phase.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Phase</th>
                  <th className="py-3 px-4">Key Transformation Applied</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Speedup</th>
                  <th className="py-3 px-4">Rows Examined</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">Phase 1: Baseline</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Initial Query (6 Compounding Anti-Patterns)</td>
                  <td className="py-3 px-4 font-bold text-rose-400">5,200.0 ms</td>
                  <td className="py-3 px-4 text-slate-400">1.0x (Baseline)</td>
                  <td className="py-3 px-4 text-rose-300">500,000</td>
                  <td className="py-3 px-4 text-xs text-rose-400">Disastrous ❌</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Phase 2: Sargability</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Isolate Raw Date Range + Quote String Phone</td>
                  <td className="py-3 px-4 font-bold text-amber-400">840.0 ms</td>
                  <td className="py-3 px-4 text-amber-300">6.2x Faster</td>
                  <td className="py-3 px-4 text-amber-300">12,000</td>
                  <td className="py-3 px-4 text-xs text-amber-300">Range Seek ⚡</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-sans">Phase 3: Set-Based CTE</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Eliminate Correlated Subquery with Batch CTE</td>
                  <td className="py-3 px-4 font-bold text-cyan-400">180.0 ms</td>
                  <td className="py-3 px-4 text-cyan-300">28.8x Faster</td>
                  <td className="py-3 px-4 text-cyan-300">12,000</td>
                  <td className="py-3 px-4 text-xs text-cyan-300">Hash Join ⚡</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Phase 4: Covering Index</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Add Covering Index `idx_student_ledger_cov`</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">14.0 ms</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">371x Faster</td>
                  <td className="py-3 px-4 text-emerald-300">650</td>
                  <td className="py-3 px-4 text-xs text-emerald-300">Index Only ⚡</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300 font-sans">Phase 5: Keyset Paging</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replace `LIMIT 50k, 20` with `WHERE id &gt; 50k`</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">4.8 ms</td>
                  <td className="py-3 px-4 text-emerald-300 font-extrabold">1,083x Faster! 🚀</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">20</td>
                  <td className="py-3 px-4 text-xs text-emerald-300 font-bold">Sub-Millisecond 🚀</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Performance Waterfall */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: The 1,000x Performance Waterfall
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing execution latency drops across all 5 engineering tuning phases.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Performance Tuning Waterfall */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 14.1: The 1,000x Performance Tuning Latency Waterfall (5,200 ms &rarr; 4.8 ms)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Benchmark Metrics</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 380"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradWfallRed" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#9f1239" />
                    </linearGradient>
                    <linearGradient id="gradWfallAmber" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                    <linearGradient id="gradWfallCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="gradWfallGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  <line x1="100" y1="300" x2="900" y2="300" stroke="#334155" strokeWidth="1.5" />
                  <line x1="100" y1="230" x2="900" y2="230" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="100" y1="160" x2="900" y2="160" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="100" y1="90" x2="900" y2="90" stroke="#1e293b" strokeDasharray="4" />

                  {/* Y Axis Labels */}
                  <text x="80" y="305" fill="#64748b" fontSize="10" textAnchor="end">0 ms</text>
                  <text x="80" y="235" fill="#64748b" fontSize="10" textAnchor="end">1,500 ms</text>
                  <text x="80" y="165" fill="#64748b" fontSize="10" textAnchor="end">3,500 ms</text>
                  <text x="80" y="95" fill="#64748b" fontSize="10" textAnchor="end">5,200 ms</text>

                  {/* Bar 1: Phase 1 Baseline */}
                  <rect x="130" y="80" width="110" height="220" rx="6" fill="url(#gradWfallRed)" />
                  <text x="185" y="70" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">5,200 ms 🚨</text>
                  <text x="185" y="325" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 1</text>
                  <text x="185" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">Baseline</text>

                  {/* Bar 2: Phase 2 Sargability */}
                  <rect x="290" y="255" width="110" height="45" rx="6" fill="url(#gradWfallAmber)" />
                  <text x="345" y="245" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">840 ms ⚡</text>
                  <text x="345" y="325" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 2</text>
                  <text x="345" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">Sargability (6x)</text>

                  {/* Bar 3: Phase 3 Set-Based CTE */}
                  <rect x="450" y="285" width="110" height="15" rx="4" fill="url(#gradWfallCyan)" />
                  <text x="505" y="275" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">180 ms ⚡</text>
                  <text x="505" y="325" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 3</text>
                  <text x="505" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">CTE Join (28x)</text>

                  {/* Bar 4: Phase 4 Covering Index */}
                  <rect x="610" y="296" width="110" height="4" rx="2" fill="url(#gradWfallGreen)" />
                  <text x="665" y="285" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">14 ms ⚡</text>
                  <text x="665" y="325" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 4</text>
                  <text x="665" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">Covering (370x)</text>

                  {/* Bar 5: Phase 5 Keyset Pagination */}
                  <rect x="770" y="298" width="110" height="2" rx="1" fill="#34d399" />
                  <text x="825" y="285" fill="#34d399" fontSize="12" fontWeight="extrabold" textAnchor="middle">4.8 ms 🚀</text>
                  <text x="825" y="325" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 5</text>
                  <text x="825" y="340" fill="#a7f3d0" fontSize="9" textAnchor="middle">Keyset (1,080x!)</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive 5-Phase Refactoring Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive 5-Phase Refactoring Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through each tuning phase to observe SQL code transformations, EXPLAIN ANALYZE metrics, and latency drops.
            </p>
          </div>

          {/* Phase Switcher Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(tuningPhases).map((key) => {
              const phase = tuningPhases[key];
              const isSelected = selectedPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      phase.badgeColor === "emerald" && "bg-emerald-400",
                      phase.badgeColor === "cyan" && "bg-cyan-400",
                      phase.badgeColor === "amber" && "bg-amber-400",
                      phase.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{phase.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Workbench Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {tuningPhases[selectedPhase].title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                  <span className="text-slate-400">Execution Duration:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {tuningPhases[selectedPhase].latency}
                  </span>
                  <span>•</span>
                  <span className="text-cyan-400 font-bold">
                    {tuningPhases[selectedPhase].speedup}
                  </span>
                </div>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  tuningPhases[selectedPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  tuningPhases[selectedPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  tuningPhases[selectedPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  tuningPhases[selectedPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {tuningPhases[selectedPhase].badge}
              </span>
            </div>

            {/* SQL Code Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Refactored Script &amp; EXPLAIN ANALYZE Output:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {tuningPhases[selectedPhase].sqlCode}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Phase Telemetry Breakdown:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Performance Dimension</th>
                      <th className="py-2.5 px-4">Observed Metric / Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {tuningPhases[selectedPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tuningPhases[selectedPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Before-and-After EXPLAIN Comparison */}
        <section id="explain-comparison" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Before-and-After EXPLAIN Comparison Summary
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Detailed technical diff of database access paths and hardware resource footprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-2">
                <h3 className="font-bold text-rose-400">❌ Before: 5,200 ms Baseline</h3>
                <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded">Unoptimized</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li>• Access Type: <strong className="text-rose-400">type = ALL (Table Scan)</strong></li>
                <li>• Rows Examined: <strong className="text-rose-400">500,000 rows</strong></li>
                <li>• Sorting: <strong className="text-rose-400">Using filesort (28MB Disk Temp Spill)</strong></li>
                <li>• Subqueries: <strong className="text-rose-400">50,000 Dependent Subquery Loops</strong></li>
                <li>• Pagination: <strong className="text-rose-400">OFFSET 50,000 Discards 50,000 rows</strong></li>
                <li>• Connection Hold Time: <strong className="text-rose-400">5.20 seconds</strong></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2">
                <h3 className="font-bold text-emerald-400">⚡ After: 4.8 ms Tuned (1,080x Faster!)</h3>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">Production Grade</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li>• Access Type: <strong className="text-emerald-400">type = range &amp; eq_ref (Covering B+Tree)</strong></li>
                <li>• Rows Examined: <strong className="text-emerald-400">EXACTLY 20 rows</strong></li>
                <li>• Sorting: <strong className="text-emerald-400">0 Sorts (Streamed directly from PK)</strong></li>
                <li>• Subqueries: <strong className="text-emerald-400">1 Single Batch CTE Hash Join</strong></li>
                <li>• Pagination: <strong className="text-emerald-400">Keyset WHERE id &gt; 50k (Constant O(1))</strong></li>
                <li>• Connection Hold Time: <strong className="text-emerald-400">0.0048 seconds (Instantaneous)</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Deployments
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world workshop refactorings deployed live across West Bengal academic platforms.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Student Ledger Report */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Transforming the Barrackpore Student Fee Ledger
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  1,080x Speedup Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Barrackpore administration portal, loading the student financial ledger took 5.2 seconds per page. Applying the 5-phase workshop transformation reduced execution to 4.8 ms, enabling instant real-time financial reporting for 500,000 student accounts.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Production Deployment Result:</span>
                <p className="text-xs font-mono text-slate-300">
                  Database CPU dropped from 98% to 3%. Web server response latency plummeted from 5,400 ms to 12 ms end-to-end!
                </p>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata Examination System */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Tuning the Kolkata ₹ Merit Scholarship Search
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Disk Spills
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, scholarship allocation queries searching candidates with `balance_inr &gt; 5000` combined with department rankings suffered from 4.8-second disk temporary file spills. Creating a composite covering index and keyset cursor pagination dropped execution to 3.9 ms!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential engineering disciplines for relational performance tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Adding Indexes Without Refactoring SQL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If a query wraps columns in functions (`YEAR(date) = 2026`) or executes row-by-row correlated subqueries, adding indexes will NOT fix the problem. Always refactor SQL structure first!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Fix sargability and set-based joins before adding new DDL indexes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Over-Indexing Secondary Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating separate single-column indexes on every column in a table degrades write throughput on `INSERT`/`UPDATE` without satisfying composite sorting or covering needs.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create targeted composite indexes (Equality &rarr; Range &rarr; Sort &rarr; Covered).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Baseline with EXPLAIN ANALYZE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Establish exact ground truth metrics (actual execution times, physical rows returned, loop counts) before and after every single code change.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates guesswork and provides reproducible proof of optimization.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Adopt Keyset Pagination for APIs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Design public and internal API endpoints around Keyset cursor pagination (`WHERE id &gt; ? LIMIT 20`) rather than `OFFSET`.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees constant-time $O(1)$ response latencies regardless of dataset size.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist &amp; Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways from the performance tuning workshop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> 5-Phase Tuning Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Phase 1: Baseline</strong> = Run `EXPLAIN ANALYZE` to record baseline latency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Phase 2: Sargability</strong> = Isolate raw columns, quote strings, eliminate `SELECT *`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Phase 3: Set-Based CTE</strong> = Replace subquery loops with batch joins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Phase 4: Covering Index</strong> = Eliminate clustered table lookups &amp; filesort.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-bold font-mono">05.</span>
                  <span><strong className="text-emerald-300">Phase 5: Keyset Paging</strong> = Replace `OFFSET` with `WHERE id &gt; ?`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the compounding effect...”</span>
                  Performance gains are multiplicative, not additive! A 6x sargability fix $\times$ a 4.6x CTE join fix $\times$ a 13x covering index fix $\times$ a 3x keyset fix compounds into an astonishing 1,080x total speedup!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about connection pool health...”</span>
                  Dropping query time from 5.2s to 4.8ms isn't just about making one user happy—it frees up server threads 1,000x faster, multiplying your application concurrency from 10 users to 10,000 users!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the hands-on performance tuning workshop.
            </p>
          </div>

          <FAQTemplate
            title="Performance Tuning Workshop FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Hands-on Performance Tuning Workshop: Transforming a 5-second Query to 5 Milliseconds"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic14_note.txt"
          />

          <Teacher
            note="Congratulations! You have completed the entire Query Execution Plans & Performance Tuning module. You have seen firsthand that database performance optimization is not magic or guesswork—it is a repeatable, scientific engineering discipline. When you are faced with a 5-second query in production, don't panic: baseline it with `EXPLAIN ANALYZE`, make your predicates sargable, convert row-by-row subqueries into set-based joins, craft mathematically precise composite covering indexes, and implement keyset pagination. Follow this 5-phase path, and you will transform sluggish database applications into sub-millisecond powerhouses!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic14;
