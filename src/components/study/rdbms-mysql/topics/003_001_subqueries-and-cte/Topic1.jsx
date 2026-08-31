import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Single-Row Subqueries with Comparison Operators
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on scalar single-row subqueries, comparison operators (=, >, <), Error 1242 mitigation, and defensive coding.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("above_average_score");

  const singleRowScenarios = {
    above_average_score: {
      title: "1. Above-Average Benchmark Filter (> AVG)",
      badge: "Arithmetic Comparison",
      badgeColor: "emerald",
      sqlQuery: `-- Finding students scoring strictly above the academy-wide average:
-- Inner Subquery: Computes AVG(exam_score_pct) = 84.50% ONCE.
-- Outer Query: Evaluates 'WHERE s.exam_score_pct > 84.50'.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    'Above Benchmark' AS classification
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct > (
    SELECT AVG(exam_score_pct) 
    FROM students
)
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", benchmark: "Avg: 84.50%", variance: "+11.70%", status: "Gold Honors" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", benchmark: "Avg: 84.50%", variance: "+10.00%", status: "Gold Honors" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", benchmark: "Avg: 84.50%", variance: "+3.50%", status: "Above Average" },
      ],
      explanation:
        "The single-row subquery evaluates once to return the arithmetic average (84.50%), allowing the outer query to filter records with the `>` operator.",
    },
    exact_maximum_match: {
      title: "2. Finding the Top Scorer (= MAX)",
      badge: "Extreme Boundary Match",
      badgeColor: "cyan",
      sqlQuery: `-- Discovering the highest-scoring student in the academy:
-- Inner Subquery: Computes MAX(exam_score_pct) = 96.20%.
-- Outer Query: Finds all students matching that exact top score.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    'Academy Gold Medalist' AS award_title
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct = (
    SELECT MAX(exam_score_pct) 
    FROM students
);`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", benchmark: "Max: 96.20%", variance: "Top Rank", status: "Gold Medal Winner" },
      ],
      explanation:
        "The `MAX()` aggregate function guarantees a single scalar return value (96.20%), safely matching the top-ranking record without hardcoding.",
    },
    same_department_peers: {
      title: "3. Same-Department Peer Discovery (= Lookup)",
      badge: "Entity Lookup",
      badgeColor: "amber",
      sqlQuery: `-- Finding all peers enrolled in the same department as 'Mamata':
-- Inner Subquery: Retrieves dept_id for student 'Mamata' (dept_id = 1).
-- Defensive Clause: Uses LIMIT 1 to guarantee single-row cardinality.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS peer_name,
    s.email,
    s.exam_score_pct
FROM students s
WHERE s.dept_id = (
    SELECT dept_id 
    FROM students 
    WHERE first_name = 'Mamata' 
    LIMIT 1
)
AND s.first_name &lt;&gt; 'Mamata'
ORDER BY s.first_name ASC;`,
      resultRows: [
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", benchmark: "Same Dept (CS)", variance: "Peer Match", status: "Department Peer" },
      ],
      explanation:
        "Looks up Mamata's department dynamically. Adding `LIMIT 1` protects the query from runtime Error 1242 if multiple students named Mamata exist in the table.",
    },
    second_highest_score: {
      title: "4. Second-Highest Score Discovery (Nested Scalar)",
      badge: "Nested Scalar Logic",
      badgeColor: "rose",
      sqlQuery: `-- Discovering the 2nd highest exam score in the academy:
-- Inner Nested Query 1: Computes global MAX(exam_score_pct) = 96.20%.
-- Inner Nested Query 2: Computes MAX(exam_score_pct) strictly less than 96.20% → 94.50%.
-- Outer Query: Matches students scoring exactly 94.50%.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    'Silver Rank (2nd Highest)' AS honor_rank
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct = (
    SELECT MAX(exam_score_pct) 
    FROM students 
    WHERE exam_score_pct < (
        SELECT MAX(exam_score_pct) 
        FROM students
    )
);`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", benchmark: "2nd Max: 94.50%", variance: "Silver Rank", status: "Silver Medalist" },
      ],
      explanation:
        "Uses nested scalar subqueries to mathematically isolate the second-highest score without relying on limit/offset hacks.",
    },
  };

  const navItems = [
    { id: "scalar-concept", label: "1. Scalar Subquery Concept" },
    { id: "comparison-operators", label: "2. Comparison Operators (=, >, <)" },
    { id: "svg-diagrams", label: "3. Flow & Hazard SVGs" },
    { id: "interactive-sandbox", label: "4. Live Single-Row Workbench" },
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
            <span>Topic 1 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Scalar Comparison Logic
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Single-Row Subqueries with Comparison Operators
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Harness single-row scalar subqueries with standard comparison operators (<code className="text-cyan-300 font-mono">=, &lt;&gt;, &gt;, &gt;=, &lt;, &lt;=</code>). Master dynamic benchmarking, extreme value matching, and defensive techniques to eliminate Error 1242.
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
        <section id="scalar-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Scalar Single-Row Subquery Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A scalar subquery evaluates to exactly one value, functioning as a dynamic constant in comparison expressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🎯</span> Exact 1x1 Cardinality
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Produces exactly one row and one column. Can be placed wherever a literal number, string, or date expression is allowed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⚖️</span> Scalar Comparison Operators
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly compatible with <code className="text-emerald-300 font-mono">=, !=, &lt;&gt;, &gt;, &gt;=, &lt;, &lt;=</code> without requiring set keywords.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🛡️</span> Defensive Safety
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use aggregate functions (<code className="text-amber-300 font-mono">MAX, AVG</code>) or <code className="text-amber-300 font-mono">LIMIT 1</code> to guarantee single-row output and prevent Error 1242 crashes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Operators */}
        <section id="comparison-operators" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Permitted Comparison Operators
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard operators used with single-row subqueries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">=</span>
              <p className="text-slate-400 font-sans">Equal to scalar result.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">&lt;&gt; / !=</span>
              <p className="text-slate-400 font-sans">Not equal to scalar result.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">&gt;</span>
              <p className="text-slate-400 font-sans">Strictly greater than scalar.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">&gt;=</span>
              <p className="text-slate-400 font-sans">Greater than or equal to.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">&lt;</span>
              <p className="text-slate-400 font-sans">Strictly less than scalar.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">&lt;=</span>
              <p className="text-slate-400 font-sans">Less than or equal to.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Scalar Comparison Flow & Error 1242 Hazard
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing scalar execution against multi-row overflow crashes.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Scalar Comparison Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Scalar Subquery Evaluation Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Inner Box */}
                  <g>
                    <rect x="30" y="30" width="260" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="160" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">1. Inner Scalar Subquery</text>
                    <rect x="45" y="70" width="230" height="25" rx="4" fill="#022c22" />
                    <text x="160" y="87" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">SELECT AVG(score) → 84.50</text>
                    <text x="160" y="115" fill="#34d399" fontSize="8 font-bold" textAnchor="middle">1 Row × 1 Column Output</text>
                  </g>

                  {/* Outer Box */}
                  <g>
                    <rect x="420" y="30" width="400" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="620" y="55" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">2. Outer Scalar Comparison</text>
                    <rect x="435" y="70" width="370" height="25" rx="4" fill="#0f172a" />
                    <text x="620" y="87" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">WHERE exam_score_pct &gt; 84.50</text>
                    <text x="620" y="115" fill="#818cf8" fontSize="8 font-bold" textAnchor="middle">Filters Student Rows with B-Tree Seek</text>
                  </g>

                  {/* Arrow */}
                  <path d="M 290 80 L 420 80" stroke="#10b981" strokeWidth="2" />
                  <text x="355" y="70" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">84.50</text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Error 1242 Hazard */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Error 1242 Hazard: Multi-Row Ingestion on Scalar Operator
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Bad Subquery */}
                  <g>
                    <rect x="30" y="30" width="280" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="170" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Subquery Returns Multiple Rows</text>
                    <rect x="45" y="70" width="250" height="25" rx="4" fill="#0f172a" />
                    <text x="170" y="87" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">SELECT dept_id → [ 1, 2, 3 ]</text>
                    <text x="170" y="115" fill="#fca5a5" fontSize="8 font-bold" textAnchor="middle">3 Rows Returned (Not Scalar!)</text>
                  </g>

                  {/* Crash Box */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Scalar Comparison Fails (=)</text>
                    <rect x="455" y="70" width="350" height="25" rx="4" fill="#1e293b" />
                    <text x="630" y="87" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">WHERE s.dept_id = [ 1, 2, 3 ]</text>
                    <text x="630" y="115" fill="#f87171" fontSize="8 font-bold" textAnchor="middle">💥 Error 1242: Subquery returns &gt; 1 row</text>
                  </g>

                  {/* Red Arrow */}
                  <path d="M 310 80 L 440 80" stroke="#ef4444" strokeWidth="2" />
                  <text x="375" y="70" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">CRASH</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Single-Row Subquery Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test above-average filters, maximum value matches, same-department peer lookups, and nested 2nd-highest score queries live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(singleRowScenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
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
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{singleRowScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{singleRowScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Scalar Comparison Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Scalar Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {singleRowScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Student ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Department</th>
                    <th className="py-3 px-4 text-cyan-400">Exam Score</th>
                    <th className="py-3 px-4 text-indigo-400">Benchmark Evaluated</th>
                    <th className="py-3 px-4 text-amber-400">Variance / Difference</th>
                    <th className="py-3 px-4 text-emerald-400">Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {singleRowScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.benchmark}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.variance}</td>
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
              Real-world implementations of scalar subquery comparisons.
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
                  Defensive Subquery Coding on Multiple Fee Payments
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui fixes a production billing bug: An application tried to compare student fee balances with <code className="text-rose-300 font-mono">= (SELECT amount FROM fee_payments WHERE student_id = 101)</code>, which crashed with Error 1242 when student Mamata made 2 installments. Changing to <code className="text-emerald-300 font-mono">SUM(amount)</code> guaranteed scalar output!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Vulnerable to Error 1242 if student made multiple payments:
SELECT * FROM enrollments WHERE fee_paid = (SELECT amount_paid_inr FROM fee_payments WHERE student_id = 101);

-- ✅ Safe Scalar Subquery using SUM() aggregation:
SELECT * FROM enrollments WHERE fee_paid = (SELECT SUM(amount_paid_inr) FROM fee_payments WHERE student_id = 101);`}
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
              Avoid runtime scalar subquery errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Assuming Queries Always Return 1 Row
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never use <code className="text-rose-300 font-mono">= (SELECT ...)</code> on non-unique columns without <code className="text-rose-300 font-mono">LIMIT 1</code> or an aggregate function!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always guarantee cardinality at the query level.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Handle NULL / Empty Sets with COALESCE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If a scalar subquery matches zero rows, it evaluates to NULL. Wrap in <code className="text-emerald-400 font-mono">COALESCE((SELECT ...), default_val)</code> to prevent comparisons from evaluating to UNKNOWN.
              </p>
              <div className="text-xs text-slate-400">
                Ensures safe comparisons under empty table conditions.
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
              Key takeaways for writing single-row scalar subqueries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Single-Row Subquery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Verify that the inner subquery returns exactly 1 row and 1 column.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use standard comparison operators: <code className="text-cyan-300 font-mono">=, &lt;&gt;, &gt;, &gt;=, &lt;, &lt;=</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Prevent Error 1242 using <code className="text-cyan-300 font-mono">MAX, MIN, AVG</code>, or <code className="text-cyan-300 font-mono">LIMIT 1</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Handle empty result sets gracefully with <code className="text-cyan-300 font-mono">COALESCE()</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe second maximum nested logic...”</span>
                  To find the 2nd highest score or salary, write a nested subquery: <code className="text-cyan-300 font-mono">WHERE score = (SELECT MAX(score) FROM t WHERE score &lt; (SELECT MAX(score) FROM t))</code>.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index range scans on scalar comparisons...”</span>
                  Ensure the column being filtered in the outer WHERE clause has a B-Tree index; MySQL will seek the scalar value in $O(\log N)$ logarithmic time!
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
              Comprehensive reference questions covering single-row subqueries, comparison operators, Error 1242 defense, and NULL handling.
            </p>
          </div>

          <FAQTemplate
            title="Single-Row Subqueries FAQs"
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
            title="Single-Row Subqueries with Comparison Operators"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Single-row scalar subqueries are extremely powerful, but beware of Error 1242! If your query works on test data with 1 record, it might crash in production when a second duplicate record is inserted. Always write defensive SQL: if you are using '=' with a subquery, either use an aggregate like MAX() or explicitly append LIMIT 1."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
