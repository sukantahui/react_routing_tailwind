import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Dropping Constraints and Foreign Key Dependencies
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Drop Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [fkActive, setFkActive] = useState(true);
  const [chkActive, setChkActive] = useState(true);
  const [parentTableExists, setParentTableExists] = useState(true);
  const [engineMessage, setEngineMessage] = useState(
    "Active schema with Foreign Key 'fk_payments_students' and CHECK 'chk_students_fee_floor'. Try dropping constraints!"
  );

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

  const handleDropFK = () => {
    if (!fkActive) {
      setEngineMessage("⚠️ Foreign key 'fk_payments_students' is already dropped.");
      return;
    }
    setFkActive(false);
    setEngineMessage(
      "✓ Query OK, 0 rows affected (0.01 sec). Executed: ALTER TABLE student_payments DROP FOREIGN KEY fk_payments_students; Child table is now decoupled from parent table."
    );
  };

  const handleDropCheck = () => {
    if (!chkActive) {
      setEngineMessage("⚠️ CHECK constraint 'chk_students_fee_floor' is already dropped.");
      return;
    }
    setChkActive(false);
    setEngineMessage(
      "✓ Query OK, 0 rows affected (0.00 sec). Executed: ALTER TABLE students DROP CHECK chk_students_fee_floor; Fee minimum validation rule removed."
    );
  };

  const handleAttemptDropParent = () => {
    if (!parentTableExists) {
      setEngineMessage("⚠️ Parent table 'students' has already been dropped.");
      return;
    }

    if (fkActive) {
      setEngineMessage(
        "❌ ERROR 3730 (HY000): Cannot drop table 'students' referenced by a foreign key constraint 'fk_payments_students' on table 'student_payments'. (Drop child FK first or drop child table first!)"
      );
    } else {
      setParentTableExists(false);
      setEngineMessage(
        "✓ Query OK, 0 rows affected (0.02 sec). Executed: DROP TABLE students; Parent table successfully dropped because child foreign key was detached!"
      );
    }
  };

  const handleReset = () => {
    setFkActive(true);
    setChkActive(true);
    setParentTableExists(true);
    setEngineMessage("Simulator reset to initial state with all active constraints.");
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
            Module 001_003 · Keys & Constraints · Topic 13 (Final)
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Dropping Constraints &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Foreign Key Dependencies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master constraint removal syntax, managing foreign key dependency graphs (Error 3730),
            the 2-step AUTO_INCREMENT primary key removal process, and safe use of <code>SET FOREIGN_KEY_CHECKS = 0</code>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🗑️ DROP FOREIGN KEY / CHECK
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Dependency Trees (Error 3730)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 AUTO_INCREMENT PK Removal
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SET FOREIGN_KEY_CHECKS = 0
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Syntax & Dependency Rules ───────────────── */}
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
                Constraint Dropping Syntax by Type
              </h2>
              <p className="text-xs text-slate-400">
                Exact DDL commands for safely detaching constraints in MySQL 8.0
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FK Drop */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Drop Foreign Key Constraint
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Detaches referential link. (Drop underlying index separately if desired).
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                ALTER TABLE student_payments
                DROP FOREIGN KEY fk_payments_students;
              </pre>
            </div>

            {/* CHECK Drop */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Drop CHECK / UNIQUE Constraint
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Removes business validation expression or secondary unique index.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                ALTER TABLE students
                DROP CHECK chk_students_fee_floor;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Dependency Drop Graph ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Foreign Key Dependency Order (Why Child Tables Must Drop First)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Dependency Drop Graph"
            >
              {/* Step 1 */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Step 1: Drop Child Table (or Drop Child FK)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Detaches 'fk_payments_students' reference</text>
                <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">✓ Child table payments no longer points to parent</text>
              </g>

              {/* Step 2 */}
              <g transform="translate(410, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="170" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Step 2: Drop Parent Table (students)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Zero incoming foreign key references</text>
                <text x="20" y="74" fill="#38bdf8" fontWeight="bold" fontSize="10">✓ Table dropped cleanly without Error 3730!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Drop Sandbox ────────────────── */}
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
                Interactive Constraint Dropping Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Attempt dropping parent table while FK is active to witness Error 3730, then detach FK to drop cleanly
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="space-y-2">
                <button
                  onClick={handleDropFK}
                  disabled={!fkActive}
                  className="w-full py-2.5 px-3 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all disabled:opacity-30 flex items-center justify-between"
                >
                  <span>1. DROP FOREIGN KEY fk_payments_students</span>
                  <span className="font-mono text-[10px]">{fkActive ? "ACTIVE" : "DROPPED"}</span>
                </button>

                <button
                  onClick={handleDropCheck}
                  disabled={!chkActive}
                  className="w-full py-2.5 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all disabled:opacity-30 flex items-center justify-between"
                >
                  <span>2. DROP CHECK chk_students_fee_floor</span>
                  <span className="font-mono text-[10px]">{chkActive ? "ACTIVE" : "DROPPED"}</span>
                </button>

                <button
                  onClick={handleAttemptDropParent}
                  disabled={!parentTableExists}
                  className="w-full py-2.5 px-3 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all disabled:opacity-30 flex items-center justify-between"
                >
                  <span>3. Attempt DROP TABLE students (Parent)</span>
                  <span className="font-mono text-[10px]">{parentTableExists ? "EXISTS" : "DROPPED"}</span>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="py-1.5 px-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-xs hover:text-white transition-all"
                >
                  Reset Simulator
                </button>
              </div>

              {/* Status Display */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Foreign Key</span>
                  <span className={clsx("font-bold font-mono", fkActive ? "text-teal-400" : "text-slate-500")}>
                    {fkActive ? "Enforced" : "Detached"}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">CHECK Rule</span>
                  <span className={clsx("font-bold font-mono", chkActive ? "text-cyan-400" : "text-slate-500")}>
                    {chkActive ? "Enforced" : "Removed"}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Parent Table</span>
                  <span className={clsx("font-bold font-mono", parentTableExists ? "text-emerald-400" : "text-rose-500")}>
                    {parentTableExists ? "Present" : "DROPPED"}
                  </span>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Output:
                </span>
                {engineMessage}
              </div>
            </div>

            {/* Schema Visualizer */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Active Table Schema Entities:
                </span>

                {/* Parent Table Box */}
                <div
                  className={clsx(
                    "p-3 rounded-lg border transition-all",
                    parentTableExists
                      ? "border-teal-500/40 bg-slate-900"
                      : "border-slate-800 bg-slate-950/50 opacity-40 line-through"
                  )}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Parent Table: students</span>
                    <span className="text-[10px] font-mono text-teal-400">
                      {parentTableExists ? "ENGINE=InnoDB" : "DROPPED"}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400">
                    • student_id INT PRIMARY KEY<br />
                    • admission_fee DECIMAL(10,2) {chkActive ? "(CHECK >= 10000)" : "(Unconstrained)"}
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center font-bold text-slate-600 text-xs">
                  {fkActive ? "▲ Foreign Key Reference 'fk_payments_students' ▲" : "✖ Foreign Key Detached ✖"}
                </div>

                {/* Child Table Box */}
                <div className="p-3 rounded-lg border border-cyan-500/40 bg-slate-900">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Child Table: student_payments</span>
                    <span className="text-[10px] font-mono text-cyan-400">ENGINE=InnoDB</span>
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400">
                    • payment_id INT PRIMARY KEY<br />
                    • student_id INT {fkActive ? "(FK → students.student_id)" : "(Raw Column)"}
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
                Primary key conversion and ETL ingestion patterns from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Primary Key UUID Migration Workflow
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Refactoring</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Removing AUTO_INCREMENT attribute first, dropping old Primary Key, and establishing UUID key.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Remove AUTO_INCREMENT from column
ALTER TABLE students MODIFY student_id INT NOT NULL;

-- Step 2: Drop existing Primary Key
ALTER TABLE students DROP PRIMARY KEY;

-- Step 3: Add new UUID column and new Primary Key
ALTER TABLE students
    ADD COLUMN student_uuid CHAR(36) NOT NULL FIRST,
    ADD CONSTRAINT pk_students PRIMARY KEY (student_uuid);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata High-Speed ETL Bulk Load
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Data Warehouse</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bypassing referential checks during million-row bulk loading and re-enabling immediately.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Disable runtime foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Step 2: High-speed bulk CSV ingest
LOAD DATA INFILE '/var/lib/mysql-files/orders_batch.csv' INTO TABLE orders;

-- Step 3: Re-enable foreign key checks immediately!
SET FOREIGN_KEY_CHECKS = 1;`}
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
                Avoid Error 1075 and leftover orphaned indexes
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
                  <strong className="text-white">1. Dropping AUTO_INCREMENT PK Directly:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Fails with Error 1075 unless AUTO_INCREMENT is removed with <code>MODIFY</code> first.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Leaving FOREIGN_KEY_CHECKS = 0:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting to re-enable allows corrupt orphaned records to enter the database unnoticed.
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
                  <strong className="text-white">1. Drop Redundant Indexes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Run <code>DROP INDEX</code> after <code>DROP FOREIGN KEY</code> if the index is no longer needed.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Dependency Graph Audit:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Query <code>information_schema.KEY_COLUMN_USAGE</code> to verify all child dependencies before drops.
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
              <span>Drop foreign keys with <code>ALTER TABLE tbl DROP FOREIGN KEY fk_name</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Drop CHECK constraints with <code>ALTER TABLE tbl DROP CHECK chk_name</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Drop Unique constraints with <code>ALTER TABLE tbl DROP INDEX uq_name</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Remove <code>AUTO_INCREMENT</code> before dropping a Primary Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Drop child tables/FKs before dropping parent master tables (Error 3730)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always reset <code>SET FOREIGN_KEY_CHECKS = 1</code> after administrative ETL</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Dropping Constraints & Dependencies – FAQs"
            questions={questions}
            subtitle="Master constraint removal, managing foreign key dependency graphs, and schema teardowns with 30 comprehensive Q&As"
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
            title="Dropping Constraints and Foreign Key Dependencies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_dropping_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Congratulations on completing Module 3 on Keys, Constraints & Data Integrity! " +
              "In this final topic, we explored the mechanics of dismantling and refactoring constraints. " +
              "In my classes in Barrackpore, I always remind students: dropping constraints is easy, but understanding " +
              "the relational dependency tree is what makes you a master database architect. When dropping tables, always " +
              "drop children before parents, or detach foreign keys first. When modifying primary keys, remember to strip " +
              "`AUTO_INCREMENT` first. And never leave `FOREIGN_KEY_CHECKS = 0` running in production sessions! " +
              "With these principles, your schemas will remain resilient, performant, and pristine."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · Dropping Constraints · Module 3 Complete · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
