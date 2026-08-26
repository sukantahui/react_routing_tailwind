import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import naivePowerJava from "./topic37_files/NaivePower.java?raw";
import fastPowerJava from "./topic37_files/FastPower.java?raw";
import powerComparisonJava from "./topic37_files/PowerComparison.java?raw";
import powerModuloJava from "./topic37_files/PowerModulo.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic37_files/topic37_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic37 = () => {
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
              Topic 37
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Power Function
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Comparing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">naive O(n)</span> and
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> fast O(log n)</span> power functions —
            understanding how exponentiation by squaring dramatically improves performance.
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
                  <span className="text-indigo-500">●</span> What is the Recursive Power Function?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>power function</strong> computes <strong>b<sup>e</sup></strong> (base raised to exponent).
                    There are two common recursive implementations:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Naive Power:</strong> Multiply the base e times: <strong>b × b × ... × b</strong>.
                      Recurrence: T(n) = T(n-1) + O(1) → <span className="font-semibold text-red-600 dark:text-red-400">O(n)</span>.
                    </li>
                    <li>
                      <strong>Fast Power (Exponentiation by Squaring):</strong> Reduce the exponent by half each step.
                      Recurrence: T(n) = T(n/2) + O(1) → <span className="font-semibold text-emerald-600 dark:text-emerald-400">O(log n)</span>.
                    </li>
                  </ul>
                  <p>
                    The fast power algorithm is <strong>exponentially faster</strong> for large exponents,
                    making it essential in cryptography, modular arithmetic, and scientific computing.
                  </p>
                  <p>
                    Think of it like calculating compound interest: instead of multiplying n times, you double
                    your money and halve the number of steps — that's the power of squaring!
                  </p>
                </div>
              </section>

              {/* ── How They Work ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How the Power Functions Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Naive Power (O(n))",
                      desc: "Multiply the base by itself n times using linear recursion.",
                      example: "pow(b, e) = b × pow(b, e-1), pow(b, 0) = 1",
                      icon: "🔄",
                    },
                    {
                      title: "Fast Power (O(log n))",
                      desc: "Square the base and halve the exponent using divide-and-conquer.",
                      example: "pow(b, e) = pow(b², e/2) if e even, else b × pow(b², (e-1)/2)",
                      icon: "⚡",
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
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
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
                      algorithm: "Naive Power",
                      time: "O(n) — linear",
                      space: "O(n) — recursion stack depth = n",
                      example: "b¹⁰⁰⁰⁰⁰ → 100,000 steps",
                    },
                    {
                      algorithm: "Fast Power",
                      time: "O(log n) — logarithmic",
                      space: "O(log n) — recursion stack depth = log₂(n)",
                      example: "b¹⁰⁰⁰⁰⁰ → ~17 steps",
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
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.algorithm}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Fast vs Naive
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Power function comparison"
                  >
                    <defs>
                      <marker id="arrow37" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Computing b^8 using different approaches
                    </text>

                    {/* Naive: 8 multiplications */}
                    <text x="180" y="50" textAnchor="middle" fontSize="11" fill="#6b7280">Naive: 8 steps</text>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <rect key={i} x={60 + i * 35} y="65" width="30" height="20" rx="3" fill="#f472b6" opacity={0.8 - i * 0.05} />
                    ))}
                    <text x="180" y="105" textAnchor="middle" fontSize="9" fill="#6b7280">b × b × b × b × b × b × b × b</text>

                    {/* Fast: 3 multiplications (b², b⁴, b⁸) */}
                    <text x="580" y="50" textAnchor="middle" fontSize="11" fill="#6b7280">Fast: 3 steps</text>
                    <rect x="530" y="65" width="100" height="20" rx="3" fill="#34d399" opacity="0.9" />
                    <text x="580" y="80" textAnchor="middle" fontSize="9" fill="white">b² = b×b</text>
                    <line x1="580" y1="85" x2="580" y2="100" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="530" y="105" width="100" height="20" rx="3" fill="#34d399" opacity="0.8" />
                    <text x="580" y="120" textAnchor="middle" fontSize="9" fill="white">b⁴ = b²×b²</text>
                    <line x1="580" y1="125" x2="580" y2="140" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="530" y="145" width="100" height="20" rx="3" fill="#34d399" opacity="0.7" />
                    <text x="580" y="160" textAnchor="middle" fontSize="9" fill="white">b⁸ = b⁴×b⁴</text>

                    <text x="400" y="205" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Fast power uses exponentiation by squaring: O(log n) vs O(n)
                    </text>

                    <text x="400" y="235" textAnchor="middle" fontSize="11" fill="#34d399" className="dark:fill-emerald-400">
                      ✓ For b^1000000: Naive = 1,000,000 steps, Fast = 20 steps!
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fast power reduces the exponent by half each step, leading to logarithmic complexity.
                    For large exponents, the difference is enormous.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-red-600 dark:text-red-400">Naive Power</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + O(1), &nbsp; T(0) = O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-red-600 dark:text-red-400">O(n)</span>
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Fast Power</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n/2) + O(1), &nbsp; T(0) = O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(log n)</span>
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  The fast power recurrence is identical to binary search — that's why it's so efficient!
                </p>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Cryptography:</span>{" "}
                      RSA encryption uses modular exponentiation with very large exponents (e.g., 2⁶⁵⁵³⁷).
                      Fast power (modular exponentiation) makes this feasible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Scientific Computing:</span>{" "}
                      Computing very large powers in physics simulations — fast power is essential.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Compound Interest:</span>{" "}
                      Calculating compound interest over many years: A = P(1+r)^n. Fast power computes this efficiently.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> needs to calculate 2¹⁰⁰ for a math competition. Using fast power,
                      he does it in ~7 multiplications instead of 100!
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
                      tip: "Always use fast power for large exponents",
                      desc: "Naive power is O(n) and becomes impractical for n > 10,000.",
                    },
                    {
                      tip: "Use modular exponentiation for cryptography",
                      desc: "Compute (b^e) % m using fast power with modulo at each step.",
                    },
                    {
                      tip: "Iterative fast power avoids stack space",
                      desc: "The iterative version is O(log n) time and O(1) space.",
                    },
                    {
                      tip: "Be careful with exponent 0",
                      desc: "b⁰ = 1 for any b ≠ 0. Handle this as a base case.",
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
                    <strong>Using naive power for large exponents:</strong> For e = 1,000,000, naive power takes
                    1,000,000 multiplications. Fast power takes only 20. Don't make this mistake!
                  </li>
                  <li>
                    <strong>Forgetting the base case for exponent 0:</strong> Any base to the power 0 is 1.
                    This is essential for termination.
                  </li>
                  <li>
                    <strong>Not handling negative exponents:</strong> For negative exponents, b⁻ⁿ = 1/bⁿ.
                    Handle this separately or throw an exception.
                  </li>
                  <li>
                    <strong>Integer overflow in multiplication:</strong> Power results can be enormous.
                    Use long or BigInteger for large bases/exponents.
                  </li>
                  <li>
                    <strong>Confusing fast power with naive power:</strong> Both are recursive, but fast power
                    reduces the exponent by half, not by 1.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once wrote a power function that reduced exponent by 1,
                      not by half, and got O(n) instead of O(log n). She learned to check the reduction factor.
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
                      <strong>Always use fast power</strong> for exponentiation — it's O(log n) and easy to implement.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use modular exponentiation</strong> for cryptographic applications to avoid huge numbers.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iteration for fast power</strong> to avoid recursion stack (O(1) space).
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
                    "✅ Can you write the recurrence for naive power (O(n))?",
                    "✅ Can you write the recurrence for fast power (O(log n))?",
                    "✅ Do you know why fast power is O(log n)?",
                    "✅ Can you implement both recursive and iterative fast power?",
                    "✅ Do you know the space complexity of both implementations?",
                    "✅ Can you handle edge cases (exponent 0, negative exponents)?",
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
                    <strong>Observe carefully:</strong> For b^16, how many multiplications does naive power need?
                    16. How many does fast power need? 4 (b², b⁴, b⁸, b¹⁶). That's the power of squaring!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the exponent is odd (e.g., 15)? Fast power handles
                    it by multiplying one extra b: b¹⁵ = b × (b²)⁷.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a computer science
                    lab with 2¹⁰⁰⁰⁰⁰ possible states. Using fast power, a student can compute this in ~17 steps
                    instead of 100,000 steps. That's the magic of logarithmic algorithms!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Naive Power ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Naive Power — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Simple recursive power with recurrence T(n) = T(n-1) + O(1) → O(n).
                </p>
                <JavaFileLoader
                  fileModule={naivePowerJava}
                  title="NaivePower.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Fast Power ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Fast Power — O(log n) Time, O(log n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Fast power using exponentiation by squaring. Recurrence T(n) = T(n/2) + O(1) → O(log n).
                </p>
                <JavaFileLoader
                  fileModule={fastPowerJava}
                  title="FastPower.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Power Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Power Comparison — Naive vs Fast vs Math.pow
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the runtime and steps of naive power vs fast power vs built-in Math.pow.
                </p>
                <JavaFileLoader
                  fileModule={powerComparisonJava}
                  title="PowerComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Power Modulo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Modular Exponentiation — (b^e) % m
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Fast power with modulo operations — essential for cryptography and large computations.
                </p>
                <JavaFileLoader
                  fileModule={powerModuloJava}
                  title="PowerModulo.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Power Function — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `The power function is a classic example of how a simple change in approach can dramatically improve 
              performance. Naive power is O(n) — it's straightforward but slow. Fast power (exponentiation by squaring) 
              is O(log n) — it's one of the most important algorithmic optimizations. I emphasize that this is the 
              same principle as binary search: reduce the problem size by half each step. The recurrence 
              T(n) = T(n/2) + O(1) appears everywhere in computer science. Also, highlight that fast power is 
              the foundation of modular exponentiation, which is used in RSA, Diffie-Hellman, and many cryptographic 
              protocols. This isn't just a theoretical exercise — it's a real-world algorithm used billions of times 
              every day.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 37 · Complexity of Recursive Power Function · Built with ❤️ for the classroom</p>
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

export default Topic37;