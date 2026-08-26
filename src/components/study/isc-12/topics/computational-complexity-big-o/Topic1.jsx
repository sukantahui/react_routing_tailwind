import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import sumArrayJava from "./topic1_files/SumArray.java?raw";
import nestedLoopJava from "./topic1_files/NestedLoop.java?raw";
import timeComplexityDemoJava from "./topic1_files/TimeComplexityDemo.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic1_files/topic1_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic1 = () => {
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
              Topic 1
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Foundations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Introduction to Time Complexity
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Moving from <span className="text-indigo-600 dark:text-indigo-400 font-semibold">"why it matters"</span>{" "}
            to <span className="italic">"how we measure it"</span> — the fundamental metric of algorithm efficiency.
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
                  <span className="text-indigo-500">●</span> What is Time Complexity?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Time complexity</strong> is a computational metric that describes the amount of computer
                    time an algorithm takes to run, as a function of the length of the input. It estimates how the
                    runtime <em>scales</em> as the input size grows, independent of hardware or implementation details.
                  </p>
                  <p>
                    Think of it as a <strong>rating system</strong> for algorithms. Instead of saying "this takes 2.5 seconds"
                    (which depends on the machine), we say "this takes <strong>O(n)</strong> operations" (which is
                    machine-independent). This allows us to compare algorithms objectively.
                  </p>
                  <p>
                    <strong>Swadeep</strong> writes a loop to find a number in a list. <strong>Tuhina</strong> writes
                    a nested loop to compare all pairs. Even before running the code, time complexity tells us that
                    Tuhina's code will eventually become much slower for large lists.
                  </p>
                </div>
              </section>

              {/* ── Why It Matters ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Purpose & Real-World Usage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔮",
                      title: "Predict Performance",
                      desc: "Estimate how an algorithm will behave when input sizes increase (e.g., from 100 to 1,000,000 records).",
                    },
                    {
                      icon: "⚖️",
                      title: "Compare Algorithms",
                      desc: "Objectively decide between two solutions (e.g., O(n) vs O(n²)) without running benchmarks.",
                    },
                    {
                      icon: "🏗️",
                      title: "Guide Design Choices",
                      desc: "Identify bottlenecks and choose the right data structures (e.g., HashMap vs List).",
                    },
                    {
                      icon: "💼",
                      title: "Industry Interviews",
                      desc: "Time complexity analysis is a core skill tested in software engineering interviews at top companies.",
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
                  <span className="text-indigo-500">●</span> Visual Intuition
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Time complexity visualization"
                  >
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" className="dark:fill-gray-400" />
                      </marker>
                    </defs>

                    {/* Background grid */}
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

                    {/* Axis labels */}
                    <text x="400" y="380" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">
                      Input Size (n)
                    </text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">
                      Operations
                    </text>

                    {/* O(1) — Constant */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" />
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold" className="dark:fill-indigo-400">
                      O(1) – Constant
                    </text>
                    <text x="760" y="320" textAnchor="end" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Best
                    </text>

                    {/* O(log n) — Logarithmic */}
                    <path
                      d="M60 340 L200 260 L340 200 L480 160 L620 130 L760 110"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text x="770" y="112" fontSize="12" fill="#34d399" fontWeight="bold" className="dark:fill-emerald-400">
                      O(log n) – Logarithmic
                    </text>

                    {/* O(n) — Linear */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="82" fontSize="12" fill="#f472b6" fontWeight="bold" className="dark:fill-pink-400">
                      O(n) – Linear
                    </text>

                    {/* O(n log n) — Linearithmic */}
                    <path
                      d="M60 340 C200 280 340 200 480 140 C560 110 640 90 760 60"
                      fill="none"
                      stroke="#a78bfa"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                    />
                    <text x="770" y="62" fontSize="12" fill="#a78bfa" fontWeight="bold" className="dark:fill-violet-400">
                      O(n log n) – Linearithmic
                    </text>

                    {/* O(n²) — Quadratic */}
                    <path
                      d="M60 348 Q100 340 200 290 Q300 200 400 140 Q500 90 600 60 Q700 50 760 48"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text x="770" y="50" fontSize="12" fill="#fbbf24" fontWeight="bold" className="dark:fill-amber-400">
                      O(n²) – Quadratic
                    </text>

                    <text x="760" y="370" textAnchor="end" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">
                      Worst
                    </text>

                    {/* Animated scanning line */}
                    <line x1="200" y1="340" x2="200" y2="260" stroke="#34d399" strokeWidth="2" opacity="0.6">
                      <animate attributeName="x1" values="200;600;200" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="x2" values="200;600;200" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    As input size <strong>n</strong> grows, the number of operations dictates the algorithm's feasibility.
                    Constant and logarithmic complexities scale beautifully; quadratic and exponential do not.
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
                      tip: "Focus on the dominant term",
                      desc: "In Big-O, we drop lower-order terms. For example, O(n² + n) becomes O(n²).",
                    },
                    {
                      tip: "Define 'n' clearly",
                      desc: "Always specify what 'n' represents (e.g., length of array, number of nodes, etc.).",
                    },
                    {
                      tip: "Think worst-case first",
                      desc: "It's safer to assume the worst-case scenario when comparing algorithms.",
                    },
                    {
                      tip: "Amortized analysis",
                      desc: "Some data structures have occasional expensive operations but are cheap on average (e.g., dynamic arrays).",
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
                    <strong>Confusing time with speed:</strong> Time complexity is about the <em>number of operations</em>,
                    not wall-clock time. A faster CPU doesn't change the Big-O.
                  </li>
                  <li>
                    <strong>Ignoring constants:</strong> While Big-O ignores constants, a O(n) algorithm with a huge constant
                    (like 1000n) can be worse than O(n²) for small n. Always consider the practical context.
                  </li>
                  <li>
                    <strong>Misidentifying the input:</strong> If you have multiple inputs (e.g., n and m), the time complexity
                    should be expressed as O(n + m) or O(n * m), not just O(n).
                  </li>
                  <li>
                    <strong>Only counting loops:</strong> Don't forget about operations inside the loops (e.g., method calls,
                    complex arithmetic) that might themselves have a cost.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once analyzed a loop as O(n), forgetting that the inner operation
                      was O(n) as well, resulting in O(n²).
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
                      <strong>Define your input size</strong> — explicitly state what 'n' or 'm' represents.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Analyze the worst-case</strong> — it gives you the upper bound on performance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Simplify your notation</strong> — drop constants and lower-order terms.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Practice on real code</strong> — take your own projects and analyze the complexity of
                      different parts.
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
                    "✅ Have you clearly identified the input size (n)?",
                    "✅ Have you counted all significant operations?",
                    "✅ Have you dropped constants and lower-order terms?",
                    "✅ Have you considered the worst-case scenario?",
                    "✅ Have you validated your analysis with a few test runs?",
                    "✅ Can you explain the time complexity in simple terms?",
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
                    <strong>Observe carefully:</strong> How does the number of operations change when you double the
                    input size? Does it double? Quadruple? Stay the same?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have a nested loop, what happens to the time complexity
                    if the inner loop runs a constant number of times instead of 'n' times?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 5,000 students.
                    If a sorting algorithm takes O(n²) time, how many operations does it perform? What if it's O(n log n)?
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Sum Array (O(n)) ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sum of Array Elements — O(n) Linear Time
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A single loop iterating over 'n' elements results in O(n) time complexity. The runtime grows
                  linearly with the input size.
                </p>
                <JavaFileLoader
                  fileModule={sumArrayJava}
                  title="SumArray.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Nested Loop (O(n²)) ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Nested Loop — O(n²) Quadratic Time
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A loop inside another loop results in O(n²) time complexity. This quickly becomes impractical
                  for large input sizes.
                </p>
                <JavaFileLoader
                  fileModule={nestedLoopJava}
                  title="NestedLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Time Complexity Demo ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Time Complexity Demo — Comparing Growth Rates
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This demo compares the runtime of O(n), O(n) with a constant inner loop, and true O(n²) to
                  illustrate the practical differences in performance.
                </p>
                <JavaFileLoader
                  fileModule={timeComplexityDemoJava}
                  title="TimeComplexityDemo.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Introduction to Time Complexity — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Time complexity is the language we use to talk about algorithm efficiency. It's easy to memorize " +
              "Big-O classes, but the real skill is identifying the dominant operation in your code. When students " +
              "like Abhronila or Susmita ask 'Why is my loop so slow?', the answer almost always lies in the time " +
              "complexity. Remember, we don't care about the clock time; we care about the growth. Teach them to " +
              "ask: 'What happens when the input size doubles?' This question is the essence of time complexity " +
              "analysis."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 1 · Introduction to Time Complexity · Built with ❤️ for the classroom</p>
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

export default Topic1;