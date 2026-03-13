/**
 * Topic 26: When to Avoid Recursion
 * File: Topic26.jsx
 *
 * Pedagogical Focus:
 * - Identify scenarios where recursion is inappropriate or dangerous.
 * - Discuss stack overflow, performance overhead, and inherent iterative problems.
 * - Compare recursive vs iterative solutions.
 * - Build on Topics 21‑25.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing deep recursion leading to overflow vs safe loop.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic26_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic26_files/factorial_recursive.c?raw";
import example2 from "./topic26_files/factorial_iterative.c?raw";
import example3 from "./topic26_files/fibonacci_inefficient.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes shakeWarning {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  @media (prefers-color-scheme: light) {
    .topic26-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic26-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic26-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic26-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 26
// ----------------------------------------------------------------------
const Topic26 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic26-root",
          "min-h-screen w-full px-4 py-8 md:px-8 lg:px-16",
          "transition-colors duration-300",
          "font-sans leading-relaxed"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ----- SECTION 1: TITLE + INTRO (fadeSlideUp, delay-0) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none"
            )}
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-400 dark:text-indigo-400">
              ⚠️ When to Avoid Recursion
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Recursion is elegant, but it's not a silver bullet. In many situations,
              recursion can lead to crashes, poor performance, or unnecessarily
              complex code. Knowing when <em>not</em> to use recursion is as
              important as knowing how to use it.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 When Recursion Fails
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: list of scenarios */}
              <div className="topic26-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <ul className="list-disc space-y-3 pl-5">
                  <li>
                    <strong className="text-amber-300">Deep recursion:</strong> If the
                    recursion depth can exceed the stack limit (typically a few thousand
                    calls), stack overflow will crash the program.
                  </li>
                  <li>
                    <strong className="text-amber-300">Performance‑critical code:</strong>{" "}
                    Function call overhead and lack of tail‑call optimization in C make
                    recursion slower than iteration.
                  </li>
                  <li>
                    <strong className="text-amber-300">Problems with exponential complexity:</strong>{" "}
                    Some recursive solutions (e.g., naive Fibonacci) recompute the same
                    values many times, making them impractical.
                  </li>
                  <li>
                    <strong className="text-amber-300">Naturally iterative problems:</strong>{" "}
                    Simple loops (e.g., iterating over an array) are clearer and safer
                    when written iteratively.
                  </li>
                  <li>
                    <strong className="text-amber-300">Limited stack size environments:</strong>{" "}
                    In embedded systems or kernels, stack space is precious – recursion
                    is often banned.
                  </li>
                </ul>
                <p className="mt-4 text-sm italic text-gray-400">
                  🔍 <strong>Observe:</strong> Each of these cases suggests that an
                  iterative solution would be more reliable.
                </p>
              </div>

              {/* Right: animated SVG – deep stack vs safe loop */}
              <div
                className={clsx(
                  "topic26-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Left: recursive stack growing too deep */}
                  <rect x="20" y="30" width="100" height="150" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="70" y="20" fill="#9ca3af" fontSize="10" textAnchor="middle">Recursion</text>

                  <rect x="30" y="160" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="140" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="120" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="100" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="80" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="60" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="40" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <rect x="30" y="20" width="80" height="15" rx="2" fill="#1f2937" stroke="#6b7280" />
                  <text x="70" y="185" fill="#f87171" fontSize="9" textAnchor="middle">overflow!</text>
                  <line x1="110" y1="20" x2="130" y2="20" stroke="#f87171" strokeWidth="3" />

                  {/* Right: iterative loop – safe */}
                  <rect x="180" y="30" width="100" height="150" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="230" y="20" fill="#9ca3af" fontSize="10" textAnchor="middle">Iteration</text>

                  <circle cx="230" cy="60" r="8" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5">
                    <animate attributeName="cy" values="60;120;60" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="230" cy="45" fill="#10b981" fontSize="9" textAnchor="middle">loop</text>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: DEEP RECURSION AND STACK OVERFLOW (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Danger: Deep Recursion
            </h2>
            <div className="topic26-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-3">
                Each recursive call consumes stack memory. The stack size is limited
                (typically 1–8 MB). For a function that uses ~50 bytes per frame,
                100,000 calls would need 5 MB – likely to overflow.
              </p>
              <p className="mb-3">
                <strong>Example:</strong> A recursive function to sum 1..n might work
                for n=1000 but crash for n=100000.
              </p>
              <pre className="rounded bg-gray-800 p-2 text-sm">
                <span className="text-gray-400">// May overflow for large n</span>
                <br />
                <span className="text-purple-400">int</span> sum(<span className="text-emerald-300">int n</span>) {"{"}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">if</span> (n == 0) <span className="text-purple-400">return</span> 0;
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> n + sum(n - 1);
                <br />
                {"}"}
              </pre>
              <p className="mt-3 text-sm italic text-gray-400">
                🔍 <strong>Observe:</strong> The iterative version uses O(1) stack.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: PERFORMANCE OVERHEAD (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Performance Overhead
            </h2>
            <div className="topic26-card rounded-xl border p-6">
              <p>
                Function calls have overhead: pushing parameters, saving registers,
                jumping, returning. A loop avoids all that. In performance‑critical
                code, even a few microseconds per call can add up.
              </p>
              <p className="mt-2">
                Additionally, C does not guarantee tail‑call optimization, so even
                tail‑recursive functions (where the recursive call is the last
                operation) may still use stack frames.
              </p>
            </div>
          </section>

          {/* ----- SECTION 5: EXPONENTIAL COMPLEXITY – NAIVE FIBONACCI (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Exponential Recursion: Fibonacci
            </h2>
            <div className="topic26-card rounded-xl border p-6">
              <p className="mb-3">
                The naive recursive Fibonacci function has O(2ⁿ) time complexity.
                Computing fib(40) calls the function billions of times.
              </p>
              <pre className="rounded bg-gray-800 p-2 text-sm">
                <span className="text-purple-400">int</span> fib(<span className="text-emerald-300">int n</span>) {"{"}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">if</span> (n &lt;= 1) <span className="text-purple-400">return</span> n;
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> fib(n-1) + fib(n-2);
                <br />
                {"}"}
              </pre>
              <p className="mt-3">
                This is a classic case where recursion <em>must</em> be avoided.
                Iterative or memoized solutions are far better.
              </p>
            </div>
          </section>

          {/* ----- SECTION 6: C CODE EXAMPLES – recursion vs iteration (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code: Recursion vs Iteration
            </h2>

            <EditableCCodeBlock
              title="Example 1: Recursive factorial (elegant but risky for large n)"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Iterative factorial (safe, fast, no stack growth)"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Naive Fibonacci – DO NOT USE for large n!"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> For factorial, the recursive version is
              short, but for n=100000 it will overflow. The iterative version handles
              any n (within integer range). For Fibonacci, avoid the recursive version
              entirely.
            </div>
          </section>

          {/* ----- SECTION 7: REAL‑WORLD CONTEXT – students & places (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Lessons Learned at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic26-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Tuhina</strong> wrote a
                recursive function to compute the sum of the first n numbers. It worked
                perfectly for n=100. For n=1,000,000, the program crashed mysteriously.
                She learned about stack overflow the hard way.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> proudly
                showed his recursive Fibonacci function for n=50 – it didn't finish
                after 5 minutes. He then wrote an iterative version that ran in
                microseconds.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Abhronila, Ritaja</strong> now
                always consider the depth and complexity before choosing recursion.
              </p>
            </div>
          </section>

          {/* ----- SECTION 8: COMMON PITFALLS (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic26-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming recursion is always elegant:
                  </span>{" "}
                  Not every problem benefits from recursion. Overuse leads to
                  unreadable and fragile code.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring stack limits:
                  </span>{" "}
                  Not realising that even correct recursion can overflow with large
                  inputs.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Using recursion for simple loops:
                  </span>{" "}
                  Writing <code>printNumbers(n)</code> recursively when a for loop
                  is simpler and safer.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not benchmarking:
                  </span>{" "}
                  Assuming the recursive version is fast enough without testing.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Believing in tail‑call optimization:
                  </span>{" "}
                  In C, it's not guaranteed – don't rely on it.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How would you estimate the maximum
                safe recursion depth on your system?
              </p>
            </div>
          </section>

          {/* ----- SECTION 9: BEST PRACTICES & PRO TIPS (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic26-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Estimate depth first
                </h3>
                <p className="text-sm">
                  If recursion depth could exceed a few thousand, use iteration.
                </p>
              </div>
              <div className="topic26-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ⚡ Profile both versions
                </h3>
                <p className="text-sm">
                  When performance matters, measure recursive vs iterative.
                </p>
              </div>
              <div className="topic26-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧠 Use memoization for recursion
                </h3>
                <p className="text-sm">
                  For problems like Fibonacci, caching results can salvage recursion.
                </p>
              </div>
              <div className="topic26-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Know your stack size
                </h3>
                <p className="text-sm">
                  On Unix, <code>ulimit -s</code> shows stack size. Use it to gauge
                  safety.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: MINI CHECKLIST (delay-0.9s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.9s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 26
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify when
                recursion might cause stack overflow.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the
                performance overhead of function calls.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know why naive Fibonacci
                is a bad use of recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can choose iteration
                over recursion when appropriate.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I never assume tail‑call
                optimization in C.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 11: TEACHER'S NOTE (delay-1.0s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:1.0s]",
              "topic26-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
              "transition-all duration-300 hover:scale-[1.01] hover:border-indigo-400 hover:shadow-2xl"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🧑‍🏫</div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold text-indigo-300">
                  Teacher’s Note
                </h2>
                <p className="mb-2 font-medium text-indigo-200">
                  Sukanta Hui — Mentor, C Programming
                </p>
                <p className="mb-2 text-sm">
                  📧 sukantahui@codernaccotax.co.in &nbsp;|&nbsp; 📱 7003756860
                  &nbsp;|&nbsp; 💻 {experienceYears} years (since 1998)
                </p>
                <p className="text-gray-300">
                  “I've seen students fall in love with recursion and try to use it
                  everywhere – including places it doesn't belong. At{" "}
                  <strong>Barrackpore CNAT</strong> and <strong>Naihati CNAT</strong>,
                  I remind them: recursion is a tool, not a religion. If it crashes
                  or crawls, switch to iteration. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When you write a recursive function, always
                    ask yourself: ‘Could this be written as a simple loop?’ If yes,
                    and depth is a concern, write the loop.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 12: HINT – subtle guidance (delay-1.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:1.1s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In the recursive factorial example, try computing factorial of 100000.
                What happens? (Don't actually run it if you value your IDE's stability!)
                Then try the iterative version. Why does one crash and the other not?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The recursive version exhausts stack; the iterative uses constant
                  stack.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 26 complete – you now know when to avoid recursion. Next: header
            files – purpose and structure.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic26;