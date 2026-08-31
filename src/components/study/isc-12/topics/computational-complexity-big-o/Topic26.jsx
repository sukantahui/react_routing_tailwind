import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import permutationGenerationJava from "./topic26_files/PermutationGeneration.java?raw";
import factorialTimeDemoJava from "./topic26_files/FactorialTimeDemo.java?raw";
import tspBruteForceJava from "./topic26_files/TSPBruteForce.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic26_files/topic26_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic26 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // ─── Animation helpers ──────────────────────────────────────────────────────
  const sectionClass = "animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-100";
  const staggerClass = (index) =>
    `animate-[fadeSlideUp_0.5s_ease-out_${index * 0.08}s_forwards] opacity-100`;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans leading-relaxed antialiased transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">

        {/* ─── Header ────────────────────────────────────────────────────────── */}
        <header className={clsx(sectionClass, "space-y-4")}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Topic 26
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(n!) – Factorial Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-red-600 dark:text-red-400 font-semibold">worst of the worst</span> —
            algorithms that grow faster than exponential, only feasible for the tiniest inputs.
          </p>
        </header>

        {/* ─── Tab Navigation ────────────────────────────────────────────────── */}
        <nav className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          {["overview", "code", "faq"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:shadow-indigo-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {tab === "overview" && "📖 Overview"}
              {tab === "code" && "☕ Code Examples"}
              {tab === "faq" && "❓ FAQ"}
            </button>
          ))}
        </nav>

        {/* ─── Tab Content ────────────────────────────────────────────────────── */}
        <div className="space-y-12">

          {/* ═══ OVERVIEW TAB ═══ */}
          {activeTab === "overview" && (
            <div className="space-y-12">

              {/* ── Introduction ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> What is O(n!) – Factorial Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(n!)</strong> — pronounced "order n factorial" — means the algorithm's runtime grows
                    as the <strong>factorial</strong> of the input size: n! = n × (n-1) × (n-2) × ... × 1.
                    This is the <strong>worst</strong> of all common complexity classes, growing even faster than
                    exponential (2ⁿ).
                  </p>
                  <p>
                    Factorial time algorithms typically involve <strong>generating all permutations</strong> of
                    a set, or solving problems by <strong>trying every possible ordering</strong>. Classic examples
                    include the brute-force Traveling Salesman Problem (TSP), generating all permutations of an array,
                    and the n-queens problem (in the worst case).
                  </p>
                  <p>
                    Think of it like arranging books on a shelf: for 5 books, there are 120 arrangements. For 10 books,
                    there are 3,628,800 arrangements. For 20 books, there are over 2.4 × 10¹⁸ — more than the number
                    of seconds since the Big Bang! That's factorial growth.
                  </p>
                </div>
              </section>

              {/* ── Common O(n!) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Common O(n!) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔀",
                      title: "Permutation Generation",
                      desc: "Generating all possible orderings of n elements — exactly n! permutations.",
                      example: "for each permutation of {1,2,...,n}",
                    },
                    {
                      icon: "🗺️",
                      title: "Traveling Salesman (Brute Force)",
                      desc: "Checking all possible routes (n! permutations) to find the shortest.",
                      example: "bruteForceTSP(distances);",
                    },
                    {
                      icon: "👑",
                      title: "N-Queens (Worst Case)",
                      desc: "Backtracking can be O(n!) in the worst case (all placements).",
                      example: "nQueens(n);",
                    },
                    {
                      icon: "🧩",
                      title: "Assignment Problem (Brute Force)",
                      desc: "Trying all possible assignments of n tasks to n workers.",
                      example: "allAssignments();",
                    },
                    {
                      icon: "🔢",
                      title: "Determinant Calculation (Naive)",
                      desc: "Naive determinant using Laplace expansion is O(n!).",
                      example: "determinant(matrix);",
                    },
                    {
                      icon: "🧮",
                      title: "Brute-force Search in Permutation Space",
                      desc: "Problems that require checking all possible orderings.",
                      example: "allHamiltonianPaths();",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40",
                        "transition-all duration-300 hover:shadow-md hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-red-600 dark:text-red-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Visual Intuition: Factorial Explosion
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Factorial growth"
                  >
                    <defs>
                      <marker id="arrow26" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="100" x2="760" y2="100" />
                      <line x1="60" y1="150" x2="760" y2="150" />
                      <line x1="60" y1="200" x2="760" y2="200" />
                      <line x1="60" y1="250" x2="760" y2="250" />
                      <line x1="60" y1="50" x2="60" y2="300" />
                      <line x1="207" y1="50" x2="207" y2="300" />
                      <line x1="354" y1="50" x2="354" y2="300" />
                      <line x1="501" y1="50" x2="501" y2="300" />
                      <line x1="648" y1="50" x2="648" y2="300" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="280" x2="760" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="310" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="180" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,180)">Operations</text>

                    {/* Factorial curve (n!) */}
                    <path d="M60 270 L80 265 L100 255 L120 235 L140 200 L160 150 L180 90 L200 55 L220 50 L240 50 L260 50 L280 50 L300 50 L320 50 L340 50 L360 50 L380 50 L400 50 L420 50 L440 50 L460 50 L480 50 L500 50 L520 50 L540 50 L560 50 L580 50 L600 50 L620 50 L640 50 L660 50 L680 50 L700 50 L720 50 L740 50 L760 50" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
                    <text x="770" y="55" fontSize="12" fill="#f87171" fontWeight="bold">O(n!)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="55" r="8" fill="#f87171">
                      <animate attributeName="cx" values="60;700;60" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="6s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on curve */}
                    <text x="80" y="275" fontSize="10" fill="#6b7280">n=1</text>
                    <text x="110" y="260" fontSize="10" fill="#6b7280">n=2</text>
                    <text x="140" y="235" fontSize="10" fill="#6b7280">n=3</text>
                    <text x="180" y="195" fontSize="10" fill="#6b7280">n=4</text>
                    <text x="220" y="100" fontSize="10" fill="#6b7280">n=5</text>
                    <text x="260" y="60" fontSize="10" fill="#6b7280">n=6</text>
                    <text x="320" y="55" fontSize="10" fill="#6b7280">n≥7</text>

                    {/* Fill under curve */}
                    <path d="M60 270 L760 50 L760 280 L60 280 Z" fill="url(#factGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="factGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f87171" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(n!) grows even faster than O(2ⁿ). For n=10, 10! ≈ 3.6 × 10⁶, while 2¹⁰ = 1024.
                    For n=20, 20! ≈ 2.4 × 10¹⁸ — astronomical. Factorial algorithms are only useful for n ≤ 10.
                  </p>
                </div>
              </section>

              {/* ── Comparison: n! vs 2ⁿ vs n² ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Comparison: n! vs 2ⁿ vs n²
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">n</th>
                        <th className="px-4 py-2 border-b">n²</th>
                        <th className="px-4 py-2 border-b">2ⁿ</th>
                        <th className="px-4 py-2 border-b">n!</th>
                        <th className="px-4 py-2 border-b">Feasibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["1", "1", "2", "1", "Instant"],
                        ["3", "9", "8", "6", "Instant"],
                        ["5", "25", "32", "120", "Instant"],
                        ["7", "49", "128", "5040", "Instant"],
                        ["10", "100", "1024", "3,628,800", "~0.1s"],
                        ["12", "144", "4096", "479,001,600", "~1s"],
                        ["15", "225", "32,768", "1.3×10¹²", "~1 day"],
                        ["20", "400", "1,048,576", "2.4×10¹⁸", "Impossible"],
                      ].map(([n, n2, twoN, nFact, feasible], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono">{n}</td>
                          <td className="px-4 py-2 font-mono">{n2}</td>
                          <td className="px-4 py-2 font-mono">{twoN}</td>
                          <td className="px-4 py-2 font-mono">{nFact}</td>
                          <td className={clsx(
                            "px-4 py-2",
                            i < 4 ? "text-emerald-600 dark:text-emerald-400" :
                            i < 6 ? "text-amber-600 dark:text-amber-400" :
                            "text-red-600 dark:text-red-400"
                          )}>
                            {feasible}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Factorial time is the worst common complexity. For n &gt; 10, it becomes infeasible quickly.
                </p>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Traveling Salesman:</span>{" "}
                      A salesman must visit 10 cities and wants the shortest route. Brute force checking all
                      10! = 3.6 million routes — feasible once. For 20 cities, 20! ≈ 2.4 × 10¹⁸ — impossible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">DNA Sequencing:</span>{" "}
                      Trying all possible orderings of DNA fragments to assemble a sequence — for 10 fragments,
                      10! = 3.6 million possibilities; for 20, it's impossible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Scheduling:</span>{" "}
                      Assigning 15 employees to 15 different shifts by trying all assignments — 15! = 1.3 × 10¹²
                      possibilities — too many.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Classroom Example:</span>{" "}
                      <strong>Debangshu</strong> wants to arrange 10 students in a line for a photo.
                      There are 10! = 3.6 million arrangements. If he tries them all, it'll take a while!
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Avoid O(n!) at all costs",
                      desc: "For n > 10, O(n!) is completely infeasible. Look for better algorithms.",
                    },
                    {
                      tip: "Use approximation algorithms",
                      desc: "For TSP, use heuristics like nearest neighbor or genetic algorithms.",
                    },
                    {
                      tip: "Use dynamic programming for TSP",
                      desc: "The DP solution for TSP is O(n²·2ⁿ), which is better than O(n!) for large n.",
                    },
                    {
                      tip: "Consider branch and bound",
                      desc: "Prune branches that cannot lead to a better solution, reducing effective search space.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <p className="font-semibold text-red-600 dark:text-red-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Underestimating factorial growth:</strong> 20! ≈ 2.4 × 10¹⁸ — that's 2.4 quintillion.
                    For perspective, there are about 10¹⁷ seconds since the Big Bang. 20! is 24 times that!
                  </li>
                  <li>
                    <strong>Confusing n! with 2ⁿ:</strong> n! grows much faster. For n=10, 2¹⁰=1024, 10!=3.6×10⁶.
                    For n=20, 2²⁰≈1×10⁶, 20!≈2.4×10¹⁸.
                  </li>
                  <li>
                    <strong>Using O(n!) when O(n·2ⁿ) is possible:</strong> DP for TSP reduces complexity from
                    O(n!) to O(n²·2ⁿ), which is still exponential but much better.
                  </li>
                  <li>
                    <strong>Assuming recursion for permutations is always O(n!):</strong> It is O(n!) for generating
                    all permutations, but you can often avoid generating all by using heuristics.
                  </li>
                  <li>
                    <strong>Not using pruning:</strong> In backtracking algorithms, pruning can reduce the effective
                    complexity significantly, sometimes making them feasible for n=20 or more.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> once tried to generate all permutations of 15 elements and ran out
                      of memory. He learned to use backtracking with pruning instead.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Avoid generating all permutations</strong> — use backtracking with pruning instead.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use dynamic programming</strong> for combinatorial optimization (e.g., TSP).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use approximation algorithms</strong> when exact solutions are not required.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use branch and bound</strong> to prune the search space in backtracking.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you identify O(n!) algorithms (permutation problems)?",
                    "✅ Do you know the classic examples (TSP, permutations, n-queens)?",
                    "✅ Do you understand why O(n!) is even worse than O(2ⁿ)?",
                    "✅ Can you distinguish O(n!) from O(2ⁿ) and O(n²)?",
                    "✅ Do you know when O(n!) is feasible (n ≤ 10)?",
                    "✅ Can you think of better alternatives (DP, heuristics, pruning)?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 8),
                        "p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-700 dark:text-gray-300",
                        "transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Hint Section ── */}
              <section className={clsx(sectionClass, "space-y-3 p-5 rounded-xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40")}>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  💡 Think About…
                </h3>
                <ul className="space-y-2 text-amber-700 dark:text-amber-200/80 text-sm list-disc pl-5">
                  <li>
                    <strong>Observe carefully:</strong> 5! = 120, 6! = 720, 7! = 5040. How does the growth compare
                    to doubling? 2⁵ = 32, 2⁶ = 64, 2⁷ = 128. Factorial is much faster!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use dynamic programming for TSP instead of brute force?
                    The complexity becomes O(n²·2ⁿ), which is still exponential but much better than O(n!).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 8 students. The principal
                    wants to arrange them in all possible ways for a group photo. That's 8! = 40,320 arrangements.
                    Feasible! But for 15 students, it's 1.3 trillion arrangements — impossible.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Permutation Generation ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Permutation Generation — O(n!) Time
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generates all permutations of an array. There are exactly n! permutations.
                </p>
                <JavaFileLoader
                  fileModule={permutationGenerationJava}
                  title="PermutationGeneration.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Factorial Time Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Factorial Time Demo — Growth Comparison
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares factorial growth with exponential and quadratic growth for various n.
                </p>
                <JavaFileLoader
                  fileModule={factorialTimeDemoJava}
                  title="FactorialTimeDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: TSP Brute Force ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Traveling Salesman (Brute Force) — O(n!)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Brute-force solution for TSP that tries all permutations of cities — O(n!) time.
                </p>
                <JavaFileLoader
                  fileModule={tspBruteForceJava}
                  title="TSPBruteForce.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(n!) – Factorial Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(n!) is the worst-case complexity you'll encounter in algorithm analysis. I tell my students: " +
              "'If you see n!, run away!' But seriously, understanding factorial growth is important because " +
              "it demonstrates why we need better algorithms. The Traveling Salesman Problem is the classic example " +
              "— brute force is O(n!), but with dynamic programming it's O(n²·2ⁿ), and with heuristics it's even better. " +
              "Have students calculate 10! and compare it to 2¹⁰ and 10². They'll see the astronomical difference. " +
              "Also, emphasize that for n > 10, O(n!) is completely impractical, so we must use approximation " +
              "or heuristic methods. This topic is a great lead-in to discussions about NP-hard problems."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 26 · O(n!) – Factorial Time · Built with ❤️ for the classroom</p>
        </footer>

      </div>

      {/* ─── Global Keyframes ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic26;