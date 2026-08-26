import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – The Leftmost Prefix Rule for Composite Indexes
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on the Leftmost Prefix Rule, key_len byte auditing, and Index Skip Scans in MySQL 8.0+.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedPrefixScenario, setSelectedPrefixScenario] = useState("full_prefix_match");

  const prefixScenarios = {
    full_prefix_match: {
      title: "1. Full Leftmost Prefix: (city, stream, status) — 100% Index Usage",
      badge: "✓ Full Prefix (0.4 ms)",
      badgeColor: "emerald",
      sqlQuery: `-- Index Definition:
-- CREATE INDEX idx_cohort ON students (centre_city, course_stream, admission_status);

SELECT student_id, student_name, centre_city, course_stream, admission_status
FROM students
WHERE centre_city = 'Barrackpore' 
  AND course_stream = 'React Fullstack' 
  AND admission_status = 'ACTIVE';

-- EXPLAIN Analysis:
-- Key: idx_cohort
-- Key_len: 609 bytes (All 3 columns participating in B-Tree Seek!)
-- Type: ref | Rows Examined: 2
-- Latency: 0.4 ms (Instantaneous 3-Level Seek)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", keyLen: "609 bytes (3 Cols)", outcome: "100% Prefix Match" },
        { id: "STU-104", name: "Debangshu Roy", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", keyLen: "609 bytes (3 Cols)", outcome: "100% Prefix Match" },
      ],
      explanation:
        "All 3 columns match the index prefix contiguously from left to right. The B-Tree performs a precise point seek with zero table scans.",
    },
    leading_one_column_prefix: {
      title: "2. Leading 1-Column Prefix: (city) — Reusing the Composite Index",
      badge: "✓ Valid 1-Col Prefix (0.5 ms)",
      badgeColor: "cyan",
      sqlQuery: `-- Query filters ONLY on the leading leftmost column:
SELECT student_id, student_name, centre_city, course_stream
FROM students
WHERE centre_city = 'Barrackpore';

-- EXPLAIN Analysis:
-- Key: idx_cohort
-- Key_len: 203 bytes (Only 1st column 'centre_city' used for seek)
-- Type: ref | Rows Examined: 120
-- Latency: 0.5 ms (No separate single-column index on city needed!)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", keyLen: "203 bytes (1 Col)", outcome: "Leading Prefix Match" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Microservices", city: "Barrackpore", status: "ACTIVE", keyLen: "203 bytes (1 Col)", outcome: "Leading Prefix Match" },
      ],
      explanation:
        "Because 'centre_city' is the leading column, the composite index satisfies single-column city searches, rendering a separate index on city redundant.",
    },
    missing_leading_column_violation: {
      title: "3. Missing Leading Column: (stream) — Prefix Rule Violation",
      badge: "❌ Table Scan / Skip Scan (2.2 ms)",
      badgeColor: "rose",
      sqlQuery: `-- Query filters on 2nd column 'course_stream' WITHOUT 'centre_city':
SELECT student_id, student_name, centre_city, course_stream
FROM students
WHERE course_stream = 'React Fullstack';

-- EXPLAIN Analysis:
-- Key: NULL (or idx_cohort via 'Using index for skip scan' in MySQL 8.0+)
-- Key_len: NULL / 406 bytes
-- Type: ALL / range
-- Latency: 2.2 ms (B-Tree cannot navigate to stream without leading city!)`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", keyLen: "NULL (Violated)", outcome: "Full Scan / Skip Scan" },
        { id: "STU-103", name: "Abhronila Saha", stream: "React Fullstack", city: "Kolkata", status: "ACTIVE", keyLen: "NULL (Violated)", outcome: "Full Scan / Skip Scan" },
      ],
      explanation:
        "Skipping the leading column violates the Leftmost Prefix Rule. The B-Tree cannot jump to 'React Fullstack' directly because courses are scattered across each city group.",
    },
    middle_column_gap_icp: {
      title: "4. Middle Column Gap: (city, status) — Seek on Col 1 + ICP on Col 3",
      badge: "⚠️ Partial Seek + ICP (0.8 ms)",
      badgeColor: "amber",
      sqlQuery: `-- Query filters on 1st and 3rd columns (skipping 2nd column 'course_stream'):
SELECT student_id, student_name, centre_city, course_stream, admission_status
FROM students
WHERE centre_city = 'Barrackpore' 
  AND admission_status = 'ACTIVE';

-- EXPLAIN Analysis:
-- Key: idx_cohort
-- Key_len: 203 bytes (Only 1st column 'centre_city' used for B-Tree seek!)
-- Extra: 'Using index condition' (admission_status evaluated via ICP at leaf level)
-- Latency: 0.8 ms`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", status: "ACTIVE", keyLen: "203 bytes (Col 1 Seek)", outcome: "Col 1 Seek + Col 3 ICP" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Microservices", city: "Barrackpore", status: "ACTIVE", keyLen: "203 bytes (Col 1 Seek)", outcome: "Col 1 Seek + Col 3 ICP" },
      ],
      explanation:
        "The gap on the 2nd column prevents B-Tree seek pruning for the 3rd column. MySQL seeks on 'centre_city' and uses Index Condition Pushdown (ICP) to filter 'admission_status'.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Leftmost Prefix Rule" },
    { id: "phone-book-analogy", label: "2. The Telephone Directory Analogy" },
    { id: "svg-diagrams", label: "3. Prefix Pyramid & key_len SVGs" },
    { id: "interactive-sandbox", label: "4. Live Prefix Workbench" },
    { id: "keylen-calculation", label: "5. Calculating key_len" },
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
            <span>Topic 11 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Index Traversal Rules
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Leftmost Prefix Rule for Composite Indexes
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the golden rule of composite B-Tree navigation. Learn how contiguous leftmost column prefixes enable sub-millisecond seeks, audit index depth via{" "}
            <code className="text-cyan-300 font-mono font-bold">key_len</code>, and leverage{" "}
            <code className="text-emerald-300 font-mono font-bold">Index Skip Scans</code>.
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
              1. What is the Leftmost Prefix Rule?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why composite B-Trees can only navigate queries starting from the first indexed column.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>✓</span> Valid Leftmost Prefixes for (A, B, C)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Queries filtering on contiguous prefixes starting from column <code className="text-emerald-300 font-mono font-bold">A</code> utilize fast B-Tree seeks:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside font-mono">
                <li className="text-emerald-300">WHERE A = ? (Uses Column 1)</li>
                <li className="text-emerald-300">WHERE A = ? AND B = ? (Uses Columns 1 & 2)</li>
                <li className="text-emerald-300">WHERE A = ? AND B = ? AND C = ? (Uses All 3 Columns)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Invalid Non-Prefix Queries for (A, B, C)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Queries that omit leading column <code className="text-rose-300 font-mono font-bold">A</code> cannot perform standard B-Tree seeks:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside font-mono">
                <li className="text-rose-400">WHERE B = ? (Missing A → Full Table Scan)</li>
                <li className="text-rose-400">WHERE C = ? (Missing A & B → Full Table Scan)</li>
                <li className="text-rose-400">WHERE B = ? AND C = ? (Missing A → Full Table Scan)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Phone Book Analogy */}
        <section id="phone-book-analogy" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Telephone Directory Analogy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding why tree navigation fails when the leading sorting key is missing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If a physical telephone book is sorted alphabetically by <code className="text-cyan-300 font-mono">(LastName, FirstName, City)</code>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-emerald-400 font-bold uppercase font-mono">✓ Query: (Hui, Mamata, Barrackpore)</span>
                <p className="text-slate-300">
                  Instant lookup! You jump directly to "Hui" → "Mamata" → "Barrackpore".
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-rose-400 font-bold uppercase font-mono">❌ Query: (First Name = 'Mamata')</span>
                <p className="text-slate-300">
                  You cannot jump anywhere because "Mamata" is scattered under Banerjee, Chatterjee, Hui, Mukherjee, Roy, and Sen!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Prefix Pruning Pyramid & key_len Layout
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how leftmost prefixes narrow down the search space and how key_len bytes are calculated.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Prefix Pruning Pyramid */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Leftmost Prefix Pruning Pyramid
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 240" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Filter Col 1 */}
                  <g>
                    <polygon points="50,20 400,20 330,80 120,80" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="225" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">1. Filter Col 1: centre_city = 'Barrackpore'</text>
                    <text x="225" y="65" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Narrows from 1,000,000 → 12,000 Rows</text>
                  </g>

                  {/* Step 2: Filter Col 2 */}
                  <g>
                    <polygon points="120,85 330,85 285,145 165,145" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="225" y="110" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Filter Col 2: course_stream = 'React'</text>
                    <text x="225" y="128" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Narrows from 12,000 → 65 Rows</text>
                  </g>

                  {/* Step 3: Filter Col 3 */}
                  <g>
                    <polygon points="165,150 285,150 245,210 205,210" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="225" y="175" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Filter Col 3: status = 'ACTIVE'</text>
                    <text x="225" y="195" fill="#6ee7b7" fontSize="8 font-mono" textAnchor="middle">Narrows to 2 Target Rows!</text>
                  </g>

                  {/* Right Side Explanation */}
                  <g>
                    <rect x="460" y="30" width="360" height="170" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="640" y="55" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Leftmost Prefix Traversal Properties</text>
                    <rect x="475" y="70" width="330" height="30" rx="4" fill="#0f172a" />
                    <text x="485" y="89" fill="#38bdf8" fontSize="8 font-mono">1. Every step prunes 95%+ of remaining keys.</text>
                    <rect x="475" y="110" width="330" height="30" rx="4" fill="#0f172a" />
                    <text x="485" y="129" fill="#38bdf8" fontSize="8 font-mono">2. Skipping step 1 breaks the entire pyramid!</text>
                    <rect x="475" y="150" width="330" height="35" rx="4" fill="#022c22" stroke="#10b981" />
                    <text x="640" y="172" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">✓ Result: 0.4 ms Point Seek Latency</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: key_len Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> `key_len` Byte Anatomy across UTF8MB4 Columns
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 180" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Col 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">centre_city: VARCHAR(50)</text>
                    <rect x="45" y="70" width="210" height="25" rx="3" fill="#1e293b" />
                    <text x="150" y="86" fill="#e2e8f0" fontSize="8 font-mono" textAnchor="middle">50 * 4 bytes = 200 bytes</text>
                    <text x="150" y="125" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">+2 len + 1 null = 203 Bytes</text>
                  </g>

                  {/* Col 2 */}
                  <g>
                    <rect x="295" y="30" width="240" height="110" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="415" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">course_stream: VARCHAR(50)</text>
                    <rect x="310" y="70" width="210" height="25" rx="3" fill="#1e293b" />
                    <text x="415" y="86" fill="#e2e8f0" fontSize="8 font-mono" textAnchor="middle">50 * 4 bytes = 200 bytes</text>
                    <text x="415" y="125" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">+2 len + 1 null = 203 Bytes</text>
                  </g>

                  {/* Col 3 */}
                  <g>
                    <rect x="560" y="30" width="260" height="110" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="690" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">admission_status: VARCHAR(50)</text>
                    <rect x="575" y="70" width="230" height="25" rx="3" fill="#022c22" />
                    <text x="690" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">50 * 4 bytes = 200 bytes</text>
                    <text x="690" y="125" fill="#34d399" fontSize="9 font-mono font-bold" textAnchor="middle">Total key_len = 609 Bytes</text>
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
              4. Interactive Leftmost Prefix Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test full prefix seeks, leading single-column reusability, prefix violations, and middle column gaps live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(prefixScenarios).map(([key, item]) => {
              const isActive = selectedPrefixScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPrefixScenario(key)}
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
                    {isActive ? "● Active Test" : "○ Run Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{prefixScenarios[selectedPrefixScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{prefixScenarios[selectedPrefixScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                B-Tree Prefix Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query & EXPLAIN Execution Plan</span>
                <span className="text-emerald-400">key_len Byte Inspection</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {prefixScenarios[selectedPrefixScenario].sqlQuery}
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
                    <th className="py-3 px-4 font-mono text-indigo-400">status</th>
                    <th className="py-3 px-4 font-mono text-amber-400">key_len Used</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">Prefix Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {prefixScenarios[selectedPrefixScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.status}</td>
                      <td className="py-3 px-4 font-bold text-amber-300">{row.keyLen}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.outcome.includes("100%") || row.outcome.includes("Leading")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : row.outcome.includes("Violated") || row.outcome.includes("Full Scan")
                              ? "bg-rose-950 text-rose-400 border-rose-800"
                              : "bg-amber-950 text-amber-400 border-amber-800"
                          )}
                        >
                          {row.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Calculating key_len */}
        <section id="keylen-calculation" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. How to Calculate `key_len` in MySQL InnoDB
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Formula reference for computing index byte sizes in UTF8MB4 databases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold uppercase">INT (4 Bytes):</span>
              <p className="text-slate-300">4 bytes (NOT NULL) or 5 bytes (NULLable: 4 + 1 flag byte).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase">BIGINT (8 Bytes):</span>
              <p className="text-slate-300">8 bytes (NOT NULL) or 9 bytes (NULLable: 8 + 1 flag byte).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold uppercase">VARCHAR(N) utf8mb4:</span>
              <p className="text-slate-300">(N * 4) + 2 (length) + 1 (null byte if nullable).</p>
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
              Real-world index prefix optimizations and `key_len` production audits.
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
                  Detecting Partial Prefix Traversal on Academy Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audits slow student report queries and discovers that <code className="text-rose-300 font-mono">key_len = 203</code> instead of 609 bytes because a non-sargable function <code className="text-rose-300 font-mono">YEAR(enrollment_date)</code> was terminating the composite index prefix! Rewriting it to a sargable range restored full 3-column index utilization.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Suboptimal (Only uses centre_city, key_len = 203):
