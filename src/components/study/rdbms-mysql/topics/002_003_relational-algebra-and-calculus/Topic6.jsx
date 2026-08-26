import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Cartesian Product (Cross Product, ×) and Relational Multiplications
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Cartesian Product Matrix Explorer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Cartesian State
  const [leftSetKey, setLeftSetKey] = useState("faculty"); // "faculty" | "shirts"
  const [rightSetKey, setRightSetKey] = useState("slots"); // "slots" | "colors"

  const datasets = {
    faculty: {
      name: "Faculty",
      degree: 2,
      attributes: ["instructor_id", "instructor_name"],
      rows: [
        { id: 501, name: "Dr. Sukanta Hui" },
        { id: 502, name: "Mamata Hui" },
        { id: 503, name: "Susmita Ghosh" },
      ],
    },
    shirts: {
      name: "Shirt_Sizes",
      degree: 2,
      attributes: ["size_code", "size_label"],
      rows: [
        { id: "S", name: "Small (38)" },
        { id: "M", name: "Medium (40)" },
        { id: "L", name: "Large (42)" },
        { id: "XL", name: "X-Large (44)" },
      ],
    },
    slots: {
      name: "Exam_Slots",
      degree: 2,
      attributes: ["slot_id", "slot_time"],
      rows: [
        { id: "SL-1", name: "Morning 09:00 AM" },
        { id: "SL-2", name: "Afternoon 02:00 PM" },
        { id: "SL-3", name: "Evening 06:00 PM" },
      ],
    },
    colors: {
      name: "Colors",
      degree: 2,
      attributes: ["color_code", "color_name"],
      rows: [
        { id: "RED", name: "Crimson Red" },
        { id: "BLU", name: "Royal Blue" },
        { id: "GRN", name: "Emerald Green" },
      ],
    },
  };

  const leftRelation = datasets[leftSetKey];
  const rightRelation = datasets[rightSetKey];

  // Compute Cartesian Matrix
  const cartesianTuples = [];
  leftRelation.rows.forEach((l) => {
    rightRelation.rows.forEach((r) => {
      cartesianTuples.push({
        leftId: l.id,
        leftName: l.name,
        rightId: r.id,
        rightName: r.name,
      });
    });
  });

  const degreeResult = leftRelation.degree + rightRelation.degree;
  const cardinalityResult = leftRelation.rows.length * rightRelation.rows.length;
  const mathFormula = `${leftRelation.name} × ${rightRelation.name}`;
  const sqlQuery = `SELECT *\nFROM ${leftRelation.name.toLowerCase()}\nCROSS JOIN ${rightRelation.name.toLowerCase()};`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Cartesian Product (Cross Product, ×) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relational Multiplications
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical foundation of all relational joins: binary Cartesian Product (×), degree addition ($n + m$),
            cardinality multiplication ($|R| \cdot |S|$), the origin of Theta Joins, and accidental Cartesian explosion hazards.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ➕ Degree Addition: Deg(R × S) = n + m
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✖️ Cardinality Product: |R| × |S|
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              👑 Parent of Joins: σ_θ(R × S)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL Equivalent: CROSS JOIN
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Semantics & Properties ───────── */}
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
                Cartesian Product (×) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Formal tuple concatenation, arity addition, cardinality multiplication, and algebraic laws
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Binary Operator</span>
              <strong className="text-white text-xs block">R × S Multiplication</strong>
              <p className="text-[11px] text-slate-400">Combines every tuple of $R$ with every tuple of $S$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Degree Addition</span>
              <strong className="text-white text-xs block">Deg(R × S) = n + m</strong>
              <p className="text-[11px] text-slate-400">Attribute count equals the sum of both relations.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Cardinality</span>
              <strong className="text-white text-xs block">|R × S| = |R| · |S|</strong>
              <p className="text-[11px] text-slate-400">Total output rows equals the mathematical product.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Join Derivation</span>
              <strong className="text-white text-xs block">R ⨝_θ S ≡ σ_θ(R × S)</strong>
              <p className="text-[11px] text-slate-400">All relational joins are selections over Cartesian products.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Cartesian Multiplication Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Cartesian Multiplication &amp; Tuple Concatenation Mechanics
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Cartesian Product Flow Diagram"
            >
              {/* Left Relation (Faculty) */}
              <g transform="translate(30, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="90" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Faculty (3 Rows, 2 Cols)</text>
                <text x="10" y="42" fill="#cbd5e1">501, Dr. Sukanta Hui</text>
                <text x="10" y="60" fill="#cbd5e1">502, Mamata Hui</text>
                <text x="10" y="78" fill="#cbd5e1">503, Susmita Ghosh</text>
              </g>

              {/* Cross Product Symbol */}
              <g transform="translate(230, 50)">
                <circle cx="20" cy="15" r="18" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="20" y="20" fill="#f59e0b" textAnchor="middle" fontSize="16" fontWeight="bold">×</text>
              </g>

              {/* Right Relation (Exam Slots) */}
              <g transform="translate(290, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Exam Slots (3 Rows, 2 Cols)</text>
                <text x="10" y="42" fill="#cbd5e1">SL-1, Morning 09:00 AM</text>
                <text x="10" y="60" fill="#cbd5e1">SL-2, Afternoon 02:00 PM</text>
                <text x="10" y="78" fill="#cbd5e1">SL-3, Evening 06:00 PM</text>
              </g>

              {/* Equals Arrow */}
              <g transform="translate(490, 60)">
                <path d="M 0,5 L 30,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="30,1 40,5 30,9" fill="#64748b" />
              </g>

              {/* Output Result */}
              <g transform="translate(545, 20)">
                <rect width="205" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="205" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="102" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Output Matrix (3 × 3 = 9 Rows)</text>
                <text x="10" y="42" fill="#10b981">Degree: 2 + 2 = 4 Columns</text>
                <text x="10" y="60" fill="#38bdf8">Cardinality: 9 Tuples</text>
                <text x="10" y="78" fill="#cbd5e1">All Pairwise Proctors</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Cartesian Matrix Simulator ──── */}
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
                Interactive Cartesian Product Matrix Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Select left and right relations to dynamically compute degree additions, cardinality multiplications, and inspect the combination matrix
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Relation Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">Select Left Relation (R):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLeftSetKey("faculty")}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      leftSetKey === "faculty"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Faculty ({datasets.faculty.rows.length} rows)
                  </button>
                  <button
                    onClick={() => setLeftSetKey("shirts")}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      leftSetKey === "shirts"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Shirt Sizes ({datasets.shirts.rows.length} rows)
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold text-cyan-400 block">Select Right Relation (S):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRightSetKey("slots")}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      rightSetKey === "slots"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Exam Slots ({datasets.slots.rows.length} rows)
                  </button>
                  <button
                    onClick={() => setRightSetKey("colors")}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      rightSetKey === "colors"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Colors ({datasets.colors.rows.length} rows)
                  </button>
                </div>
              </div>
            </div>

            {/* Sandbox Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{mathFormula}</span>
                    <span className="text-xs font-mono text-teal-400 font-bold">
                      {leftRelation.rows.length} × {rightRelation.rows.length} = {cardinalityResult} Tuples
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Output Degree:</span>
                      <strong className="text-teal-300">{degreeResult} Attributes ({leftRelation.degree} + {rightRelation.degree})</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Output Cardinality:</span>
                      <strong className="text-emerald-300">{cardinalityResult} Tuples ({leftRelation.rows.length} · {rightRelation.rows.length})</strong>
                    </div>
                  </div>

                  {/* SQL Statement */}
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">
                      ANSI SQL CROSS JOIN Statement:
                    </span>
                    <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                      {sqlQuery}
                    </pre>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">
                    {`✓ Executed: ${leftRelation.name} × ${rightRelation.name}\n✓ Degree: ${degreeResult} columns | Cardinality: ${cardinalityResult} rows\n✓ Zero filtering applied (Unrestricted Cartesian Product)`}
                  </pre>
                </div>
              </div>

              {/* Right: Live Generated Combination Matrix */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Generated Cartesian Product Table ({cardinalityResult} rows)</span>
                    <span className="text-teal-400 font-mono text-[11px]">Degree: {degreeResult}</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">{leftRelation.attributes[0]}</th>
                          <th className="p-1.5">{leftRelation.attributes[1]}</th>
                          <th className="p-1.5">{rightRelation.attributes[0]}</th>
                          <th className="p-1.5">{rightRelation.attributes[1]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {cartesianTuples.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-cyan-300 font-bold">#{row.leftId}</td>
                            <td className="p-1.5 text-white">{row.leftName}</td>
                            <td className="p-1.5 text-amber-300 font-bold">#{row.rightId}</td>
                            <td className="p-1.5 text-emerald-300">{row.rightName}</td>
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
                Exam proctor matrices and product variant catalog generation from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Exam Invigilation Schedule Matrix
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\text&#123;Faculty&#125; \times \text&#123;Exam_Slots&#125;$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT f.instructor_name, s.slot_time, s.hall_number
FROM faculty f
CROSS JOIN exam_slots s;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Apparel SKU Matrix (Sizes × Colors)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\text&#123;Shirt_Sizes&#125; \times \text&#123;Colors&#125;$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT sz.size_code, c.color_name, CONCAT(sz.size_code, '-', c.color_code) AS sku_code
FROM shirt_sizes sz
CROSS JOIN colors c;`}
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
                Avoid accidental Cartesian explosions and using unaliased legacy comma join syntax
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
                  <strong className="text-white">1. Accidental Cross Join Disaster:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting an <code>ON</code> condition on 100k × 500k rows generates 50 Billion rows, exhausting server RAM!
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Legacy Comma Join Syntax:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM A, B</code> obscures developer intent and risks accidental Cartesian products.
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
                  <strong className="text-white">1. Explicit ANSI CROSS JOIN:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always write <code>CROSS JOIN</code> explicitly so code reviewers know the Cartesian product was intentional.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Matrix Generation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use Cartesian products intentionally for calendar date expansion, schedule grids, and product variant SKUs.
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
              <span>Cartesian Product (×) combines all pairs: {"R × S = { tR ∘ tS }"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree is additive: `Degree(R × S) = Degree(R) + Degree(S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Cardinality is multiplicative: `Cardinality(R × S) = |R| × |S|`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>All relational joins are derived as selections over cross products: `R ⨝_θ S ≡ σ_θ(R × S)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use explicit `CROSS JOIN` syntax in SQL instead of commas</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>An accidental missing join condition triggers a catastrophic Cartesian explosion</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Cartesian Product (×) – FAQs"
            questions={questions}
            subtitle="Master relational cross products, degree additions, cardinality multiplications, ANSI CROSS JOIN syntax, and join derivations with 30 comprehensive Q&As"
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
            title="Cartesian Product (Cross Product, ×) and Relational Multiplications"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_cartesian_product_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Cartesian Product ($\\times$) is the grand ancestor of every relational join! " +
              "In my classes in Barrackpore, I teach students that a join is simply a Cartesian Product wearing a Selection belt: " +
              "$R \\bowtie_\\theta S \\equiv \\sigma_\\theta(R \\times S)$. " +
              "When used intentionally, `CROSS JOIN` is an indispensable tool for generating master scheduling grids, " +
              "e-commerce product SKU matrices (Sizes × Colors), and date dimension tables. " +
              "However, never forget the golden warning: if you accidentally omit a join condition on two large production tables, " +
              "you unleash a 50-billion-row Cartesian explosion that will lock your database engine! " +
              "Always write `CROSS JOIN` explicitly and double-check your join predicates."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · Cartesian Product (×) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
