import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Outer Join Operators in Relational Algebra: Left Outer Join (⟕), Right Outer Join (⟖), and Full Outer Join (⟗)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Outer Join Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive Outer Join Simulator State
  const [activeJoinType, setActiveJoinType] = useState("left"); // "left" | "right" | "full" | "where_trap"

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Mahima Sharma", city: "Kolkata" },
    { id: 103, name: "Abhronila Das", city: "Barrackpore" },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur" }, // Unenrolled (Dangling)
    { id: 105, name: "Debangshu Roy", city: "Kolkata" }, // Unenrolled (Dangling)
  ]);

  const [courses] = useState([
    { courseId: 201, title: "MySQL Masterclass", fee: 5500 },
    { courseId: 202, title: "React Architect", fee: 4800 },
    { courseId: 203, title: "Node & Express Backend", fee: 5200 },
    { courseId: 204, title: "Cloud DevOps (New)", fee: 6500 }, // 0 enrollments (Dangling)
  ]);

  const [enrollments] = useState([
    { studentId: 101, courseId: 201, grade: "A+" },
    { studentId: 101, courseId: 202, grade: "A" },
    { studentId: 102, courseId: 202, grade: "A" },
    { studentId: 103, courseId: 201, grade: "B+" },
    { studentId: 103, courseId: 203, grade: "A" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Outer Join Engine Active. Toggle between Left Outer Join, Right Outer Join, Full Outer Join (UNION emulation), and the WHERE clause trap."
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

  // Compute Outer Join Results
  let displayResults = [];
  let mathFormula = "";
  let sqlSnippet = "";

  if (activeJoinType === "left") {
    mathFormula = "Students ⟕ Enrollments  (Preserves ALL Students with NULL course padding)";
    sqlSnippet = `SELECT s.student_id, s.full_name, s.city, COALESCE(e.course_id, 'NULL') AS course_id, COALESCE(e.grade, '—') AS grade\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id;`;

    students.forEach((s) => {
      const studentEnrolls = enrollments.filter((e) => e.studentId === s.id);
      if (studentEnrolls.length > 0) {
        studentEnrolls.forEach((e) => {
          displayResults.push({
            studentId: s.id,
            studentName: s.name,
            city: s.city,
            courseId: e.courseId,
            grade: e.grade,
            isPadded: false,
          });
        });
      } else {
        displayResults.push({
          studentId: s.id,
          studentName: s.name,
          city: s.city,
          courseId: "NULL",
          grade: "—",
          isPadded: true,
        });
      }
    });
  } else if (activeJoinType === "right") {
    mathFormula = "Enrollments ⟖ Courses  (Preserves ALL Courses with NULL student padding)";
    sqlSnippet = `SELECT c.course_id, c.course_title, c.fee, COALESCE(e.student_id, 'NULL') AS student_id\nFROM enrollments e\nRIGHT JOIN courses c ON e.course_id = c.course_id;`;

    courses.forEach((c) => {
      const courseEnrolls = enrollments.filter((e) => e.courseId === c.courseId);
      if (courseEnrolls.length > 0) {
        courseEnrolls.forEach((e) => {
          const s = students.find((st) => st.id === e.studentId);
          displayResults.push({
            courseId: c.courseId,
            courseTitle: c.title,
            fee: c.fee,
            studentId: e.studentId,
            studentName: s ? s.name : `Student #${e.studentId}`,
            isPadded: false,
          });
        });
      } else {
        displayResults.push({
          courseId: c.courseId,
          courseTitle: c.title,
          fee: c.fee,
          studentId: "NULL",
          studentName: "NULL (0 Enrolled)",
          isPadded: true,
        });
      }
    });
  } else if (activeJoinType === "full") {
    mathFormula = "Students ⟗ Courses (Full Outer Join Emulation via UNION of Left and Right Outer Joins)";
    sqlSnippet = `-- MySQL Full Outer Join Emulation:\nSELECT s.student_id, s.full_name, c.course_id, c.course_title\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nLEFT JOIN courses c ON e.course_id = c.course_id\nUNION\nSELECT s.student_id, s.full_name, c.course_id, c.course_title\nFROM students s\nRIGHT JOIN enrollments e ON s.student_id = e.student_id\nRIGHT JOIN courses c ON e.course_id = c.course_id;`;

    // 1. All matched + student left dangling
    students.forEach((s) => {
      const studentEnrolls = enrollments.filter((e) => e.studentId === s.id);
      if (studentEnrolls.length > 0) {
        studentEnrolls.forEach((e) => {
          const c = courses.find((cr) => cr.courseId === e.courseId);
          displayResults.push({
            studentId: s.id,
            studentName: s.name,
            courseId: c ? c.courseId : e.courseId,
            courseTitle: c ? c.title : "—",
            isPadded: false,
          });
        });
      } else {
        displayResults.push({
          studentId: s.id,
          studentName: s.name,
          courseId: "NULL",
          courseTitle: "NULL",
          isPadded: true,
        });
      }
    });

    // 2. Add course right dangling (course 204)
    courses.forEach((c) => {
      const hasEnroll = enrollments.some((e) => e.courseId === c.courseId);
      if (!hasEnroll) {
        displayResults.push({
          studentId: "NULL",
          studentName: "NULL",
          courseId: c.courseId,
          courseTitle: c.title,
          isPadded: true,
        });
      }
    });
  } else if (activeJoinType === "where_trap") {
    mathFormula = "The WHERE Trap: σ_{e.grade = 'A+'}(Students ⟕ Enrollments) ➔ Converts to Inner Join!";
    sqlSnippet = `-- FLAWED QUERY (WHERE discards NULLs):\nSELECT s.student_id, s.full_name, e.grade\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nWHERE e.grade = 'A+';\n-- SAFE QUERY (Filter in ON clause):\nSELECT s.student_id, s.full_name, e.grade\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id AND e.grade = 'A+';`;

    // Filtered by WHERE: only rows where grade == 'A+'
    students.forEach((s) => {
      const studentEnrolls = enrollments.filter((e) => e.studentId === s.id && e.grade === "A+");
      studentEnrolls.forEach((e) => {
        displayResults.push({
          studentId: s.id,
          studentName: s.name,
          city: s.city,
          courseId: e.courseId,
          grade: e.grade,
          isPadded: false,
        });
      });
    });
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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 13
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Outer Join Operators:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Left (⟕), Right (⟖) &amp; Full (⟗)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical preservation of dangling tuples in relational algebra: Left Outer Join (⟕),
            Right Outer Join (⟖), Full Outer Join (⟗) emulation via SQL `UNION`, and the accidental inner join conversion trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⬅️ Left Outer (⟕): Preserves Left Rows
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ➡️ Right Outer (⟖): Preserves Right Rows
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Full Outer (⟗): LEFT UNION RIGHT
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ The WHERE Filter Bug
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Semantics ───────────── */}
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
                Outer Join Mathematical Semantics &amp; Derivations
              </h2>
              <p className="text-xs text-slate-400">
                Preserving unmatched tuples with NULL padding, set union formulations, and MySQL emulation
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Left Outer Join (⟕)</span>
              <strong className="text-white text-xs block font-mono">(R ⨝ S) ∪ ((R ▷ S) × NULL_S)</strong>
              <p className="text-[11px] text-slate-400">Preserves all tuples from $R$. Missing $S$ columns are NULL.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Right Outer Join (⟖)</span>
              <strong className="text-white text-xs block font-mono">R ⟖ S ≡ S ⟕ R</strong>
              <p className="text-[11px] text-slate-400">Preserves all tuples from $S$. Missing $R$ columns are NULL.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Full Outer Join (⟗)</span>
              <strong className="text-white text-xs block font-mono">(R ⟕ S) ∪ (R ⟖ S)</strong>
              <p className="text-[11px] text-slate-400">Preserves all tuples from both relations. Emulated via SQL UNION.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Outer Join Comparison Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Inner Join vs Left Outer (⟕) vs Right Outer (⟖) vs Full Outer (⟗)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Outer Joins Comparison Diagram"
            >
              {/* Inner Join Box */}
              <g transform="translate(20, 20)">
                <rect width="165" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="165" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="82" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Inner Join (⨝)</text>
                <text x="10" y="42" fill="#cbd5e1">Only Exact Matches</text>
                <text x="10" y="60" fill="#10b981">Mamata, Mahima, Abhronila</text>
                <text x="10" y="78" fill="#f43f5e">Discards Unmatched</text>
              </g>

              {/* Left Outer Join Box */}
              <g transform="translate(200, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="87" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Left Outer (⟕)</text>
                <text x="10" y="42" fill="#10b981">All 5 Students Retained</text>
                <text x="10" y="60" fill="#f59e0b">Susmita: course=NULL</text>
                <text x="10" y="78" fill="#f59e0b">Debangshu: course=NULL</text>
              </g>

              {/* Right Outer Join Box */}
              <g transform="translate(390, 20)">
                <rect width="175" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="175" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="87" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Right Outer (⟖)</text>
                <text x="10" y="42" fill="#10b981">All 4 Courses Retained</text>
                <text x="10" y="60" fill="#cbd5e1">MySQL, React, Node (Matched)</text>
                <text x="10" y="78" fill="#10b981">DevOps: student=NULL</text>
              </g>

              {/* Full Outer Join Box */}
              <g transform="translate(580, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="90" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Full Outer (⟗)</text>
                <text x="10" y="42" fill="#818cf8">360° Academic Audit</text>
                <text x="10" y="60" fill="#cbd5e1">All Students + All Courses</text>
                <text x="10" y="78" fill="#10b981">Emulated via SQL UNION</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Outer Join Sandbox ──────────── */}
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
                Interactive Outer Join &amp; NULL Preservation Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Inspect Left, Right, Full Outer Joins and test the famous WHERE clause filter bug
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setActiveJoinType("left");
                  setEngineLog("✓ Evaluated Left Outer Join: Students ⟕ Enrollments. Retained all 5 students, padding Susmita and Debangshu with NULL course records.");
                }}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  activeJoinType === "left"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Left Outer Join (⟕)
              </button>

              <button
                onClick={() => {
                  setActiveJoinType("right");
                  setEngineLog("✓ Evaluated Right Outer Join: Enrollments ⟖ Courses. Retained all 4 courses, padding new course 'Cloud DevOps' with NULL student records.");
                }}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  activeJoinType === "right"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Right Outer Join (⟖)
              </button>

              <button
                onClick={() => {
                  setActiveJoinType("full");
                  setEngineLog("✓ Evaluated Full Outer Join: Students ⟗ Courses (via UNION). Combined Left and Right Outer Joins to show 360° audit of all students and courses.");
                }}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  activeJoinType === "full"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Full Outer Join (⟗)
              </button>

              <button
                onClick={() => {
                  setActiveJoinType("where_trap");
                  setEngineLog("⚠️ Triggered WHERE Clause Bug: Placing 'WHERE e.grade = A+' on a Left Join discards all NULL rows, silently converting Left Join into an Inner Join!");
                }}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  activeJoinType === "where_trap"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. The WHERE Filter Trap
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    Join Expression Breakdown:
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {mathFormula}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {sqlSnippet}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Right: Live Result Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Output Relation ({displayResults.length} rows)</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {activeJoinType === "where_trap" ? "❌ Inner Join Fallback" : "✓ Outer Rows Preserved"}
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          {activeJoinType === "right" ? (
                            <>
                              <th className="p-1.5">course_id</th>
                              <th className="p-1.5">Course Title</th>
                              <th className="p-1.5">Fee</th>
                              <th className="p-1.5">Enrolled Student</th>
                            </>
                          ) : activeJoinType === "full" ? (
                            <>
                              <th className="p-1.5">student_id</th>
                              <th className="p-1.5">Student Name</th>
                              <th className="p-1.5">course_id</th>
                              <th className="p-1.5">Course Title</th>
                            </>
                          ) : (
                            <>
                              <th className="p-1.5">student_id</th>
                              <th className="p-1.5">Student Name</th>
                              <th className="p-1.5">course_id</th>
                              <th className="p-1.5">grade</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {displayResults.map((r, idx) => (
                          <tr key={idx} className={r.isPadded ? "bg-amber-500/5" : ""}>
                            {activeJoinType === "right" ? (
                              <>
                                <td className="p-1.5 text-cyan-300 font-bold">#{r.courseId}</td>
                                <td className="p-1.5 text-white font-bold">{r.courseTitle}</td>
                                <td className="p-1.5 text-emerald-300">₹{r.fee}</td>
                                <td className={clsx("p-1.5 font-bold", r.isPadded ? "text-amber-400 italic" : "text-white")}>
                                  {r.studentName}
                                </td>
                              </>
                            ) : activeJoinType === "full" ? (
                              <>
                                <td className={clsx("p-1.5 font-bold", r.studentId === "NULL" ? "text-amber-400 italic" : "text-cyan-300")}>
                                  {r.studentId === "NULL" ? "NULL" : `#${r.studentId}`}
                                </td>
                                <td className={clsx("p-1.5 font-bold", r.studentName === "NULL" ? "text-amber-400 italic" : "text-white")}>
                                  {r.studentName}
                                </td>
                                <td className={clsx("p-1.5 font-bold", r.courseId === "NULL" ? "text-amber-400 italic" : "text-emerald-300")}>
                                  {r.courseId === "NULL" ? "NULL" : `#${r.courseId}`}
                                </td>
                                <td className={clsx("p-1.5", r.courseTitle === "NULL" ? "text-amber-400 italic" : "text-slate-300")}>
                                  {r.courseTitle}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="p-1.5 text-cyan-300 font-bold">#{r.studentId}</td>
                                <td className="p-1.5 text-white font-bold">{r.studentName}</td>
                                <td className={clsx("p-1.5 font-bold", r.isPadded ? "text-amber-400 italic" : "text-emerald-300")}>
                                  {r.courseId === "NULL" ? "NULL" : `#${r.courseId}`}
                                </td>
                                <td className={clsx("p-1.5", r.isPadded ? "text-slate-500" : "text-slate-300")}>
                                  {r.grade}
                                </td>
                              </>
                            )}
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
                Complete student rosters and 360-degree course audit reports from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Complete Student Roster (Left Outer Join)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\Students \\mathbin{\\unicode{x27D5}} \Enrollments$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.student_id, s.full_name, COALESCE(e.course_id, 'Not Enrolled') AS course_id
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's 360° Academic Audit (Full Outer Join Emulation)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\Students \\mathbin{\\unicode{x27D7}} \Courses$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.student_id, s.full_name, c.course_id, c.course_title
FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id LEFT JOIN courses c ON e.course_id = c.course_id
UNION
SELECT s.student_id, s.full_name, c.course_id, c.course_title
FROM students s RIGHT JOIN enrollments e ON s.student_id = e.student_id RIGHT JOIN courses c ON e.course_id = c.course_id;`}
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
                Avoid the WHERE filter outer join bug and understand aggregation over NULL rows
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
                  <strong className="text-white">1. WHERE Filter on Right Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE e.grade = 'A'</code> drops all NULL-padded student rows, converting <code>LEFT JOIN</code> to <code>INNER JOIN</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using COUNT(*) on Outer Joins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>COUNT(*)</code> returns 1 for students with 0 courses because the NULL row is counted. Use <code>COUNT(e.course_id)</code>.
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
                  <strong className="text-white">1. Filter in ON Clause:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Place secondary filters on the right table inside the <code>ON</code> condition to preserve unmatched left rows.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Full Outer Join via UNION:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In MySQL, always use <code>LEFT JOIN ... UNION ... RIGHT JOIN</code> to eliminate duplicate inner matches.
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
              <span>Left Outer Join (⟕) retains ALL rows from left relation $R$</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Right Outer Join (⟖) retains ALL rows from right relation $S$ (`R ⟖ S ≡ S ⟕ R`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Full Outer Join (⟗) retains all rows from both relations; emulated via SQL `UNION`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never place right-table filters in `WHERE`; place them in `ON`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `COUNT(e.course_id)` instead of `COUNT(*)` when aggregating over outer joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `COALESCE()` or `IFNULL()` to replace NULLs with user-friendly strings</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Outer Join Operators (⟕, ⟖, ⟗) – FAQs"
            questions={questions}
            subtitle="Master relational outer joins, Left (⟕), Right (⟖), Full Outer (⟗), MySQL Full Join UNION emulation, and avoiding the WHERE clause conversion bug with 30 comprehensive Q&As"
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
            title="Outer Join Operators in Relational Algebra: Left Outer Join (⟕), Right Outer Join (⟖), and Full Outer Join (⟗)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_outer_joins_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Outer Joins are the safety net of relational querying! " +
              "In my classes in Barrackpore, I emphasize that when reporting to management, you can never afford to drop inactive students " +
              "or empty course catalogs. " +
              "Left Outer Join ($R \\mathbin{\\unicode{x27D5}} S$) guarantees that every single student in your master roster appears in your report. " +
              "However, watch out for the famous WHERE-clause trap: if you put a filter like `WHERE e.grade = 'A'` on a Left Join, " +
              "you instantly destroy all the NULL rows you worked so hard to preserve! " +
              "Always place right-table filters inside the `ON` clause, and when emulating Full Outer Join in MySQL, " +
              "always use `LEFT JOIN ... UNION ... RIGHT JOIN` so duplicate inner matches are cleanly removed."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · Outer Join Operators · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
