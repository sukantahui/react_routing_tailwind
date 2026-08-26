import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Lossless Join Decomposition and Dependency Preservation Verification
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Lossless Join & Dependency Preservation Verifier Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic14 = () => {
  const sectionRefs = useRef([]);

  // Interactive Verifier State
  const [selectedDecompKey, setSelectedDecompKey] = useState("decomp_lossless_pres"); // "decomp_lossless_pres" | "decomp_lossy_bad" | "decomp_bcnf_tradeoff" | "decomp_3nf_dual"

  const verifierScenarios = {
    decomp_lossless_pres: {
      title: "1. Lossless Join & Dependency Preserving Decomposition",
      schemaR: "R(student_id, student_name, course_id, course_fee)",
      subSchemas: "R1(student_id, student_name)  AND  R2(student_id, course_id, course_fee)",
      commonAttrs: "{ student_id }",
      heathProof: "{ student_id }+ = { student_id, student_name } = R1 (Super Key of R1 ✓)",
      isLossless: true,
      isPreserving: true,
      badgeColor: "emerald",
      verdictText: "✓ LOSSLESS JOIN & DEPENDENCY PRESERVING",
      explanation: "Common attribute 'student_id' is a super key of R1, guaranteeing lossless join by Heath's Theorem. All original functional dependencies are preserved within individual tables.",
      sqlSchema: `-- Lossless & Preserving 3NF Schema:
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
    student_id VARCHAR(10) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);`,
    },
    decomp_lossy_bad: {
      title: "2. Lossy Decomposition (Produces Spurious Phantom Rows)",
      schemaR: "R(student_name, course_id, course_fee)",
      subSchemas: "R1(student_name, course_id)  AND  R2(course_id, course_fee)",
      commonAttrs: "{ course_id }",
      heathProof: "{ course_id }+ = { course_id, course_fee } (Neither R1 nor R2 is covered ❌)",
      isLossless: false,
      isPreserving: true,
      badgeColor: "rose",
      verdictText: "❌ LOSSY JOIN (SPURIOUS TUPLES GENERATED)",
      explanation: "Common attribute 'course_id' is NOT a super key of R1 (multiple students take the same course). Natural join produces false phantom rows pairing students with incorrect courses!",
      sqlSchema: `-- ❌ LOSSY DECOMPOSITION:
-- Joining R1 and R2 creates false tuples because course_id is not unique in R1.`,
    },
    decomp_bcnf_tradeoff: {
      title: "3. BCNF Trade-off: Lossless Join but Lost Dependency",
      schemaR: "R(A, B, C) with FDs: { AB → C, C → B }",
      subSchemas: "R1(C, B) [PK=C]  AND  R2(A, C) [PK=(A, C)]",
      commonAttrs: "{ C }",
      heathProof: "{ C }+ = { B, C } = R1 (Super Key of R1 ✓ Lossless)",
      isLossless: true,
      isPreserving: false,
      badgeColor: "amber",
      verdictText: "✓ LOSSLESS JOIN  |  ⚠️ DEPENDENCY AB → C LOST",
      explanation: "Heath's condition is satisfied (C is super key of R1), so the join is 100% lossless. However, original FD AB → C cannot be checked without a cross-table join.",
      sqlSchema: `-- BCNF Schema with Lost Dependency:
CREATE TABLE r1 (
    c VARCHAR(10) PRIMARY KEY,
    b VARCHAR(10) NOT NULL
);

CREATE TABLE r2 (
    a VARCHAR(10) NOT NULL,
    c VARCHAR(10) NOT NULL,
    PRIMARY KEY (a, c),
    FOREIGN KEY (c) REFERENCES r1(c)
);
-- Note: AB -> C must be enforced via trigger or application logic!`,
    },
    decomp_3nf_dual: {
      title: "4. The 3NF Dual Guarantee (Bernstein Synthesis)",
      schemaR: "R(student_id, dept_id, dept_name, building)",
      subSchemas: "Students(student_id PK, dept_id FK)  AND  Departments(dept_id PK, dept_name, building)",
      commonAttrs: "{ dept_id }",
      heathProof: "{ dept_id }+ = { dept_id, dept_name, building } = Departments (Super Key ✓)",
      isLossless: true,
      isPreserving: true,
      badgeColor: "emerald",
      verdictText: "✓ PERFECT 3NF DUAL GUARANTEE",
      explanation: "Bernstein's 3NF synthesis algorithm guarantees both Lossless Join and 100% Dependency Preservation across all decomposed tables.",
      sqlSchema: `-- Production 3NF Dual Guarantee Schema:
CREATE TABLE departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    building VARCHAR(50) NOT NULL
);

CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    dept_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);`,
    },
  };

  const currentDecomp = verifierScenarios[selectedDecompKey];

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
            Module 002_004 · Database Normalization · Topic 14
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Lossless Join &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Dependency Preservation Verification
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical verification of relational decompositions: applying Heath's Lossless Join Theorem,
            testing for spurious phantom tuples, validating dependency preservation, and analyzing normal form trade-offs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Heath's Theorem: (R1 ∩ R2)+ ⊇ R1 or R2
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Zero Spurious Phantom Tuples
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Dependency Preservation: (F1 ∪ ... ∪ Fk)+ = F+
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ The 3NF vs BCNF Dilemma
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Heath's Theorem & Verification Theory ──── */}
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
                Heath's Theorem &amp; The Two Decomposition Properties
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical criteria for validating that decompositions preserve information and constraints
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">1. Lossless Join Property (MANDATORY)</span>
              <strong className="text-white text-xs block font-mono">{"R1 ⋈ R2 = R  (Zero Spurious Rows)"}</strong>
              <p className="text-xs text-slate-300">
                By Heath's Theorem, the common attributes (R1 ∩ R2) must form a Super Key of R1 or R2. Non-negotiable in all database architectures.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Dependency Preservation (DESIRABLE)</span>
              <strong className="text-white text-xs block font-mono">{"(F1 ∪ F2 ∪ ... ∪ Fk)+ = F+"}</strong>
              <p className="text-xs text-slate-300">
                Every original functional dependency can be verified locally within a single table on INSERT/UPDATE without performing multi-table joins.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Lossless vs Lossy Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Heath's Theorem Lossless Join Evaluation vs Lossy Spurious Tuple Creation
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Lossless vs Lossy Join Diagram"
            >
              {/* Lossless Branch */}
              <g transform="translate(20, 20)">
                <rect width="340" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="340" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="170" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Valid Lossless Join (Heath's Theorem ✓)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="10">Decompose on Super Key: (R1 ∩ R2) ➔ R1</text>
                <text x="15" y="65" fill="#38bdf8" fontSize="10">R1(student_id, name) ⋈ R2(student_id, course)</text>
                <text x="15" y="85" fill="#a7f3d0" fontSize="9" fontWeight="bold">✓ Exact Reconstruction (Zero Spurious Tuples)</text>
              </g>

              {/* Lossy Branch */}
              <g transform="translate(420, 20)">
                <rect width="340" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="340" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="170" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Lossy Join (Non-Key Overlap ❌)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="10">Decompose on Non-Key: (R1 ∩ R2) ↛ R1 or R2</text>
                <text x="15" y="65" fill="#fca5a5" fontSize="10">R1(name, course) ⋈ R2(course, fee)</text>
                <text x="15" y="85" fill="#f43f5e" fontSize="9" fontWeight="bold">❌ Spurious Phantom Tuples Generated!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Verifier Sandbox ───────────── */}
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
                Interactive Lossless Join &amp; Dependency Preservation Verifier
              </h2>
              <p className="text-xs text-slate-400">
                Select a relational decomposition scenario to evaluate Heath's Theorem and dependency preservation proofs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedDecompKey("decomp_lossless_pres")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_lossless_pres"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Lossless &amp; Preserved ✓
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_lossy_bad")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_lossy_bad"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Lossy Join ❌
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_bcnf_tradeoff")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_bcnf_tradeoff"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. BCNF Trade-off ⚠️
              </button>

              <button
                onClick={() => setSelectedDecompKey("decomp_3nf_dual")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedDecompKey === "decomp_3nf_dual"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. 3NF Dual Guarantee
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical Proof Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentDecomp.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentDecomp.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentDecomp.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentDecomp.verdictText}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Original Relation Schema (R):</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentDecomp.schemaR}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Decomposed Target Schemas:</span>
                      <p className="text-slate-300 font-mono mt-0.5">{currentDecomp.subSchemas}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Heath's Theorem Closure Proof:</span>
                      <p className="text-emerald-400 font-mono mt-0.5">{currentDecomp.heathProof}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Theoretical Evaluation:</span>
                      <p className="text-slate-300 mt-0.5">{currentDecomp.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Production SQL Implementation */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Production SQL Schema Strategy
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentDecomp.sqlSchema}
                  </pre>
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
                How Barrackpore and Kolkata training institutes verify lossless joins in production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Lossless Join Audit in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Verifying that decomposing student roster into <code>Students</code> and <code>Enrollments</code> is 100% lossless:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Intersection = Students ∩ Enrollments = { student_id }
