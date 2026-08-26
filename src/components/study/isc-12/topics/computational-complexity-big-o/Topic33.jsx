import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursionTreeFibonacciJava from "./topic33_files/RecursionTreeFibonacci.java?raw";
import recursionTreeMergeSortJava from "./topic33_files/RecursionTreeMergeSort.java?raw";
import recursionTreeAnalysisJava from "./topic33_files/RecursionTreeAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic33_files/topic33_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic33 = () => {
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
              Topic 33
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Advanced Recurrence Solving
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recursion Trees (Advanced)
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Mastering the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">recursion tree</span> method —
            a powerful visual technique for solving recurrence relations and understanding algorithm complexity.
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
                  <span className="text-indigo-500">●</span> What is the Recursion Tree Method?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>recursion tree method</strong> is a visual approach to solving recurrence relations
                    that arise in the analysis of recursive algorithms. It works by drawing a tree where each node
                    represents a recursive call, and the children represent the subproblems. The total work is
                    computed by summing the work at each level of the tree.
                  </p>
                  <p>
                    This method is particularly useful when the recurrence is <strong>not</strong> of the form
                    T(n) = a·T(n/b) + f(n) (so the Master Theorem doesn't apply) or when you want to build intuition
                    about how work accumulates. It works for any recurrence, including linear recurrences like
                    T(n) = T(n-1) + O(n).
                  </p>
                  <p>
                    Think of it like a <strong>family tree</strong> of recursive calls: each node represents a
                    subproblem, and the total work is the sum of work done by all nodes. The tree method helps you
                    see patterns in work per level and identify the dominant term.
                  </p>
                </div>
              </section>

              {/* ── Building a Recursion Tree ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Step-by-Step: Building a Recursion Tree
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Draw the root",
                      desc: "Start with the root node representing the original problem of size n. Label it with the work f(n) done at that node.",
                      icon: "🌳",
                    },
                    {
                      step: "2. Add children",
                      desc: "For each recursive call, add child nodes with the corresponding subproblem sizes. Label each child with the work done at that level.",
                      icon: "🌿",
                    },
                    {
                      step: "3. Repeat until base case",
                      desc: "Continue expanding until you reach the base case (usually size 1). The leaves represent the base case work.",
                      icon: "🍃",
                    },
                    {
                      step: "4. Compute work per level",
                      desc: "For each level, sum the work of all nodes at that level. Identify the pattern (constant, growing, shrinking).",
                      icon: "📊",
                    },
                    {
                      step: "5. Sum across levels",
                      desc: "Add the work from all levels to get the total complexity. Simplify using Big-O rules.",
                      icon: "➕",
                    },
                    {
                      step: "6. Verify with Master Theorem",
                      desc: "If the recurrence fits the Master Theorem form, cross-check your result.",
                      icon: "✅",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recursion Tree for T(n) = 2T(n/2) + n
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Recursion tree for merge sort"
                  >
                    <defs>
                      <marker id="arrow33" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Level 0 */}
                    <rect x="320" y="20" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="42" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">n</text>
                    <text x="400" y="60" textAnchor="middle" fontSize="10" fill="#6b7280">work: n</text>

                    {/* Level 1 */}
                    <rect x="150" y="80" width="120" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="210" y="98" textAnchor="middle" fontSize="11" fill="white">n/2</text>
                    <text x="210" y="115" textAnchor="middle" fontSize="9" fill="#6b7280">work: n/2</text>
                    <rect x="530" y="80" width="120" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="590" y="98" textAnchor="middle" fontSize="11" fill="white">n/2</text>
                    <text x="590" y="115" textAnchor="middle" fontSize="9" fill="#6b7280">work: n/2</text>
                    <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#6b7280">Level 1: 2·(n/2) = n</text>

                    {/* Level 2 */}
                    <rect x="80" y="140" width="90" height="22" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="125" y="156" textAnchor="middle" fontSize="10" fill="white">n/4</text>
                    <text x="125" y="170" textAnchor="middle" fontSize="8" fill="#6b7280">work: n/4</text>
                    <rect x="200" y="140" width="90" height="22" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="245" y="156" textAnchor="middle" fontSize="10" fill="white">n/4</text>
                    <text x="245" y="170" textAnchor="middle" fontSize="8" fill="#6b7280">work: n/4</text>
                    <rect x="480" y="140" width="90" height="22" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="525" y="156" textAnchor="middle" fontSize="10" fill="white">n/4</text>
                    <text x="525" y="170" textAnchor="middle" fontSize="8" fill="#6b7280">work: n/4</text>
                    <rect x="600" y="140" width="90" height="22" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="645" y="156" textAnchor="middle" fontSize="10" fill="white">n/4</text>
                    <text x="645" y="170" textAnchor="middle" fontSize="8" fill="#6b7280">work: n/4</text>
                    <text x="400" y="180" textAnchor="middle" fontSize="10" fill="#6b7280">Level 2: 4·(n/4) = n</text>

                    {/* Level 3 */}
                    <rect x="40" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="75" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="120" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="155" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="200" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="235" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="280" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="315" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="450" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="485" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="530" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="565" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="610" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="645" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <rect x="690" y="200" width="70" height="18" rx="4" fill="#fbbf24" opacity="0.5" />
                    <text x="725" y="214" textAnchor="middle" fontSize="9" fill="white">n/8</text>
                    <text x="400" y="235" textAnchor="middle" fontSize="10" fill="#6b7280">Level 3: 8·(n/8) = n</text>

                    {/* ... until base case */}
                    <text x="400" y="265" textAnchor="middle" fontSize="10" fill="#6b7280">…</text>
                    <text x="400" y="285" textAnchor="middle" fontSize="10" fill="#6b7280">Level log₂(n): n leaves, each work 1 → total n</text>

                    {/* Total */}
                    <text x="400" y="320" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Total work = n + n + n + ... (log₂(n) + 1) times = O(n log n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    For T(n) = 2T(n/2) + n, each level does n work, and there are log₂(n) levels, giving O(n log n).
                  </p>
                </div>
              </section>

              {/* ── Common Recurrences via Recursion Tree ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Recurrences Solved by Recursion Tree
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Recurrence</th>
                        <th className="px-4 py-2 border-b">Work per Level</th>
                        <th className="px-4 py-2 border-b">Height</th>
                        <th className="px-4 py-2 border-b">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["T(n) = T(n/2) + O(1)", "O(1)", "log₂ n", "O(log n)"],
                        ["T(n) = 2T(n/2) + O(1)", "O(1) (growing)", "log₂ n", "O(n)"],
                        ["T(n) = T(n-1) + O(1)", "O(1)", "n", "O(n)"],
                        ["T(n) = 2T(n/2) + O(n)", "O(n) (each level)", "log₂ n", "O(n log n)"],
                        ["T(n) = T(n-1) + O(n)", "O(n), O(n-1), …", "n", "O(n²)"],
                        ["T(n) = 2T(n-1) + O(1)", "O(2ᵏ) (growing)", "n", "O(2ⁿ)"],
                        ["T(n) = 4T(n/2) + O(n)", "O(n·2ᵏ) (growing)", "log₂ n", "O(n²)"],
                        ["T(n) = T(n/2) + O(n)", "O(n), O(n/2), …", "log₂ n", "O(n)"],
                      ].map(([recurrence, work, height, result], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{recurrence}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{work}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{height}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{result}</td>
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
                      tip: "Always draw the tree",
                      desc: "Visualizing the recursion tree helps understand how work accumulates.",
                    },
                    {
                      tip: "Identify the pattern",
                      desc: "Look for patterns in work per level — constant, growing, or shrinking.",
                    },
                    {
                      tip: "Check the base case",
                      desc: "The tree stops at n/bᵏ = 1, so k = log_b(n). That's the height.",
                    },
                    {
                      tip: "Use the tree to verify Master Theorem results",
                      desc: "The recursion tree method gives the same results as the Master Theorem, helping you understand why.",
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
                    <strong>Forgetting to multiply by the number of nodes at each level:</strong> The total work at a level
                    is number of nodes × work per node, not just work per node.
                  </li>
                  <li>
                    <strong>Assuming work per level is constant when it grows:</strong> For Fibonacci, the work doubles
                    each level, leading to exponential total.
                  </li>
                  <li>
                    <strong>Misidentifying the height of the tree:</strong> For T(n) = T(n-1) + O(1), the height is n,
                    not log n. For T(n) = T(n/2) + O(1), the height is log n.
                  </li>
                  <li>
                    <strong>Ignoring the work at the leaves:</strong> Sometimes leaves do non-constant work; account for them.
                  </li>
                  <li>
                    <strong>Not using the recursion tree for non-D&C recurrences:</strong> The tree method works for any
                    recurrence, including linear ones like T(n) = T(n-1) + n.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> once tried to use the Master Theorem for T(n) = T(n-1) + n and failed.
                      He used the recursion tree and got O(n²) — correctly.
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
                      <strong>Draw the first few levels</strong> to see the pattern before generalizing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use a table to track levels</strong> — level number, number of nodes, work per node, total work.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Verify the total with the Master Theorem</strong> when applicable.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider both the internal nodes and the leaves</strong> — some recurrences have work distributed unevenly.
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
                    "✅ Can you draw a recursion tree for a given recurrence?",
                    "✅ Can you identify the work at each level?",
                    "✅ Can you determine the height of the tree?",
                    "✅ Can you sum the work across all levels?",
                    "✅ Can you use the recursion tree method to solve common recurrences?",
                    "✅ Can you verify your result using the Master Theorem?",
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
                    <strong>Observe carefully:</strong> For T(n) = 2T(n/2) + n, how many nodes at level 0, 1, 2? What is
                    the total work at each level? It's n at every level.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the recurrence were T(n) = 3T(n/3) + n? How would the tree
                    change? The work per level would still be n, but the height would be log₃(n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Naihati</strong> has n students. The principal splits
                    them into 3 groups of n/3, and each group splits further. The recursion tree would have a branching
                    factor of 3 — that's T(n) = 3T(n/3) + O(n), which solves to O(n log n).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursion Tree for Fibonacci ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursion Tree for Fibonacci — Exponential
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Traces the recursion tree for naive Fibonacci, showing the exponential number of calls.
                </p>
                <JavaFileLoader
                  fileModule={recursionTreeFibonacciJava}
                  title="RecursionTreeFibonacci.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursion Tree for Merge Sort ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursion Tree for Merge Sort — O(n log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the balanced recursion tree for merge sort, with n work per level.
                </p>
                <JavaFileLoader
                  fileModule={recursionTreeMergeSortJava}
                  title="RecursionTreeMergeSort.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursion Tree Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursion Tree Analysis — Generic Solver
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A utility that analyzes different recurrences by simulating the recursion tree and computing work per level.
                </p>
                <JavaFileLoader
                  fileModule={recursionTreeAnalysisJava}
                  title="RecursionTreeAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Recursion Trees (Advanced) — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "The recursion tree method is the most intuitive way to solve recurrences. I always start by drawing " +
              "the tree on the board for a simple recurrence like T(n) = 2T(n/2) + n. Students can see that each level " +
              "does n work, and there are log n levels, so the total is n log n. This visual approach builds deep " +
              "intuition that formulas alone can't provide. Encourage students to practice drawing trees for different " +
              "recurrences — it's like a puzzle that reveals the complexity. Also, remind them that the recursion tree " +
              "method works for any recurrence, even those not solvable by the Master Theorem (like T(n) = T(n-1) + n)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 33 · Recursion Trees (Advanced) · Built with ❤️ for the classroom</p>
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

export default Topic33;