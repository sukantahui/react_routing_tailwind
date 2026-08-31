import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Understanding Access Types (type): system, const, eq_ref, ref, fulltext, ref_or_null, index_merge, unique_subquery, index_subquery, range, index, ALL
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL access types (join types): const, eq_ref, ref, range, index_merge, full index scan (index), and full table scan (ALL).
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedAccessTypeScenario, setSelectedAccessTypeScenario] = useState("const_vs_eq_ref");

  const accessTypeScenarios = {
    const_vs_eq_ref: {
      title: "1. The Elite Access Types: const (Point Lookup) & eq_ref (1-to-1 Join)",
      badge: "const & eq_ref",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ THE FASTEST ACCESS TYPES IN MYSQL:
-- Case 1: CONST (Point lookup on Primary Key against constant):
EXPLAIN SELECT student_id, name, balance 
FROM student_ledgers 
WHERE student_id = 101;
-- 📊 type = 'const' | key = 'PRIMARY' | rows = 1 (Read ONCE at start!)

-- Case 2: EQ_REF (1-to-1 Join lookup on Primary Key / Unique Key):
EXPLAIN SELECT s.name, d.department_name 
FROM students s 
JOIN departments d ON s.department_id = d.department_id;
-- 📊 table = 'd' | type = 'eq_ref' | key = 'PRIMARY' | rows = 1 per outer row!`,
      resultRows: [
        { scenario: "Point Lookup (id = 101)", table: "student_ledgers", accessType: "const ⚡", keyUsed: "PRIMARY", rowsExamined: "1 Row", performanceRating: "Instant (Nanoseconds)", status: "Optimal Const ✅" },
        { scenario: "Join (d.dept_id = s.dept_id)", table: "departments (d)", accessType: "eq_ref ⚡", keyUsed: "PRIMARY", rowsExamined: "1 Per Outer Row", performanceRating: "Gold Standard Join", status: "Optimal Join ✅" },
      ],
      explanation:
        "`const` reads at most 1 matching row directly using a Primary Key or Unique key. `eq_ref` is the gold standard for joins: exactly 1 matching row is retrieved per parent row by traversing the Primary Key index.",
    },
    ref_vs_range: {
      title: "2. The Workhorse Access Types: ref (Non-Unique) & range (Bounded Range)",
      badge: "ref & range",
      badgeColor: "cyan",
      sqlQuery: `-- 📊 THE WORKHORSE ACCESS TYPES:
-- Case 1: REF (Non-unique index match returning multiple rows):
EXPLAIN SELECT * FROM student_records WHERE city = 'Barrackpore';
-- 📊 type = 'ref' | key = 'idx_city' | rows = 120 (Seeks B+Tree and reads 120 rows)

-- Case 2: RANGE (Bounded range comparison using BETWEEN / IN / > / <):
EXPLAIN SELECT * FROM student_records WHERE enrollment_year BETWEEN 2024 AND 2026;
-- 📊 type = 'range' | key = 'idx_year' | rows = 350 (Traverses bounded leaf chain!)`,
      resultRows: [
        { scenario: "City Filter (Barrackpore)", table: "student_records", accessType: "ref 🔍", keyUsed: "idx_city", rowsExamined: "120 Rows", performanceRating: "High Efficiency Seek", status: "Optimal Ref Scan ✅" },
        { scenario: "Year Range (2024-2026)", table: "student_records", accessType: "range 📈", keyUsed: "idx_year", rowsExamined: "350 Rows", performanceRating: "Bounded Leaf Scan", status: "Optimal Range Scan ✅" },
      ],
      explanation:
        "`ref` searches non-unique indexes returning multiple matching records. `range` scans a bounded sequence of B+Tree leaf pages between low and high key boundaries (used with `BETWEEN`, `>`, `<`, and `IN()`).",
    },
    index_vs_all: {
      title: "3. Full Scan Types: index (Full Index Scan) vs ALL (Full Table Scan)",
      badge: "index vs ALL",
      badgeColor: "rose",
      sqlQuery: `-- ⚠️ FULL SCAN COMPARISON:
-- Case 1: INDEX (Full Index Scan - Scans entire B+Tree leaf chain):
EXPLAIN SELECT student_id, city FROM student_records;
-- 📊 type = 'index' | key = 'idx_id_city' | rows = 100,000 | Extra = 'Using index'
-- (Still O(N), but reads compact B+Tree pages from in-memory Buffer Pool!)

-- Case 2: ALL (Full Table Scan - Scans ALL 16KB data pages on disk):
EXPLAIN SELECT * FROM student_records WHERE notes LIKE '%Scholarship%';
-- 📊 type = 'ALL' | key = NULL | rows = 100,000 | Extra = 'Using where'
-- 🚨 DANGER: Reads all physical table data pages, causing heavy disk I/O!`,
      resultRows: [
        { scenario: "Covering Select (id, city)", table: "student_records", accessType: "index", keyUsed: "idx_id_city", rowsExamined: "100,000 Index Nodes", performanceRating: "Compact Memory Scan", status: "Full Index Scan ⚠️" },
        { scenario: "Un-indexed Notes Search", table: "student_records", accessType: "ALL 🚨", keyUsed: "NULL (None)", rowsExamined: "100,000 Data Pages", performanceRating: "Heavy Disk I/O", status: "Full Table Scan ❌" },
      ],
      explanation:
        "`type = index` scans the entire B+Tree leaf chain ($O(N)$), which is faster than `ALL` because index pages are small and in memory. `type = ALL` scans all physical data pages on disk and should be eliminated in OLTP queries.",
    },
    index_merge_union: {
      title: "4. Index Merge (index_merge): Merging Independent Indexes on OR",
      badge: "index_merge",
      badgeColor: "amber",
      sqlQuery: `-- 🔀 INDEX MERGE ON OR CONDITION:
-- Suppose table has two separate indexes: idx_city (city) and idx_age (age)
EXPLAIN SELECT * FROM student_records WHERE city = 'Barrackpore' OR age = 22;

-- 📊 EXPLAIN Output:
-- type = 'index_merge'
-- possible_keys = 'idx_city,idx_age'
-- key = 'idx_city,idx_age'
-- Extra = 'Using union(idx_city,idx_age); Using where'

-- 💡 Senior Architect Solution:
-- Replace index_merge with a single query UNION ALL or evaluate filter selectivity!`,
      resultRows: [
        { scenario: "OR Condition (city OR age)", table: "student_records", accessType: "index_merge 🔀", keyUsed: "idx_city, idx_age", rowsExamined: "150 Merged", performanceRating: "CPU/Memory Merge Overhead", status: "Index Merge ⚠️" },
      ],
      explanation:
        "`type = index_merge` occurs when the optimizer scans two separate indexes and merges their row pointer lists. While better than `ALL`, it adds memory merging overhead and often signals that query refactoring is needed.",
    },
  };

  const navItems = [
    { id: "hierarchy-overview", label: "1. Access Type Hierarchy" },
    { id: "type-comparison", label: "2. Deep Access Comparison" },
    { id: "svg-diagrams", label: "3. Hierarchy & B+Tree SVGs" },
    { id: "interactive-sandbox", label: "4. Live Access Type Workbench" },
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
            <span>Topic 4 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Access Methods
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Understanding Access Types (type)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete performance hierarchy of MySQL join access types: <code className="text-emerald-400 font-mono">system</code>, <code className="text-emerald-400 font-mono">const</code>, <code className="text-emerald-400 font-mono">eq_ref</code>, <code className="text-cyan-400 font-mono">ref</code>, <code className="text-amber-400 font-mono">range</code>, <code className="text-amber-400 font-mono">index_merge</code>, <code className="text-rose-400 font-mono">index</code>, and <code className="text-rose-400 font-mono">ALL</code>.
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
        {/* SECTION 1: Access Type Hierarchy */}
        <section id="hierarchy-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Access Type Performance Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Ranked from lightning-fast point lookups down to expensive full table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Elite Tier</span>
              <h3 className="font-bold text-white">const &amp; eq_ref</h3>
              <p className="text-slate-300 text-xs">Primary Key exact lookups. Point fetches and 1-to-1 joins. Execution time: nanoseconds.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Good Tier</span>
              <h3 className="font-bold text-white">ref &amp; range</h3>
              <p className="text-slate-300 text-xs">Non-unique index lookups and bounded interval scans (`BETWEEN`, `&gt;`, `&lt;`, `IN()`).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Warning Tier</span>
              <h3 className="font-bold text-white">index_merge &amp; index</h3>
              <p className="text-slate-300 text-xs">Merging separate indexes or full B+Tree leaf scans ($O(N)$ index scan). High CPU / memory.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Danger Tier</span>
              <h3 className="font-bold text-white">ALL (Full Table Scan)</h3>
              <p className="text-slate-300 text-xs">Reads every 16KB data page in the entire table. Heavy disk I/O and buffer pool churn.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Deep Access Comparison */}
        <section id="type-comparison" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Core Access Type Dissection
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing mechanics across const, eq_ref, ref, range, index, and ALL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400 font-mono">eq_ref (Gold Standard)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Applied when joining tables on a Primary Key or Unique `NOT NULL` key. Guarantees at most 1 matching row per outer row with zero duplicate scans.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">ref (Non-Unique Match)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Used on non-unique secondary indexes. Traverses the B+Tree to find the first match and reads contiguous leaf entries for all matching rows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-rose-400 font-mono">index vs ALL</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                `index` scans the compact index tree (covering index); `ALL` scans all full table records. Both are $O(N)$, but `index` saves disk I/O.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Access Ladder &amp; B+Tree Traversal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the access type performance hierarchy and B+Tree seek patterns.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Hierarchy Ladder */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The MySQL Access Type Performance Ladder
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: const */}
                  <g>
                    <rect x="20" y="30" width="120" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="80" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. const / eq_ref</text>
                    <rect x="28" y="70" width="104" height="40" rx="4" fill="#022c22" />
                    <text x="80" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Unique Match</text>
                    <text x="80" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ 1 Row / ~0.02ms</text>
                  </g>

                  {/* Step 2: ref */}
                  <g>
                    <rect x="155" y="30" width="120" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">2. ref</text>
                    <rect x="163" y="70" width="104" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Non-Unique Match</text>
                    <text x="215" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Selective B+Tree</text>
                  </g>

                  {/* Step 3: range */}
                  <g>
                    <rect x="290" y="30" width="125" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="352" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. range</text>
                    <rect x="298" y="70" width="109" height="40" rx="4" fill="#0f172a" />
                    <text x="352" y="88" fill="#a5b4fc" fontSize="8 font-mono" textAnchor="middle">Bounded Range</text>
                    <text x="352" y="102" fill="#c7d2fe" fontSize="7 font-mono" textAnchor="middle">BETWEEN, &gt;, &lt;, IN()</text>
                  </g>

                  {/* Step 4: index_merge */}
                  <g>
                    <rect x="430" y="30" width="130" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="495" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">4. index_merge</text>
                    <rect x="438" y="70" width="114" height="40" rx="4" fill="#1e293b" />
                    <text x="495" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Multi-Index Union</text>
                    <text x="495" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Merge Overhead</text>
                  </g>

                  {/* Step 5: index */}
                  <g>
                    <rect x="575" y="30" width="125" height="100" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="637" y="55" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">5. index</text>
                    <rect x="583" y="70" width="109" height="40" rx="4" fill="#1e293b" />
                    <text x="637" y="88" fill="#fb7185" fontSize="8 font-mono" textAnchor="middle">Full Index Scan</text>
                    <text x="637" y="102" fill="#fecdd3" fontSize="7 font-mono" textAnchor="middle">O(N) Compact Tree</text>
                  </g>

                  {/* Step 6: ALL */}
                  <g>
                    <rect x="715" y="30" width="115" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="772" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">6. ALL</text>
                    <rect x="723" y="70" width="99" height="40" rx="4" fill="#1e293b" />
                    <text x="772" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Full Table Scan</text>
                    <text x="772" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 Slow Disk I/O</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 140 80 L 155 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 275 80 L 290 80" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 415 80 L 430 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 575 80" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 700 80 L 715 80" stroke="#f43f5e" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: B+Tree Traversal */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> eq_ref (Direct Pointer) vs ref (Branch Scan) vs ALL (Full Scan)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* eq_ref */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">eq_ref: Unique PK Pointer</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1 B+Tree Root-to-Leaf Seek</text>
                    <text x="145" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Exactly 1 Row Returned</text>
                  </g>

                  {/* ref */}
                  <g>
                    <rect x="290" y="30" width="240" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="410" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">ref: Non-Unique Leaf Range</text>
                    <rect x="300" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="410" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Seeks 1st Match + Scans Next Leaves</text>
                    <text x="410" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Multiple matching rows</text>
                  </g>

                  {/* ALL */}
                  <g>
                    <rect x="560" y="30" width="260" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="690" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">ALL: Sequential Disk Scan</text>
                    <rect x="570" y="70" width="240" height="40" rx="4" fill="#1e293b" />
                    <text x="690" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Bypasses B+Tree Completely</text>
                    <text x="690" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 Scans All Physical Data Pages</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 530 80 L 560 80" stroke="#06b6d4" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Access Types Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test const point lookups, eq_ref joins, ref non-unique searches, range scans, index_merge unions, and ALL full table scans live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(accessTypeScenarios).map(([key, item]) => {
              const isActive = selectedAccessTypeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAccessTypeScenario(key)}
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
                    {isActive ? "● Active Access Type" : "○ Run Access Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{accessTypeScenarios[selectedAccessTypeScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{accessTypeScenarios[selectedAccessTypeScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Access Type Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Access Method Execution Trace</span>
                <span className="text-emerald-400">Join Type Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {accessTypeScenarios[selectedAccessTypeScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Scenario / Query</th>
                    <th className="py-3 px-4 text-white">Target Table</th>
                    <th className="py-3 px-4 text-emerald-400 font-bold">Access Type (type)</th>
                    <th className="py-3 px-4 text-amber-400">Key Used</th>
                    <th className="py-3 px-4 text-white">Rows Examined</th>
                    <th className="py-3 px-4 text-slate-300">Performance Rating</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {accessTypeScenarios[selectedAccessTypeScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.scenario}</td>
                      <td className="py-3 px-4 text-slate-300">{row.table}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.accessType}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.keyUsed}</td>
                      <td className="py-3 px-4 text-white">{row.rowsExamined}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.performanceRating}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Fast")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : row.status.includes("Index") || row.status.includes("Scan")
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
              Replacing index_merge overhead with composite indexes and eliminating ALL table scans in Barrackpore.
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
                  Eliminating index_merge Overhead in Barrackpore Student Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Admission API</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved high CPU spikes on a query filtering `WHERE city = 'Barrackpore' AND category = 'General'`: The table had two independent single-column indexes on `city` and `category`. MySQL used <code className="text-amber-300 font-mono">type = index_merge (Using intersect(idx_city, idx_category))</code>, consuming high CPU to merge 15,000 index pointers in memory on every request. Creating a single composite index <code className="text-emerald-300 font-mono">INDEX idx_city_category (city, category)</code> upgraded the access type to <code className="text-emerald-300 font-mono">type = ref</code>, reducing query latency from <strong>180ms to 2ms</strong> and cutting CPU usage by <strong>80%</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- The Performance Tuning Fix:
ALTER TABLE students ADD INDEX idx_city_category (city, category);

-- Upgrades execution from index_merge → ref!
EXPLAIN SELECT * FROM students WHERE city = 'Barrackpore' AND category = 'General';`}
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
              Eliminate type = ALL on large tables and replace index_merge with composite indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Mistaking type = index for an Index Seek
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `type = index` is NOT an index seek! It is a **Full Index Scan** that reads the entire B+Tree leaf chain from beginning to end ($O(N)$). While better than `ALL`, it still scans all entries.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Aim for `const`, `eq_ref`, `ref`, or `range` for selective point queries!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Target eq_ref for All Foreign Key Joins
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure that all joined parent tables have unique primary keys so the optimizer chooses `type = eq_ref`, guaranteeing 1-to-1 index lookups with zero duplicate evaluations.
              </p>
              <div className="text-xs text-slate-400">
                Delivers the highest possible join throughput in MySQL.
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
              Key takeaways for Access Types (`type`).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Access Types Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">const</code>: Single-row PK point lookup (nanoseconds).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">eq_ref</code>: Gold standard 1-to-1 PK join lookup.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">ref</code> / <code className="text-cyan-300 font-mono">range</code>: Optimal for non-unique &amp; interval filters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Eliminate <code className="text-rose-400 font-mono">type = ALL</code> on large tables in production!</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe index_merge as a design hint...”</span>
                  When `index_merge` appears, treat it as an explicit invitation from the optimizer to create a composite index containing both columns!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Buffer Pool churn...”</span>
                  `type = ALL` on a 5GB table will flush useful active cached pages out of the Buffer Pool, degrading the performance of all other concurrent queries!
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
              Comprehensive reference questions covering MySQL join access types: system, const, eq_ref, ref, fulltext, ref_or_null, index_merge, unique_subquery, index_subquery, range, index, and ALL.
            </p>
          </div>

          <FAQTemplate
            title="Access Types FAQs"
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
            title="Understanding Access Types (type): system, const, eq_ref, ref, fulltext, ref_or_null, index_merge, unique_subquery, index_subquery, range, index, ALL"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="The `type` column in EXPLAIN is the ultimate litmus test for query performance. Always memorize the hierarchy: `const` and `eq_ref` are elite; `ref` and `range` are the reliable workhorses; `index_merge` is an alert to build a composite index; and `ALL` on large tables is a performance emergency. Design your primary keys and secondary indexes to keep your queries in the top tier!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
