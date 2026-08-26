import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import quickSortRecursiveJava from "./topic29_files/QuickSortRecursive.java?raw";
import quickSortAnalysisJava from "./topic29_files/QuickSortAnalysis.java?raw";
import quickSortOptimizedJava from "./topic29_files/QuickSortOptimized.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic29_files/topic29_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic29 = () => {
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
              Topic 29
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Algorithm Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quick Sort Complexity Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n log n)</span>{" "}
            average-case and <span className="text-red-600 dark:text-red-400 font-semibold">O(n²)</span> worst-case
            complexity of quicksort — the fastest comparison-based sort in practice.
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
                  <span className="text-indigo-500">●</span> What is Quick Sort?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Quick sort</strong> is a highly efficient <strong>divide-and-conquer</strong> sorting
                    algorithm. It works by selecting a <strong>pivot</strong> element and partitioning the array
                    into two subarrays: elements less than the pivot and elements greater than the pivot. The
                    subarrays are then recursively sorted.
                  </p>
                  <p>
                    Quick sort is known for its <strong>excellent average-case performance</strong> — O(n log n) —
                    and its <strong>in-place</strong> nature (O(log n) extra space for recursion). However, it has
                    a <strong>worst-case O(n²)</strong> complexity when the pivot selection is poor.
                  </p>
                  <p>
                    Think of it like organizing a library: you pick a book (the pivot), put all books with titles
                    before it on the left, and all books after it on the right. Then you repeat this process on
                    each side. It's fast and efficient in practice.
                  </p>
                </div>
              </section>

              {/* ── How Quick Sort Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Quick Sort Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "1. Choose Pivot",
                      desc: "Select a pivot element (commonly the first, last, middle, or random element).",
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
                      case: "Best Case (Ω(n log n))",
                      desc: "When the pivot always divides the array into two equal halves.",
                      example: "Pivot is always the median.",
                    },
                    {
                      case: "Worst Case (O(n²))",
                      desc: "When the pivot is always the smallest or largest element (unbalanced).",
                      example: "Sorted array with first/last pivot.",
                    },
                    {
                      case: "Average Case (Θ(n log n))",
                      desc: "With random pivot, the expected complexity is O(n log n).",
                      example: "Random pivot selection.",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Partitioning
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Quick sort visualization"
                  >
                    <defs>
                      <marker id="arrow29" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Original array */}
                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Original Array: [10, 7, 8, 9, 1, 5]
                    </text>

                    {/* Step 1: Choose pivot */}
                    <text x="400" y="45" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Step 1: Choose pivot (last element: 5)
                    </text>
                    <rect x="370" y="55" width="60" height="25" rx="4" fill="#f87171" opacity="0.8" />
                    <text x="400" y="73" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">5</text>

                    {/* Step 2: Partition */}
                    <text x="400" y="100" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Step 2: Partition around pivot
                    </text>
                    <rect x="150" y="115" width="120" height="25" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="210" y="133" textAnchor="middle" fontSize="11" fill="white">[1]</text>
                    <rect x="300" y="115" width="60" height="25" rx="4" fill="#f87171" opacity="0.8" />
                    <text x="330" y="133" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">5</text>
                    <rect x="390" y="115" width="250" height="25" rx="4" fill="#f472b6" opacity="0.7" />
                    <text x="515" y="133" textAnchor="middle" fontSize="11" fill="white">[10, 7, 8, 9]</text>

                    {/* Step 3: Recurse */}
                    <text x="400" y="165" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Step 3: Recurse on left and right subarrays
                    </text>
                    <rect x="100" y="180" width="140" height="25" rx="4" fill="#818cf8" opacity="0.7" />
                    <text x="170" y="198" textAnchor="middle" fontSize="11" fill="white">[1] ✓</text>
                    <rect x="440" y="180" width="250" height="25" rx="4" fill="#a78bfa" opacity="0.7" />
                    <text x="565" y="198" textAnchor="middle" fontSize="11" fill="white">[10, 7, 8, 9]</text>

                    {/* Step 4: Partition right subarray */}
                    <text x="400" y="225" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Step 4: Recursively sort [10, 7, 8, 9] ...
                    </text>

                    {/* Step 5: Sorted array */}
                    <text x="400" y="265" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Sorted: [1, 5, 7, 8, 9, 10]
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Quick sort partitions around a pivot, then recursively sorts each side.
                    The average case is O(n log n), but worst-case O(n²) when partitions are unbalanced.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="font-mono text-lg text-center">
                      Best/Average: T(n) = 2T(n/2) + O(n)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Balanced partitions → O(n log n)
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="font-mono text-lg text-center text-red-600 dark:text-red-400">
                      Worst: T(n) = T(n-1) + O(n)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Unbalanced partitions → O(n²)
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                  Time Complexity: <span className="font-mono">O(n log n)</span> average,
                  <span className="font-mono text-red-600 dark:text-red-400"> O(n²)</span> worst-case
                </p>
                <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Space Complexity: <span className="font-mono">O(log n)</span> (recursion stack in average case)
                </p>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Professional Tips
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
                  <span className="text-indigo-500">●</span> Best Practices
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
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you explain the divide-and-conquer approach of quicksort?",
                    "✅ Do you know the average (O(n log n)) and worst (O(n²)) complexity?",
                    "✅ Can you write a recursive quicksort implementation?",
                    "✅ Do you understand why the pivot choice matters?",
                    "✅ Can you identify the recurrence for best and worst cases?",
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
                    <strong>Observe carefully:</strong> For an already sorted array with the first element as pivot,
                    how many partitions are needed? n partitions → O(n²). With a random pivot, it becomes O(n log n).
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
                  ☕ Quick Sort — Recursive (Average O(n log n), Worst O(n²))
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive implementation of quicksort with last-element pivot.
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

              {/* ── Java: Quick Sort Optimized ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Quick Sort Optimized — Median-of-Three Pivot
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Optimized quicksort with median-of-three pivot selection and insertion sort for small subarrays.
                </p>
                <JavaFileLoader
                  fileModule={quickSortOptimizedJava}
                  title="QuickSortOptimized.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Quick Sort Complexity Analysis — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Quicksort is the fastest comparison-based sort in practice, but its worst-case O(n²) complexity " +
              "makes it a fascinating study. I emphasize to students that the pivot choice is critical — " +
              "random pivot selection effectively eliminates the worst-case behavior in practice. " +
              "The recurrence for quicksort is a great example of how input distribution affects complexity: " +
              "balanced partitions give O(n log n), unbalanced give O(n²). I also highlight that quicksort " +
              "is in-place (O(log n) space) which makes it more memory-efficient than merge sort. " +
              "Have students compare quicksort with merge sort on different input types to see the differences. " +
              "Finally, remind them that Java's `Arrays.sort()` uses a dual-pivot quicksort for primitives, " +
              "showing the practical importance of this algorithm."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 29 · Quick Sort Complexity Analysis · Built with ❤️ for the classroom</p>
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

export default Topic29;