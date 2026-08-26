import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import towerOfHanoiRecursiveJava from "./topic44_files/TowerOfHanoiRecursive.java?raw";
import towerOfHanoiAnalysisJava from "./topic44_files/TowerOfHanoiAnalysis.java?raw";
import towerOfHanoiComparisonJava from "./topic44_files/TowerOfHanoiComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic44_files/topic44_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic44 = () => {
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
              Topic 44
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Tower of Hanoi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-red-600 dark:text-red-400 font-semibold">exponential O(2ⁿ)</span> time
            and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n)</span> space of the classic
            Tower of Hanoi — a perfect example of how a simple recurrence can lead to explosive growth.
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
                  <span className="text-red-500">●</span> What is the Tower of Hanoi?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    The <strong>Tower of Hanoi</strong> is a classic mathematical puzzle that consists of three rods
                    and a number of disks of different sizes. The goal is to move the entire stack of disks from one
                    rod to another, following three rules:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Only one disk can be moved at a time.</li>
                    <li>Each move consists of taking the upper disk from one rod and placing it on another rod.</li>
                    <li>No disk may be placed on top of a smaller disk.</li>
                  </ul>
                  <p>
                    The recursive solution is elegantly simple:
                    <span className="block font-mono text-center text-lg my-2">
                      {`hanoi(n, source, target, auxiliary) = {
                        hanoi(n-1, source, auxiliary, target) + 
                        move disk n from source to target +
                        hanoi(n-1, auxiliary, target, source)
                      }`}
                    </span>
                  </p>
                  <p>
                    This recurrence is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = 2T(n-1) + O(1), &nbsp; T(1) = O(1)
                    </span>
                    which solves to <span className="text-red-600 dark:text-red-400 font-semibold">O(2ⁿ)</span> —
                    exponential time. The number of moves is exactly 2ⁿ − 1.
                  </p>
                  <p>
                    Think of it like a game of moving a stack of books: to move n books, you first move n-1 books
                    to an auxiliary stack, move the largest book, and then move the n-1 books back on top.
                    Each extra book doubles the work.
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> How Recursive Tower of Hanoi Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If n = 1, move the single disk directly from source to target.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Move n-1 Disks",
                      desc: "Move the top n-1 disks from source to auxiliary (using target as helper).",
                      icon: "📤",
                    },
                    {
                      step: "3. Move Largest Disk",
                      desc: "Move the largest disk (disk n) from source to target.",
                      icon: "⬇️",
                    },
                    {
                      step: "4. Move n-1 Disks Back",
                      desc: "Move the n-1 disks from auxiliary to target (using source as helper).",
                      icon: "📥",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-400/10",
                        "hover:scale-[1.01] hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-red-600 dark:text-red-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      algorithm: "Recursive Tower of Hanoi",
                      time: "O(2ⁿ) — exponential",
                      space: "O(n) — recursion stack depth = n",
                      example: "n=10 → 1023 moves",
                    },
                    {
                      algorithm: "Iterative (simulated)",
                      time: "O(2ⁿ) — same number of moves",
                      space: "O(n) — explicit stack",
                      example: "n=20 → 1,048,575 moves",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-400/10",
                        "hover:scale-[1.01] hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.algorithm}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-red-600 dark:text-red-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Visual Intuition: Recursion Tree
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Tower of Hanoi recursion tree"
                  >
                    <defs>
                      <marker id="arrow44" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursion Tree for Tower of Hanoi (n=3)
                    </text>

                    {/* Level 0 */}
                    <rect x="360" y="40" width="80" height="24" rx="4" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="58" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">h(3)</text>

                    {/* Level 1 */}
                    <line x1="400" y1="64" x2="320" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="400" y1="64" x2="480" y2="80" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="290" y="84" width="60" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="320" y="100" textAnchor="middle" fontSize="10" fill="white">h(2)</text>
                    <rect x="450" y="84" width="60" height="22" rx="4" fill="#34d399" opacity="0.7" />
                    <text x="480" y="100" textAnchor="middle" fontSize="10" fill="white">h(2)</text>

                    {/* Level 2 */}
                    <line x1="320" y1="106" x2="270" y2="120" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="320" y1="106" x2="370" y2="120" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="480" y1="106" x2="430" y2="120" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="480" y1="106" x2="530" y2="120" stroke="#6b7280" strokeWidth="1.5" />
                    <rect x="240" y="124" width="60" height="20" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="270" y="139" textAnchor="middle" fontSize="9" fill="white">h(1)</text>
                    <rect x="340" y="124" width="60" height="20" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="370" y="139" textAnchor="middle" fontSize="9" fill="white">h(1)</text>
                    <rect x="400" y="124" width="60" height="20" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="430" y="139" textAnchor="middle" fontSize="9" fill="white">h(1)</text>
                    <rect x="500" y="124" width="60" height="20" rx="3" fill="#f472b6" opacity="0.6" />
                    <text x="530" y="139" textAnchor="middle" fontSize="9" fill="white">h(1)</text>

                    {/* Level 3 */}
                    <text x="400" y="180" textAnchor="middle" fontSize="10" fill="#6b7280">… leaves: h(1) → move 1 disk</text>

                    <text x="400" y="215" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Number of calls = 2ⁿ - 1 ≈ exponential. Depth = n.
                    </text>
                    <text x="400" y="240" textAnchor="middle" fontSize="11" fill="#f87171" className="dark:fill-red-400">
                      ⚠️ For n=64, moves = 2⁶⁴ - 1 ≈ 1.84 × 10¹⁹ — impossible!
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The recursion tree has 2ⁿ - 1 nodes. The depth is n, but the total work is exponential.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = 2T(n-1) + O(1), &nbsp; T(1) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (a move) and makes two recursive calls on n-1.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence: T(n) = 2T(n-1) + 1 = 2(2T(n-2) + 1) + 1 = 4T(n-2) + 2 + 1 = ...
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    T(n) = 2ⁿ - 1 = <span className="font-mono text-red-600 dark:text-red-400">O(2ⁿ)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(2ⁿ)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(n)</span> (recursion stack)
                  </p>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Engineering:</span>{" "}
                      The Tower of Hanoi problem models recursive algorithms and is used in teaching recursion
                      and exponential growth.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Computer Science:</span>{" "}
                      It's a classic example of a problem with exponential time complexity, illustrating why
                      some problems are intractable.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Robotics:</span>{" "}
                      The problem is used in robot motion planning, where moving multiple objects with constraints
                      requires similar recursive strategies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-red-600 dark:text-red-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> and <strong>Tuhina</strong> are playing the Tower of Hanoi game
                      with 5 disks. It takes 31 moves. With 10 disks, it takes 1023 moves. With 20 disks, over
                      1 million moves — they would be playing forever!
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Never use Tower of Hanoi for large n",
                      desc: "2⁶⁴ - 1 moves is impossible for any computer. Use it only for educational purposes.",
                    },
                    {
                      tip: "Understand the recurrence",
                      desc: "T(n) = 2T(n-1) + O(1) is the classic exponential recurrence.",
                    },
                    {
                      tip: "Space complexity is O(n) not O(2ⁿ)",
                      desc: "The recursion depth is only n, so space is linear, not exponential.",
                    },
                    {
                      tip: "Use for teaching recursion",
                      desc: "Tower of Hanoi is the best example to demonstrate the power of recursion and its exponential cost.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-red-300 dark:hover:border-red-700"
                      )}
                    >
                      <p className="font-semibold text-red-600 dark:text-red-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Forgetting the base case:</strong> Without n == 1, the recursion never terminates.
                  </li>
                  <li>
                    <strong>Confusing the number of moves with the time complexity:</strong> The number of moves
                    is exactly 2ⁿ - 1, which is O(2ⁿ). This is the time complexity.
                  </li>
                  <li>
                    <strong>Assuming space is also exponential:</strong> Space is O(n) because the recursion depth
                    is n, not the number of calls.
                  </li>
                  <li>
                    <strong>Thinking iterative is faster:</strong> Any solution requires 2ⁿ - 1 moves, so time is
                    always exponential.
                  </li>
                  <li>
                    <strong>Misplacing the auxiliary rod:</strong> The auxiliary rod must be used correctly in the
                    recursive calls.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once wrote hanoi(n-1, source, target, aux) instead of using
                      aux as the target, causing incorrect moves. She learned to carefully track the role of each rod.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use for educational purposes</strong> — it's a classic example of exponential recursion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Understand the recurrence</strong> — T(n) = 2T(n-1) + O(1) is fundamental.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Don't use for n &gt; 20</strong> — the number of moves becomes too large for practical use.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Trace the recursion</strong> to understand how the moves are generated.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for Tower of Hanoi?",
                    "✅ Do you know the time complexity (O(2ⁿ)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement recursive Tower of Hanoi correctly?",
                    "✅ Can you calculate the number of moves for a given n?",
                    "✅ Do you understand that n=64 is impossible?",
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
                    <strong>Observe carefully:</strong> For n=3, the number of moves is 7 (2³ - 1). For n=4, it's 15.
                    Each additional disk doubles the moves plus one. That's exponential growth!
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you had 4 rods instead of 3? The recurrence would
                    change, and the minimum moves would be different (though still exponential).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a Tower of Hanoi
                    puzzle with 10 disks. It would take 1023 moves — feasible to solve manually in a few hours.
                    With 20 disks, it would take over 1 million moves — impossible for a classroom activity!
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Tower of Hanoi Recursive ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tower of Hanoi — O(2ⁿ) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive implementation of Tower of Hanoi with recurrence T(n) = 2T(n-1) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={towerOfHanoiRecursiveJava}
                  title="TowerOfHanoiRecursive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tower of Hanoi Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tower of Hanoi Analysis — Moves and Depth
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of moves and recursion depth for the Tower of Hanoi.
                </p>
                <JavaFileLoader
                  fileModule={towerOfHanoiAnalysisJava}
                  title="TowerOfHanoiAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tower of Hanoi Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tower of Hanoi Comparison — Recursive vs Iterative
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the recursive solution with an iterative (stack-based) implementation.
                </p>
                <JavaFileLoader
                  fileModule={towerOfHanoiComparisonJava}
                  title="TowerOfHanoiComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Tower of Hanoi — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Tower of Hanoi is the classic example of exponential time complexity. I emphasize that the recurrence 
              T(n) = 2T(n-1) + O(1) is the simplest exponential recurrence — each extra disk doubles the work. 
              Students are often surprised that the number of moves for 64 disks is 2⁶⁴ - 1 ≈ 1.84 × 10¹⁹, which 
              would take billions of years to complete even at 1 move per second. This drives home the point 
              that exponential algorithms are only practical for very small n. Also, highlight that the space 
              complexity is only O(n) — the recursion depth is linear. This is a great example to discuss the 
              difference between time and space complexity.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 44 · Complexity of Recursive Tower of Hanoi · Built with ❤️ for the classroom</p>
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

export default Topic44;