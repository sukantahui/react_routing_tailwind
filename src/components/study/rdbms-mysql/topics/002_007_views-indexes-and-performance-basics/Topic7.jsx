import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Introduction to Database Indexing and Search Cost Reductions
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on database indexing fundamentals, full table scans vs B-Tree searches, and the index write tax.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedBenchmark, setSelectedBenchmark] = useState("indexed_b_tree_seek");

  const benchmarks = {
    indexed_b_tree_seek: {
      title: "1. B-Tree Indexed Search: O(log N) Logarithmic Seek",
      badge: "⚡ 0.6 ms Execution (Optimal)",
      badgeColor: "emerald",
      sqlQuery: `-- 1. Query using B-Tree index on student_aadhaar:
SELECT 
    student_id,
    student_name,
    centre_city,
    course_stream,
    tuition_fee_inr
FROM student_registry
WHERE student_aadhaar = '8901-2345-6789';

-- EXPLAIN Execution Plan:
-- Type: const / ref
-- Key: idx_student_aadhaar (B-Tree)
-- Pages Read from Disk: 3 Pages (Root -> Branch -> Leaf)
-- Rows Examined: 1 row
-- Execution Latency: 0.6 milliseconds!`,
      resultRows: [
        { metric: "Time Complexity", unindexed: "O(N) Linear Scan", indexed: "O(log N) Logarithmic", delta: "99.9% Faster" },
        { metric: "16KB Pages Read", unindexed: "200,000 Pages (3.2 GB)", indexed: "3 Pages (48 KB)", delta: "-99.99% Disk I/O" },
        { metric: "Rows Examined", unindexed: "1,000,000 Records", indexed: "1 Record (Exact Match)", delta: "-999,999 Rows" },
        { metric: "Total Query Latency", unindexed: "2,450 ms (2.45 sec)", indexed: "0.6 ms (Sub-millisecond)", delta: "Instantaneous" },
      ],
      explanation:
        "The B-Tree index traverses 3 hierarchical memory/disk pages directly to the target record, bypassing millions of unrelated rows and reducing query latency by over 99.9%.",
    },
    unindexed_table_scan: {
      title: "2. Unindexed Full Table Scan: O(N) Sequential Disk Sweep",
      badge: "⚠️ 2,450 ms (Table Scan Bottleneck)",
      badgeColor: "rose",
      sqlQuery: `-- 2. Searching an unindexed column (phone_number):
SELECT 
    student_id,
    student_name,
    centre_city,
    phone_number
FROM student_registry
WHERE phone_number = '98300-12345';

-- EXPLAIN Execution Plan:
-- Type: ALL (Full Table Scan)
-- Key: NULL (No usable index found)
-- Pages Read from Disk: 200,000 Pages (Sequential sweep of entire 3.2 GB table!)
-- Rows Examined: 1,000,000 records
-- Execution Latency: 2,450 milliseconds!`,
      resultRows: [
        { metric: "Time Complexity", unindexed: "O(N) Full Scan", indexed: "O(log N) B-Tree", delta: "High CPU Load" },
        { metric: "16KB Pages Read", unindexed: "200,000 Pages", indexed: "3 Pages", delta: "Disk I/O Bottleneck" },
        { metric: "Rows Examined", unindexed: "1,000,000 Rows", indexed: "1 Row", delta: "Wasted CPU Cycles" },
        { metric: "Total Query Latency", unindexed: "2,450 ms", indexed: "0.6 ms", delta: "Severely Degraded" },
      ],
      explanation:
        "Without an index, MySQL must inspect every single row in the table sequentially. On high-concurrency systems, multiple unindexed scans saturate disk I/O and crash database throughput.",
    },
    the_index_tax_benchmark: {
      title: "3. The 'Index Tax': Write Amplification & Storage Trade-Off",
      badge: "Write Throughput Analysis",
      badgeColor: "amber",
      sqlQuery: `-- 3. Evaluating the cost of indexing during batch INSERT operations:
-- Table A: 0 Secondary Indexes (Clustered PK only)
-- -> Single write operation per row. Throughput: 18,500 inserts/sec.

-- Table B: 7 Secondary Indexes (Email, Phone, City, Stream, Status, etc.)
-- -> 1 Base write + 7 Secondary Tree Insertions & Re-balances per row!
-- -> Throughput drops to 3,800 inserts/sec (79% slowdown!).

-- Golden Rule: Index strictly for critical search queries; avoid over-indexing write-heavy tables.`,
      resultRows: [
        { metric: "Insert Throughput (1 Index)", unindexed: "18,500 Inserts/sec", indexed: "18,500 Inserts/sec", delta: "Baseline (Fastest)" },
        { metric: "Insert Throughput (4 Indexes)", unindexed: "8,900 Inserts/sec", indexed: "8,900 Inserts/sec", delta: "-52% Write Speed" },
        { metric: "Insert Throughput (8 Indexes)", unindexed: "3,800 Inserts/sec", indexed: "3,800 Inserts/sec", delta: "-79% Write Speed (Taxed)" },
        { metric: "Disk Storage Footprint", unindexed: "150 MB (Raw Data)", indexed: "480 MB (Data + 8 Indexes)", delta: "+220% Disk Space" },
      ],
      explanation:
        "Every secondary index consumes additional disk space and must be synchronously updated during every INSERT, UPDATE, and DELETE statement. Balance read speed against write amplification.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. The Search Problem" },
    { id: "btree-vs-scan", label: "2. B-Tree O(log N) vs Table Scan O(N)" },
    { id: "svg-diagrams", label: "3. Architecture & Index Tax SVGs" },
    { id: "interactive-sandbox", label: "4. Live Performance Benchmark" },
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
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 7 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Indexing Fundamentals
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Introduction to Database Indexing & Search Cost Reductions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate slow linear scans. Understand how B+Tree indexes reduce disk I/O from 200,000 pages to 3 pages, evaluate the{" "}
            <code className="text-amber-300 font-mono font-bold">Index Tax</code> on write throughput, and master high-cardinality indexing strategies.
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
        {/* SECTION 1: The Search Problem */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Fundamental Search Problem: Full Table Scans
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why searching unindexed tables leads to disk I/O saturation as datasets scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Unindexed Table: Linear Search $O(N)$
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In an unindexed table, rows are laid out sequentially across thousands of 16KB disk pages. Finding a specific student by phone number forces the database to read every single page into memory.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-rose-300">
                1,000,000 Rows = ~200,000 Disk Pages (3.2 GB) → 2.5 Seconds Latency
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> B-Tree Indexed Search: Logarithmic $O(\log N)$
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A B-Tree index maintains keys in sorted balanced order with pointer pages. The engine navigates from the root page through 2 branch levels directly to the target leaf page in 3 reads.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                1,000,000 Rows = 3 Page Reads (48 KB) → 0.6 Milliseconds Latency
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: B-Tree vs Full Table Scan Complexity */}
        <section id="btree-vs-scan" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Scale Comparison: Linear vs Logarithmic Search Complexity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing how search time scales as the number of records increases.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Total Table Records (N)</th>
                  <th className="py-3.5 px-4 font-mono text-rose-400">Full Table Scan ($O(N)$ Pages)</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">B-Tree Index ($O(\log N)$ Reads)</th>
                  <th className="py-3.5 px-4 font-mono text-indigo-400">Efficiency Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">10,000 Records</td>
                  <td className="py-3 px-4 text-rose-300">~200 Pages (3.2 MB)</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">2 Pages</td>
                  <td className="py-3 px-4 text-cyan-400">100x Faster</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">1,000,000 Records</td>
                  <td className="py-3 px-4 text-rose-300">~20,000 Pages (320 MB)</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">3 Pages</td>
                  <td className="py-3 px-4 text-cyan-400">6,666x Faster</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">100,000,000 Records</td>
                  <td className="py-3 px-4 text-rose-300">~2,000,000 Pages (32 GB)</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">4 Pages</td>
                  <td className="py-3 px-4 text-cyan-400">500,000x Faster</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: B-Tree Traversal & The Index Tax
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See how B-Tree index traversal works and how secondary indexes create write amplification.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: B-Tree Traversal vs Linear Scan */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> B+Tree 3-Hop Traversal vs Full Table Scan Sweep
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Full Scan (Sweeps everything) */}
                  <g>
                    <rect x="20" y="20" width="360" height="220" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="200" y="45" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">1. Full Table Scan: O(N)</text>
                    <rect x="35" y="65" width="330" height="25" rx="3" fill="#1e293b" />
                    <text x="45" y="81" fill="#f87171" fontSize="9 font-mono">Page 1: Scan rows 1 - 50 (Mismatch)</text>
                    <rect x="35" y="95" width="330" height="25" rx="3" fill="#1e293b" />
                    <text x="45" y="111" fill="#f87171" fontSize="9 font-mono">Page 2: Scan rows 51 - 100 (Mismatch)</text>
                    <rect x="35" y="125" width="330" height="25" rx="3" fill="#1e293b" />
                    <text x="45" y="141" fill="#f87171" fontSize="9 font-mono">... Scans 200,000 pages sequentially ...</text>
                    <rect x="35" y="155" width="330" height="25" rx="3" fill="#064e3b" stroke="#10b981" />
                    <text x="45" y="171" fill="#34d399" fontSize="9 font-mono">Page 189,410: Found Target Row!</text>
                    <text x="200" y="215" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Latency: 2,450 ms (3.2 GB Read)</text>
                  </g>

                  {/* Right: B-Tree Hop (3 Pages) */}
                  <g>
                    <rect x="420" y="20" width="410" height="220" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="625" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">2. B+Tree Logarithmic Seek: O(log N)</text>

                    {/* Root */}
                    <rect x="525" y="65" width="200" height="30" rx="4" fill="#022c22" stroke="#34d399" />
                    <text x="625" y="84" fill="#6ee7b7" fontSize="9" textAnchor="middle font-bold">Hop 1: Root Page (Keys: A-Z)</text>

                    {/* Branch */}
                    <rect x="525" y="115" width="200" height="30" rx="4" fill="#022c22" stroke="#34d399" />
                    <text x="625" y="134" fill="#6ee7b7" fontSize="9" textAnchor="middle font-bold">Hop 2: Intermediate Branch (M-S)</text>

                    {/* Leaf */}
                    <rect x="525" y="165" width="200" height="30" rx="4" fill="#022c22" stroke="#34d399" />
                    <text x="625" y="184" fill="#34d399" fontSize="9" textAnchor="middle font-bold">Hop 3: Leaf Page → Points to Row</text>

                    <text x="625" y="225" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Latency: 0.6 ms (48 KB Read)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: The Index Tax Architecture */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The "Index Tax" — Write Amplification on Single Row INSERT
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 200" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: 1 INSERT statement */}
                  <g>
                    <rect x="20" y="60" width="200" height="70" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="120" y="88" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Single INSERT DML</text>
                    <text x="120" y="108" fill="#e2e8f0" fontSize="9" textAnchor="middle font-mono">INSERT INTO students ...</text>
                  </g>

                  {/* Right: 1 Base Table + 4 Secondary Index Updates */}
                  <g>
                    <rect x="280" y="20" width="540" height="160" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="550" y="42" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Synchronous Write Amplification (5 Distinct Tree Updates)</text>

                    <rect x="300" y="55" width="240" height="24" rx="3" fill="#020617" stroke="#10b981" />
                    <text x="420" y="71" fill="#34d399" fontSize="8 font-mono">1. Write to Clustered Table Page (PK)</text>

                    <rect x="560" y="55" width="240" height="24" rx="3" fill="#020617" stroke="#f59e0b" />
                    <text x="680" y="71" fill="#fcd34d" fontSize="8 font-mono">2. Update B-Tree: idx_email</text>

                    <rect x="300" y="90" width="240" height="24" rx="3" fill="#020617" stroke="#f59e0b" />
                    <text x="420" y="106" fill="#fcd34d" fontSize="8 font-mono">3. Update B-Tree: idx_phone</text>

                    <rect x="560" y="90" width="240" height="24" rx="3" fill="#020617" stroke="#f59e0b" />
                    <text x="680" y="106" fill="#fcd34d" fontSize="8 font-mono">4. Update B-Tree: idx_aadhaar</text>

                    <rect x="430" y="125" width="240" height="24" rx="3" fill="#020617" stroke="#f59e0b" />
                    <text x="550" y="141" fill="#fcd34d" fontSize="8 font-mono">5. Update B-Tree: idx_centre_city</text>
                  </g>

                  {/* Flow Arrow */}
                  <path d="M 220 95 L 280 95" stroke="#38bdf8" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Index Performance Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test execution latencies, disk I/O metrics, and write amplification trade-offs live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(benchmarks).map(([key, item]) => {
              const isActive = selectedBenchmark === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBenchmark(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Benchmark" : "○ Run Benchmark"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{benchmarks[selectedBenchmark].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{benchmarks[selectedBenchmark].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                1,000,000 Records Benchmark
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query & EXPLAIN Metrics</span>
                <span className="text-emerald-400">InnoDB Buffer Pool Analysis</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {benchmarks[selectedBenchmark].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">Performance Metric</th>
                    <th className="py-3 px-4 font-mono text-rose-400">Without Index (Full Scan)</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">With B-Tree Index</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Optimization Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {benchmarks[selectedBenchmark].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                      <td className="py-3 px-4 text-rose-300">{row.unindexed}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.indexed}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {row.delta}
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
              Real-world index deployments and refactoring case studies.
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
                  Academy High-Speed Student Lookup by Phone & Aadhaar
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui creates B-Tree indexes on high-cardinality candidate identifiers for Mamata, Susmita, Abhronila, and Debangshu, accelerating front-desk admission lookups from 2.4 seconds to 0.5 milliseconds!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Adding indexes to high-cardinality search columns:
CREATE INDEX idx_students_phone ON student_master (phone_number);
CREATE UNIQUE INDEX idx_students_aadhaar ON student_master (aadhaar_number);

-- Instantaneous sub-millisecond point lookup:
SELECT student_id, first_name, last_name, centre_city 
FROM student_master 
WHERE phone_number = '98300-98214';`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Over-Indexed Audit Logging Table Refactoring
                </h3>
                <span className="text-xs text-slate-400 font-mono">High-Throughput Audit Logging</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                An audit logging table with 9 separate indexes was suffering from degraded write throughput (dropping to 2,000 inserts/sec). By removing 6 unused low-cardinality indexes, write throughput increased by 400% to 10,000 inserts/sec!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`-- Dropping redundant and low-cardinality indexes to restore insert throughput:
DROP INDEX idx_audit_status ON system_audit_log;
DROP INDEX idx_audit_env ON system_audit_log;
DROP INDEX idx_audit_source ON system_audit_log;`}
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
              Avoid anti-patterns that render B-Tree indexes useless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Wrapping Indexed Columns in Functions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE UPPER(city) = 'BARRACKPORE'</code> prevents MySQL from using the index on <code className="text-rose-300 font-mono">city</code>, forcing a 100% Full Table Scan!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Store clean normalized data, or use a Functional Index in MySQL 8.0+.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Prioritize High-Cardinality Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always create indexes on columns with unique or high-diversity values (email, phone, student_id, order_id). Avoid single-column indexes on low-cardinality boolean flags.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes query selectivity and ensures optimal B-Tree index traversal.
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
                  <span>Unindexed searches require full table scans ($O(N)$ linear time).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>B-Tree indexes provide point lookups in $O(\log N)$ logarithmic time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>InnoDB reads data in fixed 16KB disk page units.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>The Index Tax: Every index adds write amplification to INSERT/UPDATE/DELETE.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe EXPLAIN type column...”</span>
                  If EXPLAIN shows <code className="text-rose-300 font-mono">type: ALL</code>, your query is doing a full table scan. Look for <code className="text-emerald-300 font-mono">type: const</code>, <code className="text-emerald-300 font-mono">ref</code>, or <code className="text-cyan-300 font-mono">range</code>.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about leading wildcards...”</span>
                  Remember that <code className="text-cyan-300 font-mono">LIKE 'Barrack%'</code> uses an index, but <code className="text-rose-300 font-mono">LIKE '%Barrack'</code> cannot use the B-Tree!
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
              Comprehensive reference questions covering indexing fundamentals, B-Trees, page I/O, write amplification, and cardinality.
            </p>
          </div>

          <FAQTemplate
            title="Introduction to Database Indexing FAQs"
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
            title="Introduction to Database Indexing and Search Cost Reductions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Teach students the classic library analogy: Imagine a library with 1,000,000 books scattered randomly on the floor. Finding a book by title means checking every single cover (Full Table Scan). An index is the categorized card catalog that tells you the exact shelf and position in 3 steps (B-Tree Seek). But remember the Index Tax: every time a new book arrives, the librarian must write new cards for every catalog!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
