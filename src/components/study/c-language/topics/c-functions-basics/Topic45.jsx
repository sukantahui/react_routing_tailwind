import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import recursiveFactorial from "./topic45_files/recursive_factorial.c?raw";
import iterativeFactorial from "./topic45_files/iterative_factorial.c?raw";
import recursiveFibonacci from "./topic45_files/recursive_fibonacci.c?raw";
import iterativeFibonacci from "./topic45_files/iterative_fibonacci.c?raw";

const Topic45 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Converting Recursive Logic to Iterative Logic
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          When recursion gets too deep or slow, transform it into a loop – using
          an explicit stack if needed. Learn the art of mechanical conversion.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Convert?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Debangshu wrote a beautiful recursive function to
          traverse a directory tree. It worked for small folders but crashed
          with a stack overflow when pointed at the entire hard drive. Recursion
          is elegant, but it can consume stack memory and be slower due to
          function call overhead. Converting recursion to iteration – using loops
          and an explicit stack (if needed) – can make your program more robust
          and often faster. Many compilers do this automatically for tail
          recursion, but for general recursion, you may need to do it yourself.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Tail Recursion → Loop",
            desc: "If the recursive call is the last operation, you can often replace it directly with a loop and update parameters.",
            icon: "🔁",
          },
          {
            title: "Linear Recursion → Loop",
            desc: "Functions that call themselves once per step can usually be turned into a simple loop with an accumulator.",
            icon: "📏",
          },
          {
            title: "Tree Recursion → Explicit Stack",
            desc: "When a function makes multiple recursive calls (like Fibonacci), use your own stack to simulate the call tree.",
            icon: "🌳",
          },
          {
            title: "State Preservation",
            desc: "Local variables that change across calls need to be stored manually – often in a stack frame structure.",
            icon: "📦",
          },
          {
            title: "Memoization",
            desc: "For functions that recompute the same values, store results in a table to avoid recursion altogether.",
            icon: "📝",
          },
          {
            title: "GOTO Considered Harmful",
            desc: "Avoid using GOTO to simulate recursion – use structured loops and stacks instead.",
            icon: "🚫",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              `motion-safe:animation-delay-${(index + 1) * 100}ms`
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="mb-3 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* SVG Illustration: Recursion to Stack */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 200" className="w-full">
            {/* Left: Recursion tree */}
            <text x="30" y="30" fill="#374151" fontSize="14" fontWeight="bold">Recursive Calls</text>
            <circle cx="80" cy="70" r="10" fill="#3b82f6" />
            <text x="75" y="74" fill="white" fontSize="10">fib(4)</text>
            <line x1="80" y1="80" x2="50" y2="110" stroke="#3b82f6" strokeWidth="2" />
            <line x1="80" y1="80" x2="110" y2="110" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="120" r="10" fill="#3b82f6" />
            <text x="45" y="124" fill="white" fontSize="8">fib(3)</text>
            <circle cx="110" cy="120" r="10" fill="#3b82f6" />
            <text x="105" y="124" fill="white" fontSize="8">fib(2)</text>
            <text x="30" y="160" fill="#6b7280" fontSize="10">... tree grows</text>

            {/* Arrow */}
            <line x1="150" y1="100" x2="190" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="155" y="90" fill="#6b7280" fontSize="12">convert</text>

            {/* Right: Explicit stack */}
            <text x="260" y="30" fill="#374151" fontSize="14" fontWeight="bold">Explicit Stack</text>
            <rect x="260" y="50" width="120" height="20" fill="#4b5563" rx="2" />
            <text x="270" y="65" fill="white" fontSize="10">fib(4)</text>
            <rect x="260" y="70" width="120" height="20" fill="#059669" rx="2" />
            <text x="270" y="85" fill="white" fontSize="10">fib(3)</text>
            <rect x="260" y="90" width="120" height="20" fill="#047857" rx="2" />
            <text x="270" y="105" fill="white" fontSize="10">fib(2)</text>
            <rect x="260" y="110" width="120" height="20" fill="#065f46" rx="2" />
            <text x="270" y="125" fill="white" fontSize="10">...</text>
            <text x="260" y="150" fill="#6b7280" fontSize="10">stack grows and shrinks</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Recursion uses the call stack; iteration uses an explicit stack (or loop) that you control.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Recursive → Iterative Transformations</h2>
        
        {/* Factorial */}
        <div className="mb-8 grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-purple-200 bg-purple-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-purple-900 dark:bg-purple-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-purple-700 dark:text-purple-400">
              <span className="mr-2">🔁</span> Recursive Factorial
            </h3>
            <EditableCCodeBlock
              title="recursive_factorial.c – Uses stack"
              initialCode={recursiveFactorial}
            />
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
              title="iterative_factorial.c – Simple loop"
              initialCode={iterativeFactorial}
            />
          </div>
        </div>

        {/* Fibonacci */}
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">🌲</span> Recursive Fibonacci (exponential)
            </h3>
            <EditableCCodeBlock
              title="recursive_fibonacci.c – Exponential"
              initialCode={recursiveFibonacci}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's naive Fibonacci makes two recursive calls – exponential.
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
              <span className="mr-2">📊</span> Iterative Fibonacci (linear)
            </h3>
            <EditableCCodeBlock
              title="iterative_fibonacci.c – Loop"
              initialCode={iterativeFibonacci}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina's iterative version runs in O(n) time and O(1) space.
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
            <strong>Incorrect simulation of state:</strong> When converting tree
            recursion, forgetting to save local variables leads to wrong results.
          </li>
          <li>
            <strong>Infinite loops:</strong> Loops must have clear termination
            conditions; missing them is as bad as infinite recursion.
          </li>
          <li>
            <strong>Stack overflow in explicit stack:</strong> Your own stack
            can also overflow if you don't limit its size.
          </li>
          <li>
            <strong>Assuming all recursions can be easily converted:</strong>
            Some recursive algorithms (like backtracking) are naturally recursive
            and converting them may produce very complex code.
          </li>
          <li>
            <strong>Ignoring tail recursion:</strong> Some compilers optimise
            tail recursion into loops; check your compiler documentation.
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
            <li>First understand the recursion: base case, recursive case, state.</li>
            <li>For tail recursion, rewrite as a loop with updated variables.</li>
            <li>For linear recursion, use an accumulator and loop.</li>
            <li>For tree recursion, use an explicit stack (LIFO) or queue (BFS).</li>
            <li>Test with same inputs as recursive version to ensure correctness.</li>
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
            <li>Don't attempt to convert every recursive function – sometimes recursion is clearer.</li>
            <li>Don't forget to manage your explicit stack memory.</li>
            <li>Don't use GOTO to simulate recursion – it leads to spaghetti code.</li>
            <li>Don't ignore performance measurements – loops aren't always faster.</li>
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
          <span className="font-medium">Observe carefully:</span> In the
          factorial conversion, the recursive call <code>n * factorial(n-1)</code>{" "}
          becomes a loop that multiplies from 1 to n. The recursion’s "pending
          multiplication" is handled by the loop's accumulator. For Fibonacci,
          the naive recursion recomputes values; the iterative version keeps
          the last two results. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Implement an explicit stack for
            Fibonacci: push pairs <code>(n, state)</code> onto a stack and simulate
            the recursion. It's more complex but teaches you how recursion really
            works.
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
              🧪 Use a stack of frames
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              For complex recursion, define a struct that holds all local
              variables and a "program counter" (stage). Push frames onto your
              stack to simulate calls.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Tail‑call optimisation in C
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              With <code>-O2</code>, some compilers (GCC) may optimise tail
              recursion to a loop. Write tail‑recursive functions when possible.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔍 Debug with print statements
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When converting, add debug prints to both versions to compare
              intermediate values.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we simulate recursion with a stack of index cards.
              Each card holds function parameters and local variables. Converting
              to iteration means managing that stack yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-blue-500 bg-blue-50/80 p-6 dark:bg-blue-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-blue-800 dark:text-blue-300">
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
              "Conversion from recursion to iteration is a rite of passage. It
              deepens your understanding of both. I often ask students to write
              both versions and then explain why one might be preferred. The
              explicit stack version is particularly illuminating – it shows
              exactly what the compiler does for you behind the scenes."
            </p>
          </div>
          <div className="rounded-full bg-blue-200 p-3 dark:bg-blue-800">
            <svg
              className="h-12 w-12 text-blue-700 dark:text-blue-300"
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
            "Have I identified the type of recursion (linear, tail, tree)?",
            "Does the iterative version handle all base cases correctly?",
            "Did I preserve all state that was implicit in recursion?",
            "Is my explicit stack bounded and managed?",
            "Have I tested with the same inputs as the recursive version?",
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

export default Topic45;