import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding MySQL Data Types (Numeric, String, Date/Time)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Full educational tutorial component with rich interactive
 *                        SVGs, code walkthroughs, real-world Indian scenarios,
 *                        best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("numeric");
  const [interactiveInt, setInteractiveInt] = useState(100);
  const [isUnsigned, setIsUnsigned] = useState(false);

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
            Module 001_002 · SQL Fundamentals · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Understanding MySQL{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Data Types
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Learn how MySQL allocates memory, preserves calculation accuracy for currency (₹),
            stores text and timestamps, and prevents data corruption through rigorous column data type selection.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💾 Storage Architecture
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Integers & Fixed DECIMAL(M, D)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📝 CHAR vs VARCHAR
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⏱️ DATETIME vs TIMESTAMP
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Concept & Architectural Foundation ── */}
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
                What is a Data Type in MySQL?
              </h2>
              <p className="text-xs text-slate-400">
                The blueprint that governs storage, memory, operations, and data integrity
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In a Relational Database Management System like MySQL, every table column must be defined with a
              specific <strong>Data Type</strong>. A data type is a fundamental metadata contract that specifies:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <li className="flex items-start gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="text-teal-400 font-bold">1.</span>
                <span><strong>Permitted Domain:</strong> Which values can be stored (numbers, strings, dates, binary).</span>
              </li>
              <li className="flex items-start gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="text-teal-400 font-bold">2.</span>
                <span><strong>Byte Allocation:</strong> Exact memory and disk bytes consumed per record in InnoDB pages.</span>
              </li>
              <li className="flex items-start gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="text-teal-400 font-bold">3.</span>
                <span><strong>Supported Operations:</strong> Arithmetic, string searching, collation comparison, or date intervals.</span>
              </li>
              <li className="flex items-start gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="text-teal-400 font-bold">4.</span>
                <span><strong>Indexing Density:</strong> How efficiently B-Tree index pages can pack search keys into RAM.</span>
              </li>
            </ul>
          </div>

          {/* ── Semantic SVG 1: Memory & Storage Hierarchy ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: MySQL Data Type Classification Tree
            </h3>
            <svg
              viewBox="0 0 800 240"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="MySQL Data Types Overview Diagram"
            >
              {/* Root */}
              <rect x="310" y="10" width="180" height="38" rx="8" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
              <text x="400" y="34" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="13">
                MySQL Data Types
              </text>

              {/* Connecting Lines */}
              <path d="M 400 48 L 400 75 M 400 75 L 120 75 L 120 105 M 400 75 L 400 105 M 400 75 L 680 75 L 680 105" stroke="#334155" strokeWidth="2" fill="none" />

              {/* Category 1: Numeric */}
              <g transform="translate(30, 105)">
                <rect width="180" height="115" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="12">1. NUMERIC</text>
                <line x1="15" y1="34" x2="165" y2="34" stroke="#334155" strokeWidth="1" />
                <text x="20" y="52" fill="#cbd5e1" fontSize="11">• Integers: TINYINT, INT, BIGINT</text>
                <text x="20" y="70" fill="#cbd5e1" fontSize="11">• Fixed-Point: DECIMAL(M, D) (₹)</text>
                <text x="20" y="88" fill="#cbd5e1" fontSize="11">• Floats: FLOAT, DOUBLE</text>
                <text x="20" y="104" fill="#cbd5e1" fontSize="11">• Boolean: BOOLEAN (TINYINT(1))</text>
              </g>

              {/* Category 2: String & Text */}
              <g transform="translate(310, 105)">
                <rect width="180" height="115" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="90" y="24" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="12">2. STRING & TEXT</text>
                <line x1="15" y1="34" x2="165" y2="34" stroke="#334155" strokeWidth="1" />
                <text x="20" y="52" fill="#cbd5e1" fontSize="11">• Fixed: CHAR(M)</text>
                <text x="20" y="70" fill="#cbd5e1" fontSize="11">• Variable: VARCHAR(M)</text>
                <text x="20" y="88" fill="#cbd5e1" fontSize="11">• Large: TEXT, MEDIUMTEXT</text>
                <text x="20" y="104" fill="#cbd5e1" fontSize="11">• Discrete: ENUM, SET</text>
              </g>

              {/* Category 3: Date & Time */}
              <g transform="translate(590, 105)">
                <rect width="180" height="115" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                <text x="90" y="24" fill="#34d399" textAnchor="middle" fontWeight="bold" fontSize="12">3. DATE & TIME</text>
                <line x1="15" y1="34" x2="165" y2="34" stroke="#334155" strokeWidth="1" />
                <text x="20" y="52" fill="#cbd5e1" fontSize="11">• Calendar Date: DATE</text>
                <text x="20" y="70" fill="#cbd5e1" fontSize="11">• Time of Day: TIME</text>
                <text x="20" y="88" fill="#cbd5e1" fontSize="11">• Timestamp: DATETIME</text>
                <text x="20" y="104" fill="#cbd5e1" fontSize="11">• UTC-Backed: TIMESTAMP</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Numeric Data Types Deep Dive ───────────── */}
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
                Numeric Types: Exact Integers, Floats & DECIMAL(M, D)
              </h2>
              <p className="text-xs text-slate-400">
                Understanding byte footprints, signed vs unsigned, and exact monetary calculations
              </p>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab("numeric")}
              className={clsx(
                "px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all",
                activeTab === "numeric"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              )}
            &gt;
              Integer Family
            </button>
            <button
              onClick={() => setActiveTab("decimal")}
              className={clsx(
                "px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all",
                activeTab === "decimal"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              )}
            &gt;
              DECIMAL(M, D) for Currency (₹)
            </button>
            <button
              onClick={() => setActiveTab("float")}
              className={clsx(
                "px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all",
                activeTab === "float"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              )}
            &gt;
              FLOAT & DOUBLE (Scientific)
            </button>
          </div>

          {/* Tab 1: Integer Family Table */}
          {activeTab === "numeric" && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-slate-300">
                MySQL provides 5 integer types of varying byte sizes. By adding the <code>UNSIGNED</code> keyword,
                you eliminate negative values and double the positive capacity:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs md:text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Bytes</th>
                      <th className="p-3">Signed Range (Default)</th>
                      <th className="p-3">Unsigned Range (UNSIGNED)</th>
                      <th className="p-3">Ideal Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">TINYINT</td>
                      <td className="p-3">1 Byte</td>
                      <td className="p-3">-128 to 127</td>
                      <td className="p-3">0 to 255</td>
                      <td className="p-3">Age, Status flags, Month number (1-12)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">SMALLINT</td>
                      <td className="p-3">2 Bytes</td>
                      <td className="p-3">-32,768 to 32,767</td>
                      <td className="p-3">0 to 65,535</td>
                      <td className="p-3">Inventory stock, Year of graduation</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">MEDIUMINT</td>
                      <td className="p-3">3 Bytes</td>
                      <td className="p-3">-8,388,608 to 8,388,607</td>
                      <td className="p-3">0 to 16,777,215</td>
                      <td className="p-3">City PIN codes, Medium catalogs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">INT / INTEGER</td>
                      <td className="p-3">4 Bytes</td>
                      <td className="p-3">-2.14 Billion to 2.14 Billion</td>
                      <td className="p-3">0 to 4,294,967,295 (~4.29B)</td>
                      <td className="p-3">Primary Key IDs, Student Roll numbers</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">BIGINT</td>
                      <td className="p-3">8 Bytes</td>
                      <td className="p-3">-9.22 Quintillion to +9.22Q</td>
                      <td className="p-3">0 to 18.44 Quintillion</td>
                      <td className="p-3">High-velocity event logs, Global transactions</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Interactive Visualizer */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400">
                      Interactive Explorer: Value Compatibility
                    </span>
                    <p className="text-xs text-slate-500">
                      Test value {interactiveInt} with Signed vs Unsigned TINYINT
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={interactiveInt}
                      onChange={(e) => setInteractiveInt(Number(e.target.value) || 0)}
                      className="w-24 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    /&gt;
                    <label className="flex items-center gap-1 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isUnsigned}
                        onChange={(e) => setIsUnsigned(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-teal-500"
                      /&gt;
                      UNSIGNED
                    </label>
                  </div>
                </div>
                <div className="mt-3 text-xs">
                  {isUnsigned ? (
                    interactiveInt &ge; 0 && interactiveInt &le; 255 ? (
                      <span className="text-emerald-400 font-semibold">
                        ✅ Valid for TINYINT UNSIGNED (Range: 0 to 255)
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold">
                        ❌ Out of range for TINYINT UNSIGNED! Causes MySQL Error 1264: Out of range value.
                      </span>
                    )
                  ) : interactiveInt &ge; -128 && interactiveInt &le; 127 ? (
                    <span className="text-emerald-400 font-semibold">
                      ✅ Valid for signed TINYINT (Range: -128 to 127)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold">
                      ❌ Out of range for signed TINYINT! Causes MySQL Error 1264: Out of range value.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: DECIMAL */}
          {activeTab === "decimal" && (
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <h4 className="font-bold text-amber-300">
                  ⚠️ Golden Rule of Database Design: Never Use FLOAT for Money
                </h4>
                <p className="mt-1 text-xs text-amber-200/90 leading-relaxed">
                  Financial calculations in banks, accounting systems, and e-commerce platforms must balance to the exact paisa.
                  Floating-point arithmetic (FLOAT/DOUBLE) causes subtle binary rounding drift. Always use <code>DECIMAL(M, D)</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="font-mono text-cyan-400 font-bold">DECIMAL(10, 2)</h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-400">
                    <li>• <strong>M = 10</strong>: Total precision (10 significant digits)</li>
                    <li>• <strong>D = 2</strong>: Scale (2 digits after the decimal point)</li>
                    <li>• <strong>Integer Part</strong>: 10 - 2 = 8 digits (up to 99,999,999)</li>
                    <li>• <strong>Max Value</strong>: ₹99,999,999.99 (9.99 Crore Rupees)</li>
                  </ul>
                  <pre className="mt-3 rounded bg-slate-900 p-2 font-mono text-xs text-slate-300">
                    course_fee DECIMAL(8, 2) NOT NULL -- ₹15,500.00
                  </pre>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="font-mono text-cyan-400 font-bold">DECIMAL(18, 4)</h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-400">
                    <li>• <strong>M = 18</strong>: Total precision (18 significant digits)</li>
                    <li>• <strong>D = 4</strong>: Scale (4 digits for fractional paise / currency rates)</li>
                    <li>• <strong>Integer Part</strong>: 18 - 4 = 14 digits</li>
                    <li>• <strong>Max Value</strong>: ₹99,999,999,999,999.9999</li>
                  </ul>
                  <pre className="mt-3 rounded bg-slate-900 p-2 font-mono text-xs text-slate-300">
                    exchange_rate DECIMAL(10, 4) -- ₹87.4520 / USD
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Float */}
          {activeTab === "float" && (
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p>
                Floating-point numbers use the IEEE 754 standard to represent numbers across huge orders of magnitude
                using an exponent and mantissa.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="font-bold text-white">FLOAT (4 Bytes)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Single precision. Accurate up to ~7 decimal digits. Good for scientific measurements, temperature sensor readings, GPS coordinates.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="font-bold text-white">DOUBLE (8 Bytes)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Double precision. Accurate up to ~15 decimal digits. Good for physics simulations, astronomy calculations, complex statistical algorithms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── SECTION 3: String & Text Data Types ───────────────── */}
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
                String Data Types: CHAR vs VARCHAR vs TEXT vs ENUM
              </h2>
              <p className="text-xs text-slate-400">
                Fixed vs variable length storage, length-prefix bytes, and memory allocation mechanics
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-sm text-slate-300">
            {/* CHAR vs VARCHAR Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-mono text-base font-bold text-indigo-400">CHAR(M) — Fixed Length</h3>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">0 to 255 chars</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-400">
                  <li>• Always consumes exact <strong>M</strong> characters of storage regardless of actual input.</li>
                  <li>• If the stored string is shorter than M, MySQL pads it with spaces on disk.</li>
                  <li>• <strong>No length-prefix byte</strong> overhead.</li>
                  <li>• Fastest for indexing deterministic fixed-size codes.</li>
                </ul>
                <div className="mt-4 rounded bg-slate-900 p-3 border border-slate-800 font-mono text-xs">
                  <span className="text-emerald-400">pincode CHAR(6)</span> -- '700120' (Barrackpore)<br />
                  <span className="text-emerald-400">state_code CHAR(2)</span> -- 'WB'<br />
                  <span className="text-emerald-400">gender CHAR(1)</span> -- 'M' / 'F'
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-mono text-base font-bold text-cyan-400">VARCHAR(M) — Variable Length</h3>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">0 to 65,535 chars</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-400">
                  <li>• Consumes only the <strong>actual character count + 1 or 2 length prefix bytes</strong>.</li>
                  <li>• If M ≤ 255, length prefix = 1 byte. If M &gt; 255, length prefix = 2 bytes.</li>
                  <li>• Does not pad trailing spaces; saves immense disk space for variable text.</li>
                  <li>• Standard choice for names, emails, street addresses, titles.</li>
                </ul>
                <div className="mt-4 rounded bg-slate-900 p-3 border border-slate-800 font-mono text-xs">
                  <span className="text-cyan-400">first_name VARCHAR(50)</span> -- 'Susmita' (7+1 = 8 bytes)<br />
                  <span className="text-cyan-400">email VARCHAR(100)</span> -- 'mamata@codernaccotax.co.in'<br />
                  <span className="text-cyan-400">city VARCHAR(60)</span> -- 'Ichapur'
                </div>
              </div>
            </div>

            {/* ── Semantic SVG 2: Memory Storage Comparison ── */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
                Storage Anatomy: Storing the string 'Ichapur' (7 chars) in CHAR(10) vs VARCHAR(10)
              </h3>
              <svg
                viewBox="0 0 740 160"
                className="w-full h-auto text-xs font-mono"
                role="img"
                aria-label="CHAR vs VARCHAR Storage comparison"
              >
                {/* CHAR(10) */}
                <text x="30" y="30" fill="#818cf8" fontWeight="bold">CHAR(10): Always 10 Bytes (Padded with 3 spaces)</text>
                <g transform="translate(30, 42)">
                  {["I", "c", "h", "a", "p", "u", "r"].map((ch, i) => (
                    <g key={i} transform={`translate(${i * 40}, 0)`}>
                      <rect width="38" height="32" rx="4" fill="#1e293b" stroke="#818cf8" />
                      <text x="19" y="21" fill="#ffffff" textAnchor="middle" fontWeight="bold">{ch}</text>
                    </g>
                  ))}
                  {[0, 1, 2].map((s, i) => (
                    <g key={i} transform={`translate(${(7 + i) * 40}, 0)`}>
                      <rect width="38" height="32" rx="4" fill="#0f172a" stroke="#475569" strokeDasharray="3,3" />
                      <text x="19" y="21" fill="#64748b" textAnchor="middle" fontSize="10">[pad]</text>
                    </g>
                  ))}
                </g>

                {/* VARCHAR(10) */}
                <text x="30" y="110" fill="#38bdf8" fontWeight="bold">VARCHAR(10): 1 Length Byte + 7 Char Bytes = 8 Bytes Total</text>
                <g transform="translate(30, 122)">
                  {/* Length byte */}
                  <rect width="46" height="32" rx="4" fill="#0369a1" stroke="#38bdf8" />
                  <text x="23" y="21" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">Len:7</text>
                  {/* 7 chars */}
                  {["I", "c", "h", "a", "p", "u", "r"].map((ch, i) => (
                    <g key={i} transform={`translate(${52 + i * 40}, 0)`}>
                      <rect width="38" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="19" y="21" fill="#ffffff" textAnchor="middle" fontWeight="bold">{ch}</text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            {/* ENUM and TEXT summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white text-sm">ENUM ('Active', 'Inactive', 'Blocked')</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Stores 1 value out of a predefined list. Internally stored as a <strong>1-byte integer</strong> index.
                  Compact and fast, but schema changes require an ALTER TABLE.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white text-sm">TEXT (Up to 64KB) & LONGTEXT (Up to 4GB)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Used for rich content, blog articles, JSON dumps, HTML documents. Stored <strong>off-page</strong> in InnoDB
                  when row size exceeds page allocation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Date & Time Data Types ─────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Temporal Types: DATE, DATETIME vs TIMESTAMP & TIME
              </h2>
              <p className="text-xs text-slate-400">
                Timezone conversions, Year 2038 boundaries, and automated audit timestamps
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-sm text-slate-300">
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs md:text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Format</th>
                    <th className="p-3">Bytes</th>
                    <th className="p-3">Supported Range</th>
                    <th className="p-3">Time Zone Sensitivity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-emerald-400">DATE</td>
                    <td className="p-3">YYYY-MM-DD</td>
                    <td className="p-3">3 Bytes</td>
                    <td className="p-3">1000-01-01 to 9999-12-31</td>
                    <td className="p-3 font-sans text-slate-400">None (Pure Calendar Date)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-emerald-400">TIME</td>
                    <td className="p-3">HH:MM:SS</td>
                    <td className="p-3">3 Bytes</td>
                    <td className="p-3">-838:59:59 to 838:59:59</td>
                    <td className="p-3 font-sans text-slate-400">None (Duration or Clock Time)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-emerald-400">DATETIME</td>
                    <td className="p-3">YYYY-MM-DD HH:MM:SS</td>
                    <td className="p-3">5 Bytes</td>
                    <td className="p-3">1000-01-01 to 9999-12-31</td>
                    <td className="p-3 font-sans text-slate-400">No timezone conversion (Literal)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-emerald-400">TIMESTAMP</td>
                    <td className="p-3">YYYY-MM-DD HH:MM:SS</td>
                    <td className="p-3">4 Bytes</td>
                    <td className="p-3 text-amber-300">1970-01-01 to 2038-01-19</td>
                    <td className="p-3 font-sans text-emerald-400 font-bold">Converts to/from UTC</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DATETIME vs TIMESTAMP Deciding Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white text-sm">When to Choose DATETIME:</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                  <li>• <strong>Birthdates & Anniversaries:</strong> A person born on 2002-05-14 is born on that date anywhere in the world.</li>
                  <li>• <strong>Future Schedules beyond 2038:</strong> Long-term mortgage loans, 30-year bond maturities.</li>
                  <li>• <strong>Historical Event Timelines:</strong> Dates before 1970 (e.g. India's Independence in 1947).</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white text-sm">When to Choose TIMESTAMP:</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                  <li>• <strong>Audit Log Columns:</strong> Automatic tracking of record creation & modification.</li>
                  <li>• <strong>Global Distributed Apps:</strong> When users across different timezones view actions in their local time.</li>
                  <li>• <strong>Storage Savings:</strong> Saves 1 byte per row compared to DATETIME.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">
              05
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Schema Architectures (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Production-ready table DDL scripts from Barrackpore, Kolkata & Ichapur scenarios
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Example 1: College Student System */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-purple-400">
                  Case 1: Barrackpore College Student Admission Portal
                </h3>
                <span className="text-xs text-slate-500 font-mono">Students: Mamata & Abhronila</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Optimized schema for managing student registrations, phone numbers, date of birth, and fees.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE students (
    student_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_no CHAR(10) NOT NULL,                -- 10-digit Indian mobile format
    date_of_birth DATE NOT NULL,               -- DATE is optimal for birthday
    admission_fee DECIMAL(8, 2) NOT NULL,     -- e.g. ₹15,500.00 exact currency
    is_enrolled TINYINT(1) DEFAULT 1,          -- Boolean flag (1 = Active)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
            </div>

            {/* Example 2: Retail E-Commerce */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-purple-400">
                  Case 2: Kolkata Retail E-Commerce Product Catalog
                </h3>
                <span className="text-xs text-slate-500 font-mono">Students: Susmita & Debangshu</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                High-throughput product catalog with SKU codes, accurate decimal pricing in ₹, and ENUM status.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE products (
    product_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku_code CHAR(12) UNIQUE NOT NULL,         -- Deterministic 12-char code
    title VARCHAR(150) NOT NULL,
    description TEXT,                          -- Large textual description
    cost_price DECIMAL(10, 2) NOT NULL,        -- ₹450.50
    selling_price DECIMAL(10, 2) NOT NULL,     -- ₹599.00
    stock_quantity SMALLINT UNSIGNED DEFAULT 0,-- Up to 65,535 units
    status ENUM('draft', 'active', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-bold">
              06
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Pitfalls & Best Practice Guidelines
              </h2>
              <p className="text-xs text-slate-400">
                Industry habits that prevent database crashes and performance bottlenecks
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Beginner Mistakes to Avoid
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Storing Numbers or Dates as VARCHAR:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Alphabetical string sorting causes '10' to appear before '2'. Arithmetic and indexing fail.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Storing Phone Numbers as INT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Integer types strip leading zeros ('09830012345' becomes 9830012345). Use CHAR(10) or VARCHAR(15).
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Using FLOAT for Indian Currency (₹):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Binary floating point causes 0.1 + 0.2 to drift to 0.30000000000000004. Always use DECIMAL(10, 2).
                  </p>
                </div>
                <div>
                  <strong className="text-white">4. Using DATETIME for Dates of Birth:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wastes 2 bytes per row storing redundant '00:00:00' time component. Use DATE.
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
                  <strong className="text-white">1. Choose Smallest Sufficient Type:</strong>
                  <p className="text-slate-400 mt-0.5">
                    TINYINT for age (1 Byte), SMALLINT for inventory (2 Bytes), BIGINT only for multi-billion records.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Apply UNSIGNED to Non-Negative Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Doubles the maximum ID range and strictly blocks negative values from entering table records.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Standardize on utf8mb4:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures full 4-byte Unicode support for Indian languages (Bengali, Hindi) and modern emojis.
                  </p>
                </div>
                <div>
                  <strong className="text-white">4. Use NOT NULL Wherever Possible:</strong>
                  <p className="text-slate-400 mt-0.5">
                    NULL columns require extra metadata bits and complicate index traversals. Specify DEFAULT values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: Pedagogical Hint & Thinking Challenge ─── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 md:p-8"
        >
          <div className="flex items-center gap-2 text-amber-300 font-bold text-base md:text-lg">
            <span>💡</span> Think About: The 100-Million Row Dilemma
          </div>
          <div className="mt-3 text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              Imagine Mahima in Jadavpur designs a social media database expecting 100,000,000 user rows.
            </p>
            <p className="text-xs text-slate-400">
              • If she defines <code>user_id BIGINT</code> (8 bytes) instead of <code>user_id INT UNSIGNED</code> (4 bytes),
              she wastes 400 MB of RAM on the primary key alone.
            </p>
            <p className="text-xs text-slate-400">
              • In a relational schema with 10 foreign-key tables referencing <code>user_id</code>, that single 4-byte choice
              multiplies to <strong>4+ Gigabytes of wasted InnoDB Buffer Pool RAM!</strong>
            </p>
            <p className="pt-1 text-xs font-semibold text-amber-200">
              👉 Moral: Great database architects optimize byte by byte from day one.
            </p>
          </div>
        </section>

        {/* ─── SECTION 8: Summary Checklist ─────────────────────── */}
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
              <span>TINYINT (1B), SMALLINT (2B), INT (4B), BIGINT (8B)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use DECIMAL(M, D) for Indian Rupee (₹) and financial data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CHAR for fixed-length (PIN codes, hashes); VARCHAR for variable text</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DATE for birthdays and calendar dates (YYYY-MM-DD)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TIMESTAMP converts to/from UTC; DATETIME stores literal value</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TIMESTAMP hits 32-bit overflow in Year 2038</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Understanding MySQL Data Types – FAQs"
            questions={questions}
            subtitle="Master data type subtleties with 30 in-depth interview and practical questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 10: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Understanding MySQL Data Types (Numeric, String, Date/Time)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_data_types_note.txt"
          />
        </section>

        {/* ─── SECTION 11: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Selecting column data types is where software engineering meets mathematics. " +
              "In my classes at Barrackpore, I often see students casually define every string as VARCHAR(255) " +
              "and every number as INT. While this works in small lab assignments, it cripples enterprise systems " +
              "handling millions of queries. Always ask yourself three questions when creating a column: " +
              "1) What is the maximum realistic value this will ever hold? " +
              "2) Can this number ever be negative? (If no, add UNSIGNED!) " +
              "3) Is this monetary currency? (If yes, NEVER use FLOAT—use DECIMAL!). " +
              "Cultivating this engineering discipline right now will make you a world-class backend and database architect."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Understanding MySQL Data Types · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
