import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic19_files/topic19_questions";
import noteText from "./topic19_files/topic19_note.txt?raw";

/**
 * Topic19 – Complex Relational Algebra Worked Examples & Step-by-Step Exercise Solutions
 * Module: 002_003_relational-algebra-and-calculus (Module Capstone)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Capstone Relational Algebra Solver,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic19 = () => {
  const sectionRefs = useRef([]);

  // Interactive Capstone Solver State
  const [selectedExKey, setSelectedExKey] = useState("ex1_gst"); // "ex1_gst" | "ex2_antijoin" | "ex3_division" | "ex4_grouping" | "ex5_fullouter"

  const exerciseLibrary = {
    ex1_gst: {
      title: "Exercise 1: High-Value Student Roster with GST Calculation",
      category: "Extended Relational Algebra (π_F)",
      problem: "Find the full name, admission fee, and calculated total fee with 18% GST for all students from Barrackpore who paid > ₹4000.",
      raSolution: "π_{full_name, admission_fee, admission_fee × 1.18 → fee_with_gst}(σ_{city='Barrackpore' ∧ admission_fee > 4000}(Students))",
      sqlSolution: `SELECT full_name, admission_fee, ROUND(admission_fee * 1.18, 2) AS fee_with_gst
FROM students
WHERE city = 'Barrackpore' AND admission_fee > 4000;`,
      derivationSteps: [
        "1. Leaf Table Scan: Read Students(student_id, full_name, city, admission_fee).",
        "2. Selection Pushdown: Apply σ_{city='Barrackpore' ∧ admission_fee > 4000} to retain only high-value local students.",
        "3. Generalized Projection: Evaluate admission_fee × 1.18 and assign alias fee_with_gst.",
      ],
      results: [
        { col1: "Mamata Hui", col2: "₹5,500.00", col3: "₹6,490.00 (Incl. 18% GST)" },
      ],
      colHeaders: ["Student Name", "Base Fee", "Calculated Gross Fee"],
    },
    ex2_antijoin: {
      title: "Exercise 2: Left Anti-Join for Unenrolled / Inactive Students",
      category: "Antijoin (▷) & Set Difference",
      problem: "Identify all registered students who have NEVER enrolled in any academic course.",
      raSolution: "Students ▷ Enrollments ≡ Students - (Students ⋉ Enrollments)",
      sqlSolution: `SELECT s.student_id, s.full_name, s.city
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;`,
      derivationSteps: [
        "1. Semijoin (Students ⋉ Enrollments): Finds all students with at least 1 enrollment (Mamata, Mahima, Abhronila).",
        "2. Set Difference (Students - Enrolled): Subtracts enrolled students from total roster.",
        "3. Result: Emits only the dangling orphaned student records (Susmita, Debangshu).",
      ],
      results: [
        { col1: "#104 Susmita Ghosh", col2: "Ichapur", col3: "0 Enrolled Courses (Dangling)" },
        { col1: "#105 Debangshu Roy", col2: "Kolkata", col3: "0 Enrolled Courses (Dangling)" },
      ],
      colHeaders: ["Inactive Student", "City", "Academic Status"],
    },
    ex3_division: {
      title: "Exercise 3: Relational Division for Universal Core Completers",
      category: "Division (÷) & Universal Quantification",
      problem: "Find all students who have enrolled in ALL mandatory core diploma courses.",
      raSolution: "π_{student_id, full_name}(Enrollments) ÷ Core_Courses",
      sqlSolution: `SELECT s.student_id, s.full_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
WHERE e.course_id IN (SELECT course_id FROM core_courses)
GROUP BY s.student_id, s.full_name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`,
      derivationSteps: [
        "1. Projection Reduction: Project π_{student_id, course_id}(Enrollments) to drop grade/date.",
        "2. Cross Product Formulation: π_X(R) × Core_Courses (all potential student-course pairs).",
        "3. Disqualification Difference: (Potential pairs) - (Actual Enrollments).",
        "4. Codd Division: Total students minus disqualified students yields universal completers.",
      ],
      results: [
        { col1: "#101 Mamata Hui", col2: "Barrackpore", col3: "3 / 3 Core Courses (100% Complete)" },
      ],
      colHeaders: ["Graduate Student", "Branch", "Curriculum Progress"],
    },
    ex4_grouping: {
      title: "Exercise 4: City-Wise Revenue Breakdown with HAVING Threshold",
      category: "Grouping Operator (𝒢) & Aggregates",
      problem: "Compute total student count, revenue, and average fee for cities with at least 2 students and average fee >= ₹4500.",
      raSolution: "σ_{cnt ≥ 2 ∧ avg ≥ 4500}({}_{city} 𝒢_{COUNT(*) → cnt, SUM(fee) → total, AVG(fee) → avg}(Students))",
      sqlSolution: `SELECT city, COUNT(*) AS student_count, SUM(admission_fee) AS total_revenue, ROUND(AVG(admission_fee), 2) AS avg_fee
FROM students
GROUP BY city
HAVING COUNT(*) >= 2 AND AVG(admission_fee) >= 4500;`,
      derivationSteps: [
        "1. Partitioning: Group students into city buckets ({}_{city} 𝒢).",
        "2. Kernel Aggregation: Evaluate COUNT(*), SUM(fee), AVG(fee) per bucket.",
        "3. Selection over 𝒢 (HAVING): Discard cities failing the cnt ≥ 2 and avg ≥ 4500 predicates.",
      ],
      results: [
        { col1: "Barrackpore", col2: "2 Students (Total: ₹9,300)", col3: "₹4,650.00" },
        { col1: "Kolkata", col2: "2 Students (Total: ₹9,000)", col3: "₹4,500.00" },
      ],
      colHeaders: ["Qualified City", "Enrollment & Revenue", "Average Admission Fee"],
    },
    ex5_fullouter: {
      title: "Exercise 5: 360° Academic Audit (Full Outer Join Emulation)",
      category: "Full Outer Join (⟗) & UNION",
      problem: "Produce a complete audit roster containing all students and all courses, showing NULL for unmatched pairs.",
      raSolution: "Students ⟗ Courses ≡ (Students ⟕ Courses) ∪ (Students ⟖ Courses)",
      sqlSolution: `SELECT s.student_id, s.full_name, c.course_id, c.course_title
FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN courses c ON e.course_id = c.course_id
UNION
SELECT s.student_id, s.full_name, c.course_id, c.course_title
FROM students s RIGHT JOIN enrollments e ON s.student_id = e.student_id RIGHT JOIN courses c ON e.course_id = c.course_id;`,
      derivationSteps: [
        "1. Left Outer Join: Preserves all students (including Susmita and Debangshu with NULL courses).",
        "2. Right Outer Join: Preserves all courses (including Cloud DevOps with NULL students).",
        "3. Set Union: Combines both sets while automatically removing duplicate inner matches.",
      ],
      results: [
        { col1: "#101 Mamata Hui", col2: "MySQL Masterclass", col3: "Matched" },
        { col1: "#104 Susmita Ghosh", col2: "NULL (Unenrolled)", col3: "Left Preserved" },
        { col1: "NULL (0 Enrolled)", col2: "Cloud DevOps (New)", col3: "Right Preserved" },
      ],
      colHeaders: ["Student Roster", "Course Catalog", "Join Status"],
    },
  };

  const currentEx = exerciseLibrary[selectedExKey];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 19 (Capstone)
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Complex Relational Algebra Worked Examples &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Step-by-Step Exercise Solutions
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Module 002_003 Capstone Workbench: Complete synthesis of primitive operators, derivative joins,
            universal relational division, generalized projections, grouping metrics, and safe relational calculus proofs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏆 Module Capstone Workbench
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 5 Comprehensive Worked Scenarios
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Step-by-Step Mathematical Derivations
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Production SQL Implementations
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Grand Unified Operator Hierarchy ─────────── */}
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
                Grand Unified Relational Operator Hierarchy
              </h2>
              <p className="text-xs text-slate-400">
                The complete lineage from 5 primitive operators to high-performance SQL execution
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Primitive Core</span>
              <strong className="text-white text-xs block font-mono">σ, π, ρ, ∪, -, ×</strong>
              <p className="text-[11px] text-slate-400">Fundamental foundation of relational algebra.</p>
            </div>
            <div className="p-3 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Derived Joins</span>
              <strong className="text-white text-xs block font-mono">⨝_θ, ⨝, ⟕, ⟖, ⟗, ⋉, ▷, ÷</strong>
              <p className="text-[11px] text-slate-400">Composed joins, existence checks &amp; division.</p>
            </div>
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Extended Analytics</span>
              <strong className="text-white text-xs block font-mono">π_F, _{`{G}`} 𝒢_{`{F(A)}`}</strong>
              <p className="text-[11px] text-slate-400">Generalized arithmetic and statistical grouping.</p>
            </div>
            <div className="p-3 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">4. Calculus &amp; Optimization</span>
              <strong className="text-white text-xs block font-mono">TRC, DRC, Pushdowns</strong>
              <p className="text-[11px] text-slate-400">Codd's Reduction &amp; Query Tree Optimizers.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Grand Unified Operator Hierarchy Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Complete Relational Engine Synthesis Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Grand Unified Operator Diagram"
            >
              {/* Box 1: Primitives */}
              <g transform="translate(15, 20)">
                <rect width="165" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="165" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="82" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Primitives (5 Core)</text>
                <text x="10" y="42" fill="#cbd5e1">Selection (σ), Projection (π)</text>
                <text x="10" y="60" fill="#f59e0b">Rename (ρ), Union (∪)</text>
                <text x="10" y="78" fill="#10b981">Set Difference (-), Cross (×)</text>
              </g>

              {/* Box 2: Derivatives */}
              <g transform="translate(200, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="90" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Derived Joins &amp; Sets</text>
                <text x="10" y="42" fill="#cbd5e1">Theta (⨝_θ) &amp; Natural (⨝)</text>
                <text x="10" y="60" fill="#10b981">Outer (⟕, ⟖, ⟗) &amp; Semi (⋉, ▷)</text>
                <text x="10" y="78" fill="#cbd5e1">Relational Division (÷)</text>
              </g>

              {/* Box 3: Extended */}
              <g transform="translate(400, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="87" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">3. Extended &amp; Grouping</text>
                <text x="10" y="42" fill="#cbd5e1">Generalized Proj (π_F)</text>
                <text x="10" y="60" fill="#10b981">Grouping Operator (𝒢)</text>
                <text x="10" y="78" fill="#cbd5e1">COUNT, SUM, AVG, MIN, MAX</text>
              </g>

              {/* Box 4: Calculus & SQL */}
              <g transform="translate(595, 20)">
                <rect width="170" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="85" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">4. Calculus &amp; SQL Plan</text>
                <text x="10" y="42" fill="#818cf8">TRC: {`{ t | P(t) }`}</text>
                <text x="10" y="60" fill="#10b981">DRC: {`{ ⟨x⟩ | P(x) }`}</text>
                <text x="10" y="78" fill="#38bdf8">Codd-Complete SQL Engine</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Capstone Solver Workbench ───── */}
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
                Interactive Capstone Exercise Solver
              </h2>
              <p className="text-xs text-slate-400">
                Select an enterprise query challenge to inspect its formal algebraic solution, derivation, and SQL execution
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Exercise Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setSelectedExKey("ex1_gst")}
                className={clsx(
                  "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedExKey === "ex1_gst"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. GST Calc (π_F)
              </button>

              <button
                onClick={() => setSelectedExKey("ex2_antijoin")}
                className={clsx(
                  "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedExKey === "ex2_antijoin"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Antijoin (▷)
              </button>

              <button
                onClick={() => setSelectedExKey("ex3_division")}
                className={clsx(
                  "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedExKey === "ex3_division"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Division (÷)
              </button>

              <button
                onClick={() => setSelectedExKey("ex4_grouping")}
                className={clsx(
                  "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedExKey === "ex4_grouping"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Grouping (𝒢)
              </button>

              <button
                onClick={() => setSelectedExKey("ex5_fullouter")}
                className={clsx(
                  "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedExKey === "ex5_fullouter"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                5. Full Outer (⟗)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Problem & Derivations */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentEx.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {currentEx.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic">"{currentEx.problem}"</p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Solution:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentEx.raSolution}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Equivalent Production SQL:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentEx.sqlSolution}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Derivation */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs space-y-1.5">
                  <span className="text-teal-400 font-bold block uppercase text-[10px]">
                    Step-by-Step Mathematical Derivation:
                  </span>
                  {currentEx.derivationSteps.map((step, idx) => (
                    <p key={idx} className="text-slate-300">{step}</p>
                  ))}
                </div>
              </div>

              {/* Right: Evaluated Output Relation */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Query Output</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentEx.results.length} Tuples Emitted
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          {currentEx.colHeaders.map((hdr, idx) => (
                            <th key={idx} className="p-1.5">{hdr}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentEx.results.map((row, idx) => (
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

        {/* ─── SECTION 3: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Capstone Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Critical design rules to guarantee deterministic, high-speed relational query execution
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Capstone Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Premature Join Key Projection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Dropping join keys before ancestor joins are evaluated breaks the query pipeline.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting DISTINCT in Division:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>COUNT(course_id)</code> instead of <code>COUNT(DISTINCT course_id)</code> miscounts duplicate enrollments.
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
                  <strong className="text-white">1. Push Selections to Leaves:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Filter out 90%+ of non-matching records immediately above base table scan nodes.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use EXPLAIN FORMAT=TREE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always inspect MySQL execution trees to ensure joins are indexed and memory-efficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Module Summary Checklist ───────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Module 002_003 Master Checklist (Everything You Have Mastered)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>5 Primitive Operators: Selection (σ), Projection (π), Rename (ρ), Union (∪), Difference (-)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Composite Joins: Theta Join (⨝_θ), Equijoin, Natural Join (⨝), Cartesian Product (×)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Existence Filters: Semijoin (⋉) and Antijoin (▷) for existence / non-existence</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Universal Quantification: Relational Division (÷) for 'For All' requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Extended Relational Algebra: Generalized Projection (π_F) and Grouping Operator (𝒢)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Outer Joins: Left Outer (⟕), Right Outer (⟖), and Full Outer (⟗) MySQL UNION emulation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Query Tree Heuristic Optimization: Selection and Projection pushdowns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Declarative Calculus: Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Codd's Reduction Theorem: Proven mathematical equivalence ($RA \equiv TRC \equiv DRC$)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Translating any formal mathematical expression directly into production SQL queries</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="RA &amp; Calculus Capstone – FAQs"
            questions={questions}
            subtitle="Review all 20 topics of Module 002_003: Core Operators, Joins, Division, Grouping, Outer Joins, Optimization, TRC, DRC, and Codd's Equivalence with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 6: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Complex Relational Algebra Worked Examples & Step-by-Step Exercise Solutions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic19_capstone_worked_examples_note.txt"
          />
        </section>

        {/* ─── SECTION 7: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Congratulations on completing Module 002_003: Relational Algebra, Query Trees & Relational Calculus! " +
              "In my classes at Coder & AccoTax in Barrackpore, I tell my students that this module is what separates true database engineers from amateur script writers. " +
              "You now understand not just how to type SQL, but how the relational engine thinks: " +
              "from the 5 primitive mathematical operators ($\\sigma, \\pi, \\rho, \\cup, -$) to advanced relational division ($\\div$), " +
              "grouping summaries (${}_G \\mathcal{G}$), query tree pushdown heuristics, and first-order predicate logic in TRC and DRC. " +
              "Always remember Codd's Reduction Theorem: mathematics and declarative engineering are one and the same! " +
              "Take immense pride in mastering this theoretical foundation—you are now ready to tackle Database Normalization and Functional Dependencies in the next module!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 19 (Module Capstone) · Relational Algebra &amp; Calculus Complete · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic19;
