import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – UNIQUE Constraint: Ensuring Distinct Values (Single & Multi-Column)
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Unique Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [testEmail, setTestEmail] = useState("mamata@codernaccotax.in");
  const [testRoll, setTestRoll] = useState("REG-2026-001");
  const [allowNull, setAllowNull] = useState(false);
  const [engineResponse, setEngineResponse] = useState(
    "Enter an email & roll number, then click 'Test INSERT with UNIQUE Constraint'."
  );

  const [studentsList, setStudentsList] = useState([
    { id: 101, name: "Mamata Hui", email: "mamata@codernaccotax.in", roll: "REG-2026-001", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", email: "abhronila@codernaccotax.in", roll: "REG-2026-002", city: "Barrackpore" },
    { id: 103, name: "Susmita Ghosh", email: "susmita@codernaccotax.in", roll: "REG-2026-003", city: "Kolkata" },
  ]);

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

  const handleTestInsert = () => {
    const finalEmail = allowNull ? null : testEmail.trim();
    const finalRoll = testRoll.trim();

    // Check Roll Collision
    const rollCollision = studentsList.find((s) => s.roll === finalRoll);
    if (rollCollision) {
      setEngineResponse(
        `❌ ERROR 1062 (23000): Duplicate entry '${finalRoll}' for key 'uq_student_roll'. Unique constraint rejected insertion!`
      );
      return;
    }

    // Check Email Collision (Note: In SQL, NULL != NULL, so multiple nulls pass)
    if (finalEmail !== null) {
      const emailCollision = studentsList.find((s) => s.email === finalEmail);
      if (emailCollision) {
        setEngineResponse(
          `❌ ERROR 1062 (23000): Duplicate entry '${finalEmail}' for key 'uq_student_email'. Unique constraint rejected insertion!`
        );
        return;
      }
    }

    // Successful insertion
    const newId = 100 + studentsList.length + 1;
    const newStudent = {
      id: newId,
      name: "New Student",
      email: finalEmail,
      roll: finalRoll,
      city: "Barrackpore",
    };

    setStudentsList([...studentsList, newStudent]);
    if (finalEmail === null) {
      setEngineResponse(
        `✓ Query OK, 1 row affected (0.01 sec). Note: Multiple NULL email values are PERMITTED in standard SQL UNIQUE constraints!`
      );
    } else {
      setEngineResponse(
        `✓ Query OK, 1 row affected (0.01 sec). Successfully inserted student ID ${newId} with unique email & roll number.`
      );
    }
  };

  const handleReset = () => {
    setStudentsList([
      { id: 101, name: "Mamata Hui", email: "mamata@codernaccotax.in", roll: "REG-2026-001", city: "Barrackpore" },
      { id: 102, name: "Abhronila Das", email: "abhronila@codernaccotax.in", roll: "REG-2026-002", city: "Barrackpore" },
      { id: 103, name: "Susmita Ghosh", email: "susmita@codernaccotax.in", roll: "REG-2026-003", city: "Kolkata" },
    ]);
    setEngineResponse("Simulator reset to initial state.");
  };

  const generatedDDL = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    roll_no VARCHAR(20) NOT NULL,\n    email VARCHAR(100) ${
    allowNull ? "NULL" : "NOT NULL"
  },\n    -- Independent Unique Constraints\n    CONSTRAINT uq_student_roll UNIQUE (roll_no),\n    CONSTRAINT uq_student_email UNIQUE (email)\n) ENGINE=InnoDB;`;

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
            Module 001_003 · Keys & Constraints · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            UNIQUE{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraint & Distinctness
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master single and multi-column unique constraints, secondary B-Tree indexes, NULL handling exceptions,
            and functional case-insensitive unique indexes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Single-Column UNIQUE
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧩 Composite UNIQUE Pairs
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ❓ The NULL Exception
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Functional Indexes (LOWER)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: UNIQUE vs PRIMARY KEY Mechanics ────────── */}
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
                PRIMARY KEY vs UNIQUE Constraints Compared
              </h2>
              <p className="text-xs text-slate-400">
                Understanding clustered storage vs secondary unique B-Tree indexes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PK */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                PRIMARY KEY (Clustered Index)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Exactly ONE per table. Strictly forbids NULL values. Governs physical disk storage layout.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                student_id INT AUTO_INCREMENT PRIMARY KEY
              </pre>
            </div>

            {/* UNIQUE */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                UNIQUE Constraint (Secondary Index)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Multiple permitted per table. Permits NULL values by default. Creates secondary B-Tree index.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                CONSTRAINT uq_student_email UNIQUE (email)
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: NULL Exception Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The NULL Exception in UNIQUE Constraints (NULL != NULL in SQL)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="NULL in UNIQUE Diagram"
            >
              {/* Box 1 */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ Duplicate Non-Null Values (REJECTED)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">Row 1: email = 'mamata@gmail.com'</text>
                <text x="20" y="74" fill="#f43f5e" fontWeight="bold" fontSize="10">Row 2: email = 'mamata@gmail.com' → ERROR 1062</text>
              </g>

              {/* Box 2 */}
              <g transform="translate(410, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ✓ Multiple NULL Values (PERMITTED)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">Row 1: email = NULL</text>
                <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">Row 2: email = NULL → ACCEPTED (NULL != NULL)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Unique Sandbox ─────────────── */}
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
                Interactive UNIQUE Constraint Collision Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test inserting duplicate emails or roll numbers, and experiment with the NULL uniqueness exception
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Proposed Student Email:
                </label>
                <input
                  type="text"
                  value={testEmail}
                  disabled={allowNull}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none disabled:opacity-30"
                  placeholder="e.g. mamata@codernaccotax.in"
                />
                <label className="mt-2 flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowNull}
                    onChange={(e) => setAllowNull(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-teal-500 focus:ring-0"
                  />
                  <span>Test with <code>email = NULL</code> (Test NULL Uniqueness Exception)</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Proposed Roll Number:
                </label>
                <input
                  type="text"
                  value={testRoll}
                  onChange={(e) => setTestRoll(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. REG-2026-001"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleTestInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span> Test INSERT with UNIQUE Constraint
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Feedback:
                </span>
                {engineResponse}
              </div>
            </div>

            {/* Generated DDL & Live Student List */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Active Students Table ({studentsList.length} records):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Roll No (Unique)</th>
                        <th className="p-2">Email (Unique)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentsList.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">{s.id}</td>
                          <td className="p-2 text-white font-sans font-medium">{s.roll}</td>
                          <td className="p-2">
                            {s.email === null ? (
                              <span className="text-amber-400 italic">NULL</span>
                            ) : (
                              <span className="text-teal-300">{s.email}</span>
                            )}
                          </td>
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
                Single and composite unique architectures from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Multi-Identifier Uniqueness
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Identity</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Protecting national identity attributes and contact details with independent unique constraints.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_identities (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL,
    aadhaar_no CHAR(12) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_no VARCHAR(10) NOT NULL,
    -- Independent Unique Constraints
    CONSTRAINT uq_roll UNIQUE (roll_no),
    CONSTRAINT uq_aadhaar UNIQUE (aadhaar_no),
    CONSTRAINT uq_email UNIQUE (email),
    CONSTRAINT uq_phone UNIQUE (phone_no)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Product SKU & Slug Uniqueness
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enforcing uniqueness on human-readable product URL slugs and warehouse inventory SKUs.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    sku_code VARCHAR(30) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT uq_product_sku UNIQUE (sku_code),
    CONSTRAINT uq_product_slug UNIQUE (slug)
) ENGINE=InnoDB;`}
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
                Avoid unique constraint pitfalls and dropping errors
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
                  <strong className="text-white">1. Overlooking the NULL Exception:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting <code>NOT NULL</code> on a unique column allows multiple duplicate NULL rows.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Dropping with DROP CONSTRAINT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In MySQL, unique keys must be dropped with <code>ALTER TABLE tbl DROP INDEX uq_name;</code>.
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
                  <strong className="text-white">1. Pair UNIQUE with NOT NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Mandates presence while guaranteeing strict distinctness.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Functional Unique Indexes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>UNIQUE ((LOWER(email)))</code> in MySQL 8.0 for case-insensitive distinctness.
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
              <span><code>UNIQUE</code> guarantees all non-null values are distinct</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Multiple <code>NULL</code> values are permitted in standard unique columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Combine <code>UNIQUE NOT NULL</code> to forbid both duplicates and NULLs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Composite unique constraints enforce distinctness across column pairings</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Drop unique constraints using <code>ALTER TABLE tbl DROP INDEX uq_name</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DUPLICATE KEY UPDATE</code> to handle collisions gracefully</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="UNIQUE Constraints – FAQs"
            questions={questions}
            subtitle="Master distinct column values, composite unique pairings, and NULL handling with 30 comprehensive Q&As"
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
            title="UNIQUE Constraint: Ensuring Distinct Values (Single & Multi-Column)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_unique_constraint_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Many junior developers assume that adding a `UNIQUE` constraint is all they need to prevent duplicates. " +
              "In my classes in Barrackpore, I surprise students with the classic SQL riddle: why does MySQL allow five rows " +
              "with the same NULL email in a unique column? Because in relational algebra, `NULL != NULL`. If you want a column " +
              "like Email, Phone Number, or Roll Number to be strictly unique AND mandatory, you must always declare it as " +
              "`NOT NULL UNIQUE`. That simple habit will save your backend from subtle authentication bugs and duplicate profile creations."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · UNIQUE Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
