import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import sequentialLoopsJava from "./topic15_files/SequentialLoops.java?raw";
import dominantTermJava from "./topic15_files/DominantTerm.java?raw";
import combinedLoopsJava from "./topic15_files/CombinedLoops.java?raw";
import multipleVariablesJava from "./topic15_files/MultipleVariables.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic15_files/topic15_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic15 = () => {
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
              Topic 15
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Loop Complexity
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Multiple Loops
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding how to analyze <span className="text-indigo-600 dark:text-indigo-400 font-semibold">multiple loops</span>{" "}
            that appear in sequence — combining nested and sequential loops, and handling different input variables.
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
                  <span className="text-indigo-500">●</span> What Are Multiple Loops?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    In many algorithms, you'll find <strong>multiple loops</strong> — some nested, some sequential,
                    or a combination of both. When analyzing such code, you <strong>add</strong> the complexities
                    of loops that run one after another (sequential), and <strong>multiply</strong> the complexities
                    of nested loops.
                  </p>
                  <p>
                    The key principle: <strong>sum the complexities of sequential blocks, take the dominant term</strong>
                    (the fastest-growing one), because constants and lower-order terms are dropped in Big-O notation.
                  </p>
                  <p>
                    Think of it like a teacher's workday: first, she grades homework (O(n) time), then she enters grades
                    into a spreadsheet (O(m) time). The total is O(n + m). If both tasks are for the same set of students
                    (n = m), it's O(n) — because two linear tasks are still linear. If one task is O(n²) (checking all
                    pairs of assignments), then the total is O(n²), regardless of the other O(n) tasks.
                  </p>
                </div>
              </section>

              {/* ── Key Concepts ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Key Concepts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "➕",
                      title: "Sequential Loops (Add)",
                      desc: "Loops that run one after another: total = sum of individual complexities.",
                      example: "O(n) + O(m) = O(n+m)",
                    },
                    {
                      icon: "✖️",
                      title: "Nested Loops (Multiply)",
                      desc: "Loops inside other loops: total = product of complexities.",
                      example: "O(n) * O(m) = O(n·m)",
                    },
                    {
                      icon: "📊",
                      title: "Dominant Term",
                      desc: "When summing, keep the fastest-growing term (drop lower-order).",
                      example: "O(n²) + O(n) = O(n²)",
                    },
                    {
                      icon: "🔢",
                      title: "Multiple Variables",
                      desc: "Different input sizes (n, m, k) may appear; keep them in the final expression.",
                      example: "O(n² + m·k)",
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
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Sequential vs Nested
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 250"
                    className="w-full h-auto max-h-56"
                    role="img"
                    aria-label="Multiple loops visualization"
                  >
                    {/* Sequential */}
                    <rect x="50" y="30" width="200" height="40" rx="8" fill="#f472b6" opacity="0.8" />
                    <text x="150" y="57" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Loop A: O(n)</text>
                    <text x="150" y="90" textAnchor="middle" fontSize="12" fill="#6b7280">+</text>

                    <rect x="50" y="100" width="200" height="40" rx="8" fill="#34d399" opacity="0.8" />
                    <text x="150" y="127" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Loop B: O(m)</text>
                    <text x="150" y="160" textAnchor="middle" fontSize="12" fill="#6b7280">= O(n + m)</text>

                    {/* Nested */}
                    <rect x="400" y="30" width="200" height="40" rx="8" fill="#818cf8" opacity="0.8" />
                    <text x="500" y="57" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Outer O(n)</text>
                    <rect x="420" y="80" width="160" height="40" rx="8" fill="#a78bfa" opacity="0.8" />
                    <text x="500" y="107" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inner O(m)</text>
                    <text x="500" y="140" textAnchor="middle" fontSize="12" fill="#6b7280">= O(n · m)</text>

                    <text x="300" y="150" textAnchor="middle" fontSize="18" fill="#6b7280">vs</text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Sequential loops add their complexities; nested loops multiply. When combined, the dominant term determines the overall complexity.
                  </p>
                </div>
              </section>

              {/* ── How to Analyze Multiple Loops ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Step-by-Step Analysis
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 1: Identify all loops (sequential and nested)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Separate independent blocks and nested structures.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 2: Compute complexity of each block</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">For nested: multiply; for sequential: sum.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 3: Combine using addition</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add all block complexities: O(f₁) + O(f₂) + ...</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Step 4: Simplify by keeping the dominant term</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drop lower-order terms and constants.</p>
                  </div>
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Example 1:</span>{" "}
                      A sorting algorithm (O(n log n)) followed by a linear search (O(n)). Total = O(n log n) + O(n) = O(n log n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Example 2:</span>{" "}
                      Two nested loops (O(n²)) followed by a single loop (O(n)). Total = O(n²) + O(n) = O(n²).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Example 3:</span>{" "}
                      Processing an array of size n (O(n)), then a matrix of size n×m (O(n·m)). Total = O(n + n·m) = O(n·m) if m &gt; 1.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Example 4:</span>{" "}
                      A school in <strong>Barrackpore</strong> has n students. First, the teacher takes attendance (O(n)),
                      then checks each student's homework (O(n)), then calculates the class average (O(n)). Total O(3n) = O(n).
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
                      tip: "Always add sequential complexities",
                      desc: "Don't multiply sequential loops; only nested loops multiply.",
                    },
                    {
                      tip: "Keep all variables in the expression",
                      desc: "If you have n, m, k, keep them distinct until you know their relationship.",
                    },
                    {
                      tip: "Drop lower-order terms carefully",
                      desc: "If O(n²) and O(n log n) are present, the O(n²) dominates.",
                    },
                    {
                      tip: "Watch for hidden loops inside functions",
                      desc: "A method call might contain its own loops; analyze its complexity too.",
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
                    <strong>Multiplying sequential loops:</strong> Some beginners mistakenly multiply O(n) + O(n) as O(n²),
                    but it should be O(n) + O(n) = O(n).
                  </li>
                  <li>
                    <strong>Adding nested loops:</strong> You cannot add O(n) * O(m); it's multiplicative, not additive.
                  </li>
                  <li>
                    <strong>Dropping terms that are not lower-order:</strong> If you have O(n²) + O(n²), you drop the constant,
                    not the term itself. The result is O(n²).
                  </li>
                  <li>
                    <strong>Ignoring hidden complexities in function calls:</strong> A loop that calls a method that itself
                    loops over the same input may increase complexity.
                  </li>
                  <li>
                    <strong>Assuming all variables are the same:</strong> If you have two different input sizes, keep them
                    separate (e.g., O(n + m)) until you know they are proportional.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> once analyzed a function with two loops over different arrays as O(n) when
                      they were actually O(n + m) — she forgot the second variable.
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
                      <strong>Separate independent blocks clearly</strong> to avoid confusion between sequential and nested.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always state the variables</strong> in your complexity expression (e.g., O(n + m)).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Simplify only after combining all terms</strong> — don't simplify individual blocks prematurely.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Check the worst-case</strong> — if any loop depends on input, use its worst-case bound.
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
                    "✅ Can you distinguish sequential from nested loops?",
                    "✅ Do you know when to add vs multiply complexities?",
                    "✅ Can you combine multiple loop blocks into a single expression?",
                    "✅ Can you identify the dominant term in a sum of complexities?",
                    "✅ Can you handle multiple input variables (n, m, k)?",
                    "✅ Have you practiced analyzing code with both sequential and nested loops?",
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
                    <strong>Observe carefully:</strong> If you have two loops, one O(n) and one O(n²), what is the total?
                    The O(n²) dominates, so total = O(n²).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you have three loops: O(n), O(log n), O(n log n)? Which dominates?
                    O(n log n) dominates because it's larger than O(n) and O(log n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Shyamnagar</strong> has n students. The teacher first
                    takes attendance (O(n)), then checks each student's homework (O(n)), then enters grades (O(n)).
                    The total is O(3n) = O(n). If the teacher also compares all pairs of homework assignments (O(n²)),
                    the total becomes O(n²) + O(n) = O(n²).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Sequential Loops ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Sequential Loops — O(n) + O(m) = O(n+m)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates multiple loops running one after another, with different input sizes.
                </p>
                <JavaFileLoader
                  fileModule={sequentialLoopsJava}
                  title="SequentialLoops.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Dominant Term ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Dominant Term — O(n²) + O(n) = O(n²)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows how the dominant term determines the overall complexity when combining different rates.
                </p>
                <JavaFileLoader
                  fileModule={dominantTermJava}
                  title="DominantTerm.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Combined Loops ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Combined Loops — Both Sequential and Nested
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes a method that contains both nested loops and sequential loops, showing how to combine them.
                </p>
                <JavaFileLoader
                  fileModule={combinedLoopsJava}
                  title="CombinedLoops.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Multiple Variables ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Multiple Variables — O(n² + m·k)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Handles cases where different parts of the code depend on different input sizes (n, m, k).
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
                title="Complexity of Multiple Loops — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "The analysis of multiple loops is about applying the rules of addition and multiplication correctly. " +
              "I often use the analogy of a factory assembly line: each station (loop) adds its time; if a station " +
              "has sub-stations (nested loops), its time is the product of their times. The total time is the sum " +
              "of all stations, but the slowest station dominates. This helps students understand why we drop " +
              "lower-order terms. Practice with examples that mix nested and sequential loops; it's a common pattern " +
              "in real code. Also, remind them to always consider if the loops are truly sequential or if there's " +
              "an implicit nesting (e.g., one loop calling a function that loops over the same data)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 15 · Complexity of Multiple Loops · Built with ❤️ for the classroom</p>
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

export default Topic15;