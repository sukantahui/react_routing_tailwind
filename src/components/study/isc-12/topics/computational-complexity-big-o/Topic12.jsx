import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import bestWorstAverageDemoJava from "./topic12_files/BestWorstAverageDemo.java?raw";
import linearSearchAnalysisJava from "./topic12_files/LinearSearchAnalysis.java?raw";
import quicksortAnalysisJava from "./topic12_files/QuicksortAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic12_files/topic12_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic12 = () => {
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
              Topic 12
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Analysis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Best Case, Worst Case and Average Case Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">three perspectives</span>{" "}
            of algorithm performance — from best-case luck to worst-case guarantees and typical behavior.
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
                  <span className="text-indigo-500">●</span> What Are These Cases?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    When we analyze an algorithm, we consider how it behaves for different inputs of the same size.
                    Three perspectives are commonly used:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Worst-case</strong> (Big-O): The maximum time for any input of size n. This is the
                      <em>guarantee</em> that the algorithm will not exceed this bound. It's the most commonly used
                      because it provides a safe upper limit.
                    </li>
                    <li>
                      <strong>Best-case</strong> (Big-Ω): The minimum time for any input of size n. This is often
                      the <em>lucky</em> scenario, but rarely used for practical guarantees.
                    </li>
                    <li>
                      <strong>Average-case</strong> (often Θ): The expected time over all possible inputs of size n,
                      assuming a probability distribution (often uniform). This is often the most realistic measure
                      for typical performance.
                    </li>
                  </ul>
                  <p>
                    Think of it like a student's exam performance: worst-case is the minimum grade they could get (if
                    everything goes wrong), best-case is the maximum (if they know all answers), and average-case is
                    their typical score over many exams.
                  </p>
                </div>
              </section>

              {/* ── Detailed Breakdown ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> The Three Cases in Detail
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "🛡️",
                      title: "Worst-Case (O)",
                      desc: "Maximum time for any input of size n. Provides a performance guarantee.",
                      example: "Linear search: O(n) — target at end or missing.",
                      notation: "Big-O",
                    },
                    {
                      icon: "🍀",
                      title: "Best-Case (Ω)",
                      desc: "Minimum time for any input of size n. Rarely useful for guarantees.",
                      example: "Linear search: Ω(1) — target at first position.",
                      notation: "Big-Ω",
                    },
                    {
                      icon: "📊",
                      title: "Average-Case (Θ often)",
                      desc: "Expected time over all inputs, assuming a distribution (often uniform).",
                      example: "Linear search: Θ(n) average if target equally likely anywhere.",
                      notation: "Often Θ or O",
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
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                        {item.notation}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Ranges
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Best, worst, average cases visualization"
                  >
                    {/* Background */}
                    <rect x="50" y="50" width="700" height="200" rx="10" fill="none" stroke="#6b7280" strokeWidth="1" className="dark:stroke-gray-500" />

                    {/* Worst-case line (top) */}
                    <line x1="60" y1="60" x2="740" y2="60" stroke="#f472b6" strokeWidth="3" strokeDasharray="8 4" />
                    <text x="750" y="65" fontSize="13" fill="#f472b6" fontWeight="bold">Worst O(n)</text>

                    {/* Average-case line (middle) */}
                    <line x1="60" y1="140" x2="740" y2="140" stroke="#a78bfa" strokeWidth="3" strokeDasharray="4 4" />
                    <text x="750" y="145" fontSize="13" fill="#a78bfa" fontWeight="bold">Average Θ(n)</text>

                    {/* Best-case line (bottom) */}
                    <line x1="60" y1="230" x2="740" y2="230" stroke="#34d399" strokeWidth="3" strokeDasharray="2 4" />
                    <text x="750" y="235" fontSize="13" fill="#34d399" fontWeight="bold">Best Ω(1)</text>

                    {/* Vertical range indicators */}
                    <line x1="200" y1="60" x2="200" y2="230" stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                    <text x="200" y="245" textAnchor="middle" fontSize="11" fill="#fbbf24">Range</text>

                    <line x1="400" y1="60" x2="400" y2="230" stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                    <line x1="600" y1="60" x2="600" y2="230" stroke="#fbbf24" strokeWidth="2" opacity="0.5" />

                    {/* Animated range indicator */}
                    <rect x="100" y="60" width="600" height="170" fill="none" stroke="#fbbf24" strokeWidth="2" rx="5" opacity="0.4">
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                    </rect>

                    {/* Labels */}
                    <text x="400" y="20" textAnchor="middle" fontSize="14" fill="#374151" className="dark:fill-gray-300">
                      For a given n, the runtime can vary from best-case (lower) to worst-case (upper).
                      Average is somewhere in between.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The same algorithm can have different runtimes for different inputs of the same size.
                    Worst-case provides a guarantee; average-case is more practical.
                  </p>
                </div>
              </section>

              {/* ── When to Use Each ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> When to Use Each Case
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      case: "Worst-Case",
                      use: "When you need a guarantee (e.g., safety-critical systems, real-time applications).",
                      icon: "🔒",
                    },
                    {
                      case: "Best-Case",
                      use: "Rarely used alone; sometimes to show a lower bound or for marketing (rarely practical).",
                      icon: "💭",
                    },
                    {
                      case: "Average-Case",
                      use: "When you want typical performance (e.g., database queries, general-purpose software).",
                      icon: "📈",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 3),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.case}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.use}</p>
                    </div>
                  ))}
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Linear Search:</span>{" "}
                      Best Ω(1), Worst O(n), Average Θ(n) if uniformly distributed.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Quicksort:</span>{" "}
                      Best Ω(n log n), Worst O(n²) (bad pivot), Average Θ(n log n) (with random pivot).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Hash Table Lookup:</span>{" "}
                      Best Ω(1), Worst O(n) (all collisions), Average Θ(1) (good hash).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Bubble Sort (optimized):</span>{" "}
                      Best Ω(n) (already sorted), Worst O(n²) (reverse sorted), Average Θ(n²).
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
                      tip: "Worst-case is usually what matters",
                      desc: "For guaranteed performance, always analyze the worst-case (Big-O).",
                    },
                    {
                      tip: "Average-case requires assumptions",
                      desc: "You must specify the input distribution (e.g., uniform random) for average-case analysis.",
                    },
                    {
                      tip: "Best-case is rarely useful alone",
                      desc: "It's mostly used to contrast with worst-case or for lower-bound proofs.",
                    },
                    {
                      tip: "Use Θ when worst and average match",
                      desc: "If an algorithm has the same complexity in all cases, Θ is the most precise.",
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
                    <strong>Confusing worst-case with average-case:</strong> Many beginners assume the average is the
                    same as the worst. For example, quicksort is O(n²) worst, but average is Θ(n log n) — they are
                    very different.
                  </li>
                  <li>
                    <strong>Overemphasizing best-case:</strong> Marketing sometimes highlights best-case, but it's
                    rarely the metric you should rely on for performance guarantees.
                  </li>
                  <li>
                    <strong>Ignoring the input distribution:</strong> Average-case analysis requires knowing how
                    inputs are distributed; without that, it's meaningless.
                  </li>
                  <li>
                    <strong>Assuming average-case is always the middle:</strong> The average is not necessarily the
                    arithmetic mean of best and worst; it depends on the distribution.
                  </li>
                  <li>
                    <strong>Forgetting that algorithms can have different complexities for each case:</strong> Some
                    algorithms (like quicksort) have a significant gap between best and worst.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once chose an algorithm based on its best-case performance,
                      not realizing the worst-case was much slower for his data.
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
                      <strong>Always specify which case you're analyzing</strong> (worst, best, average) when discussing complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>For safety-critical systems, use worst-case analysis</strong> to guarantee response times.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>When reporting average-case, state the assumptions</strong> about input distribution.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Θ when worst and average are the same</strong> — it's the most informative.
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
                    "✅ Can you define worst-case, best-case, and average-case?",
                    "✅ Do you know which notation corresponds to each case (O, Ω, Θ)?",
                    "✅ Can you identify the three cases for linear search?",
                    "✅ Can you identify the three cases for quicksort?",
                    "✅ Do you understand why worst-case is often used for guarantees?",
                    "✅ Can you explain average-case and its reliance on input distribution?",
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
                    <strong>Observe carefully:</strong> For a sorting algorithm, what inputs cause the worst case?
                    What inputs cause the best case? How does the average compare?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Consider a search algorithm that stops early. How does the
                    input position affect the runtime? That's the difference between best and worst.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a list of students.
                    Searching for a student: best case they're first, worst case they're last. Average case they're
                    somewhere in the middle (assuming uniform distribution).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Best, Worst, Average Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Best, Worst, Average Demo — Measuring All Three
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Runs an algorithm on different inputs to show the range of possible runtimes.
                </p>
                <JavaFileLoader
                  fileModule={bestWorstAverageDemoJava}
                  title="BestWorstAverageDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Linear Search Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear Search Analysis — Best, Worst, Average
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the runtime of linear search for best-case, worst-case, and average-case inputs.
                </p>
                <JavaFileLoader
                  fileModule={linearSearchAnalysisJava}
                  title="LinearSearchAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Quicksort Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Quicksort Analysis — Best, Worst, Average
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates how quicksort's runtime varies dramatically based on pivot selection and input order.
                </p>
                <JavaFileLoader
                  fileModule={quicksortAnalysisJava}
                  title="QuicksortAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Best Case, Worst Case and Average Case Analysis — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "This topic is crucial for developing a nuanced understanding of algorithm performance. " +
              "I always emphasize that worst-case analysis is the 'guarantee' — it tells you the maximum time " +
              "you can expect, which is vital for real-time systems and safety-critical applications. " +
              "Average-case is often more relevant for general-purpose software, but it requires careful " +
              "assumptions about input distributions. Students often forget that the average is not the " +
              "mean of best and worst; it depends on the input distribution. Use concrete examples like " +
              "linear search and quicksort to illustrate the differences. Encourage them to always specify " +
              "which case they are analyzing when they discuss complexity."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 12 · Best Case, Worst Case and Average Case Analysis · Built with ❤️ for the classroom</p>
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

export default Topic12;