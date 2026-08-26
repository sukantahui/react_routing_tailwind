import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Using EXPLAIN ANALYZE for Real Execution Metrics (Execution Time, Row Counts, Loops)
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL 8.0.18+ EXPLAIN ANALYZE: real execution metrics, first-row vs all-rows timing, loop multipliers, total time calculations, and identifying optimizer estimation drift.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedAnalyzeScenario, setSelectedAnalyzeScenario] = useState("fast_index_lookup");

  const analyzeScenarios = {
    fast_index_lookup: {
      title: "1. Optimal Index Lookup: Fast Startup & Zero Overhead",
      badge: "Single Loop Index Lookup",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ EXPLAIN ANALYZE ON INDEX LOOKUP:
EXPLAIN ANALYZE 
SELECT student_id, name, balance 
FROM student_ledgers 
WHERE student_id = 101;

-- 📋 Real Execution Output:
-- -> Rows fetched before execution  (cost=0.00..0.00 rows=1) 
--    (actual time=0.000..0.000 rows=1 loops=1)
-- -> Point lookup on student_ledgers using PRIMARY (student_id=101)  
--    (cost=1.00 rows=1) (actual time=0.021..0.038 rows=1 loops=1)`,
      resultRows: [
        { node: "Point lookup on PRIMARY", estimatedCost: "cost=1.00", estimatedRows: "rows=1", actualFirstRow: "0.021 ms", actualAllRows: "0.038 ms", actualRowsPerLoop: "1", loops: "1", totalTime: "0.038 ms ⚡", status: "Optimal Const Fetch ✅" },
      ],
      explanation:
        "Point lookups on Primary Keys start immediately (first row in 0.021ms) and finish in 0.038ms with a single loop (`loops=1`), showing perfect alignment between optimizer estimates and reality.",
    },
    nested_loop_multiplier: {
      title: "2. Nested Loop Multiplication: Outer Rows × Inner Iterations",
      badge: "Loop Multiplier (loops=120)",
      badgeColor: "cyan",
      sqlQuery: `-- 🔄 EXPLAIN ANALYZE ON NESTED LOOP JOIN:
EXPLAIN ANALYZE 
SELECT s.name, e.course_name 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
WHERE s.city = 'Barrackpore';

-- 📋 Real Execution Output:
-- -> Nested loop inner join  (cost=28.40 rows=240) (actual time=0.082..1.850 rows=240 loops=1)
--     -> Index lookup on s using idx_city (city='Barrackpore')  (cost=12.20 rows=120) 
--        (actual time=0.045..0.210 rows=120 loops=1)
--     -> Index lookup on e using idx_student_id (student_id=s.student_id)  (cost=0.13 rows=2) 
--        (actual time=0.008..0.012 rows=2 loops=120)`,
      resultRows: [
        { node: "Root: Nested loop join", estimatedCost: "cost=28.40", estimatedRows: "rows=240", actualFirstRow: "0.082 ms", actualAllRows: "1.850 ms", actualRowsPerLoop: "240", loops: "1", totalTime: "1.850 ms", status: "Total Query Time ✅" },
        { node: "Outer: idx_city (students)", estimatedCost: "cost=12.20", estimatedRows: "rows=120", actualFirstRow: "0.045 ms", actualAllRows: "0.210 ms", actualRowsPerLoop: "120", loops: "1", totalTime: "0.210 ms", status: "Outer Driving Loop ✅" },
        { node: "Inner: idx_student_id (enrollments)", estimatedCost: "cost=0.13", estimatedRows: "rows=2", actualFirstRow: "0.008 ms", actualAllRows: "0.012 ms", actualRowsPerLoop: "2", loops: "120", totalTime: "1.440 ms (0.012 * 120)", status: "Inner Loop Multiplied 🔄" },
      ],
      explanation:
        "The inner index lookup node shows `actual time=0.008..0.012 rows=2 loops=120`. Because the outer loop produced 120 students, the inner node ran 120 times, yielding $2 \\times 120 = 240$ total rows in $0.012 \\times 120 = 1.44$ ms.",
    },
    optimizer_estimation_drift: {
      title: "3. Spotting Optimizer Estimation Drift: Estimate (5) vs Reality (50,000)",
      badge: "Severe Statistics Drift",
      badgeColor: "rose",
      sqlQuery: `-- 🚨 DETECTING OPTIMIZER ESTIMATION DRIFT:
EXPLAIN ANALYZE 
SELECT * FROM exam_submissions WHERE evaluation_status = 'PENDING';

-- 📋 Discrepancy in Execution Metrics:
-- -> Table scan on exam_submissions  (cost=1.25 rows=5) (actual time=0.095..48.350 rows=52400 loops=1)
--    Filter: (exam_submissions.evaluation_status = 'PENDING')  
--    (cost=1.25 rows=5) (actual time=0.090..44.120 rows=52400 loops=1)

-- 💥 ANALYSIS:
-- Optimizer Estimated Rows: 5 (Assumed status='PENDING' was rare!)
-- Actual Real Rows: 52,400 (Over 52,000 rows matched!)
-- 🚨 Root Cause: Outdated index cardinality in mysql.innodb_index_stats!`,
      resultRows: [
        { node: "Table scan on exam_submissions", estimatedCost: "cost=1.25", estimatedRows: "rows=5 ❌", actualFirstRow: "0.095 ms", actualAllRows: "48.350 ms", actualRowsPerLoop: "52,400 💥", loops: "1", totalTime: "48.350 ms", status: "Severe Drift Detected 🚨" },
      ],
      explanation:
        "When estimated rows (5) diverge by orders of magnitude from actual rows (52,400), the optimizer makes flawed plan decisions. Running `ANALYZE TABLE exam_submissions;` refreshes the statistics.",
    },
    filesort_temp_table_profile: {
      title: "4. Filesort & Temporary Table Execution Times",
      badge: "Sort & Temp Tables",
      badgeColor: "amber",
      sqlQuery: `-- ⏳ EXPLAIN ANALYZE ON UN-INDEXED GROUP BY & SORT:
EXPLAIN ANALYZE 
SELECT city, COUNT(*), AVG(score) 
FROM student_scores 
GROUP BY city 
ORDER BY AVG(score) DESC;

-- 📋 Real Execution Output:
-- -> Sort: AVG(score) DESC  (actual time=14.200..14.280 rows=15 loops=1)
--     -> Table scan on <temporary>  (actual time=12.100..12.120 rows=15 loops=1)
--         -> Aggregate using temporary table  (actual time=11.800..12.050 rows=15 loops=1)
--             -> Table scan on student_scores  (cost=1200.00 rows=10000) 
--                (actual time=0.080..8.450 rows=10000 loops=1)`,
      resultRows: [
        { node: "Sort: AVG(score) DESC", estimatedCost: "Filesort", estimatedRows: "rows=15", actualFirstRow: "14.200 ms", actualAllRows: "14.280 ms", actualRowsPerLoop: "15", loops: "1", totalTime: "14.280 ms", status: "High Startup Time ⏳" },
        { node: "Aggregate in Temp Table", estimatedCost: "Temp Hash", estimatedRows: "rows=15", actualFirstRow: "11.800 ms", actualAllRows: "12.050 ms", actualRowsPerLoop: "15", loops: "1", totalTime: "12.050 ms", status: "Temp Table Memory" },
        { node: "Scan on student_scores", estimatedCost: "cost=1200.00", estimatedRows: "rows=10000", actualFirstRow: "0.080 ms", actualAllRows: "8.450 ms", actualRowsPerLoop: "10,000", loops: "1", totalTime: "8.450 ms", status: "Base Table Scan" },
      ],
      explanation:
        "The sort iterator has a high startup time (14.20ms) because it cannot emit the first row until the child temporary table has scanned all 10,000 base rows and aggregated them in memory.",
    },
  };

  const navItems = [
    { id: "analyze-overview", label: "1. What is EXPLAIN ANALYZE?" },
    { id: "anatomy-metrics", label: "2. Anatomy of a Metric Node" },
    { id: "svg-diagrams", label: "3. Metrics & Drift SVGs" },
    { id: "interactive-sandbox", label: "4. Live ANALYZE Workbench" },
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
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 2 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Real Profiling
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            EXPLAIN ANALYZE: Real Execution Metrics
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the most powerful profiling tool in MySQL 8.0: <code className="text-cyan-300 font-mono">EXPLAIN ANALYZE</code>. Learn how to interpret time-to-first-row vs time-to-all-rows, multiply inner loop execution costs (<code className="text-cyan-300 font-mono">rows × loops</code>), and spot optimizer statistics drift.
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
        {/* SECTION 1: What is EXPLAIN ANALYZE? */}
        <section id="analyze-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is EXPLAIN ANALYZE? (MySQL 8.0.18+)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The real-time execution profiler capturing physical time, rows, and loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Actual Execution Profiling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike standard `EXPLAIN`, `EXPLAIN ANALYZE` actually executes the query on the database engine. It wraps every Volcano iterator with nanosecond hardware timers and counters to capture real runtime behavior.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">Read-Only Safety Restriction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `EXPLAIN ANALYZE` is restricted to `SELECT`, `TABLE`, and `VALUES` statements to prevent accidental execution of modifying DML queries during performance investigation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Anatomy of a Metric Node */}
        <section id="anatomy-metrics" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Anatomical Breakdown of an EXPLAIN ANALYZE Metric Node
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Dissecting the four core metrics provided for every iterator node in the tree.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Metric 1</span>
              <h3 className="font-bold text-white">Estimated (cost/rows)</h3>
              <p className="text-slate-300 text-xs">The optimizer's pre-execution mathematical cost and expected row count.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Metric 2</span>
              <h3 className="font-bold text-white">actual time (start..end)</h3>
              <p className="text-slate-300 text-xs">Elapsed time in ms to read the first row (`start`) and all rows (`end`) for 1 loop.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Metric 3</span>
              <h3 className="font-bold text-white">actual rows</h3>
              <p className="text-slate-300 text-xs">The average number of matching rows produced per loop iteration.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Metric 4</span>
              <h3 className="font-bold text-white">loops</h3>
              <p className="text-slate-300 text-xs">The total number of times this iterator node was executed by its parent.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Node Anatomy &amp; Statistics Drift Detection
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the timing metrics and detecting severe optimizer estimation errors.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Node Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Anatomical Structure of an EXPLAIN ANALYZE Node
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Container */}
                  <rect x="20" y="20" width="810" height="120" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="425" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle font-mono">
                    -&gt; Index lookup on s using idx_city (cost=12.20 rows=120) (actual time=0.045..0.210 rows=120 loops=1)
                  </text>

                  {/* 4 Callout Boxes */}
                  <g>
                    {/* Box 1: Estimates */}
                    <rect x="40" y="60" width="170" height="60" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                    <text x="125" y="80" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">1. OPTIMIZER ESTIMATE</text>
                    <text x="125" y="98" fill="#818cf8" fontSize="7 font-mono" textAnchor="middle">cost=12.20 rows=120</text>
                  </g>

                  <g>
                    {/* Box 2: First vs All Rows */}
                    <rect x="230" y="60" width="180" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="320" y="80" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">2. FIRST .. ALL ROWS TIME</text>
                    <text x="320" y="98" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">0.045ms (1st) .. 0.210ms (All)</text>
                  </g>

                  <g>
                    {/* Box 3: Actual Rows */}
                    <rect x="430" y="60" width="170" height="60" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
                    <text x="515" y="80" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">3. ROWS PER LOOP</text>
                    <text x="515" y="98" fill="#fbbf24" fontSize="7 font-mono" textAnchor="middle">rows=120 (Avg / Loop)</text>
                  </g>

                  <g>
                    {/* Box 4: Loop Count */}
                    <rect x="620" y="60" width="190" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="715" y="80" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">4. LOOP MULTIPLIER</text>
                    <text x="715" y="98" fill="#f87171" fontSize="7 font-mono" textAnchor="middle">loops=1 (Total Invocations)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Statistics Drift */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Detecting Optimizer Statistics Drift (Estimate vs Reality)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Optimizer Estimate */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">OPTIMIZER EXPECTATION</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Estimated rows = 5 · Low Cost Calculation</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Assumes status='PENDING' is extremely rare</text>
                  </g>

                  {/* Right: Actual Reality */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">ACTUAL REALITY (EXPLAIN ANALYZE)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Actual rows = 52,400 · Actual Time = 48.35ms</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🚨 10,000x Discrepancy → Stale Stats Alert!</text>
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
              4. Interactive EXPLAIN ANALYZE Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test fast index lookups, nested loop multipliers (`rows × loops`), optimizer estimation drift detection, and filesort execution profiles live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(analyzeScenarios).map(([key, item]) => {
              const isActive = selectedAnalyzeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAnalyzeScenario(key)}
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
                    {isActive ? "● Active Profile" : "○ Run ANALYZE Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{analyzeScenarios[selectedAnalyzeScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{analyzeScenarios[selectedAnalyzeScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                EXPLAIN ANALYZE Runtime
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Real Execution Query Profile</span>
                <span className="text-emerald-400">Hardware Instrumented Trace</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {analyzeScenarios[selectedAnalyzeScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Iterator Node</th>
                    <th className="py-3 px-4 text-slate-400">Est. Cost/Rows</th>
                    <th className="py-3 px-4 text-amber-400">1st Row Time</th>
                    <th className="py-3 px-4 text-emerald-400">All Rows Time</th>
                    <th className="py-3 px-4 text-white">Rows/Loop</th>
                    <th className="py-3 px-4 text-rose-400">Loops</th>
                    <th className="py-3 px-4 text-cyan-400">Total Node Time</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {analyzeScenarios[selectedAnalyzeScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.node}</td>
                      <td className="py-3 px-4 text-slate-400">{row.estimatedCost}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.actualFirstRow}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.actualAllRows}</td>
                      <td className="py-3 px-4 text-white">{row.actualRowsPerLoop}</td>
                      <td className="py-3 px-4 text-rose-300 font-bold">{row.loops}</td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">{row.totalTime}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Total") || row.status.includes("Outer") || row.status.includes("Inner")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
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
              Diagnosing 15-second report bottlenecks and nested loop multiplier traps in Barrackpore.
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
                  Uncovering a 15,000 Loop Multiplier in Barrackpore Student Fee Ledger
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Finance Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui debugged an end-of-month fee calculation query taking 14.8 seconds: Standard `EXPLAIN` showed all tables using indexes, baffling junior developers. Running <code className="text-emerald-300 font-mono">EXPLAIN ANALYZE</code> revealed the smoking gun: an inner correlated subquery iterator had <code className="text-rose-400 font-mono">loops=15,000</code>, executing 15,000 separate index lookups! Rewriting the correlated subquery into a `JOIN` with a `GROUP BY` reduced the loop count from <strong>15,000 to 1</strong>, dropping query time to <strong>0.012 seconds</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Before: Correlated subquery executing loops=15000:
SELECT s.name, (SELECT SUM(amount) FROM fee_payments WHERE student_id = s.id) FROM students s;

-- After Performance Tuning Fix: Single pass join (loops=1):
SELECT s.name, COALESCE(f.total_paid, 0) 
FROM students s 
LEFT JOIN (SELECT student_id, SUM(amount) AS total_paid FROM fee_payments GROUP BY student_id) f 
ON s.id = f.student_id;`}
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
              Never run un-indexed slow queries with EXPLAIN ANALYZE on production primaries and always check loop multipliers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Running EXPLAIN ANALYZE on Production Primary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Remember that `EXPLAIN ANALYZE` actually executes the query! Running it on an un-indexed query on a 50-million-row table will tie up production CPU and I/O for minutes!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always run `EXPLAIN ANALYZE` on staging or dedicated read replicas!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Compute loops Multiplier
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always multiply `actual time * loops` and `rows * loops` on inner child iterators to calculate the true cumulative time spent inside nested join operations.
              </p>
              <div className="text-xs text-slate-400">
                Uncovers hidden loop bottlenecks that look deceptively fast on a single iteration.
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
              Key takeaways for EXPLAIN ANALYZE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> EXPLAIN ANALYZE Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">actual time</code> = time to 1st row .. time to all rows (in ms).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">loops</code> = total execution count of that specific iterator node.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Total node time = <code className="text-emerald-300 font-mono">actual time (end) * loops</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Spot <strong className="text-rose-400">Estimation Drift</strong> when estimated rows $\neq$ actual rows!</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe startup times in sorts...”</span>
                  If an iterator has a wide gap between start and end times (e.g. `12.0..12.1ms`), it means it spent 12ms buffering rows before it could output its first row!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about memory temporary tables...”</span>
                  When you see `Aggregate using temporary table`, check if the dataset fits in `tmp_table_size` to avoid spilling to disk!
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
              Comprehensive reference questions covering real execution profiling in MySQL 8.0.18+: EXPLAIN ANALYZE, time-to-first-row vs all-rows, loop multipliers, and diagnosing optimizer statistics drift.
            </p>
          </div>

          <FAQTemplate
            title="EXPLAIN ANALYZE FAQs"
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
            title="Using EXPLAIN ANALYZE for Real Execution Metrics (Execution Time, Row Counts, Loops)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="EXPLAIN ANALYZE is the definitive truth in MySQL query optimization. Standard EXPLAIN is only what the optimizer *thinks* will happen; EXPLAIN ANALYZE is what *actually* happened! Always pay close attention to the `loops` multiplier in nested joins and look for huge discrepancies between estimated rows and actual rows. If the optimizer thought a node would return 10 rows and it actually returned 100,000 rows, your statistics are stale—run ANALYZE TABLE immediately!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
