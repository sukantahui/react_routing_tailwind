import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import fibonacciBinaryJava from "./topic49_files/FibonacciBinary.java?raw";
import treeTraversalBinaryJava from "./topic49_files/TreeTraversalBinary.java?raw";
import hanoiBinaryJava from "./topic49_files/HanoiBinary.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic49_files/topic49_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic49 = () => {
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
              Topic 49
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursion Patterns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Binary Recursion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">binary recursion</span> —
            where each call branches into two recursive calls, forming a tree of calls with
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> O(2ⁿ)</span> time in the worst case.
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
                  <span className="text-indigo-500">●</span> What is Binary Recursion?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Binary recursion</strong> is a pattern where a function makes <strong>two recursive calls</strong>
                    per invocation, creating a <strong>binary tree</strong> of recursive calls. This is a step up from
                    linear recursion and is typical of divide-and-conquer algorithms that split the problem into two
                    subproblems.
                  </p>
                  <p>
                    The recurrence for binary recursion is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = 2T(n/2) + O(1) &nbsp; or &nbsp; T(n) = T(n-1) + T(n-2) + O(1)
                    </span>
                    The first gives <strong>O(n)</strong> (tree traversal), the second gives <strong>O(2ⁿ)</strong>
                    (naive Fibonacci). Both use <strong>O(n)</strong> space due to the recursion stack.
                  </p>
                  <p>
                    Think of it like a family tree: each person has two parents, who each have two parents, and so on.
                    The number of ancestors doubles each generation — that's binary recursion. Alternatively, think
                    of it like exploring both branches of a binary tree: you visit the left, then the right.
                  </p>
                </div>
              </section>

              {/* ── Characteristics ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🌳",
                      title: "Two Recursive Calls",
                      desc: "Each function call makes exactly two recursive calls (or zero in the base case).",
                    },
                    {
                      icon: "📊",
                      title: "Binary Tree Structure",
                      desc: "The recursion forms a binary tree of calls.",
                    },
                    {
                      icon: "⏱️",
                      title: "O(2ⁿ) or O(n) Time",
                      desc: "Time depends on whether subproblems overlap (O(2ⁿ)) or are independent (O(n)).",
                    },
                    {
                      icon: "💾",
                      title: "O(n) Space",
                      desc: "The recursion stack depth is n, so space is O(n) in the worst case.",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Binary Recursion Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Examples
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Algorithm</th>
                        <th className="px-4 py-2 border-b">Recurrence</th>
                        <th className="px-4 py-2 border-b">Time</th>
                        <th className="px-4 py-2 border-b">Space</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Naive Fibonacci", "T(n) = T(n-1) + T(n-2) + O(1)", "O(2ⁿ)", "O(n)"],
                        ["Tree Traversal", "T(n) = 2T(n/2) + O(1)", "O(n)", "O(log n)"],
                        ["Tower of Hanoi", "T(n) = 2T(n-1) + O(1)", "O(2ⁿ)", "O(n)"],
                        ["Binary Search (recursive)", "T(n) = T(n/2) + O(1)", "O(log n)", "O(log n)"],
                        ["Divide & Conquer Max", "T(n) = 2T(n/2) + O(1)", "O(n)", "O(log n)"],
                      ].map(([algorithm, recurrence, time, space], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100">{algorithm}</td>
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{recurrence}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{time}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: The Binary Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Binary recursion tree"
                  >
                    <defs>
                      <marker id="arrow49" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Binary Recursion: A Tree of Calls
                    </text>

                    {/* Level 0 */}
                    <circle cx="400" cy="50" r="20" fill="#818cf8" opacity="0.9" />
                    <text x="400" y="56" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">n</text>

                    {/* Level 1 */}
                    <line x1="400" y1="70" x2="280" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow49)" />
                    <line x1="400" y1="70" x2="520" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow49)" />
                    <circle cx="280" cy="105" r="18" fill="#34d399" opacity="0.8" />
                    <text x="280" y="111" textAnchor="middle" fontSize="10" fill="white">n-1</text>
                    <circle cx="520" cy="105" r="18" fill="#34d399" opacity="0.8" />
                    <text x="520" y="111" textAnchor="middle" fontSize="10" fill="white">n-2</text>

                    {/* Level 2 */}
                    <line x1="280" y1="123" x2="210" y2="140" stroke="#6b7280" strokeWidth="2" />
                    <line x1="280" y1="123" x2="350" y2="140" stroke="#6b7280" strokeWidth="2" />
                    <line x1="520" y1="123" x2="450" y2="140" stroke="#6b7280" strokeWidth="2" />
                    <line x1="520" y1="123" x2="590" y2="140" stroke="#6b7280" strokeWidth="2" />
                    <circle cx="210" cy="155" r="15" fill="#f472b6" opacity="0.7" />
                    <text x="210" y="160" textAnchor="middle" fontSize="9" fill="white">n-2</text>
                    <circle cx="350" cy="155" r="15" fill="#f472b6" opacity="0.7" />
                    <text x="350" y="160" textAnchor="middle" fontSize="9" fill="white">n-3</text>
                    <circle cx="450" cy="155" r="15" fill="#f472b6" opacity="0.7" />
                    <text x="450" y="160" textAnchor="middle" fontSize="9" fill="white">n-3</text>
                    <circle cx="590" cy="155" r="15" fill="#f472b6" opacity="0.7" />
                    <text x="590" y="160" textAnchor="middle" fontSize="9" fill="white">n-4</text>

                    {/* Level 3 */}
                    <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#6b7280">… (exponential growth)</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                        Number of calls doubles at each level → 2ⁿ calls total
                    </text>
                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#6b7280">
                        Depth = n → O(n) stack space
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Binary recursion creates a binary tree of calls. The number of calls grows exponentially (2ⁿ),
                    but the depth is n (O(n) space).
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50/60 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="font-semibold text-red-600 dark:text-red-400">Exponential (Overlapping)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + T(n-2) + O(1), &nbsp; T(0)=T(1)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-red-600 dark:text-red-400">O(2ⁿ)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Example: Naive Fibonacci
                    </p>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Linear (Non-overlapping)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = 2T(n/2) + O(1), &nbsp; T(1) = O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Example: Tree Traversal
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Both use <span className="font-mono">O(n)</span> space for the recursion stack.
                </p>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Genealogy (Family Tree):</span>{" "}
                      Each person has two parents (binary recursion). The number of ancestors doubles each generation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Binary Tree Traversal:</span>{" "}
                      Exploring a binary tree: visit left subtree, visit right subtree.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> and <strong>Tuhina</strong> are exploring all possible paths in a
                      binary decision tree. Each decision branches into two options — that's binary recursion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Game Trees:</span>{" "}
                      In chess, each position branches into many moves, but a binary decision tree is a simplified
                      version where each position has two options.
                    </p>
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
                      tip: "Use memoization for overlapping subproblems",
                      desc: "Naive Fibonacci (O(2ⁿ)) can be reduced to O(n) with memoization.",
                    },
                    {
                      tip: "Understand the difference between overlapping and non-overlapping",
                      desc: "Tree traversal is O(n) because subproblems don't overlap; Fibonacci is O(2ⁿ) because they do.",
                    },
                    {
                      tip: "Space is O(n) for both types",
                      desc: "The recursion depth is n for both, so space is linear.",
                    },
                    {
                      tip: "Use iteration or DP when possible",
                      desc: "For Fibonacci, iteration is O(n) time and O(1) space.",
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
                    <strong>Confusing overlapping and non-overlapping subproblems:</strong> Tree traversal is O(n)
                    because each node is visited once. Fibonacci is O(2ⁿ) because the same subproblems are
                    recomputed many times.
                  </li>
                  <li>
                    <strong>Ignoring the exponential time in Fibonacci:</strong> Many beginners think Fibonacci
                    is O(n) because it looks simple. It's actually O(2ⁿ) — a huge difference.
                  </li>
                  <li>
                    <strong>Forgetting the base case:</strong> Binary recursion requires two base cases (n=0 and n=1
                    for Fibonacci, or n=1 for tree traversal).
                  </li>
                  <li>
                    <strong>Assuming space is also exponential:</strong> Space is O(n) for both types because
                    only one path is explored at a time.
                  </li>
                  <li>
                    <strong>Not using memoization for overlapping subproblems:</strong> Memoization turns O(2ⁿ)
                    into O(n) for Fibonacci.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once ran fib(40) and waited 5 minutes. She learned about
                      memoization and got the answer instantly.
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
                      <strong>Use memoization</strong> for overlapping subproblems to reduce exponential time to polynomial.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative DP</strong> for O(1) space when possible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Identify the recursion type</strong> — overlapping or non-overlapping — to determine the correct complexity.
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
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you identify binary recursion in code?",
                    "✅ Do you know the two types (overlapping and non-overlapping)?",
                    "✅ Do you know the time complexity for each type?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement binary recursion with correct base cases?",
                    "✅ Can you use memoization for overlapping subproblems?",
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
                    <strong>Observe carefully:</strong> For naive Fibonacci, how many calls are made for fib(5)?
                    15 calls. For fib(10), 177 calls. For fib(30), 2.6 million calls. That's exponential growth!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you add memoization to Fibonacci? The number of calls
                    becomes O(n) — a huge improvement!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a binary tree of
                    decisions for scheduling. Traversing the entire tree visits each node once (O(n)), but exploring
                    all paths (like Fibonacci) would be exponential.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Fibonacci Binary ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Recursion — Naive Fibonacci (O(2ⁿ))
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Classic binary recursion with overlapping subproblems — O(2ⁿ) time, O(n) space.
                </p>
                <JavaFileLoader
                  fileModule={fibonacciBinaryJava}
                  title="FibonacciBinary.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tree Traversal Binary ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Recursion — Tree Traversal (O(n))
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Binary recursion without overlapping subproblems — O(n) time, O(n) space.
                </p>
                <JavaFileLoader
                  fileModule={treeTraversalBinaryJava}
                  title="TreeTraversalBinary.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Hanoi Binary ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Recursion — Tower of Hanoi (O(2ⁿ))
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Binary recursion with two calls on n-1 — O(2ⁿ) time, O(n) space.
                </p>
                <JavaFileLoader
                  fileModule={hanoiBinaryJava}
                  title="HanoiBinary.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Binary Recursion — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Binary recursion is a powerful pattern, but students often confuse the two types: overlapping and 
              non-overlapping subproblems. I emphasize that tree traversal is O(n) because each node is visited once, 
              while Fibonacci is O(2ⁿ) because of repeated work. This is the perfect lead-in to memoization and 
              dynamic programming. Show students the call tree for fib(5) and then fib(10) to visualize the explosion. 
              Also, remind them that space is O(n) for both because the recursion stack depth is linear. 
              Binary recursion is the foundation of many important algorithms, from sorting to graph traversal.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 49 · Binary Recursion · Built with ❤️ for the classroom</p>
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

export default Topic49;