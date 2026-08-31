import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – NATURAL JOIN and Why It Should Be Avoided in Production
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive NATURAL JOIN Failure Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive NATURAL JOIN State
  const [selectedNaturalMode, setSelectedNaturalMode] = useState("mode_initial_working"); // "mode_initial_working" | "mode_audit_catastrophe" | "mode_generic_name_bug" | "mode_safe_remedy"

  const naturalScenarios = {
    mode_initial_working: {
      title: "1. Initial Working State (Pristine 2-Column Academic Schema)",
      sqlQuery: `-- Initial pristine schema (shared column: 'course_id' only):
SELECT * 
FROM students 
NATURAL JOIN courses;

-- Generated Implicit Predicate:
-- ON students.course_id = courses.course_id`,
      sharedCols: "course_id",
      resultRows: [
        { id: "101", name: "Mamata Hui", matchKey: "C101 (MySQL Master)", outcome: "Fee: ₹4,500", badgeColor: "emerald" },
        { id: "102", name: "Debangshu Roy", matchKey: "C102 (React Architect)", outcome: "Fee: ₹5,500", badgeColor: "emerald" },
      ],
      verdictText: "✓ WORKS TEMPORARILY (TOY EXAMPLE)",
      badgeColor: "emerald",
      explanation: "In clean academic toy examples with only 1 shared column name, NATURAL JOIN works because the implicit join condition matches 'course_id'.",
    },
    mode_audit_catastrophe: {
      title: "2. The Audit Column Catastrophe (Migration Adds 'created_at')",
      sqlQuery: `-- 💥 DISASTER: Schema migration adds 'created_at' timestamp to both tables!
-- NATURAL JOIN now implicitly rewrites itself to:
SELECT * 
FROM students 
NATURAL JOIN courses;

-- Implicit Predicate Executed:
-- ON students.course_id = courses.course_id 
-- AND students.created_at = courses.created_at; -- TIMESTAMPS NEVER MATCH!`,
      sharedCols: "course_id, created_at",
      resultRows: [
        { id: "EMPTY", name: "0 Rows Returned", matchKey: "Timestamp Mismatch", outcome: "Silent Application Outage", badgeColor: "rose" },
      ],
      verdictText: "❌ 0 ROWS RETURNED (SILENT BREAKAGE)",
      badgeColor: "rose",
      explanation: "Because student records and course records were created at different timestamps, students.created_at = courses.created_at evaluates to FALSE for all rows, returning 0 rows without throwing an error!",
    },
    mode_generic_name_bug: {
      title: "3. Generic Column Name Collision ('name' in Students & Depts)",
      sqlQuery: `-- ⚠️ Semantic Bug: Both tables share generic column 'name'!
SELECT * 
FROM students 
NATURAL JOIN departments;

-- Generated Implicit Predicate:
-- ON students.dept_id = departments.dept_id 
-- AND students.name = departments.name; -- Compares Student Name to Dept Name!`,
      sharedCols: "dept_id, name",
      resultRows: [
        { id: "EMPTY", name: "Mamata != 'Computer Science'", matchKey: "Name Semantic Collision", outcome: "0 Rows Matched", badgeColor: "rose" },
      ],
      verdictText: "❌ SEMANTIC LOGIC BUG",
      badgeColor: "rose",
      explanation: "NATURAL JOIN blindly compares the student's personal name ('Mamata') to the department's name ('Computer Science'), causing total query failure.",
    },
    mode_safe_remedy: {
      title: "4. The Production Standard (Explicit USING / ON Clause)",
      sqlQuery: `-- ✅ SAFE & RESILIENT: Explicit USING or ON clause!
SELECT 
    course_id,
    s.student_name,
    c.course_title,
    c.course_fee
FROM students s
INNER JOIN courses c USING (course_id);
-- Immune to added audit columns (created_at, updated_by, status)!`,
      sharedCols: "course_id (Explicitly Declared)",
      resultRows: [
        { id: "101", name: "Mamata Hui", matchKey: "C101 (MySQL Master)", outcome: "Fee: ₹4,500", badgeColor: "emerald" },
        { id: "102", name: "Debangshu Roy", matchKey: "C102 (React Architect)", outcome: "Fee: ₹5,500", badgeColor: "emerald" },
      ],
      verdictText: "✓ 100% PRODUCTION RESILIENT",
      badgeColor: "emerald",
      explanation: "Using explicit 'USING (course_id)' isolates the join strictly to the declared business key, making the query completely immune to future schema migrations.",
    },
  };

  const currentNatural = naturalScenarios[selectedNaturalMode];

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
            Module 002_005 · SQL Joins · Topic 10
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            NATURAL JOIN:{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-teal-400 bg-clip-text text-transparent">
              Why It Is Banned in Production
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Understand why NATURAL JOIN is considered a dangerous architectural anti-pattern in enterprise systems:
            implicit column matching, the audit column catastrophe, silent 0-row outages, and safe alternatives using USING and ON.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Implicit Column Coupling
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💥 Audit Column Outage Catastrophe
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Silent 0-Row Query Failures
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Safe Alternative: USING (column_name)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: NATURAL JOIN Hazards & Theory ──────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The Mechanics of NATURAL JOIN &amp; Schema Coupling Hazard
              </h2>
              <p className="text-xs text-slate-400">
                Why implicit schema-dependent join generation is an enterprise anti-pattern
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Implicit Join Generation</span>
              <strong className="text-white text-xs block font-mono">Joins on ALL shared column names blindly</strong>
              <p className="text-xs text-slate-300">
                MySQL inspects both table schemas and builds an <code>AND</code> condition across every column with identical names, whether business-related or not.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. The Production Standard</span>
              <strong className="text-white text-xs block font-mono">Always use USING (col) or ON a.id = b.id</strong>
              <p className="text-xs text-slate-300">
                Explicit joins declare exactly which foreign keys to link, guaranteeing that routine schema changes never alter query behavior.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Audit Column Failure Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Audit Column Catastrophe (How Migration Destroys NATURAL JOIN)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="NATURAL JOIN Breakdown Diagram"
            >
              {/* Step 1: Initial Working State */}
              <g transform="translate(20, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="110" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Phase 1: Initial Schema</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="9">Shared: course_id</text>
                <text x="10" y="65" fill="#a7f3d0" fontSize="9">✓ Matches C101 = C101</text>
                <text x="10" y="80" fill="#38bdf8" fontSize="8">Returns 2 Active Students</text>
              </g>

              {/* Migration Arrow */}
              <g transform="translate(255, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#f59e0b" />
                <text x="20" y="0" fill="#f59e0b" textAnchor="middle" fontSize="7">DB Migration</text>
              </g>

              {/* Step 2: Added created_at Column */}
              <g transform="translate(305, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="110" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">Phase 2: Add 'created_at'</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="9">Shared: course_id + created_at</text>
                <text x="10" y="65" fill="#fca5a5" fontSize="9">s.created_at != c.created_at</text>
                <text x="10" y="80" fill="#f59e0b" fontSize="8">Implicit Condition Mutates!</text>
              </g>

              {/* Failure Arrow */}
              <g transform="translate(540, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#f43f5e" />
              </g>

              {/* Step 3: 0 Rows Outage */}
              <g transform="translate(585, 20)">
                <rect width="175" height="90" rx="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                <text x="87" y="22" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="10">Phase 3: Silent Outage</text>
                <text x="10" y="48" fill="#fca5a5" fontSize="9" fontWeight="bold">❌ 0 Rows Returned</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">No syntax error thrown!</text>
                <text x="10" y="82" fill="#fda4af" fontSize="8">App displays blank screen</text>
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
                Interactive NATURAL JOIN Failure Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Simulate schema mutations, audit column outages, semantic name collisions, and production remedies
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedNaturalMode("mode_initial_working")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedNaturalMode === "mode_initial_working"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Initial State (Toy)
              </button>

              <button
                onClick={() => setSelectedNaturalMode("mode_audit_catastrophe")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedNaturalMode === "mode_audit_catastrophe"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Audit Migration 💥
              </button>

              <button
                onClick={() => setSelectedNaturalMode("mode_generic_name_bug")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedNaturalMode === "mode_generic_name_bug"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Name Collision ⚠️
              </button>

              <button
                onClick={() => setSelectedNaturalMode("mode_safe_remedy")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedNaturalMode === "mode_safe_remedy"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Production Remedy ✓
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentNatural.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentNatural.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentNatural.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentNatural.sqlQuery}
                  </pre>

                  <div className="text-[11px] text-slate-300">
                    <span className="text-amber-400 font-bold">Implicit Join Columns: </span>
                    <code>{currentNatural.sharedCols}</code>
                    <p className="mt-1">{currentNatural.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Query Output Result Set
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">ID / Status</th>
                        <th className="p-1.5">Student / Entity</th>
                        <th className="p-1.5">Matched Key</th>
                        <th className="p-1.5">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentNatural.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.id}</td>
                          <td className="p-1.5 text-cyan-300">{r.name}</td>
                          <td className="p-1.5 text-slate-300">{r.matchKey}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.outcome}</td>
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
                How Barrackpore and Kolkata training institutes prevent NATURAL JOIN outages in production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Admission Portal Migration Failure
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                How adding an <code>is_active</code> boolean column to both tables broke the natural join query overnight:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- ❌ VULNERABLE TO SCHEMA CHANGES:
SELECT * FROM students NATURAL JOIN batches;
-- When 'is_active' is added, it requires students.is_active = batches.is_active.
-- Inactive students in active batches are SILENTLY WIPED from the report!

-- ✅ FIXED PRODUCTION QUERY:
SELECT 
    s.student_id,
    s.student_name,
    b.batch_code,
    b.start_date
FROM students s
INNER JOIN batches b USING (batch_id);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's CI/CD Pipeline SQLFluff Rule Enforcement
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Automating static code analysis to ban NATURAL JOIN in GitHub Actions pull requests:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`# .sqlfluff configuration file:
[sqlfluff:rules:structure.join_condition]
# Enforce explicit ON or USING clauses; disallow NATURAL JOIN:
ban_natural_joins = true

# Result in CI Pipeline:
# FAIL: Topic10.sql: Line 4, Col 1: [L001] Avoid NATURAL JOIN; use explicit ON/USING.`}
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
                Guidelines for writing resilient SQL queries that survive future schema migrations
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
                  <strong className="text-white">1. Relying on NATURAL JOIN in Production:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Adding standard audit columns (<code>created_at</code>, <code>status</code>) silently produces 0 rows without syntax errors.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Zero Shared Columns Throws Error:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If two tables share no columns, NATURAL JOIN silently executes a full Cartesian Product (CROSS JOIN).
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
                  <strong className="text-white">1. Always Write Explicit USING or ON:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>USING (col_name)</code> for clean identical key joining, or <code>ON</code> for explicit key mapping.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enforce Linter Rules in CI/CD:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Configure SQLFluff or custom git pre-commit hooks to automatically reject code containing <code>NATURAL JOIN</code>.
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
              <span>NATURAL JOIN automatically joins on ALL shared column names blindly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Adding audit columns (created_at, status) silently breaks queries to 0 rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>If no columns match, NATURAL JOIN degenerates into a full CROSS JOIN</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Strictly banned in enterprise software and professional code reviews</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always replace NATURAL JOIN with explicit USING (col) or ON clause</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce SQL linters to reject NATURAL JOIN in CI/CD pipelines</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="NATURAL JOIN Pitfalls &amp; Best Practices – FAQs"
            questions={questions}
            subtitle="Master NATURAL JOIN mechanics, schema fragility hazards, the audit column catastrophe, silent 0-row query failures, and safe production alternatives with 30 comprehensive Q&As"
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
            title="NATURAL JOIN and Why It Should Be Avoided in Production"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_natural_join_hazards_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "If there is ONE SQL keyword you should ban from your vocabulary, it is `NATURAL JOIN`! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I warn students: " +
              "'NATURAL JOIN looks magical in textbook chapter 1 because you only have 2 tables with 2 columns each.' " +
              "In the real world, database tables have audit columns like `created_at`, `updated_at`, `is_active`, and `status`. " +
              "The moment a DBA adds a `created_at` timestamp column to both tables, your `NATURAL JOIN` silently rewrites itself " +
              "and requires timestamps to match down to the exact millisecond—instantly returning 0 rows without throwing a single error! " +
              "Always be explicit: write `USING (course_id)` or `ON s.course_id = c.course_id` so your code remains rock-solid for decades!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · NATURAL JOIN Pitfalls · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
