import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Phase 7: Query Profiling, Index Optimization, EXPLAIN Reports & Performance Benchmark
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 7: Query Profiling, Index Optimization, EXPLAIN Reports & Performance Benchmark.
 */
const Topic8 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. EXPLAIN Analysis",
      title: "1. Reading EXPLAIN & EXPLAIN ANALYZE Execution Trees",
      badge: "EXPLAIN ANALYZE",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔍 EVALUATING EXECUTION COSTS WITH EXPLAIN ANALYZE:
EXPLAIN ANALYZE
SELECT c.customer_id, c.full_name, COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date &gt;= '2026-01-01'
GROUP BY c.customer_id, c.full_name;

-- 📊 OUTPUT METRICS TO EVALUATE:
-- 1. Access Type (type): ALL (Bad - Table Scan) vs ref / range / const (Good).
-- 2. Rows examined vs rows returned.
-- 3. Actual time spent in nested loops and hash joins (in milliseconds).`,
      explanation: "EXPLAIN ANALYZE runs the query in MySQL 8.0 and outputs actual execution times, iterator costs, row counts, and loop iterations.",
      keyTakeaways: ["Compare estimated rows against actual rows examined to detect stale statistics.","Identify bottlenecks like full table scans (type=ALL) on large tables.","Verify join algorithms (Nested Loop Join vs Hash Join)."]
    },
    concept2: {
      conceptName: "2. Covering Indexes",
      title: "2. Covering Index Strategy (Using Index Only)",
      badge: "Covering Index",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ CREATING A COMPOSITE COVERING INDEX:
-- Query:
SELECT customer_id, order_date, total_amount 
FROM orders 
WHERE customer_id = 4500 AND order_date &gt;= '2026-01-01';

-- 🚀 Create composite index satisfying WHERE and SELECT columns:
CREATE INDEX idx_cust_date_amount ON orders (customer_id, order_date, total_amount);

-- 🔍 EXPLAIN Output Flag:
-- Extra: Using index (Covering Index - 0 Disk I/O Reads!)`,
      explanation: "A covering index contains all columns requested by the SELECT and WHERE clauses, allowing MySQL to answer the query entirely from RAM.",
      keyTakeaways: ["Look for 'Using index' in the Extra column of EXPLAIN.","Eliminates the secondary lookup step into the primary clustered B-Tree.","Accelerates high-frequency API endpoints by 10x to 50x."]
    },
    concept3: {
      conceptName: "3. Leftmost Prefix",
      title: "3. The Leftmost Prefix Rule for Multi-Column Indexes",
      badge: "Leftmost Prefix",
      badgeColor: "purple",
      sqlSnippet: `-- 📏 MULTI-COLUMN INDEX: (branch_id, status, created_at)
-- ✅ Index Used:
SELECT * FROM transactions WHERE branch_id = 5;
SELECT * FROM transactions WHERE branch_id = 5 AND status = 'COMPLETED';
SELECT * FROM transactions WHERE branch_id = 5 AND status = 'COMPLETED' AND created_at &gt;= '2026-01-01';

-- ❌ Index SKIPPED (Leftmost column missing!):
SELECT * FROM transactions WHERE status = 'COMPLETED';
SELECT * FROM transactions WHERE created_at &gt;= '2026-01-01';`,
      explanation: "B-Tree indexes can only filter on composite columns starting from the leftmost column sequentially without skipping intermediate fields.",
      keyTakeaways: ["Order composite index columns from highest equality filtering to range filters.","Place equality columns (branch_id, status) before range columns (created_at).","Avoid duplicate single-column indexes when a composite index already covers the prefix."]
    },
    concept4: {
      conceptName: "4. Before & After",
      title: "4. Benchmarking Performance: Before vs After Optimization",
      badge: "Performance Delta",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 CAPSTONE PERFORMANCE BENCHMARK MATRIX:
-- Query: Customer Annual Spend Analytics across 500,000 orders
-- -------------------------------------------------------------------
-- Metric              Before Optimization     After Optimization
-- -------------------------------------------------------------------
-- Execution Plan      type=ALL (Table Scan)   type=ref (idx_cust_date)
-- Rows Examined       500,000 rows            1,240 rows
-- Temporary Filesort  Using temporary; filesort Using index (Streamed)
-- Execution Time      3,850 ms (3.85s)        4.2 ms (0.0042s)
-- Speedup Factor      Baseline                916x Faster! 🚀`,
      explanation: "Documenting quantifiable performance speedups with row counts and millisecond latency deltas validates engineering rigor for capstone evaluation.",
      keyTakeaways: ["Measure query latency using BENCHMARK() or repeated profiling runs.","Record before and after EXPLAIN plans in your technical capstone report.","Demonstrate real optimization impact on 100,000+ row datasets."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.8: Capstone
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 11
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Phase 7: Query Profiling, Index Optimization, EXPLAIN Reports & Performance Benchmark
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Benchmarking query execution times, evaluating EXPLAIN cost trees, eliminating filesorts and full table scans with covering composite indexes.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core design foundations and production engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">EXPLAIN Costs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Analyzing actual row counts, iterator loops, and join access types.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Covering Index</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Serving queries entirely from memory index pages with zero disk I/O.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Leftmost Prefix</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Correct column sequencing matching equality and range query filters.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">900x Speedup</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Documented millisecond speedup deltas on 100k+ row production workloads.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore live SQL implementation scripts, schema patterns, and architectural takeaways.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
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
                  Phase Implementation
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
                SQL Runbook &amp; Production Snippet:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
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
              Practical production database case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – 900x Speedup on Barrackpore Festive Orders
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Tuning
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mamata tuned an unindexed order report scanning 300,000 records in Barrackpore. By adding a composite covering index (vendor_id, order_date, total_amount), query execution dropped from 4.2 seconds to 3.8 milliseconds, eliminating POS report timeouts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Abhronila & Debangshu – Eliminating Filesort in Kolkata Banking Ledger
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech Tuning
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Abhronila observed Using temporary; Using filesort on a high-volume branch balance query. By reordering the composite index to match the GROUP BY (account_id, created_at DESC), she enabled index streaming, reducing CPU load by 80%.
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
              Essential guardrails, common anti-patterns, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Wrapping Indexed Columns in Functions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing WHERE YEAR(order_date) = 2026 prevents MySQL from using indexes on order_date, forcing a full table scan.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Write sargable queries: WHERE order_date &gt;= '2026-01-01' AND order_date &lt; '2027-01-01'.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Over-Indexing Every Single Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating 20 single-column indexes on a table bloats disk storage and slows down write/insert throughput significantly.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create focused composite indexes targeted at high-frequency query workloads.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use EXPLAIN FORMAT=TREE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Inspect detailed query tree costs and iterator plans in MySQL 8.0+.
              </p>
              <div className="text-xs text-slate-400">
                Provides human-readable insight into query engine execution paths.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Inspect sys.schema_unused_indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Query the sys schema after benchmarking to detect and remove redundant or unutilized indexes.
              </p>
              <div className="text-xs text-slate-400">
                Keeps database memory footprint lean and maximizes write speed.
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
            title="Topic 8: Phase 7: Query Profiling, Index Optimization, EXPLAIN Reports & Performance Benchmark"
            content={noteText}
          />

          <Teacher
            note="Performance tuning is the badge of a master database engineer! In your capstone defense, show at least two queries with their 'before' and 'after' EXPLAIN plans. Demonstrate how you eliminated full table scans and temporary filesorts with strategic composite covering indexes, and present the latency improvement graph!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances and viva voce examination questions for this milestone.
            </p>
          </div>

          <FAQTemplate
            title="Phase 7: Query Profiling, Index Optimization, EXPLAIN Reports & Performance Benchmark FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
