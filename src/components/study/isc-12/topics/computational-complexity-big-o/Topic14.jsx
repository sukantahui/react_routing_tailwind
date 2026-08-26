import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import nestedLoopDemoJava from "./topic14_files/NestedLoopDemo.java?raw";
import triangularLoopJava from "./topic14_files/TriangularLoop.java?raw";
import independentInnerLoopJava from "./topic14_files/IndependentInnerLoop.java?raw";
import breakingNestedLoopsJava from "./topic14_files/BreakingNestedLoops.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic14_files/topic14_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic14 = () => {
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
              Topic 14
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Loop Complexity
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Nested Loops
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the time complexity of <span className="text-indigo-600 dark:text-indigo-400 font-semibold">nested loops</span> —
            where loops are placed inside other loops, often leading to quadratic or higher complexities.
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
                  <span className="text-indigo-500">●</span> What Are Nested Loops?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Nested loops</strong> are loops inside other loops. The inner loop executes completely
                    for each iteration of the outer loop. The time complexity is the <strong>product</strong> of the
                    number of iterations of each loop (if they are independent) or the sum of a series (if the inner
                    loop depends on the outer loop's variable).
                  </p>
                  <p>
                    Nested loops are common in algorithms that process 2D data (matrices, grids), compare pairs of
                    elements, or solve problems with combinatorial nature. The classic example is comparing all pairs
                    of elements in an array: O(n²).
                  </p>
                  <p>
                    Think of it like a teacher: if there are <strong>n</strong> students and each student has
                    <strong>m</strong> assignments, checking all assignments across all students is O(n·m). If each
                    student has <strong>n</strong> assignments (same size), it's O(n²) — that's a lot of work!
                  </p>
                </div>
              </section>

              {/* ── Common Patterns ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Nested Loop Patterns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      pattern: "Quadratic (O(n²))",
                      desc: "Both loops run n times independently.",
                      example: "for (i=0; i<n; i++) for (j=0; j<n; j++) { ... }",
                    },
                    {
                      pattern: "Triangular (O(n²))",
                      desc: "Inner loop runs from i to n or j depends on i.",
                      example: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... }",
                    },
                    {
                      pattern: "O(n·m) (rectangular)",
                      desc: "Outer runs n times, inner m times (different inputs).",
                      example: "for (i=0; i<n; i++) for (j=0; j<m; j++) { ... }",
                    },
                    {
                      pattern: "O(n·log n)",
                      desc: "Outer loop O(n), inner loop O(log n).",
                      example: "for (i=0; i<n; i++) for (j=1; j<n; j*=2) { ... }",
                    },
                    {
                      pattern: "O(n²·log n)",
                      desc: "Outer two loops O(n²), inner O(log n).",
                      example: "for (i) for (j) for (k=1; k<n; k*=2)",
                    },
                    {
                      pattern: "Logarithmic outer, linear inner",
                      desc: "O(n log n) — outer O(log n), inner O(n).",
                      example: "for (i=1; i<n; i*=2) for (j=0; j<n; j++) { ... }",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.pattern}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Matrix of Iterations
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Nested loop iterations visualization"
                  >
                    {/* Grid representing iterations */}
                    <g>
                      {Array.from({ length: 6 }, (_, i) => (
                        <rect
                          key={`row-${i}`}
                          x={60 + i * 30}
                          y={60 + i * 30}
                          width={30}
                          height={30}
                          fill="#818cf8"
                          opacity={0.5}
                          stroke="#6b7280"
                          strokeWidth="1"
                        />
                      ))}
                      {Array.from({ length: 6 }, (_, i) =>
                        Array.from({ length: 6 - i }, (_, j) => (
                          <rect
                            key={`cell-${i}-${j}`}
                            x={60 + (i + j) * 30}
                            y={60 + j * 30}
                            width={30}
                            height={30}
                            fill="#f472b6"
                            opacity={0.3}
                            stroke="#6b7280"
                            strokeWidth="1"
                          />
                        ))
                      )}
                    </g>

                    <text x="400" y="50" textAnchor="middle" fontSize="13" fill="#374151" className="dark:fill-gray-300">
                      Each cell represents an iteration of the inner loop. Total cells = n² (or n·m for rectangles).
                    </text>
                    <text x="400" y="280" textAnchor="middle" fontSize="13" fill="#374151" className="dark:fill-gray-300">
                      For n=6, total = 36 iterations for O(n²); triangular = 21 iterations.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Nested loops multiply the number of iterations. The total is the product (or sum) of the loops' iteration counts.
                    This is why O(n²) grows so quickly.
                  </p>
                </div>
              </section>

              {/* ── How to Analyze Nested Loops ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How to Analyze Nested Loops
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Identify the loop structure</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How many loops? Are they independent or dependent?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Count the total number of inner iterations</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multiply if independent; sum series if dependent.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Apply Big-O simplification</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drop constants and lower-order terms.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Consider early breaks</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">If inner loops can break early, analyze worst-case still.</p>
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
                      tip: "Look for independent vs dependent loops",
                      desc: "Independent → multiply; dependent → sum series (like triangular).",
                    },
                    {
                      tip: "Check if inner loop runs a constant number of times",
                      desc: "If inner loop runs m times where m is constant, it's O(n) overall.",
                    },
                    {
                      tip: "Consider loop variables' ranges",
                      desc: "If inner loop uses j from 0 to i, total iterations = n(n+1)/2 = O(n²).",
                    },
                    {
                      tip: "Be aware of break statements",
                      desc: "Worst-case still O(n²) even if break can happen early in some cases.",
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
                    <strong>Assuming all nested loops are O(n²):</strong> If inner loop runs m times independent of n,
                    it's O(n·m). If outer loop is O(log n) and inner is O(n), total O(n log n).
                  </li>
                  <li>
                    <strong>Forgetting to count the inner loop's iterations correctly:</strong> In triangular loops,
                    the inner loop runs n-i times, total n(n+1)/2, which is still O(n²).
                  </li>
                  <li>
                    <strong>Misapplying multiplication when loops are dependent:</strong> If j runs from i to n,
                    you cannot simply multiply; you must sum the series.
                  </li>
                  <li>
                    <strong>Overlooking constant inner loops:</strong> If inner loop runs exactly 10 times, the total
                    is O(10n) = O(n), not O(n²).
                  </li>
                  <li>
                    <strong>Ignoring the work inside the inner loop:</strong> If the inner loop body is O(n) itself,
                    then even a single loop becomes O(n²) — a nested loop in disguise.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once analyzed a nested loop as O(n²) but the inner loop was actually
                      doing an O(n) operation, making it O(n³). She learned to check the body's complexity.
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
                      <strong>Write nested loops only when necessary</strong> — they quickly become expensive.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use a single loop when possible</strong> by restructuring the algorithm (e.g., using hash maps).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider breaking early if possible</strong> to improve best-case, but analyze worst-case.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use meaningful variable names</strong> like i, j, k to indicate the nesting level.
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
                    "✅ Can you count the total iterations of nested loops?",
                    "✅ Can you differentiate between independent and dependent nested loops?",
                    "✅ Do you know when to multiply vs sum the series?",
                    "✅ Can you recognize O(n²), O(n³), O(n·m) patterns?",
                    "✅ Can you identify nested loops that are actually O(n) (constant inner loop)?",
                    "✅ Have you practiced analyzing nested loops with different inner loop ranges?",
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
                    <strong>Observe carefully:</strong> For two nested loops both running n times, how many total
                    iterations? What if the inner loop runs from i to n? Is it still n²? (Yes, though slightly less.)
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If the outer loop runs n times and inner loop runs m times,
                    what's the complexity? What if m is much smaller than n?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has n students and n subjects.
                    If a teacher checks every student's performance in every subject, that's O(n²) work.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Nested Loop Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Nested Loop Demo — O(n²) and O(n·m)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows standard nested loops with independent and dependent ranges.
                </p>
                <JavaFileLoader
                  fileModule={nestedLoopDemoJava}
                  title="NestedLoopDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Triangular Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Triangular Loop — O(n²) with Inner Loop Dependent on Outer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates loops where the inner loop runs from i to n, resulting in n(n+1)/2 iterations.
                </p>
                <JavaFileLoader
                  fileModule={triangularLoopJava}
                  title="TriangularLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Independent Inner Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Independent Inner Loop — O(n·m) and O(n) with Constant Inner
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows when the inner loop is independent of the outer (different variable) and when it's constant.
                </p>
                <JavaFileLoader
                  fileModule={independentInnerLoopJava}
                  title="IndependentInnerLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Breaking Nested Loops ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Breaking Nested Loops — Worst-Case Still O(n²)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows that early breaks don't change worst-case complexity; they only help best/average cases.
                </p>
                <JavaFileLoader
                  fileModule={breakingNestedLoopsJava}
                  title="BreakingNestedLoops.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Nested Loops — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Nested loops are where complexity analysis gets more interesting. I emphasize the distinction between " +
              "multiplication (when loops are independent) and summation (when inner loop depends on outer). " +
              "The classic example is comparing all pairs: O(n²). Students often struggle to see why a triangular loop " +
              "is still O(n²) — I remind them that n(n+1)/2 simplifies to O(n²). Also, stress that the work inside " +
              "the inner loop matters: if that work is O(n), then even a single loop becomes O(n²). Finally, " +
              "encourage students to look for opportunities to reduce nested loops using data structures like hash maps."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 14 · Complexity of Nested Loops · Built with ❤️ for the classroom</p>
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

export default Topic14;