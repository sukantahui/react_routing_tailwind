import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import quickSortRecursiveJava from "./topic47_files/QuickSortRecursive.java?raw";
import quickSortAnalysisJava from "./topic47_files/QuickSortAnalysis.java?raw";
import quickSortPivotComparisonJava from "./topic47_files/QuickSortPivotComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic47_files/topic47_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic47 = () => {
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
              Topic 47
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Quick Sort
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n log n)</span>{" "}
            average-case and <span className="text-red-600 dark:text-red-400 font-semibold">O(n²)</span> worst-case
            complexity of quicksort — how pivot selection changes everything.
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
                  <span className="text-emerald-500">●</span> What is Recursive Quick Sort?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Quick sort</strong> is a highly efficient <strong>divide-and-conquer</strong> sorting
                    algorithm. It works by selecting a <strong>pivot</strong> element, partitioning the array
                    into elements less than the pivot and greater than the pivot, and recursively sorting the
                    subarrays.
                  </p>
                  <p>
                    The recurrence relations:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      <strong>Best/Average Case:</strong> T(n) = 2T(n/2) + O(n) → <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n log n)</span>
                    </li>
                    <li>
                      <strong>Worst Case:</strong> T(n) = T(n-1) + O(n) → <span className="text-red-600 dark:text-red-400 font-semibold">O(n²)</span>
                    </li>
                  </ul>
                  <p>
                    The space complexity is <strong>O(log n)</strong> for the recursion stack in the average case,
                    and <strong>O(n)</strong> in the worst case.
                  </p>
                  <p>
                    Think of it like organizing books: you pick a book (pivot), put all books with shorter titles
                    on the left and longer titles on the right. Then you repeat on each side. If you always pick
                    the middle book, it's fast. If you always pick the smallest or largest, it's slow.
                  </p>
                </div>
              </section>

              {/* ── How Quick Sort Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> How Recursive Quick Sort Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Choose Pivot",
                      desc: "Select a pivot element (first, last, middle, or random).",
                      icon: "🎯",
                    },
                    {
                      step: "2. Partition",
                      desc: "Rearrange the array so all elements < pivot are on the left, all > pivot are on the right.",
                      icon: "📊",
                    },
                    {
                      step: "3. Recurse",
                      desc: "Recursively apply quicksort to the left and right subarrays.",
                      icon: "🔄",
                    },
                    {
                      step: "4. Combine",
                      desc: "The array is now sorted — no explicit combine step needed.",
                      icon: "✅",
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      case: "Best Case (Ω(n log n))",
                      time: "Ω(n log n)",
                      space: "O(log n)",
                      example: "Pivot always splits array into equal halves.",
                    },
                    {
                      case: "Average Case (Θ(n log n))",
                      time: "Θ(n log n)",
                      space: "O(log n)",
                      example: "Random pivot selection gives balanced partitions.",
                    },
                    {
                      case: "Worst Case (O(n²))",
                      time: "O(n²)",
                      space: "O(n)",
                      example: "Pivot always the smallest or largest (sorted array with bad pivot).",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 3),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.case}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Visual Intuition: Quick Sort Recursion
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Quick sort recursion"
                  >
                    <defs>
                      <marker id="arrow47" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Quick Sort Recursion (Balanced = O(n log n), Unbalanced = O(n²))
                    </text>

                    {/* Balanced Tree - left side */}
                    <text x="150" y="45" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Balanced: O(n log n)</text>
                    <circle cx="150" cy="65" r="12" fill="#34d399" />
                    <line x1="150" y1="77" x2="130" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="150" y1="77" x2="170" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="130" cy="105" r="10" fill="#34d399" opacity="0.8" />
                    <circle cx="170" cy="105" r="10" fill="#34d399" opacity="0.8" />
                    <line x1="130" y1="115" x2="120" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="130" y1="115" x2="140" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="170" y1="115" x2="160" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="170" y1="115" x2="180" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="120" cy="140" r="8" fill="#34d399" opacity="0.7" />
                    <circle cx="140" cy="140" r="8" fill="#34d399" opacity="0.7" />
                    <circle cx="160" cy="140" r="8" fill="#34d399" opacity="0.7" />
                    <circle cx="180" cy="140" r="8" fill="#34d399" opacity="0.7" />
                    <text x="150" y="175" textAnchor="middle" fontSize="10" fill="#6b7280">Depth ~3</text>

                    {/* Unbalanced Tree - right side */}
                    <text x="650" y="45" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Unbalanced: O(n²)</text>
                    <circle cx="650" cy="65" r="12" fill="#f87171" />
                    <line x1="650" y1="77" x2="650" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="105" r="10" fill="#f87171" opacity="0.8" />
                    <line x1="650" y1="115" x2="650" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="140" r="8" fill="#f87171" opacity="0.7" />
                    <line x1="650" y1="148" x2="650" y2="160" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="170" r="7" fill="#f87171" opacity="0.6" />
                    <text x="650" y="200" textAnchor="middle" fontSize="10" fill="#6b7280">Depth ~n</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Balanced tree → O(log n) stack space. Unbalanced tree → O(n) stack space.
                    </text>
                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#6b7280">
                      Time depends on pivot choice: O(n log n) balanced, O(n²) unbalanced.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Quick sort's performance depends on the pivot choice. Balanced partitions give O(n log n) time;
                    unbalanced partitions give O(n²) time.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Best/Average Case</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = 2T(n/2) + O(n), &nbsp; T(1) = O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Balanced partitions → <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n log n)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(log n)</span>
                    </p>
                  </div>
                  <div className="bg-red-50/60 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="font-semibold text-red-600 dark:text-red-400">Worst Case</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + O(n), &nbsp; T(1) = O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Unbalanced partitions → <span className="font-mono text-red-600 dark:text-red-400">O(n²)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-red-600 dark:text-red-400">O(n)</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Database Sorting:</span>{" "}
                      Many database systems use quicksort for in-memory sorting because of its speed on average.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Java's Sorting:</span>{" "}
                      Arrays.sort() for primitives uses Dual-Pivot QuickSort (an optimized quicksort).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Classroom Example:</span>{" "}
                      Students in <strong>Barrackpore</strong> are sorting exam scores by picking a middle score
                      and placing lower scores on the left, higher on the right — that's quicksort!
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Search Engines:</span>{" "}
                      Sorting search results by relevance often uses quicksort-like algorithms.
                    </p>
                  </div>
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
                      tip: "Use random pivot",
                      desc: "Random pivot selection eliminates the O(n²) worst-case for sorted data.",
                    },
                    {
                      tip: "Use median-of-three",
                      desc: "Choosing the median of first, middle, and last elements improves performance.",
                    },
                    {
                      tip: "Switch to insertion sort for small subarrays",
                      desc: "For n < 50, insertion sort is faster due to lower overhead.",
                    },
                    {
                      tip: "Quicksort is in-place",
                      desc: "It uses O(log n) extra space for recursion, not O(n) like merge sort.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 6),
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
                    <strong>Choosing a bad pivot:</strong> If you always choose the first or last element, a sorted
                    array becomes O(n²). Always use random or median-of-three pivot.
                  </li>
                  <li>
                    <strong>Off-by-one errors in partition:</strong> The partition function is tricky; off-by-one
                    errors are common. Test with small arrays.
                  </li>
                  <li>
                    <strong>Forgetting the base case:</strong> Quicksort must stop when the subarray size ≤ 1.
                  </li>
                  <li>
                    <strong>Overlooking that quicksort is unstable:</strong> Equal elements may not maintain their
                    relative order. Use merge sort if stability is required.
                  </li>
                  <li>
                    <strong>Using quicksort on very small arrays:</strong> For small subarrays (n &lt 20), insertion
                    sort is often faster. Many optimized implementations switch to insertion sort.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once used quicksort on an already sorted array with first-element
                      pivot and got O(n²) time. She learned to use random pivot.
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
                      <strong>Use random pivot</strong> to avoid worst-case O(n²) behavior.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use median-of-three pivot</strong> for better average performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Switch to insertion sort</strong> for subarrays with size &lt 20 for better performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative quicksort</strong> to avoid recursion depth issues for very large arrays.
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
                    "✅ Can you write the recurrences for quicksort (best and worst)?",
                    "✅ Do you know the average (O(n log n)) and worst (O(n²)) complexity?",
                    "✅ Can you implement recursive quicksort correctly?",
                    "✅ Do you understand why the pivot choice matters?",
                    "✅ Can you identify the space complexity (O(log n) average)?",
                    "✅ Do you know when to use quicksort vs merge sort?",
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
                    <strong>Observe carefully:</strong> For a sorted array with the first element as pivot, how many
                    partitions are needed? n partitions → O(n²). With a random pivot, it becomes O(n log n).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use median-of-three pivot selection? How does it
                    affect the worst-case performance?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 10,000 student records.
                    Quicksort with random pivot will sort them in about 10,000 × log₂(10,000) ≈ 140,000 operations,
                    but with a bad pivot, it could be 100,000,000 operations. Pivot choice matters!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Quick Sort Recursive ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Quick Sort — O(n log n) Average, O(n²) Worst
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive quicksort with last-element pivot.
                </p>
                <JavaFileLoader
                  fileModule={quickSortRecursiveJava}
                  title="QuickSortRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Quick Sort Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Quick Sort Analysis — Best vs Worst Case
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares quicksort performance with different pivot choices and input types.
                </p>
                <JavaFileLoader
                  fileModule={quickSortAnalysisJava}
                  title="QuickSortAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Pivot Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Pivot Comparison — First vs Random vs Median-of-Three
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares different pivot selection strategies and their impact on performance.
                </p>
                <JavaFileLoader
                  fileModule={quickSortPivotComparisonJava}
                  title="QuickSortPivotComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Quick Sort — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Quicksort is the fastest comparison-based sort in practice, but its worst-case O(n²) complexity 
              makes it a fascinating study. I emphasize to students that the pivot choice is critical — 
              "random pivot selection effectively eliminates the worst-case behavior in practice. 
              The recurrence for quicksort is a great example of how input distribution affects complexity: 
              balanced partitions give O(n log n), unbalanced give O(n²). I also highlight that quicksort 
              is in-place (O(log n) space) which makes it more memory-efficient than merge sort. 
              Have students compare quicksort with merge sort on different input types to see the differences. 
              Finally, remind them that Java's 'Arrays.sort()' uses a dual-pivot quicksort for primitives, 
              showing the practical importance of this algorithm.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 47 · Complexity of Recursive Quick Sort · Built with ❤️ for the classroom</p>
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

export default Topic47;