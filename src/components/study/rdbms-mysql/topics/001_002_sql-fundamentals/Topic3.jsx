import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – CREATE TABLE Syntax and Table Structure
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Table Schema Designer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Table Designer State
  const [tableName, setTableName] = useState("students");
  const [columns, setColumns] = useState([
    { name: "student_id", type: "INT UNSIGNED", isPk: true, isAuto: true, isNotNull: true, defaultVal: "" },
    { name: "full_name", type: "VARCHAR(100)", isPk: false, isAuto: false, isNotNull: true, defaultVal: "" },
    { name: "email", type: "VARCHAR(100)", isPk: false, isAuto: false, isNotNull: true, defaultVal: "" },
    { name: "admission_fee", type: "DECIMAL(8, 2)", isPk: false, isAuto: false, isNotNull: true, defaultVal: "15000.00" },
    { name: "created_at", type: "TIMESTAMP", isPk: false, isAuto: false, isNotNull: true, defaultVal: "CURRENT_TIMESTAMP" },
  ]);

  const [newColName, setNewColName] = useState("");
  const [newColType, setNewColType] = useState("VARCHAR(50)");
  const [newColNotNull, setNewColNotNull] = useState(true);

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

  const handleAddColumn = () => {
    if (!newColName.trim()) return;
    const sanitized = newColName.trim().replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
    setColumns([
      ...columns,
      {
        name: sanitized,
        type: newColType,
        isPk: false,
        isAuto: false,
        isNotNull: newColNotNull,
        defaultVal: "",
      },
    ]);
    setNewColName("");
  };

  const handleRemoveColumn = (indexToRemove) => {
    if (columns.length &le; 1) return;
    setColumns(columns.filter((_, i) => i !== indexToRemove));
  };

  // Generate DDL string
  const generatedDDL = `CREATE TABLE IF NOT EXISTS ${tableName.trim() || "my_table"} (\n${columns
    .map((c) => {
      let line = `    ${c.name} ${c.type}`;
      if (c.isNotNull) line += " NOT NULL";
      if (c.isAuto) line += " AUTO_INCREMENT";
      if (c.isPk) line += " PRIMARY KEY";
      if (c.defaultVal && !c.isAuto && !c.isPk) {
        line += ` DEFAULT ${c.defaultVal === "CURRENT_TIMESTAMP" ? "CURRENT_TIMESTAMP" : `'${c.defaultVal}'`}`;
      }
      return line;
    })
    .join(",\n")}\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`;

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
            Module 001_002 · SQL Fundamentals · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            CREATE TABLE Syntax &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Table Structure
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational schema blueprints, column constraints, PRIMARY KEY indexing,
            AUTO_INCREMENT sequences, and generated stored columns.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 CREATE TABLE Syntax
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 PRIMARY KEY & Clustered Index
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ AUTO_INCREMENT & NOT NULL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚀 InnoDB & utf8mb4 Engine
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Anatomy of a Relational Table ──────────── */}
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
                Anatomy of a Relational Table
              </h2>
              <p className="text-xs text-slate-400">
                Attributes, Tuples, B+ Tree Clustered Primary Keys, and Data Integrity
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In MySQL InnoDB, a table is not just an arbitrary list of records—it is a tightly structured
              <strong> Clustered B+ Tree Index</strong> sorted physically by the <code>PRIMARY KEY</code>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">1. Columns (Attributes)</span>
                <p className="text-xs text-slate-400">Define the schema contract: name, data type, storage length, nullability, and default value.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">2. Rows (Tuples)</span>
                <p className="text-xs text-slate-400">Individual entity instances inserted into 16KB InnoDB disk pages.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">3. Table Constraints</span>
                <p className="text-xs text-slate-400">Enforce domain integrity: PRIMARY KEY, UNIQUE, FOREIGN KEY, and CHECK rules.</p>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Table Anatomy & Storage ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Relational Table Structural Schema & Clustered B+ Tree
            </h3>
            <svg
              viewBox="0 0 780 220"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Table Structure and Clustered Index Architecture"
            >
              {/* Header Row */}
              <g transform="translate(30, 20)">
                <rect width="720" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="50" y="22" fill="#38bdf8" fontWeight="bold">🔑 student_id (PK)</text>
                <text x="210" y="22" fill="#818cf8" fontWeight="bold">📝 first_name</text>
                <text x="360" y="22" fill="#818cf8" fontWeight="bold">📝 email (UNIQUE)</text>
                <text x="530" y="22" fill="#34d399" fontWeight="bold">💰 admission_fee (₹)</text>
                <text x="660" y="22" fill="#f59e0b" fontWeight="bold">⏱️ created_at</text>
              </g>

              {/* Row 1 */}
              <g transform="translate(30, 65)">
                <rect width="720" height="32" rx="4" fill="#0f172a" stroke="#1e293b" />
                <text x="50" y="20" fill="#38bdf8" font-family="monospace">101 [AUTO]</text>
                <text x="210" y="20" fill="#cbd5e1">Mamata</text>
                <text x="360" y="20" fill="#cbd5e1">mamata@codernaccotax.in</text>
                <text x="530" y="20" fill="#34d399" font-family="monospace">₹15,000.00</text>
                <text x="660" y="20" fill="#94a3b8" font-family="monospace">2026-08-24</text>
              </g>

              {/* Row 2 */}
              <g transform="translate(30, 105)">
                <rect width="720" height="32" rx="4" fill="#0f172a" stroke="#1e293b" />
                <text x="50" y="20" fill="#38bdf8" font-family="monospace">102 [AUTO]</text>
                <text x="210" y="20" fill="#cbd5e1">Abhronila</text>
                <text x="360" y="20" fill="#cbd5e1">abhronila@gmail.com</text>
                <text x="530" y="20" fill="#34d399" font-family="monospace">₹18,500.00</text>
                <text x="660" y="20" fill="#94a3b8" font-family="monospace">2026-08-24</text>
              </g>

              {/* Row 3 */}
              <g transform="translate(30, 145)">
                <rect width="720" height="32" rx="4" fill="#0f172a" stroke="#1e293b" />
                <text x="50" y="20" fill="#38bdf8" font-family="monospace">103 [AUTO]</text>
                <text x="210" y="20" fill="#cbd5e1">Susmita</text>
                <text x="360" y="20" fill="#cbd5e1">susmita@kolkata.org</text>
                <text x="530" y="20" fill="#34d399" font-family="monospace">₹15,000.00</text>
                <text x="660" y="20" fill="#94a3b8" font-family="monospace">2026-08-24</text>
              </g>

              {/* Clustered index note */}
              <g transform="translate(30, 188)">
                <text x="0" y="16" fill="#14b8a6" fontWeight="bold" fontSize="11">
                  ⚡ InnoDB Clustered Index: All row data is stored directly in leaf pages ordered by student_id
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Table Schema Designer ──────── */}
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
                Interactive Visual Table Schema Designer
              </h2>
              <p className="text-xs text-slate-400">
                Add columns, configure data types and constraints, and generate production-grade DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Table Name Input */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                Table Name:
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="e.g. students, products, enrollments"
                className="w-full max-w-xs rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
              /&gt;
            </div>

            {/* Current Columns List */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Column Name</th>
                    <th className="p-3">Data Type</th>
                    <th className="p-3">Constraints</th>
                    <th className="p-3">Default Value</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                  {columns.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">{c.name}</td>
                      <td className="p-3 text-cyan-400">{c.type}</td>
                      <td className="p-3 text-xs">
                        {c.isPk && <span className="mr-1 text-teal-400 font-bold">[PK]</span>}
                        {c.isAuto && <span className="mr-1 text-amber-400">[AUTO_INC]</span>}
                        {c.isNotNull && <span className="text-slate-400">NOT NULL</span>}
                      </td>
                      <td className="p-3 text-slate-400">{c.defaultVal || "—"}</td>
                      <td className="p-3 text-right">
                        {!c.isPk && (
                          <button
                            onClick={() => handleRemoveColumn(i)}
                            className="text-rose-400 hover:text-rose-300 font-sans text-xs underline"
                          &gt;
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Column Mini-Form */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs uppercase font-bold text-teal-400 tracking-wider block mb-3">
                ➕ Add New Column:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <input
                    type="text"
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    placeholder="Column name (e.g. phone_no)"
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
                <div>
                  <select
                    value={newColType}
                    onChange={(e) => setNewColType(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    <option value="VARCHAR(50)">VARCHAR(50)</option>
                    <option value="VARCHAR(100)">VARCHAR(100)</option>
                    <option value="CHAR(10)">CHAR(10)</option>
                    <option value="INT UNSIGNED">INT UNSIGNED</option>
                    <option value="SMALLINT UNSIGNED">SMALLINT UNSIGNED</option>
                    <option value="TINYINT(1)">TINYINT(1) (Boolean)</option>
                    <option value="DECIMAL(10, 2)">DECIMAL(10, 2) (₹)</option>
                    <option value="DATE">DATE</option>
                    <option value="TEXT">TEXT</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newColNotNull}
                      onChange={(e) => setNewColNotNull(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500"
                    /&gt;
                    NOT NULL
                  </label>
                </div>
                <div>
                  <button
                    onClick={handleAddColumn}
                    className="w-full py-2 px-4 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                  >
                    Add Column
                  </button>
                </div>
              </div>
            </div>

            {/* Generated DDL Output */}
            <div>
              <span className="text-xs uppercase font-bold text-teal-400 tracking-wider block mb-2">
                Live Generated DDL Script:
              </span>
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 leading-relaxed">
                {generatedDDL}
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
                Real-World Production Table Schemas
              </h2>
              <p className="text-xs text-slate-400">
                DDL blueprints from Barrackpore, Kolkata & Jadavpur scenarios
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Barrackpore College Course Enrollment Bridge Table
                </h3>
                <span className="text-xs text-slate-500 font-mono">Students: Mamata & Abhronila</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Junction table with composite primary key and foreign key constraints.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE IF NOT EXISTS course_enrollments (
    student_id INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    enrollment_date DATE NOT NULL,
    fee_paid DECIMAL(8, 2) NOT NULL DEFAULT 0.00, -- ₹
    grade_letter CHAR(2) DEFAULT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Kolkata Retail E-Commerce Orders with Stored Generated Column
                </h3>
                <span className="text-xs text-slate-500 font-mono">Students: Susmita & Debangshu</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Order header table with auto-calculated total amount stored column.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE IF NOT EXISTS customer_orders (
    order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number CHAR(16) UNIQUE NOT NULL,
    customer_id INT UNSIGNED NOT NULL,
    item_subtotal DECIMAL(10, 2) NOT NULL,
    gst_tax DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) AS (item_subtotal + gst_tax) STORED,
    order_status ENUM('pending', 'paid', 'shipped', 'cancelled') NOT NULL DEFAULT 'pending',
    order_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;`}
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
                Structural rules that keep database tables fast and bug-free
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
                  <strong className="text-white">1. Multiple AUTO_INCREMENT Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    MySQL allows only ONE auto-increment column per table and it must be indexed.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Trailing Comma Syntax Error:</strong>
                  <p className="text-slate-400 mt-0.5">
                    A comma after the last column definition before <code>)</code> throws Error 1064.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Missing Explicit Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forces InnoDB to allocate an internal hidden 6-byte row ID causing lock contention.
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
                  <strong className="text-white">1. Standardize on InnoDB & utf8mb4:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees ACID transactions, row-level locking, and universal Unicode compatibility.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enforce NOT NULL by Default:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Avoid nullable columns unless NULL represents genuine unknown business state.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Use DECIMAL for Money (₹):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Never use FLOAT or DOUBLE for fees, salaries, or invoice totals.
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
              <span>Always define an explicit PRIMARY KEY for InnoDB clustered indexing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Only one AUTO_INCREMENT column is permitted per table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use IF NOT EXISTS for idempotent migration scripts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use STORED generated columns for auto-calculated indexed totals</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CREATE TABLE ... LIKE creates an exact structural clone</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce NOT NULL with sensible DEFAULT fallback values</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="CREATE TABLE Syntax & Structure – FAQs"
            questions={questions}
            subtitle="Master table definitions, constraints, primary key indexing, and storage options with 30 comprehensive Q&As"
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
            title="CREATE TABLE Syntax and Table Structure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_create_table_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A table definition is a binding contract between your application code and your database engine. " +
              "In my classes at Barrackpore, I teach students that a poorly structured table (missing primary keys, " +
              "loose data types, arbitrary nullable columns) will create subtle bugs and performance bottlenecks " +
              "that no amount of application code can fix later. Spend the time upfront to select precise data types, " +
              "define meaningful constraints, and use `ENGINE = InnoDB DEFAULT CHARSET = utf8mb4` on every table."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · CREATE TABLE Syntax & Structure · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
