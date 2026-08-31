import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Filtering Grouped Data: HAVING Clause vs WHERE Clause
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive HAVING vs WHERE Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedFilterMode, setSelectedFilterMode] = useState("mode_active_centers"); // "mode_active_centers" | "mode_elite_batches" | "mode_vip_customers" | "mode_global_benchmark"

  const filterScenarios = {
    mode_active_centers: {
      title: "1. High-Volume Active Centers (WHERE + HAVING)",
      sqlQuery: `SELECT 
    centre_city,
    COUNT(*) AS active_students_count,
    SUM(fee_paid_inr) AS collected_revenue_inr,
    ROUND(AVG(marks_pct), 2) AS average_score_pct
FROM student_enrollments
WHERE enrollment_status = 'ACTIVE' AND is_fee_cleared = 1  -- Row-level filter BEFORE grouping
GROUP BY centre_city
HAVING COUNT(*) >= 50 AND SUM(fee_paid_inr) >= 250000       -- Group-level filter AFTER aggregation
ORDER BY collected_revenue_inr DESC;`,
      resultRows: [
        { group: "Kolkata Central", metric1: "120 Active Students", metric2: "₹6,60,000.00", status: "PASSED (Count >= 50 & Rev >= ₹2.5L)", badgeColor: "emerald" },
        { group: "Barrackpore Campus", metric1: "85 Active Students", metric2: "₹4,25,000.00", status: "PASSED (Count >= 50 & Rev >= ₹2.5L)", badgeColor: "emerald" },
        { group: "Jadavpur Tech Hub", metric1: "60 Active Students", metric2: "₹3,60,000.00", status: "PASSED (Count >= 50 & Rev >= ₹2.5L)", badgeColor: "cyan" },
        { group: "Ichapur Center", metric1: "42 Active Students", metric2: "₹1,89,000.00", status: "FILTERED OUT (Count < 50 & Rev < ₹2.5L)", badgeColor: "rose" },
      ],
      verdictText: "✓ TWO-TIER FILTERING EXECUTED",
      badgeColor: "emerald",
      explanation: "WHERE prunes dropped/unpaid student rows upfront using index seeking. GROUP BY partitions the survivors, and HAVING filters out small centers.",
    },
    mode_elite_batches: {
      title: "2. Academic Excellence Batches (AVG Marks Threshold)",
      sqlQuery: `SELECT 
    batch_name,
    COUNT(*) AS total_students,
    ROUND(AVG(marks_pct), 2) AS batch_mean_score,
    MIN(marks_pct) AS lowest_score_in_batch
FROM batch_evaluations
WHERE exam_type = 'FINAL_SEMESTER'
GROUP BY batch_name
HAVING AVG(marks_pct) >= 80.00 AND MIN(marks_pct) >= 60.00
ORDER BY batch_mean_score DESC;`,
      resultRows: [
        { group: "React Barrackpore Morning", metric1: "25 Students", metric2: "88.40% Mean", status: "PASSED (Avg >= 80% & Min >= 60%)", badgeColor: "emerald" },
        { group: "Java Kolkata Weekend", metric1: "30 Students", metric2: "82.10% Mean", status: "PASSED (Avg >= 80% & Min >= 60%)", badgeColor: "emerald" },
        { group: "DevOps Ichapur Evening", metric1: "20 Students", metric2: "74.50% Mean", status: "FILTERED OUT (Avg 74.5% < 80%)", badgeColor: "rose" },
      ],
      verdictText: "✓ AGGREGATE THRESHOLD APPLIED",
      badgeColor: "cyan",
      explanation: "HAVING filters whole batches based on their computed statistical mean (AVG >= 80%) and baseline performance floor (MIN >= 60%).",
    },
    mode_vip_customers: {
      title: "3. E-Commerce VIP High-Spender Accounts",
      sqlQuery: `SELECT 
    customer_id,
    customer_name,
    COUNT(order_id) AS orders_placed_2026,
    SUM(order_total_inr) AS annual_spend_inr
FROM customer_orders
WHERE YEAR(order_date) = 2026 AND payment_status = 'COMPLETED'
GROUP BY customer_id, customer_name
HAVING COUNT(order_id) >= 5 AND SUM(order_total_inr) >= 50000
ORDER BY annual_spend_inr DESC;`,
      resultRows: [
        { group: "Mamata Hui (CUST-101)", metric1: "8 Orders in 2026", metric2: "₹72,500.00 Spent", status: "QUALIFIED VIP (Orders >= 5 & Spend >= ₹50k)", badgeColor: "indigo" },
        { group: "Susmita Sen (CUST-102)", metric1: "6 Orders in 2026", metric2: "₹54,000.00 Spent", status: "QUALIFIED VIP (Orders >= 5 & Spend >= ₹50k)", badgeColor: "indigo" },
        { group: "Debangshu Roy (CUST-103)", metric1: "3 Orders in 2026", metric2: "₹38,000.00 Spent", status: "FILTERED OUT (Orders 3 < 5)", badgeColor: "amber" },
      ],
      verdictText: "✓ VIP TIERS FILTERED",
      badgeColor: "indigo",
      explanation: "Row-level WHERE prunes incomplete/older transactions. HAVING checks if customer lifetime order frequency and total monetary volume meet VIP thresholds.",
    },
    mode_global_benchmark: {
      title: "4. Global Table Benchmark (HAVING without GROUP BY)",
      sqlQuery: `-- Evaluates the entire academy roster as a single global group:
SELECT 
    COUNT(*) AS total_registered,
    ROUND(AVG(marks_pct), 2) AS institutional_mean
FROM student_evaluations
WHERE academic_year = 2026
HAVING AVG(marks_pct) >= 70.00;`,
      resultRows: [
        { group: "Whole Institutional Roster", metric1: "350 Total Candidates", metric2: "74.80% Global Mean", status: "BENCHMARK MET (Row Emitted)", badgeColor: "emerald" },
      ],
      verdictText: "✓ SINGLE ROW EMITTED",
      badgeColor: "amber",
      explanation: "Without GROUP BY, HAVING treats the entire table as 1 global group. If the global average >= 70%, 1 row is returned; otherwise 0 rows are returned.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Two-Tier Filtering Architecture" },
    { id: "comparison-matrix", label: "2. WHERE vs HAVING Comparison" },
    { id: "error-1111", label: "3. Error 1111 & Subquery Defense" },
    { id: "svg-diagram", label: "4. Two-Tier Pipeline SVG" },
    { id: "interactive-sandbox", label: "5. Interactive Sandbox" },
    { id: "case-studies", label: "6. Production Industry Case Studies" },
    { id: "pitfalls-checklist", label: "7. Senior Pitfalls & Best Practices" },
    { id: "faq-section", label: "8. Q&A / FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 12 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Query Filtering Optimization
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Filtering Grouped Data: HAVING vs WHERE Clause
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the two filtering layers in relational databases. Learn why{" "}
            <code className="text-emerald-300 font-mono font-bold">WHERE</code> prunes individual rows early using B-Tree indexes, while{" "}
            <code className="text-cyan-300 font-mono font-bold">HAVING</code> filters aggregated group metrics (and why mixing them up destroys performance).
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
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Core Theory */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Two-Tier Filtering Architecture: Row-Level vs Group-Level
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Relational query engines execute filtering in two distinct operational phases with differing access to indexes and aggregates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  WHERE Clause
                </span>
                <h3 className="text-lg font-semibold text-white">Row-Level Pruning (Stage 2)</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Operates on individual records before grouping begins. Highly efficient because it utilizes B-Tree indexes to discard non-matching rows early.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Filters rows before GROUP BY:</span></div>
                <div><span className="text-emerald-400">WHERE</span> status = <span className="text-cyan-400">'CONFIRMED'</span> <span className="text-emerald-400">AND</span> fee &gt; 0;</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  HAVING Clause
                </span>
                <h3 className="text-lg font-semibold text-white">Group-Level Filtering (Stage 4)</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Operates on grouped summary rows after aggregation is computed. Permitted to evaluate aggregate functions (<code className="text-cyan-300">COUNT</code>, <code className="text-cyan-300">SUM</code>, <code className="text-cyan-300">AVG</code>).
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Filters aggregated groups:</span></div>
                <div><span className="text-cyan-400">HAVING COUNT</span>(*) &gt;= 50 <span className="text-cyan-400">AND AVG</span>(marks) &gt;= 75;</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Technical Comparison: WHERE vs HAVING
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing execution stage, granularity, index support, and aggregate compatibility.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Feature</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">WHERE Clause</th>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">HAVING Clause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Execution Timing</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Stage 2 (Before GROUP BY)</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">Stage 4 (After GROUP BY & Aggregations)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Data Granularity</td>
                  <td className="py-3 px-4 text-slate-300">Individual Raw Rows (Tuples)</td>
                  <td className="py-3 px-4 text-slate-300">Aggregated Group Buckets</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Accepts Aggregate Functions?</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO (Error 1111: Invalid use of group function)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES (COUNT, SUM, AVG, MIN, MAX)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Index Acceleration</td>
                  <td className="py-3 px-4 text-emerald-400">Utilizes B-Tree indexes directly</td>
                  <td className="py-3 px-4 text-amber-400">Evaluates in memory on computed group results</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Column Aliases in SELECT</td>
                  <td className="py-3 px-4 text-rose-400">Cannot reference aliases (runs before SELECT)</td>
                  <td className="py-3 px-4 text-emerald-400">Can reference SELECT aliases in MySQL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Error 1111 & Subquery Solution */}
        <section id="error-1111" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. The Error 1111 Dilemma & Subquery Solutions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why aggregate functions in WHERE cause fatal syntax errors, and how to filter individual rows against global averages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌ Error 1111: Invalid use of group function</span>
              </div>
              <p className="text-xs text-slate-300">
                Attempting to write an aggregate in WHERE fails because row evaluation occurs before the table-wide average exists.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-rose-900/30 font-mono text-xs text-rose-300 overflow-x-auto">
                <pre>{`-- FATAL ERROR 1111:
SELECT student_name, marks 
FROM students 
WHERE marks > AVG(marks);  -- Illegal in WHERE!`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓ Solution: Scalar Subquery in WHERE</span>
              </div>
              <p className="text-xs text-slate-300">
                A scalar subquery computes the global average first, allowing the outer WHERE clause to compare each individual row.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/30 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`-- VALID & PRODUCTION OPTIMIZED:
SELECT student_name, marks 
FROM students 
WHERE marks > (SELECT AVG(marks) FROM students);`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SVG Two-Tier Filtering Architecture */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Two-Tier Query Filtering Pipeline Architecture SVG
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the sequential data flow from raw storage through the WHERE gate, GROUP BY partitioner, and HAVING gate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradFltCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradFltEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradFltIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowFlt" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Title */}
              <text x="450" y="34" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                TWO-TIER SQL FILTERING PIPELINE: WHERE (ROWS) ➔ HAVING (GROUPS)
              </text>

              {/* Tier 1: WHERE Filter Gate */}
              <g transform="translate(30, 65)">
                <rect width="240" height="280" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <rect x="0" y="0" width="240" height="32" rx="12" fill="url(#gradFltEmerald)" />
                <text x="120" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">1. WHERE Gate (Row Pruning)</text>

                <rect x="15" y="45" width="210" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="65" fill="#34d399" fontSize="10" fontWeight="bold">status = 'ACTIVE'</text>
                <text x="25" y="78" fill="#94a3b8" fontSize="9">Prunes dropped/cancelled rows</text>

                <rect x="15" y="95" width="210" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="115" fill="#34d399" fontSize="10" fontWeight="bold">YEAR(admission) = 2026</text>
                <text x="25" y="128" fill="#94a3b8" fontSize="9">Filters current intake year</text>

                <rect x="15" y="150" width="210" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
                <text x="25" y="175" fill="#a7f3d0" fontSize="11" fontWeight="bold">B-Tree Index Seeking</text>
                <text x="25" y="195" fill="#e2e8f0" fontSize="9.5">1,000 Total Table Rows</text>
                <text x="25" y="215" fill="#34d399" fontSize="11" fontWeight="extrabold">➔ 400 Active Rows Pass</text>

                <text x="120" y="255" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Evaluated Per Individual Row</text>
              </g>

              {/* Arrow 1 */}
              <path d="M 270 205 L 320 205" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="320,205 312,199 312,211" fill="#10b981" />

              {/* Tier 2: GROUP BY Partitioning */}
              <g transform="translate(320, 65)">
                <rect width="250" height="280" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <rect x="0" y="0" width="250" height="32" rx="12" fill="url(#gradFltCyan)" />
                <text x="125" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">2. GROUP BY & Aggregation</text>

                <rect x="15" y="45" width="220" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="65" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Group 1: Kolkata (160 Rows)</text>
                <text x="25" y="82" fill="#94a3b8" fontSize="9.5">SUM: ₹8,00,000 | AVG: 82%</text>

                <rect x="15" y="105" width="220" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="125" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Group 2: Barrackpore (140 Rows)</text>
                <text x="25" y="142" fill="#94a3b8" fontSize="9.5">SUM: ₹7,00,000 | AVG: 79%</text>

                <rect x="15" y="165" width="220" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="185" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Group 3: Ichapur (40 Rows)</text>
                <text x="25" y="202" fill="#94a3b8" fontSize="9.5">SUM: ₹1,80,000 | AVG: 71%</text>

                <text x="125" y="255" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Calculates Aggregate Totals</text>
              </g>

              {/* Arrow 2 */}
              <path d="M 570 205 L 620 205" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="620,205 612,199 612,211" fill="#06b6d4" />

              {/* Tier 3: HAVING Group Filter Gate */}
              <g transform="translate(620, 65)">
                <rect width="250" height="280" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" filter="url(#shadowFlt)" />
                <rect x="0" y="0" width="250" height="32" rx="12" fill="url(#gradFltIndigo)" />
                <text x="125" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">3. HAVING Gate (Group Filter)</text>

                <rect x="15" y="45" width="220" height="40" rx="6" fill="#1e293b" stroke="#6366f1" />
                <text x="25" y="65" fill="#a5b4fc" fontSize="10" fontWeight="bold">HAVING COUNT(*) &gt;= 50</text>
                <text x="25" y="78" fill="#c7d2fe" fontSize="9">AND SUM(fee) &gt;= ₹2,50,000</text>

                {/* Verdicts */}
                <rect x="15" y="95" width="220" height="36" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="25" y="118" fill="#a7f3d0" fontSize="10" fontWeight="bold">✓ Kolkata: PASSED (160 &gt;= 50)</text>

                <rect x="15" y="140" width="220" height="36" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="25" y="163" fill="#a7f3d0" fontSize="10" fontWeight="bold">✓ Barrackpore: PASSED (140 &gt;= 50)</text>

                <rect x="15" y="185" width="220" height="36" rx="6" fill="#881337" stroke="#f43f5e" />
                <text x="25" y="208" fill="#fecdd3" fontSize="10" fontWeight="bold">✗ Ichapur: DROPPED (40 &lt; 50)</text>

                <text x="125" y="255" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Emits 2 Final Summary Rows</text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 5: Interactive Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Interactive HAVING vs WHERE Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test two-tier filtering, observe group elimination, and examine row-level vs aggregate threshold evaluation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(filterScenarios).map((key) => {
                const item = filterScenarios[key];
                const isActive = selectedFilterMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFilterMode(key)}
                    className={clsx(
                      "p-3 rounded-xl text-left transition-all border text-xs sm:text-sm font-medium",
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="font-semibold">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Simulation View */}
            {(() => {
              const active = filterScenarios[selectedFilterMode];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{active.title}</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border",
                        active.badgeColor === "emerald" && "bg-emerald-950 text-emerald-300 border-emerald-700",
                        active.badgeColor === "cyan" && "bg-cyan-950 text-cyan-300 border-cyan-700",
                        active.badgeColor === "indigo" && "bg-indigo-950 text-indigo-300 border-indigo-700",
                        active.badgeColor === "amber" && "bg-amber-950 text-amber-300 border-amber-700"
                      )}
                    >
                      {active.verdictText}
                    </span>
                  </div>

                  {/* SQL Preview */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                    <pre>{active.sqlQuery}</pre>
                  </div>

                  {/* Dynamic Table Output */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Entity / Group Name</th>
                          <th className="py-2.5 px-4">Calculated Volume</th>
                          <th className="py-2.5 px-4 font-bold text-emerald-400">Total Revenue / Score</th>
                          <th className="py-2.5 px-4">HAVING Evaluation Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.group}</td>
                            <td className="py-2.5 px-4 text-cyan-300">{row.metric1}</td>
                            <td className="py-2.5 px-4 text-emerald-300 font-bold">{row.metric2}</td>
                            <td
                              className={clsx(
                                "py-2.5 px-4 font-sans text-xs font-bold",
                                row.badgeColor === "emerald" && "text-emerald-400",
                                row.badgeColor === "cyan" && "text-cyan-400",
                                row.badgeColor === "indigo" && "text-indigo-400",
                                row.badgeColor === "amber" && "text-amber-400",
                                row.badgeColor === "rose" && "text-rose-400"
                              )}
                            >
                              {row.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Architectural Note */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-cyan-400">Engineering Insight: </span>
                    {active.explanation}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations combining WHERE and HAVING clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">Major Center Financial Milestone Audit</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Filters active 2026 admissions and identifies center campuses generating over ₹3,00,000 in fee receipts.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    centre_city,
    COUNT(*) AS active_students,
    SUM(tuition_fee_inr) AS collected_revenue_inr
FROM admissions_master
WHERE status = 'ACTIVE' AND YEAR(admission_date) = 2026
GROUP BY centre_city
HAVING SUM(tuition_fee_inr) >= 300000;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">High-Volume Repeat Buyer Identification</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Finds verified customers who completed at least 5 transactions with an average spend greater than ₹4,000.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    customer_id,
    COUNT(order_id) AS total_orders,
    ROUND(AVG(order_amount_inr), 2) AS average_order_val_inr
FROM customer_orders
WHERE payment_status = 'SETTLED'
GROUP BY customer_id
HAVING COUNT(order_id) >= 5 AND AVG(order_amount_inr) > 4000;`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Ichapur Student Portal</span>
              </div>
              <h3 className="text-lg font-bold text-white">Batch Academic Distinction Recognition</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Identifies course batches where the average final score is at least 80% and zero students failed (&lt;40%).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    batch_name,
    COUNT(*) AS total_students,
    ROUND(AVG(score_pct), 2) AS mean_score,
    MIN(score_pct) AS lowest_score
FROM exam_ledger
GROUP BY batch_name
HAVING AVG(score_pct) >= 80.00 AND MIN(score_pct) >= 40.00;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Jadavpur Tech Center</span>
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Course Regional Excellence Program</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Finds learning hubs running at least 3 distinct technology streams with over 50 combined student enrollments.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    centre_city,
    COUNT(DISTINCT course_id) AS distinct_streams,
    COUNT(*) AS total_enrolled
FROM student_directory
WHERE registration_status = 'CONFIRMED'
GROUP BY centre_city
HAVING COUNT(DISTINCT course_id) >= 3 AND COUNT(*) >= 50;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Pitfalls & Best Practice Checklist */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid Error 1111, unindexed memory grouping bottlenecks, and redundant HAVING checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Filtering Row Columns in HAVING:</strong>{" "}
                    Writing <code className="text-rose-300">HAVING city = 'Kolkata'</code> disables index seeking and forces MySQL to group all table rows first. Write <code className="text-emerald-300">WHERE city = 'Kolkata'</code> instead.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Aggregate in WHERE Clause (Error 1111):</strong>{" "}
                    <code className="text-rose-300">WHERE COUNT(*) &gt; 5</code> is illegal because WHERE runs before grouping. Use <code className="text-emerald-300">HAVING COUNT(*) &gt; 5</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Redundant Predicates:</strong>{" "}
                    Writing <code className="text-rose-300">WHERE status = 'ACTIVE' GROUP BY city HAVING status = 'ACTIVE'</code> adds wasteful overhead; WHERE already filtered out all non-active rows.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Comparing rows to average directly in WHERE:</strong>{" "}
                    <code className="text-rose-300">WHERE score &gt; AVG(score)</code> fails; use a scalar subquery: <code className="text-emerald-300">WHERE score &gt; (SELECT AVG(score) FROM ...)</code>.
                  </div>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>✓ Production Best Practices Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Filter early with WHERE:</strong> Maximize index usage and minimize the volume of rows fed into the grouping engine.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Reserve HAVING for aggregate functions:</strong> Use HAVING exclusively for conditions on <code className="text-cyan-300">COUNT</code>, <code className="text-cyan-300">SUM</code>, <code className="text-cyan-300">AVG</code>, <code className="text-cyan-300">MIN</code>, <code className="text-cyan-300">MAX</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Combine WHERE and HAVING harmoniously:</strong> Prune inactive rows in WHERE, group the survivors, and filter aggregate thresholds in HAVING.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Leverage SELECT aliases in HAVING:</strong> Write clean, readable code in MySQL by filtering on computed metric aliases in HAVING.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your understanding of SQL HAVING vs WHERE, execution lifecycles, Error 1111 debugging, and indexing optimization.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 12: HAVING vs WHERE" />
          </div>
        </section>

        {/* SECTION 9: Teacher Note & Printable Text */}
        <section id="teacher-notes" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Teacher's Note & Raw Printable Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instructor summary by Sukanta Hui with printable raw text reference for classroom handouts and offline study.
            </p>
          </div>

          {/* Teacher Sukanta Hui Component */}
          <Teacher
            note={`Dear Students (Mamata, Susmita, Mahima, Abhronila, Debangshu),

Understanding the fundamental difference between WHERE and HAVING is what separates junior SQL coders from senior database architects.

Remember these core rules:
1. WHERE filters individual rows before grouping. It uses B-Tree indexes and cannot access aggregate functions (Error 1111).
2. HAVING filters grouped rows after aggregation. It is specifically designed to filter on COUNT(), SUM(), AVG(), MIN(), MAX().
3. Never put non-aggregate filters in HAVING if they can be placed in WHERE! Filtering early in WHERE cuts down memory usage and makes queries 10x faster.

Explore the interactive sandbox scenarios above and solve all 30 interview questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 12 – Filtering Grouped Data: HAVING Clause vs WHERE Clause (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic12;
