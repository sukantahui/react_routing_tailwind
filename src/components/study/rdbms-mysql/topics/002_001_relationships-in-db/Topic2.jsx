import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – One-to-Many (1:N) Relationship: Primary Key to Foreign Key Mapping
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 1:N Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [selectedDeptId, setSelectedDeptId] = useState(1);
  const [candidateName, setCandidateName] = useState("Susmita Ghosh");
  const [candidateFee, setCandidateFee] = useState(15000);
  const [engineResponse, setEngineResponse] = useState(
    "Select a Department and click 'Enroll Student into Department' to test 1:N Foreign Key assignment."
  );

  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science", location: "Barrackpore Campus" },
    { id: 2, name: "Information Technology", location: "Kolkata Campus" },
    { id: 3, name: "Accounting & Taxation", location: "Barrackpore Campus" },
    { id: 4, name: "Data Science (Empty)", location: "Jadavpur Hub" },
  ]);

  const [students, setStudents] = useState([
    { id: 101, name: "Mamata Hui", deptId: 1, fee: 15000 },
    { id: 102, name: "Abhronila Das", deptId: 1, fee: 18500 },
    { id: 103, name: "Debangshu Roy", deptId: 2, fee: 16000 },
    { id: 104, name: "Mahima Sengupta", deptId: 3, fee: 14000 },
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

  const handleEnrollStudent = () => {
    const nextId = 100 + students.length + 1;
    const targetDept = departments.find((d) => d.id === Number(selectedDeptId));

    const newStudent = {
      id: nextId,
      name: candidateName,
      deptId: Number(selectedDeptId),
      fee: Number(candidateFee),
    };

    setStudents([...students, newStudent]);
    setEngineResponse(
      `✓ Query OK, 1 row affected (0.01 sec). Enrolled student #${nextId} (${candidateName}) with Foreign Key dept_id=${selectedDeptId} (${targetDept?.name}).`
    );
  };

  const handleDeleteDepartment = (deptId) => {
    const enrolledStudents = students.filter((s) => s.deptId === deptId);
    const dept = departments.find((d) => d.id === deptId);

    if (enrolledStudents.length > 0) {
      setEngineResponse(
        `❌ ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (\`college_db\`.\`students\`, CONSTRAINT \`fk_students_dept\` FOREIGN KEY (\`dept_id\`) REFERENCES \`departments\` (\`dept_id\`)). Department #${deptId} (${dept?.name}) has ${enrolledStudents.length} active enrolled student(s)!`
      );
    } else {
      setDepartments(departments.filter((d) => d.id !== deptId));
      setEngineResponse(
        `✓ Query OK, 1 row affected (0.01 sec). Successfully dropped empty Department #${deptId} (${dept?.name}) with 0 foreign key dependencies.`
      );
    }
  };

  const handleReset = () => {
    setDepartments([
      { id: 1, name: "Computer Science", location: "Barrackpore Campus" },
      { id: 2, name: "Information Technology", location: "Kolkata Campus" },
      { id: 3, name: "Accounting & Taxation", location: "Barrackpore Campus" },
      { id: 4, name: "Data Science (Empty)", location: "Jadavpur Hub" },
    ]);
    setStudents([
      { id: 101, name: "Mamata Hui", deptId: 1, fee: 15000 },
      { id: 102, name: "Abhronila Das", deptId: 1, fee: 18500 },
      { id: 103, name: "Debangshu Roy", deptId: 2, fee: 16000 },
      { id: 104, name: "Mahima Sengupta", deptId: 3, fee: 14000 },
    ]);
    setCandidateName("Susmita Ghosh");
    setEngineResponse("Simulator reset to initial state.");
  };

  const generatedDDL = `-- Parent Table (The 'ONE' Side)\nCREATE TABLE departments (\n    dept_id INT AUTO_INCREMENT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL,\n    location VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'\n) ENGINE=InnoDB;\n\n-- Child Table (The 'MANY' Side)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,\n    dept_id INT NOT NULL, -- Foreign Key on the MANY side!\n    CONSTRAINT fk_students_dept FOREIGN KEY (dept_id)\n        REFERENCES departments(dept_id)\n        ON DELETE RESTRICT\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 2
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            One-to-Many (1:N){" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relationship & Foreign Key Mapping
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the most prevalent relational architecture pattern: why Foreign Keys belong strictly on the
            "MANY" side, <code>INNER JOIN</code> vs <code>LEFT JOIN</code> aggregations, and referential protection.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👑 Parent (1) to Child (N)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 FK Strictly on MANY Side
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 LEFT JOIN + COUNT(col)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ ON DELETE RESTRICT
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Golden Rule of 1:N Mapping ─────────── */}
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
                The Golden Rule: Why Foreign Keys Belong on the 'MANY' Side
              </h2>
              <p className="text-xs text-slate-400">
                How relational normalization eliminates multi-valued array columns
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Incorrect Side */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                ❌ Anti-Pattern: FK on the 'ONE' Side
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Placing <code>student_ids = '101,102,103'</code> in <code>departments</code> violates 1NF atomicity and prevents B-Tree indexing.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                -- VIOLATES 1NF (Non-Atomic Array)
                CREATE TABLE departments (
                    dept_id INT,
                    student_ids VARCHAR(255) -- BAD!
                );
              </pre>
            </div>

            {/* Correct Side */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                ✓ Best Practice: FK on the 'MANY' Side
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Each student in <code>students</code> stores exactly one atomic <code>dept_id</code> pointing to their department.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                -- 100% 3NF COMPLIANT
                CREATE TABLE students (
                    student_id INT PRIMARY KEY,
                    dept_id INT NOT NULL -- Beautiful!
                );
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: 1:N Mapping Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: One-to-Many (1:N) Primary Key to Foreign Key Pointer Mapping
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="1:N PK to FK Mapping"
            >
              {/* Department Table (Parent) */}
              <g transform="translate(30, 20)">
                <rect width="250" height="100" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="125" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Parent Table: departments (1)
                </text>
                <line x1="10" y1="34" x2="240" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">🔑 dept_id = 1 (Computer Science)</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">🔑 dept_id = 2 (Information Tech)</text>
                <text x="20" y="94" fill="#cbd5e1" fontSize="10">🔑 dept_id = 3 (Accounting)</text>
              </g>

              {/* Arrow */}
              <g transform="translate(290, 60)">
                <path d="M 0,15 L 140,15" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="140,10 155,15 140,20" fill="#38bdf8" />
                <text x="75" y="5" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold">
                  1:N Pointer
                </text>
              </g>

              {/* Students Table (Child) */}
              <g transform="translate(460, 20)">
                <rect width="290" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="145" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Child Table: students (N)
                </text>
                <line x1="10" y1="34" x2="280" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Mamata Hui ➔ FK dept_id = 1</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Abhronila Das ➔ FK dept_id = 1</text>
                <text x="20" y="94" fill="#cbd5e1" fontSize="10">• Debangshu Roy ➔ FK dept_id = 2</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 1:N Sandbox ──────────────────── */}
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
                Interactive 1:N Enrollment & Integrity Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Enroll students to departments, calculate aggregate counts per department, and test ON DELETE RESTRICT
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Student Candidate Name:
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Target Department (Parent):
                  </label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        #{d.id} - {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleEnrollStudent}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>🎓</span> Enroll Student into Department
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-xs hover:text-white transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {engineResponse}
              </div>

              {/* Department Aggregations Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span>Aggregate Query: LEFT JOIN + COUNT(s.student_id)</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {departments.map((d) => {
                    const count = students.filter((s) => s.deptId === d.id).length;
                    return (
                      <div
                        key={d.id}
                        className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800/60"
                      >
                        <span className="font-medium text-white">{d.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              "font-mono text-xs px-2 py-0.5 rounded font-bold",
                              count > 0 ? "bg-teal-500/20 text-teal-300" : "bg-slate-800 text-slate-400"
                            )}
                          &gt;
                            {count} Student{count === 1 ? "" : "s"}
                          </span>
                          <button
                            onClick={() => handleDeleteDepartment(d.id)}
                            className="text-[10px] text-rose-400 hover:text-rose-300 underline font-sans"
                          &gt;
                            Drop Dept
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* DDL & Live Child Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational 1:N DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
                  {generatedDDL}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Child Table: students ({students.length} rows on MANY side)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">FK (dept_id)</th>
                        <th className="p-2">Department Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {students.map((s) => {
                        const dept = departments.find((d) => d.id === s.deptId);
                        return (
                          <tr key={s.id} className="hover:bg-slate-800/40">
                            <td className="p-2 text-cyan-400">#{s.id}</td>
                            <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                            <td className="p-2 text-teal-300 font-bold">Dept #{s.deptId}</td>
                            <td className="p-2 text-slate-300">{dept?.name || "Orphaned / Unassigned"}</td>
                          </tr>
                        );
                      })}
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
                Payment receipts and order line item schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Tuition Payment History
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Accounts</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                One Student has Many Payment Receipts (1:N). Foreign Key resides in child table with CASCADE.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_payments (
    payment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL, -- Foreign Key on the MANY side
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_mode ENUM('UPI', 'Cash', 'Card', 'NetBanking') NOT NULL DEFAULT 'UPI',
    paid_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_student FOREIGN KEY (student_id)
        REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Customer Orders Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Retail</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                1 Customer has Many Orders (1:N). Protected with RESTRICT to prevent deleting customers with active orders.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE customer_orders (
    order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_total DECIMAL(12, 2) NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id) ON DELETE RESTRICT
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
                Avoid comma-separated arrays and COUNT(*) aggregation bugs
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
                  <strong className="text-white">1. Using COUNT(*) on LEFT JOIN:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>COUNT(*)</code> outputs 1 for parents with 0 children. Always write <code>COUNT(child.id)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Comma-Separated IDs in Parent:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Storing <code>'101,102'</code> in the parent table breaks indexing and eliminates referential safety.
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
                  <strong className="text-white">1. FK Strictly on 'MANY' Side:</strong>
                  <p className="text-slate-400 mt-0.5">
                    The child entity always holds the single atomic foreign key pointing to the master entity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Composite Indexes for Filtering:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Index <code>(dept_id, admission_fee)</code> to accelerate joined and filtered queries.
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
              <span>Foreign Key MUST ALWAYS be placed in the table on the 'MANY' (child) side</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>NOT NULL</code> on the Foreign Key if parent participation is mandatory</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>InnoDB automatically creates a secondary B-Tree index on the Foreign Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>LEFT JOIN</code> + <code>COUNT(child.id)</code> to count children per parent accurately</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON DELETE RESTRICT</code> blocks parent deletion if child records exist</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ON DELETE CASCADE</code> deletes all child records when parent is removed</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="One-to-Many (1:N) Relationships – FAQs"
            questions={questions}
            subtitle="Master 1:N schema design, Foreign Key placement rules, and aggregation queries with 30 comprehensive Q&As"
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
            title="One-to-Many (1:N) Relationship: Primary Key to Foreign Key Mapping"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_one_to_many_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "One-to-Many is the bread and butter of the relational database world. " +
              "In my classes in Barrackpore, I constantly reinforce the Golden Rule: the Foreign Key goes on the Many side! " +
              "A department has many students, so `students` holds `dept_id`. An order has many items, so `order_items` holds `order_id`. " +
              "A customer has many payments, so `payments` holds `customer_id`. Master this single concept, and you will never " +
              "fall into the trap of storing un-indexed comma-separated strings that destroy database performance."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · 1:N Relationships · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
