import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import exponentExamplesJava from "./topic3_files/ExponentExamples.java?raw";
import exponentialGrowthJava from "./topic3_files/ExponentialGrowth.java?raw";
import fastExponentiationJava from "./topic3_files/FastExponentiation.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic3_files/topic3_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic3 = () => {
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
              Topic 3
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Math Foundations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Mathematical Foundation: Exponents
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding <span className="text-indigo-600 dark:text-indigo-400 font-semibold">exponents</span> —
            the key to grasping exponential growth, logarithmic inverses, and many algorithm complexities.
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
                  <span className="text-indigo-500">●</span> What Are Exponents?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    An <strong>exponent</strong> (or power) indicates how many times a number (the <em>base</em>) is
                    multiplied by itself. The notation is <strong>b<sup>e</sup></strong>, where <strong>b</strong> is
                    the base and <strong>e</strong> is the exponent. For example, 2³ = 2 × 2 × 2 = 8.
                  </p>
                  <p>
                    Exponents are fundamental in computer science because they appear in:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Algorithm complexity:</strong> O(2ⁿ) exponential time, O(n²) quadratic time.</li>
                      <li><strong>Binary representation:</strong> Each bit position represents a power of 2.</li>
                      <li><strong>Logarithms:</strong> The inverse operation of exponentiation.</li>
                      <li><strong>Growth rates:</strong> Exponential growth describes many natural and computational phenomena.</li>
                    </ul>
                  </p>
                  <p>
                    Think of it like this: <strong>Swadeep</strong> invests ₹1 with 100% interest per day. After
                    <strong>n</strong> days, his money grows to 2ⁿ — that's the power of exponential growth.
                    In algorithms, if you double the input size and the runtime quadruples (O(n²)), exponents are at play.
                  </p>
                </div>
              </section>

              {/* ── Core Properties ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Exponent Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      rule: "bᵐ × bⁿ = bᵐ⁺ⁿ",
                      example: "2³ × 2⁴ = 2⁷ = 128",
                      desc: "Multiply powers with same base → add exponents.",
                    },
                    {
                      rule: "bᵐ ÷ bⁿ = bᵐ⁻ⁿ",
                      example: "2⁵ ÷ 2² = 2³ = 8",
                      desc: "Divide powers with same base → subtract exponents.",
                    },
                    {
                      rule: "(bᵐ)ⁿ = bᵐⁿ",
                      example: "(2³)² = 2⁶ = 64",
                      desc: "Power of a power → multiply exponents.",
                    },
                    {
                      rule: "b⁰ = 1 (for b ≠ 0)",
                      example: "5⁰ = 1, 10⁰ = 1",
                      desc: "Any non-zero base to the power zero is 1.",
                    },
                    {
                      rule: "b⁻ⁿ = 1 / bⁿ",
                      example: "2⁻³ = 1/8 = 0.125",
                      desc: "Negative exponent → reciprocal.",
                    },
                    {
                      rule: "b¹ = b",
                      example: "7¹ = 7",
                      desc: "Any base to the power 1 is itself.",
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

              {/* ── Visual Intuition: Exponential Growth ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Growth of 2ⁿ
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Exponential growth curve"
                  >
                    <defs>
                      <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
                      2ⁿ
                    </text>

                    {/* Exponential curve 2^n */}
                    <path
                      d="M60 340 L120 330 L180 310 L240 280 L300 230 L360 170 L420 110 L480 80 L540 58 L600 52 L660 50 L720 50 L760 50"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Highlight area under curve */}
                    <path
                      d="M60 340 L120 330 L180 310 L240 280 L300 230 L360 170 L420 110 L480 80 L540 58 L600 52 L660 50 L720 50 L760 50 L760 350 L60 350 Z"
                      fill="url(#expGrad)"
                      opacity="0.3"
                    />

                    <defs>
                      <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Animated dot moving along curve */}
                    <circle cx="300" cy="230" r="6" fill="#f472b6">
                      <animate attributeName="cx" values="60;700;60" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="340;50;340" dur="6s" repeatCount="indefinite" />
                    </circle>

                    {/* Labels for specific points */}
                    <text x="60" y="360" fontSize="12" fill="#6b7280" className="dark:fill-gray-400">n=1</text>
                    <text x="300" y="255" fontSize="12" fill="#f472b6">2ⁿ</text>
                    <text x="540" y="48" fontSize="12" fill="#f472b6">fast growth</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Exponential functions like 2ⁿ grow extremely fast — even small increases in <strong>n</strong> cause huge jumps in value.
                    This is why exponential time algorithms are impractical for large inputs.
                  </p>
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
                      tip: "Know your powers of 2",
                      desc: "Memorize 2¹⁰=1024, 2²⁰≈1M, 2³⁰≈1B — useful for estimating memory and complexity.",
                    },
                    {
                      tip: "Use logarithms to reverse exponents",
                      desc: "If you know the value and want the exponent, think in terms of log₂(value).",
                    },
                    {
                      tip: "Recognize exponential patterns",
                      desc: "In loops, if the iteration variable doubles or halves, exponents are likely involved.",
                    },
                    {
                      tip: "Be careful with overflow",
                      desc: "Exponential values exceed integer limits quickly — use long or BigInteger when needed.",
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
                    <strong>Confusing base and exponent:</strong> 2³ = 8, but 3² = 9 — order matters!
                  </li>
                  <li>
                    <strong>Assuming exponentiation is associative:</strong> (2³)² = 64, but 2^(3²) = 2⁹ = 512 — they are different.
                  </li>
                  <li>
                    <strong>Forgetting that b⁰ = 1:</strong> Many beginners think 2⁰ = 0, but it's 1.
                  </li>
                  <li>
                    <strong>Ignoring negative exponents:</strong> 2⁻² = 1/4, not -4.
                  </li>
                  <li>
                    <strong>Overflow in code:</strong> Computing 2⁶⁰ in Java int overflows; use long or BigInteger.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once wrote a loop that doubled a variable until it overflowed,
                      causing an infinite loop because the overflow made it negative.
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
                      <strong>Use Math.pow() for double exponents</strong> — for integer exponents, consider loop or fast exponentiation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Precompute powers of 2</strong> using bit shifting (1 &lt;&lt; n) for efficiency.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use BigInteger for very large exponents</strong> to avoid overflow.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Learn fast exponentiation (exponentiation by squaring)</strong> — it's O(log n) and widely used.
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
                    "✅ Can you identify the base and exponent in a given expression?",
                    "✅ Do you remember the key exponent rules (multiplication, division, power of power)?",
                    "✅ Have you considered potential overflow when computing large powers?",
                    "✅ Do you understand how exponentiation relates to logarithms?",
                    "✅ Can you recognize exponential growth patterns in algorithms?",
                    "✅ Have you practiced fast exponentiation (binary exponentiation)?",
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
                    <strong>Observe carefully:</strong> How does 2ⁿ compare to n² for large n? Which grows faster?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have an algorithm that doubles the work each time
                    (like recursive Fibonacci), how does the number of operations relate to exponents?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Ichapur</strong> doubles its student population
                    every year. How many students after 10 years if it starts with 100? Write 100 × 2¹⁰.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Exponent Examples ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Exponent Examples — Basic Operations
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates various ways to compute powers in Java, including Math.pow, loops, and bit shifting.
                </p>
                <JavaFileLoader
                  fileModule={exponentExamplesJava}
                  title="ExponentExamples.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Exponential Growth ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Exponential Growth — Visualizing 2ⁿ
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Prints the values of 2ⁿ for n from 0 to 30, showing how quickly it grows.
                </p>
                <JavaFileLoader
                  fileModule={exponentialGrowthJava}
                  title="ExponentialGrowth.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Fast Exponentiation ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Fast Exponentiation — O(log n) Power Computation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Implements exponentiation by squaring (binary exponentiation) to compute powers efficiently.
                </p>
                <JavaFileLoader
                  fileModule={fastExponentiationJava}
                  title="FastExponentiation.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Mathematical Foundation: Exponents — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Exponents are the backbone of complexity analysis. When students encounter O(2ⁿ) or O(n²), they need " +
              "to feel comfortable with exponent arithmetic. I often use the 'doubling penny' story: if you have " +
              "a penny that doubles every day, after 30 days you have over 5 million dollars. That makes the " +
              "exponential explosion intuitive. Also, emphasize that exponentiation is not commutative: 2³ ≠ 3². " +
              "Finally, introduce fast exponentiation early — it's a beautiful example of how understanding math " +
              "can lead to efficient algorithms."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 3 · Mathematical Foundation: Exponents · Built with ❤️ for the classroom</p>
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

export default Topic3;