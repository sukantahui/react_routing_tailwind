import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Concatenating Grouped Values with GROUP_CONCAT()
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive GROUP_CONCAT Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedConcatMode, setSelectedConcatMode] = useState("mode_batch_roster"); // "mode_batch_roster" | "mode_skill_matrix" | "mode_order_summary" | "mode_multi_column"

  const concatScenarios = {
    mode_batch_roster: {
      title: "1. Ranked Student Batch Roster (ORDER BY & Separator)",
      sqlQuery: `SELECT 
    batch_name,
    COUNT(*) AS total_students,
    GROUP_CONCAT(
        CONCAT(student_name, ' [', marks_pct, '%]') 
        ORDER BY marks_pct DESC 
        SEPARATOR '  ➔  '
    ) AS leaderboard_roster
FROM batch_evaluations
GROUP BY batch_name;`,
      resultRows: [
        {
          groupName: "React Barrackpore Morning",
          count: "3 Students",
          concatenatedText: "Mamata Hui [94%]  ➔  Susmita Sen [88%]  ➔  Debangshu Roy [76%]",
          badgeColor: "emerald",
        },
        {
          groupName: "Java Kolkata Weekend",
          count: "2 Students",
          concatenatedText: "Mahima Das [91%]  ➔  Abhronila Saha [84%]",
          badgeColor: "cyan",
        },
      ],
      verdictText: "✓ RANKED STRING SERIALIZED",
      badgeColor: "emerald",
      explanation: "GROUP_CONCAT formats and sorts individual student scores within the concatenated string in descending order, using a custom arrow delimiter.",
    },
    mode_skill_matrix: {
      title: "2. Deduplicated Skill Matrix Rollup (DISTINCT)",
      sqlQuery: `SELECT 
    student_name,
    COUNT(DISTINCT skill_name) AS skill_count,
    GROUP_CONCAT(
        DISTINCT skill_name 
        ORDER BY skill_name ASC 
        SEPARATOR ', '
    ) AS certified_technologies
FROM student_certifications
GROUP BY student_name;`,
      resultRows: [
        {
          groupName: "Mamata Hui",
          count: "4 Skills",
          concatenatedText: "Docker, MySQL RDBMS, Node.js, React 19",
          badgeColor: "cyan",
        },
        {
          groupName: "Susmita Sen",
          count: "3 Skills",
          concatenatedText: "Express, MySQL RDBMS, Tailwind CSS",
          badgeColor: "cyan",
        },
        {
          groupName: "Debangshu Roy",
          count: "3 Skills",
          concatenatedText: "Java Core, MySQL RDBMS, Spring Boot",
          badgeColor: "cyan",
        },
      ],
      verdictText: "✓ DUPLICATES ELIMINATED",
      badgeColor: "cyan",
      explanation: "The DISTINCT keyword inside GROUP_CONCAT eliminates repeated skill entries resulting from multi-table joins or duplicate workshop badges.",
    },
    mode_order_summary: {
      title: "3. E-Commerce Order Line Item Summary",
      sqlQuery: `SELECT 
    order_id,
    customer_name,
    COUNT(*) AS total_items_count,
    GROUP_CONCAT(
        CONCAT(item_name, ' (x', quantity, ')') 
        ORDER BY item_name ASC 
        SEPARATOR ' + '
    ) AS packing_slip_items,
    SUM(line_total_inr) AS order_total_inr
FROM customer_order_items
GROUP BY order_id, customer_name;`,
      resultRows: [
        {
          groupName: "ORD-2026-8801 (Mamata)",
          count: "3 Line Items",
          concatenatedText: "Mechanical Keyboard (x1) + USB-C Hub (x2) + Wireless Mouse (x1)",
          badgeColor: "indigo",
        },
        {
          groupName: "ORD-2026-8802 (Debangshu)",
          count: "2 Line Items",
          concatenatedText: "27-inch 4K Monitor (x1) + HDMI Cable (x1)",
          badgeColor: "indigo",
        },
      ],
      verdictText: "✓ PACKING SLIP ASSEMBLED",
      badgeColor: "indigo",
      explanation: "Collapses 1:N order line item rows into a clean, single-row human-readable invoice summary suitable for packing slips and SMS dispatch.",
    },
    mode_multi_column: {
      title: "4. Multi-Column Regional Center Directory",
      sqlQuery: `SELECT 
    center_city,
    COUNT(*) AS total_courses,
    GROUP_CONCAT(
        CONCAT_WS(':', course_stream, mentor_name, CONCAT('₹', fee_inr))
        ORDER BY course_stream ASC 
        SEPARATOR ' | '
    ) AS catalog_breakdown
FROM regional_centers
GROUP BY center_city;`,
      resultRows: [
        {
          groupName: "Barrackpore Campus",
          count: "3 Streams",
          concatenatedText: "DevOps:Sukanta Hui:₹6500 | Java:Sukanta Hui:₹5000 | React:Sukanta Hui:₹5000",
          badgeColor: "amber",
        },
        {
          groupName: "Kolkata Tech Hub",
          count: "2 Streams",
          concatenatedText: "Data Analytics:Sukanta Hui:₹7000 | FullStack:Sukanta Hui:₹8000",
          badgeColor: "amber",
        },
      ],
      verdictText: "✓ MULTI-FIELD METADATA ROLLUP",
      badgeColor: "amber",
      explanation: "Combines CONCAT_WS with GROUP_CONCAT to serialize structured multi-attribute records (Course:Mentor:Fee) into a single analytical payload.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. GROUP_CONCAT Mechanics" },
    { id: "syntax-options", label: "2. Syntax & Cross-DB Equivalents" },
    { id: "svg-diagram", label: "3. Serialization Pipeline SVG" },
    { id: "interactive-sandbox", label: "4. Interactive Sandbox" },
    { id: "case-studies", label: "5. Production Industry Case Studies" },
    { id: "pitfalls-checklist", label: "6. Senior Pitfalls & Best Practices" },
    { id: "faq-section", label: "7. Q&A / FAQs (30 Questions)" },
    { id: "teacher-notes", label: "8. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 10 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              String Aggregation & Serialization
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Concatenating Grouped Values with GROUP_CONCAT()
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Compress multiple rows of textual and metadata values into compact, delimited, sorted strings in MySQL. Learn deduplication with{" "}
            <code className="text-cyan-300 font-mono font-bold">DISTINCT</code>, inline{" "}
            <code className="text-emerald-300 font-mono font-bold">ORDER BY</code>, custom separators, and memory buffer tuning.
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
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Core Theory */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Core Theory & The Power of String Aggregation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard aggregate functions compress numbers into single values (SUM, AVG). <code className="text-cyan-300 font-mono font-bold">GROUP_CONCAT()</code> serializes textual row values into a single delimited string result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  DISTINCT
                </span>
                <h3 className="text-lg font-semibold text-white">De-duplication</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Removes duplicate values before joining strings, critical when queries involve 1:N or M:N table joins that multiply row counts.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-cyan-400">GROUP_CONCAT</span>(<span className="text-emerald-400">DISTINCT</span> skill_name);</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  ORDER BY
                </span>
                <h3 className="text-lg font-semibold text-white">Internal Sorting</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Sorts elements alphabetically, numerically, or chronologically <em>inside</em> the concatenated string output.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-emerald-400">GROUP_CONCAT</span>(name <span className="text-emerald-400">ORDER BY</span> marks <span className="text-emerald-400">DESC</span>);</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-sm font-bold border border-indigo-800">
                  SEPARATOR
                </span>
                <h3 className="text-lg font-semibold text-white">Custom Delimiters</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Overrides the default comma (<code className="text-indigo-300">,</code>) with custom delimiters such as <code className="text-indigo-300">' | '</code>, <code className="text-indigo-300">' + '</code>, or <code className="text-indigo-300">'; '</code>.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-indigo-400">GROUP_CONCAT</span>(tag <span className="text-indigo-400">SEPARATOR</span> <span className="text-emerald-400">' | '</span>);</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Syntax Options & Cross-DB Equivalents */}
        <section id="syntax-options" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Syntax Options & Cross-RDBMS Compatibility Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing string aggregation capabilities across MySQL, PostgreSQL, Oracle, and Microsoft SQL Server.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Database Engine</th>
                  <th className="py-3.5 px-4">Equivalent Function / Syntax</th>
                  <th className="py-3.5 px-4">Internal Sorting Support?</th>
                  <th className="py-3.5 px-4">DISTINCT Support?</th>
                  <th className="py-3.5 px-4">Buffer Limitation / Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">MySQL / MariaDB</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">GROUP_CONCAT(DISTINCT col ORDER BY col SEPARATOR ', ')</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (inline ORDER BY)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (inline DISTINCT)</td>
                  <td className="py-3 px-4 font-mono text-xs text-amber-400">group_concat_max_len (1MB default)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-bold">PostgreSQL</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">STRING_AGG(DISTINCT col, ', ' ORDER BY col)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (inline ORDER BY)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (inline DISTINCT)</td>
                  <td className="py-3 px-4 text-emerald-400">Memory limited (up to 1GB text)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">Oracle Database</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">LISTAGG(DISTINCT col, ', ') WITHIN GROUP (ORDER BY col)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (WITHIN GROUP)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (Oracle 19c+)</td>
                  <td className="py-3 px-4 font-mono text-xs text-rose-400">4000 bytes (or ON OVERFLOW TRUNCATE)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">MS SQL Server</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">STRING_AGG(col, ', ') WITHIN GROUP (ORDER BY col)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (WITHIN GROUP)</td>
                  <td className="py-3 px-4 text-rose-400">No (Requires subquery DISTINCT)</td>
                  <td className="py-3 px-4 text-emerald-400">8000 bytes or VARCHAR(MAX)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Serialization Pipeline */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. GROUP_CONCAT Serialization & Aggregation Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the complete aggregation lifecycle: row grouping, NULL filtering, DISTINCT deduplication, internal sorting, and delimiter joining.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradGcCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradGcEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradGcIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowGc" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Main Title */}
              <text x="450" y="34" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MYSQL GROUP_CONCAT() STRING AGGREGATION & SERIALIZATION ENGINE
              </text>

              {/* Stage 1: Group Partition */}
              <g transform="translate(40, 65)">
                <rect width="210" height="280" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <rect x="0" y="0" width="210" height="32" rx="12" fill="url(#gradGcCyan)" />
                <text x="105" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1. Group Partition (React Batch)</text>

                {/* Items */}
                <rect x="15" y="45" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="68" fill="#e2e8f0" fontSize="10.5">Debangshu (76%)</text>

                <rect x="15" y="90" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="113" fill="#e2e8f0" fontSize="10.5">Mamata (94%)</text>

                <rect x="15" y="135" width="180" height="36" rx="6" fill="#451a03" stroke="#f59e0b" />
                <text x="25" y="158" fill="#fef3c7" fontSize="10.5" fontWeight="bold">Guest Student (NULL)</text>

                <rect x="15" y="180" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="203" fill="#e2e8f0" fontSize="10.5">Susmita (88%)</text>

                <rect x="15" y="225" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="248" fill="#e2e8f0" fontSize="10.5">Mamata (94%) [Duplicate]</text>
              </g>

              {/* Arrow 1 */}
              <path d="M 250 205 L 320 205" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="320,205 312,199 312,211" fill="#06b6d4" />

              {/* Stage 2: DISTINCT & Internal Sorting */}
              <g transform="translate(320, 65)">
                <rect width="250" height="280" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <rect x="0" y="0" width="250" height="32" rx="12" fill="url(#gradGcEmerald)" />
                <text x="125" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">2. Filter, Deduplicate & Sort</text>

                <rect x="20" y="45" width="210" height="42" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="65" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">NULL Filter Gate</text>
                <text x="125" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">Guest Student (NULL) Skipped</text>

                <rect x="20" y="95" width="210" height="42" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="115" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">DISTINCT Deduplication</text>
                <text x="125" y="128" fill="#94a3b8" fontSize="9" textAnchor="middle">Redundant Mamata entry dropped</text>

                <rect x="20" y="145" width="210" height="60" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="165" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">ORDER BY marks DESC</text>
                <text x="125" y="180" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">1. Mamata (94%)</text>
                <text x="125" y="195" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">2. Susmita (88%) | 3. Debangshu (76%)</text>

                <text x="125" y="240" fill="#cbd5e1" fontSize="10" textAnchor="middle">Separator: ' ➔ '</text>
              </g>

              {/* Arrow 2 */}
              <path d="M 570 205 L 640 205" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="640,205 632,199 632,211" fill="#10b981" />

              {/* Stage 3: Delimited String Output */}
              <g transform="translate(640, 65)">
                <rect width="220" height="280" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" filter="url(#shadowGc)" />
                <rect x="0" y="0" width="220" height="32" rx="12" fill="url(#gradGcIndigo)" />
                <text x="110" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">3. Single Delimited Result</text>

                <rect x="15" y="50" width="190" height="200" rx="8" fill="#1e1b4b" stroke="#4338ca" />
                <text x="25" y="80" fill="#a5b4fc" fontSize="11" fontWeight="bold">batch: React Morning</text>
                <text x="25" y="110" fill="#38bdf8" fontSize="10.5" fontWeight="bold">leaderboard_roster:</text>

                <rect x="25" y="125" width="170" height="85" rx="6" fill="#0f172a" stroke="#6366f1" />
                <text x="32" y="145" fill="#34d399" fontSize="10" fontWeight="bold">"Mamata [94%]</text>
                <text x="32" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold">  ➔ Susmita [88%]</text>
                <text x="32" y="185" fill="#a5b4fc" fontSize="10" fontWeight="bold">  ➔ Debangshu [76%]"</text>

                <text x="110" y="268" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Compact 1-Row Output</text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 4: Interactive Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive GROUP_CONCAT Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic string serialization, delimiter variations, de-duplication, and multi-field formatting.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(concatScenarios).map((key) => {
                const item = concatScenarios[key];
                const isActive = selectedConcatMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedConcatMode(key)}
                    className={clsx(
                      "p-3 rounded-xl text-left transition-all border text-xs sm:text-sm font-medium",
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="font-semibold">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Simulation View */}
            {(() => {
              const active = concatScenarios[selectedConcatMode];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{active.title}</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border",
                        active.badgeColor === "emerald" && "bg-emerald-950 text-emerald-300 border-emerald-700",
                        active.badgeColor === "cyan" && "bg-cyan-950 text-cyan-300 border-cyan-700",
                        active.badgeColor === "indigo" && "bg-indigo-950 text-indigo-300 border-indigo-700",
                        active.badgeColor === "amber" && "bg-amber-950 text-amber-300 border-amber-700"
                      )}
                    >
                      {active.verdictText}
                    </span>
                  </div>

                  {/* SQL Preview */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                    <pre>{active.sqlQuery}</pre>
                  </div>

                  {/* Dynamic Table Output */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Group Identifier</th>
                          <th className="py-2.5 px-4">Aggregated Count</th>
                          <th className="py-2.5 px-4 font-bold text-cyan-300">Serialized GROUP_CONCAT Output</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.groupName}</td>
                            <td className="py-2.5 px-4 text-slate-400">{row.count}</td>
                            <td className="py-2.5 px-4 font-mono text-emerald-300 text-xs">{row.concatenatedText}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Architectural Note */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-cyan-400">Engineering Insight: </span>
                    {active.explanation}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations using MySQL's GROUP_CONCAT function.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">Merit Leaderboard & Rank List Aggregator</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Aggregates student examination ranks for public board display formatted with custom arrow separators.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    course_name,
    COUNT(*) AS total_candidates,
    GROUP_CONCAT(
        CONCAT(student_name, ' (Rank #', merit_rank, ')')
        ORDER BY merit_rank ASC 
        SEPARATOR ' ➔ '
    ) AS merit_roster
FROM course_exam_results
GROUP BY course_name;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">Warehouse Packing Slip Order Aggregator</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Collapses multi-line customer orders into a single printable line item string for automated packing slip generation.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    order_id,
    shipping_city,
    GROUP_CONCAT(
        CONCAT(sku_name, ' [Qty: ', qty, ']')
        ORDER BY sku_name ASC 
        SEPARATOR ' + '
    ) AS packing_list,
    SUM(line_total_inr) AS order_total_inr
FROM order_line_items
GROUP BY order_id, shipping_city;`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Ichapur Student Portal</span>
              </div>
              <h3 className="text-lg font-bold text-white">Student Certified Skill Badge Matrix</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Deduplicates and serializes all technology badges earned by a student into a comma-separated list for profile resumes.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    student_id,
    student_name,
    GROUP_CONCAT(
        DISTINCT skill_badge 
        ORDER BY skill_badge ASC 
        SEPARATOR ', '
    ) AS verified_skill_tags
FROM student_badges
GROUP BY student_id, student_name;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Jadavpur Tech Center</span>
              </div>
              <h3 className="text-lg font-bold text-white">Dynamic Search Keyword & Article Tag Indexer</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Builds searchable index tags from relational keyword tables for fast Elasticsearch or Full-Text search synchronization.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    article_id,
    article_title,
    GROUP_CONCAT(
        DISTINCT tag_slug 
        ORDER BY tag_slug ASC 
        SEPARATOR ' '
    ) AS search_keywords_blob
FROM article_tag_mappings
GROUP BY article_id, article_title;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pitfalls & Best Practice Checklist */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid silent string truncation, join duplication, and NULL poisoning when writing GROUP_CONCAT queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Silent Buffer Truncation:</strong>{" "}
                    If output exceeds <code className="text-rose-300">group_concat_max_len</code> (1MB default), MySQL truncates silently! Increase via <code className="text-emerald-300">SET SESSION group_concat_max_len = 10485760;</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Omitting DISTINCT in Multi-Table JOINs:</strong>{" "}
                    Joining tables multiplies rows, causing duplicate names (e.g. 'Mamata, Mamata, Mamata'). Always use <code className="text-emerald-300">GROUP_CONCAT(DISTINCT col)</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">NULL Poisoning in Nested CONCAT():</strong>{" "}
                    Writing <code className="text-rose-300">CONCAT(first, last)</code> inside GROUP_CONCAT yields NULL if any field is NULL. Use <code className="text-emerald-300">CONCAT_WS()</code> or <code className="text-emerald-300">COALESCE()</code> instead.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Non-Deterministic Output without ORDER BY:</strong>{" "}
                    Without an inline <code className="text-rose-300">ORDER BY</code>, MySQL returns strings in arbitrary physical storage order, causing testing inconsistencies.
                  </div>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>✓ Production Best Practices Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Always define explicit SEPARATOR:</strong> Keep query intent clear by specifying <code className="text-emerald-300">SEPARATOR ', '</code> or custom delimiters.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Sort deterministically:</strong> Always specify <code className="text-emerald-300">ORDER BY column ASC/DESC</code> inside the function.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Check buffer limits in migration scripts:</strong> Ensure reporting jobs execute <code className="text-cyan-300">SET SESSION group_concat_max_len = 10485760;</code> before aggregating large datasets.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Combine with CONCAT_WS:</strong> Format complex multi-column metadata neatly using <code className="text-indigo-300">CONCAT_WS(':', col1, col2)</code> inside GROUP_CONCAT.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your understanding of MySQL GROUP_CONCAT, syntax options, buffer limits, and cross-RDBMS equivalents.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 10: GROUP_CONCAT Function" />
          </div>
        </section>

        {/* SECTION 8: Teacher Note & Printable Text */}
        <section id="teacher-notes" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Teacher's Note & Raw Printable Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instructor summary by Sukanta Hui with printable raw text reference for classroom handouts and offline study.
            </p>
          </div>

          {/* Teacher Sukanta Hui Component */}
          <Teacher
            note={`Dear Students (Mamata, Susmita, Mahima, Abhronila, Debangshu),

GROUP_CONCAT() is one of MySQL's standout features. Instead of writing complex application-layer loops to stitch 1:N relational rows together, MySQL can do it in a single high-performance aggregation scan.

Remember the golden rules:
1. Always include DISTINCT when joining tables to avoid duplicated values.
2. Always specify ORDER BY inside the function so the list is deterministic.
3. Be aware of group_concat_max_len (default 1MB in MySQL 8.0). If you are building massive CSV exports, increase it with SET SESSION group_concat_max_len = 10485760.

Practice the interactive scenarios above and solve all 30 questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 10 – Concatenating Grouped Values with GROUP_CONCAT() (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic10;
