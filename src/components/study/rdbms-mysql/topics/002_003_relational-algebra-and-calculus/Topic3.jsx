import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Rename Operator (ρ) for Relations and Attributes
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Rename & Self-Join Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Rename Sandbox State
  const [activeMode, setActiveMode] = useState("mentor"); // "mentor" | "pairs"

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", mentorId: null },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", mentorId: 101 },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", mentorId: 101 },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", mentorId: 103 },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", mentorId: 102 },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Rename Operator Engine Active. Select between Mentor Self-Join and Pairwise Same-City Matcher to inspect ρ alias disambiguation."
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

  // 1. Compute Mentor Self-Join results: Students ⨝_{mentor_id = M.student_id} ρ_M(Students)
  const mentorResults = students.map((s) => {
    const mentor = students.find((m) => m.id === s.mentorId);
    return {
      studentId: s.id,
      studentName: s.name,
      city: s.city,
      mentorName: mentor ? mentor.name : "None (Head Mentor)",
    };
  });

  // 2. Compute Pairwise same-city results: ρ_S1(Students) ⨝_{S1.city = S2.city ∧ S1.id < S2.id} ρ_S2(Students)
  const pairResults = [];
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      if (students[i].city === students[j].city) {
        pairResults.push({
          city: students[i].city,
          student1: students[i].name,
          student2: students[j].name,
        });
      }
    }
  }

  const mentorMath = "π_{Students.name, M.name}(Students ⨝_{Students.mentor_id = M.id} ρ_M(Students))";
  const mentorSQL = `SELECT s.full_name AS student_name, COALESCE(m.full_name, 'None') AS mentor_name\nFROM students s\nLEFT JOIN students m ON s.mentor_id = m.student_id;`;

  const pairMath = "π_{S1.name, S2.name, S1.city}(σ_{S1.city = S2.city ∧ S1.id < S2.id}(ρ_S1(Students) × ρ_S2(Students)))";
  const pairSQL = `SELECT s1.full_name AS student_1, s2.full_name AS student_2, s1.city\nFROM students s1\nJOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Rename Operator (ρ) for{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relations and Attributes
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of identifier renaming in relational algebra: unary Rename (ρ), relation aliasing,
            positional attribute renaming, self-join disambiguation, and SQL table/column alias (`AS`) mechanics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏷️ Relation Renaming: ρ_S(R)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📋 Attribute Renaming: ρ_S(B1..Bn)(R)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Disambiguating Self-Joins
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL Equivalent: AS Keyword
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Foundation & Syntax ─────────── */}
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
                Rename Operator (ρ) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                The 3 syntactic forms of renaming, self-join mechanics, and zero runtime cost
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Relation Rename</span>
              <strong className="text-white text-xs block font-mono">ρ_S(R)</strong>
              <p className="text-[11px] text-slate-400">Renames relation $R$ to $S$. Attributes remain identical.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Full Schema Rename</span>
              <strong className="text-white text-xs block font-mono">ρ_S(B1, B2, ... Bn)(R)</strong>
              <p className="text-[11px] text-slate-400">Renames relation to $S$ and all $n$ columns positionally.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Attribute Only</span>
              <strong className="text-white text-xs block font-mono">ρ_new/old(R)</strong>
              <p className="text-[11px] text-slate-400">Renames an individual attribute without changing relation name.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Rename & Self-Join Disambiguation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Disambiguating Self-Joins via the Rename Operator (ρ)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Rename Self Join Diagram"
            >
              {/* Students (Learner Instance) */}
              <g transform="translate(30, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="105" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Students (Instance 1: s)</text>
                <text x="15" y="42" fill="#10b981">PK: s.student_id INT</text>
                <text x="15" y="60" fill="#cbd5e1">s.full_name VARCHAR</text>
                <text x="15" y="78" fill="#f59e0b">FK: s.mentor_id INT</text>
              </g>

              {/* Bowtie Self-Join */}
              <g transform="translate(260, 50)">
                <circle cx="25" cy="15" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="25" y="20" fill="#f59e0b" textAnchor="middle" fontSize="14" fontWeight="bold">⨝</text>
                <text x="25" y="48" fill="#cbd5e1" textAnchor="middle" fontSize="8">s.mentor_id = m.student_id</text>
              </g>

              {/* Renamed Mentor Instance */}
              <g transform="translate(330, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">ρ_m(Students) (Instance 2: m)</text>
                <text x="15" y="42" fill="#10b981">PK: m.student_id INT</text>
                <text x="15" y="60" fill="#cbd5e1">m.full_name (Mentor Name)</text>
                <text x="15" y="78" fill="#94a3b8">m.city, m.course...</text>
              </g>

              {/* Output Result */}
              <g transform="translate(570, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="90" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Disambiguated Output</text>
                <text x="10" y="42" fill="#38bdf8">student_name</text>
                <text x="10" y="60" fill="#10b981">mentor_name</text>
                <text x="10" y="78" fill="#cbd5e1">Zero Name Collision!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Rename & Self-Join Simulator ── */}
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
                Interactive Rename &amp; Self-Join Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between Mentor Self-Join and Pairwise Same-City Matcher to inspect alias resolution
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveMode("mentor");
                  setEngineLog("✓ Applied Mentor Self-Join: Students ⨝_{mentor_id = m.id} ρ_m(Students). Disambiguated student and mentor names!");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeMode === "mentor"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Mentor Self-Join (Hierarchy Lookup)
              </button>
              <button
                onClick={() => {
                  setActiveMode("pairs");
                  setEngineLog("✓ Applied Pairwise Matcher: ρ_s1(Students) × ρ_s2(Students) with s1.city = s2.city and s1.id < s2.id. Generated non-symmetric peer pairs!");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  activeMode === "pairs"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Pairwise Same-City Peer Matcher
              </button>
            </div>

            {/* Sandbox Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Notation & SQL */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    {activeMode === "mentor" ? "Mentor Self-Join Query Breakdown:" : "Pairwise Peer Matcher Breakdown:"}
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {activeMode === "mentor" ? mentorMath : pairMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {activeMode === "mentor" ? mentorSQL : pairSQL}
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
                    {activeMode === "mentor" ? (
                      <span>Student-Mentor Directory ({mentorResults.length} records)</span>
                    ) : (
                      <span>Same-City Peer Pairs ({pairResults.length} distinct pairs)</span>
                    )}
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      {activeMode === "mentor" ? (
                        <>
                          <thead className="bg-slate-950 text-amber-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">Student (s)</th>
                              <th className="p-1.5">City</th>
                              <th className="p-1.5">Assigned Mentor (m)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {mentorResults.map((row) => (
                              <tr key={row.studentId}>
                                <td className="p-1.5 text-white font-bold">{row.studentName}</td>
                                <td className="p-1.5 text-slate-400">{row.city}</td>
                                <td className={clsx("p-1.5 font-bold", row.mentorName.startsWith("None") ? "text-amber-400" : "text-emerald-300")}>
                                  {row.mentorName}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <>
                          <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold border-b border-slate-800 font-mono">
                            <tr>
                              <th className="p-1.5">City (Same)</th>
                              <th className="p-1.5">Peer 1 (s1)</th>
                              <th className="p-1.5">Peer 2 (s2)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                            {pairResults.map((pair, idx) => (
                              <tr key={idx}>
                                <td className="p-1.5 text-emerald-300 font-bold">{pair.city}</td>
                                <td className="p-1.5 text-white">{pair.student1}</td>
                                <td className="p-1.5 text-cyan-300">{pair.student2}</td>
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
                Academy student mentorship hierarchies and peer pairing from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Mentorship Hierarchy Self-Join
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\\text{s.name, m.name}}(\\text{Students } s \\bowtie_{\\text{s.mentor_id} = \\text{m.id}} \\rho_m(\\text{Students}))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name AS student_name, COALESCE(m.full_name, 'Head Mentor') AS mentor_name
FROM students s
LEFT JOIN students m ON s.mentor_id = m.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Peer Group Generator by City
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{S_1.\\text{name}, S_2.\\text{name}}(\\sigma_{S_1.\\text{city} = S_2.\\text{city} \\land S_1.\\text{id} < S_2.\\text{id}}(\\rho_{S_1}(\\text{Students}) \\times \\rho_{S_2}(\\text{Students})))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s1.full_name AS peer_1, s2.full_name AS peer_2, s1.city
FROM students s1
JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;`}
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
                Avoid ambiguous self-join collisions and using single-letter unreadable aliases in production
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
                  <strong className="text-white">1. Self-Join without Aliases:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM students JOIN students</code> fails with MySQL Error 1066: Not unique table/alias.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Symmetric Pair Duplication:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>s1.id != s2.id</code> creates symmetric duplicate pairs (A-B and B-A). Use <code>s1.id &lt; s2.id</code>.
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
                  <strong className="text-white">1. Meaningful Aliases:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use semantic aliases (e.g. <code>emp</code>, <code>mgr</code>, <code>sender</code>, <code>receiver</code>) for clear code maintenance.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Always Alias Derived Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Every subquery in a <code>FROM</code> clause must have an explicit alias in MySQL to prevent Error 1248.
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
              <span>Rename Operator (ρ) is a unary identity operator: `ρ_S(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Positional renaming `ρ_S(B1..Bn)(R)` must match exact relation arity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Essential for self-joins and recursive relationship disambiguation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Maps directly to the SQL `AS` keyword for table and column aliases</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `s1.id &lt; s2.id` to prevent self-pairing and symmetric duplicate combinations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Incurs zero runtime computation cost (resolved at compile time in catalog)</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Rename Operator (ρ) – FAQs"
            questions={questions}
            subtitle="Master relational renaming syntax, self-joins, attribute disambiguation, SQL table and column aliases (AS), and pairwise combinations with 30 comprehensive Q&As"
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
            title="Rename Operator (ρ) for Relations and Attributes"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_rename_operator_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Rename operator ($\\rho$) may look simple, but it solves one of the most critical challenges in relational modeling: disambiguation! " +
              "In my classes in Barrackpore, whenever students need to query a table against itself—like finding which student mentors which student—they " +
              "encounter column collision errors. " +
              "By creating an alias instance $\\rho_M(\\text{Students})$, you give your query engine a second distinct handle to traverse recursive relationships. " +
              "And in pairwise queries, using $S_1.\\text{id} < S_2.\\text{id}$ is the golden rule that guarantees clean, non-duplicated pair matching. " +
              "Mastering $\\rho$ is the key to mastering self-joins and recursive graph queries in SQL!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · Rename Operator (ρ) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
