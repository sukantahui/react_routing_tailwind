import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic16_files/topic16_questions";
import noteText from "./topic16_files/topic16_note.txt?raw";

/**
 * Topic16 – Translating Relational Algebra Expressions into Equivalent SQL Queries
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive RA to SQL Rosetta Stone Translator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic16 = () => {
  const sectionRefs = useRef([]);

  // Interactive Translator State
  const [selectedPatternKey, setSelectedPatternKey] = useState("p1_join"); // "p1_join" | "p2_group" | "p3_semi" | "p4_divide"

  const patternLibrary = {
    p1_join: {
      title: "1. Multi-Table Join with Filter & Generalized Projection",
      category: "Multi-Table Join",
      raNotation: "π_{full_name, course_title, fee × 1.18 → total_fee}(σ_{city='Barrackpore' ∧ grade='A+'}(Students ⨝ Enrollments ⨝ Courses))",
      sqlQuery: `SELECT s.full_name, c.course_title, ROUND(c.fee * 1.18, 2) AS total_fee
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.city = 'Barrackpore' AND e.grade = 'A+';`,
      explanation: "Maps Leaf tables to FROM, Bowties to JOIN ON, Selection (σ) to WHERE, and Generalized Projection (π) to SELECT arithmetic expressions.",
      results: [
        { col1: "Mamata Hui", col2: "MySQL Masterclass", col3: "₹6,490.00" },
      ],
      colHeaders: ["Student Name", "Course Title", "Total Fee (18% GST)"],
    },
    p2_group: {
      title: "2. Grouping Operator with HAVING Threshold",
      category: "Aggregation & Grouping",
      raNotation: "σ_{total_students ≥ 2}({}_{city} 𝒢_{COUNT(*) → total_students, AVG(fee) → avg_fee}(σ_{fee > 4000}(Students)))",
      sqlQuery: `SELECT city, COUNT(*) AS total_students, ROUND(AVG(admission_fee), 2) AS avg_fee
FROM students
WHERE admission_fee > 4000
GROUP BY city
HAVING COUNT(*) >= 2;`,
      explanation: "Inner selection maps to WHERE, Grouping (𝒢) maps to GROUP BY, and outer Selection over 𝒢 maps directly to HAVING.",
      results: [
        { col1: "Barrackpore", col2: "2 Students", col3: "₹5,500.00" },
        { col1: "Kolkata", col2: "2 Students", col3: "₹4,500.00" },
      ],
      colHeaders: ["City", "Total Students (WHERE fee>4000)", "Average Fee"],
    },
    p3_semi: {
      title: "3. Semijoin (Existence Filter without Row Duplication)",
      category: "Existence Filtering",
      raNotation: "Students ⋉ Enrollments ≡ π_{Attrs(Students)}(Students ⨝ Enrollments)",
      sqlQuery: `SELECT s.*
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`,
      explanation: "Semijoin (⋉) maps directly to SQL WHERE EXISTS. Guarantees that Mamata appears exactly ONCE even though she has multiple enrollments.",
      results: [
        { col1: "#101 Mamata Hui", col2: "Barrackpore", col3: "₹5,500.00" },
        { col1: "#102 Mahima Sharma", col2: "Kolkata", col3: "₹4,800.00" },
        { col1: "#103 Abhronila Das", col2: "Barrackpore", col3: "₹3,800.00" },
      ],
      colHeaders: ["Enrolled Student", "City", "Admission Fee"],
    },
    p4_divide: {
      title: "4. Relational Division ('For All' Universal Completers)",
      category: "Universal Quantification",
      raNotation: "π_{student_id, full_name}(Enrollments) ÷ π_{course_id}(Core_Courses)",
      sqlQuery: `SELECT s.student_id, s.full_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
WHERE e.course_id IN (SELECT course_id FROM core_courses)
GROUP BY s.student_id, s.full_name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`,
      explanation: "Division (÷) translates to SQL GROUP BY ... HAVING COUNT(DISTINCT course_id) = total core courses count.",
      results: [
        { col1: "#101 Mamata Hui", col2: "Barrackpore", col3: "3 / 3 Core Modules Completed" },
        { col1: "#105 Debangshu Roy", col2: "Kolkata", col3: "3 / 3 Core Modules Completed" },
      ],
      colHeaders: ["Qualified Student", "City", "Curriculum Status"],
    },
  };

  const currentPattern = patternLibrary[selectedPatternKey];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 16
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Translating Relational Algebra into{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Equivalent SQL Queries
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the definitive bidirectional Rosetta Stone: translating mathematical Relational Algebra
            operators (σ, π, ρ, ⨝, ⟕, ⋉, ▷, ÷, 𝒢) into robust, production-grade SQL queries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📜 The Comprehensive Rosetta Stone
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ 5-Stage Translation Workflow
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Division to HAVING COUNT Translation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Set vs Multiset Deduplication
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Rosetta Stone Translation Matrix ──────── */}
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
                The Relational Algebra ➔ SQL Rosetta Stone
              </h2>
              <p className="text-xs text-slate-400">
                Direct mappings from formal mathematical operators to commercial SQL clauses
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Selection (σ_p)</span>
              <strong className="text-white text-xs block font-mono">WHERE predicate</strong>
              <p className="text-[11px] text-slate-400">Filters raw tuples based on boolean conditions.</p>
            </div>
            <div className="p-3 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Projection (π_L)</span>
              <strong className="text-white text-xs block font-mono">SELECT DISTINCT L</strong>
              <p className="text-[11px] text-slate-400">Extracts specified columns and eliminates duplicates.</p>
            </div>
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Theta Join (⨝_θ)</span>
              <strong className="text-white text-xs block font-mono">INNER JOIN ... ON θ</strong>
              <p className="text-[11px] text-slate-400">Combines relations on equality/inequality conditions.</p>
            </div>
            <div className="p-3 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Semijoin (⋉)</span>
              <strong className="text-white text-xs block font-mono">WHERE EXISTS (SELECT 1...)</strong>
              <p className="text-[11px] text-slate-400">Tests existence without duplicating outer rows.</p>
            </div>
            <div className="p-3 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Antijoin (▷)</span>
              <strong className="text-white text-xs block font-mono">WHERE NOT EXISTS (...)</strong>
              <p className="text-[11px] text-slate-400">Tests non-existence to identify orphaned records.</p>
            </div>
            <div className="p-3 rounded-xl border border-teal-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Division (÷)</span>
              <strong className="text-white text-xs block font-mono">HAVING COUNT = (Total)</strong>
              <p className="text-[11px] text-slate-400">Universal quantification matching all items in $S$.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 5-Stage Translation Workflow Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 5-Stage Relational Algebra to SQL Translation Pipeline
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="5-Stage Translation Pipeline"
            >
              {/* Stage 1: FROM */}
              <g transform="translate(15, 20)">
                <rect width="135" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="135" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="67" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Leaf Tables</text>
                <text x="10" y="42" fill="#cbd5e1">Base Relations</text>
                <text x="10" y="60" fill="#f59e0b">➔ SQL FROM</text>
                <text x="10" y="78" fill="#10b981">FROM students s</text>
              </g>

              {/* Stage 2: JOIN */}
              <g transform="translate(165, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="70" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Join Operators</text>
                <text x="10" y="42" fill="#cbd5e1">⨝, ⟕, ⟖, ⟗</text>
                <text x="10" y="60" fill="#f59e0b">➔ JOIN ... ON</text>
                <text x="10" y="78" fill="#10b981">JOIN enrollments</text>
              </g>

              {/* Stage 3: WHERE */}
              <g transform="translate(320, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="70" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">3. Selection (σ)</text>
                <text x="10" y="42" fill="#cbd5e1">Row Predicates</text>
                <text x="10" y="60" fill="#f59e0b">➔ SQL WHERE</text>
                <text x="10" y="78" fill="#10b981">WHERE city='...'</text>
              </g>

              {/* Stage 4: GROUP BY */}
              <g transform="translate(475, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="70" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">4. Grouping (𝒢)</text>
                <text x="10" y="42" fill="#cbd5e1">Aggregation Keys</text>
                <text x="10" y="60" fill="#f59e0b">➔ GROUP BY</text>
                <text x="10" y="78" fill="#10b981">HAVING count &ge; N</text>
              </g>

              {/* Stage 5: SELECT */}
              <g transform="translate(630, 20)">
                <rect width="135" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="135" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="67" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">5. Projection (π)</text>
                <text x="10" y="42" fill="#cbd5e1">Columns &amp; Exprs</text>
                <text x="10" y="60" fill="#f59e0b">➔ SQL SELECT</text>
                <text x="10" y="78" fill="#38bdf8">SELECT DISTINCT</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive RA to SQL Translator Sandbox ── */}
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
                Interactive Relational Algebra to SQL Translator
              </h2>
              <p className="text-xs text-slate-400">
                Select an algebraic query pattern to see its step-by-step SQL translation and evaluated output
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Pattern Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedPatternKey("p1_join")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedPatternKey === "p1_join"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Multi-Table Join
              </button>

              <button
                onClick={() => setSelectedPatternKey("p2_group")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedPatternKey === "p2_group"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Grouping &amp; HAVING
              </button>

              <button
                onClick={() => setSelectedPatternKey("p3_semi")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedPatternKey === "p3_semi"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Semijoin (EXISTS)
              </button>

              <button
                onClick={() => setSelectedPatternKey("p4_divide")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedPatternKey === "p4_divide"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Division (FOR ALL)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentPattern.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {currentPattern.category}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentPattern.raNotation}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Equivalent SQL Query Translation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentPattern.sqlQuery}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300">
                  <strong className="text-teal-400 block mb-1">Translation Rationale:</strong>
                  <p>{currentPattern.explanation}</p>
                </div>
              </div>

              {/* Right: Evaluated Output Relation */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Query Output</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentPattern.results.length} Tuples Returned
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          {currentPattern.colHeaders.map((hdr, idx) => (
                            <th key={idx} className="p-1.5">{hdr}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentPattern.results.map((row, idx) => (
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
                Academy fee calculations and universal graduation checks from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Fee with 18% GST Translation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\full_name, course_title, fee \\times 1.18 \\rightarrow \total}(\\sigma_{\city='Barrackpore'}(\Students \\bowtie \Enrollments \\bowtie \Courses))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, c.course_title, ROUND(c.fee * 1.18, 2) AS total_fee
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Universal Full-Stack Diploma Completers
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\student_id, full_name}(\Enrollments) \\div \Core_Courses$"}
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
                Avoid forgetting DISTINCT in projections and using NOT IN with nullable subqueries
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
                  <strong className="text-white">1. Forgetting DISTINCT for Set Semantics:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Relational Algebra $\pi$ removes duplicates; SQL <code>SELECT</code> requires <code>SELECT DISTINCT</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. NOT IN NULL Trap in Antijoins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Translating Antijoin using <code>NOT IN</code> fails if subquery has NULLs. Use <code>NOT EXISTS</code>.
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
                  <strong className="text-white">1. Follow 5-Stage Translation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Map FROM ➔ JOIN ➔ WHERE ➔ GROUP BY/HAVING ➔ SELECT in systematic order.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use EXPLAIN on Generated SQL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Run <code>EXPLAIN FORMAT=TREE</code> to verify that the query engine applies optimal pushdown heuristics.
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
              <span>Selection (σ) maps to SQL `WHERE` clause</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Projection (π) maps to SQL `SELECT` (or `SELECT DISTINCT`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Theta Join (⨝_θ) maps to `INNER JOIN ... ON`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Semijoin (⋉) maps to `WHERE EXISTS (SELECT 1 ...)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Antijoin (▷) maps to `WHERE NOT EXISTS` or Left Anti-Join</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Division (÷) maps to `GROUP BY ... HAVING COUNT(DISTINCT) = Total`</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="RA to SQL Translation – FAQs"
            questions={questions}
            subtitle="Master bidirectional Relational Algebra to SQL translation, Rosetta Stone operator mappings, 5-stage translation workflow, and avoiding SQL translation pitfalls with 30 comprehensive Q&As"
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
            title="Translating Relational Algebra Expressions into Equivalent SQL Queries"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic16_ra_to_sql_translation_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Translating Relational Algebra into SQL is like translating thoughts into speech! " +
              "In my classes in Barrackpore, I teach students the 5-Stage Translation Algorithm: " +
              "1) Base tables go into `FROM`, 2) Joins go into `JOIN ... ON`, 3) Row filters go into `WHERE`, " +
              "4) Aggregation goes into `GROUP BY` and `HAVING`, and 5) Columns go into `SELECT`. " +
              "When translating universal queries ($R \\div S$), immediately reach for `GROUP BY ... HAVING COUNT(DISTINCT)`. " +
              "And when translating set differences ($R - S$), use `WHERE NOT EXISTS` to stay completely immune to NULL bugs. " +
              "Mastering this translation rosetta stone connects formal database theory with high-performance industry SQL!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 16 · RA to SQL Translation · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic16;
