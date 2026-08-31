import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – USING Clause vs ON Clause for Identical Column Names
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive USING vs ON Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive USING vs ON State
  const [selectedUsingMode, setSelectedUsingMode] = useState("mode_using_coalesce"); // "mode_using_coalesce" | "mode_on_duplicate" | "mode_composite_using" | "mode_on_mandatory"

  const usingScenarios = {
    mode_using_coalesce: {
      title: "1. Clean Shorthand with USING (course_id)",
      sqlQuery: `-- Shorthand USING syntax:
SELECT *
FROM students s
INNER JOIN courses c USING (course_id)
WHERE s.city = 'Barrackpore';`,
      columnsShown: ["course_id (Single Unified)", "student_id", "student_name", "city", "course_title", "course_fee"],
      resultRows: [
        { col1: "C101", col2: "101", col3: "Mamata Hui", col4: "Barrackpore", col5: "MySQL Master", col6: "₹4,500" },
        { col1: "C102", col2: "102", col3: "Debangshu Roy", col4: "Barrackpore", col5: "React Architect", col6: "₹5,500" },
      ],
      verdictText: "✓ SINGLE UNIFIED COALESCED COLUMN",
      badgeColor: "emerald",
      explanation: "MySQL automatically coalesces the two matching join columns into ONE single 'course_id' column at the front of the result set, preventing duplicate column collisions in JSON APIs.",
    },
    mode_on_duplicate: {
      title: "2. Standard ON Clause (Produces Duplicate Columns in SELECT *)",
      sqlQuery: `-- Standard ON syntax:
SELECT *
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id
WHERE s.city = 'Barrackpore';`,
      columnsShown: ["student_id", "student_name", "city", "s.course_id (Duplicate 1)", "c.course_id (Duplicate 2)", "course_title", "course_fee"],
      resultRows: [
        { col1: "101", col2: "Mamata Hui", col3: "Barrackpore", col4: "C101", col5: "C101", col6: "MySQL Master (₹4,500)" },
        { col1: "102", col2: "Debangshu Roy", col3: "Barrackpore", col4: "C102", col5: "C102", col6: "React Architect (₹5,500)" },
      ],
      verdictText: "⚠️ TWO DUPLICATE COURSE_ID COLUMNS",
      badgeColor: "amber",
      explanation: "Standard 'SELECT * ... ON' returns the course_id column twice (once from students, once from courses), which can cause ambiguity in downstream backend libraries.",
    },
    mode_composite_using: {
      title: "3. Multi-Column Composite Keys USING (batch_id, semester_id)",
      sqlQuery: `-- Composite keys joined cleanly:
SELECT 
    student_name,
    batch_id,
    semester_id,
    exam_score
FROM student_grades
INNER JOIN batch_schedules USING (batch_id, semester_id);`,
      columnsShown: ["batch_id", "semester_id", "student_name", "exam_score", "room_number", "faculty_incharge"],
      resultRows: [
        { col1: "B2026-M", col2: "SEM-1", col3: "Mamata Hui", col4: "92 / 100", col5: "Lab-301", col6: "Sukanta Hui" },
        { col1: "B2026-E", col2: "SEM-1", col3: "Debangshu Roy", col4: "84 / 100", col5: "Lab-302", col6: "Mamata Hui" },
      ],
      verdictText: "✓ DUAL COMPOSITE KEY MATCH",
      badgeColor: "cyan",
      explanation: "Enclosing multiple columns inside 'USING (batch_id, semester_id)' matches both composite keys simultaneously with concise, readable syntax.",
    },
    mode_on_mandatory: {
      title: "4. When ON is Mandatory (Differing Column Names: s.dept_ref = d.id)",
      sqlQuery: `-- ❌ USING (id) would fail here because column names differ!
SELECT 
    s.student_name,
    d.department_name
FROM students s
INNER JOIN departments d ON s.dept_ref = d.department_id;
-- 'ON' is required because students has 'dept_ref' while departments has 'department_id'.`,
      columnsShown: ["student_name", "s.dept_ref (FK)", "d.department_id (PK)", "department_name", "head_of_dept", "location"],
      resultRows: [
        { col1: "Susmita Sen", col2: "REF-CS", col3: "D101", col4: "Computer Science", col5: "Sukanta Hui", col6: "Barrackpore Campus" },
        { col1: "Mahima Shaw", col2: "REF-IT", col3: "D102", col4: "Information Tech", col5: "Debangshu Roy", col6: "Kolkata Campus" },
      ],
      verdictText: "✓ 'ON' IS MANDATORY HERE",
      badgeColor: "indigo",
      explanation: "Whenever foreign key and primary key column names differ, 'ON' must be used because 'USING' strictly requires identical column names in both tables.",
    },
  };

  const currentUsing = usingScenarios[selectedUsingMode];

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
            Module 002_005 · SQL Joins · Topic 9
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            USING Clause vs ON Clause:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Identical Column Name Joining
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the ANSI SQL USING shorthand: automatic column coalescing in SELECT *, composite key syntax,
            unqualified column references, and understanding exactly when ON is mandatory.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ Shorthand: USING (column_name)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧱 Automatic Column Coalescing in SELECT *
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Composite Keys: USING (col1, col2)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ When to Choose ON vs USING
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: USING vs ON Theory & Mechanics ─────────── */}
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
                The Mechanics of the USING Clause &amp; Comparison with ON
              </h2>
              <p className="text-xs text-slate-400">
                Understanding syntactic shorthand, column deduplication, and syntax requirements
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. USING (col) Benefits</span>
              <strong className="text-white text-xs block font-mono">USING (student_id) ➔ Coalesced Output</strong>
              <p className="text-xs text-slate-300">
                Produces a single unified join column at the beginning of <code>SELECT *</code>, eliminating duplicate column names and JSON API key collisions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">2. ON Predicate Versatility</span>
              <strong className="text-white text-xs block font-mono">ON s.dept_ref = d.dept_id (Universal)</strong>
              <p className="text-xs text-slate-300">
                Mandatory whenever column names differ, when non-equi comparisons are needed (<code>BETWEEN</code>), or when joining with functions (<code>UPPER()</code>).
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Deduplication Comparison Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: SELECT * Output Comparison (ON Duplicate Columns vs USING Coalescing)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="USING vs ON Column Comparison Diagram"
            >
              {/* ON Clause Output */}
              <g transform="translate(20, 20)">
                <rect width="340" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <rect width="340" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="170" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">ON Clause: SELECT * Result (Duplicate Columns)</text>
                <text x="12" y="42" fill="#cbd5e1" fontSize="9">student_id | student_name | s.course_id | c.course_id | course_title</text>
                <text x="12" y="62" fill="#fca5a5" fontSize="9">⚠️ Column 'course_id' appears TWICE (Ambiguity Hazard)</text>
                <text x="12" y="78" fill="#94a3b8" fontSize="8">Requires table aliases for selection: s.course_id</text>
              </g>

              {/* USING Clause Output */}
              <g transform="translate(420, 20)">
                <rect width="340" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="340" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="170" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">USING Clause: SELECT * Result (Coalesced)</text>
                <text x="12" y="42" fill="#a7f3d0" fontSize="9">course_id (Unified) | student_id | student_name | course_title</text>
                <text x="12" y="62" fill="#10b981" fontSize="9" fontWeight="bold">✓ Single Coalesced Column (Zero Ambiguity)</text>
                <text x="12" y="78" fill="#38bdf8" fontSize="8">Direct bare reference: SELECT course_id</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive USING vs ON Syntax Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore column coalescing, composite key joining with USING, duplicate column outputs with ON, and mandatory ON conditions
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedUsingMode("mode_using_coalesce")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedUsingMode === "mode_using_coalesce"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. USING (course_id) ✓
              </button>

              <button
                onClick={() => setSelectedUsingMode("mode_on_duplicate")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedUsingMode === "mode_on_duplicate"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. ON Clause (Duplicate)
              </button>

              <button
                onClick={() => setSelectedUsingMode("mode_composite_using")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedUsingMode === "mode_composite_using"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Composite USING
              </button>

              <button
                onClick={() => setSelectedUsingMode("mode_on_mandatory")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedUsingMode === "mode_on_mandatory"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Mandatory ON
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentUsing.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentUsing.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentUsing.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentUsing.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentUsing.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentUsing.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentUsing.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Output Column Schema &amp; Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        {currentUsing.columnsShown.slice(0, 4).map((col, idx) => (
                          <th key={idx} className="p-1.5">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentUsing.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.col1}</td>
                          <td className="p-1.5 text-cyan-300">{r.col2}</td>
                          <td className="p-1.5 text-slate-300">{r.col3}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                How Barrackpore and Kolkata training institutes apply USING clauses for concise reporting
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Multi-Table Academy Roster with USING
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Joining students, enrollments, and payments with shared primary/foreign keys:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Concise Multi-Table Join with USING:
SELECT 
    student_id, -- No table prefix needed!
    s.student_name,
    c.course_title,
    p.amount_paid
FROM students s
INNER JOIN enrollments e USING (student_id)
INNER JOIN courses c USING (course_id)
INNER JOIN payments p USING (enrollment_id)
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Item JSON API Serialization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using <code>USING (order_id, product_id)</code> to eliminate key collisions in Node.js / Python ORM dictionaries:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- API-Friendly JSON Result (Zero Duplicate Column Keys):
SELECT 
    order_id,
    product_id,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
JOIN order_items oi USING (order_id)
JOIN products p USING (product_id)
WHERE o.order_id = 'ORD-5001';`}
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
                Guidelines for choosing between USING and ON clauses in SQL architectures
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
                  <strong className="text-white">1. Using USING When Column Names Differ:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If Table A has <code>id</code> and Table B has <code>student_id</code>, <code>USING (id)</code> throws MySQL Error 1054.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Omitting Parentheses:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>USING student_id</code> without parentheses is a syntax error; always write <code>USING (student_id)</code>.
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
                  <strong className="text-white">1. Adopt Consistent Key Naming:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Name primary and foreign keys identically across tables (e.g. <code>customer_id</code>) to enable clean USING queries.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use ON for Complex / Non-Equi Joins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Rely on <code>ON</code> whenever conditions require inequalities, range matching (<code>BETWEEN</code>), or functions.
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
              <span>USING (col) is shorthand for ON a.col = b.col when column names match</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Column names inside USING (col1, col2) must be enclosed in parentheses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>USING automatically coalesces duplicate join columns into a single column in SELECT *</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>You do NOT need to qualify the join column with a table alias when using USING</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use ON whenever column names differ or non-equi comparisons are required</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Both USING and ON generate identical physical execution plans in MySQL</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="USING Clause vs ON Clause – FAQs"
            questions={questions}
            subtitle="Master the USING clause vs ON clause, identical column name joining, column deduplication in SELECT *, composite keys in USING, and when ON is mandatory with 30 comprehensive Q&As"
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
            title="USING Clause vs ON Clause for Identical Column Names"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_using_vs_on_clause_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The `USING` clause is a favorite among senior database architects who value clean, readable SQL! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students: " +
              "'If you name your columns cleanly—calling the student ID `student_id` in both the students table and the enrollments table—" +
              "you can replace `ON s.student_id = e.student_id` with a simple `USING (student_id)`. " +
              "Not only does it make your queries half as long, but it also coalesces the column in `SELECT *` so you never get duplicate column key collisions in your REST APIs!' " +
              "Use `USING` whenever column names match, and keep `ON` ready for when column names differ or complex expressions are needed!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · USING vs ON Clause · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
