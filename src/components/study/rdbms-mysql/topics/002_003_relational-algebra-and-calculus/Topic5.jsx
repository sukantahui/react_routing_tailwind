import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Type Compatibility / Union Compatibility Rules in Relational Operations
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Union Compatibility Validator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Validator State
  const [selectedTargetTable, setSelectedTargetTable] = useState("faculty"); // "faculty" | "courses" | "invoices"
  const [applyFix, setApplyFix] = useState(false);

  const tableDefinitions = {
    students: {
      name: "Students",
      degree: 3,
      columns: [
        { name: "student_id", type: "INT", domain: "Entity ID" },
        { name: "full_name", type: "VARCHAR(100)", domain: "Person Name" },
        { name: "city", type: "VARCHAR(50)", domain: "Location" },
      ],
      sample: [
        { c1: "101", c2: "Mamata Hui", c3: "Barrackpore" },
        { c1: "102", c2: "Mahima Sharma", c3: "Kolkata" },
      ],
    },
    faculty: {
      name: "Faculty",
      degree: 3,
      columns: [
        { name: "faculty_id", type: "INT", domain: "Entity ID" },
        { name: "instructor_name", type: "VARCHAR(100)", domain: "Person Name" },
        { name: "campus_city", type: "VARCHAR(50)", domain: "Location" },
      ],
      sample: [
        { c1: "501", c2: "Dr. Sukanta Hui", c3: "Barrackpore" },
        { c1: "502", c2: "Susmita Ghosh", c3: "Ichapur" },
      ],
      compatible: true,
      reason: "Degree matches (3 = 3); domains match positionally: (INT, VARCHAR, VARCHAR). 100% Compatible!",
    },
    courses: {
      name: "Courses",
      degree: 2,
      columns: [
        { name: "course_id", type: "INT", domain: "Course ID" },
        { name: "course_title", type: "VARCHAR(100)", domain: "Title" },
      ],
      sample: [
        { c1: "201", c2: "MySQL Masterclass", c3: "—" },
        { c1: "202", c2: "React Architect", c3: "—" },
      ],
      compatible: false,
      reason: "Degree Mismatch! Students has 3 columns, Courses has 2 columns. Fails Rule 1 (MySQL Error 1222).",
    },
    invoices: {
      name: "Invoices",
      degree: 3,
      columns: [
        { name: "invoice_id", type: "INT", domain: "Invoice ID" },
        { name: "amount", type: "DECIMAL(10, 2)", domain: "Currency" },
        { name: "billing_date", type: "DATE", domain: "Date" },
      ],
      sample: [
        { c1: "9001", c2: "₹5,500.00", c3: "2026-08-24" },
        { c1: "9002", c2: "₹4,800.00", c3: "2026-08-24" },
      ],
      compatible: false,
      reason: "Positional Domain & Semantic Mismatch! Column 2 (VARCHAR name vs DECIMAL fee) and Column 3 (VARCHAR city vs DATE).",
    },
  };

  const currentTbl = tableDefinitions[selectedTargetTable];

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

  const isActuallyCompatible = currentTbl.compatible || applyFix;

  const sqlQuery = applyFix
    ? `-- Projection Alignment Fix Applied:\nSELECT student_id, full_name, city FROM students\nUNION\nSELECT ${currentTbl.columns[0].name}, ${currentTbl.columns[1].name}, ${currentTbl.degree === 2 ? "'General Campus' AS city" : "CAST(" + currentTbl.columns[2]?.name + " AS CHAR)"} FROM ${selectedTargetTable};`
    : `SELECT student_id, full_name, city FROM students\nUNION\nSELECT * FROM ${selectedTargetTable};`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Type Compatibility &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Union Compatibility Rules
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the strict mathematical axioms of relational Type Compatibility: Degree Equality (Arity matching),
            Positional Domain Alignment, MySQL Error 1222 diagnostics, and projection alignment techniques.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📏 Rule 1: Degree Equality (Degree(R) = Degree(S))
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧬 Rule 2: Positional Domain Matching
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 MySQL Error 1222 Diagnostics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛠️ Projection Alignment &amp; Coercion
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Two Strict Rules of Union Compatibility ─ */}
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
                The Two Mathematical Axioms of Type Compatibility
              </h2>
              <p className="text-xs text-slate-400">
                Why set operations strictly enforce column count and positional domain equivalence
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule 1 */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Rule 1: Degree Equality</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Arity Matching
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Both relations must have the <strong>EXACT SAME NUMBER OF ATTRIBUTES</strong>: {"$\Degree(R) = \Degree(S) \\iff n = m$"}.
              </p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-amber-300 font-mono">
                Violation ➔ MySQL Error 1222: Different number of columns.
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Rule 2: Positional Domain Matching</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Domain Order
                </span>
              </div>
              <p className="text-xs text-slate-300">
                For every column position $i$, the domain of $A_i$ must be compatible with $B_i$: {"$\dom(A_i) \\cong \dom(B_i)$"}.
              </p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-cyan-300 font-mono">
                Column names can differ; only data types and positional order matter.
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Compatibility Diagnostic Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Type Compatibility Verification Matrix
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Union Compatibility Diagram"
            >
              {/* Relation 1: Students */}
              <g transform="translate(30, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="105" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Students (Degree = 3)</text>
                <text x="15" y="42" fill="#cbd5e1">col1: student_id (INT)</text>
                <text x="15" y="60" fill="#cbd5e1">col2: full_name (VARCHAR)</text>
                <text x="15" y="78" fill="#cbd5e1">col3: city (VARCHAR)</text>
              </g>

              {/* Compatible Relation 2: Faculty */}
              <g transform="translate(280, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Faculty (Degree = 3) [VALID]</text>
                <text x="15" y="42" fill="#10b981">col1: faculty_id (INT) ✓</text>
                <text x="15" y="60" fill="#10b981">col2: instructor_name (VARCHAR) ✓</text>
                <text x="15" y="78" fill="#10b981">col3: campus_city (VARCHAR) ✓</text>
              </g>

              {/* Incompatible Relation 3: Courses */}
              <g transform="translate(540, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#f43f5e" />
                <text x="105" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Courses (Degree = 2) [INVALID]</text>
                <text x="15" y="42" fill="#cbd5e1">col1: course_id (INT)</text>
                <text x="15" y="60" fill="#cbd5e1">col2: title (VARCHAR)</text>
                <text x="15" y="78" fill="#f43f5e" fontWeight="bold">❌ Missing Column 3! (Error 1222)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Union Compatibility Validator ── */}
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
                Interactive Union Compatibility Diagnostic Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Compare Students with other tables to diagnose degree mismatches, positional domain errors, and test projection alignment fixes
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Target Selectors */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedTargetTable("faculty");
                  setApplyFix(false);
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTargetTable === "faculty"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Test Faculty (Compatible Degree=3)
              </button>

              <button
                onClick={() => {
                  setSelectedTargetTable("courses");
                  setApplyFix(false);
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTargetTable === "courses"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Test Courses (Degree=2 Mismatch)
              </button>

              <button
                onClick={() => {
                  setSelectedTargetTable("invoices");
                  setApplyFix(false);
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedTargetTable === "invoices"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Test Invoices (Domain Mismatch)
              </button>
            </div>

            {/* Sandbox Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Diagnostic Status */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Students ∪ {currentTbl.name}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded font-bold border",
                        isActuallyCompatible
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      )}
                    >
                      {isActuallyCompatible ? "✓ 100% COMPATIBLE" : "❌ INCOMPATIBLE"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    {applyFix
                      ? "✓ Projection Alignment Fix Active: Added placeholder column and explicit type casting."
                      : currentTbl.reason}
                  </p>

                  {!currentTbl.compatible && (
                    <button
                      onClick={() => setApplyFix(!applyFix)}
                      className={clsx(
                        "w-full py-2 rounded-lg text-xs font-bold transition-all border",
                        applyFix
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                          : "bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30"
                      )}
                    &gt;
                      {applyFix ? "Revert Alignment Fix" : "⚡ Apply Projection Alignment Fix"}
                    </button>
                  )}

                  {/* SQL */}
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">
                      SQL Query Statement:
                    </span>
                    <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                      {sqlQuery}
                    </pre>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Diagnostic Log:
                  </span>
                  <pre className="whitespace-pre-wrap">
                    {`Students Degree: 3 | Target Degree: ${currentTbl.degree}\nStatus: ${isActuallyCompatible ? "PASSED (Safe to Union)" : "FAILED (MySQL Error 1222)"}`}
                  </pre>
                </div>
              </div>

              {/* Right: Schema Header Alignment Matrix */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Positional Schema Alignment Matrix</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">Pos</th>
                          <th className="p-1.5">Students Column</th>
                          <th className="p-1.5">{currentTbl.name} Column</th>
                          <th className="p-1.5">Domain Match</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        <tr>
                          <td className="p-1.5 text-cyan-300 font-bold">1</td>
                          <td className="p-1.5 text-white">student_id (INT)</td>
                          <td className="p-1.5 text-white">{currentTbl.columns[0]?.name} ({currentTbl.columns[0]?.type})</td>
                          <td className="p-1.5 text-emerald-300">✓ Match</td>
                        </tr>
                        <tr>
                          <td className="p-1.5 text-cyan-300 font-bold">2</td>
                          <td className="p-1.5 text-white">full_name (VARCHAR)</td>
                          <td className="p-1.5 text-white">{currentTbl.columns[1]?.name} ({currentTbl.columns[1]?.type})</td>
                          <td className={clsx("p-1.5 font-bold", currentTbl.columns[1]?.type.startsWith("VARCHAR") ? "text-emerald-300" : "text-rose-400")}>
                            {currentTbl.columns[1]?.type.startsWith("VARCHAR") ? "✓ Match" : "❌ Mismatch"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-1.5 text-cyan-300 font-bold">3</td>
                          <td className="p-1.5 text-white">city (VARCHAR)</td>
                          <td className="p-1.5 text-white">
                            {currentTbl.columns[2] ? `${currentTbl.columns[2].name} (${currentTbl.columns[2].type})` : (applyFix ? "'General' (Placeholder)" : "❌ [Missing]")}
                          </td>
                          <td className={clsx("p-1.5 font-bold", currentTbl.columns[2] || applyFix ? "text-emerald-300" : "text-rose-400")}>
                            {currentTbl.columns[2] || applyFix ? "✓ Match" : "❌ Error 1222"}
                          </td>
                        </tr>
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
                Academy directories and degree alignment patterns from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Staff and Student Combined Phone Directory
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Both tables have Degree = 3 with domains: (ID: INT, Name: VARCHAR, Phone: VARCHAR).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id, full_name, phone_number FROM students
UNION
SELECT faculty_id, instructor_name, contact_phone FROM faculty;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Degree Alignment Fix for Alumni Records
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Alumni table lacks <code>admission_fee</code>; resolved by projecting literal constant <code>0.00</code>.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id, full_name, admission_fee FROM students
UNION
SELECT alumni_id, full_name, 0.00 AS admission_fee FROM alumni;`}
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
                Avoid positional domain swaps and unaligned column counts
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
                  <strong className="text-white">1. Mismatched Column Count:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Unioning 3 columns with 2 columns fails with MySQL Error 1222.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Positional Domain Swaps:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>SELECT name, id</code> in query 1 and <code>SELECT id, name</code> in query 2 pairs text with integers!
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
                  <strong className="text-white">1. Use Projection Alignment:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Pad missing columns with typed placeholders: <code>NULL AS fee</code> or <code>0.00 AS fee</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit CAST for Mixed Types:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>CAST(col AS CHAR(50))</code> to guarantee deterministic collation and prevent silent coercion bugs.
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
              <span>Rule 1: Relations must have identical degree: `Degree(R) = Degree(S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Rule 2: Attribute domains must match positionally: `dom(Ai) ≅ dom(Bi)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Attribute names can differ; output headers are inherited from the first SELECT</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree mismatches trigger MySQL Error 1222</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Resolve mismatched columns with placeholders: `NULL AS col` or `0 AS col`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Place global `ORDER BY` at the very end referencing the first query's headers</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Type & Union Compatibility – FAQs"
            questions={questions}
            subtitle="Master relational type compatibility, degree equality, positional domain alignment, MySQL Error 1222 resolution, and projection alignment with 30 comprehensive Q&As"
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
            title="Type Compatibility / Union Compatibility Rules in Relational Operations"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_union_compatibility_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Type Compatibility is the gatekeeper of relational integrity! " +
              "In my classes in Barrackpore, I emphasize that relational algebra never allows you to mix apples with oranges. " +
              "If you want to union, intersect, or subtract relations, you MUST satisfy the 2 Golden Rules: " +
              "1) Exact same column count (Degree Equality), and 2) Matching domain data types in identical positional order. " +
              "Whenever you encounter MySQL Error 1222 in production, don't panic: simply align your projection lists with " +
              "placeholder columns like `NULL AS missing_col` or `0.00 AS fee`. " +
              "Understanding these rules ensures clean, bug-free multi-table set operations in any enterprise database!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · Type Compatibility · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
