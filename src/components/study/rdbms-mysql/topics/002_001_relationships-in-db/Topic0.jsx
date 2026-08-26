import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding Relationship Cardinality & Modality (Optionality)
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Cardinality Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedCardinality, setSelectedCardinality] = useState("1:N"); // "1:1", "1:N", "M:N"
  const [selectedModality, setSelectedModality] = useState("mandatory"); // "optional" (0..N) vs "mandatory" (1..N)

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

  // Dynamic DDL generation based on state
  let ddlSnippet = "";
  let crowSymbolLeft = "||";
  let crowSymbolRight = "|<";
  let relationDescription = "";

  if (selectedCardinality === "1:1") {
    crowSymbolLeft = "||";
    crowSymbolRight = selectedModality === "mandatory" ? "||" : "O|";
    relationDescription =
      "One-to-One (1:1): Each Student has at most 1 Student Passport. Foreign key in student_passports has a UNIQUE constraint.";
    ddlSnippet = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE student_passports (\n    passport_id INT AUTO_INCREMENT PRIMARY KEY,\n    passport_number VARCHAR(20) NOT NULL UNIQUE,\n    student_id INT ${selectedModality === "mandatory" ? "NOT NULL" : "NULL"} UNIQUE,\n    CONSTRAINT fk_passports_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;
  } else if (selectedCardinality === "1:N") {
    crowSymbolLeft = "||";
    crowSymbolRight = selectedModality === "mandatory" ? "|<" : "O<";
    relationDescription =
      "One-to-Many (1:N): One Department contains many Students. Foreign key is placed on the 'MANY' side (students table).";
    ddlSnippet = `CREATE TABLE departments (\n    dept_id INT AUTO_INCREMENT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL,\n    dept_id INT ${selectedModality === "mandatory" ? "NOT NULL" : "NULL"},\n    CONSTRAINT fk_students_dept FOREIGN KEY (dept_id)\n        REFERENCES departments(dept_id) ON DELETE RESTRICT\n) ENGINE=InnoDB;`;
  } else {
    crowSymbolLeft = "O<";
    crowSymbolRight = "O<";
    relationDescription =
      "Many-to-Many (M:N): Students enroll in multiple Courses; Courses have multiple Students. Requires a Bridge/Junction Table.";
    ddlSnippet = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE courses (\n    course_id INT AUTO_INCREMENT PRIMARY KEY,\n    course_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\n-- Bridge / Junction Table\nCREATE TABLE student_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id)\n) ENGINE=InnoDB;`;
  }

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
            Module 002_001 · Relationships in DB · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Relationship Cardinality &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Modality (Optionality)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master upper-bound Cardinality (1:1, 1:N, M:N), lower-bound Modality (Optional min=0 vs Mandatory min=1),
            Crow's Foot notation, and mapping relational rules to SQL <code>NOT NULL</code> and <code>UNIQUE</code> constraints.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Cardinality (1:1, 1:N, M:N)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕ Modality (Optional vs Mandatory)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🦅 Crow's Foot Notations
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌉 Junction / Bridge Tables
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Dimensions ─────────────────────────── */}
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
                The Two Dimensions of Entity Relationships
              </h2>
              <p className="text-xs text-slate-400">
                Upper bound maximum multiplicity vs lower bound minimum participation
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dimension 1 */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                1. Cardinality (Maximum Bound)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                "What is the maximum number of instances of Entity B that can connect to 1 instance of Entity A?"
              </p>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>• 1:1 – One-to-One (e.g. Student & Passport)</li>
                <li>• 1:N – One-to-Many (e.g. Department & Students)</li>
                <li>• M:N – Many-to-Many (e.g. Students & Courses)</li>
              </ul>
            </div>

            {/* Dimension 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                2. Modality / Optionality (Minimum Bound)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                "What is the minimum number of instances that MUST connect? Is participation required or optional?"
              </p>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>• Mandatory (Min = 1): Must exist (<code className="text-teal-300">NOT NULL</code>)</li>
                <li>• Optional (Min = 0): Can be absent (<code className="text-amber-300">NULL</code>)</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Crow's Foot Notations ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Industry-Standard Crow's Foot Relationship Notations
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Crow's Foot Notation Symbols"
            >
              {[
                { symbol: "||", label: "Exactly One", minmax: "(1, 1)", meaning: "Mandatory Single", color: "#10b981" },
                { symbol: "O|", label: "Zero or One", minmax: "(0, 1)", meaning: "Optional Single", color: "#38bdf8" },
                { symbol: "|<", label: "One or Many", minmax: "(1, N)", meaning: "Mandatory Many", color: "#818cf8" },
                { symbol: "O<", label: "Zero or Many", minmax: "(0, N)", meaning: "Optional Many", color: "#f59e0b" },
              ].map((item, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 190}, 20)`}>
                  <rect width="175" height="90" rx="8" fill="#1e293b" stroke={item.color} />
                  <text x="87" y="24" fill={item.color} textAnchor="middle" fontWeight="bold" fontSize="11">
                    {item.symbol} {item.label}
                  </text>
                  <line x1="10" y1="36" x2="165" y2="36" stroke="#334155" />
                  <text x="15" y="54" fill="#cbd5e1" fontSize="9">Min-Max:</text>
                  <text x="160" y="54" fill="#cbd5e1" textAnchor="end" fontSize="9" fontWeight="bold">{item.minmax}</text>
                  <text x="15" y="74" fill="#cbd5e1" fontSize="9">Meaning:</text>
                  <text x="160" y="74" fill={item.color} textAnchor="end" fontSize="9" fontWeight="bold">{item.meaning}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Simulator ───────────────────── */}
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
                Interactive Cardinality & Modality Architecture Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Configure cardinality and modality options to see live ER diagram symbols and generated relational DDL
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Cardinality Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Maximum Cardinality:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["1:1", "1:N", "M:N"].map((card) => (
                    <button
                      key={card}
                      onClick={() => setSelectedCardinality(card)}
                      className={clsx(
                        "py-2 rounded-lg text-xs font-bold transition-all border",
                        selectedCardinality === card
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    &gt;
                      {card}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modality Selector */}
              {selectedCardinality !== "M:N" && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Minimum Modality (Optionality):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "mandatory", label: "Mandatory (Min = 1)", desc: "Enforces NOT NULL FK" },
                      { id: "optional", label: "Optional (Min = 0)", desc: "Allows NULL FK" },
                    ].map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setSelectedModality(mod.id)}
                        className={clsx(
                          "p-2.5 rounded-lg text-xs font-medium border text-left transition-all",
                          selectedModality === mod.id
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        )}
                      &gt;
                        <div className="font-bold">{mod.label}</div>
                        <div className="text-[10px] text-slate-500">{mod.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ER Visual Diagram Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Crow's Foot ER Diagram Link
                </span>
                <div className="flex items-center justify-center gap-3 font-mono text-sm">
                  <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-teal-300 font-bold">
                    Entity A
                  </span>
                  <span className="text-slate-500 font-bold">
                    {crowSymbolLeft} ──────── {crowSymbolRight}
                  </span>
                  <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
                    Entity B
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{relationDescription}</p>
              </div>
            </div>

            {/* Generated DDL */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                Generated Relational DDL Script:
              </span>
              <pre className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
                {ddlSnippet}
              </pre>
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
                Cardinality & modality architectures from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Department-Student Association (1:N Mandatory)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore College</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Every student must belong to exactly 1 department (1..1), while departments have 1 or more students (1..N).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    dept_id INT NOT NULL, -- Mandatory Modality (Min = 1)
    CONSTRAINT fk_students_dept FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Student-Course Enrollment (M:N Bridge)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Learning</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Students enroll in multiple courses; courses enroll multiple students. Modeled with a bridge table.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_course_enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    tuition_paid DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
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
                Avoid misplaced foreign keys and unconstrained 1:1 relationships
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
                  <strong className="text-white">1. Placing FK on the 'One' Side in 1:N:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Placing <code>student_id</code> in <code>departments</code> forces multi-valued cells, violating 1NF.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Omitting UNIQUE in 1:1 Relationships:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Without <code>UNIQUE</code>, a 1:1 relationship silently degrades into a 1:N relationship.
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
                  <strong className="text-white">1. Always Place FK on the 'Many' Side:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In 1:N, the child table on the Many side holds the foreign key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Bridge Tables for M:N:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Decompose M:N relationships into two 1:N relationships using an intermediate junction table.
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
              <span>Cardinality defines maximum bound multiplicity (1:1, 1:N, M:N)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Modality defines minimum bound participation (0 for optional, 1 for mandatory)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Foreign Key always belongs on the 'MANY' side in One-to-Many relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Add a <code>UNIQUE</code> constraint to the Foreign Key for One-to-One relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use an intermediate Bridge/Junction table for Many-to-Many relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Mark Foreign Keys <code>NOT NULL</code> to enforce mandatory participation</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Relationship Cardinality & Modality – FAQs"
            questions={questions}
            subtitle="Master entity relationship design, Crow's Foot notations, and DDL mapping with 30 comprehensive Q&As"
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
            title="Understanding Relationship Cardinality & Modality (Optionality)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_cardinality_modality_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Welcome to Segment 2! In relational database architecture, the difference between a great engineer and an amateur " +
              "comes down to understanding Cardinality and Modality. In my classes in Barrackpore, I emphasize that Cardinality answers " +
              "'How many at most?', which tells you where to place the Foreign Key or if you need a Junction table. " +
              "Modality answers 'Is it mandatory or optional?', which tells you whether the Foreign Key must be `NOT NULL` or nullable. " +
              "Once you master translating real-world business requirements into these two dimensions, writing robust SQL schemas becomes second nature."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Cardinality & Modality · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
