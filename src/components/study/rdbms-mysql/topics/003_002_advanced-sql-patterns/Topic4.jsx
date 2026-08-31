import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Boundary Value Functions: FIRST_VALUE(), LAST_VALUE(), and NTH_VALUE()
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on boundary value functions, FIRST_VALUE valedictorian benchmarks, the LAST_VALUE default frame trap, NTH_VALUE milestone extraction, and window frame expansion.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedBoundaryScenario, setSelectedBoundaryScenario] = useState("first_value_valedictorian");

  const boundaryScenarios = {
    first_value_valedictorian: {
      title: "1. FIRST_VALUE(): Department Valedictorian Benchmark",
      badge: "Valedictorian Benchmark",
      badgeColor: "emerald",
      sqlQuery: `-- Computing every student's score gap from their department's top scorer:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    -- Top Scorer Name:
    FIRST_VALUE(CONCAT(s.first_name, ' ', s.last_name)) OVER w AS dept_valedictorian,
    -- Top Scorer Score:
    FIRST_VALUE(s.exam_score_pct) OVER w AS top_score,
    -- Score Gap from Top:
    ROUND(FIRST_VALUE(s.exam_score_pct) OVER w - s.exam_score_pct, 2) AS gap_from_topper
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WINDOW w AS (PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC)
ORDER BY d.dept_name, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", currentScore: "94.50%", topper: "Mamata Hui (94.50%)", benchmark: "Topper #1", gap: "0.00% (Gold)", status: "CS Valedictorian" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", currentScore: "88.00%", topper: "Mamata Hui (94.50%)", benchmark: "Top Benchmark", gap: "6.50% behind", status: "CS Student" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", currentScore: "96.20%", topper: "Abhronila Saha (96.20%)", benchmark: "Topper #1", gap: "0.00% (Gold)", status: "IT Valedictorian" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", currentScore: "82.40%", topper: "Abhronila Saha (96.20%)", benchmark: "Top Benchmark", gap: "13.80% behind", status: "IT Student" },
      ],
      explanation:
        "`FIRST_VALUE(exam_score_pct)` extracts the top score in each department partition and attaches it to every student record, making delta gap calculations instantaneous.",
    },
    last_value_frame_trap_fix: {
      title: "2. The Infamous LAST_VALUE() Trap vs Expanded Frame Fix",
      badge: "LAST_VALUE Trap Fix",
      badgeColor: "rose",
      sqlQuery: `-- ⚠️ TRAP vs ✅ FIX in a single statement:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    -- ⚠️ TRAP: Default frame stops at CURRENT ROW, echoing the row's own score!
    LAST_VALUE(s.exam_score_pct) OVER (
        ORDER BY s.exam_score_pct DESC
    ) AS trap_last_value_echo,
    -- ✅ FIX: Explicitly expand frame across the ENTIRE partition!
    LAST_VALUE(s.exam_score_pct) OVER (
        ORDER BY s.exam_score_pct DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS true_lowest_score
FROM students s
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "All Students", currentScore: "96.20%", topper: "Trap: 96.20% (Echo!)", benchmark: "True Min: 82.40%", gap: "Fixed Frame Active", status: "True Last Fixed" },
        { id: "STU-101", name: "Mamata Hui", dept: "All Students", currentScore: "94.50%", topper: "Trap: 94.50% (Echo!)", benchmark: "True Min: 82.40%", gap: "Fixed Frame Active", status: "True Last Fixed" },
        { id: "STU-102", name: "Susmita Sen", dept: "All Students", currentScore: "88.00%", topper: "Trap: 88.00% (Echo!)", benchmark: "True Min: 82.40%", gap: "Fixed Frame Active", status: "True Last Fixed" },
        { id: "STU-104", name: "Debangshu Roy", dept: "All Students", currentScore: "82.40%", topper: "Trap: 82.40% (Echo!)", benchmark: "True Min: 82.40%", gap: "Fixed Frame Active", status: "True Last Fixed" },
      ],
      explanation:
        "Observe the trap column: Because the default frame stops at `CURRENT ROW`, `LAST_VALUE` blindly echoes the current row's own score! Adding `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` correctly returns 82.40% across all rows.",
    },
    nth_value_runner_up: {
      title: "3. NTH_VALUE(score, 2): Extracting Runner-Up Silver Scores",
      badge: "NTH_VALUE Milestone",
      badgeColor: "amber",
      sqlQuery: `-- Extracting the 2nd Highest Score (Runner-Up) with Expanded Framing:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    -- 2nd Highest Score in Department:
    NTH_VALUE(s.exam_score_pct, 2) OVER (
        PARTITION BY s.dept_id 
        ORDER BY s.exam_score_pct DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS runner_up_score
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY d.dept_name, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", currentScore: "94.50%", topper: "Topper: 94.50%", benchmark: "2nd Score: 88.00%", gap: "CS Silver Benchmark", status: "Gold" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", currentScore: "88.00%", topper: "Topper: 94.50%", benchmark: "2nd Score: 88.00%", gap: "CS Silver Benchmark", status: "Silver" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", currentScore: "96.20%", topper: "Topper: 96.20%", benchmark: "2nd Score: 82.40%", gap: "IT Silver Benchmark", status: "Gold" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", currentScore: "82.40%", topper: "Topper: 96.20%", benchmark: "2nd Score: 82.40%", gap: "IT Silver Benchmark", status: "Silver" },
      ],
      explanation:
        "`NTH_VALUE(exam_score_pct, 2)` extracts the second-highest score across the expanded partition, attaching the silver benchmark to every student record.",
    },
    initial_vs_latest_installment: {
      title: "4. Initial vs Latest Installment in Fee Payment History",
      badge: "Lifecycle Tracking",
      badgeColor: "cyan",
      sqlQuery: `-- Tracking opening vs newest payment installments for each student:
SELECT 
    p.payment_id,
    s.first_name AS student_name,
    p.payment_date,
    p.amount_paid_inr,
    -- Earliest Payment:
    FIRST_VALUE(p.amount_paid_inr) OVER w AS initial_installment_amount,
    -- Latest Payment:
    LAST_VALUE(p.amount_paid_inr) OVER w AS latest_installment_amount
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
WINDOW w AS (
    PARTITION BY p.student_id 
    ORDER BY p.payment_date ASC 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)
ORDER BY p.student_id, p.payment_date;`,
      resultRows: [
        { id: "PAY-101", name: "Mamata Hui", dept: "Installment #1", currentScore: "₹10,000.00", topper: "Initial: ₹10,000.00", benchmark: "Latest: ₹15,000.00", gap: "Fee Trajectory", status: "Opening" },
        { id: "PAY-102", name: "Mamata Hui", dept: "Installment #2", currentScore: "₹15,000.00", topper: "Initial: ₹10,000.00", benchmark: "Latest: ₹15,000.00", gap: "Fee Trajectory", status: "Closing" },
      ],
      explanation:
        "Using `FIRST_VALUE` and `LAST_VALUE` with `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` allows comparing initial and closing transaction values simultaneously.",
    },
  };

  const navItems = [
    { id: "boundary-concept", label: "1. Boundary Value Functions" },
    { id: "last-value-trap", label: "2. The LAST_VALUE Trap & Fix" },
    { id: "svg-diagrams", label: "3. Frame Boundary & NTH SVGs" },
    { id: "interactive-sandbox", label: "4. Live Boundary Workbench" },
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
            <span>Topic 4 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Positional Analytics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            FIRST_VALUE(), LAST_VALUE() &amp; NTH_VALUE()
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Extract precise boundary and positional milestones from partitions. Master Valedictorian benchmarks with <code className="text-cyan-300 font-mono">FIRST_VALUE</code>, conquer the <code className="text-rose-300 font-mono">LAST_VALUE</code> default frame trap, and extract arbitrary <code className="text-cyan-300 font-mono">NTH_VALUE</code> milestones.
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
        <section id="boundary-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Boundary Value Functions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Extracting top benchmarks, trailing minimums, and specific positional milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🥇</span> FIRST_VALUE(expr)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Returns the value from the 1st row of the frame. Used for comparing all records against the top performer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>⚠️</span> LAST_VALUE(expr)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Returns the last row of the frame. Requires expanded framing to avoid stopping at the current row!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🎯</span> NTH_VALUE(expr, N)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Returns the value from the $N$-th row of the frame. Ideal for extracting runner-up silver and bronze benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: LAST_VALUE Trap */}
        <section id="last-value-trap" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Infamous LAST_VALUE() Default Frame Trap
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why LAST_VALUE blindly echoes the current row and how to fix it with frame expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">⚠️ The Default Trap (Stops at CURRENT ROW)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-rose-300 border border-slate-800">
                LAST_VALUE(score) OVER (ORDER BY score DESC)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Default Frame: <code className="text-rose-400 font-mono">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. The last row in the frame is the CURRENT ROW, so it returns the row's own score!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">✅ The Expanded Frame Fix (Full Partition)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
                LAST_VALUE(score) OVER (ORDER BY score DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Expanded Frame: Covers the ENTIRE partition from start to finish, correctly broadcasting the true minimum score to all rows!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Frame Boundaries &amp; NTH Milestones
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing default sliding frames with fully expanded partition boundaries.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: LAST_VALUE Trap vs Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Default Frame (Echo Trap) vs Expanded Frame (True Min)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Default Frame */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Default Frame: UNBOUNDED PRECEDING → CURRENT ROW</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Last row of frame IS Current Row!</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">LAST_VALUE(score) returns row's own score (ECHO!)</text>
                  </g>

                  {/* Expanded Frame */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Expanded Frame: UNBOUNDED PRECEDING → FOLLOWING</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Frame spans entire partition from Top to Bottom</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">LAST_VALUE(score) correctly returns 82.40% everywhere!</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: NTH_VALUE Milestones */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> NTH_VALUE(score, N) Positional Extraction Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* N=1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">NTH_VALUE(score, 1) / FIRST</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="150" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Abhronila: 96.20%</text>
                    <text x="150" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Gold / Valedictorian</text>
                  </g>

                  {/* N=2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">NTH_VALUE(score, 2)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Mamata: 94.50%</text>
                    <text x="425" y="102" fill="#38bdf8" fontSize="7 font-bold" textAnchor="middle">Silver / Runner-Up</text>
                  </g>

                  {/* N=3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="700" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">NTH_VALUE(score, 3)</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="700" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Susmita: 88.00%</text>
                    <text x="700" y="102" fill="#38bdf8" fontSize="7 font-bold" textAnchor="middle">Bronze Milestone</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 580 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Boundary Functions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test FIRST_VALUE benchmarks, the LAST_VALUE trap fix, NTH_VALUE runner-up extraction, and installment tracking live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(boundaryScenarios).map(([key, item]) => {
              const isActive = selectedBoundaryScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBoundaryScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Boundary" : "○ Run Boundary Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{boundaryScenarios[selectedBoundaryScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{boundaryScenarios[selectedBoundaryScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Boundary Extraction Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Boundary Statement</span>
                <span className="text-emerald-400">Frame Expansion Active</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {boundaryScenarios[selectedBoundaryScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Department / Event</th>
                    <th className="py-3 px-4 text-cyan-400">Current Score / Fee</th>
                    <th className="py-3 px-4 text-indigo-400">FIRST_VALUE Topper</th>
                    <th className="py-3 px-4 text-amber-400">Positional Benchmark</th>
                    <th className="py-3 px-4 text-rose-400">Gap / Fixed Status</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {boundaryScenarios[selectedBoundaryScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.currentScore}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.topper}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.benchmark}</td>
                      <td className="py-3 px-4 text-rose-300 font-sans">{row.gap}</td>
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
              Real-world valedictorian benchmarks and frame bug fixes.
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
                  Fixing the LAST_VALUE Echo Bug in Fee Default Audits
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a critical bug in the fee management audit report: The query used <code className="text-rose-300 font-mono">LAST_VALUE(payment_date) OVER (PARTITION BY student_id ORDER BY payment_date)</code> to display each student's most recent payment date. Because the default frame stopped at the current row, it showed the current row's date instead of the latest! Adding <code className="text-emerald-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> solved the issue instantly.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Correctly extracting latest transaction date:
SELECT student_id, payment_date, 
       LAST_VALUE(payment_date) OVER (
           PARTITION BY student_id 
           ORDER BY payment_date 
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS latest_active_payment
FROM fee_payments;`}
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
              Avoid default frame traps and out-of-bounds NULL milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting Frame Expansion on LAST_VALUE / NTH_VALUE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code className="text-rose-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> causes LAST_VALUE to echo the current row and NTH_VALUE to return NULL for rows before position $N$.
              </p>
              <div className="text-xs text-slate-400">
                Rule of Thumb: Always expand the window frame when using LAST_VALUE or NTH_VALUE!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Named Windows for Shared Boundary Frames
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Declare an expanded named window once in the <code className="text-emerald-400 font-mono">WINDOW</code> clause and reference it across FIRST_VALUE, LAST_VALUE, and NTH_VALUE functions.
              </p>
              <div className="text-xs text-slate-400">
                Keeps queries clean and eliminates verbose frame repetitions.
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
              Key takeaways for boundary value functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Boundary Value Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">FIRST_VALUE()</code> to attach leading valedictorian benchmarks to every row.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always add <code className="text-cyan-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> to <code className="text-cyan-300 font-mono">LAST_VALUE()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">NTH_VALUE(col, 2)</code> to extract runner-up silver scores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Share expanded window frames using the <code className="text-cyan-300 font-mono">WINDOW</code> clause.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the difference between FIRST_VALUE and MAX...”</span>
                  `MAX()` finds the highest mathematical value regardless of order; `FIRST_VALUE()` evaluates strictly whichever row is positioned first by your `ORDER BY` clause!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about composite index support...”</span>
                  An index on `(dept_id, exam_score_pct DESC)` allows `FIRST_VALUE` and `LAST_VALUE` to execute in a single forward/backward index scan with zero disk sorting!
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
              Comprehensive reference questions covering FIRST_VALUE, LAST_VALUE, NTH_VALUE, the default frame trap, and window frame expansion.
            </p>
          </div>

          <FAQTemplate
            title="Boundary Value Functions FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Boundary Value Functions: FIRST_VALUE(), LAST_VALUE(), and NTH_VALUE()"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="The LAST_VALUE() default frame trap is one of the most common mistakes in analytical SQL interviews. Remember that whenever ORDER BY is present, the default frame stops at CURRENT ROW, making LAST_VALUE blindly return the current row's own score. Always explicitly specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING to expand the frame across the entire partition!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
