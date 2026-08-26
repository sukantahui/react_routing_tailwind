import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Specialization & Generalization Constraints: Disjointness (d/o) & Completeness (Total/Partial)
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Specialization Constraints Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive 4-Quadrant Simulator State
  const [selectedConstraintKey, setSelectedConstraintKey] = useState("disjoint_total");

  const constraintScenarios = {
    disjoint_total: {
      title: "Disjoint ('d') & Total (Double Line)",
      symbol: "Circle 'd' + Double Line",
      rule: "Every entity in the Superclass MUST belong to EXACTLY ONE Subclass. Subclasses cannot overlap.",
      example: "Bank_Account ➔ (Savings vs Checking) or Academy Person ➔ (Student vs Faculty)",
      ddl: `-- Disjoint + Total: Enforced via NOT NULL ENUM discriminator\nCREATE TABLE academy_persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    person_role ENUM('Student', 'Faculty') NOT NULL -- Must be one, cannot be both\n) ENGINE=InnoDB;`,
    },
    disjoint_partial: {
      title: "Disjoint ('d') & Partial (Single Line)",
      symbol: "Circle 'd' + Single Line",
      rule: "An entity in the Superclass can belong to AT MOST ONE Subclass, or may belong to no subclass (generic staff).",
      example: "Employee ➔ (Pilot vs Flight_Attendant; Ground staff are unspecialized)",
      ddl: `-- Disjoint + Partial: Enforced via Nullable ENUM discriminator\nCREATE TABLE airline_employees (\n    emp_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    flight_role ENUM('Pilot', 'Flight_Attendant') NULL -- NULL = Ground Staff\n) ENGINE=InnoDB;`,
    },
    overlapping_total: {
      title: "Overlapping ('o') & Total (Double Line)",
      symbol: "Circle 'o' + Double Line",
      rule: "Every entity in the Superclass MUST belong to AT LEAST ONE Subclass, and can belong to MULTIPLE subclasses.",
      example: "Part_Manufacturer ➔ (Supplier and/or Consumer)",
      ddl: `-- Overlapping + Total: Multiple boolean flags + CHECK constraint\nCREATE TABLE part_roles (\n    part_id INT PRIMARY KEY,\n    is_supplier BOOLEAN NOT NULL DEFAULT FALSE,\n    is_consumer BOOLEAN NOT NULL DEFAULT FALSE,\n    CONSTRAINT chk_total CHECK (is_supplier = TRUE OR is_consumer = TRUE)\n) ENGINE=InnoDB;`,
    },
    overlapping_partial: {
      title: "Overlapping ('o') & Partial (Single Line)",
      symbol: "Circle 'o' + Single Line",
      rule: "An entity in the Superclass can belong to ZERO, ONE, or MULTIPLE Subclasses simultaneously.",
      example: "University_Person ➔ (Alumnus and/or Employee)",
      ddl: `-- Overlapping + Partial: Table-Per-Type (Child tables for Alumnus & Employee)\nCREATE TABLE persons (person_id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE alumni (person_id INT PRIMARY KEY, grad_year INT, FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);\nCREATE TABLE employees (person_id INT PRIMARY KEY, salary DECIMAL(10,2), FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);`,
    },
  };

  const current = constraintScenarios[selectedConstraintKey];

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
            Module 002_002 · ER & EER Modeling · Topic 9
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Specialization & Generalization Constraints:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Disjointness (d/o) & Completeness
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the two orthogonal EER specialization constraints: Disjointness (Disjoint 'd' vs Overlapping 'o')
            and Completeness (Total double lines vs Partial single lines), covering all 4 combinations with MySQL DDL mapping.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕ 'd' Disjoint (Mutually Exclusive)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕ 'o' Overlapping (Shared Roles)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ═ Total Completeness (Double Line)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ─ Partial Completeness (Single Line)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 4-Quadrant Specialization Matrix ─────── */}
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
                The 4-Quadrant Specialization Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Disjointness (d/o) crossed with Completeness (Total/Partial)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1 */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Disjoint & Total</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Circle 'd' + Double Line
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Must belong to <strong>EXACTLY ONE</strong> subclass (e.g. Account is either Savings or Checking).
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Disjoint & Partial</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Circle 'd' + Single Line
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Can belong to <strong>AT MOST ONE</strong> subclass, or none (e.g. Pilot, Attendant, or Ground Staff).
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Overlapping & Total</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Circle 'o' + Double Line
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Must belong to <strong>AT LEAST ONE</strong> subclass, and can belong to both (e.g. Supplier / Consumer Part).
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">4. Overlapping & Partial</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Circle 'o' + Single Line
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Can belong to <strong>ZERO, ONE, or MULTIPLE</strong> subclasses (e.g. Alumnus, Employee, or General Public).
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: EER Specialization Matrix ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Disjoint ('d') vs Overlapping ('o') EER Notation
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Disjoint vs Overlapping Diagram"
            >
              {/* Disjoint Diagram */}
              <g transform="translate(40, 10)">
                <rect width="140" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="70" y="19" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">VEHICLE</text>
                <line x1="70" y1="30" x2="70" y2="45" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="70" cy="55" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="58" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="9">d</text>
                <line x1="60" y1="62" x2="25" y2="85" stroke="#38bdf8" />
                <line x1="80" y1="62" x2="115" y2="85" stroke="#38bdf8" />
                <rect x="0" y="85" width="55" height="25" rx="3" fill="#1e293b" stroke="#38bdf8" />
                <text x="27" y="100" fill="#38bdf8" textAnchor="middle" fontSize="8">CAR</text>
                <rect x="90" y="85" width="55" height="25" rx="3" fill="#1e293b" stroke="#38bdf8" />
                <text x="117" y="100" fill="#38bdf8" textAnchor="middle" fontSize="8">TRUCK</text>
                <text x="70" y="122" fill="#cbd5e1" textAnchor="middle" fontSize="9">Disjoint ('d'): Car OR Truck</text>
              </g>

              {/* Overlapping Diagram */}
              <g transform="translate(440, 10)">
                <rect width="140" height="30" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="70" y="19" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">PERSON</text>
                <line x1="70" y1="30" x2="70" y2="45" stroke="#10b981" strokeWidth="2" />
                <circle cx="70" cy="55" r="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="70" y="58" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="9">o</text>
                <line x1="60" y1="62" x2="25" y2="85" stroke="#818cf8" />
                <line x1="80" y1="62" x2="115" y2="85" stroke="#818cf8" />
                <rect x="0" y="85" width="55" height="25" rx="3" fill="#1e293b" stroke="#818cf8" />
                <text x="27" y="100" fill="#818cf8" textAnchor="middle" fontSize="8">STUDENT</text>
                <rect x="90" y="85" width="55" height="25" rx="3" fill="#1e293b" stroke="#818cf8" />
                <text x="117" y="100" fill="#818cf8" textAnchor="middle" fontSize="8">EMPLOYEE</text>
                <text x="70" y="122" fill="#cbd5e1" textAnchor="middle" fontSize="9">Overlapping ('o'): Both allowed</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Matrix Explorer ─────────────── */}
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
                Interactive Specialization Matrix Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Select any of the 4 constraint quadrants to inspect mathematical business rules and MySQL DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* 4 Quadrant Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedConstraintKey("disjoint_total")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedConstraintKey === "disjoint_total"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Disjoint & Total (d, ═)
              </button>
              <button
                onClick={() => setSelectedConstraintKey("disjoint_partial")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedConstraintKey === "disjoint_partial"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Disjoint & Partial (d, ─)
              </button>
              <button
                onClick={() => setSelectedConstraintKey("overlapping_total")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedConstraintKey === "overlapping_total"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Overlapping & Total (o, ═)
              </button>
              <button
                onClick={() => setSelectedConstraintKey("overlapping_partial")}
                className={clsx(
                  "py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedConstraintKey === "overlapping_partial"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Overlapping & Partial (o, ─)
              </button>
            </div>

            {/* Active Details Display */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white">{current.title}</span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {current.symbol}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Constraint Business Rule:</strong>
                  <p className="text-slate-300 text-[11px]">{current.rule}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-400 block mb-0.5">Real-World Case Study:</strong>
                  <p className="text-slate-300 text-[11px]">{current.example}</p>
                </div>
              </div>

              {/* DDL */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational MySQL DDL Implementation Strategy:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-44 overflow-y-auto">
                  {current.ddl}
                </pre>
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
                Academy roles (Disjoint Total) and university alumni (Overlapping Partial) from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Academy (Disjoint & Total: Student vs Faculty)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Every registered academy person must be either a Student or Faculty (never both).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE academy_persons (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    person_role ENUM('Student', 'Faculty') NOT NULL
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata University (Overlapping & Partial: Alumnus & Staff)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                An alumnus can be hired as university staff (holding both roles simultaneously).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE university_persons (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    is_employee BOOLEAN NOT NULL DEFAULT FALSE,
    is_alumnus BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB;`}
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
                Avoid single ENUM columns on overlapping hierarchies and missing total completeness lines
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
                  <strong className="text-white">1. Single ENUM on Overlapping:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>ENUM('Alumnus', 'Staff')</code> prohibits individuals from being both an alumnus and staff.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Double Line on Total:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Single lines imply partial completeness, permitting generic orphan superclass records.
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
                  <strong className="text-white">1. Clearly Label 'd' and 'o' Circles:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Explicitly specify disjointness in the circle to eliminate subclass ambiguity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Double Lines for Mandatory Total:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use double lines to guarantee every superclass instance is partitioned into at least one subclass.
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
              <span>Disjointness specifies if an entity can belong to &gt;1 subclass ('d' vs 'o')</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Completeness specifies if every entity must belong to a subclass (Total vs Partial)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Total Specialization is drawn with a Double Line connecting superclass to circle</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Disjoint Total (d, ═) = exactly one subclass; mapped to single table with NOT NULL ENUM</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Overlapping Partial (o, ─) = zero, one, or multiple; mapped to Table-Per-Type</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never use a single scalar ENUM column for an overlapping specialization hierarchy</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Specialization Constraints (d/o & Total/Partial) – FAQs"
            questions={questions}
            subtitle="Master Disjointness (d/o), Completeness (Total/Partial), 4-quadrant matrices, and MySQL schema mapping with 30 comprehensive Q&As"
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
            title="Specialization & Generalization Constraints: Disjointness and Completeness"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_specialization_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding the 4-Quadrant Specialization Matrix is crucial for bulletproof database modeling! " +
              "In my classes in Barrackpore, I emphasize asking two simple questions during requirements analysis: " +
              "1) 'Can a person be both a Student and a Teacher?' If yes, write 'o' (Overlapping); if no, write 'd' (Disjoint). " +
              "2) 'Can a person exist in our system who is neither?' If yes, draw a single line (Partial); if no, draw a double line (Total). " +
              "Answer those two questions, and your EER diagram and MySQL DDL will be mathematically sound from day one."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · Specialization Constraints · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
