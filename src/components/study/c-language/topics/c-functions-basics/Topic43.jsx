import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import recursiveFactorial from "./topic43_files/recursive_factorial.c?raw";
import iterativeFactorial from "./topic43_files/iterative_factorial.c?raw";

const Topic43 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            Recursion vs Iteration – Comparison
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Two ways to repeat: one calls itself, the other loops. When to use
          which, and why.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Two Paths to Repetition</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Swadeep needs to calculate the factorial of a
          number. He can write a function that calls itself repeatedly
          (recursion) or one that uses a loop (iteration). Both get the job
          done, but they differ in elegance, memory use, and performance.
          Recursion mirrors mathematical definitions closely; iteration often
          wins in efficiency. Understanding the trade‑offs helps you choose the
          right tool for the job.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-12 overflow-x-auto">
        <table className="w-full border-collapse rounded-xl bg-gray-50 dark:bg-gray-800">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="p-4 text-left text-lg font-semibold">Aspect</th>
              <th className="p-4 text-left text-lg font-semibold">Recursion</th>
              <th className="p-4 text-left text-lg font-semibold">Iteration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
            {[
              {
                aspect: "Definition",
                rec: "Function calls itself to solve smaller instances",
                it: "Uses loops (for, while) to repeat a block of code",
              },
              {
                aspect: "Memory Usage",
                rec: "Each call adds a stack frame – O(n) memory",
                it: "Constant memory (O(1)), no call stack overhead",
              },
              {
                aspect: "Speed",
                rec: "Function call overhead; may be slower",
                it: "Generally faster, no call overhead",
              },
              {
                aspect: "Readability",
                rec: "Elegant for problems with recursive structure (tree, factorial, etc.)",
                it: "Straightforward for linear problems",
              },
              {
                aspect: "Infinite Loop Risk",
                rec: "Stack overflow if base case missing",
                it: "Infinite loop if condition never false",
              },
              {
                aspect: "Tail Call Optimisation",
                rec: "Can be optimised to iteration in some languages (not guaranteed in C)",
                it: "Not applicable",
              },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-4 font-medium">{row.aspect}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{row.rec}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{row.it}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Factorial: Two Implementations</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-purple-200 bg-purple-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-purple-900 dark:bg-purple-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-purple-700 dark:text-purple-400">
              <span className="mr-2">🔄</span> Recursive Factorial
            </h3>
            <EditableCCodeBlock
              title="recursive_factorial.c – Elegant but stack‑heavy"
              initialCode={recursiveFactorial}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina's recursive version mirrors the mathematical definition.
              Each call adds a frame; for large <code>n</code>, it may overflow.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">🔄</span> Iterative Factorial
            </h3>
            <EditableCCodeBlock
              title="iterative_factorial.c – Efficient and safe"
              initialCode={iterativeFactorial}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu's iterative version uses a loop. It's faster and uses
              constant stack space, regardless of <code>n</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-yellow-50/70 p-6 dark:bg-yellow-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800 dark:text-yellow-300">
          ⚠️ Common Pitfalls
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Missing base case in recursion:</strong> Leads to infinite
            recursion and stack overflow.
          </li>
          <li>
            <strong>Not updating loop variable in iteration:</strong> Causes
            infinite loop.
          </li>
          <li>
            <strong>Assuming recursion is always slower:</strong> Some compilers
            optimise tail recursion, but C generally doesn't guarantee it.
          </li>
          <li>
            <strong>Choosing recursion for deep recursion:</strong> Can exhaust
            stack; iteration would be safer.
          </li>
          <li>
            <strong>Confusing recursion with nested function calls:</strong> They
            are different – recursion is self‑call.
          </li>
        </ul>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12 grid gap-6 md:grid-cols-1">
        <div
          className={clsx(
            "rounded-xl bg-blue-50/50 p-5 dark:bg-blue-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h3 className="mb-3 text-xl font-semibold text-blue-700 dark:text-blue-300">
            📋 Do's
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Prefer iteration for linear problems and when performance matters.</li>
            <li>Use recursion when the problem is naturally recursive (tree traversal, divide‑and‑conquer).</li>
            <li>Always define a base case that terminates recursion.</li>
            <li>Ensure loop condition will eventually become false.</li>
          </ul>
        </div>
        <div
          className={clsx(
            "rounded-xl bg-purple-50/50 p-5 dark:bg-purple-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:animation-delay-200ms"
          )}
          style={{ animationDelay: "200ms" }}
        >
          <h3 className="mb-3 text-xl font-semibold text-purple-700 dark:text-purple-300">
            🚫 Don'ts
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Use recursion for problems that require thousands of calls (stack overflow risk).</li>
            <li>Assume tail recursion is optimised in C – it usually isn't.</li>
            <li>Write unnecessarily complex recursion when a simple loop would do.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/30 p-6 dark:border-indigo-700 dark:bg-indigo-900/10",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
          💡 Hint – Think Like a Pro
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Observe carefully:</span> The recursive
          factorial for <code>n = 100000</code> will crash (stack overflow) on
          most systems, while the iterative version handles it easily. But for
          traversing a binary tree, recursion is much simpler. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify the recursive version to
            print the current <code>n</code> before and after the recursive call.
            Watch how the stack unwinds.
          </span>
        </p>
      </section>

      {/* Tips & Tricks */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-emerald-50/50 p-6 dark:bg-emerald-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
          🧠 Tips & Tricks (Professional Edge)
        </h2>
        <div className="grid gap-4 md:grid-cols-1">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🚀 Use iteration for performance‑critical code
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Loops have less overhead; use recursion only when clarity outweighs
              speed.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🌳 Recursion shines on trees and graphs
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Depth‑first search, tree traversals are often much cleaner with
              recursion.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔄 Convert recursion to iteration with an explicit stack
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you need recursion but worry about stack depth, simulate it
              with your own stack data structure.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use a hand‑raising game: one student (function)
              raises hand to another for help – recursion is when you ask
              yourself a simpler version of the question.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-purple-500 bg-purple-50/80 p-6 dark:bg-purple-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-purple-800 dark:text-purple-300">
          👨‍🏫 Teacher's Note – Sukanta Hui
        </h2>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in
              , mobile: 7003756860) has been teaching programming since 1998 –
              that's <strong>{experience} years</strong> of experience in C,
              RDBMS, OS, and web development.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              "Students often ask: 'Should I use recursion or loops?' The answer
              is 'it depends'. I tell them to write the recursive version first
              if it mirrors the problem naturally, then consider converting to
              iteration if performance or stack depth becomes an issue. The key
              is to understand both and choose wisely."
            </p>
          </div>
          <div className="rounded-full bg-purple-200 p-3 dark:bg-purple-800">
            <svg
              className="h-12 w-12 text-purple-700 dark:text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-semibold">✅ Mini Checklist</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
          {[
            "Do I understand the memory trade‑offs (stack frames vs. constant space)?",
            "Can I identify when a problem is naturally recursive?",
            "Do I always include a base case in recursion?",
            "Do I ensure loop termination in iteration?",
            "Am I aware of stack overflow risks for deep recursion?",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Topic43;