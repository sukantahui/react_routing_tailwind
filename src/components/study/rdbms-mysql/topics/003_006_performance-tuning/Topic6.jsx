import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Table Scan vs Index Scan vs Index Range Scan vs Const Lookup
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and comparison benchmark on MySQL data access methods: Full Table Scan (ALL), Full Index Scan (index), Index Range Scan (range), and Const / Unique Lookup (const / eq_ref).
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedAccessType, setSelectedAccessType] = useState("const_lookup");

  const accessTypeScenarios = {
    const_lookup: {
      title: "1. Const / Unique Lookup (`type = const`): O(1) Direct Memory / B+Tree Probe",
      badge: "type = const (Fastest)",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ CONST LOOKUP (type = const):
-- Exact match on Primary Key or Unique NOT NULL index:
EXPLAIN SELECT student_id, name, city, gpa, balance_fee 
FROM student_admissions 
WHERE student_id = 101;

-- 📋 EXPLAIN Output:
-- select_type = 'SIMPLE'
-- table = 'student_admissions'
-- type = 'const' ⚡
-- possible_keys = 'PRIMARY'
-- key = 'PRIMARY'
-- key_len = '4'
-- ref = 'const'
-- rows = 1
-- filtered = 100.00
-- Extra = NULL

-- ⚡ PERFORMANCE MECHANICS:
-- 1. Optimizer evaluates the single matching row during query planning!
-- 2. Requires only 1 direct B+Tree descent (3-4 page reads in memory).
-- 3. Execution time: ~0.04 ms. Instantaneous.`,
      resultRows: [
        {
          accessType: "const",
          indexUsed: "PRIMARY",
          rowsExamined: "1 row",
          pagesRead: "1 page (~16 KB)",
          ioType: "Single Buffer Pool Lookup",
          latency: "0.04 ms ⚡",
          status: "Instantaneous Optimal ✅"
        }
      ],
      explanation:
        "`type = const` is the gold standard of database performance. Because `student_id` is a unique Primary Key, the optimizer knows at parse time that at most one row can match. It reads the record directly and treats its values as constants for subsequent query operations."
    },
    index_range_scan: {
      title: "2. Index Range Scan (`type = range`): B+Tree Boundary Probe + Leaf Traversal",
      badge: "type = range (Balanced)",
      badgeColor: "cyan",
      sqlQuery: `-- 🔍 INDEX RANGE SCAN (type = range):
-- Range predicate on indexed column (balance_fee):
EXPLAIN SELECT student_id, name, city, balance_fee 
FROM student_admissions 
WHERE balance_fee BETWEEN 5000 AND 25000;

-- 📋 EXPLAIN Output:
-- select_type = 'SIMPLE'
-- table = 'student_admissions'
-- type = 'range' 🔍
-- possible_keys = 'idx_balance_fee'
-- key = 'idx_balance_fee'
-- key_len = '8'
-- ref = NULL
-- rows = 420
-- filtered = 100.00
-- Extra = 'Using index condition'

-- ⚡ PERFORMANCE MECHANICS:
-- 1. B+Tree root-to-leaf probe locates starting boundary (₹5,000).
-- 2. Follows doubly-linked leaf pointers linearly until upper bound (₹25,000).
-- 3. Avoids re-traversing the tree for each record.
-- 4. Execution time: ~0.45 ms for 420 matching records.`,
      resultRows: [
        {
          accessType: "range",
          indexUsed: "idx_balance_fee",
          rowsExamined: "420 rows",
          pagesRead: "8 pages (~128 KB)",
          ioType: "Contiguous Leaf Traversal",
          latency: "0.45 ms ⚡",
          status: "High Efficiency Range ✅"
        }
      ],
      explanation:
        "`type = range` occurs with operators like `BETWEEN`, `<`, `>`, `>=`, `IN (...)`, and `LIKE 'prefix%'`. MySQL navigates the B+Tree to the start of the range and then streams records along the ordered, doubly-linked leaf page sequence."
    },
    full_index_scan: {
      title: "3. Full Index Scan (`type = index`): Sequential Traversal of Compact Index Leaves",
      badge: "type = index (Index-Wide)",
      badgeColor: "amber",
      sqlQuery: `-- 📊 FULL INDEX SCAN (type = index):
-- Aggregating or ordering over an indexed column without WHERE filter:
EXPLAIN SELECT AVG(gpa), MAX(gpa) 
FROM student_admissions;

-- 📋 EXPLAIN Output:
-- select_type = 'SIMPLE'
-- table = 'student_admissions'
-- type = 'index' 📊
-- possible_keys = NULL
-- key = 'idx_gpa'
-- key_len = '4'
-- ref = NULL
-- rows = 50000
-- filtered = 100.00
-- Extra = 'Using index' ⚡ (Covering!)

-- ⚡ PERFORMANCE MECHANICS:
-- 1. Scans every single leaf node of the secondary index (50,000 keys).
-- 2. 10x-20x faster than Table Scan because index pages are narrow & compact!
-- 3. Zero base table lookups (Covering Index).
-- 4. Execution time: ~3.1 ms.`,
      resultRows: [
        {
          accessType: "index",
          indexUsed: "idx_gpa (Covering)",
          rowsExamined: "50,000 rows",
          pagesRead: "78 pages (~1.2 MB)",
          ioType: "Sequential Index Leaf Scan",
          latency: "3.10 ms ⏱️",
          status: "Fast Narrow Scan ✅"
        }
      ],
      explanation:
        "`type = index` scans the full B+Tree leaf chain. While it examines all rows (O(N)), index leaf pages only store indexed columns (+ Primary Key), resulting in drastically fewer pages read compared to scanning full table data."
    },
    full_table_scan: {
      title: "4. Full Table Scan (`type = ALL`): Sequential Scan of All 16KB Clustered Pages",
      badge: "type = ALL (Slowest)",
      badgeColor: "rose",
      sqlQuery: `-- 🚨 FULL TABLE SCAN (type = ALL):
-- Querying un-indexed column with non-sargable pattern:
EXPLAIN SELECT student_id, name, address, notes 
FROM student_admissions 
WHERE address LIKE '%Ichapur%';

-- 📋 EXPLAIN Output:
-- select_type = 'SIMPLE'
-- table = 'student_admissions'
-- type = 'ALL' 🚨
-- possible_keys = NULL
-- key = NULL
-- key_len = NULL
-- ref = NULL
-- rows = 50000
-- filtered = 11.11
-- Extra = 'Using where'

-- 💥 DANGER MECHANICS:
-- 1. Reads every single 16KB data page of the table from disk / Buffer Pool.
-- 2. For 50,000 rows with wide text/notes columns: ~1,500 pages (24 MB data).
-- 3. Heavy Buffer Pool pollution: flushes hot cached application pages!
-- 4. Execution time: ~48.2 ms (1,200x slower than const lookup!).`,
      resultRows: [
        {
          accessType: "ALL (Table Scan)",
          indexUsed: "NULL (None)",
          rowsExamined: "50,000 rows",
          pagesRead: "1,500 pages (~24 MB)",
          ioType: "Full Physical Tablespace Scan",
          latency: "48.20 ms 🚨",
          status: "Heavy I/O Bottleneck ❌"
        }
      ],
      explanation:
        "`type = ALL` is the slowest access path for medium and large tables. The storage engine reads every row sequentially from the clustered index tablespace. While acceptable on tiny lookup tables (< 100 rows), it creates severe CPU and disk I/O bottlenecks in production OLTP systems."
    }
  };

  const navItems = [
    { id: "access-hierarchy", label: "1. Access Hierarchy & Matrix" },
    { id: "deep-dive-types", label: "2. The 4 Access Methods Deep Dive" },
    { id: "svg-architecture", label: "3. B+Tree Traversal SVGs" },
    { id: "interactive-workbench", label: "4. Live Access Method Workbench" },
    { id: "tipping-point", label: "5. The 20% Optimizer Tipping Point" },
    { id: "case-studies", label: "6. Real-World Case Studies" },
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
            <span>Topic 6 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Access Path Engineering
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Table Scan vs Index Scan vs Index Range Scan vs Const Lookup
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master MySQL's data retrieval spectrum: understand physical B+Tree traversal mechanics, I/O cost profiles, time complexities, and optimizer decisions spanning from <code className="text-emerald-400 font-mono">const</code> lookups (O(1)) to full table scans (<code className="text-rose-400 font-mono">ALL</code>, O(N)).
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
        {/* SECTION 1: Access Hierarchy & Matrix */}
        <section id="access-hierarchy" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The MySQL Data Access Method Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The official execution engine access path ladder ranked by efficiency and hardware cost.
            </p>
          </div>

          {/* Access Ladder Visual */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-emerald-400 font-mono">const / system / eq_ref</h4>
                  <p className="text-xs text-slate-400">Exact Primary Key or Unique Index match · Single row fetched</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-xs font-mono font-bold">
                O(1) / O(log N) · ~0.04 ms
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-teal-300 font-mono">ref / ref_or_null</h4>
                  <p className="text-xs text-slate-400">Non-unique secondary index equality lookup · Contiguous leaf rows</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-700/50 text-xs font-mono font-bold">
                O(log N + M) · ~0.15 ms
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-cyan-300 font-mono">range</h4>
                  <p className="text-xs text-slate-400">B+Tree boundary probe + linked leaf scan (&lt;, &gt;, BETWEEN, IN)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 text-xs font-mono font-bold">
                O(log N + K) · ~0.45 ms
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-amber-300 font-mono">index (Full Index Scan)</h4>
                  <p className="text-xs text-slate-400">Scans entire index leaf chain · Narrow column width &amp; compact pages</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50 text-xs font-mono font-bold">
                O(N_index) · ~3.10 ms
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <h4 className="font-bold text-rose-400 font-mono">ALL (Full Table Scan)</h4>
                  <p className="text-xs text-slate-400">Sequential scan of every 16KB data page in the clustered table</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-700/50 text-xs font-mono font-bold">
                O(N_table) · ~48.20 ms 🚨
              </span>
            </div>
          </div>

          {/* Comparative Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Access Type</th>
                  <th className="py-3 px-4">Trigger Condition</th>
                  <th className="py-3 px-4">B+Tree Traversal</th>
                  <th className="py-3 px-4">Pages Read (50k rows)</th>
                  <th className="py-3 px-4">Buffer Pool Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">const</td>
                  <td className="py-3 px-4">`WHERE pk = 101`</td>
                  <td className="py-3 px-4">Root → Branch → Single Leaf Page</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">1 Page</td>
                  <td className="py-3 px-4 text-emerald-300 font-medium">Near Zero (RAM Hit)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">ref</td>
                  <td className="py-3 px-4">`WHERE city = 'Barrackpore'`</td>
                  <td className="py-3 px-4">Root → Leaf → Contiguous Keys</td>
                  <td className="py-3 px-4 font-mono text-teal-300">3 - 6 Pages</td>
                  <td className="py-3 px-4 text-teal-300 font-medium">Minimal Cache Pin</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">range</td>
                  <td className="py-3 px-4">`WHERE fee BETWEEN 10k AND 25k`</td>
                  <td className="py-3 px-4">Probe lower bound → Traverse linked leaves</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">8 - 25 Pages</td>
                  <td className="py-3 px-4 text-cyan-300 font-medium">Low to Moderate</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">index</td>
                  <td className="py-3 px-4">`SELECT AVG(gpa) FROM students`</td>
                  <td className="py-3 px-4">Full sequential scan of all index leaves</td>
                  <td className="py-3 px-4 font-mono text-amber-300">78 Pages</td>
                  <td className="py-3 px-4 text-amber-300 font-medium">Moderate (Index Only)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">ALL</td>
                  <td className="py-3 px-4">`WHERE unindexed_col LIKE '%x%'`</td>
                  <td className="py-3 px-4">None. Sequential scan of all table pages</td>
                  <td className="py-3 px-4 font-mono text-rose-400">1,500 Pages</td>
                  <td className="py-3 px-4 text-rose-400 font-medium">Severe Buffer Eviction 🚨</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: The 4 Access Methods Deep Dive */}
        <section id="deep-dive-types" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Deep Dive: Physical Mechanisms of the 4 Access Paths
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the InnoDB storage engine navigates physical disk pages for each access method.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-bold">
                  type = const / eq_ref
                </span>
                <h3 className="font-bold text-white text-base">Point / Unique Equality Lookup</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a query matches a unique identifier (Primary Key or Unique column), InnoDB traverses the B+Tree from the root page down through branch pages to exactly one leaf page. Because trees in production have depths of 3 to 4 levels, finding the record requires at most 3 to 4 memory reads.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                Formula: Lookups = Depth (Tree) &le; 4 Page Seeks &asymp; 0.04 ms
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-xs font-bold">
                  type = range
                </span>
                <h3 className="font-bold text-white text-base">B+Tree Range Traversal</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                InnoDB uses the lower bound to probe the tree once, arriving at the first leaf page containing matching keys. It then follows the horizontal doubly-linked list pointers (<code className="text-cyan-300 font-mono">prev_page</code> / <code className="text-cyan-300 font-mono">next_page</code>) to read adjacent leaf pages until the upper bound is reached.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-400">
                Formula: Cost = Root Probe + (Range Pages &times; Sequential Leaf I/O)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono text-xs font-bold">
                  type = index
                </span>
                <h3 className="font-bold text-white text-base">Full Index Scan (Narrow Scan)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                MySQL reads the entire secondary index from the first leaf page to the last leaf page. Although every record in the index is examined, a secondary index page contains only the indexed columns plus the Primary Key, making it 5x to 20x smaller in bytes than full clustered table rows.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-amber-400">
                Benefit: Index Size (1.2 MB) vs Clustered Table Size (24 MB)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-mono text-xs font-bold">
                  type = ALL
                </span>
                <h3 className="font-bold text-white text-base">Full Table Scan (Tablespace Scan)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The storage engine sequentially scans every single 16KB extent in the clustered index. Every column (including large `VARCHAR`, `TEXT`, and `JSON` fields) must be loaded into memory, causing heavy disk throughput and evicting frequently queried cache pages from the Buffer Pool.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-rose-400">
                Hazard: High CPU + Buffer Pool Churn + Row Lock Contention
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Physical B+Tree Navigation Pathways
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing physical page reads for Const Lookups, Range Scans, Index Scans, and Table Scans.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: B+Tree Access Modes */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 6.1: B+Tree Traversal Pathways (Const vs Range vs Index vs Table Scan)
                </h3>
                <span className="text-xs text-slate-400 font-mono">InnoDB Storage Engine</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 480"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e7490" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="gradRose" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                    </marker>
                    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#fbbf24" />
                    </marker>
                    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Title Bar */}
                  <text x="475" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
                    InnoDB B+Tree Access Paths: From Single-Seek to Full Physical Scan
                  </text>

                  {/* B+Tree Root Node */}
                  <rect x="360" y="60" width="230" height="50" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <text x="475" y="85" fill="#f1f5f9" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Root Page (16KB)
                  </text>
                  <text x="475" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Keys: [ 100 | 250 | 500 ]
                  </text>

                  {/* Branch Level */}
                  <rect x="130" y="150" width="180" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <text x="220" y="172" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Branch Page (1-100)</text>
                  <text x="220" y="186" fill="#64748b" fontSize="9" textAnchor="middle">[ 25 | 50 | 75 ]</text>

                  <rect x="385" y="150" width="180" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <text x="475" y="172" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Branch Page (101-250)</text>
                  <text x="475" y="186" fill="#64748b" fontSize="9" textAnchor="middle">[ 125 | 175 | 225 ]</text>

                  <rect x="640" y="150" width="180" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <text x="730" y="172" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Branch Page (251-500)</text>
                  <text x="730" y="186" fill="#64748b" fontSize="9" textAnchor="middle">[ 300 | 400 | 475 ]</text>

                  {/* Root to Branch Arrows */}
                  <line x1="410" y1="110" x2="230" y2="150" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="475" y1="110" x2="475" y2="150" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="540" y1="110" x2="720" y2="150" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Leaf Level Nodes (Doubly-linked) */}
                  <rect x="40" y="240" width="160" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="120" y="263" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 1 (1 - 50)</text>
                  <text x="120" y="280" fill="#64748b" fontSize="9" textAnchor="middle">Keys: 1, 10, 25, 50</text>

                  <rect x="230" y="240" width="160" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="310" y="263" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 2 (51 - 100)</text>
                  <text x="310" y="280" fill="#64748b" fontSize="9" textAnchor="middle">Keys: 60, 75, 90, 100</text>

                  <rect x="420" y="240" width="160" height="60" rx="6" fill="#0f172a" stroke="#047857" strokeWidth="2" />
                  <text x="500" y="263" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 3 (101 - 175)</text>
                  <text x="500" y="280" fill="#10b981" fontSize="9" textAnchor="middle">Key: 101 (Mamata) ⚡</text>

                  <rect x="610" y="240" width="160" height="60" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="690" y="263" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 4 (176 - 250)</text>
                  <text x="690" y="280" fill="#0ea5e9" fontSize="9" textAnchor="middle">Keys: 180, 200, 250</text>

                  <rect x="790" y="240" width="120" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="850" y="263" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 5 (251+)</text>
                  <text x="850" y="280" fill="#64748b" fontSize="9" textAnchor="middle">Keys: 300, 450...</text>

                  {/* Doubly linked pointers */}
                  <line x1="200" y1="270" x2="230" y2="270" stroke="#64748b" strokeWidth="2" />
                  <line x1="390" y1="270" x2="420" y2="270" stroke="#64748b" strokeWidth="2" />
                  <line x1="580" y1="270" x2="610" y2="270" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
                  <line x1="770" y1="270" x2="790" y2="270" stroke="#64748b" strokeWidth="2" />

                  {/* Access Path Visual Overlays */}
                  {/* Green: Const Lookup */}
                  <path d="M 475 110 L 475 150 L 500 240" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowGreen)" />
                  <text x="510" y="210" fill="#34d399" fontSize="11" fontWeight="bold">Path 1: const (id = 101)</text>

                  {/* Blue: Range Scan */}
                  <path d="M 540 110 L 730 150 L 690 240" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrowBlue)" />
                  <text x="735" y="215" fill="#38bdf8" fontSize="11" fontWeight="bold">Path 2: range (100 to 250)</text>

                  {/* Bottom Access Method Summaries */}
                  <g transform="translate(40, 330)">
                    <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#gradEmerald)" opacity="0.9" />
                    <text x="15" y="25" fill="#ffffff" fontSize="12" fontWeight="bold">1. const / eq_ref</text>
                    <text x="15" y="45" fill="#ecfdf5" fontSize="10">• 1 direct descent probe</text>
                    <text x="15" y="65" fill="#ecfdf5" fontSize="10">• Exactly 1 matching row</text>
                    <text x="15" y="85" fill="#ecfdf5" fontSize="10">• 1 page read (0.04 ms)</text>
                    <text x="15" y="105" fill="#a7f3d0" fontSize="10" fontWeight="bold">O(1) / O(log N) - Ideal</text>
                  </g>

                  <g transform="translate(260, 330)">
                    <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#gradCyan)" opacity="0.9" />
                    <text x="15" y="25" fill="#ffffff" fontSize="12" fontWeight="bold">2. range</text>
                    <text x="15" y="45" fill="#f0f9ff" fontSize="10">• Probe start &amp; scan leaves</text>
                    <text x="15" y="65" fill="#f0f9ff" fontSize="10">• Doubly-linked leaf step</text>
                    <text x="15" y="85" fill="#f0f9ff" fontSize="10">• 5-20 pages read (0.45 ms)</text>
                    <text x="15" y="105" fill="#bae6fd" fontSize="10" fontWeight="bold">O(log N + K) - Efficient</text>
                  </g>

                  <g transform="translate(480, 330)">
                    <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#gradAmber)" opacity="0.9" />
                    <text x="15" y="25" fill="#ffffff" fontSize="12" fontWeight="bold">3. index (Full Scan)</text>
                    <text x="15" y="45" fill="#fffbeb" fontSize="10">• All leaf pages scanned</text>
                    <text x="15" y="65" fill="#fffbeb" fontSize="10">• Narrow compact pages</text>
                    <text x="15" y="85" fill="#fffbeb" fontSize="10">• 78 pages read (3.1 ms)</text>
                    <text x="15" y="105" fill="#fde68a" fontSize="10" fontWeight="bold">O(N_index) - Narrow Scan</text>
                  </g>

                  <g transform="translate(700, 330)">
                    <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#gradRose)" opacity="0.9" />
                    <text x="15" y="25" fill="#ffffff" fontSize="12" fontWeight="bold">4. ALL (Table Scan)</text>
                    <text x="15" y="45" fill="#fff1f2" fontSize="10">• Scans all table data pages</text>
                    <text x="15" y="65" fill="#fff1f2" fontSize="10">• Reads wide text columns</text>
                    <text x="15" y="85" fill="#fff1f2" fontSize="10">• 1,500 pages read (48 ms)</text>
                    <text x="15" y="105" fill="#fecdd3" fontSize="10" fontWeight="bold">O(N_table) - I/O Heavy 🚨</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Random I/O vs Sequential I/O */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-300">
                  Figure 6.2: Random I/O Bookmark Lookups vs Sequential Tablespace Scans
                </h3>
                <span className="text-xs text-slate-400 font-mono">Storage Subsystem</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 900 320"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "650px" }}
                >
                  {/* Left Side: Secondary Index Bookmark Lookups */}
                  <rect x="40" y="40" width="380" height="250" rx="10" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="230" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Secondary Index Range Scan + Random Seeks
                  </text>
                  <text x="230" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Secondary Index (idx_city) → Clustered Primary Key Table
                  </text>

                  <rect x="60" y="110" width="140" height="60" rx="6" fill="#1e293b" stroke="#0284c7" />
                  <text x="130" y="135" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Secondary Leaves</text>
                  <text x="130" y="152" fill="#7dd3fc" fontSize="9" textAnchor="middle">Keys: Barrackpore (PK: 10, 45, 90)</text>

                  {/* Random Arrows */}
                  <line x1="200" y1="130" x2="260" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowRed)" />
                  <line x1="200" y1="145" x2="260" y2="180" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowRed)" />
                  <line x1="200" y1="160" x2="260" y2="230" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowRed)" />

                  <rect x="260" y="110" width="140" height="35" rx="4" fill="#1e293b" stroke="#475569" />
                  <text x="330" y="132" fill="#cbd5e1" fontSize="10" textAnchor="middle">Page 402 (Row 10)</text>

                  <rect x="260" y="165" width="140" height="35" rx="4" fill="#1e293b" stroke="#475569" />
                  <text x="330" y="187" fill="#cbd5e1" fontSize="10" textAnchor="middle">Page 890 (Row 45)</text>

                  <rect x="260" y="220" width="140" height="35" rx="4" fill="#1e293b" stroke="#475569" />
                  <text x="330" y="242" fill="#cbd5e1" fontSize="10" textAnchor="middle">Page 1210 (Row 90)</text>

                  <text x="230" y="275" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
                    💥 High Random Disk I/O Per Matching Row!
                  </text>

                  {/* Right Side: Full Sequential Table Scan */}
                  <rect x="480" y="40" width="380" height="250" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="670" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Full Table Scan (type = ALL)
                  </text>
                  <text x="670" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Linear Sequential Read of Consecutive 16KB Pages
                  </text>

                  <g transform="translate(510, 120)">
                    <rect x="0" y="0" width="60" height="90" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="30" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle">Page 1</text>

                    <line x1="60" y1="45" x2="85" y2="45" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowGreen)" />

                    <rect x="85" y="0" width="60" height="90" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="115" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle">Page 2</text>

                    <line x1="145" y1="45" x2="170" y2="45" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowGreen)" />

                    <rect x="170" y="0" width="60" height="90" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="200" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle">Page 3</text>

                    <line x1="230" y1="45" x2="255" y2="45" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowGreen)" />

                    <rect x="255" y="0" width="60" height="90" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="285" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle">Page N</text>
                  </g>

                  <text x="670" y="245" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ⚡ Fast Batch Sequential I/O (Pre-fetch &amp; Read-Ahead)
                  </text>
                  <text x="670" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    (Preferred when query matches &gt; 25% of table rows!)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Data Access Method Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between access methods to examine real SQL statements, EXPLAIN outputs, and performance metrics.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(accessTypeScenarios).map((key) => {
              const scenario = accessTypeScenarios[key];
              const isSelected = selectedAccessType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAccessType(key)}
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
                      scenario.badgeColor === "emerald" && "bg-emerald-400",
                      scenario.badgeColor === "cyan" && "bg-cyan-400",
                      scenario.badgeColor === "amber" && "bg-amber-400",
                      scenario.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{scenario.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Workbench Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {accessTypeScenarios[selectedAccessType].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  accessTypeScenarios[selectedAccessType].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  accessTypeScenarios[selectedAccessType].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  accessTypeScenarios[selectedAccessType].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  accessTypeScenarios[selectedAccessType].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {accessTypeScenarios[selectedAccessType].badge}
              </span>
            </div>

            {/* SQL Code Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Execution Script &amp; EXPLAIN Plan:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {accessTypeScenarios[selectedAccessType].sqlQuery}
              </pre>
            </div>

            {/* Live Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Physical Performance &amp; I/O Footprint:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Access Type</th>
                      <th className="py-2.5 px-4">Index Used</th>
                      <th className="py-2.5 px-4">Rows Examined</th>
                      <th className="py-2.5 px-4">Pages Read</th>
                      <th className="py-2.5 px-4">I/O Pattern</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {accessTypeScenarios[selectedAccessType].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white">{row.accessType}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.indexUsed}</td>
                        <td className="py-3 px-4 text-amber-300">{row.rowsExamined}</td>
                        <td className="py-3 px-4 text-slate-300">{row.pagesRead}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{row.ioType}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{row.latency}</td>
                        <td className="py-3 px-4 text-xs">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {accessTypeScenarios[selectedAccessType].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: The 20% Optimizer Tipping Point */}
        <section id="tipping-point" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. The 20% to 30% Optimizer Tipping Point
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why MySQL deliberately ignores indexes and switches from Range Scan to Full Table Scan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-amber-400 font-mono">The Secondary Index Trade-Off</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you execute <code className="text-cyan-300 font-mono">SELECT * FROM student_admissions WHERE city = 'Kolkata'</code>, MySQL performs a 2-step lookup for every matching row:
              </p>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside">
                <li><strong className="text-cyan-300">Secondary Leaf Probe:</strong> Reads the secondary index to find the matching Primary Key.</li>
                <li><strong className="text-rose-400">Clustered Table Seek (Bookmark Lookup):</strong> Performs a random I/O seek on the clustered index to fetch the remaining columns (`address`, `notes`, `dob`).</li>
              </ol>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                If Kolkata represents 40% of all students, performing 20,000 random disk seeks is significantly slower than reading all consecutive table pages sequentially!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-emerald-400 font-mono">How to Bypass the Tipping Point</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Senior database engineers use two proven architectural strategies to avoid unexpected table scans:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">1. Covering Indexes (Using index):</span>
                  Include all requested columns in the composite index (`city`, `name`, `fee`). Since no base table lookups are needed, MySQL happily uses the index for 100% of rows!
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">2. Multi-Range Read (MRR):</span>
                  MySQL 8.0 batches and sorts Primary Keys before reading table pages, converting random I/O into sequential reads.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Real-World Case Studies: Barrackpore &amp; Kolkata Educational Portals
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical production tuning scenarios optimizing student admission and fee ledger queries.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata's Student Admission Portal */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata's Portal – Upgrading ALL to const on Student Profiles
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  1,200x Latency Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Mamata's college admissions portal in Barrackpore, student profiles were queried by application registration code (`reg_code = 'BKP-2026-091'`). Because `reg_code` lacked a unique constraint, MySQL executed a <code className="text-rose-400 font-mono">type = ALL</code> scan over 100,000 applicant records (65 ms per profile view).
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Optimization Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Add Unique Constraint to enable const lookup:
ALTER TABLE student_applications ADD UNIQUE INDEX uq_reg_code (reg_code);

-- Result: EXPLAIN type transforms from ALL (65 ms) → const (0.04 ms)! ⚡`}
                </pre>
              </div>
            </div>

            {/* Case 2: Susmita & Mahima's Fee Ledger Reporting */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Susmita &amp; Mahima – Tuning Quarterly Tuition Fee Ranges (₹10,000 to ₹35,000)
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Range Scan Optimization
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At the Jadavpur institute, Susmita and Mahima generated fee collection summaries for students paying between ₹10,000 and ₹35,000. An initial index on `(due_date)` caused a Full Table Scan because `amount_paid` was filtered after fetching.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Composite Range Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Create Composite Covering Index for Range Filtering:
CREATE INDEX idx_fee_ledger ON fee_payments (amount_paid, payment_date, student_id);

-- Result: type = range with Extra = 'Using index' (Zero base table disk seeks)!`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Common Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous anti-patterns that unintentionally degrade lookups to table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Implicit Type Conversion on VARCHAR Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Querying a `VARCHAR` phone number column with an unquoted integer literal (`WHERE phone = 9830012345`) forces MySQL to execute `CAST(phone AS SIGNED)` on every row, turning an instant `const`/`ref` lookup into a slow `ALL` scan!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always quote strings: WHERE phone = '9830012345'
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Leading Wildcards (%text) in LIKE Predicates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using `LIKE '%Mitra'` prevents B+Tree root-to-leaf probing because the prefix key is unknown. The engine is forced to scan every record in the table.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Fix: Use trailing wildcards LIKE 'Mitra%' or MySQL FULLTEXT indexes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Target const, eq_ref, and ref for OLTP
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In user-facing transactional APIs, 95%+ of queries should resolve as `const`, `eq_ref`, or `ref`. Reserve `range` for paginated list views and `ALL` for background batch jobs.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees sub-millisecond API response times and prevents thread pool saturation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Guard Buffer Pool from Long Scans
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Large table scans load cold pages into the InnoDB Buffer Pool, evicting hot cache blocks. Use `innodb_old_blocks_time` to prevent short sequential scans from corrupting the young sublist.
              </p>
              <div className="text-xs text-slate-400">
                Ensures critical application data remains pinned in memory during reporting scans.
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
              Key takeaways for database access path optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Access Types Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">const</strong> = Primary Key / Unique exact match (1 row, O(1)).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">range</strong> = B+Tree probe + sequential leaf scan (&lt;, &gt;, BETWEEN).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">index</strong> = Full scan of compact index leaf pages (O(N_index)).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">ALL</strong> = Full table scan across all 16KB data pages (eliminate on large tables!).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the 20% rule...”</span>
                  If MySQL unexpectedly chooses `ALL` over an index range scan, check if your range criteria matches more than 20% to 30% of total table rows. Convert the query into a Covering Index to force index usage!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about B+Tree leaf traversal...”</span>
                  Remember that B+Tree leaf pages are physically ordered and doubly-linked. Once MySQL finds the first key in a range, reading adjacent keys is extremely fast streaming I/O!
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
              Comprehensive reference questions covering Table Scan, Full Index Scan, Index Range Scan, and Const Lookups.
            </p>
          </div>

          <FAQTemplate
            title="Data Access Paths FAQs"
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
            title="Table Scan vs Index Scan vs Index Range Scan vs Const Lookup"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="In database engineering, performance is defined by how few 16KB physical pages you touch to answer a query. `const` touches 1 page, `range` touches a compact cluster of leaf pages, while `ALL` forces the engine to read the entire tablespace into RAM. When designing production schemas for institutes in Barrackpore or Kolkata, always strive to elevate high-frequency API endpoints into `const`, `eq_ref`, or `range` lookups, and use covering composite indexes to avoid the 20% tipping point where MySQL falls back to full table scans!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
