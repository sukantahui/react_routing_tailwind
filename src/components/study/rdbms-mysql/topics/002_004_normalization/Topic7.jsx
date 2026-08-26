import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Attribute Closure (X+) Algorithm and Finding Candidate Keys
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Attribute Closure Calculator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Closure Calculator State
  const [selectedAttrKey, setSelectedAttrKey] = useState("attr_sid_cid"); // "attr_sid" | "attr_cid" | "attr_sid_cid" | "attr_email"

  const closureScenarios = {
    attr_sid: {
      inputAttrs: "{ student_id }",
      finalClosure: "{ student_id, student_name, student_email, city, department_id, department_name, department_head }",
      isSuperKey: false,
      isCandidateKey: false,
      statusBadge: "NOT A SUPER KEY (Missing Course & Grade)",
      badgeColor: "amber",
      iterations: [
        { pass: "Pass 0 (Init)", closure: "{ student_id }", appliedFd: "Reflexivity: X+ = X" },
        { pass: "Pass 1", closure: "{ student_id, student_name, student_email, city, department_id }", appliedFd: "student_id → { student_name, student_email, city, department_id }" },
        { pass: "Pass 2", closure: "{ student_id, student_name, student_email, city, department_id, department_name, department_head }", appliedFd: "department_id → { department_name, department_head }" },
        { pass: "Pass 3 (Fixpoint)", closure: "No new attributes added. Terminated.", appliedFd: "Closure Complete (7 of 9 attributes reached)." },
      ],
      verdictText: "Determines all student and department details, but cannot determine course_id or final_grade.",
    },
    attr_cid: {
      inputAttrs: "{ course_id }",
      finalClosure: "{ course_id, course_title, course_fee, instructor_name }",
      isSuperKey: false,
      isCandidateKey: false,
      statusBadge: "NOT A SUPER KEY (Missing Student & Grade)",
      badgeColor: "amber",
      iterations: [
        { pass: "Pass 0 (Init)", closure: "{ course_id }", appliedFd: "Reflexivity: X+ = X" },
        { pass: "Pass 1", closure: "{ course_id, course_title, course_fee, instructor_name }", appliedFd: "course_id → { course_title, course_fee, instructor_name }" },
        { pass: "Pass 2 (Fixpoint)", closure: "No new attributes added. Terminated.", appliedFd: "Closure Complete (4 of 9 attributes reached)." },
      ],
      verdictText: "Determines only course catalog information. Cannot determine student-specific data.",
    },
    attr_sid_cid: {
      inputAttrs: "{ student_id, course_id }",
      finalClosure: "{ student_id, course_id, student_name, student_email, city, department_id, department_name, department_head, course_title, course_fee, instructor_name, final_grade } = R",
      isSuperKey: true,
      isCandidateKey: true,
      statusBadge: "✓ VALID CANDIDATE KEY (Minimal Super Key)",
      badgeColor: "emerald",
      iterations: [
        { pass: "Pass 0 (Init)", closure: "{ student_id, course_id }", appliedFd: "Reflexivity: X+ = X" },
        { pass: "Pass 1", closure: "{ student_id, course_id, student_name, student_email, city, department_id }", appliedFd: "student_id → { student_name, student_email, city, department_id }" },
        { pass: "Pass 2", closure: "{ student_id, course_id, student_name, student_email, city, department_id, department_name, department_head }", appliedFd: "department_id → { department_name, department_head }" },
        { pass: "Pass 3", closure: "{ student_id, course_id, ..., course_title, course_fee, instructor_name }", appliedFd: "course_id → { course_title, course_fee, instructor_name }" },
        { pass: "Pass 4", closure: "{ student_id, course_id, ..., final_grade } = ALL ATTRIBUTES (R)", appliedFd: "(student_id, course_id) → final_grade" },
        { pass: "Pass 5 (Fixpoint)", closure: "All 9 attributes reached! (student_id, course_id)+ = R", appliedFd: "Fixpoint Reached (Candidate Key Confirmed)." },
      ],
      verdictText: "Closure equals the ENTIRE relation schema R, and neither {student_id} nor {course_id} alone reaches R. Hence, it is a minimal candidate key!",
    },
    attr_email: {
      inputAttrs: "{ student_email, course_id }",
      finalClosure: "{ student_email, course_id, student_id, student_name, city, department_id, department_name, department_head, course_title, course_fee, instructor_name, final_grade } = R",
      isSuperKey: true,
      isCandidateKey: true,
      statusBadge: "✓ ALTERNATE CANDIDATE KEY",
      badgeColor: "emerald",
      iterations: [
        { pass: "Pass 0 (Init)", closure: "{ student_email, course_id }", appliedFd: "Reflexivity: X+ = X" },
        { pass: "Pass 1", closure: "{ student_email, course_id, student_id }", appliedFd: "student_email → student_id" },
        { pass: "Pass 2", closure: "{ student_email, course_id, student_id, student_name, city, department_id }", appliedFd: "student_id → { student_name, city, department_id }" },
        { pass: "Pass 3", closure: "{ student_email, course_id, ..., department_name, department_head, course_title, course_fee, final_grade } = R", appliedFd: "Chained expansion reaches all attributes!" },
        { pass: "Pass 4 (Fixpoint)", closure: "Fixpoint reached: (student_email, course_id)+ = R", appliedFd: "Alternate Candidate Key Validated." },
      ],
      verdictText: "Since student_email is unique (student_email → student_id), {student_email, course_id} forms an alternate candidate key!",
    },
  };

  const currentClosure = closureScenarios[selectedAttrKey];

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
            Module 002_004 · Database Normalization · Topic 7
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Attribute Closure (X+) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Finding Candidate Keys
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the linear-time algorithm for computing attribute closures (X+), categorizing attributes into Class L/R/LR/N sets,
            and systematically discovering all minimal candidate keys in relational schemas.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Linear-Time Algorithm O(|F|·|R|)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Candidate Key Minimality Test
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Class L / R / LR / N Heuristics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🪜 Super Key vs Candidate Key
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Closure Algorithm & Key Heuristics ─────── */}
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
                Attribute Closure Algorithm &amp; Candidate Key Heuristics
              </h2>
              <p className="text-xs text-slate-400">
                The algorithmic workhorse for computing reachable attributes and minimal super keys
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-teal-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Class L (LHS Only)</span>
              <strong className="text-white text-xs block">MUST be in Key</strong>
              <p className="text-[11px] text-slate-400">Appears only on LHS. No other attribute can determine it.</p>
            </div>

            <div className="p-3 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Class R (RHS Only)</span>
              <strong className="text-white text-xs block">NEVER in Key</strong>
              <p className="text-[11px] text-slate-400">Appears only on RHS. Determined by other columns.</p>
            </div>

            <div className="p-3 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Class LR (Both Sides)</span>
              <strong className="text-white text-xs block">Maybe in Key</strong>
              <p className="text-[11px] text-slate-400">Tested in combinations with Class L &amp; N attributes.</p>
            </div>

            <div className="p-3 rounded-xl border border-purple-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Class N (Neither Side)</span>
              <strong className="text-white text-xs block">MUST be in Key</strong>
              <p className="text-[11px] text-slate-400">Isolated attribute. Must belong to every candidate key.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Attribute Closure Expansion Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Iterative Attribute Closure (X+) Fixpoint Expansion Flow
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Attribute Closure Expansion Flow"
            >
              {/* Step 1: Init */}
              <g transform="translate(15, 20)">
                <rect width="160" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="80" y="20" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1. Initialization</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="10">Set X+ = X</text>
                <text x="10" y="65" fill="#94a3b8" fontSize="9">Reflexivity Baseline</text>
              </g>

              {/* Arrow */}
              <g transform="translate(180, 50)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="35,6 45,10 35,14" fill="#38bdf8" />
              </g>

              {/* Step 2: Loop */}
              <g transform="translate(230, 20)">
                <rect width="180" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="90" y="20" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Iterative Scan</text>
                <text x="10" y="45" fill="#fde68a" fontSize="10">If LHS ⊆ X+</text>
                <text x="10" y="65" fill="#cbd5e1" fontSize="10">X+ = X+ ∪ RHS</text>
              </g>

              {/* Arrow */}
              <g transform="translate(415, 50)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="35,6 45,10 35,14" fill="#38bdf8" />
              </g>

              {/* Step 3: Fixpoint */}
              <g transform="translate(465, 20)">
                <rect width="170" height="85" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="85" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">3. Fixpoint Stop</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="10">No new attrs added</text>
                <text x="10" y="65" fill="#10b981" fontSize="10" fontWeight="bold">Return X+</text>
              </g>

              {/* Step 4: Key Test */}
              <g transform="translate(640, 20)">
                <rect width="125" height="85" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                <text x="62" y="20" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">4. Key Test</text>
                <text x="10" y="42" fill="#cbd5e1" fontSize="9">Is X+ = R?</text>
                <text x="10" y="60" fill="#a7f3d0" fontSize="9">Yes ➔ Super Key</text>
                <text x="10" y="75" fill="#c084fc" fontSize="9">Minimal ➔ CK</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Attribute Closure Sandbox ──── */}
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
                Interactive Attribute Closure (X+) &amp; Candidate Key Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Select an attribute subset to watch the step-by-step fixpoint expansion and candidate key verification
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Attribute Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedAttrKey("attr_sid_cid")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedAttrKey === "attr_sid_cid"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. {`{sid, cid}+ (Primary CK)`}
              </button>

              <button
                onClick={() => setSelectedAttrKey("attr_email")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedAttrKey === "attr_email"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. {`{email, cid}+ (Alternate CK)`}
              </button>

              <button
                onClick={() => setSelectedAttrKey("attr_sid")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedAttrKey === "attr_sid"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. {`{sid}+ (Incomplete)`}
              </button>

              <button
                onClick={() => setSelectedAttrKey("attr_cid")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedAttrKey === "attr_cid"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. {`{cid}+ (Incomplete)`}
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Input & Result */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">X = {currentClosure.inputAttrs}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentClosure.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentClosure.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Computed Final Attribute Closure (X+):</span>
                      <p className="text-emerald-400 font-mono font-bold mt-0.5 text-[11px] leading-relaxed">
                        {currentClosure.finalClosure}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Candidate Key Verdict:</span>
                      <p className="text-slate-300 mt-0.5">{currentClosure.verdictText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Step-by-Step Execution Iterations */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 max-h-80 overflow-y-auto">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Step-by-Step Fixpoint Iteration Trace
                  </span>

                  <div className="space-y-2 text-xs">
                    {currentClosure.iterations.map((step, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-cyan-400 font-mono">{step.pass}</span>
                          <span className="text-slate-500 font-mono text-[10px]">{step.appliedFd}</span>
                        </div>
                        <p className="text-slate-300 font-mono text-[11px]">{step.closure}</p>
                      </div>
                    ))}
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
                How Barrackpore and Kolkata training institutes discover candidate keys using attribute closures
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Multiple Candidate Keys Discovery
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all candidate keys when students have both unique IDs and unique emails:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Relation: R(student_id, email, course_id, grade)
-- FDs: student_id &rarr; email, email -&gt; student_id, (student_id, course_id) -> grade
-- Step 1: L={course_id}, R={grade}, LR={student_id, email}
-- Step 2: (student_id, course_id)+ = { student_id, course_id, email, grade } = R -> CK 1!
-- Step 3: (email, course_id)+ = { email, course_id, student_id, grade } = R -> CK 2!
-- Result: Candidate Keys = { (student_id, course_id), (email, course_id) }`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Isolated Attribute (Class N) Identification
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                When a column (e.g. <code>academic_year</code>) has no incoming or outgoing FDs, it must belong to every candidate key:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Relation: R(student_id, name, academic_year)
-- FD: student_id &rarr; name
-- Analysis: academic_year is in Class N (appears on neither side).
-- Core Set = { student_id, academic_year }
-- { student_id, academic_year }+ = { student_id, academic_year, name } = R
-- Candidate Key = { student_id, academic_year }`}
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
                Guidelines for calculating attribute closures and identifying all candidate keys
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
                  <strong className="text-white">1. Missing Isolated (Class N) Attributes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting attributes that appear on neither side causes incorrect, non-super key candidate keys.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Super Key Equals Candidate Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    A candidate key must be minimal; if any subset can reach R, the larger set is only a super key.
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
                  <strong className="text-white">1. Classify Attributes (L / R / LR / N) First:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Start by forming the core $L \cup N$ to drastically reduce the candidate key search space.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Test Minimality for Every Super Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always verify that removing any single attribute from your candidate key drops its closure below R.
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
              <span>Attribute Closure (X+) is the complete set of attributes determined by X under FD set F</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Initialized as X+ = X; iteratively expanded whenever LHS ⊆ X+ until fixpoint</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>An attribute set K is a Super Key if K+ = R</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>A minimal super key is a Candidate Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Class L and Class N attributes MUST belong to every candidate key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Class R attributes can NEVER belong to any candidate key</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Attribute Closure &amp; Candidate Keys – FAQs"
            questions={questions}
            subtitle="Master the Attribute Closure (X+) algorithm, Candidate Key discovery heuristics, Class L/R/LR/N categorization, and super key minimality with 30 comprehensive Q&As"
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
            title="Attribute Closure (X+) Algorithm and Finding Candidate Keys"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_attribute_closure_candidate_keys_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Computing Attribute Closures (X+) is the single most powerful algorithmic tool you will ever learn in database theory! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students my 4-Bucket Heuristic: " +
              "Put LHS-only attributes in Bucket L, RHS-only in Bucket R, Both in Bucket LR, and Neither in Bucket N. " +
              "Bucket L and Bucket N MUST go into your candidate key. " +
              "Bucket R can NEVER go into your key. " +
              "This simple 30-second heuristic cuts a 20-minute brute-force calculation down to a 10-second mental check! " +
              "Once you master finding Candidate Keys via closure, solving 2NF, 3NF, and BCNF normalization problems becomes effortless!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · Attribute Closure &amp; Candidate Keys · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
