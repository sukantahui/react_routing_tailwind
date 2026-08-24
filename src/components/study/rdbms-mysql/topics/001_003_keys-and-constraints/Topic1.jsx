import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – PRIMARY KEY Constraint: Single-Column and Composite Primary Keys
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Primary Key Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [pkMode, setPkMode] = useState("composite"); // "single" vs "composite"
  const [selectedStudent, setSelectedStudent] = useState(101);
  const [selectedCourse, setSelectedCourse] = useState(501);
  const [errorMessage, setErrorMessage] = useState("");

  const [enrollments, setEnrollments] = useState([
    { studentId: 101, studentName: "Mamata Hui", courseId: 501, courseName: "MySQL Fundamentals", fee: "₹15,000.00" },
    { studentId: 101, studentName: "Mamata Hui", courseId: 502, courseName: "Database Architecture", fee: "₹18,500.00" },
    { studentId: 102, studentName: "Abhronila Das", courseId: 501, courseName: "MySQL Fundamentals", fee: "₹15,000.00" },
    { studentId: 103, studentName: "Susmita Ghosh", courseId: 503, courseName: "Query Optimization", fee: "₹20,000.00" },
  ]);

  const studentsList = [
    { id: 101, name: "Mamata Hui" },
    { id: 102, name: "Abhronila Das" },
    { id: 103, name: "Susmita Ghosh" },
    { id: 104, name: "Debangshu Roy" },
  ];

  const coursesList = [
    { id: 501, name: "MySQL Fundamentals" },
    { id: 502, name: "Database Architecture" },
    { id: 503, name: "Query Optimization" },
  ];

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

  const handleAddEnrollment = () => {
    setErrorMessage("");
    const studentObj = studentsList.find((s) => s.id === Number(selectedStudent));
    const courseObj = coursesList.find((c) => c.id === Number(selectedCourse));

    // Check Composite PK uniqueness
    const collision = enrollments.find(
      (e) => e.studentId === studentObj.id && e.courseId === courseObj.id
    );

    if (collision) {
      setErrorMessage(
        `ERROR 1062 (23000): Duplicate entry '(${studentObj.id}, ${courseObj.id})' for key 'PRIMARY'. Composite PK requires (student_id, course_id) to be unique!`
      );
      return;
    }

    setEnrollments([
      ...enrollments,
      {
        studentId: studentObj.id,
        studentName: studentObj.name,
        courseId: courseObj.id,
        courseName: courseObj.name,
        fee: "₹15,000.00",
      },
    ]);
  };

  let generatedDDL = "";
  if (pkMode === "single") {
    generatedDDL = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT,\n    roll_no VARCHAR(20) NOT NULL,\n    first_name VARCHAR(50) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,\n    CONSTRAINT pk_students PRIMARY KEY (student_id)\n) ENGINE=InnoDB;`;
  } else {
    generatedDDL = `CREATE TABLE course_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrollment_date DATE NOT NULL DEFAULT (CURRENT_DATE),\n    -- Composite Primary Key Tuple\n    CONSTRAINT pk_course_enrollments PRIMARY KEY (student_id, course_id)\n) ENGINE=InnoDB;`;
  }

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
            Module 001_003 · Keys & Constraints · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            PRIMARY KEY{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraint Architecture
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master single-column surrogate keys, multi-column composite primary keys in junction tables,
            InnoDB Clustered Index physical disk mechanics, and immutability rules.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Clustered B+Tree Index
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 Composite Primary Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Surrogate vs Natural Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Immutable Row Pointers
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Single vs Composite Keys ────────────────── */}
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
                Single-Column vs Composite Primary Keys
              </h2>
              <p className="text-xs text-slate-400">
                Surrogate key sequences vs multi-part tuple keys in Many-to-Many junction tables
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single PK */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Single-Column Primary Key (Surrogate)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                A single narrow integer attribute uniquely identifies the entire row.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL
);`}
              </pre>
            </div>

            {/* Composite PK */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Composite Primary Key (Multi-Column)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Combines 2+ attributes to enforce uniqueness across relationship pairings.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
{`CREATE TABLE course_enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id)
);`}
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Clustered Index B+Tree Architecture ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: InnoDB Clustered Index (Data Stored Directly in PK Leaf Pages)
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="InnoDB Clustered Index Diagram"
            >
              {/* Root */}
              <g transform="translate(310, 10)">
                <rect width="160" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <text x="80" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Root: Keys [100 | 200]</text>
              </g>

              {/* Connecting Lines */}
              <line x1="340" y1="45" x2="160" y2="75" stroke="#475569" strokeWidth="1.5" />
              <line x1="450" y1="45" x2="620" y2="75" stroke="#475569" strokeWidth="1.5" />

              {/* Leaf Page 1 */}
              <g transform="translate(40, 75)">
                <rect width="240" height="60" rx="6" fill="#1e293b" stroke="#10b981" />
                <text x="120" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">
                  Leaf Page 1 (PK 101 - 103)
                </text>
                <text x="120" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  [101: Mamata Hui | ₹15,000]
                </text>
                <text x="120" y="50" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  [102: Abhronila Das | ₹18,500]
                </text>
              </g>

              {/* Leaf Page 2 */}
              <g transform="translate(500, 75)">
                <rect width="240" height="60" rx="6" fill="#1e293b" stroke="#10b981" />
                <text x="120" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">
                  Leaf Page 2 (PK 104 - 106)
                </text>
                <text x="120" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  [104: Debangshu Roy | ₹20,000]
                </text>
                <text x="120" y="50" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                  [105: Mahima Sengupta | ₹18,500]
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Composite PK Sandbox ───────── */}
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
                Interactive Composite Primary Key Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test inserting student-course combinations and observe how MySQL enforces composite uniqueness
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Primary Key Architecture Pattern:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPkMode("single")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      pkMode === "single"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Single-Column PK
                  </button>
                  <button
                    onClick={() => setPkMode("composite")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      pkMode === "composite"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    Composite PK
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Student:
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {studentsList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Course:
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {coursesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddEnrollment}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>➕</span> Test Composite Primary Key Insert
              </button>

              {errorMessage && (
                <div className="p-3 rounded-lg border border-rose-500/40 bg-rose-500/10 text-xs text-rose-300 font-mono leading-relaxed">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Generated DDL & Live Enrollment Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Table DDL Schema Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Active Enrollments Table (course_enrollments):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">PK Tuple (student_id, course_id)</th>
                        <th className="p-2">Student</th>
                        <th className="p-2">Course</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {enrollments.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400 font-bold">({row.studentId}, {row.courseId})</td>
                          <td className="p-2 font-sans font-medium text-white">{row.studentName}</td>
                          <td className="p-2 font-sans text-indigo-300">{row.courseName}</td>
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
                Primary key designs from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Student-Course Bridge Table
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Bridge</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enforcing that a student can only be registered once per course per semester.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_course_registrations (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester INT NOT NULL DEFAULT 1,
    registration_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    CONSTRAINT pk_registrations PRIMARY KEY (student_id, course_id)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Items Line Item Key
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Composite key formed by order_id and line item sequence number.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_items (
    order_id INT NOT NULL,
    item_sequence_no INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT pk_order_items PRIMARY KEY (order_id, item_sequence_no)
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
                Avoid primary key performance bottlenecks and B+Tree page splitting
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
                  <strong className="text-white">1. Random UUID Clustered Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Random strings cause severe B+Tree leaf page splitting on every insert.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Mutating Primary Key Values:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Updating a PK forces expensive row relocation and triggers cascading FK updates.
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
                  <strong className="text-white">1. Use Narrow Unsigned Integers:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>BIGINT UNSIGNED AUTO_INCREMENT</code> maximizes Buffer Pool RAM density.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit Constraint Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Define <code>CONSTRAINT pk_tablename PRIMARY KEY (...)</code> for maintainability.
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
              <span>Every table must have exactly ONE <code>PRIMARY KEY</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Primary Key strictly enforces <code>NOT NULL</code> and <code>UNIQUE</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>In InnoDB, the Primary Key defines the physical Clustered Index</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Composite Primary Keys combine 2+ columns in Many-to-Many junction tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Prefer narrow surrogate integers (`BIGINT UNSIGNED`) over wide random UUIDs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Primary Key values should be strictly immutable once assigned</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="PRIMARY KEY Constraints – FAQs"
            questions={questions}
            subtitle="Master clustered index mechanics, composite keys, and surrogate key design with 30 comprehensive Q&As"
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
            title="PRIMARY KEY Constraint: Single-Column and Composite Primary Keys"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_primary_key_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In MySQL InnoDB, the Primary Key is not just a constraint—it is the physical skeleton of your table. " +
              "In my classes in Barrackpore, I teach students that every secondary index in your table stores a copy of the " +
              "Primary Key value to find the row. If you choose a massive 36-character string UUID as your primary key, all " +
              "your secondary indexes will bloat, consuming gigabytes of precious RAM and evicting cached pages. " +
              "Always choose a compact `BIGINT UNSIGNED AUTO_INCREMENT` for surrogate keys, and use Composite Primary Keys " +
              "for Many-to-Many junction tables to guarantee clean, high-performance database architectures."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · PRIMARY KEY Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
