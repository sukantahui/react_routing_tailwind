import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import productRuleJava from "./topic6_files/ProductRule.java?raw";
import quotientRuleJava from "./topic6_files/QuotientRule.java?raw";
import powerRuleJava from "./topic6_files/PowerRule.java?raw";
import changeBaseJava from "./topic6_files/ChangeBase.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic6_files/topic6_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic6 = () => {
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
              Topic 6
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Math Foundations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Logarithm Rules and Properties
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Mastering the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">fundamental rules</span>{" "}
            of logarithms — product, quotient, power, and change of base — essential for simplifying expressions
            and solving equations in algorithm analysis.
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
                  <span className="text-indigo-500">●</span> What Are Logarithm Rules?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Logarithms have several <strong>algebraic properties</strong> that allow us to manipulate
                    logarithmic expressions, simplify them, and solve equations. These rules are derived directly
                    from the definition of logarithms as the inverse of exponentiation.
                  </p>
                  <p>
                    The four core rules are:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Product Rule:</strong> logₐ(xy) = logₐ(x) + logₐ(y)</li>
                      <li><strong>Quotient Rule:</strong> logₐ(x/y) = logₐ(x) − logₐ(y)</li>
                      <li><strong>Power Rule:</strong> logₐ(xⁿ) = n · logₐ(x)</li>
                      <li><strong>Change of Base Rule:</strong> logₐ(x) = log_b(x) / log_b(a)</li>
                    </ul>
                  </p>
                  <p>
                    These rules are the reason we can simplify complex logarithmic expressions and are widely used
                    in algorithm analysis, especially when deriving complexities of divide-and-conquer algorithms
                    and solving recurrences.
                  </p>
                </div>
              </section>

              {/* ── The Four Rules ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> The Four Core Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Product Rule",
                      formula: "logₐ(xy) = logₐ(x) + logₐ(y)",
                      example: "log₂(8×4) = log₂(8) + log₂(4) = 3+2 = 5",
                      desc: "The log of a product is the sum of the logs.",
                    },
                    {
                      title: "Quotient Rule",
                      formula: "logₐ(x/y) = logₐ(x) − logₐ(y)",
                      example: "log₂(8/2) = log₂(8) − log₂(2) = 3−1 = 2",
                      desc: "The log of a quotient is the difference of the logs.",
                    },
                    {
                      title: "Power Rule",
                      formula: "logₐ(xⁿ) = n · logₐ(x)",
                      example: "log₂(8²) = 2 · log₂(8) = 2·3 = 6",
                      desc: "The log of a power is the exponent times the log.",
                    },
                    {
                      title: "Change of Base",
                      formula: "logₐ(x) = log_b(x) / log_b(a)",
                      example: "log₂(8) = log₁₀(8)/log₁₀(2) ≈ 3",
                      desc: "Allows conversion between bases.",
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
                      <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{item.title}</h3>
                      <p className="font-mono text-sm text-gray-800 dark:text-gray-200 mt-1">{item.formula}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.example}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Product Rule
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Product rule visualization"
                  >
                    <rect x="50" y="50" width="200" height="150" rx="10" fill="#818cf8" opacity="0.2" stroke="#818cf8" strokeWidth="2" />
                    <text x="150" y="100" textAnchor="middle" fontSize="16" fill="#818cf8" fontWeight="bold">logₐ(x)</text>
                    <text x="150" y="140" textAnchor="middle" fontSize="24" fill="#818cf8">+</text>

                    <rect x="300" y="50" width="200" height="150" rx="10" fill="#34d399" opacity="0.2" stroke="#34d399" strokeWidth="2" />
                    <text x="400" y="100" textAnchor="middle" fontSize="16" fill="#34d399" fontWeight="bold">logₐ(y)</text>
                    <text x="400" y="140" textAnchor="middle" fontSize="24" fill="#34d399">+</text>

                    <path d="M550 125 L700 125" stroke="#f472b6" strokeWidth="3" markerEnd="url(#arrow6)" />
                    <defs>
                      <marker id="arrow6" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6" />
                      </marker>
                    </defs>

                    <rect x="700" y="50" width="100" height="150" rx="10" fill="#f472b6" opacity="0.2" stroke="#f472b6" strokeWidth="2" />
                    <text x="750" y="100" textAnchor="middle" fontSize="16" fill="#f472b6" fontWeight="bold">logₐ(xy)</text>

                    <text x="150" y="230" textAnchor="middle" fontSize="14" fill="#6b7280">First factor</text>
                    <text x="400" y="230" textAnchor="middle" fontSize="14" fill="#6b7280">Second factor</text>
                    <text x="750" y="230" textAnchor="middle" fontSize="14" fill="#6b7280">Product</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The product rule shows that multiplication inside the log becomes addition outside.
                    This is a direct consequence of the exponent rule bᵐ·bⁿ = bᵐ⁺ⁿ.
                  </p>
                </div>
              </section>

              {/* ── Real-World Usage ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Where Are These Rules Used?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "📊",
                      title: "Algorithm Analysis",
                      desc: "Simplifying complexity expressions: O(log(n²)) = O(2 log n) = O(log n).",
                    },
                    {
                      icon: "🔢",
                      title: "Solving Recurrences",
                      desc: "The Master Theorem uses logarithms to determine complexity.",
                    },
                    {
                      icon: "📈",
                      title: "Data Compression",
                      desc: "Entropy calculations use logs; rules help combine probabilities.",
                    },
                    {
                      icon: "🧮",
                      title: "Scientific Computing",
                      desc: "Converting between logarithmic scales (pH, decibels, Richter).",
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
                      tip: "Use the power rule to pull down exponents",
                      desc: "This is especially useful when solving for exponents in equations.",
                    },
                    {
                      tip: "Product rule is for multiplication inside the log, not addition",
                      desc: "log(x+y) ≠ log(x) + log(y) — a common mistake.",
                    },
                    {
                      tip: "Change of base is your friend in code",
                      desc: "When your language lacks a specific log base, use change of base.",
                    },
                    {
                      tip: "Remember the special cases",
                      desc: "logₐ(1)=0, logₐ(a)=1, and logₐ(aⁿ)=n.",
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
                    <strong>Applying product rule to addition:</strong> log(x+y) ≠ log(x) + log(y). This is one of the
                    most frequent errors.
                  </li>
                  <li>
                    <strong>Forgetting the base in change of base:</strong> Change of base requires the same base in
                    numerator and denominator.
                  </li>
                  <li>
                    <strong>Confusing power rule with exponent rule:</strong> log(xⁿ) = n·log(x), not (log x)ⁿ.
                  </li>
                  <li>
                    <strong>Misapplying quotient rule:</strong> log(x/y) = log(x) − log(y), not log(x)/log(y).
                  </li>
                  <li>
                    <strong>Overlooking domain restrictions:</strong> All arguments must be positive.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once used the product rule on log₂(-2 · -3) = log₂(-2) + log₂(-3),
                      which is invalid because both arguments are negative.
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
                      <strong>Always check the domain</strong> before applying logarithm rules.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Apply rules in the right direction</strong> — sometimes expanding is useful, sometimes
                      condensing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use change of base when computing in code</strong> to avoid relying on specific log
                      functions.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Practice simplifying expressions</strong> by combining multiple rules.
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
                    "✅ Can you state the product, quotient, power, and change of base rules?",
                    "✅ Can you apply each rule correctly to simplify logarithmic expressions?",
                    "✅ Do you know when to expand vs condense logs?",
                    "✅ Can you use change of base to compute logs in any base?",
                    "✅ Have you practiced combining multiple rules in one expression?",
                    "✅ Can you identify common mistakes like applying product rule to addition?",
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
                    <strong>Observe carefully:</strong> How would you simplify log₂(8x²) using product and power rules?
                    Write it step by step.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Given log₂(16) = 4 and log₂(4) = 2, use the quotient rule to
                    find log₂(16/4) = log₂(4). Check if it matches.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 1024 students.
                    If you need to compute log₂(1024) and your calculator only has log₁₀, how would you use change of base?
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Product Rule ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Product Rule Demonstration
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows that logₐ(xy) = logₐ(x) + logₐ(y) using Java calculations.
                </p>
                <JavaFileLoader
                  fileModule={productRuleJava}
                  title="ProductRule.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Quotient Rule ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Quotient Rule Demonstration
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Verifies logₐ(x/y) = logₐ(x) - logₐ(y) with numeric examples.
                </p>
                <JavaFileLoader
                  fileModule={quotientRuleJava}
                  title="QuotientRule.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Power Rule ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Power Rule Demonstration
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Confirms logₐ(xⁿ) = n·logₐ(x) with multiple examples.
                </p>
                <JavaFileLoader
                  fileModule={powerRuleJava}
                  title="PowerRule.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Change of Base ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Change of Base Rule
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Computes logarithms in arbitrary bases using natural logs.
                </p>
                <JavaFileLoader
                  fileModule={changeBaseJava}
                  title="ChangeBase.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Logarithm Rules and Properties — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Logarithm rules are algebraic tools that make working with logs manageable. I often tell my students " +
              "to think of them as 'shortcuts' that convert multiplication into addition, division into subtraction, " +
              "and powers into multiplication. This is exactly why they appear in complexity analysis: they turn " +
              "exponential growth into linear relationships. Encourage students to practice simplifying expressions " +
              "like log₂(8x²) step by step, verbalizing each rule as they apply it. Also, emphasize that these rules " +
              "are bidirectional — sometimes we expand, sometimes we condense, depending on what's needed."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 6 · Logarithm Rules and Properties · Built with ❤️ for the classroom</p>
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

export default Topic6;