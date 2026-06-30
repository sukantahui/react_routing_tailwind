import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recurrenceExamplesJava from "./topic17_files/RecurrenceExamples.java?raw";
import solvingRecurrencesJava from "./topic17_files/SolvingRecurrences.java?raw";
import masterTheoremDemoJava from "./topic17_files/MasterTheoremDemo.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic17_files/topic17_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic17 = () => {
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
              Topic 17
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recurrence Relations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recurrence Relations
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The mathematical foundation for analyzing recursive algorithms —
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> recurrence relations</span>
            and how to solve them.
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
                  <span className="text-indigo-500">●</span> What Are Recurrence Relations?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>recurrence relation</strong> is an equation that defines a sequence where each term
                    is defined as a function of its preceding terms. In algorithm analysis, recurrence relations
                    are used to express the time complexity <strong>T(n)</strong> of a recursive algorithm in terms
                    of the input size <strong>n</strong>.
                  </p>
                  <p>
                    For example, the recurrence for factorial is <strong>T(n) = T(n-1) + O(1)</strong>, meaning
                    the time to compute factorial of n is the time to compute factorial of n-1 plus a constant amount
                    of work. The recurrence for binary search is <strong>T(n) = T(n/2) + O(1)</strong>, meaning
                    each step halves the input and does constant work.
                  </p>
                  <p>
                    Recurrence relations are the bridge between the recursive structure of an algorithm and its
                    asymptotic complexity. Solving them gives us the Big-O, Big-Ω, or Big-Θ complexity.
                  </p>
                </div>
              </section>

              {/* ── Components of a Recurrence ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Components of a Recurrence
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Base Case",
                      desc: "The smallest input where the recurrence stops. Usually T(0) = O(1) or T(1) = O(1).",
                      example: "T(0) = 1, T(1) = 1",
                    },
                    {
                      icon: "🔀",
                      title: "Recursive Case",
                      desc: "How T(n) relates to T(smaller input). Shows the number of subproblems and their sizes.",
                      example: "T(n) = a·T(n/b) + f(n)",
                    },
                    {
                      icon: "⚡",
                      title: "Work per Level",
                      desc: "The f(n) term — work done at each recursive call (combining results, merging, etc.).",
                      example: "f(n) = O(n) for merge sort",
                    },
                    {
                      icon: "📊",
                      title: "Number of Subproblems",
                      desc: "The 'a' in T(n) = a·T(n/b) + f(n). How many recursive calls are made.",
                      example: "a = 2 for merge sort",
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

              {/* ── Common Recurrence Forms ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Recurrence Forms
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Recurrence Form</th>
                        <th className="px-4 py-2 border-b">Example Algorithm</th>
                        <th className="px-4 py-2 border-b">Solution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["T(n) = T(n-1) + O(1)", "Factorial, Sum", "O(n)"],
                        ["T(n) = T(n-1) + O(n)", "Selection Sort (recursive)", "O(n²)"],
                        ["T(n) = T(n/2) + O(1)", "Binary Search", "O(log n)"],
                        ["T(n) = T(n/2) + O(n)", "Find Max (D&C)", "O(n)"],
                        ["T(n) = 2T(n/2) + O(1)", "Tree Traversal", "O(n)"],
                        ["T(n) = 2T(n/2) + O(n)", "Merge Sort", "O(n log n)"],
                        ["T(n) = T(n-1) + T(n-2) + O(1)", "Naive Fibonacci", "O(2ⁿ)"],
                        ["T(n) = 2T(n-1) + O(1)", "Tower of Hanoi", "O(2ⁿ)"],
                      ].map(([form, example, solution], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{form}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{example}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recurrence Levels
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 250"
                    className="w-full h-auto max-h-56"
                    role="img"
                    aria-label="Recurrence levels visualization"
                  >
                    <defs>
                      <marker id="arrow17" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Level 0 */}
                    <rect x="50" y="20" width="700" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="42" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Level 0: T(n) = a·T(n/b) + f(n)</text>

                    {/* Level 1 */}
                    <rect x="100" y="65" width="250" height="28" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="225" y="85" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">T(n/b)</text>
                    <rect x="450" y="65" width="250" height="28" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="575" y="85" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">T(n/b)</text>

                    {/* Level 2 */}
                    <rect x="130" y="105" width="120" height="28" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="190" y="125" textAnchor="middle" fontSize="11" fill="white">T(n/b²)</text>
                    <rect x="280" y="105" width="120" height="28" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="340" y="125" textAnchor="middle" fontSize="11" fill="white">T(n/b²)</text>
                    <rect x="480" y="105" width="120" height="28" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="540" y="125" textAnchor="middle" fontSize="11" fill="white">T(n/b²)</text>
                    <rect x="630" y="105" width="120" height="28" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="690" y="125" textAnchor="middle" fontSize="11" fill="white">T(n/b²)</text>

                    {/* Level k */}
                    <rect x="250" y="150" width="300" height="28" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="170" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">... T(n/bᵏ) ...</text>

                    {/* Base case */}
                    <rect x="320" y="195" width="160" height="28" rx="6" fill="#a78bfa" opacity="0.5" />
                    <text x="400" y="215" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">T(1) = O(1)</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="12" fill="#6b7280" className="dark:fill-gray-400">
                      Each level multiplies subproblems by a and divides input by b. Total levels = log_b(n).
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    A recurrence T(n) = a·T(n/b) + f(n) creates a recursion tree with log_b(n) levels.
                    The total work is the sum of work across all levels.
                  </p>
                </div>
              </section>

              {/* ── How to Write a Recurrence ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How to Write a Recurrence
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Identify the input size</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">What is n? (array length, number of nodes, etc.)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Determine the base case</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">What's the smallest input? Usually T(0)=O(1) or T(1)=O(1).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Count the recursive calls and their sizes</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How many calls (a)? What size (n/b)? This gives the a·T(n/b) term.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Determine the work at each call</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The f(n) term — merging, comparing, combining results.</p>
                  </div>
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
                      tip: "Always include the base case",
                      desc: "A recurrence without a base case is incomplete — you need to know where the recursion stops.",
                    },
                    {
                      tip: "Use the Master Theorem when applicable",
                      desc: "For T(n) = a·T(n/b) + f(n), the Master Theorem gives a direct solution.",
                    },
                    {
                      tip: "Draw a recursion tree to visualize",
                      desc: "It helps understand how work accumulates across levels.",
                    },
                    {
                      tip: "Check your recurrence with small n",
                      desc: "Verify that the recurrence gives the correct values for n=1, 2, 3 to catch mistakes.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
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
                    <strong>Forgetting the base case:</strong> T(1) = O(1) must be stated; without it, the recurrence
                    is incomplete.
                  </li>
                  <li>
                    <strong>Ignoring the f(n) term:</strong> The work done at each level matters. Merge sort is O(n log n)
                    because f(n) = O(n); if f(n) were O(1), it would be O(n).
                  </li>
                  <li>
                    <strong>Misidentifying the number of recursive calls (a):</strong> For binary search, a=1 (one call);
                    for merge sort, a=2 (two calls).
                  </li>
                  <li>
                    <strong>Confusing the base case with the base of the logarithm:</strong> T(n) = T(n/2) + O(1) has
                    base 2, but T(n) = T(n/3) + O(1) has base 3 — both are O(log n).
                  </li>
                  <li>
                    <strong>Assuming all recurrences are solvable by the Master Theorem:</strong> The Master Theorem
                    only applies to T(n) = a·T(n/b) + f(n). Other recurrences require different methods.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once tried to apply the Master Theorem to T(n) = T(n-1) + T(n-2) + O(1)
                      and got confused. He learned to use the recursion tree method instead.
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
                      <strong>Always state the recurrence in comments</strong> before the recursive function.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use consistent notation</strong> — T(n) for time, S(n) for space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Check the recurrence with small values</strong> to ensure it matches the algorithm.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Solve recurrences using multiple methods</strong> to verify your answer.
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
                    "✅ Can you write a recurrence for a given recursive algorithm?",
                    "✅ Can you identify the base case in a recurrence?",
                    "✅ Do you know the difference between a = number of calls and n/b = subproblem size?",
                    "✅ Can you recognize the f(n) term (work at each level)?",
                    "✅ Do you know which method to use to solve a recurrence (substitution, iteration, recursion tree, Master Theorem)?",
                    "✅ Can you solve simple recurrences like T(n) = T(n-1) + O(1) or T(n) = 2T(n/2) + O(n)?",
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
                    <strong>Observe carefully:</strong> For a recursive function that splits the input in half and makes
                    two recursive calls, what is the recurrence? What is the base case?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If the function makes three recursive calls on one-third of the
                    input, how does the recurrence change? What about the complexity?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has n students. If the principal
                    splits them into two groups of n/2 and processes each group the same way, the recurrence is
                    T(n) = 2T(n/2) + O(n) — like merge sort for processing student records.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recurrence Examples ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recurrence Examples — Different Recursive Patterns
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates various recursive algorithms with their corresponding recurrences.
                </p>
                <JavaFileLoader
                  fileModule={recurrenceExamplesJava}
                  title="RecurrenceExamples.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Solving Recurrences ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Solving Recurrences — Iteration Method
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows how to solve recurrences using the iteration (expansion) method step by step.
                </p>
                <JavaFileLoader
                  fileModule={solvingRecurrencesJava}
                  title="SolvingRecurrences.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Master Theorem Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Master Theorem — Solving Divide-and-Conquer Recurrences
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Applies the Master Theorem to solve recurrences of the form T(n) = a·T(n/b) + f(n).
                </p>
                <JavaFileLoader
                  fileModule={masterTheoremDemoJava}
                  title="MasterTheoremDemo.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Recurrence Relations — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Recurrence relations are the language of recursive algorithms. I emphasize that writing the recurrence " +
              "is the first and most important step — once you have the recurrence, solving it is a mechanical process. " +
              "I like to walk students through the process with simple examples first: factorial, sum, then binary search, " +
              "then merge sort. The Master Theorem is a powerful tool, but I also teach the recursion tree method because " +
              "it builds intuition. Students often forget that the base case is part of the recurrence; remind them to " +
              "always include it. Practice is key — have them write recurrences for different algorithms and solve them."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 17 · Recurrence Relations · Built with ❤️ for the classroom</p>
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

export default Topic17;