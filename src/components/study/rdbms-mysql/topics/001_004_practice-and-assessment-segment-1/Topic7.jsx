import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Segment 1 Final Exam & Knowledge Check
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive capstone final examination workbench and knowledge check: evaluating complete student mastery across relational theory, Codd's rules, key constraints, DDL/DML execution mechanics, SQL three-valued logic, error troubleshooting, and production SQL best practices.
 */
const Topic7 = () => {
  // Interactive Exam Section State
  const [selectedExamSection, setSelectedExamSection] = useState("sec1_relational_keys");

  const examSections = {
    sec1_relational_keys: {
      sectionNumber: "Domain A: Relational Theory & Keys (25%)",
      title: "1. Domain A: Relational Theory, Codd's Rules & Key Definitions",
      badge: "Relational Theory",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔑 EXAM DRILL: RELATIONAL KEYS & INTEGRITY DEMONSTRATION:
-- Entity Integrity: Primary Key uniquely identifies tuples (No NULLs allowed!)
-- Referential Integrity: Foreign Key references valid existing Primary Key (or NULL)

CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key!
    dept_code VARCHAR(10) NOT NULL UNIQUE   -- Alternate Candidate Key!
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL UNIQUE,     -- Alternate Key!
    email VARCHAR(120) NOT NULL UNIQUE,      -- Alternate Key!
    dept_id INT NOT NULL,
    CONSTRAINT fk_std_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE RESTRICT ON UPDATE CASCADE -- Referential Integrity!
);`,
      examQuestions: [
        {
          q: "What defines a Candidate Key?",
          ans: "A minimal superkey with no redundant attributes capable of uniquely identifying any row in a table.",
          score: "5 Marks ✅"
        },
        {
          q: "Why does Entity Integrity forbid NULL in Primary Keys?",
          ans: "Because NULL signifies unknown data; every tuple must have an unambiguous, known unique identity.",
          score: "5 Marks ✅"
        },
        {
          q: "What is the difference between Alternate and Candidate Keys?",
          ans: "All minimal superkeys are Candidate Keys; the one chosen is the Primary Key; the remaining are Alternate Keys.",
          score: "5 Marks ✅"
        }
      ],
      explanation:
        "Domain A validates formal understanding of relational algebra foundations, minimal superkeys, candidate key selection, and the mathematical rules governing entity and referential integrity."
    },
    sec2_ddl_constraints: {
      sectionNumber: "Domain B: DDL Schema & Constraints (25%)",
      title: "2. Domain B: DDL Operations, ALTER TABLE & Constraint Engineering",
      badge: "DDL & Constraints",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛠️ EXAM DRILL: DDL SCHEMA CREATION & LIVE ALTERATIONS:
CREATE TABLE inventory_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    stock_qty INT CHECK (stock_qty &ge; 0) DEFAULT 0,
    unit_price_inr DECIMAL(10,2) CHECK (unit_price_inr &gt; 0)
) ENGINE=InnoDB;

-- ALTER TABLE Drills:
ALTER TABLE inventory_items ADD COLUMN reorder_level INT DEFAULT 10;
ALTER TABLE inventory_items MODIFY COLUMN item_name VARCHAR(120) NOT NULL;
ALTER TABLE inventory_items RENAME COLUMN stock_qty TO available_stock;

-- TRUNCATE vs DROP:
-- TRUNCATE empties all rows and resets auto-increment; DROP destroys table schema entirely!`,
      examQuestions: [
        {
          q: "Why is DECIMAL(10,2) mandatory for currency (₹) over FLOAT?",
          ans: "DECIMAL guarantees exact base-10 precision, eliminating binary floating-point rounding inaccuracies.",
          score: "5 Marks ✅"
        },
        {
          q: "How does TRUNCATE differ from DELETE?",
          ans: "TRUNCATE is a DDL command that deallocates data pages in one atomic step, resetting sequences back to 1.",
          score: "5 Marks ✅"
        },
        {
          q: "What does CHECK (stock >= 0) protect against?",
          ans: "Prevents warehouse stock from ever dropping into negative numbers directly at the storage engine layer.",
          score: "5 Marks ✅"
        }
      ],
      explanation:
        "Domain B evaluates precise command syntax for `CREATE`, `ALTER`, `DROP`, and `TRUNCATE`, alongside domain validation via `CHECK`, `NOT NULL`, `UNIQUE`, and exact data types."
    },
    sec3_dml_querying: {
      sectionNumber: "Domain C: DML CRUD & Slicing (25%)",
      title: "3. Domain C: Foundational Querying, Null Logic, Sorting & Pagination",
      badge: "DML & Querying",
      badgeColor: "amber",
      sqlSnippet: `-- 🔍 EXAM DRILL: MULTI-PREDICATE QUERYING & DETERMINISTIC PAGINATION:
SELECT 
    s.student_id,
    s.full_name,
    s.city,
    s.balance_fee_inr,
    c.course_name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.city IN ('Barrackpore', 'Kolkata', 'Ichapur')
  AND s.balance_fee_inr IS NOT NULL
  AND s.balance_fee_inr > 0
ORDER BY s.balance_fee_inr DESC, s.student_id ASC
LIMIT 10 OFFSET 20; -- Page 3 (Rows 21 to 30) with deterministic tie-breaker!`,
      examQuestions: [
        {
          q: "Why does `WHERE balance = NULL` always return 0 rows?",
          ans: "Under SQL three-valued logic, equality with NULL evaluates to UNKNOWN (falsy); you must use IS NULL.",
          score: "5 Marks ✅"
        },
        {
          q: "Why is `LIKE 'BKP%'` sargable while `LIKE '%BKP'` is not?",
          ans: "Prefix wildcards can utilize B-Tree index range seeks; leading wildcards force full table scans.",
          score: "5 Marks ✅"
        },
        {
          q: "How do you ensure deterministic pagination?",
          ans: "Always include the Primary Key (e.g. `id ASC`) as a secondary tie-breaker in the ORDER BY clause.",
          score: "5 Marks ✅"
        }
      ],
      explanation:
        "Domain C tests core DML execution: precision filtering with `WHERE`, `IN`, `BETWEEN`, `LIKE`, `IS NULL`, multi-column deterministic `ORDER BY`, and `LIMIT/OFFSET` pagination."
    },
    sec4_diagnostics: {
      sectionNumber: "Domain D: Diagnostics & Best Practices (25%)",
      title: "4. Domain D: Error Troubleshooting & Production Best Practices",
      badge: "Diagnostics & PRs",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ EXAM DRILL: ERROR CODES & CODE REVIEW CHECKLIST:
-- Error 1064 (Syntax): Trailing commas, unquoted reserved words (\`order\`)
-- Error 1062 (Duplicate): Collisions on PRIMARY KEY / UNIQUE columns
-- Error 1452 (FK Child): Child foreign key referencing non-existent parent
-- Error 1451 (FK Parent): Deleting parent with active children under RESTRICT
-- Error 1175 (Safe Mode): UPDATE/DELETE without KEY column in WHERE

-- PRODUCTION PR STANDARDS:
-- 1. Zero SELECT * &rarr; Explicit column projections only.
-- 2. Named constraints (CONSTRAINT fk_...) on all Foreign Keys.
-- 3. Capitalized SQL keywords with 4-space clause indentation.`,
      examQuestions: [
        {
          q: "What causes Error 1452 and how do you resolve it?",
          ans: "Inserting a child row with a foreign key that does not exist in the parent; insert parent row first.",
          score: "5 Marks ✅"
        },
        {
          q: "Why should `SELECT *` be rejected in code reviews?",
          ans: "Transfers extra data over network, breaks covering indexes, and risks breaking apps on schema alterations.",
          score: "5 Marks ✅"
        },
        {
          q: "What does Safe Update Mode (Error 1175) prevent?",
          ans: "Prevents accidental mass data wipes by requiring a key column in UPDATE/DELETE WHERE clauses.",
          score: "5 Marks ✅"
        }
      ],
      explanation:
        "Domain D evaluates diagnostic troubleshooting skills: interpreting error codes rapidly and enforcing clean code formatting and safety standards during pull reviews."
    }
  };

  const navItems = [
    { id: "exam-overview", label: "1. Final Exam Overview" },
    { id: "certification-matrix", label: "2. Certification Matrix" },
    { id: "interactive-workbench", label: "3. Final Exam Workbench" },
    { id: "case-studies", label: "4. Capstone Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Segment 1 Certification Checklist" },
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
            <span>Topic 7 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Segment 1 Final Capstone Exam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Segment 1 Final Exam &amp; Knowledge Check
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            The comprehensive final capstone assessment for Segment 1: prove mastery across Relational Theory, Codd's Rules, DDL/DML Execution, Constraint Engineering, Error Debugging, and Production SQL Best Practices before advancing to Segment 2.
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
        {/* SECTION 1: Final Exam Overview */}
        <section id="exam-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Segment 1 Capstone Exam Structure
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A 100-mark comprehensive assessment evaluating all foundational competencies across Modules 001_001 to 001_004.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Domain A (25%)</span>
              <h3 className="font-bold text-white">Relational Keys</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Superkeys, candidate keys, entity and referential integrity guarantees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Domain B (25%)</span>
              <h3 className="font-bold text-white">DDL &amp; Constraints</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                CREATE, ALTER, TRUNCATE, CHECK, UNIQUE, and exact DECIMAL types.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Domain C (25%)</span>
              <h3 className="font-bold text-white">DML Querying</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                WHERE, BETWEEN, IN, LIKE, IS NULL, multi-column ORDER BY, and LIMIT.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Domain D (25%)</span>
              <h3 className="font-bold text-white">Diagnostics &amp; Best Practices</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Error codes (1064, 1062, 1452, 1175), zero SELECT *, and style guides.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Certification Matrix */}
        <section id="certification-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Segment 1 Mastery &amp; Certification Pathway
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The four progression stages demonstrating complete database readiness for Segment 2.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 7.1: Segment 1 Mastery Framework &amp; Segment 2 Bridge
              </h3>
              <span className="text-xs text-slate-400 font-mono">Foundational Certification</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrExamCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Foundation */}
                <rect x="20" y="40" width="200" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. RELATIONAL THEORY</text>
                <line x1="20" y1="85" x2="220" y2="85" stroke="#334155" />
                <text x="35" y="115" fill="#bae6fd" fontSize="10">✓ Codd's Relational Model</text>
                <text x="35" y="145" fill="#bae6fd" fontSize="10">✓ Minimal Superkeys</text>
                <text x="35" y="175" fill="#bae6fd" fontSize="10">✓ Candidate &amp; Primary Keys</text>
                <text x="35" y="205" fill="#bae6fd" fontSize="10">✓ Foreign Key Links</text>
                <text x="35" y="235" fill="#bae6fd" fontSize="10">✓ Entity &amp; Referential Rules</text>

                {/* Box 2: Schema & DDL */}
                <rect x="255" y="40" width="200" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="355" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. SCHEMA &amp; DDL</text>
                <line x1="255" y1="85" x2="455" y2="85" stroke="#334155" />
                <text x="270" y="115" fill="#bae6fd" fontSize="10">✓ CREATE &amp; ALTER TABLE</text>
                <text x="270" y="145" fill="#bae6fd" fontSize="10">✓ Exact DECIMAL(10,2)</text>
                <text x="270" y="175" fill="#bae6fd" fontSize="10">✓ CHECK, UNIQUE, DEFAULT</text>
                <text x="270" y="205" fill="#bae6fd" fontSize="10">✓ TRUNCATE vs DROP</text>
                <text x="270" y="235" fill="#bae6fd" fontSize="10">✓ InnoDB Engine Setting</text>

                {/* Box 3: DML & Slicing */}
                <rect x="490" y="40" width="200" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="590" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">3. DML &amp; QUERYING</text>
                <line x1="490" y1="85" x2="690" y2="85" stroke="#334155" />
                <text x="505" y="115" fill="#bae6fd" fontSize="10">✓ WHERE, IN, BETWEEN</text>
                <text x="505" y="145" fill="#bae6fd" fontSize="10">✓ LIKE Wildcard Matching</text>
                <text x="505" y="175" fill="#bae6fd" fontSize="10">✓ IS NULL Evaluation</text>
                <text x="505" y="205" fill="#bae6fd" fontSize="10">✓ Deterministic ORDER BY</text>
                <text x="505" y="235" fill="#bae6fd" fontSize="10">✓ LIMIT &amp; OFFSET Paging</text>

                {/* Box 4: Segment 2 Ready */}
                <rect x="725" y="40" width="205" height="280" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="827" y="70" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">4. SEGMENT 2 BRIDGE</text>
                <line x1="725" y1="85" x2="930" y2="85" stroke="#334155" />
                <text x="740" y="115" fill="#e9d5ff" fontSize="10">🚀 Advanced ER/EER</text>
                <text x="740" y="145" fill="#e9d5ff" fontSize="10">🚀 Relational Algebra</text>
                <text x="740" y="175" fill="#e9d5ff" fontSize="10">🚀 1NF to BCNF Normalization</text>
                <text x="740" y="205" fill="#e9d5ff" fontSize="10">🚀 Complex Multi-Joins</text>
                <text x="740" y="235" fill="#e9d5ff" fontSize="10">🚀 Stored Procedures &amp; ACID</text>

                {/* Connecting Arrows */}
                <path d="M 220 180 L 255 180" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrExamCyan)" />
                <path d="M 455 180 L 490 180" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrExamCyan)" />
                <path d="M 690 180 L 725 180" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrExamCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Final Exam Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Final Exam Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an examination domain to inspect demonstration scripts, scored test challenges, and pedagogical grading keys.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(examSections).map((key) => {
              const sec = examSections[key];
              const isSelected = selectedExamSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExamSection(key)}
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
                      sec.badgeColor === "emerald" && "bg-emerald-400",
                      sec.badgeColor === "cyan" && "bg-cyan-400",
                      sec.badgeColor === "amber" && "bg-amber-400",
                      sec.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{sec.sectionNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {examSections[selectedExamSection].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  examSections[selectedExamSection].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  examSections[selectedExamSection].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  examSections[selectedExamSection].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  examSections[selectedExamSection].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {examSections[selectedExamSection].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Capstone Demonstration:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {examSections[selectedExamSection].sqlSnippet}
              </pre>
            </div>

            {/* Scored Exam Questions */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Scored Final Exam Questions:
              </span>
              <div className="space-y-2.5">
                {examSections[selectedExamSection].examQuestions.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="text-white block sm:inline mr-2">Q{idx + 1}: {item.q}</strong>
                      <span className="text-slate-300">Ans: {item.ans}</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-xs whitespace-nowrap self-start sm:self-auto font-bold">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Domain Competency Benchmark:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {examSections[selectedExamSection].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Capstone Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Segment 1 Capstone Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world academic and retail validation across West Bengal platforms.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Multi-Table Schema Deployment */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Zero-Error Academic Schema Deployment in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  100% Validated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, creating the multi-campus college database in topological order with named foreign keys, CHECK constraints, and exact `DECIMAL(10,2)` currency types passed all unit tests on the first execution with zero constraint violations.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Query Optimization */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – High-Speed Querying &amp; Pagination in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Sub-Millisecond Execution
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, refactoring customer order and student marksheet queries with explicit projections, sargable prefix filters, and deterministic `ORDER BY` pagination achieved consistent sub-millisecond query execution across thousands of student records.
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
              Core principles to carry into Segment 2 and enterprise database careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Bypassing Database Constraints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Relying exclusively on backend code for data validation leaves the database vulnerable to rogue scripts, direct manual edits, and migration errors.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce constraints (NOT NULL, UNIQUE, CHECK, FK) at the database layer.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Silent NULL Comparison Traps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing `= NULL` produces no syntax error but silently returns 0 rows due to SQL three-valued logic.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use IS NULL or IS NOT NULL.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Maintain Topological DDL Order
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always create parent tables before child tables, and drop child tables before parent tables in migration scripts.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero foreign key dependency failures.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Format All SQL Professionally
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use UPPERCASE keywords, vertical clause indentation, explicit projections, and descriptive constraint names.
              </p>
              <div className="text-xs text-slate-400">
                Produces enterprise-grade maintainable codebases.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Segment 1 Certification Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Segment 1 Capstone Certification Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Verify your readiness before advancing to Segment 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Segment 1 Mastery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Relational Theory</strong> = Candidate, Primary, Alternate, and Foreign Keys mastered.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">DDL &amp; Constraints</strong> = CREATE, ALTER, TRUNCATE, CHECK, UNIQUE, DECIMAL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">DML &amp; Querying</strong> = Precision WHERE, LIKE, IS NULL, deterministic pagination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Diagnostics &amp; PRs</strong> = Error code resolution (1064, 1452, 1175), zero SELECT *.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Welcome to the next level...”</span>
                  By completing Segment 1 with 8 comprehensive topics and 240 questions, you have built an exceptional foundation. Segment 2 will build on this with deep ER/EER modeling, relational algebra, and formal normalization (1NF to BCNF)!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Keep this mindset...”</span>
                  Treat the database not as a passive storage bucket, but as an active, highly optimized mathematical constraint engine. That is the mindset of a true database architect!
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
              Comprehensive reference questions covering the Segment 1 Final Capstone Exam.
            </p>
          </div>

          <FAQTemplate
            title="Segment 1 Final Exam & Capstone FAQs"
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
            title="Segment 1 Final Exam & Knowledge Check"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Heartiest congratulations on completing Segment 1 of our RDBMS MySQL curriculum! Throughout these four foundational modules, you have transitioned from understanding basic file systems and relational tables to designing robust multi-table schemas, enforcing composite constraints, executing transactional CRUD queries, debugging complex error codes, and formatting clean production SQL. You have proven your skills through practical labs, real-world case studies in Barrackpore and Kolkata, and 240 in-depth questions. You are now 100% prepared to take on Segment 2: Relational Database Design, Extended ER Modeling, Relational Algebra, and Normalization!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
