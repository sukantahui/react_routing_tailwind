import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Referential Actions: ON DELETE CASCADE and ON UPDATE CASCADE
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Cascade Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [targetStudentId, setTargetStudentId] = useState(101);
  const [newPrimaryKeyValue, setNewPrimaryKeyValue] = useState(500);
  const [engineFeedback, setEngineFeedback] = useState(
    "Select an action to test ON DELETE CASCADE or ON UPDATE CASCADE across parent & child tables."
  );

  const [students, setStudents] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [payments, setPayments] = useState([
    { receiptId: "RCP-01", studentId: 101, amount: 15000, mode: "UPI" },
    { receiptId: "RCP-02", studentId: 101, amount: 5000, mode: "Cash" },
    { receiptId: "RCP-03", studentId: 102, amount: 18500, mode: "UPI" },
    { receiptId: "RCP-04", studentId: 103, amount: 16000, mode: "NetBanking" },
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

  const handleDeleteCascade = () => {
    const sid = Number(targetStudentId);
    const targetStudent = students.find((s) => s.id === sid);
    const childCount = payments.filter((p) => p.studentId === sid).length;

    if (!targetStudent) {
      setEngineFeedback(`⚠️ Student #${sid} does not exist.`);
      return;
    }

    setStudents(students.filter((s) => s.id !== sid));
    setPayments(payments.filter((p) => p.studentId !== sid));
    setEngineFeedback(
      `✓ ON DELETE CASCADE: Executed: DELETE FROM students WHERE student_id = ${sid};\n➔ Parent row for '${targetStudent.name}' was deleted.\n➔ ${childCount} matching payment receipt(s) in 'student_payments' were AUTOMATICALLY AND ATOMICALLY deleted by InnoDB!`
    );
  };

  const handleUpdateCascade = () => {
    const sid = Number(targetStudentId);
    const newId = Number(newPrimaryKeyValue);
    const targetStudent = students.find((s) => s.id === sid);
    const childCount = payments.filter((p) => p.studentId === sid).length;

    if (!targetStudent) {
      setEngineFeedback(`⚠️ Student #${sid} does not exist.`);
      return;
    }

    setStudents(students.map((s) => (s.id === sid ? { ...s, id: newId } : s)));
    setPayments(payments.map((p) => (p.studentId === sid ? { ...p, studentId: newId } : p)));
    setTargetStudentId(newId);
    setEngineFeedback(
      `✓ ON UPDATE CASCADE: Executed: UPDATE students SET student_id = ${newId} WHERE student_id = ${sid};\n➔ Parent student_id changed to ${newId}.\n➔ All ${childCount} child payment receipts had their foreign keys updated to ${newId} automatically!`
    );
  };

  const handleReset = () => {
    setStudents([
      { id: 101, name: "Mamata Hui", city: "Barrackpore" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore" },
      { id: 103, name: "Debangshu Roy", city: "Kolkata" },
    ]);
    setPayments([
      { receiptId: "RCP-01", studentId: 101, amount: 15000, mode: "UPI" },
      { receiptId: "RCP-02", studentId: 101, amount: 5000, mode: "Cash" },
      { receiptId: "RCP-03", studentId: 102, amount: 18500, mode: "UPI" },
      { receiptId: "RCP-04", studentId: 103, amount: 16000, mode: "NetBanking" },
    ]);
    setTargetStudentId(101);
    setNewPrimaryKeyValue(500);
    setEngineFeedback("Simulator reset to initial state.");
  };

  const ddlSnippet = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'\n) ENGINE=InnoDB;\n\nCREATE TABLE student_payments (\n    payment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    amount DECIMAL(10, 2) NOT NULL,\n    paid_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    CONSTRAINT fk_payments_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id)\n        ON DELETE CASCADE\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Referential Actions:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              ON DELETE & ON UPDATE CASCADE
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master automated parent-child lifecycle synchronization, storage engine atomicity,
            multi-tier cascading chains, and preventing accidental mass data destruction.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🗑️ ON DELETE CASCADE
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ON UPDATE CASCADE
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Single Transaction Atomicity
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Master-Detail Synchronization
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Mechanics & Atomicity ─────────────── */}
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
                How Cascading Actions Work in MySQL InnoDB
              </h2>
              <p className="text-xs text-slate-400">
                Storage engine automated propagation without application-level delete queries
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ON DELETE CASCADE */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                ON DELETE CASCADE
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Deleting a parent automatically deletes all matching child rows in the same transaction.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                CONSTRAINT fk_payments FOREIGN KEY (student_id)
                REFERENCES students(student_id) ON DELETE CASCADE
              </pre>
            </div>

            {/* ON UPDATE CASCADE */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                ON UPDATE CASCADE
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Updating a parent's Primary Key automatically updates all child foreign keys in-place.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                CONSTRAINT fk_payments FOREIGN KEY (student_id)
                REFERENCES students(student_id) ON UPDATE CASCADE
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Cascade Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Automated Cascade Propagation Across Master & Child Tiers
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Cascade Propagation Flow"
            >
              {/* Parent */}
              <g transform="translate(30, 20)">
                <rect width="230" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="115" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Parent: students
                </text>
                <line x1="10" y1="34" x2="220" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">Delete student_id = 101</text>
                <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">➔ Event Initiated</text>
              </g>

              {/* Arrow */}
              <g transform="translate(270, 55)">
                <path d="M 0,15 L 70,15" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="70,10 85,15 70,20" fill="#f43f5e" />
                <text x="42" y="5" fill="#f43f5e" textAnchor="middle" fontSize="9" fontWeight="bold">
                  CASCADE
                </text>
              </g>

              {/* Child */}
              <g transform="translate(365, 20)">
                <rect width="385" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="192" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  Child: student_payments (ON DELETE CASCADE)
                </text>
                <line x1="10" y1="34" x2="375" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">InnoDB automatically finds all rows where student_id = 101</text>
                <text x="20" y="74" fill="#f43f5e" fontWeight="bold" fontSize="10">✓ All child receipts (RCP-01, RCP-02) deleted atomically!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Cascade Sandbox ─────────────── */}
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
                Interactive Cascading Actions Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Trigger ON DELETE CASCADE to wipe children or ON UPDATE CASCADE to renumber keys across tables
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Target Student:
                  </label>
                  <select
                    value={targetStudentId}
                    onChange={(e) => setTargetStudentId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.id} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    New ID for UPDATE CASCADE:
                  </label>
                  <input
                    type="number"
                    value={newPrimaryKeyValue}
                    onChange={(e) => setNewPrimaryKeyValue(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDeleteCascade}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center justify-center gap-1"
                >
                  <span>🗑️</span> ON DELETE CASCADE
                </button>
                <button
                  onClick={handleUpdateCascade}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1"
                >
                  <span>🔄</span> ON UPDATE CASCADE
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="py-1 px-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-xs hover:text-white transition-all"
                >
                  Reset Simulator
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                <pre className="whitespace-pre-wrap">{engineFeedback}</pre>
              </div>
            </div>

            {/* Live Parent and Child Tables */}
            <div className="space-y-4">
              {/* Parent Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Parent Table: students ({students.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID (PK)</th>
                        <th className="p-1.5">Name</th>
                        <th className="p-1.5">City</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-1.5 text-teal-400 font-bold">#{s.id}</td>
                          <td className="p-1.5 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-1.5 text-slate-400">{s.city}</td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-2 text-center text-slate-500 italic">
                            All parent rows deleted!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Child Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Child Table: student_payments ({payments.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Receipt ID</th>
                        <th className="p-1.5">FK (student_id)</th>
                        <th className="p-1.5">Amount (₹)</th>
                        <th className="p-1.5">Payment Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {payments.map((p) => (
                        <tr key={p.receiptId} className="hover:bg-slate-800/40">
                          <td className="p-1.5 text-cyan-400 font-bold">{p.receiptId}</td>
                          <td className="p-1.5 text-amber-300 font-bold">#{p.studentId}</td>
                          <td className="p-1.5 text-emerald-400">₹{p.amount.toLocaleString("en-IN")}.00</td>
                          <td className="p-1.5 text-slate-400">{p.mode}</td>
                        </tr>
                      ))}
                      {payments.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-2 text-center text-slate-500 italic">
                            Child records automatically cascaded and deleted!
                          </td>
                        </tr>
                      )}
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
                Document attachment cleanups and order line item schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Registration & Document Cleanup
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                When a student registration is cancelled, all uploaded verification documents are wiped via CASCADE.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    document_type ENUM('Aadhaar', 'Marksheet', 'Photo', 'Certificate') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    CONSTRAINT fk_docs_student FOREIGN KEY (student_id)
        REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order & Line Item Atomicity
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Order line items cannot logically exist without an order; canceling an unfulfilled order cascades to line items.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_items (
    order_id BIGINT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_items_order FOREIGN KEY (order_id)
        REFERENCES customer_orders(order_id) ON DELETE CASCADE
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
                Avoid accidental mass data destruction and transaction lock wait timeouts
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
                  <strong className="text-white">1. CASCADE on Financial Ledgers:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Never use <code>CASCADE</code> on invoices, audit logs, or tax receipts. Use <code>RESTRICT</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Long Lock Spikes (100k+ Rows):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Cascading across millions of child rows causes lock wait timeouts. Batch delete in code instead.
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
                  <strong className="text-white">1. Existential Master-Detail Only:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>CASCADE</code> only when child records have zero standalone value without the parent.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Always Pair with UPDATE CASCADE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Keep primary key modifications synchronized automatically across tables.
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
              <span><code>ON DELETE CASCADE</code> deletes all child rows when a parent row is deleted</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON UPDATE CASCADE</code> automatically propagates primary key updates to child foreign keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Parent and child deletions occur within the exact same atomic transaction</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Foreign Key cascading actions do NOT activate child SQL triggers in MySQL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Prohibit <code>CASCADE</code> on financial, accounting, and legal retention data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ensure child foreign key columns are indexed to optimize cascade lookups</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="ON DELETE & ON UPDATE CASCADE – FAQs"
            questions={questions}
            subtitle="Master automated parent-child lifecycle synchronization, transaction atomicity, and cascading rules with 30 comprehensive Q&As"
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
            title="Referential Actions: ON DELETE CASCADE and ON UPDATE CASCADE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_cascade_actions_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "`ON DELETE CASCADE` is like a double-edged sword: in master-detail entities (like Orders and Order Items), " +
              "it keeps your database pristine with zero orphaned rows. But in my classes in Barrackpore, I give students a serious warning: " +
              "never put `ON DELETE CASCADE` on financial ledgers or tax receipts! If a clerk deletes a student profile by mistake, " +
              "you do not want five years of tuition fee accounting records to vanish into thin air. Use `RESTRICT` for financial ledgers, " +
              "and save `CASCADE` for existential attachments, line items, and junction tables."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · Cascading Actions · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
