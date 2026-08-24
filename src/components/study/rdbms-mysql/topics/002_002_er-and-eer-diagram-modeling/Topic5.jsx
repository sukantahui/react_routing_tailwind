import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Structural Constraints on Relationships: Cardinality Ratio & Participation Constraints
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Structural Constraints Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [selectedDeptId, setSelectedDeptId] = useState(1);
  const [selectedFacultyId, setSelectedFacultyId] = useState(10);
  const [engineLog, setEngineLog] = useState(
    "Structural Constraints Simulator Ready. Assign an HOD to test 1:1 UNIQUE NOT NULL constraint enforcement."
  );

  const [faculties] = useState([
    { id: 10, name: "Prof. Sukanta Hui", dept: "Computer Science" },
    { id: 20, name: "Prof. Susmita Ghosh", dept: "Information Tech" },
    { id: 30, name: "Prof. Debangshu Roy", dept: "Electronics" },
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, name: "Dept of Computer Science", hodId: 10 },
    { id: 2, name: "Dept of Information Tech", hodId: 20 },
    { id: 3, name: "Dept of Electronics", hodId: null },
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

  const handleAssignHOD = () => {
    const deptId = Number(selectedDeptId);
    const facultyId = Number(selectedFacultyId);

    // Check if faculty is already HOD of another department (1:1 UNIQUE constraint check)
    const existingDept = departments.find((d) => d.hodId === facultyId && d.id !== deptId);
    const targetDept = departments.find((d) => d.id === deptId);
    const faculty = faculties.find((f) => f.id === facultyId);

    if (existingDept) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${facultyId}' for key 'uq_dept_hod'. ${faculty?.name} is already HOD of '${existingDept.name}'! A faculty member can manage at most ONE department (1:1 constraint).`
      );
      return;
    }

    setDepartments(
      departments.map((d) => (d.id === deptId ? { ...d, hodId: facultyId } : d))
    );
    setEngineLog(
      `✓ 1:1 Partial/Total Constraint Enforced: Assigned ${faculty?.name} (#${facultyId}) as HOD of '${targetDept?.name}' (#${deptId}). 'hod_faculty_id' updated in 'departments' table.`
    );
  };

  const handleReset = () => {
    setDepartments([
      { id: 1, name: "Dept of Computer Science", hodId: 10 },
      { id: 2, name: "Dept of Information Tech", hodId: 20 },
      { id: 3, name: "Dept of Electronics", hodId: null },
    ]);
    setEngineLog("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- 1:1 Relationship (Faculty Partial, Department Total)\n-- Foreign Key placed in Total side (departments) with NOT NULL UNIQUE\nCREATE TABLE departments (\n    dept_id INT AUTO_INCREMENT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL,\n    hod_faculty_id INT NOT NULL, -- Total Participation (NOT NULL)\n    CONSTRAINT uq_dept_hod UNIQUE (hod_faculty_id), -- 1:1 Cardinality\n    CONSTRAINT fk_dept_hod FOREIGN KEY (hod_faculty_id)\n        REFERENCES faculty(faculty_id) ON DELETE RESTRICT\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Structural Constraints: Cardinality Ratios &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Participation Constraints
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the two pillars of ER structural constraints: Cardinality Ratios (1:1, 1:N, M:N maximums) and
            Participation Constraints (Total/Mandatory double lines vs Partial/Optional single lines) with relational DDL mapping.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Cardinality (Max: 1:1, 1:N, M:N)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ═ Total Participation (Double Line)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ─ Partial Participation (Single Line)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Foreign Key Placement Rules
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Structural Constraints Architecture ─────── */}
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
                Cardinality Ratio (Max) vs Participation Constraint (Min)
              </h2>
              <p className="text-xs text-slate-400">
                The mathematical bounds that dictate relational table structure and nullability
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                1. Cardinality Ratio (Maximum Bound)
              </span>
              <p className="text-xs text-slate-300">
                Answers: <em>"What is the MAXIMUM number of relationship instances an entity can participate in?"</em>
              </p>
              <ul className="text-xs text-slate-400 space-y-1 font-mono">
                <li>• 1:1 (One-to-One): Max 1 on both sides.</li>
                <li>• 1:N (One-to-Many): Max 1 on one side, Max N on the other.</li>
                <li>• M:N (Many-to-Many): Max N on both sides (needs Bridge table).</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                2. Participation Constraint (Minimum Bound)
              </span>
              <p className="text-xs text-slate-300">
                Answers: <em>"Can an entity exist WITHOUT participating in the relationship?"</em>
              </p>
              <ul className="text-xs text-slate-400 space-y-1 font-mono">
                <li>• Total (Mandatory, Min = 1): Double Line in ER (NOT NULL in DDL).</li>
                <li>• Partial (Optional, Min = 0): Single Line in ER (Nullable in DDL).</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Structural Constraints ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: 1:1 Relationship (Faculty Partial, Department Total) in Peter Chen Notation
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Structural Constraints ER Guide"
            >
              {/* Faculty Entity */}
              <g transform="translate(30, 40)">
                <rect width="180" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="11">FACULTY</text>
                <text x="90" y="38" fill="#94a3b8" textAnchor="middle" fontSize="9">(Partial: Min = 0, Max = 1)</text>
              </g>

              {/* Single Line (Partial Participation) */}
              <line x1="210" y1="65" x2="310" y2="65" stroke="#38bdf8" strokeWidth="2" />
              <text x="260" y="55" fill="#38bdf8" textAnchor="middle" fontSize="10" fontWeight="bold">1 (Partial)</text>

              {/* Relationship Diamond */}
              <g transform="translate(310, 30)">
                <polygon points="70,0 140,35 70,70 0,35" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="38" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">Manages</text>
              </g>

              {/* Double Line (Total Participation) */}
              <line x1="450" y1="62" x2="550" y2="62" stroke="#10b981" strokeWidth="1.5" />
              <line x1="450" y1="68" x2="550" y2="68" stroke="#10b981" strokeWidth="1.5" />
              <text x="500" y="55" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold">1 (Total)</text>

              {/* Department Entity */}
              <g transform="translate(550, 40)">
                <rect width="200" height="50" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="100" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="11">DEPARTMENT</text>
                <text x="100" y="38" fill="#94a3b8" textAnchor="middle" fontSize="9">(Total: Min = 1, Max = 1)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Constraints Simulator ──────── */}
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
                Interactive Structural Constraints Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Assign HODs to departments and test 1:1 UNIQUE NOT NULL constraint collision handling
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  Assign Faculty to Manage Department (1:1 Partial/Total):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Select Department (Total):</label>
                    <select
                      value={selectedDeptId}
                      onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          #{d.id} ({d.name.replace("Dept of ", "")})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Select Faculty (Partial):</label>
                    <select
                      value={selectedFacultyId}
                      onChange={(e) => setSelectedFacultyId(Number(e.target.value))}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    >
                      {faculties.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name.split(" ")[1]} (#{f.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAssignHOD}
                  className="w-full py-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all"
                >
                  ⚡ Assign HOD (Execute UPDATE)
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
                  Relational DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Departments Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>departments (Total Side - Stores FK with UNIQUE):</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Dept ID (PK)</th>
                        <th className="p-1.5">Department Name</th>
                        <th className="p-1.5">HOD Faculty ID (FK, UNIQUE)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {departments.map((d) => (
                        <tr key={d.id}>
                          <td className="p-1.5 text-cyan-300 font-bold">#{d.id}</td>
                          <td className="p-1.5 text-slate-300">{d.name}</td>
                          <td className="p-1.5">
                            {d.hodId ? (
                              <span className="text-emerald-400 font-bold">#{d.hodId}</span>
                            ) : (
                              <span className="text-rose-400 italic">NULL (Violation)</span>
                            )}
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
                Department HODs and citizen Aadhaar profiles from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Citizen Aadhaar Profile (1:1 Total/Total)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Every citizen has exactly 1 Aadhaar card; merged into single table with UNIQUE NOT NULL.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE citizens (
    citizen_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    aadhaar_no CHAR(12) NOT NULL UNIQUE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata College Department Head (1:1 Partial/Total)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata College</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Faculty is Partial (most faculty are not HODs); Department is Total (FK with NOT NULL UNIQUE).
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    hod_faculty_id INT NOT NULL UNIQUE,
    CONSTRAINT fk_dept_hod FOREIGN KEY (hod_faculty_id)
        REFERENCES faculty(faculty_id)
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
                Avoid placing foreign keys on partial sides and omitting NOT NULL constraints
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
                  <strong className="text-white">1. FK on Partial Side of 1:1:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Putting <code>dept_id</code> in <code>faculty</code> generates 99% NULL values across the table.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting NOT NULL on Total Side:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting <code>NOT NULL</code> allows departments to be created without mandatory managers.
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
                  <strong className="text-white">1. Place FK on Total Side of 1:1:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always place the foreign key in the table with Total Participation and add <code>UNIQUE NOT NULL</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Double Lines for Total in ER:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always draw double lines for mandatory participation to communicate business rules clearly.
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
              <span>Cardinality Ratio specifies the MAXIMUM association bound (1:1, 1:N, M:N)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Participation Constraint specifies the MINIMUM bound (Total = 1, Partial = 0)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Total Participation is drawn with a Double Line in Peter Chen ER diagrams</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>For 1:1 relationships, place the Foreign Key on the TOTAL side with `UNIQUE NOT NULL`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>For 1:N relationships, enforce Total participation with `NOT NULL` on the FK column</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Many-to-Many (M:N) relationships ALWAYS require an intermediate bridge table</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Structural Constraints & Cardinality – FAQs"
            questions={questions}
            subtitle="Master Cardinality Ratios, Total vs Partial participation, 1:1 FK placement, and Crow's foot modality with 30 comprehensive Q&As"
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
            title="Structural Constraints on Relationships: Cardinality Ratio and Participation Constraints"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_structural_constraints_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Mastering structural constraints is what makes your schemas rock-solid! " +
              "In my classes in Barrackpore, I teach students the Golden Rule of 1:1 Foreign Key Placement: " +
              "if Faculty is Partial (optional) and Department is Total (mandatory), NEVER put the foreign key in Faculty. " +
              "Putting it in Faculty leaves 99% of the column full of NULLs. Instead, put `hod_faculty_id NOT NULL UNIQUE` " +
              "in the Department table. That simple architectural decision guarantees zero NULLs, enforces 1:1 uniqueness, " +
              "and makes your database lightning-fast."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · Structural Constraints · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
