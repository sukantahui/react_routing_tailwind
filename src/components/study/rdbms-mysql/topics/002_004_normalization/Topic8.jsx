import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – First Normal Form (1NF): Atomic Values and Eliminating Repeating Groups
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 1NF Normalization Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive 1NF Sandbox State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("scen_phone_csv"); // "scen_phone_csv" | "scen_repeating_cols" | "scen_composite_addr" | "scen_1nf_clean"

  const normalizationScenarios = {
    scen_phone_csv: {
      name: "1. Comma-Separated Values (CSV Anti-Pattern)",
      unfRepresentation: "student_id: #101 | phones: '9830112233, 9830445566, 9830778899'",
      violationType: "MULTI-VALUED ATTRIBUTE",
      badgeColor: "rose",
      whyFails: "Violates domain atomicity. The 'phones' column contains a list rather than a single indivisible scalar. Cannot index individual numbers; queries require slow full table scans.",
      solution1NF: "Extract phones into a dedicated child table: Student_Phones(phone_id PK, student_id FK, phone_number).",
      sqlSchema: `-- 1NF Solution for Multi-Valued Phones:
CREATE TABLE student_phones (
    phone_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);`,
    },
    scen_repeating_cols: {
      name: "2. Repeating Group Columns (Flattened Columns)",
      unfRepresentation: "student_id: #102 | course_1: 'C101' | course_2: 'C102' | course_3: NULL",
      violationType: "REPEATING GROUPS",
      badgeColor: "rose",
      whyFails: "Arbitrary column limits waste storage with NULL values and require DDL ALTER TABLE changes when a student enrolls in a 4th course.",
      solution1NF: "Extract course enrollments into a junction table where each enrollment is an individual atomic row.",
      sqlSchema: `-- 1NF Solution for Repeating Course Columns:
CREATE TABLE student_courses (
    student_id VARCHAR(10) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);`,
    },
    scen_composite_addr: {
      name: "3. Composite Non-Atomic Address String",
      unfRepresentation: "student_id: #103 | address: 'Flat 4B, 12 S.N. Road, Barrackpore, Kolkata - 700120'",
      violationType: "COMPOSITE NON-ATOMIC VALUE",
      badgeColor: "amber",
      whyFails: "Combines street, city, district, and pin code in a single cell. Sorting by city or filtering by postal code requires fragile string substring parsing.",
      solution1NF: "Decompose the composite string into separate atomic columns: street, city, state, and postal_code.",
      sqlSchema: `-- 1NF Solution for Composite Address:
ALTER TABLE students
    ADD COLUMN street_address VARCHAR(150),
    ADD COLUMN city VARCHAR(50),
    ADD COLUMN state VARCHAR(50),
    ADD COLUMN postal_code VARCHAR(10);`,
    },
    scen_1nf_clean: {
      name: "4. Pristine 1NF Relational Architecture",
      unfRepresentation: "Students + Student_Phones + Student_Courses (100% Atomic Scalar Values)",
      violationType: "PERFECT 1NF COMPLIANT",
      badgeColor: "emerald",
      whyFails: "Zero violations! Every column contains atomic scalar values, zero repeating groups exist, and every table possesses a unique Primary Key.",
      solution1NF: "Architecture is in 1NF and ready to be evaluated for 2NF and 3NF normalization.",
      sqlSchema: `-- Complete 1NF Normalized Schema:
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10) NOT NULL
);

CREATE TABLE student_phones (
    phone_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);`,
    },
  };

  const currentScen = normalizationScenarios[selectedScenarioKey];

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
            Module 002_004 · Database Normalization · Topic 8
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            First Normal Form (1NF):{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Atomicity &amp; Eliminating Repeating Groups
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the foundational baseline of relational database design: enforcing scalar atomic values, eliminating multi-valued comma lists,
            flattening repeating group columns, and decomposing composite fields into clean relational schemas.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚛️ Scalar Atomicity Standard
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 No Comma-Separated Values (CSV)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 No Repeating Columns (col_1, col_2)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Mandatory Primary Keys
            </span>
          </div>
        </div>

        {/* ─── SECTION 0: Master Teacher Explains 1NF (Classroom Breakdown) ── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20 transition-all duration-300 hover:border-teal-500/50"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Masterclass: What is First Normal Form (1NF)?
              </h2>
              <p className="text-xs text-slate-400">
                Understanding 1NF easily, efficiently, and intuitively from first principles
              </p>
            </div>
          </div>

          {/* Core Concept & Blackboard Analogy */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>⚛️</span> The "Atomicity" Concept in Plain Words
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In physics, an <strong className="text-teal-300">atom</strong> is something that cannot be divided further. In database design, <strong className="text-cyan-300">First Normal Form (1NF)</strong> means:
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  "Every single cell in every column must hold exactly ONE single (atomic) value. No lists, no arrays, no commas!"
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If a student has 3 phone numbers or 2 email addresses, you <strong>must not</strong> pack them together as <code className="text-rose-300 font-mono">'983011, 983022'</code> inside a single box.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                💡 <strong>Teacher's Tip:</strong> <em>"If you need a comma to separate data inside one table cell, you are breaking 1NF!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> The Classroom Admission Form Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine an admission desk at Barrackpore where students fill out paper forms:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Bad Design (0NF):</strong> Writing 3 hobbies in one tiny box: <code className="text-amber-300 font-mono">"Cricket, Guitar, Coding"</code>. If the computer tries to search for guitarists, it fails because it cannot index individual words inside sentences!
                  </li>
                  <li>
                    <strong className="text-slate-200">Good Design (1NF):</strong> Give each hobby its own clean row or separate child table. Now SQL can search, filter, and index each hobby in <strong>0.001 milliseconds</strong>!
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Benefit:</strong> Fast B-Tree indexes, clean SQL queries, and zero string manipulation bugs.
              </div>
            </div>
          </div>

          {/* The 4 Strict Rules of 1NF */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
              The 4 Golden Rules of 1NF (The Teacher's Checklist)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="text-xs font-bold text-teal-300 uppercase mb-1">Atomic Values</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every column contains only scalar, indivisible values. No lists, CSVs, or multi-item strings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="text-xs font-bold text-cyan-300 uppercase mb-1">No Repeating Groups</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Never create columns like <code className="text-slate-300 font-mono">phone1, phone2, phone3</code>. Use rows instead.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="text-xs font-bold text-indigo-300 uppercase mb-1">Mandatory Primary Key</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every row must be uniquely identifiable. No duplicate, identical clone rows are allowed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition">
                <div className="text-2xl mb-2">4️⃣</div>
                <h4 className="text-xs font-bold text-amber-300 uppercase mb-1">Single Data Type</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All entries in any column must belong to the exact same domain/datatype (e.g. all INT or all DATE).
                </p>
              </div>
            </div>
          </div>

          {/* Teacher's Live Blackboard: Before vs After Transformation */}
          <div className="mt-8 p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-2">
              <span>📋</span> Teacher's Blackboard: Before 1NF (0NF) vs After 1NF Normalization
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad 0NF Table */}
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40">
                <span className="text-xs font-bold font-mono text-rose-400 block mb-2">❌ 0NF (Unnormalized - CSV Lists)</span>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-rose-900/40 text-slate-400">
                      <th className="pb-2">id</th>
                      <th className="pb-2">name</th>
                      <th className="pb-2">courses (Multi-valued)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-rose-950/40">
                    <tr>
                      <td className="py-2 text-teal-400">#101</td>
                      <td className="py-2">Mamata Hui</td>
                      <td className="py-2 text-rose-300 font-bold">'MySQL, React, Node'</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-teal-400">#102</td>
                      <td className="py-2">Mahima S.</td>
                      <td className="py-2 text-rose-300 font-bold">'Python, Django'</td>
                    </tr>
                  </tbody>
                </table>
                <span className="text-[11px] text-rose-300 block mt-2">⚠️ Cannot index individual courses; WHERE course = 'React' fails!</span>
              </div>

              {/* Good 1NF Table */}
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                <span className="text-xs font-bold font-mono text-emerald-400 block mb-2">✅ 1NF (Normalized - Atomic Rows)</span>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-emerald-900/40 text-slate-400">
                      <th className="pb-2">student_id (PK)</th>
                      <th className="pb-2">course_name (PK)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-emerald-950/40">
                    <tr>
                      <td className="py-1 text-teal-400">#101</td>
                      <td className="py-1 text-emerald-300">MySQL</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-teal-400">#101</td>
                      <td className="py-1 text-emerald-300">React</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-teal-400">#101</td>
                      <td className="py-1 text-emerald-300">Node</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-teal-400">#102</td>
                      <td className="py-1 text-emerald-300">Python</td>
                    </tr>
                  </tbody>
                </table>
                <span className="text-[11px] text-emerald-300 block mt-2">✓ Fast B-Tree lookups: <code className="font-mono">WHERE course_name = 'React'</code> uses index!</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 1: 1NF Core Rules & Anti-Patterns ─────────── */}
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
                The 1NF Relational Baseline &amp; The 4 Classic Violations
              </h2>
              <p className="text-xs text-slate-400">
                Dr. E.F. Codd's rule: every table cell must contain exactly one indivisible scalar value
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Violation 1: Multi-Valued Attributes</span>
              <strong className="text-white text-xs block font-mono">phones: "9830112233, 9830445566"</strong>
              <p className="text-xs text-slate-300">
                Storing multiple items in one cell breaks B-Tree index lookups, prevents foreign key enforcement, and requires fragile LIKE queries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Violation 2: Repeating Group Columns</span>
              <strong className="text-white text-xs block font-mono">course_1, course_2, course_3</strong>
              <p className="text-xs text-slate-300">
                Creating numbered columns wastes space with NULLs and requires DDL schema migrations whenever an entity needs more slots.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: 0NF to 1NF Transformation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Converting Unnormalized (0NF) Multi-Values into 1NF Atomic Child Tables
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="1NF Transformation Flow"
            >
              {/* 0NF Bad Table */}
              <g transform="translate(20, 20)">
                <rect width="250" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="250" height="24" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="125" y="16" fill="#f43f5e" textAnchor="middle" fontWeight="bold">0NF (Unnormalized CSV Anti-Pattern)</text>
                <text x="15" y="48" fill="#cbd5e1" fontSize="10">student_id: #101</text>
                <text x="15" y="68" fill="#fca5a5" fontSize="10">courses: 'MySQL, React, DevOps' ❌</text>
                <text x="15" y="88" fill="#94a3b8" fontSize="9">Non-Atomic Multi-Valued Cell</text>
              </g>

              {/* Arrow */}
              <g transform="translate(285, 60)">
                <line x1="0" y1="10" x2="60" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="60,5 75,10 60,15" fill="#10b981" />
                <text x="35" y="-5" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">1NF CURE</text>
              </g>

              {/* 1NF Master Table */}
              <g transform="translate(375, 20)">
                <rect width="180" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="180" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Students (Master PK)</text>
                <text x="15" y="48" fill="#cbd5e1" fontSize="10">student_id: #101 [PK]</text>
                <text x="15" y="68" fill="#cbd5e1" fontSize="10">name: 'Mamata Hui'</text>
                <text x="15" y="88" fill="#a7f3d0" fontSize="9">city: 'Barrackpore'</text>
              </g>

              {/* 1NF Child Table */}
              <g transform="translate(570, 20)">
                <rect width="190" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="190" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" />
                <text x="95" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Student_Courses (Child FK)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="9">(#101, 'C101') [Atomic Row 1]</text>
                <text x="15" y="65" fill="#cbd5e1" fontSize="9">(#101, 'C102') [Atomic Row 2]</text>
                <text x="15" y="85" fill="#cbd5e1" fontSize="9">(#101, 'C103') [Atomic Row 3]</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 1NF Sandbox ────────────────── */}
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
                Interactive 1NF Normalization Transformer Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select an unnormalized data pattern to inspect why it violates 1NF and view the clean relational SQL remedy
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedScenarioKey("scen_phone_csv")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_phone_csv"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Multi-Valued CSV ❌
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_repeating_cols")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_repeating_cols"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Repeating Cols ❌
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_composite_addr")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_composite_addr"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Composite String ⚠️
              </button>

              <button
                onClick={() => setSelectedScenarioKey("scen_1nf_clean")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedScenarioKey === "scen_1nf_clean"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. 1NF Clean Architecture
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Unnormalized Analysis */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentScen.name}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentScen.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentScen.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentScen.violationType}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Unnormalized Sample State:</span>
                      <p className="text-rose-300 font-mono mt-0.5 text-[11px] bg-slate-900 p-1.5 rounded border border-slate-800">
                        {currentScen.unfRepresentation}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Flaw:</span>
                      <p className="text-slate-300 mt-0.5">{currentScen.whyFails}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">1NF Transformation Remedy:</span>
                      <p className="text-emerald-400 font-bold mt-0.5">{currentScen.solution1NF}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Clean SQL DDL Solution */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    1NF Production SQL DDL
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentScen.sqlSchema}
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
                How Barrackpore and Kolkata training institutes apply 1NF normalization
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Emergency Contacts Child Table
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Moving multi-valued emergency contact numbers into a dedicated 1NF child table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 1NF Emergency Contacts Table:
CREATE TABLE student_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Product Tags &amp; Category Junction
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Replacing a CSV string <code>tags = 'electronics, audio, wireless'</code> with a proper M:N junction table:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 1NF Product Tags Junction:
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE product_tags (
    product_id VARCHAR(10) NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
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
                Guidelines for designing atomic, relational schemas in compliance with 1NF
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
                  <strong className="text-white">1. Storing Delimited Strings (CSV):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Storing comma-separated IDs inside a varchar column prevents foreign key enforcement and kills query performance.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Creating Numbered Columns (col_1, col_2):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Flattening repeating groups wastes storage with NULLs and requires DDL schema updates when capacity is exceeded.
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
                  <strong className="text-white">1. Model 1:N with Child Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Whenever an entity can possess multiple items (e.g. phone numbers, skills), immediately create a dedicated child table.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enforce Primary Keys on Every Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantee row uniqueness and relational identity with PRIMARY KEY and UNIQUE constraints.
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
              <span>All column values must be atomic (indivisible scalar values)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Eliminate comma-separated lists and multi-valued string arrays</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Eliminate repeating group columns (e.g. phone_1, phone_2, phone_3)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Separate composite attributes into distinct atomic columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ensure every table has a defined Primary Key with unique rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Move multi-valued relationships into dedicated child or junction tables</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="First Normal Form (1NF) – FAQs"
            questions={questions}
            subtitle="Master First Normal Form (1NF), domain atomicity, eliminating CSV strings and repeating groups, and relational table decomposition with 30 comprehensive Q&As"
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
            title="First Normal Form (1NF): Atomic Values and Eliminating Repeating Groups"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_first_normal_form_1nf_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "First Normal Form (1NF) is the non-negotiable entry ticket to relational database design! " +
              "In my classes at Coder & AccoTax in Barrackpore, I tell my students: " +
              "'A relational database table is NOT an Excel spreadsheet!' " +
              "Never cram multiple values into a single cell with commas, and never create columns like `phone1`, `phone2`, `phone3`. " +
              "When you have multiple values, create a separate child table with a Foreign Key. " +
              "Once every cell contains a clean, indivisible atomic scalar and every row is unique, " +
              "you have achieved First Normal Form (1NF) and your database is ready for higher normalization!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · First Normal Form (1NF) · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
