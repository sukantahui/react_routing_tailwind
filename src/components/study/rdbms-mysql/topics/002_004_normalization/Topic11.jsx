import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Boyce-Codd Normal Form (BCNF): Strict Candidate Key Determinants
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive BCNF Analyzer Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive BCNF Analyzer State
  const [selectedBcnfKey, setSelectedBcnfKey] = useState("bcnf_advisor_part"); // "bcnf_student_major" | "bcnf_advisor_part" | "bcnf_ab_cb" | "bcnf_solution"

  const bcnfScenarios = {
    bcnf_student_major: {
      title: "1. Student & Major Determinant",
      notation: "(student_id, major) → advisor_name",
      determinant: "(student_id, major)",
      isSuperKey: true,
      satisfies3NF: true,
      satisfiesBCNF: true,
      badgeColor: "emerald",
      verdictText: "✓ SATISFIES BCNF & 3NF",
      explanation: "The determinant (student_id, major) is a Candidate Key of the relation. Since the determinant is a super key, it perfectly satisfies BCNF.",
      sqlAction: "Retained directly in schema.",
    },
    bcnf_advisor_part: {
      title: "2. Advisor Specialization Determinant (Classic 3.5NF Case)",
      notation: "advisor_name → major  (where Candidate Keys are: (sid, major) & (sid, advisor))",
      determinant: "advisor_name",
      isSuperKey: false,
      satisfies3NF: true,
      satisfiesBCNF: false,
      badgeColor: "rose",
      verdictText: "❌ VIOLATES BCNF (Satisfies 3NF)",
      explanation: "In 3NF, this FD passes because 'major' is a Prime Attribute (member of (sid, major)). BUT in BCNF, there is NO prime attribute exception! Since advisor_name is NOT a super key, it fails BCNF.",
      sqlAction: "Decompose into Advisors(advisor_name PK, major) and Student_Advisors(student_id, advisor_name PK).",
    },
    bcnf_ab_cb: {
      title: "3. Classic Overlapping Keys: AB → C, C → B",
      notation: "C → B  (Candidate Keys: AB and AC; Prime Attributes: A, B, C)",
      determinant: "C",
      isSuperKey: false,
      satisfies3NF: true,
      satisfiesBCNF: false,
      badgeColor: "rose",
      verdictText: "❌ VIOLATES BCNF (Satisfies 3NF)",
      explanation: "All attributes {A, B, C} are prime. In C → B, B is prime (passes 3NF). However, C+ = {B, C} (missing A), so C is not a super key, violating strict BCNF.",
      sqlAction: "Decomposing to BCNF loses dependency AB → C. Designer must choose: 3NF (preserves FD) or BCNF (zero redundancy).",
    },
    bcnf_solution: {
      title: "4. Complete BCNF Decomposed Architecture",
      notation: "Advisors (1:N) ➔ Student_Advisors Junction",
      determinant: "Every single determinant is a strict Primary / Super Key",
      isSuperKey: true,
      satisfies3NF: true,
      satisfiesBCNF: true,
      badgeColor: "emerald",
      verdictText: "✓ 100% BCNF ARCHITECTURE",
      explanation: "Every determinant across all decomposed tables is a verified Super Key. Complete elimination of all functional dependency redundancies.",
      sqlAction: `-- Complete BCNF Production Schema:
CREATE TABLE advisors (
    advisor_name VARCHAR(100) PRIMARY KEY, -- Determinant is PK!
    major VARCHAR(100) NOT NULL
);

CREATE TABLE student_advisors (
    student_id VARCHAR(10) NOT NULL,
    advisor_name VARCHAR(100) NOT NULL,
    assigned_date DATE NOT NULL,
    PRIMARY KEY (student_id, advisor_name),
    FOREIGN KEY (advisor_name) REFERENCES advisors(advisor_name)
);`,
    },
  };

  const currentBcnf = bcnfScenarios[selectedBcnfKey];

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
            Module 002_004 · Database Normalization · Topic 11
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Boyce-Codd Normal Form (BCNF):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Strict Super Key Determinants
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Boyce-Codd Normal Form (BCNF / 3.5NF): the absolute requirement that every determinant must be a Super Key,
            resolving overlapping candidate key anomalies, and navigating the 3NF vs BCNF dependency preservation trade-off.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Strict Rule: Determinant MUST Be Super Key
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Zero Prime Attribute Exceptions
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Overlapping Candidate Keys Focus
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ The Dependency Preservation Dilemma
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: BCNF Core Theory & 3NF Comparison ──────── */}
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
                The BCNF Standard &amp; The 3NF vs BCNF Difference
              </h2>
              <p className="text-xs text-slate-400">
                Why overlapping candidate keys require the stricter BCNF determinant rule
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Third Normal Form (3NF)</span>
              <strong className="text-white text-xs block font-mono">X is Super Key  OR  A is Prime Attribute</strong>
              <p className="text-xs text-slate-300">
                Permits non-key determinants if the dependent column belongs to any candidate key. Always preserves dependencies.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Boyce-Codd Normal Form (BCNF)</span>
              <strong className="text-white text-xs block font-mono">X MUST BE A SUPER KEY (No Exceptions)</strong>
              <p className="text-xs text-slate-300">
                Stricter rule: every determinant must uniquely determine the entire row. May sacrifice dependency preservation.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 3NF vs BCNF Comparison Graph ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3NF vs BCNF Determinant Test Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="3NF vs BCNF Comparison Diagram"
            >
              {/* 3NF Test Box */}
              <g transform="translate(20, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#818cf8" />
                <text x="160" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold">3NF Test: X → A</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="11">Condition 1: X is Super Key (PASS)</text>
                <text x="15" y="65" fill="#c084fc" fontSize="11">Condition 2: A is Prime Attribute (PASS)</text>
                <text x="15" y="85" fill="#a7f3d0" fontSize="10">✓ 100% Dependency Preserving</text>
              </g>

              {/* Arrow */}
              <g transform="translate(355, 60)">
                <line x1="0" y1="10" x2="60" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="60,5 75,10 60,15" fill="#10b981" />
                <text x="35" y="-5" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">STRICTER</text>
              </g>

              {/* BCNF Test Box */}
              <g transform="translate(440, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="160" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">BCNF Test: X → Y</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="11">Mandatory: X MUST be a Super Key</text>
                <text x="15" y="65" fill="#fca5a5" fontSize="11">No Prime Attribute Exemption Allowed!</text>
                <text x="15" y="85" fill="#38bdf8" fontSize="10">Zero Redundancy (May lose FDs)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive BCNF Analyzer Sandbox ──────── */}
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
                Interactive BCNF Evaluator &amp; Trade-off Analyzer
              </h2>
              <p className="text-xs text-slate-400">
                Inspect overlapping candidate keys, compare 3NF vs BCNF compliance, and view BCNF decomposed SQL schemas
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedBcnfKey("bcnf_student_major")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedBcnfKey === "bcnf_student_major"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. (sid, major) → advisor ✓
              </button>

              <button
                onClick={() => setSelectedBcnfKey("bcnf_advisor_part")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedBcnfKey === "bcnf_advisor_part"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. advisor → major ❌
              </button>

              <button
                onClick={() => setSelectedBcnfKey("bcnf_ab_cb")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedBcnfKey === "bcnf_ab_cb"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Overlapping: C → B ❌
              </button>

              <button
                onClick={() => setSelectedBcnfKey("bcnf_solution")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedBcnfKey === "bcnf_solution"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. BCNF Decomposed Architecture
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: BCNF Analysis */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono">{currentBcnf.notation}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentBcnf.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentBcnf.verdictText}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Determinant (X):</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentBcnf.determinant}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Is Determinant a Super Key?:</span>
                      <p className={clsx("font-bold mt-0.5", currentBcnf.isSuperKey ? "text-emerald-400" : "text-rose-400")}>
                        {currentBcnf.isSuperKey ? "YES (Valid BCNF Determinant)" : "NO (Violates BCNF)"}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Theoretical Explanation:</span>
                      <p className="text-slate-300 mt-0.5">{currentBcnf.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Architectural Action & SQL Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    BCNF Decomposition &amp; SQL Schema Strategy
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentBcnf.sqlAction}
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
                How Barrackpore and Kolkata training institutes apply BCNF normalization
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Major Advisor Normalization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing the classic 3NF relation into two pristine BCNF tables:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Table 1 (Advisors Master Table - BCNF Compliant):
CREATE TABLE advisors (
    advisor_name VARCHAR(100) PRIMARY KEY,
    major VARCHAR(100) NOT NULL
);

-- Table 2 (Student-Advisor Assignments - BCNF Compliant):
CREATE TABLE student_advisors (
    student_id VARCHAR(10) NOT NULL,
    advisor_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (student_id, advisor_name),
    FOREIGN KEY (advisor_name) REFERENCES advisors(advisor_name)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Property Lot County Tax Normalization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Eliminating non-super key county tax rates:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- BCNF County Taxes:
CREATE TABLE county_taxes (
    county_code VARCHAR(20) PRIMARY KEY,
    tax_rate DECIMAL(5,2) NOT NULL
);

-- Properties Table:
CREATE TABLE properties (
    property_id VARCHAR(10) PRIMARY KEY,
    county_code VARCHAR(20) NOT NULL,
    lot_number INT NOT NULL,
    FOREIGN KEY (county_code) REFERENCES county_taxes(county_code)
);`}
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
                Guidelines for evaluating BCNF and choosing between 3NF and BCNF
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
                  <strong className="text-white">1. Assuming 3NF Guarantees BCNF:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Tables with overlapping candidate keys can satisfy 3NF while still containing redundant determinants.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Blindly Decomposing to BCNF:</strong>
                  <p className="text-slate-400 mt-0.5">
                    BCNF can cause loss of functional dependencies, requiring expensive multi-table triggers to enforce business rules.
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
                  <strong className="text-white">1. Every Determinant Must Be a Super Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In BCNF, ensure that every column (or column set) on the left-hand side of an FD is a PRIMARY or UNIQUE key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Weigh 3NF vs BCNF Trade-offs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If dependency preservation is critical for fast transactional inserts, keep the table in 3NF; otherwise, decompose to BCNF.
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
              <span>BCNF Rule: For every non-trivial X → Y, X MUST be a Super Key</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>BCNF has zero exceptions for prime attributes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Resolves anomalies caused by overlapping composite candidate keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>All BCNF tables are automatically in 3NF, 2NF, and 1NF</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>BCNF always guarantees Lossless Join, but may NOT preserve all functional dependencies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Single-attribute candidate key tables have identical 3NF and BCNF representations</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Boyce-Codd Normal Form (BCNF) – FAQs"
            questions={questions}
            subtitle="Master Boyce-Codd Normal Form (BCNF / 3.5NF), strict super key determinants, overlapping candidate keys, and the 3NF vs BCNF dependency preservation trade-off with 30 comprehensive Q&As"
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
            title="Boyce-Codd Normal Form (BCNF): Strict Candidate Key Determinants"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_bcnf_normal_form_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Boyce-Codd Normal Form (BCNF) is the ultimate refinement of functional dependency theory! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I explain to students that BCNF strips away the 'loophole' in 3NF. " +
              "In 3NF, if the right-hand side is a prime attribute, a non-key determinant is permitted. " +
              "BCNF says: 'NO EXCEPTIONS! If you are on the left-hand side of an arrow, you MUST be a super key.' " +
              "While BCNF completely eliminates redundancy, always be aware of the dependency preservation dilemma. " +
              "In production database engineering, understanding when to stay in 3NF and when to decompose into BCNF is the hallmark of a true senior database architect!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · Boyce-Codd Normal Form (BCNF) · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
