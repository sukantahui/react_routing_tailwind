import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import logarithmExamplesJava from "./topic4_files/LogarithmExamples.java?raw";
import logBase2Java from "./topic4_files/LogBase2.java?raw";
import complexityComparisonJava from "./topic4_files/ComplexityComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic4_files/topic4_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic4 = () => {
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
              Topic 4
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Math Foundations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Mathematical Foundation: Logarithms
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">logarithms</span> —
            the inverse of exponentiation and the key to understanding O(log n) algorithms.
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
                  <span className="text-indigo-500">●</span> What Are Logarithms?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>logarithm</strong> answers the question: <em>"To what exponent must we raise a given base
                    to obtain a certain number?"</em> If <strong>b<sup>y</sup> = x</strong>, then
                    <strong> log<sub>b</sub>(x) = y</strong>. In other words, a logarithm is the <strong>inverse</strong>{" "}
                    of exponentiation.
                  </p>
                  <p>
                    For example, because 2³ = 8, we say <strong>log₂(8) = 3</strong>. The base is 2, the result is 8,
                    and the exponent is 3. This is fundamental in computer science because many algorithms divide
                    the problem size by a constant factor at each step — leading to logarithmic complexity.
                  </p>
                  <p>
                    Think of it like a game: <strong>Swadeep</strong> thinks of a number between 1 and 1,000,000.
                    <strong>Tuhina</strong> guesses by asking "is it higher or lower?" and always picks the middle.
                    She needs at most <strong>log₂(1,000,000) ≈ 20</strong> guesses. That's the power of logarithms!
                  </p>
                </div>
              </section>

              {/* ── Key Properties ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Core Logarithm Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      rule: "logₐ(xy) = logₐ(x) + logₐ(y)",
                      example: "log₂(8×4) = log₂(8) + log₂(4) = 3 + 2 = 5",
                      desc: "Log of a product → sum of logs.",
                    },
                    {
                      rule: "logₐ(x/y) = logₐ(x) - logₐ(y)",
                      example: "log₂(8/2) = log₂(8) - log₂(2) = 3 - 1 = 2",
                      desc: "Log of a quotient → difference of logs.",
                    },
                    {
                      rule: "logₐ(xⁿ) = n · logₐ(x)",
                      example: "log₂(8²) = 2 · log₂(8) = 2 · 3 = 6",
                      desc: "Log of a power → exponent times log of base.",
                    },
                    {
                      rule: "logₐ(1) = 0",
                      example: "log₂(1) = 0, because 2⁰ = 1",
                      desc: "Log of 1 is always 0.",
                    },
                    {
                      rule: "logₐ(a) = 1",
                      example: "log₂(2) = 1, because 2¹ = 2",
                      desc: "Log of the base is 1.",
                    },
                    {
                      rule: "Change of base: logₐ(x) = log_b(x) / log_b(a)",
                      example: "log₂(8) = log₁₀(8) / log₁₀(2)",
                      desc: "Allows computing logs in any base.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <p className="font-mono text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                        {item.rule}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.example}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition: Logarithmic Growth ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: log₂(n) Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Logarithmic growth curve"
                  >
                    <defs>
                      <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" className="dark:fill-gray-400" />
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

                    <text x="400" y="380" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">
                      n
                    </text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">
                      log₂(n)
                    </text>

                    {/* Logarithmic curve log2(n) */}
                    <path
                      d="M60 340 L100 330 L140 318 L180 305 L220 290 L260 275 L300 258 L340 240 L380 220 L420 198 L460 175 L500 150 L540 125 L580 100 L620 75 L660 55 L700 52 L740 50 L760 50"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Fill under curve */}
                    <path
                      d="M60 340 L100 330 L140 318 L180 305 L220 290 L260 275 L300 258 L340 240 L380 220 L420 198 L460 175 L500 150 L540 125 L580 100 L620 75 L660 55 L700 52 L740 50 L760 50 L760 350 L60 350 Z"
                      fill="url(#logGrad)"
                      opacity="0.3"
                    />

                    <defs>
                      <linearGradient id="logGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Animated dot */}
                    <circle cx="300" cy="258" r="6" fill="#34d399">
                      <animate attributeName="cx" values="60;700;60" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="340;50;340" dur="6s" repeatCount="indefinite" />
                    </circle>

                    <text x="540" y="160" fontSize="12" fill="#34d399">log₂(n) grows slowly</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Logarithmic growth is extremely slow. Even for n = 1,000,000, log₂(n) ≈ 20. This is why
                    O(log n) algorithms are considered very efficient.
                  </p>
                </div>
              </section>

              {/* ── Why Logarithms Appear in CS ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why Logs Appear in Computer Science
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔍",
                      title: "Binary Search",
                      desc: "Each step halves the search space → O(log n) comparisons.",
                    },
                    {
                      icon: "🌳",
                      title: "Tree Height",
                      desc: "A balanced binary tree of n nodes has height O(log n).",
                    },
                    {
                      icon: "⚡",
                      title: "Divide & Conquer",
                      desc: "Algorithms like merge sort have O(log n) recursion depth.",
                    },
                    {
                      icon: "📊",
                      title: "Heap Operations",
                      desc: "Insert/delete in a binary heap take O(log n) time.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 6),
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
                      tip: "Know common log values",
                      desc: "log₂(1)=0, log₂(2)=1, log₂(4)=2, log₂(8)=3, log₂(16)=4, log₂(1024)=10.",
                    },
                    {
                      tip: "Log base doesn't matter in Big-O",
                      desc: "O(log n) means base is constant; log₂ n and log₁₀ n differ by a constant factor.",
                    },
                    {
                      tip: "Use Math.log() and Math.log10() in Java",
                      desc: "Math.log() is natural log (base e); Math.log10() is base 10.",
                    },
                    {
                      tip: "Change of base in code",
                      desc: "To compute log₂(x) in Java: Math.log(x) / Math.log(2).",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 10),
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
                    <strong>Confusing log base:</strong> log₂(8)=3, but log₁₀(8)≈0.9. Always check the base.
                  </li>
                  <li>
                    <strong>Assuming log(a+b) = log(a) + log(b):</strong> This is false. Only log(ab) = log(a)+log(b).
                  </li>
                  <li>
                    <strong>Thinking log(0) or log(negative) exists:</strong> Logarithms are defined only for positive numbers.
                  </li>
                  <li>
                    <strong>Forgetting that log₂(1) = 0:</strong> Many beginners think log₂(1) = 1.
                  </li>
                  <li>
                    <strong>Ignoring the base when analyzing O(log n):</strong> In Big-O, the base is irrelevant because
                    it's a constant factor. But in actual computation, the base matters.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once wrote a binary search and computed log₁₀(n) instead of log₂(n),
                      thinking the result was the number of steps — she was off by a factor of ~3.3.
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
                      <strong>Always specify the base</strong> when writing logs in comments or documentation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Math.log(x) / Math.log(base)</strong> for arbitrary base in Java.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use logarithms to estimate algorithm steps</strong> — for n=10⁶, log₂(n)≈20, which helps
                      in performance analysis.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use property logₐ(b) = 1 / log_b(a)</strong> to simplify expressions.
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
                    "✅ Can you define a logarithm as the inverse of exponentiation?",
                    "✅ Do you know the common log bases (2, 10, e)?",
                    "✅ Have you memorized the key log rules (product, quotient, power)?",
                    "✅ Can you compute log₂(n) for given n?",
                    "✅ Do you understand why logarithms appear in algorithm analysis?",
                    "✅ Have you practiced using Math.log() in Java?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 14),
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
                    <strong>Observe carefully:</strong> How many times can you divide 1,000,000 by 2 until you get below 1?
                    That's log₂(1,000,000).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have an algorithm that halves the input each step,
                    how many steps for n=1000? For n=10⁶?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Shyamnagar</strong> has 1024 students.
                    How many times would you need to split them into two equal groups to get down to 1 student?
                    That's log₂(1024) = 10.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Logarithm Examples ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Logarithm Examples — Java's Math Functions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates computing natural log, log base 10, and custom base logs in Java.
                </p>
                <JavaFileLoader
                  fileModule={logarithmExamplesJava}
                  title="LogarithmExamples.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Log Base 2 ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Log Base 2 — Computing log₂(n) in Java
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows how to compute log₂(n) using the change of base formula, and also using bit operations for
                  powers of 2.
                </p>
                <JavaFileLoader
                  fileModule={logBase2Java}
                  title="LogBase2.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Complexity Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Complexity Comparison — O(log n) vs O(n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the number of steps for an O(log n) algorithm (like binary search) versus an O(n) algorithm
                  for various input sizes.
                </p>
                <JavaFileLoader
                  fileModule={complexityComparisonJava}
                  title="ComplexityComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Mathematical Foundation: Logarithms — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Logarithms are a source of confusion for many students, but they are essential for understanding " +
              "algorithm efficiency. I like to use the 'guessing game' analogy: if you guess a number between 1 and n " +
              "by always halving the range, you need only log₂(n) guesses. This makes the logarithmic concept tangible. " +
              "Also, emphasize that the base of the logarithm doesn't matter in Big-O notation, because constants are " +
              "ignored. This often surprises students, so it's worth explaining clearly. Finally, practice converting " +
              "exponential equations to logarithmic form and vice versa — it reinforces the inverse relationship."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 4 · Mathematical Foundation: Logarithms · Built with ❤️ for the classroom</p>
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

export default Topic4;