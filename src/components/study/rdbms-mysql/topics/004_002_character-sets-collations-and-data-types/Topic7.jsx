import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Native JSON Data Type: Storage Format, Validation, and Advantages over Plain Text
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive native JSON workbench: analyzing the binary storage format of MySQL JSON, write-time syntax validation (Error 3140), O(log K) key offset lookups, document normalization, and partial in-place updates in MySQL 8.0.
 */
const Topic7 = () => {
  // Interactive JSON State
  const [selectedJsonPhase, setSelectedJsonPhase] = useState("phase1_binary_layout");

  const jsonPhases = {
    phase1_binary_layout: {
      phaseNumber: "Phase 1: Binary Layout",
      title: "1. The Native Binary JSON Architecture vs Plain TEXT",
      badge: "Binary Engine",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔬 NATIVE JSON VS PLAIN TEXT COMPARISON:
-- 1. Storing JSON as plain LONGTEXT:
--    - Stored as raw character string.
--    - Requires full document parse from beginning to end on every query!
--    - Zero validation: Broken syntax is saved silently! ❌

-- 2. Storing as Native JSON Data Type:
--    - Stored in an optimized internal Binary Dictionary format.
--    - Keys are sorted alphabetically with numerical byte offsets.
--    - Instant O(log K) pointer seeks directly to any nested key! ✅

CREATE TABLE student_portfolios (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    portfolio JSON NOT NULL, -- Native Binary JSON! ⚡
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
      metricsTable: [
        { feature: "Storage Format", plainText: "Raw string of characters", nativeJson: "Optimized Binary Tree (B-tree dictionary) ⚡" },
        { feature: "Syntax Validation", plainText: "None (Silent corrupt data) ❌", nativeJson: "Automatic at write time (Error 3140) ✅" },
        { feature: "Key Lookup Speed", plainText: "O(N) Full String Scan", nativeJson: "O(log K) Direct Byte Offset Pointer" },
        { feature: "In-Place Updates", plainText: "Rewrites entire 100KB document", nativeJson: "Modifies only target bytes in InnoDB page" }
      ],
      explanation:
        "MySQL's native `JSON` type compiles documents into an internal binary structure with sorted keys and numerical byte offsets. Looking up any key requires only an $O(\\log K)$ binary search, completely avoiding slow full-string parsing."
    },
    phase2_syntax_validation: {
      phaseNumber: "Phase 2: Syntax Validation",
      title: "2. Automatic Write-Time Validation & Error 3140 Catching",
      badge: "Data Integrity",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ AUTOMATIC SYNTAX VALIDATION IN ACTION:
-- Attempting to insert valid JSON:
INSERT INTO student_portfolios (student_name, portfolio) VALUES
('Mamata Banerjee', '{"city": "Barrackpore", "skills": ["MySQL", "React"], "active": true}');
-- Status: 1 row inserted successfully! ✅

-- Attempting to insert MALFORMED JSON (Missing quotes & broken brackets):
INSERT INTO student_portfolios (student_name, portfolio) VALUES
('Susmita Roy', '{ city: Barrackpore, skills: [MySQL, React, }');

-- ❌ RUNTIME ERROR OCCURS:
-- Error Code: 3140 (22032): Invalid JSON text in argument 1 to function cast_as_json: 
-- "Invalid value." at line 1, column 2.`,
      metricsTable: [
        { check: "Valid JSON Input", result: "Accepted Immediately ✅", action: "Compiles to binary format in RAM" },
        { check: "Missing Quotes / Brackets", result: "Error Code 3140 ❌", action: "Aborts transaction; rejects corrupt data" },
        { check: "JSON_VALID() Function", result: "Returns 1 (Valid) or 0 (Invalid)", action: "Used for pre-validation in application logic" },
        { check: "Default Syntax", result: "DEFAULT (JSON_OBJECT())", action: "Supported starting in MySQL 8.0.13" }
      ],
      explanation:
        "The native `JSON` column acts as an active data gatekeeper: invalid JSON syntax is rejected immediately with Error 3140, preventing corrupted payloads from entering your database tables."
    },
    phase3_pointer_lookup: {
      phaseNumber: "Phase 3: O(log K) Pointers",
      title: "3. Binary Key Offset Pointer Engine: O(log K) Search",
      badge: "Lookup Algorithm",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ EXTRACTING KEYS VIA BINARY POINTER OFFSETS:
-- Querying a nested JSON key:
SELECT 
    student_name,
    portfolio->>'$.city' AS student_city,
    portfolio->>'$.skills[0]' AS primary_skill
FROM student_portfolios
WHERE portfolio->>'$.city' = 'Barrackpore';

-- HOW MYSQL RESOLVES THIS:
-- 1. Reads binary header for key count (K = 3 keys).
-- 2. Performs Binary Search across sorted keys: ['active', 'city', 'skills'].
-- 3. Jumps directly to byte offset 0x2A for 'city' without reading 'skills'! 🚀`,
      metricsTable: [
        { step: "1. Header Read", operation: "Read 2-byte key count", speed: "Instant (RAM pointer)" },
        { step: "2. Key Search", operation: "Binary search on sorted keys", speed: "O(log K) operations" },
        { step: "3. Value Jump", operation: "Read 4-byte offset pointer", speed: "Direct memory jump to value payload" },
        { step: "4. Result Unquote", operation: "->> returns unquoted string", speed: "Returns plain text value cleanly" }
      ],
      explanation:
        "Because keys are stored alphabetically with explicit byte offsets, extracting `$.city` performs a fast binary search ($O(\\log K)$) and jumps directly to the byte address of the value without reading any other document elements."
    },
    phase4_inplace_updates: {
      phaseNumber: "Phase 4: In-Place Updates",
      title: "4. Partial In-Place Updates & Document Normalization",
      badge: "Update Optimization",
      badgeColor: "amber",
      sqlSnippet: `-- 🔄 PARTIAL IN-PLACE UPDATE IN MYSQL 8.0:
-- Updating a single field in a 50KB JSON document:
UPDATE student_portfolios
SET portfolio = JSON_SET(portfolio, '$.city', 'Kolkata')
WHERE student_name = 'Mamata Banerjee';

-- INNODB INTERNAL BEHAVIOR:
-- - In-place update: Overwrites only the 7 bytes of 'city' inside the InnoDB page!
-- - Generates minimal Redo Log records (32 bytes vs 50,000 bytes)!
-- - Leaves secondary indexes and surrounding page data untouched! ⚡

-- DOCUMENT NORMALIZATION:
-- Removes extra spaces, tabs, and resolves duplicate keys to the last specified value!`,
      metricsTable: [
        { updateMode: "Partial In-Place (8.0)", redoLogSize: "~32 Bytes", diskIo: "Minimal (Single page byte overwrite) ⚡" },
        { updateMode: "Full Rewrite (Legacy/Text)", redoLogSize: "~50 KB", diskIo: "Heavy (Full row rewrite + page split risk)" },
        { updateMode: "Whitespace Normalization", redoLogSize: "Stripped", diskIo: "Saves 30% storage by removing formatting" },
        { updateMode: "Duplicate Keys", redoLogSize: "Normalized", diskIo: "Keeps last specified key-value pair" }
      ],
      explanation:
        "In MySQL 8.0, modifying a key via `JSON_SET` or `JSON_REPLACE` executes an in-place byte overwrite inside the InnoDB page, reducing Redo Log generation by over 99% and avoiding expensive page splits."
    }
  };

  const navItems = [
    { id: "json-overview", label: "1. Native JSON Overview" },
    { id: "binary-diagram", label: "2. Binary Layout Diagram" },
    { id: "interactive-workbench", label: "3. Native JSON Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. JSON Sizing Checklist" },
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
            <span>Topic 7 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Native JSON Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Native JSON Data Type: Storage Format, Validation, and Advantages over Plain Text
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Discover the internal architecture of MySQL's native <code className="text-emerald-400 font-mono">JSON</code> data type: explore binary B-tree dictionary storage, automatic write-time syntax validation (<code className="text-rose-400 font-mono">Error 3140</code>), <code className="text-cyan-400 font-mono">O(log K)</code> key lookups, and partial in-place page updates.
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
        {/* SECTION 1: Native JSON Overview */}
        <section id="json-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Pillars of Native JSON in MySQL 8.0
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why native binary JSON supersedes storing stringified JSON in plain VARCHAR or TEXT columns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Write Validation</span>
              <h3 className="font-bold text-white">Syntax Gatekeeper</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rejects malformed JSON with Error 3140. Guaranteed data integrity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. Binary Format</span>
              <h3 className="font-bold text-white">O(log K) Key Lookups</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sorted key dictionary with byte offsets. Direct random access to keys.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. In-Place Updates</span>
              <h3 className="font-bold text-white">Partial Page Writes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Updates target bytes in InnoDB pages without rewriting the whole document.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Normalization</span>
              <h3 className="font-bold text-white">Optimized Density</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strips whitespace and resolves duplicate keys automatically.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Binary Layout Diagram */}
        <section id="binary-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Binary JSON Memory &amp; Storage Layout
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Examining internal header structure, sorted key table, and byte offset value pointers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 7.1: Internal Binary Layout of <code>{`{"city": "Barrackpore", "age": 22}`}</code>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Binary Representation</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrJsonCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Main Binary Box */}
                <rect x="20" y="40" width="910" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  INTERNAL BINARY JSON STORAGE SPECIFICATION
                </text>
                <line x1="20" y1="85" x2="930" y2="85" stroke="#334155" />

                {/* Section 1: Header */}
                <rect x="40" y="110" width="180" height="180" rx="6" fill="#1e293b" stroke="#047857" />
                <text x="130" y="135" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. DOCUMENT HEADER
                </text>
                <line x1="40" y1="145" x2="220" y2="145" stroke="#334155" />
                <text x="50" y="170" fill="#94a3b8" fontSize="10">Type: JSON_OBJECT (0x00)</text>
                <text x="50" y="195" fill="#34d399" fontSize="10" fontWeight="bold">Key Count: 2 Keys</text>
                <text x="50" y="220" fill="#94a3b8" fontSize="10">Doc Size: 48 Bytes</text>
                <text x="50" y="250" fill="#bae6fd" fontSize="9">Fixed 4-byte header</text>

                {/* Section 2: Sorted Keys */}
                <rect x="250" y="110" width="220" height="180" rx="6" fill="#1e293b" stroke="#0284c7" />
                <text x="360" y="135" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. SORTED KEY DICTIONARY
                </text>
                <line x1="250" y1="145" x2="470" y2="145" stroke="#334155" />
                <text x="260" y="170" fill="#a7f3d0" fontSize="10" fontWeight="bold">Key[0]: 'age' (Offset &rarr; 0x1A)</text>
                <text x="260" y="195" fill="#a7f3d0" fontSize="10" fontWeight="bold">Key[1]: 'city' (Offset &rarr; 0x22)</text>
                <text x="260" y="230" fill="#38bdf8" fontSize="9" fontWeight="bold">Sorted alphabetically!</text>
                <text x="260" y="250" fill="#94a3b8" fontSize="8">Enables O(log K) Binary Search</text>

                {/* Section 3: Offset Pointers & Values */}
                <rect x="500" y="110" width="410" height="180" rx="6" fill="#1e293b" stroke="#10b981" />
                <text x="705" y="135" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. VALUE POINTERS &amp; PAYLOAD
                </text>
                <line x1="500" y1="145" x2="910" y2="145" stroke="#334155" />

                <rect x="520" y="160" width="370" height="40" rx="4" fill="#0f172a" stroke="#047857" />
                <text x="530" y="180" fill="#34d399" fontSize="10" fontWeight="bold">Address 0x1A: [Type: INT8 | Value: 22]</text>
                <text x="530" y="193" fill="#94a3b8" fontSize="8">Direct integer value storage</text>

                <rect x="520" y="215" width="370" height="45" rx="4" fill="#0f172a" stroke="#0284c7" />
                <text x="530" y="235" fill="#bae6fd" fontSize="10" fontWeight="bold">Address 0x22: [Type: STRING | 'Barrackpore']</text>
                <text x="530" y="248" fill="#94a3b8" fontSize="8">Direct string length + payload bytes</text>

                <path d="M 470 170 L 520 180" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrJsonCyan)" />
                <path d="M 470 195 L 520 235" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrJsonCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Native JSON Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Native JSON Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a JSON phase to inspect binary layouts, validation error catching, and in-place update executions.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(jsonPhases).map((key) => {
              const ph = jsonPhases[key];
              const isSelected = selectedJsonPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedJsonPhase(key)}
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
                      ph.badgeColor === "rose" && "bg-rose-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
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
                {jsonPhases[selectedJsonPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  jsonPhases[selectedJsonPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  jsonPhases[selectedJsonPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  jsonPhases[selectedJsonPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  jsonPhases[selectedJsonPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {jsonPhases[selectedJsonPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                JSON DDL &amp; Query Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {jsonPhases[selectedJsonPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Native JSON Characteristics &amp; Operations:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Feature / Operation</th>
                      <th className="py-2.5 px-4">Plain TEXT / Initial State</th>
                      <th className="py-2.5 px-4">Native JSON / Optimized Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {jsonPhases[selectedJsonPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.feature || row.check || row.step || row.updateMode}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.plainText || row.result || row.operation || row.redoLogSize}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.nativeJson || row.action || row.speed || row.diskIo}
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
                {jsonPhases[selectedJsonPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Native JSON Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminating corrupt payloads and speeding up document lookups in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Validation Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Corrupted Admission Payloads in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Syntax Errors Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an online admission portal stored candidate academic histories in a `LONGTEXT` column. Frontend formatting glitches frequently inserted invalid JSON strings, causing backend microservices to crash during batch processing. Converting the column to native `JSON` enabled write-time validation (Error 3140), stopping corrupt records from entering the database completely.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's In-Place Update Speedup */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 8x Faster E-Commerce Cart Updates in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  90% Redo Log Saved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, updating a customer cart status in a 40 KB JSON document previously rewrote the entire 40 KB payload on every mouse click under `TEXT` storage. Standardizing on MySQL 8.0 native `JSON` with `JSON_SET` enabled partial in-place page updates, shrinking Redo Log I/O by 94% and accelerating cart update throughput by 800%.
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
              Avoid schema-less anti-patterns and unindexed document query scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Replacing Relational Columns with JSON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Dumping all entity attributes into a single `JSON` column destroys relational constraints, foreign keys, and direct primary key seek speeds.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep core relational fields relational; use JSON for dynamic attributes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Querying Unindexed JSON Keys in WHERE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code>{"WHERE portfolio->>'$.city' = 'Kolkata'"}</code> without an index forces a full table scan across millions of JSON documents!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Index extracted keys using Generated Columns or Multi-Valued Indexes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Native JSON for Dynamic Attributes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use native `JSON` for product specifications, polymorphic metadata, and third-party API webhook payloads that vary dynamically.
              </p>
              <div className="text-xs text-slate-400">
                Combines document flexibility with ACID relational safety.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage In-Place JSON_SET
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `JSON_SET()` and `JSON_REPLACE()` for fine-grained key modifications to activate MySQL 8.0 partial in-place page updating.
              </p>
              <div className="text-xs text-slate-400">
                Cuts Redo Log I/O and speeds up updates by up to 8x.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: JSON Sizing Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Native JSON Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify optimal JSON schema architecture in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> JSON Schema Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Native JSON Type</strong> = Ensure all JSON columns use the native `JSON` type.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Validation Verified</strong> = Validate that bad JSON raises Error 3140 on insert.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">In-Place Updates</strong> = Use `JSON_SET()` instead of full document overwrites.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Indexed Hot Keys</strong> = Create generated column indexes for keys used in `WHERE`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe JSON_STORAGE_SIZE()...”</span>
                  Run `SELECT JSON_STORAGE_SIZE(json_col) FROM table;` to see the exact byte footprint of your binary JSON document! Because whitespace is stripped, it is often 30% smaller than the original JSON string!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Hybrid Schemas...”</span>
                  The best architecture in modern database design is hybrid: store customer ID, email, and created_at in standard relational columns for maximum join speed, and store dynamic custom profile settings in native JSON!
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
              Comprehensive reference questions covering Native JSON Storage, Validation, and In-Place Updates.
            </p>
          </div>

          <FAQTemplate
            title="Native JSON Data Type (Storage & Validation) FAQs"
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
            title="Native JSON Data Type: Storage Format, Validation, and Advantages over Plain Text"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="The introduction of the native JSON data type in MySQL bridges the gap between relational databases and NoSQL document stores. Instead of maintaining a separate MongoDB cluster just for flexible documents, MySQL gives you the best of both worlds: schema flexibility for dynamic JSON attributes, combined with strict write validation (Error 3140), O(log K) binary offset pointer lookups, partial in-place updates, ACID transactions, and relational joins. Always use native JSON rather than plain TEXT!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
