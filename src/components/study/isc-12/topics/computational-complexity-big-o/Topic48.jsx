import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import factorialLinearJava from "./topic48_files/FactorialLinear.java?raw";
import sumLinearJava from "./topic48_files/SumLinear.java?raw";
import arraySumLinearJava from "./topic48_files/ArraySumLinear.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic48_files/topic48_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic48 = () => {
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
              Topic 48
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursion Patterns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Linear Recursion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">linear recursion</span> —
            the simplest recursive pattern where each call makes at most one recursive call, forming a chain of
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> O(n)</span> time and space.
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
                  <span className="text-indigo-500">●</span> What is Linear Recursion?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Linear recursion</strong> is the simplest form of recursion where a function makes
                    <strong>at most one recursive call</strong> per invocation. The recursive calls form a
                    <strong>linear chain</strong> — like a linked list — rather than a branching tree.
                  </p>
                  <p>
                    The recurrence for linear recursion is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n-1) + O(1), &nbsp; T(0) = O(1)
                    </span>
                    This gives <strong>O(n)</strong> time and <strong>O(n)</strong> space (due to the recursion stack).
                  </p>
                  <p>
                    Classic examples include <strong>factorial</strong>, <strong>sum of n numbers</strong>, and
                    <strong>array sum</strong>. These algorithms are simple, elegant, but use O(n) stack space
                    — a trade-off to be aware of.
                  </p>
                  <p>
                    Think of it like a chain of students passing a message: the first student tells the next,
                    who tells the next, and so on. Each student is a recursive call. The message travels in a
                    straight line — that's linear recursion.
                  </p>
                </div>
              </section>

              {/* ── Characteristics ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔗",
                      title: "Single Recursive Call",
                      desc: "Each function call makes exactly one recursive call (or zero in the base case).",
                    },
                    {
                      icon: "📏",
                      title: "Linear Chain",
                      desc: "The recursion forms a straight line, not a branching tree.",
                    },
                    {
                      icon: "⏱️",
                      title: "O(n) Time",
                      desc: "The number of recursive calls is proportional to the input size n.",
                    },
                    {
                      icon: "💾",
                      title: "O(n) Space",
                      desc: "The recursion stack depth is n, so space is O(n).",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Linear Recursion Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Examples
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Algorithm</th>
                        <th className="px-4 py-2 border-b">Recurrence</th>
                        <th className="px-4 py-2 border-b">Time</th>
                        <th className="px-4 py-2 border-b">Space</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Factorial", "T(n) = T(n-1) + O(1)", "O(n)", "O(n)"],
                        ["Sum of 1..n", "T(n) = T(n-1) + O(1)", "O(n)", "O(n)"],
                        ["Array Sum", "T(n) = T(n-1) + O(1)", "O(n)", "O(n)"],
                        ["String Length", "T(n) = T(n-1) + O(1)", "O(n)", "O(n)"],
                        ["Print 1..n", "T(n) = T(n-1) + O(1)", "O(n)", "O(n)"],
                        ["Count Digits", "T(n) = T(n/10) + O(1)", "O(log n)", "O(log n)"],
                      ].map(([algorithm, recurrence, time, space], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100">{algorithm}</td>
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{recurrence}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{time}</td>
                          <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: The Linear Chain
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 250"
                    className="w-full h-auto max-h-56"
                    role="img"
                    aria-label="Linear recursion chain"
                  >
                    <defs>
                      <marker id="arrow48" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Linear Recursion: A Chain of Calls (n=5)
                    </text>

                    {/* Call chain */}
                    <rect x="320" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">call(n)</text>
                    <line x1="400" y1="70" x2="400" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow48)" />

                    <rect x="320" y="95" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="117" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">call(n-1)</text>
                    <line x1="400" y1="125" x2="400" y2="145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow48)" />

                    <rect x="320" y="150" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="172" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">call(n-2)</text>
                    <line x1="400" y1="180" x2="400" y2="200" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow48)" />

                    <rect x="320" y="205" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="227" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">... base case</text>

                    <text x="400" y="260" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Depth = n calls → O(n) time and O(n) space
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Linear recursion creates a chain of n calls. The depth is n, so both time and space are O(n).
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
                    Each call does O(1) work and makes one recursive call on n-1.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving: T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(0) + n = O(n)
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Chain of Command:</span>{" "}
                      A message passes from CEO to VP to Director to Manager to Employee — each person tells the next.
                      That's linear recursion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Counting Steps:</span>{" "}
                      A child counting stairs by counting the first step and then asking someone else to count the rest.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is counting the number of books on a shelf. He counts the first book
                      and asks <strong>Tuhina</strong> to count the rest recursively. That's linear recursion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Recursive File Traversal:</span>{" "}
                      In a single-path directory (no branching), traversing files is linear recursion.
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
                      desc: "Linear recursion uses O(n) stack space, which can cause stack overflow for large n.",
                    },
                    {
                      tip: "Consider tail recursion",
                      desc: "Tail-recursive linear recursion can be optimized by the compiler to O(1) space.",
                    },
                    {
                      tip: "Always define the base case",
                      desc: "The base case (usually n=0 or n=1) is essential for termination.",
                    },
                    {
                      tip: "Understand the stack cost",
                      desc: "Each recursive call consumes stack memory. For n=10,000+, this can be significant.",
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
                    <strong>Forgetting the base case:</strong> Without a base case, the recursion never terminates,
                    causing a stack overflow.
                  </li>
                  <li>
                    <strong>Ignoring the stack space:</strong> Many beginners think linear recursion is O(1) space
                    because it's "just a chain." In reality, it uses O(n) stack space.
                  </li>
                  <li>
                    <strong>Using recursion for large n:</strong> For n &gt; 10,000, recursion can cause stack overflow.
                    Use iteration instead.
                  </li>
                  <li>
                    <strong>Confusing linear recursion with divide-and-conquer:</strong> Linear recursion has one call
                    per level; divide-and-conquer has multiple calls.
                  </li>
                  <li>
                    <strong>Not recognizing the O(n) time complexity:</strong> Linear recursion is O(n), not O(log n)
                    or O(1).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once analyzed factorial as O(1) because she forgot to count the
                      recursive calls. She learned to count the number of levels.
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
                      <strong>Use iteration for large n</strong> — it's O(n) time and O(1) space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use tail recursion when possible</strong> to enable compiler optimization.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always document the recurrence</strong> in comments to explain the complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test with small values</strong> to verify the recursion works correctly.
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
                    "✅ Can you identify linear recursion in code?",
                    "✅ Do you know the recurrence (T(n) = T(n-1) + O(1))?",
                    "✅ Do you know the time complexity (O(n)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement linear recursion correctly with a base case?",
                    "✅ Can you recognize when to use iteration instead?",
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
                    <strong>Observe carefully:</strong> How many recursive calls are made for factorial(5)? That's
                    n+1 calls (including the base case). That's O(n) time and O(n) space.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you implement factorial iteratively? The space
                    complexity becomes O(1). That's a big improvement for large n.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 10,000 students.
                    A linear recursion to count them would use 10,000 stack frames — which could cause a stack overflow.
                    An iterative loop would be safer.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Factorial Linear ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Factorial — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Classic linear recursion with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={factorialLinearJava}
                  title="FactorialLinear.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Sum Linear ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sum of 1..n — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Linear recursive sum with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={sumLinearJava}
                  title="SumLinear.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Array Sum Linear ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Array Sum — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Linear recursive array sum with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={arraySumLinearJava}
                  title="ArraySumLinear.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Linear Recursion — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Linear recursion is the foundation of understanding recursion. I emphasize that it's the simplest 
              form — one call per level, forming a chain. The recurrence T(n) = T(n-1) + O(1) is the most basic 
              recurrence, and it's essential to master before moving to more complex forms. Students often 
              forget the space complexity — they think it's O(1) because the code looks simple. I always 
              remind them that the call stack is not free. Also, I highlight the trade-off: recursion is 
              elegant and easy to write, but iteration is more memory-efficient. Use linear recursion for 
              small n or when readability is more important than memory efficiency.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 48 · Linear Recursion · Built with ❤️ for the classroom</p>
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

export default Topic48;