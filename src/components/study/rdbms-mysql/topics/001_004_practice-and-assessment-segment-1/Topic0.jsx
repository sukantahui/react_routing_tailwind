import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Segment 1 Comprehensive MCQ Self-Assessment
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive self-assessment workbench and comprehensive diagnostic review covering all foundational concepts in Segment 1: RDBMS theory, Codd's rules, relational keys, DDL/DML, constraints, NULL logic, wildcards, sorting, and pagination.
 */
const Topic0 = () => {
  // Interactive Assessment Category State
  const [selectedCategory, setSelectedCategory] = useState("keys_and_integrity");

  const assessmentCategories = {
    keys_and_integrity: {
      title: "1. Relational Keys & Data Integrity Rules",
      badge: "Keys & Integrity",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔑 VERIFYING RELATIONAL INTEGRITY IN MYSQL:
-- Creating a parent academy table with Primary Key:
CREATE TABLE academies (
    academy_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(50) DEFAULT 'Barrackpore'
);

-- Creating a child student table with Foreign Key linking to parent:
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE, -- Alternate Key!
    academy_id INT NOT NULL,
    age INT CHECK (age >= 16),          -- Domain Integrity!
    balance_fee_inr DECIMAL(10,2) DEFAULT 0.00,
    CONSTRAINT fk_student_academy 
        FOREIGN KEY (academy_id) REFERENCES academies (academy_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);`,
      testQuestions: [
        {
          q: "What constitutes a Candidate Key?",
          a: "A minimal set of attributes that uniquely identifies every tuple in a relation without redundant columns.",
          status: "Verified Rule ✅"
        },
        {
          q: "Why can a Primary Key not accept NULL values?",
          a: "Entity Integrity requires every tuple to have an unambiguous, known identity.",
          status: "Strict Constraint ✅"
        }
      ],
      explanation:
        "Entity Integrity guarantees unique identity via Primary Keys, Domain Integrity enforces valid ranges via CHECK and NOT NULL, and Referential Integrity links child foreign keys to parent primary keys."
    },
    ddl_vs_dml: {
      title: "2. DDL (Structure) vs DML (Data Manipulation) Mechanics",
      badge: "DDL vs DML",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛠️ DDL (Data Definition Language) - Modifies Table Structures:
CREATE TABLE test_ledger (id INT, amount DECIMAL(10,2));
ALTER TABLE test_ledger ADD COLUMN branch_city VARCHAR(50);
TRUNCATE TABLE test_ledger; -- Deallocates pages & resets auto-increment!
DROP TABLE test_ledger;     -- Deletes structure and data completely!

-- 📝 DML (Data Manipulation Language) - Operates on Rows:
INSERT INTO students (name, email, academy_id, age, balance_fee_inr)
VALUES ('Mamata Hui', 'mamata@example.com', 1, 20, 5000.00);

UPDATE students SET balance_fee_inr = 0.00 WHERE student_id = 1;
DELETE FROM students WHERE student_id = 1;`,
      testQuestions: [
        {
          q: "What is the difference between DROP and TRUNCATE?",
          a: "DROP deletes table schema and data; TRUNCATE empties all rows and resets sequence while preserving schema.",
          status: "Verified Rule ✅"
        },
        {
          q: "What happens on UPDATE without a WHERE clause?",
          a: "Every single row in the table is updated to the new value!",
          status: "Critical Warning ⚠️"
        }
      ],
      explanation:
        "DDL commands (CREATE, ALTER, DROP, TRUNCATE) define and modify metadata structures. DML commands (INSERT, UPDATE, DELETE) manipulate the row contents within those structures."
    },
    null_and_wildcards: {
      title: "3. NULL Evaluation & Wildcard Pattern Matching",
      badge: "NULLs & Wildcards",
      badgeColor: "amber",
      sqlSnippet: `-- 🔍 EVALUATING NULL VALUES & WILDCARD PATTERNS:
-- ❌ FLAW: Comparing to NULL with '=' returns 0 rows (falsy UNKNOWN):
SELECT * FROM students WHERE balance_fee_inr = NULL; -- NEVER WORKS!

-- ⚡ SARGABLE CORRECT NULL EVALUATION:
SELECT * FROM students WHERE balance_fee_inr IS NULL;
SELECT * FROM students WHERE balance_fee_inr IS NOT NULL;

-- 🎯 WILDCARD MATCHING:
-- '%' matches zero or more characters:
SELECT * FROM students WHERE city LIKE 'Barrack%'; -- Starts with 'Barrack'

-- '_' matches EXACTLY one single character:
SELECT * FROM students WHERE city LIKE 'K_lkata';  -- Matches 'Kolkata'`,
      testQuestions: [
        {
          q: "Why does `WHERE col = NULL` fail?",
          a: "Under SQL three-valued logic, comparisons with NULL evaluate to UNKNOWN, which resolves to false.",
          status: "Three-Valued Logic ✅"
        },
        {
          q: "What is the difference between % and _?",
          a: "'%' matches 0 or more characters; '_' matches strictly one character.",
          status: "Pattern Standard ✅"
        }
      ],
      explanation:
        "NULL represents unknown or missing data and requires `IS NULL` or `IS NOT NULL`. Wildcards enable flexible pattern searches using `%` (multi-char) and `_` (single-char)."
    },
    sorting_and_paging: {
      title: "4. Multi-Column Sorting, Aliasing & Pagination",
      badge: "Sorting & Pagination",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 MULTI-COLUMN SORTING & PAGINATION IN MYSQL:
-- Sorting students by GPA descending; ties broken alphabetically by Name:
SELECT 
    student_id AS ID,
    name AS Student_Name,
    gpa AS Grade_Point,
    balance_fee_inr AS Outstanding_Balance_INR
FROM students
WHERE city IN ('Barrackpore', 'Kolkata', 'Ichapur')
ORDER BY gpa DESC, name ASC
LIMIT 10 OFFSET 20; -- Returns Page 3 (Rows 21 to 30)!`,
      testQuestions: [
        {
          q: "How does multi-column ORDER BY work?",
          a: "Evaluates left-to-right: sorts by first column; applies second column only on tie-breaker rows.",
          status: "Deterministic Sort ✅"
        },
        {
          q: "What does `LIMIT 10 OFFSET 20` return?",
          a: "Skips the first 20 records and streams the subsequent 10 records.",
          status: "Pagination Rule ✅"
        }
      ],
      explanation:
        "Multi-column `ORDER BY` ensures deterministic sorting, while `LIMIT` and `OFFSET` provide standard client pagination."
    }
  };

  const navItems = [
    { id: "assessment-overview", label: "1. Assessment Scope" },
    { id: "topics-matrix", label: "2. Segment 1 Knowledge Matrix" },
    { id: "svg-architecture", label: "3. Relational Architecture Diagram" },
    { id: "interactive-workbench", label: "4. Self-Assessment Workbench" },
    { id: "case-studies", label: "5. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Readiness Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "9. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 001_004</span>
            <span>•</span>
            <span>Topic 0 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Segment 1 Comprehensive Review
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Segment 1 Comprehensive MCQ Self-Assessment
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Test, validate, and reinforce your foundational database knowledge: review relational theory, Codd's principles, DDL/DML execution mechanics, key constraints, NULL logic, wildcards, sorting, and pagination.
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
        {/* SECTION 1: Assessment Scope */}
        <section id="assessment-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Assessment Scope &amp; Target Competencies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The foundational skills required before moving into complex relational modeling and normalization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Category 1
              </span>
              <h3 className="font-bold text-white text-base">Relational Theory &amp; Keys</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Superkeys, Candidate Keys, Primary Keys, Alternate Keys, Composite Keys, and Foreign Key referential integrity rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Category 2
              </span>
              <h3 className="font-bold text-white text-base">DDL &amp; DML Commands</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                CREATE, ALTER, DROP, TRUNCATE table structures; INSERT, UPDATE, DELETE row manipulation; and AUTO_INCREMENT mechanics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Category 3
              </span>
              <h3 className="font-bold text-white text-base">Querying &amp; Filtering</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                WHERE predicates, comparison and logical operators, BETWEEN ranges, IN lists, LIKE wildcards, IS NULL, ORDER BY, and LIMIT.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Segment 1 Knowledge Matrix */}
        <section id="topics-matrix" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Segment 1 Foundational Knowledge Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key concepts and syntax patterns mastered across Modules 001_001 to 001_003.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Concept Area</th>
                  <th className="py-3 px-4">SQL Syntax / Keyword</th>
                  <th className="py-3 px-4">Integrity Guarantee</th>
                  <th className="py-3 px-4">Typical Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Primary Key</td>
                  <td className="py-3 px-4 text-emerald-400">PRIMARY KEY AUTO_INCREMENT</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Entity Integrity (Unique + NOT NULL)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Student ID, Order ID</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Foreign Key</td>
                  <td className="py-3 px-4 text-cyan-400">FOREIGN KEY REFERENCES tbl(id)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Referential Integrity (No Orphans)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Enrollment to Student Link</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Domain Check</td>
                  <td className="py-3 px-4 text-amber-400">CHECK (balance &gt;= 0)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Domain Integrity (Valid Values)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Age limits, fee validation</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Unique Key</td>
                  <td className="py-3 px-4 text-rose-400">UNIQUE NOT NULL</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Alternate Key Identity</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Email, Phone, Passport</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Pagination</td>
                  <td className="py-3 px-4 text-indigo-400">LIMIT 10 OFFSET 20</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Result Set Slicing</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">UI Paginated Tables</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Architecture Diagrams */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Relational Model &amp; Key Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding the structural relationship between Superkeys, Candidate Keys, and Foreign Keys.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Relational Key Hierarchy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 0.1: Relational Key Hierarchy &amp; Referential Foreign Key Linkage
                </h3>
                <span className="text-xs text-slate-400 font-mono">Relational Theory</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 360"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradDiagGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <marker id="arrowDiagCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                    </marker>
                  </defs>

                  {/* Parent Table: Academies */}
                  <rect x="50" y="40" width="380" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Parent Table: ACADEMIES (PK)
                  </text>
                  <line x1="50" y1="85" x2="430" y2="85" stroke="#334155" />

                  <rect x="70" y="105" width="340" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                  <text x="90" y="130" fill="#a7f3d0" fontSize="11" fontWeight="bold">🔑 academy_id (INT PK AUTO_INCREMENT)</text>

                  <rect x="70" y="155" width="340" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                  <text x="90" y="180" fill="#e2e8f0" fontSize="11">name (VARCHAR(100) NOT NULL UNIQUE)</text>

                  <rect x="70" y="205" width="340" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                  <text x="90" y="230" fill="#94a3b8" fontSize="11">location (VARCHAR(50) DEFAULT 'Barrackpore')</text>

                  {/* Child Table: Students */}
                  <rect x="520" y="40" width="380" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="710" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Child Table: STUDENTS (FK)
                  </text>
                  <line x1="520" y1="85" x2="900" y2="85" stroke="#334155" />

                  <rect x="540" y="105" width="340" height="40" rx="4" fill="#1e293b" stroke="#0284c7" />
                  <text x="560" y="130" fill="#bae6fd" fontSize="11" fontWeight="bold">🔑 student_id (INT PK AUTO_INCREMENT)</text>

                  <rect x="540" y="155" width="340" height="40" rx="4" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="560" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold">🔗 academy_id (INT FK &rarr; academies.id)</text>

                  <rect x="540" y="205" width="340" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                  <text x="560" y="230" fill="#e2e8f0" fontSize="11">email (VARCHAR UNIQUE - Alternate Key)</text>

                  <rect x="540" y="255" width="340" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                  <text x="560" y="280" fill="#94a3b8" fontSize="11">balance_fee_inr (DECIMAL(10,2) CHECK &gt;= 0)</text>

                  {/* Connecting Foreign Key Arrow */}
                  <path d="M 540 175 C 470 175, 470 125, 410 125" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowDiagCyan)" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Self-Assessment Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Self-Assessment Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a core competency category to review SQL scripts, conceptual rules, and sample test questions.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(assessmentCategories).map((key) => {
              const cat = assessmentCategories[key];
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
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
                      cat.badgeColor === "emerald" && "bg-emerald-400",
                      cat.badgeColor === "cyan" && "bg-cyan-400",
                      cat.badgeColor === "amber" && "bg-amber-400",
                      cat.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{cat.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {assessmentCategories[selectedCategory].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  assessmentCategories[selectedCategory].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  assessmentCategories[selectedCategory].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  assessmentCategories[selectedCategory].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  assessmentCategories[selectedCategory].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {assessmentCategories[selectedCategory].badge}
              </span>
            </div>

            {/* SQL Snippet Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Demonstration Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {assessmentCategories[selectedCategory].sqlSnippet}
              </pre>
            </div>

            {/* Test Questions Box */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Core Self-Check Questions:
              </span>
              <div className="space-y-2">
                {assessmentCategories[selectedCategory].testQuestions.map((tq, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="text-white block sm:inline mr-2">Q: {tq.q}</strong>
                      <span className="text-slate-300">A: {tq.a}</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px] whitespace-nowrap self-start sm:self-auto">
                      {tq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Pedagogical Rule:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {assessmentCategories[selectedCategory].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Real-World Case Studies: Barrackpore &amp; Kolkata Systems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Applying foundational SQL and constraint rules to real academic platforms.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Student Admission Setup */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Enforcing Referential Constraints in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Orphan Records
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At the Barrackpore academy, student registrations required linking students to courses. Creating a foreign key constraint with `ON DELETE RESTRICT` prevented accidental deletion of courses that had active enrolled students.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Production Schema:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    fee_paid_inr DECIMAL(10,2) CHECK (fee_paid_inr >= 0),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE RESTRICT
);`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata Fee Ledger Queries */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Searching Unpaid ₹ Ledgers with Pattern Matching
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Precision Filtering
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, identifying students with pending fees exceeding ₹5,000 whose branch starts with 'KOL' required combining `BETWEEN`, `LIKE`, and `IS NOT NULL` predicates into a clean SQL query.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid common beginner traps in foundational SQL syntax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Comparing with = NULL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE balance = NULL</code> always returns zero rows because equality with NULL evaluates to UNKNOWN.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use IS NULL or IS NOT NULL for missing value checks.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting WHERE in UPDATE / DELETE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `DELETE FROM students;` or `UPDATE students SET balance = 0;` modifies all records table-wide.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always include a WHERE clause and keep SQL_SAFE_UPDATES enabled.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Name All Table Constraints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always give explicit names to constraints (e.g. `CONSTRAINT fk_student_academy FOREIGN KEY...`) rather than letting MySQL assign auto-generated names.
              </p>
              <div className="text-xs text-slate-400">
                Makes future ALTER TABLE and schema migrations clean and manageable.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Match Foreign Key Data Types
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure the child foreign key column exactly matches the parent primary key in data type, signedness (`UNSIGNED`), and length.
              </p>
              <div className="text-xs text-slate-400">
                Prevents MySQL error 1215 (Cannot add foreign key constraint).
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Readiness Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Student Readiness Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core competencies to verify before moving to Segment 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Segment 1 Readiness Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Keys Defined</strong> = Distinguish Primary, Candidate, Alternate, and Foreign Keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">DDL &amp; DML Mastery</strong> = Confidently write CREATE, ALTER, INSERT, UPDATE, DELETE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Integrity Constraints</strong> = Enforce NOT NULL, UNIQUE, CHECK, and DEFAULT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Querying &amp; Slicing</strong> = Master WHERE, BETWEEN, IN, LIKE, ORDER BY, and LIMIT.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe data types closely...”</span>
                  Choosing `INT UNSIGNED` for primary keys doubles the positive range up to 4.29 billion records!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about TRUNCATE vs DELETE...”</span>
                  When resetting large test datasets, use `TRUNCATE TABLE`—it takes 1ms because it deallocates data pages instead of logging every row deletion!
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
              Comprehensive reference questions covering Segment 1 self-assessment topics.
            </p>
          </div>

          <FAQTemplate
            title="Segment 1 Comprehensive Self-Assessment FAQs"
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
            title="Segment 1 Comprehensive MCQ Self-Assessment"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Welcome to the practical review and assessment phase of Segment 1! In my classes at Barrackpore and Kolkata, I always emphasize that you cannot build a skyscraper without a rock-solid foundation. If your understanding of Candidate Keys, Foreign Key referential integrity, and NULL logic is shaky, you will struggle when we reach ER modeling, Normalization, and multi-table joins. Take your time with these 30 self-assessment questions, verify each SQL command in your terminal, and make sure your conceptual bedrock is 100% solid!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
