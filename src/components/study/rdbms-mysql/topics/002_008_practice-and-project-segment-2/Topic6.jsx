import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Segment 2 Practical Assessment & Scenario-based Exam
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and capstone examination portal evaluating schema modeling, analytical SQL, query tuning, and concurrency.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedExamSection, setSelectedExamSection] = useState("section_a_schema");

  const examSections = {
    section_a_schema: {
      title: "Section A: Schema Architecture & Normalization Defense (25 Marks)",
      badge: "3NF Normalization",
      badgeColor: "emerald",
      sqlQuery: `-- Exam Task 1: Decompose flawed raw staging table into 3NF:
-- Target: Online Course Academy with Branches, Instructors, Courses, and Subscriptions.

CREATE TABLE branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_title VARCHAR(255) NOT NULL,
    instructor_id INT NOT NULL,
    base_fee_inr DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`,
      resultRows: [
        { metric: "1NF Compliance", criteria: "Atomic scalar values & unique PK", maxScore: "10 Marks", awarded: "10/10", feedback: "Perfect scalar decomposition" },
        { metric: "2NF Compliance", criteria: "No partial dependencies on composite PK", maxScore: "8 Marks", awarded: "8/8", feedback: "Extracted independent entities" },
        { metric: "3NF Compliance", criteria: "No transitive dependencies between non-keys", maxScore: "7 Marks", awarded: "7/7", feedback: "Extracted lookup tables" },
      ],
      explanation:
        "Evaluates the candidate's ability to identify functional dependencies, eliminate anomalies, and write clean DDL scripts with appropriate foreign key cascade rules.",
    },
    section_b_query: {
      title: "Section B: Complex Analytical Query Synthesis (30 Marks)",
      badge: "CTEs & Window Functions",
      badgeColor: "cyan",
      sqlQuery: `-- Exam Task 2: Calculate Month-over-Month growth and student rankings:
WITH MonthlyBranchSales AS (
    SELECT 
        b.branch_name,
        DATE_FORMAT(p.payment_date, '%Y-%m') AS sale_month,
        SUM(p.amount_paid_inr) AS monthly_rev
    FROM fee_payments p
    JOIN enrollments e ON p.enrollment_id = e.enrollment_id
    JOIN students s ON e.student_id = s.student_id
    JOIN branches b ON s.branch_id = b.branch_id
    GROUP BY b.branch_id, b.branch_name, DATE_FORMAT(p.payment_date, '%Y-%m')
)
SELECT 
    branch_name,
    sale_month,
    monthly_rev,
    LAG(monthly_rev, 1, 0.00) OVER (PARTITION BY branch_name ORDER BY sale_month ASC) AS prev_rev,
    ROUND(((monthly_rev - LAG(monthly_rev, 1, monthly_rev) OVER (PARTITION BY branch_name ORDER BY sale_month ASC)) / LAG(monthly_rev, 1, monthly_rev) OVER (PARTITION BY branch_name ORDER BY sale_month ASC)) * 100.0, 2) AS growth_pct
FROM MonthlyBranchSales;`,
      resultRows: [
        { metric: "Multi-Table JOINs", criteria: "Inner/Left joins across 4+ tables", maxScore: "10 Marks", awarded: "10/10", feedback: "Correct join relationships" },
        { metric: "Window Functions", criteria: "Accurate LAG() offset & partition", maxScore: "10 Marks", awarded: "10/10", feedback: "Proper partition ordering" },
        { metric: "CTE Structure", criteria: "Readable named CTE blocks", maxScore: "10 Marks", awarded: "10/10", feedback: "Modular clean syntax" },
      ],
      explanation:
        "Tests advanced analytical SQL synthesis combining Common Table Expressions (CTEs), multi-table joins, and offset window functions.",
    },
    section_c_tuning: {
      title: "Section C: Performance Diagnostics & Index Optimization (25 Marks)",
      badge: "EXPLAIN & Indexing",
      badgeColor: "amber",
      sqlQuery: `-- Exam Task 3: Refactor non-SARGable query and create Covering Index:

-- ❌ Original: WHERE YEAR(payment_date) = 2026 ORDER BY amount_paid_inr DESC; (type: ALL, 2.4s)

-- ✅ Refactored:
SELECT enrollment_id, payment_date, amount_paid_inr 
FROM fee_payments 
WHERE payment_date &ge; '2026-01-01 00:00:00' 
  AND payment_date < '2027-01-01 00:00:00'
ORDER BY amount_paid_inr DESC;

-- ✅ Proposed Covering Index:
CREATE INDEX idx_payment_covering ON fee_payments (payment_date, amount_paid_inr DESC, enrollment_id);`,
      resultRows: [
        { metric: "SARGability Refactor", criteria: "Replaced YEAR() with date range", maxScore: "10 Marks", awarded: "10/10", feedback: "Enabled B-Tree seek" },
        { metric: "Filesort Elimination", criteria: "Index handles ORDER BY clause", maxScore: "8 Marks", awarded: "8/8", feedback: "Zero sort buffer spike" },
        { metric: "Covering Index", criteria: "All columns projected in index leaf", maxScore: "7 Marks", awarded: "7/7", feedback: "Achieved Using index" },
      ],
      explanation:
        "Examines the candidate's forensic skills in reading EXPLAIN output, fixing non-SARGable predicates, and proposing optimal composite covering indexes.",
    },
  };

  const navItems = [
    { id: "exam-overview", label: "1. Capstone Exam Overview" },
    { id: "scoring-rubric", label: "2. Scoring Rubric & Distribution" },
    { id: "svg-diagrams", label: "3. Exam Structure & Rubric SVGs" },
    { id: "interactive-sandbox", label: "4. Live Exam Scenario Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_008</span>
            <span>•</span>
            <span>Assessment 6 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Segment 2 Practical Exam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Segment 2 Practical Assessment & Scenario-based Exam
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            The ultimate capstone evaluation. Defend 3NF relational schemas, synthesize advanced analytical queries with window functions, profile slow queries with <code className="text-cyan-300 font-mono">EXPLAIN ANALYZE</code>, and implement ACID concurrency locks.
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
        <section id="exam-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Segment 2 Capstone Assessment Overview
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A comprehensive 4-section examination measuring full technical proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold text-sm">
                <span>Section A</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">25 Marks</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Schema Architecture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Decompose unnormalized staging tables into 3NF and establish primary/foreign key constraints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 font-bold text-sm">
                <span>Section B</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">30 Marks</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Query Synthesis</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Write multi-table analytical queries with CTEs, DENSE_RANK, LAG, and WITH ROLLUP reports.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold text-sm">
                <span>Section C</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-800">25 Marks</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Query Profiling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interpret EXPLAIN plans, refactor non-SARGable WHERE predicates, and design covering indexes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-rose-400 font-bold text-sm">
                <span>Section D</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-950 border border-rose-800">20 Marks</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Concurrency & Locks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implement pessimistic locking (<code className="text-rose-300 font-mono">SELECT FOR UPDATE</code>) and price snapshots.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Scoring Rubric */}
        <section id="scoring-rubric" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Capstone Grading Rubric (100 Total Marks)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Performance bands and grading standards for certification.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Score Range</th>
                  <th className="py-3.5 px-4 text-emerald-400">Grade Level</th>
                  <th className="py-3.5 px-4 text-white">Competency Evaluation</th>
                  <th className="py-3.5 px-4 text-amber-400">Certification Award</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">90 - 100 Marks</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">Grade O (Outstanding)</td>
                  <td className="py-3 px-4 text-slate-300">Enterprise Database Architect Level. Flawless 3NF, sub-millisecond queries.</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Distinction Honors</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-mono">75 - 89 Marks</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">Grade E (Excellent)</td>
                  <td className="py-3 px-4 text-slate-300">Senior SQL Developer Level. Robust relational models with minor index gaps.</td>
                  <td className="py-3 px-4 text-cyan-300 font-semibold">Advance Certificate</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-amber-400 font-mono">60 - 74 Marks</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">Grade A (Competent)</td>
                  <td className="py-3 px-4 text-slate-300">Junior Developer Level. Solid SQL syntax but struggles with EXPLAIN plans.</td>
                  <td className="py-3 px-4 text-slate-300">Standard Pass</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Exam Distribution & Competency Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visual overview of the assessment breakdown and engineering skills tested.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Assessment Structure */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Segment 2 Capstone Exam Structure (100 Marks)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Section A */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Section A: Schema (25M)</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">3NF & Relational DDL</text>
                  </g>

                  {/* Section B */}
                  <g>
                    <rect x="230" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Section B: Query (30M)</text>
                    <rect x="240" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="320" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">CTEs, DENSE_RANK, LAG</text>
                  </g>

                  {/* Section C */}
                  <g>
                    <rect x="440" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Section C: Tuning (25M)</text>
                    <rect x="450" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="530" y="86" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">EXPLAIN & Covering Indexes</text>
                  </g>

                  {/* Section D */}
                  <g>
                    <rect x="650" y="30" width="180" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Section D: Locks (20M)</text>
                    <rect x="660" y="70" width="160" height="25" rx="3" fill="#1e293b" />
                    <text x="740" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">ACID & SELECT FOR UPDATE</text>
                  </g>

                  {/* Connecting Line */}
                  <path d="M 200 75 L 230 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 75 L 440 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 620 75 L 650 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Exam Scenario Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your solution code and inspect grading criteria across all exam sections.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(examSections).map(([key, item]) => {
              const isActive = selectedExamSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExamSection(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Section" : "○ View Solution"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{examSections[selectedExamSection].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{examSections[selectedExamSection].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Exam Evaluation Portal
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Candidate Solution Script</span>
                <span className="text-emerald-400">Automated Grader</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {examSections[selectedExamSection].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Grading Metric</th>
                    <th className="py-3 px-4 text-white">Evaluation Criteria</th>
                    <th className="py-3 px-4 text-emerald-400">Max Score</th>
                    <th className="py-3 px-4 text-cyan-400">Marks Awarded</th>
                    <th className="py-3 px-4 text-amber-400">Instructor Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {examSections[selectedExamSection].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.metric}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.criteria}</td>
                      <td className="py-3 px-4 text-slate-300">{row.maxScore}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.awarded}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world academic evaluation outcomes for Barrackpore Academy students.
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
                  Mamata Hui's Perfect 100/100 Capstone Defense
                </h3>
                <span className="text-xs text-slate-400 font-mono">Student ID: MEM-101</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Student Mamata Hui defended her University Library 3NF schema, proving that loaning at the physical barcode copy level eliminated all inventory anomalies, and demonstrated a 2,000x query speedup with composite covering indexes!
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
                Grade: O (Outstanding) • 100/100 • Awarded Full Distinction
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Common mistakes that lead to mark deductions in database exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting Immutable Price Snapshots
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Failing to store <code className="text-rose-300 font-mono">unit_price_at_sale_inr</code> on order items is the number one cause of mark deductions in the schema design section!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always freeze the sale price snapshot at transaction time.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Index Foreign Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Whenever you create a child junction table in 3NF, explicitly create B-Tree indexes on the foreign key columns to ensure multi-table JOINs remain blazing fast!
              </p>
              <div className="text-xs text-slate-400">
                Guarantees full marks in the performance profiling section.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Final pre-exam verification checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Pre-Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Review 3NF rules: No repeating groups, no partial deps, no transitive deps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Practice <code className="text-cyan-300 font-mono">DENSE_RANK()</code> and <code className="text-cyan-300 font-mono">LAG()</code> window functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Be ready to decode <code className="text-cyan-300 font-mono">EXPLAIN ANALYZE</code> access types (ALL vs ref).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Write transactions using <code className="text-cyan-300 font-mono">SELECT ... FOR UPDATE</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the (Equality, Range, Sort) rule...”</span>
                  In Section C, whenever asked to design an index for a query with WHERE and ORDER BY, sequence columns strictly as (Equality, Range, Sort) for maximum score!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ON DELETE RESTRICT on financial tables...”</span>
                  Never put CASCADE on financial payment tables in Section A; examiners specifically check for RESTRICT to preserve audit integrity!
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
              Comprehensive reference questions covering the Segment 2 practical assessment, scoring rubrics, exam questions, and grading criteria.
            </p>
          </div>

          <FAQTemplate
            title="Segment 2 Practical Assessment FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Segment 2 Practical Assessment & Scenario-based Exam"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="This capstone assessment is where all the pieces connect. When you design a schema in 3NF, write analytical queries using CTEs and window functions, and optimize execution with covering indexes, you are not just writing code — you are engineering an enterprise software foundation. Review the rubric carefully and aim for Grade O!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
