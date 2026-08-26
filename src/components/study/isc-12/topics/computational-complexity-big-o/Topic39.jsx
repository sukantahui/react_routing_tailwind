import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveBinarySearchJava from "./topic39_files/RecursiveBinarySearch.java?raw";
import binarySearchComparisonJava from "./topic39_files/BinarySearchComparison.java?raw";
import binarySearchVariantsJava from "./topic39_files/BinarySearchVariants.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic39_files/topic39_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic39 = () => {
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
              Topic 39
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Binary Search
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(log n)</span>{" "}
            time and space complexity of recursive binary search — the classic divide-and-conquer algorithm
            for efficient searching in sorted data.
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
                  <span className="text-emerald-500">●</span> What is Recursive Binary Search?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Binary search</strong> is a classic algorithm that finds the position of a target value
                    in a <strong>sorted array</strong> by repeatedly dividing the search interval in half. The
                    <strong>recursive</strong> implementation elegantly expresses this divide-and-conquer approach
                    by calling itself on the appropriate half.
                  </p>
                  <p>
                    The recurrence relation is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n/2) + O(1), &nbsp; T(1) = O(1)
                    </span>
                    This gives <strong>O(log n)</strong> time complexity and <strong>O(log n)</strong> space complexity
                    due to the recursion stack.
                  </p>
                  <p>
                    Think of it like searching for a word in a dictionary: you open the middle, compare, and decide
                    whether to go left or right. Recursive binary search does this by calling itself on the chosen
                    half, building a call stack of decisions.
                  </p>
                </div>
              </section>

              {/* ── How Recursive Binary Search Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If low > high, the element is not present. Return -1.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Find Mid",
                      desc: "mid = low + (high - low) / 2 (avoid overflow).",
                      icon: "📐",
                    },
                    {
                      step: "3. Compare",
                      desc: "If arr[mid] == target → return mid. If target < arr[mid] → search left. If target > arr[mid] → search right.",
                      icon: "🔍",
                    },
                    {
                      step: "4. Recurse",
                      desc: "Call binarySearch on the appropriate half.",
                      icon: "🔄",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      case: "Time Complexity",
                      desc: "Each step reduces the problem size by half, giving O(log n) steps.",
                      example: "T(n) = T(n/2) + O(1) → O(log n)",
                    },
                    {
                      case: "Space Complexity (Recursive)",
                      desc: "The recursion stack depth is O(log n).",
                      example: "O(log n) due to call stack.",
                    },
                    {
                      case: "Space Complexity (Iterative)",
                      desc: "The iterative version uses O(1) extra space.",
                      example: "O(1) constant space.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.case}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                      <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Visual Intuition: Recursion Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Binary search recursion tree"
                  >
                    <defs>
                      <marker id="arrow39" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursion Tree for Binary Search (n=16)
                    </text>

                    {/* Level 0 */}
                    <rect x="310" y="40" width="180" height="28" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="61" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">search(0, 15)</text>

                    {/* Level 1 */}
                    <line x1="400" y1="68" x2="250" y2="85" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="68" x2="550" y2="85" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="170" y="88" width="160" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="250" y="107" textAnchor="middle" fontSize="11" fill="white">search(0, 6)</text>
                    <rect x="470" y="88" width="160" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="550" y="107" textAnchor="middle" fontSize="11" fill="white">search(8, 15)</text>

                    {/* Level 2 */}
                    <line x1="250" y1="114" x2="170" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="114" x2="330" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="114" x2="470" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="114" x2="630" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="110" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="170" y="150" textAnchor="middle" fontSize="10" fill="white">search(0, 2)</text>
                    <rect x="270" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="330" y="150" textAnchor="middle" fontSize="10" fill="white">search(4, 6)</text>
                    <rect x="410" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="470" y="150" textAnchor="middle" fontSize="10" fill="white">search(8, 10)</text>
                    <rect x="570" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="630" y="150" textAnchor="middle" fontSize="10" fill="white">search(12, 15)</text>

                    {/* Level 3 */}
                    <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#6b7280">… (leaves: T(1) or not found)</text>

                    <text x="400" y="235" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Depth = log₂(n) = 4 levels → O(log n) stack space
                    </text>
                    <text x="400" y="260" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Each level does O(1) work → O(log n) time
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recursive binary search creates a recursion tree with depth log₂(n). Each level does constant work,
                    giving O(log n) time and O(log n) space.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = T(n/2) + O(1), &nbsp; T(1) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (comparison and mid calculation) and makes one recursive call on half
                    the input.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving: T(n) = T(n/2) + 1 = T(n/4) + 2 = ... = T(1) + log₂(n) = O(log n)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(log n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(log n)</span> (recursive),
                    <span className="font-mono"> O(1)</span> (iterative)
                  </p>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Use iterative version for O(1) space",
                      desc: "Recursive uses O(log n) stack; iterative is more memory-efficient.",
                    },
                    {
                      tip: "Avoid integer overflow in mid calculation",
                      desc: "Use mid = low + (high - low) / 2 instead of (low + high) / 2.",
                    },
                    {
                      tip: "Check edge cases",
                      desc: "Empty array, single element, target at first/last position, target not found.",
                    },
                    {
                      tip: "Consider the recursion depth limit",
                      desc: "For arrays larger than 2^depth, the recursive version may stack overflow.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Off-by-one errors:</strong> Using low &lt; high vs low &lt;= high, or updating mid incorrectly.
                  </li>
                  <li>
                    <strong>Integer overflow:</strong> (low + high) / 2 can overflow for large arrays. Use low + (high - low) / 2.
                  </li>
                  <li>
                    <strong>Forgetting that the array must be sorted:</strong> Binary search gives incorrect results
                    on unsorted data.
                  </li>
                  <li>
                    <strong>Not handling the base case correctly:</strong> if (low &gt; high) must return -1.
                  </li>
                  <li>
                    <strong>Assuming the recursive version is always better:</strong> For large arrays, iterative
                    version avoids stack overflow.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> wrote a recursive binary search for an array of 10 million elements
                      and got a StackOverflowError. She switched to iterative and it worked perfectly.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative implementation</strong> for O(1) space in production code.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use safe mid calculation</strong> to avoid integer overflow.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test edge cases</strong>: empty array, single element, target at ends, target not present.
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
                  <span className="text-emerald-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for recursive binary search?",
                    "✅ Do you know the time complexity (O(log n)) and why?",
                    "✅ Do you know the space complexity of recursive vs iterative?",
                    "✅ Can you implement both recursive and iterative binary search?",
                    "✅ Do you understand the recursion tree for binary search?",
                    "✅ Can you handle edge cases (empty array, not found)?",
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
                    <strong>Observe carefully:</strong> For an array of size 1,000,000, how many recursive calls are
                    made? That's log₂(1,000,000) ≈ 20 calls. The recursion depth is only 20.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the target is at the middle? The recursion stops after
                    the first call — best case O(1).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a sorted list of
                    32,768 student roll numbers. Recursive binary search can find any roll number in at most 15
                    recursive calls. That's O(log n) efficiency!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Binary Search ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Binary Search — O(log n) Time, O(log n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation of binary search with recurrence T(n) = T(n/2) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveBinarySearchJava}
                  title="RecursiveBinarySearch.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search Comparison — Recursive vs Iterative
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the recursive and iterative versions in terms of time and space.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchComparisonJava}
                  title="BinarySearchComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Variants ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search Variants — First and Last Occurrence
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Extends binary search to find the first or last occurrence of a target in a sorted array with duplicates.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchVariantsJava}
                  title="BinarySearchVariants.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Binary Search — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Recursive binary search is the quintessential example of O(log n) complexity. I emphasize that the 
              recurrence T(n) = T(n/2) + O(1) is the simplest and most important recurrence in algorithm analysis. 
              Understanding the recursion tree is key: each level halves the problem, so depth is log n. 
              I also highlight the space trade-off: recursive uses O(log n) stack, iterative uses O(1). 
              Students should practice both implementations and understand edge cases. The off-by-one error 
              in binary search is a classic bug — tracing through the algorithm helps catch it. Finally, 
              remind them that binary search only works on sorted data, which is a crucial precondition.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 39 · Complexity of Recursive Binary Search · Built with ❤️ for the classroom</p>
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

export default Topic39;