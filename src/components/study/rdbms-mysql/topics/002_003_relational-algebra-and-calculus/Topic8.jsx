import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Natural Join (⨝) Mechanics, Common Attributes, and Schema Merging
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Natural Join Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Natural Join Sandbox State
  const [activeTab, setActiveTab] = useState("two_table"); // "two_table" | "three_table" | "trap"

  const [students] = useState([
    { student_id: 101, full_name: "Mamata Hui", city: "Barrackpore", status: "Active" },
    { student_id: 102, full_name: "Mahima Sharma", city: "Kolkata", status: "Active" },
    { student_id: 103, full_name: "Abhronila Das", city: "Barrackpore", status: "Completed" },
  ]);

  const [enrollments] = useState([
    { student_id: 101, course_id: 201, grade: "A+", status: "Paid" },
    { student_id: 102, course_id: 202, grade: "A", status: "Paid" },
    { student_id: 103, course_id: 201, grade: "B+", status: "Pending" },
  ]);

  const [courses] = useState([
    { course_id: 201, course_title: "MySQL Masterclass", fee: 5500 },
    { course_id: 202, course_title: "React Architect", fee: 4800 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Natural Join Engine Active. Toggle between 2-Table Join, 3-Table Chained Join, and the Accidental Common Column Trap."
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

  // 1. Compute 2-Table Natural Join (Students ⨝ Enrollments on student_id)
  const twoTableResults = [];
  students.forEach((s) => {
    enrollments.forEach((e) => {
      if (s.student_id === e.student_id) {
        twoTableResults.push({
          student_id: s.student_id,
          full_name: s.full_name,
          city: s.city,
          course_id: e.course_id,
          grade: e.grade,
        });
      }
    });
  });

  // 2. Compute 3-Table Natural Join (Students ⨝ Enrollments ⨝ Courses)
  const threeTableResults = [];
  twoTableResults.forEach((te) => {
    const crs = courses.find((c) => c.course_id === te.course_id);
    if (crs) {
      threeTableResults.push({
        student_id: te.student_id,
        full_name: te.full_name,
        city: te.city,
        course_id: te.course_id,
        course_title: crs.course_title,
        fee: crs.fee,
        grade: te.grade,
      });
    }
  });

  // 3. Compute Accidental Common Column Trap (Matching student_id AND status)
  const trapResults = [];
  students.forEach((s) => {
    enrollments.forEach((e) => {
      // Natural join blindly matches on student_id AND status!
      if (s.student_id === e.student_id && s.status === e.status) {
        trapResults.push({
          student_id: s.student_id,
          full_name: s.full_name,
          status: s.status,
          course_id: e.course_id,
        });
      }
    });
  });

  const twoTableMath = "Students ⨝ Enrollments  (Common: {student_id}, Deg = 3 + 3 − 1 = 5)";
  const twoTableSQL = `SELECT * FROM students\nNATURAL JOIN enrollments;\n-- Preferred Production SQL:\nSELECT * FROM students JOIN enrollments USING (student_id);`;

  const threeTableMath = "Students ⨝ Enrollments ⨝ Courses  (Chained Natural Join, Deg = 7)";
  const threeTableSQL = `SELECT * FROM students\nNATURAL JOIN enrollments\nNATURAL JOIN courses;`;

  const trapMath = "Students ⨝ Enrollments (Unintended common 'status' column: Active ≠ Paid!)";
  const trapSQL = `-- Unintended Natural Join Trap:\nSELECT * FROM students NATURAL JOIN enrollments;\n-- Matches: s.student_id = e.student_id AND s.status = e.status ('Active' vs 'Paid') ➔ Returns 0 rows!\n-- Production Fix:\nSELECT * FROM students JOIN enrollments USING (student_id);`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 8
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Natural Join (⨝) Mechanics &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Schema Merging
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of implicit schema-merging joins: Natural Join (⨝), degree reduction ($n + m - k$),
            single-column header coalescence, multi-table chaining, and the accidental common column trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧬 Degree Merging: Deg(R ⨝ S) = n + m − k
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Implicit Equijoin on Shared Names
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 The Accidental Column Trap
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Production Standard: JOIN ... USING
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Semantics & Derivation ───────── */}
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
                Natural Join (⨝) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                The 3-step formal derivation, degree reduction formula, and boundary condition behaviors
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Degree Formula</span>
              <strong className="text-white text-xs block font-mono">Deg(R ⨝ S) = n + m − k</strong>
              <p className="text-[11px] text-slate-400">Subtracts $k$ shared columns to eliminate header duplication.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Zero Common (k = 0)</span>
              <strong className="text-white text-xs block font-mono">R ⨝ S ≡ R × S</strong>
              <p className="text-[11px] text-slate-400">If no columns match, degenerates into Cartesian Product.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Identical Schema</span>
              <strong className="text-white text-xs block font-mono">R ⨝ S ≡ R ∩ S</strong>
              <p className="text-[11px] text-slate-400">If schemas match 100%, degenerates into Set Intersection.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Natural Join Schema Merging Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Natural Join Header Merging (3 Cols + 3 Cols − 1 Shared = 5 Cols)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Natural Join Schema Merging Diagram"
            >
              {/* Students Table */}
              <g transform="translate(30, 20)">
                <rect width="200" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="200" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="100" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Students (Degree = 3)</text>
                <text x="15" y="42" fill="#f59e0b" fontWeight="bold">student_id (PK)</text>
                <text x="15" y="60" fill="#cbd5e1">full_name</text>
                <text x="15" y="78" fill="#cbd5e1">city</text>
              </g>

              {/* Bowtie Symbol */}
              <g transform="translate(250, 50)">
                <circle cx="20" cy="15" r="18" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="20" y="20" fill="#f59e0b" textAnchor="middle" fontSize="16" fontWeight="bold">⨝</text>
              </g>

              {/* Enrollments Table */}
              <g transform="translate(310, 20)">
                <rect width="200" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="200" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="100" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Enrollments (Degree = 3)</text>
                <text x="15" y="42" fill="#f59e0b" fontWeight="bold">student_id (FK)</text>
                <text x="15" y="60" fill="#cbd5e1">course_id</text>
                <text x="15" y="78" fill="#cbd5e1">grade</text>
              </g>

              {/* Arrow */}
              <g transform="translate(525, 60)">
                <path d="M 0,5 L 30,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="30,1 40,5 30,9" fill="#64748b" />
              </g>

              {/* Merged Output */}
              <g transform="translate(580, 20)">
                <rect width="170" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="170" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="85" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Output (Degree = 5)</text>
                <text x="10" y="42" fill="#f59e0b" fontWeight="bold">1. student_id [Merged]</text>
                <text x="10" y="58" fill="#cbd5e1">2. full_name, 3. city</text>
                <text x="10" y="74" fill="#cbd5e1">4. course_id, 5. grade</text>
                <text x="10" y="90" fill="#10b981" fontSize="9">Zero Duplicate Columns!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Natural Join Sandbox ────────── */}
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
                Interactive Natural Join &amp; Schema Merging Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between 2-table merging, 3-table chaining, and the accidental common column trap
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setActiveTab("two_table");
                  setEngineLog("✓ Evaluated 2-Table Natural Join: Students ⨝ Enrollments on common key {student_id}. Output degree reduced to 5 columns.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  activeTab === "two_table"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. 2-Table Join (Students ⨝ Enrollments)
              </button>

              <button
                onClick={() => {
                  setActiveTab("three_table");
                  setEngineLog("✓ Evaluated 3-Table Chained Join: Students ⨝ Enrollments ⨝ Courses. Merged 3 tables into unified 7-column student course profile.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  activeTab === "three_table"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. 3-Table Chained Join (⨝ Courses)
              </button>

              <button
                onClick={() => {
                  setActiveTab("trap");
                  setEngineLog("⚠️ Accidental Common Column Trap Triggered: Both tables have a 'status' column ('Active' vs 'Paid'). Natural Join attempted s.status = e.status, dropping all rows!");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  activeTab === "trap"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. The Accidental Column Trap (Status)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    {activeTab === "two_table"
                      ? "2-Table Schema Merging:"
                      : activeTab === "three_table"
                      ? "3-Table Chained Join:"
                      : "The Accidental Column Pitfall:"}
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {activeTab === "two_table" ? twoTableMath : activeTab === "three_table" ? threeTableMath : trapMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {activeTab === "two_table" ? twoTableSQL : activeTab === "three_table" ? threeTableSQL : trapSQL}
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
                    <span>
                      {activeTab === "two_table"
                        ? `Merged 2-Table Result (${twoTableResults.length} rows, 5 cols)`
                        : activeTab === "three_table"
                        ? `Merged 3-Table Result (${threeTableResults.length} rows, 7 cols)`
                        : `Trap Result (${trapResults.length} rows - Accidental Filter)`}
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {activeTab === "two_table" && (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">student_id</th>
                              <th className="p-1.5">full_name</th>
                              <th className="p-1.5">city</th>
                              <th className="p-1.5">course_id</th>
                              <th className="p-1.5">grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {twoTableResults.map((r, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-cyan-300 font-bold">#{r.student_id}</td>
                                <td className="p-1.5 text-white font-bold">{r.full_name}</td>
                                <td className="p-1.5 text-emerald-300">{r.city}</td>
                                <td className="p-1.5 text-amber-300">#{r.course_id}</td>
                                <td className="p-1.5 text-slate-400">{r.grade}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {activeTab === "three_table" && (
                        <>
                          <thead className="bg-slate-950 text-emerald-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">student_id</th>
                              <th className="p-1.5">full_name</th>
                              <th className="p-1.5">course_title</th>
                              <th className="p-1.5">fee</th>
                              <th className="p-1.5">grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {threeTableResults.map((r, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-cyan-300 font-bold">#{r.student_id}</td>
                                <td className="p-1.5 text-white font-bold">{r.full_name}</td>
                                <td className="p-1.5 text-emerald-300">{r.course_title}</td>
                                <td className="p-1.5 text-amber-300">₹{r.fee}</td>
                                <td className="p-1.5 text-slate-400">{r.grade}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {activeTab === "trap" && (
                        <>
                          <thead className="bg-slate-950 text-rose-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">student_id</th>
                              <th className="p-1.5">full_name</th>
                              <th className="p-1.5">status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            <tr>
                              <td colSpan={3} className="p-4 text-center text-rose-400 italic">
                                ∅ Zero Rows Returned! ('Active' in Students ≠ 'Paid' in Enrollments)<br />
                                Solution: Use `JOIN ... USING (student_id)`
                              </td>
                            </tr>
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
                Academy enrollment profiles and course catalog chaining from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Clean Student Enrollment Schema Merging
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\Students \\bowtie \Enrollments$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT * FROM students
JOIN enrollments USING (student_id);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's 3-Tier Chained Course Directory
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\full_name, course_title, fee}(\Students \\bowtie \Enrollments \\bowtie \Courses)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, c.course_title, c.fee
FROM students s
JOIN enrollments e USING (student_id)
JOIN courses c USING (course_id);`}
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
                Avoid accidental common column matches and prefer explicit JOIN USING in production
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
                  <strong className="text-white">1. Accidental Column Matching:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Tables sharing columns like <code>status</code> or <code>created_at</code> cause unexpected equality filters and dropped rows.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Schema Migration Vulnerability:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Adding a column in a migration can silently break existing <code>NATURAL JOIN</code> queries without syntax errors.
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
                  <strong className="text-white">1. Prefer JOIN ... USING:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>JOIN ... USING (student_id)</code> provides the clean single-column output of Natural Join with explicit safety.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Standardized Key Naming:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use identical names for primary and foreign keys (e.g. <code>student_id</code> in both tables) for clean relational mappings.
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
              <span>Natural Join (⨝) performs implicit Equijoin on all common attribute names</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree formula: `Degree(R ⨝ S) = Degree(R) + Degree(S) − k`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Output schema merges common columns into ONE single attribute</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>If no columns match ($k = 0$), Natural Join degenerates to Cartesian Product ($R \times S$)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>If schemas match 100%, Natural Join degenerates to Set Intersection ($R \cap S$)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always prefer `JOIN ... USING (col)` in production codebases for explicit safety</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Natural Join (⨝) Mechanics – FAQs"
            questions={questions}
            subtitle="Master relational natural joins, schema header coalescence, degree formulas, multi-table chaining, and the accidental common column trap with 30 comprehensive Q&As"
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
            title="Natural Join (⨝) Mechanics, Common Attributes, and Schema Merging"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_natural_join_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Natural Join ($\\bowtie$) is the purest expression of relational elegance! " +
              "In my classes in Barrackpore, I teach students the core mathematical distinction between Equijoin and Natural Join: " +
              "An Equijoin keeps both key columns (`Students.id` and `Enrollments.id`), whereas a Natural Join merges them into a single column. " +
              "However, every software architect must know the Accidental Column Trap: " +
              "If both tables have a generic column like `status` or `created_at`, `NATURAL JOIN` will try to match on those columns as well, " +
              "silently dropping valid rows! " +
              "That is why in professional production SQL, we prefer `JOIN ... USING (student_id)`. " +
              "It gives you the clean merged schema of a Natural Join while explicitly locking down the exact join key."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · Natural Join Mechanics · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
