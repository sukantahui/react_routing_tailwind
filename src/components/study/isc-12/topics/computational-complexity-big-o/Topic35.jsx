import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursiveSumDigitsJava from "./topic35_files/RecursiveSumDigits.java?raw";
import sumDigitsCallTreeJava from "./topic35_files/SumDigitsCallTree.java?raw";
import sumDigitsComparisonJava from "./topic35_files/SumDigitsComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic35_files/topic35_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic35 = () => {
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
              Topic 35
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Sum of Digits
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">logarithmic</span>{" "}
            complexity of a classic digit-summing algorithm — understanding how division by 10 leads to O(log n) time.
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
                  <span className="text-indigo-500">●</span> What is the Recursive Sum of Digits?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>sum of digits</strong> of a number is a classic problem where the algorithm repeatedly
                    extracts the last digit using <strong>modulo 10</strong> and then divides the number by 10
                    to remove that digit. This is a perfect example of a <strong>logarithmic</strong> algorithm
                    because the number of digits is proportional to <strong>log₁₀(n)</strong>.
                  </p>
                  <p>
                    The algorithm is defined as:
                    <span className="block font-mono text-center text-lg my-2">
                      sumDigits(n) = (n % 10) + sumDigits(n/10), with sumDigits(0) = 0
                    </span>
                  </p>
                  <p>
                    This algorithm is <strong>O(log n)</strong> time and <strong>O(log n)</strong> space (due to
                    recursion stack). The number of digits in n is <strong>⌊log₁₀(n)⌋ + 1</strong>, so the
                    recursion depth is logarithmic.
                  </p>
                  <p>
                    Think of it like counting the number of pages in a book: you don't count each page; you count
                    the digits in the page number. For a book with 10,000 pages, you only need to process 5 digits.
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How Recursive Sum of Digits Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If n = 0, return 0. This stops the recursion.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Extract Last Digit",
                      desc: "Use n % 10 to get the last digit.",
                      icon: "🔢",
                    },
                    {
                      step: "3. Remove Last Digit",
                      desc: "Use n / 10 to remove the last digit.",
                      icon: "✂️",
                    },
                    {
                      step: "4. Recurse",
                      desc: "Return lastDigit + sumDigits(n/10).",
                      icon: "🔄",
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
                      desc: "The function makes one recursive call per digit. Number of digits = ⌊log₁₀(n)⌋ + 1.",
                      example: "T(n) = T(n/10) + O(1) → O(log n)",
                    },
                    {
                      case: "Space Complexity",
                      desc: "The recursion stack depth equals the number of digits = O(log n).",
                      example: "O(log n) due to the call stack.",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Digit Reduction
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Sum of digits recursion chain"
                  >
                    <defs>
                      <marker id="arrow35" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursive calls: n → n/10 → n/100 → ... → 0
                    </text>

                    <rect x="320" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sumDigits(5432)</text>
                    <text x="400" y="82" textAnchor="middle" fontSize="10" fill="#6b7280">last digit: 2</text>
                    <line x1="400" y1="85" x2="400" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow35)" />

                    <rect x="320" y="105" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="127" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sumDigits(543)</text>
                    <text x="400" y="147" textAnchor="middle" fontSize="10" fill="#6b7280">last digit: 3</text>
                    <line x1="400" y1="150" x2="400" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow35)" />

                    <rect x="320" y="170" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="192" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sumDigits(54)</text>
                    <text x="400" y="212" textAnchor="middle" fontSize="10" fill="#6b7280">last digit: 4</text>
                    <line x1="400" y1="215" x2="400" y2="230" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow35)" />

                    <rect x="320" y="235" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="257" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">sumDigits(5)</text>
                    <text x="400" y="277" textAnchor="middle" fontSize="10" fill="#6b7280">last digit: 5 → base case</text>

                    <text x="400" y="315" textAnchor="middle" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Depth = number of digits = ⌊log₁₀(5432)⌋ + 1 = 4 → O(log n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Each recursive call removes one digit. The depth is the number of digits, which is O(log₁₀(n)).
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
                    T(n) = T(n/10) + O(1), &nbsp; T(0) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (modulo and division) and reduces n by a factor of 10.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    The number of steps = number of digits = ⌊log₁₀(n)⌋ + 1
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence: T(n) = T(n/10) + 1 = T(n/100) + 2 = ... = log₁₀(n) + 1
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(log n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(log n)</span> (recursion stack)
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Check Digit Validation:</span>{" "}
                      Credit card numbers and ISBN use check digits. Summing digits is part of the validation process.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Digital Root:</span>{" "}
                      The digital root of a number is found by repeatedly summing digits. This has applications in
                      number theory and divisibility tests.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Checksums:</span>{" "}
                      Adding digits of a number is used in checksum algorithms to verify data integrity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Susmita</strong> is adding the digits of a large number in her math class. She processes
                      one digit at a time, which takes O(log n) steps for a number with n digits.
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
                      tip: "Use iteration for simple sum of digits",
                      desc: "An iterative version is O(log n) time and O(1) space — no recursion overhead.",
                    },
                    {
                      tip: "Consider the base case carefully",
                      desc: "For negative numbers, handle the sign before summing digits.",
                    },
                    {
                      tip: "Use for digital root problems",
                      desc: "The digital root can be found by repeated sum of digits until a single digit remains.",
                    },
                    {
                      tip: "Remember: log base doesn't matter",
                      desc: "log₁₀(n) and log₂(n) differ by a constant, so O(log n) is base-independent.",
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
                    <strong>Forgetting the base case for n=0:</strong> Without sumDigits(0) = 0, the recursion
                    never terminates.
                  </li>
                  <li>
                    <strong>Using the wrong base for log:</strong> Since we divide by 10, the base is 10, but O(log n)
                    is base-independent.
                  </li>
                  <li>
                    <strong>Not handling negative numbers:</strong> For negative numbers, use Math.abs(n) first,
                    or handle the sign separately.
                  </li>
                  <li>
                    <strong>Assuming O(log n) space is the same as O(log n) time:</strong> They are both logarithmic,
                    but they measure different things (time vs stack space).
                  </li>
                  <li>
                    <strong>Confusing number of digits with the value of n:</strong> A number with 6 digits has
                    value ≈ 10⁶, so the number of operations is 6, not 1,000,000.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once thought sumDigits(1,000,000) would take 1,000,000 operations,
                      but it only takes 7 (the number of digits). He learned to count digits, not value.
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
                      <strong>Handle negative numbers</strong> by using Math.abs(n) or taking the sign separately.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iteration</strong> for O(1) space when stack depth is a concern.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document the recurrence</strong> in comments to explain the logarithmic complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test with edge cases</strong>: 0, negative numbers, large numbers (10⁹).
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
                    "✅ Can you write the recurrence for sum of digits?",
                    "✅ Do you know the time complexity (O(log n)) and why?",
                    "✅ Do you know the space complexity (O(log n)) and why?",
                    "✅ Can you write both recursive and iterative implementations?",
                    "✅ Do you understand why it's O(log n) and not O(n)?",
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
                    <strong>Observe carefully:</strong> For n = 1,000,000, how many digits does it have? 7 digits.
                    So sumDigits will make 7 recursive calls. That's log₁₀(1,000,000) = 6 + 1 = 7.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the number is in base 2 (binary) instead of base 10?
                    The recurrence would be T(n) = T(n/2) + O(1), still O(log n) but with base 2.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a student ID system
                    with 8-digit IDs. Summing digits of an ID only takes 8 steps — very fast!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Sum of Digits ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Sum of Digits — O(log n) Time, O(log n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Standard recursive implementation with recurrence T(n) = T(n/10) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={recursiveSumDigitsJava}
                  title="RecursiveSumDigits.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Sum of Digits Call Tree ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sum of Digits Call Tree — Visualizing the Depth
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the recursion tree for sum of digits, displaying the depth and calls.
                </p>
                <JavaFileLoader
                  fileModule={sumDigitsCallTreeJava}
                  title="SumDigitsCallTree.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Sum of Digits Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sum of Digits Comparison — Recursive vs Iterative
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares recursive and iterative implementations of sum of digits.
                </p>
                <JavaFileLoader
                  fileModule={sumDigitsComparisonJava}
                  title="SumDigitsComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Sum of Digits — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Sum of digits is a beautiful example of O(log n) complexity. I emphasize that the key insight is 
              that we divide by 10 each step, not subtract by 1. This is what makes it logarithmic. 
              Students often confuse the value of n with the number of digits — a number like 1,000,000 has 
              only 7 digits, so it takes 7 steps, not 1,000,000 steps. This is a powerful lesson in understanding 
              the input size in algorithm analysis. Also, highlight that the iterative version is O(1) space, 
              which is better in practice. This algorithm appears in many real-world applications like checksum 
              validation and digital root calculations.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 35 · Complexity of Recursive Sum of Digits · Built with ❤️ for the classroom</p>
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

export default Topic35;