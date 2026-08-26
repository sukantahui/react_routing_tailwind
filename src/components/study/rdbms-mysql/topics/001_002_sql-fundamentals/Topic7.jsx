import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – INSERT INTO: Single-row, Multi-row, and Partial Column Inserts
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive INSERT sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive INSERT Simulator State
  const [insertMode, setInsertMode] = useState("single"); // "single", "multi", "upsert"
  const [firstName, setFirstName] = useState("Mamata");
  const [lastName, setLastName] = useState("Hui");
  const [email, setEmail] = useState("mamata@codernaccotax.in");
  const [admissionFee, setAdmissionFee] = useState("15000.00");

  const [simulatedTable, setSimulatedTable] = useState([
    { id: 101, name: "Mamata Hui", email: "mamata@codernaccotax.in", fee: "₹15,000.00", date: "2026-08-24" },
    { id: 102, name: "Abhronila Das", email: "abhronila@gmail.com", fee: "₹18,500.00", date: "2026-08-24" },
    { id: 103, name: "Susmita Ghosh", email: "susmita@kolkata.org", fee: "₹15,000.00", date: "2026-08-24" },
  ]);

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

  // Generate dynamic SQL based on active mode
  let generatedSQL = "";
  if (insertMode === "single") {
    generatedSQL = `INSERT INTO students (first_name, last_name, email, admission_fee)\nVALUES ('${firstName}', '${lastName}', '${email}', ${parseFloat(admissionFee) || 15000});`;
  } else if (insertMode === "multi") {
    generatedSQL = `INSERT INTO students (first_name, last_name, email, admission_fee)\nVALUES \n    ('Mamata', 'Hui', 'mamata@codernaccotax.in', 15000.00),\n    ('Abhronila', 'Das', 'abhronila@gmail.com', 18500.00),\n    ('Debangshu', 'Roy', 'debangshu@fintech.co.in', 20000.00);`;
  } else if (insertMode === "upsert") {
    generatedSQL = `INSERT INTO students (student_id, first_name, last_name, email, admission_fee)\nVALUES (101, '${firstName}', '${lastName}', '${email}', ${parseFloat(admissionFee) || 15000})\nON DUPLICATE KEY UPDATE \n    admission_fee = VALUES(admission_fee),\n    email = VALUES(email);`;
  }

  const handleSimulateInsert = () => {
    const nextId = simulatedTable.length > 0 ? Math.max(...simulatedTable.map((r) => r.id)) + 1 : 101;
    setSimulatedTable([
      ...simulatedTable,
      {
        id: nextId,
        name: `${firstName} ${lastName}`,
        email: email,
        fee: `₹${parseFloat(admissionFee || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
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
            Module 001_002 · SQL Fundamentals · Topic 7
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            INSERT INTO{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Statements & Bulk Loading
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational data insertion: explicit column lists, multi-row batching,
            partial default inserts, subquery populations, and atomic Upserts.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📥 Single-Row INSERT
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Multi-Row Bulk Batching
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ON DUPLICATE KEY UPDATE (Upsert)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 LAST_INSERT_ID()
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core INSERT Patterns ───────────────────── */}
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
                The 4 Essential INSERT Variations
              </h2>
              <p className="text-xs text-slate-400">
                Single-row, high-throughput bulk inserts, partial column defaults, and subquery inserts
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Single */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                1. Single-Row Insert (Explicit Columns)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Explicitly lists columns for clarity and immunity against schema column order changes.
              </p>
              <pre className="rounded bg-slate-900 p-2.5 font-mono text-[11px] text-teal-300 border border-slate-800">
{`INSERT INTO students (first_name, last_name, email)
VALUES ('Mamata', 'Hui', 'mamata@codernaccotax.in');`}
              </pre>
            </div>

            {/* Card 2: Multi-Row */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                2. Multi-Row Bulk Insert (20x Faster)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Batches multiple tuples separated by commas into 1 network round-trip.
              </p>
              <pre className="rounded bg-slate-900 p-2.5 font-mono text-[11px] text-cyan-300 border border-slate-800">
{`INSERT INTO students (first_name, email) VALUES
('Abhronila', 'abhronila@gmail.com'),
('Susmita', 'susmita@kolkata.org');`}
              </pre>
            </div>

            {/* Card 3: Upsert */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                3. ON DUPLICATE KEY UPDATE (Upsert)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Inserts if new; updates existing record if PRIMARY/UNIQUE key collision occurs.
              </p>
              <pre className="rounded bg-slate-900 p-2.5 font-mono text-[11px] text-amber-300 border border-slate-800">
{`INSERT INTO stock (item_id, qty) VALUES (101, 10)
ON DUPLICATE KEY UPDATE qty = qty + 10;`}
              </pre>
            </div>

            {/* Card 4: Subquery Insert */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                4. INSERT INTO ... SELECT (ETL Stream)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Streams filtered query results directly into another table on the server.
              </p>
              <pre className="rounded bg-slate-900 p-2.5 font-mono text-[11px] text-purple-300 border border-slate-800">
{`INSERT INTO honor_students (student_id, name)
SELECT student_id, first_name FROM students WHERE gpa &ge; 3.8;`}
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Single vs Multi-Row Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Network Round-Trips (100 Individual Inserts vs 1 Batch Insert)
            </h3>
            <svg
              viewBox="0 0 780 180"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Multi-row insert efficiency diagram"
            >
              {/* Left: 100 Individual Inserts */}
              <g transform="translate(30, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ 1,000 Single-Row Inserts
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" fontSize="10">• 1,000 TCP network round trips</text>
                <text x="20" y="78" fill="#cbd5e1" fontSize="10">• 1,000 transaction log fsync disk flushes</text>
                <text x="20" y="98" fill="#cbd5e1" fontSize="10">• Execution time: ~4.5 seconds</text>
                <text x="20" y="122" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ High latency & lock contention</text>
              </g>

              {/* Right: 1 Multi-Row Batch */}
              <g transform="translate(410, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ 1 Multi-Row Batch (1,000 Rows)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" fontSize="10">• Exactly 1 TCP network packet payload</text>
                <text x="20" y="78" fill="#cbd5e1" fontSize="10">• 1 amortized InnoDB redo log sync</text>
                <text x="20" y="98" fill="#cbd5e1" fontSize="10">• Execution time: ~0.08 seconds (50x Faster)</text>
                <text x="20" y="122" fill="#10b981" fontWeight="bold" fontSize="10">✓ Maximum enterprise throughput</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive INSERT Sandbox ─────────────── */}
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
                Interactive INSERT Statement Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Customize column values, toggle insertion modes, and simulate adding live records
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Insert Mode:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInsertMode("single")}
                    className={clsx(
                      "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                      insertMode === "single"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Single-Row
                  </button>
                  <button
                    onClick={() => setInsertMode("multi")}
                    className={clsx(
                      "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                      insertMode === "multi"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Multi-Row Batch
                  </button>
                  <button
                    onClick={() => setInsertMode("upsert")}
                    className={clsx(
                      "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                      insertMode === "upsert"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Upsert
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    First Name:
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                /&gt;
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Admission Fee (₹):
                </label>
                <input
                  type="number"
                  value={admissionFee}
                  onChange={(e) => setAdmissionFee(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                /&gt;
              </div>

              <button
                onClick={handleSimulateInsert}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>➕</span> Execute Simulated INSERT
              </button>
            </div>

            {/* Generated SQL & Live Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Simulated Table Records (students):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Fee (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {simulatedTable.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">{row.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{row.name}</td>
                          <td className="p-2 text-emerald-400">{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                Real-World Production Insertion Scenarios
              </h2>
              <p className="text-xs text-slate-400">
                Production batch loading from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Pharmacy Multi-Row Medicine Load
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Batch loading new stock arrivals with exact Indian Rupee (₹) prices and expiration dates.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`INSERT INTO medicines (medicine_name, batch_no, unit_price, expiry_date, stock_quantity)
VALUES
    ('Paracetamol 500mg', 'BATCH-2026-A', 15.50, '2028-06-30', 200),
    ('Amoxicillin 250mg', 'BATCH-2026-B', 85.00, '2027-12-31', 150),
    ('Cetirizine 10mg',   'BATCH-2026-C', 35.00, '2029-01-15', 500);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Shopping Cart Upsert
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Atomic Upsert to increment product quantity if item already exists in customer's cart.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`INSERT INTO customer_cart (customer_id, product_id, item_qty)
VALUES (1001, 505, 2)
ON DUPLICATE KEY UPDATE item_qty = item_qty + 2;`}
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
                Prevent insertion errors, performance bottlenecks, and SQL injection risks
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
                  <strong className="text-white">1. Column Count Mismatch (Error 1136):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Listing 3 column names but providing 4 values in <code>VALUES (...)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Positional Inserts Fragility:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>INSERT INTO t VALUES (...)</code> breaks whenever a column is added or rearranged.
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
                  <strong className="text-white">1. Use Explicit Column Lists:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always specify <code>INSERT INTO tbl (col1, col2)</code> for maintainability.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Parameterize All Inputs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use prepared statement placeholders (<code>?</code>) in application backends to eliminate SQL Injection.
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
              <span>Explicitly name column targets in <code>INSERT INTO tbl (col1, col2)</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use multi-row bulk inserts for 20x higher ingestion speed</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DUPLICATE KEY UPDATE</code> for atomic upserts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Retrieve generated IDs using thread-safe <code>LAST_INSERT_ID()</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>INSERT IGNORE</code> suppresses duplicate key errors</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>INSERT INTO ... SELECT</code> for server-side ETL streaming</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="INSERT INTO Statements – FAQs"
            questions={questions}
            subtitle="Master data insertion, bulk batching, upserts, and sequence handling with 30 comprehensive Q&As"
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
            title="INSERT INTO: Single-row, Multi-row, and Partial Column Inserts"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_insert_into_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "When building web applications and REST APIs, `INSERT INTO` is your most frequently called write statement. " +
              "In my classes at Barrackpore, I emphasize two critical industry habits: 1) Never write positional inserts without column names—a " +
              "single schema migration in the future will silently corrupt your data or break the app. 2) When importing data from CSV or Excel, " +
              "never execute thousands of single-row inserts inside a loop; batch them in chunks of 1,000 to 2,000 rows. Your database " +
              "will complete in milliseconds instead of minutes!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · INSERT INTO Statements · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
