import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Semijoin (⋉) and Antijoin (▷) Operators for Existence and Non-Existence
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Semijoin & Antijoin Explorer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [operatorMode, setOperatorMode] = useState("semijoin"); // "semijoin" | "antijoin" | "null_trap"

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 5500 },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", fee: 4800 },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", fee: 3800 },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", fee: 5500 },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", fee: 4200 },
  ]);

  const [enrollments] = useState([
    { studentId: 101, course: "MySQL Masterclass" },
    { studentId: 101, course: "Advanced Relational Algebra" }, // Mamata has 2 enrollments
    { studentId: 102, course: "React Architect" },
    { studentId: 103, course: "Data Modeling" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Semijoin & Antijoin Engine Active. Toggle between Semijoin (Existence), Antijoin (Non-Existence), and the NOT IN NULL Trap."
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

  // 1. Compute Semijoin (Students ⋉ Enrollments) -> Enrolled Students (101, 102, 103)
  const semijoinResults = students.filter((s) =>
    enrollments.some((e) => e.studentId === s.id)
  );

  // 2. Compute Antijoin (Students ▷ Enrollments) -> Unenrolled Students (104, 105)
  const antijoinResults = students.filter(
    (s) => !enrollments.some((e) => e.studentId === s.id)
  );

  const semijoinMath = "Students ⋉ Enrollments ≡ π_{Attrs(Students)}(Students ⨝ Enrollments)";
  const semijoinSQL = `SELECT s.* FROM students s\nWHERE EXISTS (\n    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id\n);\n-- Note: Mamata appears EXACTLY ONCE (No row duplication!).`;

  const antijoinMath = "Students ▷ Enrollments ≡ Students − (Students ⋉ Enrollments)";
  const antijoinSQL = `SELECT s.* FROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nWHERE e.student_id IS NULL;\n-- Or:\nSELECT s.* FROM students s\nWHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id);`;

  const nullTrapMath = "NOT IN Trap: 'x NOT IN (101, 102, NULL)' evaluates to UNKNOWN!";
  const nullTrapSQL = `-- FLAWED QUERY with a NULL in subquery:\nSELECT * FROM students\nWHERE student_id NOT IN (SELECT student_id FROM enrollments_with_null);\n-- Output: 0 rows returned (Silent catastrophic bug!)\n-- SAFE QUERY:\nSELECT * FROM students s\nWHERE NOT EXISTS (SELECT 1 FROM enrollments_with_null e WHERE e.student_id = s.student_id);`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 9
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Semijoin (⋉) &amp; Antijoin (▷) for{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Existence &amp; Non-Existence
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of existence and non-existence operators: Semijoin ($R \ltimes S$),
            Antijoin ($R \triangleright S$), the Partition Theorem, row duplication immunity, and the SQL `NOT IN` NULL trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🟢 Semijoin (⋉): WHERE EXISTS
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔴 Antijoin (▷): WHERE NOT EXISTS
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Zero Row Duplication
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ The NOT IN NULL Trap
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Partition Theorem ──── */}
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
                Semijoin &amp; Antijoin Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Existence filter semantics, degree preservation, and the fundamental Partition Theorem
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Semijoin (⋉)</span>
              <strong className="text-white text-xs block font-mono">R ⋉ S ≡ π_{`{Attrs(R)}`}(R ⨝ S)</strong>
              <p className="text-[11px] text-slate-400">Returns rows in $R$ having $\ge 1$ match in $S$. Zero duplication.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Antijoin (▷)</span>
              <strong className="text-white text-xs block font-mono">R ▷ S ≡ R − (R ⋉ S)</strong>
              <p className="text-[11px] text-slate-400">Returns rows in $R$ having $0$ matches in $S$. Identifies orphans.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Partition Theorem</span>
              <strong className="text-white text-xs block font-mono">(R ⋉ S) ∪ (R ▷ S) ≡ R</strong>
              <p className="text-[11px] text-slate-400">Semijoin and Antijoin form an exact disjoint partition of $R$.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Partition Theorem Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Partition Theorem ((Students ⋉ Enrollments) ∪ (Students ▷ Enrollments) ≡ Students)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Semijoin and Antijoin Partition Diagram"
            >
              {/* Full Students Table */}
              <g transform="translate(30, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="105" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Relation R (Students, 5 Rows)</text>
                <text x="15" y="42" fill="#10b981">101: Mamata Hui (Enrolled)</text>
                <text x="15" y="58" fill="#10b981">102: Mahima, 103: Abhronila</text>
                <text x="15" y="74" fill="#f43f5e">104: Susmita Ghosh (Unenrolled)</text>
                <text x="15" y="90" fill="#f43f5e">105: Debangshu Roy (Unenrolled)</text>
              </g>

              {/* Branching Arrows */}
              <g transform="translate(250, 40)">
                <path d="M 0,25 L 40,0" stroke="#10b981" strokeWidth="2" />
                <polygon points="40,0 30,2 35,7" fill="#10b981" />
                <text x="20" y="0" fill="#10b981" fontSize="9" fontWeight="bold">Matches ≥ 1</text>

                <path d="M 0,25 L 40,50" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="40,50 35,43 30,48" fill="#f43f5e" />
                <text x="20" y="58" fill="#f43f5e" fontSize="9" fontWeight="bold">Matches = 0</text>
              </g>

              {/* Upper Box: Semijoin Result */}
              <g transform="translate(310, 10)">
                <rect width="230" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="115" y="18" fill="#10b981" textAnchor="middle" fontWeight="bold">Semijoin (R ⋉ S): 3 Rows</text>
                <text x="10" y="38" fill="#cbd5e1">Mamata, Mahima, Abhronila (Active)</text>
              </g>

              {/* Lower Box: Antijoin Result */}
              <g transform="translate(310, 70)">
                <rect width="230" height="50" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="115" y="18" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Antijoin (R ▷ S): 2 Rows</text>
                <text x="10" y="38" fill="#cbd5e1">Susmita, Debangshu (Inactive/Orphans)</text>
              </g>

              {/* Equals Total */}
              <g transform="translate(560, 20)">
                <rect width="190" height="90" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
                <text x="95" y="25" fill="#818cf8" textAnchor="middle" fontWeight="bold">Exact Partition</text>
                <text x="15" y="50" fill="#10b981">|R ⋉ S| = 3 Tuples</text>
                <text x="15" y="68" fill="#f43f5e">|R ▷ S| = 2 Tuples</text>
                <text x="15" y="86" fill="#38bdf8" fontWeight="bold">Sum = 5 (100% of R)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Semijoin & Antijoin Simulator ── */}
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
                Interactive Existence &amp; Non-Existence Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between Semijoin, Antijoin, and the NOT IN NULL trap to inspect row preservation and query behavior
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setOperatorMode("semijoin");
                  setEngineLog("✓ Evaluated Semijoin (Students ⋉ Enrollments): Enrolled students. Note: Mamata Hui has 2 courses, but appears EXACTLY ONCE (no row multiplication).");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  operatorMode === "semijoin"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Semijoin (R ⋉ S - Enrolled)
              </button>

              <button
                onClick={() => {
                  setOperatorMode("antijoin");
                  setEngineLog("✓ Evaluated Antijoin (Students ▷ Enrollments): Unenrolled students (Susmita, Debangshu). Output schema strictly preserves Degree(Students) = 4.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  operatorMode === "antijoin"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Antijoin (R ▷ S - Unenrolled)
              </button>

              <button
                onClick={() => {
                  setOperatorMode("null_trap");
                  setEngineLog("⚠️ Triggered NOT IN NULL Trap: If subquery contains a NULL, 'NOT IN' evaluates to UNKNOWN for all rows, returning 0 rows! Solution: Use WHERE NOT EXISTS.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  operatorMode === "null_trap"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. The NOT IN NULL Trap Demo
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    {operatorMode === "semijoin"
                      ? "Semijoin Query Breakdown:"
                      : operatorMode === "antijoin"
                      ? "Antijoin Query Breakdown:"
                      : "The NOT IN NULL Trap Breakdown:"}
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {operatorMode === "semijoin" ? semijoinMath : operatorMode === "antijoin" ? antijoinMath : nullTrapMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {operatorMode === "semijoin" ? semijoinSQL : operatorMode === "antijoin" ? antijoinSQL : nullTrapSQL}
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

              {/* Right: Live Result Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>
                      {operatorMode === "semijoin"
                        ? `Semijoin Result (${semijoinResults.length} enrolled students)`
                        : operatorMode === "antijoin"
                        ? `Antijoin Result (${antijoinResults.length} unenrolled students)`
                        : "NOT IN Null Trap (0 rows returned)"}
                    </span>
                    <span className="text-teal-400 font-mono text-[11px]">Degree: 4 Cols</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">ID (PK)</th>
                          <th className="p-1.5">Student Name</th>
                          <th className="p-1.5">City</th>
                          <th className="p-1.5">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {operatorMode === "semijoin" &&
                          semijoinResults.map((r) => (
                            <tr key={r.id}>
                              <td className="p-1.5 text-cyan-300 font-bold">#{r.id}</td>
                              <td className="p-1.5 text-white font-bold">{r.name}</td>
                              <td className="p-1.5 text-emerald-300">{r.city}</td>
                              <td className="p-1.5 text-amber-300">₹{r.fee}</td>
                            </tr>
                          ))}

                        {operatorMode === "antijoin" &&
                          antijoinResults.map((r) => (
                            <tr key={r.id}>
                              <td className="p-1.5 text-cyan-300 font-bold">#{r.id}</td>
                              <td className="p-1.5 text-rose-300 font-bold">{r.name}</td>
                              <td className="p-1.5 text-emerald-300">{r.city}</td>
                              <td className="p-1.5 text-amber-300">₹{r.fee}</td>
                            </tr>
                          ))}

                        {operatorMode === "null_trap" && (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-rose-400 italic">
                              ∅ Zero Rows Returned! (Three-Valued Logic NULL Trap)<br />
                              Fix: Use `WHERE NOT EXISTS` or `LEFT JOIN ... WHERE IS NULL`
                            </td>
                          </tr>
                        )}
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
                Active student lookups and inactive follow-up audits from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Active Enrolled Student Directory (Semijoin)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\text{Students} \\ltimes \\text{Enrollments}$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.* FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Inactive Student Re-Engagement Audit (Antijoin)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Marketing</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\text{Students} \\triangleright \\text{Enrollments}$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.* FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;`}
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
                Avoid row multiplication in existence checks and the dangerous NOT IN NULL trap
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
                  <strong className="text-white">1. INNER JOIN Row Duplication:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>INNER JOIN</code> to check if a student has enrollments duplicates the student row once for every course.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. The NOT IN NULL Trap:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If the subquery yields even one NULL, <code>NOT IN</code> evaluates to UNKNOWN, returning 0 rows.
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
                  <strong className="text-white">1. Always Use WHERE NOT EXISTS:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>WHERE NOT EXISTS</code> is 100% immune to NULL values and optimized by MySQL's query rewriter.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Left Anti-Join for Indexed Searches:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>LEFT JOIN ... WHERE right.id IS NULL</code> leverages B-Tree indexes for fast orphan detection.
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
              <span>Semijoin (⋉) returns rows in $R$ having $\ge 1$ match in $S$ (`WHERE EXISTS`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Antijoin (▷) returns rows in $R$ having $0$ matches in $S$ (`WHERE NOT EXISTS`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Output degree is strictly preserved: `Degree(R ⋉ S) = Degree(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Zero row duplication: each entity in $R$ is emitted at most once</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partition Theorem: `(R ⋉ S) ∪ (R ▷ S) ≡ R` and `(R ⋉ S) ∩ (R ▷ S) ≡ ∅`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Avoid `NOT IN` with nullable subqueries; use `NOT EXISTS` or Left Anti-Joins</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Semijoin (⋉) & Antijoin (▷) – FAQs"
            questions={questions}
            subtitle="Master relational existence filters, Semijoins, Antijoins, Partition Theorem, MySQL WHERE EXISTS, and avoiding the NOT IN NULL trap with 30 comprehensive Q&As"
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
            title="Semijoin (⋉) and Antijoin (▷) Operators for Existence and Non-Existence"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_semijoin_antijoin_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Semijoin ($\\ltimes$) and Antijoin ($\\triangleright$) are the true guardians of entity integrity! " +
              "In my classes in Barrackpore, I constantly see developers write `INNER JOIN` when all they want to know is: 'Has this student enrolled in any course?' " +
              "The result? If Mamata has 5 course enrollments, the query spits out 5 duplicated Mamata rows! " +
              "Semijoin ($R \\ltimes S$) solves this by testing existence and emitting the student record exactly once. " +
              "And Antijoin ($R \\triangleright S$) is the perfect tool for finding inactive students or orphaned foreign keys. " +
              "Remember the golden safety rule: NEVER use `WHERE id NOT IN (subquery)` if the subquery can contain NULLs—" +
              "always use `WHERE NOT EXISTS` or a Left Anti-Join (`LEFT JOIN ... WHERE S.id IS NULL`)."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · Semijoin &amp; Antijoin · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
