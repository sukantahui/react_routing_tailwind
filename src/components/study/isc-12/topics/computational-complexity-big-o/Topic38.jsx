import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import euclideanRecursiveJava from "./topic38_files/EuclideanRecursive.java?raw";
import euclideanIterativeJava from "./topic38_files/EuclideanIterative.java?raw";
import euclideanAnalysisJava from "./topic38_files/EuclideanAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic38_files/topic38_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic38 = () => {
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
              Topic 38
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive GCD (Euclidean Algorithm)
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(log min(a,b))</span>{" "}
            complexity of the Euclidean algorithm — a classic example of logarithmic time with a fascinating
            mathematical proof.
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
                  <span className="text-indigo-500">●</span> What is the Euclidean Algorithm?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>Euclidean algorithm</strong> is one of the oldest known algorithms, dating back
                    to ancient Greece (circa 300 BC). It computes the <strong>Greatest Common Divisor (GCD)</strong>
                    of two integers by repeatedly applying the <strong>modulo operation</strong>:
                  </p>
                  <p className="font-mono text-center text-lg my-2">
                    gcd(a, b) = gcd(b, a % b), &nbsp; with gcd(a, 0) = a
                  </p>
                  <p>
                    The algorithm is remarkably efficient: the number of steps is <strong>O(log min(a,b))</strong>,
                    making it one of the earliest examples of a logarithmic algorithm. This efficiency is due to the
                    fact that the numbers <strong>decrease exponentially</strong> with each step.
                  </p>
                  <p>
                    Think of it like a game: you keep subtracting the smaller number from the larger one until
                    they are equal. But the modulo operation does this in one step, making it much faster.
                    For example, gcd(1071, 462) takes only 4 steps, even though the numbers are large.
                  </p>
                </div>
              </section>

              {/* ── How the Euclidean Algorithm Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How the Euclidean Algorithm Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If b = 0, then gcd(a, 0) = a. This stops the recursion.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Modulo Operation",
                      desc: "Compute r = a % b (the remainder when a is divided by b).",
                      icon: "🔢",
                    },
                    {
                      step: "3. Recursive Call",
                      desc: "Call gcd(b, r) — the numbers shrink rapidly.",
                      icon: "🔄",
                    },
                    {
                      step: "4. Return",
                      desc: "The result bubbles up from the base case.",
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
                      desc: "The number of steps is O(log min(a,b)) in the worst case (using Fibonacci numbers).",
                      example: "T(n) = T(a % b) + O(1) → O(log n)",
                    },
                    {
                      case: "Space Complexity",
                      desc: "Recursive version uses O(log min(a,b)) stack space; iterative uses O(1).",
                      example: "Recursive: O(log n), Iterative: O(1)",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Euclidean Steps
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Euclidean algorithm steps"
                  >
                    <defs>
                      <marker id="arrow38" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Computing gcd(1071, 462) — only 4 steps!
                    </text>

                    <rect x="50" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="130" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">gcd(1071, 462)</text>
                    <line x1="130" y1="70" x2="130" y2="85" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow38)" />

                    <rect x="50" y="90" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="130" y="112" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">gcd(462, 147)</text>
                    <line x1="130" y1="120" x2="130" y2="135" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow38)" />

                    <rect x="50" y="140" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="130" y="162" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">gcd(147, 21)</text>
                    <line x1="130" y1="170" x2="130" y2="185" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow38)" />

                    <rect x="50" y="190" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="130" y="212" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">gcd(21, 0) → 21</text>

                    <text x="400" y="110" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      1071 % 462 = 147
                    </text>
                    <text x="400" y="160" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      462 % 147 = 21
                    </text>
                    <text x="400" y="210" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      147 % 21 = 0 → base case
                    </text>

                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Only 4 steps for numbers in the thousands! O(log min(a,b)).
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The Euclidean algorithm reduces the numbers exponentially, leading to O(log n) steps.
                    In this example, 1071 and 462 (both ~10³) take only 4 steps.
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
                    T(a, b) = T(b, a % b) + O(1), &nbsp; T(a, 0) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (modulo operation) and reduces the numbers.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Worst-case occurs with consecutive Fibonacci numbers: Fₖ and Fₖ₊₁.
                    The number of steps is <strong>O(log min(a,b))</strong>.
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(log min(a,b))</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(log min(a,b))</span> (recursive),
                    <span className="font-mono"> O(1)</span> (iterative)
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Fractions Simplification:</span>{" "}
                      Simplifying fractions uses gcd: 24/36 = (24÷12)/(36÷12) = 2/3. The Euclidean algorithm finds 12 quickly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Cryptography:</span>{" "}
                      RSA key generation requires finding coprime numbers using gcd.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> and <strong>Tuhina</strong> are sharing 24 apples and 36 oranges.
                      To divide them equally among friends, they need the largest number of friends that can share both
                      equally — that's gcd(24, 36) = 12 friends.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Music Theory:</span>{" "}
                      Finding the greatest common divisor of two frequencies to determine consonance in music.
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
                      tip: "Use iterative version for large numbers",
                      desc: "Iterative uses O(1) space vs O(log n) for recursive.",
                    },
                    {
                      tip: "Worst-case is Fibonacci numbers",
                      desc: "Consecutive Fibonacci numbers maximize the number of steps.",
                    },
                    {
                      tip: "Use for modular inverse in cryptography",
                      desc: "Extended Euclidean algorithm computes modular inverses.",
                    },
                    {
                      tip: "Always handle negative numbers",
                      desc: "Take absolute values or use Math.abs(a) and Math.abs(b).",
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
                    <strong>Forgetting the base case:</strong> gcd(a, 0) = a is essential. Without it, the recursion
                    never terminates (division by zero).
                  </li>
                  <li>
                    <strong>Assuming gcd is always O(log n) without understanding the worst case:</strong> The worst-case
                    is Fibonacci numbers, but even then it's O(log n). It's always logarithmic.
                  </li>
                  <li>
                    <strong>Not handling negative numbers:</strong> gcd is defined for positive integers. Use absolute values.
                  </li>
                  <li>
                    <strong>Confusing modulo with remainder:</strong> In Java, % gives remainder, which can be negative
                    for negative numbers. Use Math.abs(a) and Math.abs(b) first.
                  </li>
                  <li>
                    <strong>Misapplying the recurrence:</strong> T(a,b) = T(b, a % b) + O(1). The first argument becomes
                    b, not a. Don't swap incorrectly.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once wrote gcd(a, b) = gcd(a % b, b), which is wrong. She learned
                      to always put b first.
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
                      <strong>Use absolute values</strong> for inputs to handle negative numbers correctly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative version</strong> for O(1) space in production code.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Understand the worst-case</strong> — Fibonacci numbers — to know the upper bound.
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
                    "✅ Can you write the recurrence for the Euclidean algorithm?",
                    "✅ Do you know the time complexity (O(log min(a,b))) and why?",
                    "✅ Do you know the space complexity of recursive vs iterative?",
                    "✅ Can you implement both recursive and iterative GCD?",
                    "✅ Do you understand the worst-case (Fibonacci numbers)?",
                    "✅ Can you handle negative numbers correctly?",
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
                    <strong>Observe carefully:</strong> For gcd(13, 8) — consecutive Fibonacci numbers — how many
                    steps? 5 steps. This is the worst case. For numbers of size 10⁶, the max steps is about 30.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use subtraction instead of modulo? The complexity
                    becomes O(n) instead of O(log n). That's why modulo is essential!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 1071 students and 462
                    classrooms. The Euclidean algorithm finds that they can be evenly divided into 21 groups —
                    that's 21 students per classroom. And it only took 4 steps!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Euclidean Algorithm ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive GCD — O(log min(a,b)) Time, O(log min(a,b)) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation of the Euclidean algorithm with recurrence T(a,b) = T(b, a%b) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={euclideanRecursiveJava}
                  title="EuclideanRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Iterative Euclidean Algorithm ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Iterative GCD — O(log min(a,b)) Time, O(1) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Iterative version of the Euclidean algorithm. Uses O(1) extra space.
                </p>
                <JavaFileLoader
                  fileModule={euclideanIterativeJava}
                  title="EuclideanIterative.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Euclidean Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Euclidean Analysis — Step Count and Worst Case
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of steps for different inputs and shows the worst-case with Fibonacci numbers.
                </p>
                <JavaFileLoader
                  fileModule={euclideanAnalysisJava}
                  title="EuclideanAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive GCD (Euclidean Algorithm) — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `The Euclidean algorithm is a beautiful example of a logarithmic algorithm with a simple proof. 
              I emphasize that the key insight is the modulo operation — it reduces the problem size rapidly. 
              The worst-case analysis using Fibonacci numbers is a classic result that shows why it's O(log n). 
              Students are often surprised that gcd(10⁹, 1) takes only 1 step, while gcd(10⁹, 10⁹-1) takes about 
              30 steps. This illustrates the logarithmic nature of the algorithm. Also, highlight that the 
              iterative version is preferable in practice due to O(1) space. The Euclidean algorithm is 
              foundational for many number-theoretic algorithms, including modular inverses and RSA.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 38 · Complexity of Recursive GCD (Euclidean Algorithm) · Built with ❤️ for the classroom</p>
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

export default Topic38;