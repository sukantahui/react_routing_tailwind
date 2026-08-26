import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – CREATE DATABASE and DROP DATABASE Statements
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Full educational tutorial component with rich interactive
 *                        SVGs, code generator sandbox, real-world Indian scenarios,
 *                        best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive SQL Builder State
  const [dbName, setDbName] = useState("barrackpore_college_db");
  const [useIfNotExists, setUseIfNotExists] = useState(true);
  const [selectedCharset, setSelectedCharset] = useState("utf8mb4");
  const [selectedCollation, setSelectedCollation] = useState("utf8mb4_0900_ai_ci");
  const [actionType, setActionType] = useState("create"); // "create" or "drop"

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

  // Helper to format generated SQL
  const sanitizedDbName = dbName.trim().replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase() || "my_database";

  const generatedSQL =
    actionType === "create"
      ? `CREATE DATABASE ${useIfNotExists ? "IF NOT EXISTS " : ""}${sanitizedDbName}\nCHARACTER SET ${selectedCharset}\nCOLLATE ${selectedCollation};`
      : `DROP DATABASE ${useIfNotExists ? "IF EXISTS " : ""}${sanitizedDbName};`;

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
            Module 001_002 · SQL Fundamentals · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            CREATE DATABASE &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
              DROP DATABASE
            </span>{" "}
            Statements
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master schema namespace creation, character set configurations, atomic DDL mechanics,
            and safe database destruction workflows in production environments.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏗️ CREATE DATABASE Syntax
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Idempotent IF NOT EXISTS
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Character Set & Collation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Irreversible DROP Mechanics
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: What is a Database in MySQL? ───────────── */}
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
                What is a Database (Schema) in MySQL?
              </h2>
              <p className="text-xs text-slate-400">
                Logical namespaces, physical disk mapping, and the Data Dictionary
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In MySQL, the keywords <strong>DATABASE</strong> and <strong>SCHEMA</strong> are 100% interchangeable synonyms.
              A database is a top-level logical container that isolates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">1. Tables & Views</span>
                <p className="text-xs text-slate-400">Relational data matrices, indexes, virtual views, and constraints.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">2. Stored Routines</span>
                <p className="text-xs text-slate-400">Procedures, functions, database triggers, and event scheduler tasks.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">3. Security & Settings</span>
                <p className="text-xs text-slate-400">Default character sets, collations, and user-level access permissions.</p>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: File System & Data Dictionary Architecture ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Internal Architecture: How MySQL Maps Databases to Disk and Metadata
            </h3>
            <svg
              viewBox="0 0 780 230"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="MySQL Database Storage Architecture Diagram"
            >
              {/* Server Root */}
              <rect x="20" y="20" width="220" height="190" rx="8" fill="#0f172a" stroke="#334155" />
              <text x="130" y="44" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="12">
                MySQL Server (Port 3306)
              </text>
              <line x1="30" y1="54" x2="230" y2="54" stroke="#1e293b" />

              {/* Inside Server */}
              <rect x="35" y="65" width="190" height="38" rx="6" fill="#1e293b" stroke="#14b8a6" />
              <text x="130" y="89" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
                barrackpore_college_db
              </text>

              <rect x="35" y="112" width="190" height="38" rx="6" fill="#1e293b" stroke="#818cf8" />
              <text x="130" y="136" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
                kolkata_retail_db
              </text>

              <rect x="35" y="159" width="190" height="38" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="130" y="183" fill="#94a3b8" textAnchor="middle" fontSize="11">
                mysql / sys / info_schema
              </text>

              {/* Arrows */}
              <path d="M 240 84 L 320 84" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M 240 131 L 320 131" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* File System */}
              <g transform="translate(330, 20)">
                <rect width="430" height="190" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="215" y="28" fill="#f8fafc" textAnchor="middle" fontWeight="bold" fontSize="12">
                  Operating System File System (Data Directory: datadir)
                </text>
                <line x1="15" y1="38" x2="415" y2="38" stroke="#334155" />

                {/* Subfolder 1 */}
                <g transform="translate(20, 50)">
                  <rect width="185" height="120" rx="6" fill="#0f172a" stroke="#14b8a6" />
                  <text x="12" y="22" fill="#14b8a6" fontWeight="bold" fontSize="11">📁 /barrackpore_college_db/</text>
                  <text x="24" y="44" fill="#cbd5e1" fontSize="10">• students.ibd (Data+Index)</text>
                  <text x="24" y="64" fill="#cbd5e1" fontSize="10">• courses.ibd</text>
                  <text x="24" y="84" fill="#cbd5e1" fontSize="10">• enrollments.ibd</text>
                  <text x="24" y="104" fill="#64748b" fontSize="9">InnoDB Tablespace Files</text>
                </g>

                {/* Data dictionary */}
                <g transform="translate(225, 50)">
                  <rect width="185" height="120" rx="6" fill="#0f172a" stroke="#f59e0b" />
                  <text x="12" y="22" fill="#f59e0b" fontWeight="bold" fontSize="11">🗄️ mysql.ibd (Data Dictionary)</text>
                  <text x="20" y="44" fill="#cbd5e1" fontSize="10">• Schema Definitions</text>
                  <text x="20" y="64" fill="#cbd5e1" fontSize="10">• Character Set: utf8mb4</text>
                  <text x="20" y="84" fill="#cbd5e1" fontSize="10">• Collation: utf8mb4_0900_ai_ci</text>
                  <text x="20" y="104" fill="#10b981" fontSize="9">✓ Atomic DDL Transactional</text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: CREATE DATABASE in Depth ───────────────── */}
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
                The CREATE DATABASE Statement
              </h2>
              <p className="text-xs text-slate-400">
                Syntax, idempotent execution, character set inheritance, and collation rules
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <h3 className="font-bold text-white text-base">Full Production Syntax:</h3>
            <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-cyan-300 border border-slate-800 leading-relaxed">
{`CREATE DATABASE [IF NOT EXISTS] db_name
    [CHARACTER SET charset_name]
    [COLLATE collation_name]
    [ENCRYPTION = {'Y' | 'N'}];`}
            </pre>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="text-teal-400">✓</span> Why IF NOT EXISTS is Mandatory:
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  In production CI/CD pipelines, Docker container initializations, and database migration scripts,
                  running <code>CREATE DATABASE db_name;</code> twice throws <strong>Error 1007: Can't create database</strong> and crashes the build.
                  Adding <code>IF NOT EXISTS</code> ensures the script runs safely without error.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="text-teal-400">✓</span> Character Set & Collation Inheritance:
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  When you specify <code>CHARACTER SET utf8mb4</code> and <code>COLLATE utf8mb4_0900_ai_ci</code> at the database level,
                  all future tables created within this database automatically inherit these settings, preventing character corruption in Indian names (Bengali/Hindi) and emojis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: DROP DATABASE & Safe Teardown ───────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The DROP DATABASE Statement (Irreversible Destruction)
              </h2>
              <p className="text-xs text-slate-400">
                Permanent deletion mechanics, safety protocols, and IF EXISTS clause
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
              <h4 className="font-bold text-rose-300 flex items-center gap-2">
                <span>🚨</span> CRITICAL WARNING: No Recycle Bin in MySQL!
              </h4>
              <p className="mt-1 text-xs text-rose-200/90 leading-relaxed">
                Dropping a database permanently wipes all tables, records, indexes, stored procedures, and physical files from disk.
                There is NO rollback, NO "Trash can", and NO undo command.
              </p>
            </div>

            <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-rose-300 border border-slate-800 leading-relaxed">
{`-- Safe Idempotent Drop
DROP DATABASE IF EXISTS test_sandbox_db;

-- Verifying backup before dropping in production
-- $ mysqldump -u root -p --single-transaction college_db &gt; college_db_backup.sql`}
            </pre>

            {/* Default System Databases Warning */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 mt-4">
              <h4 className="font-bold text-amber-300 text-sm mb-2">
                🛡️ Default System Databases (NEVER Drop These):
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                <li className="p-2 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-white font-mono">mysql</strong>: Core authentication, users, passwords, and permissions.
                </li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-white font-mono">information_schema</strong>: Virtual read-only ANSI metadata catalog.
                </li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-white font-mono">performance_schema</strong>: Low-level server engine and execution monitoring.
                </li>
                <li className="p-2 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-white font-mono">sys</strong>: Diagnostic health views on top of performance schema.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Interactive DDL Statement Generator ────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive DDL Statement Generator & Tester
              </h2>
              <p className="text-xs text-slate-400">
                Generate production-ready CREATE and DROP SQL statements with customized configurations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Operation Type:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActionType("create")}
                    className={clsx(
                      "flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all",
                      actionType === "create"
                        ? "bg-teal-500/20 text-teal-400 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    CREATE DATABASE
                  </button>
                  <button
                    onClick={() => setActionType("drop")}
                    className={clsx(
                      "flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all",
                      actionType === "drop"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    DROP DATABASE
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Database Identifier Name:
                </label>
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  placeholder="e.g. barrackpore_college_db"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                /&gt;
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ifNotExists"
                  checked={useIfNotExists}
                  onChange={(e) => setUseIfNotExists(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-teal-500"
                /&gt;
                <label htmlFor="ifNotExists" className="text-xs text-slate-300 cursor-pointer">
                  Include <code>{actionType === "create" ? "IF NOT EXISTS" : "IF EXISTS"}</code> (Idempotent Safe Guard)
                </label>
              </div>

              {actionType === "create" && (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Character Set:
                    </label>
                    <select
                      value={selectedCharset}
                      onChange={(e) => setSelectedCharset(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                    &gt;
                      <option value="utf8mb4">utf8mb4 (Recommended - Full 4-byte Unicode & Emojis)</option>
                      <option value="latin1">latin1 (Western European)</option>
                      <option value="ascii">ascii (7-bit ASCII)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Collation:
                    </label>
                    <select
                      value={selectedCollation}
                      onChange={(e) => setSelectedCollation(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                    &gt;
                      <option value="utf8mb4_0900_ai_ci">utf8mb4_0900_ai_ci (Unicode 9.0 Accent & Case Insensitive)</option>
                      <option value="utf8mb4_bin">utf8mb4_bin (Binary Strict Case-Sensitive)</option>
                      <option value="utf8mb4_unicode_ci">utf8mb4_unicode_ci (Legacy Unicode)</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Generated Output Preview */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div>
                <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
                  Generated SQL Script:
                </span>
                <pre className="mt-2 rounded-lg bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 leading-relaxed overflow-x-auto">
                  {generatedSQL}
                </pre>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-slate-300 font-semibold">Tip: </span>
                Save this DDL statement in your project's <code>schema.sql</code> or Docker <code>init.sql</code> script.
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              05
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Practical DDL script patterns from Barrackpore, Kolkata & Ichapur
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Pharmacy Inventory Schema
                </h3>
                <span className="text-xs text-slate-500 font-mono">Location: Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Idempotent database setup supporting medicine descriptions and customer names in English and Bengali.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE DATABASE IF NOT EXISTS barrackpore_pharmacy_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE barrackpore_pharmacy_db;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Banking Ledger Database
                </h3>
                <span className="text-xs text-slate-500 font-mono">Location: Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Strict binary collation for banking transaction codes and account identification strings.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE DATABASE IF NOT EXISTS kolkata_banking_ledger
CHARACTER SET utf8mb4
COLLATE utf8mb4_bin;

USE kolkata_banking_ledger;`}
              </pre>
            </div>

            {/* Case 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 3: Abhronila's Ichapur School Staging Reset Script
                </h3>
                <span className="text-xs text-slate-500 font-mono">Location: Ichapur</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Automated test suite script to tear down old test data and rebuild a fresh staging environment.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Automated Staging Reset Pipeline
DROP DATABASE IF EXISTS ichapur_school_staging;
CREATE DATABASE ichapur_school_staging
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE ichapur_school_staging;`}
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              06
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Crucial lessons to protect database availability and avoid downtime
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
                  <strong className="text-white">1. Accidental Production Drops:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Executing a drop command while accidentally connected to production instead of local/staging.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Case Sensitivity Mismatch on Linux:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Creating <code>SchoolDB</code> on Windows and deploying on Linux where <code>schooldb</code> is not found. Always use lowercase.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Using Reserved Words without Backticks:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>CREATE DATABASE order;</code> fails. Use <code>order_management_db</code> instead.
                  </p>
                </div>
                <div>
                  <strong className="text-white">4. Omission of IF NOT EXISTS:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Causes build scripts and automated Docker initialization to abort with Error 1007.
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
                  <strong className="text-white">1. Verify Connection Context:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always run <code>SELECT @@hostname, DATABASE();</code> before performing administrative DDL operations.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Revoke DROP Privileges in Production:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Regular application service accounts must NEVER have global <code>DROP</code> privileges.
                  </p>
                </div>
                <div>
                  <strong className="text-white">3. Standardize on utf8mb4:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure seamless global Unicode compatibility for multi-language support and emojis.
                  </p>
                </div>
                <div>
                  <strong className="text-white">4. Take Snapshot Backups:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Execute a logical backup via <code>mysqldump</code> before any planned schema deprecation.
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
            <span>💡</span> Think About: The Dangerous Typo
          </div>
          <div className="mt-3 text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              Suppose Susmita in Jadavpur has two databases on her server:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
              <li><code>ecommerce_production_db</code> (contains ₹50,00,000 worth of active orders)</li>
              <li><code>ecommerce_staging_db</code> (used for weekly testing)</li>
            </ul>
            <p className="text-xs text-slate-400">
              If an automated test script executes <code>DROP DATABASE ecommerce_production_db;</code> due to a misconfigured environment variable,
              MySQL will immediately destroy the production database in under 200 milliseconds.
            </p>
            <p className="pt-1 text-xs font-semibold text-amber-200">
              👉 What safeguards should be implemented? 1) Distinct DB users with no DROP grants, 2) Read-only schema locks (<code>READ ONLY = 1</code>), and 3) Continuous binary log backups.
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
              <span>In MySQL, DATABASE and SCHEMA are exact synonyms</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use IF NOT EXISTS for idempotent creation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Explicitly specify CHARACTER SET utf8mb4</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DROP DATABASE is permanent and has no Trash/Recycle Bin</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never drop default system databases (mysql, sys, etc.)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use all-lowercase snake_case for cross-platform OS safety</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="CREATE & DROP DATABASE Statements – FAQs"
            questions={questions}
            subtitle="Master database initialization, character sets, and safety protocols with 30 comprehensive Q&As"
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
            title="CREATE DATABASE and DROP DATABASE Statements"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_database_statements_note.txt"
          />
        </section>

        {/* ─── SECTION 11: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "In my database engineering classes in Barrackpore, I emphasize that `CREATE DATABASE` is " +
              "the foundation stone of your application architecture. The character set and collation you choose " +
              "here propagate across every table, column, index, and query. More importantly, treat `DROP DATABASE` " +
              "with extreme respect. In commercial software engineering, irreversible commands should never be executed " +
              "interactively on production servers without triple-checking the connection host and ensuring automated backups " +
              "are active. Build the habit of writing safe, idempotent SQL scripts (`IF NOT EXISTS` / `IF EXISTS`) from day one!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · CREATE DATABASE & DROP DATABASE Statements · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
