import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – CHECK Constraint: Enforcing Business Rules & Value Ranges
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive CHECK Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [feeInput, setFeeInput] = useState(15000);
  const [gpaInput, setGpaInput] = useState(3.8);
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-12-15");
  const [engineFeedback, setEngineFeedback] = useState(
    "Adjust parameter inputs and click 'Test INSERT with CHECK Constraints'."
  );
  const [outcomeStatus, setOutcomeStatus] = useState("idle");

  const [studentRecords, setStudentRecords] = useState([
    { id: 101, name: "Mamata Hui", fee: 15000, gpa: 3.9, semester: "2026-09-01 to 2026-12-15" },
    { id: 102, name: "Abhronila Das", fee: 18500, gpa: 3.85, semester: "2026-09-01 to 2026-12-15" },
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
    const feeNum = Number(feeInput);
    const gpaNum = Number(gpaInput);

    // Rule 1: Fee Floor >= 10000
    if (feeNum < 10000) {
      setOutcomeStatus("error");
      setEngineFeedback(
        `❌ ERROR 3819 (HY000): Check constraint 'chk_fee_floor' is violated. Proposed fee ₹${feeNum.toLocaleString(
          "en-IN"
        )} is below the mandatory institutional minimum of ₹10,000.00!`
      );
      return;
    }

    // Rule 2: GPA Range 0.00 to 4.00
    if (gpaNum < 0.0 || gpaNum > 4.0) {
      setOutcomeStatus("error");
      setEngineFeedback(
        `❌ ERROR 3819 (HY000): Check constraint 'chk_gpa_range' is violated. Proposed GPA ${gpaNum} is outside the valid range [0.00, 4.00]!`
      );
      return;
    }

    // Rule 3: Date Sequence (endDate >= startDate)
    if (new Date(endDate) < new Date(startDate)) {
      setOutcomeStatus("error");
      setEngineFeedback(
        `❌ ERROR 3819 (HY000): Check constraint 'chk_date_sequence' is violated. Semester end_date (${endDate}) cannot be before start_date (${startDate})!`
      );
      return;
    }

    // Success
    const newId = 100 + studentRecords.length + 1;
    const newRow = {
      id: newId,
      name: "Susmita Ghosh",
      fee: feeNum,
      gpa: gpaNum,
      semester: `${startDate} to ${endDate}`,
    };

    setStudentRecords([...studentRecords, newRow]);
    setOutcomeStatus("success");
    setEngineFeedback(
      `✓ Query OK, 1 row affected (0.01 sec). All 3 CHECK constraints satisfied (Fee >= ₹10,000, GPA within [0, 4.0], and valid date sequence).`
    );
  };

  const handleReset = () => {
    setStudentRecords([
      { id: 101, name: "Mamata Hui", fee: 15000, gpa: 3.9, semester: "2026-09-01 to 2026-12-15" },
      { id: 102, name: "Abhronila Das", fee: 18500, gpa: 3.85, semester: "2026-09-01 to 2026-12-15" },
    ]);
    setOutcomeStatus("idle");
    setEngineFeedback("Simulator reset to initial state.");
  };

  const generatedDDL = `CREATE TABLE student_admissions (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL,\n    gpa DECIMAL(3, 2) NOT NULL,\n    start_date DATE NOT NULL,\n    end_date DATE NOT NULL,\n    -- Business CHECK Constraints\n    CONSTRAINT chk_fee_floor CHECK (admission_fee >= 10000.00),\n    CONSTRAINT chk_gpa_range CHECK (gpa >= 0.00 AND gpa <= 4.00),\n    CONSTRAINT chk_date_sequence CHECK (end_date >= start_date)\n) ENGINE=InnoDB;`;

  const generatedSQL = `INSERT INTO student_admissions (\n    student_name, admission_fee, gpa, start_date, end_date\n) VALUES (\n    'Susmita Ghosh', ${feeInput}.00, ${gpaInput}, '${startDate}', '${endDate}'\n);`;

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
            Module 001_003 · Keys & Constraints · Topic 7
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            CHECK{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraint & Business Rules
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master runtime business rule enforcement, single vs multi-column row-level checks,
            three-valued logic evaluation (TRUE, FALSE, UNKNOWN), and MySQL 8.0.16+ engine mechanics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ MySQL 8.0.16+ Runtime Engine
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Numerical Bounds (BETWEEN)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 Date Sequence Validation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ NOT ENFORCED State
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: CHECK Constraint Mechanics ─────────────── */}
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
                How CHECK Constraints Work in MySQL 8.0+
              </h2>
              <p className="text-xs text-slate-400">
                Boolean expression evaluation, Error 3819 rejection, and row-level logic validation
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single Column */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Single-Column Range & Boundary Check
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Restricts numerical ranges, discounts, GPA scales, and minimum fees.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                CONSTRAINT chk_min_fee CHECK (admission_fee &gt;= 10000.00)
              </pre>
            </div>

            {/* Multi-Column */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Multi-Column (Row-Level) Logical Check
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Validates relationships between 2+ columns in the same row (e.g. date sequences).
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                CONSTRAINT chk_dates CHECK (end_date &gt;= start_date)
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: CHECK Evaluation Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: MySQL 8.0 CHECK Constraint Boolean Evaluation Pipeline
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="CHECK Evaluation Pipeline"
            >
              {[
                { title: "1. Evaluates to TRUE", result: "✓ Row Committed to Table", color: "#10b981" },
                { title: "2. Evaluates to UNKNOWN (NULL)", result: "✓ Accepted by SQL Standard", color: "#38bdf8" },
                { title: "3. Evaluates to FALSE", result: "❌ Aborted with ERROR 3819", color: "#f43f5e" },
              ].map((c, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 250}, 20)`}>
                  <rect width="235" height="90" rx="8" fill="#1e293b" stroke={c.color} />
                  <text x="117" y="26" fill={c.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {c.title}
                  </text>
                  <line x1="10" y1="38" x2="225" y2="38" stroke="#334155" />
                  <text x="117" y="66" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    Engine Outcome:
                  </text>
                  <text x="117" y="80" fill={c.color} textAnchor="middle" fontWeight="bold" fontSize="9">
                    {c.result}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive CHECK Sandbox ───────────────── */}
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
                Interactive CHECK Constraint Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Experiment with fee minimums (&gt;= ₹10k), GPA boundaries [0.0 - 4.0], and chronological date order
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Admission Fee (₹):
                  </label>
                  <input
                    type="number"
                    value={feeInput}
                    onChange={(e) => setFeeInput(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Min ₹10,000"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Student GPA Scale:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={gpaInput}
                    onChange={(e) => setGpaInput(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="0.00 to 4.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Semester Start Date:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Semester End Date:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleTestInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🧪</span> Test INSERT with CHECK Constraints
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Feedback Box */}
              <div
                className={clsx(
                  "p-3.5 rounded-xl border transition-all font-mono text-xs leading-relaxed",
                  outcomeStatus === "success"
                    ? "border-teal-500/40 bg-teal-500/10 text-teal-300"
                    : outcomeStatus === "error"
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
                    : "border-slate-800 bg-slate-950 text-slate-400"
                )}
              >
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {engineFeedback}
              </div>
            </div>

            {/* Generated DDL & Live Table */}
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
                  Active Admissions Table ({studentRecords.length} records):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">GPA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRecords.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">#{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                          <td className="p-2 text-amber-400 font-bold">{s.gpa}</td>
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
                Complex business validation rules from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Admission Validation Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Admissions</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enforces minimum tuition fees, non-empty student names, and valid 4.0 GPA scales.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_admissions (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    gpa DECIMAL(3, 2) NOT NULL DEFAULT 3.50,
    -- Domain Business Constraints
    CONSTRAINT chk_non_empty_name CHECK (TRIM(first_name) != ''),
    CONSTRAINT chk_fee_floor CHECK (admission_fee >= 10000.00),
    CONSTRAINT chk_gpa_range CHECK (gpa >= 0.00 AND gpa <= 4.00)
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Math & Discount Rules
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Orders</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ensuring discount amounts never exceed order subtotals, and final totals match arithmetic.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE orders (
    order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    final_total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT chk_discount_valid CHECK (discount_amount >= 0.00 AND discount_amount <= subtotal),
    CONSTRAINT chk_final_math CHECK (final_total = (subtotal - discount_amount))
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
                Avoid NULL bypasses and un-enforced legacy constraints
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
                  <strong className="text-white">1. Assuming CHECK Enforces NOT NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>CHECK (fee &gt;= 10000)</code> allows NULL because <code>NULL &gt;= 10000</code> evaluates to UNKNOWN (pass).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using Non-Deterministic Functions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>NOW()</code> or <code>RAND()</code> are prohibited in CHECK expressions.
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
                  <strong className="text-white">1. Pair CHECK with NOT NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees mandatory presence while enforcing numeric or string rules.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit Constraint Names:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>CONSTRAINT chk_tablename_rule</code> for clear error diagnostics.
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
              <span><code>CHECK</code> constraints are fully enforced in MySQL 8.0.16+</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Violating a CHECK constraint throws Error 3819 (HY000)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>NULL</code> evaluates to <code>UNKNOWN</code>, which satisfies the CHECK rule</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always pair <code>CHECK</code> with <code>NOT NULL</code> to prevent null bypasses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Multi-column checks validate date sequences and arithmetic formulas</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ALTER CHECK chk_name NOT ENFORCED</code> for high-speed bulk migrations</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="CHECK Constraints – FAQs"
            questions={questions}
            subtitle="Master runtime business rule validation, multi-column row checks, and three-valued logic with 30 comprehensive Q&As"
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
            title="CHECK Constraint: Enforcing Business Rules & Value Ranges"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_check_constraint_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "For years, database instructors had to warn students that MySQL silently ignored `CHECK` constraints. " +
              "That all changed with MySQL 8.0.16! Today, `CHECK` constraints are fully enforced by the InnoDB engine and represent " +
              "one of your most powerful tools for maintaining data purity. In my classes in Barrackpore, I teach students to encode " +
              "business rules directly into the schema: minimum fees, discount boundaries, date ranges (`end_date >= start_date`), " +
              "and text formatting (`TRIM(name) != ''`). When your database enforces these rules at the engine level, no buggy application " +
              "code or careless ETL script can ever corrupt your business data."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · CHECK Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