-- Step 2: Closure of { student_id }+ = { student_id, student_name, city } = Students!
-- Step 3: By Heath's Theorem, student_id is a Super Key of Students -> LOSSLESS!`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Lost Dependency Trigger Enforcement
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using a MySQL trigger to enforce a cross-table functional dependency lost in BCNF:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Enforcing lost cross-table FD via MySQL Trigger:
DELIMITER $$
CREATE TRIGGER check_advisor_major_consistency
BEFORE INSERT ON student_advisors
FOR EACH ROW
BEGIN
    DECLARE v_major VARCHAR(100);
    SELECT major INTO v_major FROM advisors WHERE advisor_name = NEW.advisor_name;
    -- Verify that the student is actually registered under that major
    -- to preserve the cross-table business dependency!
END$$
DELIMITER ;`}
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
                Guidelines for evaluating relational decompositions and avoiding lossy schemas
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
                  <strong className="text-white">1. Decomposing on Non-Key Attributes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Splitting tables on a non-unique column creates catastrophic spurious phantom rows upon natural join.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Ignoring Lost Dependencies in BCNF:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Failing to implement triggers for lost FDs allows users to insert invalid business combinations into child tables.
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
                  <strong className="text-white">1. Apply Heath's Theorem to Every Binary Split:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Verify that the intersection $(R_1 \cap R_2)^+$ covers all attributes of at least one sub-relation.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Strive for 3NF When Preserving FDs is Critical:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Bernstein's 3NF synthesis algorithm guarantees both Lossless Join and 100% Dependency Preservation.
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
              <span>Lossless Join is strictly mandatory: R1 ⋈ R2 = R with zero spurious tuples</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>{"Heath's Rule: (R1 ∩ R2) must be a Super Key of R1 or R2"}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Dependency Preservation ensures all FDs can be verified locally in single tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>3NF synthesis mathematically guarantees BOTH Lossless Join and Dependency Preservation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>BCNF guarantees Lossless Join, but may sacrifice Dependency Preservation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce lost dependencies in BCNF using database triggers or application logic</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Lossless Join &amp; Dependency Preservation – FAQs"
            questions={questions}
            subtitle="Master the mathematical verification of relational decompositions, Heath's Lossless Join Theorem, Dependency Preservation, and the 3NF vs BCNF trade-off with 30 comprehensive Q&As"
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
            title="Lossless Join Decomposition and Dependency Preservation Verification"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic14_lossless_join_dependency_preservation_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Lossless Join is the absolute golden rule of relational database decomposition! " +
              "In my classes at Coder & AccoTax in Barrackpore, I warn students: " +
              "'If you decompose a table without satisfying Heath's Theorem, you have committed relational suicide!' " +
              "When you re-join the tables, phantom rows will appear that never existed in reality. " +
              "Always check the intersection of your two tables. " +
              "Does that shared column uniquely identify one of the tables? " +
              "If yes, your join is 100% lossless. " +
              "And if you also preserve all functional dependencies, you have achieved the holy grail of database normalization!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 14 · Lossless Join &amp; Dependency Preservation · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic14;
