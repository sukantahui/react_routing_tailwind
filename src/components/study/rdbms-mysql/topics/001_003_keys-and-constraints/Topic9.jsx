import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Configuring and Resetting AUTO_INCREMENT Starting Values
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Reset Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [initialSeed, setInitialSeed] = useState(1001);
  const [currentCounter, setCurrentCounter] = useState(1003);
  const [resetTargetValue, setResetTargetValue] = useState(5000);
  const [engineFeedback, setEngineFeedback] = useState(
    "Table created with AUTO_INCREMENT = 1001. Insert rows or attempt counter resets."
  );

  const [studentRows, setStudentRows] = useState([
    { id: 1001, name: "Mamata Hui", city: "Barrackpore", fee: "₹15,000.00" },
    { id: 1002, name: "Abhronila Das", city: "Barrackpore", fee: "₹18,500.00" },
  ]);

  const candidateNames = ["Susmita Ghosh", "Debangshu Roy", "Mahima Sengupta", "Rahul Mukherjee"];

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

  const handleInsertRow = () => {
    const nextName = candidateNames[studentRows.length % candidateNames.length] || "Student Candidate";
    const assignedId = currentCounter;
    const newCounter = currentCounter + 1;

    const newRow = {
      id: assignedId,
      name: nextName,
      city: "Kolkata",
      fee: "₹15,000.00",
    };

    setStudentRows([...studentRows, newRow]);
    setCurrentCounter(newCounter);
    setEngineFeedback(
      `✓ INSERT INTO students ... executed. Inserted student ${nextName} with generated ID ${assignedId}. Next counter = ${newCounter}.`
    );
  };

  const handleAttemptReset = () => {
    const maxExistingId = studentRows.length > 0 ? Math.max(...studentRows.map((r) => r.id)) : 0;
    const target = Number(resetTargetValue);

    if (target &le; maxExistingId) {
      setEngineFeedback(
        `⚠️ SILENTLY IGNORED: Attempted ALTER TABLE students AUTO_INCREMENT = ${target}. Since target (${target}) <= MAX(id) (${maxExistingId}), InnoDB silently ignored the request! Counter remains at ${currentCounter}.`
      );
    } else {
      setCurrentCounter(target);
      setEngineFeedback(
        `✓ Query OK, 0 rows affected (0.00 sec). Successfully advanced AUTO_INCREMENT counter to ${target}. Future inserts will start from ${target}.`
      );
    }
  };

  const handleTruncateTable = () => {
    setStudentRows([]);
    setCurrentCounter(1);
    setEngineFeedback(
      "✓ TRUNCATE TABLE students executed. All rows deleted and AUTO_INCREMENT counter reset back to 1!"
    );
  };

  const handleRecreateWithSeed = (seed) => {
    setInitialSeed(seed);
    setStudentRows([
      { id: seed, name: "Mamata Hui", city: "Barrackpore", fee: "₹15,000.00" },
      { id: seed + 1, name: "Abhronila Das", city: "Barrackpore", fee: "₹18,500.00" },
    ]);
    setCurrentCounter(seed + 2);
    setEngineFeedback(`Table re-created with starting AUTO_INCREMENT = ${seed}. Next counter = ${seed + 2}.`);
  };

  const generatedDDL = `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_name VARCHAR(50) NOT NULL,\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00\n) ENGINE=InnoDB AUTO_INCREMENT = ${initialSeed};`;

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
            Module 001_003 · Keys & Constraints · Topic 9
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Configuring & Resetting{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              AUTO_INCREMENT Starting Values
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master custom starting seeds (<code>AUTO_INCREMENT = 1001</code>), advancing sequence counters,
            the rule of monotonic progression (ignoring resets below MAX ID), and TRUNCATE mechanics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌱 Initial Seed (AUTO_INCREMENT = seed)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ALTER TABLE AUTO_INCREMENT = N
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Resets Below MAX(id) Ignored
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ TRUNCATE Resets to 1
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Starting Seeds & Reset Rules ───────────── */}
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
                Starting Seeds & Monotonic Progression Rules
              </h2>
              <p className="text-xs text-slate-400">
                How InnoDB enforces that auto-increment counters cannot overwrite existing primary keys
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Seed */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Custom Initial Seed in CREATE TABLE
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Initializes the table counter at a specified number (e.g. 1001 for student registrations).
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                CREATE TABLE students (...) AUTO_INCREMENT = 1001;
              </pre>
            </div>

            {/* Reset */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                The Monotonic Progression Rule
              </span>
              <p className="text-xs text-slate-400 mb-2">
                <code>ALTER TABLE tbl AUTO_INCREMENT = N</code> is SILENTLY IGNORED if <code>N <= MAX(id)</code>.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                -- If MAX(id) is 1002, setting to 50 does nothing!
                ALTER TABLE students AUTO_INCREMENT = 50;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Resetting Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Monotonic AUTO_INCREMENT Rule in MySQL InnoDB
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Monotonic Progression Diagram"
            >
              {[
                { title: "Target &gt; MAX(id) (e.g. 5000)", result: "✓ Counter Advances to 5000", color: "#10b981" },
                { title: "Target &le; MAX(id) (e.g. 50)", result: "⚠️ Silently Ignored (Stays at 1003)", color: "#f59e0b" },
                { title: "TRUNCATE TABLE students", result: "✓ Counter Resets Back to 1", color: "#38bdf8" },
              ].map((c, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 250}, 20)`}>
                  <rect width="235" height="90" rx="8" fill="#1e293b" stroke={c.color} />
                  <text x="117" y="26" fill={c.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {c.title}
                  </text>
                  <line x1="10" y1="38" x2="225" y2="38" stroke="#334155" />
                  <text x="117" y="66" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    InnoDB Reaction:
                  </text>
                  <text x="117" y="80" fill={c.color} textAnchor="middle" fontWeight="bold" fontSize="9">
                    {c.result}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Reset Sandbox ───────────────── */}
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
                Interactive AUTO_INCREMENT Configuration & Reset Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Change seeds, insert rows, attempt resets below MAX(id), and execute TRUNCATE
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Seed Switcher */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Choose Initial Table Seed:
                </label>
                <div className="flex gap-2">
                  {[1, 1001, 50000].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRecreateWithSeed(s)}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        initialSeed === s
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    &gt;
                      Seed = {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleInsertRow}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>➕</span> Insert Next Student
                </button>
                <button
                  onClick={handleTruncateTable}
                  className="py-2.5 px-3 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  TRUNCATE
                </button>
              </div>

              {/* Reset Control */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  ALTER TABLE AUTO_INCREMENT = Target:
                </span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={resetTargetValue}
                    onChange={(e) => setResetTargetValue(Number(e.target.value))}
                    className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="e.g. 5000 or 50"
                  /&gt;
                  <button
                    onClick={handleAttemptReset}
                    className="py-2 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                  >
                    Set Counter
                  </button>
                </div>
                <div className="text-[10px] text-slate-500">
                  Tip: Try entering <code>50</code> (below MAX ID) vs <code>5000</code> (above MAX ID).
                </div>
              </div>

              {/* Status Display */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Next Counter</span>
                  <span className="text-base font-bold font-mono text-cyan-400">{currentCounter}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Max Existing ID</span>
                  <span className="text-base font-bold font-mono text-teal-400">
                    {studentRows.length &gt; 0 ? Math.max(...studentRows.map((r) => r.id)) : "None (0)"}
                  </span>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
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
                  Table DDL Definition:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedDDL}
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
                        <th className="p-2">student_id</th>
                        <th className="p-2">Student Name</th>
                        <th className="p-2">Tuition Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400 font-bold">#{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-emerald-400">{s.fee}</td>
                        </tr>
                      ))}
                      {studentRows.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-3 text-center text-slate-500 italic">
                            Table is empty (TRUNCATED). Next inserted row will get ID 1.
                          </td>
                        </tr>
                      )}
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
                Custom sequence seed architectures from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Academic Year Registration Seed
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Admissions</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Configuring registration sequence to begin at year-prefixed number 2026001.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE college_registrations (
    registration_no INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',
    registration_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00
) ENGINE=InnoDB AUTO_INCREMENT = 2026001;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Invoice Number Obfuscation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financials</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Starting commercial invoices at 500,001 to prevent public guessing of company order volume.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE customer_invoices (
    invoice_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT = 500001;`}
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
                Prevent silent reset failures and sequence capacity exhaustion
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
                  <strong className="text-white">1. Attempting Reset Below MAX(id):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Setting <code>AUTO_INCREMENT = 50</code> when max ID is 100 is silently ignored.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. DELETE vs TRUNCATE Confusion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>DELETE FROM tbl;</code> retains the sequence counter; <code>TRUNCATE</code> resets to 1.
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
                  <strong className="text-white">1. Use BIGINT for High Starting Seeds:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Avoid integer capacity exhaustion when starting sequences in the millions.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Monitor Remaining Capacity:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Audit <code>AUTO_INCREMENT</code> in <code>information_schema.TABLES</code> in production monitoring.
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
              <span>Set starting seed during table creation with <code>AUTO_INCREMENT = seed</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Advance counter on existing tables via <code>ALTER TABLE tbl AUTO_INCREMENT = N</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Resets below <code>MAX(id)</code> are silently ignored by InnoDB</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>TRUNCATE TABLE</code> completely wipes rows and resets counter to 1</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL 8.0 persists sequence counter across server restarts in the redo log</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use <code>BIGINT UNSIGNED</code> when starting at high seeds</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Configuring & Resetting AUTO_INCREMENT – FAQs"
            questions={questions}
            subtitle="Master starting seeds, advancing sequence counters, and TRUNCATE mechanics with 30 comprehensive Q&As"
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
            title="Configuring and Resetting AUTO_INCREMENT Starting Values"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_reset_auto_increment_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "A frequent question I get from students in Barrackpore is: 'Sir, I deleted all records from my test table, " +
              "why did the next inserted row get ID 151 instead of 1?' That is because `DELETE FROM table` removes row data " +
              "but intentionally preserves the auto-increment counter position. If you want to wipe an experimental or staging table " +
              "clean and start numbering from 1 again, use `TRUNCATE TABLE`. And remember: MySQL InnoDB will never allow you to " +
              "reset an auto-increment counter below the highest ID already present in the table, protecting your schema from " +
              "duplicate key collisions."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · Reset AUTO_INCREMENT · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
