import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import binarySearchJava from "./topic21_files/BinarySearch.java?raw";
import logarithmicLoopJava from "./topic21_files/LogarithmicLoop.java?raw";
import treeOperationsJava from "./topic21_files/TreeOperations.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic21_files/topic21_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic21 = () => {
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
              Topic 21
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(log n) – Logarithmic Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">near-constant</span> complexity —
            algorithms that grow so slowly they remain efficient for enormous inputs.
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
                  <span className="text-indigo-500">●</span> What is O(log n) – Logarithmic Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(log n)</strong> — pronounced "order log n" — means the algorithm's runtime grows
                    <strong>logarithmically</strong> with the input size. For each step, the input size is reduced
                    by a constant factor (typically by half). This makes logarithmic algorithms incredibly fast:
                    even for n = 1 billion, log₂(n) is only about 30.
                  </p>
                  <p>
                    The classic example is <strong>binary search</strong>: you halve the search space each iteration,
                    so you need at most log₂(n) comparisons to find an element in a sorted array.
                  </p>
                  <p>
                    Think of it like finding a word in a dictionary: you don't read every page; you open the middle,
                    compare, then choose the left or right half, and repeat. With a million pages, you need only
                    20 page turns.
                  </p>
                </div>
              </section>

              {/* ── Common O(log n) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common O(log n) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔍",
                      title: "Binary Search",
                      desc: "Search a sorted array by repeatedly halving the search space.",
                      example: "while (low <= high) { mid = (low+high)/2; ... }",
                    },
                    {
                      icon: "🌳",
                      title: "Balanced Tree Operations",
                      desc: "Search, insert, delete in AVL, Red-Black trees — O(log n) height.",
                      example: "tree.search(key);",
                    },
                    {
                      icon: "⛏️",
                      title: "Heap Operations",
                      desc: "Insert and extract-min/max in a binary heap.",
                      example: "heap.add(element); heap.poll();",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Exponentiation",
                      desc: "Compute aⁿ in O(log n) by squaring the base.",
                      example: "fastPow(a, n) { if n==0 return 1; ... }",
                    },
                    {
                      icon: "🔢",
                      title: "Euclidean Algorithm (GCD)",
                      desc: "Number of steps is O(log min(a,b)).",
                      example: "gcd(a,b) { if (b==0) return a; return gcd(b, a%b); }",
                    },
                    {
                      icon: "📊",
                      title: "Divide and Conquer Recurrences",
                      desc: "T(n) = T(n/2) + O(1) → O(log n).",
                      example: "// Halving with constant work",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Logarithmic Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Logarithmic growth"
                  >
                    <defs>
                      <marker id="arrow21" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
                    <text x="20" y="180" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,180)">log₂(n)</text>

                    {/* Logarithmic curve */}
                    <path d="M60 270 L100 260 L140 250 L180 238 L220 225 L260 210 L300 194 L340 177 L380 158 L420 138 L460 117 L500 95 L540 75 L580 58 L620 54 L660 52 L700 51 L740 50 L760 50" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#34d399" fontWeight="bold">O(log n)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="194" r="8" fill="#34d399">
                      <animate attributeName="cx" values="60;700;60" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="5s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on curve */}
                    <text x="100" y="275" fontSize="10" fill="#6b7280">n=2</text>
                    <text x="180" y="253" fontSize="10" fill="#6b7280">n=10</text>
                    <text x="300" y="215" fontSize="10" fill="#6b7280">n=100</text>
                    <text x="450" y="155" fontSize="10" fill="#6b7280">n=1000</text>
                    <text x="600" y="85" fontSize="10" fill="#6b7280">n=10000</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(log n) grows extremely slowly. For n=1,000,000, log₂(n) ≈ 20. This is why logarithmic algorithms are nearly as fast as constant time.
                  </p>
                </div>
              </section>

              {/* ── Why O(log n) is So Efficient ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why O(log n) is Remarkably Fast
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Input Size (n)</th>
                        <th className="px-4 py-2 border-b">log₂(n)</th>
                        <th className="px-4 py-2 border-b">Comparisons (Binary Search)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["10", "3.3", "4"],
                        ["100", "6.6", "7"],
                        ["1,000", "9.9", "10"],
                        ["10,000", "13.3", "14"],
                        ["100,000", "16.6", "17"],
                        ["1,000,000", "19.9", "20"],
                        ["10,000,000", "23.3", "24"],
                        ["1,000,000,000", "29.9", "30"],
                      ].map(([n, logVal, steps], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2">{n}</td>
                          <td className="px-4 py-2 font-mono">{logVal}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{steps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Even for a billion elements, binary search takes only about 30 comparisons. That's the power of O(log n).
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
                      tip: "Look for halving patterns",
                      desc: "If you see the input being halved each step (e.g., i *= 2, n /= 2), expect O(log n).",
                    },
                    {
                      tip: "Use balanced trees for O(log n) operations",
                      desc: "BST, AVL, Red-Black trees give you O(log n) search, insert, delete.",
                    },
                    {
                      tip: "Binary search requires sorted data",
                      desc: "If your data is unsorted, you can't use binary search—first sort (O(n log n)) or use a hash map (O(1)).",
                    },
                    {
                      tip: "Remember: O(log n) is nearly as good as O(1)",
                      desc: "For practical n (up to 10⁹), log₂(n) ≤ 30, making it extremely fast.",
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
                    <strong>Confusing O(log n) with O(n log n):</strong> O(log n) is much faster. An algorithm that
                    halves the input and does O(1) work is O(log n); merge sort is O(n log n).
                  </li>
                  <li>
                    <strong>Assuming all divide-and-conquer is O(log n):</strong> If you do O(n) work at each level,
                    you get O(n log n), not O(log n). The work per level must be constant.
                  </li>
                  <li>
                    <strong>Forgetting that logarithmic base doesn't matter:</strong> O(log₂ n) = O(log₁₀ n) in Big-O
                    because they differ by a constant factor.
                  </li>
                  <li>
                    <strong>Misidentifying the input size:</strong> In a tree, n is the number of nodes; height is
                    O(log n) for balanced trees. Don't confuse height with number of nodes.
                  </li>
                  <li>
                    <strong>Not recognizing O(log n) in code:</strong> A loop where the variable doubles or halves is
                    O(log n), not O(n).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once analyzed a while loop that doubled i as O(n), but it's actually O(log n).
                      She learned to check the variable's growth pattern.
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
                      <strong>Use binary search on sorted arrays</strong> — it's O(log n) and extremely efficient.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Prefer balanced BSTs over unbalanced ones</strong> to maintain O(log n) operations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use heaps for priority queues</strong> — insert and extract are O(log n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know the recurrence:</strong> T(n) = T(n/2) + O(1) → O(log n). This pattern appears everywhere.
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
                    "✅ Can you identify O(log n) patterns (halving/doubling)?",
                    "✅ Do you understand why binary search is O(log n)?",
                    "✅ Can you explain why balanced trees have O(log n) height?",
                    "✅ Can you recognize O(log n) loops?",
                    "✅ Do you know the difference between O(log n) and O(n log n)?",
                    "✅ Can you compute log₂(n) for typical input sizes?",
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
                    <strong>Observe carefully:</strong> In a loop where i doubles (i *= 2), the number of iterations
                    is log₂(n). For n=1,000,000, that's about 20 iterations.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the loop doubles by 3? The base changes, but it's still
                    O(log n) because all log bases are constant factors.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 32,768 students. If you
                    use a balanced tree to store their names, the maximum number of steps to find a student is log₂(32,768)=15.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Binary Search ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search — Classic O(log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Binary search on a sorted array repeatedly halves the search space, achieving O(log n) time.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchJava}
                  title="BinarySearch.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Logarithmic Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Logarithmic Loop — Recognizing O(log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A loop that doubles or halves the variable each iteration is O(log n). Compare with O(n).
                </p>
                <JavaFileLoader
                  fileModule={logarithmicLoopJava}
                  title="LogarithmicLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tree Operations ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tree Operations — O(log n) in Balanced Trees
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that search in a balanced BST is O(log n) because the height is logarithmic.
                </p>
                <JavaFileLoader
                  fileModule={treeOperationsJava}
                  title="TreeOperations.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(log n) – Logarithmic Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(log n) is the sweet spot of algorithm efficiency. I emphasize that it's almost as good as O(1) " +
              "for practical input sizes. The key insight is the halving principle: any algorithm that consistently " +
              "reduces the problem size by a constant fraction will be logarithmic. This is why binary search, " +
              "balanced trees, and many divide-and-conquer algorithms are so powerful. Have students practice " +
              "identifying these patterns in code, and challenge them to distinguish O(log n) from O(n) and O(n log n). " +
              "Also, remind them that while O(log n) is fast, it requires the data to be structured (e.g., sorted)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 21 · O(log n) – Logarithmic Time · Built with ❤️ for the classroom</p>
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

export default Topic21;