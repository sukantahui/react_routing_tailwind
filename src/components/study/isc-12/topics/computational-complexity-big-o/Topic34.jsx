import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveSumJava from "./topic34_files/RecursiveSum.java?raw";
import tailRecursiveSumJava from "./topic34_files/TailRecursiveSum.java?raw";
import sumComparisonJava from "./topic34_files/SumComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic34_files/topic34_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic34 = () => {
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
              Topic 34
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Sum of N Numbers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">linear recursion</span>{" "}
            pattern — understanding the time and space complexity of recursively summing numbers.
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
                  <span className="text-indigo-500">●</span> What is the Recursive Sum of N Numbers?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>recursive sum</strong> of n numbers is a classic example of <strong>linear recursion</strong>.
                    The function computes the sum of integers from 1 to n by calling itself with a smaller input
                    (n-1) and adding n to the result. This is a simple but important pattern for understanding
                    recursion complexity.
                  </p>
                  <p>
                    The algorithm is defined as:
                    <span className="block font-mono text-center text-lg my-2">
                      sum(n) = n + sum(n-1), with sum(0) = 0
                    </span>
                  </p>
                  <p>
                    While the <strong>iterative</strong> version of this problem is O(n) time and O(1) space,
                    the <strong>recursive</strong> version is O(n) time but O(n) space due to the call stack.
                    This makes it a perfect example to illustrate the <strong>trade-off</strong> between recursion
                    and iteration.
                  </p>
                  <p>
                    Think of it like a teacher collecting homework: <strong>Swadeep</strong> collects papers from
                    students one by one (iterative). <strong>Tuhina</strong> asks each student to collect from the
                    next student and bring them to her (recursive). Both collect all papers, but Tuhina's method
                    uses a stack of students (the call stack).
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Recursive Sum Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If n = 0, return 0. This is the stopping condition.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Recursive Case",
                      desc: "Return n + sum(n-1). This calls itself with a smaller input.",
                      icon: "🔄",
                    },
                    {
                      step: "3. Unwinding",
                      desc: "After reaching the base case, the recursion unwinds, adding n at each level.",
                      icon: "📤",
                    },
                    {
                      step: "4. Result",
                      desc: "The final result is the sum of all numbers from 1 to n.",
                      icon: "✅",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      case: "Time Complexity",
                      desc: "The function makes n recursive calls, each doing O(1) work.",
                      example: "T(n) = T(n-1) + O(1) → O(n)",
                    },
                    {
                      case: "Space Complexity",
                      desc: "The recursion stack depth is n, so O(n) space is used.",
                      example: "O(n) due to the call stack.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Recursion Chain
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Recursive sum chain"
                  >
                    <defs>
                      <marker id="arrow34" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Call chain */}
                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursive calls: Building the stack
                    </text>

                    <rect x="320" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sum(5)</text>
                    <line x1="400" y1="70" x2="400" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow34)" />

                    <rect x="320" y="95" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="117" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sum(4)</text>
                    <line x1="400" y1="125" x2="400" y2="145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow34)" />

                    <rect x="320" y="150" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="172" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sum(3)</text>
                    <line x1="400" y1="180" x2="400" y2="200" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow34)" />

                    <rect x="320" y="205" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="227" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sum(2)</text>
                    <line x1="400" y1="235" x2="400" y2="250" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow34)" />

                    <rect x="320" y="255" width="160" height="30" rx="6" fill="#a78bfa" opacity="0.5" />
                    <text x="400" y="277" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sum(1) → 1</text>

                    <text x="400" y="315" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Depth = n = 5 calls → O(n) space
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recursive sum creates a chain of n calls, each waiting for the result of the next.
                    This uses O(n) stack space.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = T(n-1) + O(1), &nbsp; T(0) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (addition) and makes one recursive call on n-1.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence: T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(0) + n = O(n)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(n)</span> (recursion stack)
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Counting Inventory:</span>{" "}
                      A warehouse manager counts items by adding the count from each aisle. If she uses a recursive
                      approach, each aisle is a recursive call — O(n) time and O(n) space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">School Attendance:</span>{" "}
                      A school in <strong>Barrackpore</strong> has n students. The principal collects attendance by
                      asking each class to sum their attendance and pass it up — recursive summing. O(n) time and
                      O(n) stack.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Abhronila</strong> is counting the number of books on a shelf. She counts the first
                      book and asks <strong>Susmita</strong> to count the rest recursively. This is O(n) time but
                      uses O(n) mental stack (remembering each count).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Bank Transaction:</span>{" "}
                      Summing daily transactions in a bank statement — recursive summing of n transactions.
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
                      tip: "Use iteration for large n",
                      desc: "Recursive sum uses O(n) stack space, which can cause stack overflow for large n.",
                    },
                    {
                      tip: "Consider tail recursion",
                      desc: "Tail-recursive sum can be optimized by the compiler to O(1) space.",
                    },
                    {
                      tip: "Always define the base case clearly",
                      desc: "The base case (sum(0) = 0) is essential for termination.",
                    },
                    {
                      tip: "Know the formula",
                      desc: "For summing 1 to n, the formula n(n+1)/2 is O(1) and should be used instead of recursion.",
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
                    <strong>Forgetting the base case:</strong> Without sum(0) = 0, the recursion never terminates,
                    causing a stack overflow.
                  </li>
                  <li>
                    <strong>Ignoring the stack space:</strong> Many beginners think recursive sum is O(1) space
                    because it's "just addition." In reality, it uses O(n) stack space.
                  </li>
                  <li>
                    <strong>Using recursion for large n:</strong> For n &gt; 10,000, recursion can cause stack overflow.
                    Use iteration or the formula.
                  </li>
                  <li>
                    <strong>Not optimizing with tail recursion:</strong> A non-tail-recursive sum cannot be optimized
                    by the compiler, leading to O(n) space.
                  </li>
                  <li>
                    <strong>Confusing the recurrence:</strong> T(n) = T(n-1) + O(1) solves to O(n), not O(n²).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once analyzed recursive sum as O(n²) because he thought each
                      addition was O(n). He learned to check the work per call.
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
                      <strong>Use iteration for large n</strong> — it's simpler and uses O(1) space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use the formula</strong> — n(n+1)/2 is O(1) and should be used for summing 1 to n.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use tail recursion when recursion is necessary</strong> to enable compiler optimization.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document the recurrence</strong> in comments to explain the complexity.
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
                    "✅ Can you write the recurrence for recursive sum?",
                    "✅ Do you know the time complexity (O(n)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you write both recursive and iterative implementations?",
                    "✅ Do you understand the trade-off between recursion and iteration?",
                    "✅ Can you identify the base case and recursive case?",
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
                    <strong>Observe carefully:</strong> How many recursive calls are made for sum(5)? What is the
                    depth of the recursion? That's n calls and depth = n.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you implement sum as a tail-recursive function with
                    an accumulator? The space complexity becomes O(1) with tail call optimization.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 5,000 students. A
                    recursive sum function would use 5,000 stack frames — which could cause a stack overflow.
                    An iterative loop would be safer.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Sum ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Sum — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive sum implementation with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveSumJava}
                  title="RecursiveSum.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tail Recursive Sum ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tail Recursive Sum — O(n) Time, O(1) Space (with TCO)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Tail-recursive version of sum that can be optimized by the compiler.
                </p>
                <JavaFileLoader
                  fileModule={tailRecursiveSumJava}
                  title="TailRecursiveSum.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Sum Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sum Comparison — Recursive vs Iterative vs Formula
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the performance and space usage of different sum implementations.
                </p>
                <JavaFileLoader
                  fileModule={sumComparisonJava}
                  title="SumComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Sum of N Numbers — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Recursive sum is the perfect introduction to analyzing recursive algorithms. It's simple enough 
              to understand, but it clearly illustrates the trade-off between recursion and iteration. 
              I emphasize that while both versions are O(n) time, the space complexity is different — 
              O(n) for recursion, O(1) for iteration. This is a common interview question and a great way 
              to test understanding of the call stack. Also, remind students that for this specific problem, 
              the formula n(n+1)/2 is O(1) and should be used in practice. But the recursive version is 
              valuable for learning the pattern that applies to many other algorithms.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 34 · Complexity of Recursive Sum of N Numbers · Built with ❤️ for the classroom</p>
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

export default Topic34;