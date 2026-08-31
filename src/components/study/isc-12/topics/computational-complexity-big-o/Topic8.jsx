import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import repeatedDivisionJava from "./topic8_files/RepeatedDivision.java?raw";
import halvingStepsJava from "./topic8_files/HalvingSteps.java?raw";
import binarySearchCountJava from "./topic8_files/BinarySearchCount.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic8_files/topic8_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic8 = () => {
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
              Topic 8
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Patterns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Repeated Division and Halving Problems
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding algorithms that <span className="text-indigo-600 dark:text-indigo-400 font-semibold">halve</span>{" "}
            the input size at each step — the pattern behind O(log n) complexity.
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
                  <span className="text-indigo-500">●</span> The Halving Paradigm
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Repeated division</strong> is a computational pattern where the size of the problem is
                    reduced by a constant factor (typically half) at each step. This pattern is the foundation of
                    logarithmic time complexity — <strong>O(log n)</strong>.
                  </p>
                  <p>
                    The classic example: <strong>binary search</strong> — you start with a sorted array of size n,
                    compare the target with the middle element, and discard half the array. After k comparisons,
                    the remaining size is n/2ᵏ. When the remaining size is 1, you have found the element (or concluded
                    it's not present). The number of steps is exactly log₂(n).
                  </p>
                  <p>
                    This pattern appears in many other contexts:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Number of bits</strong> in an integer: repeatedly divide by 2 to count bits.</li>
                      <li><strong>Tree traversal height</strong>: a balanced tree has height O(log n).</li>
                      <li><strong>Exponentiation by squaring</strong>: reducing the exponent by half.</li>
                      <li><strong>Euclidean algorithm</strong>: the number of steps is O(log min(a,b)).</li>
                    </ul>
                  </p>
                  <p>
                    Think of it like a <strong>guessing game</strong>: if you have 1,000,000 possibilities, you can
                    find the correct one by asking "is it in the first half?" — you need only 20 questions.
                  </p>
                </div>
              </section>

              {/* ── Key Halving Problems ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Classic Halving Problems
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔢",
                      title: "Counting Bits",
                      desc: "Repeatedly divide n by 2 to count the number of binary digits.",
                      example: "n=13 → 13→6→3→1→0 → 4 bits",
                    },
                    {
                      icon: "🔎",
                      title: "Binary Search",
                      desc: "Find target in sorted array by comparing with middle and halving range.",
                      example: "n=1,000,000 → at most 20 comparisons",
                    },
                    {
                      icon: "🌳",
                      title: "Tree Height",
                      desc: "The maximum height of a balanced binary tree with n nodes.",
                      example: "n=1,000,000 → height ≈ 19",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Exponentiation",
                      desc: "Compute aⁿ by squaring the base and halving the exponent.",
                      example: "a¹⁰⁰ → O(log 100) steps",
                    },
                    {
                      icon: "🔢",
                      title: "Euclidean Algorithm (GCD)",
                      desc: "Repeatedly apply modulo operation, reducing numbers significantly.",
                      example: "gcd(1071, 462) → few steps",
                    },
                    {
                      icon: "🎯",
                      title: "Repeated Halving to Reach 1",
                      desc: "How many times can you halve n until you reach 1?",
                      example: "n=64 → 6 steps (64→32→16→8→4→2→1)",
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
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition: Halving Steps ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: The Halving Process
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Halving process visualization"
                  >
                    <rect x="50" y="30" width="700" height="40" rx="8" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="57" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">n = 1,048,576</text>
                    <animateTransform attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />

                    {/* Step 1 */}
                    <rect x="150" y="80" width="500" height="35" rx="8" fill="#34d399" opacity="0.7" />
                    <text x="400" y="104" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">524,288</text>

                    {/* Step 2 */}
                    <rect x="225" y="125" width="350" height="35" rx="8" fill="#34d399" opacity="0.7" />
                    <text x="400" y="149" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">262,144</text>

                    {/* Step 3 */}
                    <rect x="300" y="170" width="200" height="35" rx="8" fill="#34d399" opacity="0.7" />
                    <text x="400" y="194" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">131,072</text>

                    {/* Step 4 */}
                    <rect x="350" y="210" width="100" height="35" rx="8" fill="#34d399" opacity="0.7" />
                    <text x="400" y="234" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">65,536</text>

                    {/* ... eventually 1 after 20 steps */}
                    <text x="400" y="275" textAnchor="middle" fontSize="12" fill="#6b7280" className="dark:fill-gray-400">
                      ... after 20 halvings, we reach 1
                    </text>

                    {/* Arrows */}
                    <path d="M400 70 L400 80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow8)" />
                    <path d="M400 115 L400 125" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow8)" />
                    <path d="M400 160 L400 170" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow8)" />
                    <path d="M400 205 L400 210" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow8)" />
                    <defs>
                      <marker id="arrow8" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Each halving reduces the problem size by factor 2. After k halvings, size = n/2ᵏ. We stop when size = 1,
                    so k = log₂(n). For n = 2²⁰, k = 20.
                  </p>
                </div>
              </section>

              {/* ── The Math Behind Halving ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> The Mathematics
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    n → n/2 → n/4 → n/8 → ... → 1
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    After k steps: <strong>n / 2ᵏ = 1</strong> → <strong>k = log₂(n)</strong>
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    So any algorithm that halves the input in each iteration runs in <strong>O(log n)</strong> time.
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
                      tip: "Halving is a sign of logarithmic complexity",
                      desc: "If you see a problem being divided by 2, expect O(log n).",
                    },
                    {
                      tip: "Consider both integer and floating-point division",
                      desc: "In code, integer division truncates; be careful when n is small.",
                    },
                    {
                      tip: "Use bit shifts for division by 2",
                      desc: "n >> 1 is faster than n / 2 for integers (in many languages).",
                    },
                    {
                      tip: "Apply halving to recursion depth",
                      desc: "Divide-and-conquer recursion often has depth O(log n) when splitting evenly.",
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
                    <strong>Forgetting that halving produces O(log n), not O(1):</strong> Some beginners think that because
                    you're just dividing, it's constant time. But the number of divisions grows logarithmically.
                  </li>
                  <li>
                    <strong>Misapplying to unsorted data:</strong> Halving works only when the problem structure allows
                    discarding half (e.g., sorted arrays, balanced trees). Not all problems can be halved.
                  </li>
                  <li>
                    <strong>Integer overflow in n*2:</strong> When using doubling loops, ensure n*2 doesn't overflow.
                  </li>
                  <li>
                    <strong>Confusing halving with splitting:</strong> Some algorithms split into thirds or quarters; still
                    O(log n) with a different base (constant).
                  </li>
                  <li>
                    <strong>Not considering recursion stack:</strong> Recursive halving algorithms use O(log n) stack space,
                    which is usually fine but can be an issue in constrained environments.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> wrote a recursive binary search that ran perfectly, but she forgot that
                      the recursion depth for n=1e9 is only about 30, so it's safe.
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
                      <strong>Use while loops for halving</strong> when the number of iterations is not known in advance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Precompute log₂(n)</strong> if you need to know the number of steps (e.g., for arrays of
                      known size).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use bit shifts</strong> for performance: n &gt;&gt; 1 instead of n / 2.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider iterative instead of recursive</strong> to save stack space when depth is large
                      (though O(log n) is usually fine).
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
                    "✅ Can you identify halving in an algorithm?",
                    "✅ Do you know that halving gives O(log n) time?",
                    "✅ Can you compute the number of steps for a given n?",
                    "✅ Have you practiced writing loops that halve?",
                    "✅ Can you distinguish halving from other division patterns?",
                    "✅ Do you understand the relation between halving and logarithms?",
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
                    <strong>Observe carefully:</strong> If you have an array of 1024 elements and you halve it each time,
                    how many steps to reduce to 1 element? (That's log₂(1024)=10).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Write a loop that starts with n=1000 and halves until it reaches 0
                    (integer division). How many iterations? What if you used floating-point division?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Ichapur</strong> has 2048 students. If they keep
                    splitting into two equal groups, how many splits until each group has 1 student? That's log₂(2048)=11.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Repeated Division ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Repeated Division — Count Steps to Reach 1
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Computes how many times you can divide a number by 2 until it becomes 1. This is the essence of O(log n).
                </p>
                <JavaFileLoader
                  fileModule={repeatedDivisionJava}
                  title="RepeatedDivision.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Halving Steps ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Halving Steps — Compare Different Input Sizes
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Prints the number of halving steps for various powers of 2 and other numbers.
                </p>
                <JavaFileLoader
                  fileModule={halvingStepsJava}
                  title="HalvingSteps.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Search Count ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Search — Halving in Action
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Simulates binary search on an array, showing the halving range and counting steps.
                </p>
                <JavaFileLoader
                  fileModule={binarySearchCountJava}
                  title="BinarySearchCount.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Repeated Division and Halving Problems — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "The halving pattern is the most important intuition for understanding O(log n). I like to have students " +
              "physically simulate the process on paper: take a number like 64, divide by 2 repeatedly, and count the steps. " +
              "Then relate that to the logarithm. Also, emphasize that halving is not just about division by 2 — any constant " +
              "division (by 3, 4, 10) gives O(log n) with a different base, which is still O(log n) in Big-O. " +
              "This is a pattern students will see everywhere in algorithms: binary search, tree operations, fast exponentiation, " +
              "and many more. Make sure they can recognize it in code."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 8 · Repeated Division and Halving Problems · Built with ❤️ for the classroom</p>
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

export default Topic8;