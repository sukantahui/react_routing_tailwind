import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic18_files/topic18_questions";
import noteText from "./topic18_files/topic18_note.txt?raw";

/**
 * Topic18 – Introduction to Domain Relational Calculus (DRC) & Codd's Reduction Theorem
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive DRC and QBE Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic18 = () => {
  const sectionRefs = useRef([]);

  // Interactive DRC State
  const [selectedDrcKey, setSelectedDrcKey] = useState("drc_filter"); // "drc_filter" | "drc_join" | "drc_qbe" | "drc_codd"

  const drcLibrary = {
    drc_filter: {
      title: "1. DRC Attribute Filter & Positional Projection",
      category: "Domain Variable Selection",
      formula: "{ ⟨n, f⟩ | ∃i (⟨i, n, 'Barrackpore', f⟩ ∈ Students ∧ f &gt; 4000) }",
      explanation: "Uses domain variables n (name) and f (fee). Variable i (id) is existentially quantified; city is constrained by constant 'Barrackpore'.",
      qbeGrid: `Students | student_id | full_name | city         | admission_fee |
         |            | P._N      | 'Barrackpore'| P._F > 4000   |`,
      sqlEquivalent: "SELECT full_name, admission_fee FROM students WHERE city = 'Barrackpore' AND admission_fee > 4000;",
      results: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "₹5,500.00" },
      ],
      colHeaders: ["Student Name (n)", "City ('Barrackpore')", "Admission Fee (f)"],
    },
    drc_join: {
      title: "2. DRC Equijoin via Shared Domain Variables",
      category: "Cross-Table Join (Shared Variables)",
      formula: "{ ⟨n, t⟩ | ∃s, ci, f, c, g, fe (⟨s, n, ci, f⟩ ∈ Students ∧ ⟨s, c, g⟩ ∈ Enrollments ∧ ⟨c, t, fe⟩ ∈ Courses) }",
      explanation: "Joins Students, Enrollments, and Courses by sharing domain variable 's' for student_id and 'c' for course_id across relation atoms.",
      qbeGrid: `Students    | student_id | full_name | city | admission_fee |
            | _S         | P._N      |      |               |
Enrollments | student_id | course_id | grade|
            | _S         | _C        |      |
Courses     | course_id  | title     | fee  |
            | _C         | P._T      |      |`,
      sqlEquivalent: `SELECT s.full_name, c.course_title
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;`,
      results: [
        { col1: "Mamata Hui", col2: "MySQL Masterclass", col3: "Grade A+" },
        { col1: "Mamata Hui", col2: "React Architect", col3: "Grade A" },
        { col1: "Mahima Sharma", col2: "React Architect", col3: "Grade A" },
      ],
      colHeaders: ["Student Name (n)", "Course Title (t)", "Academic Status"],
    },
    drc_qbe: {
      title: "3. IBM Query-By-Example (QBE) 2D Grid Translation",
      category: "Visual Relational Grid",
      formula: "{ ⟨n, ci⟩ | ∃i, f (⟨i, n, ci, f⟩ ∈ Students) }",
      explanation: "QBE places print commands 'P.' in desired output columns and example variables like '_N' and '_C' directly into table headers.",
      qbeGrid: `Students | student_id | full_name | city  | admission_fee |
         |            | P._NAME   | P._CITY|               |`,
      sqlEquivalent: "SELECT full_name, city FROM students;",
      results: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "Active" },
        { col1: "Mahima Sharma", col2: "Kolkata", col3: "Active" },
        { col1: "Abhronila Das", col2: "Barrackpore", col3: "Active" },
        { col1: "Susmita Ghosh", col2: "Ichapur", col3: "Active" },
      ],
      colHeaders: ["full_name (P._NAME)", "city (P._CITY)", "System Status"],
    },
    drc_codd: {
      title: "4. Codd's Equivalence Theorem Proof Check",
      category: "Relational Completeness",
      formula: "Relational Algebra ≡ Safe TRC ≡ Safe DRC (Relational Completeness Standard)",
      explanation: "Every query expressible in procedural Relational Algebra can be equivalently translated into declarative TRC and DRC with zero expressive loss.",
      qbeGrid: `[Mathematical Equivalence Bridge]
RA (Algebra) ➔ Procedural (Operators: σ, π, ⨝, ×, ∪, -)
TRC (Tuple)  ➔ Declarative (Tuple variables: t ∈ R)
DRC (Domain) ➔ Declarative (Domain variables: ⟨x, y⟩ ∈ R) ➔ Basis of QBE`,
      sqlEquivalent: "-- SQL implements the complete intersection of all 3 formal languages!",
      results: [
        { col1: "Relational Algebra (RA)", col2: "Procedural", col3: "100% Expressive Match" },
        { col1: "Tuple Calculus (TRC)", col2: "Declarative (Tuples)", col3: "100% Expressive Match" },
        { col1: "Domain Calculus (DRC)", col2: "Declarative (Domains)", col3: "100% Expressive Match" },
      ],
      colHeaders: ["Formal Query Model", "Paradigm", "Relational Completeness"],
    },
  };

  const currentDrc = drcLibrary[selectedDrcKey];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 18
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Domain Relational Calculus (DRC) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Codd's Reduction Theorem
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master domain variable calculus: Mathematical syntax $\{`{ \\langle x_1..x_n \\rangle \\mid P(x_1..x_n) }`}$,
            IBM Query-By-Example (QBE) visual table grids, Codd's Reduction Theorem ($RA \\equiv TRC \\equiv DRC$),
            and the formal definition of Relational Completeness.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Domain Variables: ⟨x1, ..., xn⟩
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Codd's Reduction: RA ≡ TRC ≡ DRC
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 IBM Query-By-Example (QBE)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏆 Relational Completeness Standard
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: DRC Syntax & Codd's Theorem Foundation ────── */}
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
                Domain Relational Calculus &amp; Codd's Equivalence Triangle
              </h2>
              <p className="text-xs text-slate-400">
                Individual attribute domain variables, QBE visual foundations, and Codd's completeness proof
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. DRC Syntax</span>
              <strong className="text-white text-xs block font-mono">{`{ ⟨x1..xn⟩ | P(x1..xn) }`}</strong>
              <p className="text-[11px] text-slate-400">Variables represent individual column values.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. QBE Foundation</span>
              <strong className="text-white text-xs block font-mono">2D Visual Query Tables</strong>
              <p className="text-[11px] text-slate-400">Moshé Zloof (IBM 1977) visual syntax using P. (Print).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Codd's Theorem</span>
              <strong className="text-white text-xs block font-mono">RA ≡ TRC_safe ≡ DRC_safe</strong>
              <p className="text-[11px] text-slate-400">All three formal languages share identical expressive power.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Codd's Reduction Equivalence Triangle ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Codd's Reduction Equivalence Triangle &amp; Relational Completeness
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Codd Equivalence Triangle"
            >
              {/* Top Node: Relational Algebra */}
              <g transform="translate(290, 10)">
                <rect width="200" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="18" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Relational Algebra (RA)</text>
                <text x="100" y="29" fill="#cbd5e1" fontSize="9" textAnchor="middle">Procedural Engine (σ, π, ⨝)</text>
              </g>

              {/* Bottom Left: TRC */}
              <g transform="translate(60, 95)">
                <rect width="210" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="105" y="18" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Tuple Calculus (TRC)</text>
                <text x="105" y="32" fill="#cbd5e1" fontSize="9" textAnchor="middle">Declarative: {`{ t | P(t) }`} ➔ SQL</text>
              </g>

              {/* Bottom Right: DRC */}
              <g transform="translate(510, 95)">
                <rect width="210" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="105" y="18" fill="#10b981" textAnchor="middle" fontWeight="bold">Domain Calculus (DRC)</text>
                <text x="105" y="32" fill="#cbd5e1" fontSize="9" textAnchor="middle">Declarative: {`{ ⟨x⟩ | P(x) }`} ➔ QBE</text>
              </g>

              {/* Center Banner: Relational Completeness */}
              <g transform="translate(270, 60)">
                <rect width="240" height="25" rx="4" fill="#0f172a" stroke="#818cf8" strokeDasharray="3 3" />
                <text x="120" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">
                  RELATIONAL COMPLETENESS
                </text>
              </g>

              {/* Equivalence Lines */}
              <line x1="290" y1="45" x2="200" y2="95" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="490" y1="45" x2="580" y2="95" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="270" y1="115" x2="510" y2="115" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive DRC & QBE Sandbox ───────────── */}
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
                Interactive Domain Calculus &amp; QBE Grid Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Inspect DRC positional domain formulas, IBM QBE 2D table grids, and equivalent SQL queries
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedDrcKey("drc_filter")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedDrcKey === "drc_filter"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Positional Filter
              </button>

              <button
                onClick={() => setSelectedDrcKey("drc_join")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedDrcKey === "drc_join"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Shared Variable Join
              </button>

              <button
                onClick={() => setSelectedDrcKey("drc_qbe")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedDrcKey === "drc_qbe"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. IBM QBE 2D Grid
              </button>

              <button
                onClick={() => setSelectedDrcKey("drc_codd")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedDrcKey === "drc_codd"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Codd's Equivalence
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical Formula & QBE Grid */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentDrc.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {currentDrc.category}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">DRC Mathematical Formula:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentDrc.formula}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">IBM Query-By-Example (QBE) 2D Grid:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-cyan-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentDrc.qbeGrid}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Equivalent SQL */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                  <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">
                    Equivalent SQL Query Translation:
                  </span>
                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {currentDrc.sqlEquivalent}
                  </pre>
                </div>
              </div>

              {/* Right: Evaluated Output Relation */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Query Output</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentDrc.results.length} Tuples Satisfied
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          {currentDrc.colHeaders.map((hdr, idx) => (
                            <th key={idx} className="p-1.5">{hdr}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentDrc.results.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-white font-bold">{row.col1}</td>
                            <td className="p-1.5 text-cyan-300">{row.col2}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">{row.col3}</td>
                          </tr>
                        ))}
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
                Positional domain filtering and multi-table joins from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore High-Fee DRC Filter
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"DRC: { ⟨n, f⟩ | ∃i (⟨i, n, 'Barrackpore', f⟩ ∈ Students ∧ f &gt; 4000) }"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT full_name, admission_fee
FROM students
WHERE city = 'Barrackpore' AND admission_fee &gt; 4000;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-Table Join via Shared Domain Variables
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"DRC: { ⟨n, t⟩ | ∃s, c, g (⟨s, n, _, _⟩ ∈ Students ∧ ⟨s, c, g⟩ ∈ Enrollments ∧ ⟨c, t, _⟩ ∈ Courses) }"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, c.course_title
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;`}
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
                Avoid positional schema misalignment and understand transitive closure limits
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
                  <strong className="text-white">1. Positional Column Misalignment:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing $\langle i, c, n, f \rangle$ when schema is $(id, name, city, fee)$ maps city values into name.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Transitive Closure Limits:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Pure RA, TRC, and DRC cannot express arbitrary-depth recursive hierarchies without <code>WITH RECURSIVE</code>.
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
                  <strong className="text-white">1. Use Shared Variable Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In DRC joins, reuse the exact same variable name in matching foreign key column slots.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Anonymous Don't-Care Variables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use underscore (_) for unused schema columns to keep DRC formulas clean and readable.
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
              <span>DRC uses domain variables for individual columns: `{'{ ⟨x1..xn⟩ | P }'}`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Variables are bound strictly by their positional index in the table schema</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DRC is the theoretical foundation of IBM Query-By-Example (QBE)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Codd's Reduction Theorem: `Relational Algebra ≡ Safe TRC ≡ Safe DRC`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Relational Completeness: Ability to express any safe relational algebra query</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Codd received the 1981 ACM Turing Award for his relational foundations</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="DRC & Codd's Theorem – FAQs"
            questions={questions}
            subtitle="Master Domain Relational Calculus (DRC), Query-By-Example (QBE) 2D grids, Codd's Reduction Theorem, and the formal standard of Relational Completeness with 30 comprehensive Q&As"
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
            title="Introduction to Domain Relational Calculus (DRC) & Codd's Reduction Theorem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic18_drc_codd_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Domain Relational Calculus (DRC) and Codd's Reduction Theorem complete the holy trinity of relational query languages! " +
              "In my classes in Barrackpore, I explain that while TRC works with entire row vectors ($t \\in R$), " +
              "DRC breaks rows down into individual domain variables: $\\{ \\langle x_1, x_2 \\rangle \\mid P(x_1, x_2) \\}$. " +
              "This domain-centric model directly inspired IBM's visual Query-By-Example (QBE), allowing non-programmers to query databases visually. " +
              "Most importantly, remember Codd's Theorem: Relational Algebra, Safe TRC, and Safe DRC all have the EXACT SAME expressive power! " +
              "Whether a query is written procedurally in Algebra or declaratively in Calculus, a modern RDBMS optimizer converts it into the exact same high-speed physical plan."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 18 · Domain Relational Calculus · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic18;
