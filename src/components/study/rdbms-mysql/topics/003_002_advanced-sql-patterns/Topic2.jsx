import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Ranking Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), and NTILE()
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on analytical ranking functions, tie-handling mechanics, Top-N filtering in CTEs, table deduplication, and NTILE quartile bucketing.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedRankingScenario, setSelectedRankingScenario] = useState("tied_scores_comparison");

  const rankingScenarios = {
    tied_scores_comparison: {
      title: "1. The 4 Ranking Functions on Tied Scores (94.50% Tie)",
      badge: "Tie Behavior Test",
      badgeColor: "emerald",
      sqlQuery: `-- Comparing all 4 ranking functions on a tied dataset (Mamata and Susmita tied at 94.50%):
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    -- 1. ROW_NUMBER: Strictly Unique (1, 2, 3, 4)
    ROW_NUMBER() OVER (ORDER BY s.exam_score_pct DESC) AS row_num,
    -- 2. RANK: Tied get same, skips next (1, 2, 2, 4)
    RANK()       OVER (ORDER BY s.exam_score_pct DESC) AS std_rank,
    -- 3. DENSE_RANK: Tied get same, NO gaps (1, 2, 2, 3)
    DENSE_RANK() OVER (ORDER BY s.exam_score_pct DESC) AS dense_rank,
    -- 4. NTILE(2): Divided into 2 equal halves (1, 1, 2, 2)
    NTILE(2)     OVER (ORDER BY s.exam_score_pct DESC) AS quartile_bucket
FROM students s
ORDER BY s.exam_score_pct DESC, s.student_id ASC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", rowNum: "1", stdRank: "1", denseRank: "1", ntileVal: "Bucket 1 (Top Half)", status: "Sole #1" },
        { id: "STU-101", name: "Mamata Hui", score: "94.50% (TIE)", rowNum: "2", stdRank: "2", denseRank: "2", ntileVal: "Bucket 1 (Top Half)", status: "Tied Rank 2" },
        { id: "STU-102", name: "Susmita Sen", score: "94.50% (TIE)", rowNum: "3", stdRank: "2", denseRank: "2", ntileVal: "Bucket 2 (Bottom Half)", status: "Tied Rank 2" },
        { id: "STU-104", name: "Debangshu Roy", score: "82.40%", rowNum: "4", stdRank: "4 (SKIPPED 3!)", denseRank: "3 (NO GAP!)", ntileVal: "Bucket 2 (Bottom Half)", status: "Rank vs Dense" },
      ],
      explanation:
        "Observe Debangshu Roy: `RANK()` assigns 4 (skipping 3 due to the tie at 2), while `DENSE_RANK()` assigns 3 (no gaps). `ROW_NUMBER()` assigns strictly unique integers 1, 2, 3, 4.",
    },
    top_n_per_department: {
      title: "2. Top-N Per Department using DENSE_RANK() in a CTE",
      badge: "Top-N CTE Pattern",
      badgeColor: "cyan",
      sqlQuery: `-- Finding Top 1 Student in EACH Department (Clean CTE Pattern):
WITH RankedDepartmentStudents AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        DENSE_RANK() OVER (PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC) AS dept_rank
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
-- Main Query filters Top 1 rank cleanly:
SELECT student_id, student_name, dept_name, exam_score_pct, dept_rank
FROM RankedDepartmentStudents
WHERE dept_rank = 1
ORDER BY dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", score: "94.50%", rowNum: "CS Lead", stdRank: "Rank #1", denseRank: "Dept Rank 1", ntileVal: "Department Gold", status: "Top 1 CS" },
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", rowNum: "IT Lead", stdRank: "Rank #1", denseRank: "Dept Rank 1", ntileVal: "Department Gold", status: "Top 1 IT" },
      ],
      explanation:
        "Using `DENSE_RANK()` inside a CTE is the gold standard for Top-N per category queries in MySQL 8.0+, executing in a single sorted pass without nested loops.",
    },
    ntile_quartile_segmentation: {
      title: "3. Student Quartile Segmentation with NTILE(4)",
      badge: "NTILE Quartiles",
      badgeColor: "amber",
      sqlQuery: `-- Segmenting students into 4 performance quartiles (Q1 to Q4):
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    NTILE(4) OVER (ORDER BY s.exam_score_pct DESC) AS performance_quartile,
    CASE NTILE(4) OVER (ORDER BY s.exam_score_pct DESC)
        WHEN 1 THEN '🌟 Q1: High Distinction'
        WHEN 2 THEN '🟢 Q2: Above Average'
        WHEN 3 THEN '🟡 Q3: Average Tier'
        WHEN 4 THEN '🔴 Q4: Targeted Remediation'
    END AS cohort_segment
FROM students s
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", rowNum: "Quartile 1", stdRank: "Top 25%", denseRank: "Tier 1", ntileVal: "🌟 Q1: High Distinction", status: "Q1" },
        { id: "STU-101", name: "Mamata Hui", score: "94.50%", rowNum: "Quartile 2", stdRank: "50-75%", denseRank: "Tier 2", ntileVal: "🟢 Q2: Above Average", status: "Q2" },
        { id: "STU-102", name: "Susmita Sen", score: "88.00%", rowNum: "Quartile 3", stdRank: "25-50%", denseRank: "Tier 3", ntileVal: "🟡 Q3: Average Tier", status: "Q3" },
        { id: "STU-104", name: "Debangshu Roy", score: "82.40%", rowNum: "Quartile 4", stdRank: "Bottom 25%", denseRank: "Tier 4", ntileVal: "🔴 Q4: Targeted Remediation", status: "Q4" },
      ],
      explanation:
        "`NTILE(4)` divides ordered student scores into 4 equal-frequency quartiles, enabling statistical cohort segmentation for automated scholarship or remediation actions.",
    },
    table_deduplication_pattern: {
      title: "4. Table Deduplication Pattern with ROW_NUMBER()",
      badge: "Deduplication",
      badgeColor: "rose",
      sqlQuery: `-- Identifying and deleting duplicate email submissions:
WITH NumberedSubmissions AS (
    SELECT 
        submission_id,
        student_id,
        email_address,
        submission_date,
        -- Number duplicate emails; newest gets rn = 1:
        ROW_NUMBER() OVER (
            PARTITION BY email_address 
            ORDER BY submission_date DESC
        ) AS duplicate_rank
    FROM raw_admissions_log
)
-- Select only duplicate records (duplicate_rank > 1) to inspect/delete:
SELECT submission_id, student_id, email_address, submission_date, duplicate_rank
FROM NumberedSubmissions
WHERE duplicate_rank > 1;`,
      resultRows: [
        { id: "SUB-802", name: "Mamata Hui (Duplicate)", score: "2026-06-01", rowNum: "RN: 2", stdRank: "Duplicate Entry", denseRank: "Purge Candidate", ntileVal: "Flagged for Deletion", status: "Duplicate (Delete)" },
        { id: "SUB-804", name: "Abhronila Saha (Duplicate)", score: "2026-06-02", rowNum: "RN: 2", stdRank: "Duplicate Entry", denseRank: "Purge Candidate", ntileVal: "Flagged for Deletion", status: "Duplicate (Delete)" },
      ],
      explanation:
        "The standard SQL deduplication pattern: Partition by the natural duplicate key (`email_address`), order by timestamp descending, and filter `duplicate_rank > 1` to isolate all redundant duplicates.",
    },
  };

  const navItems = [
    { id: "ranking-concept", label: "1. The 4 Ranking Functions" },
    { id: "decision-matrix", label: "2. Architectural Decision Matrix" },
    { id: "svg-diagrams", label: "3. Tie Matrix & NTILE Bucket SVGs" },
    { id: "interactive-sandbox", label: "4. Live Ranking Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_002</span>
            <span>•</span>
            <span>Topic 2 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Ranking &amp; Bucketing
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            ROW_NUMBER(), RANK(), DENSE_RANK() &amp; NTILE()
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the 4 fundamental analytical ranking functions in MySQL 8.0+. Understand tie handling, rank gaps, Top-N filtering in CTEs, table deduplication, and statistical quartile segmentation.
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
        {/* SECTION 1: Concept */}
        <section id="ranking-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Essential Ranking Functions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing how each function assigns ranks when values are unique versus tied.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🔢</span> ROW_NUMBER()
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strictly unique integers ($1, 2, 3, 4$). Never produces ties; ideal for UI pagination and deduplication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🏆</span> RANK()
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tied values receive the same rank, but skips subsequent rank numbers ($1, 2, 2, 4$). Standard Olympic athletic model.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🥇</span> DENSE_RANK()
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tied values receive the same rank with NO skipped numbers ($1, 2, 2, 3$). Perfect for Top-N tier thresholds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>📊</span> NTILE(n)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Divides ordered rows into $n$ equal-frequency buckets ($1, 1, 2, 2, 3, 3$). Used for quartiles and deciles.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Decision Matrix */}
        <section id="decision-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Architectural Decision Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Choosing the correct ranking function for business operations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Business Use Case</th>
                  <th className="py-3.5 px-4 text-emerald-400">Recommended Function</th>
                  <th className="py-3.5 px-4 text-white">Sequence on Ties `[100, 90, 90, 80]`</th>
                  <th className="py-3.5 px-4 text-amber-400">Why It's Optimal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">UI Table Pagination / Row Slicing</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">ROW_NUMBER()</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">1, 2, 3, 4</td>
                  <td className="py-3 px-4 text-emerald-400">Guarantees exactly N rows per page</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Top-3 Academic Honors / Salary Tiers</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">DENSE_RANK()</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">1, 2, 2, 3</td>
                  <td className="py-3 px-4 text-emerald-400">Zero numerical sequence gaps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Competitive Sports Contests</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">RANK()</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">1, 2, 2, 4 (Skips 3)</td>
                  <td className="py-3 px-4 text-emerald-400">Standard Olympic ranking model</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Customer Quartiles / RFM Scoring</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">NTILE(4)</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">1, 1, 2, 2</td>
                  <td className="py-3 px-4 text-emerald-400">Divides data into 4 equal segments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Tie Sequence Matrix & NTILE Bucketing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing ranking output on tied data against NTILE bucket allocations.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Tie Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Ranking Functions Behavior on Tied Scores (96, 94.5, 94.5, 82.4)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Headers */}
                  <rect x="20" y="20" width="810" height="25" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="100" y="37" fill="#94a3b8" fontSize="9 font-mono" textAnchor="middle">Student / Score</text>
                  <text x="280" y="37" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">ROW_NUMBER()</text>
                  <text x="460" y="37" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">RANK() [Gaps]</text>
                  <text x="640" y="37" fill="#fcd34d" fontSize="9 font-mono" textAnchor="middle">DENSE_RANK() [No Gaps]</text>

                  {/* Row 1: 96.2% */}
                  <text x="100" y="65" fill="#f8fafc" fontSize="9 font-mono" textAnchor="middle">Abhronila (96.2%)</text>
                  <text x="280" y="65" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">1</text>
                  <text x="460" y="65" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">1</text>
                  <text x="640" y="65" fill="#fcd34d" fontSize="9 font-mono" textAnchor="middle">1</text>

                  {/* Row 2: 94.5% */}
                  <text x="100" y="90" fill="#f8fafc" fontSize="9 font-mono" textAnchor="middle">Mamata (94.5% TIE)</text>
                  <text x="280" y="90" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">2</text>
                  <text x="460" y="90" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">2</text>
                  <text x="640" y="90" fill="#fcd34d" fontSize="9 font-mono" textAnchor="middle">2</text>

                  {/* Row 3: 94.5% */}
                  <text x="100" y="115" fill="#f8fafc" fontSize="9 font-mono" textAnchor="middle">Susmita (94.5% TIE)</text>
                  <text x="280" y="115" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">3</text>
                  <text x="460" y="115" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">2</text>
                  <text x="640" y="115" fill="#fcd34d" fontSize="9 font-mono" textAnchor="middle">2</text>

                  {/* Row 4: 82.4% */}
                  <text x="100" y="140" fill="#f8fafc" fontSize="9 font-mono" textAnchor="middle">Debangshu (82.4%)</text>
                  <text x="280" y="140" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">4</text>
                  <text x="460" y="140" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">4 (Skips 3!)</text>
                  <text x="640" y="140" fill="#34d399" fontSize="9 font-mono" textAnchor="middle">3 (No Gap!)</text>
                </svg>
              </div>
            </div>

            {/* SVG 2: NTILE Buckets */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> NTILE(4) Quartile Equal-Frequency Bucket Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Bucket 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Quartile 1 (Top 25%)</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="110" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score &gt;= 95%</text>
                    <text x="110" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">High Distinction</text>
                  </g>

                  {/* Bucket 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Quartile 2 (50-75%)</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Score 90% - 95%</text>
                    <text x="320" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Above Average</text>
                  </g>

                  {/* Bucket 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Quartile 3 (25-50%)</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Score 85% - 90%</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Average Tier</text>
                  </g>

                  {/* Bucket 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Quartile 4 (Bottom 25%)</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Score &lt; 85%</text>
                    <text x="740" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Remediation Cohort</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Ranking Functions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test tied value handling, Top-N filtering in CTEs, NTILE quartile bucketing, and table deduplication live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(rankingScenarios).map(([key, item]) => {
              const isActive = selectedRankingScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRankingScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Test" : "○ Run Ranking"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{rankingScenarios[selectedRankingScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{rankingScenarios[selectedRankingScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Ranking Analytic Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Ranking Statement</span>
                <span className="text-emerald-400">Tie &amp; Bucket Engine</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {rankingScenarios[selectedRankingScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Exam Score</th>
                    <th className="py-3 px-4 text-cyan-400">ROW_NUMBER()</th>
                    <th className="py-3 px-4 text-indigo-400">RANK()</th>
                    <th className="py-3 px-4 text-amber-400">DENSE_RANK()</th>
                    <th className="py-3 px-4 text-rose-400">NTILE / Segment</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {rankingScenarios[selectedRankingScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-cyan-300">{row.rowNum}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.stdRank}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.denseRank}</td>
                      <td className="py-3 px-4 text-rose-300 font-sans">{row.ntileVal}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world academic ranking and deduplication architectures.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Eliminating Missing Tiers in Academic Scholarship Allocation
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited scholarship tier distribution: When student Mamata and Susmita tied for 2nd place with 94.50%, a standard <code className="text-rose-300 font-mono">RANK()</code> query assigned 4th place to Debangshu, skipping 3rd place entirely and leaving the ₹15,000 Bronze scholarship unallocated! Switching to <code className="text-emerald-300 font-mono">DENSE_RANK()</code> guaranteed that Debangshu received 3rd place without skipping tiers!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ DENSE_RANK guarantees Top 3 tiers are always filled without skips:
WITH RankedTiers AS (
    SELECT student_name, exam_score_pct, DENSE_RANK() OVER (ORDER BY exam_score_pct DESC) AS tier_rank
    FROM students
)
SELECT student_name, exam_score_pct, tier_rank FROM RankedTiers WHERE tier_rank <= 3;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid non-deterministic row numbering and rank confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Non-Deterministic ROW_NUMBER()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If scores are tied and <code className="text-rose-300 font-mono">ORDER BY score DESC</code> lacks a unique tie-breaker, MySQL assigns row numbers arbitrarily, leading to unstable pagination across queries.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always add the Primary Key: <code className="text-emerald-400 font-mono">ORDER BY score DESC, student_id ASC</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Wrap in CTEs for Filtering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Since ranking functions evaluate at Phase 5, they cannot appear in <code className="text-emerald-400 font-mono">WHERE</code> directly. Always compute ranks inside a CTE and filter in the main query!
              </p>
              <div className="text-xs text-slate-400">
                The universal standard design pattern for Top-N filtering.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for ranking functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Ranking Function Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">ROW_NUMBER()</code> for unique row deduplication and UI pagination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DENSE_RANK()</code> for Top-N tiers without skipping numbers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">RANK()</code> for athletic sports competitions with gaps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">NTILE(4)</code> for equal-frequency quartile segmentation.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the N-th highest salary pattern...”</span>
                  To find the 2nd highest salary, compute <code className="text-cyan-300 font-mono">DENSE_RANK() OVER (ORDER BY salary DESC)</code> inside a CTE and filter <code className="text-cyan-300 font-mono">WHERE rnk = 2</code>!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about table deduplication...”</span>
                  Partitioning by natural duplicate keys with <code className="text-cyan-300 font-mono">ROW_NUMBER()</code> is the cleanest and fastest way to delete duplicate rows in MySQL!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering ROW_NUMBER, RANK, DENSE_RANK, NTILE, tie-handling mechanics, and Top-N queries.
            </p>
          </div>

          <FAQTemplate
            title="Ranking Functions FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Ranking Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), and NTILE()"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Ranking functions are the backbone of real-world business analytics. The golden rule is simple: use ROW_NUMBER() when you need unique numbering for pagination or deduplication, use DENSE_RANK() when you are evaluating performance tiers without skipping ranks, and use NTILE() for quartile segmentation. Always remember to add a secondary tie-breaker in your ORDER BY to make your row numbers 100% deterministic."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
