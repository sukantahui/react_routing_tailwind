import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Division Operator (÷) for 'For All' / Universal Queries
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Relational Division Explorer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive Division Simulator State
  const [activeSqlPattern, setActiveSqlPattern] = useState("groupby"); // "groupby" | "not_exists"

  // Divisor Set S: 3 Mandatory Core Courses
  const [coreCourses] = useState([
    { course_id: 201, title: "MySQL Masterclass" },
    { course_id: 202, title: "React Architect" },
    { course_id: 203, title: "Node & Express Backend" },
  ]);

  // Dividend Relation R: Student Enrollments
  const [students] = useState([
    {
      id: 101,
      name: "Mamata Hui",
      city: "Barrackpore",
      enrolledCourses: [201, 202, 203], // All 3 -> Qualifies!
    },
    {
      id: 102,
      name: "Mahima Sharma",
      city: "Kolkata",
      enrolledCourses: [201, 202], // Missing 203 -> Disqualified
    },
    {
      id: 103,
      name: "Abhronila Das",
      city: "Barrackpore",
      enrolledCourses: [201, 203], // Missing 202 -> Disqualified
    },
    {
      id: 104,
      name: "Susmita Ghosh",
      city: "Ichapur",
      enrolledCourses: [201], // Missing 202, 203 -> Disqualified
    },
    {
      id: 105,
      name: "Debangshu Roy",
      city: "Kolkata",
      enrolledCourses: [201, 202, 203, 301], // Has all 3 core + elective -> Qualifies!
    },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Relational Division Engine Active. Inspect how R ÷ S finds candidates who completed ALL mandatory items in S."
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Compute Division Result: Students with ALL core courses (201, 202, 203)
  const divisionWinners = students.filter((s) =>
    coreCourses.every((c) => s.enrolledCourses.includes(c.course_id))
  );

  const mathFormula = "π_{student_id, full_name}(Enrollments) ÷ π_{course_id}(Core_Courses)";
  const primitiveFormula = "π_A(R) − π_A((π_A(R) × S) − R)";

  const groupbySQL = `SELECT s.student_id, s.full_name\nFROM enrollments e\nJOIN students s ON e.student_id = s.student_id\nWHERE e.course_id IN (SELECT course_id FROM core_courses)\nGROUP BY s.student_id, s.full_name\nHAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`;

  const notExistsSQL = `SELECT s.student_id, s.full_name\nFROM students s\nWHERE NOT EXISTS (\n    SELECT c.course_id FROM core_courses c\n    WHERE NOT EXISTS (\n        SELECT 1 FROM enrollments e\n        WHERE e.student_id = s.student_id AND e.course_id = c.course_id\n    )\n);`;

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 10
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Division Operator (÷) for{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              'For All' / Universal Queries
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of universal quantification in relational algebra: Relational Division ($R \div S$),
            the canonical 4-step primitive derivation ($\pi, \times, -$), SQL `GROUP BY HAVING COUNT(DISTINCT)`, and the Double `NOT EXISTS` pattern.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Universal 'FOR ALL' Queries
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✖️ Inverse of Cartesian Product
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 4-Step Primitive Derivation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL: HAVING COUNT = Total
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Semantics & 4-Step Derivation ── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Relational Division (÷) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Universal quantifier semantics, degree reduction, and the 4-step primitive derivation
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Step 1: Candidates</span>
              <strong className="text-white text-xs block font-mono">T1 = π_A(R)</strong>
              <p className="text-[11px] text-slate-400">All distinct candidate entities (students).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 2: Expected Matrix</span>
              <strong className="text-white text-xs block font-mono">T2 = T1 × S</strong>
              <p className="text-[11px] text-slate-400">All required candidate-item combinations.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Step 3: Disqualifiers</span>
              <strong className="text-white text-xs block font-mono">T3 = T2 − R</strong>
              <p className="text-[11px] text-slate-400">Combinations that candidate failed to complete.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Step 4: Qualified</span>
              <strong className="text-white text-xs block font-mono">R ÷ S = T1 − π_A(T3)</strong>
              <p className="text-[11px] text-slate-400">Candidates with zero missing requirements.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Division Derivation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 4-Step Relational Division Pipeline ($R \div S$)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Relational Division Derivation Diagram"
            >
              {/* Step 1: Candidates */}
              <g transform="translate(20, 20)">
                <rect width="165" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="165" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="82" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. All Candidates (T1)</text>
                <text x="10" y="42" fill="#cbd5e1">π_student_id(R)</text>
                <text x="10" y="60" fill="#cbd5e1">Mamata, Mahima,</text>
                <text x="10" y="78" fill="#cbd5e1">Susmita, Debangshu</text>
              </g>

              {/* Step 2: Expected Matrix */}
              <g transform="translate(200, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="87" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">2. Expected Matrix (T2)</text>
                <text x="10" y="42" fill="#cbd5e1">T1 × Core_Courses</text>
                <text x="10" y="60" fill="#cbd5e1">5 Students × 3 Courses</text>
                <text x="10" y="78" fill="#f59e0b">= 15 Total Combos</text>
              </g>

              {/* Step 3: Disqualifiers */}
              <g transform="translate(390, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#f43f5e" />
                <text x="87" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold">3. Missing Pairs (T3)</text>
                <text x="10" y="42" fill="#f43f5e">T2 − Actual Enrollments</text>
                <text x="10" y="60" fill="#cbd5e1">Mahima missing Node</text>
                <text x="10" y="78" fill="#cbd5e1">Susmita missing React</text>
              </g>

              {/* Step 4: Output Winners */}
              <g transform="translate(580, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">4. R ÷ S (Winners)</text>
                <text x="10" y="42" fill="#10b981">T1 − π_student(T3)</text>
                <text x="10" y="60" fill="#10b981" fontWeight="bold">✓ Mamata Hui (3/3)</text>
                <text x="10" y="78" fill="#10b981" fontWeight="bold">✓ Debangshu Roy (3/3)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Relational Division Sandbox ─── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Universal Division Simulator (R ÷ S)
              </h2>
              <p className="text-xs text-slate-400">
                Inspect how candidates are evaluated against the required divisor set (Core Courses) using SQL GROUP BY HAVING vs Double NOT EXISTS
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Pattern Switchers */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveSqlPattern("groupby");
                  setEngineLog("✓ Evaluated SQL Pattern 1: GROUP BY s.id HAVING COUNT(DISTINCT course_id) = 3. High-performance hash aggregation method.");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeSqlPattern === "groupby"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. GROUP BY ... HAVING COUNT(DISTINCT) (High-Performance Industrial Standard)
              </button>

              <button
                onClick={() => {
                  setActiveSqlPattern("not_exists");
                  setEngineLog("✓ Evaluated SQL Pattern 2: Double NOT EXISTS. Direct logical translation of universal quantifier (∀x P(x) ≡ ¬∃x ¬P(x)).");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeSqlPattern === "not_exists"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Double NOT EXISTS (Theoretical First-Order Logic Translation)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Breakdown */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white block">
                      Required Divisor Set S ({coreCourses.length} Core Modules):
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                      {coreCourses.map((c) => (
                        <span key={c.course_id} className="px-2 py-0.5 rounded bg-slate-900 border border-teal-500/30 text-teal-300 font-mono">
                          #{c.course_id} {c.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {mathFormula}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Primitive 4-Step Expression:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-cyan-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {primitiveFormula}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">
                        {activeSqlPattern === "groupby" ? "SQL GROUP BY HAVING Syntax:" : "SQL Double NOT EXISTS Syntax:"}
                      </span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {activeSqlPattern === "groupby" ? groupbySQL : notExistsSQL}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Right: Candidate Roster & Universal Winners */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Candidate Evaluation Matrix ({students.length} students)</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      Winners: {divisionWinners.length} Students
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">Student</th>
                          <th className="p-1.5">Enrolled Modules</th>
                          <th className="p-1.5">Progress</th>
                          <th className="p-1.5">R ÷ S Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {students.map((s) => {
                          const completedCount = coreCourses.filter((c) =>
                            s.enrolledCourses.includes(c.course_id)
                          ).length;
                          const qualifies = completedCount === coreCourses.length;

                          return (
                            <tr key={s.id}>
                              <td className="p-1.5 text-white font-bold">{s.name}</td>
                              <td className="p-1.5 text-slate-400 text-[10px]">
                                {s.enrolledCourses.join(", ")}
                              </td>
                              <td className="p-1.5">
                                <span className={clsx("font-bold", qualifies ? "text-emerald-300" : "text-amber-400")}>
                                  {completedCount} / {coreCourses.length}
                                </span>
                              </td>
                              <td className="p-1.5">
                                <span
                                  className={clsx(
                                    "px-1.5 py-0.5 rounded text-[10px] font-bold border",
                                    qualifies
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                  )}
                                >
                                  {qualifies ? "✓ QUALIFIES" : "❌ INCOMPLETE"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Diploma completion certifications and all-branch banking audits from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Full-Stack Diploma Completers (ALL 3 Core Modules)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\\text{student_id, full_name}}(\\text{Enrollments}) \\div \\pi_{\\text{course_id}}(\\text{Core_Courses})$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.student_id, s.full_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
WHERE e.course_id IN (SELECT course_id FROM core_courses)
GROUP BY s.student_id, s.full_name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-Branch Bank Account Audit (All Kolkata Branches)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Banking</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\\text{customer_id, branch_id}}(\\text{Accounts}) \\div \\pi_{\\text{branch_id}}(\\sigma_{\\text{city} = 'Kolkata'}(\\text{Branches}))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT customer_id
FROM branch_accounts
WHERE branch_id IN (SELECT branch_id FROM branches WHERE city = 'Kolkata')
GROUP BY customer_id
HAVING COUNT(DISTINCT branch_id) = (SELECT COUNT(*) FROM branches WHERE city = 'Kolkata');`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Avoid missing DISTINCT in COUNT and understand when to use Double NOT EXISTS
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Forgetting DISTINCT in COUNT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>COUNT(e.course_id)</code> counts duplicate retakes, falsely qualifying students who took the same course twice!
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Division is Commutative:</strong>
                  <p className="text-slate-400 mt-0.5">
                    $R \div S$ is completely different from $S \div R$. In fact, $S \div R$ is undefined when Deg(S) &lt; Deg(R).
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Prefer GROUP BY ... HAVING COUNT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Single-pass hash aggregation runs in $O(N)$ and is dramatically faster than correlated nested subqueries.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Double NOT EXISTS for Correlated Sets:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use Double <code>NOT EXISTS</code> when the divisor set $S$ varies dynamically per student (e.g. departmental course sets).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Division Operator ($R \div S$) answers universal 'FOR ALL' / 'EVERY' queries</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree formula: `Degree(R ÷ S) = Degree(R) − Degree(S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Inverse of Cartesian product: `(R × S) ÷ S ≡ R`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Derived 4-step formula: `π_A(R) − π_A((π_A(R) × S) − R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>SQL standard: `HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*))`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Double `NOT EXISTS` translates first-order logic: `∀x P(x) ≡ ¬∃x ¬P(x)`</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Division Operator (÷) – FAQs"
            questions={questions}
            subtitle="Master relational division, universal quantification (FOR ALL), 4-step primitive derivation, SQL GROUP BY HAVING COUNT(DISTINCT), and Double NOT EXISTS with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Division Operator (÷) for 'For All' / Universal Queries"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_division_operator_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Relational Division ($\\div$) is the ultimate test of a database engineer's mastery! " +
              "In my classes in Barrackpore, whenever a student sees a problem statement with words like 'EVERY', 'ALL', or 'FOR ALL', " +
              "I tell them: 'Think Division immediately!' " +
              "Whether it is finding students who completed all 3 diploma modules or bank clients who have accounts in all Kolkata branches, " +
              "Division finds the universal achievers. " +
              "In SQL production, always use `GROUP BY s.id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses)`. " +
              "Never forget the `DISTINCT` keyword—otherwise a student who retook the first module twice will cheat the count! " +
              "Mastering $\\div$ gives you total mastery over universal quantification in both formal relational algebra and enterprise SQL."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · Division Operator (÷) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
