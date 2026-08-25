import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Key sys Views: sys.statement_analysis, sys.schema_unused_indexes, sys.schema_table_lock_waits, sys.memory_global_by_current_bytes
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive 4-view sys Schema workbench: mastering the 4 cornerstone production views (statement_analysis, schema_unused_indexes, schema_table_lock_waits, memory_global_by_current_bytes), executing automated KILL remediation, and evaluating memory allocations in MySQL 8.0.
 */
const Topic8 = () => {
  // Interactive View Selection State
  const [selectedViewKey, setSelectedViewKey] = useState("view1_statement_analysis");

  const sysKeyViews = {
    view1_statement_analysis: {
      viewName: "1. sys.statement_analysis",
      title: "1. Workload Performance Ranking: sys.statement_analysis",
      badge: "Query Triage",
      badgeColor: "emerald",
      sqlSnippet: `-- 🚀 TOP 5 TIME-CONSUMING QUERY TEMPLATES:
SELECT 
  query, 
  exec_count, 
  total_latency, 
  avg_latency, 
  rows_examined_avg,
  tmp_disk_tables,
  sort_merge_passes
FROM sys.statement_analysis 
ORDER BY total_latency DESC 
LIMIT 5;

-- 💡 Analysis:
-- High rows_examined_avg vs rows_sent_avg = Missing Composite Index!
-- tmp_disk_tables > 0 = Spilling temporary tables to disk!`,
      explanation:
        "sys.statement_analysis provides an all-in-one query performance scorecard, ranking normalized query templates by cumulative runtime, average latency, unindexed row scans, and temporary disk table creation.",
      keyTakeaways: [
        "Ranks normalized queries by total cumulative execution time.",
        "Identifies unindexed queries with high rows_examined_avg.",
        "Exposes disk temporary table spills and sort merge passes."
      ]
    },
    view2_unused_indexes: {
      viewName: "2. sys.schema_unused_indexes",
      title: "2. Safe Index Pruning: sys.schema_unused_indexes",
      badge: "Index Reclamation",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧹 FIND INDEXES WITH ZERO READ LOOKUPS SINCE BOOT:
SELECT 
  object_schema, 
  object_name AS table_name, 
  index_name 
FROM sys.schema_unused_indexes 
WHERE object_schema = 'kolkata_retail';

-- ⚠️ SAFETY RULE BEFORE DROPPING:
-- Verify server uptime has crossed at least 90 days (entire business cycle)!
SHOW GLOBAL STATUS LIKE 'Uptime';

-- Action: Safely drop unused index to eliminate write amplification:
-- ALTER TABLE kolkata_retail.orders DROP INDEX idx_old_promo;`,
      explanation:
        "sys.schema_unused_indexes finds table indexes that have received zero read lookups since server boot. Dropping unused indexes eliminates write amplification on INSERT/UPDATE queries and reclaims buffer pool RAM.",
      keyTakeaways: [
        "Identifies indexes with 0 read I/O fetch operations.",
        "Primary keys and unique constraints are protected and excluded.",
        "Evaluate only after 30-90 days of continuous production uptime."
      ]
    },
    view3_lock_waits: {
      viewName: "3. sys.schema_table_lock_waits",
      title: "3. Lock Stall Resolution & Auto KILL: sys.schema_table_lock_waits",
      badge: "Lock Remediation",
      badgeColor: "rose",
      sqlSnippet: `-- 🔒 RESOLVE METADATA & TABLE LOCK JAMS LIVE:
SELECT 
  waiting_account, 
  waiting_query, 
  waiting_query_secs,
  blocking_account, 
  blocking_query, 
  sql_kill_blocking_query, 
  sql_kill_blocking_connection 
FROM sys.schema_table_lock_waits;

-- ⚡ INSTANT REMEDIATION:
-- Run the auto-generated string directly: KILL 142;`,
      explanation:
        "sys.schema_table_lock_waits identifies metadata and table locks stalling transactions (e.g. ALTER TABLE blocked by an open SELECT) and automatically generates ready-to-run KILL statements.",
      keyTakeaways: [
        "Identifies waiting transactions blocked by table/metadata locks.",
        "Auto-generates sql_kill_blocking_connection command strings.",
        "Enables instant termination of blocking sessions during outages."
      ]
    },
    view4_memory_allocation: {
      viewName: "4. sys.memory_global_by_current_bytes",
      title: "4. Global RAM Breakdown: sys.memory_global_by_current_bytes",
      badge: "OOM Prevention",
      badgeColor: "purple",
      sqlSnippet: `-- 💾 BREAKDOWN OF SERVER MEMORY BY SUBSYSTEM:
SELECT 
  event_name, 
  current_count, 
  current_alloc, 
  high_alloc 
FROM sys.memory_global_by_current_bytes 
LIMIT 10;

-- 🔍 KEY SUBSYSTEMS TO WATCH:
-- memory/innodb/buf_buf_pool        -> InnoDB Buffer Pool Allocation
-- memory/sql/THD::main_mem_root    -> Per-Connection Thread Memory
-- memory/innodb/adaptive hash index -> AHI Memory Overhead`,
      explanation:
        "sys.memory_global_by_current_bytes provides granular internal database memory attribution, displaying current and historical peak memory allocations across all internal MySQL subsystems to prevent Linux OOM crashes.",
      keyTakeaways: [
        "Displays current and peak (high_alloc) RAM allocations.",
        "Isolates connection memory leaks (memory/sql/THD) from buffer pools.",
        "Essential for preventing Linux kernel Out-Of-Memory kills."
      ]
    }
  };

  const currentView = sysKeyViews[selectedViewKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Key <span className="text-emerald-400">sys Views</span>: Queries, Indexes, <span className="text-cyan-400">Locks &amp; Memory</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Deep diving into the four cornerstone diagnostic views in MySQL 8.0: ranking heavy query workloads with <code>sys.statement_analysis</code>, reclaiming RAM with <code>sys.schema_unused_indexes</code>, resolving lock stalls with auto-built <code>KILL</code> commands in <code>sys.schema_table_lock_waits</code>, and auditing RAM allocations with <code>sys.memory_global_by_current_bytes</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Key Views Pillars ───────────────────────────── */}
        <section id="key-view-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Cornerstone Diagnostic Views
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The essential daily monitoring toolkit for high-performance MySQL database administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">View 1</span>
              <h3 className="font-bold text-white text-base">statement_analysis</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranks normalized queries by total latency, scan ratios, and temporary disk table creation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">View 2</span>
              <h3 className="font-bold text-white text-base">unused_indexes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Identifies zero-lookup indexes to eliminate write amplification and reclaim buffer pool RAM.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">View 3</span>
              <h3 className="font-bold text-purple-300 text-base">lock_waits &amp; KILL</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Exposes metadata lock stalls and auto-generates <code>KILL</code> commands for instant triage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">View 4</span>
              <h3 className="font-bold text-rose-300 text-base">memory_global</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Breaks down RAM consumption across all internal subsystems to prevent Linux kernel OOM kills.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive 4-View sys Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe statement analysis, unused index reclamation, auto KILL lock resolution, and global memory allocations.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(sysKeyViews).map((viewKey) => {
              const view = sysKeyViews[viewKey];
              const isSelected = selectedViewKey === viewKey;
              return (
                <button
                  key={viewKey}
                  onClick={() => setSelectedViewKey(viewKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {view.viewName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Cornerstone View
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentView.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentView.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentView.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentView.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentView.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentView.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentView.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Queries &amp; Output Analysis:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentView.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentView.keyTakeaways.map((item, i) => (
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
              Key sys views case studies in Barrackpore and Kolkata demonstrating 10-second DDL lock clearance and 38GB memory leak mitigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving DDL Lock Stall in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  10s Resolution
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an <code>ALTER TABLE products ADD COLUMN discount_tier INT;</code> was hanging, causing all POS cashier transactions to freeze. Mamata queried <code>sys.schema_table_lock_waits</code>, which identified an uncommitted reporting query blocking the schema change and generated <code>KILL 142</code>. Executing the kill command instantly unblocked the ALTER TABLE across ₹1.2 Crores in retail inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Preventing OOM Crash with memory_global in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  38GB Freed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, server RAM utilization spiked to 94% on a 128GB core banking node. Debangshu queried <code>sys.memory_global_by_current_bytes</code>, discovering that <code>memory/sql/THD::main_mem_root</code> consumed 42GB due to 2,000 idle unclosed connection sessions. Configuring connection timeouts immediately reclaimed 38GB of RAM, safeguarding ₹500 Crores in transaction ledgers from Linux OOM kills.
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
              Avoid premature index drops and overlooking thread memory leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Dropping Indexes Without Checking Uptime
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Evaluating <code>sys.schema_unused_indexes</code> after a recent server reboot can lead to dropping critical monthly financial reporting indexes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Only drop unused indexes after the server has maintained 90+ days of uptime.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Ignoring tmp_disk_tables Spills
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Queries with high <code>tmp_disk_tables</code> in <code>sys.statement_analysis</code> write temporary tables to physical disk, creating severe NVMe I/O bottlenecks.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Add composite indexes or increase tmp_table_size to eliminate disk temporary tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Auto KILL Commands in Outages
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                During high-stress metadata lock outages, copy the ready-to-run <code>sql_kill_blocking_connection</code> statement directly from <code>sys.schema_table_lock_waits</code>.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates manual processlist searching during production downtime.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Track Peak RAM (high_alloc)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Inspect <code>high_alloc</code> in <code>sys.memory_global_by_current_bytes</code> to identify subsystems that spiked memory during peak volume.
              </p>
              <div className="text-xs text-slate-400">
                Reveals historical memory watermarks for safe capacity planning.
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
            title="Topic 8: Key sys Views: sys.statement_analysis, sys.schema_unused_indexes, sys.schema_table_lock_waits, sys.memory_global_by_current_bytes"
            content={noteText}
          />

          <Teacher
            note="These four cornerstone sys views are your daily command dashboard in MySQL 8.0! Master them thoroughly: use sys.statement_analysis to triage your slowest queries and disk spills, query sys.schema_unused_indexes to prune dead indexes after 90 days of uptime, use sys.schema_table_lock_waits to execute instant KILL commands during DDL lock freezes, and inspect sys.memory_global_by_current_bytes to keep RAM stable and prevent Linux OOM crashes!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of the four key sys views, full scan ratios, unused index safety rules, auto-generated KILL commands, and memory allocations.
            </p>
          </div>

          <FAQTemplate
            title="Key sys Views Deep-Dive FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
