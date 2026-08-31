import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Enhanced / Extended ER (EER) Concepts: Subclasses, Superclasses & Specialization
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive EER Specialization Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Specialization State
  const [personType, setPersonType] = useState("student"); // "student" | "instructor"
  const [fullName, setFullName] = useState("Mamata Hui");
  const [email, setEmail] = useState("mamata@barrackpore.in");
  const [tuitionFee, setTuitionFee] = useState(15000);
  const [designation, setDesignation] = useState("Senior Lecturer");
  const [salary, setSalary] = useState(45000);

  const [persons, setPersons] = useState([
    { id: 1, name: "Mamata Hui", email: "mamata@barrackpore.in" },
    { id: 2, name: "Prof. Sukanta Hui", email: "sukanta@accotax.in" },
    { id: 3, name: "Abhronila Das", email: "abhronila@barrackpore.in" },
  ]);

  const [students, setStudents] = useState([
    { personId: 1, tuitionFee: 15000, admissionNo: "ADM-2026-001" },
    { personId: 3, tuitionFee: 18500, admissionNo: "ADM-2026-002" },
  ]);

  const [instructors, setInstructors] = useState([
    { personId: 2, designation: "Founder & Lead Architect", salary: 75000 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "EER Table-Per-Type Schema Loaded. Insert a Person as a Student or Instructor to watch the 2-step atomic transaction."
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

  const handleInsertEntity = () => {
    const emailExists = persons.some((p) => p.email === email);
    if (emailExists) {
      setEngineLog(`❌ ERROR 1062 (23000): Duplicate entry '${email}' for key 'uq_person_email'.`);
      return;
    }

    const nextId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1;
    const newPerson = { id: nextId, name: fullName, email };

    if (personType === "student") {
      const newStudent = {
        personId: nextId,
        tuitionFee: Number(tuitionFee),
        admissionNo: `ADM-2026-00${nextId}`,
      };
      setPersons([...persons, newPerson]);
      setStudents([...students, newStudent]);
      setEngineLog(
        `✓ Transaction Committed:\n1) INSERT INTO persons (person_id: ${nextId}, name: '${fullName}')\n2) INSERT INTO students (person_id: ${nextId}, tuition_fee: ₹${tuitionFee}). Subclass inherits person_id as PK and FK!`
      );
    } else {
      const newInstructor = {
        personId: nextId,
        designation,
        salary: Number(salary),
      };
      setPersons([...persons, newPerson]);
      setInstructors([...instructors, newInstructor]);
      setEngineLog(
        `✓ Transaction Committed:\n1) INSERT INTO persons (person_id: ${nextId}, name: '${fullName}')\n2) INSERT INTO instructors (person_id: ${nextId}, designation: '${designation}', salary: ₹${salary}).`
      );
    }
  };

  const handleDeletePerson = (id) => {
    const target = persons.find((p) => p.id === id);
    setPersons(persons.filter((p) => p.id !== id));
    // Simulate ON DELETE CASCADE in MySQL
    setStudents(students.filter((s) => s.personId !== id));
    setInstructors(instructors.filter((i) => i.personId !== id));
    setEngineLog(
      `✓ ON DELETE CASCADE: Deleted Person #${id} ('${target?.name}'). Matching child row in subclass table was automatically purged by MySQL InnoDB!`
    );
  };

  const handleReset = () => {
    setPersons([
      { id: 1, name: "Mamata Hui", email: "mamata@barrackpore.in" },
      { id: 2, name: "Prof. Sukanta Hui", email: "sukanta@accotax.in" },
      { id: 3, name: "Abhronila Das", email: "abhronila@barrackpore.in" },
    ]);
    setStudents([
      { personId: 1, tuitionFee: 15000, admissionNo: "ADM-2026-001" },
      { personId: 3, tuitionFee: 18500, admissionNo: "ADM-2026-002" },
    ]);
    setInstructors([
      { personId: 2, designation: "Founder & Lead Architect", salary: 75000 },
    ]);
    setEngineLog("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- Superclass Table\nCREATE TABLE persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) NOT NULL UNIQUE\n) ENGINE=InnoDB;\n\n-- Subclass 1: students (Inherits PK as PK and FK)\nCREATE TABLE students (\n    person_id INT PRIMARY KEY, -- Inherited PK / FK\n    admission_no VARCHAR(20) NOT NULL UNIQUE,\n    tuition_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,\n    CONSTRAINT fk_stud_person FOREIGN KEY (person_id)\n        REFERENCES persons(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Subclass 2: instructors (Inherits PK as PK and FK)\nCREATE TABLE instructors (\n    person_id INT PRIMARY KEY, -- Inherited PK / FK\n    designation VARCHAR(50) NOT NULL,\n    monthly_salary DECIMAL(10, 2) NOT NULL,\n    CONSTRAINT fk_inst_person FOREIGN KEY (person_id)\n        REFERENCES persons(person_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 8
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            EER Subclasses, Superclasses &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Specialization Hierarchies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Object-Oriented conceptual data modeling in Extended ER (EER): Superclass/Subclass IS-A relationships,
            Attribute & Relationship Type Inheritance, Specialization vs Generalization, and Table-Per-Type (TPT) MySQL DDL.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👑 Superclass (Parent Entity)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👶 Subclass (Child Entity)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧬 Type Inheritance (IS-A)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Table-Per-Type (TPT) DDL
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Specialization Architecture & Notation ──── */}
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
                Superclass/Subclass Hierarchy & Type Inheritance
              </h2>
              <p className="text-xs text-slate-400">
                How specialized subgroups inherit superclass attributes and primary key identity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Superclass (Parent)
              </span>
              <p className="text-xs text-slate-300">
                Generic entity set containing common attributes (e.g. <code>Person</code> with <code>person_id</code>, <code>full_name</code>, <code>email</code>).
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                2. Subclasses (Children)
              </span>
              <p className="text-xs text-slate-300">
                Specialized subgroups with distinct attributes (e.g. <code>Student</code> with <code>tuition_fee</code>, <code>Instructor</code> with <code>salary</code>).
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                3. Table-Per-Type (TPT)
              </span>
              <p className="text-xs text-slate-300">
                Subclass tables share the Superclass Primary Key as their own Primary Key and Foreign Key with <code>ON DELETE CASCADE</code>.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: EER Specialization Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: EER Specialization Hierarchy in Extended ER Notation
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="EER Specialization Hierarchy"
            >
              {/* Superclass: PERSON */}
              <g transform="translate(290, 10)">
                <rect width="200" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="100" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="11">
                  PERSON (Superclass)
                </text>
              </g>

              {/* Connecting Line to Circle */}
              <line x1="390" y1="50" x2="390" y2="70" stroke="#f59e0b" strokeWidth="2" />

              {/* Disjoint Circle 'd' */}
              <circle cx="390" cy="80" r="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="390" y="84" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">d</text>

              {/* Subclass Lines */}
              <line x1="380" y1="88" x2="160" y2="115" stroke="#38bdf8" strokeWidth="2" />
              <line x1="400" y1="88" x2="620" y2="115" stroke="#10b981" strokeWidth="2" />

              {/* Subclass 1: STUDENT */}
              <g transform="translate(60, 100)">
                <rect width="200" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="11">
                  STUDENT (Subclass)
                </text>
              </g>

              {/* Subclass 2: INSTRUCTOR */}
              <g transform="translate(520, 100)">
                <rect width="200" height="40" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="100" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="11">
                  INSTRUCTOR (Subclass)
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Specialization Simulator ────── */}
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
                Interactive EER Specialization Simulator (Table-Per-Type)
              </h2>
              <p className="text-xs text-slate-400">
                Insert specialized entities and test cascading deletions across superclass and subclass tables
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Insert Entity into Specialization Hierarchy:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Email"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPersonType("student")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold transition-all border",
                      personType === "student"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Specialization: Student
                  </button>
                  <button
                    onClick={() => setPersonType("instructor")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold transition-all border",
                      personType === "instructor"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Specialization: Instructor
                  </button>
                </div>

                {personType === "student" ? (
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Tuition Fee (₹):</label>
                    <input
                      type="number"
                      value={tuitionFee}
                      onChange={(e) => setTuitionFee(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Designation"
                    />
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Salary"
                    />
                  </div>
                )}

                <button
                  onClick={handleInsertEntity}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Execute 2-Table Atomic Insert
                </button>
              </div>

              {/* Cascade Delete Action */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Test ON DELETE CASCADE (Delete from Superclass):
                </span>
                <div className="flex flex-wrap gap-2">
                  {persons.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleDeletePerson(p.id)}
                      className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                    >
                      Drop #{p.id} ({p.name.split(" ")[0]})
                    </button>
                  ))}
                </div>
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
                <pre className="whitespace-pre-wrap">{engineLog}</pre>
              </div>
            </div>

            {/* DDL & Live Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Table-Per-Type DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Tables */}
              <div className="space-y-2">
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1">persons (Superclass)</th>
                        <th className="p-1">Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {persons.map((p) => (
                        <tr key={p.id}>
                          <td className="p-1 text-cyan-300 font-bold">#{p.id}</td>
                          <td className="p-1 text-slate-300">{p.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-1">students</th>
                          <th className="p-1">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {students.map((s) => (
                          <tr key={s.personId}>
                            <td className="p-1 text-cyan-300 font-bold">#{s.personId}</td>
                            <td className="p-1 text-emerald-300">₹{s.tuitionFee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-emerald-400 uppercase font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-1">instructors</th>
                          <th className="p-1">Salary</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {instructors.map((i) => (
                          <tr key={i.personId}>
                            <td className="p-1 text-emerald-300 font-bold">#{i.personId}</td>
                            <td className="p-1 text-teal-300">₹{i.salary}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                Academy staff specialization and banking account hierarchies from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Academy Staff Hierarchy
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Specializing generic <code>Person</code> into <code>Student</code> and <code>Instructor</code> with shared PK/FK.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE persons (person_id INT PRIMARY KEY, full_name VARCHAR(100));
CREATE TABLE students (person_id INT PRIMARY KEY, tuition_fee DECIMAL(10,2), FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);
CREATE TABLE instructors (person_id INT PRIMARY KEY, salary DECIMAL(10,2), FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Bank Account Specialization (Savings vs Checking)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Banking</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Generic account holds balance; Savings holds interest_rate; Checking holds overdraft_limit.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE accounts (account_id INT PRIMARY KEY, balance DECIMAL(12,2) NOT NULL);
CREATE TABLE savings_accounts (account_id INT PRIMARY KEY, interest_rate DECIMAL(4,2) NOT NULL, FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE);
CREATE TABLE checking_accounts (account_id INT PRIMARY KEY, overdraft_limit DECIMAL(10,2) NOT NULL, FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE);`}
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
                Avoid unnecessary subclass tables and missing CASCADE foreign keys
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
                  <strong className="text-white">1. Subclasses with No Unique Attributes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If subgroups have no specific attributes or relations, use a simple ENUM discriminator column.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Standalone AUTO_INCREMENT on Subclasses:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Subclass MUST share the superclass Primary Key; separate IDs break 1:1 IS-A linkage.
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
                  <strong className="text-white">1. Table-Per-Type for Clean 3NF:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Maintains zero NULL columns and clean NOT NULL constraints across all subclasses.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. ON DELETE CASCADE on Subclass FKs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees that dropping a superclass parent automatically purges subclass records.
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
              <span>Superclasses hold common attributes; Subclasses hold specific attributes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Subclasses inherit all superclass attributes and relationships (IS-A link)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Specialization is Top-Down; Generalization is Bottom-Up</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Table-Per-Type (TPT) uses the superclass PK as the subclass PK and FK</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always configure `ON DELETE CASCADE` on subclass foreign keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Do not create separate tables for subclasses that have no unique attributes</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="EER Superclasses & Subclasses – FAQs"
            questions={questions}
            subtitle="Master Specialization, Generalization, Type Inheritance, and Table-Per-Type relational DDL with 30 comprehensive Q&As"
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
            title="Enhanced / Extended ER (EER) Concepts: Subclasses, Superclasses, and Specialization Hierarchies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_eer_specialization_subclasses_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Extended ER modeling brings the elegance of Object-Oriented design into relational databases! " +
              "In my classes in Barrackpore, I teach students the Table-Per-Type (TPT) Master Pattern: " +
              "give your superclass table (`persons`) an `AUTO_INCREMENT person_id` primary key, and give your subclass tables " +
              "(`students` and `instructors`) that EXACT same `person_id` column as both their Primary Key AND their Foreign Key. " +
              "This guarantees a strict 1:1 IS-A relationship, eliminates data duplication, and prevents null-column clutter."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · EER Subclasses & Superclasses · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
