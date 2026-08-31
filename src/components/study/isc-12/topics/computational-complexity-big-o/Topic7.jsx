import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import binarySearchDemoJava from "./topic7_files/BinarySearchDemo.java?raw";
import treeHeightDemoJava from "./topic7_files/TreeHeightDemo.java?raw";
import halvingLoopDemoJava from "./topic7_files/HalvingLoopDemo.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic7_files/topic7_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic7 = () => {
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
              Topic 7
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Foundations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Why O(log n) Appears in Computer Science
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">logarithmic</span>{" "}
            complexity — why it's so common, how it arises, and why it's so efficient.
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
                  <span className="text-indigo-500">●</span> The Ubiquity of O(log n)
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(log n)</strong> is one of the most desirable complexity classes. It appears whenever
                    an algorithm <strong>reduces the problem size by a constant factor</strong> at each step —
                    typically by halving it. This "divide and conquer" pattern is pervasive in computer science.
                  </p>
                  <p>
                    The reason is simple: <strong>log₂(n)</strong> is the number of times you can divide n by 2
                    until you reach 1. Algorithms that repeatedly halve the input (binary search, balanced tree
                    operations, heap operations, etc.) naturally achieve logarithmic complexity.
                  </p>
                  <p>
                    Think of it like searching for a word in a dictionary: you don't read every page; you open the
                    middle, decide which half contains the word, and repeat. With a million entries, you need only
                    about 20 comparisons. That's O(log n) — and that's why it's so powerful.
                  </p>
                </div>
              </section>

              {/* ── Key Patterns ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Patterns That Produce O(log n)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔍",
                      title: "Binary Search",
                      desc: "Repeatedly halve the search space in a sorted array.",
                    },
                    {
                      icon: "🌳",
                      title: "Balanced Trees (BST, AVL, Red-Black)",
                      desc: "Height is O(log n), so search/insert/delete take O(log n).",
                    },
                    {
                      icon: "⛏️",
                      title: "Heap Operations",
                      desc: "Insert/delete in a binary heap take O(log n) due to tree height.",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Exponentiation",
                      desc: "Compute a^n in O(log n) by squaring the base.",
                    },
                    {
                      icon: "🔢",
                      title: "Euclidean Algorithm (GCD)",
                      desc: "The number of steps is O(log min(a,b)).",
                    },
                    {
                      icon: "📊",
                      title: "Divide and Conquer Recursion",
                      desc: "Recurrences like T(n) = T(n/2) + O(1) yield O(log n).",
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition: Halving Process ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Halving Steps
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Halving process visualization"
                  >
                    {/* Initially n */}
                    <rect x="50" y="120" width="700" height="40" rx="8" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="147" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">n = 1,000,000</text>

                    {/* After 1 halving */}
                    <rect x="150" y="170" width="500" height="40" rx="8" fill="#34d399" opacity="0.8" />
                    <text x="400" y="197" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">500,000</text>

                    {/* After 2 halvings */}
                    <rect x="225" y="210" width="350" height="40" rx="8" fill="#f472b6" opacity="0.8" />
                    <text x="400" y="237" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">250,000</text>

                    {/* After 3 halvings */}
                    <rect x="288" y="245" width="225" height="40" rx="8" fill="#fbbf24" opacity="0.8" />
                    <text x="400" y="272" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">~125,000</text>

                    {/* Arrow indicating reduction */}
                    <path d="M400 120 L400 170" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow7)" />
                    <defs>
                      <marker id="arrow7" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="430" y="150" fontSize="12" fill="#6b7280">÷2</text>
                    <text x="430" y="190" fontSize="12" fill="#6b7280">÷2</text>
                    <text x="430" y="225" fontSize="12" fill="#6b7280">÷2</text>

                    <text x="400" y="80" textAnchor="middle" fontSize="14" fill="#374151" className="dark:fill-gray-300">
                      After k halvings: n/2^k. We stop when n/2^k = 1 → k = log₂(n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Each halving step reduces the problem size by half. The number of steps needed to reach 1 is log₂(n).
                    This is why O(log n) algorithms are so efficient — they work in just a few steps even for enormous inputs.
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
                        <th className="px-4 py-2 border-b">n</th>
                        <th className="px-4 py-2 border-b">log₂(n)</th>
                        <th className="px-4 py-2 border-b">Comparison to n</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [10, 3.3, "~3"],
                        [100, 6.6, "~7"],
                        [1_000, 10, "10"],
                        [10_000, 13.3, "~13"],
                        [100_000, 16.6, "~17"],
                        [1_000_000, 20, "20"],
                        [10_000_000, 23.3, "~23"],
                        [1_000_000_000, 30, "30"],
                      ].map(([n, logVal, steps]) => (
                        <tr key={n} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono">{n.toLocaleString()}</td>
                          <td className="px-4 py-2 font-mono">{logVal.toFixed(1)}</td>
                          <td className="px-4 py-2 font-mono">{steps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Even for 1 billion elements, O(log n) requires only about 30 steps — compared to 1 billion for O(n).
                  This is why logarithmic algorithms are essential for handling large-scale data.
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
                      desc: "If you see the input being divided by 2 each time, expect O(log n).",
                    },
                    {
                      tip: "Balanced trees give O(log n)",
                      desc: "Always prefer balanced BSTs (AVL, Red-Black) over unbalanced ones.",
                    },
                    {
                      tip: "Logarithmic is nearly constant for practical n",
                      desc: "For n up to 10⁹, log₂(n) ≤ 30 — great for performance.",
                    },
                    {
                      tip: "Use iterative over recursive when possible",
                      desc: "Recursion for O(log n) uses O(log n) stack space; iterative uses O(1).",
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
                    <strong>Confusing O(log n) with O(n log n):</strong> O(log n) is much faster than O(n log n).
                    Be careful when analyzing nested loops.
                  </li>
                  <li>
                    <strong>Assuming all divide-and-conquer is O(log n):</strong> It depends on the work done at each step.
                    If you do O(n) work at each level, you get O(n log n), not O(log n).
                  </li>
                  <li>
                    <strong>Forgetting that logarithmic base is irrelevant in Big-O:</strong> O(log₂ n) = O(log₁₀ n) = O(log n).
                  </li>
                  <li>
                    <strong>Misidentifying the input size:</strong> In a tree, n is the number of nodes; height is O(log n) for balanced trees.
                  </li>
                  <li>
                    <strong>Not recognizing O(log n) in code:</strong> A loop where the variable doubles or halves is O(log n).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> once analyzed a while loop that doubled i each iteration as O(n), but
                      it's actually O(log n). She learned to check the loop variable's growth pattern.
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
                      <strong>Identify halving patterns</strong> in your code and exploit them for efficiency.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use balanced data structures</strong> (like TreeMap, TreeSet) for O(log n) operations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Prefer binary search</strong> over linear search on sorted data.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know the recurrence</strong> for divide-and-conquer: T(n) = T(n/2) + O(1) → O(log n).
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
                    "✅ Can you identify patterns that lead to O(log n)?",
                    "✅ Do you understand why binary search is O(log n)?",
                    "✅ Can you explain why balanced trees have O(log n) height?",
                    "✅ Can you recognize O(log n) loops (halving/doubling)?",
                    "✅ Do you know the difference between O(log n) and O(n log n)?",
                    "✅ Can you compute log₂(n) for typical input sizes?",
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
                    <strong>Observe carefully:</strong> How many comparisons does binary search need for a sorted array of
                    1,048,576 elements? (That's 2²⁰, so 20 comparisons.)
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have a loop where i starts at n and halves each time,
                    how many iterations? Write it and trace for n=64.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 32,768 students.
                    If you use a balanced tree to store their names, what is the maximum number of steps to find a student?
                    That's log₂(32,768) = 15.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Binary Search Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search — Classic O(log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Binary search on a sorted array repeatedly halves the search space, achieving O(log n) time.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchDemoJava}
                  title="BinarySearchDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tree Height Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tree Height — O(log n) for Balanced Trees
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that a balanced binary tree with n nodes has height O(log n).
                </p>
                <JavaFileLoader
                  fileModule={treeHeightDemoJava}
                  title="TreeHeightDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Halving Loop Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Halving Loop — Recognizing O(log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A loop that halves or doubles the variable is O(log n). This example compares it with O(n).
                </p>
                <JavaFileLoader
                  fileModule={halvingLoopDemoJava}
                  title="HalvingLoopDemo.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Why O(log n) Appears in Computer Science — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(log n) is the sweet spot of algorithm efficiency. I like to emphasize that it's almost as good as O(1) " +
              "for practical input sizes. The key insight is the halving principle: any algorithm that consistently " +
              "reduces the problem size by a constant fraction will be logarithmic. This is why binary search, " +
              "balanced trees, and many divide-and-conquer algorithms are so powerful. Have students practice " +
              "identifying these patterns in code, and challenge them to distinguish O(log n) from O(n) and O(n log n)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 7 · Why O(log n) Appears in Computer Science · Built with ❤️ for the classroom</p>
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

export default Topic7;