import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – CASE Statement: Simple CASE vs Searched CASE Expressions
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive SQL CASE Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive CASE Simulator State
  const [selectedCaseMode, setSelectedCaseMode] = useState("mode_searched_grading"); // "mode_searched_grading" | "mode_simple_mapping" | "mode_conditional_agg" | "mode_custom_sorting"

  const caseScenarios = {
    mode_searched_grading: {
      title: "1. Academic Grading & Merit Tiers (Searched CASE)",
      sqlQuery: `SELECT 
    student_name,
    marks_obtained,
    CASE 
        WHEN marks_obtained >= 90 THEN 'A+ (Distinction)'
        WHEN marks_obtained >= 80 THEN 'A (First Class - High)'
        WHEN marks_obtained >= 60 THEN 'B (First Class)'
        WHEN marks_obtained >= 40 THEN 'C (Pass)'
        WHEN marks_obtained IS NULL THEN 'Absent / Incomplete'
        ELSE 'F (Fail)'
    END AS performance_grade,
    CASE 
        WHEN marks_obtained >= 80 THEN 'Eligible for 50% Scholarship'
        WHEN marks_obtained >= 60 THEN 'Eligible for 25% Scholarship'
        ELSE 'Standard Tuition Fee'
    END AS scholarship_tier
FROM semester_evaluations;`,
      resultRows: [
        { name: "Mamata Hui", marks: "94 / 100", grade: "A+ (Distinction)", scholarship: "Eligible for 50% Scholarship", badgeColor: "emerald" },
        { name: "Susmita Sen", marks: "82 / 100", grade: "A (First Class - High)", scholarship: "Eligible for 50% Scholarship", badgeColor: "emerald" },
        { name: "Mahima Das", marks: "68 / 100", grade: "B (First Class)", scholarship: "Eligible for 25% Scholarship", badgeColor: "cyan" },
        { name: "Debangshu Roy", marks: "35 / 100", grade: "F (Fail)", scholarship: "Standard Tuition Fee", badgeColor: "rose" },
      ],
      verdictText: "✓ SEARCHED CASE EVALUATED",
      badgeColor: "emerald",
      explanation: "Searched CASE evaluates boolean expressions sequentially. Short-circuiting stops evaluation as soon as the first TRUE predicate is found.",
    },
    mode_simple_mapping: {
      title: "2. Discrete Code Expansion (Simple CASE)",
      sqlQuery: `SELECT 
    student_name,
    centre_code,
    CASE centre_code
        WHEN 'BKP' THEN 'Barrackpore Central Campus'
        WHEN 'KOL' THEN 'Kolkata Head Office'
        WHEN 'ICH' THEN 'Ichapur Learning Hub'
        WHEN 'JAD' THEN 'Jadavpur Tech Center'
        ELSE 'Regional Remote Partner'
    END AS expanded_centre_name
FROM academy_registrations;`,
      resultRows: [
        { name: "Mamata Hui", code: "BKP", expanded: "Barrackpore Central Campus", state: "West Bengal", badgeColor: "cyan" },
        { name: "Abhronila Saha", code: "KOL", expanded: "Kolkata Head Office", state: "West Bengal", badgeColor: "cyan" },
        { name: "Debangshu Roy", code: "ICH", expanded: "Ichapur Learning Hub", state: "West Bengal", badgeColor: "cyan" },
        { name: "Susmita Sen", code: "JAD", expanded: "Jadavpur Tech Center", state: "West Bengal", badgeColor: "cyan" },
      ],
      verdictText: "✓ EXACT EQUALITY DISPATCH",
      badgeColor: "cyan",
      explanation: "Simple CASE matches a base expression directly against discrete constants using '='. It is clean and concise for enum/code lookups.",
    },
    mode_conditional_agg: {
      title: "3. Conditional Aggregation Matrix (SUM(CASE ...))",
      sqlQuery: `-- Transposing rows into columns in a single query:
SELECT 
    centre_location,
    COUNT(*) AS total_students,
    SUM(CASE WHEN fee_status = 'PAID' THEN 1 ELSE 0 END) AS paid_students_count,
    SUM(CASE WHEN fee_status = 'PENDING' THEN 1 ELSE 0 END) AS pending_students_count,
    SUM(CASE WHEN fee_status = 'PAID' THEN fee_amount_inr ELSE 0 END) AS collected_revenue_inr
FROM admissions_data
GROUP BY centre_location;`,
      resultRows: [
        { name: "Barrackpore Centre", total: "140", paidCount: "120", pendingCount: "20", revenue: "₹6,00,000", badgeColor: "indigo" },
        { name: "Kolkata Centre", total: "220", paidCount: "195", pendingCount: "25", revenue: "₹9,75,000", badgeColor: "indigo" },
        { name: "Ichapur Centre", total: "85", paidCount: "70", pendingCount: "15", revenue: "₹3,50,000", badgeColor: "indigo" },
      ],
      verdictText: "✓ SINGLE QUERY PIVOT SUCCESS",
      badgeColor: "indigo",
      explanation: "Conditional aggregation wraps CASE inside SUM() to calculate breakdown counts and financial totals across categories without multiple queries.",
    },
    mode_custom_sorting: {
      title: "4. Custom Non-Alphabetical Sorting (ORDER BY CASE)",
      sqlQuery: `-- Ordering tasks by business severity rather than alphabetical order:
SELECT 
    ticket_id,
    student_name,
    issue_topic,
    priority_level
FROM technical_support_tickets
ORDER BY 
    CASE priority_level
        WHEN 'CRITICAL' THEN 1
        WHEN 'HIGH' THEN 2
        WHEN 'MEDIUM' THEN 3
        WHEN 'LOW' THEN 4
        ELSE 5
    END ASC,
    created_at DESC;`,
      resultRows: [
        { name: "TCK-104 (Debangshu)", issue: "Database Server Connection Timeout", priority: "CRITICAL (Rank 1)", badgeColor: "rose" },
        { name: "TCK-101 (Mamata)", issue: "React Router Navigation Error", priority: "HIGH (Rank 2)", badgeColor: "amber" },
        { name: "TCK-102 (Susmita)", issue: "SQL JOIN Result Duplication", priority: "MEDIUM (Rank 3)", badgeColor: "cyan" },
        { name: "TCK-103 (Mahima)", issue: "Font Sizing CSS Adjustment", priority: "LOW (Rank 4)", badgeColor: "emerald" },
      ],
      verdictText: "✓ BUSINESS HIERARCHY ORDERED",
      badgeColor: "amber",
      explanation: "Using CASE in the ORDER BY clause maps string labels to numerical ranks, allowing dynamic business sorting instead of default alphabetical order.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Core Theory & Architecture" },
    { id: "comparison-matrix", label: "2. Simple vs Searched CASE" },
    { id: "svg-diagram", label: "3. CASE Evaluation Pipeline SVG" },
    { id: "interactive-sandbox", label: "4. Interactive CASE Sandbox" },
    { id: "case-studies", label: "5. Production Industry Case Studies" },
    { id: "pitfalls-checklist", label: "6. Senior Pitfalls & Best Practices" },
    { id: "faq-section", label: "7. Q&A / FAQs (30 Questions)" },
    { id: "teacher-notes", label: "8. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 8 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              ANSI SQL Conditional Expressions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            CASE Statement: Simple vs Searched Expressions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the universal, ANSI-compliant{" "}
            <code className="text-cyan-300 font-mono font-bold">CASE</code> expression in MySQL for complex branching, multi-tier categorization, custom sort orders, and high-performance conditional aggregation matrices.
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
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Core Theory */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. SQL CASE Expressions: Foundational Theory & Execution Rules
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The CASE expression is ANSI SQL's universal conditional mechanism, valid in SELECT, WHERE, GROUP BY, HAVING, and ORDER BY clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  Simple CASE
                </span>
                <h3 className="text-lg font-semibold text-white">Discrete Constant Matching</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Compares a single expression against a list of literal values using exact equality (<code className="text-cyan-300">=</code>).
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-cyan-400">CASE</span> status_code</div>
                <div className="pl-4"><span className="text-cyan-400">WHEN</span> <span className="text-emerald-400">'A'</span> <span className="text-cyan-400">THEN</span> <span className="text-emerald-400">'Active'</span></div>
                <div className="pl-4"><span className="text-cyan-400">WHEN</span> <span className="text-emerald-400">'P'</span> <span className="text-cyan-400">THEN</span> <span className="text-emerald-400">'Pending'</span></div>
                <div className="pl-4"><span className="text-cyan-400">ELSE</span> <span className="text-rose-400">'Suspended'</span></div>
                <div><span className="text-cyan-400">END</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-sm font-bold border border-indigo-800">
                  Searched CASE
                </span>
                <h3 className="text-lg font-semibold text-white">Arbitrary Boolean Predicates</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Evaluates independent boolean conditions in order. Supports ranges, comparisons, complex AND/OR logic, and IS NULL checks.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-indigo-400">CASE</span></div>
                <div className="pl-4"><span className="text-indigo-400">WHEN</span> marks &gt;= 80 <span className="text-indigo-400">THEN</span> <span className="text-emerald-400">'A'</span></div>
                <div className="pl-4"><span className="text-indigo-400">WHEN</span> marks &gt;= 60 <span className="text-indigo-400">THEN</span> <span className="text-emerald-400">'B'</span></div>
                <div className="pl-4"><span className="text-indigo-400">WHEN</span> marks <span className="text-indigo-400">IS NULL THEN</span> <span className="text-amber-400">'Absent'</span></div>
                <div className="pl-4"><span className="text-indigo-400">ELSE</span> <span className="text-rose-400">'F'</span></div>
                <div><span className="text-indigo-400">END</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Simple CASE vs Searched CASE vs IF() Function
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing capabilities, condition flexibility, NULL handling, and ANSI standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Construct</th>
                  <th className="py-3.5 px-4">Evaluation Mode</th>
                  <th className="py-3.5 px-4">Supports Ranges / Inequalities?</th>
                  <th className="py-3.5 px-4">Supports IS NULL Tests?</th>
                  <th className="py-3.5 px-4">ANSI SQL Compliant?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">Simple CASE</td>
                  <td className="py-3 px-4">Exact Equality (<code className="text-cyan-300">base = val</code>)</td>
                  <td className="py-3 px-4 text-rose-400">No</td>
                  <td className="py-3 px-4 text-rose-400">No (Fails with '= NULL')</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (ANSI SQL-92)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-bold">Searched CASE</td>
                  <td className="py-3 px-4">Independent Boolean Predicates</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (&gt;, &lt;, BETWEEN)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (WHEN col IS NULL)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (ANSI SQL-92)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">IF() Function</td>
                  <td className="py-3 px-4">Single Ternary Condition</td>
                  <td className="py-3 px-4 text-emerald-400">Yes</td>
                  <td className="py-3 px-4 text-emerald-400">Yes</td>
                  <td className="py-3 px-4 text-rose-400">No (MySQL/MariaDB only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Flow & Evaluation Architecture */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. SQL CASE Evaluation & Short-Circuit Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how MySQL evaluates WHEN branches from top to bottom and terminates upon the first TRUE match.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradCaseCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradCaseIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowCase" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Main Title */}
              <text x="450" y="34" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MYSQL SEARCHED CASE SHORT-CIRCUIT EVALUATION PIPELINE
              </text>

              {/* Input Row */}
              <rect x="50" y="65" width="180" height="50" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="140" y="88" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">Input Row Data</text>
              <text x="140" y="104" fill="#38bdf8" fontSize="11" textAnchor="middle">marks_obtained = 84</text>

              {/* Arrow 1 */}
              <path d="M 230 90 L 290 90" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <polygon points="290,90 282,85 282,95" fill="#06b6d4" />

              {/* Step 1: WHEN 1 */}
              <rect x="290" y="65" width="220" height="50" rx="8" fill="#0f172a" stroke="#475569" />
              <text x="400" y="87" fill="#94a3b8" fontSize="11" textAnchor="middle">1. WHEN marks &gt;= 90 ?</text>
              <text x="400" y="103" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Evaluates to FALSE (84 &lt; 90)</text>

              {/* Arrow down to Step 2 */}
              <path d="M 400 115 L 400 155" fill="none" stroke="#f43f5e" strokeWidth="2" />
              <polygon points="400,155 395,147 405,147" fill="#f43f5e" />

              {/* Step 2: WHEN 2 (MATCH!) */}
              <rect x="290" y="155" width="220" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" filter="url(#shadowCase)" />
              <text x="400" y="177" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">2. WHEN marks &gt;= 80 ?</text>
              <text x="400" y="196" fill="#34d399" fontSize="12" fontWeight="extrabold" textAnchor="middle">TRUE! (84 &gt;= 80) &rarr; MATCH!</text>

              {/* Arrow to Result Output */}
              <path d="M 510 182 L 630 182" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="630,182 622,176 622,188" fill="#10b981" />

              {/* Final Output Result Box */}
              <rect x="630" y="150" width="230" height="65" rx="10" fill="url(#gradCaseIndigo)" stroke="#818cf8" strokeWidth="1.5" filter="url(#shadowCase)" />
              <text x="745" y="178" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">THEN 'Grade A (First Class)'</text>
              <text x="745" y="200" fill="#c7d2fe" fontSize="11" textAnchor="middle">Returned to Result Set</text>

              {/* Arrow down to skipped branches */}
              <path d="M 400 210 L 400 250" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Skipped Branches Box */}
              <rect x="290" y="250" width="220" height="100" rx="8" fill="#0f172a" stroke="#334155" strokeDasharray="3 3" opacity="0.6" />
              <text x="400" y="275" fill="#64748b" fontSize="10" textAnchor="middle">3. WHEN marks &gt;= 60 &rarr; (SKIPPED)</text>
              <text x="400" y="295" fill="#64748b" fontSize="10" textAnchor="middle">4. WHEN marks &gt;= 40 &rarr; (SKIPPED)</text>
              <text x="400" y="315" fill="#64748b" fontSize="10" textAnchor="middle">5. ELSE 'Fail' &rarr; (SKIPPED)</text>
              <text x="400" y="335" fill="#f59e0b" fontSize="9.5" fontWeight="bold" textAnchor="middle">-- Short-Circuit Terminated --</text>
            </svg>
          </div>
        </section>

        {/* SECTION 4: Interactive CASE Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive SQL CASE Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic expressions, continuous grading, code translation, and aggregation matrices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(caseScenarios).map((key) => {
                const item = caseScenarios[key];
                const isActive = selectedCaseMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCaseMode(key)}
                    className={clsx(
                      "p-3 rounded-xl text-left transition-all border text-xs sm:text-sm font-medium",
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="font-semibold">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Simulation View */}
            {(() => {
              const active = caseScenarios[selectedCaseMode];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{active.title}</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border",
                        active.badgeColor === "emerald" && "bg-emerald-950 text-emerald-300 border-emerald-700",
                        active.badgeColor === "cyan" && "bg-cyan-950 text-cyan-300 border-cyan-700",
                        active.badgeColor === "indigo" && "bg-indigo-950 text-indigo-300 border-indigo-700",
                        active.badgeColor === "amber" && "bg-amber-950 text-amber-300 border-amber-700",
                        active.badgeColor === "rose" && "bg-rose-950 text-rose-300 border-rose-700"
                      )}
                    >
                      {active.verdictText}
                    </span>
                  </div>

                  {/* SQL Preview */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                    <pre>{active.sqlQuery}</pre>
                  </div>

                  {/* Dynamic Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Entity / Student</th>
                          {selectedCaseMode === "mode_searched_grading" && (
                            <>
                              <th className="py-2.5 px-4">Score</th>
                              <th className="py-2.5 px-4 font-bold text-cyan-300">Grade Tier</th>
                              <th className="py-2.5 px-4 text-emerald-400">Scholarship Status</th>
                            </>
                          )}
                          {selectedCaseMode === "mode_simple_mapping" && (
                            <>
                              <th className="py-2.5 px-4">Centre Code</th>
                              <th className="py-2.5 px-4 font-bold text-cyan-300">Full Expanded Name</th>
                              <th className="py-2.5 px-4">State</th>
                            </>
                          )}
                          {selectedCaseMode === "mode_conditional_agg" && (
                            <>
                              <th className="py-2.5 px-4">Total Students</th>
                              <th className="py-2.5 px-4 text-emerald-400">Paid Enrollees</th>
                              <th className="py-2.5 px-4 text-amber-400">Pending Enrollees</th>
                              <th className="py-2.5 px-4 font-bold text-indigo-300">Collected Revenue</th>
                            </>
                          )}
                          {selectedCaseMode === "mode_custom_sorting" && (
                            <>
                              <th className="py-2.5 px-4">Issue Summary</th>
                              <th className="py-2.5 px-4 font-bold text-amber-300">Dispatch Priority</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.name}</td>
                            {selectedCaseMode === "mode_searched_grading" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300">{row.marks}</td>
                                <td className="py-2.5 px-4 font-bold text-cyan-300">{row.grade}</td>
                                <td className="py-2.5 px-4 text-emerald-300 font-sans">{row.scholarship}</td>
                              </>
                            )}
                            {selectedCaseMode === "mode_simple_mapping" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-400 font-bold">{row.code}</td>
                                <td className="py-2.5 px-4 font-bold text-cyan-300 font-sans">{row.expanded}</td>
                                <td className="py-2.5 px-4 text-slate-400 font-sans">{row.state}</td>
                              </>
                            )}
                            {selectedCaseMode === "mode_conditional_agg" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300">{row.total}</td>
                                <td className="py-2.5 px-4 text-emerald-400 font-bold">{row.paidCount}</td>
                                <td className="py-2.5 px-4 text-amber-400 font-bold">{row.pendingCount}</td>
                                <td className="py-2.5 px-4 font-bold text-indigo-300">{row.revenue}</td>
                              </>
                            )}
                            {selectedCaseMode === "mode_custom_sorting" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300 font-sans">{row.issue}</td>
                                <td className="py-2.5 px-4 font-bold text-amber-300">{row.priority}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Architectural Note */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-cyan-400">Engineering Insight: </span>
                    {active.explanation}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations using Simple CASE and Searched CASE expressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">Student Performance Tier & Scholarship Engine</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Evaluates semester exam marks, applies merit badges, and dynamically grants tiered tuition subsidies in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    student_name,
    final_score_pct,
    CASE 
        WHEN final_score_pct >= 90 THEN 'GOLD_DISTINCTION'
        WHEN final_score_pct >= 75 THEN 'SILVER_MERIT'
        WHEN final_score_pct >= 50 THEN 'BRONZE_PASS'
        ELSE 'REAPPEAR_REQUIRED'
    END AS academic_badge,
    base_tuition_fee_inr * (1 - CASE 
        WHEN final_score_pct >= 90 THEN 0.50 
        WHEN final_score_pct >= 75 THEN 0.25 
        ELSE 0.00 
    END) AS net_tuition_fee_inr
FROM student_records;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">E-Commerce Tiered Bulk Cart Discount Matrix</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Applies volume discounts dynamically based on total cart value in Indian Rupee (₹) and customer membership level.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    order_id,
    customer_tier,
    cart_total_inr,
    ROUND(cart_total_inr * (1 - CASE 
        WHEN customer_tier = 'VIP' AND cart_total_inr >= 10000 THEN 0.20
        WHEN customer_tier = 'VIP' OR cart_total_inr >= 5000 THEN 0.10
        WHEN cart_total_inr >= 2500 THEN 0.05
        ELSE 0.00
    END), 2) AS final_payable_amount_inr
FROM customer_orders;`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Ichapur Regional Office</span>
              </div>
              <h3 className="text-lg font-bold text-white">Regional Enrollment Pivot (Cross-Tab Reporting)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Pivots monthly course registrations across React, Java, and Python into distinct reporting columns in a single aggregation scan.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    centre_city,
    COUNT(*) AS total_enrolled,
    SUM(CASE WHEN course_stream = 'React' THEN 1 ELSE 0 END) AS react_count,
    SUM(CASE WHEN course_stream = 'Java' THEN 1 ELSE 0 END) AS java_count,
    SUM(CASE WHEN course_stream = 'Python' THEN 1 ELSE 0 END) AS python_count,
    SUM(CASE WHEN payment_mode = 'UPI' THEN fee_inr ELSE 0 END) AS upi_collections_inr
FROM admissions_master
GROUP BY centre_city;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Jadavpur Tech Center</span>
              </div>
              <h3 className="text-lg font-bold text-white">Technical Support SLA Priority Dispatcher</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Orders student technical support tickets by urgency classification rather than default alphabetical order using ORDER BY CASE.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    ticket_id,
    student_name,
    urgency_flag,
    created_at
FROM support_tickets
ORDER BY 
    CASE urgency_flag
        WHEN 'P1_CRITICAL' THEN 1
        WHEN 'P2_HIGH' THEN 2
        WHEN 'P3_NORMAL' THEN 3
        WHEN 'P4_LOW' THEN 4
        ELSE 5
    END ASC,
    created_at ASC;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pitfalls & Best Practices */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Prevent subtle SQL bugs, incorrect conditional counts, and slow unindexed scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Using COUNT(CASE ... ELSE 0 END):</strong>{" "}
                    <code className="text-rose-300">COUNT()</code> counts every non-null value, including <code className="text-rose-300">0</code>! Use <code className="text-emerald-300">SUM(CASE WHEN cond THEN 1 ELSE 0 END)</code> or <code className="text-emerald-300">COUNT(CASE WHEN cond THEN 1 END)</code> (which defaults to NULL).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Testing NULL in Simple CASE:</strong>{" "}
                    Writing <code className="text-rose-300">CASE col WHEN NULL THEN 'X' END</code> always fails because <code className="text-rose-300">col = NULL</code> yields UNKNOWN. Always use Searched CASE: <code className="text-emerald-300">WHEN col IS NULL</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Incorrect Condition Ordering:</strong>{" "}
                    Placing <code className="text-rose-300">WHEN marks &gt;= 40 THEN 'Pass'</code> before <code className="text-rose-300">WHEN marks &gt;= 80 THEN 'Distinction'</code> prevents the distinction branch from ever executing.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Wrapping indexed columns in WHERE CASE:</strong>{" "}
                    <code className="text-rose-300">WHERE CASE WHEN status = 'PAID' THEN 1 ELSE 0 END = 1</code> breaks index seeking. Write directly as <code className="text-emerald-300">WHERE status = 'PAID'</code>.
                  </div>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>✓ Production Best Practices Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Always specify an explicit ELSE:</strong> Prevent unexpected <code className="text-amber-300">NULL</code> outputs by defining a safe fallback default value.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Order conditions from specific to general:</strong> In Searched CASE, ensure narrow criteria are evaluated first.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Use CASE in ORDER BY for custom priorities:</strong> Map business statuses (Urgent, High, Low) to integers (1, 2, 3) for clean UI feeds.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Leverage conditional aggregation:</strong> Pivot multi-category counts and revenues in a single fast table scan with <code className="text-indigo-300">SUM(CASE ...)</code>.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your understanding of Simple vs Searched CASE, short-circuit execution, conditional aggregation, and performance tuning.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 8: SQL CASE Statement" />
          </div>
        </section>

        {/* SECTION 8: Teacher Note & Printable Text */}
        <section id="teacher-notes" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Teacher's Note & Raw Printable Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instructor summary by Sukanta Hui with printable raw text reference for classroom handouts and offline study.
            </p>
          </div>

          {/* Teacher Sukanta Hui Component */}
          <Teacher
            note={`Dear Students (Mamata, Susmita, Mahima, Abhronila, Debangshu),

The SQL CASE expression is one of your most valuable architectural tools. When writing enterprise SQL, remember:

1. Simple CASE (CASE col WHEN 'A' THEN ...) is for exact equality against discrete constants.
2. Searched CASE (CASE WHEN marks >= 80 THEN ...) is for ranges, inequalities, and IS NULL tests.
3. Order matters! MySQL evaluates sequentially and short-circuits on the first TRUE branch.
4. For report pivoting, SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) is the industry standard for transposing data into columns without stored procedures.

Master the interactive sandbox scenarios above and solve all 30 interview questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 8 – SQL CASE Expressions (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic8;
