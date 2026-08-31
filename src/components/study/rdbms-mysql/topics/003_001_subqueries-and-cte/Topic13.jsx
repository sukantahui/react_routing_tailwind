import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Advanced Subquery and CTE Practical Lab Exercises (Module Capstone)
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive capstone lab synthesizing scalar/multi-row subqueries, correlated queries, semi/anti-joins, chained non-recursive CTE pipelines, recursive hierarchical graph traversal, and time-series generators.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedCapstoneScenario, setSelectedCapstoneScenario] = useState("deans_merit_scholarship_pipeline");

  const capstoneScenarios = {
    deans_merit_scholarship_pipeline: {
      title: "Lab 1: The Executive Dean's Merit Scholarship Pipeline",
      badge: "4-Stage Chained CTE",
      badgeColor: "emerald",
      sqlQuery: `-- Stage 1: Ingest active students with valid exam scores:
WITH ActiveStudents AS (
    SELECT student_id, first_name, last_name, dept_id, exam_score_pct 
    FROM students 
    WHERE status = 'ACTIVE' AND exam_score_pct IS NOT NULL
),
-- Stage 2: Calculate Department Average and Top Benchmarks:
DeptBenchmarks AS (
    SELECT 
        dept_id,
        ROUND(AVG(exam_score_pct), 2) AS dept_avg_score,
        MAX(exam_score_pct) AS dept_top_score
    FROM ActiveStudents
    GROUP BY dept_id
),
-- Stage 3: Window Ranking per Department:
RankedStudents AS (
    SELECT 
        a.student_id,
        CONCAT(a.first_name, ' ', a.last_name) AS student_name,
        a.dept_id,
        a.exam_score_pct,
        b.dept_avg_score,
        (a.exam_score_pct - b.dept_avg_score) AS variance_from_dept,
        DENSE_RANK() OVER (PARTITION BY a.dept_id ORDER BY a.exam_score_pct DESC) AS dept_rank
    FROM ActiveStudents a
    JOIN DeptBenchmarks b ON a.dept_id = b.dept_id
)
-- Stage 4: Assign Executive Scholarship Tiers:
SELECT 
    r.student_id,
    r.student_name,
    d.dept_name,
    r.exam_score_pct,
    r.dept_rank,
    r.variance_from_dept,
    CASE 
        WHEN r.dept_rank = 1 AND r.exam_score_pct >= 95.00 THEN '🥇 Dean Diamond Gold (₹50,000 INR)'
        WHEN r.dept_rank = 1 THEN '🥈 Dean Gold Scholar (₹30,000 INR)'
        WHEN r.dept_rank = 2 THEN '🥉 Department Silver (₹15,000 INR)'
        ELSE '🎖️ Merit Certificate'
    END AS scholarship_award
FROM RankedStudents r
JOIN departments d ON r.dept_id = d.dept_id
WHERE r.dept_rank <= 2
ORDER BY d.dept_name, r.dept_rank;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", rank: "Rank #1", metric: "+6.90% Above Dept", award: "🥇 Dean Diamond Gold (₹50k)" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", rank: "Rank #1", metric: "+3.25% Above Dept", award: "🥈 Dean Gold Scholar (₹30k)" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "91.00%", rank: "Rank #2", metric: "-0.25% At Dept", award: "🥉 Department Silver (₹15k)" },
      ],
      explanation:
        "A 4-stage modular pipeline: `ActiveStudents` extracts data, `DeptBenchmarks` computes department baselines, `RankedStudents` calculates ranks using `DENSE_RANK()`, and the final query assigns merit scholarship awards.",
    },
    prerequisite_dependency_audit: {
      title: "Lab 2: Universal Multi-Tier Prerequisite Dependency Audit",
      badge: "Recursive Tree Audit",
      badgeColor: "cyan",
      sqlQuery: `-- Resolving the complete upstream prerequisite tree for Advanced Database Systems (CS-401):
WITH RECURSIVE CoursePrerequisiteAudit AS (
    -- Anchor Member: Starting target course:
    SELECT 
        course_id,
        course_code,
        course_title,
        prerequisite_id,
        1 AS dependency_depth,
        CAST(course_title AS CHAR(500)) AS prerequisite_chain
    FROM courses
    WHERE course_code = 'CS-401'
    
    UNION ALL
    
    -- Recursive Member: Climb upward to parent prerequisite courses:
    SELECT 
        c.course_id,
        c.course_code,
        c.course_title,
        c.prerequisite_id,
        a.dependency_depth + 1,
        CONCAT(a.prerequisite_chain, ' ➔ ', c.course_title)
    FROM courses c
    JOIN CoursePrerequisiteAudit a ON c.course_id = a.prerequisite_id
)
SELECT 
    dependency_depth,
    course_code,
    course_title,
    prerequisite_chain
FROM CoursePrerequisiteAudit
ORDER BY dependency_depth DESC;`,
      resultRows: [
        { id: "CS-101", name: "Programming Fundamentals", dept: "Foundation", score: "Mandatory", rank: "Depth 3", metric: "Base Prerequisite", award: "Root Prerequisite" },
        { id: "CS-201", name: "Data Structures & Algorithms", dept: "Intermediate", score: "Mandatory", rank: "Depth 2", metric: "Mid-Tier Prerequisite", award: "Intermediate Prerequisite" },
        { id: "CS-301", name: "Relational Database Concepts", dept: "Advanced", score: "Mandatory", rank: "Depth 1", metric: "Direct Prerequisite", award: "Direct Prerequisite" },
      ],
      explanation:
        "Traverses upward through prerequisite links, resolving the entire academic course dependency chain (Programming Fundamentals ➔ Data Structures ➔ RDBMS ➔ Distributed DB) in a single recursive query.",
    },
    attendance_and_revenue_audit: {
      title: "Lab 3: Continuous 30-Day Revenue & Attendance Gap Audit",
      badge: "Date Grid + Anti-Join",
      badgeColor: "amber",
      sqlQuery: `-- Combining Recursive Date Generation + Zero-Fill + Attendance Gap Analysis:
WITH RECURSIVE SeptemberGrid AS (
    SELECT CAST('2026-09-01' AS DATE) AS cal_date
    UNION ALL
    SELECT DATE_ADD(cal_date, INTERVAL 1 DAY)
    FROM SeptemberGrid
    WHERE cal_date < '2026-09-10'
),
DailyRevenue AS (
    SELECT 
        DATE(payment_date) AS pay_date,
        SUM(amount_paid_inr) AS daily_collection_inr
    FROM fee_payments
    GROUP BY DATE(payment_date)
)
SELECT 
    g.cal_date,
    DAYNAME(g.cal_date) AS day_of_week,
    COALESCE(r.daily_collection_inr, 0.00) AS total_fee_collection_inr,
    (SELECT COUNT(*) FROM attendance_logs a WHERE a.log_date = g.cal_date) AS student_checkins_count,
    CASE 
        WHEN (SELECT COUNT(*) FROM attendance_logs a WHERE a.log_date = g.cal_date) = 0 THEN '⚠️ ATTENDANCE GAP (NO LOGS)'
        ELSE '✅ Normal Operation'
    END AS operational_audit_status
FROM SeptemberGrid g
LEFT JOIN DailyRevenue r ON g.cal_date = r.pay_date
ORDER BY g.cal_date ASC;`,
      resultRows: [
        { id: "2026-09-01", name: "Tuesday", dept: "Academy Global", score: "₹25,000.00", rank: "50 Check-ins", metric: "Normal Day", award: "✅ Normal Operation" },
        { id: "2026-09-02", name: "Wednesday", dept: "Academy Global", score: "₹0.00", rank: "0 Check-ins", metric: "Missing Attendance", award: "⚠️ ATTENDANCE GAP" },
        { id: "2026-09-03", name: "Thursday", dept: "Academy Global", score: "₹22,000.00", rank: "48 Check-ins", metric: "Normal Day", award: "✅ Normal Operation" },
      ],
      explanation:
        "Generates a full continuous calendar grid, zero-fills fee collection metrics, and evaluates correlated check-in counts to immediately identify operational logging gaps.",
    },
    correlated_settlement_and_purge: {
      title: "Lab 4: Defaulter Account Settlement & Orphan Record Purge",
      badge: "Correlated DML",
      badgeColor: "rose",
      sqlQuery: `-- Step 1: Correlated UPDATE to flag tuition fee defaulters:
WITH PaymentLedger AS (
    SELECT student_id, SUM(amount_paid_inr) AS total_paid
    FROM fee_payments
    GROUP BY student_id
)
UPDATE students s
LEFT JOIN PaymentLedger p ON s.student_id = p.student_id
SET s.financial_status = CASE 
    WHEN COALESCE(p.total_paid, 0.00) < 15000.00 THEN 'TUITION_DEFICIT'
    ELSE 'SETTLED'
END
WHERE s.status = 'ACTIVE';

-- Step 2: Safe Correlated DELETE to purge unreferenced orphan log entries:
DELETE FROM audit_logs a
WHERE NOT EXISTS (
    SELECT 1 FROM students s WHERE s.student_id = a.student_id
);`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "₹0.00 Paid", rank: "Deficit", metric: "Below ₹15k Threshold", award: "TUITION_DEFICIT" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "₹25,000.00 Paid", rank: "Settled", metric: "Exceeds Threshold", award: "SETTLED" },
        { id: "LOG-999", name: "Orphan Log Entry", dept: "System Logs", score: "Orphan Record", rank: "Purged", metric: "NOT EXISTS Match", award: "DELETED CLEANLY" },
      ],
      explanation:
        "Executes a multi-table `UPDATE ... JOIN` using a CTE to classify financial standing safely, followed by an atomic `DELETE ... WHERE NOT EXISTS` to purge orphan logs.",
    },
  };

  const navItems = [
    { id: "capstone-overview", label: "1. Capstone Overview" },
    { id: "refactor-benchmarks", label: "2. Refactoring Benchmarks" },
    { id: "svg-diagrams", label: "3. Architecture & Refactor SVGs" },
    { id: "interactive-sandbox", label: "4. Live Capstone Lab Sandbox" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_001</span>
            <span>•</span>
            <span>Topic 13 of 14 (Capstone)</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Comprehensive Practical Lab
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Advanced Subqueries & CTEs: Practical Lab
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Consolidate your mastery of modern relational SQL. Synthesize multi-stage chained CTE pipelines, recursive graph prerequisite resolvers, continuous time-series zero-filling, and correlated DML architectures.
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
        {/* SECTION 1: Capstone Overview */}
        <section id="capstone-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Module 003_001 Capstone Toolkit Overview
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A complete synthesis of all advanced subquery, correlated execution, and CTE concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. Subquery Foundations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scalar filters, semi-joins (<code className="text-emerald-300 font-mono">IN</code>), and anti-joins (<code className="text-emerald-300 font-mono">NOT EXISTS</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2. Correlated DML</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-table <code className="text-cyan-300 font-mono">UPDATE ... JOIN</code> and safe atomic orphan purges with <code className="text-cyan-300 font-mono">DELETE</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. Chained CTE Pipelines</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Linear multi-stage transformations with pre-aggregations and window function rankings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>4. Recursive Graph Traversal</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hierarchical trees, prerequisite dependency resolution, and dynamic calendar grids.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Refactoring Benchmarks */}
        <section id="refactor-benchmarks" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Code Refactoring Architecture & Benchmarks
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing legacy anti-patterns against modern high-performance CTE refactors.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Query Requirement</th>
                  <th className="py-3.5 px-4 text-rose-400">Legacy Anti-Pattern ($O(N^2)$)</th>
                  <th className="py-3.5 px-4 text-emerald-400">Modern High-Performance Refactor</th>
                  <th className="py-3.5 px-4 text-amber-400">Performance Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Top-N Students per Department</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Correlated COUNT(*) Subquery</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">CTE + DENSE_RANK() OVER (...)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">120x Faster ($O(N \log N)$)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Continuous Calendar Gap Audit</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Cross Join on Static Tally Table</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">WITH RECURSIVE Date Grid</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">0 Disk I/O (Pure RAM)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Student Course + Fee Report</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">3-Table JOIN (12x Row Duplication)</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">Chained Pre-Aggregated CTEs</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Prevents Cartesian Explosion</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Course Prerequisite Tree</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Stored Procedure While-Loops</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">WITH RECURSIVE Hierarchy CTE</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">1 Atomic Query Statement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Unified Capstone Pipeline & Refactoring
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the comprehensive analytical pipeline architecture.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Capstone Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Complete End-to-End Enterprise SQL Analytics Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Stage 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Raw Ingestion</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="110" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">students, payments</text>
                  </g>

                  {/* Stage 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Chained CTEs</text>
                    <rect x="240" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="320" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Pre-Agg &amp; Window Rank</text>
                  </g>

                  {/* Stage 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Recursive Graphs</text>
                    <rect x="450" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="530" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Prerequisites &amp; Dates</text>
                  </g>

                  {/* Stage 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="740" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Executive Output</text>
                    <rect x="660" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="740" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Scholarships &amp; Audits</text>
                  </g>

                  {/* Flow Arrows */}
                  <path d="M 200 75 L 230 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 75 L 440 75" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 620 75 L 650 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Legacy vs CTE Refactor */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Legacy Nested Loop Execution vs Modern Modular CTE Execution
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Legacy */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">❌ Legacy: Correlated Subqueries ($O(N^2)$)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">N separate table scans for each outer row</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">High CPU • Slow Disk I/O • Unmaintainable</text>
                  </g>

                  {/* Modern */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ Modern: CTE + Window Functions ($O(N \log N)$)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Single-pass hash join &amp; in-memory partition sort</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Sub-Millisecond • Self-Documenting Code</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Capstone Practical Lab Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Execute live simulations across all four capstone challenges.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(capstoneScenarios).map(([key, item]) => {
              const isActive = selectedCapstoneScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCapstoneScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Challenge" : "○ Run Challenge"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{capstoneScenarios[selectedCapstoneScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{capstoneScenarios[selectedCapstoneScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Capstone Execution Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Capstone SQL Implementation</span>
                <span className="text-emerald-400">Enterprise Standard</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {capstoneScenarios[selectedCapstoneScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Entity ID</th>
                    <th className="py-3 px-4 text-white">Student / Course / Date</th>
                    <th className="py-3 px-4 text-emerald-400">Department / Domain</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Value</th>
                    <th className="py-3 px-4 text-indigo-400">Rank / Depth</th>
                    <th className="py-3 px-4 text-amber-400">Variance / Metric</th>
                    <th className="py-3 px-4 text-emerald-400">Final Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {capstoneScenarios[selectedCapstoneScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.rank}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.metric}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.award}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world query refactoring at scale.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Refactoring Legacy Spaghetti Queries to High-Performance Chained CTEs
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a university Dean's Honors report that took 14.2 seconds to run due to 4 correlated subqueries in the SELECT list. Refactoring the query into a 4-stage chained CTE with window functions reduced query latency to 11ms (a 1,290x acceleration) while improving code readability from unreadable spaghetti to clean, modular SQL!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Refactored 11ms Chained CTE Execution:
WITH Base AS (SELECT student_id, first_name, dept_id, exam_score_pct FROM students WHERE status = 'ACTIVE'),
DeptStat AS (SELECT dept_id, AVG(exam_score_pct) AS avg_s FROM Base GROUP BY dept_id),
Ranked AS (SELECT b.*, d.avg_s, DENSE_RANK() OVER (PARTITION BY b.dept_id ORDER BY b.exam_score_pct DESC) AS rnk
          FROM Base b JOIN DeptStat d ON b.dept_id = d.dept_id)
SELECT student_id, first_name, exam_score_pct, rnk FROM Ranked WHERE rnk <= 2;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & The 5 Golden Rules
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental engineering laws for production query design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> 3 Deadly SQL Anti-Patterns
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Placing Correlated Subqueries inside <code className="text-rose-300 font-mono">SELECT</code> lists across large tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Joining multiple 1:N child tables directly without pre-aggregating in CTEs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Omitting <code className="text-rose-300 font-mono">CAST()</code> on expanding string columns in Recursive Anchor Members.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> The 5 Golden Rules of CTE Architecture
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <span>Adopt CTEs to structure queries linearly from top to bottom.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span>Pre-aggregate child metrics in CTEs before joining parent entities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span>Use <code className="text-emerald-300 font-mono">NOT EXISTS</code> for clean, NULL-safe anti-joins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">4.</span>
                  <span>Enforce rock-solid <code className="text-emerald-300 font-mono">WHERE</code> termination conditions in Recursive CTEs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">5.</span>
                  <span>Always verify execution plans using <code className="text-emerald-300 font-mono">EXPLAIN ANALYZE</code>.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for the Module 003_001 Capstone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Capstone Mastery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Construct 4-stage chained CTE pipelines with <code className="text-cyan-300 font-mono">WITH</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Traverse hierarchical trees and resolve prerequisite dependency chains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Generate dynamic calendar date grids to zero-fill reporting gaps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Execute safe correlated DML updates and atomic orphan purges.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the power of DENSE_RANK() in CTEs...”</span>
                  Window functions inside CTEs are the ultimate pattern for Top-N per department queries, eliminating slow correlated subquery nested loops!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about declarative purity...”</span>
                  With Recursive CTEs, you can generate date dimensions, traverse organizational charts, and compute loan schedules in pure SQL without stored procedure loops!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering advanced subquery patterns, correlated queries, semi/anti-joins, chained CTE pipelines, and recursive trees.
            </p>
          </div>

          <FAQTemplate
            title="Advanced Subqueries & CTEs Capstone FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Advanced Subquery and CTE Practical Lab Exercises"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Congratulations on completing Module 003_001: Subqueries, Correlated Queries & Common Table Expressions! You now possess the advanced relational SQL capabilities used by senior database architects. You know how to structure multi-stage pipelines with CTEs, prevent Cartesian explosions by pre-aggregating child tables, traverse hierarchical trees recursively, and generate dynamic time-series grids on the fly. Keep practicing these patterns, and carry these techniques into Module 003_002: Advanced SQL Patterns!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
