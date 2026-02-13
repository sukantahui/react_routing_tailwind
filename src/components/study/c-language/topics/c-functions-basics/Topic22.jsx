/**
 * Topic 22: Base Condition and Recursive Case
 * File: Topic22.jsx
 *
 * Pedagogical Focus:
 * - Deep dive into the two essential components of recursion.
 * - Base case: the condition that stops recursion.
 * - Recursive case: the call to itself with modified arguments.
 * - Emphasise that every recursive function must have both, and the recursive case must move toward the base case.
 * - Build on Topic 21.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing recursion with highlighted base case.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic22_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic22_files/factorial_base.c?raw";
import example2 from "./topic22_files/sum_natural.c?raw";
import example3 from "./topic22_files/print_digits.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic22-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic22-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic22-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic22-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 22
// ----------------------------------------------------------------------
const Topic22 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic22-root",
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
              🛑 Base Condition and Recursive Case
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Every recursive function has two indispensable parts: the
              <strong> base case</strong> that stops the recursion, and the
              <strong> recursive case</strong> that moves the problem toward the
              base case. Understanding this pair is the key to writing correct
              recursion.
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
              📌 The Two Essential Parts
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic22-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  🧩 Base Case
                </h3>
                <p className="mb-3">
                  The base case is a condition that, when true, causes the function
                  to return without making a recursive call. It defines the simplest
                  instance of the problem that can be solved directly.
                </p>
                <pre className="mb-4 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">if</span> (n == 0) {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> 1;
                  <br />
                  {"}"}
                </pre>

                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  🔄 Recursive Case
                </h3>
                <p className="mb-3">
                  The recursive case is where the function calls itself, typically
                  with modified arguments that progress toward the base case.
                </p>
                <pre className="rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">return</span> n * factorial(n - 1);
                </pre>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> Without a base case, the
                  recursion never stops. Without progress in the recursive case,
                  the base case may never be reached.
                </p>
              </div>

              {/* Right: animated SVG – recursion tree with base case highlight */}
              <div
                className={clsx(
                  "topic22-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Recursion tree for factorial(3) */}
                  <rect x="130" y="20" width="60" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="160" y="38" fill="#d1d5db" fontSize="9" textAnchor="middle">fact(3)</text>

                  <line x1="145" y1="45" x2="130" y2="60" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
                  <line x1="175" y1="45" x2="190" y2="60" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />

                  <rect x="90" y="65" width="50" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="115" y="83" fill="#d1d5db" fontSize="9" textAnchor="middle">fact(2)</text>

                  <rect x="160" y="65" width="50" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="185" y="83" fill="#d1d5db" fontSize="9" textAnchor="middle">fact(1)</text>

                  <line x1="100" y1="90" x2="90" y2="105" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
                  <line x1="130" y1="90" x2="140" y2="105" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />

                  <rect x="60" y="110" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="80" y="128" fill="#d1d5db" fontSize="9" textAnchor="middle">fact(0)</text>

                  <rect x="120" y="110" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="140" y="128" fill="#d1d5db" fontSize="9" textAnchor="middle">fact(1)</text>

                  {/* Highlight base case */}
                  <rect x="55" y="105" width="50" height="35" rx="6" fill="none" stroke="#6ee7b7" strokeWidth="3" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" values="0;20;0" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="80" y="150" fill="#6ee7b7" fontSize="8" textAnchor="middle">base case</text>

                  <defs>
                    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Anatomy of a Recursive Function
            </h2>
            <div className="topic22-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Prototype / signature:</strong> Same as any function, but the
                logic inside contains a conditional that separates base and recursive
                cases.
              </p>
              <p className="mb-2">
                <strong>Return type:</strong> Can be <code>void</code> (for actions)
                or any type (for computations). The base case must return a value
                consistent with the return type.
              </p>
              <p className="mb-2">
                <strong>Purpose:</strong> To solve problems by reducing them to
                smaller instances of the same problem. The base case provides the
                trivial solution.
              </p>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “The base case is
                your escape route; the recursive case is the journey toward it.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Examples in C
            </h2>

            <EditableCCodeBlock
              title="Example 1: Factorial with clear base case (n == 0)"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Sum of first n natural numbers"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Print digits of a number (base case: single digit)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> Each example has a clear
              base case that stops recursion, and each recursive call modifies
              the argument to move toward that base case.
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
              🏫 Base Case Lessons at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic22-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> wrote a
                recursive function to compute powers. He forgot the base case for
                exponent 0 – the program crashed with stack overflow. He learned to
                always write the base case first.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> wrote a
                recursive directory traversal but used <code>n+1</code> instead of
                <code>n-1</code> in her recursive call. The base case was never
                reached, and the recursion ran until memory ran out.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Tuhina, Debangshu, Ritaja</strong> now
                religiously check both parts before running any recursive code.
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
            <div className="topic22-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Missing base case:
                  </span>{" "}
                  The function never stops calling itself → stack overflow.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Base case never reached:
                  </span>{" "}
                  The recursive call does not progress toward the base case
                  (e.g., <code>n+1</code> instead of <code>n-1</code>).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Wrong base case condition:
                  </span>{" "}
                  Using <code>if (n == 1)</code> when it should be <code>n == 0</code>
                  may work for some inputs but fail for others (e.g., factorial of 0).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to return in base case:
                  </span>{" "}
                  In a non‑void recursive function, the base case must return a
                  value; otherwise, undefined behaviour occurs.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Multiple recursive calls without combining results:
                  </span>{" "}
                  For problems like Fibonacci, forgetting to combine the results of
                  recursive calls leads to incorrect values.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you accidentally
                write <code>return factorial(n);</code> instead of
                <code>return n * factorial(n-1);</code>?
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
              <div className="topic22-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Write base case first
                </h3>
                <p className="text-sm">
                  Before writing any recursive call, decide what stops the recursion.
                  Implement that condition and return the appropriate value.
                </p>
              </div>
              <div className="topic22-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📉 Ensure progress
                </h3>
                <p className="text-sm">
                  Verify that each recursive call moves toward the base case
                  (e.g., decreasing a counter, reducing a problem size).
                </p>
              </div>
              <div className="topic22-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Test edge cases
                </h3>
                <p className="text-sm">
                  Test with the smallest input (base case directly) and then with
                  slightly larger ones.
                </p>
              </div>
              <div className="topic22-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Use comments to label cases
                </h3>
                <p className="text-sm">
                  Clearly comment <code>/* base case */</code> and{" "}
                  <code>/* recursive case */</code> for readability.
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
              📋 Mini Checklist – Topic 22
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify the base
                case in a recursive function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify the
                recursive case and how it progresses.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that both parts
                are mandatory.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain what happens
                if the base case is missing.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a recursive
                function with a proper base case.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic22-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong>: imagine climbing down a ladder. The
                  base case is the ground – you stop there. The recursive case is
                  each step down. If you skip a rung (wrong progression) or there is
                  no ground (missing base case), you fall forever. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When designing recursion, first write the
                    base case as a comment, then the recursive case. This mental
                    discipline prevents infinite loops.
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
                In the factorial example, change the base case condition from{" "}
                <code>n == 0</code> to <code>n == 1</code>. Test with <code>n = 0</code>.
                What happens? Why?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Factorial(0) would never hit the base case and keep decreasing
                  toward negative infinity – stack overflow.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 22 complete – you now understand the critical pair of recursion.
            Next: stack memory behavior in recursion.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic22;