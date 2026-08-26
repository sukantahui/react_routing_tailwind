import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – ALTER TABLE (ADD, MODIFY, CHANGE, DROP Column, RENAME)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive ALTER TABLE builder,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive ALTER Builder State
  const [targetTable, setTargetTable] = useState("students");
  const [alterOp, setAlterOp] = useState("add"); // "add", "modify", "change", "rename", "drop"
  const [colName, setColName] = useState("phone_no");
  const [newColName, setNewColName] = useState("mobile_number");
  const [colType, setColType] = useState("CHAR(10)");
  const [colConstraint, setColConstraint] = useState("NOT NULL");
  const [position, setPosition] = useState("AFTER email");

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

  // Generate dynamic SQL based on active operation
  let generatedSQL = "";
  let opExplanation = "";

  switch (alterOp) {
    case "add":
      generatedSQL = `ALTER TABLE ${targetTable}\nADD ${colName} ${colType} ${colConstraint} ${position};`;
      opExplanation = `Appends new attribute '${colName}' without deleting existing records. In MySQL 8.0, this executes with ALGORITHM = INSTANT in under 1 millisecond.`;
      break;
    case "modify":
      generatedSQL = `ALTER TABLE ${targetTable}\nMODIFY ${colName} ${colType} ${colConstraint};`;
      opExplanation = `Alters the data type or constraints of '${colName}' while keeping its column name unchanged.`;
      break;
    case "change":
      generatedSQL = `ALTER TABLE ${targetTable}\nCHANGE ${colName} ${newColName} ${colType} ${colConstraint};`;
      opExplanation = `Renames '${colName}' to '${newColName}' and simultaneously redefines its data type.`;
      break;
    case "rename":
      generatedSQL = `ALTER TABLE ${targetTable}\nRENAME COLUMN ${colName} TO ${newColName};`;
      opExplanation = `Modern MySQL 8.0+ clean syntax to rename '${colName}' without having to restate its full data type definition.`;
      break;
    case "drop":
      generatedSQL = `ALTER TABLE ${targetTable}\nDROP COLUMN ${colName};`;
      opExplanation = `🚨 PERMANENT DATA DESTRUCTION: Removes '${colName}' and permanently wipes all data stored in that column across all records.`;
      break;
    default:
      break;
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
            Module 001_002 · SQL Fundamentals · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ALTER TABLE{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Operations & Online DDL
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master schema evolution without downtime: adding, modifying, changing, renaming,
            and dropping columns with MySQL 8.0 Instant DDL.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ➕ ADD & Column Positioning
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 MODIFY vs CHANGE vs RENAME
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🗑️ DROP COLUMN Mechanics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ ALGORITHM = INSTANT
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 5 Core ALTER Operations ────────────── */}
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
                The 5 Core Column Operations
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the distinct responsibilities of ADD, MODIFY, CHANGE, RENAME, and DROP
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Op 1: ADD */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                1. ADD COLUMN
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Adds a new column. Supports <code>FIRST</code> or <code>AFTER col</code> positioning.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                ALTER TABLE t ADD phone CHAR(10) AFTER name;
              </pre>
            </div>

            {/* Op 2: MODIFY */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                2. MODIFY COLUMN
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Changes data type or constraints without altering the column name.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                ALTER TABLE t MODIFY email VARCHAR(150) NOT NULL;
              </pre>
            </div>

            {/* Op 3: CHANGE */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                3. CHANGE COLUMN
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Renames and redefines column data type simultaneously.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-indigo-300 border border-slate-800">
                ALTER TABLE t CHANGE old_c new_c INT NOT NULL;
              </pre>
            </div>

            {/* Op 4: RENAME */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                4. RENAME COLUMN
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Clean MySQL 8.0+ rename without restating full data type definitions.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-purple-300 border border-slate-800">
                ALTER TABLE t RENAME COLUMN roll TO reg_no;
              </pre>
            </div>

            {/* Op 5: DROP */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                5. DROP COLUMN
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Permanently deletes the column and wipes all its historical record data.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                ALTER TABLE t DROP COLUMN temp_notes;
              </pre>
            </div>

            {/* Op 6: Batching */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                6. BATCHED ALTER
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Combines multiple operations into 1 single disk rebuild pass.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                ALTER TABLE t ADD a INT, MODIFY b VARCHAR(50);
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Online DDL & Instant Mechanics ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Legacy Copy Table vs MySQL 8.0 Instant DDL
            </h3>
            <svg
              viewBox="0 0 780 180"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Online DDL Comparison Diagram"
            >
              {/* Left: Legacy Copy */}
              <g transform="translate(30, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="11">
                  ❌ Legacy Table Copy (ALGORITHM = COPY)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="56" fill="#cbd5e1" fontSize="10">1. Creates temporary copy table</text>
                <text x="20" y="76" fill="#cbd5e1" fontSize="10">2. Copies all 10M rows row-by-row (Minutes of I/O)</text>
                <text x="20" y="96" fill="#cbd5e1" fontSize="10">3. Table locked against concurrent INSERTs</text>
                <text x="20" y="118" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ Heavy disk I/O & downtime risk</text>
              </g>

              {/* Right: Instant DDL */}
              <g transform="translate(410, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="11">
                  ⚡ MySQL 8.0 Instant DDL (ALGORITHM = INSTANT)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="56" fill="#cbd5e1" fontSize="10">1. Updates data dictionary metadata ONLY</text>
                <text x="20" y="76" fill="#cbd5e1" fontSize="10">2. No row copying, No tablespace rewriting</text>
                <text x="20" y="96" fill="#cbd5e1" fontSize="10">3. Completes in &lt; 1 millisecond</text>
                <text x="20" y="118" fill="#10b981" fontWeight="bold" fontSize="10">✓ Zero downtime, zero application lock</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive ALTER Statement Builder ───── */}
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
                Interactive ALTER TABLE Statement Builder
              </h2>
              <p className="text-xs text-slate-400">
                Configure modifications and inspect generated SQL alongside underlying engine behaviors
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Target Table:
                </label>
                <input
                  type="text"
                  value={targetTable}
                  onChange={(e) => setTargetTable(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                /&gt;
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Operation:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["add", "modify", "change", "rename", "drop"].map((op) => (
                    <button
                      key={op}
                      onClick={() => setAlterOp(op)}
                      className={clsx(
                        "py-2 px-2 rounded-lg text-xs font-bold uppercase transition-all border",
                        alterOp === op
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    &gt;
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Column Name:
                </label>
                <input
                  type="text"
                  value={colName}
                  onChange={(e) => setColName(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                /&gt;
              </div>

              {(alterOp === "change" || alterOp === "rename") && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    New Column Name:
                  </label>
                  <input
                    type="text"
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
              )}

              {alterOp !== "rename" && alterOp !== "drop" && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Data Type & Constraint:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={colType}
                      onChange={(e) => setColType(e.target.value)}
                      placeholder="CHAR(10)"
                      className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                    /&gt;
                    <input
                      type="text"
                      value={colConstraint}
                      onChange={(e) => setColConstraint(e.target.value)}
                      placeholder="NOT NULL"
                      className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                    /&gt;
                  </div>
                </div>
              )}
            </div>

            {/* Right Generated SQL Output */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 leading-relaxed overflow-x-auto">
                  {generatedSQL}
                </pre>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-1">Engine Impact:</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{opExplanation}</p>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 italic">
                Tip: Batch multiple statements together to minimize disk I/O on production tables.
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
                Real-World Schema Migration Case Studies
              </h2>
              <p className="text-xs text-slate-400">
                Production-grade DDL scripts from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Schema Upgrade
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Batched modification adding Aadhaar number, expanding email width, and updating fee default.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`ALTER TABLE students
    ADD aadhaar_no CHAR(12) UNIQUE NULL AFTER email,
    MODIFY email VARCHAR(120) NOT NULL,
    MODIFY admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 18500.00; -- ₹18,500`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Foreign Key Migration
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Adding delivery tracking and establishing foreign key constraint with cascade rules.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`ALTER TABLE customer_orders
    ADD tracking_no VARCHAR(40) NULL AFTER order_number,
    ADD CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE RESTRICT;`}
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
                Critical rules to avoid downtime and data loss during schema migrations
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
                  <strong className="text-white">1. Data Truncation on Type Narrowing:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Modifying <code>VARCHAR(100)</code> to <code>VARCHAR(30)</code> will fail or truncate long names in production.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Full Type in CHANGE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>CHANGE col_a col_b;</code> is a syntax error. Full type must be restated.
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
                  <strong className="text-white">1. Batch Alterations Together:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Combine multiple column additions and modifications into 1 single <code>ALTER TABLE</code> statement.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use ALGORITHM = INSTANT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures sub-millisecond zero-lock execution for compatible metadata operations.
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
              <span>Use <code>ADD [FIRST | AFTER col]</code> to position new columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>MODIFY</code> to change types/constraints without renaming</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>RENAME COLUMN</code> (MySQL 8.0+) for clean column renaming</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>DROP COLUMN</code> permanently destroys all column data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Batch multiple operations into a single ALTER to avoid multi-pass rewrites</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Leverage <code>ALGORITHM = INSTANT</code> for zero-downtime alterations</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="ALTER TABLE Statements – FAQs"
            questions={questions}
            subtitle="Master online DDL, column alterations, and zero-downtime schema evolution with 30 comprehensive Q&As"
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
            title="ALTER TABLE (ADD, MODIFY, CHANGE, DROP Column, RENAME)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_alter_table_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In real-world production engineering, altering tables with millions of live transactions is where " +
              "database architecture gets serious. Running an unoptimized `ALTER TABLE` during peak business hours can lock your " +
              "tables, cause query timeouts, and take your entire application down. In my classes at Barrackpore, I teach students " +
              "to always: 1) Batch modifications into a single statement, 2) Test data widening vs narrowing to avoid silent truncation, " +
              "and 3) Leverage MySQL 8.0's `ALGORITHM = INSTANT` for sub-second zero-downtime schema changes."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · ALTER TABLE Operations · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
