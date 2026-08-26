import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveFactorialJava from "./topic16_files/RecursiveFactorial.java?raw";
import recursiveSumJava from "./topic16_files/RecursiveSum.java?raw";
import recursiveBinarySearchJava from "./topic16_files/RecursiveBinarySearch.java?raw";
import recursiveFibonacciJava from "./topic16_files/RecursiveFibonacci.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic16_files/topic16_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic16 = () => {
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
              Topic 16
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Analyzing Recursive Algorithms
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding how to analyze the time and space complexity of
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> recursive functions</span> —
            using recurrence relations, recursion trees, and the Master Theorem.
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
                  <span className="text-indigo-500">●</span> What Are Recursive Algorithms?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>recursive algorithm</strong> is one that solves a problem by breaking it down into
                    smaller subproblems of the same type, calling itself to solve them. Recursion is a powerful
                    paradigm used in many classic algorithms: factorial, Fibonacci, binary search, merge sort,
                    tree traversals, and more.
                  </p>
                  <p>
                    Analyzing recursive algorithms is different from analyzing iterative ones. Instead of counting
                    loop iterations, we write a <strong>recurrence relation</strong> that describes the runtime in
                    terms of the input size. Then we solve the recurrence to get the time complexity.
                  </p>
                  <p>
                    Think of it like a Russian nesting doll: each recursive call opens a smaller doll until it
                    reaches the smallest one (the base case), then it closes them back up. The time complexity
                    is the total work done across all levels of the recursion.
                  </p>
                </div>
              </section>

              {/* ── Key Concepts ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Concepts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "📝",
                      title: "Recurrence Relations",
                      desc: "An equation that defines the runtime of a recursive function in terms of its subproblems.",
                      example: "T(n) = T(n-1) + O(1) → O(n)",
                    },
                    {
                      icon: "🌳",
                      title: "Recursion Tree",
                      desc: "A tree diagram showing all recursive calls and their work, used to solve recurrences.",
                      example: "Draw each call as a node; sum work at each level.",
                    },
                    {
                      icon: "🎯",
                      title: "Base Case",
                      desc: "The smallest subproblem that can be solved directly without further recursion.",
                      example: "factorial(0) = 1, fibonacci(0) = 0",
                    },
                    {
                      icon: "📊",
                      title: "Stack Space (Space Complexity)",
                      desc: "Recursive calls consume O(depth) memory on the call stack.",
                      example: "depth = n → O(n) space",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition: Recursion Tree ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recursion Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Recursion tree visualization"
                  >
                    <defs>
                      <marker id="arrow16" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Root */}
                    <circle cx="400" cy="30" r="25" fill="#818cf8" opacity="0.9" />
                    <text x="400" y="36" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">n</text>

                    {/* Level 1 */}
                    <circle cx="250" cy="90" r="22" fill="#34d399" opacity="0.8" />
                    <text x="250" y="96" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">n/2</text>
                    <circle cx="550" cy="90" r="22" fill="#34d399" opacity="0.8" />
                    <text x="550" y="96" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">n/2</text>

                    {/* Level 2 */}
                    <circle cx="150" cy="150" r="18" fill="#f472b6" opacity="0.7" />
                    <text x="150" y="155" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">n/4</text>
                    <circle cx="350" cy="150" r="18" fill="#f472b6" opacity="0.7" />
                    <text x="350" y="155" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">n/4</text>
                    <circle cx="450" cy="150" r="18" fill="#f472b6" opacity="0.7" />
                    <text x="450" y="155" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">n/4</text>
                    <circle cx="650" cy="150" r="18" fill="#f472b6" opacity="0.7" />
                    <text x="650" y="155" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">n/4</text>

                    {/* Level 3 */}
                    <circle cx="100" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="100" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="200" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="200" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="300" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="300" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="400" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="400" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="500" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="500" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="600" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="600" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <circle cx="700" cy="210" r="14" fill="#fbbf24" opacity="0.6" />
                    <text x="700" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>

                    {/* Edges */}
                    <line x1="400" y1="55" x2="250" y2="68" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="55" x2="550" y2="68" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="112" x2="150" y2="132" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="112" x2="350" y2="132" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="112" x2="450" y2="132" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="112" x2="650" y2="132" stroke="#6b7280" strokeWidth="1.5" />

                    <text x="400" y="270" textAnchor="middle" fontSize="13" fill="#374151" className="dark:fill-gray-300">
                      Each level divides the problem size by 2. Total work = O(n log n) if O(n) work per level.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    A recursion tree shows the subproblems at each level. The total work is the sum of work at all levels.
                    For divide-and-conquer with O(n) work per level, the total is O(n log n).
                  </p>
                </div>
              </section>

              {/* ── Step-by-Step Analysis ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How to Analyze Recursive Algorithms
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Identify the recurrence</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Express T(n) in terms of T(smaller input). For example: T(n) = T(n-1) + O(1).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Identify the base case</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The smallest input where recursion stops (e.g., T(0) = O(1) or T(1) = O(1)).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Solve the recurrence</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use substitution method, iteration method, recursion tree, or Master Theorem.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Analyze space complexity</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Count the maximum depth of the recursion stack — often O(depth) memory.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Common Recurrences ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Recurrence Patterns
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Recurrence</th>
                        <th className="px-4 py-2 border-b">Example Algorithm</th>
                        <th className="px-4 py-2 border-b">Time Complexity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["T(n) = T(n-1) + O(1)", "Factorial, Sum of n numbers", "O(n)"],
                        ["T(n) = T(n-1) + O(n)", "Recursive selection sort", "O(n²)"],
                        ["T(n) = T(n/2) + O(1)", "Binary search", "O(log n)"],
                        ["T(n) = T(n/2) + O(n)", "Finding max (divide & conquer)", "O(n)"],
                        ["T(n) = 2T(n/2) + O(1)", "Tree traversal (constant work)", "O(n)"],
                        ["T(n) = 2T(n/2) + O(n)", "Merge sort", "O(n log n)"],
                        ["T(n) = T(n-1) + T(n-2) + O(1)", "Naive Fibonacci", "O(2ⁿ)"],
                      ].map(([recurrence, example, complexity], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{recurrence}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{example}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{complexity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Always write the recurrence first",
                      desc: "It's the most important step — without it, you can't analyze the complexity.",
                    },
                    {
                      tip: "Consider the recursion depth for space",
                      desc: "Recursive functions use O(depth) stack space; depth can be O(n) for linear recursion.",
                    },
                    {
                      tip: "Use the Master Theorem when applicable",
                      desc: "For divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n).",
                    },
                    {
                      tip: "Watch for overlapping subproblems",
                      desc: "Naive Fibonacci has overlapping subproblems → use memoization to reduce complexity.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 6),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Forgetting the base case in the recurrence:</strong> The recurrence must include the base case
                    (e.g., T(0) = O(1)). Without it, the recurrence is incomplete.
                  </li>
                  <li>
                    <strong>Assuming all recursions are O(log n):</strong> Only those that divide by a constant factor
                    and do O(1) work are O(log n). Linear recursion is O(n).
                  </li>
                  <li>
                    <strong>Ignoring the recursion stack in space analysis:</strong> Recursive algorithms often use
                    O(depth) space, which can be significant (e.g., O(n) for factorial).
                  </li>
                  <li>
                    <strong>Confusing the number of calls with the work per call:</strong> Fibonacci has 2ⁿ calls,
                    but each call does O(1) work, so total O(2ⁿ). Merge sort has 2ᵏ calls at each level, but each
                    does O(n) work per level — total O(n log n).
                  </li>
                  <li>
                    <strong>Forgetting that recursion can cause stack overflow:</strong> For large n, linear recursion
                    depth can crash the program.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once wrote a recursive factorial function for n=100000 and got a
                      StackOverflowError. She learned to check recursion depth.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always document the recurrence</strong> in comments for recursive functions.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider tail recursion</strong> for optimization (some compilers optimize to iteration).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use memoization for overlapping subproblems</strong> to reduce exponential time to polynomial.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Iterative solutions may be better for space</strong> — convert recursion to iteration
                      when stack depth is large.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for a given recursive algorithm?",
                    "✅ Can you identify the base case in a recurrence?",
                    "✅ Can you solve simple recurrences (linear, divide-and-conquer)?",
                    "✅ Can you analyze the space complexity (stack depth)?",
                    "✅ Do you know the Master Theorem and when to apply it?",
                    "✅ Can you distinguish between linear and divide-and-conquer recursion?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 10),
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
                    <strong>Observe carefully:</strong> For factorial, T(n) = T(n-1) + O(1). How many calls are made?
                    What is the depth? That's O(n) calls, so O(n) time and O(n) space.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if factorial were tail-recursive? The space complexity
                    could be O(1) with compiler optimization (tail call elimination).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Ichapur</strong> has n students. A recursive
                    function to count them would call itself n times, using O(n) stack space. An iterative loop would
                    use O(1) space.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Factorial ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Factorial — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the classic recursive factorial function with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveFactorialJava}
                  title="RecursiveFactorial.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursive Sum ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Sum — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows a recursive function that sums numbers from 1 to n using T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveSumJava}
                  title="RecursiveSum.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursive Binary Search ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Binary Search — O(log n) Time, O(log n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes binary search recursion with recurrence T(n) = T(n/2) + O(1) → O(log n).
                </p>
                <JavaFileLoader
                  fileModule={recursiveBinarySearchJava}
                  title="RecursiveBinarySearch.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursive Fibonacci ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Fibonacci — O(2ⁿ) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates the naive Fibonacci with recurrence T(n) = T(n-1) + T(n-2) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveFibonacciJava}
                  title="RecursiveFibonacci.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Analyzing Recursive Algorithms — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Recursive algorithms are a beautiful concept, but analyzing them requires a systematic approach. " +
              "I always start with simple examples like factorial and sum to build intuition. The key is the " +
              "recurrence relation — writing it down is half the battle. Students often confuse the number of calls " +
              "with the total work; emphasize that recursion trees help visualize this. Also, point out the space " +
              "complexity: recursion uses the call stack, which can be a limiting factor. In interviews, analyzing " +
              "recursive algorithms is a common task, so practice is essential. Remind them that for overlapping " +
              "subproblems (like Fibonacci), memoization can drastically improve time complexity."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 16 · Analyzing Recursive Algorithms · Built with ❤️ for the classroom</p>
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

export default Topic16;