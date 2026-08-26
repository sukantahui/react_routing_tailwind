import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import mergeSortRecursiveJava from "./topic28_files/MergeSortRecursive.java?raw";
import mergeSortIterativeJava from "./topic28_files/MergeSortIterative.java?raw";
import mergeSortAnalysisJava from "./topic28_files/MergeSortAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic28_files/topic28_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic28 = () => {
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
              Topic 28
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Algorithm Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Merge Sort Complexity Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A deep dive into the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n log n)</span>{" "}
            complexity of merge sort — the classic divide-and-conquer sorting algorithm with guaranteed performance.
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
                  <span className="text-indigo-500">●</span> What is Merge Sort?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Merge sort</strong> is a classic <strong>divide-and-conquer</strong> sorting algorithm
                    that divides the array into two halves, recursively sorts each half, and then merges the sorted
                    halves back together. It's known for its <strong>guaranteed O(n log n)</strong> time complexity
                    in all cases (best, worst, and average).
                  </p>
                  <p>
                    The algorithm works in three phases:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Divide:</strong> Split the array into two halves.</li>
                    <li><strong>Conquer:</strong> Recursively sort each half.</li>
                    <li><strong>Combine:</strong> Merge the two sorted halves back together.</li>
                  </ul>
                  <p>
                    Think of it like organizing a deck of cards: split the deck in half, sort each half (recursively),
                    then merge them by comparing the top cards of each half. It's the algorithm behind Java's
                    `Arrays.sort()` for objects (Timsort is a hybrid of merge sort and insertion sort).
                  </p>
                </div>
              </section>

              {/* ── How Merge Sort Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Merge Sort Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "1. Divide",
                      desc: "Split the array into two halves. If the array has 1 element, it's already sorted (base case).",
                      icon: "✂️",
                    },
                    {
                      step: "2. Conquer",
                      desc: "Recursively sort each half. This creates a recursion tree of depth log₂(n).",
                      icon: "🔄",
                    },
                    {
                      step: "3. Merge",
                      desc: "Merge the two sorted halves by comparing elements from each half and placing them in order.",
                      icon: "🔗",
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
                      <div className="text-3xl mb-2">{item.icon}</div>
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
                      case: "Best Case (Θ(n log n))",
                      desc: "Even if the array is already sorted, merge sort still does all the work.",
                      example: "n log n comparisons.",
                    },
                    {
                      case: "Worst Case (Θ(n log n))",
                      desc: "Merge sort is always O(n log n), even in the worst case.",
                      example: "n log n comparisons.",
                    },
                    {
                      case: "Average Case (Θ(n log n))",
                      desc: "The average case is also O(n log n).",
                      example: "n log n comparisons.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 3),
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Merge Sort Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Merge sort visualization"
                  >
                    <defs>
                      <marker id="arrow28" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Level 0: Original array */}
                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Original Array: [38, 27, 43, 3, 9, 82, 10]
                    </text>

                    {/* Level 1: Split */}
                    <rect x="150" y="35" width="200" height="25" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="250" y="53" textAnchor="middle" fontSize="11" fill="white">[38, 27, 43, 3]</text>
                    <rect x="450" y="35" width="200" height="25" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="550" y="53" textAnchor="middle" fontSize="11" fill="white">[9, 82, 10]</text>

                    {/* Level 2: Split further */}
                    <rect x="100" y="75" width="120" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="160" y="91" textAnchor="middle" fontSize="10" fill="white">[38, 27]</text>
                    <rect x="230" y="75" width="120" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="290" y="91" textAnchor="middle" fontSize="10" fill="white">[43, 3]</text>
                    <rect x="420" y="75" width="90" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="465" y="91" textAnchor="middle" fontSize="10" fill="white">[9, 82]</text>
                    <rect x="520" y="75" width="90" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="565" y="91" textAnchor="middle" fontSize="10" fill="white">[10]</text>

                    {/* Level 3: Leaf nodes */}
                    <rect x="60" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="85" y="129" textAnchor="middle" fontSize="9" fill="white">[38]</text>
                    <rect x="120" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="145" y="129" textAnchor="middle" fontSize="9" fill="white">[27]</text>
                    <rect x="200" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="225" y="129" textAnchor="middle" fontSize="9" fill="white">[43]</text>
                    <rect x="260" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="285" y="129" textAnchor="middle" fontSize="9" fill="white">[3]</text>
                    <rect x="390" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="415" y="129" textAnchor="middle" fontSize="9" fill="white">[9]</text>
                    <rect x="450" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="475" y="129" textAnchor="middle" fontSize="9" fill="white">[82]</text>
                    <rect x="530" y="115" width="50" height="18" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="555" y="129" textAnchor="middle" fontSize="9" fill="white">[10]</text>

                    {/* Merge arrows going down */}
                    <line x1="250" y1="60" x2="160" y2="75" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="60" x2="290" y2="75" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="160" y1="97" x2="85" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="160" y1="97" x2="145" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="290" y1="97" x2="225" y2="115" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="290" y1="97" x2="285" y2="115" stroke="#6b7280" strokeWidth="1.5" />

                    {/* Level 4: Merge up - sorted subarrays */}
                    <text x="400" y="155" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      ↓ Merging (O(n) per level) ↓
                    </text>

                    <rect x="80" y="170" width="140" height="22" rx="4" fill="#fbbf24" opacity="0.7" />
                    <text x="150" y="186" textAnchor="middle" fontSize="10" fill="white">[27, 38]</text>
                    <rect x="230" y="170" width="100" height="22" rx="4" fill="#fbbf24" opacity="0.7" />
                    <text x="280" y="186" textAnchor="middle" fontSize="10" fill="white">[3, 43]</text>
                    <rect x="400" y="170" width="120" height="22" rx="4" fill="#fbbf24" opacity="0.7" />
                    <text x="460" y="186" textAnchor="middle" fontSize="10" fill="white">[9, 82]</text>
                    <rect x="530" y="170" width="80" height="22" rx="4" fill="#fbbf24" opacity="0.7" />
                    <text x="570" y="186" textAnchor="middle" fontSize="10" fill="white">[10]</text>

                    {/* Level 5: Merge again */}
                    <rect x="120" y="210" width="220" height="22" rx="4" fill="#a78bfa" opacity="0.7" />
                    <text x="230" y="226" textAnchor="middle" fontSize="10" fill="white">[3, 27, 38, 43]</text>
                    <rect x="410" y="210" width="180" height="22" rx="4" fill="#a78bfa" opacity="0.7" />
                    <text x="500" y="226" textAnchor="middle" fontSize="10" fill="white">[9, 10, 82]</text>

                    {/* Level 6: Final merge */}
                    <rect x="150" y="250" width="500" height="25" rx="4" fill="#f87171" opacity="0.8" />
                    <text x="400" y="268" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">[3, 9, 10, 27, 38, 43, 82]</text>

                    <text x="400" y="310" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      There are log₂(n) levels, and each level does O(n) work → O(n log n)
                    </text>
                    <text x="400" y="330" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Space complexity: O(n) for the temporary array used during merging.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Merge sort creates a recursion tree with log₂(n) levels. At each level, the total work is O(n),
                    giving O(n log n) time. It uses O(n) extra space for the merge step.
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
                    T(n) = 2T(n/2) + O(n), &nbsp; T(1) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(n) work (merging) and makes two recursive calls on half the input.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence (Master Theorem, Case 2):
                    <span className="block font-mono">T(n) = n · log₂(n) = O(n log n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">Θ(n log n)</span> (all cases)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(n)</span> (auxiliary array for merging)
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
                      tip: "Merge sort is stable",
                      desc: "It preserves the relative order of equal elements, which is useful for sorting by multiple keys.",
                    },
                    {
                      tip: "Use insertion sort for small subarrays",
                      desc: "Timsort (Java's sort) uses insertion sort for small subarrays to improve performance.",
                    },
                    {
                      tip: "Watch the space complexity",
                      desc: "Merge sort uses O(n) extra space, which can be a problem for very large arrays.",
                    },
                    {
                      tip: "Prefer iterative for memory efficiency",
                      desc: "Iterative merge sort uses less stack space than recursive (O(1) vs O(log n)).",
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
                    <strong>Forgetting that merge sort needs extra space:</strong> The merge step requires a temporary
                    array of size O(n). This can be a memory issue for large datasets.
                  </li>
                  <li>
                    <strong>Incorrectly implementing the merge step:</strong> Off-by-one errors in the merge loop
                    are common. Always test with small arrays first.
                  </li>
                  <li>
                    <strong>Assuming merge sort is the fastest sorting algorithm:</strong> For small arrays,
                    insertion sort is faster. For large arrays, quicksort is often faster in practice (though
                    merge sort has guaranteed performance).
                  </li>
                  <li>
                    <strong>Misunderstanding the complexity:</strong> Some think merge sort is O(n) because it
                    does O(n) work per level. But there are O(log n) levels, so total is O(n log n).
                  </li>
                  <li>
                    <strong>Not handling large arrays:</strong> The O(n) space complexity means merge sort can
                    be memory-intensive for very large arrays (e.g., &gt; 100 million elements).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once tried to sort an array of 50 million integers using merge sort
                      and ran out of memory. He switched to quicksort with in-place partitioning.
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
                      <strong>Use merge sort when stability is required</strong> — it preserves the order of equal elements.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative merge sort</strong> to avoid recursion stack overhead.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use insertion sort for small subarrays</strong> (n ≤ 50) to improve performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use in-place merging when possible</strong> to reduce space complexity (though rare in practice).
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
                    "✅ Can you explain the divide-conquer-merge approach?",
                    "✅ Do you know the time complexity (O(n log n)) and why?",
                    "✅ Can you write both recursive and iterative implementations?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you identify the recurrence T(n) = 2T(n/2) + O(n)?",
                    "✅ Do you know when to use merge sort vs other sorts?",
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
                    <strong>Observe carefully:</strong> For merge sort, how many levels are there in the recursion tree?
                    What is the work done at each level? That's log₂(n) levels, O(n) work each → O(n log n).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if merge sort used a 3-way split instead of 2-way?
                    The recurrence would be T(n) = 3T(n/3) + O(n), which still solves to O(n log n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 10,000 student records
                    that need to be sorted. Merge sort will use about 10,000 × log₂(10,000) ≈ 140,000 comparisons.
                    Bubble sort would use 100,000,000 comparisons. The difference is huge!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Merge Sort Recursive ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort — Recursive (O(n log n) Time, O(n) Space)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation of merge sort using divide-and-conquer.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortRecursiveJava}
                  title="MergeSortRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Merge Sort Iterative ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort — Iterative (O(n log n) Time, O(n) Space)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Iterative (bottom-up) implementation of merge sort. Avoids recursion stack overhead.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortIterativeJava}
                  title="MergeSortIterative.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Merge Sort Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort Analysis — Comparing with Other Sorts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares merge sort with quicksort and insertion sort for different input sizes.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortAnalysisJava}
                  title="MergeSortAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Merge Sort Complexity Analysis — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Merge sort is the quintessential divide-and-conquer algorithm. I emphasize to students that it's " +
              "the 'guaranteed' O(n log n) sort — it doesn't have a bad case like quicksort. The recurrence " +
              "T(n) = 2T(n/2) + O(n) is a classic example of the Master Theorem. I make sure students understand " +
              "why the space complexity is O(n) — the temporary array used during merging. Also, I highlight that " +
              "merge sort is stable, which is important for multi-key sorting. Have students practice both recursive " +
              "and iterative implementations and compare them. Finally, remind them that Timsort (used in Java) " +
              "is a hybrid of merge sort and insertion sort, showing the practical importance of this algorithm."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 28 · Merge Sort Complexity Analysis · Built with ❤️ for the classroom</p>
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

export default Topic28;