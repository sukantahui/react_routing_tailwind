import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Query Refactoring: Eliminating SELECT *, Subquery Bottlenecks, and Inefficient OR Clauses
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and optimization workbench on MySQL Query Refactoring: eliminating SELECT * payloads, transforming correlated subqueries into set-based joins, splitting inefficient OR clauses into UNION ALL branches, and implementing Keyset cursor pagination.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedRefactorPattern, setSelectedRefactorPattern] = useState("select_star_elimination");

  const refactorScenarios = {
    select_star_elimination: {
      title: "1. Eliminating SELECT *: Narrow Projection & Covering Index Restoration",
      badge: "SELECT * Elimination",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ ANTI-PATTERN (SELECT * retrieves wide TEXT, JSON & notes columns):
-- Breaks covering index on (city, status) because 'notes' and 'dob' require base table reads!
SELECT * 
FROM student_records 
WHERE city = 'Barrackpore' AND status = 'Active' 
ORDER BY gpa DESC;

-- 📋 Bad EXPLAIN:
-- type = 'ref', key = 'idx_city_status', Extra = 'Using index condition; Using filesort'
-- 💥 DANGER: 500 Clustered Bookmark Seeks + Memory Sort Overflow to Disk (38.5 ms)!

-- ⚡ REFACTORED (Project ONLY required columns covered by index):
SELECT student_id, name, city, status, gpa 
FROM student_records 
WHERE city = 'Barrackpore' AND status = 'Active' 
ORDER BY gpa DESC;

-- 📋 Refactored EXPLAIN:
-- key = 'idx_student_cov' (city, status, gpa DESC, name)
-- Extra = 'Using index' ⚡ (Zero table reads, Zero filesort!)
-- Execution time drops from 38.5 ms &rarr; 0.32 ms (120x faster)!`,
      resultRows: [
        {
          variant: "SELECT * (Wide Payload)",
          extraFlag: "Using filesort; Bookmark Seeks",
          payloadSize: "2.4 KB per row (Wide)",
          diskSort: "Spills to Disk Temporary File 🚨",
          latency: "38.50 ms",
          status: "Memory & I/O Waste ❌"
        },
        {
          variant: "Explicit Projection (Covered)",
          extraFlag: "Using index ⚡",
          payloadSize: "48 Bytes per row (Compact)",
          diskSort: "0 Sorts (Pre-sorted B+Tree) ⚡",
          latency: "0.32 ms ⚡",
          status: "120x Speedup ✅"
        }
      ],
      explanation:
        "`SELECT *` fetches unneeded columns that break covering indexes and overflow `sort_buffer_size`, spilling sorts to disk. Explicitly projecting only needed columns keeps sorting in fast RAM and enables pure index-only execution."
    },
    correlated_subquery_refactor: {
      title: "2. Correlated Subquery in SELECT: Transforming Row-by-Row into Set-Based JOIN",
      badge: "Correlated Subquery Refactor",
      badgeColor: "cyan",
      sqlQuery: `-- ❌ ANTI-PATTERN (Correlated subquery in SELECT column list):
-- Executes row-by-row: 10,000 separate subquery executions on 'student_exams'!
SELECT 
    s.student_id, 
    s.name, 
    (SELECT COUNT(*) FROM student_exams e WHERE e.student_id = s.student_id) AS total_exams,
    (SELECT AVG(score) FROM student_exams e WHERE e.student_id = s.student_id) AS avg_score
FROM student_records s
WHERE s.city = 'Kolkata';

-- 📋 Bad EXPLAIN:
-- Outer query: 10,000 rows. Inner subqueries: 20,000 subquery executions! (210.0 ms) 🚨

-- ⚡ REFACTORED (Set-Based LEFT JOIN with Pre-Aggregated CTE / Derived Table):
SELECT 
    s.student_id, 
    s.name, 
    COALESCE(e.total_exams, 0) AS total_exams,
    COALESCE(e.avg_score, 0.0) AS avg_score
FROM student_records s
LEFT JOIN (
    SELECT student_id, COUNT(*) AS total_exams, AVG(score) AS avg_score 
    FROM student_exams 
    GROUP BY student_id
) e ON s.student_id = e.student_id
WHERE s.city = 'Kolkata';

-- 📋 Refactored EXPLAIN:
-- Executes a single batch hash/index join! Latency drops from 210 ms -&gt; 2.4 ms!`,
      resultRows: [
        {
          variant: "Correlated Subquery in SELECT",
          extraFlag: "Dependent Subquery (O(N) Loops)",
          payloadSize: "20,000 Subquery Iterations 🚨",
          diskSort: "High CPU Context Switching",
          latency: "210.00 ms",
          status: "Severe CPU Loop ❌"
        },
        {
          variant: "Set-Based LEFT JOIN Aggregate",
          extraFlag: "Hash Join / Index Probe ⚡",
          payloadSize: "1 Single Batch Scan",
          diskSort: "Zero Loop Overhead ⚡",
          latency: "2.40 ms ⚡",
          status: "85x Speedup ✅"
        }
      ],
      explanation:
        "Correlated subqueries in the `SELECT` list force the query engine into an $O(N)$ row-by-row iteration loop. Refactoring into a set-based `LEFT JOIN` with pre-aggregated grouping computes summaries in a single batch pass."
    },
    or_clause_union_all: {
      title: "3. Inefficient OR Across Columns: Splitting into UNION ALL Branches",
      badge: "OR Clause Refactoring",
      badgeColor: "amber",
      sqlQuery: `-- ❌ ANTI-PATTERN (OR condition across independently indexed columns):
-- Table has idx_city (city) and idx_dept (department_id)
-- MySQL struggles to merge disparate B+Trees and falls back to Full Table Scan (ALL)!
SELECT student_id, name, city, department_id, balance_fee 
FROM student_records 
WHERE city = 'Barrackpore' OR department_id = 4;

-- 📋 Bad EXPLAIN:
-- type = 'ALL' (or inefficient index_merge), rows = 100000 (85.0 ms) 🚨

-- ⚡ REFACTORED (Split into index-seeking UNION ALL branches):
-- Branch 1 uses idx_city; Branch 2 uses idx_dept (excluding overlap to prevent dupes):
SELECT student_id, name, city, department_id, balance_fee 
FROM student_records 
WHERE city = 'Barrackpore'
UNION ALL
SELECT student_id, name, city, department_id, balance_fee 
FROM student_records 
WHERE department_id = 4 AND (city != 'Barrackpore' OR city IS NULL);

-- 📋 Refactored EXPLAIN:
-- Both branches execute as instant 'ref' index seeks! Latency drops from 85 ms -> 0.85 ms!`,
      resultRows: [
        {
          variant: "WHERE city = 'Barrackpore' OR dept = 4",
          extraFlag: "Using where (Table Scan / index_merge)",
          payloadSize: "100,000 Rows Examined 🚨",
          diskSort: "Bitmap Index Merge / Table Scan",
          latency: "85.00 ms",
          status: "Table Scan Bottleneck ❌"
        },
        {
          variant: "UNION ALL Split Refactor",
          extraFlag: "type = ref (Both Branches) ⚡",
          payloadSize: "750 Rows Examined (Combined)",
          diskSort: "0 Sorts (UNION ALL Streams Directly)",
          latency: "0.85 ms ⚡",
          status: "100x Speedup ✅"
        }
      ],
      explanation:
        "Disjoint `OR` conditions across different columns often defeat single-index B+Tree searches. Splitting the query into `UNION ALL` allows each branch to use its dedicated index, streaming combined results in sub-millisecond time."
    },
    keyset_pagination_refactor: {
      title: "4. Deep Pagination: Transforming OFFSET into Keyset (Cursor) Pagination",
      badge: "Keyset Cursor Pagination",
      badgeColor: "rose",
      sqlQuery: `-- ❌ ANTI-PATTERN (OFFSET pagination on deep page):
-- Problem: Paginating to Page 5,000 on active student ledgers:
-- Reads and discards 100,000 rows from tablespace just to return 20!
SELECT student_id, name, balance_fee 
FROM student_records 
ORDER BY student_id ASC 
LIMIT 100000, 20; -- Takes 320 ms!

-- ⚡ REFACTORED (Keyset / Cursor Pagination using last seen ID):
-- Client tracks last_seen_student_id = 100000 from previous page:
SELECT student_id, name, balance_fee 
FROM student_records 
WHERE student_id > 100000 
ORDER BY student_id ASC 
LIMIT 20;

-- 📋 Refactored EXPLAIN:
-- type = 'range', key = 'PRIMARY', rows = 20, Extra = NULL
-- ⚡ Execution time: 0.05 ms constant time regardless of page depth (6,000x faster)!`,
      resultRows: [
        {
          variant: "OFFSET Pagination (LIMIT 100k, 20)",
          extraFlag: "Full Offset Scan (O(N) Cost)",
          payloadSize: "100,020 Rows Read and Discarded 🚨",
          diskSort: "High Disk & Memory Churn",
          latency: "320.00 ms",
          status: "Degrades on Deep Pages ❌"
        },
        {
          variant: "Keyset Pagination (WHERE id > 100k)",
          extraFlag: "type = range (O(1) Boundary Seek) ⚡",
          payloadSize: "Exactly 20 Rows Read",
          diskSort: "Zero Discarded Rows ⚡",
          latency: "0.05 ms ⚡",
          status: "Constant O(1) Time ✅"
        }
      ],
      explanation:
        "Keyset (cursor) pagination replaces `OFFSET` with a filter on the last retrieved key (`WHERE id > ? LIMIT 20`). This transforms deep pagination from $O(N)$ sequential scanning to an instantaneous $O(1)$ B+Tree range probe."
    }
  };

  const navItems = [
    { id: "refactor-principles", label: "1. Core Refactoring Principles" },
    { id: "anti-patterns-matrix", label: "2. Anti-Patterns & Refactor Matrix" },
    { id: "svg-architecture", label: "3. Visual Refactoring Diagrams" },
    { id: "interactive-workbench", label: "4. Live Refactoring Workbench" },
    { id: "keyset-pagination", label: "5. Keyset Cursor Pagination" },
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
            <span>Topic 9 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              SQL Architecture &amp; Refactoring
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Query Refactoring: Eliminating SELECT *, Subquery Bottlenecks, and Inefficient OR Clauses
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Transform inefficient SQL anti-patterns into high-throughput relational designs: eliminate <code className="text-rose-400 font-mono">SELECT *</code> payloads, replace row-by-row correlated subqueries with set-based joins, split disjoint <code className="text-amber-400 font-mono">OR</code> clauses into <code className="text-emerald-400 font-mono">UNION ALL</code> streams, and implement Keyset pagination.
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
        {/* SECTION 1: Core Refactoring Principles */}
        <section id="refactor-principles" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4 Golden Pillars of Query Refactoring
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fix structural query anti-patterns before adding expensive database indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white">Zero SELECT *</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explicit column lists prevent memory sort buffer overflows and restore covering index optimizations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white">Set-Based Thinking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replace row-by-row correlated subqueries in `SELECT` with batch `LEFT JOIN` aggregations or CTEs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white">UNION ALL Splits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Split complex multi-column `OR` filters into separate index-seeking `SELECT` branches combined via `UNION ALL`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white">Keyset Cursor Paging</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminate deep `OFFSET` scanning by filtering on the last-seen Primary Key boundary (<code>WHERE id &gt; ?</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Anti-Patterns & Refactor Matrix */}
        <section id="anti-patterns-matrix" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Query Anti-Patterns vs High-Performance Refactorings
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Direct comparisons of flawed code patterns and their production-grade replacements.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Problem Area</th>
                  <th className="py-3 px-4 text-rose-400">❌ Anti-Pattern (Slow)</th>
                  <th className="py-3 px-4 text-emerald-400">⚡ Production Refactor (Fast)</th>
                  <th className="py-3 px-4">Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Projection</td>
                  <td className="py-3 px-4 text-rose-300">SELECT * FROM students WHERE ...</td>
                  <td className="py-3 px-4 text-emerald-300">SELECT id, name, gpa FROM students WHERE ...</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Covering Index Enabled</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Correlated Subquery</td>
                  <td className="py-3 px-4 text-rose-300">SELECT s.name, (SELECT COUNT(*) FROM ...)</td>
                  <td className="py-3 px-4 text-emerald-300">LEFT JOIN (SELECT id, COUNT(*) FROM ... GROUP BY)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">O(N) Loops &rarr; 1 Batch Scan</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Disjoint OR</td>
                  <td className="py-3 px-4 text-rose-300">WHERE city = 'BKP' OR dept_id = 4</td>
                  <td className="py-3 px-4 text-emerald-300">SELECT ... WHERE city = 'BKP' UNION ALL SELECT ...</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Both Indexes Utilized</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Deep Pagination</td>
                  <td className="py-3 px-4 text-rose-300">ORDER BY id LIMIT 100000, 20</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE id &gt; 100000 ORDER BY id LIMIT 20</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">O(1) Constant Seek Time</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Deduplication</td>
                  <td className="py-3 px-4 text-rose-300">SELECT DISTINCT s.* FROM students s JOIN ...</td>
                  <td className="py-3 px-4 text-emerald-300">SELECT s.* FROM students s WHERE EXISTS (...)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Zero Temp Table Sorts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Refactoring Diagrams */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Pathways Before and After Refactoring
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing row-by-row iteration loops with batch set-based join pipelines.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Correlated Subquery vs Set-Based Join */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 9.1: Correlated Subquery Loop (O(N) Iterations) vs Batch Set-Based Join
                </h3>
                <span className="text-xs text-slate-400 font-mono">Execution Engine</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 380"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradRefGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradRefRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowRefGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowRefRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Left Box: Correlated Subquery Loop */}
                  <rect x="30" y="40" width="420" height="300" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ❌ Correlated Subquery in SELECT
                  </text>
                  <text x="240" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    SELECT name, (SELECT COUNT(*) FROM exams WHERE id=s.id)
                  </text>

                  <g transform="translate(60, 115)">
                    <rect x="0" y="0" width="100" height="60" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="50" y="25" fill="#e2e8f0" fontSize="10" textAnchor="middle">Outer Row 1</text>
                    <text x="50" y="45" fill="#f43f5e" fontSize="9" textAnchor="middle">&rarr; Subquery 1</text>

                    <rect x="130" y="0" width="100" height="60" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="180" y="25" fill="#e2e8f0" fontSize="10" textAnchor="middle">Outer Row 2</text>
                    <text x="180" y="45" fill="#f43f5e" fontSize="9" textAnchor="middle">&rarr; Subquery 2</text>

                    <rect x="260" y="0" width="100" height="60" rx="4" fill="#1e293b" stroke="#64748b" />
                    <text x="310" y="25" fill="#e2e8f0" fontSize="10" textAnchor="middle">Outer Row N</text>
                    <text x="310" y="45" fill="#f43f5e" fontSize="9" textAnchor="middle">&rarr; Subquery N</text>
                  </g>

                  <rect x="50" y="195" width="380" height="40" rx="4" fill="#1e293b" stroke="#f43f5e" />
                  <text x="240" y="220" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                    10,000 Separate Query Invocations on CPU! 🚨
                  </text>

                  <rect x="50" y="250" width="380" height="70" rx="6" fill="url(#gradRefRed)" />
                  <text x="240" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Latency: 210.0 ms · Severe CPU Thrashing
                  </text>
                  <text x="240" y="295" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    Nested Loop row-by-row context switching
                  </text>

                  {/* Right Box: Batch Set-Based Join */}
                  <rect x="490" y="40" width="430" height="300" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="705" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ⚡ Set-Based LEFT JOIN Aggregate
                  </text>
                  <text x="705" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    LEFT JOIN (SELECT student_id, COUNT(*) FROM exams GROUP BY id)
                  </text>

                  <g transform="translate(520, 115)">
                    <rect x="0" y="0" width="170" height="60" rx="6" fill="#1e293b" stroke="#047857" />
                    <text x="85" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Pre-aggregated Table</text>
                    <text x="85" y="45" fill="#6ee7b7" fontSize="9" textAnchor="middle">Single Group-By Scan</text>

                    <line x1="170" y1="30" x2="200" y2="30" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowRefGreen)" />

                    <rect x="200" y="0" width="170" height="60" rx="6" fill="#1e293b" stroke="#047857" />
                    <text x="285" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Hash / Index Join</text>
                    <text x="285" y="45" fill="#6ee7b7" fontSize="9" textAnchor="middle">1 Single Batch Pass ⚡</text>
                  </g>

                  <rect x="520" y="195" width="370" height="40" rx="4" fill="#1e293b" stroke="#10b981" />
                  <text x="705" y="220" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Zero Row-by-Row Subquery Overhead! ⚡
                  </text>

                  <rect x="520" y="250" width="370" height="70" rx="6" fill="url(#gradRefGreen)" />
                  <text x="705" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Latency: 2.4 ms (85x Faster!)
                  </text>
                  <text x="705" y="295" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    Single batch streaming pipeline in RAM
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Refactoring Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Query Refactoring Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between real-world architectural scenarios to inspect SQL code transformations and execution metrics.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(refactorScenarios).map((key) => {
              const scenario = refactorScenarios[key];
              const isSelected = selectedRefactorPattern === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRefactorPattern(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
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
                {refactorScenarios[selectedRefactorPattern].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  refactorScenarios[selectedRefactorPattern].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  refactorScenarios[selectedRefactorPattern].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  refactorScenarios[selectedRefactorPattern].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  refactorScenarios[selectedRefactorPattern].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {refactorScenarios[selectedRefactorPattern].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Transformation &amp; EXPLAIN Comparison:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {refactorScenarios[selectedRefactorPattern].sqlQuery}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Performance Benchmark:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Pattern Variant</th>
                      <th className="py-2.5 px-4">Execution Flags</th>
                      <th className="py-2.5 px-4">Rows / Payload</th>
                      <th className="py-2.5 px-4">Sorting Footprint</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {refactorScenarios[selectedRefactorPattern].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.variant}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.extraFlag}</td>
                        <td className="py-3 px-4 text-slate-300">{row.payloadSize}</td>
                        <td className="py-3 px-4 text-amber-300">{row.diskSort}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{row.latency}</td>
                        <td className="py-3 px-4 text-xs">{row.status}</td>
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
                {refactorScenarios[selectedRefactorPattern].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Keyset Cursor Pagination */}
        <section id="keyset-pagination" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Keyset (Cursor) Pagination Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why modern APIs avoid OFFSET and how to achieve constant-time $O(1)$ page traversal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">The Flaw of OFFSET Pagination</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you execute <code className="text-rose-300 font-mono">LIMIT 50000, 20</code>, MySQL must traverse 50,020 rows in the B+Tree and discard 50,000 rows. As users browse deeper into search results, response latency degrades linearly ($O(N)$).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-rose-400 font-mono">
                50,000 Offset Rows &rarr; 180 ms Latency &amp; Memory Churn 🚨
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">The Keyset Cursor Fix</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instead of asking for "Page 2,500", the client passes the last record ID seen: <code className="text-emerald-300 font-mono">WHERE student_id &gt; 50000 LIMIT 20</code>. MySQL performs an instant B+Tree binary search to key 50,000 and streams exactly 20 records.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
                Constant Time: Page 1 or Page 10,000 takes exactly 0.05 ms ⚡
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Platforms
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world query refactoring interventions eliminating server bottlenecks.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Student Report Card Platform */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Correlated Loop on 20,000 Student Report Cards
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  80x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At the Barrackpore academy, generating class report cards queried student attendance and exam averages using two correlated subqueries in the `SELECT` list across 20,000 students. The query took 4.5 seconds to complete.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Refactored Set-Based SQL:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Refactor into Common Table Expressions with single batch joins:
WITH AttendanceAgg AS (
    SELECT student_id, COUNT(*) AS present_days 
    FROM student_attendance WHERE status = 'Present' GROUP BY student_id
),
ExamAgg AS (
    SELECT student_id, AVG(score) AS avg_gpa 
    FROM student_exam_marks GROUP BY student_id
)
SELECT s.student_id, s.name, COALESCE(a.present_days, 0), COALESCE(e.avg_gpa, 0.0)
FROM students s
LEFT JOIN AttendanceAgg a ON s.student_id = a.student_id
LEFT JOIN ExamAgg e ON s.student_id = e.student_id;

-- Result: Execution dropped from 4,500 ms &rarr; 55 ms! ⚡`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata ₹ Billing Ledger */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Refactoring Disjoint OR Billing Invoices
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Table Scans
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Kolkata enterprise billing portal, outstanding invoice queries checked <code className="text-rose-400 font-mono">WHERE branch_code = 'KOL-01' OR payment_status = 'Pending'</code> across 500,000 transaction records, causing table scans and API timeouts.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">UNION ALL Refactoring:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Split into two dedicated index-seeking streams:
SELECT invoice_id, customer_name, total_inr, payment_status 
FROM branch_invoices 
WHERE branch_code = 'KOL-01'
UNION ALL
SELECT invoice_id, customer_name, total_inr, payment_status 
FROM branch_invoices 
WHERE payment_status = 'Pending' AND branch_code != 'KOL-01';

-- Result: Both branches perform instant 'ref' index seeks in 0.95 ms!`}
                </pre>
              </div>
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
              Avoid dangerous query anti-patterns that silently degrade production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: DISTINCT as a "Band-Aid" for Bad Joins
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code className="text-rose-300 font-mono">SELECT DISTINCT</code> to hide duplicate rows caused by improper 1-to-many joins forces MySQL into an expensive temporary table sort pass over all columns.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Fix: Use EXISTS or fix the JOIN cardinality instead of adding DISTINCT.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: NOT IN with Nullable Subqueries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an inner subquery returns even a single `NULL`, `NOT IN` evaluates to `UNKNOWN` for all rows, breaking query logic and forcing a full scan.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Fix: Always use NOT EXISTS or LEFT JOIN ... WHERE IS NULL.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Prefer UNION ALL over UNION
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `UNION` performs an internal temporary table deduplication pass. Use `UNION ALL` whenever results are naturally disjoint or when duplicate removal is unnecessary.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates sort buffer overhead and streams records directly to the client.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Filter in WHERE, Not in HAVING
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `WHERE` discards non-matching rows before aggregation (reducing memory load). `HAVING` filters rows only after the full grouping pass is completed.
              </p>
              <div className="text-xs text-slate-400">
                Keep non-aggregate column filters in the WHERE clause for optimal index usage.
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
              Key takeaways for query refactoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Refactoring Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">No SELECT *</strong> = Project explicit columns to keep sort operations in RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">No Subqueries in SELECT</strong> = Refactor into batch `LEFT JOIN` aggregations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Split OR into UNION ALL</strong> = Allow each branch to use its own index seek.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Keyset Pagination</strong> = Replace deep `OFFSET` with `WHERE id &gt; last_id`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe ORM query generation...”</span>
                  Popular ORMs (Hibernate, Prisma, SQLAlchemy) frequently generate lazy `SELECT *`, redundant `LEFT JOIN`s, and `DISTINCT` queries. Regularly audit generated SQL with EXPLAIN!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about set-based thinking...”</span>
                  SQL is a declarative, set-based language. Whenever you catch yourself writing a subquery that depends on an outer row (`WHERE e.id = s.id`), stop and rewrite it as a join!
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
              Comprehensive reference questions covering Query Refactoring, anti-patterns, and pagination strategies.
            </p>
          </div>

          <FAQTemplate
            title="Query Refactoring FAQs"
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
            title="Query Refactoring: Eliminating SELECT *, Subquery Bottlenecks, and Inefficient OR Clauses"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Before you ask a database administrator to add new indexes or buy more server RAM, always look at your SQL queries first. The majority of performance disasters in production are self-inflicted: lazy `SELECT *` queries pulling gigabytes of unused data, row-by-row correlated subqueries executing in tight loops, and deep `OFFSET` pagination that reads 100,000 rows to discard 99,980 of them. When you embrace set-based thinking, explicit column selection, and keyset pagination, you will turn multi-second database queries into lightning-fast sub-millisecond responses!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
