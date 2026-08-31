import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – JSON Path Operators: → (Extract) and ->> (Extract & Unquote)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive JSON path operators workbench: exploring $ path navigation, distinguishing → (JSON_EXTRACT) and ->> (JSON_UNQUOTE), debugging the quoted string WHERE clause trap, and executing array slices and recursive descent in MySQL.
 */
const Topic8 = () => {
  // Interactive Path State
  const [selectedPathPhase, setSelectedPathPhase] = useState("phase1_operator_diff");

  const pathPhases = {
    phase1_operator_diff: {
      phaseNumber: "Phase 1: → vs ->>",
      title: "1. The Crucial Difference: → (JSON) vs ->> (Unquoted String)",
      badge: "Operator Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔍 COMPARING → AND ->> OPERATORS:
-- Sample Table with JSON Data:
CREATE TABLE candidate_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    profile JSON NOT NULL
);

INSERT INTO candidate_profiles (student_name, profile) VALUES
('Mamata Banerjee', '{"city": "Barrackpore", "age": 22, "skills": ["MySQL", "React"]}');

-- 1. Using → (JSON_EXTRACT): Returns JSON value with quotes:
SELECT profile->'$.city' AS quoted_json FROM candidate_profiles;
-- Result: "\"Barrackpore\"" (JSON String with double quotes!)

-- 2. Using ->> (JSON_UNQUOTE): Returns clean SQL VARCHAR:
SELECT profile->>'$.city' AS unquoted_text FROM candidate_profiles;
-- Result: "Barrackpore" (Clean SQL String without quotes!) ✅`,
      metricsTable: [
        { operator: "-> (Extract)", fullFunction: "JSON_EXTRACT(col, '$.path')", returnType: "JSON Type", stringOutput: "\"Barrackpore\" (With quotes)" },
        { operator: "->> (Extract & Unquote)", fullFunction: "JSON_UNQUOTE(JSON_EXTRACT())", returnType: "VARCHAR / SQL String", stringOutput: "Barrackpore (Unquoted) ✅" },
        { operator: "WHERE Filter Match", fullFunction: "WHERE col->>'$.k' = 'val'", returnType: "Boolean Match", stringOutput: "Evaluates TRUE ✅" },
        { operator: "ORDER BY Sorting", fullFunction: "ORDER BY col->>'$.k'", returnType: "Alphabetical Order", stringOutput: "Sorts cleanly as text" }
      ],
      explanation:
        "`->` returns a raw JSON-typed value (preserving surrounding quotes on strings). `->>` extracts the value and unquotes it into a plain SQL `VARCHAR`, making `->>` the mandatory choice for `WHERE` filters, `ORDER BY`, and `JOIN` conditions."
    },
    phase2_path_syntax: {
      phaseNumber: "Phase 2: Path Syntax ($)",
      title: "2. JSON Path Syntax: Dot Notation, Arrays & Slices",
      badge: "Path Navigation",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧭 MASTERING JSON PATH EXPRESSIONS:
-- $ represents the root JSON document!

-- 1. Dot Notation (Object Keys):
SELECT profile->>'$.address.city' AS city FROM candidate_profiles;

-- 2. Array 0-Indexed Access:
SELECT profile->>'$.skills[0]' AS first_skill FROM candidate_profiles;

-- 3. Dynamic Array End Access (last / last-1):
SELECT profile->>'$.skills[last]' AS last_skill FROM candidate_profiles;

-- 4. Array Slicing (Ranges):
SELECT profile->'$.skills[0 to 1]' AS top_two_skills FROM candidate_profiles;
-- Returns: ["MySQL", "React"] (Sub-array)

-- 5. Special Keys with Hyphens / Spaces (Must be quoted!):
SELECT profile->>'$.\"postal-code\"' AS pincode FROM candidate_profiles;`,
      metricsTable: [
        { syntaxToken: "$.key", target: "Named Object Property", example: "$.address.city → 'Barrackpore'" },
        { syntaxToken: "$[0]", target: "First Array Element", example: "$.skills[0] → 'MySQL'" },
        { syntaxToken: "$[last]", target: "Last Array Element", example: "$.skills[last] → 'React'" },
        { syntaxToken: "$[1 to 3]", target: "Array Sub-Slice", example: "$.tags[0 to 2] → ['a', 'b']" }
      ],
      explanation:
        "JSON paths navigate hierarchies using `$` as the root anchor. Dot notation accesses object keys (`$.address.city`), while bracket notation accesses array indices (`$[0]`, `$[last]`, `$[0 to 2]`)."
    },
    phase3_where_trap: {
      phaseNumber: "Phase 3: The WHERE Trap",
      title: "3. The Quoted String WHERE Clause Trap",
      badge: "Bug Diagnosis",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 THE NOTORIOUS QUOTED STRING WHERE CLAUSE TRAP:
-- Scenario: Find candidates living in Barrackpore:

-- ❌ WRONG (Using ->):
SELECT * FROM candidate_profiles 
WHERE profile->'$.city' = 'Barrackpore';
-- Result: 0 ROWS FOUND! (Silent Bug!) ⚠️
-- WHY: '\"Barrackpore\"' (JSON with quotes) != 'Barrackpore' (SQL literal)!

-- ✅ CORRECT (Using ->>):
SELECT * FROM candidate_profiles 
WHERE profile->>'$.city' = 'Barrackpore';
-- Result: Matches rows with Barrackpore instantly! ✅

-- ✅ PATTERN MATCHING WITH LIKE:
SELECT * FROM candidate_profiles 
WHERE profile->>'$.city' LIKE 'Barrack%';`,
      metricsTable: [
        { queryForm: "WHERE col->'$.key' = 'val'", evaluation: "\"val\" = 'val' → FALSE ❌", impact: "Silent bug: 0 rows returned" },
        { queryForm: "WHERE col->>'$.key' = 'val'", evaluation: "'val' = 'val' → TRUE ✅", impact: "Matches correct rows reliably" },
        { queryForm: "WHERE col->>'$.key' LIKE '%'", evaluation: "Plain VARCHAR LIKE Match", impact: "Supports SQL wildcard pattern searches" },
        { queryForm: "Missing Path (NULL)", evaluation: "col->>'$.missing' IS NULL", impact: "Non-existent keys return SQL NULL gracefully" }
      ],
      explanation:
        "Using `->` in a `WHERE` clause compares a double-quoted JSON string with a plain SQL literal, causing equality checks to fail silently. Always use `->>` for comparison and filter predicates."
    },
    phase4_wildcards_descent: {
      phaseNumber: "Phase 4: Wildcards & Descent",
      title: "4. Wildcards (*, [*]) & Recursive Descent ($**)",
      badge: "Deep Traversal",
      badgeColor: "amber",
      sqlSnippet: `-- 🌲 ADVANCED WILDCARDS & RECURSIVE DESCENT:
-- 1. Object Wildcard ($.*): Returns all values in top-level object:
SELECT profile->'$.*' AS all_object_values FROM candidate_profiles;

-- 2. Array Wildcard ($[*]): Extracts all elements across an array:
SELECT profile->'$.skills[*]' AS all_skills FROM candidate_profiles;

-- 3. Recursive Descent ($**): Searches all nested levels at any depth!
-- Finds all 'pincode' keys regardless of whether they are at
-- $.pincode, $.address.pincode, or $.branches[0].pincode:
SELECT profile->>'$**.pincode' AS any_nested_pincode 
FROM candidate_profiles;`,
      metricsTable: [
        { operator: "$.*", target: "All Object Keys", role: "Extracts all values into a flat JSON array" },
        { operator: "$[*]", target: "All Array Elements", role: "Extracts all items across array list" },
        { operator: "$**.key", target: "Recursive Deep Descent", role: "Searches all nested sub-objects for matching key ⚡" },
        { operator: "CAST() Conversion", target: "Numeric Operations", role: "CAST(col->>'$.age' AS UNSIGNED) for math" }
      ],
      explanation:
        "Wildcards (`$.*`, `$[*]`) extract entire object or array collections, while recursive descent (`$**`) traverses nested sub-objects and arrays at any depth to extract target properties."
    }
  };

  const navItems = [
    { id: "operators-overview", label: "1. Path Operators Overview" },
    { id: "traversal-diagram", label: "2. Path Traversal Diagram" },
    { id: "interactive-workbench", label: "3. Path Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Path Operator Checklist" },
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
            <span>Topic 8 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              JSON Path Operators
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            JSON Path Operators: -&gt; (Extract) and -&gt;&gt; (Extract &amp; Unquote)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master JSON querying in MySQL: navigate document hierarchies with <code className="text-emerald-400 font-mono">$</code> path syntax, understand the critical difference between <code className="text-cyan-400 font-mono">-&gt;</code> and <code className="text-amber-400 font-mono">-&gt;&gt;</code>, debug the double-quoted <code className="text-rose-400 font-mono">WHERE</code> clause trap, and perform recursive descent.
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
        {/* SECTION 1: Path Operators Overview */}
        <section id="operators-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. JSON Path Navigation &amp; Operators
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL navigates semi-structured JSON documents using path expressions and extraction operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. $ Root Anchor</span>
              <h3 className="font-bold text-white">Document Root</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Represents top of JSON document. Base for dot and bracket notation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. -&gt; Operator</span>
              <h3 className="font-bold text-white">JSON_EXTRACT</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracts JSON-typed value. Strings retain enclosing quotes (`"val"`).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. -&gt;&gt; Operator</span>
              <h3 className="font-bold text-white">Extract &amp; Unquote</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracts as plain SQL `VARCHAR`. Strips quotes. Mandatory in `WHERE`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Wildcards ($**)</span>
              <h3 className="font-bold text-white">Recursive Descent</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traverses all nested sub-objects and arrays at any depth.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Traversal Diagram */}
        <section id="traversal-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: JSON Path Traversal &amp; Unquoting Engine
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing raw JSON extraction vs unquoted string translation pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 8.1: Path Traversal &amp; Output Pipeline: -&gt; vs -&gt;&gt;
              </h3>
              <span className="text-xs text-slate-400 font-mono">Extraction Flow</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrPathCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left Box: → Operator */}
                <rect x="20" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="240" y="70" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
                  1. THE -&gt; OPERATOR (JSON_EXTRACT)
                </text>
                <line x1="20" y1="85" x2="460" y2="85" stroke="#334155" />

                <rect x="40" y="105" width="400" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="50" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">Query: SELECT profile-&gt;'$.city'</text>
                <text x="50" y="140" fill="#94a3b8" fontSize="8">Extracts as native JSON type</text>

                <rect x="40" y="160" width="400" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="50" y="180" fill="#f87171" fontSize="11" fontWeight="bold">Output = "\"Barrackpore\"" (With Double Quotes!)</text>
                <text x="50" y="195" fill="#94a3b8" fontSize="8">Surrounding JSON quotes are preserved</text>

                <rect x="40" y="215" width="400" height="65" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="50" y="235" fill="#fca5a5" fontSize="10" fontWeight="bold">WHERE Filter Trap:</text>
                <text x="50" y="250" fill="#f87171" fontSize="9">WHERE profile-&gt;'$.city' = 'Barrackpore' → FALSE! ❌</text>
                <text x="50" y="265" fill="#94a3b8" fontSize="8">"\"Barrackpore\"" != 'Barrackpore'</text>

                {/* Right Box: ->> Operator */}
                <rect x="490" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="710" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  2. THE -&gt;&gt; OPERATOR (EXTRACT &amp; UNQUOTE)
                </text>
                <line x1="490" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="510" y="105" width="400" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="520" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Query: SELECT profile-&gt;&gt;'$.city'</text>
                <text x="520" y="140" fill="#94a3b8" fontSize="8">Extracts and unquotes into SQL VARCHAR</text>

                <rect x="510" y="160" width="400" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="520" y="180" fill="#34d399" fontSize="11" fontWeight="bold">Output = "Barrackpore" (Clean SQL String!) ✅</text>
                <text x="520" y="195" fill="#bae6fd" fontSize="8">Surrounding JSON quotes are stripped</text>

                <rect x="510" y="215" width="400" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="520" y="235" fill="#34d399" fontSize="10" fontWeight="bold">WHERE Filter Success:</text>
                <text x="520" y="250" fill="#34d399" fontSize="9">WHERE profile-&gt;&gt;'$.city' = 'Barrackpore' → TRUE! ✅</text>
                <text x="520" y="265" fill="#bae6fd" fontSize="8">Matches rows cleanly; compatible with LIKE, ORDER BY</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Path Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive JSON Path Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a path phase to inspect operator outputs, array slices, WHERE filters, and recursive descent queries.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(pathPhases).map((key) => {
              const ph = pathPhases[key];
              const isSelected = selectedPathPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPathPhase(key)}
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
                      ph.badgeColor === "rose" && "bg-rose-400",
                      ph.badgeColor === "amber" && "bg-amber-400"
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
                {pathPhases[selectedPathPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  pathPhases[selectedPathPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  pathPhases[selectedPathPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  pathPhases[selectedPathPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  pathPhases[selectedPathPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {pathPhases[selectedPathPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                JSON Path Query Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {pathPhases[selectedPathPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                JSON Path Operator Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Operator / Syntax</th>
                      <th className="py-2.5 px-4">Equivalent Function / Target</th>
                      <th className="py-2.5 px-4">Output Format / Match Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {pathPhases[selectedPathPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.operator || row.syntaxToken || row.queryForm}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.fullFunction || row.target || row.evaluation}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.stringOutput || row.example || row.impact}
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
                {pathPhases[selectedPathPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World JSON Path Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing zero-result WHERE query bugs and querying nested array elements in West Bengal portals.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's WHERE Trap Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Zero-Result Candidate Search Bug in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Search Fixed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an recruitment portal filter query <code>WHERE profile-&gt;&apos;$.city&apos; = &apos;Barrackpore&apos;</code> unexpectedly returned 0 results despite hundreds of eligible candidates. Changing the operator from <code>-&gt;</code> to <code>-&gt;&gt;</code> unquoted the extracted JSON string, allowing candidate records to match correctly and restoring search functionality.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Deep Recursive Descent */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Multi-Tier Pincode Aggregation in Kolkata Logistics
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Recursive Match
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a logistics dispatch table stored shipments with polymorphic address hierarchies (some with billing pincodes at root, others inside warehouse arrays). Using recursive descent <code>shipment-&gt;&gt;&apos;$**.pincode&apos;</code> extracted postal codes across all nesting formats in a single query, eliminating complex backend JSON traversal code.
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
              Avoid double-quoted string mismatches and special character path errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using <code>-&gt;</code> in WHERE &amp; JOIN Clauses
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                <code>col-&gt;&apos;$.key&apos;</code> keeps double quotes around extracted strings (<code>&quot;val&quot;</code>), causing comparisons against SQL literals (<code>&apos;val&apos;</code>) to fail silently.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use <code>-&gt;&gt;</code> in WHERE, ORDER BY, and JOIN conditions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Quotes on Special Key Names
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Paths like <code>$.user-name</code> or <code>$.postal code</code> trigger syntax errors unless key names with hyphens/spaces are enclosed in double quotes (<code>$.&quot;user-name&quot;</code>).
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Quote keys containing hyphens, spaces, or dots ($.&quot;key-name&quot;).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use $[last] for Dynamic Arrays
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `$[last]` to access the most recent entry in an array log without calculating or storing the array length.
              </p>
              <div className="text-xs text-slate-400">
                Simplifies time-series array queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Wrap in CAST() for Math
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When performing numeric calculations on extracted JSON numbers, wrap in <code>{"CAST(col->>'$.amount' AS DECIMAL(10,2))"}</code> for exact math.
              </p>
              <div className="text-xs text-slate-400">
                Ensures exact decimal arithmetic on JSON numbers.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Path Operator Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA JSON Path Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify correct JSON query operators across application code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Operator Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">WHERE uses -&gt;&gt;</strong> = Ensure all filter conditions use the <code>-&gt;&gt;</code> operator.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">ORDER BY uses -&gt;&gt;</strong> = Verify sorting clauses use <code>-&gt;&gt;</code> for clean text ordering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Hyphenated Keys Quoted</strong> = Verify keys like `$."user-id"` are quoted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">CAST on Numbers</strong> = Wrap extracted numbers in `CAST()` before arithmetic.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Remember the Golden Mnemonic...”</span>
                  Single arrow <code>-&gt;</code> gives you JSON (with quotes). Double arrow <code>-&gt;&gt;</code> gives you unquoted text! If you're filtering in `WHERE`, always double up: <code>-&gt;&gt;</code>!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Null Safety...”</span>
                  If a path like <code>{"profile->>'$.hobbies'"}</code> does not exist on a row, MySQL does not crash or throw an error—it returns SQL `NULL`, making <code>{"WHERE col->>'$.k' IS NOT NULL"}</code> very clean!
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
              Comprehensive reference questions covering JSON Path Syntax, <code>-&gt;</code> vs <code>-&gt;&gt;</code>, and Wildcard Navigation.
            </p>
          </div>

          <FAQTemplate
            title="JSON Path Operators (-> and ->>) FAQs"
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
            title="JSON Path Operators: → (Extract) and ->> (Extract & Unquote)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Querying JSON in MySQL is fast and expressive once you master JSON path syntax ($). The number one bug developers run into when querying JSON is using → instead of ->> in WHERE clauses—because → retains the surrounding double quotes ('&quot;Barrackpore&quot;'), comparing it to 'Barrackpore' fails silently and returns 0 rows! Remember the golden rule: use → when you want raw JSON, but always use ->> when you are filtering in WHERE, sorting in ORDER BY, or joining tables!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
