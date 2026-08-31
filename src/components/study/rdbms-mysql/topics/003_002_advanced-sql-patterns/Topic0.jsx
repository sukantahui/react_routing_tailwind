import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Introduction to Window (Analytic) Functions vs Aggregate Functions
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on window functions, the OVER clause, row preservation vs row collapse, execution lifecycle, and partition analytics.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedParadigmScenario, setSelectedParadigmScenario] = useState("window_row_preservation");

  const paradigmScenarios = {
    window_row_preservation: {
      title: "1. Window Function: OVER (PARTITION BY dept_id) [Preserves All Rows]",
      badge: "Window Function (OVER)",
      badgeColor: "emerald",
      sqlQuery: `-- Preserving 100% of individual row identity while computing group averages:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    -- Window Function: Computes department average and attaches to each student row:
    ROUND(AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id), 2) AS dept_avg_score,
    -- Immediate Variance Calculation in pure SQL:
    ROUND(s.exam_score_pct - AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id), 2) AS variance_from_dept
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY d.dept_name, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", deptAvg: "91.25%", delta: "+3.25%", status: "4 of 4 Rows Preserved" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", deptAvg: "91.25%", delta: "-3.25%", status: "4 of 4 Rows Preserved" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", deptAvg: "89.30%", delta: "+6.90%", status: "4 of 4 Rows Preserved" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "82.40%", deptAvg: "89.30%", delta: "-6.90%", status: "4 of 4 Rows Preserved" },
      ],
      explanation:
        "All 4 individual student rows are preserved! The `AVG() OVER (PARTITION BY dept_id)` computes department averages and attaches them directly onto every student record without losing student names or granular exam scores.",
    },
    grouped_aggregate_collapse: {
      title: "2. Standard Grouped Aggregate: GROUP BY [Collapses Rows]",
      badge: "Group Aggregate (GROUP BY)",
      badgeColor: "rose",
      sqlQuery: `-- Standard GROUP BY collapses individual rows into 1 summary row per department:
SELECT 
    d.dept_name,
    COUNT(s.student_id) AS total_students,
    ROUND(AVG(s.exam_score_pct), 2) AS dept_avg_score,
    MAX(s.exam_score_pct) AS dept_top_score
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
GROUP BY d.dept_name
ORDER BY d.dept_name;

-- ⚠️ Notice: Student names and individual scores are completely lost in the output!`,
      resultRows: [
        { id: "DEPT-CS", name: "[All CS Students]", dept: "Computer Science", score: "2 Enrolled", deptAvg: "91.25%", delta: "Max: 94.50%", status: "Collapsed to 1 Row" },
        { id: "DEPT-IT", name: "[All IT Students]", dept: "Information Tech", score: "2 Enrolled", deptAvg: "89.30%", delta: "Max: 96.20%", status: "Collapsed to 1 Row" },
      ],
      explanation:
        "The standard `GROUP BY` collapses the 4 student records into only 2 department summary rows. Individual student identities and scores vanish from the projection list.",
    },
    global_window_overall_benchmark: {
      title: "3. Global Window Function: OVER () [Entire Table as 1 Partition]",
      badge: "Global Window OVER()",
      badgeColor: "cyan",
      sqlQuery: `-- Computing Academy-Wide Benchmarks across the whole table:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    -- Empty OVER() computes the global average across ALL students:
    ROUND(AVG(s.exam_score_pct) OVER (), 2) AS academy_wide_avg_score,
    ROUND(s.exam_score_pct - AVG(s.exam_score_pct) OVER (), 2) AS diff_from_academy_avg
FROM students s
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "All Academies", score: "96.20%", deptAvg: "90.28%", delta: "+5.92%", status: "Global Benchmark" },
        { id: "STU-101", name: "Mamata Hui", dept: "All Academies", score: "94.50%", deptAvg: "90.28%", delta: "+4.22%", status: "Global Benchmark" },
        { id: "STU-102", name: "Susmita Sen", dept: "All Academies", score: "88.00%", deptAvg: "90.28%", delta: "-2.28%", status: "Global Benchmark" },
        { id: "STU-104", name: "Debangshu Roy", dept: "All Academies", score: "82.40%", deptAvg: "90.28%", delta: "-7.88%", status: "Global Benchmark" },
      ],
      explanation:
        "An empty `OVER()` clause treats the entire result set as a single partition, broadcasting the academy-wide average of 90.28% onto every individual student's record.",
    },
    multiple_parallel_partitions: {
      title: "4. Multiple Parallel Partitions in One Statement",
      badge: "Parallel Windows",
      badgeColor: "amber",
      sqlQuery: `-- Combining Department Averages and City Revenue Totals simultaneously:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.city,
    s.exam_score_pct,
    -- Window 1: Department Average
    ROUND(AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id), 2) AS dept_avg_score,
    -- Window 2: City Headcount
    COUNT(s.student_id) OVER (PARTITION BY s.city) AS city_student_count
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY s.city, s.student_id;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "Barrackpore", deptAvg: "91.25% (Dept)", delta: "2 Students (City)", status: "Dual Windows" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "Barrackpore", deptAvg: "89.30% (Dept)", delta: "2 Students (City)", status: "Dual Windows" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "Ichapur", deptAvg: "91.25% (Dept)", delta: "1 Student (City)", status: "Dual Windows" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "Kolkata", deptAvg: "89.30% (Dept)", delta: "1 Student (City)", status: "Dual Windows" },
      ],
      explanation:
        "MySQL 8.0 evaluates multiple window specifications in parallel. Here, Window 1 partitions by Department while Window 2 partitions by City in the exact same query statement!",
    },
  };

  const navItems = [
    { id: "window-concept", label: "1. The Analytic Paradigm Shift" },
    { id: "execution-lifecycle", label: "2. 9-Phase SQL Lifecycle" },
    { id: "svg-diagrams", label: "3. Row Preservation & Lifecycle SVGs" },
    { id: "interactive-sandbox", label: "4. Live Window Workbench" },
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
            <span>Module 003_002</span>
            <span>•</span>
            <span>Topic 0 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Modern Analytical SQL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Window (Analytic) Functions vs Aggregate Functions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Experience the defining analytical upgrade in modern SQL. Understand how MySQL 8.0+ Window Functions compute aggregate metrics, benchmarks, and partitions while preserving 100% of individual row identity.
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
        {/* SECTION 1: Concept */}
        <section id="window-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Fundamental Analytic Paradigm Shift
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing row-collapsing group aggregations with row-preserving window analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>📉</span> Group Aggregate (GROUP BY)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Collapses $N$ input rows into 1 summary row per group. Destroys individual row attributes (names, IDs, granular dates).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📈</span> Window Function (OVER)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preserves all $N$ original input rows. Calculates group metrics and projects them alongside each individual row in real time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>⚡</span> Single-Pass Execution
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates partition sorting in-memory in $O(N \log N)$ time, eliminating slow $O(N^2)$ self-joins and correlated subqueries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Execution Lifecycle */}
        <section id="execution-lifecycle" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 9-Phase SQL Query Execution Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why Window Functions evaluate at Phase 5 and cannot appear in `WHERE` clauses directly.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Execution Phase</th>
                  <th className="py-3.5 px-4 text-white">Clause / Operation</th>
                  <th className="py-3.5 px-4 text-emerald-400">Engine Responsibility</th>
                  <th className="py-3.5 px-4 text-amber-400">Window Function Permitted?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 1</td>
                  <td className="py-3 px-4 text-white font-mono">FROM / JOIN</td>
                  <td className="py-3 px-4 text-slate-300">Identify and join source tables</td>
                  <td className="py-3 px-4 text-rose-400">❌ Disallowed in ON</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 2</td>
                  <td className="py-3 px-4 text-white font-mono">WHERE</td>
                  <td className="py-3 px-4 text-slate-300">Filter base candidate rows</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">❌ Strictly Disallowed (Error 3593)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 3</td>
                  <td className="py-3 px-4 text-white font-mono">GROUP BY</td>
                  <td className="py-3 px-4 text-slate-300">Group rows into aggregate buckets</td>
                  <td className="py-3 px-4 text-rose-400">❌ Disallowed</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 4</td>
                  <td className="py-3 px-4 text-white font-mono">HAVING</td>
                  <td className="py-3 px-4 text-slate-300">Filter aggregated group buckets</td>
                  <td className="py-3 px-4 text-rose-400">❌ Disallowed</td>
                </tr>
                <tr className="hover:bg-emerald-950/40 bg-emerald-950/20 border-l-4 border-emerald-500">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">Phase 5</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono font-bold">WINDOW FUNCTIONS</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">Calculate OVER() partitions &amp; ranks</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✅ Evaluated Here!</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 6</td>
                  <td className="py-3 px-4 text-white font-mono">SELECT</td>
                  <td className="py-3 px-4 text-slate-300">Project columns and aliases</td>
                  <td className="py-3 px-4 text-emerald-400">✅ Permitted in projection</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 7</td>
                  <td className="py-3 px-4 text-white font-mono">DISTINCT</td>
                  <td className="py-3 px-4 text-slate-300">Remove duplicate projected rows</td>
                  <td className="py-3 px-4 text-slate-400">Evaluates after Window Functions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 8</td>
                  <td className="py-3 px-4 text-white font-mono">ORDER BY</td>
                  <td className="py-3 px-4 text-slate-300">Final result set sorting</td>
                  <td className="py-3 px-4 text-slate-400">Sorts final projected output</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Phase 9</td>
                  <td className="py-3 px-4 text-white font-mono">LIMIT / OFFSET</td>
                  <td className="py-3 px-4 text-slate-300">Slice row pagination window</td>
                  <td className="py-3 px-4 text-slate-400">Final row count limit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Row Collapse vs Row Preservation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing GROUP BY row destruction against OVER() partition projections.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Row Collapse vs Preservation */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> GROUP BY (Row Destruction) vs OVER() (Row Preservation)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* GROUP BY */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">❌ GROUP BY (Collapses 4 Rows → 2 Rows)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">CS: Avg 91.25% | IT: Avg 89.30%</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Individual Student Names &amp; Scores DESTROYED!</text>
                  </g>

                  {/* OVER() */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ OVER() (Preserves All 4 Rows + Projections)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Mamata (94.5%), Susmita (88%), Abhronila (96.2%)...</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">100% Granular Identity + Dept Average Attached!</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Execution Order */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Window Functions Evaluation at Phase 5 of SQL Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1-4 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Phases 1 - 4: Filter &amp; Group</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">FROM → WHERE → GROUP BY</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Base Candidates Selected</text>
                  </g>

                  {/* Phase 5 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Phase 5: WINDOW FUNCTIONS</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">AVG() OVER (PARTITION BY)</text>
                    <text x="425" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">In-Memory Partition Calculation</text>
                  </g>

                  {/* Phase 6-9 */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Phases 6 - 9: Output &amp; Sort</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT → DISTINCT → ORDER BY</text>
                    <text x="705" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">Final Projected Set</text>
                  </g>

                  {/* Flow Arrows */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Window Function Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test row-preserving partitions, grouped collapsing, global windows, and parallel window specifications live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(paradigmScenarios).map(([key, item]) => {
              const isActive = selectedParadigmScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedParadigmScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Paradigm" : "○ Run Paradigm"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{paradigmScenarios[selectedParadigmScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{paradigmScenarios[selectedParadigmScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                OVER() Analytic Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Analytical SQL Statement</span>
                <span className="text-emerald-400">Row Preservation Architecture</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {paradigmScenarios[selectedParadigmScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Student / Key</th>
                    <th className="py-3 px-4 text-white">Entity Name</th>
                    <th className="py-3 px-4 text-emerald-400">Department / Domain</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Count</th>
                    <th className="py-3 px-4 text-indigo-400">Partition Average</th>
                    <th className="py-3 px-4 text-amber-400">Variance / Delta</th>
                    <th className="py-3 px-4 text-emerald-400">Preservation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {paradigmScenarios[selectedParadigmScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.deptAvg}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.delta}</td>
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
              Real-world analytical query optimizations with Window Functions.
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
                  Eliminating Expensive Self-Joins for Performance Variance Benchmarks
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored an academy student performance dashboard. The legacy SQL joined <code className="text-rose-300 font-mono">students</code> against a pre-aggregated subquery to compute variance from department average. Replacing the self-join with <code className="text-emerald-300 font-mono">AVG(score) OVER (PARTITION BY dept_id)</code> reduced query execution time by 88% and halved the lines of code!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ High-Speed Window Function Variance Calculation:
SELECT 
    s.student_name,
    s.exam_score_pct,
    (s.exam_score_pct - AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id)) AS diff_from_dept
FROM students s;`}
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
              Avoid illegal clause placement and frame confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Using Window Functions in WHERE (Error 3593)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE AVG(score) OVER () &gt; 90</code> throws Error 3593 because WHERE evaluates at Phase 2 before window partitions exist.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Wrap the window function inside a CTE and filter in the outer query!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Named Windows for DRY Cleanliness
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When using multiple window functions with identical partitions, declare a named window using <code className="text-emerald-400 font-mono">WINDOW w AS (PARTITION BY dept_id)</code> to keep queries clean and maintainable.
              </p>
              <div className="text-xs text-slate-400">
                Prevents copy-pasting complex window definitions.
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
              Key takeaways for mastering window functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Window Function Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Window Functions (<code className="text-cyan-300 font-mono">OVER()</code>) to preserve granular row identity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Remember that Window Functions evaluate at Phase 5 (after WHERE &amp; GROUP BY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Wrap Window Functions in CTEs when filtering on rank or partition aggregates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use empty <code className="text-cyan-300 font-mono">OVER()</code> to project global table-wide averages onto every row.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the power of OVER()...”</span>
                  Before MySQL 8.0, comparing a student's score to their department average required a self-join. With Window Functions, it takes a single line of SQL!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about sort_buffer_size...”</span>
                  Window function partitioning relies on in-memory sort buffers. Ensure `sort_buffer_size` is sized appropriately for high-volume partition sorts!
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
              Comprehensive reference questions covering window functions vs aggregate functions, OVER clause mechanics, execution order, and partition analytics.
            </p>
          </div>

          <FAQTemplate
            title="Window Functions vs Aggregate Functions FAQs"
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
            title="Introduction to Window (Analytic) Functions vs Aggregate Functions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Window Functions are the single greatest analytical tool in modern relational database engineering. The mental model is simple: GROUP BY collapses rows into summary buckets; Window Functions (OVER) keep every single row while calculating group benchmarks alongside them. Remember that window functions evaluate at Phase 5 of query execution, so if you need to filter on a window metric, wrap it inside a CTE!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
