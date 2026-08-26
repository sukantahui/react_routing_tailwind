import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Relational Algebra Equivalence Rules for Heuristic Query Optimization
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Equivalence Rules Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic15 = () => {
  const sectionRefs = useRef([]);

  // Interactive Equivalence Rules State
  const [selectedRuleKey, setSelectedRuleKey] = useState("rule_push_select"); // "rule_cascade" | "rule_push_select" | "rule_push_proj" | "rule_union"

  const ruleCatalog = {
    rule_cascade: {
      name: "Rule 1: Cascade of Selection (Splitting Conjuncts)",
      beforeMath: "σ_{city='Barrackpore' ∧ fee > 4000 ∧ status='Active'}(Students)",
      afterMath: "σ_{city='Barrackpore'}(σ_{fee > 4000}(σ_{status='Active'}(Students)))",
      benefit: "Breaks compound AND predicates into independent atomic filters that can be pushed down separately.",
      sqlDemo: `-- Before:\nSELECT * FROM students WHERE city = 'Barrackpore' AND fee > 4000 AND status = 'Active';\n-- Optimizer Cascades into 3 independent filter stages.`,
      rowReduction: "Evaluates the indexed city filter first, reducing row checks by 95%.",
    },
    rule_push_select: {
      name: "Rule 2: Pushdown of Selection over Join",
      beforeMath: "σ_{city='Barrackpore' ∧ fee > 4000}(Students ⨝ Courses)",
      afterMath: "(σ_{city='Barrackpore'}(Students)) ⨝ (σ_{fee > 4000}(Courses))",
      benefit: "Applies filters directly at the leaf table scan, shrinking join operands before the join occurs.",
      sqlDemo: `-- Before (Filter after join):\nSELECT * FROM students s JOIN courses c ON s.course_id = c.id\nWHERE s.city = 'Barrackpore' AND c.fee > 4000;\n-- Optimized (Pushed to leaves):\nSELECT * FROM (SELECT * FROM students WHERE city = 'Barrackpore') s\nJOIN (SELECT * FROM courses WHERE fee > 4000) c ON s.course_id = c.id;`,
      rowReduction: "Join cost reduced from 100k × 5k to 5k × 200 (99% reduction).",
    },
    rule_push_proj: {
      name: "Rule 3: Pushdown of Projection with Join Key Retention",
      beforeMath: "π_{name, title}(Students ⨝_{s.cid = c.id} Courses)",
      afterMath: "π_{name, title}(π_{name, cid}(Students) ⨝_{cid = id} π_{id, title}(Courses))",
      benefit: "Discards unneeded columns (e.g. address, phone, syllabus) early while preserving the join key `cid` / `id`.",
      sqlDemo: `-- Discards large text columns before joining:\nSELECT s.full_name, c.course_title\nFROM students s\nJOIN courses c ON s.course_id = c.course_id;`,
      rowReduction: "Shrinks memory buffer byte width by 80%, fitting 5x more tuples in CPU cache.",
    },
    rule_union: {
      name: "Rule 4: Commutativity of Selection with Set Union",
      beforeMath: "σ_{city='Barrackpore'}(Online_Students ∪ Offline_Students)",
      afterMath: "σ_{city='Barrackpore'}(Online_Students) ∪ σ_{city='Barrackpore'}(Offline_Students)",
      benefit: "Filters each partition before performing the expensive Set Union deduplication pass.",
      sqlDemo: `-- Optimized Union Pushdown:\nSELECT * FROM online_students WHERE city = 'Barrackpore'\nUNION\nSELECT * FROM offline_students WHERE city = 'Barrackpore';`,
      rowReduction: "Deduplication sort runs on only Barrackpore students rather than the entire global roster.",
    },
  };

  const currentRule = ruleCatalog[selectedRuleKey];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 15
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Relational Equivalence Rules for{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Heuristic Query Optimization
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical transformations powering SQL query optimizers: Cascade of Selection,
            Selection pushdown over joins, Projection pushdown with foreign key preservation, and Index Condition Pushdown (ICP).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✂️ Cascade of Selection (AND Splitting)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⬇️ Selection Pushdown: σ(R ⨝ S) ≡ σ(R) ⨝ σ(S)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Projection Key Preservation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ MySQL Index Condition Pushdown
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Master Equivalence Rules Foundation ───────── */}
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
                The Master Equivalence Transformation Rules
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical proofs of query equivalence and intermediate relation reduction
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Cascade Selection</span>
              <strong className="text-white text-xs block font-mono">{`σ_{c1 ∧ c2} ≡ σ_{c1}(σ_{c2})`}</strong>
              <p className="text-[11px] text-slate-400">Splits compound filters into atomic units.</p>
            </div>
            <div className="p-3 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Push Selection</span>
              <strong className="text-white text-xs block font-mono">{`σ_c(R ⨝ S) ≡ σ_c(R) ⨝ S`}</strong>
              <p className="text-[11px] text-slate-400">Pushes filters to base table scan.</p>
            </div>
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Push Projection</span>
              <strong className="text-white text-xs block font-mono">{`π_L(R ⨝_J S) ≡ π_L(π_J(R) ⨝ π_J(S))`}</strong>
              <p className="text-[11px] text-slate-400">Discards unneeded columns early.</p>
            </div>
            <div className="p-3 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">4. Union Commutative</span>
              <strong className="text-white text-xs block font-mono">{`σ_c(R ∪ S) ≡ σ_c(R) ∪ σ_c(S)`}</strong>
              <p className="text-[11px] text-slate-400">Filters before expensive set union.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Equivalence Transformation Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 5-Step Heuristic Optimization Pipeline
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Equivalence Rules Transformation Pipeline"
            >
              {/* Step 1: Cascade */}
              <g transform="translate(15, 20)">
                <rect width="135" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="135" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="67" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Cascade σ</text>
                <text x="10" y="42" fill="#cbd5e1">σ_c1 ∧ c2(R)</text>
                <text x="10" y="60" fill="#f59e0b">➔ σ_c1(σ_c2(R))</text>
                <text x="10" y="78" fill="#10b981">Split AND Filters</text>
              </g>

              {/* Step 2: Pushdown */}
              <g transform="translate(165, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="70" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Pushdown σ</text>
                <text x="10" y="42" fill="#cbd5e1">Push to Leaf Tables</text>
                <text x="10" y="60" fill="#10b981">σ_city(Students)</text>
                <text x="10" y="78" fill="#10b981">95% Row Drop</text>
              </g>

              {/* Step 3: Reorder */}
              <g transform="translate(320, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#10b981" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="70" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">3. Join Reorder</text>
                <text x="10" y="42" fill="#cbd5e1">Smallest Tables 1st</text>
                <text x="10" y="60" fill="#10b981">R ⨝ S ≡ S ⨝ R</text>
                <text x="10" y="78" fill="#cbd5e1">Build Hash Tables</text>
              </g>

              {/* Step 4: Equijoin Fusion */}
              <g transform="translate(475, 20)">
                <rect width="140" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="140" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="70" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">4. Join Fusion</text>
                <text x="10" y="42" fill="#cbd5e1">σ_θ(R × S)</text>
                <text x="10" y="60" fill="#10b981">➔ R ⨝_θ S</text>
                <text x="10" y="78" fill="#cbd5e1">Eliminate Cross</text>
              </g>

              {/* Step 5: Pushdown π */}
              <g transform="translate(630, 20)">
                <rect width="135" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="135" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="67" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">5. Pushdown π</text>
                <text x="10" y="42" fill="#cbd5e1">Drop Extra Cols</text>
                <text x="10" y="60" fill="#10b981">Retain Join Keys</text>
                <text x="10" y="78" fill="#38bdf8">Cache Optimized</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Equivalence Rule Sandbox ────── */}
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
                Interactive Equivalence Rule Transformer
              </h2>
              <p className="text-xs text-slate-400">
                Select an equivalence rule to inspect before/after mathematical transformations and execution benefits
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Rule Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedRuleKey("rule_cascade")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedRuleKey === "rule_cascade"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Cascade Selection (AND)
              </button>

              <button
                onClick={() => setSelectedRuleKey("rule_push_select")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedRuleKey === "rule_push_select"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Selection Pushdown
              </button>

              <button
                onClick={() => setSelectedRuleKey("rule_push_proj")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedRuleKey === "rule_push_proj"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Projection Pushdown
              </button>

              <button
                onClick={() => setSelectedRuleKey("rule_union")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedRuleKey === "rule_union"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Selection over Union
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical Comparison */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <span className="text-xs font-bold text-white block">
                    {currentRule.name}
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-rose-400 block text-[10px] uppercase font-bold">Unoptimized Algebraic Form:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-rose-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentRule.beforeMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-emerald-400 block text-[10px] uppercase font-bold">Optimized Algebraic Form:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentRule.afterMath}
                      </pre>
                    </div>

                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Intermediate Data Reduction:</span>
                      <strong className="text-teal-300 text-xs">{currentRule.rowReduction}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: SQL Demonstration */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>SQL Query Equivalent &amp; Optimizer Strategy</span>
                    <span className="text-teal-400 font-mono text-[11px]">Transformation Benefit</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <p className="text-xs text-slate-300">{currentRule.benefit}</p>
                    <pre className="rounded bg-slate-900 p-2.5 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                      {currentRule.sqlDemo}
                    </pre>
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
                Academy enrollment filters and union partition query pushdowns from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student-Enrollment Filter Pushdown
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Optimized Form: $(\\sigma_{\city='Barrackpore'}(\Students)) \\bowtie (\\sigma_{\grade='A+'}(\Enrollments))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, e.course_id
FROM (SELECT * FROM students WHERE city = 'Barrackpore') s
JOIN (SELECT * FROM enrollments WHERE grade = 'A+') e ON s.student_id = e.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Partitioned Online/Offline Roster Union Pushdown
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Optimized Form: $\\sigma_{\city='Kolkata'}(\Online) \\cup \\sigma_{\city='Kolkata'}(\Offline)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id, full_name FROM online_students WHERE city = 'Kolkata'
UNION
SELECT student_id, full_name FROM offline_students WHERE city = 'Kolkata';`}
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
                Avoid dropping foreign keys in projection pushdowns and cross-table OR pushdown traps
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
                  <strong className="text-white">1. Dropping Join Keys in Projection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Pushing <code>π_name</code> below a join discards <code>student_id</code>, causing join failure.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Cross-Table OR Pushdown:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Filters like <code>WHERE s.city = 'A' OR c.fee &gt; 5000</code> cannot be pushed down to individual tables.
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
                  <strong className="text-white">1. Always Retain Join Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Include primary and foreign keys in intermediate projections: <code>π_{`{L1 ∪ J}`}(R)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Leverage Index Condition Pushdown:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure composite B-Tree indexes exist so MySQL can evaluate predicates directly inside InnoDB.
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
              <span>Cascade of Selection: {"σ_{c1 ∧ c2}(R) ≡ σ_{c1}(σ_{c2}(R))"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Selection Pushdown: {"σ_{cR}(R ⨝ S) ≡ (σ_{cR}(R)) ⨝ S"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Projection Pushdown: Always preserve join keys `J` in child projections</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Selection distributes over Union, Intersection, and Difference</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Projection does NOT distribute over Set Difference</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL Index Condition Pushdown (ICP) applies selection pushdown directly to B-Trees</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Algebraic Equivalence Rules – FAQs"
            questions={questions}
            subtitle="Master relational equivalence rules, Cascade of Selection, Selection & Projection pushdown heuristics, Join commutativity/associativity, and MySQL ICP with 30 comprehensive Q&As"
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
            title="Relational Algebra Equivalence Rules for Heuristic Query Optimization (Pushing Selections & Projections Down)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic15_equivalence_rules_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Relational Algebra Equivalence Rules are the mathematical laws that make modern databases lightning fast! " +
              "In my classes in Barrackpore, I emphasize the 'Golden Rule of Query Optimization': " +
              "PUSH SELECTIONS AND PROJECTIONS DOWN AS EARLY AS POSSIBLE! " +
              "By filtering out 99% of non-matching student rows BEFORE performing a multi-table join, " +
              "you save millions of CPU cycles and eliminate costly disk temp file spilling. " +
              "However, always remember the join key preservation rule: when pushing projections down, " +
              "never discard the primary or foreign key needed by ancestor join operators! " +
              "Mastering these equivalence rules allows you to look at any SQL execution plan and immediately see how to optimize it."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 15 · Equivalence Rules · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic15;
