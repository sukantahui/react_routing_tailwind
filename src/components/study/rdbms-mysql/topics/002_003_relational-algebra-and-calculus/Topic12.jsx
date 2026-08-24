import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Extended Relational Algebra: Aggregate Functions and Grouping Operator (𝒢)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Grouping & Aggregates Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Grouping Explorer State
  const [groupByField, setGroupByField] = useState("city"); // "city" | "track" | "global"
  const [minStudentThreshold, setMinStudentThreshold] = useState(1); // 1, 2, 3

  const [students] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", track: "Full-Stack", fee: 5500 },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", track: "Frontend", fee: 4800 },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", track: "Data Science", fee: 3800 },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", track: "Full-Stack", fee: 5500 },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", track: "Full-Stack", fee: 4200 },
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

  // Compute Aggregations Dynamically
  let groupResults = [];

  if (groupByField === "global") {
    const count = students.length;
    const sum = students.reduce((acc, s) => acc + s.fee, 0);
    const avg = sum / count;
    const min = Math.min(...students.map((s) => s.fee));
    const max = Math.max(...students.map((s) => s.fee));

    groupResults = [
      {
        groupKey: "All Academy Students (Global)",
        count: count,
        sum: sum,
        avg: avg,
        min: min,
        max: max,
      },
    ];
  } else {
    const groupMap = {};
    students.forEach((s) => {
      const key = s[groupByField];
      if (!groupMap[key]) {
        groupMap[key] = [];
      }
      groupMap[key].push(s);
    });

    Object.keys(groupMap).forEach((k) => {
      const groupStudents = groupMap[k];
      const count = groupStudents.length;
      const sum = groupStudents.reduce((acc, s) => acc + s.fee, 0);
      const avg = sum / count;
      const min = Math.min(...groupStudents.map((s) => s.fee));
      const max = Math.max(...groupStudents.map((s) => s.fee));

      if (count >= minStudentThreshold) {
        groupResults.push({
          groupKey: k,
          count: count,
          sum: sum,
          avg: avg,
          min: min,
          max: max,
        });
      }
    });
  }

  const mathNotation =
    groupByField === "global"
      ? "𝒢_{COUNT(*) → count, SUM(fee) → total_fee, AVG(fee) → avg_fee, MIN(fee) → min_fee, MAX(fee) → max_fee}(Students)"
      : `σ_{count ≥ ${minStudentThreshold}}({}_{${groupByField}} 𝒢_{COUNT(*) → count, SUM(fee) → total_fee, AVG(fee) → avg_fee, MIN(fee) → min_fee, MAX(fee) → max_fee}(Students))`;

  const sqlQuery =
    groupByField === "global"
      ? `SELECT COUNT(*) AS total_students,
       SUM(admission_fee) AS total_revenue,
       AVG(admission_fee) AS avg_fee,
       MIN(admission_fee) AS min_fee,
       MAX(admission_fee) AS max_fee
FROM students;`
      : `SELECT ${groupByField},
       COUNT(*) AS student_count,
       SUM(admission_fee) AS total_revenue,
       ROUND(AVG(admission_fee), 2) AS avg_fee,
       MIN(admission_fee) AS min_fee,
       MAX(admission_fee) AS max_fee
FROM students
GROUP BY ${groupByField}
HAVING COUNT(*) >= ${minStudentThreshold};`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 12
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Aggregate Functions &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Grouping Operator (𝒢)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master multi-row statistical aggregation in extended relational algebra: the Grouping Operator (${"{}"}_{"G"} \\mathcal{"G"}_{"F(A)"}$),
            global aggregation, the 5 core functions (COUNT, SUM, AVG, MIN, MAX), and SQL `GROUP BY` with `HAVING` threshold filters.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Grouping Operator: _{"{G}"} 𝒢_{"{F(A)}"}
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📈 The 5 Functions: COUNT, SUM, AVG, MIN, MAX
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ WHERE vs HAVING Filtration
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ ONLY_FULL_GROUP_BY Safe
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Aggregates ─────────── */}
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
                Grouping Operator (𝒢) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Partitioning relations by grouping keys, evaluating aggregates, and degree calculations ($k + m$)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Grouped Aggregation</span>
              <strong className="text-white text-xs block font-mono">{`_{G1..Gk} 𝒢_{F1(A1)..Fm(Am)}(R)`}</strong>
              <p className="text-[11px] text-slate-400">Partitions $R$ into subsets sharing key $G$; Degree = $k + m$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Global Aggregation</span>
              <strong className="text-white text-xs block font-mono">{`𝒢_{COUNT(*), AVG(fee)}(R)`}</strong>
              <p className="text-[11px] text-slate-400">Treats entire table as one group, emitting exactly 1 summary row.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Selection over 𝒢</span>
              <strong className="text-white text-xs block font-mono">{`σ_{avg > 4000}(_{city} 𝒢(R))`}</strong>
              <p className="text-[11px] text-slate-400">Maps directly to SQL `HAVING` filter applied after grouping.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Grouping & Aggregation Engine Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Grouping (𝒢) Partition &amp; Aggregation Pipeline
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Grouping and Aggregation Pipeline Diagram"
            >
              {/* Step 1: Raw Tuples */}
              <g transform="translate(20, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="90" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Raw Relation (5 Rows)</text>
                <text x="10" y="42" fill="#cbd5e1">Mamata (Barrackpore, ₹5500)</text>
                <text x="10" y="58" fill="#cbd5e1">Mahima (Kolkata, ₹4800)</text>
                <text x="10" y="74" fill="#cbd5e1">Abhronila (Barrackpore, ₹3800)</text>
                <text x="10" y="90" fill="#cbd5e1">Debangshu (Kolkata, ₹4200)...</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(210, 60)">
                <path d="M 0,5 L 35,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="35,1 45,5 35,9" fill="#64748b" />
                <text x="20" y="-5" fill="#f59e0b" fontSize="8" textAnchor="middle">Partition</text>
              </g>

              {/* Step 2: Buckets */}
              <g transform="translate(265, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="105" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">City Buckets (_{city} 𝒢)</text>
                <text x="10" y="42" fill="#10b981">Barrackpore: [₹5500, ₹3800] (2)</text>
                <text x="10" y="60" fill="#38bdf8">Kolkata: [₹4800, ₹4200] (2)</text>
                <text x="10" y="78" fill="#818cf8">Ichapur: [₹5500] (1)</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(485, 60)">
                <path d="M 0,5 L 35,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="35,1 45,5 35,9" fill="#64748b" />
                <text x="20" y="-5" fill="#10b981" fontSize="8" textAnchor="middle">Aggregate</text>
              </g>

              {/* Step 3: Aggregated Rows */}
              <g transform="translate(535, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Summary Schema (Degree = 6)</text>
                <text x="10" y="42" fill="#10b981">Barrackpore: cnt=2, avg=₹4650</text>
                <text x="10" y="60" fill="#38bdf8">Kolkata: cnt=2, avg=₹4500</text>
                <text x="10" y="78" fill="#818cf8">Ichapur: cnt=1, avg=₹5500</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Grouping & Aggregates Sandbox ─ */}
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
                Interactive Grouping &amp; Aggregates Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between City, Course Track, and Global aggregation while adjusting HAVING thresholds
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Group Dimension & Having Knobs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Group By Selector */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">Grouping Dimension (G):</span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setGroupByField("city")}
                    className={clsx(
                      "py-1.5 rounded text-xs font-bold border transition-all",
                      groupByField === "city"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    1. By City
                  </button>
                  <button
                    onClick={() => setGroupByField("track")}
                    className={clsx(
                      "py-1.5 rounded text-xs font-bold border transition-all",
                      groupByField === "track"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    2. By Track
                  </button>
                  <button
                    onClick={() => setGroupByField("global")}
                    className={clsx(
                      "py-1.5 rounded text-xs font-bold border transition-all",
                      groupByField === "global"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    3. Global (No G)
                  </button>
                </div>
              </div>

              {/* HAVING Threshold Knob */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  HAVING Student Threshold (COUNT(*) &ge; N):
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((threshold) => (
                    <button
                      key={threshold}
                      disabled={groupByField === "global"}
                      onClick={() => setMinStudentThreshold(threshold)}
                      className={clsx(
                        "py-1.5 rounded text-xs font-mono font-bold border transition-all",
                        minStudentThreshold === threshold && groupByField !== "global"
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      )}
                    >
                      &ge; {threshold} Students
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block">
                    Grouping Operator Breakdown:
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {mathNotation}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {sqlQuery}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Aggregated Summary Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Summary Groups ({groupResults.length} groups)</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      Degree: {groupByField === "global" ? "5 Metrics" : "6 Columns"}
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">{groupByField === "global" ? "Scope" : groupByField}</th>
                          <th className="p-1.5">Count</th>
                          <th className="p-1.5">Total Revenue</th>
                          <th className="p-1.5">Avg Fee</th>
                          <th className="p-1.5">Min / Max</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {groupResults.map((r, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-white font-bold">{r.groupKey}</td>
                            <td className="p-1.5 text-cyan-300 font-bold">{r.count}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">₹{r.sum}</td>
                            <td className="p-1.5 text-amber-300">₹{r.avg.toFixed(2)}</td>
                            <td className="p-1.5 text-slate-400 text-[10px]">
                              ₹{r.min} / ₹{r.max}
                            </td>
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
                City revenue summaries and high-enrollment course audits from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's City-Wise Admission Fee Summary
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: ${"{}"}_{"\\text{city}"} \\mathcal{"G"}_{"\\text{COUNT}(*) \\rightarrow \\text{cnt}, \\text{SUM(fee)} \\rightarrow \\text{total}, \\text{AVG(fee)} \\rightarrow \\text{avg}"}("Students")
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT city, COUNT(*) AS total_students, SUM(admission_fee) AS total_revenue, AVG(admission_fee) AS avg_fee
FROM students
GROUP BY city;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Top Course Enrollment Filter (HAVING)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\\sigma_{"\\text{cnt} \\ge 2"}(${"{}"}_{"\\text{course\\_id}"} \\mathcal{"G"}_{"\\text{COUNT}(*) \\rightarrow \\text{cnt}"}("Enrollments"))
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT course_id, COUNT(*) AS enroll_count
FROM enrollments
GROUP BY course_id
HAVING COUNT(*) >= 2;`}
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
                Avoid non-aggregated columns violating ONLY_FULL_GROUP_BY and confusing WHERE with HAVING
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
                  <strong className="text-white">1. ONLY_FULL_GROUP_BY Error 1055:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>SELECT city, full_name, AVG(fee) GROUP BY city</code> throws Error 1055 because full_name is unaggregated.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. WHERE vs HAVING Confusion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Placing aggregate conditions in <code>WHERE</code> (e.g. <code>WHERE COUNT(*) &gt; 1</code>) causes a syntax error.
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
                  <strong className="text-white">1. Index Grouping Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Creating B-Tree indexes on grouping attributes enables fast Loose Index Scans in MySQL.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit Filter Separation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>WHERE</code> to filter rows before aggregation, and <code>HAVING</code> strictly for aggregate thresholds.
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
              <span>Grouping operator notation: {"_{G1..Gk} 𝒢_{F1(A1)..Fm(Am)}(R)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree of output is additive: `Degree = k + m`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Global aggregation ({"𝒢_{F}(R)"}) produces exactly 1 scalar summary row</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`COUNT(*)` counts all rows; `SUM`, `AVG`, `MIN`, `MAX` ignore NULL values</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`WHERE` filters raw tuples before grouping; `HAVING` filters group metrics</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Follow `ONLY_FULL_GROUP_BY` standards for deterministic SQL queries</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Aggregate Functions & Grouping (𝒢) – FAQs"
            questions={questions}
            subtitle="Master relational grouping, the Grouping operator (𝒢), the 5 core aggregate functions, SQL GROUP BY, HAVING filters, and ONLY_FULL_GROUP_BY rules with 30 comprehensive Q&As"
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
            title="Extended Relational Algebra: Aggregate Functions and Grouping Operator (𝒢)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_grouping_aggregates_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Grouping Operator ($\\mathcal{G}$) transforms relational algebra from simple row filtering into powerful business intelligence! " +
              "In my classes in Barrackpore, I emphasize the fundamental difference between `WHERE` and `HAVING`: " +
              "`WHERE` filters individual rows BEFORE grouping takes place; `HAVING` filters aggregated group metrics AFTER grouping is done. " +
              "Also, always remember the NULL behavior: `COUNT(*)` counts all tuples, while `SUM`, `AVG`, `MIN`, and `MAX` ignore NULLs completely. " +
              "And in MySQL, never disable `ONLY_FULL_GROUP_BY`—ensuring every selected column is either grouped or aggregated guarantees " +
              "deterministic, reliable reporting across all enterprise databases!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · Grouping Operator (𝒢) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
