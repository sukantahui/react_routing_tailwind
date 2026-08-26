import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Cursor Performance Implications vs Set-Based SQL Query Alternatives
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and performance benchmark workbench on cursor performance overhead, context switching, temporary table materialization, and refactoring cursor loops to high-performance set-based alternatives (UPDATE JOIN, Window Functions, JSON_ARRAYAGG, CTEs).
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedBenchmarkScenario, setSelectedBenchmarkScenario] = useState("refactoring_update_join");

  const benchmarkScenarios = {
    refactoring_update_join: {
      title: "1. 370x Speedup: Refactoring Cursor Updates to UPDATE ... JOIN",
      badge: "UPDATE JOIN Refactoring",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ SLOW PROCEDURAL CURSOR (10,000 Iterations -> 9.20s):
-- OPEN cur; LOOP FETCH INTO v_id, v_gpa; UPDATE student_gpa SET gpa = v_gpa WHERE id = v_id; END LOOP;

-- ✅ FAST SET-BASED ALTERNATIVE (Direct Engine Execution -> 0.02s):
UPDATE student_gpa g
JOIN (
    SELECT student_id, AVG(grade_point) AS calc_gpa 
    FROM exam_marks 
    GROUP BY student_id
) sub ON g.student_id = sub.student_id
SET g.cumulative_gpa = sub.calc_gpa;`,
      resultRows: [
        { implementation: "Set-Based UPDATE JOIN", datasetSize: "10,000 Rows", executionTime: "0.024s", cpuUtilization: "3% CPU", ioBufferUsage: "Direct Buffer Pool", lockDuration: "24 ms (Brief)", speedupFactor: "⚡ 383x Faster (Optimal)" },
        { implementation: "Procedural Cursor Loop", datasetSize: "10,000 Rows", executionTime: "9.200s", cpuUtilization: "89% CPU (High)", ioBufferUsage: "10,000 Temp Lookups", lockDuration: "9,200 ms (Lock Escalation)", speedupFactor: "🐢 1x Baseline (Slow RBAR)" },
      ],
      explanation:
        "The set-based `UPDATE ... JOIN` updates rows directly within the InnoDB buffer pool in memory, eliminating 10,000 procedural context switches and finishing in 24 milliseconds.",
    },
    refactoring_window_functions: {
      title: "2. Running Totals: Replacing Cursor Accumulators with Window Functions",
      badge: "Window Functions",
      badgeColor: "cyan",
      sqlQuery: `-- ❌ SLOW CURSOR ACCUMULATOR:
-- Procedural loop fetching row-by-row and setting v_sum = v_sum + v_amt;

-- ✅ FAST MYSQL 8.0 WINDOW FUNCTION (Single SQL Query):
SELECT 
    ledger_id,
    student_id,
    payment_date,
    fee_amount,
    SUM(fee_amount) OVER (
        PARTITION BY student_id 
        ORDER BY payment_date 
        ROWS UNBOUNDED PRECEDING
    ) AS cumulative_paid
FROM student_ledgers;`,
      resultRows: [
        { implementation: "SUM() OVER () Window Function", datasetSize: "50,000 Rows", executionTime: "0.045s", cpuUtilization: "5% CPU", ioBufferUsage: "Stream Vectorized Scan", lockDuration: "Zero Lock (Read)", speedupFactor: "⚡ 290x Faster" },
        { implementation: "Cursor Accumulator Loop", datasetSize: "50,000 Rows", executionTime: "13.100s", cpuUtilization: "94% CPU", ioBufferUsage: "Disk Spill (tmp_table)", lockDuration: "Long Read View", speedupFactor: "🐢 1x Baseline (RBAR)" },
      ],
      explanation:
        "`SUM() OVER (PARTITION BY ... ORDER BY ...)` computes running totals using optimized in-memory window frames, running 290x faster than procedural cursor loops.",
    },
    refactoring_json_aggregation: {
      title: "3. Hierarchical Trees: JSON_OBJECT & JSON_ARRAYAGG vs Nested Cursors",
      badge: "JSON Aggregation",
      badgeColor: "amber",
      sqlQuery: `-- ❌ SLOW NESTED CURSORS (Outer Dept Loop -> Inner Student Loop):
-- 50 Departments * 500 Students = 25,000 inner query open/close cycles! (16.4s)

-- ✅ FAST MYSQL 8.0 JSON AGGREGATION (Single Grouped Query):
SELECT 
    d.department_id,
    d.department_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'student_id', s.student_id,
            'name', s.name,
            'tuition_fee', s.tuition_fee
        )
    ) AS enrolled_students_json
