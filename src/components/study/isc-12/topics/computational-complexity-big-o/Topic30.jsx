import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import algorithmComparisonJava from "./topic30_files/AlgorithmComparison.java?raw";
import growthRatesComparisonJava from "./topic30_files/GrowthRatesComparison.java?raw";
import practicalTradeoffsJava from "./topic30_files/PracticalTradeoffs.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic30_files/topic30_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic30 = () => {
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
              Topic 30
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Algorithm Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Comparing Algorithm Efficiency
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            How to choose between algorithms — understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">trade-offs</span>{" "}
            in time complexity, space complexity, constants, and practical considerations.
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
                  <span className="text-indigo-500">●</span> What Does "Comparing Efficiency" Mean?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    When we compare algorithm efficiency, we're not just looking at <strong>time complexity</strong>
                    in isolation. We need to consider multiple factors:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Time Complexity:</strong> How does the runtime grow with input size?</li>
                    <li><strong>Space Complexity:</strong> How much memory does the algorithm use?</li>
                    <li><strong>Constant Factors:</strong> In practice, constants can make a difference.</li>
                    <li><strong>Input Characteristics:</strong> Best, worst, and average cases matter.</li>
                    <li><strong>Implementation Complexity:</strong> Simpler code is often preferred.</li>
                    <li><strong>Real-World Constraints:</strong> Hardware, data size, and environment.</li>
                  </ul>
                  <p>
                    Think of it like choosing a vehicle for a trip: a bicycle (O(n)) is efficient for short distances,
                    a car (O(n log n)) is good for medium trips, and a plane (O(1)) is best for long trips but has
                    high overhead. The "best" algorithm depends on the specific situation.
                  </p>
                </div>
              </section>

              {/* ── Key Comparison Factors ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Factors in Comparison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "⏱️",
                      title: "Time Complexity",
                      desc: "The growth rate of runtime with input size (Big-O).",
                      example: "O(n) vs O(n log n) vs O(n²)",
                    },
                    {
                      icon: "💾",
                      title: "Space Complexity",
                      desc: "Memory usage during execution (auxiliary space).",
                      example: "O(1) vs O(log n) vs O(n)",
                    },
                    {
                      icon: "🔢",
                      title: "Constant Factors",
                      desc: "Hidden constants that affect actual runtime.",
                      example: "2n vs 100n — both are O(n), but one is faster.",
                    },
                    {
                      icon: "📊",
                      title: "Input Characteristics",
                      desc: "Best, worst, and average case behavior.",
                      example: "Quicksort: O(n log n) avg, O(n²) worst.",
                    },
                    {
                      icon: "🧩",
                      title: "Implementation Complexity",
                      desc: "Code readability, maintainability, and bug potential.",
                      example: "Simple algorithms vs complex optimizations.",
                    },
                    {
                      icon: "⚡",
                      title: "Practical Constraints",
                      desc: "Hardware, data size, and real-world environment.",
                      example: "Memory limits, cache behavior, parallelism.",
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

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Growth Rates Comparison
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Growth rates comparison"
                  >
                    <defs>
                      <marker id="arrow30" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
                      <line x1="60" y1="300" x2="760" y2="300" />
                      <line x1="60" y1="50" x2="60" y2="300" />
                      <line x1="207" y1="50" x2="207" y2="300" />
                      <line x1="354" y1="50" x2="354" y2="300" />
                      <line x1="501" y1="50" x2="501" y2="300" />
                      <line x1="648" y1="50" x2="648" y2="300" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="300" x2="760" y2="300" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="300" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="330" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">Input Size (n)</text>
                    <text x="20" y="180" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,180)">Operations</text>

                    {/* O(1) */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" />
                    <text x="770" y="85" fontSize="10" fill="#818cf8" fontWeight="bold">O(1)</text>

                    {/* O(log n) */}
                    <path d="M60 290 L200 260 L340 230 L480 195 L620 155 L760 120" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="770" y="122" fontSize="10" fill="#34d399" fontWeight="bold">O(log n)</text>

                    {/* O(n) */}
                    <path d="M60 300 L760 60" fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="770" y="62" fontSize="10" fill="#f472b6" fontWeight="bold">O(n)</text>

                    {/* O(n log n) */}
                    <path d="M60 300 C200 260 340 200 480 140 C560 100 640 80 760 55" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                    <text x="770" y="57" fontSize="10" fill="#a78bfa" fontWeight="bold">O(n log n)</text>

                    {/* O(n²) */}
                    <path d="M60 300 Q100 290 200 240 Q300 160 400 100 Q500 60 600 55 Q700 52 760 52" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="770" y="54" fontSize="10" fill="#fbbf24" fontWeight="bold">O(n²)</text>

                    {/* O(2ⁿ) */}
                    <path d="M60 300 Q100 300 200 290 Q300 250 400 160 Q500 80 600 55 Q700 52 760 52" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                    <text x="770" y="55" fontSize="10" fill="#f87171" fontWeight="bold">O(2ⁿ)</text>

                    {/* Animated line */}
                    <line x1="200" y1="300" x2="200" y2="230" stroke="#fbbf24" strokeWidth="2" opacity="0.5">
                      <animate attributeName="x1" values="100;700;100" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="x2" values="100;700;100" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="6s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Different complexity classes grow at vastly different rates. The "best" algorithm depends on the
                    input size, available resources, and specific requirements.
                  </p>
                </div>
              </section>

              {/* ── Decision Framework ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Decision Framework: How to Choose
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">1. Understand Your Data Size</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Small data (n &lt; 1000) → O(n²) may be fine. Large data (n &gt; 10⁶) → O(n log n) or better is required.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">2. Consider Memory Constraints</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Limited memory → prefer in-place algorithms (O(1) space). Plenty of memory → merge sort may be fine.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">3. Evaluate Best/Worst/Average Cases</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">If your input is often worst-case, avoid algorithms with poor worst-case performance.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">4. Think About Implementation Effort</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Simple code is easier to maintain. Use built-in functions when available.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">5. Profile and Measure</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Theory is important, but real-world performance matters. Always profile your code.</p>
                  </div>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Comparison Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Search:</span>{" "}
                      If you have a sorted array of 1 million elements, binary search (O(log n) ≈ 20 steps)
                      is far better than linear search (O(n) ≈ 1,000,000 steps).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Sorting:</span>{" "}
                      For 10,000 items, merge sort (O(n log n) ≈ 140,000 operations) vs bubble sort
                      (O(n²) ≈ 100,000,000 operations). Merge sort wins by a huge margin.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Data Structures:</span>{" "}
                      For frequent lookups, HashMap (O(1) average) beats TreeMap (O(log n)) for large data.
                      But TreeMap gives sorted order.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Analogy:</span>{" "}
                      <strong>Swadeep</strong> needs to find a student's grade. If the list is sorted by roll number,
                      binary search (O(log n)) is best. If it's unsorted, he must scan (O(n)) or use a hash table.
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
                      tip: "Always measure before optimizing",
                      desc: "Profile your code to identify real bottlenecks before making changes.",
                    },
                    {
                      tip: "Consider the environment",
                      desc: "A mobile app has different constraints than a server application.",
                    },
                    {
                      tip: "Use the right data structure",
                      desc: "Choosing the right data structure often simplifies your algorithm.",
                    },
                    {
                      tip: "Don't forget about I/O",
                      desc: "In real systems, I/O operations often dominate CPU time.",
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
                    <strong>Focusing only on Big-O:</strong> An O(n log n) algorithm with a huge constant can be
                    slower than an O(n²) algorithm with a tiny constant for small n.
                  </li>
                  <li>
                    <strong>Ignoring space complexity:</strong> A fast algorithm that uses too much memory may crash
                    or be unusable in memory-constrained environments.
                  </li>
                  <li>
                    <strong>Assuming worst-case is always the best metric:</strong> Sometimes average-case or best-case
                    matters more. Quicksort is O(n²) worst-case but O(n log n) average and is the fastest in practice.
                  </li>
                  <li>
                    <strong>Not considering the input distribution:</strong> If your data is already nearly sorted,
                    insertion sort (O(n) best) may outperform merge sort (O(n log n)).
                  </li>
                  <li>
                    <strong>Over-optimizing prematurely:</strong> Writing complex code for a 2% gain is often a waste.
                    Make it work, make it right, then make it fast.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once spent a week optimizing an algorithm for a dataset of 100 items,
                      only to find that the simpler O(n²) version was more than fast enough.
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
                      <strong>Profile before optimizing</strong> — use tools like JProfiler or VisualVM.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use built-in functions</strong> — Arrays.sort() and Collections.sort() are optimized.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider the full context</strong> — data size, memory, hardware, and use case.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document your choices</strong> — explain why you chose a particular algorithm.
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
                    "✅ Can you identify the time and space complexity of different algorithms?",
                    "✅ Do you understand the trade-offs between time and space?",
                    "✅ Can you choose between O(n) and O(n²) for a given data size?",
                    "✅ Do you know when to use built-in sorting vs custom sorting?",
                    "✅ Can you profile your code to find bottlenecks?",
                    "✅ Can you justify your algorithm choice in real-world terms?",
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
                    <strong>Observe carefully:</strong> For n=100, O(n²)=10,000 and O(n log n)≈664 — both are fast.
                    For n=1,000,000, O(n²)=10¹² vs O(n log n)≈20×10⁶ — the difference is huge.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you have unlimited memory but need to process
                    1 billion elements? You'd prefer O(n) time with O(n) space over O(n²) time with O(1) space.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 50,000 students.
                    Sorting them with quicksort (O(n log n)) is fine, but with bubble sort (O(n²)) it's impossible.
                    Choosing the right algorithm matters!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Algorithm Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Algorithm Comparison — Searching and Sorting
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares different algorithms for the same task (searching and sorting) to show performance differences.
                </p>
                <JavaFileLoader
                  fileModule={algorithmComparisonJava}
                  title="AlgorithmComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Growth Rates Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Growth Rates Comparison — Theoretical vs Practical
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares theoretical growth rates (Big-O) with practical measurements for different algorithms.
                </p>
                <JavaFileLoader
                  fileModule={growthRatesComparisonJava}
                  title="GrowthRatesComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Practical Trade-offs ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Practical Trade-offs — When O(n²) is Better than O(n log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that for small n, O(n²) can be faster than O(n log n) due to lower constant factors.
                </p>
                <JavaFileLoader
                  fileModule={practicalTradeoffsJava}
                  title="PracticalTradeoffs.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Comparing Algorithm Efficiency — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Comparing algorithm efficiency is the culmination of everything we've learned. I tell students: " +
              "'The best algorithm depends on the situation.' Use the following rules of thumb: " +
              "For n < 100, O(n²) is usually fine. For n > 10,000, aim for O(n log n) or better. " +
              "Always consider space: an in-place O(n²) can be better than an O(n) algorithm that uses O(n) memory. " +
              "And always profile — theory is a guide, but real-world performance is what matters. " +
              "Encourage students to think like engineers: choose the simplest algorithm that meets performance goals."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 30 · Comparing Algorithm Efficiency · Built with ❤️ for the classroom</p>
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

export default Topic30;