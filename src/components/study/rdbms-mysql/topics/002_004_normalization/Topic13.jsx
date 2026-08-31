import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Join Dependencies & Fifth Normal Form (5NF / PJNF) Overview
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 5NF Ternary Relationship Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive 5NF Simulator State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("scen_5nf_clean"); // "scen_ternary_monolith" | "scen_bad_binary" | "scen_5nf_clean" | "scen_hierarchy"

  const scenarios = {
    scen_ternary_monolith: {
      title: "1. Monolithic Ternary Table (Violates 5NF)",
      notation: "Consulting(developer, company, project)",
      joinType: "N/A (Single Monolithic Table)",
      verdictBadge: "VIOLATES 5NF (CYCLIC REDUNDANCY)",
      badgeColor: "rose",
      explanation: "Under a 3-way cyclic rule (if Dev works for Company, and Company sponsors Project, and Dev works on Project ➔ Dev must do Project for Company), storing this in 1 table forces redundant combination updates.",
      sqlAction: "Needs 5NF decomposition into 3 binary association tables.",
    },
    scen_bad_binary: {
      title: "2. Flawed 2-Table Binary Decomposition (Lossy Join)",
      notation: "R1(dev, company) ⋈ R2(company, project)",
      joinType: "Binary Natural Join (Lossy)",
      verdictBadge: "❌ LOSSY JOIN (SPURIOUS TUPLES GENERATED)",
      badgeColor: "rose",
      explanation: "Decomposing into only 2 tables loses the direct (dev, project) pairing! Joining R1 and R2 produces false 'phantom' rows where a developer appears to work on projects they never touched!",
      sqlAction: "Fails Heath's Theorem. Binary decomposition is impossible for cyclic ternary relations.",
    },
    scen_5nf_clean: {
      title: "3. 5NF Lossless 3-Table Decomposition",
      notation: "R1(dev, comp) ⋈ R2(comp, proj) ⋈ R3(dev, proj)",
      joinType: "3-Way Lossless Natural Join",
      verdictBadge: "✓ 100% 5NF / PJNF COMPLIANT",
      badgeColor: "emerald",
      explanation: "Decomposing into 3 binary tables satisfies the Join Dependency ⋈[R1, R2, R3]. Natural join across all 3 tables reconstructs the exact original relation with ZERO spurious rows!",
      sqlAction: `-- 5NF Production Schema:
CREATE TABLE dev_companies (
    developer VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    PRIMARY KEY (developer, company)
);

CREATE TABLE company_projects (
    company VARCHAR(100) NOT NULL,
    project VARCHAR(100) NOT NULL,
    PRIMARY KEY (company, project)
);

CREATE TABLE dev_projects (
    developer VARCHAR(100) NOT NULL,
    project VARCHAR(100) NOT NULL,
    PRIMARY KEY (developer, project)
);`,
    },
    scen_hierarchy: {
      title: "4. The Complete Normal Form Hierarchy",
      notation: "1NF ➔ 2NF ➔ 3NF ➔ BCNF ➔ 4NF ➔ 5NF (PJNF) ➔ 6NF",
      joinType: "The Theoretical Summit of Normalization",
      verdictBadge: "THEORETICAL MAXIMUM",
      badgeColor: "emerald",
      explanation: "5NF represents the absolute limit of redundancy elimination via project-join operators. Beyond 5NF lies DKNF (domain-key) and 6NF (temporal primary key + 1 column).",
      sqlAction: "In production OLTP, 3NF/BCNF is the standard target, with 4NF/5NF applied when independent M:N facts exist.",
    },
  };

  const currentScen = scenarios[selectedScenarioKey];

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
            Module 002_004 · Database Normalization · Topic 13
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Join Dependencies (JD) &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Fifth Normal Form (5NF / PJNF)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master Project-Join Normal Form (5NF): understanding n-ary Join Dependencies ⋈[R1, ..., Rn],
            decomposing cyclic ternary relationships into 3 lossless binary tables, and exploring the summit of relational normalization.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Join Dependency: ⋈[R1, R2, ..., Rn]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔺 Ternary Cyclic Constraints
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ 3-Table Lossless Decomposition
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏔️ Theoretical Peak of Project-Join
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: 5NF & Join Dependency Theory ───────────── */}
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
                Join Dependencies &amp; The 5NF Project-Join Standard
              </h2>
              <p className="text-xs text-slate-400">
                The theoretical limit of lossless decomposition using project and natural join operators
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">The 5NF Flaw: Ternary Cycles</span>
              <strong className="text-white text-xs block font-mono">{"(Developer, Company, Project)"}</strong>
              <p className="text-xs text-slate-300">
                When 3 entities have a mutual cyclic rule, a single table creates redundant combinations, and any 2-table split produces false phantom rows.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The 5NF Cure: 3 Binary Tables</span>
              <strong className="text-white text-xs block font-mono">{"R1(D, C) ⋈ R2(C, P) ⋈ R3(D, P)"}</strong>
              <p className="text-xs text-slate-300">
                Decomposing into 3 separate binary association tables completely eliminates redundancy and guarantees 100% lossless natural join!
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 5NF Triangle Graph ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 5NF Ternary Cyclic Relationship Triangle &amp; 3-Table Lossless Join
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="5NF Triangle Diagram"
            >
              {/* Top Node: Developer */}
              <g transform="translate(180, 20)">
                <circle cx="50" cy="20" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="50" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Developer</text>
              </g>

              {/* Bottom Left Node: Company */}
              <g transform="translate(80, 100)">
                <circle cx="50" cy="20" r="28" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="50" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Company</text>
              </g>

              {/* Bottom Right Node: Project */}
              <g transform="translate(280, 100)">
                <circle cx="50" cy="20" r="28" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="50" y="24" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Project</text>
              </g>

              {/* Connecting Edges */}
              <line x1="210" y1="40" x2="150" y2="105" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <text x="160" y="70" fill="#fde68a" fontSize="8">R1(Dev, Comp)</text>

              <line x1="250" y1="40" x2="310" y2="105" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <text x="295" y="70" fill="#fde68a" fontSize="8">R3(Dev, Proj)</text>

              <line x1="160" y1="120" x2="300" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <text x="230" y="135" fill="#fde68a" textAnchor="middle" fontSize="8">R2(Comp, Proj)</text>

              {/* Join Summary Box */}
              <g transform="translate(420, 25)">
                <rect width="330" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="165" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold">5NF / PJNF Lossless Join Formula</text>
                <text x="15" y="48" fill="#cbd5e1" fontSize="10">Join Dependency: ⋈[R1, R2, R3]</text>
                <text x="15" y="68" fill="#38bdf8" fontSize="10">R = R1(Dev, Comp) ⋈ R2(Comp, Proj) ⋈ R3(Dev, Proj)</text>
                <text x="15" y="88" fill="#a7f3d0" fontSize="9">✓ 100% Lossless Reconstruction (Zero Spurious Tuples)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 5NF Sandbox ────────────────── */}
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
                Interactive 5NF Ternary Decomposition Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Compare monolithic ternary tables, flawed binary splits (lossy joins), and clean 5NF 3-table schemas
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedScenarioKey("scen_ternary_monolith")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_ternary_monolith"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Monolithic Ternary ❌
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_bad_binary")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_bad_binary"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Bad 2-Table Split ❌
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_5nf_clean")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_5nf_clean"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. 5NF 3-Table Solution ✓
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_hierarchy")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_hierarchy"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Full Normal Hierarchy
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Analysis */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentScen.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentScen.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentScen.verdictBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Mathematical Schema:</span>
                      <p className="text-cyan-300 font-mono mt-0.5">{currentScen.notation}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Natural Join Behavior:</span>
                      <p className="text-white font-bold mt-0.5">{currentScen.joinType}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Evaluation Rationale:</span>
                      <p className="text-slate-300 mt-0.5">{currentScen.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: SQL Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    5NF Relational SQL Architecture
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentScen.sqlAction}
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
                How Barrackpore and Kolkata training institutes structure ternary associations in 5NF
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Developer Consulting Partnership 5NF Decomposition
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Decomposing the ternary consulting relationship into three binary tables:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 5NF Binary Associations:
CREATE TABLE developer_companies (
    dev_id VARCHAR(10) NOT NULL,
    company_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (dev_id, company_id)
);

