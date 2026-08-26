import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Comparison of ER Notations: Peter Chen vs Martin (Crow's Foot) vs UML Class Diagrams
 * Module: 002_002_er-and-eer-diagram-modeling
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Multi-Notation Converter,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Multi-Notation Converter State
  const [activeNotation, setActiveNotation] = useState("chen"); // "chen" | "crows_foot" | "uml"

  const notationData = {
    chen: {
      name: "Peter Chen Notation (1976)",
      type: "Conceptual & Academic Gold Standard",
      pros: "Extremely expressive, visually separates entities, relationships, attributes, and constraints into distinct geometric shapes.",
      cons: "Becomes visually cluttered when modeling 50+ enterprise tables due to hundreds of branching attribute ovals.",
      symbols: [
        { name: "Entity", symbol: "Rectangle [STUDENT]", color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
        { name: "Attribute", symbol: "Oval (full_name)", color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
        { name: "Primary Key", symbol: "Underlined Oval (_id_)", color: "text-teal-400 border-teal-500/40 bg-teal-500/10" },
        { name: "Multi-Valued", symbol: "Double Oval ((phones))", color: "text-rose-400 border-rose-500/40 bg-rose-500/10" },
        { name: "Relationship", symbol: "Diamond <Enrolls_In>", color: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10" },
        { name: "Total Part.", symbol: "Double Line (═══)", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
      ],
      diagramSvg: (
        <svg viewBox="0 0 780 140" className="w-full h-auto text-xs font-sans" role="img" aria-label="Chen Notation Diagram">
          {/* Student */}
          <g transform="translate(30, 40)">
            <rect width="160" height="45" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="80" y="27" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="11">STUDENT</text>
          </g>
          {/* Attributes */}
          <ellipse cx="60" cy="15" rx="45" ry="12" fill="#1e293b" stroke="#10b981" />
          <text x="60" y="19" fill="#10b981" textAnchor="middle" textDecoration="underline" fontSize="9">student_id</text>
          <line x1="60" y1="27" x2="60" y2="40" stroke="#64748b" />

          {/* Relationship Diamond */}
          <g transform="translate(300, 30)">
            <polygon points="70,0 140,32 70,64 0,32" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
            <text x="70" y="36" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Enrolls_In</text>
          </g>

          <line x1="190" y1="62" x2="300" y2="62" stroke="#64748b" strokeWidth="2" />
          <text x="245" y="55" fill="#cbd5e1" fontSize="10" fontWeight="bold">M</text>

          <line x1="440" y1="62" x2="550" y2="62" stroke="#64748b" strokeWidth="2" />
          <text x="495" y="55" fill="#cbd5e1" fontSize="10" fontWeight="bold">N</text>

          {/* Course */}
          <g transform="translate(550, 40)">
            <rect width="160" height="45" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="80" y="27" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="11">COURSE</text>
          </g>
          <ellipse cx="630" cy="15" rx="45" ry="12" fill="#1e293b" stroke="#10b981" />
          <text x="630" y="19" fill="#10b981" textAnchor="middle" textDecoration="underline" fontSize="9">course_id</text>
          <line x1="630" y1="27" x2="630" y2="40" stroke="#64748b" />
        </svg>
      ),
    },
    crows_foot: {
      name: "Martin / Information Engineering (Crow's Foot)",
      type: "Industry & MySQL Workbench Standard",
      pros: "Compact, readable, eliminates outer ovals by embedding attributes inside table compartments. Scales to hundreds of tables.",
      cons: "Omits relationship diamonds, making relationship attributes slightly less explicit until mapped to a junction table.",
      symbols: [
        { name: "Mandatory One", symbol: "Double Bar (||)", color: "text-teal-400 border-teal-500/40 bg-teal-500/10" },
        { name: "Optional One", symbol: "Circle + Bar (o|)", color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
        { name: "Mandatory Many", symbol: "Bar + Crow (&gt;|)", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
        { name: "Optional Many", symbol: "Circle + Crow (>o)", color: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10" },
        { name: "Identifying Rel", symbol: "Solid Line (───)", color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
        { name: "Non-Identifying", symbol: "Dashed Line (- - -)", color: "text-slate-400 border-slate-700 bg-slate-800/40" },
      ],
      diagramSvg: (
        <svg viewBox="0 0 780 140" className="w-full h-auto text-xs font-sans" role="img" aria-label="Crows Foot Diagram">
          {/* Table: students */}
          <g transform="translate(30, 20)">
            <rect width="180" height="90" rx="4" fill="#1e293b" stroke="#38bdf8" />
            <rect width="180" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" />
            <text x="90" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">students</text>
            <text x="15" y="42" fill="#10b981" fontWeight="bold">PK student_id : INT</text>
            <line x1="10" y1="50" x2="170" y2="50" stroke="#334155" />
            <text x="15" y="68" fill="#cbd5e1">first_name : VARCHAR</text>
            <text x="15" y="84" fill="#cbd5e1">admission_fee : DECIMAL</text>
          </g>

          {/* Table: student_courses (Junction) */}
          <g transform="translate(290, 20)">
            <rect width="200" height="90" rx="4" fill="#1e293b" stroke="#818cf8" />
            <rect width="200" height="24" rx="4" fill="#0f172a" stroke="#818cf8" />
            <text x="100" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold">student_courses</text>
            <text x="15" y="42" fill="#10b981" fontWeight="bold">PK,FK1 student_id : INT</text>
            <text x="15" y="58" fill="#10b981" fontWeight="bold">PK,FK2 course_id : INT</text>
            <line x1="10" y1="66" x2="190" y2="66" stroke="#334155" />
            <text x="15" y="82" fill="#cbd5e1">enrolled_at : DATE</text>
          </g>

          {/* Table: courses */}
          <g transform="translate(570, 20)">
            <rect width="180" height="90" rx="4" fill="#1e293b" stroke="#38bdf8" />
            <rect width="180" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" />
            <text x="90" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">courses</text>
            <text x="15" y="42" fill="#10b981" fontWeight="bold">PK course_id : INT</text>
            <line x1="10" y1="50" x2="170" y2="50" stroke="#334155" />
            <text x="15" y="68" fill="#cbd5e1">course_title : VARCHAR</text>
            <text x="15" y="84" fill="#cbd5e1">fee : DECIMAL</text>
          </g>

          {/* Connections with Crow's Feet */}
          <line x1="210" y1="65" x2="290" y2="65" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="490" y1="65" x2="570" y2="65" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      ),
    },
    uml: {
      name: "UML Class Diagram Notation",
      type: "Software Engineering & Full-Stack Standard",
      pros: "Directly bridges Object-Oriented application classes (Java, TypeScript, Python) with relational tables.",
      cons: "Requires translating OO concepts (methods, interfaces) into relational concepts (foreign keys, check constraints).",
      symbols: [
        { name: "Class Box", symbol: "3 Compartments", color: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10" },
        { name: "Primary Key", symbol: "<<PK>&gt; or {id}", color: "text-teal-400 border-teal-500/40 bg-teal-500/10" },
        { name: "Multiplicities", symbol: "0..1, 1..1, 0..*, 1..*", color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
        { name: "Weak Entity", symbol: "Composition (Solid ◆)", color: "text-rose-400 border-rose-500/40 bg-rose-500/10" },
        { name: "Association Class", symbol: "Junction Table Attached", color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
        { name: "Inheritance", symbol: "Hollow Triangle (▷)", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
      ],
      diagramSvg: (
        <svg viewBox="0 0 780 140" className="w-full h-auto text-xs font-sans" role="img" aria-label="UML Class Diagram">
          {/* Class: Student */}
          <g transform="translate(40, 20)">
            <rect width="180" height="90" rx="2" fill="#1e293b" stroke="#818cf8" />
            <rect width="180" height="24" fill="#0f172a" stroke="#818cf8" />
            <text x="90" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold">Student</text>
            <text x="15" y="44" fill="#cbd5e1">+ studentId : Integer «PK»</text>
            <text x="15" y="60" fill="#cbd5e1">+ fullName : String</text>
            <line x1="10" y1="68" x2="170" y2="68" stroke="#334155" />
            <text x="15" y="82" fill="#94a3b8">+ enroll() : void</text>
          </g>

          {/* Association Line */}
          <line x1="220" y1="65" x2="540" y2="65" stroke="#818cf8" strokeWidth="2" />
          <text x="240" y="55" fill="#818cf8" fontWeight="bold">1</text>
          <text x="515" y="55" fill="#818cf8" fontWeight="bold">0..*</text>

          {/* Class: Course */}
          <g transform="translate(540, 20)">
            <rect width="180" height="90" rx="2" fill="#1e293b" stroke="#818cf8" />
            <rect width="180" height="24" fill="#0f172a" stroke="#818cf8" />
            <text x="90" y="16" fill="#818cf8" textAnchor="middle" fontWeight="bold">Course</text>
            <text x="15" y="44" fill="#cbd5e1">+ courseId : Integer «PK»</text>
            <text x="15" y="60" fill="#cbd5e1">+ title : String</text>
            <line x1="10" y1="68" x2="170" y2="68" stroke="#334155" />
            <text x="15" y="82" fill="#94a3b8">+ getSyllabus() : String</text>
          </g>
        </svg>
      ),
    },
  };

  const currentNotation = notationData[activeNotation];

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
            Module 002_002 · ER & EER Modeling · Topic 7
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Comparison of ER Notations:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Chen vs Crow's Foot vs UML
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Compare the three dominant visual data modeling standards: Peter Chen (1976), Martin / Information Engineering
            (Crow's Foot), and UML Class Diagrams—understanding visual symbols, trade-offs, and toolchain workflows.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Peter Chen Notation (1976)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🦅 Crow's Foot / IE (Workbench)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 UML Class Diagrams
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Visual Cross-Translation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Notation Comparison Matrix ───────────────── */}
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
                Comprehensive Notation Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Cross-reference visual symbols across the 3 dominant data modeling paradigms
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Modeling Concept</th>
                  <th className="p-3 text-amber-400">Peter Chen (1976)</th>
                  <th className="p-3 text-cyan-400">Crow's Foot (Martin / IE)</th>
                  <th className="p-3 text-indigo-400">UML Class Diagram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                <tr>
                  <td className="p-3 font-bold text-white">Entity / Table</td>
                  <td className="p-3 text-amber-300">Rectangle [STUDENT]</td>
                  <td className="p-3 text-cyan-300">Table Box with PK section</td>
                  <td className="p-3 text-indigo-300">3-Compartment Class Box</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Attribute</td>
                  <td className="p-3 text-amber-300">Oval branching outside</td>
                  <td className="p-3 text-cyan-300">Listed inside table box</td>
                  <td className="p-3 text-indigo-300">Middle compartment row</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Primary Key</td>
                  <td className="p-3 text-amber-300">Underlined Oval text</td>
                  <td className="p-3 text-cyan-300">Top compartment / 'PK'</td>
                  <td className="p-3 text-indigo-300">Stereotype &lt;&lt;PK&gt;&gt; or &#123;id&#125;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Relationship</td>
                  <td className="p-3 text-amber-300">Diamond &lt;Enrolls_In&gt;</td>
                  <td className="p-3 text-cyan-300">Direct connecting line</td>
                  <td className="p-3 text-indigo-300">Association line</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Mandatory Participation</td>
                  <td className="p-3 text-amber-300">Double Line (════)</td>
                  <td className="p-3 text-cyan-300">Vertical Bar ( | )</td>
                  <td className="p-3 text-indigo-300">Multiplicity 1..* or 1</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Weak Entity</td>
                  <td className="p-3 text-amber-300">Double Rectangle [[ ]]</td>
                  <td className="p-3 text-cyan-300">Solid Identifying line</td>
                  <td className="p-3 text-indigo-300">Composition (Solid Diamond ◆)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Multi-Notation Converter ────── */}
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
                Interactive Multi-Notation Diagram Converter
              </h2>
              <p className="text-xs text-slate-400">
                Switch between Chen, Crow's Foot, and UML to observe visual schema transformations
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Tab Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveNotation("chen")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeNotation === "chen"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Peter Chen Notation (1976)
              </button>
              <button
                onClick={() => setActiveNotation("crows_foot")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeNotation === "crows_foot"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Crow's Foot (MySQL Workbench)
              </button>
              <button
                onClick={() => setActiveNotation("uml")}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border",
                  activeNotation === "uml"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. UML Class Diagram
              </button>
            </div>

            {/* Active Details */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{currentNotation.name}</h3>
                  <span className="text-xs text-teal-400 font-mono">{currentNotation.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30">
                  <strong className="text-emerald-400 block mb-0.5">Primary Advantages:</strong>
                  <p className="text-slate-300 text-[11px]">{currentNotation.pros}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-rose-500/30">
                  <strong className="text-rose-400 block mb-0.5">Practical Limitations:</strong>
                  <p className="text-slate-300 text-[11px]">{currentNotation.cons}</p>
                </div>
              </div>

              {/* Visual Symbols Grid */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                  Key Visual Symbols in this Notation:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                  {currentNotation.symbols.map((sym, idx) => (
                    <div key={idx} className={clsx("p-2 rounded-lg border font-mono text-[11px]", sym.color)}>
                      <span className="font-bold block text-white">{sym.name}</span>
                      <span className="text-[10px] mt-0.5 block">{sym.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic SVG Diagram */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-2 text-center uppercase tracking-wider">
                  Live Schema Rendering in {currentNotation.name}:
                </span>
                {currentNotation.diagramSvg}
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
                Notation choices across software engineering teams in Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Client Proposal (Peter Chen vs Crow's Foot)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Consulting</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Used Peter Chen diagrams in client business meetings, then generated Crow's Foot models in MySQL Workbench.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Client Meeting: Conceptual ER (Entities & Relationships)
-- Engineering Sprint: Crow's Foot Schema in MySQL Workbench
-- Production DDL: CREATE TABLE students (...) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Full-Stack Team (UML to Relational Mapping)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Tech Hub</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Mapped TypeScript domain classes into 3NF MySQL tables with matching foreign keys.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`// TypeScript Class: class Student { id: number; name: string; }
// MySQL Table: CREATE TABLE students (student_id INT PRIMARY KEY, name VARCHAR(100));`}
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
                Avoid notation mixing and diagram oval explosion on large enterprise schemas
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
                  <strong className="text-white">1. Chen Ovals on Large Schemas:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Drawing 300 attribute ovals on a 40-table schema creates illegible spaghetti diagrams.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Mixing Notation Symbols:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Putting relationship diamonds in Crow's foot or crow's feet on Chen lines causes confusion.
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
                  <strong className="text-white">1. Crow's Foot in MySQL Workbench:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use Crow's Foot for physical architecture diagrams and automated DDL forward engineering.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. UML for Full-Stack Collaboration:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use UML Class Diagrams when aligning database tables with backend ORM models.
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
              <span>Peter Chen Notation uses Rectangles (Entities), Ovals (Attributes), and Diamonds (Relationships)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Crow's Foot (IE) embeds attributes inside table compartments and scales to 100+ tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Crow's Foot symbols: `||` (Exactly 1), `o|` (0 or 1), `&gt;|` (1 or more), `&gt;o` (0 or more)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>UML Class Diagrams bridge object-oriented code with database schemas</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Weak Entities: Double Rectangles in Chen, Rounded Boxes in Crow's foot, Composition in UML</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never mix symbols from different notations on the same architectural diagram</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Comparison of ER Notations – FAQs"
            questions={questions}
            subtitle="Master Peter Chen, Crow's Foot (IE), and UML Class Diagram symbols, trade-offs, and toolchains with 30 comprehensive Q&As"
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
            title="Comparison of ER Notations: Peter Chen vs Crow's Foot vs UML"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_er_notations_comparison_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Fluency in multiple data modeling notations is a hallmark of a seasoned database architect! " +
              "In my classes in Barrackpore, I teach students to pick the right visual tool for the right audience: " +
              "When you are in a boardroom discussing conceptual business requirements, Peter Chen's geometric shapes " +
              "(Rectangles, Ovals, Diamonds) make business logic crystal clear. When you open MySQL Workbench to build a 60-table " +
              "production database, Crow's Foot notation keeps your diagrams clean and compact. And when you sit down with backend " +
              "software developers building ORMs, UML Class Diagrams bridge the gap between tables and classes seamlessly."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · ER Notations Comparison · Module 002_002 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
