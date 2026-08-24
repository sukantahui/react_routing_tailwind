import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic17_files/topic17_questions";
import noteText from "./topic17_files/topic17_note.txt?raw";

/**
 * Topic17 – Step-by-Step Mapping: EER Specialization/Generalization Hierarchies (4 Strategies)
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Step 7 4-Strategy Comparison Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic17 = () => {
  const sectionRefs = useRef([]);

  // Interactive 4-Strategy Comparison State
  const [selectedStrategy, setSelectedStrategy] = useState("7A"); // "7A" | "7B" | "7C" | "7D"

  const strategies = {
    "7A": {
      title: "Strategy 7A: Table-Per-Type (TPT / Joined Inheritance)",
      tables: "Superclass Table + Dedicated Table for Each Subclass",
      disjointness: "Universal (Works for Disjoint 'd' and Overlapping 'o')",
      completeness: "Universal (Works for Total and Partial)",
      nulls: "Zero NULL Columns (100% 3NF Normalized)",
      joins: "Requires INNER JOIN across shared Primary Keys",
      ddl: `-- Strategy 7A: Table-Per-Type (TPT)\nCREATE TABLE persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE students (\n    person_id INT PRIMARY KEY,\n    tuition_fee DECIMAL(10, 2) NOT NULL,\n    CONSTRAINT fk_stud_person FOREIGN KEY (person_id)\n        REFERENCES persons(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\nCREATE TABLE faculty (\n    person_id INT PRIMARY KEY,\n    monthly_salary DECIMAL(10, 2) NOT NULL,\n    CONSTRAINT fk_fac_person FOREIGN KEY (person_id)\n        REFERENCES persons(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`,
    },
    "7B": {
      title: "Strategy 7B: Table-Per-Concrete-Class (TPC / Subclasses Only)",
      tables: "Subclass Tables Only (No Superclass Table)",
      disjointness: "Disjoint ('d') ONLY",
      completeness: "Total ONLY (Mandatory Completeness)",
      nulls: "Zero NULL Columns (Duplicated schema definition)",
      joins: "No joins for leaf queries; UNION ALL for all entities",
      ddl: `-- Strategy 7B: Table-Per-Concrete-Class (TPC)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    tuition_fee DECIMAL(10, 2) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE faculty (\n    faculty_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    monthly_salary DECIMAL(10, 2) NOT NULL\n) ENGINE=InnoDB;`,
    },
    "7C": {
      title: "Strategy 7C: Single Table with Type Discriminator (TPH Single ENUM)",
      tables: "1 Unified Table (Superclass + All Subclasses collapsed)",
      disjointness: "Disjoint ('d') ONLY",
      completeness: "Total or Partial",
      nulls: "Nullable columns for subclass-specific fields",
      joins: "Zero Joins (Blazing-Fast Read/Write Queries)",
      ddl: `-- Strategy 7C: Single Table with Discriminator\nCREATE TABLE academy_members (\n    member_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    member_type ENUM('Student', 'Faculty') NOT NULL,\n    tuition_fee DECIMAL(10, 2) NULL,\n    monthly_salary DECIMAL(10, 2) NULL,\n    CONSTRAINT chk_student_fee CHECK (\n        (member_type = 'Student' AND tuition_fee IS NOT NULL) OR\n        (member_type = 'Faculty' AND monthly_salary IS NOT NULL)\n    )\n) ENGINE=InnoDB;`,
    },
    "7D": {
      title: "Strategy 7D: Single Table with Multiple Boolean Flags (TPH Multi Flags)",
      tables: "1 Unified Table with Multiple Subtype Flags",
      disjointness: "Overlapping ('o') ONLY",
      completeness: "Total or Partial",
      nulls: "Nullable columns for subclass-specific fields",
      joins: "Zero Joins (Handles overlapping subtypes in 1 table)",
      ddl: `-- Strategy 7D: Single Table with Multiple Boolean Flags\nCREATE TABLE university_persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    is_student BOOLEAN NOT NULL DEFAULT FALSE,\n    is_faculty BOOLEAN NOT NULL DEFAULT FALSE,\n    tuition_fee DECIMAL(10, 2) NULL,\n    monthly_salary DECIMAL(10, 2) NULL,\n    CONSTRAINT chk_at_least_one CHECK (is_student = TRUE OR is_faculty = TRUE)\n) ENGINE=InnoDB;`,
    },
  };

  const active = strategies[selectedStrategy];

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
            Module 002_002 · ER & EER Modeling · Topic 17
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ER-to-Relational Mapping:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Step 7 – 4 EER Specialization Strategies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Step 7 of the mapping algorithm: comparing the 4 architectural strategies for Specialization/Generalization
            (Strategy 7A Table-Per-Type, 7B Concrete Class, 7C Single ENUM Discriminator, and 7D Multiple Boolean Flags) with MySQL DDL implementations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 7A: Table-Per-Type (3NF Gold Standard)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌿 7B: Concrete Classes (Disjoint Total)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ 7C: Single Table ENUM (Zero Joins)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ 7D: Single Table Boolean Flags
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: 4-Strategy Comparison Matrix ─────────────── */}
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
                The 4 Architectural Strategies for Step 7
              </h2>
              <p className="text-xs text-slate-400">
                Comparing table count, constraint applicability, NULL column storage, and join requirements
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Strategy 7A (TPT)</span>
              <strong className="text-white text-xs block">Super + Subclass Tables</strong>
              <p className="text-[11px] text-slate-400">Universal applicability, zero NULLs, 3NF clean.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Strategy 7B (TPC)</span>
              <strong className="text-white text-xs block">Subclass Tables Only</strong>
              <p className="text-[11px] text-slate-400">Disjoint + Total only. Fast single-subclass reads.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Strategy 7C (TPH)</span>
              <strong className="text-white text-xs block">1 Table + ENUM Code</strong>
              <p className="text-[11px] text-slate-400">Disjoint only. Zero joins, fast writes, nullable fields.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Strategy 7D (TPH)</span>
              <strong className="text-white text-xs block">1 Table + Boolean Flags</strong>
              <p className="text-[11px] text-slate-400">Overlapping only. Zero joins, multiple subtype flags.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 4-Strategy Architecture Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: 4-Strategy Architectural Decision Tree
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="4-Strategy Architectural Flow"
            >
              {/* 7A */}
              <g transform="translate(20, 15)">
                <rect width="170" height="105" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="85" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">7A: Table-Per-Type</text>
                <text x="10" y="42" fill="#cbd5e1">1 Superclass table</text>
                <text x="10" y="60" fill="#cbd5e1">N Subclass tables</text>
                <text x="10" y="78" fill="#10b981">✓ Zero NULLs (3NF)</text>
                <text x="10" y="96" fill="#38bdf8">Universal (d, o, Tot, Part)</text>
              </g>

              {/* 7B */}
              <g transform="translate(210, 15)">
                <rect width="170" height="105" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="85" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">7B: Concrete Only</text>
                <text x="10" y="42" fill="#cbd5e1">0 Superclass table</text>
                <text x="10" y="60" fill="#cbd5e1">N Subclass tables</text>
                <text x="10" y="78" fill="#f59e0b">Disjoint Total ONLY</text>
                <text x="10" y="96" fill="#cbd5e1">Duplicated schema</text>
              </g>

              {/* 7C */}
              <g transform="translate(400, 15)">
                <rect width="170" height="105" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="85" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">7C: Single Table ENUM</text>
                <text x="10" y="42" fill="#cbd5e1">1 Unified table</text>
                <text x="10" y="60" fill="#cbd5e1">1 ENUM type column</text>
                <text x="10" y="78" fill="#f59e0b">Disjoint ONLY</text>
                <text x="10" y="96" fill="#10b981">✓ Zero Joins</text>
              </g>

              {/* 7D */}
              <g transform="translate(590, 15)">
                <rect width="170" height="105" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="85" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">7D: Single Table Flags</text>
                <text x="10" y="42" fill="#cbd5e1">1 Unified table</text>
                <text x="10" y="60" fill="#cbd5e1">N Boolean flag columns</text>
                <text x="10" y="78" fill="#f59e0b">Overlapping ONLY</text>
                <text x="10" y="96" fill="#10b981">✓ Zero Joins</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Strategy Comparison Sandbox ─── */}
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
                Interactive Strategy Comparison Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Select any of the 4 mapping strategies to inspect its mathematical trade-offs and generated MySQL DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Strategy Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedStrategy("7A")}
                className={clsx(
                  "py-2 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedStrategy === "7A"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                7A: Table-Per-Type (TPT)
              </button>
              <button
                onClick={() => setSelectedStrategy("7B")}
                className={clsx(
                  "py-2 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedStrategy === "7B"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                7B: Concrete Classes (TPC)
              </button>
              <button
                onClick={() => setSelectedStrategy("7C")}
                className={clsx(
                  "py-2 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedStrategy === "7C"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                7C: Single Table ENUM (TPH)
              </button>
              <button
                onClick={() => setSelectedStrategy("7D")}
                className={clsx(
                  "py-2 px-3 rounded-lg text-xs font-bold transition-all border text-left",
                  selectedStrategy === "7D"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                7D: Single Table Flags (TPH)
              </button>
            </div>

            {/* Active Details Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white block">{active.title}</span>
                <span className="text-xs text-slate-400">{active.tables}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-teal-400 block">Disjointness Constraint:</strong>
                  <span className="text-slate-300">{active.disjointness}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-400 block">Completeness Constraint:</strong>
                  <span className="text-slate-300">{active.completeness}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-400 block">NULL Column Storage:</strong>
                  <span className="text-slate-300">{active.nulls}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-indigo-400 block">Query Join Overhead:</strong>
                  <span className="text-slate-300">{active.joins}</span>
                </div>
              </div>

              {/* DDL */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated MySQL DDL Implementation:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
                  {active.ddl}
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
                Academy staff normalization (7A) and high-speed web apps (7C) from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Strict 3NF Hierarchy (Strategy 7A)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero NULL columns across parent <code>persons</code>, <code>students</code>, and <code>faculty</code> tables.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE persons (person_id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100) NOT NULL);
CREATE TABLE students (person_id INT PRIMARY KEY, tuition_fee DECIMAL(10,2) NOT NULL, FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);
CREATE TABLE faculty (person_id INT PRIMARY KEY, monthly_salary DECIMAL(10,2) NOT NULL, FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata High-Speed Web Portal (Strategy 7C)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero-join Single Table Inheritance with conditional CHECK constraints.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE academy_members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    member_type ENUM('Student', 'Faculty') NOT NULL,
    tuition_fee DECIMAL(10, 2) NULL,
    monthly_salary DECIMAL(10, 2) NULL
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
                Avoid single ENUM discriminators on overlapping hierarchies and using 7B on partial specializations
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
                  <strong className="text-white">1. Strategy 7C on Overlapping:</strong>
                  <p className="text-slate-400 mt-0.5">
                    A single ENUM column prevents entities from holding multiple roles simultaneously.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Strategy 7B on Partial:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If an entity belongs to neither subclass, it has no table to live in and cannot be stored.
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
                  <strong className="text-white">1. Default to Strategy 7A:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Table-Per-Type is universally applicable, 100% 3NF compliant, and avoids NULL column pollution.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Conditional CHECK Constraints for 7C:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always enforce that specific attributes are NOT NULL when their corresponding discriminator is set.
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
              <span>Strategy 7A (Table-Per-Type): 1 superclass table + N subclass tables; zero NULLs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Strategy 7B (Table-Per-Concrete-Class): Subclasses only; Disjoint + Total only</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Strategy 7C (Single Table ENUM): 1 table with type code; Disjoint only; zero joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Strategy 7D (Single Table Flags): 1 table with multiple booleans; Overlapping only</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Strategy 7A is universally applicable across all EER hierarchy types</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>In Strategy 7A, subclass tables share the superclass PK as their own PK and FK</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Step 7: 4 Specialization Mapping Strategies – FAQs"
            questions={questions}
            subtitle="Master Step 7 of the ER-to-Relational mapping algorithm, Table-Per-Type (7A), Concrete Class (7B), Single ENUM (7C), and Multiple Flags (7D) with 30 comprehensive Q&As"
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
            title="Step-by-Step Mapping: EER Specialization/Generalization Hierarchies (4 Distinct Relational Strategies)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic17_step7_eer_strategies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Step 7 is the ultimate bridge between Object-Oriented polymorphism and relational algebra! " +
              "In my classes in Barrackpore, I teach students a simple decision rubric: " +
              "When you have many subclass-specific attributes and want clean 3NF normalization with zero NULLs, choose Strategy 7A (Table-Per-Type). " +
              "When your subclasses have only 1 or 2 specific attributes and you want maximum query speed with zero joins, choose Strategy 7C (Single Table Inheritance). " +
              "Mastering these 4 strategies gives you the architectural confidence to design any complex enterprise system in MySQL."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 17 · Step 7 EER Strategies · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic17;
