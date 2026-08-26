/**
 * Topic 25: Simple Recursion Examples (Factorial, Sum of Digits)
 * File: Topic25.jsx
 *
 * Pedagogical Focus:
 * - Apply recursion to classic beginner problems: factorial and sum of digits.
 * - Reinforce base case, recursive case, and stack unwinding.
 * - Show both value‑returning (factorial, sum) and void (countdown) recursion.
 * - Build on Topics 21‑24.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing recursion trees and digit breakdown.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic25_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic25_files/factorial.c?raw";
import example2 from "./topic25_files/sum_digits.c?raw";
import example3 from "./topic25_files/countdown.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic25-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic25-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic25-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic25-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 25
// ----------------------------------------------------------------------
const Topic25 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic25-root",
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
              🧮 Simple Recursion Examples – Factorial & Sum of Digits
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Now that you understand the theory, let's apply recursion to two
              classic problems: computing a factorial (mathematical definition)
              and summing the digits of a number (digit manipulation). These
              examples solidify the pattern of base case and recursive case.
            </p>
          </section>

          {/* ----- SECTION 2: FACTORIAL (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Example 1: Factorial
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic25-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <strong>Definition:</strong> n! = n × (n‑1) × … × 1, with 0! = 1.
                </p>
                <p className="mb-3">
                  <strong>Recursive definition:</strong>
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Base case: if n == 0, return 1.</li>
                  <li>Recursive case: return n × factorial(n‑1).</li>
                </ul>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">int</span>{" "}
                  <span className="text-amber-300">factorial</span>(<span className="text-emerald-300">int n</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">if</span> (n == 0) <span className="text-purple-400">return</span> 1;
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> n * factorial(n - 1);
                  <br />
                  {"}"}
                </pre>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe:</strong> The recursion reduces n each time,
                  eventually hitting 0.
                </p>
              </div>

              {/* Right: animated SVG – factorial recursion tree */}
              <div
                className={clsx(
                  "topic25-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="280"
                  height="180"
                  viewBox="0 0 280 180"
                  className="w-full max-w-xs"
                >
                  {/* Tree for factorial(4) */}
                  <rect x="120" y="10" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="140" y="28" fill="#d1d5db" fontSize="9" textAnchor="middle">4!</text>

                  <line x1="130" y1="35" x2="100" y2="50" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
                  <line x1="150" y1="35" x2="180" y2="50" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />

                  <rect x="70" y="55" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="90" y="73" fill="#d1d5db" fontSize="9" textAnchor="middle">3!</text>

                  <rect x="150" y="55" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="170" y="73" fill="#d1d5db" fontSize="9" textAnchor="middle">3!</text>

                  {/* Additional levels simplified */}
                  <line x1="80" y1="80" x2="60" y2="95" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
                  <rect x="30" y="100" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="50" y="118" fill="#d1d5db" fontSize="9" textAnchor="middle">2!</text>

                  <defs>
                    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: SUM OF DIGITS (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Example 2: Sum of Digits
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic25-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <strong>Problem:</strong> Given a positive integer, return the sum
                  of its digits (e.g., 123 → 1+2+3 = 6).
                </p>
                <p className="mb-3">
                  <strong>Recursive definition:</strong>
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Base case: if n &lt; 10, return n (single digit).</li>
                  <li>Recursive case: return (n % 10) + sumDigits(n / 10).</li>
                </ul>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">int</span>{" "}
                  <span className="text-amber-300">sumDigits</span>(<span className="text-emerald-300">int n</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">if</span> (n &lt; 10) <span className="text-purple-400">return</span> n;
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (n % 10) + sumDigits(n / 10);
                  <br />
                  {"}"}
                </pre>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe:</strong> n/10 removes the last digit; n%10
                  extracts it. The recursion reduces the number until a single digit.
                </p>
              </div>

              {/* Right: animated SVG – digit breakdown */}
              <div
                className={clsx(
                  "topic25-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="280"
                  height="180"
                  viewBox="0 0 280 180"
                  className="w-full max-w-xs"
                >
                  <text x="40" y="30" fill="#c7d2fe" fontSize="14">123</text>
                  <line x1="70" y1="30" x2="90" y2="50" stroke="#f59e0b" strokeWidth="2" />
                  <text x="100" y="45" fill="#f59e0b" fontSize="10">%10 → 3</text>

                  <rect x="110" y="40" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="130" y="58" fill="#d1d5db" fontSize="9" textAnchor="middle">3</text>

                  <line x1="130" y1="65" x2="130" y2="80" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />

                  <text x="40" y="100" fill="#c7d2fe" fontSize="14">12</text>
                  <line x1="70" y1="100" x2="90" y2="120" stroke="#f59e0b" strokeWidth="2" />
                  <text x="100" y="115" fill="#f59e0b" fontSize="10">%10 → 2</text>

                  <rect x="110" y="110" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="130" y="128" fill="#d1d5db" fontSize="9" textAnchor="middle">2</text>

                  <line x1="130" y1="135" x2="130" y2="150" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />

                  <text x="40" y="170" fill="#c7d2fe" fontSize="14">1</text>
                  <rect x="110" y="160" width="40" height="25" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="130" y="178" fill="#d1d5db" fontSize="9" textAnchor="middle">1</text>

                  <defs>
                    <marker id="arrowHead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 4: COUNTDOWN (additional example) (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Example 3: Countdown (Void Recursion)
            </h2>
            <div className="topic25-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-3">
                Not all recursive functions return a value. A void recursive function
                performs an action at each step, like printing a countdown.
              </p>
              <pre className="rounded bg-gray-800 p-2 text-sm">
                <span className="text-purple-400">void</span>{" "}
                <span className="text-amber-300">countdown</span>(<span className="text-emerald-300">int n</span>) {"{"}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">if</span> (n &lt;= 0) {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;printf(<span className="text-green-300">"Done!\n"</span>);
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span>;
                <br />
                &nbsp;&nbsp;{"}"}
                <br />
                &nbsp;&nbsp;printf(<span className="text-green-300">"%d\n"</span>, n);
                <br />
                &nbsp;&nbsp;countdown(n - 1);
                <br />
                {"}"}
              </pre>
              <p className="mt-3 text-sm italic text-gray-400">
                🔍 <strong>Observe:</strong> The action (printing) happens before the
                recursive call, so numbers print in descending order.
              </p>
            </div>
          </section>

          {/* ----- SECTION 5: PROTOTYPE, RETURN TYPE, PURPOSE (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Signatures and Purpose
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="topic25-card rounded-xl border p-4">
                <h3 className="font-semibold text-indigo-300">Factorial</h3>
                <p><strong>Prototype:</strong> <code>int factorial(int n);</code></p>
                <p><strong>Return:</strong> <code>int</code> – the product.</p>
                <p><strong>Purpose:</strong> Compute n! recursively.</p>
              </div>
              <div className="topic25-card rounded-xl border p-4">
                <h3 className="font-semibold text-indigo-300">Sum of digits</h3>
                <p><strong>Prototype:</strong> <code>int sumDigits(int n);</code></p>
                <p><strong>Return:</strong> <code>int</code> – sum of digits.</p>
                <p><strong>Purpose:</strong> Add all digits of a number.</p>
              </div>
              <div className="topic25-card rounded-xl border p-4">
                <h3 className="font-semibold text-indigo-300">Countdown</h3>
                <p><strong>Prototype:</strong> <code>void countdown(int n);</code></p>
                <p><strong>Return:</strong> <code>void</code> – no value.</p>
                <p><strong>Purpose:</strong> Demonstrate side‑effect recursion.</p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 6: C CODE EXAMPLES (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code Examples
            </h2>

            <EditableCCodeBlock
              title="Example 1: Factorial"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Sum of Digits"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Countdown"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In sum of digits, the recursion
              continues until n becomes a single digit. Trace the calls for 123.
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
              🏫 Recursion in Action at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic25-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> used
                the sum‑of‑digits recursion to implement a digital root function for
                a math game. The recursive version was much shorter than the
                iterative loop.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> wrote a
                factorial function to compute combinations for her probability
                homework. She appreciated how the code directly mirrored the
                mathematical definition.
              </p>
              <p className="mb-4">
                <strong>Ritaja</strong> used countdown to simulate a rocket launch
                sequence in a class project – the recursive print made the code
                elegant and easy to modify.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students now see recursion as a practical tool, not just a
                theoretical concept.
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
            <div className="topic25-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Wrong base case for factorial:
                  </span>{" "}
                  Using <code>n == 1</code> as base works for positive inputs but
                  fails for <code>n == 0</code> (infinite recursion).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Sum of digits with negative numbers:
                  </span>{" "}
                  The given function assumes non‑negative. For negatives, you'd need
                  to handle sign separately.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Off‑by‑one in countdown:
                  </span>{" "}
                  Forgetting to print the base case value (e.g., 0) may miss output.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Stack overflow for large inputs:
                  </span>{" "}
                  Factorial of 100000 will overflow stack (and also overflow int).
                  Know your limits.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not returning in non‑void functions:
                  </span>{" "}
                  Forgetting <code>return</code> in base case leads to undefined
                  behaviour.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How would you modify sum of digits
                to handle negative numbers?
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
              <div className="topic25-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Always test base case
                </h3>
                <p className="text-sm">
                  Call the function with the smallest possible input (0 for factorial,
                  1‑digit for sum) to verify it returns correctly.
                </p>
              </div>
              <div className="topic25-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔁 Trace with small values
                </h3>
                <p className="text-sm">
                  Write the call tree on paper for n=3 or 4 to ensure logic works.
                </p>
              </div>
              <div className="topic25-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📉 Watch for integer overflow
                </h3>
                <p className="text-sm">
                  Factorial grows quickly; use <code>long long</code> or check bounds.
                </p>
              </div>
              <div className="topic25-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Comment base and recursive cases
                </h3>
                <p className="text-sm">
                  {/* Add comment */}
                  Clear comments help others (and you) understand the recursion.
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
              📋 Mini Checklist – Topic 25
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a recursive
                factorial function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a recursive
                sum‑of‑digits function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the base
                cases for both.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can trace the recursion
                for small inputs.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know the pitfalls
                (missing base, negative numbers, overflow).
              </li>
            </ul>
          </section>

          {/* ----- SECTION 11: TEACHER'S NOTE (delay-1.0s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:1.0s]",
              "topic25-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong>: these simple examples are the
                  'Hello World' of recursion. Master them, and you'll be ready for
                  trees, backtracking, and more. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When you're stuck, write the function with
                    the base case first – it forces you to think about the stopping
                    condition before the recursive step.
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
                In the sum of digits example, what happens if you use{" "}
                <code>n / 10</code> instead of <code>n / 10</code> in the recursive
                call? (No change – it's correct.) Now try swapping the order:{" "}
                <code>return sumDigits(n/10) + n%10;</code> – does it still work?
                Why?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Addition is commutative, so order doesn't matter for sum, but it
                  affects the order of evaluation – both work.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 25 complete – you've implemented classic recursion. Next: when to
            avoid recursion.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic25;