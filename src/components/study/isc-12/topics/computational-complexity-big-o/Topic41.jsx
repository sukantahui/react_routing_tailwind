import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import reverseNaiveJava from "./topic41_files/ReverseNaive.java?raw";
import reverseEfficientJava from "./topic41_files/ReverseEfficient.java?raw";
import reverseComparisonJava from "./topic41_files/ReverseComparison.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic41_files/topic41_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic41 = () => {
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
              Topic 41
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive String Reversal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">O(n)</span> time and space
            of efficient recursive string reversal — and understanding why the <strong>naive</strong> approach can be
            <span className="text-red-600 dark:text-red-400 font-semibold"> O(n²)</span>.
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
                  <span className="text-indigo-500">●</span> What is Recursive String Reversal?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>String reversal</strong> is a classic problem where we reverse the order of characters
                    in a string. A recursive approach can be implemented in two common ways:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Naive (Substring + Concatenation):</strong> Reverse the substring (excluding the
                      first character) and append the first character. This creates many intermediate strings,
                      leading to <span className="text-red-600 dark:text-red-400 font-semibold">O(n²)</span> time
                      and O(n) space (or O(n²) if you count string allocations).
                    </li>
                    <li>
                      <strong>Efficient (In-place using character array):</strong> Recursively swap characters
                      from the ends toward the center. This is <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n)</span> time and O(n) space for the recursion stack.
                    </li>
                  </ul>
                  <p>
                    The recurrence for the efficient version is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n-2) + O(1), &nbsp; T(0) = T(1) = O(1)
                    </span>
                    which solves to <strong>O(n)</strong>. The space complexity is <strong>O(n)</strong> due to the
                    recursion depth.
                  </p>
                  <p>
                    Think of it like reversing a stack of papers: you could take the top paper, put it aside, and
                    recursively reverse the rest, then put the top paper at the bottom (naive — many movements).
                    Or you could swap the top and bottom papers, then recursively reverse the middle (efficient —
                    one swap per pair).
                  </p>
                </div>
              </section>

              {/* ── How the Algorithms Work ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How They Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Naive (Substring)",
                      desc: "reverse(s) = reverse(s.substring(1)) + s.charAt(0). Creates new strings each call.",
                      example: "reverse(\"abc\") = reverse(\"bc\") + \"a\" = \"cb\" + \"a\" = \"cba\"",
                      icon: "🐢",
                    },
                    {
                      title: "Efficient (Swap)",
                      desc: "Swap first and last characters, then recursively reverse the middle substring.",
                      example: "reverse([a,b,c], 0, 2) → swap a↔c → reverse([a,b,c], 1, 1) → done.",
                      icon: "⚡",
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
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      algorithm: "Naive (Substring + concat)",
                      time: "O(n²) — quadratic (each concat creates new string)",
                      space: "O(n) — recursion stack, but also O(n²) string allocations",
                      example: "n=1000 → ~1,000,000 char copies",
                    },
                    {
                      algorithm: "Efficient (In-place swap)",
                      time: "O(n) — linear (each swap is O(1), n/2 swaps)",
                      space: "O(n) — recursion stack depth = n/2",
                      example: "n=1000 → ~500 swaps",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 2),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.algorithm}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Efficient Swap Recursion
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 250"
                    className="w-full h-auto max-h-56"
                    role="img"
                    aria-label="Efficient string reversal recursion"
                  >
                    <defs>
                      <marker id="arrow41" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursive swap of first and last characters (n=5)
                    </text>

                    {/* Level 0 */}
                    <rect x="220" y="35" width="360" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="57" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">[A, B, C, D, E]</text>
                    <text x="180" y="57" fontSize="11" fill="#818cf8">swap(0,4)</text>

                    {/* Level 1 */}
                    <line x1="400" y1="65" x2="400" y2="85" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow41)" />
                    <rect x="280" y="90" width="240" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="112" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">[E, B, C, D, A]</text>
                    <text x="250" y="112" fontSize="11" fill="#34d399">swap(1,3)</text>

                    {/* Level 2 */}
                    <line x1="400" y1="120" x2="400" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow41)" />
                    <rect x="320" y="145" width="160" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="167" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">[E, D, C, B, A]</text>
                    <text x="300" y="167" fontSize="11" fill="#f472b6">base case (low &gt; high)</text>

                    <text x="400" y="220" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Depth = n/2 = 2 swaps → O(n) time, O(n) space
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Efficient recursive reversal swaps pairs from the outside in, reducing the problem size by 2 each call.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50/60 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="font-semibold text-red-600 dark:text-red-400">Naive (Substring)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-1) + O(n), &nbsp; T(0)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Each step does O(n) work (substring + concat) plus recursion.
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Solution: <span className="font-mono text-red-600 dark:text-red-400">O(n²)</span>
                    </p>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Efficient (Swap)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-2) + O(1), &nbsp; T(0)=T(1)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Each step does O(1) work (swap) and reduces n by 2.
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span>
                    </p>
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
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Palindrome Check:</span>{" "}
                      Reverse a string and compare to the original to check if it's a palindrome. Efficient reversal
                      is O(n) time and O(n) space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Text Processing:</span>{" "}
                      Reversing lines in a file or reversing the order of words in a sentence.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Example:</span>{" "}
                      <strong>Susmita</strong> has a string of letters on the board. She wants to reverse it using
                      recursion. The efficient swap method takes O(n) time, while the naive substring method would
                      be O(n²) — a big difference for long strings.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Competitive Programming:</span>{" "}
                      In interviews, reversing a string in-place (or with recursion) is a common question.
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
                      tip: "Use character array for efficient reversal",
                      desc: "Convert to char[], swap recursively, then convert back to String. This avoids O(n²) string copies.",
                    },
                    {
                      tip: "Avoid substring in recursion",
                      desc: "substring creates new strings, leading to O(n²) time. Use indices instead.",
                    },
                    {
                      tip: "Consider tail recursion for optimization",
                      desc: "Tail-recursive reversal (with accumulator) can be optimized by the compiler.",
                    },
                    {
                      tip: "Use built-in methods for production",
                      desc: "StringBuilder.reverse() is O(n) and optimized; use it unless recursion is required.",
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
                    <strong>Using substring + concat for large strings:</strong> This results in O(n²) time due to
                    repeated string allocations. It's easy to write but inefficient.
                  </li>
                  <li>
                    <strong>Forgetting the base case:</strong> For empty or single-character strings, the recursion
                    must stop.
                  </li>
                  <li>
                    <strong>Not handling null or empty strings:</strong> Check for null and empty cases to avoid
                    exceptions.
                  </li>
                  <li>
                    <strong>Confusing the space complexity:</strong> Even the efficient version uses O(n) stack space.
                    Some think it's O(1) because it's in-place, but recursion stack adds O(n).
                  </li>
                  <li>
                    <strong>Not considering iterative alternatives:</strong> For very long strings, recursion depth
                    can cause stack overflow. An iterative approach might be safer.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Swadeep</strong> wrote a recursive string reversal for a 1-million-character string
                      and got a StackOverflowError. He switched to StringBuilder.reverse() and it worked instantly.
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
                      <strong>Use character array and swap</strong> for an O(n) recursive reversal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use StringBuilder.reverse()</strong> in production code — it's efficient and built-in.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Handle edge cases</strong>: empty strings, null, single character.
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
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for naive reversal (O(n²))?",
                    "✅ Can you write the recurrence for efficient reversal (O(n))?",
                    "✅ Do you know why substring+concat is O(n²)?",
                    "✅ Can you implement recursive reversal using character array?",
                    "✅ Do you know the space complexity (O(n)) for both?",
                    "✅ Can you handle edge cases (empty string, null)?",
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
                    <strong>Observe carefully:</strong> For a string of length n, how many substring operations does
                    the naive approach create? It creates n substrings, each of decreasing size, leading to O(n²)
                    character copies.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use a character array and pass indices instead of
                    creating substrings? How does the recurrence change? It becomes T(n) = T(n-2) + O(1) → O(n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a long string of
                    student names to reverse. If they use the naive substring method, it'll take too long.
                    The efficient method is much faster for large strings.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Naive String Reversal ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Naive Recursive Reversal — O(n²) Time
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Uses substring and concatenation, leading to O(n²) time due to repeated string allocations.
                </p>
                <JavaFileLoader
                  fileModule={reverseNaiveJava}
                  title="ReverseNaive.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Efficient Recursive Reversal ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Efficient Recursive Reversal — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Uses character array and swap with indices, giving O(n) time and O(n) stack space.
                </p>
                <JavaFileLoader
                  fileModule={reverseEfficientJava}
                  title="ReverseEfficient.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Reversal Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Reversal Comparison — Naive vs Efficient vs Built-in
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the runtime of different string reversal approaches.
                </p>
                <JavaFileLoader
                  fileModule={reverseComparisonJava}
                  title="ReverseComparison.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive String Reversal — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `String reversal is a great example to illustrate how implementation details affect complexity. 
              The naive substring approach is easy to write but O(n²). The efficient swap approach is O(n) 
              but requires a bit more thought. I emphasize that in Java, String is immutable, so every 
              concatenation creates a new string. This is a common pitfall. Also, the recursion stack is 
              O(n) for both versions, so for very long strings, the iterative approach (using a loop) is 
              safer. This topic reinforces the importance of choosing the right algorithm and understanding 
              the cost of string operations.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 41 · Complexity of Recursive String Reversal · Built with ❤️ for the classroom</p>
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

export default Topic41;