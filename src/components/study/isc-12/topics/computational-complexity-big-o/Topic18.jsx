import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import factorialTreeJava from "./topic18_files/FactorialTree.java?raw";
import binarySearchTreeJava from "./topic18_files/BinarySearchTree.java?raw";
import mergeSortTreeJava from "./topic18_files/MergeSortTree.java?raw";
import fibonacciTreeJava from "./topic18_files/FibonacciTree.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic18_files/topic18_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic18 = () => {
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
              Topic 18
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recurrence Solving
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recursion Trees
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A <span className="text-indigo-600 dark:text-indigo-400 font-semibold">visual approach</span> to solving
            recurrence relations — drawing the recursion tree to understand how work accumulates and derive asymptotic complexity.
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
                  <span className="text-indigo-500">●</span> What is a Recursion Tree?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>recursion tree</strong> is a visual representation of the recursive calls made by an
                    algorithm. Each node represents a subproblem, and the children of a node represent the recursive
                    calls it makes. The recursion tree helps us analyze the total work done by a recursive algorithm
                    by summing the work at each level.
                  </p>
                  <p>
                    The method works for any recurrence of the form <strong>T(n) = a·T(n/b) + f(n)</strong>:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Root:</strong> Represents T(n) with work f(n).</li>
                    <li><strong>Children:</strong> a subproblems of size n/b, each with work f(n/b).</li>
                    <li><strong>Levels:</strong> Each level divides the problem by b and multiplies the number of nodes by a.</li>
                    <li><strong>Total work:</strong> Sum of work at all levels = height of tree × work per level (if uniform).</li>
                  </ul>
                  <p>
                    Think of it like an organization chart: the CEO (root) has managers (children), who have team leads
                    (grandchildren), down to individual contributors (leaves). The total work is the sum of work done
                    at each level of the hierarchy.
                  </p>
                </div>
              </section>

              {/* ── Building a Recursion Tree ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Building a Recursion Tree
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "Step 1: Root",
                      desc: "Start with the root node representing T(n). The work at this level is f(n).",
                      example: "For T(n) = 2T(n/2) + n, root has work n.",
                    },
                    {
                      step: "Step 2: Children",
                      desc: "Add a children nodes, each of size n/b. Each child has work f(n/b).",
                      example: "2 children of size n/2, each with work n/2.",
                    },
                    {
                      step: "Step 3: Recursively expand",
                      desc: "Continue expanding until reaching the base case (size = 1).",
                      example: "At level k, there are aᵏ nodes of size n/bᵏ.",
                    },
                    {
                      step: "Step 4: Sum work",
                      desc: "Sum the work at each level, then sum across all levels.",
                      example: "Total = sum_{k=0}^{log_b n} aᵏ · f(n/bᵏ).",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recursion Tree for Merge Sort
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Recursion tree for merge sort"
                  >
                    <defs>
                      <marker id="arrow18" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Level 0 - Root */}
                    <rect x="320" y="20" width="160" height="35" rx="8" fill="#818cf8" opacity="0.9" />
                    <text x="400" y="45" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">T(n)</text>
                    <text x="400" y="70" textAnchor="middle" fontSize="11" fill="#6b7280">Work: n</text>

                    {/* Level 1 - Children */}
                    <rect x="150" y="90" width="130" height="32" rx="8" fill="#34d399" opacity="0.8" />
                    <text x="215" y="112" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">T(n/2)</text>
                    <text x="215" y="135" textAnchor="middle" fontSize="10" fill="#6b7280">Work: n/2</text>

                    <rect x="520" y="90" width="130" height="32" rx="8" fill="#34d399" opacity="0.8" />
                    <text x="585" y="112" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">T(n/2)</text>
                    <text x="585" y="135" textAnchor="middle" fontSize="10" fill="#6b7280">Work: n/2</text>

                    {/* Level 2 - Grandchildren */}
                    <rect x="80" y="160" width="100" height="28" rx="8" fill="#f472b6" opacity="0.7" />
                    <text x="130" y="180" textAnchor="middle" fontSize="11" fill="white">T(n/4)</text>
                    <text x="130" y="198" textAnchor="middle" fontSize="9" fill="#6b7280">Work: n/4</text>

                    <rect x="210" y="160" width="100" height="28" rx="8" fill="#f472b6" opacity="0.7" />
                    <text x="260" y="180" textAnchor="middle" fontSize="11" fill="white">T(n/4)</text>
                    <text x="260" y="198" textAnchor="middle" fontSize="9" fill="#6b7280">Work: n/4</text>

                    <rect x="490" y="160" width="100" height="28" rx="8" fill="#f472b6" opacity="0.7" />
                    <text x="540" y="180" textAnchor="middle" fontSize="11" fill="white">T(n/4)</text>
                    <text x="540" y="198" textAnchor="middle" fontSize="9" fill="#6b7280">Work: n/4</text>

                    <rect x="620" y="160" width="100" height="28" rx="8" fill="#f472b6" opacity="0.7" />
                    <text x="670" y="180" textAnchor="middle" fontSize="11" fill="white">T(n/4)</text>
                    <text x="670" y="198" textAnchor="middle" fontSize="9" fill="#6b7280">Work: n/4</text>

                    {/* Level 3 - Leaves */}
                    <rect x="40" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="75" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    <rect x="130" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="165" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    <rect x="220" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="255" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    <rect x="450" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="485" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    <rect x="540" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="575" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    <rect x="630" y="230" width="70" height="24" rx="6" fill="#fbbf24" opacity="0.6" />
                    <text x="665" y="247" textAnchor="middle" fontSize="9" fill="white">T(1)</text>

                    {/* Edges */}
                    <line x1="400" y1="55" x2="215" y2="90" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="55" x2="585" y2="90" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="215" y1="122" x2="130" y2="160" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="215" y1="122" x2="260" y2="160" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="585" y1="122" x2="540" y2="160" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="585" y1="122" x2="670" y2="160" stroke="#6b7280" strokeWidth="1.5" />

                    {/* Level summaries */}
                    <text x="420" y="320" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Level 0: n work, Level 1: 2·(n/2) = n work, Level 2: 4·(n/4) = n work
                    </text>
                    <text x="420" y="340" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Total work = n · (log₂(n) + 1) = O(n log n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    For merge sort, each level does n work, and there are log₂(n) + 1 levels. Total = O(n log n).
                  </p>
                </div>
              </section>

              {/* ── Recursion Tree Method Steps ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Step-by-Step Method
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Draw the recursion tree</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start with the root (T(n)) and expand each node's children until reaching the base case.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Determine the work at each level</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">For level k, the number of nodes is aᵏ, and each does f(n/bᵏ) work.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Find the total work per level</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sum the work of all nodes at that level: aᵏ · f(n/bᵏ).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Sum across all levels</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{`T(n) = Σ_{k=0}^{log_b n} aᵏ · f(n/bᵏ).`} Then simplify to get the complexity.</p>
                  </div>
                </div>
              </section>

              {/* ── Common Recurrences Solved by Recursion Tree ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Recurrences via Recursion Tree
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
                        ["T(n) = 2T(n/2) + O(1)", "O(1)", "log₂ n", "O(n)"],
                        ["T(n) = T(n-1) + O(1)", "O(1)", "n", "O(n)"],
                        ["T(n) = 2T(n/2) + O(n)", "O(n) (each level)", "log₂ n", "O(n log n)"],
                        ["T(n) = T(n-1) + O(n)", "O(n), O(n-1), ...", "n", "O(n²)"],
                        ["T(n) = 2T(n-1) + O(1)", "O(2ᵏ) (grows)", "n", "O(2ⁿ)"],
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
                    <strong>Confusing the recursion tree method with the recurrence tree:</strong> They are the same thing —
                    drawing the recursive calls to visualize the recurrence.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> once tried to solve T(n) = 2T(n/2) + n using the recursion tree method
                      but forgot that each level has 2ᵏ nodes, not just one.
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

              {/* ── Java: Factorial Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Factorial Recursion Tree — Linear
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Traces the recursion tree for factorial, showing the linear chain of calls.
                </p>
                <JavaFileLoader
                  fileModule={factorialTreeJava}
                  title="FactorialTree.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search Recursion Tree — Logarithmic
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the recursion tree for binary search, with only one branch at each level.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchTreeJava}
                  title="BinarySearchTree.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Merge Sort Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort Recursion Tree — n log n
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Traces the balanced recursion tree for merge sort, showing n work per level.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortTreeJava}
                  title="MergeSortTree.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Fibonacci Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Fibonacci Recursion Tree — Exponential
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the explosive recursion tree for naive Fibonacci, with overlapping subproblems.
                </p>
                <JavaFileLoader
                  fileModule={fibonacciTreeJava}
                  title="FibonacciTree.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Recursion Trees — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "The recursion tree method is one of the most intuitive ways to solve recurrences. I always start by " +
              "drawing the tree on the board for a simple recurrence like T(n) = 2T(n/2) + n. Students can see that " +
              "each level does n work, and there are log n levels, so the total is n log n. This visual approach " +
              "builds deep intuition that formulas alone can't provide. Encourage students to practice drawing trees " +
              "for different recurrences — it's like a puzzle that reveals the complexity. Also, remind them that " +
              "the recursion tree method works for any recurrence, even those not solvable by the Master Theorem."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 18 · Recursion Trees · Built with ❤️ for the classroom</p>
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

export default Topic18;