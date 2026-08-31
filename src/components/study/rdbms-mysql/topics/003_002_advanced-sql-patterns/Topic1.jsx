import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – The OVER Clause: Defining Partitions (PARTITION BY) and Order (ORDER BY)
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the OVER clause, PARTITION BY reset boundaries, ORDER BY sequence rules, cumulative running frames, and named window specifications.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedOverScenario, setSelectedOverScenario] = useState("partition_reset_boundaries");

  const overScenarios = {
    partition_reset_boundaries: {
      title: "1. PARTITION BY dept_id: Independent Group Boundaries",
      badge: "Partition Reset",
      badgeColor: "emerald",
      sqlQuery: `-- Partition calculations reset completely at each department boundary:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    -- Department Aggregate (Resets per department partition):
    ROUND(AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id), 2) AS dept_avg_score,
    -- Department Headcount (Resets per department partition):
    COUNT(s.student_id) OVER (PARTITION BY s.dept_id) AS dept_total_students
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY s.dept_id, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", partition: "CS Partition", metric1: "94.50%", metric2: "Avg: 91.25%", result: "2 CS Students", status: "CS Group" },
        { id: "STU-102", name: "Susmita Sen", partition: "CS Partition", metric1: "88.00%", metric2: "Avg: 91.25%", result: "2 CS Students", status: "CS Group" },
        { id: "STU-103", name: "Abhronila Saha", partition: "IT Partition (RESET!)", metric1: "96.20%", metric2: "Avg: 89.30%", result: "2 IT Students", status: "IT Group (Reset)" },
        { id: "STU-104", name: "Debangshu Roy", partition: "IT Partition", metric1: "82.40%", metric2: "Avg: 89.30%", result: "2 IT Students", status: "IT Group" },
      ],
      explanation:
        "The `PARTITION BY s.dept_id` establishes independent calculation partitions. When the engine finishes processing Computer Science, the accumulator resets completely before calculating Information Technology!",
    },
    static_vs_running_total_framing: {
      title: "2. The ORDER BY Side Effect: Static Total vs Cumulative Running Total",
      badge: "ORDER BY Framing Effect",
      badgeColor: "cyan",
      sqlQuery: `-- Demonstrating how adding ORDER BY shifts the default window frame:
SELECT 
    p.payment_id,
    s.first_name AS student_name,
    p.payment_date,
    p.amount_paid_inr,
    -- Without ORDER BY: Static Total across the ENTIRE partition:
    SUM(p.amount_paid_inr) OVER () AS static_total_revenue,
    -- With ORDER BY: Default shifts to CUMULATIVE RUNNING TOTAL up to current row!
    SUM(p.amount_paid_inr) OVER (ORDER BY p.payment_date) AS cumulative_running_revenue
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
ORDER BY p.payment_date ASC;`,
      resultRows: [
        { id: "PAY-01", name: "Mamata Hui", partition: "2026-06-01", metric1: "₹25,000.00", metric2: "Static: ₹65,000.00", result: "Running: ₹25,000.00", status: "Base Step" },
        { id: "PAY-02", name: "Susmita Sen", partition: "2026-06-05", metric1: "₹18,000.00", metric2: "Static: ₹65,000.00", result: "Running: ₹43,000.00", status: "Accumulating" },
        { id: "PAY-03", name: "Abhronila Saha", partition: "2026-06-10", metric1: "₹22,000.00", metric2: "Static: ₹65,000.00", result: "Running: ₹65,000.00", status: "Fully Accumulated" },
      ],
      explanation:
        "Without `ORDER BY`, `SUM()` computes the static total of ₹65,000 on every row. Adding `ORDER BY p.payment_date` automatically changes the default frame to `UNBOUNDED PRECEDING TO CURRENT ROW`, calculating a cumulative running total!",
    },
    multi_column_composite_partitions: {
      title: "3. Multi-Column Partitions: PARTITION BY city, dept_id",
      badge: "Composite Partitions",
      badgeColor: "amber",
      sqlQuery: `-- Partitioning across multiple dimensions (Branch City AND Department):
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.city,
    d.dept_name,
    s.exam_score_pct,
    -- Average specific to that branch city AND department combination:
    ROUND(AVG(s.exam_score_pct) OVER (PARTITION BY s.city, s.dept_id), 2) AS city_dept_avg_score
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY s.city, d.dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", partition: "Barrackpore • CS", metric1: "94.50%", metric2: "Partition Size: 1", result: "Avg: 94.50%", status: "Exact Segment" },
        { id: "STU-103", name: "Abhronila Saha", partition: "Barrackpore • IT", metric1: "96.20%", metric2: "Partition Size: 1", result: "Avg: 96.20%", status: "Exact Segment" },
        { id: "STU-102", name: "Susmita Sen", partition: "Ichapur • CS", metric1: "88.00%", metric2: "Partition Size: 1", result: "Avg: 88.00%", status: "Exact Segment" },
        { id: "STU-104", name: "Debangshu Roy", partition: "Kolkata • IT", metric1: "82.40%", metric2: "Partition Size: 1", result: "Avg: 82.40%", status: "Exact Segment" },
      ],
      explanation:
        "Specifying multiple partition columns (`PARTITION BY s.city, s.dept_id`) groups rows by the composite pair, allowing granular localized benchmarking.",
    },
    named_windows_clause_dry: {
      title: "4. Named Windows with WINDOW Clause (DRY Architecture)",
      badge: "Named Windows (DRY)",
      badgeColor: "rose",
      sqlQuery: `-- Defining a single reusable window definition for multiple analytic functions:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    -- Reusing Named Window 'w_dept_ranked':
    ROW_NUMBER() OVER w_dept_ranked AS dept_row_num,
    RANK() OVER w_dept_ranked AS dept_standard_rank,
    DENSE_RANK() OVER w_dept_ranked AS dept_dense_rank,
    -- Reusing Named Window 'w_dept_static':
    ROUND(AVG(s.exam_score_pct) OVER w_dept_static, 2) AS dept_avg_score
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
-- The WINDOW Clause defines clean reusable specifications:
WINDOW 
    w_dept_ranked AS (PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC),
    w_dept_static AS (PARTITION BY s.dept_id)
ORDER BY d.dept_name, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", partition: "CS (Window w)", metric1: "Score: 94.50%", metric2: "Dense Rank: 1", result: "Dept Avg: 91.25%", status: "Reused 4x" },
        { id: "STU-102", name: "Susmita Sen", partition: "CS (Window w)", metric1: "Score: 88.00%", metric2: "Dense Rank: 2", result: "Dept Avg: 91.25%", status: "Reused 4x" },
        { id: "STU-103", name: "Abhronila Saha", partition: "IT (Window w)", metric1: "Score: 96.20%", metric2: "Dense Rank: 1", result: "Dept Avg: 89.30%", status: "Reused 4x" },
      ],
      explanation:
        "The `WINDOW` clause defines named windows (`w_dept_ranked` and `w_dept_static`) once at the bottom of the query. Multiple SELECT columns reference them with `OVER w`, eliminating code duplication.",
    },
  };

  const navItems = [
    { id: "over-concept", label: "1. The OVER Clause Structure" },
    { id: "partition-vs-order", label: "2. PARTITION BY vs ORDER BY" },
    { id: "svg-diagrams", label: "3. Partition Reset & Framing SVGs" },
    { id: "interactive-sandbox", label: "4. Live OVER Workbench" },
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
            <span>Topic 1 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Window Specifications
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            The OVER Clause: PARTITION BY & ORDER BY
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the precise mechanics of window definitions. Understand calculation boundary resets with <code className="text-cyan-300 font-mono">PARTITION BY</code>, cumulative frame activation via <code className="text-cyan-300 font-mono">ORDER BY</code>, and DRY named windows.
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
        <section id="over-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of the OVER Clause
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The OVER clause specifies partition boundaries, internal row sequences, and sliding frames.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. PARTITION BY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Divides rows into independent groups. State accumulators reset completely at the start of each new partition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2. ORDER BY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Controls internal row sequence and automatically activates the cumulative running frame up to the current row.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. Named WINDOW</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Defines reusable window specifications at the end of the query, eliminating duplicate code across multiple columns.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Partition vs Order */}
        <section id="partition-vs-order" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The ORDER BY Framing Effect (Static Total vs Running Total)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How adding ORDER BY changes the implicit window frame.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">Without ORDER BY: Whole-Partition Static Aggregate</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                SUM(amount) OVER (PARTITION BY dept_id)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implicit Frame: <code className="text-emerald-400 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>. Projects the exact static group sum onto every row.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">With ORDER BY: Cumulative Running Total</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                SUM(amount) OVER (PARTITION BY dept_id ORDER BY date)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implicit Frame: <code className="text-cyan-400 font-mono">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. Progressively accumulates sums up to the current row.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Partition State Resets & Running Frames
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing partition reset mechanics with sliding cumulative running frames.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Partition Reset */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> PARTITION BY State Reset at Department Boundaries
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Partition 1 (CS) */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Partition 1: Computer Science (CS)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Mamata Hui (94.5%) + Susmita Sen (88.0%)</text>
                    <text x="215" y="102" fill="#a7f3d0" fontSize="7 font-bold" textAnchor="middle">CS Average: 91.25% (Accumulator Active)</text>
                  </g>

                  {/* Partition 2 (IT) */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Partition 2: Information Tech (IT) [STATE RESET!]</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Abhronila Saha (96.2%) + Debangshu Roy (82.4%)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">IT Average: 89.30% (Independent Calculation)</text>
                  </g>

                  {/* Boundary Barrier */}
                  <path d="M 420 20 L 420 140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Cumulative Frame */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Cumulative Running Total Progression with ORDER BY
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row 1: June 01 (₹25k)</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Frame: Row 1 Only</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Running Sum: ₹25,000.00</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row 2: June 05 (+₹18k)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Frame: Row 1 + Row 2</text>
                    <text x="425" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Running Sum: ₹43,000.00</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="700" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Row 3: June 10 (+₹22k)</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="700" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Frame: Rows 1 + 2 + 3</text>
                    <text x="700" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Running Sum: ₹65,000.00</text>
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
              4. Interactive OVER Clause Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test partition boundary resets, static vs running framing, multi-column composite partitions, and named window declarations live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(overScenarios).map(([key, item]) => {
              const isActive = selectedOverScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedOverScenario(key)}
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
                    {isActive ? "● Active Specification" : "○ Test Window Spec"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{overScenarios[selectedOverScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{overScenarios[selectedOverScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                OVER() Specification Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Window Query</span>
                <span className="text-emerald-400">Partition &amp; Order Spec</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {overScenarios[selectedOverScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Partition / Window</th>
                    <th className="py-3 px-4 text-cyan-400">Metric 1</th>
                    <th className="py-3 px-4 text-indigo-400">Metric 2</th>
                    <th className="py-3 px-4 text-amber-400">Calculated Partition Output</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {overScenarios[selectedOverScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.partition}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.metric1}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.metric2}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.result}</td>
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
              Real-world partition tuning and composite indexing.
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
                  Eliminating 'Using filesort' via Composite Partition-Order Indexes
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui optimized an analytical leaderboard query using <code className="text-cyan-300 font-mono">OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)</code>. Initially, `EXPLAIN` showed high-overhead temporary filesort sorting. Creating a composite B-Tree index on <code className="text-emerald-300 font-mono">students(dept_id, exam_score_pct DESC)</code> allowed MySQL to stream rows directly in pre-sorted partition order, eliminating filesort completely!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Composite Index perfectly matching OVER(PARTITION BY dept_id ORDER BY exam_score_pct DESC):
CREATE INDEX idx_student_dept_score ON students (dept_id, exam_score_pct DESC);

-- Execution Plan: 100% In-Memory Stream, 0 Filesort, 0 Temporary Disk Tables!`}
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
              Avoid accidental running frames and tie-breaking ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Accidental Running Frame with ORDER BY
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Adding <code className="text-rose-300 font-mono">ORDER BY</code> to <code className="text-rose-300 font-mono">SUM() OVER (...)</code> converts a static group total into a cumulative running total without warning.
              </p>
              <div className="text-xs text-slate-400">
                Fix: If you want a static total with ordered results, omit ORDER BY from OVER() and place it in the outer query.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Deterministic Tie-Breaking
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always include the primary key as a secondary tie-breaker in <code className="text-emerald-400 font-mono">ORDER BY score DESC, student_id ASC</code> to guarantee deterministic ranking orders.
              </p>
              <div className="text-xs text-slate-400">
                Prevents arbitrary flip-flopping of tied ranks.
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
              Key takeaways for the OVER clause.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> OVER Clause Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">PARTITION BY</code> to establish independent calculation subsets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Remember that adding <code className="text-cyan-300 font-mono">ORDER BY</code> activates cumulative running frames.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use the <code className="text-cyan-300 font-mono">WINDOW</code> clause to define reusable named window specifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Index <code className="text-cyan-300 font-mono">(partition_col, order_col)</code> to eliminate filesort overhead.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe window inheritance...”</span>
                  In MySQL 8.0, a named window can inherit from another named window: <code className="text-cyan-300 font-mono">WINDOW w1 AS (PARTITION BY dept_id), w2 AS (w1 ORDER BY score DESC)</code>!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-column partition keys...”</span>
                  You can partition by any arbitrary combination of columns (e.g. `branch_city, dept_id, academic_year`) for multi-dimensional slicing!
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
              Comprehensive reference questions covering the OVER clause, PARTITION BY mechanics, ORDER BY sequence rules, and named windows.
            </p>
          </div>

          <FAQTemplate
            title="The OVER Clause FAQs"
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
            title="The OVER Clause: Defining Partitions (PARTITION BY) and Order (ORDER BY)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Understanding the interaction between PARTITION BY and ORDER BY is the key to unlocking window functions. Always be aware of the 'Running Frame Trap': the moment you add ORDER BY inside OVER(), MySQL automatically changes the frame from the whole partition to a cumulative running total up to the current row. If you want a static total, omit ORDER BY from the OVER() clause!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