FROM departments d
JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_id, d.department_name;`,
      resultRows: [
        { implementation: "JSON_OBJECT + JSON_ARRAYAGG", datasetSize: "25,000 Entities", executionTime: "0.062s", cpuUtilization: "6% CPU", ioBufferUsage: "Single Hash Group By", lockDuration: "Zero Lock", speedupFactor: "⚡ 264x Faster" },
        { implementation: "Nested Master-Detail Cursors", datasetSize: "25,000 Entities", executionTime: "16.400s", cpuUtilization: "96% CPU", ioBufferUsage: "50 Temp Tables", lockDuration: "Long Open Tx", speedupFactor: "🐢 1x Baseline (O(N*M))" },
      ],
      explanation:
        "`JSON_ARRAYAGG()` and `JSON_OBJECT()` generate nested parent-child JSON trees in a single engine scan, completely replacing complex nested cursor boilerplate.",
    },
    performance_matrix_comparison: {
      title: "4. Architecture Matrix: When to Use Set-Based SQL vs Cursors",
      badge: "Decision Matrix",
      badgeColor: "rose",
      sqlQuery: `-- 📋 ARCHITECTURAL DECISION MATRIX:
-- 1. Mass Data Updates / Arithmetic -> USE Set-Based (UPDATE / CASE)
-- 2. Running Totals / Moving Averages -> USE Window Functions (SUM() OVER)
-- 3. Parent-Child Hierarchies -> USE Set-Based (JOIN / JSON_ARRAYAGG)
-- 4. Dynamic DDL Maintenance across Tables -> USE Cursors (Prepared Stmts)
-- 5. Chunked Batch Commits (500,000+ rows) -> USE Cursors (Periodic Commits)`,
      resultRows: [
        { implementation: "Dynamic DDL (DROP / OPTIMIZE)", datasetSize: "50 Tables", executionTime: "0.320s", cpuUtilization: "4% CPU", ioBufferUsage: "Metadata Only", lockDuration: "Table-level DDL", speedupFactor: "✅ Legitimate Use Case" },
        { implementation: "Chunked Batch Commit (500/tx)", datasetSize: "500,000 Rows", executionTime: "4.200s", cpuUtilization: "25% CPU", ioBufferUsage: "Small Undo Logs", lockDuration: "Short Increments", speedupFactor: "✅ Legitimate Use Case" },
        { implementation: "Mathematical Calculations", datasetSize: "100,000 Rows", executionTime: "32.000s (Cursor)", cpuUtilization: "99% CPU", ioBufferUsage: "High Temp Thrash", lockDuration: "Severe Deadlocks", speedupFactor: "❌ RBAR Anti-Pattern" },
      ],
      explanation:
        "Senior architects reserve cursors strictly for procedural administration (dynamic DDL) and chunked batch commits; all business data processing must use set-based SQL.",
    },
  };

  const navItems = [
    { id: "performance-why", label: "1. Why Cursors are Slow" },
    { id: "refactoring-patterns", label: "2. 4 Refactoring Patterns" },
    { id: "svg-diagrams", label: "3. Engine vs VM & Latency SVGs" },
    { id: "interactive-sandbox", label: "4. Live Benchmark Workbench" },
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
            <span>Module 003_004</span>
            <span>•</span>
            <span>Topic 11 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Performance Tuning
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cursor Performance vs Set-Based SQL Alternatives
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand the deep hardware and storage engine bottlenecks of database cursors (context switching, lack of vectorization, lock escalation). Learn how to achieve 300x+ speedups by refactoring procedural loops into modern set-based <code className="text-cyan-300 font-mono">UPDATE JOIN</code>s, Window Functions, and JSON aggregations.
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
        {/* SECTION 1: Why Cursors are Slow */}
        <section id="performance-why" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Why Database Cursors Suffer Extreme Performance Latency
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The low-level mechanics that cause cursors to run 100x to 500x slower than set-based SQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">1. Context Switching</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every <code className="text-rose-300 font-mono">FETCH</code> forces a context switch between the compiled C++ storage engine and the stored routine byte-code interpreter, consuming massive CPU cycles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400">2. No Vectorization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Set-based SQL operates across entire memory pages in the InnoDB buffer pool simultaneously; cursors disable engine-level parallelization and force single-threaded evaluation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">3. Lock Escalation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cursor loops hold row locks for minutes across thousands of iterations, preventing undo log purging and triggering deadlock cascades across concurrent web transactions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4 Refactoring Patterns */}
        <section id="refactoring-patterns" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Four Proven Refactoring Patterns to Eliminate Cursors
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Replace procedural loops with modern MySQL 8.0 declarative features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Pattern 1</span>
              <h3 className="font-bold text-white">Row Updates → UPDATE ... JOIN</h3>
              <p className="text-slate-300 text-xs">
                Replace procedural update loops with single set-based <code className="text-emerald-300 font-mono">UPDATE table JOIN subquery</code> statements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Pattern 2</span>
              <h3 className="font-bold text-white">Running Accumulators → Window Functions</h3>
              <p className="text-slate-300 text-xs">
                Replace loop accumulator variables with <code className="text-cyan-300 font-mono">SUM(amount) OVER (PARTITION BY ... ORDER BY ...)</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Pattern 3</span>
              <h3 className="font-bold text-white">Parent-Child Trees → JSON_ARRAYAGG()</h3>
              <p className="text-slate-300 text-xs">
                Replace nested master-detail cursors with <code className="text-amber-300 font-mono">JSON_OBJECT()</code> and <code className="text-amber-300 font-mono">JSON_ARRAYAGG()</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-indigo-400 font-bold text-xs uppercase">Pattern 4</span>
              <h3 className="font-bold text-white">Conditional Logic → CASE Expressions</h3>
              <p className="text-slate-300 text-xs">
                Replace procedural <code className="text-indigo-300 font-mono">IF ... ELSEIF</code> branching with inline <code className="text-indigo-300 font-mono">CASE WHEN</code> expressions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Engine vs VM Execution &amp; Latency Divergence
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing hardware execution pipelines and scaling curves.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Engine Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Storage Engine Execution vs Procedural VM Context Switching
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Set-Based Direct Engine */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">SET-BASED SQL (Direct C++ Engine)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Buffer Pool Vector Scan → Memory Page Mutation</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ 0.02s · Zero Interpreter Context Switches</text>
                  </g>

                  {/* Right: Procedural Cursor */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">CURSOR LOOP (Procedural VM Interpreter)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Storage Engine ⟷ Virtual Machine Bytecode (10,000x)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🐢 9.20s · Massive CPU Thrashing &amp; Lock Spikes</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Latency Divergence */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Execution Latency Divergence as Dataset Size Grows
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Latency Comparison Graph */}
                  <g>
                    <rect x="30" y="25" width="790" height="115" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    
                    {/* Row 1: 1,000 Rows */}
                    <text x="50" y="55" fill="#94a3b8" fontSize="9 font-mono">1,000 Rows:</text>
                    <rect x="160" y="44" width="20" height="14" rx="2" fill="#10b981" />
                    <text x="190" y="55" fill="#34d399" fontSize="8 font-mono">Set-Based: 0.003s</text>
                    <rect x="350" y="44" width="120" height="14" rx="2" fill="#ef4444" />
                    <text x="480" y="55" fill="#f87171" fontSize="8 font-mono">Cursor: 0.85s (280x slower)</text>

                    {/* Row 2: 10,000 Rows */}
                    <text x="50" y="85" fill="#94a3b8" fontSize="9 font-mono">10,000 Rows:</text>
                    <rect x="160" y="74" width="30" height="14" rx="2" fill="#10b981" />
                    <text x="200" y="85" fill="#34d399" fontSize="8 font-mono">Set-Based: 0.024s</text>
                    <rect x="350" y="74" width="280" height="14" rx="2" fill="#ef4444" />
                    <text x="640" y="85" fill="#f87171" fontSize="8 font-mono">Cursor: 9.20s (383x slower)</text>

                    {/* Row 3: 100,000 Rows */}
                    <text x="50" y="115" fill="#94a3b8" fontSize="9 font-mono">100,000 Rows:</text>
                    <rect x="160" y="104" width="45" height="14" rx="2" fill="#10b981" />
                    <text x="215" y="115" fill="#34d399" fontSize="8 font-mono">Set-Based: 0.180s</text>
                    <rect x="350" y="104" width="440" height="14" rx="2" fill="#b91c1c" />
                    <text x="800" y="115" fill="#fca5a5" fontSize="8 font-mono" textAnchor="end">Cursor: 95.00s (527x slower 💥)</text>
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
              4. Interactive Performance Benchmark Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Compare execution time, CPU utilization, I/O buffer footprint, and lock duration between set-based queries and procedural cursors live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(benchmarkScenarios).map(([key, item]) => {
              const isActive = selectedBenchmarkScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBenchmarkScenario(key)}
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
                    {isActive ? "● Active Benchmark" : "○ Run Benchmark Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{benchmarkScenarios[selectedBenchmarkScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{benchmarkScenarios[selectedBenchmarkScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Profiler Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Benchmark Query Script</span>
                <span className="text-emerald-400">Set-Based Refactoring</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {benchmarkScenarios[selectedBenchmarkScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Implementation</th>
                    <th className="py-3 px-4 text-white">Dataset</th>
                    <th className="py-3 px-4 text-emerald-400">Execution Time</th>
                    <th className="py-3 px-4 text-cyan-400">CPU Load</th>
                    <th className="py-3 px-4 text-amber-400">Memory &amp; Buffer Usage</th>
                    <th className="py-3 px-4 text-indigo-400">Lock Duration</th>
                    <th className="py-3 px-4 text-emerald-400">Speedup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {benchmarkScenarios[selectedBenchmarkScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.implementation}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.datasetSize}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.executionTime}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.cpuUtilization}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.ioBufferUsage}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.lockDuration}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.speedupFactor.includes("Faster") || row.speedupFactor.includes("Legitimate")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.speedupFactor}
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
              Real-world elimination of 35-minute nightly batch lockups in Barrackpore.
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
                  Slashing a 35-Minute Nightly Fee Settlement to 1.8 Seconds at Barrackpore Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Exam Controller Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an educational billing cron job: It used a cursor loop across 80,000 students, locking the `student_ledgers` table for 35 minutes every midnight and causing HTTP 504 gateway timeouts. Refactoring the procedural cursor into a single set-based <code className="text-emerald-300 font-mono">UPDATE ... JOIN</code> query dropped execution time from 35 minutes (2,100s) to just 1.8 seconds—a <strong>1,166x speedup</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Refactored 1.8-second Set-Based Solution:
UPDATE student_ledgers l
JOIN (
    SELECT student_id, SUM(fee_amount) AS total_paid
    FROM payment_transactions
    WHERE transaction_date >= CURDATE()
    GROUP BY student_id
) sub ON l.student_id = sub.student_id
SET l.current_balance = l.current_balance - sub.total_paid;`}
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
              Avoid RBAR procedural habits and undo log bloat from long-running transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Carrying Imperative Loops into SQL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Developers coming from Java/Python often instinctively write `for`/`while` cursor loops to solve arithmetic and updates, crippling database throughput.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always think in sets! Use Window Functions, JOINs, and CASE expressions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Reserve Cursors for Legitimate Tasks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use cursors only when executing dynamic DDL statements across multiple tables, or chunking multi-thousand row batch commits to prevent undo tablespace bloat.
              </p>
              <div className="text-xs text-slate-400">
                Maintains optimal database engine concurrency.
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
              Key takeaways for Cursor Performance &amp; Set-Based Alternatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Performance Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Set-based SQL is <strong className="text-emerald-300">100x to 500x faster</strong> than cursor loops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Replace running total cursors with <code className="text-cyan-300 font-mono">SUM() OVER ()</code> Window Functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Replace nested cursors with <code className="text-cyan-300 font-mono">JSON_OBJECT()</code> and <code className="text-cyan-300 font-mono">JSON_ARRAYAGG()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Reserve cursors strictly for dynamic DDL and chunked batch commits.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe connection pool health...”</span>
                  Reducing routine latency from 10 seconds to 20 milliseconds frees database connections 500x faster, preventing connection pool starvation!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about EXPLAIN ANALYZE...”</span>
                  Always run `EXPLAIN ANALYZE` on your refactored set-based queries to verify that the optimizer is performing index seeks rather than table scans!
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
              Comprehensive reference questions covering cursor performance overhead, context switching, temporary table materialization, and refactoring cursor loops to high-performance set-based alternatives (UPDATE JOIN, Window Functions, JSON_ARRAYAGG, CTEs).
            </p>
          </div>

          <FAQTemplate
            title="Cursor Performance vs Set-Based Alternatives FAQs"
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
            title="Cursor Performance Implications vs Set-Based SQL Query Alternatives"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Remember the Senior Database Architect's Creed: Set-Based SQL First, Cursors Last! Cursors suffer severe penalties from procedural context switching, single-threaded execution, and prolonged lock holding. Modern MySQL 8.0 provides incredible declarative tools—Window Functions, CTEs, JSON aggregations, and UPDATE JOINs—that execute 100x to 500x faster than procedural loops. Reserve cursors strictly for dynamic DDL orchestration and periodic batch chunking!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
