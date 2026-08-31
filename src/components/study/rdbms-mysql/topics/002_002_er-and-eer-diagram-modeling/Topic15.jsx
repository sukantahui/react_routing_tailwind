import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Step-by-Step Mapping: M:N Binary Relationships & n-ary Relationships
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Step 5 Bridge Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic15 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [activeTab, setActiveTab] = useState("binary"); // "binary" | "ternary"

  // Binary M:N State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [gradeInput, setGradeInput] = useState("A+");

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [courses] = useState([
    { id: 1, title: "RDBMS & MySQL Masterclass", fee: 15000 },
    { id: 2, title: "React 19 & Tailwind Full-Stack", fee: 18500 },
    { id: 3, title: "Node.js & Express Cloud APIs", fee: 12000 },
  ]);

  const [enrollments, setEnrollments] = useState([
    { studentId: 101, courseId: 1, date: "2026-08-01", grade: "A+" },
    { studentId: 101, courseId: 2, date: "2026-08-10", grade: "A" },
    { studentId: 102, courseId: 1, date: "2026-08-15", grade: "A+" },
    { studentId: 103, courseId: 3, date: "2026-08-20", grade: "B+" },
  ]);

  // Ternary 3-Way State
  const [selectedDocId, setSelectedDocId] = useState(1);
  const [selectedPatId, setSelectedPatId] = useState(101);
  const [selectedMedId, setSelectedMedId] = useState(501);
  const [dosage, setDosage] = useState("1 tablet twice daily after meals");

  const [prescriptions, setPrescriptions] = useState([
    { docId: 1, patId: 101, medId: 501, dosage: "1 tablet after meals", date: "2026-08-24" },
    { docId: 2, patId: 102, medId: 502, dosage: "5ml syrup before sleep", date: "2026-08-23" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Step 5 Simulator Active. Test creating M:N bridge links or observe duplicate Composite PK error 1062."
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

  const handleEnroll = () => {
    const sid = Number(selectedStudentId);
    const cid = Number(selectedCourseId);
    const exists = enrollments.some((e) => e.studentId === sid && e.courseId === cid);
    const st = students.find((s) => s.id === sid);
    const co = courses.find((c) => c.id === cid);

    if (exists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '${sid}-${cid}' for key 'PRIMARY'. ${st?.name} is already enrolled in '${co?.title}'!`
      );
      return;
    }

    setEnrollments([...enrollments, { studentId: sid, courseId: cid, date: "2026-08-24", grade: gradeInput }]);
    setEngineLog(
      `✓ Step 5 Bridge Created: Enrolled ${st?.name} into '${co?.title}' with grade '${gradeInput}'. Composite PK (${sid}, ${cid}) inserted.`
    );
  };

  const handlePrescribe = () => {
    const dId = Number(selectedDocId);
    const pId = Number(selectedPatId);
    const mId = Number(selectedMedId);

    const exists = prescriptions.some(
      (p) => p.docId === dId && p.patId === pId && p.medId === mId
    );
    if (exists) {
      setEngineLog(`❌ ERROR 1062: Duplicate 3-way composite key (${dId}, ${pId}, ${mId}) in prescriptions!`);
      return;
    }

    setPrescriptions([...prescriptions, { docId: dId, patId: pId, medId: mId, dosage, date: "2026-08-24" }]);
    setEngineLog(
      `✓ Step 5 Ternary Link: Inserted 3-way prescription (Doctor #${dId}, Patient #${pId}, Medicine #${mId}) into prescriptions table.`
    );
  };

  const handleDeleteEnrollment = (sid, cid) => {
    setEnrollments(enrollments.filter((e) => !(e.studentId === sid && e.courseId === cid)));
    setEngineLog(`✓ Dropped Bridge Link: Removed enrollment record (${sid}, ${cid}). Parent tables remain intact!`);
  };

  const handleReset = () => {
    setEnrollments([
      { studentId: 101, courseId: 1, date: "2026-08-01", grade: "A+" },
      { studentId: 101, courseId: 2, date: "2026-08-10", grade: "A" },
      { studentId: 102, courseId: 1, date: "2026-08-15", grade: "A+" },
      { studentId: 103, courseId: 3, date: "2026-08-20", grade: "B+" },
    ]);
    setPrescriptions([
      { docId: 1, patId: 101, medId: 501, dosage: "1 tablet after meals", date: "2026-08-24" },
      { docId: 2, patId: 102, medId: 502, dosage: "5ml syrup before sleep", date: "2026-08-23" },
    ]);
    setEngineLog("Simulator reset to default state.");
  };

  const ddlSnippet = `-- Step 5: Binary M:N Bridge Table\nCREATE TABLE student_course_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_date DATE NOT NULL DEFAULT (CURRENT_DATE),\n    final_grade CHAR(2) NULL,\n    PRIMARY KEY (student_id, course_id),\n    -- Explicit secondary index for reverse lookups by course_id\n    INDEX idx_course (course_id),\n    CONSTRAINT fk_enr_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE,\n    CONSTRAINT fk_enr_course FOREIGN KEY (course_id)\n        REFERENCES courses(course_id) ON DELETE CASCADE\n) ENGINE=InnoDB;\n\n-- Step 5: Ternary 3-Way Relationship Table\nCREATE TABLE prescriptions (\n    doctor_id INT NOT NULL,\n    patient_id INT NOT NULL,\n    medicine_id INT NOT NULL,\n    dosage VARCHAR(100) NOT NULL,\n    prescribed_at DATE NOT NULL DEFAULT (CURRENT_DATE),\n    PRIMARY KEY (doctor_id, patient_id, medicine_id),\n    CONSTRAINT fk_presc_doc FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,\n    CONSTRAINT fk_presc_pat FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,\n    CONSTRAINT fk_presc_med FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_002 · ER & EER Modeling · Topic 15
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            ER-to-Relational Mapping:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Step 5 – M:N & n-ary Bridge Tables
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Step 5 of the mapping algorithm: constructing dedicated Bridge/Junction tables for Many-to-Many (M:N)
            and higher-degree n-ary relationships, composite primary keys, reverse indexing, and cascading referential integrity.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌉 Dedicated Bridge / Junction Tables
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Composite Primary Keys (A_id, B_id)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Ternary & n-ary Relationship Tables
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Reverse B-Tree Index Optimization
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Step 5 Bridge Architecture ──────────────── */}
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
                Step 5: Bridge / Junction Table Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Why Many-to-Many relationships must be decomposed into two 1:N foreign key links
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Binary M:N Bridge
              </span>
              <p className="text-xs text-slate-300">
                Contains FKs of both entities as a Composite PK: <code>PRIMARY KEY (student_id, course_id)</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                2. Descriptive Attributes
              </span>
              <p className="text-xs text-slate-300">
                Attributes describing the link (<code>enrolled_date</code>, <code>final_grade</code>) belong directly in the bridge table.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                3. Ternary & n-ary
              </span>
              <p className="text-xs text-slate-300">
                Composite PK spans all $n$ participating entity foreign keys (e.g. <code>doctor_id</code>, <code>patient_id</code>, <code>medicine_id</code>).
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: M:N Bridge Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Binary M:N Decomposed into Two 1:N Links via Bridge Table
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="M:N Bridge Schema Flow"
            >
              {/* Students Table */}
              <g transform="translate(30, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="90" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">students (1)</text>
                <text x="12" y="42" fill="#10b981" fontWeight="bold">PK: student_id INT</text>
                <text x="12" y="62" fill="#cbd5e1">full_name : VARCHAR</text>
              </g>

              {/* Connecting Line 1 */}
              <line x1="210" y1="65" x2="280" y2="65" stroke="#64748b" strokeWidth="2" />
              <text x="245" y="55" fill="#f59e0b" fontSize="10" textAnchor="middle">1 : N</text>

              {/* Bridge Table */}
              <g transform="translate(280, 10)">
                <rect width="220" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="110" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">student_course_enrollments</text>
                <text x="12" y="40" fill="#38bdf8" fontWeight="bold">PK,FK1: student_id INT</text>
                <text x="12" y="58" fill="#10b981" fontWeight="bold">PK,FK2: course_id INT</text>
                <text x="12" y="76" fill="#cbd5e1">enrolled_date : DATE</text>
                <text x="12" y="94" fill="#cbd5e1">final_grade : CHAR(2)</text>
              </g>

              {/* Connecting Line 2 */}
              <line x1="500" y1="65" x2="570" y2="65" stroke="#64748b" strokeWidth="2" />
              <text x="535" y="55" fill="#f59e0b" fontSize="10" textAnchor="middle">N : 1</text>

              {/* Courses Table */}
              <g transform="translate(570, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">courses (1)</text>
                <text x="12" y="42" fill="#38bdf8" fontWeight="bold">PK: course_id INT</text>
                <text x="12" y="62" fill="#cbd5e1">course_title : VARCHAR</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Step 5 Sandbox ──────────────── */}
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
                Interactive Step 5 Mapping Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Enroll students across multiple courses or prescribe medicines across 3-way ternary links
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("binary")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeTab === "binary"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                Binary M:N: Student Course Enrollments
              </button>
              <button
                onClick={() => setActiveTab("ternary")}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeTab === "ternary"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                Ternary 3-Way: Doctor-Patient Prescriptions
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                {activeTab === "binary" && (
                  <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-3.5 space-y-2">
                    <span className="text-xs font-bold text-amber-400 block">
                      Insert into M:N Bridge Table:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name.split(" ")[0]} (#{s.id})
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title.split(" ")[0]} (#{c.id})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={gradeInput}
                        onChange={(e) => setGradeInput(e.target.value)}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        placeholder="Grade"
                      />
                    </div>
                    <button
                      onClick={handleEnroll}
                      className="w-full py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all"
                    >
                      ⚡ Insert Bridge Association
                    </button>
                  </div>
                )}

                {activeTab === "ternary" && (
                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-3.5 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 block">
                      Insert into Ternary Prescriptions Table:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={selectedDocId}
                        onChange={(e) => setSelectedDocId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value={1}>Dr. Sukanta (#1)</option>
                        <option value={2}>Dr. Debangshu (#2)</option>
                      </select>
                      <select
                        value={selectedPatId}
                        onChange={(e) => setSelectedPatId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value={101}>Mamata (#101)</option>
                        <option value={102}>Abhronila (#102)</option>
                      </select>
                      <select
                        value={selectedMedId}
                        onChange={(e) => setSelectedMedId(Number(e.target.value))}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value={501}>Paracetamol (#501)</option>
                        <option value={502}>Amoxicillin (#502)</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Dosage Instructions"
                    />
                    <button
                      onClick={handlePrescribe}
                      className="w-full py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                    >
                      ⚡ Insert 3-Way Ternary Link
                    </button>
                  </div>
                )}

                {activeTab === "binary" && (
                  <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-3 space-y-2">
                    <span className="text-xs font-bold text-rose-400 block">
                      Drop Specific Bridge Row:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {enrollments.map((en) => {
                        const st = students.find((s) => s.id === en.studentId);
                        const co = courses.find((c) => c.id === en.courseId);
                        return (
                          <button
                            key={`${en.studentId}-${en.courseId}`}
                            onClick={() => handleDeleteEnrollment(en.studentId, en.courseId)}
                            className="py-1 px-2.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                          >
                            Drop ({st?.name.split(" ")[0]} ➔ {co?.title.split(" ")[0]})
                          </button>
                        );
                      })}
                    </div>
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

              {/* DDL & Live Table */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                    Generated Step 5 DDL:
                  </span>
                  <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                    {ddlSnippet}
                  </pre>
                </div>

                {/* Active Live Bridge Table */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    {activeTab === "binary" ? (
                      <span>student_course_enrollments ({enrollments.length} rows)</span>
                    ) : (
                      <span>prescriptions ({prescriptions.length} rows)</span>
                    )}
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {activeTab === "binary" ? (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Composite PK (student, course)</th>
                              <th className="p-1.5">Date</th>
                              <th className="p-1.5">Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {enrollments.map((en, idx) => {
                              const st = students.find((s) => s.id === en.studentId);
                              const co = courses.find((c) => c.id === en.courseId);
                              return (
                                <tr key={idx}>
                                  <td className="p-1.5 text-cyan-300 font-bold">
                                    ({st?.name.split(" ")[0]}, {co?.title.split(" ")[0]})
                                  </td>
                                  <td className="p-1.5 text-slate-400">{en.date}</td>
                                  <td className="p-1.5 text-emerald-300 font-bold">{en.grade}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <>
                          <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-1.5">Ternary PK (Doc, Pat, Med)</th>
                              <th className="p-1.5">Dosage</th>
                              <th className="p-1.5">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {prescriptions.map((pr, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-cyan-300 font-bold">
                                  (Doc #{pr.docId}, Pat #{pr.patId}, Med #{pr.medId})
                                </td>
                                <td className="p-1.5 text-slate-300">{pr.dosage}</td>
                                <td className="p-1.5 text-slate-400">{pr.date}</td>
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
                Academy course enrollments and hospital pharmacy prescriptions from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Student Course Enrollments (Binary M:N)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Junction table with composite primary key and reverse index for course-based queries.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_course_enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    final_grade CHAR(2) NULL,
    PRIMARY KEY (student_id, course_id),
    INDEX idx_course (course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Hospital Prescriptions (Ternary 3-Way)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Hospital</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ternary table joining Doctor, Patient, and Medicine with 3 foreign keys and composite PK.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE prescriptions (
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    medicine_id INT NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    PRIMARY KEY (doctor_id, patient_id, medicine_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id) ON DELETE CASCADE
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
                Avoid surrogate keys without UNIQUE constraints and missing reverse index lookups
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
                  <strong className="text-white">1. Surrogate PK without UNIQUE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>id AUTO_INCREMENT</code> without <code>UNIQUE(student_id, course_id)</code> allows duplicate enrollments.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Missing Reverse Index on 2nd Column:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Querying by <code>course_id</code> forces full table scans unless an index <code>INDEX(course_id)</code> is created.
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
                  <strong className="text-white">1. Composite Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>PRIMARY KEY (student_id, course_id)</code> for automatic uniqueness and compact storage.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. ON DELETE CASCADE across all FKs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure dropping any parent entity automatically purges its matching junction rows.
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
              <span>Step 5 creates a dedicated Bridge/Junction table for every M:N relationship</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The Primary Key is the Composite Key of both entity Foreign Keys `(A_id, B_id)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Descriptive attributes of the relationship belong directly in the bridge table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always add a secondary index on the SECOND column for reverse lookups</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Higher-degree n-ary relationships use composite PK of all n foreign keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Configure `ON DELETE CASCADE` across all foreign keys in the junction table</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Step 5: M:N and n-ary Mapping – FAQs"
            questions={questions}
            subtitle="Master Step 5 of the ER-to-Relational mapping algorithm, bridge/junction tables, composite primary keys, reverse indexes, and n-ary relationships with 30 comprehensive Q&As"
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
            title="Step-by-Step Mapping: M:N Binary Relationships (Bridge/Junction Tables) and n-ary Relationships"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic15_step5_mn_junction_mapping_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Bridge tables are the workhorses of relational databases! " +
              "In my classes in Barrackpore, I teach students the Leftmost Index Trap: " +
              "When you create `PRIMARY KEY (student_id, course_id)`, MySQL InnoDB builds a clustered B-Tree index sorted by `student_id` first. " +
              "Finding all courses for student #101 is instant. But finding all students in course #1 requires scanning the entire table! " +
              "Always add an explicit secondary index: `INDEX idx_course (course_id)`. " +
              "With that one simple index, queries in BOTH directions will execute with sub-millisecond B-Tree speed."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 15 · Step 5 M:N Mapping · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic15;
