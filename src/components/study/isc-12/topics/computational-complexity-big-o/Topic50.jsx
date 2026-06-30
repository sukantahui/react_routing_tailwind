import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import multipleRecursionJava from "./topic50_files/MultipleRecursion.java?raw";
import treeNFibJava from "./topic50_files/TreeNFib.java?raw";
import multipleRecursionAnalysisJava from "./topic50_files/MultipleRecursionAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic50_files/topic50_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic50 = () => {
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
              Topic 50
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursion Patterns
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Multiple Recursion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">multiple recursion</span> —
            where a function makes <strong>three or more</strong> recursive calls per invocation, leading to
            <span className="text-red-600 dark:text-red-400 font-semibold"> O(kⁿ)</span> time in the worst case.
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
                  <span className="text-indigo-500">●</span> What is Multiple Recursion?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Multiple recursion</strong> (also called <strong>n-ary recursion</strong>) occurs when a
                    function makes <strong>three or more</strong> recursive calls per invocation. This pattern
                    generalizes binary recursion to higher branching factors, creating a <strong>k-ary tree</strong>
                    of recursive calls.
                  </p>
                  <p>
                    The recurrence for multiple recursion is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = a·T(n/b) + O(1) &nbsp; or &nbsp; T(n) = a·T(n-1) + O(1)
                    </span>
                    where <strong>a</strong> is the number of recursive calls (a ≥ 3). This gives
                    <span className="text-red-600 dark:text-red-400 font-semibold"> O(aⁿ)</span> time in the worst case
                    (if a > 1 and reduction is by a constant), or <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n)</span>
                    if the subproblems are independent and divided by a factor.
                  </p>
                  <p>
                    Think of it like a tree where each node has <strong>a</strong> children. The total number of
                    nodes is exponential in the depth. This pattern appears in algorithms that explore all possibilities
                    (e.g., n-queens, m-coloring, combinatorial problems).
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
                      icon: "🌲",
                      title: "Three or More Calls",
                      desc: "Each function call makes a ≥ 3 recursive calls.",
                    },
                    {
                      icon: "📊",
                      title: "K-ary Tree Structure",
                      desc: "The recursion forms a tree with branching factor a.",
                    },
                    {
                      icon: "⏱️",
                      title: "O(aⁿ) or O(n) Time",
                      desc: "Time depends on whether subproblems overlap and the reduction factor.",
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

              {/* ── Common Multiple Recursion Examples ── */}
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
                        ["m-coloring (backtracking)", "T(n) = m·T(n-1) + O(1)", "O(mⁿ)", "O(n)"],
                        ["n-queens (backtracking)", "T(n) = n·T(n-1) + O(1)", "O(n!)", "O(n)"],
                        ["Tree with 3 children", "T(n) = 3T(n/3) + O(1)", "O(n)", "O(log n)"],
                        ["3-way merge sort", "T(n) = 3T(n/3) + O(n)", "O(n log n)", "O(n)"],
                        ["Multiple recursive calls with reduction by constant", "T(n) = a·T(n/c) + O(1)", "O(n^(log_c a))", "O(log n)"],
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
                  <span className="text-indigo-500">●</span> Visual Intuition: K-ary Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 280"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Multiple recursion tree"
                  >
                    <defs>
                      <marker id="arrow50" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Multiple Recursion: Tree with Branching Factor a (here a=3)
                    </text>

                    {/* Level 0 */}
                    <circle cx="400" cy="50" r="20" fill="#818cf8" opacity="0.9" />
                    <text x="400" y="56" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">n</text>

                    {/* Level 1 */}
                    <line x1="400" y1="70" x2="250" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow50)" />
                    <line x1="400" y1="70" x2="400" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow50)" />
                    <line x1="400" y1="70" x2="550" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow50)" />
                    <circle cx="250" cy="105" r="18" fill="#34d399" opacity="0.8" />
                    <text x="250" y="111" textAnchor="middle" fontSize="10" fill="white">n-1</text>
                    <circle cx="400" cy="105" r="18" fill="#34d399" opacity="0.8" />
                    <text x="400" y="111" textAnchor="middle" fontSize="10" fill="white">n-1</text>
                    <circle cx="550" cy="105" r="18" fill="#34d399" opacity="0.8" />
                    <text x="550" y="111" textAnchor="middle" fontSize="10" fill="white">n-1</text>

                    {/* Level 2 */}
                    <line x1="250" y1="123" x2="190" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="123" x2="250" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="123" x2="310" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="123" x2="340" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="123" x2="400" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="123" x2="460" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="123" x2="490" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="123" x2="550" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="123" x2="610" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="190" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="190" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="250" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="250" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="310" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="310" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="340" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="340" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="400" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="400" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="460" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="460" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="490" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="490" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="550" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="550" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>
                    <circle cx="610" cy="155" r="13" fill="#f472b6" opacity="0.7" />
                    <text x="610" y="160" textAnchor="middle" fontSize="8" fill="white">n-2</text>

                    {/* Level 3 */}
                    <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#6b7280">… (exponential growth)</text>

                    <text x="400" y="240" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                        Number of calls = aⁿ (exponential). Depth = n → O(n) space.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Multiple recursion with branching factor a creates a tree with aⁿ nodes. The depth is n,
                    so space is O(n), but time is exponential.
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
                    <p className="font-semibold text-red-600 dark:text-red-400">Exponential (a > 1, reduction by 1)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = a·T(n-1) + O(1), &nbsp; T(0)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-red-600 dark:text-red-400">O(aⁿ)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Example: m-coloring (a = m)
                    </p>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Linear (a > 1, reduction by a)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = a·T(n/a) + O(1), &nbsp; T(1)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Example: Tree with a children (branching factor a)
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Both use <span className="font-mono">O(n)</span> space for the recursion stack in the worst case.
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">N-Queens Problem:</span>{" "}
                      Placing n queens on an n×n board. Each row has n choices, leading to nⁿ possibilities (with pruning, n!).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Graph Coloring:</span>{" "}
                      Coloring a graph with m colors. Each vertex has m choices, leading to mⁿ possibilities.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is exploring all possible paths in a maze where each intersection has
                      3 choices (left, straight, right). That's 3ⁿ paths — multiple recursion!
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI Decision Trees:</span>{" "}
                      In game AI, each state may have many possible moves (branching factor > 2). Exploring all
                      moves is multiple recursion.
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
                      tip: "Use pruning (backtracking) to reduce branches",
                      desc: "In many problems (like n-queens), you can prune invalid branches early.",
                    },
                    {
                      tip: "Use memoization when subproblems overlap",
                      desc: "If subproblems repeat, memoization can reduce exponential time.",
                    },
                    {
                      tip: "Consider dynamic programming",
                      desc: "Many multiple recursion problems can be solved with DP to reduce time complexity.",
                    },
                    {
                      tip: "Space is O(n) even for exponential time",
                      desc: "The recursion stack depth is linear, not exponential.",
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
                    <strong>Assuming multiple recursion is always exponential:</strong> If the input is divided by
                    the branching factor, the complexity can be linear (e.g., tree with a children).
                  </li>
                  <li>
                    <strong>Underestimating the number of calls:</strong> For a=3 and n=10, there are 3¹⁰ = 59,049
                    calls. For n=20, 3.4 billion calls — impossible!
                  </li>
                  <li>
                    <strong>Forgetting to prune:</strong> Without pruning, multiple recursion explores many impossible
                    branches. Pruning is essential for backtracking algorithms.
                  </li>
                  <li>
                    <strong>Ignoring the base case:</strong> Multiple recursion still requires a base case to terminate.
                  </li>
                  <li>
                    <strong>Assuming space is also exponential:</strong> Space is O(n) because the stack depth is n,
                    not the total number of calls.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once thought the space complexity of n-queens was O(nⁿ) because of
                      the number of calls. She learned that only the stack depth matters.
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
                      <strong>Use pruning</strong> to eliminate invalid branches early in backtracking.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use memoization</strong> when subproblems overlap to reduce exponential time.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use dynamic programming</strong> for problems with optimal substructure.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider the branching factor</strong> — if a is large, the algorithm becomes infeasible quickly.
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
                    "✅ Can you identify multiple recursion (a ≥ 3 calls)?",
                    "✅ Do you know the two types (exponential vs linear)?",
                    "✅ Do you know the time complexity for each type?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement pruning to reduce branches?",
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
                    <strong>Observe carefully:</strong> For multiple recursion with a=3 and n=10, how many calls?
                    3¹⁰ ≈ 59,049. For n=20, 3.4 billion. That's exponential growth!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you add pruning to a backtracking algorithm? The number
                    of calls can be drastically reduced in practice.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a maze with 10
                    intersections, each with 3 paths. Exploring all paths without pruning would be 3¹⁰ = 59,049
                    paths — manageable. With 20 intersections, it's 3.4 billion — impossible without pruning.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Multiple Recursion ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Multiple Recursion — Exponential (a=3)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Multiple recursion with branching factor 3 — O(3ⁿ) time, O(n) space.
                </p>
                <JavaFileLoader
                  fileModule={multipleRecursionJava}
                  title="MultipleRecursion.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tree with 3 Children ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Multiple Recursion — Linear (3 children, reduction by 3)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Multiple recursion where each call makes 3 calls on n/3 — O(n) time, O(log n) space.
                </p>
                <JavaFileLoader
                  fileModule={treeNFibJava}
                  title="TreeNFib.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Multiple Recursion Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Multiple Recursion Analysis — Exponential vs Linear
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the number of calls for exponential and linear multiple recursion.
                </p>
                <JavaFileLoader
                  fileModule={multipleRecursionAnalysisJava}
                  title="MultipleRecursionAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Multiple Recursion — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Multiple recursion is a powerful but dangerous pattern. I emphasize that the branching factor 
              determines the time complexity — if a > 1 and the reduction is by 1, it's exponential (aⁿ). 
              This is why backtracking algorithms use pruning to reduce the effective branching factor. 
              Students often confuse the number of calls with the stack depth — remind them that space is 
              O(n) for all types, because only one path is explored at a time. This is the foundation of 
              understanding NP-hard problems and why we need heuristics and approximations. Practice with 
              n-queens and graph coloring to see the effect of pruning on performance.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 50 · Multiple Recursion · Built with ❤️ for the classroom</p>
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

export default Topic50;