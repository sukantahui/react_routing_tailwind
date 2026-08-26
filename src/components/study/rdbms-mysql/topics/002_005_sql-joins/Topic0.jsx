import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding Cartesian Products and the Mechanism of Joining Tables
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Cartesian Product & Join Pipeline Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Pipeline State: 1 = Raw Tables, 2 = Cartesian Product (Stage 1), 3 = Predicate Filtered (Stage 2)
  const [pipelineStage, setPipelineStage] = useState(1);

  const studentsTable = [
    { sId: "101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101" },
    { sId: "102", sName: "Debangshu Roy", city: "Kolkata", cId: "C102" },
    { sId: "103", sName: "Abhronila Das", city: "Ichapur", cId: "C101" },
  ];

  const coursesTable = [
    { cId: "C101", title: "MySQL Master", fee: "₹4,500" },
    { cId: "C102", title: "React Architect", fee: "₹5,500" },
  ];

  // Cartesian Product Candidate Rows
  const cartesianCandidateRows = [
    { sId: "101", sName: "Mamata Hui", city: "Barrackpore", sCid: "C101", cCid: "C101", title: "MySQL Master", fee: "₹4,500", isMatch: true },
    { sId: "101", sName: "Mamata Hui", city: "Barrackpore", sCid: "C101", cCid: "C102", title: "React Architect", fee: "₹5,500", isMatch: false },
    { sId: "102", sName: "Debangshu Roy", city: "Kolkata", sCid: "C102", cCid: "C101", title: "MySQL Master", fee: "₹4,500", isMatch: false },
    { sId: "102", sName: "Debangshu Roy", city: "Kolkata", sCid: "C102", cCid: "C102", title: "React Architect", fee: "₹5,500", isMatch: true },
    { sId: "103", sName: "Abhronila Das", city: "Ichapur", sCid: "C101", cCid: "C101", title: "MySQL Master", fee: "₹4,500", isMatch: true },
    { sId: "103", sName: "Abhronila Das", city: "Ichapur", sCid: "C101", cCid: "C102", title: "React Architect", fee: "₹5,500", isMatch: false },
  ];

  const filteredRows = cartesianCandidateRows.filter((r) => r.isMatch);

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
            Module 002_005 · SQL Joins · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Cartesian Products &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              The Mechanism of Joining Tables
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the fundamental mathematical engine of SQL joins: the 3-stage logical processing pipeline (Cartesian Product ➔ ON Filter ➔ Outer Preservation),
            preventing accidental Cartesian explosions, and understanding MySQL physical join algorithms.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Cartesian Product: R1 × R2 (M × N Rows)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ The 3-Stage Logical Join Pipeline
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Nested-Loop &amp; Hash Join Engines
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Preventing Accidental Explosions
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Cartesian Product & 3-Stage Pipeline ───── */}
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
                The Cartesian Product (R1 × R2) &amp; The 3-Stage Join Engine
              </h2>
              <p className="text-xs text-slate-400">
                Every relational join is mathematically a selection filter over a Cartesian Product ($R_1 \bowtie_\theta R_2 = \sigma_\theta(R_1 \times R_2)$)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Stage 1: Cartesian Product</span>
              <strong className="text-white text-xs block font-mono">R1 × R2 (M × N Rows)</strong>
              <p className="text-[11px] text-slate-400">Conceptually generates every possible pairing between Left and Right rows.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Stage 2: ON Filter</span>
              <strong className="text-white text-xs block font-mono">ON s.course_id = c.course_id</strong>
              <p className="text-[11px] text-slate-400">Evaluates the join condition and discards false/null candidate rows.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Stage 3: Outer Preservation</span>
              <strong className="text-white text-xs block font-mono">LEFT / RIGHT / FULL OUTER</strong>
              <p className="text-[11px] text-slate-400">Appends unmatched rows with NULLs for outer join queries.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: The 3-Stage Logical Join Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3-Stage Logical SQL Join Execution Pipeline
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="3-Stage Join Pipeline Diagram"
            >
              {/* Stage 1 Box */}
              <g transform="translate(15, 20)">
                <rect width="210" height="100" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <rect width="210" height="24" rx="8" fill="#0f172a" stroke="#06b6d4" />
                <text x="105" y="16" fill="#06b6d4" textAnchor="middle" fontWeight="bold">Stage 1: Cartesian Product</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="10">Table A (3) × Table B (2)</text>
                <text x="12" y="65" fill="#38bdf8" fontSize="10">Generates 6 Candidate Tuples</text>
                <text x="12" y="85" fill="#94a3b8" fontSize="9">Total Attributes: deg(A) + deg(B)</text>
              </g>

              {/* Arrow */}
              <g transform="translate(235, 60)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="35,5 48,10 35,15" fill="#38bdf8" />
              </g>

              {/* Stage 2 Box */}
              <g transform="translate(290, 20)">
                <rect width="220" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="220" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Stage 2: ON Predicate Filter</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="10">Evaluate: A.course_id = B.course_id</text>
                <text x="12" y="65" fill="#10b981" fontSize="10">3 Matches Retained (TRUE)</text>
                <text x="12" y="85" fill="#fca5a5" fontSize="9">3 Mismatches Dropped (FALSE/NULL)</text>
              </g>

              {/* Arrow */}
              <g transform="translate(520, 60)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="35,5 48,10 35,15" fill="#38bdf8" />
              </g>

              {/* Stage 3 Box */}
              <g transform="translate(565, 20)">
                <rect width="200" height="100" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="200" height="24" rx="8" fill="#0f172a" stroke="#818cf8" />
                <text x="100" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold">Stage 3: Result Assembly</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="10">INNER: Return Matched Rows</text>
                <text x="12" y="65" fill="#c084fc" fontSize="10">OUTER: Append NULL rows</text>
                <text x="12" y="85" fill="#a7f3d0" fontSize="9" fontWeight="bold">Output: Final SQL Dataset</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Pipeline Sandbox ───────────── */}
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
                Interactive Cartesian Product &amp; Join Pipeline Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Step through the 3 logical join stages to observe intermediate Cartesian tuple generation and predicate filtering
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Step Controls */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPipelineStage(1)}
                className={clsx(
                  "py-2.5 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  pipelineStage === 1
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 1: Raw Tables (3 × 2)
              </button>

              <button
                onClick={() => setPipelineStage(2)}
                className={clsx(
                  "py-2.5 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  pipelineStage === 2
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 2: Cartesian (6 Rows)
              </button>

              <button
                onClick={() => setPipelineStage(3)}
                className={clsx(
                  "py-2.5 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  pipelineStage === 3
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                Step 3: ON Filtered (3 Rows)
              </button>
            </div>

            {/* Sandbox Views */}
            {pipelineStage === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Students Table */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                  <span className="text-xs font-bold text-teal-400 block font-mono">Table A: students (3 Rows)</span>
                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">student_id</th>
                        <th className="p-1.5">name</th>
                        <th className="p-1.5">course_id</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {studentsTable.map((s, i) => (
                        <tr key={i}>
                          <td className="p-1.5 text-white font-bold">{s.sId}</td>
                          <td className="p-1.5 text-cyan-300">{s.sName}</td>
                          <td className="p-1.5 text-amber-300">{s.cId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Courses Table */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 block font-mono">Table B: courses (2 Rows)</span>
                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">course_id</th>
                        <th className="p-1.5">title</th>
                        <th className="p-1.5">fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {coursesTable.map((c, i) => (
                        <tr key={i}>
                          <td className="p-1.5 text-amber-300 font-bold">{c.cId}</td>
                          <td className="p-1.5 text-slate-300">{c.title}</td>
                          <td className="p-1.5 text-emerald-300">{c.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {pipelineStage === 2 && (
              <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white font-mono">Stage 1 Result: Full Cartesian Product (3 × 2 = 6 Rows)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    SELECT * FROM students CROSS JOIN courses
                  </span>
                </div>
                <table className="w-full text-left text-xs font-mono text-slate-300">
                  <thead className="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900">
                    <tr>
                      <th className="p-1.5">s.student_id</th>
                      <th className="p-1.5">s.name</th>
                      <th className="p-1.5">s.course_id</th>
                      <th className="p-1.5">c.course_id</th>
                      <th className="p-1.5">c.title</th>
                      <th className="p-1.5">c.fee</th>
                      <th className="p-1.5">ON Condition Match?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-[11px]">
                    {cartesianCandidateRows.map((r, i) => (
                      <tr key={i} className={clsx(r.isMatch ? "bg-emerald-500/10" : "bg-slate-950/40")}>
                        <td className="p-1.5 text-white">{r.sId}</td>
                        <td className="p-1.5 text-cyan-300">{r.sName}</td>
                        <td className="p-1.5 text-amber-300 font-bold">{r.sCid}</td>
                        <td className="p-1.5 text-amber-300 font-bold">{r.cCid}</td>
                        <td className="p-1.5 text-slate-300">{r.title}</td>
                        <td className="p-1.5 text-emerald-300">{r.fee}</td>
                        <td className="p-1.5">
                          {r.isMatch ? (
                            <span className="text-emerald-400 font-bold">✓ MATCH (TRUE)</span>
                          ) : (
                            <span className="text-rose-400">✗ MISMATCH (FALSE)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {pipelineStage === 3 && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white font-mono">Stage 2 Result: INNER JOIN (3 Matched Rows)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    SELECT * FROM students s JOIN courses c ON s.course_id = c.course_id
                  </span>
                </div>
                <table className="w-full text-left text-xs font-mono text-slate-300">
                  <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                    <tr>
                      <th className="p-1.5">student_id</th>
                      <th className="p-1.5">name</th>
                      <th className="p-1.5">city</th>
                      <th className="p-1.5">course_id</th>
                      <th className="p-1.5">title</th>
                      <th className="p-1.5">fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-[11px]">
                    {filteredRows.map((r, i) => (
                      <tr key={i}>
                        <td className="p-1.5 text-white font-bold">{r.sId}</td>
                        <td className="p-1.5 text-cyan-300 font-bold">{r.sName}</td>
                        <td className="p-1.5 text-slate-300">{r.city}</td>
                        <td className="p-1.5 text-amber-300">{r.sCid}</td>
                        <td className="p-1.5 text-slate-200">{r.title}</td>
                        <td className="p-1.5 text-emerald-300 font-bold">{r.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                How Barrackpore and Kolkata training institutes use joins and intentional Cartesian matrices
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Roster &amp; Course Enrollment Join
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Executing an explicit ANSI <code>INNER JOIN</code> with table aliases and price formatting in ₹:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Clean ANSI INNER JOIN Query:
SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    c.course_fee
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Product Size &amp; Color Matrix Generator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using an intentional <code>CROSS JOIN</code> to generate all SKU variants:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Intentional SKU Variant Matrix:
SELECT 
    p.product_name,
    sz.size_label,
    clr.color_name,
    CONCAT(p.sku_prefix, '-', sz.size_code, '-', clr.color_code) AS full_sku
FROM products p
CROSS JOIN product_sizes sz
CROSS JOIN product_colors clr
WHERE p.product_id = 'TSHIRT101';`}
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
                Guidelines for writing high-performance SQL join queries and avoiding server lockups
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
                  <strong className="text-white">1. Missing Join Predicate (Cartesian Explosion):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM tableA, tableB</code> without an <code>ON</code> condition creates millions of unwanted rows.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unqualified Ambiguous Column Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Selecting <code>id</code> without specifying <code>a.id</code> or <code>b.id</code> throws MySQL Error 1052.
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
                  <strong className="text-white">1. Always Use Explicit ANSI JOIN ... ON Syntax:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Avoid legacy comma joins; explicit <code>JOIN ... ON</code> syntax makes join logic clear and readable.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Index Foreign Key Join Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure foreign keys have B-Tree indexes to enable $O(1)$ Nested-Loop index lookups.
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
              <span>Cartesian Product (R1 × R2): Multiplies row counts (M × N) and sums column counts (d1 + d2)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Every join is logically: Cartesian Product ➔ ON Filter ➔ Outer Preservation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CROSS JOIN is the explicit ANSI syntax for a Cartesian Product</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL executes joins physically via Nested-Loop Joins and Hash Joins (MySQL 8.0+)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always qualify column names with table aliases to prevent ambiguity errors</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always create B-Tree indexes on foreign key join columns for sub-millisecond query latency</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Cartesian Products &amp; Join Mechanics – FAQs"
            questions={questions}
            subtitle="Master Cartesian products, the 3-stage logical join pipeline, ON predicate filtering, Nested-Loop and Hash Join engines, and accidental explosion prevention with 30 comprehensive Q&As"
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
            title="Understanding Cartesian Products and the Mechanism of Joining Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_cartesian_products_and_join_mechanics_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding the Cartesian Product is the secret to mastering all SQL joins! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students to visualize every join as a 3-step assembly line: " +
              "First, the database conceptually combines every student with every course ($M \\times N$). " +
              "Second, the `ON` clause acts like a security guard, allowing only rows where student course ID equals course ID to pass through. " +
              "Third, if it is an outer join, it adds back any unmatched students with NULLs. " +
              "Once you see this 3-stage pipeline clearly in your mind, INNER, LEFT, RIGHT, and FULL joins become completely transparent and easy to master!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Cartesian Products &amp; Join Mechanics · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
