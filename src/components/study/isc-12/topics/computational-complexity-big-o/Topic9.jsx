import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import bigODemoJava from "./topic9_files/BigODemo.java?raw";
import complexityComparisonJava from "./topic9_files/ComplexityComparison.java?raw";
import constantFactorsJava from "./topic9_files/ConstantFactors.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic9_files/topic9_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic9 = () => {
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
              Topic 9
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Notations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Big-O Notation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">upper bound</span> of algorithm
            performance — the most widely used notation for describing worst-case complexity.
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
                  <span className="text-indigo-500">●</span> What is Big-O Notation?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Big-O notation</strong> (O-notation) is a mathematical notation that describes the
                    <strong>upper bound</strong> of an algorithm's growth rate. It gives the worst-case (or maximum)
                    time or space complexity, ignoring constants and lower-order terms, as the input size
                    <strong>n</strong> approaches infinity.
                  </p>
                  <p>
                    Formally, we say <strong>f(n) = O(g(n))</strong> if there exist positive constants
                    <strong>c</strong> and <strong>n₀</strong> such that <strong>0 ≤ f(n) ≤ c·g(n)</strong> for
                    all <strong>n ≥ n₀</strong>. In simpler terms: for sufficiently large inputs,
                    <strong>g(n)</strong> is an upper bound on the growth of <strong>f(n)</strong>.
                  </p>
                  <p>
                    Big-O is the most commonly used notation in industry and interviews because it provides a
                    guarantee about the algorithm's behavior in the worst case. It answers the question:
                    <em>"How slow can this algorithm be, at worst, as input grows?"</em>
                  </p>
                </div>
              </section>

              {/* ── Definition and Key Points ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Definition & Key Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "⬆️",
                      title: "Upper Bound (Worst-Case)",
                      desc: "Guarantees the algorithm won't exceed this growth rate, regardless of input.",
                    },
                    {
                      icon: "📐",
                      title: "Asymptotic Analysis",
                      desc: "Focuses on performance as n → ∞, ignoring small input behavior.",
                    },
                    {
                      icon: "🔢",
                      title: "Constants are Dropped",
                      desc: "O(2n) = O(n), O(100 log n) = O(log n) — constants don't matter.",
                    },
                    {
                      icon: "📉",
                      title: "Lower-Order Terms Ignored",
                      desc: "O(n² + n) = O(n²) — only the dominant term matters.",
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
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition: Big-O Bounds ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Big-O visualization"
                  >
                    <defs>
                      <marker id="arrow9" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold">O(1)</text>

                    {/* O(log n) */}
                    <path d="M60 340 L200 260 L340 200 L480 160 L620 130 L760 110" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="112" fontSize="12" fill="#34d399" fontWeight="bold">O(log n)</text>

                    {/* O(n) */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="82" fontSize="12" fill="#f472b6" fontWeight="bold">O(n)</text>

                    {/* O(n log n) */}
                    <path d="M60 340 C200 280 340 200 480 140 C560 110 640 90 760 60" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
                    <text x="770" y="62" fontSize="12" fill="#a78bfa" fontWeight="bold">O(n log n)</text>

                    {/* O(n²) */}
                    <path d="M60 348 Q100 340 200 290 Q300 200 400 140 Q500 90 600 60 Q700 50 760 48" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="50" fontSize="12" fill="#fbbf24" fontWeight="bold">O(n²)</text>

                    {/* Animated vertical line scanning */}
                    <line x1="200" y1="350" x2="200" y2="260" stroke="#34d399" strokeWidth="2" opacity="0.5">
                      <animate attributeName="x1" values="200;600;200" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="x2" values="200;600;200" dur="5s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Big-O gives the upper bound. For each complexity class, the curve shows the maximum number of
                    operations as n grows. Lower curves represent more efficient algorithms.
                  </p>
                </div>
              </section>

              {/* ── Common Big-O Classes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Big-O Classes
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Notation</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Example Algorithms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["O(1)", "Constant", "Array access, hash table lookup"],
                        ["O(log n)", "Logarithmic", "Binary search, balanced tree operations"],
                        ["O(n)", "Linear", "Linear search, array traversal"],
                        ["O(n log n)", "Linearithmic", "Merge sort, heap sort, quicksort (avg)"],
                        ["O(n²)", "Quadratic", "Bubble sort, insertion sort, nested loops"],
                        ["O(2ⁿ)", "Exponential", "Recursive Fibonacci (naive), subset generation"],
                        ["O(n!)", "Factorial", "Traveling salesman (brute force)"],
                      ].map(([notation, name, example], i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{notation}</td>
                          <td className="px-4 py-2 font-medium">{name}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Why Big-O Matters ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why Big-O is Used Everywhere
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🏢",
                      title: "Industry Standard",
                      desc: "Big-O is the lingua franca for discussing algorithm performance in interviews and documentation.",
                    },
                    {
                      icon: "🔒",
                      title: "Worst-Case Guarantee",
                      desc: "It provides a safety margin: you know the algorithm won't be slower than this.",
                    },
                    {
                      icon: "📊",
                      title: "Scalability Prediction",
                      desc: "Helps you estimate how an algorithm will behave when data grows from 10k to 10M.",
                    },
                    {
                      icon: "⚖️",
                      title: "Comparison Tool",
                      desc: "Allows you to compare algorithms objectively without running them.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
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
                      tip: "Always specify the variable 'n'",
                      desc: "Clearly define what n represents (array length, number of nodes, etc.).",
                    },
                    {
                      tip: "Focus on the dominant term",
                      desc: "When simplifying, keep only the fastest-growing term.",
                    },
                    {
                      tip: "Use Big-O in code comments",
                      desc: "Document the complexity of your methods — it helps maintainers.",
                    },
                    {
                      tip: "Remember: Big-O is not the whole story",
                      desc: "Constants matter in practice; profile your code for real performance.",
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
                    <strong>Ignoring constants in practice:</strong> While Big-O drops constants, an O(n) algorithm with
                    1000n operations can be slower than O(n²) with n=100. Always consider real constraints.
                  </li>
                  <li>
                    <strong>Confusing Big-O with average or best case:</strong> Big-O is <em>worst-case</em> unless
                    otherwise specified. Some use it loosely for average, which can be misleading.
                  </li>
                  <li>
                    <strong>Misapplying Big-O to multiple variables:</strong> If your algorithm depends on two inputs
                    (e.g., n and m), the complexity should be O(n+m) or O(n*m), not just O(n).
                  </li>
                  <li>
                    <strong>Forgetting about recursion call stack:</strong> Recursive algorithms may have O(log n) or O(n)
                    space due to stack, which is part of the analysis.
                  </li>
                  <li>
                    <strong>Assuming all loops are O(n):</strong> Nested loops multiply; a loop that halves is O(log n).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once analyzed a nested loop as O(n²) when the inner loop was independent
                      of the outer, causing a misclassification.
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
                      <strong>Simplify carefully</strong> — drop constants and lower-order terms, but keep the dominant term.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always state the case</strong> (worst, best, average) when using Big-O.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Define 'n' clearly</strong> in comments or documentation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Practice identifying Big-O</strong> on your own code and on examples.
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
                    "✅ Can you define Big-O notation formally?",
                    "✅ Do you know which terms to drop when simplifying?",
                    "✅ Can you distinguish between O(n), O(n²), O(log n)?",
                    "✅ Can you identify the worst-case complexity of a given code snippet?",
                    "✅ Have you practiced with common algorithms (binary search, merge sort)?",
                    "✅ Do you know the difference between O(n) and O(n log n)?",
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
                    <strong>Observe carefully:</strong> In a function with two loops, one O(n) and one O(n²), which
                    term dominates for large n? The O(n²) dominates.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have O(2n) and O(3n), are they different in Big-O?
                    No, both simplify to O(n). Constants are dropped.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 10,000 students. An
                    O(n²) algorithm would perform 100 million operations; an O(n log n) algorithm about 140,000.
                    The difference is huge.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Big-O Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Big-O Demo — Classifying Code Snippets
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows examples of O(1), O(n), O(n²), and O(log n) code, explaining the complexity.
                </p>
                <JavaFileLoader
                  fileModule={bigODemoJava}
                  title="BigODemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Complexity Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Complexity Comparison — Measuring Runtime
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Runs algorithms of different complexities and measures their runtime for growing n.
                </p>
                <JavaFileLoader
                  fileModule={complexityComparisonJava}
                  title="ComplexityComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Constant Factors ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Constant Factors — Why They Matter in Practice
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that an O(n) algorithm with a large constant can sometimes be slower than O(n²) for small n.
                </p>
                <JavaFileLoader
                  fileModule={constantFactorsJava}
                  title="ConstantFactors.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Big-O Notation — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Big-O notation is the most important tool for discussing algorithm efficiency. I like to emphasize " +
              "that Big-O is not about 'speed' but about 'scaling'. It's a guarantee about how the algorithm behaves " +
              "as n grows. Students often ask, 'Why ignore constants?' — I tell them it's to focus on the big picture. " +
              "However, remind them that constants do matter in practice; they're just not part of the theoretical bound. " +
              "Have students practice simplifying expressions like O(3n² + 5n + 2) → O(n²). This builds confidence."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 9 · Big-O Notation · Built with ❤️ for the classroom</p>
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

export default Topic9;