CREATE TABLE company_projects (
    company_id VARCHAR(10) NOT NULL,
    project_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (company_id, project_id)
);

CREATE TABLE developer_projects (
    dev_id VARCHAR(10) NOT NULL,
    project_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (dev_id, project_id)
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Hospital Doctor Specialty Ward Normalization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Medical Center</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Reconstructing hospital assignments via 3-way natural join:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Querying 5NF Decomposed Medical Staffing:
SELECT 
    ds.doctor_id,
    sw.specialty_name,
    dw.ward_number
FROM doctor_specialties ds
JOIN specialty_wards sw ON ds.specialty_name = sw.specialty_name
JOIN doctor_wards dw ON ds.doctor_id = dw.doctor_id AND sw.ward_number = dw.ward_number;`}
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
                Guidelines for identifying Join Dependencies and managing 5NF schemas
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
                  <strong className="text-white">1. Attempting 2-Table Splits on Ternary Cycles:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Decomposing a 3-way cyclic relationship into only 2 tables produces spurious phantom rows upon join.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Over-Normalizing Without Cyclic Rules:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If no cyclic constraint exists, 5NF decomposition is unnecessary and introduces needless join overhead.
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
                  <strong className="text-white">1. Identify Cyclic Business Constraints:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Whenever a business rule dictates that 3 entity pairings imply a mutual 3-way fact, use 3 binary tables.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enforce Composite Primary Keys on Binary Associations:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Every binary association table in 5NF should have a composite primary key of both entity columns.
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
              <span>Join Dependency ⋈[R1, ..., Rn]: Relation equals the natural join of its n projections</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MVD is a special binary case of JD (n = 2); 5NF handles n-ary JDs (n ≥ 3)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>5NF Rule: Every component Ri in a non-trivial JD must be a Super Key of R</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>5NF eliminates all redundancy removable by Project-Join operators</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decompose ternary cyclic dependencies into 3 binary association tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>5NF represents the theoretical summit of project-join relational normalization</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Fifth Normal Form (5NF) &amp; Join Dependencies – FAQs"
            questions={questions}
            subtitle="Master Join Dependencies (JD), Fifth Normal Form (5NF / PJNF), ternary cyclic relationships, and lossless multi-table joins with 30 comprehensive Q&As"
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
            title="Join Dependencies & Fifth Normal Form (5NF / PJNF) Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_5nf_join_dependencies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Fifth Normal Form (5NF / Project-Join Normal Form) is the absolute summit of relational decomposition theory! " +
              "In my classes at Coder & AccoTax in Barrackpore, I describe 5NF as the 'Triangle Problem': " +
              "If Developer A works for Company B, Company B sponsors Project C, and Developer A works on Project C, " +
              "all three facts are cyclically bound together. " +
              "You cannot break a triangle into two lines without losing the closing connection. " +
              "You must break it into three separate lines: (A, B), (B, C), and (A, C). " +
              "While 5NF is rarely required in everyday commercial apps, understanding Join Dependencies gives you deep mastery over relational join mathematics!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · 5NF &amp; Join Dependencies · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
