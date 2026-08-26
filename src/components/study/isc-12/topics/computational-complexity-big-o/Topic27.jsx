import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import binarySearchIterativeJava from "./topic27_files/BinarySearchIterative.java?raw";
import binarySearchRecursiveJava from "./topic27_files/BinarySearchRecursive.java?raw";
import binarySearchAnalysisJava from "./topic27_files/BinarySearchAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic27_files/topic27_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic27 = () => {
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
              Topic 27
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Algorithm Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Binary Search Complexity Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A deep dive into the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(log n)</span>{" "}
            complexity of binary search — the classic divide-and-conquer algorithm that changed how we think about search.
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
                  <span className="text-indigo-500">●</span> What is Binary Search?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Binary search</strong> is a classic algorithm for finding a target value in a
                    <strong>sorted array</strong>. It works by repeatedly dividing the search interval in half:
                    compare the target with the middle element, and if it's not found, eliminate the half where the
                    target cannot be. This leads to a <strong>logarithmic</strong> time complexity: O(log n).
                  </p>
                  <p>
                    The algorithm is simple yet powerful. It's used in many applications: searching in databases,
                    finding elements in sorted lists, implementing `Arrays.binarySearch()` in Java, and more.
                    It's also a foundational concept for understanding divide-and-conquer algorithms.
                  </p>
                  <p>
                    Think of it like finding a word in a dictionary: you don't read every page; you open the book
                    in the middle, compare the word, and decide whether to go left or right. With a dictionary of
                    1,000,000 words, you need only about 20 page turns. That's the magic of O(log n).
                  </p>
                </div>
              </section>

              {/* ── How Binary Search Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Binary Search Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "Step 1: Initialize",
                      desc: "Set low = 0, high = n-1 (the entire array range).",
                      icon: "🔧",
                    },
                    {
                      step: "Step 2: Calculate Mid",
                      desc: "mid = (low + high) / 2. This is the middle index.",
                      icon: "📐",
                    },
                    {
                      step: "Step 3: Compare",
                      desc: "If arr[mid] == target → found! If target < arr[mid] → search left. If target > arr[mid] → search right.",
                      icon: "🔍",
                    },
                    {
                      step: "Step 4: Repeat",
                      desc: "Update low or high and repeat until found or low &gt; high (not found).",
                      icon: "🔄",
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

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      case: "Best Case (Ω(1))",
                      desc: "Target is at the middle of the array. Found in the first comparison.",
                      example: "arr[mid] == target at first step.",
                    },
                    {
                      case: "Worst Case (O(log n))",
                      desc: "Target is at the ends or not present. Need to halve until 1 element remains.",
                      example: "log₂(n) comparisons needed.",
                    },
                    {
                      case: "Average Case (Θ(log n))",
                      desc: "On average, the target is found after about log₂(n) comparisons.",
                      example: "Expected comparisons ≈ log₂(n).",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.case}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Halving the Search Space
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Binary search visualization"
                  >
                    <defs>
                      <marker id="arrow27" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Array representation - row of boxes */}
                    <text x="400" y="30" textAnchor="middle" fontSize="14" fill="#374151" className="dark:fill-gray-300">
                      Sorted Array: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31
                    </text>

                    {/* Step 1: Initial range */}
                    <rect x="80" y="50" width="640" height="30" rx="4" fill="none" stroke="#818cf8" strokeWidth="2" />
                    <text x="80" y="45" fontSize="10" fill="#818cf8">low</text>
                    <text x="720" y="45" fontSize="10" fill="#818cf8">high</text>
                    <text x="400" y="95" textAnchor="middle" fontSize="12" fill="#6b7280">Step 1: Search entire array</text>

                    {/* Step 2: Check mid */}
                    <rect x="80" y="110" width="640" height="30" rx="4" fill="none" stroke="#34d399" strokeWidth="2" />
                    <rect x="360" y="110" width="20" height="30" rx="4" fill="#34d399" opacity="0.8" />
                    <text x="370" y="130" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">15</text>
                    <text x="400" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">Step 2: Check mid = 15</text>

                    {/* Step 3: Search left half */}
                    <rect x="80" y="170" width="300" height="30" rx="4" fill="none" stroke="#f472b6" strokeWidth="2" />
                    <rect x="360" y="170" width="360" height="30" rx="4" fill="#f472b6" opacity="0.3" />
                    <text x="230" y="190" textAnchor="middle" fontSize="10" fill="#f472b6" fontWeight="bold">Search left</text>
                    <text x="400" y="215" textAnchor="middle" fontSize="12" fill="#6b7280">Step 3: Target &lt 15 → search left half</text>

                    {/* Step 4: Check new mid */}
                    <rect x="80" y="230" width="300" height="30" rx="4" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    <rect x="230" y="230" width="20" height="30" rx="4" fill="#fbbf24" opacity="0.8" />
                    <text x="240" y="250" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">7</text>
                    <text x="400" y="275" textAnchor="middle" fontSize="12" fill="#6b7280">Step 4: Check mid = 7</text>

                    {/* Step 5: Found! */}
                    <rect x="80" y="290" width="180" height="30" rx="4" fill="none" stroke="#a78bfa" strokeWidth="2" />
                    <rect x="140" y="290" width="20" height="30" rx="4" fill="#a78bfa" opacity="0.8" />
                    <text x="150" y="310" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">5</text>
                    <text x="400" y="335" textAnchor="middle" fontSize="12" fill="#6b7280">Step 5: Found 5! (Took 4 comparisons for n=16 → log₂(16)=4)</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Binary search halves the search space each step. For n elements, at most log₂(n) comparisons are needed.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = T(n/2) + O(1), &nbsp; T(1) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (comparison) and reduces the problem size by half.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence: T(n) = T(n/2) + 1 = T(n/4) + 2 = ... = T(1) + log₂(n) = O(log n)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(log n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity (Iterative): <span className="font-mono">O(1)</span> {" "}
                    (Recursive: <span className="font-mono">O(log n)</span> due to stack)
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
                      tip: "Always use sorted data",
                      desc: "Binary search only works on sorted arrays. Sorting costs O(n log n).",
                    },
                    {
                      tip: "Watch for overflow in mid calculation",
                      desc: "Use mid = low + (high - low) / 2 instead of (low + high) / 2 to avoid overflow.",
                    },
                    {
                      tip: "Prefer iterative over recursive",
                      desc: "Iterative binary search uses O(1) space; recursive uses O(log n) stack space.",
                    },
                    {
                      tip: "Use Java's built-in binary search",
                      desc: "Arrays.binarySearch() is optimized and handles edge cases.",
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
                    <strong>Forgetting that the array must be sorted:</strong> Binary search gives incorrect results
                    on unsorted data.
                  </li>
                  <li>
                    <strong>Off-by-one errors:</strong> Using low &lt; high vs low <= high, or updating mid incorrectly.
                    This is a classic source of bugs.
                  </li>
                  <li>
                    <strong>Integer overflow in mid calculation:</strong> (low + high) / 2 can overflow for large arrays.
                    Use low + (high - low) / 2.
                  </li>
                  <li>
                    <strong>Not handling duplicates correctly:</strong> Binary search finds one occurrence; for duplicates,
                    you may need to find the first or last occurrence.
                  </li>
                  <li>
                    <strong>Ignoring the space complexity of recursion:</strong> Recursive binary search uses O(log n)
                    stack space, which can be a problem for very large arrays.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> once wrote a recursive binary search for an array of 10 million elements
                      and got a StackOverflowError. She switched to iterative and it worked perfectly.
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
                      <strong>Use iterative implementation</strong> for O(1) space complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use mid = low + (high - low) / 2</strong> to avoid integer overflow.
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
                      <strong>Use Java's built-in binary search</strong> when possible for reliability.
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
                    "✅ Can you explain how binary search works?",
                    "✅ Do you know the time complexity (O(log n)) and why?",
                    "✅ Can you write both iterative and recursive implementations?",
                    "✅ Do you know how to avoid integer overflow in mid calculation?",
                    "✅ Can you identify the base case and recurrence?",
                    "✅ Do you know the space complexity of both implementations?",
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
                    <strong>Observe carefully:</strong> For an array of size 1,000,000, how many comparisons does
                    binary search need in the worst case? It's log₂(1,000,000) ≈ 20.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the array is sorted in descending order instead of
                    ascending? How would you modify the algorithm?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a sorted list of
                    32,768 student roll numbers. Binary search can find any roll number in at most 15 comparisons.
                    Linear search would need up to 32,768 comparisons.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Binary Search Iterative ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search — Iterative (O(log n) Time, O(1) Space)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Iterative implementation of binary search using a while loop. Uses O(1) extra space.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchIterativeJava}
                  title="BinarySearchIterative.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Recursive ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search — Recursive (O(log n) Time, O(log n) Space)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation of binary search. Uses O(log n) stack space.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchRecursiveJava}
                  title="BinarySearchRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search Analysis — Steps Comparison
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the number of steps for binary search vs linear search for different input sizes.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchAnalysisJava}
                  title="BinarySearchAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Binary Search Complexity Analysis — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Binary search is the perfect example of O(log n) complexity. I emphasize to students that understanding " +
              "binary search is not just about memorizing the code — it's about understanding the power of divide-and-conquer. " +
              "The recurrence T(n) = T(n/2) + O(1) is the simplest and most important recurrence in algorithm analysis. " +
              "I make sure students can write both iterative and recursive implementations and explain why the iterative " +
              "version uses O(1) space and the recursive uses O(log n). Also, the off-by-one error in binary search is " +
              "a classic bug — I have students trace through the algorithm with different inputs to catch it. " +
              "Finally, I remind them that binary search only works on sorted data, which is a crucial precondition."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 27 · Binary Search Complexity Analysis · Built with ❤️ for the classroom</p>
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

export default Topic27;