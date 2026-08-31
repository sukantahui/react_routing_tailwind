import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Indexing JSON Data using Generated Columns and Multi-Valued Indexes in MySQL 8.0+
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive multi-valued indexing workbench: mastering 1-to-many JSON array B+ tree indexing, querying with MEMBER OF(), JSON_CONTAINS(), and JSON_OVERLAPS(), designing composite array indexes, and verifying EXPLAIN range scan execution plans in MySQL 8.0+.
 */
const Topic11 = () => {
  // Interactive Multi-Valued Index State
  const [selectedMviPhase, setSelectedMviPhase] = useState("phase1_array_breakdown");

  const mviPhases = {
    phase1_array_breakdown: {
      phaseNumber: "Phase 1: Array Indexing",
      title: "1. The Multi-Valued Index Architecture: 1 Row → N Index Keys",
      badge: "B+ Tree 1:N Mapping",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ CREATING A MULTI-VALUED INDEX ON A JSON ARRAY:
CREATE TABLE job_candidates (
    candidate_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(100) NOT NULL,
    profile JSON NOT NULL,
    
    -- Multi-Valued Index on the JSON array $.skills[*]:
    INDEX idx_skills ((CAST(profile->'$.skills' AS CHAR(30) ARRAY)))
);

-- Inserting a single row with 3 skills in an array:
INSERT INTO job_candidates (candidate_name, profile) VALUES
('Mamata Banerjee', '{"city": "Barrackpore", "skills": ["MySQL", "React", "Node.js"]}');

-- HOW INNODB INDEXES THIS:
-- Creates 3 SEPARATE B+ Tree index entries for Candidate ID 1:
-- ['MySQL']   → PK 1
-- ['React']   → PK 1
-- ['Node.js'] → PK 1! 🚀`,
      metricsTable: [
        { concept: "Traditional B+ Tree", mapping: "1 Table Row → 1 Index Entry", role: "Scalar columns only" },
        { concept: "Multi-Valued Index", mapping: "1 Table Row → N Index Entries ⚡", role: "JSON array elements" },
        { concept: "Storage Engine", mapping: "InnoDB Secondary B+ Tree", role: "Materializes array items as separate keys" },
        { concept: "Deduplication", mapping: "Automatic per row", role: "Duplicate items in array indexed only once" }
      ],
      explanation:
        "Multi-Valued Indexes allow a single table row with a JSON array (e.g. `[\"MySQL\", \"React\", \"Node.js\"]`) to generate multiple distinct entries in the secondary B+ tree index, enabling instant index seeks for any individual element."
    },
    phase2_query_operators: {
      phaseNumber: "Phase 2: Query Operators",
      title: "2. The 3 Supported Operators: MEMBER OF, CONTAINS & OVERLAPS",
      badge: "Set Operations",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 FAST INDEX RANGE SEEKS ON JSON ARRAYS:
-- 1. MEMBER OF() - Single Value Membership Seek:
SELECT candidate_name FROM job_candidates
WHERE 'React' MEMBER OF (profile->'$.skills');
-- EXPLAIN: type = range, key = idx_skills ✅ (Instant seek!)

-- 2. JSON_CONTAINS() - Subset Matching (Must have BOTH skills):
SELECT candidate_name FROM job_candidates
WHERE JSON_CONTAINS(profile->'$.skills', '["MySQL", "React"]');
-- Performs index intersection seek across both terms! ⚡

-- 3. JSON_OVERLAPS() - Set Intersection (Matches ANY of the skills):
SELECT candidate_name FROM job_candidates
WHERE JSON_OVERLAPS(profile->'$.skills', '["React", "Python", "Go"]');
-- Matches rows sharing at least one common skill! 🚀`,
      metricsTable: [
        { operator: "MEMBER OF()", testLogic: "Single Element in Array", indexSupport: "type: range in EXPLAIN ⚡", example: "'React' MEMBER OF (doc->'$.skills')" },
        { operator: "JSON_CONTAINS()", testLogic: "Subset Match (All in list)", indexSupport: "Index Intersection seek", example: "JSON_CONTAINS(doc->'$.skills', '[\"a\",\"b\"]')" },
        { operator: "JSON_OVERLAPS()", testLogic: "Intersection Match (Any in list)", indexSupport: "Multi-key range scan", example: "JSON_OVERLAPS(doc->'$.skills', '[\"a\",\"b\"]')" },
        { operator: "Old Pattern (No Index)", testLogic: "JSON_SEARCH / LIKE", indexSupport: "O(N) Full Table Scan ❌", example: "Avoid unindexed array searches!" }
      ],
      explanation:
        "MySQL's query optimizer specifically routes `MEMBER OF()`, `JSON_CONTAINS()`, and `JSON_OVERLAPS()` to Multi-Valued Indexes, converting array searches from $O(N)$ full table scans into lightning-fast B+ tree range lookups."
    },
    phase3_composite_arrays: {
      phaseNumber: "Phase 3: Composite Indexes",
      title: "3. Composite Multi-Valued Indexes: Relational + JSON Array",
      badge: "Composite Architecture",
      badgeColor: "amber",
      sqlSnippet: `-- 🏗️ COMBINING RELATIONAL COLUMNS & JSON ARRAYS IN ONE INDEX:
CREATE TABLE student_course_enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT NOT NULL,
    student_active BIT(1) NOT NULL,
    profile JSON NOT NULL,
    
    -- Composite Index: Relational scalar column + JSON array cast:
    INDEX idx_dept_skills (
        department_id, 
        student_active, 
        (CAST(profile->'$.skills' AS CHAR(30) ARRAY))
    )
);

-- Query filters on department AND skills simultaneously:
SELECT * FROM student_course_enrollments
WHERE department_id = 10 
  AND student_active = b'1' 
  AND 'MySQL' MEMBER OF (profile->'$.skills');
-- Evaluates all 3 filters in a single compound index seek! ⚡`,
      metricsTable: [
        { columnPart: "1. department_id", type: "INT (Scalar)", role: "First level B+ tree range filter" },
        { columnPart: "2. student_active", type: "BIT(1) (Scalar)", role: "Second level boolean status filter" },
        { columnPart: "3. $.skills[*]", type: "CHAR(30) ARRAY (Multi-Valued)", role: "Array item leaf level matching" },
        { columnPart: "Index Rule", type: "Max 1 Array Component", role: "Composite index can have only 1 array cast" }
      ],
      explanation:
        "Composite Multi-Valued Indexes combine standard relational columns with a JSON array cast. Queries filtering on both relational attributes (like `department_id`) and array elements (like `$.skills`) execute in a single compound B+ tree seek."
    },
    phase4_explain_benchmark: {
      phaseNumber: "Phase 4: EXPLAIN Benchmark",
      title: "4. EXPLAIN Plan Verification & Performance Benchmarking",
      badge: "Performance Benchmark",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 EXPLAIN VERIFICATION & PERFORMANCE IMPACT:
-- Query execution plan check:
EXPLAIN SELECT * FROM job_candidates 
WHERE 'React' MEMBER OF (profile->'$.skills');

-- EXPLAIN OUTPUT ANALYSIS:
-- +----+-------------+----------------+------------+-------+---------------+------------+---------+------+------+----------+-------------+
-- | id | select_type | table          | partitions | type  | possible_keys | key        | key_len | ref  | rows | filtered | Extra       |
-- +----+-------------+----------------+------------+-------+---------------+------------+---------+------+------+----------+-------------+
-- |  1 | SIMPLE      | job_candidates | NULL       | range | idx_skills    | idx_skills | 123     | NULL |    1 |   100.00 | Using where |
-- +----+-------------+----------------+------------+-------+---------------+------------+---------+------+------+----------+-------------+

-- PERFORMANCE BENCHMARK (1 Million Rows):
-- - Without Multi-Valued Index : 4,820 ms (Full Table Scan) ⏳
-- - With Multi-Valued Index    : 1.4 ms  (B+ Tree Range Seek) ⚡ (3,400x Faster!)`,
      metricsTable: [
        { metric: "EXPLAIN 'type'", unindexed: "ALL (Full Table Scan) ❌", indexedMvi: "range (B+ Tree Seek) ✅" },
        { metric: "EXPLAIN 'key'", unindexed: "NULL", indexedMvi: "idx_skills" },
        { metric: "1M Rows Latency", unindexed: "4,820 ms ⏳", indexedMvi: "1.4 ms ⚡ (3,400x speedup)" },
        { metric: "Locking Overhead", unindexed: "Scans entire table", indexedMvi: "Locks only matched index records" }
      ],
      explanation:
        "Verifying Multi-Valued Indexes in `EXPLAIN` confirms `type: range` and `key: idx_skills`. On a 1-million row dataset, indexing JSON arrays accelerates tag and skill queries from nearly 5 seconds down to 1.4 milliseconds."
    }
  };

  const navItems = [
    { id: "mvi-overview", label: "1. Multi-Valued Index Overview" },
    { id: "tree-diagram", label: "2. 1:N B+ Tree Diagram" },
    { id: "interactive-workbench", label: "3. MVI Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. MVI Sizing Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 11 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Multi-Valued Indexes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Indexing JSON Data using Generated Columns and Multi-Valued Indexes in MySQL 8.0+
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Unlock native array indexing in MySQL: explore 1-to-many B+ tree mappings with <code className="text-emerald-400 font-mono">Multi-Valued Indexes</code>, execute high-speed set queries using <code className="text-cyan-400 font-mono">MEMBER OF()</code>, <code className="text-amber-400 font-mono">JSON_CONTAINS()</code>, and <code className="text-rose-400 font-mono">JSON_OVERLAPS()</code>, and eliminate junction tables.
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
        {/* SECTION 1: Multi-Valued Index Overview */}
        <section id="mvi-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The JSON Array Indexing Revolution
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL 8.0.17+ enables 1-to-many B+ tree indexing directly on JSON array elements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. 1:N Mapping</span>
              <h3 className="font-bold text-white">Array B+ Tree</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 row generates multiple index records for every element in the JSON array.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. MEMBER OF()</span>
              <h3 className="font-bold text-white">Element Seek</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tests if an item exists in the array via direct index range seek.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. JSON_OVERLAPS</span>
              <h3 className="font-bold text-white">Set Intersection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Matches rows sharing any common tag via multi-key index scan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. No Junction Tables</span>
              <h3 className="font-bold text-white">Zero Extra JOINs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces complex many-to-many junction tables with indexed document arrays.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Tree Diagram */}
        <section id="tree-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: 1:N Multi-Valued Index B+ Tree Structure
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Examining how a single table row spawns multiple index keys in secondary B+ tree leaf pages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 11.1: Multi-Valued Index B+ Tree Mapping for `skills: ["MySQL", "React", "Node"]`
              </h3>
              <span className="text-xs text-slate-400 font-mono">1:N Index Mapping</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrMviCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left: Clustered Table Row */}
                <rect x="20" y="40" width="340" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="190" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  SINGLE CLUSTERED ROW (TABLE DATA)
                </text>
                <line x1="20" y1="85" x2="360" y2="85" stroke="#334155" />

                <rect x="40" y="105" width="300" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="50" y="127" fill="#bae6fd" fontSize="11" fontWeight="bold">candidate_id: 1 (Primary Key)</text>
                <text x="50" y="143" fill="#94a3b8" fontSize="9">candidate_name: 'Mamata Banerjee'</text>

                <rect x="40" y="165" width="300" height="135" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="187" fill="#a7f3d0" fontSize="11" fontWeight="bold">profile (Native JSON Array):</text>
                <text x="50" y="210" fill="#34d399" fontSize="11" fontWeight="bold">skills: [</text>
                <text x="70" y="230" fill="#fde68a" fontSize="10">"MySQL",</text>
                <text x="70" y="250" fill="#38bdf8" fontSize="10">"React",</text>
                <text x="70" y="270" fill="#fb7185" fontSize="10">"Node.js"</text>
                <text x="50" y="290" fill="#34d399" fontSize="11" fontWeight="bold">]</text>

                {/* Right: Multi-Valued Secondary Index */}
                <rect x="440" y="40" width="490" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="685" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  MULTI-VALUED SECONDARY B+ TREE (idx_skills)
                </text>
                <line x1="440" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="460" y="105" width="450" height="55" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="475" y="127" fill="#fde68a" fontSize="11" fontWeight="bold">Index Key: ['MySQL']</text>
                <text x="475" y="147" fill="#34d399" fontSize="10">Points to → Primary Key: 1 ✅</text>

                <rect x="460" y="170" width="450" height="55" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="475" y="192" fill="#38bdf8" fontSize="11" fontWeight="bold">Index Key: ['React']</text>
                <text x="475" y="212" fill="#34d399" fontSize="10">Points to → Primary Key: 1 ✅</text>

                <rect x="460" y="235" width="450" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="475" y="257" fill="#fb7185" fontSize="11" fontWeight="bold">Index Key: ['Node.js']</text>
                <text x="475" y="277" fill="#34d399" fontSize="10">Points to → Primary Key: 1 ✅</text>

                {/* Arrows connecting single row to 3 index keys */}
                <path d="M 340 225 L 460 135" fill="none" stroke="#fde68a" strokeWidth="2" markerEnd="url(#arrMviCyan)" />
                <path d="M 340 245 L 460 200" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrMviCyan)" />
                <path d="M 340 265 L 460 260" fill="none" stroke="#fb7185" strokeWidth="2" markerEnd="url(#arrMviCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: MVI Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Multi-Valued Index Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a phase to inspect MVI DDL definitions, query operators, composite array indexing, and EXPLAIN plans.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(mviPhases).map((key) => {
              const ph = mviPhases[key];
              const isSelected = selectedMviPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMviPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {mviPhases[selectedMviPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  mviPhases[selectedMviPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  mviPhases[selectedMviPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  mviPhases[selectedMviPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  mviPhases[selectedMviPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {mviPhases[selectedMviPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Multi-Valued Index DDL &amp; Query Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {mviPhases[selectedMviPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Multi-Valued Index Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Concept / Component</th>
                      <th className="py-2.5 px-4">Mapping / Syntax / Latency</th>
                      <th className="py-2.5 px-4">Index Support / Architectural Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {mviPhases[selectedMviPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.concept || row.operator || row.columnPart || row.metric}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.mapping || row.testLogic || row.type || row.indexedMvi}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.role || row.indexSupport}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mviPhases[selectedMviPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Multi-Valued Index Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminating many-to-many junction tables and speeding up tag queries in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Tag Search Speedup */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Accelerating Skill Tag Matching 3,400x in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  3,400x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, filtering 1 million student resumes for candidates with `'MySQL'` in their <code>{"profile->'$.skills'"}</code> array previously took 4.8 seconds because MySQL had to parse every JSON document sequentially. Adding a Multi-Valued Index <code>{"INDEX idx_skills ((CAST(profile->'$.skills' AS CHAR(30) ARRAY)))"}</code> dropped query latency to 1.4 milliseconds, enabling instant sub-second candidate recruitment searches.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Junction Table Elimination */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Eliminating 15 Million Row Junction Table in Kolkata Logistics
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Schema Simplified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an e-commerce order tagging system maintained a separate `order_tags` junction table with 15 million rows, causing heavy JOIN locks during flash sales. Migrating tags to an array inside the `order_doc` JSON column and attaching a Multi-Valued Index eliminated the junction table entirely, reducing write locking contention by 80%.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid array cast length truncation and unsupported query operator mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Under-Sizing the Cast Array Type
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining <code>{"CAST(doc->'$.tags' AS CHAR(10) ARRAY)"}</code> triggers insert errors if a user inserts a tag with 11 characters.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Size the array cast type to accommodate the maximum expected element length.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Multiple Array Casts in One Composite Index
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting to include two different JSON array casts in a single index definition is prohibited in MySQL because it creates exponential Cartesian products.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Maximum of 1 multi-valued array cast per composite index.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use MEMBER OF() for Single Tags
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>{"'tag' MEMBER OF (doc->'$.tags')"}</code> as the primary search operator to ensure clean range seeks on the Multi-Valued Index.
              </p>
              <div className="text-xs text-slate-400">
                Standard SQL operator for single-item membership checks.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Combine with Relational Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Create composite indexes combining foreign keys with multi-valued arrays (<code>{"INDEX (store_id, (CAST(doc->'$.tags' AS CHAR(30) ARRAY)))"}</code>).
              </p>
              <div className="text-xs text-slate-400">
                Enables compound multi-tier index seeks.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: MVI Sizing Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Multi-Valued Index Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify optimal JSON array index deployment in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> MVI Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">MVI on Hot Arrays</strong> = Deploy MVIs on JSON arrays frequently filtered by users.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Operator Verification</strong> = Verify queries use `MEMBER OF`, `CONTAINS`, or `OVERLAPS`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">EXPLAIN Confirmation</strong> = Check `type: range` and `key: idx_name` in EXPLAIN.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Array Element Capacity</strong> = Ensure CAST ARRAY length handles maximum element sizes.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe JSON_OVERLAPS in E-Commerce...”</span>
                  <code>{"JSON_OVERLAPS(profile->'$.interests', '[\"electronics\", \"mobile\", \"gadgets\"]')"}</code> checks if the customer is interested in ANY of those categories, and executes a multi-key B+ tree range scan in under 1ms!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Many-to-Many Simplicity...”</span>
                  Before MySQL 8.0.17, modeling skills or tags required an entity table, a tags table, and a junction table with complex JOIN queries. With Multi-Valued Indexes, you store tags directly in a JSON array and get instant search speeds without extra tables!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Multi-Valued Indexes, MEMBER OF, JSON_OVERLAPS, and Array Indexing.
            </p>
          </div>

          <FAQTemplate
            title="Multi-Valued Indexes on JSON Arrays FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Indexing JSON Data using Generated Columns and Multi-Valued Indexes in MySQL 8.0+"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Multi-Valued Indexes are a game-changer in MySQL 8.0. Historically, relational databases were limited to 1:1 index mappings, forcing developers to build bloated many-to-many junction tables just to store a list of tags or user permissions. With Multi-Valued Indexes, you can store arrays directly inside native JSON columns and query them with MEMBER OF(), JSON_CONTAINS(), and JSON_OVERLAPS() with full B+ tree range seek speeds. It is the ultimate fusion of NoSQL document modeling and relational indexing power!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
