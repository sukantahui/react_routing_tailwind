import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – SHOW DATABASES and USE Database Commands
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Full educational tutorial component with rich interactive
 *                        session simulators, SVGs, code walkthroughs, real-world Indian scenarios,
 *                        best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Session Simulator State
  const sampleDatabases = [
    { name: "barrackpore_college_db", tables: ["students", "courses", "enrollments"], rows: 4500 },
    { name: "kolkata_fintech_ledger", tables: ["accounts", "transactions", "audit_logs"], rows: 120000 },
    { name: "ichapur_school_db", tables: ["teachers", "classes", "attendance"], rows: 1800 },
    { name: "jadavpur_retail_store", tables: ["inventory", "orders", "customers"], rows: 35000 },
  ];

  const [activeDb, setActiveDb] = useState("barrackpore_college_db");
  const [filterQuery, setFilterQuery] = useState("");
  const [targetQuery, setTargetQuery] = useState("SELECT * FROM students;");

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

  // Filtered databases for discovery simulator
  const filteredDatabases = sampleDatabases.filter((d) =>
    d.name.toLowerCase().includes(filterQuery.toLowerCase().trim())
  );

  const currentDbObj = sampleDatabases.find((d) => d.name === activeDb);

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
            Module 001_002 · SQL Fundamentals · Topic 2
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            SHOW DATABASES &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              USE Commands
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master database schema discovery, pattern filtering, active connection context management,
            and qualified vs unqualified table resolution.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 SHOW DATABASES & Filtering
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 USE Session Namespace
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📍 SELECT DATABASE() Verification
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Qualified vs Unqualified SQL
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Discovery with SHOW DATABASES ──────────── */}
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
                Discovering Schemas with SHOW DATABASES
              </h2>
              <p className="text-xs text-slate-400">
                Listing accessible databases, pattern filtering, and permission isolation
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              When working in MySQL CLI, Workbench, or server terminals, the first step is discovering which databases
              exist on the host instance. The <code>SHOW DATABASES;</code> command lists all databases accessible to your user.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                  1. Pattern Filtering with LIKE
                </h3>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 border border-slate-800 leading-relaxed">
{`-- Find all databases starting with 'barrackpore_'
SHOW DATABASES LIKE 'barrackpore_%';

-- Find all staging / test databases
SHOW DATABASES LIKE '%_staging';`}
                </pre>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                  2. Filtering with WHERE Clause
                </h3>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 border border-slate-800 leading-relaxed">
{`-- Hide internal MySQL system schemas
SHOW DATABASES
WHERE \`Database\` NOT IN (
    'information_schema', 'mysql',
    'performance_schema', 'sys'
);`}
                </pre>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Session Namespace Resolution ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Session Context and Qualified vs Unqualified Queries
            </h3>
            <svg
              viewBox="0 0 780 230"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="MySQL USE session namespace diagram"
            >
              {/* Session Connection */}
              <rect x="20" y="20" width="220" height="190" rx="8" fill="#0f172a" stroke="#14b8a6" />
              <text x="130" y="44" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="12">
                Client Session Context
              </text>
              <line x1="30" y1="54" x2="230" y2="54" stroke="#1e293b" />

              <g transform="translate(35, 68)">
                <text x="0" y="16" fill="#94a3b8" fontSize="11">User: <tspan fill="#ffffff" fontWeight="bold">mamata@localhost</tspan></text>
                <text x="0" y="38" fill="#94a3b8" fontSize="11">Active DB: <tspan fill="#38bdf8" fontWeight="bold">barrackpore_college_db</tspan></text>
                <rect y="52" width="190" height="46" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="8" y="70" fill="#34d399" font-family="monospace" fontSize="10">SELECT * FROM students;</text>
                <text x="8" y="88" fill="#64748b" fontSize="9">Implicitly resolved to active DB</text>
              </g>

              {/* Resolution Arrow */}
              <path d="M 240 115 L 340 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
              <text x="290" y="105" fill="#38bdf8" textAnchor="middle" fontSize="10">Resolves to</text>

              {/* Database Server Schemas */}
              <g transform="translate(350, 20)">
                <rect width="410" height="190" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="205" y="26" fill="#f8fafc" textAnchor="middle" fontWeight="bold" fontSize="12">
                  Server Schemas Namespace
                </text>
                <line x1="15" y1="36" x2="395" y2="36" stroke="#334155" />

                {/* Target DB */}
                <g transform="translate(20, 50)">
                  <rect width="175" height="120" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="12" y="22" fill="#38bdf8" fontWeight="bold" fontSize="11">📁 barrackpore_college_db</text>
                  <rect x="12" y="36" width="150" height="24" rx="4" fill="#0284c7" />
                  <text x="20" y="52" fill="#ffffff" fontWeight="bold" fontSize="10">✓ students (TARGET)</text>
                  <text x="16" y="80" fill="#94a3b8" fontSize="10">• courses</text>
                  <text x="16" y="100" fill="#94a3b8" fontSize="10">• enrollments</text>
                </g>

                {/* Other DB */}
                <g transform="translate(210, 50)">
                  <rect width="175" height="120" rx="6" fill="#0f172a" stroke="#64748b" />
                  <text x="12" y="22" fill="#94a3b8" fontWeight="bold" fontSize="11">📁 kolkata_retail_db</text>
                  <text x="16" y="50" fill="#64748b" fontSize="10">• products</text>
                  <text x="16" y="72" fill="#64748b" fontSize="10">• orders</text>
                  <text x="16" y="94" fill="#64748b" fontSize="10">• customers</text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: The USE Statement & Active Context ─────── */}
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
                Selecting Active Database with USE
              </h2>
              <p className="text-xs text-slate-400">
                Session state, unqualified table names, and cross-database joins
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <p>
              When a client connects to MySQL, the default database is initially <code>NULL</code> unless specified in the connection URL.
              Executing <code>USE db_name;</code> tells MySQL: <em>"Direct all subsequent unqualified queries to this database."</em>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Unqualified Query (Default Context)
                </h3>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 border border-slate-800">
{`USE barrackpore_college_db;

-- Table resolved inside active DB:
SELECT * FROM students;`}
                </pre>
                <p className="text-xs text-slate-400 mt-2">
                  Cleaner and more concise for single-application codebases.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Fully Qualified Query (Cross-Database)
                </h3>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 border border-slate-800">
{`-- Can be run from ANY active database:
SELECT * FROM kolkata_fintech_ledger.accounts;`}
                </pre>
                <p className="text-xs text-slate-400 mt-2">
                  Essential for cross-schema analytical reports and multi-tenant joins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Interactive Session Context Simulator ──── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Session Simulator: SHOW DATABASES & USE
              </h2>
              <p className="text-xs text-slate-400">
                Simulate database switching, verify session state, and see how table queries resolve
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Discovery & Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Filter Databases (SHOW DATABASES LIKE):
                </label>
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="e.g. barrackpore, ledger, school..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Click to Execute `USE [database_name]`:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {filteredDatabases.map((db) => (
                    <button
                      key={db.name}
                      onClick={() => {
                        setActiveDb(db.name);
                        setTargetQuery(`SELECT * FROM ${db.tables[0]};`);
                      }}
                      className={clsx(
                        "w-full text-left p-3 rounded-lg border text-xs font-mono transition-all flex items-center justify-between",
                        activeDb === db.name
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-md"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>📁</span>
                        <span>{db.name}</span>
                      </span>
                      {activeDb === db.name && (
                        <span className="text-[10px] font-sans font-bold bg-teal-500/30 text-teal-300 px-2 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  ))}
                  {filteredDatabases.length === 0 && (
                    <p className="text-xs text-slate-500 p-3 italic text-center">
                      No databases match pattern "{filterQuery}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Active Session Diagnostic Panel */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                  Live Session Diagnostic:
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span className="text-slate-400">SELECT DATABASE();</span>
                    <span className="text-cyan-400 font-bold">'{activeDb}'</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span className="text-slate-400">SHOW TABLES;</span>
                    <span className="text-emerald-400">[{currentDbObj?.tables.join(", ")}]</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span className="text-slate-400">Total Records:</span>
                    <span className="text-purple-400 font-bold">{currentDbObj?.rows.toLocaleString()} rows</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">Query Resolution Test:</span>
                  <pre className="rounded bg-slate-900 p-2.5 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto">
                    {targetQuery}
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    ✓ Resolved as: <code className="text-teal-400">{activeDb}.{currentDbObj?.tables[0]}</code>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 italic">
                Session state resets to NULL when connection disconnects.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Real-World Production Scenarios ────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Cross-Database Querying Case Studies
              </h2>
              <p className="text-xs text-slate-400">
                Multi-schema queries from Barrackpore, Kolkata & Jadavpur scenarios
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Multi-Branch Pharmacy Discovery Script
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore & Ichapur</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Discover all branch databases and verify active context before running daily inventory reports.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Discover all pharmacy branches
SHOW DATABASES LIKE 'pharmacy_%';

-- Connect to Barrackpore main branch
USE pharmacy_barrackpore_db;

-- Verify active schema
SELECT DATABASE();

-- Query local inventory
SELECT medicine_name, stock_count, unit_price_inr
FROM medicines
WHERE stock_count < 10;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Cross-Database Financial Join
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata & Jadavpur</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Joining customer demographic data from <code>jadavpur_user_registry</code> with ledger records in <code>kolkata_fintech_ledger</code>.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`USE kolkata_fintech_ledger;

-- Cross-database join across two schemas on the same server instance
SELECT
    t.transaction_id,
    t.amount_inr,
    c.customer_name,
    c.phone_no,
    t.created_at
FROM kolkata_fintech_ledger.transactions t
JOIN jadavpur_user_registry.customers c
    ON t.customer_id = c.customer_id
WHERE t.amount_inr >= 50000.00;`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              05
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Avoid context errors and security leaks when navigating database schemas
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
                  <strong className="text-white">1. Error 1046: No Database Selected:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Executing queries without issuing <code>USE db_name;</code> first or omitting schema prefixes.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming USE Persists Across Web Requests:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Connection pools hand out fresh connections where default database may be unset.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Linux File-System Case Sensitivity:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>USE SchoolDB;</code> fails on Linux if folder was created as <code>schooldb</code>.
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
                  <strong className="text-white">1. Specify DB in Connection String:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Set database directly in JDBC/Node.js URL: <code>mysql://host:3306/college_db</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Verify Session with SELECT DATABASE():</strong>
                  <p className="text-slate-400 mt-0.5">
                    Include verification in migration runners before executing destructive DDL scripts.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Fully Qualify in Automation Scripts:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>db_name.table_name</code> in scheduled cron jobs to eliminate context ambiguity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: Summary Checklist ─────────────────────── */}
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
              <span><code>SHOW DATABASES;</code> lists all accessible schemas</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Filter schemas with <code>SHOW DATABASES LIKE 'pattern%';</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>USE db_name;</code> sets active schema for current connection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>SELECT DATABASE();</code> returns active schema name or NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Error 1046 occurs when querying with no active database selected</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Cross-database joins require qualified names: <code>db.table</code></span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="SHOW DATABASES & USE Commands – FAQs"
            questions={questions}
            subtitle="Master schema discovery, session contexts, and cross-database querying with 30 in-depth Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 8: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="SHOW DATABASES and USE Database Commands"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_show_use_note.txt"
          />
        </section>

        {/* ─── SECTION 9: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding session context is where beginners often get confused. In my classes, " +
              "students sometimes ask why their query worked in one MySQL Workbench tab but gave 'Error 1046: No database selected' " +
              "in another. Remember: each tab or script connection is an independent TCP session. Executing `USE` in Tab 1 " +
              "does NOT affect Tab 2! Always verify your active database using `SELECT DATABASE();` when starting work. " +
              "In production backend architectures, configure your connection pools to connect directly to the target schema URL."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · SHOW DATABASES & USE Commands · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
