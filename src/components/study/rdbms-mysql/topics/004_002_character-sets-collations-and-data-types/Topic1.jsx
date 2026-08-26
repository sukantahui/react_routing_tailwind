import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Understanding Collations: _ci (Case Insensitive), _cs (Case Sensitive), _bin (Binary)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive collation workbench: analyzing the mathematical rules governing string equality, case sensitivity (_ci vs _cs), binary byte matching (_bin), accent sensitivity (_ai vs _as), UNIQUE index collision constraints, and resolving Error 1267 illegal mix of collations in MySQL.
 */
const Topic1 = () => {
  // Interactive Collation State
  const [selectedCollationPhase, setSelectedCollationPhase] = useState("phase1_suffix_rules");

  const collationPhases = {
    phase1_suffix_rules: {
      phaseNumber: "Phase 1: Suffix Naming Rules",
      title: "1. Collation Suffix Rules: _ci, _cs, _bin, _ai, and _as",
      badge: "Collation Suffixes",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔤 COMPARING STRINGS ACROSS DIFFERENT COLLATIONS:
-- 1. Case-Insensitive (_ci) Comparison:
SELECT 'Barrackpore' = 'BARRACKPORE' COLLATE utf8mb4_0900_ai_ci AS is_equal;
-- Result: 1 (TRUE) &rarr; Case is ignored!

-- 2. Case-Sensitive (_cs) Comparison:
SELECT 'Barrackpore' = 'BARRACKPORE' COLLATE utf8mb4_0900_as_cs AS is_equal;
-- Result: 0 (FALSE) -&gt; Case is distinguished!

-- 3. Binary Byte (_bin) Comparison:
SELECT 'Barrackpore' = 'BARRACKPORE' COLLATE utf8mb4_bin AS is_equal;
-- Result: 0 (FALSE) -> Raw ASCII byte values mismatch ('B'=0x42 vs 'b'=0x62)

-- 4. Accent-Insensitive (_ai) Comparison:
SELECT 'café' = 'cafe' COLLATE utf8mb4_0900_ai_ci AS is_equal;
-- Result: 1 (TRUE) -> Accents are treated as identical!`,
      metricsTable: [
        { suffix: "_ci", meaning: "Case Insensitive", behavior: "'apple' = 'APPLE' (Evaluates TRUE)" },
        { suffix: "_cs", meaning: "Case Sensitive", behavior: "'apple' != 'APPLE' (Evaluates FALSE)" },
        { suffix: "_bin", meaning: "Binary (Raw Bytes)", behavior: "Compares exact byte values (Fastest CPU speed) ⚡" },
        { suffix: "_ai", meaning: "Accent Insensitive", behavior: "'café' = 'cafe' (Evaluates TRUE)" }
      ],
      explanation:
        "Collations govern string equality, sorting, and indexing. `_ci` ignores case for friendly searches, `_cs` distinguishes casing, `_ai` ignores accents, and `_bin` performs lightning-fast byte-by-byte comparisons in CPU memory."
    },
    phase2_unique_collisions: {
      phaseNumber: "Phase 2: UNIQUE Index Collisions",
      title: "2. UNIQUE Constraints & Duplicate Key Collisions (Error 1062)",
      badge: "Unique Constraint Risk",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ UNIQUE CONSTRAINT COLLISION UNDER _CI COLLATION:
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    admission_code VARCHAR(20) COLLATE utf8mb4_0900_ai_ci NOT NULL,
    UNIQUE INDEX uq_code (admission_code)
);

-- Insert 1: Standard uppercase code:
INSERT INTO students (admission_code) VALUES ('BKP-2026-A'); -- Success ✅

-- Insert 2: Same code in lowercase:
INSERT INTO students (admission_code) VALUES ('bkp-2026-a'); 
-- ❌ FAILS WITH ERROR 1062:
-- Duplicate entry 'bkp-2026-a' for key 'students.uq_code'

-- Under _ci, 'BKP-2026-A' and 'bkp-2026-a' are considered identical duplicates!`,
      metricsTable: [
        { metric: "Error Code", value: "1062 (23000)", role: "Duplicate entry for UNIQUE key" },
        { metric: "Root Cause", value: "Collation Equality", role: "_ci treats case variations as identical values" },
        { metric: "Email Fields", value: "Desirable Behavior", role: "Prevents duplicate accounts with differing casing" },
        { metric: "Case-Sensitive IDs", value: "Use utf8mb4_bin", role: "Allows case-sensitive tokens / YouTube-like video IDs" }
      ],
      explanation:
        "Because `UNIQUE` constraints enforce uniqueness using the column's collation, a `_ci` column rejects inserts that differ only in casing. For case-sensitive identifiers (like promo codes or YouTube IDs), use `utf8mb4_bin`."
    },
    phase3_dynamic_overrides: {
      phaseNumber: "Phase 3: Dynamic Overrides",
      title: "3. Dynamic Query Overrides & Resolving Error 1267",
      badge: "Query Tuning",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛠️ RESOLVING ERROR 1267: ILLEGAL MIX OF COLLATIONS:
-- Scenario: Joining two tables with mismatched collations:
-- Table A: utf8mb4_0900_ai_ci | Table B: latin1_swedish_ci

-- Query fails with: Error 1267 (HY000): Illegal mix of collations

-- FIX: Explicitly harmonize collations using the COLLATE clause:
SELECT o.order_id, c.customer_name 
FROM customer_orders o
JOIN legacy_accounts c 
  ON o.customer_code = c.customer_code COLLATE utf8mb4_0900_ai_ci;

-- DYNAMIC CASE-SENSITIVE LOOKUP:
-- Force case-sensitive lookup on a _ci column:
SELECT * FROM admin_users 
WHERE username COLLATE utf8mb4_bin = 'SuperAdmin';`,
      metricsTable: [
        { clause: "COLLATE in WHERE", syntax: "WHERE col COLLATE utf8mb4_bin = 'val'", role: "Forces case-sensitive lookup on the fly" },
        { clause: "COLLATE in JOIN", syntax: "ON a.id = b.id COLLATE utf8mb4_...", role: "Resolves Error 1267 collation mismatch" },
        { clause: "COLLATE in ORDER BY", syntax: "ORDER BY name COLLATE utf8mb4_bin", role: "Forces binary ASCII sorting (A-Z then a-z)" },
        { clause: "Function Inspection", syntax: "SELECT COLLATION(col)", role: "Inspects expression collation at runtime" }
      ],
      explanation:
        "You can dynamically override a column's collation in any SQL expression using `COLLATE`. This resolves Error 1267 collation conflicts in joins and allows on-the-fly case-sensitive searches without altering table schemas."
    },
    phase4_security_tokens: {
      phaseNumber: "Phase 4: Security & Tokens",
      title: "4. Security Pitfalls: API Tokens, Passwords & Binary Collations",
      badge: "Security Best Practice",
      badgeColor: "amber",
      sqlSnippet: `-- 🔒 SECURING TOKENS, PASSWORDS & HASHES:
-- ⚠️ DANGEROUS PATTERN (Case-Insensitive Token Lookup):
CREATE TABLE api_keys_insecure (
    api_key VARCHAR(64) COLLATE utf8mb4_0900_ai_ci NOT NULL
);
-- Query: SELECT * FROM api_keys_insecure WHERE api_key = 'aB3X9z';
-- Matches 'ab3x9z' or 'AB3X9Z' -> Security authentication vulnerability! ❌

-- ✅ SECURE PATTERN (Binary Case-Sensitive Collation):
CREATE TABLE api_keys_secure (
    id INT PRIMARY KEY AUTO_INCREMENT,
    api_key VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    password_hash CHAR(60) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    INDEX idx_key (api_key)
);
-- Matches ONLY the exact binary case! ✅`,
      metricsTable: [
        { securityArea: "API Keys & Tokens", recommendedCollation: "utf8mb4_bin", role: "Enforces strict case-sensitive authentication" },
        { securityArea: "Password Hashes (bcrypt)", recommendedCollation: "ascii_bin", role: "Guarantees exact 60-byte hash matching" },
        { securityArea: "Email Addresses", recommendedCollation: "utf8mb4_0900_ai_ci", role: "Prevents case-variant duplicate accounts" },
        { securityArea: "Search Query Text", recommendedCollation: "utf8mb4_0900_ai_ci", role: "Delivers natural case-insensitive user search" }
      ],
      explanation:
        "Never store cryptographic hashes, API keys, or session tokens in `_ci` columns. Use `utf8mb4_bin` or `ascii_bin` to enforce strict case sensitivity and eliminate authentication bypass vulnerabilities."
    }
  };

  const navItems = [
    { id: "collation-overview", label: "1. Collation Overview" },
    { id: "matrix-diagram", label: "2. Comparison Matrix Diagram" },
    { id: "interactive-workbench", label: "3. Collation Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Collation Audit Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 1 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              String Comparison Rules
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Understanding Collations: _ci (Case Insensitive), _cs (Case Sensitive), _bin (Binary)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the rules governing string equality, sorting, and indexing in MySQL: explore case sensitivity (<code className="text-cyan-400 font-mono">_ci</code> vs <code className="text-emerald-400 font-mono">_cs</code>), binary comparisons (<code className="text-amber-400 font-mono">_bin</code>), <code className="text-rose-400 font-mono">UNIQUE</code> constraint collisions, and resolving Error 1267 join conflicts.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Collation Overview */}
        <section id="collation-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Collation Suffixes &amp; Comparison Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How collations define the mathematical comparison, sorting, and uniqueness rules of strings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">1. _ci Suffix</span>
              <h3 className="font-bold text-white">Case Insensitive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `'apple' = 'APPLE'` &rarr; Ideal for user search bars, names, and emails.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">2. _cs Suffix</span>
              <h3 className="font-bold text-white">Case Sensitive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `'apple' != 'APPLE'` &rarr; Distinguishes uppercase and lowercase casing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. _bin Suffix</span>
              <h3 className="font-bold text-white">Binary Byte Match</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compares raw byte codes directly in CPU RAM. Mandatory for API keys &amp; tokens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. _ai / _as</span>
              <h3 className="font-bold text-white">Accent Sensitivity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `_ai` treats `'café' = 'cafe'`; `_as` distinguishes accented glyphs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Matrix Diagram */}
        <section id="matrix-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Collation Comparison &amp; Sorting Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing equality evaluations across different collation flags for identical input strings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 1.1: String Equality Matrix Across Collations
              </h3>
              <span className="text-xs text-slate-400 font-mono">Evaluation Logic</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Column 1: _ci */}
                <rect x="20" y="40" width="210" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="125" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  _ci (CASE INSENSITIVE)
                </text>
                <line x1="20" y1="85" x2="230" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="180" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">'Admin' = 'admin'</text>
                <text x="45" y="140" fill="#34d399" fontSize="9">Result: TRUE (Equal) ✅</text>

                <rect x="35" y="165" width="180" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">'café' = 'cafe' (_ai_ci)</text>
                <text x="45" y="200" fill="#34d399" fontSize="9">Result: TRUE (Equal) ✅</text>

                <rect x="35" y="225" width="180" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="245" fill="#fca5a5" fontSize="10" fontWeight="bold">UNIQUE Index Insert:</text>
                <text x="45" y="260" fill="#f87171" fontSize="9">Duplicate Key Collision! ❌</text>

                {/* Column 2: _cs */}
                <rect x="255" y="40" width="210" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="360" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  _cs (CASE SENSITIVE)
                </text>
                <line x1="255" y1="85" x2="465" y2="85" stroke="#334155" />

                <rect x="270" y="105" width="180" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="280" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">'Admin' = 'admin'</text>
                <text x="280" y="140" fill="#f87171" fontSize="9">Result: FALSE (Distinct) ❌</text>

                <rect x="270" y="165" width="180" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="280" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">'Admin' = 'Admin'</text>
                <text x="280" y="200" fill="#34d399" fontSize="9">Result: TRUE (Exact Case) ✅</text>

                <rect x="270" y="225" width="180" height="55" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="280" y="245" fill="#a7f3d0" fontSize="10" fontWeight="bold">UNIQUE Index Insert:</text>
                <text x="280" y="260" fill="#34d399" fontSize="9">Both can co-exist safely! ✅</text>

                {/* Column 3: _bin */}
                <rect x="490" y="40" width="210" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="595" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  _bin (BINARY BYTES)
                </text>
                <line x1="490" y1="85" x2="700" y2="85" stroke="#334155" />

                <rect x="505" y="105" width="180" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="515" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">'Token' = 'token'</text>
                <text x="515" y="140" fill="#f87171" fontSize="9">Result: FALSE (Byte mismatch)</text>

                <rect x="505" y="165" width="180" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="515" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">Raw memcmp in CPU</text>
                <text x="515" y="200" fill="#34d399" fontSize="9">Fastest execution speed ⚡</text>

                <rect x="505" y="225" width="180" height="55" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="515" y="245" fill="#34d399" fontSize="10" fontWeight="bold">Ideal For:</text>
                <text x="515" y="260" fill="#bae6fd" fontSize="9">API Keys, Tokens, Hashes 🔒</text>

                {/* Column 4: Error 1267 Fix */}
                <rect x="725" y="40" width="205" height="280" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <text x="827" y="70" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ERROR 1267 RESOLUTION
                </text>
                <line x1="725" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="735" y="105" width="185" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="745" y="125" fill="#fca5a5" fontSize="9" fontWeight="bold">JOIN with different collations:</text>
                <text x="745" y="145" fill="#f87171" fontSize="9">Illegal mix of collations ❌</text>

                <rect x="735" y="175" width="185" height="105" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="745" y="195" fill="#a7f3d0" fontSize="9" fontWeight="bold">The Fix: Add COLLATE:</text>
                <text x="745" y="215" fill="#bae6fd" fontSize="8">ON a.code = b.code</text>
                <text x="745" y="230" fill="#34d399" fontSize="8">COLLATE utf8mb4_0900_ai_ci</text>
                <text x="745" y="255" fill="#34d399" fontSize="9" fontWeight="bold">Joins execute cleanly! ✅</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Collation Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Collation Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a collation phase to inspect equality evaluations, UNIQUE index collisions, and dynamic override scripts.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(collationPhases).map((key) => {
              const ph = collationPhases[key];
              const isSelected = selectedCollationPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCollationPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {collationPhases[selectedCollationPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  collationPhases[selectedCollationPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  collationPhases[selectedCollationPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  collationPhases[selectedCollationPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  collationPhases[selectedCollationPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {collationPhases[selectedCollationPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Collation Inspection &amp; Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {collationPhases[selectedCollationPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Collation Behavior &amp; Rules:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Feature / Suffix</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Behavioral Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {collationPhases[selectedCollationPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.suffix || row.metric || row.clause || row.securityArea}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.meaning || row.value || row.syntax || row.recommendedCollation}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.behavior || row.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {collationPhases[selectedCollationPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Collation Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing duplicate account registrations and resolving join collation conflicts in West Bengal portals.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Duplicate Email Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Duplicate Account Registrations in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Duplicates Prevented
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a legacy student portal used a `_bin` collation on the `email` column, allowing two users to register with `susmita@gmail.com` and `Susmita@gmail.com`. Changing the column collation to `utf8mb4_0900_ai_ci` enforced case-insensitive uniqueness, permanently preventing duplicate email registrations.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Error 1267 Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Resolving Error 1267 Collation Conflict in Kolkata Billing
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Join Conflict Fixed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, joining a newly created `utf8mb4_0900_ai_ci` orders table with a legacy `latin1_swedish_ci` customer table threw Error 1267 during invoice generation. Adding `COLLATE utf8mb4_0900_ai_ci` to the `ON` condition allowed the billing report to run instantly while a scheduled migration script converted the legacy table.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid security flaws and query performance degradations caused by improper collations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Storing API Tokens in _ci Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing case-sensitive tokens or password hashes in `_ci` columns allows case-insensitive authentication matches, creating a serious security loophole.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use utf8mb4_bin or ascii_bin for tokens and hashes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using BINARY keyword in WHERE Clauses
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing `WHERE BINARY username = 'admin'` casts the column to a binary string, which disables index seeks and triggers full table scans!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Define the column with utf8mb4_bin directly so indexes remain sargable.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use utf8mb4_0900_ai_ci for User Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `utf8mb4_0900_ai_ci` for user names, emails, addresses, and comments to provide natural, human-friendly search and sorting.
              </p>
              <div className="text-xs text-slate-400">
                Standard Unicode 9.0 linguistic sorting algorithm.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Harmonize Collation on Schema Setup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set `collation-server = utf8mb4_0900_ai_ci` in `my.cnf` so all newly created databases, tables, and columns inherit consistent collations.
              </p>
              <div className="text-xs text-slate-400">
                Prevents Error 1267 join conflicts across schemas.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Collation Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Collation Audit Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key collation parameters to verify across production database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Collation Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">User Strings</strong> = Configure `utf8mb4_0900_ai_ci` for names, titles, and text.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Tokens &amp; Hashes</strong> = Configure `utf8mb4_bin` or `ascii_bin` for API tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Join Compatibility</strong> = Verify joining foreign key columns share identical collations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">UNIQUE Email</strong> = Ensure email columns use `_ci` to prevent casing duplicates.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe utf8mb4_bin in CPU Benchmarks...”</span>
                  `utf8mb4_bin` is up to 3x faster than `utf8mb4_0900_ai_ci` for exact string joins because it uses raw memory byte comparisons (`memcmp`) rather than calculating multi-weight Unicode sorting tables!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about COLLATE in Ad-Hoc Queries...”</span>
                  When writing administrative reports that require exact case matching on a `_ci` column, just add `COLLATE utf8mb4_bin` to your query!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering MySQL Collations (_ci, _cs, _bin).
            </p>
          </div>

          <FAQTemplate
            title="MySQL Collations (_ci, _cs, _bin) FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Understanding Collations: _ci (Case Insensitive), _cs (Case Sensitive), _bin (Binary)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Many developers mistakenly think that setting the character set to utf8mb4 is enough, but collations are just as vital! The collation determines whether 'Admin' equals 'admin', whether your UNIQUE index rejects duplicate email variations, and whether your JOIN queries fail with Error 1267. Always remember: use _ci (like utf8mb4_0900_ai_ci) for natural, human-friendly user text and emails, but use _bin (like utf8mb4_bin or ascii_bin) for security tokens, passwords, and cryptographic hashes!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