SELECT * FROM students 
WHERE centre_city = 'Barrackpore' AND YEAR(enrollment_date) = 2026;

-- Optimized (Uses both columns, key_len = 208):
SELECT * FROM students 
WHERE centre_city = 'Barrackpore' 
  AND enrollment_date >= '2026-01-01' AND enrollment_date <= '2026-12-31';`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  MySQL 8.0 Index Skip Scan on Branch Master
                </h3>
                <span className="text-xs text-slate-400 font-mono">Low-Cardinality Leading Column</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                With index <code className="text-cyan-300 font-mono">(branch_code, invoice_number)</code>, where <code className="text-cyan-300 font-mono">branch_code</code> has only 3 distinct branches ('BKP', 'KOL', 'ICH'), searching by <code className="text-cyan-300 font-mono">invoice_number</code> alone leverages Index Skip Scan without needing a separate index!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`-- EXPLAIN Extra: 'Using index for skip scan':
SELECT * FROM branch_invoices WHERE invoice_number = 'INV-2026-9812';`}
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
              Avoid prefix truncation and broken index navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Skipping the Middle Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In <code className="text-rose-300 font-mono">INDEX (A, B, C)</code>, querying <code className="text-rose-300 font-mono">WHERE A = 1 AND C = 3</code> breaks B-Tree seek pruning for column <code className="text-rose-300 font-mono">C</code>! Only <code className="text-rose-300 font-mono">A</code> participates in the seek.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Design composite index ordering to match actual query filter combinations.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Verify key_len in EXPLAIN
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never assume an entire composite index is being used just because the index name appears in the <code className="text-emerald-400 font-mono">key</code> column. Always check <code className="text-emerald-400 font-mono">key_len</code>!
              </p>
              <div className="text-xs text-slate-400">
                Guarantees all intended columns are participating in the B-Tree seek.
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
                  <span>Composite index seeks require a contiguous prefix starting from column 1.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">key_len</code> indicates the exact byte length of index columns used for seeking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Index Skip Scan in MySQL 8.0+ can skip low-cardinality leading columns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>SQL WHERE condition ordering does not matter; MySQL reorders equality predicates.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe SQL predicate ordering...”</span>
                  Writing <code className="text-cyan-300 font-mono">WHERE stream = 'React' AND city = 'Barrackpore'</code> works identically to <code className="text-cyan-300 font-mono">WHERE city = 'Barrackpore' AND stream = 'React'</code> because MySQL optimizer reorders equality filters automatically!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about redundant sub-indexes...”</span>
                  If you have <code className="text-cyan-300 font-mono">INDEX (A, B, C)</code>, drop existing <code className="text-rose-300 font-mono">INDEX (A)</code> and <code className="text-rose-300 font-mono">INDEX (A, B)</code> to save disk and boost insert speed!
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
              Comprehensive reference questions covering the Leftmost Prefix Rule, key_len calculations, Index Skip Scans, and prefix violations.
            </p>
          </div>

          <FAQTemplate
            title="The Leftmost Prefix Rule FAQs"
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
            title="The Leftmost Prefix Rule for Composite Indexes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Teach students the golden rule of multi-column indexes: B-Trees are strict top-down navigators. If you have an index on (City, Stream, Status), querying by City works. Querying by (City, Stream) works. But querying by Stream alone is like opening a phone directory and searching for someone named 'Mamata' without knowing their last name — you'd have to read the whole book from start to finish! Always check key_len in EXPLAIN to verify how many columns were actually used."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
