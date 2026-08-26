import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Third Normal Form (3NF): Eliminating Transitive Dependencies
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 3NF Evaluator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive 3NF Evaluator State
  const [selectedFdKey, setSelectedFdKey] = useState("fd_transitive_dept"); // "fd_student_key" | "fd_transitive_dept" | "fd_prime_attr" | "fd_3nf_clean"

  const evaluatorScenarios = {
    fd_student_key: {
      title: "1. Direct Primary Key Dependency",
      notation: "student_id → { student_name, department_id }",
      lhs: "student_id (Super Key)",
      rhs: "{ student_name, department_id }",
      cond1Check: "TRUE (student_id is Primary Key of relation)",
      cond2Check: "N/A (Condition 1 already satisfied)",
      statusBadge: "✓ 3NF SATISFIED (Condition 1)",
      badgeColor: "emerald",
      explanation: "Since the determinant 'student_id' is a Super Key of the relation, Condition 1 of 3NF is fully satisfied. No transitive violation.",
      sqlAction: "Retained directly in Students table.",
    },
    fd_transitive_dept: {
      title: "2. Department Non-Key Determinant",
      notation: "department_id → { dept_name, dept_head, building }",
      lhs: "department_id (Non-Key Attribute)",
      rhs: "{ dept_name, dept_head, building } (Non-Prime Attributes)",
      cond1Check: "FALSE (department_id is NOT a Super Key in Students)",
      cond2Check: "FALSE (dept_head is NOT a Prime Attribute)",
      statusBadge: "❌ 3NF VIOLATION (Transitive Dependency)",
      badgeColor: "rose",
      explanation: "Both Condition 1 (LHS is Super Key) and Condition 2 (RHS is Prime Attribute) FAIL. This is a severe Transitive Dependency creating update and deletion anomalies.",
      sqlAction: "Decompose into a dedicated Departments master table: Departments(department_id PK, dept_name, dept_head, building).",
    },
    fd_prime_attr: {
      title: "3. Overlapping Candidate Keys (Prime Attribute Case)",
      notation: "C → A  (in relation R(A, B, C) with Candidate Keys: AB and BC)",
      lhs: "C (Not a Super Key)",
      rhs: "A (Prime Attribute: member of candidate key AB)",
      cond1Check: "FALSE (C alone is not a Super Key)",
      cond2Check: "TRUE (A is a Prime Attribute: member of candidate key AB)",
      statusBadge: "✓ 3NF SATISFIED (Condition 2)",
      badgeColor: "emerald",
      explanation: "Although determinant C is not a super key, the dependent attribute A is a PRIME attribute (part of candidate key AB). Therefore, Condition 2 of 3NF is satisfied! (Note: Violates BCNF, but satisfies 3NF).",
      sqlAction: "Preserved in 3NF without forcing lossy decomposition.",
    },
    fd_3nf_clean: {
      title: "4. Complete 3NF Decomposed Architecture",
      notation: "Students (N:1) ➔ Departments Master Table",
      lhs: "Super Key Determinants in Dedicated Tables",
      rhs: "All Non-Prime Attributes Directly Dependent",
      cond1Check: "TRUE for all dependencies in both tables",
      cond2Check: "TRUE across all projected relations",
      statusBadge: "✓ 100% 3NF COMPLIANT",
      badgeColor: "emerald",
      explanation: "Original schema synthesized into Students and Departments. Every non-prime attribute depends directly on its table's primary key. Guaranteed Lossless Join and 100% Dependency Preservation.",
      sqlAction: `-- Complete 3NF Production Schema:
CREATE TABLE departments (
    department_id VARCHAR(10) PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_head VARCHAR(100) NOT NULL,
    building_block VARCHAR(50) NOT NULL
);

CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    department_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);`,
    },
  };

  const currentEval = evaluatorScenarios[selectedFdKey];

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
            Module 002_004 · Database Normalization · Topic 10
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Third Normal Form (3NF):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Eliminating Transitive Dependencies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical formulation of Third Normal Form (3NF): the Super Key OR Prime Attribute disjunctive condition,
            eliminating non-key to non-key transitive dependencies, and guaranteeing lossless join with dependency preservation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Disjunctive Test: Super Key OR Prime Attribute
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Zero Transitive Non-Key Dependencies
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Lossless Join Guaranteed
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 100% Dependency Preservation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: 3NF Mathematical Formulation & Mechanics ── */}
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
                The 3NF Standard: Two Disjunctive Conditions
              </h2>
              <p className="text-xs text-slate-400">
                For every non-trivial FD X → A, at least one condition MUST be true
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Condition 1 (The Super Key Rule)</span>
              <strong className="text-white text-xs block font-mono">X is a Super Key of R</strong>
              <p className="text-xs text-slate-300">
                The left-hand determinant is a Primary Key or Candidate Key. Every non-prime attribute depends directly on the table's key.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Condition 2 (The Prime Attribute Rule)</span>
              <strong className="text-white text-xs block font-mono">A is a Prime Attribute of R</strong>
              <p className="text-xs text-slate-300">
                The right-hand dependent is a member of some Candidate Key. Allows overlapping keys to be preserved in 3NF.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 3NF Evaluation Flow Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: 3NF Disjunctive Condition Evaluation Logic &amp; Relational Synthesis
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="3NF Evaluation Logic Flow"
            >
              {/* Input FD */}
              <g transform="translate(20, 30)">
                <rect width="160" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="80" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Input Non-Trivial FD</text>
                <text x="15" y="48" fill="#cbd5e1" fontSize="12" fontWeight="bold">X → A</text>
                <text x="15" y="68" fill="#94a3b8" fontSize="9">Test 3NF Compliance</text>
              </g>

              {/* Arrow */}
              <g transform="translate(185, 60)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="35,6 45,10 35,14" fill="#38bdf8" />
              </g>

              {/* Condition 1 Box */}
              <g transform="translate(235, 20)">
                <rect width="180" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="90" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Condition 1 Check</text>
                <text x="90" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">Is X a Super Key?</text>
              </g>

              {/* Pass 1 Arrow */}
              <g transform="translate(420, 35)">
                <line x1="0" y1="10" x2="100" y2="10" stroke="#10b981" strokeWidth="2" />
                <polygon points="100,6 110,10 100,14" fill="#10b981" />
                <text x="50" y="0" fill="#10b981" textAnchor="middle" fontSize="8" fontWeight="bold">YES ➔ PASS</text>
              </g>

              {/* Condition 2 Box */}
              <g transform="translate(235, 80)">
                <rect width="180" height="50" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="90" y="20" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Condition 2 Check</text>
                <text x="90" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">Is A a Prime Attribute?</text>
              </g>

              {/* Pass 2 Arrow */}
              <g transform="translate(420, 95)">
                <line x1="0" y1="10" x2="100" y2="10" stroke="#818cf8" strokeWidth="2" />
                <polygon points="100,6 110,10 100,14" fill="#818cf8" />
                <text x="50" y="0" fill="#818cf8" textAnchor="middle" fontSize="8" fontWeight="bold">YES ➔ PASS</text>
              </g>

              {/* Final 3NF Verdict Box */}
              <g transform="translate(535, 20)">
                <rect width="225" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="112" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">3NF VERDICT</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="9">If Either Condition Holds ➔ 3NF Valid</text>
                <text x="12" y="65" fill="#fca5a5" fontSize="9">If Both Fail ➔ 3NF VIOLATION ❌</text>
                <text x="12" y="85" fill="#38bdf8" fontSize="9">Cure: Decompose R into (X, A)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 3NF Evaluator Sandbox ──────── */}
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
                Interactive 3NF Evaluator &amp; Decomposition Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test functional dependencies against Condition 1 and Condition 2 to observe 3NF verification proofs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFdKey("fd_student_key")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_student_key"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Super Key (Cond 1) ✓
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_transitive_dept")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_transitive_dept"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Transitive Non-Key ❌
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_prime_attr")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_prime_attr"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Prime Attr (Cond 2) ✓
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_3nf_clean")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_3nf_clean"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. 3NF Decomposed Schema
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: 3NF Condition Checks */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentEval.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentEval.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentEval.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Condition 1 (Is LHS a Super Key?):</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentEval.cond1Check}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Condition 2 (Is RHS a Prime Attribute?):</span>
                      <p className="text-indigo-300 font-mono mt-0.5">{currentEval.cond2Check}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Evaluation Rationale:</span>
                      <p className="text-slate-300 mt-0.5">{currentEval.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Architectural Action & SQL Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    3NF Relational Decomposition Strategy
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentEval.sqlAction}
                  </pre>
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
                How Barrackpore and Kolkata training institutes eliminate transitive dependencies in production databases
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Admission &amp; Department Normalization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing transitive dependency <code>student_id → department_id → {`{dept_name, head, building}`}</code>:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 3NF Departments Master Table:
CREATE TABLE departments (
    department_id VARCHAR(10) PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_head VARCHAR(100) NOT NULL,
    building_block VARCHAR(50) NOT NULL
);

