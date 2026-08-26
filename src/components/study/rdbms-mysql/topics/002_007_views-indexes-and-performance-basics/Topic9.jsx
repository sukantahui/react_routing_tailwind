import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Clustered Index (Primary Key) vs Secondary (Non-Clustered) Indexes
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on InnoDB Clustered Index architecture, Secondary B-Tree lookups, and covering index optimizations.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedLookupPath, setSelectedLookupPath] = useState("direct_clustered_seek");

  const lookupPaths = {
    direct_clustered_seek: {
      title: "1. Direct Clustered Index Seek: 1-Step Direct Row Access",
      badge: "⚡ 1-Step Direct Seek (0.4 ms)",
      badgeColor: "emerald",
      sqlQuery: `-- Point seek on table's PRIMARY KEY:
SELECT 
    student_id,
    student_name,
    centre_city,
    course_stream,
    tuition_fee_inr
FROM students
WHERE student_id = 101;

-- Execution Mechanics:
-- 1. Traverses PRIMARY B+Tree directly (Root &rarr; Branch -&gt; Leaf).
-- 2. Leaf Page contains the COMPLETE PHYSICAL ROW (All columns)!
-- 3. Returns data in a single step (Zero secondary lookups).
-- Type: const / eq_ref | Key: PRIMARY | Latency: 0.4 ms`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React & Redux Pro", city: "Barrackpore", fee: "₹25,000.00", steps: "1 Step (Direct Clustered Leaf)", status: "Optimal Direct Read" },
      ],
      explanation:
        "The Clustered Index leaf node contains the entire row payload. A point lookup on the Primary Key finishes in a single B-Tree traversal without secondary seeks.",
    },
    secondary_double_lookup: {
      title: "2. Secondary Index Double Lookup (Bookmark / Key Lookup)",
      badge: "2-Step Double Lookup (1.1 ms)",
      badgeColor: "amber",
      sqlQuery: `-- Searching on secondary index (phone_number) and requesting non-indexed columns:
SELECT 
    student_id,
    student_name,
    centre_city,
    tuition_fee_inr
FROM students
WHERE phone_number = '98300-98214';

-- Execution Mechanics:
-- Step 1 (Secondary Seek): Traverses 'idx_phone' B-Tree -> Finds PK 'student_id = 101'.
-- Step 2 (Bookmark Lookup): Takes PK 101 and performs a 2nd B-Tree seek on PRIMARY table to fetch name & fee!
-- Type: ref | Key: idx_phone | Latency: 1.1 ms (2 B-Tree traversals)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React & Redux Pro", city: "Barrackpore", fee: "₹25,000.00", steps: "2 Steps (Secondary Seek + Clustered Lookup)", status: "Double Lookup Overhead" },
      ],
      explanation:
        "Secondary index leaves store only the indexed key and the Primary Key bookmark. To fetch non-indexed columns, MySQL must perform a second seek on the Clustered Index.",
    },
    covering_index_shortcut: {
      title: "3. Covering Index: Bypassing the Clustered Seek Completely",
      badge: "⚡ Covering Index (0.4 ms)",
      badgeColor: "cyan",
      sqlQuery: `-- Query requests ONLY columns present in the secondary index leaf node:
SELECT 
    student_id,    -- (PK: Implicitly stored in secondary index!)
    phone_number  -- (Indexed key)
FROM students
WHERE phone_number = '98300-98214';

-- Execution Mechanics:
-- 1. Traverses 'idx_phone' B-Tree -> Leaf contains both phone_number AND student_id.
-- 2. Returns immediately from secondary index leaf!
-- 3. Step 2 (Clustered seek) is COMPLETELY BYPASSED!
-- EXPLAIN Extra: 'Using index' | Latency: 0.4 ms`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui (Implicit PK)", stream: "Not Needed", city: "Not Needed", fee: "98300-98214", steps: "1 Step (Satisfied in Secondary Leaf)", status: "Using index (Covering)" },
      ],
      explanation:
        "Because the Primary Key is implicitly embedded in every secondary index leaf node, selecting only indexed columns + PK avoids the clustered seek entirely.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Clustered vs Secondary Overview" },
    { id: "double-lookup", label: "2. The Double Lookup Mechanics" },
    { id: "svg-diagrams", label: "3. Physical Layout & Lookup SVGs" },
    { id: "interactive-sandbox", label: "4. Live Index Path Workbench" },
    { id: "pk-bloat", label: "5. The Primary Key Bloat Rule" },
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
            <span>Topic 9 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Index Architecture Deep-Dive
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Clustered Index (Primary Key) vs Secondary (Non-Clustered) Indexes
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand InnoDB's Index-Organized Table layout. Learn why Clustered Indexes store full row data, how Secondary Indexes store Primary Key bookmarks, and how{" "}
            <code className="text-cyan-300 font-mono font-bold">Covering Indexes</code> eliminate the{" "}
            <code className="text-amber-300 font-mono font-bold">Double Lookup</code>.
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
              1. The Two Index Categories in InnoDB
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL InnoDB physically structures table data versus auxiliary search trees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  CLUSTERED
                </span>
                <h3 className="text-base font-bold text-white">Clustered Index (The Table Itself)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The table IS the index. Built automatically on the table's <code className="text-emerald-300 font-mono font-bold">PRIMARY KEY</code>.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Exactly <strong>1</strong> per table.</li>
                <li>Leaf nodes store the <strong>complete physical row data</strong> (all columns).</li>
                <li>Determines physical sorting order of rows on disk.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-xs font-bold border border-indigo-800">
                  SECONDARY
                </span>
                <h3 className="text-base font-bold text-white">Secondary (Non-Clustered) Index</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Separate auxiliary B+Tree structures created on non-PK columns (e.g. email, phone).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Multiple per table (up to 64 in InnoDB).</li>
                <li>Leaf nodes store <strong>indexed keys + Primary Key bookmark</strong>.</li>
                <li>Does not alter base table physical order.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Double Lookup */}
        <section id="double-lookup" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Double Lookup (Bookmark / Key Lookup)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why secondary index queries require two sequential B-Tree traversals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold text-xs uppercase font-mono">Hop 1: Secondary B-Tree Seek</span>
                <p className="text-xs text-slate-300">
                  MySQL navigates <code className="text-cyan-300 font-mono">idx_phone</code> to find <code className="text-cyan-300 font-mono">'98300-98214'</code>. It finds the entry containing Primary Key <code className="text-emerald-300 font-mono">student_id = 101</code>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-xs uppercase font-mono">Hop 2: Clustered Table Seek</span>
                <p className="text-xs text-slate-300">
                  MySQL takes <code className="text-emerald-300 font-mono">student_id = 101</code> and performs a second seek on the Clustered Index to retrieve full row columns (<code className="text-white font-mono">student_name, tuition_fee</code>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Clustered vs Secondary Physical Layout
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See the payload difference between Clustered Index leaves and Secondary Index leaves.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Physical Payload Difference */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Clustered Index (Full Row) vs Secondary Index (Key + PK)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Clustered Index */}
                  <g>
                    <rect x="20" y="20" width="380" height="220" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="210" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. Clustered Index (PRIMARY KEY: student_id)</text>
                    <rect x="35" y="65" width="350" height="32" rx="4" fill="#022c22" />
                    <text x="45" y="85" fill="#a7f3d0" fontSize="9 font-mono">PK: 101 | Mamata Hui | Barrackpore | ₹25,000</text>
                    <rect x="35" y="105" width="350" height="32" rx="4" fill="#022c22" />
                    <text x="45" y="125" fill="#a7f3d0" fontSize="9 font-mono">PK: 102 | Susmita Sen | Barrackpore | ₹25,000</text>
                    <rect x="35" y="145" width="350" height="32" rx="4" fill="#022c22" />
                    <text x="45" y="165" fill="#a7f3d0" fontSize="9 font-mono">PK: 103 | Abhronila Saha | Kolkata | ₹25,000</text>
                    <text x="210" y="215" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">LEAF PAYLOAD: Complete Physical Row (All Columns)</text>
                  </g>

                  {/* Right: Secondary Index */}
                  <g>
                    <rect x="440" y="20" width="380" height="220" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="45" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">2. Secondary Index (idx_phone)</text>
                    <rect x="455" y="65" width="350" height="32" rx="4" fill="#0f172a" />
                    <text x="465" y="85" fill="#38bdf8" fontSize="9 font-mono">Key: '98300-11111' | PK Bookmark: 103</text>
                    <rect x="455" y="105" width="350" height="32" rx="4" fill="#0f172a" />
                    <text x="465" y="125" fill="#38bdf8" fontSize="9 font-mono">Key: '98300-74120' | PK Bookmark: 102</text>
                    <rect x="455" y="145" width="350" height="32" rx="4" fill="#0f172a" />
                    <text x="465" y="165" fill="#38bdf8" fontSize="9 font-mono">Key: '98300-98214' | PK Bookmark: 101</text>
                    <text x="630" y="215" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">LEAF PAYLOAD: Indexed Column + PK Bookmark Only</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: The Double Lookup Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The Double Lookup Flow vs Covering Index Shortcut
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 200" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="40" width="230" height="110" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="135" y="65" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">1. Secondary Seek (idx_phone)</text>
                    <rect x="35" y="80" width="200" height="24" rx="3" fill="#0f172a" />
                    <text x="135" y="96" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">Finds: PK = 101</text>
                  </g>

                  {/* Step 2 (Bookmark Lookup) */}
                  <g>
                    <rect x="350" y="40" width="250" height="110" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="475" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2. Clustered Seek (PRIMARY)</text>
                    <rect x="365" y="80" width="220" height="24" rx="3" fill="#022c22" />
                    <text x="475" y="96" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Fetches: Mamata, Fee ₹25k</text>
                  </g>

                  {/* Flow Arrow Step 1 &rarr; Step 2 */}
                  <path d="M 250 95 L 350 95" stroke="#f59e0b" strokeWidth="2" />
                  <text x="300" y="85" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">PK 101</text>

                  {/* Covering Shortcut Arrow */}
                  <path d="M 135 150 C 135 185, 725 185, 725 150" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="430" y="195" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">⚡ Covering Index: Returns directly from Step 1 (Bypasses Step 2!)</text>

                  {/* Result Box */}
                  <g>
                    <rect x="670" y="40" width="160" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="750" y="70" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Client Query</text>
                    <text x="750" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle font-mono">Result Delivered</text>
                  </g>

                  <path d="M 600 95 L 670 95" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Clustered vs Secondary Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test direct clustered seeks, secondary double lookups, and covering index shortcuts live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(lookupPaths).map(([key, item]) => {
              const isActive = selectedLookupPath === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLookupPath(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                &gt;
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
                    {isActive ? "● Active Path" : "○ Run Lookup"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{lookupPaths[selectedLookupPath].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{lookupPaths[selectedLookupPath].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                InnoDB Index Access Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Lookup Query & Traversal Steps</span>
                <span className="text-emerald-400">Bookmark Lookup Inspection</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {lookupPaths[selectedLookupPath].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id</th>
                    <th className="py-3 px-4 font-mono text-white">student_name</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">course_stream</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">centre_city</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">tuition_fee / phone</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Lookup Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lookupPaths[selectedLookupPath].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Covering")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-amber-950 text-amber-400 border-amber-800"
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

        {/* SECTION 5: Primary Key Bloat */}
        <section id="pk-bloat" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. The "Primary Key Bloat" Architectural Rule
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why wide primary keys cause write amplification and memory bloat across all secondary indexes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Because <strong>every secondary index leaf node</strong> stores a copy of the table's Primary Key:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-emerald-400 font-bold uppercase">4-Byte INT Primary Key:</span>
                <p className="text-slate-300">
                  Each secondary index leaf entry stores <code className="text-emerald-300 font-mono">Key + 4 bytes</code>. 5 secondary indexes add only ~20 MB of index storage for 1,000,000 rows.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-rose-400 font-bold uppercase">36-Byte UUID Primary Key:</span>
                <p className="text-slate-300">
                  Each secondary index leaf entry stores <code className="text-rose-300 font-mono">Key + 36 bytes</code>. 5 secondary indexes waste over <strong>180 MB</strong> of additional memory and disk space!
                </p>
              </div>
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
              Real-world implementations of clustered primary keys and covering secondary indexes.
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
                  Eliminating Bookmark Lookups on Academy Student Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactors student email logins for Mamata, Susmita, Abhronila, and Debangshu by creating a covering secondary index on <code className="text-emerald-300 font-mono">(email, password_hash)</code>, reducing login authentication latency from 1.4 ms to 0.4 ms!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Creating a Covering Secondary Index:
CREATE INDEX idx_student_auth ON students (email, password_hash);

-- Query is satisfied 100% within the secondary index leaf (EXPLAIN: 'Using index'):
SELECT student_id, password_hash 
FROM students 
WHERE email = 'mamata.hui@example.com';`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce High-Throughput Order Status Checking
                </h3>
                <span className="text-xs text-slate-400 font-mono">Order Tracking Microservice</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Creating a composite covering index on <code className="text-cyan-300 font-mono">(tracking_number, order_status, estimated_delivery)</code> allowing millions of customers to check shipping status without touching the heavy clustered order table.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE INDEX idx_tracking_status ON order_shipments (tracking_number, order_status, estimated_delivery);`}
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
              Avoid clustered key migration penalties and secondary index bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Mutating Primary Key Column Values
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Updating a Primary Key physically moves the row in the Clustered B-Tree and rewrites the bookmark pointer in <strong>every single secondary index</strong> on the table!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Primary keys must be immutable (static). Never use mutable columns as PKs.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Define an Explicit Sequential PK
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always define an explicit <code className="text-emerald-400 font-mono">BIGINT AUTO_INCREMENT PRIMARY KEY</code>. It avoids the global mutex bottleneck of synthetic <code className="text-rose-300 font-mono">GEN_CLUST_INDEX</code> and keeps secondary indexes compact.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes page fan-out and ensures zero-split append performance.
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
                  <span>Clustered index leaf nodes store the complete physical row data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Secondary index leaf nodes store the indexed key + Primary Key bookmark.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Double Lookup: Secondary Seek → Primary Key → Clustered Table Seek.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Covering Index: Satisfies queries directly in secondary leaf (<code className="text-cyan-300 font-mono">Using index</code>).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe implicit Primary Key storage...”</span>
                  Never explicitly create <code className="text-cyan-300 font-mono">INDEX (col, pk)</code> because InnoDB automatically includes the Primary Key in every secondary index leaf node!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about covering queries...”</span>
                  When designing high-frequency API endpoints, add requested return columns into the secondary index to eliminate the clustered seek and double throughput!
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
              Comprehensive reference questions covering Clustered vs Secondary indexes, Double Lookups, Covering Indexes, and Primary Key bloat.
            </p>
          </div>

          <FAQTemplate
            title="Clustered vs Secondary Indexes FAQs"
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
            title="Clustered Index (Primary Key) vs Secondary (Non-Clustered) Indexes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Make sure students understand that in InnoDB, the table IS the Clustered Index. When they query by Primary Key, they get the full row in 1 step. But when they query by a Secondary Index (like phone number), the engine finds the Primary Key first and then makes a second hop to the Clustered Index. Teach them how to write Covering Indexes to kill that second hop and achieve instant response times!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
