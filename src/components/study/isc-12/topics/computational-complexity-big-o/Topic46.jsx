import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import mergeSortRecursiveJava from "./topic46_files/MergeSortRecursive.java?raw";
import mergeSortAnalysisJava from "./topic46_files/MergeSortAnalysis.java?raw";
import mergeSortComparisonJava from "./topic46_files/MergeSortComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic46_files/topic46_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic46 = () => {
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
              Topic 46
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Merge Sort
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n log n)</span> time
            and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n)</span> space of recursive
            merge sort — the classic divide-and-conquer algorithm with guaranteed performance.
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
                  <span className="text-emerald-500">●</span> What is Recursive Merge Sort?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Merge sort</strong> is a classic <strong>divide-and-conquer</strong> sorting algorithm
                    that recursively divides the array into two halves, sorts each half, and then merges the
                    sorted halves back together. It is known for its <strong>guaranteed O(n log n)</strong> time
                    complexity in all cases (best, worst, average).
                  </p>
                  <p>
                    The recurrence relation is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = 2T(n/2) + O(n), &nbsp; T(1) = O(1)
                    </span>
                    This solves to <strong>O(n log n)</strong> time. The space complexity is <strong>O(n)</strong>
                    due to the auxiliary array used during merging.
                  </p>
                  <p>
                    Think of it like organizing a deck of cards: split the deck in half, sort each half, then merge
                    them by comparing the top cards of each half. This ensures that the total work is n operations
                    per level, and there are log₂(n) levels.
                  </p>
                </div>
              </section>

              {/* ── How Merge Sort Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> How Recursive Merge Sort Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {
                      step: "4. Return",
                      desc: "The merged array is returned (or copied back into the original).",
                      icon: "📤",
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
                      case: "Best Case",
                      time: "Θ(n log n)",
                      space: "O(n)",
                      example: "Even if sorted, merge sort still does all the work.",
                    },
                    {
                      case: "Worst Case",
                      time: "Θ(n log n)",
                      space: "O(n)",
                      example: "Always guaranteed O(n log n) performance.",
                    },
                    {
                      case: "Average Case",
                      time: "Θ(n log n)",
                      space: "O(n)",
                      example: "Consistent regardless of input distribution.",
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
                  <span className="text-emerald-500">●</span> Visual Intuition: Recursion Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 320"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Merge sort recursion tree"
                  >
                    <defs>
                      <marker id="arrow46" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursion Tree for Merge Sort (n=8)
                    </text>

                    {/* Level 0 */}
                    <rect x="310" y="40" width="180" height="28" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="61" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">mergeSort(0,7)</text>
                    <text x="400" y="75" textAnchor="middle" fontSize="10" fill="#6b7280">work: n</text>

                    {/* Level 1 */}
                    <line x1="400" y1="68" x2="250" y2="85" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="68" x2="550" y2="85" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="180" y="88" width="140" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="250" y="108" textAnchor="middle" fontSize="11" fill="white">sort(0,3)</text>
                    <rect x="480" y="88" width="140" height="26" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="550" y="108" textAnchor="middle" fontSize="11" fill="white">sort(4,7)</text>
                    <text x="400" y="130" textAnchor="middle" fontSize="10" fill="#6b7280">work: n/2 + n/2 = n</text>

                    {/* Level 2 */}
                    <line x1="250" y1="114" x2="170" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="250" y1="114" x2="330" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="114" x2="470" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="550" y1="114" x2="630" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="110" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="170" y="151" textAnchor="middle" fontSize="10" fill="white">sort(0,1)</text>
                    <rect x="270" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="330" y="151" textAnchor="middle" fontSize="10" fill="white">sort(2,3)</text>
                    <rect x="410" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="470" y="151" textAnchor="middle" fontSize="10" fill="white">sort(4,5)</text>
                    <rect x="570" y="133" width="120" height="24" rx="5" fill="#f472b6" opacity="0.6" />
                    <text x="630" y="151" textAnchor="middle" fontSize="10" fill="white">sort(6,7)</text>
                    <text x="400" y="175" textAnchor="middle" fontSize="10" fill="#6b7280">work: 4 × (n/4) = n</text>

                    {/* Level 3 */}
                    <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#6b7280">… leaves: n × 1 = n work</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Total work = n × (log₂(n) + 1) = O(n log n)
                    </text>
                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#6b7280">
                      Space: O(n) for auxiliary array + O(log n) for stack = O(n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Merge sort creates a recursion tree with log₂(n) levels. At each level, the total work is O(n),
                    giving O(n log n) time. It uses O(n) space for the auxiliary array.
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
                    T(n) = 2T(n/2) + O(n), &nbsp; T(1) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Two recursive calls on half the input, plus O(n) work to merge.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    By Master Theorem (Case 2): a=2, b=2, f(n)=n, log_b a = 1, f(n)=Θ(n), so T(n)=Θ(n log n).
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    The space complexity is O(n) for the auxiliary array (plus O(log n) for stack, which is dominated by O(n)).
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">Θ(n log n)</span> (all cases)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(n)</span> (auxiliary array)
                  </p>
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
                      Sorting large datasets in databases often uses merge sort because it's stable and guarantees
                      O(n log n) performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">External Sorting:</span>{" "}
                      When data doesn't fit in memory, merge sort is used to sort chunks on disk and then merge them.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Classroom Example:</span>{" "}
                      Students in <strong>Barrackpore</strong> are sorting their test scores by dividing the class
                      into two groups, sorting each group, and merging — that's merge sort!
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Java's Sorting:</span>{" "}
                      Arrays.sort() for objects uses Timsort (a hybrid of merge sort and insertion sort).
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
                    <strong>Forgetting the base case:</strong> Without if (left >= right) return, the recursion
                    never terminates.
                  </li>
                  <li>
                    <strong>Incorrectly implementing the merge step:</strong> Off-by-one errors in the merge loop
                    are common. Always test with small arrays first.
                  </li>
                  <li>
                    <strong>Assuming merge sort is always the fastest:</strong> For small arrays, insertion sort
                    is faster. For large arrays, quicksort is often faster in practice (though merge sort has
                    guaranteed performance).
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
                  <span className="text-emerald-500">●</span> Best Practices
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
                  <span className="text-emerald-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for merge sort?",
                    "✅ Do you know the time complexity (O(n log n)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement recursive merge sort correctly?",
                    "✅ Do you understand the recursion tree for merge sort?",
                    "✅ Can you identify when to use merge sort vs other sorts?",
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
                    <strong>Observe carefully:</strong> For merge sort with n=8, how many levels are there?
                    log₂(8) = 3 levels (plus the root). Each level does n work, so total = n log n.
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
                  ☕ Recursive Merge Sort — O(n log n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive merge sort with recurrence T(n) = 2T(n/2) + O(n).
                </p>
                <JavaFileLoader
                  fileModule={mergeSortRecursiveJava}
                  title="MergeSortRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Merge Sort Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort Analysis — Steps and Comparisons
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of comparisons and recursion depth for merge sort.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortAnalysisJava}
                  title="MergeSortAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Merge Sort Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Merge Sort Comparison — Recursive vs Iterative vs Other Sorts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares merge sort with iterative merge sort, quicksort, and insertion sort.
                </p>
                <JavaFileLoader
                  fileModule={mergeSortComparisonJava}
                  title="MergeSortComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Merge Sort — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Merge sort is the quintessential divide-and-conquer algorithm. I emphasize that it's the 
              'guaranteed' O(n log n) sort — it doesn't have a bad case like quicksort. The recurrence 
              T(n) = 2T(n/2) + O(n) is a classic example of the Master Theorem. I make sure students understand 
              why the space complexity is O(n) — the temporary array used during merging. Also, I highlight that 
              merge sort is stable, which is important for multi-key sorting. Have students practice both recursive 
              and iterative implementations and compare them. Finally, remind them that Timsort (used in Java) 
              is a hybrid of merge sort and insertion sort, showing the practical importance of this algorithm.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 46 · Complexity of Recursive Merge Sort · Built with ❤️ for the classroom</p>
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

export default Topic46;