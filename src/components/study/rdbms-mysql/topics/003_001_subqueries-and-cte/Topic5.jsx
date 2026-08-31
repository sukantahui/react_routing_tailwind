import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – EXISTS and NOT EXISTS Operators: Mechanics and Performance Benefits
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on EXISTS/NOT EXISTS operators, short-circuit evaluation, NULL-safe anti-joins, and relational division.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedExistsScenario, setSelectedExistsScenario] = useState("exists_fee_verified");

  const existsScenarios = {
    exists_fee_verified: {
      title: "1. EXISTS Presence Verification (Short-Circuit Seek)",
      badge: "EXISTS (Presence)",
      badgeColor: "emerald",
      sqlQuery: `-- Finding students who have made at least ONE verified fee payment:
-- As soon as the first matching payment is found, inner scan halts immediately!

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.email,
    'Fee Verified' AS payment_status
FROM students s
WHERE EXISTS (
    SELECT 1 
    FROM enrollments e
    JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
    WHERE e.student_id = s.student_id
)
ORDER BY s.student_id;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", flag: "Payment Found", evalScan: "Short-Circuit (1st Row Match)", status: "Active Verified" },
        { id: "STU-102", name: "Susmita Sen", detail: "Computer Science", flag: "Payment Found", evalScan: "Short-Circuit (1st Row Match)", status: "Active Verified" },
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", flag: "Payment Found", evalScan: "Short-Circuit (1st Row Match)", status: "Active Verified" },
      ],
      explanation:
        "`EXISTS` evaluates to TRUE as soon as the first matching payment record is found in the index, short-circuiting without scanning subsequent records.",
    },
    not_exists_anti_join: {
      title: "2. NOT EXISTS Safe Anti-Join (NULL-Immune)",
      badge: "NOT EXISTS (Anti-Join)",
      badgeColor: "rose",
      sqlQuery: `-- Finding newly admitted students who have ZERO fee payments recorded:
-- Completely immune to SQL three-valued logic NULL poisoning!

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.email,
    'Payment Pending' AS admission_status
FROM students s
WHERE NOT EXISTS (
    SELECT 1 
    FROM enrollments e
    JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
    WHERE e.student_id = s.student_id
);`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", detail: "Information Tech", flag: "0 Payments Found", evalScan: "Full Index Seek (0 Rows)", status: "Action Required" },
      ],
      explanation:
        "`NOT EXISTS` tests strictly whether zero rows exist in the subquery. Unlike `NOT IN`, it never returns `UNKNOWN` even if child records contain NULLs.",
    },
    exists_in_case_statement: {
      title: "3. EXISTS in CASE Expression (Dynamic Tagging)",
      badge: "CASE Expression",
      badgeColor: "cyan",
      sqlQuery: `-- Classifying student billing clearance status dynamically in the SELECT list:
-- Projects 'Paid' or 'Unpaid' without collapsing table granularity:

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM enrollments e
            JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
            WHERE e.student_id = s.student_id
        ) THEN 'Cleared (Active)'
        ELSE 'Pending Clearance'
    END AS financial_status
FROM students s
ORDER BY s.student_id;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", flag: "EXISTS = TRUE", evalScan: "Evaluated in CASE", status: "Cleared (Active)" },
        { id: "STU-104", name: "Debangshu Roy", detail: "Information Tech", flag: "EXISTS = FALSE", evalScan: "Evaluated in CASE", status: "Pending Clearance" },
      ],
      explanation:
        "`EXISTS` inside `CASE WHEN` allows dynamic conditional column tagging based on relational presence checks.",
    },
    relational_division_all_courses: {
      title: "4. Relational Division: Students Enrolled in ALL Core Courses",
      badge: "Relational Division",
      badgeColor: "amber",
      sqlQuery: `-- Finding students who have enrolled in ALL mandatory core courses:
-- Double-Nested NOT EXISTS: "Find students with NO core course they have NOT enrolled in"

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name
FROM students s
WHERE NOT EXISTS (
    SELECT c.course_id 
    FROM courses c 
    WHERE c.is_core = 1
      AND NOT EXISTS (
          SELECT 1 
          FROM enrollments e 
          WHERE e.student_id = s.student_id 
            AND e.course_id = c.course_id
      )
);`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", flag: "Enrolled in 100% Cores", evalScan: "Double NOT EXISTS Satisfied", status: "Full Scholar" },
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", flag: "Enrolled in 100% Cores", evalScan: "Double NOT EXISTS Satisfied", status: "Full Scholar" },
      ],
      explanation:
        "The classic SQL Relational Division pattern using double-negation to answer universal quantification questions ('Enrolled in ALL courses').",
    },
  };

  const navItems = [
    { id: "exists-concept", label: "1. EXISTS & NOT EXISTS Mechanics" },
    { id: "short-circuit", label: "2. Short-Circuit Performance" },
    { id: "svg-diagrams", label: "3. Short-Circuit & Division SVGs" },
    { id: "interactive-sandbox", label: "4. Live EXISTS Workbench" },
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
            <span>Module 003_001</span>
            <span>•</span>
            <span>Topic 5 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Existential Boolean Logic
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            EXISTS & NOT EXISTS: Mechanics & Performance
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master relational existential operators. Harness short-circuit index seeks, eliminate SQL NULL poisoning with <code className="text-cyan-300 font-mono">NOT EXISTS</code> anti-joins, and implement double-nested Relational Division.
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
        {/* SECTION 1: Concept */}
        <section id="exists-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What are EXISTS and NOT EXISTS?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Boolean operators testing the presence or absence of matching rows in a correlated subquery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🟢</span> EXISTS (Presence Check)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Returns TRUE if the subquery produces 1 or more rows. Halts immediately on the FIRST match (Short-Circuiting).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🔴</span> NOT EXISTS (Anti-Join)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Returns TRUE if the subquery returns exactly 0 rows. Completely immune to SQL three-valued logic NULL poisoning!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>⚡</span> The SELECT 1 Convention
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                MySQL ignores the projection list in EXISTS entirely. <code className="text-cyan-300 font-mono">SELECT 1</code>, <code className="text-cyan-300 font-mono">SELECT *</code>, and <code className="text-cyan-300 font-mono">SELECT 'X'</code> have identical performance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Short-Circuit */}
        <section id="short-circuit" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Short-Circuiting Performance Advantage
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why <code className="text-cyan-300 font-mono">EXISTS</code> is radically faster than <code className="text-cyan-300 font-mono">COUNT(*) &gt; 0</code>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-rose-400 font-bold block">❌ COUNT(*) &gt; 0 (Exhaustive Scan)</span>
                <p className="text-slate-400 leading-relaxed">
                  Scans ALL matching rows in the inner table to calculate the exact integer total, even if 10,000 matches exist.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-emerald-400 font-bold block">✅ EXISTS (Short-Circuit Evaluation)</span>
                <p className="text-slate-400 leading-relaxed">
                  Halts scanning the B-Tree index immediately after finding the FIRST matching row, returning TRUE instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Short-Circuit Execution & Relational Division
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing short-circuit evaluation against double-negation relational division.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Short Circuit Engine */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> EXISTS Short-Circuit Evaluation vs Exhaustive COUNT
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* EXISTS Short Circuit */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ EXISTS (Short-Circuit Seek)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Finds Row #1 → HALTS SCAN IMMEDIATELY!</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Returns TRUE in 0.05ms (1 Index Read)</text>
                  </g>

                  {/* COUNT > 0 */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">❌ COUNT(*) &gt; 0 (Exhaustive Scan)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Scans Row 1, Row 2 ... Row 10,000</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Computes Count = 10,000 (Wastes CPU &amp; I/O)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Relational Division */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Double-Nested NOT EXISTS Relational Division Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. All Core Courses</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Set of Core Courses: [ A, B, C ]</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Target Curriculum</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="310" y="30" width="260" height="100" rx="8" fill="#450a0a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="440" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. Un-Enrolled Cores Check</text>
                    <rect x="325" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="440" y="88" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">NOT EXISTS (Student enrolled in Course)</text>
                    <text x="440" y="102" fill="#fcd34d" fontSize="7 font-mono" textAnchor="middle">Finds Missing Courses</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="610" y="30" width="210" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="715" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Outer NOT EXISTS</text>
                    <rect x="625" y="70" width="180" height="40" rx="4" fill="#022c22" />
                    <text x="715" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Zero Missing Courses =</text>
                    <text x="715" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Enrolled in 100% Cores!</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 570 80 L 610 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive EXISTS & NOT EXISTS Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test short-circuit presence verification, NULL-safe anti-joins, CASE expression tagging, and double-nested relational division live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(existsScenarios).map(([key, item]) => {
              const isActive = selectedExistsScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExistsScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{existsScenarios[selectedExistsScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{existsScenarios[selectedExistsScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Existential Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Short-Circuit Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {existsScenarios[selectedExistsScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Student ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Department</th>
                    <th className="py-3 px-4 text-cyan-400">Existential Result</th>
                    <th className="py-3 px-4 text-indigo-400">Scan Evaluation Mechanics</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {existsScenarios[selectedExistsScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.detail}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.flag}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.evalScan}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
                        </span>
                      </td>
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
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world presence checks and relational division audits.
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
                  Replacing COUNT(*) &gt; 0 with EXISTS in Academy Access Gateways
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Kolkata Campus Auth Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited student login latency: The student authentication gateway verified course enrollment with <code className="text-rose-300 font-mono">WHERE (SELECT COUNT(*) FROM enrollments ...) &gt; 0</code>. On active students with dozens of courses, replacing this with <code className="text-emerald-300 font-mono">WHERE EXISTS (SELECT 1 FROM enrollments ...)</code> eliminated index scanning past row #1, reducing authorization latency from 45ms to 0.4ms!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Slow: Scans all matching enrollment rows to count:
SELECT * FROM students s WHERE (SELECT COUNT(*) FROM enrollments e WHERE e.student_id = s.student_id) > 0;

-- ✅ Fast: Halts immediately upon finding the first matching enrollment row:
SELECT * FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id);`}
              </pre>
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
              Avoid unnecessary sorting and grouping inside EXISTS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> ORDER BY / GROUP BY inside EXISTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE EXISTS (SELECT 1 ... ORDER BY date DESC)</code> wastes CPU cycles because EXISTS only checks for ANY row presence!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Omit all ORDER BY and GROUP BY clauses inside EXISTS blocks.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Use NOT EXISTS for Anti-Joins
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                <code className="text-emerald-400 font-mono">NOT EXISTS</code> is mathematically immune to SQL three-valued logic NULL poisoning, unlike <code className="text-rose-300 font-mono">NOT IN</code>.
              </p>
              <div className="text-xs text-slate-400">
                The gold standard for production anti-join queries.
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
              Key takeaways for EXISTS and NOT EXISTS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Existential Query Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">EXISTS</code> for short-circuit presence verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SELECT 1</code> inside <code className="text-cyan-300 font-mono">EXISTS</code> as standard clean convention.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Replace <code className="text-rose-300 font-mono">COUNT(*) &gt; 0</code> with <code className="text-cyan-300 font-mono">EXISTS</code> for instant seeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use double-nested <code className="text-cyan-300 font-mono">NOT EXISTS</code> for Relational Division (Universal ALL).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe FirstMatch in EXPLAIN...”</span>
                  MySQL transforms <code className="text-cyan-300 font-mono">EXISTS</code> subqueries into FirstMatch semi-joins, jumping directly to the next outer row upon finding a match!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index coverage on correlation keys...”</span>
                  Ensure the inner table has an index on the join key (<code className="text-cyan-300 font-mono">e.student_id</code>) so the engine can short-circuit in logarithmic time!
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
              Comprehensive reference questions covering EXISTS, NOT EXISTS, short-circuit evaluation, NULL-safe anti-joins, and relational division.
            </p>
          </div>

          <FAQTemplate
            title="EXISTS and NOT EXISTS FAQs"
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
            title="EXISTS and NOT EXISTS Operators: Mechanics and Performance Benefits"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Whenever you find yourself writing 'WHERE (SELECT COUNT(*) ...) > 0', STOP and replace it with 'WHERE EXISTS (SELECT 1 ...)'. EXISTS is built for short-circuiting: why count thousands of matching rows when finding just ONE proves existence? And for anti-joins, NOT EXISTS is your best defense against the silent NULL poisoning trap of NOT IN."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
