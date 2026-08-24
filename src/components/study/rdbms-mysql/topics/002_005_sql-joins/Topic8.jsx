import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Non-Equi Joins (Joining on Ranges, >, <, BETWEEN)
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Non-Equi Join Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Non-Equi State
  const [selectedRangeMode, setSelectedRangeMode] = useState("mode_grading_scale"); // "mode_grading_scale" | "mode_tax_slabs" | "mode_price_history" | "mode_overlap_bug"

  const rangeScenarios = {
    mode_grading_scale: {
      title: "1. Academic Grade Boundary Mapping (BETWEEN min AND max)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.exam_score,
    g.grade_letter,
    g.remark
FROM student_exams s
INNER JOIN grade_scales g 
    ON s.exam_score BETWEEN g.min_score AND g.max_score;`,
      resultRows: [
        { name: "Mamata Hui", value: "Score: 92", match: "Grade A+ (90–100)", outcome: "Outstanding", badgeColor: "emerald" },
        { name: "Debangshu Roy", value: "Score: 84", match: "Grade A (80–89)", outcome: "Excellent", badgeColor: "emerald" },
        { name: "Susmita Sen", value: "Score: 71", match: "Grade B (70–79)", outcome: "Very Good", badgeColor: "cyan" },
        { name: "Mahima Shaw", value: "Score: 58", match: "Grade C (50–69)", outcome: "Pass", badgeColor: "amber" },
      ],
      verdictText: "✓ 100% SCORE CLASSIFICATION",
      badgeColor: "emerald",
      explanation: "Each student score is dynamically matched against discrete, non-overlapping boundary bins without any hardcoded CASE statements.",
    },
    mode_tax_slabs: {
      title: "2. Employee Income Tax Slabs in Indian Rupee (₹)",
      sqlQuery: `SELECT 
    e.emp_name,
    e.annual_salary,
    t.slab_name,
    t.tax_rate_pct,
    CONCAT('₹', FORMAT(e.annual_salary * (t.tax_rate_pct / 100), 2)) AS estimated_tax
FROM employees e
INNER JOIN tax_slabs t 
    ON e.annual_salary >= t.min_salary 
   AND (e.annual_salary < t.max_salary OR t.max_salary IS NULL);`,
      resultRows: [
        { name: "Mamata Hui", value: "Salary: ₹6,50,000", match: "Slab 2 (₹5L–₹10L)", outcome: "Tax (10%): ₹65,000", badgeColor: "cyan" },
        { name: "Debangshu Roy", value: "Salary: ₹12,00,000", match: "Slab 3 (₹10L–₹15L)", outcome: "Tax (20%): ₹2,40,000", badgeColor: "cyan" },
        { name: "Sukanta Hui", value: "Salary: ₹22,00,000", match: "Slab 4 (₹15L+)", outcome: "Tax (30%): ₹6,60,000", badgeColor: "indigo" },
      ],
      verdictText: "✓ DYNAMIC TAX COMPUTATION",
      badgeColor: "cyan",
      explanation: "Using half-open intervals (>= min AND < max) allows seamless tier evaluation with open-ended maximum brackets (NULL max_salary).",
    },
    mode_price_history: {
      title: "3. Effective-Date Catalog Price Mapping",
      sqlQuery: `SELECT 
    o.order_id,
    o.order_date,
    p.product_name,
    h.unit_price AS historical_effective_price
FROM orders o
INNER JOIN products p ON o.product_id = p.product_id
INNER JOIN price_history h 
    ON o.product_id = h.product_id 
   AND o.order_date BETWEEN h.valid_from AND h.valid_to;`,
      resultRows: [
        { name: "Order #1001", value: "Date: 2026-01-15", match: "Period: 2026-01-01 to 2026-03-31", outcome: "Price: ₹4,500.00", badgeColor: "emerald" },
        { name: "Order #1002", value: "Date: 2026-04-10", match: "Period: 2026-04-01 to 2026-06-30", outcome: "Price: ₹5,000.00", badgeColor: "emerald" },
      ],
      verdictText: "✓ HISTORICAL ACCURACY PRESERVED",
      badgeColor: "emerald",
      explanation: "Matching order dates against validity date ranges guarantees that orders always pull the exact price active at checkout.",
    },
    mode_overlap_bug: {
      title: "4. The Overlapping Range Duplicate Row Bug",
      sqlQuery: `-- ❌ BUG: Overlapping range boundaries (80 in BOTH Grade A and B)!
-- Grade A: 80 to 90
-- Grade B: 70 to 80
SELECT s.student_name, s.exam_score, g.grade_letter
FROM student_exams s
JOIN flawed_grade_scales g ON s.exam_score BETWEEN g.min_score AND g.max_score
WHERE s.exam_score = 80;
-- Returns Debangshu TWICE: Once as Grade A, and once as Grade B!`,
      resultRows: [
        { name: "Debangshu Roy", value: "Score: 80", match: "Flawed Scale (80–90)", outcome: "Matched Grade A", badgeColor: "rose" },
        { name: "Debangshu Roy", value: "Score: 80", match: "Flawed Scale (70–80)", outcome: "Matched Grade B (DUPLICATE!)", badgeColor: "rose" },
      ],
      verdictText: "❌ DUPLICATE ROW BUG DETECTED",
      badgeColor: "rose",
      explanation: "Because BETWEEN is inclusive, endpoint overlaps cause boundary scores to match multiple rows, generating duplicate output rows.",
    },
  };

  const currentRange = rangeScenarios[selectedRangeMode];

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
            Module 002_005 · SQL Joins · Topic 8
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Non-Equi Joins:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Joining on Ranges, &gt;, &lt;, &amp; BETWEEN
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational Theta Joins: mapping numeric scores to grade bins, computing progressive salary tax slabs,
            effective-date price history lookups, and avoiding duplicate row bugs caused by overlapping boundaries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Theta Join: BETWEEN min AND max
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎓 Academic Grade Boundary Binning
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💰 Salary Tax Slabs &amp; Brackets (₹)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Overlapping Range Duplicate Bug Prevention
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Non-Equi Theory & Mechanics ────────────── */}
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
                The Mechanics of Non-Equi Joins &amp; Range Predicates
              </h2>
              <p className="text-xs text-slate-400">
                Relational Theta Joins using comparison operators ($R_1 \bowtie_\theta R_2 = \sigma_\theta(R_1 \times R_2)$)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Inclusive BETWEEN Operator</span>
              <strong className="text-white text-xs block font-mono">ON s.score BETWEEN g.min_score AND g.max_score</strong>
              <p className="text-xs text-slate-300">
                BETWEEN is inclusive of both endpoints (<code>min &lt;= val AND val &lt;= max</code>). Perfect for discrete integer grading tables.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Half-Open Interval Pattern</span>
              <strong className="text-white text-xs block font-mono">ON salary &gt;= min AND (salary &lt; max OR max IS NULL)</strong>
              <p className="text-xs text-slate-300">
                Half-open intervals prevent boundary collision bugs in floating-point financial systems and support open-ended top brackets.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Range Continuum Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Score Continuum Mapping to Grade Scale Boundary Bins
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Non-Equi Range Diagram"
            >
              {/* Continuum Axis Line */}
              <line x1="40" y1="60" x2="740" y2="60" stroke="#334155" strokeWidth="4" />

              {/* Bin C: 50-69 */}
              <rect x="60" y="30" width="160" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" fillOpacity="0.4" />
              <text x="140" y="55" fill="#fde68a" textAnchor="middle" fontWeight="bold">Grade C (50–69)</text>
              <circle cx="120" cy="60" r="5" fill="#f59e0b" />
              <text x="120" y="105" fill="#cbd5e1" textAnchor="middle" fontSize="8">Mahima (58)</text>

              {/* Bin B: 70-79 */}
              <rect x="230" y="30" width="160" height="60" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" fillOpacity="0.4" />
              <text x="310" y="55" fill="#67e8f9" textAnchor="middle" fontWeight="bold">Grade B (70–79)</text>
              <circle cx="250" cy="60" r="5" fill="#06b6d4" />
              <text x="250" y="105" fill="#cbd5e1" textAnchor="middle" fontSize="8">Susmita (71)</text>

              {/* Bin A: 80-89 */}
              <rect x="400" y="30" width="160" height="60" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" fillOpacity="0.4" />
              <text x="480" y="55" fill="#c084fc" textAnchor="middle" fontWeight="bold">Grade A (80–89)</text>
              <circle cx="460" cy="60" r="5" fill="#818cf8" />
              <text x="460" y="105" fill="#cbd5e1" textAnchor="middle" fontSize="8">Debangshu (84)</text>

              {/* Bin A+: 90-100 */}
              <rect x="570" y="30" width="160" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" fillOpacity="0.4" />
              <text x="650" y="55" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">Grade A+ (90–100)</text>
              <circle cx="610" cy="60" r="5" fill="#10b981" />
              <text x="610" y="105" fill="#cbd5e1" textAnchor="middle" fontSize="8">Mamata (92)</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive Non-Equi Join Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore academic grading scales, salary tax slabs, effective-date price history, and overlapping range bugs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedRangeMode("mode_grading_scale")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRangeMode === "mode_grading_scale"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Grade Scales (BETWEEN)
              </button>

              <button
                onClick={() => setSelectedRangeMode("mode_tax_slabs")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRangeMode === "mode_tax_slabs"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Salary Tax Slabs (₹)
              </button>

              <button
                onClick={() => setSelectedRangeMode("mode_price_history")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRangeMode === "mode_price_history"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Date Range Pricing
              </button>

              <button
                onClick={() => setSelectedRangeMode("mode_overlap_bug")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRangeMode === "mode_overlap_bug"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Overlap Bug Demo ❌
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentRange.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentRange.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentRange.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentRange.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentRange.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentRange.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Theta Join Evaluated Output
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Entity / Record</th>
                        <th className="p-1.5">Input Value</th>
                        <th className="p-1.5">Matched Range</th>
                        <th className="p-1.5">Calculated Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentRange.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.value}</td>
                          <td className="p-1.5 text-slate-300">{r.match}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.outcome}</td>
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
                How Barrackpore and Kolkata training institutes structure Non-Equi Joins for grading and billing
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Semester Exam Grading &amp; Certificate Classification
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Classifying final exam marks into academic honors and pass grades:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Dynamic Exam Grade Classification:
SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    e.total_marks,
    g.grade_title,
    g.is_honors_pass
FROM students s
INNER JOIN exam_submissions e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
INNER JOIN academic_grade_scales g 
    ON e.total_marks BETWEEN g.min_marks AND g.max_marks
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Volume Discount Tier Computation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Applying volume wholesale discounts based on order cart total in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Wholesale Cart Volume Discount Mapping:
SELECT 
    o.order_id,
    o.cart_total,
    d.tier_name,
    d.discount_pct,
    ROUND(o.cart_total * (1 - (d.discount_pct / 100)), 2) AS discounted_net_total
FROM orders o
INNER JOIN volume_discount_tiers d 
    ON o.cart_total >= d.min_amount 
   AND (o.cart_total < d.max_amount OR d.max_amount IS NULL);`}
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
                Guidelines for designing clean range lookup tables and optimizing non-equi queries
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
                  <strong className="text-white">1. Overlapping Range Boundaries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Designing overlapping ranges (e.g. 70–80 and 80–90) duplicates boundary records upon join.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Hardcoding CASE WHEN Statements:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Hardcoding brackets in code requires redeploying software whenever business thresholds change.
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
                  <strong className="text-white">1. Create Composite Indexes on Range Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add composite B-Tree indexes on <code>(min_val, max_val)</code> to accelerate index range scans.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Half-Open Intervals for Float/Currency:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>&gt;= min AND &lt; max</code> to guarantee zero boundary gaps and no overlap in continuous values.
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
              <span>Non-Equi Joins use comparison operators (BETWEEN, &gt;, &lt;, &gt;=, &lt;=)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>SQL BETWEEN is inclusive of both boundary endpoints</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Perfect for grade scales, tax slabs, discount tiers, and price histories</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Guard against overlapping boundaries to prevent duplicate rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Store thresholds in database lookup tables rather than hardcoding in SQL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Create composite B-Tree indexes on range boundary columns</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Non-Equi Joins &amp; Range Querying – FAQs"
            questions={questions}
            subtitle="Master Non-Equi Joins, range matching with BETWEEN, inequality comparisons, grade classification, salary tax slabs, and preventing overlapping boundary bugs with 30 comprehensive Q&As"
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
            title="Non-Equi Joins (Joining on Ranges, >, <, BETWEEN)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_non_equi_joins_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Non-Equi Joins allow you to build dynamic, data-driven software! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I advise students: " +
              "'Never hardcode 50-line CASE WHEN statements in your application code for grade levels or tax brackets.' " +
              "Create a clean lookup table `grade_scales(min_score, max_score, grade)` in MySQL, and join on `BETWEEN min AND max`. " +
              "When the government updates tax slabs next year, you only update 4 rows in a table—not a single line of backend code needs to be recompiled! " +
              "Just remember: make sure your range boundaries never overlap so you don't generate duplicate records!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · Non-Equi Joins · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
