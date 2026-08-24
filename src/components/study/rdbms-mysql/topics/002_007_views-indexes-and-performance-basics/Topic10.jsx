import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Single-Column Indexes vs Composite (Multi-Column) Indexes
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on single vs composite multi-column indexes, lexicographical sorting, and Index Merge elimination.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedStrategy, setSelectedStrategy] = useState("composite_index_seek");

  const strategies = {
    composite_index_seek: {
      title: "1. Targeted Composite Index: Single B-Tree Seek (0.4 ms)",
      badge: "⚡ Single 3-Hop Traversal (Optimal)",
      badgeColor: "emerald",
      sqlQuery: `-- 1. Query filtering on multiple attributes:
SELECT student_id, student_name, centre_city, course_stream, admission_status
FROM student_registry
WHERE centre_city = 'Barrackpore' 
  AND course_stream = 'React Fullstack' 
  AND admission_status = 'ACTIVE';

-- Optimized Composite Index:
-- CREATE INDEX idx_city_stream_status ON student_registry (centre_city, course_stream, admission_status);

-- EXPLAIN Execution Plan:
-- Type: ref | Key: idx_city_stream_status
-- Single B-Tree traversal matches ('Barrackpore', 'React Fullstack', 'ACTIVE') simultaneously!
-- Latency: 0.4 ms (Zero Index Merge Overhead)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", latency: "0.4 ms (Composite Seek)" },
        { id: "STU-104", name: "Debangshu Roy", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", latency: "0.4 ms (Composite Seek)" },
      ],
      explanation:
        "The composite index evaluates all 3 filter conditions simultaneously in a single B-Tree traversal. It pinpoints matching records in 0.4 ms with zero intermediate memory merges.",
    },
    index_merge_intersect: {
      title: "2. Multiple Single-Column Indexes (Index Merge Intersect)",
      badge: "⚠️ Index Merge Overhead (2.1 ms)",
      badgeColor: "amber",
      sqlQuery: `-- 2. Table has 3 separate single-column indexes:
-- idx_city (centre_city), idx_stream (course_stream), idx_status (admission_status)

-- Query Execution via Index Merge:
-- 1. Scans idx_city -> Retrieves 12,000 PKs for 'Barrackpore'.
-- 2. Scans idx_stream -> Retrieves 8,500 PKs for 'React Fullstack'.
-- 3. Intersects PK lists in RAM (Using intersect(idx_city, idx_stream)).
-- 4. Performs bookmark lookups on the resulting 2 PKs!
-- Latency: 2.1 ms (5x Slower than Composite Index)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", latency: "2.1 ms (Index Merge)" },
        { id: "STU-104", name: "Debangshu Roy", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", latency: "2.1 ms (Index Merge)" },
      ],
      explanation:
        "Index Merge requires reading multiple separate B-Tree index structures and computing set intersections in memory, wasting CPU cycles and Buffer Pool RAM.",
    },
    column_order_optimization: {
      title: "3. Column Order Rule: (Equality, Range, Sorting)",
      badge: "Architecture Ordering Rule",
      badgeColor: "cyan",
      sqlQuery: `-- 3. Query with mixed equality and range filters:
SELECT * FROM student_registry
WHERE centre_city = 'Barrackpore'        -- Equality (=)
  AND course_stream = 'React Fullstack'   -- Equality (=)
  AND tuition_fee_inr >= 20000.00         -- Range (>=)
ORDER BY enrollment_date DESC;            -- Sort (ORDER BY)

-- Optimal Composite Column Sequence:
-- 1. Equality columns: (centre_city, course_stream)
-- 2. Range column: (tuition_fee_inr)
-- 3. Sort column: (enrollment_date)
CREATE INDEX idx_optimal_order ON student_registry (
    centre_city, course_stream, tuition_fee_inr, enrollment_date
);`,
      resultRows: [
        { id: "1. Equality First", name: "centre_city, course_stream", stream: "Filters in O(log N)", city: "Evaluated First", status: "Prunes 99% Rows", latency: "B-Tree Seek" },
        { id: "2. Range Next", name: "tuition_fee_inr", stream: "Range Scan", city: "Evaluated Second", status: "Halts Index Seek", latency: "Range Slice" },
        { id: "3. Sort / Project", name: "enrollment_date", stream: "Pre-Sorted", city: "Zero Filesort", status: "Eliminates Sort", latency: "Stream Output" },
      ],
      explanation:
        "Placing equality columns first allows B-Tree pruning to eliminate the maximum number of rows before the range operator terminates index seek traversal.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Single vs Composite Overview" },
    { id: "lexicographical-order", label: "2. Lexicographical Sorting" },
    { id: "svg-diagrams", label: "3. Architecture & Merge SVGs" },
    { id: "interactive-sandbox", label: "4. Live Index Workbench" },
    { id: "column-ordering-rules", label: "5. Column Ordering Rules" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 10 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Multi-Column Indexing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Single-Column Indexes vs Composite (Multi-Column) Indexes
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Consolidate fragmented single-column indexes. Master lexicographical sorting inside B+Trees, eliminate costly{" "}
            <code className="text-amber-300 font-mono font-bold">Index Merge Intersect</code> operations, and design optimal multi-column index sequences.
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
        {/* SECTION 1: Overview */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Single-Column vs Composite Index Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing standalone single-attribute indexes against unified multi-attribute B+Trees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-xs font-bold border border-cyan-800">
                  SINGLE
                </span>
                <h3 className="text-base font-bold text-white">Single-Column Index</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Indexes exactly one column: <code className="text-cyan-300 font-mono">CREATE INDEX idx_city ON students (centre_city);</code>
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Efficient ONLY when filtering on that single column.</li>
                <li>Multi-column queries trigger expensive Index Merge memory scans.</li>
                <li>Cannot satisfy combined WHERE + ORDER BY queries.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  COMPOSITE
                </span>
                <h3 className="text-base font-bold text-white">Composite (Multi-Column) Index</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Indexes up to 16 columns: <code className="text-emerald-300 font-mono">CREATE INDEX idx_city_stream ON students (centre_city, course_stream);</code>
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Evaluates multiple filter conditions in 1 single B-Tree seek.</li>
                <li>Pre-sorts data to eliminate filesort for ORDER BY.</li>
                <li>Creates covering indexes with zero base table lookups.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Lexicographical Ordering */}
        <section id="lexicographical-order" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Telephone Directory Analogy: Lexicographical Sorting
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why column sequence determines how the B-Tree navigates composite keys.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Think of a printed telephone directory sorted by <code className="text-cyan-300 font-mono">(LastName, FirstName)</code>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-emerald-400 font-bold uppercase font-mono">✓ Finding "Hui, Mamata":</span>
                <p className="text-slate-300">
                  Fast! You flip directly to the "H" section (LastName), and within "Hui", you find "Mamata" in seconds.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-rose-400 font-bold uppercase font-mono">❌ Finding everyone named "Mamata":</span>
                <p className="text-slate-300">
                  Impossible without scanning the entire phone book from cover to cover, because first names are scattered across every last name!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Lexicographical B-Tree vs Index Merge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing single B-Tree composite seeks against multi-tree Index Merge operations.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Composite Leaf Sorting */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Lexicographical Multi-Column B+Tree Structure
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 240" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Root (Level 1) */}
                  <g>
                    <rect x="250" y="20" width="350" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Root: INDEX (centre_city, course_stream)</text>
                    <text x="425" y="56" fill="#a7f3d0" fontSize="8" textAnchor="middle font-mono">['Barrackpore', 'Java'] | ['Barrackpore', 'React'] | ['Kolkata', 'Python']</text>
                  </g>

                  {/* Leaf Pages (Level 0) */}
                  <g>
                    <rect x="30" y="110" width="230" height="90" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="145" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf #1 (Barrackpore, Java)</text>
                    <rect x="40" y="145" width="210" height="20" rx="3" fill="#1e293b" />
                    <text x="45" y="159" fill="#e2e8f0" fontSize="8 font-mono">('Barrackpore', 'Java', PK: 102)</text>
                    <rect x="40" y="170" width="210" height="20" rx="3" fill="#1e293b" />
                    <text x="45" y="184" fill="#e2e8f0" fontSize="8 font-mono">('Barrackpore', 'Java', PK: 105)</text>

                    <rect x="310" y="110" width="230" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="130" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf #2 (Barrackpore, React)</text>
                    <rect x="320" y="145" width="210" height="20" rx="3" fill="#022c22" />
                    <text x="325" y="159" fill="#a7f3d0" fontSize="8 font-mono">('Barrackpore', 'React', PK: 101) [Mamata]</text>
                    <rect x="320" y="170" width="210" height="20" rx="3" fill="#022c22" />
                    <text x="325" y="184" fill="#a7f3d0" fontSize="8 font-mono">('Barrackpore', 'React', PK: 104) [Debangshu]</text>

                    <rect x="590" y="110" width="230" height="90" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="705" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf #3 (Kolkata, Python)</text>
                    <rect x="600" y="145" width="210" height="20" rx="3" fill="#1e293b" />
                    <text x="605" y="159" fill="#e2e8f0" fontSize="8 font-mono">('Kolkata', 'Python', PK: 103) [Abhronila]</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 320 65 L 145 110" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 425 65 L 425 110" stroke="#10b981" strokeWidth="2" />
                  <path d="M 530 65 L 705 110" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Single Composite Seek vs Index Merge */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> 1-Tree Composite Seek vs 2-Tree Index Merge Intersect
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 200" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Composite Seek */}
                  <g>
                    <rect x="20" y="20" width="380" height="160" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="210" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">1. Single Composite Index Seek</text>
                    <rect x="35" y="65" width="350" height="50" rx="4" fill="#022c22" />
                    <text x="210" y="85" fill="#6ee7b7" fontSize="9 font-mono" textAnchor="middle">Seek: ('Barrackpore', 'React')</text>
                    <text x="210" y="102" fill="#a7f3d0" fontSize="8" textAnchor="middle">1 B-Tree Traversal → 0.4 ms</text>
                    <text x="210" y="150" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Zero RAM Merge / Minimal I/O</text>
                  </g>

                  {/* Right: Index Merge */}
                  <g>
                    <rect x="440" y="20" width="380" height="160" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="45" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">2. Index Merge Intersect (2 Trees)</text>
                    <rect x="455" y="60" width="160" height="35" rx="3" fill="#0f172a" />
                    <text x="535" y="82" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">idx_city Scan</text>

                    <rect x="645" y="60" width="160" height="35" rx="3" fill="#0f172a" />
                    <text x="725" y="82" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">idx_stream Scan</text>

                    <rect x="455" y="110" width="350" height="30" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="630" y="130" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">Intersect PK lists in RAM → 2.1 ms</text>
                    <text x="630" y="165" fill="#f87171" fontSize="9" textAnchor="middle">High CPU & Multi-Tree Overhead</text>
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
              4. Interactive Multi-Column Index Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test composite seeks, Index Merge intersect fallbacks, and column ordering optimizations live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(strategies).map(([key, item]) => {
              const isActive = selectedStrategy === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStrategy(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Strategy" : "○ Run Benchmark"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{strategies[selectedStrategy].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{strategies[selectedStrategy].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Optimizer Access Path
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query & Index Schema</span>
                <span className="text-emerald-400">EXPLAIN Access Execution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {strategies[selectedStrategy].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id / rule</th>
                    <th className="py-3 px-4 font-mono text-white">student_name / col</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">course_stream</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">centre_city</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">status / outcome</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Execution Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {strategies[selectedStrategy].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.status}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.latency.includes("0.4 ms") || row.latency.includes("Seek")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-amber-950 text-amber-400 border-amber-800"
                          )}
                        >
                          {row.latency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Column Ordering Rules */}
        <section id="column-ordering-rules" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. The (Equality, Range, Sort) Column Ordering Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The universal sequence formula for multi-column composite index design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold uppercase font-mono">1. Equality Columns (=)</span>
              <p className="text-slate-300 leading-relaxed">
                Place all columns filtered with exact equality (<code className="text-cyan-300 font-mono">col = value</code>) first in the index.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold uppercase font-mono">2. Range Column (&gt;, &lt;, BETWEEN)</span>
              <p className="text-slate-300 leading-relaxed">
                Place the column filtered with a range operator next. (Range conditions stop B-Tree seeks for subsequent columns).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase font-mono">3. Sort Columns (ORDER BY)</span>
              <p className="text-slate-300 leading-relaxed">
                Place sorting columns at the end to stream pre-sorted records directly without an in-memory <code className="text-rose-300 font-mono">filesort</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world index consolidation and multi-column search optimizations.
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
                  Consolidating 4 Single Indexes into 1 Composite Index
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactors student admissions by dropping 4 separate single-column indexes (<code className="text-rose-300 font-mono">idx_city, idx_stream, idx_status, idx_date</code>) and creating one composite index, increasing batch insert speed by 300% while speeding up search queries by 5x!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Dropping fragmented single indexes:
DROP INDEX idx_city ON students;
DROP INDEX idx_stream ON students;
DROP INDEX idx_status ON students;

-- Creating unified targeted composite index:
CREATE INDEX idx_student_cohort_search ON students (
    centre_city, 
    course_stream, 
    admission_status, 
    enrollment_date
);`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Product Catalog Multi-Facet Filter
                </h3>
                <span className="text-xs text-slate-400 font-mono">Multi-Facet Catalog Search</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Indexing <code className="text-cyan-300 font-mono">(category_id, brand_id, price_inr, rating_score)</code> to satisfy multi-facet filter queries with instant sub-millisecond response times.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT product_id, product_name, price_inr, rating_score 
FROM product_catalog 
WHERE category_id = 45 AND brand_id = 12 AND price_inr <= 5000.00
ORDER BY rating_score DESC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid composite index traps and redundant structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Range Operators Halting B-Tree Traversal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In <code className="text-rose-300 font-mono">INDEX (city, fee, stream)</code>, if a query uses <code className="text-rose-300 font-mono">WHERE city = 'BKP' AND fee &gt; 20000 AND stream = 'React'</code>, the range on <code className="text-rose-300 font-mono">fee</code> stops B-Tree pruning for <code className="text-rose-300 font-mono">stream</code>!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always place equality columns (<code className="text-emerald-300 font-mono">city, stream</code>) before range columns (<code className="text-emerald-300 font-mono">fee</code>).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Eliminate Redundant Leading-Column Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If you already have <code className="text-emerald-400 font-mono">INDEX (city, stream)</code>, do NOT create a separate <code className="text-rose-300 font-mono">INDEX (city)</code>. The composite index automatically indexes <code className="text-emerald-400 font-mono">city</code> alone!
              </p>
              <div className="text-xs text-slate-400">
                Eliminates unnecessary write amplification during INSERTs.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Composite indexes store up to 16 columns in lexicographical sorting order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Composite index seeks are faster than Index Merge across multiple single indexes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Universal Column Order: Equality (=) → Range (&gt;, &lt;) → Sort (ORDER BY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>A composite index on (A, B) makes a separate index on (A) redundant.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Index Merge in EXPLAIN...”</span>
                  If EXPLAIN shows <code className="text-amber-300 font-mono">Using intersect(...)</code>, consolidate those single-column indexes into a single composite index to speed up your query by 4x to 10x!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Descending Indexes...”</span>
                  In MySQL 8.0+, define mixed-order composite indexes like <code className="text-cyan-300 font-mono">(city ASC, score DESC)</code> to eliminate filesorts completely!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering single-column vs composite indexes, lexicographical sorting, Index Merge, and column ordering rules.
            </p>
          </div>

          <FAQTemplate
            title="Single-Column vs Composite Indexes FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Single-Column Indexes vs Composite (Multi-Column) Indexes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Junior developers often create 5 separate single-column indexes on a table thinking they covered all bases. Explain why this hurts: every insert must update 5 separate trees, and multi-filter queries suffer from Index Merge overhead. Teach them how 1 targeted composite index replaces 4 single indexes, cuts write overhead by 75%, and speeds up multi-column filtering dramatically."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
