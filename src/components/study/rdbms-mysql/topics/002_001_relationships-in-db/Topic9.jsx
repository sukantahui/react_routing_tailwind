import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Visualizing Table Relationships in MySQL Workbench EER Modeler
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive EER Canvas Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive Workbench EER Simulator State
  const [selectedRel, setSelectedRel] = useState("dept_students");
  const [notationStyle, setNotationStyle] = useState("crows_foot"); // "crows_foot" vs "uml"
  const [activeTab, setActiveTab] = useState("canvas"); // "canvas" vs "ddl"

  const relationshipsData = {
    dept_students: {
      title: "departments ➔ students (1:n Non-Identifying)",
      parent: "departments",
      child: "students",
      type: "1:n Non-Identifying (Dashed Line)",
      cardinality: "1 to Many (1:N)",
      modality: "Parent: Mandatory (1) | Child: Optional (0..N)",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
      explanation:
        "Standard master-detail relationship. The child table (students) possesses its own surrogate primary key (student_id), so dept_id is a non-identifying foreign key.",
    },
    sc_students: {
      title: "students ➔ student_courses (1:n Identifying)",
      parent: "students",
      child: "student_courses",
      type: "1:n Identifying (Solid Line)",
      cardinality: "1 to Many (1:N)",
      modality: "Parent: Mandatory (1) | Child: Mandatory (1..N)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      explanation:
        "Identifying relationship. The student_id forms part of the child table's Composite Primary Key (student_id, course_id).",
    },
    sc_courses: {
      title: "courses ➔ student_courses (1:n Identifying)",
      parent: "courses",
      child: "student_courses",
      type: "1:n Identifying (Solid Line)",
      cardinality: "1 to Many (1:N)",
      modality: "Parent: Mandatory (1) | Child: Mandatory (1..N)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      explanation:
        "Identifying relationship. The course_id forms the second half of the child junction table's Composite Primary Key.",
    },
  };

  const currentRel = relationshipsData[selectedRel];

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

  const generatedDDL = `-- Forward-Engineered SQL Script from MySQL Workbench EER Canvas\n-- Model: college_management_eer\n-- Target DBMS: MySQL 8.0 (InnoDB)\n\nCREATE SCHEMA IF NOT EXISTS \`college_db\` DEFAULT CHARACTER SET utf8mb4;\nUSE \`college_db\`;\n\n-- 1. Master Table: departments\nCREATE TABLE \`departments\` (\n  \`dept_id\` INT AUTO_INCREMENT,\n  \`dept_name\` VARCHAR(50) NOT NULL,\n  \`location\` VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',\n  PRIMARY KEY (\`dept_id\`)\n) ENGINE = InnoDB;\n\n-- 2. Master Table: students\nCREATE TABLE \`students\` (\n  \`student_id\` INT AUTO_INCREMENT,\n  \`first_name\` VARCHAR(50) NOT NULL,\n  \`dept_id\` INT NOT NULL,\n  PRIMARY KEY (\`student_id\`),\n  INDEX \`fk_students_dept_idx\` (\`dept_id\` ASC),\n  CONSTRAINT \`fk_students_dept\`\n    FOREIGN KEY (\`dept_id\`)\n    REFERENCES \`departments\` (\`dept_id\`)\n    ON DELETE RESTRICT\n    ON UPDATE CASCADE\n) ENGINE = InnoDB;\n\n-- 3. Master Table: courses\nCREATE TABLE \`courses\` (\n  \`course_id\` INT AUTO_INCREMENT,\n  \`course_title\` VARCHAR(100) NOT NULL,\n  \`course_fee\` DECIMAL(10,2) NOT NULL DEFAULT 15000.00,\n  PRIMARY KEY (\`course_id\`)\n) ENGINE = InnoDB;\n\n-- 4. Junction Table: student_courses (Identifying)\nCREATE TABLE \`student_courses\` (\n  \`student_id\` INT NOT NULL,\n  \`course_id\` INT NOT NULL,\n  \`grade\` VARCHAR(2) NOT NULL DEFAULT 'A',\n  PRIMARY KEY (\`student_id\`, \`course_id\`),\n  INDEX \`fk_sc_courses_idx\` (\`course_id\` ASC),\n  CONSTRAINT \`fk_sc_students\`\n    FOREIGN KEY (\`student_id\`)\n    REFERENCES \`students\` (\`student_id\`)\n    ON DELETE CASCADE\n    ON UPDATE CASCADE,\n  CONSTRAINT \`fk_sc_courses\`\n    FOREIGN KEY (\`course_id\`)\n    REFERENCES \`courses\` (\`course_id\`)\n    ON DELETE CASCADE\n    ON UPDATE CASCADE\n) ENGINE = InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 9
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Visualizing Relationships in{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              MySQL Workbench EER Modeler
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the visual design suite: Reverse Engineering live schemas (<code>Ctrl + R</code>),
            Identifying vs Non-Identifying relationship notation, Crow's Foot connectors, and Forward Engineering production SQL DDL.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎨 Interactive EER Canvas
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Reverse Engineering (Ctrl+R)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Forward Engineering DDL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Crow's Foot & UML Notation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Workbench Tool Suite & Notation Guide ──── */}
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
                MySQL Workbench Relationship Tools & Glyph Notation
              </h2>
              <p className="text-xs text-slate-400">
                Understanding toolbar connectors, solid vs dashed lines, and column attribute diamonds
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Identifying */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block">
                1:n Identifying Relationship (Solid Line ───)
              </span>
              <p className="text-xs text-slate-400">
                Parent Primary Key is inherited into the child table AND becomes part of the child's Composite Primary Key.
              </p>
              <div className="text-[11px] text-teal-300 font-bold">Example: students ➔ student_courses (Junction)</div>
            </div>

            {/* Non-Identifying */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                1:n Non-Identifying Relationship (Dashed Line - - -)
              </span>
              <p className="text-xs text-slate-400">
                Parent Primary Key is added as a standard Foreign Key column without altering the child table's Primary Key.
              </p>
              <div className="text-[11px] text-cyan-300 font-bold">Example: departments ➔ students</div>
            </div>
          </div>

          {/* Glyph Guide */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold text-base block">🔑</span>
              <span className="text-white font-bold block mt-1">Primary Key (PK)</span>
              <span className="text-[10px] text-slate-400">Yellow Key Glyph</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold text-base block">◆</span>
              <span className="text-white font-bold block mt-1">NOT NULL (NN)</span>
              <span className="text-[10px] text-slate-400">Filled Red Diamond</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold text-base block">◇</span>
              <span className="text-white font-bold block mt-1">Nullable (NULL)</span>
              <span className="text-[10px] text-slate-400">Hollow Blue Diamond</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold text-base block">🔗</span>
              <span className="text-white font-bold block mt-1">Foreign Key (FK)</span>
              <span className="text-[10px] text-slate-400">Red-Bordered Chain</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench EER Canvas ────────── */}
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
                Interactive Workbench EER Canvas Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Click relationship connector buttons to inspect notation details or forward engineer the model to production SQL DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Workbench Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Select Relationship Line:</span>
                <button
                  onClick={() => setSelectedRel("dept_students")}
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold transition-all border",
                    selectedRel === "dept_students"
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  departments ➔ students
                </button>
                <button
                  onClick={() => setSelectedRel("sc_students")}
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold transition-all border",
                    selectedRel === "sc_students"
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  students ➔ student_courses
                </button>
                <button
                  onClick={() => setSelectedRel("sc_courses")}
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold transition-all border",
                    selectedRel === "sc_courses"
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  courses ➔ student_courses
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab(activeTab === "canvas" ? "ddl" : "canvas")}
                  className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold hover:bg-indigo-500/30 transition-all flex items-center gap-1"
                >
                  <span>⚡</span> {activeTab === "canvas" ? "Forward Engineer SQL" : "View Canvas"}
                </button>
              </div>
            </div>

            {/* Canvas or Forward Engineered DDL View */}
            {activeTab === "canvas" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Canvas Rendering */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                    Workbench Diagram Canvas (4 Connected Tables):
                  </span>

                  {/* Schema Entities */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* Table 1 */}
                    <div className="rounded-lg border border-teal-500/40 bg-slate-900 p-2.5 space-y-1">
                      <div className="font-bold text-teal-300 border-b border-slate-800 pb-1 flex justify-between items-center">
                        <span>departments</span>
                        <span className="text-[10px] text-slate-500">InnoDB</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                        <div>🔑 dept_id INT (PK, NN)</div>
                        <div>◆ dept_name VARCHAR(50)</div>
                      </div>
                    </div>

                    {/* Table 2 */}
                    <div className="rounded-lg border border-cyan-500/40 bg-slate-900 p-2.5 space-y-1">
                      <div className="font-bold text-cyan-300 border-b border-slate-800 pb-1 flex justify-between items-center">
                        <span>students</span>
                        <span className="text-[10px] text-slate-500">InnoDB</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                        <div>🔑 student_id INT (PK, NN)</div>
                        <div>◆ first_name VARCHAR(50)</div>
                        <div className="text-teal-300 font-bold">🔗 dept_id INT (FK)</div>
                      </div>
                    </div>

                    {/* Table 3 */}
                    <div className="rounded-lg border border-amber-500/40 bg-slate-900 p-2.5 space-y-1">
                      <div className="font-bold text-amber-300 border-b border-slate-800 pb-1 flex justify-between items-center">
                        <span>courses</span>
                        <span className="text-[10px] text-slate-500">InnoDB</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                        <div>🔑 course_id INT (PK, NN)</div>
                        <div>◆ course_title VARCHAR(100)</div>
                      </div>
                    </div>

                    {/* Table 4 (Junction) */}
                    <div className="rounded-lg border border-rose-500/40 bg-slate-900 p-2.5 space-y-1">
                      <div className="font-bold text-rose-300 border-b border-slate-800 pb-1 flex justify-between items-center">
                        <span>student_courses</span>
                        <span className="text-[10px] text-slate-500">InnoDB</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                        <div className="text-amber-300 font-bold">🔑🔗 student_id INT (PK, FK)</div>
                        <div className="text-amber-300 font-bold">🔑🔗 course_id INT (PK, FK)</div>
                        <div>◆ grade VARCHAR(2)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relationship Inspector Dock */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Relationship Inspector Dock:
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-white block">{currentRel.title}</strong>
                      <span className="text-teal-400 font-mono text-[11px]">{currentRel.type}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Cardinality:</span>
                        <span className="text-white font-mono font-bold">{currentRel.cardinality}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Referential Actions:</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          DEL: {currentRel.onDelete} | UPD: {currentRel.onUpdate}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Architectural Analysis:
                      </span>
                      {currentRel.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Forward Engineered DDL View */
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Forward Engineered Production SQL Script (Review Step):
                </span>
                <pre className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-72 overflow-y-auto">
                  {generatedDDL}
                </pre>
              </div>
            )}
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
                Reverse engineering and visual audit workflows from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College EER Model Reverse Engineering
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Database</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pressing <code>Ctrl + R</code> in MySQL Workbench instantly reverse-engineers all tables, foreign keys, and indexes into a diagram.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Menu → Database → Reverse Engineer (Ctrl+R)
-- Step 2: Select 'college_db' schema
-- Step 3: Workbench generates visual EER model showing departments (1) ──< (n) students`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Forward Engineering Migration
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visual EER diagrams exported directly into <code>schema_production.sql</code> for deployment pipelines.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Menu → Database → Forward Engineer... (Ctrl+G)
-- Generates clean, standardized CREATE TABLE scripts with FOREIGN KEY constraints`}
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
                Avoid identifying relationship misconfigurations and MyISAM engine defaults
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
                  <strong className="text-white">1. Confusing Solid vs Dashed Lines:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Solid lines mistakenly turn the foreign key into part of the child's Primary Key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. MyISAM Engine Default:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure default storage engine is <code>InnoDB</code>; MyISAM ignores foreign key constraints.
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
                  <strong className="text-white">1. Use Reverse Engineering (Ctrl+R):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Quickly visualize and audit legacy databases without reading thousands of lines of SQL.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Export PNG/PDF for Architecture Docs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Share clear schema diagrams with engineering teams and clients.
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
              <span>Reverse Engineering (<code>Ctrl + R</code>) automatically imports live databases into EER diagrams</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use Non-Identifying (Dashed) 1:n tools for standard master-detail relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use Identifying (Solid) 1:n tools when parent PK is part of child's Composite PK</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always verify the model's default storage engine is set to <code>InnoDB</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Configure <code>On Delete</code> and <code>On Update</code> in the Foreign Keys property tab</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Forward Engineering converts visual diagrams into production-ready SQL scripts</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="MySQL Workbench EER Modeler – FAQs"
            questions={questions}
            subtitle="Master visual EER modeling, reverse engineering workflows, and forward engineering with 30 comprehensive Q&As"
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
            title="Visualizing Table Relationships in MySQL Workbench EER Modeler"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_workbench_eer_modeler_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A picture is worth a thousand lines of SQL DDL! " +
              "In my classes in Barrackpore, I always show students how to use MySQL Workbench's Reverse Engineering tool (`Ctrl + R`). " +
              "Within five seconds, an overwhelming database with 40 tables transforms into a clear, interactive visual map. " +
              "You can see identifying solid lines connecting composite keys, dashed lines connecting foreign keys, and immediately spot " +
              "missing indexes or incorrect referential actions. Master the EER Modeler, and you will communicate database architectures " +
              "with effortless clarity to both developers and business stakeholders."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · Workbench EER Modeler · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
