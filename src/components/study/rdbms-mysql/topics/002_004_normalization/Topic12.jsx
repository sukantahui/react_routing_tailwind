import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Multi-valued Dependencies (MVD) & Fourth Normal Form (4NF) Overview
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 4NF Cartesian Explosion Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive 4NF Simulator State
  const [courseCount, setCourseCount] = useState(2); // 2 or 3
  const [hobbyCount, setHobbyCount] = useState(2); // 2 or 3

  const coursesList = ["MySQL Master", "React Architect", "Cloud DevOps"].slice(0, courseCount);
  const hobbiesList = ["Chess", "Photography", "Cricket"].slice(0, hobbyCount);

  // Cartesian Cross-Product
  const unnormalizedTuples = [];
  coursesList.forEach((c) => {
    hobbiesList.forEach((h) => {
      unnormalizedTuples.push({ instructor: "Sukanta Hui", course: c, hobby: h });
    });
  });

  const totalUnnormalizedRows = unnormalizedTuples.length;
  const total4NFRows = coursesList.length + hobbiesList.length;

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
            Module 002_004 · Database Normalization · Topic 12
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Multi-valued Dependencies (MVD) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Fourth Normal Form (4NF)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematics of Multi-valued Dependencies (X ↠ Y), Fagin's Lossless Join Theorem,
            eliminating Cartesian tuple multiplication, and decomposing independent multi-valued facts into pristine 4NF schemas.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌀 Multi-valued Dependency (X ↠ Y | Z)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Cartesian Explosion (M × N Tuples)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Fagin's Lossless Join Theorem
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪜 4NF Additive Storage (M + N)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: MVD & 4NF Mathematical Mechanics ───────── */}
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
                The Mechanics of Multi-valued Dependencies (MVD) &amp; 4NF
              </h2>
              <p className="text-xs text-slate-400">
                Why independent multi-valued attributes create multiplicative row explosion in BCNF relations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">The 4NF Flaw: Independent MVDs</span>
              <strong className="text-white text-xs block font-mono">{"X ↠ Y  and  X ↠ Z  (in same table)"}</strong>
              <p className="text-xs text-slate-300">
                When an entity has two independent one-to-many relationships (e.g. an instructor has courses and hobbies), storing them together forces every course to be paired with every hobby (M × N rows).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The 4NF Solution: Binary Decomposition</span>
              <strong className="text-white text-xs block font-mono">{"R1(X, Y)  and  R2(X, Z)"}</strong>
              <p className="text-xs text-slate-300">
                By Fagin's Theorem, decomposing into two independent binary tables completely eliminates cross-multiplication, dropping storage from M × N down to M + N rows!
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Cartesian Explosion Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Multi-valued Dependency Cartesian Explosion vs 4NF Additive Decomposition
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="4NF Cartesian Explosion Diagram"
            >
              {/* Unnormalized Table */}
              <g transform="translate(20, 20)">
                <rect width="260" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="260" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="130" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">BCNF Table (Violates 4NF)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="10">2 Courses × 2 Hobbies = 4 Tuples</text>
                <text x="15" y="65" fill="#fca5a5" fontSize="10">3 Courses × 3 Hobbies = 9 Tuples ❌</text>
                <text x="15" y="85" fill="#f43f5e" fontSize="9" fontWeight="bold">Cartesian Explosion: M × N Rows</text>
              </g>

              {/* Arrow */}
              <g transform="translate(295, 60)">
                <line x1="0" y1="10" x2="50" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="50,5 65,10 50,15" fill="#10b981" />
                <text x="30" y="-5" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">4NF CURE</text>
              </g>

              {/* 4NF Table 1 */}
              <g transform="translate(380, 10)">
                <rect width="180" height="55" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="180" height="18" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="13" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="9">Instructor_Courses (4NF)</text>
                <text x="10" y="34" fill="#cbd5e1" fontSize="9">(Sukanta, MySQL)</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">(Sukanta, React) ➔ 2 Rows</text>
              </g>

              {/* 4NF Table 2 */}
              <g transform="translate(380, 75)">
                <rect width="180" height="55" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="180" height="18" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="13" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="9">Instructor_Hobbies (4NF)</text>
                <text x="10" y="34" fill="#cbd5e1" fontSize="9">(Sukanta, Chess)</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">(Sukanta, Photo) ➔ 2 Rows</text>
              </g>

              {/* Additive Scale Tag */}
              <g transform="translate(585, 30)">
                <rect width="175" height="80" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="87" y="20" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">4NF STORAGE WIN:</text>
                <text x="15" y="42" fill="#cbd5e1" fontSize="9">Total 4NF Rows: M + N</text>
                <text x="15" y="58" fill="#a7f3d0" fontSize="9">3 + 3 = 6 Rows (vs 9 Rows)</text>
                <text x="15" y="72" fill="#10b981" fontSize="9" fontWeight="bold">Zero Tuple Cross-Multiplication</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 4NF Simulator Sandbox ──────── */}
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
                Interactive 4NF Cartesian Explosion Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle the number of independent courses and hobbies to watch the Cartesian row explosion and its clean 4NF resolution
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Dynamic Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Courses Taught (M):</span>
                <button
                  onClick={() => setCourseCount(2)}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-bold border transition-all",
                    courseCount === 2
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  2 Courses
                </button>
                <button
                  onClick={() => setCourseCount(3)}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-bold border transition-all",
                    courseCount === 3
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  3 Courses (+ DevOps)
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Hobbies (N):</span>
                <button
                  onClick={() => setHobbyCount(2)}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-bold border transition-all",
                    hobbyCount === 2
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  2 Hobbies
                </button>
                <button
                  onClick={() => setHobbyCount(3)}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-bold border transition-all",
                    hobbyCount === 3
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  3 Hobbies (+ Cricket)
                </button>
              </div>
            </div>

            {/* Sandbox Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Unnormalized (0NF/BCNF) Cartesian Table */}
              <div className="space-y-4">
                <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Unnormalized Table (Violates 4NF)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      M × N = {totalUnnormalizedRows} ROWS
                    </span>
                  </div>

                  <div className="overflow-x-auto max-h-56 overflow-y-auto rounded-lg border border-slate-800">
                    <table className="w-full text-left text-xs text-slate-300 font-mono">
                      <thead className="bg-slate-900 text-rose-400 uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-1.5">instructor</th>
                          <th className="p-1.5">course_taught</th>
                          <th className="p-1.5">hobby</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 text-[11px]">
                        {unnormalizedTuples.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-white font-bold">{row.instructor}</td>
                            <td className="p-1.5 text-amber-300">{row.course}</td>
                            <td className="p-1.5 text-cyan-300">{row.hobby}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right: Decomposed 4NF Clean Tables */}
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Decomposed 4NF Tables</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      M + N = {total4NFRows} ROWS
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Table 1 */}
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                      <span className="text-teal-400 block font-bold text-[11px]">1. Instructor_Courses ({coursesList.length} rows):</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {coursesList.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px]">
                            (Sukanta, {c})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Table 2 */}
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                      <span className="text-cyan-400 block font-bold text-[11px]">2. Instructor_Hobbies ({hobbiesList.length} rows):</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {hobbiesList.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                            (Sukanta, {h})
                          </span>
                        ))}
                      </div>
                    </div>
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
                How Barrackpore and Kolkata training institutes apply 4NF normalization
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Clubs &amp; Sports 4NF Decomposition
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Separating independent multi-valued clubs from sports to eliminate cross-multiplication:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Table 1: Student Clubs:
CREATE TABLE student_clubs (
    student_id VARCHAR(10) NOT NULL,
    club_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (student_id, club_name),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Table 2: Student Sports:
CREATE TABLE student_sports (
    student_id VARCHAR(10) NOT NULL,
    sport_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (student_id, sport_name),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Employee Technical Skills &amp; Languages
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing independent skills and spoken languages into separate binary relations:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 4NF Employee Skills:
CREATE TABLE employee_skills (
    emp_id VARCHAR(10) NOT NULL,
    skill_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (emp_id, skill_name),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

-- 4NF Employee Languages:
CREATE TABLE employee_languages (
    emp_id VARCHAR(10) NOT NULL,
    language_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (emp_id, language_name),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
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
                Guidelines for detecting multi-valued dependencies and achieving Fourth Normal Form
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
                  <strong className="text-white">1. Combining Independent M:N Facts:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Putting two unrelated multi-valued attributes in one table forces an exponential M × N row multiplication.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming BCNF is the Final Normal Form:</strong>
                  <p className="text-slate-400 mt-0.5">
                    BCNF only eliminates functional dependencies; it is completely blind to multi-valued dependencies.
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
                  <strong className="text-white">1. Separate Relationship Sets in ER Models:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Model each independent multi-valued attribute as a distinct relationship set (diamond) in ER diagrams.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Fagin's Theorem for Lossless Splits:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Decompose across the MVD into two separate binary tables to guarantee lossless natural joins.
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
              <span>Multi-valued Dependency (X ↠ Y): Y depends only on X, independent of remaining columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MVDs always occur in complementary pairs (X ↠ Y | Z)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Independent multi-valued columns in one table cause Cartesian explosion (M × N rows)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>4NF Rule: For every non-trivial X ↠ Y, X MUST be a Super Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>4NF Decomposition: Split independent multi-valued facts into separate 2-column tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Reduces storage from multiplicative M × N down to additive M + N rows</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Fourth Normal Form (4NF) &amp; MVD – FAQs"
            questions={questions}
            subtitle="Master Multi-valued Dependencies (MVD), Fourth Normal Form (4NF), Cartesian tuple explosions, Fagin's Lossless Join Theorem, and binary decomposition with 30 comprehensive Q&As"
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
            title="Multi-valued Dependencies (MVD) & Fourth Normal Form (4NF) Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_4nf_mvd_overview_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Fourth Normal Form (4NF) solves one of the sneakiest traps in database modeling: the Cartesian Product trap! " +
              "In my classes at Coder & AccoTax in Barrackpore, I give students this simple example: " +
              "'If Sukanta Hui teaches 10 courses and plays 10 musical instruments, " +
              "putting both in the same table forces you to store 10 × 10 = 100 rows!' " +
              "If I learn an 11th instrument, you must insert 10 new rows into the table just to record one fact. " +
              "That is a Multi-valued Dependency (MVD) violation. " +
              "Separate courses into one table (10 rows) and instruments into another (10 rows) for a total of 20 rows. " +
              "That is Fourth Normal Form (4NF)—clean, additive, and immune to tuple multiplication!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · 4NF &amp; MVD · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
