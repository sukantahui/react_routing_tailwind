import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recurrenceTypesJava from "./topic32_files/RecurrenceTypes.java?raw";
import writingRecurrencesJava from "./topic32_files/WritingRecurrences.java?raw";
import recurrencePatternsJava from "./topic32_files/RecurrencePatterns.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic32_files/topic32_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic32 = () => {
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
              Topic 32
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recurrence Relations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recurrence Relations (Advanced)
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A deeper dive into <span className="text-indigo-600 dark:text-indigo-400 font-semibold">recurrence relations</span> —
            writing them, identifying patterns, and understanding the types of recurrences in recursive algorithms.
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
                    The general form of a recurrence is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = a · T(n/b) + f(n)
                    </span>
                    where:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>a</strong> = number of recursive calls</li>
                    <li><strong>n/b</strong> = size of each subproblem</li>
                    <li><strong>f(n)</strong> = work done at each level (excluding recursive calls)</li>
                  </ul>
                  <p>
                    In this topic, we'll learn how to <strong>write</strong> recurrence relations for any recursive
                    algorithm and identify their <strong>types</strong> — a crucial skill for complexity analysis.
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

              {/* ── Types of Recurrences ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Types of Recurrences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      type: "Linear Recurrence",
                      desc: "One recursive call, reducing by 1 each time.",
                      example: "T(n) = T(n-1) + O(1)",
                      algorithm: "Factorial, Sum of n numbers",
                    },
                    {
                      type: "Divide & Conquer (Balanced)",
                      desc: "Two or more calls on half (or constant fraction) of the input.",
                      example: "T(n) = 2T(n/2) + O(n)",
                      algorithm: "Merge Sort",
                    },
                    {
                      type: "Divide & Conquer (Unbalanced)",
                      desc: "One call on n-1, one call on 0 (empty).",
                      example: "T(n) = T(n-1) + O(n)",
                      algorithm: "Quick Sort (worst case)",
                    },
                    {
                      type: "Binary Recursion",
                      desc: "Two recursive calls on smaller inputs (often n-1 and n-2).",
                      example: "T(n) = T(n-1) + T(n-2) + O(1)",
                      algorithm: "Naive Fibonacci",
                    },
                    {
                      type: "Multiple Recursion",
                      desc: "More than two recursive calls, often on smaller fractions.",
                      example: "T(n) = 3T(n/3) + O(n)",
                      algorithm: "3-way Merge Sort",
                    },
                    {
                      type: "Tail Recursion",
                      desc: "The recursive call is the last operation, can be optimized.",
                      example: "T(n) = T(n-1) + O(1) (tail)",
                      algorithm: "Tail Factorial",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Algorithm: {item.algorithm}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Recurrence Patterns
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Recurrence patterns"
                  >
                    <defs>
                      <marker id="arrow32" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Linear: T(n) = T(n-1) + O(1) */}
                    <text x="100" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Linear</text>
                    <rect x="30" y="40" width="140" height="25" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="100" y="58" textAnchor="middle" fontSize="10" fill="white">T(n)</text>
                    <line x1="100" y1="65" x2="100" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="50" y="85" width="100" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="100" y="101" textAnchor="middle" fontSize="9" fill="white">T(n-1)</text>
                    <line x1="100" y1="107" x2="100" y2="120" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="60" y="125" width="80" height="20" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="100" y="140" textAnchor="middle" fontSize="8" fill="white">T(n-2)</text>
                    <text x="100" y="170" textAnchor="middle" fontSize="9" fill="#6b7280">…</text>

                    {/* Divide & Conquer: T(n) = 2T(n/2) + O(n) */}
                    <text x="300" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Divide & Conquer</text>
                    <rect x="230" y="40" width="140" height="25" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="300" y="58" textAnchor="middle" fontSize="10" fill="white">T(n)</text>
                    <line x1="300" y1="65" x2="270" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="300" y1="65" x2="330" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="230" y="85" width="80" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="270" y="101" textAnchor="middle" fontSize="9" fill="white">T(n/2)</text>
                    <rect x="290" y="85" width="80" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="330" y="101" textAnchor="middle" fontSize="9" fill="white">T(n/2)</text>
                    <text x="300" y="130" textAnchor="middle" fontSize="9" fill="#6b7280">2T(n/2) + O(n)</text>

                    {/* Binary: T(n) = T(n-1) + T(n-2) + O(1) */}
                    <text x="550" y="20" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Binary</text>
                    <rect x="480" y="40" width="140" height="25" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="550" y="58" textAnchor="middle" fontSize="10" fill="white">T(n)</text>
                    <line x1="550" y1="65" x2="520" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="65" x2="580" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="480" y="85" width="80" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="520" y="101" textAnchor="middle" fontSize="9" fill="white">T(n-1)</text>
                    <rect x="540" y="85" width="80" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="580" y="101" textAnchor="middle" fontSize="9" fill="white">T(n-2)</text>
                    <text x="550" y="130" textAnchor="middle" fontSize="9" fill="#6b7280">Two branches</text>

                    <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#6b7280">
                        The recurrence pattern determines the complexity class.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Different recurrence patterns lead to different complexities. Identifying the pattern is the
                    first step to solving the recurrence.
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

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">School Administration:</span>{" "}
                      A school in <strong>Barrackpore</strong> processes student records. If they split the records
                      into two groups and process each group, the recurrence is T(n) = 2T(n/2) + O(n). This is
                      merge sort — O(n log n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Library Search:</span>{" "}
                      Finding a book in a sorted library catalog by repeatedly halving the search space:
                      T(n) = T(n/2) + O(1) → O(log n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Fibonacci in Nature:</span>{" "}
                      The number of rabbit pairs follows the recurrence F(n) = F(n-1) + F(n-2) — the same as the
                      naive Fibonacci algorithm. This recurrence is O(2ⁿ) without memoization.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is arranging students in a line. If he recursively arranges
                      n-1 students and then inserts the nth student, the recurrence is T(n) = T(n-1) + O(n) → O(n²).
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
                      tip: "Always include the base case",
                      desc: "A recurrence without a base case is incomplete — you need to know where the recursion stops.",
                    },
                    {
                      tip: "Use consistent notation",
                      desc: "T(n) for time, S(n) for space. Be consistent in your analysis.",
                    },
                    {
                      tip: "Check your recurrence with small n",
                      desc: "Verify that the recurrence gives the correct values for n=1, 2, 3 to catch mistakes.",
                    },
                    {
                      tip: "Identify the pattern first",
                      desc: "Before solving, identify if it's linear, D&C, or binary recursion. This guides the solution method.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 8),
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
                    <strong>Not recognizing overlapping subproblems:</strong> If the recurrence has overlapping
                    subproblems (like Fibonacci), the simple recurrence may not be the most efficient way to analyze
                    the algorithm — memoization changes the complexity.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once wrote the recurrence for Fibonacci as T(n) = T(n-1) + T(n-2) + O(1)
                      and solved it to O(2ⁿ), but then used memoization and got O(n). She learned to distinguish
                      between naive recursion and optimized recursion.
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
                      <strong>Identify the type of recurrence</strong> before choosing a solution method.
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
                    "✅ Can you identify the type of recurrence (linear, D&C, binary)?",
                    "✅ Can you write recurrences for common algorithms (factorial, binary search, merge sort)?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 12),
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

              {/* ── Java: Recurrence Types ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recurrence Types — Identifying Patterns
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates different recurrence types with code examples and their corresponding recurrences.
                </p>
                <JavaFileLoader
                  fileModule={recurrenceTypesJava}
                  title="RecurrenceTypes.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Writing Recurrences ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Writing Recurrences — From Code to Recurrence
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows how to extract the recurrence from recursive code, step by step.
                </p>
                <JavaFileLoader
                  fileModule={writingRecurrencesJava}
                  title="WritingRecurrences.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recurrence Patterns ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recurrence Patterns — Recognizing Common Forms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows common recurrence patterns and how to identify them in code.
                </p>
                <JavaFileLoader
                  fileModule={recurrencePatternsJava}
                  title="RecurrencePatterns.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Recurrence Relations (Advanced) — FAQs"
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
              "then merge sort. The key is to identify the pattern: how many recursive calls? What size are the subproblems? " +
              "What work is done at each level? Practice is key — have them write recurrences for different algorithms " +
              "and identify the type (linear, D&C, binary). This builds intuition for the Master Theorem and recursion trees."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 32 · Recurrence Relations (Advanced) · Built with ❤️ for the classroom</p>
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

export default Topic32;