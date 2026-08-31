import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import mergeSortJava from "./topic23_files/MergeSort.java?raw";
import heapSortJava from "./topic23_files/HeapSort.java?raw";
import complexityComparisonJava from "./topic23_files/ComplexityComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic23_files/topic23_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic23 = () => {
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
              Topic 23
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(n log n) – Linearithmic Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">gold standard</span> for sorting —
            the best achievable complexity for comparison-based sorting algorithms.
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
                  <span className="text-indigo-500">●</span> What is O(n log n) – Linearithmic Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(n log n)</strong> — pronounced "order n log n" — means the algorithm's runtime grows
                    <strong>linearithmically</strong> with the input size. It's the product of linear and logarithmic
                    growth: n multiplied by log₂(n). This complexity is the <strong>best achievable</strong> for
                    comparison-based sorting algorithms.
                  </p>
                  <p>
                    Linearithmic algorithms are those that <strong>divide and conquer</strong>: they split the problem
                    into smaller pieces (log n levels) and do O(n) work at each level. Merge sort, heap sort, and
                    quicksort (average case) are all O(n log n).
                  </p>
                  <p>
                    Think of it like organizing a library: you split the books into piles (log n levels), and at
                    each level you process each book once (n work per level). The total work is n × log n.
                  </p>
                </div>
              </section>

              {/* ── Common O(n log n) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common O(n log n) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔄",
                      title: "Merge Sort",
                      desc: "Divides array in half, sorts each half, then merges — O(n log n).",
                      example: "mergeSort(arr, 0, n-1);",
                    },
                    {
                      icon: "⛏️",
                      title: "Heap Sort",
                      desc: "Builds a heap and repeatedly extracts the maximum.",
                      example: "heapSort(arr);",
                    },
                    {
                      icon: "🎯",
                      title: "Quicksort (Average)",
                      desc: "Partitions around a pivot; average-case O(n log n).",
                      example: "quickSort(arr, 0, n-1);",
                    },
                    {
                      icon: "📊",
                      title: "Divide and Conquer",
                      desc: "Any algorithm that splits input and does O(n) work per level.",
                      example: "T(n) = 2T(n/2) + O(n)",
                    },
                    {
                      icon: "🗂️",
                      title: "Sorting in Practice",
                      desc: "Java's Arrays.sort() uses Timsort (O(n log n)).",
                      example: "Arrays.sort(arr);",
                    },
                    {
                      icon: "📈",
                      title: "Comparison Sorting Bound",
                      desc: "The theoretical lower bound for comparison-based sorting.",
                      example: "Ω(n log n) for comparison-based sorting.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Linearithmic Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Linearithmic growth"
                  >
                    <defs>
                      <marker id="arrow23" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="100" x2="760" y2="100" />
                      <line x1="60" y1="150" x2="760" y2="150" />
                      <line x1="60" y1="200" x2="760" y2="200" />
                      <line x1="60" y1="250" x2="760" y2="250" />
                      <line x1="60" y1="50" x2="60" y2="300" />
                      <line x1="207" y1="50" x2="207" y2="300" />
                      <line x1="354" y1="50" x2="354" y2="300" />
                      <line x1="501" y1="50" x2="501" y2="300" />
                      <line x1="648" y1="50" x2="648" y2="300" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="280" x2="760" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="310" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="180" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,180)">Operations</text>

                    {/* O(n log n) curve */}
                    <path d="M60 270 L100 255 L140 238 L180 218 L220 198 L260 175 L300 152 L340 130 L380 108 L420 88 L460 72 L500 62 L540 56 L580 53 L620 51 L660 50 L700 50 L740 50 L760 50" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#a78bfa" fontWeight="bold">O(n log n)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="152" r="8" fill="#a78bfa">
                      <animate attributeName="cx" values="60;700;60" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="5s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on curve */}
                    <text x="100" y="265" fontSize="10" fill="#6b7280">n=10</text>
                    <text x="220" y="215" fontSize="10" fill="#6b7280">n=50</text>
                    <text x="340" y="150" fontSize="10" fill="#6b7280">n=100</text>
                    <text x="500" y="80" fontSize="10" fill="#6b7280">n=200</text>

                    {/* Fill under curve */}
                    <path d="M60 270 L760 50 L760 280 L60 280 Z" fill="url(#linearithmicGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="linearithmicGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(n log n) grows faster than O(n) but much slower than O(n²). It's the sweet spot for sorting algorithms.
                  </p>
                </div>
              </section>

              {/* ── Why O(n log n) is the Best for Sorting ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why O(n log n) is the Best for Comparison-Based Sorting
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="text-center">
                    <span className="font-semibold">Theoretical Lower Bound:</span> Any comparison-based sorting
                    algorithm must make at least <strong>Ω(n log n)</strong> comparisons in the worst case.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    This means you <span className="font-semibold">cannot</span> sort an arbitrary array in less than
                    O(n log n) time using comparisons. Algorithms like merge sort, heap sort, and quicksort
                    (average) achieve this bound.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Non-comparison sorts (like counting sort, radix sort) can achieve O(n) but have restrictions
                    on the input data.
                  </p>
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Library Organization:</span>{" "}
                      A librarian sorting books by title using a divide-and-conquer approach — splitting the collection
                      into halves, sorting each, and merging them back together. That's merge sort.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">School Records:</span>{" "}
                      A school in <strong>Barrackpore</strong> sorting student records by roll number using
                      <strong>Java's Arrays.sort()</strong>, which uses Timsort — a hybrid sorting algorithm
                      that runs in O(n log n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">E-commerce:</span>{" "}
                      Sorting millions of products by price on an online store. Efficient sorting (O(n log n))
                      is essential for fast page loads.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      Students <strong>Abhronila</strong> and <strong>Susmita</strong> are sorting their flashcards.
                      They split the deck in half, sort each half, then merge — that's O(n log n).
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
                      tip: "Use Arrays.sort() for O(n log n) sorting",
                      desc: "Java's built-in sort is highly optimized and uses Timsort.",
                    },
                    {
                      tip: "Remember: O(n log n) is the best for comparison sorting",
                      desc: "You can't do better without special constraints on the data.",
                    },
                    {
                      tip: "Consider non-comparison sorts for special cases",
                      desc: "If data is small-range integers, counting sort can be O(n).",
                    },
                    {
                      tip: "Watch for worst-case in quicksort",
                      desc: "Quicksort is O(n²) in worst case; use random pivot to make it O(n log n) average.",
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
                    <strong>Confusing O(n log n) with O(log n):</strong> O(n log n) is much slower than O(log n).
                    Binary search is O(log n); sorting is O(n log n).
                  </li>
                  <li>
                    <strong>Thinking all sorts are O(n log n):</strong> Bubble sort, insertion sort are O(n²).
                    Only efficient sorts achieve O(n log n).
                  </li>
                  <li>
                    <strong>Assuming O(n log n) is always fast:</strong> For n=10⁶, n log n ≈ 20×10⁶ operations —
                    still fast, but not instant.
                  </li>
                  <li>
                    <strong>Forgetting about the lower bound:</strong> You cannot sort in O(n) using comparisons.
                    The lower bound is Ω(n log n).
                  </li>
                  <li>
                    <strong>Ignoring the constant factors:</strong> Merge sort and quicksort both O(n log n), but
                    quicksort is usually faster due to smaller constants.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once chose merge sort over quicksort because both are O(n log n),
                      not realizing quicksort is typically faster in practice.
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
                      <strong>Use Java's built-in sort</strong> (Arrays.sort, Collections.sort) — they are optimized and stable.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Prefer merge sort for stable sorting</strong> and guaranteed O(n log n) performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use quicksort for speed</strong> when stability is not required and worst-case is acceptable.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider the data size</strong> — for small n (n &lt 50), insertion sort (O(n²)) can be faster than merge sort due to lower overhead.
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
                    "✅ Can you identify O(n log n) algorithms (merge sort, heap sort)?",
                    "✅ Do you understand why comparison-based sorting has a lower bound of Ω(n log n)?",
                    "✅ Can you distinguish O(n log n) from O(n) and O(n²)?",
                    "✅ Do you know which sorting algorithms are O(n log n)?",
                    "✅ Do you understand the difference between merge sort and quicksort?",
                    "✅ Can you compute n log n for typical input sizes?",
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
                    <strong>Observe carefully:</strong> Merge sort has recurrence T(n) = 2T(n/2) + O(n). Why does
                    this solve to O(n log n)? Because there are log n levels, and each level does O(n) work.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if an algorithm splits into two halves and does O(1)
                    work per level? Then it's O(n), not O(n log n). The O(n) work per level is what makes it O(n log n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Naihati</strong> has 10,000 students. Sorting
                    them by name using merge sort takes about 10,000 × log₂(10,000) ≈ 140,000 operations. Bubble sort
                    would take 100,000,000 operations. The difference is huge!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Merge Sort ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort — Classic O(n log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Merge sort divides the array, sorts halves, and merges. It's O(n log n) in all cases.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortJava}
                  title="MergeSort.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Heap Sort ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Heap Sort — Another O(n log n) Sort
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Heap sort builds a heap and repeatedly extracts the maximum. Guaranteed O(n log n).
                </p>
                <JavaFileLoader
                  fileModule={heapSortJava}
                  title="HeapSort.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Complexity Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Complexity Comparison — O(n log n) vs O(n²)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the runtime of O(n log n) and O(n²) algorithms for different input sizes.
                </p>
                <JavaFileLoader
                  fileModule={complexityComparisonJava}
                  title="ComplexityComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(n log n) – Linearithmic Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(n log n) is the sweet spot for sorting. I tell students: 'If you can achieve O(n log n), you're doing well.' " +
              "It's the theoretical lower bound for comparison-based sorting, so you can't do better without special constraints. " +
              "The key insight is the divide-and-conquer pattern: split the problem, solve each part, and combine. " +
              "This appears everywhere in computer science, not just sorting. " +
              "Have students compare the runtime of merge sort vs bubble sort for different input sizes — " +
              "the difference is dramatic. Also, remind them that while O(n log n) is great, O(n) is still better when possible."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 23 · O(n log n) – Linearithmic Time · Built with ❤️ for the classroom</p>
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

export default Topic23;