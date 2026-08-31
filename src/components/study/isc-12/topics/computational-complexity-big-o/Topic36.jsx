import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveFactorialJava from "./topic36_files/RecursiveFactorial.java?raw";
import factorialCallTreeJava from "./topic36_files/FactorialCallTree.java?raw";
import factorialComparisonJava from "./topic36_files/FactorialComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic36_files/topic36_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic36 = () => {
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
              Topic 36
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Factorial
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">linear recursion</span>{" "}
            of factorial — understanding why it's O(n) time and O(n) space, and the implications for large inputs.
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
                  <span className="text-indigo-500">●</span> What is Recursive Factorial?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>factorial</strong> of a non-negative integer n, denoted n!, is the product of all
                    positive integers less than or equal to n. The recursive definition is one of the classic
                    examples of <strong>linear recursion</strong>:
                  </p>
                  <p className="font-mono text-center text-lg my-2">
                    factorial(n) = n × factorial(n-1), with factorial(0) = 1
                  </p>
                  <p>
                    This algorithm is <strong>O(n)</strong> time and <strong>O(n)</strong> space due to the
                    recursion stack. While simple, it's a perfect example to illustrate the trade-offs between
                    recursion and iteration, and the importance of understanding the call stack.
                  </p>
                  <p>
                    Think of it like a relay race: each runner (recursive call) passes the baton (the product) to
                    the next runner, who runs a shorter distance. But to know the total time, you must wait for
                    all runners to finish. The stack holds all the waiting runners.
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Recursive Factorial Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If n = 0 or n = 1, return 1. This stops the recursion.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Recursive Case",
                      desc: "Return n × factorial(n-1). This calls itself with a smaller input.",
                      icon: "🔄",
                    },
                    {
                      step: "3. Unwinding",
                      desc: "After reaching the base case, the recursion unwinds, multiplying n at each level.",
                      icon: "📤",
                    },
                    {
                      step: "4. Result",
                      desc: "The final result is the product of all numbers from 1 to n.",
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
                      desc: "The function makes n recursive calls, each doing O(1) work (multiplication).",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Factorial Recursion Chain
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 320"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Factorial recursion chain"
                  >
                    <defs>
                      <marker id="arrow36" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursive calls: Building the stack (depth = n)
                    </text>

                    <rect x="320" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">fact(5)</text>
                    <text x="400" y="82" textAnchor="middle" fontSize="10" fill="#6b7280">5 × fact(4)</text>
                    <line x1="400" y1="85" x2="400" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow36)" />

                    <rect x="320" y="105" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="127" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">fact(4)</text>
                    <text x="400" y="147" textAnchor="middle" fontSize="10" fill="#6b7280">4 × fact(3)</text>
                    <line x1="400" y1="150" x2="400" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow36)" />

                    <rect x="320" y="170" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="192" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">fact(3)</text>
                    <text x="400" y="212" textAnchor="middle" fontSize="10" fill="#6b7280">3 × fact(2)</text>
                    <line x1="400" y1="215" x2="400" y2="230" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow36)" />

                    <rect x="320" y="235" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="257" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">fact(2)</text>
                    <text x="400" y="277" textAnchor="middle" fontSize="10" fill="#6b7280">2 × fact(1) → 1</text>

                    <text x="400" y="315" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Depth = n = 5 calls → O(n) space
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recursive factorial creates a chain of n calls, each waiting for the result of the next.
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
                    Each step does O(1) work (multiplication) and makes one recursive call on n-1.
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Combinatorics:</span>{" "}
                      Factorials are used in permutations and combinations — e.g., the number of ways to arrange
                      n items is n!.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Probability:</span>{" "}
                      Factorials appear in probability calculations, like the number of ways to shuffle a deck of cards.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is calculating the number of ways to arrange 5 books on a shelf.
                      He uses 5! = 120 — but his recursive function will make 5 calls, using O(5) stack space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Mathematics:</span>{" "}
                      Factorials are used in series expansions (Taylor series) and binomial coefficients.
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
                      desc: "Recursive factorial uses O(n) stack space, which can cause stack overflow for large n.",
                    },
                    {
                      tip: "Be careful with integer overflow",
                      desc: "Factorial grows very fast; 20! already exceeds 2³², and 21! exceeds 2⁶³.",
                    },
                    {
                      tip: "Use BigInteger for large factorials",
                      desc: "In Java, use BigInteger to handle arbitrarily large factorial values.",
                    },
                    {
                      tip: "Tail recursion doesn't help for factorial",
                      desc: "Even with tail recursion, factorial is not tail-recursive in the standard form because the multiplication happens after the recursive call.",
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
                    <strong>Forgetting the base case:</strong> Without factorial(0) = 1 or factorial(1) = 1, the
                    recursion never terminates.
                  </li>
                  <li>
                    <strong>Ignoring the stack space:</strong> Many beginners think factorial is O(1) space because
                    it's "just multiplication." In reality, it uses O(n) stack space.
                  </li>
                  <li>
                    <strong>Using recursion for large n:</strong> For n &gt; 10,000, recursion can cause stack overflow.
                    Use iteration or the formula (though there's no closed form for factorial).
                  </li>
                  <li>
                    <strong>Not handling negative numbers:</strong> Factorial is not defined for negative integers.
                    Throw an exception or handle it gracefully.
                  </li>
                  <li>
                    <strong>Confusing the recurrence:</strong> T(n) = T(n-1) + O(1) solves to O(n), not O(n²).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once analyzed factorial as O(n²) because she thought each
                      multiplication was O(n). She learned to check the work per call.
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
                      <strong>Use BigInteger</strong> for large factorial values to avoid overflow.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Handle edge cases</strong>: n = 0, n = 1, negative numbers.
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
                    "✅ Can you write the recurrence for recursive factorial?",
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
                    <strong>Observe carefully:</strong> How many recursive calls are made for factorial(5)? What is the
                    depth of the recursion? That's n calls and depth = n.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you implement factorial as a tail-recursive function with
                    an accumulator? It becomes tail-recursive and can be optimized to O(1) space in languages with TCO.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 5,000 students. A
                    recursive factorial function would use 5,000 stack frames — which could cause a stack overflow.
                    An iterative loop would be safer.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Factorial ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Factorial — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive factorial implementation with recurrence T(n) = T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveFactorialJava}
                  title="RecursiveFactorial.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Factorial Call Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Factorial Call Tree — Visualizing the Depth
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the recursion tree for factorial, displaying the depth and calls.
                </p>
                <JavaFileLoader
                  fileModule={factorialCallTreeJava}
                  title="FactorialCallTree.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Factorial Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Factorial Comparison — Recursive vs Iterative vs BigInteger
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares recursive and iterative implementations of factorial, and handles large values with BigInteger.
                </p>
                <JavaFileLoader
                  fileModule={factorialComparisonJava}
                  title="FactorialComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Factorial — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Recursive factorial is the classic introduction to recursion complexity. I emphasize that it's a 
              linear recursion — one call per level. The key is to understand the space complexity: O(n) due 
              to the stack, not O(1). Students often forget that each recursive call consumes memory. 
              Also, factorial grows incredibly fast — 20! already overflows a 64-bit integer. This is a 
              great opportunity to discuss integer overflow and BigInteger. Finally, I highlight that 
              while recursion is elegant, iteration is usually better in practice due to O(1) space. But the recursive pattern is essential for understanding more complex recursive algorithms.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 36 · Complexity of Recursive Factorial · Built with ❤️ for the classroom</p>
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

export default Topic36;