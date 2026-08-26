import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import constantSpaceJava from "./topic2_files/ConstantSpace.java?raw";
import linearSpaceJava from "./topic2_files/LinearSpace.java?raw";
import recursiveSpaceJava from "./topic2_files/RecursiveSpace.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic2_files/topic2_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic2 = () => {
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
              Topic 2
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Foundations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Introduction to Space Complexity
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding how much <span className="text-indigo-600 dark:text-indigo-400 font-semibold">memory</span>{" "}
            an algorithm needs — the often-overlooked partner to time complexity.
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
                  <span className="text-indigo-500">●</span> What is Space Complexity?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Space complexity</strong> measures the amount of memory an algorithm uses as a function
                    of the input size. It includes both the memory needed for the input itself (which is usually fixed)
                    and the <em>auxiliary (extra) space</em> the algorithm uses during execution — such as temporary
                    variables, data structures, and recursion call stacks.
                  </p>
                  <p>
                    While time complexity often steals the spotlight, space complexity is equally critical,
                    especially in memory-constrained environments like embedded systems, mobile devices, or
                    large-scale data processing.
                  </p>
                  <p>
                    Think of it like this: <strong>Swadeep</strong> sorts a list by creating a new array for the
                    result (using O(n) extra space). <strong>Tuhina</strong> sorts the list in place (using O(1)
                    extra space). Both sort correctly, but Tuhina's approach is more memory-efficient — and that
                    can be a game-changer when n is huge.
                  </p>
                </div>
              </section>

              {/* ── Why It Matters ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why Does Space Complexity Matter?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🧠",
                      title: "Memory Constraints",
                      desc: "In embedded systems, IoT devices, or mobile phones, available RAM is limited — algorithms with high space complexity may crash.",
                    },
                    {
                      icon: "⚡",
                      title: "Performance Impact",
                      desc: "Excessive memory usage can cause cache misses, leading to slower execution — even if time complexity is good.",
                    },
                    {
                      icon: "💰",
                      title: "Cost Efficiency",
                      desc: "In cloud computing, memory usage directly impacts cost. Less memory means smaller instance sizes and lower bills.",
                    },
                    {
                      icon: "🔄",
                      title: "Trade-Off Analysis",
                      desc: "Often we must balance time and space: you can trade memory for speed (caching) or speed for memory (streaming).",
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
                  <span className="text-indigo-500">●</span> Visual Intuition: Space Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Space complexity comparison"
                  >
                    <defs>
                      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
                      Input Size (n)
                    </text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">
                      Memory Used
                    </text>

                    {/* O(1) – Constant */}
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.8" rx="2" />
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold" className="dark:fill-indigo-400">
                      O(1) – Constant
                    </text>

                    {/* O(log n) – Logarithmic */}
                    <path
                      d="M60 340 L200 280 L340 230 L480 190 L620 160 L760 140"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text x="770" y="142" fontSize="12" fill="#34d399" fontWeight="bold" className="dark:fill-emerald-400">
                      O(log n) – Logarithmic
                    </text>

                    {/* O(n) – Linear */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="82" fontSize="12" fill="#f472b6" fontWeight="bold" className="dark:fill-pink-400">
                      O(n) – Linear
                    </text>

                    {/* O(n²) – Quadratic (dashed) */}
                    <path
                      d="M60 348 Q100 340 200 290 Q300 200 400 140 Q500 90 600 60 Q700 50 760 48"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                    />
                    <text x="770" y="50" fontSize="12" fill="#fbbf24" fontWeight="bold" className="dark:fill-amber-400">
                      O(n²) – Quadratic
                    </text>

                    {/* Animated block representing memory allocation */}
                    <rect x="100" y="280" width="20" height="20" fill="#f472b6" opacity="0.6" rx="4">
                      <animate attributeName="width" values="20;300;20" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
                    </rect>
                    <text x="120" y="320" fontSize="10" fill="#6b7280" className="dark:fill-gray-400">
                      Memory usage grows with n
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Space complexity follows similar growth patterns as time. Constant and logarithmic space are
                    memory-efficient; linear and quadratic space can become problematic for large inputs.
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
                      tip: "Distinguish input vs auxiliary space",
                      desc: "Space complexity often refers to extra (auxiliary) space, not counting the input itself.",
                    },
                    {
                      tip: "Be mindful of recursion",
                      desc: "Recursive algorithms may have O(n) stack space even if no explicit data structures are used.",
                    },
                    {
                      tip: "Use in-place algorithms when possible",
                      desc: "In-place sorting (like heap sort) uses O(1) extra space, saving memory.",
                    },
                    {
                      tip: "Consider caching and memoization",
                      desc: "Storing computed results can increase space but dramatically reduce time.",
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
                    <strong>Ignoring recursion stack:</strong> Many beginners forget that recursive calls consume
                    O(depth) memory. A recursive depth of O(n) uses O(n) stack space.
                  </li>
                  <li>
                    <strong>Confusing input memory with auxiliary memory:</strong> The input already occupies memory —
                    space complexity typically measures additional memory used by the algorithm.
                  </li>
                  <li>
                    <strong>Assuming all O(1) space is the same:</strong> O(1) means constant, but the constant could
                    be large (e.g., 1000 variables). Still, it's independent of n.
                  </li>
                  <li>
                    <strong>Overlooking memory fragmentation:</strong> In some languages, dynamic allocation can
                    lead to fragmentation overhead, increasing actual memory usage.
                  </li>
                  <li>
                    <strong>Forgetting about garbage collection:</strong> In garbage-collected languages, memory may
                    not be freed immediately, affecting space complexity.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once wrote a recursive function that built a huge string,
                      causing a stack overflow because he forgot about the string's memory allocation.
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
                      <strong>Prefer in-place algorithms</strong> when memory is tight, especially for large data.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Mention both time and space complexity</strong> when documenting your code.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider using iterative solutions</strong> over recursive ones if stack space is limited.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test memory usage</strong> with real data and profiling tools (like VisualVM, JProfiler).
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
                    "✅ Have you identified the extra (auxiliary) space needed?",
                    "✅ Have you considered the recursion stack space?",
                    "✅ Is the memory usage constant, linear, or worse?",
                    "✅ Are there data structures that can be replaced to reduce memory?",
                    "✅ Have you tested with maximum input size?",
                    "✅ Is the space complexity acceptable for the environment?",
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
                    <strong>Observe carefully:</strong> If you create a new array of size n, what is the space complexity?
                    What if you only use a few variables?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Convert a recursive function to an iterative one — what happens
                    to the space complexity?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> stores student records in a
                    database. If the database uses an index (which takes extra space), is the trade-off worth it for
                    faster queries?
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Constant Space ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Constant Space — O(1) Auxiliary Memory
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This algorithm uses only a few variables (constant space) regardless of input size.
                </p>
                <JavaFileLoader
                  fileModule={constantSpaceJava}
                  title="ConstantSpace.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Linear Space ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear Space — O(n) Auxiliary Memory
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This algorithm creates a new array or data structure proportional to the input size.
                </p>
                <JavaFileLoader
                  fileModule={linearSpaceJava}
                  title="LinearSpace.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Recursive Space ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Space — O(n) Call Stack
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Even without extra data structures, recursion can use O(n) space due to the call stack.
                </p>
                <JavaFileLoader
                  fileModule={recursiveSpaceJava}
                  title="RecursiveSpace.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Introduction to Space Complexity — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Space complexity is often the silent killer of algorithms. Students may optimize time but forget " +
              "that memory is finite. In real-world systems, a memory-efficient O(n log n) algorithm often beats " +
              "a faster O(n²) algorithm that uses massive memory. Encourage your students to always ask: " +
              "'What’s the memory footprint?' — especially when dealing with large datasets. Show them examples " +
              "where a simple in-place swap saves gigabytes of RAM. And remind them that in interviews, " +
              "space complexity is just as important as time complexity."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 2 · Introduction to Space Complexity · Built with ❤️ for the classroom</p>
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

export default Topic2;