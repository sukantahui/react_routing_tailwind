import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import fibonacciExponentialJava from "./topic25_files/FibonacciExponential.java?raw";
import subsetGenerationJava from "./topic25_files/SubsetGeneration.java?raw";
import towerOfHanoiJava from "./topic25_files/TowerOfHanoi.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic25_files/topic25_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic25 = () => {
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
              Topic 25
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(2ⁿ) – Exponential Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-red-600 dark:text-red-400 font-semibold">danger zone</span> of algorithms —
            where each additional input element doubles the work, quickly making problems intractable.
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
            &gt;
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
                  <span className="text-red-500">●</span> What is O(2ⁿ) – Exponential Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(2ⁿ)</strong> — pronounced "order two to the n" — means the algorithm's runtime
                    <strong>doubles</strong> with each additional input element. This growth is <strong>explosive</strong>:
                    if n increases by 1, the runtime doubles; if n increases by 10, the runtime increases by over
                    1000 times (2¹⁰ = 1024).
                  </p>
                  <p>
                    Exponential time algorithms are typically <strong>recursive algorithms with branching</strong>,
                    where each call makes <strong>multiple recursive calls</strong> (usually two or more). Classic
                    examples include the naive Fibonacci sequence (T(n) = T(n-1) + T(n-2)), subset generation,
                    and the Tower of Hanoi.
                  </p>
                  <p>
                    Think of it like a virus spreading: each infected person infects two more. After 10 generations,
                    you have 1,024 infected people. After 20 generations, over 1 million. After 30, over 1 billion.
                    That's exponential growth — and it's why these algorithms become infeasible quickly.
                  </p>
                </div>
              </section>

              {/* ── Common O(2ⁿ) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Common O(2ⁿ) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🌀",
                      title: "Naive Fibonacci",
                      desc: "Each call branches into two calls: T(n) = T(n-1) + T(n-2) + O(1).",
                      example: "fib(n) { return fib(n-1) + fib(n-2); }",
                    },
                    {
                      icon: "📋",
                      title: "Subset Generation",
                      desc: "Generating all subsets of a set — each element is either included or not.",
                      example: "2ⁿ subsets for n elements.",
                    },
                    {
                      icon: "🗼",
                      title: "Tower of Hanoi",
                      desc: "Each disk requires moving n-1 disks twice: T(n) = 2T(n-1) + O(1).",
                      example: "T(n) = 2ⁿ - 1 moves.",
                    },
                    {
                      icon: "🧩",
                      title: "Brute-force Search",
                      desc: "Checking all possibilities for combinatorial problems.",
                      example: "Traveling salesman (brute force), knapsack (brute force).",
                    },
                    {
                      icon: "🎯",
                      title: "Exhaustive Search",
                      desc: "Trying all combinations of inputs to find the optimal solution.",
                      example: "All paths in a graph, all subsets, all permutations.",
                    },
                    {
                      icon: "🔬",
                      title: "Decision Trees",
                      desc: "Algorithms that explore all possible outcomes.",
                      example: "Game trees (chess, tic-tac-toe).",
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
                  <span className="text-red-500">●</span> Visual Intuition: Exponential Explosion
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Exponential growth"
                  >
                    <defs>
                      <marker id="arrow25" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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

                    {/* Exponential curve O(2ⁿ) */}
                    <path d="M60 270 L80 268 L100 265 L120 260 L140 250 L160 235 L180 215 L200 190 L220 160 L240 125 L260 90 L280 65 L300 55 L320 52 L340 50 L360 50 L380 50 L400 50 L420 50 L440 50 L460 50 L480 50 L500 50 L520 50 L540 50 L560 50 L580 50 L600 50 L620 50 L640 50 L660 50 L680 50 L700 50 L720 50 L740 50 L760 50" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#f87171" fontWeight="bold">O(2ⁿ)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="55" r="8" fill="#f87171">
                      <animate attributeName="cx" values="60;700;60" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="5s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on curve */}
                    <text x="100" y="275" fontSize="10" fill="#6b7280">n=2</text>
                    <text x="140" y="260" fontSize="10" fill="#6b7280">n=3</text>
                    <text x="200" y="210" fontSize="10" fill="#6b7280">n=5</text>
                    <text x="280" y="90" fontSize="10" fill="#6b7280">n=10</text>
                    <text x="380" y="55" fontSize="10" fill="#6b7280">n=15</text>

                    {/* Fill under curve */}
                    <path d="M60 270 L760 50 L760 280 L60 280 Z" fill="url(#expGrad25)" opacity="0.15" />
                    <defs>
                      <linearGradient id="expGrad25" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f87171" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(2ⁿ) grows so fast that it's practically vertical. For n=20, 2²⁰ ≈ 1 million. For n=30, 2³⁰ ≈ 1 billion.
                    For n=50, 2⁵⁰ ≈ 1.1 × 10¹⁵ — impossible for any computer.
                  </p>
                </div>
              </section>

              {/* ── The Limits of Exponential Algorithms ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> When Do They Become Impossible?
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">n</th>
                        <th className="px-4 py-2 border-b">2ⁿ</th>
                        <th className="px-4 py-2 border-b">Feasibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["10", "1,024", "Instant"],
                        ["15", "32,768", "Instant"],
                        ["20", "1,048,576", "~1 second"],
                        ["25", "33,554,432", "~30 seconds"],
                        ["30", "1,073,741,824", "~17 minutes"],
                        ["35", "34,359,738,368", "~12 hours"],
                        ["40", "1,099,511,627,776", "~1.3 months"],
                        ["45", "35,184,372,088,832", "~111 years"],
                        ["50", "1,125,899,906,842,624", "~3,500 years"],
                      ].map(([n, value, feasibility], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono">{n}</td>
                          <td className="px-4 py-2 font-mono">{value}</td>
                          <td className={clsx(
                            "px-4 py-2",
                            i < 3 ? "text-emerald-600 dark:text-emerald-400" :
                            i < 5 ? "text-amber-600 dark:text-amber-400" :
                            "text-red-600 dark:text-red-400"
                          )}>
                            {feasibility}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  For n &gt; 30, O(2ⁿ) algorithms become impractical for any real-world application.
                  This is why exponential algorithms are only used for very small inputs (n ≤ 20).
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
                      <span className="font-semibold text-red-600 dark:text-red-400">Virus Spread:</span>{" "}
                      If each infected person infects 2 new people, after n generations you have 2ⁿ infected people.
                      After 20 generations, over 1 million — that's exponential growth.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Chess AI:</span>{" "}
                      In chess, the number of possible moves from a position is about 30. Looking ahead n moves
                      gives 30ⁿ possibilities — a huge number. This is why chess AIs use pruning (alpha-beta).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">DNA Sequencing:</span>{" "}
                      Brute-force finding a pattern in DNA sequences by trying all possibilities is exponential
                      in the pattern length — you need smarter algorithms like BLAST.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is trying all possible seating arrangements for 20 students.
                      That's 20! ≈ 2.4 × 10¹⁸ arrangements — impossible! He needs a better algorithm.
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
                      tip: "Avoid O(2ⁿ) for large n",
                      desc: "For n &gt; 20, O(2ⁿ) is usually too slow. Look for polynomial alternatives.",
                    },
                    {
                      tip: "Use dynamic programming",
                      desc: "Many exponential problems (like Fibonacci) can be reduced to O(n) with DP.",
                    },
                    {
                      tip: "Consider approximation algorithms",
                      desc: "For NP-hard problems, often a good approximation is better than exact solution.",
                    },
                    {
                      tip: "Use pruning (branch and bound)",
                      desc: "In search algorithms, prun branches that cannot lead to an optimal solution.",
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
                    <strong>Underestimating exponential growth:</strong> Many beginners think 2²⁰ is "about 20",
                    when it's actually 1,048,576. 2⁵⁰ is 1.1 × 10¹⁵ — impossible.
                  </li>
                  <li>
                    <strong>Using exponential algorithms when DP works:</strong> Naive Fibonacci (O(2ⁿ)) can be
                    reduced to O(n) with DP. Always look for overlapping subproblems.
                  </li>
                  <li>
                    <strong>Assuming exponential is only for very large n:</strong> Even for n=30, 2³⁰ ≈ 1 billion
                    operations — too slow for most applications.
                  </li>
                  <li>
                    <strong>Confusing O(2ⁿ) with O(n²):</strong> For n=100, n²=10,000, but 2¹⁰⁰ is astronomically
                    larger (≈ 10³⁰). Exponential is much, much worse than quadratic.
                  </li>
                  <li>
                    <strong>Forgetting that exponential algorithms can be optimized with memoization:</strong>
                    Memoization turns exponential Fibonacci into O(n) by storing subproblem results.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once ran naive Fibonacci for n=50 and waited 10 minutes. Then she
                      learned about memoization and got the result instantly.
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
                      <strong>Use dynamic programming</strong> to convert exponential problems to polynomial time.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use memoization</strong> to avoid recomputing overlapping subproblems.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use pruning</strong> to reduce the search space (e.g., alpha-beta pruning in game trees).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know when to use approximation</strong> — sometimes a near-optimal solution is good enough.
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
                    "✅ Can you identify O(2ⁿ) algorithms (branching recursion)?",
                    "✅ Do you know the classic examples (Fibonacci, Tower of Hanoi, subsets)?",
                    "✅ Do you understand why O(2ⁿ) becomes infeasible quickly?",
                    "✅ Can you distinguish O(2ⁿ) from O(n²)?",
                    "✅ Do you know how to optimize exponential algorithms (DP, memoization)?",
                    "✅ Can you compute 2ⁿ for typical input sizes?",
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
                    <strong>Observe carefully:</strong> In naive Fibonacci, how many calls are made for fib(5)? 
                    It's 15 calls. For fib(10), it's 177 calls. For fib(30), it's 2.6 million calls.
                    That's exponential growth!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you add memoization to Fibonacci? The number of calls
                    becomes O(n) — a huge improvement!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 30 students. If the
                    principal wants to try all possible seating arrangements (30!), that's 2.65 × 10³² arrangements —
                    impossible! This is why we use better scheduling algorithms.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Fibonacci Exponential ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Naive Fibonacci — Classic O(2ⁿ)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Naive Fibonacci has exponential complexity because each call branches into two calls.
                  Shows the explosion in call count.
                </p>
                <JavaFileLoader
                  fileModule={fibonacciExponentialJava}
                  title="FibonacciExponential.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Subset Generation ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Subset Generation — O(2ⁿ) Subsets
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generates all subsets of a set. There are exactly 2ⁿ subsets for n elements.
                </p>
                <JavaFileLoader
                  fileModule={subsetGenerationJava}
                  title="SubsetGeneration.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tower of Hanoi ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tower of Hanoi — O(2ⁿ) Moves
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The Tower of Hanoi puzzle requires exactly 2ⁿ - 1 moves for n disks — exponential time.
                </p>
                <JavaFileLoader
                  fileModule={towerOfHanoiJava}
                  title="TowerOfHanoi.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(2ⁿ) – Exponential Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Exponential time is the danger zone of algorithms. I emphasize to students that O(2ⁿ) is a red flag — " +
              "if you see a recursive algorithm that branches into two or more calls, you need to be careful. " +
              "The classic example is Fibonacci: the naive version is O(2ⁿ), but with memoization it becomes O(n). " +
              "This shows the power of dynamic programming. I also use the Tower of Hanoi to illustrate exponential " +
              "growth: 64 disks would take 5.8 × 10¹⁹ moves — impossible for any computer. " +
              "Have students experiment with the call count for different values of n in the Fibonacci example — " +
              "they'll see the explosion firsthand. Remind them that exponential algorithms are only useful for " +
              "very small inputs (n ≤ 20) and that they should always look for polynomial alternatives."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 25 · O(2ⁿ) – Exponential Time · Built with ❤️ for the classroom</p>
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

export default Topic25;