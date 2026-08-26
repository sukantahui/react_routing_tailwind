import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import bigOmegaDemoJava from "./topic10_files/BigOmegaDemo.java?raw";
import bestCaseAnalysisJava from "./topic10_files/BestCaseAnalysis.java?raw";
import linearSearchOmegaJava from "./topic10_files/LinearSearchOmega.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic10_files/topic10_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic10 = () => {
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
              Topic 10
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Notations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Big-Ω (Omega) Notation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">lower bound</span> of algorithm
            performance — describing the best-case or minimum time complexity.
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
                  <span className="text-indigo-500">●</span> What is Big-Ω Notation?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Big-Ω (Omega) notation</strong> provides a <strong>lower bound</strong> on the growth rate
                    of an algorithm. It describes the <strong>best-case</strong> (or minimum) time or space complexity,
                    stating that an algorithm cannot be <em>faster</em> than a certain rate for large inputs.
                  </p>
                  <p>
                    Formally, <strong>f(n) = Ω(g(n))</strong> if there exist positive constants <strong>c</strong> and
                    <strong>n₀</strong> such that <strong>0 ≤ c·g(n) ≤ f(n)</strong> for all <strong>n ≥ n₀</strong>.
                    In other words, <strong>g(n)</strong> is a lower bound on the growth of <strong>f(n)</strong> —
                    the algorithm takes <em>at least</em> this much time.
                  </p>
                  <p>
                    While Big-O is used to guarantee worst-case performance, Big-Ω is often used to describe the
                    <strong>best-case</strong> or to prove that an algorithm has a certain minimum complexity.
                    For example, linear search has Ω(1) because the target might be the first element, but it's
                    also Ω(1) for any input that gives that best case.
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
                      icon: "⬇️",
                      title: "Lower Bound (Best-Case)",
                      desc: "Guarantees the algorithm will take at least this much time, even in the best scenario.",
                    },
                    {
                      icon: "📐",
                      title: "Asymptotic Lower Bound",
                      desc: "Describes behavior as n → ∞, ignoring constants and lower-order terms.",
                    },
                    {
                      icon: "🔢",
                      title: "Constants are Dropped",
                      desc: "Ω(2n) = Ω(n), just like Big-O.",
                    },
                    {
                      icon: "💡",
                      title: "Often Used for Lower Bounds",
                      desc: "Used to prove that a problem cannot be solved faster than a certain complexity.",
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

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Lower Bound
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Big-Omega visualization"
                  >
                    <defs>
                      <marker id="arrow10" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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

                    {/* Ω(n²) lower bound - a quadratic curve */}
                    <path d="M60 348 Q100 340 200 290 Q300 200 400 140 Q500 90 600 60 Q700 50 760 48" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="50" fontSize="12" fill="#fbbf24" fontWeight="bold">Ω(n²)</text>

                    {/* Ω(n) lower bound - a linear function below the curve */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
                    <text x="770" y="82" fontSize="12" fill="#f472b6" fontWeight="bold">Ω(n)</text>

                    {/* Ω(log n) - logarithmic */}
                    <path d="M60 340 L200 260 L340 200 L480 160 L620 130 L760 110" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
                    <text x="770" y="112" fontSize="12" fill="#34d399" fontWeight="bold">Ω(log n)</text>

                    {/* Ω(1) - constant */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" strokeDasharray="2 2" />
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold">Ω(1)</text>

                    {/* Annotate: these are lower bounds, not upper bounds */}
                    <text x="400" y="30" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">
                      Big-Ω gives the lower bound — the algorithm is <em>at least</em> this fast.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Big-Ω describes the best-case or lower bound. An algorithm with Ω(n) will take at least linear time,
                    even in the best case (for sufficiently large n).
                  </p>
                </div>
              </section>

              {/* ── Comparing Big-O, Big-Ω, Big-Θ ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Big-O vs Big-Ω vs Big-Θ
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Notation</th>
                        <th className="px-4 py-2 border-b">Meaning</th>
                        <th className="px-4 py-2 border-b">Example (Linear Search)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">O(n)</td>
                        <td className="px-4 py-2">Upper bound (worst-case)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Target at end or not found</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">Ω(1)</td>
                        <td className="px-4 py-2">Lower bound (best-case)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Target at first position</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-amber-600 dark:text-amber-400">Θ(n)</td>
                        <td className="px-4 py-2">Tight bound (both upper & lower)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">For algorithms where worst and best are same (e.g., sum of array)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Note: An algorithm can have different Big-O and Big-Ω bounds (like linear search: O(n), Ω(1)).
                  When they are the same, we use Big-Θ.
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
                      tip: "Use Ω when analyzing best-case",
                      desc: "It tells you the minimum time an algorithm could take.",
                    },
                    {
                      tip: "Ω is often used for lower bounds",
                      desc: "To prove that no algorithm can solve a problem faster than Ω(g(n)).",
                    },
                    {
                      tip: "Don't confuse Ω with average case",
                      desc: "Ω is best-case, not average. Average is often analyzed with Big-Θ.",
                    },
                    {
                      tip: "Combine with Big-O for a complete picture",
                      desc: "Together they bound the algorithm's performance between Ω and O.",
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
                    <strong>Confusing Ω with average-case:</strong> Ω is lower bound (best-case), not average.
                    Average-case is different and often analyzed with Θ or separate notations.
                  </li>
                  <li>
                    <strong>Thinking Ω is less useful than O:</strong> Ω is crucial for proving theoretical lower bounds
                    and understanding the best-case behavior.
                  </li>
                  <li>
                    <strong>Misapplying Ω to worst-case:</strong> Ω does not describe worst-case; it describes the
                    minimum. The worst-case is O.
                  </li>
                  <li>
                    <strong>Forgetting that constants are ignored in Ω:</strong> Ω(2n) = Ω(n), just like in Big-O.
                  </li>
                  <li>
                    <strong>Assuming Ω means 'at least' in a practical sense:</strong> For a specific input, the runtime
                    could be much higher; Ω is an asymptotic lower bound for large n.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> once said his algorithm is Ω(n) because in the best case it takes n steps,
                      but it's actually Ω(1) when the target is at the front.
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
                      <strong>Clearly state whether you're describing worst-case (O) or best-case (Ω)</strong> to avoid confusion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Ω when proving optimality</strong> — to show that an algorithm is the best possible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Be careful with inputs</strong> — Ω is about the best-case input, which may be rare.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Θ when worst and best bounds match</strong> — it gives a tighter bound.
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
                    "✅ Can you define Big-Ω notation formally?",
                    "✅ Do you know it describes the lower bound (best-case)?",
                    "✅ Can you differentiate Ω from O and Θ?",
                    "✅ Can you find the Ω complexity of simple algorithms (linear search, binary search)?",
                    "✅ Do you understand that Ω is not the average case?",
                    "✅ Can you give an example where Ω differs from O?",
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
                    <strong>Observe carefully:</strong> In linear search, if the target is at index 0, the algorithm
                    takes 1 step. That's Ω(1). But if the target is at the end, it's O(n). The bounds differ.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What is the Ω complexity of binary search? The best case is
                    O(1) (target at middle), so Ω(1). Worst case is O(log n). So O and Ω differ here too.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Shyamnagar</strong> has a list of students.
                    If the list is unsorted and you're looking for a specific student, the best case is they're first —
                    Ω(1). The worst case is they're last or not there — O(n).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Big-Omega Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Big-Ω Demo — Analyzing Best-Case Bounds
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows examples of Ω(1), Ω(n), and Ω(log n) with code snippets and explanations.
                </p>
                <JavaFileLoader
                  fileModule={bigOmegaDemoJava}
                  title="BigOmegaDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Best Case Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Best Case Analysis — When Ω Matches Best Input
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the best-case and worst-case runtime of linear search to illustrate Ω vs O.
                </p>
                <JavaFileLoader
                  fileModule={bestCaseAnalysisJava}
                  title="BestCaseAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Linear Search Ω ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear Search — Ω(1) vs O(n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that linear search has Ω(1) (best case) and O(n) (worst case).
                </p>
                <JavaFileLoader
                  fileModule={linearSearchOmegaJava}
                  title="LinearSearchOmega.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Big-Ω Notation — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Big-Ω is often overlooked, but it's essential for understanding the full picture of algorithm performance. " +
              "I emphasize that Ω is about the 'best-case' — it tells you how fast the algorithm can be in the most " +
              "favorable circumstances. However, relying on Ω alone can be misleading because real-world inputs are " +
              "rarely the best case. When we analyze algorithms, we usually care more about O (worst-case) or average-case. " +
              "But Ω is crucial for proving lower bounds: for example, showing that any comparison-based sorting " +
              "algorithm must be Ω(n log n). Use examples where Ω and O are different (linear search) and where they are " +
              "the same (sum of array) to illustrate the difference."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 10 · Big-Ω (Omega) Notation · Built with ❤️ for the classroom</p>
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

export default Topic10;