import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Interpreting Extra Column Flags: Using index (Covering), Using where, Using temporary, Using filesort, Using join buffer
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL EXPLAIN Extra column flags: Covering Indexes (Using index), Server filters (Using where), Index Condition Pushdown (ICP), Sort Buffers (Using filesort), and Temp Tables (Using temporary).
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedExtraFlagScenario, setSelectedExtraFlagScenario] = useState("covering_index_using_index");

  const extraFlagScenarios = {
    covering_index_using_index: {
      title: "1. Covering Index (Using index): The Holy Grail of Zero Disk Reads",
      badge: "Using index (Covering)",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ THE COVERING INDEX (Using index):
-- Table has composite index: idx_student_balance (student_id, balance)
EXPLAIN SELECT student_id, balance 
FROM student_ledgers 
WHERE student_id BETWEEN 100 AND 200;

-- 🔍 EXPLAIN Output:
-- key = 'idx_student_balance'
-- Extra = 'Using index'
-- ⚡ BENEFIT: All requested columns exist inside the B+Tree leaf nodes!
-- ZERO base table disk reads! ZERO clustered primary key lookups!`,
      resultRows: [
        { queryCase: "Covering Select (id, balance)", indexUsed: "idx_student_balance", extraOutput: "Using index ⚡", baseTableAccess: "0 Base Table Reads (Pure B+Tree)", performanceLevel: "Fastest Possible (Sub-millisecond)", status: "Covering Index ✅" },
      ],
      explanation:
        "`Using index` means the query is a Covering Index. Because both `student_id` and `balance` are stored directly in the index leaf nodes, InnoDB never reads the base table pages, achieving maximum throughput.",
    },
    eliminating_filesort: {
      title: "2. Eliminating Using filesort: Sorting Directly via Composite Indexes",
      badge: "Using filesort Elimination",
      badgeColor: "cyan",
      sqlQuery: `-- 📊 ELIMINATING USING FILESORT:
-- Query: Filter by department and sort by GPA descending:
SELECT student_id, name, gpa 
FROM student_records 
WHERE department_id = 1 
ORDER BY gpa DESC;

-- Case A (Index on department_id only):
-- Extra = 'Using index condition; Using filesort' ⚠️ (Sorts 5,000 rows in memory!)

-- Case B (Composite Index on (department_id, gpa DESC)):
-- Extra = 'Using index condition' ⚡
-- Filesort is 100% ELIMINATED! Rows are read in pre-sorted B+Tree order!`,
      resultRows: [
        { queryCase: "Case A: Single Index (dept_id)", indexUsed: "idx_dept", extraOutput: "Using filesort ⚠️", baseTableAccess: "Memory Sort Buffer", performanceLevel: "High CPU Sorting Overhead", status: "Filesort Active ⚠️" },
        { queryCase: "Case B: Composite (dept_id, gpa DESC)", indexUsed: "idx_dept_gpa", extraOutput: "Using index condition ⚡", baseTableAccess: "Pre-sorted Index Traversal", performanceLevel: "Instant Streaming Order", status: "Filesort Eliminated ✅" },
      ],
      explanation:
        "`Using filesort` indicates that MySQL must execute an explicit sorting pass in memory (`sort_buffer_size`). Adding a composite index matching `(WHERE_col, ORDER_BY_col)` reads rows in pre-sorted order, eliminating filesort.",
    },
    eliminating_temp_table: {
      title: "3. The Double Red Flag: Eliminating Using temporary; Using filesort",
      badge: "Using temporary; filesort",
      badgeColor: "rose",
      sqlQuery: `-- 🚨 THE DOUBLE RED FLAG (Using temporary; Using filesort):
-- Query: Grouping by non-indexed city and sorting by student count:
SELECT city, COUNT(*) 
FROM student_records 
GROUP BY city 
ORDER BY COUNT(*) DESC;

-- 📋 EXPLAIN Output:
-- Extra = 'Using temporary; Using filesort' 🚨
-- 💥 DANGER: 
-- 1. Creates an in-memory temporary table (tmp_table_size) to aggregate rows!
-- 2. Spills to physical disk if data exceeds tmp_table_size!
-- 3. Performs an extra filesort pass over the temporary table!

-- ⚡ OPTIMIZATION FIX: Index on (city):
ALTER TABLE student_records ADD INDEX idx_city (city);
-- Extra becomes: 'Using index' (Tight Index Scan for Group-By!)`,
      resultRows: [
        { queryCase: "Un-indexed GROUP BY city", indexUsed: "NULL", extraOutput: "Using temporary; Using filesort 🚨", baseTableAccess: "Temp Table + Disk Spill", performanceLevel: "High Latency & Disk Churn", status: "Double Red Flag ❌" },
        { queryCase: "Indexed on (city)", indexUsed: "idx_city", extraOutput: "Using index ⚡", baseTableAccess: "Direct Index Scan for Group-By", performanceLevel: "Sub-millisecond Streaming", status: "Temp Table Eliminated ✅" },
      ],
      explanation:
        "`Using temporary; Using filesort` creates an internal temporary table and sorts it, consuming high memory and disk I/O. Adding an index on the `GROUP BY` column enables an index scan for group-by, eliminating both flags.",
    },
    index_condition_pushdown: {
      title: "4. Index Condition Pushdown (Using index condition): Storage Engine Filtering",
      badge: "Using index condition (ICP)",
      badgeColor: "amber",
      sqlQuery: `-- 🔍 INDEX CONDITION PUSHDOWN (ICP):
-- Index: idx_city_age (city, age)
EXPLAIN SELECT * 
FROM student_records 
WHERE city = 'Barrackpore' AND age > 20 AND notes LIKE '%Scholarship%';

-- 📋 EXPLAIN Output:
-- key = 'idx_city_age'
-- Extra = 'Using index condition; Using where'
-- ⚡ BENEFIT:
-- 1. 'Using index condition': InnoDB evaluates 'age > 20' DIRECTLY inside the storage engine!
-- 2. Discards non-matching rows BEFORE reading full clustered table records from the Buffer Pool!
-- 3. 'Using where': Server layer evaluates 'notes LIKE ...' on the surviving rows!`,
      resultRows: [
        { queryCase: "Index on (city, age)", indexUsed: "idx_city_age", extraOutput: "Using index condition; Using where", baseTableAccess: "Filtered in Storage Engine", performanceLevel: "5x-10x Fewer Buffer Pool Reads", status: "ICP Active ⚡" },
      ],
      explanation:
        "`Using index condition` (Index Condition Pushdown) pushes `WHERE` condition evaluations on index columns down into the InnoDB engine, drastically reducing the number of full base table page reads.",
    },
  };

  const navItems = [
    { id: "extra-overview", label: "1. Core Extra Flags" },
    { id: "covering-filesort", label: "2. Covering vs Filesort" },
    { id: "svg-diagrams", label: "3. Covering & Filesort SVGs" },
    { id: "interactive-sandbox", label: "4. Live Extra Flags Workbench" },
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
            <span>Topic 5 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Extra Column Diagnostics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Interpreting Extra Column Flags
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the diagnostic interpretation of MySQL's <code className="text-cyan-300 font-mono">Extra</code> column flags: Covering Indexes (<code className="text-emerald-400 font-mono">Using index</code>), Server filters (<code className="text-cyan-400 font-mono">Using where</code>), Index Condition Pushdown (<code className="text-amber-400 font-mono">Using index condition</code>), and eliminating performance hazards (<code className="text-rose-400 font-mono">Using temporary; Using filesort</code>).
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
        {/* SECTION 1: Core Extra Flags */}
        <section id="extra-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Critical Extra Column Flags in MySQL
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Diagnostic flags revealing internal execution optimizations and bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Optimization Gold</span>
              <h3 className="font-bold text-white">Using index (Covering)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All requested columns exist inside the B+Tree leaf nodes. MySQL retrieves data directly from the index without reading base table pages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Engine Optimization</span>
              <h3 className="font-bold text-white">Using index condition (ICP)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                WHERE predicates on index columns are evaluated directly inside the storage engine handler, reducing the number of full row reads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Performance Hazard</span>
              <h3 className="font-bold text-white">Using temporary; filesort</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creates an internal temporary table in memory/disk and executes an explicit sort pass over it. Must be eliminated on high-throughput queries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Covering vs Filesort */}
        <section id="covering-filesort" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Covering Indexes vs Filesort Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How index design eliminates physical table lookups and in-memory sort buffers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Why Covering Indexes Are So Fast</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Standard secondary index lookups require 2 steps: 1) Traverse secondary B+Tree to get Primary Key, 2) Seek Clustered Index on base table to get remaining columns. A Covering Index (<code className="text-emerald-300 font-mono">Using index</code>) satisfies the query in Step 1, cutting I/O by 50%!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">Eliminating Filesort via Composite Ordering</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                When a query filters by Column A and sorts by Column B (<code className="text-cyan-300 font-mono">WHERE a = ? ORDER BY b DESC</code>), a composite index on <code className="text-cyan-300 font-mono">(a, b DESC)</code> satisfies both filtering and sorting in a single linear B+Tree pass with zero filesort overhead!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Covering Index vs Filesort Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing pure index-only reads vs temporary table filesort pipelines.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Covering Index */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram A:</span> Covering Index (Using index) vs Base Table Read
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Standard Non-Covering */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">NON-COVERING INDEX (2-Step Read)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">1. Read Secondary B+Tree → 2. Read Clustered Table Page</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Requires base table disk / Buffer Pool lookups</text>
                  </g>

                  {/* Right: Covering Index */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">COVERING INDEX: Using index (1-Step Read)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">Reads DIRECTLY from Secondary B+Tree Leaf Nodes</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ ZERO Base Table Reads · Maximum Throughput</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Filesort Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Filesort &amp; Temporary Table Execution Hazard
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Scan */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">1. Un-indexed GROUP BY</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="145" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Scans base table rows</text>
                    <text x="145" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">No index ordering available</text>
                  </g>

                  {/* Step 2: Temp Table */}
                  <g>
                    <rect x="290" y="30" width="240" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="410" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. Using temporary</text>
                    <rect x="300" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="410" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Materializes Temp Hash Table</text>
                    <text x="410" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Spills to disk if &gt; tmp_table_size</text>
                  </g>

                  {/* Step 3: Filesort */}
                  <g>
                    <rect x="560" y="30" width="260" height="100" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                    <text x="690" y="55" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">3. Using filesort</text>
                    <rect x="570" y="70" width="240" height="40" rx="4" fill="#1e293b" />
                    <text x="690" y="88" fill="#fb7185" fontSize="8 font-mono font-bold" textAnchor="middle">Sorts Temp Table in Memory / Disk</text>
                    <text x="690" y="102" fill="#fecdd3" fontSize="7 font-bold" textAnchor="middle">🛑 Double Latency Bottleneck</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 530 80 L 560 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Extra Column Flags Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test covering index lookups, filesort eliminations, temporary table bottlenecks, and Index Condition Pushdown (ICP) live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(extraFlagScenarios).map(([key, item]) => {
              const isActive = selectedExtraFlagScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExtraFlagScenario(key)}
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
                    {isActive ? "● Active Flag Scenario" : "○ Run Flag Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{extraFlagScenarios[selectedExtraFlagScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{extraFlagScenarios[selectedExtraFlagScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Extra Flag Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Diagnostic Script</span>
                <span className="text-emerald-400">Extra Flags Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {extraFlagScenarios[selectedExtraFlagScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Query Case</th>
                    <th className="py-3 px-4 text-white">Index Used</th>
                    <th className="py-3 px-4 text-emerald-400 font-bold">Extra Output Flag</th>
                    <th className="py-3 px-4 text-amber-400">Base Table Access</th>
                    <th className="py-3 px-4 text-slate-300">Performance Impact</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {extraFlagScenarios[selectedExtraFlagScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.queryCase}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.indexUsed}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.extraOutput}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.baseTableAccess}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.performanceLevel}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Covering") || row.status.includes("Eliminated") || row.status.includes("ICP")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : row.status.includes("Active")
                              ? "bg-amber-950 text-amber-400 border-amber-800"
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
              Eliminating Using temporary; Using filesort bottlenecks in Barrackpore student analytics.
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
                  Eliminating Temp Tables &amp; Filesort in Barrackpore Examination Ranking
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Examination Board</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an exam leaderboard query taking 4.2 seconds under peak load: The query filtered `WHERE exam_id = 101` and sorted by `total_marks DESC`. Because the existing index was on `(exam_id)` only, MySQL executed an in-memory filesort on 25,000 exam rows (<code className="text-rose-400 font-mono">Extra: Using filesort</code>). Adding a composite index <code className="text-emerald-300 font-mono">INDEX idx_exam_marks (exam_id, total_marks DESC, student_id)</code> converted the query to a pure Covering Index with pre-sorted order, dropping execution time from <strong>4,200ms to 3ms</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Before: Extra = Using index condition; Using filesort (4.2 seconds)
EXPLAIN SELECT student_id, total_marks FROM exam_results WHERE exam_id = 101 ORDER BY total_marks DESC;

-- The Performance Tuning Fix:
ALTER TABLE exam_results ADD INDEX idx_exam_marks (exam_id, total_marks DESC, student_id);

-- After: Extra = Using index (3ms!) ZERO filesort and ZERO base table reads!`}
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
              Never use SELECT * when building covering indexes and eliminate filesort on high QPS endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> SELECT * Silently Destroying Covering Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing `SELECT *` requests all columns, forcing InnoDB to perform a secondary index lookup AND a base table clustered lookup for every row, completely destroying `Extra: Using index` optimization!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Request ONLY the specific columns present in your secondary index!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Match Composite Index Order to WHERE + ORDER BY
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Design composite indexes where the equality `WHERE` columns come first, followed immediately by the `ORDER BY` columns in identical ascending/descending order.
              </p>
              <div className="text-xs text-slate-400">
                Completely eliminates `Using filesort` and streams results directly from B+Tree index order.
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
              Key takeaways for Extra Column Flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Extra Flags Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Using index</strong> = Covering Index (Zero base table disk reads!).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">Using index condition</strong> (ICP) = Engine-level index predicate filter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">Using filesort</strong> = Explicit sorting pass (eliminate via composite index).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Using temporary; filesort</strong> = High-priority optimization target!</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Using where vs Using index...”</span>
                  `Using where; Using index` is excellent! It means the query is a Covering Index, but MySQL evaluated additional WHERE conditions in-memory without reading the base table!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about sort_buffer_size...”</span>
                  If filesort cannot be avoided, ensure `sort_buffer_size` is sized appropriately so sorting occurs in RAM rather than spilling to temporary disk files!
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
              Comprehensive reference questions covering MySQL EXPLAIN Extra column flags: Covering Indexes (Using index), Server filters (Using where), Index Condition Pushdown (ICP), Sort Buffers (Using filesort), and Temp Tables (Using temporary).
            </p>
          </div>

          <FAQTemplate
            title="Extra Column Flags FAQs"
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
            title="Interpreting Extra Column Flags: Using index (Covering), Using where, Using temporary, Using filesort, Using join buffer"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="The Extra column is where you find the secrets to 100x performance optimizations. The ultimate achievement is `Using index` (Covering Index), where all required columns are served directly from the compact secondary index without touching the base table. On the other hand, whenever you see `Using temporary; Using filesort`, treat it as an architectural defect on high-frequency tables—eliminate it by aligning your composite indexes with your WHERE, GROUP BY, and ORDER BY clauses!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
