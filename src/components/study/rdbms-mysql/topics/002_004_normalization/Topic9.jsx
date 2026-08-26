import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Second Normal Form (2NF): Eliminating Partial Dependencies
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 2NF Decomposition Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive 2NF Simulator State
  const [selectedDecompKey, setSelectedDecompKey] = useState("decomp_2nf_all"); // "decomp_student_part" | "decomp_course_part" | "decomp_grade_full" | "decomp_2nf_all"

  const decompScenarios = {
    decomp_student_part: {
      title: "1. Student Profile Partial Dependency",
      notation: "student_id → { student_name, student_city }",
      determinantRole: "student_id (Proper Subset of Composite PK)",
      dependentRole: "Non-Prime Attributes (name, city)",
      statusBadge: "VIOLATES 2NF (PARTIAL DEPENDENCY)",
      badgeColor: "rose",
      anomalyRisk: "Updating Mamata's city requires modifying every course enrollment row she belongs to.",
      remedy: "Decompose student attributes into dedicated Students master table with student_id as Primary Key.",
      sqlCode: `-- 2NF Remedy for Student Partial Dependency:
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    student_city VARCHAR(50) NOT NULL
);`,
    },
    decomp_course_part: {
      title: "2. Course Catalog Partial Dependency",
      notation: "course_id → { course_title, course_fee }",
      determinantRole: "course_id (Proper Subset of Composite PK)",
      dependentRole: "Non-Prime Attributes (title, fee)",
      statusBadge: "VIOLATES 2NF (PARTIAL DEPENDENCY)",
      badgeColor: "rose",
      anomalyRisk: "Fee changes from ₹4,500 to ₹5,000 must be updated across hundreds of enrollment rows.",
      remedy: "Decompose course attributes into dedicated Courses master table with course_id as Primary Key.",
      sqlCode: `-- 2NF Remedy for Course Partial Dependency:
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);`,
    },
    decomp_grade_full: {
      title: "3. Course Grade Full Functional Dependency",
      notation: "(student_id, course_id) → final_grade",
      determinantRole: "(student_id, course_id) [Full Composite Key]",
      dependentRole: "Non-Prime Relationship Attribute (grade)",
      statusBadge: "✓ 100% 2NF COMPLIANT (FULL FD)",
      badgeColor: "emerald",
      anomalyRisk: "Zero anomaly! A grade exists only as a property of a specific student in a specific course.",
      remedy: "Retained inside the Enrollments junction table with Composite Primary Key (student_id, course_id).",
      sqlCode: `-- 2NF Junction Table for Full Functional Dependency:
CREATE TABLE enrollments (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    final_grade VARCHAR(5) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`,
    },
    decomp_2nf_all: {
      title: "4. Complete 2NF Normalized Architecture",
      notation: "Students (1:N) ➔ Enrollments (N:1) ➔ Courses",
      determinantRole: "Single-Attribute PKs & Composite Junction Key",
      dependentRole: "All Non-Prime Attributes Fully Dependent",
      statusBadge: "✓ PERFECT 2NF ARCHITECTURE",
      badgeColor: "emerald",
      anomalyRisk: "Zero redundancy! Complete protection against insertion, update, and deletion anomalies.",
      remedy: "Original 1NF table partitioned into 3 clean, highly cohesive relational tables.",
      sqlCode: `-- Complete 2NF Production Schema:
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);

CREATE TABLE enrollments (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    final_grade VARCHAR(5) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`,
    },
  };

  const currentDecomp = decompScenarios[selectedDecompKey];

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
            Module 002_004 · Database Normalization · Topic 9
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Second Normal Form (2NF):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Eliminating Partial Dependencies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the rules, mechanics, and decomposition algorithms of Second Normal Form (2NF): isolating composite primary key subsets,
            preventing parent entity duplication, and establishing clean junction tables.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              1NF Baseline Required
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Zero Partial Dependencies on Candidate Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Composite Primary Keys Focus
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Heath's Theorem Lossless Join
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: 2NF Mechanics & Decomposition Theory ───── */}
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
                The 2NF Standard &amp; Relational Decomposition Algorithm
              </h2>
              <p className="text-xs text-slate-400">
                Every non-prime attribute must depend on the whole key, not just a proper subset
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">The 2NF Violation (Partial FD)</span>
              <strong className="text-white text-xs block font-mono">{"student_id → student_name  (when PK is (sid, cid))"}</strong>
              <p className="text-xs text-slate-300">
                A non-prime column depends on only part of the composite primary key. Repeating this column across multiple enrollment tuples creates massive update anomalies.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The 2NF Solution (Full FD)</span>
              <strong className="text-white text-xs block font-mono">{"(sid, cid) → grade  (Both Keys Required)"}</strong>
              <p className="text-xs text-slate-300">
                Extract the partial dependency into a dedicated Students table, leaving only relationship attributes that require the full composite key in Enrollments.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 2NF Decomposition Flow Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: 2NF Decomposition of Unnormalized Composite Tables into 3 Clean Entities
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="2NF Decomposition Diagram"
            >
              {/* Unnormalized 1NF Table */}
              <g transform="translate(15, 20)">
                <rect width="230" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="230" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="115" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">1NF Table (Violates 2NF)</text>
                <text x="10" y="45" fill="#38bdf8" fontSize="10">PK: (student_id, course_id)</text>
                <text x="10" y="65" fill="#fca5a5" fontSize="10">Partial: sid → name, city ❌</text>
                <text x="10" y="85" fill="#fca5a5" fontSize="10">Partial: cid → title, fee ❌</text>
                <text x="10" y="105" fill="#10b981" fontSize="10">Full: (sid, cid) → grade ✓</text>
              </g>

              {/* Arrow */}
              <g transform="translate(255, 65)">
                <line x1="0" y1="10" x2="45" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="45,5 60,10 45,15" fill="#10b981" />
                <text x="25" y="-5" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">2NF CURE</text>
              </g>

              {/* Students Master Table */}
              <g transform="translate(330, 10)">
                <rect width="190" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="190" height="20" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="95" y="14" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Students (Master PK = sid)</text>
                <text x="10" y="38" fill="#cbd5e1" fontSize="9">student_id [PK], name, city</text>
                <text x="10" y="52" fill="#a7f3d0" fontSize="8">Full FD on student_id</text>
              </g>

              {/* Courses Master Table */}
              <g transform="translate(330, 80)">
                <rect width="190" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="190" height="20" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="95" y="14" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Courses (Master PK = cid)</text>
                <text x="10" y="38" fill="#cbd5e1" fontSize="9">course_id [PK], title, fee</text>
                <text x="10" y="52" fill="#a7f3d0" fontSize="8">Full FD on course_id</text>
              </g>

              {/* Enrollments Junction Table */}
              <g transform="translate(545, 35)">
                <rect width="220" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="220" height="22" rx="8" fill="#0f172a" stroke="#38bdf8" />
                <text x="110" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Enrollments (2NF Junction)</text>
                <text x="10" y="42" fill="#cbd5e1" fontSize="9">student_id [FK] ➔ Students</text>
                <text x="10" y="58" fill="#cbd5e1" fontSize="9">course_id [FK] ➔ Courses</text>
                <text x="10" y="74" fill="#10b981" fontSize="9" fontWeight="bold">final_grade (Full FD on sid, cid)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 2NF Simulator Sandbox ──────── */}
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
                Interactive 2NF Decomposition Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Inspect partial dependencies, observe anomaly risks, and view the equivalent 2NF production SQL DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedDecompKey("decomp_student_part")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_student_part"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Student Partial FD ❌
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_course_part")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_course_part"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Course Partial FD ❌
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_grade_full")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_grade_full"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Grade Full FD ✓
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_2nf_all")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_2nf_all"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. 2NF Decomposed Schema
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Dependency & Anomaly Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentDecomp.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentDecomp.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentDecomp.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Dependency Notation:</span>
                      <p className="text-cyan-300 font-mono font-bold mt-0.5">{currentDecomp.notation}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Determinant vs Dependent:</span>
                      <p className="text-slate-300 font-mono text-[11px] mt-0.5">
                        LHS: {currentDecomp.determinantRole} ➔ RHS: {currentDecomp.dependentRole}
                      </p>
                    </div>

                    <div>
                      <span className="text-rose-400 block text-[11px] uppercase font-bold">Production Anomaly Risk:</span>
                      <p className="text-slate-300 mt-0.5">{currentDecomp.anomalyRisk}</p>
                    </div>

                    <div>
                      <span className="text-emerald-400 block text-[11px] uppercase font-bold">2NF Normalization Remedy:</span>
                      <p className="text-white font-bold mt-0.5">{currentDecomp.remedy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: SQL DDL Implementation */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    2NF Normalized SQL DDL Schema
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentDecomp.sqlCode}
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
                How Barrackpore and Kolkata training institutes eliminate partial dependencies in production databases
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Course Fee Update in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                In 2NF, changing a course fee modifies exactly 1 row in the <code>courses</code> table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Atomic Course Fee Update:
UPDATE courses
SET course_fee = 5000.00
WHERE course_id = 'C101';
-- Exactly 1 row updated! Zero risk of desynchronized student enrollment fees.`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Items Quantity vs Product Catalog
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Separating product descriptions from individual line-item order quantities:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Querying 2NF Normalized Order Details:
SELECT 
    oi.order_id,
    p.product_name,
    p.unit_price,
    oi.quantity,
    (p.unit_price * oi.quantity) AS line_total
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
WHERE oi.order_id = 'ORD9021';`}
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
                Guidelines for identifying partial dependencies and implementing 2NF schemas
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
                  <strong className="text-white">1. Searching 2NF Violations in Single-PK Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If the primary key is single-column, the table is automatically in 2NF (zero composite subsets exist).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Foreign Keys in Junction Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Failing to define Foreign Key constraints leads to orphaned records and broken referential integrity.
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
                    Examine each non-prime column to verify whether it requires the ENTIRE composite key to exist.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Separate Entity Data from Relationship Data:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store entity properties (name, city, fee) in master tables; store only relationship facts (grade, qty) in junction tables.
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
              <span>2NF requires 1NF compliance + zero partial dependencies on candidate keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partial Dependency: Non-prime attribute determined by a proper subset of a composite key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Single-attribute primary key tables in 1NF are automatically in 2NF</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decompose partial dependencies into dedicated parent tables where the subset becomes PK</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Retain foreign keys in junction tables to guarantee lossless joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>2NF eliminates parent entity duplication and resolves modification anomalies</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Second Normal Form (2NF) – FAQs"
            questions={questions}
            subtitle="Master Second Normal Form (2NF), partial dependencies on composite candidate keys, prime vs non-prime attributes, and relational decomposition with 30 comprehensive Q&As"
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
            title="Second Normal Form (2NF): Eliminating Partial Dependencies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_second_normal_form_2nf_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Second Normal Form (2NF) is all about respecting the full composite key! " +
              "In my classes at Coder & AccoTax in Barrackpore, I teach students a simple mental check: " +
              "'Look at your composite primary key (student_id, course_id). " +
              "Now point at every other column and ask: Does this fact need BOTH keys to exist?' " +
              "Does student_name need course_id? NO! It depends only on student_id. That is a 2NF violation! " +
              "Does course_fee need student_id? NO! It depends only on course_id. That is a 2NF violation! " +
              "Does final_grade need both student_id and course_id? YES! That is a pure full functional dependency. " +
              "Move the partial attributes into their own master tables, link them with foreign keys, and you have achieved pristine 2NF!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · Second Normal Form (2NF) · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
