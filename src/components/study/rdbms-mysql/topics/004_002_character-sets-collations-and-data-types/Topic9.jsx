import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – JSON Functions: JSON_EXTRACT, JSON_ARRAY, JSON_OBJECT, JSON_SET, JSON_INSERT, JSON_REPLACE, JSON_REMOVE, JSON_CONTAINS
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive JSON functions workbench: mastering creation (JSON_OBJECT, JSON_ARRAYAGG), fine-grained mutations (JSON_SET vs JSON_INSERT vs JSON_REPLACE), membership testing (JSON_CONTAINS), and document merging (JSON_MERGE_PATCH) in MySQL.
 */
const Topic9 = () => {
  // Interactive Functions State
  const [selectedFunctionPhase, setSelectedFunctionPhase] = useState("phase1_mutation_trio");

  const functionPhases = {
    phase1_mutation_trio: {
      phaseNumber: "Phase 1: Mutation Trio",
      title: "1. The Mutation Trio: JSON_SET vs JSON_INSERT vs JSON_REPLACE",
      badge: "Document Mutation",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛠️ COMPARING THE BIG 3 JSON MUTATION FUNCTIONS:
-- Initial Document: {"name": "Mamata", "city": "Barrackpore"}

-- 1. JSON_SET (Upsert): Replaces existing key 'city', creates new key 'skills':
SELECT JSON_SET(
    '{"name": "Mamata", "city": "Barrackpore"}',
    '$.city', 'Kolkata',
    '$.skills', JSON_ARRAY('MySQL', 'React')
) AS set_result;
-- Result: {"city": "Kolkata", "name": "Mamata", "skills": ["MySQL", "React"]} ✅

-- 2. JSON_INSERT (Insert-Only): Ignores existing key 'city', creates new key 'age':
SELECT JSON_INSERT(
    '{"name": "Mamata", "city": "Barrackpore"}',
    '$.city', 'Kolkata', -- IGNORED!
    '$.age', 22          -- INSERTED!
) AS insert_result;
-- Result: {"city": "Barrackpore", "name": "Mamata", "age": 22}

-- 3. JSON_REPLACE (Update-Only): Replaces existing key 'city', ignores new key 'age':
SELECT JSON_REPLACE(
    '{"name": "Mamata", "city": "Barrackpore"}',
    '$.city', 'Kolkata', -- REPLACED!
    '$.age', 22          -- IGNORED!
) AS replace_result;
-- Result: {"city": "Kolkata", "name": "Mamata"}`,
      metricsTable: [
        { func: "JSON_SET()", ifKeyExists: "REPLACES value", ifKeyMissing: "INSERTS new key", nature: "Upsert (Most versatile) ⚡" },
        { func: "JSON_INSERT()", ifKeyExists: "DOES NOTHING", ifKeyMissing: "INSERTS new key", nature: "Insert-Only (Safe default)" },
        { func: "JSON_REPLACE()", ifKeyExists: "REPLACES value", ifKeyMissing: "DOES NOTHING", nature: "Update-Only (Strict modifier)" },
        { func: "JSON_REMOVE()", ifKeyExists: "DELETES key", ifKeyMissing: "DOES NOTHING", nature: "Key & Array deletion" }
      ],
      explanation:
        "`JSON_SET` upserts (modifying existing keys or adding new ones). `JSON_INSERT` creates missing keys without overwriting existing data. `JSON_REPLACE` modifies existing keys only, ignoring missing paths."
    },
    phase2_aggregation_engine: {
      phaseNumber: "Phase 2: Aggregation",
      title: "2. Relational Aggregations: JSON_ARRAYAGG & JSON_OBJECTAGG",
      badge: "Relational-to-JSON",
      badgeColor: "cyan",
      sqlSnippet: `-- 📦 AGGREGATING RELATIONAL ROWS DIRECTLY INTO JSON:
-- 1. JSON_ARRAYAGG: Aggregates student names into a typed JSON array per department:
SELECT 
    department,
    COUNT(*) AS total_students,
    JSON_ARRAYAGG(student_name) AS student_roster
FROM college_students
GROUP BY department;

-- 2. JSON_OBJECTAGG: Constructs a dynamic key-value report card from rows:
SELECT 
    student_name,
    JSON_OBJECTAGG(subject_name, marks_obtained) AS final_report_card
FROM exam_marks
GROUP BY student_name;

-- Produces nested API payloads directly in SQL without backend loops! 🚀`,
      metricsTable: [
        { aggFunc: "JSON_ARRAYAGG(col)", input: "Table Rows", output: "['Mamata', 'Susmita', 'Abhronila']", role: "Array grouping by category" },
        { aggFunc: "JSON_OBJECTAGG(k, v)", input: "Key-Value Rows", output: "{\"Math\": 95, \"Physics\": 88}", role: "Object map construction" },
        { aggFunc: "JSON_OBJECT(k, v)", input: "Scalar Arguments", output: "{\"id\": 101, \"active\": true}", role: "Single object creator" },
        { aggFunc: "JSON_ARRAY(v1, v2)", input: "Scalar Arguments", output: "[1, 2, 3]", role: "Single array creator" }
      ],
      explanation:
        "`JSON_ARRAYAGG` and `JSON_OBJECTAGG` aggregate tabular database rows into nested JSON arrays and key-value objects directly inside the SQL engine, eliminating the need for expensive JSON building loops in application code."
    },
    phase3_contains_search: {
      phaseNumber: "Phase 3: CONTAINS & Search",
      title: "3. Search & Membership: JSON_CONTAINS & JSON_SEARCH",
      badge: "Search Operators",
      badgeColor: "amber",
      sqlSnippet: `-- 🔍 SEARCHING & TESTING ARRAY MEMBERSHIP:
-- 1. JSON_CONTAINS: Checks if 'React' exists inside the skills array:
-- (⚠️ String candidate MUST be valid JSON, meaning double-quoted: '"React"')
SELECT student_name, profile
FROM candidate_profiles
WHERE JSON_CONTAINS(profile &rarr; '$.skills', '"React"');

-- 2. JSON_CONTAINS_PATH: Verify required keys exist before processing:
SELECT student_name
FROM candidate_profiles
WHERE JSON_CONTAINS_PATH(profile, 'all', '$.address.city', '$.address.pincode') = 1;

-- 3. JSON_SEARCH: Find the path to a specific text string:
SELECT JSON_SEARCH(profile, 'one', 'Barrackpore') AS city_path 
FROM candidate_profiles;
-- Returns: "$.city" or "$.address.city"`,
      metricsTable: [
        { searchFunc: "JSON_CONTAINS()", target: "Array / Document", syntax: "JSON_CONTAINS(col-&gt;'$.arr', '\"val\"')", role: "Array membership test (Returns 1/0)" },
        { searchFunc: "JSON_CONTAINS_PATH()", target: "Path Keys", syntax: "JSON_CONTAINS_PATH(doc, 'all', '$.k')", role: "Verifies path existence in schema" },
        { searchFunc: "JSON_SEARCH()", target: "Text Content", syntax: "JSON_SEARCH(doc, 'one', 'target')", role: "Returns exact path to matching string" },
        { searchFunc: "JSON_KEYS()", target: "Object Keys", syntax: "JSON_KEYS(doc)", role: "Returns list of top-level keys" }
      ],
      explanation:
        "`JSON_CONTAINS` tests whether a candidate element or sub-document exists inside a JSON column. `JSON_CONTAINS_PATH` verifies the existence of required schema paths, and `JSON_SEARCH` returns the path location of matching string values."
    },
    phase4_document_merge: {
      phaseNumber: "Phase 4: Document Merging",
      title: "4. Document Merging: JSON_MERGE_PATCH (RFC 7396) vs PRESERVE",
      badge: "Merging Engine",
      badgeColor: "rose",
      sqlSnippet: `-- 🔀 MERGING JSON DOCUMENTS:
-- Base Document: {"name": "Mamata", "city": "Barrackpore", "age": 21}
-- Patch Document: {"city": "Kolkata", "age": 22, "status": "active"}

-- 1. JSON_MERGE_PATCH (RFC 7396 Standard - Recommended):
-- Overwrites existing keys with new values:
SELECT JSON_MERGE_PATCH(
    '{"name": "Mamata", "city": "Barrackpore", "age": 21}',
    '{"city": "Kolkata", "age": 22, "status": "active"}'
) AS patch_result;
-- Result: {"age": 22, "city": "Kolkata", "name": "Mamata", "status": "active"} ✅

-- 2. JSON_MERGE_PRESERVE (Legacy):
-- Merges duplicate keys into arrays:
SELECT JSON_MERGE_PRESERVE(
    '{"name": "Mamata", "city": "Barrackpore"}',
    '{"city": "Kolkata"}'
) AS preserve_result;
-- Result: {"name": "Mamata", "city": ["Barrackpore", "Kolkata"]} (Array!)`,
      metricsTable: [
        { mergeType: "JSON_MERGE_PATCH", standard: "RFC 7396 Compliant", duplicateKeys: "Overwrites with second document value ✅", bestUse: "Standard API PATCH updates" },
        { mergeType: "JSON_MERGE_PRESERVE", standard: "MySQL Custom Legacy", duplicateKeys: "Merges into a multi-value array", bestUse: "Accumulating historical log values" },
        { mergeType: "Null Handling (PATCH)", standard: "RFC 7396", duplicateKeys: "Key set to null is deleted!", bestUse: "Deleting keys via patch" },
        { mergeType: "JSON_PRETTY()", standard: "Display Formatter", duplicateKeys: "Adds indents and newlines", bestUse: "Debugging in CLI / logs" }
      ],
      explanation:
        "`JSON_MERGE_PATCH` adheres to the RFC 7396 standard, overwriting existing keys with incoming patch data (ideal for REST API PATCH endpoints). `JSON_MERGE_PRESERVE` retains conflicting values by converting them into arrays."
    }
  };

  const navItems = [
    { id: "functions-overview", label: "1. JSON Functions Overview" },
    { id: "mutation-diagram", label: "2. Mutation Matrix Diagram" },
    { id: "interactive-workbench", label: "3. JSON Functions Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. JSON Functions Checklist" },
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
            <span>Topic 9 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              JSON Function Suite
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            JSON Functions: JSON_EXTRACT, JSON_ARRAY, JSON_OBJECT, JSON_SET, JSON_INSERT, JSON_REPLACE, JSON_REMOVE, JSON_CONTAINS
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete JSON function suite in MySQL: create objects and arrays with <code className="text-emerald-400 font-mono">JSON_OBJECT</code> and <code className="text-cyan-400 font-mono">JSON_ARRAYAGG</code>, execute fine-grained document mutations with <code className="text-amber-400 font-mono">JSON_SET / INSERT / REPLACE</code>, test array membership with <code className="text-rose-400 font-mono">JSON_CONTAINS</code>, and merge documents.
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
        {/* SECTION 1: Functions Overview */}
        <section id="functions-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The JSON Function Landscape
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four core categories of MySQL JSON manipulation functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Creation</span>
              <h3 className="font-bold text-white">JSON_OBJECT &amp; ARRAY</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Builds objects and arrays from SQL scalars. `JSON_ARRAYAGG` aggregates rows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. Mutation</span>
              <h3 className="font-bold text-white">SET / INSERT / REPLACE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fine-grained document editing. In-place byte overwriting in MySQL 8.0.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. Search</span>
              <h3 className="font-bold text-white">JSON_CONTAINS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tests array membership, key presence, and string path locations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Merging</span>
              <h3 className="font-bold text-white">JSON_MERGE_PATCH</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                RFC 7396 compliant document merging for REST API PATCH endpoints.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Mutation Diagram */}
        <section id="mutation-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: JSON Mutation Logic Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing behavioral differences between JSON_SET, JSON_INSERT, and JSON_REPLACE.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 9.1: Mutation Decision Logic: SET vs INSERT vs REPLACE
              </h3>
              <span className="text-xs text-slate-400 font-mono">Mutation Engine</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Column 1: JSON_SET */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  1. JSON_SET (UPSERT)
                </text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="250" height="55" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">Target Key EXISTS:</text>
                <text x="45" y="145" fill="#34d399" fontSize="10">REPLACES existing value ✅</text>

                <rect x="35" y="175" width="250" height="55" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">Target Key MISSING:</text>
                <text x="45" y="215" fill="#34d399" fontSize="10">INSERTS new key-value pair ✅</text>

                <rect x="35" y="245" width="250" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="45" y="267" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Result: Universal Upsert Operator
                </text>

                {/* Column 2: JSON_INSERT */}
                <rect x="335" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  2. JSON_INSERT (INSERT-ONLY)
                </text>
                <line x1="335" y1="85" x2="615" y2="85" stroke="#334155" />

                <rect x="350" y="105" width="250" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="360" y="127" fill="#fca5a5" fontSize="10" fontWeight="bold">Target Key EXISTS:</text>
                <text x="360" y="145" fill="#f87171" fontSize="10">DOES NOTHING (Leaves intact) ⏸️</text>

                <rect x="350" y="175" width="250" height="55" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="360" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">Target Key MISSING:</text>
                <text x="360" y="215" fill="#34d399" fontSize="10">INSERTS new key-value pair ✅</text>

                <rect x="350" y="245" width="250" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="360" y="267" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Result: Safe Default Property Adder
                </text>

                {/* Column 3: JSON_REPLACE */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="790" y="70" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
                  3. JSON_REPLACE (UPDATE-ONLY)
                </text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="665" y="105" width="250" height="55" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="675" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">Target Key EXISTS:</text>
                <text x="675" y="145" fill="#34d399" fontSize="10">REPLACES existing value ✅</text>

                <rect x="665" y="175" width="250" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="675" y="197" fill="#fca5a5" fontSize="10" fontWeight="bold">Target Key MISSING:</text>
                <text x="675" y="215" fill="#f87171" fontSize="10">DOES NOTHING (Ignored!) ⏸️</text>

                <rect x="665" y="245" width="250" height="45" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="675" y="267" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Result: Strict Existing Key Modifier
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Functions Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive JSON Functions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a function phase to inspect mutation executions, aggregation queries, and RFC 7396 patch merging.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(functionPhases).map((key) => {
              const ph = functionPhases[key];
              const isSelected = selectedFunctionPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFunctionPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
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
                {functionPhases[selectedFunctionPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  functionPhases[selectedFunctionPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  functionPhases[selectedFunctionPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  functionPhases[selectedFunctionPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  functionPhases[selectedFunctionPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {functionPhases[selectedFunctionPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                JSON Function Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {functionPhases[selectedFunctionPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Function Specifications &amp; Operational Roles:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Function / Parameter</th>
                      <th className="py-2.5 px-4">Key Exists / Input</th>
                      <th className="py-2.5 px-4">Key Missing / Output Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {functionPhases[selectedFunctionPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.func || row.aggFunc || row.searchFunc || row.mergeType}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.ifKeyExists || row.input || row.target || row.standard}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.nature || row.role || row.duplicateKeys}
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
                {functionPhases[selectedFunctionPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World JSON Functions Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Generating report cards and implementing atomic API patch endpoints in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Aggregation API */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Single-Query Student Report Cards in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Backend Loops
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an examination portal previously executed 10,000 backend loops in Node.js to aggregate individual subject marks into student JSON report cards. Using `JSON_OBJECTAGG(subject_name, marks)` directly inside a SQL `GROUP BY` query shifted aggregation to the MySQL binary engine, cutting report generation time from 8.5 seconds down to 95 milliseconds.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's RFC 7396 Patch Endpoint */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – RFC 7396 REST API PATCH Updates in Kolkata E-Commerce
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Atomic Document Patch
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, handling partial user profile updates across 40 optional form fields previously required reading the entire JSON document into memory, merging fields in Python, and writing back the full string. Switching to `JSON_MERGE_PATCH(profile, ?)` allowed the database to apply atomic RFC 7396 merges in a single SQL statement with zero concurrency race conditions.
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
              Avoid candidate quoting bugs in JSON_CONTAINS and document merge array pollution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Unquoted String in JSON_CONTAINS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Passing `'React'` instead of `'\"React\"'` to `JSON_CONTAINS` fails with an invalid JSON error because the candidate argument must be a valid JSON token!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always double-quote strings in JSON_CONTAINS: JSON_CONTAINS(col, '\"val\"').
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using JSON_MERGE_PRESERVE by Mistake
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using `JSON_MERGE_PRESERVE` turns duplicate keys into arrays (<code>{`{"city": ["a", "b"]}`}</code>) rather than overwriting them, corrupting schema expectations.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use JSON_MERGE_PATCH for standard object overwrites.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use JSON_OBJECTAGG for API Endpoints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Construct response payloads using `JSON_ARRAYAGG()` and `JSON_OBJECTAGG()` to reduce backend JSON serialization CPU overhead.
              </p>
              <div className="text-xs text-slate-400">
                Generates nested JSON directly in database memory.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use JSON_PRETTY for Logging
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Wrap debug queries in `JSON_PRETTY(col)` when outputting diagnostic reports to CLI tools or admin interfaces for instant readability.
              </p>
              <div className="text-xs text-slate-400">
                Adds clean indentation and newlines to binary documents.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: JSON Functions Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA JSON Functions Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify correct JSON function usage across application queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Functions Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Upsert with SET</strong> = Use `JSON_SET()` for general property modifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">JSON_CONTAINS Quoting</strong> = Verify candidate strings use `'\"val\"'` format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">PATCH for APIs</strong> = Use `JSON_MERGE_PATCH()` for REST API updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">ARRAYAGG Grouping</strong> = Replace `GROUP_CONCAT` with `JSON_ARRAYAGG`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe JSON_SET vs JSON_INSERT...”</span>
                  If you want to set a default property only if the user hasn't chosen one, use `JSON_INSERT()`! If you want to update the property regardless of whether it exists, use `JSON_SET()`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about JSON_MERGE_PATCH Deletions...”</span>
                  Under RFC 7396 `JSON_MERGE_PATCH`, if you pass a patch with <code>{`'{"temporary_key": null}'`}</code>, MySQL deletes `temporary_key` from the document automatically!
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
              Comprehensive reference questions covering JSON Creation, Mutation, Search, and Merging Functions.
            </p>
          </div>

          <FAQTemplate
            title="MySQL JSON Functions Suite FAQs"
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
            title="JSON Functions: JSON_EXTRACT, JSON_ARRAY, JSON_OBJECT, JSON_SET, JSON_INSERT, JSON_REPLACE, JSON_REMOVE, JSON_CONTAINS"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="MySQL's JSON function library turns SQL into a powerhouse for document manipulation. Instead of pulling large JSON payloads into your application server just to add a key or test array membership, let MySQL do the heavy lifting in its fast C++ binary engine! Master the difference between JSON_SET (upsert), JSON_INSERT (insert-only), and JSON_REPLACE (update-only), leverage JSON_ARRAYAGG for instant API payloads, and use JSON_MERGE_PATCH for clean, atomic REST API updates!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
