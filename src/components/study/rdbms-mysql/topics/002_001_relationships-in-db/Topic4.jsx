import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Composite Primary Keys in Junction Tables
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Composite PK Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [studentId, setStudentId] = useState(101);
  const [courseId, setCourseId] = useState(1);
  const [grade, setGrade] = useState("A+");
  const [hasReverseIndex, setHasReverseIndex] = useState(true);
  const [queryMode, setQueryMode] = useState("by_student"); // "by_student" vs "by_course"
  const [engineLog, setEngineLog] = useState(
    "Configure inputs and test Composite Primary Key insertion, B-Tree index seeks, or duplicate collisions."
  );

  const studentsList = [
    { id: 101, name: "Mamata Hui" },
    { id: 102, name: "Abhronila Das" },
    { id: 103, name: "Susmita Ghosh" },
  ];

  const coursesList = [
    { id: 1, title: "RDBMS MySQL" },
    { id: 2, title: "React Fullstack" },
    { id: 3, title: "Data Science" },
  ];

  const [records, setRecords] = useState([
    { studentId: 101, courseId: 1, grade: "A+", enrolledAt: "2026-09-01" },
    { studentId: 101, courseId: 2, grade: "A", enrolledAt: "2026-09-02" },
    { studentId: 102, courseId: 1, grade: "A", enrolledAt: "2026-09-01" },
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

  const handleInsert = () => {
    const sid = Number(studentId);
    const cid = Number(courseId);
    const exists = records.some((r) => r.studentId === sid && r.courseId === cid);

    if (exists) {
      setEngineLog(
        `❌ ERROR 1062 (23000): Duplicate entry '(${sid}, ${cid})' for key 'PRIMARY'. Composite PK strictly prohibits duplicate enrollment tuples!`
      );
    } else {
      const newRec = {
        studentId: sid,
        courseId: cid,
        grade,
        enrolledAt: new Date().toISOString().split("T")[0],
      };
      setRecords([...records, newRec]);
      setEngineLog(
        `✓ Query OK, 1 row affected (0.01 sec). Inserted tuple (${sid}, ${cid}) into PRIMARY KEY clustered B-Tree page!`
      );
    }
  };

  const handleUpsert = () => {
    const sid = Number(studentId);
    const cid = Number(courseId);
    const exists = records.some((r) => r.studentId === sid && r.courseId === cid);

    if (exists) {
      setRecords(
        records.map((r) => (r.studentId === sid && r.courseId === cid ? { ...r, grade } : r))
      );
      setEngineLog(
        `✓ INSERT ... ON DUPLICATE KEY UPDATE: Tuple (${sid}, ${cid}) already existed; updated grade to '${grade}' in-place!`
      );
    } else {
      handleInsert();
    }
  };

  const handleSimulateQuery = () => {
    if (queryMode === "by_student") {
      setEngineLog(
        `✓ EXPLAIN SELECT * FROM student_courses WHERE student_id = ${studentId};\n➔ Result: type: ref | key: PRIMARY (Leftmost Prefix Match) | rows: ${
          records.filter((r) => r.studentId === Number(studentId)).length
        } | Extra: Using index`
      );
    } else {
      if (hasReverseIndex) {
        setEngineLog(
          `✓ EXPLAIN SELECT * FROM student_courses WHERE course_id = ${courseId};\n➔ Result: type: ref | key: idx_reverse_course_student (Secondary Reverse Index) | rows: ${
            records.filter((r) => r.courseId === Number(courseId)).length
          } | Extra: Using index`
        );
      } else {
        setEngineLog(
          `⚠️ EXPLAIN SELECT * FROM student_courses WHERE course_id = ${courseId};\n➔ Result: type: ALL (FULL TABLE SCAN!) | key: NULL (Leftmost prefix rule failed because course_id is 2nd in PK!)`
        );
      }
    }
  };

  const handleReset = () => {
    setRecords([
      { studentId: 101, courseId: 1, grade: "A+", enrolledAt: "2026-09-01" },
      { studentId: 101, courseId: 2, grade: "A", enrolledAt: "2026-09-02" },
      { studentId: 102, courseId: 1, grade: "A", enrolledAt: "2026-09-01" },
    ]);
    setHasReverseIndex(true);
    setEngineLog("Simulator reset to initial state.");
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
            Module 002_001 · Relationships in DB · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Composite Primary Keys in{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Junction Tables
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master multi-column clustered indexing in InnoDB, the B-Tree Leftmost Prefix Rule,
            the critical necessity of Secondary Reverse Indexes, and idempotent upserts (<code>ON DUPLICATE KEY UPDATE</code>).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 PRIMARY KEY (id_a, id_b)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Leftmost Prefix Optimization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Secondary Reverse Index
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Clustered Storage Density
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Leftmost Prefix Mechanics ───────────────── */}
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
                The B-Tree Leftmost Prefix Rule & The Reverse Index
              </h2>
              <p className="text-xs text-slate-400">
                Why `PRIMARY KEY (A, B)` requires a reverse index on `(B, A)` for two-way performance
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Forward PK */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Forward Clustered PK: (student_id, course_id)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Fast index seek when querying by <code>student_id</code> or <code>(student_id AND course_id)</code>.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                -- USES CLUSTERED PK INDEX (ref)
                SELECT * FROM student_courses WHERE student_id = 101;
              </pre>
            </div>

            {/* Reverse Index */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Reverse Secondary Index: (course_id, student_id)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Fast index seek when querying by <code>course_id</code> (prevents full table scan!).
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                -- USES SECONDARY REVERSE INDEX (ref)
                SELECT * FROM student_courses WHERE course_id = 1;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Leftmost Prefix Tree ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: B-Tree Leftmost Prefix Matching & Reverse Index Seeks
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Leftmost Prefix B-Tree Diagram"
            >
              {/* Query 1 */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ✓ Query WHERE student_id = 101
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Matches 1st leading column of PK (student_id, course_id)</text>
                <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">⚡ Ultra-fast B-Tree Index Seek (0ms)</text>
              </g>

              {/* Query 2 */}
              <g transform="translate(410, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="170" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  ✓ Query WHERE course_id = 1
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• With Reverse Index: Uses idx_reverse (0ms Seek)</text>
                <text x="20" y="74" fill="#f59e0b" fontWeight="bold" fontSize="10">⚠️ Without Reverse Index: Slow Full Table Scan (ALL)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Composite PK Sandbox ────────── */}
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
                Interactive Composite PK & EXPLAIN Index Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Test composite primary key duplicate protection, upserts, and inspect EXPLAIN index seek plans
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Student ID:
                  </label>
                  <select
                    value={studentId}
                    onChange={(e) => setStudentId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {studentsList.map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.id} ({s.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Course ID:
                  </label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {coursesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.id} ({c.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Grade:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    {["A+", "A", "B+", "B", "Audit"].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleInsert}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1"
                >
                  <span>➕</span> Standard INSERT
                </button>
                <button
                  onClick={handleUpsert}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1"
                >
                  <span>🔄</span> Upsert (ON DUPLICATE)
                </button>
              </div>

              {/* EXPLAIN Query Tester */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  EXPLAIN Query Plan Tester:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setQueryMode("by_student")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold border transition-all",
                      queryMode === "by_student"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    )}
                  >
                    WHERE student_id = {studentId}
                  </button>
                  <button
                    onClick={() => setQueryMode("by_course")}
                    className={clsx(
                      "flex-1 py-1.5 rounded text-xs font-bold border transition-all",
                      queryMode === "by_course"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    )}
                  >
                    WHERE course_id = {courseId}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReverseIndex}
                      onChange={(e) => setHasReverseIndex(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-900 text-teal-500 focus:ring-0"
                    />
                    <span>Include Secondary Reverse Index</span>
                  </label>
                  <button
                    onClick={handleSimulateQuery}
                    className="py-1 px-3 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold hover:bg-indigo-500/30"
                  >
                    Run EXPLAIN
                  </button>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution & EXPLAIN Output:
                </span>
                <pre className="whitespace-pre-wrap">{engineLog}</pre>
              </div>
            </div>

            {/* Live Junction Table & DDL */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Composite Primary Key DDL:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
{`CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade VARCHAR(2) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    ${hasReverseIndex ? "INDEX idx_reverse (course_id, student_id)" : "-- No reverse index (Slow full table scan!)"}
) ENGINE=InnoDB;`}
                </pre>
              </div>

              {/* Records */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Clustered Rows: student_courses ({records.length} records)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Composite Key (student_id, course_id)</th>
                        <th className="p-2">Grade</th>
                        <th className="p-2">Enrolled Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {records.map((r, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-300 font-bold">
                            ({r.studentId}, {r.courseId})
                          </td>
                          <td className="p-2 text-amber-400 font-bold">{r.grade}</td>
                          <td className="p-2 text-slate-400">{r.enrolledAt}</td>
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
                Skill matrix and e-commerce shopping cart schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Skill Certification Matrix
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Skills</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Composite PK on (student_id, skill_code) with secondary reverse index for skill lookups.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_skills (
    student_id INT NOT NULL,
    skill_code VARCHAR(20) NOT NULL,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Expert') NOT NULL DEFAULT 'Intermediate',
    certified_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (student_id, skill_code),
    INDEX idx_skill_lookup (skill_code, student_id) -- Critical Reverse Index!
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Cart Items Clustered Layout
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Clustering cart items physically by cart_id so entire customer carts load in a single I/O page read.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE cart_items (
    cart_id BIGINT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id, product_id),
    INDEX idx_product_in_carts (product_id, cart_id)
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
                Avoid full table scans on reverse lookups and secondary index bloating
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
                  <strong className="text-white">1. Omitting the Reverse Index:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Querying by the 2nd column forces a slow full table scan without a secondary reverse index.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Bloated Composite Keys (4+ Cols):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Bloats leaf nodes of all secondary indexes and complicates child foreign keys.
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
                  <strong className="text-white">1. Create Reverse Index:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always add <code>INDEX (id_b, id_a)</code> for complete two-way query coverage.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Idempotent Upserts:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>INSERT ... ON DUPLICATE KEY UPDATE</code> to update payload grades seamlessly.
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
              <span>Composite Primary Keys eliminate duplicate pairings at the storage engine level</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>InnoDB physically clusters rows on disk by the Composite PK column order</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Leftmost Prefix Rule: Queries filtering by the 2nd column cannot use the PK index</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always create a Secondary Reverse Index on <code>(id_b, id_a)</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>All columns participating in a Composite PK MUST be <code>NOT NULL</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Switch to Surrogate PK + UNIQUE if external child tables reference this junction</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Composite Primary Keys in Junction Tables – FAQs"
            questions={questions}
            subtitle="Master composite clustered indexing, leftmost prefix optimization, and reverse indexes with 30 comprehensive Q&As"
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
            title="Composite Primary Keys in Junction Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_composite_pk_junction_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In high-performance database design, understanding the B-Tree Leftmost Prefix Rule is an absolute superpower! " +
              "In my classes in Barrackpore, I demonstrate how a table with `PRIMARY KEY (student_id, course_id)` flies through " +
              "queries looking up a student's courses, but grinds to a halt on queries asking 'Which students are in React?' " +
              "Why? Because `course_id` is the second column in the index tree! By adding a single secondary reverse index " +
              "`INDEX (course_id, student_id)`, both directions execute in 0.001 seconds. Always pair your composite PK with a reverse index!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · Composite PKs in Junctions · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
