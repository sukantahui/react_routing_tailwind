import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import bigThetaDemoJava from "./topic11_files/BigThetaDemo.java?raw";
import tightBoundsJava from "./topic11_files/TightBounds.java?raw";
import comparingBoundsJava from "./topic11_files/ComparingBounds.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic11_files/topic11_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic11 = () => {
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
              Topic 11
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Notations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Big-Θ (Theta) Notation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">tight bound</span> of algorithm
            performance — when the upper and lower bounds match exactly.
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
                  <span className="text-indigo-500">●</span> What is Big-Θ Notation?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Big-Θ (Theta) notation</strong> provides a <strong>tight bound</strong> on the growth rate
                    of an algorithm. It describes a function that is both an <strong>upper bound (Big-O)</strong> and
                    a <strong>lower bound (Big-Ω)</strong> simultaneously. In other words, <strong>f(n) = Θ(g(n))</strong>
                    means that <strong>g(n)</strong> is the <em>exact</em> asymptotic growth rate of <strong>f(n)</strong>.
                  </p>
                  <p>
                    Formally, <strong>f(n) = Θ(g(n))</strong> if there exist positive constants <strong>c₁</strong>,
                    <strong>c₂</strong>, and <strong>n₀</strong> such that <strong>0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n)</strong>
                    for all <strong>n ≥ n₀</strong>. This means the algorithm's runtime grows at the same rate as
                    <strong>g(n)</strong> — it cannot be faster (lower bound) nor slower (upper bound).
                  </p>
                  <p>
                    Big-Θ is the most precise of the asymptotic notations. When we say an algorithm is <strong>Θ(n)</strong>,
                    we mean its runtime grows linearly in all cases (best, worst, and average) — it's not just an upper
                    bound, it's the exact growth rate. This is often what we aim for when analyzing algorithms.
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
                      icon: "🎯",
                      title: "Tight Bound (Both Upper & Lower)",
                      desc: "Combines Big-O and Big-Ω; the function grows at exactly this rate.",
                    },
                    {
                      icon: "📐",
                      title: "Asymptotically Tight",
                      desc: "For large n, the growth rate is precisely g(n) up to constant factors.",
                    },
                    {
                      icon: "🔢",
                      title: "Constants Ignored",
                      desc: "Like O and Ω, constants are dropped: Θ(2n) = Θ(n).",
                    },
                    {
                      icon: "💡",
                      title: "Most Informative",
                      desc: "Gives the most precise description of an algorithm's complexity.",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Tight Bound
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 350"
                    className="w-full h-auto max-h-72"
                    role="img"
                    aria-label="Big-Theta visualization"
                  >
                    <defs>
                      <marker id="arrow11" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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

                    {/* Θ(n) region – between c₁·n and c₂·n */}
                    <line x1="60" y1="340" x2="760" y2="80" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                    <line x1="60" y1="350" x2="760" y2="100" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

                    {/* Fill between c₁·n and c₂·n */}
                    <path d="M60 340 L760 80 L760 100 L60 350 Z" fill="#a78bfa" opacity="0.15" />

                    {/* The actual f(n) in between */}
                    <path d="M60 345 L200 315 L340 280 L480 230 L620 150 L760 90" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="500" y="150" fontSize="12" fill="#f472b6" fontWeight="bold">f(n) = Θ(n)</text>

                    {/* Labels for bounds */}
                    <text x="380" y="80" fontSize="11" fill="#a78bfa">c₂·n (upper)</text>
                    <text x="380" y="120" fontSize="11" fill="#a78bfa">c₁·n (lower)</text>
                    <text x="400" y="50" textAnchor="middle" fontSize="12" fill="#6b7280" className="dark:fill-gray-400">
                      Θ(n) = tight bound between constant multiples of n
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Big-Θ gives a tight bound: the algorithm's runtime grows at exactly the rate of g(n),
                    up to constant factors. The function f(n) is sandwiched between c₁·g(n) and c₂·g(n).
                  </p>
                </div>
              </section>

              {/* ── Comparing Big-O, Big-Ω, Big-Θ ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Comparison of Notations
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2 border-b">Notation</th>
                        <th className="px-4 py-2 border-b">Bound Type</th>
                        <th className="px-4 py-2 border-b">Analogy</th>
                        <th className="px-4 py-2 border-b">Example (Linear Search)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">O(n)</td>
                        <td className="px-4 py-2">Upper (≤)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">"At most n"</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Worst-case</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">Ω(1)</td>
                        <td className="px-4 py-2">Lower (≥)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">"At least 1"</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Best-case</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-2 font-mono text-amber-600 dark:text-amber-400">Θ(n)</td>
                        <td className="px-4 py-2">Tight (≈)</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">"Exactly n"</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Only if best and worst match</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── When Can We Use Θ? ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> When is Θ Applicable?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "✅",
                      title: "Algorithms with Consistent Behavior",
                      desc: "When best, worst, and average cases have the same growth rate (e.g., merge sort).",
                    },
                    {
                      icon: "❌",
                      title: "Not for Different Bounds",
                      desc: "If best-case is Ω(1) and worst-case is O(n), then Θ doesn't exist (linear search).",
                    },
                    {
                      icon: "📊",
                      title: "Examples of Θ",
                      desc: "Merge sort Θ(n log n), array sum Θ(n), binary heap operations Θ(log n).",
                    },
                    {
                      icon: "⚠️",
                      title: "Be Careful with Assumptions",
                      desc: "Some algorithms have Θ for average-case but not for worst-case (e.g., quicksort).",
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
                      <div className="text-2xl mb-1">{item.icon}</div>
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
                      tip: "Use Θ when the bounds match exactly",
                      desc: "It gives the most precise complexity description.",
                    },
                    {
                      tip: "Be cautious with Θ in practice",
                      desc: "Many algorithms have different best and worst cases, so Θ may not apply generally.",
                    },
                    {
                      tip: "Θ is often used for average-case analysis",
                      desc: "When average-case is well-defined, Θ describes it tightly.",
                    },
                    {
                      tip: "Remember: Θ implies both O and Ω",
                      desc: "If you claim Θ, you must show both upper and lower bounds.",
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
                    <strong>Using Θ when only O is known:</strong> You cannot say an algorithm is Θ(n) if you only know
                    it's O(n); you also need to prove Ω(n).
                  </li>
                  <li>
                    <strong>Applying Θ to algorithms with different best/worst cases:</strong> Linear search is O(n)
                    and Ω(1), so it is NOT Θ(n) overall (though it's Θ(n) for the worst-case or average-case separately).
                  </li>
                  <li>
                    <strong>Assuming Θ is always the most appropriate:</strong> Sometimes we only care about worst-case
                    (O) and don't need to prove a lower bound.
                  </li>
                  <li>
                    <strong>Confusing Θ with average-case:</strong> Θ can apply to worst-case, best-case, or average-case
                    separately. It's not synonymous with average-case.
                  </li>
                  <li>
                    <strong>Forgetting that constants still matter in practice:</strong> Even though Θ ignores constants,
                    a Θ(n) algorithm with a huge constant can be slower than a Θ(n²) algorithm with tiny constants for
                    small n.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once said her algorithm is Θ(n²) but the constant was so small that
                      it outperformed Θ(n log n) algorithms for n up to 10,000.
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
                      <strong>Only use Θ when you've proven both O and Ω</strong> for the same function.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Be explicit about which case (worst, best, average) you're analyzing</strong> with Θ.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Θ when you need the most precise asymptotic description</strong> for documentation or analysis.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Remember that Θ is stronger than O or Ω alone</strong> — it implies both.
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
                    "✅ Can you define Big-Θ notation formally?",
                    "✅ Do you understand that Θ requires both O and Ω?",
                    "✅ Can you identify algorithms that have Θ (like merge sort, array sum)?",
                    "✅ Can you identify algorithms without Θ (like linear search)?",
                    "✅ Do you know the difference between Θ for worst-case vs average-case?",
                    "✅ Can you prove Θ by finding c₁, c₂, and n₀?",
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
                    <strong>Observe carefully:</strong> For an algorithm that always does exactly n operations (no early break),
                    what are its O, Ω, and Θ? They are all Θ(n).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Consider an algorithm that does n operations in the worst case,
                    but can finish early in the best case. Can you claim Θ(n)? No, because Ω is different.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a list of students.
                    If the school always processes all students (e.g., printing a report), the complexity is Θ(n).
                    If they search for a student and can stop early, it's not Θ(n).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Big-Theta Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Big-Θ Demo — Algorithms with Tight Bounds
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates algorithms that have Θ complexity, like array sum and merge sort.
                </p>
                <JavaFileLoader
                  fileModule={bigThetaDemoJava}
                  title="BigThetaDemo.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tight Bounds ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tight Bounds — When O and Ω Match
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares algorithms with Θ vs those without, showing when tight bounds exist.
                </p>
                <JavaFileLoader
                  fileModule={tightBoundsJava}
                  title="TightBounds.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Comparing Bounds ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Comparing Bounds — O, Ω, and Θ Side by Side
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows the differences between O, Ω, and Θ for various algorithms with clear examples.
                </p>
                <JavaFileLoader
                  fileModule={comparingBoundsJava}
                  title="ComparingBounds.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Big-Θ Notation — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Big-Θ is the gold standard for precise complexity analysis. I emphasize that it's the combination of " +
              "O and Ω — a two-sided guarantee. Students often struggle to understand why we need all three notations. " +
              "I use the analogy of a race: O tells you the runner's maximum speed (they won't go faster than this), " +
              "Ω tells you the minimum speed (they won't go slower), and Θ tells you the exact speed range. " +
              "In practice, many algorithms have Θ for their worst-case or average-case, so it's very useful. " +
              "Make sure students practice proving Θ by finding constants c₁ and c₂ — it reinforces the concept."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 11 · Big-Θ (Theta) Notation · Built with ❤️ for the classroom</p>
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

export default Topic11;