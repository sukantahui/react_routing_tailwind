import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Common SQL Beginner Errors and How to Debug Them
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive SQL debugging workbench and error troubleshooting guide: diagnosing Error 1064 syntax errors, Error 1062 duplicate keys, Error 1452/1451 foreign key violations, Error 3819 check constraint failures, Error 1175 safe update triggers, and silent semantic three-valued logic bugs.
 */
const Topic4 = () => {
  // Interactive Debug Category State
  const [selectedDebugCategory, setSelectedDebugCategory] = useState("cat1_syntax");

  const debugCategories = {
    cat1_syntax: {
      categoryNumber: "Category 1: Syntax & Reserved Words",
      title: "1. Error 1064 (42000): Syntax Errors & Reserved Keyword Collisions",
      badge: "Syntax Error 1064",
      badgeColor: "rose",
      buggySnippet: `-- ❌ BUGGY SQL SCRIPT (Produces Error 1064):
-- Trailing comma before closing parenthesis:
CREATE TABLE student_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order INT NOT NULL, -- ❌ Keyword collision: 'order' is a reserved keyword!
);

-- Output: Error 1064 (42000): You have an error in your SQL syntax near 'order INT NOT NULL,)'`,
      fixedSnippet: `-- ⚡ FIXED SQL SCRIPT:
-- 1. Wrap reserved words in backticks (\`order\`)
-- 2. Remove trailing comma before the closing parenthesis:
CREATE TABLE student_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    \`order\` INT NOT NULL
); -- Clean execution! ✅`,
      diagnosticSummary: [
        { bug: "Trailing Comma", cause: "Comma after last column definition", fix: "Remove comma before ')'" },
        { bug: "Keyword Collision", cause: "Using 'order', 'group', 'table' as names", fix: "Wrap identifier in backticks (`order`)" },
        { bug: "Unclosed Quotes", cause: "Mismatched single/double quotes", fix: "Ensure all string quotes match" }
      ],
      explanation:
        "The MySQL Lexer/Parser scans statements into tokens. Trailing commas or unquoted reserved keywords break the grammar parser, resulting in Error 1064. Always inspect the exact token indicated by 'near ...'."
    },
    cat2_constraints: {
      categoryNumber: "Category 2: Constraint Violations",
      title: "2. Errors 1062, 1452, 1451 & 3819: Constraint Failures",
      badge: "Constraint Errors",
      badgeColor: "amber",
      buggySnippet: `-- ❌ BUGGY CONSTRAINT SCENARIOS:

-- Test A: Duplicate Key Violation (Error 1062):
INSERT INTO students (email) VALUES ('mamata@example.com');
INSERT INTO students (email) VALUES ('mamata@example.com'); -- ❌ Duplicate!

-- Test B: Foreign Key Child Failure (Error 1452):
INSERT INTO admissions (student_id, course_id) VALUES (1, 999); -- ❌ Course 999 doesn't exist!

-- Test C: Check Constraint Failure (Error 3819):
INSERT INTO courses (tuition_fee) VALUES (-500.00); -- ❌ Violated CHECK (fee &gt; 0)!`,
      fixedSnippet: `-- ⚡ SYSTEMATIC FIXES:

-- Fix A: Use INSERT IGNORE or update alternate key:
INSERT INTO students (email) VALUES ('mamata.new@example.com');

-- Fix B: Insert parent course record first, or verify course_id:
SELECT course_id FROM courses WHERE course_id = 999; -- Verify parent existence first!
INSERT INTO admissions (student_id, course_id) VALUES (1, 1);

-- Fix C: Provide valid domain value:
INSERT INTO courses (tuition_fee) VALUES (45000.00); -- Complies with CHECK (> 0)!`,
      diagnosticSummary: [
        { bug: "Error 1062 (Duplicate Key)", cause: "Violated UNIQUE or PRIMARY KEY", fix: "Ensure uniqueness or use ON DUPLICATE KEY UPDATE" },
        { bug: "Error 1452 (FK Child)", cause: "Referenced parent key does not exist", fix: "Insert parent record before child insert" },
        { bug: "Error 1451 (FK Parent)", cause: "Deleting parent with active children", fix: "Delete children first or use ON DELETE CASCADE" },
        { bug: "Error 3819 (CHECK Violated)", cause: "Value evaluated to FALSE in CHECK", fix: "Supply valid data satisfying check expression" }
      ],
      explanation:
        "Constraint errors indicate that the database storage engine is actively protecting data integrity. When Error 1452 or 1451 occurs, check your foreign key relationships and parent table existence."
    },
    cat3_semantic_nulls: {
      categoryNumber: "Category 3: Semantic & Silent Logic Bugs",
      title: "3. Silent Logic Bugs: Three-Valued Logic & Operator Precedence",
      badge: "Silent Logic Bugs",
      badgeColor: "cyan",
      buggySnippet: `-- ❌ SILENT LOGIC BUGS (No Error Message, but Wrong Results!):

-- Bug A: Checking NULL with '=':
SELECT * FROM students WHERE balance_fee = NULL;
-- Result: 0 rows returned! (silently fails because UNKNOWN is falsy)

-- Bug B: Ambiguous Operator Precedence without Parentheses:
SELECT * FROM students 
WHERE city = 'Kolkata' OR city = 'Barrackpore' AND age > 20;
-- Evaluates as: Kolkata OR (Barrackpore AND age > 20) &rarr; returns teenagers from Kolkata!`,
      fixedSnippet: `-- ⚡ FIXED SEMANTIC LOGIC:

-- Fix A: Use IS NULL or IS NOT NULL:
SELECT * FROM students WHERE balance_fee IS NULL; -- Returns all matching null rows! ✅

-- Fix B: Use Explicit Parentheses for Precedence:
SELECT * FROM students 
WHERE (city = 'Kolkata' OR city = 'Barrackpore') AND age > 20; -- Correctly filters age > 20! ✅`,
      diagnosticSummary: [
        { bug: "WHERE col = NULL", cause: "Three-valued SQL logic resolves to UNKNOWN", fix: "Always write IS NULL or IS NOT NULL" },
        { bug: "Missing Parentheses", cause: "AND has higher precedence than OR", fix: "Wrap OR conditions in ( ... ) explicitly" },
        { bug: "Ambiguous Column", cause: "Column exists in multiple joined tables", fix: "Prefix column with table alias (s.name)" }
      ],
      explanation:
        "Silent semantic bugs are the most dangerous because MySQL executes the query without throwing errors. Always use `IS NULL` and wrap `OR` conditions in explicit parentheses."
    },
    cat4_safe_updates: {
      categoryNumber: "Category 4: Safe Updates & Missing Schema",
      title: "4. Error 1175 (Safe Updates) & Error 1146 (Table Missing)",
      badge: "Safe Mode & Schema",
      badgeColor: "emerald",
      buggySnippet: `-- ❌ BLOCKED BY SAFE UPDATE MODE (Error 1175):
UPDATE students SET city = 'Kolkata' WHERE balance_fee > 0;
-- Error 1175: You are using safe update mode and tried to update without a KEY column in WHERE!

-- ❌ MISSING DATABASE SELECTION (Error 1146):
SELECT * FROM students;
-- Error 1146 (42S02): Table 'test.students' doesn't exist! (Forgot USE command!)`,
      fixedSnippet: `-- ⚡ FIXED PROCEDURES:

-- Fix A: Include Primary Key or disable safe mode for session:
UPDATE students SET city = 'Kolkata' WHERE student_id = 10; -- Primary Key targeted! ✅

-- Alternative for batch updates:
SET SQL_SAFE_UPDATES = 0;
UPDATE students SET city = 'Kolkata' WHERE balance_fee > 0;
SET SQL_SAFE_UPDATES = 1;

-- Fix B: Explicitly select database:
USE college_admissions;
SELECT * FROM students; -- Table located successfully! ✅`,
      diagnosticSummary: [
        { bug: "Error 1175 (Safe Updates)", cause: "UPDATE without KEY column in WHERE", fix: "Target Primary Key or toggle SQL_SAFE_UPDATES" },
        { bug: "Error 1146 (Table Missing)", cause: "No active database or spelling typo", fix: "Execute USE db_name; and check SHOW TABLES;" }
      ],
      explanation:
        "Safe Update Mode (`SQL_SAFE_UPDATES`) prevents accidental mass data overwrites. To execute bulk updates, explicitly toggle the variable for the current session and re-enable it immediately."
    }
  };

  const navItems = [
    { id: "debugging-overview", label: "1. Diagnostic Protocol" },
    { id: "error-flowchart", label: "2. Error Pipeline Flowchart" },
    { id: "interactive-workbench", label: "3. Interactive Error Workbench" },
    { id: "case-studies", label: "4. Real-World Debugging Cases" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Debugging Readiness Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 001_004</span>
            <span>•</span>
            <span>Topic 4 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Error Debugging Guide
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Common SQL Beginner Errors and How to Debug Them
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the diagnostic protocol for resolving top MySQL errors: debug Error 1064 syntax mistakes, Error 1062 duplicate keys, Error 1452/1451 foreign key failures, Error 3819 check violations, and silent semantic three-valued logic traps.
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
        {/* SECTION 1: Diagnostic Protocol */}
        <section id="debugging-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Systematic 3-Step SQL Debugging Protocol
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Follow this structured protocol to diagnose and fix any SQL error in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Step 1: Read Error Code
              </span>
              <h3 className="font-bold text-white text-base">Extract Code &amp; Token</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Look up the exact error code (e.g. 1064, 1062, 1452) and check the "near '...'" token hint in the server message.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Step 2: Inspect Schema
              </span>
              <h3 className="font-bold text-white text-base">Run DESCRIBE &amp; SHOW</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Execute `DESCRIBE table_name;` or `SHOW CREATE TABLE` to verify exact column names, nullability, and foreign key definitions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Step 3: Isolate Subquery
              </span>
              <h3 className="font-bold text-white text-base">Execute Sub-Clauses</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Break complex queries into individual subqueries or test SELECT clauses independently before running full transactions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Error Pipeline Flowchart */}
        <section id="error-flowchart" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. MySQL Query Error Pipeline Flowchart
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding where errors occur during the parsing, semantic validation, and storage execution lifecycle.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 4.1: SQL Execution &amp; Error Diagnostic Checkpoints
              </h3>
              <span className="text-xs text-slate-400 font-mono">Parser &rarr; Catalog &rarr; InnoDB Engine</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrErrCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Stage 1: Parser */}
                <rect x="30" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="155" y="70" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">1. LEXER &amp; PARSER</text>
                <line x1="30" y1="85" x2="280" y2="85" stroke="#334155" />
                <rect x="50" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="60" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">Error 1064 (Syntax Error)</text>
                <text x="60" y="140" fill="#94a3b8" fontSize="9">Trailing commas, unquoted keywords</text>

                <rect x="50" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="60" y="185" fill="#fca5a5" fontSize="10" fontWeight="bold">Mismatched Quotes / '...'</text>
                <text x="60" y="200" fill="#94a3b8" fontSize="9">Unclosed single or backtick quotes</text>

                {/* Stage 2: Catalog Preprocessor */}
                <rect x="350" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="475" y="70" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">2. CATALOG PREPROCESSOR</text>
                <line x1="350" y1="85" x2="600" y2="85" stroke="#334155" />
                <rect x="370" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="380" y="125" fill="#fde68a" fontSize="10" fontWeight="bold">Error 1146 (Table Missing)</text>
                <text x="380" y="140" fill="#94a3b8" fontSize="9">Typo in table or missing USE db</text>

                <rect x="370" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="380" y="185" fill="#fde68a" fontSize="10" fontWeight="bold">Error 1054 (Unknown Column)</text>
                <text x="380" y="200" fill="#94a3b8" fontSize="9">Typo or unjoined table column</text>

                {/* Stage 3: InnoDB Storage Engine */}
                <rect x="670" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="795" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">3. INNODB ENGINE</text>
                <line x1="670" y1="85" x2="920" y2="85" stroke="#334155" />
                <rect x="690" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="700" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Error 1062 (Duplicate Key)</text>
                <text x="700" y="140" fill="#94a3b8" fontSize="9">Primary/Unique key collision</text>

                <rect x="690" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="700" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">Error 1452 / 1451 (FK Failures)</text>
                <text x="700" y="200" fill="#94a3b8" fontSize="9">Missing parent / child under RESTRICT</text>

                {/* Connecting Arrows */}
                <path d="M 280 180 L 350 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrErrCyan)" />
                <path d="M 600 180 L 670 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrErrCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Error Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Error Debugging Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an error category to compare the buggy SQL code with its corrected version and diagnostic rule.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(debugCategories).map((key) => {
              const cat = debugCategories[key];
              const isSelected = selectedDebugCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDebugCategory(key)}
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
                      cat.badgeColor === "emerald" && "bg-emerald-400",
                      cat.badgeColor === "cyan" && "bg-cyan-400",
                      cat.badgeColor === "amber" && "bg-amber-400",
                      cat.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{cat.categoryNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {debugCategories[selectedDebugCategory].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  debugCategories[selectedDebugCategory].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  debugCategories[selectedDebugCategory].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  debugCategories[selectedDebugCategory].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  debugCategories[selectedDebugCategory].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {debugCategories[selectedDebugCategory].badge}
              </span>
            </div>

            {/* Side-by-Side Buggy vs Fixed Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold">
                  ❌ Buggy SQL (Triggers Error):
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-rose-950/80 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                  {debugCategories[selectedDebugCategory].buggySnippet}
                </pre>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  ⚡ Corrected SQL (Working Fix):
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-950/80 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                  {debugCategories[selectedDebugCategory].fixedSnippet}
                </pre>
              </div>
            </div>

            {/* Diagnostic Table Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Diagnostic Directory &amp; Resolution Rules:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Error / Bug Symptom</th>
                      <th className="py-2.5 px-4">Root Cause</th>
                      <th className="py-2.5 px-4">Corrective Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {debugCategories[selectedDebugCategory].diagnosticSummary.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-rose-300 font-sans">{row.bug}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.cause}</td>
                        <td className="py-3 px-4 text-emerald-400 font-sans">{row.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Senior Diagnostic Rule:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {debugCategories[selectedDebugCategory].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Debugging Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real troubleshooting scenarios from academic and retail systems in West Bengal.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Foreign Key Debugging */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving Foreign Key 1452 During Batch Admission Ingestion
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fixed in Barrackpore
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a batch import in Barrackpore, 15 student admission records failed with Error 1452. Inspecting the CSV data revealed that the `course_id` column contained legacy codes (e.g. `105`) that did not exist in the parent `courses` table. Updating the mapping file resolved all 15 foreign key failures instantly.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Silent NULL Bug */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Diagnosing the 0-Row NULL Ledger Bug in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Semantic Fix
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a fee reconciliation report repeatedly returned 0 unpaid students because the query wrote `WHERE discount_voucher = NULL`. Replacing the comparison with `IS NULL` immediately surfaced 240 eligible candidate ledgers!
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
              Prevent debugging headaches by adopting standard SQL conventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Guessing Code Without Reading Error Messages
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Modifying random parts of a query without inspecting the exact line number and token hint in the error message wastes hours.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Read the Error Code and line number first.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Confusing Single Quotes with Backticks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">`Kolkata`</code> instead of <code className="text-emerald-300 font-mono">'Kolkata'</code> makes MySQL look for a column named Kolkata, throwing Error 1054.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Single quotes for text strings; Backticks for column/table identifiers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Run DESCRIBE Before Querying
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Run `DESCRIBE table_name;` to confirm exact column spelling, data types, and nullability before writing complex multi-table joins.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates 90% of unknown column and type mismatch errors.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Format SQL Cleanly with Indentation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Place each clause (`SELECT`, `FROM`, `JOIN`, `WHERE`, `ORDER BY`) on a new indented line.
              </p>
              <div className="text-xs text-slate-400">
                Makes syntax errors, missing commas, and parenthesis mismatches stand out immediately.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Debugging Readiness Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Student Debugging Readiness Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential diagnostic capabilities to master.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Debugging Competency Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Syntax Error 1064</strong> = Identify trailing commas and unquoted reserved words.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Foreign Keys 1452/1451</strong> = Debug child parent references and RESTRICT deletes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Silent NULL Traps</strong> = Replace `= NULL` with `IS NULL` across all predicates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Safe Updates 1175</strong> = Target primary keys or configure `SQL_SAFE_UPDATES`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Error 1052 ambiguous columns...”</span>
                  When joining tables that both have `id` or `name`, always prefix them as `s.id` or `c.id`. This saves you from the classic 'Column in field list is ambiguous' error!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SHOW WARNINGS...”</span>
                  If a query runs without error but truncates a string or converts a type automatically, run `SHOW WARNINGS;` immediately to inspect what MySQL adjusted under the hood!
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
              Comprehensive reference questions covering SQL beginner errors and debugging strategies.
            </p>
          </div>

          <FAQTemplate
            title="Common SQL Beginner Errors & Debugging FAQs"
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
            title="Common SQL Beginner Errors and How to Debug Them"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="Every experienced database administrator was once a beginner who stared at Error 1064 or Error 1452 in confusion. The secret to debugging is not memorizing every possible mistake—it is following a disciplined process. Read the exact error code, verify your schema with `DESCRIBE table_name;`, check for trailing commas or reserved words, and never compare to NULL with `=`. When you master these debugging instincts, errors stop being obstacles and start being your best teachers!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
