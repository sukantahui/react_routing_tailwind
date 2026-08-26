import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Adding and Modifying Constraints with ALTER TABLE
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive ALTER TABLE Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [dataState, setDataState] = useState("dirty"); // "dirty" vs "clean"
  const [constraintAttached, setConstraintAttached] = useState(false);
  const [engineResponse, setEngineResponse] = useState(
    "Existing table contains dirty legacy data (Student #103 has fee = ₹5,000.00). Try adding the CHECK constraint!"
  );

  const [studentRows, setStudentRows] = useState([
    { id: 101, name: "Mamata Hui", fee: 15000, status: "Compliant (>= ₹10k)" },
    { id: 102, name: "Abhronila Das", fee: 18500, status: "Compliant (>= ₹10k)" },
    { id: 103, name: "Susmita Ghosh", fee: 5000, status: "VIOLATING (< ₹10k) ⚠️" },
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

  const handleApplyConstraint = () => {
    if (dataState === "dirty") {
      setEngineResponse(
        "❌ ERROR 3819 (HY000): Check constraint 'chk_students_fee_floor' is violated by existing row (ID 103: Susmita Ghosh, fee = ₹5,000.00). ALTER TABLE aborted! Table remains unchanged."
      );
      setConstraintAttached(false);
    } else {
      setConstraintAttached(true);
      setEngineResponse(
        "✓ Query OK, 3 rows affected (0.02 sec). Records: 3  Duplicates: 0  Warnings: 0. Successfully attached named constraint 'chk_students_fee_floor' to students table!"
      );
    }
  };

  const handleRepairDirtyData = () => {
    setStudentRows([
      { id: 101, name: "Mamata Hui", fee: 15000, status: "Compliant (>= ₹10k)" },
      { id: 102, name: "Abhronila Das", fee: 18500, status: "Compliant (>= ₹10k)" },
      { id: 103, name: "Susmita Ghosh", fee: 10000, status: "Compliant (Backfilled to ₹10k) ✓" },
    ]);
    setDataState("clean");
    setEngineResponse(
      "✓ Pre-Flight Data Cleanup Executed: UPDATE students SET admission_fee = 10000.00 WHERE admission_fee < 10000.00; All 3 records now satisfy the proposed rule!"
    );
  };

  const handleReset = () => {
    setStudentRows([
      { id: 101, name: "Mamata Hui", fee: 15000, status: "Compliant (>= ₹10k)" },
      { id: 102, name: "Abhronila Das", fee: 18500, status: "Compliant (>= ₹10k)" },
      { id: 103, name: "Susmita Ghosh", fee: 5000, status: "VIOLATING (< ₹10k) ⚠️" },
    ]);
    setDataState("dirty");
    setConstraintAttached(false);
    setEngineResponse("Simulator reset to initial dirty state.");
  };

  const generatedAlterSQL = `ALTER TABLE students\n    ADD CONSTRAINT chk_students_fee_floor\n    CHECK (admission_fee >= 10000.00);`;

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
            Module 001_003 · Keys & Constraints · Topic 12
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Adding & Modifying Constraints with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              ALTER TABLE
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master schema evolution on live tables, pre-flight data audits and backfills,
            atomic multi-constraint alterations, and online zero-downtime migrations (<code>ALGORITHM=INPLACE</code>).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛠️ ADD CONSTRAINT Syntax
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧹 Pre-Flight Data Cleanup
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Atomic Multi-Constraint ALTER
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ALGORITHM=INPLACE (Online DDL)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 3-Step Migration Pattern ────────────── */}
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
                The 3-Step Production Constraint Migration Pattern
              </h2>
              <p className="text-xs text-slate-400">
                Audit, backfill, and enforce without production downtime or aborted migrations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Step 1: Audit Pre-Flight Data
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Query existing records to detect violating or dirty data before running DDL.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                SELECT * FROM students
                WHERE admission_fee &lt; 10000;
              </pre>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Step 2: Backfill & Clean Data
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Normalize, repair, or delete violating rows to achieve 100% compliance.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                UPDATE students SET fee = 10000
                WHERE fee &lt; 10000;
              </pre>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Step 3: Enforce Constraint
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Attach the named constraint via <code>ALTER TABLE</code> with zero errors.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                ALTER TABLE students
                ADD CONSTRAINT chk_fee ...;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Migration Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3-Stage Safe Constraint Application Pipeline
            </h3>
            <svg
              viewBox="0 0 780 120"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Migration Pipeline Diagram"
            >
              {[
                { stage: "Stage 1: Pre-Flight Audit", desc: "Find non-compliant rows", color: "#38bdf8" },
                { stage: "Stage 2: Data Remediation", desc: "Backfill & repair dirty rows", color: "#f59e0b" },
                { stage: "Stage 3: DDL Enforcement", desc: "ALTER TABLE ADD CONSTRAINT", color: "#10b981" },
              ].map((s, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 250}, 20)`}>
                  <rect width="235" height="80" rx="8" fill="#1e293b" stroke={s.color} />
                  <text x="117" y="28" fill={s.color} textAnchor="middle" fontWeight="bold" fontSize="11">
                    {s.stage}
                  </text>
                  <line x1="10" y1="40" x2="225" y2="40" stroke="#334155" />
                  <text x="117" y="62" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    {s.desc}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive ALTER TABLE Sandbox ─────────── */}
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
                Interactive ALTER TABLE Migration Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Experience how pre-existing violating data aborts ALTER TABLE, and clean data allows successful constraint enforcement
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={handleApplyConstraint}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>⚡</span> Run ALTER TABLE ADD CONSTRAINT
                </button>
                <button
                  disabled={dataState === "clean"}
                  onClick={handleRepairDirtyData}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all disabled:opacity-30 flex items-center justify-center gap-1.5"
                >
                  <span>🧹</span> Step 2: Auto-Repair Dirty Data
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
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Table Data Status</span>
                  <span
                    className={clsx(
                      "text-xs font-bold font-mono",
                      dataState === "dirty" ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {dataState === "dirty" ? "⚠️ Dirty Data Present" : "✓ 100% Compliant"}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Constraint Status</span>
                  <span
                    className={clsx(
                      "text-xs font-bold font-mono",
                      constraintAttached ? "text-teal-300" : "text-slate-400"
                    )}
                  >
                    {constraintAttached ? "✓ Actively Enforced" : "Not Attached"}
                  </span>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Output:
                </span>
                {engineResponse}
              </div>
            </div>

            {/* Generated SQL & Live Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  ALTER TABLE Command:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedAlterSQL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Current Students Table ({studentRows.length} rows):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Tuition Fee</th>
                        <th className="p-2">Audit Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">#{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                          <td className="p-2">
                            <span
                              className={clsx(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                s.fee < 10000 ? "bg-rose-500/20 text-rose-300" : "bg-teal-500/20 text-teal-300"
                              )}
                            >
                              {s.status}
                            </span>
                          </td>
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
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Live constraint migrations from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Data Cleanup & Multi-Constraint Alteration
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Remediating legacy records and applying Unique and CHECK constraints in a single atomic ALTER statement.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Pre-Flight Cleanup
UPDATE students SET admission_fee = 10000.00 WHERE admission_fee < 10000.00;
UPDATE students SET phone_no = '0000000000' WHERE phone_no IS NULL;

-- Step 2: Atomic Multi-Constraint ALTER
ALTER TABLE students
    ADD CONSTRAINT uq_students_roll UNIQUE (roll_no),
    ADD CONSTRAINT chk_students_fee_floor CHECK (admission_fee >= 10000.00),
    MODIFY phone_no VARCHAR(10) NOT NULL;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Relationship Migration
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cleaning orphaned child order items before attaching a Foreign Key constraint with CASCADE.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Clean orphaned order items
DELETE FROM order_items
WHERE order_id NOT IN (SELECT order_id FROM customer_orders);

-- Step 2: Attach named Foreign Key constraint
ALTER TABLE order_items
    ADD CONSTRAINT fk_items_orders FOREIGN KEY (order_id)
    REFERENCES customer_orders(order_id) ON DELETE CASCADE;`}
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
                Prevent aborted migration scripts and lock contention spikes
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
                  <strong className="text-white">1. Pre-Existing Data Violations:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Failing to audit dirty legacy rows causes <code>ALTER TABLE</code> to abort with fatal errors.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Long Table Locks During Peak Hours:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Modifying large tables without <code>ALGORITHM=INPLACE</code> can block concurrent web traffic.
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
                  <strong className="text-white">1. Always Run Pre-Flight Audits:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Execute <code>SELECT ... WHERE NOT (rule)</code> before applying constraints.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Atomic Multi-Constraint Statements:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Combine multiple <code>ADD CONSTRAINT</code> clauses into one statement.
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
              <span>All existing rows must satisfy proposed constraints before <code>ALTER TABLE</code> succeeds</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use the 3-step migration pattern: Audit → Backfill → Enforce</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Combine multiple constraint additions into a single atomic statement</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always provide explicit constraint names (`CONSTRAINT symbol_name`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ALGORITHM=INPLACE</code> or <code>gh-ost</code> for zero-downtime migrations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Clean orphaned child records with anti-joins before adding Foreign Keys</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Adding & Modifying Constraints – FAQs"
            questions={questions}
            subtitle="Master live schema alterations, pre-flight data audits, and online DDL with 30 comprehensive Q&As"
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
            title="Adding and Modifying Constraints with ALTER TABLE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_alter_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In production database administration, schema alterations are high-stakes operations. " +
              "In my classes in Barrackpore, I teach students the golden rule: never run `ALTER TABLE ADD CONSTRAINT` " +
              "blindly on a live database! Always run a pre-flight audit query first (`SELECT COUNT(*) FROM table WHERE NOT (rule)`). " +
              "If you discover even one dirty or legacy record that violates the rule, backfill or fix it first. " +
              "By following the Audit → Backfill → Enforce pipeline, your database migrations will deploy smoothly with zero failed releases."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · ALTER Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
