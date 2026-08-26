import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – AUTO_INCREMENT Attribute: Automatic Sequence Generation
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive AUTO_INCREMENT Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [insertMode, setInsertMode] = useState("null"); // "null", "omit", "explicit_jump", "rollback"
  const [explicitIdValue, setExplicitIdValue] = useState(500);
  const [currentCounter, setCurrentCounter] = useState(103);
  const [lastInsertId, setLastInsertId] = useState(102);
  const [engineLog, setEngineLog] = useState(
    "Select an insert strategy and click 'Execute Sequence INSERT'."
  );

  const [studentRows, setStudentRows] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: "₹15,000.00" },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: "₹18,500.00" },
  ]);

  const studentPool = ["Susmita Ghosh", "Debangshu Roy", "Mahima Sengupta", "Rahul Mukherjee"];

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

  const handleExecuteInsert = () => {
    const nextName = studentPool[(studentRows.length - 2) % studentPool.length] || "Student Candidate";

    if (insertMode === "rollback") {
      // Simulate transaction rollback: counter advances, but row is discarded
      const skippedId = currentCounter;
      setCurrentCounter(currentCounter + 1);
      setEngineLog(
        `⚠️ TRANSACTION ROLLED BACK: Sequence allocated ID ${skippedId}, but transaction was rolled back. Sequence counter advanced to ${skippedId + 1}. A GAP is created in sequence numbering!`
      );
      return;
    }

    let assignedId = currentCounter;
    let nextCounterVal = currentCounter + 1;

    if (insertMode === "explicit_jump") {
      assignedId = Number(explicitIdValue);
      nextCounterVal = assignedId >= currentCounter ? assignedId + 1 : currentCounter;
    }

    const newRow = {
      id: assignedId,
      name: nextName,
      city: "Kolkata",
      fee: "₹15,000.00",
    };

    setStudentRows([...studentRows, newRow]);
    setCurrentCounter(nextCounterVal);
    setLastInsertId(assignedId);

    if (insertMode === "explicit_jump") {
      setEngineLog(
        `✓ Explicit ID ${assignedId} inserted. Auto-increment internal counter jumped to ${nextCounterVal}. LAST_INSERT_ID() = ${assignedId}.`
      );
    } else {
      setEngineLog(
        `✓ Generated ID ${assignedId} via AUTO_INCREMENT. Counter advanced to ${nextCounterVal}. Thread-safe LAST_INSERT_ID() = ${assignedId}.`
      );
    }
  };

  const handleReset = () => {
    setStudentRows([
      { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: "₹15,000.00" },
      { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: "₹18,500.00" },
    ]);
    setCurrentCounter(103);
    setLastInsertId(102);
    setEngineLog("Simulator reset to initial state (Next Counter = 103).");
  };

  let generatedInsertSQL = "";
  if (insertMode === "null") {
    generatedInsertSQL = `INSERT INTO students (student_id, student_name, admission_fee)\nVALUES (NULL, 'Candidate', 15000.00);\n-- MySQL replaces NULL with next sequence integer!`;
  } else if (insertMode === "omit") {
    generatedInsertSQL = `INSERT INTO students (student_name, admission_fee)\nVALUES ('Candidate', 15000.00);\n-- student_id omitted; auto-generates sequence ID!`;
  } else if (insertMode === "explicit_jump") {
    generatedInsertSQL = `INSERT INTO students (student_id, student_name, admission_fee)\nVALUES (${explicitIdValue}, 'Candidate', 15000.00);\n-- Explicit ID jumps the internal sequence counter!`;
  } else {
    generatedInsertSQL = `START TRANSACTION;\nINSERT INTO students (student_id, student_name) VALUES (NULL, 'Candidate'); -- Gets ID ${currentCounter}\nROLLBACK;\n-- Sequence ID ${currentCounter} is permanently lost (creating a gap)!`;
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
            Module 001_003 · Keys & Constraints · Topic 8
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            AUTO_INCREMENT{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Attribute & Sequence Mechanics
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master automatic surrogate integer key generation, thread-safe <code>LAST_INSERT_ID()</code> capture,
            sequence gap phenomena during rollbacks, and multi-master replication offsets.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 AUTO_INCREMENT Sequences
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔒 Thread-Safe LAST_INSERT_ID()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📉 Sequence Gaps & Rollbacks
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ BIGINT UNSIGNED Scale
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Mechanics & LAST_INSERT_ID ─────────── */}
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
                How AUTO_INCREMENT & LAST_INSERT_ID() Work
              </h2>
              <p className="text-xs text-slate-400">
                Surrogate key allocation, per-connection thread isolation, and race-condition prevention
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Automatic Sequence Allocation
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Omitting the ID or passing <code>NULL</code> / <code>0</code> generates the next sequential integer.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                student_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
              </pre>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Thread-Safe LAST_INSERT_ID()
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Returns the generated ID from the CURRENT session without race conditions.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                SET @new_id = LAST_INSERT_ID();
                INSERT INTO child_table (parent_id) VALUES (@new_id);
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Thread-Safe Session Isolation ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Thread-Safe LAST_INSERT_ID() vs Race Condition SELECT MAX(id)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="LAST_INSERT_ID Thread Safety Diagram"
            >
              {/* Session A */}
              <g transform="translate(30, 20)">
                <rect width="340" height="100" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ✓ Session A: LAST_INSERT_ID() (Safe)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Connection memory stores Session A's generated ID</text>
                <text x="20" y="72" fill="#cbd5e1" fontSize="10">• Concurrent inserts in Session B cannot overwrite it</text>
                <text x="20" y="90" fill="#10b981" fontWeight="bold" fontSize="10">✓ Always returns exact ID for parent-child links</text>
              </g>

              {/* Session B / Race Condition */}
              <g transform="translate(410, 20)">
                <rect width="340" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ SELECT MAX(id) (Race Condition Bug)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Session A inserts row (ID 101)</text>
                <text x="20" y="72" fill="#cbd5e1" fontSize="10">• Session B inserts row (ID 102) before MAX executes</text>
                <text x="20" y="90" fill="#f43f5e" fontWeight="bold" fontSize="10">❌ Session A gets 102 instead of 101! (Corrupted)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive AUTO_INCREMENT Sandbox ──────── */}
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
                Interactive AUTO_INCREMENT Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Experiment with automatic sequence generation, explicit ID counter jumping, and rollback gaps
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Sequence Allocation Strategy:
                </label>
                <div className="space-y-2">
                  {[
                    { id: "null", label: "Pass NULL (Standard Idiom)", desc: "MySQL generates next sequence integer" },
                    { id: "omit", label: "Omit student_id Column", desc: "Auto-generates sequence ID" },
                    { id: "explicit_jump", label: "Explicit ID Jump", desc: "Jumps sequence counter to explicit ID + 1" },
                    { id: "rollback", label: "Simulate Transaction ROLLBACK", desc: "Demonstrates sequence gap creation" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setInsertMode(btn.id)}
                      className={clsx(
                        "w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all",
                        insertMode === btn.id
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      <div className="font-bold">{btn.label}</div>
                      <div className="text-[10px] text-slate-500">{btn.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {insertMode === "explicit_jump" && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Explicit ID Value to Insert:
                  </label>
                  <input
                    type="number"
                    value={explicitIdValue}
                    onChange={(e) => setExplicitIdValue(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleExecuteInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Execute Sequence INSERT
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Status Counters */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Next Internal Counter</span>
                  <span className="text-base font-bold font-mono text-cyan-400">{currentCounter}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">LAST_INSERT_ID()</span>
                  <span className="text-base font-bold font-mono text-teal-400">{lastInsertId}</span>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                {engineLog}
              </div>
            </div>

            {/* Generated SQL & Live Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedInsertSQL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Active Students Table ({studentRows.length} rows):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">student_id (AUTO_INCREMENT)</th>
                        <th className="p-2">Student Name</th>
                        <th className="p-2">City</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400 font-bold">#{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-indigo-300">{s.city}</td>
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
                Parent-child ID propagation and high-throughput ledger schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Parent-Child Insert with LAST_INSERT_ID()
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Thread-safe capture of auto-increment student ID to insert dependent child tuition payment record.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Insert Parent Student
INSERT INTO students (first_name, city, admission_fee)
VALUES ('Mamata Hui', 'Barrackpore', 15000.00);

-- Step 2: Capture thread-safe ID in session variable
SET @new_student_id = LAST_INSERT_ID();

-- Step 3: Insert Child Payment using captured ID
INSERT INTO student_payments (student_id, amount_paid, payment_mode)
VALUES (@new_student_id, 15000.00, 'UPI');`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata High-Volume E-Commerce Ledger (BIGINT Scale)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financials</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using BIGINT UNSIGNED AUTO_INCREMENT to prevent integer sequence exhaustion in high-throughput ledgers.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE transaction_ledger (
    transaction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT = 1000001;`}
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
                Prevent integer overflow crashes, race condition bugs, and enumeration attacks
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
                  <strong className="text-white">1. Using SELECT MAX(id):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Causes race conditions in multi-threaded web servers. Always use <code>LAST_INSERT_ID()</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Signed INT Sequence Exhaustion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Signed <code>INT</code> caps at 2.14 billion rows, crashing high-volume production tables.
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
                  <strong className="text-white">1. Use BIGINT UNSIGNED:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Supports up to 18.4 quintillion rows for lifetime sequence safety.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Obfuscate Public URLs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use UUIDs or hashed tokens in client APIs to prevent IDOR enumeration attacks.
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
              <span>Only ONE <code>AUTO_INCREMENT</code> column is permitted per table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Must be an indexed integer column (typically the <code>PRIMARY KEY</code>)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always retrieve generated keys using thread-safe <code>LAST_INSERT_ID()</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Rollbacks and deletions leave gaps in sequence numbers (normal behavior)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>BIGINT UNSIGNED</code> for high-volume enterprise tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>TRUNCATE TABLE</code> to reset sequence counter back to 1</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="AUTO_INCREMENT Attribute – FAQs"
            questions={questions}
            subtitle="Master automatic sequence generation, thread-safe LAST_INSERT_ID() capture, and gap handling with 30 comprehensive Q&As"
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
            title="AUTO_INCREMENT Attribute: Automatic Sequence Generation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_auto_increment_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "One of the most dangerous concurrency bugs in junior web developer code is querying `SELECT MAX(id) FROM table` " +
              "to get the ID of a newly inserted student. In my classes in Barrackpore, I demonstrate how on a busy server with 50 simultaneous " +
              "users, another user's insert can slip in between your queries, causing your backend to attach tuition fees to the wrong student! " +
              "Always use `LAST_INSERT_ID()` in SQL or `result.insertId` in Node.js/Python. It is connection-isolated, lightning-fast, and 100% " +
              "thread-safe across thousands of concurrent database transactions."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · AUTO_INCREMENT · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
