import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – DESCRIBE Table and SHOW CREATE TABLE
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Schema Inspector,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Schema Inspector State
  const [selectedTable, setSelectedTable] = useState("students");
  const [viewMode, setViewMode] = useState("describe"); // "describe" or "showCreate"

  const tablesData = {
    students: {
      describe: [
        { field: "student_id", type: "int unsigned", null: "NO", key: "PRI", default: "NULL", extra: "auto_increment" },
        { field: "roll_no", type: "varchar(20)", null: "NO", key: "UNI", default: "NULL", extra: "" },
        { field: "first_name", type: "varchar(50)", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "last_name", type: "varchar(50)", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "email", type: "varchar(100)", null: "NO", key: "UNI", default: "NULL", extra: "" },
        { field: "admission_fee", type: "decimal(8,2)", null: "NO", key: "", default: "15000.00", extra: "" },
        { field: "is_active", type: "tinyint(1)", null: "NO", key: "", default: "1", extra: "" },
        { field: "created_at", type: "timestamp", null: "YES", key: "", default: "CURRENT_TIMESTAMP", extra: "DEFAULT_GENERATED" },
      ],
      showCreate: `CREATE TABLE \`students\` (
  \`student_id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`roll_no\` varchar(20) NOT NULL,
  \`first_name\` varchar(50) NOT NULL,
  \`last_name\` varchar(50) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`admission_fee\` decimal(8,2) NOT NULL DEFAULT '15000.00',
  \`is_active\` tinyint(1) NOT NULL DEFAULT '1',
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`student_id\`),
  UNIQUE KEY \`roll_no\` (\`roll_no\`),
  UNIQUE KEY \`email\` (\`email\`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Barrackpore College Admissions'`,
    },
    customer_orders: {
      describe: [
        { field: "order_id", type: "bigint unsigned", null: "NO", key: "PRI", default: "NULL", extra: "auto_increment" },
        { field: "order_number", type: "char(16)", null: "NO", key: "UNI", default: "NULL", extra: "" },
        { field: "customer_id", type: "int unsigned", null: "NO", key: "MUL", default: "NULL", extra: "" },
        { field: "subtotal", type: "decimal(10,2)", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "gst_tax", type: "decimal(8,2)", null: "NO", key: "", default: "0.00", extra: "" },
        { field: "total_amount", type: "decimal(10,2)", null: "YES", key: "", default: "NULL", extra: "STORED GENERATED" },
        { field: "order_status", type: "enum('pending','paid','shipped')", null: "NO", key: "", default: "pending", extra: "" },
        { field: "order_date", type: "timestamp", null: "YES", key: "", default: "CURRENT_TIMESTAMP", extra: "DEFAULT_GENERATED" },
      ],
      showCreate: `CREATE TABLE \`customer_orders\` (
  \`order_id\` bigint unsigned NOT NULL AUTO_INCREMENT,
  \`order_number\` char(16) NOT NULL,
  \`customer_id\` int unsigned NOT NULL,
  \`subtotal\` decimal(10,2) NOT NULL,
  \`gst_tax\` decimal(8,2) NOT NULL DEFAULT '0.00',
  \`total_amount\` decimal(10,2) GENERATED ALWAYS AS ((\`subtotal\` + \`gst_tax\`)) STORED,
  \`order_status\` enum('pending','paid','shipped') NOT NULL DEFAULT 'pending',
  \`order_date\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`order_id\`),
  UNIQUE KEY \`order_number\` (\`order_number\`),
  KEY \`fk_order_customer_idx\` (\`customer_id\`),
  CONSTRAINT \`fk_order_customer\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\` (\`customer_id\`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Kolkata Retail Orders'`,
    },
    medicines: {
      describe: [
        { field: "medicine_id", type: "int unsigned", null: "NO", key: "PRI", default: "NULL", extra: "auto_increment" },
        { field: "medicine_name", type: "varchar(100)", null: "NO", key: "MUL", default: "NULL", extra: "" },
        { field: "batch_no", type: "varchar(30)", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "unit_price", type: "decimal(8,2)", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "expiry_date", type: "date", null: "NO", key: "", default: "NULL", extra: "" },
        { field: "stock_quantity", type: "smallint unsigned", null: "NO", key: "", default: "0", extra: "" },
      ],
      showCreate: `CREATE TABLE \`medicines\` (
  \`medicine_id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`medicine_name\` varchar(100) NOT NULL,
  \`batch_no\` varchar(30) NOT NULL,
  \`unit_price\` decimal(8,2) NOT NULL,
  \`expiry_date\` date NOT NULL,
  \`stock_quantity\` smallint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (\`medicine_id\`),
  KEY \`idx_med_name\` (\`medicine_name\`),
  CONSTRAINT \`chk_stock_positive\` CHECK ((\`stock_quantity\` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Ichapur Pharmacy Inventory'`,
    },
  };

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
            Module 001_002 · SQL Fundamentals · Topic 4
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            DESCRIBE Table &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              SHOW CREATE TABLE
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Learn how to inspect table schemas, decode column keys (PRI, UNI, MUL),
            extract complete DDL contracts, and troubleshoot Foreign Key constraints.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📋 DESCRIBE / DESC
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Decoding Keys (PRI, UNI, MUL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📜 SHOW CREATE TABLE Full DDL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ INFORMATION_SCHEMA.COLUMNS
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: DESCRIBE vs SHOW CREATE TABLE ──────────── */}
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
                Comparing Schema Inspection Tools
              </h2>
              <p className="text-xs text-slate-400">
                Summary grid inspection vs complete DDL blueprint extraction
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="font-mono text-base font-bold text-teal-400 mb-2">
                DESCRIBE / DESC table_name;
              </h3>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Quick, tabular overview of column names, data types, nullability, defaults, and index keys.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• <strong>Field:</strong> Column name.</li>
                <li>• <strong>Type:</strong> Data type with length precision.</li>
                <li>• <strong>Null:</strong> <code>YES</code> or <code>NO</code>.</li>
                <li>• <strong>Key:</strong> <code>PRI</code> (Primary), <code>UNI</code> (Unique), <code>MUL</code> (Multiple/Index).</li>
                <li>• <strong>Default:</strong> Fallback value or NULL.</li>
                <li>• <strong>Extra:</strong> <code>auto_increment</code>, generated columns.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="font-mono text-base font-bold text-cyan-400 mb-2">
                SHOW CREATE TABLE table_name;
              </h3>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Outputs the exact, restorable SQL <code>CREATE TABLE</code> DDL statement.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Exact <strong>Foreign Key constraint names</strong> & rules.</li>
                <li>• Full <strong>character sets & collations</strong> per column.</li>
                <li>• Table options (<code>ENGINE = InnoDB</code>, <code>AUTO_INCREMENT</code> next value).</li>
                <li>• CHECK constraints and table comments.</li>
                <li>• 100% copy-pasteable for migration scripts.</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Metadata Decoding Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: MySQL Data Dictionary Inspection Flow
            </h3>
            <svg
              viewBox="0 0 780 180"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Metadata extraction flow diagram"
            >
              {/* MySQL Data Dictionary */}
              <g transform="translate(30, 25)">
                <rect width="180" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="90" y="26" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="11">
                  🗄️ MySQL Data Dictionary
                </text>
                <line x1="15" y1="36" x2="165" y2="36" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" fontSize="10">• InnoDB mysql.ibd</text>
                <text x="20" y="78" fill="#cbd5e1" fontSize="10">• Columns Metadata</text>
                <text x="20" y="98" fill="#cbd5e1" fontSize="10">• Foreign Keys & Indexes</text>
                <text x="20" y="118" fill="#cbd5e1" fontSize="10">• Engine Options</text>
              </g>

              {/* Path 1: DESCRIBE */}
              <path d="M 215 65 L 340 45" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
              <g transform="translate(350, 20)">
                <rect width="390" height="60" rx="6" fill="#0f172a" stroke="#14b8a6" />
                <text x="15" y="22" fill="#14b8a6" fontWeight="bold" fontSize="11">DESCRIBE table_name;</text>
                <text x="15" y="44" fill="#94a3b8" fontSize="10">
                  Returns tabular column summary: [Field | Type | Null | Key | Default | Extra]
                </text>
              </g>

              {/* Path 2: SHOW CREATE TABLE */}
              <path d="M 215 115 L 340 135" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
              <g transform="translate(350, 100)">
                <rect width="390" height="60" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="15" y="22" fill="#38bdf8" fontWeight="bold" fontSize="11">SHOW CREATE TABLE table_name;</text>
                <text x="15" y="44" fill="#94a3b8" fontSize="10">
                  Returns complete restorable DDL: Constraints, Foreign Keys, Engine, Charset
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Schema Inspector Sandbox ──── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Schema Inspector Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select a table and switch between DESCRIBE grid view and SHOW CREATE TABLE DDL view
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Table Selection & View Mode Toggles */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Table:</span>
                <div className="flex gap-1.5">
                  {Object.keys(tablesData).map((tbl) => (
                    <button
                      key={tbl}
                      onClick={() => setSelectedTable(tbl)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                        selectedTable === tbl
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                      )}
                    >
                      {tbl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("describe")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    viewMode === "describe"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  )}
                >
                  DESCRIBE View
                </button>
                <button
                  onClick={() => setViewMode("showCreate")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    viewMode === "showCreate"
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  )}
                >
                  SHOW CREATE TABLE View
                </button>
              </div>
            </div>

            {/* Display Output */}
            {viewMode === "describe" ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Field</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Null</th>
                      <th className="p-3">Key</th>
                      <th className="p-3">Default</th>
                      <th className="p-3">Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                    {tablesData[selectedTable].describe.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-white">{row.field}</td>
                        <td className="p-3 text-cyan-400">{row.type}</td>
                        <td className="p-3 text-slate-400">{row.null}</td>
                        <td className="p-3">
                          {row.key === "PRI" && <span className="text-teal-400 font-bold">PRI</span>}
                          {row.key === "UNI" && <span className="text-amber-400 font-bold">UNI</span>}
                          {row.key === "MUL" && <span className="text-indigo-400 font-bold">MUL</span>}
                        </td>
                        <td className="p-3 text-slate-400">{row.default}</td>
                        <td className="p-3 text-xs text-purple-300">{row.extra || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 leading-relaxed">
                  {tablesData[selectedTable].showCreate}
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
                Real-World Schema Diagnostics (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Practical troubleshooting scenarios from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Diagnosing Foreign Key Mismatch in Barrackpore College
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                A student enrollments table failed to create with Error 1824. Running <code>SHOW CREATE TABLE students;</code> revealed that <code>student_id</code> was <code>INT UNSIGNED</code>, but the child foreign key column was accidentally defined as signed <code>INT</code>.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Inspect parent table definition
SHOW CREATE TABLE students\\G

-- Solution: Align child foreign key type to match parent exactly
CREATE TABLE enrollments (
    enrollment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNSIGNED NOT NULL, -- Matched to parent!
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Checking Table Storage Size in Kolkata E-Commerce
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Inspecting table data and secondary index footprint in Megabytes before executing a bulk data load.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    table_name,
    ROUND(data_length / 1024 / 1024, 2) AS data_size_mb,
    ROUND(index_length / 1024 / 1024, 2) AS index_size_mb,
    table_rows
FROM information_schema.tables
WHERE table_schema = DATABASE() AND table_name = 'customer_orders';`}
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
                Inspection habits that speed up debugging and prevent migration failures
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
                  <strong className="text-white">1. Missing FK Details in DESCRIBE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>DESCRIBE</code> displays <code>MUL</code> for foreign keys but omits referenced parent tables and cascade rules.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Believing Table_rows in Status is Exact:</strong>
                  <p className="text-slate-400 mt-0.5">
                    InnoDB estimates row counts due to MVCC. Run <code>SELECT COUNT(*)</code> for exact numbers.
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
                  <strong className="text-white">1. Use SHOW CREATE TABLE for Migrations:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees identical schema, constraints, engine, and charset replication.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use \\G in MySQL CLI:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Format wide DDL statements vertically with <code>SHOW CREATE TABLE tbl\\G</code>.
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
              <span><code>DESCRIBE table_name;</code> gives column summary [Field, Type, Null, Key, Default, Extra]</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>Key = PRI</code> indicates Primary Key; <code>UNI</code> indicates Unique; <code>MUL</code> indicates Index</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>SHOW CREATE TABLE</code> outputs complete verbatim DDL statement</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>SHOW FULL COLUMNS</code> to view column comments and collations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Query <code>INFORMATION_SCHEMA.COLUMNS</code> for programmatic schema inspection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>\\G</code> in terminal CLI for clean vertical DDL formatting</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="DESCRIBE Table & SHOW CREATE TABLE – FAQs"
            questions={questions}
            subtitle="Master table schema inspection, key decoders, and DDL extraction with 30 comprehensive Q&As"
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
            title="DESCRIBE Table and SHOW CREATE TABLE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_describe_show_create_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Whenever you join a software team or take over an existing database, your first two commands " +
              "must always be `DESCRIBE` and `SHOW CREATE TABLE`. Never assume column types or constraint names " +
              "from memory. In my classes in Barrackpore, I have seen hours of foreign key debugging resolved in seconds " +
              "simply by running `SHOW CREATE TABLE` on both the parent and child tables to spot an `UNSIGNED` mismatch. " +
              "Make schema inspection an instinct before writing any data modification scripts."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · DESCRIBE Table & SHOW CREATE TABLE · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
