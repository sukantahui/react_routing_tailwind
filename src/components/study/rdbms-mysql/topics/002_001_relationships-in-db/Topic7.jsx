import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Referential Actions: SET NULL, RESTRICT, and NO ACTION
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Action Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [instructors, setInstructors] = useState([
    { id: 1, name: "Sukanta Hui", dept: "Computer Science & Tax" },
    { id: 2, name: "Mamata Hui", dept: "Accounting & GST" },
  ]);

  const [students, setStudents] = useState([
    { id: 101, name: "Abhronila Das", mentorId: 1 },
    { id: 102, name: "Susmita Ghosh", mentorId: 1 },
    { id: 103, name: "Debangshu Roy", mentorId: 2 },
  ]);

  const [invoices, setInvoices] = useState([
    { invoiceNo: "INV-2026-001", studentId: 101, amount: 15000 },
    { invoiceNo: "INV-2026-002", studentId: 102, amount: 18500 },
  ]);

  const [engineResponse, setEngineResponse] = useState(
    "AccoTax Barrackpore Schema loaded. Test deleting Instructor #1 (SET NULL) vs Student #101 (RESTRICT)."
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

  // Action 1: Delete Instructor (Triggers ON DELETE SET NULL on students)
  const handleDeleteInstructor = (instructorId) => {
    const target = instructors.find((i) => i.id === instructorId);
    if (!target) return;

    setInstructors(instructors.filter((i) => i.id !== instructorId));
    // Simulate ON DELETE SET NULL
    setStudents(
      students.map((s) => (s.mentorId === instructorId ? { ...s, mentorId: null } : s))
    );
    setEngineResponse(
      `✓ ON DELETE SET NULL: Deleted Instructor #${instructorId} (${target.name}). Matching students (Abhronila & Susmita) had their mentor_id safely updated to NULL without losing student records!`
    );
  };

  // Action 2: Attempt Delete Student (Blocked by ON DELETE RESTRICT on invoices)
  const handleAttemptDeleteStudent = (studentId) => {
    const hasInvoices = invoices.some((inv) => inv.studentId === studentId);
    const target = students.find((s) => s.id === studentId);

    if (hasInvoices) {
      setEngineResponse(
        `❌ ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (\`college_db\`.\`customer_invoices\`, CONSTRAINT \`fk_invoices_student\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\` (\`student_id\`)). Student #${studentId} (${target?.name}) has active financial invoices and is protected by ON DELETE RESTRICT!`
      );
    } else {
      setStudents(students.filter((s) => s.id !== studentId));
      setEngineResponse(
        `✓ Query OK, 1 row affected. Deleted student #${studentId} (${target?.name}) because no active invoice dependencies exist.`
      );
    }
  };

  const handleReset = () => {
    setInstructors([
      { id: 1, name: "Sukanta Hui", dept: "Computer Science & Tax" },
      { id: 2, name: "Mamata Hui", dept: "Accounting & GST" },
    ]);
    setStudents([
      { id: 101, name: "Abhronila Das", mentorId: 1 },
      { id: 102, name: "Susmita Ghosh", mentorId: 1 },
      { id: 103, name: "Debangshu Roy", mentorId: 2 },
    ]);
    setInvoices([
      { invoiceNo: "INV-2026-001", studentId: 101, amount: 15000 },
      { invoiceNo: "INV-2026-002", studentId: 102, amount: 18500 },
    ]);
    setEngineResponse("Simulator reset to initial state.");
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
            Module 002_001 · Relationships in DB · Topic 7
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Referential Actions:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              SET NULL, RESTRICT & NO ACTION
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master non-cascading referential integrity protection: preserving financial data with <code>RESTRICT</code> (Error 1451),
            detaching optional parent links with <code>SET NULL</code>, and InnoDB <code>NO ACTION</code> parity.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ ON DELETE RESTRICT (Default)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⭕ ON DELETE SET NULL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Error 1451 Protection
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ InnoDB NO ACTION Parity
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Comparison Matrix ───────────────────────── */}
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
                Comparing RESTRICT vs SET NULL vs CASCADE
              </h2>
              <p className="text-xs text-slate-400">
                How each referential action reacts when a parent delete is attempted
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RESTRICT */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                ON DELETE RESTRICT (Default)
              </span>
              <p className="text-xs text-slate-400">
                Aborts the parent deletion with Error 1451 if child rows exist.
              </p>
              <div className="text-[11px] text-amber-300 font-bold">Best for: Financial Invoices & Ledgers</div>
            </div>

            {/* SET NULL */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                ON DELETE SET NULL
              </span>
              <p className="text-xs text-slate-400">
                Preserves child rows; sets foreign key column to <code>NULL</code>.
              </p>
              <div className="text-[11px] text-cyan-300 font-bold">Best for: Mentors, Managers & Lockers</div>
            </div>

            {/* CASCADE */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                ON DELETE CASCADE
              </span>
              <p className="text-xs text-slate-400">
                Deletes all matching child rows atomically in the same transaction.
              </p>
              <div className="text-[11px] text-rose-300 font-bold">Best for: Order Items & Junction Tables</div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Action Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: How InnoDB Reacts When Deleting a Parent Entity
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Referential Action Comparison"
            >
              {[
                { title: "1. RESTRICT Action", outcome: "❌ Rejects with Error 1451", desc: "Parent deletion blocked", color: "#f59e0b" },
                { title: "2. SET NULL Action", outcome: "✓ Child FK becomes NULL", desc: "Child rows safely retained", color: "#38bdf8" },
                { title: "3. CASCADE Action", outcome: "🗑️ Child rows wiped", desc: "All children deleted atomically", color: "#f43f5e" },
              ].map((item, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 250}, 20)`}>
                  <rect width="235" height="90" rx="8" fill="#1e293b" stroke={item.color} />
                  <text x="117" y="24" fill={item.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {item.title}
                  </text>
                  <line x1="10" y1="36" x2="225" y2="36" stroke="#334155" />
                  <text x="117" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    {item.outcome}
                  </text>
                  <text x="117" y="74" fill={item.color} textAnchor="middle" fontWeight="bold" fontSize="9">
                    {item.desc}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Action Sandbox ──────────────── */}
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
                Interactive SET NULL vs RESTRICT Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Experience SET NULL nullifying mentor links vs RESTRICT throwing Error 1451 on active invoice deletions
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Test Action 1: Delete Instructor */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Action 1: Delete Instructor (ON DELETE SET NULL):
                </span>
                <p className="text-xs text-slate-400">
                  Deleting an instructor sets students' <code>mentor_id</code> to NULL without deleting student records.
                </p>
                <div className="flex gap-2">
                  {instructors.map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => handleDeleteInstructor(inst.id)}
                      className="flex-1 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                    >
                      Delete #{inst.id} ({inst.name.split(" ")[0]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Action 2: Delete Student */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Action 2: Attempt Delete Student (ON DELETE RESTRICT):
                </span>
                <p className="text-xs text-slate-400">
                  Attempting to delete Student #101 is BLOCKED because active tax invoices exist!
                </p>
                <button
                  onClick={() => handleAttemptDeleteStudent(101)}
                  className="w-full py-2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>⚠️</span> Attempt DELETE FROM students WHERE id = 101
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
                <pre className="whitespace-pre-wrap">{engineResponse}</pre>
              </div>
            </div>

            {/* Live Schema & Tables */}
            <div className="space-y-3">
              {/* Instructors Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Table: instructors ({instructors.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Instructor Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {instructors.map((i) => (
                        <tr key={i.id}>
                          <td className="p-1.5 text-cyan-400">#{i.id}</td>
                          <td className="p-1.5 font-sans font-medium text-white">{i.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Students Table (SET NULL) */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Table: students (FK: mentor_id SET NULL)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-32 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Name</th>
                        <th className="p-1.5">FK (mentor_id)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {students.map((s) => (
                        <tr key={s.id}>
                          <td className="p-1.5 text-cyan-400">#{s.id}</td>
                          <td className="p-1.5 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-1.5">
                            {s.mentorId ? (
                              <span className="text-teal-300 font-bold">Instructor #{s.mentorId}</span>
                            ) : (
                              <span className="text-amber-400 font-bold italic">NULL (Unassigned)</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Invoices Table (RESTRICT) */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Table: customer_invoices (FK: student_id RESTRICT)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Invoice No</th>
                        <th className="p-1.5">FK (student_id)</th>
                        <th className="p-1.5">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {invoices.map((inv) => (
                        <tr key={inv.invoiceNo}>
                          <td className="p-1.5 text-amber-400 font-bold">{inv.invoiceNo}</td>
                          <td className="p-1.5 text-cyan-300">#{inv.studentId}</td>
                          <td className="p-1.5 text-emerald-400">₹{inv.amount.toLocaleString("en-IN")}.00</td>
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
                Mentor assignment and tax invoice protection schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Mentor Assignment (SET NULL)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Mentorship</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                If an instructor departs, students lose their mentor (set to NULL), but student accounts remain intact.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    mentor_id INT NULL, -- Must be nullable for SET NULL
    CONSTRAINT fk_students_mentor FOREIGN KEY (mentor_id)
        REFERENCES instructors(instructor_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Customer Invoice Protection (RESTRICT)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financials</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Customer profiles cannot be deleted if active financial tax invoices or ledger entries exist.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE customer_invoices (
    invoice_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_invoices_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
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
                Avoid schema creation conflicts and deferred checking misunderstandings
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
                  <strong className="text-white">1. SET NULL on NOT NULL Column:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Declaring <code>mentor_id INT NOT NULL</code> with <code>ON DELETE SET NULL</code> fails with schema errors.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming NO ACTION Defers Checks:</strong>
                  <p className="text-slate-400 mt-0.5">
                    MySQL InnoDB executes <code>NO ACTION</code> immediately as <code>RESTRICT</code>.
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
                  <strong className="text-white">1. RESTRICT on Financial Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>RESTRICT</code> on invoices, payments, and audit logs to prevent illegal deletions.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. SET NULL for Optional Links:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>SET NULL</code> when child entities remain valuable without parent assignment.
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
              <span><code>ON DELETE RESTRICT</code> blocks parent deletion with Error 1451 if child rows exist</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON DELETE SET NULL</code> sets the child foreign key column to <code>NULL</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The Foreign Key column MUST be defined as nullable (`INT NULL`) to use <code>SET NULL</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL InnoDB treats <code>NO ACTION</code> as exactly identical to <code>RESTRICT</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>RESTRICT</code> on all financial ledgers, tax invoices, and legal records</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always pair with <code>ON UPDATE CASCADE</code> to keep primary key renumbering synchronized</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="SET NULL, RESTRICT & NO ACTION – FAQs"
            questions={questions}
            subtitle="Master non-cascading referential integrity protection, Error 1451 handling, and nullable keys with 30 comprehensive Q&As"
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
            title="Referential Actions: SET NULL, RESTRICT, and NO ACTION"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_set_null_restrict_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In production database engineering, `RESTRICT` is your ultimate safety brake! " +
              "In my classes in Barrackpore, I emphasize to students that `RESTRICT` is MySQL's default for a reason: " +
              "it assumes that human operators make mistakes. When a customer service agent tries to delete an account, " +
              "`RESTRICT` steps in and says: 'Stop! This customer has five active tax invoices and ₹50,000 in payment history.' " +
              "Use `RESTRICT` to protect your financial and audit ledgers, and use `SET NULL` when relationships are purely advisory, " +
              "such as mentors, managers, or temporary equipment allocations."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · Non-Cascading Actions · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
