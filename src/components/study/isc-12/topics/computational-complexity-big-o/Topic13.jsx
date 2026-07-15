import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import linearLoopJava from "./topic13_files/LinearLoop.java?raw";
import logarithmicLoopJava from "./topic13_files/LogarithmicLoop.java?raw";
import sqrtLoopJava from "./topic13_files/SqrtLoop.java?raw";
import multipleVariablesJava from "./topic13_files/MultipleVariables.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic13_files/topic13_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic13 = () => {
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
              Topic 13
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Loop Complexity
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Single Loops
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the time complexity of <span className="text-indigo-600 dark:text-indigo-400 font-semibold">single loops</span> —
            the building blocks of algorithm analysis.
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
                  <span className="text-indigo-500">●</span> What is a Single Loop?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>single loop</strong> is a control structure that iterates a set number of times or
                    until a condition is met. The time complexity of a single loop is determined by the number
                    of iterations it performs and the work done inside each iteration.
                  </p>
                  <p>
                    Analyzing single loops is the first step in understanding algorithm complexity. We count the
                    number of times the loop body executes as a function of the input size <strong>n</strong>.
                  </p>
                  <p>
                    Think of it like a teacher grading papers: if there are <strong>n</strong> students, and the
                    teacher checks each paper once, the work is <strong>O(n)</strong>. If the teacher stops early
                    (e.g., finds a specific answer), the complexity may change.
                  </p>
                </div>
              </section>

              {/* ── Common Patterns ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Single Loop Patterns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      pattern: "Linear (O(n))",
                      desc: "Loop runs exactly n times, incrementing by 1.",
                      example: "for (int i = 0; i < n; i++) { ... }",
                    },
                    {
                      pattern: "Logarithmic (O(log n))",
                      desc: "Loop variable doubles or halves each iteration.",
                      example: "for (int i = 1; i < n; i *= 2) { ... }",
                    },
                    {
                      pattern: "Square Root (O(√n))",
                      desc: "Loop runs up to √n times.",
                      example: "for (int i = 1; i*i <= n; i++) { ... }",
                    },
                    {
                      pattern: "Constant (O(1))",
                      desc: "Loop runs a fixed number of times, independent of n.",
                      example: "for (int i = 0; i < 10; i++) { ... }",
                    },
                    {
                      pattern: "Two variables (O(n+m))",
                      desc: "Loop runs based on multiple inputs.",
                      example: "for (int i = 0; i < n && i < m; i++) { ... }",
                    },
                    {
                      pattern: "Conditional break (O(n) worst)",
                      desc: "Loop may break early, but worst-case is O(n).",
                      example: "while (i < n && arr[i] != target) { i++; }",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.pattern}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Loop Iterations
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Single loop iterations"
                  >
                    <defs>
                      <marker id="arrow13" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="137" x2="760" y2="137" />
                      <line x1="60" y1="224" x2="760" y2="224" />
                      <line x1="60" y1="50" x2="60" y2="350" />
                      <line x1="207" y1="50" x2="207" y2="350" />
                      <line x1="354" y1="50" x2="354" y2="350" />
                      <line x1="501" y1="50" x2="501" y2="350" />
                      <line x1="648" y1="50" x2="648" y2="350" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="300" x2="760" y2="300" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="350" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="330" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">Iterations</text>

                    {/* O(n) — linear */}
                    <line x1="60" y1="300" x2="760" y2="50" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#f472b6" fontWeight="bold">O(n)</text>

                    {/* O(log n) */}
                    <path d="M60 300 L200 260 L340 220 L480 180 L620 140 L760 100" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="105" fontSize="12" fill="#34d399" fontWeight="bold">O(log n)</text>

                    {/* O(√n) */}
                    <path d="M60 300 L200 280 L340 250 L480 210 L620 160 L760 110" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
                    <text x="770" y="115" fontSize="12" fill="#a78bfa" fontWeight="bold">O(√n)</text>

                    {/* O(1) */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" />
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold">O(1)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="200" r="6" fill="#f472b6">
                      <animate attributeName="cx" values="60;700;60" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="300;50;300" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="fill" values="#f472b6;#34d399;#f472b6" dur="5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The number of iterations grows differently depending on the loop pattern.
                    Linear loops are the most common, but logarithmic and square-root loops are much more efficient.
                  </p>
                </div>
              </section>

              {/* ── How to Analyze a Single Loop ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How to Analyze a Single Loop
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Identify the input size</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Usually n, but could be m, or multiple variables.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Determine the number of iterations</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How does the loop variable change? Increment by 1 → O(n). Double → O(log n).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Count the work inside the loop</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">If the body is O(1), the total is O(iterations). If the body has its own complexity, multiply.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Simplify using Big-O rules</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drop constants and lower-order terms.</p>
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
                      tip: "Look at the loop variable change",
                      desc: "i++ → O(n), i *= 2 → O(log n), i += c → O(n) (constant step).",
                    },
                    {
                      tip: "Check for early breaks",
                      desc: "If the loop can break early, the worst-case is still O(n) but best-case may be Ω(1).",
                    },
                    {
                      tip: "Consider nested loops separately",
                      desc: "Single loops are easy; nested loops multiply complexities.",
                    },
                    {
                      tip: "Be careful with floating-point loops",
                      desc: "Floating-point increments can be imprecise; use integer loops when possible.",
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
                    <strong>Assuming all loops are O(n):</strong> Loops that double or halve are O(log n), not O(n).
                  </li>
                  <li>
                    <strong>Counting the loop variable incorrectly:</strong> In for (int i = 1; i &lt; n; i *= 2), the number of
                    iterations is floor(log₂(n)) + 1, not n.
                  </li>
                  <li>
                    <strong>Ignoring constant-time operations inside the loop:</strong> Even if the body is O(1), the total
                    is O(iterations). If the body is O(n), the total is O(n²) for a single loop? Actually if body is O(n)
                    and loop runs O(n), total O(n²). That's a nested loop in disguise.
                  </li>
                  <li>
                    <strong>Forgetting about the condition check:</strong> Each iteration also checks the condition,
                    but that's constant time and ignored.
                  </li>
                  <li>
                    <strong>Misapplying Big-O to loops with multiple inputs:</strong> If the loop runs based on n and m,
                    the complexity is O(n+m) or O(n*m) depending on the loop structure.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> once analyzed a loop that iterated over a 2D array as O(n²) but
                      the dimensions were actually n and m, so it should be O(n*m).
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
                      <strong>Write down the loop invariant</strong> — the relationship between the loop variable and n.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use meaningful variable names</strong> like i, j, k for loops, but clarify what they represent.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test with different n values</strong> to verify your complexity analysis empirically.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document the complexity</strong> in comments, especially for non-obvious loops.
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
                    "✅ Can you identify the input size (n) in a loop?",
                    "✅ Can you count the number of iterations for a given loop?",
                    "✅ Do you recognize O(n), O(log n), O(√n) loops?",
                    "✅ Can you handle loops with multiple variables (n and m)?",
                    "✅ Can you account for early breaks in worst-case analysis?",
                    "✅ Have you practiced analyzing loops from code snippets?",
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
                    <strong>Observe carefully:</strong> How many times does the loop run in for (int i = 1; i &lt; n; i *= 2)?
                    What about for (int i = n; i &gt; 0; i /= 2)?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the loop increments by 3 instead of 1? The complexity
                    is still O(n) because 3 is a constant.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Naihati</strong> has n students. If a teacher
                    checks each student's homework one by one, that's O(n). If the teacher checks every other student,
                    it's still O(n) because the constant factor is ignored.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Linear Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear Loop — O(n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A simple loop that increments by 1. The number of iterations is exactly n.
                </p>
                <JavaFileLoader
                  fileModule={linearLoopJava}
                  title="LinearLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Logarithmic Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Logarithmic Loop — O(log n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Loops where the variable doubles or halves each iteration.
                </p>
                <JavaFileLoader
                  fileModule={logarithmicLoopJava}
                  title="LogarithmicLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Square Root Loop ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Square Root Loop — O(√n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Loops that run until i*i ≤ n, resulting in O(√n) iterations.
                </p>
                <JavaFileLoader
                  fileModule={sqrtLoopJava}
                  title="SqrtLoop.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Multiple Variables ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Multiple Variables — O(n+m) and O(n*m)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Loops that depend on two input sizes. Shows additive vs multiplicative complexity.
                </p>
                <JavaFileLoader
                  fileModule={multipleVariablesJava}
                  title="MultipleVariables.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Single Loops — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Single loops are the most fundamental control structure in programming, and analyzing their complexity " +
              "is the first skill students should master. I always start with the simple linear loop, then move to " +
              "logarithmic and square-root patterns. Emphasize that the key is the loop variable's update pattern. " +
              "Have students practice identifying the number of iterations by writing out small values of n. " +
              "For example, for (int i=1; i<n; i*=2), ask them to count iterations for n=10, 20, 50. " +
              "This builds intuition. Also, remind them that the work inside the loop matters — if the body is O(n), " +
              "the total becomes O(n²) even with a single loop."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 13 · Complexity of Single Loops · Built with ❤️ for the classroom</p>
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

export default Topic13;