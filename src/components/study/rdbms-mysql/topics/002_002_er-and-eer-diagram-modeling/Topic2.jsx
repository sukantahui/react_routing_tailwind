import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Entity Identifiers, Primary Keys, Candidate Keys, and Partial Keys (Discriminators)
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Key Architecture Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [candidateName, setCandidateName] = useState("Susmita Ghosh");
  const [candidateAadhaar, setCandidateAadhaar] = useState("8899-7766-5544");
  const [candidateEmail, setCandidateEmail] = useState("susmita@barrackpore.in");
  const [dependentStudentId, setDependentStudentId] = useState(101);
  const [dependentName, setDependentName] = useState("Gouranga Hui");
  const [dependentRel, setDependentRel] = useState("Father");
  const [engineLog, setEngineLog] = useState(
    "Key Architecture Loaded. Test inserting students with natural candidate keys, or add weak entity dependents."
  );

  const [students, setStudents] = useState([
    { id: 101, name: "Mamata Hui", aadhaar: "1234-5678-9012", email: "mamata@accotax.in" },
    { id: 102, name: "Abhronila Das", aadhaar: "9876-5432-1098", email: "abhronila@barrackpore.in" },
    { id: 103, name: "Debangshu Roy", aadhaar: "4567-8901-2345", email: "debangshu@kolkata.in" },
  ]);

  const [dependents, setDependents] = useState([
    { studentId: 101, depName: "Gouranga Hui", relation: "Father" },
    { studentId: 101, depName: "Anjali Hui", relation: "Mother" },
    { studentId: 102, depName: "Sanjib Das", relation: "Father" },
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

  const handleInsertStudent = () => {
    const aadhaarExists = students.some((s) => s.aadhaar === candidateAadhaar);
    const emailExists = students.some((s) => s.email === candidateEmail);

    if (aadhaarExists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${candidateAadhaar}' for key 'uq_student_aadhaar'. Natural Candidate Key uniqueness violated!`
      );
      return;
    }

    if (emailExists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${candidateEmail}' for key 'uq_student_email'. Natural Candidate Key uniqueness violated!`
      );
      return;
    }

    const nextId = 100 + students.length + 1;
    const newStudent = {
      id: nextId,
      name: candidateName,
      aadhaar: candidateAadhaar,
      email: candidateEmail,
    };

    setStudents([...students, newStudent]);
    setEngineLog(
      `✓ Query OK, 1 row affected. Inserted student #${nextId} (${candidateName}) with Surrogate PK #${nextId} and verified Natural Candidate Keys (Aadhaar & Email).`
    );
  };

  const handleAddDependent = () => {
    const sid = Number(dependentStudentId);
    const exists = dependents.some((d) => d.studentId === sid && d.depName === dependentName);
    const student = students.find((s) => s.id === sid);

    if (exists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '(${sid}, '${dependentName}')' for key 'PRIMARY'. Weak entity discriminator tuple already exists for ${student?.name}!`
      );
      return;
    }

    const newDep = {
      studentId: sid,
      depName: dependentName,
      relation: dependentRel,
    };

    setDependents([...dependents, newDep]);
    setEngineLog(
      `✓ Weak Entity Insertion OK: Added dependent '${dependentName}' (${dependentRel}) for ${student?.name} (#${sid}). Composite PK = (${sid}, '${dependentName}').`
    );
  };

  const handleReset = () => {
    setStudents([
      { id: 101, name: "Mamata Hui", aadhaar: "1234-5678-9012", email: "mamata@accotax.in" },
      { id: 102, name: "Abhronila Das", aadhaar: "9876-5432-1098", email: "abhronila@barrackpore.in" },
      { id: 103, name: "Debangshu Roy", aadhaar: "4567-8901-2345", email: "debangshu@kolkata.in" },
    ]);
    setDependents([
      { studentId: 101, depName: "Gouranga Hui", relation: "Father" },
      { studentId: 101, depName: "Anjali Hui", relation: "Mother" },
      { studentId: 102, depName: "Sanjib Das", relation: "Father" },
    ]);
    setCandidateName("Susmita Ghosh");
    setCandidateAadhaar("8899-7766-5544");
    setCandidateEmail("susmita@barrackpore.in");
    setEngineLog("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- Strong Owner Entity (Surrogate PK + Natural Candidate Keys)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY, -- Chosen Surrogate PK\n    aadhaar_no CHAR(14) NOT NULL,              -- Natural Candidate Key 1\n    email_address VARCHAR(100) NOT NULL,       -- Natural Candidate Key 2\n    full_name VARCHAR(100) NOT NULL,\n    CONSTRAINT uq_student_aadhaar UNIQUE (aadhaar_no),\n    CONSTRAINT uq_student_email UNIQUE (email_address)\n) ENGINE=InnoDB;\n\n-- Weak Entity (Owner PK + Partial Key Discriminator)\nCREATE TABLE student_dependents (\n    student_id INT NOT NULL,               -- Foreign Key to Owner Strong Entity\n    dependent_name VARCHAR(50) NOT NULL,   -- Partial Key (Discriminator)\n    relationship_type VARCHAR(20) NOT NULL,\n    PRIMARY KEY (student_id, dependent_name), -- Composite Primary Key\n    CONSTRAINT fk_dep_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 2
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Entity Identifiers, Primary Keys,{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Candidate Keys & Partial Keys
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the complete hierarchy of relational keys: Superkeys, Minimal Candidate Keys, Surrogate vs Natural keys,
            and Weak Entity Partial Keys (Discriminators) with Peter Chen notation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Primary Key (Solid Underline)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Natural Candidate Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ➖ Partial Keys (Dashed Underline)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Weak Entity Composite PKs
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Key Hierarchy & Notation ─────────────────── */}
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
                The Relational Key Hierarchy & ER Visual Notation
              </h2>
              <p className="text-xs text-slate-400">
                From broad Superkeys down to Primary Keys and Weak Entity Discriminators
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-slate-400 block font-mono">1. Superkey</strong>
              <p className="text-slate-300">ANY set of attributes that uniquely identifies an entity instance (may contain redundant columns).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
              <strong className="text-cyan-400 block font-mono">2. Candidate Key</strong>
              <p className="text-slate-300">A MINIMAL Superkey with zero extraneous attributes (e.g. <code>student_id</code>, <code>aadhaar_no</code>).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
              <strong className="text-teal-400 block font-mono">3. Primary Key (PK)</strong>
              <p className="text-slate-300">The chosen Candidate Key for row identity. Underlined with a <strong>Solid Line</strong> in ER.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
              <strong className="text-amber-400 block font-mono">4. Partial Key</strong>
              <p className="text-slate-300">Discriminator for Weak Entities under a parent owner. Underlined with a <strong>Dashed Line</strong> in ER.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Key Hierarchy & Notation ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Primary Key vs Partial Key in Peter Chen ER Notation
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="ER Key Notation Guide"
            >
              {/* Strong Entity & Primary Key */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Strong Entity: STUDENT
                </text>
                <line x1="15" y1="36" x2="325" y2="36" stroke="#334155" />
                <text x="30" y="56" fill="#cbd5e1" fontSize="10">🔑 Primary Key: </text>
                <text x="115" y="56" fill="#10b981" fontWeight="bold" textDecoration="underline" fontSize="10">
                  student_id (Solid Underline)
                </text>
                <text x="30" y="76" fill="#cbd5e1" fontSize="10">🎯 Candidate Keys: aadhaar_no, email (UNIQUE)</text>
              </g>

              {/* Weak Entity & Partial Key */}
              <g transform="translate(410, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeDasharray="4 2" />
                <text x="170" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                  Weak Entity: DEPENDENT (Family)
                </text>
                <line x1="15" y1="36" x2="325" y2="36" stroke="#334155" />
                <text x="30" y="56" fill="#cbd5e1" fontSize="10">➖ Partial Key: </text>
                <text x="115" y="56" fill="#f59e0b" fontWeight="bold" fontSize="10">
                  - - - dependent_name - - - (Dashed)
                </text>
                <text x="30" y="76" fill="#cbd5e1" fontSize="10">📦 Composite PK: (student_id, dependent_name)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Key Architecture Sandbox ────── */}
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
                Interactive Key Architecture Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Test inserting duplicate natural candidate keys (Aadhaar / Email) and manage weak entity composite keys
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Insert Student with Natural Keys */}
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Insert Student (Surrogate PK + Natural Candidate Keys):
                </span>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  placeholder="Full Name"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={candidateAadhaar}
                    onChange={(e) => setCandidateAadhaar(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Aadhaar (Candidate Key 1)"
                  />
                  <input
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Email (Candidate Key 2)"
                  />
                </div>
                <button
                  onClick={handleInsertStudent}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ➕ Insert Student Entity
                </button>
              </div>

              {/* Add Weak Entity Dependent */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">
                  Add Weak Entity Dependent (Partial Key Discriminator):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={dependentStudentId}
                    onChange={(e) => setDependentStudentId(Number(e.target.value))}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        Owner: #{s.id} ({s.name.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={dependentName}
                    onChange={(e) => setDependentName(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Partial Key (Name)"
                  />
                  <select
                    value={dependentRel}
                    onChange={(e) => setDependentRel(e.target.value)}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                  </select>
                </div>
                <button
                  onClick={handleAddDependent}
                  className="w-full py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all"
                >
                  ➕ Insert Weak Entity Record
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
                <pre className="whitespace-pre-wrap">{engineLog}</pre>
              </div>
            </div>

            {/* DDL & Live Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational DDL Schema Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-44 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Weak Entity Live Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Weak Entity Table: student_dependents ({dependents.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Composite PK: (student_id, dependent_name)</th>
                        <th className="p-1.5">Relation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {dependents.map((d, idx) => (
                        <tr key={idx}>
                          <td className="p-1.5 text-cyan-300 font-bold">
                            (#{d.studentId}, '{d.depName}')
                          </td>
                          <td className="p-1.5 text-slate-300">{d.relation}</td>
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
                Surrogate keys and weak entity dependent schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Registration Key Architecture
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Surrogate integer PK for fast joins, with UNIQUE constraints on natural Aadhaar & Email.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY, -- Surrogate PK
    aadhaar_no CHAR(14) NOT NULL UNIQUE,       -- Natural Candidate Key 1
    email_address VARCHAR(100) NOT NULL UNIQUE,-- Natural Candidate Key 2
    full_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Weak Entity Dependent Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Family Health</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Weak entity with partial key discriminator mapped into a composite primary key.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_dependents (
    student_id INT NOT NULL,
    dependent_name VARCHAR(50) NOT NULL, -- Partial Key Discriminator
    relationship_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (student_id, dependent_name),
    CONSTRAINT fk_dep_student FOREIGN KEY (student_id)
        REFERENCES students(student_id) ON DELETE CASCADE
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
                Avoid mutable string primary keys and missing candidate key UNIQUE constraints
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
                  <strong className="text-white">1. Using Email as Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Emails are wide strings and mutable; updates force cascading lock updates across all child tables.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Partial Key NOT NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Partial keys participate in the Composite PK and cannot allow NULL values.
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
                  <strong className="text-white">1. Surrogate PK + UNIQUE Constraints:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>INT AUTO_INCREMENT</code> for PK joins and <code>UNIQUE</code> on natural keys.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Dashed Underline for Partial Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Clearly mark weak entity discriminators in conceptual ER diagrams with dashed underlines.
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
              <span>Candidate Keys are minimal superkeys with no redundant attributes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The Primary Key is the chosen official candidate key (Solid Underline in ER)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partial Keys (Dashed Underline) distinguish weak entities under a parent owner</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Weak Entities map to Composite Primary Keys `(owner_id, partial_key)` in MySQL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use compact Surrogate Keys (`INT AUTO_INCREMENT`) for physical joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always enforce natural candidate keys with explicit `UNIQUE NOT NULL` constraints</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Entity Identifiers & Keys – FAQs"
            questions={questions}
            subtitle="Master Primary Keys, Candidate Keys, Partial Key discriminators, and Surrogate design with 30 comprehensive Q&As"
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
            title="Entity Identifiers, Primary Keys, Candidate Keys, and Partial Keys"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_entity_identifiers_keys_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A solid key architecture is the backbone of relational database integrity! " +
              "In my classes in Barrackpore, I teach students the Hybrid Master Pattern: always use an integer surrogate primary key " +
              "(`student_id INT AUTO_INCREMENT`) for foreign key links and clustered indexing, but NEVER forget to put `UNIQUE` constraints " +
              "on your natural candidate keys (like Aadhaar and Email). And when you encounter a weak entity (like student dependents or order items), " +
              "underline its partial key with a dashed line in your ER diagram, and map it into a composite primary key `(student_id, dependent_name)` in MySQL."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · Entity Identifiers & Keys · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
