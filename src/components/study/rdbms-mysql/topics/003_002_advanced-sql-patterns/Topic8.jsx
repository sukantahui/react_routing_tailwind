import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Distribution & Percentile Functions: CUME_DIST() and PERCENT_RANK()
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on statistical distribution functions, cumulative distribution (CUME_DIST), relative percentile ranks (PERCENT_RANK), bell-curve grading, and entrance examination cutoffs.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedDistScenario, setSelectedDistScenario] = useState("cume_vs_percent_comparison");

  const distScenarios = {
    cume_vs_percent_comparison: {
      title: "1. CUME_DIST() vs PERCENT_RANK() Mathematical Comparison",
      badge: "Mathematical Behavior",
      badgeColor: "emerald",
      sqlQuery: `-- Comparing CUME_DIST() and PERCENT_RANK() on student exam scores (Sorted ASC):
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    -- 1. CUME_DIST: Fraction of rows <= current row (Range: >0 to 1.0):
    ROUND(CUME_DIST() OVER (ORDER BY s.exam_score_pct ASC), 4) AS cumulative_distribution,
    -- 2. PERCENT_RANK: Relative Rank Percentile (Range: 0.0 to 1.0):
    ROUND(PERCENT_RANK() OVER (ORDER BY s.exam_score_pct ASC), 4) AS percentile_rank,
    -- Converted to Human-Friendly Percentile:
    CONCAT(ROUND(PERCENT_RANK() OVER (ORDER BY s.exam_score_pct ASC) * 100.0, 1), 'th Percentile') AS score_percentile_label
FROM students s
ORDER BY s.exam_score_pct ASC;`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", score: "82.40%", cumeDist: "0.2500 (1/4 = 25%)", percentRank: "0.0000 (0.0th %tile)", label: "0.0th Percentile", status: "Anchor Floor" },
        { id: "STU-102", name: "Susmita Sen", score: "88.00%", cumeDist: "0.5000 (2/4 = 50%)", percentRank: "0.3333 (33.3rd %tile)", label: "33.3rd Percentile", status: "Lower Mid" },
        { id: "STU-101", name: "Mamata Hui", score: "94.50%", cumeDist: "0.7500 (3/4 = 75%)", percentRank: "0.6667 (66.7th %tile)", label: "66.7th Percentile", status: "Upper Mid" },
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", cumeDist: "1.0000 (4/4 = 100%)", percentRank: "1.0000 (100.0th %tile)", label: "100.0th Percentile", status: "Topper Ceiling" },
      ],
      explanation:
        "`PERCENT_RANK()` anchors the lowest score at exactly 0.0000 and the highest score at 1.0000. In contrast, `CUME_DIST()` measures the actual fraction of rows $\\le$ current row (0.2500 to 1.0000).",
    },
    top_10_percentile_scholarship: {
      title: "2. Top 10th Percentile Cutoff Filtering (PERCENT_RANK >= 0.90)",
      badge: "Top 10% Cutoff",
      badgeColor: "cyan",
      sqlQuery: `-- Isolating the Top 10% Performing Cohort across the entire academy:
WITH ScoredCohort AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        PERCENT_RANK() OVER (ORDER BY s.exam_score_pct ASC) AS raw_percentile
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
-- Main Query filters Top 10% (Percentile >= 0.90):
SELECT 
    student_id, 
    student_name, 
    dept_name, 
    exam_score_pct,
    ROUND(raw_percentile * 100.0, 2) AS exact_percentile,
    '🏆 Gold Scholarship Awarded' AS scholarship_award
FROM ScoredCohort
WHERE raw_percentile >= 0.9000
ORDER BY exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", cumeDist: "1.0000", percentRank: "1.0000", label: "100.00th Percentile", status: "🏆 Gold Scholarship Awarded" },
      ],
      explanation:
        "Wrapping `PERCENT_RANK()` inside a CTE enables clean mathematical cutoff filtering (`raw_percentile >= 0.9000`) for enterprise honors and scholarship disbursement.",
    },
    bell_curve_letter_grading: {
      title: "3. Relative Bell-Curve Grading with CUME_DIST() & CASE",
      badge: "Bell-Curve Grades",
      badgeColor: "amber",
      sqlQuery: `-- Assigning norm-referenced letter grades based on cumulative distribution:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    ROUND(CUME_DIST() OVER (ORDER BY s.exam_score_pct ASC), 4) AS dist_fraction,
    CASE 
        WHEN CUME_DIST() OVER (ORDER BY s.exam_score_pct ASC) >= 0.75 THEN 'A+ (Top Quartile)'
        WHEN CUME_DIST() OVER (ORDER BY s.exam_score_pct ASC) >= 0.50 THEN 'A (Above Average)'
        WHEN CUME_DIST() OVER (ORDER BY s.exam_score_pct ASC) >= 0.25 THEN 'B (Average Tier)'
        ELSE 'C (Needs Remediation)'
    END AS bell_curve_grade
FROM students s
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", cumeDist: "1.0000 (Top 25%)", percentRank: "1.0000", label: "Grade: A+", status: "A+ (Top Quartile)" },
        { id: "STU-101", name: "Mamata Hui", score: "94.50%", cumeDist: "0.7500 (Top 25%)", percentRank: "0.6667", label: "Grade: A+", status: "A+ (Top Quartile)" },
        { id: "STU-102", name: "Susmita Sen", score: "88.00%", cumeDist: "0.5000 (Mid 50%)", percentRank: "0.3333", label: "Grade: A", status: "A (Above Average)" },
        { id: "STU-104", name: "Debangshu Roy", score: "82.40%", cumeDist: "0.2500 (Low 25%)", percentRank: "0.0000", label: "Grade: B", status: "B (Average Tier)" },
      ],
      explanation:
        "`CUME_DIST()` effortlessly implements relative norm-referenced bell curve grading, automatically grouping students into grade tiers based on cumulative distribution thresholds.",
    },
    cross_subject_normalization: {
      title: "4. Cross-Subject Standardized Percentile Normalization",
      badge: "Standardized Tests",
      badgeColor: "rose",
      sqlQuery: `-- Standardizing exam scores across subjects with differing difficulty:
SELECT 
    s.student_name,
    e.subject_name,
    e.raw_score,
    -- Percentile specific to that subject's difficulty:
    ROUND(PERCENT_RANK() OVER (
        PARTITION BY e.subject_id 
        ORDER BY e.raw_score ASC
    ) * 100.0, 1) AS subject_standardized_percentile
FROM subject_exam_scores e
JOIN students s ON e.student_id = s.student_id
ORDER BY e.subject_name, subject_standardized_percentile DESC;`,
      resultRows: [
        { id: "SUB-CS", name: "Mamata Hui", score: "CS Paper: 94.50", cumeDist: "CS Partition", percentRank: "1.0000", label: "100.0th Percentile", status: "Standardized Top" },
        { id: "SUB-CS", name: "Susmita Sen", score: "CS Paper: 88.00", cumeDist: "CS Partition", percentRank: "0.0000", label: "0.0th Percentile", status: "Standardized Base" },
        { id: "SUB-IT", name: "Abhronila Saha", score: "IT Paper: 96.20", cumeDist: "IT Partition", percentRank: "1.0000", label: "100.0th Percentile", status: "Standardized Top" },
        { id: "SUB-IT", name: "Debangshu Roy", score: "IT Paper: 82.40", cumeDist: "IT Partition", percentRank: "0.0000", label: "0.0th Percentile", status: "Standardized Base" },
      ],
      explanation:
        "`PARTITION BY e.subject_id` normalizes scores across distinct exam papers, allowing fair student evaluation regardless of test difficulty.",
    },
  };

  const navItems = [
    { id: "dist-concept", label: "1. Distribution Functions Mechanics" },
    { id: "cume-vs-percent", label: "2. CUME_DIST vs PERCENT_RANK" },
    { id: "svg-diagrams", label: "3. Scale & Bell-Curve SVGs" },
    { id: "interactive-sandbox", label: "4. Live Distribution Workbench" },
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
            <span>Topic 8 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Statistical Analytics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            CUME_DIST() &amp; PERCENT_RANK()
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master statistical distribution window functions. Understand cumulative distribution with <code className="text-cyan-300 font-mono">CUME_DIST()</code>, relative rank percentiles with <code className="text-cyan-300 font-mono">PERCENT_RANK()</code>, bell-curve grading, and competitive entrance cutoffs.
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
        <section id="dist-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of Distribution Functions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Measuring statistical relative positioning and cumulative density across sorted partitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📊</span> CUME_DIST()
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates the fraction of rows with values $\le$ current row ($NP / N$). Range: $(0.0, 1.0]$.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📈</span> PERCENT_RANK()
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates relative rank on a 0.0 to 1.0 continuous scale ($(Rank-1)/(N-1)$). Bottom row is always 0.0.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🎯</span> Top Cutoff Filtering
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter for Top 10th percentile candidates directly: `WHERE PERCENT_RANK() &gt;= 0.90` in a CTE!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CUME_DIST vs PERCENT_RANK */}
        <section id="cume-vs-percent" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Mathematical Comparison: CUME_DIST vs PERCENT_RANK
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing the formulas, mathematical ranges, and semantics on sorted exam data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. CUME_DIST() (Cumulative Fraction)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formula: <code className="text-emerald-300 font-mono">NP / Total Rows</code>. Always strictly greater than 0. Answers: "What percentage of students scored at or below this student?"
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. PERCENT_RANK() (Relative Percentile)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formula: <code className="text-cyan-300 font-mono">(RANK - 1) / (Total Rows - 1)</code>. First row is always 0.0000. Answers: "What percentage of peers does this student outperform?"
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Mathematical Scale &amp; Bell-Curve
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing statistical range scales with bell-curve percentile cohort allocations.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Scale Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Mathematical Scale Comparison: CUME_DIST (0, 1] vs PERCENT_RANK [0, 1]
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* CUME_DIST Bar */}
                  <g>
                    <rect x="30" y="30" width="790" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">CUME_DIST() Scale: (0.00 &lt; x &lt;= 1.00) [Row 1 = 1/N = 0.25 | Top Row = 1.00]</text>
                  </g>

                  {/* PERCENT_RANK Bar */}
                  <g>
                    <rect x="30" y="90" width="790" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="115" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">PERCENT_RANK() Scale: [0.00 &lt;= x &lt;= 1.00] [Row 1 = 0.00 (Anchor) | Top Row = 1.00]</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Bell Curve */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Norm-Referenced Bell-Curve Cohort Thresholds
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1 */}
                  <g>
                    <rect x="30" y="30" width="180" height="100" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">CUME_DIST &lt; 0.25</text>
                    <rect x="40" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="120" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Bottom 25%</text>
                    <text x="120" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Grade C (Remediation)</text>
                  </g>

                  {/* Tier 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">0.25 &lt;= CD &lt; 0.50</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Average Tier</text>
                    <text x="320" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Grade B</text>
                  </g>

                  {/* Tier 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">0.50 &lt;= CD &lt; 0.75</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Above Average</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Grade A</text>
                  </g>

                  {/* Tier 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">CUME_DIST &gt;= 0.75</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="740" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Top 25% Distinction</text>
                    <text x="740" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Grade A+ (Gold Honors)</text>
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
              4. Interactive Distribution Functions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test CUME_DIST fractions, PERCENT_RANK relative percentiles, top 10% cutoff filtering, and bell-curve letter grading live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(distScenarios).map(([key, item]) => {
              const isActive = selectedDistScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDistScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Distribution"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{distScenarios[selectedDistScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{distScenarios[selectedDistScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Statistical Distribution Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Distribution Query</span>
                <span className="text-emerald-400">Continuous 0.0 - 1.0 Range</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {distScenarios[selectedDistScenario].sqlQuery}
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
                    <th className="py-3 px-4 text-cyan-400">CUME_DIST() Fraction</th>
                    <th className="py-3 px-4 text-indigo-400">PERCENT_RANK() Value</th>
                    <th className="py-3 px-4 text-amber-400">Human Percentile Label</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {distScenarios[selectedDistScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-cyan-300">{row.cumeDist}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.percentRank}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.label}</td>
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
              Real-world entrance exam rankings and standardized score curves.
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
                  Automated Top 5th Percentile Scholarship Selection in West Bengal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected the state entrance exam scholarship pipeline: By computing <code className="text-emerald-300 font-mono">PERCENT_RANK() OVER (ORDER BY marks ASC)</code> inside a CTE, the system automatically extracted all candidates scoring in the 95th percentile or higher (<code className="text-cyan-300 font-mono">WHERE pr &gt;= 0.95</code>) across 50,000 applicants in under 80 milliseconds!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ High-Speed 95th Percentile Extraction:
WITH ApplicantPercentiles AS (
    SELECT student_id, marks, PERCENT_RANK() OVER (ORDER BY marks ASC) AS pr
    FROM entrance_applicants
)
SELECT student_id, marks, (pr * 100.0) AS percentile_score
FROM ApplicantPercentiles
WHERE pr >= 0.95;`}
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
              Avoid descending sort inversion and disallowed frame clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Inverted Percentile via ORDER BY DESC
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Sorting <code className="text-rose-300 font-mono">ORDER BY score DESC</code> assigns 0.0000 to the topper and 1.0000 to the lowest score, inverting standard percentile logic.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always sort <code className="text-emerald-400 font-mono">ORDER BY score ASC</code> for percentile ranks!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Multiply by 100.0 for User Reports
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Multiply <code className="text-emerald-400 font-mono">PERCENT_RANK() * 100.0</code> to present friendly numbers (e.g. 96.5th Percentile) on UI scorecards.
              </p>
              <div className="text-xs text-slate-400">
                Improves readability for non-technical stakeholders.
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
              Key takeaways for distribution and percentile functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Distribution Function Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Always sort <code className="text-cyan-300 font-mono">ORDER BY val ASC</code> for percentile ranking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">PERCENT_RANK()</code> for entrance exam thresholds (0.0 to 1.0).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">CUME_DIST()</code> for cumulative distribution fractions (&gt;0 to 1.0).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Partition by subject (<code className="text-cyan-300 font-mono">PARTITION BY subject_id</code>) for standardized scoring.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the difference between NTILE and PERCENT_RANK...”</span>
                  `NTILE(100)` assigns discrete integer bucket numbers from 1 to 100, whereas `PERCENT_RANK()` computes exact mathematical decimals between 0.0 and 1.0!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about composite index support...”</span>
                  An index on `(dept_id, exam_score_pct ASC)` evaluates `PERCENT_RANK()` directly in index stream order with zero filesort!
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
              Comprehensive reference questions covering CUME_DIST, PERCENT_RANK, mathematical formulas, bell-curve grading, and entrance examination cutoffs.
            </p>
          </div>

          <FAQTemplate
            title="Distribution &amp; Percentile Functions FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Distribution & Percentile Functions: CUME_DIST() and PERCENT_RANK()"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Distribution functions like CUME_DIST() and PERCENT_RANK() allow you to perform statistical norm-referenced evaluation directly inside the relational database engine. Always remember to sort in ASCENDING order when computing percentiles so that the lowest score is anchored at 0.0 and the topper receives 1.0 (100th percentile). Multiply by 100.0 to format the output for human-friendly executive reporting."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
