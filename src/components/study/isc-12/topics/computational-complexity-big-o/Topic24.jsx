import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import bubbleSortJava from "./topic24_files/BubbleSort.java?raw";
import insertionSortJava from "./topic24_files/InsertionSort.java?raw";
import nestedLoopDemoJava from "./topic24_files/NestedLoopDemo.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic24_files/topic24_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic24 = () => {
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
              Topic 24
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(n²) – Quadratic Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">first warning sign</span> of
            inefficient algorithms — nested loops that scale as the square of the input size.
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
                  <span className="text-indigo-500">●</span> What is O(n²) – Quadratic Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(n²)</strong> — pronounced "order n squared" — means the algorithm's runtime grows
                    <strong>quadratically</strong> with the input size. If you double the input, the runtime
                    <strong>quadruples</strong>. This complexity is typical of algorithms with <strong>nested loops</strong>
                    where both loops iterate over the same input.
                  </p>
                  <p>
                    Quadratic time algorithms are <strong>acceptable for small inputs</strong> (n ≤ 1000) but become
                    impractical for large datasets. Common examples include bubble sort, insertion sort (worst case),
                    selection sort, and algorithms that compare all pairs of elements.
                  </p>
                  <p>
                    Think of it like a classroom where the teacher wants to check <strong>every pair of students</strong>
                    for a group project. If there are 30 students, there are 435 pairs. If there are 60 students,
                    there are 1,770 pairs — that's roughly <strong>4 times</strong> more pairs for <strong>2 times</strong>
                    the students. That's the quadratic explosion.
                  </p>
                </div>
              </section>

              {/* ── Common O(n²) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common O(n²) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔄",
                      title: "Bubble Sort",
                      desc: "Compares adjacent elements and swaps them if they're in the wrong order.",
                      example: "for (i=0; i<n; i++) for (j=0; j<n-1; j++) { ... }",
                    },
                    {
                      icon: "📊",
                      title: "Insertion Sort (Worst Case)",
                      desc: "Builds the sorted array one element at a time; worst case is reverse sorted.",
                      example: "for (i=1; i<n; i++) for (j=i; j>0 && arr[j]<arr[j-1]; j--)",
                    },
                    {
                      icon: "🔍",
                      title: "Selection Sort",
                      desc: "Repeatedly finds the minimum element and places it at the beginning.",
                      example: "for (i=0; i<n; i++) for (j=i+1; j<n; j++) { ... }",
                    },
                    {
                      icon: "👥",
                      title: "Pairwise Comparison",
                      desc: "Checking every pair of elements in an array.",
                      example: "for (i=0; i<n; i++) for (j=i+1; j<n; j++) { ... }",
                    },
                    {
                      icon: "📐",
                      title: "Triangular Nested Loops",
                      desc: "Inner loop runs from i to n, total iterations n(n+1)/2 = O(n²).",
                      example: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... }",
                    },
                    {
                      icon: "🗂️",
                      title: "Matrix Traversal",
                      desc: "Visiting each element in an n×n matrix.",
                      example: "for (i=0; i<n; i++) for (j=0; j<n; j++) { ... }",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Quadratic Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Quadratic growth"
                  >
                    <defs>
                      <marker id="arrow24" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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

                    {/* Quadratic curve O(n²) */}
                    <path d="M60 270 L100 268 L140 265 L180 260 L220 250 L260 235 L300 215 L340 185 L380 150 L420 115 L460 80 L500 60 L540 52 L580 50 L620 50 L660 50 L700 50 L740 50 L760 50" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#fbbf24" fontWeight="bold">O(n²)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="215" r="8" fill="#fbbf24">
                      <animate attributeName="cx" values="60;700;60" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="5s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on curve */}
                    <text x="100" y="275" fontSize="10" fill="#6b7280">n=10</text>
                    <text x="220" y="255" fontSize="10" fill="#6b7280">n=30</text>
                    <text x="340" y="195" fontSize="10" fill="#6b7280">n=50</text>
                    <text x="500" y="85" fontSize="10" fill="#6b7280">n=80</text>

                    {/* Fill under curve */}
                    <path d="M60 270 L760 50 L760 280 L60 280 Z" fill="url(#quadraticGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="quadraticGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(n²) grows rapidly. For n=1000, operations = 1,000,000. For n=10,000, operations = 100,000,000.
                    This is why O(n²) algorithms become slow for large inputs.
                  </p>
                </div>
              </section>

              {/* ── When O(n²) is Acceptable ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> When is O(n²) Acceptable?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "📏",
                      title: "Small Input Sizes",
                      desc: "When n ≤ 1000, O(n²) is often acceptable and may be faster due to lower overhead.",
                    },
                    {
                      icon: "📦",
                      title: "One-Time Operations",
                      desc: "If the algorithm runs once on a small dataset, O(n²) is fine (e.g., initialization).",
                    },
                    {
                      icon: "🔄",
                      title: "When n is Constant",
                      desc: "If the problem size is bounded (e.g., chessboard is 8×8), O(n²) is O(1).",
                    },
                    {
                      icon: "⚡",
                      title: "When Simpler Code Matters",
                      desc: "Sometimes O(n²) code is much simpler and easier to maintain than O(n log n).",
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
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Classroom Pairs:</span>{" "}
                      A teacher in <strong>Barrackpore</strong> wants to check every pair of students. With 30 students,
                      that's 435 pairs. With 60 students, it's 1,770 pairs — quadruple! That's O(n²).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Game Development:</span>{" "}
                      Checking collision between every pair of objects in a game. For 100 objects, 10,000 checks.
                      For 200 objects, 40,000 checks — feasible only for small numbers.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Scheduling:</span>{" "}
                      Comparing all possible pairs of meeting times to find conflicts — for 50 meetings, 1,225 comparisons.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Student Comparison:</span>{" "}
                      <strong>Swadeep</strong> and <strong>Tuhina</strong> are comparing their solutions with every
                      other student's solution — that's O(n²) time.
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
                      tip: "Avoid O(n²) for large datasets",
                      desc: "For n > 10,000, O(n²) is usually too slow. Look for O(n log n) alternatives.",
                    },
                    {
                      tip: "Consider using hash maps",
                      desc: "Many O(n²) problems (finding duplicates, pair sums) can be solved in O(n) with a hash map.",
                    },
                    {
                      tip: "Know when to use insertion sort",
                      desc: "For small n (≤ 50), insertion sort's O(n²) is often faster than O(n log n) due to lower overhead.",
                    },
                    {
                      tip: "Profile before optimizing",
                      desc: "Don't optimize prematurely. Make sure O(n²) is actually a bottleneck before rewriting.",
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
                    <strong>Assuming all nested loops are O(n²):</strong> If the inner loop runs a constant number of
                    times, it's O(n), not O(n²). Always check the inner loop's range.
                  </li>
                  <li>
                    <strong>Overlooking optimization opportunities:</strong> Many O(n²) problems can be reduced to
                    O(n log n) or O(n) with better algorithms (e.g., sorting, hashing).
                  </li>
                  <li>
                    <strong>Using O(n²) when n is large:</strong> For n=1,000,000, O(n²) is 1,000,000,000,000 operations —
                    impossible. Always consider the input size.
                  </li>
                  <li>
                    <strong>Forgetting that triangular loops are still O(n²):</strong> A loop with j from i to n
                    has n(n+1)/2 iterations, which is still O(n²).
                  </li>
                  <li>
                    <strong>Ignoring the constant factor:</strong> Some O(n²) algorithms have very small constants and
                    may beat O(n log n) for small n. Choose based on the actual input size.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once optimized bubble sort to O(n) for nearly sorted data using a flag,
                      but forgot that the worst-case is still O(n²).
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
                      <strong>Use better algorithms</strong> — sort then search, use hash maps, or use divide-and-conquer.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know the input size</strong> — if n ≤ 1000, O(n²) is usually fine.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use optimized O(n²) algorithms</strong> — bubble sort with early exit, insertion sort for small n.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider hybrid approaches</strong> — use insertion sort for small subarrays in divide-and-conquer sorts.
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
                    "✅ Can you identify O(n²) algorithms (nested loops over same input)?",
                    "✅ Do you know which sorting algorithms are O(n²) in worst case?",
                    "✅ Can you distinguish O(n²) from O(n) and O(n log n)?",
                    "✅ Do you know when O(n²) is acceptable (small n)?",
                    "✅ Can you recognize triangular loops as O(n²)?",
                    "✅ Do you understand how to optimize O(n²) problems?",
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
                    <strong>Observe carefully:</strong> In a nested loop where both loops run n times, how many
                    operations? n². What if the inner loop runs from i to n? The total is n(n+1)/2 ≈ n²/2, still O(n²).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use a hash map to check for duplicates instead of
                    comparing every pair? That reduces O(n²) to O(n). A big improvement!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Shyamnagar</strong> has 10,000 students. Sorting
                    them with bubble sort (O(n²)) would take 100,000,000 operations. Merge sort (O(n log n)) would take
                    about 140,000 operations. The difference is huge!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Bubble Sort ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Bubble Sort — Classic O(n²)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Bubble sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.
                  O(n²) in worst case.
                </p>
                <JavaFileLoader
                  fileModule={bubbleSortJava}
                  title="BubbleSort.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Insertion Sort ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Insertion Sort — O(n²) Worst Case
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Insertion sort builds the sorted array one element at a time. O(n²) in worst case (reverse sorted),
                  O(n) in best case (already sorted).
                </p>
                <JavaFileLoader
                  fileModule={insertionSortJava}
                  title="InsertionSort.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Nested Loop Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Nested Loop Demo — O(n²) Patterns
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates different nested loop patterns that result in O(n²) complexity.
                </p>
                <JavaFileLoader
                  fileModule={nestedLoopDemoJava}
                  title="NestedLoopDemo.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(n²) – Quadratic Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(n²) is the warning sign that an algorithm won't scale. I tell my students: 'If you see a nested loop over the same data, think twice.' " +
              "For small n, O(n²) is fine and often simpler. But for large datasets, you need to look for O(n log n) or O(n) alternatives. " +
              "The classic example is sorting: bubble sort is O(n²) and is only used for educational purposes; merge sort is O(n log n) and is used in practice. " +
              "Have students compare the runtime of bubble sort vs merge sort for n=10, 100, 1000, 10000 — they'll see the quadratic explosion. " +
              "Also, emphasize that many O(n²) problems can be solved in O(n) with hash maps (e.g., finding duplicates, pair sums)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 24 · O(n²) – Quadratic Time · Built with ❤️ for the classroom</p>
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

export default Topic24;