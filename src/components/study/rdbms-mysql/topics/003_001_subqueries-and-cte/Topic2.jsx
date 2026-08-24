import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Multiple-Row Subqueries using IN, NOT IN, ANY/SOME, and ALL Operators
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on multi-row subqueries, IN/NOT IN operators, ANY/ALL mechanics, and NULL poisoning defense.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedOperatorScenario, setSelectedOperatorScenario] = useState("in_branch_matching");

  const operatorScenarios = {
    in_branch_matching: {
      title: "1. IN Multi-Row Set Membership (Semi-Join)",
      badge: "IN (Set Match)",
      badgeColor: "emerald",
      sqlQuery: `-- Finding students enrolled in branches located in 'Barrackpore':
-- Inner Subquery: Returns [1, 4] (Barrackpore Central, Barrackpore North).
-- Outer Query: Evaluates 'WHERE branch_id IN (1, 4)'.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.branch_id,
    s.exam_score_pct
FROM students s
WHERE s.branch_id IN (
    SELECT branch_id 
    FROM branches 
    WHERE city = 'Barrackpore'
)
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", detail: "Branch #1 (Barrackpore Main)", score: "94.50%", condition: "IN (1, 4)", logic: "Match Found", status: "Enrolled" },
        { id: "STU-104", name: "Debangshu Roy", detail: "Branch #4 (Barrackpore North)", score: "82.40%", condition: "IN (1, 4)", logic: "Match Found", status: "Enrolled" },
      ],
      explanation:
        "The `IN` operator checks if the student's `branch_id` matches any element in the subquery's returned list. MySQL executes this via an optimized Semi-Join.",
    },
    greater_than_any: {
      title: "2. > ANY (Greater than MIN of Subquery)",
      badge: "> ANY (Existential)",
      badgeColor: "cyan",
      sqlQuery: `-- Finding students whose score is greater than ANY student in IT Dept:
-- Inner Subquery: IT Scores are [82.40%, 96.20%].
-- Logic: '> ANY' means strictly greater than the MINIMUM (82.40%).

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct > ANY (
    SELECT exam_score_pct 
    FROM students 
    WHERE dept_id = 2
)
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", score: "96.20%", condition: "> MIN (82.40%)", logic: "96.20 > 82.40", status: "Qualified" },
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", score: "94.50%", condition: "> MIN (82.40%)", logic: "94.50 > 82.40", status: "Qualified" },
        { id: "STU-102", name: "Susmita Sen", detail: "Computer Science", score: "88.00%", condition: "> MIN (82.40%)", logic: "88.00 > 82.40", status: "Qualified" },
      ],
      explanation:
        "`> ANY` returns true if a student's score exceeds at least one value in the inner set, which is mathematically equivalent to exceeding the MINIMUM score.",
    },
    greater_than_all: {
      title: "3. > ALL (Greater than MAX of Subquery)",
      badge: "> ALL (Universal)",
      badgeColor: "amber",
      sqlQuery: `-- Finding students whose score exceeds ALL students in Computer Science:
-- Inner Subquery: CS Scores are [88.00%, 94.50%].
-- Logic: '> ALL' means strictly greater than the MAXIMUM (94.50%).

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct > ALL (
    SELECT exam_score_pct 
    FROM students 
    WHERE dept_id = 1
);`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", score: "96.20%", condition: "> MAX (94.50%)", logic: "96.20 > 94.50", status: "Top Performer" },
      ],
      explanation:
        "`> ALL` requires the candidate score to be strictly greater than every single element in the subquery set, which is mathematically equivalent to exceeding the MAXIMUM.",
    },
    not_in_null_trap_defense: {
      title: "4. The NOT IN NULL Poisoning Trap & Defense",
      badge: "NULL Defense",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BUGGY QUERY (Fails silently if subquery contains ANY NULL!):
-- If subquery returns [101, 102, NULL], 'NOT IN' evaluates to UNKNOWN for all rows -> EMPTY SET!
-- SELECT * FROM courses WHERE course_id NOT IN (SELECT course_id FROM enrollments);

-- ✅ DEFENSIVE REFACTORED QUERY (Explicit NULL filtration):
SELECT 
    c.course_id,
    c.course_code,
    c.course_title,
    c.base_fee_inr
FROM courses c
WHERE c.course_id NOT IN (
    SELECT course_id 
    FROM enrollments 
    WHERE course_id IS NOT NULL
);`,
      resultRows: [
        { id: "CRS-301", name: "Rust Systems Programming", detail: "Advanced Elective", score: "₹18,000.00", condition: "Zero Active Enrollments", logic: "IS NOT NULL Protected", status: "Unenrolled Course" },
        { id: "CRS-302", name: "Quantum Computing Foundations", detail: "Advanced Elective", score: "₹24,000.00", condition: "Zero Active Enrollments", logic: "IS NOT NULL Protected", status: "Unenrolled Course" },
      ],
      explanation:
        "In SQL three-valued logic, `val NOT IN (..., NULL)` evaluates to `UNKNOWN`, returning 0 rows. Adding `WHERE col IS NOT NULL` or using `NOT EXISTS` prevents silent data omission.",
    },
  };

  const navItems = [
    { id: "multi-row-concept", label: "1. Multi-Row Operators" },
    { id: "any-all-rules", label: "2. ANY vs ALL Mathematical Rules" },
    { id: "svg-diagrams", label: "3. Flow & NULL Trap SVGs" },
    { id: "interactive-sandbox", label: "4. Live Multi-Row Workbench" },
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
            <span>Topic 2 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Multi-Row Set Operations
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Multiple-Row Subqueries: IN, NOT IN, ANY, ALL
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master column-level set comparisons. Unlock the mathematical mechanics of <code className="text-cyan-300 font-mono">IN</code>, <code className="text-cyan-300 font-mono">ANY/SOME</code>, and <code className="text-cyan-300 font-mono">ALL</code>, and guard production systems against the catastrophic <code className="text-rose-300 font-mono">NOT IN with NULL</code> poisoning trap.
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
        {/* SECTION 1: Concepts */}
        <section id="multi-row-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Multi-Row Set Comparison Operators
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing scalar attributes against dynamic 1-dimensional column lists ($N \times 1$).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🟢</span> IN
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates to TRUE if the value matches AT LEAST ONE element in the list. Equivalent to <code className="text-emerald-300 font-mono">= ANY</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔵</span> ANY / SOME
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Existential test: <code className="text-cyan-300 font-mono">&gt; ANY</code> means greater than the MINIMUM value; <code className="text-cyan-300 font-mono">&lt; ANY</code> means less than the MAXIMUM value.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🟡</span> ALL
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Universal test: <code className="text-amber-300 font-mono">&gt; ALL</code> means greater than the MAXIMUM value; <code className="text-amber-300 font-mono">&lt; ALL</code> means less than the MINIMUM value.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🔴</span> NOT IN
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                True if value does not match ANY element. Catastrophically fails if the list contains even a single NULL!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Rules */}
        <section id="any-all-rules" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Mathematical Equivalence Cheat-Sheet
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Quick reference rules for evaluating ANY and ALL operator conditions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Operator Expression</th>
                  <th className="py-3.5 px-4 text-emerald-400">Mathematical Translation</th>
                  <th className="py-3.5 px-4 text-amber-400">Equivalent Syntax</th>
                  <th className="py-3.5 px-4 text-white">Behavior on Empty Subquery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300">= ANY (subquery)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Matches at least one value in set</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">IN (subquery)</td>
                  <td className="py-3 px-4 text-rose-300 font-sans">Evaluates to FALSE</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300">&gt; ANY (subquery)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Greater than the MINIMUM value in set</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">&gt; (SELECT MIN(col) ...)</td>
                  <td className="py-3 px-4 text-rose-300 font-sans">Evaluates to FALSE</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-amber-300">&gt; ALL (subquery)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Greater than the MAXIMUM value in set</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">&gt; (SELECT MAX(col) ...)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-bold">Evaluates to TRUE (Vacuous)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-rose-300">&lt;&gt; ALL (subquery)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Does not match any value in set</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NOT IN (subquery)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-bold">Evaluates to TRUE (Vacuous)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Multi-Row Evaluation & NOT IN NULL Trap
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing existential sets against the three-valued logic NULL poisoning hazard.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: ANY vs ALL Mechanics */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> ANY (Min Threshold) vs ALL (Max Threshold)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Set Box */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Subquery Result Set</text>
                    <rect x="50" y="70" width="180" height="40" rx="4" fill="#0f172a" />
                    <text x="140" y="94" fill="#38bdf8" fontSize="10 font-mono" textAnchor="middle">[ 82.40, 88.00, 94.50 ]</text>
                  </g>

                  {/* > ANY Box */}
                  <g>
                    <rect x="310" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">&gt; ANY (Min Threshold)</text>
                    <rect x="325" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Score &gt; 82.40 (MIN)</text>
                    <text x="425" y="102" fill="#34d399" fontSize="8 font-bold" textAnchor="middle">3 Students Qualify</text>
                  </g>

                  {/* > ALL Box */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">&gt; ALL (Max Threshold)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#fcd34d" fontSize="9 font-mono" textAnchor="middle">Score &gt; 94.50 (MAX)</text>
                    <text x="705" y="102" fill="#fcd34d" fontSize="8 font-bold" textAnchor="middle">Only Top Student (96.20%)</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 250 80 L 310 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 540 80 L 590 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: NOT IN NULL Poisoning */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The NOT IN NULL Poisoning Hazard in SQL Logic
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Set with NULL */}
                  <g>
                    <rect x="30" y="30" width="260" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="160" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Inner Set with Single NULL</text>
                    <rect x="45" y="70" width="230" height="40" rx="4" fill="#0f172a" />
                    <text x="160" y="94" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">[ 101, 102, NULL ]</text>
                  </g>

                  {/* Expanded Logic */}
                  <g>
                    <rect x="340" y="30" width="480" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="580" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Expanded Boolean AND Chain</text>
                    <rect x="355" y="70" width="450" height="40" rx="4" fill="#1e293b" />
                    <text x="580" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">(5 != 101) AND (5 != 102) AND (5 != NULL)</text>
                    <text x="580" y="102" fill="#fca5a5" fontSize="8 font-bold" textAnchor="middle">TRUE AND TRUE AND UNKNOWN → UNKNOWN (0 Rows Returned!)</text>
                  </g>

                  {/* Flow Arrow */}
                  <path d="M 290 80 L 340 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Multi-Row Subquery Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test <code className="text-cyan-300 font-mono">IN</code>, <code className="text-cyan-300 font-mono">&gt; ANY</code>, <code className="text-cyan-300 font-mono">&gt; ALL</code>, and the defensive <code className="text-cyan-300 font-mono">NOT IN</code> NULL fix live on student and course data.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(operatorScenarios).map(([key, item]) => {
              const isActive = selectedOperatorScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedOperatorScenario(key)}
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
                    {isActive ? "● Active Operator" : "○ Test Operator"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{operatorScenarios[selectedOperatorScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{operatorScenarios[selectedOperatorScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Multi-Row Set Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Set-Based Transformation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {operatorScenarios[selectedOperatorScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">ID / Code</th>
                    <th className="py-3 px-4 text-white">Student / Course</th>
                    <th className="py-3 px-4 text-emerald-400">Branch / Category</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Fee</th>
                    <th className="py-3 px-4 text-indigo-400">Operator Condition</th>
                    <th className="py-3 px-4 text-amber-400">Set Evaluation Logic</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {operatorScenarios[selectedOperatorScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.detail}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.condition}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.logic}</td>
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
              Real-world multi-row query refactoring in enterprise databases.
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
                  Eliminating the Silent "NOT IN with NULL" Bug on Orphan Course Audits
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui discovered that an academy audit query meant to find un-enrolled courses returned 0 rows despite having 15 empty courses. The culprit: a single test enrollment row with <code className="text-rose-300 font-mono">course_id = NULL</code> poisoned the entire <code className="text-rose-300 font-mono">NOT IN</code> evaluation! Adding <code className="text-emerald-300 font-mono">WHERE course_id IS NOT NULL</code> restored all 15 records immediately!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Silent Failure (Returns 0 rows if a single NULL exists):
SELECT course_title FROM courses WHERE course_id NOT IN (SELECT course_id FROM enrollments);

-- ✅ Safe Anti-Join with explicit IS NOT NULL guard:
SELECT course_title FROM courses WHERE course_id NOT IN (SELECT course_id FROM enrollments WHERE course_id IS NOT NULL);`}
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
              Avoid multi-column operand errors and NULL traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Selecting Multiple Columns in IN
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE student_id IN (SELECT * FROM ...)</code> throws <code className="text-rose-300 font-mono">Error 1241: Operand should contain 1 column(s)</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always project only the specific matching column in the subquery.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Prefer NOT EXISTS over NOT IN
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                <code className="text-emerald-400 font-mono">NOT EXISTS</code> evaluates boolean row existence and is mathematically immune to the three-valued logic NULL trap.
              </p>
              <div className="text-xs text-slate-400">
                The preferred pattern for enterprise anti-join queries.
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
              Key takeaways for multiple-row subqueries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Multi-Row Subquery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">IN</code> for set membership matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Remember: <code className="text-cyan-300 font-mono">&gt; ANY</code> = greater than MIN; <code className="text-cyan-300 font-mono">&gt; ALL</code> = greater than MAX.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always guard <code className="text-rose-300 font-mono">NOT IN</code> with <code className="text-cyan-300 font-mono">WHERE col IS NOT NULL</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Leverage semi-join materialization for $O(1)$ in-memory lookups.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Semi-Joins preventing row duplication...”</span>
                  When matching parent rows against children with multiple duplicates, <code className="text-cyan-300 font-mono">WHERE id IN (SELECT ...)</code> avoids row duplication without requiring expensive <code className="text-cyan-300 font-mono">DISTINCT</code> processing!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about NOT EXISTS for anti-joins...”</span>
                  In high-volume production tables, write anti-joins as <code className="text-cyan-300 font-mono">WHERE NOT EXISTS (SELECT 1 FROM ...)</code> for maximum safety and performance!
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
              Comprehensive reference questions covering multiple-row subqueries, IN, NOT IN, ANY/SOME, ALL operators, and NULL poisoning defense.
            </p>
          </div>

          <FAQTemplate
            title="Multiple-Row Subqueries FAQs"
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
            title="Multiple-Row Subqueries using IN, NOT IN, ANY/SOME, and ALL Operators"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="The 'NOT IN with NULL' trap is the number one interview and production bug in multi-row SQL. Every student must understand: if an inner query produces even one NULL, NOT IN evaluates to UNKNOWN for every single row, resulting in an empty set. Always filter out NULLs or use NOT EXISTS!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
