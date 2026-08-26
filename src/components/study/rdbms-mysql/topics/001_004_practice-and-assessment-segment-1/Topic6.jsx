import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Code Review, Formatting & SQL Best Practices
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive code review workbench and SQL style guide tutorial: transforming monolithic messy queries into readable indented clauses, eliminating SELECT * anti-patterns, naming system constraints explicitly, and enforcing enterprise-grade formatting and safety standards.
 */
const Topic6 = () => {
  // Interactive Code Review Case State
  const [selectedReviewCase, setSelectedReviewCase] = useState("case1_formatting");

  const reviewCases = {
    case1_formatting: {
      caseNumber: "Case 1: Monolithic Formatting",
      title: "1. Refactoring Monolithic Single-Line SQL into Clean Indented Clauses",
      badge: "Formatting & Style",
      badgeColor: "rose",
      unformattedSnippet: `-- ❌ UNFORMATTED MONOLITHIC SQL (Hard to Read & Review):
select s.student_id,s.first_name,s.last_name,c.course_name,d.dept_name,a.initial_deposit_inr from students s join admissions a on s.student_id=a.student_id join courses c on a.course_id=c.course_id join departments d on c.department_id=d.department_id where d.campus_city='Barrackpore' and a.admission_status='Confirmed' order by a.initial_deposit_inr desc limit 10;`,
      refactoredSnippet: `-- ⚡ CLEAN PRODUCTION FORMATTED SQL:
SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    c.course_name,
    d.dept_name,
    a.initial_deposit_inr AS deposit_paid_inr
FROM students s
JOIN admissions a 
    ON s.student_id = a.student_id
JOIN courses c 
    ON a.course_id = c.course_id
JOIN departments d 
    ON c.department_id = d.department_id
WHERE d.campus_city = 'Barrackpore'
  AND a.admission_status = 'Confirmed'
ORDER BY a.initial_deposit_inr DESC
LIMIT 10; -- Clean, readable, and Git diff friendly! ✅`,
      reviewRules: [
        { rule: "UPPERCASE Keywords", explanation: "Write SELECT, FROM, JOIN, WHERE, ORDER BY in UPPERCASE" },
        { rule: "Clause Indentation", explanation: "Place each major clause on a new line; indent ON and AND by 4 spaces" },
        { rule: "One Column Per Line", explanation: "List projected columns vertically with trailing commas for clean Git diffs" }
      ],
      explanation:
        "Formatting queries with clear clause indentation and uppercase keywords makes multi-table joins immediately scannable during code reviews and simplifies Git version history diffs."
    },
    case2_select_star: {
      caseNumber: "Case 2: SELECT * Anti-Pattern",
      title: "2. Eliminating SELECT * & Enforcing Explicit Projections",
      badge: "Projection Refactoring",
      badgeColor: "amber",
      unformattedSnippet: `-- ❌ SELECT * ANTI-PATTERN (Transfers Extra Bytes & Breaks Index Access):
SELECT * 
FROM orders o 
JOIN customers c ON o.customer_id = c.customer_id 
WHERE c.city = 'Kolkata';

-- Issues:
-- 1. Returns customer password hashes and internal timestamps unnecessarily.
-- 2. Transmits large BLOBs/TEXT columns over network.
-- 3. Breaks application ORMs if new columns are added in schema migrations.`,
      refactoredSnippet: `-- ⚡ REFACTORED EXPLICIT PROJECTION:
SELECT 
    o.order_id,
    o.order_date,
    o.order_total_inr,
    c.customer_id,
    c.full_name AS customer_name,
    c.email
FROM orders o
JOIN customers c 
    ON o.customer_id = c.customer_id
WHERE c.city = 'Kolkata'; -- Precise, secure, and index-optimized! ✅`,
      reviewRules: [
        { rule: "Explicit Projections", explanation: "Only select the columns required by the application" },
        { rule: "Covering Indexes", explanation: "Allows optimizer to satisfy queries from index leaf pages" },
        { rule: "Application Safety", explanation: "Prevents breaking API contracts when tables are altered" }
      ],
      explanation:
        "`SELECT *` is rejected in production pull reviews. Explicit column projections reduce network bandwidth, enable covering index execution, and protect API payloads from unvetted schema modifications."
    },
    case3_naming_constraints: {
      caseNumber: "Case 3: Naming Constraints",
      title: "3. Naming System Constraints & Defense-in-Depth",
      badge: "Constraint Naming",
      badgeColor: "cyan",
      unformattedSnippet: `-- ❌ ANONYMOUS SYSTEM CONSTRAINTS (Cryptic & Unmaintainable):
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    fee FLOAT, -- ❌ FLOAT used for currency!
    FOREIGN KEY (student_id) REFERENCES students(id), -- Auto-named: enrollments_ibfk_1
    FOREIGN KEY (course_id) REFERENCES courses(id)    -- Auto-named: enrollments_ibfk_2
);`,
      refactoredSnippet: `-- ⚡ ENTERPRISE-GRADE PRODUCTION DDL:
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    fee_inr DECIMAL(10,2) CHECK (fee_inr >= 0), -- Exact precision currency + check!
    CONSTRAINT fk_enrollment_student 
        FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_enrollment_course 
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB; -- Explicit names, exact types, robust constraints! ✅`,
      reviewRules: [
        { rule: "Explicit Constraint Symbols", explanation: "Use descriptive prefixes: fk_..., uq_..., chk_..." },
        { rule: "DECIMAL for Currency", explanation: "Never store Indian Rupee (₹) in FLOAT or DOUBLE" },
        { rule: "Explicit Storage Engine", explanation: "Always append ENGINE=InnoDB for transactional safety" }
      ],
      explanation:
        "Explicitly naming constraints with standard prefixes (`fk_...`, `chk_...`) makes future migrations, index drops, and error log diagnostics painless and self-documenting."
    },
    case4_safety_checks: {
      caseNumber: "Case 4: Safe DML & Transactions",
      title: "4. Enforcing Safe Update Practices & Scoped Transactions",
      badge: "Transactional Safety",
      badgeColor: "emerald",
      unformattedSnippet: `-- ❌ DANGEROUS UNPROTECTED UPDATE (High Production Risk):
-- Modifying customer ledgers without transaction or primary key target:
UPDATE customers SET balance_fee = 0 WHERE city = 'Barrackpore';
-- If an error happens, changes are permanent and cannot be rolled back!`,
      refactoredSnippet: `-- ⚡ SAFE TRANSACTIONAL DML SCRIPT:
START TRANSACTION;

-- 1. Verify affected row count before making modifications:
SELECT COUNT(*) AS affected_rows 
FROM customers 
WHERE city = 'Barrackpore' AND balance_fee > 0;

-- 2. Execute safe targeted update:
UPDATE customers 
SET balance_fee = 0.00 
WHERE city = 'Barrackpore' AND balance_fee > 0;

-- 3. Verify results before committing:
SELECT customer_id, full_name, balance_fee 
FROM customers 
WHERE city = 'Barrackpore';

COMMIT; -- Commit only after verifying expected output! ✅`,
      reviewRules: [
        { rule: "Scoped Transactions", explanation: "Wrap manual production modifications in START TRANSACTION ... COMMIT" },
        { rule: "Pre-Update Counts", explanation: "Run SELECT COUNT(*) before UPDATE/DELETE to verify target scope" },
        { rule: "Rollback Safety", explanation: "Execute ROLLBACK immediately if affected row count does not match" }
      ],
      explanation:
        "Production database administrators always wrap manual updates in transactions and verify affected row counts beforehand to prevent accidental data corruption."
    }
  };

  const navItems = [
    { id: "review-overview", label: "1. Code Review Framework" },
    { id: "style-diagram", label: "2. SQL Style Hierarchy" },
    { id: "interactive-workbench", label: "3. Code Review Workbench" },
    { id: "case-studies", label: "4. Real-World Review Cases" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Pull Request Review Checklist" },
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
            <span>Topic 6 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Code Review Guide
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Code Review, Formatting &amp; SQL Best Practices
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Adopt professional engineering craftsmanship: learn the industry-standard SQL style guide, refactor messy monolithic queries into indented clauses, eliminate <code className="text-rose-400 font-mono">SELECT *</code> anti-patterns, name constraints explicitly, and establish safe transactional update protocols.
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
        {/* SECTION 1: Code Review Framework */}
        <section id="review-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. SQL Code Review &amp; Quality Dimensions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The four pillars evaluated during database code reviews in enterprise engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white">Readability &amp; Style</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                UPPERCASE keywords, lowercase snake_case identifiers, and clause indentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white">Projection Efficiency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explicit column lists, zero `SELECT *`, and covering index alignment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white">Constraint Integrity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Named foreign keys, check validations, and exact `DECIMAL` precision.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white">Operational Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Safe update mode, atomic transaction scopes, and rollback verification.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SQL Style Hierarchy */}
        <section id="style-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy of Production SQL Formatting
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard clause hierarchy and indentation layout for multi-table queries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 6.1: SQL Pull Request Review &amp; Formatting Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Clean Code Standard</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrRevCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Stage 1: Developer PR */}
                <rect x="30" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="155" y="70" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">1. RAW DEVELOPER SQL</text>
                <line x1="30" y1="85" x2="280" y2="85" stroke="#334155" />
                <rect x="50" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="60" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">Monolithic Single-Line</text>
                <text x="60" y="140" fill="#94a3b8" fontSize="9">No clause indentation</text>

                <rect x="50" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="60" y="185" fill="#fca5a5" fontSize="10" fontWeight="bold">SELECT * Anti-Pattern</text>
                <text x="60" y="200" fill="#94a3b8" fontSize="9">Transfers unneeded columns</text>

                {/* Stage 2: Code Review Inspection */}
                <rect x="350" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="475" y="70" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">2. PEER REVIEW AUDIT</text>
                <line x1="350" y1="85" x2="600" y2="85" stroke="#334155" />
                <rect x="370" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="380" y="125" fill="#fde68a" fontSize="10" fontWeight="bold">Enforce UPPERCASE Keywords</text>
                <text x="380" y="140" fill="#94a3b8" fontSize="9">SELECT, FROM, WHERE, JOIN</text>

                <rect x="370" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="380" y="185" fill="#fde68a" fontSize="10" fontWeight="bold">Audit Constraint Naming</text>
                <text x="380" y="200" fill="#94a3b8" fontSize="9">Verify explicit fk_ / chk_ symbols</text>

                {/* Stage 3: Production Approval */}
                <rect x="670" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="795" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">3. APPROVED PRODUCTION SQL</text>
                <line x1="670" y1="85" x2="920" y2="85" stroke="#334155" />
                <rect x="690" y="105" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="700" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Formatted Clause Hierarchy</text>
                <text x="700" y="140" fill="#94a3b8" fontSize="9">Clean Git diffs &amp; readable</text>

                <rect x="690" y="165" width="210" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="700" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">Scoped Transactional Safety</text>
                <text x="700" y="200" fill="#94a3b8" fontSize="9">Tested rollbacks &amp; key targeting</text>

                {/* Connecting Arrows */}
                <path d="M 280 180 L 350 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrRevCyan)" />
                <path d="M 600 180 L 670 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrRevCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Code Review Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Code Review Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a code review anti-pattern to compare unformatted SQL with its production refactored version.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(reviewCases).map((key) => {
              const cs = reviewCases[key];
              const isSelected = selectedReviewCase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedReviewCase(key)}
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
                      cs.badgeColor === "emerald" && "bg-emerald-400",
                      cs.badgeColor === "cyan" && "bg-cyan-400",
                      cs.badgeColor === "amber" && "bg-amber-400",
                      cs.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{cs.caseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {reviewCases[selectedReviewCase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  reviewCases[selectedReviewCase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  reviewCases[selectedReviewCase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  reviewCases[selectedReviewCase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  reviewCases[selectedReviewCase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {reviewCases[selectedReviewCase].badge}
              </span>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold">
                  ❌ Unformatted Anti-Pattern:
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-rose-950/80 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                  {reviewCases[selectedReviewCase].unformattedSnippet}
                </pre>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  ⚡ Clean Production Refactoring:
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-950/80 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                  {reviewCases[selectedReviewCase].refactoredSnippet}
                </pre>
              </div>
            </div>

            {/* Review Rules Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Code Review Style Guidelines:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Review Guideline</th>
                      <th className="py-2.5 px-4">Engineering Rationale &amp; Best Practice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {reviewCases[selectedReviewCase].reviewRules.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-cyan-300 font-sans">{row.rule}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Senior Reviewer Verdict:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {reviewCases[selectedReviewCase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Review Cases */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Code Review Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Peer review scenarios from engineering teams in Barrackpore and Kolkata.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Pull Request Refactoring */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating SELECT * Across 25 Backend API Services
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  45% Bandwidth Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, refactoring 25 legacy backend endpoints that used `SELECT *` into explicit column lists eliminated 45% of unnecessary network payload data, significantly reduced application server memory overhead, and enabled index-only covering queries.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Constraint Migration */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Naming 40 System Foreign Keys in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Clean Schema Migration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a major database upgrade in Kolkata, replacing anonymous system foreign keys (like `tbl_ibfk_1`) with structured names (`CONSTRAINT fk_order_customer`) enabled automated Liquibase schema migration scripts to drop and alter foreign keys reliably without manual patching.
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
              Key rules to enforce on every database pull request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Merging SELECT * Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Approving pull requests containing `SELECT *` creates hidden performance debts that degrade database throughput as table widths grow.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Reject any PR query that uses SELECT * without explicit business justification.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Currency in FLOAT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using `FLOAT` for financial balances causes irreversible binary floating-point rounding errors in accounting reports.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always require DECIMAL(10,2) or DECIMAL(12,2) for money.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Capitalize All SQL Keywords
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enforce UPPERCASE keywords (`SELECT`, `JOIN`, `WHERE`) to distinguish query logic from object identifiers clearly.
              </p>
              <div className="text-xs text-slate-400">
                Improves visual scannability across massive codebases.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Format Clauses Vertically
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Keep each projected column, join condition, and filter predicate on an indented new line.
              </p>
              <div className="text-xs text-slate-400">
                Produces minimal, single-line Git diffs on schema edits.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pull Request Review Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. SQL Pull Request Review Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Use this checklist before approving any SQL migration or query PR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> PR Verification Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">No SELECT *</strong> = All projected columns are explicitly enumerated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Named Constraints</strong> = All Foreign Keys and Checks have explicit descriptive symbols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Exact Precision Types</strong> = Financial balances use `DECIMAL`, dates use `DATE/TIMESTAMP`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Clause Indentation</strong> = Keywords are UPPERCASE with 4-space indented sub-clauses.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Git diffs...”</span>
                  When projected columns are formatted one-per-line with trailing commas, adding or removing a column changes exactly 1 line in Git. When written on 1 line, the entire query diff turns red!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about code reviews as mentorship...”</span>
                  Code review isn't about nitpicking—it's about teaching team members how to write SQL that performs reliably at enterprise scale!
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
              Comprehensive reference questions covering SQL code review, formatting standards, and best practices.
            </p>
          </div>

          <FAQTemplate
            title="SQL Code Review & Formatting Best Practices FAQs"
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
            title="Code Review, Formatting & SQL Best Practices"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Good developers write code that machines can execute; great developers write code that human beings can read, maintain, and audit effortlessly. Formatting your SQL with uppercase keywords, vertical clause indentation, explicit column projections, and named constraints is not an afterthought—it is a core engineering discipline. Treat every SQL script you write as a professional software artifact that your team will be proud to maintain for years to come!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
