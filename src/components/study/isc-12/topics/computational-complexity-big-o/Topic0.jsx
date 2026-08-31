import React, { useState, useMemo } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import slowVsFastJava from "./topic0_files/SlowVsFast.java?raw";
import linearVsQuadraticJava from "./topic0_files/LinearVsQuadratic.java?raw";
import realWorldImpactJava from "./topic0_files/RealWorldImpact.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic0_files/topic0_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic0 = () => {
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
              Topic 0
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Foundations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Why Algorithm Analysis Matters
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Understanding the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">"why"</span> behind
            measuring algorithm performance — before we learn the <span className="italic">"how"</span>.
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
                  <span className="text-indigo-500">●</span> What Is Algorithm Analysis?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Algorithm analysis is the systematic study of how an algorithm's <strong>runtime</strong> and{" "}
                    <strong>memory usage</strong> scale as the input size grows. It's not about{" "}
                    <em>how fast</em> your computer is — it's about <em>how efficiently</em> your algorithm solves
                    the problem, independent of hardware.
                  </p>
                  <p>
                    Think of it like this: <strong>Swadeep</strong> and <strong>Tuhina</strong> are both given the same
                    task — finding a name in a phonebook of 1 million entries. Swadeep reads from page 1, one name
                    at a time. Tuhina opens the book in the middle, compares, and halves the search space each time.
                    Both find the name, but one does it in <strong>seconds</strong>, the other in{" "}
                    <strong>hours</strong>. <em>That</em> is the difference algorithm analysis captures.
                  </p>
                </div>
              </section>

              {/* ── Why It Matters ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Why Does It Matter?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "⚡",
                      title: "Performance at Scale",
                      desc: "An algorithm that works well for 100 items may become unusable for 100,000. Analysis helps you choose the right tool for the job.",
                    },
                    {
                      icon: "💰",
                      title: "Cost Efficiency",
                      desc: "Faster algorithms mean lower cloud bills, less energy consumption, and happier users.",
                    },
                    {
                      icon: "🧠",
                      title: "Design Insight",
                      desc: "Analysis reveals bottlenecks and guides you toward smarter design decisions.",
                    },
                    {
                      icon: "📈",
                      title: "Future-Proofing",
                      desc: "As data grows, a well-analyzed algorithm scales predictably — no surprises.",
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

              {/* ── Real-World Stories ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Impact
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      story:
                        "In 2015, a major e-commerce company saved <strong>$40 million</strong> by optimizing a single sorting algorithm. The fix? Reducing time complexity from O(n²) to O(n log n).",
                      note: "— Engineering team, after a 3-month performance audit",
                    },
                    {
                      story:
                        "A mapping application in Kolkata — serving areas from <strong>Barrackpore</strong> to <strong>Naihati</strong> — reduced route calculation time from 8 seconds to 0.3 seconds by switching from a brute-force path search to A* with proper heuristics.",
                      note: "— Lead Developer, after analyzing the algorithm",
                    },
                    {
                      story:
                        "At a school in <strong>Shyamnagar</strong>, students <strong>Abhronila</strong> and <strong>Susmita</strong> built a class rank calculator. The first version took 5 minutes to sort 500 students. After learning about algorithm analysis, they implemented merge sort — it now takes 0.02 seconds.",
                      note: "— Classroom project, 2024",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-5 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40",
                        "transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10"
                      )}
                    >
                      <p
                        className="text-gray-700 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: item.story }}
                      />
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium">{item.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── SVG: Algorithm Growth Visual ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Algorithm growth comparison chart"
                  >
                    <defs>
                      <linearGradient id="gO1" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.50" />
                      </linearGradient>
                      <linearGradient id="gOn" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.40" />
                      </linearGradient>
                      <linearGradient id="gOn2" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.40" />
                      </linearGradient>
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
                    <rect x="60" y="80" width="700" height="4" fill="#818cf8" opacity="0.6" rx="2" />
                    <text x="770" y="85" fontSize="12" fill="#818cf8" fontWeight="bold" className="dark:fill-indigo-400">
                      O(1)
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
                      O(log n)
                    </text>

                    {/* O(n) — Linear */}
                    <path d="M60 340 L760 80" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="82" fontSize="12" fill="#f472b6" fontWeight="bold" className="dark:fill-pink-400">
                      O(n)
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
                      O(n log n)
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
                      O(n²)
                    </text>

                    {/* Legend */}
                    <rect x="60" y="360" width="12" height="12" fill="#818cf8" opacity="0.6" rx="2" />
                    <text x="78" y="371" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">O(1)</text>
                    <rect x="140" y="360" width="12" height="12" fill="#34d399" rx="2" />
                    <text x="158" y="371" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">O(log n)</text>
                    <rect x="230" y="360" width="12" height="12" fill="#f472b6" rx="2" />
                    <text x="248" y="371" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">O(n)</text>
                    <rect x="310" y="360" width="12" height="12" fill="#a78bfa" rx="2" />
                    <text x="328" y="371" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">O(n log n)</text>
                    <rect x="420" y="360" width="12" height="12" fill="#fbbf24" rx="2" />
                    <text x="438" y="371" fontSize="11" fill="#6b7280" className="dark:fill-gray-400">O(n²)</text>

                    {/* Animated marker */}
                    <circle cx="200" cy="260" r="6" fill="#34d399" opacity="0.8">
                      <animate attributeName="cy" values="260;290;260" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="240" textAnchor="middle" fontSize="9" fill="#34d399" opacity="0.8">
                      log n
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    As input size grows, the choice of algorithm becomes <strong>critical</strong>.
                    O(log n) and O(1) scale beautifully; O(n²) quickly becomes impractical.
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
                      tip: "Always profile before optimizing",
                      desc: "Don't guess — measure. Use profilers to find real bottlenecks.",
                    },
                    {
                      tip: "Think in terms of constraints",
                      desc: "If n ≤ 100, O(n²) might be fine. If n ≥ 10⁶, you need O(n log n) or better.",
                    },
                    {
                      tip: "Amortized analysis matters",
                      desc: "Some operations are expensive occasionally but cheap on average (e.g., dynamic arrays).",
                    },
                    {
                      tip: "Memory is not free",
                      desc: "Time complexity gets the spotlight, but space complexity can be just as important.",
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
                    <strong>Confusing "fast" with "scalable":</strong> A solution that runs in 0.1s for 100 items
                    might take 10,000s for 1,000,000 items. Always ask: <em>"What happens when n grows?"</em>
                  </li>
                  <li>
                    <strong>Ignoring constants:</strong> While Big-O ignores constants, in practice, a 10× constant
                    difference matters. <em>"O(n) with a huge constant"</em> can be worse than O(n²) for small n.
                  </li>
                  <li>
                    <strong>Focusing only on time:</strong> Memory usage, I/O, and cache behavior matter too.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once spent 2 hours optimizing a loop, only to realize the
                      real bottleneck was a database query.
                    </span>
                  </li>
                  <li>
                    <strong>Over-optimizing prematurely:</strong> Writing complex, hard-to-read code for a 2% gain
                    is often a waste. "Make it work, make it right, make it fast" — in that order.
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
                      <strong>Start with a brute-force solution</strong> — then analyze and improve.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Write down the recurrence</strong> for recursive algorithms — it helps you see the
                      structure clearly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test with edge cases:</strong> empty input, single element, maximum size, and
                      worst-case data.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document your complexity analysis</strong> in comments — future you (and your team)
                      will thank you.
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
                    "✅ Can you identify the input size (n) in your problem?",
                    "✅ Have you considered both time and space complexity?",
                    "✅ Have you thought about the worst-case scenario?",
                    "✅ Is your algorithm practical for the expected input size?",
                    "✅ Have you profiled or benchmarked your solution?",
                    "✅ Can you explain why your algorithm is efficient (or not)?",
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
                    <strong>Observe carefully:</strong> How does the runtime change when you double the input size?
                    Does it double? Quadruple? Stay the same?
                  </li>
                  <li>
                    <strong>Try changing this:</strong> If you have two algorithms that both solve the same problem,
                    what criteria would you use to choose between them?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Ichapur</strong> has 5,000 students. If a
                    sorting algorithm takes O(n²) time, how many operations does it perform? What if it's O(n log n)?
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Slow vs Fast ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Slow vs Fast — Same Problem, Different Approach
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This example demonstrates two ways to find a target in a sorted array. The slow version checks
                  every element (O(n)); the fast version uses binary search (O(log n)).
                </p>
                <JavaFileLoader
                  fileModule={slowVsFastJava}
                  title="SlowVsFast.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Linear vs Quadratic ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear vs Quadratic — The Cost of Nested Loops
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A single loop runs in O(n) time. A nested loop over the same data runs in O(n²) time.
                  See the difference as n grows.
                </p>
                <JavaFileLoader
                  fileModule={linearVsQuadraticJava}
                  title="LinearVsQuadratic.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Real-World Impact ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Real-World Impact — Measuring the Difference
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A simulation showing how algorithm choice affects runtime in a real-world scenario —
                  processing student records from <strong>Barrackpore</strong> to <strong>Naihati</strong>.
                </p>
                <JavaFileLoader
                  fileModule={realWorldImpactJava}
                  title="RealWorldImpact.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Why Algorithm Analysis Matters — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Algorithm analysis is the single most important skill you'll develop as a computer scientist. " +
              "It's not about memorizing Big-O formulas — it's about developing a 'performance intuition'. " +
              "When students like Swadeep and Tuhina learn to think about scalability, they stop being " +
              "'coders' and start being 'engineers'. Remember: the best algorithm is useless if it doesn't " +
              "scale. And the slowest algorithm might be perfectly fine for small n. The key is knowing " +
              "which tool to use, and when. Start every problem by asking: 'What's the input size? " +
              "And what happens when it doubles?'"
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 0 · Why Algorithm Analysis Matters · Built with ❤️ for the classroom</p>
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

export default Topic0;