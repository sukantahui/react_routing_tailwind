import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic5_files/
import factorial from "./topic5_files/factorial.c?raw";
import multiplicationTable from "./topic5_files/multiplication_table.c?raw";
import sumNumbers from "./topic5_files/sum_numbers.c?raw";

/**
 * Topic5: Classic loop problems – factorial, multiplication table, sum of numbers
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 5
 * @description
 *   Applies while, do-while, and for loops to three fundamental problems.
 *   Reinforces counter‑controlled loops, accumulators, and iteration patterns.
 *   Builds on Topics 0–4; does not introduce new syntax.
 *
 * @pedagogical
 *   - Topic5 – first application‑heavy topic
 *   - Focus: translating problems into loop logic
 *   - Uses student names (Tuhina, Swadeep, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic5 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes multiplyPulse {
          0%, 100% { fill: #3b82f6; opacity: 0.3; }
          50% { fill: #2563eb; opacity: 0.8; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🧮 Classic Loop Problems
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Factorial · Multiplication Table · Sum of Numbers
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🔁 Counter loop
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📦 Accumulator pattern
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧠 Algorithmic thinking
            </span>
          </div>
        </section>

        {/* ---------- CONCEPTUAL OVERVIEW (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧩</span> Why these three?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">🔢</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Factorial</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Multiplies decreasing integers – perfect for a <code>for</code> loop
                with a product accumulator.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">✖️</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiplication Table</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Fixed‑iteration loop from 1 to 10. Clear, predictable, great for tracing.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">➕</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sum of N Numbers</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Classic accumulator pattern; introduces running total.
              </p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            These three problems appear in every programming course because they
            illustrate the essential loop patterns: <strong>counter control</strong>,
            <strong>accumulator</strong>, and <strong>fixed iteration</strong>. Mastering
            them prepares you for 80% of real‑world loop tasks.
          </p>
        </section>

        {/* ---------- FACTORIAL (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🔢</span> Factorial (n!)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype (function form)
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>long long factorial(int n);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>long long</code> (to hold large values)<br />
                  <strong>Purpose:</strong> Compute n! = 1 × 2 × 3 × … × n<br />
                  <strong>When:</strong> Combinatorics, probability, series expansions
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> Initialize <code>fact = 1</code>. Loop from 1 to n,
                multiplying <code>fact</code> by each number.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
                <span className="font-semibold">💡 Tip:</span> Factorial grows extremely fast.
                20! is already beyond 64‑bit. Use <code>long long</code> for n ≤ 20.
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 factorial.c – iterative version"
                initialCode={factorial}
              />
            </div>
          </div>
        </section>

        {/* ---------- MULTIPLICATION TABLE (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">✖️</span> Multiplication Table
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype (function form)
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>void printTable(int n);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>void</code> (prints result)<br />
                  <strong>Purpose:</strong> Display multiplication table of n from 1 to 10<br />
                  <strong>When:</strong> Teaching arithmetic, generating reports
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> Loop i from 1 to 10, print <code>n × i = n*i</code>.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
                <span className="font-semibold">💡 Tip:</span> Use <code>%2d</code> to align
                columns. A nested loop can generate a full table (Topic7).
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 multiplication_table.c – single table"
                initialCode={multiplicationTable}
              />
            </div>
          </div>
        </section>

        {/* ---------- SUM OF NUMBERS (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">➕</span> Sum of First N Natural Numbers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype (function form)
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>int sumN(int n);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>int</code> (result)<br />
                  <strong>Purpose:</strong> Compute 1 + 2 + … + n<br />
                  <strong>When:</strong> Statistics, series, physics calculations
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> Initialize <code>sum = 0</code>. Loop i from 1 to n,
                add i to sum.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
                <span className="font-semibold">💡 Tip:</span> There's a closed‑form formula
                <code>n*(n+1)/2</code>. Loops teach the <em>process</em>, but in production,
                use the formula for performance.
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 sum_numbers.c – sum of 1..n"
                initialCode={sumNumbers}
              />
            </div>
          </div>
        </section>

        {/* ---------- REAL-WORLD SCENARIOS (delay 0.5s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.5s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> Where are these used?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">🧮</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">Factorial</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Barrackpore:</strong> Tuhina's combinatorics homework – number of ways to arrange 7 books.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">🏪</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">Multiplication Table</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Shyamnagar:</strong> Swadeep's grocery store – calculate price for 1–10 kg of rice.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">📊</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">Sum of Numbers</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Ichapur:</strong> Abhronila's class total marks – sum of 45 students' scores.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- TIPS, TRICKS & PITFALLS (delay 0.6s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.6s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Common mistakes & best practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Common Pitfalls */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Beginner mistakes
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Factorial:</strong> Starting from 0 – <code>fact = 0</code> gives zero product.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Factorial:</strong> Not using <code>long long</code> for n &gt; 12 – overflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Multiplication table:</strong> Off‑by‑one – loop 0–9 instead of 1–10.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Sum:</strong> Uninitialized sum variable (garbage value).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>All:</strong> Using the wrong loop type – e.g., do‑while when zero iterations should be allowed.</span>
                </li>
              </ul>
            </div>
            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Best practices
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Always initialise accumulators</strong> – <code>sum = 0</code>, <code>fact = 1</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use meaningful variable names</strong> – <code>factorial</code>, <code>product</code>, <code>total</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Check input validity</strong> – factorial undefined for negative n; sum only for positive.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Prefer for loops for fixed counts</strong> – these three problems are ideal for for.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Test with edge cases</strong> – n=0, n=1, n=maximum.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hint Section */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
              💭 Think about…
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              …what happens to the factorial of 0? Does your loop handle it correctly?<br />
              <strong>Try changing this:</strong> In the sum example, modify the loop to start from 0.
              How does the output change? Why?
            </p>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST (delay 0.7s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.7s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">✅</span> Mini checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {[
              "I can write a for loop to compute n!.",
              "I can generate a multiplication table for any integer.",
              "I can calculate the sum of first N natural numbers.",
              "I remember to initialise accumulators (0 for sum, 1 for product).",
              "I check for overflow in factorial (use long long).",
              "I can choose the right loop (for is best here).",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-xl">✔️</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE (delay 0.8s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.8s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧑‍🏫</span> Teacher’s Note
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🧔</span>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sukanta Hui
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📧 sukantahui@codernaccotax.co.in
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">📱 7003756860</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Experience:</span> {experienceYears} years
                (since 1998)
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Skills:</span> Programming Language, RDBMS,
                Operating System, Web Development
              </p>
              <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-gray-800 dark:text-gray-200 italic">
                  “These three problems are the ‘Sita Ram’ of programming – every student
                  must write them by hand at least once. I ask Debangshu to trace factorial
                  on the board, and Tuhina to explain why we start product at 1, not 0.
                  Once they internalise the accumulator pattern, loops become a tool,
                  not a mystery.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Accumulator initialisation</strong> – sum: 0, product: 1.</li>
                <li><strong>Off‑by‑one</strong> – loop ≤ n, not &lt; n.</li>
                <li><strong>Overflow awareness</strong> – introduce early.</li>
                <li><strong>Real‑world hook</strong> – canteen bills, class totals, seating arrangements.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic5;