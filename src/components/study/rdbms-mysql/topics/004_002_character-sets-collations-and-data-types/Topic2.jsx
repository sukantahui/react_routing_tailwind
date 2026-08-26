import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Why utf8mb4_0900_ai_ci is the Recommended Default in MySQL 8.0+
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive collation workbench: analyzing why utf8mb4_0900_ai_ci is the gold standard default in MySQL 8.0, comparing Unicode 9.0 accuracy against legacy general_ci, exploring NO-PAD trailing whitespace security, and evaluating multi-lingual sorting across Indic and international scripts.
 */
const Topic2 = () => {
  // Interactive Collation State
  const [selected0900Phase, setSelected0900Phase] = useState("phase1_anatomy");

  const collation0900Phases = {
    phase1_anatomy: {
      phaseNumber: "Phase 1: Collation Anatomy",
      title: "1. The Anatomy of utf8mb4_0900_ai_ci",
      badge: "Unicode 9.0 Standard",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔬 BREAKING DOWN THE 0900_AI_CI IDENTIFIER:
-- 1. utf8mb4 : Full 4-Byte UTF-8 (100% Unicode + Emojis)
-- 2. 0900    : Unicode Collation Algorithm (UCA) 9.0.0 Standards
-- 3. _ai     : Accent Insensitive ('café' = 'cafe' &rarr; TRUE)
-- 4. _ci     : Case Insensitive ('Kolkata' = 'kolkata' -&gt; TRUE)

-- Verifying Collation Properties in Information Schema:
SELECT 
    COLLATION_NAME, 
    CHARACTER_SET_NAME, 
    IS_DEFAULT, 
    PAD_ATTRIBUTE
FROM information_schema.collations
WHERE COLLATION_NAME = 'utf8mb4_0900_ai_ci';`,
      metricsTable: [
        { component: "utf8mb4", value: "4-Byte Storage", role: "Enables all languages and emojis without Error 1366" },
        { component: "0900", value: "Unicode 9.0.0", role: "Provides modern international linguistic sorting rules" },
        { component: "_ai", value: "Accent Insensitive", role: "Matches accented and plain characters interchangeably" },
        { component: "_ci", value: "Case Insensitive", role: "Matches uppercase and lowercase letters interchangeably" }
      ],
      explanation:
        "`utf8mb4_0900_ai_ci` is the flagship default collation in MySQL 8.0. It incorporates the Unicode 9.0.0 standard, providing true linguistic sorting and natural accent-and-case-insensitive querying for global applications."
    },
    phase2_accuracy_benchmark: {
      phaseNumber: "Phase 2: Accuracy Benchmark",
      title: "2. Linguistic Accuracy: 0900_ai_ci vs general_ci vs unicode_ci",
      badge: "Linguistic Precision",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚖️ COMPARING COLLATION SORTING & ACCURACY:
-- Test A: German Eszett (ß) Expansion:
-- In German, 'ß' equals 'ss' (e.g. Straße = Strasse)
SELECT 'Straße' = 'Strasse' COLLATE utf8mb4_0900_ai_ci AS uca_0900; -- 1 (TRUE) ✅
SELECT 'Straße' = 'Strasse' COLLATE utf8mb4_general_ci AS legacy_gen; -- 0 (FALSE) ❌ (Broken!)

-- Test B: Latin Ligature (æ):
SELECT 'encyclopædia' = 'encyclopaedia' COLLATE utf8mb4_0900_ai_ci AS ligature_0900; -- 1 (TRUE) ✅
SELECT 'encyclopædia' = 'encyclopaedia' COLLATE utf8mb4_general_ci AS ligature_gen;  -- 0 (FALSE) ❌

-- PERFORMANCE GAIN:
-- 0900_ai_ci uses compressed weight tables and CPU vectorization,
-- executing up to 2x faster than older utf8mb4_unicode_ci!`,
      metricsTable: [
        { collation: "utf8mb4_0900_ai_ci", accuracy: "100% Unicode 9.0", speed: "Ultra-Fast (SIMD Optimized) ⚡" },
        { collation: "utf8mb4_unicode_ci", accuracy: "Accurate (Unicode 5.2)", speed: "Slower (Legacy weight tables)" },
        { collation: "utf8mb4_general_ci", accuracy: "Inaccurate (Naive shortcuts)", speed: "Fast on 1990s CPUs, but obsolete ❌" },
        { collation: "utf8mb4_bin", accuracy: "Exact Byte Matching", speed: "Fastest possible (memcmp) 🔒" }
      ],
      explanation:
        "Unlike `utf8mb4_general_ci` which used naive shortcuts, `0900_ai_ci` correctly expands ligatures (like `ß` to `ss`) while using modern SIMD CPU optimizations to run up to 2x faster than older Unicode 5.2 collations."
    },
    phase3_no_pad_security: {
      phaseNumber: "Phase 3: NO-PAD Security",
      title: "3. NO-PAD Trailing Space Security Revolution",
      badge: "Security Feature",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ THE NO-PAD BEHAVIORAL SHIFT IN MYSQL 8.0:
-- In Legacy Collations (PAD SPACE):
-- Trailing spaces were IGNORED during comparisons!
SELECT 'admin' = 'admin   ' COLLATE utf8mb4_general_ci AS pad_space_result;
-- Result: 1 (TRUE)! (Dangerous: 'admin ' matches 'admin'!) ⚠️

-- In Modern 0900 Series Collations (NO PAD):
-- Trailing spaces are SIGNIFICANT and DISTINGUISHED!
SELECT 'admin' = 'admin   ' COLLATE utf8mb4_0900_ai_ci AS no_pad_result;
-- Result: 0 (FALSE)! (Secure: Distinct usernames!) ✅

-- SECURITY IMPACT:
-- Prevents attackers from registering 'admin ' to impersonate the administrator!`,
      metricsTable: [
        { padAttribute: "PAD SPACE (Legacy)", behavior: "'admin' = 'admin ' (TRUE)", risk: "Vulnerable to username impersonation ⚠️" },
        { padAttribute: "NO PAD (0900 Series)", behavior: "'admin' = 'admin ' (FALSE)", risk: "Completely Secure by Default ✅" },
        { padAttribute: "Inspection Query", behavior: "information_schema.collations", risk: "Verify PAD_ATTRIBUTE column" },
        { padAttribute: "Migration Note", behavior: "TRIM() user input", risk: "Sanitize form inputs before insertion" }
      ],
      explanation:
        "Legacy collations used `PAD SPACE` (ignoring trailing whitespace). All modern `0900` series collations use `NO PAD`, treating trailing whitespace as significant. This eliminates username impersonation and authorization bypass security risks."
    },
    phase4_multilingual_sorting: {
      phaseNumber: "Phase 4: Multilingual Sorting",
      title: "4. Multilingual & Indic Script (Bengali / Hindi) Sorting",
      badge: "Internationalization",
      badgeColor: "amber",
      sqlSnippet: `-- 🌏 MULTI-SCRIPT & INDIC SORTING WITH UTF8MB4_0900_AI_CI:
CREATE TABLE student_directory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) COLLATE utf8mb4_0900_ai_ci NOT NULL
);

-- Inserting Bengali, Hindi, and English names:
INSERT INTO student_directory (student_name) VALUES 
('মমতা বন্দ্যোপাধ্যায়'),
('সুস্মিতা রায়'),
('अभ्रनीला दास'),
('Debangshu Roy');

-- Order By sorts according to Unicode Varnamala & Latin rules:
SELECT * FROM student_directory ORDER BY student_name ASC;
-- Evaluates multi-script character sequences with 100% linguistic fidelity! ✅`,
      metricsTable: [
        { script: "Latin (English / European)", sortingStandard: "A-Z Case/Accent Insensitive", support: "Full Unicode 9.0 Rules" },
        { script: "Bengali (বাংলা)", sortingStandard: "Varnamala Consonant/Vowel Order", support: "Native Multi-Byte Sorting" },
        { script: "Devanagari (हिन्दी)", sortingStandard: "Standard Indic Alphabetic Order", support: "Native Multi-Byte Sorting" },
        { script: "Emojis (😀, 🚀)", sortingStandard: "Unicode Conceptual Categories", support: "Native Emoji Grouping" }
      ],
      explanation:
        "`utf8mb4_0900_ai_ci` correctly sorts multilingual datasets, applying native dictionary ordering to Indic scripts (Bengali, Hindi) alongside Latin alphabets and emojis in a single, unified database column."
    }
  };

  const navItems = [
    { id: "anatomy-overview", label: "1. Collation Anatomy" },
    { id: "evolution-diagram", label: "2. Evolution Timeline" },
    { id: "interactive-workbench", label: "3. 0900 Collation Workbench" },
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
            <span>Topic 2 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              MySQL 8.0 Standard Collation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why utf8mb4_0900_ai_ci is the Recommended Default in MySQL 8.0+
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand why <code className="text-cyan-400 font-mono">utf8mb4_0900_ai_ci</code> is the universal default in MySQL 8.0+: explore Unicode 9.0 linguistic sorting precision, SIMD CPU performance gains over older collations, <code className="text-emerald-400 font-mono">NO PAD</code> trailing whitespace security, and native multi-script support.
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
        {/* SECTION 1: Anatomy Overview */}
        <section id="anatomy-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4 Components of utf8mb4_0900_ai_ci
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why this specific combination represents the pinnacle of database string comparison.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">1. utf8mb4</span>
              <h3 className="font-bold text-white">Full 4-Byte UTF-8</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stores all international languages, Indian scripts, and emojis with zero errors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">2. 0900</span>
              <h3 className="font-bold text-white">Unicode 9.0 Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on Unicode Collation Algorithm (UCA) 9.0 weight tables for accurate sorting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. _ai</span>
              <h3 className="font-bold text-white">Accent Insensitive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Matches `'café' = 'cafe'` naturally across international search queries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. _ci</span>
              <h3 className="font-bold text-white">Case Insensitive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Matches `'Kolkata' = 'kolkata'` to provide human-friendly search indexing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Evolution Diagram */}
        <section id="evolution-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Collation Evolution &amp; NO-PAD Security
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing linguistic correctness, CPU throughput, and trailing whitespace handling across generations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 2.1: MySQL Collation Evolution &amp; NO-PAD Security Comparison
              </h3>
              <span className="text-xs text-slate-400 font-mono">Collation Engine Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Generation 1: general_ci */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="160" y="70" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. utf8mb4_general_ci (LEGACY)
                </text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="250" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">Accuracy: Naive Shortcuts ❌</text>
                <text x="45" y="140" fill="#94a3b8" fontSize="9">Fails on German 'ß' &amp; Ligatures</text>

                <rect x="35" y="165" width="250" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="185" fill="#fca5a5" fontSize="10" fontWeight="bold">Padding: PAD SPACE ⚠️</text>
                <text x="45" y="200" fill="#94a3b8" fontSize="9">'admin' = 'admin   ' (TRUE) - Impersonation!</text>

                <rect x="35" y="225" width="250" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="245" fill="#94a3b8" fontSize="10" fontWeight="bold">Status: Obsolete in MySQL 8.0</text>

                {/* Generation 2: unicode_ci */}
                <rect x="335" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. utf8mb4_unicode_ci (UCA 5.2)
                </text>
                <line x1="335" y1="85" x2="615" y2="85" stroke="#334155" />

                <rect x="350" y="105" width="250" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="360" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Accuracy: Linguistically Correct ✅</text>
                <text x="360" y="140" fill="#94a3b8" fontSize="9">Follows Unicode 5.2 UCA rules</text>

                <rect x="350" y="165" width="250" height="45" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="360" y="185" fill="#fde68a" fontSize="10" fontWeight="bold">Performance: Slower ⏳</text>
                <text x="360" y="200" fill="#94a3b8" fontSize="9">Heavy uncompressed weight tables</text>

                <rect x="350" y="225" width="250" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="360" y="245" fill="#fca5a5" fontSize="10" fontWeight="bold">Padding: PAD SPACE ⚠️</text>

                {/* Generation 3: 0900_ai_ci */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="790" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. utf8mb4_0900_ai_ci (UCA 9.0)
                </text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="665" y="105" width="250" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="675" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Accuracy: 100% Unicode 9.0 ✅</text>
                <text x="675" y="140" fill="#34d399" fontSize="9">Ligatures &amp; Indic Scripts Supported</text>

                <rect x="665" y="165" width="250" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="675" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">Performance: 2x Faster! ⚡</text>
                <text x="675" y="200" fill="#34d399" fontSize="9">SIMD Vectorization &amp; Compact Weights</text>

                <rect x="665" y="225" width="250" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="675" y="245" fill="#34d399" fontSize="10" fontWeight="bold">Padding: NO PAD (100% Secure) 🔒</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: 0900 Collation Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive 0900 Collation Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a 0900 collation phase to inspect linguistic expansions, NO-PAD security tests, and multilingual benchmarks.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(collation0900Phases).map((key) => {
              const ph = collation0900Phases[key];
              const isSelected = selected0900Phase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected0900Phase(key)}
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
                      ph.badgeColor === "rose" && "bg-rose-400",
                      ph.badgeColor === "amber" && "bg-amber-400"
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
                {collation0900Phases[selected0900Phase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  collation0900Phases[selected0900Phase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  collation0900Phases[selected0900Phase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  collation0900Phases[selected0900Phase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  collation0900Phases[selected0900Phase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {collation0900Phases[selected0900Phase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Unicode 9.0 Test &amp; Benchmark Queries:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {collation0900Phases[selected0900Phase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Collation Characteristics &amp; Properties:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Evaluation Property</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Linguistic / Security Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {collation0900Phases[selected0900Phase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.component || row.collation || row.padAttribute || row.script}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.value || row.accuracy || row.behavior || row.sortingStandard}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.role || row.speed || row.risk || row.support}
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
                {collation0900Phases[selected0900Phase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Unicode 9.0 Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminating trailing space authentication bugs and sorting multilingual directories in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's NO-PAD Impersonation Prevention */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Trailing-Space Username Impersonation in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Impersonation Blocked
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a security audit revealed that an old `utf8mb4_general_ci` users table allowed an attacker to register `admin ` (with a trailing space) and log in due to legacy `PAD SPACE` equality. Migrating to `utf8mb4_0900_ai_ci` activated modern `NO PAD` semantics, treating trailing spaces as distinct and blocking the impersonation vulnerability completely.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Multi-Script Sorting */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – High-Speed Multilingual Student Directory in Kolkata University
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Multi-Script Precision
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, sorting 500,000 university admission records containing mixed Bengali, Hindi, and English student names previously suffered from broken alphabetical sequencing and slow query times under older collations. Standardizing on `utf8mb4_0900_ai_ci` provided 100% accurate Varnamala alphabetical sorting while executing `ORDER BY` queries in 24ms thanks to SIMD CPU optimizations.
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
              Avoid dangerous collation legacy traps during database upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Retaining utf8mb4_general_ci on MySQL 8.0
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Carrying over legacy `general_ci` collations on modern MySQL 8.0 provides zero speed advantage and produces linguistically broken search and sort results.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Convert all legacy schemas to utf8mb4_0900_ai_ci.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unsanitized Trailing Whitespace Inputs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Under `NO PAD` collations, accidental trailing whitespace in user input forms (`'kolkata '`) will NOT match `'kolkata'`, causing failed searches.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always TRIM() string inputs before database insertion.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Default to utf8mb4_0900_ai_ci
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Standardize all new database instances, tables, and schemas on `utf8mb4_0900_ai_ci` for modern Unicode 9.0 compliance.
              </p>
              <div className="text-xs text-slate-400">
                The official standard for modern enterprise applications.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use _as_cs for Strict Sorting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When an application requires strict distinction of both accents and casing, use `utf8mb4_0900_as_cs`.
              </p>
              <div className="text-xs text-slate-400">
                Provides maximum sorting precision in Unicode 9.0.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Collation Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA 0900 Collation Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key parameters to verify when standardizing database collations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> 0900 Standard Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Server Default</strong> = Set `collation-server = utf8mb4_0900_ai_ci`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">NO PAD Verified</strong> = Check `PAD_ATTRIBUTE = 'NO PAD'` in Catalog.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Input Sanitization</strong> = Ensure frontend/backend trims trailing whitespace.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Legacy Converted</strong> = Re-encode older `general_ci` tables to `0900_ai_ci`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe NO PAD in Production Migrations...”</span>
                  If you migrate a table from MySQL 5.7 to MySQL 8.0, remember that `'user'` and `'user '` were equal in 5.7, but are distinct in 8.0! Always audit duplicate accounts with trailing spaces before migration!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about 0900 Performance...”</span>
                  MySQL 8.0's 0900 engine uses CPU SIMD vectorization to compare multiple character weights simultaneously in hardware. That is why 0900 is both the most accurate AND one of the fastest collations in database history!
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
              Comprehensive reference questions covering utf8mb4_0900_ai_ci and Unicode 9.0.
            </p>
          </div>

          <FAQTemplate
            title="utf8mb4_0900_ai_ci Collation FAQs"
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
            title="Why utf8mb4_0900_ai_ci is the Recommended Default in MySQL 8.0+"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="The transition to utf8mb4_0900_ai_ci in MySQL 8.0 represents a monumental milestone in database technology. For years, developers had to choose between the crude, inaccurate shortcuts of utf8mb4_general_ci or the slow, uncompressed weight tables of utf8mb4_unicode_ci. With 0900_ai_ci, MySQL delivered the holy grail: 100% linguistic accuracy across all global languages, modern CPU vectorization for ultra-fast sorting, and NO-PAD semantics to eliminate trailing-space security risks. Standardize on utf8mb4_0900_ai_ci for all your modern applications!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
