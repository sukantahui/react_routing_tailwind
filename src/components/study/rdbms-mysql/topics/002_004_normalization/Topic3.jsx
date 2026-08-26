import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Trivial vs Non-Trivial Functional Dependencies
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Dependency Classification Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Classification State
  const [selectedFdKey, setSelectedFdKey] = useState("fd_trivial_1"); // "fd_trivial_1" | "fd_nontrivial_1" | "fd_semitrivial_1" | "fd_nontrivial_2"

  const fdClassificationMap = {
    fd_trivial_1: {
      notation: "{ student_id, student_name } → student_id",
      lhs: "{ student_id, student_name }",
      rhs: "{ student_id }",
      classification: "TRIVIAL FUNCTIONAL DEPENDENCY",
      classColor: "cyan",
      mathProof: "Y ⊆ X ({ student_id } ⊆ { student_id, student_name })",
      normalizationAction: "FILTERED OUT (Mathematical Tautology)",
      actionColor: "slate",
      explanation: "Since the RHS attribute 'student_id' is already a member of the LHS determinant set, this dependency holds automatically across every database in the universe. It contains ZERO new business information.",
      decomposedForm: "N/A (Pure Trivial Reflexivity)",
    },
    fd_nontrivial_1: {
      notation: "student_id → { student_name, city }",
      lhs: "{ student_id }",
      rhs: "{ student_name, city }",
      classification: "COMPLETELY NON-TRIVIAL",
      classColor: "emerald",
      mathProof: "X ∩ Y = ∅ ({ student_id } ∩ { student_name, city } = ∅)",
      normalizationAction: "PRESERVED & TESTED FOR 3NF / BCNF",
      actionColor: "emerald",
      explanation: "The RHS contains completely new attributes that are not in the LHS. This represents a genuine real-world business constraint and must be evaluated for normal form compliance.",
      decomposedForm: "student_id → student_name  AND  student_id → city",
    },
    fd_semitrivial_1: {
      notation: "{ student_id, course_id } → { student_name, course_id }",
      lhs: "{ student_id, course_id }",
      rhs: "{ student_name, course_id }",
      classification: "SEMI-TRIVIAL (PARTIALLY NON-TRIVIAL)",
      classColor: "amber",
      mathProof: "Y ⊈ X  AND  X ∩ Y = { course_id } ≠ ∅",
      normalizationAction: "DECOMPOSED & SIMPLIFIED",
      actionColor: "amber",
      explanation: "The RHS contains both a redundant attribute ('course_id') and a new attribute ('student_name'). Normalization algorithms simplify this into pure canonical non-trivial form.",
      decomposedForm: "Trivial: { student_id, course_id } → course_id (Dropped) | Non-Trivial: { student_id, course_id } → student_name (Retained)",
    },
    fd_nontrivial_2: {
      notation: "course_id → { course_title, course_fee }",
      lhs: "{ course_id }",
      rhs: "{ course_title, course_fee }",
      classification: "COMPLETELY NON-TRIVIAL",
      classColor: "emerald",
      mathProof: "X ∩ Y = ∅ ({ course_id } ∩ { course_title, course_fee } = ∅)",
      normalizationAction: "PRESERVED & TESTED FOR 3NF / BCNF",
      actionColor: "emerald",
      explanation: "Course title and tuition fee are distinct attributes determined by the course code. This is an essential business rule enforced in the Courses table.",
      decomposedForm: "course_id → course_title  AND  course_id → course_fee",
    },
  };

  const currentFd = fdClassificationMap[selectedFdKey];

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
            Module 002_004 · Database Normalization · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Trivial vs Non-Trivial:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Functional Dependencies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical taxonomy of functional dependencies: distinguishing universal trivial tautologies (Y ⊆ X),
            semi-trivial overlaps, and completely non-trivial business constraints (X ∩ Y = ∅) in normalization algorithms.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Trivial (Y ⊆ X) Tautologies
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Completely Non-Trivial (X ∩ Y = ∅)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✂️ Semi-Trivial Decomposition
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ BCNF &amp; 3NF Filtering
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Three Mathematical Classes ─────────── */}
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
                The 3 Mathematical Classes of Functional Dependencies
              </h2>
              <p className="text-xs text-slate-400">
                How subset and intersection properties categorize relational constraints
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Trivial FD</span>
              <strong className="text-white text-xs block font-mono">{"Y ⊆ X (Subset Rule)"}</strong>
              <p className="text-[11px] text-slate-400">Dependent is completely inside determinant. Universal mathematical truth in all tables.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Semi-Trivial FD</span>
              <strong className="text-white text-xs block font-mono">{"Y ⊈ X  ∧  X ∩ Y ≠ ∅"}</strong>
              <p className="text-[11px] text-slate-400">Partial overlap. Decomposes into a trivial self-dependency and a non-trivial rule.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Completely Non-Trivial</span>
              <strong className="text-white text-xs block font-mono">{"X ∩ Y = ∅ (Disjoint)"}</strong>
              <p className="text-[11px] text-slate-400">Zero attribute overlap. Represents true business constraints that drive normalization.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Venn Diagram of Classification ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Subset &amp; Set Intersection Classification Flow
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Trivial vs Non-Trivial Venn Diagram"
            >
              {/* Trivial Box */}
              <g transform="translate(20, 20)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#06b6d4" />
                <text x="110" y="15" fill="#06b6d4" textAnchor="middle" fontWeight="bold">Trivial: Y ⊆ X</text>
                <text x="10" y="42" fill="#cbd5e1" fontSize="10">{"Example: {A, B} → A"}</text>
                <text x="10" y="60" fill="#38bdf8" fontSize="10">Always True by Reflexivity</text>
                <text x="10" y="78" fill="#94a3b8" fontSize="10">Normalization: Ignored</text>
              </g>

              {/* Semi-Trivial Box */}
              <g transform="translate(280, 20)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="110" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Semi-Trivial: Overlapping</text>
                <text x="10" y="42" fill="#cbd5e1" fontSize="10">{"Example: {A, B} → {B, C}"}</text>
                <text x="10" y="60" fill="#fde68a" fontSize="10">{"Decomposes: {A,B}→C"}</text>
                <text x="10" y="78" fill="#94a3b8" fontSize="10">Normalization: Simplified</text>
              </g>

              {/* Completely Non-Trivial Box */}
              <g transform="translate(540, 20)">
                <rect width="220" height="95" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="220" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Non-Trivial: X ∩ Y = ∅</text>
                <text x="10" y="42" fill="#cbd5e1" fontSize="10">{"Example: A → {B, C}"}</text>
                <text x="10" y="60" fill="#10b981" fontSize="10">True Business Integrity Rule</text>
                <text x="10" y="78" fill="#a7f3d0" fontSize="10" fontWeight="bold">Tested for 2NF, 3NF, BCNF</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Dependency Classification Sandbox ─ */}
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
                Interactive Functional Dependency Classification Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Inspect mathematical set proofs and observe how normalization engines filter or evaluate FDs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Action Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFdKey("fd_trivial_1")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_trivial_1"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Trivial: {`{id, name} → id`}
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_nontrivial_1")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_nontrivial_1"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Non-Trivial: id → name, city
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_semitrivial_1")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_semitrivial_1"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Semi-Trivial: {`{sid,cid} → {name,cid}`}
              </button>

              <button
                onClick={() => setSelectedFdKey("fd_nontrivial_2")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFdKey === "fd_nontrivial_2"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Non-Trivial: cid → title, fee
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical Classification Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentFd.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFd.classColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentFd.classColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                      )}
                    >
                      {currentFd.classification}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Mathematical Set Proof:</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentFd.mathProof}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Normalization Engine Action:</span>
                      <p className="text-white font-bold mt-0.5">{currentFd.normalizationAction}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Theoretical Explanation:</span>
                      <p className="text-slate-300 mt-0.5">{currentFd.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Canonical Decomposition Breakdown */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Canonical Decomposition &amp; Armstrong Breakdown
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Determinant (X):</span>
                      <p className="font-mono text-cyan-400">{currentFd.lhs}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Dependent (Y):</span>
                      <p className="font-mono text-emerald-400">{currentFd.rhs}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Decomposed Canonical Result:</span>
                      <p className="font-mono text-amber-300 mt-0.5">{currentFd.decomposedForm}</p>
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
                How Barrackpore and Kolkata training institutes filter trivial dependencies during normalization
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's BCNF Audit in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                In BCNF testing, Mamata ignores all trivial FDs like <code>{"{student_id, name} → student_id"}</code>, focusing solely on non-trivial FDs:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Non-trivial FD to verify for BCNF:
-- student_id &rarr; { student_name, email, city }
-- Check: Is student_id a super key?
-- YES (It is the PRIMARY KEY). Table is in BCNF!`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Canonical Cover Simplification
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Simplifying semi-trivial composite dependencies into clean canonical form:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Original Semi-Trivial: { student_id, course_id } &rarr; { grade, course_id }
-- Step 1 (Decomposition): { student_id, course_id } -&gt; grade  AND  { student_id, course_id } -> course_id
-- Step 2 (Drop Trivial): Discard { student_id, course_id } -> course_id
-- Clean Canonical FD: (student_id, course_id) -> grade`}
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
                Guidelines for classifying and pruning functional dependencies in normalization workflows
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
                  <strong className="text-white">1. Testing Trivial FDs for Normal Forms:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Trivial FDs (Y ⊆ X) hold unconditionally and never violate 2NF, 3NF, or BCNF.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Leaving Semi-Trivial FDs Unsimplified:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Leaving redundant attributes on the RHS creates cluttered and confusing schema documentation.
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
                  <strong className="text-white">1. Always Write in Canonical Disjoint Form (X ∩ Y = ∅):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Document every functional dependency such that the dependent set Y contains zero attributes from determinant X.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Focus on Non-Trivial Business Rules:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use non-trivial dependencies to identify primary keys, candidate keys, and foreign keys.
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
              <span>{"Trivial FD: Y ⊆ X (Universal tautology true in every relation)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Completely Non-Trivial FD: X ∩ Y = ∅ (True real-world business constraints)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Semi-Trivial FD: Y ⊈ X and X ∩ Y ≠ ∅ (Decomposes into trivial + non-trivial parts)"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Normalization testing (2NF, 3NF, BCNF) strictly evaluates NON-TRIVIAL FDs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Trivial dependencies never cause anomalies and cannot violate normal forms</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always simplify functional dependencies into canonical non-overlapping format</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Trivial vs Non-Trivial FDs – FAQs"
            questions={questions}
            subtitle="Master trivial, semi-trivial, and completely non-trivial functional dependencies, their mathematical subset proofs, and their role in BCNF and 3NF normalization with 30 comprehensive Q&As"
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
            title="Trivial vs Non-Trivial Functional Dependencies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_trivial_nontrivial_fds_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In database theory, the distinction between Trivial and Non-Trivial Functional Dependencies is pure mathematical elegance! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I tell students: " +
              "'{student_id, name} -> student_id' is trivial because if you already have a student's ID in your hand, " +
              "asking what their ID is gives you zero new information. " +
              "That is why normal form definitions like BCNF explicitly state: 'For every NON-TRIVIAL functional dependency X &rarr; Y, X must be a super key.' " +
              "Always strip away the trivial mathematical noise so you can focus entirely on the genuine business rules that govern your database!"
            }
          /&gt;
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · Trivial vs Non-Trivial FDs · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
