import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding Data Integrity (Entity, Domain, Referential)
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Integrity Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Integrity Simulator State
  const [testScenario, setTestScenario] = useState("valid"); // "valid", "duplicate_pk", "check_violation", "fk_violation"

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

  // Scenario details
  let scenarioSQL = "";
  let outcomeStatus = "success";
  let outcomeTitle = "";
  let outcomeMsg = "";
  let integrityTier = "";

  if (testScenario === "valid") {
    scenarioSQL = `INSERT INTO students (student_id, roll_no, first_name, admission_fee, city)\nVALUES (101, 'REG-2026-001', 'Mamata', 15000.00, 'Barrackpore');`;
    outcomeStatus = "success";
    outcomeTitle = "Query OK, 1 row affected (0.01 sec)";
    outcomeMsg = "All integrity constraints satisfied. Entity ID is unique, fee meets CHECK rule (>= ₹10,000), and city is in ENUM domain.";
    integrityTier = "✓ All Pillars Passed";
  } else if (testScenario === "duplicate_pk") {
    scenarioSQL = `INSERT INTO students (student_id, roll_no, first_name, admission_fee, city)\nVALUES (101, 'REG-2026-002', 'Abhronila', 18500.00, 'Barrackpore');`;
    outcomeStatus = "error";
    outcomeTitle = "ERROR 1062 (23000): Duplicate entry '101' for key 'PRIMARY'";
    outcomeMsg = "Violation of Entity Integrity! The primary key ID 101 already exists in the table. InnoDB clustered index rejected duplicate row.";
    integrityTier = "❌ Entity Integrity Violation";
  } else if (testScenario === "check_violation") {
    scenarioSQL = `INSERT INTO students (student_id, roll_no, first_name, admission_fee, city)\nVALUES (102, 'REG-2026-002', 'Susmita', 5000.00, 'Kolkata');`;
    outcomeStatus = "error";
    outcomeTitle = "ERROR 3819 (HY000): Check constraint 'chk_min_fee' is violated";
    outcomeMsg = "Violation of Domain Integrity! The proposed admission_fee ₹5,000.00 violates the table rule CHECK (admission_fee >= 10000.00).";
    integrityTier = "❌ Domain Integrity Violation";
  } else if (testScenario === "fk_violation") {
    scenarioSQL = `INSERT INTO enrollments (enrollment_id, student_id, course_id)\nVALUES (1, 999, 501); -- Student 999 does not exist!`;
    outcomeStatus = "error";
    outcomeTitle = "ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails";
    outcomeMsg = "Violation of Referential Integrity! Child record references parent student_id=999 which does not exist in the students table.";
    integrityTier = "❌ Referential Integrity Violation";
  }

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
            Module 001_003 · Keys & Constraints · Topic 0
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Understanding{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Data Integrity in Relational Databases
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the 4 fundamental pillars of relational database consistency: Entity Integrity,
            Domain Integrity, Referential Integrity, and User-Defined validation rules.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏛️ Entity Integrity (PK & Unique)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Domain Integrity (NOT NULL, CHECK)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Referential Integrity (Foreign Keys)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ User-Defined Integrity (Triggers)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The 4 Pillars of Data Integrity ────────── */}
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
                The 4 Pillars of Relational Data Integrity
              </h2>
              <p className="text-xs text-slate-400">
                How database engines enforce mathematical consistency across rows, columns, and relations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pillar 1 */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                1. Entity Integrity (Unique Row Identity)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Guarantees every row is distinct and uniquely addressable. No duplicate or NULL Primary Keys.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                CONSTRAINT pk_students PRIMARY KEY (student_id)
              </pre>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                2. Domain Integrity (Valid Column Values)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Enforces valid data types, mandatory values, acceptable ranges, and format boundaries.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                CONSTRAINT chk_fee CHECK (admission_fee &gt;= 10000.00)
              </pre>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                3. Referential Integrity (Table Relationships)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Guarantees foreign keys in child tables reference valid primary keys in parent tables.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-indigo-300 border border-slate-800">
                FOREIGN KEY (student_id) REFERENCES students(student_id)
              </pre>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                4. User-Defined Integrity (Custom Business Logic)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Enforces procedural cross-table enterprise rules via Triggers and Stored Procedures.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                CREATE TRIGGER trg_check_seat_limit ...
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: The 4 Pillars Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 4 Integrity Tiers of a Relational Database
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="4 Pillars of Data Integrity"
            >
              {[
                { title: "Entity Integrity", tech: "PRIMARY KEY / UNIQUE", color: "#14b8a6" },
                { title: "Domain Integrity", tech: "NOT NULL / CHECK / ENUM", color: "#38bdf8" },
                { title: "Referential Integrity", tech: "FOREIGN KEY / CASCADE", color: "#818cf8" },
                { title: "User-Defined", tech: "Triggers & Stored Procs", color: "#f59e0b" },
              ].map((p, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 190}, 20)`}>
                  <rect width="175" height="100" rx="8" fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
                  <text x="87" y="30" fill={p.color} textAnchor="middle" fontWeight="bold" fontSize="11">
                    {p.title}
                  </text>
                  <line x1="10" y1="42" x2="165" y2="42" stroke="#334155" />
                  <text x="87" y="68" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    Enforced By:
                  </text>
                  <text x="87" y="86" fill={p.color} textAnchor="middle" fontWeight="bold" fontSize="9">
                    {p.tech}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Integrity Sandbox ──────────── */}
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
                Interactive Constraint Violation Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Trigger constraint violations and observe how the MySQL engine protects table integrity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Simulation Scenario:
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setTestScenario("valid")}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg text-xs font-medium border transition-all",
                      testScenario === "valid"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    <strong>✓ Valid Insert:</strong> All integrity constraints satisfied
                  </button>

                  <button
                    onClick={() => setTestScenario("duplicate_pk")}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg text-xs font-medium border transition-all",
                      testScenario === "duplicate_pk"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    <strong>❌ Duplicate Primary Key:</strong> Violates Entity Integrity (Error 1062)
                  </button>

                  <button
                    onClick={() => setTestScenario("check_violation")}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg text-xs font-medium border transition-all",
                      testScenario === "check_violation"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    <strong>❌ Fee Below ₹10,000:</strong> Violates CHECK Domain Integrity (Error 3819)
                  </button>

                  <button
                    onClick={() => setTestScenario("fk_violation")}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg text-xs font-medium border transition-all",
                      testScenario === "fk_violation"
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  >
                    <strong>❌ Non-Existent Parent ID:</strong> Violates Referential Integrity (Error 1452)
                  </button>
                </div>
              </div>
            </div>

            {/* Engine Response & SQL */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Proposed SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {scenarioSQL}
                </pre>
              </div>

              {/* Simulation Result Box */}
              <div
                className={clsx(
                  "rounded-xl border p-4 transition-all",
                  outcomeStatus === "success"
                    ? "border-teal-500/40 bg-teal-500/10"
                    : "border-rose-500/40 bg-rose-500/10"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={clsx(
                      "text-xs font-bold font-mono",
                      outcomeStatus === "success" ? "text-teal-300" : "text-rose-400"
                    )}
                  >
                    {outcomeTitle}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                    {integrityTier}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{outcomeMsg}</p>
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
                Complete multi-tier integrity schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Multi-Tier Student Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Schema</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enforces Entity, Domain, and User validation rules across tables.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT AUTO_INCREMENT,
    roll_no VARCHAR(20) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur') NOT NULL,
    -- Entity & Domain Constraints
    CONSTRAINT pk_students PRIMARY KEY (student_id),
    CONSTRAINT uq_student_roll UNIQUE (roll_no),
    CONSTRAINT chk_min_fee CHECK (admission_fee >= 10000.00)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Referential Linkage Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Schema</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Parent-child customer and orders relationship with explicit referential integrity rules.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE customer_orders (
    order_id INT AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    -- Referential Integrity Linkage
    CONSTRAINT pk_orders PRIMARY KEY (order_id),
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
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
                Prevent data corruption, orphan records, and un-enforced constraints
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
                  <strong className="text-white">1. Relying Only on App Validation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Manual scripts, SQL CLI imports, or alternate microservices bypass frontend checks.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Leaving foreign_key_checks Disabled:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting to re-enable <code>foreign_key_checks=1</code> after ETL imports corrupts parent-child data.
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
                  <strong className="text-white">1. Name All Constraints Explicitly:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>pk_</code>, <code>fk_</code>, <code>uq_</code>, <code>chk_</code> prefixes for rapid debugging.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enable Strict SQL Mode:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures invalid data triggers immediate rollback errors rather than silent truncation.
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
              <span>Entity Integrity guarantees unique rows via <code>PRIMARY KEY</code> and <code>UNIQUE</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Domain Integrity enforces valid column values via <code>NOT NULL</code>, <code>CHECK</code>, <code>ENUM</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Referential Integrity links tables via <code>FOREIGN KEY</code> constraints</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>User-Defined Integrity implements custom business workflows via Triggers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always name constraints explicitly with standardized prefixes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Enforce constraints at the database engine level as the ultimate single source of truth</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Understanding Data Integrity – FAQs"
            questions={questions}
            subtitle="Master Entity, Domain, and Referential Integrity rules with 30 comprehensive Q&As"
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
            title="Understanding Data Integrity (Entity, Domain, Referential)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_data_integrity_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Data integrity is what separates a true relational database from a simple file storage system. " +
              "In my classes in Barrackpore, I emphasize to all students: never make the rookie mistake of assuming " +
              "your React or Node.js application validation is enough. Applications get rewritten, microservices get added, " +
              "and database migrations are run directly in the CLI. By defining Primary Keys, Foreign Keys, NOT NULL constraints, " +
              "and CHECK bounds directly in your MySQL schema, you ensure your database remains mathematically incorruptible " +
              "no matter how your application evolves."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Data Integrity · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
