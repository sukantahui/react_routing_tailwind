import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic17_files/topic17_questions";
import noteText from "./topic17_files/topic17_note.txt?raw";

/**
 * Topic17 – Introduction to Tuple Relational Calculus (TRC) - Safe Expressions and Quantifiers (∀, ∃)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive TRC Formula Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic17 = () => {
  const sectionRefs = useRef([]);

  // Interactive TRC State
  const [selectedTrcKey, setSelectedTrcKey] = useState("trc_filter"); // "trc_filter" | "trc_exists" | "trc_not_exists" | "trc_forall"

  const trcLibrary = {
    trc_filter: {
      title: "1. Basic Filter & Attribute Projection",
      category: "First-Order Logic Filter",
      formula: "{ t.full_name, t.city, t.admission_fee | t ∈ Students ∧ t.city = 'Barrackpore' }",
      freeVars: "t.full_name, t.city, t.admission_fee (Free variable t)",
      quantifiers: "None (Simple atomic predicate)",
      isSafe: true,
      safetyReason: "Safe: Variable t is explicitly bound to relation Students (t ∈ Students), bounding output strictly within DOM(P).",
      sqlEquivalent: "SELECT full_name, city, admission_fee FROM students WHERE city = 'Barrackpore';",
      results: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "₹5,500.00" },
        { col1: "Abhronila Das", col2: "Barrackpore", col3: "₹3,800.00" },
      ],
      colHeaders: ["Student Name", "City", "Admission Fee"],
    },
    trc_exists: {
      title: "2. Existential Quantifier (∃) - Enrolled Students",
      category: "Existential Quantification (∃)",
      formula: "{ s.full_name, s.city | s ∈ Students ∧ ∃e ∈ Enrollments (e.student_id = s.student_id) }",
      freeVars: "s.full_name, s.city (Free variable s)",
      quantifiers: "∃e ∈ Enrollments (Bound variable e)",
      isSafe: true,
      safetyReason: "Safe: s is bound to Students, and e is bound to Enrollments via existential quantification.",
      sqlEquivalent: `SELECT s.full_name, s.city
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`,
      results: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "Enrolled in 2 Courses" },
        { col1: "Mahima Sharma", col2: "Kolkata", col3: "Enrolled in 1 Course" },
        { col1: "Abhronila Das", col2: "Barrackpore", col3: "Enrolled in 2 Courses" },
      ],
      colHeaders: ["Student Name", "City", "Enrollment Status"],
    },
    trc_not_exists: {
      title: "3. Negated Existential (¬∃) - Unenrolled / Inactive Students",
      category: "Negation & Antijoin",
      formula: "{ s.full_name, s.city | s ∈ Students ∧ ¬∃e ∈ Enrollments (e.student_id = s.student_id) }",
      freeVars: "s.full_name, s.city (Free variable s)",
      quantifiers: "¬∃e ∈ Enrollments (Negated bound variable e)",
      isSafe: true,
      safetyReason: "Safe: The negation is range-restricted by the relation membership clause s ∈ Students.",
      sqlEquivalent: `SELECT s.full_name, s.city
FROM students s
WHERE NOT EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`,
      results: [
        { col1: "Susmita Ghosh", col2: "Ichapur", col3: "0 Active Enrollments" },
        { col1: "Debangshu Roy", col2: "Kolkata", col3: "0 Active Enrollments" },
      ],
      colHeaders: ["Inactive Student", "City", "Audit Status"],
    },
    trc_forall: {
      title: "4. Universal Quantifier (∀) - All Core Courses Completers",
      category: "Universal Quantification (∀)",
      formula: "{ s.full_name | s ∈ Students ∧ ∀c ∈ Core_Courses (∃e ∈ Enrollments (e.student_id = s.student_id ∧ e.course_id = c.course_id)) }",
      freeVars: "s.full_name (Free variable s)",
      quantifiers: "∀c ∈ Core_Courses, ∃e ∈ Enrollments",
      isSafe: true,
      safetyReason: "Safe: All variables s, c, e are strictly bounded to their respective base database relations.",
      sqlEquivalent: `SELECT s.full_name
FROM enrollments e JOIN students s ON e.student_id = s.student_id
WHERE e.course_id IN (SELECT course_id FROM core_courses)
GROUP BY s.student_id, s.full_name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`,
      results: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "Passed All 3 Core Modules (100%)" },
      ],
      colHeaders: ["Eligible Graduate", "Academy Branch", "Curriculum Progress"],
    },
  };

  const currentTrc = trcLibrary[selectedTrcKey];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 17
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Tuple Relational Calculus (TRC):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Safe Expressions &amp; Quantifiers (∀, ∃)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master declarative first-order logic querying in Tuple Relational Calculus (TRC):
            Mathematical syntax {"{ t | P(t) }"}, Existential (∃) and Universal (∀) quantifiers,
            Domain Boundedness (DOM(P)), and Safe vs Unsafe expression analysis.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📜 Syntax: {`{ t | P(t) }`}
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ∃ Existential Quantifier (WHERE EXISTS)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ∀ Universal Quantifier (FOR ALL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ DOM(P) Safety Analysis
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: TRC First-Order Logic Foundation ──────────── */}
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
                Tuple Relational Calculus Syntax &amp; Logic Atoms
              </h2>
              <p className="text-xs text-slate-400">
                Non-procedural declarative query specification based on first-order predicate logic
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Formula Syntax</span>
              <strong className="text-white text-xs block font-mono">{`{ t | P(t) }`}</strong>
              <p className="text-[11px] text-slate-400">Finds all tuples $t$ for which predicate $P(t)$ evaluates to TRUE.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Existential (∃)</span>
              <strong className="text-white text-xs block font-mono">{`∃u ∈ S (P(u))`}</strong>
              <p className="text-[11px] text-slate-400">Asserts at least ONE matching tuple $u$ exists in $S$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Universal (∀)</span>
              <strong className="text-white text-xs block font-mono">{`∀u ∈ S (P(u))`}</strong>
              <p className="text-[11px] text-slate-400">Asserts predicate holds FOR EVERY tuple $u$ in $S$.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: TRC Evaluation Pipeline Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: TRC First-Order Logic Evaluation Engine &amp; Safety Filter
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="TRC Logic Engine Diagram"
            >
              {/* Step 1: Free Variable */}
              <g transform="translate(15, 20)">
                <rect width="165" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="165" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="82" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Free Variable (t)</text>
                <text x="10" y="42" fill="#cbd5e1">{`{ t.name, t.city | ... }`}</text>
                <text x="10" y="60" fill="#f59e0b">t ∈ Students (Bound)</text>
                <text x="10" y="78" fill="#10b981">Output Schema Header</text>
              </g>

              {/* Step 2: Bound Variables & Logic */}
              <g transform="translate(200, 20)">
                <rect width="195" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="195" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="97" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Predicate Formula P(t)</text>
                <text x="10" y="42" fill="#cbd5e1">∃e ∈ Enrollments</text>
                <text x="10" y="60" fill="#10b981">(e.student_id = t.id)</text>
                <text x="10" y="78" fill="#cbd5e1">Evaluates TRUE / FALSE</text>
              </g>

              {/* Step 3: Safety Analysis DOM(P) */}
              <g transform="translate(415, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="87" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">3. DOM(P) Safety Check</text>
                <text x="10" y="42" fill="#818cf8">Finite Domain Bounded</text>
                <text x="10" y="60" fill="#10b981">✓ No Infinite Tuples</text>
                <text x="10" y="78" fill="#cbd5e1">Codd-Safe Expression</text>
              </g>

              {/* Step 4: Result Tuples */}
              <g transform="translate(610, 20)">
                <rect width="155" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="155" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="77" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">4. Result Relation</text>
                <text x="10" y="42" fill="#10b981">Mamata (Barrackpore)</text>
                <text x="10" y="60" fill="#38bdf8">Mahima (Kolkata)</text>
                <text x="10" y="78" fill="#10b981">Abhronila (Barrackpore)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive TRC Formula Simulator ───────── */}
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
                Interactive Tuple Relational Calculus Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Select a TRC query formula to inspect its free/bound variables, safety proof, and SQL execution
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* TRC Formula Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedTrcKey("trc_filter")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTrcKey === "trc_filter"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Filter &amp; Projection
              </button>

              <button
                onClick={() => setSelectedTrcKey("trc_exists")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTrcKey === "trc_exists"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Existential Join (∃)
              </button>

              <button
                onClick={() => setSelectedTrcKey("trc_not_exists")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTrcKey === "trc_not_exists"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Negation Antijoin (¬∃)
              </button>

              <button
                onClick={() => setSelectedTrcKey("trc_forall")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTrcKey === "trc_forall"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Universal 'For All' (∀)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & Logical Breakdown */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentTrc.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {currentTrc.category}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">TRC Mathematical Formula:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentTrc.formula}
                      </pre>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block uppercase font-bold">Free Variables:</span>
                        <span className="text-cyan-300 font-mono">{currentTrc.freeVars}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block uppercase font-bold">Quantified Scope:</span>
                        <span className="text-emerald-300 font-mono">{currentTrc.quantifiers}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-teal-400 block font-bold text-[11px] uppercase">Safety Analysis (DOM-Bounded):</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{currentTrc.safetyReason}</p>
                    </div>
                  </div>
                </div>

                {/* SQL Equivalent */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                  <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">
                    Equivalent Declarative SQL Translation:
                  </span>
                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {currentTrc.sqlEquivalent}
                  </pre>
                </div>
              </div>

              {/* Right: Evaluated Output Relation */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated TRC Result Set</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentTrc.results.length} Tuples Satisfying Formula
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          {currentTrc.colHeaders.map((hdr, idx) => (
                            <th key={idx} className="p-1.5">{hdr}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentTrc.results.map((row, idx) => (
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
                Academy attendance predicates and curriculum completers from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Existential Course Enrollment Check (TRC ∃)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"TRC: { s.full_name | s ∈ Students ∧ ∃e ∈ Enrollments (e.student_id = s.student_id) }"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Universal Full-Stack Certification (TRC ∀)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"TRC: { s.full_name | s ∈ Students ∧ ∀c ∈ Core_Courses (∃e ∈ Enrollments (e.sid = s.sid ∧ e.cid = c.cid)) }"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name
FROM enrollments e JOIN students s ON e.student_id = s.student_id
WHERE e.course_id IN (SELECT course_id FROM core_courses)
GROUP BY s.student_id, s.full_name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`}
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
                Avoid unsafe infinite expressions and improper quantifier negation
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
                  <strong className="text-white">1. Writing Unsafe Expressions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>{`{ t | ¬(t ∈ Students) }`}</code> returns infinite non-student entities across the universe.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Confusing Quantifier Scope:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Applying $\forall$ without binding to a finite relation creates non-evaluable infinite predicates.
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
                  <strong className="text-white">1. Explicit Variable Binding:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always start formulas with <code>t ∈ RelationName</code> to guarantee mathematical DOM-safety.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use De Morgan's Law for SQL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Transform $\forall u P(u)$ into $\neg \exists u \neg P(u)$ to map easily into SQL <code>NOT EXISTS</code> subqueries.
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
              <span>TRC is declarative / non-procedural: `{'{ t | P(t) }'}`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Free variables represent output columns; bound variables are quantified by ∃ or ∀</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Existential Quantifier (∃) maps to SQL `WHERE EXISTS`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Universal Quantifier (∀) expresses 'FOR ALL' division conditions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>De Morgan Duality: `∀u P(u) ≡ ¬∃u ¬P(u)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Safety requires all evaluated tuple components to belong to `DOM(P)`</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Tuple Relational Calculus (TRC) – FAQs"
            questions={questions}
            subtitle="Master Tuple Relational Calculus (TRC), First-Order Predicate Logic formulas, Existential (∃) and Universal (∀) quantifiers, DOM-safety bounds, and Codd's Equivalence with 30 comprehensive Q&As"
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
            title="Introduction to Tuple Relational Calculus (TRC) - Safe Expressions and Quantifiers (∀, ∃)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic17_trc_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Tuple Relational Calculus (TRC) is the theoretical heart of declarative query languages like SQL! " +
              "In my classes in Barrackpore, I remind students: while Relational Algebra tells the engine HOW to find data, " +
              "TRC tells the engine WHAT data you want using pure mathematical logic: $\\{ t \\mid P(t) \\}$. " +
              "Always pay close attention to Safety: an expression is only valid if every variable is strictly bounded " +
              "to a database relation ($t \\in \Students$). " +
              "And when dealing with 'For All' queries, remember De Morgan's Quantifier Duality: " +
              "$\\forall u P(u) \\equiv \\neg \\exists u \\neg P(u)$, which translates seamlessly into SQL's double `NOT EXISTS` pattern!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 17 · Tuple Relational Calculus · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic17;
