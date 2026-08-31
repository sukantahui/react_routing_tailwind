import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Strong Entity Sets vs Weak Entity Sets & Identifying Relationships
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Weak Entity Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Weak Entity Sandbox State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [depNameInput, setDepNameInput] = useState("Gouranga Hui");
  const [depRelInput, setDepRelInput] = useState("Father");
  const [depAgeInput, setDepAgeInput] = useState(55);
  const [engineResponse, setEngineResponse] = useState(
    "Weak Entity Schema Loaded. Add dependents or test deleting an owner student to observe cascading deletion."
  );

  const [students, setStudents] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [dependents, setDependents] = useState([
    { studentId: 101, depName: "Gouranga Hui", rel: "Father", age: 55 },
    { studentId: 101, depName: "Anjali Hui", rel: "Mother", age: 50 },
    { studentId: 102, depName: "Sanjib Das", rel: "Father", age: 52 },
    { studentId: 103, depName: "Moumita Roy", rel: "Sister", age: 19 },
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

  const handleAddDependent = () => {
    const sid = Number(selectedStudentId);
    const exists = dependents.some((d) => d.studentId === sid && d.depName === depNameInput);
    const student = students.find((s) => s.id === sid);

    if (exists) {
      setEngineResponse(
        `❌ ERROR 1062 (23000): Duplicate entry '(${sid}, '${depNameInput}')' for key 'PRIMARY'. Weak entity discriminator already exists under ${student?.name}!`
      );
      return;
    }

    const newDep = {
      studentId: sid,
      depName: depNameInput,
      rel: depRelInput,
      age: Number(depAgeInput),
    };

    setDependents([...dependents, newDep]);
    setEngineResponse(
      `✓ Weak Entity Inserted: (${sid}, '${depNameInput}') into 'student_dependents' under owner ${student?.name}. Composite PK = (student_id, dependent_name).`
    );
  };

  const handleDeleteStudent = (studentId) => {
    const target = students.find((s) => s.id === studentId);
    const depCount = dependents.filter((d) => d.studentId === studentId).length;

    setStudents(students.filter((s) => s.id !== studentId));
    // Simulate ON DELETE CASCADE
    setDependents(dependents.filter((d) => d.studentId !== studentId));
    setEngineResponse(
      `✓ ON DELETE CASCADE: Deleted Strong Owner Entity '${target?.name}' (#${studentId}). All ${depCount} dependent weak entity row(s) in 'student_dependents' were automatically wiped by InnoDB!`
    );
  };

  const handleReset = () => {
    setStudents([
      { id: 101, name: "Mamata Hui", city: "Barrackpore" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore" },
      { id: 103, name: "Debangshu Roy", city: "Kolkata" },
    ]);
    setDependents([
      { studentId: 101, depName: "Gouranga Hui", rel: "Father", age: 55 },
      { studentId: 101, depName: "Anjali Hui", rel: "Mother", age: 50 },
      { studentId: 102, depName: "Sanjib Das", rel: "Father", age: 52 },
      { studentId: 103, depName: "Moumita Roy", rel: "Sister", age: 19 },
    ]);
    setEngineResponse("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- Strong Owner Entity (Single Rectangle)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'\n) ENGINE=InnoDB;\n\n-- Weak Entity (Double Rectangle, Double Diamond Identifying Rel)\nCREATE TABLE student_dependents (\n    student_id INT NOT NULL,               -- Foreign Key to Owner\n    dependent_name VARCHAR(50) NOT NULL,   -- Partial Key Discriminator\n    relationship_type VARCHAR(20) NOT NULL,\n    age INT NOT NULL,\n    PRIMARY KEY (student_id, dependent_name), -- Composite Primary Key\n    CONSTRAINT fk_dep_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id)\n        ON DELETE CASCADE -- Existence Dependency\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 3
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Strong Entity Sets vs Weak Entity Sets &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Identifying Relationships
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master existence dependency, Peter Chen double notation (Double Rectangles, Double Diamonds, Double Lines),
            partial key discriminators, and relational composite primary key mapping with <code>ON DELETE CASCADE</code>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 [Strong Entity]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦📦 [[Weak Entity]]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💎💎 &lt;&lt;Identifying Relationship&gt;&gt;
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🗑️ ON DELETE CASCADE
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Peter Chen Weak Entity Notation ─────────── */}
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
                Peter Chen Double Notation for Weak Entities
              </h2>
              <p className="text-xs text-slate-400">
                The 4 visual components that define a weak entity relationship
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
              <strong className="text-teal-400 block font-mono">1. Double Rectangle</strong>
              <p className="text-slate-300">Weak Entity Set (e.g. <code>[[DEPENDENT]]</code>) that lacks its own primary key.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1">
              <strong className="text-cyan-400 block font-mono">2. Double Diamond</strong>
              <p className="text-slate-300">Identifying Relationship connecting the weak entity to its strong owner entity.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-1">
              <strong className="text-indigo-400 block font-mono">3. Double Line</strong>
              <p className="text-slate-300">Total Mandatory Participation of the weak entity in the identifying link.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
              <strong className="text-amber-400 block font-mono">4. Dashed Underline</strong>
              <p className="text-slate-300">Partial Key (Discriminator) attribute that identifies child records under one parent.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Peter Chen Weak Entity Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Strong Entity to Weak Entity Identifying Relationship in Peter Chen Notation
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Weak Entity Peter Chen Notation"
            >
              {/* Strong Owner Entity */}
              <g transform="translate(30, 45)">
                <rect width="180" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="90" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="11">
                  STUDENT
                </text>
                <text x="90" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  (Strong Owner)
                </text>
              </g>

              {/* Single Line from Strong Entity */}
              <line x1="210" y1="70" x2="310" y2="70" stroke="#64748b" strokeWidth="2" />
              <text x="260" y="62" fill="#94a3b8" textAnchor="middle" fontSize="10" fontWeight="bold">1</text>

              {/* Identifying Relationship (Double Diamond) */}
              <g transform="translate(310, 35)">
                {/* Outer Diamond */}
                <polygon points="70,0 140,35 70,70 0,35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                {/* Inner Diamond */}
                <polygon points="70,6 128,35 70,64 12,35" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="70" y="38" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">
                  Has_Dependent
                </text>
              </g>

              {/* Double Line to Weak Entity (Total Participation) */}
              <line x1="450" y1="67" x2="550" y2="67" stroke="#818cf8" strokeWidth="1.5" />
              <line x1="450" y1="73" x2="550" y2="73" stroke="#818cf8" strokeWidth="1.5" />
              <text x="500" y="60" fill="#818cf8" textAnchor="middle" fontSize="10" fontWeight="bold">N (Total)</text>

              {/* Weak Entity (Double Rectangle) */}
              <g transform="translate(550, 45)">
                {/* Outer Rect */}
                <rect width="200" height="50" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                {/* Inner Rect */}
                <rect x="4" y="4" width="192" height="42" rx="2" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="100" y="24" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="11">
                  DEPENDENT
                </text>
                <text x="100" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  (Weak Entity)
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Weak Entity Simulator ───────── */}
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
                Interactive Weak Entity Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Add dependent records under owner students and test ON DELETE CASCADE automatic child cleanup
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-indigo-400 block">
                  Add Weak Entity Dependent:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Owner Student:</label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    >
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>
                          #{s.id} ({s.name.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Partial Key (Name):</label>
                    <input
                      type="text"
                      value={depNameInput}
                      onChange={(e) => setDepNameInput(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Relation:</label>
                    <select
                      value={depRelInput}
                      onChange={(e) => setDepRelInput(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Sister">Sister</option>
                      <option value="Brother">Brother</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddDependent}
                  className="w-full py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-500/30 transition-all"
                >
                  ➕ Insert Dependent Record
                </button>
              </div>

              {/* Strong Entity Actions */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Test ON DELETE CASCADE (Delete Strong Owner):
                </span>
                <p className="text-xs text-slate-400">
                  Deleting a student automatically cascades and deletes all their dependents.
                </p>
                <div className="flex gap-2">
                  {students.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleDeleteStudent(s.id)}
                      className="flex-1 py-1.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                    >
                      Drop #{s.id} ({s.name.split(" ")[0]})
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
                <pre className="whitespace-pre-wrap">{engineResponse}</pre>
              </div>
            </div>

            {/* DDL & Live Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Weak Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Weak Entity: student_dependents ({dependents.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Composite PK (student_id, dependent_name)</th>
                        <th className="p-1.5">Relation</th>
                        <th className="p-1.5">Age</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {dependents.map((d, idx) => (
                        <tr key={idx}>
                          <td className="p-1.5 text-cyan-300 font-bold">
                            (#{d.studentId}, '{d.depName}')
                          </td>
                          <td className="p-1.5 text-slate-300">{d.rel}</td>
                          <td className="p-1.5 text-slate-400">{d.age} yrs</td>
                        </tr>
                      ))}
                      {dependents.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-2 text-center text-slate-500 italic">
                            All dependent records wiped cleanly via CASCADE!
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
                Weak entity family dependents and campus building rooms from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Family Dependents
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Family members identified by combining owner student_id + dependent_name with ON DELETE CASCADE.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_dependents (
    student_id INT NOT NULL,
    dependent_name VARCHAR(50) NOT NULL,
    relationship_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (student_id, dependent_name),
    CONSTRAINT fk_dep_student FOREIGN KEY (student_id)
        REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Multi-Building Campus Classrooms
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Campus</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Room numbers (e.g. '101') are duplicated across buildings; primary key is composite (building_code, room_number).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE building_rooms (
    building_code VARCHAR(10) NOT NULL,
    room_number VARCHAR(10) NOT NULL,
    seating_capacity INT NOT NULL DEFAULT 40,
    PRIMARY KEY (building_code, room_number),
    CONSTRAINT fk_room_building FOREIGN KEY (building_code)
        REFERENCES campus_buildings(building_code) ON DELETE CASCADE
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
                Avoid single-rectangle weak entity mistakes and SET NULL foreign key invalidations
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
                  <strong className="text-white">1. Single Rectangle for Weak Entity:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Failing to use double rectangles obscures existence dependency in conceptual models.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using SET NULL on Weak FK:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Weak entities cannot exist without an owner; FK is part of PK and cannot be NULL.
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
                  <strong className="text-white">1. Double Notation Discipline:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always draw Double Rectangles, Double Diamonds, and Double Lines for weak entities.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Always Use ON DELETE CASCADE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure deleting an owner automatically cleans up all dependent child records.
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
              <span>Strong Entities have independent primary keys (Single Rectangle in ER)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Weak Entities depend on an owner for identity (Double Rectangle in ER)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Identifying Relationships are drawn as Double Diamonds with Double Lines</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Partial Keys (Discriminators) are underlined with a Dashed Line in ER</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Weak Entities map to Composite Primary Keys `(owner_id, partial_key)` in MySQL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Weak Entity Foreign Keys MUST use `ON DELETE CASCADE`</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Strong vs Weak Entities – FAQs"
            questions={questions}
            subtitle="Master existence dependency, Peter Chen double notation, partial key discriminators, and composite PKs with 30 comprehensive Q&As"
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
            title="Strong Entity Sets vs Weak Entity Sets & Identifying Relationships"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_weak_entities_identifying_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Weak entities are one of the most powerful concepts in ER modeling! " +
              "In my classes in Barrackpore, I teach students to look for 'existence dependency': if an entity cannot survive on its own, " +
              "such as an order line item or a student dependent, it is a Weak Entity. In your ER diagram, give it a double rectangle, " +
              "connect it with a double diamond, and give its partial key a dashed underline. And in MySQL, map it into a composite primary key " +
              "`(student_id, dependent_name)` with `ON DELETE CASCADE`. That way, the database engine enforces business lifecycle integrity automatically."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · Strong vs Weak Entities · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
