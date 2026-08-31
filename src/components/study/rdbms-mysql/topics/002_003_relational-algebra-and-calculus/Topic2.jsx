import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Projection Operator (π) and Duplicate Elimination Mechanics
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Projection Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Projection Sandbox State
  const [selectedColumns, setSelectedColumns] = useState(["city", "course"]);
  const [isDistinctMode, setIsDistinctMode] = useState(true);

  const [studentData] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", course: "MySQL Masterclass", fee: 5500, status: "Active" },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", course: "React Architect", fee: 4800, status: "Active" },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", course: "MySQL Masterclass", fee: 5500, status: "Active" },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", course: "MySQL Masterclass", fee: 5500, status: "Active" },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: 4800, status: "Completed" },
  ]);

  const allColumns = [
    { key: "id", label: "Student ID (PK)" },
    { key: "name", label: "Full Name" },
    { key: "city", label: "City" },
    { key: "course", label: "Course" },
    { key: "fee", label: "Admission Fee (₹)" },
    { key: "status", label: "Status" },
  ];

  const [engineLog, setEngineLog] = useState(
    "Projection Operator Engine Active. Select attributes to project and toggle Set Deduplication to observe cardinality changes."
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

  const handleToggleColumn = (colKey) => {
    if (selectedColumns.includes(colKey)) {
      if (selectedColumns.length === 1) {
        setEngineLog("⚠️ Cannot project empty relation! At least one attribute must be selected.");
        return;
      }
      setSelectedColumns(selectedColumns.filter((c) => c !== colKey));
    } else {
      setSelectedColumns([...selectedColumns, colKey]);
    }
  };

  // Compute projected tuples
  const rawProjected = studentData.map((s) => {
    const row = {};
    selectedColumns.forEach((col) => {
      row[col] = s[col];
    });
    return row;
  });

  const projectedTuples = isDistinctMode
    ? rawProjected.filter(
        (val, idx, self) =>
          idx === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(val))
      )
    : rawProjected;

  const mathNotation = `π_{${selectedColumns.join(", ")}}(Students)`;
  const sqlStatement = `SELECT ${isDistinctMode ? "DISTINCT " : ""}${selectedColumns.join(", ")} FROM students;`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 2
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Projection Operator (π) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Duplicate Elimination Mechanics
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of vertical relation slicing: unary Projection (π), degree reduction,
            automatic set deduplication, and the heuristic "Push Projections Down" query optimization technique.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✂️ Vertical Slicing (Degree = k)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Mathematical Syntax: π_L(R)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL Equivalent: SELECT DISTINCT
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚀 Query Optimization: Push Projections Down
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Properties ─────────── */}
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
                Projection Operator (π) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Definition, degree reduction, automatic deduplication, and algebraic properties
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Unary Operator</span>
              <strong className="text-white text-xs block">1 Input Relation</strong>
              <p className="text-[11px] text-slate-400">Takes relation $R$ and projects a specific subset of attributes $L$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Degree Reduction</span>
              <strong className="text-white text-xs block">Degree(π_L(R)) = |L| ≤ Degree(R)</strong>
              <p className="text-[11px] text-slate-400">Output schema contains exactly the $k$ projected columns.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Set Deduplication</span>
              <strong className="text-white text-xs block">1 ≤ |π_L(R)| ≤ |R|</strong>
              <p className="text-[11px] text-slate-400">Identical projected tuples collapse automatically in set theory.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Idempotent</span>
              <strong className="text-white text-xs block">π_L1(π_L2(R)) ≡ π_L1(R)</strong>
              <p className="text-[11px] text-slate-400">Nested projections collapse if $L_1 \subseteq L_2$.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Projection & Duplicate Collapse Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Vertical Slicing &amp; Automatic Duplicate Tuple Elimination Flow
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Projection Operation Flow Diagram"
            >
              {/* Input Table */}
              <g transform="translate(30, 15)">
                <rect width="250" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="250" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="125" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Students (5 Tuples, 4 Columns)</text>
                <text x="15" y="42" fill="#cbd5e1">101, Mamata, Barrackpore, MySQL</text>
                <text x="15" y="60" fill="#cbd5e1">102, Mahima, Kolkata, React</text>
                <text x="15" y="78" fill="#f59e0b">103, Abhronila, Barrackpore, MySQL</text>
                <text x="15" y="96" fill="#cbd5e1">104, Susmita, Ichapur, MySQL</text>
              </g>

              {/* Transformation Arrow */}
              <g transform="translate(300, 65)">
                <path d="M 0,5 L 60,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="60,1 70,5 60,9" fill="#64748b" />
                <text x="35" y="-5" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">π_(city, course)</text>
              </g>

              {/* Output Table (Collapsed) */}
              <g transform="translate(390, 15)">
                <rect width="360" height="110" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="360" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="180" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Projected Set: π_(city, course) [Deduplicated]</text>
                <text x="15" y="42" fill="#10b981">✓ (Barrackpore, MySQL Masterclass) [Collapsed]</text>
                <text x="15" y="62" fill="#cbd5e1">✓ (Kolkata, React Architect)</text>
                <text x="15" y="82" fill="#cbd5e1">✓ (Ichapur, MySQL Masterclass)</text>
                <text x="15" y="100" fill="#38bdf8">Output: Degree = 2, Cardinality = 3 (Zero Duplicates)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Projection Simulator ────────── */}
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
                Interactive Projection &amp; Deduplication Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select attribute columns and toggle between pure Relational Set deduplication and SQL Bag multiset modes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column Selection Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                <span className="text-xs font-bold text-teal-400 block">
                  Select Projection Attributes L = {"{"}{selectedColumns.join(", ")}{"}"}:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {allColumns.map((col) => {
                    const isSelected = selectedColumns.includes(col.key);
                    return (
                      <button
                        key={col.key}
                        onClick={() => handleToggleColumn(col.key)}
                        className={clsx(
                          "py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all border text-left flex items-center justify-between",
                          isSelected
                            ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                        )}
                      >
                        <span>{col.label}</span>
                        <span>{isSelected ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Deduplication Toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Set Deduplication:</span>
                  <button
                    onClick={() => setIsDistinctMode(!isDistinctMode)}
                    className={clsx(
                      "py-1 px-3 rounded-lg text-xs font-bold transition-all border",
                      isDistinctMode
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    )}
                  >
                    {isDistinctMode ? "Set Mode (DISTINCT Active)" : "Bag Mode (Duplicates Kept)"}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                  <strong className="text-amber-300 block font-mono">
                    Mathematical Notation: {mathNotation}
                  </strong>
                  <strong className="text-emerald-400 block font-mono">
                    SQL: {sqlStatement}
                  </strong>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                <pre className="whitespace-pre-wrap">
                  {`✓ Projected Attributes: [${selectedColumns.join(", ")}]\n✓ Input Degree: 6 ➔ Output Degree: ${selectedColumns.length}\n✓ Input Cardinality: ${studentData.length} ➔ Output Cardinality: ${projectedTuples.length} (${isDistinctMode ? "Set Deduplication Applied" : "Bag Preserved"})`}
                </pre>
              </div>
            </div>

            {/* Live Projected Table */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Projected Result Set: π_L(Students) [{projectedTuples.length} tuples]</span>
                  <span className="text-teal-400 font-mono text-[11px]">Degree: {selectedColumns.length}</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                      <tr>
                        {selectedColumns.map((col) => (
                          <th key={col} className="p-1.5">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {projectedTuples.map((row, idx) => (
                        <tr key={idx}>
                          {selectedColumns.map((col) => (
                            <td key={col} className="p-1.5 text-white">
                              {col === "fee" ? `₹${row[col]}` : String(row[col])}
                            </td>
                          ))}
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
                Academy city directories and course catalogs from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Unique City Directory
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\city}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Pure Relational Projection in MySQL (Deduplication via DISTINCT)
SELECT DISTINCT city FROM students;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Course Title &amp; Fee Pricing Sheet
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\course_title, fee}(\Courses)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Multi-Attribute Projection in MySQL
SELECT DISTINCT course_title, fee FROM courses;`}
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
                Avoid forgetting SQL DISTINCT and using SELECT * in high-throughput production queries
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
                  <strong className="text-white">1. Forgetting SQL DISTINCT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>SELECT city FROM students</code> returns duplicate rows; pure projection requires <code>DISTINCT</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. SELECT * Anti-Pattern:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Retrieving all columns wastes I/O bandwidth, bloats network transfers, and disables covering indexes.
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
                  <strong className="text-white">1. Push Projections Down:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Discard unneeded columns early in query trees to shrink intermediate tuple widths in RAM buffers.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Utilize Covering Indexes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Covering indexes allow MySQL to satisfy projection lists entirely from B-Trees without touching table pages.
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
              <span>Projection (π) is a unary vertical slicing operator: `π_L(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree is reduced to the number of projected attributes: `Degree(π_L(R)) = |L|`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Automatic set deduplication collapses duplicate projected tuples</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `SELECT DISTINCT` in SQL to implement pure relational projection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Push projections down in query execution trees to minimize tuple byte-size in RAM</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always retain join key columns when projecting before a join operation</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Projection Operator (π) – FAQs"
            questions={questions}
            subtitle="Master vertical relation slicing, duplicate elimination mechanics, SQL SELECT DISTINCT, projection push-down optimization, and covering indexes with 30 comprehensive Q&As"
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
            title="Projection Operator (π) and Duplicate Elimination Mechanics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_projection_operator_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Projection ($\\pi$) is the vertical counterpart to Selection ($\\sigma$)! " +
              "In my classes in Barrackpore, I emphasize that in pure Relational Algebra, $\\pi_{\city}(\Students)$ " +
              "must always produce a deduplicated set of cities. " +
              "Because SQL was designed for commercial efficiency, SQL defaults to Multiset (Bag) semantics and preserves duplicates " +
              "unless you explicitly write `SELECT DISTINCT`. " +
              "When optimizing queries, pushing projections down eliminates fat columns like JSON blobs and text descriptions " +
              "before performing hash joins, saving gigabytes of InnoDB buffer pool RAM. " +
              "Combine Selection (horizontal) and Projection (vertical) to slice and dice any relational dataset with mathematical precision!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · Projection Operator (π) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
