import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Naming Table Constraints (CONSTRAINT symbol_name ...)
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Constraint Naming Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [namingStyle, setNamingStyle] = useState("named"); // "anonymous" vs "named"
  const [violationType, setViolationType] = useState("fee_check"); // "fee_check", "email_unique", "fk_student"

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

  // Error simulation details
  let simulatedError = "";
  let errorExplanation = "";

  if (namingStyle === "anonymous") {
    if (violationType === "fee_check") {
      simulatedError = "ERROR 3819 (HY000): Check constraint 'students_chk_1' is violated.";
      errorExplanation =
        "Cryptic Anonymous Symbol: Developer must open the database dictionary or inspect `SHOW CREATE TABLE` to figure out which column and rule 'students_chk_1' actually refers to.";
    } else if (violationType === "email_unique") {
      simulatedError = "ERROR 1062 (23000): Duplicate entry 'mamata@gmail.com' for key 'email'";
      errorExplanation =
        "Default Index Name: Uses column name directly without standardized architectural prefixes.";
    } else {
      simulatedError =
        "ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`college_db`.`student_payments`, CONSTRAINT `student_payments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`))";
      errorExplanation =
        "Random Auto-Generated Symbol (`student_payments_ibfk_1`): Migration scripts will fail across environments because auto-generated indices vary between staging and production.";
    }
  } else {
    if (violationType === "fee_check") {
      simulatedError = "ERROR 3819 (HY000): Check constraint 'chk_students_fee_floor' is violated.";
      errorExplanation =
        "Self-Documenting Named Constraint: The error immediately reveals the table (`students`) and the broken business rule (`fee_floor >= ₹10,000`), requiring zero reverse-engineering!";
    } else if (violationType === "email_unique") {
      simulatedError = "ERROR 1062 (23000): Duplicate entry 'mamata@gmail.com' for key 'uq_students_email'";
      errorExplanation =
        "Standardized Unique Prefix (`uq_`): Instantly informs engineers that the unique constraint on student email was violated.";
    } else {
      simulatedError =
        "ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`college_db`.`student_payments`, CONSTRAINT `fk_payments_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`))";
      errorExplanation =
        "Deterministic Named FK (`fk_payments_students`): Clear parent-child relationship identifier that can be reliably dropped or altered in CI/CD migrations.";
    }
  }

  const generatedDDL =
    namingStyle === "anonymous"
      ? `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    email VARCHAR(100) NOT NULL UNIQUE,\n    admission_fee DECIMAL(10, 2) NOT NULL,\n    CHECK (admission_fee >= 10000.00)\n) ENGINE=InnoDB;`
      : `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT,\n    email VARCHAR(100) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL,\n    -- Standardized Named Constraints\n    CONSTRAINT pk_students PRIMARY KEY (student_id),\n    CONSTRAINT uq_students_email UNIQUE (email),\n    CONSTRAINT chk_students_fee_floor CHECK (admission_fee >= 10000.00)\n) ENGINE=InnoDB;`;

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
            Module 001_003 · Keys & Constraints · Topic 11
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Naming Table Constraints with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              CONSTRAINT symbol_name
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master industry-standard constraint prefixes (<code>pk_</code>, <code>fk_</code>, <code>uq_</code>, <code>chk_</code>),
            schema-wide uniqueness rules, self-documenting error logs, and deterministic migration scripts.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ Standard Prefix Conventions
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Self-Documenting Errors
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Global Schema Scope (FK)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚀 Deterministic Migrations
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Standard Prefix Conventions ─────────────── */}
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
                Industry-Standard Constraint Naming Conventions
              </h2>
              <p className="text-xs text-slate-400">
                Standardized prefixes for maintainable enterprise relational schemas
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { prefix: "pk_", title: "Primary Key", example: "CONSTRAINT pk_students", desc: "Clustered index key" },
              { prefix: "fk_", title: "Foreign Key", example: "CONSTRAINT fk_payments_student", desc: "Must be schema-unique" },
              { prefix: "uq_", title: "Unique Key", example: "CONSTRAINT uq_students_email", desc: "Secondary unique index" },
              { prefix: "chk_", title: "CHECK Rule", example: "CONSTRAINT chk_students_fee_floor", desc: "Business boundary rule" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-teal-400">{item.prefix}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{item.title}</span>
                </div>
                <div className="font-mono text-[11px] text-slate-300 truncate">{item.example}</div>
                <div className="text-[10px] text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* ── Semantic SVG 1: Anonymous vs Named Comparison ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Error Clarity – Anonymous Auto-Generated Symbols vs Explicitly Named Constraints
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Constraint Naming Comparison"
            >
              {/* Anonymous Box */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ Anonymous Auto-Generated Symbols
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">Error: Check constraint 'students_chk_1' is violated</text>
                <text x="20" y="74" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ Which column? What rule? Requires schema reverse-engineering</text>
              </g>

              {/* Named Box */}
                <g transform="translate(410, 20)">
                  <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                  <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                    ✓ Clean Constraint Names (Best Practice)
                  </text>
                  <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                  <text x="20" y="54" fill="#cbd5e1" fontSize="10">Error: Check constraint 'chk_students_fee_floor' is violated.</text>
                  <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">✓ Self-documenting: Table 'students', Rule 'fee_floor &gt;= ₹10,000'</text>
                </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Constraint Naming Sandbox ─────── */}
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
                Interactive Constraint Error Clarity Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between anonymous vs explicitly named constraints and simulate constraint violation errors
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Constraint Declaration Style:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNamingStyle("anonymous")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      namingStyle === "anonymous"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Anonymous Syntax
                  </button>
                  <button
                    onClick={() => setNamingStyle("named")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      namingStyle === "named"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Explicit CONSTRAINT Names
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Simulate Violation On:
                </label>
                <div className="space-y-2">
                  {[
                    { id: "fee_check", label: "CHECK Constraint Violation (Fee < ₹10k)", code: "Error 3819" },
                    { id: "email_unique", label: "UNIQUE Constraint Violation (Duplicate Email)", code: "Error 1062" },
                    { id: "fk_student", label: "FOREIGN KEY Violation (Bad Parent Reference)", code: "Error 1452" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setViolationType(v.id)}
                      className={clsx(
                        "w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between",
                        violationType === v.id
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      <span>{v.label}</span>
                      <span className="font-mono text-[10px] text-slate-500">{v.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Error Display & DDL */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  DDL Schema Syntax:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
                </pre>
              </div>

              {/* Simulated Error Output */}
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 space-y-2">
                <span className="text-[10px] uppercase font-bold text-rose-400 block">
                  Simulated MySQL Engine Error Output:
                </span>
                <pre className="p-2 rounded bg-slate-950 text-rose-300 font-mono text-xs overflow-x-auto border border-rose-500/20">
                  {simulatedError}
                </pre>
                <p className="text-xs text-slate-300 leading-relaxed">{errorExplanation}</p>
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
                Self-documenting constraint architectures from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Standardized Enterprise Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Schema</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Combining Primary, Unique, and CHECK constraints with standardized naming prefixes.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_admissions (
    student_id INT AUTO_INCREMENT,
    roll_no VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur') NOT NULL,
    -- Standardized Named Constraints
    CONSTRAINT pk_student_admissions PRIMARY KEY (student_id),
    CONSTRAINT uq_student_roll UNIQUE (roll_no),
    CONSTRAINT uq_student_email UNIQUE (email),
    CONSTRAINT chk_student_fee_floor CHECK (admission_fee >= 10000.00)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Linkage Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Explicitly named foreign keys and positive invoice amount CHECK rules.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_invoices (
    invoice_id BIGINT UNSIGNED AUTO_INCREMENT,
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    invoice_total DECIMAL(12, 2) NOT NULL,
    -- Named Referential Constraints
    CONSTRAINT pk_order_invoices PRIMARY KEY (invoice_id),
    CONSTRAINT fk_invoices_order FOREIGN KEY (order_id)
        REFERENCES orders(order_id) ON DELETE RESTRICT,
    CONSTRAINT fk_invoices_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id) ON DELETE RESTRICT,
    CONSTRAINT chk_invoices_total CHECK (invoice_total > 0.00)
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
                Avoid duplicate FK symbol collisions across tables and syntax errors
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
                  <strong className="text-white">1. Duplicate FK Names Across Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Naming FKs <code>fk_student</code> in two different tables causes Error 1005 (Duplicate FK name).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Cryptic Short Names (c1, fk1):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Hinders production debugging when errors are logged in cloud monitoring tools.
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
                  <strong className="text-white">1. Use Standard Prefixes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>pk_</code>, <code>fk_</code>, <code>uq_</code>, <code>chk_</code> prefixes.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Schema-Unique FK Symbols:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Format FKs as <code>fk_childtable_parenttable</code> for global schema uniqueness.
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
              <span>Explicitly name all constraints using <code>CONSTRAINT symbol_name</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use standard prefixes: <code>pk_</code>, <code>fk_</code>, <code>uq_</code>, <code>chk_</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Foreign Key constraint names MUST be unique across the entire database schema</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Self-documenting constraint names make production error logs instantly readable</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Named constraints enable reliable, deterministic automated migration scripts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Inspect all table constraints via <code>information_schema.TABLE_CONSTRAINTS</code></span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Naming Table Constraints – FAQs"
            questions={questions}
            subtitle="Master constraint naming conventions, self-documenting error logs, and migration stability with 30 comprehensive Q&As"
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
            title="Naming Table Constraints (CONSTRAINT symbol_name ...)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_naming_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In software engineering, you write code once, but read it and debug it a hundred times. " +
              "In my classes in Barrackpore, I make it a strict rule for students: never write anonymous constraints! " +
              "When an exception occurs at 2 AM in your production API and your logs show `Check constraint 'students_chk_1' is violated`, " +
              "you will waste half an hour trying to remember which column that was. If you instead named it `chk_students_fee_floor`, " +
              "you know immediately that the tuition fee was below ₹10,000. Name your constraints explicitly, follow `fk_child_parent` " +
              "naming rules, and your database migrations will remain smooth, predictable, and professional."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · Named Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
