import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – DEFAULT Constraint: Providing Automatic Fallback Values
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive DEFAULT Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [cityInputMode, setCityInputMode] = useState("omitted"); // "omitted", "default_kw", "custom", "explicit_null"
  const [customCity, setCustomCity] = useState("Kolkata");
  const [feeInputMode, setFeeInputMode] = useState("omitted"); // "omitted", "default_kw", "custom", "explicit_null"
  const [customFee, setCustomFee] = useState("18500.00");
  const [engineResponse, setEngineResponse] = useState(
    "Select input modes and click 'Execute INSERT Query' to observe DEFAULT fallback mechanics."
  );

  const [studentRows, setStudentRows] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore (Default)", fee: "₹15,000.00 (Default)", status: "Active (Default)" },
    { id: 102, name: "Abhronila Das", city: "Kolkata (Custom)", fee: "₹18,500.00 (Custom)", status: "Active (Default)" },
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

  const handleExecuteInsert = () => {
    // Check if explicit NULL is supplied to NOT NULL columns
    if (cityInputMode === "explicit_null") {
      setEngineResponse(
        "❌ ERROR 1048 (23000): Column 'city' cannot be null. (Passing explicit NULL does NOT trigger the DEFAULT fallback value in strict SQL mode!)"
      );
      return;
    }
    if (feeInputMode === "explicit_null") {
      setEngineResponse(
        "❌ ERROR 1048 (23000): Column 'admission_fee' cannot be null. (Explicit NULL overrides default value substitution!)"
      );
      return;
    }

    const resolvedCity =
      cityInputMode === "custom"
        ? `${customCity} (Custom)`
        : "Barrackpore (Default)";

    const resolvedFee =
      feeInputMode === "custom"
        ? `₹${Number(customFee).toLocaleString("en-IN")}.00 (Custom)`
        : "₹15,000.00 (Default)";

    const newId = 100 + studentRows.length + 1;
    const newRecord = {
      id: newId,
      name: "Susmita Ghosh",
      city: resolvedCity,
      fee: resolvedFee,
      status: "Active (Default)",
    };

    setStudentRows([...studentRows, newRecord]);
    setEngineResponse(
      `✓ Query OK, 1 row affected (0.01 sec). Successfully inserted student ID ${newId} with automatic default values for omitted attributes!`
    );
  };

  const handleReset = () => {
    setStudentRows([
      { id: 101, name: "Mamata Hui", city: "Barrackpore (Default)", fee: "₹15,000.00 (Default)", status: "Active (Default)" },
      { id: 102, name: "Abhronila Das", city: "Kolkata (Custom)", fee: "₹18,500.00 (Custom)", status: "Active (Default)" },
    ]);
    setEngineResponse("Simulator reset to initial state.");
  };

  let generatedInsertSQL = "";
  if (cityInputMode === "omitted" && feeInputMode === "omitted") {
    generatedInsertSQL = `INSERT INTO students (student_name)\nVALUES ('Susmita Ghosh');\n-- city & admission_fee receive schema DEFAULT values automatically!`;
  } else if (cityInputMode === "default_kw" || feeInputMode === "default_kw") {
    generatedInsertSQL = `INSERT INTO students (student_name, city, admission_fee)\nVALUES ('Susmita Ghosh', ${
      cityInputMode === "default_kw" ? "DEFAULT" : `'${customCity}'`
    }, ${feeInputMode === "default_kw" ? "DEFAULT" : customFee});`;
  } else if (cityInputMode === "explicit_null" || feeInputMode === "explicit_null") {
    generatedInsertSQL = `INSERT INTO students (student_name, city, admission_fee)\nVALUES ('Susmita Ghosh', ${
      cityInputMode === "explicit_null" ? "NULL" : `'${customCity}'`
    }, ${feeInputMode === "explicit_null" ? "NULL" : customFee}); -- FAILS (Error 1048)`;
  } else {
    generatedInsertSQL = `INSERT INTO students (student_name, city, admission_fee)\nVALUES ('Susmita Ghosh', '${customCity}', ${customFee});`;
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
            Module 001_003 · Keys & Constraints · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            DEFAULT{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Constraint & Expression Defaults
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master automatic fallback values, MySQL 8.0 dynamic expression defaults (UUID & Date arithmetic),
            omitted column resolution vs explicit NULL, and zero-downtime rolling deployments.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Automatic Fallbacks
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ DEFAULT (UUID()) & Date Math
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🕒 CURRENT_TIMESTAMP Auditing
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 ALTER COLUMN SET DEFAULT
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Static vs Expression Defaults ───────────── */}
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
                Static Literals vs Dynamic Expression Defaults
              </h2>
              <p className="text-xs text-slate-400">
                MySQL 8.0 support for arbitrary deterministic expressions wrapped in parentheses
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Static */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Static Literal Defaults
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Constant strings, numbers, or boolean values assigned upon row creation.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',
                admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00
              </pre>
            </div>

            {/* Dynamic */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Dynamic Expression Defaults (MySQL 8.0+)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Calculated dynamic expressions wrapped in parentheses: UUIDs and date calculations.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                order_uuid VARCHAR(36) NOT NULL DEFAULT (UUID()),
                expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL 30 DAY)
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Default Resolution Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The 3 Pathways of Default Resolution in MySQL
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Default Resolution Diagram"
            >
              {[
                { title: "1. Column Omitted in INSERT", action: "→ Injects Schema DEFAULT (₹15,000)", color: "#10b981" },
                { title: "2. VALUES (..., DEFAULT)", action: "→ Injects Schema DEFAULT (₹15,000)", color: "#38bdf8" },
                { title: "3. VALUES (..., NULL)", action: "→ Rejects with Error 1048 on NOT NULL", color: "#f43f5e" },
              ].map((p, idx) => (
                <g key={idx} transform={`translate(${20 + idx * 250}, 20)`}>
                  <rect width="235" height="90" rx="8" fill="#1e293b" stroke={p.color} />
                  <text x="117" y="26" fill={p.color} textAnchor="middle" fontWeight="bold" fontSize="10">
                    {p.title}
                  </text>
                  <line x1="10" y1="38" x2="225" y2="38" stroke="#334155" />
                  <text x="117" y="66" fill="#cbd5e1" textAnchor="middle" fontSize="9">
                    Engine Behavior:
                  </text>
                  <text x="117" y="80" fill={p.color} textAnchor="middle" fontWeight="bold" fontSize="9">
                    {p.action}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive DEFAULT Sandbox ─────────────── */}
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
                Interactive DEFAULT Fallback Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test omitted columns, the DEFAULT keyword, custom overrides, and explicit NULL rejection
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* City Input Mode */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  City Column Input Strategy:
                </span>
                <select
                  value={cityInputMode}
                  onChange={(e) => setCityInputMode(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                &gt;
                  <option value="omitted">Omit Column (Auto Injects 'Barrackpore')</option>
                  <option value="default_kw">Use DEFAULT Keyword (VALUES(..., DEFAULT))</option>
                  <option value="custom">Provide Custom Value ('Kolkata')</option>
                  <option value="explicit_null">Pass Explicit NULL (Causes Error 1048!)</option>
                </select>
              </div>

              {/* Fee Input Mode */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Admission Fee Column Input Strategy:
                </span>
                <select
                  value={feeInputMode}
                  onChange={(e) => setFeeInputMode(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                &gt;
                  <option value="omitted">Omit Column (Auto Injects ₹15,000.00)</option>
                  <option value="default_kw">Use DEFAULT Keyword</option>
                  <option value="custom">Provide Custom Amount (₹18,500.00)</option>
                  <option value="explicit_null">Pass Explicit NULL (Causes Error 1048!)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleExecuteInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Execute INSERT Query
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Feedback:
                </span>
                {engineResponse}
              </div>
            </div>

            {/* Generated SQL & Live Rows */}
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
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Tuition Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {studentRows.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">#{s.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-indigo-300">{s.city}</td>
                          <td className="p-2 text-emerald-400">{s.fee}</td>
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
                Institutional and e-commerce fallback schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Enrollment Default Fallbacks
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Admissions</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Automating institutional tuition fee standards and active enrollment state flags.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE student_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore',
    standard_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Order Lifecycle & Dynamic Defaults
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Orders</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Using MySQL 8.0 date expression defaults to compute dynamic 3-day estimated delivery dates.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE orders (
    order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_status ENUM('PLACED', 'PAID', 'DISPATCHED', 'DELIVERED') NOT NULL DEFAULT 'PLACED',
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    delivery_estimate DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL 3 DAY)
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
                Avoid DEFAULT pitfalls and leverage zero-downtime metadata alterations
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
                  <strong className="text-white">1. Passing Explicit NULL Expecting DEFAULT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If frontend passes <code>null</code>, MySQL attempts to write NULL and fails with Error 1048.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Altering Default Updates Old Rows:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Modifying defaults only affects future inserts; existing rows retain old values.
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
                  <strong className="text-white">1. Instant Metadata Alters:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>ALTER TABLE tbl ALTER COLUMN col SET DEFAULT ...</code> for sub-millisecond updates.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Audit Timestamps:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always include <code>DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</code>.
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
              <span><code>DEFAULT</code> provides automatic fallback values for omitted columns</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Passing explicit <code>NULL</code> overrides default substitution and triggers Error 1048</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use the <code>DEFAULT</code> keyword in `VALUES()` to explicitly trigger the fallback</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL 8.0 supports dynamic expression defaults wrapped in parentheses `(expr)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ALTER COLUMN SET DEFAULT</code> for fast, zero-downtime metadata updates</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Pair <code>DEFAULT</code> with <code>NOT NULL</code> for guaranteed data completeness</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="DEFAULT Constraints – FAQs"
            questions={questions}
            subtitle="Master automatic fallback values, dynamic expression defaults, and audit timestamp tracking with 30 comprehensive Q&As"
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
            title="DEFAULT Constraint: Providing Automatic Fallback Values"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_default_constraint_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In production database engineering, `DEFAULT` constraints are your best friend for zero-downtime rolling deployments. " +
              "In my classes in Barrackpore, I teach students that when adding a new mandatory column to a 24/7 active system, " +
              "always define it with `NOT NULL DEFAULT 'fallback'`. That way, your existing Node.js or Spring Boot backend instances " +
              "can continue running without modification, while your newly deployed microservices begin writing new data. " +
              "Also, remember that in MySQL 8.0, you can use expression defaults like `DEFAULT (UUID())` or " +
              "`DEFAULT (CURRENT_DATE + INTERVAL 7 DAY)` to automate business logic directly at the database layer."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · DEFAULT Constraints · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
