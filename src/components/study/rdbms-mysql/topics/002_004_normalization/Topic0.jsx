import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – The Purpose of Normalization: Eliminating Redundancy and Anomalies
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Database Anomaly Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Anomaly Simulator State
  const [selectedAnomalyKey, setSelectedAnomalyKey] = useState("insert_anomaly"); // "insert_anomaly" | "update_anomaly" | "delete_anomaly" | "normalized_3nf"
  const [activeSimulationLog, setActiveSimulationLog] = useState("");

  const anomalyScenarios = {
    insert_anomaly: {
      title: "1. Insertion Anomaly (Inability to Insert Independent Entities)",
      category: "Entity Integrity & NULL Blockers",
      problem: "You want to introduce a new course: 'Cloud DevOps' taught by 'Sukanta Hui' (Fee: ₹6,000). But no student has enrolled in it yet.",
      rootCause: "Primary key is composite (student_id, course_id). Setting student_id = NULL violates Entity Integrity, so the course CANNOT be inserted into the system.",
      rawTableData: [
        { sId: "#101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500" },
        { sId: "#102", sName: "Mahima Sharma", city: "Kolkata", cId: "C102", cTitle: "React Architect", fee: "₹5,500" },
        { sId: "❌ NULL", sName: "❌ NULL", city: "❌ NULL", cId: "C103", cTitle: "Cloud DevOps", fee: "₹6,000" },
      ],
      sqlCode: `-- Attempting to add a new course without a student:
INSERT INTO student_enrollment_universal 
(student_id, student_name, city, course_id, course_title, instructor, course_fee)
VALUES (NULL, NULL, NULL, 'C103', 'Cloud DevOps', 'Sukanta Hui', 6000);
-- ❌ MySQL Error 1048 (23000): Column 'student_id' cannot be null`,
      statusBadge: "INSERTION BLOCKED",
      statusColor: "rose",
    },
    update_anomaly: {
      title: "2. Update / Modification Anomaly (Data Inconsistency)",
      category: "Redundant Duplication & Desynchronization",
      problem: "Course 'MySQL Master' fee increases from ₹4,500 to ₹5,000. 500 students in Barrackpore are enrolled in it.",
      rootCause: "Fee is redundantly stored across 500 rows. If 499 rows are updated and 1 row is missed due to a crash, the database holds contradictory prices for the same course.",
      rawTableData: [
        { sId: "#101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹5,000 (Updated)" },
        { sId: "#103", sName: "Abhronila Das", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹5,000 (Updated)" },
        { sId: "#105", sName: "Debangshu Roy", city: "Kolkata", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500 (MISSED!)" },
      ],
      sqlCode: `-- If an update query fails midway or lacks proper WHERE clause:
UPDATE student_enrollment_universal 
SET course_fee = 5000 
WHERE course_id = 'C101' AND city = 'Barrackpore';
-- ⚠️ Inconsistency: Same course C101 now has fee ₹5000 in Barrackpore and ₹4500 in Kolkata!`,
      statusBadge: "DATA INCONSISTENCY",
      statusColor: "amber",
    },
    delete_anomaly: {
      title: "3. Deletion Anomaly (Unintended Loss of Business Data)",
      category: "Catastrophic Side Effects",
      problem: "Susmita Ghosh is the ONLY student registered for 'Advanced Python'. She withdraws her admission.",
      rootCause: "Deleting Susmita's row permanently destroys all record of the 'Advanced Python' course, its fee, syllabus, and instructor information.",
      rawTableData: [
        { sId: "🗑️ DELETED", sName: "Susmita Ghosh", city: "Ichapur", cId: "C104", cTitle: "Adv Python", fee: "₹4,800" },
      ],
      sqlCode: `-- Dropping student Susmita's enrollment:
DELETE FROM student_enrollment_universal 
WHERE student_id = '#104';
-- 💥 Catastrophe: Course C104 'Adv Python' completely vanished from the catalog!`,
      statusBadge: "DATA DESTROYED",
      statusColor: "rose",
    },
    normalized_3nf: {
      title: "4. Decomposed 3NF Solution (Zero Anomalies & Zero Redundancy)",
      category: "Normalized Architecture",
      problem: "Split 1 wide table into 3 clean relational tables: Students, Courses, and Enrollments.",
      rootCause: "Each entity has its own primary key table. Entities exist independently; updates happen in exactly 1 row; deletions only remove enrollment links.",
      rawTableData: [
        { sId: "Students Table", sName: "student_id (PK)", city: "full_name, city", cId: "Courses Table", cTitle: "course_id (PK), title, fee", fee: "Enrollments (Bridge)" },
      ],
      sqlCode: `-- 1. Students Entity
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);

-- 2. Courses Entity (Can exist with 0 students!)
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);

-- 3. Enrollments Junction (Connects entities via Foreign Keys)
CREATE TABLE enrollments (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    enrolled_at DATE NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);`,
      statusBadge: "100% CLEAN ARCHITECTURE",
      statusColor: "emerald",
    },
  };

  const currentScenario = anomalyScenarios[selectedAnomalyKey];

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
            Module 002_004 · Database Normalization &amp; Functional Dependencies · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            The Purpose of Normalization:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Eliminating Redundancy &amp; Anomalies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical imperative of relational database normalization: eliminating storage redundancy,
            curing the 3 cardinal anomalies (Insertion, Update, Deletion), and climbing the Normal Forms progression ladder from 1NF to BCNF.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Zero Redundancy
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 3 Cardinal Anomalies Cured
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪜 1NF ➔ 2NF ➔ 3NF ➔ BCNF Ladder
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Lossless Join Guarantee
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Normalization Theory & Cardinal Anomalies ── */}
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
                The Normalization Paradigm &amp; The 3 Cardinal Anomalies
              </h2>
              <p className="text-xs text-slate-400">
                Why unnormalized flat tables inevitably corrupt relational database systems
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Insertion Anomaly</span>
              <strong className="text-white text-xs block font-mono">Entity Blocked</strong>
              <p className="text-[11px] text-slate-400">Cannot add new parent entities without child records due to primary key NOT NULL rules.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Update Anomaly</span>
              <strong className="text-white text-xs block font-mono">Desynchronization</strong>
              <p className="text-[11px] text-slate-400">Redundant copies across 1,000 rows create inconsistent states if 1 row update fails.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">3. Deletion Anomaly</span>
              <strong className="text-white text-xs block font-mono">Unintended Loss</strong>
              <p className="text-[11px] text-slate-400">Deleting the last student enrolled in a course accidentally wipes the entire course record.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Unnormalized Anomalies vs 3NF Decomposition ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3 Cardinal Anomalies &amp; Lossless 3NF Decomposition Flow
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Normalization Decomposition Diagram"
            >
              {/* Unnormalized Wide Table */}
              <g transform="translate(20, 20)">
                <rect width="250" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="250" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="125" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Unnormalized Universal Table</text>
                <text x="10" y="42" fill="#fca5a5" fontSize="10">❌ Student + Course + Grade in 1 row</text>
                <text x="10" y="60" fill="#fca5a5" fontSize="10">❌ Insertion Anomaly (NULL Blocked)</text>
                <text x="10" y="78" fill="#fca5a5" fontSize="10">❌ Update Anomaly (Redundant copies)</text>
                <text x="10" y="96" fill="#fca5a5" fontSize="10">❌ Deletion Anomaly (Data destroyed)</text>
              </g>

              {/* Arrow: Normalization Decomposition */}
              <g transform="translate(290, 60)">
                <line x1="0" y1="15" x2="60" y2="15" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" />
                <polygon points="60,10 75,15 60,20" fill="#38bdf8" />
                <text x="35" y="0" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold">3NF DECOMPOSE</text>
              </g>

              {/* Normalized Decomposed Tables */}
              <g transform="translate(390, 15)">
                {/* Students Table */}
                <rect width="170" height="35" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="85" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Students Table</text>
                <text x="85" y="28" fill="#cbd5e1" fontSize="9" textAnchor="middle">student_id (PK), name, city</text>

                {/* Courses Table */}
                <g transform="translate(190, 0)">
                  <rect width="170" height="35" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="85" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Courses Table</text>
                  <text x="85" y="28" fill="#cbd5e1" fontSize="9" textAnchor="middle">course_id (PK), title, fee</text>
                </g>

                {/* Enrollments Junction */}
                <g transform="translate(95, 60)">
                  <rect width="180" height="45" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                  <text x="90" y="18" fill="#818cf8" textAnchor="middle" fontWeight="bold">Enrollments Junction (FKs)</text>
                  <text x="90" y="34" fill="#cbd5e1" fontSize="9" textAnchor="middle">(student_id, course_id) + grade</text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Database Anomaly Simulator ──── */}
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
                Interactive Database Anomaly &amp; 3NF Decomposition Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Witness firsthand how unnormalized schemas fail and how 3NF decomposition guarantees entity safety
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedAnomalyKey("insert_anomaly")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedAnomalyKey === "insert_anomaly"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Insertion Anomaly
              </button>

              <button
                onClick={() => setSelectedAnomalyKey("update_anomaly")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedAnomalyKey === "update_anomaly"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Update Anomaly
              </button>

              <button
                onClick={() => setSelectedAnomalyKey("delete_anomaly")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedAnomalyKey === "delete_anomaly"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Deletion Anomaly
              </button>

              <button
                onClick={() => setSelectedAnomalyKey("normalized_3nf")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedAnomalyKey === "normalized_3nf"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Normalized 3NF Solution
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Scenario & Root Cause */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentScenario.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentScenario.statusColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentScenario.statusColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentScenario.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Business Scenario:</span>
                      <p className="text-slate-300 mt-0.5 italic">"{currentScenario.problem}"</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Root Architectural Cause:</span>
                      <p className="text-rose-300 mt-0.5">{currentScenario.rootCause}</p>
                    </div>
                  </div>
                </div>

                {/* SQL Code Breakdown */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                  <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">
                    SQL DDL &amp; DML Impact:
                  </span>
                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {currentScenario.sqlCode}
                  </pre>
                </div>
              </div>

              {/* Right: Table State Visualizer */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Database State in Memory</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentScenario.rawTableData.length} Records Inspected
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">student_id</th>
                          <th className="p-1.5">student_name</th>
                          <th className="p-1.5">city</th>
                          <th className="p-1.5">course_id</th>
                          <th className="p-1.5">course_title</th>
                          <th className="p-1.5">course_fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentScenario.rawTableData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-white font-bold">{row.sId}</td>
                            <td className="p-1.5 text-cyan-300">{row.sName}</td>
                            <td className="p-1.5 text-slate-300">{row.city}</td>
                            <td className="p-1.5 text-amber-300">{row.cId}</td>
                            <td className="p-1.5 text-slate-300">{row.cTitle}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">{row.fee}</td>
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
                How Barrackpore and Kolkata training institutes prevent critical data corruption
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Fee Revision &amp; Update Anomaly
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Updating the course fee in a 3NF normalized schema takes exactly 1 row update in the <code>courses</code> table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- In 3NF: Single atomic update with 100% consistency!
UPDATE courses
SET course_fee = 5000.00
WHERE course_id = 'C101';
-- Affects exactly 1 row; automatically reflected for all 500 enrolled students!`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Standalone Course Launch &amp; Insertion Safety
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Introducing brand new academic programs without waiting for student enrollments:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Standalone insertion into parent table:
INSERT INTO courses (course_id, course_title, course_fee)
VALUES ('C205', 'AI & Machine Learning with Python', 7500.00);
-- 100% Successful: No primary key null violations!`}
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
                Guidelines for designing robust normalized databases without creating join performance bottlenecks
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
                  <strong className="text-white">1. Over-Normalizing Reporting Systems:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Decomposing historical data marts to BCNF causes massive 15-table JOIN query latency.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Lossy Decomposition:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Splitting tables without a candidate key overlap causes phantom rows when rejoining.
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
                  <strong className="text-white">1. Normalize First (3NF/BCNF):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always start with 3NF for OLTP databases to guarantee transactional write integrity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Profile Before Denormalizing:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Denormalize selectively only after profiling slow join queries with <code>EXPLAIN FORMAT=TREE</code>.
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
              <span>Normalization minimizes data redundancy and cures 3 cardinal anomalies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Insertion Anomaly: Cannot insert standalone entity without child record</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Update Anomaly: Modifying duplicate rows leads to data inconsistency</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Deletion Anomaly: Deleting child record accidentally destroys entity catalog</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Progression ladder: UNF ➔ 1NF ➔ 2NF ➔ 3NF ➔ BCNF ➔ 4NF ➔ 5NF</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Valid decompositions must guarantee Lossless Join and Dependency Preservation</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Purpose of Normalization – FAQs"
            questions={questions}
            subtitle="Master the fundamental purpose of Database Normalization, the 3 cardinal anomalies, normal form progression, lossless join decomposition, and OLTP vs OLAP trade-offs with 30 comprehensive Q&As"
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
            title="The Purpose of Normalization: Eliminating Redundancy and Anomalies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_normalization_purpose_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Welcome to Module 002_004: Functional Dependencies & Database Normalization! " +
              "In my classes at Coder & AccoTax in Barrackpore, I emphasize that Normalization is the immune system of your database. " +
              "An unnormalized table looks deceptively simple at first, but as soon as your business scales, " +
              "it inevitably suffers from the 3 cardinal anomalies: insertion blocks, update desynchronizations, and accidental data deletions. " +
              "By decomposing wide tables into 3NF/BCNF relations using functional dependencies, you guarantee that every piece of fact is stored in exactly ONE place. " +
              "Always remember our golden rule: 'Normalize until it hurts, denormalize until it works!'"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Purpose of Normalization · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
