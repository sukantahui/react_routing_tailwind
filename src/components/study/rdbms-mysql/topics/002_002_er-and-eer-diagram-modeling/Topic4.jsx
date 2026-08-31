import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Relationship Types, Degrees (Unary, Binary, Ternary, n-ary), and Roles in Relationships
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Relationship Degree Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [activeDegreeTab, setActiveDegreeTab] = useState("ternary"); // "unary" | "binary" | "ternary"

  // Ternary Sandbox State
  const [selectedDoctorId, setSelectedDoctorId] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState(101);
  const [selectedMedId, setSelectedMedId] = useState(201);
  const [dosageText, setDosageText] = useState("500mg Twice Daily");

  const [doctors] = useState([
    { id: 1, name: "Dr. Sukanta Hui", spec: "General Medicine", clinic: "Barrackpore" },
    { id: 2, name: "Dr. Susmita Ghosh", spec: "Pediatrics", clinic: "Kolkata" },
  ]);

  const [patients] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [medications] = useState([
    { id: 201, name: "Paracetamol 650mg", brand: "Dolo-650" },
    { id: 202, name: "Amoxicillin 500mg", brand: "Mox-500" },
    { id: 203, name: "Cetirizine 10mg", brand: "Cetzine" },
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { docId: 1, patId: 101, medId: 201, dosage: "650mg TDS", date: "2026-08-24" },
    { docId: 1, patId: 102, medId: 202, dosage: "500mg BD", date: "2026-08-23" },
    { docId: 2, patId: 103, medId: 203, dosage: "10mg OD", date: "2026-08-22" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Degree Simulator Active. Switch tabs to observe Unary (Degree 1), Binary (Degree 2), and Ternary (Degree 3) schema mappings."
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

  const handleAddPrescription = () => {
    const docId = Number(selectedDoctorId);
    const patId = Number(selectedPatientId);
    const medId = Number(selectedMedId);

    const exists = prescriptions.some(
      (p) => p.docId === docId && p.patId === patId && p.medId === medId
    );

    const doc = doctors.find((d) => d.id === docId);
    const pat = patients.find((p) => p.id === patId);
    const med = medications.find((m) => m.id === medId);

    if (exists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '(${docId}, ${patId}, ${medId})' for key 'PRIMARY'. This 3-way ternary association already exists!`
      );
      return;
    }

    const newPresc = {
      docId,
      patId,
      medId,
      dosage: dosageText,
      date: new Date().toISOString().split("T")[0],
    };

    setPrescriptions([...prescriptions, newPresc]);
    setEngineLog(
      `✓ Ternary Association Created: ${doc?.name} prescribed ${med?.name} to ${pat?.name}. Composite PK = (${docId}, ${patId}, ${medId}).`
    );
  };

  const handleReset = () => {
    setPrescriptions([
      { docId: 1, patId: 101, medId: 201, dosage: "650mg TDS", date: "2026-08-24" },
      { docId: 1, patId: 102, medId: 202, dosage: "500mg BD", date: "2026-08-23" },
      { docId: 2, patId: 103, medId: 203, dosage: "10mg OD", date: "2026-08-22" },
    ]);
    setEngineLog("Simulator reset to default state.");
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
            Module 002_002 · ER & EER Modeling · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Relationship Types, Degrees &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Role Names in ER Modeling
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relationship degrees: Unary (Recursive Degree 1 with explicit Role Names), Binary (Degree 2),
            and Ternary (Degree 3) simultaneous associations with 3-way bridge table relational mapping.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Unary (Degree 1) & Roles
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ↔️ Binary (Degree 2) Standard
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔺 Ternary (Degree 3) Triads
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌉 3-Way Bridge Tables
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Relationship Degrees Architecture ───────── */}
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
                Understanding Relationship Degrees & Role Names
              </h2>
              <p className="text-xs text-slate-400">
                Number of participating entity sets and why 3 Binaries do not equal 1 Ternary
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Degree 1 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Degree 1: Unary (Recursive)
              </span>
              <p className="text-xs text-slate-300">
                An entity connects to ITSELF. Requires explicit <strong>Role Names</strong> (e.g. 'Supervisor' vs 'Supervisee').
              </p>
              <div className="text-[11px] text-amber-300 font-bold">Mapping: Self-referencing Foreign Key</div>
            </div>

            {/* Degree 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Degree 2: Binary (Standard)
              </span>
              <p className="text-xs text-slate-300">
                Connects 2 distinct entity sets (e.g. <code>Student</code> and <code>Course</code>). Represents 90%+ of real-world DB models.
              </p>
              <div className="text-[11px] text-cyan-300 font-bold">Mapping: Foreign Key or 2-way Junction</div>
            </div>

            {/* Degree 3 */}
            <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Degree 3: Ternary (3-Way)
              </span>
              <p className="text-xs text-slate-300">
                Connects 3 distinct entity sets simultaneously in a single atomic event (e.g. Doctor prescribes Medication to Patient).
              </p>
              <div className="text-[11px] text-emerald-300 font-bold">Mapping: 3-way Bridge with Composite PK</div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Degrees Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Unary (Degree 1), Binary (Degree 2) & Ternary (Degree 3) in Peter Chen ER Notation
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Relationship Degrees Diagram"
            >
              {/* UNARY */}
              <g transform="translate(20, 20)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="90" y="25" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                  EMPLOYEE
                </text>
                {/* Loop line */}
                <path d="M 180,20 C 230,20 230,80 140,80 L 140,60" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="140,60 136,70 144,70" fill="#f59e0b" />
                <text x="210" y="55" fill="#cbd5e1" fontSize="9">Manages</text>
                <text x="90" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="9">Role: Supervisor / Supervisee</text>
              </g>

              {/* BINARY */}
              <g transform="translate(260, 20)">
                <rect width="80" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="40" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">STUDENT</text>
                
                <polygon points="120,5 155,20 120,35 85,20" fill="#1e293b" stroke="#38bdf8" />
                <text x="120" y="23" fill="#38bdf8" textAnchor="middle" fontSize="8">Enrolls</text>
                
                <rect x="160" y="0" width="80" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="200" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">COURSE</text>
                
                <line x1="80" y1="20" x2="85" y2="20" stroke="#38bdf8" />
                <line x1="155" y1="20" x2="160" y2="20" stroke="#38bdf8" />
                <text x="120" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="9">Binary: 2 Entity Sets</text>
              </g>

              {/* TERNARY */}
              <g transform="translate(540, 20)">
                {/* Doctor */}
                <rect width="65" height="30" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="32" y="18" fill="#10b981" textAnchor="middle" fontSize="8" fontWeight="bold">DOCTOR</text>

                {/* Patient */}
                <rect x="150" y="0" width="65" height="30" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="182" y="18" fill="#10b981" textAnchor="middle" fontSize="8" fontWeight="bold">PATIENT</text>

                {/* Medication */}
                <rect x="75" y="80" width="70" height="30" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="110" y="98" fill="#10b981" textAnchor="middle" fontSize="8" fontWeight="bold">MEDICINE</text>

                {/* Central Diamond */}
                <polygon points="110,25 130,40 110,55 90,40" fill="#1e293b" stroke="#10b981" />
                <text x="110" y="43" fill="#10b981" textAnchor="middle" fontSize="7">Prescribe</text>

                {/* Connecting Lines */}
                <line x1="65" y1="20" x2="90" y2="35" stroke="#10b981" />
                <line x1="150" y1="20" x2="130" y2="35" stroke="#10b981" />
                <line x1="110" y1="55" x2="110" y2="80" stroke="#10b981" />
                <text x="110" y="130" fill="#cbd5e1" textAnchor="middle" fontSize="9">Ternary: 3 Simultaneous Entities</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Degree Sandbox ──────────────── */}
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
                Interactive Relationship Degree Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Explore Unary Self-References, Binary Joins, and live Ternary Prescription 3-Way Bridge Table mapping
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Tab Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDegreeTab("unary")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeDegreeTab === "unary"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Unary (Degree 1 & Roles)
              </button>
              <button
                onClick={() => setActiveDegreeTab("binary")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeDegreeTab === "binary"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Binary (Degree 2 Standard)
              </button>
              <button
                onClick={() => setActiveDegreeTab("ternary")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeDegreeTab === "ternary"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Ternary (Degree 3 Simulator)
              </button>
            </div>

            {/* UNARY TAB */}
            {activeDegreeTab === "unary" && (
              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-5 space-y-3">
                <h3 className="text-sm font-bold text-amber-300">
                  Unary (Recursive Degree 1) - Employee Hierarchy with Role Names
                </h3>
                <p className="text-xs text-slate-400">
                  The <code>employees</code> table relates to itself. <code>manager_id</code> references <code>emp_id</code> in the same table.
                </p>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    manager_id INT NULL, -- Role: Supervisee points to Supervisor
    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id)
        REFERENCES employees(emp_id) ON DELETE SET NULL
) ENGINE=InnoDB;`}
                </pre>
              </div>
            )}

            {/* BINARY TAB */}
            {activeDegreeTab === "binary" && (
              <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-5 space-y-3">
                <h3 className="text-sm font-bold text-cyan-300">
                  Binary (Degree 2) - Standard Student & Course Association
                </h3>
                <p className="text-xs text-slate-400">
                  Two distinct entities connected via an intermediate M:N bridge table.
                </p>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`CREATE TABLE student_enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
                </pre>
              </div>
            )}

            {/* TERNARY TAB */}
            {activeDegreeTab === "ternary" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Controls */}
                  <div className="space-y-3">
                    <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-3.5 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 block">
                        Prescribe 3-Way Association (Doctor + Patient + Medication):
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Doctor:</label>
                          <select
                            value={selectedDoctorId}
                            onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                            className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                          >
                            {doctors.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.name.split(" ")[1]} ({d.clinic})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Patient:</label>
                          <select
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                            className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                          >
                            {patients.map((p) => (
                              <option key={p.id} value={p.id}>
                                #{p.id} ({p.name.split(" ")[0]})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Medication:</label>
                          <select
                            value={selectedMedId}
                            onChange={(e) => setSelectedMedId(Number(e.target.value))}
                            className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                          >
                            {medications.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.brand}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={dosageText}
                        onChange={(e) => setDosageText(e.target.value)}
                        className="w-full rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                        placeholder="Dosage Instructions"
                      />
                      <button
                        onClick={handleAddPrescription}
                        className="w-full py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-all"
                      >
                        ➕ Record 3-Way Prescription
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

                  {/* Live Ternary Bridge Table */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>3-Way Bridge: doctor_patient_prescriptions ({prescriptions.length} rows)</span>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                          <tr>
                            <th className="p-1.5">Composite PK: (doc, pat, med)</th>
                            <th className="p-1.5">Dosage</th>
                            <th className="p-1.5">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                          {prescriptions.map((pr, idx) => (
                            <tr key={idx}>
                              <td className="p-1.5 text-cyan-300 font-bold">
                                (#{pr.docId}, #{pr.patId}, #{pr.medId})
                              </td>
                              <td className="p-1.5 text-emerald-300">{pr.dosage}</td>
                              <td className="p-1.5 text-slate-400">{pr.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                Staff hierarchy (Unary) and multi-specialty clinic prescriptions (Ternary) from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Staff Management (Unary Recursive Degree 1)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Self-referencing foreign key column <code>manager_id</code> with SET NULL on supervisor departure.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    manager_id INT NULL,
    CONSTRAINT fk_emp_mgr FOREIGN KEY (manager_id)
        REFERENCES employees(emp_id) ON DELETE SET NULL
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Multi-Specialty Clinic (Ternary Degree 3)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Healthcare</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Atomic 3-way association connecting Doctor, Patient, and Medication with reverse B-Tree indexing.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE doctor_patient_prescriptions (
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    medication_id INT NOT NULL,
    dosage_instructions VARCHAR(100) NOT NULL,
    PRIMARY KEY (doctor_id, patient_id, medication_id),
    INDEX idx_pat_med (patient_id, medication_id, doctor_id),
    INDEX idx_med_doc (medication_id, doctor_id, patient_id)
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
                Avoid decomposing ternary relationships into 3 disconnected binary links
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
                  <strong className="text-white">1. Splitting Ternary into 3 Binaries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Loses atomic association context (cannot identify which doctor prescribed which pill to which patient).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Missing Role Names on Recursive:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting role labels makes Unary self-relationships ambiguous.
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
                  <strong className="text-white">1. Dedicated 3-Way Bridge Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Map ternary relationships with composite primary keys across all 3 foreign keys.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Permutation B-Tree Indexing:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add reverse indexes <code>(B, C, A)</code> and <code>(C, A, B)</code> to support multi-dimensional queries.
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
              <span>Relationship Degree represents the count of participating entity sets</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Unary (Recursive) links connect an entity to itself and REQUIRE explicit Role Names</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Binary (Degree 2) links connect two entities and represent 90%+ of all relationships</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ternary (Degree 3) links connect 3 entities in a single atomic business event</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Three separate binary relationships CANNOT replace one atomic ternary relationship</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always create permutation reverse indexes on 3-way bridge tables</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Relationship Degrees & Roles – FAQs"
            questions={questions}
            subtitle="Master Unary recursive roles, Binary associations, Ternary 3-way bridge tables, and permutation indexing with 30 comprehensive Q&As"
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
            title="Relationship Types, Degrees (Unary, Binary, Ternary), and Roles in Relationships"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_relationship_degrees_roles_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding relationship degrees separates junior developers from senior database architects! " +
              "In my classes in Barrackpore, I constantly quiz students on the Classic Ternary Fallacy: if Dr. Sukanta treats Mamata, " +
              "and Dr. Sukanta prescribes Paracetamol, and Mamata takes Paracetamol, does that mean Dr. Sukanta prescribed Paracetamol to Mamata? " +
              "No! Another doctor might have prescribed it. Only a true Ternary Relationship (Degree 3) captures the atomic 3-way intersection event. " +
              "Map it to a 3-way bridge table with a composite primary key, add reverse permutation indexes, and your schema will remain semantically pure and blazing fast."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · Relationship Degrees & Roles · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
