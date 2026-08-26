import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Full Functional Dependency vs Partial Dependency
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Partial Dependency Analyzer Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Partial Dependency Analyzer State
  const [selectedFdKey, setSelectedFdKey] = useState("fd_grade_full"); // "fd_grade_full" | "fd_student_partial" | "fd_course_partial" | "fd_2nf_solution"

  const dependencyAnalysis = {
    fd_grade_full: {
      notation: "(student_id, course_id) → final_grade",
      determinant: "(student_id, course_id) [COMPOSITE PK]",
      dependent: "final_grade",
      dependencyType: "FULL FUNCTIONAL DEPENDENCY (FFD)",
      typeBadge: "2NF COMPLIANT",
      badgeColor: "emerald",
      subsetProof: "student_id ↛ final_grade  AND  course_id ↛ final_grade",
      explanation: "A student's final grade in a specific course cannot be known by student_id alone or course_id alone. Both attributes of the composite primary key are mandatory to determine the grade.",
      sqlAction: "Retained in Enrollments junction table with Composite Primary Key (student_id, course_id).",
    },
    fd_student_partial: {
      notation: "student_id → { student_name, student_city }",
      determinant: "student_id (Proper Subset of PK)",
      dependent: "{ student_name, student_city }",
      dependencyType: "PARTIAL DEPENDENCY (2NF VIOLATION)",
      typeBadge: "VIOLATES 2NF",
      badgeColor: "rose",
      subsetProof: "{ student_id } ⊂ { student_id, course_id }",
      explanation: "Student name and city depend solely on student_id. Including them in a table with composite primary key (student_id, course_id) creates severe redundancy and violates 2NF.",
      sqlAction: "Decompose into a dedicated Students table: Students(student_id PK, student_name, student_city).",
    },
    fd_course_partial: {
      notation: "course_id → { course_title, course_fee }",
      determinant: "course_id (Proper Subset of PK)",
      dependent: "{ course_title, course_fee }",
      dependencyType: "PARTIAL DEPENDENCY (2NF VIOLATION)",
      typeBadge: "VIOLATES 2NF",
      badgeColor: "rose",
      subsetProof: "{ course_id } ⊂ { student_id, course_id }",
      explanation: "Course title and tuition fee depend solely on course_id. Storing them in every student enrollment record causes massive update anomalies whenever course fees change.",
      sqlAction: "Decompose into a dedicated Courses table: Courses(course_id PK, course_title, course_fee).",
    },
    fd_2nf_solution: {
      notation: "Decomposed 2NF Architecture (3 Clean Tables)",
      determinant: "Single-Attribute PKs & Composite Junction",
      dependent: "All Non-Prime Attributes",
      dependencyType: "100% FULL FUNCTIONAL DEPENDENCIES",
      typeBadge: "PERFECT 2NF",
      badgeColor: "emerald",
      subsetProof: "All non-prime attributes depend on full candidate keys (0 partial dependencies)",
      explanation: "Original unnormalized table decomposed into Students, Courses, and Enrollments. Every non-prime attribute is fully functionally dependent on its respective table's candidate key.",
      sqlAction: "1. Students(student_id PK, name, city) | 2. Courses(course_id PK, title, fee) | 3. Enrollments(student_id FK, course_id FK, grade PK=(student_id, course_id)).",
    },
  };

  const currentAnalysis = dependencyAnalysis[selectedFdKey];

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
            Module 002_004 · Database Normalization · Topic 4
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Full vs Partial:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Functional Dependencies &amp; 2NF
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the core mechanism of Second Normal Form (2NF): identifying partial dependencies on composite candidate keys,
            verifying full functional dependencies, and decomposing relations into clean entity boundaries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Full Functional Dependency (FFD)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Partial Dependency (2NF Violation)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Composite Primary Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪜 2NF Decomposition Flow
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Full vs Partial Mathematical Theory ────── */}
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
                Full vs Partial Dependencies &amp; The 2NF Standard
              </h2>
              <p className="text-xs text-slate-400">
                Why non-prime attributes must depend on the entirety of composite candidate keys
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Full Functional Dependency</span>
              <strong className="text-white text-xs block font-mono">{"(A, B) → C  (Both Keys Required)"}</strong>
              <p className="text-xs text-slate-300">
                Removing either attribute A or B causes the dependency to break. Attribute C is fully dependent on the entire composite key.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Partial Dependency</span>
              <strong className="text-white text-xs block font-mono">{"A → D  where PK = (A, B)"}</strong>
              <p className="text-xs text-slate-300">
                Attribute D depends on a proper subset (A) of the composite key. This causes data redundancy and violates 2NF.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Partial vs Full Dependency Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Composite Primary Key Subsets &amp; 2NF Violations
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Partial vs Full Dependency Diagram"
            >
              {/* Composite Primary Key Box */}
              <g transform="translate(30, 25)">
                <rect width="220" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="220" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" />
                <text x="110" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Composite PK: (student_id, course_id)</text>

                <rect x="15" y="38" width="85" height="30" rx="4" fill="#0f172a" stroke="#f43f5e" />
                <text x="57" y="56" fill="#fca5a5" textAnchor="middle" fontSize="10">student_id</text>

                <rect x="120" y="38" width="85" height="30" rx="4" fill="#0f172a" stroke="#f43f5e" />
                <text x="162" y="56" fill="#fca5a5" textAnchor="middle" fontSize="10">course_id</text>

                <text x="110" y="95" fill="#94a3b8" textAnchor="middle" fontSize="9">Both Needed for Final Grade</text>
              </g>

              {/* Partial Arrow 1: student_id &rarr; name */}
              <g transform="translate(255, 45)">
                <line x1="0" y1="0" x2="100" y2="-15" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="100,-20 115,-15 100,-10" fill="#f43f5e" />
                <text x="50" y="-20" fill="#f43f5e" fontSize="9" fontWeight="bold">PARTIAL: sid → name</text>
              </g>

              {/* Dependent Box 1: student_name */}
              <g transform="translate(375, 15)">
                <rect width="180" height="32" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="90" y="20" fill="#fca5a5" textAnchor="middle" fontWeight="bold">student_name, city</text>
              </g>

              {/* Full Arrow: (sid, cid) &rarr; grade */}
              <g transform="translate(255, 75)">
                <line x1="0" y1="0" x2="100" y2="0" stroke="#10b981" strokeWidth="3" />
                <polygon points="100,-5 115,0 100,5" fill="#10b981" />
                <text x="50" y="-8" fill="#10b981" fontSize="9" fontWeight="bold">FULL: (sid,cid) → grade</text>
              </g>

              {/* Dependent Box 2: final_grade */}
              <g transform="translate(375, 60)">
                <rect width="180" height="32" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="90" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">final_grade (2NF Safe)</text>
              </g>

              {/* Partial Arrow 2: course_id &rarr; fee */}
              <g transform="translate(255, 105)">
                <line x1="0" y1="0" x2="100" y2="15" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="100,10 115,15 100,20" fill="#f43f5e" />
                <text x="50" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">PARTIAL: cid → fee</text>
              </g>

              {/* Dependent Box 3: course_title, fee */}
              <g transform="translate(375, 105)">
                <rect width="180" height="32" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="90" y="20" fill="#fca5a5" textAnchor="middle" fontWeight="bold">course_title, fee</text>
              </g>

              {/* 2NF Action Tag */}
              <g transform="translate(580, 50)">
                <rect width="170" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="85" y="20" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">2NF CURE:</text>
                <text x="85" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">Split into 3 Dedicated Tables</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Dependency Analyzer Sandbox ─── */}
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
                Interactive Partial vs Full Dependency Analyzer
              </h2>
              <p className="text-xs text-slate-400">
                Analyze candidate dependencies, inspect subset proofs, and view 2NF decomposition strategies
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Dependency Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFdKey("fd_grade_full")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_grade_full"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Full: (sid, cid) → grade
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_student_partial")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_student_partial"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Partial: sid → name, city
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_course_partial")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_course_partial"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Partial: cid → title, fee
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_2nf_solution")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_2nf_solution"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. 2NF Decomposed Solution
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Analysis Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentAnalysis.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentAnalysis.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentAnalysis.typeBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Dependency Classification:</span>
                      <p className="text-white font-bold mt-0.5">{currentAnalysis.dependencyType}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Mathematical Subset Proof:</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentAnalysis.subsetProof}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Evaluation Rationale:</span>
                      <p className="text-slate-300 mt-0.5">{currentAnalysis.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Architectural Action & SQL Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    2NF Normalization &amp; SQL Schema Strategy
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Determinant Role:</span>
                      <p className="font-mono text-cyan-400">{currentAnalysis.determinant}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Dependent Target:</span>
                      <p className="font-mono text-emerald-400">{currentAnalysis.dependent}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Decomposition Remedy:</span>
                      <p className="font-mono text-amber-300 mt-0.5 text-[11px]">{currentAnalysis.sqlAction}</p>
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
                How Barrackpore and Kolkata training institutes eliminate partial dependencies to reach 2NF
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Roster 2NF Decomposition
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing partial dependency <code>student_id → student_name, city</code> into a dedicated Students table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 1. Dedicated Students Table (No partial dependencies):
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);

