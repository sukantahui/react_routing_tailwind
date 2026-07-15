import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import decimalToBinaryJava from "./topic43_files/DecimalToBinary.java?raw";
import binaryStringBuilderJava from "./topic43_files/BinaryStringBuilder.java?raw";
import binaryConversionAnalysisJava from "./topic43_files/BinaryConversionAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic43_files/topic43_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic43 = () => {
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
              Topic 43
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Decimal to Binary Conversion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(log n)</span> time and
            space of recursive decimal-to-binary conversion — understanding how division by 2 leads to logarithmic complexity.
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
                  <span className="text-emerald-500">●</span> What is Recursive Decimal to Binary Conversion?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Decimal to binary conversion</strong> is a classic algorithm that converts a base-10
                    number to its binary (base-2) representation. The recursive approach follows the mathematical
                    definition:
                  </p>
                  <p className="font-mono text-center text-lg my-2">
                    toBinary(n) = toBinary(n/2) + (n % 2), &nbsp; with toBinary(0) = "0"
                  </p>
                  <p>
                    The algorithm repeatedly divides the number by 2, collecting the remainders (which are the
                    binary digits) in <strong>reverse order</strong> — the last remainder is the most significant bit.
                  </p>
                  <p>
                    The recurrence is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n/2) + O(1), &nbsp; T(0) = O(1)
                    </span>
                    This gives <strong>O(log n)</strong> time and <strong>O(log n)</strong> space due to the recursion stack.
                  </p>
                  <p>
                    Think of it like peeling off binary digits: you check the last bit (n % 2), remove it (n / 2),
                    and repeat until you reach 0. The number of steps is the number of bits, which is log₂(n).
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> How Recursive Decimal to Binary Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Case",
                      desc: "If n = 0, return '0'. This stops the recursion.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Extract Remainder",
                      desc: "Compute n % 2 to get the last binary digit (LSB).",
                      icon: "🔢",
                    },
                    {
                      step: "3. Divide by 2",
                      desc: "Compute n / 2 (integer division) to remove the last bit.",
                      icon: "✂️",
                    },
                    {
                      step: "4. Combine",
                      desc: "Return toBinary(n/2) + (n % 2) — the result builds in reverse.",
                      icon: "🔗",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      algorithm: "Recursive (String concat)",
                      time: "O(log n) — logarithmic (n/2 steps)",
                      space: "O(log n) — recursion stack depth = log₂(n)",
                      example: "n=1,000,000 → ~20 steps",
                    },
                    {
                      algorithm: "Recursive (StringBuilder)",
                      time: "O(log n) — logarithmic",
                      space: "O(log n) — recursion stack + StringBuilder",
                      example: "More efficient string building",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.algorithm}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Visual Intuition: Recursive Division
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Decimal to binary recursion chain"
                  >
                    <defs>
                      <marker id="arrow43" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Converting 13 to binary: 13 ÷ 2 = 6 r1, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1
                    </text>

                    {/* Level 0 */}
                    <rect x="320" y="40" width="160" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="62" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">toBinary(13)</text>
                    <text x="400" y="82" textAnchor="middle" fontSize="10" fill="#6b7280">13 % 2 = 1</text>
                    <line x1="400" y1="85" x2="400" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow43)" />

                    {/* Level 1 */}
                    <rect x="320" y="105" width="160" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="127" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">toBinary(6)</text>
                    <text x="400" y="147" textAnchor="middle" fontSize="10" fill="#6b7280">6 % 2 = 0</text>
                    <line x1="400" y1="150" x2="400" y2="165" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow43)" />

                    {/* Level 2 */}
                    <rect x="320" y="170" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="192" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">toBinary(3)</text>
                    <text x="400" y="212" textAnchor="middle" fontSize="10" fill="#6b7280">3 % 2 = 1</text>
                    <line x1="400" y1="215" x2="400" y2="230" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow43)" />

                    {/* Level 3 */}
                    <rect x="320" y="235" width="160" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="257" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">toBinary(1)</text>
                    <text x="400" y="277" textAnchor="middle" fontSize="10" fill="#6b7280">1 % 2 = 1 → base case</text>

                    <text x="400" y="315" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Depth = number of bits = log₂(13) + 1 ≈ 4 → O(log n)
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Each recursive call divides the number by 2. The depth is the number of bits, which is O(log₂(n)).
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = T(n/2) + O(1), &nbsp; T(0) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Each step does O(1) work (modulo and division) and reduces n by a factor of 2.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    The number of steps = number of bits = ⌊log₂(n)⌋ + 1
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Solving the recurrence: T(n) = T(n/2) + 1 = T(n/4) + 2 = ... = log₂(n) + 1
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(log n)</span>
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(log n)</span> (recursion stack)
                  </p>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Computer Science:</span>{" "}
                      All numbers are stored in binary in computers. Converting decimal to binary is fundamental
                      to understanding how computers represent data.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Bit Manipulation:</span>{" "}
                      Understanding binary representation is essential for bitwise operations (AND, OR, XOR, shifts).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Classroom Example:</span>{" "}
                      <strong>Swadeep</strong> is learning how computers store numbers. He converts 13 to binary
                      using recursion: 13 → 6 → 3 → 1 → 0, collecting remainders to get 1101.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Networking:</span>{" "}
                      IP addresses and subnet masks are often expressed in binary, requiring conversion.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Use StringBuilder for efficient string building",
                      desc: "String concatenation in recursion can be O(n²) if not careful; use StringBuilder.",
                    },
                    {
                      tip: "Handle the zero case correctly",
                      desc: "toBinary(0) should return '0', not an empty string.",
                    },
                    {
                      tip: "Consider iterative version for very large numbers",
                      desc: "Iterative version uses O(1) space while recursive uses O(log n) stack.",
                    },
                    {
                      tip: "Use Integer.toBinaryString() for production",
                      desc: "Java's built-in method is optimized and handles all edge cases.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Forgetting the base case for n=0:</strong> Without toBinary(0) = "0", the recursion
                    returns an empty string, giving incorrect results.
                  </li>
                  <li>
                    <strong>Using string concatenation inefficiently:</strong> <code>result + digit</code> creates
                    new strings, leading to O(n²) time. Use StringBuilder.
                  </li>
                  <li>
                    <strong>Getting the order wrong:</strong> The remainders are collected in reverse order.
                    The recursive call must be before the digit (toBinary(n/2) + digit).
                  </li>
                  <li>
                    <strong>Not handling negative numbers:</strong> Binary representation of negative numbers uses
                    two's complement; handle sign separately.
                  </li>
                  <li>
                    <strong>Assuming the depth is O(log n) but forgetting the string length:</strong> The string
                    length is also O(log n), so space is O(log n) for the string + O(log n) for the stack.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Tuhina</strong> wrote toBinary(13) and got "1011" instead of "1101" because
                      she put the digit before the recursive call. She learned to build the string from the inside out.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use StringBuilder</strong> to avoid O(n²) string concatenation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Integer.toBinaryString()</strong> for production code — it's optimized and built-in.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Handle edge cases</strong>: n=0, negative numbers, and very large numbers (use long or BigInteger).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Document the recurrence</strong> in comments to explain the complexity.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for decimal-to-binary conversion?",
                    "✅ Do you know the time complexity (O(log n)) and why?",
                    "✅ Do you know the space complexity (O(log n)) and why?",
                    "✅ Can you implement recursive conversion with correct order?",
                    "✅ Can you handle the base case (n=0) correctly?",
                    "✅ Can you build the string efficiently?",
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
                    <strong>Observe carefully:</strong> For n = 13, how many recursive calls are made? 4 calls
                    (13, 6, 3, 1, 0) — that's log₂(13) + 1 ≈ 4. For n = 1,000,000, it's about 20 calls.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use string concatenation instead of StringBuilder?
                    Each concatenation copies O(log n) characters, making the total O(log² n) or O(n)? Actually
                    it's O(log² n) because each concat copies the growing string.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a computer science
                    class learning about binary numbers. A student converts 255 to binary using recursion:
                    255 → 127 → 63 → 31 → 15 → 7 → 3 → 1 → 0 — only 8 steps (log₂(255) ≈ 8).
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Decimal to Binary ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Decimal to Binary — O(log n) Time, O(log n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive decimal-to-binary conversion with recurrence T(n) = T(n/2) + O(1).
                </p>
                <JavaFileLoader
                  fileModule={decimalToBinaryJava}
                  title="DecimalToBinary.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary with StringBuilder ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Conversion with StringBuilder — Efficient String Building
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursive conversion using StringBuilder to avoid O(n²) string concatenation.
                </p>
                <JavaFileLoader
                  fileModule={binaryStringBuilderJava}
                  title="BinaryStringBuilder.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Binary Conversion Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Binary Conversion Analysis — Step Count and Depth
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of steps and recursion depth for decimal-to-binary conversion.
                </p>
                <JavaFileLoader
                  fileModule={binaryConversionAnalysisJava}
                  title="BinaryConversionAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Decimal to Binary Conversion — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Decimal-to-binary conversion is a classic example of O(log n) complexity. I emphasize that the number 
              of bits in a number is log₂(n), and that's the depth of the recursion. This is the same recurrence 
              as binary search: T(n) = T(n/2) + O(1). The key insight is that division by 2 reduces the problem 
              size exponentially. Also, highlight the importance of string building: using StringBuilder avoids 
              the O(n²) cost of repeated string concatenation. This topic reinforces the idea that the number of 
              digits in a representation is logarithmic in the value, a concept that appears in many algorithms.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 43 · Complexity of Recursive Decimal to Binary Conversion · Built with ❤️ for the classroom</p>
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

export default Topic43;