/**
 * Topic 24: Advantages and Disadvantages of Recursion
 * File: Topic24.jsx
 *
 * Pedagogical Focus:
 * - Present a balanced view of recursion: its strengths and weaknesses.
 * - Help students decide when to use recursion and when to avoid it.
 * - Compare recursion with iteration.
 * - Build on Topics 21‑23 (recursion concepts, stack behavior).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing a balance scale of pros and cons.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic24_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic24_files/factorial_recursive.c?raw";
import example2 from "./topic24_files/factorial_iterative.c?raw";
import example3 from "./topic24_files/fibonacci_recursive.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic24-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic24-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic24-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic24-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 24
// ----------------------------------------------------------------------
const Topic24 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic24-root",
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
            <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-indigo-400 dark:text-indigo-400">
              ⚖️ Advantages and Disadvantages of Recursion
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Recursion is a powerful technique, but it's not always the best choice.
              Understanding its strengths and weaknesses helps you decide when to
              use it and when to reach for iteration instead.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – PROS & CONS (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 The Trade‑Offs of Recursion
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: advantages */}
              <div className="topic24-card rounded-xl border border-emerald-700/50 bg-emerald-900/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-3 text-lg font-semibold text-emerald-300">
                  ✅ Advantages
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Elegance and clarity:</strong> Many problems (tree traversal,
                    mathematical definitions) have natural recursive solutions that are
                    short and readable.
                  </li>
                  <li>
                    <strong>Simpler code:</strong> Recursive code often mirrors the
                    mathematical definition directly (e.g., factorial, Fibonacci).
                  </li>
                  <li>
                    <strong>Complex data structures:</strong> Recursion is ideal for
                    structures like trees, graphs, and nested lists.
                  </li>
                  <li>
                    <strong>Divide and conquer:</strong> Algorithms like quicksort,
                    mergesort are naturally recursive.
                  </li>
                  <li>
                    <strong>Backtracking:</strong> Problems like maze solving, N‑Queens
                    are easier with recursion.
                  </li>
                </ul>
              </div>

              {/* Right: disadvantages */}
              <div className="topic24-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-3 text-lg font-semibold text-amber-300">
                  ❌ Disadvantages
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Stack memory usage:</strong> Each recursive call adds a
                    stack frame; deep recursion may cause stack overflow.
                  </li>
                  <li>
                    <strong>Performance overhead:</strong> Function calls cost time
                    (pushing/poping frames). Iterative loops are often faster.
                  </li>
                  <li>
                    <strong>Risk of infinite recursion:</strong> If base case is missing
                    or unreachable, the program crashes.
                  </li>
                  <li>
                    <strong>Harder to debug:</strong> Tracing recursive calls can be
                    complex, especially with many levels.
                  </li>
                  <li>
                    <strong>No tail‑call optimization guarantee in C:</strong> Even
                    tail‑recursive functions may consume stack.
                  </li>
                </ul>
              </div>
            </div>

            {/* Balance scale SVG */}
            <div
              className={clsx(
                "topic24-card mt-4 flex items-center justify-center rounded-xl border p-4",
                "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              )}
            >
              <svg
                width="300"
                height="150"
                viewBox="0 0 300 150"
                className="w-full max-w-md"
              >
                {/* Scale beam */}
                <line x1="50" y1="75" x2="250" y2="75" stroke="#9ca3af" strokeWidth="4" />
                {/* Center pivot */}
                <circle cx="150" cy="75" r="8" fill="#4b5563" />
                <line x1="150" y1="67" x2="150" y2="30" stroke="#9ca3af" strokeWidth="2" />
                <circle cx="150" cy="25" r="5" fill="#6b7280" />

                {/* Left pan (advantages) */}
                <circle cx="90" cy="100" r="15" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2">
                  <animate attributeName="cy" values="100;98;100" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="90" y="105" fill="#10b981" fontSize="10" textAnchor="middle">Pros</text>

                {/* Right pan (disadvantages) */}
                <circle cx="210" cy="100" r="15" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2">
                  <animate attributeName="cy" values="100;102;100" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="210" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle">Cons</text>

                {/* Connecting strings */}
                <line x1="110" y1="85" x2="90" y2="100" stroke="#9ca3af" strokeWidth="2" />
                <line x1="190" y1="85" x2="210" y2="100" stroke="#9ca3af" strokeWidth="2" />
              </svg>
            </div>
          </section>

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (conceptual) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Recursion and Function Signatures
            </h2>
            <div className="topic24-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Prototype / signature:</strong> Recursion does not change
                how a function is declared. The signature is the same as any other
                function. For example:
              </p>
              <pre className="mb-2 rounded bg-gray-800 p-2 text-sm">
                <span className="text-purple-400">int</span>{" "}
                <span className="text-amber-300">factorial</span>(<span className="text-emerald-300">int n</span>);
              </pre>
              <p className="mb-2">
                <strong>Return type:</strong> Determined by the value being computed.
                The base case must return a value of this type.
              </p>
              <p className="mb-2">
                <strong>Purpose:</strong> The choice of recursion vs iteration is a
                design decision based on the problem's nature, readability, and
                performance requirements.
              </p>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we teach: “Let the problem
                guide your choice – if it's naturally recursive, use recursion; if
                performance or depth is a concern, consider iteration.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – comparison (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Recursive vs Iterative
            </h2>

            <EditableCCodeBlock
              title="Example 1: Recursive factorial (elegant but uses stack)"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Iterative factorial (efficient, no stack growth)"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Recursive Fibonacci (inefficient, exponential time)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> The recursive Fibonacci
              recomputes the same values many times. For n=40, it becomes extremely
              slow – a classic example of recursion's downside.
            </div>
          </section>

          {/* ----- SECTION 5: REAL‑WORLD CONTEXT – students & places (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Recursion in Practice at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic24-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Abhronila</strong> used
                recursion to list all files in a directory tree. It was concise and
                worked beautifully – until she ran it on a deeply nested directory
                and got a stack overflow. She then rewrote it iteratively using a
                stack data structure.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> wrote a
                recursive quicksort for a programming contest. It was fast and
                elegant. But when sorting a huge array, he had to ensure the recursion
                depth didn't exceed the stack limit – he used an iterative version
                for the large case.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Tuhina, Ritaja</strong> now
                evaluate both options before coding.
              </p>
            </div>
          </section>

          {/* ----- SECTION 6: COMMON PITFALLS (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic24-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Overusing recursion:
                  </span>{" "}
                  Using recursion for simple loops (e.g., printing 1 to 10) adds
                  unnecessary overhead and risk.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring stack depth:
                  </span>{" "}
                  Not considering that even correct recursion can overflow with
                  large inputs.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming tail recursion optimization:
                  </span>{" "}
                  In C, tail recursion may not be optimized; you might still get
                  stack growth.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Choosing recursion for performance‑critical code:
                  </span>{" "}
                  Iteration is usually faster due to less function call overhead.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not testing with maximum input:
                  </span>{" "}
                  A function that works for n=10 may crash for n=10000.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How would you decide whether to use
                recursion or iteration for a given problem?
              </p>
            </div>
          </section>

          {/* ----- SECTION 7: BEST PRACTICES & PRO TIPS (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic24-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Use recursion for naturally recursive problems
                </h3>
                <p className="text-sm">
                  Trees, graphs, divide‑and‑conquer algorithms – these are recursion's
                  sweet spot.
                </p>
              </div>
              <div className="topic24-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📉 Prefer iteration for deep or performance‑sensitive tasks
                </h3>
                <p className="text-sm">
                  Loops avoid stack overhead and are safer for large inputs.
                </p>
              </div>
              <div className="topic24-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Know your stack limit
                </h3>
                <p className="text-sm">
                  On many systems, stack size is around 1‑8 MB. Estimate maximum
                  frames (each frame may be tens of bytes) to avoid overflow.
                </p>
              </div>
              <div className="topic24-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔁 Consider memoization for recursive functions
                </h3>
                <p className="text-sm">
                  For problems like Fibonacci, caching results can turn exponential
                  time into linear.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 8: MINI CHECKLIST (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 24
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can list at least three
                advantages of recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can list at least three
                disadvantages of recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the trade‑offs
                between recursion and iteration.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can decide when to use
                recursion and when to avoid it.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that C does not
                guarantee tail‑call optimization.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic24-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “I tell my students at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong>: recursion is like a powerful tool
                  in a toolbox. You wouldn't use a sledgehammer to hang a picture,
                  nor a screwdriver to break concrete. Choose the right tool for
                  the job. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When in doubt, prototype with recursion for
                    clarity, then if performance is an issue, convert to iteration.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: HINT – subtle guidance (delay-0.9s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.9s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In the recursive Fibonacci example, add a counter to see how many
                times <code>fib(1)</code> is called for n=40. (It's massive!) Then
                search online for “memoization” – how would you add a cache to
                improve it?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Memoization transforms exponential recursion into linear time.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 24 complete – you've weighed the pros and cons of recursion. Next:
            simple recursion examples (factorial, sum of digits).
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic24;