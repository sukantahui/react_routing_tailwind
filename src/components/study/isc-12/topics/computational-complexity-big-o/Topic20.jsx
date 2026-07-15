import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import constantOperationsJava from "./topic20_files/ConstantOperations.java?raw";
import arrayAccessJava from "./topic20_files/ArrayAccess.java?raw";
import hashMapLookupJava from "./topic20_files/HashMapLookup.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic20_files/topic20_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic20 = () => {
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
              Topic 20
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(1) – Constant Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">gold standard</span> of algorithm
            efficiency — operations that take the same amount of time regardless of input size.
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
                  <span className="text-indigo-500">●</span> What is O(1) – Constant Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(1)</strong> — pronounced "order one" — means an algorithm or operation that takes
                    <strong>constant time</strong> to execute, regardless of the input size. No matter how large
                    the input grows, the time remains the same.
                  </p>
                  <p>
                    This is the <strong>best possible</strong> time complexity. Operations like array access by index,
                    arithmetic operations, variable assignment, and hash table lookups (average case) are all O(1).
                  </p>
                  <p>
                    Think of it like a vending machine: whether you're buying one item or a thousand, the time to
                    press a button and get your item is the same. You don't wait longer just because the machine
                    has more inventory.
                  </p>
                </div>
              </section>

              {/* ── Common O(1) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common O(1) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Array Access",
                      desc: "Accessing an element by index: arr[i].",
                      example: "int x = arr[5];",
                    },
                    {
                      icon: "➕",
                      title: "Arithmetic Operations",
                      desc: "Addition, subtraction, multiplication, division.",
                      example: "int sum = a + b;",
                    },
                    {
                      icon: "📦",
                      title: "Variable Assignment",
                      desc: "Assigning a value to a variable.",
                      example: "int x = 10;",
                    },
                    {
                      icon: "🔗",
                      title: "Hash Table Lookup (Average)",
                      desc: "Getting a value by key from a HashMap.",
                      example: "map.get(key);",
                    },
                    {
                      icon: "🔢",
                      title: "Bitwise Operations",
                      desc: "AND, OR, XOR, shifts: &, |, ^, <<, >>.",
                      example: "int result = a & b;",
                    },
                    {
                      icon: "📏",
                      title: "Comparing Two Values",
                      desc: "Comparing two variables.",
                      example: "if (a < b) { ... }",
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

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Constant Time
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 250"
                    className="w-full h-auto max-h-56"
                    role="img"
                    aria-label="Constant time visualization"
                  >
                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="100" x2="760" y2="100" />
                      <line x1="60" y1="150" x2="760" y2="150" />
                      <line x1="60" y1="200" x2="760" y2="200" />
                      <line x1="60" y1="50" x2="60" y2="200" />
                      <line x1="207" y1="50" x2="207" y2="200" />
                      <line x1="354" y1="50" x2="354" y2="200" />
                      <line x1="501" y1="50" x2="501" y2="200" />
                      <line x1="648" y1="50" x2="648" y2="200" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="200" x2="760" y2="200" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="200" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="230" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="130" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,130)">Time</text>

                    {/* O(1) line */}
                    <line x1="60" y1="60" x2="760" y2="60" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
                    <text x="770" y="65" fontSize="12" fill="#818cf8" fontWeight="bold">O(1)</text>

                    {/* Animated constant block */}
                    <rect x="100" y="50" width="600" height="20" rx="4" fill="#818cf8" opacity="0.2">
                      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                    </rect>

                    {/* Labels */}
                    <text x="400" y="30" textAnchor="middle" fontSize="14" fill="#374151" className="dark:fill-gray-300">
                      Time stays constant regardless of input size (n)
                    </text>
                    <text x="400" y="180" textAnchor="middle" fontSize="12" fill="#6b7280" className="dark:fill-gray-400">
                      As n grows, O(1) operations take the same time — the holy grail of efficiency.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(1) algorithms take constant time, making them the most scalable and efficient.
                  </p>
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">ATM Withdrawal:</span>{" "}
                      Whether you have $100 or $10,000 in your account, checking your balance and dispensing cash
                      takes the same amount of time.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Elevator: </span>{" "}
                      Pressing a button to call the elevator takes the same time regardless of how many floors
                      the building has (the elevator itself may take longer, but the button press is O(1)).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Dictionary Lookup:</span>{" "}
                      Looking up a word in a dictionary by using the page number (index) is O(1) — you go directly
                      to the page without scanning.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">School Analogy:</span>{" "}
                      At a school in <strong>Barrackpore</strong>, checking if a student is present by looking at
                      a seat number (index) is O(1). Checking by scanning the entire classroom is O(n).
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
                      tip: "Use arrays and hash maps for O(1) access",
                      desc: "When you need fast lookups, these data structures are your best friends.",
                    },
                    {
                      tip: "Remember: O(1) doesn't mean 'instant'",
                      desc: "The constant factor could be large (e.g., 1 million operations), so O(1) can still be slow in practice.",
                    },
                    {
                      tip: "Avoid O(n) when O(1) is possible",
                      desc: "If you can use a hash map instead of a list search, do it.",
                    },
                    {
                      tip: "Consider the memory trade-off",
                      desc: "Sometimes O(1) time comes at the cost of O(n) space (e.g., using a cache).",
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
                    <strong>Assuming all array operations are O(1):</strong> Inserting or deleting in the middle of an
                    array is O(n), not O(1). Only access by index is O(1).
                  </li>
                  <li>
                    <strong>Thinking O(1) means "fast":</strong> O(1) means constant time, but the constant could be
                    large. An O(1) algorithm that does 1,000,000 operations per call is still O(1) but slow.
                  </li>
                  <li>
                    <strong>Forgetting that hash table lookup is O(1) average, not worst-case:</strong> In the worst case
                    (all collisions), a hash table lookup is O(n).
                  </li>
                  <li>
                    <strong>Confusing O(1) with Ω(1):</strong> O(1) is the upper bound (worst-case), but some operations
                    are Ω(1) in best-case but O(n) in worst-case.
                  </li>
                  <li>
                    <strong>Ignoring the hidden constant:</strong> An O(1) algorithm with a high constant factor may be
                    slower than an O(log n) algorithm with a very low constant for small n.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> once used an O(1) hash map that was actually slower than a simple
                      O(n) list for n=10 because the hash function was expensive.
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
                      <strong>Use arrays for index-based access</strong> — O(1) and cache-friendly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use hash maps for key-based lookups</strong> — O(1) average time.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider the trade-off between time and space</strong> — sometimes O(1) time requires O(n) space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always profile your code</strong> — don't assume O(1) is always the best without measuring.
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
                    "✅ Can you identify O(1) operations in code?",
                    "✅ Do you know that array access by index is O(1)?",
                    "✅ Do you know that hash table lookups are O(1) on average?",
                    "✅ Can you distinguish O(1) from O(log n) and O(n)?",
                    "✅ Do you understand that O(1) can have a large constant?",
                    "✅ Can you use O(1) data structures effectively?",
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
                    <strong>Observe carefully:</strong> In Java, accessing arr[i] takes O(1) time. Why? Because the
                    memory address is computed directly from the base address and index.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use a LinkedList instead of an ArrayList? Accessing
                    by index is O(n) in LinkedList. Why?
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Shyamnagar</strong> has a seating chart. Looking
                    up a student by seat number is O(1). Looking them up by name without an index is O(n).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Constant Operations ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Constant Operations — O(1) Examples
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates various O(1) operations: arithmetic, assignment, comparisons, and bitwise operations.
                </p>
                <JavaFileLoader
                  fileModule={constantOperationsJava}
                  title="ConstantOperations.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Array Access ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Array Access — O(1) by Index
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Shows that accessing an array by index is constant time, regardless of the array size.
                </p>
                <JavaFileLoader
                  fileModule={arrayAccessJava}
                  title="ArrayAccess.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: HashMap Lookup ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ HashMap Lookup — O(1) Average Time
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates that HashMap get() and put() are O(1) on average, making them ideal for fast lookups.
                </p>
                <JavaFileLoader
                  fileModule={hashMapLookupJava}
                  title="HashMapLookup.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(1) – Constant Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(1) is the ultimate goal of algorithm design. I tell my students: 'If you can make it constant, do it.' " +
              "However, I also caution them that O(1) doesn't mean 'always fast' — the constant factor matters. " +
              "A well-tuned O(log n) algorithm can sometimes beat a poorly implemented O(1) algorithm. " +
              "The key is to understand the trade-offs: O(1) often requires O(n) space (like a hash table), " +
              "while O(log n) might use O(1) space (like binary search). " +
              "Use O(1) data structures like arrays and hash maps when you need speed, but remember the constant factor."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 20 · O(1) – Constant Time · Built with ❤️ for the classroom</p>
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

export default Topic20;