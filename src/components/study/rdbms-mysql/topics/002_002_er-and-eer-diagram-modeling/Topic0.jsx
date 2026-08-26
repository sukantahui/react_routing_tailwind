import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Conceptual vs Logical vs Physical Database Design Lifecycles
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Lifecycle Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Lifecycle Simulator State
  const [activeTier, setActiveTier] = useState("conceptual"); // "conceptual" | "logical" | "physical"

  const tierDetails = {
    conceptual: {
      name: "Phase 1: Conceptual Design (Business Abstraction)",
      focus: "WHAT data needs to be stored and HOW business entities relate.",
      audience: "Business Stakeholders, Product Managers, Domain Experts",
      artifacts: "Entity-Relationship (ER) Diagram, EER Hierarchies",
      independence: "100% DBMS-Independent and Hardware-Independent",
      badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/30">
              <strong className="text-amber-300 block mb-1">Entity: Student</strong>
              <p className="text-slate-300">Attributes: student_id (Identifier), full_name, email, admission_fee</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/30">
              <strong className="text-amber-300 block mb-1">Entity: Course</strong>
              <p className="text-slate-300">Attributes: course_id (Identifier), course_title, syllabus_summary</p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>Relationship:</strong> <code>Student</code> (M) ───&lt; Enrolls_In &gt;─── (N) <code>Course</code> (Multi-Course Enrollment)
          </div>
        </div>
      ),
    },
    logical: {
      name: "Phase 2: Logical Design (Relational Schema & 3NF)",
      focus: "HOW conceptual entities map into mathematical relational tables and foreign keys.",
      audience: "Data Modelers, Software Engineers, Database Architects",
      artifacts: "Relational Schema Model, Normalized Tables (1NF &rarr; BCNF)",
      independence: "DBMS-Independent (works on MySQL, PostgreSQL, Oracle)",
      badgeColor: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30">
              <strong className="text-cyan-300 block mb-1">students</strong>
              <div className="text-slate-300 text-[11px]">student_id (PK)<br/>full_name<br/>admission_fee</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30">
              <strong className="text-cyan-300 block mb-1">student_courses</strong>
              <div className="text-teal-300 text-[11px]">student_id (PK, FK)<br/>course_id (PK, FK)<br/>enrolled_at, grade</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30">
              <strong className="text-cyan-300 block mb-1">courses</strong>
              <div className="text-slate-300 text-[11px]">course_id (PK)<br/>course_title<br/>course_fee</div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            ✓ Decomposed M:N into clean Bridge table <code>student_courses</code> with Composite Primary Key in full 3NF.
          </p>
        </div>
      ),
    },
    physical: {
      name: "Phase 3: Physical Design (MySQL InnoDB DDL & Indexes)",
      focus: "WHERE and HOW data is physically organized on disk pages and memory buffers.",
      audience: "Database Administrators (DBAs), Performance Engineers",
      artifacts: "MySQL 8.0 InnoDB DDL, B-Tree Indexes, Partitioning, Buffer Pool",
      independence: "100% DBMS-Specific (tailored for MySQL InnoDB storage engine)",
      badgeColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      content: (
        <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00
) ENGINE=InnoDB;

CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade VARCHAR(2) NOT NULL DEFAULT 'A',
    PRIMARY KEY (student_id, course_id),
    INDEX idx_rev (course_id, student_id), -- B-Tree Reverse Index
    CONSTRAINT fk_sc_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_sc_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
        </pre>
      ),
    },
  };

  const currentTier = tierDetails[activeTier];

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
            Module 002_002 · ER & EER Modeling · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Conceptual vs Logical vs Physical{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Database Design Lifecycles
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the structured 3-tier database engineering methodology: progressing from abstract business Entity-Relationship models
            to normalized Relational Schemas, down to MySQL InnoDB physical storage optimization.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Conceptual ER Modeling
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Logical Relational Schema & 3NF
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Physical MySQL InnoDB DDL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Data Independence Tiers
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 3-Tier Lifecycle Architecture ────────── */}
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
                The 3 Tiers of the Database Engineering Lifecycle
              </h2>
              <p className="text-xs text-slate-400">
                How business abstraction gradually transforms into physical storage structures
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Conceptual Level
              </span>
              <p className="text-xs text-slate-400">
                Captures business reality. Independent of all database software and hardware.
              </p>
              <div className="text-[11px] text-amber-300 font-bold">Artifact: ER / EER Diagrams</div>
            </div>

            {/* Level 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                2. Logical Level
              </span>
              <p className="text-xs text-slate-400">
                Transforms ER into mathematical relational tables, primary keys, and 3NF normalization.
              </p>
              <div className="text-[11px] text-cyan-300 font-bold">Artifact: Relational Schema Model</div>
            </div>

            {/* Level 3 */}
            <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                3. Physical Level
              </span>
              <p className="text-xs text-slate-400">
                Optimizes data types, B-Tree indexes, partitioning, and memory buffers for MySQL InnoDB.
              </p>
              <div className="text-[11px] text-emerald-300 font-bold">Artifact: MySQL InnoDB DDL Scripts</div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Lifecycle Waterfall ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3-Tier Database Design Lifecycle Waterfall
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="3-Tier Design Lifecycle"
            >
              {/* Box 1 */}
              <g transform="translate(20, 20)">
                <rect width="210" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" />
                <text x="105" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                  1. Conceptual Design
                </text>
                <line x1="10" y1="36" x2="200" y2="36" stroke="#334155" />
                <text x="105" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">ER & EER Modeling</text>
                <text x="105" y="72" fill="#cbd5e1" textAnchor="middle" fontSize="9">Entities, Relations, Attributes</text>
                <text x="105" y="88" fill="#f59e0b" textAnchor="middle" fontSize="9">100% DBMS-Independent</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(235, 55)">
                <path d="M 0,10 L 30,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="30,6 40,10 30,14" fill="#64748b" />
              </g>

              {/* Box 2 */}
              <g transform="translate(280, 20)">
                <rect width="220" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="110" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  2. Logical Design
                </text>
                <line x1="10" y1="36" x2="210" y2="36" stroke="#334155" />
                <text x="110" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">Relational Schema Mapping</text>
                <text x="110" y="72" fill="#cbd5e1" textAnchor="middle" fontSize="9">1NF &rarr; 2NF &rarr; 3NF / BCNF</text>
                <text x="110" y="88" fill="#38bdf8" textAnchor="middle" fontSize="9">Relational Math Driven</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(505, 55)">
                <path d="M 0,10 L 30,10" stroke="#64748b" strokeWidth="2" />
                <polygon points="30,6 40,10 30,14" fill="#64748b" />
              </g>

              {/* Box 3 */}
              <g transform="translate(550, 20)">
                <rect width="210" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="105" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  3. Physical Design
                </text>
                <line x1="10" y1="36" x2="200" y2="36" stroke="#334155" />
                <text x="105" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">MySQL InnoDB DDL</text>
                <text x="105" y="72" fill="#cbd5e1" textAnchor="middle" fontSize="9">B-Tree Indexes & Partitioning</text>
                <text x="105" y="88" fill="#10b981" textAnchor="middle" fontSize="9">100% MySQL Engine Specific</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Lifecycle Simulator ─────────── */}
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
                Interactive Design Lifecycle Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle through Conceptual, Logical, and Physical phases to observe schema evolution step-by-step
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Tab Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTier("conceptual")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeTier === "conceptual"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Conceptual Phase (ER)
              </button>
              <button
                onClick={() => setActiveTier("logical")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeTier === "logical"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Logical Phase (Schema & 3NF)
              </button>
              <button
                onClick={() => setActiveTier("physical")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeTier === "physical"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Physical Phase (MySQL DDL)
              </button>
            </div>

            {/* Active Tier Details */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white">{currentTier.name}</span>
                <span className={clsx("text-xs font-mono font-bold px-2.5 py-1 rounded-lg border", currentTier.badgeColor)}>
                  {currentTier.independence}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Primary Focus:</span>
                  <span className="text-slate-300">{currentTier.focus}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Target Stakeholders:</span>
                  <span className="text-slate-300">{currentTier.audience}</span>
                </div>
              </div>

              {/* Artifact Display */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                  Phase Deliverable Artifact:
                </span>
                {currentTier.content}
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
                End-to-end design lifecycle progressions from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Tuition System (3-Tier Progression)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Lifecycle</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                From conceptual ER entities to 3NF relational schema and physical InnoDB DDL.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Conceptual: Student (1) ──< Pays >── (N) Fee_Receipt (M:N with Course)
-- Logical: students(student_id*), courses(course_id*), student_courses(student_id*, course_id*)
-- Physical: CREATE TABLE student_courses (...) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Architecture Progression
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Translating M:N Customer-Product interactions into normalized Order Line Item physical tables.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Conceptual: Order (1) ──< Contains >── (N) Product
-- Logical: orders(order_id*), products(product_id*), order_items(order_id*, product_id*, qty, price)
-- Physical: CREATE TABLE order_items (...) PRIMARY KEY (order_id, product_id) ENGINE=InnoDB;`}
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
                Avoid premature physical optimization and conceptual layer leakage
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
                  <strong className="text-white">1. Skipping Conceptual Modeling:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing SQL immediately leads to severe data anomalies and costly structural refactors.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Premature Indexing:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Adding dozens of secondary indexes before understanding workload query patterns.
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
                  <strong className="text-white">1. Sequential Design Discipline:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always follow: Conceptual (ER) ➔ Logical (Schema/3NF) ➔ Physical (MySQL DDL).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Stakeholder ER Walkthrough:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Validate all business user stories against the ER model before writing any code.
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
              <span>Conceptual Design captures WHAT data and HOW entities relate (100% DBMS-independent)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Logical Design structures data into normalized relational tables (1NF to 3NF/BCNF)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Physical Design optimizes storage data types, B-Tree indexes, and InnoDB parameters</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Logical Data Independence allows modifying schema tables without breaking user views</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Physical Data Independence allows modifying indexes without rewriting SQL queries</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never write physical SQL scripts before validating conceptual ER models with stakeholders</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Conceptual vs Logical vs Physical Design – FAQs"
            questions={questions}
            subtitle="Master the 3-tier database engineering lifecycle, abstraction layers, and data independence with 30 comprehensive Q&As"
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
            title="Conceptual vs Logical vs Physical Database Design Lifecycles"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_design_lifecycles_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Building a database without an ER model is like building a skyscraper without an architectural blueprint! " +
              "In my classes in Barrackpore, I emphasize the Three Golden Phases: Conceptual (ER), Logical (3NF Schema), " +
              "and Physical (MySQL InnoDB DDL). Novices make the mistake of opening MySQL Workbench and typing `CREATE TABLE` on day one. " +
              "Professionals draw their ER diagrams first, validate every business constraint with stakeholders, normalize to 3NF, " +
              "and only then write optimized MySQL DDL. Master this discipline, and you will build scalable databases that stand the test of time."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Design Lifecycles · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
