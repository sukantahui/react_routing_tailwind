import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import complexityClassesJava from "./topic19_files/ComplexityClasses.java?raw";
import growthRatesJava from "./topic19_files/GrowthRates.java?raw";
import comparingClassesJava from "./topic19_files/ComparingClasses.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic19_files/topic19_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic19 = () => {
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
              Topic 19
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Common Complexity Classes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">family of growth rates</span> —
            from constant to factorial — and the algorithms that belong to each.
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
                  <span className="text-indigo-500">●</span> What Are Complexity Classes?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Complexity classes</strong> are categories of algorithms based on their growth rate
                    as input size <strong>n</strong> increases. They provide a way to classify algorithms and
                    compare their efficiency. Each class represents a family of functions that grow at the same rate,
                    up to constant factors.
                  </p>
                  <p>
                    The most common complexity classes, from best to worst, are:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>O(1)</strong> — Constant: Independent of input size.</li>
                    <li><strong>O(log n)</strong> — Logarithmic: Grows very slowly.</li>
                    <li><strong>O(n)</strong> — Linear: Grows proportionally with input.</li>
                    <li><strong>O(n log n)</strong> — Linearithmic: Common in efficient sorting.</li>
                    <li><strong>O(n²)</strong> — Quadratic: Nested loops, slower for large n.</li>
                    <li><strong>O(2ⁿ)</strong> — Exponential: Quickly becomes infeasible.</li>
                    <li><strong>O(n!)</strong> — Factorial: The worst, only for tiny n.</li>
                  </ul>
                  <p>
                    Think of it like the speed of different vehicles: O(1) is teleportation, O(log n) is a fighter jet,
                    O(n) is a car, O(n²) is walking uphill, and O(2ⁿ) is a snail with a broken leg.
                  </p>
                </div>
              </section>

              {/* ── The Complexity Hierarchy ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> The Hierarchy (Best to Worst)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      class: "O(1) – Constant",
                      desc: "Time is independent of input size. The fastest possible.",
                      example: "Array access, arithmetic operations, hash table lookup (average).",
                    },
                    {
                      class: "O(log n) – Logarithmic",
                      desc: "Grows very slowly. Halving the input each step.",
                      example: "Binary search, balanced tree operations.",
                    },
                    {
                      class: "O(n) – Linear",
                      desc: "Grows proportionally with input. One operation per element.",
                      example: "Linear search, array traversal, sum of array.",
                    },
                    {
                      class: "O(n log n) – Linearithmic",
                      desc: "The best achievable for comparison-based sorting.",
                      example: "Merge sort, heap sort, quicksort (average).",
                    },
                    {
                      class: "O(n²) – Quadratic",
                      desc: "Grows as the square of input. Two nested loops.",
                      example: "Bubble sort, insertion sort, nested loop comparisons.",
                    },
                    {
                      class: "O(n³) – Cubic",
                      desc: "Three nested loops. Often avoidable with better algorithms.",
                      example: "Naive matrix multiplication, Floyd-Warshall.",
                    },
                    {
                      class: "O(2ⁿ) – Exponential",
                      desc: "Doubles with each new element. Only works for small n.",
                      example: "Naive Fibonacci, subset generation, Tower of Hanoi.",
                    },
                    {
                      class: "O(n!) – Factorial",
                      desc: "The worst. Only feasible for n ≤ 10.",
                      example: "Traveling salesman (brute force), permutation generation.",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.class}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Growth Rates
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Growth rates comparison"
                  >
                    <defs>
                      <marker id="arrow19" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="137" x2="760" y2="137" />
                      <line x1="60" y1="224" x2="760" y2="224" />
                      <line x1="60" y1="311" x2="760" y2="311" />
                      <line x1="60" y1="50" x2="60" y2="350" />
                      <line x1="207" y1="50" x2="207" y2="350" />
                      <line x1="354" y1="50" x2="354" y2="350" />
                      <line x1="501" y1="50" x2="501" y2="350" />
                      <line x1="648" y1="50" x2="648" y2="350" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="350" x2="760" y2="350" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="350" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="380" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">Operations</text>

                    {/* O(1) */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" />
                    <text x="770" y="85" fontSize="11" fill="#818cf8" fontWeight="bold">O(1)</text>

                    {/* O(log n) */}
                    <path d="M60 340 L200 260 L340 200 L480 160 L620 130 L760 110" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="112" fontSize="11" fill="#34d399" fontWeight="bold">O(log n)</text>

                    {/* O(n) */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="82" fontSize="11" fill="#f472b6" fontWeight="bold">O(n)</text>

                    {/* O(n log n) */}
                    <path d="M60 340 C200 280 340 200 480 140 C560 110 640 90 760 60" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
                    <text x="770" y="62" fontSize="11" fill="#a78bfa" fontWeight="bold">O(n log n)</text>

                    {/* O(n²) */}
                    <path d="M60 348 Q100 340 200 290 Q300 200 400 140 Q500 90 600 60 Q700 50 760 48" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="50" fontSize="11" fill="#fbbf24" fontWeight="bold">O(n²)</text>

                    {/* O(2ⁿ) - dashed */}
                    <path d="M60 350 Q100 350 200 340 Q300 300 400 200 Q500 100 600 55 Q700 50 760 48" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
                    <text x="770" y="55" fontSize="11" fill="#f87171" fontWeight="bold">O(2ⁿ)</text>

                    {/* Animated scanning line */}
                    <line x1="200" y1="350" x2="200" y2="260" stroke="#fbbf24" strokeWidth="2" opacity="0.5">
                      <animate attributeName="x1" values="100;700;100" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="x2" values="100;700;100" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="6s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The gap between complexity classes grows exponentially. O(1), O(log n), and O(n) are "efficient";
                    O(n²) is "slow"; O(2ⁿ) and O(n!) are "intractable" for large n.
                  </p>
                </div>
              </section>

              {/* ── Practical Limits ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Practical Limits: When Do They Become Infeasible?
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Complexity</th>
                        <th className="px-4 py-2 border-b">n=10</th>
                        <th className="px-4 py-2 border-b">n=100</th>
                        <th className="px-4 py-2 border-b">n=1000</th>
                        <th className="px-4 py-2 border-b">n=10⁶</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["O(1)", "1", "1", "1", "1"],
                        ["O(log n)", "3", "7", "10", "20"],
                        ["O(n)", "10", "100", "1000", "10⁶"],
                        ["O(n log n)", "33", "664", "10,000", "20×10⁶"],
                        ["O(n²)", "100", "10,000", "10⁶", "10¹²"],
                        ["O(2ⁿ)", "1,024", "1.27×10³⁰", "impossible", "impossible"],
                        ["O(n!)", "3.6×10⁶", "9.3×10¹⁵⁷", "impossible", "impossible"],
                      ].map(([complexity, n10, n100, n1000, n1e6], i) => (
                        <tr key={i} className={clsx(
                          "border-b border-gray-200 dark:border-gray-700 transition-colors",
                          i >= 5 ? "bg-red-50/50 dark:bg-red-900/10" :
                          i >= 4 ? "bg-amber-50/50 dark:bg-amber-900/10" :
                          "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        )}>
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{complexity}</td>
                          <td className="px-4 py-2 font-mono">{n10}</td>
                          <td className="px-4 py-2 font-mono">{n100}</td>
                          <td className="px-4 py-2 font-mono">{n1000}</td>
                          <td className="px-4 py-2 font-mono">{n1e6}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  O(2ⁿ) and O(n!) become impossible for even moderate n. Always aim for O(n log n) or better for large datasets.
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
                      tip: "Memorize the hierarchy",
                      desc: "Knowing the order from best to worst helps in quick comparisons.",
                    },
                    {
                      tip: "Aim for O(n log n) or better",
                      desc: "For large datasets, O(n²) is rarely acceptable.",
                    },
                    {
                      tip: "Consider the constant factor",
                      desc: "In practice, a well-optimized O(n²) can beat a poorly optimized O(n log n) for small n.",
                    },
                    {
                      tip: "Use the right tool for the job",
                      desc: "Sometimes O(n²) is fine if n is small (e.g., n ≤ 1000).",
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
                    <strong>Assuming O(n) is always better than O(n log n):</strong> While O(n) is indeed better,
                    the constants can make an O(n log n) algorithm faster for small n in practice.
                  </li>
                  <li>
                    <strong>Thinking O(1) means "instant":</strong> O(1) means constant time, but the constant could
                    be large (e.g., 1 million operations). It's still O(1) but may be slower in practice.
                  </li>
                  <li>
                    <strong>Confusing O(n²) with O(2ⁿ):</strong> For n=100, n²=10,000, 2ⁿ≈1.27×10³⁰ — a huge difference.
                    Exponential is much worse than quadratic.
                  </li>
                  <li>
                    <strong>Overlooking that O(n log n) is the best for comparison-based sorting:</strong> You can't sort
                    an arbitrary array in less than O(n log n) comparisons (in the worst case).
                  </li>
                  <li>
                    <strong>Ignoring the input size in practice:</strong> An O(n²) algorithm with n=10 is fine;
                    with n=10,000 it's not. Always consider the actual input size.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once optimized an O(n²) algorithm to O(n log n) for a dataset of 1M items,
                      reducing runtime from hours to seconds. She learned to always consider the scale.
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
                      <strong>Always estimate the input size</strong> before choosing an algorithm.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Prefer O(n log n) sorting</strong> over O(n²) for large datasets.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use hash maps for O(1) average lookups</strong> instead of O(n) searches.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know when to stop optimizing</strong> — if n is small, O(n²) is fine and simpler code is better.
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
                    "✅ Can you list the common complexity classes in order?",
                    "✅ Can you identify the complexity of simple algorithms (search, sort, loops)?",
                    "✅ Do you know which classes are efficient vs intractable?",
                    "✅ Can you estimate the feasibility of an algorithm for a given n?",
                    "✅ Do you understand the difference between O(n²) and O(2ⁿ)?",
                    "✅ Can you choose the right complexity class for a given problem?",
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
                    <strong>Observe carefully:</strong> For n=1000, O(n²) does 1,000,000 operations, while O(n log n)
                    does about 10,000 operations. That's 100x faster! For n=10⁶, it's 50,000x faster.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you have an O(2ⁿ) algorithm and n=20? That's about
                    1 million operations — feasible. But n=50 is impossible. Where's the limit?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 10,000 students.
                    An O(n²) algorithm would do 100 million operations; O(n log n) does about 140,000.
                    The difference is huge — choose wisely!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Complexity Classes Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Complexity Classes — Code Examples
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates each complexity class with actual code snippets.
                </p>
                <JavaFileLoader
                  fileModule={complexityClassesJava}
                  title="ComplexityClasses.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Growth Rates ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Growth Rates — Visualizing the Difference
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the number of operations for different complexity classes at various input sizes.
                </p>
                <JavaFileLoader
                  fileModule={growthRatesJava}
                  title="GrowthRates.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Comparing Classes ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Comparing Classes — Runtime Measurement
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Measures actual runtime of algorithms with different complexity classes to see the difference in practice.
                </p>
                <JavaFileLoader
                  fileModule={comparingClassesJava}
                  title="ComparingClasses.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Common Complexity Classes — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "The hierarchy of complexity classes is the most fundamental concept in algorithm analysis. " +
              "I like to use the analogy of different modes of transportation: O(1) is teleportation, " +
              "O(log n) is a rocket, O(n) is a car, O(n log n) is a bicycle, O(n²) is walking, " +
              "and O(2ⁿ) is a snail. This helps students remember the relative speeds. " +
              "Emphasize that the goal is always to achieve the best possible class for your problem. " +
              "For sorting, O(n log n) is the best we can do (comparison-based). " +
              "For search, O(log n) is achievable with sorting, or O(1) with hashing. " +
              "Knowing these classes and their limits is essential for designing efficient algorithms."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 19 · Common Complexity Classes · Built with ❤️ for the classroom</p>
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

export default Topic19;