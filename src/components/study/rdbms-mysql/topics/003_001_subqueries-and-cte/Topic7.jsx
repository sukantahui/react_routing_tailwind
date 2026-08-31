import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Subquery vs JOIN: Performance, Optimization, and Readability Comparison
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench comparing Subqueries vs JOINs, semi-join row preservation, pre-aggregation optimization, and anti-join architectures.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedComparison, setSelectedComparison] = useState("inclusion_semi_join_vs_inner");

  const comparisonScenarios = {
    inclusion_semi_join_vs_inner: {
      title: "1. Inclusion Check: Semi-Join (IN) vs Naive INNER JOIN",
      badge: "Row Multiplication Test",
      badgeColor: "emerald",
      sqlQuery: `-- Method A: Semi-Join with IN (Zero Row Duplication, No DISTINCT Required!):
SELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) AS student_name
FROM students s
WHERE s.student_id IN (
    SELECT e.student_id 
    FROM enrollments e 
    WHERE e.status = 'ACTIVE'
);

-- Method B: Naive INNER JOIN (Duplicates parent rows for each active enrollment):
-- SELECT DISTINCT s.student_id, s.first_name ... (Incurs heavy 'Using filesort' penalty!)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", patternA: "IN (Semi-Join)", patternB: "INNER JOIN + DISTINCT", rowCountA: "1 Row (Clean)", rowCountB: "3 Duplicates → Sorted", status: "Subquery Wins" },
        { id: "STU-103", name: "Abhronila Saha", patternA: "IN (Semi-Join)", patternB: "INNER JOIN + DISTINCT", rowCountA: "1 Row (Clean)", rowCountB: "2 Duplicates → Sorted", status: "Subquery Wins" },
      ],
      explanation:
        "`WHERE id IN (subquery)` evaluates as an optimized Semi-Join that preserves parent row granularity without duplicating rows or requiring expensive `DISTINCT` sorting.",
    },
    exclusion_not_exists_vs_left: {
      title: "2. Exclusion Check: NOT EXISTS vs LEFT JOIN Anti-Join",
      badge: "Anti-Join Comparison",
      badgeColor: "rose",
      sqlQuery: `-- Method A: NOT EXISTS (Explicit Semantic Intent & NULL-Immune):
SELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) AS student_name
FROM students s
WHERE NOT EXISTS (
    SELECT 1 
    FROM enrollments e 
    WHERE e.student_id = s.student_id
);

-- Method B: LEFT JOIN Anti-Join (Equivalent Hash Anti-Join in MySQL 8.0):
-- SELECT s.* FROM students s LEFT JOIN enrollments e ON s.id = e.id WHERE e.id IS NULL;`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", patternA: "NOT EXISTS (Explicit)", patternB: "LEFT JOIN IS NULL", rowCountA: "1 Row (Fast)", rowCountB: "1 Row (Fast)", status: "Both Optimal" },
      ],
      explanation:
        "`NOT EXISTS` explicitly communicates the business intent of finding unreferenced records and is completely immune to SQL three-valued logic NULL traps.",
    },
    pre_aggregated_derived_vs_correlated: {
      title: "3. Aggregation Integration: Pre-Aggregated JOIN vs Correlated SELECT",
      badge: "Aggregation Pass",
      badgeColor: "amber",
      sqlQuery: `-- Method A: Pre-Aggregated Derived Table JOIN (1 Single Pass):
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    COALESCE(dt.total_paid, 0.00) AS total_fees_paid_inr
FROM students s
LEFT JOIN (
    SELECT student_id, SUM(amount_paid_inr) AS total_paid
    FROM fee_payments
    GROUP BY student_id
) AS dt ON s.student_id = dt.student_id;

-- Method B: Correlated SELECT Subquery (Executes N separate queries across all rows!)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", patternA: "Pre-Aggregated JOIN", patternB: "Correlated SELECT", rowCountA: "1 Pass (12ms)", rowCountB: "50,000 Calls (3.8s)", status: "JOIN Wins" },
        { id: "STU-103", name: "Abhronila Saha", patternA: "Pre-Aggregated JOIN", patternB: "Correlated SELECT", rowCountA: "1 Pass (12ms)", rowCountB: "50,000 Calls (3.8s)", status: "JOIN Wins" },
      ],
      explanation:
        "Pre-aggregating payments inside a derived table in the `FROM` clause processes the dataset in a single linear pass ($O(N + M)$), outperforming correlated `SELECT` loops by 300x.",
    },
    multi_column_child_projection: {
      title: "4. Multi-Column Child Projection: When JOIN is Mandatory",
      badge: "Mandatory JOIN",
      badgeColor: "cyan",
      sqlQuery: `-- When columns from BOTH tables must be displayed in the SELECT list:
-- Subqueries in WHERE cannot expose child columns to the outer projection!

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_code,
    c.course_title,
    e.enrolled_date
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
ORDER BY s.student_id, e.enrolled_date;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", patternA: "INNER JOIN (Mandatory)", patternB: "Subquery (Cannot Project Child)", rowCountA: "Projects Course Titles", rowCountB: "Unsupported in WHERE", status: "JOIN Mandatory" },
        { id: "STU-103", name: "Abhronila Saha", patternA: "INNER JOIN (Mandatory)", patternB: "Subquery (Cannot Project Child)", rowCountA: "Projects Course Titles", rowCountB: "Unsupported in WHERE", status: "JOIN Mandatory" },
      ],
      explanation:
        "When the application requires projecting attributes from child tables (e.g. course codes and enrollment dates), a physical `JOIN` is strictly required.",
    },
  };

  const navItems = [
    { id: "landscape", label: "1. Architectural Landscape" },
    { id: "decision-matrix", label: "2. Comparative Decision Matrix" },
    { id: "svg-diagrams", label: "3. Semi-Join & Pre-Aggregation SVGs" },
    { id: "interactive-sandbox", label: "4. Live Comparison Workbench" },
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
            <span>Topic 7 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Performance Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Subquery vs JOIN: Performance, Tuning & Readability
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Architect with clarity. Master when to leverage Semi-Join subqueries to prevent row multiplication, when to utilize pre-aggregated derived table JOINs, and when to enforce multi-table projection.
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
        {/* SECTION 1: Landscape */}
        <section id="landscape" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Subquery vs JOIN Architectural Dilemma
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing relational retrieval strategies across cardinality, execution plans, and memory consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🛡️</span> When Subqueries Win
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Semi-joins (<code className="text-emerald-300 font-mono">IN / EXISTS</code>) test presence without row multiplication, eliminating expensive <code className="text-emerald-300 font-mono">DISTINCT</code> sorting operations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>⚡</span> When JOINs Win
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Physical JOINs project attributes from multiple tables simultaneously and allow single-pass linear processing over datasets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🔄</span> The Hybrid Sweet Spot
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-aggregating child metrics inside a derived table in the <code className="text-amber-300 font-mono">FROM</code> clause before joining with parent entities.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Decision Matrix */}
        <section id="decision-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Architectural Decision Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Authoritative rules for choosing between subqueries and JOINs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Business Requirement</th>
                  <th className="py-3.5 px-4 text-emerald-400">Recommended Pattern</th>
                  <th className="py-3.5 px-4 text-amber-400">Why It's Optimal</th>
                  <th className="py-3.5 px-4 text-rose-400">Anti-Pattern to Avoid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Presence Check (Has Enrollments)</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">WHERE id IN (SELECT ...)</td>
                  <td className="py-3 px-4 text-emerald-400">Zero row duplication; no DISTINCT needed</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">INNER JOIN + DISTINCT</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Unreferenced Records (Anti-Join)</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">WHERE NOT EXISTS (SELECT 1 ...)</td>
                  <td className="py-3 px-4 text-emerald-400">NULL-immune; explicit business intent</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">WHERE id NOT IN (NULL Risk)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Child Aggregate Total (Total Paid)</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">LEFT JOIN (SELECT SUM ... GROUP BY)</td>
                  <td className="py-3 px-4 text-emerald-400">1 single linear pass ($O(N+M)$)</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Correlated SELECT Subquery</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Project Student + Course Details</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">INNER JOIN students JOIN courses</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory to expose child columns</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Subquery in WHERE (Cannot project)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Semi-Join Row Preservation & Pre-Aggregation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how semi-joins eliminate row duplication and pre-aggregations shrink volume.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Semi Join vs Row Multiplication */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Semi-Join (IN) vs Naive INNER JOIN Row Duplication
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Semi-Join */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ Semi-Join: WHERE id IN (SELECT ...)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Preserves 1 Row Per Student (100% Unique)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Zero Row Duplication • Zero DISTINCT Sorting</text>
                  </g>

                  {/* Naive INNER JOIN */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">❌ Naive INNER JOIN (Row Explosion)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Duplicates Student for EVERY active course (1:N)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Forces expensive DISTINCT sorting (Using filesort)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Pre-Aggregated Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Pre-Aggregated Derived Table JOIN Execution Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Raw Child Table</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">fee_payments (100,000 Rows)</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Multiple installments per student</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="310" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="435" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Pre-Aggregate in RAM</text>
                    <rect x="325" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="435" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">GROUP BY student_id → 5,000 Rows</text>
                    <text x="435" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Shrinks volume by 95% before join!</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="600" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="710" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. 1:1 Fast Outer JOIN</text>
                    <rect x="615" y="70" width="190" height="40" rx="4" fill="#0f172a" />
                    <text x="710" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">students JOIN dt (5,000:5,000)</text>
                    <text x="710" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">100% Fast Index Lookup</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 600 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Subquery vs JOIN Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test inclusion checks, exclusion anti-joins, pre-aggregated derived table joins, and multi-column projections live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(comparisonScenarios).map(([key, item]) => {
              const isActive = selectedComparison === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedComparison(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Test" : "○ Compare Pattern"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{comparisonScenarios[selectedComparison].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{comparisonScenarios[selectedComparison].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Optimization Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Comparative SQL Execution Plan</span>
                <span className="text-emerald-400">Pattern Benchmark</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {comparisonScenarios[selectedComparison].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Student ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Subquery Architecture</th>
                    <th className="py-3 px-4 text-cyan-400">JOIN Architecture</th>
                    <th className="py-3 px-4 text-indigo-400">Subquery Cost</th>
                    <th className="py-3 px-4 text-amber-400">JOIN Cost</th>
                    <th className="py-3 px-4 text-emerald-400">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {comparisonScenarios[selectedComparison].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.patternA}</td>
                      <td className="py-3 px-4 text-cyan-300 font-sans">{row.patternB}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.rowCountA}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.rowCountB}</td>
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
              Real-world query architectural refactorings.
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
                  Eliminating DISTINCT Sort Buffers via Semi-Join Subqueries
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored an academy marketing query: The original query used <code className="text-rose-300 font-mono">SELECT DISTINCT s.* FROM students s JOIN enrollments e</code>, which caused massive 200MB temporary disk sorts. Changing to <code className="text-emerald-300 font-mono">WHERE s.student_id IN (SELECT e.student_id FROM enrollments e)</code> allowed MySQL's FirstMatch semi-join engine to execute in 4ms with 0MB disk sort!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Slow: Duplicates rows and forces expensive DISTINCT sorting on disk:
SELECT DISTINCT s.student_id, s.first_name, s.email FROM students s JOIN enrollments e ON s.student_id = e.student_id;

-- ✅ Fast: Semi-Join preserves uniqueness natively without sorting:
SELECT s.student_id, s.first_name, s.email FROM students s WHERE s.student_id IN (SELECT e.student_id FROM enrollments e);`}
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
              Avoid row duplication and inappropriate subquery loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Using DISTINCT to Mask Bad JOINs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Slapping <code className="text-rose-300 font-mono">DISTINCT</code> on an INNER JOIN that produces row multiplication masks flawed relational logic and degrades performance.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use a Semi-Join (<code className="text-emerald-400 font-mono">IN / EXISTS</code>).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Pre-Aggregate Before Joining
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always shrink 1:N child table rows in a derived table or CTE using <code className="text-emerald-400 font-mono">GROUP BY</code> before joining to the 1-side parent table.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees clean 1:1 join cardinality and avoids Cartesian explosion.
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
              Key takeaways for choosing between subqueries and JOINs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Subquery vs JOIN Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use JOINs when child table columns must appear in the <code className="text-cyan-300 font-mono">SELECT</code> list.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use Semi-Join <code className="text-cyan-300 font-mono">IN</code> subqueries to check existence without row multiplication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">NOT EXISTS</code> for clean, NULL-safe anti-joins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Pre-aggregate in derived tables/CTEs before joining 1:N tables.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Hash Joins in MySQL 8.0...”</span>
                  MySQL 8.0 automatically uses Hash Joins for non-indexed joins, achieving $O(N + M)$ performance without nested loops!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about query readability...”</span>
                  When subquery nesting exceeds 2 levels, always refactor into a Common Table Expression (CTE) for maximum maintainability!
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
              Comprehensive reference questions covering subqueries vs JOINs, semi-join row preservation, pre-aggregation optimization, and anti-join architectures.
            </p>
          </div>

          <FAQTemplate
            title="Subquery vs JOIN FAQs"
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
            title="Subquery vs JOIN: Performance, Optimization, and Readability Comparison"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="There is no universal rule that says 'JOINs are always faster' or 'Subqueries are always better'. A true senior engineer understands the trade-offs: use JOINs when you need columns from multiple tables, use Semi-Joins (IN / EXISTS) when you want to filter without duplicating rows, and pre-aggregate in derived tables or CTEs before joining to prevent Cartesian explosions!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
