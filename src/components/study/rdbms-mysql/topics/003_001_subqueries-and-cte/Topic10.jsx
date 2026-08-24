import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Recursive CTEs: Anchor Member, Recursive Member, and Termination Condition
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on recursive CTEs, anchor/recursive member mechanics, termination conditions, and infinite loop protection.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedRecursiveScenario, setSelectedRecursiveScenario] = useState("integer_sequence_generator");

  const recursiveScenarios = {
    integer_sequence_generator: {
      title: "1. Integer Sequence Generator (1 to 10)",
      badge: "Sequence Generator",
      badgeColor: "emerald",
      sqlQuery: `-- Generating an Integer Sequence from 1 to 10:
WITH RECURSIVE NumberSeries AS (
    -- 1. Anchor Member (Iteration 0 Seed):
    SELECT 1 AS num
    
    UNION ALL
    
    -- 2. Recursive Member (Iterative Transformation):
    SELECT num + 1 
    FROM NumberSeries 
    -- 3. Termination Condition (Halting Predicate):
    WHERE num < 10
)
SELECT num, (num * 100) AS scaled_metric 
FROM NumberSeries;`,
      resultRows: [
        { iteration: "Iter #0 (Anchor)", value: "1", mathOp: "Seed Base Case", condition: "1 < 10 (True)", outputVal: "1 (Scaled: 100)", status: "Base Step" },
        { iteration: "Iter #1", value: "2", mathOp: "1 + 1", condition: "2 < 10 (True)", outputVal: "2 (Scaled: 200)", status: "Iterating" },
        { iteration: "Iter #2", value: "3", mathOp: "2 + 1", condition: "3 < 10 (True)", outputVal: "3 (Scaled: 300)", status: "Iterating" },
        { iteration: "Iter #9", value: "10", mathOp: "9 + 1", condition: "10 < 10 (False -> HALT)", outputVal: "10 (Scaled: 1000)", status: "Terminated" },
      ],
      explanation:
        "The Anchor Member seeds `num = 1`. Each recursive iteration evaluates `num + 1` until `num < 10` becomes false, producing an empty set and halting recursion.",
    },
    calendar_date_series: {
      title: "2. Consecutive Academy Calendar Date Generator",
      badge: "Date Series",
      badgeColor: "cyan",
      sqlQuery: `-- Generating 10 consecutive academy calendar dates for September 2026:
WITH RECURSIVE ExamCalendar AS (
    -- Anchor Member: Starting date (Seed):
    SELECT CAST('2026-09-01' AS DATE) AS exam_date
    
    UNION ALL
    
    -- Recursive Member: Increment by 1 Day:
    SELECT DATE_ADD(exam_date, INTERVAL 1 DAY)
    FROM ExamCalendar
    -- Termination Condition:
    WHERE exam_date < '2026-09-10'
)
SELECT 
    exam_date,
    DAYNAME(exam_date) AS day_name,
    'Scheduled Exam Slot' AS session_status
FROM ExamCalendar;`,
      resultRows: [
        { iteration: "Iter #0 (Anchor)", value: "2026-09-01", mathOp: "Starting Seed Date", condition: "Date < 2026-09-10", outputVal: "Tuesday", status: "Base Date" },
        { iteration: "Iter #1", value: "2026-09-02", mathOp: "+1 Day Increment", condition: "Date < 2026-09-10", outputVal: "Wednesday", status: "Active Day" },
        { iteration: "Iter #9", value: "2026-09-10", mathOp: "+1 Day Increment", condition: "Date < 2026-09-10 (False)", outputVal: "Thursday", status: "Final Date" },
      ],
      explanation:
        "Generates a complete continuous calendar series. Joining this against student attendance logs immediately identifies missing attendance days (Gap Analysis).",
    },
    geometric_powers_of_two: {
      title: "3. Geometric Progression: Exponential Powers of 2",
      badge: "Geometric Growth",
      badgeColor: "amber",
      sqlQuery: `-- Computing 2^0 through 2^8 in pure declarative SQL:
WITH RECURSIVE PowersOfTwo AS (
    -- Anchor Member: 2^0 = 1:
    SELECT 0 AS exponent, 1 AS power_value
    
    UNION ALL
    
    -- Recursive Member: Double the value and increment exponent:
    SELECT exponent + 1, power_value * 2
    FROM PowersOfTwo
    WHERE exponent < 8
)
SELECT 
    exponent, 
    CONCAT('2^', exponent) AS formula, 
    power_value 
FROM PowersOfTwo;`,
      resultRows: [
        { iteration: "Iter #0 (Anchor)", value: "2^0", mathOp: "Seed: 1", condition: "0 < 8 (True)", outputVal: "1", status: "Base Exponent" },
        { iteration: "Iter #1", value: "2^1", mathOp: "1 * 2", condition: "1 < 8 (True)", outputVal: "2", status: "Doubled" },
        { iteration: "Iter #2", value: "2^2", mathOp: "2 * 2", condition: "2 < 8 (True)", outputVal: "4", status: "Doubled" },
        { iteration: "Iter #8", value: "2^8", mathOp: "128 * 2", condition: "8 < 8 (False)", outputVal: "256", status: "Final Exponent" },
      ],
      explanation:
        "Maintains two accumulating variables (`exponent` and `power_value`) simultaneously across recursive iterations, demonstrating multi-column state propagation.",
    },
    alphabet_character_stepping: {
      title: "4. Alphabet Character Stepping via ASCII Codes",
      badge: "Character Stepping",
      badgeColor: "rose",
      sqlQuery: `-- Generating Alphabet Series ('A' to 'H') via ASCII Code Stepping:
WITH RECURSIVE AlphabetSeries AS (
    -- Anchor Member: ASCII 65 = 'A' (Cast to CHAR(1) for type safety):
    SELECT 65 AS ascii_code, CAST('A' AS CHAR(1)) AS char_symbol
    
    UNION ALL
    
    -- Recursive Member: Increment ASCII code:
    SELECT ascii_code + 1, CHAR(ascii_code + 1)
    FROM AlphabetSeries
    WHERE ascii_code < 72 -- Halts after 'H' (72)
)
SELECT ascii_code, char_symbol, CONCAT('Section-', char_symbol) AS cohort_code
FROM AlphabetSeries;`,
      resultRows: [
        { iteration: "Iter #0 (Anchor)", value: "ASCII 65", mathOp: "CHAR(65) = 'A'", condition: "65 < 72 (True)", outputVal: "Section-A", status: "Seed Letter" },
        { iteration: "Iter #1", value: "ASCII 66", mathOp: "CHAR(66) = 'B'", condition: "66 < 72 (True)", outputVal: "Section-B", status: "Next Letter" },
        { iteration: "Iter #7", value: "ASCII 72", mathOp: "CHAR(72) = 'H'", condition: "72 < 72 (False)", outputVal: "Section-H", status: "Final Letter" },
      ],
      explanation:
        "Increments ASCII codes iteratively to generate alphabet series. Demonstrates the critical `CAST('A' AS CHAR(1))` pattern in the Anchor Member.",
    },
  };

  const navItems = [
    { id: "recursive-concept", label: "1. The 3 Recursive Pillars" },
    { id: "engine-mechanics", label: "2. Working Table Mechanics" },
    { id: "svg-diagrams", label: "3. Anatomy & Working Table SVGs" },
    { id: "interactive-sandbox", label: "4. Live Recursive Workbench" },
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
            <span>Topic 10 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Iterative SQL Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Recursive CTEs: Anchor, Recursive & Termination
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the mechanics of iterative SQL. Understand Anchor Members, <code className="text-cyan-300 font-mono">UNION ALL</code> pipelines, Recursive Members with bulletproof termination conditions, and infinite loop protection.
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
        <section id="recursive-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Essential Anatomical Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The mandatory structural components required for safe, finite SQL recursion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🌱</span> 1. Anchor Member (Base Case)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes once during Iteration 0 to generate initial seed records and establish output column types and widths.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔗</span> 2. UNION ALL Connector
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects the base case with iterative steps. <code className="text-cyan-300 font-mono">UNION ALL</code> avoids expensive per-iteration sorting and deduplication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🛑</span> 3. Recursive Member & Termination
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                References the CTE name and transforms rows from the previous iteration. The <code className="text-amber-300 font-mono">WHERE</code> clause halts recursion when 0 rows match.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Engine Mechanics */}
        <section id="engine-mechanics" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Working Table & Accumulator Table Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the MySQL internal execution engine processes recursive steps in memory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">Iter 0: Seed</span>
              <p className="text-slate-400 font-sans">Run Anchor Member → writes seed [ 1 ] to Working &amp; Accumulator table.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">Iter 1: Step</span>
              <p className="text-slate-400 font-sans">Run Recursive Member on Working Table → writes [ 2 ] to both tables.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block text-sm">Iter k: Loop</span>
              <p className="text-slate-400 font-sans">Repeats step-by-step until WHERE condition evaluates to FALSE.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">Final: Output</span>
              <p className="text-slate-400 font-sans">Working table empty → Engine reads complete output from Accumulator table.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Recursive Anatomy & Engine Memory Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing recursive query structure against internal memory table swaps.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Recursive Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 3 Structural Pillars of a Recursive CTE
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Anchor */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Anchor Member (Base Case)</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="150" y="88" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">SELECT 1 AS num</text>
                    <text x="150" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Runs ONCE (Seed Value)</text>
                  </g>

                  {/* UNION ALL */}
                  <g>
                    <rect x="310" y="55" width="100" height="50" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="360" y="85" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">UNION ALL</text>
                  </g>

                  {/* Recursive Member */}
                  <g>
                    <rect x="450" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="635" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. Recursive Member &amp; Termination</text>
                    <rect x="465" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="635" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT num + 1 FROM NumberSeries</text>
                    <text x="635" y="102" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">WHERE num &lt; 10 (Halting Predicate)</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 310 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 410 80 L 450 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Working vs Accumulator Table */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Internal Engine Working Table & Accumulator Table Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Working Table */}
                  <g>
                    <rect x="30" y="30" width="360" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="210" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Working Table (Current Iteration Rows)</text>
                    <rect x="45" y="70" width="330" height="40" rx="4" fill="#0f172a" />
                    <text x="210" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Iter 0: [ 1 ] → Iter 1: [ 2 ] → Iter 2: [ 3 ]</text>
                    <text x="210" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Overwritten each iteration; empty on termination</text>
                  </g>

                  {/* Accumulator Table */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Accumulator Table (Final Result Set)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Complete set returned to main query</text>
                  </g>

                  {/* Flow Arrow */}
                  <path d="M 390 80 L 440 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Recursive CTE Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test integer sequence generation, calendar date ranges, geometric powers of 2, and alphabet stepping live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(recursiveScenarios).map(([key, item]) => {
              const isActive = selectedRecursiveScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRecursiveScenario(key)}
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
                    {isActive ? "● Active Generator" : "○ Run Generator"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{recursiveScenarios[selectedRecursiveScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{recursiveScenarios[selectedRecursiveScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                WITH RECURSIVE Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Recursive SQL Query</span>
                <span className="text-emerald-400">Anchor + Iterative Member</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {recursiveScenarios[selectedRecursiveScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Iteration Step</th>
                    <th className="py-3 px-4 text-white">Current State Value</th>
                    <th className="py-3 px-4 text-emerald-400">Mathematical Operation</th>
                    <th className="py-3 px-4 text-indigo-400">Termination Condition</th>
                    <th className="py-3 px-4 text-amber-400">Accumulated Output</th>
                    <th className="py-3 px-4 text-emerald-400">Step Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {recursiveScenarios[selectedRecursiveScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.iteration}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.value}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.mathOp}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.condition}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.outputVal}</td>
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
              Real-world iterative generation and calendar gap analysis.
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
                  Detecting Student Attendance Gaps using Generated Calendar Series
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Attendance DB</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited student attendance records for Mamata, Susmita, Abhronila, and Debangshu. Missing attendance days are impossible to detect with standard `INNER JOIN`s because absent days have no rows! Generating a 30-day calendar series via a recursive CTE and `LEFT JOIN`ing against attendance logs immediately highlighted exact unrecorded dates!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Attendance Gap Analysis using Recursive Calendar Generator:
WITH RECURSIVE SeptemberCalendar AS (
    SELECT DATE('2026-09-01') AS cal_date
    UNION ALL
    SELECT DATE_ADD(cal_date, INTERVAL 1 DAY) FROM SeptemberCalendar WHERE cal_date < '2026-09-30'
)
SELECT c.cal_date, s.student_name, COALESCE(a.status, 'ABSENT / UNRECORDED') AS attendance_status
FROM SeptemberCalendar c
CROSS JOIN students s
LEFT JOIN attendance_logs a ON c.cal_date = a.log_date AND s.student_id = a.student_id
WHERE a.status IS NULL
ORDER BY s.student_name, c.cal_date;`}
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
              Avoid runaway infinite recursion and column truncation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> String Truncation in Anchor Members
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If the Anchor Member outputs <code className="text-rose-300 font-mono">'Root'</code> without casting, its column width is fixed to 4 characters. When downstream iterations append <code className="text-rose-300 font-mono">'Root-&gt;Child'</code>, values truncate silently!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always cast expanding strings: <code className="text-emerald-400 font-mono">CAST('Root' AS CHAR(255))</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Infinite Loop Protection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always ensure your Recursive Member has a rock-solid <code className="text-emerald-400 font-mono">WHERE</code> condition and rely on MySQL's <code className="text-emerald-400 font-mono">cte_max_recursion_depth</code> limit (default 1000) to protect production memory.
              </p>
              <div className="text-xs text-slate-400">
                Prevents runaway queries from locking database servers.
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
              Key takeaways for mastering recursive CTEs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Recursive CTE Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Declare using <code className="text-cyan-300 font-mono">WITH RECURSIVE cte_name AS (...)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Connect Anchor Member to Recursive Member with <code className="text-cyan-300 font-mono">UNION ALL</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Enforce a bulletproof <code className="text-cyan-300 font-mono">WHERE</code> termination condition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Cast expanding strings in the Anchor Member with <code className="text-cyan-300 font-mono">CAST(... AS CHAR(255))</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe cte_max_recursion_depth limit...”</span>
                  If your recursion legitimately requires traversing more than 1,000 steps, raise the limit using an optimizer hint: <code className="text-cyan-300 font-mono">/*+ SET_VAR(cte_max_recursion_depth = 5000) */</code>!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about calendar time-series tables...”</span>
                  Recursive CTEs eliminate the need for permanent auxiliary numbers/calendar tables in your database schema!
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
              Comprehensive reference questions covering recursive CTEs, anchor members, recursive members, termination conditions, and infinite loop protection.
            </p>
          </div>

          <FAQTemplate
            title="Recursive CTEs Fundamentals FAQs"
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
            title="Recursive CTEs: Anchor Member, Recursive Member, and Termination Condition"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Recursive CTEs unlock a completely new dimension of SQL programming. They allow declarative queries to generate sequences, dates, and mathematical progressions on the fly. When building recursive queries, always check two things: 1. Did you cast your anchor string columns to prevent truncation? 2. Is your WHERE termination condition mathematically guaranteed to halt? Master these two rules and you will write robust recursive SQL."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
