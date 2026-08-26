import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recurrenceReviewJava from "./topic31_files/RecurrenceReview.java?raw";
import masterTheoremExamplesJava from "./topic31_files/MasterTheoremExamples.java?raw";
import recursionTreeMethodJava from "./topic31_files/RecursionTreeMethod.java?raw";
import advancedRecursiveAnalysisJava from "./topic31_files/AdvancedRecursiveAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic31_files/topic31_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic31 = () => {
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
              Topic 31
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Advanced Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Analyzing Recursive Algorithms (Advanced)
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A comprehensive guide to analyzing recursive algorithms — from writing recurrences to applying the
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> Master Theorem</span> and
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> recursion trees</span>.
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
                  <span className="text-indigo-500">●</span> The Art of Analyzing Recursive Algorithms
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Analyzing recursive algorithms is a <strong>systematic process</strong> that combines:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Writing recurrence relations:</strong> Expressing T(n) in terms of smaller subproblems.
                    </li>
                    <li>
                      <strong>Choosing the right solution method:</strong> Substitution, iteration, recursion tree, or Master Theorem.
                    </li>
                    <li>
                      <strong>Considering both time and space:</strong> The recursion stack consumes O(depth) memory.
                    </li>
                    <li>
                      <strong>Identifying the type of recursion:</strong> Linear, binary, multiple, tail, or divide-and-conquer.
                    </li>
                  </ul>
                  <p>
                    In this topic, we'll build on the foundations from Topics 16-18 and 53-57 to provide a
                    <strong>complete framework</strong> for analyzing any recursive algorithm.
                  </p>
                </div>
              </section>

              {/* ── The Analysis Framework ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> The Analysis Framework
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "Step 1: Write the Recurrence",
                      desc: "Identify T(n) in terms of T(smaller) + work(n). Include the base case.",
                      icon: "📝",
                    },
                    {
                      step: "Step 2: Identify the Recursion Type",
                      desc: "Is it linear (T(n-1)), divide-and-conquer (T(n/2)), or branching (2T(n/2))?",
                      icon: "🔍",
                    },
                    {
                      step: "Step 3: Choose a Solution Method",
                      desc: "Master Theorem (if applicable), recursion tree, substitution, or iteration.",
                      icon: "🎯",
                    },
                    {
                      step: "Step 4: Solve and Verify",
                      desc: "Solve the recurrence and verify with small values of n.",
                      icon: "✅",
                    },
                    {
                      step: "Step 5: Analyze Space Complexity",
                      desc: "Count the maximum recursion depth and any auxiliary memory.",
                      icon: "💾",
                    },
                    {
                      step: "Step 6: Document and Optimize",
                      desc: "Consider tail recursion, memoization, or iterative alternatives.",
                      icon: "⚡",
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

              {/* ── The Recurrence Cheat Sheet ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Cheat Sheet
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Recurrence</th>
                        <th className="px-4 py-2 border-b">Recursion Type</th>
                        <th className="px-4 py-2 border-b">Solution</th>
                        <th className="px-4 py-2 border-b">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["T(n) = T(n-1) + O(1)", "Linear", "O(n)", "Factorial"],
                        ["T(n) = T(n-1) + O(n)", "Linear", "O(n²)", "Selection Sort"],
                        ["T(n) = T(n/2) + O(1)", "Divide & Conquer", "O(log n)", "Binary Search"],
                        ["T(n) = T(n/2) + O(n)", "Divide & Conquer", "O(n)", "Find Max (D&C)"],
                        ["T(n) = 2T(n/2) + O(1)", "Binary", "O(n)", "Tree Traversal"],
                        ["T(n) = 2T(n/2) + O(n)", "Divide & Conquer", "O(n log n)", "Merge Sort"],
                        ["T(n) = 2T(n/2) + O(n log n)", "Divide & Conquer", "O(n log² n)", "Special Case"],
                        ["T(n) = T(n-1) + T(n-2) + O(1)", "Binary (overlap)", "O(2ⁿ)", "Naive Fibonacci"],
                        ["T(n) = 2T(n-1) + O(1)", "Binary (overlap)", "O(2ⁿ)", "Tower of Hanoi"],
                        ["T(n) = 3T(n/3) + O(n)", "Divide & Conquer", "O(n log n)", "3-way Merge Sort"],
                        ["T(n) = 4T(n/2) + O(n)", "Divide & Conquer", "O(n²)", "Strassen-like"],
                        ["T(n) = T(n-1) + T(n-2) + O(n)", "Binary (overlap)", "O(n·2ⁿ)", "Modified Fibonacci"],
                      ].map(([recurrence, type, solution, example], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{recurrence}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{type}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{solution}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recursion Tree Types
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Recursion tree types"
                  >
                    <defs>
                      <marker id="arrow31" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Linear Recursion */}
                    <text x="100" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Linear: O(n)</text>
                    <circle cx="100" cy="40" r="12" fill="#818cf8" />
                    <line x1="100" y1="52" x2="100" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="100" cy="80" r="10" fill="#34d399" />
                    <line x1="100" y1="90" x2="100" y2="110" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="100" cy="120" r="8" fill="#f472b6" />
                    <text x="100" y="150" textAnchor="middle" fontSize="9" fill="#6b7280">…</text>

                    {/* Binary Recursion */}
                    <text x="300" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Binary: O(n)</text>
                    <circle cx="300" cy="40" r="12" fill="#818cf8" />
                    <line x1="300" y1="52" x2="280" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="300" y1="52" x2="320" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="280" cy="80" r="10" fill="#34d399" />
                    <circle cx="320" cy="80" r="10" fill="#34d399" />
                    <line x1="280" y1="90" x2="270" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="280" y1="90" x2="290" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="320" y1="90" x2="310" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="320" y1="90" x2="330" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="270" cy="115" r="7" fill="#f472b6" />
                    <circle cx="290" cy="115" r="7" fill="#f472b6" />
                    <circle cx="310" cy="115" r="7" fill="#f472b6" />
                    <circle cx="330" cy="115" r="7" fill="#f472b6" />

                    {/* Divide & Conquer */}
                    <text x="550" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Divide & Conquer: O(n log n)</text>
                    <circle cx="550" cy="40" r="12" fill="#818cf8" />
                    <line x1="550" y1="52" x2="520" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="52" x2="580" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="520" cy="80" r="10" fill="#34d399" />
                    <circle cx="580" cy="80" r="10" fill="#34d399" />
                    <line x1="520" y1="90" x2="505" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="520" y1="90" x2="535" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="580" y1="90" x2="565" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="580" y1="90" x2="595" y2="105" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="505" cy="115" r="7" fill="#f472b6" />
                    <circle cx="535" cy="115" r="7" fill="#f472b6" />
                    <circle cx="565" cy="115" r="7" fill="#f472b6" />
                    <circle cx="595" cy="115" r="7" fill="#f472b6" />

                    {/* Labels */}
                    <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#6b7280">
                      Each node represents a recursive call. The shape determines the complexity.
                    </text>
                    <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#6b7280">
                      Linear = chain, Binary = balanced tree, D&C = full tree with O(n) work per level.
                    </text>

                    {/* Overlapping subproblems example */}
                    <text x="400" y="235" textAnchor="middle" fontSize="11" fill="#f87171">
                      ⚠️ Overlapping subproblems (like Fibonacci) → use memoization!
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Different recursion structures lead to different complexities. The key is to identify the pattern
                    and choose the right solution method.
                  </p>
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
                      tip: "Always include the base case in the recurrence",
                      desc: "T(0) = O(1) or T(1) = O(1) is essential for solving.",
                    },
                    {
                      tip: "Use the Master Theorem when applicable",
                      desc: "For T(n) = a·T(n/b) + f(n), it provides a direct solution.",
                    },
                    {
                      tip: "Draw the recursion tree",
                      desc: "Visualizing the tree helps identify the pattern of work.",
                    },
                    {
                      tip: "Check for overlapping subproblems",
                      desc: "If subproblems repeat, use memoization to reduce exponential time.",
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
                    <strong>Forgetting the base case in the recurrence:</strong> The recurrence is incomplete without
                    T(0) = O(1) or T(1) = O(1).
                  </li>
                  <li>
                    <strong>Confusing the number of calls with the work per call:</strong> Fibonacci has 2ⁿ calls,
                    but each call does O(1) work → total O(2ⁿ). Merge sort has 2ᵏ calls at each level, each does
                    O(n) work per level → total O(n log n).
                  </li>
                  <li>
                    <strong>Misapplying the Master Theorem:</strong> The Master Theorem only applies to recurrences
                    of the form T(n) = a·T(n/b) + f(n). Check the conditions before using it.
                  </li>
                  <li>
                    <strong>Ignoring the recursion stack in space analysis:</strong> Recursive algorithms use
                    O(depth) memory on the stack, which can be significant.
                  </li>
                  <li>
                    <strong>Not checking for overlapping subproblems:</strong> Some recurrences have overlapping
                    subproblems (like Fibonacci) that can be optimized with memoization.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once analyzed Fibonacci as O(2ⁿ) and didn't realize that memoization
                      would make it O(n). She learned to always check for overlapping subproblems.
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
                      <strong>Always document the recurrence</strong> in comments before the recursive function.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use multiple methods to verify</strong> — cross-check your solution with recursion trees and the Master Theorem.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider iterative alternatives</strong> when the recursion depth is large.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use memoization</strong> for overlapping subproblems to reduce exponential time to polynomial.
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
                    "✅ Can you write the recurrence for any recursive algorithm?",
                    "✅ Can you identify the recursion type (linear, binary, D&C)?",
                    "✅ Do you know which solution method to apply?",
                    "✅ Can you use the Master Theorem correctly?",
                    "✅ Can you draw and analyze a recursion tree?",
                    "✅ Can you analyze both time and space complexity?",
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
                    <strong>Observe carefully:</strong> For a recursive function that makes 2 calls on half the input
                    (like merge sort), the recurrence is T(n) = 2T(n/2) + O(n). This solves to O(n log n) by the
                    Master Theorem.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the function makes 3 calls on one-third of the input?
                    The recurrence is T(n) = 3T(n/3) + O(n), which also solves to O(n log n). The base doesn't matter!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a recursive algorithm
                    to process student records. If it splits the records into two halves and processes each,
                    the recurrence is T(n) = 2T(n/2) + O(n). This is O(n log n) — efficient for thousands of records.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recurrence Review ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recurrence Review — Writing and Solving
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Reviews how to write recurrences for different recursive algorithms and solve them.
                </p>
                <JavaFileLoader
                  fileModule={recurrenceReviewJava}
                  title="RecurrenceReview.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Master Theorem Examples ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Master Theorem — Applied to Real Algorithms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Applies the Master Theorem to common recursive algorithms like merge sort and binary search.
                </p>
                <JavaFileLoader
                  fileModule={masterTheoremExamplesJava}
                  title="MasterTheoremExamples.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursion Tree Method ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursion Tree Method — Visual Analysis
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates the recursion tree method for solving recurrences step by step.
                </p>
                <JavaFileLoader
                  fileModule={recursionTreeMethodJava}
                  title="RecursionTreeMethod.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Advanced Recursive Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Advanced Recursive Analysis — Complete Examples
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete analysis of multiple recursive algorithms with full recurrence, solution, and complexity.
                </p>
                <JavaFileLoader
                  fileModule={advancedRecursiveAnalysisJava}
                  title="AdvancedRecursiveAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Analyzing Recursive Algorithms (Advanced) — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Analyzing recursive algorithms is a skill that improves with practice. I emphasize the systematic approach: " +
              "write the recurrence first, identify the pattern, then apply the right solution method. " +
              "The Master Theorem is a powerful tool, but I remind students that it has conditions — don't use it blindly. " +
              "The recursion tree method is more general and builds intuition. " +
              "Also, space complexity is often overlooked: recursion uses the stack, so depth matters. " +
              "Finally, always check for overlapping subproblems — memoization can turn exponential time into linear. " +
              "With practice, students will be able to analyze any recursive algorithm they encounter."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 31 · Analyzing Recursive Algorithms (Advanced) · Built with ❤️ for the classroom</p>
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

export default Topic31;