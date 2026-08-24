import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Subqueries in SELECT, FROM (Derived Tables), and WHERE Clauses
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on clause-by-clause subquery placement, derived table aliasing, and condition pushdown.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedClause, setSelectedClause] = useState("select_projection_subquery");

  const clauseScenarios = {
    select_projection_subquery: {
      title: "1. Subquery in SELECT Projection (Scalar Calculated Attributes)",
      badge: "SELECT List (Scalar)",
      badgeColor: "emerald",
      sqlQuery: `-- Projecting dynamic course counts and total fee payments per student:
-- Each subquery in SELECT evaluates to a single scalar value per student row.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.dept_id,
    (
        SELECT COUNT(e.enrollment_id) 
        FROM enrollments e 
        WHERE e.student_id = s.student_id
    ) AS total_enrolled_courses,
    (
        SELECT COALESCE(SUM(p.amount_paid_inr), 0.00)
        FROM enrollments e2
        JOIN fee_payments p ON e2.enrollment_id = p.enrollment_id
        WHERE e2.student_id = s.student_id
    ) AS total_fees_paid_inr
FROM students s
ORDER BY total_enrolled_courses DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", clauseRole: "SELECT Projection", metric1: "3 Courses Active", metric2: "₹25,000.00 Paid", evalScope: "Per-Row Scalar", status: "Active Student" },
        { id: "STU-103", name: "Abhronila Saha", clauseRole: "SELECT Projection", metric1: "2 Courses Active", metric2: "₹22,000.00 Paid", evalScope: "Per-Row Scalar", status: "Active Student" },
      ],
      explanation:
        "Subqueries in the `SELECT` list must be scalar (1x1). They project dynamic aggregates per outer row without collapsing the outer query's row granularity.",
    },
    from_derived_table_subquery: {
      title: "2. Subquery in FROM Clause (Derived Virtual Table)",
      badge: "FROM Clause (NxM)",
      badgeColor: "cyan",
      sqlQuery: `-- Department Performance Analysis using a Derived Table in the FROM clause:
-- The inner subquery pre-aggregates student counts and average scores.
-- MANDATORY: The derived table MUST have an explicit alias (AS dt)!

SELECT 
    d.dept_name,
    dt.total_students,
    dt.avg_dept_score_pct,
    dt.max_dept_score_pct
FROM departments d
JOIN (
    SELECT 
        dept_id,
        COUNT(student_id) AS total_students,
        ROUND(AVG(exam_score_pct), 2) AS avg_dept_score_pct,
        MAX(exam_score_pct) AS max_dept_score_pct
    FROM students
    GROUP BY dept_id
) AS dt ON d.dept_id = dt.dept_id
ORDER BY dt.avg_dept_score_pct DESC;`,
      resultRows: [
        { id: "DEPT-01", name: "Computer Science", clauseRole: "FROM Derived Table", metric1: "45 Students", metric2: "89.40% Avg Score", evalScope: "Pre-Aggregated Set", status: "Top Department" },
        { id: "DEPT-02", name: "Information Tech", clauseRole: "FROM Derived Table", metric1: "38 Students", metric2: "86.20% Avg Score", evalScope: "Pre-Aggregated Set", status: "Optimal" },
      ],
      explanation:
        "A derived table in the `FROM` clause acts as an inline virtual table, allowing the outer query to join directly against pre-aggregated group statistics.",
    },
    where_filtering_subquery: {
      title: "3. Subquery in WHERE Clause (Row-Level Filtering Predicate)",
      badge: "WHERE Filter",
      badgeColor: "amber",
      sqlQuery: `-- Filtering students scoring above the academy-wide average:
-- Subquery in WHERE runs in Phase 1 and passes a scalar constant to outer query filter.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct
FROM students s
WHERE s.exam_score_pct > (
    SELECT AVG(exam_score_pct) 
    FROM students
)
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", clauseRole: "WHERE Filter", metric1: "96.20% Score", metric2: "Avg: 84.50%", evalScope: "Row Predicate", status: "Honors" },
        { id: "STU-101", name: "Mamata Hui", clauseRole: "WHERE Filter", metric1: "94.50% Score", metric2: "Avg: 84.50%", evalScope: "Row Predicate", status: "Honors" },
      ],
      explanation:
        "Subqueries in the `WHERE` clause evaluate filtering predicates, eliminating candidate rows before grouping or projection occurs.",
    },
    having_group_subquery: {
      title: "4. Subquery in HAVING Clause (Group-Level Benchmark Filter)",
      badge: "HAVING Filter",
      badgeColor: "rose",
      sqlQuery: `-- Finding departments whose average score exceeds the global academy average:
-- Subquery in HAVING evaluates group-level aggregates after GROUP BY execution.

SELECT 
    d.dept_name,
    COUNT(s.student_id) AS student_count,
    ROUND(AVG(s.exam_score_pct), 2) AS dept_avg_score
FROM departments d
JOIN students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING AVG(s.exam_score_pct) > (
    SELECT AVG(exam_score_pct) 
    FROM students
)
ORDER BY dept_avg_score DESC;`,
      resultRows: [
        { id: "DEPT-01", name: "Computer Science", clauseRole: "HAVING Group Filter", metric1: "45 Students", metric2: "89.40% > 84.50%", evalScope: "Group Aggregate", status: "Qualified Group" },
        { id: "DEPT-02", name: "Information Tech", clauseRole: "HAVING Group Filter", metric1: "38 Students", metric2: "86.20% > 84.50%", evalScope: "Group Aggregate", status: "Qualified Group" },
      ],
      explanation:
        "Subqueries in the `HAVING` clause filter aggregated groups, comparing group calculations (e.g. `AVG(score)`) against global scalar benchmarks.",
    },
  };

  const navItems = [
    { id: "clause-anatomy", label: "1. Clause-by-Clause Anatomy" },
    { id: "derived-tables", label: "2. Derived Tables & Aliasing" },
    { id: "svg-diagrams", label: "3. Clause Roles & Derived Table SVGs" },
    { id: "interactive-sandbox", label: "4. Live Clause-by-Clause Workbench" },
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
            <span>Topic 3 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Clause Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Subqueries in SELECT, FROM, and WHERE Clauses
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the strategic placement of subqueries across SQL clauses. Harness scalar projections in <code className="text-cyan-300 font-mono">SELECT</code>, derived virtual tables in <code className="text-emerald-300 font-mono">FROM</code>, row filters in <code className="text-amber-300 font-mono">WHERE</code>, and group benchmarks in <code className="text-rose-300 font-mono">HAVING</code>.
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
        {/* SECTION 1: Anatomy */}
        <section id="clause-anatomy" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Clause-by-Clause Subquery Anatomy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How subquery behavior and cardinality rules adapt to each SQL clause location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. SELECT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scalar projections (1x1). Calculates dynamic attributes (e.g. child counts, sums) per projected row.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2. FROM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Derived tables (NxM). Acts as an inline virtual table; in MySQL, every derived table MUST have an explicit alias!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. WHERE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Row-level filtering predicates. Evaluates scalar or multi-row sets before grouping or aggregation occurs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>4. HAVING</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Group-level filtering predicates. Compares aggregated group metrics against global scalar benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Derived Tables */}
        <section id="derived-tables" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Derived Tables & The Mandatory Alias Rule
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why derived tables in the FROM clause are essential for multi-stage aggregations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              In SQL, you cannot directly nest aggregate functions like <code className="text-rose-300 font-mono">AVG(COUNT(*))</code>. To compute the average of department student counts, you must use an intermediate Derived Table in the <code className="text-cyan-300 font-mono">FROM</code> clause:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`-- Calculating the Average of Department Enrollments:
SELECT AVG(dt.student_count) AS avg_enrollment_per_dept
FROM (
    SELECT dept_id, COUNT(*) AS student_count
    FROM students
    GROUP BY dept_id
) AS dt; -- Mandatory Alias: AS dt`}
            </pre>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Clause Roles & Derived Table Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the SQL pipeline execution for each clause position.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Clause Roles Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Subquery Clause Placement Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* FROM */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. FROM (Derived Table)</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="110" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">NxM Inline Virtual View</text>
                  </g>

                  {/* WHERE */}
                  <g>
                    <rect x="230" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. WHERE Filter</text>
                    <rect x="240" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="320" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Row-Level Elimination</text>
                  </g>

                  {/* HAVING */}
                  <g>
                    <rect x="440" y="30" width="180" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. HAVING Filter</text>
                    <rect x="450" y="70" width="160" height="25" rx="3" fill="#1e293b" />
                    <text x="530" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Group-Level Benchmark</text>
                  </g>

                  {/* SELECT */}
                  <g>
                    <rect x="650" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="740" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. SELECT Projection</text>
                    <rect x="660" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="740" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Per-Row 1x1 Metric</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 75 L 230 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 75 L 440 75" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 620 75 L 650 75" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Derived Table Virtual Materialization */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Derived Table Inline Virtual View Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Inner Derived Query</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT dept_id, COUNT(*) ...</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">GROUP BY dept_id</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="320" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="440" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Named Virtual View (AS dt)</text>
                    <rect x="335" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="440" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Virtual Table 'dt' in RAM</text>
                    <text x="440" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">[ dept_id, student_count ]</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="610" y="30" width="210" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="715" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Outer Join / Aggregation</text>
                    <rect x="625" y="70" width="180" height="40" rx="4" fill="#0f172a" />
                    <text x="715" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">JOIN dt ON d.id = dt.id</text>
                    <text x="715" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Final Projected Result</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 320 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 610 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Clause-by-Clause Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect subquery behaviors live across SELECT projections, FROM derived tables, WHERE filters, and HAVING benchmarks.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(clauseScenarios).map(([key, item]) => {
              const isActive = selectedClause === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedClause(key)}
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
                    {isActive ? "● Active Clause" : "○ Inspect Clause"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{clauseScenarios[selectedClause].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{clauseScenarios[selectedClause].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Clause Execution Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Clause-Specific Pipeline</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {clauseScenarios[selectedClause].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Department</th>
                    <th className="py-3 px-4 text-emerald-400">Clause Placement Role</th>
                    <th className="py-3 px-4 text-cyan-400">Calculated Metric 1</th>
                    <th className="py-3 px-4 text-indigo-400">Calculated Metric 2</th>
                    <th className="py-3 px-4 text-amber-400">Evaluation Scope</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {clauseScenarios[selectedClause].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.clauseRole}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.metric1}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.metric2}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.evalScope}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
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
              Real-world query refactoring across SELECT, FROM, and WHERE clauses.
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
                  Refactoring Correlated SELECT Subqueries to Fast LEFT JOINs
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored a slow student roster API: The original query placed two correlated subqueries in the <code className="text-rose-300 font-mono">SELECT</code> list, firing 100,000 queries on 50,000 students (3.8s latency). Rewriting as a <code className="text-emerald-300 font-mono">LEFT JOIN</code> with <code className="text-emerald-300 font-mono">GROUP BY</code> dropped latency to 12ms!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Slow: Executes 100,000 subqueries (3.8s):
SELECT s.student_name, 
       (SELECT COUNT(*) FROM enrollments e WHERE e.student_id = s.student_id) AS total_courses
FROM students s;

-- ✅ Fast: Executes in 1 pass using LEFT JOIN + GROUP BY (12ms):
SELECT s.student_name, COUNT(e.enrollment_id) AS total_courses
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.student_name;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid derived table syntax errors and performance bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Omitting Derived Table Alias
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">FROM (SELECT ...)</code> without an alias throws <code className="text-rose-300 font-mono">Error 1248: Every derived table must have its own alias</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always add an explicit alias like <code className="text-emerald-400 font-mono">AS dt</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Condition Pushdown in MySQL 8.0+
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MySQL 8.0.22+ automatically pushes outer WHERE predicates into inner derived tables before grouping, minimizing temporary table buffer memory.
              </p>
              <div className="text-xs text-slate-400">
                Enables high-performance inline virtual views.
              </div>
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
              Key takeaways for clause-by-clause subquery design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Clause Placement Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SELECT</code> subqueries only for scalar attributes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always alias derived tables in the <code className="text-cyan-300 font-mono">FROM</code> clause.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">WHERE</code> subqueries for row-level filtering predicates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">HAVING</code> subqueries for group aggregate benchmarks.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Derived Table Merging...”</span>
                  Check your <code className="text-cyan-300 font-mono">EXPLAIN</code> output: MySQL often merges simple derived tables into the outer query block to avoid temporary tables!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about CTEs for complex FROM subqueries...”</span>
                  When derived tables in the FROM clause become deeply nested, refactor them into <code className="text-cyan-300 font-mono">WITH</code> Common Table Expressions for maximum maintainability!
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
              Comprehensive reference questions covering subqueries in SELECT, FROM derived tables, WHERE predicates, and HAVING benchmarks.
            </p>
          </div>

          <FAQTemplate
            title="Subqueries in SELECT, FROM, and WHERE Clauses FAQs"
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
            title="Subqueries in SELECT, FROM (Derived Tables), and WHERE Clauses"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Understanding where a subquery lives in a SQL statement is fundamental. Remember: A subquery in SELECT gives you an extra computed column per row, a subquery in FROM gives you a temporary virtual table you can join against, and a subquery in WHERE filters rows out. Always give your FROM derived tables an alias, and beware of placing correlated subqueries in SELECT over large tables."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
