import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import elegantPower from "./topic44_files/elegant_power.c?raw";
import dangerousFibonacci from "./topic44_files/dangerous_fibonacci.c?raw";

const Topic44 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-400">
            When Recursion Is Elegant and When It Is Dangerous
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Recursion can produce beautifully simple code — or silently crash your
          program. Learn to tell the difference.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">The Two Faces of Recursion</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Abhronila loves recursion for its elegance.
          Computing a power using <code>xⁿ = x·xⁿ⁻¹</code> feels natural and
          concise. But when Ritaja tries the same for Fibonacci numbers, her
          program slows to a crawl and eventually crashes. The difference lies
          in how recursion grows: linear recursion (one call per step) is
          usually safe for moderate depths; exponential or deep recursion can
          blow up the stack and CPU time. Knowing when recursion shines and
          when it's a trap is a mark of an experienced programmer.
        </p>
      </section>

      {/* Elegant vs Dangerous Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Elegant Recursion",
            desc: "Problems that naturally break into smaller, similar sub‑problems, with minimal overlapping sub‑calls. Examples: factorial, power, tree traversal, divide‑and‑conquer (quicksort, mergesort).",
            icon: "✨",
            color: "green",
          },
          {
            title: "Dangerous Recursion",
            desc: "Problems that lead to deep recursion (thousands of calls) or massive recomputation (exponential). Examples: naive Fibonacci, recursive directory traversal without limit, recursion missing base case.",
            icon: "💥",
            color: "red",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
              item.color === "green"
                ? "border-green-200 bg-green-50/50 hover:border-green-300 dark:border-green-900 dark:bg-green-900/20 dark:hover:border-green-600"
                : "border-red-200 bg-red-50/50 hover:border-red-300 dark:border-red-900 dark:bg-red-900/20 dark:hover:border-red-600",
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

      {/* SVG Illustration: Recursion Trees */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 200" className="w-full">
            {/* Elegant: Linear recursion (power) */}
            <text x="50" y="30" fill="#059669" fontSize="14" fontWeight="bold">Elegant (linear)</text>
            <line x1="80" y1="50" x2="80" y2="150" stroke="#059669" strokeWidth="2" />
            <circle cx="80" cy="40" r="10" fill="#059669" />
            <text x="75" y="44" fill="white" fontSize="10">n</text>
            <circle cx="80" cy="70" r="10" fill="#059669" />
            <text x="75" y="74" fill="white" fontSize="10">n-1</text>
            <circle cx="80" cy="100" r="10" fill="#059669" />
            <text x="75" y="104" fill="white" fontSize="10">n-2</text>
            <circle cx="80" cy="130" r="10" fill="#059669" />
            <text x="75" y="134" fill="white" fontSize="10">...</text>
            <circle cx="80" cy="160" r="10" fill="#059669" />
            <text x="75" y="164" fill="white" fontSize="10">base</text>

            {/* Dangerous: Exponential recursion (Fibonacci) */}
            <text x="300" y="30" fill="#dc2626" fontSize="14" fontWeight="bold">Dangerous (exponential)</text>
            <circle cx="300" cy="40" r="10" fill="#dc2626" />
            <text x="295" y="44" fill="white" fontSize="10">fib(5)</text>
            <line x1="300" y1="50" x2="270" y2="70" stroke="#dc2626" strokeWidth="2" />
            <line x1="300" y1="50" x2="330" y2="70" stroke="#dc2626" strokeWidth="2" />
            <circle cx="270" cy="80" r="10" fill="#dc2626" />
            <text x="260" y="84" fill="white" fontSize="8">fib(4)</text>
            <circle cx="330" cy="80" r="10" fill="#dc2626" />
            <text x="320" y="84" fill="white" fontSize="8">fib(3)</text>
            <line x1="270" y1="90" x2="250" y2="110" stroke="#dc2626" strokeWidth="2" />
            <line x1="270" y1="90" x2="290" y2="110" stroke="#dc2626" strokeWidth="2" />
            <circle cx="250" cy="120" r="10" fill="#dc2626" />
            <text x="240" y="124" fill="white" fontSize="8">fib(3)</text>
            <circle cx="290" cy="120" r="10" fill="#dc2626" />
            <text x="280" y="124" fill="white" fontSize="8">fib(2)</text>
            {/* More arrows omitted for brevity */}
            <text x="340" y="160" fill="#6b7280" fontSize="10">...exponential growth</text>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Linear recursion (left) calls itself once per step; exponential recursion (right) fans out, causing massive redundancy.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Elegant vs Dangerous in Code</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✨</span> Elegant: Power Function
            </h3>
            <EditableCCodeBlock
              title="elegant_power.c – Linear recursion, safe"
              initialCode={elegantPower}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina's <code>power()</code> makes one recursive call per step.
              For exponent <code>n</code>, stack depth is <code>n</code> – safe
              for moderate values.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">💥</span> Dangerous: Naive Fibonacci
            </h3>
            <EditableCCodeBlock
              title="dangerous_fibonacci.c – Exponential explosion"
              initialCode={dangerousFibonacci}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's Fibonacci calls itself twice per step. For <code>n=50</code>,
              it makes billions of calls – extremely slow and risks stack overflow.
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
            <strong>No base case:</strong> Leads to infinite recursion and stack
            overflow.
          </li>
          <li>
            <strong>Exponential recursion:</strong> Functions like naive Fibonacci
            recompute the same values repeatedly; use memoization or iteration.
          </li>
          <li>
            <strong>Deep recursion:</strong> Even linear recursion can overflow
            the stack if depth is too large (e.g., <code>factorial(100000)</code>).
          </li>
          <li>
            <strong>Assuming tail‑call optimisation (TCO):</strong> C does not
            guarantee TCO; a tail‑recursive function may still use stack.
          </li>
          <li>
            <strong>Recursion with side effects:</strong> Modifying global state
            in recursive calls can cause hard‑to‑track bugs.
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
            📋 When Recursion Is Elegant
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Problem has a natural recursive structure (tree, divide‑and‑conquer).</li>
            <li>Depth is bounded (e.g., log n) or small.</li>
            <li>Code becomes significantly simpler and more readable.</li>
            <li>You can use memoization to avoid recomputation.</li>
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
            🚫 When Recursion Is Dangerous
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Depth could be large (thousands of calls).</li>
            <li>Problem leads to exponential branching without memoization.</li>
            <li>Stack memory is limited (embedded systems).</li>
            <li>Iterative solution is equally simple and more efficient.</li>
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
          <span className="font-medium">Observe carefully:</span> In the power
          example, each call reduces the exponent by 1 until it reaches 0. The
          call tree is a straight line. In the Fibonacci example, each call
          creates two new calls, so the tree grows exponentially. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Run the Fibonacci code with{" "}
            <code>n = 10, 20, 30, 40</code> and time it. See how quickly it
            slows down. Then implement an iterative version and compare.
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
              🗂️ Memoize to rescue
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Store results of expensive recursive calls (e.g., using an array)
              to turn exponential into linear.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Set recursion limits
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Some environments let you set stack size. Know your limits,
              especially on embedded systems.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔄 Convert to iteration when needed
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              For deep recursion, rewrite using an explicit stack or loop.
              Your code may become longer but safer.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use a "recursion thermometer": if a problem
              makes you dizzy thinking about the call tree, it's probably
              dangerous.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-orange-500 bg-orange-50/80 p-6 dark:bg-orange-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-orange-800 dark:text-orange-300">
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
              "Recursion is like fire: it can warm your code or burn it down.
              I've seen students fall in love with recursion and then wonder why
              their program crashes for n=50. Always ask: 'How deep does it go?'
              and 'How many times is each value computed?' If the answer scares
              you, reach for iteration or memoization."
            </p>
          </div>
          <div className="rounded-full bg-orange-200 p-3 dark:bg-orange-800">
            <svg
              className="h-12 w-12 text-orange-700 dark:text-orange-300"
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
            "Does the recursion have a clear base case?",
            "Is the recursion depth bounded and within stack limits?",
            "Does the function avoid exponential recomputation (or use memoization)?",
            "Is the recursive solution simpler than an iterative one?",
            "Have I tested with maximum expected input?",
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

export default Topic44;