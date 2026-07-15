import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import recursivePalindromeJava from "./topic42_files/RecursivePalindrome.java?raw";
import palindromeComparisonJava from "./topic42_files/PalindromeComparison.java?raw";
import palindromeAnalysisJava from "./topic42_files/PalindromeAnalysis.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic42_files/topic42_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic42 = () => {
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
              Topic 42
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Palindrome Check
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n)</span> time and space
            of recursive palindrome checking — and understanding why it's more efficient than reversing the string.
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
                  <span className="text-emerald-500">●</span> What is a Palindrome Check?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    A <strong>palindrome</strong> is a string that reads the same forward and backward (e.g.,
                    "racecar", "madam", "level"). The recursive palindrome check determines if a string is a
                    palindrome by comparing the <strong>first and last characters</strong>, and then recursively
                    checking the middle substring.
                  </p>
                  <p>
                    The recurrence for the efficient recursive approach is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(n-2) + O(1), &nbsp; T(0) = T(1) = O(1)
                    </span>
                    This gives <strong>O(n)</strong> time and <strong>O(n)</strong> space due to the recursion stack
                    (depth = n/2).
                  </p>
                  <p>
                    Think of it like checking a word by comparing the first and last letters, then moving inward.
                    For "racecar", you compare 'r' and 'r', then 'a' and 'a', then 'c' and 'c', leaving 'e' in the middle.
                    This is much more efficient than reversing the entire string and comparing.
                  </p>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> How Recursive Palindrome Check Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      step: "1. Base Cases",
                      desc: "If string length is 0 or 1 → it's a palindrome. If first ≠ last → not a palindrome.",
                      icon: "🎯",
                    },
                    {
                      step: "2. Compare First & Last",
                      desc: "Check if s.charAt(left) == s.charAt(right). If not, return false.",
                      icon: "🔍",
                    },
                    {
                      step: "3. Recurse on Middle",
                      desc: "Recursively check the substring from left+1 to right-1.",
                      icon: "🔄",
                    },
                    {
                      step: "4. Return Result",
                      desc: "If all comparisons pass, the string is a palindrome.",
                      icon: "✅",
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
                      algorithm: "Efficient Recursive (Compare Ends)",
                      time: "O(n) — linear (n/2 comparisons)",
                      space: "O(n) — recursion stack depth = n/2",
                      example: "n=1000 → ~500 comparisons",
                    },
                    {
                      algorithm: "Naive (Reverse & Compare)",
                      time: "O(n) — linear (reverse is O(n), compare is O(n))",
                      space: "O(n) — for the reversed string",
                      example: "n=1000 → reverse + compare",
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
                  <span className="text-emerald-500">●</span> Visual Intuition: Recursive Comparison
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 280"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Recursive palindrome check"
                  >
                    <defs>
                      <marker id="arrow42" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Checking "racecar" recursively — compare ends and move inward
                    </text>

                    {/* Level 0 */}
                    <rect x="200" y="35" width="400" height="30" rx="6" fill="#818cf8" opacity="0.8" />
                    <text x="400" y="57" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">r a c e c a r</text>
                    <text x="180" y="57" fontSize="11" fill="#818cf8">check(0,6)</text>

                    {/* Level 1 */}
                    <line x1="400" y1="65" x2="400" y2="85" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow42)" />
                    <rect x="250" y="90" width="300" height="30" rx="6" fill="#34d399" opacity="0.7" />
                    <text x="400" y="112" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">a c e c a</text>
                    <text x="220" y="112" fontSize="11" fill="#34d399">check(1,5)</text>

                    {/* Level 2 */}
                    <line x1="400" y1="120" x2="400" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow42)" />
                    <rect x="300" y="145" width="200" height="30" rx="6" fill="#f472b6" opacity="0.6" />
                    <text x="400" y="167" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">c e c</text>
                    <text x="280" y="167" fontSize="11" fill="#f472b6">check(2,4)</text>

                    {/* Level 3 */}
                    <line x1="400" y1="175" x2="400" y2="195" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow42)" />
                    <rect x="340" y="200" width="120" height="30" rx="6" fill="#fbbf24" opacity="0.5" />
                    <text x="400" y="222" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">e</text>
                    <text x="320" y="222" fontSize="11" fill="#fbbf24">base case (len=1)</text>

                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Depth = n/2 = 3 calls → O(n) space, O(n/2) comparisons
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recursive palindrome check compares characters from the ends inward, reducing the problem by 2 each call.
                    The recurrence is T(n) = T(n-2) + O(1) → O(n).
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relations ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Recurrence Relations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Efficient (Compare Ends)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = T(n-2) + O(1), &nbsp; T(0)=T(1)=O(1)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Each step does O(1) work (two comparisons and a function call) and reduces n by 2.
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Solution: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span>
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-emerald-600 dark:text-emerald-400">O(n)</span> (stack)
                    </p>
                  </div>
                  <div className="bg-blue-50/60 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="font-semibold text-blue-600 dark:text-blue-400">Naive (Reverse & Compare)</p>
                    <p className="font-mono text-lg text-center">
                      T(n) = O(n) + O(n) = O(n)
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Reverse is O(n), compare is O(n). Total is O(n), but uses more space.
                    </p>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Space: <span className="font-mono text-blue-600 dark:text-blue-400">O(n)</span> (reversed string)
                    </p>
                  </div>
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
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Biology:</span>{" "}
                      DNA sequences often have palindromic regions that are important for gene regulation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Text Processing:</span>{" "}
                      Checking if a word or phrase is a palindrome is a common interview question and text-processing task.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Classroom Example:</span>{" "}
                      <strong>Abhronila</strong> is checking if the word "racecar" is a palindrome. She compares
                      'r' and 'r', then 'a' and 'a', then 'c' and 'c' — only 3 comparisons instead of reversing
                      the whole string.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Bioinformatics:</span>{" "}
                      Finding palindromic sequences in DNA is important for understanding gene regulation and protein binding.
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
                      tip: "Use character array and indices",
                      desc: "Avoid substring which creates new strings. Use indices for O(1) space per call.",
                    },
                    {
                      tip: "Handle edge cases early",
                      desc: "Check null, empty, and single-character strings before recursion.",
                    },
                    {
                      tip: "Consider iterative version for very large strings",
                      desc: "Recursive version uses O(n) stack space; iterative uses O(1).",
                    },
                    {
                      tip: "Normalize input before checking",
                      desc: "Remove spaces, punctuation, and handle case-insensitivity for real-world use.",
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
                    <strong>Forgetting the base case for empty or single character:</strong> Without base cases,
                    the recursion never terminates or returns incorrect results.
                  </li>
                  <li>
                    <strong>Using substring which creates new strings:</strong> substring creates O(n) strings,
                    leading to O(n²) time. Use indices instead.
                  </li>
                  <li>
                    <strong>Not handling case sensitivity:</strong> "Racecar" and "racecar" should both be palindromes
                    in case-insensitive checks.
                  </li>
                  <li>
                    <strong>Ignoring spaces and punctuation:</strong> "A man a plan a canal Panama" is a classic
                    palindrome when spaces are ignored.
                  </li>
                  <li>
                    <strong>Confusing the recurrence:</strong> T(n) = T(n-2) + O(1) solves to O(n), not O(log n).
                    The reduction by 2 gives linear, not logarithmic.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Debangshu</strong> once thought palindrome check was O(log n) because it "halves"
                      the string. He learned that reducing by 2 gives O(n), not O(log n).
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
                      <strong>Use character array and indices</strong> for O(n) time and O(n) stack space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Normalize the string</strong> by converting to lowercase and removing non-alphanumeric characters.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative version</strong> for O(1) space when recursion depth is a concern.
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
                    "✅ Can you write the recurrence for recursive palindrome check?",
                    "✅ Do you know the time complexity (O(n)) and why?",
                    "✅ Do you know the space complexity (O(n)) and why?",
                    "✅ Can you implement recursive palindrome check using indices?",
                    "✅ Can you handle edge cases (empty, single char)?",
                    "✅ Can you normalize input (case-insensitive, ignore spaces)?",
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
                    <strong>Observe carefully:</strong> For a string of length n, how many comparisons does the
                    recursive palindrome check make? It makes n/2 comparisons. That's O(n) time.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you use substring instead of indices? The recurrence
                    becomes T(n) = T(n-2) + O(n) because substring creates new strings. That would be O(n²)!
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a long word
                    "taco cat" (when spaces ignored). The recursive palindrome check compares characters from the ends
                    inward, taking only O(n) time instead of reversing the whole string.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Recursive Palindrome ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Recursive Palindrome Check — O(n) Time, O(n) Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Efficient recursive palindrome check using character array and indices.
                </p>
                <JavaFileLoader
                  fileModule={recursivePalindromeJava}
                  title="RecursivePalindrome.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Palindrome Comparison ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Palindrome Comparison — Recursive vs Iterative vs Reverse
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares different approaches to palindrome checking.
                </p>
                <JavaFileLoader
                  fileModule={palindromeComparisonJava}
                  title="PalindromeComparison.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Palindrome Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Palindrome Analysis — Step Count and Complexity
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyzes the number of comparisons and stack depth for palindrome checking.
                </p>
                <JavaFileLoader
                  fileModule={palindromeAnalysisJava}
                  title="PalindromeAnalysis.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Palindrome Check — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `The recursive palindrome check is a great example of a linear-time recursive algorithm. 
              I emphasize that the recurrence T(n) = T(n-2) + O(1) is different from the divide-and-conquer 
              recurrence T(n) = 2T(n/2) + O(1) — the latter gives O(n), but the former also gives O(n) 
              because the reduction is by 2, not by half. Students often confuse the two. 
              Also, highlight that using substring in the recursive call changes the complexity to O(n²) 
              because substring creates new strings. This is a common pitfall in Java. 
              The iterative version of palindrome check is O(1) space and is preferred in practice, 
              but the recursive version is valuable for understanding recursion patterns.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 42 · Complexity of Recursive Palindrome Check · Built with ❤️ for the classroom</p>
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

export default Topic42;