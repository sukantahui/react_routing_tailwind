import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Many-to-Many (M:N) Relationship: Need for Bridge / Junction Tables
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive M:N Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [selectedStudentId, setSelectedStudentId] = useState(101);
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [gradeInput, setGradeInput] = useState("A");
  const [engineResponse, setEngineResponse] = useState(
    "Select a Student and a Course to create an M:N Junction Enrollment."
  );

  const studentsList = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata" },
    { id: 104, name: "Debangshu Roy", city: "Ichapur" },
  ];

  const coursesList = [
    { id: 1, title: "RDBMS & MySQL Masterclass", fee: 15000 },
    { id: 2, title: "React 19 & Tailwind Fullstack", fee: 12000 },
    { id: 3, title: "Python & Data Science", fee: 18000 },
    { id: 4, title: "GST & Direct Taxation Accounting", fee: 10000 },
  ];

  const [enrollments, setEnrollments] = useState([
    { studentId: 101, courseId: 1, grade: "A+", enrolledAt: "2026-09-01" },
    { studentId: 101, courseId: 2, grade: "A", enrolledAt: "2026-09-02" },
    { studentId: 102, courseId: 1, grade: "A", enrolledAt: "2026-09-01" },
    { studentId: 103, courseId: 3, grade: "B+", enrolledAt: "2026-09-03" },
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

  const handleEnroll = () => {
    const sid = Number(selectedStudentId);
    const cid = Number(selectedCourseId);

    // Check duplicate
    const exists = enrollments.some((e) => e.studentId === sid && e.courseId === cid);
    const student = studentsList.find((s) => s.id === sid);
    const course = coursesList.find((c) => c.id === cid);

    if (exists) {
      setEngineResponse(
        `❌ ERROR 1062 (23000): Duplicate entry '(${sid}, ${cid})' for key 'PRIMARY'. Student #${sid} (${student?.name}) is already enrolled in Course #${cid} (${course?.title})!`
      );
    } else {
      const newEntry = {
        studentId: sid,
        courseId: cid,
        grade: gradeInput,
        enrolledAt: new Date().toISOString().split("T")[0],
      };
      setEnrollments([...enrollments, newEntry]);
      setEngineResponse(
        `✓ Query OK, 1 row affected. Successfully created Junction row: Student #${sid} (${student?.name}) enrolled in '${course?.title}' with grade '${gradeInput}'.`
      );
    }
  };

  const handleDropEnrollment = (sid, cid) => {
    setEnrollments(enrollments.filter((e) => !(e.studentId === sid && e.courseId === cid)));
    setEngineResponse(
      `✓ Executed: DELETE FROM student_courses WHERE student_id = ${sid} AND course_id = ${cid}; Removed junction record without altering master student or course entities.`
    );
  };

  const handleReset = () => {
    setEnrollments([
      { studentId: 101, courseId: 1, grade: "A+", enrolledAt: "2026-09-01" },
      { studentId: 101, courseId: 2, grade: "A", enrolledAt: "2026-09-02" },
      { studentId: 102, courseId: 1, grade: "A", enrolledAt: "2026-09-01" },
      { studentId: 103, courseId: 3, grade: "B+", enrolledAt: "2026-09-03" },
    ]);
    setEngineResponse("Simulator reset to initial state.");
  };

  const ddlSnippet = `-- Master Table A (Students)\nCREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\n-- Master Table B (Courses)\nCREATE TABLE courses (\n    course_id INT AUTO_INCREMENT PRIMARY KEY,\n    course_title VARCHAR(100) NOT NULL,\n    course_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00\n) ENGINE=InnoDB;\n\n-- Bridge / Junction Table\nCREATE TABLE student_courses (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    grade VARCHAR(2) NOT NULL DEFAULT 'A',\n    enrolled_at DATE NOT NULL,\n    PRIMARY KEY (student_id, course_id), -- Composite PK\n    CONSTRAINT fk_sc_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE,\n    CONSTRAINT fk_sc_course FOREIGN KEY (course_id)\n        REFERENCES courses(course_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 3
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Many-to-Many (M:N){" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Bridge & Junction Tables
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational M:N decomposition into two 1:N links, Composite Primary Key design,
            relationship payload attributes, reverse B-Tree indexing, and 2-JOIN querying.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌉 Bridge / Junction Tables
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Composite Primary Key (PK)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Relationship Payload Data
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 2-JOIN Query Traversal
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Decomposition Mechanics ─────────────────── */}
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
                How Junction Tables Decompose M:N into Two 1:N Links
              </h2>
              <p className="text-xs text-slate-400">
                Overcoming single-scalar foreign key limitations while maintaining 1NF purity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Direct M:N Limitation */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                ❌ Direct M:N is Impossible in RDBMS
              </span>
              <p className="text-xs text-slate-400 mb-2">
                A single foreign key cell cannot hold multiple IDs without violating 1NF atomic rules.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                -- IMPOSSIBLE IN SQL
                students (1) &lt;═══════&gt; (N) courses
              </pre>
            </div>

            {/* Decomposed Pattern */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                ✓ Junction Table Decomposition
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Converts one M:N link into two 1:N parent-to-child links with a Composite Primary Key.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                students (1) ───&lt; (N) student_courses (N) &gt;─── (1) courses
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: M:N Decomposition Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Bridge Table Architecture Connecting Two Master Entities
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="M:N Bridge Table Flow"
            >
              {/* Students (1) */}
              <g transform="translate(30, 20)">
                <rect width="210" height="100" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="105" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Master A: students (1)
                </text>
                <line x1="10" y1="34" x2="200" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">🔑 student_id = 101</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">🔑 student_id = 102</text>
                <text x="20" y="94" fill="#cbd5e1" fontSize="10">🔑 student_id = 103</text>
              </g>

              {/* Junction (N) */}
              <g transform="translate(280, 20)">
                <rect width="220" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="110" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Junction: student_courses (N)
                </text>
                <line x1="10" y1="34" x2="210" y2="34" stroke="#334155" />
                <text x="15" y="54" fill="#cbd5e1" fontSize="10">🔗 (101, 1) ➔ Grade: A+</text>
                <text x="15" y="74" fill="#cbd5e1" fontSize="10">🔗 (101, 2) ➔ Grade: A</text>
                <text x="15" y="94" fill="#cbd5e1" fontSize="10">🔗 (102, 1) ➔ Grade: A</text>
              </g>

              {/* Courses (1) */}
              <g transform="translate(540, 20)">
                <rect width="210" height="100" rx="8" fill="#1e293b" stroke="#818cf8" />
                <text x="105" y="24" fill="#818cf8" textAnchor="middle" fontWeight="bold">
                  Master B: courses (1)
                </text>
                <line x1="10" y1="34" x2="200" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">🔑 course_id = 1 (MySQL)</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">🔑 course_id = 2 (React)</text>
                <text x="20" y="94" fill="#cbd5e1" fontSize="10">🔑 course_id = 3 (Python)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive M:N Sandbox ──────────────────── */}
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
                Interactive M:N Enrollment Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Enroll students into courses, observe composite primary key duplication protection, and manage links
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Student:
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {studentsList.map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.id} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Select Course:
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {coursesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.id} - {c.title} (₹{c.fee.toLocaleString("en-IN")})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Expected Grade (Payload Attribute):
                </label>
                <select
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                >
                  {["A+", "A", "B+", "B", "Audit"].map((g) => (
                    <option key={g} value={g}>
                      Grade: {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleEnroll}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>📝</span> Enroll Student in Course
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
            </div>

            {/* Schema DDL & Live Junction Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Relational DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  {ddlSnippet}
                </pre>
              </div>

              {/* Live Junction Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Junction Table: student_courses ({enrollments.length} active links)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Student Name</th>
                        <th className="p-2">Course Title</th>
                        <th className="p-2">Grade</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {enrollments.map((e, idx) => {
                        const student = studentsList.find((s) => s.id === e.studentId);
                        const course = coursesList.find((c) => c.id === e.courseId);
                        return (
                          <tr key={idx} className="hover:bg-slate-800/40">
                            <td className="p-2 font-sans font-medium text-white">{student?.name}</td>
                            <td className="p-2 text-cyan-300">{course?.title}</td>
                            <td className="p-2 text-amber-400 font-bold">{e.grade}</td>
                            <td className="p-2">
                              <button
                                onClick={() => handleDropEnrollment(e.studentId, e.courseId)}
                                className="text-[10px] text-rose-400 hover:text-rose-300 underline font-sans"
                              >
                                Drop Link
                              </button>
                            </td>
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
                Course enrollments and e-commerce order line item schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Multi-Course Enrollment System
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                A student enrolls in multiple courses simultaneously; courses enroll multiple students.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade VARCHAR(2) NOT NULL DEFAULT 'A',
    enrolled_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Line Items Bridge Table
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                1 Order has many Products; 1 Product is bought in many Orders. Storing historical unit price.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE order_items (
    order_id BIGINT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price_at_purchase DECIMAL(10, 2) NOT NULL, -- Historical Snapshot
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES customer_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
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
                Avoid Cartesian join explosions and missing reverse B-Tree indexes
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
                  <strong className="text-white">1. Forgetting Reverse Index:</strong>
                  <p className="text-slate-400 mt-0.5">
                    PK on <code>(student_id, course_id)</code> cannot optimize queries looking up by <code>course_id</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Missing JOIN Conditions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting the second ON predicate creates an explosive Cartesian product ($N \times M$).
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
                  <strong className="text-white">1. Create Reverse Secondary Index:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add <code>CREATE INDEX idx_rev ON junction(course_id, student_id)</code> for fast 2-way lookups.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Historical Price Snapshots:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store prices at purchase time in the junction table to preserve historical accounting truth.
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
              <span>Many-to-Many relationships REQUIRE a dedicated Bridge/Junction Table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use a Composite Primary Key <code>(id_a, id_b)</code> to prevent duplicate associations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Querying across M:N entities requires TWO <code>JOIN</code> operations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Add a reverse secondary index on <code>(id_b, id_a)</code> for reverse lookup speed</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Store relationship attributes (date, price, grade) in the junction table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DELETE CASCADE</code> on junction FKs to automatically clean up links</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Many-to-Many (M:N) Relationships – FAQs"
            questions={questions}
            subtitle="Master Bridge/Junction tables, Composite Primary Keys, and 2-JOIN querying with 30 comprehensive Q&As"
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
            title="Many-to-Many (M:N) Relationship: Need for Bridge / Junction Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_many_to_many_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Many-to-Many relationships are where relational theory shows its true mathematical elegance! " +
              "In my classes in Barrackpore, I teach students that a Junction table is not an inconvenient chore — it is an " +
              "opportunity to capture rich business events. When a student enrolls in a course, that enrollment has its own date, " +
              "its own grade, and its own tuition fee receipt. Storing these payload attributes in the junction table creates a clean, " +
              "normalized schema that scales to millions of users without data duplication or anomalies."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · M:N Relationships · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
