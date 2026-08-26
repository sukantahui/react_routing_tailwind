import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Understanding Functional Dependencies (X → Y)
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Functional Dependency Validator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive FD Validator State
  const [selectedFdKey, setSelectedFdKey] = useState("fd_student"); // "fd_student" | "fd_course" | "fd_composite" | "fd_invalid_city"

  const sampleDataset = [
    { sId: "#101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500", grade: "A+" },
    { sId: "#102", sName: "Mahima Sharma", city: "Kolkata", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500", grade: "A" },
    { sId: "#103", sName: "Abhronila Das", city: "Barrackpore", cId: "C102", cTitle: "React Architect", fee: "₹5,500", grade: "A+" },
    { sId: "#104", sName: "Susmita Ghosh", city: "Ichapur", cId: "C103", cTitle: "Cloud DevOps", fee: "₹6,000", grade: "O" },
    { sId: "#105", sName: "Debangshu Roy", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500", grade: "B+" },
  ];

  const fdRules = {
    fd_student: {
      notation: "student_id → { student_name, city }",
      determinant: "student_id",
      dependent: "{ student_name, city }",
      isValid: true,
      verdict: "VALID FUNCTIONAL DEPENDENCY",
      verdictColor: "emerald",
      explanation: "Every unique student_id maps to exactly ONE student name and city. No two rows with the same student_id have different names.",
      sqlSchema: `-- Enforcing student_id &rarr; { student_name, city } in SQL:
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY, -- Determinant is PRIMARY KEY
    student_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);`,
      conflicts: [],
    },
    fd_course: {
      notation: "course_id → { course_title, course_fee }",
      determinant: "course_id",
      dependent: "{ course_title, course_fee }",
      isValid: true,
      verdict: "VALID FUNCTIONAL DEPENDENCY",
      verdictColor: "emerald",
      explanation: "Every course_id (e.g. 'C101') consistently maps to the same title ('MySQL Master') and tuition fee ('₹4,500') across all tuples.",
      sqlSchema: `-- Enforcing course_id -&gt; { course_title, course_fee } in SQL:
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY, -- Determinant is PRIMARY KEY
    course_title VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);`,
      conflicts: [],
    },
    fd_composite: {
      notation: "(student_id, course_id) → grade",
      determinant: "(student_id, course_id)",
      dependent: "grade",
      isValid: true,
      verdict: "VALID COMPOSITE FUNCTIONAL DEPENDENCY",
      verdictColor: "emerald",
      explanation: "A student in a specific course receives exactly ONE final grade. The combination of (student_id, course_id) uniquely determines the grade.",
      sqlSchema: `-- Enforcing (student_id, course_id) -> grade in SQL:
CREATE TABLE enrollments (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    grade VARCHAR(5) NOT NULL,
    PRIMARY KEY (student_id, course_id) -- Composite Determinant is PK
);`,
      conflicts: [],
    },
    fd_invalid_city: {
      notation: "city → student_name",
      determinant: "city",
      dependent: "student_name",
      isValid: false,
      verdict: "INVALID / VIOLATED DEPENDENCY",
      verdictColor: "rose",
      explanation: "Multiple students reside in 'Barrackpore' (Mamata, Abhronila, Debangshu). Knowing the city does NOT uniquely determine a single student name!",
      sqlSchema: `-- ❌ Cannot enforce city -> student_name as a functional dependency
-- because City is NOT a unique key (One city contains many students).`,
      conflicts: ["#101 (Mamata)", "#103 (Abhronila)", "#105 (Debangshu)"],
    },
  };

  const currentFd = fdRules[selectedFdKey];

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
            Module 002_004 · Database Normalization · Topic 2
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Understanding Functional Dependencies:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Determinants &amp; Dependents (X → Y)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical bedrock of database normalization: the formal definition of Functional Dependencies (X → Y),
            evaluating tuple matching invariants, determinant-dependent roles, and candidate key derivations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Mathematical Invariant: t1[X] = t2[X] ➔ t1[Y] = t2[Y]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Determinant (X) vs Dependent (Y)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Basis of Candidate Keys
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪜 Foundation for 2NF, 3NF &amp; BCNF
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory of Functional Dependencies ── */}
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
                Formal Definition &amp; Mathematical Mechanics of FDs
              </h2>
              <p className="text-xs text-slate-400">
                How functional constraints mathematically bind attribute subsets in relational schemas
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">The Determinant (X)</span>
              <strong className="text-white text-xs block font-mono">Left-Hand Side (LHS)</strong>
              <p className="text-xs text-slate-300">
                The attribute (or set of attributes) that acts as the driver. Whenever its value is known, it unambiguously dictates the value of the dependent.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">The Dependent (Y)</span>
              <strong className="text-white text-xs block font-mono">Right-Hand Side (RHS)</strong>
              <p className="text-xs text-slate-300">
                The attribute (or set of attributes) whose values are completely determined by X. If two rows match on X, they MUST match on Y.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: The Functional Dependency Mapping Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Functional Dependency Invariant (t1[X] = t2[X] ➔ t1[Y] = t2[Y])
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Functional Dependency Invariant Diagram"
            >
              {/* Determinant Box X */}
              <g transform="translate(40, 20)">
                <rect width="200" height="95" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <rect width="200" height="24" rx="8" fill="#0f172a" stroke="#06b6d4" />
                <text x="100" y="16" fill="#06b6d4" textAnchor="middle" fontWeight="bold">Determinant (X)</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="11">Tuple t1: [student_id = #101]</text>
                <text x="10" y="65" fill="#cbd5e1" fontSize="11">Tuple t2: [student_id = #101]</text>
                <text x="10" y="85" fill="#38bdf8" fontSize="10" fontWeight="bold">Invariant: t1[X] = t2[X]</text>
              </g>

              {/* Arrow X &rarr; Y */}
              <g transform="translate(260, 60)">
                <line x1="0" y1="10" x2="80" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="80,5 95,10 80,15" fill="#10b981" />
                <text x="45" y="-5" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold">X → Y (FD)</text>
              </g>

              {/* Dependent Box Y */}
              <g transform="translate(380, 20)">
                <rect width="360" height="95" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="360" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="180" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Dependent (Y) Guarantee</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="11">Tuple t1: [name = 'Mamata', city = 'Barrackpore']</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="11">Tuple t2: [name = 'Mamata', city = 'Barrackpore']</text>
                <text x="15" y="85" fill="#10b981" fontSize="10" fontWeight="bold">✓ Obligation Met: t1[Y] = t2[Y] (Zero Contradiction)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Functional Dependency Validator ─ */}
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
                Interactive Functional Dependency Validator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test candidate functional dependencies against sample relation data and inspect validation proofs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* FD Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFdKey("fd_student")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_student"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                student_id → name, city
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_course")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_course"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                course_id → title, fee
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_composite")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_composite"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                (sid, cid) → grade
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_invalid_city")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_invalid_city"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                city → student_name ❌
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Validation Result & SQL Schema */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentFd.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFd.isValid
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentFd.verdict}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Mathematical Evaluation:</span>
                      <p className="text-slate-300 mt-0.5">{currentFd.explanation}</p>
                    </div>

                    {!currentFd.isValid && currentFd.conflicts.length &gt; 0 && (
                      <div>
                        <span className="text-rose-400 block text-[11px] uppercase font-bold">Conflicting Tuples Detected:</span>
                        <div className="flex gap-2 mt-1">
                          {currentFd.conflicts.map((c, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SQL Schema Implementation */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                  <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">
                    SQL Schema Implementation:
                  </span>
                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {currentFd.sqlSchema}
                  </pre>
                </div>
              </div>

              {/* Right: Table State Visualizer */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Relation Instance (Students_Courses_Roster)</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {sampleDataset.length} Tuples Evaluated
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
                          <th className="p-1.5">fee</th>
                          <th className="p-1.5">grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {sampleDataset.map((row, idx) => {
                          const isHighlightedConflict = !currentFd.isValid && row.city === "Barrackpore";
                          return (
                            <tr key={idx} className={clsx(isHighlightedConflict && "bg-rose-500/10")}>
                              <td className="p-1.5 text-white font-bold">{row.sId}</td>
                              <td className={clsx("p-1.5", isHighlightedConflict ? "text-rose-300 font-bold" : "text-cyan-300")}>
                                {row.sName}
                              </td>
                              <td className={clsx("p-1.5", isHighlightedConflict ? "text-rose-400 font-bold" : "text-slate-300")}>
                                {row.city}
                              </td>
                              <td className="p-1.5 text-amber-300">{row.cId}</td>
                              <td className="p-1.5 text-slate-300">{row.cTitle}</td>
                              <td className="p-1.5 text-emerald-300">{row.fee}</td>
                              <td className="p-1.5 text-teal-300 font-bold">{row.grade}</td>
                            </tr>
                          );
                        })}
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
                How Barrackpore and Kolkata training institutes use functional dependencies to structure schemas
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Identity &amp; Email Uniqueness
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Both <code>student_id → email</code> and <code>email → student_id</code> hold, creating two candidate keys:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Enforcing bidirectional uniqueness in MySQL:
CREATE TABLE student_directory (
    student_id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE, -- Candidate Key
    city VARCHAR(50) NOT NULL
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-Course Enrollment Grade Matrix
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Composite determinant <code>(student_id, course_id) → grade</code> guarantees each student has exactly 1 grade per course:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Enforcing composite determinant via Composite Primary Key:
CREATE TABLE course_grades (
    student_id VARCHAR(10),
    course_id VARCHAR(10),
    grade VARCHAR(5) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student_directory(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`}
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
                Guidelines for identifying and managing functional dependencies in production database architectures
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
                  <strong className="text-white">1. Confusing Sample Data with Business FDs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Sample table rows may temporarily show unique city names, but in reality, cities contain millions of students.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming FDs are Symmetrical:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>student_id → city</code> does NOT imply <code>city → student_id</code>. FDs are strictly one-way.
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
                  <strong className="text-white">1. Derive FDs from Business Domain Rules:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always consult domain business rules and entity specifications to declare sound functional dependencies.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Determinants Must Become Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In high normal forms (BCNF), ensure every non-trivial determinant is enforced as a PRIMARY or UNIQUE key.
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
              <span>Functional Dependency (X → Y) means t1[X] = t2[X] implies t1[Y] = t2[Y]</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>X is the Determinant (LHS); Y is the Dependent (RHS)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>FDs represent semantic business rules, not temporary sample data patterns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>If X determines all attributes in relation R (X → R), X is a Super Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Minimal super keys are Candidate Keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>FDs provide the mathematical basis for 2NF, 3NF, and BCNF normalization</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Functional Dependencies – FAQs"
            questions={questions}
            subtitle="Master Functional Dependencies (X → Y), determinants, dependents, candidate key derivations, and SQL implementation with 30 comprehensive Q&As"
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
            title="Understanding Functional Dependencies (X → Y)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_functional_dependencies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Functional Dependencies (X → Y) are the absolute mathematical cornerstone of relational database design! " +
              "In my classes at Coder & AccoTax in Barrackpore, I teach students to think of a Functional Dependency as a mathematical function f(X) = Y. " +
              "If you give it a student ID, it will always return exactly ONE name. " +
              "Never confuse temporary sample data with a real business FD. " +
              "Always ask: 'In the real world, can one value of X ever map to multiple different values of Y?' " +
              "If the answer is yes, then X → Y is invalid. Master FDs, and database normalization becomes intuitive and effortless!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · Functional Dependencies · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
