import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – FOREIGN KEY Constraint: Defining Relationships between Tables
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Foreign Key Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [deleteAction, setDeleteAction] = useState("RESTRICT"); // "RESTRICT", "CASCADE", "SET_NULL"
  const [simulationLog, setSimulationLog] = useState(
    "Select a referential action and click 'Simulate Parent Deletion' to observe InnoDB engine behavior."
  );

  const [parentStudents, setParentStudents] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", status: "Active" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", status: "Active" },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", status: "Active" },
  ]);

  const [childPayments, setChildPayments] = useState([
    { paymentId: 1, studentId: 101, amount: "₹15,000.00", date: "2026-08-20" },
    { paymentId: 2, studentId: 101, amount: "₹3,500.00", date: "2026-08-22" },
    { paymentId: 3, studentId: 102, amount: "₹18,500.00", date: "2026-08-21" },
    { paymentId: 4, studentId: 103, amount: "₹15,000.00", date: "2026-08-23" },
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

  const handleSimulateParentDelete = () => {
    if (deleteAction === "RESTRICT") {
      setSimulationLog(
        "❌ ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (`college_db`.`payments`, CONSTRAINT `fk_payments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE RESTRICT). Operation blocked!"
      );
    } else if (deleteAction === "CASCADE") {
      setParentStudents(parentStudents.filter((s) => s.id !== 101));
      setChildPayments(childPayments.filter((p) => p.studentId !== 101));
      setSimulationLog(
        "⚡ ON DELETE CASCADE Executed: Parent Mamata Hui (ID 101) deleted. InnoDB automatically deleted 2 dependent child payment records (Payment #1 and #2) in the same transaction."
      );
    } else if (deleteAction === "SET_NULL") {
      setParentStudents(parentStudents.filter((s) => s.id !== 101));
      setChildPayments(
        childPayments.map((p) => (p.studentId === 101 ? { ...p, studentId: null } : p))
      );
      setSimulationLog(
        "🔄 ON DELETE SET NULL Executed: Parent Mamata Hui (ID 101) deleted. Child payment records preserved, with student_id set to NULL."
      );
    }
  };

  const handleResetSimulator = () => {
    setParentStudents([
      { id: 101, name: "Mamata Hui", city: "Barrackpore", status: "Active" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore", status: "Active" },
      { id: 103, name: "Susmita Ghosh", city: "Kolkata", status: "Active" },
    ]);
    setChildPayments([
      { paymentId: 1, studentId: 101, amount: "₹15,000.00", date: "2026-08-20" },
      { paymentId: 2, studentId: 101, amount: "₹3,500.00", date: "2026-08-22" },
      { paymentId: 3, studentId: 102, amount: "₹18,500.00", date: "2026-08-21" },
      { paymentId: 4, studentId: 103, amount: "₹15,000.00", date: "2026-08-23" },
    ]);
    setSimulationLog(
      "Simulator reset to initial state with Parent Mamata Hui (ID 101) and active child payments."
    );
  };

  const generatedDDL = `CREATE TABLE student_payments (\n    payment_id INT AUTO_INCREMENT,\n    student_id INT ${
    deleteAction === "SET_NULL" ? "NULL" : "NOT NULL"
  },\n    amount DECIMAL(10, 2) NOT NULL,\n    payment_date DATE NOT NULL,\n    CONSTRAINT pk_payments PRIMARY KEY (payment_id),\n    CONSTRAINT fk_payments_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id)\n        ON DELETE ${deleteAction.replace("_", " ")}\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 001_003 · Keys & Constraints · Topic 2
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            FOREIGN KEY{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraints & Relationships
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master parent-child relational linkages, referential integrity rules, data type alignment,
            and referential cascade actions (RESTRICT, CASCADE, SET NULL).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Parent-Child Linkage
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ ON DELETE RESTRICT
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ ON DELETE CASCADE
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ON UPDATE CASCADE
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Foreign Key Concepts ──────────────── */}
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
                How Foreign Keys Link Relational Tables
              </h2>
              <p className="text-xs text-slate-400">
                Establishing parent-child relationships and enforcing referential integrity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: RESTRICT */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                ON DELETE RESTRICT (Default)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Blocks deletion of the parent row if any child rows exist. Protects critical data.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                ON DELETE RESTRICT
              </pre>
            </div>

            {/* Card 2: CASCADE */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                ON DELETE CASCADE
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Automatically deletes all matching child rows when the parent is deleted.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                ON DELETE CASCADE
              </pre>
            </div>

            {/* Card 3: SET NULL */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                ON DELETE SET NULL
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Sets the child foreign key column to NULL when parent is deleted. Preserves child rows.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                ON DELETE SET NULL
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Parent-Child Relationship Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Parent (students) to Child (payments) Foreign Key Linkage
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Foreign Key Relationship Diagram"
            >
              {/* Parent Table */}
              <g transform="translate(40, 20)">
                <rect width="280" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="140" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  PARENT TABLE: students
                </text>
                <line x1="15" y1="34" x2="265" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#10b981" font-family="monospace" fontWeight="bold">
                  🔑 student_id INT (PK)
                </text>
                <text x="20" y="78" fill="#cbd5e1">first_name VARCHAR(50)</text>
                <text x="20" y="98" fill="#cbd5e1">city ENUM(...)</text>
              </g>

              {/* Arrow Connector */}
              <g transform="translate(325, 70)">
                <path d="M 0 0 L 125 0" stroke="#14b8a6" strokeWidth="2.5" strokeDasharray="5,5" />
                <polygon points="125,-4 135,0 125,4" fill="#14b8a6" />
                <text x="65" y="-8" fill="#14b8a6" textAnchor="middle" fontSize="10" fontWeight="bold">
                  1 : N (Foreign Key)
                </text>
              </g>

              {/* Child Table */}
              <g transform="translate(460, 20)">
                <rect width="280" height="110" rx="8" fill="#1e293b" stroke="#14b8a6" />
                <text x="140" y="24" fill="#14b8a6" textAnchor="middle" fontWeight="bold">
                  CHILD TABLE: student_payments
                </text>
                <line x1="15" y1="34" x2="265" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" font-family="monospace">payment_id INT (PK)</text>
                <text x="20" y="78" fill="#38bdf8" font-family="monospace" fontWeight="bold">
                  🔗 student_id INT (FK)
                </text>
                <text x="20" y="98" fill="#cbd5e1">amount DECIMAL(10, 2)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Foreign Key Sandbox ────────── */}
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
                Interactive Foreign Key Cascade Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Choose a referential rule and simulate deleting Parent Mamata Hui (ID 101) to observe engine reactions
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select ON DELETE Referential Rule:
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "RESTRICT", label: "RESTRICT (Block)" },
                    { id: "CASCADE", label: "CASCADE (Delete)" },
                    { id: "SET_NULL", label: "SET NULL" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setDeleteAction(btn.id)}
                      className={clsx(
                        "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                        deleteAction === btn.id
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSimulateParentDelete}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🗑️</span> Simulate Deleting Parent Mamata Hui (ID 101)
                </button>
                <button
                  onClick={handleResetSimulator}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {simulationLog}
              </div>
            </div>

            {/* Live Parent & Child Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated DDL Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
                </pre>
              </div>

              {/* Tables */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Parent */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[11px] font-bold text-cyan-400 block mb-1">
                    Parent: students ({parentStudents.length})
                  </span>
                  <div className="space-y-1 font-mono text-[10px]">
                    {parentStudents.map((s) => (
                      <div key={s.id} className="p-1 rounded bg-slate-900 flex justify-between">
                        <span className="text-cyan-300">ID: {s.id}</span>
                        <span className="text-white">{s.name}</span>
                      </div>
                    ))}
                    {parentStudents.length === 0 && (
                      <div className="p-2 text-slate-500 italic">All parents deleted</div>
                    )}
                  </div>
                </div>

                {/* Child */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[11px] font-bold text-teal-400 block mb-1">
                    Child: payments ({childPayments.length})
                  </span>
                  <div className="space-y-1 font-mono text-[10px]">
                    {childPayments.map((p) => (
                      <div key={p.paymentId} className="p-1 rounded bg-slate-900 flex justify-between">
                        <span className="text-teal-300">#{p.paymentId}</span>
                        <span className={p.studentId ? "text-slate-300" : "text-amber-400 italic"}>
                          FK: {p.studentId ?? "NULL"}
                        </span>
                        <span className="text-emerald-400">{p.amount}</span>
                      </div>
                    ))}
                    {childPayments.length === 0 && (
                      <div className="p-2 text-slate-500 italic">All payments deleted</div>
                    )}
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
                Relational foreign key architectures from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Student Fee Payments Relationship
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Accounts</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Protecting institutional ledger records using ON DELETE RESTRICT and ON UPDATE CASCADE.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_payments (
    payment_id INT AUTO_INCREMENT,
    student_id INT NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_mode ENUM('UPI', 'NetBanking', 'Cash', 'Card') NOT NULL,
    payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_payments PRIMARY KEY (payment_id),
    CONSTRAINT fk_payments_student FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Items Cascade Architecture
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Combining CASCADE on orders with RESTRICT on product inventory catalogs.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_line_items (
    line_id INT AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT pk_line_items PRIMARY KEY (line_id),
    CONSTRAINT fk_line_order FOREIGN KEY (order_id)
        REFERENCES customer_orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_line_product FOREIGN KEY (product_id)
        REFERENCES products(product_id) ON DELETE RESTRICT
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
                Avoid foreign key creation errors and catastrophic accidental cascading deletes
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
                  <strong className="text-white">1. Type and Sign Mismatch (Error 3780):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Child column defined as signed <code>INT</code> referencing parent <code>INT UNSIGNED</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Blind ON DELETE CASCADE on Financials:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Accidentally wiping ledger histories when a customer account is closed.
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
                  <strong className="text-white">1. Explicit Constraint Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always write <code>CONSTRAINT fk_child_parent ...</code> for maintainable migrations.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use RESTRICT for Master Data:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees master entities cannot be deleted while active dependencies exist.
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
              <span><code>FOREIGN KEY</code> links child columns to parent Primary/Unique keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Data types, sizes, and signedness MUST match parent columns exactly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON DELETE RESTRICT</code> blocks parent deletion if child rows exist</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON DELETE CASCADE</code> deletes dependent child rows automatically</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Both parent and child tables must use the <code>InnoDB</code> storage engine</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>InnoDB automatically creates supporting indexes on foreign key columns</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="FOREIGN KEY Constraints – FAQs"
            questions={questions}
            subtitle="Master table relationships, referential cascade actions, and index support with 30 comprehensive Q&As"
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
            title="FOREIGN KEY Constraint: Defining Relationships between Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_foreign_key_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Foreign keys are what make a relational database truly relational. In my classes in Barrackpore, " +
              "I frequently warn students about the critical difference between `CASCADE` and `RESTRICT`. While `CASCADE` " +
              "is convenient for disposable child records like items inside a temporary cart, applying `ON DELETE CASCADE` " +
              "to a financial transaction table is an architectural disaster waiting to happen. Always use `ON DELETE RESTRICT` " +
              "for financial ledgers, grades, and audit trails so your database blocks any action that would accidentally " +
              "destroy historical records."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · FOREIGN KEY Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
