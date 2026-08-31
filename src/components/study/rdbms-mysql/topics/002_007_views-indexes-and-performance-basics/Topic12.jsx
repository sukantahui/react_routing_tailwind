import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – UNIQUE Indexes and FULLTEXT Indexes Overview
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on UNIQUE integrity constraints, Error 1062 prevention, and Inverted FULLTEXT search mechanics.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedEngineMode, setSelectedEngineMode] = useState("unique_duplicate_guard");

  const engineModes = {
    unique_duplicate_guard: {
      title: "1. UNIQUE Index: Data Integrity & Error 1062 Prevention",
      badge: "Duplicate Firewall (O(log N))",
      badgeColor: "rose",
      sqlQuery: `-- 1. Enforcing unique student Aadhaar numbers:
CREATE UNIQUE INDEX idx_uq_aadhaar ON students (aadhaar_number);

-- Attempting duplicate insertion:
INSERT INTO students (student_name, aadhaar_number, centre_city)
VALUES ('Mamata Hui', '8901-2345-6789', 'Barrackpore');
-- Status: Query OK, 1 row affected.

-- Second duplicate insert attempt:
INSERT INTO students (student_name, aadhaar_number, centre_city)
VALUES ('Duplicate Candidate', '8901-2345-6789', 'Kolkata');
-- ❌ ERROR 1062 (23000): Duplicate entry '8901-2345-6789' for key 'students.idx_uq_aadhaar'`,
      resultRows: [
        { test: "Insert 1: Mamata Hui (8901-2345-6789)", outcome: "✓ SUCCESS (1 Row Added)", status: "Committed to B-Tree", latency: "0.5 ms" },
        { test: "Insert 2: Duplicate Aadhaar Attempt", outcome: "❌ BLOCKED (Error 1062)", status: "Integrity Preserved", latency: "0.2 ms (Rejection)" },
      ],
      explanation:
        "UNIQUE indexes verify the key does not exist in the B-Tree before inserting. Any duplicate attempt is rejected with Error 1062, preserving relational integrity.",
    },
    fulltext_natural_language: {
      title: "2. FULLTEXT Index: Natural Language Search & TF-IDF Relevance",
      badge: "Inverted Index (TF-IDF)",
      badgeColor: "emerald",
      sqlQuery: `-- 2. Inverted text search across course syllabus:
CREATE FULLTEXT INDEX idx_ft_syllabus ON courses (course_title, course_syllabus);

SELECT 
    course_id,
    course_title,
    ROUND(MATCH(course_title, course_syllabus) 
          AGAINST('React Redux State Management' IN NATURAL LANGUAGE MODE), 4) AS relevance_score
FROM courses
WHERE MATCH(course_title, course_syllabus) 
      AGAINST('React Redux State Management' IN NATURAL LANGUAGE MODE)
ORDER BY relevance_score DESC;`,
      resultRows: [
        { test: "React & Redux Fullstack Pro", outcome: "Score: 1.8412 (Top Match)", status: "Matched 3 Keywords", latency: "0.8 ms (Inverted Index)" },
        { test: "Java Microservices & Spring Cloud", outcome: "Score: 0.2104 (Low Match)", status: "Matched 'Management'", latency: "0.8 ms (Inverted Index)" },
      ],
      explanation:
        "The inverted index tokenizes text and calculates TF-IDF relevance scores, ranking documents by keyword significance in under 1 millisecond.",
    },
    fulltext_boolean_mode: {
      title: "3. FULLTEXT Index: Boolean Mode Advanced Operators (+, -, *)",
      badge: "Boolean Operators",
      badgeColor: "cyan",
      sqlQuery: `-- 3. Advanced boolean keyword filtering:
-- '+' = Must contain, '-' = Must NOT contain, '*' = Wildcard prefix
SELECT course_id, course_title, course_syllabus
FROM courses
WHERE MATCH(course_title, course_syllabus) 
      AGAINST('+React +Redux -Angular micro*' IN BOOLEAN MODE);

-- Execution Logic:
-- 1. MUST contain 'React'
-- 2. MUST contain 'Redux'
-- 3. MUST NOT contain 'Angular'
-- 4. Matches words starting with 'micro' (e.g. microservices, microfrontend)`,
      resultRows: [
        { test: "React Microfrontend & Redux Toolkit", outcome: "✓ MATCH (+React +Redux micro*)", status: "Returned in Result Set", latency: "0.7 ms" },
        { test: "Legacy Angular & React Bridge", outcome: "❌ EXCLUDED (-Angular)", status: "Filtered Out", latency: "0.7 ms" },
      ],
      explanation:
        "Boolean mode enables fine-grained query operators (+, -, *, quotes) without requiring external search engines like Elasticsearch for basic fulltext needs.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. UNIQUE vs FULLTEXT" },
    { id: "inverted-index", label: "2. Inverted Index Mechanics" },
    { id: "svg-diagrams", label: "3. Architecture & Error 1062 SVGs" },
    { id: "interactive-sandbox", label: "4. Live Search & Guard Workbench" },
    { id: "boolean-operators", label: "5. Boolean Mode Reference" },
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
            <span>Topic 12 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Specialized Indexing
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            UNIQUE Indexes & FULLTEXT Indexes Overview
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Enforce business identity rules with <code className="text-rose-300 font-mono font-bold">UNIQUE B-Tree Indexes</code> (preventing Error 1062 duplicates) and replace slow table scans with high-speed{" "}
            <code className="text-emerald-300 font-mono font-bold">Inverted FULLTEXT Indexes</code>.
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
              1. Specialized Indexing Categories
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing relational identity enforcement against natural language document indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-rose-950/80 text-rose-400 font-mono text-xs font-bold border border-rose-800">
                  UNIQUE
                </span>
                <h3 className="text-base font-bold text-white">UNIQUE B-Tree Index</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Enforces distinctness of column values and guarantees at most 1 matching row.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Blocks duplicate inserts with <strong>Error 1062</strong>.</li>
                <li>Permits multiple <code className="text-cyan-300 font-mono">NULL</code> values (NULL != NULL).</li>
                <li>Delivers optimal <code className="text-emerald-300 font-mono">type: const</code> point seeks.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  FULLTEXT
                </span>
                <h3 className="text-base font-bold text-white">Inverted FULLTEXT Index</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tokenizes large text into word dictionaries to provide sub-millisecond keyword searches.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Eliminates slow <code className="text-rose-300 font-mono">LIKE '%keyword%'</code> full scans.</li>
                <li>Computes <strong>TF-IDF</strong> relevance ranking scores.</li>
                <li>Supports Boolean operators (<code className="text-cyan-300 font-mono">+</code>, <code className="text-rose-300 font-mono">-</code>, <code className="text-amber-300 font-mono">*</code>).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Inverted Index Mechanics */}
        <section id="inverted-index" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. How Inverted Indexes Work
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why inverted lists transform slow text scans into direct dictionary lookups.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When a document is inserted, MySQL parses text into tokens and builds a reverse mapping:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">1. Tokenization</span>
                <p className="text-slate-300 font-sans">Splits sentences into clean word tokens.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">2. Stopword Filtering</span>
                <p className="text-slate-300 font-sans">Filters common words ('the', 'is', 'at').</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">3. Inverted List Posting</span>
                <p className="text-slate-300 font-sans">Maps: <code className="text-emerald-300">"React" → [Doc 1, Doc 4]</code></p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Inverted Index & Error 1062 Firewall
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect how inverted word dictionaries work and how UNIQUE indexes block duplicate entries.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Inverted Index Structure */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Anatomy of a FULLTEXT Inverted Index
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 220" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Word Dictionary */}
                  <g>
                    <rect x="20" y="20" width="260" height="180" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="45" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Word Dictionary (Tokens)</text>
                    <rect x="35" y="60" width="230" height="28" rx="3" fill="#0f172a" />
                    <text x="45" y="78" fill="#38bdf8" fontSize="9 font-mono font-bold">"microservices"</text>
                    <rect x="35" y="95" width="230" height="28" rx="3" fill="#0f172a" />
                    <text x="45" y="113" fill="#38bdf8" fontSize="9 font-mono font-bold">"react"</text>
                    <rect x="35" y="130" width="230" height="28" rx="3" fill="#0f172a" />
                    <text x="45" y="148" fill="#38bdf8" fontSize="9 font-mono font-bold">"redux"</text>
                    <rect x="35" y="165" width="230" height="28" rx="3" fill="#0f172a" />
                    <text x="45" y="183" fill="#38bdf8" fontSize="9 font-mono font-bold">"spring"</text>
                  </g>

                  {/* Posting Lists */}
                  <g>
                    <rect x="350" y="20" width="470" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="585" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Inverted Postings List (Doc IDs & Positions)</text>
                    <rect x="365" y="60" width="440" height="28" rx="3" fill="#022c22" />
                    <text x="375" y="78" fill="#a7f3d0" fontSize="8 font-mono">Doc #2 (Pos: 4), Doc #5 (Pos: 12)</text>
                    <rect x="365" y="95" width="440" height="28" rx="3" fill="#022c22" />
                    <text x="375" y="113" fill="#a7f3d0" fontSize="8 font-mono">Doc #1 (Pos: 1), Doc #3 (Pos: 8), Doc #4 (Pos: 2)</text>
                    <rect x="365" y="130" width="440" height="28" rx="3" fill="#022c22" />
                    <text x="375" y="148" fill="#a7f3d0" fontSize="8 font-mono">Doc #1 (Pos: 3), Doc #4 (Pos: 5)</text>
                    <rect x="365" y="165" width="440" height="28" rx="3" fill="#022c22" />
                    <text x="375" y="183" fill="#a7f3d0" fontSize="8 font-mono">Doc #2 (Pos: 1), Doc #6 (Pos: 7)</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 265 74 L 365 74" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 265 109 L 365 109" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 265 144 L 365 144" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 265 179 L 365 179" stroke="#38bdf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: UNIQUE Index Rejection */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> UNIQUE Index Duplicate Rejection Firewall
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 180" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Insert Stream */}
                  <g>
                    <rect x="30" y="40" width="220" height="100" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="140" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">New Row Insertion</text>
                    <rect x="45" y="80" width="190" height="25" rx="3" fill="#1e293b" />
                    <text x="140" y="96" fill="#e2e8f0" fontSize="8 font-mono" textAnchor="middle">Aadhaar: '8901-2345-6789'</text>
                  </g>

                  {/* Firewall Check */}
                  <g>
                    <polygon points="380,40 480,90 380,140 280,90" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="380" y="86" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">Key Exists in</text>
                    <text x="380" y="99" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">B-Tree?</text>
                  </g>

                  {/* Flow Arrow 1 */}
                  <path d="M 250 90 L 280 90" stroke="#38bdf8" strokeWidth="2" />

                  {/* Yes → Error 1062 */}
                  <g>
                    <rect x="540" y="20" width="280" height="65" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="680" y="42" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">YES → Reject with ERROR 1062</text>
                    <text x="680" y="60" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Duplicate entry for key 'idx_uq_aadhaar'</text>
                  </g>
                  <path d="M 430 65 L 540 50" stroke="#ef4444" strokeWidth="2" />

                  {/* No → Insert OK */}
                  <g>
                    <rect x="540" y="95" width="280" height="65" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="680" y="120" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">NO → Write Row to Leaf Node</text>
                    <text x="680" y="138" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Status: 1 row affected (Committed)</text>
                  </g>
                  <path d="M 430 115 L 540 130" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Specialized Indexing Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test UNIQUE duplicate prevention, Natural Language TF-IDF relevance ranking, and Boolean Mode operators live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(engineModes).map(([key, item]) => {
              const isActive = selectedEngineMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedEngineMode(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Mode" : "○ Run Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{engineModes[selectedEngineMode].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{engineModes[selectedEngineMode].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Index Access Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Statements & Query DDL</span>
                <span className="text-emerald-400">Execution Output</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {engineModes[selectedEngineMode].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">Test Candidate / Query</th>
                    <th className="py-3 px-4 font-mono text-white">Execution Result</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">Engine State</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Execution Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {engineModes[selectedEngineMode].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300 font-sans">{row.test}</td>
                      <td className="py-3 px-4 text-white font-bold">{row.outcome}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.status}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Boolean Operators */}
        <section id="boolean-operators" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. FULLTEXT Boolean Mode Operators Cheat Sheet
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Syntax reference for constructing high-precision fulltext search queries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">+word</span>
              <p className="text-slate-300 font-sans">Word MUST be present in every row.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">-word</span>
              <p className="text-slate-300 font-sans">Word MUST NOT be present in any row.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">word*</span>
              <p className="text-slate-300 font-sans">Prefix wildcard matching word start.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">"phrase"</span>
              <p className="text-slate-300 font-sans">Exact contiguous phrase matching.</p>
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
              Real-world implementations of UNIQUE identity firewalls and FULLTEXT document search engines.
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
                  Academy Student Identity Firewall & Atomic Upsert
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui creates UNIQUE indexes on Aadhaar and Email for Mamata, Susmita, Abhronila, and Debangshu, and pairs them with <code className="text-emerald-300 font-mono">ON DUPLICATE KEY UPDATE</code> to atomically update student contact records during batch CSV imports without raising duplicate errors!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE UNIQUE INDEX idx_uq_student_email ON students (email_address);

-- Atomic Upsert Pipeline:
INSERT INTO students (student_name, email_address, phone_number, centre_city)
VALUES ('Mamata Hui', 'mamata.hui@example.com', '98300-98214', 'Barrackpore')
ON DUPLICATE KEY UPDATE 
    phone_number = VALUES(phone_number),
    last_updated_at = NOW();`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Academy Course Catalog Natural Language Search
                </h3>
                <span className="text-xs text-slate-400 font-mono">Fulltext Search Engine</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Empowering students to search 500+ syllabus modules for keywords like "Microservices Cloud Docker", returning relevance-ranked courses in 0.8 milliseconds.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT course_title, MATCH(course_title, course_syllabus) AGAINST('Docker Cloud' IN NATURAL LANGUAGE MODE) AS score
FROM course_catalog
WHERE MATCH(course_title, course_syllabus) AGAINST('Docker Cloud' IN NATURAL LANGUAGE MODE)
ORDER BY score DESC;`}
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
              Avoid token size traps and mismatched fulltext column definitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The Minimum Token Size 3-Letter Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                By default, InnoDB FULLTEXT indexes ignore words with fewer than 3 characters (<code className="text-rose-300 font-mono">innodb_ft_min_token_size = 3</code>). Searching for 'AI', 'DB', or 'UI' will return 0 results!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Set <code className="text-emerald-400 font-mono">innodb_ft_min_token_size = 2</code> in <code className="text-cyan-300 font-mono">my.cnf</code> and rebuild indexes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Mismatched MATCH() Column List
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The column list in <code className="text-cyan-300 font-mono">MATCH(col1, col2)</code> must exactly match the columns defined in the index. Writing <code className="text-rose-300 font-mono">MATCH(col1)</code> will fail to use the index!
              </p>
              <div className="text-xs text-slate-400">
                Always mirror the index column definition inside the MATCH() clause.
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
                  <span>UNIQUE indexes enforce distinct values and throw Error 1062 on duplicates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Multiple NULL values are permitted in UNIQUE index columns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>FULLTEXT uses an Inverted Index mapping words to document IDs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Boolean mode operators: + (must have), - (must not have), * (wildcard).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe atomic upserts...”</span>
                  Pair UNIQUE indexes with <code className="text-cyan-300 font-mono">ON DUPLICATE KEY UPDATE</code> to create clean idempotent ingestion pipelines without try-catch error handling in application code!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about TF-IDF relevance...”</span>
                  Include <code className="text-cyan-300 font-mono">MATCH() AGAINST()</code> in your <code className="text-cyan-300 font-mono">SELECT</code> list to return relevance scores for smart search sorting!
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
              Comprehensive reference questions covering UNIQUE constraints, Error 1062, Inverted FULLTEXT indexing, Natural Language, and Boolean Mode operators.
            </p>
          </div>

          <FAQTemplate
            title="UNIQUE & FULLTEXT Indexes FAQs"
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
            title="UNIQUE Indexes and FULLTEXT Indexes Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Help students distinguish when to use a UNIQUE index versus a FULLTEXT index. A UNIQUE index uses a standard B-Tree to guarantee uniqueness on keys like Email or Aadhaar. A FULLTEXT index builds an inverted word dictionary for articles, descriptions, and syllabi, replacing slow LIKE '%pattern%' queries with instant natural language relevance ranking."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
