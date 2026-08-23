import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveFibonacciJava from "./topic40_files/RecursiveFibonacci.java?raw";
import memoizedFibonacciJava from "./topic40_files/MemoizedFibonacci.java?raw";
import fibonacciComparisonJava from "./topic40_files/FibonacciComparison.java?raw";
import fibonacciAnalysisJava from "./topic40_files/FibonacciAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic40_files/topic40_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic40 = () => {
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
              Topic 40
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Fibonacci
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-red-600 dark:text-red-400 font-semibold">exponential O(2ⁿ)</span> time
            and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n)</span> space of naive
            recursive Fibonacci — and how <strong>memoization</strong> transforms it to O(n) time.
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
                  <span className="text-red-500">●</span> What is Recursive Fibonacci?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>Fibonacci sequence</strong> is defined as:
                    <span className="block font-mono text-center text-lg my-2">
                      F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n ≥ 2
                    </span>
                  </p>
                  <p>
                    The <strong>naive recursive</strong> implementation directly translates this definition into
                    code. However, it is <strong>extremely inefficient</strong> because it recomputes the same
                    values many times. The recurrence relation is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n-1) + T(n-2) + O(1), &nbsp; T(0) = T(1) = O(1)
                    </span>
                    This solves to <strong>O(2ⁿ)</strong> — exponential time — making it impractical for n &gt; 30.
                  </p>
                  <p>
                    Think of it like a tree that branches into two at each node: the number of nodes doubles
                    each level, leading to an exponential explosion. This is the classic example of
                    <strong>overlapping subproblems</strong>, which can be solved efficiently using
                    <strong>memoization</strong> or <strong>dynamic programming</strong>.
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Cases",
                      desc: "F(0) = 0, F(1) = 1. These stop the recursion.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Recursive Case",
                      desc: "F(n) = F(n-1) + F(n-2). Two recursive calls.",
                      icon: "🔄",
                    },
                    {
                      step: "3. Call Tree",
                      desc: "Each call branches into two, creating a binary tree of calls.",
                      icon: "🌳",
                    },
                    {
                      step: "4. Overlapping Subproblems",
                      desc: "The same values (e.g., F(2)) are computed many times.",
                      icon: "🔁",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-400/10",
                        "hover:scale-[1.01] hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-red-600 dark:text-red-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      algorithm: "Naive Recursive",
                      time: "O(2ⁿ) — exponential",
                      space: "O(n) — recursion stack depth = n",
                      example: "F(40) → ~1.6×10⁸ calls, ~1s",
                    },
                    {
                      algorithm: "Memoized Recursive",
                      time: "O(n) — linear",
                      space: "O(n) — memo array + stack",
                      example: "F(40) → 41 calls, instant",
                    },
                    {
                      algorithm: "Iterative DP",
                      time: "O(n) — linear",
                      space: "O(1) — constant",
                      example: "F(40) → 40 iterations, instant",
                    },
                    {
                      algorithm: "Binet's Formula",
                      time: "O(1) — constant",
                      space: "O(1) — constant",
                      example: "F(40) → direct formula, instant",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.algorithm}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Visual Intuition: The Exponential Call Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 320"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Fibonacci call tree"
                  >
                    <defs>
                      <marker id="arrow40" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Call Tree for fib(5) — exponential growth
                    </text>

                    {/* Level 0 */}
                    <rect x="370" y="35" width="60" height="24" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="53" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">5</text>

                    {/* Level 1 */}
                    <line x1="400" y1="59" x2="320" y2="75" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="59" x2="480" y2="75" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="290" y="78" width="60" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="320" y="94" textAnchor="middle" fontSize="10" fill="white">4</text>
                    <rect x="450" y="78" width="60" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="480" y="94" textAnchor="middle" fontSize="10" fill="white">3</text>

                    {/* Level 2 */}
                    <line x1="320" y1="100" x2="260" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="320" y1="100" x2="380" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="480" y1="100" x2="420" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="480" y1="100" x2="540" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="230" y="118" width="60" height="20" rx="4" fill="#f472b6" opacity="0.6" />
                    <text x="260" y="133" textAnchor="middle" fontSize="10" fill="white">3</text>
                    <rect x="350" y="118" width="60" height="20" rx="4" fill="#f472b6" opacity="0.6" />
                    <text x="380" y="133" textAnchor="middle" fontSize="10" fill="white">2</text>
                    <rect x="390" y="118" width="60" height="20" rx="4" fill="#f472b6" opacity="0.6" />
                    <text x="420" y="133" textAnchor="middle" fontSize="10" fill="white">2</text>
                    <rect x="510" y="118" width="60" height="20" rx="4" fill="#f472b6" opacity="0.6" />
                    <text x="540" y="133" textAnchor="middle" fontSize="10" fill="white">1</text>

                    {/* Level 3 */}
                    <text x="400" y="180" textAnchor="middle" fontSize="10" fill="#6b7280">…</text>

                    {/* Level 4 */}
                    <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#6b7280">Leaves: F(1)=1, F(0)=0</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Number of calls = 2ⁿ - 1 ≈ exponential. Many repeated subproblems (e.g., F(2) appears multiple times).
                    </text>
                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#f87171" className="dark:fill-red-400">
                      ⚠️ Overlapping subproblems make this O(2ⁿ) — very slow for large n.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The naive recursive Fibonacci creates an exponential call tree. The number of calls for fib(n) is
                    2ⁿ - 1, and the recursion depth is n. Overlapping subproblems cause massive recomputation.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50/60 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="font-semibold text-red-600 dark:text-red-400">Naive Recursive</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + T(n-2) + O(1), &nbsp; T(0)=T(1)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-red-600 dark:text-red-400">O(2ⁿ)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-red-600 dark:text-red-400">O(n)</span> (stack)
                    </p>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Memoized Recursive</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + O(1), &nbsp; T(0)=T(1)=O(1) (with memo)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span> (memo + stack)
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
                      tip: "Never use naive Fibonacci for n > 30",
                      desc: "The exponential growth makes it impractical. Use memoization or iteration.",
                    },
                    {
                      tip: "Use memoization for overlapping subproblems",
                      desc: "Memoization reduces O(2ⁿ) to O(n) with a simple array.",
                    },
                    {
                      tip: "Use iterative DP for O(1) space",
                      desc: "The iterative version (two variables) is O(n) time and O(1) space.",
                    },
                    {
                      tip: "Binet's formula is O(1) but has precision issues",
                      desc: "For exact integer results, use DP; Binet's formula is for approximations.",
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
                    <strong>Using naive recursion for large n:</strong> For n=50, 2⁵⁰ ≈ 10¹⁵ calls — impossible.
                  </li>
                  <li>
                    <strong>Forgetting the base cases:</strong> F(0)=0, F(1)=1 are essential for termination.
                  </li>
                  <li>
                    <strong>Not recognizing overlapping subproblems:</strong> Naive Fibonacci recomputes F(2) many times.
                  </li>
                  <li>
                    <strong>Assuming space is O(1) for recursion:</strong> The recursion stack uses O(n) space.
                  </li>
                  <li>
                    <strong>Confusing the recurrence with the iterative version:</strong> The iterative version
                    has a different recurrence (T(n) = T(n-1) + O(1)) because it doesn't branch.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once ran fib(40) recursively and waited 5 minutes. He learned
                      about memoization and got the answer instantly.
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
                      <strong>Use iterative DP</strong> for O(n) time and O(1) space — it's the best practical solution.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use memoization</strong> when you want to keep the recursive structure for clarity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use BigInteger</strong> for large Fibonacci numbers (F(100) has 21 digits, F(1000) has 209 digits).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document the recurrence</strong> in comments to explain the complexity.
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
                    "✅ Can you write the recurrence for naive Fibonacci?",
                    "✅ Do you know the time complexity (O(2ⁿ)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement memoized Fibonacci (O(n) time)?",
                    "✅ Can you implement iterative Fibonacci (O(1) space)?",
                    "✅ Do you understand the difference between naive and optimized?",
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
                    <strong>Observe carefully:</strong> How many times is F(2) computed for fib(5)? It's computed
                    3 times. For fib(10), F(2) is computed 34 times! That's the overlapping subproblem problem.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you add a cache (memoization)? The number of calls
                    becomes O(n). For fib(10), only 10 calls instead of 177.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 40 students. The
                    number of ways to climb 40 steps using 1 or 2 steps is F(41) ≈ 165 million. Naive recursion
                    would take forever, but DP computes it instantly.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Fibonacci ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Naive Recursive Fibonacci — O(2ⁿ) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Exponential implementation with recurrence T(n) = T(n-1) + T(n-2) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveFibonacciJava}
                  title="RecursiveFibonacci.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Memoized Fibonacci ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Memoized Fibonacci — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation with memoization to avoid recomputation.
                </p>
                <JavaFileLoader
                  fileModule={memoizedFibonacciJava}
                  title="MemoizedFibonacci.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Fibonacci Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Fibonacci Comparison — All Approaches
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares naive recursive, memoized recursive, iterative, and Binet's formula.
                </p>
                <JavaFileLoader
                  fileModule={fibonacciComparisonJava}
                  title="FibonacciComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Fibonacci Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Fibonacci Analysis — Step Counts and Growth
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of calls for naive Fibonacci and shows the exponential growth.
                </p>
                <JavaFileLoader
                  fileModule={fibonacciAnalysisJava}
                  title="FibonacciAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Fibonacci — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `The naive recursive Fibonacci is the classic example of exponential time due to overlapping subproblems. 
              I emphasize that the recurrence T(n) = T(n-1) + T(n-2) + O(1) is the reason for the explosion — 
              it's the same recurrence as the Fibonacci numbers themselves. This is a perfect lead-in to 
              dynamic programming and memoization. Students often think recursion is beautiful, but they 
              must understand its costs. Show them the call tree for fib(5) and then fib(10) — they'll see 
              the exponential growth. Then show memoization and iterative DP to demonstrate the improvement. 
              This topic also reinforces that the space complexity of recursion is O(n) due to the stack.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 40 · Complexity of Recursive Fibonacci · Built with ❤️ for the classroom</p>
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

export default Topic40;