-- 3NF Students Table (department_id is Foreign Key):
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    department_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Shipping Address &amp; Zip Code Master
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Eliminating transitive dependency <code>order_id → zip_code → {`{city, state}`}</code>:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 3NF Zip Code Master:
CREATE TABLE zip_codes (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL
);

-- Orders Table:
CREATE TABLE orders (
    order_id VARCHAR(10) PRIMARY KEY,
    customer_id VARCHAR(10) NOT NULL,
    order_date DATE NOT NULL,
    shipping_zip VARCHAR(10) NOT NULL,
    FOREIGN KEY (shipping_zip) REFERENCES zip_codes(zip_code)
);`}
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
                Guidelines for detecting transitive dependencies and implementing 3NF schemas
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
                  <strong className="text-white">1. Leaving Non-Key Determinants in the Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Keeping <code>dept_head</code> or <code>city</code> in the main table causes massive update desynchronizations.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Condition 2 (Prime Attributes):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forcing decomposition on FDs where the RHS is a prime attribute can break dependency preservation.
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
                  <strong className="text-white">1. Promoted Determinants Become Primary Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Whenever a non-key column determines other attributes, move it into its own table with that column as the Primary Key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Maintain Foreign Key Constraints:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always link the original table back to the new master table via Foreign Keys to guarantee referential integrity.
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
              <span>3NF requires 2NF compliance + zero transitive dependencies between non-prime attributes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>3NF Rule: For every non-trivial X → A, either X is a Super Key OR A is a Prime Attribute</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Non-key columns must NEVER determine other non-key columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decompose by promoting the non-key determinant into a Primary Key in its own table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>3NF mathematically guarantees BOTH Lossless Join and Dependency Preservation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The standard normal form for enterprise Online Transaction Processing (OLTP) databases</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Third Normal Form (3NF) – FAQs"
            questions={questions}
            subtitle="Master Third Normal Form (3NF), transitive dependencies, the Super Key OR Prime Attribute disjunctive condition, and 3NF synthesis with 30 comprehensive Q&As"
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
            title="Third Normal Form (3NF): Eliminating Transitive Dependencies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_third_normal_form_3nf_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Third Normal Form (3NF) is the gold standard for production database systems! " +
              "In my classes at Coder & AccoTax in Barrackpore, I emphasize the core rule: " +
              "'If a column is not the primary key, it has no business determining any other column in that table.' " +
              "When you see `department_id` determining `department_name` and `department_head` in a student table, " +
              "that is an unmistakable 3NF transitive violation. " +
              "Extract the department into its own master table with `department_id` as the primary key. " +
              "By achieving 3NF, your database is mathematically guaranteed to be free of transitive anomalies while preserving all business rules!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · Third Normal Form (3NF) · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
