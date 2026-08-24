import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Transitive Functional Dependencies (X → Y and Y → Z)
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Transitive Dependency Analyzer Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Transitive Analyzer State
  const [selectedChainKey, setSelectedChainKey] = useState("chain_transitive"); // "chain_direct" | "chain_nonkey" | "chain_transitive" | "chain_3nf_solution"

  const transitiveAnalysis = {
    chain_direct: {
      notation: "student_id → department_id",
      lhsRole: "Primary Key (X)",
      rhsRole: "Foreign Key Attribute (Y)",
      statusBadge: "DIRECT KEY DEPENDENCY",
      badgeColor: "emerald",
      chainDescription: "Direct functional dependency where the Primary Key determines the student's department code.",
      explanation: "This is a direct dependency on the primary key and satisfies all normal forms.",
      sqlSchema: "-- Valid direct foreign key linkage in Students table.",
    },
    chain_nonkey: {
      notation: "department_id → { dept_name, dept_head, building }",
      lhsRole: "Non-Key Attribute in Students table (Y)",
      rhsRole: "Department Entity Details (Z)",
      statusBadge: "NON-KEY DETERMINANT",
      badgeColor: "amber",
      chainDescription: "A non-prime attribute (department_id) is acting as a determinant for other non-prime attributes.",
      explanation: "When stored inside the Students table, department_id is not a candidate key. This causes massive redundancy and violates 3NF.",
      sqlSchema: "-- Root cause of 3NF violation inside Students table.",
    },
    chain_transitive: {
      notation: "student_id → department_id ➔ department_head",
      lhsRole: "Primary Key (X) ➔ Intermediate (Y) ➔ Dependent (Z)",
      rhsRole: "Indirect Transitive Chain (X → Z)",
      statusBadge: "3NF VIOLATION (TRANSITIVE)",
      badgeColor: "rose",
      chainDescription: "student_id determines department_head only indirectly through department_id.",
      explanation: "If Computer Science department head changes from 'Dr. A. Roy' to 'Dr. P. Sen', all 500 enrolled students must be updated. This creates severe update, insertion, and deletion anomalies.",
      sqlSchema: "-- Violates 3NF: department_head must be separated into a master Departments table.",
    },
    chain_3nf_solution: {
      notation: "Decomposed 3NF Architecture (Students + Departments)",
      lhsRole: "Students(student_id PK, name, dept_id FK)",
      rhsRole: "Departments(dept_id PK, name, head, building)",
      statusBadge: "100% 3NF COMPLIANT",
      badgeColor: "emerald",
      chainDescription: "Transitive dependency eliminated by splitting into 2 normalized tables.",
      explanation: "Every non-prime attribute is directly dependent on its table's primary key. Zero transitive chains, zero update anomalies, and 100% data integrity.",
      sqlSchema: `-- 3NF Decomposed Schema:
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

  const currentChain = transitiveAnalysis[selectedChainKey];

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
            Module 002_004 · Database Normalization · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Transitive Dependencies:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Chains (X → Y and Y → Z) &amp; 3NF
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Third Normal Form (3NF): recognizing transitive dependency chains where non-key attributes determine other non-key attributes,
            evaluating 3NF conditions, and decomposing schemas into pristine entity boundaries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Transitive Chain: X → Y ➔ Y → Z
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Non-Key Determining Non-Key
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ 3NF Rule: Super Key OR Prime Attribute
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Lossless Join &amp; Dependency Preservation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Transitive Dependency Mathematical Theory ── */}
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
                The Mechanics of Transitive Dependencies &amp; 3NF
              </h2>
              <p className="text-xs text-slate-400">
                Why indirect functional dependencies create critical update and deletion vulnerabilities
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-teal-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Primary Key (X)</span>
              <strong className="text-white text-xs block font-mono">student_id (PK)</strong>
              <p className="text-[11px] text-slate-400">The root primary key that uniquely identifies each individual student row.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Intermediate Non-Key (Y)</span>
              <strong className="text-white text-xs block font-mono">department_id</strong>
              <p className="text-[11px] text-slate-400">Determined by X, but is NOT a candidate key. Acts as the transitive bridge.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">3. Transitive Dependent (Z)</span>
              <strong className="text-white text-xs block font-mono">dept_head, building</strong>
              <p className="text-[11px] text-slate-400">Determined by Y. Indirectly dependent on X ($X \rightarrow Y \rightarrow Z$). Violates 3NF.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Transitive Chain Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Transitive Dependency Chain (X → Y → Z) &amp; 3NF Cure
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Transitive Dependency Diagram"
            >
              {/* Primary Key Box X */}
              <g transform="translate(20, 25)">
                <rect width="180" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="180" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" />
                <text x="90" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Primary Key (X)</text>
                <text x="15" y="48" fill="#cbd5e1" fontSize="11">student_id (#101)</text>
                <text x="15" y="68" fill="#94a3b8" fontSize="10">student_name</text>
              </g>

              {/* Arrow X -> Y */}
              <g transform="translate(205, 55)">
                <line x1="0" y1="15" x2="60" y2="15" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="60,10 75,15 60,20" fill="#38bdf8" />
                <text x="35" y="0" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold">X → Y</text>
              </g>

              {/* Intermediate Box Y */}
              <g transform="translate(285, 25)">
                <rect width="180" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="180" height="24" rx="8" fill="#0f172a" stroke="#f59e0b" />
                <text x="90" y="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Non-Key Attribute (Y)</text>
                <text x="15" y="48" fill="#fde68a" fontSize="11">department_id (D01)</text>
                <text x="15" y="68" fill="#f59e0b" fontSize="10">Non-Key Determinant!</text>
              </g>

              {/* Arrow Y -> Z */}
              <g transform="translate(470, 55)">
                <line x1="0" y1="15" x2="60" y2="15" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 3" />
                <polygon points="60,10 75,15 60,20" fill="#f43f5e" />
                <text x="35" y="0" fill="#f43f5e" textAnchor="middle" fontSize="9" fontWeight="bold">Y → Z (3NF FAIL)</text>
              </g>

              {/* Transitive Box Z */}
              <g transform="translate(550, 25)">
                <rect width="210" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="210" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="105" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Transitive Target (Z)</text>
                <text x="15" y="48" fill="#fca5a5" fontSize="11">department_name</text>
                <text x="15" y="68" fill="#fca5a5" fontSize="11">department_head, building</text>
              </g>

              {/* 3NF Cure Curved Arc */}
              <g transform="translate(0, 0)">
                <path d="M 110,25 Q 375,-15 655,25" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <text x="375" y="5" fill="#c084fc" textAnchor="middle" fontSize="9" fontWeight="bold">Indirect Transitive Dependency: X → Z</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Transitive Analyzer Sandbox ─── */}
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
                Interactive Transitive Dependency Analyzer
              </h2>
              <p className="text-xs text-slate-400">
                Inspect transitive chains, test 3NF conditions, and observe how normalization separates non-key entities
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Chain Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedChainKey("chain_direct")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedChainKey === "chain_direct"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Direct: sid → dept_id
              </button>

              <button
                onClick={() => setSelectedChainKey("chain_nonkey")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedChainKey === "chain_nonkey"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Non-Key: dept_id → head
              </button>

              <button
                onClick={() => setSelectedChainKey("chain_transitive")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedChainKey === "chain_transitive"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Transitive: sid ➔ head
              </button>

              <button
                onClick={() => setSelectedChainKey("chain_3nf_solution")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedChainKey === "chain_3nf_solution"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. 3NF Decomposed Schema
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Chain Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentChain.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentChain.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentChain.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentChain.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Chain Architecture:</span>
                      <p className="text-white font-bold mt-0.5">{currentChain.chainDescription}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Evaluation Rationale:</span>
                      <p className="text-slate-300 mt-0.5">{currentChain.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: SQL Decomposition Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    3NF SQL Decomposition Strategy
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Determinant (LHS):</span>
                      <p className="font-mono text-cyan-400">{currentChain.lhsRole}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Dependent (RHS):</span>
                      <p className="font-mono text-emerald-400">{currentChain.rhsRole}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="font-mono text-emerald-400 mt-1 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
                        {currentChain.sqlSchema}
                      </pre>
                    </div>
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
                How Barrackpore and Kolkata training institutes eliminate transitive dependencies to reach 3NF
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Department Head Update Anomaly Cure
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                When the CS Department Head changes, 3NF ensures exactly 1 row update in the <code>departments</code> table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Atomic update in 3NF Departments table:
UPDATE departments
SET department_head = 'Dr. Pravin Sen'
WHERE department_id = 'D01';
-- 1 row affected! Automatically reflected across all 500 enrolled students.`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Employee Zip Code &amp; City Normalization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing transitive dependency <code>emp_id → zip_code → {`{city, state}`}</code>:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 3NF Zip Code Master Table:
CREATE TABLE zip_codes (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL
);

-- Employee Table (zip_code is Foreign Key):
CREATE TABLE employees (
    emp_id VARCHAR(10) PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (zip_code) REFERENCES zip_codes(zip_code)
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
                Guidelines for identifying and eliminating transitive dependencies
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
                    Keeping <code>dept_head</code> in the Students table causes update desynchronizations.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Confusing 2NF Partial with 3NF Transitive:</strong>
                  <p className="text-slate-400 mt-0.5">
                    2NF deals with parts of composite keys; 3NF deals with non-key columns determining other non-key columns.
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
                  <strong className="text-white">1. Every Determinant Must Be A Candidate Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In 3NF/BCNF, ensure that any attribute that determines other attributes is promoted to a Primary Key in its own table.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Retain Foreign Key Linkages:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always keep the determinant attribute as a Foreign Key in the original table to maintain relational integrity.
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
              <span>{"Transitive Dependency: X → Y and Y → Z implies indirect dependency X → Z"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Occurs when a non-prime attribute determines another non-prime attribute</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Third Normal Form (3NF) strictly eliminates all transitive dependencies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>3NF Condition: For every X → A, either X is a Super Key OR A is a Prime Attribute</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decompose by creating a dedicated table where Y becomes the Primary Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Retain Y as a Foreign Key in the original relation to preserve lossless join</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Transitive Dependencies – FAQs"
            questions={questions}
            subtitle="Master Transitive Functional Dependencies (X → Y → Z), non-key determinants, 3NF compliance conditions, and relational decomposition with 30 comprehensive Q&As"
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
            title="Transitive Functional Dependencies (X → Y and Y → Z)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_transitive_dependencies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Third Normal Form (3NF) is the true workhorse of production relational database engineering! " +
              "In my classroom in Barrackpore, I share the classic mantra of database normalization: " +
              "'Every non-key attribute must provide a fact about the key, the whole key (2NF), and nothing but the key (3NF), so help me Codd!' " +
              "When you see a column like `department_head` in a student table, ask yourself: 'Is the department head a property of the student?' " +
              "Of course not! It is a property of the department. " +
              "Move the department entity into its own table with `department_id` as the primary key, " +
              "and your database will be completely immune to transitive update anomalies!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · Transitive Dependencies · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
