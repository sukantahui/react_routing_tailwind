import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

/**
 * Topic18 – Primary Key Concept
 *
 * @component
 * @returns {JSX.Element} The full topic page styled in premium dark mode
 *                        with smooth animations, rich SVGs, interactive
 *                        demonstrations, and classroom notes.
 *
 * @purpose Explain the primary key concept — the fundamental mechanism
 *          for uniquely identifying rows in a table. Covers properties,
 *          types, rules, SQL syntax, and best practices.
 */
const Topic18 = () => {
  const [activeCodeTab, setActiveCodeTab] = useState("column");
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef([]);

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
        rootMargin: "0px 0px -40px 0px",
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

  const sqlSnippets = {
    column: `-- 1. Single Column Primary Key (Column-Level Constraint)
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName  VARCHAR(50) NOT NULL,
    Class     TINYINT NOT NULL,
    City      VARCHAR(60) DEFAULT 'Barrackpore'
);`,
    composite: `-- 2. Composite Primary Key (Table-Level Constraint)
CREATE TABLE CourseEnrollments (
    StudentID INT NOT NULL,
    CourseID  INT NOT NULL,
    EnrolledAt DATE DEFAULT (CURRENT_DATE),
    Grade     CHAR(2),
    -- Composite primary key combining two columns
    PRIMARY KEY (StudentID, CourseID)
);`,
    autoIncrement: `-- 3. Surrogate Key with AUTO_INCREMENT (Recommended in MySQL)
CREATE TABLE Products (
    ProductID   INT AUTO_INCREMENT PRIMARY KEY,
    SKUCode     VARCHAR(30) UNIQUE NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    UnitPrice   DECIMAL(10, 2) NOT NULL
);`,
    alter: `-- 4. Adding Primary Key Constraint to an Existing Table
ALTER TABLE LibraryMembers
ADD CONSTRAINT PK_LibraryMembers PRIMARY KEY (MemberID);`
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ─── Inline Keyframes & Animation Utilities ───────── */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            transform: translateY(24px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-section.is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        .key-glow-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .key-glow-card:hover {
          transform: translateY(-3px);
        }
      `}</style>

      {/* ─── Main Container in Dark Mode ────────────────────── */}
      <div className="dark w-full max-w-5xl mx-auto px-4 py-8 md:py-12 bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200">
        
        {/* ─── Hero Header ──────────────────────────────────── */}
        <header ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Module 1 · Topic 18</span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Primary Key Concept
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            The cornerstone of relational database design — guaranteeing entity integrity, row uniqueness, and reliable table relationships.
          </p>
        </header>

        {/* ─── SVG: Primary Key Visual Architecture Diagram ──── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-200">
                  Relational Identity Architecture: Primary Key (PK) Mechanics
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-md">
                Entity Integrity Enforced
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 760 260"
                className="w-full min-w-[620px] h-auto select-none"
                role="img"
                aria-label="Primary key visualization in relational database table"
              >
                <defs>
                  <linearGradient id="pkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Main Table Outer Frame */}
                <rect x="20" y="20" width="720" height="220" rx="14" fill="#0b1329" stroke="#334155" strokeWidth="1.5" />

                {/* Table Header Container */}
                <rect x="20" y="20" width="720" height="42" rx="14" fill="url(#headerGrad)" />
                <rect x="20" y="50" width="720" height="12" fill="#0f172a" />
                <line x1="20" y1="62" x2="740" y2="62" stroke="#334155" strokeWidth="1.5" />

                {/* Column Background Highlight for Primary Key */}
                <rect x="30" y="26" width="130" height="206" rx="8" fill="url(#pkGrad)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* Table Column Headers */}
                <text x="95" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="#60a5fa" filter="url(#glow)">
                  🔑 StudentID (PK)
                </text>
                <text x="230" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#e2e8f0">
                  Student Name
                </text>
                <text x="375" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#e2e8f0">
                  Class / Stream
                </text>
                <text x="510" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#e2e8f0">
                  City Location
                </text>
                <text x="650" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#94a3b8">
                  Row Verification
                </text>

                {/* Row Dividers */}
                <line x1="20" y1="102" x2="740" y2="102" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="142" x2="740" y2="142" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="182" x2="740" y2="182" stroke="#1e293b" strokeWidth="1" />
                <line x1="20" y1="222" x2="740" y2="222" stroke="#1e293b" strokeWidth="1" />

                {/* Row 1 */}
                <rect x="42" y="73" width="106" height="22" rx="5" fill="#1e40af" fillOpacity="0.4" />
                <text x="95" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#93c5fd">101</text>
                <text x="230" y="88" textAnchor="middle" fontSize="12" fill="#f1f5f9">Swadeep Sharma</text>
                <text x="375" y="88" textAnchor="middle" fontSize="12" fill="#cbd5e1">Class 10 · Science</text>
                <text x="510" y="88" textAnchor="middle" fontSize="12" fill="#cbd5e1">Barrackpore</text>
                <text x="650" y="88" textAnchor="middle" fontSize="11" fill="#34d399">✓ Unique &amp; Non-NULL</text>

                {/* Row 2 */}
                <rect x="42" y="113" width="106" height="22" rx="5" fill="#1e40af" fillOpacity="0.4" />
                <text x="95" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="#93c5fd">102</text>
                <text x="230" y="128" textAnchor="middle" fontSize="12" fill="#f1f5f9">Tuhina Sengupta</text>
                <text x="375" y="128" textAnchor="middle" fontSize="12" fill="#cbd5e1">Class 12 · ComSci</text>
                <text x="510" y="128" textAnchor="middle" fontSize="12" fill="#cbd5e1">Shyamnagar</text>
                <text x="650" y="128" textAnchor="middle" fontSize="11" fill="#34d399">✓ Unique &amp; Non-NULL</text>

                {/* Row 3 */}
                <rect x="42" y="153" width="106" height="22" rx="5" fill="#1e40af" fillOpacity="0.4" />
                <text x="95" y="168" textAnchor="middle" fontSize="12" fontWeight="700" fill="#93c5fd">103</text>
                <text x="230" y="168" textAnchor="middle" fontSize="12" fill="#f1f5f9">Abhronila Das</text>
                <text x="375" y="168" textAnchor="middle" fontSize="12" fill="#cbd5e1">Class 11 · Science</text>
                <text x="510" y="168" textAnchor="middle" fontSize="12" fill="#cbd5e1">Ichapur</text>
                <text x="650" y="168" textAnchor="middle" fontSize="11" fill="#34d399">✓ Unique &amp; Non-NULL</text>

                {/* Row 4 */}
                <rect x="42" y="193" width="106" height="22" rx="5" fill="#1e40af" fillOpacity="0.4" />
                <text x="95" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#93c5fd">104</text>
                <text x="230" y="208" textAnchor="middle" fontSize="12" fill="#f1f5f9">Debangshu Ghosh</text>
                <text x="375" y="208" textAnchor="middle" fontSize="12" fill="#cbd5e1">Class 12 · Arts</text>
                <text x="510" y="208" textAnchor="middle" fontSize="12" fill="#cbd5e1">Naihati</text>
                <text x="650" y="208" textAnchor="middle" fontSize="11" fill="#34d399">✓ Unique &amp; Non-NULL</text>
              </svg>
            </div>
            
            <p className="mt-3 text-center text-xs text-slate-400">
              Each row is deterministically identified by its <span className="text-blue-400 font-semibold">StudentID</span>. The RDBMS enforces that no two rows share the same key and no key contains NULL.
            </p>
          </div>
        </section>

        {/* ─── Conceptual Foundation ────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "200ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 text-lg">📖</span>
              What is a Primary Key?
            </h2>
            
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              A <strong className="text-blue-400 font-semibold">Primary Key (PK)</strong> is a column or an immutable set of columns in a relational table that uniquely distinguishes every individual tuple (row) from all others. It is the foundational pillar required to uphold <strong className="text-sky-300">Entity Integrity</strong> in relational database theory.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-blue-900/50 bg-blue-950/30">
                <h4 className="font-bold text-blue-300 flex items-center gap-2 mb-2 text-sm sm:text-base">
                  <span>⚡</span> Core Relational Guarantee
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span><strong>Entity Integrity:</strong> No tuple can exist in the relation without a valid, non-null identity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span><strong>Uniqueness:</strong> Database engine creates a unique index, preventing duplicate row inserts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span><strong>Referential Anchor:</strong> Primary keys are the targets referenced by <code>FOREIGN KEY</code> constraints.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-indigo-900/50 bg-indigo-950/30">
                <h4 className="font-bold text-indigo-300 flex items-center gap-2 mb-2 text-sm sm:text-base">
                  <span>🏛️</span> Real-World Analogy
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Consider your <strong>Aadhaar Card Number</strong> or <strong>Passport Number</strong>. Even if two people in Barrackpore share the identical name, date of birth, and locality, their unique identification number prevents identity collision. A table without a primary key is like an unindexed room of identical unlabeled documents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6 Invariant Rules of a Primary Key ────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "300ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-lg">📋</span>
                The 6 Invariant Rules of a Primary Key
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Every relational database engine strictly evaluates and enforces these constraints during DDL/DML execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "🔒",
                  title: "1. Absolute Uniqueness",
                  tag: "Unique Index",
                  desc: "No two rows can share the exact same primary key value. Every row represents a distinct entity in space and time.",
                  border: "border-blue-800/60",
                  bg: "bg-blue-950/40",
                  textColor: "text-blue-300",
                },
                {
                  icon: "🚫",
                  title: "2. Strict NOT NULL",
                  tag: "Mandatory",
                  desc: "NULL signifies unknown or missing data. A row with a NULL primary key would have an undefined identity, violating relational rules.",
                  border: "border-rose-800/60",
                  bg: "bg-rose-950/40",
                  textColor: "text-rose-300",
                },
                {
                  icon: "💎",
                  title: "3. Immutability",
                  tag: "Never Update",
                  desc: "Primary keys should never change during an entity's lifecycle. Updating a PK risks cascade lock contention and orphaned foreign keys.",
                  border: "border-amber-800/60",
                  bg: "bg-amber-950/40",
                  textColor: "text-amber-300",
                },
                {
                  icon: "👑",
                  title: "4. Exactly One per Table",
                  tag: "Single Entity ID",
                  desc: "A table can possess multiple candidate keys, but only one primary key can be designated. It may span single or multiple columns.",
                  border: "border-purple-800/60",
                  bg: "bg-purple-950/40",
                  textColor: "text-purple-300",
                },
                {
                  icon: "📏",
                  title: "5. Minimality",
                  tag: "Fewest Bytes",
                  desc: "The primary key must not include redundant columns. Using a 4-byte INT is significantly faster than wide VARCHAR columns.",
                  border: "border-emerald-800/60",
                  bg: "bg-emerald-950/40",
                  textColor: "text-emerald-300",
                },
                {
                  icon: "🔗",
                  title: "6. Semantic Stability",
                  tag: "System Driven",
                  desc: "Avoid business values like phone numbers or email addresses that are vulnerable to user updates, reassignments, or company policy changes.",
                  border: "border-cyan-800/60",
                  bg: "bg-cyan-950/40",
                  textColor: "text-cyan-300",
                },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "key-glow-card rounded-xl border p-4 sm:p-5 flex flex-col justify-between shadow-lg",
                    rule.border,
                    rule.bg
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-2xl">{rule.icon}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700">
                        {rule.tag}
                      </span>
                    </div>
                    <h3 className={clsx("font-bold text-base mt-2", rule.textColor)}>
                      {rule.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Classification of Primary Keys ───────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "400ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">🏷️</span>
              Types &amp; Classifications of Primary Keys
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Simple Key */}
              <div className="rounded-xl border border-blue-800/60 bg-gradient-to-b from-blue-950/40 to-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔢</span>
                    <h3 className="font-bold text-blue-300 text-base">Simple Primary Key</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    Constructed from a <strong>single column</strong> that independently guarantees row uniqueness.
                  </p>
                  <div className="rounded-lg bg-slate-950/80 p-2.5 font-mono text-xs text-blue-300 border border-blue-900/60">
                    <code>StudentID INT PRIMARY KEY</code>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <li>• Most common and simplest to query</li>
                    <li>• Minimal index storage footprint</li>
                    <li>• Simplifies JOIN operations across tables</li>
                  </ul>
                </div>
              </div>

              {/* Composite Key */}
              <div className="rounded-xl border border-purple-800/60 bg-gradient-to-b from-purple-950/40 to-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔗</span>
                    <h3 className="font-bold text-purple-300 text-base">Composite Key</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    Formed by combining <strong>two or more columns</strong> together to achieve distinct row identity.
                  </p>
                  <div className="rounded-lg bg-slate-950/80 p-2.5 font-mono text-xs text-purple-300 border border-purple-900/60">
                    <code>PRIMARY KEY (StudentID, CourseID)</code>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <li>• Essential for Junction/Bridge tables</li>
                    <li>• Enforces Many-to-Many associations</li>
                    <li>• Requires table-level constraint definition</li>
                  </ul>
                </div>
              </div>

              {/* Surrogate Key */}
              <div className="rounded-xl border border-emerald-800/60 bg-gradient-to-b from-emerald-950/40 to-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">📊</span>
                    <h3 className="font-bold text-emerald-300 text-base">Surrogate Key</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    An <strong>artificial, system-generated identifier</strong> having zero business meaning (e.g. Auto-Increment ID / UUID).
                  </p>
                  <div className="rounded-lg bg-slate-950/80 p-2.5 font-mono text-xs text-emerald-300 border border-emerald-900/60">
                    <code>ID INT AUTO_INCREMENT PRIMARY KEY</code>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <li>• Shielded from business requirement shifts</li>
                    <li>• Highly optimal for B-Tree indexing</li>
                    <li>• Industry standard for high-volume OLTP</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SQL Syntax & Implementation Playground ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "500ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">💻</span>
                  SQL Syntax &amp; Implementation Patterns
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Explore how primary keys are defined in MySQL standard DDL statements.
                </p>
              </div>

              <button
                onClick={() => copyCode(sqlSnippets[activeCodeTab])}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
              >
                <span>{copied ? "✓ Copied!" : "📋 Copy SQL"}</span>
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { id: "column", label: "Column-Level PK" },
                { id: "composite", label: "Composite PK (Table-Level)" },
                { id: "autoIncrement", label: "Surrogate (AUTO_INCREMENT)" },
                { id: "alter", label: "ALTER TABLE (Post-Creation)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCodeTab(tab.id)}
                  className={clsx(
                    "px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer",
                    activeCodeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Display */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-sky-200 leading-relaxed">
                <code>{sqlSnippets[activeCodeTab]}</code>
              </pre>
            </div>

            <div className="mt-4 p-3.5 rounded-lg bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                <strong>MySQL Engine Note:</strong> Defining a <code>PRIMARY KEY</code> in InnoDB automatically constructs the <strong>Clustered Index</strong>, arranging physical table data on disk by the primary key order.
              </span>
            </div>
          </div>
        </section>

        {/* ─── Real-World Case Study ────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "600ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-lg">🏢</span>
              Production Case Study: Barrackpore Public Library System
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Let us analyze how <strong>Swadeep</strong>, the head database administrator at the <strong>Barrackpore Central Public Library</strong>, structures relational keys to prevent lost records and duplicate checkouts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">TABLE 1: Books</div>
                <h4 className="font-bold text-white text-sm">Primary Key: BookID (INT)</h4>
                <p className="mt-2 text-xs text-slate-300">
                  Each physical catalog item is assigned a deterministic <code>BookID</code>. Even if 10 copies of the same title exist, each copy has a distinct primary key.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">TABLE 2: Members</div>
                <h4 className="font-bold text-white text-sm">Primary Key: MemberID (INT)</h4>
                <p className="mt-2 text-xs text-slate-300">
                  Each registered student (e.g., Tuhina or Abhronila) receives a unique <code>MemberID</code> independent of their contact number or name changes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">TABLE 3: ActiveLoans</div>
                <h4 className="font-bold text-white text-sm">Composite PK: (BookID, MemberID)</h4>
                <p className="mt-2 text-xs text-slate-300">
                  Prevents duplicate simultaneous checkouts: a specific member cannot borrow the exact same physical copy twice concurrently.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
              <h4 className="font-bold text-emerald-300 text-sm mb-1 flex items-center gap-2">
                <span>🛡️</span> Why Referential Integrity Relies on Primary Keys:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a loan record is inserted into <code>ActiveLoans</code>, foreign keys check that both <code>BookID</code> exists in <code>Books</code> and <code>MemberID</code> exists in <code>Members</code>. Without valid primary keys in parent tables, referential verification is impossible!
              </p>
            </div>
          </div>
        </section>

        {/* ─── Pedagogical Hint Section ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "650ms" }}
        >
          <div className="rounded-2xl border border-blue-900/60 bg-blue-950/30 p-6 sm:p-7 shadow-xl">
            <h3 className="text-lg font-bold text-blue-300 flex items-center gap-2 mb-3">
              <span>💭</span> Conceptual Thinking Triggers (Hint Section)
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">▸ Think about:</span>
                <span>Why is a student's email address risky to use as a primary key, even if every student currently has a unique email? (Consider email changes, students sharing a family email, or institutional email migrations).</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">▸ Observe carefully:</span>
                <span>In a composite key of <code>(StudentID, CourseID)</code>, can <code>StudentID</code> appear multiple times in the table? (Yes! As long as the combined pair with <code>CourseID</code> remains unique).</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">▸ Try changing this:</span>
                <span>Imagine a database with 10,000,000 records using a 64-character <code>VARCHAR</code> as the primary key vs a 4-byte <code>INT</code>. Calculate how much memory is saved in indexes alone!</span>
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks (Professional Level) ───────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "700ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-lg">💎</span>
              Professional Tips &amp; Senior Engineering Tricks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <h4 className="font-bold text-amber-300 mb-1">⚡ 1. Choose Sized Integer Types</h4>
                <p className="text-slate-300 leading-relaxed">
                  Use <code>INT</code> (up to 2.14 billion rows) or <code>BIGINT</code> (for massive telemetry/ledger scales) instead of string types. Integer comparisons require single CPU cycles and compress index nodes efficiently.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <h4 className="font-bold text-amber-300 mb-1">🔄 2. Surrogate Keys for Foreign References</h4>
                <p className="text-slate-300 leading-relaxed">
                  Even when a natural key exists (like Tax ID), create an internal <code>AUTO_INCREMENT</code> surrogate key as the primary key and mark the natural key as <code>UNIQUE NOT NULL</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <h4 className="font-bold text-amber-300 mb-1">🔍 3. Clustered Index Cache Locality</h4>
                <p className="text-slate-300 leading-relaxed">
                  Sequential auto-increment primary keys append new records to the end of index leaf pages, preventing costly B-Tree page splits and fragmentation in the InnoDB buffer pool.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <h4 className="font-bold text-amber-300 mb-1">🛡️ 4. Explicit Constraint Naming</h4>
                <p className="text-slate-300 leading-relaxed">
                  Always provide explicit constraint names (e.g. <code>CONSTRAINT PK_Students PRIMARY KEY (StudentID)</code>) to facilitate programmatic error parsing and future schema migrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Common Pitfalls & Beginner Mistakes ──────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "800ms" }}
        >
          <div className="rounded-2xl border border-rose-900/60 bg-rose-950/30 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-rose-300 flex items-center gap-3 mb-6">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 text-lg">⚠️</span>
              Common Pitfalls &amp; Beginner Mistakes
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-rose-900/50 bg-slate-950/70">
                <h4 className="font-bold text-rose-300 mb-1">❌ 1. Creating Tables Without Any Primary Key</h4>
                <p className="text-slate-300 leading-relaxed">
                  Without a primary key, tables can accumulate duplicate rows. Queries like <code>DELETE FROM Students WHERE Name = 'Swadeep'</code> will delete all matching rows indiscriminately because individual row identification is impossible.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-900/50 bg-slate-950/70">
                <h4 className="font-bold text-rose-300 mb-1">❌ 2. Attempting to Allow NULL in Primary Key Columns</h4>
                <p className="text-slate-300 leading-relaxed">
                  In SQL, <code>NULL</code> means undefined. If two rows have a <code>NULL</code> primary key, the relational model cannot determine if they are identical or different entities, totally breaking relational algebra.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-900/50 bg-slate-950/70">
                <h4 className="font-bold text-rose-300 mb-1">❌ 3. Changing Primary Key Values in Live Production</h4>
                <p className="text-slate-300 leading-relaxed">
                  Updating an existing primary key value cascades locks across every foreign key index in your database. If cascading isn't enabled, the operation errors out; if enabled, it can deadlock high-concurrency systems.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-900/50 bg-slate-950/70">
                <h4 className="font-bold text-rose-300 mb-1">❌ 4. Using Overly Wide Strings as Keys</h4>
                <p className="text-slate-300 leading-relaxed">
                  Using <code>VARCHAR(255)</code> or random strings as primary keys drastically inflates every secondary index on the table, because every secondary index in MySQL stores a copy of the primary key in its leaf nodes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Classroom Mini-Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "900ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">✅</span>
              Student Mastery Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Review these key checkpoints before proceeding to Topic 19 (Candidate Keys):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
              {[
                "I can state the exact formal definition of a Primary Key.",
                "I understand why a Primary Key column can never accept NULL.",
                "I can write DDL for Column-level and Table-level Primary Keys in MySQL.",
                "I know the difference between Simple, Composite, and Surrogate keys.",
                "I know how InnoDB uses the Primary Key to construct the Clustered Index.",
                "I can explain why natural keys (like email) are often replaced with surrogate IDs.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/60"
                >
                  <span className="text-emerald-400 font-bold">☑</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Practice FAQ Interactive Section ─────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "1000ms" }}
        >
          <FAQTemplate
            title="Primary Key Concept – Comprehensive Practice Questions"
            questions={questions}
            subtitle="Master key interview questions, relational algebra rules, and SQL constraint scenarios"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── Plain Text Printable Study Note ──────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "1100ms" }}
        >
          <PlainTextPrint
            content={noteText}
            title="Primary Key Concept Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic18_note.txt"
          />
        </section>

        {/* ─── Teacher's Master Guidance Note ───────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12"
          style={{ animationDelay: "1200ms" }}
        >
          <Teacher
            note={
              "The primary key is the single most important concept in relational " +
              "database design. I tell my students: 'If you get the primary key " +
              "right, everything else in your schema falls gracefully into place.' " +
              "The rules — uniqueness, NOT NULL, immutability — are not arbitrary; " +
              "they mathematically guarantee entity integrity. When designing a new " +
              "table, default to an AUTO_INCREMENT surrogate key for stability and performance. " +
              "A primary key is not just a column for the database engine — it is how you and " +
              "your application deterministically communicate with your data!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────── */}
        <footer className="mt-14 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
          <p>
            RDBMS &amp; MySQL Masterclass · Topic 18: Primary Key Concept · Designed with ❤️ for deep classroom learning
          </p>
        </footer>
      </div>
    </>
  );
};

export default Topic18;