-- 2. Dedicated Courses Table:
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);

-- 3. Enrollments Junction (Pure Full Dependency on Composite Key):
CREATE TABLE enrollments (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    final_grade VARCHAR(5) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Items &amp; Product Pricing Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Eliminating partial dependency <code>product_id → product_name, unit_price</code> from the order lines table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Decomposing Order Lines to 2NF:
CREATE TABLE products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE order_items (
    order_id VARCHAR(10),
    product_id VARCHAR(10),
    quantity INT NOT NULL, -- Fully dependent on (order_id, product_id)
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
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
                Guidelines for detecting partial dependencies and achieving Second Normal Form
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
                  <strong className="text-white">1. Searching for Partial FDs in Single-PK Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If the primary key is single-column, the table is automatically in 2NF (zero composite subsets exist).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Foreign Keys During Decomposition:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Failing to define Foreign Keys in the junction table creates disconnected, orphaned records.
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
                  <strong className="text-white">1. Audit Every Composite Candidate Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Check every non-prime attribute to verify whether it depends on the ENTIRE composite key or just a part.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Create Clean Junction Tables for M:N Relationships:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store only relationship attributes (e.g. <code>quantity</code>, <code>grade</code>, <code>enrolled_at</code>) in junction tables.
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
              <span>Full Functional Dependency: Y depends on the ENTIRE composite determinant X</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partial Dependency: Y depends on a proper subset of composite determinant X</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partial dependencies can ONLY exist when candidate keys are composite</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Second Normal Form (2NF) strictly eliminates all partial dependencies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Single-column primary key tables are automatically in 2NF</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decompose partial dependencies into dedicated parent tables linked by Foreign Keys</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Full vs Partial Dependencies – FAQs"
            questions={questions}
            subtitle="Master Full Functional Dependencies (FFD), Partial Dependencies, composite candidate keys, 2NF compliance, and relational decomposition with 30 comprehensive Q&As"
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
            title="Full Functional Dependency vs Partial Dependency"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_full_vs_partial_dependency_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Second Normal Form (2NF) is all about respecting the full composite primary key! " +
              "In my classes at Coder & AccoTax in Barrackpore, I give students a simple rule of thumb: " +
              "'If your table has a composite key (student_id, course_id), every other column must require BOTH pieces of information to exist.' " +
              "Does a student's name need course_id? NO! That is a Partial Dependency. " +
              "Does a course's fee need student_id? NO! That is a Partial Dependency. " +
              "Does a student's final grade need both student_id and course_id? YES! That is a Full Functional Dependency. " +
              "Move the partial attributes into their own dedicated tables, and you have achieved pristine 2NF!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · Full vs Partial FDs · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
