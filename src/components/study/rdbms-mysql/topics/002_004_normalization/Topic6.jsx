import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Armstrong's Axioms (Reflexivity, Augmentation, Transitivity, Decomposition, Union, Pseudotransitivity)
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Armstrong Axiom Inference Engine,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Axiom Engine State
  const [selectedRuleKey, setSelectedRuleKey] = useState("rule_transitivity"); // "rule_reflexivity" | "rule_augmentation" | "rule_transitivity" | "rule_decomposition" | "rule_union" | "rule_pseudotransitivity"

  const axiomRules = {
    rule_reflexivity: {
      name: "1. Axiom of Reflexivity (Subset Rule)",
      type: "PRIMARY AXIOM",
      formula: "If Y ⊆ X, then X → Y",
      premise: "X = { student_id, student_name }, Y = { student_id }",
      inferredResult: "{ student_id, student_name } → student_id",
      proofSteps: [
        "1. Identify determinant set X = { student_id, student_name }.",
        "2. Identify target attribute Y = { student_id }.",
        "3. Since Y ⊆ X ({ student_id } is a subset of { student_id, student_name }), the dependency holds unconditionally.",
      ],
      realWorldUse: "Trivial self-dependency: having both student ID and name naturally gives you the student ID.",
      badgeColor: "cyan",
    },
    rule_augmentation: {
      name: "2. Axiom of Augmentation (Enrichment Rule)",
      type: "PRIMARY AXIOM",
      formula: "If X → Y, then XZ → YZ for any attribute set Z",
      premise: "Given student_id → student_name, augment with Z = { course_id }",
      inferredResult: "{ student_id, course_id } → { student_name, course_id }",
      proofSteps: [
        "1. Start with valid base dependency: student_id → student_name.",
        "2. Choose augmenting attribute set Z = { course_id }.",
        "3. Append Z to both sides: { student_id, course_id } → { student_name, course_id }.",
      ],
      realWorldUse: "Used in composite key proofs: adding a course ID to a student maintains the student name mapping.",
      badgeColor: "cyan",
    },
    rule_transitivity: {
      name: "3. Axiom of Transitivity (Chaining Rule)",
      type: "PRIMARY AXIOM",
      formula: "If X → Y and Y → Z, then X → Z",
      premise: "student_id → department_id  AND  department_id → department_head",
      inferredResult: "student_id → department_head",
      proofSteps: [
        "1. Step 1: student_id determines department_id (X → Y).",
        "2. Step 2: department_id determines department_head (Y → Z).",
        "3. Step 3: By Transitivity, student_id determines department_head (X → Z).",
      ],
      realWorldUse: "Identifies indirect dependencies that must be eliminated to achieve Third Normal Form (3NF).",
      badgeColor: "emerald",
    },
    rule_decomposition: {
      name: "4. Decomposition Rule (Projectivity)",
      type: "DERIVED INFERENCE RULE",
      formula: "If X → YZ, then X → Y and X → Z",
      premise: "student_id → { student_name, city }",
      inferredResult: "student_id → student_name  AND  student_id → city",
      proofSteps: [
        "1. Start with X → YZ (student_id → { student_name, city }).",
        "2. By Reflexivity, YZ → Y and YZ → Z.",
        "3. By Transitivity on X → YZ and YZ → Y, we get X → Y.",
        "4. By Transitivity on X → YZ and YZ → Z, we get X → Z.",
      ],
      realWorldUse: "Splits multi-attribute right-hand sides into individual single-attribute functional dependencies.",
      badgeColor: "amber",
    },
    rule_union: {
      name: "5. Union Rule (Additive)",
      type: "DERIVED INFERENCE RULE",
      formula: "If X → Y and X → Z, then X → YZ",
      premise: "course_id → course_title  AND  course_id → course_fee",
      inferredResult: "course_id → { course_title, course_fee }",
      proofSteps: [
        "1. From X → Y, augment with X: X → XY.",
        "2. From X → Z, augment with Y: XY → YZ.",
        "3. By Transitivity on X → XY and XY → YZ, we get X → YZ.",
      ],
      realWorldUse: "Combines multiple individual dependencies with identical determinants into a unified statement.",
      badgeColor: "amber",
    },
    rule_pseudotransitivity: {
      name: "6. Pseudotransitivity Rule",
      type: "DERIVED INFERENCE RULE",
      formula: "If X → Y and WY → Z, then WX → Z",
      premise: "student_id → roll_no  AND  { roll_no, exam_id } → marks",
      inferredResult: "{ student_id, exam_id } → marks",
      proofSteps: [
        "1. From X → Y (student_id → roll_no), augment with W (exam_id): WX → WY ({ student_id, exam_id } → { roll_no, exam_id }).",
        "2. Given WY → Z ({ roll_no, exam_id } → marks).",
        "3. By Transitivity on WX → WY and WY → Z, we get WX → Z ({ student_id, exam_id } → marks).",
      ],
      realWorldUse: "Substitutes equivalent identifiers inside composite keys during exam and grade analytics.",
      badgeColor: "purple",
    },
  };

  const currentRule = axiomRules[selectedRuleKey];

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
            Module 002_004 · Database Normalization · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Armstrong's Axioms:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Inference Rules &amp; Mathematical Proofs
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the sound and complete inference engine of relational database theory: Reflexivity, Augmentation, Transitivity,
            Decomposition, Union, and Pseudotransitivity for attribute closure and candidate key discovery.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Soundness Guarantee (Zero False FDs)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Completeness Guarantee (All FDs Inferred)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              3 Primary Axioms (Reflexivity, Augmentation, Transitivity)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              3 Derived Rules (Decomposition, Union, Pseudotransitivity)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 6 Inference Rules Taxonomy ─────────── */}
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
                Taxonomy of Armstrong's Axioms (3 Primary + 3 Secondary)
              </h2>
              <p className="text-xs text-slate-400">
                The sound and complete mathematical foundation for functional dependency inference
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Reflexivity</span>
              <strong className="text-white text-xs block font-mono">{"Y ⊆ X ➔ X → Y"}</strong>
              <p className="text-[11px] text-slate-400">Subsets are automatically determined by their superset.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Augmentation</span>
              <strong className="text-white text-xs block font-mono">{"X → Y ➔ XZ → YZ"}</strong>
              <p className="text-[11px] text-slate-400">Adding attribute set Z to both sides preserves dependency.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Transitivity</span>
              <strong className="text-white text-xs block font-mono">{"X → Y ∧ Y → Z ➔ X → Z"}</strong>
              <p className="text-[11px] text-slate-400">Chaining dependencies together creates transitive inference.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Axiom Inference Flow Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Primary Axioms &amp; Derived Inference Rules Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Armstrong Axioms Graph"
            >
              {/* Primary Axioms Group */}
              <g transform="translate(20, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#06b6d4" />
                <text x="160" y="16" fill="#06b6d4" textAnchor="middle" fontWeight="bold">3 Primary Axioms (Sound &amp; Complete)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="11">1. Reflexivity: If Y ⊆ X ➔ X → Y</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="11">2. Augmentation: If X → Y ➔ XZ → YZ</text>
                <text x="15" y="85" fill="#cbd5e1" fontSize="11">3. Transitivity: If X → Y ∧ Y → Z ➔ X → Z</text>
              </g>

              {/* Arrow */}
              <g transform="translate(355, 60)">
                <line x1="0" y1="10" x2="60" y2="10" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="60,5 75,10 60,15" fill="#38bdf8" />
                <text x="35" y="-5" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold">PROVES</text>
              </g>

              {/* Derived Rules Group */}
              <g transform="translate(440, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="160" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">3 Secondary Derived Rules</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="11">4. Decomposition: X → YZ ➔ X → Y, X → Z</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="11">5. Union: X → Y, X → Z ➔ X → YZ</text>
                <text x="15" y="85" fill="#cbd5e1" fontSize="11">6. Pseudotransitivity: X → Y, WY → Z ➔ WX → Z</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Axiom Inference Sandbox ────── */}
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
                Interactive Armstrong Axiom Inference &amp; Proof Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select an inference rule to view its formal mathematical derivation, premises, and practical SQL database application
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Rule Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {Object.keys(axiomRules).map((key) => {
                const r = axiomRules[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRuleKey(key)}
                    className={clsx(
                      "py-2 px-1 rounded-lg text-[11px] font-bold transition-all border text-center",
                      selectedRuleKey === key
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    {r.name.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Rule & Formula */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentRule.name}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentRule.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentRule.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                      )}
                    >
                      {currentRule.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Formal Formula:</span>
                      <p className="text-teal-300 font-mono font-bold mt-0.5">{currentRule.formula}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Given Premise:</span>
                      <p className="text-slate-300 font-mono mt-0.5">{currentRule.premise}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Inferred Functional Dependency:</span>
                      <p className="text-emerald-400 font-mono font-bold mt-0.5">{currentRule.inferredResult}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Step-by-Step Proof & Real-World Use */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Step-by-Step Mathematical Proof
                  </span>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    {currentRule.proofSteps.map((step, idx) => (
                      <div key={idx} className="p-1.5 rounded bg-slate-900 font-mono text-[11px] border border-slate-800/80">
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 block text-[11px] uppercase font-bold">Database Engineering Application:</span>
                    <p className="text-slate-300 text-xs mt-0.5">{currentRule.realWorldUse}</p>
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
                How Barrackpore and Kolkata training institutes apply Armstrong's inference rules
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Attribute Closure (X+) Calculation in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Computing the closure of <code>{`{student_id}`}</code> using Decomposition and Transitivity:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Given FD Set F:
-- 1. student_id &rarr; { student_name, dept_id }
-- 2. dept_id -&gt; { dept_name, building }

-- Step 1 (Reflexivity): student_id+ = { student_id }
-- Step 2 (Apply FD 1): student_id+ = { student_id, student_name, dept_id }
-- Step 3 (Apply FD 2): student_id+ = { student_id, student_name, dept_id, dept_name, building }
-- Result: student_id is a Super Key for this schema!`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Pseudotransitivity Grade Substitution
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Substituting student ID for roll number in composite exam grade lookups:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Given:
-- 1. student_id &rarr; roll_no
-- 2. (roll_no, exam_id) -&gt; marks_obtained

-- By Pseudotransitivity: (student_id, exam_id) -> marks_obtained
-- Proves that student_id can be directly used with exam_id to query marks!`}
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
                Guidelines for applying Armstrong's inference rules without mathematical fallacies
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
                  <strong className="text-white">1. Attempting to Split LHS Determinants:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>{"{A, B} → C"}</code> does NOT mean <code>A → C</code> and <code>B → C</code>. Decomposition applies ONLY to RHS.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Transitivity is Symmetrical:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>X → Y</code> and <code>Y → Z</code> implies <code>X → Z</code>, but never implies <code>Z → X</code>.
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
                  <strong className="text-white">1. Use Closure (X+) for Candidate Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Apply Armstrong's rules systematically via the attribute closure algorithm to discover all candidate keys.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Simplify to Minimal Canonical Cover:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use decomposition and extraneous attribute tests to reduce FDs to a clean, non-redundant canonical set.
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
              <span>Armstrong's Axioms are Sound (produce only true FDs) and Complete (produce all true FDs)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Primary Axiom 1: Reflexivity (If Y ⊆ X ➔ X → Y)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Primary Axiom 2: Augmentation (If X → Y ➔ XZ → YZ)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Primary Axiom 3: Transitivity (If X → Y ∧ Y → Z ➔ X → Z)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Derived Rule 1: Decomposition (X → YZ ➔ X → Y and X → Z)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Derived Rule 2: Union (X → Y and X → Z ➔ X → YZ)"}</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Armstrong's Axioms – FAQs"
            questions={questions}
            subtitle="Master Armstrong's Axioms, soundness and completeness proofs, primary vs derived inference rules, and attribute closure algorithms with 30 comprehensive Q&As"
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
            title="Armstrong's Axioms (Reflexivity, Augmentation, Transitivity, Decomposition, Union)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_armstrong_axioms_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Armstrong's Axioms are the mathematical proof engine behind every database normalization tool on earth! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I emphasize that you only need to memorize THREE core rules: " +
              "Reflexivity (subsets are known), Augmentation (adding context to both sides preserves truth), and Transitivity (chains connect). " +
              "From just these three, all other rules—Decomposition, Union, Pseudotransitivity—emerge with flawless mathematical precision. " +
              "When you calculate the attribute closure (X+) of a column set to find candidate keys, " +
              "you are actively running Armstrong's engine in your head!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · Armstrong's Axioms · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
