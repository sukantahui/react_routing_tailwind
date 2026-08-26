import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding Character Sets: ASCII, Latin1, UTF-8 (utf8mb3) vs utf8mb4 (Full Unicode / Emojis)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive character sets workbench: analyzing the evolution from ASCII and Latin1 to legacy utf8mb3 and modern utf8mb4, diagnosing Error 1366 emoji crashes, inspecting VARCHAR byte limits and index prefix boundaries, and executing end-to-end table charset conversions.
 */
const Topic0 = () => {
  // Interactive Charset State
  const [selectedCharsetPhase, setSelectedCharsetPhase] = useState("phase1_evolution");

  const charsetPhases = {
    phase1_evolution: {
      phaseNumber: "Phase 1: Charset Evolution",
      title: "1. The Evolution of Character Sets: ASCII to utf8mb4",
      badge: "Encoding Evolution",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌐 CHECKING SUPPORTED CHARACTER SETS IN MYSQL:
SHOW CHARACTER SET WHERE Charset IN ('ascii', 'latin1', 'utf8mb3', 'utf8mb4');

-- CHARACTER SET COMPARISON:
-- 1. ASCII (7-bit): 1 Byte/char (0-127). English only.
-- 2. latin1 (8-bit): 1 Byte/char (0-255). Western European.
-- 3. utf8mb3 (Legacy): 1-3 Bytes/char. Basic Multilingual Plane (U+0000 to U+FFFF).
-- 4. utf8mb4 (Modern Unicode): 1-4 Bytes/char. 100% Unicode + All Emojis (😀, 🚀)!

-- Verifying string byte length vs character count:
SELECT 
    'Kolkata 🇮🇳' AS text_val,
    CHAR_LENGTH('Kolkata 🇮🇳') AS char_count, -- 9 characters
    LENGTH('Kolkata 🇮🇳') AS byte_count,      -- 15 bytes in utf8mb4!
    HEX('Kolkata 🇮🇳') AS raw_hex_bytes;`,
      metricsTable: [
        { charset: "ASCII", maxBytes: "1 Byte", coverage: "English letters & numbers only (0-127)" },
        { charset: "Latin1 (ISO-8859-1)", maxBytes: "1 Byte", coverage: "Western European languages (0-255)" },
        { charset: "utf8mb3 (Legacy)", maxBytes: "3 Bytes", coverage: "BMP only; FAILS on emojis (Error 1366) ❌" },
        { charset: "utf8mb4 (Standard)", maxBytes: "4 Bytes", coverage: "100% Unicode (Bengali, Hindi, Emojis) ✅" }
      ],
      explanation:
        "`utf8mb4` is the universal modern Unicode standard in MySQL 8.0+. It uses a variable width of 1 to 4 bytes dynamically: standard ASCII English consumes 1 byte, Indian scripts (Bengali, Hindi) consume 3 bytes, and emojis consume 4 bytes."
    },
    phase2_emoji_crash: {
      phaseNumber: "Phase 2: Emoji Error 1366",
      title: "2. The Emoji Crash: Diagnosing MySQL Error 1366",
      badge: "Error 1366 Diagnosis",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 THE NOTORIOUS UTF8MB3 EMOJI CRASH:
-- Create table in legacy utf8 (utf8mb3):
CREATE TABLE legacy_chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255) CHARACTER SET utf8mb3 NOT NULL
);

-- Attempting to insert a 4-byte Unicode Emoji:
INSERT INTO legacy_chat (message) VALUES ('Admission Confirmed! 🚀🎉');

-- ❌ RUNTIME ERROR OCCURS:
-- Error Code: 1366. Incorrect string value: '\\xF0\\x9F\\x9A\\x80...' for column 'message'

-- WHY IT CRASHED:
-- The rocket emoji (🚀) has hex bytes 'F0 9F 9A 80' (4 Bytes).
-- utf8mb3 only accepts up to 3-byte sequences (E0..EF), throwing a fatal error!`,
      metricsTable: [
        { metric: "Error Code", value: "1366 (HY000)", role: "Incorrect string value for column" },
        { metric: "Trigger Cause", value: "Inserting 4-byte characters", role: "Emojis (😀, 🚀), mathematical symbols" },
        { metric: "Vulnerable Charsets", value: "utf8, utf8mb3, latin1", role: "Cannot store supplementary Unicode planes" },
        { metric: "Fix", value: "Convert to utf8mb4", role: "Enables full 4-byte character support" }
      ],
      explanation:
        "When an application writes a 4-byte emoji into a legacy `utf8mb3` or `latin1` column, MySQL throws Error 1366 because the column cannot store bytes above the 3-byte boundary. Converting the column to `utf8mb4` fixes the issue permanently."
    },
    phase3_storage_index_limits: {
      phaseNumber: "Phase 3: Storage & Index Limits",
      title: "3. Storage, Memory Overhead & Index Prefix Limits",
      badge: "Index Prefix Rules",
      badgeColor: "amber",
      sqlSnippet: `-- 📏 INDEX PREFIX LENGTHS & MEMORY ALLOCATION:
-- 1. Index Prefix Limit in InnoDB (DYNAMIC Row Format):
--    Maximum index key prefix = 3072 Bytes.
--    Max VARCHAR in utf8mb4 = 3072 / 4 = 768 Characters!
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(768) CHARACTER SET utf8mb4 NOT NULL,
    UNIQUE INDEX idx_email (user_email) -- Valid (768 * 4 = 3072 bytes) ✅
);

-- 2. Legacy COMPACT Row Format (767 Byte Limit):
--    Max VARCHAR in utf8mb4 = 767 / 4 = 191 Characters!
--    (Origin of the famous VARCHAR(191) design pattern!)

-- 3. In-Memory Sorting Worst-Case Allocation:
--    VARCHAR(255) in utf8mb4 reserves 255 * 4 = 1,020 Bytes per row in RAM!`,
      metricsTable: [
        { format: "InnoDB DYNAMIC", maxIndexBytes: "3072 Bytes", maxCharsUtf8mb4: "VARCHAR(768) Indexed ✅" },
        { format: "InnoDB COMPACT (Legacy)", maxIndexBytes: "767 Bytes", maxCharsUtf8mb4: "VARCHAR(191) Indexed ⚠️" },
        { format: "RAM Sort Buffer", overhead: "N * 4 Bytes / Row", note: "Size VARCHARs realistically to save RAM" },
        { format: "ASCII Micro-Optimization", charSet: "ascii / latin1", note: "Use for pure hex UUID / hash columns" }
      ],
      explanation:
        "Under InnoDB's default DYNAMIC row format, indexes can be up to 3072 bytes (accommodating `VARCHAR(768)` in `utf8mb4`). In memory, MySQL reserves up to $N \\times 4$ bytes per row during sorting, so columns should be sized according to real business requirements."
    },
    phase4_table_conversion: {
      phaseNumber: "Phase 4: Table Conversion",
      title: "4. Full Table Conversion Runbook to utf8mb4",
      badge: "Conversion Runbook",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 SAFE CONVERSION RUNBOOK: LATIN1 / UTF8MB3 TO UTF8MB4:
-- Step 1: Check existing table character set and collation:
SHOW CREATE TABLE student_admissions;

-- Step 2: Convert existing table and all string columns safely:
ALTER TABLE student_admissions 
CONVERT TO CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;

-- Step 3: Set Client Connection Charset in application / session:
SET NAMES 'utf8mb4';

-- ⚠️ WARNING: Never use 'DEFAULT CHARACTER SET utf8mb4' alone,
-- as it leaves all existing columns in their old broken encoding!`,
      metricsTable: [
        { step: "1. CONVERT TO", command: "CONVERT TO CHARACTER SET utf8mb4", role: "Re-encodes all existing columns and data" },
        { step: "2. Collation", command: "COLLATE utf8mb4_0900_ai_ci", role: "Applies modern Unicode 9.0 sorting rules" },
        { step: "3. Connection", command: "SET NAMES 'utf8mb4'", role: "Configures client, connection, and results" },
        { step: "4. Verification", command: "SHOW CREATE TABLE", role: "Validates converted column definitions" }
      ],
      explanation:
        "Converting a table requires `ALTER TABLE tbl CONVERT TO CHARACTER SET utf8mb4`, which converts both the table schema and all existing text data. Pair this with `SET NAMES 'utf8mb4'` in application connection pools for end-to-end Unicode support."
    }
  };

  const navItems = [
    { id: "charset-overview", label: "1. Charset Overview" },
    { id: "encoding-diagram", label: "2. Byte Width Diagram" },
    { id: "interactive-workbench", label: "3. Charset Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Charset Audit Checklist" },
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
            <span>Topic 0 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Character Sets
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Understanding Character Sets: ASCII, Latin1, UTF-8 (utf8mb3) vs utf8mb4 (Full Unicode / Emojis)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the foundational encoding standards of modern databases: trace the evolution from ASCII and Latin1 to <code className="text-rose-400 font-mono">utf8mb3</code> and <code className="text-emerald-400 font-mono">utf8mb4</code>, eliminate Error 1366 emoji crashes, understand VARCHAR memory overhead, and execute bulletproof table conversions.
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
        {/* SECTION 1: Charset Overview */}
        <section id="charset-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Character Sets in Modern Database Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why encoding choice determines global language support, emoji compatibility, and memory efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. ASCII (7-bit)</span>
              <h3 className="font-bold text-white">1 Byte / Char</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                English letters and numbers (0-127). Zero support for accents or international scripts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. Latin1 (8-bit)</span>
              <h3 className="font-bold text-white">1 Byte / Char</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Western European languages. Cannot store Asian, Indic (Bengali/Hindi), or emojis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">3. utf8mb3 (Flawed)</span>
              <h3 className="font-bold text-white">1 to 3 Bytes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Legacy 3-byte UTF-8. Fails with Error 1366 when inserting modern 4-byte emojis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">4. utf8mb4 (Standard)</span>
              <h3 className="font-bold text-white">1 to 4 Bytes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full 4-byte Unicode standard in MySQL 8.0+. 100% support for all global languages and emojis.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Encoding Diagram */}
        <section id="encoding-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Byte Widths &amp; Unicode Planes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing physical byte consumption across ASCII, Latin1, utf8mb3, and utf8mb4.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 0.1: Character Set Byte Allocation &amp; Symbol Coverage
              </h3>
              <span className="text-xs text-slate-400 font-mono">Unicode Byte Map</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* ASCII Column */}
                <rect x="20" y="40" width="200" height="280" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                <text x="120" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ASCII (7-BIT)
                </text>
                <line x1="20" y1="85" x2="220" y2="85" stroke="#334155" />
                <rect x="35" y="105" width="170" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="128" fill="#e2e8f0" fontSize="11" fontWeight="bold">'A' &rarr; 1 Byte (0x41)</text>

                <rect x="35" y="155" width="170" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="178" fill="#f87171" fontSize="10" fontWeight="bold">'é' &rarr; ❌ Unsupported</text>

                <rect x="35" y="205" width="170" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="228" fill="#f87171" fontSize="10" fontWeight="bold">'₹' &rarr; ❌ Unsupported</text>

                <rect x="35" y="255" width="170" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="278" fill="#f87171" fontSize="10" fontWeight="bold">'🚀' &rarr; ❌ Unsupported</text>

                {/* Latin1 Column */}
                <rect x="250" y="40" width="200" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="350" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  LATIN1 (8-BIT)
                </text>
                <line x1="250" y1="85" x2="450" y2="85" stroke="#334155" />
                <rect x="265" y="105" width="170" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="275" y="128" fill="#a7f3d0" fontSize="11" fontWeight="bold">'A' &rarr; 1 Byte (0x41)</text>

                <rect x="265" y="155" width="170" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="275" y="128" fill="#a7f3d0" fontSize="11" fontWeight="bold">'é' &rarr; 1 Byte (0xE9)</text>

                <rect x="265" y="205" width="170" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="275" y="228" fill="#f87171" fontSize="10" fontWeight="bold">'₹' &rarr; ❌ Unsupported</text>

                <rect x="265" y="255" width="170" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="275" y="278" fill="#f87171" fontSize="10" fontWeight="bold">'🚀' &rarr; ❌ Unsupported</text>

                {/* utf8mb3 Column */}
                <rect x="480" y="40" width="210" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="585" y="70" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">
                  utf8mb3 (LEGACY 3-BYTE)
                </text>
                <line x1="480" y1="85" x2="690" y2="85" stroke="#334155" />
                <rect x="495" y="105" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="505" y="128" fill="#a7f3d0" fontSize="11" fontWeight="bold">'A' &rarr; 1 Byte (0x41)</text>

                <rect x="495" y="155" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="505" y="178" fill="#a7f3d0" fontSize="11" fontWeight="bold">'é' &rarr; 2 Bytes (C3 A9)</text>

                <rect x="495" y="205" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="505" y="228" fill="#a7f3d0" fontSize="11" fontWeight="bold">'₹' &rarr; 3 Bytes (E2 82 B9)</text>

                <rect x="495" y="255" width="180" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="505" y="278" fill="#f87171" fontSize="9" fontWeight="bold">'🚀' &rarr; ❌ Error 1366 Crash!</text>

                {/* utf8mb4 Column */}
                <rect x="720" y="40" width="210" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="825" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  utf8mb4 (FULL 4-BYTE)
                </text>
                <line x1="720" y1="85" x2="930" y2="85" stroke="#334155" />
                <rect x="735" y="105" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="745" y="128" fill="#a7f3d0" fontSize="11" fontWeight="bold">'A' &rarr; 1 Byte (0x41)</text>

                <rect x="735" y="155" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="745" y="178" fill="#a7f3d0" fontSize="11" fontWeight="bold">'é' &rarr; 2 Bytes (C3 A9)</text>

                <rect x="735" y="205" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="745" y="228" fill="#a7f3d0" fontSize="11" fontWeight="bold">'₹' &rarr; 3 Bytes (E2 82 B9)</text>

                <rect x="735" y="255" width="180" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="745" y="278" fill="#34d399" fontSize="10" fontWeight="bold">'🚀' &rarr; 4 Bytes (F0 9F 9A 80) ✅</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Charset Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Character Set Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a charset phase to inspect diagnostic scripts, emoji error solutions, and table conversion runbooks.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(charsetPhases).map((key) => {
              const ph = charsetPhases[key];
              const isSelected = selectedCharsetPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCharsetPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
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
                {charsetPhases[selectedCharsetPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  charsetPhases[selectedCharsetPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  charsetPhases[selectedCharsetPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  charsetPhases[selectedCharsetPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  charsetPhases[selectedCharsetPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {charsetPhases[selectedCharsetPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Character Set Diagnostic &amp; Conversion Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {charsetPhases[selectedCharsetPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Encoding Characteristics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Character Set / Feature</th>
                      <th className="py-2.5 px-4">Max Byte Width &amp; Syntax</th>
                      <th className="py-2.5 px-4">Unicode Coverage / Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {charsetPhases[selectedCharsetPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.charset || row.metric || row.format || row.step}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.maxBytes || row.value || row.maxIndexBytes || row.command || row.overhead}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.coverage || row.role || row.maxCharsUtf8mb4 || row.note}
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
                {charsetPhases[selectedCharsetPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Character Set Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing mobile emoji crashes and multilingual admission portals in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Emoji Crash Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Mobile App Emoji Crashes (Error 1366) in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Error 1366 Resolved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a student feedback mobile app began crashing when students typed emojis (🎉, 👍) into the comments box. The table was configured in legacy `utf8` (utf8mb3). Executing `ALTER TABLE feedback CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;` resolved the issue in 2 seconds, allowing emojis to save with 100% reliability.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Multi-Language Storage */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Bengali Script &amp; Rupee Sign Storage in Kolkata Portal
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Multilingual Success
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an e-commerce platform transitioning from `latin1` to `utf8mb4` enabled native support for customer names in Bengali script and the Indian Rupee symbol (`₹12,500`), eliminating Mojibake character corruption and improving user trust.
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
              Avoid dangerous character set mistakes during application development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using DEFAULT CHARACTER SET instead of CONVERT TO
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running `ALTER TABLE tbl DEFAULT CHARACTER SET utf8mb4;` only affects future new columns, leaving all existing columns in their old broken encoding!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use ALTER TABLE tbl CONVERT TO CHARACTER SET utf8mb4.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Client Connection Charset Mismatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting the table to `utf8mb4` while the backend connection pool defaults to `latin1` causes double-encoding corruption (Mojibake).
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Configure charset: 'utf8mb4' in application connection pools.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Size VARCHAR Realistically
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Because `utf8mb4` reserves up to 4 bytes per character during in-memory sorting, use `VARCHAR(50)` instead of `VARCHAR(255)` when appropriate.
              </p>
              <div className="text-xs text-slate-400">
                Saves RAM sort buffer footprint on high-concurrency queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Micro-Optimize Hash Columns with ASCII
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                For columns storing UUIDs, MD5 hashes, or token strings, use `CHARACTER SET ascii` to cut memory usage by 4x.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes index buffer cache density for hash lookups.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Charset Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Character Set Audit Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key encoding parameters to verify across production database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Encoding Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">utf8mb4 Standard</strong> = Ensure all tables use `utf8mb4` character set.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Collation Standard</strong> = Enforce `utf8mb4_0900_ai_ci` for modern Unicode sorting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Connection Pools</strong> = Verify backend libraries specify `charset: 'utf8mb4'`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Index Prefixes</strong> = Keep indexed columns below 768 characters in utf8mb4.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe CHAR_LENGTH vs LENGTH...”</span>
                  `CHAR_LENGTH('Kolkata 🇮🇳')` returns 9 characters, but `LENGTH('Kolkata 🇮🇳')` returns 15 bytes in `utf8mb4`! Always use `CHAR_LENGTH` when validating user form field limits!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about HEX() for Debugging...”</span>
                  If a user reports corrupted text like 'Ã©', run `SELECT HEX(column_name) FROM table;`. Looking at the raw bytes tells you instantly whether data was corrupted at the client or stored incorrectly!
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
              Comprehensive reference questions covering Character Sets, utf8mb4, and Emoji Support.
            </p>
          </div>

          <FAQTemplate
            title="Character Sets (ASCII, Latin1, utf8mb3 vs utf8mb4) FAQs"
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
            title="Understanding Character Sets: ASCII, Latin1, UTF-8 (utf8mb3) vs utf8mb4 (Full Unicode / Emojis)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Character sets are the foundation of all text storage in database systems. In today's connected world, applications must support multi-lingual scripts, international currency symbols like the Indian Rupee (₹), and modern emojis across mobile and web interfaces. Never use legacy 'utf8' (utf8mb3) in MySQL—always standardize on utf8mb4 with utf8mb4_0900_ai_ci across your server, database schemas, tables, and backend connection pools to ensure your applications run without encoding errors!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
