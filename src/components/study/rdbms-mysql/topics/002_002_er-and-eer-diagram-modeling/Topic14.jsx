import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Step-by-Step Mapping: Weak Entities, 1:1 Relationships, and 1:N Relationships
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Steps 2, 3, 4 Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic14 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [activeStepTab, setActiveStepTab] = useState("step2"); // "step2" | "step3" | "step4"

  // Step 2 State: Weak Entity Dependents
  const [studentIdForDep, setStudentIdForDep] = useState(101);
  const [depName, setDepName] = useState("Aarav Hui");
  const [depRelation, setDepRelation] = useState("Brother");
  const [dependents, setDependents] = useState([
    { studentId: 101, name: "Aarav Hui", relation: "Brother" },
    { studentId: 101, name: "Ananya Hui", relation: "Sister" },
    { studentId: 102, name: "Rohan Das", relation: "Father" },
  ]);

  // Step 3 State: 1:1 Department Heads
  const [deptName, setDeptName] = useState("Computer Science");
  const [headFacultyId, setHeadFacultyId] = useState(1);
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science", headId: 1 },
    { id: 2, name: "Information Tech", headId: 2 },
  ]);

  // Step 4 State: 1:N Faculty Members
  const [facultyName, setFacultyName] = useState("Susmita Ghosh");
  const [assignedDeptId, setAssignedDeptId] = useState(1);
  const [facultyList, setFacultyList] = useState([
    { id: 1, name: "Prof. Sukanta Hui", deptId: 1 },
    { id: 2, name: "Prof. Debangshu Roy", deptId: 2 },
    { id: 3, name: "Prof. Mahima Das", deptId: 1 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Mapping Simulator Ready. Test Step 2 (Weak Entities), Step 3 (1:1 Unique FKs), or Step 4 (1:N Foreign Keys)."
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

  const handleAddDependent = () => {
    const exists = dependents.some(
      (d) => d.studentId === Number(studentIdForDep) && d.name.toLowerCase() === depName.toLowerCase()
    );
    if (exists) {
      setEngineLog(`❌ ERROR 1062: Duplicate Composite PK (${studentIdForDep}, '${depName}') for weak entity!`);
      return;
    }

    setDependents([
      ...dependents,
      { studentId: Number(studentIdForDep), name: depName, relation: depRelation },
    ]);
    setEngineLog(
      `✓ Step 2 Applied: Added Weak Entity row. Composite PK (${studentIdForDep}, '${depName}') created with ON DELETE CASCADE link to students table.`
    );
  };

  const handleAddDepartmentHead = () => {
    const headInUse = departments.some((d) => d.headId === Number(headFacultyId));
    if (headInUse) {
      const existing = departments.find((d) => d.headId === Number(headFacultyId));
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${headFacultyId}' for key 'uq_head_faculty_id'! Faculty #${headFacultyId} already heads '${existing?.name}'. 1:1 UNIQUE constraint violated.`
      );
      return;
    }

    const nextId = departments.length > 0 ? Math.max(...departments.map((d) => d.id)) + 1 : 1;
    setDepartments([...departments, { id: nextId, name: deptName, headId: Number(headFacultyId) }]);
    setEngineLog(
      `✓ Step 3 Applied: Strategy 3A (Embedded Unique FK). Department #${nextId} linked 1:1 to Faculty #${headFacultyId}.`
    );
  };

  const handleAddFaculty = () => {
    const nextId = facultyList.length > 0 ? Math.max(...facultyList.map((f) => f.id)) + 1 : 1;
    setFacultyList([
      ...facultyList,
      { id: nextId, name: facultyName, deptId: Number(assignedDeptId) },
    ]);
    setEngineLog(
      `✓ Step 4 Applied: Embedded 1-side dept_id #${assignedDeptId} into N-side faculty table for '${facultyName}'.`
    );
  };

  const handleReset = () => {
    setDependents([
      { studentId: 101, name: "Aarav Hui", relation: "Brother" },
      { studentId: 101, name: "Ananya Hui", relation: "Sister" },
      { studentId: 102, name: "Rohan Das", relation: "Father" },
    ]);
    setDepartments([
      { id: 1, name: "Computer Science", headId: 1 },
      { id: 2, name: "Information Tech", headId: 2 },
    ]);
    setFacultyList([
      { id: 1, name: "Prof. Sukanta Hui", deptId: 1 },
      { id: 2, name: "Prof. Debangshu Roy", deptId: 2 },
      { id: 3, name: "Prof. Mahima Das", deptId: 1 },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Step 2: Weak Entity Table (Composite PK + CASCADE)\nCREATE TABLE student_dependents (\n    student_id INT NOT NULL,\n    dependent_name VARCHAR(50) NOT NULL,\n    relationship VARCHAR(30) NOT NULL,\n    PRIMARY KEY (student_id, dependent_name),\n    CONSTRAINT fk_dep_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Step 3: 1:1 Relationship (Strategy 3A: Embedded UNIQUE FK)\nCREATE TABLE departments (\n    dept_id INT AUTO_INCREMENT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL,\n    head_faculty_id INT NOT NULL UNIQUE,\n    CONSTRAINT fk_dept_head FOREIGN KEY (head_faculty_id)\n        REFERENCES faculty(faculty_id)\n) ENGINE=InnoDB;\n\n-- Step 4: 1:N Relationship (Embedded FK in N-side Table)\nCREATE TABLE faculty (\n    faculty_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    dept_id INT NOT NULL,\n    CONSTRAINT fk_faculty_dept FOREIGN KEY (dept_id)\n        REFERENCES departments(dept_id)\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 14
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            ER-to-Relational Mapping:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Steps 2, 3 & 4 (Weak, 1:1, 1:N)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Steps 2, 3, and 4 of the mapping algorithm: Step 2 Weak Entities (Composite PKs with CASCADE),
            Step 3 Binary 1:1 Relationships (Strategy 3A Unique FKs), and Step 4 Binary 1:N Relationships (Embedded Child FKs).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👶 Step 2: Weak Entity Composite PK
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💍 Step 3: 1:1 Embedded UNIQUE FK
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌿 Step 4: 1:N Embedded Child FK
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ ON DELETE CASCADE Protection
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Architecture & Rules Summary ────────────── */}
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
                Steps 2, 3 & 4 Transformation Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Core mapping rules for owner-dependent entities and binary associations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Step 2: Weak Entities
              </span>
              <p className="text-xs text-slate-300">
                Composite PK = <code>&#123;Owner_PK, Partial_Key&#125;</code> with mandatory <code>ON DELETE CASCADE</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Step 3: Binary 1:1 Links
              </span>
              <p className="text-xs text-slate-300">
                Embed foreign key in table with <strong>Total</strong> participation and mark column <code>UNIQUE</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Step 4: Binary 1:N Links
              </span>
              <p className="text-xs text-slate-300">
                Embed the <strong>1-side</strong> Primary Key as a Foreign Key column inside the <strong>N-side</strong> table.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 3-in-1 Mapping Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Steps 2, 3, and 4 Relational Transformation Schemas
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Steps 2, 3, 4 Mapping Schemas"
            >
              {/* Step 2 Box */}
              <g transform="translate(20, 15)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="110" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Step 2: Weak Entity</text>
                <text x="12" y="42" fill="#38bdf8" fontWeight="bold">PK: (student_id, dep_name)</text>
                <text x="12" y="60" fill="#cbd5e1">relationship : VARCHAR</text>
                <text x="12" y="78" fill="#10b981">FK: student_id ➔ CASCADE</text>
              </g>

              {/* Step 3 Box */}
              <g transform="translate(280, 15)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="110" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Step 3: 1:1 Unique FK</text>
                <text x="12" y="42" fill="#38bdf8" fontWeight="bold">PK: dept_id INT</text>
                <text x="12" y="60" fill="#f59e0b" fontWeight="bold">FK: head_id INT UNIQUE</text>
                <text x="12" y="78" fill="#10b981">Zero duplication / 1:1 limit</text>
              </g>

              {/* Step 4 Box */}
              <g transform="translate(540, 15)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Step 4: 1:N Child FK</text>
                <text x="12" y="42" fill="#38bdf8" fontWeight="bold">PK: faculty_id INT</text>
                <text x="12" y="60" fill="#cbd5e1">full_name : VARCHAR</text>
                <text x="12" y="78" fill="#10b981">FK: dept_id (1-side parent)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Steps 2, 3, 4 Sandbox ───────── */}
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
                Interactive Steps 2, 3 & 4 Mapping Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Switch between steps to test composite keys, 1:1 unique constraint collisions, and 1:N child links
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Step Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveStepTab("step2")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeStepTab === "step2"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 2: Weak Entity Dependents
              </button>
              <button
                onClick={() => setActiveStepTab("step3")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeStepTab === "step3"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 3: 1:1 Unique Department Heads
              </button>
              <button
                onClick={() => setActiveStepTab("step4")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeStepTab === "step4"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 4: 1:N Faculty in Departments
              </button>
            </div>

            {/* Tab Sandbox */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                {activeStepTab === "step2" && (
                  <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-3.5 space-y-2">
                    <span className="text-xs font-bold text-amber-400 block">
                      Insert Weak Entity Dependent:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={studentIdForDep}
                        onChange={(e) => setStudentIdForDep(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      &gt;
                        <option value={101}>Mamata (#101)</option>
                        <option value={102}>Abhronila (#102)</option>
                        <option value={103}>Debangshu (#103)</option>
                      </select>
                      <input
                        type="text"
                        value={depName}
                        onChange={(e) => setDepName(e.target.value)}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        placeholder="Dependent Name"
                      /&gt;
                      <input
                        type="text"
                        value={depRelation}
                        onChange={(e) => setDepRelation(e.target.value)}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        placeholder="Relation"
                      /&gt;
                    </div>
                    <button
                      onClick={handleAddDependent}
                      className="w-full py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all"
                    >
                      ➕ Insert Weak Entity Dependent
                    </button>
                  </div>
                )}

                {activeStepTab === "step3" && (
                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-3.5 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 block">
                      Assign 1:1 Department Head (Strategy 3A):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)}
                        className="rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="Dept Name"
                      /&gt;
                      <select
                        value={headFacultyId}
                        onChange={(e) => setHeadFacultyId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      &gt;
                        {facultyList.map((f) => (
                          <option key={f.id} value={f.id}>
                            #{f.id} {f.name.split(" ")[1]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleAddDepartmentHead}
                      className="w-full py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                    >
                      ⚡ Link 1:1 Department Head
                    </button>
                  </div>
                )}

                {activeStepTab === "step4" && (
                  <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-3.5 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 block">
                      Insert Faculty into 1:N Department:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        className="rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="Faculty Name"
                      /&gt;
                      <select
                        value={assignedDeptId}
                        onChange={(e) => setAssignedDeptId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      &gt;
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            #{d.id} {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleAddFaculty}
                      className="w-full py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-all"
                    >
                      ➕ Add Faculty (1:N Link)
                    </button>
                  </div>
                )}

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
                    Steps 2, 3 & 4 DDL Schema:
                  </span>
                  <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                    {ddlSnippet}
                  </pre>
                </div>

                {/* Active Live Table */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    {activeStepTab === "step2" && <span>student_dependents (Weak Table: {dependents.length} rows)</span>}
                    {activeStepTab === "step3" && <span>departments (1:1 Unique Head: {departments.length} rows)</span>}
                    {activeStepTab === "step4" && <span>faculty (1:N Embedded Dept FK: {facultyList.length} rows)</span>}
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {activeStepTab === "step2" && (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Composite PK (student_id, name)</th>
                              <th className="p-1.5">Relation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {dependents.map((d, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-cyan-300 font-bold">({d.studentId}, '{d.name}')</td>
                                <td className="p-1.5 text-slate-300">{d.relation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {activeStepTab === "step3" && (
                        <>
                          <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Dept ID (PK)</th>
                              <th className="p-1.5">Dept Name</th>
                              <th className="p-1.5">Head Faculty ID (UNIQUE FK)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {departments.map((d) => (
                              <tr key={d.id}>
                                <td className="p-1.5 text-cyan-300 font-bold">#{d.id}</td>
                                <td className="p-1.5 text-slate-300">{d.name}</td>
                                <td className="p-1.5 text-emerald-300 font-bold">Faculty #{d.headId}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {activeStepTab === "step4" && (
                        <>
                          <thead className="bg-slate-950 text-emerald-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Faculty ID (PK)</th>
                              <th className="p-1.5">Full Name</th>
                              <th className="p-1.5">Dept ID (Embedded FK)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {facultyList.map((f) => (
                              <tr key={f.id}>
                                <td className="p-1.5 text-cyan-300 font-bold">#{f.id}</td>
                                <td className="p-1.5 text-white">{f.name}</td>
                                <td className="p-1.5 text-amber-300 font-bold">Dept #{f.deptId}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}
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
                Academy dependents, department leadership, and faculty employment from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Student Dependents (Step 2 Weak Entity)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Student dependents use composite primary key <code>(student_id, dependent_name)</code> with cascading delete.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_dependents (
    student_id INT NOT NULL,
    dependent_name VARCHAR(50) NOT NULL,
    relationship VARCHAR(30) NOT NULL,
    PRIMARY KEY (student_id, dependent_name),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata University Leadership (Step 3 1:1 Strategy 3A)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Department embeds <code>head_faculty_id INT UNIQUE NOT NULL</code> to enforce mandatory 1:1 leadership.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    head_faculty_id INT NOT NULL UNIQUE,
    FOREIGN KEY (head_faculty_id) REFERENCES faculty(faculty_id)
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
                Avoid missing UNIQUE constraints on 1:1 foreign keys and embedding foreign keys in 1-side tables
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
                  <strong className="text-white">1. Missing UNIQUE on 1:1 FK:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting UNIQUE allows multiple departments to claim the same head, corrupting 1:1 into 1:N.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Embedding FK in 1-Side for 1:N:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Putting employee IDs inside the Department table forces non-atomic arrays, violating 1NF.
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
                  <strong className="text-white">1. Weak Composite Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>PRIMARY KEY (owner_pk, partial_key)</code> with <code>ON DELETE CASCADE</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Embed 1-Side PK in N-Side Child:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always put <code>dept_id</code> in the <code>faculty</code> child table for clean 1:N mapping.
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
              <span>Step 2 Weak Entity PK = `{Owner_PK, Partial_Key}` with ON DELETE CASCADE</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Step 3 Strategy 3A (1:1): Embed `UNIQUE` FK in table with Total participation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Step 3 Strategy 3B (1:1): Merge into a single table if both sides are Total</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Step 4 (1:N): Embed the 1-side Primary Key as a Foreign Key in the N-side table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>1:N relationship attributes belong directly inside the N-side child table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Add `NOT NULL` on foreign keys when child participation is Total (Mandatory)</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Steps 2, 3, 4: Weak Entities, 1:1, and 1:N Mapping – FAQs"
            questions={questions}
            subtitle="Master Steps 2, 3, and 4 of the ER-to-Relational mapping algorithm, composite weak entity keys, 1:1 unique foreign keys, and 1:N child tables with 30 comprehensive Q&As"
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
            title="Step-by-Step Mapping: Weak Entities, 1:1 Relationships, and 1:N Relationships"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic14_steps2_3_4_mapping_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Steps 2, 3, and 4 bridge conceptual associations into concrete foreign key constraints! " +
              "In my classes in Barrackpore, I teach students three ironclad rules: " +
              "1) For Weak Entities (Step 2), the Primary Key is ALWAYS composite: `PRIMARY KEY (owner_id, partial_key)` with `ON DELETE CASCADE`. " +
              "2) For 1:1 links (Step 3), embed the foreign key on the Mandatory side and NEVER forget `UNIQUE`—without `UNIQUE`, it turns into 1:N! " +
              "3) For 1:N links (Step 4), always embed the 1-side PK into the N-side child table. " +
              "Memorize these three rules, and 90% of your relational database designs will be completely error-free."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 14 · Steps 2, 3 & 4 Mapping · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic14;
