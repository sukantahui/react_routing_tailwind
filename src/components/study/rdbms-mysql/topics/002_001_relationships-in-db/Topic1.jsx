import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – One-to-One (1:1) Relationship: Schema Design & Use Cases
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive 1:1 Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [strategy, setStrategy] = useState("fk_unique"); // "fk_unique" vs "shared_pk"
  const [testDuplicateAttempt, setTestDuplicateAttempt] = useState(false);
  const [engineResponse, setEngineResponse] = useState(
    "Select a 1:1 strategy and test creating linked student and confidential KYC/Passport records."
  );

  const [studentRows, setStudentRows] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore" },
  ]);

  const [passportRows, setPassportRows] = useState([
    { id: 1, passportNo: "Z894210", studentId: 101, verified: "Yes" },
    { id: 2, passportNo: "P112390", studentId: 102, verified: "Yes" },
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
    if (testDuplicateAttempt) {
      setEngineResponse(
        "❌ ERROR 1062 (23000): Duplicate entry '101' for key 'student_passports.uq_student_id'. A 1:1 relationship prevents student #101 (Mamata Hui) from having multiple passports!"
      );
      return;
    }

    const nextId = 100 + studentRows.length + 1;
    const newStudent = { id: nextId, name: "Susmita Ghosh", city: "Kolkata" };
    const newPassport = {
      id: passportRows.length + 1,
      passportNo: `K${Math.floor(100000 + Math.random() * 900000)}`,
      studentId: nextId,
      verified: "Yes",
    };

    setStudentRows([...studentRows, newStudent]);
    setPassportRows([...passportRows, newPassport]);
    setEngineResponse(
      `✓ Query OK, 2 rows affected. Inserted student #${nextId} (Susmita Ghosh) and linked 1:1 Passport record '${newPassport.passportNo}' with matching Foreign Key.`
    );
  };

  const handleDeleteParent = (studentId) => {
    setStudentRows(studentRows.filter((s) => s.id !== studentId));
    // Simulate ON DELETE CASCADE
    setPassportRows(passportRows.filter((p) => p.studentId !== studentId));
    setEngineResponse(
      `✓ ON DELETE CASCADE: Deleted student #${studentId}. The child 1:1 passport record was automatically cascaded and removed!`
    );
  };

  const handleReset = () => {
    setStudentRows([
      { id: 101, name: "Mamata Hui", city: "Barrackpore" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore" },
    ]);
    setPassportRows([
      { id: 1, passportNo: "Z894210", studentId: 101, verified: "Yes" },
      { id: 2, passportNo: "P112390", studentId: 102, verified: "Yes" },
    ]);
    setTestDuplicateAttempt(false);
    setEngineResponse("Simulator reset to initial state.");
  };

  const ddlPreview =
    strategy === "fk_unique"
      ? `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'\n) ENGINE=InnoDB;\n\nCREATE TABLE student_passports (\n    passport_id INT AUTO_INCREMENT PRIMARY KEY,\n    passport_no VARCHAR(20) NOT NULL UNIQUE,\n    student_id INT NOT NULL UNIQUE, -- UNIQUE enforces 1:1\n    CONSTRAINT fk_passports_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`
      : `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'\n) ENGINE=InnoDB;\n\n-- Strategy 2: Shared Primary Key (Identifying 1:1)\nCREATE TABLE student_profiles (\n    student_id INT PRIMARY KEY, -- PK and FK combined!\n    biography TEXT,\n    linkedin_url VARCHAR(255),\n    CONSTRAINT fk_profile_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE\n) ENGINE=InnoDB;`;

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
            Module 002_001 · Relationships in DB · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            One-to-One (1:1){" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relationship Design & Use Cases
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master 1:1 schema architecture, Foreign Key + <code>UNIQUE</code> constraint modeling,
            Shared Primary Key patterns, vertical partitioning for performance, and confidential data isolation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔒 Foreign Key + UNIQUE
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔑 Shared Primary Key Pattern
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Vertical Partitioning
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Security & KYC Isolation
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Architecture Strategies ─────────────────── */}
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
                Two Architectural Strategies for 1:1 Modeling
              </h2>
              <p className="text-xs text-slate-400">
                Compare Foreign Key + UNIQUE vs Shared Primary Key patterns
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strategy 1 */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Strategy 1: Foreign Key with UNIQUE
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Child table has its own auto-increment PK, plus a UNIQUE Foreign Key column.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                student_id INT NOT NULL UNIQUE,
                FOREIGN KEY (student_id) REFERENCES students(id)
              </pre>
            </div>

            {/* Strategy 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Strategy 2: Shared Primary Key (Identifying 1:1)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Child table's Primary Key IS the Foreign Key pointing to the parent table.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                student_id INT PRIMARY KEY,
                FOREIGN KEY (student_id) REFERENCES students(id)
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Memory Page Density ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Vertical Partitioning Memory Page Density (16KB InnoDB Page)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Vertical Partitioning Buffer Pool Density"
            >
              {/* Unpartitioned */}
              <g transform="translate(30, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ Unpartitioned Wide Table (Blobs + Text)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Row Size: 4,000 bytes (Huge PDF / Bio)</text>
                <text x="20" y="74" fill="#f43f5e" fontWeight="bold" fontSize="10">⚡ Only ~4 rows fit per 16KB InnoDB RAM page (Low hit ratio)</text>
              </g>

              {/* Partitioned */}
              <g transform="translate(410, 20)">
                <rect width="340" height="90" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ✓ 1:1 Vertically Partitioned Core Table
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Row Size: 64 bytes (ID, Name, City)</text>
                <text x="20" y="74" fill="#10b981" fontWeight="bold" fontSize="10">⚡ 250+ rows fit per 16KB page (60x higher memory throughput!)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive 1:1 Sandbox ──────────────────── */}
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
                Interactive 1:1 Relationship Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Insert linked student & passport entities, simulate duplicate key rejections, and test cascading deletes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Choose 1:1 Design Pattern:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStrategy("fk_unique")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      strategy === "fk_unique"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Strategy 1: FK + UNIQUE
                  </button>
                  <button
                    onClick={() => setStrategy("shared_pk")}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      strategy === "shared_pk"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    Strategy 2: Shared PK
                  </button>
                </div>
              </div>

              {/* Duplicate Checkbox */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testDuplicateAttempt}
                    onChange={(e) => setTestDuplicateAttempt(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-900 text-rose-500 focus:ring-0"
                  /&gt;
                  <span>Attempt inserting second passport for student #101 (Triggers Error 1062)</span>
                </label>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleTestInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>➕</span> Insert Linked 1:1 Records
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-xs hover:text-white transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {engineResponse}
              </div>
            </div>

            {/* Live Schema & Tables */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Active DDL Schema:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {ddlPreview}
                </pre>
              </div>

              {/* Parent Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Parent Table: students ({studentRows.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Student Name</th>
                        <th className="p-1.5">City</th>
                        <th className="p-1.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-1.5 text-cyan-400">#{s.id}</td>
                          <td className="p-1.5 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-1.5 text-indigo-300">{s.city}</td>
                          <td className="p-1.5">
                            <button
                              onClick={() => handleDeleteParent(s.id)}
                              className="text-[10px] text-rose-400 hover:text-rose-300 underline font-sans"
                            &gt;
                              Cascade Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Child Table */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Child Table: student_passports ({passportRows.length} rows)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">Passport No</th>
                        <th className="p-1.5">FK (student_id)</th>
                        <th className="p-1.5">Verified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {passportRows.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40">
                          <td className="p-1.5 text-amber-400 font-bold">{p.passportNo}</td>
                          <td className="p-1.5 text-teal-400">#{p.studentId} (1:1)</td>
                          <td className="p-1.5 text-emerald-400">{p.verified}</td>
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
                Confidential identity isolation and merchant tax profile schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Confidential KYC Identity Isolation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Compliance</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using Shared Primary Key 1:1 to isolate sensitive Aadhaar hashes into a restricted compliance table.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_kyc (
    student_id INT PRIMARY KEY, -- Shared Primary Key
    aadhaar_hash CHAR(64) NOT NULL UNIQUE,
    pan_number VARCHAR(10) NULL UNIQUE,
    verified_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_kyc_student FOREIGN KEY (student_id)
        REFERENCES students(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Merchant Tax Profiles
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financials</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Separating merchant GSTIN numbers and bank details into a 1:1 financial extension table.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE merchant_tax_info (
    merchant_id INT PRIMARY KEY,
    gstin VARCHAR(15) NOT NULL UNIQUE,
    bank_account_no VARCHAR(20) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    CONSTRAINT fk_tax_merchant FOREIGN KEY (merchant_id)
        REFERENCES merchants(merchant_id) ON DELETE RESTRICT
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
                Avoid silent degradation into 1:N and unnecessary table fragmentation
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
                  <strong className="text-white">1. Omitting UNIQUE Constraint:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting <code>UNIQUE</code> on the Foreign Key silently degrades the 1:1 relationship into 1:N.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. FK in the Wrong Table:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Placing the FK in the mandatory table forces NULLs when optional records are absent.
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
                  <strong className="text-white">1. Vertical Partitioning for Blobs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Keep frequently scanned metadata in narrow tables; isolate heavy PDF/photo blobs into 1:1 tables.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Shared Primary Key:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use identifying Shared PKs to eliminate redundant secondary indexes.
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
              <span>1:1 relationships link at most one instance of Entity A to one instance of Entity B</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce 1:1 using <code>UNIQUE</code> on the Foreign Key column</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Shared Primary Key pattern merges the Primary Key and Foreign Key into one column</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Place the Foreign Key in the optional table to prevent NULL columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use vertical partitioning to fit 50x+ more rows per 16KB InnoDB memory page</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ON DELETE CASCADE</code> when child records cannot logically exist without parents</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="One-to-One (1:1) Relationships – FAQs"
            questions={questions}
            subtitle="Master 1:1 schema architecture, Shared Primary Keys, and vertical partitioning with 30 comprehensive Q&As"
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
            title="One-to-One (1:1) Relationship: Schema Design & Use Cases"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_one_to_one_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Students often ask me in Barrackpore: 'Sir, if two entities have a 1:1 relationship, why not just merge them " +
              "into one single table?' The answer lies in engineering optimization! By vertically partitioning heavy columns " +
              "(such as profile images, PDF documents, or large biography text) into a separate 1:1 table, your main `students` " +
              "table stays ultra-compact. When your main table's rows are only 60 bytes wide, MySQL can pack hundreds of students " +
              "into a single 16KB RAM memory page, accelerating your search queries by 10x to 50x. Use 1:1 relationships for performance, " +
              "security isolation, and clean sparse attribute modeling."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · 1:1 Relationships · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
