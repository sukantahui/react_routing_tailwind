import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – NOT NULL Constraint: Enforcing Mandatory Field Values
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive NOT NULL Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [inputValueType, setInputValueType] = useState("null"); // "valid", "null", "empty_str", "whitespace"
  const [includeCheckConstraint, setIncludeCheckConstraint] = useState(false);

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

  // Evaluation logic
  let testedValueDisplay = "";
  let outcomeStatus = "success";
  let engineMessage = "";
  let outcomeTitle = "";

  if (inputValueType === "valid") {
    testedValueDisplay = "'Mamata'";
    outcomeStatus = "success";
    outcomeTitle = "✓ Query OK, 1 row affected (0.01 sec)";
    engineMessage = "Passed! 'Mamata' is a non-null, non-empty valid string.";
  } else if (inputValueType === "null") {
    testedValueDisplay = "NULL";
    outcomeStatus = "error";
    outcomeTitle = "❌ ERROR 1048 (23000): Column 'first_name' cannot be null";
    engineMessage = "Violates NOT NULL constraint! MySQL rejected the insertion of NULL.";
  } else if (inputValueType === "empty_str") {
    testedValueDisplay = "'' (Empty String of length 0)";
    if (includeCheckConstraint) {
      outcomeStatus = "error";
      outcomeTitle = "❌ ERROR 3819 (HY000): Check constraint 'chk_name' is violated";
      engineMessage = "Empty string '' passed NOT NULL, but was REJECTED by CHECK (TRIM(first_name) != '')!";
    } else {
      outcomeStatus = "warning";
      outcomeTitle = "⚠️ Query OK, 1 row affected (Empty String Inserted)";
      engineMessage = "WARNING: An empty string '' satisfies NOT NULL because length=0 is not NULL! Use CHECK constraint to block empty text.";
    }
  } else if (inputValueType === "whitespace") {
    testedValueDisplay = "'   ' (Spaces only)";
    if (includeCheckConstraint) {
      outcomeStatus = "error";
      outcomeTitle = "❌ ERROR 3819 (HY000): Check constraint 'chk_name' is violated";
      engineMessage = "Whitespace string '   ' passed NOT NULL, but was REJECTED by CHECK (TRIM(first_name) != '')!";
    } else {
      outcomeStatus = "warning";
      outcomeTitle = "⚠️ Query OK, 1 row affected (Blank Whitespace Inserted)";
      engineMessage = "WARNING: Blank spaces '   ' satisfy NOT NULL! Add CHECK (TRIM(first_name) != '') to ensure real text.";
    }
  }

  const generatedDDL = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00${
    includeCheckConstraint ? ",\n    CONSTRAINT chk_name CHECK (TRIM(first_name) != '')" : ""
  }\n) ENGINE=InnoDB;`;

  const sampleSQL = `INSERT INTO students (student_id, first_name, admission_fee)\nVALUES (101, ${
    inputValueType === "null"
      ? "NULL"
      : inputValueType === "empty_str"
      ? "''"
      : inputValueType === "whitespace"
      ? "'   '"
      : "'Mamata'"
  }, 15000.00);`;

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
            Module 001_003 · Keys & Constraints · Topic 5
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            NOT NULL{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraint & Mandatory Data
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master mandatory column value enforcement, NULL vs empty string ('') nuances,
            InnoDB null bitmap storage optimization, and pairing NOT NULL with CHECK constraints.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Mandatory Column Values
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 NULL vs Empty String ('')
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ InnoDB Row Storage Optimization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 CHECK (TRIM(col) != '')
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: NULL vs Empty String vs Zero ───────────── */}
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
                NULL vs Empty String ('') vs Numerical Zero (0)
              </h2>
              <p className="text-xs text-slate-400">
                Understanding what NOT NULL protects against and where CHECK constraints are required
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* NULL */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                NULL (Absence of Value)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Represents missing or unknown data. Strictly BLOCKED by <code>NOT NULL</code>.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                first_name VARCHAR(50) NOT NULL
                -- Rejects NULL (Error 1048)
              </pre>
            </div>

            {/* Empty String */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                '' (Empty String of Length 0)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                A valid concrete string! PASSES <code>NOT NULL</code> constraints unless paired with CHECK.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                -- Passes NOT NULL!
                CHECK (TRIM(name) != '')
              </pre>
            </div>

            {/* Zero */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                0 (Concrete Number Zero)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                A concrete mathematical value. PASSES <code>NOT NULL</code> constraints completely.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                admission_fee DECIMAL(10, 2) NOT NULL
                -- 0.00 is accepted
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: NULL vs Empty String Matrix ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Evaluation Matrix of NOT NULL vs NOT NULL + CHECK(TRIM(col) != '')
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="NOT NULL Evaluation Matrix"
            >
              {[
                { val: "Value: 'Mamata'", nn: "✓ ALLOWED", chk: "✓ ALLOWED", color: "#10b981" },
                { val: "Value: NULL", nn: "❌ REJECTED (1048)", chk: "❌ REJECTED (1048)", color: "#f43f5e" },
                { val: "Value: '' (Empty)", nn: "⚠️ ALLOWED", chk: "❌ REJECTED (3819)", color: "#f59e0b" },
                { val: "Value: '   ' (Spaces)", nn: "⚠️ ALLOWED", chk: "❌ REJECTED (3819)", color: "#38bdf8" },
              ].map((m, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 190}, 20)`}>
                  <rect width="175" height="90" rx="8" fill="#1e293b" stroke={m.color} />
                  <text x="87" y="24" fill={m.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {m.val}
                  </text>
                  <line x1="10" y1="34" x2="165" y2="34" stroke="#334155" />
                  <text x="15" y="52" fill="#cbd5e1" fontSize="9">NOT NULL Only:</text>
                  <text x="160" y="52" fill="#cbd5e1" textAnchor="end" fontSize="9" fontWeight="bold">{m.nn}</text>
                  <text x="15" y="74" fill="#cbd5e1" fontSize="9">+ CHECK(TRIM):</text>
                  <text x="160" y="74" fill={m.color} textAnchor="end" fontSize="9" fontWeight="bold">{m.chk}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive NOT NULL Sandbox ───────────── */}
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
                Interactive NOT NULL & CHECK Constraint Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Submit different value types and toggle CHECK constraints to observe engine validation
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Test Value for first_name:
                </label>
                <div className="space-y-2">
                  {[
                    { id: "valid", label: "Valid Text ('Mamata')", desc: "Standard populated string" },
                    { id: "null", label: "SQL NULL", desc: "Absence of value (triggers NOT NULL error)" },
                    { id: "empty_str", label: "Empty String ('' of length 0)", desc: "Zero-length string" },
                    { id: "whitespace", label: "Blank Whitespace ('   ')", desc: "Spaces with no text" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setInputValueType(opt.id)}
                      className={clsx(
                        "w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all",
                        inputValueType === opt.id
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-[10px] text-slate-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCheckConstraint}
                    onChange={(e) => setIncludeCheckConstraint(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-900 text-teal-500 focus:ring-0"
                  />
                  <span>Enable <code>CHECK (TRIM(first_name) != '')</code></span>
                </label>
              </div>

              {/* Feedback Box */}
              <div
                className={clsx(
                  "p-3.5 rounded-xl border transition-all",
                  outcomeStatus === "success"
                    ? "border-teal-500/40 bg-teal-500/10"
                    : outcomeStatus === "warning"
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-rose-500/40 bg-rose-500/10"
                )}
              >
                <span
                  className={clsx(
                    "text-xs font-bold font-mono block mb-1",
                    outcomeStatus === "success"
                      ? "text-teal-300"
                      : outcomeStatus === "warning"
                      ? "text-amber-300"
                      : "text-rose-400"
                  )}
                >
                  {outcomeTitle}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{engineMessage}</p>
              </div>
            </div>

            {/* Generated DDL & Sample SQL */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Table DDL Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Evaluated SQL INSERT:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {sampleSQL}
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
                Mandatory schema designs from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Enrollment Mandatory Fields
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Admissions</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enforcing non-null and non-whitespace mandatory names and admission fee defaults.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_admissions (
    admission_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    admission_date DATE NOT NULL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    CONSTRAINT chk_first_name CHECK (TRIM(first_name) != '')
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Financial Transaction Ledger
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financials</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero-null ledger where all monetary amounts, account references, and timestamps are strictly mandatory.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE financial_transactions (
    txn_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    txn_type ENUM('DEBIT', 'CREDIT') NOT NULL,
    txn_timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
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
                Prevent accidental blank text entries and migration failures
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
                  <strong className="text-white">1. Assuming NOT NULL Blocks Blank Text:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Empty strings <code>''</code> satisfy NOT NULL. Must add <code>CHECK (TRIM(col) != '')</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Adding NOT NULL to Legacy Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Fails with Error 1138 unless existing NULLs are updated with defaults first.
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
                  <strong className="text-white">1. NOT NULL by Default:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Make columns NOT NULL by default unless nullability is strictly justified.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Provide DEFAULT Fallbacks:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>NOT NULL DEFAULT ...</code> for flexible API contract evolution.
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
              <span><code>NOT NULL</code> rejects missing or unassigned values (Error 1048)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Empty strings <code>''</code> and numerical zeros <code>0</code> satisfy NOT NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Combine with <code>CHECK (TRIM(col) != '')</code> to forbid whitespace text</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Default to <code>NOT NULL</code> across all production schema designs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Populate legacy NULL rows before altering a column to NOT NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Keeps InnoDB row headers compact by eliminating null bitmap flags</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="NOT NULL Constraints – FAQs"
            questions={questions}
            subtitle="Master mandatory column values, NULL vs empty string nuances, and storage optimization with 30 comprehensive Q&As"
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
            title="NOT NULL Constraint: Enforcing Mandatory Field Values"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_not_null_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "One of the biggest mistakes novice developers make is assuming `NOT NULL` prevents users from submitting " +
              "blank names. In my classes in Barrackpore, I demonstrate how a user can submit an empty string `''` or a bunch " +
              "of spaces `'   '` and MySQL will happily accept it because an empty string is a valid string, not a NULL. " +
              "If you want to enforce genuine, meaningful text data, always pair `NOT NULL` with a MySQL 8.0 `CHECK (TRIM(col) != '')` " +
              "constraint. That one line of DDL prevents blank profiles, empty product names, and corrupted user directories."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · NOT NULL Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
