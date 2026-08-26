import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Optimizer Hints: USE INDEX, FORCE INDEX, IGNORE INDEX, JOIN_ORDER, BATCH_KEY_ACCESS
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and optimization workbench on MySQL Optimizer Hints: legacy index directives (USE/FORCE/IGNORE INDEX), modern MySQL 8.0 comment hints (/*+ INDEX(), JOIN_ORDER(), BATCH_KEY_ACCESS(), SET_VAR() *\/), Batch Key Access (BKA), and query timeout guardrails.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedHintScenario, setSelectedHintScenario] = useState("force_index_override");

  const hintScenarios = {
    force_index_override: {
      title: "1. FORCE INDEX vs Table Scan: Overriding Stale Cost Statistics",
      badge: "FORCE INDEX Directive",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ SCENARIO: Optimizer erroneously chooses Table Scan due to stale cardinality:
-- Table has 200,000 students. After bulk imports, index stats are outdated.
-- Optimizer picks Table Scan (ALL) estimating 80 ms latency!
EXPLAIN SELECT student_id, name, city, gpa 
FROM student_records 
WHERE city = 'Barrackpore';

-- 📋 Un-hinted Plan:
-- type = 'ALL', key = NULL, rows = 200000, Extra = 'Using where' (78.0 ms) 🚨

-- ⚡ OPTIMIZER HINT (FORCE INDEX compelled secondary index range probe):
EXPLAIN SELECT student_id, name, city, gpa 
FROM student_records FORCE INDEX (idx_city)
WHERE city = 'Barrackpore';

-- 📋 Hinted Plan:
-- type = 'ref', key = 'idx_city', rows = 650, Extra = NULL ⚡
-- Latency drops from 78.0 ms &rarr; 0.45 ms! (170x faster!)`,
      resultRows: [
        {
          variant: "Default CBO (Stale Stats)",
          accessType: "ALL (Table Scan)",
          keyUsed: "NULL (Ignored)",
          rowsExamined: "200,000 rows",
          costCalculation: "Flawed Table Scan Estimate",
          latency: "78.00 ms",
          status: "Stale Stats Flaw ❌"
        },
        {
          variant: "FORCE INDEX (idx_city)",
          accessType: "ref (Index Seek)",
          keyUsed: "idx_city",
          rowsExamined: "650 rows",
          costCalculation: "Forced B+Tree Traversal",
          latency: "0.45 ms ⚡",
          status: "170x Faster Seek ✅"
        }
      ],
      explanation:
        "When table statistics in `information_schema` are stale following bulk data ingestion, the Cost-Based Optimizer (CBO) may miscalculate index seek costs and pick a full table scan. `FORCE INDEX` overrides the cost formula, compelling MySQL to use the index."
    },
    join_order_pinning: {
      title: "2. Modern JOIN_ORDER(): Enforcing the Optimal Driving Table",
      badge: "/*+ JOIN_ORDER() */",
      badgeColor: "cyan",
      sqlQuery: `-- ❌ SCENARIO: Optimizer selects large 500k-row table as driving table in join:
-- Joins: departments (10 rows), students (50,000 rows), enrollments (500,000 rows)
-- Optimizer picks 'enrollments' first, scanning 500,000 rows in nested loops!
SELECT * 
FROM students s
JOIN departments d ON s.department_id = d.department_id
JOIN enrollments e ON s.student_id = e.student_id
WHERE d.name = 'Computer Science';

-- ⚡ MYSQL 8.0+ COMMENT HINT (Pin optimal small driving table first):
SELECT /*+ JOIN_ORDER(d, s, e) */ 
    s.student_id, s.name, d.name AS dept_name, e.fee_paid
FROM students s
JOIN departments d ON s.department_id = d.department_id
JOIN enrollments e ON s.student_id = e.student_id
WHERE d.name = 'Computer Science';

-- 📋 Hinted Plan:
-- Join starts with 'departments' (1 row filtered), then probes 'students' (500 rows),
-- and finally probes 'enrollments' by PK! Latency drops from 340 ms -&gt; 1.8 ms!`,
      resultRows: [
        {
          variant: "Default CBO Join Order (e, s, d)",
          accessType: "ALL &rarr; ref &rarr; eq_ref",
          keyUsed: "idx_enrollment",
          rowsExamined: "500,000 Rows Driving Loop",
          costCalculation: "Suboptimal Driving Table",
          latency: "340.00 ms 🚨",
          status: "Heavy Loop Overhead ❌"
        },
        {
          variant: "/*+ JOIN_ORDER(d, s, e) */",
          accessType: "const &rarr; ref &rarr; ref",
          keyUsed: "PRIMARY, idx_dept, idx_student",
          rowsExamined: "510 Rows Total",
          costCalculation: "Pinpoint Small Driving Filter",
          latency: "1.80 ms ⚡",
          status: "180x Speedup ✅"
        }
      ],
      explanation:
        "The optimal join order starts with the smallest, most heavily filtered table (the driving table). `/*+ JOIN_ORDER(d, s, e) */` compels MySQL to start with the 1-row department filter, cascading indexed point lookups into students and enrollments."
    },
    batch_key_access_bka: {
      title: "3. Batch Key Access: /*+ BATCH_KEY_ACCESS(tbl) */ & Multi-Range Read",
      badge: "/*+ BATCH_KEY_ACCESS() */",
      badgeColor: "amber",
      sqlQuery: `-- ❌ SCENARIO: Nested Loop Join causes 25,000 random disk seeks:
-- Query joining students and exam marks over 25,000 candidate records:
SELECT s.name, s.city, m.subject_code, m.score 
FROM student_records s
JOIN exam_marks m ON s.student_id = m.student_id
WHERE s.city = 'Barrackpore';

-- ⚡ MYSQL 8.0+ BATCH KEY ACCESS (BKA) HINT:
-- Buffers outer keys in RAM, sorts them in physical clustered order,
-- and probes 'exam_marks' in sequential batch chunks!
SELECT /*+ BATCH_KEY_ACCESS(m) */ 
    s.name, s.city, m.subject_code, m.score 
FROM student_records s
JOIN exam_marks m ON s.student_id = m.student_id
WHERE s.city = 'Barrackpore';

-- 📋 Hinted Plan:
-- Extra = 'Using join buffer (Batched Key Access)'
-- Converts 25,000 random disk seeks into sequential multi-range reads (MRR)!
-- Latency drops from 68 ms -> 4.1 ms!`,
      resultRows: [
        {
          variant: "Standard Nested Loop Join",
          accessType: "ref (Random Seeks)",
          keyUsed: "idx_student_marks",
          rowsExamined: "25,000 Random I/O Lookups",
          costCalculation: "Scattered Disk Seeks",
          latency: "68.00 ms",
          status: "Random I/O Bottleneck ❌"
        },
        {
          variant: "/*+ BATCH_KEY_ACCESS(m) */",
          accessType: "ref (BKA + MRR Batched)",
          keyUsed: "idx_student_marks",
          rowsExamined: "25,000 Batched Sequential Reads",
          costCalculation: "Sorted Key Buffer Probing",
          latency: "4.10 ms ⚡",
          status: "16x Throughput Boost ✅"
        }
      ],
      explanation:
        "Batch Key Access (BKA) buffers join keys from the outer table into `join_buffer_size`, sorts them by physical storage order, and executes batched Multi-Range Reads (MRR) against the inner table, converting random I/O into sequential disk reads."
    },
    set_var_and_timeout: {
      title: "4. Single-Query Tuning: /*+ SET_VAR() */ & /*+ MAX_EXECUTION_TIME() */",
      badge: "/*+ SET_VAR & TIMEOUT */",
      badgeColor: "rose",
      sqlQuery: `-- ⚡ DYNAMIC SESSION MEMORY & CIRCUIT BREAKER TIMEOUT:
-- Query: Heavy analytical financial ledger report for institute management:
-- 1. Increases sort_buffer_size to 32MB for this SINGLE query only (prevents disk filesort)!
-- 2. Sets a hard 2,000 ms (2 sec) circuit-breaker timeout to prevent runaway queries!

SELECT /*+ 
    SET_VAR(sort_buffer_size = 32M) 
    SET_VAR(tmp_table_size = 64M) 
    MAX_EXECUTION_TIME(2000) 
*/ 
    s.student_id, 
    s.name, 
    s.city, 
    SUM(f.amount_paid_inr) AS total_fees, 
    AVG(f.amount_paid_inr) AS avg_fee
FROM student_records s
JOIN fee_payments f ON s.student_id = f.student_id
WHERE s.status = 'Active'
GROUP BY s.student_id, s.name, s.city
ORDER BY total_fees DESC;

-- ⚡ BENEFIT:
-- Memory increased surgically without bloating global connection pool RAM!
-- Query automatically terminates if database load spikes past 2 seconds!`,
      resultRows: [
        {
          variant: "Standard Settings (sort_buffer = 256K)",
          accessType: "Using temporary; Using filesort",
          keyUsed: "PRIMARY",
          rowsExamined: "100,000 Rows Processed",
          costCalculation: "Spills Sort to Disk File",
          latency: "52.00 ms",
          status: "Disk File Sort ⚠️"
        },
        {
          variant: "/*+ SET_VAR(sort_buffer_size = 32M) */",
          accessType: "Using temporary; Using filesort",
          keyUsed: "PRIMARY",
          rowsExamined: "100,000 Rows Processed",
          costCalculation: "Pure In-RAM Sort Buffer",
          latency: "5.20 ms ⚡",
          status: "10x In-RAM Sort ✅"
        }
      ],
      explanation:
        "`/*+ SET_VAR() */` allows surgical, temporary tuning of session buffer variables for a single statement without risking global server Out-Of-Memory (OOM) crashes. Combined with `MAX_EXECUTION_TIME()`, it creates enterprise-grade query performance and safety."
    }
  };

  const navItems = [
    { id: "hints-overview", label: "1. Optimizer Hints Architecture" },
    { id: "legacy-vs-comment", label: "2. Legacy vs MySQL 8.0 Comment Hints" },
    { id: "svg-architecture", label: "3. Visual Execution Pipelines" },
    { id: "interactive-workbench", label: "4. Live Optimizer Hints Workbench" },
    { id: "bka-and-mrr", label: "5. BKA & Multi-Range Read (MRR)" },
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
            <span>Topic 10 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Advanced CBO Control
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Optimizer Hints: USE INDEX, FORCE INDEX, JOIN_ORDER &amp; BATCH_KEY_ACCESS
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the advanced control mechanisms of the MySQL Cost-Based Optimizer (CBO): force optimal index access paths, enforce multi-table <code className="text-cyan-400 font-mono">JOIN_ORDER</code>, eliminate random I/O with <code className="text-amber-400 font-mono">BATCH_KEY_ACCESS</code>, and dynamically tune memory with <code className="text-emerald-400 font-mono">SET_VAR</code>.
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
        {/* SECTION 1: Optimizer Hints Architecture */}
        <section id="hints-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Role of Optimizer Hints in Database Tuning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why and when senior architects override the MySQL Cost-Based Optimizer (CBO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Purpose
              </span>
              <h3 className="font-bold text-white text-base">Plan Determinism</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The Cost-Based Optimizer calculates costs based on statistics. When table data changes rapidly or distributions are skewed, hints guarantee that MySQL executes the known optimal physical plan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Modern Syntax
              </span>
              <h3 className="font-bold text-white text-base">/*+ Comment Hints */</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                MySQL 8.0+ uses standard SQL comment blocks (`/*+ ... */`). They are scoped to query blocks, can be combined seamlessly, and are ignored safely by systems that do not support them.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Production Guardrails
              </span>
              <h3 className="font-bold text-white text-base">Surgical Interventions</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use hints to inject timeout circuits (<code className="text-amber-300 font-mono">MAX_EXECUTION_TIME</code>), enforce driving tables (<code className="text-amber-300 font-mono">JOIN_ORDER</code>), and allocate RAM (<code className="text-amber-300 font-mono">SET_VAR</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Legacy vs MySQL 8.0 Comment Hints */}
        <section id="legacy-vs-comment" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Legacy Index Hints vs Modern MySQL 8.0+ Comment Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing table-clause hints with modern block-level optimizer comments.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Tuning Goal</th>
                  <th className="py-3 px-4 text-amber-300">Legacy Table Syntax (MySQL 5.7)</th>
                  <th className="py-3 px-4 text-emerald-400">Modern Comment Syntax (MySQL 8.0+)</th>
                  <th className="py-3 px-4">Optimizer Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Force Index</td>
                  <td className="py-3 px-4 text-amber-300">tbl FORCE INDEX (idx_a)</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ INDEX(tbl idx_a) */</td>
                  <td className="py-3 px-4 text-slate-300">Compels B+Tree index seek over scan</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Ignore Index</td>
                  <td className="py-3 px-4 text-amber-300">tbl IGNORE INDEX (idx_old)</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ NO_INDEX(tbl idx_old) */</td>
                  <td className="py-3 px-4 text-slate-300">Excludes named index from plan</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Join Order</td>
                  <td className="py-3 px-4 text-amber-300">STRAIGHT_JOIN</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ JOIN_ORDER(t1, t2, t3) */</td>
                  <td className="py-3 px-4 text-slate-300">Pins exact table join sequence</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Batch Keys</td>
                  <td className="py-3 px-4 text-slate-500">Not Available</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ BATCH_KEY_ACCESS(tbl) */</td>
                  <td className="py-3 px-4 text-slate-300">Batches join keys into sequential MRR</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Single-Query RAM</td>
                  <td className="py-3 px-4 text-slate-500">SET SESSION sort_buffer...</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ SET_VAR(sort_buffer_size=16M) */</td>
                  <td className="py-3 px-4 text-slate-300">Dynamically tunes 1 statement RAM</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Query Timeout</td>
                  <td className="py-3 px-4 text-slate-500">max_execution_time session var</td>
                  <td className="py-3 px-4 text-emerald-300">/*+ MAX_EXECUTION_TIME(2000) */</td>
                  <td className="py-3 px-4 text-slate-300">Auto-kills query after 2,000 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Execution Pipelines */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Optimizer Decision Overrides
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing un-hinted CBO plan flaws with hint-overridden execution pipelines.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Un-hinted vs Hinted Execution */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 10.1: Default Suboptimal CBO Plan vs Optimizer Hint Overridden Plan
                </h3>
                <span className="text-xs text-slate-400 font-mono">CBO Decision Tree</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 380"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradHintGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradHintRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowHintGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowHintRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Left Box: Default Suboptimal Plan */}
                  <rect x="30" y="40" width="420" height="300" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    1. Default CBO Plan (Stale Statistics)
                  </text>
                  <text x="240" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Optimizer miscalculates index seek cost &gt; sequential scan
                  </text>

                  <rect x="50" y="115" width="380" height="60" rx="6" fill="#1e293b" stroke="#64748b" />
                  <text x="240" y="140" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Cost Formula: Cost(ALL) = 450 &lt; Cost(idx_city) = 980 ❌
                  </text>
                  <text x="240" y="160" fill="#fca5a5" fontSize="9" textAnchor="middle">
                    (Flawed calculation due to outdated cardinality statistics)
                  </text>

                  <rect x="50" y="190" width="380" height="45" rx="4" fill="#1e293b" stroke="#f43f5e" />
                  <text x="240" y="215" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Forces 200,000-Row Physical Full Table Scan! 🚨
                  </text>

                  <rect x="50" y="250" width="380" height="70" rx="6" fill="url(#gradHintRed)" />
                  <text x="240" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    type = ALL · Duration: 78.0 ms
                  </text>
                  <text x="240" y="295" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    High Buffer Pool Thrashing &amp; CPU Overhead
                  </text>

                  {/* Right Box: Hint Overridden Plan */}
                  <rect x="490" y="40" width="430" height="300" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="705" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    2. /*+ INDEX(students idx_city) */ Plan
                  </text>
                  <text x="705" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Architect directs optimizer to bypass flawed table scan cost
                  </text>

                  <rect x="520" y="115" width="370" height="60" rx="6" fill="#1e293b" stroke="#047857" />
                  <text x="705" y="140" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Directive: Restrict Search Space to 'idx_city' ⚡
                  </text>
                  <text x="705" y="160" fill="#6ee7b7" fontSize="9" textAnchor="middle">
                    (Bypasses cost formula and executes B+Tree binary search)
                  </text>

                  <rect x="520" y="190" width="370" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                  <text x="705" y="215" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Examines EXACTLY 650 Matching Leaf Records! ⚡
                  </text>

                  <rect x="520" y="250" width="370" height="70" rx="6" fill="url(#gradHintGreen)" />
                  <text x="705" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    type = ref · Duration: 0.45 ms (170x Faster!)
                  </text>
                  <text x="705" y="295" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    Sub-millisecond latency · Zero Buffer Eviction
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Optimizer Hints Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Optimizer Hints Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between real-world scenarios to observe SQL syntax, EXPLAIN execution plans, and latency benchmarks.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(hintScenarios).map((key) => {
              const scenario = hintScenarios[key];
              const isSelected = selectedHintScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedHintScenario(key)}
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
                {hintScenarios[selectedHintScenario].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  hintScenarios[selectedHintScenario].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  hintScenarios[selectedHintScenario].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  hintScenarios[selectedHintScenario].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  hintScenarios[selectedHintScenario].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {hintScenarios[selectedHintScenario].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Statement &amp; EXPLAIN Plan Comparison:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {hintScenarios[selectedHintScenario].sqlQuery}
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
                      <th className="py-2.5 px-4">Variant</th>
                      <th className="py-2.5 px-4">Access Type</th>
                      <th className="py-2.5 px-4">Key Used</th>
                      <th className="py-2.5 px-4">Rows Examined</th>
                      <th className="py-2.5 px-4">CBO Cost Model</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {hintScenarios[selectedHintScenario].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.variant}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.accessType}</td>
                        <td className="py-3 px-4 text-amber-300">{row.keyUsed}</td>
                        <td className="py-3 px-4 text-slate-300">{row.rowsExamined}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{row.costCalculation}</td>
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
                {hintScenarios[selectedHintScenario].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: BKA and MRR */}
        <section id="bka-and-mrr" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Batch Key Access (BKA) &amp; Multi-Range Read (MRR) Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How BKA converts thousands of random secondary index disk seeks into fast sequential I/O.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">The Standard Nested Loop Join Penalty</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In standard Nested Loop Joins, for every row fetched from the outer table, MySQL executes an individual index lookup on the inner table. When the inner index is scattered, this triggers tens of thousands of random disk seeks on physical tablespace pages.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-rose-400 font-mono">
                10,000 Outer Rows &rarr; 10,000 Random Disk Seeks 🚨
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">The BKA + MRR Optimization Pipeline</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                With <code className="text-emerald-300 font-mono">/*+ BATCH_KEY_ACCESS(inner_table) */</code>, MySQL buffers outer keys into <code className="text-cyan-300 font-mono">join_buffer_size</code>, sorts them into physical page order, and reads the inner table pages sequentially.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
                Sorted Key Probes &rarr; Sequential Read-Ahead I/O (16x Faster!) ⚡
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Systems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world surgical optimizer hint interventions resolving high-urgency production incidents.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Mahima's Barrackpore Student Enrollment */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Mahima – Emergency FORCE INDEX on Post-Admission Data Ingestion
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  170x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Following a bulk import of 50,000 student admission records in Barrackpore, MySQL's index statistics became stale before the nightly auto-analyze cron ran. Queries on `city = 'Barrackpore'` defaulted to table scans, crashing the web server.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Surgical Optimizer Intervention:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Applied emergency FORCE INDEX hint while scheduling ANALYZE TABLE:
SELECT /*+ INDEX(student_records idx_city) */ 
    student_id, name, registration_no, gpa 
FROM student_records 
WHERE city = 'Barrackpore';

-- Followed by background maintenance:
ANALYZE TABLE student_records; -- Refreshed index cardinality stats!`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata Multi-Table Financial Join */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Pinning Driving Table in 5-Table ₹ Ledger Join
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Join Order Mastery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Kolkata corporate office, executive revenue reports joined 5 tables across branches, students, courses, fee tiers, and transaction payments. The optimizer picked the 1,000,000-row `transaction_payments` table as the driving table, causing 12-second report timeouts.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">JOIN_ORDER Optimization:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Enforce small 4-row branch filter as driving table:
SELECT /*+ JOIN_ORDER(b, c, s, t, p) */ 
    b.branch_name, c.course_name, SUM(p.amount_inr) AS total_revenue 
FROM branches b
JOIN courses c ON b.branch_id = c.branch_id
JOIN students s ON c.course_id = s.course_id
JOIN tuition_tiers t ON s.tier_id = t.tier_id
JOIN transaction_payments p ON s.student_id = p.student_id
WHERE b.branch_code = 'KOL-MAIN'
GROUP BY b.branch_name, c.course_name;

-- Result: Duration dropped from 12,400 ms &rarr; 14.5 ms! ⚡`}
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
              Avoid dangerous anti-patterns when using optimizer hints in production code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: The "Permanent Hint" Technical Debt
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Hardcoding index hints in application code bypasses optimizer cost calculations. As data grows from 1,000 to 1,000,000 rows, a forced hint can become 100x slower than the optimizer's updated plan.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Run ANALYZE TABLE first before adding hints; review hints quarterly.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Silent Failures on Invalid Hints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an index name or table alias in a hint is misspelled (e.g. `/*+ INDEX(s idx_misspelled) */`), MySQL silently ignores the hint and falls back to the default plan without throwing a runtime error.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always check SHOW WARNINGS and EXPLAIN to confirm hint adoption.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use MAX_EXECUTION_TIME as Circuit Breaker
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Add <code className="text-cyan-300 font-mono">/*+ MAX_EXECUTION_TIME(3000) */</code> to all user-facing search and analytics queries to prevent runaway queries from exhausting database thread pools.
              </p>
              <div className="text-xs text-slate-400">
                Safeguards database health against sudden denial-of-service spikes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Prefer MySQL 8.0 Comment Hints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use modern <code className="text-cyan-300 font-mono">/*+ ... */</code> comment hints instead of legacy `FORCE INDEX` keywords. Comment hints are cleaner, support fine-grained scopes, and are ignored harmlessly by other SQL dialects.
              </p>
              <div className="text-xs text-slate-400">
                Enhances cross-version compatibility and maintainability.
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
              Key takeaways for mastering optimizer hints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Optimizer Hints Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">/*+ INDEX() */</strong> = Forces specific B+Tree index access path.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">/*+ JOIN_ORDER() */</strong> = Pins optimal small driving table order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">/*+ BATCH_KEY_ACCESS() */</strong> = Converts random join seeks into sequential MRR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">/*+ SET_VAR() */</strong> = Dynamically tunes buffer memory for a single query.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe ANALYZE TABLE first...”</span>
                  Before adding `FORCE INDEX`, run `ANALYZE TABLE tbl_name`. In 80% of cases, refreshing index cardinality statistics solves the bad query plan immediately!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about table aliases in hints...”</span>
                  If your SQL statement defines a table alias (e.g. `FROM student_records s`), your optimizer hint MUST use the alias (`/*+ INDEX(s idx_city) */`), not the base table name!
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
              Comprehensive reference questions covering Optimizer Hints, BKA, MRR, and session buffer tuning.
            </p>
          </div>

          <FAQTemplate
            title="Optimizer Hints FAQs"
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
            title="Optimizer Hints: USE INDEX, FORCE INDEX, IGNORE INDEX, JOIN_ORDER, BATCH_KEY_ACCESS"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="The MySQL Cost-Based Optimizer is a remarkable piece of software, but it is not omniscient. When data distribution changes rapidly or statistics become stale, the optimizer can make flawed decisions that take down production servers. Optimizer hints are your surgical scalpels: use `/*+ INDEX() */` to force critical access paths, use `/*+ JOIN_ORDER() */` to keep heavy joins anchored on small driving tables, and use `/*+ SET_VAR() */` to give heavy analytical queries the RAM they need. But remember: with great power comes great responsibility—always verify hints with `EXPLAIN` and `SHOW WARNINGS`, and never use a hint when a simple `ANALYZE TABLE` or query refactoring can fix the problem cleanly!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
